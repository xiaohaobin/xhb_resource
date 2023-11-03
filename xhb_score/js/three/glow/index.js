/**
 * 辉光效果和呼吸灯效果
 * @author xiaohaobin
 */

import * as THREE from 'three'

import {
	EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {
	RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {
	UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {
	ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';




//局部辉光效果=============================================
const bloomParams = {
	exposure: 1,//曝光：1，
	bloomThreshold: 0,//绽放阈值
	bloomStrength: 1,//绽放强度
	bloomRadius: 0.2,//绽放半径
};
const bloomVertext = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const bloomFragment = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}
`;

let bloomComposer, finalComposer;


/**
 * 我们需要添加两个效果合成器：bloomComposer及finalComposer，bloomComposer用于生成辉光材质，finalComposer用于渲染整个场景。
 * 为了区分辉光对象和非辉光对象，我们需要改变其图层编号。将需要变为辉光的对象的图层编号设为1，其余默认为0，在原renderEffect方法中加入如下代码，注意带+号的部分：
 */
// const ENTIRE_SCENE = 0,
// 	BLOOM_SCENE = 1;
// const bloomLayer = new THREE.Layers();
// bloomLayer.set(BLOOM_SCENE);

// let darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
// let materials = {};




/**
 * 初始化前面的辉光通道即可使用
 * 呼吸灯效果+label
 * * 1、执行：initCSS2DRenderer方法
 * 2、执行：initLabel方法
 * 3、执行：composerAndCSS2DRenderFn方法  （动画执行）
 */


class GlowLightEffect {
	
	constructor(scene, camera, renderer, width=window.innerWidth, height=window.innerHeight,labelContainerDOM=document.body) {
	
		this.composer = null;
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.width = width;
		this.height = height;
		
		this.css2DRenderer = null;
		this.label = null;
		this.labelContainerDOM = labelContainerDOM;
		
		/**
		 * 我们需要添加两个效果合成器：bloomComposer及finalComposer，bloomComposer用于生成辉光材质，finalComposer用于渲染整个场景。
		 * 为了区分辉光对象和非辉光对象，我们需要改变其图层编号。将需要变为辉光的对象的图层编号设为1，其余默认为0，在原renderEffect方法中加入如下代码，注意带+号的部分：
		 */
		const ENTIRE_SCENE = 0,
			BLOOM_SCENE = 1;
		this.bloomLayer = new THREE.Layers();
		this.bloomLayer.set(BLOOM_SCENE);
		
		this.darkMaterial = new THREE.MeshBasicMaterial( { 
			color: "black" ,
			// polygonOffset: true,
			// polygonOffsetFactor: -1,
			// polygonOffsetUnits: -4
		} );
		this.materials = {};
	}
	
	/**
	 * 初始化辉光通道和效果通道，返回两种通道
	 */
	composerInit() {
		// 添加效果合成器
		bloomComposer = new EffectComposer(this.renderer);
		bloomComposer.renderToScreen = false;
		// 添加基本的渲染通道
		const renderPass = new RenderPass(this.scene, this.camera);
	
		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(this.width , this.height)
		)
		bloomPass.threshold = bloomParams.bloomThreshold;
		bloomPass.strength = bloomParams.bloomStrength;
		bloomPass.radius = bloomParams.bloomRadius;
	
		bloomComposer.addPass(renderPass);
		// 把通道加入到组合器
		bloomComposer.addPass(bloomPass);
	
		const finalPass = new ShaderPass(
			new THREE.ShaderMaterial({
				uniforms: {
					baseTexture: {
						value: null
					},
					bloomTexture: {
						value: bloomComposer.renderTarget2.texture
					},
				},
				vertexShader: bloomVertext,
				fragmentShader: bloomFragment,
				defines: {},
			}),
			'baseTexture'
		);
		finalPass.needsSwap = true;
		// 初始化实际效果合成器
		finalComposer = new EffectComposer(this.renderer);
	
		finalComposer.addPass(renderPass);
		finalComposer.addPass(finalPass);
		this.composer = finalComposer;
		
		return {
			bloomComposer,
			finalComposer
		};
	}	
	
	darkenNonBloomed(obj) {
		if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
			this.materials[obj.uuid] = obj.material;
			obj.material = this.darkMaterial;
		}
	}
	
	// 还原材质
	 restoreMaterial(obj) {
		if (this.materials[obj.uuid]) {
			obj.material = this.materials[obj.uuid];
			delete this.materials[obj.uuid];
		}
	}
	
	/**
	 * 针对性渲染辉光，在render方法中先转换材质，生成辉光效果，然后还原材质，最后渲染整个场景，从而实现部分辉光的效果
	 */
	
	 bloomRender() {
		 let that = this;
		 if(bloomComposer && finalComposer){
			 this.scene.traverse((obj) => that.darkenNonBloomed(obj));
			 bloomComposer.render();
			 this.scene.traverse((obj) => that.restoreMaterial(obj));
			 finalComposer.render();
			 // if (this.composer) this.composer.render();
		 }
		else{
			if (this.composer) this.composer.render();
		}
		
		//动画执行的时候loop执行加载label动画		
		if (this.css2DRenderer) this.css2DRenderer.render(this.scene, this.camera);
	}
	
	//呼吸灯效果
	 initOutlinePass(materialObj){
		 //清除之前的outlinePass，做独立active处理
		 if(finalComposer){
		 	for(var i=0;i<finalComposer.passes.length;i++){
		 		if(finalComposer.passes[i].selectedObjects){
		 			finalComposer.removePass(finalComposer.passes[i]);
		 		}
		 	}
		 	
		 }
		if (!materialObj) {
		  this.composer = null;
		  return
		}
		
		let renderScene = new RenderPass(this.scene, this.camera);
		
		let outlinePass = new OutlinePass(
		  new THREE.Vector2(this.width , this.height),
		  this.scene,
		  this.camera,
		  [materialObj]
		);
		// 将此通道结果渲染到屏幕
		outlinePass.renderToScreen = true;
		outlinePass.edgeGlow = 1; // 发光强度
		outlinePass.usePatternTexture = false; // 是否使用纹理图案
		outlinePass.edgeThickness = 2; // 边缘浓度
		outlinePass.edgeStrength = 6; // 边缘的强度，值越高边框范围越大
		outlinePass.pulsePeriod = 2; // 闪烁频率，值越大频率越低
		outlinePass.visibleEdgeColor.set('#ff0000'); // 呼吸显示的颜色
		outlinePass.hiddenEdgeColor.set('#ffff00'); // 不可见边缘的颜色
		
		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(renderScene);
		
		this.composer.addPass(outlinePass);
		
		//辉光通道和呼吸光通道同时存在写法
		//清除之前的outlinePass，做独立active处理
		if(finalComposer) finalComposer.addPass(outlinePass);
		return outlinePass;
	}
	
	//清除之前的outlinePass，做独立active处理
	// clearFinalComposer(){
	// 	//清除之前的outlinePass，做独立active处理
	// 	if(finalComposer){
	// 		for(var i=0;i<finalComposer.passes.length;i++){
	// 			if(finalComposer.passes[i].selectedObjects){
	// 				finalComposer.removePass(finalComposer.passes[i]);
	// 			}
	// 		}
			
	// 		finalComposer.addPass(outlinePass);
	// 	}
	// }
	
	//初始化加载呼吸灯和label效果,要配合composerInit执行
	initBreathLightLabel(labelDomEle){
		// 2D渲染器
		this.initCSS2DRenderer(); 
		// this.initLabel(labelDomEle);
	}
	
	// 2D渲染器
	initCSS2DRenderer() {
	  this.css2DRenderer = new CSS2DRenderer();
	  this.css2DRenderer.setSize(this.width , this.height);
	  this.css2DRenderer.domElement.style.position = 'absolute';
	  this.css2DRenderer.domElement.style.top = '-120px';
	  this.css2DRenderer.domElement.style.left = '0px';
	  this.css2DRenderer.domElement.style.pointerEvents = 'none';
	  // document.body.appendChild(this.css2DRenderer.domElement);
	  this.labelContainerDOM.appendChild(this.css2DRenderer.domElement);
	  return this.css2DRenderer
	}
	
	// 获取dom
	getCSS2DObject(domEle) {
	  let label = new CSS2DObject(domEle);
	  domEle.style.pointerEvents = 'none';
	  return label;
	}
	
	//动画执行的时候loop执行
	composerAndCSS2DRenderFn(){
		// if (this.composer) this.composer.render();
		if (this.css2DRenderer) this.css2DRenderer.render(this.scene, this.camera);
	}
	
	/**
	 * 标签
	 * labelDomEle   vue dom节点
	 */ 
	initLabel(labelDomEle) {
	 this.scene.children.forEach( (child) => {
	 	if(child.name == "modelLabel"){
	 		this.scene.remove(child);
	 	}
	 });
	  labelDomEle.style.visibility = 'hidden';
	  this.label = this.getCSS2DObject(labelDomEle);
	  this.label.name = "modelLabel";
	  this.scene.add(this.label);
	   return this.label;
	}
	
	//点击选择模型,添加label和呼吸灯
	clickAndSelectFn(selectBoxObj){
		if (!selectBoxObj) {
			this.initOutlinePass(false);
			if(this.label) this.label.element.style.visibility = 'hidden';
			return;
		}
		this.initOutlinePass(selectBoxObj);
		this.label.element.style.visibility = 'visible';
		this.label.position.copy(selectBoxObj.position);
	}
	
	//点击选择模型,添加label和呼吸灯
	clickAndSwitchLabel(selectBoxObj,labelDomEle){
		if (!selectBoxObj || !labelDomEle) {
			this.initOutlinePass(false);
			if(this.label)  this.label.element.style.visibility = 'hidden';
			return;
		}
		if(labelDomEle){
			this.label = this.initLabel(labelDomEle); 
		}
		
		this.initOutlinePass(selectBoxObj);
		this.label.element.style.visibility = 'visible';
		this.label.position.copy(selectBoxObj.position);
	}
	
}

//局部辉光效果=============================================



//呼吸灯光效果+label====================================================================

/**
 * 呼吸灯光效果+label
 * 1、执行：initCSS2DRenderer方法
 * 2、执行：initLabel方法
 * 3、执行：composerAndCSS2DRenderFn方法  （动画执行）
 */
const breatheLight = {
		composer:null,
		css2DRenderer:null,
		label:null,
		outlineSCENE:2,//呼吸灯图层
		bloomLayer:new THREE.Layers(),//呼吸灯的图层
		darkMaterial:new THREE.MeshBasicMaterial( { color: "black" } ),
		materials:{},
		
	 // 呼吸光
	    initOutlinePass(materialObj, scene, camera,renderer, width,height) {
	      if (!materialObj) {
	        this.composer = null
	        return
	      }
	      let renderScene = new RenderPass(scene, camera);
	      let outlinePass = new OutlinePass(
	        new THREE.Vector2(width || window.innerWidth, height || window.innerHeight),
	        scene,
	        camera,
	        [materialObj]
	      );
	      // 将此通道结果渲染到屏幕
	      outlinePass.renderToScreen = true;
	      outlinePass.edgeGlow = 1; // 发光强度
	      outlinePass.usePatternTexture = false; // 是否使用纹理图案
	      outlinePass.edgeThickness = 2; // 边缘浓度
	      outlinePass.edgeStrength = 6; // 边缘的强度，值越高边框范围越大
	      outlinePass.pulsePeriod = 2; // 闪烁频率，值越大频率越低
	      outlinePass.visibleEdgeColor.set('#ff0000'); // 呼吸显示的颜色
	      outlinePass.hiddenEdgeColor.set('#ffff00'); // 不可见边缘的颜色
	      // 将通道加入组合器
	      this.composer = new EffectComposer(renderer);
	      this.composer.addPass(renderScene);
	      this.composer.addPass(outlinePass);
		  return this.composer
	    },
		 // 2D渲染器
		initCSS2DRenderer(width,height) {
		  
		  this.bloomLayer.set(this.outlineSCENE);	
		  
		  this.css2DRenderer = new CSS2DRenderer();
		  this.css2DRenderer.setSize(width || window.innerWidth, height || window.innerHeight);
		  this.css2DRenderer.domElement.style.position = 'absolute';
		  this.css2DRenderer.domElement.style.top = '-150px';
		  this.css2DRenderer.domElement.style.left = '0px';
		  this.css2DRenderer.domElement.style.pointerEvents = 'none';
		  document.body.appendChild(this.css2DRenderer.domElement);
		  return this.css2DRenderer
		},
		// 获取dom
		getCSS2DObject(domEle) {
		  let label = new CSS2DObject(domEle);
		  domEle.style.pointerEvents = 'none';
		  return label;
		},
		//动画执行的时候loop执行
		composerAndCSS2DRenderFn(scene, camera){
			let that = this;
			scene.traverse((obj) => that.darkenNonBloomed(obj));
			scene.traverse((obj) => that.restoreMaterial(obj));
			
			if (this.composer) this.composer.render();
			if (this.css2DRenderer) this.css2DRenderer.render(scene, camera);
		},
		/**
		 * 标签
		 * labelDomEle   vue dom节点
		 */ 
		initLabel(labelDomEle,scene) {
		  // let labelDomEle = this.$refs.Label;
		  labelDomEle.style.visibility = 'hidden';
		  this.label = this.getCSS2DObject(labelDomEle);
		  scene.add(this.label);
		},
		//点击选择模型
		clickAndSelectFn(selectBoxObj,scene, camera,renderer, width,height){
			if (!selectBoxObj) {
				this.initOutlinePass(false)
				this.label.element.style.visibility = 'hidden';
				return;
			}
			
			selectBoxObj.layers.toggle(this.outlineSCENE);
			
			this.initOutlinePass(selectBoxObj,scene, camera,renderer, width,height);
			this.label.element.style.visibility = 'visible';
			this.label.position.copy(selectBoxObj.position);
		},
		// 将材质转为黑色材质
		 darkenNonBloomed(obj) {
			if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {
				this.materials[obj.uuid] = obj.material;
				obj.material = this.darkMaterial;
			}
		},
		
		// 还原材质
		 restoreMaterial(obj) {
			if (this.materials[obj.uuid]) {
				obj.material = this.materials[obj.uuid];
				delete this.materials[obj.uuid];
			}
		},
		
		
};
//呼吸灯光效果+label====================================================================



export default {
	breatheLight,
	GlowLightEffect
}
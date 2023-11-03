/**
 * 2dhtml渲染到3d里面
 * @author xhb
 */

import * as THREE from 'three'
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

/**
 * 1、执行：init方法
 * 2、执行：initLabel方法
 */

class css2DLabel {
	constructor(scene, camera, renderer, width=window.innerWidth, height=window.innerHeight,labelContainerDOM=document.body) {
	
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.width = width;
		this.height = height;
		
		this.css2DRenderer = null;
		this.label = null;
		
		this.labelList = [];
		this.labelContainerDOM = labelContainerDOM;
	}
	
	/**
	 * 初始化
	 * @param {Object} labelDomEle DOM节点
	 */
	initAll(labelDomEle){
		// 2D渲染器
		this.initCSS2DRenderer(); 
		// this.initLabel(labelDomEle);
	}
	
	// 2D渲染器
	initCSS2DRenderer() {
	  this.css2DRenderer = new CSS2DRenderer();
	  this.css2DRenderer.setSize(this.width , this.height);
	  this.css2DRenderer.domElement.style.position = 'absolute';
	  // this.css2DRenderer.domElement.style.top = '-150px';
	   this.css2DRenderer.domElement.style.top = '-120px';
	  this.css2DRenderer.domElement.style.left = '0px';
	  this.css2DRenderer.domElement.style.pointerEvents = 'none';
	  // document.body.appendChild(this.css2DRenderer.domElement);
	  this.labelContainerDOM.appendChild(this.css2DRenderer.domElement);
	  return this.css2DRenderer;
	}
	
	// 获取dom
	getCSS2DObject(domEle) {
	  let label = new CSS2DObject(domEle);
	  domEle.style.pointerEvents = 'none';
	  return label;
	}
	
	/**
	 * 标签
	 * labelDomEle   vue ref 定义下的子集 或者 dom节点
	 */ 
	initLabel(labelDomEle) {
		
		this.scene.children.forEach( (child) => {
			if(child.name == "modelLabel"){
				this.scene.remove(child);
			}
		});
	  // let labelDomEle = this.$refs.Label;
	  labelDomEle.style.visibility = 'hidden';
	   // labelDomEle.style.display = 'none';
	  this.label = this.getCSS2DObject(labelDomEle);
	  this.label.name = "modelLabel";
	  this.scene.add(this.label);
	  return this.label;
	}
	
	//点击选择模型,添加label和呼吸灯
	clickAndSelectFn(selectBoxObj){
		if (!selectBoxObj) {
			if(this.label) this.label.element.style.visibility = 'hidden';
			// this.label.element.style.display = 'none';
			return;
		}
		this.label.element.style.visibility = 'visible';
		// this.label.element.style.display = 'block';
		this.label.position.copy(selectBoxObj.position);
	}
	
	//动画执行的时候loop执行
	resetCSS2DRenderFn(){
		// if (this.composer) this.composer.render();
		if (this.css2DRenderer) this.css2DRenderer.render(this.scene, this.camera);
	}
	
	//点击选择模型,添加label和呼吸灯
	clickAndSwitchLabel(selectBoxObj,labelDomEle){
		if (!selectBoxObj || !labelDomEle) {
			if(this.label) this.label.element.style.visibility = 'hidden';
			// this.label.element.style.display = 'none';
			return;
		}
		if(labelDomEle){
			 this.css2DRenderer.domElement.style.left = '0px';
			if(selectBoxObj.name == "IntegratedCabinet"){//一体柜特殊处理
				 // this.css2DRenderer.domElement.style.top = '20px';
				this.css2DRenderer.domElement.style.top = '-180px';//压缩模型的弹层位置
			}
			else if(selectBoxObj.name == "powerTower"){
				 this.css2DRenderer.domElement.style.top = '-20px';
				  // this.css2DRenderer.domElement.style.left = '0px';
			}
			else if(selectBoxObj.name == "building"){
				 this.css2DRenderer.domElement.style.top = '-20px';
				  this.css2DRenderer.domElement.style.left = '-300px';
			}
			else{
				 this.css2DRenderer.domElement.style.top = '-120px';
			}
			this.label = this.initLabel(labelDomEle); 
		}
		
		this.label.element.style.visibility = 'visible';
		// this.label.element.style.display = 'block';
		this.label.position.copy(selectBoxObj.position);
	}
}

export default css2DLabel;
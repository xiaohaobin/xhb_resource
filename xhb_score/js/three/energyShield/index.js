 /**能量盾动画**/
 import * as THREE from 'three'
 import { shader as depthVertexShader } from './depth-vs.js'
 import { shader as depthFragmentShader } from './depth-fs.js'
 import { shader as shieldVertexShader } from './shield-vs.js'
 import { shader as shieldFragmentShader } from './shield-fs.js'
 let noiseImg = require('./../../../../assets/images/3DImg/noise.png');
 
 class EnergyShield {
	 /**
	  * @param {Object}  scene 
	  * @param {Object}  renderer 
	  */
 	constructor(scene,renderer) {
		this.scene = scene;
		this.renderer = renderer;
 		//深度 材质
 		this.depthMaterial = new THREE.RawShaderMaterial({
 		  uniforms: {},
 		  vertexShader: depthVertexShader,
 		  fragmentShader: depthFragmentShader,
 		});
 		//渲染器深度配置
 		this.depth = new THREE.WebGLRenderTarget(1, 1, {
 		  wrapS: THREE.ClampToEdgeWrapping,
 		  wrapT: THREE.ClampToEdgeWrapping,
 		  minFilter: THREE.LinearFilter,
 		  magFilter: THREE.LinearFilter,
 		  format: THREE.RGBAFormat,
 		  type: THREE.UnsignedByteType,
 		  stencilBuffer: false,
 		  depthBuffer: true
 		})
 		this.hdr = new THREE.WebGLRenderTarget(1, 1, {
 		  wrapS: THREE.ClampToEdgeWrapping,
 		  wrapT: THREE.ClampToEdgeWrapping,
 		  minFilter: THREE.LinearFilter,
 		  magFilter: THREE.LinearFilter,
 		  format: THREE.RGBAFormat,
 		  type: THREE.UnsignedByteType,
 		  stencilBuffer: false,
 		  depthBuffer: true
 		});
		
		// shield
		const textureLoader = new THREE.TextureLoader()
		this.noiseTexture = textureLoader.load(noiseImg);
		this.noiseTexture.wrapS = this.noiseTexture.wrapT = THREE.RepeatWrapping;
		
		//能量盾列表
		this.shieldList = [];
 	}
 	/**
 	 * 加载能量盾
 	 * 输入：
 	 * 能量光罩球体半径，
 	 * 能量光罩球体位置
 	 * 输出：
 	 * 能量光罩球体网格模型（非公共）
 	 * 深度材质（公共）
 	 * 渲染器深度配置（公共）
	 * @param {Number}  radius 能量球体半径，默认10
	 * @param {Array}  position 能量球体位置，默认[0,0,0]
 	 * */
 	loadShield(radius=10, position=[0,0,0]){
 			 		   
 		    const shieldGeometry = new THREE.SphereBufferGeometry(radius, 100, 100)
 		    const shieldMaterial = new THREE.RawShaderMaterial({
 			  // map:this.noiseTexture,
 		      uniforms: {
 		        depthBuffer: { value: null },
 		        resolution: { value: new THREE.Vector2(1, 1) },
 		        bufColor: { value: null },
 		        u_tex: { value: null },
 		        time: { value: 0 }
 		      },
 		      vertexShader: shieldVertexShader,
 		      fragmentShader: shieldFragmentShader,
 		      transparent: true,
 		      depthWrite: false,
 		      side: THREE.DoubleSide
 		    });
 			let shield = new THREE.Mesh(shieldGeometry, shieldMaterial)
 		    shield.position.set(position[0], position[1], position[2])
 		    shield.material.uniforms.depthBuffer.value = this.depth.texture
 		    shield.material.uniforms.bufColor.value = this.depth.texture
 		    shield.material.uniforms.u_tex.value = this.noiseTexture;
			shield.name = "energyShield_" + (this.shieldList.length + 1);
			
			// shield.layers.toggle(1)//添加辉光不好看
			
 			this.scene.add(  shield );
			this.shieldList.push( shield );
			
			return {
				shield, 
				depthMaterial:this.depthMaterial,
				depth:this.depth
			}
 	}
	
	/**
	 * 所有能量盾算法持续
	 */
	ShieldLoopTodo(){
		if(this.shieldList.length > 0){
			this.scene.overrideMaterial = this.depthMaterial
			this.renderer.setRenderTarget(this.depth);
			this.scene.overrideMaterial = null
			this.renderer.setRenderTarget(null);
			this.shieldList.forEach((item,i)=>{
				item.material.uniforms.time.value = performance.now();
			});
		}
		
	}
 }
 
export default EnergyShield
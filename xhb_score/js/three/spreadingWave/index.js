/**简版慢性和普通版扩散波动画**/
import * as THREE from 'three'
let wavesImg = require('./../../../../assets/images/3DImg/spreadingWave2.png'); //光波图片

class spreadingWave {
	constructor(scene, renderer) {
		this.scene = scene;
		this.renderer = renderer;

		this.firstTexture = this.geTexture(wavesImg); //默认纹理，第一个
		//飞线纹理列表
		this.textureList = [
			this.firstTexture
		];

		this.spreadingWaveList = [];
		this.s = 0;
		this.p = 1;
		
		//非简版
		this.spreadingWaveList2 = [];
		this.wallMesh = {
			time: 0,
			opacity: 1
		}
		
		
	}
	
	/**
	 * 加载扩散波动画模型
	 * @param {Object} options 模型相关参数
	 * @param {Number} options[radiusTop] 圆柱模型上半径
	 * @param {Number} options[radiusBottom] 圆柱模型下半径
	 * @param {Number} options[height] 圆柱模型高度
	 * @param {Array} options[position] 圆柱模型位置x,y,z
	 * @param {Boolean} options[isSimple] 圆柱模型扩散波是否简单渲染，默认是
	 */
	loadSpreadingWave(options,textureImg) {
		let defaultOptions = {
			radiusTop: 4, //顶部半径
			radiusBottom: 4, //底部半径
			height: 2,
			position:[0,0,0],
			isSimple:true,//是否简版
		};
		let _options = Object.assign({}, defaultOptions, options);
		let newTexture;
		if(textureImg){
			newTexture = this.geTexture(textureImg);
			console.log(newTexture,"newTexture")
			this.textureList.push( newTexture );
		}
		
		let geometry = new THREE.CylinderGeometry(_options.radiusTop,  _options.radiusBottom, _options.height, 64);
		let materials = [
			new THREE.MeshBasicMaterial({
				map: textureImg ? newTexture : this.firstTexture,
				side: THREE.DoubleSide,
				transparent: true
			}),
			new THREE.MeshBasicMaterial({
				transparent: true,
				opacity: 0,
				side: THREE.DoubleSide
			}),
			new THREE.MeshBasicMaterial({
				transparent: true,
				opacity: 0,
				side: THREE.DoubleSide
			})
		]
		let mesh = new THREE.Mesh(geometry, materials)
		
		mesh.position.set(_options.position[0], _options.position[1], _options.position[2]);
		mesh.name = 'spreadingWave_' + (this.spreadingWaveList.length + 1); 
		mesh.layers.toggle(1);
		
		if(_options.isSimple){
			this.spreadingWaveList.push( mesh );
		}else{
			this.spreadingWaveList2.push( mesh );
		}
		
		// mesh.layers.toggle(1);//辉光一般
		this.scene.add(mesh);//
		
		return mesh;
	
	}

	//获取纹理
	geTexture(img) {
		let texture = new THREE.TextureLoader().load(img || wavesImg);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1)
		texture.needsUpdate = true;
		return texture
	}
	
	//扩散波纹理算法持续计算
	SpreadingWaveCalLoopTodo(){
		let that = this;
		if(this.spreadingWaveList.length){//简版算法
			// this.s += 0.01;
			this.s += 0.02;
			this.p -= 0.005;
			
			if (this.s > 2) {
			  this.s = 0;
			  this.p = 1;
			}
		
			
			for(let i=0;i<this.spreadingWaveList.length;i++){
				let mesh = this.spreadingWaveList[i];
				mesh.scale.set(1 + this.s, 1, 1 + this.s);
				mesh.material[0].opacity = this.p;
			}
		}
		
		if(this.spreadingWaveList2.length){//非简版算法
			this.spreadingWaveList2.forEach((child,i)=>{
				that.wallMesh.time += 0.1;
				that.wallMesh.opacity -= 0.005;
				if (that.wallMesh.time > 2) {
					that.wallMesh.time = 0;
					that.wallMesh.opacity = 1;
				}
				child.scale.set(1 + that.wallMesh.time, 1, 1 + that.wallMesh.time);
				child.material[0].opacity = that.wallMesh.opacity;
			});
		}
	}
}

export default spreadingWave
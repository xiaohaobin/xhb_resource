/**流体墙体动画**/
import * as THREE from 'three'
let wavesImg = require('./../../../../assets/images/3DImg/waves.jpg'); //光强图片

class lightWall {
	constructor(scene, renderer) {
		this.scene = scene;
		this.renderer = renderer;

		this.lightWallNewTexture = [this.geTexture()];
		this.lightWallList = [];
	}

	/**
	 * 光墙效果
	 * @param {Object} options 光强主要参数配置
	 * @param {Array} options[XZData] 光墙位置顶点数组（只涉及XZ坐标点）（顺时针方向）
	 *  @param {Number} options[height] 墙体高度，也就是模型光强位置顶点的y坐标
	 * *@param {String} options[name] 光墙网格名
	 * @param {Number} options[opacity] 材质透明度
	 * @param {HEX || String} options[color] 材质颜色
	 * @param {Object} newTextureImg 光强主纹理图，不传使用默认纹理
	 * 
	 */
	lightWallEffects(options, newTextureImg) {
		var defaultOptions = {
			XZData: [
				0, 0,
				35, 0,
				35, 35,
				0, 35,
			], //光墙位置顶点数组（只涉及XZ坐标点）（顺时针方向）
			height: 10, //墙体高度，也就是模型光强位置顶点的y坐标
			name: 'lightWall_' + new Date().getTime(),
			opacity: 0.5, //材质透明度，
			color: '#ffffff', //材质颜色
		};

		let _options = Object.assign({}, defaultOptions, options);
		//新纹理
		let newTexture;
		if (newTextureImg) {
			newTexture = this.geTexture(newTextureImg);
			this.lightWallNewTexture.push(newTexture);
		}

		//补全点，实现闭合
		_options.XZData.push(_options.XZData[0], _options.XZData[1]);

		let data = _options.XZData;
		var geometry = new THREE.BufferGeometry();
		var posArr = [];
		var h = _options.height;
		var uvrr = [];
		for (let i = 0; i < data.length - 2; i += 2) {
			posArr.push(data[i], data[i + 1], 0, data[i + 2], data[i + 3], 0, data[i + 2], data[i + 3], h);
			posArr.push(data[i], data[i + 1], 0, data[i + 2], data[i + 3], h, data[i], data[i + 1], h);

			uvrr.push(0, 0, 1, 0, 1, 1)
			uvrr.push(0, 0, 1, 1, 0, 1)
		}

		geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr), 3)
		geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(uvrr), 2)

		geometry.computeVertexNormals()
		var material = new THREE.MeshLambertMaterial({
			map: newTextureImg ? newTexture : this.lightWallNewTexture[0],
			// color: _options.color,
			// color: "#e4393c",
			side: THREE.DoubleSide,
			transparent: false,
			opacity: _options.opacity,
			depthTest: false
		});

		let mesh = new THREE.Mesh(geometry, material);
		mesh.layers.toggle(1);
		mesh.name = _options.name;
		mesh.rotateX(-Math.PI / 2)

		this.lightWallList.push(mesh);
		this.scene.add(mesh);
		return mesh;
	}

	//获取纹理
	geTexture(img) {
		let texture = new THREE.TextureLoader().load(img || wavesImg);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		return texture
	}

	/**
	 * 光强新纹理流动
	 * @param {String} axis 标识图片内容偏移方向，坐标轴的标识，值分别是 x y z其中一个，默认 y
	 */
	lightWallNewTextureAnimateLoopToDo(axis = 'y') {
		if (this.lightWallNewTexture.length) {
			for (var i = 0; i < this.lightWallNewTexture.length; i++) {
				this.lightWallNewTexture[i]['offset'][axis] -= 0.01;
			}
		}
	}
}

export default lightWall
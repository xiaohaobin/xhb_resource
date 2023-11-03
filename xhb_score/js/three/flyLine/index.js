/**飞线动画**/
import * as THREE from 'three'
let lineImg = require('./../../../../assets/images/3DImg/line.png');

class flyLine {
	constructor(scene, renderer) {
		this.scene = scene;
		this.renderer = renderer;

		this.lineImgList = [lineImg];

		this.firstTexture = this.getLineTexture(lineImg); //默认纹理，第一个
		//飞线纹理列表
		this.textureList = [
			this.firstTexture
		];

		this.tubeLineList = []; //tube线列表

		//飞线特效变量集合
		this.flyLineEffectsData = {
			propList: [],
			// data1:{
			// 	index 
			// 	num 
			// 	points2   
			// 	indexMax  
			// 	points 
			// 	geometry2
			// size
			// }
		};
		this.flyLineName = undefined;
	}
	//飞线光源特效

	/**
	 * 实现飞线效果函数集合
	 * let pathPointList = [
		  new THREE.Vector3(50, 1, -50),
		  new THREE.Vector3(-50, 1, -50),
		  new THREE.Vector3(-50, 1, 50),
		  new THREE.Vector3(50, 1, 50),
		];       
		@param {Array} pathPointList 飞线路劲点数组，两点成一条线
		@param {Boolean} isUserTube 是否采用管道模拟飞线 
		@param {String} textureImg 飞线纹理图路劲
	 */
	flyLineEffectsInit(pathPointList, isUserTube, textureImg, flyLineName) {
		this.flyLineName = flyLineName;
		//用管道补全曲线不能改变粗度的问题
		if (isUserTube) this.createTubeGeometryByPathPointList(pathPointList, textureImg);
		//原先飞线效果
		if (!isUserTube) this.flyLineEffects(pathPointList, {}, isUserTube);

		// let f1 = this.flyLineEffects(
		//   [
		//     new THREE.Vector3(50, 20, -50),
		//     new THREE.Vector3(-50, 20, -50),
		//     new THREE.Vector3(-50, 20, 50),
		//     // new THREE.Vector3(50, 20, 50),
		//   ],
		//   { curveGetPoints: 500 }
		// );
	}

	/**
	 * 根据路劲坐标列表，创建管道模型
	 * @param {Array} pathPointList 飞线路劲点数组，两点成一条线
	 * @param {String} textureImg 飞线纹理图路劲
	 */
	createTubeGeometryByPathPointList(pathPointList, textureImg) {
		var that = this;
		let newTexture;
		if (textureImg) {
			this.lineImgList.push(textureImg);
			newTexture = this.getLineTexture(textureImg);
			this.textureList.push(newTexture)
		}
		let texture = this.textureList[0];
		//纹理 MeshBasicMaterial MeshLambertMaterial MeshMatcapMaterial MeshPhongMaterial MeshPhysicalMaterial  MeshStandardMaterial MeshToonMaterial
		let material = new THREE.MeshBasicMaterial({
			map: textureImg ? newTexture : texture,
			// side: THREE.BackSide,
			transparent: true,
			depthWrite: false, // 管道飞线的关键
			side: THREE.DoubleSide,
			// color:"#fff",             // 定义颜色，会与白色贴图混合
		});



		// CatmullRomCurve3创建一条平滑的三维样条曲线
		let curve = new THREE.CatmullRomCurve3(
			pathPointList,
			false,
			"catmullrom", ////centripetal, chordal  catmullrom.曲线类型
			0
		); // 曲线路径

		// 创建管道
		// let tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.8)
		// let tubeGeometry = new THREE.TubeGeometry(curve, 80, 1,8);
		// let tubeGeometry = new THREE.TubeGeometry(curve, 80, 3);
		let tubeGeometry = new THREE.TubeGeometry(curve, 80, 6);

		let line3 = new THREE.Mesh(tubeGeometry, material);
		line3.layers.toggle(1);


		line3.name = (this.flyLineName || "tubeLine_") + (this.tubeLineList.length + 1)
		this.scene.add(line3);
	}

	//获取道路流光飞线纹理
	getLineTexture(img) {

		let texture = new THREE.TextureLoader().load(img || lineImg)
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
		texture.repeat.set(1, 1)
		texture.needsUpdate = true
		return texture;
	}

	/**
	 * 飞线光源特效
	 * @param {Array} pathPointList 三维向量数组，注意：当数组长度为2，也就是只有两个点，如何开启路劲自动闭合，则轨道光源会来回跑动
	 * @param {Object} options 曲线和颜色参数相关
	 * @param {Number} options[curveGetPoints] 曲线分段数，默认100，值越大，则轨道光源越小，默认100
	 * @param {Boolean} options[isPathClosure] 路劲是否闭合，如开启路劲自动闭合，则轨道光源会来回跑动
	 * @param {String || Hex} options[lineColor] 线段颜色
	 * @param {Array} options[pointColor] 轨迹光源点颜色数组，长度2
	 * @param {Number} options[tension] 曲线张力，默认0  //值越小越接近直线，配合catmullrom
	 * */
	flyLineEffects(pathPointList, options, isUserTube) {
		let flyGroup = new THREE.Group();
		var that = this;

		var defaultOptions = {
			curveGetPoints: 100, //曲线分段数
			isPathClosure: false, //路劲是否闭合
			lineColor: "#00ffff", //线段颜色
			pointColor: ["#00ffff", '#ffff00'], //轨迹光源点颜色
			tension: 0, //曲线张力  //值越小越接近直线，配合catmullrom
		};
		const _options = Object.assign({}, defaultOptions, options);


		let flyLineEffectsDataLen = that.flyLineEffectsData.propList.length;
		let flyLineEffectsProp = "data" + (flyLineEffectsDataLen + 1);
		that.flyLineEffectsData[flyLineEffectsProp] = {};

		that.flyLineEffectsData[flyLineEffectsProp]['size'] = _options.curveGetPoints; //分段数100，返回101个顶点

		/**
		 * 创建线条模型
		 */
		var geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
		var curve = new THREE.CatmullRomCurve3(
			pathPointList,
			_options.isPathClosure, //是否闭合
			"catmullrom", //centripetal, chordal  catmullrom.曲线类型
			_options.tension //值越小越接近直线，配合catmullrom
		);
		//曲线上等间距返回多个顶点坐标
		that.flyLineEffectsData[flyLineEffectsProp]['points'] = curve.getPoints(that.flyLineEffectsData[
			flyLineEffectsProp]['size']); //分段数100，返回101个顶点

		geometry.setFromPoints(that.flyLineEffectsData[flyLineEffectsProp]['points']);
		var material = new THREE.LineBasicMaterial({
			color: _options.lineColor, //轨迹颜色
		});
		var line = new THREE.Line(geometry, material);
		if (isUserTube) line.visible = false;
		flyGroup.add(line);


		//需要反复引用的变量：index num points2   indexMax  that.points geometry2
		that.flyLineEffectsData[flyLineEffectsProp]['index'] = 20; //取点索引位置
		that.flyLineEffectsData[flyLineEffectsProp]['num'] = 15; //从曲线上获取点数量//标识能源线中光波点数量		  

		that.flyLineEffectsData[flyLineEffectsProp]['points2'] = that.flyLineEffectsData[flyLineEffectsProp][
			'points'
		].slice(
			that.flyLineEffectsData[flyLineEffectsProp]['index'],
			that.flyLineEffectsData[flyLineEffectsProp]['index'] + that.flyLineEffectsData[flyLineEffectsProp][
				'num'
			]
		); //从曲线上获取一段

		var curve = new THREE.CatmullRomCurve3(that.flyLineEffectsData[flyLineEffectsProp]['points2']);
		var newPoints2 = curve.getPoints(that.flyLineEffectsData[flyLineEffectsProp]['size']); //获取更多的点数		  

		that.flyLineEffectsData[flyLineEffectsProp]['geometry2'] = new THREE.BufferGeometry();
		that.flyLineEffectsData[flyLineEffectsProp]['geometry2'].setFromPoints(newPoints2);

		// 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
		var percentArr = []; //attributes.percent的数据
		for (var i = 0; i < newPoints2.length; i++) {
			percentArr.push(i / newPoints2.length);
		}
		var percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1);
		that.flyLineEffectsData[flyLineEffectsProp]['geometry2'].attributes.percent = percentAttribue;

		// 批量计算所有顶点颜色数据
		var colorArr = [];
		for (var i = 0; i < newPoints2.length; i++) {
			var color1 = new THREE.Color(_options.pointColor[0]); //轨迹线颜色 青色
			// var color2 = new THREE.Color(0xef4136); //
			var color2 = new THREE.Color(_options.pointColor[1]); //
			var color = color1.lerp(color2, i / newPoints2.length)
			colorArr.push(color.r, color.g, color.b);
		}
		// 设置几何体顶点颜色数据
		that.flyLineEffectsData[flyLineEffectsProp]['geometry2'].attributes.color = new THREE.BufferAttribute(
			new Float32Array(colorArr), 3);

		// 点模型渲染几何体每个顶点
		var PointsMaterial = new THREE.PointsMaterial({
			// color: 0xffff00,
			size: 4.0, //点大小
			vertexColors: THREE.VertexColors, //使用顶点颜色渲染
		});
		var flyPoints = new THREE.Points(that.flyLineEffectsData[flyLineEffectsProp]['geometry2'], PointsMaterial);
		flyPoints.layers.toggle(1)
		flyGroup.add(flyPoints);

		// 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
		PointsMaterial.onBeforeCompile = function(shader) {
			// 顶点着色器中声明一个attribute变量:百分比
			shader.vertexShader = shader.vertexShader.replace(
				'void main() {',
				[
					'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
					'void main() {',
				].join('\n') // .join()把数组元素合成字符串
			);
			// 调整点渲染大小计算方式
			shader.vertexShader = shader.vertexShader.replace(
				'gl_PointSize = size;',
				[
					'gl_PointSize = percent * size;',
				].join('\n') // .join()把数组元素合成字符串
			);
		};
		// 飞线动画
		that.flyLineEffectsData[flyLineEffectsProp]['indexMax'] = that.flyLineEffectsData[flyLineEffectsProp][
			'points'
		].length - that.flyLineEffectsData[flyLineEffectsProp]['num']; //飞线取点索引范围
		that.flyLineEffectsData.propList.push(flyLineEffectsProp);

		this.scene.add(flyGroup);
		flyGroup.name = (this.flyLineName || "flyLine_") + new Date().getTime();
	}


	//飞线动画轮询计算执行
	flyLineAnimateLoopTodo() {
		if (this.flyLineEffectsData.propList.length) {
			// let len = this.flyLineEffectsData.propList.length;
			for (var key in this.flyLineEffectsData) {
				if (this.flyLineEffectsData[key] && key.indexOf('data') >= 0) {
					if (this.flyLineEffectsData[key]['points']) {
						if (this.flyLineEffectsData[key]['index'] > this.flyLineEffectsData[key]['indexMax']) this
							.flyLineEffectsData[key]['index'] = 0;
						this.flyLineEffectsData[key]['index'] += 1
						this.flyLineEffectsData[key]['points2'] = this.flyLineEffectsData[key]['points'].slice(this
							.flyLineEffectsData[key]['index'], this.flyLineEffectsData[key]['index'] + this
							.flyLineEffectsData[key]['num']); //从曲线上获取一段

						var curve = new THREE.CatmullRomCurve3(this.flyLineEffectsData[key]['points2']);
						var newPoints2 = curve.getPoints(this.flyLineEffectsData[key]['points2']['size'] ||
						100); //获取更多的点数
						this.flyLineEffectsData[key]['geometry2'].setFromPoints(newPoints2);
					}
				}
			}
		}

		//管道飞线纹理计算
		this.textureList.forEach((item, i) => {
			item.offset.x -= 0.01;
			// item.offset.x -= 0.015;
			// item.offset.x -= 0.1;
		});
	}
}

export default flyLine
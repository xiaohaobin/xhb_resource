

/**光幕扩散波*/

// import { forEach } from 'core-js/es6/array';
import * as THREE from 'three'

class lightWave {
	constructor(scene, renderer) {
		this.scene = scene;
		this.renderer = renderer;
		
		this.lightWaveList = [];

		this.vertexShader = `
			varying vec4 vPosition;
			void main() {
			  vPosition = modelMatrix * vec4(position,1.0);
			  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`;

		this.fragmentShader = `
		  uniform vec3 uColor; // 光墙半径        
		  uniform vec3 uMax; 
		  uniform vec3 uMin;
		  uniform mat4 modelMatrix; // 世界矩阵
		  varying vec4 vPosition; // 接收顶点着色传递进来的位置数据
		  
		 
		  void main() {
		    // 转世界坐标
		    vec4 uMax_world = modelMatrix * vec4(uMax,1.0);
		    vec4 uMin_world = modelMatrix * vec4(uMin,1.0);
		    // 根据像素点世界坐标的y轴高度,设置透明度
		    float opacity =1.0 - (vPosition.y - uMin_world.y) / (uMax_world.y -uMin_world.y); 
			
		     gl_FragColor = vec4( uColor, opacity);
		  }
		`;

		this.group = new THREE.Group();
		this.clock = new THREE.Clock() // 时钟，
		this.time = {
			value: 0
		};

		this.startTime = {
			value: 0
		};
		this.startLength = {
			value: 2
		}
		this.isStart = false; // 启动
	}
	// 光墙光幕效果
	createWall(options) {

		// 定义光幕参数
		let defaultOptions = {
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			height: 10,
			radius: 10, //半径
			maxRadius: 100, //扩散最大半径
			color: '#efad35',
			opacity: 0.4,
			period: 2,
		};
		let wallData = Object.assign({}, defaultOptions, options);

		const point1 = new THREE.Vector3()
		const point2 = point1.clone().setY(point1.y + wallData.height)
		const curve = new THREE.LineCurve3(point1, point2);
		const geometry = new THREE.TubeGeometry(curve, 20, wallData.radius, 220, false);
		// 确定光墙包围盒box
		geometry.computeBoundingBox();
		const max = geometry.boundingBox.max;
		const min = geometry.boundingBox.min

		// 创建材质
		const material = new THREE.ShaderMaterial({
			color: wallData.color,
			opacity: wallData.opacity,
			transparent: true,
			side: THREE.DoubleSide, // 两面都渲染
			depthTest: false, // 关闭材质的深度测试
			uniforms: {
				uMax: {
					value: max
				},
				uMin: {
					value: min
				},
				uColor: {
					value: new THREE.Color(wallData.color)
				}

			},
			vertexShader: this.vertexShader,
			fragmentShader: this.fragmentShader,
		});

		// 创建wall
		const wall = new THREE.Mesh(geometry, material)
		// wall.layers.toggle(1);//辉光，感觉效果一般
		
		wall.renderOrder = 1000 // 渲染顺序

		wall.name = 'lightWaveList_' + (this.lightWaveList.length + 1);
		const {
			x,
			y,
			z
		} = wallData.position
		wall.position.set(x, y, z)
		wall.updateMatrix();

		this.lightWaveList.push({
			options:wallData,
			mesh:wall,
			originScale:wall.scale.clone()
		})
		this.scene.add(wall);
		
	
		this.isStart = true;
		
		return wall;
	}

	// 数据更新
	updateData() {

		if (!this.isStart) return false;
		const dt = this.clock.getDelta();
		this.time.value += dt;
		this.startTime.value += dt;

		if (this.startTime.value >= this.startLength.value) {
			this.startTime.value = this.startLength.value;
		}
	}

	//轮询计算
	lightWaveListCalLoopTodo() {
		this.updateData() 
		if(this.lightWaveList.length){
				this.lightWaveList.forEach((item,i)=>{
					const time = JSON.parse( JSON.stringify(this.time.value) );
					const {
						period,
						radius,
						maxRadius
					} = item.options
					const rate = (time % period) / period
					const currRadius = rate * (maxRadius - radius) + radius
					const scaleRate = currRadius / radius
					const matrix = new THREE.Matrix4().makeScale(scaleRate, 1, scaleRate)
					
					item.mesh.scale.copy(item.originScale.clone().applyMatrix4(matrix))
					item.mesh.updateMatrix()
					
				});
		}
	}
		
}

export default lightWave 
/**雷达动画**/
import * as THREE from 'three'
import Waves from './Waves.js'

class Radar {
	constructor(scene, renderer) {
		this.scene = scene;
		this.renderer = renderer;

		//雷达时间列表集合
		this.radarTimeList = {
			propList: [],
			// time1: {
			//   value: 0
			// }
		};
		this.radarList = [];
	}

	/**
	 * 加载雷达扫描效果
	 * @param {Array} radarData 雷达集合配置数据
	 * 雷达单个配置：
	 * {
	    position: {
	      x: 46.88517423323151,
	      y: 0,
	      z: 90
	    },
	    radius: 10,
	    color: '#efad35',
	    opacity: 0.6,
	    speed: 1 雷达运转速度
	  }
	 * */
	radarEffect(radarData) {
		let len = this.radarTimeList.propList.length;
		let propName = 'time' + (len + 1);
		this.radarTimeList[propName] = {
			value: 0
		};

		radarData.forEach((data) => {
			const mesh = Waves(data);
			mesh.layers.toggle(1)
			mesh.material.uniforms.time = this.radarTimeList[propName];
			mesh.name = 'radar' + (len + 1);
			this.scene.add(mesh);
			this.radarList.push(mesh);
		});

		this.radarTimeList.propList.push(propName);
	}

	//雷达扫描时间计算
	radarAnimateLoopTodo() {
		if (this.radarTimeList.propList.length) {
			for (var key in this.radarTimeList) {
				if (this.radarTimeList[key] && key.indexOf('time') >= 0) {
					this.radarTimeList[key]['value'] += 0.1;
				}
			}
		}
	}
}

export default Radar
/**扫光材质**/
import * as THREE from 'three'
import SweepLightShader from "./SweepLightShader";

class SweepLight{
	constructor(color){
		const Shader = SweepLightShader; //引用着色器
		
		const uniform = {
			u_color: {
				value: new THREE.Color("#00ffff")
			},
			u_tcolor: {
				value: new THREE.Color(color || "#ffffff")
			},
			u_r: {
				value: 0.25
			},
			u_length: {
				value: 10
			}, //扫过区域
			u_height: {
				value: 30.5
			}
		};
		this.material = new THREE.ShaderMaterial({
			vertexShader: Shader.Shader.vertexShader,
			fragmentShader: Shader.Shader.fragmentShader,
			side: THREE.DoubleSide,
			uniforms: uniform,
			transparent: true,
			opacity: 0.5,
			depthWrite: false,
		});
		
		
		this.clock = new THREE.Clock();
		
	}
	
	//材质随动画运行而解耦计算
	materialCalLoopTodo(){
		this.material.uniforms.u_r.value += this.clock.getDelta() * 80;
		if (this.material.uniforms.u_r.value >= 300) {
			this.material.uniforms.u_r.value = 20;
		}
		
	}
	
}

export default SweepLight
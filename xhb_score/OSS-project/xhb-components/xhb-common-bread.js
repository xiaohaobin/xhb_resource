/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应OSS系统的面包屑组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbCommonBread = {
    name:"xhbCommonBread",
    template:`<div class="xhb-common-bread">
                <b class="xhb-common-bread-title">{{ name }}</b>
                <span class="xhb-common-bread-content">
                    <span>{{ name }}</span> &gt; 
                    <span>{{ subname }}</span>
                </span>
            </div>`,
    data() {
        return {
           
        }
    },
    watch:{					
        
    },
    created() {
       
       
    },
    props:{
        //父菜单
        name:{
            type: String,
            default:''
        },
         //子菜单
         subname:{
            type: String,
            default:''
        }
    },
    mounted() {

    },
    methods:{}

};
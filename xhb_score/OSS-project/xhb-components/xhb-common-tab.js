/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应OSS系统的面包屑组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbCommonTab = {
    name:"xhbCommonTab",
    template:`<div class="sys_tab_box flex_space-between" v-if="mainData.length">
                <ul class="flex_flex-start">
                    <li v-for="(v,i) in mainData" :class=" v.curr ? 'curr' : '' " @click="switchCurr(v,i)" :key=" i + '-xhb-common-tab' "><a>{{ v.txt }}</a></li> 							
                </ul>
            </div>`,
    data() {
        return {
           mainData:[],
        }
    },
    watch:{					
        
    },
    created() {
       this.mainData = JSON.parse( JSON.stringify(this.list) );
       
    },
    props:{
        //tab页主要数据
        list:{
            type: Array,
            default:[
                // {curr:true, txt:'tab1'}
            ]
        },
        
    },
    mounted() {

    },
    methods:{
        switchCurr(v,i){
            this.mainData.forEach((item,index)=>{
                item.curr = (index === i);
            });
            this.$emit('tabclick',[v,i]);
        },
    }

};
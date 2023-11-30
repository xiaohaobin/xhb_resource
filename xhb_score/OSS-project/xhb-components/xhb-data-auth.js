/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 适应OSS系统的数据权限组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbDataAuth = {
    name:"xhbDataAuth",
    template:`<div class="xhb-data-auth">
                <div class="flex-flex-start">
                    <div :style="{width:data_auth_label_width,paddingRight:'12px'}">
                        <b class="fs-16">功能模块</b>
                    </div>
                    <div >
                        <b class="fs-16">数据权限</b>
                    </div>
                </div>
                <el-form ref="dataAuthForm"  size="medium" :label-width="data_auth_label_width" label-position="left" :key="xhbDataAuthKey">
                    <el-form-item :label=" item.txt " v-for="(item,index) in dataAuthList" :key="index" class="data-auth-form-item">
                        <el-radio-group v-model="item.checked" @input="inputEvent">
                            <el-radio :label="k" v-for="(v,k) in item.checkboxList" :key=" k + '-' + item.name ">{{ item.checkboxList[k] }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <div class="mt-20 flex_center">
                    <el-button type="primary" size="small" class="mr-30" @click="dataAuthListSubmit">提交</el-button>
                    <el-button size="small" @click="dataAuthListCancel">取消</el-button>
                </div>
            </div>`,
    data() {
        return {
            dataAuthList:[],
            dataAuthSet:{},//设置数据权限列表数据
            xhbDataAuthKey:+new Date(),
        }
    },
    watch:{					
        
    },
    async created() {
       
       this.dataAuthList = JSON.parse( JSON.stringify(this.data_auth_list) );
       this.dataAuthSet = JSON.parse( JSON.stringify(this.data_auth_set) );
       await this.dataAuthListSet();
    },
    props:{
        //设置label宽度
        data_auth_label_width:{
            type: String,
            default: '150px'
        },
        //初始化权限列表数据
        data_auth_list:{
            type: Array,
            default: []
        },
        //设置数据权限列表数据
        data_auth_set:{
            type: Object,
            default: {
                // data_question: 2,
                // data_workOrder: 0,
                // data_repDeviceApply: 1,
                // data_plyWarranty: 1,
                // data_warranty: 1,
                // data_supplyRecord: 1,
                // data_disManage: 1,
                // data_insManage: 1,
                // data_customerManage: 1,
                // data_asManage: 0,
                // data_apiToken: 1,
                // data_operator: 0,
            }
        }
    },
    mounted() {

    },
    methods:{
        //设置数据权限提交
        dataAuthListSubmit(){
            let param = {};
            this.dataAuthList.forEach((item)=>{
                param[item.name] = item.checked;
            });
            // console.log(param,"要设置的数据权限数据");
            this.$emit('submit',param);
            return param;
        },
        //取消设置数据权限
        dataAuthListCancel(){
            this.$emit('cancel',this.dataAuthList);
        },
        //设置回写数据权限列表
        async dataAuthListSet(){
            this.dataAuthList.forEach((item)=>{
                for(let key in this.dataAuthSet){
                    if(item.name == key){
                        item.checked = this.dataAuthSet[key]+'';
                    }
                }
            });
        },
        inputEvent(){
            console.log(this.dataAuthList,".......变更");
            this.xhbDataAuthKey = +new Date();
        }
    }

};
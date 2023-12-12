/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 区域国家复选框组组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbAreaCountrySelect = {
    name:"xhbAreaCountrySelect",
    template:`<div class="xhb-area-country-select flex-flex-start" v-if="areaAndCountryConfig.data.length">
                <div class="xhb-area-select w-30">
                    <h4 class="required">区域</h4>
                    <div class="xhb-area-select-checkbox-group">
                        <el-checkbox :indeterminate="areaAndCountryConfig.area.isIndeterminate" v-model="areaAndCountryConfig.area.checkAll" 
                        class="pl-5"
                        @change="handleCheckAllChange" v-show=" JSON.stringify(specialCheckedList) == '{}' ">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="areaAndCountryConfig.area.checkedCities" @change="handleCheckedCitiesChange">
                            <div v-for="(item,index) in areaAndCountryConfig.data"  :key="item.id + '_' + item.txt " 
                            class="mb-5 el-checkbox-div pd-5" 
                            @click.stop="switchCurrArea(item,index)"
                            :class="item.curr ? 'curr' : '' ">
                                <el-checkbox :label="item.id" :disabled="item.disabled">{{item.txt}}</el-checkbox>
                            </div>
                        
                        </el-checkbox-group>
                    </div>
                </div>
                <div class="xhb-area-country-select-line w-10"></div>
                <div class="xhb-country-select w-60">
                    <h4 class="required">国家</h4>
                    <div>
                        <el-input placeholder="搜索国家" v-model="areaAndCountryConfig.countryKeyword" size="small" prefix-icon="el-icon-search">	
                        </el-input>
                    </div>
                    
                    <div>
                        <div class="xhb-country-select-checkbox-group" v-for="(v,i) in areaAndCountryConfig.data" :key="v.id + '-xhb-area-country' " v-show="v.curr">
                            <el-checkbox :indeterminate="v.isIndeterminate" v-model="v.checkAll" @change="childHandleCheckAllChange" 
                            v-show="areaAndCountryConfig.countryKeyword == '' && !(specialCheckedList[v.id]) ">全选</el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="v.checkedCities" @change="childHandleCheckedCitiesChange">
                                <div v-for="(item,index) in v.children"  :key="item.id + '_' + item.txt " v-show="filterCountryByKeyword(item)"                                
                                :class=" item.special ? 'xhb-special-checkbox' : '' ">
                                    <el-checkbox :label="item.id"  class="mb-5 mt-5" :disabled="item.disabled" >{{item.txt}}</el-checkbox>
                                </div>
                            
                            </el-checkbox-group>
                        </div>

                    </div>
                    
                </div>
            </div>`,
    data() {
        return {
            //区域国家数据配置
            areaAndCountryConfig:{
                data:[],//java web工程中，该数据来源于oss系统	xhb_oss_spring.areaAndCountryList 变量；xhb_oss_spring.areaAndCountryList如果不存在，则调用公共方法异步请求获取oComFn.getAreaCountryName()				
                area:{
                    checkAll: false,
                    isIndeterminate: false,
                    checkedCities:[],
                },
                countryKeyword:''
            },
            canCheckedList:{},
            checkedList:{},
            specialCheckedList:{},
            disabledList:{},
        }
    },
    watch:{					
        
    },
    async created() {
        let worldData = JSON.parse(JSON.stringify(this.world_data));
        //区域国家数据一级子元素批量添加checkbox配置
        worldData.forEach((item)=>{
            //全选标识和配置
            item.checkAll = false;
            item.isIndeterminate = false;
            item.checkedCities = [];

            if(!this.all){
                 //默认都不可选中
                item.disabled = true;
                item.children.forEach((child)=>{
                    child.disabled = true;
                });
            }
           
        });
        console.log(worldData,"this.worldData")
        this.areaAndCountryConfig.data = worldData;
       
        //根据 允许勾选设置列表，设置多选框disabled状态
        await this.setCheckboxStatusByCanCheckedList();
        
        //根据 已经勾选区域和国家id列表，设置多选框checked状态
        await this.setCheckboxStatusByCheckedList();

         //根据 已经特殊勾选的区域和国家id列表，设置多选框checked状态以及class
        await this.setCheckboxStatusBySpecialCheckedList();

        //根据 已经被禁用的区域和国家id列表，设置多选框checked的disabled状态
        await this.setCheckboxStatusByDisabledList();

        //设置最后一个区域被选中
        await this.setOnlyItemCurr();
    },
    props:{
        //区域，国家数据
        world_data:{
            type: Array,
            default:[]
        },      
        //已选id 列表
        checked_list:{
            type: Object, 
            default:{
                // 1:['52','54'],
                // 2:['2','143'],
            }
        },
        //可选id 列表
        can_checked_list:{
            type: Object, 
            default:{
                // 1:['1','6','7','52','54'],
                // 2:['2','143','145']
            }
        },
        //已选特殊id 列表
        special_checked_list:{
            type: Object, 
            default:{
                // 1:['52']
            }
        },
        //呗禁用列表
        disabled_list:{
            type: Object,
            default:{
                // 1:['52']
            }
        },
        all:{//是否有全部区域国家列表，一般只有初级部门或者公司添加权限才有
            type: Boolean, 
            default:true
        }
    },
    mounted() {

    },
    methods:{
        //------------------------------------区域国家方法===============================================
        handleCheckAllChange(val) {
            let allAreaId = [];
            this.areaAndCountryConfig.data.forEach((item)=>{
                if(!item.disabled) allAreaId.push( item.id )
                
            });
            this.areaAndCountryConfig.area.checkedCities = val ? allAreaId : [];
            this.checkAll(val);
           
            this.areaAndCountryConfig.area.isIndeterminate = false;
        },
        //子元素是否全选
        checkAll(b){
            this.areaAndCountryConfig.data.forEach((o,i)=>{
                if(b){
                    o.checkedCities = checkAll(o.children);
                }else{
                    o.checkedCities = [];
                }
            });
            function checkAll(array){
                let list = [];
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    list.push(element.id);
                }
                return list;
            }
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.areaAndCountryConfig.area.checkAll = (checkedCount === this.areaAndCountryConfig.data.length);
            this.areaAndCountryConfig.area.isIndeterminate = (checkedCount > 0 && checkedCount < this.areaAndCountryConfig.data.length);

            //没有选中的区域，清空所在备选国家列表checkedCities
            this.$nextTick(()=>{
                this.areaAndCountryConfig.data.forEach((o,i)=>{
                    if( !value.includes(o.id) ) {
                        o.checkedCities = [];
                        o.isIndeterminate = false;
                        o.checkAll = false;
                    }
                    
                });
            });
        },
        //切换选择当前区域，以展示对应的国家数据
        switchCurrArea(item,index){
            // if(item.disabled) return;
            this.areaAndCountryConfig.data.forEach((o,i)=>{
                o.curr = (index === i)
            });
            // item.id
            if(!this.areaAndCountryConfig.area.checkedCities.includes(item.id) ) this.areaAndCountryConfig.area.checkedCities.push(item.id);
        },
        //国家全选监听20231204
        childHandleCheckAllChange(val) {
            let allAreaId = [];
            this.areaAndCountryConfig.data.forEach((item)=>{
                
                if(item.curr){
                    item.children.forEach((v,i)=>{
                        if(!v.disabled) allAreaId.push( v.id );
                        
                    });
                    item.checkedCities = val ? allAreaId : [];
                    item.isIndeterminate = false;
                }

                this.$nextTick(()=>{
                    let b = this.areaAndCountryConfig.area.checkedCities.includes(item.id);
                    if(item.checkedCities.length){
                        if(!b) this.areaAndCountryConfig.area.checkedCities.push(item.id)
                    }
                    else{
                        let sort = this.areaAndCountryConfig.area.checkedCities.indexOf(item.id);
                        if(sort >= 0) this.areaAndCountryConfig.area.checkedCities.splice(sort, 1);
                    }
                });
            });
            
        },
        //国家复选组监听20231204
        childHandleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.areaAndCountryConfig.data.forEach((item)=>{	                       
                
                if(item.curr){
                    let b = this.areaAndCountryConfig.area.checkedCities.includes(item.id);
                    if(checkedCount){//某个区域下有选择国家，则区域被选中
                        if(!b) this.areaAndCountryConfig.area.checkedCities.push(item.id);
                    }else{//某个区域下无选择国家，则区域不被选中
                        let sort = this.areaAndCountryConfig.area.checkedCities.indexOf(item.id);
                        if(sort >= 0) this.areaAndCountryConfig.area.checkedCities.splice(sort, 1);
                    }

                    item.checkAll = (checkedCount === item.children.length);
                    item.isIndeterminate = (checkedCount > 0 && checkedCount < item.children.length);
                }
            });
        },
        //国家选中之后
        //根据关键词筛选国家
        filterCountryByKeyword(item){
            // let keyword = this.areaAndCountryConfig.countryKeyword.replace(/\s+/g,'');
            let keyword = this.areaAndCountryConfig.countryKeyword;
            if(keyword == '') {
                return true;
            }else{
                return (item.txt.search(keyword) >= 0 ? true : false);
            }						
        },
        //获取已选择的国家id列表
        getCheckedCountryList(){
            let areaData = {};
            this.areaAndCountryConfig.data.forEach((item)=>{
                areaData[ item['id'] ] = item['checkedCities'];	
            });
            return areaData;
        },
        //获取已选择的区域id列表
        getCheckedAreaList(){
            return this.areaAndCountryConfig.area.checkedCities
        },
        /**
         * 动态加载外部js文件
         * @param {String} path 本地路径，注意：末尾不要加“.js”后缀
         * @param {Function} callback 动态加载js成功的回调函数
         * */
        _loadJs(path, callback) {
            callback = !(typeof(callback) == "undefined") ? callback : function() {};
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var script = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others: Firefox, Safari, Chrome, and Opera
                script.onload = function() {
                    callback();
                };
            }
            script.src = path + ".js";
            oHead.appendChild(script);
        },
        //根据 允许勾选设置列表，设置多选框disabled状态
        async setCheckboxStatusByCanCheckedList(){
            //允许勾选设置数据的范围
            this.canCheckedList = JSON.parse( JSON.stringify(this.can_checked_list) );
            //
            this.areaAndCountryConfig.data.forEach((item,i)=>{
                if(JSON.stringify( this.canCheckedList ) === "{}"){//有限制的国家数据
                    item.children.forEach((child)=>{
                        child['disabled'] = false;
                    });
                }else{
                    let a = this.canCheckedList[item.id];
                    if(a){//有限制区域
                        if(a.length === item.children.length){
                            item['disabled'] = false;
                        }
                        item.children.forEach((child)=>{
                            child['disabled'] = !(a.includes(child.id));
                        });
                    }else{
                        item['disabled'] = true;
                        item.children.forEach((child)=>{
                            child['disabled'] = true;
                        });
                    }
                }

            });

        },
       
        
        /**
         * 设置已经勾选列表
         * @param {Object} list 已勾选的id列表，如{"1":["2"]}
         * @param {Boolean} isSpecialList list是否为特殊勾选的列表
         * 
        */
        setCheckboxStatusByList(list,isSpecialList){
            let areaIdList = [];
            for(let key in list){
                areaIdList.push( key + '' );
            }
            //数组覆盖，是防止特殊权限和已选权限重叠
            this.areaAndCountryConfig.area.checkedCities = this.areaAndCountryConfig.area.checkedCities.concat( areaIdList );
            //简单去重
            this.areaAndCountryConfig.area.checkedCities = [...new Set( this.areaAndCountryConfig.area.checkedCities )];

            this.areaAndCountryConfig.data.forEach((item,i)=>{
                for(let key2 in list){
                    if(key2*1 === item.id*1){
                        if(areaIdList[0] == item.id) item.curr = true;
                        //数组覆盖，是防止特殊权限和已选权限重叠
                        item.checkedCities = item.checkedCities.concat( list[key2] );
                        //简单去重
                        item.checkedCities = [...new Set( item.checkedCities )];

                        //国家特殊权限，设置特殊参数special为true
                        if(isSpecialList){
                            item.disabled = true;//有特殊权限的区域，为选中，禁止操作状态
                            item.special = true;
                            item.children.forEach((child)=>{
                                if(list[key2].includes(child.id)){
                                    child.special = true;
                                    child.disabled = true;
                                }
                            });
                        }
                       
                    }
                }
                
            });
        },
        //根据 已经勾选区域和国家id列表，设置多选框checked状态
        async setCheckboxStatusByCheckedList(){
            this.checkedList = JSON.parse( JSON.stringify(this.checked_list) );
            this.setCheckboxStatusByList(this.checkedList);
        },
        //根据 已经特殊勾选的区域和国家id列表，设置多选框checked状态以及class
        async setCheckboxStatusBySpecialCheckedList(){
            this.specialCheckedList = JSON.parse( JSON.stringify(this.special_checked_list) );
            this.setCheckboxStatusByList(this.specialCheckedList, true);
        },
        //判断主要数据中有选择国家的情况，则对应区域勾选
        checkedAreaForCountryChecked(){
            //this.areaAndCountryConfig.area.checkedCities
            this.$nextTick(()=>{
                this.areaAndCountryConfig.data.forEach((item)=>{
                    let b = this.areaAndCountryConfig.area.checkedCities.includes(item.id);
                    if(item.checkedCities.length){
                        if(!b) this.areaAndCountryConfig.area.checkedCities.push(item.id)
                    }
                    else{
                        let sort = this.areaAndCountryConfig.area.checkedCities.indexOf(item.id);
                        if(sort >= 0) this.areaAndCountryConfig.area.checkedCities.splice(sort, 1);
                    }
                });
            });
        },
        //根据 已经被禁用的区域和国家id列表，设置多选框checked的disabled状态
        async setCheckboxStatusByDisabledList(){
            this.disabledList = JSON.parse( JSON.stringify(this.disabled_list) );

            this.areaAndCountryConfig.data.forEach((item,i)=>{
                let d = this.disabledList[item.id];
                if(d && d.length){
                    item.children.forEach((v,e)=>{
                       if(d.includes( v.id )){
                           v.disabled = true;
                       }
                    });
                }

            });
        },
        //设置最后一个区域被选中
        async setOnlyItemCurr(){
            let list = [];
            this.areaAndCountryConfig.data.forEach((item,i)=>{
               if(item.curr) list.push(i);
            });
            if(list.length){
                let sort = list[list.length-1];
                //切换选择当前区域，以展示对应的国家数据
                this.switchCurrArea(this.areaAndCountryConfig.data[sort],sort);
            }
        },
        
    }

};
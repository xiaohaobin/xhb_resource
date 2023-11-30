/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 功能权限树状组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbAuthTree = {
    name:"xhbAuthTree",
    template:`<div class="xhb-auth-tree"><div class="el-tree-box-div2" >
                <el-input
                    placeholder="输入关键字进行过滤"
                    size="small" 
                    prefix-icon="el-icon-search"
                    class="mb-5 ml-5"
                    style="max-width:350px"
                    v-model="filterText">
                </el-input>
                <div @click.stop="clickPage" class="el-tree-box-div2-content">
                    <el-tree
                        ref="authTreeData"
                        :data="treeData"     
                        show-checkbox   
                        node-key="id"                        
                        :empty-text=" no_data_notice "
                        @node-click="nodeClickEvent"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        :highlight-current="false"
                        :check-on-click-node="true"
                        @node-expand="nodeExpand"
                        @check-change="checkChange"
                        :default-expanded-keys="defaultExpandedKeys"
                        :default-checked-keys="defaultCheckedKeys"
                        @node-collapse="nodeCollapse"
                        >

                        <span class="custom-tree-node" slot-scope="{ node, data }" :class="getLowLevelClass(node, data)">
                            {{ data.authName }}   
                        </span>
                    </el-tree>
                </div>
           
            </div></div>`,
    data() {
        return {
            treeData:[],
            defaultProps: {
                children: 'subs',
                label: 'authName',
                pid:'parentId'
            },
            currNode:null,//当前操作节点数据
            currNodeObj:null,//当前操作节点
            isAddRootNode:false,//是否添加根节点
            treeTodoFn:null,//树状数据处理器
            filterText:'', 
            defaultExpandedKeys:[],//默认展开key id
            defaultCheckedKeys:[],//默认选项key id
        }
    },
    watch:{					
        async currNode(n,o){
            this.$nextTick(()=>{          
                if(this.currNode){
                    //根据所选节点数据获取树节点对象
                    this.currNodeObj = this.$refs.authTreeData.getNode(this.currNode);
                }
                else{
                    this.currNodeObj = null;
                }
                
                this.$emit('curr_node_change', [this.currNode,this.currNodeObj] );
                
            });
           
        },
        async filterText(n,o){
            this.filterTree(n);
             //重新设置树节点样式
            await this.resetTreeNodeStyle();
        },
        
    },
   
    created() {
        
        //定义树状处理器函数
        if(typeof Tree == "function"){
            this.treeTodoFn = new Tree({id: "id", pId: "parentId", children: "subs"});
        }
        else{
            this._loadJs('../../js/treeDataTodo2',()=>{
                this.treeTodoFn = new Tree({id: "id", pId: "parentId", children: "subs"});
            });
        }
        
        this.disabled_list = this.disabled_list.concat( this.special_checked_list );
        //复制子组件数据
        this.treeData = this.initTreeData();

        this.defaultCheckedKeys = this.checked_list.concat( this.special_checked_list );
        this.defaultExpandedKeys = this.expanded_list;
    },
    props:{
        tree_data:{//树节点加载数据
            type: Array,
            default: []
        },
        no_data_notice:{//空数据提示
            type: String,
            default: "暂无数据"
        },
        checked_list:{//默认已选key id，一般初始化和expanded变量值一致
            type: Array,
            default: []
        },
        expanded_list:{//默认展开key id,一般初始化和checked变量值一致
            type: Array,
            default: []
        },
        disabled_list:{//默认禁用的key id,
            type: Array,
            default: []
        },
        //已选特殊id 列表(禁用状态，勾选状态)
        special_checked_list:{
            type: Array,
            default: []
        },
    },
    mounted() {
        this.resetTreeNodeStyle();
    },
    methods:{
        //选中节点
        nodeClickEvent(data, node){
           
            this.resetTreeNodeStyle();
            if(data.disabled){
                //父节点禁用情况，子节点无法展开
                if(data.subs && data.subs.length) node.expanded = false;
                return false;
            } 

            this.currNode = data;
            this.$emit('node_click', [data, node] );
        },    
        nodeCollapse(data, node){
            this.resetTreeNodeStyle();
        },
        nodeExpand(data, node){
           
            this.resetTreeNodeStyle();
            if(data.disabled){
                node.expanded = false;
                return false;
            }
            
        },
        checkChange(data, node){
            this.resetTreeNodeStyle();
        },       
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            this.currNode = null;
        
        },
        //随机生成id
        getIdByRandom(){
            if(!this.treeTodoFn) return;
            let list1 = this.treeTodoFn.treeToList(this.treeData);
            let existingIdList = [];
            list1.forEach((item)=>{
            existingIdList.push(item.id);
            });
            let maxNum = this.max(existingIdList);
            return (maxNum+1);
        },       
        //添加组织架构节点数据到树节点中
        createTreeNodeForORG(newChild,node){
            //pid为0则表明添加的节点是根节点
            newChild.pid === 0 ? this.$refs.authTreeData.insertAfter(newChild,node) : this.$refs.authTreeData.append(newChild,node);           
        },
        //获取当前选中的节点
        getCurrentNodeFn(){
            console.log('读取当前树节点')
            return this.$refs.authTreeData.getCurrentNode()
        },
        /**
         * 获取数组元素最大值
         * @param {Array} arr 一维数组(里面皆是数字)
         * @return {Number}
         * */
        max: function(arr) {
            Array.prototype.max = function() {
                var max = this[0];
                var len = this.length;
                for (var i = 1; i < len; i++) {
                    if (this[i] > max) {
                        max = this[i];
                    }
                }
                return max;
            }
            return arr.max();
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
        //过滤节点函数
        filterNode(value, data) {
            if (!value) return true;
            return data.authName.indexOf(value) !== -1;
        },
        //执行树节点过滤方法
        filterTree(val){
            this.$refs.authTreeData.filter(val);
           
        },
        //(key) 待被选节点的 key，若为 null 则取消当前高亮的节点
        setCurrentKey(key){
            this.$refs.authTreeData.setCurrentKey(key);
        },
        //点击空白清除树节点选中状态
        clickPage(){
            console.log('点击白板');
            this.setCurrentKey(null);
            this.currNode = null;
        },
        //针对没有子节点的节点进行设置特殊类名，并返回
        getLowLevelClass(node,data){
            //所有带有特殊权限special=true的节点 添加特殊类
            let specialClass = data.special ? 'xhb-special-lowest ' : ' ';
            if((data.subs && data.subs.length === 0) || !data.subs){
                return specialClass + "auth-tree-lowest"
            }
            else{
                return specialClass; 
            }
        },
        //重新设置树节点样式
        resetTreeNodeStyle(){
            this.$nextTick(()=>{
                $(function(){
                    $('.auth-tree-lowest').each(function(){
                        let b = $(this).hasClass('xhb-special-lowest');
                        let class1 = b ? 'xhb-special-lowest-box' : '';
                        class1 = class1 + ' auth-tree-lowest-box';

                        let class2 = b ? 'xhb-special-lowest-box-group' : '';
                        class2 = class2 + ' auth-tree-lowest-box-group';
                        $(this).parent().parent().addClass(class1).parent().addClass(class2);
                    });
                });
            });
            
        },
       //读取已选节点数据;返回目前被选中的节点的 key 所组成的数组
        getCheckedKeys(leafOnly=false){
            return this.$refs.authTreeData.getCheckedKeys(leafOnly);
        },
        //初始化treeData
        initTreeData(){
            if(!this.treeTodoFn){
                return this.initTreeData();
            }else{
                let list = JSON.parse(JSON.stringify(this.tree_data));
                if(this.disabled_list.length){
                    let arr = this.treeTodoFn.treeToList(list);
                    arr.forEach((item,index)=>{
                        this.disabled_list.forEach((v,i)=>{
                            if(v*1 === item.id*1){
                                item.disabled = true;
                            }
                        });

                        this.special_checked_list.forEach((v,i)=>{
                            if(v*1 === item.id*1){
                                item.special = true;
                            }
                        });
                    });
                    list = this.treeTodoFn.listToTree(arr);
                }
                
                return list;
            }
           
        },
    }

};
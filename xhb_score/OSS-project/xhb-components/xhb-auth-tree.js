/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 功能权限树状组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbAuthTree = {
    name:"xhbAuthTree",
    template:`<div class="el-tree-box-div2" >
                <el-input
                    placeholder="输入关键字进行过滤"
                    size="small" 
                    prefix-icon="el-icon-search"
                    v-model="filterText">
                </el-input>
                <div @click.stop="clickPage" class="el-tree-box-div2-content">
                    <el-tree
                        ref="authTreeData"
                        :data="treeData"     
                        show-checkbox   
                        node-key="id"                        
                        :empty-text=" nodatanotice "
                        @node-click="nodeClickEvent"
                        :props="defaultProps"
                        :filter-node-method="filterNode"
                        :highlight-current="false"
                        :check-on-click-node="true"
                        @node-expand="nodeExpand"
                        @check-change="checkChange"
                        :expand-on-click-node="false">

                        <span class="custom-tree-node" slot-scope="{ node, data }" :class="getLowLevelClass(node, data)">
                            {{ data.authName }}   
                        </span>
                    </el-tree>
                </div>
           
            </div>`,
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
        }
    },
    watch:{					
        currNode(n,o){
            this.$nextTick(()=>{          
                if(this.currNode){
                    //根据所选节点数据获取树节点对象
                    this.currNodeObj = this.$refs.authTreeData.getNode(this.currNode);
                }
                else{
                    this.currNodeObj = null;
                }
                
                this.$emit('currnodechange', [this.currNode,this.currNodeObj] );
            });
        },
        async filterText(n,o){
            this.filterTree(n);
             //重新设置树节点样式
            await this.resetTreeNodeStyle();
        },
      
    },
    created() {
        //复制子组件数据
        this.treeData = JSON.parse(JSON.stringify(this.treedata));
        //定义树状处理器函数
        if(typeof Tree == "function"){
            this.treeTodoFn = new Tree({id: "id", pId: "parentId", children: "authName"});
        }
        else{
            this._loadJs('../../js/treeDataTodo2',()=>{
                this.treeTodoFn = new Tree({id: "id", pId: "parentId", children: "authName"});
            })
        }
        
    },
    props:{
        treedata:{//树节点加载数据
            type: Array,
            default: []
        },
        nodatanotice:{//空数据提示
            type: String,
            default: "暂无数据"
        }
    },
    mounted() {
        this.resetTreeNodeStyle();
    },
    methods:{
        //选中节点
        nodeClickEvent(data, node){
            node.expanded = !node.expanded;//当前节点折叠或者展开

            this.currNode = data;
            this.$emit('nodeclick', [data, node] );
            this.resetTreeNodeStyle();
        },    
       
        nodeExpand(data, node){
            this.resetTreeNodeStyle();
        },
        checkChange(data, node){
            this.resetTreeNodeStyle();
        },
        //选中节点
        chooseNode(data) {
            // console.log(data,'data')
            this.addDialog = true;
            this.currNode = data;
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
        //根据节点的level==3,设置class
        getLowLevelClass(node,data){
            if((data.subs && data.subs.length === 0) || !data.subs){
                return "auth-tree-lowest"
            }
            else{
                return ''
            }
        },
        //重新设置树节点样式
        resetTreeNodeStyle(){
            this.$nextTick(()=>{
                $(function(){
                    $('.auth-tree-lowest').each(function(){
                        //el-tree-node
                        // $(this).parent().parent().addClass('auth-tree-lowest-box');
                        $(this).parent().parent().addClass('auth-tree-lowest-box').parent().addClass('auth-tree-lowest-box-group');
                    });
                });
            });
            
        },
        
    }

};
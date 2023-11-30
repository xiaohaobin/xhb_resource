/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 组织架构树状组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbOrgTree = {
    name:"xhbOrgTree",
    template:`<div class="xhb-org-tree"><div class="el-tree-box-div" @click.stop="clickPage"><el-tree
                ref="treeData"
                :data="treeData"        
                node-key="id"
                default-expand-all
                :empty-text=" no_data_notice "
                @node-click="nodeClickEvent"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :highlight-current="true"
                :expand-on-click-node="false">

                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                        <i :class="getClassByNodeType(data)" class="mr-5"></i>{{ data.label }}
                        <el-tag size="small" type="primary" v-if="data.permissionsType == 2 && data.nodeType == 3" >基础权限</el-tag>
                        <el-tag size="small" v-if="data.isPrincipal == 1 && data.nodeType == 3" >负责人</el-tag>
                    </span>       
                </span>
            </el-tree></div></div>`,
    data() {
        return {
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'label',
                nodeType:'nodeType'
            },
            currNode:null,//当前操作节点数据
            currNodeObj:null,//当前操作节点
            isAddRootNode:false,//是否添加根节点
            treeTodoFn:null,//树状数据处理器
        }
    },
    watch:{					
        currNode(n,o){
            this.$nextTick(()=>{          
                if(this.currNode){
                    //根据所选节点数据获取树节点对象
                    this.currNodeObj = this.$refs.treeData.getNode(this.currNode);
                }
                else{
                    this.currNodeObj = null;
                }
                
                this.$emit('curr_node_change', [this.currNode,this.currNodeObj] );
            });
        },
        
    },
    created() {
        //复制子组件数据
        this.treeData = JSON.parse(JSON.stringify(this.tree_data));
        //定义树状处理器函数
        if(typeof Tree == "function"){
            this.treeTodoFn = new Tree({id: "id", pId: "pid", children: "children"});
        }
        else{
            this._loadJs('../../js/treeDataTodo2',()=>{
                this.treeTodoFn = new Tree({id: "id", pId: "pid", children: "children"});
            })
        }
        
    },
    props:{
        tree_data:{//树节点加载数据
            type: Array,
            default: []
        },
        no_data_notice:{//空数据提示
            type: String,
            default: "暂无数据"
        }
    },
    mounted() {

    },
    methods:{
        //选中节点
        nodeClickEvent(data, node){
            console.log(data,node,"data,node")
            this.currNode = data;
            this.$emit('node_click', [data, node] );
        },
       //定义各种类型图表
        getClassByNodeType(node){
            // console.log(node,data,11111111111111111)
            if(node.nodeType == 1){//公司
            // return 'el-icon-odometer';
                return 'iconfont icon-hebingxingzhuang';//该icon来源于自定义icon
            }
            else if(node.nodeType == 2){//部门
            return 'iconfont icon-zuzhi4';
            }
            else if(node.nodeType == 3){//人员
            return '';
            }
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
            newChild.pid === 0 ? this.$refs.treeData.insertAfter(newChild,node) : this.$refs.treeData.append(newChild,node);           
        },
        //获取当前选中的节点
        getCurrentNodeFn(){
            console.log('读取当前树节点')
            return this.$refs.treeData.getCurrentNode()
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
            return data.label.indexOf(value) !== -1;
        },
        //执行树节点过滤方法
        filterTree(val){
            this.$refs.treeData.filter(val);
        },
        //(key) 待被选节点的 key，若为 null 则取消当前高亮的节点
        setCurrentKey(key){
            this.$refs.treeData.setCurrentKey(key);
        },
        //点击空白清除树节点选中状态
        clickPage(){
            console.log('点击白板');
            this.setCurrentKey(null);
            this.currNode = null;
        },
    }

};
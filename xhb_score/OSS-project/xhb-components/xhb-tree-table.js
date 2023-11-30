/**
 * @author 肖浩彬
 * @date 2023-10-27
 * @description 权限树状表格组件，适应oss系统;依赖框架vue element-ui; components/css/index.css
 * */

var xhbTreeTable = {
    name:"xhbTreeTable",
    template:`<div class="xhb-tree-table"><el-table  :key="itemKey"   class="mt-10" 
            ref="table" :span-method="tableSpanMethod" :data="tableData" border stripe align="center" size="mini" :show-header="false">
                <el-table-column align="center" prop="index1" label="" width="150px">
                    <template slot-scope="scope">								
                        {{ scope.row.index1.authName  }}
                    </template>
                </el-table-column>

                <el-table-column align="center" prop="index2" label="" width="150px">
                    <template slot-scope="scope">
                        {{ scope.row.index2.authName  }}
                    </template>
                </el-table-column>
                <el-table-column  prop="index3" label="" >
                    <template slot-scope="scope">
                        {{ (scope.row.index3.authName ? scope.row.index3.authName + ' ; ' : '')  +  getAllChildrenTxt(scope.row.index3).join(' ; ') }}
                    </template>
                </el-table-column>

            </el-table></div>`,
    data() {
        return {
            tableData:[],
            itemKey:Math.random(),
            authTreeTodoFn:null,
            // idList:[2,200,20000,4,401,40100,40101,402,40200,18,1800,412, 41201,4120100,41203,4120300,412030000],
			permissionsList:[],
        }
    },
    watch:{					
       
        
    },
    async created() {
      
        //定义树状处理器函数
        if(typeof Tree == "function"){
           
            //功能权限树状处理器
			this.authTreeTodoFn = new Tree({id: "id", pId: "parentId", children: "subs"});
        }
        else{
            this._loadJs('../../js/treeDataTodo2',()=>{
                 //功能权限树状处理器
			    this.authTreeTodoFn = new Tree({id: "id", pId: "parentId", children: "subs"});
            });
        }
        
        await this.initData();
       
    },
    props:{
        id_list:{//功能权限已选id
            type: Array,
            default: []
        },
        no_data_notice:{//空数据提示
            type: String,
            default: "暂无数据"
        },
        oss_auth_list:{//功能权限所有列表
            type: Array,
            default: []
        }
    },
    mounted() {

    },
    methods:{
        async initData(){
             //id列表转化成树状列表数据
            this.permissionsList = await this.getCheckedAuthTreeDataByIdList(this.id_list);
            this.treeToTableData( this.permissionsList );
        },
       /**
         * 根据功能权限列表和已选id，获取对应树状数据
         * @param {Array} idList [1,100...]
         * 
        */
        getCheckedAuthTreeDataByIdList(idList){
            let list = this.authTreeTodoFn.treeToList(this.oss_auth_list);
            let checkedList = [];
            list.forEach((item,index)=>{
                if(idList.includes( item.id*1 )){
                    checkedList.push(item);
                }
            });
            // console.log(checkedList,"checkedList")
            return this.authTreeTodoFn.listToTree(checkedList);
        },
        
        //处理树状数据===》表格数据集
        /**
         * tree数据处理,将树状数据转表格数据
         * 
        */
        treeToTableData(_treeData) {
            //将树状结构格式转换成二维数组表格形式
            let ewArr = this.parseTreeToRow( _treeData );
            let tableData = [];
            ewArr.map((item,index) => {
                if(item.length===2){
                    item.push({
                        label:item[1].label+item.length,
                        isChecked:false,
                    })
                }else if(item.length===1){
                    item.push({label:item[0].label+"1",isChecked:false,})
                    item.push({label:item[0].label+"2",isChecked:false,})
                }
                let obj = {};
                item.map((itemc, indexb) => {
                    obj["index" + (indexb + 1)] = {
                        subs:itemc.subs,
                        parentId:itemc.parentId,
                        authName:itemc.authName,
                        id: itemc.id,
                        label: itemc.authName,
                        children:(itemc.children !== null) ? itemc.children : [],
                    };
                    if (typeof itemc.children !== "undefined") {
                        obj.children = { data: itemc.children };
                    }
                });
                tableData.push(obj);
            });
            this.tableData = tableData;

            return tableData;
        },
        /**
         * 递归-----将树结构数据格式，转化为，二维数组 表格形式
         * @param node 树的源数据
         * @param data 树转化为二维数组的数据
         * @param row 临时存储数据
         * @returns {*[]}
         */
        parseTreeToRow(node, data = [], row = []) {            
            node.map((item) => {
                let obj = {
                    id: item.id,
                    label:item.authName,
                    authName:item.authName,
                    subs:item.subs,
                    parentId:item.parentId,
                    children: (item.children !== null) ? item.children : null,
                };
                if (typeof item.children !== "undefined") {
                    obj.children = item.children.length > 0 ? item.children : [];
                }
                if (item.children && item.children.length != 0) {
                    this.parseTreeToRow(item.children, data, [...row, obj]);
                } else {
                    data.push([...row, obj]);
                }
            });
            return data;
        },
        /**
         * 合并行或列的计算方法
         */
        tableSpanMethod({ row, column, rowIndex, columnIndex }) {
            return {
                rowspan:
                columnIndex < 3
                    ? this.mergeRows(
                        row[column.property],
                        this.tableData,
                        rowIndex,
                        column.property
                    )
                    : 1,
                colspan: 1,
            };
        },
        /**
         * 表格单元格合并-----行
         * @param {Object} value      当前单元格的值
         * @param {Object} data       当前表格所有数据
         * @param {Object} index      当前单元格的值所在 行 索引
         * @param {Object} property   当前列的property
         * @returns {number}          待合并单元格数量
         */
        mergeRows(value, data, index, property) {
            // 判断 当前行的该列数据 与 上一行的该列数据 是否相等
            if (index !== 0 && value.label === data[index - 1][property].label) {
                // 返回 0 使表格被跨 行 的那个单元格不会渲染
                return 0;
            }
            // 判断 当前行的该列数据 与 下一行的该列数据 是否相等  
            let rowSpan = 1;
            for (let i = index + 1; i < data.length; i++) {  
                if (value.label !== data[i][property].label) {
                    break;
                }
                rowSpan++;
            }
            return rowSpan;
        },
        //根据item的children数据，获取子数据txt
        getAllChildrenTxt(item){
            let list = [];
            list = list.concat( getTxt(item) );
            return list;
            function getTxt(item){
                let _list = [];
                if(item.children && item.children.length){
                    item.children.forEach((v)=>{
                        _list.push(v.authName);
                        if(v.children && v.children.length){
                            _list = _list.concat( getTxt(v) );
                        }
                    });
                }
                return _list;
            }
            
        },
    }

};
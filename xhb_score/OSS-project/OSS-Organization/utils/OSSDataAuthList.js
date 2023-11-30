//数据权限list
var OSSDataAuthList = [
    {name:"data_question", txt:"问题大厅", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_workOrder", txt:"工单列表", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_repDeviceApply", txt:"换机申请", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_plyWarranty", txt:"付费延保", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },

    {name:"data_warranty", txt:"质保查询", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_supplyRecord", txt:"供货记录", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_disManage", txt:"分销商管理", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_insManage", txt:"安装商管理", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },

    {name:"data_customerManage", txt:"客户管理", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_asManage", txt:"售后运维", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_apiToken", txt:"API管理", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
    {name:"data_operator", txt:"运营商管理", checked:undefined, checkboxList:{"0":"查看本人的数据", "1":"查看负责区域所有的数据", "2":"查看所有的数据"} },
];

//设置数据权限--数据模型
var setDataAuth = {
    data_question: 2,
    data_workOrder: 0,
    data_repDeviceApply: 1,
    data_plyWarranty: 1,
    data_warranty: 1,
    data_supplyRecord: 1,
    data_disManage: 1,
    data_insManage: 1,
    data_customerManage: 1,
    data_asManage: 0,
    data_apiToken: 1,
    data_operator: 0,
};

function OSSDataAuthListToDo(_OSSDataAuthList){
    this.OSSDataAuthList = _OSSDataAuthList || OSSDataAuthList;
}

//根据数据权限对应name 字符串，获取对应txt文案
OSSDataAuthListToDo.prototype.getTxtByName = function(name){
    let txt = '';
    this.OSSDataAuthList.forEach((item,index)=>{
        if(name == item.name) txt = item.txt;
    });
    return txt;
}

//根据数据权限对应类型值，获取对应类型的txt 字符串，获取对应txt文案
OSSDataAuthListToDo.prototype.getTxtByValue = function(value){
    let txt = '';
    for(let key in this.OSSDataAuthList[0]['checkboxList']){
        if(value*1 === key*1) txt = this.OSSDataAuthList[0]['checkboxList'][key];
    }
    return txt;
}
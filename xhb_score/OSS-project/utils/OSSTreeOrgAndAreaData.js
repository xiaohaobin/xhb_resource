var OSSTreeOrgAndAreaData = [
    {
    pid:0,
    id: 1,
    value:1,
    label: '深圳博浩远科技有限公司',//显示名称（可自定义） 
    OrganizationName:'深圳博浩远科技有限公司',        
    nodeType:1,//节点类别（1，公司；2，部门；3，员工）
    OrganizationType:1,
    parentOrganization:[],
    principal:'邓蜀云',
    area:['1', '2'],
    country:{
        '1':['1', '7','52','54'],
        '2':['144', '146'],
    },
    children: [
        {
            pid:1,
            id: 4,
            value: 4,
            label: '智能控制事业部',
            OrganizationName: '智能控制事业部',
            nodeType:2,//
            OrganizationType:2,    
            parentOrganization:[1],  
            OrganizationLevel:1,//部门级别（1标识一级部门，以此类崔，读取后台数据）
            principal:'邓蜀云2', 
            area:['1'],
            country:{
                '1':['1', '7','52','54'],
            },       
            children: [
                    // {
                    //     pid:4,
                    //     id: 'area_1',
                    //     value: 'area_1',
                    //     label: '亚洲区',
                    //     nodeType:-1, 
                    //     country:{
                    //         '1':['1','52','54'],
                    //     },                     
                    // }, 
                
            ]
        },
        {
            pid:1,
            id: 5,
            value: 5,
            label: '智能控制事业部2',
            OrganizationName: '智能控制事业部2',
            nodeType:2,//
            OrganizationType:2,    
            parentOrganization:[1],  
            OrganizationLevel:1,//部门级别（1标识一级部门，以此类崔，读取后台数据）
            principal:'邓蜀云2', 
            area:['2'],
            country:{
                '2':['2', '143'],
            },       
            children: [
                   
            ]
        },
    ]
    }, 
];


 


var OSSTreeData = [
    {
    pid:0,
    id: 1,
    value:1,
    label: '深圳博浩远科技有限公司',//显示名称（可自定义） 
    OrganizationName:'深圳博浩远科技有限公司',        
    nodeType:1,//节点类别（1，公司；2，部门；3，员工）
    OrganizationType:1,
    parentOrganization:[],
    principal:[1], 
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
        principal:[1], 
        area:['1'],
        country:{
            '1':['1', '7','52','54'],
        },       
        children: [
            {
                pid:4,
                id: 19,
                value: 19,
                label: 'Grt88888(邓蜀云)',
                nodeType:3, 
                parentOrganization:[1,4], 
                workerNum:'Grt88888',
                name:'邓蜀云',
                isPrincipal:1,//是否负责人，1是0否
                permissionsType:1,//1部门（功能）权限；2，基础权限
                area:['1'],
                country:{
                    '1':['1','52','54'],
                },                     
            }, 
            {
                pid:4,
                id: 9,
                value: 9,
                label: 'Grt27500(肖浩彬)',
                nodeType:3, 
                parentOrganization:[1,4], 
                workerNum:'Grt27500',
                name:'肖浩彬',
                isPrincipal:0,//是否负责人，1是0否
                permissionsType:2,//1部门（功能）权限；2，基础权限
                area:['1'],
                country:{
                    '1':['1','52'],
                },                     
            }, 
        
        ]
        }
    ]
    }, 
];




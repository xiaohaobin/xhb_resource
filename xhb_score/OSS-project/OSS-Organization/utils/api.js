//已存在API
const commonAPI = [
    //区域国家数据API
    // 所有功能权限列表API
    // 所有数据权限列表API
];


const orgModuleAPI = [
    /*组织架构》组织/员工管理*/
    [
         //查询组织架构主列表（员工要包含是否有基础权限标识） API
        //查询组织列表（不包含员工） API
        //根据节点id查询对应 组织节点详情数据（包括：组织等级，添加时间，更新时间，操作人等等）API

        //添加组织结构--组织（公司，部门）节点API
        //编辑组织结构--组织（公司，部门）节点API
        //删除组织结构--组织（公司，部门）节点API

        //添加组织结构--员工节点API
    ],

    /*组织架构》组织/员工管理》组织/员工列表页面*/
   [
        // 根据员工节点id，查询该员工详情数据（包含功能权限、数据权限，员工详情数据等等）API
        // 编辑员工详情数据API
        // 设置员工功能权限数据API
        // 设置员工所负责国家的对应数据权限 和 所负责的区域国家 API
   ],

    /*组织架构》组织/员工管理》员工权限列表*/    
    [
        // 部门&区域列表API
        //根据部门&区域，以及不同模块类型，查询值守员工列表API
        //根据关键字模糊搜索员工列表API
        //新增值守人员API
        //编辑值守人员API
        //删除值守人员API
        //查询国家list API
    ],

    /*组织架构》权限管理*/
    [
        // 根据部门&区域设置功能权限API
        // 根据部门&区域设置默认（基础）权限API
    ]

];
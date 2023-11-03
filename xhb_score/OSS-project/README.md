该模块为OSS--子集项目模块集合

该项目css依赖：
1、OSS项目下xhb_spring.jsp引入的三大基础样式：
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/xhb/css/reset.css?${odm_urv}">		
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/xhb/css/grt_system.css?${odm_urv}"/>			
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/xhb/css/common.css?${odm_urv}"/>
<link rel="stylesheet" href="../../growatt-font/iconfont.css">  对应： <script src="<%=request.getContextPath()%>/resources/font/font_2875270_cek1wpdk9ye/iconfont.js?${odm_urv}" type="text/javascript" charset="utf-8"></script>

2、element ui 主题样式
    <link rel="stylesheet" href="../../element_ui/themes/index.css">

3、基于element ui自主封装的，适应于OSS系统组件【xhb-components】下的样式

4、自定义icon图标(growatt-font),该图标库在OSS系统和server系统已存在，此处需将代码合并值OSS和server系统的图标库



该项目js依赖：
1、vue,element ui
    vue.js ,element.js

2、封装的xhb公共插件
    xhb.commonPlugin.js   

font\growatt\font_3910349_2ewv7tx05ju

公共组件：[注意：父子组件通过props和$emit定义的属性和方法，不能用驼峰，html对大小写敏感，只认小写]
    xhb-org-tree  组织架构组件，依赖【vue，element ui】
        父组件输入 props：
            树状数据 treedata  空数据提示 nodatanotice
        子输出 $emit：  
            当前节点数据变化事件 currnodechange   参数【data 当前节点数据,node 当前节点node对象】  
            选中节点事件 nodeclick   参数【data 当前节点数据,node 当前节点node对象】

    xhb-area-country-select   区域国家复选框组组件

    xhb-common-bread  面包屑导航组件

    xhb-common-tab  oss系统风格选项卡组件

//功能权限列表
var OSSAuthList = [
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "导出数据",
                        "id": 20000,
                        "parentId": 200
                    }
                ],
                "authName": "数据总览",
                "id": 200,
                "parentId": 2
            },
            {
                "subs": [
                    {
                        "authName": "用户分析",
                        "id": 20100,
                        "parentId": 201
                    },
                    {
                        "authName": "实时访客",
                        "id": 20101,
                        "parentId": 201
                    },
                    {
                        "authName": "页面分析",
                        "id": 20102,
                        "parentId": 201
                    },
                    {
                        "authName": "终端分析",
                        "id": 20103,
                        "parentId": 201
                    },
                    {
                        "authName": "导出数据",
                        "id": 20104,
                        "parentId": 201
                    }
                ],
                "authName": "用户数据",
                "id": 201,
                "parentId": 2
            },
            {
                "subs": [
                    {
                        "authName": "地域分布",
                        "id": 20200,
                        "parentId": 202
                    },
                    {
                        "authName": "数据统计",
                        "id": 20201,
                        "parentId": 202
                    },
                    {
                        "authName": "导出数据",
                        "id": 20202,
                        "parentId": 202
                    },
                    {
                        "authName": "Grohome数据统计",
                        "id": 20203,
                        "parentId": 202
                    }
                ],
                "authName": "监控数据",
                "id": 202,
                "parentId": 2
            }
        ],
        "authName": "数据统计",
        "id": 2,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "添加",
                "id": 300,
                "parentId": 3
            },
            {
                "authName": "编辑",
                "id": 301,
                "parentId": 3
            },
            {
                "authName": "删除",
                "id": 302,
                "parentId": 3
            },
            {
                "authName": "导出数据",
                "id": 303,
                "parentId": 3
            },
            {
                "authName": "查看全部信息",
                "id": 304,
                "parentId": 3
            }
        ],
        "authName": "客户信息管理",
        "id": 3,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "添加电站",
                        "id": 10000,
                        "parentId": 100
                    },
                    {
                        "authName": "编辑电站",
                        "id": 10001,
                        "parentId": 100
                    },
                    {
                        "authName": "添加采集器",
                        "id": 10002,
                        "parentId": 100
                    },
                    {
                        "authName": "设置时区",
                        "id": 10003,
                        "parentId": 100
                    },
                    {
                        "authName": "设置发电量下限",
                        "id": 10004,
                        "parentId": 100
                    },
                    {
                        "authName": "进入ShineServer",
                        "id": 10005,
                        "parentId": 100
                    },
                    {
                        "authName": "电站分组管理",
                        "id": 10006,
                        "parentId": 100
                    },
                    {
                        "authName": "指定电站分组",
                        "id": 10007,
                        "parentId": 100
                    },
                    {
                        "authName": "导出数据",
                        "id": 10008,
                        "parentId": 100
                    },
                    {
                        "authName": "生成展示页",
                        "id": 10009,
                        "parentId": 100
                    },
                    {
                        "authName": "导入给分销商/安装商",
                        "id": 10010,
                        "parentId": 100
                    },
                    {
                        "authName": "智能分配功率",
                        "id": 10011,
                        "parentId": 100
                    }
                ],
                "authName": "电站管理",
                "id": 100,
                "parentId": 1
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "添加设备",
                                "id": 1010000,
                                "parentId": 10100
                            },
                            {
                                "authName": "编辑逆变器",
                                "id": 1010001,
                                "parentId": 10100
                            },
                            {
                                "authName": "设置逆变器",
                                "id": 1010002,
                                "parentId": 10100
                            },
                            {
                                "authName": "删除逆变器（关系）",
                                "id": 1010003,
                                "parentId": 10100
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010004,
                                "parentId": 10100
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010005,
                                "parentId": 10100
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010006,
                                "parentId": 10100
                            },
                            {
                                "authName": "zfdyh_History_of_failure",
                                "id": 1010007,
                                "parentId": 10100
                            },
                            {
                                "authName": "预测发电量",
                                "id": 1010008,
                                "parentId": 10100
                            }
                        ],
                        "authName": "逆变器管理",
                        "id": 10100,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "添加设备",
                                "id": 1010100,
                                "parentId": 10101
                            },
                            {
                                "authName": "编辑储能机",
                                "id": 1010101,
                                "parentId": 10101
                            },
                            {
                                "authName": "设置储能机",
                                "id": 1010102,
                                "parentId": 10101
                            },
                            {
                                "authName": "删除储能机（关系）",
                                "id": 1010103,
                                "parentId": 10101
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010104,
                                "parentId": 10101
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010105,
                                "parentId": 10101
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010106,
                                "parentId": 10101
                            }
                        ],
                        "authName": "离网储能",
                        "id": 10101,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "添加设备",
                                "id": 1010200,
                                "parentId": 10102
                            },
                            {
                                "authName": "编辑储能机",
                                "id": 1010201,
                                "parentId": 10102
                            },
                            {
                                "authName": "设置储能机",
                                "id": 1010202,
                                "parentId": 10102
                            },
                            {
                                "authName": "删除储能机（关系）",
                                "id": 1010203,
                                "parentId": 10102
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010204,
                                "parentId": 10102
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010205,
                                "parentId": 10102
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010206,
                                "parentId": 10102
                            },
                            {
                                "authName": "预测用电量",
                                "id": 1010207,
                                "parentId": 10102
                            }
                        ],
                        "authName": "并网储能",
                        "id": 10102,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "添加设备",
                                "id": 1010300,
                                "parentId": 10103
                            },
                            {
                                "authName": "编辑充电桩",
                                "id": 1010301,
                                "parentId": 10103
                            },
                            {
                                "authName": "设置充电桩",
                                "id": 1010302,
                                "parentId": 10103
                            },
                            {
                                "authName": "删除充电桩(关系)",
                                "id": 1010303,
                                "parentId": 10103
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010304,
                                "parentId": 10103
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010305,
                                "parentId": 10103
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010306,
                                "parentId": 10103
                            },
                            {
                                "authName": "开关电子锁",
                                "id": 1010307,
                                "parentId": 10103
                            },
                            {
                                "authName": "RFID管理",
                                "id": 1010308,
                                "parentId": 10103
                            },
                            {
                                "authName": "解绑",
                                "id": 1010309,
                                "parentId": 10103
                            },
                            {
                                "authName": "升级",
                                "id": 1010310,
                                "parentId": 10103
                            }
                        ],
                        "authName": "充电桩",
                        "id": 10103,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑采集器",
                                "id": 1010401,
                                "parentId": 10104
                            },
                            {
                                "authName": "设置采集器",
                                "id": 1010402,
                                "parentId": 10104
                            },
                            {
                                "authName": "删除采集器",
                                "id": 1010403,
                                "parentId": 10104
                            }
                        ],
                        "authName": "采集器管理",
                        "id": 10104,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑",
                                "id": 1010501,
                                "parentId": 10105
                            },
                            {
                                "authName": "设置",
                                "id": 1010502,
                                "parentId": 10105
                            },
                            {
                                "authName": "删除智能电表",
                                "id": 1010503,
                                "parentId": 10105
                            }
                        ],
                        "authName": "智能电表",
                        "id": 10105,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑混储一体机",
                                "id": 1010601,
                                "parentId": 10106
                            },
                            {
                                "authName": "设置混储一体机",
                                "id": 1010602,
                                "parentId": 10106
                            },
                            {
                                "authName": "删除混储一体机",
                                "id": 1010603,
                                "parentId": 10106
                            }
                        ],
                        "authName": "混储一体机管理",
                        "id": 10106,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "修改外置PID箱",
                                "id": 1010701,
                                "parentId": 10107
                            },
                            {
                                "authName": "设置外置PID箱",
                                "id": 1010702,
                                "parentId": 10107
                            },
                            {
                                "authName": "删除外置PID箱",
                                "id": 1010703,
                                "parentId": 10107
                            }
                        ],
                        "authName": "auth_pid_manage",
                        "id": 10107,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑商业储能机",
                                "id": 1010801,
                                "parentId": 10108
                            },
                            {
                                "authName": "设置商业储能机",
                                "id": 1010802,
                                "parentId": 10108
                            },
                            {
                                "authName": "删除商业储能机",
                                "id": 1010803,
                                "parentId": 10108
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010804,
                                "parentId": 10108
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010805,
                                "parentId": 10108
                            },
                            {
                                "authName": "添加设备",
                                "id": 1010806,
                                "parentId": 10108
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010807,
                                "parentId": 10108
                            }
                        ],
                        "authName": "商业储能机管理",
                        "id": 10108,
                        "parentId": 101
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑SPH",
                                "id": 1010901,
                                "parentId": 10109
                            },
                            {
                                "authName": "设置SPH",
                                "id": 1010902,
                                "parentId": 10109
                            },
                            {
                                "authName": "删除SPH",
                                "id": 1010903,
                                "parentId": 10109
                            },
                            {
                                "authName": "导出数据",
                                "id": 1010904,
                                "parentId": 10109
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 1010905,
                                "parentId": 10109
                            },
                            {
                                "authName": "添加设备",
                                "id": 1010906,
                                "parentId": 10109
                            },
                            {
                                "authName": "导入给分销商/安装商",
                                "id": 1010907,
                                "parentId": 10109
                            }
                        ],
                        "authName": "微网户用储能管理",
                        "id": 10109,
                        "parentId": 101
                    }
                ],
                "authName": "设备管理",
                "id": 101,
                "parentId": 1
            },
            {
                "subs": [
                    {
                        "authName": "添加用户",
                        "id": 10200,
                        "parentId": 102
                    },
                    {
                        "authName": "编辑用户",
                        "id": 10201,
                        "parentId": 102
                    },
                    {
                        "authName": "重置用户密码",
                        "id": 10202,
                        "parentId": 102
                    },
                    {
                        "authName": "指定安装商",
                        "id": 10203,
                        "parentId": 102
                    },
                    {
                        "authName": "指定用户Token",
                        "id": 10204,
                        "parentId": 102
                    },
                    {
                        "authName": "脱离用户",
                        "id": 10205,
                        "parentId": 102
                    },
                    {
                        "authName": "添加电站",
                        "id": 10206,
                        "parentId": 102
                    },
                    {
                        "authName": "进入ShineServer",
                        "id": 10207,
                        "parentId": 102
                    },
                    {
                        "authName": "导出数据",
                        "id": 10208,
                        "parentId": 102
                    },
                    {
                        "authName": "编辑电站",
                        "id": 10209,
                        "parentId": 102
                    }
                ],
                "authName": "终端用户",
                "id": 102,
                "parentId": 1
            },
            {
                "authName": "大屏展示",
                "id": 103,
                "parentId": 1
            },
            {
                "authName": "充电桩升级",
                "id": 104,
                "parentId": 1
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_sss",
                                        "id": 105150000,
                                        "parentId": 1051500
                                    },
                                    {
                                        "authName": "auth_firmware_threeCaI",
                                        "id": 105150001,
                                        "parentId": 1051500
                                    },
                                    {
                                        "authName": "auth_firmware_singleCaI",
                                        "id": 105150002,
                                        "parentId": 1051500
                                    },
                                    {
                                        "authName": "auth_firmware_syn",
                                        "id": 105150003,
                                        "parentId": 1051500
                                    }
                                ],
                                "authName": "auth_firmware_inv",
                                "id": 1051500,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_lowBat",
                                        "id": 105150100,
                                        "parentId": 1051501
                                    },
                                    {
                                        "authName": "auth_firmware_highBat",
                                        "id": 105150101,
                                        "parentId": 1051501
                                    },
                                    {
                                        "authName": "auth_firmware_bdcBat",
                                        "id": 105150102,
                                        "parentId": 1051501
                                    },
                                    {
                                        "authName": "auth_firmware_purBat",
                                        "id": 105150103,
                                        "parentId": 1051501
                                    }
                                ],
                                "authName": "auth_firmware_battery",
                                "id": 1051501,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_selfMeter",
                                        "id": 105150200,
                                        "parentId": 1051502
                                    },
                                    {
                                        "authName": "auth_firmware_purMeter",
                                        "id": 105150201,
                                        "parentId": 1051502
                                    }
                                ],
                                "authName": "auth_firmware_meter",
                                "id": 1051502,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_threeCaS",
                                        "id": 105150300,
                                        "parentId": 1051503
                                    },
                                    {
                                        "authName": "auth_firmware_singleCaS",
                                        "id": 105150301,
                                        "parentId": 1051503
                                    },
                                    {
                                        "authName": "分相机",
                                        "id": 105150302,
                                        "parentId": 1051503
                                    }
                                ],
                                "authName": "auth_firmware_storage",
                                "id": 1051503,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_infinity",
                                        "id": 105150400,
                                        "parentId": 1051504
                                    }
                                ],
                                "authName": "auth_firmware_pps",
                                "id": 1051504,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "AC800V系统",
                                        "id": 105150500,
                                        "parentId": 1051505
                                    },
                                    {
                                        "authName": "Anti-PID Box",
                                        "id": 105150501,
                                        "parentId": 1051505
                                    }
                                ],
                                "authName": "auth_firmware_pid",
                                "id": 1051505,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "4G",
                                        "id": 105150600,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "GPRS",
                                        "id": 105150601,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "auth_firmware_Groboost",
                                        "id": 105150602,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "Lan",
                                        "id": 105150603,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "Raillog",
                                        "id": 105150604,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "WiFi",
                                        "id": 105150605,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "auth_firmware_business",
                                        "id": 105150606,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "auth_firmware_Household",
                                        "id": 105150607,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "WeLink",
                                        "id": 105150608,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "auth_firmware_WiFiLan",
                                        "id": 105150609,
                                        "parentId": 1051506
                                    },
                                    {
                                        "authName": "BT",
                                        "id": 105150610,
                                        "parentId": 1051506
                                    }
                                ],
                                "authName": "auth_firmware_datalog",
                                "id": 1051506,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_acThreePhase",
                                        "id": 105150700,
                                        "parentId": 1051507
                                    },
                                    {
                                        "authName": "auth_firmware_acSinglePhase",
                                        "id": 105150701,
                                        "parentId": 1051507
                                    },
                                    {
                                        "authName": "auth_firmware_purBatC",
                                        "id": 105150702,
                                        "parentId": 1051507
                                    },
                                    {
                                        "authName": "auth_firmware_dc",
                                        "id": 105150703,
                                        "parentId": 1051507
                                    }
                                ],
                                "authName": "auth_firmware_charPile",
                                "id": 1051507,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "尚科测试版本",
                                        "id": 105150800,
                                        "parentId": 1051508
                                    }
                                ],
                                "authName": "auth_firmware_sph",
                                "id": 1051508,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_threeCaW",
                                        "id": 105150900,
                                        "parentId": 1051509
                                    }
                                ],
                                "authName": "商用储能",
                                "id": 1051509,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "LG BDC电池",
                                        "id": 105151000,
                                        "parentId": 1051510
                                    }
                                ],
                                "authName": "auth_firmware_syn",
                                "id": 1051510,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "auth_firmware_threeCaSyn",
                                        "id": 105151100,
                                        "parentId": 1051511
                                    },
                                    {
                                        "authName": "auth_firmware_singleCaSyn",
                                        "id": 105151101,
                                        "parentId": 1051511
                                    }
                                ],
                                "authName": "auth_firmware_syn",
                                "id": 1051511,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "111",
                                        "id": 105151201,
                                        "parentId": 1051512
                                    }
                                ],
                                "authName": "WIT",
                                "id": 1051512,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "1",
                                        "id": 105151300,
                                        "parentId": 1051513
                                    }
                                ],
                                "authName": "WIT",
                                "id": 1051513,
                                "parentId": 10515
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "test-typeinfo",
                                        "id": 105151400,
                                        "parentId": 1051514
                                    },
                                    {
                                        "authName": "SBLX 01",
                                        "id": 105151401,
                                        "parentId": 1051514
                                    },
                                    {
                                        "authName": "SBLX 02",
                                        "id": 105151402,
                                        "parentId": 1051514
                                    },
                                    {
                                        "authName": "SBLX。3",
                                        "id": 105151403,
                                        "parentId": 1051514
                                    }
                                ],
                                "authName": "test-type",
                                "id": 1051514,
                                "parentId": 10515
                            }
                        ],
                        "authName": "产品类型管理",
                        "id": 10515,
                        "parentId": 105
                    },
                    {
                        "subs": [
                            {
                                "authName": "auth_auto_upload",
                                "id": 1051600,
                                "parentId": 10516
                            },
                            {
                                "authName": "auth_auto_audit",
                                "id": 1051601,
                                "parentId": 10516
                            },
                            {
                                "authName": "auth_auto_delete",
                                "id": 1051602,
                                "parentId": 10516
                            },
                            {
                                "authName": "auth_auto_details",
                                "id": 1051603,
                                "parentId": 10516
                            },
                            {
                                "authName": "手动上传",
                                "id": 1051604,
                                "parentId": 10516
                            },
                            {
                                "authName": "手动删除",
                                "id": 1051605,
                                "parentId": 10516
                            },
                            {
                                "authName": "手动查看详情",
                                "id": 1051606,
                                "parentId": 10516
                            },
                            {
                                "authName": "充电桩升级",
                                "id": 1051607,
                                "parentId": 10516
                            }
                        ],
                        "authName": "设备固件管理",
                        "id": 10516,
                        "parentId": 105
                    },
                    {
                        "subs": [
                            {
                                "authName": "自动上传",
                                "id": 1051700,
                                "parentId": 10517
                            },
                            {
                                "authName": "自动审核",
                                "id": 1051701,
                                "parentId": 10517
                            },
                            {
                                "authName": "自动删除",
                                "id": 1051702,
                                "parentId": 10517
                            },
                            {
                                "authName": "自动查看详情",
                                "id": 1051703,
                                "parentId": 10517
                            },
                            {
                                "authName": "手动上传",
                                "id": 1051704,
                                "parentId": 10517
                            },
                            {
                                "authName": "手动删除",
                                "id": 1051705,
                                "parentId": 10517
                            },
                            {
                                "authName": "手动查看详情",
                                "id": 1051706,
                                "parentId": 10517
                            },
                            {
                                "authName": "充电桩升级",
                                "id": 1051707,
                                "parentId": 10517
                            }
                        ],
                        "authName": "采集器固件管理",
                        "id": 10517,
                        "parentId": 105
                    },
                    {
                        "subs": [
                            {
                                "authName": "自动上传",
                                "id": 1051800,
                                "parentId": 10518
                            },
                            {
                                "authName": "自动审核",
                                "id": 1051801,
                                "parentId": 10518
                            },
                            {
                                "authName": "auth_datalog_edit",
                                "id": 1051802,
                                "parentId": 10518
                            },
                            {
                                "authName": "自动删除",
                                "id": 1051803,
                                "parentId": 10518
                            },
                            {
                                "authName": "自动查看详情",
                                "id": 1051804,
                                "parentId": 10518
                            },
                            {
                                "authName": "auth_device_upload",
                                "id": 1051805,
                                "parentId": 10518
                            }
                        ],
                        "authName": "充电桩管理",
                        "id": 10518,
                        "parentId": 105
                    },
                    {
                        "subs": [
                            {
                                "authName": "充电桩升级",
                                "id": 1051900,
                                "parentId": 10519
                            }
                        ],
                        "authName": "便携储能产品升级",
                        "id": 10519,
                        "parentId": 105
                    },
                    {
                        "subs": [
                            {
                                "authName": "auth_batch_upgrade",
                                "id": 1052000,
                                "parentId": 10520
                            }
                        ],
                        "authName": "批量升级",
                        "id": 10520,
                        "parentId": 105
                    }
                ],
                "authName": "升级系统",
                "id": 105,
                "parentId": 1
            }
        ],
        "authName": "监控管理",
        "id": 1,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "导出数据",
                        "id": 40000,
                        "parentId": 400
                    }
                ],
                "authName": "运维统分",
                "id": 400,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "添加问题",
                        "id": 40100,
                        "parentId": 401
                    },
                    {
                        "authName": "转移问题",
                        "id": 40101,
                        "parentId": 401
                    },
                    {
                        "authName": "删除问题",
                        "id": 40102,
                        "parentId": 401
                    },
                    {
                        "authName": "提交回复",
                        "id": 40103,
                        "parentId": 401
                    },
                    {
                        "authName": "设为已解决",
                        "id": 40104,
                        "parentId": 401
                    },
                    {
                        "authName": "转为派单",
                        "id": 40105,
                        "parentId": 401
                    },
                    {
                        "authName": "导出数据",
                        "id": 40106,
                        "parentId": 401
                    }
                ],
                "authName": "问题大厅",
                "id": 401,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "添加换机申请",
                        "id": 40200,
                        "parentId": 402
                    },
                    {
                        "authName": "删除客诉记录",
                        "id": 40201,
                        "parentId": 402
                    },
                    {
                        "authName": "换机申请通过",
                        "id": 40202,
                        "parentId": 402
                    },
                    {
                        "authName": "换机申请驳回",
                        "id": 40203,
                        "parentId": 402
                    },
                    {
                        "authName": "发送替换机",
                        "id": 40204,
                        "parentId": 402
                    },
                    {
                        "authName": "取消替换机",
                        "id": 40205,
                        "parentId": 402
                    },
                    {
                        "authName": "回收旧机",
                        "id": 40206,
                        "parentId": 402
                    },
                    {
                        "authName": "取消回收旧机",
                        "id": 40207,
                        "parentId": 402
                    },
                    {
                        "authName": "回收替换机-是",
                        "id": 40208,
                        "parentId": 402
                    },
                    {
                        "authName": "回收替换机-否",
                        "id": 40209,
                        "parentId": 402
                    },
                    {
                        "authName": "导出客诉",
                        "id": 40210,
                        "parentId": 402
                    },
                    {
                        "authName": "添加备注",
                        "id": 40211,
                        "parentId": 402
                    },
                    {
                        "authName": "支付权限",
                        "id": 40212,
                        "parentId": 402
                    },
                    {
                        "authName": "人员分配",
                        "id": 40213,
                        "parentId": 402
                    },
                    {
                        "authName": "换机补录",
                        "id": 40214,
                        "parentId": 402
                    },
                    {
                        "authName": "更换审核人",
                        "id": 40215,
                        "parentId": 402
                    },
                    {
                        "authName": "高级设置",
                        "id": 40216,
                        "parentId": 402
                    },
                    {
                        "authName": "便携式换机申请数据查看",
                        "id": 40217,
                        "parentId": 402
                    },
                    {
                        "authName": "便携式换机删除",
                        "id": 40218,
                        "parentId": 402
                    },
                    {
                        "authName": "便携式换机导出",
                        "id": 40219,
                        "parentId": 402
                    },
                    {
                        "authName": "便携式换机添加",
                        "id": 40220,
                        "parentId": 402
                    },
                    {
                        "authName": "重启换机申请",
                        "id": 40221,
                        "parentId": 402
                    }
                ],
                "authName": "换机申请",
                "id": 402,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "待分配工单",
                        "id": 40300,
                        "parentId": 403
                    },
                    {
                        "authName": "添加派单",
                        "id": 40301,
                        "parentId": 403
                    },
                    {
                        "authName": "转移派单",
                        "id": 40302,
                        "parentId": 403
                    },
                    {
                        "authName": "删除派单",
                        "id": 40303,
                        "parentId": 403
                    },
                    {
                        "authName": "提交工单",
                        "id": 40304,
                        "parentId": 403
                    },
                    {
                        "authName": "接收工单",
                        "id": 40305,
                        "parentId": 403
                    },
                    {
                        "authName": "编辑工单",
                        "id": 40306,
                        "parentId": 403
                    },
                    {
                        "authName": "完成工单",
                        "id": 40307,
                        "parentId": 403
                    },
                    {
                        "authName": "回访工单",
                        "id": 40308,
                        "parentId": 403
                    },
                    {
                        "authName": "工单来源",
                        "id": 40309,
                        "parentId": 403
                    },
                    {
                        "authName": "工单审核",
                        "id": 40310,
                        "parentId": 403
                    },
                    {
                        "authName": "导出工单",
                        "id": 40311,
                        "parentId": 403
                    },
                    {
                        "authName": "国内工单",
                        "id": 40312,
                        "parentId": 403
                    },
                    {
                        "authName": "国际工单",
                        "id": 40313,
                        "parentId": 403
                    },
                    {
                        "authName": "工单补录",
                        "id": 40314,
                        "parentId": 403
                    }
                ],
                "authName": "工单列表",
                "id": 403,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "添加服务记录",
                        "id": 40500,
                        "parentId": 405
                    },
                    {
                        "authName": "添加模板",
                        "id": 40501,
                        "parentId": 405
                    },
                    {
                        "authName": "删除记录",
                        "id": 40502,
                        "parentId": 405
                    }
                ],
                "authName": "服务记录",
                "id": 405,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "添加短信模板",
                        "id": 40600,
                        "parentId": 406
                    },
                    {
                        "authName": "审核短信模板",
                        "id": 40601,
                        "parentId": 406
                    },
                    {
                        "authName": "编辑短信模板",
                        "id": 40602,
                        "parentId": 406
                    },
                    {
                        "authName": "删除短信模板",
                        "id": 40603,
                        "parentId": 406
                    },
                    {
                        "authName": "短信发送记录",
                        "id": 40604,
                        "parentId": 406
                    }
                ],
                "authName": "短信通知",
                "id": 406,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "新增物料",
                        "id": 40800,
                        "parentId": 408
                    },
                    {
                        "authName": "导入物料清单",
                        "id": 40801,
                        "parentId": 408
                    },
                    {
                        "authName": "导出数据",
                        "id": 40802,
                        "parentId": 408
                    }
                ],
                "authName": "运维物料",
                "id": 408,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "查看",
                                "id": 4090000,
                                "parentId": 40900
                            },
                            {
                                "authName": "导出",
                                "id": 4090001,
                                "parentId": 40900
                            }
                        ],
                        "authName": "我的申请",
                        "id": 40900,
                        "parentId": 409
                    },
                    {
                        "subs": [
                            {
                                "authName": "审批",
                                "id": 4090100,
                                "parentId": 40901
                            },
                            {
                                "authName": "查看",
                                "id": 4090101,
                                "parentId": 40901
                            },
                            {
                                "authName": "导出",
                                "id": 4090102,
                                "parentId": 40901
                            }
                        ],
                        "authName": "我的审批",
                        "id": 40901,
                        "parentId": 409
                    },
                    {
                        "subs": [
                            {
                                "authName": "查看",
                                "id": 4090200,
                                "parentId": 40902
                            },
                            {
                                "authName": "导出",
                                "id": 4090201,
                                "parentId": 40902
                            }
                        ],
                        "authName": "抄送给我",
                        "id": 40902,
                        "parentId": 409
                    }
                ],
                "authName": "出差申请",
                "id": 409,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "添加故障处理信息",
                        "id": 41000,
                        "parentId": 410
                    },
                    {
                        "authName": "查看故障处理信息",
                        "id": 41001,
                        "parentId": 410
                    },
                    {
                        "authName": "导出处理信息",
                        "id": 41002,
                        "parentId": 410
                    }
                ],
                "authName": "故障运维",
                "id": 410,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "新增规则",
                                "id": 4110000,
                                "parentId": 41100
                            },
                            {
                                "authName": "编辑规则",
                                "id": 4110001,
                                "parentId": 41100
                            },
                            {
                                "authName": "删除规则",
                                "id": 4110002,
                                "parentId": 41100
                            }
                        ],
                        "authName": "积分规则",
                        "id": 41100,
                        "parentId": 411
                    },
                    {
                        "subs": [
                            {
                                "authName": "新增礼品",
                                "id": 4110100,
                                "parentId": 41101
                            },
                            {
                                "authName": "编辑礼品",
                                "id": 4110101,
                                "parentId": 41101
                            },
                            {
                                "authName": "删除礼品",
                                "id": 4110102,
                                "parentId": 41101
                            }
                        ],
                        "authName": "礼品列表",
                        "id": 41101,
                        "parentId": 411
                    },
                    {
                        "subs": [
                            {
                                "authName": "添加信息",
                                "id": 4110200,
                                "parentId": 41102
                            }
                        ],
                        "authName": "兑换记录",
                        "id": 41102,
                        "parentId": 411
                    }
                ],
                "authName": "积分系统",
                "id": 411,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "查看全部区域物料",
                                "id": 4120000,
                                "parentId": 41200
                            },
                            {
                                "authName": "查看负责区域物料",
                                "id": 4120001,
                                "parentId": 41200
                            },
                            {
                                "authName": "模糊搜索",
                                "id": 4120002,
                                "parentId": 41200
                            },
                            {
                                "authName": "录入基础数据",
                                "id": 4120003,
                                "parentId": 41200
                            },
                            {
                                "authName": "入库物料",
                                "id": 4120004,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料调拨",
                                "id": 4120005,
                                "parentId": 41200
                            },
                            {
                                "authName": "入库物料",
                                "id": 4120006,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料出库",
                                "id": 4120007,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料盘点",
                                "id": 4120008,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料锁定",
                                "id": 4120009,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料解锁",
                                "id": 4120010,
                                "parentId": 41200
                            },
                            {
                                "authName": "物料编辑",
                                "id": 4120011,
                                "parentId": 41200
                            },
                            {
                                "authName": "查看序列号",
                                "id": 4120012,
                                "parentId": 41200
                            },
                            {
                                "authName": "申请物料",
                                "id": 4120013,
                                "parentId": 41200
                            }
                        ],
                        "authName": "物料库存明细",
                        "id": 41200,
                        "parentId": 412
                    },
                    {
                        "subs": [
                            {
                                "authName": "查看全部区域仓库",
                                "id": 4120100,
                                "parentId": 41201
                            },
                            {
                                "authName": "查看自己区域仓库",
                                "id": 4120101,
                                "parentId": 41201
                            },
                            {
                                "authName": "新建仓库",
                                "id": 4120102,
                                "parentId": 41201
                            },
                            {
                                "authName": "新建分组",
                                "id": 4120104,
                                "parentId": 41201
                            },
                            {
                                "authName": "删除仓库",
                                "id": 4120105,
                                "parentId": 41201
                            },
                            {
                                "authName": "编辑仓库",
                                "id": 4120106,
                                "parentId": 41201
                            },
                            {
                                "authName": "删除分组",
                                "id": 4120107,
                                "parentId": 41201
                            },
                            {
                                "authName": "编辑分组",
                                "id": 4120108,
                                "parentId": 41201
                            }
                        ],
                        "authName": "仓库列表",
                        "id": 41201,
                        "parentId": 412
                    },
                    {
                        "subs": [
                            {
                                "authName": "查看全部区域数据",
                                "id": 4120200,
                                "parentId": 41202
                            },
                            {
                                "authName": "查看自己区域数据",
                                "id": 4120201,
                                "parentId": 41202
                            },
                            {
                                "authName": "模糊搜索",
                                "id": 4120202,
                                "parentId": 41202
                            },
                            {
                                "authName": "导出",
                                "id": 4120203,
                                "parentId": 41202
                            }
                        ],
                        "authName": "物料统计",
                        "id": 41202,
                        "parentId": 412
                    },
                    {
                        "subs": [
                            {
                                "subs": [
                                    {
                                        "authName": "模糊搜索",
                                        "id": 412030000,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "出库",
                                        "id": 412030002,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "客服助理审核",
                                        "id": 412030003,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "仓管员审核",
                                        "id": 412030004,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "查看驳回原因",
                                        "id": 412030005,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "查看物料申请单",
                                        "id": 412030006,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "查看申请单链接",
                                        "id": 412030007,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "查看物料出库清单",
                                        "id": 412030008,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "重新申请",
                                        "id": 412030009,
                                        "parentId": 4120300
                                    },
                                    {
                                        "authName": "查看出库单链接",
                                        "id": 412030010,
                                        "parentId": 4120300
                                    }
                                ],
                                "authName": "物料审核申请",
                                "id": 4120300,
                                "parentId": 41203
                            },
                            {
                                "subs": [
                                    {
                                        "authName": "模糊搜索",
                                        "id": 412030100,
                                        "parentId": 4120301
                                    },
                                    {
                                        "authName": "盘点审核",
                                        "id": 412030105,
                                        "parentId": 4120301
                                    }
                                ],
                                "authName": "物料审核盘点",
                                "id": 4120301,
                                "parentId": 41203
                            }
                        ],
                        "authName": "物料审核申请",
                        "id": 41203,
                        "parentId": 412
                    },
                    {
                        "subs": [
                            {
                                "authName": "查看基础数据",
                                "id": 4120400,
                                "parentId": 41204
                            },
                            {
                                "authName": "编辑基础数据",
                                "id": 4120401,
                                "parentId": 41204
                            }
                        ],
                        "authName": "物料基础数据",
                        "id": 41204,
                        "parentId": 412
                    },
                    {
                        "subs": [
                            {
                                "authName": "模糊搜索",
                                "id": 4120500,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料入库记录",
                                "id": 4120501,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料出库记录",
                                "id": 4120502,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料调拨记录",
                                "id": 4120503,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料锁定记录",
                                "id": 4120504,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料盘点记录",
                                "id": 4120505,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料改制记录",
                                "id": 4120506,
                                "parentId": 41205
                            },
                            {
                                "authName": "物料基础数据记录",
                                "id": 4120515,
                                "parentId": 41205
                            }
                        ],
                        "authName": "物料申请记录",
                        "id": 41205,
                        "parentId": 412
                    }
                ],
                "authName": "售后备品管理",
                "id": 412,
                "parentId": 4
            },
            {
                "subs": [
                    {
                        "authName": "查询",
                        "id": 41300,
                        "parentId": 413
                    },
                    {
                        "authName": "导出案例",
                        "id": 41301,
                        "parentId": 413
                    },
                    {
                        "authName": "添加案例",
                        "id": 41302,
                        "parentId": 413
                    },
                    {
                        "authName": "编辑案例",
                        "id": 41303,
                        "parentId": 413
                    }
                ],
                "authName": "Call Log",
                "id": 413,
                "parentId": 4
            }
        ],
        "authName": "服务大厅",
        "id": 4,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "修改信息",
                        "id": 50000,
                        "parentId": 500
                    },
                    {
                        "authName": "添加报名",
                        "id": 50001,
                        "parentId": 500
                    },
                    {
                        "authName": "替换",
                        "id": 50002,
                        "parentId": 500
                    },
                    {
                        "authName": "复制链接",
                        "id": 50003,
                        "parentId": 500
                    },
                    {
                        "authName": "更改授权状态",
                        "id": 50004,
                        "parentId": 500
                    },
                    {
                        "authName": "删除",
                        "id": 50005,
                        "parentId": 500
                    },
                    {
                        "authName": "导出数据",
                        "id": 50006,
                        "parentId": 500
                    }
                ],
                "authName": "在线报名",
                "id": 500,
                "parentId": 5
            },
            {
                "subs": [
                    {
                        "authName": "禁用启用",
                        "id": 50100,
                        "parentId": 501
                    },
                    {
                        "authName": "编辑工程师信息",
                        "id": 50101,
                        "parentId": 501
                    },
                    {
                        "authName": "查看工牌",
                        "id": 50102,
                        "parentId": 501
                    }
                ],
                "authName": "授权工程师信息",
                "id": 501,
                "parentId": 5
            },
            {
                "subs": [
                    {
                        "authName": "添加授权服务商",
                        "id": 50200,
                        "parentId": 502
                    },
                    {
                        "authName": "查看工程师",
                        "id": 50201,
                        "parentId": 502
                    },
                    {
                        "authName": "编辑信息",
                        "id": 50202,
                        "parentId": 502
                    },
                    {
                        "authName": "合作",
                        "id": 50203,
                        "parentId": 502
                    },
                    {
                        "authName": "关联",
                        "id": 50204,
                        "parentId": 502
                    }
                ],
                "authName": "授权服务商信息",
                "id": 502,
                "parentId": 5
            }
        ],
        "authName": "授权运维",
        "id": 5,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "是否忽略",
                                "id": 6000100,
                                "parentId": 60001
                            },
                            {
                                "authName": "导出数据",
                                "id": 6000101,
                                "parentId": 60001
                            }
                        ],
                        "authName": "智能预警",
                        "id": 60001,
                        "parentId": 600
                    }
                ],
                "authName": "智能预警",
                "id": 600,
                "parentId": 6
            },
            {
                "authName": "故障分析",
                "id": 601,
                "parentId": 6
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "导出数据",
                                "id": 6020000,
                                "parentId": 60200
                            }
                        ],
                        "authName": "内部发电预测",
                        "id": 60200,
                        "parentId": 602
                    },
                    {
                        "subs": [
                            {
                                "authName": "导出数据",
                                "id": 6020100,
                                "parentId": 60201
                            },
                            {
                                "authName": "测损失率阈值",
                                "id": 6020101,
                                "parentId": 60201
                            },
                            {
                                "authName": "思迈特服务器设备查看发电预测数据",
                                "id": 6020102,
                                "parentId": 60201
                            }
                        ],
                        "authName": "外部发电预测",
                        "id": 60201,
                        "parentId": 602
                    }
                ],
                "authName": "发电量分析",
                "id": 602,
                "parentId": 6
            }
        ],
        "authName": "数据分析",
        "id": 6,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "编辑用户",
                                "id": 7000100,
                                "parentId": 70001
                            },
                            {
                                "authName": "禁启用户",
                                "id": 7000101,
                                "parentId": 70001
                            },
                            {
                                "authName": "重置用户密码",
                                "id": 7000102,
                                "parentId": 70001
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000103,
                                "parentId": 70001
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000104,
                                "parentId": 70001
                            },
                            {
                                "authName": "邮箱条件",
                                "id": 7000105,
                                "parentId": 70001
                            },
                            {
                                "authName": "电话条件",
                                "id": 7000106,
                                "parentId": 70001
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000107,
                                "parentId": 70001
                            },
                            {
                                "authName": "编辑电站",
                                "id": 7000109,
                                "parentId": 70001
                            }
                        ],
                        "authName": "用户管理",
                        "id": 70001,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑电站",
                                "id": 7000200,
                                "parentId": 70002
                            },
                            {
                                "authName": "转移电站",
                                "id": 7000201,
                                "parentId": 70002
                            },
                            {
                                "authName": "添加采集器",
                                "id": 7000202,
                                "parentId": 70002
                            },
                            {
                                "authName": "删除电站",
                                "id": 7000203,
                                "parentId": 70002
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000204,
                                "parentId": 70002
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000205,
                                "parentId": 70002
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000206,
                                "parentId": 70002
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000207,
                                "parentId": 70002
                            }
                        ],
                        "authName": "电站管理",
                        "id": 70002,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑采集器",
                                "id": 7000300,
                                "parentId": 70003
                            },
                            {
                                "authName": "设置采集器",
                                "id": 7000301,
                                "parentId": 70003
                            },
                            {
                                "authName": "删除采集器",
                                "id": 7000302,
                                "parentId": 70003
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000303,
                                "parentId": 70003
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000304,
                                "parentId": 70003
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000305,
                                "parentId": 70003
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000306,
                                "parentId": 70003
                            },
                            {
                                "authName": "国网数据设置",
                                "id": 7000307,
                                "parentId": 70003
                            }
                        ],
                        "authName": "采集器管理",
                        "id": 70003,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑逆变器",
                                "id": 7000400,
                                "parentId": 70004
                            },
                            {
                                "authName": "设置逆变器",
                                "id": 7000401,
                                "parentId": 70004
                            },
                            {
                                "authName": "删除逆变器（关系）",
                                "id": 7000402,
                                "parentId": 70004
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000403,
                                "parentId": 70004
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000404,
                                "parentId": 70004
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000405,
                                "parentId": 70004
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000406,
                                "parentId": 70004
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7000407,
                                "parentId": 70004
                            },
                            {
                                "authName": "预测发电量",
                                "id": 7000408,
                                "parentId": 70004
                            },
                            {
                                "authName": "清除发电量",
                                "id": 7000409,
                                "parentId": 70004
                            }
                        ],
                        "authName": "逆变器管理",
                        "id": 70004,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑储能机",
                                "id": 7000500,
                                "parentId": 70005
                            },
                            {
                                "authName": "设置储能机",
                                "id": 7000501,
                                "parentId": 70005
                            },
                            {
                                "authName": "删除储能机（关系）",
                                "id": 7000502,
                                "parentId": 70005
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000503,
                                "parentId": 70005
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000504,
                                "parentId": 70005
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000505,
                                "parentId": 70005
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000506,
                                "parentId": 70005
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7000507,
                                "parentId": 70005
                            }
                        ],
                        "authName": "储能机管理",
                        "id": 70005,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑混储一体机",
                                "id": 7000600,
                                "parentId": 70006
                            },
                            {
                                "authName": "设置混储一体机",
                                "id": 7000601,
                                "parentId": 70006
                            },
                            {
                                "authName": "删除混储一体机",
                                "id": 7000602,
                                "parentId": 70006
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000603,
                                "parentId": 70006
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000604,
                                "parentId": 70006
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000605,
                                "parentId": 70006
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000606,
                                "parentId": 70006
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7000607,
                                "parentId": 70006
                            },
                            {
                                "authName": "预测用电量",
                                "id": 7000608,
                                "parentId": 70006
                            }
                        ],
                        "authName": "混储一体机管理",
                        "id": 70006,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑SPA",
                                "id": 7000700,
                                "parentId": 70007
                            },
                            {
                                "authName": "设置SPA",
                                "id": 7000701,
                                "parentId": 70007
                            },
                            {
                                "authName": "删除SPA",
                                "id": 7000702,
                                "parentId": 70007
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000703,
                                "parentId": 70007
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000704,
                                "parentId": 70007
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000705,
                                "parentId": 70007
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000706,
                                "parentId": 70007
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7000707,
                                "parentId": 70007
                            },
                            {
                                "authName": "预测用电量",
                                "id": 7000708,
                                "parentId": 70007
                            }
                        ],
                        "authName": "SPA管理",
                        "id": 70007,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑",
                                "id": 7000800,
                                "parentId": 70008
                            },
                            {
                                "authName": "设置",
                                "id": 7000801,
                                "parentId": 70008
                            },
                            {
                                "authName": "删除智能电表",
                                "id": 7000802,
                                "parentId": 70008
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000803,
                                "parentId": 70008
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000804,
                                "parentId": 70008
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000805,
                                "parentId": 70008
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000806,
                                "parentId": 70008
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7000807,
                                "parentId": 70008
                            }
                        ],
                        "authName": "智能电表",
                        "id": 70008,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑",
                                "id": 7000900,
                                "parentId": 70009
                            },
                            {
                                "authName": "设置",
                                "id": 7000901,
                                "parentId": 70009
                            },
                            {
                                "authName": "删除环境监测仪",
                                "id": 7000902,
                                "parentId": 70009
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7000903,
                                "parentId": 70009
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7000904,
                                "parentId": 70009
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7000905,
                                "parentId": 70009
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7000906,
                                "parentId": 70009
                            }
                        ],
                        "authName": "环境监测仪",
                        "id": 70009,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑",
                                "id": 7001100,
                                "parentId": 70011
                            },
                            {
                                "authName": "设置",
                                "id": 7001101,
                                "parentId": 70011
                            },
                            {
                                "authName": "删除充电桩",
                                "id": 7001102,
                                "parentId": 70011
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7001103,
                                "parentId": 70011
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7001104,
                                "parentId": 70011
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7001105,
                                "parentId": 70011
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001107,
                                "parentId": 70011
                            },
                            {
                                "authName": "解绑",
                                "id": 7001108,
                                "parentId": 70011
                            },
                            {
                                "authName": "升级",
                                "id": 7001109,
                                "parentId": 70011
                            },
                            {
                                "authName": "解锁",
                                "id": 7001110,
                                "parentId": 70011
                            }
                        ],
                        "authName": "充电桩",
                        "id": 70011,
                        "parentId": 700
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 70012,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "zfdyh_History_of_failure",
                                "id": 7001300,
                                "parentId": 70013
                            }
                        ],
                        "authName": "储能电池",
                        "id": 70013,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑商业储能机",
                                "id": 7001400,
                                "parentId": 70014
                            },
                            {
                                "authName": "设置商业储能机",
                                "id": 7001401,
                                "parentId": 70014
                            },
                            {
                                "authName": "删除商业储能机",
                                "id": 7001402,
                                "parentId": 70014
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7001403,
                                "parentId": 70014
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7001404,
                                "parentId": 70014
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7001405,
                                "parentId": 70014
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7001406,
                                "parentId": 70014
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001407,
                                "parentId": 70014
                            }
                        ],
                        "authName": "商业储能机管理",
                        "id": 70014,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "修改外置PID箱",
                                "id": 7001500,
                                "parentId": 70015
                            },
                            {
                                "authName": "设置外置PID箱",
                                "id": 7001501,
                                "parentId": 70015
                            },
                            {
                                "authName": "删除外置PID箱",
                                "id": 7001502,
                                "parentId": 70015
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7001503,
                                "parentId": 70015
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7001504,
                                "parentId": 70015
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7001505,
                                "parentId": 70015
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7001506,
                                "parentId": 70015
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001507,
                                "parentId": 70015
                            }
                        ],
                        "authName": "auth_pid_manage",
                        "id": 70015,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "用户条件",
                                "id": 7001600,
                                "parentId": 70016
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001601,
                                "parentId": 70016
                            },
                            {
                                "authName": "质保卡信息",
                                "id": 7001602,
                                "parentId": 70016
                            },
                            {
                                "authName": "故障告警日志",
                                "id": 7001603,
                                "parentId": 70016
                            },
                            {
                                "authName": "导出故障告警日志",
                                "id": 7001604,
                                "parentId": 70016
                            },
                            {
                                "authName": "设备数据",
                                "id": 7001605,
                                "parentId": 70016
                            },
                            {
                                "authName": "导出设备数据",
                                "id": 7001606,
                                "parentId": 70016
                            }
                        ],
                        "authName": "便携式电源",
                        "id": 70016,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "编辑SPH",
                                "id": 7001700,
                                "parentId": 70017
                            },
                            {
                                "authName": "设置SPH",
                                "id": 7001701,
                                "parentId": 70017
                            },
                            {
                                "authName": "删除SPH",
                                "id": 7001702,
                                "parentId": 70017
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7001703,
                                "parentId": 70017
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7001704,
                                "parentId": 70017
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7001705,
                                "parentId": 70017
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7001706,
                                "parentId": 70017
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001707,
                                "parentId": 70017
                            }
                        ],
                        "authName": "微网户用储能管理",
                        "id": 70017,
                        "parentId": 700
                    },
                    {
                        "subs": [
                            {
                                "authName": "设置",
                                "id": 7001800,
                                "parentId": 70018
                            },
                            {
                                "authName": "历史数据",
                                "id": 7001801,
                                "parentId": 70018
                            },
                            {
                                "authName": "负载",
                                "id": 7001802,
                                "parentId": 70018
                            },
                            {
                                "authName": "进入ShineServer",
                                "id": 7001803,
                                "parentId": 70018
                            },
                            {
                                "authName": "用户名条件",
                                "id": 7001804,
                                "parentId": 70018
                            },
                            {
                                "authName": "电站名条件",
                                "id": 7001805,
                                "parentId": 70018
                            },
                            {
                                "authName": "采集器条件",
                                "id": 7001806,
                                "parentId": 70018
                            },
                            {
                                "authName": "设备序列号条件",
                                "id": 7001807,
                                "parentId": 70018
                            }
                        ],
                        "authName": "GroBoost",
                        "id": 70018,
                        "parentId": 700
                    }
                ],
                "authName": "售后查询",
                "id": 700,
                "parentId": 7
            },
            {
                "subs": [
                    {
                        "authName": "导出数据",
                        "id": 70100,
                        "parentId": 701
                    },
                    {
                        "authName": "信息导入",
                        "id": 70101,
                        "parentId": 701
                    },
                    {
                        "authName": "查看",
                        "id": 70102,
                        "parentId": 701
                    },
                    {
                        "authName": "删除",
                        "id": 70103,
                        "parentId": 701
                    },
                    {
                        "authName": "报废记录",
                        "id": 70104,
                        "parentId": 701
                    },
                    {
                        "authName": "报废导出",
                        "id": 70105,
                        "parentId": 701
                    },
                    {
                        "authName": "报废导入",
                        "id": 70106,
                        "parentId": 701
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 70107,
                        "parentId": 701
                    },
                    {
                        "authName": "便携式客退列表-维修列表",
                        "id": 70108,
                        "parentId": 701
                    },
                    {
                        "authName": "便携式客退列表-维修列表导入",
                        "id": 70109,
                        "parentId": 701
                    },
                    {
                        "authName": "便携式客退列表-维修列表导出",
                        "id": 70110,
                        "parentId": 701
                    },
                    {
                        "authName": "便携式客退列表-报废记录",
                        "id": 70111,
                        "parentId": 701
                    },
                    {
                        "authName": "便携式客退列表-报废记录导入",
                        "id": 70112,
                        "parentId": 701
                    }
                ],
                "authName": "客退列表",
                "id": 701,
                "parentId": 7
            },
            {
                "subs": [
                    {
                        "authName": "新增模板",
                        "id": 70200,
                        "parentId": 702
                    },
                    {
                        "authName": "编辑模板",
                        "id": 70201,
                        "parentId": 702
                    },
                    {
                        "authName": "删除模板",
                        "id": 70202,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_View_template_binding_detail",
                        "id": 70203,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_Template_Name_Condition",
                        "id": 70204,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_Template_ID_Condition",
                        "id": 70205,
                        "parentId": 702
                    },
                    {
                        "authName": "更换模板",
                        "id": 70206,
                        "parentId": 702
                    },
                    {
                        "authName": "批量更换模板",
                        "id": 70207,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_View_EV_Charger_information",
                        "id": 70208,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_Redelivery_template",
                        "id": 70209,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_EV_Charger_Condition",
                        "id": 70210,
                        "parentId": 702
                    },
                    {
                        "authName": "dzw_Delivery_State_Condition",
                        "id": 70211,
                        "parentId": 702
                    }
                ],
                "authName": "费率模板管理",
                "id": 702,
                "parentId": 7
            },
            {
                "subs": [
                    {
                        "authName": "绑定邮箱",
                        "id": 70300,
                        "parentId": 703
                    },
                    {
                        "authName": "新增卡片",
                        "id": 70301,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Cancel_card",
                        "id": 70302,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Batch_import_cards",
                        "id": 70303,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Recharge_RFID_card",
                        "id": 70304,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_View_detail",
                        "id": 70305,
                        "parentId": 703
                    },
                    {
                        "authName": "批量导出明细",
                        "id": 70306,
                        "parentId": 703
                    },
                    {
                        "authName": "新增绑定桩",
                        "id": 70307,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Unbind_EV_Charger",
                        "id": 70308,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Card_Number_Search_Condition",
                        "id": 70309,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Card_Type_Search_Condition",
                        "id": 70310,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Card_State_Search_Condition",
                        "id": 70311,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Add_Date_Condition",
                        "id": 70312,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Email_Address_Condition",
                        "id": 70313,
                        "parentId": 703
                    },
                    {
                        "authName": "dzw_Binding_EV_Charger_SN_Condition",
                        "id": 70314,
                        "parentId": 703
                    },
                    {
                        "authName": "编辑卡片",
                        "id": 70315,
                        "parentId": 703
                    }
                ],
                "authName": "dzw_RFID_card",
                "id": 703,
                "parentId": 7
            }
        ],
        "authName": "售后运维",
        "id": 7,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "添加知识分享",
                        "id": 80000,
                        "parentId": 800
                    },
                    {
                        "authName": "转移知识分享",
                        "id": 80001,
                        "parentId": 800
                    },
                    {
                        "authName": "删除知识分享",
                        "id": 80002,
                        "parentId": 800
                    },
                    {
                        "authName": "管理知识分类",
                        "id": 80003,
                        "parentId": 800
                    },
                    {
                        "authName": "添加知识分类",
                        "id": 80004,
                        "parentId": 800
                    },
                    {
                        "authName": "编辑知识分类",
                        "id": 80005,
                        "parentId": 800
                    },
                    {
                        "authName": "删除知识分类",
                        "id": 80006,
                        "parentId": 800
                    }
                ],
                "authName": "知识分享",
                "id": 800,
                "parentId": 8
            },
            {
                "subs": [
                    {
                        "authName": "添加知识手册",
                        "id": 80100,
                        "parentId": 801
                    },
                    {
                        "authName": "编辑知识手册",
                        "id": 80101,
                        "parentId": 801
                    },
                    {
                        "authName": "删除知识手册",
                        "id": 80102,
                        "parentId": 801
                    },
                    {
                        "authName": "管理手册分类",
                        "id": 80103,
                        "parentId": 801
                    },
                    {
                        "authName": "添加手册分类",
                        "id": 80104,
                        "parentId": 801
                    },
                    {
                        "authName": "编辑手册分类",
                        "id": 80105,
                        "parentId": 801
                    },
                    {
                        "authName": "删除手册分类",
                        "id": 80106,
                        "parentId": 801
                    },
                    {
                        "authName": "下载二维码",
                        "id": 80107,
                        "parentId": 801
                    }
                ],
                "authName": "知识手册",
                "id": 801,
                "parentId": 8
            },
            {
                "subs": [
                    {
                        "authName": "知识分类列表",
                        "id": 80200,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分类新增",
                        "id": 80201,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分类修改",
                        "id": 80202,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分类删除",
                        "id": 80203,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分享列表",
                        "id": 80204,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分享新增",
                        "id": 80205,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分享修改",
                        "id": 80206,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分享删除",
                        "id": 80207,
                        "parentId": 802
                    },
                    {
                        "authName": "知识分享详情",
                        "id": 80208,
                        "parentId": 802
                    }
                ],
                "authName": "知识分享",
                "id": 802,
                "parentId": 8
            },
            {
                "subs": [
                    {
                        "authName": "新品发布列表",
                        "id": 80300,
                        "parentId": 803
                    },
                    {
                        "authName": "新品发布新增",
                        "id": 80301,
                        "parentId": 803
                    },
                    {
                        "authName": "新品发布修改",
                        "id": 80302,
                        "parentId": 803
                    },
                    {
                        "authName": "新品发布删除",
                        "id": 80303,
                        "parentId": 803
                    },
                    {
                        "authName": "新品发布详情",
                        "id": 80304,
                        "parentId": 803
                    },
                    {
                        "authName": "视频类型列表",
                        "id": 80305,
                        "parentId": 803
                    },
                    {
                        "authName": "视频类型新增",
                        "id": 80306,
                        "parentId": 803
                    },
                    {
                        "authName": "视频类型修改",
                        "id": 80307,
                        "parentId": 803
                    },
                    {
                        "authName": "视频类型删除",
                        "id": 80308,
                        "parentId": 803
                    },
                    {
                        "authName": "视频系统列表",
                        "id": 80309,
                        "parentId": 803
                    },
                    {
                        "authName": "视频系统新增",
                        "id": 80310,
                        "parentId": 803
                    },
                    {
                        "authName": "视频系统修改",
                        "id": 80311,
                        "parentId": 803
                    },
                    {
                        "authName": "视频系统删除",
                        "id": 80312,
                        "parentId": 803
                    },
                    {
                        "authName": "视频系统详情",
                        "id": 80313,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册类型列表",
                        "id": 80314,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册类型新增",
                        "id": 80315,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册类型修改",
                        "id": 80316,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册类型删除",
                        "id": 80317,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册列表",
                        "id": 80318,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册新增",
                        "id": 80319,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册修改",
                        "id": 80320,
                        "parentId": 803
                    },
                    {
                        "authName": "知识手册删除",
                        "id": 80321,
                        "parentId": 803
                    }
                ],
                "authName": "运维服务管理",
                "id": 803,
                "parentId": 8
            }
        ],
        "authName": "在线知识",
        "id": 8,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "导出数据",
                "id": 900,
                "parentId": 9
            }
        ],
        "authName": "平台日志",
        "id": 9,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "流量概览",
                "id": 1000,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "导入SIM卡流量年限",
                        "id": 100100,
                        "parentId": 1001
                    },
                    {
                        "authName": "导出数据",
                        "id": 100101,
                        "parentId": 1001
                    },
                    {
                        "authName": "ICCID条件",
                        "id": 100102,
                        "parentId": 1001
                    },
                    {
                        "authName": "服务器条件",
                        "id": 100103,
                        "parentId": 1001
                    },
                    {
                        "authName": "城市条件",
                        "id": 100104,
                        "parentId": 1001
                    },
                    {
                        "authName": "供应商条件",
                        "id": 100105,
                        "parentId": 1001
                    },
                    {
                        "authName": "获取采集器信息",
                        "id": 100106,
                        "parentId": 1001
                    },
                    {
                        "authName": "重庆导入到期日期",
                        "id": 100107,
                        "parentId": 1001
                    }
                ],
                "authName": "流量系统",
                "id": 1001,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "发票导入",
                        "id": 100200,
                        "parentId": 1002
                    },
                    {
                        "authName": "导出数据",
                        "id": 100201,
                        "parentId": 1002
                    }
                ],
                "authName": "续费订单",
                "id": 1002,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "续期更新",
                        "id": 100300,
                        "parentId": 1003
                    },
                    {
                        "authName": "信息导入",
                        "id": 100301,
                        "parentId": 1003
                    }
                ],
                "authName": "续费清单",
                "id": 1003,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "解除续费限制",
                        "id": 100400,
                        "parentId": 1004
                    },
                    {
                        "authName": "批量解除续费限制",
                        "id": 100401,
                        "parentId": 1004
                    }
                ],
                "authName": "流量续费",
                "id": 1004,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "信息导入",
                        "id": 100500,
                        "parentId": 1005
                    },
                    {
                        "authName": "天合信息删除",
                        "id": 100501,
                        "parentId": 1005
                    }
                ],
                "authName": "天合信息",
                "id": 1005,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "信息导入",
                        "id": 100600,
                        "parentId": 1006
                    },
                    {
                        "authName": "晴天信息删除",
                        "id": 100601,
                        "parentId": 1006
                    }
                ],
                "authName": "晴天信息",
                "id": 1006,
                "parentId": 10
            },
            {
                "subs": [
                    {
                        "authName": "信息导入",
                        "id": 100700,
                        "parentId": 1007
                    },
                    {
                        "authName": "正泰信息删除",
                        "id": 100701,
                        "parentId": 1007
                    },
                    {
                        "authName": "充值日期导入",
                        "id": 100702,
                        "parentId": 1007
                    }
                ],
                "authName": "正泰信息",
                "id": 1007,
                "parentId": 10
            }
        ],
        "authName": "流量平台",
        "id": 10,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "订单号条件",
                        "id": 110000,
                        "parentId": 1100
                    },
                    {
                        "authName": "公司名称条件",
                        "id": 110001,
                        "parentId": 1100
                    },
                    {
                        "authName": "旧机序列号查询",
                        "id": 110002,
                        "parentId": 1100
                    },
                    {
                        "authName": "删除质保",
                        "id": 110003,
                        "parentId": 1100
                    },
                    {
                        "authName": "替换机",
                        "id": 110004,
                        "parentId": 1100
                    },
                    {
                        "authName": "导出质保",
                        "id": 110005,
                        "parentId": 1100
                    },
                    {
                        "authName": "绑定订单",
                        "id": 110006,
                        "parentId": 1100
                    },
                    {
                        "authName": "设备型号条件",
                        "id": 110007,
                        "parentId": 1100
                    },
                    {
                        "authName": "发货时间条件",
                        "id": 110008,
                        "parentId": 1100
                    },
                    {
                        "authName": "质保时长条件",
                        "id": 110009,
                        "parentId": 1100
                    },
                    {
                        "authName": "序列号条件",
                        "id": 110010,
                        "parentId": 1100
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 110011,
                        "parentId": 1100
                    },
                    {
                        "authName": "修改备注",
                        "id": 110012,
                        "parentId": 1100
                    },
                    {
                        "authName": "修改质保时长",
                        "id": 110013,
                        "parentId": 1100
                    },
                    {
                        "authName": "数据查看",
                        "id": 110014,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询",
                        "id": 110015,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-旧机序列号条件",
                        "id": 110016,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-序列号条件",
                        "id": 110017,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-订单条件",
                        "id": 110018,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-客户名称条件",
                        "id": 110019,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-设备型号条件",
                        "id": 110020,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-发货时间-结束时间条件",
                        "id": 110021,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-质保时长条件",
                        "id": 110022,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-导出质保",
                        "id": 110023,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-替换机",
                        "id": 110024,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-查看信息",
                        "id": 110025,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-删除质保",
                        "id": 110026,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-修改备注",
                        "id": 110027,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-修改质保时长",
                        "id": 110028,
                        "parentId": 1100
                    },
                    {
                        "authName": "便携式质保查询-设置质保开始时间",
                        "id": 110029,
                        "parentId": 1100
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 110030,
                        "parentId": 1100
                    },
                    {
                        "authName": "批量导入替换机",
                        "id": 110031,
                        "parentId": 1100
                    },
                    {
                        "authName": "批量导入过期质保替换机",
                        "id": 110032,
                        "parentId": 1100
                    },
                    {
                        "authName": "过期质保替换机",
                        "id": 110033,
                        "parentId": 1100
                    },
                    {
                        "authName": "批量导入维修设备",
                        "id": 110035,
                        "parentId": 1100
                    }
                ],
                "authName": "质保查询",
                "id": 1100,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "新增产品型号",
                                "id": 11010000,
                                "parentId": 110100
                            },
                            {
                                "authName": "删除产品型号",
                                "id": 11010001,
                                "parentId": 110100
                            },
                            {
                                "authName": "编辑产品型号",
                                "id": 11010002,
                                "parentId": 110100
                            },
                            {
                                "authName": "审核产品型号",
                                "id": 11010003,
                                "parentId": 110100
                            },
                            {
                                "authName": "导出",
                                "id": 11010004,
                                "parentId": 110100
                            }
                        ],
                        "authName": "产品信息",
                        "id": 110100,
                        "parentId": 1101
                    },
                    {
                        "subs": [
                            {
                                "authName": "新增产品类型",
                                "id": 11010100,
                                "parentId": 110101
                            },
                            {
                                "authName": "新增设备类型",
                                "id": 11010101,
                                "parentId": 110101
                            },
                            {
                                "authName": "新增设备机型",
                                "id": 11010102,
                                "parentId": 110101
                            },
                            {
                                "authName": "编辑设备类型",
                                "id": 11010103,
                                "parentId": 110101
                            },
                            {
                                "authName": "编辑设备机型",
                                "id": 11010104,
                                "parentId": 110101
                            },
                            {
                                "authName": "审核设备机型",
                                "id": 11010105,
                                "parentId": 110101
                            },
                            {
                                "authName": "导出",
                                "id": 11010106,
                                "parentId": 110101
                            }
                        ],
                        "authName": "设备分类",
                        "id": 110101,
                        "parentId": 1101
                    },
                    {
                        "subs": [
                            {
                                "authName": "新增产品线",
                                "id": 11010200,
                                "parentId": 110102
                            },
                            {
                                "authName": "新增产品系列",
                                "id": 11010201,
                                "parentId": 110102
                            },
                            {
                                "authName": "新增产品型号",
                                "id": 11010202,
                                "parentId": 110102
                            },
                            {
                                "authName": "编辑产品系列",
                                "id": 11010203,
                                "parentId": 110102
                            },
                            {
                                "authName": "编辑产品型号",
                                "id": 11010204,
                                "parentId": 110102
                            },
                            {
                                "authName": "导出",
                                "id": 11010205,
                                "parentId": 110102
                            }
                        ],
                        "authName": "市场分类",
                        "id": 110102,
                        "parentId": 1101
                    }
                ],
                "authName": "导入型号",
                "id": 1101,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "导入订单号",
                        "id": 110200,
                        "parentId": 1102
                    },
                    {
                        "authName": "导出供货记录",
                        "id": 110201,
                        "parentId": 1102
                    },
                    {
                        "authName": "公司名称条件",
                        "id": 110202,
                        "parentId": 1102
                    },
                    {
                        "authName": "联系人条件",
                        "id": 110203,
                        "parentId": 1102
                    },
                    {
                        "authName": "订单号条件",
                        "id": 110204,
                        "parentId": 1102
                    },
                    {
                        "authName": "交易日期条件",
                        "id": 110205,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-导出数据",
                        "id": 110206,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-店铺名称条件",
                        "id": 110207,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-订单状态条件",
                        "id": 110208,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-订单编号条件",
                        "id": 110209,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-物流订单号条件",
                        "id": 110210,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-收件人姓名条件",
                        "id": 110211,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-手机号条件",
                        "id": 110212,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-订单时间-结束时间条件",
                        "id": 110213,
                        "parentId": 1102
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 110214,
                        "parentId": 1102
                    },
                    {
                        "authName": "终端订单-订单数据",
                        "id": 110215,
                        "parentId": 1102
                    },
                    {
                        "authName": "indiaImportNumber",
                        "id": 110216,
                        "parentId": 1102
                    }
                ],
                "authName": "供货记录",
                "id": 1102,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "导出库存管理",
                        "id": 110300,
                        "parentId": 1103
                    }
                ],
                "authName": "库存管理",
                "id": 1103,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "订单号导入",
                        "id": 110400,
                        "parentId": 1104
                    },
                    {
                        "authName": "批量导入",
                        "id": 110401,
                        "parentId": 1104
                    },
                    {
                        "authName": "特殊导入",
                        "id": 110402,
                        "parentId": 1104
                    },
                    {
                        "authName": "多次导入",
                        "id": 110403,
                        "parentId": 1104
                    },
                    {
                        "authName": "海外权限",
                        "id": 110404,
                        "parentId": 1104
                    },
                    {
                        "authName": "导入配件star_voltage",
                        "id": 110405,
                        "parentId": 1104
                    }
                ],
                "authName": "发货管理",
                "id": 1104,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "生成质保卡",
                                "id": 11050000,
                                "parentId": 110500
                            },
                            {
                                "authName": "导出延保记录",
                                "id": 11050001,
                                "parentId": 110500
                            },
                            {
                                "authName": "区域条件",
                                "id": 11050002,
                                "parentId": 110500
                            },
                            {
                                "authName": "序列号条件",
                                "id": 11050003,
                                "parentId": 110500
                            },
                            {
                                "authName": "终端用户条件",
                                "id": 11050004,
                                "parentId": 110500
                            },
                            {
                                "authName": "安装商名条件",
                                "id": 11050005,
                                "parentId": 110500
                            },
                            {
                                "authName": "邮箱条件",
                                "id": 11050006,
                                "parentId": 110500
                            }
                        ],
                        "authName": "免费延保",
                        "id": 110500,
                        "parentId": 1105
                    },
                    {
                        "subs": [
                            {
                                "authName": "审核延保申请",
                                "id": 11050100,
                                "parentId": 110501
                            },
                            {
                                "authName": "添加延保链接",
                                "id": 11050101,
                                "parentId": 110501
                            },
                            {
                                "authName": "删除",
                                "id": 11050102,
                                "parentId": 110501
                            },
                            {
                                "authName": "支付确认",
                                "id": 11050103,
                                "parentId": 110501
                            },
                            {
                                "authName": "导出延保记录",
                                "id": 11050104,
                                "parentId": 110501
                            },
                            {
                                "authName": "重启付费延保",
                                "id": 11050105,
                                "parentId": 110501
                            }
                        ],
                        "authName": "付费延保",
                        "id": 110501,
                        "parentId": 1105
                    },
                    {
                        "subs": [
                            {
                                "authName": "批量导入",
                                "id": 11050200,
                                "parentId": 110502
                            },
                            {
                                "authName": "导出延保记录",
                                "id": 11050201,
                                "parentId": 110502
                            },
                            {
                                "authName": "质保卡",
                                "id": 11050202,
                                "parentId": 110502
                            }
                        ],
                        "authName": "延保成功",
                        "id": 110502,
                        "parentId": 1105
                    },
                    {
                        "subs": [
                            {
                                "authName": "续保查询",
                                "id": 11050300,
                                "parentId": 110503
                            },
                            {
                                "authName": "添加续保",
                                "id": 11050301,
                                "parentId": 110503
                            },
                            {
                                "authName": "导出续保",
                                "id": 11050302,
                                "parentId": 110503
                            },
                            {
                                "authName": "编辑续保",
                                "id": 11050303,
                                "parentId": 110503
                            },
                            {
                                "authName": "查看续保详情",
                                "id": 11050304,
                                "parentId": 110503
                            }
                        ],
                        "authName": "付费续保",
                        "id": 110503,
                        "parentId": 1105
                    }
                ],
                "authName": "延保记录",
                "id": 1105,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "新增记录",
                        "id": 110600,
                        "parentId": 1106
                    },
                    {
                        "authName": "删除记录",
                        "id": 110601,
                        "parentId": 1106
                    },
                    {
                        "authName": "导入快递订单",
                        "id": 110602,
                        "parentId": 1106
                    },
                    {
                        "authName": "发货时间",
                        "id": 110603,
                        "parentId": 1106
                    },
                    {
                        "authName": "客户信息",
                        "id": 110604,
                        "parentId": 1106
                    },
                    {
                        "authName": "发货信息",
                        "id": 110605,
                        "parentId": 1106
                    },
                    {
                        "authName": "物流公司名",
                        "id": 110606,
                        "parentId": 1106
                    },
                    {
                        "authName": "快递单号",
                        "id": 110607,
                        "parentId": 1106
                    }
                ],
                "authName": "快递查询",
                "id": 1106,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "删除记录",
                        "id": 70801,
                        "parentId": 1107
                    },
                    {
                        "authName": "导入数据",
                        "id": 70802,
                        "parentId": 1107
                    }
                ],
                "authName": "海外数据",
                "id": 1107,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "质保审核",
                        "id": 110800,
                        "parentId": 1108
                    },
                    {
                        "authName": "关闭驳回数据",
                        "id": 110801,
                        "parentId": 1108
                    },
                    {
                        "authName": "处理驳回数据",
                        "id": 110802,
                        "parentId": 1108
                    }
                ],
                "authName": "质保审核",
                "id": 1108,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "生产流程",
                        "id": 110900,
                        "parentId": 1109
                    },
                    {
                        "authName": "下载检验报告",
                        "id": 110901,
                        "parentId": 1109
                    },
                    {
                        "authName": "生产管理导出",
                        "id": 110902,
                        "parentId": 1109
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 110903,
                        "parentId": 1109
                    }
                ],
                "authName": "生产管理",
                "id": 1109,
                "parentId": 11
            },
            {
                "subs": [
                    {
                        "authName": "入库导出",
                        "id": 111000,
                        "parentId": 1110
                    },
                    {
                        "authName": "查询条件下拉框展示",
                        "id": 111001,
                        "parentId": 1110
                    }
                ],
                "authName": "入库管理",
                "id": 1110,
                "parentId": 11
            }
        ],
        "authName": "供货系统",
        "id": 11,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "个人资料",
                "id": 1200,
                "parentId": 12
            }
        ],
        "authName": "用户中心",
        "id": 12,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "新增分销商",
                                "id": 13000000,
                                "parentId": 130000
                            },
                            {
                                "authName": "编辑分销商",
                                "id": 13000001,
                                "parentId": 130000
                            },
                            {
                                "authName": "导入设备",
                                "id": 13000002,
                                "parentId": 130000
                            },
                            {
                                "authName": "登录分销商",
                                "id": 13000003,
                                "parentId": 130000
                            },
                            {
                                "authName": "导出数据",
                                "id": 13000005,
                                "parentId": 130000
                            },
                            {
                                "authName": "开关分销商工单",
                                "id": 13000006,
                                "parentId": 130000
                            },
                            {
                                "authName": "开关分销商接收问题",
                                "id": 13000007,
                                "parentId": 130000
                            },
                            {
                                "authName": "开关分销商升级设备",
                                "id": 13000008,
                                "parentId": 130000
                            },
                            {
                                "authName": "授权权限",
                                "id": 13000009,
                                "parentId": 130000
                            },
                            {
                                "authName": "关联Token",
                                "id": 13000010,
                                "parentId": 130000
                            },
                            {
                                "authName": "显示设备数量",
                                "id": 13000011,
                                "parentId": 130000
                            },
                            {
                                "authName": "公司名称条件",
                                "id": 13000012,
                                "parentId": 130000
                            },
                            {
                                "authName": "分销商代码条件",
                                "id": 13000013,
                                "parentId": 130000
                            },
                            {
                                "authName": "选择国家条件",
                                "id": 13000014,
                                "parentId": 130000
                            },
                            {
                                "authName": "查询条件下拉框展示",
                                "id": 13000015,
                                "parentId": 130000
                            },
                            {
                                "authName": "充电桩参数导入",
                                "id": 13000016,
                                "parentId": 130000
                            }
                        ],
                        "authName": "分销商管理",
                        "id": 130000,
                        "parentId": 1300
                    },
                    {
                        "authName": "分销商申请",
                        "id": 130001,
                        "parentId": 1300
                    },
                    {
                        "authName": "安装商申请",
                        "id": 130002,
                        "parentId": 1300
                    },
                    {
                        "authName": "分销商新建",
                        "id": 130003,
                        "parentId": 1300
                    }
                ],
                "authName": "分销商管理",
                "id": 1300,
                "parentId": 13,
                "sortId": 1
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "添加安装商",
                                "id": 13010000,
                                "parentId": 130100
                            },
                            {
                                "authName": "解除关系",
                                "id": 13010001,
                                "parentId": 130100
                            },
                            {
                                "authName": "下级用户查看",
                                "id": 13010002,
                                "parentId": 130100
                            },
                            {
                                "authName": "下级用户关联",
                                "id": 13010003,
                                "parentId": 130100
                            },
                            {
                                "authName": "下级用户删除",
                                "id": 13010004,
                                "parentId": 130100
                            },
                            {
                                "authName": "修改安装商信息",
                                "id": 13010005,
                                "parentId": 130100
                            },
                            {
                                "authName": "登录安装商",
                                "id": 13010006,
                                "parentId": 130100
                            },
                            {
                                "authName": "导入安装商设备",
                                "id": 13010007,
                                "parentId": 130100
                            },
                            {
                                "authName": "删除安装商",
                                "id": 13010008,
                                "parentId": 130100
                            },
                            {
                                "authName": "导出数据",
                                "id": 13010009,
                                "parentId": 130100
                            },
                            {
                                "authName": "开关安装商工单",
                                "id": 13010010,
                                "parentId": 130100
                            },
                            {
                                "authName": "开关安装商接收问题",
                                "id": 13010011,
                                "parentId": 130100
                            },
                            {
                                "authName": "开关安装商升级设备",
                                "id": 13010012,
                                "parentId": 130100
                            },
                            {
                                "authName": "授权权限",
                                "id": 13010013,
                                "parentId": 130100
                            },
                            {
                                "authName": "显示设备数量",
                                "id": 13010014,
                                "parentId": 130100
                            },
                            {
                                "authName": "分销商代码条件",
                                "id": 13010015,
                                "parentId": 130100
                            },
                            {
                                "authName": "安装商代码条件",
                                "id": 13010016,
                                "parentId": 130100
                            },
                            {
                                "authName": "别名条件",
                                "id": 13010017,
                                "parentId": 130100
                            },
                            {
                                "authName": "公司名称条件",
                                "id": 13010018,
                                "parentId": 130100
                            },
                            {
                                "authName": "选择国家条件",
                                "id": 13010019,
                                "parentId": 130100
                            },
                            {
                                "authName": "查询条件下拉框展示",
                                "id": 13010020,
                                "parentId": 130100
                            },
                            {
                                "authName": "充电桩参数导入",
                                "id": 13010021,
                                "parentId": 130100
                            }
                        ],
                        "authName": "安装商管理",
                        "id": 130100,
                        "parentId": 1301
                    },
                    {
                        "subs": [
                            {
                                "authName": "审核",
                                "id": 13010100,
                                "parentId": 130101
                            },
                            {
                                "authName": "选择国家条件",
                                "id": 13010101,
                                "parentId": 130101
                            },
                            {
                                "authName": "公司名称条件",
                                "id": 13010102,
                                "parentId": 130101
                            },
                            {
                                "authName": "邮箱条件",
                                "id": 13010103,
                                "parentId": 130101
                            }
                        ],
                        "authName": "安装商审核",
                        "id": 130101,
                        "parentId": 1301
                    }
                ],
                "authName": "安装商管理",
                "id": 1301,
                "parentId": 13,
                "sortId": 2
            },
            {
                "subs": [
                    {
                        "authName": "新增运营商",
                        "id": 130400,
                        "parentId": 1304
                    },
                    {
                        "authName": "编辑运营商",
                        "id": 130401,
                        "parentId": 1304
                    },
                    {
                        "authName": "禁用与启用",
                        "id": 130402,
                        "parentId": 1304
                    }
                ],
                "authName": "运营商管理",
                "id": 1304,
                "parentId": 13,
                "sortId": 3
            },
            {
                "subs": [
                    {
                        "authName": "设置大屏展示页",
                        "id": 130200,
                        "parentId": 1302
                    },
                    {
                        "authName": "设置数据参数",
                        "id": 130201,
                        "parentId": 1302
                    },
                    {
                        "authName": "设置信息参数",
                        "id": 130202,
                        "parentId": 1302
                    }
                ],
                "authName": "参数设置",
                "id": 1302,
                "parentId": 13,
                "sortId": 1302
            },
            {
                "subs": [
                    {
                        "authName": "返厂机处理",
                        "id": 130300,
                        "parentId": 1303
                    },
                    {
                        "authName": "流量管理设置",
                        "id": 130301,
                        "parentId": 1303
                    },
                    {
                        "authName": "系统功能",
                        "id": 130302,
                        "parentId": 1303
                    },
                    {
                        "subs": [
                            {
                                "authName": "全部API管理 ",
                                "id": 13030300,
                                "parentId": 130303
                            },
                            {
                                "authName": "我的API管理",
                                "id": 13030301,
                                "parentId": 130303
                            },
                            {
                                "authName": "待审核",
                                "id": 13030302,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_添加申请",
                                "id": 13030303,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_删除公司",
                                "id": 13030304,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_URL推送设置",
                                "id": 13030305,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_URL_添加URL",
                                "id": 13030306,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_URL_导入设备",
                                "id": 13030307,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_URL_删除URL",
                                "id": 13030308,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_设备管理",
                                "id": 13030309,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_删除设备",
                                "id": 13030310,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_设置同步设备（客户）",
                                "id": 13030311,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_导入转换序列号",
                                "id": 13030312,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_设备同步账号",
                                "id": 13030313,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_设备同步设备",
                                "id": 13030314,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_设置03,04数据类型",
                                "id": 13030315,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_修改邮箱",
                                "id": 13030316,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_启用禁用token",
                                "id": 13030317,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_生成新token",
                                "id": 13030318,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_修改IP地址",
                                "id": 13030319,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_查看token",
                                "id": 13030320,
                                "parentId": 130303
                            },
                            {
                                "authName": "API管理_服务器查询",
                                "id": 13030321,
                                "parentId": 130303
                            }
                        ],
                        "authName": "API管理",
                        "id": 130303,
                        "parentId": 1303
                    },
                    {
                        "authName": "retrieve_information",
                        "id": 130304,
                        "parentId": 1303
                    },
                    {
                        "authName": "SIM数据获取",
                        "id": 130305,
                        "parentId": 1303
                    },
                    {
                        "subs": [
                            {
                                "authName": "导出",
                                "id": 13030600,
                                "parentId": 130306
                            },
                            {
                                "authName": "新增设备",
                                "id": 13030601,
                                "parentId": 130306
                            },
                            {
                                "authName": "添加固件",
                                "id": 13030602,
                                "parentId": 130306
                            },
                            {
                                "authName": "查看",
                                "id": 13030603,
                                "parentId": 130306
                            },
                            {
                                "authName": "编辑",
                                "id": 13030604,
                                "parentId": 130306
                            },
                            {
                                "authName": "删除",
                                "id": 13030605,
                                "parentId": 130306
                            }
                        ],
                        "authName": "IOT漏洞提交",
                        "id": 130306,
                        "parentId": 1303
                    },
                    {
                        "subs": [
                            {
                                "authName": "批量查询词条",
                                "id": 13030700,
                                "parentId": 130307
                            },
                            {
                                "authName": "手动新增",
                                "id": 13030701,
                                "parentId": 130307
                            },
                            {
                                "authName": "批量新增",
                                "id": 13030702,
                                "parentId": 130307
                            },
                            {
                                "authName": "开始审核",
                                "id": 13030703,
                                "parentId": 130307
                            },
                            {
                                "authName": "编辑词条",
                                "id": 13030704,
                                "parentId": 130307
                            },
                            {
                                "authName": "查看审核详情",
                                "id": 13030705,
                                "parentId": 130307
                            },
                            {
                                "authName": "删除",
                                "id": 13030706,
                                "parentId": 130307
                            },
                            {
                                "authName": "查看驳回理由",
                                "id": 13030707,
                                "parentId": 130307
                            },
                            {
                                "authName": "搜索条件",
                                "id": 13030708,
                                "parentId": 130307
                            },
                            {
                                "authName": "小语种审核",
                                "id": 13030709,
                                "parentId": 130307
                            },
                            {
                                "authName": "小语种审核详情",
                                "id": 13030710,
                                "parentId": 130307
                            }
                        ],
                        "authName": "统一翻译协作平台",
                        "id": 130307,
                        "parentId": 1303
                    }
                ],
                "authName": "系统管理",
                "id": 1303,
                "parentId": 13,
                "sortId": 1303
            },
            {
                "authName": "用户调研",
                "id": 1305,
                "parentId": 13,
                "sortId": 1305
            },
            {
                "subs": [
                    {
                        "authName": "建议优化",
                        "id": 130600,
                        "parentId": 1306
                    },
                    {
                        "authName": "导出数据",
                        "id": 130601,
                        "parentId": 1306
                    }
                ],
                "authName": "调研分析",
                "id": 1306,
                "parentId": 13,
                "sortId": 1306
            },
            {
                "subs": [
                    {
                        "authName": "全部",
                        "id": 130800,
                        "parentId": 1308
                    }
                ],
                "authName": "多级扩展",
                "id": 1308,
                "parentId": 13,
                "sortId": 1308
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "新建模板",
                                "id": 13090000,
                                "parentId": 130900
                            },
                            {
                                "authName": "编辑模板",
                                "id": 13090001,
                                "parentId": 130900
                            },
                            {
                                "authName": "删除模板",
                                "id": 13090002,
                                "parentId": 130900
                            }
                        ],
                        "authName": "邮件管理",
                        "id": 130900,
                        "parentId": 1309
                    },
                    {
                        "subs": [
                            {
                                "authName": "新建邮箱",
                                "id": 13090100,
                                "parentId": 130901
                            },
                            {
                                "authName": "编辑邮箱",
                                "id": 13090101,
                                "parentId": 130901
                            },
                            {
                                "authName": "删除邮箱",
                                "id": 13090102,
                                "parentId": 130901
                            }
                        ],
                        "authName": "邮箱管理",
                        "id": 130901,
                        "parentId": 1309
                    },
                    {
                        "subs": [
                            {
                                "authName": "查看邮件",
                                "id": 13090200,
                                "parentId": 130902
                            }
                        ],
                        "authName": "发送历史",
                        "id": 130902,
                        "parentId": 1309
                    },
                    {
                        "subs": [
                            {
                                "authName": "填写发送信息",
                                "id": 13090300,
                                "parentId": 130903
                            },
                            {
                                "authName": "查询条件",
                                "id": 13090301,
                                "parentId": 130903
                            },
                            {
                                "authName": "发送详情",
                                "id": 13090302,
                                "parentId": 130903
                            }
                        ],
                        "authName": "发送邮件服务",
                        "id": 130903,
                        "parentId": 1309
                    }
                ],
                "authName": "邮件服务",
                "id": 1309,
                "parentId": 13,
                "sortId": 1309
            },
            {
                "subs": [
                    {
                        "authName": "提交反馈 ",
                        "id": 131000,
                        "parentId": 1310
                    },
                    {
                        "subs": [
                            {
                                "authName": "导出数据",
                                "id": 13100100,
                                "parentId": 131001
                            },
                            {
                                "authName": "删除",
                                "id": 13100101,
                                "parentId": 131001
                            }
                        ],
                        "authName": "问题反馈列表",
                        "id": 131001,
                        "parentId": 1310
                    }
                ],
                "authName": "问题反馈",
                "id": 1310,
                "parentId": 13,
                "sortId": 1310
            }
        ],
        "authName": "系统设置",
        "id": 13,
        "parentId": 0
    },
    {
        "subs": [
            {
                "subs": [
                    {
                        "authName": "新增组织",
                        "id": 140000,
                        "parentId": 1400
                    },
                    {
                        "authName": "编辑组织",
                        "id": 140001,
                        "parentId": 1400
                    },
                    {
                        "authName": "删除组织",
                        "id": 140002,
                        "parentId": 1400
                    }
                ],
                "authName": "组织架构",
                "id": 1400,
                "parentId": 14
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "新增角色信息",
                                "id": 14010000,
                                "parentId": 140100
                            },
                            {
                                "authName": "编辑角色信息",
                                "id": 14010001,
                                "parentId": 140100
                            },
                            {
                                "authName": "删除角色信息",
                                "id": 14010002,
                                "parentId": 140100
                            }
                        ],
                        "authName": "角色权限",
                        "id": 140100,
                        "parentId": 1401
                    },
                    {
                        "subs": [
                            {
                                "authName": "新增区域",
                                "id": 14010100,
                                "parentId": 140101
                            },
                            {
                                "authName": "编辑区域",
                                "id": 14010101,
                                "parentId": 140101
                            },
                            {
                                "authName": "删除区域",
                                "id": 14010102,
                                "parentId": 140101
                            }
                        ],
                        "authName": "区域权限",
                        "id": 140101,
                        "parentId": 1401
                    }
                ],
                "authName": "权限管理",
                "id": 1401,
                "parentId": 14
            },
            {
                "subs": [
                    {
                        "subs": [
                            {
                                "authName": "查看所有员工",
                                "id": 14020000,
                                "parentId": 140200
                            },
                            {
                                "authName": "新增员工",
                                "id": 14020001,
                                "parentId": 140200
                            },
                            {
                                "authName": "编辑员工",
                                "id": 14020002,
                                "parentId": 140200
                            },
                            {
                                "authName": "用户重置密码",
                                "id": 14020003,
                                "parentId": 140200
                            },
                            {
                                "authName": "禁用与启用",
                                "id": 14020004,
                                "parentId": 140200
                            },
                            {
                                "authName": "查看权限",
                                "id": 14020005,
                                "parentId": 140200
                            },
                            {
                                "authName": "修改角色权限",
                                "id": 14020006,
                                "parentId": 140200
                            },
                            {
                                "authName": "添加角色",
                                "id": 14020007,
                                "parentId": 140200
                            },
                            {
                                "authName": "高级权限设置",
                                "id": 14020008,
                                "parentId": 140200
                            },
                            {
                                "authName": "开关接收问题",
                                "id": 14020009,
                                "parentId": 140200
                            },
                            {
                                "authName": "开关接收工单",
                                "id": 14020010,
                                "parentId": 140200
                            },
                            {
                                "authName": "开关接收换机",
                                "id": 14020011,
                                "parentId": 140200
                            },
                            {
                                "authName": "开关接收付费延保",
                                "id": 14020012,
                                "parentId": 140200
                            }
                        ],
                        "authName": "员工管理",
                        "id": 140200,
                        "parentId": 1402
                    },
                    {
                        "subs": [
                            {
                                "authName": "用户重置密码",
                                "id": 14020100,
                                "parentId": 140201
                            },
                            {
                                "authName": "禁用与启用",
                                "id": 14020101,
                                "parentId": 140201
                            }
                        ],
                        "authName": "客户管理",
                        "id": 140201,
                        "parentId": 1402
                    }
                ],
                "authName": "用户管理",
                "id": 1402,
                "parentId": 14
            },
            {
                "subs": [
                    {
                        "authName": "新增组织",
                        "id": 140300,
                        "parentId": 1403
                    },
                    {
                        "authName": "编辑组织",
                        "id": 140301,
                        "parentId": 1403
                    },
                    {
                        "authName": "删除组织",
                        "id": 140302,
                        "parentId": 1403
                    },
                    {
                        "authName": "查看",
                        "id": 140303,
                        "parentId": 1403
                    },
                    {
                        "authName": "拖拽排序",
                        "id": 140304,
                        "parentId": 1403
                    }
                ],
                "authName": "组织",
                "id": 1403,
                "parentId": 14
            }
        ],
        "authName": "组织管理",
        "id": 14,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "新增消息",
                "id": 1500,
                "parentId": 15
            },
            {
                "authName": "编辑消息",
                "id": 1501,
                "parentId": 15
            },
            {
                "authName": "删除消息",
                "id": 1502,
                "parentId": 15
            },
            {
                "authName": "撤回消息",
                "id": 1503,
                "parentId": 15
            },
            {
                "authName": "新增消息类型",
                "id": 1504,
                "parentId": 15
            },
            {
                "authName": "编辑消息类型",
                "id": 1505,
                "parentId": 15
            },
            {
                "authName": "删除消息类型",
                "id": 1506,
                "parentId": 15
            }
        ],
        "authName": "消息中心",
        "id": 15,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "导出",
                "id": 1600,
                "parentId": 16
            }
        ],
        "authName": "生命周期",
        "id": 16,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "查看",
                "id": 1700,
                "parentId": 17
            }
        ],
        "authName": "数据明文",
        "id": 17,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "shinedesign_alldata",
                "id": 1800,
                "parentId": 18
            }
        ],
        "authName": "电站设计",
        "id": 18,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "全部",
                "id": 1900,
                "parentId": 19
            }
        ],
        "authName": "联系客服",
        "id": 19,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "上线",
                "id": 2000,
                "parentId": 20
            },
            {
                "authName": "聊天记录",
                "id": 2001,
                "parentId": 20
            },
            {
                "authName": "统计分析",
                "id": 2002,
                "parentId": 20
            },
            {
                "authName": "自定义设置",
                "id": 2003,
                "parentId": 20
            }
        ],
        "authName": "聊天系统",
        "id": 20,
        "parentId": 0
    },
    {
        "subs": [
            {
                "authName": "积分系统",
                "id": 2100,
                "parentId": 21
            }
        ],
        "authName": "积分系统",
        "id": 21,
        "parentId": 0
    }
];

//设置和读取
var setOSSAuth = [2,200,20000];
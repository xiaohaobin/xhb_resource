/**
 * @author 肖浩彬
 * @description android NJS API，android可使用
 * @depend 依赖IDE HBuilder 的app开发环境
 * */

/**
 * 对象拓展函数,如果为数组，数组为哈希数组才有效
 * @param {Boolean} deep 是否深拷贝
 * @param {Object||Array} target 目标对象或者数组
 * @param {Object||Array} options 要并集的对象或者数组
 * */
function _extend(deep, target, options) {
	for(name in options) {
		copy = options[name];
		if(deep && copy instanceof Array) {
			target[name] = $.extend(deep, [], copy);
		} else if(deep && copy instanceof Object) {
			target[name] = $.extend(deep, {}, copy);
		} else {
			target[name] = options[name];
		}
	}
	return target;
}

var TrafficStats; //TrafficStats类实例对象
var total_data; //总共接收到的流量
var traffic_data; //一定时间内接收到的流量
var intervalId; //定时器的返回值，用于控制计时器的停止
//安卓NJS
try {
	var android_function = {
		/**
		 * 系统分享
		 * @param {String} shareTip 分享提示框标题提示
		 * @param {String} shareText 要分享到其他应用的文本
		 **/
		share: function(shareTip, shareText) {
			//导入Java类对象
			var Context = plus.android.importClass("android.content.Intent");
			//获取应用主Activity
			var Main = plus.android.runtimeMainActivity();
			//将类Context的这个行为(Action)ACTION_SEND，赋给shareIntent
			var shareIntent = new Context(Context.ACTION_SEND);
			//***以下两种写法是一样的
			//plus.android.invoke(shareIntent,"setType","text/plain");
			//plus.android.invoke(shareIntent,"putExtra",Context.EXTRA_TEXT,shareText);
			//设置分享类型
			shareIntent.setType("text/plain");
			//设置分享文本
			shareIntent.putExtra(Context.EXTRA_TEXT, shareText);
			//***以上两种写法是一样的
			//指定分享的包名
			//shareIntent.setPackage('com.tencent.mm',);
			Main.startActivity(Context.createChooser(shareIntent, shareTip));
		},
		/**
		 * 打电话
		 * @param {Number} phoneNum 号码
		 **/
		call: function(phoneNum) {
			// 导入Activity、Intent类
			var Intent = plus.android.importClass("android.content.Intent");
			var Uri = plus.android.importClass("android.net.Uri");
			// 获取主Activity对象的实例
			var main = plus.android.runtimeMainActivity();
			// 创建Intent
			var uri = Uri.parse("tel:" + phoneNum); // 这里可修改电话号码
			var call = new Intent("android.intent.action.CALL", uri);
			// 调用startActivity方法拨打电话
			main.startActivity(call);
		},
		//将程序切换到后台
		backstage: function() {
			var main = plus.android.runtimeMainActivity();
			main.moveTaskToBack(false);
		},
		//强制弹出软键盘
		popupKeyboard: function() {
			var nativeWebview, imm, InputMethodManager;
			var initNativeObjects = function() {
				if(mui.os.android) {
					var main = plus.android.runtimeMainActivity();
					var Context = plus.android.importClass("android.content.Context");
					InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
					imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
				} else {
					nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
				}
			};
			var showSoftInput = function() {
				var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
				if(mui.os.android) {
					//强制当前webview获得焦点
					plus.android.importClass(nativeWebview);
					nativeWebview.requestFocus();
					imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
				} else {
					nativeWebview.plusCallMethod({
						"setKeyboardDisplayRequiresUserAction": false
					});
				}
			};
			initNativeObjects();
			showSoftInput();
		},

		//获取设备的ANDROID_ID
		getANDROID_ID: function() {
			var mainActivity = plus.android.runtimeMainActivity();
			var Settings = plus.android.importClass("android.provider.Settings");
			return Settings.Secure.getString(mainActivity.getContentResolver(), Settings.Secure.ANDROID_ID);
		},

		//获取手机内部总的存储空间,返回字节单位：b (需验证)
		getTotalInternalMemorySize: function() {
			var internalMemSize = 0;
			if(plus.os.name == "Android") {
				var environment = plus.android.importClass("android.os.Environment");
				var statFs = plus.android.importClass("android.os.StatFs");
				var files = plus.android.importClass("java.io.File");

				var Files = environment.getDataDirectory();
				var StatFs = new statFs(Files.getPath());
				var blockSize = parseFloat(StatFs.getBlockSize());
				var blockCount = parseFloat(StatFs.getBlockCount());
				internalMemSize = blockSize * blockCount;
			}
			return internalMemSize;
		},
		/*获取总运行内存，返回单位：M（兆）（需验证）*/
		getTotalRamSize: function() {
			var memInfo = '/proc/meminfo';
			var temp = '',
				ramSize = '',
				arrays, initMemory;
			var fileReader = plus.android.importClass("java.io.FileReader");
			var bufferedReader = plus.android.importClass("java.io.BufferedReader");
			var FileReader = new fileReader(memInfo);
			var BufferedReader = new bufferedReader(FileReader, 8192);
			while((temp = BufferedReader.readLine()) != null) {
				if(-1 != temp.indexOf('MemTotal:')) {
					var value = temp.replace(/[^0-9]/ig, "");
					ramSize = Math.floor(parseInt(value) / (1024));
				}
			}

			return ramSize;
		},
		//实时获取手机的内存信息
		getMemorySize: function() {
			var memoryInfo = '';
			if(plus.os.name == "Android") {
				var Context = plus.android.importClass("android.content.Context");
				var ActivityManager = plus.android.importClass("android.app.ActivityManager");
				var mi = new ActivityManager.MemoryInfo();
				var activityService = plus.android.runtimeMainActivity().getSystemService(Context.ACTIVITY_SERVICE);
				activityService.getMemoryInfo(mi);
				memoryInfo = mi.plusGetAttribute("availMem");
			}
			return memoryInfo;
		},
		/*获取手机CPU信息,需验证*/
		getCpuInfo: function() {
			var cpuInfo = '/proc/cpuinfo';
			var temp = '',
				cpuHardware;
			var fileReader = plus.android.importClass("java.io.FileReader");
			var bufferedReader = plus.android.importClass("java.io.BufferedReader");
			var FileReader = new fileReader(cpuInfo);
			var BufferedReader = new bufferedReader(FileReader, 8192);
			while((temp = BufferedReader.readLine()) != null) {
				if(-1 != temp.indexOf('Hardware')) {
					cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
				}
			}
			return cpuHardware;
		},
		//获取手机的CPU核数
		getCpuCount: function() {
			var Runtime = plus.android.importClass("java.lang.Runtime");
			var cpuCount = Runtime.getRuntime().availableProcessors();
			return cpuCount;
		},

		//实时获取当前网速===============================================================================================================================
		TrafficStats: "", //TrafficStats类实例对象
		total_data: "", //总共接收到的流量
		traffic_data: "", //一定时间内接收到的流量
		intervalId: "", //定时器的返回值，用于控制计时器的停止	
		/**
		 * 实时获取当前网速，写入某节点之中
		 * @param {Object} oDom dom节点对象
		 * */
		getNetworkSpeed: function(oDom) {
			android_function.TrafficStats = plus.android.importClass("android.net.TrafficStats");
			android_function.total_data = android_function.TrafficStats.getTotalRxBytes();
			android_function.intervalId = setInterval(function() {
				getNetSpeed()
			}, 1000);
			/**
			 * 核心方法
			 */
			function getNetSpeed() {
				android_function.traffic_data = android_function.TrafficStats.getTotalRxBytes() - android_function.total_data;
				android_function.total_data = android_function.TrafficStats.getTotalRxBytes();
				oDom.value = bytesToSize(android_function.traffic_data);
				oDom.innerHTML = bytesToSize(android_function.traffic_data);
				console.log(bytesToSize(android_function.traffic_data));
			}

			//将byte自动转换为其他单位
			function bytesToSize(bytes) {
				if(bytes === 0) return '0 B/s';
				var k = 1000, // or 1024
					sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
					i = Math.floor(Math.log(bytes) / Math.log(k));
				return(bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
			}
		},
		//打开网络设置
		openNetwork: function() {
			var main = plus.android.runtimeMainActivity();
			var Intent = plus.android.importClass("android.content.Intent");
			var intent = new Intent('android.settings.WIRELESS_SETTINGS');
			main.startActivity(intent);
		},
		//打开移动网络设置（选择of2G/3G显示设置）
		openMoveNetworkSystem: function() {
			var main = plus.android.runtimeMainActivity();
			var Intent = plus.android.importClass("android.content.Intent");
			var mIntent = new Intent('android.settings.DATA_ROAMING_SETTINGS');
			main.startActivity(mIntent);
		},
		//打开定位服务设置界面（显示设置，以允许当前位置源的配置）
		openPositionSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开辅助功能设置界面（辅助功能模块的显示设置。）
		openAssistSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开添加账户界面（显示屏幕上创建一个新帐户添加帐户）
		openAddAccountSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_ADD_ACCOUNT); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开无线和网络界面（显示设置，以允许进入/退出飞行模式。）
		openAirplaneModeSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_AIRPLANE_MODE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开APN设置界面（显示设置，以允许配 置的APN。）
		openAPNSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_APN_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开开发人员选项界面（显示设置，以允许应用程序开发相关的设置配置）
		openDevelopSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_APPLICATION_DEVELOPMENT_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开应用程序列表设置界面（显示设置，以允许应用程序相关的设置配置）
		openApplicationSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_APPLICATION_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开蓝牙设置界面（显示设置，以允许蓝牙配置）
		openBluetoothSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开日期和时间设置界面（显示日期和时间设置，以允许配 置）
		openDateSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_DATE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开设备基础信息设置界面（显示一般的设备信息设置（序列号，软件版本，电话号码，等））
		openDeviceInfoSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_DEVICE_INFO_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开显示设置界面（显示设置，以允许配 置显示）
		openDisplaySystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_DISPLAY_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开语言和输入法设置界面（）
		openInputMethodSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_INPUT_METHOD_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开输入法启用和禁用设置界面（显示设置来启用/禁用输入法亚型）
		openInputMethodSubTypeSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_INPUT_METHOD_SUBTYPE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开内部存储界面设置（内部存储的显示设置）
		openStorageSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_INTERNAL_STORAGE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开语言地区设置界面（显示设置，以允许配 置的语言环境）
		openLocaleSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_LOCALE_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开应用程序管理列表设置界面（显示设置来管理所有的应用程序）
		openAllApplicationSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开已安装的应用程序列表界面（显示设置来管理安装的应用程序）(界面同上)
		open_APPLICATIONS_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_MANAGE_APPLICATIONS_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开存储卡信息界面（显示设置为存储卡存储）
		open_MEMORY_CARD_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_MEMORY_CARD_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开选择网络运营商的显示设置界面
		open_NETWORK_OPERATOR_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_NETWORK_OPERATOR_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开备份和重置界面（显示设置，以允许配 置隐私选项）
		open_PRIVACY_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_PRIVACY_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开全局搜索显示设置界面（全局搜索显示设置）
		open_SEARCH_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_SEARCH_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开允许配 置的安全性和位置隐私界面
		open_SECURITY_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_SECURITY_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开系统设置界面
		openSystem: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开配 置声音和音量的界面
		open_SOUND_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_SOUND_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开账户设置界面（显示设置，以允许配 置同步设置）
		open_SYNC_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_SYNC_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开个人字典界面（显示设置来管理用户输入字典）
		open_USER_DICTIONARY_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_USER_DICTIONARY_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开IP设置界面（显示设置，以允许配 置一个静态IP地址的Wi – Fi）
		open_WIFI_IP_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_WIFI_IP_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开WLAN配置界面（显示设置，以允许Wi – Fi配置）
		open_WIFI_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_WIFI_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//打开显示设置，以允许配 置，如Wi – Fi，蓝牙和移动网络的无线控制界面
		open_WIRELESS_System: function() {
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_WIRELESS_SETTINGS); //可设置表中所有Action字段
			main.startActivity(intent);
		},
		//调用系统通讯录
		getAddressList: function() {
			var REQUESTCODE = 1000;
			main = plus.android.runtimeMainActivity();
			var Intent = plus.android.importClass('android.content.Intent');
			var ContactsContract = plus.android.importClass('android.provider.ContactsContract');
			var intent = new Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);
			main.onActivityResult = function(requestCode, resultCode, data) {
				if(REQUESTCODE == requestCode) {
					var phoneNumber = null;
					var resultString = "";
					var context = main;
					plus.android.importClass(data);
					var contactData = data.getData();
					var resolver = context.getContentResolver();
					plus.android.importClass(resolver);
					var cursor = resolver.query(contactData, null, null, null, null);
					plus.android.importClass(cursor);
					cursor.moveToFirst();
					var s_ret;
					var givenName = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
					s_ret = givenName;
					var contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
					var pCursor = resolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
						null, ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId,
						null, null);
					while(pCursor.moveToNext()) {
						phoneNumber = pCursor.getString(pCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
						s_ret += '\n' + phoneNumber;
					}
					alert(s_ret);
					cursor.close();
					pCursor.close();
				}
			};
			main.startActivityForResult(intent, REQUESTCODE);
		},
		calId: "", //日历事件id
		calanderURL: "content://com.android.calendar/calendars", //安卓日历api
		calanderEventURL: "content://com.android.calendar/events", //安卓日历事件api
		calanderRemiderURL: "content://com.android.calendar/reminders", //安卓日历提醒api
		/**
	 * *
	 * 给日历添加事件
	 * @param {Object} oParam 配置主要参数的对象
	 * @prop {String} title 标题名称
	 * @prop {String} description 描述
	 * @prop {Number} startTimestamp 事件开始时间点（时间戳，精确到毫秒，13位数字）
	 * @prop {Number} endTimestamp 事件结束时间点（时间戳，精确到毫秒，13位数字）
	 * @prop {String} address 事件出发地点
	 * @prop {String} nLeadTime 事件提前提醒的时间值（分钟）
	 * * 实例
	 * *{
    		"title":"陆小凤创奇",
    		"description":"八月十五，决战紫禁之巅",
    		"startTimestamp":1534412521000,
    		"endTimestamp":1534473721000,
    		"address":"紫禁之巅",
    		"nLeadTime":"45"
    	}
	 * */
		Calendar_addEvent: function(oParam) {
			var Cursor = plus.android.importClass("android.database.Cursor");
			var Uri = plus.android.importClass("android.net.Uri");
			var Calendar = plus.android.importClass("java.util.Calendar");
			var main = plus.android.runtimeMainActivity();
			var userCursor = plus.android.invoke(main.getContentResolver(), "query", Uri.parse(android_function.calanderURL), null, null, null, null);
			if(plus.android.invoke(userCursor, "getCount") <= 0) {
				console.log("添加账号" + plus.android.invoke(userCursor, "getCount"));
				//初始化日历账号
				//			android_function.initCalendars(oParam);
				alert("还没添加日历账号");
			} else {
				console.log("开始插入：" + plus.android.invoke(userCursor, "getCount"));
				plus.android.invoke(userCursor, "moveToLast");
				android_function.calId = plus.android.invoke(userCursor, "getString", plus.android.invoke(userCursor, "getColumnIndex", "_id"));
				var ContentValues = plus.android.importClass("android.content.ContentValues");
				var events = new ContentValues();
				events.put("title", oParam.title); //设置事件的标题
				events.put("description", oParam.description); //设置事件的描述
				// 插入账户
				events.put("calendar_id", android_function.calId);
				events.put("eventLocation", oParam.address); //设置事件的地点
				events.put("dtstart", oParam.startTimestamp);
				events.put("dtend", oParam.endTimestamp);
				events.put("hasAlarm", "1");
				events.put("eventTimezone", "Asia/Shanghai"); // 这个是时区，必须有，
				// 添加事件  
				var newEvent = plus.android.invoke(plus.android.runtimeMainActivity().getContentResolver(), "insert", Uri.parse(android_function.calanderEventURL), events);
				// 事件提醒的设定
				var id = plus.android.invoke(newEvent, "getLastPathSegment");
				console.log(id);
				var values = new ContentValues();
				values.put("event_id", id);
				// 提前10分钟有提醒
				values.put("minutes", oParam.nLeadTime); //提前提醒是10分钟
				values.put("method", "1");
				plus.android.invoke(main.getContentResolver(), "insert", Uri.parse(android_function.calanderRemiderURL), values);
				plus.nativeUI.toast("插入事件成功，可打开本地日历查看");
			}
		},
		/**
		 * 初始化日历账号
		 * @param {Object} oParam 配置主要参数的对象
		 * @prop {String} name 真实姓名
		 * @prop {String} account_name 账号
		 * @prop {String} calendar_displayName 日历账户显示的名称
		 * */
		initCalendars: function(oParam) {
			var TimeZone = plus.android.importClass("java.util.TimeZone");
			var timeZone = TimeZone.getDefault();
			var ContentValues = plus.android.importClass("android.content.ContentValues");
			var value = new ContentValues();
			//		var Calendars = plus.android.importClass("android.provider.CalendarContract.Calendars");
			value.put("name", oParam.name);
			value.put("account_name", oParam.account_name); //日历账号
			value.put("account_type", "com.android.exchange"); //账户类型
			value.put("calendar_displayName", oParam.calendar_displayName); //日历账户显示的名称
			value.put("visible", 1);
			value.put("calendar_color", "-9206951");
			value.put("calendar_access_level", "700");
			value.put("sync_events", 1);
			value.put("calendar_timezone", plus.android.invoke(timeZone, "getID"));
			value.put("ownerAccount", oParam.account_name);
			value.put("canOrganizerRespond", 0);
			var Uri = plus.android.importClass("android.net.Uri");
			var calendarUri = Uri.parse("content://com.android.calendar/calendars");
			var buildUpon = plus.android.invoke(calendarUri, "buildUpon");
			var CalendarContract = plus.android.importClass("android.provider.CalendarContract");
			plus.android.invoke(buildUpon, "appendQueryParameter", CalendarContract.CALLER_IS_SYNCADAPTER, "true");
			plus.android.invoke(buildUpon, "appendQueryParameter", "account_name", oParam.account_name);
			plus.android.invoke(buildUpon, "appendQueryParameter", "account_type", "com.android.exchange");
			calendarUri = plus.android.invoke(buildUpon, "build");
			plus.android.invoke(plus.android.runtimeMainActivity().getContentResolver(), "insert", calendarUri, value);
			plus.nativeUI.toast("添加账号成功");
		},
		//监听手机飞行模式切换状态
		event_AIRPLANE_MODE: function() {
			var receiver;
			main = plus.android.runtimeMainActivity(); //获取activity
			receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
				onReceive: function(context, intent) { //实现onReceiver回调函数
					plus.android.importClass(intent);
					console.log(intent.getAction());
					alert("飞行模式切换：" + result.textContent);
					main.unregisterReceiver(receiver);
				}
			});
			var IntentFilter = plus.android.importClass('android.content.IntentFilter');
			var Intent = plus.android.importClass('android.content.Intent');
			var filter = new IntentFilter();
			filter.addAction(Intent.ACTION_AIRPLANE_MODE_CHANGED); //监听飞行模式
			main.registerReceiver(receiver, filter); //注册监听
		},
		/**
		 * 本地消息推送
		 * @param {Object} oParam 主要配置数据参数
		 * @prop {String} notice 手机顶部推送的文本提示
		 * @prop {String} title 推送标题
		 * @prop {String} content 推送内容
		 * @prop {Number} number 推送条数
		 * */
		localInfoPush: function(oParam) {
			var NotifyID = 1;
			var main = plus.android.runtimeMainActivity();
			var Context = plus.android.importClass("android.content.Context");
			var Noti = plus.android.importClass("android.app.Notification");
			var NotificationManager = plus.android.importClass("android.app.NotificationManager");
			var nm = main.getSystemService(Context.NOTIFICATION_SERVICE)
			var Notification = plus.android.importClass("android.app.Notification");
			var mNotification = new Notification.Builder(main);
			// 新增 810726685@qq.com 的代码
			var Intent = plus.android.importClass("android.content.Intent");
			var PendingIntent = plus.android.importClass("android.app.PendingIntent");
			var intent = new Intent(main, main.getClass());
			var pendingIntent = PendingIntent.getActivity(main, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT);
			// 新增代码
			var r = plus.android.importClass("android.R");

			mNotification.setOngoing(true);
			mNotification.setContentTitle(oParam.title)
			mNotification.setContentText(oParam.content)

			// 新增代码
			mNotification.setSmallIcon(r.drawable.ic_notification_overlay)
			mNotification.setTicker(oParam.notice)

			// 新增 810726685@qq.com 的代码
			mNotification.setContentIntent(pendingIntent);
			mNotification.setNumber(oParam.number)
			var mNb = mNotification.build()
			nm.notify(NotifyID, mNb);
			plus.device.vibrate(1000);
		},
		/**
		 * 个推消息推送（需要个推SDK权限配置好）
		 * @param {String} content 要推送的消息内容
		 * */
		pushMsg_create: function(content) {
			try {
				var options = {
					cover: false
				};
				plus.push.createMessage(content, "LocalMSG", options);
				plus.nativeUI.toast("创建本地消息成功，请到系统消息中心查看！");
				if(plus.os.name == "iOS") {
					plus.nativeUI.alert('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
				}
			} catch(e) {
				alert("还没有添加个推的SDK");
			}

		},
		//清除推送信息
		pushMsg_clear: function() {
			plus.push.clear();
		},
		/**
		 * 获取所有推送信息
		 * @return {Array}
		 * */
		pushMsg_list: function() {
			var msgs = null;
			if(plus.os.name == "Android") msgs = plus.push.getAllMessage();
			if(!msgs) plus.nativeUI.alert("此平台不支持枚举推送消息列表！");
			return msgs;
		},
		/**
		 * 判断GPS是否开启
		 * @return {Boolean}
		 * */
		getGPS_status: function() {
			var context = plus.android.importClass("android.content.Context");
			var locationManager = plus.android.importClass("android.location.LocationManager");
			var main = plus.android.runtimeMainActivity();
			var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
			return mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
		},
		/**
		 * 修改系统壁纸
		 * @param {String} imgPath 本地图片路劲
		 * */
		updateWallpaper: function(imgPath) {
			var WallpaperManager = plus.android.importClass("android.app.WallpaperManager");
			//获取应用主activity实例对象
			var Main = plus.android.runtimeMainActivity();
			var wallpaperManager = WallpaperManager.getInstance(Main);
			plus.android.importClass(wallpaperManager);
			var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
			var url = imgPath; // 换成要设置的壁纸图片路径

			//将本地URL路径转换成平台绝对路径,如url为“_doc/a.png”
			var path = plus.io.convertLocalFileSystemURL(url);
			//解析图片文件并创建对应的Bitmap对象
			var bitmap = BitmapFactory.decodeFile(path);
			try {
				wallpaperManager.setBitmap(bitmap); //设置壁纸
				bitmap.recycle(); // 设置完毕桌面要进行 原生层的BITMAP回收 减少内存压力

			} catch(e) {
				//TODO handle the exception
				alert(e);
			}
		},
		/**
		 * 录制视频
		 * @param {Number} nTime 设置录像时间
		 * */
		videoRecording: function(nTime) {
			// 调用原生android摄像头
			var VIDEOZOOM = 200;
			var MediaStore = plus.android.importClass("android.provider.MediaStore");
			var Intent = plus.android.importClass("android.content.Intent");
			// 导入后可以使用new方法创建类的示例对象
			var intent = new Intent("android.media.action.VIDEO_CAPTURE");
			intent.putExtra("android.intent.extra.videoQuality", 1); //0 means low quality, 1 means high quality
			//intent.putExtra("android.provider.MediaStore.EXTRA_OUTPUT", url);
			intent.putExtra("android.intent.extra.durationLimit", nTime); //设置录像时间

			var main = plus.android.runtimeMainActivity();
			main.startActivityForResult(intent, VIDEOZOOM);
			//获取返回参数
			main.onActivityResult = function(requestCode, resultCode, data) {
				var context = main;
				plus.android.importClass(data);
				var uri = data.getData();
				var resolver = context.getContentResolver();
				plus.android.importClass(resolver);
				var cursor = resolver.query(uri, null, null, null, null);
				plus.android.importClass(cursor);
				cursor.moveToFirst();
				var column = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATA);
				// 获取录制的视频路径
				var filePath = cursor.getString(column);

				// 解析视频文件的属性
				plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
					entry.file(function(file) {
						console.log("size==" + file.size);
						console.log("name==" + file.name);
					});
				}, function(e) {
					console.log("Resolve file URL failed: " + e.message);
				});
			};
		},
		//按返回键退出应用
		toBack:function(){
			if(plus.os.name == "Android") {
				//监听安卓返回键退出
				var first = null;
				mui.back = function() {
					if(!first) {
						first = new Date().getTime();
						plus.nativeUI.toast("再按一次退出应用");
						setTimeout(function() {
							first = null;
						}, 1000);
					} else {
						if(new Date().getTime() - first < 1000) {
							plus.runtime.quit();
						}
					}
				};
			}
		}
	};
} catch(e) {
	alert("功能方法只是在android手机上有效");
}
/**
 * @author 肖浩彬
 * @description iosNJS API，ios可用
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

try {
	var ios_function = {
		/**
		 * 调用ios的文字转语音
		 * @param {String} text 要转换为语音的文字字段
		 * */
		textToVoice: function(text) {
			// 扩展API加载完毕，现在可以正常调用扩展API			
			var AVSpeechSynthesizer = plus.ios.importClass("AVSpeechSynthesizer");
			var sppech = new AVSpeechSynthesizer();
			var AVSpeechUtterance = plus.ios.importClass("AVSpeechUtterance");
			var utterance = AVSpeechUtterance.speechUtteranceWithString(text);
			// 设置语速
			utterance.plusSetAttribute("rate", 30.1);
			sppech.speakUtterance(utterance);
		},
		//获取包名
		getPackageName: function() {
			var NSBundle = plus.ios.importClass('NSBundle');
			var bundle = NSBundle.mainBundle();
			plus.ios.deleteObject(bundle);
			return bundle.bundleIdentifier();
		},
		//获取设备名称
		getDeviceName: function() {
			var UIDevice = plus.ios.importClass("UIDevice");
			var currentDevice = UIDevice.currentDevice();
			plus.ios.deleteObject(currentDevice);
			return currentDevice.name();
		},
		/**
		 * 连接打印机打印图片
		 * @param {String} sUrl app图片路径（平台路径），如，_www/img/1080X1882.png
		 * @param {String} imgName 图片名称
		 * @param {Number} nType 打印出来的照片类型；其他值，彩色，有边缘；1，彩色，无边缘；2黑白，右边缘；3黑白，无边缘	
		 * */
		pirntImage: function(sUrl, imgName, nType) {
			var UIPrintInteractionController = plus.ios.import('UIPrintInteractionController');
			var UIPrintInfo = plus.ios.import("UIPrintInfo");
			var NSURL = plus.ios.import("NSURL");

			//url字符串仅仅用来示例，可以使用plus.io获取
			var url = NSURL.fileURLWithPath(plus.io.convertLocalFileSystemURL(sUrl));
			if(UIPrintInteractionController.canPrintURL(url)) {
				var printInfo = UIPrintInfo.printInfo();
				printInfo.setJobName(imgName);
				printInfo.setOutputType(nType);
				var printInteractionController = UIPrintInteractionController.sharedPrintController()
				printInteractionController.setPrintInfo(printInfo);
				printInteractionController.setShowsNumberOfCopies(false);
				printInteractionController.setPrintingItem(url);
				printInteractionController.presentAnimatedcompletionHandler(true, null);
			} else {
				plus.nativeUI.alert("文件不支持打印");
			}
		},
		/**
		 * 强制打开软键盘，并且指定某个DOM节点获取到焦点
		 * @param {Object} obj 指定获取到焦点的某个DOM节点对象
		 * */
		popupKeyboard: function(obj) {
			setTimeout(function() {
				var webView = plus.webview.currentWebview().nativeInstanceObject();
				webView.plusCallMethod({
					"setKeyboardDisplayRequiresUserAction": false
				});
			}, 200);
			obj.focus();
		},
		/**
		 * 把base64数据保存为图片
		 * @param {String} base64 base64图片数据
		 * @param {String} sSaveUrl 把base64数据保存为图片的地址 _doc或者_download开头,如，_doc/test.jpg
		 * */
		base64_to_image: function(base64, sSaveUrl) {
			var NSData = plus.ios.importClass('NSData');
			var nsData = new NSData();
			var path = plus.io.convertLocalFileSystemURL(sSaveUrl);
			//此处传入image的base64数据
			nsData = nsData.initWithBase64EncodedStringoptions(base64, 0);
			if(nsData) {
				nsData.plusCallMethod({
					writeToFile: path,
					atomically: true
				});
				plus.ios.deleteObject(nsData);
				mui.toast("base64数据转换为图片了")
			}
		},
		/**
		 * 判断app有木有开启消息提示
		 * @return {Number} 是否有没有开启消息提示，0为有，1为无
		 * */
		hasNotice: function() {
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();
			var enabledTypes = 0;
			if(app.currentUserNotificationSettings) {
				var settings = app.currentUserNotificationSettings();
				enabledTypes = settings.plusGetAttribute("types");
			} else {
				//针对低版本ios系统
				enabledTypes = app.enabledRemoteNotificationTypes();
			}

			plus.ios.deleteObject(app);

			if(0 == enabledTypes) {
				mui.toast("app还没有开启消息提示");
				return 1;
			} else {
				mui.toast("app已开启消息提示");
				return 0;
			}
		},
		/**
		 * 获取时区id
		 * @return {String} 返回时区字段
		 * */
		getTimezone: function() {
			var NSTimeZone = plus.ios.importClass("NSTimeZone");
			var sys = NSTimeZone.systemTimeZone();
			return sys.plusGetAttribute("name");
		},
		/**
		 * 屏幕右上角状态栏显示网络请求雪花小图标
		 * @param {Boolean} b true为显示，false为隐藏图标
		 * */
		showRequestIcon: function(b) {
			var UIApplication = plus.ios.import("UIApplication");
			var sharedApplication = UIApplication.sharedApplication();
			sharedApplication.setNetworkActivityIndicatorVisible(b);
			plus.ios.deleteObject(sharedApplication);
		},
		/**
		 * 获取手机存储空间（单位：g）
		 * @param {Number} nType 获取手机的存储，0为全部存储，其他值为剩余存储
		 * @return {Number} 存储量数字（单位：g）
		 * */
		getDeviceStorage: function(nType) {
			var BundleClass = plus.ios.importClass("NSBundle");
			var BundleObj = BundleClass.mainBundle();
			var filenamagerobj = plus.ios.newObject("NSFileManager");
			var FileAttr = plus.ios.invoke(filenamagerobj, "attributesOfFileSystemForPath:error:", BundleObj.bundlePath(), null);
			// NSFileSystemFreeSize 参数获取剩余空间
			// NSFileSystemSize  获取手机总存储空间
			var type = (nType == 0 ? "NSFileSystemSize" : "NSFileSystemFreeSize");
			var freeSpace = plus.ios.invoke(FileAttr, "objectForKey:", type);
			var numberFormatterObj = plus.ios.newObject("NSNumberFormatter");
			var FreeSpaceStr = plus.ios.invoke(numberFormatterObj, "stringFromNumber:", freeSpace);
			var freeSpace = FreeSpaceStr / 1024 / 1024 / 1024;
			return freeSpace;
		},
		/**
		 * 打开闪光灯
		 * @param {Boolean} isOn true打开闪光灯，false关闭闪光灯
		 * */
		flashlight: function(isOn) {
			if(plus.os.name == "iOS") {
				var avcaptClass = plus.ios.importClass("AVCaptureDevice");
				if(avcaptClass) {
					var device = avcaptClass.defaultDeviceWithMediaType("vide");
					plus.ios.invoke(device, "lockForConfiguration:", null);
					if(isOn) {
						plus.ios.invoke(device, "setTorchMode:", 1);
						plus.ios.invoke(device, "setFlashMode:", 1);
					} else {
						plus.ios.invoke(device, "setTorchMode:", 0);
						plus.ios.invoke(device, "setFlashMode:", 0);
					}
					plus.ios.invoke(device, "unlockForConfiguration");
				}
			}
		}
	};
} catch(e) {
	alert("功能方法只是在ios手机上有效");
}
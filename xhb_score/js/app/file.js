/**
 * @author 肖浩彬
 * @description android的wifi的 NJS API，android可使用
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


window.FileManage = function() {
	this.init();
}

/**  * 初始化  */
FileManage.prototype.init = function() {
	//导入java类
	var environment = plus.android.importClass("android.os.Environment");
	//判断SD卡是否插入(涉及到SDK的读取，最好先判断SDK是否插入)
	if(environment.getExternalStorageState() === environment.MEDIA_MOUNTED){
		//获得sd卡根目录
		this.sdRoot = environment.getExternalStorageDirectory();
		this.files = plus.android.invoke(this.sdRoot,"listFiles");
		//.过滤系统隐藏文件
	}
	else{
		plus.nativeUI.alert("请插入SD卡");
	}

}

/**
 * 隐藏文件进行操作
 * @param {Boolean} isDirectory 是否文件夹，true为文件夹
 * @return {Array}
 * */
FileManage.prototype.isHidden_todo = function(isDirectory){
	var aRes = [];
	var len = this.files.length;
	for(var i=0; i<len; i++){
	    var file = this.files[i];
	    // 过滤隐藏文件
	    if(plus.android.invoke(file,"isHidden")){
			if(isDirectory){
				if(plus.android.invoke(file,"isDirectory")){
					aRes.push({
						"name":plus.android.invoke(file,"getName"),
//						"size":this.getSize(file),
						"filePath":this.sdRoot + "/" + plus.android.invoke(file,"getName")
					});
				}
			}else{
				if(!plus.android.invoke(file,"isDirectory")){
					aRes.push({
						"name":plus.android.invoke(file,"getName"),
						"size":this.getSize(file),
						"filePath":this.sdRoot + "/" + plus.android.invoke(file,"getName")
					});
				}
			}
	    }
	}
	return aRes;
}

/**
 * 对非隐藏文件进行操作
 * @param {Boolean} isDirectory 是否文件夹，true为文件夹
 * @return {Array} 返回根目录下的文件信息
 * 
 * */
FileManage.prototype.noHidden_todo = function(isDirectory){
	var aRes = [];
	var len = this.files.length;
	for(var i=0; i<len; i++){
	    var file = this.files[i];
	    if(!plus.android.invoke(file,"isHidden")){
			if(isDirectory){
				if(plus.android.invoke(file,"isDirectory")){
					aRes.push({
						"name":plus.android.invoke(file,"getName"),
//						"size":this.getSize(file),
						"filePath":this.sdRoot + "/" + plus.android.invoke(file,"getName")
					});
					
				}
			}else{
				if(!plus.android.invoke(file,"isDirectory")){
					aRes.push({
						"name":plus.android.invoke(file,"getName"),
						"size":this.getSize(file),
						"filePath":this.sdRoot + "/" + plus.android.invoke(file,"getName")
					});
				}
			}
			
	    }
	}
	return aRes;
}

/**
 * 判断文件大小及单位转换
 * @param {Object} file 文件对象
 * */
FileManage.prototype.getSize = function(file){
	// 读文件大小
	var FileInputStream = plus.android.importClass("java.io.FileInputStream");
	var fileSize = new FileInputStream(file);
	var size = fileSize.available();
	// 单位转换
	var fileSizeString;
	if(size == 0){
	    fileSizeString = "0B";
	}else if(size < 1024){
	    fileSizeString = size + "B";
	}else if(size < 1048576){
	    fileSizeString = (size/1024).toFixed(2) + "KB";
	}else if (size < 1073741824){
	    fileSizeString = (size/1048576).toFixed(2) + "MB";
	}else{
	    fileSizeString = (size/1073741824).toFixed(2) + "GB";
	}
	return fileSizeString;
}

/**
 * 创建文件夹
 * @param {String} name 文件夹名
 * @param {String} path 指定目录（如根目录）
 * */
FileManage.prototype.createFolder = function(path,name){
	var File = plus.android.importClass("java.io.File");
    var fd = new File(path + "/" + name);
    if(!fd.exists()){
        fd.mkdirs();
        plus.nativeUI.toast("创建成功");
    }
}

/**
 * 删除文件
 * @param {String} path 文件的路劲
 * */
FileManage.prototype.deleteFile = function(path){
	var File = plus.android.importClass("java.io.File");
    var fd = new File(path);
    if (fd != null && fd.exists()){
        fd.delete();
        plus.nativeUI.toast("删除成功");
    }   
}

/**
 * 打开文件
 * @param {String} filepath 指定文件目录，如/js/app/file.js
 * */
FileManage.prototype.openFile = function(filepath){
	 plus.runtime.openFile(filepath);
}

//返回根目录路径
FileManage.prototype.getSdRoot = function(){
	return this.sdRoot;
}

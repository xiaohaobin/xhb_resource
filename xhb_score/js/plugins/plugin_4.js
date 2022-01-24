/**
 * @author xhb
 * @version 4.0
 * @description 插件版本  构造函数写法
 * */
;
(function(undefined) {
	"use strict"
	var _global;

	function result(args, type) {
		var argsArr = Array.prototype.slice.call(args);
		if(argsArr.length == 0) return 0;
		switch(type) {
			case 1:
				return argsArr.reduce(function(p, c) {
					return p + c;
				});
			case 2:
				return argsArr.reduce(function(p, c) {
					return p - c;
				});
			case 3:
				return argsArr.reduce(function(p, c) {
					return p * c;
				});
			case 4:
				return argsArr.reduce(function(p, c) {
					return p / c;
				});
			case 5:
				return argsArr.reduce(function(p, c) {
					return p % c;
				});
			default:
				return 0;
		}
	}

	//主要函数体
	function Calculate() {}

	//构建方法
	Calculate.prototype.add = function() {
		console.log(result(arguments, 1));
		return this;
	}
	Calculate.prototype.sub = function() {
		console.log(result(arguments, 2));
		return this;
	}
	Calculate.prototype.mul = function() {
		console.log(result(arguments, 3));
		return this;
	}
	Calculate.prototype.div = function() {
		console.log(result(arguments, 4));
		return this;
	}
	Calculate.prototype.sur = function() {
		console.log(result(arguments, 5));
		return this;
	}

	// 最后将插件对象暴露给全局对象
	_global = (function() {
		return this || (0, eval)('this');
	}());
	if(typeof module !== "undefined" && module.exports) {
		module.exports = Calculate;
	} else if(typeof define === "function" && define.amd) {
		define(function() {
			return Calculate;
		});
	} else {
		!('Calculate' in _global) && (_global.Calculate = Calculate);
	}
}());
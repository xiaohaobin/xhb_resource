/**
 * @author xhb
 * @version 2.0
 * @description 插件版本2 插件的模块化使用
 * */
;(function(undefined) {
    var _global;
    var plugins = {
        add: function(n1,n2){ return n1 + n2; },//加
        sub: function(n1,n2){ return n1 - n2; },//减
        mul: function(n1,n2){ return n1 * n2; },//乘
        div: function(n1,n2){ return n1 / n2; },//除
        sur: function(n1,n2){ return n1 % n2; } //余
    }
    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = plugins;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return plugins;});
    } else {
        !('plugins' in _global) && (_global.plugins = plugins);
    }
}());

/**
 调用可以以下两种：
 with(plugins)
{
	console.log(add(2, 1)) // 3
	console.log(sub(2, 1)) // 1
	console.log(mul(2, 1)) // 2
	console.log(div(2, 1)) // 2
	console.log(sur(2, 1)) // 0
}
			
console.log(plugins.div(10,2));
 * */
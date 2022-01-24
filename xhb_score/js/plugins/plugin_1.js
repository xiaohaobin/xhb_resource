/**
 * @author xhb
 * @version 1.0
 * @description 插件版本1  插件的基础使用
 * */
;(function(global,undefined){
	var _global;
	var plugin = {
		add: function(n1,n2){ return n1 + n2; },//加
        sub: function(n1,n2){ return n1 - n2; },//减
        mul: function(n1,n2){ return n1 * n2; },//乘
        div: function(n1,n2){ return n1 / n2; },//除
        sur: function(n1,n2){ return n1 % n2; } //余
	};
	 // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    !('plugin' in _global) && (_global.plugin = plugin);
})(window);

;(function(global,undefined){
	var _global;
	var plugin = {
		sub:function(a,b){
			return a - b;
		}
	};
	 // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    !('plugin' in _global) && (_global.plugin = plugin);
})(window);

//调用:plugin.add(a,b)

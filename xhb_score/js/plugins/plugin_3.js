/**
 * @author xhb
 * @version 3.0
 * @description 插件版本3  插件的方法的默认值设置
 * */
;(function(undefined) {
    var _global;

    function result(args,fn){
        var argsArr = Array.prototype.slice.call(args);
        if(argsArr.length > 0){
            return argsArr.reduce(fn);
        } else {
            return 0;
        }
    }
    //主要函数对象
    var plugin_3 = {
        add: function(){
            return result(arguments,function(pre,cur){
                return pre + cur;
            });
        },//加
        sub: function(){
            return result(arguments,function(pre,cur){
                return pre - cur;
            });
        },//减
        mul: function(){
            return result(arguments,function(pre,cur){
                return pre * cur;
            });
        },//乘
        div: function(){
            return result(arguments,function(pre,cur){
                return pre / cur;
            });
        },//除
        sur: function(){
            return result(arguments,function(pre,cur){
                return pre % cur;
            });
        } //余
    }

    // 最后将插件对象暴露给全局对象
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = plugin_3;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return plugin_3;});
    } else {
        !('plugin_3' in _global) && (_global.plugin_3 = plugin_3);
    }
}());
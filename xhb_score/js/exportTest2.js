//  export function xhbTest(){
// 	return "1"
// }
//  export function xhbTest2(){
// 	return "1"
// }

// ;(function (root, factory) {
//   if (typeof exports === "object") {
//     module.exports = factory();
//   } else if (typeof define === "function" && define.amd) {
//     define([], factory);
//   } else {
//     root.ol = factory();
//   }
// }(this,function () {
// 　　// ...  这里编写你的代码
// 　　return {
// 		xhbTest:function(){return "1"},
// 		xhbTest2:function(){return "1"},
//    };
// }))

"use strict";
(function(exports, undefined) {
    var ns = exports.Best = exports.Best || {};
    
    /***************************/
    /********** Game **********/
    /***************************/
    var Game = ns.Game = function(options) {
        for (var p in options) {
            this[p] = options[p]
        }
    };
    Game.prototype = {};

    /***************************/
    /********** Scene **********/
    /***************************/
    var Scene = ns.Scene = function(options) {
        for (var p in options) {
            this[p] = options[p]
        }
    };
    Scene.prototype = {};
})(this);
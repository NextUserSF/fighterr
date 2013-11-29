/*! fighterr 2013-11-29*/
"undefined"==typeof F&&(F=FightErr=function(){"use strict";F.log.apply(F,F.argToArr(arguments))},"undefined"!=typeof window&&(window.F=window.FightErr=FightErr),"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=FightErr)),function(a){"use strict";var b="function",c={},d="undefined"!=typeof window&&!!window.chrome,e="undefined"!=typeof window&&window.printStackTrace?window.printStackTrace:!1,f=!!console;a.fn=function(b,c,d){if(!a.isFn(c))throw a.e(b,d,"function",typeof c,c)},a.arr=function(b,c,d){if(!a.isArr(c))throw a.e(b,d,"Array",typeof c,c)},a.str=function(b,c,d){if(!a.isStr(c))throw a.e(b,d,"string",typeof c,c)},a.num=function(b,c,d){if(!a.isNum(c))throw a.e(b,d,"number",typeof c,c)},a.bool=function(b,c,d){if(!a.isBool(c))throw a.e(b,d,"boolean",typeof c,c)},a.obj=function(b,c,d){if(!a.isObj(c))throw a.e(b,d,"object",typeof c,c)},a.udef=function(b,c,d){if(!a.isUdef(c))throw a.e(b,d,"undefined",typeof c,c)},a.def=function(b,c,d){if(!a.isDef(c))throw a.e(b,d,"any defined value",typeof c,c)},a.inst=function(b,c,d,e){if(!a.isInst(c,d))throw a.e(b,e,"instance of "+a.toStr(c),c&&c.constructor?c.constructor.name:a.toStr(c),c)},a.truthy=function(b,c,d){if(!c)throw a.e(b,d,"truthy",!a.toBool(c),c)},a.falsy=function(b,c,d){if(c)throw a.e(b,d,"falsy",!!a.toBool(c),c)},a.isFn=function(a){return"[object Function]"===c.toString.call(a)},a.isArr=function(a){return"[object Array]"===c.toString.call(a)},a.isBool=function(a){return"boolean"==typeof a},a.isStr=function(a){return"string"==typeof a},a.isObj=function(a){return"object"==typeof a&&!!a&&a.constructor===c.constructor},a.isUdef=function(a){return"undefined"==typeof a},a.isDef=function(a){return"undefined"!=typeof a},a.isNum=function(a){return("number"==typeof a||"[object Number]"===c.toString.call(a))&&!isNaN(a)},a.isInt=function(b){return a.isNum(b)&&b%1===0},a.isFloat=function(b){return a.isNum(b)&&b%1!==0},a.isInst=function(a,b){try{return a instanceof b}catch(c){}return!1},a.isNone=function(b){return null===b||a.isUdef(b)},a.isNotNone=function(b){return null!==b&&a.isDef(b)},a.implement=function(b,c){var d,e;if(a.arr("interfazz",c,"F.implement"),e=c.length,a.isNone(b))return!1;for(d=0;e>d;d+=1)if(!a.isFn(b[c[d]]))return!1;return!0},a.pInt=function(a,b){return a=parseInt(a,10),isNaN(a)?b||0:a},a.pFloat=function(a,b){return a=parseFloat(a),isNaN(a)?b||0:a},a.toStr=function(c,d){return null===c||a.isUdef(c)?d||"":typeof c.toString===b?c.toString()||d||"":(c=String+c,!c&&d?d:c)},a.toString=function(b,c){return a.toStr(b,c)},a.toArr=function(b,c){return a.isArr(b)?b:a.isArr(c)?c:[]},a.toBool=function(a){return a===!0?a:!1},a.range=function(b,c,d,e){if(!a.isNum(b))return a.isNum(e)?e:0;if(a.num("min",c,"F.range"),a.num("max",d,"F.range"),c>d)throw new Error("F.range: Min value must be less than max value");if(c>b){if(a.isNum(e))return e;b=c}else if(b>d){if(a.isNum(e))return e;b=d}return b},a.len=function(b){return a.isArr(b)||b&&b.hasOwnProperty("length")?b.length:0},a.argToArr=function(a){return a?Array.prototype.slice.call(a):[]},a.error=function(a){throw new Error("[ERROR] "+a)},a.log=function(){if(f){var b=a.argToArr(arguments);d?(b.unshift("font-weight:bold;color: #55E;"),b.unshift("%c[DEBUG]")):b.unshift("[DEBUG]"),console.log.apply(console,b)}},a.notice=function(){a.log.apply(a,a.argToArr(arguments))},a.warn=function(){if(f){var b=a.argToArr(arguments);d?(b.unshift("font-weight:bold;color: #f3a600;"),b.unshift("%c[WARNING]")):b.unshift("[WARNING]"),b.push("\n"+a.stackTraceCleanup(e({guess:!1}))[0].split(" ")[0]),console.warn.apply(console,b)}},a.deprecated=function(b,c,g){if(f){var h=a.argToArr(arguments),i='"'+b+'" is deprecated '+(c?'in favor of "'+c+'"':" without any replacement suggested")+".\n"+(g?"Message: "+g+"\n":"");h.shift(),h.shift(),d?(h.unshift("font-weight:bold;color: #f3a600;"),h.unshift("%c[DEPRECATED]")):h.unshift("[DEPRECATED]"),h.unshift(i),h.push(a.stackTraceCleanup(e({guess:!1})).join("\n")),console.warn.apply(console,h)}},a.assert=function(b,c,d){if(!b){if(!d)throw new Error("[FAILURE] "+(c||""));a.log("[FAILURE] "+c)}},a.e=function(b,c,d,f,g){return a.warn("Illegal argument type error: Argument "+b+" of function ["+c+"] should be ["+d+"] but is ["+f+"]. Argument value: ",g),e&&a.warn(a.stackTraceCleanup(e())),new TypeError("Illegal argument error")},a.stackTraceCleanup=function(a){for(;a.length>0&&(a[0].indexOf("printStackTrace")>-1||a[0].indexOf("F.deprecated")>-1||a[0].indexOf("F.warn")>-1);)a.shift();return a}}(FightErr);
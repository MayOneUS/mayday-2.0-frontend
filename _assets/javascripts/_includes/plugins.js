function getParameterByName( name ) {
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);

  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


/**
 * matches US phone number format
 *
 * where the area code may not start with 1 and the prefix may not start with 1
 * allows '-' or ' ' as a separator and allows parens around area code
 * some people may want to put a '1' in front of their number
 *
 * 1(212)-999-2345 or
 * 212 999 2344 or
 * 212-999-0983
 *
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
$.validator.addMethod("phoneUS", function(phone_number, element) {
  phone_number = phone_number.replace(/\s+/g, "");
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
}, "Please specify a valid phone number");

/*!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,
"\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie=
[c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1}));
return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});

/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.4.5
 */
!function(e,r){if("function"==typeof define&&define.amd)define(["exports","jquery"],function(e,i){return r(e,i)});else if("undefined"!=typeof exports){var i=require("jquery");r(exports,i)}else r(e,e.jQuery||e.Zepto||e.ender||e.$)}(this,function(e,r){function i(e,i){function n(e,r,i){return e[r]=i,e}function a(e,r){for(var i,a=e.match(t.key);void 0!==(i=a.pop());)if(t.push.test(i)){var o=s(e.replace(/\[\]$/,""));r=n([],o,r)}else t.fixed.test(i)?r=n([],i,r):t.named.test(i)&&(r=n({},i,r));return r}function s(e){return void 0===h[e]&&(h[e]=0),h[e]++}function o(e){switch(r('[name="'+e.name+'"]',i).attr("type")){case"checkbox":return"on"===e.value?!0:e.value;default:return e.value}}function u(r){if(!t.validate.test(r.name))return this;var i=a(r.name,o(r));return c=e.extend(!0,c,i),this}function f(r){if(!e.isArray(r))throw new Error("formSerializer.addPairs expects an Array");for(var i=0,t=r.length;t>i;i++)this.addPair(r[i]);return this}function d(){return c}function l(){return JSON.stringify(d())}var c={},h={};this.addPair=u,this.addPairs=f,this.serialize=d,this.serializeJSON=l}var t={validate:/^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,key:/[a-z0-9_]+|(?=\[\])/gi,push:/^$/,fixed:/^\d+$/,named:/^[a-z0-9_]+$/i};return i.patterns=t,i.serializeObject=function(){return this.length>1?new Error("jquery-serialize-object can only serialize one form at a time"):new i(r,this).addPairs(this.serializeArray()).serialize()},i.serializeJSON=function(){return this.length>1?new Error("jquery-serialize-object can only serialize one form at a time"):new i(r,this).addPairs(this.serializeArray()).serializeJSON()},"undefined"!=typeof r.fn&&(r.fn.serializeObject=i.serializeObject,r.fn.serializeJSON=i.serializeJSON),e.FormSerializer=i,i});

/*
 * jQuery StickyForms Plugin
 * Author: Ryan Schwartz
 * Version: 1.0.1 (15-FEB-2014)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-3.0-standalone.html
 */
(function(d){var g={init:function(b){return this.each(function(){function f(a){s=window.location.search;s=s.replace(/\+/g," ");return a=(a=(new RegExp("(\\?|&){1}"+a+"=([^&#]*)","i")).exec(s))?a[2]:""}var c={debug:"false",elementTypes:"all",cookieLifetime:"60",disableOnSubmit:"true",excludeElementIDs:"",scope:"global",disableIfGetSet:""};b&&d.extend(c,b);d(this).data("SFSettings",c);if(""!=c.disableIfGetSet&&""!=f(c.disableIfGetSet))return this;d(this).bind("submit",function(){d(this).StickyForm("process")});
d(this).StickyForm("autoload");return this})},process:function(){return this.each(function(){var b=d(this).data("SFSettings");"true"==b.disableOnSubmit&&d("#"+this.id+" input[type=submit]").attr("disabled","disabled");var f=b.cookieLifetime,f=new Date((new Date).getTime()+864E5*f);"true"==b.debug&&alert("Cookie expiration: "+f);for(var c=this.length,a=0;a<c;a++)if(-1==b.excludeElementIDs.indexOf(this[a].id)&&(-1!=b.elementTypes.indexOf(this[a].type)||"all"==b.elementTypes)&&"button"!=this[a].type&&
"submit"!=this[a].type&&"hidden"!=this[a].type){if("text"==this[a].type||"select-one"==this[a].type||"textarea"==this[a].type||"password"==this[a].type||"select-multiple"==this[a].type)var e=d(this[a]).val();else if("checkbox"==this[a].type||"radio"==this[a].type)e=this[a].checked;"true"==b.debug&&alert("Saving value: ("+this[a].type+") ["+b.scope+"] "+this[a].id+": "+e);var h=f;document.cookie="StickyForm_"+this[a].id+"="+escape(this.id+"||"+b.scope+"||"+this[a].type+"||"+this[a].id+"||"+e)+"; path=/"+
(null==h?"":"; expires="+h.toGMTString())}"true"==b.disableOnSubmit&&d("#"+this.id+" input[type=submit]").attr("disabled",!1);return this})},autoload:function(){return this.each(function(){function b(a){a+="=";var b=document.cookie;return 0<b.length&&(begin=b.indexOf(a),-1!=begin)?(begin+=a.length,end=b.indexOf(";",begin),-1==end&&(end=b.length),unescape(b.substring(begin,end))):null}for(var f=this.length,c=0;c<f;c++){var a=b("StickyForm_"+this[c].id);if(null!=a){var e=a.split("||"),h=e[0],a=e[4];
if("global"==e[1]||this.id==h){if("text"==this[c].type||"select-one"==this[c].type||"select-multiple"==this[c].type||"textarea"==this[c].type||"password"==this[c].type)this[c].value=a;if("select-multiple"==this[c].type&&"null"!=a){var e=a.split(","),g="#"+d(this[c]).attr("id");d(e).each(function(){d(g+" option[value="+this+"]").attr("selected","selected")})}"checkbox"!=this[c].type&&"radio"!=this[c].type||"true"!=a||(this[c].checked="true")}}}return this})}};d.fn.StickyForm=function(b){if(g[b])return g[b].apply(this,
Array.prototype.slice.call(arguments,1));if("object"!==typeof b&&b)d.error("Method "+b+" does not exist");else return g.init.apply(this,arguments)}})(jQuery);
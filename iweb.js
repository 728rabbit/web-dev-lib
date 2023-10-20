/* jQuery form plugin */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url +=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.closest("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/* scrollbar */
!function(l,e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof exports?module.exports=e(require("jquery")):e(jQuery)}(0,function(l){"use strict";var e={data:{index:0,name:"iscroll"},firefox:/firefox/i.test(navigator.userAgent),macosx:/mac/i.test(navigator.platform),msedge:/edge\/\d+/i.test(navigator.userAgent),msie:/(msie|trident)/i.test(navigator.userAgent),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};e.scrolls.add=function(l){this.remove(l).push(l)},e.scrolls.remove=function(e){for(;l.inArray(e,this)>=0;)this.splice(l.inArray(e,this),1);return this};var s={mode:"outer",autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,isRtl:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onFallback:null,onInit:null,onScroll:null,onUpdate:null},o=function(o){var i;e.scroll||(e.overlay=!((i=c(!0)).height||i.width),e.scroll=c(),n(),l(window).resize(function(){var l=!1;if(e.scroll&&(e.scroll.height||e.scroll.width)){var s=c();s.height===e.scroll.height&&s.width===e.scroll.width||(e.scroll=s,l=!0)}n(l)})),this.container=o,this.namespace=".iscroll-"+e.data.index++,this.options=l.extend({},s,window.jQueryiscrollOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},o.data(e.data.name,this),e.scrolls.add(this)};o.prototype={destroy:function(){if(this.wrapper){this.container.removeData(e.data.name),e.scrolls.remove(this);var s=this.container.scrollLeft(),o=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("iscroll-content iscroll-scrollx-visible iscroll-visible").off(this.namespace).scrollLeft(s).scrollTop(o),this.scrollx.scroll.removeClass("iscroll-scrollx-visible").find("div").addBack().off(this.namespace),this.scrolly.scroll.removeClass("iscroll-visible").find("div").addBack().off(this.namespace),this.wrapper.remove(),l(document).add("body").off(this.namespace),l.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(s){var o=this,i=this.container,r=this.containerWrapper||i,t=this.namespace,n=l.extend(this.options,s||{}),c={x:this.scrollx,y:this.scrolly},d=this.wrapper,h={},u={scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop()};if(e.mobile&&n.ignoreMobile||e.overlay&&n.ignoreOverlay||e.macosx&&!e.webkit)return l.isFunction(n.onFallback)&&n.onFallback.apply(this,[i]),!1;if(d)(h={height:"auto","margin-bottom":-1*e.scroll.height+"px","max-height":""})[n.isRtl?"margin-left":"margin-right"]=-1*e.scroll.width+"px",r.css(h);else{var f=i.attr("class");if(this.wrapper=d=l("<div>").addClass(f).addClass("iscroll").addClass("iscroll-"+n.mode).css("position","absolute"===i.css("position")?"absolute":"relative").insertBefore(i).append(i),n.isRtl&&d.addClass("iscroll-rtl"),i.is("textarea")&&(this.containerWrapper=r=l("<div>").insertBefore(i).append(i),d.addClass("iscroll-textarea")),(h={height:"auto","margin-bottom":-1*e.scroll.height+"px","max-height":""})[n.isRtl?"margin-left":"margin-right"]=-1*e.scroll.width+"px",r.removeClass(f).addClass("iscroll-content").css(h),i.on("scroll"+t,function(s){var r=i.scrollLeft(),t=i.scrollTop();if(n.isRtl)switch(!0){case e.firefox:r=Math.abs(r);case e.msedge||e.msie:r=i[0].scrollWidth-i[0].clientWidth-r}l.isFunction(n.onScroll)&&n.onScroll.call(o,{maxScroll:c.y.maxScrollOffset,scroll:t,size:c.y.size,visible:c.y.visible},{maxScroll:c.x.maxScrollOffset,scroll:r,size:c.x.size,visible:c.x.visible}),c.x.isVisible&&c.x.scroll.bar.css("left",r*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",t*c.y.kx+"px")}),d.on("scroll"+t,function(){d.scrollTop(0).scrollLeft(0)}),n.disableBodyScroll){var p=function(l){a(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l)};d.on("MozMousePixelScroll"+t,p),d.on("mousewheel"+t,p),e.mobile&&d.on("touchstart"+t,function(e){var s=e.originalEvent.touches&&e.originalEvent.touches[0]||e,o=s.pageX,r=s.pageY,n=i.scrollLeft(),c=i.scrollTop();l(document).on("touchmove"+t,function(l){var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;i.scrollLeft(n+o-e.pageX),i.scrollTop(c+r-e.pageY),l.preventDefault()}),l(document).on("touchend"+t,function(){l(document).off(t)})})}l.isFunction(n.onInit)&&n.onInit.apply(this,[i])}l.each(c,function(s,r){var d=null,h=1,u="x"===s?"scrollLeft":"scrollTop",f=n.scrollStep,p=function(){var l=i[u]();i[u](l+f),1==h&&l+f>=v&&(l=i[u]()),-1==h&&l+f<=v&&(l=i[u]()),i[u]()==l&&d&&d()},v=0;r.scroll||(r.scroll=o._getScroll(n["scroll"+s]).addClass("scroll-"+s),n.showArrows&&r.scroll.addClass("iscroll-element-arrows-visible"),r.mousewheel=function(l){if(!r.isVisible||"x"===s&&a(l))return!0;if("y"===s&&!a(l))return c.x.mousewheel(l),!0;var e=-1*l.originalEvent.wheelDelta||l.originalEvent.detail,t=r.size-r.visible-r.offset;return e||("x"===s&&l.originalEvent.deltaX?e=40*l.originalEvent.deltaX:"y"===s&&l.originalEvent.deltaY&&(e=40*l.originalEvent.deltaY)),(e>0&&v<t||e<0&&v>0)&&((v +=e)<0&&(v=0),v>t&&(v=t),o.scrollTo=o.scrollTo||{},o.scrollTo[u]=v,setTimeout(function(){o.scrollTo&&(i.stop().animate(o.scrollTo,240,"linear",function(){v=i[u]()}),o.scrollTo=null)},1)),l.preventDefault(),!1},r.scroll.on("MozMousePixelScroll"+t,r.mousewheel).on("mousewheel"+t,r.mousewheel).on("mouseenter"+t,function(){v=i[u]()}),r.scroll.find(".iscroll-arrow, .iscroll-element-track").on("mousedown"+t,function(t){if(1!=t.which)return!0;h=1;var c={eventOffset:t["x"===s?"pageX":"pageY"],maxScrollValue:r.size-r.visible-r.offset,iscrollOffset:r.scroll.bar.offset()["x"===s?"left":"top"],iscrollSize:r.scroll.bar["x"===s?"outerWidth":"outerHeight"]()},a=0,m=0;if(l(this).hasClass("iscroll-arrow")){if(h=l(this).hasClass("iscroll-arrow_more")?1:-1,f=n.scrollStep*h,v=h>0?c.maxScrollValue:0,n.isRtl)switch(!0){case e.firefox:v=h>0?0:-1*c.maxScrollValue;break;case e.msie||e.msedge:}}else h=c.eventOffset>c.iscrollOffset+c.iscrollSize?1:c.eventOffset<c.iscrollOffset?-1:0,"x"===s&&n.isRtl&&(e.msie||e.msedge)&&(h*=-1),f=Math.round(.75*r.visible)*h,v=c.eventOffset-c.iscrollOffset-(n.stepScrolling?1==h?c.iscrollSize:0:Math.round(c.iscrollSize/2)),v=i[u]()+v/r.kx;return o.scrollTo=o.scrollTo||{},o.scrollTo[u]=n.stepScrolling?i[u]()+f:v,n.stepScrolling&&(d=function(){v=i[u](),clearInterval(m),clearTimeout(a),a=0,m=0},a=setTimeout(function(){m=setInterval(p,40)},n.duration+100)),setTimeout(function(){o.scrollTo&&(i.animate(o.scrollTo,n.duration),o.scrollTo=null)},1),o._handleMouseDown(d,t)}),r.scroll.bar.on("mousedown"+t,function(c){if(1!=c.which)return!0;var a=c["x"===s?"pageX":"pageY"],d=i[u]();return r.scroll.addClass("iscroll-draggable"),l(document).on("mousemove"+t,function(l){var o=parseInt((l["x"===s?"pageX":"pageY"]-a)/r.kx,10);"x"===s&&n.isRtl&&(e.msie||e.msedge)&&(o*=-1),i[u](d+o)}),o._handleMouseDown(function(){r.scroll.removeClass("iscroll-draggable"),v=i[u]()},c)}))}),l.each(c,function(l,e){var s="iscroll-scroll"+l+"-visible",o="x"==l?c.y:c.x;e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s)}),l.each(c,function(e,s){l.extend(s,"x"==e?{offset:parseInt(i.css("left"),10)||0,size:i.prop("scrollWidth"),visible:d.width()}:{offset:parseInt(i.css("top"),10)||0,size:i.prop("scrollHeight"),visible:d.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),l.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[i]),l.each(c,function(l,e){var s="x"===l?"left":"top",o="x"===l?"outerWidth":"outerHeight",r="x"===l?"width":"height",t=parseInt(i.css(s),10)||0,c=e.size,a=e.visible+t,d=e.scroll.size[o]()+(parseInt(e.scroll.size.css(s),10)||0);n.autoScrollSize&&(e.iscrollSize=parseInt(d*a/c,10),e.scroll.bar.css(r,e.iscrollSize+"px")),e.iscrollSize=e.scroll.bar[o](),e.kx=(d-e.iscrollSize)/(c-a)||1,e.maxScrollOffset=c-a}),i.scrollLeft(u.scrollLeft).scrollTop(u.scrollTop).trigger("scroll")},_getScroll:function(e){var s={advanced:['<div class="iscroll-element">','<div class="iscroll-element-corner"></div>','<div class="iscroll-arrow iscroll-arrow-less"></div>','<div class="iscroll-arrow iscroll-arrow-more"></div>','<div class="iscroll-element-outer">','<div class="iscroll-element-size"></div>','<div class="iscroll-element-inner-wrapper">','<div class="iscroll-element-inner iscroll-element-track">','<div class="iscroll-element-inner-bottom"></div>',"</div>","</div>",'<div class="iscroll-bar">','<div class="iscroll-bar-body">','<div class="iscroll-bar-body-inner"></div>',"</div>",'<div class="iscroll-bar-bottom"></div>','<div class="iscroll-bar-center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="iscroll-element">','<div class="iscroll-element-outer">','<div class="iscroll-element-size"></div>','<div class="iscroll-element-track"></div>','<div class="iscroll-bar"></div>',"</div>","</div>"].join("")};return s[e]&&(e=s[e]),e||(e=s.simple),e="string"==typeof e?l(e).appendTo(this.wrapper):l(e),l.extend(e,{bar:e.find(".iscroll-bar"),size:e.find(".iscroll-element-size"),track:e.find(".iscroll-element-track")}),e},_handleMouseDown:function(e,s){var o=this.namespace;return l(document).on("blur"+o,function(){l(document).add("body").off(o),e&&e()}),l(document).on("dragstart"+o,function(l){return l.preventDefault(),!1}),l(document).on("mouseup"+o,function(){l(document).add("body").off(o),e&&e()}),l("body").on("selectstart"+o,function(l){return l.preventDefault(),!1}),s&&s.preventDefault(),!1},_updateScroll:function(s,o){var i=this.container,r=this.containerWrapper||i,t="iscroll-scroll"+s+"-visible",n="x"===s?this.scrolly:this.scrollx,c=parseInt(this.container.css("x"===s?"left":"top"),10)||0,a=this.wrapper,d=o.size,h=o.visible+c;o.isVisible=d-h>1,o.isVisible?(o.scroll.addClass(t),n.scroll.addClass(t),r.addClass(t)):(o.scroll.removeClass(t),n.scroll.removeClass(t),r.removeClass(t)),"y"===s&&(i.is("textarea")||d<h?r.css({height:h+e.scroll.height+"px","max-height":"none"}):r.css({"max-height":h+e.scroll.height+"px"})),o.size==i.prop("scrollWidth")&&n.size==i.prop("scrollHeight")&&o.visible==a.width()&&n.visible==a.height()&&o.offset==(parseInt(i.css("left"),10)||0)&&n.offset==(parseInt(i.css("top"),10)||0)||(l.extend(this.scrollx,{offset:parseInt(i.css("left"),10)||0,size:i.prop("scrollWidth"),visible:a.width()}),l.extend(this.scrolly,{offset:parseInt(i.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:a.height()}),this._updateScroll("x"===s?"y":"x",n))}};var i=o;l.fn.iScroll=function(s,o){return"string"!=typeof s&&(o=s,s="init"),void 0===o&&(o=[]),l.isArray(o)||(o=[o]),this.not("body, .iscroll").each(function(){var r=l(this),t=r.data(e.data.name);(t||"init"===s)&&(t||(t=new i(r)),t[s]&&t[s].apply(t,o))}),this},l.fn.iScroll.options=s;var r,t,n=(r=0,function(l){var s,o,i,t,c,a,d;for(s=0;s<e.scrolls.length;s++)o=(t=e.scrolls[s]).container,i=t.options,c=t.wrapper,a=t.scrollx,d=t.scrolly,(l||i.autoUpdate&&c&&c.is(":visible")&&(o.prop("scrollWidth")!=a.size||o.prop("scrollHeight")!=d.size||c.width()!=a.visible||c.height()!=d.visible))&&(t.init(),i.debug&&window.console&&console.log({scrollHeight:o.prop("scrollHeight")+":"+t.scrolly.size,scrollWidth:o.prop("scrollWidth")+":"+t.scrollx.size,visibleHeight:c.height()+":"+t.scrolly.visible,visibleWidth:c.width()+":"+t.scrollx.visible},!0));clearTimeout(r),r=setTimeout(n,300)});function c(s){if(e.webkit&&!s)return{height:0,width:0};if(!e.data.outer){var o={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};e.data.inner=l("<div>").css(l.extend({},o)),e.data.outer=l("<div>").css(l.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},o)).append(e.data.inner).appendTo("body")}return e.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(e.data.outer.offset().top-e.data.inner.offset().top||0),width:Math.ceil(e.data.outer.offset().left-e.data.inner.offset().left||0)}}function a(l){var e=l.originalEvent;return(!e.axis||e.axis!==e.HORIZONTAL_AXIS)&&!e.wheelDeltaX}window.angular&&(t=window.angular).module("jQueryiscroll",[]).provider("jQueryiscroll",function(){var l=s;return{setOptions:function(e){t.extend(l,e)},$get:function(){return{options:t.copy(l)}}}}).directive("jqueryiscroll",["jQueryiscroll","$parse",function(l,e){return{restrict:"AC",link:function(s,o,i){var r=e(i.jqueryiscroll)(s);o.iscroll(r||l.options).on("$destroy",function(){o.iscroll("destroy")})}}}])});

/* MD5 */
function md5cycle(f,h){var i=f[0],n=f[1],r=f[2],g=f[3];n=ii(n=ii(n=ii(n=ii(n=hh(n=hh(n=hh(n=hh(n=gg(n=gg(n=gg(n=gg(n=ff(n=ff(n=ff(n=ff(n,r=ff(r,g=ff(g,i=ff(i,n,r,g,h[0],7,-680876936),n,r,h[1],12,-389564586),i,n,h[2],17,606105819),g,i,h[3],22,-1044525330),r=ff(r,g=ff(g,i=ff(i,n,r,g,h[4],7,-176418897),n,r,h[5],12,1200080426),i,n,h[6],17,-1473231341),g,i,h[7],22,-45705983),r=ff(r,g=ff(g,i=ff(i,n,r,g,h[8],7,1770035416),n,r,h[9],12,-1958414417),i,n,h[10],17,-42063),g,i,h[11],22,-1990404162),r=ff(r,g=ff(g,i=ff(i,n,r,g,h[12],7,1804603682),n,r,h[13],12,-40341101),i,n,h[14],17,-1502002290),g,i,h[15],22,1236535329),r=gg(r,g=gg(g,i=gg(i,n,r,g,h[1],5,-165796510),n,r,h[6],9,-1069501632),i,n,h[11],14,643717713),g,i,h[0],20,-373897302),r=gg(r,g=gg(g,i=gg(i,n,r,g,h[5],5,-701558691),n,r,h[10],9,38016083),i,n,h[15],14,-660478335),g,i,h[4],20,-405537848),r=gg(r,g=gg(g,i=gg(i,n,r,g,h[9],5,568446438),n,r,h[14],9,-1019803690),i,n,h[3],14,-187363961),g,i,h[8],20,1163531501),r=gg(r,g=gg(g,i=gg(i,n,r,g,h[13],5,-1444681467),n,r,h[2],9,-51403784),i,n,h[7],14,1735328473),g,i,h[12],20,-1926607734),r=hh(r,g=hh(g,i=hh(i,n,r,g,h[5],4,-378558),n,r,h[8],11,-2022574463),i,n,h[11],16,1839030562),g,i,h[14],23,-35309556),r=hh(r,g=hh(g,i=hh(i,n,r,g,h[1],4,-1530992060),n,r,h[4],11,1272893353),i,n,h[7],16,-155497632),g,i,h[10],23,-1094730640),r=hh(r,g=hh(g,i=hh(i,n,r,g,h[13],4,681279174),n,r,h[0],11,-358537222),i,n,h[3],16,-722521979),g,i,h[6],23,76029189),r=hh(r,g=hh(g,i=hh(i,n,r,g,h[9],4,-640364487),n,r,h[12],11,-421815835),i,n,h[15],16,530742520),g,i,h[2],23,-995338651),r=ii(r,g=ii(g,i=ii(i,n,r,g,h[0],6,-198630844),n,r,h[7],10,1126891415),i,n,h[14],15,-1416354905),g,i,h[5],21,-57434055),r=ii(r,g=ii(g,i=ii(i,n,r,g,h[12],6,1700485571),n,r,h[3],10,-1894986606),i,n,h[10],15,-1051523),g,i,h[1],21,-2054922799),r=ii(r,g=ii(g,i=ii(i,n,r,g,h[8],6,1873313359),n,r,h[15],10,-30611744),i,n,h[6],15,-1560198380),g,i,h[13],21,1309151649),r=ii(r,g=ii(g,i=ii(i,n,r,g,h[4],6,-145523070),n,r,h[11],10,-1120210379),i,n,h[2],15,718787259),g,i,h[9],21,-343485551),f[0]=add32(i,f[0]),f[1]=add32(n,f[1]),f[2]=add32(r,f[2]),f[3]=add32(g,f[3])}function cmn(f,h,i,n,r,g){return h=add32(add32(h,f),add32(n,g)),add32(h<<r|h>>>32-r,i)}function ff(f,h,i,n,r,g,t){return cmn(h&i|~h&n,f,h,r,g,t)}function gg(f,h,i,n,r,g,t){return cmn(h&n|i&~n,f,h,r,g,t)}function hh(f,h,i,n,r,g,t){return cmn(h^i^n,f,h,r,g,t)}function ii(f,h,i,n,r,g,t){return cmn(i^(h|~n),f,h,r,g,t)}function md51(f){txt="";var h,i=f.length,n=[1732584193,-271733879,-1732584194,271733878];for(h=64;h<=f.length;h +=64)md5cycle(n,md5blk(f.substring(h-64,h)));f=f.substring(h-64);var r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(h=0;h<f.length;h++)r[h>>2]|=f.charCodeAt(h)<<(h%4<<3);if(r[h>>2]|=128<<(h%4<<3),h>55)for(md5cycle(n,r),h=0;h<16;h++)r[h]=0;return r[14]=8*i,md5cycle(n,r),n}function md5blk(f){var h,i=[];for(h=0;h<64;h +=4)i[h>>2]=f.charCodeAt(h)+(f.charCodeAt(h+1)<<8)+(f.charCodeAt(h+2)<<16)+(f.charCodeAt(h+3)<<24);return i}var hex_chr="0123456789abcdef".split("");function rhex(f){for(var h="",i=0;i<4;i++)h +=hex_chr[f>>8*i+4&15]+hex_chr[f>>8*i&15];return h}function hex(f){for(var h=0;h<f.length;h++)f[h]=rhex(f[h]);return f.join("")}function md5(f){return hex(md51(f))}function add32(f,h){return f+h&4294967295}if("5d41402abc4b2a76b9719d911017c592"!=md5("hello"))function add32(f,h){var i=(65535&f)+(65535&h);return(f>>16)+(h>>16)+(i>>16)<<16|65535&i}

/* iweb lib, requires jQuery v1.11 or later, copyright 2023 kaiyunchan */
(function($){
    $.fn.iweb_pagination = function(options){
        var settings = $.extend({
            mode: 1,
            size: 3,
            total: 1,
            placeholder: ''
        }, options);

        var currentPage = 1;
        var urlStr = '';
        var urlParameters = window.location.search.substring(1).split('&');
        for (var i = 0; i < parseInt(urlParameters.length); i++){
            var currentParameter = urlParameters[i].split('=');
            var currentParameter_index = currentParameter[0];
            var currentParameter_value = currentParameter[1];
            if(currentParameter_index !== '' && (typeof currentParameter_index !== 'undefined') && currentParameter_value !== '' && (typeof currentParameter_value !== 'undefined')){
                if((currentParameter_index.toString().toLowerCase()) !== 'page'){
                    if(urlStr !== ''){
                        urlStr += '&' + currentParameter_index + '=' + currentParameter_value;
                    } else {
                        urlStr += '?' + currentParameter_index + '=' + currentParameter_value;
                    }
                } else {
                    currentPage = parseInt(currentParameter_value);
                }
            }
        }
        if(urlStr !== ''){
            urlStr += '&';
        } else {
            urlStr += '?';
        }
        urlStr = ((window.location.href.split('?')[0]).toString()) + urlStr;

        $(document).off('keypress', 'div.iweb-pagination > ul > li > input[type="text"].jumpto_page');
        $(document).on('keypress', 'div.iweb-pagination > ul > li > input[type="text"].jumpto_page', function(e){
            var jumpto_page = parseInt($(this).val());
            var maxvalue = parseInt($(this).data('max'));
            if(jumpto_page > maxvalue){
                jumpto_page = maxvalue;
            }
            if(e.which === 13){
                window.location.href = urlStr + 'page=' + jumpto_page;
            }
        });

        this.each(function(){
            var pageSize = parseInt(settings.size);
            var totalPage = parseInt(settings.total);
            if($(this).data('size') !== null && (typeof $(this).data('size') !== 'undefined')){
                pageSize = parseInt($(this).data('size'));
                if(pageSize < parseInt(settings.size)){
                    pageSize = parseInt(settings.size);
                }
            }
            if($(this).data('totalpage') !== null && (typeof $(this).data('totalpage') !== 'undefined')){
                totalPage = parseInt($(this).data('totalpage'));
                $(this).removeAttr('data-totalpage');
            }

            var firstPage = 1;
            var prevPage = parseInt(currentPage - 1);
            if(prevPage < 1){
                prevPage = 1;
            }
            var nextPage = parseInt(currentPage + 1);
            if(nextPage > totalPage){
                nextPage = totalPage;
            }
            var lastPage = totalPage;

            var start_page_num = 1;
            var end_page_num = pageSize;
            var diff_page_num = parseInt(pageSize / 2);
            if(totalPage <= pageSize){
                start_page_num = 1;
                end_page_num = totalPage;
            } else {
                start_page_num = currentPage - diff_page_num;
                end_page_num = currentPage + diff_page_num;
                if(start_page_num < 1){
                    start_page_num = firstPage;
                    end_page_num = pageSize;
                    if(end_page_num > lastPage){
                        end_page_num = lastPage;
                    }
                } else {
                    if(end_page_num > lastPage){
                        end_page_num = lastPage;
                        start_page_num = (lastPage - pageSize) + 1;
                        if(start_page_num < firstPage){
                            start_page_num = firstPage;
                        }
                    }
                }
            }

            if(totalPage > 1){
                var pagination_html = '<ul>';
                if(parseInt(settings.mode) === 2){
                    if(currentPage > parseInt(pageSize / 2)){
                        pagination_html += '<li><a class="first" href="' + urlStr + 'page=' + firstPage + '"><span>' + firstPage + '..</span></a></li>';
                    }
                } else {
                    pagination_html += '<li><a class="first" href="' + urlStr + 'page=' + firstPage + '"><i></i><i></i></a></li>';
                }
                pagination_html += '<li><a class="prev" href="' + urlStr + 'page=' + prevPage + '"><i></i></a></li>';

                for (var i = start_page_num; i <= end_page_num; i++){
                    if(i === currentPage){
                        pagination_html += '<li><a class="num current" href="' + urlStr + 'page=' + i + '"><span>' + i + '</span></a></li>';
                    } else {
                        pagination_html += '<li><a class="num" href="' + urlStr + 'page=' + i + '"><span>' + i + '</span></a></li>';
                    }
                }

                pagination_html += '<li><a class="next" href="' + urlStr + 'page=' + nextPage + '"><i></i></a></li>';
                if(parseInt(settings.mode) === 2){
                    if(currentPage < totalPage - parseInt(pageSize / 2)){
                        pagination_html += '<li><a class="last" href="' + urlStr + 'page=' + lastPage + '"><span>..' + lastPage + '</span></a></li>';
                    }
                } else {
                    pagination_html += '<li><a class="last" href="' + urlStr + 'page=' + lastPage + '"><i></i><i></i></a></li>';
                }
                pagination_html += '<li><input type="text" class="jumpto_page" name="jumpto_page" data-max="' + totalPage + '" placeholder="' + settings.placeholder + '"/></li>';
                pagination_html += '</ul>';
                $(this).html('<div class="iweb-pagination">' + pagination_html + '</div>');
            }
        });
    };
}(jQuery));

var iweb = {
    default_language: 'en',
    language: [],
    csrf_token: '',

    init_status: false,
    processing_status: false,
    
    uploader_options: null,
    uploader_files: null,
    uploader_files_skip: [-1],
    
    win_width: 0,
    win_scroll_top: 0,
    
    initialize: function(key){
        var iweb_object = this;

        iweb_object.language['en'] = {
            btn_confirm: 'OK',
            btn_yes: 'Yes',
            btn_no: 'No',
            please_select: 'Please Select',
            type_error: 'File type is not allowed.',
            max_error: 'Maximum allowed file size {num}M.',
            is_required: 'This field is required.',
            password_error: 'Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123).',
            email_error: 'Invalid email address format.',
            number_error: 'Invalid number format.',
            date_error: 'Invalid date format.',
            required_error: 'Please fill in the required information.',
            custom_error: ''
        };
        
        iweb_object.language['zh-hant'] = {
            btn_confirm: '確定',
            btn_yes: '是',
            btn_no: '否',
            please_select: '請選擇',
            type_error: '不允許的檔案類型。',
            max_error:'檔案大小不能超過{num}M。',
            is_required: '此欄位必須填寫。',
            password_error: '密碼必須至少包含6個字符，包括大寫/小寫和數字(例如Abc123)。',
            email_error: '無效的郵件地址格式。',
            number_error: '無效的數字格式。',
            date_error: '無效的日期格式。',
            required_error: '請正確填寫必須填寫的項目。',
            custom_error: ''
        };
        
        iweb_object.language['zh-hans'] = {
            btn_confirm: '确定',
            btn_yes: '是',
            btn_no: '否',
            please_select: '请选择',
            type_error: '不允许的档案类型。',
            max_error:'档案大小不能超过{num}M。',
            is_required: '此栏位必须填写。',
            password_error: '密码必须至少包含6个字符，包括大写/小写和数字(例如Abc123)。',
            email_error: '无效的邮件地址格式。',
            number_error: '无效的数字格式。',
            date_error: '無效的日期格式。',
            required_error: '请正确填写必须填写的项目。',
            custom_error: ''
        };
        
        if(iweb_object.isValue($('html').attr('lang')) && iweb_object.isValue(iweb_object.language[$('html').attr('lang').toString().toLowerCase()])){
            iweb_object.default_language = $('html').attr('lang').toString().toLowerCase();
        }

        if(iweb_object.isValue($('meta[name="csrf-token"]').attr('content'))){ 
            iweb_object.csrf_token = $('meta[name="csrf-token"]').attr('content');
            iweb_object.csrf_token = md5(md5('iweb@'+(iweb_object.isValue(location.hostname)?location.hostname:'/'))+'@'+iweb_object.csrf_token);
        }

        if(iweb_object.isMatch($('body').data('processing'),1) || iweb_object.isMatch($('body').data('processing'),true)){
            iweb_object.processing(true);
        }
        
        $('body > *').not('script,noscript').wrapAll('<div class="iweb-viewer"></div>');
        
        $(document).off('keypress','body');
        $(document).on('keypress','body',function(e){
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == 13 && parseInt($('div.iweb-alert-dialog').length) > 0){
                e.preventDefault();
                return false;
            }
        });
        
        $(document).off('click','a');
        $(document).on('click','a',function(e){
            if(!iweb_object.isValue($(this).attr('href')) || iweb_object.isMatch($(this).attr('href'),'#')){
                e.preventDefault();
            }
        });
        
        if(iweb_object.isValue(iweb_object.getCookie('iweb_font_size'))){
            if(iweb_object.isMatch(iweb_object.getCookie('iweb_font_size'),'small') || iweb_object.isMatch(iweb_object.getCookie('iweb_font_size'),'large')){
                $('html').addClass(iweb_object.getCookie('iweb_font_size')+'-font');
            }
            $('a.font-switch').each(function(){
                if(iweb_object.isMatch($(this).data('size'),iweb_object.getCookie('iweb_font_size'))){
                    $(this).addClass('current');
                }
                else {
                    $(this).removeClass('current');
                }
            });
        }
        
        $(document).off('click','a.font-switch');
        $(document).on('click','a.font-switch',function(e){
            e.preventDefault();
            $('a.font-switch').removeClass('current');
            $('html').removeClass('small-font');
            $('html').removeClass('large-font');
            if(iweb_object.isMatch($(this).data('size'),'small') || iweb_object.isMatch($(this).data('size'),'large')){
                $('html').addClass($(this).data('size')+'-font');
            }
            iweb_object.setCookie('iweb_font_size',$(this).data('size'));
            $('a.font-switch').each(function(){
                if(iweb_object.isMatch($(this).data('size'),iweb_object.getCookie('iweb_font_size'))){
                    $(this).addClass('current');
                }
                else {
                    $(this).removeClass('current');
                }
            });
        });
        
        iweb_object.iframe();
        iweb_object.selector();
        iweb_object.checkbox();
        iweb_object.radiobox();
        $('body').find('input[type="text"],input[type="password"],input[type="date"],input[type="email"],input[type="number"],input[type="number"],textarea').each(function() {
            if(iweb_object.isMatch($(this).attr('type'),'password')) {
                $(this).wrap('<div class="iweb-input"><div></div></div>');
                $(this).parent().append('<button class="small switch-pwd-type" type="button"><i class="fa fa-eye-slash hide" style="display: block;"></i><i class="fa fa-eye show" style="display: none;"></i></button>')
            }
            else {
                $(this).wrap('<div class="iweb-input"><div></div></div>');
            }
        });
        iweb_object.responsive();

        
        $(document).off('input', 'input[type="text"],input[type="password"],input[type="date"],input[type="email"],input[type="number"],textarea');
        $(document).on('input', 'input[type="text"],input[type="password"],input[type="date"],input[type="email"],input[type="number"],textarea', function() {
            $('body').find('div.iweb-tips-message').html('');
            $(this).closest('div.iweb-input').find('.error').removeClass('error');
            $(this).closest('div.iweb-input').find('small.tips').remove();
        });
        
        $(document).off('change', 'select,input[type="checkbox"],input[type="radio"]');
        $(document).on('change', 'select,input[type="checkbox"],input[type="radio"]', function() {
            $('body').find('div.iweb-tips-message').html('');
            
            $(this).closest('div.iweb-selector').find('.error').removeClass('error');
            $(this).closest('div.iweb-selector').find('small.tips').remove();
            
            $(this).closest('div.iweb-checkbox-set').find('.error').removeClass('error');
            $(this).closest('div.iweb-checkbox-set').find('small.tips').remove();
            
            $(this).closest('div.iweb-radiobox-set').find('.error').removeClass('error');
            $(this).closest('div.iweb-radiobox-set').find('small.tips').remove();
        });
        
        $(document).off('click','button.switch-pwd-type');
        $(document).on('click','button.switch-pwd-type',function(){
            if(iweb_object.isMatch($(this).parent().find('input').attr('type'), 'password')) {
                $(this).parent().find('input').attr('type','text');
                $(this).parent().find('i.show').css('display','block');
                $(this).parent().find('i.hide').css('display','none');
            }
            else {
                $(this).parent().find('input').attr('type','password');
                $(this).parent().find('i.show').css('display','none');
                $(this).parent().find('i.hide').css('display','block');
            }
            return false;
        });

        $(document).off('click', 'div.iweb-tips-message > div > a.close');
        $(document).on('click', 'div.iweb-tips-message > div > a.close', function() {
            $(this).closest('div.iweb-tips-message').empty();
        });

        $(document).off('reset','form');
        $(document).on('reset','form',function(e){ 
            $('body').append('<div class="iweb-blank-mask" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:9999;"></div>');
            $('body').find('div.iweb-tips-message').html('');

            var form_object = $(this);
            form_object.find('.error').removeClass('error');
            form_object.find('small.tips').remove();
            
            var delay_timer = setTimeout(function(){
                clearTimeout(delay_timer);
                form_object.find('div.iweb-selector').each(function() {
                    
                    
                    var selected_option = [];
                    var selected_option_label = '';
                    $.each($(this).find('select').children(),function(){
                        if(parseInt($(this).children().length) > 0){
                            $.each($(this).children(),function(){
                                if($(this).is(':selected')){
                                    selected_option.push($(this).val().toString());
                                }
                            });
                        }
                        else {
                            if($(this).is(':selected')){
                                selected_option.push($(this).val().toString());
                            }
                        }
                    });
                    $(this).find('div.virtual > div.options ul > li.node').removeClass('hide');
                    $(this).find('div.virtual > div.options ul > li > a').each(function(){
                        if(iweb_object.isValue($(this).data('value'))){
                            if(!iweb_object.isMatch(parseInt($.inArray($(this).data('value').toString(),selected_option)),-1)){
                                $(this).parent().addClass('node-selected');
                                if(iweb_object.isValue(selected_option_label)){
                                    selected_option_label += ', ';
                                }
                                selected_option_label += $(this).text();
                            }
                            else {
                                $(this).parent().removeClass('node-selected');
                            }
                        }
                    });
                    if(!iweb_object.isValue(selected_option_label)){
                        selected_option_label = ((iweb_object.isValue($(this).find('select').data('default')))?$(this).find('select').data('default'):iweb_object.language[iweb_object.default_language]['please_select']);
                    }
                    $(this).find('div.virtual > div.result > a').html(selected_option_label);
                });

                form_object.find('div.iweb-checkbox').each(function() {
                    if($(this).find('input[type="checkbox"]').is(':checked')){
                        $(this).find('input[type="checkbox"]').parent().addClass('checked');
                    }
                    else {
                        $(this).find('input[type="checkbox"]').parent().removeClass('checked');
                    }
                });

                form_object.find('div.iweb-radiobox').each(function() {
                    if($(this).find('input[type="radio"]').is(':checked')){
                        $(this).find('input[type="radio"]').parent().addClass('checked');
                    }
                    else {
                        $(this).find('input[type="radio"]').parent().removeClass('checked');
                    }
                });

                $('div.iweb-blank-mask').remove();
            }, 250);
        });

        $('body').removeAttr('data-processing');
        $('body').removeAttr('data-macosx');
        $('body').addClass('iweb');
        if(iweb_object.detectDevice()){
            $('body').addClass('iweb-mobile');
        }
        
        iweb_object.win_width = parseInt($('div.iweb-viewer').width());
        if(typeof iweb_layout == 'function'){
            iweb_layout(iweb_object.win_width);
        }
        if(typeof iweb_ilayout == 'function'){
            iweb_ilayout(iweb_object.win_width);
        }
        if(typeof iweb_func == 'function'){
            iweb_func();
        }
        if(typeof iweb_ifunc == 'function'){
            iweb_ifunc();
        }
    },
    processing: function(status,value){
        var iweb_object = this;
        
        if(iweb_object.isMatch(status,1) || iweb_object.isMatch(status,true)){
            if(parseInt($('div.iweb-processing').length) == 0){
                var box_html = '';
                var opacity = 1;
                if(iweb_object.isNumber(value,true)){
                    opacity = (Math.round(parseInt(value)/100*100)/100);
                    box_html += '<div class="iweb-processing" style="background:rgba(255,255,255,'+opacity+')">';
                } else {
                    box_html += '<div class="iweb-processing">';
                }
                    box_html += '<div class="loading">';
                        box_html += '<svg width="48px" height="48px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">'
                            box_html += '<circle cx="50" cy="50" fill="none" stroke="#dddddd" stroke-width="10" r="36" stroke-dasharray="169.64600329384882 58.548667764616276">'
                                box_html += '<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>'
                            box_html += '</circle>'
                        box_html += '</svg>';
                    box_html += '</div>';
                box_html += '</div>';
                $('body').prepend(box_html);
            }
        }
        else {
            var microsecond = 0;
            if(iweb_object.isNumber(value,true)){
                microsecond = parseInt(value);
            }
            var delay_timer = setTimeout(function(){
                clearTimeout(delay_timer);
                $('div.iweb-processing').remove();
            }, microsecond);
        }
    },
    resizing: function(){
        var iweb_object = this;
        
        if(iweb_object.init_status && iweb_object.win_width != parseInt($('div.iweb-viewer').width())){
            iweb_object.win_width = parseInt($(window).width());
            return true;
        }
        else {
            return false;
        }
    },
    responsive: function(){
        var iweb_object = this;
        
        if(parseInt($('div.iweb-responsive').length) > 0){
            $('div.iweb-responsive').each(function(){
                var current_width = $(this).innerWidth(); 
                var new_height = 0; 
                var define_ratio_width = $(this).data('width'); 
                var define_ratio_height = $(this).data('height');
                if(iweb_object.isValue(define_ratio_width) && iweb_object.isValue(define_ratio_height)){
                    if(define_ratio_height > 0 && define_ratio_width > 0){
                        new_height = parseInt(current_width * define_ratio_height / define_ratio_width);
                    }
                }
                if(new_height > 0){
                    $(this).css('height', new_height + 'px');
                }
                else {
                    $(this).css('height', 'auto');
                }
            });
        }
    },
    scrollto: function(element,adjustment_value,callback){
        var iweb_object = this;
        
        var element_scroll_top_value = 0;
        var adjustment_value = ((iweb_object.isValue(adjustment_value))?parseInt(adjustment_value):0);
        if(parseInt($(element).length) > 0){
            element_scroll_top_value = Math.max(0, parseInt($(element).first().offset().top) - adjustment_value);
        }
        $('html,body').animate({ scrollTop: element_scroll_top_value }, 500).promise().then(function(){
            if(typeof callback == 'function'){
                callback();
            }
        });
    },
    scrollbar: function(element,mode,callback){
        var iweb_object = this;
        
        if(parseInt($(element).length) > 0){
            $(element).iScroll({
                mode: ((iweb_object.isMatch(mode,'macosx'))?mode:'outer'),
                onScroll: function(scroll_y, scroll_x){
                    if(typeof callback == 'function'){
                        callback(scroll_y);
                    }
                }
            });
        }
    },
    iframe:function(element){
        var iweb_object = this;
        
        if(!iweb_object.isValue(element)){
            element = 'iweb-editor';
        }
        element = element.toString().replace('.','');
        $.each(['iframe','video','object','embed'],function(key,value){
            $('body').find('.'+element).find(value).each(function(){
                if(!$(this).parent().hasClass('iweb-responsive')){
                    $(this).addClass('vframe').wrapAll('<div class="iweb-responsive" data-width="'+$(this).width()+'" data-height="'+$(this).height()+'"></div>');
                }
            });
        });
        iweb_object.responsive();
    },
    selector: function(select_object,callback){
        var iweb_object = this;
        
        if(parseInt($('div.iweb-selector').length) == 0){
            $(document).off('click','body');
            $(document).on('click','body',function(e){
                if(parseInt($(e.target).closest('div.iweb-selector').length) === 0){
                    $('div.iweb-selector').removeClass('show');
                }
            });
            
            $(document).off('focus','div.iweb-selector > div.real > select');
            $(document).on('focus','div.iweb-selector > div.real > select',function(e){
                $('div.iweb-selector').removeClass('show');
            });
            
            $(document).off('blur','div.iweb-selector > div.virtual > div.options ul > li > a:last');
            $(document).on('blur','div.iweb-selector > div.virtual > div.options ul > li > a:last',function(){
                $('div.iweb-selector').removeClass('show');
            });

            $(document).off('change','div.iweb-selector > div.real > select');
            $(document).on('change','div.iweb-selector > div.real > select',function(){
                var selected_option = [];
                var selected_option_label = '';
                $.each($(this).closest('div.iweb-selector').find('select').children(),function(){
                    if(parseInt($(this).children().length) > 0){
                        $.each($(this).children(),function(){
                            if($(this).is(':selected')){
                                selected_option.push($(this).val().toString());
                            }
                        });
                    }
                    else {
                        if($(this).is(':selected')){
                            selected_option.push($(this).val().toString());
                        }
                    }
                });
                $(this).closest('div.iweb-selector').find('div.virtual > div.options ul > li > a').each(function(){
                    if(iweb_object.isValue($(this).data('value'))){
                        if(!iweb_object.isMatch(parseInt($.inArray($(this).data('value').toString(),selected_option)),-1)){
                            $(this).parent().addClass('node-selected');
                            if(iweb_object.isValue(selected_option_label)){
                                selected_option_label += ', ';
                            }
                            selected_option_label += $(this).text();
                        }
                        else {
                            $(this).parent().removeClass('node-selected');
                        }
                    }
                });
                if(!iweb_object.isValue(selected_option_label)){
                    selected_option_label = ((iweb_object.isValue($(this).data('default')))?$(this).data('default'):iweb_object.language[iweb_object.default_language]['please_select']);
                }
                $(this).closest('div.iweb-selector').find('div.virtual > div.result > a').html(selected_option_label);
            });
            
            $(document).off('click','div.iweb-selector > div.virtual > div.result > a');
            $(document).on('click','div.iweb-selector > div.virtual > div.result > a',function(){
                var target_selector = $(this);
                if($(this).closest('div.iweb-selector').find('div.virtual > div.options > ul').is(":visible")){
                    $(this).closest('div.iweb-selector').removeClass('show');
                }
                else {
                    $(this).closest('div.iweb-selector').addClass('show');
                }
                $('div.iweb-selector > div.virtual > div.options > ul').each(function(){
                    if(!iweb_object.isMatch($(this).data('index'),target_selector.closest('div.iweb-selector').find('div.virtual > div.options > ul').data('index'))){
                        $(this).closest('div.iweb-selector').removeClass('show');
                    }
                });
            });
            
            $(document).off('click','div.iweb-selector > div.virtual > div.options ul > li > a');
            $(document).on('click','div.iweb-selector > div.virtual > div.options ul > li > a',function(){
                if($(this).closest('div.iweb-selector').hasClass('iweb-selector-multiple')){
                    var selected_option = [];
                    $.each($(this).closest('div.iweb-selector').find('select').children(),function(){
                        if(parseInt($(this).children().length) > 0){
                            $.each($(this).children(),function(){
                                if($(this).is(':selected')){
                                    selected_option.push($(this).val().toString());
                                }
                            });
                        }
                        else {
                            if($(this).is(':selected')){
                                selected_option.push($(this).val().toString());
                            }
                        }
                    });
                    if(iweb_object.isMatch(parseInt($.inArray($(this).data('value').toString(),selected_option)),-1)){
                        selected_option.push($(this).data('value'));
                    }
                    else {
                        var remove_value = $(this).data('value').toString();
                        selected_option = $.grep(selected_option, function(value){
                            return value != remove_value;
                        });
                    }
                    $(this).closest('div.iweb-selector').find('div.real > select').val(selected_option).trigger('change');
                }
                else {
                    $(this).closest('div.iweb-selector').removeClass('show');
                    $(this).closest('div.iweb-selector').find('div.real > select').val($(this).data('value')).trigger('change');
                }
            });
            
            $(document).off('keyup','div.iweb-selector > div.virtual > div.options ul > li.filter > input');
            $(document).on('keyup','div.iweb-selector > div.virtual > div.options ul > li.filter > input',function(){
                var fkw = $(this).val();
                if(iweb_object.isValue(fkw)){
                    $(this).closest('div.iweb-selector').find('div.virtual > div.options ul > li.node > a').each(function(key,value) {
                        if(($(this).html().toUpperCase()).indexOf(fkw.toUpperCase()) > -1) {
                            $(this).parent().removeClass('hide');
                            $(this).closest('li.node-parent').removeClass('hide');
                        }
                        else {
                            $(this).parent().addClass('hide');
                        }
                    });
                }
                else {
                    $(this).closest('div.iweb-selector').find('div.virtual > div.options ul > li.node').removeClass('hide');
                }
            });
        }

        if(!iweb_object.isValue(select_object)){
           select_object = $('body').find('select');
        }
        
        select_object.each(function(select_index){
            if(!$(this).parent().parent().hasClass('iweb-selector')){
                var isMultiple = $(this).prop('multiple');
                if(iweb_object.isMatch($(this).data('virtual'),1) || iweb_object.isMatch($(this).data('virtual'),true) || iweb_object.isValue(isMultiple)){
                    
                    if(!iweb_object.isValue(isMultiple)) {
                        var has_default_selected = false
                        $.each($(this).find('option'), function() {
                            if(iweb_object.isValue($(this).attr('selected'))) {
                                has_default_selected = true;
                                return;
                            }
                        });
                        $(this).prepend('<option value=""'+((!has_default_selected)?' selected':'')+'>'+((iweb_object.isValue($(this).data('default')))?$(this).data('default'):iweb_object.language[iweb_object.default_language]['please_select'])+'</option>');
                    }

                    $(this).wrap('<div class="iweb-selector'+(isMultiple?' iweb-selector-multiple':'')+'"><div class="real hidden"></div></div>');
                    $(this).removeAttr('data-virtual');
                    var virtualHtml = '';
                    var virtualSelect = '';
                    virtualHtml += '<ul data-index="iss'+select_index+'">';
                    if(iweb_object.isMatch($(this).data('filter'),1) || iweb_object.isMatch($(this).data('filter'),true)){
                        virtualHtml += '<li class="filter">';
                        if(iweb_object.isValue($(this).data('placeholder'))) {
                            virtualHtml += '<input type="text" id="fkw_'+select_index+'" placeholder="'+$.trim($(this).data('placeholder'))+'"/>';
                        }
                        else {
                            virtualHtml += '<input type="text" id="fkw_'+select_index+'"/>';
                        }
                        virtualHtml += '</li>';
                    }
                    
                    $.each($(this).children(),function(){
                        if(parseInt($(this).children().length) > 0){
                            virtualHtml += '<li class="node node-parent"><a>'+$(this).attr('label')+'</a>';
                            virtualHtml += '<ul>';
                            $.each($(this).children(),function(){
                                if($(this).is(':selected')){
                                    if(iweb_object.isValue(virtualSelect)) {
                                        virtualSelect += ', ';
                                    }
                                    virtualSelect += $(this).text();
                                    virtualHtml += '<li class="node node-selected" data-ori="selected"><a data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>';
                                }
                                else {
                                    virtualHtml += '<li class="node"><a data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>';
                                }
                            });
                            virtualHtml += '</ul>';
                            virtualHtml += '</li>';
                        }
                        else {
                            if($(this).is(':selected')){
                                if(iweb_object.isValue(virtualSelect)) {
                                    virtualSelect += ', ';
                                }
                                virtualSelect += $(this).text();
                                virtualHtml += '<li class="node node-selected" data-ori="selected"><a data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>';
                            }
                            else {
                                virtualHtml += '<li class="node"><a data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>';
                            }
                        }
                    });
                    
                    if(!iweb_object.isValue(virtualSelect)) {
                        virtualSelect = ((iweb_object.isValue($(this).data('default')))?$(this).data('default'):iweb_object.language[iweb_object.default_language]['please_select']);
                    }
                    
                    virtualHtml += '</ul>';
                    virtualHtml = '<div class="virtual"><div class="result"><a>'+virtualSelect+'</a></div><div class="options">'+virtualHtml+'</div></div>';
                    $(this).closest('div.iweb-selector').append(virtualHtml);
                }
                else {
                    $(this).wrap('<div class="iweb-selector"><div class="real"></div></div>');
                }
            }
        });
        if(typeof callback == 'function'){
            callback();
        }
    },
    checkbox: function(checkbox_object,callback){
        var iweb_object = this;
        
        if(parseInt($('div.iweb-checkbox').length) == 0){
            $(document).off('click','div.iweb-checkbox > .options > div > input[type="checkbox"]');
            $(document).on('click','div.iweb-checkbox > .options > div > input[type="checkbox"]',function(){
                $(this).parent().removeClass('error');
                if(!$(this).is(':checked')){
                    $(this).parent().removeClass('checked');
                }
                else {
                    $(this).parent().addClass('checked');
                }
            });
            
            $(document).off('click','div.iweb-checkbox > div.options > div > a');
            $(document).on('click','div.iweb-checkbox > div.options > div > a',function(){
                $(this).closest('.options').find('input[type="checkbox"]').trigger('click');
            });
        }

        if(!iweb_object.isValue(checkbox_object)){
           checkbox_object = $('body').find('input[type="checkbox"]');
        }
        
        var checkbox_group_name = [];
        checkbox_object.each(function(){
            if(!$(this).parent().parent().parent().hasClass('iweb-checkbox')){
                var find_checkbox_label = $(this).next();
                var ischecked = $(this).is(':checked');
                if(parseInt(find_checkbox_label.length) > 0 && iweb_object.isMatch(find_checkbox_label[0].nodeName,'label')){
                    $(this).wrap('<div class="iweb-checkbox"><div class="options"><div'+(ischecked?' class="checked"':'')+'></div></div><div class="virtual-msg">'+(find_checkbox_label[0].outerHTML)+'</div></div>');
                    find_checkbox_label.remove();
                }
                else {
                    $(this).wrap('<div class="iweb-checkbox"><div class="options"><div'+(ischecked?' class="checked"':'')+'></div></div><div class="virtual-msg">&nbsp;</div></div>');
                }
                if(ischecked){
                    $(this).attr('data-ori','checked');
                }
                $('<a>&nbsp;</a>').insertAfter($(this));
                checkbox_group_name.push($(this).attr('name'));
            }
        });
        
        checkbox_group_name = $.unique(checkbox_group_name);
        $.each(checkbox_group_name, function(key, value) {
            $('input[name="'+value+'"]').closest('div.iweb-checkbox').wrapAll('<div class="iweb-checkbox-set"></div>');
        });
        
        if(typeof callback == 'function'){
            callback();
        }
    },
    radiobox: function(radiobox_object,callback){
        var iweb_object = this;
        
        if(parseInt($('div.iweb-radiobox').length) == 0){
            $(document).off('click','div.iweb-radiobox > .options > div > input[type="radio"]');
            $(document).on('click','div.iweb-radiobox > .options > div > input[type="radio"]',function(){
                var selected_value = $(this).val();
                var related_object = $('input[type="radio"][name="'+$(this).attr('name')+'"]');
                $.each(related_object,function(){
                    $(this).parent().removeClass('error');
                    if(iweb_object.isMatch($(this).val(),selected_value)){
                        $(this).prop('checked', true);
                        $(this).parent().addClass('checked');
                    }
                    else {
                        $(this).prop('checked', false);
                        $(this).parent().removeClass('checked');
                    }
                });
            });
            
            $(document).off('click','div.iweb-radiobox > div.options > div > a');
            $(document).on('click','div.iweb-radiobox > div.options > div > a',function(){
                $(this).closest('.options').find('input[type="radio"]').trigger('click');
            });
        }
        
        if(!iweb_object.isValue(radiobox_object)){
           radiobox_object = $('body').find('input[type="radio"]');
        }
        
        var radiobox_group_name = [];
        radiobox_object.each(function(){
            if(!$(this).parent().parent().parent().hasClass('iweb-radiobox')){
                var find_radiobox_label = $(this).next();
                var ischecked = $(this).is(':checked');
                if(parseInt(find_radiobox_label.length) > 0 && iweb_object.isMatch(find_radiobox_label[0].nodeName,'label')){
                    $(this).wrap('<div class="iweb-radiobox"><div class="options"><div'+(ischecked?' class="checked"':'')+'></div></div><div class="virtual-msg">'+(find_radiobox_label[0].outerHTML)+'</div></div>');
                    find_radiobox_label.remove();
                }
                else {
                    $(this).wrap('<div class="iweb-radiobox"><div class="options"><div'+(ischecked?' class="checked"':'')+'></div></div><div class="virtual-msg">&nbsp;</div></div>');
                }
                if(ischecked){
                    $(this).attr('data-ori','checked');
                }
                $('<a>&nbsp;</a>').insertAfter($(this));
                radiobox_group_name.push($(this).attr('name'));
            }
        });
        
        radiobox_group_name = $.unique(radiobox_group_name);
        $.each(radiobox_group_name, function(key, value) {
            $('input[name="'+value+'"]').closest('div.iweb-radiobox').wrapAll('<div class="iweb-radiobox-set"></div>');
        });
        
        if(typeof callback == 'function'){
            callback();
        }
    },
    pagination: function(element,options){
        var iweb_object = this;
        
        if(iweb_object.isValue(options)){
            $(element).iweb_pagination(options);
        }
        else {
            $(element).iweb_pagination();
        }
    },
    alert: function(message,callback,options){
        if(parseInt($('div.iweb-alert-dialog').length) > 0){ return; }
        
        var iweb_object = this;
        var setting = {
            customizeClass: '',
            btnClose: iweb_object.language[iweb_object.default_language]['btn_confirm']
        };
        if(iweb_object.isValue(options)) {
            setting = $.extend(setting,options);
        }
        iweb_object.processing(false);
        
        var alert_html = '<div class="iweb-alert-dialog'+((iweb_object.isValue(setting.customizeClass))?(' '+setting.customizeClass):'')+'">';
            alert_html += '<div>';
                alert_html += '<div class="dialog-content">';
                    alert_html += '<div>';
                        alert_html += '<div class="message">';
                            alert_html += message;
                        alert_html += '</div>';
                        alert_html += '<button class="btn btn-close">'+setting.btnClose+'</button>';
                    alert_html += '</div>';
                alert_html += '</div>';
            alert_html += '</div>';
        alert_html += '</div>';
        
        $('div.iweb-viewer').prepend(alert_html).each(function(){
            $('body').addClass('iweb-disable-scroll');
            
            $(document).off('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-close');
            $(document).on('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-close', function(){
                $('div.iweb-alert-dialog').remove();
                if(parseInt($('div.iweb-alert-dialog').length) == 0 && parseInt($('div.iweb-info-dialog').length) == 0){
                    $('body').removeClass('iweb-disable-scroll');
                }
                if(typeof callback == 'function'){
                    callback();
                }
            });
        });
    },
    confirm: function(message,callback,options){
        if(parseInt($('div.iweb-alert-dialog').length) > 0){ return; }
        
        var iweb_object = this;
        var setting = {
            customizeClass: '',
            btnYes: iweb_object.language[iweb_object.default_language]['btn_yes'],
            btnNo: iweb_object.language[iweb_object.default_language]['btn_no']
        };
        if(iweb_object.isValue(options)) {
            setting = $.extend(setting,options);
        }
        iweb_object.processing(false);
        
        var confirm_html = '<div class="iweb-alert-dialog'+((iweb_object.isValue(setting.customizeClass))?(' '+setting.customizeClass):'')+'">';
            confirm_html += '<div>';
                confirm_html += '<div class="dialog-content">';
                    confirm_html += '<div>';
                        confirm_html += '<div class="message">';
                            confirm_html += message;
                        confirm_html += '</div>';
                        confirm_html += '<button class="btn btn-yes">'+setting.btnYes+'</button>';
                        confirm_html += '<button class="btn btn-no">'+setting.btnNo+'</button>';
                    confirm_html += '</div>';
                confirm_html += '</div>';
            confirm_html += '</div>';
        confirm_html += '</div>';
        
        $('div.iweb-viewer').prepend(confirm_html).each(function(){
            $('body').addClass('iweb-disable-scroll');
            
            $(document).off('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-yes');
            $(document).on('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-yes', function(){
                $('div.iweb-alert-dialog').remove();
                if(parseInt($('div.iweb-alert-dialog').length) == 0 && parseInt($('div.iweb-info-dialog').length) == 0){
                    $('body').removeClass('iweb-disable-scroll');
                }
                if(typeof callback == 'function'){
                    callback(true);
                }
            });
            
            $(document).off('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-no');
            $(document).on('click', 'div.iweb-alert-dialog > div > div.dialog-content > div > button.btn-no', function(){
                $('div.iweb-alert-dialog').remove();
                if(parseInt($('div.iweb-alert-dialog').length) == 0 && parseInt($('div.iweb-info-dialog').length) == 0){
                    $('body').removeClass('iweb-disable-scroll');
                }
                if(typeof callback == 'function'){
                    callback(false);
                }
            });
        });
    },
    dialog: function(htmlcode,init_func,callback,customizeClass){
        if(parseInt($('div.iweb-info-dialog').length) > 0){ return; }
        
        var iweb_object = this;
        iweb_object.processing(false);

        var dialog_html = '<div class="iweb-info-dialog'+((iweb_object.isValue(customizeClass))?(' '+customizeClass):'')+'">';
        
            dialog_html += '<div>';
                dialog_html += '<div class="dialog-loading">';
                    dialog_html += '<svg width="48px" height="48px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">'
                        dialog_html += '<circle cx="50" cy="50" fill="none" stroke="#dddddd" stroke-width="10" r="36" stroke-dasharray="169.64600329384882 58.548667764616276">'
                            dialog_html += '<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>'
                        dialog_html += '</circle>'
                    dialog_html += '</svg>';
                dialog_html += '</div>';

                dialog_html += '<div class="dialog-mask"></div>';

                dialog_html += '<div class="dialog-content">';
                    dialog_html += '<a class="btn btn-close"><div></div></a>';
                    dialog_html += '<div>';
                        dialog_html += htmlcode;
                    dialog_html += '</div>';
                dialog_html += '</div>';
            dialog_html += '</div>';
        dialog_html += '</div>';
    
        $('div.iweb-viewer').prepend(dialog_html).each(function(){
            $('body').addClass('iweb-disable-scroll');
            
            $(document).off('click', 'div.iweb-info-dialog > div > div.dialog-mask');
            $(document).on('click', 'div.iweb-info-dialog > div > div.dialog-mask', function(e){
                $('div.iweb-info-dialog').remove();
                $('body').removeClass('iweb-disable-scroll');
                if(typeof callback == 'function'){
                    callback();
                }
            });
            
            $(document).off('click', 'div.iweb-info-dialog > div > div.dialog-content > a.btn-close ');
            $(document).on('click', 'div.iweb-info-dialog > div > div.dialog-content > a.btn-close ', function(){
                $('div.iweb-info-dialog').remove();
                $('body').removeClass('iweb-disable-scroll');
                if(typeof callback == 'function'){
                    callback();
                }
            });
            
            iweb_object.selector();
            iweb_object.checkbox();
            iweb_object.radiobox();
            
            if($('div.iweb-info-dialog form').length > 0) {
                $('div.iweb-info-dialog form').find('input[type="text"],input[type="password"],input[type="date"],input[type="email"],input[type="number"],textarea').each(function() {
                    if(iweb_object.isValue($(this).data('ispassword'))) {
                        $(this).wrap('<div class="iweb-input"><div></div></div>');
                        $(this).parent().append('<button class="small switch-pwd-type" type="button"><i class="fa fa-eye-slash hide" style="display: block;"></i><i class="fa fa-eye show" style="display: none;"></i></button>')
                    }
                    else {
                        $(this).wrap('<div class="iweb-input"><div></div></div>');
                    }
                });
            }
            
            iweb_object.responsive();
            
            var delay_timer = setTimeout(function(){
                clearTimeout(delay_timer);
                $('div.iweb-info-dialog > div > div.dialog-loading').remove();
                $('div.iweb-info-dialog > div > div.dialog-content').animate({'opacity':1});
                if(typeof init_func == 'function'){
                    init_func();
                }
            }, 250);
        });
    },
    post: function(post_data,callback){
        var iweb_object = this;
        var local_time = iweb_object.getDateTime(null,'time');
        if(iweb_object.isValue(post_data)){
            var post_data = $.extend({
                url: '',
                values: {},
                dataType: 'json',
                showProcessing: true
            },post_data);
            
            post_data['values']['itoken'] = window.btoa(md5(iweb_object.csrf_token+'#dt'+local_time)+'%'+local_time);
            
            if(iweb_object.isValue(post_data.url)) {
                if(iweb_object.isMatch(post_data.showProcessing,true) || iweb_object.isMatch(post_data.showProcessing,1) || iweb_object.isMatch(post_data.showProcessing,2)){
                    iweb_object.processing(true,70);
                }
                
                $.ajax({
                    url: post_data.url,
                    type: 'post',
                    data: post_data.values,
                    dataType: post_data.dataType,
                    success: function(response_data){
                        if(typeof callback == 'function'){
                            callback(response_data);
                        }
                    },
                    error: function(xhr, status, thrownError){
                        iweb_object.processing(false);
                        var alert_error_message = thrownError;
                        if(iweb_object.isMatch(xhr.status,0)) {
                            alert_error_message = 'Unstable network, please chcek your network connection.';
                        }
                        else if(iweb_object.isMatch(xhr.status,404)) {
                            alert_error_message = 'The requested page not found.';
                        }
                        else if(iweb_object.isMatch(xhr.status,500)) {
                            alert_error_message = 'Internal Server Error.';
                        }
                        alert(alert_error_message);
                        return false;
                    },
                    complete: function(){
                        if(iweb_object.isMatch(post_data.showProcessing,true) || iweb_object.isMatch(post_data.showProcessing,1) || iweb_object.isMatch(post_data.showProcessing,2)){
                            if(!iweb_object.isMatch(post_data.showProcessing,2)){
                                iweb_object.processing(false);
                            }
                        }
                    }
                });
            }
        }
    },
    form: function(form_id,dataType,check_func,callback){
        var iweb_object = this;
        
        form_id = '#' + (form_id.toString().replace('#', ''));
        if(parseInt($(form_id).length) > 0){
            if(!iweb_object.isValue($(form_id).attr('method'))) {
                $(form_id).attr('method','post');
            }
            
            var showProcessing = true;
            if(iweb_object.isValue($(form_id).data('showProcessing'))) {
                showProcessing = $(form_id).data('showProcessing');
            }
            
            $(form_id).attr('autocomplete','off');
            $(form_id).ajaxForm({
                dataType: ((iweb_object.isValue(dataType))?dataType:'json'),
                forceSync: true,
                beforeSubmit: function(form_data, form_object){
                    if(iweb_object.processing_status){
                        return false;
                    }

                    var default_check_result = true;
                    form_object.find('div.iweb-input .error').removeClass('error');
                    form_object.find('div.iweb-selector .error').removeClass('error');
                    form_object.find('div.iweb-checkbox .error').removeClass('error');
                    form_object.find('div.iweb-radiobox .error').removeClass('error');
                    form_object.find('div.iweb-input small.tips').remove();
                    form_object.find('div.iweb-checkbox-set small.tips').remove();
                    form_object.find('div.iweb-radiobox-set small.tips').remove();
                    form_object.find('div.iweb-selector small.tips').remove();

                    form_object.find('input[data-validation="required"],textarea[data-validation="required"]').each(function() {
                        if(iweb_object.isMatch($(this).attr('type'),'checkbox')) {
                            if($(this).closest('div.iweb-checkbox-set').find('input[type="checkbox"]:checked').length == 0) {
                                if($(this).closest('div.iweb-checkbox-set').find('small.tips').length == 0) {
                                    if(iweb_object.isValue($(this).data('tips'))) {
                                        $(this).closest('div.iweb-checkbox-set').append('<small class="tips">'+$(this).data('tips')+'</small>');
                                    }
                                    else {
                                        $(this).closest('div.iweb-checkbox-set').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                                    }
                                }
                                $(this).parent().addClass('error');
                                default_check_result = false;
                            }
                        }
                        else if(iweb_object.isMatch($(this).attr('type'),'radio')) {
                            if($(this).closest('div.iweb-radiobox-set').find('input[type="radio"]:checked').length == 0) {
                                if($(this).closest('div.iweb-radiobox-set').find('small.tips').length == 0) {
                                    if(iweb_object.isValue($(this).data('tips'))) {
                                        $(this).closest('div.iweb-radiobox-set').append('<small class="tips">'+$(this).data('tips')+'</small>');
                                    }
                                    else {
                                        $(this).closest('div.iweb-radiobox-set').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                                    }
                                }
                                $(this).parent().addClass('error');
                                default_check_result = false;
                            }
                        }
                        else {
                            if(!iweb_object.isValue($(this).val())) {
                                if(iweb_object.isValue($(this).data('tips'))) {
                                    $(this).closest('div.iweb-input').append('<small class="tips">'+$(this).data('tips')+'</small>');
                                }
                                else {
                                    $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                                }
                                $(this).addClass('error');
                                default_check_result = false;
                            }
                        }
                    });
                    
                    form_object.find('input[data-validation="required|password"]').each(function() {
                        if(!iweb_object.isValue($(this).val())) {
                            if(iweb_object.isValue($(this).data('tips'))) {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+$(this).data('tips')+'</small>');
                            }
                            else {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                            }
                            $(this).addClass('error');
                            default_check_result = false;
                        }
                        else if(!iweb_object.isPassword($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['password_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="password"]').each(function() {
                       if(iweb_object.isValue($(this).val()) && !iweb_object.isPassword($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['password_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="required|email"]').each(function() {
                        if(!iweb_object.isValue($(this).val())) {
                            if(iweb_object.isValue($(this).data('tips'))) {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+$(this).data('tips')+'</small>');
                            }
                            else {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                            }
                            $(this).addClass('error');
                            default_check_result = false;
                        }
                        else if(!iweb_object.isEmail($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['email_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="email"]').each(function() {
                        if(iweb_object.isValue($(this).val()) && !iweb_object.isEmail($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['email_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="required|number"]').each(function() {
                        if(!iweb_object.isValue($(this).val())) {
                            if(iweb_object.isValue($(this).data('tips'))) {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+$(this).data('tips')+'</small>');
                            }
                            else {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                            }
                            $(this).addClass('error');
                            default_check_result = false;
                        }
                        else if(!iweb_object.isNumber($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['number_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="number"]').each(function() {
                        if(iweb_object.isValue($(this).val()) && !iweb_object.isNumber($(this).val())) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['number_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="required|date"]').each(function() {
                        if(!iweb_object.isValue($(this).val())) {
                            if(iweb_object.isValue($(this).data('tips'))) {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+$(this).data('tips')+'</small>');
                            }
                            else {
                                $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                            }
                            $(this).addClass('error');
                            default_check_result = false;
                        }
                        else if(!iweb_object.isDate($(this).val(), $(this).data('format'))) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['date_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('input[data-validation="date"]').each(function() {
                        if(iweb_object.isValue($(this).val()) && !iweb_object.isDate($(this).val(), $(this).data('format'))) {
                            $(this).closest('div.iweb-input').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['date_error']+'</small>');
                            $(this).addClass('error');
                            default_check_result = false; 
                        }
                    });
                    
                    form_object.find('select[data-validation="required"]').each(function() {
                        if(!iweb_object.isValue($(this).val()) || (iweb_object.isValue($(this).val()) && parseInt($(this).val()) === 0)) {
                            if(iweb_object.isValue($(this).data('tips'))) {
                                $(this).closest('div.iweb-selector').append('<small class="tips">'+$(this).data('tips')+'</small>');
                            }
                            else {
                                $(this).closest('div.iweb-selector').append('<small class="tips">'+iweb_object.language[iweb_object.default_language]['is_required']+'</small>');
                            }
                            $(this).closest('div.iweb-selector').find('select').addClass('error');
                            $(this).closest('div.iweb-selector').find('div.virtual').addClass('error');
                            default_check_result = false;
                        }
                    });
                    
                    if(typeof check_func == 'function'){
                        if(!check_func(form_data, form_object) || !default_check_result){
                            if($('div.iweb-tips-message').length > 0) {
                                if(default_check_result && iweb.isValue(iweb_object.language[iweb_object.default_language]['custom_error'])) {
                                    $('div.iweb-tips-message').html('<div class="error"><a class="close">×</a><span>'+iweb_object.language[iweb_object.default_language]['custom_error']+'</span></div>').each(function() {
                                        iweb_object.scrollto();
                                    });
                                }
                                else {
                                    $('div.iweb-tips-message').html('<div class="error"><a class="close">×</a><span>'+iweb_object.language[iweb_object.default_language]['required_error']+'</span></div>').each(function() {
                                        iweb_object.scrollto();
                                    });
                                }
                                iweb_object.language[iweb_object.default_language]['custom_error'] = '';
                            }
                            else {
                                if(default_check_result && iweb.isValue(iweb_object.language[iweb_object.default_language]['custom_error'])) {
                                    iweb_object.alert(iweb_object.language[iweb_object.default_language]['custom_error']);
                                }
                                else {
                                    iweb_object.alert(iweb_object.language[iweb_object.default_language]['required_error']);
                                }
                                iweb_object.language[iweb_object.default_language]['custom_error'] = '';
                            }
                            return false;
                        }
                    }
                    else if(!default_check_result) {
                        if($('div.iweb-tips-message').length > 0) {
                            $('div.iweb-tips-message').html('<div class="error"><a class="close">×</a><span>'+iweb_object.language[iweb_object.default_language]['required_error']+'</span></div>').each(function() {
                                iweb_object.scrollto();
                            });
                        }
                        else {
                            iweb_object.alert(iweb_object.language[iweb_object.default_language]['required_error']);
                        }
                        return false;
                    }
                    
                    iweb_object.processing_status = true;
                    if(iweb_object.isMatch(showProcessing,true) || iweb_object.isMatch(showProcessing,1) || iweb_object.isMatch(showProcessing,2)) {
                        iweb_object.processing(true,70);
                    }
                    
                    if(iweb_object.csrf_token.length > 0){
                        var local_time = iweb_object.getDateTime(null,'time');
                        form_data.push({
                            name: 'itoken',
                            value: window.btoa(md5(iweb_object.csrf_token+'#dt'+local_time)+'%'+local_time)
                        });
                    }
                    
                    if(typeof check_func != 'function'){
                        return true;
                    }
                },
                success: function(response_data, statusText, xhr, form_object){
                    iweb_object.processing_status = false;
                    if(iweb_object.isMatch(showProcessing,true) || iweb_object.isMatch(showProcessing,1) || iweb_object.isMatch(showProcessing,2)) {
                        if(!iweb_object.isMatch(showProcessing,2)) {
                            iweb_object.processing(false);
                        }
                    }
                    if(typeof callback == 'function'){
                        callback(response_data, form_object);
                    }
                    return true;
                },
                error: function(xhr, status, thrownError){
                    iweb_object.processing_status = false;
                    iweb_object.processing(false);
                    var alert_error_message = thrownError;
                    if(iweb_object.isMatch(xhr.status,0)) {
                        alert_error_message = 'Unstable network, please chcek your network connection.';
                    }
                    else if(iweb_object.isMatch(xhr.status,404)) {
                        alert_error_message = 'The requested page not found.';
                    }
                    else if(iweb_object.isMatch(xhr.status,500)) {
                        alert_error_message = 'Internal Server Error.';
                    }
                    alert(alert_error_message);
                    return false;
                }
            });
        }
    },
    uploader: function(options,callback) {
        var iweb_object = this;
        
        var files_input = document.createElement('input');
        files_input.type = 'file';
        files_input.multiple = true;
        files_input.onchange = function(){
            iweb_object.uploader_files = files_input.files;
            iweb_object.uploader_files_skip = [-1];
            iweb_object.uploader_options = {
                url: '',
                values: {},
                dataType: 'json',
                allowed_types: '',
                max_filesize: 8,
                type_error_message: iweb_object.language[iweb_object.default_language]['type_error'],
                max_error_message: iweb_object.language[iweb_object.default_language]['max_error'],
                btnStartAll: '<i class="fa fa-upload"></i>',
                btnClose: '<i class="fa fa-close"></i>',
                btnStart: '<i class="fa fa-upload"></i>',
                btnRemove: '<i class="fa fa-trash"></i>'
            };

            if(iweb_object.isValue(options)) {
                iweb_object.uploader_options = $.extend(iweb_object.uploader_options, options);
            }

            if(iweb_object.isValue(iweb_object.uploader_options.allowed_types)) {
                iweb_object.uploader_options.allowed_types = iweb_object.uploader_options.allowed_types.split('|');
            }
            iweb_object.uploader_options.max_error_message = iweb_object.uploader_options.max_error_message.replace('{num}',iweb_object.uploader_options.max_filesize);

            if(iweb_object.isValue(iweb_object.uploader_options.url) && parseInt(iweb_object.uploader_files.length) > 0) {
                var uploader = '<div class="action">';
                    uploader += '<button class="start-all" type="button" title="Start All">';
                        uploader += '<i class="fa fa-upload"></i>',
                    uploader += '</button>'

                    uploader += '<button class="close" type="button" title="Close">';
                        uploader += '<i class="fa fa-close"></i>',
                    uploader += '</button>'
                uploader += '</div>';
                uploader += '<div class="list"></div>';

                iweb_object.dialog(uploader,function() {
                    iweb_object.uploaderPreview(iweb_object.uploader_files);

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all',function() {
                        var loop_upload_index = [];
                        var last_upload_index = 0;
                        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item').each(function() {
                            loop_upload_index.push($(this).data('index'));
                            last_upload_index = $(this).data('index');
                        });
                        iweb_object.uploaderStart(-1, loop_upload_index, last_upload_index);
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.close');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.close',function() {
                        $('div.iweb-info-dialog > div > div.dialog-content > a.btn-close').trigger('click');
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start',function() {
                        iweb_object.uploaderStart($(this).closest('div.item').data('index'));
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.remove');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.remove',function() {
                        iweb_object.uploader_files_skip.push($(this).closest('div.item').data('index'));
                        $(this).closest('div.item').remove();
                        if($('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item').length == 0) {
                            $('div.iweb-info-dialog > div > div.dialog-content > a.btn-close').trigger('click');
                        }
                    });
                },function() {
                    if(typeof callback == 'function'){
                        callback();
                    }
                }, 'uploader');
            }
        };
        files_input.click();
    },
    uploaderArea: function(file_input_id,options,callback) {
        var iweb_object = this;
        
        var files_input = document.getElementById(file_input_id);
        files_input.multiple = true;
        files_input.onchange = function(){
            iweb_object.uploader_files = files_input.files;
            iweb_object.uploader_files_skip = [-1];
            iweb_object.uploader_options = {
                url: '',
                values: {},
                dataType: 'json',
                allowed_types: '',
                max_filesize: 8,
                type_error_message: iweb_object.language[iweb_object.default_language]['type_error'],
                max_error_message: iweb_object.language[iweb_object.default_language]['max_error'],
                btnStartAll: '<i class="fa fa-upload"></i>',
                btnClose: '<i class="fa fa-close"></i>',
                btnStart: '<i class="fa fa-upload"></i>',
                btnRemove: '<i class="fa fa-trash"></i>'
            };

            if(iweb_object.isValue(options)) {
                iweb_object.uploader_options = $.extend(iweb_object.uploader_options, options);
            }

            if(iweb_object.isValue(iweb_object.uploader_options.allowed_types)) {
                iweb_object.uploader_options.allowed_types = iweb_object.uploader_options.allowed_types.split('|');
            }
            iweb_object.uploader_options.max_error_message = iweb_object.uploader_options.max_error_message.replace('{num}',iweb_object.uploader_options.max_filesize);

            if(iweb_object.isValue(iweb_object.uploader_options.url) && parseInt(iweb_object.uploader_files.length) > 0) {
                var uploader = '<div class="action">';
                    uploader += '<button class="start-all" type="button" title="Start All">';
                        uploader += '<i class="fa fa-upload"></i>',
                    uploader += '</button>'

                    uploader += '<button class="close" type="button" title="Close">';
                        uploader += '<i class="fa fa-close"></i>',
                    uploader += '</button>'
                uploader += '</div>';
                uploader += '<div class="list"></div>';

                iweb_object.dialog(uploader,function() {
                    iweb_object.uploaderPreview(iweb_object.uploader_files);

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all',function() {
                        var loop_upload_index = [];
                        var last_upload_index = 0;
                        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item').each(function() {
                            loop_upload_index.push($(this).data('index'));
                            last_upload_index = $(this).data('index');
                        });
                        iweb_object.uploaderStart(-1, loop_upload_index, last_upload_index);
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.close');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.close',function() {
                        $('div.iweb-info-dialog > div > div.dialog-content > a.btn-close').trigger('click');
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start',function() {
                        iweb_object.uploaderStart($(this).closest('div.item').data('index'));
                    });

                    $(document).off('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.remove');
                    $(document).on('click','div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.remove',function() {
                        iweb_object.uploader_files_skip.push($(this).closest('div.item').data('index'));
                        $(this).closest('div.item').remove();
                        if($('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item').length == 0) {
                            $('div.iweb-info-dialog > div > div.dialog-content > a.btn-close').trigger('click');
                        }
                    });
                },function() {
                    document.getElementById(file_input_id).value = '';
                    if(typeof callback == 'function'){
                        callback();
                    }
                }, 'uploader');
            }
        };
        files_input.click();
    },
    uploaderPreview: function(selectingFiles,key) {
        var iweb_object = this;
        
        const regex = /^(.*)(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if(!iweb_object.isValue(key)) { key = 0; }
        if(parseInt(key) < selectingFiles.length) {
            var file = selectingFiles[key];
            if(regex.test(file.name.toLowerCase()) && (typeof (FileReader) !== 'undefined')) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var extension = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
                    var checking = true;
                    var uploader = '<div class="item" data-index="'+key+'">';
                        uploader += '<div class="photo">';
                            uploader += '<img src="'+e.target.result+'"/>';
                        uploader += '</div>';

                        uploader += '<div class="info">';
                            uploader += '<div class="title">'+(file.name)+'</div>';
                            uploader += '<div class="size">'+iweb_object.formatBytes(file.size, 0)+'</div>';
                            if(iweb_object.isValue(iweb_object.uploader_options.allowed_types) && $.inArray(extension.toLowerCase(),iweb_object.uploader_options.allowed_types) < 0) {
                                uploader += '<div class="tips"><small>'+iweb_object.uploader_options.type_error_message+'</small></div>';
                                checking = false;
                            }
                            else if(file.size > iweb_object.uploader_options.max_filesize*1024*1024) {
                                uploader += '<div class="tips"><small>'+iweb_object.uploader_options.max_error_message+'</small></div>';
                                checking = false;
                            }
                            else {
                                uploader += '<div class="progress-bar"><div class="percent"></div></div>';
                            }
                        uploader += '</div>';
                        
                        if(checking) {
                            uploader += '<button class="start" type="button"><i class="fa fa-upload"></i></button>';
                        }
                        uploader += '<button class="remove" type="button"><i class="fa fa-trash"></i></button>';
                    uploader += '</div>';
                    
                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list').append(uploader).each(function() {
                        key = key + 1;
                        iweb_object.uploaderPreview(selectingFiles, key);
                    });
                }
                reader.readAsDataURL(file);    
            }
            else {
                var extension = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
                var checking = true;

                var uploader = '<div class="item" data-index="'+key+'">';
                    uploader += '<div class="photo">';
                        switch(extension.toLowerCase()) {
                            case 'pdf':
                                uploader += '<i class="fa fa-file-pdf-o" style="color:#ef4130;"></i>';
                                break;
                            case 'doc':
                            case 'docx':
                                uploader += '<i class="fa fa-file-word-o" style="color:#5091cd;"></i>';
                                break;
                            case 'xls':
                            case 'xlsx':
                                uploader += '<i class="fa fa-file-excel-o" style="color:#66cdaa;"></i>';
                                break;
                            case 'ppt':
                            case 'pptx':
                                uploader += '<i class="fa fa-file-powerpoint-o" style="color:#f7b002;"></i>';
                                break;
                            case 'txt':
                                uploader += '<i class="fa fa-file-text-o"></i>';
                                break;
                            case 'jpeg':
                            case 'jpg':
                            case 'gif':
                            case 'png':
                            case 'bmp':
                                uploader += '<i class="fa fa-file-image-o" style="color:#ef4130;"></i>';
                                break;
                            case 'avi':
                            case 'mov':
                            case 'mp4':
                            case 'ogg':
                            case 'wmv':
                            case 'webm':
                                uploader += '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>';
                                break;
                            case 'mp3':
                            case 'ogg':
                            case 'wav':
                                uploader += '<i class="fa fa-file-audio-o" style="color:#66cdaa;"></i>';
                                break;
                            case 'rar':
                            case 'zip':
                                uploader += '<i class="fa fa-file-zip-o" style="color:#f7b002;"></i>';
                                break;
                            default:
                                uploader += '<i class="fa fa-file-code-o"></i>';    
                        }
                    uploader += '</div>';

                    uploader += '<div class="info">';
                        uploader += '<div class="title">'+(file.name)+'</div>';
                        uploader += '<div class="size">'+iweb_object.formatBytes(file.size, 0)+'</strong></div>';
                        if(iweb_object.isValue(iweb_object.uploader_options.allowed_types) && $.inArray(extension.toLowerCase(),iweb_object.uploader_options.allowed_types) < 0) {
                            uploader += '<div class="tips"><small>'+iweb_object.uploader_options.type_error_message+'</small></div>';
                            checking = false;
                        }
                        else if(file.size > iweb_object.uploader_options.max_filesize*1024*1024) {
                            uploader += '<div class="tips"><small>'+iweb_object.uploader_options.max_error_message+'</small></div>';
                            checking = false;
                        }
                        else {
                            uploader += '<div class="progress-bar"><div class="percent"></div></div>';
                        }
                    uploader += '</div>';
                    
                    if(checking) {
                        uploader += '<button class="start" type="button"><i class="fa fa-upload"></i></button>';
                    }
                    uploader += '<button class="remove" type="button"><i class="fa fa-trash"></i></button>';
                uploader += '</div>';
                
                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list').append(uploader).each(function() {
                    key = key + 1;
                    iweb_object.uploaderPreview(selectingFiles, key);
                });
            }
        }
    },
    uploaderStart: function(index,loop_upload_index,last_upload_index) {
        var iweb_object = this;
        
        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all').css('display', 'none');
        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start').css('display', 'none');
        
        if(iweb_object.isValue(loop_upload_index)) {
            index = index+1;
            if(parseInt(index) <= parseInt(last_upload_index)) {
                if($.inArray(index, loop_upload_index) < 0) {
                    iweb_object.uploaderStart(index, loop_upload_index, last_upload_index);
                }
                else {
                    if(iweb_object.isValue(iweb_object.uploader_files) && $.inArray(index, iweb_object.uploader_files_skip) < 0) {

                        var selectingFiles = iweb_object.uploader_files;
                        var local_time = iweb_object.getDateTime(null,'time');
                        var formData = new FormData();
                        formData.append('page_action', 'file_upload');
                        formData.append('itoken', window.btoa(md5(iweb_object.csrf_token+'#dt'+local_time)+'%'+local_time));

                        if(iweb_object.isValue(iweb_object.uploader_options.values)) {
                            $.each(iweb_object.uploader_options.values,function(key, value) {
                                formData.append(key, value);
                            });
                        }
                        formData.append('myfile', selectingFiles[index], selectingFiles[index].name);
                        iweb_object.uploader_files_skip.push(index);

                        var extension = selectingFiles[index].name.slice((selectingFiles[index].name.lastIndexOf('.') - 1 >>> 0) + 2);
                        var checking = true;

                        if(iweb_object.isValue(iweb_object.uploader_options.allowed_types) && $.inArray(extension.toLowerCase(),iweb_object.uploader_options.allowed_types) < 0) {
                            checking = false;
                        }
                        else if(selectingFiles[index].size > iweb_object.uploader_options.max_filesize*1024*1024) {
                            checking = false;
                        }

                        if(checking) {
                            $.ajax({
                                url: iweb_object.uploader_options.url,
                                type: 'post',
                                data: formData,
                                dataType: iweb_object.uploader_options.dataType,
                                processData: false,
                                contentType: false,
                                cache: false,
                                enctype: 'multipart/form-data',
                                success: function(response_data){
                                    if(iweb_object.isValue(response_data)) {
                                        if(iweb_object.isValue(response_data.message)) {
                                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.progress-bar').remove();
                                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.info').append('<div class="tips"><small>'+response_data.message+'</small></div>');
                                        }
                                        else {
                                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.progress-bar').remove();
                                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.info').append('<div class="tips"><small>'+response_data+'</small></div>');
                                        }
                                    }
                                },
                                error: function(xhr, status, thrownError){
                                    alert(thrownError);
                                    return false;
                                },
                                complete: function() {
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').remove();
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').remove();
                                    iweb_object.uploaderStart(index, loop_upload_index, last_upload_index);
                                },
                                xhr: function () {
                                    var fileXhr = $.ajaxSettings.xhr();
                                    if(fileXhr.upload) {
                                        fileXhr.upload.addEventListener('progress', function (e) {
                                            if(e.lengthComputable) {
                                                var percentage = Math.ceil(((e.loaded / e.total) * 100));
                                                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.percent').css('width', percentage+'%');
                                                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').hide();
                                                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').hide();
                                            }
                                        }, false);
                                    }
                                    return fileXhr;
                                }
                            });
                        }
                        else {
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').remove();
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').remove();
                            iweb_object.uploaderStart(index, loop_upload_index, last_upload_index);
                        }
                    }
                    else {
                        iweb_object.uploaderStart(index, loop_upload_index, last_upload_index);
                    }
                }
            }
            else {
                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all').css('display', 'inline-block');
                $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start').css('display', 'inline-block');
            }
        }
        else {
            if(iweb_object.isValue(iweb_object.uploader_files) && $.inArray(index, iweb_object.uploader_files_skip) < 0) {

                var selectingFiles = iweb_object.uploader_files;
                var local_time = iweb_object.getDateTime(null,'time');
                var formData = new FormData();
                formData.append('page_action', 'file_upload');
                formData.append('itoken', window.btoa(md5(iweb_object.csrf_token+'#dt'+local_time)+'%'+local_time));

                if(iweb_object.isValue(iweb_object.uploader_options.values)) {
                    $.each(iweb_object.uploader_options.values,function(key, value) {
                        formData.append(key, value);
                    });
                }
                formData.append('myfile', selectingFiles[index], selectingFiles[index].name);
                iweb_object.uploader_files_skip.push(index);

                var extension = selectingFiles[index].name.slice((selectingFiles[index].name.lastIndexOf('.') - 1 >>> 0) + 2);
                var checking = true;

                if(iweb_object.isValue(iweb_object.uploader_options.allowed_types) && $.inArray(extension.toLowerCase(),iweb_object.uploader_options.allowed_types) < 0) {
                    checking = false;
                }
                else if(selectingFiles[index].size > iweb_object.uploader_options.max_filesize*1024*1024) {
                    checking = false;
                }

                if(checking) {
                    $.ajax({
                        url: iweb_object.uploader_options.url,
                        type: 'post',
                        data: formData,
                        dataType: iweb_object.uploader_options.dataType,
                        processData: false,
                        contentType: false,
                        cache: false,
                        enctype: 'multipart/form-data',
                        success: function(response_data){
                            if(iweb_object.isValue(response_data)) {
                                if(iweb_object.isValue(response_data.message)) {
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.progress-bar').remove();
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.info').append('<div class="tips"><small>'+response_data.message+'</small></div>');
                                }
                                else {
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.progress-bar').remove();
                                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.info').append('<div class="tips"><small>'+response_data+'</small></div>');
                                }
                            }
                        },
                        error: function(xhr, status, thrownError){
                            alert(thrownError);
                            return false;
                        },
                        complete: function() {
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.action > button.start-all').css('display', 'inline-block');
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item > button.start').css('display', 'inline-block');
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').remove();
                            $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').remove();
                        },
                        xhr: function () {
                            var fileXhr = $.ajaxSettings.xhr();
                            if(fileXhr.upload) {
                                fileXhr.upload.addEventListener('progress', function (e) {
                                    if(e.lengthComputable) {
                                        var percentage = Math.ceil(((e.loaded / e.total) * 100));
                                        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('div.percent').css('width', percentage+'%');
                                        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').hide();
                                        $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').hide();
                                    }
                                }, false);
                            }
                            return fileXhr;
                        }
                    });
                }
                else {
                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.start').remove();
                    $('div.iweb-info-dialog.uploader > div > div.dialog-content > div > div.list > div.item[data-index="'+index+'"]').find('button.remove').remove();
                }
            }
        }
       
    },
    formatBytes:function(bytes,decimals) {
        if(!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = (decimals < 0) ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm))+sizes[i];
    },
    isValue:function(value){
        if(value !== null && (typeof value !== 'undefined')){
            if(typeof value === 'object' || typeof value === 'array'){
                if(parseInt(Object.keys(value).length) > 0){
                    return true;
                } else {
                    return false;
                }
            } else if(typeof value === 'boolean'){
                return value;
            } else {
                if($.trim(value) !== ''){
                    return true;
                } else {
                    return false
                }
            }
        } else {
            return false;
        }
    },
    isNumber: function(value,digital_mode){
        var iweb_object = this;
        
        if(!iweb_object.isValue(value)){
            return false;
        } else {
            var reg = /(^((-)?[1-9]{1}\d{0,2}|0\.|0$))(((\d)+)?)(((\.)(\d+))?)$/;
            if(iweb_object.isMatch(digital_mode,true)){
                reg = /^[0-9]+$/;
            }
            return reg.test(value);
        }
    },
    toNumber: function(value,currency_mode, decimal){
        var iweb_object = this;
        
        value = value.toString().replace( /[^\d|\-|\.]/g, '');
        if(iweb_object.isNumber(value)){
            if(iweb_object.isNumber(decimal) && parseInt(decimal) > 0){
                var power10 = Math.pow(10, decimal);
                value = value * power10;
                value = (Math.round(value) /power10).toString();
                var dpp = value.indexOf('.');
                if(dpp < 0){
                    dpp = value.length;
                    value += '.';
                }
                while (value.length <= dpp + decimal){
                    value += '0';
                }
            }
            if(iweb_object.isMatch(currency_mode,true)){
                return value.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
            }
            else {
                return value;
            }
        }
        return 0;
    },
    isEmail: function(value){
        var iweb_object = this;
        
        if(!iweb_object.isValue(value)){
            return false;
        } else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
            return reg.test(value);
        }
    },
    isPassword: function(value){
        var iweb_object = this;
        
        if(!iweb_object.isValue(value)){
            return false;
        } else {
            var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            return reg.test(value);
        }
    },
    isDate: function(value, format){
        var iweb_object = this;
        
        if(!iweb_object.isValue(value)){
            return false;
        } else {
            var reg = /^(\d{4})(\-)(\d{2})(\-)(\d{2})$/;
            if(!iweb_object.isMatch(format, 'y-m-d')) {
                value = value.split('/').reverse().join('-');
            }

            if(reg.test(value)) {
                var ymd_checking = true;
                var parts = value.split('-');
                var day = parseInt(parts[2]);
                var month = parseInt(parts[1]);
                var year = parseInt(parts[0]);
                if (isNaN(day) || isNaN(month) || isNaN(year)) {
                    ymd_checking = false;
                }
                else {
                    if (year <= 0 || month <= 0 || month > 12 || day <=0) {
                        ymd_checking = false;
                    }
                    else if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
                        ymd_checking = false;
                    }
                    else if ((month == 4 || month == 6 || month == 9 || month == 11 ) && day > 30) {
                        ymd_checking = false;
                    }
                    else if (month == 2) {
                        if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
                            if (day > 29) {
                                ymd_checking = false;
                            }
                        } else {
                            if (day > 28) {
                                ymd_checking = false;
                            }
                        }      
                    }
                }
                
                return (new Date(value) instanceof Date) && ymd_checking;
            }
            else {
                return false;
            }
        }
    },
    isMatch: function(value1,value2,sensitive){
        var iweb_object = this;
        
        if(iweb_object.isValue(value1) && iweb_object.isValue(value2)){
            if(iweb_object.isValue(sensitive) && (sensitive || parseInt(sensitive) === 1)){
                if($.trim(value1).toString() === $.trim(value2).toString()){
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if($.trim(value1).toString().toLowerCase() === $.trim(value2).toString().toLowerCase()){
                    return true;
                }
                else {
                    return false;
                }
            }
        } else {
            return false;
        }
    },
    stringLength: function(string, maxlength){
        var i, sum;   
        sum = 0;   
        for (i = 0; i < string.length; i++){   
            if((string.charCodeAt(i) >= 0) && (string.charCodeAt(i) <= 255)){
                sum = sum + 1;   
            } else {
                sum = sum + 2;   
            }   
        }
        if(parseInt(maxlength) > 0){
            return (sum > parseInt(maxlength));
        }
        else {
            return sum;
        }
    },
    detectDevice: function(index){
        var isMobile= {
            Android: function(){
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function(){
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function(){
                return navigator.userAgent.match(/Mac|iPhone|iPad|iPod/i);
            },
            Opera: function(){
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function(){
                return navigator.userAgent.match(/IEMobile/i);
            }
        };
        switch (index){
            case 'android':
                return isMobile.Android();
                break;
            case 'blackberry':
                return isMobile.BlackBerry();
                break;
            case 'ios':
                return isMobile.iOS();
                break;
            case 'opera':
                return isMobile.Opera();
                break;
            case 'windows':
                return isMobile.Windows();
                break;
            default: return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    },
    setCookie: function(cname, cvalue, exdays){
        if(navigator.cookieEnabled){
            var iweb_object = this;
            if(iweb_object.isValue(cname)){
                if(!iweb_object.isValue(exdays)){
                    exdays = 12;
                }
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = 'expires='+d.toUTCString();
                document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
            }
        }
        else {
            alert('Cookies Blocked or not supported by your browser.');
        }
    },
    getCookie: function(cname){
        if(navigator.cookieEnabled){
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++){
                var c = ca[i];
                while (c.charAt(0) == ' '){
                    c = c.substring(1);
                }
                if(c.indexOf(name) == 0){
                    return c.substring(name.length, c.length);
                }
            }
        }
        else {
            alert('Cookies Blocked or not supported by your browser.');
        }
        return '';
    },
    getUrl: function(){
        return (window.location.href.split('?')[0]).toString();
    },
    getUrlParameter: function(name){
        var iweb_object = this;
        
        var parameter_value = '';
        if(iweb_object.isValue(name)){
            var urlParameters = window.location.search.substring(1).split('&');
            for (var i = 0; i < parseInt(urlParameters.length); i++){
                var currentParameter = urlParameters[i].split('=');
                var currentParameter_index = currentParameter[0];
                var currentParameter_value = currentParameter[1];
                if(iweb_object.isValue(currentParameter_index) && iweb_object.isValue(currentParameter_value)){
                    if(iweb_object.isMatch(currentParameter_index,name)){
                        parameter_value = currentParameter_value;
                        break;
                    }
                }
            }
        }
        return parameter_value;
    },
    randomNum: function(min,max){
        var iweb_object = this;
        
        if(!iweb_object.isValue(min) || parseInt(min) < 0){
            min = 0;
        }
        if(!iweb_object.isValue(max) || parseInt(max) < 1){
            max = 1;
        }
        min = parseInt(min);
        max = parseInt(max);
        if(parseInt(min) > parseInt(max)){
            min = 0;
            max = 1;
        }
        return parseInt(Math.random()*(max+1-min)+min);
    },
    randomString: function(length){
        var iweb_object = this;
        
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        if(!iweb_object.isNumber(length)){
            length = 12;
        }
        var result = '';
        for (var i=0; i< length; i++){
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum,rnum+1);
        }
        return result;
    },
    getDateTime:function(string,format){
        var iweb_object = this;
        
        var now = new Date();
        if(iweb_object.isValue(string)){
            now = new Date(string);
        }
        if(iweb_object.isMatch(format,'time')){
            return now.getTime();
        }
        else {
            var year = now.getFullYear();
            var month = now.getMonth()+1; 
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if(month.toString().length == 1){
                 month = '0'+month;
            }
            if(day.toString().length == 1){
                 day = '0'+day;
            }   
            if(hour.toString().length == 1){
                 hour = '0'+hour;
            }
            if(minute.toString().length == 1){
                 minute = '0'+minute;
            }
            if(second.toString().length == 1){
                 second = '0'+second;
            }
            if(!iweb_object.isValue(format)){
                format = 'y-m-d h:i:s'
            }
            var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
            switch(format){
                case 'y-m-d h:i:s':
                    dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
                    break;
                case 'y-m-d h:i':
                    dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute;
                    break;
                case 'd/m/y h:i:s':
                    dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
                    break;
                case 'd/m/y h:i':
                    dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute;
                    break;
                case 'y-m-d':
                    dateTime = year+'-'+month+'-'+day;
                    break;
                case 'd/m/y':
                    dateTime = day+'/'+month+'/'+year;
                    break;
                case 'h:i:s':
                    dateTime = hour+':'+minute+':'+second;
                    break;
                case 'h:i':
                    dateTime = hour+':'+minute;
                    break;
                case 'Y':
                    dateTime = year;
                    break;
                case 'm':
                    dateTime = month;
                    break;
                case 'd':
                    dateTime = day;
                    break;
                case 'h':
                    dateTime = hour;
                    break;
                case 'i':
                    dateTime = minute
                    break;
                case 's':
                    dateTime = second
                    break;
            }
            return dateTime;
        }
    }
};

$(document).ready(function(){
    iweb.initialize();
});

$(window).on('load',function(){
    if(typeof iweb_layout_done == 'function'){
        iweb_layout_done(iweb.win_width);
    }
    if(typeof iweb_ilayout_done == 'function'){
        iweb_ilayout_done(iweb.win_width);
    }
    if(typeof iweb_func_done == 'function'){
        iweb_func_done();
    }
    if(typeof iweb_ifunc_done == 'function'){
        iweb_ifunc_done();
    }
    var delay_timer = setTimeout(function(){
        clearTimeout(delay_timer);
        iweb.init_status = true;
        iweb.processing(false, 500);
    }, 250);
});

$(window).on('resize',function(){
    if(iweb.resizing()){
        $('div.iweb-selector').removeClass('show');
        var delay_timer = setTimeout(function(){
            clearTimeout(delay_timer);
            iweb.responsive();
            if(typeof iweb_layout == 'function'){
                iweb_layout(iweb.win_width);
            }
            if(typeof iweb_ilayout == 'function'){
                iweb_ilayout(iweb.win_width);
            }
        }, 250);
    }
});

$(window).on('scroll',function(){
    if(iweb.init_status){
        iweb.win_scroll_top = parseInt($(window).scrollTop());
        if(typeof iweb_scroll == 'function'){
            iweb_scroll(parseInt($(window).scrollTop()));
        }
        if(typeof iweb_iscroll == 'function'){
            iweb_iscroll(parseInt($(window).scrollTop()));
        }
    }
});
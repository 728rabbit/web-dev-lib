/* FitVids 1.1 | Copyright 2013, Chris Coyier */
!function(t){"use strict";t.fn.fitVids=function(e){var i={customSelector:null,ignore:null};if (!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("div");a.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed{position:absolute;top:0;left:0;width:100%;height:100%;}</style>',r.appendChild(a.childNodes[1])}return e&&t.extend(i,e),this.each(function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&e.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var a=t(this).find(e.join(","));(a=(a=a.not("object object")).not(r)).each(function(){var e=t(this);if (!(e.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){e.css("height")||e.css("width")||!isNaN(e.attr("height"))&&!isNaN(e.attr("width"))||(e.attr("height",9),e.attr("width",16));var i=("object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height())/(isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10));if (!e.attr("name")){var a="fitvid"+t.fn.fitVids._count;e.attr("name",a),t.fn.fitVids._count++}e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),e.removeAttr("height").removeAttr("width")}})})},t.fn.fitVids._count=0}(window.jQuery||window.Zepto);

/* jQuery Form Plugin v4.2.2 | Copyright 2017 Kevin Morris Copyright 2006 M. Alsup */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if (!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if (0===n.length)return;r=n[0]}var i=r.form;if (i.clk=r,"image"===r.type)if (void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if ("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if (e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if (!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if (t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if (f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if (!x.aborted&&!X){if ((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if (t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if (O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if (T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if (a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if (l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if (p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if (l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if (S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if (f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if (x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if (!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if (this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if (t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if (t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if (t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if (this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if (t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if (t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if (t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if (t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if (("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if (0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if (c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if (m=c[l],(d=m.name)&&!m.disabled)if (t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if ((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if (i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if (g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if (!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if (a){var n=e.fieldValue(this,t);if (n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if (void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if ("select"===o){var s=t.selectedIndex;if (s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if (p.selected&&!p.disabled){var m=p.value;if (m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if (this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if ("checkbox"===r||"radio"===r)this.checked=t;else if ("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/* Scrollbar */
!function(l,e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof exports?module.exports=e(require("jquery")):e(jQuery)}(0,function(l){"use strict";var e={data:{index:0,name:"iscroll"},firefox:/firefox/i.test(navigator.userAgent),macosx:/mac/i.test(navigator.platform),msedge:/edge\/\d+/i.test(navigator.userAgent),msie:/(msie|trident)/i.test(navigator.userAgent),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};e.scrolls.add=function(l){this.remove(l).push(l)},e.scrolls.remove=function(e){for(;l.inArray(e,this)>=0;)this.splice(l.inArray(e,this),1);return this};var s={mode:"outer",autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,isRtl:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onFallback:null,onInit:null,onScroll:null,onUpdate:null},o=function(o){var i;e.scroll||(e.overlay=!((i=c(!0)).height||i.width),e.scroll=c(),n(),l(window).resize(function(){var l=!1;if(e.scroll&&(e.scroll.height||e.scroll.width)){var s=c();s.height===e.scroll.height&&s.width===e.scroll.width||(e.scroll=s,l=!0)}n(l)})),this.container=o,this.namespace=".iscroll-"+e.data.index++,this.options=l.extend({},s,window.jQueryiscrollOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},o.data(e.data.name,this),e.scrolls.add(this)};o.prototype={destroy:function(){if(this.wrapper){this.container.removeData(e.data.name),e.scrolls.remove(this);var s=this.container.scrollLeft(),o=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("iscroll-content iscroll-scrollx-visible iscroll-visible").off(this.namespace).scrollLeft(s).scrollTop(o),this.scrollx.scroll.removeClass("iscroll-scrollx-visible").find("div").addBack().off(this.namespace),this.scrolly.scroll.removeClass("iscroll-visible").find("div").addBack().off(this.namespace),this.wrapper.remove(),l(document).add("body").off(this.namespace),l.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(s){var o=this,i=this.container,r=this.containerWrapper||i,t=this.namespace,n=l.extend(this.options,s||{}),c={x:this.scrollx,y:this.scrolly},d=this.wrapper,h={},u={scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop()};if(e.mobile&&n.ignoreMobile||e.overlay&&n.ignoreOverlay||e.macosx&&!e.webkit)return l.isFunction(n.onFallback)&&n.onFallback.apply(this,[i]),!1;if(d)(h={height:"auto","margin-bottom":-1*e.scroll.height+"px","max-height":""})[n.isRtl?"margin-left":"margin-right"]=-1*e.scroll.width+"px",r.css(h);else{var f=i.attr("class");if(this.wrapper=d=l("<div>").addClass(f).addClass("iscroll").addClass("iscroll-"+n.mode).css("position","absolute"===i.css("position")?"absolute":"relative").insertBefore(i).append(i),n.isRtl&&d.addClass("iscroll-rtl"),i.is("textarea")&&(this.containerWrapper=r=l("<div>").insertBefore(i).append(i),d.addClass("iscroll-textarea")),(h={height:"auto","margin-bottom":-1*e.scroll.height+"px","max-height":""})[n.isRtl?"margin-left":"margin-right"]=-1*e.scroll.width+"px",r.removeClass(f).addClass("iscroll-content").css(h),i.on("scroll"+t,function(s){var r=i.scrollLeft(),t=i.scrollTop();if(n.isRtl)switch(!0){case e.firefox:r=Math.abs(r);case e.msedge||e.msie:r=i[0].scrollWidth-i[0].clientWidth-r}l.isFunction(n.onScroll)&&n.onScroll.call(o,{maxScroll:c.y.maxScrollOffset,scroll:t,size:c.y.size,visible:c.y.visible},{maxScroll:c.x.maxScrollOffset,scroll:r,size:c.x.size,visible:c.x.visible}),c.x.isVisible&&c.x.scroll.bar.css("left",r*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",t*c.y.kx+"px")}),d.on("scroll"+t,function(){d.scrollTop(0).scrollLeft(0)}),n.disableBodyScroll){var p=function(l){a(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l)};d.on("MozMousePixelScroll"+t,p),d.on("mousewheel"+t,p),e.mobile&&d.on("touchstart"+t,function(e){var s=e.originalEvent.touches&&e.originalEvent.touches[0]||e,o=s.pageX,r=s.pageY,n=i.scrollLeft(),c=i.scrollTop();l(document).on("touchmove"+t,function(l){var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;i.scrollLeft(n+o-e.pageX),i.scrollTop(c+r-e.pageY),l.preventDefault()}),l(document).on("touchend"+t,function(){l(document).off(t)})})}l.isFunction(n.onInit)&&n.onInit.apply(this,[i])}l.each(c,function(s,r){var d=null,h=1,u="x"===s?"scrollLeft":"scrollTop",f=n.scrollStep,p=function(){var l=i[u]();i[u](l+f),1==h&&l+f>=v&&(l=i[u]()),-1==h&&l+f<=v&&(l=i[u]()),i[u]()==l&&d&&d()},v=0;r.scroll||(r.scroll=o._getScroll(n["scroll"+s]).addClass("scroll-"+s),n.showArrows&&r.scroll.addClass("iscroll-element-arrows-visible"),r.mousewheel=function(l){if(!r.isVisible||"x"===s&&a(l))return!0;if("y"===s&&!a(l))return c.x.mousewheel(l),!0;var e=-1*l.originalEvent.wheelDelta||l.originalEvent.detail,t=r.size-r.visible-r.offset;return e||("x"===s&&l.originalEvent.deltaX?e=40*l.originalEvent.deltaX:"y"===s&&l.originalEvent.deltaY&&(e=40*l.originalEvent.deltaY)),(e>0&&v<t||e<0&&v>0)&&((v+=e)<0&&(v=0),v>t&&(v=t),o.scrollTo=o.scrollTo||{},o.scrollTo[u]=v,setTimeout(function(){o.scrollTo&&(i.stop().animate(o.scrollTo,240,"linear",function(){v=i[u]()}),o.scrollTo=null)},1)),l.preventDefault(),!1},r.scroll.on("MozMousePixelScroll"+t,r.mousewheel).on("mousewheel"+t,r.mousewheel).on("mouseenter"+t,function(){v=i[u]()}),r.scroll.find(".iscroll-arrow, .iscroll-element-track").on("mousedown"+t,function(t){if(1!=t.which)return!0;h=1;var c={eventOffset:t["x"===s?"pageX":"pageY"],maxScrollValue:r.size-r.visible-r.offset,iscrollOffset:r.scroll.bar.offset()["x"===s?"left":"top"],iscrollSize:r.scroll.bar["x"===s?"outerWidth":"outerHeight"]()},a=0,m=0;if(l(this).hasClass("iscroll-arrow")){if(h=l(this).hasClass("iscroll-arrow_more")?1:-1,f=n.scrollStep*h,v=h>0?c.maxScrollValue:0,n.isRtl)switch(!0){case e.firefox:v=h>0?0:-1*c.maxScrollValue;break;case e.msie||e.msedge:}}else h=c.eventOffset>c.iscrollOffset+c.iscrollSize?1:c.eventOffset<c.iscrollOffset?-1:0,"x"===s&&n.isRtl&&(e.msie||e.msedge)&&(h*=-1),f=Math.round(.75*r.visible)*h,v=c.eventOffset-c.iscrollOffset-(n.stepScrolling?1==h?c.iscrollSize:0:Math.round(c.iscrollSize/2)),v=i[u]()+v/r.kx;return o.scrollTo=o.scrollTo||{},o.scrollTo[u]=n.stepScrolling?i[u]()+f:v,n.stepScrolling&&(d=function(){v=i[u](),clearInterval(m),clearTimeout(a),a=0,m=0},a=setTimeout(function(){m=setInterval(p,40)},n.duration+100)),setTimeout(function(){o.scrollTo&&(i.animate(o.scrollTo,n.duration),o.scrollTo=null)},1),o._handleMouseDown(d,t)}),r.scroll.bar.on("mousedown"+t,function(c){if(1!=c.which)return!0;var a=c["x"===s?"pageX":"pageY"],d=i[u]();return r.scroll.addClass("iscroll-draggable"),l(document).on("mousemove"+t,function(l){var o=parseInt((l["x"===s?"pageX":"pageY"]-a)/r.kx,10);"x"===s&&n.isRtl&&(e.msie||e.msedge)&&(o*=-1),i[u](d+o)}),o._handleMouseDown(function(){r.scroll.removeClass("iscroll-draggable"),v=i[u]()},c)}))}),l.each(c,function(l,e){var s="iscroll-scroll"+l+"-visible",o="x"==l?c.y:c.x;e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s)}),l.each(c,function(e,s){l.extend(s,"x"==e?{offset:parseInt(i.css("left"),10)||0,size:i.prop("scrollWidth"),visible:d.width()}:{offset:parseInt(i.css("top"),10)||0,size:i.prop("scrollHeight"),visible:d.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),l.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[i]),l.each(c,function(l,e){var s="x"===l?"left":"top",o="x"===l?"outerWidth":"outerHeight",r="x"===l?"width":"height",t=parseInt(i.css(s),10)||0,c=e.size,a=e.visible+t,d=e.scroll.size[o]()+(parseInt(e.scroll.size.css(s),10)||0);n.autoScrollSize&&(e.iscrollSize=parseInt(d*a/c,10),e.scroll.bar.css(r,e.iscrollSize+"px")),e.iscrollSize=e.scroll.bar[o](),e.kx=(d-e.iscrollSize)/(c-a)||1,e.maxScrollOffset=c-a}),i.scrollLeft(u.scrollLeft).scrollTop(u.scrollTop).trigger("scroll")},_getScroll:function(e){var s={advanced:['<div class="iscroll-element">','<div class="iscroll-element-corner"></div>','<div class="iscroll-arrow iscroll-arrow-less"></div>','<div class="iscroll-arrow iscroll-arrow-more"></div>','<div class="iscroll-element-outer">','<div class="iscroll-element-size"></div>','<div class="iscroll-element-inner-wrapper">','<div class="iscroll-element-inner iscroll-element-track">','<div class="iscroll-element-inner-bottom"></div>',"</div>","</div>",'<div class="iscroll-bar">','<div class="iscroll-bar-body">','<div class="iscroll-bar-body-inner"></div>',"</div>",'<div class="iscroll-bar-bottom"></div>','<div class="iscroll-bar-center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="iscroll-element">','<div class="iscroll-element-outer">','<div class="iscroll-element-size"></div>','<div class="iscroll-element-track"></div>','<div class="iscroll-bar"></div>',"</div>","</div>"].join("")};return s[e]&&(e=s[e]),e||(e=s.simple),e="string"==typeof e?l(e).appendTo(this.wrapper):l(e),l.extend(e,{bar:e.find(".iscroll-bar"),size:e.find(".iscroll-element-size"),track:e.find(".iscroll-element-track")}),e},_handleMouseDown:function(e,s){var o=this.namespace;return l(document).on("blur"+o,function(){l(document).add("body").off(o),e&&e()}),l(document).on("dragstart"+o,function(l){return l.preventDefault(),!1}),l(document).on("mouseup"+o,function(){l(document).add("body").off(o),e&&e()}),l("body").on("selectstart"+o,function(l){return l.preventDefault(),!1}),s&&s.preventDefault(),!1},_updateScroll:function(s,o){var i=this.container,r=this.containerWrapper||i,t="iscroll-scroll"+s+"-visible",n="x"===s?this.scrolly:this.scrollx,c=parseInt(this.container.css("x"===s?"left":"top"),10)||0,a=this.wrapper,d=o.size,h=o.visible+c;o.isVisible=d-h>1,o.isVisible?(o.scroll.addClass(t),n.scroll.addClass(t),r.addClass(t)):(o.scroll.removeClass(t),n.scroll.removeClass(t),r.removeClass(t)),"y"===s&&(i.is("textarea")||d<h?r.css({height:h+e.scroll.height+"px","max-height":"none"}):r.css({"max-height":h+e.scroll.height+"px"})),o.size==i.prop("scrollWidth")&&n.size==i.prop("scrollHeight")&&o.visible==a.width()&&n.visible==a.height()&&o.offset==(parseInt(i.css("left"),10)||0)&&n.offset==(parseInt(i.css("top"),10)||0)||(l.extend(this.scrollx,{offset:parseInt(i.css("left"),10)||0,size:i.prop("scrollWidth"),visible:a.width()}),l.extend(this.scrolly,{offset:parseInt(i.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:a.height()}),this._updateScroll("x"===s?"y":"x",n))}};var i=o;l.fn.iScroll=function(s,o){return"string"!=typeof s&&(o=s,s="init"),void 0===o&&(o=[]),l.isArray(o)||(o=[o]),this.not("body, .iscroll").each(function(){var r=l(this),t=r.data(e.data.name);(t||"init"===s)&&(t||(t=new i(r)),t[s]&&t[s].apply(t,o))}),this},l.fn.iScroll.options=s;var r,t,n=(r=0,function(l){var s,o,i,t,c,a,d;for(s=0;s<e.scrolls.length;s++)o=(t=e.scrolls[s]).container,i=t.options,c=t.wrapper,a=t.scrollx,d=t.scrolly,(l||i.autoUpdate&&c&&c.is(":visible")&&(o.prop("scrollWidth")!=a.size||o.prop("scrollHeight")!=d.size||c.width()!=a.visible||c.height()!=d.visible))&&(t.init(),i.debug&&window.console&&console.log({scrollHeight:o.prop("scrollHeight")+":"+t.scrolly.size,scrollWidth:o.prop("scrollWidth")+":"+t.scrollx.size,visibleHeight:c.height()+":"+t.scrolly.visible,visibleWidth:c.width()+":"+t.scrollx.visible},!0));clearTimeout(r),r=setTimeout(n,300)});function c(s){if(e.webkit&&!s)return{height:0,width:0};if(!e.data.outer){var o={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};e.data.inner=l("<div>").css(l.extend({},o)),e.data.outer=l("<div>").css(l.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},o)).append(e.data.inner).appendTo("body")}return e.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(e.data.outer.offset().top-e.data.inner.offset().top||0),width:Math.ceil(e.data.outer.offset().left-e.data.inner.offset().left||0)}}function a(l){var e=l.originalEvent;return(!e.axis||e.axis!==e.HORIZONTAL_AXIS)&&!e.wheelDeltaX}window.angular&&(t=window.angular).module("jQueryiscroll",[]).provider("jQueryiscroll",function(){var l=s;return{setOptions:function(e){t.extend(l,e)},$get:function(){return{options:t.copy(l)}}}}).directive("jqueryiscroll",["jQueryiscroll","$parse",function(l,e){return{restrict:"AC",link:function(s,o,i){var r=e(i.jqueryiscroll)(s);o.iscroll(r||l.options).on("$destroy",function(){o.iscroll("destroy")})}}}])});

/* Web Application Igniter v1.0 | Requires jQuery v1.11 or later | Copyright 2020 kaiyunchan */
(function($) {
    $.fn.iweb_pagination = function(options) {
        var settings = $.extend({
            mode: 1,
            size: 5,
            total: 1,
            placeholder: ''
        }, options);

        var currentPage = 1;
        var urlStr = '';
        var urlParameters = window.location.search.substring(1).split('&');
        for (var i = 0; i < parseInt(urlParameters.length); i++) {
            var currentParameter = urlParameters[i].split('=');
            var currentParameter_index = currentParameter[0];
            var currentParameter_value = currentParameter[1];
            if (currentParameter_index !== '' && (typeof currentParameter_index !== 'undefined') && currentParameter_value !== '' && (typeof currentParameter_value !== 'undefined')) {
                if ((currentParameter_index.toString().toLowerCase()) !== 'page') {
                    if (urlStr !== '') {
                        urlStr += '&' + currentParameter_index + '=' + currentParameter_value;
                    } else {
                        urlStr += '?' + currentParameter_index + '=' + currentParameter_value;
                    }
                } else {
                    currentPage = parseInt(currentParameter_value);
                }
            }
        }
        if (urlStr !== '') {
            urlStr += '&';
        } else {
            urlStr += '?';
        }
        urlStr = ((window.location.href.split('?')[0]).toString()) + urlStr;

        $(document).on('keypress', '.iweb-pagination .jumpto_page', function(e) {
            var jumpto_page = parseInt($(this).val());
            var maxvalue = parseInt($(this).data('max'));
            if (jumpto_page > maxvalue) {
                jumpto_page = maxvalue;
            }
            if (e.which === 13) {
                window.location.href = urlStr + 'page=' + jumpto_page;
            }
        });

        this.each(function() {
            var pageSize = parseInt(settings.size);
            var totalPage = parseInt(settings.total);
            if ($(this).data('size') !== null && (typeof $(this).data('size') !== 'undefined')) {
                pageSize = parseInt($(this).data('size'));
                if (pageSize < parseInt(settings.size)) {
                    pageSize = parseInt(settings.size);
                }
            }
            if ($(this).data('totalpage') !== null && (typeof $(this).data('totalpage') !== 'undefined')) {
                totalPage = parseInt($(this).data('totalpage'));
                $(this).removeAttr('data-totalpage');
            }

            var firstPage = 1;
            var prevPage = parseInt(currentPage - 1);
            if (prevPage < 1) {
                prevPage = 1;
            }
            var nextPage = parseInt(currentPage + 1);
            if (nextPage > totalPage) {
                nextPage = totalPage;
            }
            var lastPage = totalPage;

            var start_page_num = 1;
            var end_page_num = pageSize;
            var diff_page_num = parseInt(pageSize / 2);
            if (totalPage <= pageSize) {
                start_page_num = 1;
                end_page_num = totalPage;
            } else {
                start_page_num = currentPage - diff_page_num;
                end_page_num = currentPage + diff_page_num;
                if (start_page_num < 1) {
                    start_page_num = firstPage;
                    end_page_num = pageSize;
                    if (end_page_num > lastPage) {
                        end_page_num = lastPage;
                    }
                } else {
                    if (end_page_num > lastPage) {
                        end_page_num = lastPage;
                        start_page_num = (lastPage - pageSize) + 1;
                        if (start_page_num < firstPage) {
                            start_page_num = firstPage;
                        }
                    }
                }
            }

            if (totalPage > 1) {
                var pagination_html = '<ul>';
                if (parseInt(settings.mode) === 2) {
                    if (currentPage > parseInt(pageSize / 2)) {
                        pagination_html += '<li><a class="first" href="' + urlStr + 'page=' + firstPage + '"><span>' + firstPage + '..</span></a></li>';
                    }
                } else {
                    pagination_html += '<li><a class="first" href="' + urlStr + 'page=' + firstPage + '"><i></i><i></i></a></li>';
                }
                pagination_html += '<li><a class="prev" href="' + urlStr + 'page=' + prevPage + '"><i></i></a></li>';

                for (var i = start_page_num; i <= end_page_num; i++) {
                    if (i === currentPage) {
                        pagination_html += '<li><a class="num current" href="' + urlStr + 'page=' + i + '"><span>' + i + '</span></a></li>';
                    } else {
                        pagination_html += '<li><a class="num" href="' + urlStr + 'page=' + i + '"><span>' + i + '</span></a></li>';
                    }
                }

                pagination_html += '<li><a class="next" href="' + urlStr + 'page=' + nextPage + '"><i></i></a></li>';
                if (parseInt(settings.mode) === 2) {
                    if (currentPage < totalPage - parseInt(pageSize / 2)) {
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
    mode: 'default',
    default_language: 'en',
    init_status: false,
    processing_status: false,
    win_width: 0,
    win_scroll_top: 0,
    csfr_token: '',
    language: [],
    initialize: function(mode) {
        var iweb_object = this;
        iweb_object.mode = ((iweb_object.isValue($('body').data('macosx')) && parseInt($('body').data('macosx')) > 0 && !iweb_object.detectDevice())?'macosx':'default');
        iweb_object.processing(parseInt($('body').data('processing'))); 
        iweb_object.language['en'] = {'btn_confirm':'OK','btn_yes':'Yes','btn_no':'No','select':'Please select'};
        iweb_object.language['zh-hant'] = {'btn_confirm':'確定','btn_yes':'是','btn_no':'否','select':'請選擇'};
        iweb_object.language['zh-hans'] = {'btn_confirm':'确定','btn_yes':'是','btn_no':'否','select':'请选择'};
        if(iweb_object.isValue($('html').attr('lang')) && iweb_object.isValue(iweb_object.language[$('html').attr('lang').toString().toLowerCase()])) {
            iweb_object.default_language = $('html').attr('lang').toString().toLowerCase();
        }
        $('body > *').not('script,noscript').wrapAll('<div class="iweb-viewer"></div>');
        if(iweb_object.mode === 'macosx') {
            iweb_object.scrollbar('body > .iweb-viewer','macosx',function(scroll_y) {
                if (iweb_object.init_status) {
                    iweb_object.win_scroll_top = parseInt(scroll_y.scroll);
                    if (typeof iweb_scroll === 'function') {
                        iweb_scroll(scroll_y);
                    }
                    if (typeof iweb_iscroll === 'function') {
                        iweb_iscroll(scroll_y);
                    }
                }
            });
        }
        $('body').find('.iweb-editor').fitVids();
        iweb_object.selector($('body').find('select'));
        iweb_object.responsive();
        iweb_object.win_width = parseInt($('.iweb-viewer').width());
        $(document).on('change','.iweb-selector > .real-choice > select',function() {
            var selectoption = $(this).val();
            $(this).parents('.iweb-selector').find('.virtual-choice li.virtual-node').each(function() {
                if($(this).data('value').toString() === selectoption.toString()) {
                    $(this).addClass('virtual-node-selected');
                    $(this).parents('.iweb-selector').find('.virtual-choice > div > span').html($(this).text());
                }
                else {
                    $(this).removeClass('virtual-node-selected');
                }
            });
        });
        $(document).on('click','.iweb-selector > .virtual-choice > div > span',function() {
            var target_selector = $(this);
            $('.iweb-selector > .virtual-choice > div > ul').each(function() {
                if(!iweb_object.isMatch($(this).data('index'),target_selector.parents('.iweb-selector').find('.virtual-choice > div > ul').data('index'))) {
                    $(this).hide();
                }
            });
            if(target_selector.parents('.iweb-selector').find('.virtual-choice > div > ul').is(":visible")) {
                target_selector.parents('.iweb-selector').find('.virtual-choice > div > ul').hide();
            }
            else {
                target_selector.parents('.iweb-selector').find('.virtual-choice > div > ul').show();
            }
        });
        $(document).on('click','.virtual-choice li.virtual-node',function() {
            $(this).parents('.iweb-selector').find('.virtual-choice > div > ul').hide();
            $(this).parents('.iweb-selector').find('.virtual-choice > div > span').html($(this).text());
            $(this).parents('.iweb-selector').find('.real-choice > select').val($(this).data('value')).trigger('change');
        });
        $(document).on('click','body',function(e) {
            if(parseInt($(e.target).parents('.iweb-selector').length) === 0) {
                $('.iweb-selector > .virtual-choice > div > ul').hide();
            }
        });
        $(document).on('keypress','body',function(e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if(keycode == 13 && iweb_object.isExist('#iweb-alert')) {
                e.preventDefault();
                return false;
            }
        });
        $(document).on('click','.font-switch',function(e) {
            e.preventDefault();
            $('.font-switch').removeClass('current');
            $('html').removeClass('small-font');
            $('html').removeClass('large-font');
            if(iweb_object.isMatch($(this).data('size'),'small') || iweb_object.isMatch($(this).data('size'),'large')) {
                $('html').addClass($(this).data('size')+'-font');
            }
            iweb.setCookie('iweb_font_sizse',$(this).data('size'),14);
            $('.font-switch').each(function() {
                if(iweb_object.isMatch($(this).data('size'),iweb.getCookie('iweb_font_sizse'))) {
                    $(this).addClass('current');
                }
                else {
                    $(this).removeClass('current');
                }
            });
        });
        if(iweb_object.isValue(iweb.getCookie('iweb_font_sizse'))) {
            if(iweb_object.isMatch(iweb.getCookie('iweb_font_sizse'),'small') || iweb_object.isMatch(iweb.getCookie('iweb_font_sizse'),'large')) {
                $('html').addClass(iweb.getCookie('iweb_font_sizse')+'-font');
            }
            $('.font-switch').each(function() {
                if(iweb_object.isMatch($(this).data('size'),iweb.getCookie('iweb_font_sizse'))) {
                    $(this).addClass('current');
                }
                else {
                    $(this).removeClass('current');
                }
            });
        }
        if (typeof iweb_layout === 'function') {
            iweb_layout(iweb_object.win_width);
        }
        if (typeof iweb_ilayout === 'function') {
            iweb_ilayout(iweb_object.win_width);
        }
        if (typeof iweb_func === 'function') {
            iweb_func();
        }
        if (typeof iweb_ifunc === 'function') {
            iweb_ifunc();
        }
        $('body').removeAttr('data-processing');
        $('body').removeAttr('data-macosx');
        $('body').addClass('iweb');
        if(iweb_object.detectDevice()) {
            $('body').addClass('iweb-mobile');
        }
        if(iweb_object.mode === 'macosx') {
            $('body').addClass('iweb-macosx');
        }
    },
    processing: function(status,option) {
        var iweb_object = this;
        if(iweb_object.isMatch(status,1) || iweb_object.isMatch(status,true)) {
            var box_html = '';
            if (iweb_object.isValue(option)) {
                box_html = '<div id="iweb-processing" class="iweb-processing iweb-processing-opacity">';
            } else {
                box_html = '<div id="iweb-processing" class="iweb-processing">';
            }
            box_html += '<div class="loading">';
            box_html += '<svg class="icon" x="0px" y="0px" viewBox="0 0 150 150">';
            box_html += '<circle class="circle" cx="75" cy="75" r="60"></circle>';
            box_html += '</svg>';
            box_html += '</div>';
            box_html += '</div>';
            $('body').prepend(box_html);
        }
        else {
            var microsecond = 500;
            if (iweb_object.isNumber(option)) {
                microsecond = parseInt(option);
            }
            var delay_timer = setTimeout(function() {
                $('#iweb-processing').remove();
                clearTimeout(delay_timer);
            }, microsecond);
        }
    },
    resizing: function() {
        var iweb_object = this;
        if (iweb_object.init_status && iweb_object.win_width !== parseInt($('.iweb-viewer').width())) {
            iweb_object.win_width = parseInt($(window).width());
            return true;
        }
        else {
            return false;
        }
    },
    responsive: function() {
        var iweb_object = this;
        if (iweb_object.isExist('.iweb-responsive')) {
            $('.iweb-responsive').each(function() {
                var current_width = $(this).innerWidth(); 
                var new_height = 0; 
                var define_ratio_width = $(this).data('width'); 
                var define_ratio_height = $(this).data('height'); 
                if (iweb_object.isValue(define_ratio_width) && iweb_object.isValue(define_ratio_height)) {
                    if (define_ratio_height > 0 && define_ratio_width > 0) {
                        new_height = parseInt(current_width * define_ratio_height / define_ratio_width);
                    }
                }
                if (new_height > 0) {
                    $(this).css('height', new_height + 'px');
                }
                else {
                    $(this).css('height', 'auto');
                }
            });
        }
    },
    scrollto: function(element,adjustment_value,callback) {
        var iweb_object = this;
        var element_scroll_top_value = 0;
        var adjustment_value = ((iweb_object.isValue(adjustment_value))?parseInt(adjustment_value):0);
        if(iweb_object.mode === 'macosx') {
            if(iweb_object.isExist(element)) {
                element_scroll_top_value = parseInt($(element).first().offset().top);
                element_scroll_top_value = iweb_object.win_scroll_top + element_scroll_top_value - adjustment_value;
                $(element).first().closest('.iscroll-content').animate({ scrollTop: element_scroll_top_value }, 500).promise().then(function() {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
            else {
                $('.iscroll-content').animate({ scrollTop: element_scroll_top_value }, 500).promise().then(function() {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        }
        else {
            if(iweb_object.isExist(element)) {
                element_scroll_top_value = Math.max(0, parseInt($(element).first().offset().top) - adjustment_value);
            }
            $('html,body').animate({ scrollTop: element_scroll_top_value }, 500).promise().then(function() {
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    },
    scrollbar: function(element,mode,callback) {
        var iweb_object = this;
        if (iweb_object.isExist(element)) {
            $(element).iScroll({
                mode: ((iweb_object.isValue(mode))?mode:'outer'),
                onScroll: function(scroll_y, scroll_x){
                    if (typeof callback === 'function') {
                        callback(scroll_y);
                    }
                }
            });
        }
    },
    selector: function(select_object,callback) {
        var iweb_object = this;
        select_object.each(function(select_index){
            if(!$(this).parent().parent().hasClass('iweb-selector')) {
                $(this).wrap('<div class="iweb-selector"><div class="real-choice"></div></div>');
                $(this).parents('.iweb-selector').find('.real-choice').prepend('<div class="arrow"></div>');
                if(iweb_object.isMatch($(this).data('virtual'),1) || iweb_object.isMatch($(this).data('virtual'),true)) {
                    $(this).addClass('shidden');
                    $(this).removeAttr('data-virtual');
                    var virtualHtml = '';
                    var virtualSelect = iweb_object.language[iweb_object.default_language]['select'];
                    virtualHtml += '<ul class="virtual-option-list" data-index="iss'+select_index+'">';
                    $.each($(this).children(),function() {
                        if(parseInt($(this).children().length) > 0) {
                            virtualHtml += '<li class="virtual-parent-node"><span>'+$(this).attr('label')+'</span>';
                            virtualHtml += '<ul class="virtual-option-child-list">';
                            $.each($(this).children(),function() {
                                if($(this).is(':selected')) {
                                    virtualSelect = $(this).text();
                                    virtualHtml += '<li class="virtual-node virtual-node-selected" data-value="'+$(this).val()+'"><span>'+$(this).text()+'</span></li>';
                                }
                                else {
                                    virtualHtml += '<li class="virtual-node" data-value="'+$(this).val()+'"><span>'+$(this).text()+'</span></li>';
                                }
                            });
                            virtualHtml += '</ul>';
                            virtualHtml += '</li>';
                         }
                         else {
                            if($(this).is(':selected')) {
                                virtualSelect = $(this).text();
                                virtualHtml += '<li class="virtual-node virtual-node-selected" data-value="'+$(this).val()+'"><span>'+$(this).text()+'</span></li>';
                            }
                            else {
                                virtualHtml += '<li class="virtual-node" data-value="'+$(this).val()+'"><span>'+$(this).text()+'</span></li>';
                            }
                        }
                    });
                    virtualHtml += '</ul>';
                    virtualHtml = '<div class="virtual-choice"><div><span>'+virtualSelect+'</span></div><div class="virtual-option">'+virtualHtml+'</div></div>';
                    $(this).parents('.iweb-selector').append(virtualHtml);
                }
            }
        });
        if (typeof callback === 'function') {
            callback();
        }
    },
    pagination: function(element,options) {
        var iweb_object = this;
        if(iweb_object.isValue(options)) {
            $(element).iweb_pagination(options);
        }
        else {
            $(element).iweb_pagination();
        }
    },
    alert: function(message,callback,setting) {
        var iweb_object = this;
        if (iweb_object.isExist('#iweb-alert')) { return; }
        iweb_object.processing(false);
        var alert_html = '';
        var alert_class = '';
        var alert_btn_close = iweb_object.language[iweb_object.default_language]['btn_confirm'];
        if (iweb_object.isValue(setting)) {
            if (iweb_object.isValue(setting.class)) {
                alert_class = setting.class;
            }
            if (iweb_object.isValue(setting.btn)) {
                alert_btn_close = setting.close;
            }
        }
        if (iweb_object.isValue(alert_class)) {
            alert_html += '<div id="iweb-alert" class="iweb-alert ' + alert_class + '">';
        } else {
            alert_html += '<div id="iweb-alert" class="iweb-alert">';
        }
        alert_html += '<div>';
        alert_html += '<div class="async-content">';
        alert_html += '<div>';
        alert_html += '<div class="message">';
        alert_html += message;
        alert_html += '</div>';
        alert_html += '<button class="btn btn-close">' + alert_btn_close + '</button>';
        alert_html += '</div>';
        alert_html += '</div>';
        alert_html += '</div>';
        alert_html += '</div>';
        $('.iweb > .iweb-viewer').prepend(alert_html).each(function() {
            if(!$('body').hasClass('iweb-macosx')) {
                $('body').addClass('iweb-disable-scroll');
            }
            $(document).on('click', '.iweb-alert .async-content > div > .btn-close', function() {
                $(document).off('click', '.iweb-alert .async-content > div > .btn-close');
                $('#iweb-alert').remove();
                $('body').removeClass('iweb-disable-scroll');
                if (typeof callback === 'function') {
                    callback();
                }
            });
        });
    },
    confirm: function(message,callback,setting) {
        var iweb_object = this;
        if (iweb_object.isExist('#iweb-alert')) { return; }
        iweb_object.processing(false);
        var confirm_html = '';
        var confirm_class = '';
        var confirm_btn_yes = iweb_object.language[iweb_object.default_language]['btn_yes'];
        var confirm_btn_no = iweb_object.language[iweb_object.default_language]['btn_no'];
        if (iweb_object.isValue(setting)) {
            if (iweb_object.isValue(setting.class)) {
                confirm_class = setting.class;
            }
            if (iweb_object.isValue(setting.yes)) {
                confirm_btn_yes = setting.yes;
            }
            if (iweb_object.isValue(setting.no)) {
                confirm_btn_no = setting.no;
            }
        }
        if (iweb_object.isValue(confirm_class)) {
            confirm_html += '<div id="iweb-alert" class="iweb-alert ' + confirm_class + '">';
        } else {
            confirm_html += '<div id="iweb-alert" class="iweb-alert">';
        }
        confirm_html += '<div>';
        confirm_html += '<div class="async-content">';
        confirm_html += '<div>';
        confirm_html += '<div class="message">';
        confirm_html += message;
        confirm_html += '</div>';
        confirm_html += '<button class="btn btn-yes">' + confirm_btn_yes + '</button>';
        confirm_html += '<button class="btn btn-no">' + confirm_btn_no + '</button>';
        confirm_html += '</div>';
        confirm_html += '</div>';
        confirm_html += '</div>';
        confirm_html += '</div>';
        $('.iweb > .iweb-viewer').prepend(confirm_html).each(function() {
            if(!$('body').hasClass('iweb-macosx')) {
                $('body').addClass('iweb-disable-scroll');
            }
            $(document).on('click', '.iweb-alert .async-content > div > .btn-yes', function() {
                $(document).off('click', '.iweb-alert .async-content > div > .btn-yes');
                $('#iweb-alert').remove();
                $('body').removeClass('iweb-disable-scroll');
                if (typeof callback === 'function') {
                    callback(true);
                }
            });
            $(document).on('click', '.iweb-alert .async-content > div > .btn-no', function() {
                $(document).off('click', '.iweb-alert .async-content > div > .btn-no');
                $('#iweb-alert').remove();
                $('body').removeClass('iweb-disable-scroll');
                if (typeof callback === 'function') {
                    callback(false);
                }
            });
        });
    },
    dialog: function(htmlcode,init,callback,setting) {
        var iweb_object = this;
        if (iweb_object.isExist('#iweb-dialog')) { return; }
        iweb_object.processing(false);
        var dialog_html = '';
        if (iweb_object.isValue(setting)) {
            if (iweb_object.isValue(setting.class)) {
                dialog_html += '<div id="iweb-dialog" class="iweb-dialog ' + setting.class + '" style="opacity:0;">';
            } else {
                dialog_html += '<div id="iweb-dialog" class="iweb-dialog" style="opacity:0;">';
            }
        } else {
            dialog_html += '<div id="iweb-dialog" class="iweb-dialog">';
        }
        dialog_html += '<div>';
        dialog_html += '<div class="async-loading">';
        dialog_html += '<svg class="icon" x="0px" y="0px" viewBox="0 0 150 150">';
        dialog_html += '<circle class="circle" cx="75" cy="75" r="60"></circle>';
        dialog_html += '</svg>';
        dialog_html += '</div>';

        dialog_html += '<div class="async-virtual"></div>';
        dialog_html += '<div class="async-content">';
        dialog_html += '<a class="btn btn-close">×</a>';
        dialog_html += '<div>';
        dialog_html += htmlcode;
        dialog_html += '</div>';
        dialog_html += '</div>';
        dialog_html += '</div>';
        dialog_html += '</div>';
    
        $('.iweb > .iweb-viewer').prepend(dialog_html).each(function() {
            if(!$('body').hasClass('iweb-macosx')) {
                $('body').addClass('iweb-disable-scroll');
            }
            else {
                $('#iweb-dialog > .inner').iScroll({ mode: 'macosx'});
            }
            if (typeof init === 'function') {
                init();
            }
            $(document).on('click', '.iweb-dialog .async-virtual', function(e) {
                $(document).off('click', '.iweb-dialog .async-virtual');
                $(document).off('click', '.iweb-dialog .async-content .btn-close');
                $('#iweb-dialog').remove();
                $('body').removeClass('iweb-disable-scroll');
                if (typeof callback === 'function') {
                    callback();
                }
            });
            $(document).on('click', '.iweb-dialog .async-content .btn-close', function() {
                $(document).off('click', '.iweb-dialog .async-virtual');
                $(document).off('click', '.iweb-dialog .async-content .btn-close');
                $('#iweb-dialog').remove();
                $('body').removeClass('iweb-disable-scroll');
                if (typeof callback === 'function') {
                    callback();
                }
            });
            var delay_timer = setTimeout(function() {
                $('.iweb-dialog .async-loading').remove();
                $('.iweb-dialog .async-content').animate({'opacity':1});
                clearTimeout(delay_timer);
            }, 1000);
        });
    },
    post: function(data,callback) {
        var iweb_object = this;
        var check_status = false;
        var service_url = '';
        var post_data = {};
        var data_type = 'json';
        if (iweb_object.isValue(data)) {
            if (iweb_object.isValue(data.url)) {
                service_url = data.url;
                check_status = true;
            }
            if (iweb_object.isValue(data.val)) {
                post_data = data.val;
            }
            if (iweb_object.isValue(data.type)) {
                data_type = data.type;
            }
        }
        if (check_status && !iweb_object.processing_status) {
            iweb_object.processing_status = true;
            if (iweb_object.isValue(data.loading)) {
                iweb_object.processing(true,true);
            }
            $.ajax({
                url: service_url,
                type: "post",
                data: post_data,
                dataType: data_type,
                success: function(response_data) {
                    var delay_timer = setTimeout(function() {
                        iweb_object.processing_status = false;
                        $('#iweb-processing').remove();
                        clearTimeout(delay_timer);
                        if (typeof callback === 'function') {
                            callback(response_data);
                        }
                    }, 1000);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    iweb_object.processing_status = false;
                    $('#iweb-processing').remove();
                    alert(thrownError);
                    return false;
                }
            });
        }
    },
    form: function(target_form_id,type,checkfunc,callback) {
        var iweb_object = this;
        target_form_id = '#' + (target_form_id.toString().replace('#', ''));
        if (iweb_object.isExist(target_form_id)) {
            object = this;
            var data_type = 'json';
            if (iweb_object.isValue(type)) {
                data_type = type;
            }
            if (iweb_object.isValue($(target_form_id).data('token'))) {
                iweb_object.csfr_token = $(target_form_id).data('token');
                $(target_form_id).removeAttr('data-token');
            }
            $(target_form_id).ajaxForm({
                dataType: data_type,
                beforeSubmit: function(arr, $form, options) {
                    if (iweb_object.processing_status) {
                        return false;
                    }
                    if (typeof checkfunc === 'function') {
                        if (!checkfunc(arr)) {
                            return false;
                        }
                    }
                    if(iweb_object.csfr_token.length > 0) {
                        var index = Math.ceil(Math.random(0,Math.ceil(iweb_object.csfr_token.length/3))*iweb_object.csfr_token.length);
                        var client_token = iweb_object.randomString();
                        arr.push({
                            name: 'async_index',
                            value: index,
                        });
                        arr.push({
                            name: 'csrf_token',
                            value: iweb_object.csfr_token.substr(index,client_token.length)+client_token
                        });
                        iweb_object.setCookie('client_token',client_token);
                    }
                    iweb_object.processing_status = true;
                    iweb_object.processing(true,true);
                    if (typeof checkfunc !== 'function') {
                        return true;
                    }
                },
                success: function(response_data) {
                    if(iweb_object.isValue(iweb_object.getCookie('client_token'))) {
                        iweb_object.setCookie('client_token','',-1);
                    }
                    var delay_timer = setTimeout(function() {
                        iweb_object.processing_status = false;
                        $('#iweb-processing').remove();
                        clearTimeout(delay_timer);
                        if (typeof callback === 'function') {
                            callback(response_data);
                        }
                    }, 1000);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    if(iweb_object.isValue(iweb_object.getCookie('client_token'))) {
                        iweb_object.setCookie('client_token','',-1);
                    }
                    iweb_object.processing_status = false;
                    $('#iweb-processing').remove();
                    alert(thrownError);
                    return false;
                }
            });
        }
    },
    isValue:function(value) {
        if (value !== null && (typeof value !== 'undefined')) {
            if (typeof value === 'object' || typeof value === 'array') {
                if (parseInt(Object.keys(value).length) > 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (typeof value === 'boolean') {
                return value;
            } else {
                if ($.trim(value) !== '') {
                    return true;
                } else {
                    return false
                }
            }
        } else {
            return false;
        }
    },
    isNumber: function(value) {
        var iweb_object = this;
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            var reg = /^[0-9]+$/;
            return reg.test(value);
        }
    },
    isEmail: function(value) {
        var iweb_object = this;
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(value);
        }
    },
    isPassword: function(value) {
        var iweb_object = this;
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            return reg.test(value);
        }
    },
    isMatch: function(value1,value2,sensitive) {
        var iweb_object = this;
        if (iweb_object.isValue(value1) && iweb_object.isValue(value2)) {
            if(iweb.isValue(sensitive) && (sensitive || parseInt(sensitive) === 1)) {
                if($.trim(value1).toString() === $.trim(value2).toString()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if($.trim(value1).toString().toLowerCase() === $.trim(value2).toString().toLowerCase()) {
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
    isExist: function(element) {
        var iweb_object = this;
        if (parseInt($(element).length) > 0) {
            return true;
        }
        return false;
    },
    detectDevice: function(index) {
        var isMobile= {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/Mac|iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            }
        };
        switch (index) {
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
    setCookie: function(cname, cvalue, exdays) {
        if(navigator.cookieEnabled) {
            var iweb_object = this;
            if (iweb_object.isValue(cname)) {
                if(!iweb_object.isValue(exdays)) {
                    exdays = 7;
                }
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = 'expires='+d.toUTCString();
                document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
            }
        }
    },
    getCookie: function(cname) {
        if(navigator.cookieEnabled) {
            var name = cname + '=';
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return '';
    },
    randomString: function(length) {
        var iweb_object = this;
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        if(!iweb_object.isNumber(length)) {
            length = 12;
        }
        var result = '';
        for (var i=0; i< length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum,rnum+1);
        }
        return result;
    }
};

$(document).ready(function(){
    iweb.initialize();
});

$(window).on('load',function() {
    if (typeof iweb_layout_done==='function') {
        iweb_layout_done(iweb.win_width);
    }
    if (typeof iweb_ilayout_done==='function') {
        iweb_ilayout_done(iweb.win_width);
    }
    if (typeof iweb_func_done==='function') {
        iweb_func_done();
    }
    if (typeof iweb_ifunc_done==='function') {
        iweb_ifunc_done();
    }
    iweb.init_status = true;
    iweb.processing(false,1500);
});

$(window).on('resize',function() {
    if (iweb.resizing()) {
        $('.iweb-selector > .virtual-choice > div > ul').hide();
        var delay_timer = setTimeout(function() {
            iweb.responsive();
            if (typeof iweb_layout==='function') {
                iweb_layout(iweb.win_width);
            }
            if (typeof iweb_ilayout==='function') {
                iweb_ilayout(iweb.win_width);
            }
            clearTimeout(delay_timer);
        }, 250);
    }
});

$(window).on('scroll',function() {
    if(iweb.mode !== 'macosx' && iweb.init_status) {
        iweb.win_scroll_top = parseInt($(window).scrollTop());
        if (typeof iweb_scroll==='function') {
            iweb_scroll(parseInt($(window).scrollTop()));
        }
        if (typeof iweb_iscroll==='function') {
            iweb_iscroll(parseInt($(window).scrollTop()));
        }
    }
});
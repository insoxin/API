//(function(){
/**
 * @description 基础方法
 * @param {String | Object} n dom元素的id，或者dom元素
 * @class
 */
var $ = window.Simple = function(n) {
	return typeof(n) == "string" ? document.getElementById(n) : n;
}
/**
 * @description cookie相关
 * @class
 */
$.cookie = {
	/**
	 * @description 读取cookie
	 * @public
	 * @param {String} n 名称
	 * @returns {String} cookie值
	 * @example
	 * 		$.cookie.get('id_test');
	 */
	get: function (b) {
		var filterXSS = function (e) {
			if (!e) return e;
			for (; e != unescape(e);) e = unescape(e);
			for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);
			return e
		};
		var a;
		return filterXSS((a = document.cookie.match(RegExp("(^|;\\s*)" + b + "=([^;]*)(;|$)"))) ? unescape(a[2]) : '');
	},
	/**
	 * @description 设置cookie
	 * @public
	 *
	 * @param {String} name cookie名称
	 * @param {String} value cookie值
	 * @param {String} [domain = ""] 所在域名
	 * @param {String} [path = "/"] 所在路径
	 * @param {Number} [hour = 30] 存活时间，单位:小时;不设置默认为回话cookie
	 * @example
	 * 		$.cookie.set('value1','cookieval',"id.qq.com","/test",24); //设置cookie
	 */
	set: function(name, value, domain, path, hour) {
		var expire = new Date();
		if (hour) {
			expire.setTime(expire.getTime() + 3600000 * hour);
			document.cookie = name + "=" + value + "; " + "expires=" + expire.toGMTString() + "; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "");
		} else {
			document.cookie = name + "=" + value + "; " + "path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "");
		}

	},

	/**
	 * @description 删除指定cookie,复写为过期 !!注意path要严格匹配， /id 不同于/id/
	 * @public
	 *
	 * @param {String} name cookie名称
	 * @param {String} [domain] 所在域
	 * @param {String} [path = "/"] 所在路径
	 * @example
	 * 		$.cookie.del('id_test'); //删除cookie
	 */
	del: function(name, domain, path) {
		document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + (domain ? ("domain=" + domain + ";") : "");
	},
	/**
	 * 获取uin，针对业务,对外开源请删除
	 * @public
	 *
	 * @return {String} uin值
	 * @example
	 * 		$.cookie.uin();
	 */
	uin: function() {
		var u = $.cookie.get("uin");
		return !u ? null : parseInt(u.substring(1, u.length), 10);
	}
};

/**
 * @description 加载iframe
 * @class
 */

$.iframe = function(){
	function receiveMessageFromIframePage(event) {
		console.log('receiveMessageFromIframePage', event)
		var msg = event && event.data && event.data.msg || ''
		switch (msg) {
			case 'exit':
				this.opt.onClose && this.opt.onClose(event)
				this.reset(event)
				break;
			case 'success':
				this.opt.success && this.opt.success(event)
				break;
			case this.opt.heartBeat:
				this.opt.onload && this.opt.onload(event)
				this._hasHeartBeat = true
				break;
			case 'pt_smsSubmit':
				this.opt.smsSubmitEvent && this.opt.smsSubmitEvent()
				break;
			default:
				break;
		}
	}

	return new function () {
		this.id = ''
		this.parent = null
		this.parentID = ''
		/**
		 * 初始化入口
		 * @param  {[type]} opt [description]
		 * @return {[type]}     [description]
		 */
		this.init = function (opt) {
			var opt = opt || {}

			this.opt = opt

			opt.initTime = +new Date()
			opt.heartBeatTime = opt.heartBeatTime || 10000
			opt.heartBeat = opt.heartBeat || 'heartBeat'

			if (this.__hasinit) {
				return
			}
			this.__hasinit = true
			var iframe = document.createElement('iframe')
			console.log('createElement iFrame opt:',opt);
			console.trace();
			

		
			iframe.name = opt.name || 'iframe'
			this.id = iframe.id = opt.id || 'iframeid';
			this.parentID = opt.parentID

			iframe.style.cssText = opt.iframeStyle || 'z-index:999;height:100%;width:100%;position:fixed;left:0;top:0;right:0;bottom:0'
			iframe.src = opt.url
			var iframe_mask = null;
			if(this.parentID){
				iframe_mask = document.createElement('div');
				if(opt.parentStyle){
					iframe_mask.setAttribute('style',opt.parentStyle)
				}
		
				iframe_mask.setAttribute('id',opt.parentID)
				if(opt.bgFilter){
					var filter = document.createElement('div')
					filter.setAttribute('style',"width:100%;height:100%;position: absolute;left:0;top:0;background: inherit;filter: blur(15px);")
					iframe_mask.appendChild(filter)
				}
				iframe_mask.appendChild(iframe)
				document.body.append(iframe_mask)
			}else{
				document.body.appendChild(iframe)
			}

			this.receiveMessageFromIframePage = receiveMessageFromIframePage.bind(this)

			this.heartBeat(opt)
			this.addListener(opt)
		};

		this.__hasinit = false
		this._hasHeartBeat = false

		this.addListener = function (opt) {
			//监听message事件
			window.addEventListener("message", this.receiveMessageFromIframePage, false);
		}
		this.postMessage = function (opt) {
			var iframeChild = document.getElementById(this.id);//获取iframe
			iframeChild.contentWindow.postMessage(opt,'https://ui.ptlogin2.qq.com');//childDomain是子页面的源（协议+主机+端口号）
		}
		this.heartBeat = function (opt) {
			var self = this
			var time = opt.heartBeatTime || 10000

			setTimeout(function () {
				if (self._hasHeartBeat) {
					//有心跳，继续
					console.log('子页面调起成功')
				} else {
					console.log('子页面调起失败')
					//self.reset()
					opt.fail && opt.fail({
						msg: '子页面调起失败,timeout'
					})
				}
			}, time)
		}

		this.reset = function () {
			var self = this
			self.__hasinit = false

			var iFrame = document.getElementById(self.id)
			var parent = document.getElementById(self.parentID)
			if(parent){
				
				document.body.removeChild(parent)
			}else if(iFrame) {
				document.body.removeChild(iFrame)
			}

			window.removeEventListener("message", this.receiveMessageFromIframePage, false);
		}
	};
}

/**
* @description url相关
*/
$.url = {
getParam: function (name, url) {
	url = url || window.location.href
	var r = new RegExp('(\\?|#|&)' + name + '=(.*?)(&|#|$)')
	var m = url.match(r)
	if (m){
		return decodeURIComponent(m[2])
	}
	return ''
}
}
/**
 *@description http相关
 *@class
 */
$.http = {
	/**
	 * @description jsonp获取回调函数-- 可以支持跨域
	 *
	 * @param {String} url 请求路径
	 * @example
	 * 		$.http.jsonp('http://webryan.net/cgi-bin/test');   //cgi的返回值应该是 fnCallback({'data':''})的形式
	 */
	jsonp: function(url) {
		var s = document.createElement("script");
		s.src = url;
		document.getElementsByTagName("head")[0].appendChild(s);
	},
	/**
	 * @description 异步加载script脚本,并回调
	 *
	 * @param {String} src 请求路径
	 * @param {Function} callback 加载文档后的回调函数
	 * @param {Function} err 加载失败后回调
	 * @example
	 * 		$.http.loadScript('http://webryan.net/js/index.js',function(){alert()});   //callback通常为函数名，非字符串
	 */
	loadScript: function(src, callback, err) {
		var tag = document.createElement("script");
		/**
		 * Attach handlers for all browsers
		 * @ignore
		 */
		tag.onload = tag.onreadystatechange = function() {
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				// 执行回调
				if (typeof callback == "function") {
					callback();
				}
				// Handle memory leak in IE
				tag.onload = tag.onreadystatechange = null;

				if (tag.parentNode) {
					tag.parentNode.removeChild(tag);
				}
			}
		};

		tag.src = src;
		document.getElementsByTagName("head")[0].appendChild(tag);
	},
	/**
	 * @description发出ajax请求
	 *
	 * @param {String} url 请求路径--不能跨域
	 * @param {Object} [para] 参数列表
	 * @param {Function} cb 回调函数
	 * @param {String} method 请求方式: [post|get]
	 * @param {String} [type = json] 数据类型：[json|text] --默认为json
	 * @example
	 * 		$.http.ajax('/cgi-bin/info',{'uin':10001},fnCallBack,'get');
	 */
	ajax: function(url, para, cb, method, type) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		/**
		 * onreadystatechange
		 * @ignore
		 */
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				//ie error with 1223 and opera with 304 or 0
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || xhr.status === 1223 || xhr.status === 0) {
					if (typeof(type) == "undefined" && xhr.responseText) {
						cb(eval("(" + xhr.responseText + ")")); //不容错，以便于排查json错误
					} else {
						cb(xhr.responseText);
					}
				}
				xhr = null;
			}
		};
		xhr.send(para);
		return xhr;
	},
	/**
	 * @description 通过ajax发出get请求
	 *
	 * @param {String} url 请求路径--不能跨域
	 * @param {Object} [para] 参数列表
	 * @param {Function} cb 回调函数
	 * @param {String} [type = "json"] 数据类型：[json|text] --默认为json
	 * @example
	 * 		$.http.get('/cgi-bin/info',{'uin':10001},fnCallBack);
	 */
	get: function(url, para, cb, type) {
		if (para) {
			var params = [];
			for (var p in para) {
				if (para.hasOwnProperty(p)) params.push(p + "=" + para[p]);
			}
			if (url.indexOf("?") == -1) {
				url += "?";
			}
			url += params.join('&');
		}
		return $.http.ajax(url, null, cb, "GET", type);
	},
	/**
	 * @description 预加载某个文件，包括图片，js,flash --可以用于上报
	 *
	 * @param {String} url 请求路径
	 * @example
	 * 		$.http.preload('http://webryan.net/swf/friends.swf');
	 */
	preload: function(url) {
		var s = document.createElement("img");
		s.src = url;
		s = null;
	}
};

/**
 * @description 通过ajax发出get请求
 *
 * @param {String} url 请求路径--不能跨域
 * @param {Object} [para] 参数列表
 * @param {Function} cb 回调函数
 * @param {String} [type = "json"] 数据类型：[json|text] --默认为json
 * @example
 * 		$.get('/cgi-bin/info',{'uin':10001},fnCallBack);
 
 */
$.get = $.http.get;
/**
 * @description 通过ajax发出post请求
 *
 * @param {String} url 请求路径--不能跨域
 * @param {Object} para 参数列表
 * @param {Function} cb 回调函数
 * @param {String} [type = "json"] 数据类型：[json|text] --默认为json
 * @example
 * 		$.post('/cgi-bin/info_mod',{'uin':10001},fnCallBack);
 */
$.post = $.http.post;

/**
 * @description jsonp获取回调函数-- 可以支持跨域
 *
 * @param {String} url 请求路径
 * @example
 * 		$.http.jsonp('http://webryan.net/cgi-bin/test');   //cgi的返回值应该是 fnCallback({'data':''})的形式
 */
$.jsonp = $.http.jsonp;
/**
 * @description 获取浏览器的版本等信息
 * @class
 * @param {String} name [type-类型1.msie.2.ff.3.opera.4.webkit|version--版本号]
 *
 * @example
 * 		$.browser("type");  $.browser("version");
 */
$.browser = function(name) {
	if (typeof $.browser.info == "undefined") {
		var ret = {
			type: ""
		};
		var ua = navigator.userAgent.toLowerCase();
		if (/chrome/.test(ua)) {
			ret = {
				type: "chrome",
				version: /chrome[\/ ]([\w.]+)/
			};
		} else if (/opera/.test(ua)) {
			ret = {
				type: "opera",
				version: /version/.test(ua) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
			};
		} else if (/msie/.test(ua)) {
			ret = {
				type: "msie",
				version: /msie ([\w.]+)/
			};
		} else if (/mozilla/.test(ua) && !/compatible/.test(ua)) {
			ret = {
				type: "ff",
				version: /rv:([\w.]+)/
			};
		} else if (/safari/.test(ua)) {
			ret = {
				type: "safari",
				version: /safari[\/ ]([\w.]+)/
			};
		}

		ret.version = (ret.version && ret.version.exec(ua) || [0, "0"])[1];
		$.browser.info = ret;
	}
	return $.browser.info[name]
};

/**
 *  事件相关 -- 绑定，解绑，触发
 */
$.e = {
	// Private utility to generate unique handler ids
	_counter: 0,
	_uid: function() {
		return "h" + $.e._counter++;
	},
	add: function(element, eventType, handler) {
		if (typeof element != "object") {
			element = $(element);
		}
		if (document.addEventListener) {
			element.addEventListener(eventType, handler, false);
		} else if (document.attachEvent) {
			if ($.e._find(element, eventType, handler) != -1) return;

			// To invoke the handler function as a method of the
			// element, we've got to define this nested function and register
			// it instead of the handler function itself.
			var wrappedHandler = function(e) {
				if (!e) e = window.event;

				// Create a synthetic event object with partial compatibility
				// with DOM events.
				var event = {
					_event: e, // In case we really want the IE event object
					type: e.type, // Event type
					target: e.srcElement, // Where the event happened
					currentTarget: element, // Where we're handling it
					relatedTarget: e.fromElement ? e.fromElement : e.toElement,
					eventPhase: (e.srcElement == element) ? 2 : 3,

					// Mouse coordinates
					clientX: e.clientX,
					clientY: e.clientY,
					screenX: e.screenX,
					screenY: e.screenY,
					// Key state --fix:keyCode
					altKey: e.altKey,
					ctrlKey: e.ctrlKey,
					shiftKey: e.shiftKey,
					keyCode: e.keyCode,
					data: e.data,
					origin: e.origin,

					// Event-management functions
					stopPropagation: function() {
						this._event.cancelBubble = true;
					},
					preventDefault: function() {
						this._event.returnValue = false;
					}
				}

				// Invoke the handler function as a method of the element, passing
				// the synthetic event object as its single argument.
				// Use Function.call( ) if defined; otherwise do a hack
				if (Function.prototype.call)
					handler.call(element, event);
				else {
					// If we don't have Function.call, fake it like this.
					element._currentHandler = handler;
					element._currentHandler(event);
					element._currentHandler = null;
				}
			};

			// Now register that nested function as our event handler.
			element.attachEvent("on" + eventType, wrappedHandler);

			// Now we must do some record keeping to associate the user-supplied
			// handler function and the nested function that invokes it.
			// We have to do this so that we can deregister the handler with the
			// remove( ) method and also deregister it automatically on page unload.

			// Store all info about this handler into an object.
			var h = {
				element: element,
				eventType: eventType,
				handler: handler,
				wrappedHandler: wrappedHandler
			};

			// Figure out what document this handler is part of.
			// If the element has no "document" property, it is not
			// a window or a document element, so it must be the document
			// object itself.
			var d = element.document || element;
			// Now get the window associated with that document.
			var w = d.parentWindow;

			// We have to associate this handler with the window,
			// so we can remove it when the window is unloaded.
			var id = $.e._uid(); // Generate a unique property name
			if (!w._allHandlers) w._allHandlers = {}; // Create object if needed
			w._allHandlers[id] = h; // Store the handler info in this object

			// And associate the id of the handler info with this element as well.
			if (!element._handlers) element._handlers = [];
			element._handlers.push(id);

			// If there is not an onunload handler associated with the window,
			// register one now.
			if (!w._onunloadHandlerRegistered) {
				w._onunloadHandlerRegistered = true;
				w.attachEvent("onunload", $.e._removeAllHandlers);
			}
		}
	},
	remove: function(element, eventType, handler) {
		if (document.addEventListener) {
			element.removeEventListener(eventType, handler, false);
		} else if (document.attachEvent) {
			// Find this handler in the element._handlers[] array.
			var i = $.e._find(element, eventType, handler);
			if (i == -1) return; // If the handler was not registered, do nothing

			// Get the window of this element.
			var d = element.document || element;
			var w = d.parentWindow;

			// Look up the unique id of this handler.
			var handlerId = element._handlers[i];
			// And use that to look up the handler info.
			var h = w._allHandlers[handlerId];
			// Using that info, we can detach the handler from the element.
			element.detachEvent("on" + eventType, h.wrappedHandler);
			// Remove one element from the element._handlers array.
			element._handlers.splice(i, 1);
			// And delete the handler info from the per-window _allHandlers object.
			delete w._allHandlers[handlerId];
		}
	},

	// A utility function to find a handler in the element._handlers array
	// Returns an array index or -1 if no matching handler is found
	_find: function(element, eventType, handler) {
		var handlers = element._handlers;
		if (!handlers) return -1; // if no handlers registered, nothing found

		// Get the window of this element
		var d = element.document || element;
		var w = d.parentWindow;

		// Loop through the handlers associated with this element, looking
		// for one with the right type and function.
		// We loop backward because the most recently registered handler
		// is most likely to be the first removed one.
		for (var i = handlers.length - 1; i >= 0; i--) {
			var handlerId = handlers[i]; // get handler id
			var h = w._allHandlers[handlerId]; // get handler info
			// If handler info matches type and handler function, we found it.
			if (h.eventType == eventType && h.handler == handler)
				return i;
		}
		return -1; // No match found
	},

	_removeAllHandlers: function() {
		// This function is registered as the onunload handler with
		// attachEvent. This means that the this keyword refers to the
		// window in which the event occurred.
		var w = this;

		// Iterate through all registered handlers
		for (id in w._allHandlers) {
			// Get handler info for this handler id
			var h = w._allHandlers[id];
			// Use the info to detach the handler
			h.element.detachEvent("on" + h.eventType, h.wrappedHandler);
			// Delete the handler info from the window
			delete w._allHandlers[id];
		}
	},

	/**
	 * 获取时间发生的元素
	 * @param {Object} e 事件
	 */
	src: function(e) {
		return e ? e.target : event.srcElement;
	},
	/**
	 * 阻止冒泡
	 *
	 */
	stopPropagation: function(e) {
		e ? e.stopPropagation() : event.cancelBubble = true;
	}

};
/**
 * @description BOM相关，toolkit
 * @class
 */
$.bom = {
	/**
	 * @description 读取location.search
	 *
	 * @param {String} n 名称
	 * @return {String} search值
	 * @example
	 * 		$.bom.query('mod');
	 */
	query: function(n) {
		var m = window.location.search.match(new RegExp("(\\?|&)" + n + "=([^&]*)(&|$)"));
		return !m ? "" : decodeURIComponent(m[2]);
	}
};
/**
 * 用来设置window.name的属性
 * name的形式：	;a=xxxxxxx;b=xxxxxxx;c=xxxxxxx
 */
$.winName = {
	set: function(n, v) {
		var name = window.name || "";
		if (name.match(new RegExp(";" + n + "=([^;]*)(;|$)"))) { //先验证是否存在
			window.name = name.replace(new RegExp(";" + n + "=([^;]*)"), ";" + n + "=" + v);
		} else {
			window.name = name + ";" + n + "=" + v;
		}
	},
	get: function(n) {
		var name = window.name || "";
		var v = name.match(new RegExp(";" + n + "=([^;]*)(;|$)"));
		return v ? v[1] : "";
	},
	clear: function(n) {
		var name = window.name || "";
		window.name = name.replace(new RegExp(";" + n + "=([^;]*)"), "");
	}
};
//本地存储
$.localStorage = {
		//有些浏览器禁用cookie后会导致这个报错
	isSupport:function(){
		try{
			return window.localStorage ? true : false;
		}catch(e){
			return false;
		}
		
	} ,
	get: function(key) {
		var v = "";
		try {
			v = window.localStorage.getItem(key);
		} catch (e) {
			v = ""
		}
		return v;
	},
	set: function(key, value) {
		try {
			window.localStorage.setItem(key, value);
		} catch (e) {}
	},
	remove: function(key) {
		try {
			window.localStorage.removeItem(key);
		} catch (e) {}
	}
};
/**
 * @description 字符串常用操作
 * @date 2011.11.30
 * @author knightli
 * @class
 */
$.str = (function() {

	var htmlDecodeDict = {
		"quot": '"',
		"lt": "<",
		"gt": ">",
		"amp": "&",
		"nbsp": " ",
		"#34": '"',
		"#60": "<",
		"#62": ">",
		"#38": "&",
		"#160": " "
	};
	//var htmlEncodeDict = { '"': "quot", "<": "lt", ">": "gt", "&": "amp", " ": "nbsp" };
	var htmlEncodeDict = {
		'"': "#34",
		"<": "#60",
		">": "#62",
		"&": "#38",
		" ": "#160"
	};
	return {
		/**
		 * @description 将字符串里entity解码成对应的符号，如&lt;对应<
		 * @param {String} s 原始字符串
		 * @return {String} 处理后字符串
		 * @example
		 * 		$.str.decodeHtml('&lt;script&gt;&lt;/script&gt;'); 返回结果为："<script></script>"
		 */
		decodeHtml: function(s) {
			s += '';
			return s.replace(/&(quot|lt|gt|amp|nbsp);/ig,
				function(all, key) {
					return htmlDecodeDict[key];
				}).replace(/&#u([a-f\d]{4});/ig,
				function(all, hex) {
					return String.fromCharCode(parseInt("0x" + hex));
				}).replace(/&#(\d+);/ig,
				function(all, number) {
					return String.fromCharCode(+number);
				});
		},
		/**
		 * @description 将字符串里的"<"、"&"等转成对应entity
		 * @param {String} s 原始字符串
		 * @return {String} 处理后字符串
		 * @example
		 * 		$.str.encodeHtml('<script></script>'); 返回结果为："&lt;script&gt;&lt;/script&gt;"
		 */
		encodeHtml: function(s) {
			s += '';
			return s.replace(/["<>& ]/g,
				function(all) {
					return "&" + htmlEncodeDict[all] + ";";
				});
		},
		/**
		 * @description 删除首尾空格
		 * @param {String} str 原始字符串
		 * @return {String} 处理后字符串
		 * @example
		 * 		$.str.trim('  somestring... ');
		 */
		trim: function(str) {
			str += '';
			var str = str.replace(/^\s+/, ''),
				ws = /\s/,
				end = str.length;
			while (ws.test(str.charAt(--end)));
			return str.slice(0, end + 1);
		},
		/**
		 * [uin2hex 将uin转换成加盐需要的那种字符串]
		 * @param  {[type]} str [description]
		 * @return {[type]}     [description]
		 */
		uin2hex: function(str) {
			var maxLength = 16;
			str = parseInt(str);
			var hex = str.toString(16);
			var len = hex.length;
			for (var i = len; i < maxLength; i++) {
				hex = '0' + hex;
			}
			var arr = [];
			for (var j = 0; j < maxLength; j += 2) {
				arr.push("\\x" + hex.substr(j, 2))
			}
			var result = arr.join("");
			eval('result="' + result + '"');
			return result;
		},
		/**
		 * [bin2String 将后台check的uin序列还原]
		 * @param  {[type]} str [description]
		 * @return {[type]}     [description]
		 */
		bin2String: function(a) {
			var arr = [];
			for (var i = 0, len = a.length; i < len; i++) {
				var temp = a.charCodeAt(i).toString(16);
				if (temp.length == 1) {
					temp = "0" + temp;
				}
				arr.push(temp);
			}
			arr = '0x' + arr.join('');
			arr = parseInt(arr, 16);
			return arr;
		},
		/**
		 * [utf8ToUincode utf-8编码转unicode字符]
		 * @param  {[type]} s [description]
		 * @return {[type]}   [description]
		 */
		utf8ToUincode: function(s) {
			var result = "";
			try {
				var length = s.length;
				var arr = [];
				for (i = 0; i < length; i += 2) {
					arr.push("%" + s.substr(i, 2));
				}
				result = decodeURIComponent(arr.join(""));
				result = $.str.decodeHtml(result);
			} catch (e) {
				result = "";
			}
			return result;
		},
		json2str: function(obj) {
			var result = "";
			if (typeof JSON != "undefined") {
				result = JSON.stringify(obj);
			} else {
				var arr = [];
				for (var i in obj) {
					arr.push("'" + i + "':" + "'" + obj[i] + "'");
				}
				result = '{' + arr.join(',') + '}';
			}
			return result;
		},
		//可能会溢出
		time33: function(str) {
			var hash = 0;
			for (var i = 0, length = str.length; i < length; i++) {
				hash = hash * 33 + str.charCodeAt(i);
			}

			return hash % 4294967296
		},
		//建议使用这个
		hash33: function(str) {
			var hash = 0;
			for (var i = 0, length = str.length; i < length; ++i) {
				hash += (hash << 5) + str.charCodeAt(i);
			}
			return hash & 0x7fffffff;
		}


	};

})();


/**
 * @description 计算节点的样式，大小，位置等
 * @author avenwu
 * @date 2011.11.30
 * @class
 */
$.css = function() {

	return {
		/**
		 * @description 显示某个元素
		 *
		 * @param {Object} element dom元素
		 * @example
		 * 		$.css.show(dom);
		 */
		show: function(element) {
			if (typeof element == "string") {
				element = $(element);
			}
			element.style.display = "block";
		},
		/**
		 * @description 隐藏某个元素
		 *
		 * @param {Object} element dom元素
		 * @example
		 * 		$.css.hide(dom);
		 */
		hide: function(element) {
			if (typeof element == "string") {
				element = $(element);
			}
			element.style.display = "none";
		},
		getElementViewTop: function(elementId) {
			var element = $(elementId);
			var actualTop = element.offsetTop;
			var current = element.offsetParent;

			while (current !== null) {
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}

			if (document.compatMode == "BackCompat") {
				var elementScrollTop = document.body.scrollTop;
			} else {
				var elementScrollTop = document.documentElement.scrollTop;
			}
			return actualTop - elementScrollTop;
		}
	}
}();
/**
 * [check 检查相关的]
 * @return {[type]} [description]
 */
$.check = {
	//是否为https
	isHttps: function() {
		return document.location.protocol == "https:";
	},
	isSsl: function() {
		var host = document.location.host;
		return /^ssl./i.test(host);
	},
	//是否为pad
	isIpad: function() {
		var u = navigator.userAgent.toLowerCase();
		return /ipad/i.test(u);
	},
	//检查QQ
	isQQ: function(n) {
		return /^[1-9]{1}\d{4,9}$/.test(n);
	},
	//非法qq
	isNullQQ: function(n) {
		return /^\d{1,4}$/.test(n);
	},
	//检查微博短昵称
	isNick: function(n) {
		return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(n);
	},
	//检查微博中文帐号,1-8位	
	isName: function(n) {
		if (n == "<请输入帐号>")
			return false;
		return /[\u4E00-\u9FA5]{1,8}/.test(n);
	},
	//检查手机号码（微博支持所有手机号码）
	//isPhone:function(n){return /^(?:86|886|)1(?:(?:3\d{1})|44|(?:5[012789356]{1})|(?:8[065879]{1}))\d{8}$/.test(n);},
	isPhone: function(n) {
		return /^(?:86|886|)1\d{10}\s*$/.test(n);
	},
	//检查海外手机帐号（香港，台湾和澳门），微博专用
	isSeaPhone: function(n) {
		return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(n);
	},
	//检查邮箱
	isMail: function(n) {
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(n);
	},
	//检测合法密码（非空长度不超过16位）
	isPassword: function(p) {
		return p && p.length >= 16;
	},
	//国外的手机号码，00开头，至少10位
	isForeignPhone: function(n) {
		return /^00\d{7,}/.test(n)
	},
	needVip: function(appid) {
		var blankAppid = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "717016513"];
		var flag = true;
		for (var i = 0, length = blankAppid.length; i < length; i++) {
			if (blankAppid[i] == appid) {
				flag = false;
				break;
			}

		}
		return flag;
	},
	isPaipai: function() {
		return /paipai.com$/.test(window.location.hostname);
	},
	//拍拍多客服账号, none@518810189, 用户名+@+一串数字
	isPaipaiDuokefu: function(n) {
		return /^.+@.+$/.test(n);
	},
	/**
	 * [is_weibo_appid 区分微博帐号的appid]558032501笔记使用微博帐号
	 * @param  {[type]}  appid [description]
	 * @return {Boolean}       [description]
	 */
	is_weibo_appid: function(appid) {
		if (appid == 46000101 || appid == 607000101 || appid == 558032501 || appid == 682023901) {
			return true;
		}
		return false;
	}
};
/**
 * [report description]
 * @return {[type]} [description]
 */
$.report = {
	/**
	 * [monitor description]
	 * @param  {String} id          [monitor上报id]
	 * @param  {Number} probability [上报概率]
	 */
	monitor: function(id, probability) {
		if (Math.random() > (probability || 1)) return;
		var url = location.protocol + '//ui.ptlogin2.qq.com/cgi-bin/report?id=' + id;
		$.http.preload(url);
	},
	/**
	 * [nlog nlog日志上报]
	 * @param  {String} msg [description]
	 * @param  {Number|String} mid id1-id2-id3...
	 * @param  {String} uin
	 */
	nlog: function(msg, mid, uin) {
		var reportUrl = "//ui.ptlogin2.qq.com/cgi-bin/report?";
		var e_info = encodeURIComponent(msg + '|_|' + window.location.href + '|_|' + window.navigator.userAgent);
		mid = mid ? mid : 0;
		if (uin)
			reportUrl += 'u=' + uin + '&';
		reportUrl += ('id=' + mid + '&msg=' + e_info + '&v=' + Math.random());
		$.http.preload(reportUrl);
	},
	log: function(msg) {
		// 这是一个不存在的域名，我只是为了在fiddler上打log
		$.http.preload('http://console.log?msg=' + encodeURIComponent(typeof msg == 'string' ? msg : JSON.stringify(msg)));
	}
};

/**
 * [检测浏览器类型, 以及打开APP的方式]
 * @return [browser, openStyle]
 */
$.detectBrowser = function() {
	if(window.MzJavascriptInterface && typeof window.MzJavascriptInterface.isMzBrowser === 'function' && window.MzJavascriptInterface.isMzBrowser()){
		return ["meizu", "location"];
	}
	var ua=window.navigator.userAgent;
	var matched;
	if (/android/i.test(ua)) {
		if (matched = ua.match(/OppoBrowser|SamsungBrowser|MQQBrowser|baidubrowser|baiduboxapp|QihooBrowser|UCBrowser|2345Browser|Firefox|MicroMessenger/i)) {
			matched[1] = "location";
		} else if (matched = ua.match(/SogouMobileBrowser|LieBaoFast|XiaoMi\/MiuiBrowser|opr|vivo/i)) {
			matched[1] = "iframe";
		} else if (matched = ua.match(/Chrome/i)) {
			var version = ua.match(/chrome\/([\d]+)/i);
			if (version) version = version[1];
			if (version != 40)
				matched[1] = "open";
		}

	} else if (/iphone|ipod/ig.test(ua)) {
		if (matched = ua.match(/MQQBrowser|UCBrowser|SogouMobileBrowser|baidubrowser|baiduboxapp|QihooBrowser|Opera|2345Browser|LieBao/i)){
			
		}else if (matched = ua.match(/CriOS|Chrome/i))
	        (matched[0].toLowerCase() == "crios") && (matched[0] = "Chrome");
	}

	return matched || ["others", ""];
};

//调用微信api通用接口
$.invokeWXAPI = function(name, param, callback) {
    var api = function() {
        WeixinJSBridge.invoke(name, param, callback);
    };
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        api();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", api, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", api);
            document.attachEvent("onWeixinJSBridgeReady", api);
        }
    }
};

// //接入nohost
// (function() {
// 	var _sname = 'nohost_guid';
// 	var _src = '/nohost_htdocs/js/SwitchHost.js';
// 	if ($.cookie.get(_sname) != '') {
// 		$.http.loadScript(_src, function() {
// 			var init = window['SwitchHost'] && window['SwitchHost'].init;
// 			init && init();
// 		});
// 	}
// })();

// setTimeout(function() {
// 	var url = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
// 	if ($.check.isHttps()) {
// 		url = "https://huatuospeed.weiyun.com/cgi-bin/r.cgi?";
// 	}
// 	url += "flag1=7808&flag2=1&flag3=9";
// 	var percent = 0.01;
// 	if (Math.random() < (percent || 1)) {
// 		if (typeof window.postMessage != "undefined")
// 			url += ("&2=" + 2000);
// 		else
// 			url += ("&2=" + 1000);
// 		url += "&v=" + Math.random();
// 		$.http.preload(url);
// 	}
// }, 500);

if(typeof process!=='undefined' && process.env && process.env.UNITTEST==1){
	module.exports = $
}
/**
 * [Encryption rsa算法封装]
 */
$ = window.$ || {};
$pt = window.$pt || {};
$.RSA = $pt.RSA =function(){
// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object

function parseBigInt(str,r) {
  return new BigInteger(str,r);
}

function linebrk(s,n) {
  var ret = "";
  var i = 0;
  while(i + n < s.length) {
    ret += s.substring(i,i+n) + "\n";
    i += n;
  }
  return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
  if(b < 0x10)
    return "0" + b.toString(16);
  else
    return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
  if(n < s.length + 11) { // TODO: fix for utf-8
    uv_alert("Message too long for RSA");
    return null;
  }
  var ba = new Array();
  var i = s.length - 1;
  while(i >= 0 && n > 0) {
    var c = s.charCodeAt(i--);
    ba[--n] = c;
/*    if(c < 128) { // encode using utf-8
      ba[--n] = c;
    }
    else if((c > 127) && (c < 2048)) {
      ba[--n] = (c & 63) | 128;
      ba[--n] = (c >> 6) | 192;
    }
    else {
      ba[--n] = (c & 63) | 128;
      ba[--n] = ((c >> 6) & 63) | 128;
      ba[--n] = (c >> 12) | 224;
    }*/
  }
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Array();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

// "empty" RSA key constructor
function RSAKey() {
  this.n = null;
  this.e = 0;
  this.d = null;
  this.p = null;
  this.q = null;
  this.dmp1 = null;
  this.dmq1 = null;
  this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
  if(N != null && E != null && N.length > 0 && E.length > 0) {
    this.n = parseBigInt(N,16);
    this.e = parseInt(E,16);
  }
  else
    uv_alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
  return x.modPowInt(this.e, this.n);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
  var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
  if(m == null) return null;
  var c = this.doPublic(m);
  if(c == null) return null;
  var h = c.toString(16);
  if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
RSAKey.prototype.doPublic = RSADoPublic;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


//==================================================jsbn.js======================================================================//

// Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

//====================================================rng.js===================================================================//
// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

var rng_state;
var rng_pool;
var rng_pptr;

// Mix in a 32-bit integer into the pool
function rng_seed_int(x) {
  rng_pool[rng_pptr++] ^= x & 255;
  rng_pool[rng_pptr++] ^= (x >> 8) & 255;
  rng_pool[rng_pptr++] ^= (x >> 16) & 255;
  rng_pool[rng_pptr++] ^= (x >> 24) & 255;
  if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
}

// Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {
  rng_seed_int(new Date().getTime());
}

// Initialize the pool with junk if needed.
if(rng_pool == null) {
  rng_pool = new Array();
  rng_pptr = 0;
  var t;
  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
    // Extract entropy (256 bits) from NS4 RNG if available
    var z = window.crypto.random(32);
    for(t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
  }  
  while(rng_pptr < rng_psize) {  // extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255;
  }
  rng_pptr = 0;
  rng_seed_time();
  //rng_seed_int(window.screenX);
  //rng_seed_int(window.screenY);
}

function rng_get_byte() {
  if(rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
}

function rng_get_bytes(ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;


//===============================================prng4==========================================================================//
// prng4.js - uses Arcfour as a PRNG

function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
}

// Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {
  var i, j, t;
  for(i = 0; i < 256; ++i)
    this.S[i] = i;
  j = 0;
  for(i = 0; i < 256; ++i) {
    j = (j + this.S[i] + key[i % key.length]) & 255;
    t = this.S[i];
    this.S[i] = this.S[j];
    this.S[j] = t;
  }
  this.i = 0;
  this.j = 0;
}

function ARC4next() {
  var t;
  this.i = (this.i + 1) & 255;
  this.j = (this.j + this.S[this.i]) & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[(t + this.S[this.i]) & 255];
}

Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
function prng_newstate() {
  return new Arcfour();
}

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

  //rsa加密
function rsa_encrypt(rawValue,key,mod){
  //公钥
  key
      = "e9a815ab9d6e86abbf33a4ac64e9196d5be44a09bd0ed6ae052914e1a865ac8331fed863de8ea697e9a7f63329e5e23cda09c72570f46775b7e39ea9670086f847d3c9c51963b131409b1e04265d9747419c635404ca651bbcbc87f99b8008f7f5824653e3658be4ba73e4480156b390bb73bc1f8b33578e7a4e12440e9396f2552c1aff1c92e797ebacdc37c109ab7bce2367a19c56a033ee04534723cc2558cb27368f5b9d32c04d12dbd86bbd68b1d99b7c349a8453ea75d1b2e94491ab30acf6c46a36a75b721b312bedf4e7aad21e54e9bcbcf8144c79b6e3c05eb4a1547750d224c0085d80e6da3907c3d945051c13c7c1dcefd6520ee8379c4f5231ed";
  mod="10001";
  var _RSA = new RSAKey();//生成rsa加密对象
  _RSA.setPublic(key, mod);//设置公钥和mod，PublicKey是1（2）中打印的hex值
  return _RSA.encrypt(rawValue);
  };
return {
  rsa_encrypt:rsa_encrypt
}
}();

(function(global) {
	/*
	svn: http://tc-svn.tencent.com/pub/pub_TEAJS_rep/TEAJS_proj/trunk/tea.js
	QQ消息的加密算法是一个16次的迭代过程，并且是反馈的，每一个加密单元是8字节，输出也是8字节，密钥是16字节
	我们以prePlain表示前一个明文块，plain表示当前明文块，crypt表示当前明文块加密得到的密文块，preCrypt表示前一个密文块 f表示加密算法，d表示解密算法
	那么从plain得到crypt的过程是: crypt = f(plain ^ preCrypt) ^ prePlain 
	所以，从crypt得到plain的过程自然是 plain = d(crypt ^ prePlain) ^ preCrypt 
	此外，算法有它的填充机制，其会在明文前和明文后分别填充一定的字节数，以保证明文长度是8字节的倍数 填充的字节数与原始明文长度有关，填充的方法是:
		------- 消息填充算法 ----------- 
		a = (明文长度 + 10) mod 8
		if(a 不等于 0) a = 8 - a;
		b = 随机数 & 0xF8 | a;				这个的作用是把a的值保存了下来, a的值小于8
		plain[0] = b;                      	然后把b做为明文的第0个字节，这样第0个字节就保存了a的信息，这个信息在解密时就要用来找到真正明文的起始位置
		plain[1..a+2] = 随机数 & 0xFF;   	这里用随机数填充明文的第1到第a+2个字节
		plain[a+3..a+3+明文长度-1] = 明文; 	从a+3字节开始才是真正的明文
		plain[a+3+明文长度, 最后] = 0;      	在最后，填充0，填充到总长度为8的整数为止。到此为止，结束了，这就是最后得到的要加密的明文内容
		------- 消息填充算法 ------------
	@author 马若劼
	@author notXX
	*/
	var	__key = '',
		__pos = 0,
		__plain = [],
		__prePlain = [],
		__cryptPos = 0, // 当前密文块位置
		__preCryptPos = 0, // 上一个密文块位置
		__out = [], // 保存加密/解密的输出
		__cipher = [], // 输出的密文
		/*用于加密时，表示当前是否是第一个8字节块，因为加密算法是反馈的,
		但是最开始的8个字节没有反馈可用，所有需要标明这种情况*/
		__header = true;
	function __rand() {
		return Math.round(Math.random()*0xffffffff);
	}
	/**
	 * 将数据转化为无符号整形
	 */
	function __getUInt(data, offset, len) {
		if (!len || len > 4)
			len = 4;
		var ret = 0;
		for (var i=offset; i<offset+len; i++) {
			ret <<= 8;
			ret |= data[i];
		}
		return (ret & 0xffffffff) >>> 0; // 无符号化
	}
	/**
	 把整形数据填充到数组里，要注意端序
	 */
	function __intToBytes(data, offset, value) {
		data[offset+3] = (value >> 0) & 0xff;
		data[offset+2] = (value >> 8) & 0xff;
		data[offset+1] = (value >> 16) & 0xff;
		data[offset+0] = (value >> 24) & 0xff;
	}
	function __bytesInStr(data) {
		if (!data) return "";
		var outInHex = "";
		for (var i=0; i<data.length; i++) {
			var hex = Number(data[i]).toString(16);
			if (hex.length == 1)
				hex = "0" + hex;
			outInHex += hex;
		}
		return outInHex;
	}
	function __bytesToStr(data) {
		var str = "";
		for (var i=0; i<data.length; i+=2) // 输入的16进制字符串
				str += String.fromCharCode(parseInt(data.substr(i, 2), 16));
		return str;
	}
	function __strToBytes(str, unicode) {
		if (!str) return "";
		if (unicode) str = utf16ToUtf8(str);

		var data = [];
		for (var i=0; i<str.length; i++)
			data[i] = str.charCodeAt(i);
		return __bytesInStr(data);
	}

	//UTF-16转UTF-8
	function utf16ToUtf8(s){
		var i, code, ret = [], len = s.length;
		for(i = 0; i < len; i++){
			code = s.charCodeAt(i);
			if(code > 0x0 && code <= 0x7f){
				//单字节
				//UTF-16 0000 - 007F
				//UTF-8  0xxxxxxx
				ret.push(s.charAt(i));
			}else if(code >= 0x80 && code <= 0x7ff){
				//双字节
				//UTF-16 0080 - 07FF
				//UTF-8  110xxxxx 10xxxxxx
				ret.push(
					//110xxxxx
					String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
					//10xxxxxx
					String.fromCharCode(0x80 | (code & 0x3f))
				);
			}else if(code >= 0x800 && code <= 0xffff){
				//三字节
				//UTF-16 0800 - FFFF
				//UTF-8  1110xxxx 10xxxxxx 10xxxxxx
				ret.push(
					//1110xxxx
					String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
					//10xxxxxx
					String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
					//10xxxxxx
					String.fromCharCode(0x80 | (code & 0x3f))
				);
			}
		}

		return ret.join('');
	}

	function __encrypt(data) {
		__plain = new Array(8);
		__prePlain = new Array(8);
		__cryptPos = __preCryptPos = 0;
		__header = true;
		__pos = 0;
		var len = data.length;
		var padding = 0;

		__pos = (len + 0x0A) % 8;
		if (__pos != 0)
			__pos = 8 - __pos;
		__out = new Array(len + __pos + 10);
		__plain[0] = ((__rand() & 0xF8) | __pos ) & 0xFF;

		for (var i=1; i<=__pos; i++)
			__plain[i] = __rand() & 0xFF;
		__pos++;

		for (var i=0; i<8; i++)
			__prePlain[i] = 0;

		padding = 1;
		while (padding <= 2) {
			if (__pos < 8) {
				__plain[__pos++] = __rand() & 0xFF;
				padding++;
			}
			if (__pos == 8)
				__encrypt8bytes();
		}

		var i = 0;
		while (len > 0) {
			if (__pos < 8) {
				__plain[__pos++] = data[i++];
				len--;
			}
			if (__pos == 8)
				__encrypt8bytes();
		}

		padding = 1;
		while (padding <= 7) {
			if (__pos < 8) {
				__plain[__pos++] = 0;
				padding++;
			}
			if (__pos == 8)
				__encrypt8bytes();
		}

		return __out;
	}
	function __decrypt(data) {
		var count = 0;
		var m = new Array(8);
		var len = data.length;
		__cipher = data;

		if (len % 8 != 0 || len < 16)
			return null;
		/* 第一个8字节，加密的时候因为prePlain是全0，所以可以直接解密，得到消息的头部，
		关键是可以得到真正明文开始的位置
		*/
		__prePlain = __decipher(data);
		__pos = __prePlain[0] & 0x7;
		count = len - __pos - 10; // 真正的明文长度
		if (count < 0)
			return null;

		// 临时的preCrypt, 与加密时对应，全0的prePlain 对应 全0的preCrypt
		for (var i=0; i<m.length; i++)
			m[i] = 0;
		__out = new Array(count);
		__preCryptPos = 0;
		__cryptPos = 8; // 头部已经解密过，所以是8
		__pos++; // 与解密过程对应，+1

	/*	开始跳过头部，如果在这个过程中满了8字节，则解密下一块
		因为是解密下一块，所以我们有一个语句 m = data，下一块当然有preCrypt了，我们不再用m了
		但是如果不满8，这说明了什么？说明了头8个字节的密文是包含了明文信息的，当然还是要用m把明文弄出来
		所以，很显然，满了8的话，说明了头8个字节的密文除了一个长度信息有用之外，其他都是无用的填充*/
		var padding = 1;
		while (padding <= 2) {
			if (__pos < 8) {
				__pos++;
				padding++;
			}
			if (__pos == 8) {
				m = data;
				if (!__decrypt8Bytes())
					return null;
			}
		}

	/*	这里是解密的重要阶段，这个时候头部的填充都已经跳过了，开始解密
		注意如果上面一个while没有满8，这里第一个if里面用的就是原始的m，否则这个m就是data了*/
		var i=0;
		while (count != 0) {
			if (__pos < 8) {
				__out[i] = (m[__preCryptPos + __pos] ^ __prePlain[__pos]) & 0xff;
				i++;
				count--;
				__pos++;
			}
			if (__pos == 8) {
				m = data;
				__preCryptPos = __cryptPos - 8;
				if (!__decrypt8Bytes())
					return null;
			}
		}

		/*
			明文已经解密完毕了，到这里剩下的只有尾部的填充，应该全是0，如果解密后非0，即出错了，返回null
		*/
		for (padding=1; padding<8; padding++) {
			if (__pos < 8) {
				if ((m[__preCryptPos + __pos] ^ __prePlain[__pos]) != 0)
					return null;
				__pos++;
			}
			if (__pos == 8) {
				m = data;
				__preCryptPos = __cryptPos;
				if (!__decrypt8Bytes())
					return null;
			}
		}

		return __out;
	}
	function __encrypt8bytes() {
		for (var i=0; i<8; i++) {
			if (__header)
				__plain[i] ^= __prePlain[i];
			else
				__plain[i] ^= __out[__preCryptPos + i];
		}
		var crypted = __encipher(__plain);
		for (var i=0; i<8; i++) {
			__out[__cryptPos+i] = crypted[i] ^ __prePlain[i];
			__prePlain[i] = __plain[i];
		}

		__preCryptPos = __cryptPos;
		__cryptPos += 8;
		__pos = 0;
		__header = false;
	}
	function __encipher(data) {
		var loop = 16;
		var y = __getUInt(data, 0, 4);
		var z = __getUInt(data, 4, 4);
		var a = __getUInt(__key, 0, 4);
		var b = __getUInt(__key, 4, 4);
		var c = __getUInt(__key, 8, 4);
		var d = __getUInt(__key, 12, 4);
		var sum = 0;
		var delta = 0x9E3779B9 >>> 0;

		while (loop-- > 0) {
			sum += delta;
			sum = (sum & 0xFFFFFFFF) >>> 0;
			y += ((z << 4) + a) ^ (z + sum) ^ ((z >>> 5) + b);
			y = (y & 0xFFFFFFFF) >>> 0;
			z += ((y << 4) + c) ^ (y + sum) ^ ((y >>> 5) + d);
			z = (z & 0xFFFFFFFF) >>> 0;
		}
		var bytes = new Array(8);
		__intToBytes(bytes, 0, y);
		__intToBytes(bytes, 4, z);
		return bytes;
	}
	function __decipher(data) {
		var loop = 16;
		var y = __getUInt(data, 0, 4);
		var z = __getUInt(data, 4, 4);
		var a = __getUInt(__key, 0, 4);
		var b = __getUInt(__key, 4, 4);
		var c = __getUInt(__key, 8, 4);
		var d = __getUInt(__key, 12, 4);
		var sum = 0xE3779B90 >>> 0;
		var delta = 0x9E3779B9 >>> 0;

		while (loop-- > 0) {
			z -= ((y << 4) + c) ^ (y + sum) ^ ((y >>> 5) + d);
			z = (z & 0xFFFFFFFF) >>> 0;
			y -= ((z << 4) + a) ^ (z + sum) ^ ((z >>> 5) + b);
			y = (y & 0xFFFFFFFF) >>> 0;
			sum -= delta;
			sum = (sum & 0xFFFFFFFF) >>> 0;
		}

		var bytes = new Array(8);
		__intToBytes(bytes, 0, y);
		__intToBytes(bytes, 4, z);
		return bytes;
	}
	function __decrypt8Bytes() {
		var len = __cipher.length;
		for (var i=0; i<8; i++) {
			__prePlain[i] ^= __cipher[__cryptPos + i];
		}

		__prePlain = __decipher(__prePlain);

		__cryptPos += 8;
		__pos = 0;
		return true;
	}
	/**
	 * 把输入字符串转换为javascript array
	 */
	function __dataFromStr(str, isASCII) {
		var data = [];
		if (isASCII) {
			for (var i=0; i<str.length; i++)
				data[i] = str.charCodeAt(i) & 0xff;
		} else {
			var k = 0;
			for (var i=0; i<str.length; i+=2) // 输入的16进制字符串
				data[k++] = parseInt(str.substr(i, 2), 16);
		}
		return data;
	}

	global.TEA = {
		encrypt: function(str, isASCII) {
			var data = __dataFromStr(str, isASCII);
			var encrypted = __encrypt(data);
			return __bytesInStr(encrypted);
		},
		enAsBase64: function(str, isASCII) { // output base64 encoded
			var data = __dataFromStr(str, isASCII);
			var encrypted = __encrypt(data);
			var bytes = "";
			for (var i=0; i<encrypted.length; i++)
				bytes += String.fromCharCode(encrypted[i]);
			return btoa(bytes);
		},
		decrypt: function(str) {
			var data = __dataFromStr(str, false);
			var decrypted = __decrypt(data);
			return __bytesInStr(decrypted);
		},
		initkey: function(key, isASCII) {
			__key = __dataFromStr(key, isASCII);
		},
		bytesToStr: __bytesToStr,
		strToBytes: __strToBytes,
		bytesInStr: __bytesInStr,
		dataFromStr: __dataFromStr
	};

	/**
	 * base64 兼容window.btoa window.atob
	 * if (!window.btoa) window.btoa = base64.encode
	 * if (!window.atob) window.atob = base64.decode
	 */
	var base64 = {};
	base64.PADCHAR = '=';
	base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/*
	base64.getbyte64 = function(s,i) {
		// This is oddly fast, except on Chrome/V8.
		//  Minimal or no improvement in performance by using a
		//   object with properties mapping chars to value (eg. 'A': 0)
		var idx = base64.ALPHA.indexOf(s.charAt(i));
		if (idx == -1) {
			throw "Cannot decode base64";
		}
		return idx;
	}

	base64.decode = function(s) {
		// convert to string
		s = "" + s;
		var getbyte64 = base64.getbyte64;
		var pads, i, b10;
		var imax = s.length
		if (imax == 0) {
			return s;
		}

		if (imax % 4 != 0) {
			throw "Cannot decode base64";
		}

		pads = 0
		if (s.charAt(imax -1) == base64.PADCHAR) {
			pads = 1;
			if (s.charAt(imax -2) == base64.PADCHAR) {
				pads = 2;
			}
			// either way, we want to ignore this last block
			imax -= 4;
		}

		var x = [];
		for (i = 0; i < imax; i += 4) {
			b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) |
			(getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
		}

		switch (pads) {
			case 1:
				b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6)
				x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
				break;
			case 2:
				b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
				x.push(String.fromCharCode(b10 >> 16));
				break;
		}
		return x.join('');
	}
*/

	base64.getbyte = function(s,i) {
		var x = s.charCodeAt(i);
		if (x > 255) {
			throw "INVALID_CHARACTER_ERR: DOM Exception 5";
		}
		return x;
	}

	base64.encode = function(s) {
		if (arguments.length != 1) {
			throw "SyntaxError: Not enough arguments";
		}
		var padchar = base64.PADCHAR;
		var alpha   = base64.ALPHA;
		var getbyte = base64.getbyte;

		var i, b10;
		var x = [];

		// convert to string
		s = "" + s;

		var imax = s.length - s.length % 3;

		if (s.length == 0) {
			return s;
		}
		for (i = 0; i < imax; i += 3) {
			b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);
			x.push(alpha.charAt(b10 >> 18));
			x.push(alpha.charAt((b10 >> 12) & 0x3F));
			x.push(alpha.charAt((b10 >> 6) & 0x3f));
			x.push(alpha.charAt(b10 & 0x3f));
		}
		switch (s.length - imax) {
			case 1:
				b10 = getbyte(s,i) << 16;
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
				padchar + padchar);
				break;
			case 2:
				b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);
				x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
				alpha.charAt((b10 >> 6) & 0x3f) + padchar);
				break;
		}
		return x.join('');
	}
	if (!window.btoa) window.btoa = base64.encode;
	//if (!window.atob) window.atob = base64.decode;
})(window);
$ = window.$ || {};
$pt = window.$pt || {}; // login_div 被嵌在其它页面中，有可能$被覆盖
$.Encryption = $pt.Encryption=function(){
/********************************************
 *
 *  加密及算法相关，算法这个地方，很多函数可能没用，看微博的测试结果再处理。
 *
 *******************************************/
var hexcase = 1;
var b64pad = "";
var chrsz = 8;
var mode = 32;
function md5(s){
  return hex_md5(s);
}
function hex_md5(s){
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s){
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data){
  return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data){
  return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data){
  return binl2str(core_hmac_md5(key, data));
}
//function md5_vm_test()//此方法只是测试是否运行正常
//{
//  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
//}
function core_md5(x, len){
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a = 1732584193;
  var b =  - 271733879;
  var c =  - 1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16)  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7,  - 680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12,  - 389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22,  - 1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7,  - 176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17,  - 1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22,  - 45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12,  - 1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17,  - 42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22,  - 1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12,  - 40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17,  - 1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5,  - 165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9,  - 1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20,  - 373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5,  - 701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14,  - 660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20,  - 405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9,  - 1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14,  - 187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5,  - 1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9,  - 51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20,  - 1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4,  - 378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11,  - 2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23,  - 35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4,  - 1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16,  - 155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23,  - 1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11,  - 358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16,  - 722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4,  - 640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11,  - 421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23,  - 995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6,  - 198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15,  - 1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21,  - 57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10,  - 1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15,  - 1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21,  - 2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10,  - 30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15,  - 1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6,  - 145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10,  - 1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21,  - 343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  if (mode == 16) {
    return Array(b, c);
  }else{
    return Array(a, b, c, d);
  }
}
function md5_cmn(q, a, b, x, s, t){
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t){
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t){
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t){
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t){
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
function core_hmac_md5(key, data){
  var bkey = str2binl(key);
  if (bkey.length > 16)
    bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for (var i = 0; i < 16; i++){
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512+data.length * chrsz);
  return core_md5(opad.concat(hash), 512+128);
}
function safe_add(x, y){
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
function bit_rol(num, cnt){
  return (num << cnt) | (num  >>> (32-cnt));
}
function str2binl(str){
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
  return bin;
}
function binl2str(bin){
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
  return str;
}
function binl2hex(binarray){
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";

  for (var i = 0; i < binarray.length * 4; i++){
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8+4)) & 0xF) +
      hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
  }
  return str;
}
function binl2b64(binarray){
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3){
    var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | ((
      (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i
      + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
    for (var j = 0; j < 4; j++){
      if (i * 8+j * 6 > binarray.length * 32)
        str += b64pad;
      else
        str += tab.charAt((triplet >> 6 * (3-j)) & 0x3F);
    }
  }
  return str;
}

function hexchar2bin(str){
	var arr = [];
	for(var i=0;i<str.length;i=i+2){
		arr.push(String.fromCharCode(parseInt(str.substr(i,2),16)));
	}
	return arr.join('')
}

function __monitor(mid, probability) {
    if (Math.random() > (probability || 1)) return;
    try {
      var url = location.protocol + '//ui.ptlogin2.qq.com/cgi-bin/report?id=' + mid;
      var s = document.createElement("img");
      s.src = url;
    } catch (e) {}
}
/**
 * encrypt user password with salt
 * @param  {String} password 原始密码
 * @param  {String} salt     check 返回的序列
 * @param  {String} vcode    验证码
 * @param  {Boolean} isMd5   传入的密码是否MD5
 * @return {String} PtA1     返回的加密字符串
 */
function getEncryption(password, salt, vcode, isMd5) {
  vcode = vcode || "";
  password = password || "";
  var md5Pwd = isMd5 ? password : md5(password),
      h1 = hexchar2bin(md5Pwd),
      s2 = md5(h1 + salt),
      hexVcode = TEA.strToBytes(vcode.toUpperCase(), true),
      vcodeLen = Number(hexVcode.length/2).toString(16);

  while (vcodeLen.length < 4)
    vcodeLen = "0" + vcodeLen;

  TEA.initkey(s2);
  var rawContent = TEA.encrypt(md5Pwd + TEA.strToBytes(salt) + vcodeLen + hexVcode);
  TEA.initkey(""); // reset key
  var rawLength = Number(rawContent.length / 2).toString(16);
  while (rawLength.length < 4)
    rawLength = '0' + rawLength;
  var result = $pt.RSA.rsa_encrypt(hexchar2bin(rawLength + rawContent));
  setTimeout(function() { // IE6 下报权限错误！
    __monitor(488358, 1);
  }, 0);
  return btoa(hexchar2bin(result)).replace(/[\/\+=]/g, function(a) {return {'/':'-', '+':'*', '=':'_'}[a];});
}
function getRSAEncryption(password,vcode, isMd5){
  var str1 = isMd5 ? password : md5(password);
  var str2 = str1+vcode.toUpperCase();
  var str3=$.RSA.rsa_encrypt(str2);
  return str3;
}
return {
  getEncryption:getEncryption,
  getRSAEncryption:getRSAEncryption,
  md5: md5
};
}();
try {
    /**
     * MTT QQ浏览器API
     * @type {{version, isAndroid, isIPhone, canQlogin, QLogin4PT, canOneKey, refreshToken}}
     */
    // console.log(window)
    window.MTT = (function() {
        var version = 0,
            platform = "";
        try {
            if (typeof window.browser != 'undefined')
                version = browser.env && browser.env.version;
            else
                window.browser = { env: {}, app: {}, login: {} };
            platform = browser.env && browser.env.platForm;
        } catch (e) {
            $.report.nlog("browser_env:" + "ver(" + window.ptui_pt_version + ")" + e.message, "647126");
        }

        var isAndroid = (platform == "ADR");
        var isIPhone = (platform == "I");
        var isIPad = (platform == "IP");

        function canQlogin() {
            try {
                if (!version) return false;

                var ua = navigator.userAgent;
                var isWPMTT = /msie/i.test(ua) && ("notify" in window.external);
                if (isWPMTT)
                    return true;

                var isIphoneQQBrowser = isIPhone && version >= 42;
                var isIpadQQBrowser = isIPad && version >= 32;
                var isAndoidQQBrowser = isAndroid && version >= 42;

                return isIphoneQQBrowser || isIpadQQBrowser || isAndoidQQBrowser;
            } catch (e) {
                return false;
            }
        }

        function QLogin4PT(callbackFunc) {
            var canQlogin = ($.cookie.get("pt_qlogincode") != 5) && MTT.canQlogin();
            if ("function" != typeof(callbackFunc)) {
                return;
            }
            if (canQlogin) {
                if (/msie/i.test(window.navigator.userAgent)) {
                    window.external.notify("#@getUserInfoWT@#pt.qqBrowserCallback");
                } else {
                    if (isAndroid)
                        if (browser.login.getLoginInfo) browser.login.getLoginInfo(callbackFunc, callbackFunc);
                        else callbackFunc("");
                    else if (isIPhone || isIPad)
                        if (browser.login.getUinAndSidInfo) browser.login.getUinAndSidInfo(callbackFunc, callbackFunc);
                        else callbackFunc("");
                }
            } else {
                callbackFunc("");
                if ($.cookie.get("pt_qlogincode") == 5) {
                    $.report.nlog("快速登录异常：pt_qlogincode=5", "276650");
                }
            }
        }

        function canOneKey(success, fail) {
            if (!version) { // 非QQ浏览器直接返回false
                fail && fail();
                return false;
            }

            if (isAndroid) {
                if (!browser.app.getApkInfo) return fail && fail();

                browser.app.getApkInfo(function(info) {
                    try {
                        info = JSON.parse(JSON.parse(info));
                        if (version >= 51 && info && info.versionname >= "4.7")
                            success && success();
                        else
                            fail && fail();
                    } catch (e) {
                        fail && fail();
                    }
                }, "com.tencent.mobileqq");
            } else if (isIPhone || isIPad) {
                window.x5 && x5.exec(function(app) {
                    if (app && app.isSupportApp)
                        success && success();
                    else
                        fail && fail();
                }, fail, "app", "getMobileAppSupport", [{
                    "scheme": "wtloginmqq2://"
                }]);
            }

            return false;
        }

        function refreshToken(uin, callback) { // 刷新QQ浏览器的stweb票据
            if (isAndroid && browser.login.refreshToken) {
                browser.login.refreshToken({ "uin": uin }, callback);
            } else if (isIPad || isIPhone) {
                window.x5 && x5.exec(callback, callback, "login", "refreshToken", [{ "uin": uin }]);
            }
        }

        return {
            version: version,
            isAndroid: isAndroid,
            isIPhone: isIPhone,
            canQlogin: canQlogin,
            QLogin4PT: QLogin4PT,
            canOneKey: canOneKey,
            refreshToken: refreshToken
        };
    }());
} catch (e) {
    // console.log(e)
    $.report.nlog("QB Exception:" + "ver(" + window.ptui_pt_version + ")" + e.message, "647127");
    window.MTT = {};
}
/////////////////////////////////////////////////////登录逻辑
var pt = {
    pageState: 1,
    login_href: window.g_href,
    domain: window.ptui_domain,
    isHttps: $.check.isHttps(),
    errTipClock: 0, //错误提示定时器

    lang: window.STR_LANG,
    submit_o: {}, //登录提交参数对象
    auto_login: false, //下次自动登录
    switch_position_x: 0, //滑动开关位置（应该是手指的位置）
    touchstartTime: 0, //按住开始的时间，用于计算长按
    longTouchTime: 500, //长按时间
    default_face_url: "", //默认头像地址
    is_qlogin: false, //是否快速登录
    lang_num: window.ptui_lang, //语言
    action: [0, 0], //动作
    vcode: "", //验证码
    verifysession: "", //验证码cookie

    deviceType: 2, //0  pc ;1  android;2  iphone;3  wp;4  symbian;5  blackberry;其它认为是pc
    login_uin: "",
    login_pwd: "", //3-md5
    needAt: "", //特殊帐号前加@符号

    //////////////////////////////// url中自定义参数

    appid: "", //appid 必须的
    s_url: "", //登录成功跳转的url
    low_login_enable: window.ptui_low_login, //弱登录
    style: 9,

    /////////////////////////////////////
    t_type: 0,

    /////////////
    isSubmiting: false, //判断是否正在提交
    key_interval: 0,

    keyindex: 19, //qq浏览器快速登录
    qqBrowserInfo: null, //qq浏览器快速登录信息,object
    openCookieInfo: null, //互联cookie登录信息
    authInfo: null, //授权信息，object
    authUin: '', //授权信息
    authNick: '', //授权昵称
    authLoginUrl: '', //授权登录url
    qlogin_list_data: [], //快速登录数据（所有的出现头像的）

    checkUrl: '',
    loginUrl: '',

    cookieInfo: null, //互联cookie登录的信息
    cookieLogin: false, //是否使用cooki中skey登录
    //快速登录的头像列表
    regTmp: '<span id="#uin#" pwd="#pwd#" type="#type#" class="header" onclick="pt.clickHeader(event);">\
                    <div id="del_touch_#uin#" class="del_touch_icon" >\
                        <span id="del_#uin#" class="del_icon" ></span>\
                    </div>\
                    <img  id="img_#uin#" src="#src#" onerror="pt.face_error();" /> \
                    <div id="img_out_#uin#" class="img_out"></div>\
                    <label id="nick_#uin#" class="nick">#nick# </label>\
                </span>',
    //互联快速登录头像
    hulianRegTmp: '<div class="useravatar">\
                    <img id="img_#uin#" src="#src#" onerror="pt.face_error();" alt="#nick#" />\
                  </div>\
                  <div class="userinfo">\
                        <div class="usernick" id="hl_usernick">#nick#</div>\
                        <div class="userqq">#uin#</div>\
                  </div>\
                  <button id="userSwitch" class="switch" tabindex="5" href="javascript:void(0)";>切换帐号</button>',
    new_vcode: false,
    clickEvent: "touchstart",
    checkErr: {
        "2052": "网络繁忙，请稍后重试。",
        "1028": "網絡繁忙，請稍後重試。",
        "1033": "The network is busy, please try again later."
    },
    /**
     * 是否互联登录框
     */
    isHulian: window.ptui_appid == 716027609,
    isOffice: window.ptui_style == 39,
    isWtlogin: window.ptui_style == 42,

    isInIframe: window.ptui_style == 38 || window.self !== window.top, //遇到了非38的iframe内嵌，这里判断一下更准确
    is3gNews: window.ptui_style == 37, // 37 手腾网，最简单的版本
    isMail: window.ptui_appid == 522005705,
    lockedAccount: window.ptui_lockuin == 1 ? window.ptui_defuin : "", // 锁定账号，比如说财付通支付场景
    ua: window.navigator.userAgent.toLowerCase(),
    isWX: window.navigator.userAgent.match(/micromessenger\/(\d\.\d\.\d)/i),
    isMQQ: window.navigator.userAgent.match(/qq\/(\d\.\d\.\d)/i),
    isAndroid: /android/i.test(window.navigator.userAgent),
    isIos: (/iPad|iPhone|iPod/.test(window.navigator.platform) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)) &&
    !window.MSStream,
    isIPhone: /iphone/i.test(window.navigator.userAgent),
    uInput: $("u"),
    pInput: $("p"),
    btnGo: $("go"),
    btnGo2: $("go2"),
    btnOnekey: $("onekey"),
    
    browser : (function(){

        
        var browser = {
            //这里要注意一件时间，由于历史逻辑的存在，当在企业微信打开时，isWX=true，isWorkWX=true ，暂时保留这样，后续迭代时再处理
            isWX: false,
            isWorkWX : false,
            ua : '',
            replaceLocation : function(url, context){
                const win = context || window
                win.location.replace(url)
            },
            setLocation : function(url, context){
                const win = context || window
                win.location.assign(url)
            },
            isOnline : function(){
                return !!window.navigator.onLine
            },
            init : function(){
                browser.ua = window.navigator.userAgent.toLowerCase() ||  '';
                browser.isWX = !!browser.ua.match(/micromessenger\/(\d\.\d\.\d)/i)
                browser.isWorkWX = !!browser.ua.match(/wxwork\/\d\.\d\.\d/i)
            }
        }
        //默认进行一次初始化
        browser.init();
        return browser
    })(),

    
    
    
    /**
     * [redirect 统一跳转]
     * @param  {[type]} target [description]
     * @param  {[type]} url    [description]
     * @return {[type]}        [description]
     */
    redirect: function(target, url) {
        switch (target + '') {
            case '0':
                if (pt.isInIframe || $.bom.query("pt_replace") == "1")
                    this.browser.replaceLocation(url); // 作为iframe. 不想留下历史记录
                else
                    this.browser.setLocation(url); //这里换成assign，方便sinon mock
                break;
            default:
                if ($.bom.query("pt_replace") == "1")
                    this.browser.replaceLocation(url,window.top);
                else
                    this.browser.setLocation(url, window.top);
                    // window.location.assign(url); //这里换成assign，方便sinon mock
                break;
        }
    },
    init: function() {
        if (pt.hasInit) {
            return;
        } else {
            pt.hasInit = true;
        }
        pt.default_face_url = "//imgcache.qq.com/ptlogin/v4/style/0/images/1.gif"; //QQ企鹅头像地址

        pt.initSURL();

        pt.setClickEvent();

        if (pt.isOffice) {
            pt.open.loadAppInfo();
        }
        //发起各种异步请求
        if (!window.hlhdFlag) {
            pt.qqBrowserQlogin();
        }
        pt.auth();

        //绑定相关事件
        pt.bindEvent();
        pt.bindInput();
        //隐藏地址栏
        pt.hideURLBar();

        //先屏蔽，等验证码准备完成了再打开
        pt.setVcodeFlag();
        //拉取头像

        pt.setUrl();

        pt.showAutoLogin();

        $.winName.set("login_href", encodeURIComponent(pt.login_href));
        pt.checkIframe();
        pt.checkPostMessage();
        if (window.ptui_style == 42) {
            pt.uInput && pt.uInput.focus()
        }
        window.setTimeout(function(e) {
            if (window.ptui_appid != "549000929") { //qzone的不上报
                pt.webLoginReport();
            }

            /*
             ID: 408084    名称：互联手机版不支持cookie
             ID: 408085    名称：互联手机版不支持cookie bug
             ID: 410030    名称：login_mobile.js check 总量(10%)
             ID: 410031    名称：login_mobile.js check后台不下发cookie
             */
            $.report.monitor(412020, 0.05);
            if (!navigator.cookieEnabled) {
                $.report.monitor(410030);
                if ($.cookie.get('ptcz'))
                    $.report.monitor(410031);
            }

        }, 2000);

        if (pt.lockedAccount && window.ptui_tab) {
            //锁定帐号的时候不展示二维码入口
            pt.switchpwd();
            var qlogin_entry = $('qlogin_entry');
            qlogin_entry && $.css.hide(qlogin_entry);
        }

        //Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C101 QQ/7.9.9.445 V1_IPH_SQ_8.0.8_1_APP_A Pixel/1080 Core/WKWebView Device/Apple(iPhone 7Plus) NetType/4G QBWebViewType/1 WKType/1
        var capthchaJsUrl = (pt.isHttps ? 'https://ssl.captcha.qq.com/' : 'http://captcha.qq.com/') +
                'template/TCapIframeApi.js?aid=' + window.ptui_appid + '&rand=' + Math.random() + '&clientype=1&lang=' +
                pt.lang_num + '&apptype=2'
        if(navigator.userAgent.indexOf('Core/WKWebView')>=-1){
            //wk webview里边, 如果有任何js资源 一直没有回包, 会阻塞页面渲染, 所以放到onload之后再去
            window.addEventListener('load', function(){
                $.http.loadScript(capthchaJsUrl,
                function() {});
            })
            
        }else{
            $.http.loadScript(capthchaJsUrl,
                function() {});
        }
    },
    VCCallback: function(data) {
        switch (+data.ret) {
            case 0:
                pt.submitNewVcode(data);
                break;
            case 1:
                pt.go_back();
                break;
        }
    },
    setUrl: function() {
        var proto = pt.isHttps ? "https://ssl." : "http://";
        var protoCheck = pt.isHttps ? "https://ssl." : "http://check.";
        pt.checkUrl = protoCheck + "ptlogin2." + pt.domain + "/check?";
        pt.loginUrl = proto + "ptlogin2." + pt.domain + "/";
    },
    /**
     * [ptui_speedReport 测速上报]
     * @param  {Object} params [键值对象]
     * @return {[type]}        [description]
     */
    ptui_speedReport: function(params) {
        var url = 'http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=8';
        var flag3 = 1;
        if (pt.isHttps) {
            url = 'https://huatuospeed.weiyun.com/cgi-bin/r.cgi?flag1=7808&flag2=8';
            flag3 = 2;
        } else {
            //url = 'http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=8';
            if ($.detectBrowser()[0] == "MQQBrowser") {
                var net = navigator.connection;
                if (net && net.type) {
                    var type = net.type;
                    if (type == 1) { //ethernet
                        flag3 = 3;
                    } else if (type == 2) { //wifi
                        flag3 = 4;
                    } else if (type == 3) { //2g
                        flag3 = 5;
                    } else if (type == 4) { //3g
                        flag3 = 6;
                    } else if (type == 5) { //4g
                        flag3 = 7;
                    } else { //none
                        flag3 = 8;
                    }
                } else {
                    flag3 = 8;
                }

            } else {
                flag3 = 1;
            }
        }
        url += '&flag3=' + flag3;
        for (var o in params) {
            //除去十分不靠谱的时间（超过15秒）
            if (params[o] > 15000 || params[o] < 0) {
                continue;
            }
            url += "&" + o + "=" + (params[o] || 1); //最小赋值为1，否则会被丢弃
        }
        var img = new Image();
        img.src = url;
    },
    /**
     * [webLoginReport 测速上报逻辑]
     * @return {[type]} [description]
     */
    webLoginReport: function() {
        try {
            //抽样20%,QQ浏览器全部上报
            if (Math.random() > 0.2 && $.detectBrowser()[0] != "MQQBrowser") {
                return;
            }
            var points = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"];
            var params = {};
            var h5_time = window.performance ? window.performance.timing : null;
            if (h5_time) {
                var baseTime = h5_time[points[0]];
                var i = 1;
                for (var len = points.length; i < len; i++) {
                    if (h5_time[points[i]]) {
                        params[i] = h5_time[points[i]] - baseTime;
                    }
                }
                if (loadJs && loadJs.onloadTime)
                    params[i++] = loadJs.onloadTime - baseTime;
                var isReasonable = h5_time['connectEnd'] >= h5_time['connectStart'] && h5_time["responseEnd"] >= h5_time["responseStart"] && h5_time['domComplete'] >= h5_time['domInteractive'] && h5_time['domInteractive'] >= h5_time['domLoading'] && h5_time['loadEventStart'] >= h5_time['domComplete'] && h5_time['loadEventEnd'] >= h5_time['loadEventStart'];
                if (isReasonable) {
                    pt.ptui_speedReport(params);
                }
            }

        } catch (e) {}
    },
    setClickEvent: function() {
        var noIosOrAndroid = !/iphone|ipad|android/.test(window.navigator.userAgent.toLowerCase());
        if(noIosOrAndroid){
            pt.clickEvent = "click";
        }else{
            pt.clickEvent = "touchstart";
        }
    },
    //存储上次登录的号码（only one），登录成功且没有选择自动登录的
    saveLastUin: function(uin) {
        $.localStorage.set("last_uin", uin);
    },

    //获取上次登录的号码
    getLastUin: function() {
        return $.localStorage.get("last_uin");
    },
    //将一个对象转换成url后面的参数 a=b&
    object2param: function(obj) {
        var arr = [];
        for (var n in obj) {
            arr.push(n + "=" + obj[n] + "&");
        }
        return arr.join("");
    },
    //ps：以下部分都是海外登录的逻辑，由于不清楚情况，先不要动
    //进入海外手机登录页面
    is_oversea: false,
    enterOverseaLogin: function() {
        try {
            pt.alert.hide();
        } catch (e) {}
        var e = $('oversea');
        e && $.css.show(e);
        pt.is_oversea = true;

        $('state').value = _areaList[0].n;
        $('country-code').innerHTML = '+' + _areaList[0].c;
        if (window.openSDK && window.openSDK.clearAllEdit) {
            $('password').value = '';
            window.openSDK.clearAllEdit();
        }
    },
    exitOverseaLogin: function() {
        var e = $('oversea');
        e && $.css.hide(e);
        pt.is_oversea = false;

        if (window.openSDK && window.openSDK.clearAllEdit) {
            pt.pInput.value = '';
            window.openSDK.clearAllEdit();
        }
    },
    //进入国家选择页
    enterOverseaCountry: function() {
        pt.initOverseaCountry();
        var e = $('country');
        e && $.css.show(e);
        var state = $('state');
        state && state.blur();
    },
    setOverseaCountry: function(code) {
        for (var i in _areaList) {
            if (code == _areaList[i].n) {
                $('state').value = _areaList[i].n;
                $('country-code').innerHTML = '+' + _areaList[i].c;
                pt.exitOverseaCountry();
                return;
            }
        }
    },
    initOverseaCountry: function() {
        var search = $('country-search'),
            list = $('country-list'),
            html = '';
        search.value = '';
        if (_areaList) {
            for (var i in _areaList) {
                html += '<li onclick="pt.setOverseaCountry(\'' + _areaList[i].n + '\')">' + _areaList[i].n + '</li>'
            }
        }
        list.innerHTML = html;
    },
    updateOverseaCountry: function() {
        var search = $('country-search'),
            list = $('country-list'),
            html = '';
        if (_areaList) {
            var key = new RegExp(search.value.split('').join('.{0,}'), "i");
            for (var i in _areaList) {
                if (key.test(_areaList[i].c) || key.test(_areaList[i].n) || key.test(_areaList[i].p))
                    html += '<li onclick="pt.setOverseaCountry(\'' + _areaList[i].n + '\')">' + _areaList[i].n + '</li>'
            }
        }
        list.innerHTML = html;
    },
    countrySearchFocus: function() {
        var placeholder = $('country-search-placeholder');
        placeholder && $.css.hide(placeholder);
    },
    countrySearchBlur: function() {
        var placeholder = $('country-search-placeholder');
        var input = $('country-search');
        input && placeholder && input.value.length === 0 && $.css.show(placeholder);
    },
    exitOverseaCountry: function() {
        var e = $('country');
        e && $.css.hide(e);
    },
    //ps：以上部分都是海外登录的逻辑，由于不清楚情况，先不要动
    //显示错误
    showErr: function(message, callback) {
        clearTimeout(pt.errTipClock);

        var timeout = 3000;
        if ((typeof callback).toLocaleLowerCase() == "number") {
            timeout = parseInt(callback, 10);
            callback = null;
        }

        $("error_message").innerHTML = message;
        $.css.show("error_tips");
        if (pt.isHulian) {
            if (window.navigator.userAgent.match(/iphone/i)) {
                pt.btnGo.focus(); // fix ios webview 键盘无法输入问题
            }
            pt.errTipClock = window.setTimeout(function() {
                pt.hideErr(callback);
            }, timeout);
        } else {
            callback && callback();
            pt.errTipClock = window.setTimeout(function() {
                pt.hideErr();
            }, timeout);
        }

    },
    /**
     * [hideErr 隐藏错误]
     * @return {[type]} [description]
     */
    hideErr: function(callback) {
        $.css.hide("error_tips");
        callback && callback();
    },
    /**
     * [checkiframe description]
     * @return {[type]} [description]
     */
    checkIframe: function() {
        try {
            if (top != self && !pt.isHulian) {
                $.report.nlog("iphone登录框被iframe;" + "referer=" + document.referrer, "347748");
            }
        } catch (e) {

        }

    },
    checkPostMessage: function() {
        if (typeof window.postMessage == "undefined") {
            $.report.nlog("iphone登录框不支持postMessage;", "350525");
        }
        if (typeof window.JSON == "undefined") {
            $.report.nlog("iphone登录框不支持JSON;", "362678");
        }
    },
    /**
     * [setVcodeFlsg 初始化使用验证码的方式]
     */
    setVcodeFlag: function() {
        if (typeof window.postMessage == "undefined" || typeof window.JSON == "undefined") {
            pt.new_vcode = false;
        } else {
            pt.new_vcode = true;
        }
    },
    /**
     * [getAuthUrl 构造授权url]
     * @return {String} [description]
     */
    getAuthUrl: function() {
        var authUrl = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/pt4_auth?daid=" + window.ptui_daid + "&appid=" + window.ptui_appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken"));
        if (/^https/.test(pt.s_url)) { //成功地址为https的
            authUrl += "&pt4_shttps=1";
        }
        if (window.ptui_pt_qzone_sig == "1") {
            authUrl += "&pt_qzone_sig=1";
        }
        return authUrl;
    },
    /**
     * [auth 授权]
     * @return {[type]} [description]
     */
    auth: function() {
        //获取参数列表
        pt.getParam();
        pt.initSURL();
        var authUrl = pt.getAuthUrl();
        var superuin = $.cookie.get("superuin"); //没有skey就没有superkey，这个时候可以不用去后台请求了
        // APP下发superkey的时候，一般并不下发supertoken, 所以只能这里自己下发，这主要还依赖于后台对supertoken并不要求与superkey对应
        var fake_supertoken = $.str.hash33(superuin);
        if (!parseInt($.cookie.get("supertoken")) && fake_supertoken)
            $.cookie.set("supertoken", $.str.hash33(superuin), "ptlogin2." + pt.domain);
        if (window.ptui_daid && window.ptui_noAuth != "1" && superuin != "" && !pt.isWtlogin) {
            $.http.loadScript(authUrl);
        }
    },

    showAuth: function(url) {
        var params = url.substr(url.indexOf("?") + 1);
        var m = params.match(RegExp("(^|&)uin=([^&]*)(&|$)"));
        pt.authUin = !m ? "" : decodeURIComponent(m[2]);
        pt.authLoginUrl = url;
        pt.authNick = $.str.utf8ToUincode($.cookie.get("ptnick_" + pt.authUin)) || pt.authUin;
        if (pt.authUin) {
            pt.authInfo = {
                "uin": $.str.encodeHtml(pt.authUin),
                "nick": $.str.encodeHtml(pt.authNick),
                "authUrl": pt.authUrl,
                "type": 3
            };
        }
    },

    // 互联使用superkey登录，包括已登录互联或者已登录其它业务两种情况
    setCookieLogin: function() {
        //非手Q内需要superkey登录 优先使用superkey
        var superkey = $.cookie.get("supertoken");
        var uin = $.cookie.get("superuin");
        if (uin) uin = parseInt(uin.substring(1), 10);
        else uin = null;
        var nick = $.str.utf8ToUincode($.cookie.get("ptnick_" + uin)) || uin;
        var hasCookie = window.ptui_daid && superkey;
        if ((hasCookie && uin)) {
            pt.cookieInfo = {
                "uin": $.str.encodeHtml(uin),
                "nick": $.str.encodeHtml(nick),
                "superkey": superkey,
                "type": 4
            };
            return true;
        }
        //没有superkey的时候 手Q内直接可以用clientkey登录
        uin = $.cookie.uin();
        nick = $.str.utf8ToUincode($.cookie.get("ptnick_" + uin)) || uin;
        if (uin && pt.mqqCanQLogin()) {
            pt.cookieInfo = {
                "uin": $.str.encodeHtml(uin),
                "nick": $.str.encodeHtml(nick),
                "type": 4
            };
            return true;
        }
        return false;
    },
    qqBrowserQlogin: function() {
        try {
            //iframe的话无法获取到qq浏览器的信息, android 还是可以的
            if (self === top || MTT.isAndroid) {
                MTT.QLogin4PT(pt.qqBrowserCallback);
            }
        } catch (e) {
            $.report.nlog("快速登录异常,qqBrowserQlogin," + e.message, "276650");
        }
    },
    qqBrowserCallback: function(info) {
        try {
            if (info && typeof info === "string")
                info = JSON.parse(info);

            if (info && ($.check.isQQ(info.uin) && info.loginkey.length != 0 && info.loginkey.length > 10)) {
                pt.qqBrowserInfo = {};
                pt.qqBrowserInfo.uin = $.str.encodeHtml(info.uin);
                pt.qqBrowserInfo.nick = $.str.encodeHtml(info.nickname);
                pt.qqBrowserInfo.loginkey = info.loginkey;
                pt.qqBrowserInfo.type = 2;
                pt.refreshQloginUI();
            } else {
                if (info && info.uin.length == 0) {
                    $.report.nlog("快速登录异常：数据返回异常,没有uin", "276650");
                } else if (info && info.loginkey.length == 0) {
                    $.report.nlog("快速登录异常：数据返回异常,没有loginkey", "276650");
                } else if (info) {
                    $.report.nlog("快速登录异常：数据返回异常:" + info.loginkey.length, "276650");
                }
            }
        } catch (e) {
            $.report.nlog("快速登录异常： qqBrowserCallback " + e.message, "276650");
        }
    },
    initSURL: function() {
        pt.s_url = $.bom.query("s_url");
        if (pt.isMail && pt.low_login_enable == 1)
            pt.s_url = pt.addParamToUrl(pt.s_url, "ss", 1);
    },
    /**
     * [addParamToUrl 在一个url后面增加参数]
     * @param {String} url   [description]
     * @param {String} name  [description]
     * @param {String|Number} value [description]
     */
    addParamToUrl: function(url, name, value) {
        var u1 = url.split('#');
        var sep = u1[0].indexOf('?') > 0 ? '&' : '?';
        if (u1[0].substr(u1[0].length - 1, 1) == '?') {
            sep = ''; // 没有更多参数，也就不用加个&了
        }
        if (u1[1]) {
            u1[1] = '#' + u1[1];
        } else {
            u1[1] = '';
        }
        return u1[0] + sep + name + '=' + value + u1[1];
    },
    //获取url参数
    getParam: function() {
        pt.appid = window.ptui_appid;
        if (pt.isInIframe) { //style=38支持self跳转，其他的都是top跳转
            switch (window.ptui_target) {
                case "_self":
                case "0":
                    pt.target = 0;
                    break;
                case "_top":
                case "1":
                    pt.target = 1;
                    break;
                default:
                    pt.target = 1;
                    break;
            }
        } else {
            pt.target = 1;
        }
        //pt.low_login_enable = ($.bom.query("low_login_enable")==1 ? $.bom.query("low_login_enable") : 0) || ($.bom.query("low_login")==1 ? $.bom.query("low_login") : 0);
        pt.style = window.ptui_style ? window.ptui_style : 9;
        // 改造中，改造完成只需把这个注释去掉, skey 与 superkey 是兼容的
        //if (pt.isHulian)
        //	window.ptui_daid = window.ptui_daid || 381; // 互联登录有可能被其它业务直接引用，那么这个daid就不一定会传过来，所以自己加上
        if (pt.isHulian)
            window.pt_skey_valid = parseInt($.bom.query("pt_skey_valid")) || 0; // 由互联跳转过来时带的标记位
    },
    //生成快速登录列表
    build_qlogin_list: function() {
        var qlogin_list_data = pt.get_qlogin_list();
        pt.qlogin_list_data = qlogin_list_data;
        var length = qlogin_list_data.length
        if (window.ptui_style == 35 && length > 1)
            length = qlogin_list_data.length = 1
        if (length > 0 && !window.ptui_tab) {
            pt._switch(2); //指定切到快速登录页
            pt.hideOneKey();
            var strMessage = "";
            for (var i = 0; i < length; i++) {
                if (qlogin_list_data[i].uin != "") {
                    strMessage += pt.regTmp.replace(/#uin#/g, qlogin_list_data[i].uin)
                        .replace(/#nick#/g, qlogin_list_data[i].nick)
                        .replace(/#pwd#/g, qlogin_list_data[i].pwd)
                        .replace(/#type#/g, qlogin_list_data[i].type)
                        .replace(/#src#/g, pt.default_face_url);
                }
            }
            if (length > 1 && window.xMsg && window.xMsg.call)
                window.xMsg.call("connect", "userSwitch", {}, function() {});
            $("q_logon_list").innerHTML = strMessage;
            //昵称过长的中间加...
            for (var i = 0; i < length; i++) {
                pt.getShortWord($("nick_" + qlogin_list_data[i].uin), qlogin_list_data[i].nick, 95);
            }
            pt.initFace();
            $("swicth_login") && ($("swicth_login").style.display = "block");
        } else {
            $("web_login") && ($("web_login").style.display = "block");
            $("swicth_login") && ($("swicth_login").style.display = "none");
        }

    },
    fill_usernick: function() {
        // 手Q环境下补充昵称
        if (window.mqq && window.mqq.data && window.mqq.data.getUserInfo) {
            window.mqq.data.getUserInfo(function(result) {
                var usernick = $("hl_usernick");
                if (usernick && result && result.nick)
                    usernick.innerHTML = $.str.encodeHtml(result.nick);
            });
        }
    },
    build_office_qlogin: function() {
        $.report.monitor(2123219);
        if (!pt.cookieInfo)
            pt.setCookieLogin();
        if (!pt.cookieInfo)
            return $.report.monitor(2123220);

        pt.cookieLogin = true;
        $("hl_avatar").style.backgroundImage = "url(https://q4.qlogo.cn/g?b=qq&nk=" + pt.cookieInfo.uin + "&s=100)";
        $("hl_usernick").innerHTML = pt.cookieInfo.nick || pt.cookieInfo.uin;
        $("hl_qqnum").innerHTML = "(" + pt.cookieInfo.uin + ")";
        pt.fill_usernick();
    },
    //切换登录方式
    _switch: function(state) {
        var switchqlist = function() {
                var switcher = $("swicth_login");
                $("q_login").style.display = "block";
                $("web_login").style.display = "none";
                if (switcher) {
                    switcher.innerHTML = $.str.encodeHtml('切换帐号'); //TODO 后面改多语言
                    switcher.classList.add('weakest')
                }

                pt.hideURLBar();
                pt.pageState = 2;
            },
            switchpwd = function() {
                var switcher = $("swicth_login");
                pt.showOneKey.ever && pt.showOneKey();
                $("q_login").style.display = "none";
                $("web_login").style.display = "block";
                if (switcher) {
                    switcher.innerHTML = $.str.encodeHtml("切换账号")
                    switcher.classList.remove('weakest');
                }
                pt.uInput.focus(); //聚焦，调出键盘
                pt.pageState = 1;
                window.xMsg && xMsg.call("connect", "userSwitch", {}, function() {});
            }
            //切换到快速登录
        if (typeof state === "undefined")
            if ($("q_login").style.display == "none") {
                switchqlist();
            }
            //切换到普通登录
            else {
                switchpwd();
            }
        else
            switch (+state) {
                case 2:
                    switchqlist();
                    break;
                case 1:
                    switchpwd();
                    break;
                default:
                    break;
            }
        pt.showAutoLogin();
        if (pt.isInIframe) { //手机弹出式
            window.setTimeout(function() {
                pt.ptui_notifySize("content");
            }, 0)
        }

    },
    checkNetwork: function() {
        
        if (!pt.browser.isOnline())
            pt.showErr(window.STR_LANG.offline);
        else
            return pt._timer = window.setTimeout(function() {
                $.report.monitor(2114669);
                pt.showErr(window.STR_LANG.offline);
                try {
                    pt.endLoading();
                } catch (e) {}
            }, 10000);
    },
    loadingDiv: null,
    isLoading: false,
    startLoading: function() {
        if (!pt.loadingDiv) {
            pt.loadingDiv = document.createElement("div");
            pt.loadingDiv.className = 'qui-loading-mask';
        }
        document.body.appendChild(pt.loadingDiv);
        pt.isloading = true;
    },
    endLoading: function() {
        document.body.removeChild(pt.loadingDiv);
        pt.isloading = false;
    },
    submitEvent: function(e) {
        pt.checkNetwork();
        pt.startLoading();
        // todo 办公开放添加上报
        if (pt.isOffice && pt.cookieLogin) {
            pt.cookielogin_submit(); // 已在其它业务登录，cookie中已有superkey
        } else if (pt.isOffice && pt.qqBrowserInfo) { // MTT快速登录
            pt.qlogin_submit();
        } else {
            pt.check(false);
        }
        pt.qrcode.used = false;
    },
    showOneKey: function(sure) {
        var btnOnekey = $("onekey");

        if (!pt.showOneKey.ever) {
            $.e.add(btnOnekey, pt.clickEvent, pt.doOneKey);
            $.e.add(btnOnekey, 'blur', pt.cancelAutoOneKey);
        }

        pt.showOneKey.ever = true;

        if (sure) {
            pt.btnGo.className += ' weak';
        } else {
            btnOnekey.className += ' weak';
        }
        btnOnekey && $.css.show(btnOnekey);
        btnOnekey.focus();
        $.report.monitor(414089);
        if (pt.isInIframe) { //手机弹出式
            window.setTimeout(function() {
                pt.ptui_notifySize("content");
            }, 0);
        }
    },
    cancelAutoOneKey: function() {
        window.clearInterval(pt.showOneKey.tid);
        var btnOnekey = pt.btnOnekey;
        btnOnekey && (btnOnekey.innerHTML = window.STR_LANG.onekey);
    },
    hideOneKey: function() {
        pt.cancelAutoOneKey();
        pt.showOneKey.ever = false
        if (!(pt.isWtlogin || window.ptui_style == 35))
            pt.btnGo.className = pt.btnGo.className.replace("weak", "");
        pt.btnOnekey && $.css.hide(pt.btnOnekey);
        if (pt.isInIframe) { //手机弹出式
            window.setTimeout(function() {
                pt.ptui_notifySize("content");
            }, 0);
        }
    },

    //绑定事件
    bindEvent: function() {
        var u_input = pt.uInput,
            p_input = pt.pInput;
        //普通登录事件
        $.e.add(pt.btnGo, pt.clickEvent, pt.submitEvent);
        pt.btnGo2 && $.e.add(pt.btnGo2, pt.clickEvent, function() {
            var list = $('q_logon_list')
            for (var i = 0; i < list.children.length; ++i) {
                if (list.children[i].onclick) {
                    pt.clickHeader({
                        preventDefault: function() {},
                        currentTarget: list.children[i]
                    }, true)
                    return
                }
            }
        })
        p_input && $.e.add(p_input, "keydown", function(e) {
            var keyCode = e.keyCode;
            if (keyCode == 13) {
                pt.submitEvent();
            }
        });
        //手机的前往按钮
        u_input && $.e.add(u_input, "keydown", function(e) {
            var keyCode = e.keyCode;
            if (keyCode == 13) {
                pt.checkNetwork();
                pt.startLoading();
                pt.check(false);
            }
        });

        var ua = navigator.userAgent.toLowerCase(),
            noOnekey = pt.isWX || pt.isMQQ || ua.match(/meizu_m9|IEMobile/i) ||
            window.ptui_appid == 46000101 // 微博
            ||
            $.bom.query("pt_no_onekey") == 1 //业务主动隐藏了一键登录
            ||
            pt.s_url.indexOf('//openmobile.qq.com/api/check') >= 0; // 互联定向分享隐藏一键登录，因为是没有安装手Q才打开ptlogin登录
        var btnOnekey = pt.btnOnekey;
        if (!noOnekey && btnOnekey) {
            if (pt.isHulian) { // 互联 xlogin 35 需要等授权页加载完成才判断
                if (ua.match(/iphone|ipad/i)) {
                    // fix ios webview bug: 输入框获得焦点时，滚动页面结束后再输入，将无法输入
                    document.addEventListener("touchmove", function() { pt.btnGo.focus() }, false);
                    document.addEventListener("touchstart", function(e) {
                        if (pt.uInput != e.target || pt.pInput != e.target) { pt.btnGo.focus(); }
                    }, false);
                }

                pt.open.waiting('authlist', function() {
                    MTT.canOneKey(function() {
                        if (pt.get_qlogin_list().length) return; // 如果已经出现头像，以头像快速登录优先
                        pt.showOneKey(true);
                    }, function() {
                        if (window.hlhdFlag) {
                            pt.showOneKey();
                        } else {
                            pt.hideOneKey();
                        }
                    });
                });
            } else {
                if (self === top && MTT.version) { // 浏览器既然可以判断，那就精确判断
                    MTT.canOneKey(function() {
                        if (pt.get_qlogin_list().length) return; // 如果已经出现头像，以头像快速登录优先
                        // pt.showOneKey('justshow');  alice修改
                        pt.showOneKey();
                    }, function() {
                        // pt.hideOneKey();
                        pt.showOneKey();
                    });
                } else { // 否则默认显示一键登录, PC 上不显示了
                    var ua = navigator.userAgent;
                    var desktop = ua.indexOf("Windows NT") > -1 || ua.indexOf("Macintosh") > -1;
                    desktop || pt.isWtlogin || pt.showOneKey();
                }
            }
        } else {
            pt.hideOneKey();
        }

        $('show_pwd') && $.e.add($('show_pwd'), 'change', function(e) {
            var pwd = pt.pInput;
            if (this.checked) {
                pwd.setAttribute('type', 'text');
            } else {
                pwd.setAttribute('type', 'password');
            }
        });

        $('forgetpwd') && $.e.add($('forgetpwd'), pt.clickEvent, function(e) {
            var uin = pt.uInput && pt.uInput.value;
            var url = "https://ssl.ptlogin2.qq.com/ptui_forgetpwd_mobile?ptlang=" + pt.lang_num;
            if (pt.lang_num != "1033")
                url += "&account=" + uin;
            window.open(url);
        });

        $.e.add(window, "orientationchange", function(e) {
            //页面回复原形
            pt.hideURLBar(e);
        });

        if (pt.isMail) {
            var rem = $("remember");
            if (!rem) return;

            $.e.add(rem, "change", function() {
                if (rem.checked)
                    pt.s_url = pt.addParamToUrl(pt.s_url, "ss", 1);
                else
                    pt.s_url = pt.s_url.replace(/&?ss=1/, "");
                pt.low_login_enable = rem.checked ? 1 : 0;
            });
        }

        if ($('download-link') && $('download-area')) {
            $.e.add($('download-area'), 'click', function(e) {
                if (e.target !== $('download-link'))
                    $('download-link').click();
                return false;
            });
            var rule_cn = [
                [/android/i, "market://details?id=com.tencent.mobileqq"],
                [/ipad|iphone/i, "itms-apps://itunes.apple.com/us/app/qq/id444934666?mt=8"]
            ];
            var rule_i18n = [
                [/android/i, "market://details?id=com.tencent.mobileqqi"],
                [/ipad|iphone/i, "itms-apps://itunes.apple.com/us/app/qq-international/id710380093?mt=8"]
            ];
            switch (parseInt(ptui_lang)) {
                case 1033:
                case 1028:
                    for (var i in rule_cn) {
                        if (rule_i18n[i][0].test(navigator.userAgent)) {
                            $('download-link').href = (rule_i18n[i][1]);
                            break;
                        }
                    }
                    if ($('download-link').href.length == 0) {
                        $('download-link').href = ("http://www.imqq.com/?lang=" + ptui_lang);
                    }
                    break;
                default:
                    for (var i in rule_cn) {
                        if (rule_cn[i][0].test(navigator.userAgent)) {
                            $('download-link').href = (rule_cn[i][1]);
                            break;
                        }
                    }
                    if ($('download-link').href.length == 0) {
                        $('download-link').href = ("https://im.qq.com");
                    }
                    break;
            }

            var ua = navigator.userAgent;
            if (/ipad/i.test(ua)) {
                $('download-link-pad').href = "itms-apps://itunes.apple.com/cn/app/qq-hd-2011/id453718989?mt=8";
            } else if (/android/i.test(ua) && !/mobile/i.test(ua)) {
                $('download-link-pad').href = "market://details?id=com.tencent.minihd.qq";
            } else {
                $('download-link-pad').href = $('download-link').href;
            }
        }

        if ($('qrlogin_switch')) {
            $.e.add($('qrlogin_switch'), 'click', function() {
                pt.switchpwd();
                return false;
            });
        }

        $('qr_invalid') && $.e.add($('qr_invalid'), 'click', function() {
            pt.qrcode.get(0);
            $.css.hide($('qr_invalid'));
        });

        //优化移动端聚焦体验
        document.body.addEventListener('focus', function(e) {
            if (e.target.scrollIntoViewIfNeeded)
                e.target.scrollIntoViewIfNeeded();
            else if (e.target.scrollIntoView)
                e.target.scrollIntoView();
        }, true);
        if ($('switcher_qlogin')) {
            $.e.add($('switcher_qlogin'), 'click', function() {
                pt.switchqr();
                return false;
            })
        }
        setTimeout(function() {
            if (window.ptui_tab) {
                //邮箱appid暂时不跳转到qr框
                if (window.ptui_appid != 756044602) {
                    //初始化二维码
                    pt.qrcode.get(0);
                } else {
                    pt.switchpwd();
                }
            }
        }, 0)
    },
    //输入框事件绑定
    bindInput: function() {
        if (pt.isOffice) return; // 办公互联没有输入框

        //帐号框初始化值
        var last_uin = window.ptui_defuin || pt.lockedAccount || pt.getLastUin();
        //现在有主页面的输入框和 手机号页面的输入框
        var uInput = pt.uInput,
            pInput = pt.pInput,
            uDel = $("del_touch") || $("del_u"),
            pDel = $("del_touch_p") || $("del_p"),
            //手机页面元素
            phoneInput = $('phone'),
            passwordInput = $('password'),
            phoneDel = $('del_phone'),
            passwordDel = $('del_password');
        var showDelWrapper = function(elem, isShow, outer, resize) {
            return function(e) {
                isShow ? elem && $.css.show(elem) : elem && $.css.hide(elem);
                if (resize) {
                    outer && (outer.style.paddingRight = (isShow ? "20px" : ""));
                }
            }
        };
        var showUDel = showDelWrapper(uDel, true, uDel.parentNode, ptui_style == 42),
            hideUDel = showDelWrapper(uDel, false, uDel.parentNode, ptui_style == 42),
            showPDel = showDelWrapper(pDel, true, pDel.parentNode, ptui_style == 42),
            hidePDel = showDelWrapper(pDel, false, pDel.parentNode, ptui_style == 42),
            showPhoneDel = showDelWrapper(phoneDel, true, phoneDel.parentNode, true),
            hidePhoneDel = showDelWrapper(phoneDel, false, phoneDel.parentNode, true),
            showPasswordDel = showDelWrapper(passwordDel, true, passwordDel.parentNode, true),
            hidePasswordDel = showDelWrapper(passwordDel, false, passwordDel.parentNode, true);

        if (last_uin) {
            if (last_uin == "0") uInput.value = "";
            else uInput.value = uInput.value || last_uin;
        }
        if (pt.lockedAccount) {
            uInput.readOnly = true;
            pInput.focus();
            //锁定帐号的时候不再显示删除uin的按钮
            hideUDel();
            showUDel = function() {};
        }

        var inputWrapper = function(showFunction, hideFunction, password) {
            return function(event) {
                if (pt.lockedAccount && !password) return;
                var element = event.target;
                if (event.target.value != "")
                    showFunction()
                else
                    hideFunction();
                if (password) {
                    var caretPos = 0;
                    if (element.selectionStart || element.selectionStart == '0') {
                        caretPos = Math.max(element.selectionStart, element.selectionEnd);
                    }
                    if (window.openSDK && window.openSDK.curPosFromJS) {
                        window.openSDK.curPosFromJS(caretPos);
                    }
                }
            }
        }
        var focusWrapper = function(showFunction, password) {
            return function(event) {
                if (event.target.value != "")
                    showFunction();
                if (password) {
                    if (window.openSDK && window.openSDK.isPasswordEdit) {
                        window.openSDK.isPasswordEdit(1);
                    }
                }
            }
        };
        var blurWrapper = function(hideFunction, password, checkUin) {
            return function(event) {
                if (event.target.value == "")
                    hideFunction();
                if (password) {
                    if (window.openSDK && window.openSDK.isPasswordEdit) {
                        window.openSDK.isPasswordEdit(0);
                    }
                } else {
                    if (/^\+/.test(event.target.value)) { // 海外手机+号修正
                        event.target.value = event.target.value.replace(/^\+/, '');
                        if (!/^00/.test(event.target.value))
                            event.target.value = '00' + event.target.value;
                    }
                    if (event.target.value == "") {
                        hideFunction();
                    } else if (checkUin) {
                        pt.checkQQUin(event.target.value); //TODO 手机号
                    }
                }
            }
        }
        $.e.add(pInput, "focus", focusWrapper(showPDel, true));
        $.e.add(pInput, "blur", blurWrapper(hidePDel, true));
        $.e.add(pInput, "input", function(e) {
            window.setTimeout(function() {
                inputWrapper(showPDel, hidePDel, true)(e)
            }, 0);
        });
        $.e.add(uInput, "focus", focusWrapper(showUDel));
        $.e.add(uInput, "blur", blurWrapper(hideUDel, false, true));
        $.e.add(uInput, "input", inputWrapper(showUDel, hideUDel));
        $.e.add(passwordInput, "focus", focusWrapper(showPasswordDel, true));
        $.e.add(passwordInput, "blur", blurWrapper(hidePasswordDel, true));
        $.e.add(passwordInput, "input", function(e) {
            window.setTimeout(function() {
                inputWrapper(showPasswordDel, hidePasswordDel, true)(e)
            }, 0);
        });
        $.e.add(phoneInput, "focus", focusWrapper(showPhoneDel));
        $.e.add(phoneInput, "blur", blurWrapper(hidePhoneDel, false, false));
        $.e.add(phoneInput, "input", inputWrapper(showPhoneDel, hidePhoneDel));

        var delWrapper = function(input, hideFunction, password) {
            return function(e) {
                e && e.preventDefault();
                input.value = "";
                if (password) {
                    if (window.openSDK && window.openSDK.clearAllEdit) {
                        window.openSDK.clearAllEdit();
                    }
                }
                input.focus();
                hideFunction();
            }
        }
        uDel && $.e.add(uDel, "click", delWrapper(uInput, hideUDel));
        pDel && $.e.add(pDel, "click", delWrapper(pInput, hidePDel, true));
        phoneDel && $.e.add(phoneDel, "click", delWrapper(phoneInput, hidePhoneDel));
        passwordDel && $.e.add(passwordDel, "click", delWrapper(passwordInput, hidePasswordDel));
    },
    //绑定验证码区域事件
    bindVcodeEvent: function() {
        $("input_tips") && $.e.add($("input_tips"), "click", function(e) {
            $("vcode_input").focus();
            $.css.hide("input_tips");
            e.stopPropagation();
        });
        $("vcode_input") && $.e.add($("vcode_input"), "focus", function(e) {
            $.css.hide("input_tips");
            e.stopPropagation();
        });
        $("vcode_input") && $.e.add($("vcode_input"), "blur", function(e) {
            if (this.value == "") {
                $.css.show("input_tips");
            }
        });
        $("vcode_img") && $.e.add($("vcode_img"), "click", function(e) {
            $("vcode_input").focus();
            $.css.hide("input_tips");
            pt.changeCodeImg();
            e.stopPropagation();
        });
        $("submit") && $.e.add($("submit"), "click", function(e) {
            pt.submitVcode();
        });

    },
    //隐藏地址栏
    hideURLBar: function() {
        window.setTimeout(function() {
            window.scrollTo(0, 1);
        }, 0);
    },
    // 根据当前页面状态摆放记住登录按钮的位置
    showAutoLogin: function() { // todo 设置pagestate 常量
        if (!pt.isMail) return;
        var autoLogin = $("auto_login");
        if (!autoLogin) return;
        var btnGo = pt.btnGo;
        if (pt.pageState == 1) {
            $("web_login").insertBefore(autoLogin, btnGo);
        } else {
            var qlogin = $("q_login");
            qlogin.insertBefore(autoLogin, qlogin.lastChild);
        }
        $.css.show(autoLogin);
    },
    doOneKey: function(e) {
        // 防止短时间内重复点击
        if (pt.doOneKey.ing) return;
        pt.doOneKey.ing = true;
        setTimeout(function() { pt.doOneKey.ing = false; }, 5000);

        var ua = navigator.userAgent.toLowerCase();
        var p = pt.loginUrl + 'jump?u1=' + encodeURIComponent(pt.s_url) + "&pt_report=1";
        if(window.pt_ptdrvs){
            p += "&ptdrvs=" + window.pt_ptdrvs;
        }
        
        if (window.ptui_pt_ttype == "1") {
            p += "&pt_ttype=1";
        }
        if (window.ptui_daid) {
            p += ("&daid=" + ptui_daid);
        }
        if (pt.low_login_enable) {
            p += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour;
        }
        p += "&style=" + window.ptui_style;

        var browser = $.detectBrowser()[0];
        if (browser) {
            p += "&pt_ua=" + $.Encryption.md5(ua);
            p += "&pt_browser=" + browser;
        }
        var appname = $.bom.query("pt_appname");
        if (appname) // 在手Q上展示应用名称
            p += "&pt_appname=" + appname;
        var pkg = $.bom.query("pt_package");
        if (/android/i.test(navigator.userAgent)) {
            if (pkg) // 在手Q上展示应用图标，复用申请快速登录所有图标
                p += "&pt_package=" + pkg;
        } else {
            var bundleID = $.bom.query("pt_bundleid") || pkg; // 有可能ios和android包名相同，所以可以省略pt_bundleid
            if (bundleID)
                p += "&pt_bundleid=" + bundleID;
        }
        $.report.monitor(414090);
        qqMusicReport('83886593', 33616325); //QQ音乐一键登录上报
        if (pt.isHulian) {
            pt.open.waiting('authdata', function() {
                if (window.ptui_pt_3rd_aid) { // for 互联
                    p += "&pt_3rd_aid=" + window.ptui_pt_3rd_aid;
                }
                if (pt.submit_o.openlogin_data) {
                    p += "&pt_openlogin_data=" + pt.submit_o.openlogin_data;
                }

                OneKey('wtloginmqq://ptlogin/qlogin?p=' + encodeURIComponent(p));
            });
        } else {
            OneKey('wtloginmqq://ptlogin/qlogin?p=' + encodeURIComponent(p));
        }
    },
    /**
     * [addToSet 数组模拟集合的添加]
     * @param {[type]} list [description]
     * @param {[type]} o    [description]
     */
    addToSet: function(list, o) {
        if (!o) {

        } else {
            var id = o["uin"];
            var needAdd = true;
            for (var i = 0, length = list.length; i < length; i++) {
                if (list[i]["uin"] == id) {
                    needAdd = false;
                }
            }
            if (needAdd) {
                list.push(o);
            }
        }
    },

    //获取快速登录帐号信息
    get_qlogin_list: function() {
        var qlogin_list = [];
        //互联cookie登录
        if (pt.isHulian) {
            if (pt.cookieInfo) {
                pt.addToSet(qlogin_list, pt.cookieInfo);
            }
        } else {
            if (pt.authInfo) {
                pt.addToSet(qlogin_list, pt.authInfo);
            }
        }

        if (pt.qqBrowserInfo) {
            pt.addToSet(qlogin_list, pt.qqBrowserInfo);
        }

        return qlogin_list;
    },
    /**
     * [qlogin_submit 快速登录提交]
     *
     */
    qlogin_submit: function(cgi) {
        $.report.monitor(259519); //手Q快速登录统计

        var s_url = encodeURIComponent(pt.s_url);

        var pt_url;
        if (cgi == pt.qrcode.CGI) {
            pt_url = pt.loginUrl + cgi + "?u1=" + s_url;
            pt_url += "&from_ui=1&type=1&ptlang=" + pt.lang_num;
            pt_url += "&ptqrtoken=" + $.str.hash33($.cookie.get("qrsig"));
        } else if (cgi == "mqq") {
            pt_url = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2.qq.com/jump?clientuin=$UIN&clientkey=$KEY&keyindex=$KEYINDEX&u1=" + encodeURIComponent(pt.s_url);
        } else {
            var uin = pt.qqBrowserInfo.uin;
            var clientkey = pt.qqBrowserInfo.loginkey;
            pt_url = pt.loginUrl + "jump?keyindex=" + pt.keyindex + "&clientuin=" + uin + "&clientkey=" + clientkey + "&u1=" + s_url;
        }

        if (window.ptui_daid)
            pt_url += "&daid=" + window.ptui_daid;
        if (window.ptui_appid)
            pt_url += "&aid=" + window.ptui_appid;
        if (window.ptui_pt_qzone_sig == "1") {
            pt_url += "&pt_qzone_sig=1";
        }
        if (window.ptui_pt_ttype == "1") {
            pt_url += "&pt_ttype=1";
        }
        if (window.ptui_pt_light == "1") {
            pt_url += "&pt_light=1";
        }
        if (pt.low_login_enable) {
            pt_url += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour;
        }
        if (window.ptui_pt_3rd_aid) { // for 互联
            pt_url += "&pt_3rd_aid=" + window.ptui_pt_3rd_aid;
        }
        if (pt.submit_o.openlogin_data) {
            pt_url += "&pt_openlogin_data=" + pt.submit_o.openlogin_data;
        }

        if (window.ptui_kf_csimc != "0" && window.ptui_kf_csimc) {
            pt_url += "&csimc=" + ptui_kf_csimc;
            pt_url += "&csnum=" + ptui_kf_csnum;
            pt_url += "&authid=" + ptui_kf_authid;
        }
        pt_url += "&device=" + pt.deviceType;
        if (cgi != "mqq") pt_url += "&ptopt=1";
        pt_url += "&pt_uistyle=" + window.ptui_style;
        if (cgi) return pt_url;
        $.http.loadScript(pt_url);
    },
    /**
     * [cookielogin_submit 快速登录提交]
     * @return {[type]} [description]
     */
    cookielogin_submit: function() {
        var superkey = pt.cookieInfo.superkey;
        if (superkey) {
            var superkey_token = superkey && $.str.hash33(superkey);
            pt.submit_o.auth_token = superkey_token;
            pt.submit('open');
        } else {
            if (pt.mqqCanQLogin()) {
                pt.redirect(pt.target, pt.qlogin_submit("mqq"));
            }
        }
    },
    /**
     * [cancel_cookielogin 取消cookie快速登录]
     */
    cancel_cookielogin: function(clear) {
        try {
            $.css.show($("form_outter_wrap"));
            $.css.hide($("q_logon_list"));
        } catch (e) {}

        pt.cookieLogin = false;
        delete pt.submit_o['skey_token'];
        pt.cookieInfo = null;
        //清除帐号输入框
        if (clear)
            pt.uInput.value = "";
    },
    authlogin_submit: function() {
        var authUrl = pt.authLoginUrl;
        authUrl += "&regmaster=" + window.ptui_regmaster + "&aid=" + window.ptui_appid + "&s_url=" + encodeURIComponent(pt.s_url);
        if (pt.low_login_enable) {
            authUrl += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour;
        }
        //pt_ttype 是否下发vkey，现在已不使用
        if (window.ptui_pt_ttype == "1") {
            authUrl += "&pt_ttype=1";
        }
        //pt_light 是否下发superkey和skey
        if (window.ptui_pt_light == "1") {
            authUrl += "&pt_light=1";
        }
        authUrl += "&device=" + pt.deviceType;
        //top.location.href = authUrl
        pt.redirect(pt.target, authUrl);
    },
    /**
     * jsonp的方式提交登录表单
     * @prama vcode  是否需要验证码
     */
    submit: function(vcode) {
        var u_input = pt.uInput,
            p_input = pt.is_oversea ? $('password') : pt.pInput;
        //get 参数
        var uin = ""; //uin
        var pwd = ""; //原始密码
        //这个来自check的cgi的返回，由于chrome的samesite策略，导致cookie中的ptdrvs可能种不上，这里在jsonp返回中获取并设置到全局变量上
        if(window.pt_ptdrvs){
            pt.submit_o['ptdrvs'] = window.pt_ptdrvs || ''; //参数也传ptdrvs，兜底
        }

        //如果是快速登录，帐号和密码
        if (pt.is_qlogin) {
            uin = pt.login_uin; //uin
        } else {
            uin = pt.needAt ? pt.needAt : u_input && u_input.value; //uin
            pt.login_uin = uin;
            //QQ音乐帐号密码登录上报
            qqMusicReport("33616396", 33616396);
        }
        //////构造submit对象
        if (vcode) {
            //免验证码的时候不带这个参数
            pt.submit_o["pt_vcode_v1"] = 0;
            pt.submit_o["pt_verifysession_v1"] = pt.verifysession;
        }
        pt.submit_o.verifycode = pt.vcode.toUpperCase(); //验证码 必须
        pt.submit_o.u = uin;

        var isMd5 = false;
        if (window.openSDK && openSDK.md5Pwd && openSDK.result == 0) {
            pwd = openSDK.md5Pwd;
            isMd5 = true;
        } else {
            pwd = p_input && p_input.value; //原始密码
            isMd5 = false;
        }

        if (vcode != 'open')
            pt.submit_o.p = $.Encryption.getEncryption(pwd, pt.salt, pt.submit_o.verifycode, isMd5); //要提交给后台的密码形式
        else
            delete pt.submit_o.p;
        pt.submit_o.pt_randsalt = pt.isRandSalt || 0;
        pt.submit_o.ptlang = pt.lang_num; //版本语种 必须
        pt.submit_o.low_login_enable = (pt.low_login_enable == 1) ? 1 : 0; //是否自动登录
        if (pt.submit_o.low_login_enable) {
            pt.submit_o.low_login_hour = window.ptui_low_login_hour; //弱登录默认一个月
        }

        pt.submit_o.u1 = encodeURIComponent(pt.s_url); //成功url 必须
        pt.submit_o.from_ui = 1;
        pt.submit_o.fp = "loginerroralert";
        pt.submit_o.device = pt.deviceType; //设备类型
        pt.submit_o.aid = pt.appid; //接入业务的appid 必须
        if (window.ptui_daid) {
            pt.submit_o.daid = window.ptui_daid; //接入业务的appid 必须
        }
        if (window.ptui_pt_qzone_sig == "1") {
            pt.submit_o.pt_qzone_sig = 1;
        }
        if (window.ptui_pt_ttype == "1") {
            pt.submit_o.pt_ttype = "1";
        }
        if (window.ptui_pt_light == "1") {
            pt.submit_o.pt_light = "1";
        }
        if (window.ptui_pt_3rd_aid) {
            pt.submit_o.pt_3rd_aid = window.ptui_pt_3rd_aid;
        }
        pt.submit_o.ptredirect = pt.target;
        pt.submit_o.h = 1;
        pt.submit_o.g = 1; //加盐了
        pt.submit_o.pt_uistyle = window.ptui_style;

        if (window.ptui_kf_csimc != "0" && window.ptui_kf_csimc) {
            pt.submit_o.csimc = ptui_kf_csimc;
            pt.submit_o.csnum = ptui_kf_csnum;
            pt.submit_o.authid = ptui_kf_authid;
        }

        pt.submit_o.regmaster = window.ptui_regmaster;

        var param = pt.object2param(pt.submit_o);

        //如果验证码为空（需要验证码），跳到验证码页面
        if (!vcode) {
            pt.showVcode();
            pt.isSubmiting = false; //提交结束
        } else {
            console.log('login--',vcode)
            pt.checkNetwork();
            pt.startLoading();
            var cgi = pt.isHulian ? 'pt_open_login' : 'login';
            var url = pt.loginUrl + cgi + "?" + param;
            //这里延迟100ms发出请求，因为有人说这样能解决他们的bug，只能试试了
            setTimeout(function(){
                if(cgi === 'login'){
                    // 如果是login，先存起来备用
                    pt.smsLoginUrl = url
                }
                $.http.loadScript(url); //回调 ptuiCB方法
            },100)
            
        }
        return false;
    },
    smsSubmit: function(){
        // pt.submit('sms')
        var url = pt.smsLoginUrl
        pt.isloading = true
        if(url){
            if($.cookie.get("pt_sms")){
                url += '&pt_sms_code='+ $.cookie.get("pt_sms")
            }
            $.http.loadScript(url);
        }
    },
    /**
     * 用户点击确定，jsonp回调方法
     *
     * @param ret  登录状态主信息 0 成功
     * @param extret 登录状态附加信息
     * @param url 登录成功的跳转地址
     * @param redirect 跳转方式 0:self 1:top 2:parent  手机端没用
     * @param Mmsg  登录信息
     * @param nick  登录成功的号码的昵称
     */
    cb: function(ret, extret, url, redirect, Mmsg, nick) {
        pt.isSubmiting = false; //提交结束

        if (pt.qrcode.used && [0, 65, 66, 67].indexOf(+ret) == -1) { // 上报二维码异常
            $.report.monitor('2586869');
        }

        switch (+ret) {
            case 0:
                clearInterval(pt.qrcode.clock);
                //如果自动登录，则保存到本地存储,
                var loginUin = pt.uInput && pt.uInput.value; //输入的帐号
                pt.saveLastUin(loginUin || "");
                //密保模版
                if (url.indexOf("/cgi-bin/mibao_vry") > -1) {
                    url += "&style=" + pt.style;
                }
                if (pt.isOffice && window.mqq && mqq.invoke) // 通知手Q
                    mqq.invoke("QQOfficeOpen", "checkApp", { appId: window.ptui_pt_3rd_aid });
                if (pt.qrcode.used) {
                    pt.qrcode.done = true;
                    $.report.monitor('2136878');
                }
                pt.redirect(redirect, url);
                return;
            case 4: //验证码错误
                pt.changeCodeImg();
                break;
            case 65: // 二维码已失效
                clearInterval(pt.qrcode.clock);
                $.report.monitor('2586868');
                if (window.ptui_tab) {
                    $.css.show($('qr_invalid'));
                    if ($.bom.query("autorefresh") == "1") {
                        $('qr_invalid').click();
                        return;
                    }
                } else
                    pt.showErr("一键登录超时，请重试。", 1000 * 1000);
                return;
            case 66:
            case 67:
                return;
            case 10010:
                // sms 验证码错误
                pt.smsIframe.postMessage({msg:'smsError'})
                break
            case 10009:
             
                $.cookie.set('pt_sms_phone',Mmsg,window.location.host, '/', 1000*60)
                var ptdrvs = $.cookie.get('ptdrvs')
                pt.smsPtdrvs = ptdrvs

                var appid = $.url.getParam('appid')
                var uin = $.cookie.get('pt_loginuin') || pt.uInput.value
                
                var Iframe = $.iframe()
                Iframe.init({
                    name:'verify',
                    id:'verify',
                    
                    url: "https://ui.ptlogin2.qq.com/web/verify/iframe?uin=" + uin + "&appid=" + appid,
                    iframeStyle:'width: 100vw;height: 100vh;margin: 0px auto;position: absolute;top: 0;border: none;z-index:10',
                    smsSubmitEvent: pt.smsSubmit
                })
                pt.smsIframe = Iframe
                break
            default:
                clearInterval(pt.qrcode.clock);
                //其他错误返回我们的页面
                pt.go_back();
        }
        //锁定帐号的时候不展示手机号入口
        if (ret == 3 && !pt.is_oversea && [9, 35, 42].indexOf(parseInt(window.ptui_style)) !== -1 && !pt.lockedAccount){
            pt.alert.show(Mmsg + '<br>' + STR_LANG.password_error_tips); //密码错误需要弹窗
        }else if(ret == 10010 || ret == 10009){
            ;
        } else{
            pt.showErr(Mmsg);
        }
            
    },
    /**
     * jsonp回调方法，判断是否需要验证码
     *
     * @param ret 0：不需要验证码   1：需要验证码
     * @param code 需要验证码时，为加密串，拉取验证码需要带上
     *             不需要用户填验证码时，需要自动带上的验证
     */
    cb_checkVC: function(ret, code, salt, verifysession, isRandSalt) { //code 原来获取验证码的时候需要带上，参数名为vc_type
        //ret 0:正常不需要验证码；1：安全中心需要验证码；2：uin不存在；3：check内部错误
        switch (ret + '') {
            case '0':
                pt.vcode = code || "abcd";
                pt.verifysession = verifysession;
                break;
            case '1':
                pt.vcode = '';
                pt.cap_cd = code;
                break;
            case '2':
            case '3':
                break;
            default:
                break;
        }
        if (ret == 2) {
            pt.showErr(pt.lang.err_uin);
            return;
        }
        if (ret == 3) {
            pt.showErr(pt.checkErr[ptui_lang]);
            return;
        }

        pt.salt = salt;
        pt.isRandSalt = isRandSalt;

        //提交的时候根据验证码判断是否需要提交到后台
        pt.submit(pt.vcode)
    },
    /**
     * 到后台查询是否需要加载验证码,并在回调函数中确定是否提交
     * @param 是否快速登录
     */
    check: function(is_qlogin) {
        //避免多次提交
        if (pt.isSubmiting) {
            return;
        }
        pt.is_qlogin = is_qlogin;
        //先前台验证 普通登录
        if (!pt.is_qlogin) {
            if (!pt.checkValidate()) {
                clearTimeout(pt._timer);
                pt.endLoading();
                return;
            }
        }
        var uin = "";
        //如果是快速登录，帐号和密码
        if (is_qlogin) {
            uin = pt.login_uin; //uin
        } else {
            uin = pt.needAt ? pt.needAt : pt.uInput.value; //uin

        }
        var url = pt.checkUrl + "pt_tea=2&uin=" + uin + "&appid=" + pt.appid + "&ptlang=" + pt.lang_num + "&regmaster=" + window.ptui_regmaster + "&pt_uistyle=" + pt.style + "&r=" + Math.random();
        if (window.TDC && TDC.getInfo && TDC.getInfo().tokenid)
            url += "&pt_jstoken=" + TDC.getInfo().tokenid;
        $.http.loadScript(url); // 回调cb_checkVC
        return;
    },

    //检查uin和密码合法性
    checkValidate: function() {
        var f_u = pt.is_oversea ? $('phone') : pt.uInput; //帐号输入框
        var f_p = pt.is_oversea ? $('password') : pt.pInput; //密码输入框
        var u = f_u.value;
        if (pt.is_oversea) {
            u = '00' + $('country-code').innerHTML.replace(/[^0-9]/, '') + u;
            u = u.replace('0086', ''); //国内手机号不需要加国家码
        }
        if (f_u.value == "") {
            pt.showErr(pt.lang.no_uin, function() {
                f_u.focus();
            }); //"你还没有输入帐号！"

            return false;
        }
        if (!pt.checkQQUin(u)) {
            pt.showErr(pt.lang.err_uin, function() {
                f_u.focus();
            }); //"请输入正确的帐号！"

            return false;
        }
        f_u.value = $.str.trim(f_u.value);

        if (f_p.value == "") {
            pt.showErr(pt.lang.no_password, function() {
                f_p.focus();
            }); //"你还没有输入密码！"

            return false;
        }
        return true;
    },
    /**
     * 检查QQ用户帐号是否合法(号码和email和中文)
     */
    checkQQUin: function(qquin) {
        if (qquin.length == 0)
            return false;

        qquin = $.str.trim(qquin);
        pt.needAt = "";

        var tmp = $.check;

        if ($.check.is_weibo_appid(pt.appid)) {
            if (tmp.isQQ(qquin) || tmp.isMail(qquin)) {
                return true;
            } else if (tmp.isNick(qquin) || tmp.isName(qquin)) { //短昵称和中文帐号前加@
                pt.needAt = "@" + encodeURIComponent(qquin);
                return true;
            } else if (tmp.isPhone(qquin)) { //手机号码前加@
                pt.needAt = "@" + qquin.replace(/^(86|886)/, "");
                return true;
            } else if (tmp.isSeaPhone(qquin)) {
                pt.needAt = "@00" + qquin.replace(/^(00)/, "");
                if (/^(@0088609)/.test(pt.needAt)) {
                    pt.needAt = pt.needAt.replace(/^(@0088609)/, "@008869"); //碰到0088609开头的前端统一修正为008869 by harlantu
                }
                return true;
            }
            pt.needAt = "";

        } else { //其他
            if (tmp.isQQ(qquin) || qquin.match(/@/)) { //这里只要包含@就认为是邮箱 避免重复添加@qq.com
                return true;
            }
            if (tmp.isPhone(qquin)) {
                pt.needAt = "@" + qquin.replace(/^(86|886)/, "");
                return true;
            }
            if (tmp.isForeignPhone(qquin)) {
                pt.needAt = "@" + qquin;
            }
            //正常情况下不是qq号/邮箱/手机的都认为是邮箱名
            pt.uInput.value = qquin + "@qq.com";
            return true;
        }
        //国外手机
        if (tmp.isForeignPhone(qquin)) {
            pt.needAt = "@" + qquin;
            return true;
        }

        if (tmp.isPaipaiDuokefu(qquin)) {
            return true;
        }

        return false;
    },
    //检查验证码的合法性
    checkVcode: function() {
        var vcode = $("vcode_input");

        if (vcode.value == "") {
            pt.showErr(pt.lang.no_code); //"你还没有输入验证码！"
            vcode.focus();
            return false;
        }

        if (vcode.value.length < 4) {
            pt.showErr(pt.lang.less_code); //"请输入完整的验证码！"
            vcode.focus();
            vcode.select();
            return false;
        }
        if (!(/^[a-zA-Z0-9]+$/.test(vcode.value))) {
            pt.showErr(pt.lang.err_code); //"请输入正确的验证码！"
            vcode.focus();
            vcode.select();
            return false;
        }
        return true;
    },
    //点击头像
    clickHeader: function(event, force) {
        event.preventDefault();
        if ((pt.isWtlogin || window.ptui_style == 35) && !force) return
        var pNode = event.currentTarget;
        var uin = pNode.getAttribute("id");
        var type = pNode.getAttribute("type");
        pt.login_uin = uin;
        pt.login_pwd = pNode.getAttribute("pwd");
        switch (type + "") {
            case "1": //普通登录
                pt.check(true);
                break;
            case "2": //qq浏览器快速登录
                pt.qlogin_submit();
                break;
            case "3": //授权登录
                pt.authlogin_submit();
                break;
            case "4": //互联登录头像
                pt.cookielogin_submit();
                break;
            default:
                pt.check(true);
        }

    },
    //获取头像的回调函数,jsonp调用
    //{"uin":"uin","url":"url"}
    setHeader: function(json) {
        //列表生成了，只需要修改头像地址即可
        for (var o in json) {
            if (json[o].url != "" && o != "") {
                if ($("img_" + o)) {
                    $("img_" + o).src = json[o];
                }
            }
        }
        pt.hideURLBar();
    },
    //拉取头像
    initFace: function() {
        var qlogin_list_data = pt.qlogin_list_data;
        var length = qlogin_list_data.length;
        var protocol = pt.isHttps ? "https://ssl." : "http://";
        for (var i = 0; i < length; i++) {
            $.http.loadScript(protocol + "ptlogin2." + pt.domain + "/getface?appid=" + pt.appid + "&imgtype=3&encrytype=0&devtype=1&keytpye=0&uin=" + qlogin_list_data[i].uin + "&r=" + Math.random());
        }
    },
    //拉取头像错误处理
    face_error: function(img) {
        if (img.src != pt.default_face_url) {
            img.src = pt.default_face_url;
        }
        return false;
    },
    //获取长字符串的缩略字符，中间加...
    getShortWord: function(element, str, width) {
        str = str ? str : "";
        var appendStr = "...";
        element.innerHTML = str;
        if (element.clientWidth <= width) {

        } else {
            var len = str.length;
            var harfLen = Math.ceil(len / 2);
            for (var i = 0; i < harfLen; i++) {
                var left = str.substring(0, harfLen - i)
                var right = str.substring(harfLen + i, len);
                element.innerHTML = left + appendStr + right;
                if (element.clientWidth <= width) {
                    element.title = str;
                    break;
                }
                var right = str.substring(harfLen + i + 1, len);
                element.innerHTML = left + appendStr + right;
                if (element.clientWidth <= width) {
                    element.title = str;
                    break;
                }

            }
        }
        element.style.width = width + "px";
    },
    /**
     * 刷新验证码图片
     */
    changeCodeImg: function() {
        if (pt.new_vcode) {} else {
            var img = $("vcode_img");
            var domain = pt.domain;
            var verifycodeUrl = (pt.isHttps ? "https://ssl." : "http://") + "captcha." + domain + "/getimage";
            //qq.com的https走安全中心的
            if (pt.isHttps && domain != "qq.com" && domain != "tenpay.com") {
                verifycodeUrl = "https://ssl.ptlogin2." + domain + "/ptgetimage";
            }
            verifycodeUrl += ("?aid=" + pt.appid + "&uin=" + pt.login_uin + "&v=" + Math.random());
            img.src = verifycodeUrl;
        }

    },
    newVCFirst: true,
    //显示验证码页面
    showVcode: function() {
        //针对简体中文和支持postMessgae的切换到新版验证码
        if (pt.new_vcode) {
            $("content").style.display = "none";
            $("new_vcode").style.display = "block";
            if (pt.newVCFirst) {
                pt.newVCFirst = false;
                capInit($('new_vcode'), {
                    callback: pt.VCCallback,
                    showHeader: true,
                    uin: pt.login_uin,
                    capcd: pt.cap_cd
                });
            } else {
                capRefresh({
                    uin: pt.login_uin,
                    capcd: pt.cap_cd
                });
            }
            pt.ptui_notifySize();
        } else {
            $("login").style.display = "none";
            $("vcode").style.display = "block";
            //绑定验证码区域事件
            pt.bindVcodeEvent();

            //拉取验证码
            pt.changeCodeImg();
        }

        pt.hideURLBar();
        $("btn_app_down") && $.css.hide("btn_app_down");

    },

    go_back: function() {
        $("content") && ($("content").style.display = "block");
        $("login") && ($("login").style.display = "block");
        $("vcode") && ($("vcode").style.display = "none");
        $("new_vcode") && ($("new_vcode").style.display = "none");
    },
    //提交验证码
    submitVcode: function() { // todo remove it
        //避免多次提交
        if (pt.isSubmiting) {
            return;
        }
        if (!pt.checkVcode()) {
            return false;
        }
        pt.submit_o.verifycode = $("vcode_input").value.toUpperCase(); //验证码 必须
        var pwd = ""; //原始密码
        var isMd5 = false;
        if (window.openSDK && openSDK.md5Pwd && openSDK.result == 0) {
            pwd = openSDK.md5Pwd;
            isMd5 = true;
        } else {
            pwd = pt.pInput.value; //原始密码
            isMd5 = false;
        }

        pt.submit_o.p = $.Encryption.getEncryption(pwd, pt.salt, pt.submit_o.verifycode, isMd5); //要提交给后台的密码形式
        pt.submit_o.pt_randsalt = pt.isRandSalt || 0;
        if (window.TDC && TDC.getInfo && TDC.getInfo().tokenid)
            pt.submit_o.pt_jstoken = TDC.getInfo().tokenid;
        var param = pt.object2param(pt.submit_o);
        var cgi = pt.isHulian ? 'pt_open_login' : 'login';
        var url = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/" + cgi + "?" + param;
        $.http.loadScript(url); //回调 ptuiCB方法
    },
    /**
     * [submitNewVcode 提交新的验证码]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    submitNewVcode: function(data) {
        //$.cookie.set("verifysession", data.sig, pt.domain); //把cookie当成验证码图片的cookie set
        

        pt.submit_o.verifycode = data.randstr.toUpperCase(); //验证码 必须
        pt.submit_o.pt_vcode_v1 = 1;
        pt.submit_o.pt_verifysession_v1 = data.ticket;

        var pwd = ""; //原始密码
        var isMd5 = false;
        if (window.openSDK && openSDK.md5Pwd && openSDK.result == 0) {
            pwd = openSDK.md5Pwd;
            isMd5 = true;
        } else {
            pwd = pt.pInput.value; //原始密码
            isMd5 = false;
        }

        pt.submit_o.p = $.Encryption.getEncryption(pwd, pt.salt, pt.submit_o.verifycode, isMd5); //要提交给后台的密码形式
        pt.submit_o.pt_randsalt = pt.isRandSalt || 0;
        if (window.ptui_kf_csimc != "0" && window.ptui_kf_csimc) {
            pt.submit_o.csimc = ptui_kf_csimc;
            pt.submit_o.csnum = ptui_kf_csnum;
            pt.submit_o.authid = ptui_kf_authid;
        }
        var param = pt.object2param(pt.submit_o);
        var cgi = pt.isHulian ? 'pt_open_login' : 'login';
        var url = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.domain + "/" + cgi + "?" + param;
        if(cgi === 'login'){
            pt.smsLoginUrl = url
        }
        

        pt.checkNetwork();
        pt.startLoading();
        $.http.loadScript(url); //回调 ptuiCB方法
    },
    /* 互联授权页面回调实现 */
    open: {
        timer: -1,
        authListDone: false,
        waiting: function(what, forFn) {
            if (!forFn) return;

            switch (what) {
                case 'authlist':
                    if (pt.open.authListDone)
                        forFn();
                    else
                        pt.open.waiting.authlistFn = forFn;
                    break;
                case 'authdata':
                    if (pt.submit_o.openlogin_data) {
                        forFn();
                    } else {
                        pt.open.getAuthData();
                        pt.open.waiting.authdataFn = forFn;
                    }
                    break;
            }
        },
        authListReady: function(opt) {
            pt.open.authListDone = true;

            if (pt.open.waiting.authlistFn) {
                pt.open.waiting.authlistFn();
                pt.open.waiting.authlistFn = null;
            }

            opt = opt || {};
            var superkey = window.ptui_daid && parseInt($.cookie.get("supertoken"));
            if (superkey) opt.superkey = 1;

            // 触发柔性逻辑
            if (opt.pt_flex) window.pt_flex = 1;
            if (opt.skey) opt.skey = +opt.skey;
            window.pt_skey_valid = opt.skey;
            if ((opt.skey == 1 || opt.superkey) || pt.qqBrowserInfo) {
                pt.openCookieInfo = opt;
                pt.refreshQloginUI();
                pt.initFace();
            }

            //拉取完成之后立即拉取opendata
            if (window.pt_flex)
                pt.open.getData({ value: location.search.substr(1) + "&pt_flex=1" });
            else
                xMsg.call("connect", "getData", {}, pt.open.getData);

            if (window.ptui_tab)
                xMsg.call("connect", "hideList", {});
        },
        setFrameHeight: function(opt) {},
        getData: function(data) {
            clearTimeout(pt.open.timer);
            pt.submit_o.openlogin_data = encodeURIComponent(data.value);

            /* 就目前来说，只在一键登录处 just waiting authdata， 所以处理完及时返回，避免多余操作 */
            if (pt.open.waiting.authdataFn) {
                pt.open.waiting.authdataFn();
                pt.open.waiting.authdataFn = null;
                return;
            }
        },
        getAuthData: function() {
            if (!pt.open.authListDone){
                // fix个bug: 
                // 看了一下逻辑，在2s内,授权列表还没加载出来，就立刻点击“一键登录”，会触发这个提示。但实际上等列表加载完，会自动执行回调，跳登录的。
                // 就是过了2s后，授权列表没加载出来，也会自动触发柔性策略，自动执行回调，依然能成功登陆，所以没必要出现“授权列表加载失败”提示了
                // 那就把这句话注释掉好了

                // return pt.showErr("授权列表加载失败"); 
                return;
            }
            pt.open.timer = setTimeout(function() {
                pt.showErr("授权信息获取失败");
            }, 3000);
        },
        fillAppInfo: function(res) { // cgi get_app_basicinfo jsonp callback
            if (res && res.retcode == 0 && res.result && res.result.pc) {
                var icon = res.result.pc.Logo100;
                if (icon && icon.indexOf("http://") > -1)
                    icon = icon.replace("http://", "https://");
                $("app_logo").style.backgroundImage = "url(" + icon + ")";
                $("app_alias").innerHTML = res.result.pc.AppAlias;
            }
        },
        loadAppInfo: function() {
            $.http.loadScript("//openmobile.qq.com/api/get_app_info_by_id?callback=get_app_basicinfo&appid=" + window.ptui_pt_3rd_aid);
            var path = window.ptui_pt_3rd_aid.toString();
            while (path.length > 8) path = path.substr(path.length - 8);
            while (path.length < 8) path = '0' + path;
            path = path.replace(/(\w{2})/g, '$1/');
            var adimgurl = '//i.gtimg.cn/open/app_icon/' + path + window.ptui_pt_3rd_aid + '_android_ad_0.jpg'
            console.log(adimgurl)
            var img = new Image;
            img.onload = function() {
                console.log(img);
                var appinfo = document.getElementsByClassName('appinfo')[0]
                if (!appinfo) return;
                img.style.width = '100%';
                img.style.borderTopLeftRadius = '0.5rem';
                img.style.borderTopRightRadius = '0.5rem';
                appinfo.style.padding = 0;
                appinfo.style.fontSize = 0; // 避免有字体导致多出一行
                appinfo.appendChild(img);
                var app_logo = $('app_logo'),
                    app_alias = $('app_alias'),
                    app_comment = $('app_comment');
                if (app_logo) app_logo.style.display = 'none';
                if (app_alias) app_alias.style.display = 'none';
                if (app_comment) app_comment.style.display = 'none';
            }
            img.src = adimgurl;
        }
    },
    /**
     * [crossMessage 跨域通信]
     * @param  {[type]} messasge [description]
     * @return {[type]}          [description]
     */
    crossMessage: function(message) {
        //支持html5的消息传递
        if (typeof window.postMessage != "undefined") {
            var messasgeStr = $.str.json2str(message);
            window.parent.postMessage(messasgeStr, "*");
        }
    },

    ////////////////////////////以下为一些调用业务测的接口
    //通知父窗口关闭
    ptui_notifyClose: function(e) {
        e && e.preventDefault();
        var messasge = {};
        messasge.action = "close";
        pt.crossMessage(messasge);
    },
    ptui_notifySize: function(div) {
        var message = {};
        message.action = "resize";

        if (div) {
            var obj = $(div);
            message.width = obj.offsetWidth || 1;
            message.height = obj.offsetHeight || 1;
        } else { // todo 出现拼图验证码，希望能回传全屏大小
            message.width = 320;
            message.height = 441;
        }
        pt.crossMessage(message);
    },

    //记录登录框访问次数，避免手Qkey过期时和业务之间死循环
    accessCount: function() {
        if (!$.localStorage.isSupport()) return 0;
        return parseInt($.localStorage.get('accessCount'));
    },
    access: function() {
        if (!$.localStorage.isSupport()) return;
        try {
            var count, lasttime, now;
            now = new Date();
            lasttime = new Date();
            lasttime.setTime($.localStorage.get('lastAccessDate'));
            if (Math.abs(now - lasttime) < 30 * 1000) {
                count = parseInt($.localStorage.get('accessCount')) + 1;
            } else {
                count = 1;
            }
            $.localStorage.set('accessCount', count);
            $.localStorage.set('lastAccessDate', now.getTime());
        } catch (e) {
            $.localStorage.set('accessCount', 1);
            $.localStorage.set('lastAccessDate', new Date().getTime());
        }
    },
    //style42用
    switchpwd: function() {
        $.css.show($('pwdlogin'));
        pt.uInput && pt.uInput.focus();
        $.css.hide($('qrlogin'));
        $.css.show($('switch'));
        $.css.show($('zc_feedback'));
        pt.qrcode && clearInterval(pt.qrcode.clock);
    },
    switchqr: function() {
        $.css.hide($('pwdlogin'));
        $.css.show($('qrlogin'));
        $.css.hide($('switch'));
        $.css.hide($('zc_feedback'));
        pt.qrcode.get(0);
    },
    //刷新qlogin页面，仅当处于快速登录页面 或切换到快速登录
    refreshQloginUI: function() {
        if (pt.isOffice)
            pt.build_office_qlogin();
        else if (!pt.isWtlogin && !pt.is3gNews)
            pt.build_qlogin_list();
    },
    mqqCanQLogin: function() {
        var ua = navigator.userAgent,
            mqq = ua.match(/QQ\/(\d\.\d\.\d)/i);
        if (mqq && mqq[1] >= "5.9") {
            return true;
        }
        return false;
    }
};



/**
 * alert 提示能力
 */
pt.alert = (function(){
    let alertBackground=null; 
    let alertDiv = null
    return {

        show: function(message) {
            if (!alertBackground) {
                alertBackground = document.createElement("div");
                alertBackground.className = 'qui-dialog-mask';
            }
            if (!alertDiv) {
                alertDiv = document.createElement('div');
                alertDiv.className = 'qui-dialog-box';
            }
            alertDiv.innerHTML = '<div class="qui-dialog-content">' + message + '</div><div class="qui-dialog-bottom" onclick="pt.alert.hide()">' + window.STR_LANG.close + '</div>';
            document.body.appendChild(alertBackground);
            document.body.appendChild(alertDiv);
        },
        hide: function() {
            document.body.removeChild(alertBackground);
            document.body.removeChild(alertDiv);
        }
    }
})()


pt.qrcode = {
    CGI: 'ptqrlogin',
    used: false,
    done: false,
    clock: 0,
    get: function(type) {
        var loginName = "ptqrshow";
        var proto = pt.isHttps ? "https://ssl." : "http://";
        var url = proto + "ptlogin2." + pt.domain + "/" + loginName + "?s=8&e=0&";
        url += "appid=" + pt.appid + "&type=" + type + "&t=" + Math.random();
        if (pt.daid) {
            url += "&daid=" + pt.daid;
        }
        if (window.ptui_pt_3rd_aid) { // for 互联
            url += "&pt_3rd_aid=" + window.ptui_pt_3rd_aid;
        }
        if (window.ptui_regmaster) {
            url += '&regmaster=' + window.ptui_regmaster;
        }
        clearInterval(pt.qrcode.clock);
        pt.checkNetwork();
        if (type == 1) {
            $.http.loadScript(url); // ptui_qrcode_CB
        } else {
            $.e.add($('qrimg'), 'error', function() {
                $.css.show('qr_invalid');
            });
            $.e.add($('qrimg'), 'load', function() {
                clearTimeout(pt._timer);
                pt.qrcode.polling();
            });
            $('qrimg').src = url;
        }
        pt.qrcode.used = true;
        pt.qrcode.done = false;
        $.report.monitor('2136877');
    },
    polling: function(qrcode) {
        clearInterval(pt.qrcode.clock);
        pt.qrcode.clock = setInterval(function() {
            var qrUrl = pt.qlogin_submit(pt.qrcode.CGI);
            $.http.loadScript(qrUrl + "&r=" + Math.random());
        }, 3000);
        if (qrcode) {
            var schema = pt.isIos ? "wtloginmqq3:" : "wtloginmqq:";
            var dstUrl = schema + '//ptlogin/qlogin?qrcode=' + encodeURIComponent(qrcode) + '&schemacallback=' + encodeURIComponent('weixin://');
            openApp(dstUrl);
        }
    }
};

function ptui_qrcode_CB(res) {
    clearTimeout(pt._timer);
    res && (res.ec == 0) && pt.qrcode.polling(res.qrcode);
}

function weixin_sig_cb() {
    var callback = function() {
        WeixinJSBridge.invoke('getInstallState', {
            "packageName": "com.tencent.mobileqq",
            "packageUrl": "mqq://"
        }, function(res) {
            var err_msg = res && res.err_msg;
            var canOnekey;
            if (err_msg && (canOnekey = err_msg.match(/:yes(?:_(\d+))?/))) {
                var androidVersionCode = 336;
                //pt_no_onekey用于关闭一键登录
                if ((pt.isIPhone || (pt.isAndroid && canOnekey[1] >= androidVersionCode))&& $.bom.query('pt_no_onekey')!=='1')
                    pt.showOneKey('justshow');
            }
        });
    };
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        callback();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", callback, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", callback);
            document.attachEvent("onWeixinJSBridgeReady", callback);
        }
    }
}

/*
 * jsonp形式的调用，不可转移命名空间
 * ret 0：不需要验证码   1：需要验证码
 * code 需要验证码时，为加密串，拉取验证码需要带上
 *     不需要用户填验证码时，需要自动带上的验证码
 * 
 * @param {*} ptdrvs 这个用于在iframe内无法下发cookie的时候作为兜底逻辑
 */

function ptui_checkVC(ret, code, salt, verifysession, isRandSalt,ptdrvs) {
    if (!pt.isloading) return; //check已经超时就不要处理了
    clearTimeout(pt._timer);
    pt.endLoading();

    window.pt_ptdrvs = ptdrvs || ''; //前面加个pt的前缀防止冲突 pt_ptdrvs

    if (window.openSDK && openSDK.getMD5FromNative) {
        openSDK.getMD5FromNative(function() {
            pt.cb_checkVC(ret, code, salt, verifysession, isRandSalt);
        })
    } else {
        pt.cb_checkVC(ret, code, salt, verifysession, isRandSalt);
    }
}

/**
 * 刷新验证码，页面中有用到，暂不更改命名空间
 */

function ptui_changeImg() {

}

/**
 * 登录提交后，回调函数，暂不更改命名空间
 */

function ptuiCB(ret, extret, url, redirect, Mmsg, nick) {
    if (ret == 10005) {
        Mmsg = '为了帐号安全，请使用一键登录。';
        if ($("onekey")) {
            pt.showOneKey();
        }
    }
    if (ret != 0 && !pt.is_qlogin) { //QQ音乐帐号密码登录错误统计
        qqMusicReport("33616396", 33616397);
    }
    if (!pt.isloading && !pt.qrcode.used) return; //已经超时就不要处理了
    clearTimeout(pt._timer);
    try {
        pt.endLoading();
    } catch (e) {}
    pt.cb(ret, extret, url, redirect, Mmsg, nick);
}

/**
 * 上报拉取验证码所需时间
 * 页面中用到，暂不更改命名空间
 */

function imgLoadReport() {

}

/**
 * 检验登录表单所有数据的合法性
 * 此方法在点击登录的时候调用，页面中调用，暂不更改命名空间
 */

function ptui_checkValidate() {
    return pt.checkValidate();
}
/**
 * [ptui_auth_CB 授权回调函数]
 * @param  {[type]} ret，url [description]
 * @return {[type]}         [description]
 */

function ptui_auth_CB(ret, url) {
    switch (parseInt(ret)) {
        //显示授权页面
        case 0:
            if (pt.isHulian)
                pt.setCookieLogin();
            else
                pt.showAuth(url);
            break;
            //没有授权页面显示
        case 1:
            if (pt.isHulian) {
                // pt.cancel_cookielogin();
                break;
            }
            if (pt.mqqCanQLogin() && pt.accessCount() < 5) { //没有陷入死循环
                var url = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2.qq.com/jump?clientuin=$UIN&clientkey=$KEY&keyindex=$KEYINDEX&u1=" + encodeURIComponent(pt.s_url);
                pt.redirect(pt.target, url);
                break;
            }
            break;
            //不显示授权页面直接跳转
        case 2:
            if (pt.isHulian) {
                pt.setCookieLogin();
                break;
            }
            var authUrl = url + "&regmaster=" + window.ptui_regmaster + "&aid=" + window.ptui_appid + "&s_url=" + encodeURIComponent(pt.s_url);
            if (pt.low_login_enable == 1) {
                authUrl += "&low_login_enable=1&low_login_hour=" + window.ptui_low_login_hour;
            }
            if (window.ptui_pt_ttype == "1") {
                authUrl += "&pt_ttype=1";
            }
            if (window.ptui_pt_light == "1") {
                authUrl += "&pt_light=1";
            }
            pt.redirect(pt.target, authUrl);
            break;
        default:
    }
    pt.refreshQloginUI();
}

/**
 * [ptuiCB description]
 * @param  {String} ret       [错误码]
 * @param  {String} url       [跳转url]
 * @param  {String} msg       [登录信息]
 */

function ptui_qlogin_CB(ret, url, msg) {
    switch (ret + '') {
        case '0':
            //top.location.href = url;
            pt.redirect(pt.target, url);
            break;
        case '5':
            if (MTT.refreshToken) {
                var clock = setTimeout(function() {
                    pt.showErr(msg);
                }, 3000);
                MTT.refreshToken(pt.qqBrowserInfo.uin, function(data) {
                    MTT.refreshToken = null;
                    if (!data.stweb) return;

                    $.report.monitor("624562");
                    clearTimeout(clock);
                    pt.qqBrowserInfo.loginkey = data.stweb;
                    pt.qlogin_submit();
                });
                $.report.monitor("624561");
            } else {
                pt.showErr(msg);
            }
            break;
        default:
            $.report.nlog("qq浏览器快速登录失败," + ret, "443881", pt.qqBrowserInfo.uin);
            pt.showErr(msg);
    }
}

function canOpenqqUaCheck() {

    

    var iosbrowser = [
        'uc',
        'baidu',
        'weibo'
    ]; //ios不能打开手Q的浏览器
    var androidbrowser = [ //安卓不能打开QQ的名单
        // 'uc', 
        // 'qq', 
        // '2345', 
        // 'sogou', 
        // 'chrome', 
        // 'liebao',
        'weibo'
    ]; //手Q目前兼容了的浏览器，360算在chrome里,即android下可以打开手Q的浏览器，baidu安卓打不开
    var browserType = null;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('ucbrowser') > -1) {
        browserType = 'uc';
    } else if (ua.indexOf('baidubrowser') > -1) {
        browserType = 'baidu';
    } else if (ua.indexOf('mqqbrowser') > -1 || ua.indexOf('tencenttraveler') > -1) {
        browserType = 'qq';
    } else if (ua.indexOf('liebao') > -1) {
        browserType = 'liebao';
    } else if (ua.indexOf('2345browser') > -1) {
        browserType = '2345';
    } else if (ua.indexOf('sogoumobilebrowser') > -1) {
        browserType = 'sogou';
    } else if (ua.indexOf('weibo')> -1){//微博暂时屏蔽
        browserType = 'weibo';
    //这里注意，一定要最后判断chrome，因为其他app的ua里边也可能有chrome
    } else if (ua.indexOf('chrome') > -1) { //360,chrome都可以打开
        browserType = 'chrome';
    } else {
        browserType = 'other';
    }
    console.log(browserType);
    if (pt.isAndroid) {
        if (androidbrowser.indexOf(browserType) > -1) {
            return false;
        } else {
            return true;
        }
    } else if (pt.isIos) {
        if (iosbrowser.indexOf(browserType) > -1) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

OneKey.ERRMSG = {
    "2052": "使用一键登录，<a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>请安装最新版本的QQ手机版</a>",
    "1028": "使用一鍵登錄，<a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>請安裝最新版本的QQ手機版</a>",
    "1033": "Have <a href='http://im.qq.com/mobileqq/touch/53/index.html' target='_blank'>the latest Mobile QQ</a>？",
    "10000": "当前应用不支持QQ快速登录，建议使用其他浏览器尝试。"
};

function OneKey(dstUrl) {
    OneKey.done = false;
    OneKey.TIMEOUT = 3000;

    if (pt.isWX) {
        OneKey.TIMEOUT = 5000;
        OneKey.qrcode = true;
        for (var lang in OneKey.ERRMSG) {
            if (OneKey.ERRMSG.hasOwnProperty(lang))
                OneKey.ERRMSG[lang] = OneKey.ERRMSG[lang].replace(/<a.*>([^<]*)<\/a>/, "$1");
        }
        pt.qrcode.get(1);
    } else {
        setTimeout(function() {
            openApp(dstUrl);
        }, 100);
    }
}

/**
 * [openApp 优化拉起QQ手机版]
 * @param  {String} appScheme       QQ手机版的scheme
 * @param  {Function} [timeOutCallback] 拉起超时的回调，超时不一定失败，也可能是用户主动切回来
 * @param  {Function} [failCallback]    拉起失败的回调
 */
function openApp(appScheme, timeOutCallback, failCallback) {
    if (OneKey.done) return;
    if (pt.isLaunching) return;
    pt.isLaunching = true;
    var timeout = OneKey.TIMEOUT;
    var startDate = new Date();

    pt.btnOnekey.innerHTML = STR_LANG.onekeying;

    setTimeout(function() {
        timeOutCallback && timeOutCallback();
        pt.isLaunching = false;
        pt.btnOnekey.innerHTML = STR_LANG.onekey;

        if (pt.qrcode.done) return;
        if (new Date() - startDate <= timeout + 200) { // 200 毫秒是误差
            failCallback && failCallback(); //停留在当前页面，给出错误提示
            if (!canOpenqqUaCheck()) {
                pt.showErr(OneKey.ERRMSG["10000"], 5000); //浏览器原因拉起手Q失败停留在当前页面，给出错误提示
            } else {
                pt.showErr(OneKey.ERRMSG[ptui_lang], 5000); //停留在当前页面，给出错误提示
            }
            $.report.nlog("callApp failed:" + navigator.userAgent, 424783);
            qqMusicReport('83886593', 33616387); //QQ音乐一键登录失败量
        }
    }, timeout);

    // 为什么折腾?因为至少android微信不延时打开的话，按钮的文案不会更新
    if (pt.isWX && pt.isAndroid)
        setTimeout(function() { doOpenApp(appScheme) }, 100);
    else
        doOpenApp(appScheme);
}

/**
 * 
 * @param {String} appScheme 要 使用的schema
 * @param {Boolean} forceLocation 这个是为了兼容老版本微信，在使用jsapi跳转失败时，用传统的方法来跳转
 */

function doOpenApp(appScheme, forceLocation) {
    var res = $.detectBrowser();
    var browser = res[0] && res[0].toLowerCase();
    var schemas = {};
    //只有微信才走这个逻辑，企业微信不走这个逻辑
    if (pt.browser.isWX && !pt.browser.isWorkWX && !forceLocation) {
        $.invokeWXAPI('launchApplication', {
            "schemeUrl": appScheme
        }, function(res) {
            var err_msg = res && res.err_msg;
            console.log(err_msg)
            if (err_msg != 'launchApplication:ok') {
                console.log('try again')
                //可能是老版本微信 再用老方式试一次
                doOpenApp(appScheme, true);
            }
        })
    } else if (pt.isAndroid) {
        var openStyle = res[1] || "location";

        if (browser) {
            schemas = {
                'ucbrowser': 'ucweb://',
                'meizu': 'mzbrowser://',
                'liebaofast': 'lb://',
                'baidubrowser': 'bdbrowser://',
                'baiduboxapp': 'bdapp://',
                'qihoobrowser': 'qihoobrowser://',
                'chrome': 'googlechrome://',
                'sogoumobilebrowser': 'SogouMSE://',
                '2345browser': 'browser2345://',
                'now/' : 'tnow://openpage/web?url='
            };
            if (schemas[browser])
                appScheme += "&schemacallback=" + encodeURIComponent(schemas[browser]);
        }

        switch (openStyle) {
            case "iframe":
                if (openApp.iframe) {
                    openApp.iframe.src = appScheme;
                } else {
                    openApp.iframe = document.createElement("iframe");
                    openApp.iframe.src = appScheme;
                    openApp.iframe.style.display = "none";
                    document.body.appendChild(openApp.iframe);
                }
                openApp.flag = "iframe";
                break;

            case "open":
                var win = window.open(appScheme, "_blank");
                setTimeout(function() {
                    win.close();
                }, 0);
                openApp.flag = "open";
                break;

            case "location":
                location.href = appScheme;
                openApp.flag = "location";
                break;
        }
    } else { //IOS or others
        if (browser) {
            schemas = {
                'ucbrowser': 'ucbrowser://',
                'liebao': 'lb://u/100/',
                'baiduboxapp': 'baiduboxapp', //ios百度浏览器目前缺少schema，暂时不考虑
                'qihoobrowser': 'qihoobrowser://mse.360.cn/app?q=',
                'sogoumobilebrowser': 'SogouMSE://openurl?url=',
                'chrome': 'googlechrome',
                '2345browser': 'browser2345://',
                'now/' : 'tnow://openpage/web?url='
            };
            if (schemas[browser])
                appScheme += "&schemacallback=" + encodeURIComponent(schemas[browser]);
        }

        if (pt.isInIframe){ // ios 9无法在iframe中拉起APP
            pt.browser.setLocation(appScheme, window.top);
        }else{
            pt.browser.setLocation(appScheme, window)
        }
        openApp.flag = "location";
    }
}

/**
 * 把跟native调用相关的逻辑放到pt.nativeApi这个命名空间下
 */

pt.nativeApi = {
        doOpenApp : doOpenApp
    }

/**
 * [ 互联opensdk密码加密]
 * @return {[type]} [description]
 */
var openSDK = (function() {
    var md5Pwd = "";
    var result = 0;
    var sn = 0;
    var callbackArray = [];
    var curPosFromJS = function(pos, callback) {

        sn = 1;
        if (typeof callback == "function") {
            callbackArray[sn] = callback;
        }
        //pt.showErr("curPosFromJS,pos="+pos);
        window.location.href = "jsbridge://SecureJsInterface/curPosFromJS/" + sn + "/openSDKCallBack/" + pos;
    };
    var isPasswordEdit = function(flag, callback) {

        sn = 2;
        if (typeof callback == "function") {
            callbackArray[sn] = callback;
        }
        //pt.showErr("isPasswordEdit,sn="+sn);
        window.location.href = "jsbridge://SecureJsInterface/isPasswordEdit/" + sn + "/openSDKCallBack/" + flag;
    };
    var clearAllEdit = function(callback) {

        sn = 3;
        if (typeof callback == "function") {
            callbackArray[sn] = callback;
        }
        //pt.showErr("clearAllEdit,sn="+sn);
        window.location.href = "jsbridge://SecureJsInterface/clearAllEdit/" + sn + "/openSDKCallBack";

    };
    var getMD5FromNative = function(callback) {
        sn = 4;
        if (typeof callback == "function") {
            callbackArray[sn] = callback;
        }
        //pt.showErr("getMD5FromNative,sn="+sn);
        window.location.href = "jsbridge://SecureJsInterface/getMD5FromNative/" + sn + "/openSDKCallBack";

    };
    if (window.ptui_enablePwd == "1") {
        return {
            curPosFromJS: curPosFromJS,
            isPasswordEdit: isPasswordEdit,
            clearAllEdit: clearAllEdit,
            getMD5FromNative: getMD5FromNative,
            sn: sn,
            md5Pwd: md5Pwd,
            result: result,
            callbackArray: callbackArray
        }
    }

})();

function openSDKCallBack(json) {
    var result = json.result;
    var md5 = json.data;
    var sn = json.sn;
    switch (sn) {
        case 4:
            openSDK.md5Pwd = md5;
            openSDK.result = result;
            //alert("md5="+openSDK.md5Pwd);
            openSDK.callbackArray[sn].call();
            break;
        default:
            break;
    }
}

function get_app_basicinfo(res) {
    pt.open.fillAppInfo(res);
}

function ptui_wtlogin_CB(uin,sig) {
    clearInterval(pt.qrcode.clock);
    pt.isLoading && pt.endLoading();
    if(!window.wtCB){

        // 兼容and6奇怪的客户端bug 
        // 这里安卓6下，腾讯视频的客户端有个wtCB无法注入的bug，这里暂时的兜底逻辑 by dariondiao 20190408
        if(window.WTLogin && window.WTLogin.ptloginCallBack){
            WTLogin.ptloginCallBack(uin,sig);
        }else{
            pt.showErr('请安装手机QQ后再登录');
        }
        console.log('wtCB不存在');
    }else{
        window.wtCB && window.wtCB.apply(window, arguments);
        console.log('wtCB存在');
    }
}

//这里的代码只有在单元测试的时候会执行

if(typeof process!=='undefined' && process.env && process.env.UNITTEST==1){
	module.exports = pt
}


//启动代码都在login_mobile_init.js里边，会合并进来
//20180129 add
var hlhdFlag = false; //是否进行互联新版本登录模式灰度，条件为：1.在灰度名单中  2.在非手Q中  3.在style为35的情况下
var isMobileQQ = !!(typeof mqq != "undefined" && typeof mqq.QQVersion != "undefined" && mqq.QQVersion != 0 && !/Qzone/.test(navigator.userAgent));
if (window.ptui_style == 35 && window.hlhd_temp && !isMobileQQ) {
    hlhdFlag = true;
}



//启动登录页的主逻辑
pt.access();
pt.init();
// pt.isWX = true;
// pt.showOneKey('justshow');
if (!window.hlhdFlag) {
    if ($.bom.query("pt_wxtest") !== '0' && pt.isWX) weixin_sig_cb(); //使用jsbridge 不用发起请求了
} else {
    pt.showOneKey();
}
try {
    if (window._timePoints && window._timePoints.length > 1 && typeof(window.speedReportAR) == 'function') {
        window._timePoints[2] = Date.now();
        //参数填入(appId, buzId, siteId, pageId, gray)，其中 appId 是固定值20122 ，剩下的来自申请的 id
        //例如，校园圈主页的active点id为 21485-1-1-24，则填入
        window.speedReportAR(20122, 21998, 1, 1);
    }
} catch (err) {
    //console.log(err);
}

//20181129 add QQ音乐加上报
var url_appid = $.bom.query("appid") || '';
var qqMusicReport = function(appid, moinitorid) {
    if (url_appid == "83886593" && moinitorid) {
        $.report.monitor(moinitorid);
    }
}
qqMusicReport("83886593", 33616394); ///QQ音乐总量pv

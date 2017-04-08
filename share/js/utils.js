function _long(_key){
	try {
		if (_IS.fn("lg") ) {
			return lg(_key);
		}
	} catch(e) {}
	return _key;
}

;(function(win){
	var _myimgFn;
	_myimgFn = function(_str,_type) {  
		var _imglink;
		try {
			var dot_lastidx = _str.lastIndexOf('.');//查找最后一个a出现的位置
			var _typeLCase = _type.toLowerCase();
			if(".jpg" == _str.substring(dot_lastidx) || ".jpeg" == _str.substring(dot_lastidx)){
				if(  "xxs"==_typeLCase || "xs" == _typeLCase || "s" == _typeLCase || "m" == _typeLCase || "l" == _typeLCase || "xl" == _typeLCase || "xxl" == _typeLCase ){
					_imglink = _str.substring(0,dot_lastidx)+ "."+ _typeLCase+ _str.substring(dot_lastidx);
				}else{
					_imglink = _str.substring(0,dot_lastidx)+ _type + _str.substring(dot_lastidx);
				}
			}else{
				_imglink = _str;
			}
			return _imglink;
		} catch (ex) {
			// TODO: handle exception
			console.log(ex)
		}
		return null;
	};
	window["_img"] = { "g":_myimgFn };
})(window,_long);


/**判断函数**/
;(function(win){
	var _isExitsFn,_isArrFn,_ObjProto,_ArrayProto,_toString,_hasOwn,_indexofFn,_StringFn,_NumFn,_BoolFn,_ObjectFn,_insideFn,_emptyFn;
	var _EmailFn,_getlenFn,_notemptyFn;
	_isExitsFn=function(item) {
        try {
        	return  (typeof eval(item) == "function")
		} catch (ex) {}
        return false;
    };
     _isArrFn=function(_key) {
        return _key &&
            typeof _key === 'object' &&
            typeof _key.length === 'number' &&
            typeof _key.splice === 'function' &&
            !(_key.propertyIsEnumerable('length'));
    };
    _ObjProto   = Object.prototype;
	_ArrayProto = Array.prototype;
	_toString   = _ObjProto.toString;
	_hasOwn     = _ObjProto.hasOwnProperty;
	_indexofFn   = function(arr,val){
		if(_isArrFn(arr) ){
			 return arr.indexOf(val);
		}else{
			for(var i = 0, l = arr.length ; i < l ; i++) {
				if (arr[i] === val) {
					return i;
				}
			}
			return -1;
		}
	};
	_containFn = function(_data,_val){
		return (_indexofFn(_data,_val)>-1);
	};
	_getlenFn = function (jsonData){
		var jsonLength = 0;
		for(var item in jsonData){
			jsonLength++;
		}
		return jsonLength;
	}
	_StringFn  = function(s) { return (typeof s === 'string') || s instanceof String; };
	_NumFn  = function(n) { return (typeof n === 'number') || n instanceof Number; };
	_BoolFn    = function(b) { return b === !!b || b instanceof Boolean; };
	_ObjectFn  = function(o) { return (typeof o === "object") || o instanceof Object; };
	// test for containment, in both arrays and objects
	_insideFn  = function(container, val) {
		if (_array(container)) {
			return _indexofFn(container, val) > -1;
		} else if (_ObjectFn(container)) {
			for(var prop in container) {
				if (_hasOwn.call(container, prop) && container[prop] === val) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	};
	
	_emptyFn = function (a){
		try {
			if (typeof(a) == "undefined" || typeof(a) == "null" || a=="" || a==null)
				return true;
			return false;
		} catch (e) {
			// TODO: handle exception
			return false;
		}
		return false;
	}
	_notemptyFn = function (a){
		return (!_emptyFn(a));
	}
	_EmailFn = function() {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this);
    }
	window["_IS"] = {
		"fn":_isExitsFn,
		"Arr":_isArrFn,
		"num":_NumFn,
		"empty":_emptyFn,
		"notEmpty":_notemptyFn,
		"obj":_ObjectFn,
		"bool":_BoolFn,
		"string":_StringFn,
		"contain":_containFn,
		"index":_indexofFn,
		"inside":_insideFn,
		"email":_EmailFn,
		"len":_getlenFn
	}
})(window,_long);

/**数组函数**/
;(function(win){
	var _fFn;
	
	window["_Arr"] = {
		"_k":_fFn,
	}
})(window,_long);

/**时间函数**/
;(function(_win,_lg){
	var _toTimeFn,_toDateFn,_dateDiffFn,_FormatFn,_toPegStrFn;
	/**时间戳****/
	_toPegStrFn = function (_date){
		/**默认返回时间戳，否则返回当前时间戳**/
		var _pag;
		try {
			_pag = _toDateFn(_date).getTime();
		} catch (e) {
			// TODO: handle exception
		}
		return _pag;
	};
	_timeToFn = function(_nS){
		if(_date.length<22){
			_date = parseInt(nS) * 1000000000000000;
			_date = _date.substr(0,22);
		}
		return new Date(_date);
	};
	/**时间格式兼容****/
	_toDateFn = function (_date){
		var _ltime = null,_llltime = null;
		if(typeof _date == "object" ){
			_ltime = _date;
		}else if( _IS.string(_date) ){
			if( _date.indexOf("-")>-1 || _date.indexOf("/")>-1 ){
				if(_date.indexOf("-")>-1){
					_llltime = (_date.replace(/-/g,"/"));
				}
				_ltime=new Date(_llltime);
			}else{
				_ltime=_timeToFn(_llltime);
			}
		}else if( _IS.num(_date) ){
			_ltime=_timeToFn(_llltime);
		}else{
			_ltime=new Date();
		}
		return _ltime;
	};
	/**时间差***/
	_dateDiffFn = function (hisTime,nowTime){
	    if(!arguments.length) return '';
	    var arg = arguments,
	    now =arg[1]?arg[1]:new Date().getTime(),
	    diffValue = now - _toPegStrFn(arg[0]),
	    _data = _FormatFn(arg[0],"yyyy-MM-dd hh:mm:ss"),
	    result='',
	    second=1000,minute = second * 60,hour = minute * 60,day = hour * 24,halfamonth = day * 15,month = day * 30,year = month * 12,
	    _year = diffValue/year,_month =diffValue/month,_week =diffValue/(7*day),
	    _day =diffValue/day,_hour =diffValue/hour,_min =diffValue/minute,_sec =diffValue/second;
	    if(_year>=1){
	    	result={"_":_year,msg:_data,s:_data};
	    }else if(_month>=1){
	    	result={"_":_month,msg:parseInt(_month) +_long("个月前"),s:parseInt(_week) +_long("周")};
	    }else if(_week>=1){ 
	    	result={"_":_week,msg:parseInt(_week) +_long("周前"),s:parseInt(_week) +_long("周")};
	    }else if(_day>=1){ 
	    	result={"_":_day,msg:parseInt(_day) +_long("天前"),s:parseInt(_day) +_long("天")};
	    }else if(_hour>=1){ 
	    	result=parseInt(_hour) +_long("小时前");
	    	result={"_":_hour,msg:parseInt(_hour) +_long("小时前"),s:parseInt(_hour) +_long("小时")};
	    }else if(_min>=1){ 
	    	result=parseInt(_min) +_long("分钟前");
	    	result={"_":_min,msg:parseInt(_min) +_long("分钟前"),s:parseInt(_min) +_long("分钟")};
	    }else if(_sec>=1){
	    	result={"_":_sec,msg:parseInt(_sec) +_long("秒前"),s:parseInt(_sec)+_long("秒")};
	    }else{
	    	result={"_":diffValue,msg:_long("刚刚"),s:_long("2个月")};
	    }
	    return result;
	},
	_FormatFn = function (_date,_fmt) { //author: meizz 
		var _dateObj = _toDateFn(_date);
		var o = {
	        "M+": _dateObj.getMonth() + 1, //月份 
	        "d+": _dateObj.getDate(), //日 
	        "h+": _dateObj.getHours(), //小时 
	        "m+": _dateObj.getMinutes(), //分 
	        "s+": _dateObj.getSeconds(), //秒 
	        "q+": Math.floor((_dateObj.getMonth() + 3) / 3), //季度 
	        "S": _dateObj.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(_fmt)){
	    	_fmt = _fmt.replace(RegExp.$1, (_dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(_fmt)){
	    	_fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    }
	    return _fmt;
	}
	window["_Date"] = {
		"toDate":_toDateFn,
		"dateDiff":_dateDiffFn,
		"toPeg":_toPegStrFn,
		"dateStr":_FormatFn
	}
})(window,_long);
;(function(){
	window["_cache"] = {}; 
})();


/**数字/金额函数**/
;(function(win){
	var _formatKilobitFn;
	_formatKilobitFn = function (num, decimal){
		console.log(num)
		if(num&&num!=""){
			if(_IS.string(num)) num = parseFloat(num);
		    if(null == decimal || decimal == undefined) decimal = 2;
		    return (num.toFixed(decimal) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		}else{
			return 0;
		}
		return 0;
	}
	window["_Num"] = {
		"kilobit":_formatKilobitFn,
	}
})(window,_long);

;(function(win){
	var _toForm,_deepCopyFn;
	_toForm = function(json) {  
	    var str = [];  
	    for(var p in json){  
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
	    }  
	    return str.join("&");  
	};
	_deepCopyFn= function(source) { 
		var result={};
		for (var key in source) {
			result[key] = typeof source[key]==="object"? _deepCopyFn(source[key]):source[key];
		} 
		return result; 
	};
	window["_JSON"] = {
		"form":_toForm,
		"copy":_deepCopyFn
	}
})(window,_long);

(function(win){
	var _getAttrFn,_eachFn,_flipFn;
	_getAttrFn = function(_eles, _name) {
	     try {
	         if (_eles.length > 1) {
	             var aaa = [];
	             _self._each(_eles, function(data, key) {
	                 if (data.getAttribute(_name)) {
	                     aaa.push(data);
	                 }
	             });
	             return aaa;
	         } else {
	             if (_eles.getAttribute(_name)) {
	                 return _eles.getAttribute(_name)
	             }
	         }
	     } catch (e) {
	         // statements
	         return null;
	     }
	     return null;
	 };
	 _setAttrFn = function(_eles,data) {
	     try {
	         if(data.length>0){
	        	 for(var i=0;i<data.length;i++){
	        		 _eles.setAttribute(i,data[i])
	        	 }
	         }
	     } catch (e) {
	         // statements
	         return null;
	     }
	     return null;
	 };
	 _removeAttrFn = function(_eles,data) {
	     try {
	         if(data.length>0){
	        	 for(var i=0;i<data.length;i++){
	        		 _eles.setAttribute(i,data[i])
	        	 }
	         }
	     } catch (e) {
	         // statements
	         return null;
	     }
	     return null;
	 };
	 _eachFn = function(obj, callback) {
         var length = obj.length;
         if (length === undefined) {
             for (var name in obj) {
                 if (obj.hasOwnProperty(name)) {
                     if (callback.call(obj[name], obj[name], name) === false) {
                         break;
                     }
                 }
             }
         } else {
             for (var i = 0; i < length; i++) {
                 if (callback.call(obj[i], obj[i], i) === false) {
                     break;
                 }
             }
         }
     };
     _flipFn = function (_parent,_child) {
	    var timer = null;
	    var i = 0;
		var j = 0;
	    var aFlip = $(_parent);
	    function flipFn(arg1, arg2) {
			aFlip.eq(i).toggleClass(_child); 
			i++;
			if(i==8){
				clearInterval(timer);
				setTimeout(function(){
					i=0;
					timer=setInterval(flipFn, 200);
				},3000)
			}

	    }
	    timer = setInterval(flipFn,200);
	};
	_getNearEleFn = function(ele, type) {
		type = type == 1 ? "previousSibling" : "nextSibling";
		var nearEle = ele[type];
		while(nearEle) {
			if(nearEle.nodeType === 1) {
				return nearEle;
			}
			nearEle = nearEle[type];
			if(!nearEle) {
				break;
			}
		}
		return null;
	};
	/**
	* 获取当前执行对象的上一个元素
	*/
	_prevFn = function () {
	  return _getNearEleFn(this, 1);
	};
	/**
	* 获取当前执行对象的下一个元素
	*/
	_nextFn = function () {
	  return _getNearEleFn(this, 0);
	};
	window["_BOM"] = {
		"getAttr":_getAttrFn,
		"putAttr":_setAttrFn,
		"delAttr":_removeAttrFn,
		"each":_eachFn,
		"flip":_flipFn,
		"next":_nextFn,
		"prev":_prevFn
	};
})(window,_long);

;(function(){
	var getAllParamFn,getParamFn,_toJsonFn;
	_toJsonFn = function(url) {
        var _self = this,
            m = {},
            strUrl = [];
        strUrl = url.substring(url.indexOf('?') + 1, url.length).split('&');
        _self._each(strUrl, function(data, key) {
            var curStr = data.split('=');
            if (curStr.length === 2) {
                var k = curStr[0];
                var v = curStr[1];
                if (_self._hasKey(m, k)) {
                    //如果key已经存在，则该key值为数组类型，将值放入数组即可
                    if (_self._isArr(m[k])) {
                        m[k].push(v);
                    } else {
                        var arr = [];
                        arr.push(m[k], v);
                        m[k] = arr;
                    }
                } else {
                    m[k] = v;
                }
            }
        });
        return m;
    };
    _toStrFn = function(_URL) {
    	return (_URL.toString())
    };
	getParamsFn = function(){
		var url = _toStrFn(window.document.location.href);
	    var u = url.split("?");
	    var arr = [];
	    if(typeof(u[1]) == "string"){
	        u = u[1].split("&");
	        for(var i in u){
	            var a =  (u[i].split("="));
	            arr[a[0]] =decodeURIComponent(a[1]);
	            console.log(decodeURIComponent(a[1]))
	        }
	    }
	    return arr;
	};
	getParamFn = function(name){
		try {
			return getParamsFn(name);
		} catch (e) {
			// TODO: handle exception
		}
		return null;
	};
	delParamFn = function(name){
		try {
			return getParamsFn(name);
		} catch (e) {
			// TODO: handle exception
		}
		return null;
	};
	addParamFn = function(name){
		try {
			return getParamsFn(name);
		} catch (e) {
			// TODO: handle exception
		}
		return null;
	};
	window["_URL"] = {
		get:getParamFn,
		del:delParamFn,
		add:addParamFn,
		toJson:_toJsonFn,
		toStr:_toStrFn
	};
})();



;(function(){
	var _createFn,_postFn,_getFn,_loadFn;
	_createFn = function (_opt) {
		var _default = { headers: {"Content-Type": "application/x-www-form-urlencoded"},type:"get",url:"",data:{},dataType:"json",done:null};
		var _userSet = _extend({},_default,_opt)
		var _type = (_userSet.dataType).toLowerCase();
		var _back =  { msg:"操作成功",code:200, data:{},body:{} };
		$.ajax(_userSet).done(function(result) {
			if("json" == _type ){
				if(_IS.string(result)){
					var _result  = (eval("("+result+")"));
					if(_IS.contain(_result,"obj")){
						_back["data"] = _result.obj;
						_back["body"] = _result.attributes;
					}else{
						_back["data"] = _result;
						_back["body"] = result;
					}
				}else{
					_back["data"] = result.obj;
					_back["body"] = result.attributes;
				}
			}else{
				if(_IS.contain(result,"obj")){
					_back["data"] = result.obj;
					_back["body"] = result.attributes;
				}else{
					_back["data"] = result;
					_back["body"] = result;
				}
			}
			_userSet.done(_back);
		}).fail(function(jqXHR, textStatus) {
			_back["msg"] = "操作失败"; 
			_back["data"] = textStatus;
			_back["body"] = [jqXHR,textStatus];
			_back["code"] = jqXHR.status?jqXHR.status:"404";
			_userSet.done(_back);
		});
	};
	_postFn = function (_url,_data,_callback) {
		_createFn({url:_url,data:_data,type:"post",done:_callback});
	};
	_getFn = function (_url,_data,_callback) {
		_createFn({url:_url,type:"get",done:_callback});
	};
	_loadFn = function (_url,_callback) {
		_getFn({link:_url,done:_callback});
	}
	window["_request"] = {
		"load":_loadFn,
		"get":_getFn,
		"put":_postFn,
		"create":_createFn
	};
})();







/**
 * [_CallOS description]系统userAgent识别（微信，手q，猎豹，ios，安卓，百度（手机百度，百度浏览器），支付宝，搜狗，明道，QQ浏览器，uc浏览器，版本（ios，uc浏览器，qq浏览器）是否是手机，当前语言环境）
 * 	Detect browser language, judge browser
 * @return
 */
;(function(usrNav) {
    var userAgent = usrNav.userAgent;
    var isMobile = !!userAgent.match(/android|webos|ip(hone|ad|od)|opera (mini|mobi|tablet)|iemobile|windows.+(phone|touch)|mobile|fennec|kindle (Fire)|Silk|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch|MicroMessenger/i);
    var platform = (function(usrNav) {
        var strForm = null;
        if (isMobile) {
            if (/iPad|iPhone|iPod/i.test(usrNav)) { strForm = "ios"; } else if (/android/i.test(usrNav)) { strForm = "android"; } else { strForm = "other"; }
        } else {
            strForm = "pc";
        }
        return strForm;
    }(userAgent));
    var is_WX = (function(usrNav) {
        if (usrNav.match(/MicroMessenger/i) == "MicroMessenger") { return true; } else { return false; }
    }(userAgent));
    var is_UCB = (function(usrNav) {
        if (usrNav.match(/UCBrowser/i) == "UCBrowser") { return true; } else { return false; }
    }(userAgent));
    var is_QQB = (function(usrNav) {
        if (usrNav.match(/QQBrowser/i) == "QQBrowser") { 
           if( is_QQB && !is_QQ ){
               return true;
           }else if( is_QQB && !is_WX ){
               return true;
           }else{
               return false; 
           }
       } else { 
           return false; 
       }
    }(userAgent));
    var is_QQ = (function(usrNav) {
        if (usrNav.match(/QQ\//i) == "QQ/") { return true; } else { return false; }
    }(userAgent));
    var is_BAIDU = (function(usrNav) {
        if (usrNav.match(/baidubrowser/i) == "baidubrowser") { return 1; } else if (usrNav.match(/baiduboxapp/i) == "baiduboxapp") { return 2; } else { return false; }
    }(userAgent));
    var is_Alipay = (function(usrNav) {
        if (usrNav.match(/Alipay/i) == "Alipay") { return true; } else { return false; }
    }(userAgent));
    var is_LieBao = (function(usrNav) {
        if (usrNav.match(/LieBao/i) == "LieBao") { return true; } else { return false; }
    }(userAgent));
    var is_Sogou = (function(usrNav) {
        if (usrNav.match(/Sogou/i) == "Sogou") { return true; } else { return false; }
    }(userAgent));
    var is_Mingdao = (function(usrNav) {
        if (usrNav.match(/Mingdao/i) == "Mingdao") { return true; } else { return false; }
    }(userAgent));
      /**
       *获取浏览器版本
       * @param  {String} nece [UA中带有版本信息的部分字符串]
       * @return {Number}      [版本号]
       **/
    var getVersion = function(nece) {
           var arr = nece.split('.');
           return parseFloat(arr[0] + '.' + arr[1]);
       };
       var qqb_v = is_QQB ? (userAgent.toLowerCase().split('mqqbrowser/')[1]) : 0;
       var ucb_v = is_UCB ? (userAgent.toLowerCase().split('ucbrowser/')[1]) : 0;
       var ios_v = ("ios"==platform) ? parseInt(  (userAgent.toLowerCase()).match(/\s*os\s*\d/gi)[0].split(' ')[2], 10) : 0;
    var user_Lang = {
        getLang: function() {
            var lang; 
            if (usrNav.language) { 
                lang = usrNav.language; 
            } else if (usrNav.browserLanguage) { 
                lang = usrNav.browserLanguage; 
            } else if (usrNav.systemLanguage) { 
                lang = usrNav.systemLanguage; 
            } else if (usrNav.userLanguage) { 
                lang = usrNav.userLanguage; 
            }
            lang = lang.substr(0, 4).toLowerCase(); 
            return lang;
        }
    };
    var _widthFn = (function(){
    	return (document.documentElement.clientWidth || document.body.clientWidth);
    })();
    var _heightFn = (function(){
    	return (document.documentElement.clientHeight || document.body.clientHeight);
    })();
    window["_OSAPI"] = {
    	"mobile": isMobile,
        "ver":{qqb:qqb_v,ucb:ucb_v,ios:ios_v},
        "form": platform,
        "lang": user_Lang.getLang(),
        "wx": is_WX,
        "qq": is_QQ,
        "ali": is_Alipay,
        "baidu": is_BAIDU,
        "liebao": is_LieBao,
        "sogou": is_Sogou,
        "ming": is_Mingdao,
        "qqb": is_QQB,
        "ucb": is_UCB,
        "ua": navigator.userAgent,
        "size":{
        	"width":_widthFn,
        	"height":_heightFn
        }
    };
}(navigator));

 /**
  * [_newPage description] 修改默认【open()】bug，动态加载js，动态执行隐藏动作（邮件，调用手机，qq协议等等特殊协议）；
  * @param  {[type]} _url [description]
  * @return {[type]}      [description]
  */ 
;(function(global) {
     var _callOpen, _openPc, _openMob,_winName,_artopen,_loadScript,_scheme;
    _winName = '_SIVEN-' + (new Date).getTime();
    var _isArr = function(_key) {
        return _key &&
            typeof _key === 'object' &&
            typeof _key.length === 'number' &&
            typeof _key.splice === 'function' &&
            !(_key.propertyIsEnumerable('length'));
    };
    var tomiParams  = function(json) {
        if (!json) return "";
        var arr = [],
            temp = "";
        for (var m in json) {
            temp = "";
            if (_isArr(json[m])) {
                temp = json[m].join("&" + m + "=");
            } else {
                temp = json[m];
            }
            arr.push(m + "=" + temp);
        }
        return arr.join("&");
    };
    /**
     * 弹窗 (_artopen)
     * @param       {String}        地址
     */
    _artopen = function(_url, _done) {
        var _DOM, _iframe;
        _DOM = document.getElementsByTagName('body');
        _iframe = document.createElement('iframe');
        _iframe.style.display = 'none';
        _iframe.src = _url;
        _iframe.name = _winName;
        _iframe.setAttribute('frameborder', 0, 0);
        _iframe.setAttribute('allowTransparency', true);
        if (_iframe.attachEvent) {
            _iframe.attachEvent("onload", function() {
                _done&& _done(document.frames(_winName).document)
                _DON.removeChild(_iframe);
            });
        } else {
            _iframe.onload = function() {
                _done&& _done(document.frames(_winName).document)
               _DOM.removeChild(_iframe);
            };
        }
        _DOM[0].appendChild(_iframe);
    };
    /**
     * 动态加载外部脚本
     * @param  {String}   url [脚本地址]
     * @param  {Function} done  [脚本完毕回调函数]
     */
    _loadScript=function(_url, _done) {
      var script = document.createElement('script');
      script.src = _url;
      script.id = _winName;
      script.onload = onreadystatechange = function() {
        if (!this.readyState ||
            this.readyState === 'load' ||
            this.readyState === 'complete') {
          _done && _done(script.parentNode,script);
          script.onload = onreadystatechange
          if(_url.indexOf("&_cutout=1")){
            script.parentNode.removeChild(script);
          }
        }
      };
      script.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     * 通过scheme唤起APP
     * @param  {String} scheme [app打开协议]
     */
    _scheme=function (_url, _done) {
      if ("ios" == _OSAPI.strForm) {
        if(_OSAPI.ver.ios > 8){
            global.location.href = scheme;
        }else{
            _artopen(_url, _done);
        }
      } else {
        _artopen(_url, _done);
      }
    };
    _openMob = function(_url,_done) {
         location.href = _url;
    };
    _openPc = function( _url,_done,_prms ) {
        var _default = {
            width:640,
            height:500,
            innerWidth:640,
            innerHeight:500,
            top:(global.screen.availHeight - 30 -500) / 2,
            left:(global.screen.availWidth - 10 - 640) / 2
        };
       var _winL;
        try{
            var evt = document.createEvent('Event');
            a.initEvent('click', true, true);
            a.dispatchEvent(evt);
        }catch(e){
            if(/sm/.test(_prms)){
                var _prams=tomiParams(_default).replace(new RegExp("&",'gm'),',');
                _winL = global.open(_url, "",_prams);
            }else{
                _winL = global.open(_url, "");
            }
            _done && _done(_winL);
        }
    };
    _callOpen = function(_url,_done,_prms) {
        var _timestamp=new Date().getTime();
        var _urlstamp = _url+"&_bbb="+_timestamp;
         if( _url.indexOf("&tomi=js")>-1 || _url.indexOf("#tomi=js")>-1 ||  _url.indexOf("?tomi=js")>-1 ){
            _loadScript(_urlstamp,_done);
         }else if(_url.indexOf("&tomi=iframe")>-1 || _url.indexOf("?tomi=iframe")>-1 || _url.indexOf("#tomi=iframe")>-1){
            _artopen(_urlstamp,_done);
         }else if(_url.indexOf("&tomi=scheme")>-1 || _url.indexOf("?tomi=scheme")>-1 || _url.indexOf("#tomi=scheme")>-1 ){
            _scheme(_urlstamp);
         }else{
             if (_OSAPI.mobile) {
                 _openMob(_urlstamp,_done,_prms);
             } else {
                 _openPc(_urlstamp,_done,_prms);
             }
         }
     };
     global._open = _callOpen;
 })(window);
/**
 * [description] window._extend javascript模拟jquery-extend
 * @param  {[type]}  [description]
 * @return {[type]}        [description]
 */
;(function(global) {
    var extend, mi_extend, _isObject;
    _isObject = function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    };
    mi_extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };

                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    };
    extend = function() {
        var arr = arguments,
            result = {},
            i;
        if (!arr.length) return {};
        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                mi_extend(arr[i], result);
            };
        }
        arr[0] = result;
        return result;
    };
    global._extend = extend;
})(window);




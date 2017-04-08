;(function(_win) {
    var obj = new Object();
    // 是否在Android浏览器中
    obj.isAD = function() {
        if (typeof(window.adwebkit) != "undefined") {
            return true;
        }
        return false;
    };
    // 是否在iOS浏览器中
    obj.isIOS = function() {
        if (typeof(window.oswebkit) != "undefined") {
            return true;
        }
        return false;
    };
    // JS调用App方法
    obj.callApp = function(method,params,callback) {
    	if (obj.isAD()) {
            obj.callAD(method,params,callback);
        }
        if (obj.isIOS()) {
            obj.callIOS(method,params,callback);
        }
    };
    // JS调用Android方法
    obj.callAD = function(method,params,callback) {
    	var calAppRes = null;
    	try {
        	calAppRes = window.adwebkit.callApp(method,params);
		} catch (e) {
			// TODO: handle exception
			calAppRes=e;
		}
		callback(calAppRes);
    };
    // JS调用iOS方法
    obj.callIOS = function(method,params,callback) {
    	var calAppRes = null;
    	try {
        	calAppRes = window.oswebkit.callApp(method,params);
		} catch (e) {
			// TODO: handle exception
			calAppRes=e;
		}
		callback(calAppRes);
    };
    _win["_Appkit"]=obj;
})(window);
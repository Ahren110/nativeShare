/*
 * [OSFix description]
 * @param {[type]} el [description]
 */
var OSFix = (function() {
    var OverflowScrollingFix = function(el) {
        if (!this.needFix) return;
        this.el = typeof el == 'object' ? el : document.querySelector(el);
        this.el.addEventListener('touchstart', this, false);
    };
    OverflowScrollingFix.prototype = {
        needFix: 'webkitOverflowScrolling' in document.documentElement.style,
        handleEvent: function(e) {
            if (e.type == 'touchstart') this.touchStart(e);
        },
        touchStart: function(e) {
            var maxScroll = this.el.scrollHeight - this.el.offsetHeight;
            if (this.el.scrollTop <= 0) this.el.scrollTop = 1;
            else if (this.el.scrollTop >= maxScroll) this.el.scrollTop = maxScroll - 1;
        },
        destroy: function() {
            if (!this.needFix) return;
            this.el.removeEventListener('touchStart', this, false);
        }
    };
    return OverflowScrollingFix;
})();
var getpath = function() {
    var w = window.location,
        wh = w.href,
        wt = w.host,
        wp = w.protocol;
    var ui = ["/MiningCircle", "/Finance", "/upload", "/gl"];
    var ui0 = ui[0],
        ui1 = ui[1];
    var path = "";
    path = (wh.indexOf(ui0) >= 0) ? ui0 : ((wh.indexOf(ui1) >= 0) ? ui0 : "");
    return wp + "//" + wt + path;
};!function(o) {
    function t(o) {
        return "object" == typeof o ? "object" == typeof o : !1
    }
    o._isDOM = t
}(window);

var _queryElele = function(_ele) {
    var _eles;
    if (_isDOM(_ele)) {
        _eles = _ele[0];
    } else {
        _eles = document.querySelector(_ele);
    }
    return _eles;
}

var _EleDom = {
    has: function(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    add: function(obj, cls) {
        if (!this.has(obj, cls)) obj.className += " " + cls;
    },
    remove: function(obj, cls) {
        if (this.has(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },
    toggle: function(obj, cls) {
        if (this.has(obj, cls)) {
            this.remove(obj, cls);
        } else {
            this.add(obj, cls)
        }
    }

};

/**
 * [share description] share
 *
 * @param  {[String link]} [Required]  URL address
 * @param  {[String title]}  Title
 * @param  {[String image]}  picture linking
 * @return
 */
(function(_win) {
    var qqJsSrc = {
        lower: "http://3gimg.qq.com/html5/js/qb.js",
        higher: "http://jsapi.qq.com/get?api=app.share"
    };
    var _ucAppList = {
        weibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        fweixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        cweixin: ['kWeixinFriend', 'WechatTimeline', 8, '微信朋友圈'],
        qq: ['kQQ', 'QQ', 4, 'QQ好友'],
        qzone: ['kQzone', 'Qzone', 3, 'QQ空间'],
        copy: ['kCopy', 'Copy', 10, '复制网址'],

    };
    var ShareTip = function(ele, opt) {
        var defaults = {
            "image": "http://www.miningcircle.com/img/comm/login.jpg", //图片地址
            "title": "矿业圈 MiningCircle", //标题
            "link": "http://www.miningcircle.com/index.do?", //链接地址
            "vdesc": "打造全球矿产资源电子商务平台", //描述
            "lang": "all", //[all:所有的（中国，外国，或一些系统的分享渠道）,eng/en/english:除中国以外的分享渠道,cn/zh/Chinese:中国的分享渠道]
            markimg: 'images/weixin.png', //微信浏览器分享提示图片
            codeTitle: '手机扫一扫',
            codeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可分享至朋友圈。</p>',
            codeSize: 240,
            default: ["weibo", "fweixin", "cweixin", "qq", "qzone", "yixin", "facebook", "twitter", "google", "linkedin", "copy", "email", "qr"],
            btnEvent: null
        };
        this._nnn = false;
        this.eles = ele, this.config = _extend({}, defaults, opt); //若没有第一个参数，默认获取class为loading的元素
    };
    ShareTip.prototype = {
        init: function() {
            var _self = this,
                _conf = _self.config;
            _self._init();
            _self.create();
            _self.bindEvent();
        },
        _init: function() {
            var _self = this;
             _self.mitime= new Date().getTime();
            _self._mobileApi();
             console.log(_self)
        },
        /**
         * Create the Element button.
         * @param
         **/
        create: function() {
            var _self = this,
                _conf = _self.config,
                _shareDom = '',
                _ele = _self.eles;
            var _popupWx = _self._createStr("<div class=\"share-mask share_mark mark"+_self.mitime+"\" style=\"height: 6935px;\"><div class=\"share-guide\"></div><div class=\"share-slogan\"></div></div>");
            var _popupQr = _self._createStr("<div class=\"share-mask bottom share_code code"+_self.mitime+"\" style=\"height: 6935px;\"></div>");


            var _qr = _self.createWechat();
            _popupQr[0].appendChild(_qr);
            _EleDom.remove(_popupQr[0], "pc");
            var _modal_code = _self._getEleClass(_popupQr[0], "wechat-qrcode");
            _EleDom.add(_modal_code[0], "bottom");
            _self["qr"] = _popupQr[0];
            _self["mark"] = _popupWx[0];

            //_popupQr createWechat
            var _popupCont = _self._createStr("<div class='SI_popup-wrapper'><div class='SI_popup-modal SI_tool-popup-modal'><div class='SI_popup-content'><div class='SI_tool-list wa-image-scroll-wrapper'></div><div class='SI_tool-cancel-btn'>取消</div></div></div><div class='SI_popup-mask'></div></div>");
            var _modal = _self._getEleClass(_popupCont[0], "wa-image-scroll-wrapper");
            var si_share = _self._createStr("<div class=\"SI_flexbox SI_share-list wa-image-scroller\"></div>");
            var si_other = _self._createStr("<div class=\"SI_flexbox SI_other-list\"></div>");
           
            var sname = _self._logic();
            var frag1 = [],
                frag2 = [];
            _BOM.each(sname, function(data, key) {
                var _link = _self._makeUrl(key);
                var _aaa = ("<div class=\"SI_tool-btn wa-image-entity btn\" data-key=\"" + key + "\"  data-link=\"" + _link + "\"><img class=\"SI_img\" src=\"" + _self._path("img/" + key + ".png") + "\"><span class=\"SI_gap-top SI_line-clamp1\">" + data.name + "</span></div>");
                if(/cweixin|fweixin|alipay|qr|copy|email|qr|more/i.test(key) ){
                    if (/copy/.test(key)) {
                        _aaa = ("<div class=\"SI_tool-btn wa-image-entity btn copy"+_self.mitime+"\" id=sharepp data-clipboard-text=\"" + _conf.link + "\"data-key=\"" + key + "\"  data-link=\"" + _link + "\"><img class=\"SI_img\" src=\"" + _self._path("img/" + key + ".png") + "\"><span class=\"SI_gap-top SI_line-clamp1\">" + data.name + "</span></div>");
                        frag2.push(_aaa);
                    }else{
                        var  _domA = (_self._createStr(_aaa))
                        //_domA[0].appendChild(_qr);
                        var _newDOM =_self._newHTML(_domA[0]);
                        if(/cweixin|fweixin|alipay/i.test(key) ){
                            frag1.push(_newDOM);
                        }else{
                            frag2.push(_newDOM);
                        }
                    }
                }else{
                    frag1.push(_aaa);
                }
            });
            si_share[0].innerHTML = frag1.join('');
            si_other[0].innerHTML = frag2.join('');
            _modal[0].appendChild(si_share[0]);
            _modal[0].appendChild(si_other[0]);
            var body_flag = _self._getEleClass(document.body, "copy"+_self.mitime);
            document.body.appendChild(_popupWx[0]);
            document.body.appendChild(_popupQr[0]);

            var _SImodal = _self._getEleClass(_popupCont[0], "SI_tool-popup-modal");
            var _SIcancel = _self._getEleClass(_popupCont[0], "SI_tool-cancel-btn");
             var _csstxt= null;
            if(!_OSAPI.mobile){
                _EleDom.add( _SImodal[0],"no_mobile")
                if(_OSAPI.size.width>400){
                    _csstxt = "top:"+(_OSAPI.size.height-246)/2+"px;left:"+(_OSAPI.size.width-380)/2+"px";
                }else{
                    _csstxt = "top:0;left:0";
                }
                _SImodal[0].style.cssText=_csstxt;
                _SIcancel[0].style.cssText="display:none;";
            }
            _csstxt = null;
            _ele.appendChild(_popupCont[0]);
            var _scoll = {scrollX:true,click:true,eventPassthrough:true,preventDefault:false,scrollY:false,hScrollbar:false,vScrollbar:false,hScroll:false,scrollbarClass:"wa-image-scroller"};
            var doclst = (_self._getEleClass(document, "SI_tool-list"))
            try {
                if (doclst.length > 1) {
                    _BOM.each(doclst, function(data, key) {
                        new IScroll(data, _scoll);
                        scrollView = new OSFix(data);
                    });
                } else {
                    new IScroll(".SI_tool-list", _scoll);
                    scrollView = new OSFix(".SI_tool-list");
                }
            } catch (e) {
                _open(_self._path("lib/iscroll/iscroll-lite.min.js") + "?tomi=js", function() {
                    if (doclst.length > 1) {
                        _BOM.each(doclst, function(data, key) {
                            new IScroll(data, _scoll);
                            scrollView = new OSFix(data);
                        });
                    } else {
                        new IScroll(".SI_tool-list", _scoll);
                        scrollView = new OSFix(".SI_tool-list");
                    }
                });
            }
        },
        bindEvent: function() {
            var _self = this,
                _conf = _self.config,
                _Ele = _self.eles;
            var _Elbox = _Ele.getElementsByClassName("SI_popup-wrapper")[0];
            var _EleItem = _self._getEleClass(_Elbox, "SI_tool-btn", "div");
            var _Cancel = _self._getEleClass(_Elbox, "SI_tool-cancel-btn", "div");
            var _Mask = _self._getEleClass(_Elbox, " SI_popup-mask", "div");
            var _WXMask = _self.mark,_QRMask = _self.qr;
            _BOM.each(_EleItem, function(data, key) {
                var _data = _BOM.getAttr(data, "data-key");
                data.onclick = function(arg) {
                    _self._call(data, _data);
                    _EleDom.remove(_Elbox, "active");
                };
            });
            var _aveClick = function(arg,mask) {
                _EleDom.remove(_Elbox, "active");
            };
            var _wxClick = function(arg,mask) {
                _EleDom.remove(arg.target, "share-mask-show");
            };
            _Cancel[0].onclick = _aveClick;
            _Mask[0].onclick = _aveClick;
            _WXMask.onclick = _wxClick;
            _QRMask.onclick = _wxClick;
            var _eles;
            if (null != _conf.btnEvent) {
                var _event = _conf.btnEvent;
                _eles = _queryElele(_event);
            }
            _eles.onclick = function() {
                _EleDom.add(_Elbox, "active");
            };
            try {
                var clipboard = new Clipboard(".copy"+_self.mitime);
            } catch (e) {
                _open(_self._path("lib/clipboard/clipboard.min.js") + "?tomi=js", function() {
                    var clipboard = new Clipboard(".copy"+_self.mitime);
                });
            }
        },
        _path: function(str) {
            var _self = this;
            var _shareFile = document.getElementById('shareFile');
            var _path = (_BOM.getAttr(_shareFile, "src"));
            var path = _self._getPath(_path);
            return path + str;
        },
        _call: function(_a, _b) {
            var _self = this,
                _uname = _self._uu_name,
                _conf = _self.config;
            var _link = _BOM.getAttr(_a, "data-link");
            if (_OSAPI.mobile) {
                if (_self._isUap()) {
                    _self._nUap(_a, _b, _conf);
                } else if (_OSAPI.sogou) {
                    _self._Sg(_a, _b, _conf);
                } else if (_OSAPI.qq) {
                    _self._Sq(_a, _b, _conf);
                } else if (_OSAPI.qqb) {
                    _self._QqUcb(_a, _b, _conf);
                } else if (_OSAPI.ucb) {
                    _self._QqUcb(_a, _b, _conf);
                } else if (_OSAPI.wx || _OSAPI.ming || _OSAPI.ali) {
                    _self._Smask(_a, _b, _conf);
                } else {
                    _self._otherClick(_link, _b);
                }
            } else {
                _self._otherClick(_link, _b);
            }
        },
        _Sg: function(_dom, key, _data) {
            var _self = this;
            var _link = _BOM.getAttr(_dom, "data-link");
            try {
                switch (key) {
                    case "qq":
                        SogouLoginUtils.shareQQ();
                        break;
                    case "weibo":
                        SogouLoginUtils.shareSinaWeibo();
                        break;
                    case "fweixin":
                        SogouLoginUtils.shareWeixinMoment();
                        break;
                    case "cweixin":
                        SogouLoginUtils.shareWeixinContact();
                        break;
                    default:
                        _self._otherClick(_link, key);
                        break;
                }
            } catch (e) {
                _self._otherClick(_link, key);
            }
        },
        _Smask: function(_dom, key, _data) {
            var _self = this;
            var _link = _BOM.getAttr(_dom, "data-link");
            try {
                switch (key) {
                    case "qq":
                        _EleDom.add(_self.mark, "share-mask-show");
                        break;
                    case "fweixin":
                        _EleDom.add(_self.mark, "share-mask-show");
                        break;
                    case "cweixin":
                        _EleDom.add(_self.mark, "share-mask-show");
                        break;
                    default:
                        _self._otherClick(_link, key);
                        break;
                }
            } catch (e) {
                _self._otherClick(_link, key);
            }
        },
        _nUap: function(_dom, key, _data) {
            var _self = this;
            var _link = _BOM.getAttr(_dom, "data-link");
            try {
                switch (key) {
                    case "qq":
                        _self._otherClick(_link, key);
                        break;
                    case "weibo":
                        _self._sshre("#callapp", {
                            cmd: key,
                            title: _data.title,
                            img: _data.image,
                            desc: _data.vdesc,
                            url: _data.link
                        })
                        break;
                    case "fweixin":
                        _self._sshre("#callapp", {
                            cmd: key,
                            title: _data.title,
                            img: _data.image,
                            desc: _data.vdesc,
                            url: _data.link
                        })
                        break;
                    case "cweixin":
                        _self._sshre("#callapp", {
                            cmd: key,
                            title: _data.title,
                            img: _data.image,
                            desc: _data.vdesc,
                            url: _data.link
                        })
                        break;
                    default:
                        _self._otherClick(_link, key);
                        break;
                }
            } catch (e) {
                _self._otherClick(_link, key);
            }
        },
        _Sq: function(_dom, key, _data) {
            var _self = this;
            var _link = _BOM.getAttr(_dom, "data-link");
            try {
                switch (key) {
                    case "qq":
                        var schemeMqq = (_self._makeUrl(key, "mqq"));
                        _open(schemeMqq + "&tomi=scheme");
                        break;
                    case "qzone":
                        var schemeMqq = (_self._makeUrl(key, "mqq"));
                        _open(schemeMqq + "&tomi=scheme");
                        break;
                    case "cweixin":
                        _EleDom.add(_self.mark, "share-mask-show");
                        break;
                    case "fweixin":
                        _EleDom.add(_self.mark, "share-mask-show");
                        break;
                    default:
                        // statements_def
                        _self._otherClick(_link, key);
                        break;
                }
            } catch (e) {
                // statements
                _self._otherClick(_link, key);
            }
        },
        _QqUcb: function(_dom, key, _data) {
            var _self = this;
            var _link = _BOM.getAttr(_dom, "data-link");
            try {
                var to_app;

                function _nativ() {
                    if (_OSAPI.ucb) {
                        to_app = _OSAPI.form == 'ios' ? _ucAppList[key][0] : _ucAppList[key][1];
                        if (typeof(ucweb) != "undefined") {
                            ucweb.startRequest("shell.page_share", [_data.title, _data.title, _data.link, to_app, "", "@", ""])
                        } else {
                            if (typeof(ucbrowser) != "undefined") {
                                ucbrowser.web_share(_data.title, _data.title, _data.link, to_app, "", "@", '')
                            } else {
                                _self._otherClick(_link);
                            }
                        }
                    } else if (_OSAPI.qqb) {
                        to_app = _ucAppList[key][2];
                        var o = {
                            url: _data.link,
                            title: _data.title,
                            img_url: _data.image,
                            to_app: to_app,
                            cus_txt: ""
                        };
                        typeof browser != "undefined" && browser.app && browser.app.share ?
                            browser.app.share(o) : typeof qb != "undefined" ? qb.share(o) :
                            _self._otherClick(_link, key);
                    } else {
                        _self._otherClick(_link, key);
                    }
                }
                switch (key) {
                    case "qq":
                        _nativ();
                        break;
                    case "qzone":
                        _nativ();
                        break;
                    case "weibo":
                        _nativ();
                        break;
                    case "fweixin":
                        _nativ();
                        break;
                    case "cweixin":
                        _nativ();
                        break;
                    case "copy":
                        _nativ();
                        break;
                    case "qr":
                        _nativ();
                        break;
                    default:
                        _self._otherClick(_link, key);
                        break;
                }
            } catch (e) {
                // statements
                _self._otherClick(_link, key);
            }
        },
        _otherClick: function(_link, key) {
            var _self = this;
            if (/baiduboxapp|whatsapp|sms|mailto|mqqapi|http/i.test(_link)) {
                if(/baiduboxapp|whatsapp|sms|mailto|mqqapi/i.test(_link)){
                    _open(_link+ "&tomi=scheme", function() {});
                }else{
                    _open(_link, function() {});
                }
            } else if (/copy/.test(key)) {
                alert("复制成功")
            } else if (/cweixin|fweixin|alipay|qr/i.test(key)) {
                if(_OSAPI.wx){
                    _EleDom.add(_self.mark, "share-mask-show");
                }else if(_OSAPI.qq){
                    if(/cweixin|fweixin/i.test(key)){
                        _EleDom.add(_self.mark, "share-mask-show");
                    }else{
                        _EleDom.add(_self.qr, "share-mask-show");
                    }
                }else{
                    _EleDom.add(_self.qr, "share-mask-show");
                }
            } else {
            }
        },
        /**
         * Create the wechat icon and QRCode.
         *
         * @param {Object} data
         */
        createWechat: function() {
            var _self = this,
                _conf = _self.config,
                _ele = _self.eles;
            var elems = _self._createStr('<div class="wechat-qrcode"><h4>' + _conf.codeTitle + '</h4><div class="qrcode"><img class="code_qr"/></div><div class="help">' + _conf.codeHelper + '</div></div>');
            var qrcode = _self._getEleClass(elems[0], 'code_qr', 'img');
            try {
                new QRious({
                    element: qrcode[0],
                    size: _conf.codeSize,
                    level: "Q",
                    value: _conf.link
                });
            } catch (e) {
                _open(_self._path("lib/qrious/qrious.min.js") + "?tomi=js", function() {
                    new QRious({
                        element: qrcode[0],
                        size: _conf.codeSize,
                        level: "Q",
                        value: _conf.link
                    });
                });
            }
            return elems[0];
        },
        _logic: function() {
            var _self = this,
                _conf = _self.config,
                _shareDom = '',
                _uname = _self._uu_name,
                _lang = _conf.lang;
            var mm_mimi = {},
                mm_tool = {};
            var langCom = _conf.default;
            for (var i in _uname) {
                for (var a in langCom) {
                    mm_mimi[langCom[a]] = (_uname[langCom[a]])
                }
            }
            return mm_mimi;
            mm_mimi = null, mm_tool = null;
        },
        /**
         * Build the url of icon.
         *
         * @param {String} name
         * @param {Object} data
         *
         * @returns {String}
         */
        _makeUrl: function(_name, mpp) {
            var _self = this,
                _conf = _self.config,
                _curl = _self._uu_name;
            var aaap = null;
            if (mpp) {
                aaap = _curl[_name]["mqq"].replace(/\{\{(\w)(\w*)\}\}/g, function(m, fix, key) {
                    var nameKey = _name + fix + key.toLowerCase();
                    key = (fix + key).toLowerCase();
                    return _base64.e((_conf[nameKey] === undefined ? _conf[key] : _conf[nameKey]) || '');
                });
            } else {
                var linkk = _curl[_name]["link"];
                if (linkk) {
                    if ("baidu" == linkk) {} else if ("bdbox" == linkk) {
                        aaap = _curl[_name]["iframe"].replace(/\{\{(\w)(\w*)\}\}/g, function(m, fix, key) {
                            var nameKey = _name + fix + key.toLowerCase();
                            key = (fix + key).toLowerCase();
                            return encodeURIComponent((_conf[nameKey] === undefined ? _conf[key] : _conf[nameKey]) || '');
                        });
                    } else if (/code|copy|pint/i.test(linkk)) {

                    } else {
                        aaap = _curl[_name]["link"].replace(/\{\{(\w)(\w*)\}\}/g, function(m, fix, key) {
                            var nameKey = _name + fix + key.toLowerCase();
                            key = (fix + key).toLowerCase();
                            return encodeURIComponent((_conf[nameKey] === undefined ? _conf[key] : _conf[nameKey]) || '');
                        });
                    }
                }
            }
            return aaap;
        },
        _mobileApi: function() {
            var _self = this,
                _conf = _self.config;
            if (_OSAPI.qqb) {
                var _b = (_OSAPI.ver.qqb < 5.4) ? qqJsSrc.lower : qqJsSrc.higher;
                _open(_b + "&tomi=js", function() { _self._nnn = 111; });
            } else if (_OSAPI.wx) {
                _self._wxShre();
            } else if (_OSAPI.ali) {
                //_self._aliShre();
            } else if (_OSAPI.qq) {
                console.log(_self._getMeta("description"));
            }
        },
        _isUap: function() {
            var _self = this,
                _data = _URL.toJson(window.location.href);
            if (_data["uap"]) {
                return true;
            } else {
                return false;
            }
            return false;
        },
        _wxShre: function() {
            var _self = this,
                _conf = _self.config;
            var shareData = {
                title: _conf.title,
                desc: _conf.vdesc,
                link: _conf.link,
                imgUrl: _conf.image
            };
            _open("//res.wx.qq.com/open/js/jweixin-1.0.0.js#tomi=js", function(data) {
                $.ajax({
                    type: 'get',
                    url: getpath() + "/weChatPay/share.do",
                    async: false,
                    data: {
                        url: window.location.href
                    },
                    dataType: 'json',
                    success: function(json) {
                        wx.config({
                            appId: json.obj.appid,
                            timestamp: json.obj.timestamp,
                            nonceStr: json.obj.nonceStr,
                            signature: json.obj.signature,
                            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function() {
                            wx.checkJsApi({
                                jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                            });
                            wx.onMenuShareQQ(shareData);
                            wx.onMenuShareWeibo(shareData);
                            wx.onMenuShareQZone(shareData);
                            wx.onMenuShareAppMessage(shareData);
                            wx.onMenuShareTimeline(shareData);
                        });
                        wx.error(function(res) {});
                    }
                })
            })
        },
        _sshre: function(s, t) {
            function delQueStr(url, ref) { /*删除参数值*/
                var str = "";

                if (url.indexOf('?') != -1)
                    str = url.substr(url.indexOf('?') + 1);
                else
                    return url;
                var arr = "";
                var returnurl = "";
                var setparam = "";
                if (str.indexOf('&') != -1) {
                    arr = str.split('&');
                    for (i in arr) {
                        if (arr[i].split('=')[0] != ref) {
                            returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                        }
                    }
                    return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
                } else {
                    arr = str.split('=');
                    if (arr[0] == ref)
                        return url.substr(0, url.indexOf('?'));
                    else
                        return url;
                }
            }
            function _elec(cxp, cp, s0, s, t, cps) {
                var ios = _OSAPI.form == "ios";
                var azd = _OSAPI.form == "android";
                if (ios && !azd) {
                    cxp = "¿";
                } else if (!ios && azd) {
                    cxp = String(':=');
                }
                var shar = "";
                if (cp) {
                    if (s0) {
                        shar = "cmd" + cxp + t.cmd + cps + "title" + cxp + t.title + cps + "ico" + cxp + t.img + cps + "con" + cxp + t.desc + cps + "ln" + cxp + t.url;
                    }
                }
                shar = s + "=" + encodeURIComponent(shar);
                if (ios && !azd) {
                    window.location.href = shar;
                } else if (!ios && azd) {
                    window.location.href = "/midx.do?" + shar;
                } else {
                    window.location.href = shar;
                }
            };
            var cps = String('`');
            var cxp = "";
            var aprr = ["share", "weixin", "fweixin", "cweixin", "weibo"];
            var s0 = aprr.indexOf(t.cmd) >= 0;
            var ws = (t.cmd).indexOf("sms") >= 0;
            var cp = s.indexOf("callapp") >= 0;
            var curl = t.url;
            curl = delQueStr(curl, "uap");
            curl = delQueStr(curl, "fm");
            t.url = curl;
            _elec(cxp, cp, s0, s, t, cps);
        },
        _getPath: function(file_path) {
            try {
                if (file_path.lastIndexOf("/") > -1) {
                    var aaa = file_path.substring(0, file_path.lastIndexOf("/", file_path.lastIndexOf("/") - 1))
                    return aaa + "/";
                } else {
                    return "";
                }
            } catch (e) {
                // statements
                return "";
            }
            return "";
        },
        getIndex: function(url) {
            var temp = url.match(/[^\/]+(\/)+[^\/]+\//g);
            return temp ? Math.max(0, temp[0].length - 1) : -1;
        },
        _getMeta: function(name) {
             return (document.getElementsByName(name)[0] || 0).content;
        },
        /**
         * Create element by string.
         *
         * @param {String} str
         *
         * @returns {NodeList}
         */
        _createStr: function(str) {
            var div = document.createElement('div');
            div.innerHTML = str;
            return div.childNodes;
        },
         _newHTML: function(str) {
            var div = document.createElement('div');
            div.appendChild(str);
            return div.innerHTML;
        },
        /**
         * Get elements By className for IE8-
         *
         * @param {Element} elem element
         * @param {String} name className
         * @param {String} tag tagName
         *
         * @returns {HTMLCollection|Array}
         */
        _getEleClass: function(elem, name, tag) {
            var _self = this;
            if (elem.getElementsByClassName) {
                return elem.getElementsByClassName(name);
            }
            if (tag) {
                var elements = [];
                var elems = elem.getElementsByTagName(tag || '*');
                name = ' ' + name + ' ';
                _self.each(elems, function(elem) {
                    if ((' ' + (elem.className || '') + ' ').indexOf(name) >= 0) {
                        elements.push(elem);
                    }
                });
                return elements;
            }
        },
        _uu_name: {'weibo':{name:"新浪微博",link:'http://v.t.sina.com.cn/share/share.php?url={{link}}&title={{title}}\r\n{{vdesc}}&searchPic=true&pic={{image}}'},'fweixin':{name:"微信好友",link:"code"},'cweixin':{name:"朋友圈",link:"code"},'qq':{name:"QQ好友",mqq:"mqqapi://share/to_fri?src_type=web&version=1&file_type=news&share_id=1101685683&url={{link}}&title={{title}}&description={{vdesc}}&previewimageUrl={{image}}&image_url={{image}}",link:'http://connect.qq.com/widget/shareqq/index.html?url={{link}}&title={{title}}&desc={{vdesc}}&pics={{image}}'},'qzone':{name:"QQ空间",mqq:_OSAPI.ios?"mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&share_id:'1101685683'&url={{link}}&title={{title}}&description={{vdesc}}&previewimageUrl={{image}}&image_url={{image}}":"mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1&share_id=1101685683&url={{link}}&title={{title}}&description={{vdesc}}&previewimageUrl={{image}}&image_url={{image}}",link:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{link}}&title={{title}}&summary={{vdesc}}&pics={{image}}'},'baidu':{name:"百度",link:'http://tieba.baidu.com/f/commit/share/openShareApi?title={{title}}&url={{link}}&pic={{image}}'},'kaixin':{name:"开心网",link:'http://www.kaixin001.com/rest/records.php?url={{link}}&content={{title}}\r\n{{vdesc}}&pic={{image}}&showcount=0&aid=矿业圈'},'yixin':{name:"易信",link:'http://open.yixin.im/share?type=webpage&title={{title}}&desc={{vdesc}}&pic={{image}}&url={{link}}&appkey=yx42bda5f65bba4a3fa06b1d60765c0b03'},'mingdao':{name:"明道",link:'https://mdshare.mingdao.com/share?url={{link}}&title={{title}}&pic={{image}}'},'alipay':{name:"支付宝",link:"code"},'douban':{name:"豆瓣",link:'http://widget.renren.com/dialog/share?resourceUrl={{link}}&title={{title}}&images={{image}}&description={{vdesc}}'},'facebook':{name:"facebook",link:'https://www.facebook.com/dialog/feed?app_id=1863483653863903&link={{url}}&name={{title}}&description={{desc}}&picture={{img}}'},'twitter':{name:"twitter",link:'https://twitter.com/intent/tweet?text=【{{title}}】{{vdesc}}&url={{url}}&via=MiningCircle'},'google':{name:"google",link:'https://plus.google.com/share?url={{link}}'},'whatsapp':{name:"whatsapp",link:'whatsapp://send?text={{link}}',hide:true},'pinterest':{name:"pinterest",link:'https://pinterest.com/pin/create/bookmarklet/?&url={{link}}&description={{title}}'},'stumbleupon':{name:"stumbleupon",link:'http://www.stumbleupon.com/submit?url={{link}}'},'linkedin':{name:"linkedin",link:'http://www.linkedin.com/shareArticle?mini=true&ro=true&token=&isFramed=false&lang=en_US&title={{title}}&url={{url}}&summary={{desc}}&source={{title}}'},/*'Instagram':{cn:"Instagram",en:"Instagram",link:'http://www.stumbleupon.com/submit?url={{link}}'},'line':{cn:"领英",en:"line",link:'https://www.linkedin.com/shareArticle?mini=true&url={{link}}'},*/'email':{name:"email",link:'mailto:?subject={{title}}&body={{title}}<br>{{vdesc}}<br>%3Cimg%20width%3D%22300%22%20src%3D%22{{image}}%22%2F%3E',hide:true},'pint':{name:"打印",link:"pint"},'copy':{name:"复制",link:"copy"},'sms':{name:"发短信",link:'sms:18710202534?body={{title}{{link}}',hide:true},'qr':{name:"二维码",link:"code"},'bdboxapp':{name:"百度分享",link:"baiduboxapp://{{callApp}}?&imageUrl=''&mediaType=all&title={{title}}&=content{{vdesc}}&linkUrl={{link}}&iconUrl={{image}}",hide:true}}
    };
    $.fn.share = $.prototype.share = function(options) {
        if (this.length > 1) {
            this.each(function(index, el) {
                var share = new ShareTip(el, options);
                return share.init();
            });
        } else {
            var share = new ShareTip(this[0], options);
            return share.init();
        }
    };
})(window);
/**
 * Cooked with Flambe
 * https://github.com/aduros/flambe
 */
'use strict';
(function() {
    var R, f, Y, i, h, g, o, W, l, Z, N, x, O, $, I, P, T, J, z, ca, C, L, m, c, F, k, G, v, s, D, d, U, t, B;

    function r(a, b) {
        function e() {}
        e.prototype = a;
        var c = new e,
            y;
        for (y in b) c[y] = b[y];
        return c
    }

    function ba(a) {
        return a instanceof Array ? function() {
            return w.iter(a)
        } : "function" == typeof a.iterator ? u(a, a.iterator) : a.iterator
    }

    function u(a, b) {
        var e = function() {
            return e.method.apply(e.scope, arguments)
        };
        e.scope = a;
        e.method = b;
        return e
    }
    var j = {},
        n = function() {
            return J.__string_rec(this, "")
        },
        S = function(a, b) {
            b = b.split("u").join("");
            this.r = RegExp(a, b)
        };
    j.EReg = S;
    S.__name__ = ["EReg"];
    S.prototype = {
        matchedPos: function() {
            if (null == this.r.m) throw "No string matched";
            return {
                pos: this.r.m.index,
                len: this.r.m[0].length
            }
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) a = this.r.m[a];
            else throw "EReg::matched";
            return a
        },
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        __class__: S
    };
    var E = function() {
        this.h = {}
    };
    j.Hash = E;
    E.__name__ = ["Hash"];
    E.prototype = {
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    return this.ref["$" + this.it.next()]
                }
            }
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b.substr(1));
            return w.iter(a)
        },
        remove: function(a) {
            a = "$" + a;
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        exists: function(a) {
            return this.h.hasOwnProperty("$" + a)
        },
        get: function(a) {
            return this.h["$" + a]
        },
        set: function(a, b) {
            this.h["$" + a] = b
        },
        __class__: E
    };
    var w = function() {};
    j.HxOverrides = w;
    w.__name__ = ["HxOverrides"];
    w.dateStr = function(a) {
        var b = a.getMonth() + 1,
            e = a.getDate(),
            c = a.getHours(),
            y = a.getMinutes(),
            d = a.getSeconds();
        return a.getFullYear() + "-" + (10 > b ? "0" + b : "" + b) + "-" + (10 > e ? "0" + e : "" + e) + " " + (10 > c ? "0" + c : "" + c) + ":" + (10 > y ? "0" + y : "" + y) + ":" + (10 > d ? "0" + d : "" + d)
    };
    w.strDate = function(a) {
        switch (a.length) {
            case 8:
                var a = a.split(":"),
                    b = new Date;
                b.setTime(0);
                b.setUTCHours(a[0]);
                b.setUTCMinutes(a[1]);
                b.setUTCSeconds(a[2]);
                return b;
            case 10:
                return a = a.split("-"), new Date(a[0], a[1] - 1, a[2], 0, 0, 0);
            case 19:
                return a = a.split(" "),
                    b = a[0].split("-"), a = a[1].split(":"), new Date(b[0], b[1] - 1, b[2], a[0], a[1], a[2]);
            default:
                throw "Invalid date format : " + a;
        }
    };
    w.cca = function(a, b) {
        var e = a.charCodeAt(b);
        return e != e ? void 0 : e
    };
    w.substr = function(a, b, e) {
        if (null != b && 0 != b && null != e && 0 > e) return "";
        null == e && (e = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > e && (e = a.length + e - b);
        return a.substr(b, e)
    };
    w.remove = function(a, b) {
        for (var e = 0, c = a.length; e < c;) {
            if (a[e] == b) return a.splice(e, 1), !0;
            e++
        }
        return !1
    };
    w.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur <
                    this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var Q = function() {
        this.h = {}
    };
    j.IntHash = Q;
    Q.__name__ = ["IntHash"];
    Q.prototype = {
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
            return w.iter(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        get: function(a) {
            return this.h[a]
        },
        set: function(a, b) {
            this.h[a] = b
        },
        __class__: Q
    };
    var X = function() {};
    j.Lambda = X;
    X.__name__ = ["Lambda"];
    X.array = function(a) {
        for (var b = [], a = ba(a)(); a.hasNext();) {
            var e = a.next();
            b.push(e)
        }
        return b
    };
    X.has = function(a, b, e) {
        if (null == e)
            for (e = ba(a)(); e.hasNext();) {
                if (a = e.next(), a == b) return !0
            } else
                for (var c = ba(a)(); c.hasNext();)
                    if (a = c.next(), e(a, b)) return !0;
        return !1
    };
    X.count = function(a, b) {
        var e = 0;
        if (null == b)
            for (var c = ba(a)(); c.hasNext();) c.next(), e++;
        else
            for (c = ba(a)(); c.hasNext();) {
                var y = c.next();
                b(y) && e++
            }
        return e
    };
    var aa = function() {
        this.length = 0
    };
    j.List = aa;
    aa.__name__ = ["List"];
    aa.prototype = {
        iterator: function() {
            return {
                h: this.h,
                hasNext: function() {
                    return null != this.h
                },
                next: function() {
                    if (null == this.h) return null;
                    var a = this.h[0];
                    this.h = this.h[1];
                    return a
                }
            }
        },
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        __class__: aa
    };
    var M = function() {};
    j.Reflect = M;
    M.__name__ = ["Reflect"];
    M.field = function(a, b) {
        var e = null;
        try {
            e = a[b]
        } catch (c) {}
        return e
    };
    M.fields = function(a) {
        var b = [];
        if (null != a) {
            var e = Object.prototype.hasOwnProperty,
                c;
            for (c in a) e.call(a, c) && b.push(c)
        }
        return b
    };
    M.isFunction = function(a) {
        return "function" ==
            typeof a && !(a.__name__ || a.__ename__)
    };
    M.compareMethods = function(a, b) {
        return a == b ? !0 : !M.isFunction(a) || !M.isFunction(b) ? !1 : a.scope == b.scope && a.method == b.method && null != a.method
    };
    var p = function() {};
    j.Std = p;
    p.__name__ = ["Std"];
    p.string = function(a) {
        return J.__string_rec(a, "")
    };
    p.parseInt = function(a) {
        var b = parseInt(a, 10);
        if (0 == b && (120 == w.cca(a, 1) || 88 == w.cca(a, 1))) b = parseInt(a);
        return isNaN(b) ? null : b
    };
    p.parseFloat = function(a) {
        return parseFloat(a)
    };
    p.random = function(a) {
        return Math.floor(Math.random() * a)
    };
    var V = function() {
        this.b = ""
    };
    j.StringBuf = V;
    V.__name__ = ["StringBuf"];
    V.prototype = {
        __class__: V
    };
    var K = function() {};
    j.StringTools = K;
    K.__name__ = ["StringTools"];
    K.urlEncode = function(a) {
        return encodeURIComponent(a)
    };
    K.urlDecode = function(a) {
        return decodeURIComponent(a.split("+").join(" "))
    };
    K.startsWith = function(a, b) {
        return a.length >= b.length && w.substr(a, 0, b.length) == b
    };
    K.isSpace = function(a, b) {
        var e = w.cca(a, b);
        return 9 <= e && 13 >= e || 32 == e
    };
    K.ltrim = function(a) {
        for (var b = a.length, e = 0; e < b && K.isSpace(a, e);) e++;
        return 0 < e ? w.substr(a, e, b - e) : a
    };
    K.rtrim = function(a) {
        for (var b = a.length, e = 0; e < b && K.isSpace(a, b - e - 1);) e++;
        return 0 < e ? w.substr(a, 0, b - e) : a
    };
    K.trim = function(a) {
        return K.ltrim(K.rtrim(a))
    };
    var A = j.ValueType = {
        __ename__: ["ValueType"],
        __constructs__: "TNull,TInt,TFloat,TBool,TObject,TFunction,TClass,TEnum,TUnknown".split(",")
    };
    A.TNull = ["TNull", 0];
    A.TNull.toString = n;
    A.TNull.__enum__ = A;
    A.TInt = ["TInt", 1];
    A.TInt.toString = n;
    A.TInt.__enum__ = A;
    A.TFloat = ["TFloat", 2];
    A.TFloat.toString = n;
    A.TFloat.__enum__ = A;
    A.TBool = ["TBool", 3];
    A.TBool.toString = n;
    A.TBool.__enum__ = A;
    A.TObject = ["TObject", 4];
    A.TObject.toString = n;
    A.TObject.__enum__ = A;
    A.TFunction = ["TFunction", 5];
    A.TFunction.toString = n;
    A.TFunction.__enum__ = A;
    A.TClass = function(a) {
        a = ["TClass", 6, a];
        a.__enum__ = A;
        a.toString = n;
        return a
    };
    A.TEnum = function(a) {
        a = ["TEnum", 7, a];
        a.__enum__ = A;
        a.toString = n;
        return a
    };
    A.TUnknown = ["TUnknown", 8];
    A.TUnknown.toString = n;
    A.TUnknown.__enum__ = A;
    var H = function() {};
    j.Type = H;
    H.__name__ = ["Type"];
    H.getClassName = function(a) {
        return a.__name__.join(".")
    };
    H.getEnumName = function(a) {
        return a.__ename__.join(".")
    };
    H.resolveClass = function(a) {
        a = j[a];
        return null == a || !a.__name__ ? null : a
    };
    H.resolveEnum = function(a) {
        a = j[a];
        return null == a || !a.__ename__ ? null : a
    };
    H.createInstance = function(a, b) {
        switch (b.length) {
            case 0:
                return new a;
            case 1:
                return new a(b[0]);
            case 2:
                return new a(b[0], b[1]);
            case 3:
                return new a(b[0], b[1], b[2]);
            case 4:
                return new a(b[0], b[1], b[2], b[3]);
            case 5:
                return new a(b[0], b[1], b[2], b[3], b[4]);
            case 6:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5]);
            case 7:
                return new a(b[0],
                    b[1], b[2], b[3], b[4], b[5], b[6]);
            case 8:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
            default:
                throw "Too many arguments";
        }
    };
    H.createEmptyInstance = function(a) {
        function b() {}
        b.prototype = a.prototype;
        return new b
    };
    H.createEnum = function(a, b, e) {
        var c = M.field(a, b);
        if (null == c) throw "No such constructor " + b;
        if (M.isFunction(c)) {
            if (null == e) throw "Constructor " + b + " need parameters";
            return c.apply(a, e)
        }
        if (null != e && 0 != e.length) throw "Constructor " + b + " does not need parameters";
        return c
    };
    H.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    H["typeof"] = function(a) {
        switch (typeof a) {
            case "boolean":
                return A.TBool;
            case "string":
                return A.TClass(String);
            case "number":
                return Math.ceil(a) == a % 2147483648 ? A.TInt : A.TFloat;
            case "object":
                if (null == a) return A.TNull;
                var b = a.__enum__;
                if (null != b) return A.TEnum(b);
                a = a.__class__;
                return null != a ? A.TClass(a) : A.TObject;
            case "function":
                return a.__name__ || a.__ename__ ? A.TObject : A.TFunction;
            case "undefined":
                return A.TNull;
            default:
                return A.TUnknown
        }
    };
    var q = function() {};
    j.Xml = q;
    q.__name__ = ["Xml"];
    q.parse = function(a) {
        return x.Parser.parse(a)
    };
    q.createElement = function(a) {
        var b = new q;
        b.nodeType = q.Element;
        b._children = [];
        b._attributes = new E;
        b.setNodeName(a);
        return b
    };
    q.createPCData = function(a) {
        var b = new q;
        b.nodeType = q.PCData;
        b.setNodeValue(a);
        return b
    };
    q.createCData = function(a) {
        var b = new q;
        b.nodeType = q.CData;
        b.setNodeValue(a);
        return b
    };
    q.createComment = function(a) {
        var b = new q;
        b.nodeType = q.Comment;
        b.setNodeValue(a);
        return b
    };
    q.createDocType = function(a) {
        var b = new q;
        b.nodeType = q.DocType;
        b.setNodeValue(a);
        return b
    };
    q.createProlog = function(a) {
        var b =
            new q;
        b.nodeType = q.Prolog;
        b.setNodeValue(a);
        return b
    };
    q.createDocument = function() {
        var a = new q;
        a.nodeType = q.Document;
        a._children = [];
        return a
    };
    q.prototype = {
        toString: function() {
            if (this.nodeType == q.PCData) return this._nodeValue;
            if (this.nodeType == q.CData) return "<![CDATA[" + this._nodeValue + "]]\>";
            if (this.nodeType == q.Comment) return "<\!--" + this._nodeValue + "--\>";
            if (this.nodeType == q.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
            if (this.nodeType == q.Prolog) return "<?" + this._nodeValue + "?>";
            var a = new V;
            if (this.nodeType ==
                q.Element) {
                a.b += p.string("<");
                a.b += p.string(this._nodeName);
                for (var b = this._attributes.keys(); b.hasNext();) {
                    var e = b.next();
                    a.b += p.string(" ");
                    a.b += p.string(e);
                    a.b += p.string('="');
                    a.b += p.string(this._attributes.get(e));
                    a.b += p.string('"')
                }
                if (0 == this._children.length) return a.b += p.string("/>"), a.b;
                a.b += p.string(">")
            }
            for (b = this.iterator(); b.hasNext();) e = b.next(), a.b += p.string(e.toString());
            this.nodeType == q.Element && (a.b += p.string("</"), a.b += p.string(this._nodeName), a.b += p.string(">"));
            return a.b
        },
        addChild: function(a) {
            if (null ==
                this._children) throw "bad nodetype";
            null != a._parent && w.remove(a._parent._children, a);
            a._parent = this;
            this._children.push(a)
        },
        firstElement: function() {
            if (null == this._children) throw "bad nodetype";
            for (var a = 0, b = this._children.length; a < b;) {
                var e = this._children[a];
                if (e.nodeType == q.Element) return e;
                a++
            }
            return null
        },
        elementsNamed: function(a) {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var b = this.cur, e = this.x.length; b < e;) {
                        var c = this.x[b];
                        if (c.nodeType == q.Element &&
                            c._nodeName == a) break;
                        b++
                    }
                    this.cur = b;
                    return b < e
                },
                next: function() {
                    for (var b = this.cur, e = this.x.length; b < e;) {
                        var c = this.x[b];
                        b++;
                        if (c.nodeType == q.Element && c._nodeName == a) return this.cur = b, c
                    }
                    return null
                }
            }
        },
        elements: function() {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var a = this.cur, b = this.x.length; a < b && !(this.x[a].nodeType == q.Element);) a += 1;
                    this.cur = a;
                    return a < b
                },
                next: function() {
                    for (var a = this.cur, b = this.x.length; a < b;) {
                        var e = this.x[a],
                            a = a + 1;
                        if (e.nodeType ==
                            q.Element) return this.cur = a, e
                    }
                    return null
                }
            }
        },
        iterator: function() {
            if (null == this._children) throw "bad nodetype";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    return this.cur < this.x.length
                },
                next: function() {
                    return this.x[this.cur++]
                }
            }
        },
        exists: function(a) {
            if (this.nodeType != q.Element) throw "bad nodeType";
            return this._attributes.exists(a)
        },
        set: function(a, b) {
            if (this.nodeType != q.Element) throw "bad nodeType";
            this._attributes.set(a, b)
        },
        get: function(a) {
            if (this.nodeType != q.Element) throw "bad nodeType";
            return this._attributes.get(a)
        },
        getParent: function() {
            return this._parent
        },
        setNodeValue: function(a) {
            if (this.nodeType == q.Element || this.nodeType == q.Document) throw "bad nodeType";
            return this._nodeValue = a
        },
        getNodeValue: function() {
            if (this.nodeType == q.Element || this.nodeType == q.Document) throw "bad nodeType";
            return this._nodeValue
        },
        setNodeName: function(a) {
            if (this.nodeType != q.Element) throw "bad nodeType";
            return this._nodeName = a
        },
        getNodeName: function() {
            if (this.nodeType != q.Element) throw "bad nodeType";
            return this._nodeName
        },
        __class__: q
    };
    R = function() {};
    f = void 0;
    Y = void 0;
    i = void 0;
    h = void 0;
    j["com.nick.spongebob.weresquirrel.DocumentApp"] = R;
    R.__name__ = ["com", "nick", "spongebob", "weresquirrel", "DocumentApp"];
    R.main = function() {
        C.init();
        var a = eval("document");
        f.constants.ConstantsApp.baseUrl = R.trimUrl(a.getElementById("embedtarget").getAttribute("base"));
        g.WorkinCloud.instance.getDispatcher().addEventListener(g.WorkinCloud.instance.getAssets().EVENT_FILES_LOADED, R._onBootstrapLoad);
        g.WorkinCloud.instance.getAssets().addPackDef("bootstrap");
        g.WorkinCloud.instance.getAssets().loadPack("bootstrap",
            f.constants.ConstantsApp.baseUrl)
    };
    R._onBootstrapLoad = function() {
        g.WorkinCloud.instance.getDispatcher().removeEventListener(g.WorkinCloud.instance.getAssets().EVENT_FILES_LOADED, R._onBootstrapLoad);
        R._main = new Y
    };
    R.trimUrl = function(a) {
        if ("" == a) return "";
        if (0 > a.indexOf("http")) return "/" == a.charAt(0) && (a = w.substr(a, 1, a.length - 1)), a;
        var b = a.indexOf("http://");
        0 > b ? (b = a.indexOf("https://"), b = 0 > b ? 0 : b + 8) : b += 7;
        b = a.indexOf("/", b);
        a = w.substr(a, b, a.length - b);
        0 > a.indexOf("assets") && (a += "assets/");
        return a
    };
    Y =
        function() {
            g.WorkinCloud.instance.log("[Main] Constructed");
            this._timeline = C.root;
            C.uncaughtError.connect(u(this, this.errorHandler));
            g.WorkinCloud.instance.getInput().prime();
            this._layerWorld = new L;
            this._layerUI = new L;
            this._scaleSprite = new m.Sprite;
            this._timeline.add(this._scaleSprite);
            this._timeline.addChild(this._layerWorld);
            this._timeline.addChild(this._layerUI);
            this._isListeningForLoading = this._isUIActive = this._isWorldActive = !1;
            this._document = {
                canvasScale: 1
            };
            this._document = eval("document");
            g.WorkinCloud.instance.setBool(f.constants.ConstantsApp.BOOL_MOUSE_PRESSED, !1);
            this._flowstack = [];
            this._addEventListeners();
            this._parseConfigXML();
            this._beginEngine()
        };
    j["com.nick.spongebob.weresquirrel.Main"] = Y;
    Y.__name__ = ["com", "nick", "spongebob", "weresquirrel", "Main"];
    Y.prototype = {
        _worldDestroy: function() {
            this._isWorldActive && (this._isWorldActive = !1, this._world.dispose(), this._world = null)
        },
        _generateWorld: function() {
            this._isWorldActive && this._worldDestroy();
            this._isWorldActive = !0;
            this._world = new i.World(this._layerWorld, this)
        },
        _onEventInput: function(a) {
            this._document &&
                this._document.canvasScale && (a.x /= this._document.canvasScale, a.y /= this._document.canvasScale);
            this._ui.handleInput(a) && this._isWorldActive && this._world.handleInput(a)
        },
        _generateUI: function() {
            this._isUIActive = !0;
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_LOADING, h.screens.ScreenGeneric, "ui/AssetScreenLoadLevel.png");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_SPLASH, h.screens.ScreenSplash, "ui/AssetScreenSplash.jpg");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD,
                h.screens.ScreenGameplayHUD, "ui/AssetScreenHUD.png");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU, h.screens.ScreenGameplayMenu, "ui/AssetScreenMenu.png");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_HELP, h.screens.ScreenHelp, "ui/AssetScreenHelp.png");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM, h.screens.ScreenQuitConfirm, "ui/AssetScreenQuitConfirm.png");
            this._ui.addScreen(f.constants.ConstantsScreen.SCREEN_END_GAME, h.screens.ScreenEndGame, "ui/AssetScreenEndGame.png")
        },
        _addEventListeners: function() {
            g.WorkinCloud.instance.getDispatcher().addEventListener(o.WMEventUpdate.EVENT_UPDATE, u(this, this._onEventUpdate));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_MUTE_TOGGLE, u(this, this._onMuteToggle));
            g.WorkinCloud.instance.getDispatcher().addEventListener(o.WMEventFlow.EVENT_FLOW, u(this, this._onFlowEvent));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_INPUT, u(this, this._onEventInput))
        },
        _runFlowStack: function() {
            if (0 != this._flowstack.length)
                for (; 0 < this._flowstack.length;) this._executeFlowStack(this._flowstack[0]), this._flowstack.shift()
        },
        _addFlowEvent: function(a) {
            this._flowstack.push(a)
        },
        _onFlowEvent: function(a) {
            this._addFlowEvent(a.flowId)
        },
        _onMuteToggle: function() {
            g.WorkinCloud.instance.setValue(f.constants.ConstantsApp.BOOL_MUTED, !g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_MUTED))
        },
        _onEventUpdate: function(a) {
            this._document.canvasScale && this._document.canvasScale !=
                this._scaleSprite.scaleX._value && this._scaleSprite.scaleX.set__(this._scaleSprite.scaleY.set__(this._document.canvasScale));
            this._isUIActive && this._ui.update(a.getDt());
            this._isWorldActive && (this._world.update(a.getDt()), this._world.render(a.getDt()));
            g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_GAME_LOSE) ? this._onFlowEvent(new o.WMEventFlow(f.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE)) : g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_GAME_WIN) ? this._onFlowEvent(new o.WMEventFlow(f.constants.ConstantsScreen.FLOW_BRANCH_GAME_WIN)) :
                g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_LEVEL_LOSE) ? this._onFlowEvent(new o.WMEventFlow(f.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE)) : g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_LEVEL_WIN) && this._onFlowEvent(new o.WMEventFlow(f.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN));
            this._runFlowStack()
        },
        _resetFlagsResults: function() {
            g.WorkinCloud.instance.resetValue(f.constants.ConstantsApp.BOOL_GAME_LOSE);
            g.WorkinCloud.instance.resetValue(f.constants.ConstantsApp.BOOL_GAME_WIN);
            g.WorkinCloud.instance.resetValue(f.constants.ConstantsApp.BOOL_LEVEL_LOSE);
            g.WorkinCloud.instance.resetValue(f.constants.ConstantsApp.BOOL_LEVEL_WIN)
        },
        _unpauseGameplay: function() {
            g.WorkinCloud.instance.setBool(f.constants.ConstantsApp.BOOL_PAUSED, !1)
        },
        _pauseGameplay: function() {
            g.WorkinCloud.instance.setBool(f.constants.ConstantsApp.BOOL_PAUSED, !0)
        },
        _onLevelRestart: function(a) {
            null == a && (a = !0);
            a && g.WorkinCloud.instance.modifyValue(f.constants.ConstantsApp.FLOAT_HEALTH, -1);
            this._resetFlagsResults()
        },
        _onGameNew: function() {
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_HEALTH, 3);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_SCORE, 0);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_LEVEL, 0);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_TIMER, 0);
            this._resetFlagsResults()
        },
        _gotoEndGame: function(a, b) {
            null == b && (b = !1);
            this._flagWonPreviousGame = a;
            b ? (this._onGameNew(), this._gotoAndPlayGame(!0)) : this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_END_GAME)
        },
        _gotoAndPlayGame: function(a) {
            null == a && (a = !1);
            this._isWorldActive && !a ? g.WorkinCloud.instance.log("[Main](_gotoAndPlayGame) World already exists. Using existing world instead of creating new one.") : this._generateWorld();
            this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD, !1);
            this._unpauseGameplay()
        },
        _executeFlowStack: function(a) {
            switch (a) {
                case f.constants.ConstantsScreen.FLOW_SPLASH_PLAY:
                    this._gotoAndPlayGame();
                    break;
                case f.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE:
                    this._pauseGameplay();
                    this._resetFlagsResults();
                    this._onLevelRestart(!0);
                    this._gotoAndPlayGame(!0);
                    break;
                case f.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE:
                    this._pauseGameplay();
                    this._resetFlagsResults();
                    this._gotoEndGame(this._flagWonPreviousGame, !0);
                    break;
                case f.constants.ConstantsScreen.FLOW_END_LEVEL_QUIT:
                    this._unpauseGameplay();
                    this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD);
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU:
                    this._pauseGameplay();
                    this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU);
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE:
                    this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD);
                    this._unpauseGameplay();
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP:
                    this._ui.openScreen(f.constants.ConstantsScreen.SCREEN_HELP, !1);
                    break;
                case f.constants.ConstantsScreen.FLOW_HELP_CLOSE:
                    this._ui.closeScreen(f.constants.ConstantsScreen.SCREEN_HELP);
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT:
                    this._ui.openScreen(f.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM, !1);
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES:
                    this._resetFlagsResults();
                    this._gotoEndGame(!1);
                    break;
                case f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO:
                    this._ui.closeScreen(f.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM);
                    break;
                case f.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE:
                    this._resetFlagsResults();
                    this._gotoEndGame(!1, !1);
                    break;
                case f.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN:
                    this._gotoEndGame(this._flagWonPreviousGame, !0)
            }
        },
        errorHandler: function(a) {
            g.WorkinCloud.instance.log("Error:" +
                a)
        },
        _registerInput: function() {
            g.WorkinCloud.instance.getInput().registerInput(f.constants.ConstantsApp.INPUT_SPACE, [c.Key.Space]);
            g.WorkinCloud.instance.getInput().registerInput(f.constants.ConstantsApp.INPUT_UP, [c.Key.Up, c.Key.W])
        },
        _eventInitialLoadComplete: function() {
            this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_SPLASH)
        },
        _parseConfigXML: function() {
            g.WorkinCloud.instance.log("[Main] Parse Config XML: " + f.constants.ConstantsApp.STRING_CONFIG_PATH);
            for (var a = q.parse(g.WorkinCloud.instance.getAssets().getFile(f.constants.ConstantsApp.STRING_CONFIG_PATH)),
                    a = new x.Fast(a.firstElement()), b = [], e = a.nodes.resolve("pack").iterator(); e.hasNext();) {
                for (var c = e.next(); 0 < b.length;) b.splice(0, 1);
                for (var y = c.nodes.resolve("flump").iterator(); y.hasNext();) {
                    var d = y.next();
                    b.push(d.att.resolve("id").toString())
                }
                g.WorkinCloud.instance.getAssets().addPackDef(c.att.resolve("id").toString(), b)
            }
            for (a = a.node.resolve("initial").nodes.resolve("pack").iterator(); a.hasNext();) b = a.next(), g.WorkinCloud.instance.getAssets().loadPack(b.att.resolve("id").toString());
            g.WorkinCloud.instance.getDispatcher().addEventListener(g.WorkinCloud.instance.getAssets().EVENT_FILES_LOADED,
                u(this, this._eventInitialLoadComplete))
        },
        _beginEngine: function() {
            g.WorkinCloud.instance.log("[Main](_beginEngine)");
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_CANVAS_SCALE, 1);
            g.WorkinCloud.instance.setDefault(f.constants.ConstantsApp.BOOL_PAUSED, 0);
            g.WorkinCloud.instance.setDefault(f.constants.ConstantsApp.BOOL_MUTED, 0);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_HEALTH, 3);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_LEVEL, 0);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_SCORE,
                0);
            g.WorkinCloud.instance.setFloat(f.constants.ConstantsApp.FLOAT_TIMER, 0);
            this._timeline.add(new W.Updater);
            this._registerInput();
            this._ui = new h.ScreenManager(this._layerUI);
            this._generateUI();
            this._ui.changeScreenTo(f.constants.ConstantsScreen.SCREEN_LOADING)
        },
        __class__: Y
    };
    f = {
        constants: {}
    };
    f.constants.ConstantsApp = function() {};
    j["com.nick.spongebob.weresquirrel.data.constants.ConstantsApp"] = f.constants.ConstantsApp;
    f.constants.ConstantsApp.__name__ = "com,nick,spongebob,weresquirrel,data,constants,ConstantsApp".split(",");
    f.constants.ConstantsGround = function() {};
    j["com.nick.spongebob.weresquirrel.data.constants.ConstantsGround"] = f.constants.ConstantsGround;
    f.constants.ConstantsGround.__name__ = "com,nick,spongebob,weresquirrel,data,constants,ConstantsGround".split(",");
    f.constants.ConstantsScreen = function() {};
    j["com.nick.spongebob.weresquirrel.data.constants.ConstantsScreen"] = f.constants.ConstantsScreen;
    f.constants.ConstantsScreen.__name__ = "com,nick,spongebob,weresquirrel,data,constants,ConstantsScreen".split(",");
    f.constants.ConstantsState =
        function() {};
    j["com.nick.spongebob.weresquirrel.data.constants.ConstantsState"] = f.constants.ConstantsState;
    f.constants.ConstantsState.__name__ = "com,nick,spongebob,weresquirrel,data,constants,ConstantsState".split(",");
    g = {};
    o = void 0;
    W = void 0;
    l = void 0;
    Z = void 0;
    N = void 0;
    g.WMEventDispatcher = function() {
        this._signals = new E
    };
    j["com.workinman.utils.WMEventDispatcher"] = g.WMEventDispatcher;
    g.WMEventDispatcher.__name__ = ["com", "workinman", "utils", "WMEventDispatcher"];
    g.WMEventDispatcher.prototype = {
        dispose: function() {
            for (var a =
                    this._signals.iterator(); a.hasNext();) a.next().dispose();
            this._signals = null
        },
        dispatchEvent: function(a) {
            this._signals.exists(a.getEventId()) && this._signals.get(a.getEventId()).dispatchEvent(a)
        },
        removeEventListener: function(a, b) {
            this._signals.exists(a) && (this._signals.get(a).removeEventListener(b), this._signals.get(a).isEmtpy() && (this._signals.get(a).dispose(), this._signals.remove(a)))
        },
        addEventListener: function(a, b) {
            this._signals.exists(a) || this._signals.set(a, new g._WMEventDispatcher.WMEventTracker);
            this._signals.get(a).addEventListener(b)
        },
        __class__: g.WMEventDispatcher
    };
    h = {
        ScreenManager: function(a) {
            g.WMEventDispatcher.call(this);
            this._container = a;
            this._layerScreen = new L;
            this._layerTransition = new L;
            this._container.addChild(this._layerScreen);
            this._container.addChild(this._layerTransition);
            this._isPaused = !1;
            this._screens = [];
            this._screensOpen = [];
            this._screensQueue = [];
            this._transitionType = -1;
            this._flagCloseAllScreensWhenBottomCloses = this._flagHasScreenshot = this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition =
                this._flagHasTransition = !1
        }
    };
    j["com.nick.spongebob.weresquirrel.ui.ScreenManager"] = h.ScreenManager;
    h.ScreenManager.__name__ = "com,nick,spongebob,weresquirrel,ui,ScreenManager".split(",");
    h.ScreenManager.__super__ = g.WMEventDispatcher;
    h.ScreenManager.prototype = r(g.WMEventDispatcher.prototype, {
        _transitionPlay: function() {
            this._transition.show();
            this._transition.start()
        },
        _removeTransition: function() {
            this._flagHasTransition && (this._layerTransition.removeChild(this._transition._getEntity()), this._transition._getDispatcher().removeEventListener(o.WMEventScreenOut.EVENT_SCREEN_OUTPUT,
                u(this, this._onEventTransitionOutput)), this._transition.dispose(), this._transition = null, this._flagHasTransition = !1)
        },
        _addTransition: function(a, b) {
            null == b && (b = !0);
            if (this._flagHasTransition) {
                if (!b) return;
                this._removeTransition()
            }
            this._transition = new h.transitions.TransitionBase(a);
            this._transition.hide();
            this._transition._getDispatcher().addEventListener(o.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this, this._onEventTransitionOutput));
            this._layerTransition.addChild(this._transition._getEntity());
            this._flagHasTransition = !0
        },
        _updateTransition: function(a) {
            switch (this._transitionType) {
                case f.constants.ConstantsScreen.TRANSITION_SCROLL:
                    var b = this._transitionScreenHeadedOut._getDisplay().x;
                    b.set__(b._value - 2E3 * a);
                    b = this._transitionScreenHeadedIn._getDisplay().x;
                    b.set__(b._value - 2E3 * a);
                    0 >= this._transitionScreenHeadedIn._getDisplay().x._value && (this._transitionScreenHeadedIn._getDisplay().x.set__(0), this._flagHasTransition = !1, this._onQueueConditionMet(f.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE));
                    break;
                case f.constants.ConstantsScreen.TRANSITION_FADE:
                    this._transition.update(a),
                        this._transition.flagDispose && this._removeTransition()
            }
        },
        _removeScreenDisplay: function(a) {
            this._layerScreen.removeChild(a)
        },
        _addScreenDisplay: function(a) {
            this._layerScreen.addChild(a)
        },
        _dispatchEventChange: function(a, b) {
            this.dispatchEvent(new o.WMEventInterfaceChange(a, b))
        },
        _onQueueConditionMet: function(a, b) {
            null == b && (b = "");
            for (var e = 0; e < this._screensQueue.length;) this._screensQueue[e].validateCondition(a, b) && (this._generateScreen(this._screensQueue[e].screenData), this._screensQueue.splice(e, 1)),
                e++
        },
        dispose: function() {
            for (var a = 0; a < this._screensOpen.length;) this._disposeScreen(this._screensOpen[a].id), a++;
            this._screens = this._screensQueue = null;
            this._removeTransition();
            this._container.removeChild(this._layerScreen);
            this._container.removeChild(this._layerTransition);
            this._layerTransition = this._layerScreen = null;
            g.WMEventDispatcher.prototype.dispose.call(this)
        },
        _getScreenData: function(a) {
            for (var b = this._screens.length - 1; 0 <= b;) {
                if (this._screens[b].id == a) return this._screens[b];
                b--
            }
            g.WorkinCloud.instance.log("[ScreenManager](_getScreenData) ERROR: Screen >" +
                a + "< idoes not exist. getScreenData() returning NULL.");
            return null
        },
        _hasScreenData: function(a) {
            for (var b = this._screens.length - 1; 0 <= b;) {
                if (this._screens[b].id == a) return !0;
                b--
            }
            return !1
        },
        _removeScreenshot: function() {
            this._flagHasScreenshot && (this._layerScreen.removeChild(this._screenshot._getEntity()), this._screenshot.dispose(), this._screenshot = null, this._flagHasScreenshot = !1)
        },
        _addScreenshot: function() {
            g.WorkinCloud.instance.log("[ScreenManager](_addScreenshot) ERROR: Screenshots not supported in HTML5 yet.")
        },
        _onEventTransitionOutput: function(a) {
            a.flowId == f.constants.ConstantsScreen.OUTPUT_OPENED ? (g.WorkinCloud.instance.log("[ScreenManager] Transition Midway..."), this._flagCloseScreenAfterTransition && (this.closeScreen(this._screenIdToCloseAfterTransition, !1), this._flagCloseScreenAfterTransition = !1), this._flagOpenScreenAfterTransition && (this.openScreen(this._screenIdToOpenDuringTransition, !1), this._flagOpenScreenAfterTransition = !1), this._removeScreenshot(), this._onQueueConditionMet(f.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY)) :
                a.flowId == f.constants.ConstantsScreen.OUTPUT_CLOSED && (g.WorkinCloud.instance.log("[ScreenManager] Transition Complete."), this._removeScreenshot(), this._onQueueConditionMet(f.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE))
        },
        _onEventScreenOutput: function(a) {
            a.flowId == f.constants.ConstantsScreen.OUTPUT_OPENED ? this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE, a.screenId) : a.flowId == f.constants.ConstantsScreen.OUTPUT_CLOSED && (this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_CLOSE_COMPLETE,
                a.screenId), this._onQueueConditionMet(f.constants.ConstantsScreen.CONDITION_CLOSED_SPECIFIC, a.screenId), this._flagHasTransition && this._transitionType == f.constants.ConstantsScreen.TRANSITION_STAGED && this._transitionPlay())
        },
        _disposeScreen: function(a) {
            for (var b = 0; b < this._screensOpen.length;) {
                if (this._screensOpen[b].id == a) {
                    this._screensOpen[b]._getDispatcher().removeEventListener(o.WMEventScreenOut.EVENT_SCREEN_OUTPUT, u(this, this._onEventScreenOutput));
                    this._screensOpen[b].dispose();
                    this._removeScreenDisplay(this._screensOpen[b]._getEntity());
                    this._screensOpen[b].disposeDisplay();
                    this._screensOpen.splice(b, 1);
                    break
                }
                b++
            }
        },
        _generateScreen: function(a) {
            if (this.isScreenOpen(a.id)) this.getScreen(a.id).reset(), this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_OPEN_BEGIN, a.id);
            else {
                g.WorkinCloud.instance.log("[ScreenManager](_generateScreen) com.nick.spongebob.weresquirrel.ui.screens." + p.string(a.screenClass) + " ~~ " + p.string(H.resolveClass("com.nick.spongebob.weresquirrel.ui.screens." + p.string(a.screenClass))));
                var b = H.createInstance(a.screenClass, [a.id, a.assetClassName, a.data]);
                g.WorkinCloud.instance.log("[ScreenManager](_generateScreen) success");
                if (null == b) g.WorkinCloud.instance.log("[ScreenManager](_generateScreen) ERROR: Screen Class for >" + a.id + "< not found.");
                else {
                    this._screensOpen.push(b);
                    this._addScreenDisplay(b._getEntity());
                    if (this._flagHasTransition) switch (this._transitionScreenHeadedIn = b, this._transitionType) {
                        case f.constants.ConstantsScreen.TRANSITION_SCROLL:
                            b._getDisplay().x.set__(f.constants.ConstantsApp.STAGE_WIDTH)
                    }
                    b._getDispatcher().addEventListener(o.WMEventScreenOut.EVENT_SCREEN_OUTPUT,
                        u(this, this._onEventScreenOutput));
                    b.open(!0);
                    this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_OPEN_BEGIN, a.id)
                }
            }
        },
        _addScreenToQueue: function(a, b, e) {
            null == e && (e = "");
            this.hasQueuedScreen(a.id) || this._screensQueue.push(new h.screens.data.ScreenQueueData(a, b, e))
        },
        removeAllQueuedScreens: function() {
            for (var a = this._screensQueue.length - 1; 0 <= a;) this._screensQueue.splice(a, 1), a--
        },
        removeQueuedScreen: function(a) {
            for (var b = this._screensQueue.length - 1; 0 <= b;) {
                if (this._screensQueue[b].screenData.id ==
                    a) {
                    this._screensQueue.splice(b, 1);
                    break
                }
                b--
            }
        },
        hasQueuedScreen: function(a) {
            for (var b = this._screensQueue.length - 1; 0 <= b;) {
                if (this._screensQueue[b].screenData.id == a) return !0;
                b--
            }
            return !1
        },
        isScreenOpen: function(a) {
            for (var b = this._screensOpen.length - 1; 0 <= b;) {
                if (this._screensOpen[b].id == a) return !0;
                b--
            }
            return !1
        },
        getScreen: function(a) {
            null == a && (a = "");
            if (0 == this._screensOpen.length) return g.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: no screens are open. Unable to getScreen()"), null;
            if ("" ==
                a) return this._screensOpen[this._screensOpen.length - 1];
            for (var b = this._screensOpen.length - 1; 0 <= b;) {
                if (this._screensOpen[b].id == a) return this._screensOpen[b];
                b--
            }
            g.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: Screen >" + a + "< is not open or does not exist. getScreen() returning NULL.");
            return null
        },
        update: function(a) {
            if (!this._isPaused) {
                0.15 < a && (a = 0.15);
                this._flagHasTransition && this._updateTransition(a);
                for (this._loop = this._screensOpen.length - 1; 0 <= this._loop;) this._screensOpen[this._loop].update(a),
                    this._screensOpen[this._loop].flagDispose && (this._disposeScreen(this._screensOpen[this._loop].id), 0 == this._screensOpen.length && this._onQueueConditionMet(f.constants.ConstantsScreen.CONDITION_CLOSED_ALL)), this._loop--
            }
        },
        changeScreenTo: function(a, b, e, c) {
            null == c && (c = "");
            null == e && (e = -1);
            null == b && (b = !1);
            g.WorkinCloud.instance.log("[ScreenManager](changeTo) " + a);
            this.removeAllQueuedScreens();
            if (this.isScreenOpen(a)) {
                g.WorkinCloud.instance.log("[ScreenManager](changeTo) Screen is already open.");
                for (b = this._screensOpen.length -
                    1; 0 <= b;) this._screensOpen[b].id != a && this.closeScreen(this._screensOpen[b].id, !1, b), b--;
                this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_OPEN_BEGIN, a);
                this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE, a)
            } else if (this._flagOpenScreenAfterTransition = this._flagCloseScreenAfterTransition = !1, 0 < this._screensOpen.length) {
                g.WorkinCloud.instance.log("[ScreenManager](changeFrom) " + this._screensOpen[0].id);
                var y = f.constants.ConstantsScreen.CONDITION_CLOSED_ALL;
                if (-1 < e) switch (this._transitionType =
                    e, this._transitionType) {
                    case f.constants.ConstantsScreen.TRANSITION_SCREENSHOT:
                        this._flagOpenScreenAfterTransition = !0;
                        b = !1;
                        this._addScreenshot();
                        this._transitionPlay();
                        break;
                    case f.constants.ConstantsScreen.TRANSITION_SCROLL:
                        this._flagHasTransition = !0;
                        this._flagOpenScreenAfterTransition = !1;
                        this._flagCloseScreenAfterTransition = !0;
                        b = !1;
                        this._transitionScreenHeadedOut = this._screensOpen[0];
                        y = f.constants.ConstantsScreen.CONDITION_IMMEDIATE;
                        break;
                    case f.constants.ConstantsScreen.TRANSITION_FADE:
                        this._addTransition(c,
                            this._flagHasTransition ? this._transition._getIsOutro() ? !0 : !1 : !1), this._flagCloseScreenAfterTransition = !0, b = !1, this._transitionPlay(), y = f.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY
                }
                if (0 < this._screensOpen.length && (this._flagCloseScreenAfterTransition ? this._screenIdToCloseAfterTransition = this._screensOpen[0].id : this.closeScreen(this._screensOpen[0].id, b, 0), 1 < this._screensOpen.length))
                    for (b = 1; b < this._screensOpen.length;) this.closeScreen(this._screensOpen[b].id, !1, this._screensOpen.length),
                        b++;
                this._flagOpenScreenAfterTransition ? (g.WorkinCloud.instance.log("[ScreenManager] Store Screen to open at transition midway: " + a), this._screenIdToOpenDuringTransition = a) : this.openScreen(a, !0, y)
            } else this.openScreen(a, !1)
        },
        _moveScreenToTop: function(a) {
            var b = this.getScreen(a);
            if (null == b) g.WorkinCloud.instance.log("[ScreenManager](_moveScreenToTop) ERROR: Screen >" + a + "< is not open or does not exist. Cancelling move.");
            else {
                b.isClosing() && b.open(!1);
                for (var e = this._screensOpen.length - 1; 0 <= e && !(this._screensOpen[e].id ==
                        a);) e--;
                this._screensOpen.splice(e, 1);
                b.reset();
                this._removeScreenDisplay(b._getEntity());
                this._addScreenDisplay(b._getEntity());
                this._screensOpen.push(b)
            }
        },
        openScreen: function(a, b, e, c) {
            null == c && (c = "");
            null == e && (e = 0);
            null == b && (b = !0);
            g.WorkinCloud.instance.log("[ScreenManager](openScreen) " + a);
            if (this._hasScreenData(a))
                if (this.isScreenOpen(a)) this._moveScreenToTop(a);
                else {
                    if (e != f.constants.ConstantsScreen.CONDITION_IMMEDIATE && b) {
                        if (0 < this._screensOpen.length) {
                            this._addScreenToQueue(this._getScreenData(a),
                                e, c);
                            return
                        }
                        if ((e == f.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE || e == f.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY) && this._flagHasTransition) {
                            this._addScreenToQueue(this._getScreenData(a), e, c);
                            return
                        }
                    }
                    this._generateScreen(this._getScreenData(a))
                }
            else g.WorkinCloud.instance.log("[ScreenManager](closeScreen) ERROR: Screen >" + a + "< does not exist. Cancelling open().")
        },
        closeScreen: function(a, b, e) {
            null == e && (e = -1);
            null == b && (b = !0);
            null == a && (a = "");
            if (0 == this._screensOpen.length) this.removeQueuedScreen(a);
            else {
                if ("" == a) e = this._screensOpen[this._screensOpen.length - 1];
                else if (0 <= e && e < this._screensOpen.length) e = this._screensOpen[e];
                else if (e = this.getScreen(a), null == e) {
                    this.removeQueuedScreen(a);
                    return
                }
                e.close(b);
                this._dispatchEventChange(f.constants.ConstantsScreen.CHANGE_CLOSE_BEGIN, a)
            }
        },
        handleInput: function(a) {
            for (var b = !0, e = this._screensOpen.length - 1; 0 <= e;) this._screensOpen[e].handleInput(a) || (b = !1), e--;
            return b
        },
        addScreen: function(a, b, e, c, y) {
            null == c && (c = 0);
            null == e && (e = "");
            this._screens.push(new h.screens.data.ScreenData(a,
                b, e, c, y))
        },
        __class__: h.ScreenManager
    });
    h.UserInterfaceElement = function(a, b, e, c, y) {
        null == c && (c = "");
        this.sorted = !1;
        this._dispatcher = new g.WMEventDispatcher;
        this._entity = new L;
        this._tweens = [];
        this._position = new l.WorkinPoint(a, b);
        this._layer = e;
        this._flagChangePosition = !1;
        !0 == this._flagBitmapAdded ? (this._assetBase = c, this._flagHasAssetBase = "" == this._assetBase) : (this._flagBitmapAdded = !1, this._bitmapAssetCurrent = "", this._assetBase = c, "" == this._assetBase ? this._flagHasAssetBase = !1 : (this._flagHasAssetBase = !0,
            this._addBitmap(this._assetBase)));
        null != this._display && null != y && this._display.setAnchor(y.getX(), y.getY())
    };
    j["com.nick.spongebob.weresquirrel.ui.UserInterfaceElement"] = h.UserInterfaceElement;
    h.UserInterfaceElement.__name__ = "com,nick,spongebob,weresquirrel,ui,UserInterfaceElement".split(",");
    h.UserInterfaceElement.prototype = {
        _doMotionPoint: function(a) {
            a = a._getPos().copy();
            if (0 == a.getX() % 1) {
                var b = a;
                b.setX(b.getX() + 0.0010)
            }
            0 == a.getY() % 1 && (b = a, b.setY(b.getY() + 0.0010));
            return a
        },
        _doMotionFloat: function(a) {
            a =
                a._getPos().getX();
            0 == a % 1 && (a += 0.0010);
            return a
        },
        disposeDisplay: function() {
            this._display = null
        },
        dispose: function() {
            g.WorkinCloud.instance.log("[UserInterfaceElement] dispose begun");
            this._entity.dispose();
            this._disposeBitmapContainer();
            this._dispatcher.dispose();
            for (var a = 0, b = 0; a < this._tweens.length;) {
                for (b = 0; b < this._tweens[a].length;) this._tweens[a][b].dispose(), b++;
                this._tweens[a] = null;
                a++
            }
            this._position = this._tweens = null
        },
        _disposeBitmapContainer: function() {
            !1 != this._flagBitmapAdded && (this._flagBitmapAdded = !1, this._display.dispose())
        },
        _addBitmap: function(a) {
            if (this._flagBitmapAdded) {
                if (this._bitmapAssetCurrent == a) return;
                this._disposeBitmapContainer()
            }
            this._bitmapAssetCurrent = a;
            "" != this._bitmapAssetCurrent && (this._flagBitmapAdded = !0, this._display = new m.ImageSprite(g.WorkinCloud.instance.getAssets().getTexture(this._bitmapAssetCurrent)), this._entity.add(this._display), this.renderPosition())
        },
        _initializeTween: function(a) {
            switch (a._getType()) {
                case "tx":
                    a.setStartFast(this._position.getX(), this._position.getX());
                    break;
                case "ty":
                    a.setStartFast(this._position.getY(), this._position.getY());
                    break;
                case "rtx":
                    a.setStartFast(this._position.getX(), this._position.getX());
                    break;
                case "rty":
                    a.setStartFast(this._position.getY(), this._position.getY());
                    break;
                case "":
                    a.setStart(this._position);
                    break;
                case "t":
                    a.setStart(this._position);
                    break;
                case "sx":
                    a.setStartFast(this._display.scaleY._value, this._display.scaleY._value);
                    break;
                case "sy":
                    a.setStartFast(this._display.scaleY._value, this._display.scaleY._value);
                    break;
                case "s":
                    a.setStartFast(this._display.scaleX._value,
                        this._display.scaleY._value);
                    break;
                case "a":
                    a.setStartFast(this._display.alpha._value, this._display.alpha._value);
                    break;
                case "r":
                    a.setStartFast(this._display.rotation._value, this._display.rotation._value)
            }
        },
        _applyTween: function(a, b) {
            this._flagChangePosition = !0;
            switch (b._getType()) {
                case "tx":
                    if (b.isReady()) {
                        var e = this._doMotionFloat(b, a);
                        0 != e % 1 && this._position.setX(e)
                    } else this._initializeTween(b);
                    break;
                case "ty":
                    b.isReady() ? this._position.setY(this._doMotionFloat(b, a)) : this._initializeTween(b);
                    break;
                case "rtx":
                    b.isReady() ? (e = this._doMotionFloat(b, a), 0 != e % 1 && this._position.setX(e)) : this._initializeTween(b);
                    break;
                case "rty":
                    b.isReady() ? this._position.setY(this._doMotionFloat(b, a)) : this._initializeTween(b);
                    break;
                case "":
                    b.isReady() ? this._position.toPoint(this._doMotionPoint(b, a)) : this._initializeTween(b);
                    break;
                case "t":
                    b.isReady() ? this._position.toPoint(this._doMotionPoint(b, a)) : this._initializeTween(b);
                    break;
                case "sx":
                    b.isReady() ? this._display.scaleX.set__(this._doMotionFloat(b, a)) : this._initializeTween(b);
                    break;
                case "sy":
                    b.isReady() ? this._display.scaleY.set__(this._doMotionFloat(b, a)) : this._initializeTween(b);
                    break;
                case "s":
                    b.isReady() ? (e = this._doMotionPoint(b, a), this._display.scaleX.set__(e.getX()), this._display.scaleY.set__(e.getY())) : this._initializeTween(b);
                    break;
                case "a":
                    b.isReady() ? this._display.alpha.set__(this._doMotionFloat(b, a)) : this._initializeTween(b);
                    break;
                case "r":
                    b.isReady() ? this._display.rotation.set__(this._doMotionFloat(b, a)) : this._initializeTween(b)
            }
        },
        _updatePositionFromTween: function(a) {
            for (var b =
                    this._tweens[0].length; 0 <= b;) this._tweens[0][b].update(a), this._applyTween(a, this._tweens[0][b]), this._tweens[0][b].complete && (this._tweens[0].splice(b, 1), this._onTweenStageComplete()), b--;
            0 == this._tweens[0].length && (this._tweens.shift(), 0 == this._tweens.length && this._onTweenAllComplete())
        },
        _onTweenAllComplete: function() {},
        _onTweenStageComplete: function() {},
        update: function(a) {
            0 < this._tweens.length && this._updatePositionFromTween(a);
            this._flagChangePosition && this.renderPosition()
        },
        renderPosition: function() {
            this._flagBitmapAdded &&
                (this._display.x.set__(this._position.getX()), this._display.y.set__(this._position.getY()), this._flagChangePosition = !1)
        },
        _getDisplay: function() {
            return this._display
        },
        _setLayer: function(a) {
            if (a == this._layer) return this._layer;
            this.sorted = !1;
            return this._layer = a
        },
        _getLayer: function() {
            return this._layer
        },
        _getTweensComplete: function() {
            return 0 == this._tweens.length
        },
        _getDispatcher: function() {
            return this._dispatcher
        },
        _getEntity: function() {
            return this._entity
        },
        __class__: h.UserInterfaceElement
    };
    h.buttons = {};
    h.buttons.ButtonBase = function(a, b, e, c, y, d, f, g) {
        null == g && (g = "");
        null == d && (d = "");
        null == y && (y = "");
        null == c && (c = "");
        null == e && (e = 0);
        h.UserInterfaceElement.call(this, a, b, e, "", f);
        this._assetUp = "" == c ? this._getDefaultAssetUp() : c;
        this._assetOver = "" == y ? this._getDefaultAssetOver() : y;
        this._assetDown = "" == d ? this._getDefaultAssetDown() : d;
        this._assetDisabled = "" == g ? this._getDefaultAssetDisabled() : g;
        this._bitmapAssetCurrent = "";
        this._flagDragged = this._flagDown = this._flagBitmapAdded = this._flagEventListenersAdded = !1;
        this.enable();
        this._addEventListeners()
    };
    j["com.nick.spongebob.weresquirrel.ui.buttons.ButtonBase"] = h.buttons.ButtonBase;
    h.buttons.ButtonBase.__name__ = "com,nick,spongebob,weresquirrel,ui,buttons,ButtonBase".split(",");
    h.buttons.ButtonBase.__super__ = h.UserInterfaceElement;
    h.buttons.ButtonBase.prototype = r(h.UserInterfaceElement.prototype, {
        _removeEventListeners: function() {
            this._flagEventListenersAdded && (this._flagEventListenersAdded = !1, this._downConnection.dispose(), this._downConnection = null, this._flagDown &&
                (this._upConnection.dispose(), this._upConnection = null))
        },
        _addEventListeners: function() {
            this._flagEventListenersAdded || (this._flagEventListenersAdded = !0, this._downConnection = this._display.get_pointerDown().connect(u(this, this._onDownEvent)))
        },
        renderPosition: function() {
            h.UserInterfaceElement.prototype.renderPosition.call(this)
        },
        _renderDisabled: function() {},
        _renderReturnUp: function() {},
        _renderDown: function() {},
        _renderUp: function() {
            this._addBitmap(this._assetUp)
        },
        update: function(a) {
            h.UserInterfaceElement.prototype.update.call(this,
                a);
            this._flagDown && !1 == g.WorkinCloud.instance.getInput().getInput(f.constants.ConstantsApp.INPUT_CLICK) && (this._upConnection.dispose(), this._renderReturnUp())
        },
        _onCancelDrag: function() {
            this._flagDragged = !1;
            this._dispatch(h.buttons.ButtonBase.CANCEL_DRAG)
        },
        _onUp: function() {
            this._flagDown && (this._upConnection.dispose(), this._upConnection = null, this._flagDown = !1, this._renderReturnUp(), this._click(), this._flagDragged && this._onCancelDrag(), this._dispatch(h.buttons.ButtonBase.UP))
        },
        _onDown: function() {
            this._flagBitmapAdded &&
                (this._flagDown = !0, this._renderDown(), this._upConnection = this._display.get_pointerUp().connect(u(this, this._onUpEvent)), this._dispatch(h.buttons.ButtonBase.DOWN))
        },
        _click: function() {
            this._dispatch(h.buttons.ButtonBase.CLICK);
            "" != this._getClickFlow() && g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventFlow(this._getClickFlow()));
            "" != this._getClickEvent() && g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEvent(this._getClickEvent()))
        },
        _dispatch: function(a) {
            this._GET_DO_DISPATCH() &&
                this._dispatcher.dispatchEvent(new o.WMEvent(a))
        },
        _onUpEvent: function(a) {
            this._onUp(a.viewX, a.viewY)
        },
        _onDownEvent: function(a) {
            this._onDown(a.viewX, a.viewY)
        },
        _getClickFlow: function() {
            return ""
        },
        _getClickEvent: function() {
            return ""
        },
        _GET_DISABLE_FRAME: function() {
            return 1
        },
        _GET_CUSTOM_HIT_BOX: function() {
            return new F.Point(0, 0)
        },
        _GET_DO_DISPATCH: function() {
            return !0
        },
        _getDefaultAssetDisabled: function() {
            return ""
        },
        _getDefaultAssetDown: function() {
            return ""
        },
        _getDefaultAssetOver: function() {
            return ""
        },
        _getDefaultAssetUp: function() {
            return ""
        },
        dispose: function() {
            this.disable();
            this._removeEventListeners()
        },
        disable: function() {
            this._flagEnabled = !1;
            this._renderDisabled()
        },
        enable: function() {
            this._flagEnabled = !0;
            this._renderUp()
        },
        _getFlagBehaveAsElement: function() {
            return !1
        },
        __class__: h.buttons.ButtonBase
    });
    h.buttons.ButtonSoundToggle = function() {};
    j["com.nick.spongebob.weresquirrel.ui.buttons.ButtonSoundToggle"] = h.buttons.ButtonSoundToggle;
    h.buttons.ButtonSoundToggle.__name__ = "com,nick,spongebob,weresquirrel,ui,buttons,ButtonSoundToggle".split(",");
    h.buttons.ButtonSoundToggle.__super__ = h.buttons.ButtonBase;
    h.buttons.ButtonSoundToggle.prototype = r(h.buttons.ButtonBase.prototype, {
        _getClickEvent: function() {
            var a = g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_MUTED) ? this._onAssets : this._offAssets;
            this._assetUp = a[0];
            this._assetOver = a[1];
            this._assetDown = a[3 == a.length ? 2 : 1];
            return f.constants.ConstantsApp.EVENT_MUTE_TOGGLE
        },
        __class__: h.buttons.ButtonSoundToggle
    });
    h.displays = {};
    h.displays.Display = function(a, b, e, c, y) {
        null == c && (c = "");
        h.UserInterfaceElement.call(this,
            a, b, e, c, y);
        this._addEventListeners()
    };
    j["com.nick.spongebob.weresquirrel.ui.displays.Display"] = h.displays.Display;
    h.displays.Display.__name__ = "com,nick,spongebob,weresquirrel,ui,displays,Display".split(",");
    h.displays.Display.__super__ = h.UserInterfaceElement;
    h.displays.Display.prototype = r(h.UserInterfaceElement.prototype, {
        dispose: function() {
            h.UserInterfaceElement.prototype.dispose.call(this);
            this._removeEventListeners()
        },
        _updateValue: function() {
            return ""
        },
        _refresh: function() {},
        _onUpdateDisplay: function(a) {
            a._getData().valueID ==
                this._updateValue() && this._refresh()
        },
        _removeEventListeners: function() {
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_UPDATE_DISPLAY, u(this, this._onUpdateDisplay))
        },
        _addEventListeners: function() {
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_UPDATE_DISPLAY, u(this, this._onUpdateDisplay))
        },
        __class__: h.displays.Display
    });
    h.displays.DisplayHealth = function(a, b, e, c, y) {
        null == c && (c = "");
        h.displays.Display.call(this, a, b, e, c,
            y);
        e = g.WorkinCloud.instance.getFloat(this._updateValue());
        this._textHealth = new m.TextSprite(g.WorkinCloud.instance.getAssets().getFont("fonts/LHFHappyFunBallFlambe"), "" + e);
        this._textHealth.x.set__(a);
        this._textHealth.y.set__(b);
        a = this._textHealth.scaleX;
        a.set__(0.4 * a._value);
        a = this._textHealth.scaleY;
        a.set__(0.4 * a._value);
        this._display = this._textHealth;
        this._entity.add(this._display)
    };
    j["com.nick.spongebob.weresquirrel.ui.displays.DisplayHealth"] = h.displays.DisplayHealth;
    h.displays.DisplayHealth.__name__ =
        "com,nick,spongebob,weresquirrel,ui,displays,DisplayHealth".split(",");
    h.displays.DisplayHealth.__super__ = h.displays.Display;
    h.displays.DisplayHealth.prototype = r(h.displays.Display.prototype, {
        _updateValue: function() {
            return f.constants.ConstantsApp.FLOAT_HEALTH
        },
        _refresh: function() {
            this._textHealth.set_text("" + g.WorkinCloud.instance.getFloat(this._updateValue()))
        },
        __class__: h.displays.DisplayHealth
    });
    h.displays.DisplayLevel = function() {};
    j["com.nick.spongebob.weresquirrel.ui.displays.DisplayLevel"] =
        h.displays.DisplayLevel;
    h.displays.DisplayLevel.__name__ = "com,nick,spongebob,weresquirrel,ui,displays,DisplayLevel".split(",");
    h.displays.DisplayLevel.__super__ = h.displays.Display;
    h.displays.DisplayLevel.prototype = r(h.displays.Display.prototype, {
        _updateValue: function() {
            return f.constants.ConstantsApp.FLOAT_LEVEL
        },
        _refresh: function() {
            this._textNum.set_text("" + g.WorkinCloud.instance.getFloat(this._updateValue()))
        },
        __class__: h.displays.DisplayLevel
    });
    h.displays.DisplayScore = function(a, b, e, c, y) {
        null ==
            c && (c = "");
        h.displays.Display.call(this, a, b, e, c, y);
        e = g.WorkinCloud.instance.getFloat(this._updateValue());
        this._textNum = new m.TextSprite(g.WorkinCloud.instance.getAssets().getFont("fonts/LHFHappyFunBallFlambe"), "" + e);
        this._textNum.x.set__(a);
        this._textNum.y.set__(b);
        a = this._textNum.scaleX;
        a.set__(0.4 * a._value);
        a = this._textNum.scaleY;
        a.set__(0.4 * a._value);
        this._display = this._textNum;
        this._entity.add(this._display)
    };
    j["com.nick.spongebob.weresquirrel.ui.displays.DisplayScore"] = h.displays.DisplayScore;
    h.displays.DisplayScore.__name__ = "com,nick,spongebob,weresquirrel,ui,displays,DisplayScore".split(",");
    h.displays.DisplayScore.__super__ = h.displays.Display;
    h.displays.DisplayScore.prototype = r(h.displays.Display.prototype, {
        _updateValue: function() {
            return f.constants.ConstantsApp.FLOAT_SCORE
        },
        _refresh: function() {
            this._textNum.set_text("" + g.WorkinCloud.instance.getFloat(this._updateValue()))
        },
        __class__: h.displays.DisplayScore
    });
    h.displays.DisplayText = function() {};
    j["com.nick.spongebob.weresquirrel.ui.displays.DisplayText"] =
        h.displays.DisplayText;
    h.displays.DisplayText.__name__ = "com,nick,spongebob,weresquirrel,ui,displays,DisplayText".split(",");
    h.displays.DisplayText.__super__ = h.displays.Display;
    h.displays.DisplayText.prototype = r(h.displays.Display.prototype, {
        _updateValue: function() {
            return f.constants.ConstantsApp.FLOAT_TEXT
        },
        _refresh: function() {
            this._text.set_text(g.WorkinCloud.instance.getString(this._updateValue()))
        },
        __class__: h.displays.DisplayText
    });
    h.screens = {};
    h.screens.ScreenBase = function(a, b, e) {
        null == e && (e =
            0);
        null == b && (b = "");
        this._STATE_OPENED = "opened";
        this._STATE_OUT = "out";
        this._STATE_IN = "in";
        "" == b && (b = this._getAssetId());
        this.id = a;
        h.UserInterfaceElement.call(this, 0, 0, e, b);
        this._addEventListeners();
        this._buttons = [];
        this._buildButtons();
        this._flagStateAnimationComplete = this._flagStateCompleteTemp = this.flagDispose = !1;
        this._states = [];
        this._generateStates();
        this._stateIndex = this._states.length + 2;
        this._setFirstState()
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenBase"] = h.screens.ScreenBase;
    h.screens.ScreenBase.__name__ =
        "com,nick,spongebob,weresquirrel,ui,screens,ScreenBase".split(",");
    h.screens.ScreenBase.__super__ = h.UserInterfaceElement;
    h.screens.ScreenBase.prototype = r(h.UserInterfaceElement.prototype, {
        _onStateComplete: function() {
            this._flagStateCompleteTemp = !1;
            "" != this._states[this._stateIndex].outFunc && g.WorkinCloud.instance.log("[ScreenBase](_onStateComplete) Out Func not supported in HTML5 yet");
            switch (this._states[this._stateIndex].actionOnComplete) {
                case h.screens.data.ScreenStateData.ACTION_OPENED:
                    this._setOpenedState();
                    this._dispatcher.dispatchEvent(new o.WMEventScreenOut(f.constants.ConstantsScreen.OUTPUT_OPENED, this.id));
                    break;
                case h.screens.data.ScreenStateData.ACTION_CLOSED:
                    this.setFlagDispose();
                    this._dispatcher.dispatchEvent(new o.WMEventScreenOut(f.constants.ConstantsScreen.OUTPUT_CLOSED, this.id));
                    break;
                case h.screens.data.ScreenStateData.ACTION_NEW_STATE:
                    this._setState(this._states[this._stateIndex].actionData);
                    break;
                case h.screens.data.ScreenStateData.ACTION_EVENT:
                    this._dispatcher.dispatchEvent(new o.WMEvent(this._states[this._stateIndex].actionData));
                    break;
                case h.screens.data.ScreenStateData.ACTION_FLOW:
                    this._doFlowEvent(this._states[this._stateIndex].actionData)
            }
        },
        _findStateIndex: function(a) {
            for (var b = this._states.length - 1; 0 <= b;) {
                if (this._states[b].id == a) return b;
                b--
            }
            return -1
        },
        getState: function() {
            return this._states[this._stateIndex].id
        },
        _setState: function(a, b) {
            null == b && (b = !1);
            var e = this._findStateIndex(a);
            if (0 > e) g.WorkinCloud.instance.log("[ScreenBase](_setState) ERROR : State >" + a + "< not found."), g.WorkinCloud.instance.log("[ScreenBase](_setState) cancelling setState().");
            else if (b || e != this._stateIndex) this._flagStateAnimationComplete = this._flagStateCompleteTemp = !1, this._stateIndex = e
        },
        _addState: function(a, b, e, c, y, d) {
            null == d && (d = "");
            null == y && (y = "");
            null == c && (c = "");
            null == e && (e = 0);
            this._states.push(new h.screens.data.ScreenStateData(a, b, e, c, y, d))
        },
        isClosing: function() {
            return this.getState() == this._STATE_OUT
        },
        close: function() {
            this.setFlagDispose();
            this._dispatcher.dispatchEvent(new o.WMEventScreenOut(f.constants.ConstantsScreen.OUTPUT_CLOSED, this.id))
        },
        open: function() {
            this._setOpenedState();
            this._dispatcher.dispatchEvent(new o.WMEventScreenOut(f.constants.ConstantsScreen.OUTPUT_OPENED, this.id))
        },
        dispose: function() {
            for (var a = 0, b = this._buttons; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
            this._buttons = null;
            this._removeEventListeners();
            this._states = null;
            h.UserInterfaceElement.prototype.dispose.call(this)
        },
        reset: function() {
            this._setFirstState()
        },
        handleInput: function(a) {
            var b = !0;
            switch (a.input) {
                case f.constants.ConstantsApp.INPUT_CLICK:
                    switch (a.phase) {
                        case 1:
                            this._onInputDown(a.x, a.y) || (b = !1);
                            break;
                        case 2:
                            this._onInputMove(a.x, a.y) || (b = !1);
                            break;
                        case 0:
                            this._onInputUp(a.x, a.y) || (b = !1)
                    }
                    break;
                default:
                    this._onInput(a) || (b = !1)
            }
            return b
        },
        update: function(a) {
            h.UserInterfaceElement.prototype.update.call(this, a);
            for (var a = 0, b = this._buttons; a < b.length;) {
                var e = b[a];
                ++a;
                e.renderPosition()
            }
            this._flagStateCompleteTemp && this._onStateComplete()
        },
        _doFlowEvent: function(a) {
            g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventFlow(a))
        },
        _addButton: function(a) {
            this._buttons.push(a);
            this._entity.addChild(a._getEntity());
            return a
        },
        _buildButtons: function() {},
        _removeEventListeners: function() {},
        _addEventListeners: function() {},
        _onInput: function() {
            return !0
        },
        _onInputMove: function() {
            return !0
        },
        _onInputUp: function() {
            return !0
        },
        _onInputDown: function() {
            return !0
        },
        _generateStates: function() {
            this._addState(this._STATE_IN, "in", h.screens.data.ScreenStateData.ACTION_OPENED);
            this._addState(this._STATE_OUT, "out", h.screens.data.ScreenStateData.ACTION_CLOSED);
            this._addState(this._STATE_OPENED, "open")
        },
        _setOpenedState: function() {
            this._setState(this._STATE_OPENED)
        },
        _setFirstState: function() {
            this._setState(this._STATE_IN)
        },
        setFlagDispose: function() {
            this.flagDispose = !0
        },
        _getAssetId: function() {
            return "MovieClip"
        },
        __class__: h.screens.ScreenBase
    });
    h.screens.ScreenEndGame = function(a, b, e, c) {
        null == e && (e = 0);
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, e, c);
        this._score = new h.displays.DisplayScore(430, 160, 0);
        a = this._score._textNum.scaleX;
        a.set__(a._value / 0.6);
        a = this._score._textNum.scaleY;
        a.set__(a._value / 0.6);
        this._addButton(this._score);
        this._buttonPlayAgain = new h.buttons.ButtonBase(320,
            250, 0, "ui/AssetButtonPlayAgain.png", "ui/AssetButtonPlayAgain.png", "ui/AssetButtonPlayAgain.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonPlayAgain._getEntity());
        this._buttonPlayAgain._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onPlayAgainClick))
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenEndGame"] = h.screens.ScreenEndGame;
    h.screens.ScreenEndGame.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenEndGame".split(",");
    h.screens.ScreenEndGame.__super__ =
        h.screens.ScreenBase;
    h.screens.ScreenEndGame.prototype = r(h.screens.ScreenBase.prototype, {
        _onPlayAgainClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN)
        },
        __class__: h.screens.ScreenEndGame
    });
    h.screens.ScreenGameplayHUD = function(a, b, e, c) {
        null == e && (e = 0);
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, e, c);
        this._addButton(new h.buttons.ButtonBase(42, 502, 0, "ui/AssetButtonPause.png", "ui/AssetButtonPause.png", "ui/AssetButtonPause.png", new l.WorkinPoint(1, 0)))._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK,
            u(this, this._onPauseClick));
        this._addButton(new h.displays.DisplayHealth(385, 532, 0));
        this._addButton(new h.displays.DisplayScore(140, 532, 0))
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenGameplayHUD"] = h.screens.ScreenGameplayHUD;
    h.screens.ScreenGameplayHUD.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenGameplayHUD".split(",");
    h.screens.ScreenGameplayHUD.__super__ = h.screens.ScreenBase;
    h.screens.ScreenGameplayHUD.prototype = r(h.screens.ScreenBase.prototype, {
        _onPauseClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU)
        },
        __class__: h.screens.ScreenGameplayHUD
    });
    h.screens.ScreenGameplayMenu = function(a, b, e, c) {
        null == e && (e = 0);
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, e, c);
        this._soundIsMuted = g.WorkinCloud.instance._getSound().getMute();
        this._buttonBack = new h.buttons.ButtonBase(350, 275, 0, "ui/AssetButtonPlay.png", "ui/AssetButtonPlay.png", "ui/AssetButtonPlay.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonBack._getEntity());
        this._buttonBack._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK,
            u(this, this._onBackClick));
        this._buttonHelp = new h.buttons.ButtonBase(430, 130, 0, "ui/AssetButtonHelp.png", "ui/AssetButtonHelp.png", "ui/AssetButtonHelp.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonHelp._getEntity());
        this._buttonHelp._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onHelpClick));
        this._buttonSoundOn = new h.buttons.ButtonBase(260, 130, 0, "ui/AssetButtonSoundOn.png", "ui/AssetButtonSoundOn.png", "ui/AssetButtonSoundOn.png", new l.WorkinPoint(1, 0));
        this._buttonSoundOn._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK,
            u(this, this._onSoundMute));
        this._buttonSoundOff = new h.buttons.ButtonBase(260, 130, 0, "ui/AssetButtonSoundOff.png", "ui/AssetButtonSoundOff.png", "ui/AssetButtonSoundOff.png", new l.WorkinPoint(1, 0));
        this._buttonSoundOff._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onSoundMute));
        this._soundIsMuted ? this._entity.addChild(this._buttonSoundOff._getEntity()) : this._entity.addChild(this._buttonSoundOn._getEntity());
        this._buttonQuit = new h.buttons.ButtonBase(600, 130, 0, "ui/AssetButtonQuit.png",
            "ui/AssetButtonQuit.png", "ui/AssetButtonQuit.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonQuit._getEntity());
        this._buttonQuit._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onQuitClick))
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenGameplayMenu"] = h.screens.ScreenGameplayMenu;
    h.screens.ScreenGameplayMenu.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenGameplayMenu".split(",");
    h.screens.ScreenGameplayMenu.__super__ = h.screens.ScreenBase;
    h.screens.ScreenGameplayMenu.prototype = r(h.screens.ScreenBase.prototype, {
        _onQuitClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT)
        },
        _onHelpClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP)
        },
        _onBackClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE)
        },
        _onSoundMute: function() {
            !1 == this._soundIsMuted ? (this._soundIsMuted = !0, g.WorkinCloud.instance._getSound().setMute(this._soundIsMuted), this._entity.removeChild(this._buttonSoundOn._getEntity()),
                this._entity.addChild(this._buttonSoundOff._getEntity())) : (this._soundIsMuted = !1, g.WorkinCloud.instance._getSound().setMute(this._soundIsMuted), this._entity.removeChild(this._buttonSoundOff._getEntity()), this._entity.addChild(this._buttonSoundOn._getEntity()))
        },
        __class__: h.screens.ScreenGameplayMenu
    });
    h.screens.ScreenGeneric = function(a, b, e) {
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, 0, e);
        this._flagHasSpaceAction = !1
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenGeneric"] = h.screens.ScreenGeneric;
    h.screens.ScreenGeneric.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenGeneric".split(",");
    h.screens.ScreenGeneric.__super__ = h.screens.ScreenBase;
    h.screens.ScreenGeneric.prototype = r(h.screens.ScreenBase.prototype, {
        __class__: h.screens.ScreenGeneric
    });
    h.screens.ScreenHelp = function(a, b, e, c) {
        null == e && (e = 0);
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, e, c);
        this._buttonBack = new h.buttons.ButtonBase(350, 285, 0, "ui/AssetButtonPlay.png", "ui/AssetButtonPlay.png", "ui/AssetButtonPlay.png", new l.WorkinPoint(1,
            0));
        this._entity.addChild(this._buttonBack._getEntity());
        this._buttonBack._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onBackClick))
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenHelp"] = h.screens.ScreenHelp;
    h.screens.ScreenHelp.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenHelp".split(",");
    h.screens.ScreenHelp.__super__ = h.screens.ScreenBase;
    h.screens.ScreenHelp.prototype = r(h.screens.ScreenBase.prototype, {
        _onBackClick: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_HELP_CLOSE)
        },
        __class__: h.screens.ScreenHelp
    });
    h.screens.ScreenNextLevel = function() {};
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenNextLevel"] = h.screens.ScreenNextLevel;
    h.screens.ScreenNextLevel.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenNextLevel".split(",");
    h.screens.ScreenNextLevel.__super__ = h.screens.ScreenBase;
    h.screens.ScreenNextLevel.prototype = r(h.screens.ScreenBase.prototype, {
        _onInputDown: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_END_LEVEL_QUIT);
            return !0
        },
        __class__: h.screens.ScreenNextLevel
    });
    h.screens.ScreenQuitConfirm = function(a, b, e, c) {
        null == e && (e = 0);
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, e, c);
        this._buttonYes = new h.buttons.ButtonBase(300, 200, 0, "ui/AssetButtonYes.png", "ui/AssetButtonYes.png", "ui/AssetButtonYes.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonYes._getEntity());
        this._buttonYes._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onYesClick));
        this._buttonNo = new h.buttons.ButtonBase(560, 200, 0, "ui/AssetButtonNo.png", "ui/AssetButtonNo.png",
            "ui/AssetButtonNo.png", new l.WorkinPoint(1, 0));
        this._entity.addChild(this._buttonNo._getEntity());
        this._buttonNo._getDispatcher().addEventListener(h.buttons.ButtonBase.CLICK, u(this, this._onNoClick))
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenQuitConfirm"] = h.screens.ScreenQuitConfirm;
    h.screens.ScreenQuitConfirm.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenQuitConfirm".split(",");
    h.screens.ScreenQuitConfirm.__super__ = h.screens.ScreenBase;
    h.screens.ScreenQuitConfirm.prototype =
        r(h.screens.ScreenBase.prototype, {
            _onNoClick: function() {
                this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO)
            },
            _onYesClick: function() {
                this._doFlowEvent(f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES)
            },
            __class__: h.screens.ScreenQuitConfirm
        });
    h.screens.ScreenScreenshot = function() {};
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenScreenshot"] = h.screens.ScreenScreenshot;
    h.screens.ScreenScreenshot.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenScreenshot".split(",");
    h.screens.ScreenScreenshot.__super__ = h.screens.ScreenBase;
    h.screens.ScreenScreenshot.prototype = r(h.screens.ScreenBase.prototype, {
        dispose: function() {
            h.screens.ScreenBase.prototype.dispose.call(this)
        },
        __class__: h.screens.ScreenScreenshot
    });
    h.screens.ScreenSplash = function(a, b, e) {
        null == b && (b = "");
        h.screens.ScreenBase.call(this, a, b, 0, e)
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.ScreenSplash"] = h.screens.ScreenSplash;
    h.screens.ScreenSplash.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,ScreenSplash".split(",");
    h.screens.ScreenSplash.__super__ = h.screens.ScreenBase;
    h.screens.ScreenSplash.prototype = r(h.screens.ScreenBase.prototype, {
        _onInputDown: function() {
            this._doFlowEvent(f.constants.ConstantsScreen.FLOW_SPLASH_PLAY);
            return !0
        },
        __class__: h.screens.ScreenSplash
    });
    h.screens.data = {};
    h.screens.data.ScreenData = function(a, b, e, c, d) {
        null == c && (c = 0);
        null == e && (e = "");
        this.id = a;
        this.screenClass = b;
        this.assetClassName = e;
        this.layer = c;
        this.data = null == d ? new E : d
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.data.ScreenData"] =
        h.screens.data.ScreenData;
    h.screens.data.ScreenData.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,data,ScreenData".split(",");
    h.screens.data.ScreenData.prototype = {
        __class__: h.screens.data.ScreenData
    };
    h.screens.data.ScreenQueueData = function(a, b, e) {
        null == e && (e = "");
        this.screenData = a;
        this.openCondition = b;
        this.openTestString = e
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.data.ScreenQueueData"] = h.screens.data.ScreenQueueData;
    h.screens.data.ScreenQueueData.__name__ = "com,nick,spongebob,weresquirrel,ui,screens,data,ScreenQueueData".split(",");
    h.screens.data.ScreenQueueData.prototype = {
        validateCondition: function(a, b) {
            null == b && (b = "");
            return this.openCondition == a ? "" == this.openTestString || this.openTestString == b : !1
        },
        __class__: h.screens.data.ScreenQueueData
    };
    h.screens.data.ScreenStateData = function(a, b, e, c, d, f) {
        this.id = a;
        this.animation = b;
        this.actionOnComplete = e;
        this.actionData = c;
        this.inFunc = d;
        this.outFunc = f
    };
    j["com.nick.spongebob.weresquirrel.ui.screens.data.ScreenStateData"] = h.screens.data.ScreenStateData;
    h.screens.data.ScreenStateData.__name__ =
        "com,nick,spongebob,weresquirrel,ui,screens,data,ScreenStateData".split(",");
    h.screens.data.ScreenStateData.prototype = {
        __class__: h.screens.data.ScreenStateData
    };
    h.transitions = {};
    h.transitions.TransitionBase = function(a, b, e, c) {
        null == c && (c = "");
        null == e && (e = !1);
        null == b && (b = !0);
        this._STATE_OUT = 3;
        this._STATE_IDLE = 2;
        this._STATE_IN = 1;
        this._STATE_HIDDEN = 0;
        this._transitionId = c;
        this._flagOutOnly = e;
        this.flagDispose = !1;
        h.UserInterfaceElement.call(this, 0, 0, 1E3, a);
        b ? this._setState(this._STATE_HIDDEN) : this._flagOutOnly ?
            this._setState(this._STATE_OUT) : this._setState(this._STATE_IN)
    };
    j["com.nick.spongebob.weresquirrel.ui.transitions.TransitionBase"] = h.transitions.TransitionBase;
    h.transitions.TransitionBase.__name__ = "com,nick,spongebob,weresquirrel,ui,transitions,TransitionBase".split(",");
    h.transitions.TransitionBase.__super__ = h.UserInterfaceElement;
    h.transitions.TransitionBase.prototype = r(h.UserInterfaceElement.prototype, {
        dispose: function() {
            h.UserInterfaceElement.prototype.dispose.call(this);
            this._mc = null
        },
        _setState: function(a) {
            this._state =
                a;
            switch (this._state) {
                case this._STATE_HIDDEN:
                    this.hide()
            }
        },
        show: function() {
            this._mc.set_visible(!0)
        },
        hide: function() {
            this._mc.set_visible(!1)
        },
        start: function() {
            this.show();
            this._setState(this._STATE_IN)
        },
        update: function(a) {
            h.UserInterfaceElement.prototype.update.call(this, a)
        },
        _getIsOutro: function() {
            return this._state == this._STATE_OUT
        },
        __class__: h.transitions.TransitionBase
    });
    i = {
        World: function(a, b) {
            this._musicPlaying = this._moonToggle = this._moveDown = !1;
            g.WorkinCloud.instance.log("World Created!");
            this._timeline = a;
            this._main = b;
            this._generate();
            this._addEventListeners()
        }
    };
    j["com.nick.spongebob.weresquirrel.world.World"] = i.World;
    i.World.__name__ = "com,nick,spongebob,weresquirrel,world,World".split(",");
    i.World.prototype = {
        _testGameOver: function(a) {
            if ((this._player.isDead() || this._player.isEnded()) && -1 == this._gameOverTimer) this._gameOverTimer = this._GAME_OVER_TIME();
            0 < this._gameOverTimer && (this._gameOverTimer -= a, 0 >= this._gameOverTimer && (this._player.isDead() ? 1 >= g.WorkinCloud.instance.getFloat(f.constants.ConstantsApp.FLOAT_HEALTH) ?
                (g.WorkinCloud.instance.setBool(f.constants.ConstantsApp.BOOL_PAUSED, !0), this._main._gotoEndGame(!1)) : g.WorkinCloud.instance.setValue(f.constants.ConstantsApp.BOOL_LEVEL_LOSE, !0) : g.WorkinCloud.instance.setValue(f.constants.ConstantsApp.BOOL_GAME_WIN, !0)))
        },
        _GAME_OVER_TIME: function() {
            return 2
        },
        _doChangePoof: function() {
            this._player.isWolf() ? this._addParticle(new i.elements.particle.ParticleChangePoof({
                x: this._player.pos.getX() - 30,
                y: this._player.pos.getY() + 20
            })) : (this._addParticle(new i.elements.particle.ParticleChangePoof({
                x: this._player.pos.getX() -
                    90,
                y: this._player.pos.getY() + 50
            })), this._addParticle(new i.elements.particle.ParticleSparkle({
                x: this._player.pos.getX() - 80,
                y: this._player.pos.getY() + 20
            })))
        },
        _doMakeRock: function(a) {
            this._addParticle(new i.elements.particle.ParticleBrokenRock(this._ground, a._getData().offset))
        },
        _onScreenShake: function(a) {
            this._effectShakeTimer = a._getData()._length;
            this._effectShakeAmp = a._getData()._amp
        },
        _onBurstOrange: function() {
            this._addParticle(new i.elements.particle.ParticleBurstOrange({
                x: this._player.pos.getX(),
                y: this._player.pos.getY() + 50
            }))
        },
        _onScorePopup: function(a) {
            a = Math.round(a._getData().amount * (1 + 9 * (this._player.scrollSpeed() / 1E3)));
            this._addScore(new i.elements.effects.EffectFloatingScoreText({
                x: this._player.pos.getX(),
                y: this._player.pos.getY() - 100,
                score: a,
                noAnimation: !0,
                layer: f.constants.ConstantsApp.LAYER_PARTICLE,
                type: f.constants.ConstantsApp.TYPE_EFFECT
            }));
            g.WorkinCloud.instance.modifyValue(f.constants.ConstantsApp.FLOAT_SCORE, a)
        },
        _levelMoveDown: function() {
            this._moveDown = !0;
            this._moveDest = 100;
            this._moveRate = 300
        },
        _onLevelUp: function() {
            g.WorkinCloud.instance.modifyValue(f.constants.ConstantsState.NUMBER_LEVEL, 1);
            this._levelMoveDown()
        },
        _onRockBreak: function() {
            this._addParticle(new i.elements.particle.ParticleChangePoof({
                x: this._player.pos.getX(),
                y: this._player.pos.getY() + 20
            }))
        },
        _onUnpause: function() {
            g.WorkinCloud.instance.setValue(f.constants.ConstantsApp.BOOL_PAUSED, !1)
        },
        _onPause: function() {
            g.WorkinCloud.instance.setValue(f.constants.ConstantsApp.BOOL_PAUSED, !0)
        },
        handleInput: function(a) {
            a.input ==
                f.constants.ConstantsApp.INPUT_CLICK && 1 == this._state ? (1 == a.phase && a.x > f.constants.ConstantsApp.STAGE_CENTER_X - 75 - 5 && a.x < f.constants.ConstantsApp.STAGE_CENTER_X + 75 + 25 && 0 < a.y && 160 > a.y ? (this._moon.toggleOpen(), this._moonToggle = !0) : 1 == a.phase && !0 == this._player.isPressedUp() && !1 == this._moonToggle && 200 < a.x && 500 > a.y && this._player.setPressedUp(!1), 1 == a.phase && !1 == this._moonToggle && 0 == this._player.getState() && !this._player.isPressedUp() && 0 < this._player.getJumpCount() && (this._player.setPressedUp(!0), this._player.doJump())) :
                a.input == f.constants.ConstantsApp.INPUT_SPACE && 1 == this._state ? 1 == a.phase && (this._moon.toggleOpen(), this._moonToggle = !0) : a.input == f.constants.ConstantsApp.INPUT_UP && 1 == this._state && (1 == a.phase && !0 == this._player.isPressedUp() && !1 == this._moonToggle && this._player.setPressedUp(!1), 1 == a.phase && !1 == this._moonToggle && 0 == this._player.getState() && !this._player.isPressedUp() && 0 < this._player.getJumpCount() && (this._player.setPressedUp(!0), this._player.doJump()));
            this._moonToggle = !1
        },
        _removeEventListeners: function() {
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_PAUSE,
                u(this, this._onPause));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_UNPAUSE, u(this, this._onUnpause));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_CHANGE_WOLF, u(this, this._doChangePoof));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_MAKE_ROCK, u(this, this._doMakeRock));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_EFFECT_SHAKE,
                u(this, this._onScreenShake));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_BURST_ORANGE, u(this, this._onBurstOrange));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_SCORE_POPUP, u(this, this._onScorePopup));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_ROCK_BREAK, u(this, this._onRockBreak));
            g.WorkinCloud.instance.getDispatcher().removeEventListener(f.constants.ConstantsApp.EVENT_LEVEL_UP,
                u(this, this._onLevelUp))
        },
        _addEventListeners: function() {
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_PAUSE, u(this, this._onPause));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_UNPAUSE, u(this, this._onUnpause));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_CHANGE_WOLF, u(this, this._doChangePoof));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_MAKE_ROCK,
                u(this, this._doMakeRock));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_EFFECT_SHAKE, u(this, this._onScreenShake));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_BURST_ORANGE, u(this, this._onBurstOrange));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_SCORE_POPUP, u(this, this._onScorePopup));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_ROCK_BREAK,
                u(this, this._onRockBreak));
            g.WorkinCloud.instance.getDispatcher().addEventListener(f.constants.ConstantsApp.EVENT_LEVEL_UP, u(this, this._onLevelUp))
        },
        _removeElementAtIndex: function(a) {
            this._elements[a].dispose();
            this._viewport.removeChild(this._elements[a]);
            this._elements[a].disposeDisplay();
            this._elements.splice(a, 1)
        },
        _removeElement: function(a) {
            for (var b = this._elements.length; 0 < b;)
                if (b--, this._elements[b] == a && null != this._elements[b]) {
                    this._removeElementAtIndex(b);
                    break
                }
        },
        _addElement: function(a) {
            this._elements.push(a);
            a.renderPosition(this._camera);
            this._viewport.addChild(a)
        },
        dispose: function() {
            for (this._i = 0; this._i < this._ground.length;) this._ground.splice(this._i, 1), this._i++;
            for (this._i = 0; this._i < this._particles.length;) this._particles.splice(this._i, 1), this._i++;
            for (this._i = 0; this._i < this._scores.length;) this._scores.splice(this._i, 1), this._i++;
            for (; 0 < this._elements.length;) this._removeElementAtIndex(this._elements.length - 1);
            this._timeline = this._camera = this._music = this._scores = this._particles = this._ground = this._elements =
                null;
            this._removeEventListeners()
        },
        render: function(a) {
            for (var b = 0; b < this._elements.length;) this._elements[b].renderPosition(this._camera, a), b++
        },
        _testAddNewGroundPiece: function() {
            if (this._ground[this._ground.length - 1].rightEdge() < f.constants.ConstantsApp.STAGE_WIDTH) {
                var a, b;
                switch (g.WorkinUtils.getRandom(1, 4, !0) | 0) {
                    case 1:
                        a = f.constants.ConstantsGround.GROUND_1;
                        b = 1;
                        break;
                    case 2:
                        a = f.constants.ConstantsGround.GROUND_2;
                        b = 2;
                        break;
                    case 3:
                        a = f.constants.ConstantsGround.GROUND_3;
                        b = 3;
                        break;
                    case 4:
                        a = f.constants.ConstantsGround.GROUND_4;
                        b = 4;
                        break;
                    default:
                        a = f.constants.ConstantsGround.GROUND_5, b = 5
                }
                this._addGroundPiece(a, this._player.scrollSpeed(), b)
            }
        },
        _addScoreCounter: function(a) {
            g.WorkinCloud.instance.modifyValue(f.constants.ConstantsApp.FLOAT_SCORE, Math.round(this._player.scrollSpeed() / 10 * a))
        },
        _testDoJelly: function(a) {
            this._jellyCounter -= a;
            0 > this._jellyCounter && (this._jellyCounter = this._RESET_JELLY_COUNTER(), this._addParticle(new i.elements.particle.ParticleJelly({
                layer: f.constants.ConstantsApp.LAYER_MOON
            })))
        },
        _RESET_JELLY_COUNTER: function() {
            return g.WorkinUtils.getRandom(10,
                25, !1)
        },
        getCameraPlayerOffsetX: function() {
            return 250
        },
        update: function(a) {
            if (!g.WorkinCloud.instance.getBool(f.constants.ConstantsApp.BOOL_PAUSED)) {
                0.15 < a && (a = 0.15);
                a = Math.round(1E3 * a) / 1E3;
                switch (this._state) {
                    case i.World._STATE_PLAYING:
                        this._moon.updateWithPlayer(a, this._player);
                        this._player.update(a);
                        this._moveDown && (this._levelUp.moveY(this._moveRate * a), this._levelUp.pos._y >= this._moveDest && (this._levelUp.pos._y = this._moveDest, this._moveRate *= -1), -200 >= this._levelUp.pos._y && (this._levelUp.pos._y = -200, this._moveDown = !1, this._moveRate *= -1));
                        this._scrollSpeed = this._player.scrollSpeed();
                        this._levelUpTimer += this._scrollSpeed - this._levelUpCurrent;
                        this._levelUpCurrent = this._scrollSpeed;
                        150 < this._levelUpTimer && (this._levelUpTimer -= 150, g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundLevelUp"), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEvent(f.constants.ConstantsApp.EVENT_LEVEL_UP)));
                        for (this._i = this._ground.length; 0 <= --this._i;) this._ground[this._i].updateWithScrollSpeed(a,
                            this._scrollSpeed), this._ground[this._i].rightEdge() < -2 * f.constants.ConstantsApp.STAGE_WIDTH && (this._ground[this._i].doDelete = !0, this._ground.splice(this._i, 1));
                        for (this._i = this._particles.length; 0 <= --this._i;) this._particles[this._i].update(a), this._particles[this._i].pos.getX() < -2 * f.constants.ConstantsApp.STAGE_WIDTH && (this._particles[this._i].doDelete = !0, this._particles.splice(this._i, 1));
                        for (this._i = this._scores.length; 0 <= --this._i;) this._scores[this._i].updateWithScrollSpeed(a, this._scrollSpeed),
                            this._scores[this._i].pos.getX() < -2 * f.constants.ConstantsApp.STAGE_WIDTH && (this._scores[this._i].doDelete = !0, this._scores.splice(this._i, 1));
                        this._camera._getPos().setX(this._player.pos.getX() + this.getCameraPlayerOffsetX());
                        this._camera._getPos().setY(f.constants.ConstantsApp.STAGE_CENTER_Y);
                        this._testAddNewGroundPiece();
                        this._testDoJelly(a);
                        if (0 < this._effectShakeTimer && (this._effectShakeTimer -= a, !(0 >= this._effectShakeTimer))) {
                            var b = this._camera._getPos();
                            b.setX(b.getX() + g.WorkinUtils.getRandom(-3,
                                3, !1));
                            b = this._camera._getPos();
                            b.setY(b.getY() + g.WorkinUtils.getRandom(-3, 3, !1))
                        }
                        for (this._i = 0; this._i < this._elements.length;) this._elements[this._i].doDelete ? this._removeElementAtIndex(this._i) : !1 == this._elements[this._i].sorted && (this._elements[this._i].sorted = !0), this._i++;
                        this._addScoreCounter(a);
                        this._testGameOver(a)
                }!1 == this._musicPlaying && (g.WorkinCloud.instance._getSound().playMusic("audio/AssetMusic"), this._musicPlaying = !0)
            }
        },
        _setState: function(a) {
            this._state != a && (this._state = a)
        },
        _addGroundPiece: function(a,
            b, e, c) {
            null == c && (c = !0);
            var d = 0 < this._ground.length ? this._ground[this._ground.length - 1].rightEdge() : 0;
            this._ground.push(new i.elements.ground.GroundBase(this, a, d, e, c, b));
            this._addElement(this._ground[this._ground.length - 1])
        },
        _spawnGround: function() {
            this._ground = [];
            this._addGroundPiece(f.constants.ConstantsGround.GROUND_4, 310, 4, !1);
            this._testAddNewGroundPiece()
        },
        _spawnScrollingBackground: function(a, b, e, c, d) {
            this._addElement(new i.elements.environment.ScrollingBackground({
                assets: a,
                x: 0,
                y: 0,
                offset: b,
                tilewidth: e,
                scrollratiox: c,
                scrollratioy: d,
                layer: f.constants.ConstantsApp.LAYER_BG
            }, this))
        },
        _addScore: function(a) {
            this._scores.push(a);
            this._addElement(this._scores[this._scores.length - 1])
        },
        _addParticle: function(a) {
            this._particles.push(a);
            this._addElement(this._particles[this._particles.length - 1])
        },
        _effectsInit: function() {
            this._effectShakeAmp = this._effectShakeTimer = 0
        },
        getScrollSpeed: function() {
            return this._scrollSpeed
        },
        _generate: function() {
            this._viewport = new Z.Viewport(this._timeline);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_BG);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_MOON);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_GROUND);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_PLAYER);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_GROUND_F);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_PARTICLE);
            this._viewport.addLayer(f.constants.ConstantsApp.LAYER_LEVELUP);
            this._elements = [];
            this._music = null;
            this._camera = new l.WorkinMotion(new l.WorkinPoint(f.constants.ConstantsApp.STAGE_CENTER_X,
                f.constants.ConstantsApp.STAGE_CENTER_Y), new l.WorkinPoint(f.constants.ConstantsApp.STAGE_CENTER_X, f.constants.ConstantsApp.STAGE_CENTER_Y));
            this._gameOverTimer = -1;
            this._levelUpTimer = 0;
            this._jellyCounter = this._RESET_JELLY_COUNTER();
            this._scrollSpeed = 0;
            this._isFinalGroundAdded = !1;
            this._levelUp = new i.elements.Element({
                asset: "elements/AssetLevelUp",
                x: f.constants.ConstantsApp.STAGE_CENTER_X - 276,
                y: -200,
                layer: f.constants.ConstantsApp.LAYER_LEVELUP
            });
            this._spawnGround();
            this._moon = new i.elements.entities.Moon({
                asset: "elements/AssetMoon",
                x: f.constants.ConstantsApp.STAGE_CENTER_X,
                y: 60,
                layer: f.constants.ConstantsApp.LAYER_MOON
            }, this);
            this._player = new i.elements.entities.Player({
                x: 100,
                y: -100,
                layer: f.constants.ConstantsApp.LAYER_PLAYER
            }, this._ground, this._moon);
            this._levelUpCurrent = this._player.scrollSpeed();
            this._particles = [];
            this._scores = [];
            this._addElement(new i.elements.environment.Background({
                asset: "elements/AssetBgSkyFlowers",
                y: f.constants.ConstantsApp.STAGE_HEIGHT,
                layer: f.constants.ConstantsApp.LAYER_BG,
                type: f.constants.ConstantsApp.TYPE_BACKGROUND
            }));
            this._spawnScrollingBackground("elements/AssetBgScrolling", f.constants.ConstantsApp.GROUND_Y_BASE - 350, 1100, 0.4, 0.2);
            this._addElement(this._moon);
            this._addElement(this._player);
            this._addElement(this._levelUp);
            this._setState(i.World._STATE_PLAYING);
            this._effectsInit()
        },
        __class__: i.World
    };
    i.elements = {};
    i.elements.Element = function(a) {
        this.group = a.group ? a.group : "";
        this.carriable = !0;
        this._entity = new L;
        this._effects = [];
        this.pos = new l.WorkinPoint;
        this.velocity = new l.WorkinPoint;
        this._renderOffset = new l.WorkinPoint;
        this._scaleOffset = new l.WorkinPoint;
        a.asset ? (this.assetId = a.asset, this._display = new m.ImageSprite(g.WorkinCloud.instance.getAssets().getTexture(this.assetId))) : (this.assetId = "", this._display = new m.Sprite);
        this._entity.add(this._display);
        this._toggleAlphaCount = this._toggleAlphaTimerReset = this._toggleAlphaTimer = 0;
        this.layer = this._defaultLayer();
        a.layer && (this.layer = a.layer);
        var b = new l.WorkinPoint;
        a.ox && b.setX(a.ox);
        a.oy && b.setY(a.oy);
        this.setOrigin(b);
        this.pos.setX(0);
        this.pos.setY(0);
        a.x && this.pos.setX(a.x);
        a.y && this.pos.setY(a.y);
        this.registrationPos = new l.WorkinPoint(this.pos.getX() + this.registrationXOffset(), this.pos.getY() + this.registrationYOffset());
        a.rot && this._display.rotation.set__(a.rot);
        this._type = f.constants.ConstantsApp.TYPE_OBJECT;
        a.type && (this._type = a.type);
        this._flagScaleOffsetChanged = !1;
        this._sin = p.random(100) / 100;
        this._shimmerRandomize();
        this._addEventListeners();
        this.doDelete = !1
    };
    j["com.nick.spongebob.weresquirrel.world.elements.Element"] = i.elements.Element;
    i.elements.Element.__name__ =
        "com,nick,spongebob,weresquirrel,world,elements,Element".split(",");
    i.elements.Element.prototype = {
        disposeDisplay: function() {
            this._display = null
        },
        dispose: function() {
            this._removeEventListeners();
            this._entity.dispose()
        },
        _removeEventListeners: function() {},
        _addEventListeners: function() {},
        moveY: function(a) {
            this.pos._y += a
        },
        setOrigin: function(a) {
            null != this._display && this._display.setAnchor(a.getX(), a.getY())
        },
        _onCompleteEffect: function() {},
        _shimmerRandomize: function() {
            this._shimmerAlphaTarget = Math.round(30 +
                p.random(70)) / 100;
            this._shimmerRate = 0.4 + p.random(4) / 6
        },
        _onApplyEffect: function(a, b, e) {
            var c = e.magnitude;
            switch (a) {
                case "pulse":
                    this._flagScaleOffsetChanged = !0;
                    this._sin += 50 * b * c;
                    this._scaleOffset.to(1 + 0.03 * Math.sin(this._sin), 1 + 0.03 * Math.sin(this._sin));
                    break;
                case "shakex":
                    this._sin += 50 * b;
                    this._renderOffset.to(12 * c * Math.sin(this._sin), 0);
                    break;
                case "shakey":
                    this._sin += 50 * b;
                    this._renderOffset.to(0, 12 * c * Math.sin(this._sin));
                    break;
                case "run":
                    this._sin += 15 * b * c;
                    this._renderOffset.to(0, 5 * Math.sin(this._sin));
                    break;
                case "shake":
                    this._renderOffset.to(c * p.random(4) * (1 >= p.random(2) ? -1 : 1), c * p.random(4) * (1 >= p.random(2) ? -1 : 1));
                    break;
                case "togglealpha":
                    this._toggleAlphaTimer = this._toggleAlphaTimerReset = e._getDurDefault() / e.loops;
                    this._toggleAlphaCount = 0 == e.loops ? 1 : e.loops;
                    break;
                case "shimmer":
                    this._display.alpha._value > this._shimmerAlphaTarget ? (a = this._display.alpha, a.set__(a._value - this._shimmerRate * b), this._display.alpha._value <= this._shimmerAlphaTarget && (this._display.alpha.set__(this._shimmerAlphaTarget),
                        this._shimmerRandomize())) : this._display.alpha._value < this._shimmerAlphaTarget ? (a = this._display.alpha, a.set__(a._value + this._shimmerRate * b), this._display.alpha._value >= this._shimmerAlphaTarget && (this._display.alpha.set__(this._shimmerAlphaTarget), this._shimmerRandomize())) : this._shimmerRandomize();
                    break;
                case "sin":
                    this._sin += 2.6 * b, this._renderOffset.to(50 * c * Math.sin(this._sin), this._renderOffset.getY())
            }
        },
        renderPosition: function(a) {
            this._display.x.set__(this.pos.getX() - a._getPos().getX() + f.constants.ConstantsApp.STAGE_CENTER_X +
                this._renderOffset.getX());
            this._display.y.set__(this.pos.getY() - a._getPos().getY() + f.constants.ConstantsApp.STAGE_CENTER_Y + this._renderOffset.getY());
            this._despawnOffScreen() && this._display.getNaturalWidth()
        },
        updatePositionFromVelocity: function(a) {
            var b = this.pos;
            b.setX(b.getX() + this.velocity.getX() * a);
            b = this.pos;
            b.setY(b.getY() + this.velocity.getY() * a);
            this.registrationPos = new l.WorkinPoint(this.pos.getX() + this.registrationXOffset(), this.pos.getY() + this.registrationYOffset())
        },
        update: function(a) {
            for (var b =
                    0; b < this._effects.length;) this._effects[b].update(a), this._effects[b].isActive() ? this._onApplyEffect(this._effects[b].type, a, this._effects[b]) : this._effects[b]._getWasActive() && this._onCompleteEffect(this._effects[b].type), b++;
            0 < this._toggleAlphaCount && (this._toggleAlphaTimer -= a, 0 > this._toggleAlphaTimer && (this._display.alpha.set__(0 == this._display.alpha._value ? 1 : 0), this._toggleAlphaCount--, 0 < this._toggleAlphaCount && (this._toggleAlphaTimer = this._toggleAlphaTimerReset)))
        },
        registrationYOffset: function() {
            return 0
        },
        registrationXOffset: function() {
            return 0
        },
        _despawnOffScreen: function() {
            return !0
        },
        _getEntity: function() {
            return this._entity
        },
        _defaultLayer: function() {
            return f.constants.ConstantsApp.LAYER_GROUND_F
        },
        __class__: i.elements.Element
    };
    i.elements.Image = function(a) {
        i.elements.Element.call(this, a);
        this._tweens = [];
        a.pId && (this.id = a.pId);
        this._display.scaleX.set__(1);
        this._display.scaleY.set__(1);
        a.pScale && (this._display.scaleX.set__(a.pScale.x), this._display.scaleY.set__(a.pScale.y));
        this._display.rotation.set__(0);
        a.pRot && this._display.rotation.set__(a.pRot);
        this._display.alpha.set__(1);
        a.pAlpha && this._display.alpha.set__(a.pAlpha)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.Image"] = i.elements.Image;
    i.elements.Image.__name__ = "com,nick,spongebob,weresquirrel,world,elements,Image".split(",");
    i.elements.Image.__super__ = i.elements.Element;
    i.elements.Image.prototype = r(i.elements.Element.prototype, {
        _doMotionPoint: function(a) {
            a = a._getPos().copy();
            if (0 == a.getX() % 1) {
                var b = a;
                b.setX(b.getX() + 0.0010)
            }
            0 == a.getY() %
                1 && (b = a, b.setY(b.getY() + 0.0010));
            return a
        },
        _doMotionFloat: function(a) {
            0 == a % 1 && (a += 0.0010);
            return a
        },
        update: function(a) {
            i.elements.Element.prototype.update.call(this, a);
            if (null != this._tweens) {
                var b;
                new l.WorkinPoint;
                for (var e = this._tweens.length - 1; - 1 < e;) {
                    b = this._tweens[e];
                    b.update(a);
                    switch (b._getType()) {
                        case "tx":
                            b.isReady() ? (b = this._doMotionFloat(b._getPos().getX(), a), 0 != b % 1 && this.pos.setX(b)) : b.setStartFast(this.pos.getX(), this.pos.getX());
                            break;
                        case "ty":
                            b.isReady() ? this.pos.setY(this._doMotionFloat(b._getPos().getY(),
                                a)) : b.setStartFast(this.pos.getY(), this.pos.getY());
                            break;
                        case "rtx":
                            b.isReady() ? (b = this._doMotionFloat(b._getPos().getX(), a), 0 != b % 1 && this.pos.setX(b)) : b.setStartFast(this.pos.getX(), this.pos.getX());
                            break;
                        case "rty":
                            b.isReady() ? this.pos.setY(this._doMotionFloat(b._getPos().getY(), a)) : b.setStartFast(this.pos.getY(), this.pos.getY());
                            break;
                        case "t":
                            b.isReady() ? this.pos.toPoint(this._doMotionPoint(b, a)) : b.setStart(this.pos);
                            break;
                        case "sx":
                            b.isReady() ? this._display.scaleX.set__(this._doMotionFloat(b._getPos().getX(),
                                a)) : b.setStartFast(this._display.scaleY._value, this._display.scaleY._value);
                            break;
                        case "sy":
                            b.isReady() ? this._display.scaleY.set__(this._doMotionFloat(b._getPos().getY(), a)) : b.setStartFast(this._display.scaleY._value, this._display.scaleY._value);
                            break;
                        case "s":
                            b.isReady() ? (b = this._doMotionPoint(b, a), this._display.scaleX.set__(b.getX()), this._display.scaleY.set__(b.getY())) : b.setStartFast(this._display.scaleX._value, this._display.scaleY._value);
                            break;
                        case "a":
                            b.isReady() ? this._display.alpha.set__(this._doMotionFloat(b._getPos().getX(),
                                a)) : b.setStartFast(this._display.alpha._value, this._display.alpha._value);
                            break;
                        case "r":
                            b.isReady() ? this._display.rotation.set__(this._doMotionFloat(b._getPos().getX(), a)) : b.setStartFast(this._display.rotation._value, this._display.rotation._value)
                    }
                    this._tweens[e].complete && this._tweens.splice(e, 1);
                    e--
                }
            }
        },
        dispose: function() {
            this._tweens = null;
            i.elements.Element.prototype.dispose.call(this)
        },
        __class__: i.elements.Image
    });
    i.elements.AnimatedElement = function(a) {
        this._currentAnimation = "";
        this._currentFrame =
            0;
        i.elements.Image.call(this, a);
        this._animations = new E;
        this._lastFrame = -1;
        a.library && (this._display.dispose(), a = g.WorkinCloud.instance.getAssets().getLibrary(a.library)._symbols.get(a.movie), this._duration = a.duration, this._frames = a.frames, this._movie = a.createSprite(), this._movie.set_paused(!0), this.tileWidth = this._movie.getNaturalWidth(), this.tileHeight = this._movie.getNaturalHeight(), this._display = this._movie, this._entity.add(this._movie))
    };
    j["com.nick.spongebob.weresquirrel.world.elements.AnimatedElement"] =
        i.elements.AnimatedElement;
    i.elements.AnimatedElement.__name__ = "com,nick,spongebob,weresquirrel,world,elements,AnimatedElement".split(",");
    i.elements.AnimatedElement.__super__ = i.elements.Image;
    i.elements.AnimatedElement.prototype = r(i.elements.Image.prototype, {
        dispose: function() {
            this._animations = this._movie = null;
            i.elements.Image.prototype.dispose.call(this)
        },
        _onAnimationComplete: function() {},
        update: function(a) {
            i.elements.Image.prototype.update.call(this, a);
            if ("" != this._currentAnimation && (0 < this._currentLoop ||
                    this._flagLoop)) this._currentFrame += f.constants.ConstantsApp.FRAMES_PER_SECOND * a, this._currentFrame > this._currentFrameList[1] && (this._currentLoop--, 1 > this._currentLoop && !1 == this._flagLoop ? this._onAnimationComplete(this._currentAnimation) : this._currentFrame = this._currentFrameList[0]), null != this._movie && (this._currentFrame | 0) != this._lastFrame && this._movie.set_position(this._currentFrame / this._frames * this._duration), this._lastFrame = this._currentFrame | 0
        },
        playAnimation: function(a, b) {
            null == b && (b = 0);
            null !=
                this._animations && (this._animations.exists(a) ? (this._currentFrameList = null, this._currentFrameList = this._animations.get(a).slice(), this._currentFrame = this._currentFrameList[0], this._currentAnimation = a, this._currentLoop = b, this._flagLoop = 0 == b) : g.WorkinCloud.instance.log("Animation not found: " + a + " " + p.string(this._animations)))
        },
        addAnimation: function(a, b, e) {
            this._animations.set(a, [b, e])
        },
        __class__: i.elements.AnimatedElement
    });
    i.elements.effects = {};
    i.elements.effects.EffectBasic = function(a) {
        this._lifespanMax =
            0;
        a.lifespan && (this._lifespanMax = a.lifespan);
        this._flagScreenlock = !1;
        a.screenlock && (this._flagScreenlock = a.screenlock);
        this._lifespanRemaining = this._lifespanMax;
        this._flagLifespan = 0 < this._lifespanMax;
        this._gravity = 0;
        a.gravity && (this._gravity = a.gravity);
        this.velocity = new l.WorkinPoint(0, 0);
        a.velocity && (this.velocity = a.velocity.copy());
        a.noAnimation || (a.rows || (a.rows = 4), a.columns || (a.columns = 5));
        i.elements.AnimatedElement.call(this, a);
        a.noAnimation || (this.addAnimation("in", 0, 5), this.addAnimation("idle",
            7, 12), this.addAnimation("out", 13, 17));
        this._setState(0)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.effects.EffectBasic"] = i.elements.effects.EffectBasic;
    i.elements.effects.EffectBasic.__name__ = "com,nick,spongebob,weresquirrel,world,elements,effects,EffectBasic".split(",");
    i.elements.effects.EffectBasic.__super__ = i.elements.AnimatedElement;
    i.elements.effects.EffectBasic.prototype = r(i.elements.AnimatedElement.prototype, {
        _doOut: function() {
            this.playAnimation("out", 1)
        },
        _doIdle: function() {
            this._flagLifespan ?
                this.playAnimation("idle") : this.playAnimation("idle", 1)
        },
        _doIn: function() {
            this.playAnimation("in", 1)
        },
        _setState: function(a) {
            this._state = a;
            switch (this._state) {
                case 0:
                    this._doIn();
                    break;
                case 1:
                    this._doIdle();
                    break;
                case 2:
                    this._doOut()
            }
        },
        _onAnimationComplete: function() {
            0 == this._state ? this._setState(1) : 1 == this._state ? this._flagLifespan || this._setState(2) : 2 == this._state && (this.doDelete = !0)
        },
        _doLifespanDecrement: function(a) {
            2 != this._state && this._flagLifespan && (this._lifespanRemaining -= a, 0 >= this._lifespanRemaining &&
                this._setState(2))
        },
        _doMotion: function(a) {
            var b = this.velocity;
            b.setY(b.getY() + this._gravity * a);
            this.updatePositionFromVelocity(a)
        },
        renderPosition: function(a) {
            this._flagScreenlock ? (this._display.x.set__(f.constants.ConstantsApp.STAGE_CENTER_X - this.tileWidth / 2), this._display.y.set__(f.constants.ConstantsApp.STAGE_CENTER_Y - this.tileHeight / 2)) : i.elements.AnimatedElement.prototype.renderPosition.call(this, a)
        },
        update: function(a) {
            i.elements.AnimatedElement.prototype.update.call(this, a);
            this._doMotion(a);
            this._doLifespanDecrement(a)
        },
        __class__: i.elements.effects.EffectBasic
    });
    i.elements.effects.EffectFloatingScoreText = function(a) {
        i.elements.effects.EffectBasic.call(this, a);
        this._value = "" + p.string(a.score);
        this._text = new m.TextSprite(g.WorkinCloud.instance.getAssets().getFont("fonts/LHFHappyFunBallFlambe"), this._value);
        this._text.x.set__(0);
        this._text.y.set__(0);
        a = this._text.scaleX;
        a.set__(0.8 * a._value);
        a = this._text.scaleY;
        a.set__(0.8 * a._value);
        this._display = this._text;
        this._entity.add(this._display);
        this._stateProgress = 0;
        this.velocity.setY(-50)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.effects.EffectFloatingScoreText"] = i.elements.effects.EffectFloatingScoreText;
    i.elements.effects.EffectFloatingScoreText.__name__ = "com,nick,spongebob,weresquirrel,world,elements,effects,EffectFloatingScoreText".split(",");
    i.elements.effects.EffectFloatingScoreText.__super__ = i.elements.effects.EffectBasic;
    i.elements.effects.EffectFloatingScoreText.prototype = r(i.elements.effects.EffectBasic.prototype, {
        update: function(a) {
            this._doMotion(a);
            0 == this._state ? (this._stateProgress += 3 * a, 1 <= this._stateProgress && this._setState(1)) : 1 == this._state ? this._doLifespanDecrement(a) : 2 == this._state && (this._stateProgress += 3 * a, 1 <= this._stateProgress ? this.doDelete = !0 : this._display.alpha.set__(1 - this._stateProgress / 1))
        },
        updateWithScrollSpeed: function(a, b) {
            this.velocity.setX(-b);
            this.updatePositionFromVelocity(a)
        },
        _setState: function(a) {
            this._state = a;
            this._stateProgress = 0
        },
        __class__: i.elements.effects.EffectFloatingScoreText
    });
    i.elements.effects.EffectShake =
        function(a, b) {
            null == b && (b = 4);
            i.elements.effects.EffectBasic.call(this, {});
            this._length = a;
            this._amp = b
        };
    j["com.nick.spongebob.weresquirrel.world.elements.effects.EffectShake"] = i.elements.effects.EffectShake;
    i.elements.effects.EffectShake.__name__ = "com,nick,spongebob,weresquirrel,world,elements,effects,EffectShake".split(",");
    i.elements.effects.EffectShake.__super__ = i.elements.effects.EffectBasic;
    i.elements.effects.EffectShake.prototype = r(i.elements.effects.EffectBasic.prototype, {
        __class__: i.elements.effects.EffectShake
    });
    i.elements.entities = {};
    i.elements.entities.Moon = function(a, b) {
        i.elements.AnimatedElement.call(this, a);
        this._world = b;
        this._sinCounter = 0;
        this._changeTimer = 3;
        this._shakeTimer = -1;
        this._cloudLeft = new i.elements.Element({
            asset: "elements/AssetCloud",
            layer: f.constants.ConstantsApp.LAYER_GROUND
        });
        var e = this._cloudLeft._display.scaleX;
        e.set__(-1 * e._value);
        this._cloudRight = new i.elements.Element({
            asset: "elements/AssetCloud",
            layer: f.constants.ConstantsApp.LAYER_GROUND
        });
        this._laserClip = new i.elements.Element({
            asset: "elements/AssetLaser",
            layer: f.constants.ConstantsApp.LAYER_GROUND
        });
        this._laserClip.pos._x += f.constants.ConstantsApp.STAGE_CENTER_X - 210;
        this._laserClip.pos._y += 50;
        this._world._addElement(this._laserClip);
        this._world._addElement(this._cloudLeft);
        this._world._addElement(this._cloudRight);
        this._cloudLeft.pos._x = this._BASE_CLOUDL_X();
        this._cloudLeft.pos._y = this._BASE_CLOUD_Y();
        this._cloudRight.pos._x = this._BASE_CLOUDR_X();
        this._cloudRight.pos._y = this._BASE_CLOUD_Y();
        this.pos.toPoint(this._BASE_POS());
        this._setState(2)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.entities.Moon"] =
        i.elements.entities.Moon;
    i.elements.entities.Moon.__name__ = "com,nick,spongebob,weresquirrel,world,elements,entities,Moon".split(",");
    i.elements.entities.Moon.__super__ = i.elements.AnimatedElement;
    i.elements.entities.Moon.prototype = r(i.elements.AnimatedElement.prototype, {
        updateWithPlayer: function(a, b) {
            i.elements.AnimatedElement.prototype.update.call(this, a);
            this._sinCounter += a;
            this._cloudLeft.pos._y = this._cloudRight.pos._y = this._BASE_CLOUD_Y() + Math.sin(this._sinCounter) * this._SINAMP();
            switch (this._state) {
                case 1:
                    this._cloudLeft.pos._x -=
                        this._CLOUD_MOVE_SPEED() * a;
                    this._cloudRight.pos._x += this._CLOUD_MOVE_SPEED() * a;
                    this._cloudLeft.pos._x <= this._CLOUDL_MOVE_X() && this._setState(0);
                    break;
                case 3:
                    this._cloudLeft.pos._x += this._CLOUD_MOVE_SPEED() * a, this._cloudRight.pos._x -= this._CLOUD_MOVE_SPEED() * a, this._cloudLeft.pos._x >= this._BASE_CLOUDL_X() && this._setState(2)
            }
            0 < this._laserTimer ? (this._laserTimer -= a, this._laserClip._display.set_visible(!0), this._laserClip._display.alpha.set__(this._laserTimer / this._LASER_RESET()), this._laserClip._display.rotation.set__((new l.WorkinLine(this.pos,
                new l.WorkinPoint(b.pos._x, b.pos._y - 100))).vector().getAngle() - 90)) : this._laserClip._display.set_visible(!1);
            this._changeTimer -= a; - 1 == this._shakeTimer && this._changeTimer <= this._SHAKE_TIME() && (this._shakeTimer = this._SHAKE_TIME(), g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundMoon"));
            0 > this._changeTimer && this.toggleOpen();
            0 < this._shakeTimer && (this._shakeTimer -= a, 0 >= this._shakeTimer ? this.pos.toPoint(this._BASE_POS()) : this.pos.to(this._BASE_POS().getX() + this._SHAKE_AMOUNT() - g.WorkinUtils.getRandom(0,
                2 * this._SHAKE_AMOUNT()), this._BASE_POS().getY() + this._SHAKE_AMOUNT() - g.WorkinUtils.getRandom(0, 2 * this._SHAKE_AMOUNT())))
        },
        _setState: function(a) {
            switch (a) {
                case 0:
                    this._cloudLeft.pos._x = this._CLOUDL_MOVE_X();
                    this._cloudRight.pos._x = this._CLOUDR_MOVE_X();
                    break;
                case 1:
                    this._laserTimer = this._LASER_RESET();
                    break;
                case 2:
                    this._cloudLeft.pos._x = this._BASE_CLOUDL_X(), this._cloudRight.pos._x = this._BASE_CLOUDR_X()
            }
            this._state = a
        },
        toggleOpen: function() {
            switch (this._state) {
                case 0:
                    this._setState(3);
                    break;
                case 2:
                    this._setState(1)
            }
            this.pos.toPoint(this._BASE_POS());
            this._shakeTimer = -1;
            this._changeTimer = this._RESET_CHANGE_TIMER()
        },
        isOpen: function() {
            return 0 == this._state || 1 == this._state
        },
        _LASER_RESET: function() {
            return 2
        },
        _SHAKE_AMOUNT: function() {
            return 5
        },
        _SHAKE_TIME: function() {
            return 3
        },
        _RESET_CHANGE_TIMER: function() {
            return this.isOpen() ? 30 : g.WorkinUtils.getRandom(10, 25, !1)
        },
        _CLOUD_MOVE_SPEED: function() {
            return 300
        },
        _CLOUDR_MOVE_X: function() {
            return this._BASE_CLOUDR_X() + this._CLOUD_MOVE_X()
        },
        _CLOUDL_MOVE_X: function() {
            return this._BASE_CLOUDL_X() - this._CLOUD_MOVE_X()
        },
        _CLOUD_MOVE_X: function() {
            return 150
        },
        _BASE_CLOUDR_X: function() {
            return f.constants.ConstantsApp.STAGE_CENTER_X - 215
        },
        _BASE_CLOUDL_X: function() {
            return f.constants.ConstantsApp.STAGE_CENTER_X - 10
        },
        _BASE_CLOUD_Y: function() {
            return 20
        },
        _SINAMP: function() {
            return 15
        },
        _BASE_POS: function() {
            return new l.WorkinPoint(f.constants.ConstantsApp.STAGE_CENTER_X - 185, 10)
        },
        __class__: i.elements.entities.Moon
    });
    i.elements.entities.Player = function(a, b, e) {
        a.library = "anim_player";
        a.movie = "AssetWeresquirrelAniAll";
        i.elements.AnimatedElement.call(this,
            a);
        this._ground = b;
        this._moon = e;
        this._onGround = !1;
        this._jumping = this._isScrolling = !0;
        this._fallOut = this._pressedUp = !1;
        this._ignoreColTime = this._jumpTimer = -1;
        this._testPoint = new l.WorkinPoint(0, 0);
        this._scrollSpeed = this._START_SPEED();
        this._jumpCount = this._JUMP_MAX();
        this._collRect = new F.Rectangle(0, 0, 58, 102);
        this._collOffset = new l.WorkinPoint(-13, -102);
        this._wolf = !1;
        this.setOrigin(new l.WorkinPoint(120, 0));
        this.addAnimation("wolf_idle", 0, 39);
        this.addAnimation("wolf_run", 40, 79);
        this.addAnimation("wolf_jump",
            80, 119);
        this.addAnimation("wolf_hit", 120, 130);
        this.addAnimation("wolf_smash1", 132, 151);
        this.addAnimation("wolf_smash2", 152, 173);
        this.addAnimation("sandy_idle", 174, 193);
        this.addAnimation("sandy_run", 194, 213);
        this.addAnimation("sandy_jump", 214, 253);
        this.addAnimation("sandy_hit", 254, 265);
        this._doAnimate("jump");
        this._setState(0)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.entities.Player"] = i.elements.entities.Player;
    i.elements.entities.Player.__name__ = "com,nick,spongebob,weresquirrel,world,elements,entities,Player".split(",");
    i.elements.entities.Player.__super__ = i.elements.AnimatedElement;
    i.elements.entities.Player.prototype = r(i.elements.AnimatedElement.prototype, {
        _doAnimate: function(a, b) {
            null == b && (b = 0);
            null == a && (a = "current");
            "current" == a && (a = this._currentAnim);
            this.playAnimation((this._wolf ? "wolf_" : "sandy_") + a, b);
            this._currentAnim = a
        },
        _onAnimationComplete: function() {
            "smash1" == this._currentAnim && (this._jumping ? this._doAnimate("jump") : this._doAnimate("run"))
        },
        hitFrontPiece: function() {
            this._setState(1);
            return !0
        },
        hitPickupAcorn: function() {
            return !0
        },
        hitObstacleFish: function() {
            return this._wolf ? (this._setState(1), !0) : !1
        },
        hitObstacleWolfBreak: function() {
            if (this._wolf) return this._doAnimate("smash1", 1), !0;
            this._setState(1);
            return !1
        },
        _testToggleWolf: function() {
            if (0 == this._state) {
                var a = !1;
                this._moon.isOpen() && !1 == this._wolf ? this._wolf = a = !0 : !this._moon.isOpen() && !0 == this._wolf && (a = !0, this._wolf = !1);
                a && (this._doAnimate(), this._jumping || (this._jumpCount = this._JUMP_MAX()), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_CHANGE_WOLF,
                    this.pos)), this._wolf ? (g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundTransform2"), a = this._display.scaleX, a.set__(0.8 * a._value), a = this._display.scaleY, a.set__(0.8 * a._value)) : (g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundSandyTransform"), a = this._display.scaleX, a.set__(a._value / 0.8), a = this._display.scaleY, a.set__(a._value / 0.8)))
            }
        },
        _testHitObstacle: function() {
            null != this._ground && (this._i = this._ground.length);
            for (; 0 <= --this._i;) this._ground[this._i].testObstacleCollision(this,
                this._wolf)
        },
        _testCollision: function() {
            if (!(0 < this._ignoreColTime)) {
                this._onGround = !1;
                this._onLine = null;
                var a;
                a = this._wolf ? 95 : 65;
                for (this._i = this._ground.length; 0 <= --this._i;)
                    for (var b = 0, e = 0, c = this._ground[this._i].collision; e < c.length;) {
                        ++e;
                        var d = this._ground[this._i].collision[b];
                        this.pos.getX() > d.p0().getX() && this.pos.getX() < d.p1().getX() && (this.pos.getY() >= d.yOnSlope(this.pos.getX()) - a && this.pos.getY() < d.yOnSlope(this.pos.getX()) + 200 ? (this._onLine = d, this._onGround = !0) : (this._onGround = !1, this._onLine =
                            null));
                        b++
                    }
                this._onGround && this._jumping && this._stopJump(); - 100 == this._testPoint.getX() && (this._setState(1), this._fallOut = !0, this._testPoint.toPoint(this.pos))
            }
        },
        doJump: function() {
            this._doAnimate("jump", 1);
            this._ignoreColTime = this._IGNORE_RESET();
            this._jumpCount--;
            this._onGround = !1;
            this.velocity.setY(-this._INIT_JUMP());
            this._jumpTimer = this._JUMP_TIME();
            this._jumping = !0;
            this._wolf ? g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundBigJump") : g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundSmallJump")
        },
        _stopJump: function() {
            this._wolf ? (g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundBigLand"), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_EFFECT_SHAKE, new i.elements.effects.EffectShake(0.5)))) : g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundSmallLand");
            this._jumping = !1;
            this._jumpCount = this._JUMP_MAX();
            "smash1" != this._currentAnim && 0 == this._state && this._doAnimate("run")
        },
        _updateCollision: function() {
            this._collRect.x =
                this.pos.getX() + this._collOffset.getX();
            this._collRect.y = this.pos.getY() + this._collOffset.getY()
        },
        update: function(a) {
            i.elements.AnimatedElement.prototype.update.call(this, a);
            for (this._i = 0; this._i < this._ground.length;) this._ground[this._i].doDelete && this._ground.splice(this._i, 1), this._i++;
            0 < this._ignoreColTime && (this._ignoreColTime -= a);
            if (0 < this._jumpTimer) {
                var b = this.velocity;
                b.setY(b.getY() - this._JUMP_STRENGTH() * a)
            }
            0 < this._jumpTimer && (this._jumpTimer -= a, 0 >= this._jumpTimer && (this._jumpTimer = -1));
            this._testToggleWolf();
            this._wolf ? this._scrollSpeed < this._SCROLL_SPEED_MAX() && (this._scrollSpeed += this._WOLF_SPEED_INC() * a) : this._scrollSpeed < this._SCROLL_SPEED_MAX() && (this._scrollSpeed += this._WALK_SPEED_INC() * a);
            b = this.velocity;
            b.setY(b.getY() + this._GRAVITY() * a);
            b = this._wolf ? 90 : 60;
            switch (this._state) {
                case 0:
                    this._onGround ? this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this._onLine.yOnSlope(this.pos.getX()) - b) : this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this.pos.getY() + this.velocity.getY() *
                        a);
                    this._testCollision(a);
                    this.velocity.to((this._testPoint.getX() - this.pos.getX()) / a, (this._testPoint.getY() - this.pos.getY()) / a);
                    if (Math.isNaN(this.velocity.getX()) || Math.isNaN(this.velocity.getY())) this.velocity = new l.WorkinPoint;
                    this.updatePositionFromVelocity(a);
                    this._updateCollision();
                    this._testHitObstacle();
                    break;
                case 1:
                    this._onGround ? this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this._onLine.yOnSlope(this.pos.getX()) - b) : this._testPoint.to(this.pos.getX() + this.velocity.getX() * a,
                        this.pos.getY() + this.velocity.getY() * a);
                    this._testCollision(a);
                    this.velocity.to((this._testPoint.getX() - this.pos.getX()) / a, (this._testPoint.getY() - this.pos.getY()) / a);
                    if (Math.isNaN(this.velocity.getX()) || Math.isNaN(this.velocity.getY())) this.velocity = new l.WorkinPoint;
                    this.updatePositionFromVelocity(a);
                    break;
                case 3:
                    this._onGround ? this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this._onLine.yOnSlope(this.pos.getX()) - b) : this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this.pos.getY() +
                        this.velocity.getY() * a);
                    this._testCollision(a);
                    this.velocity.to((this._testPoint.getX() - this.pos.getX()) / a, (this._testPoint.getY() - this.pos.getY()) / a);
                    if (Math.isNaN(this.velocity.getX()) || Math.isNaN(this.velocity.getY())) this.velocity = new l.WorkinPoint;
                    this.updatePositionFromVelocity(a)
            }
            this.pos.getY() - this._display.getNaturalHeight() > f.constants.ConstantsApp.STAGE_HEIGHT && this._setState(2);
            this._onGround && 0 < this.velocity.getY() && this.velocity.setY(0)
        },
        _setState: function(a) {
            if (this._state != a) {
                switch (a) {
                    case 1:
                        this._wolf ?
                            g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundSandyHurt2") : g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundSandyHurt1");
                        this._doAnimate("hit", 1);
                        this.velocity.to(0, -this._INIT_JUMP());
                        this._isScrolling = !1;
                        break;
                    case 2:
                        this.velocity.to(0, 0);
                        this._isScrolling = !1;
                        break;
                    case 3:
                        this._isScrolling = !1, this._doAnimate("idle")
                }
                this._state = a
            }
        },
        getJumpCount: function() {
            return this._jumpCount
        },
        getState: function() {
            return this._state
        },
        isWolf: function() {
            return this._wolf
        },
        isEnded: function() {
            return 3 ==
                this._state
        },
        isDead: function() {
            return 1 == this._state || 2 == this._state
        },
        scrollSpeed: function() {
            return this._isScrolling ? this._scrollSpeed : 0
        },
        setPressedUp: function(a) {
            this._pressedUp = a
        },
        isPressedUp: function() {
            return this._pressedUp
        },
        _IGNORE_RESET: function() {
            return 0.5
        },
        _JUMP_MAX: function() {
            return this._wolf ? 2 : 2
        },
        _JUMP_TIME: function() {
            return 0.3
        },
        _WALK_SPEED_INC: function() {
            return this._WOLF_SPEED_INC()
        },
        _WOLF_SPEED_INC: function() {
            return 10
        },
        _SCROLL_SPEED_MAX: function() {
            return 2E3
        },
        _START_SPEED: function() {
            return 250
        },
        _JUMP_STRENGTH: function() {
            return 1300
        },
        _INIT_JUMP: function() {
            return 350
        },
        _GRAVITY: function() {
            return 1200
        },
        __class__: i.elements.entities.Player
    });
    i.elements.environment = {};
    i.elements.environment.Background = function(a) {
        i.elements.Element.call(this, a)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.environment.Background"] = i.elements.environment.Background;
    i.elements.environment.Background.__name__ = "com,nick,spongebob,weresquirrel,world,elements,environment,Background".split(",");
    i.elements.environment.Background.__super__ =
        i.elements.Element;
    i.elements.environment.Background.prototype = r(i.elements.Element.prototype, {
        renderPosition: function() {
            this._display.x.set__(this._display.y.set__(0))
        },
        __class__: i.elements.environment.Background
    });
    i.elements.environment.ScrollingBackground = function(a, b) {
        a.type = f.constants.ConstantsApp.TYPE_BACKGROUND;
        i.elements.Element.call(this, a);
        this._display.dispose();
        this._lastCameraPos = new l.WorkinPoint(f.constants.ConstantsApp.STAGE_CENTER_X, 0);
        this._tilePos = [];
        this._tiles = [];
        this._tileAsset =
            a.assets;
        this._tileWidth = a.tilewidth;
        this._scrollRatioX = a.scrollratiox;
        this._scrollRatioY = a.scrollratioy;
        this._offsetY = a.offset;
        this._world = b;
        this._spawnTiles()
    };
    j["com.nick.spongebob.weresquirrel.world.elements.environment.ScrollingBackground"] = i.elements.environment.ScrollingBackground;
    i.elements.environment.ScrollingBackground.__name__ = "com,nick,spongebob,weresquirrel,world,elements,environment,ScrollingBackground".split(",");
    i.elements.environment.ScrollingBackground.__super__ = i.elements.Element;
    i.elements.environment.ScrollingBackground.prototype = r(i.elements.Element.prototype, {
        dispose: function() {
            for (var a = 0, b = this._tiles; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
            this._tiles = null;
            i.elements.Element.prototype.dispose.call(this)
        },
        renderPosition: function(a, b) {
            null == b && (b = 0);
            for (var e = -b * this._world.getScrollSpeed(), c = this._tilePos.length; 0 < c;) {
                c--;
                var d = this._tilePos[c];
                d.setX(d.getX() + e * this._scrollRatioX);
                this._tilePos[c].setY(0 == this._scrollRatioY ? 0 : this._offsetY - a._getPos().getY() + f.constants.ConstantsApp.STAGE_CENTER_Y);
                0 > this._tilePos[c].getX() + this._tileWidth && (this._tilePos[c].setX(this._tilePos[this._tilePos.length - 1].getX() + this._tileWidth), d = this._tilePos[c], this._tilePos.splice(c, 1), this._tilePos.push(d))
            }
            for (c = 0; c < this._tiles.length;) this._tiles[c].x.set__(this._tilePos[c].getX()), this._tiles[c].y.set__(this._tilePos[c].getY()), c++;
            this._lastCameraPos.setX(a._getPos().getX())
        },
        _spawnTile: function(a) {
            var b = new L;
            this._entity.addChild(b);
            var e = new m.ImageSprite(g.WorkinCloud.instance.getAssets().getTexture(this._tileAsset));
            e.x.set__(a);
            e.y.set__(this._offsetY);
            this._tiles.push(e);
            b.add(e);
            this._tilePos.push(new l.WorkinPoint(e.x._value, e.y._value));
            return this._tileWidth
        },
        _spawnTiles: function() {
            for (this._totalWidth = -f.constants.ConstantsApp.STAGE_WIDTH; this._totalWidth < 3 * f.constants.ConstantsApp.STAGE_WIDTH;) this._totalWidth += this._spawnTile(this._totalWidth)
        },
        __class__: i.elements.environment.ScrollingBackground
    });
    i.elements.ground = {};
    i.elements.ground.Acorn = function(a) {
        this._sinDisplay = Math.random() * Math.PI;
        i.elements.Element.call(this,
            a)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.ground.Acorn"] = i.elements.ground.Acorn;
    i.elements.ground.Acorn.__name__ = "com,nick,spongebob,weresquirrel,world,elements,ground,Acorn".split(",");
    i.elements.ground.Acorn.__super__ = i.elements.Element;
    i.elements.ground.Acorn.prototype = r(i.elements.Element.prototype, {
        renderPosition: function(a) {
            i.elements.Element.prototype.renderPosition.call(this, a);
            a = this._display.y;
            a.set__(a._value + 80 * Math.sin(this._sinDisplay))
        },
        update: function(a) {
            i.elements.Element.prototype.update.call(this,
                a);
            this._sinDisplay += 2 * a
        },
        hitPlayer: function() {
            this._display.set_visible(!1);
            g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundBonus")
        },
        testCollision: function(a, b, e) {
            return this.pos.getX() + 5 > a.getX() - b && this.pos.getX() - 5 < a.getX() && this.pos.getY() > a.getY() - e && this.pos.getY() < a.getY() + 1.5 * e ? !0 : !1
        },
        __class__: i.elements.ground.Acorn
    });
    i.elements.ground.Fish = function(a) {
        this._active = !0;
        a.library = "anim_fish";
        a.movie = "AssetFishAniAll";
        i.elements.AnimatedElement.call(this, a);
        switch (g.WorkinUtils.getRandom(0,
            1, !0) | 0) {
            case 0:
                this._fish1 = !0;
                break;
            default:
                this._fish1 = !1
        }
        this.addAnimation("fish1_idle", 0, 39);
        this.addAnimation("fish1_happy", 40, 69);
        this.addAnimation("fish1_angry", 70, 85);
        this.addAnimation("fish2_idle", 86, 125);
        this.addAnimation("fish2_happy", 126, 155);
        this.addAnimation("fish2_angry", 156, 171);
        this._doAnimate("idle")
    };
    j["com.nick.spongebob.weresquirrel.world.elements.ground.Fish"] = i.elements.ground.Fish;
    i.elements.ground.Fish.__name__ = "com,nick,spongebob,weresquirrel,world,elements,ground,Fish".split(",");
    i.elements.ground.Fish.__super__ = i.elements.AnimatedElement;
    i.elements.ground.Fish.prototype = r(i.elements.AnimatedElement.prototype, {
        _doAnimate: function(a, b) {
            null == b && (b = 0);
            null == a && (a = "current");
            "current" == a && (a = this._currentAnim);
            this.playAnimation((this._fish1 ? "fish1_" : "fish2_") + a, b);
            this._currentAnim = a
        },
        hitPlayerGood: function() {
            g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundVillagerHappy");
            this._doAnimate("happy");
            this._active = !1
        },
        hitPlayerBad: function() {
            g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundVillagerAngry1");
            this._doAnimate("angry");
            this._active = !1
        },
        testCollision: function(a, b, e) {
            return this.pos.getX() + 10 > a.getX() - b && this.pos.getX() - 10 < a.getX() && this.pos.getY() > a.getY() - 500 && this.pos.getY() < a.getY() + 1.5 * e ? !0 : !1
        },
        update: function(a) {
            i.elements.AnimatedElement.prototype.update.call(this, a)
        },
        isActive: function() {
            return this._active
        },
        __class__: i.elements.ground.Fish
    });
    i.elements.ground.GroundBase = function(a, b, e, c, d, h) {
        this._world = a;
        this._groundNum = c;
        this.collision = [];
        this._elements = [];
        this._rocks = [];
        this._fish = [];
        this._acorns = [];
        i.elements.Element.call(this, {});
        this._frontPiece = new i.elements.Element({
            asset: b,
            layer: f.constants.ConstantsApp.LAYER_GROUND_F
        });
        this._world._addElement(this._frontPiece);
        a = e + g.WorkinUtils.getRandom(25, 80, !1);
        0 < e && (a += g.WorkinUtils.getRandom(310, 550, !1) * (h / 750));
        this.pos.to(a, 400 - g.WorkinUtils.getRandom(0, 100, !1));
        this._allowObstacles = d;
        this._scroll = h;
        this._setupForeground();
        this._setupElements();
        switch (g.WorkinUtils.getRandom(0, 3) | 0) {
            case 0:
                this._drift = 1 != this._groundNum && 3 !=
                    this._groundNum ? !0 : !1;
                break;
            default:
                this._drift = !1
        }
        this._baseY = this.pos.getY();
        this._sinAmp = g.WorkinUtils.getRandom(20, 80, !1);
        this._sinFreq = g.WorkinUtils.getRandom(1, 3, !1);
        this._sinCounter = 0;
        this._setupCollision()
    };
    j["com.nick.spongebob.weresquirrel.world.elements.ground.GroundBase"] = i.elements.ground.GroundBase;
    i.elements.ground.GroundBase.__name__ = "com,nick,spongebob,weresquirrel,world,elements,ground,GroundBase".split(",");
    i.elements.ground.GroundBase.__super__ = i.elements.Element;
    i.elements.ground.GroundBase.prototype =
        r(i.elements.Element.prototype, {
            dispose: function() {
                null != this.collision && (this._i = this.collision.length);
                for (; 0 <= --this._i;) this.collision[this._i] = null;
                this.collision = null;
                null != this._rocks && (this._i = this._rocks.length);
                for (; 0 <= --this._i;) this._rocks[this._i].doDelete = !0;
                this._rocks = null;
                null != this._fish && (this._i = this._fish.length);
                for (; 0 <= --this._i;) this._fish[this._i].doDelete = !0;
                this._fish = null;
                null != this._acorns && (this._i = this._acorns.length);
                for (; 0 <= --this._i;) this._acorns[this._i].doDelete = !0;
                this._acorns = null;
                null != this._elements && (this._i = this._elements.length);
                for (; 0 <= --this._i;) this._elements[this._i].doDelete = !0;
                this._elements = null;
                this._frontPiece.doDelete;
                this._backPiece.doDelete;
                this._frontPieceOffset = null;
                i.elements.Element.prototype.dispose.call(this)
            },
            testObstacleCollision: function(a, b) {
                var e, c;
                b ? (e = 100, c = 90) : (e = 100, c = 60);
                a.pos.getX() > this.rightEdge() - 50 && a.pos.getX() < this.rightEdge() + 200 && a.pos.getY() > this._frontPiece.pos.getY() + 80 && a.hitFrontPiece();
                for (this._i = this._rocks.length; 0 <=
                    --this._i;) this._rocks[this._i].testCollision(new l.WorkinPoint(a.pos._x, a.pos._y), e, c) && a.hitObstacleWolfBreak() && (this._rocks[this._i].doBreak(this._rocks[this._i].pos), this._world._removeElement(this._rocks[this._i]), this._rocks.splice(this._i, 1), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_SCORE_POPUP, {
                    amount: 10
                })), g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundCrashRock"), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_ROCK_BREAK,
                    new l.WorkinPoint(a.pos.getX() + 75, a.pos.getY()))), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_EFFECT_SHAKE, new i.elements.effects.EffectShake(1, 8))));
                for (this._i = this._fish.length; 0 <= --this._i;) this._fish[this._i].testCollision(new l.WorkinPoint(a.pos.getX(), a.pos.getY()), e, c) && this._fish[this._i].isActive() && (a.hitObstacleFish() ? this._fish[this._i].hitPlayerBad() : (!0 == this._fish[this._i].isActive() && g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_SCORE_POPUP, {
                    amount: 10
                })), this._fish[this._i].hitPlayerGood()));
                for (this._i = this._acorns.length; 0 <= --this._i;) this._acorns[this._i].testCollision(new l.WorkinPoint(a.pos.getX(), a.pos.getY()), e, c) && a.hitPickupAcorn() && (this._acorns[this._i].hitPlayer(), this._acorns[this._i].doDelete, this._acorns.splice(this._i, 1), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_BURST_ORANGE, new l.WorkinPoint(a.pos.getX() + 50, a.pos.getY() + 50))), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_SCORE_POPUP, {
                    amount: 25
                })))
            },
            renderPosition: function(a) {
                i.elements.Element.prototype.renderPosition.call(this, a);
                this._frontPiece.pos._x = this._display.x._value + this._frontPieceOffset.getX();
                this._frontPiece.pos._x = this._display.y._value + this._frontPieceOffset.getY()
            },
            updateWithScrollSpeed: function(a, b) {
                this.velocity.setX(-b);
                this.updatePositionFromVelocity(a);
                if (this._drift) {
                    this._sinCounter += a * this._sinFreq;
                    this.pos.setY(this._baseY + Math.sin(this._sinCounter) * this._sinAmp);
                    for (var e = 0, c = this.collision; e < c.length;) {
                        var d =
                            c[e];
                        ++e;
                        d.p0().setY(this._baseY + Math.sin(this._sinCounter) * this._sinAmp);
                        d.p1().setY(this._baseY + Math.sin(this._sinCounter) * this._sinAmp)
                    }
                }
                this._frontPiece.pos._x = this.pos._x;
                this._frontPiece.pos._y = this.pos._y;
                this._backPiece.pos._x = this.pos._x + this._backPiece.moveOffsetX;
                this._backPiece.pos._y = this.pos._y - this._backPiece.moveOffsetY;
                e = 0;
                for (c = this._elements; e < c.length;) d = c[e], ++e, d.pos._x = this.pos._x + d.moveOffsetX, d.pos._y = this.pos._y - d.moveOffsetY;
                e = 0;
                for (c = this._rocks; e < c.length;) d = c[e], ++e,
                    d.pos._x = this.pos._x + d.moveOffsetX, d.pos._y = this.pos._y - d.moveOffsetY;
                e = 0;
                for (c = this._fish; e < c.length;) d = c[e], ++e, d.pos._x = this.pos._x + d.moveOffsetX, d.pos._y = this.pos._y - d.moveOffsetY, d.update(a);
                e = 0;
                for (c = this._acorns; e < c.length;) d = c[e], ++e, d.pos._x = this.pos._x + d.moveOffsetX, d.pos._y = this.pos._y - d.moveOffsetY, d.update(a);
                e = 0;
                for (c = this.collision; e < c.length;) d = c[e], ++e, d.velocity.setX(-b), d.updatePositionFromVelocity(a)
            },
            _positionAcorn: function() {
                if (2 == this._groundNum) switch (g.WorkinUtils.getRandom(0,
                    7, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(100, 180);
                    case 1:
                        return new l.WorkinPoint(200, 180);
                    case 2:
                        return new l.WorkinPoint(400, 180);
                    case 3:
                        return new l.WorkinPoint(500, 180);
                    case 4:
                        return new l.WorkinPoint(600, 180);
                    case 5:
                        return new l.WorkinPoint(700, 180);
                    case 6:
                        return new l.WorkinPoint(800, 180);
                    case 7:
                        return new l.WorkinPoint(900, 180);
                    default:
                        return new l.WorkinPoint(0, 0)
                } else switch (g.WorkinUtils.getRandom(0, 3, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(230, 180);
                    case 1:
                        return new l.WorkinPoint(450, 130);
                    case 2:
                        return new l.WorkinPoint(530, 130);
                    case 3:
                        return new l.WorkinPoint(630, 180);
                    default:
                        return new l.WorkinPoint(0, 0)
                }
            },
            _positionRocks: function() {
                if (4 == this._groundNum) switch (g.WorkinUtils.getRandom(0, 7, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(100, 110);
                    case 1:
                        return new l.WorkinPoint(200, 120);
                    case 2:
                        return new l.WorkinPoint(400, 120);
                    case 3:
                        return new l.WorkinPoint(500, 120);
                    case 4:
                        return new l.WorkinPoint(600, 130);
                    case 5:
                        return new l.WorkinPoint(700, 130);
                    case 6:
                        return new l.WorkinPoint(800, 110);
                    case 7:
                        return new l.WorkinPoint(900,
                            140);
                    default:
                        return new l.WorkinPoint(0, 0)
                } else switch (g.WorkinUtils.getRandom(0, 3, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(230, 130);
                    case 1:
                        return new l.WorkinPoint(450, 70);
                    case 2:
                        return new l.WorkinPoint(530, 80);
                    case 3:
                        return new l.WorkinPoint(630, 100);
                    default:
                        return new l.WorkinPoint(0, 0)
                }
            },
            _positionFish: function() {
                if (2 == this._groundNum) switch (g.WorkinUtils.getRandom(0, 7, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(100, 50);
                    case 1:
                        return new l.WorkinPoint(200, 60);
                    case 2:
                        return new l.WorkinPoint(400, 60);
                    case 3:
                        return new l.WorkinPoint(500, 60);
                    case 4:
                        return new l.WorkinPoint(600, 60);
                    case 5:
                        return new l.WorkinPoint(700, 60);
                    case 6:
                        return new l.WorkinPoint(800, 50);
                    case 7:
                        return new l.WorkinPoint(900, 70);
                    default:
                        return new l.WorkinPoint(0, 0)
                } else switch (g.WorkinUtils.getRandom(0, 3, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(230, 80);
                    case 1:
                        return new l.WorkinPoint(450, 0);
                    case 2:
                        return new l.WorkinPoint(530, 10);
                    case 3:
                        return new l.WorkinPoint(630, 50);
                    default:
                        return new l.WorkinPoint(0, 0)
                }
            },
            _addObstacles: function(a,
                b) {
                var e;
                if (1 == this._groundNum || 4 == this._groundNum) {
                    e = Math.floor(3.75 * b / 1E3) + (3 - 6 * Math.random());
                    if (0 > e || !a) e = 0;
                    for (; this._rocks.length < e;) {
                        var c = this._positionRocks(),
                            d = new i.elements.ground.RockPile({
                                asset: "elements/AssetRock.png",
                                x: this.pos.getX() + c.getX(),
                                y: this.pos.getY() - c.getY(),
                                layer: f.constants.ConstantsApp.LAYER_PLAYER
                            });
                        d.moveOffsetX = c.getX();
                        d.moveOffsetY = c.getY();
                        this._rocks.push(d);
                        this._world._addElement(d)
                    }
                } else {
                    e = Math.floor(3.75 * b / 1E3) + -3 * Math.random();
                    for (2 > e && (e = 2); this._fish.length <
                        e;) c = this._positionFish(), d = new i.elements.ground.Fish({
                        x: this.pos.getX() + c.getX(),
                        y: this.pos.getY() - c.getY(),
                        layer: f.constants.ConstantsApp.LAYER_PLAYER
                    }), d.moveOffsetX = c.getX(), d.moveOffsetY = c.getY(), this._fish.push(d), this._world._addElement(d)
                }
                for (e = a ? g.WorkinUtils.getRandom(0, 2, !1) : 0; this._acorns.length < e;) c = this._positionAcorn(), d = new i.elements.ground.Acorn({
                        asset: "elements/AssetAcorn.png",
                        x: this.pos.getX() + c.getX(),
                        y: this.pos.getY() - c.getY(),
                        layer: f.constants.ConstantsApp.LAYER_PLAYER
                    }), d.moveOffsetX =
                    c.getX(), d.moveOffsetY = c.getY(), this._acorns.push(d), this._world._addElement(d)
            },
            _positionBuilding: function() {
                if (2 == this._groundNum) switch (g.WorkinUtils.getRandom(0, 6, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(172, 145);
                    case 1:
                        return new l.WorkinPoint(465, 150);
                    case 2:
                        return new l.WorkinPoint(443, 145);
                    case 3:
                        return new l.WorkinPoint(564, 150);
                    case 4:
                        return new l.WorkinPoint(695, 150);
                    case 5:
                        return new l.WorkinPoint(840, 135);
                    case 6:
                        return new l.WorkinPoint(935, 140);
                    default:
                        return new l.WorkinPoint(0, 0)
                } else switch (g.WorkinUtils.getRandom(0,
                    3, !0) | 0) {
                    case 0:
                        return new l.WorkinPoint(225, 165);
                    case 1:
                        return new l.WorkinPoint(445, 100);
                    case 2:
                        return new l.WorkinPoint(531, 100);
                    case 3:
                        return new l.WorkinPoint(625, 125);
                    default:
                        return new l.WorkinPoint(0, 0)
                }
            },
            _assetBuilding: function() {
                switch (g.WorkinUtils.getRandom(0, 3, !0) | 0) {
                    case 0:
                        return "elements/AssetBuilding1.png";
                    case 1:
                        return "elements/AssetBuilding2.png";
                    case 2:
                        return "elements/AssetBuilding3.png";
                    case 3:
                        return "elements/AssetBuilding4.png";
                    default:
                        return ""
                }
            },
            _addBuildings: function() {
                var a;
                for (a = 2 == this._groundNum ? 8 : 5; 0 <= --a;) switch (g.WorkinUtils.getRandom(0, 6, !0) | 0) {
                    case 0:
                        var b = this._positionBuilding(),
                            e = new i.elements.Element({
                                asset: this._assetBuilding(),
                                x: this.pos.getX() + b.getX(),
                                y: this.pos.getY() - b.getY(),
                                layer: f.constants.ConstantsApp.LAYER_GROUND
                            });
                        e.moveOffsetX = b.getX();
                        e.moveOffsetY = b.getY();
                        this._elements.push(e);
                        this._world._addElement(e)
                }
            },
            _setupCollision: function() {
                var a;
                1 == this._groundNum || 3 == this._groundNum ? (a = new l.WorkinLine(new l.WorkinPoint(-23 + this.pos.getX(), -25 +
                        this.pos.getY()), new l.WorkinPoint(180 + this.pos.getX(), -30 + this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(180 + this.pos.getX(), -30 + this.pos.getY()), new l.WorkinPoint(303 + this.pos.getX(), -12 + this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(303 + this.pos.getX(), -12 + this.pos.getY()), new l.WorkinPoint(409 + this.pos.getX(), 42 + this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(409 + this.pos.getX(), 42 + this.pos.getY()), new l.WorkinPoint(522 +
                        this.pos.getX(), 54 + this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(522 + this.pos.getX(), 54 + this.pos.getY()), new l.WorkinPoint(645 + this.pos.getX(), 10 + this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(645 + this.pos.getX(), 10 + this.pos.getY()), new l.WorkinPoint(740 + this.pos.getX(), this.pos.getY())), this.collision.push(a), a = new l.WorkinLine(new l.WorkinPoint(740 + this.pos.getX(), this.pos.getY()), new l.WorkinPoint(786 + this.pos.getX(), -18 + this.pos.getY()))) :
                    a = new l.WorkinLine(new l.WorkinPoint(-29 + this.pos.getX(), this.pos.getY()), new l.WorkinPoint(1012 + this.pos.getX(), this.pos.getY()));
                this.collision.push(a)
            },
            _setupElements: function() {
                switch (this._groundNum) {
                    case 1:
                        this._backPiece = new i.elements.Element({
                            asset: "elements/AssetBack1",
                            x: this._frontPiece.pos._x + 50,
                            y: this._frontPiece.pos._y - 200,
                            layer: f.constants.ConstantsApp.LAYER_GROUND
                        });
                        this._backPiece.moveOffsetX = 50;
                        this._backPiece.moveOffsetY = 200;
                        this._world._addElement(this._backPiece);
                        this._addObstacles(this._allowObstacles,
                            this._scroll);
                        break;
                    case 2:
                        this._backPiece = new i.elements.Element({
                            asset: "elements/AssetBack2",
                            x: this._frontPiece.pos._x + 50,
                            y: this._frontPiece.pos._y - 200,
                            layer: f.constants.ConstantsApp.LAYER_GROUND
                        });
                        this._backPiece.moveOffsetX = 50;
                        this._backPiece.moveOffsetY = 200;
                        this._world._addElement(this._backPiece);
                        this._addBuildings();
                        this._addObstacles(this._allowObstacles, this._scroll);
                        break;
                    case 3:
                        this._backPiece = new i.elements.Element({
                            asset: "elements/AssetBack3",
                            x: this._frontPiece.pos._x + 50,
                            y: this._frontPiece.pos._y -
                                200,
                            layer: f.constants.ConstantsApp.LAYER_GROUND
                        });
                        this._backPiece.moveOffsetX = 50;
                        this._backPiece.moveOffsetY = 200;
                        this._world._addElement(this._backPiece);
                        this._addBuildings();
                        this._addObstacles(this._allowObstacles, this._scroll);
                        break;
                    case 4:
                        this._backPiece = new i.elements.Element({
                                asset: "elements/AssetBack4",
                                x: this._frontPiece.pos._x + 50,
                                y: this._frontPiece.pos._y - 200,
                                layer: f.constants.ConstantsApp.LAYER_GROUND
                            }), this._backPiece.moveOffsetX = 50, this._backPiece.moveOffsetY = 200, this._world._addElement(this._backPiece),
                            this._addObstacles(this._allowObstacles, this._scroll)
                }
            },
            _setupForeground: function() {
                this._frontPieceOffset = new l.WorkinPoint(this._frontPiece.pos._x, this._frontPiece.pos._y);
                this._frontPiece.pos._x = -1E3;
                this._frontPiece.pos._y = -1E3
            },
            rightEdge: function() {
                return this.pos.getX() + this._frontPiece._display.getNaturalWidth()
            },
            __class__: i.elements.ground.GroundBase
        });
    i.elements.ground.RockPile = function(a) {
        i.elements.Element.call(this, a);
        this._broken = !1;
        this._offset = new l.WorkinPoint;
        this._rocks = []
    };
    j["com.nick.spongebob.weresquirrel.world.elements.ground.RockPile"] =
        i.elements.ground.RockPile;
    i.elements.ground.RockPile.__name__ = "com,nick,spongebob,weresquirrel,world,elements,ground,RockPile".split(",");
    i.elements.ground.RockPile.__super__ = i.elements.Element;
    i.elements.ground.RockPile.prototype = r(i.elements.Element.prototype, {
        testCollision: function(a, b, e) {
            return this.pos.getX() + 15 > a.getX() - b && this.pos.getX() - 15 < a.getX() && this.pos.getY() > a.getY() - 500 && this.pos.getY() < a.getY() + 1.5 * e ? !0 : !1
        },
        doBreak: function(a) {
            if (!this._broken) {
                g.WorkinCloud.instance._getSound().playSound("audio/AssetSoundCrashRock");
                this._broken = !0;
                this.setOffset(a.getX(), a.getY());
                for (this._i = 9; 0 <= --this._i;) g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_MAKE_ROCK, {
                    offset: this.getOffset()
                }))
            }
        },
        getOffset: function() {
            return this._offset
        },
        setOffset: function(a, b) {
            this._offset.to(a, b)
        },
        __class__: i.elements.ground.RockPile
    });
    i.elements.particle = {};
    i.elements.particle.ParticleBase = function(a) {
        i.elements.AnimatedElement.call(this, a)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleBase"] =
        i.elements.particle.ParticleBase;
    i.elements.particle.ParticleBase.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleBase".split(",");
    i.elements.particle.ParticleBase.__super__ = i.elements.AnimatedElement;
    i.elements.particle.ParticleBase.prototype = r(i.elements.AnimatedElement.prototype, {
        __class__: i.elements.particle.ParticleBase
    });
    i.elements.particle.ParticleBrokenRock = function(a, b) {
        var e = {
            asset: this._getAssetId()
        };
        i.elements.particle.ParticleBase.call(this, e);
        this._offset = new l.WorkinPoint;
        this.pos = b.copy();
        this._ground = a;
        this._onGround = !1;
        this._testPoint = this.pos.copy();
        this._lifetime = this._MAX_LIFE();
        this._ignoreTimer = 0.2;
        this._rotation = 150 - 300 * Math.random();
        this.velocity.to(100 + 250 * Math.random(), -300 - 1E3 * Math.random())
    };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleBrokenRock"] = i.elements.particle.ParticleBrokenRock;
    i.elements.particle.ParticleBrokenRock.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleBrokenRock".split(",");
    i.elements.particle.ParticleBrokenRock.__super__ =
        i.elements.particle.ParticleBase;
    i.elements.particle.ParticleBrokenRock.prototype = r(i.elements.particle.ParticleBase.prototype, {
        _testCollision: function(a) {
            var b = this._display.rotation;
            b.set__(b._value + this._rotation * a);
            if (!(0 < this._ignoreTimer)) {
                this._onGround = !1;
                for (this._i = this._ground.length; 0 <= --this._i;)
                    for (var b = a = 0, e = this._ground[this._i].collision; b < e.length;) {
                        ++b;
                        var c = this._ground[this._i].collision[a];
                        this.pos.getX() > c.p0().getX() && this.pos.getX() < c.p1().getX() && (this._onGround = this.pos.getY() >=
                            c.yOnSlope(this.pos.getX()) - 5 && this.pos.getY() < c.yOnSlope(this.pos.getX()) + 200 ? !0 : !1);
                        a++
                    }
                this._onGround && this.velocity.setY(-350 - 400 * Math.random()); - 100 == this._testPoint.getX() && (0 < this.velocity.getX() && (b = this.velocity, b.setX(-2 * b.getX())), this._testPoint.toPoint(this.pos))
            }
        },
        update: function(a) {
            if (!1 == this.doDelete) {
                this._ignoreTimer -= a;
                var b = this.velocity;
                b.setY(b.getY() + this._GRAVITY() * a);
                this._testPoint.to(this.pos.getX() + this.velocity.getX() * a, this.pos.getY() + this.velocity.getY() * a);
                this._testCollision(a);
                this._lifetime -= a;
                this._lifetime < this._LIFE_THRESHOLD() && this._display.alpha.set__(this._lifetime / this._LIFE_THRESHOLD());
                0 >= this._display.alpha._value && (this.doDelete = !0);
                this.updatePositionFromVelocity(a)
            }
        },
        _getAssetId: function() {
            switch (g.WorkinUtils.getRandom(1, 8, !0) | 0) {
                case 1:
                    return "elements/AssetRock1.png";
                case 2:
                    return "elements/AssetRock2.png";
                case 3:
                    return "elements/AssetRock3.png";
                case 4:
                    return "elements/AssetRock4.png";
                case 5:
                    return "elements/AssetRock5.png";
                case 6:
                    return "elements/AssetRock6.png";
                case 7:
                    return "elements/AssetRock7.png";
                case 8:
                    return "elements/AssetRock8.png";
                default:
                    return ""
            }
        },
        _LIFE_THRESHOLD: function() {
            return this._MAX_LIFE() / 5
        },
        _MAX_LIFE: function() {
            return 1.5
        },
        _GRAVITY: function() {
            return 1300
        },
        __class__: i.elements.particle.ParticleBrokenRock
    });
    i.elements.particle.ParticleBurstOrange = function(a) {
        a.library = "anim_player";
        a.movie = "AssetBurstOrange";
        i.elements.particle.ParticleBase.call(this, a);
        this.addAnimation("idle", 1, 12);
        this.playAnimation("idle", 1)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleBurstOrange"] =
        i.elements.particle.ParticleBurstOrange;
    i.elements.particle.ParticleBurstOrange.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleBurstOrange".split(",");
    i.elements.particle.ParticleBurstOrange.__super__ = i.elements.particle.ParticleBase;
    i.elements.particle.ParticleBurstOrange.prototype = r(i.elements.particle.ParticleBase.prototype, {
        _onAnimationComplete: function() {
            i.elements.particle.ParticleBase.prototype.dispose.call(this)
        },
        __class__: i.elements.particle.ParticleBurstOrange
    });
    i.elements.particle.ParticleChangePoof = function(a) {
        a.library = "anim_effects";
        a.movie = "AssetBurstCloud";
        i.elements.particle.ParticleBase.call(this, a);
        this.addAnimation("idle", 1, 12);
        this.playAnimation("idle", 1)
    };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleChangePoof"] = i.elements.particle.ParticleChangePoof;
    i.elements.particle.ParticleChangePoof.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleChangePoof".split(",");
    i.elements.particle.ParticleChangePoof.__super__ =
        i.elements.particle.ParticleBase;
    i.elements.particle.ParticleChangePoof.prototype = r(i.elements.particle.ParticleBase.prototype, {
        _onAnimationComplete: function() {
            i.elements.particle.ParticleBase.prototype.dispose.call(this)
        },
        __class__: i.elements.particle.ParticleChangePoof
    });
    i.elements.particle.ParticleJelly = function(a) {
        a.library = "anim_effects";
        a.movie = "AssetJellyfish";
        i.elements.particle.ParticleBase.call(this, a);
        this.pos.to(f.constants.ConstantsApp.STAGE_WIDTH + 50, g.WorkinUtils.getRandom(50, f.constants.ConstantsApp.STAGE_HEIGHT -
            200, !0));
        this._baseY = this.pos.getY();
        this._sinDir = 1 == g.WorkinUtils.getRandom(0, 1, !0) ? 1 : -1;
        this._sinCounter = 0;
        this._sinAmp = 25 + 50 * Math.random();
        this._sinFreq = g.WorkinUtils.getRandom(1, 3, !0);
        this.velocity.setX(-g.WorkinUtils.getRandom(100, 300, !0));
        this.addAnimation("idle", 1, 26);
        this.playAnimation("idle")
    };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleJelly"] = i.elements.particle.ParticleJelly;
    i.elements.particle.ParticleJelly.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleJelly".split(",");
    i.elements.particle.ParticleJelly.__super__ = i.elements.particle.ParticleBase;
    i.elements.particle.ParticleJelly.prototype = r(i.elements.particle.ParticleBase.prototype, {
        update: function(a) {
            i.elements.particle.ParticleBase.prototype.update.call(this, a);
            this._sinCounter += a * this._sinDir * this._sinFreq;
            this.pos.setY(this._baseY + Math.sin(this._sinCounter) * this._sinAmp);
            this.updatePositionFromVelocity(a);
            0 > this.pos.getX() + 200 && (this.doDelete = !0)
        },
        __class__: i.elements.particle.ParticleJelly
    });
    i.elements.particle.ParticleSparkle =
        function(a) {
            a.library = "anim_effects";
            a.movie = "AssetBurstSparkles";
            i.elements.particle.ParticleBase.call(this, a);
            this.addAnimation("idle", 1, 19);
            this.playAnimation("idle", 1)
        };
    j["com.nick.spongebob.weresquirrel.world.elements.particle.ParticleSparkle"] = i.elements.particle.ParticleSparkle;
    i.elements.particle.ParticleSparkle.__name__ = "com,nick,spongebob,weresquirrel,world,elements,particle,ParticleSparkle".split(",");
    i.elements.particle.ParticleSparkle.__super__ = i.elements.particle.ParticleBase;
    i.elements.particle.ParticleSparkle.prototype =
        r(i.elements.particle.ParticleBase.prototype, {
            _onAnimationComplete: function() {
                i.elements.particle.ParticleBase.prototype.dispose.call(this)
            },
            __class__: i.elements.particle.ParticleSparkle
        });
    C = void 0;
    L = void 0;
    m = void 0;
    c = void 0;
    F = void 0;
    k = void 0;
    G = void 0;
    v = void 0;
    s = void 0;
    D = void 0;
    d = void 0;
    U = void 0;
    t = void 0;
    B = void 0;
    t = void 0;
    t = void 0;
    t = void 0;
    k = {
        Disposable: function() {}
    };
    j["flambe.util.Disposable"] = k.Disposable;
    k.Disposable.__name__ = ["flambe", "util", "Disposable"];
    k.Disposable.prototype = {
        __class__: k.Disposable
    };
    G = function() {};
    j["flambe.Component"] = G;
    G.__name__ = ["flambe", "Component"];
    G.__interfaces__ = [k.Disposable];
    G.prototype = {
        _internal_init: function(a, b) {
            this.owner = a;
            this.next = b
        },
        get_name: function() {
            return null
        },
        dispose: function() {
            null != this.owner && this.owner.remove(this)
        },
        onUpdate: function() {},
        onRemoved: function() {},
        onAdded: function() {},
        __class__: G
    };
    W = {
        Updater: function() {
            this._paused = !1
        }
    };
    j["com.workinman.components.Updater"] = W.Updater;
    W.Updater.__name__ = ["com", "workinman", "components", "Updater"];
    W.Updater.__super__ =
        G;
    W.Updater.prototype = r(G.prototype, {
        setPaused: function(a) {
            return this._paused = a
        },
        getPaused: function() {
            return this._paused
        },
        onUpdate: function(a) {
            this._paused || g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventUpdate(a))
        },
        get_name: function() {
            return "Updater_3"
        },
        __class__: W.Updater
    });
    N = {
        EffectDef: function() {}
    };
    j["com.workinman.defs.EffectDef"] = N.EffectDef;
    N.EffectDef.__name__ = ["com", "workinman", "defs", "EffectDef"];
    N.EffectDef.prototype = {
        isActive: function() {
            return 0 >= this.delay && 0 < this.dur
        },
        _getWasActive: function() {
            return this._flagWasActive
        },
        _getDurDefault: function() {
            return this._durDefault
        },
        update: function(a) {
            this._flagWasActive = this.isActive();
            0 > this.dur || (0 < this.delay ? this.delay -= a : this.dur -= a)
        },
        __class__: N.EffectDef
    };
    N.SoundDef = function(a, b, e) {
        null == e && (e = !1);
        this.id = a;
        this.isMusic = e;
        this._flagPlayed = this._flagHasSound = !1;
        this._sound = b
    };
    j["com.workinman.defs.SoundDef"] = N.SoundDef;
    N.SoundDef.__name__ = ["com", "workinman", "defs", "SoundDef"];
    N.SoundDef.prototype = {
        playSound: function(a) {
            null ==
                a && (a = 1);
            return this.isMusic ? this._sound.loop(a) : this._sound.play(a)
        },
        __class__: N.SoundDef
    };
    Z = {
        Viewport: function(a) {
            this._timeline = a;
            this._layers = new E
        }
    };
    j["com.workinman.display.Viewport"] = Z.Viewport;
    Z.Viewport.__name__ = ["com", "workinman", "display", "Viewport"];
    Z.Viewport.prototype = {
        removeChild: function(a) {
            null != a && this._layers.exists(a.layer) && this._layers.get(a.layer).removeChild(a._getEntity())
        },
        addChild: function(a) {
            null != a && this._layers.exists(a.layer) && this._layers.get(a.layer).addChild(a._getEntity())
        },
        addLayer: function(a) {
            var b = new L;
            this._timeline.addChild(b);
            this._layers.set(a, b)
        },
        __class__: Z.Viewport
    };
    o = {
        WMEvent: function(a) {
            this._eventId = a
        }
    };
    j["com.workinman.events.WMEvent"] = o.WMEvent;
    o.WMEvent.__name__ = ["com", "workinman", "events", "WMEvent"];
    o.WMEvent.prototype = {
        getEventId: function() {
            return this._eventId
        },
        __class__: o.WMEvent
    };
    o.WMEventData = function(a, b) {
        o.WMEvent.call(this, a);
        this._data = b
    };
    j["com.workinman.events.WMEventData"] = o.WMEventData;
    o.WMEventData.__name__ = ["com", "workinman", "events",
        "WMEventData"
    ];
    o.WMEventData.__super__ = o.WMEvent;
    o.WMEventData.prototype = r(o.WMEvent.prototype, {
        _getData: function() {
            return this._data
        },
        __class__: o.WMEventData
    });
    o.WMEventFlow = function(a, b) {
        null == b && (b = !1);
        this.flowId = a;
        this.targetScreen = b;
        o.WMEvent.call(this, o.WMEventFlow.EVENT_FLOW)
    };
    j["com.workinman.events.WMEventFlow"] = o.WMEventFlow;
    o.WMEventFlow.__name__ = ["com", "workinman", "events", "WMEventFlow"];
    o.WMEventFlow.__super__ = o.WMEvent;
    o.WMEventFlow.prototype = r(o.WMEvent.prototype, {
        __class__: o.WMEventFlow
    });
    o.WMEventInput = function(a, b, e, c) {
        o.WMEvent.call(this, f.constants.ConstantsApp.EVENT_INPUT);
        this.phase = a;
        this.input = b;
        this.x = e;
        this.y = c
    };
    j["com.workinman.events.WMEventInput"] = o.WMEventInput;
    o.WMEventInput.__name__ = ["com", "workinman", "events", "WMEventInput"];
    o.WMEventInput.__super__ = o.WMEvent;
    o.WMEventInput.prototype = r(o.WMEvent.prototype, {
        __class__: o.WMEventInput
    });
    o.WMEventInterfaceChange = function(a, b, e) {
        null == b && (b = "");
        this.flowId = a;
        this.screenId = b;
        null == e && (e = new E);
        this.customData = e;
        o.WMEvent.call(this,
            o.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT)
    };
    j["com.workinman.events.WMEventInterfaceChange"] = o.WMEventInterfaceChange;
    o.WMEventInterfaceChange.__name__ = ["com", "workinman", "events", "WMEventInterfaceChange"];
    o.WMEventInterfaceChange.__super__ = o.WMEvent;
    o.WMEventInterfaceChange.prototype = r(o.WMEvent.prototype, {
        __class__: o.WMEventInterfaceChange
    });
    o.WMEventScreenOut = function(a, b) {
        this.flowId = a;
        this.screenId = b;
        o.WMEvent.call(this, o.WMEventScreenOut.EVENT_SCREEN_OUTPUT)
    };
    j["com.workinman.events.WMEventScreenOut"] =
        o.WMEventScreenOut;
    o.WMEventScreenOut.__name__ = ["com", "workinman", "events", "WMEventScreenOut"];
    o.WMEventScreenOut.__super__ = o.WMEvent;
    o.WMEventScreenOut.prototype = r(o.WMEvent.prototype, {
        __class__: o.WMEventScreenOut
    });
    o.WMEventUpdate = function(a) {
        o.WMEvent.call(this, o.WMEventUpdate.EVENT_UPDATE);
        this._dt = a
    };
    j["com.workinman.events.WMEventUpdate"] = o.WMEventUpdate;
    o.WMEventUpdate.__name__ = ["com", "workinman", "events", "WMEventUpdate"];
    o.WMEventUpdate.__super__ = o.WMEvent;
    o.WMEventUpdate.prototype = r(o.WMEvent.prototype, {
        getDt: function() {
            return this._dt
        },
        __class__: o.WMEventUpdate
    });
    l = {};
    l.WorkinLine = function(a, b) {
        this._p0 = a;
        this._p1 = b;
        this.velocity = new l.WorkinPoint;
        this._calcProperties()
    };
    j["com.workinman.math.WorkinLine"] = l.WorkinLine;
    l.WorkinLine.__name__ = ["com", "workinman", "math", "WorkinLine"];
    l.WorkinLine.prototype = {
        updatePositionFromVelocity: function(a) {
            var b = this._p0;
            b.setX(b.getX() + this.velocity.getX() * a);
            b = this._p0;
            b.setY(b.getY() + this.velocity.getY() * a);
            b = this._p1;
            b.setX(b.getX() + this.velocity.getX() * a);
            b = this._p1;
            b.setY(b.getY() + this.velocity.getY() * a)
        },
        yOnSlope: function(a) {
            this._calcProperties();
            return this.slope() * a + this.yIntercept()
        },
        _calcProperties: function() {
            this._length = Math.round(1E3 * Math.sqrt((this._p0.getX() - this._p1.getX()) * (this._p0.getX() - this._p1.getX()) + (this._p0.getY() - this._p1.getY()) * (this._p0.getY() - this._p1.getY()))) / 1E3;
            this._vector = new l.WorkinPoint(this._p1.getX() - this._p0.getX(), this._p1.getY() - this._p0.getY());
            this._slope = this._vector.getY() / this._vector.getX();
            0 == this._vector.getX() &&
                (this._slope = 1E5);
            this._yIntercept = this._p0.getY() - this._slope * this._p0.getX();
            this._parametricDenom = new l.WorkinPoint(this._p1.getX() - this._p0.getX(), this._p1.getY() - this._p0.getY());
            this._normal = this._vector.pseudoCross();
            this._normal.normalize()
        },
        vector: function() {
            return this._vector
        },
        yIntercept: function() {
            return this._yIntercept
        },
        slope: function() {
            return this._slope
        },
        p1: function() {
            return this._p1
        },
        p0: function() {
            return this._p0
        },
        __class__: l.WorkinLine
    };
    l.WorkinMotion = function(a, b, e, c, d, f) {
        null ==
            f && (f = "");
        null == d && (d = "");
        null == c && (c = 0);
        null == e && (e = 0);
        null == a && (a = new l.WorkinPoint);
        this._vel = new l.WorkinPoint;
        this._pos = a.copy();
        this._progress = 0;
        this._dest = null;
        this._rate = e;
        this._delay = c;
        this._type = "";
        this._ease = "" == d ? l.WorkinMotion.EASE_IN_OUT : d;
        "" != f && (this._type = f);
        this.complete = !1;
        null != b && (this._dest = b.copy(), this._makeVel(), this._calculateTween())
    };
    j["com.workinman.math.WorkinMotion"] = l.WorkinMotion;
    l.WorkinMotion.__name__ = ["com", "workinman", "math", "WorkinMotion"];
    l.WorkinMotion.prototype = {
        dispose: function() {
            this._start = this._vectorTween = this._dest = this._pos = this._vel = null;
            this.complete = !0
        },
        _updatePosFromVel: function(a) {
            var b = this._pos;
            b.setX(b.getX() + this._vel.getX() * a);
            b = this._pos;
            b.setY(b.getY() + this._vel.getY() * a)
        },
        _formulaEase: function(a, b, e, c) {
            switch (this._ease) {
                case l.WorkinMotion.EASE_IN_OUT:
                    return 1 > (a /= c / 2) ? e / 2 * a * a + b : -e / 2 * (--a * (a - 2) - 1) + b;
                case l.WorkinMotion.EASE_IN:
                    return e * (a /= c) * a + b;
                case l.WorkinMotion.EASE_IN_FAST:
                    return e * (a /= c) * a + b;
                case l.WorkinMotion.EASE_OUT:
                    return -e *
                        (a /= c) * (a - 2) + b;
                case l.WorkinMotion.EASE_OUT_FAST:
                    return a == c ? b + e : e * (-Math.pow(2, -10 * a / c) + 1) + b;
                case l.WorkinMotion.EASE_BOUNCE_IN:
                    return (a /= c) < 1 / 2.75 ? e * 7.5625 * a * a + b : a < 2 / 2.75 ? e * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? e * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : e * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
            }
            return e * a / c + b
        },
        update: function(a) {
            0 < this._delay ? this._delay -= a : null != this._dest ? (0 == this._rate ? this._pos.toPoint(this._dest) : this._progress >= this._rate ? this._pos.toPoint(this._dest) : (this._progress += a, this._progress >
                this._rate && (this._progress = this._rate), this._pos.setX(this._formulaEase(this._progress, this._start.getX(), this._vectorTween.getX(), this._rate)), this._pos.setY(this._formulaEase(this._progress, this._start.getY(), this._vectorTween.getY(), this._rate))), this._progress >= this._rate && (this.complete = !0)) : this._updatePosFromVel(a)
        },
        isReady: function() {
            return 0 >= this._delay
        },
        _makeVel: function() {
            this._vel.to(this._rate, 0);
            this._vel.rotateTo(this._pos.getAngleBetween(this._dest))
        },
        setStartFast: function(a, b) {
            this._getPos().setX(a);
            this._getPos().setY(b);
            this._calculateTween()
        },
        setStart: function(a) {
            this._setPos(a.copy());
            this._calculateTween()
        },
        _setType: function(a) {
            return this._type = a
        },
        _getType: function() {
            return this._type
        },
        _setRate: function(a) {
            0 == a && null != this._dest && (this._pos.toPoint(this._dest), this.complete = !0);
            return this._rate = a
        },
        _getRate: function() {
            return this._rate
        },
        _setVel: function(a) {
            this._dest = null;
            this.complete = !0;
            this._vel.toPoint(a);
            return this._vel
        },
        _getVel: function() {
            return this._vel
        },
        _setDest: function(a) {
            if (null ==
                a) return this._dest = null, this._vel.to(0, 0), this.complete = !0, null;
            this._dest.toPoint(a);
            this.complete = !1;
            1 <= this._rate ? this._makeVel() : 0 == this._rate && this._pos.toPoint(this._dest);
            this._calculateTween();
            return this._dest
        },
        _getDest: function() {
            return this._dest
        },
        _setEase: function(a) {
            return this._ease = a
        },
        _getEase: function() {
            return this._ease
        },
        _setPos: function(a) {
            this._pos.toPoint(a);
            1 <= this._rate && this._makeVel();
            this._calculateTween();
            return this._pos
        },
        _getPos: function() {
            return this._pos
        },
        _getRatio: function() {
            return this._progress /
                this._rate
        },
        _calculateTween: function() {
            this._progress = 0;
            this._start = this._pos.copy();
            this._vectorTween = new l.WorkinPoint(this._dest.getX() - this._start.getX(), this._dest.getY() - this._start.getY())
        },
        __class__: l.WorkinMotion
    };
    l.WorkinPoint = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this._x = Math.round(1E3 * a) / 1E3;
        this._y = Math.round(1E3 * b) / 1E3;
        this.calculateLength()
    };
    j["com.workinman.math.WorkinPoint"] = l.WorkinPoint;
    l.WorkinPoint.__name__ = ["com", "workinman", "math", "WorkinPoint"];
    l.WorkinPoint.prototype = {
        getAngle: function() {
            return 180 * Math.atan2(this._y, this._x) / Math.PI
        },
        setLength: function(a) {
            return this._length = a
        },
        getLength: function() {
            return this._length
        },
        setY: function(a) {
            return this._y = a
        },
        getY: function() {
            return this._y
        },
        setX: function(a) {
            return this._x = a
        },
        getX: function() {
            return this._x
        },
        pseudoCross: function() {
            return new l.WorkinPoint(this._y, -this._x)
        },
        normalize: function() {
            0 != this._length && (this._x /= this._length, this._y /= this._length, this.calculateLength())
        },
        rotateTo: function(a) {
            this.rotate(a - this.getAngle())
        },
        rotate: function(a) {
            var a = a * (Math.PI / 180),
                b = this.getX() * Math.cos(a) - this.getY() * Math.sin(a),
                a = this.getY() * Math.cos(a) + this.getX() * Math.sin(a);
            this.setX(b);
            this.setY(a)
        },
        getAngleBetween: function(a) {
            return Math.atan2(a.getY() - this._y, a.getX() - this._x) * (180 / Math.PI)
        },
        calculateLength: function() {
            this._length = Math.sqrt(this._x * this._x + this._y * this._y)
        },
        copy: function() {
            return new l.WorkinPoint(this._x, this._y)
        },
        toPoint: function(a) {
            this._x = a.getX();
            this._y = a.getY();
            this.calculateLength()
        },
        to: function(a, b) {
            this._x =
                a;
            this._y = b;
            this.calculateLength()
        },
        __class__: l.WorkinPoint
    };
    g.WMAssetManager = function() {
        this.EVENT_FILES_LOADED = "event_files_loaded";
        this._assets = new E;
        this._defs = new E;
        this._flump = new E;
        this._packs = new E;
        this._chunks = new E;
        this._packsLoaded = this._packsMax = 0
    };
    j["com.workinman.utils.WMAssetManager"] = g.WMAssetManager;
    g.WMAssetManager.__name__ = ["com", "workinman", "utils", "WMAssetManager"];
    g.WMAssetManager.prototype = {
        getFont: function(a) {
            return !1 == this._assets.exists(a) ? (g.WorkinCloud.instance.log("[WMAssetManager](getFont) no asset named " +
                a + " exists! Returning null."), null) : new m.Font(this._assets.get(a)._getPack(), a)
        },
        getLibrary: function(a) {
            return !1 == this._flump.exists(a) ? (g.WorkinCloud.instance.log("[WMAssetManager](getLibrary) no library named " + a + " exists! Is it defined in config.xml?"), null) : this._flump.get(a)
        },
        getSound: function(a) {
            return !1 == this._assets.exists(a) ? (g.WorkinCloud.instance.log("[AssetManager](getSound) no asset named " + a + " exists! Returning null."), null) : this._assets.get(a)._getPack().getSound(this._assets.get(a)._getPath(), !0)
        },
        getFile: function(a) {
            return !1 == this._assets.exists(a) ? (g.WorkinCloud.instance.log("[WMAssetManager](getFile) no asset named " + a + " exists! Returning empty string."), "") : this._assets.get(a)._getPack().getFile(this._assets.get(a)._getPath(), !0)
        },
        getTexture: function(a) {
            a = a.split(".")[0];
            return !1 == this._assets.exists(a) ? (g.WorkinCloud.instance.log("[WMAssetManager](getTexture) no asset named " + a + " exists! Returning null."), null) : this._assets.get(a)._getPack().getTexture(this._assets.get(a)._getPath(), !0)
        },
        _onAllLoadComplete: function() {
            g.WorkinCloud.instance.log("[WMAssetManager](_onAllLoadComplete) all packs loaded!");
            g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEvent(this.EVENT_FILES_LOADED))
        },
        addPack: function(a) {
            for (var b = w.iter(a.get_manifest()._entries); b.hasNext();) {
                var e = b.next();
                new g._WMAssetManager.AssetDef(e.name, a, this._assets)
            }
        },
        loadPack: function(a, b) {
            null == b && (b = "");
            var e = this;
            !1 == this._defs.exists(a) && g.WorkinCloud.instance.log("[WMAssetManager](loadPack) Can't load pack " +
                a + " , define the pack in config.xml.");
            this._packsMax++;
            var c = v.Manifest.build(a);
            "" != b && c.set_relativeBasePath(b);
            C._platform.loadAssetPack(c).get(function(b) {
                e.addPack(b);
                e._packsLoaded++;
                for (var c = 0, d = e._defs.get(a).getFlump(); c < d.length;) {
                    var f = d[c];
                    ++c;
                    e._flump.set(f, new s.Library(b, f))
                }
                e._packs.set(a, b);
                e._packsLoaded >= e._packsMax && e._onAllLoadComplete()
            })
        },
        addPackDef: function(a, b) {
            null == b && (b = []);
            this._defs.set(a, new g._WMAssetManager.PackDef(a, b))
        },
        __class__: g.WMAssetManager
    };
    g._WMAssetManager = {};
    g._WMAssetManager.AssetDef = function(a, b, e) {
        this._path = a;
        a = a.split("/");
        this._id = a[a.length - 1];
        this._pack = b;
        e.set(this._path, this);
        e.set(this._id, this)
    };
    j["com.workinman.utils._WMAssetManager.AssetDef"] = g._WMAssetManager.AssetDef;
    g._WMAssetManager.AssetDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "AssetDef"];
    g._WMAssetManager.AssetDef.prototype = {
        _getPath: function() {
            return this._path
        },
        _getPack: function() {
            return this._pack
        },
        __class__: g._WMAssetManager.AssetDef
    };
    g._WMAssetManager.PackDef =
        function(a, b) {
            this._id = a;
            this._flump = b
        };
    j["com.workinman.utils._WMAssetManager.PackDef"] = g._WMAssetManager.PackDef;
    g._WMAssetManager.PackDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager", "PackDef"];
    g._WMAssetManager.PackDef.prototype = {
        getFlump: function() {
            return this._flump
        },
        __class__: g._WMAssetManager.PackDef
    };
    g._WMAssetManager.ChunkDef = function() {};
    j["com.workinman.utils._WMAssetManager.ChunkDef"] = g._WMAssetManager.ChunkDef;
    g._WMAssetManager.ChunkDef.__name__ = ["com", "workinman", "utils", "_WMAssetManager",
        "ChunkDef"
    ];
    g._WMAssetManager.ChunkDef.prototype = {
        _getChunks: function() {
            return this._chunks
        },
        _getPacks: function() {
            return this._packs
        },
        __class__: g._WMAssetManager.ChunkDef
    };
    g._WMEventDispatcher = {};
    g._WMEventDispatcher.WMEventTracker = function() {
        this._signalConnection = [];
        this._signal = new k.Signal1
    };
    j["com.workinman.utils._WMEventDispatcher.WMEventTracker"] = g._WMEventDispatcher.WMEventTracker;
    g._WMEventDispatcher.WMEventTracker.__name__ = ["com", "workinman", "utils", "_WMEventDispatcher", "WMEventTracker"];
    g._WMEventDispatcher.WMEventTracker.prototype = {
        dispose: function() {
            this._signal = null;
            for (var a = 0, b = this._signalConnection; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
            this._signalConnection = null
        },
        isEmtpy: function() {
            return null == this._signal._head
        },
        dispatchEvent: function(a) {
            this._signal.emit1(a)
        },
        removeEventListener: function(a) {
            for (var b = this._signalConnection.length; 0 < b;) b--, M.compareMethods(this._signalConnection[b]._getListener(), a) && (this._signalConnection[b].dispose(), this._signalConnection.splice(b,
                1))
        },
        addEventListener: function(a) {
            this._signalConnection.push(new g._WMEventDispatcher.SignalTracker(a, this._signal.connect(a)))
        },
        __class__: g._WMEventDispatcher.WMEventTracker
    };
    g._WMEventDispatcher.SignalTracker = function(a, b) {
        this._function = a;
        this._connection = b
    };
    j["com.workinman.utils._WMEventDispatcher.SignalTracker"] = g._WMEventDispatcher.SignalTracker;
    g._WMEventDispatcher.SignalTracker.__name__ = ["com", "workinman", "utils", "_WMEventDispatcher", "SignalTracker"];
    g._WMEventDispatcher.SignalTracker.prototype = {
        _getListener: function() {
            return this._function
        },
        dispose: function() {
            this._function = null;
            this._connection.dispose();
            this._connection = null
        },
        __class__: g._WMEventDispatcher.SignalTracker
    };
    g.WMInput = function() {
        g.WMInput._keycodes = new E;
        g.WMInput._keydown = new E;
        g.WMInput._keydown.set(f.constants.ConstantsApp.INPUT_CLICK, !1)
    };
    j["com.workinman.utils.WMInput"] = g.WMInput;
    g.WMInput.__name__ = ["com", "workinman", "utils", "WMInput"];
    g.WMInput.prototype = {
        _onPointerUp: function(a) {
            g.WMInput._keydown.set(f.constants.ConstantsApp.INPUT_CLICK, !1);
            g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventInput(0, f.constants.ConstantsApp.INPUT_CLICK, a.viewX, a.viewY))
        },
        _onPointerMove: function(a) {
            g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventInput(2, f.constants.ConstantsApp.INPUT_CLICK, a.viewX, a.viewY))
        },
        _onPointerDown: function(a) {
            g.WMInput._keydown.set(f.constants.ConstantsApp.INPUT_CLICK, !0);
            g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventInput(1, f.constants.ConstantsApp.INPUT_CLICK, a.viewX,
                a.viewY))
        },
        _onKeyUp: function(a) {
            for (var b, e = g.WMInput._keycodes.keys(); e.hasNext();) {
                var c = e.next();
                b = g.WMInput._keycodes.get(c);
                for (var d = 0; d < b.length;) {
                    var f = b[d];
                    ++d;
                    f == a.key && (g.WMInput._keydown.set(c, !1), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventInput(0, c, 0, 0)))
                }
            }
        },
        _onKeyDown: function(a) {
            for (var b, e = g.WMInput._keycodes.keys(); e.hasNext();) {
                var c = e.next();
                b = g.WMInput._keycodes.get(c);
                for (var d = 0; d < b.length;) {
                    var f = b[d];
                    ++d;
                    f == a.key && (g.WMInput._keydown.set(c, !0), g.WorkinCloud.instance.getDispatcher().dispatchEvent(new o.WMEventInput(1,
                        c, 0, 0)))
                }
            }
        },
        getInput: function(a) {
            return g.WMInput._keydown.get(a)
        },
        registerInput: function(a, b) {
            g.WMInput._keycodes.set(a, b);
            g.WMInput._keydown.set(a, !1)
        },
        prime: function() {
            C._platform.getKeyboard().down.connect(u(this, this._onKeyDown));
            C._platform.getKeyboard().up.connect(u(this, this._onKeyUp));
            C._platform.getPointer().down.connect(u(this, this._onPointerDown));
            C._platform.getPointer().move.connect(u(this, this._onPointerMove));
            C._platform.getPointer().up.connect(u(this, this._onPointerUp))
        },
        __class__: g.WMInput
    };
    g.WMSound = function() {
        this._music = "";
        this._musicGain = 1;
        this._musicPlaying = null;
        this._isMuted = !1;
        this._mixer = new D.Mixer;
        this._sounds = []
    };
    j["com.workinman.utils.WMSound"] = g.WMSound;
    g.WMSound.__name__ = ["com", "workinman", "utils", "WMSound"];
    g.WMSound.prototype = {
        playMusic: function(a, b) {
            null == b && (b = 1);
            this._music = a;
            this._musicGain = b;
            this._isMuted || (null != this._musicPlaying && this._musicPlaying.dispose(), this._musicPlaying = (new N.SoundDef(a, this._mixer.newSound(g.WorkinCloud.instance.getAssets().getSound(this._music),
                1), !0)).playSound(b))
        },
        playSound: function(a, b) {
            null == b && (b = 1);
            this._isMuted || this._sounds.push((new N.SoundDef(a, this._mixer.newSound(g.WorkinCloud.instance.getAssets().getSound(a)), !1)).playSound(b))
        },
        setMute: function(a) {
            if (a && !1 == this._isMuted) {
                this._isMuted = !0;
                for (this._mixer.stopAll(); 0 < this._sounds.length;) this._sounds.splice(0, 1);
                this._musicPlaying = null
            } else !1 == a && this._isMuted && (this._isMuted = !1, this.playMusic(this._music, this._musicGain))
        },
        getMute: function() {
            return this._isMuted
        },
        __class__: g.WMSound
    };
    D = {
        Mixer: function() {
            this._sounds = []
        }
    };
    j["flambe.sound.Mixer"] = D.Mixer;
    D.Mixer.__name__ = ["flambe", "sound", "Mixer"];
    D.Mixer.__super__ = G;
    D.Mixer.prototype = r(G.prototype, {
        onRemoved: function() {
            this.stopAll();
            this._sounds = []
        },
        stopAll: function() {
            for (var a = 0, b = this._sounds; a < b.length;) {
                var e = b[a];
                ++a;
                e.dispose()
            }
        },
        newSound: function(a, b) {
            null == b && (b = 2147483647);
            var e = new D._Mixer.MixerSound(a, b);
            this._sounds.push(e);
            return e
        },
        get_name: function() {
            return "Mixer_2"
        },
        __class__: D.Mixer
    });
    g.WorkinCloud = function() {
        this._values =
            new E;
        this._defaults = new E;
        this._dispatcher = new g.WMEventDispatcher;
        this._input = new g.WMInput;
        this._assets = new g.WMAssetManager;
        this._sound = new g.WMSound
    };
    j["com.workinman.utils.WorkinCloud"] = g.WorkinCloud;
    g.WorkinCloud.__name__ = ["com", "workinman", "utils", "WorkinCloud"];
    g.WorkinCloud.prototype = {
        _updateDisplays: function(a) {
            this._dispatcher.dispatchEvent(new o.WMEventData(f.constants.ConstantsApp.EVENT_UPDATE_DISPLAY, {
                valueID: a
            }))
        },
        resetValue: function(a) {
            this._values.set(a, this._defaults.get(a));
            this._updateDisplays(a)
        },
        modifyValue: function(a, b) {
            null == b && (b = 1);
            this._values.set(a, this.getFloat(a) + b);
            this._updateDisplays(a);
            return this.getFloat(a)
        },
        setValue: function(a, b) {
            this._values.set(a, b);
            this._updateDisplays(a)
        },
        setDefault: function(a, b) {
            this._defaults.set(a, b);
            this.resetValue(a)
        },
        getString: function(a) {
            return this._values.get(a)
        },
        getFloat: function(a) {
            return this._values.get(a)
        },
        setFloat: function(a, b) {
            this.setValue(a, b)
        },
        getBool: function(a) {
            return this._values.get(a)
        },
        setBool: function(a, b) {
            this.setValue(a, b)
        },
        _getSound: function() {
            return this._sound
        },
        getAssets: function() {
            return this._assets
        },
        getInput: function() {
            return this._input
        },
        getDispatcher: function() {
            return this._dispatcher
        },
        log: function() {
            null
        },
        __class__: g.WorkinCloud
    };
    g.WorkinUtils = function() {};
    j["com.workinman.utils.WorkinUtils"] = g.WorkinUtils;
    g.WorkinUtils.__name__ = ["com", "workinman", "utils", "WorkinUtils"];
    g.WorkinUtils.getRandom = function(a, b, e) {
        null == e && (e = !0);
        var c = Math.random();
        1 == c && (c = 0.99);
        return e ? a + Math.floor(c * (b + 1 - a)) : a + c * (b - a)
    };
    L = function() {
        this.parent = this.firstChild = this.next =
            this.firstComponent = null;
        this._compMap = {}
    };
    j["flambe.Entity"] = L;
    L.__name__ = ["flambe", "Entity"];
    L.__interfaces__ = [k.Disposable];
    L.prototype = {
        dispose: function() {
            for (null != this.parent && this.parent.removeChild(this); null != this.firstComponent;) this.firstComponent.dispose();
            this.disposeChildren()
        },
        disposeChildren: function() {
            for (; null != this.firstChild;) this.firstChild.dispose()
        },
        removeChild: function(a) {
            for (var b = null, e = this.firstChild; null != e;) {
                var c = e.next;
                if (e == a) {
                    null == b ? this.firstChild = c : b.next = c;
                    e.parent =
                        null;
                    e.next = null;
                    break
                }
                b = e;
                e = c
            }
        },
        addChild: function(a, b) {
            null == b && (b = !0);
            null != a.parent && a.parent.removeChild(a);
            a.parent = this;
            if (b) {
                for (var e = null, c = this.firstChild; null != c;) e = c, c = c.next;
                null != e ? e.next = a : this.firstChild = a
            } else a.next = this.firstChild, this.firstChild = a;
            return this
        },
        remove: function(a) {
            for (var b = null, e = this.firstComponent; null != e;) {
                var c = e.next;
                if (e == a) {
                    null == b ? this.firstComponent = c : b._internal_init(this, c);
                    delete this._compMap[e.get_name()];
                    e.onRemoved();
                    e._internal_init(null, null);
                    break
                }
                b = e;
                e = c
            }
        },
        add: function(a) {
            var b = a.get_name(),
                e = this._compMap[b];
            null != e && this.remove(e);
            this._compMap[b] = a;
            b = null;
            for (e = this.firstComponent; null != e;) b = e, e = e.next;
            null != b ? b.next = a : this.firstComponent = a;
            a._internal_init(this, null);
            a.onAdded();
            return this
        },
        __class__: L
    };
    k.PackageLog = function() {};
    j["flambe.util.PackageLog"] = k.PackageLog;
    k.PackageLog.__name__ = ["flambe", "util", "PackageLog"];
    d = {
        Platform: function() {}
    };
    j["flambe.platform.Platform"] = d.Platform;
    d.Platform.__name__ = ["flambe", "platform",
        "Platform"
    ];
    d.Platform.prototype = {
        __class__: d.Platform
    };
    d.html = {};
    d.html.HtmlPlatform = function() {};
    j["flambe.platform.html.HtmlPlatform"] = d.html.HtmlPlatform;
    d.html.HtmlPlatform.__name__ = ["flambe", "platform", "html", "HtmlPlatform"];
    d.html.HtmlPlatform.__interfaces__ = [d.Platform];
    d.html.HtmlPlatform.prototype = {
        getY: function(a, b) {
            return this._stage.scaleFactor * (a.clientY - b.top)
        },
        getX: function(a, b) {
            return this._stage.scaleFactor * (a.clientX - b.left)
        },
        getRenderer: function() {
            return this._renderer
        },
        getWeb: function() {
            null ==
                this._web && (this._web = new d.html.HtmlWeb(this._container));
            return this._web
        },
        getKeyboard: function() {
            return this._keyboard
        },
        getTouch: function() {
            return this._touch
        },
        getMouse: function() {
            return this._mouse
        },
        getPointer: function() {
            return this._pointer
        },
        update: function(a) {
            var b = (a - this._lastUpdate) / 1E3;
            this._lastUpdate = a;
            this._skipFrame ? this._skipFrame = !1 : (this.mainLoop.update(b), this.mainLoop.render(this._renderer))
        },
        getTime: function() {
            return Date.now() / 1E3
        },
        createLogHandler: function() {
            return null
        },
        callNative: function(a,
            b) {
            null == b && (b = []);
            var e = M.field(z.window, a);
            try {
                return e.apply(null, b)
            } catch (c) {
                return null
            }
        },
        getLocale: function() {
            return z.window.navigator.language
        },
        getStorage: function() {
            if (null == this._storage) {
                var a = null;
                try {
                    a = z.window.localStorage
                } catch (b) {}
                this._storage = null != a ? new d.html.HtmlStorage(a) : new d.DummyStorage
            }
            return this._storage
        },
        getStage: function() {
            return this._stage
        },
        loadAssetPack: function(a) {
            return (new d.html.HtmlAssetPackLoader(this, a)).promise
        },
        init: function() {
            var a = this,
                b = null;
            try {
                b = z.window.flambe.canvas
            } catch (e) {}
            b.setAttribute("tabindex",
                "0");
            b.style.outlineStyle = "none";
            b.setAttribute("moz-opaque", "true");
            this._stage = new d.html.HtmlStage(b);
            this._pointer = new d.BasicPointer;
            this._mouse = new d.html.HtmlMouse(this._pointer, b);
            this._keyboard = new d.BasicKeyboard;
            this._renderer = new d.html.CanvasRenderer(b);
            C.hasGPU.set__(!0);
            this.mainLoop = new d.MainLoop;
            this._container = b.parentNode;
            this._container.style.overflow = "hidden";
            this._container.style.position = "relative";
            this._container.style.msTouchAction = "none";
            var c = 0,
                f = function(e) {
                    if (!(1E3 > e.timeStamp -
                            c)) {
                        var d = b.getBoundingClientRect(),
                            f = a.getX(e, d),
                            d = a.getY(e, d);
                        switch (e.type) {
                            case "mousedown":
                                e.target == b && (e.preventDefault(), a._mouse.submitDown(f, d, e.button), e.target.focus());
                                break;
                            case "mousemove":
                                a._mouse.submitMove(f, d);
                                break;
                            case "mouseup":
                                a._mouse.submitUp(f, d, e.button);
                                break;
                            case "mousewheel":
                            case "DOMMouseScroll":
                                a._mouse.submitScroll(f, d, "mousewheel" == e.type ? e.wheelDelta / 40 : -e.detail) && e.preventDefault()
                        }
                    }
                };
            window.addEventListener("mousedown", f, !1);
            window.addEventListener("mousemove",
                f, !1);
            window.addEventListener("mouseup", f, !1);
            b.addEventListener("mousewheel", f, !1);
            b.addEventListener("DOMMouseScroll", f, !1);
            if ("ontouchstart" in window) {
                var g = new d.BasicTouch(this._pointer);
                this._touch = g;
                f = function(b) {
                    var e = b.changedTouches,
                        f = b.target.getBoundingClientRect();
                    c = b.timeStamp;
                    switch (b.type) {
                        case "touchstart":
                            b.preventDefault();
                            d.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER && d.html.HtmlUtil.hideMobileBrowser();
                            for (b = 0; b < e.length;) {
                                var y = e[b];
                                ++b;
                                var h = a.getX(y, f),
                                    i = a.getY(y, f);
                                g.submitDown(y.identifier |
                                    0, h, i)
                            }
                            break;
                        case "touchmove":
                            b.preventDefault();
                            for (b = 0; b < e.length;) y = e[b], ++b, h = a.getX(y, f), i = a.getY(y, f), g.submitMove(y.identifier | 0, h, i);
                            break;
                        case "touchend":
                        case "touchcancel":
                            for (b = 0; b < e.length;) y = e[b], ++b, h = a.getX(y, f), i = a.getY(y, f), g.submitUp(y.identifier | 0, h, i)
                    }
                };
                b.addEventListener("touchstart", f, !1);
                b.addEventListener("touchmove", f, !1);
                b.addEventListener("touchend", f, !1);
                b.addEventListener("touchcancel", f, !1)
            } else this._touch = new d.DummyTouch;
            f = function(b) {
                switch (b.type) {
                    case "keydown":
                        a._keyboard.submitDown(b.keyCode) &&
                            b.preventDefault();
                        break;
                    case "keyup":
                        a._keyboard.submitUp(b.keyCode)
                }
            };
            b.addEventListener("keydown", f, !1);
            b.addEventListener("keyup", f, !1);
            var h = z.window.onerror;
            z.window.onerror = function(a, b, e) {
                C.uncaughtError.emit1(a);
                return null != h ? h(a, b, e) : !1
            };
            var i = d.html.HtmlUtil.loadExtension("hidden", z.document);
            null != i.value && (f = function() {
                C.hidden.set__(M.field(z.document, i.field))
            }, f(), z.document.addEventListener(i.prefix + "visibilitychange", f, !1), C.hidden.get_changed().connect(function(b) {
                b || (a._skipFrame = !0)
            }));
            this._lastUpdate = Date.now();
            this._skipFrame = !1;
            var j = d.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
            if (null != j) {
                var k = z.window.performance,
                    l = null != k && d.html.HtmlUtil.polyfill("now", k);
                l ? this._lastUpdate = k.now() : null;
                var m = null,
                    m = function(e) {
                        a.update(l ? k.now() : e);
                        j(m, b)
                    };
                j(m, b)
            } else z.window.setInterval(function() {
                a.update(Date.now())
            }, 1E3 / 60)
        },
        __class__: d.html.HtmlPlatform
    };
    k.Value = function(a, b) {
        this._value = a;
        null != b && (this._changed = new k.Signal2(b))
    };
    j["flambe.util.Value"] = k.Value;
    k.Value.__name__ = ["flambe", "util", "Value"];
    k.Value.prototype = {
        get_changed: function() {
            null == this._changed && (this._changed = new k.Signal2);
            return this._changed
        },
        set__: function(a) {
            var b = this._value;
            a != b && (this._value = a, null != this._changed && this._changed.emit2(a, b));
            return a
        },
        __class__: k.Value
    };
    k.SignalConnection = function(a, b) {
        this._internal_next = null;
        this._signal = a;
        this._internal_listener = b;
        this.stayInList = !0
    };
    j["flambe.util.SignalConnection"] = k.SignalConnection;
    k.SignalConnection.__name__ = ["flambe",
        "util", "SignalConnection"
    ];
    k.SignalConnection.__interfaces__ = [k.Disposable];
    k.SignalConnection.prototype = {
        dispose: function() {
            null != this._signal && (this._signal._internal_disconnect(this), this._signal = null)
        },
        once: function() {
            this.stayInList = !1;
            return this
        },
        __class__: k.SignalConnection
    };
    k.SignalBase = function(a) {
        this._head = null != a ? new k.SignalConnection(this, a) : null;
        this._deferredTasks = null
    };
    j["flambe.util.SignalBase"] = k.SignalBase;
    k.SignalBase.__name__ = ["flambe", "util", "SignalBase"];
    k.SignalBase.prototype = {
        listRemove: function(a) {
            for (var b = null, e = this._head; null != e;) {
                if (e == a) {
                    a = e._internal_next;
                    null == b ? this._head = a : b._internal_next = a;
                    break
                }
                b = e;
                e = e._internal_next
            }
        },
        listAdd: function(a, b) {
            if (b) a._internal_next = this._head, this._head = a;
            else {
                for (var e = null, c = this._head; null != c;) e = c, c = c._internal_next;
                null != e ? e._internal_next = a : this._head = a
            }
        },
        didEmit: function(a) {
            for (this._head = a; null != this._deferredTasks;) this._deferredTasks.fn(), this._deferredTasks = this._deferredTasks.next
        },
        willEmit: function() {
            var a = this._head;
            this._head = k.SignalBase.DISPATCHING_SENTINEL;
            return a
        },
        defer: function(a) {
            for (var b = null, e = this._deferredTasks; null != e;) b = e, e = e.next;
            a = new k._SignalBase.Task(a);
            null != b ? b.next = a : this._deferredTasks = a
        },
        emit2: function(a, b) {
            for (var e = this.willEmit(), c = e; null != c;) c._internal_listener(a, b), c.stayInList || c.dispose(), c = c._internal_next;
            this.didEmit(e)
        },
        emit1: function(a) {
            for (var b = this.willEmit(), e = b; null != e;) e._internal_listener(a), e.stayInList || e.dispose(), e = e._internal_next;
            this.didEmit(b)
        },
        emit0: function() {
            for (var a =
                    this.willEmit(), b = a; null != b;) b._internal_listener(), b.stayInList || b.dispose(), b = b._internal_next;
            this.didEmit(a)
        },
        _internal_disconnect: function(a) {
            var b = this;
            this._head == k.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                b.listRemove(a)
            }) : this.listRemove(a)
        },
        connectImpl: function(a, b) {
            var e = this,
                c = new k.SignalConnection(this, a);
            this._head == k.SignalBase.DISPATCHING_SENTINEL ? this.defer(function() {
                e.listAdd(c, b)
            }) : this.listAdd(c, b);
            return c
        },
        __class__: k.SignalBase
    };
    k.Signal2 = function(a) {
        k.SignalBase.call(this,
            a)
    };
    j["flambe.util.Signal2"] = k.Signal2;
    k.Signal2.__name__ = ["flambe", "util", "Signal2"];
    k.Signal2.__super__ = k.SignalBase;
    k.Signal2.prototype = r(k.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: k.Signal2
    });
    k.Signal1 = function(a) {
        k.SignalBase.call(this, a)
    };
    j["flambe.util.Signal1"] = k.Signal1;
    k.Signal1.__name__ = ["flambe", "util", "Signal1"];
    k.Signal1.__super__ = k.SignalBase;
    k.Signal1.prototype = r(k.SignalBase.prototype, {
        connect: function(a, b) {
            null == b && (b = !1);
            return this.connectImpl(a, b)
        },
        __class__: k.Signal1
    });
    C = function() {};
    j["flambe.System"] = C;
    C.__name__ = ["flambe", "System"];
    C.init = function() {
        C._calledInit || (C._platform.init(), C._calledInit = !0)
    };
    k.Logger = function(a) {
        this._handler = a
    };
    j["flambe.util.Logger"] = k.Logger;
    k.Logger.__name__ = ["flambe", "util", "Logger"];
    k.Logger.prototype = {
        __class__: k.Logger
    };
    U = function() {};
    j["flambe.Log"] = U;
    U.__name__ = ["flambe", "Log"];
    U.__super__ = k.PackageLog;
    U.prototype = r(k.PackageLog.prototype, {
        __class__: U
    });
    t = function(a) {
        null ==
            a && (a = 1);
        this._internal_realDt = 0;
        this.scale = new B.AnimatedFloat(a)
    };
    j["flambe.SpeedAdjuster"] = t;
    t.__name__ = ["flambe", "SpeedAdjuster"];
    t.__super__ = G;
    t.prototype = r(G.prototype, {
        onUpdate: function(a) {
            0 < this._internal_realDt && (a = this._internal_realDt, this._internal_realDt = 0);
            this.scale.update(a)
        },
        get_name: function() {
            return "SpeedAdjuster_5"
        },
        __class__: t
    });
    B = {
        AnimatedFloat: function(a, b) {
            k.Value.call(this, a, b)
        }
    };
    j["flambe.animation.AnimatedFloat"] = B.AnimatedFloat;
    B.AnimatedFloat.__name__ = ["flambe", "animation",
        "AnimatedFloat"
    ];
    B.AnimatedFloat.__super__ = k.Value;
    B.AnimatedFloat.prototype = r(k.Value.prototype, {
        set_behavior: function(a) {
            this._behavior = a;
            this.update(0);
            return a
        },
        update: function(a) {
            null != this._behavior && (k.Value.prototype.set__.call(this, this._behavior.update(a)), this._behavior.isComplete() && (this._behavior = null))
        },
        set__: function(a) {
            this._behavior = null;
            return k.Value.prototype.set__.call(this, a)
        },
        __class__: B.AnimatedFloat
    });
    B.Behavior = function() {};
    j["flambe.animation.Behavior"] = B.Behavior;
    B.Behavior.__name__ = ["flambe", "animation", "Behavior"];
    B.Behavior.prototype = {
        __class__: B.Behavior
    };
    B.Binding = function() {};
    j["flambe.animation.Binding"] = B.Binding;
    B.Binding.__name__ = ["flambe", "animation", "Binding"];
    B.Binding.__interfaces__ = [B.Behavior];
    B.Binding.prototype = {
        isComplete: function() {
            return !1
        },
        update: function() {
            var a = this._target._value;
            return null != this._fn ? this._fn(a) : a
        },
        __class__: B.Binding
    };
    v = {};
    v.AssetType = j["flambe.asset.AssetType"] = {
        __ename__: ["flambe", "asset", "AssetType"],
        __constructs__: ["Image", "Audio",
            "Data"
        ]
    };
    v.AssetType.Image = ["Image", 0];
    v.AssetType.Image.toString = n;
    v.AssetType.Image.__enum__ = v.AssetType;
    v.AssetType.Audio = ["Audio", 1];
    v.AssetType.Audio.toString = n;
    v.AssetType.Audio.__enum__ = v.AssetType;
    v.AssetType.Data = ["Data", 2];
    v.AssetType.Data.toString = n;
    v.AssetType.Data.__enum__ = v.AssetType;
    v.AssetEntry = function(a, b, e, c) {
        this.name = a;
        this.url = b;
        this.type = e;
        this.bytes = c
    };
    j["flambe.asset.AssetEntry"] = v.AssetEntry;
    v.AssetEntry.__name__ = ["flambe", "asset", "AssetEntry"];
    v.AssetEntry.prototype = {
        getUrlExtension: function() {
            return k.Strings.getFileExtension(this.url.split("?")[0]).toLowerCase()
        },
        __class__: v.AssetEntry
    };
    v.AssetPack = function() {};
    j["flambe.asset.AssetPack"] = v.AssetPack;
    v.AssetPack.__name__ = ["flambe", "asset", "AssetPack"];
    v.AssetPack.prototype = {
        __class__: v.AssetPack
    };
    J = void 0;
    z = void 0;
    ca = void 0;
    J = function() {};
    j["js.Boot"] = J;
    J.__name__ = ["js", "Boot"];
    J.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var e = typeof a;
        if ("function" == e && (a.__name__ || a.__ename__)) e = "object";
        switch (e) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        for (var e = a[0] + "(", b = b + "\t", c = 2, d = a.length; c < d;) var f = c++,
                            e = 2 != f ? e + ("," + J.__string_rec(a[f], b)) : e + J.__string_rec(a[f], b);
                        return e + ")"
                    }
                    c = a.length;
                    e = "[";
                    b += "\t";
                    for (d = 0; d < c;) f = d++, e += (0 < f ? "," : "") + J.__string_rec(a[f], b);
                    return e + "]"
                }
                try {
                    d = a.toString
                } catch (g) {
                    return "???"
                }
                if (null != d && d != Object.toString && (e = a.toString(), "[object Object]" != e)) return e;
                d = null;
                e = "{\n";
                b += "\t";
                c = null != a.hasOwnProperty;
                for (d in a)
                    if (!c || a.hasOwnProperty(d)) "prototype" == d || "__class__" == d || "__super__" == d || "__interfaces__" == d ||
                        "__properties__" == d || (2 != e.length && (e += ", \n"), e += b + d + " : " + J.__string_rec(a[d], b));
                b = b.substring(1);
                return e + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return "" + a
        }
    };
    J.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var e = a.__interfaces__;
        if (null != e)
            for (var c = 0, d = e.length; c < d;) {
                var f = c++,
                    f = e[f];
                if (f == b || J.__interfLoop(f, b)) return !0
            }
        return J.__interfLoop(a.__super__, b)
    };
    J.__instanceof = function(a, b) {
        try {
            if (a instanceof b) return b == Array ? null == a.__enum__ :
                !0;
            if (J.__interfLoop(a.__class__, b)) return !0
        } catch (e) {
            if (null == b) return !1
        }
        switch (b) {
            case fa:
                return Math.ceil(a % 2147483648) === a;
            case da:
                return "number" == typeof a;
            case ea:
                return !0 === a || !1 === a;
            case String:
                return "string" == typeof a;
            case ga:
                return !0;
            default:
                if (null == a) return !1;
                if (b == ha && null != a.__name__) return !0;
                null;
                if (b == ia && null != a.__ename__) return !0;
                null;
                return a.__enum__ == b
        }
    };
    k.Strings = function() {};
    j["flambe.util.Strings"] = k.Strings;
    k.Strings.__name__ = ["flambe", "util", "Strings"];
    k.Strings.getFileExtension =
        function(a) {
            var b = a.lastIndexOf(".");
            return 0 < b ? w.substr(a, b + 1, null) : null
        };
    k.Strings.removeFileExtension = function(a) {
        var b = a.lastIndexOf(".");
        return 0 < b ? w.substr(a, 0, b) : a
    };
    k.Strings.joinPath = function(a, b) {
        47 != a.charCodeAt(a.length - 1) && (a += "/");
        return a + b
    };
    k.Strings.withFields = function(a, b) {
        var e = b.length;
        if (0 < e) {
            for (var a = a + (0 < a.length ? " [" : "["), c = 0; c < e;) {
                0 < c && (a += ", ");
                var d = b[c],
                    f = b[c + 1];
                if (J.__instanceof(f, Error)) {
                    var g = f.stack;
                    null != g && (f = g)
                }
                a += d + "=" + p.string(f);
                c += 2
            }
            a += "]"
        }
        return a
    };
    z = function() {};
    j["js.Lib"] = z;
    z.__name__ = ["js", "Lib"];
    v.Manifest = function() {
        this._entries = []
    };
    j["flambe.asset.Manifest"] = v.Manifest;
    v.Manifest.__name__ = ["flambe", "asset", "Manifest"];
    v.Manifest.build = function(a, b) {
        null == b && (b = !0);
        var e = v.Manifest._buildManifest.get(a);
        if (null == e) {
            if (b) throw k.Strings.withFields("Missing asset pack", ["name", a]);
            return null
        }
        return e.clone()
    };
    v.Manifest.inferType = function(a) {
        a = k.Strings.getFileExtension(a.split("?")[0]);
        if (null != a) switch (a.toLowerCase()) {
            case "png":
            case "jpg":
            case "gif":
                return v.AssetType.Image;
            case "ogg":
            case "m4a":
            case "mp3":
            case "wav":
                return v.AssetType.Audio
        }
        return v.AssetType.Data
    };
    v.Manifest.createBuildManifests = function() {
        var a = new E;
        a.set("main_pack", [{
                name: "ui/AssetScreenSplash.jpg",
                md5: "88185689c3d4e4dd1f4935ba51f0cdb6",
                bytes: 203657
            }, {
                name: "ui/AssetScreenQuitConfirm.png",
                md5: "f0e3d9b38eeaf75ef60804b2d436b5f1",
                bytes: 109773
            }, {
                name: "ui/AssetScreenMenu.png",
                md5: "f3ca351863ff3a84842d6767a46a1a12",
                bytes: 84834
            }, {
                name: "ui/AssetScreenHUD.png",
                md5: "b397782024c15fdc5cea4743564895c7",
                bytes: 62644
            },
            {
                name: "ui/AssetScreenHelp.png",
                md5: "b46b73200aea0152c5c81121c880752e",
                bytes: 137446
            }, {
                name: "ui/AssetScreenEndGame.png",
                md5: "1af68ecbbfe065696160565f3c3973ca",
                bytes: 95229
            }, {
                name: "ui/AssetButtonYes.png",
                md5: "c02d1916564f5fb60ce3ef962198e403",
                bytes: 6901
            }, {
                name: "ui/AssetButtonSoundOn.png",
                md5: "f9c22b6f887ce27b5426d45e17341adc",
                bytes: 6703
            }, {
                name: "ui/AssetButtonSoundOff.png",
                md5: "27800185cd84ffadb726a72e221537f2",
                bytes: 7831
            }, {
                name: "ui/AssetButtonQuit.png",
                md5: "d56133859a008124597b1ec17a64d84b",
                bytes: 8551
            },
            {
                name: "ui/AssetButtonPlayAgain.png",
                md5: "990e9da0239edcdb4e3740192b133a90",
                bytes: 25534
            }, {
                name: "ui/AssetButtonPlay.png",
                md5: "520f159f1de04792c982c54fba5b79f6",
                bytes: 18679
            }, {
                name: "ui/AssetButtonPause.png",
                md5: "b1b027249e704020b29ac1f6562b305c",
                bytes: 4708
            }, {
                name: "ui/AssetButtonNo.png",
                md5: "6d5aff5bf8fe1b30dba98d5c1d42b6ad",
                bytes: 5555
            }, {
                name: "ui/AssetButtonHelp.png",
                md5: "96950df6ee488a3712b9093e034e9f30",
                bytes: 8409
            }, {
                name: "fonts/LHFHappyFunBallFlambe.png",
                md5: "497def9d94dc74541dccfb9bf0ee15f2",
                bytes: 246200
            },
            {
                name: "fonts/LHFHappyFunBallFlambe.fnt",
                md5: "d176cccad40d03692d11e33695d36a1c",
                bytes: 9705
            }, {
                name: "elements/AssetRock8.png",
                md5: "67df010132f0781dec01afdf70942945",
                bytes: 5659
            }, {
                name: "elements/AssetRock7.png",
                md5: "2cc0a2faaa064dc7bc468233b484afd3",
                bytes: 5109
            }, {
                name: "elements/AssetRock6.png",
                md5: "82dc10a8814f34e9d43028c6147bfdd0",
                bytes: 5978
            }, {
                name: "elements/AssetRock5.png",
                md5: "e24b905da8a7f7ec2f2a12e52d02301e",
                bytes: 5507
            }, {
                name: "elements/AssetRock4.png",
                md5: "cbb75460a371ff1f3599c5dcbf5397aa",
                bytes: 5088
            },
            {
                name: "elements/AssetRock3.png",
                md5: "96ff9fe48a3667ec48b4cff140172637",
                bytes: 4592
            }, {
                name: "elements/AssetRock2.png",
                md5: "da06027edb88d3970b9cecb122a058d7",
                bytes: 4769
            }, {
                name: "elements/AssetRock1.png",
                md5: "26e6d9a9e880db42b87a904f89836baf",
                bytes: 4862
            }, {
                name: "elements/AssetRock.png",
                md5: "77d4e1877013967ce93bfd7640db261a",
                bytes: 13250
            }, {
                name: "elements/AssetMoon.png",
                md5: "6d625e665579c66fed5040a6aa2d6adf",
                bytes: 38206
            }, {
                name: "elements/AssetLevelUp.png",
                md5: "328a24c02e544253299cc3bc7494ae32",
                bytes: 28699
            },
            {
                name: "elements/AssetLaser.png",
                md5: "177094d6e61353ea9e0a4645e0017522",
                bytes: 7312
            }, {
                name: "elements/AssetGround4.png",
                md5: "798e7086def605df76d5d3b4ea24b847",
                bytes: 375630
            }, {
                name: "elements/AssetGround3.png",
                md5: "8e526bf6bdf4f04f9b7f9106a1150298",
                bytes: 304525
            }, {
                name: "elements/AssetGround2.png",
                md5: "09d4b2418de8524f83b836d30a9d8b96",
                bytes: 380957
            }, {
                name: "elements/AssetGround1.png",
                md5: "91bfa3c946a50491660158c0b7e30804",
                bytes: 299953
            }, {
                name: "elements/AssetCloud.png",
                md5: "48eb5cd154abde2b766b11cda3245cb7",
                bytes: 36634
            }, {
                name: "elements/AssetBuilding4.png",
                md5: "d94bed7dee901b8172ab4934732877cc",
                bytes: 19865
            }, {
                name: "elements/AssetBuilding3.png",
                md5: "bb64ab4e8a3864f6fa046b0693389912",
                bytes: 23633
            }, {
                name: "elements/AssetBuilding2.png",
                md5: "d5bb58806acef56b4b957b209a8a3d96",
                bytes: 26625
            }, {
                name: "elements/AssetBuilding1.png",
                md5: "ee31fa63ecb6bb60dfe0f8eedaef2828",
                bytes: 20477
            }, {
                name: "elements/AssetBgSkyFlowers.png",
                md5: "3bc0cc438a2f460647d9e6ad9f52876a",
                bytes: 643705
            }, {
                name: "elements/AssetBgScrolling.png",
                md5: "934570014ef1f7e000ada1ceabe19e2c",
                bytes: 664802
            }, {
                name: "elements/AssetBack4.png",
                md5: "d47e982ed0ab050e60346c14e3255502",
                bytes: 278126
            }, {
                name: "elements/AssetBack3.png",
                md5: "e029590dd113a0d3d0a2261cd46a6832",
                bytes: 292691
            }, {
                name: "elements/AssetBack2.png",
                md5: "2101e95509bb1a8af8ce70c341c3e3e8",
                bytes: 260513
            }, {
                name: "elements/AssetBack1.png",
                md5: "50f61615876e18ddbbc4a710f2f9d0e4",
                bytes: 301970
            }, {
                name: "elements/AssetAcorn.png",
                md5: "167acd9c5eaec363dc2d04b02c56fa85",
                bytes: 4896
            }, {
                name: "audio/AssetSoundVillagerHappy.ogg",
                md5: "13a7aea766281b1dba229ad49bc72831",
                bytes: 12578
            }, {
                name: "audio/AssetSoundVillagerHappy.mp3",
                md5: "ca1fce0d2c54764a17d722b5ae8b836c",
                bytes: 74570
            }, {
                name: "audio/AssetSoundVillagerAngry2.ogg",
                md5: "7cae614a25427114745ae783bda59fe9",
                bytes: 11487
            }, {
                name: "audio/AssetSoundVillagerAngry2.mp3",
                md5: "ccd9a180bf55c50034af81dea8aea6d8",
                bytes: 12675
            }, {
                name: "audio/AssetSoundVillagerAngry1.ogg",
                md5: "b3e1390dd0a79470e33eddd810b7b3e7",
                bytes: 11871
            }, {
                name: "audio/AssetSoundVillagerAngry1.mp3",
                md5: "70a99fe397929a71e309bbbeb4f5c40e",
                bytes: 13091
            }, {
                name: "audio/AssetSoundTransform2.ogg",
                md5: "a40a960260290a6913778a6917206556",
                bytes: 19970
            }, {
                name: "audio/AssetSoundTransform2.mp3",
                md5: "db2326604dffbcc970dc03cad8138ac4",
                bytes: 18389
            }, {
                name: "audio/AssetSoundSmallLand.ogg",
                md5: "4677ce3b5a4c06784a238e859c9ff604",
                bytes: 17702
            }, {
                name: "audio/AssetSoundSmallLand.mp3",
                md5: "cbe4d08e5afa72a551bf10b00f5f4698",
                bytes: 24186
            }, {
                name: "audio/AssetSoundSmallJump.ogg",
                md5: "def1e9dab7ab3b3737b2e17d1dbc5c66",
                bytes: 10212
            }, {
                name: "audio/AssetSoundSmallJump.mp3",
                md5: "c88c318376965ed7f402de617a76ef3a",
                bytes: 6268
            },
            {
                name: "audio/AssetSoundSandyTransform.ogg",
                md5: "f519c6fdd7b76503e1ca8456f15565bf",
                bytes: 28701
            }, {
                name: "audio/AssetSoundSandyTransform.mp3",
                md5: "b8e5eb9b0cd05f6227e0ba6fbb2c01c4",
                bytes: 31403
            }, {
                name: "audio/AssetSoundSandyHurt2.ogg",
                md5: "1573172558f9afad01fc62174d6e71b7",
                bytes: 18973
            }, {
                name: "audio/AssetSoundSandyHurt2.mp3",
                md5: "1a640e8e3e131d7c1776bd6fc908dac3",
                bytes: 35557
            }, {
                name: "audio/AssetSoundSandyHurt1.ogg",
                md5: "3e39956d31293ab2c5bf6b7653b066ed",
                bytes: 25750
            }, {
                name: "audio/AssetSoundSandyHurt1.mp3",
                md5: "d606d052fc30788068476fc6f462741d",
                bytes: 29287
            }, {
                name: "audio/AssetSoundMoon.ogg",
                md5: "c5b249daad903ab0553361966c6995c0",
                bytes: 60388
            }, {
                name: "audio/AssetSoundMoon.mp3",
                md5: "5a2f3165c38c1aacb14a02c7eb225fa3",
                bytes: 47228
            }, {
                name: "audio/AssetSoundLevelUp.ogg",
                md5: "2ef7497ae4d64c37cb4729610471085f",
                bytes: 32636
            }, {
                name: "audio/AssetSoundLevelUp.mp3",
                md5: "66c7a30e2b1ee9c5dae94ad017adbf1e",
                bytes: 25998
            }, {
                name: "audio/AssetSoundHappy.ogg",
                md5: "3eddb2bbdfe95644179a8bd18045f11a",
                bytes: 12446
            }, {
                name: "audio/AssetSoundHappy.mp3",
                md5: "697ee46f3b8385f2f1970cf8d66b9c11",
                bytes: 74395
            }, {
                name: "audio/AssetSoundCrashRock.ogg",
                md5: "ea640e396615767c56d0d82346212703",
                bytes: 39255
            }, {
                name: "audio/AssetSoundCrashRock.mp3",
                md5: "833f0cc40ceeb5253e213f124ccc777e",
                bytes: 32943
            }, {
                name: "audio/AssetSoundBonus.ogg",
                md5: "10ccff3c0a6c2f135fa74e156a620da8",
                bytes: 6358
            }, {
                name: "audio/AssetSoundBonus.mp3",
                md5: "b9ef456b5aff73c85b136cc3ca8f92be",
                bytes: 5004
            }, {
                name: "audio/AssetSoundBigLand.ogg",
                md5: "0dfe4bfe3d9df4d95ecb25152b3e2128",
                bytes: 15752
            }, {
                name: "audio/AssetSoundBigLand.mp3",
                md5: "659e1d8b0c7ef115268533c57c9a4b14",
                bytes: 12119
            }, {
                name: "audio/AssetSoundBigJump.ogg",
                md5: "362cdf19f1e76f40f4519c7a15485c20",
                bytes: 10014
            }, {
                name: "audio/AssetSoundBigJump.mp3",
                md5: "cb2b691601ce562d4dacacdafcf4fabb",
                bytes: 8908
            }, {
                name: "audio/AssetSoundAngry.ogg",
                md5: "3bf50e949ccd6670cbba6046179d2017",
                bytes: 11760
            }, {
                name: "audio/AssetSoundAngry.mp3",
                md5: "4d3fcbce064e6bc0d20f3dab8cd3f42b",
                bytes: 12955
            }, {
                name: "audio/AssetMusic.ogg",
                md5: "0aadff1ef43c500f98400857f2e046f8",
                bytes: 718854
            }, {
                name: "audio/AssetMusic.mp3",
                md5: "0b774d7e7dac34a5e4ecbdcc1d14c48f",
                bytes: 547943
            }, {
                name: "anim_player/library.json",
                md5: "9b7aee8deb840e625ff3be59471ff446",
                bytes: 162234
            }, {
                name: "anim_player/atlas0.png",
                md5: "8c8c531e81479f4ff5bd680858cd83d0",
                bytes: 48888
            }, {
                name: "anim_fish/library.json",
                md5: "bde3c99eef7e05508fb03a34f2fc7338",
                bytes: 56344
            }, {
                name: "anim_fish/atlas0.png",
                md5: "c54234c7904a3e9b432a090db50ad661",
                bytes: 27734
            }, {
                name: "anim_effects/library.json",
                md5: "8e189702e4395dea3d0f85da452d3c73",
                bytes: 10619
            }, {
                name: "anim_effects/atlas0.png",
                md5: "756cdc7ecd356f0662777ec614d0383f",
                bytes: 38448
            }
        ]);
        a.set("bootstrap", [{
            name: "ui/AssetScreenLoadLevel.png",
            md5: "8b543ad257f660b1c10c1ae0375d8fff",
            bytes: 638665
        }, {
            name: "config/config.xml",
            md5: "de662b15a8b2c58b499e2489ca5cc8f1",
            bytes: 335
        }]);
        for (var b = new E, e = a.keys(); e.hasNext();) {
            var c = e.next(),
                d = new v.Manifest;
            d.set_relativeBasePath("assets");
            for (var f = 0, g = a.get(c); f < g.length;) {
                var h = g[f];
                ++f;
                var i = h.name,
                    j = c + "/" + i + "?v=" + p.string(h.md5),
                    l = v.Manifest.inferType(i);
                if (l == v.AssetType.Image || l == v.AssetType.Audio) i =
                    k.Strings.removeFileExtension(i);
                d.add(i, j, h.bytes, l)
            }
            b.set(c, d)
        }
        return b
    };
    v.Manifest.prototype = {
        set_externalBasePath: function(a) {
            this._externalBasePath = a;
            null != a && null;
            return a
        },
        get_externalBasePath: function() {
            return this._externalBasePath
        },
        set_relativeBasePath: function(a) {
            this._relativeBasePath = a;
            null != a && null;
            return a
        },
        get_relativeBasePath: function() {
            return this._relativeBasePath
        },
        getFullURL: function(a) {
            var b = null != this.get_externalBasePath() && v.Manifest._supportsCrossOrigin ? this.get_externalBasePath() :
                this.get_relativeBasePath(),
                e = null != this.get_externalBasePath() ? this.get_externalBasePath() : this.get_relativeBasePath();
            a.type == v.AssetType.Data && (e = b);
            return null != e ? k.Strings.joinPath(e, a.url) : a.url
        },
        clone: function() {
            var a = new v.Manifest;
            a.set_relativeBasePath(this.get_relativeBasePath());
            a.set_externalBasePath(this.get_externalBasePath());
            a._entries = this._entries.slice();
            return a
        },
        iterator: function() {
            return w.iter(this._entries)
        },
        add: function(a, b, e, c) {
            null == e && (e = 0);
            null == c && (c = v.Manifest.inferType(b));
            a = new v.AssetEntry(a, b, c, e);
            this._entries.push(a);
            return a
        },
        __class__: v.Manifest
    };
    m = {};
    m.BlendMode = j["flambe.display.BlendMode"] = {
        __ename__: ["flambe", "display", "BlendMode"],
        __constructs__: ["Normal", "Add", "CopyExperimental"]
    };
    m.BlendMode.Normal = ["Normal", 0];
    m.BlendMode.Normal.toString = n;
    m.BlendMode.Normal.__enum__ = m.BlendMode;
    m.BlendMode.Add = ["Add", 1];
    m.BlendMode.Add.toString = n;
    m.BlendMode.Add.__enum__ = m.BlendMode;
    m.BlendMode.CopyExperimental = ["CopyExperimental", 2];
    m.BlendMode.CopyExperimental.toString =
        n;
    m.BlendMode.CopyExperimental.__enum__ = m.BlendMode;
    F = {
        Point: function(a, b) {
            null == b && (b = 0);
            null == a && (a = 0);
            this.x = a;
            this.y = b
        }
    };
    j["flambe.math.Point"] = F.Point;
    F.Point.__name__ = ["flambe", "math", "Point"];
    F.Point.prototype = {
        __class__: F.Point
    };
    m.Sprite = function() {
        this.blendMode = null;
        var a = this;
        this._flags = 11;
        this._localMatrix = new F.Matrix;
        var b = function() {
            a._flags |= 12
        };
        this.x = new B.AnimatedFloat(0, b);
        this.y = new B.AnimatedFloat(0, b);
        this.rotation = new B.AnimatedFloat(0, b);
        this.scaleX = new B.AnimatedFloat(1,
            b);
        this.scaleY = new B.AnimatedFloat(1, b);
        this.anchorX = new B.AnimatedFloat(0, b);
        this.anchorY = new B.AnimatedFloat(0, b);
        this.alpha = new B.AnimatedFloat(1)
    };
    j["flambe.display.Sprite"] = m.Sprite;
    m.Sprite.__name__ = ["flambe", "display", "Sprite"];
    m.Sprite.hitTest = function(a, b, e) {
        var c = a._compMap.Sprite_1;
        if (null != c) {
            if (3 != (c._flags & 3)) return null;
            c.getLocalMatrix().inverseTransform(b, e, m.Sprite._scratchPoint) && (b = m.Sprite._scratchPoint.x, e = m.Sprite._scratchPoint.y)
        }
        a = m.Sprite.hitTestBackwards(a.firstChild, b,
            e);
        return null != a ? a : null != c && c.containsLocal(b, e) ? c : null
    };
    m.Sprite.render = function(a, b) {
        var e = a._compMap.Sprite_1;
        if (null != e) {
            var c = e.alpha._value;
            if (0 == (e._flags & 1) || 0 >= c) return;
            b.save();
            1 > c && b.multiplyAlpha(c);
            null != e.blendMode && b.setBlendMode(e.blendMode);
            c = e.getLocalMatrix();
            b.transform(c.m00, c.m10, c.m01, c.m11, c.m02, c.m12);
            e.draw(b)
        }
        c = a._compMap.Director_0;
        if (null != c)
            for (var c = c.occludedScenes, d = 0; d < c.length;) {
                var f = c[d];
                ++d;
                m.Sprite.render(f, b)
            }
        for (c = a.firstChild; null != c;) d = c.next, m.Sprite.render(c,
            b), c = d;
        null != e && b.restore()
    };
    m.Sprite.hitTestBackwards = function(a, b, e) {
        if (null != a) {
            var c = m.Sprite.hitTestBackwards(a.next, b, e);
            return null != c ? c : m.Sprite.hitTest(a, b, e)
        }
        return null
    };
    m.Sprite.__super__ = G;
    m.Sprite.prototype = r(G.prototype, {
        set_pointerEnabled: function(a) {
            this._flags = k.BitSets.set(this._flags, 2, a);
            return a
        },
        set_visible: function(a) {
            this._flags = k.BitSets.set(this._flags, 1, a);
            return a
        },
        get_pointerUp: function() {
            null == this._internal_pointerUp && (this._internal_pointerUp = new k.Signal1);
            return this._internal_pointerUp
        },
        get_pointerMove: function() {
            null == this._internal_pointerMove && (this._internal_pointerMove = new k.Signal1);
            return this._internal_pointerMove
        },
        get_pointerDown: function() {
            null == this._internal_pointerDown && (this._internal_pointerDown = new k.Signal1);
            return this._internal_pointerDown
        },
        draw: function() {},
        onUpdate: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.rotation.update(a);
            this.scaleX.update(a);
            this.scaleY.update(a);
            this.alpha.update(a);
            this.anchorX.update(a);
            this.anchorY.update(a)
        },
        setAnchor: function(a,
            b) {
            this.anchorX.set__(a);
            this.anchorY.set__(b);
            return this
        },
        getLocalMatrix: function() {
            0 != (this._flags & 4) && (this._flags &= -5, this._localMatrix.compose(this.x._value, this.y._value, this.scaleX._value, this.scaleY._value, 3.141592653589793 * this.rotation._value / 180), this._localMatrix.translate(-this.anchorX._value, -this.anchorY._value));
            return this._localMatrix
        },
        containsLocal: function(a, b) {
            return 0 <= a && a < this.getNaturalWidth() && 0 <= b && b < this.getNaturalHeight()
        },
        getNaturalHeight: function() {
            return 0
        },
        getNaturalWidth: function() {
            return 0
        },
        get_name: function() {
            return "Sprite_1"
        },
        __class__: m.Sprite
    });
    m.FillSprite = function() {};
    j["flambe.display.FillSprite"] = m.FillSprite;
    m.FillSprite.__name__ = ["flambe", "display", "FillSprite"];
    m.FillSprite.__super__ = m.Sprite;
    m.FillSprite.prototype = r(m.Sprite.prototype, {
        onUpdate: function(a) {
            m.Sprite.prototype.onUpdate.call(this, a);
            this.width.update(a);
            this.height.update(a)
        },
        getNaturalHeight: function() {
            return this.height._value
        },
        getNaturalWidth: function() {
            return this.width._value
        },
        draw: function(a) {
            a.fillRect(this.color,
                0, 0, this.width._value, this.height._value)
        },
        __class__: m.FillSprite
    });
    m.Font = function(a, b) {
        this.name = b;
        this._glyphs = new Q;
        for (var e = new m._Font.ConfigParser(a.getFile(b + ".fnt")), c = new Q, d = b.lastIndexOf("/"), d = 0 <= d ? w.substr(b, 0, d + 1) : "", f = e.keywords(); f.hasNext();) switch (f.next()) {
            case "info":
                for (var g = e.pairs(); g.hasNext();) {
                    var h = g.next();
                    switch (h.key) {
                        case "size":
                            this.size = h.getInt()
                    }
                }
                break;
            case "page":
                for (var g = 0, i = null, j = e.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
                    case "id":
                        g = h.getInt();
                        break;
                    case "file":
                        i = h.getString()
                }
                c.set(g, a.getTexture(d + k.Strings.removeFileExtension(i)));
                break;
            case "char":
                g = null;
                for (i = e.pairs(); i.hasNext();) switch (h = i.next(), h.key) {
                    case "id":
                        g = new m.Glyph(h.getInt());
                        break;
                    case "x":
                        g.x = h.getInt();
                        break;
                    case "y":
                        g.y = h.getInt();
                        break;
                    case "width":
                        g.width = h.getInt();
                        break;
                    case "height":
                        g.height = h.getInt();
                        break;
                    case "page":
                        g.page = c.get(h.getInt());
                        break;
                    case "xoffset":
                        g.xOffset = h.getInt();
                        break;
                    case "yoffset":
                        g.yOffset = h.getInt();
                        break;
                    case "xadvance":
                        g.xAdvance = h.getInt()
                }
                this._glyphs.set(g.charCode,
                    g);
                break;
            case "kerning":
                g = null;
                i = -1;
                for (j = e.pairs(); j.hasNext();) switch (h = j.next(), h.key) {
                    case "first":
                        g = this._glyphs.get(h.getInt());
                        break;
                    case "second":
                        i = h.getInt();
                        break;
                    case "amount":
                        g._internal_setKerning(i, h.getInt())
                }
        }
    };
    j["flambe.display.Font"] = m.Font;
    m.Font.__name__ = ["flambe", "display", "Font"];
    m.Font.prototype = {
        getGlyphs: function(a) {
            for (var b = [], e = 0, c = a.length; e < c;) {
                var d = e++,
                    d = this._glyphs.get(a.charCodeAt(d));
                null != d ? b.push(d) : null
            }
            return b
        },
        __class__: m.Font
    };
    m.Glyph = function(a) {
        this.charCode =
            a
    };
    j["flambe.display.Glyph"] = m.Glyph;
    m.Glyph.__name__ = ["flambe", "display", "Glyph"];
    m.Glyph.prototype = {
        _internal_setKerning: function(a, b) {
            null == this._kernings && (this._kernings = new Q);
            this._kernings.set(a, b)
        },
        getKerning: function(a) {
            return null != this._kernings ? this._kernings.get(a) | 0 : 0
        },
        draw: function(a, b, e) {
            0 < this.width && a.drawSubImage(this.page, b + this.xOffset, e + this.yOffset, this.x, this.y, this.width, this.height)
        },
        __class__: m.Glyph
    };
    m._Font = {};
    m._Font.ConfigParser = function(a) {
        this._configText = a;
        this._keywordPattern =
            new S("([a-z]+)(.*)", "");
        this._pairPattern = new S('([a-z]+)=("[^"]*"|[^\\s]+)', "")
    };
    j["flambe.display._Font.ConfigParser"] = m._Font.ConfigParser;
    m._Font.ConfigParser.__name__ = ["flambe", "display", "_Font", "ConfigParser"];
    m._Font.ConfigParser.advance = function(a, b) {
        var e = b.matchedPos();
        return w.substr(a, e.pos + e.len, a.length)
    };
    m._Font.ConfigParser.prototype = {
        pairs: function() {
            var a = this,
                b = this._pairText;
            return {
                next: function() {
                    b = m._Font.ConfigParser.advance(b, a._pairPattern);
                    return new m._Font.ConfigPair(a._pairPattern.matched(1),
                        a._pairPattern.matched(2))
                },
                hasNext: function() {
                    return a._pairPattern.match(b)
                }
            }
        },
        keywords: function() {
            var a = this,
                b = this._configText;
            return {
                next: function() {
                    b = m._Font.ConfigParser.advance(b, a._keywordPattern);
                    a._pairText = a._keywordPattern.matched(2);
                    return a._keywordPattern.matched(1)
                },
                hasNext: function() {
                    return a._keywordPattern.match(b)
                }
            }
        },
        __class__: m._Font.ConfigParser
    };
    m._Font.ConfigPair = function(a, b) {
        this.key = a;
        this._value = b
    };
    j["flambe.display._Font.ConfigPair"] = m._Font.ConfigPair;
    m._Font.ConfigPair.__name__ = ["flambe", "display", "_Font", "ConfigPair"];
    m._Font.ConfigPair.prototype = {
        getString: function() {
            return 34 != this._value.charCodeAt(0) ? null : w.substr(this._value, 1, this._value.length - 2)
        },
        getInt: function() {
            return p.parseInt(this._value)
        },
        __class__: m._Font.ConfigPair
    };
    m.Graphics = function() {};
    j["flambe.display.Graphics"] = m.Graphics;
    m.Graphics.__name__ = ["flambe", "display", "Graphics"];
    m.Graphics.prototype = {
        __class__: m.Graphics
    };
    m.ImageSprite = function(a) {
        m.Sprite.call(this);
        this.texture = a
    };
    j["flambe.display.ImageSprite"] =
        m.ImageSprite;
    m.ImageSprite.__name__ = ["flambe", "display", "ImageSprite"];
    m.ImageSprite.__super__ = m.Sprite;
    m.ImageSprite.prototype = r(m.Sprite.prototype, {
        getNaturalHeight: function() {
            return this.texture.get_height()
        },
        getNaturalWidth: function() {
            return this.texture.get_width()
        },
        draw: function(a) {
            a.drawImage(this.texture, 0, 0)
        },
        __class__: m.ImageSprite
    });
    m.Orientation = j["flambe.display.Orientation"] = {
        __ename__: ["flambe", "display", "Orientation"],
        __constructs__: ["Portrait", "Landscape"]
    };
    m.Orientation.Portrait = ["Portrait", 0];
    m.Orientation.Portrait.toString = n;
    m.Orientation.Portrait.__enum__ = m.Orientation;
    m.Orientation.Landscape = ["Landscape", 1];
    m.Orientation.Landscape.toString = n;
    m.Orientation.Landscape.__enum__ = m.Orientation;
    m.Stage = function() {};
    j["flambe.display.Stage"] = m.Stage;
    m.Stage.__name__ = ["flambe", "display", "Stage"];
    m.Stage.prototype = {
        __class__: m.Stage
    };
    m.TextSprite = function(a, b) {
        null == b && (b = "");
        this._width = this._height = 0;
        this._glyphs = this._offsets = this._font = this._text = null;
        m.Sprite.call(this);
        this._font =
            a;
        this._text = b;
        this._flags |= 32
    };
    j["flambe.display.TextSprite"] = m.TextSprite;
    m.TextSprite.__name__ = ["flambe", "display", "TextSprite"];
    m.TextSprite.__super__ = m.Sprite;
    m.TextSprite.prototype = r(m.Sprite.prototype, {
        updateGlyphs: function() {
            if (0 != (this._flags & 32)) {
                this._flags &= -33;
                this._glyphs = this._font.getGlyphs(this._text);
                this._offsets = [0];
                for (var a = this._height = this._width = 0, b = this._glyphs.length; a < b;) {
                    var e = this._glyphs[a];
                    ++a;
                    a == b ? this._width += e.width : (this._width += e.xAdvance + e.getKerning(this._glyphs[a].charCode),
                        this._offsets.push(this._width));
                    this._height = F.FMath.max(this._height, e.height + e.yOffset)
                }
            }
        },
        set_font: function(a) {
            this._font = a;
            this._flags |= 32;
            return a
        },
        set_text: function(a) {
            this._text = a;
            this._flags |= 32;
            return a
        },
        getNaturalHeight: function() {
            this.updateGlyphs();
            return this._height
        },
        getNaturalWidth: function() {
            this.updateGlyphs();
            return this._width
        },
        draw: function(a) {
            this.updateGlyphs();
            for (var b = 0, e = this._glyphs.length; b < e;) this._glyphs[b].draw(a, this._offsets[b], 0), ++b
        },
        __class__: m.TextSprite
    });
    m.Texture =
        function() {};
    j["flambe.display.Texture"] = m.Texture;
    m.Texture.__name__ = ["flambe", "display", "Texture"];
    m.Texture.prototype = {
        __class__: m.Texture
    };
    c = {};
    c.Key = j["flambe.input.Key"] = {
        __ename__: ["flambe", "input", "Key"],
        __constructs__: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Number0,Number1,Number2,Number3,Number4,Number5,Number6,Number7,Number8,Number9,Numpad0,Numpad1,Numpad2,Numpad3,Numpad4,Numpad5,Numpad6,Numpad7,Numpad8,Numpad9,NumpadAdd,NumpadDecimal,NumpadDivide,NumpadEnter,NumpadMultiply,NumpadSubtract,F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12,F13,F14,F15,Left,Up,Right,Down,Alt,Backquote,Backslash,Backspace,CapsLock,Comma,Command,Control,Delete,End,Enter,Equals,Escape,Home,Insert,LeftBracket,Minus,PageDown,PageUp,Period,Quote,RightBracket,Semicolon,Shift,Slash,Space,Tab,Menu,Search,Unknown".split(",")
    };
    c.Key.A = ["A", 0];
    c.Key.A.toString = n;
    c.Key.A.__enum__ = c.Key;
    c.Key.B = ["B", 1];
    c.Key.B.toString = n;
    c.Key.B.__enum__ = c.Key;
    c.Key.C = ["C", 2];
    c.Key.C.toString = n;
    c.Key.C.__enum__ = c.Key;
    c.Key.D = ["D", 3];
    c.Key.D.toString = n;
    c.Key.D.__enum__ = c.Key;
    c.Key.E = ["E", 4];
    c.Key.E.toString = n;
    c.Key.E.__enum__ = c.Key;
    c.Key.F = ["F", 5];
    c.Key.F.toString = n;
    c.Key.F.__enum__ = c.Key;
    c.Key.G = ["G", 6];
    c.Key.G.toString = n;
    c.Key.G.__enum__ = c.Key;
    c.Key.H = ["H", 7];
    c.Key.H.toString = n;
    c.Key.H.__enum__ = c.Key;
    c.Key.I = ["I", 8];
    c.Key.I.toString = n;
    c.Key.I.__enum__ =
        c.Key;
    c.Key.J = ["J", 9];
    c.Key.J.toString = n;
    c.Key.J.__enum__ = c.Key;
    c.Key.K = ["K", 10];
    c.Key.K.toString = n;
    c.Key.K.__enum__ = c.Key;
    c.Key.L = ["L", 11];
    c.Key.L.toString = n;
    c.Key.L.__enum__ = c.Key;
    c.Key.M = ["M", 12];
    c.Key.M.toString = n;
    c.Key.M.__enum__ = c.Key;
    c.Key.N = ["N", 13];
    c.Key.N.toString = n;
    c.Key.N.__enum__ = c.Key;
    c.Key.O = ["O", 14];
    c.Key.O.toString = n;
    c.Key.O.__enum__ = c.Key;
    c.Key.P = ["P", 15];
    c.Key.P.toString = n;
    c.Key.P.__enum__ = c.Key;
    c.Key.Q = ["Q", 16];
    c.Key.Q.toString = n;
    c.Key.Q.__enum__ = c.Key;
    c.Key.R = ["R", 17];
    c.Key.R.toString =
        n;
    c.Key.R.__enum__ = c.Key;
    c.Key.S = ["S", 18];
    c.Key.S.toString = n;
    c.Key.S.__enum__ = c.Key;
    c.Key.T = ["T", 19];
    c.Key.T.toString = n;
    c.Key.T.__enum__ = c.Key;
    c.Key.U = ["U", 20];
    c.Key.U.toString = n;
    c.Key.U.__enum__ = c.Key;
    c.Key.V = ["V", 21];
    c.Key.V.toString = n;
    c.Key.V.__enum__ = c.Key;
    c.Key.W = ["W", 22];
    c.Key.W.toString = n;
    c.Key.W.__enum__ = c.Key;
    c.Key.X = ["X", 23];
    c.Key.X.toString = n;
    c.Key.X.__enum__ = c.Key;
    c.Key.Y = ["Y", 24];
    c.Key.Y.toString = n;
    c.Key.Y.__enum__ = c.Key;
    c.Key.Z = ["Z", 25];
    c.Key.Z.toString = n;
    c.Key.Z.__enum__ = c.Key;
    c.Key.Number0 = ["Number0", 26];
    c.Key.Number0.toString = n;
    c.Key.Number0.__enum__ = c.Key;
    c.Key.Number1 = ["Number1", 27];
    c.Key.Number1.toString = n;
    c.Key.Number1.__enum__ = c.Key;
    c.Key.Number2 = ["Number2", 28];
    c.Key.Number2.toString = n;
    c.Key.Number2.__enum__ = c.Key;
    c.Key.Number3 = ["Number3", 29];
    c.Key.Number3.toString = n;
    c.Key.Number3.__enum__ = c.Key;
    c.Key.Number4 = ["Number4", 30];
    c.Key.Number4.toString = n;
    c.Key.Number4.__enum__ = c.Key;
    c.Key.Number5 = ["Number5", 31];
    c.Key.Number5.toString = n;
    c.Key.Number5.__enum__ = c.Key;
    c.Key.Number6 = ["Number6",
        32
    ];
    c.Key.Number6.toString = n;
    c.Key.Number6.__enum__ = c.Key;
    c.Key.Number7 = ["Number7", 33];
    c.Key.Number7.toString = n;
    c.Key.Number7.__enum__ = c.Key;
    c.Key.Number8 = ["Number8", 34];
    c.Key.Number8.toString = n;
    c.Key.Number8.__enum__ = c.Key;
    c.Key.Number9 = ["Number9", 35];
    c.Key.Number9.toString = n;
    c.Key.Number9.__enum__ = c.Key;
    c.Key.Numpad0 = ["Numpad0", 36];
    c.Key.Numpad0.toString = n;
    c.Key.Numpad0.__enum__ = c.Key;
    c.Key.Numpad1 = ["Numpad1", 37];
    c.Key.Numpad1.toString = n;
    c.Key.Numpad1.__enum__ = c.Key;
    c.Key.Numpad2 = ["Numpad2", 38];
    c.Key.Numpad2.toString = n;
    c.Key.Numpad2.__enum__ = c.Key;
    c.Key.Numpad3 = ["Numpad3", 39];
    c.Key.Numpad3.toString = n;
    c.Key.Numpad3.__enum__ = c.Key;
    c.Key.Numpad4 = ["Numpad4", 40];
    c.Key.Numpad4.toString = n;
    c.Key.Numpad4.__enum__ = c.Key;
    c.Key.Numpad5 = ["Numpad5", 41];
    c.Key.Numpad5.toString = n;
    c.Key.Numpad5.__enum__ = c.Key;
    c.Key.Numpad6 = ["Numpad6", 42];
    c.Key.Numpad6.toString = n;
    c.Key.Numpad6.__enum__ = c.Key;
    c.Key.Numpad7 = ["Numpad7", 43];
    c.Key.Numpad7.toString = n;
    c.Key.Numpad7.__enum__ = c.Key;
    c.Key.Numpad8 = ["Numpad8", 44];
    c.Key.Numpad8.toString =
        n;
    c.Key.Numpad8.__enum__ = c.Key;
    c.Key.Numpad9 = ["Numpad9", 45];
    c.Key.Numpad9.toString = n;
    c.Key.Numpad9.__enum__ = c.Key;
    c.Key.NumpadAdd = ["NumpadAdd", 46];
    c.Key.NumpadAdd.toString = n;
    c.Key.NumpadAdd.__enum__ = c.Key;
    c.Key.NumpadDecimal = ["NumpadDecimal", 47];
    c.Key.NumpadDecimal.toString = n;
    c.Key.NumpadDecimal.__enum__ = c.Key;
    c.Key.NumpadDivide = ["NumpadDivide", 48];
    c.Key.NumpadDivide.toString = n;
    c.Key.NumpadDivide.__enum__ = c.Key;
    c.Key.NumpadEnter = ["NumpadEnter", 49];
    c.Key.NumpadEnter.toString = n;
    c.Key.NumpadEnter.__enum__ =
        c.Key;
    c.Key.NumpadMultiply = ["NumpadMultiply", 50];
    c.Key.NumpadMultiply.toString = n;
    c.Key.NumpadMultiply.__enum__ = c.Key;
    c.Key.NumpadSubtract = ["NumpadSubtract", 51];
    c.Key.NumpadSubtract.toString = n;
    c.Key.NumpadSubtract.__enum__ = c.Key;
    c.Key.F1 = ["F1", 52];
    c.Key.F1.toString = n;
    c.Key.F1.__enum__ = c.Key;
    c.Key.F2 = ["F2", 53];
    c.Key.F2.toString = n;
    c.Key.F2.__enum__ = c.Key;
    c.Key.F3 = ["F3", 54];
    c.Key.F3.toString = n;
    c.Key.F3.__enum__ = c.Key;
    c.Key.F4 = ["F4", 55];
    c.Key.F4.toString = n;
    c.Key.F4.__enum__ = c.Key;
    c.Key.F5 = ["F5", 56];
    c.Key.F5.toString =
        n;
    c.Key.F5.__enum__ = c.Key;
    c.Key.F6 = ["F6", 57];
    c.Key.F6.toString = n;
    c.Key.F6.__enum__ = c.Key;
    c.Key.F7 = ["F7", 58];
    c.Key.F7.toString = n;
    c.Key.F7.__enum__ = c.Key;
    c.Key.F8 = ["F8", 59];
    c.Key.F8.toString = n;
    c.Key.F8.__enum__ = c.Key;
    c.Key.F9 = ["F9", 60];
    c.Key.F9.toString = n;
    c.Key.F9.__enum__ = c.Key;
    c.Key.F10 = ["F10", 61];
    c.Key.F10.toString = n;
    c.Key.F10.__enum__ = c.Key;
    c.Key.F11 = ["F11", 62];
    c.Key.F11.toString = n;
    c.Key.F11.__enum__ = c.Key;
    c.Key.F12 = ["F12", 63];
    c.Key.F12.toString = n;
    c.Key.F12.__enum__ = c.Key;
    c.Key.F13 = ["F13", 64];
    c.Key.F13.toString =
        n;
    c.Key.F13.__enum__ = c.Key;
    c.Key.F14 = ["F14", 65];
    c.Key.F14.toString = n;
    c.Key.F14.__enum__ = c.Key;
    c.Key.F15 = ["F15", 66];
    c.Key.F15.toString = n;
    c.Key.F15.__enum__ = c.Key;
    c.Key.Left = ["Left", 67];
    c.Key.Left.toString = n;
    c.Key.Left.__enum__ = c.Key;
    c.Key.Up = ["Up", 68];
    c.Key.Up.toString = n;
    c.Key.Up.__enum__ = c.Key;
    c.Key.Right = ["Right", 69];
    c.Key.Right.toString = n;
    c.Key.Right.__enum__ = c.Key;
    c.Key.Down = ["Down", 70];
    c.Key.Down.toString = n;
    c.Key.Down.__enum__ = c.Key;
    c.Key.Alt = ["Alt", 71];
    c.Key.Alt.toString = n;
    c.Key.Alt.__enum__ =
        c.Key;
    c.Key.Backquote = ["Backquote", 72];
    c.Key.Backquote.toString = n;
    c.Key.Backquote.__enum__ = c.Key;
    c.Key.Backslash = ["Backslash", 73];
    c.Key.Backslash.toString = n;
    c.Key.Backslash.__enum__ = c.Key;
    c.Key.Backspace = ["Backspace", 74];
    c.Key.Backspace.toString = n;
    c.Key.Backspace.__enum__ = c.Key;
    c.Key.CapsLock = ["CapsLock", 75];
    c.Key.CapsLock.toString = n;
    c.Key.CapsLock.__enum__ = c.Key;
    c.Key.Comma = ["Comma", 76];
    c.Key.Comma.toString = n;
    c.Key.Comma.__enum__ = c.Key;
    c.Key.Command = ["Command", 77];
    c.Key.Command.toString = n;
    c.Key.Command.__enum__ =
        c.Key;
    c.Key.Control = ["Control", 78];
    c.Key.Control.toString = n;
    c.Key.Control.__enum__ = c.Key;
    c.Key.Delete = ["Delete", 79];
    c.Key.Delete.toString = n;
    c.Key.Delete.__enum__ = c.Key;
    c.Key.End = ["End", 80];
    c.Key.End.toString = n;
    c.Key.End.__enum__ = c.Key;
    c.Key.Enter = ["Enter", 81];
    c.Key.Enter.toString = n;
    c.Key.Enter.__enum__ = c.Key;
    c.Key.Equals = ["Equals", 82];
    c.Key.Equals.toString = n;
    c.Key.Equals.__enum__ = c.Key;
    c.Key.Escape = ["Escape", 83];
    c.Key.Escape.toString = n;
    c.Key.Escape.__enum__ = c.Key;
    c.Key.Home = ["Home", 84];
    c.Key.Home.toString =
        n;
    c.Key.Home.__enum__ = c.Key;
    c.Key.Insert = ["Insert", 85];
    c.Key.Insert.toString = n;
    c.Key.Insert.__enum__ = c.Key;
    c.Key.LeftBracket = ["LeftBracket", 86];
    c.Key.LeftBracket.toString = n;
    c.Key.LeftBracket.__enum__ = c.Key;
    c.Key.Minus = ["Minus", 87];
    c.Key.Minus.toString = n;
    c.Key.Minus.__enum__ = c.Key;
    c.Key.PageDown = ["PageDown", 88];
    c.Key.PageDown.toString = n;
    c.Key.PageDown.__enum__ = c.Key;
    c.Key.PageUp = ["PageUp", 89];
    c.Key.PageUp.toString = n;
    c.Key.PageUp.__enum__ = c.Key;
    c.Key.Period = ["Period", 90];
    c.Key.Period.toString = n;
    c.Key.Period.__enum__ =
        c.Key;
    c.Key.Quote = ["Quote", 91];
    c.Key.Quote.toString = n;
    c.Key.Quote.__enum__ = c.Key;
    c.Key.RightBracket = ["RightBracket", 92];
    c.Key.RightBracket.toString = n;
    c.Key.RightBracket.__enum__ = c.Key;
    c.Key.Semicolon = ["Semicolon", 93];
    c.Key.Semicolon.toString = n;
    c.Key.Semicolon.__enum__ = c.Key;
    c.Key.Shift = ["Shift", 94];
    c.Key.Shift.toString = n;
    c.Key.Shift.__enum__ = c.Key;
    c.Key.Slash = ["Slash", 95];
    c.Key.Slash.toString = n;
    c.Key.Slash.__enum__ = c.Key;
    c.Key.Space = ["Space", 96];
    c.Key.Space.toString = n;
    c.Key.Space.__enum__ = c.Key;
    c.Key.Tab = ["Tab", 97];
    c.Key.Tab.toString = n;
    c.Key.Tab.__enum__ = c.Key;
    c.Key.Menu = ["Menu", 98];
    c.Key.Menu.toString = n;
    c.Key.Menu.__enum__ = c.Key;
    c.Key.Search = ["Search", 99];
    c.Key.Search.toString = n;
    c.Key.Search.__enum__ = c.Key;
    c.Key.Unknown = function(a) {
        a = ["Unknown", 100, a];
        a.__enum__ = c.Key;
        a.toString = n;
        return a
    };
    c.Keyboard = function() {};
    j["flambe.input.Keyboard"] = c.Keyboard;
    c.Keyboard.__name__ = ["flambe", "input", "Keyboard"];
    c.Keyboard.prototype = {
        __class__: c.Keyboard
    };
    c.KeyboardEvent = function() {
        this._internal_init(0, null)
    };
    j["flambe.input.KeyboardEvent"] = c.KeyboardEvent;
    c.KeyboardEvent.__name__ = ["flambe", "input", "KeyboardEvent"];
    c.KeyboardEvent.prototype = {
        _internal_init: function(a, b) {
            this.id = a;
            this.key = b
        },
        __class__: c.KeyboardEvent
    };
    c.Mouse = function() {};
    j["flambe.input.Mouse"] = c.Mouse;
    c.Mouse.__name__ = ["flambe", "input", "Mouse"];
    c.Mouse.prototype = {
        __class__: c.Mouse
    };
    c.MouseButton = j["flambe.input.MouseButton"] = {
        __ename__: ["flambe", "input", "MouseButton"],
        __constructs__: ["Left", "Middle", "Right", "Unknown"]
    };
    c.MouseButton.Left = ["Left", 0];
    c.MouseButton.Left.toString = n;
    c.MouseButton.Left.__enum__ = c.MouseButton;
    c.MouseButton.Middle = ["Middle", 1];
    c.MouseButton.Middle.toString = n;
    c.MouseButton.Middle.__enum__ = c.MouseButton;
    c.MouseButton.Right = ["Right", 2];
    c.MouseButton.Right.toString = n;
    c.MouseButton.Right.__enum__ = c.MouseButton;
    c.MouseButton.Unknown = function(a) {
        a = ["Unknown", 3, a];
        a.__enum__ = c.MouseButton;
        a.toString = n;
        return a
    };
    c.MouseCursor = j["flambe.input.MouseCursor"] = {
        __ename__: ["flambe", "input", "MouseCursor"],
        __constructs__: ["Default",
            "Button", "None"
        ]
    };
    c.MouseCursor.Default = ["Default", 0];
    c.MouseCursor.Default.toString = n;
    c.MouseCursor.Default.__enum__ = c.MouseCursor;
    c.MouseCursor.Button = ["Button", 1];
    c.MouseCursor.Button.toString = n;
    c.MouseCursor.Button.__enum__ = c.MouseCursor;
    c.MouseCursor.None = ["None", 2];
    c.MouseCursor.None.toString = n;
    c.MouseCursor.None.__enum__ = c.MouseCursor;
    c.MouseEvent = function() {
        this._internal_init(0, 0, 0, null)
    };
    j["flambe.input.MouseEvent"] = c.MouseEvent;
    c.MouseEvent.__name__ = ["flambe", "input", "MouseEvent"];
    c.MouseEvent.prototype = {
        _internal_init: function(a, b, e, c) {
            this.id = a;
            this.viewX = b;
            this.viewY = e;
            this.button = c
        },
        __class__: c.MouseEvent
    };
    c.Pointer = function() {};
    j["flambe.input.Pointer"] = c.Pointer;
    c.Pointer.__name__ = ["flambe", "input", "Pointer"];
    c.Pointer.prototype = {
        __class__: c.Pointer
    };
    c.EventSource = j["flambe.input.EventSource"] = {
        __ename__: ["flambe", "input", "EventSource"],
        __constructs__: ["Mouse", "Touch"]
    };
    c.EventSource.Mouse = function(a) {
        a = ["Mouse", 0, a];
        a.__enum__ = c.EventSource;
        a.toString = n;
        return a
    };
    c.EventSource.Touch = function(a) {
        a = ["Touch", 1, a];
        a.__enum__ = c.EventSource;
        a.toString = n;
        return a
    };
    c.PointerEvent = function() {
        this._internal_init(0, 0, 0, null, null)
    };
    j["flambe.input.PointerEvent"] = c.PointerEvent;
    c.PointerEvent.__name__ = ["flambe", "input", "PointerEvent"];
    c.PointerEvent.prototype = {
        _internal_init: function(a, b, e, c, d) {
            this.id = a;
            this.viewX = b;
            this.viewY = e;
            this.hit = c;
            this.source = d;
            this._internal_stopped = !1
        },
        __class__: c.PointerEvent
    };
    c.Touch = function() {};
    j["flambe.input.Touch"] = c.Touch;
    c.Touch.__name__ = ["flambe", "input", "Touch"];
    c.Touch.prototype = {
        __class__: c.Touch
    };
    c.TouchPoint = function(a) {
        this.id = a;
        this._internal_source = c.EventSource.Touch(this)
    };
    j["flambe.input.TouchPoint"] = c.TouchPoint;
    c.TouchPoint.__name__ = ["flambe", "input", "TouchPoint"];
    c.TouchPoint.prototype = {
        _internal_init: function(a, b) {
            this.viewX = a;
            this.viewY = b
        },
        __class__: c.TouchPoint
    };
    F.FMath = function() {};
    j["flambe.math.FMath"] = F.FMath;
    F.FMath.__name__ = ["flambe", "math", "FMath"];
    F.FMath.max = function(a, b) {
        return a > b ? a : b
    };
    F.FMath.clamp = function(a, b, e) {
        return a < b ? b :
            a > e ? e : a
    };
    F.Matrix = function() {
        this.identity()
    };
    j["flambe.math.Matrix"] = F.Matrix;
    F.Matrix.__name__ = ["flambe", "math", "Matrix"];
    F.Matrix.prototype = {
        inverseTransform: function(a, b, e) {
            var c = this.determinant();
            if (0 == c) return !1;
            a -= this.m02;
            b -= this.m12;
            e.x = (a * this.m11 - b * this.m01) / c;
            e.y = (b * this.m00 - a * this.m10) / c;
            return !0
        },
        determinant: function() {
            return this.m00 * this.m11 - this.m01 * this.m10
        },
        translate: function(a, b) {
            this.m02 += this.m00 * a + this.m01 * b;
            this.m12 += this.m11 * b + this.m10 * a
        },
        compose: function(a, b, e, c, d) {
            var f =
                Math.sin(d),
                d = Math.cos(d);
            this.set(d * e, f * e, -f * c, d * c, a, b)
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        set: function(a, b, e, c, d, f) {
            this.m00 = a;
            this.m01 = e;
            this.m02 = d;
            this.m10 = b;
            this.m11 = c;
            this.m12 = f
        },
        __class__: F.Matrix
    };
    F.Rectangle = function(a, b, e, c) {
        null == c && (c = 0);
        null == e && (e = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.set(a, b, e, c)
    };
    j["flambe.math.Rectangle"] = F.Rectangle;
    F.Rectangle.__name__ = ["flambe", "math", "Rectangle"];
    F.Rectangle.prototype = {
        set: function(a, b, e, c) {
            this.x = a;
            this.y = b;
            this.width = e;
            this.height =
                c
        },
        __class__: F.Rectangle
    };
    d.BasicAssetPackLoader = function(a, b) {
        this._platform = a;
        this.promise = new k.Promise;
        this._bytesLoaded = new E;
        this._pack = new d._BasicAssetPackLoader.BasicAssetPack(b);
        var e = X.array(b);
        if (0 == e.length) this.handleSuccess();
        else {
            for (var c = 0, f = new E, g = 0; g < e.length;) {
                var h = e[g];
                ++g;
                var i = f.get(h.name);
                null == i && (i = [], f.set(h.name, i));
                i.push(h)
            }
            this._assetsRemaining = X.count(f);
            for (e = f.iterator(); e.hasNext();)
                if (i = e.next(), i = 1 < i.length ? this.pickBestEntry(i) : i[0], f = this.createPlaceholder(i),
                    null != f) this.handleLoad(i, f);
                else {
                    c += i.bytes;
                    f = b.getFullURL(i);
                    try {
                        this.loadEntry(f, i)
                    } catch (j) {
                        this.handleError(i, "Unexpected error: " + p.string(j))
                    }
                }
            this.promise.set_total(c)
        }
    };
    j["flambe.platform.BasicAssetPackLoader"] = d.BasicAssetPackLoader;
    d.BasicAssetPackLoader.__name__ = ["flambe", "platform", "BasicAssetPackLoader"];
    d.BasicAssetPackLoader.prototype = {
        handleTextureError: function(a) {
            this.handleError(a, "Failed to create texture. Is the GPU context unavailable?")
        },
        handleError: function(a, b) {
            this.promise.error.emit1(k.Strings.withFields(b, ["url", a.url]))
        },
        handleSuccess: function() {
            this.promise.set_result(this._pack)
        },
        handleProgress: function(a, b) {
            this._bytesLoaded.set(a.name, b);
            for (var e = 0, c = this._bytesLoaded.iterator(); c.hasNext();) var d = c.next(),
                e = e + d;
            this.promise.set_progress(e)
        },
        handleLoad: function(a, b) {
            var e = a.name;
            switch (a.type[1]) {
                case 0:
                    this._pack.textures.set(e, b);
                    break;
                case 1:
                    this._pack.sounds.set(e, b);
                    break;
                case 2:
                    this._pack.files.set(e, b)
            }
            this._assetsRemaining -= 1;
            0 >= this._assetsRemaining && this.handleSuccess()
        },
        getAudioFormats: function() {
            return []
        },
        loadEntry: function() {},
        createPlaceholder: function(a) {
            switch (a.type[1]) {
                case 1:
                    if (!X.has(this.getAudioFormats(), a.getUrlExtension())) return d.DummySound.getInstance()
            }
            return null
        },
        pickBestEntry: function(a) {
            switch (a[0].type[1]) {
                case 1:
                    for (var b = this.getAudioFormats(), e = 0; e < b.length;) {
                        var c = b[e];
                        ++e;
                        for (var d = 0; d < a.length;) {
                            var f = a[d];
                            ++d;
                            if (f.getUrlExtension() == c) return f
                        }
                    }
            }
            return a[0]
        },
        __class__: d.BasicAssetPackLoader
    };
    d._BasicAssetPackLoader = {};
    d._BasicAssetPackLoader.BasicAssetPack = function(a) {
        this._manifest =
            a;
        this.textures = new E;
        this.sounds = new E;
        this.files = new E
    };
    j["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = d._BasicAssetPackLoader.BasicAssetPack;
    d._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe", "platform", "_BasicAssetPackLoader", "BasicAssetPack"];
    d._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [v.AssetPack];
    d._BasicAssetPackLoader.BasicAssetPack.prototype = {
        get_manifest: function() {
            return this._manifest
        },
        getFile: function(a, b) {
            null == b && (b = !0);
            var e = this.files.get(a);
            if (null ==
                e && b) throw k.Strings.withFields("Missing file", ["name", a]);
            return e
        },
        getSound: function(a, b) {
            null == b && (b = !0);
            var e = this.sounds.get(a);
            if (null == e && b) throw k.Strings.withFields("Missing sound", ["name", a]);
            return e
        },
        getTexture: function(a, b) {
            null == b && (b = !0);
            var e = this.textures.get(a);
            if (null == e && b) throw k.Strings.withFields("Missing texture", ["name", a]);
            return e
        },
        __class__: d._BasicAssetPackLoader.BasicAssetPack
    };
    d.BasicKeyboard = function() {
        this.down = new k.Signal1;
        this.up = new k.Signal1;
        this.backButton = new k.Signal0;
        this._keyStates = new Q
    };
    j["flambe.platform.BasicKeyboard"] = d.BasicKeyboard;
    d.BasicKeyboard.__name__ = ["flambe", "platform", "BasicKeyboard"];
    d.BasicKeyboard.__interfaces__ = [c.Keyboard];
    d.BasicKeyboard.prototype = {
        submitUp: function(a) {
            this._keyStates.exists(a) && (this._keyStates.remove(a), d.BasicKeyboard._sharedEvent._internal_init(d.BasicKeyboard._sharedEvent.id + 1, d.KeyCodes.toKey(a)), this.up.emit1(d.BasicKeyboard._sharedEvent))
        },
        submitDown: function(a) {
            if (16777238 == a) return null != this.backButton._head ?
                (this.backButton.emit0(), !0) : !1;
            this._keyStates.exists(a) || (this._keyStates.set(a, !0), d.BasicKeyboard._sharedEvent._internal_init(d.BasicKeyboard._sharedEvent.id + 1, d.KeyCodes.toKey(a)), this.down.emit1(d.BasicKeyboard._sharedEvent));
            return !0
        },
        isDown: function(a) {
            return this._keyStates.exists(d.KeyCodes.toKeyCode(a))
        },
        get_supported: function() {
            return !0
        },
        __class__: d.BasicKeyboard
    };
    d.BasicMouse = function(a) {
        this._pointer = a;
        this._source = c.EventSource.Mouse(d.BasicMouse._sharedEvent);
        this.down = new k.Signal1;
        this.move = new k.Signal1;
        this.up = new k.Signal1;
        this.scroll = new k.Signal1;
        this._y = this._x = 0;
        this._cursor = c.MouseCursor.Default;
        this._buttonStates = new Q
    };
    j["flambe.platform.BasicMouse"] = d.BasicMouse;
    d.BasicMouse.__name__ = ["flambe", "platform", "BasicMouse"];
    d.BasicMouse.__interfaces__ = [c.Mouse];
    d.BasicMouse.prototype = {
        prepare: function(a, b, e) {
            this._x = a;
            this._y = b;
            d.BasicMouse._sharedEvent._internal_init(d.BasicMouse._sharedEvent.id + 1, a, b, e)
        },
        submitScroll: function(a, b, e) {
            this._x = a;
            this._y = b;
            if (null == this.scroll._head) return !1;
            this.scroll.emit1(e);
            return !0
        },
        submitUp: function(a, b, e) {
            this._buttonStates.exists(e) && (this._buttonStates.remove(e), this.prepare(a, b, d.MouseCodes.toButton(e)), this._pointer.submitUp(a, b, this._source), this.up.emit1(d.BasicMouse._sharedEvent))
        },
        submitMove: function(a, b) {
            this.prepare(a, b, null);
            this._pointer.submitMove(a, b, this._source);
            this.move.emit1(d.BasicMouse._sharedEvent)
        },
        submitDown: function(a, b, e) {
            this._buttonStates.exists(e) || (this._buttonStates.set(e, !0), this.prepare(a, b, d.MouseCodes.toButton(e)),
                this._pointer.submitDown(a, b, this._source), this.down.emit1(d.BasicMouse._sharedEvent))
        },
        isDown: function(a) {
            return this._buttonStates.exists(d.MouseCodes.toButtonCode(a))
        },
        set_cursor: function(a) {
            return this._cursor = a
        },
        get_cursor: function() {
            return this._cursor
        },
        get_y: function() {
            return this._y
        },
        get_x: function() {
            return this._x
        },
        get_supported: function() {
            return !0
        },
        __class__: d.BasicMouse
    };
    d.BasicPointer = function(a, b, e) {
        null == e && (e = !1);
        null == b && (b = 0);
        null == a && (a = 0);
        this.down = new k.Signal1;
        this.move = new k.Signal1;
        this.up = new k.Signal1;
        this._x = a;
        this._y = b;
        this._isDown = e
    };
    j["flambe.platform.BasicPointer"] = d.BasicPointer;
    d.BasicPointer.__name__ = ["flambe", "platform", "BasicPointer"];
    d.BasicPointer.__interfaces__ = [c.Pointer];
    d.BasicPointer.prototype = {
        prepare: function(a, b, e, c) {
            this._x = a;
            this._y = b;
            d.BasicPointer._sharedEvent._internal_init(d.BasicPointer._sharedEvent.id + 1, a, b, e, c)
        },
        submitUp: function(a, b, e) {
            if (this._isDown) {
                this._isDown = !1;
                var c = [],
                    f = m.Sprite.hitTest(C.root, a, b);
                if (null != f) {
                    var g = f.owner;
                    do {
                        var h =
                            g._compMap.Sprite_1;
                        null != h && c.push(h);
                        g = g.parent
                    } while (null != g)
                }
                this.prepare(a, b, f, e);
                for (a = 0; a < c.length;)
                    if (h = c[a], ++a, h = h._internal_pointerUp, null != h && (h.emit1(d.BasicPointer._sharedEvent), d.BasicPointer._sharedEvent._internal_stopped)) return;
                this.up.emit1(d.BasicPointer._sharedEvent)
            }
        },
        submitMove: function(a, b, e) {
            var c = [],
                f = m.Sprite.hitTest(C.root, a, b);
            if (null != f) {
                var g = f.owner;
                do {
                    var h = g._compMap.Sprite_1;
                    null != h && c.push(h);
                    g = g.parent
                } while (null != g)
            }
            this.prepare(a, b, f, e);
            for (a = 0; a < c.length;)
                if (h =
                    c[a], ++a, h = h._internal_pointerMove, null != h && (h.emit1(d.BasicPointer._sharedEvent), d.BasicPointer._sharedEvent._internal_stopped)) return;
            this.move.emit1(d.BasicPointer._sharedEvent)
        },
        submitDown: function(a, b, e) {
            if (!this._isDown) {
                this._isDown = !0;
                var c = [],
                    f = m.Sprite.hitTest(C.root, a, b);
                if (null != f) {
                    var g = f.owner;
                    do {
                        var h = g._compMap.Sprite_1;
                        null != h && c.push(h);
                        g = g.parent
                    } while (null != g)
                }
                this.prepare(a, b, f, e);
                for (a = 0; a < c.length;)
                    if (h = c[a], ++a, h = h._internal_pointerDown, null != h && (h.emit1(d.BasicPointer._sharedEvent),
                            d.BasicPointer._sharedEvent._internal_stopped)) return;
                this.down.emit1(d.BasicPointer._sharedEvent)
            }
        },
        isDown: function() {
            return this._isDown
        },
        get_y: function() {
            return this._y
        },
        get_x: function() {
            return this._x
        },
        get_supported: function() {
            return !0
        },
        __class__: d.BasicPointer
    };
    d.BasicTouch = function(a, b) {
        null == b && (b = 4);
        this._pointer = a;
        this._maxPoints = b;
        this._pointMap = new Q;
        this._points = [];
        this.down = new k.Signal1;
        this.move = new k.Signal1;
        this.up = new k.Signal1
    };
    j["flambe.platform.BasicTouch"] = d.BasicTouch;
    d.BasicTouch.__name__ = ["flambe", "platform", "BasicTouch"];
    d.BasicTouch.__interfaces__ = [c.Touch];
    d.BasicTouch.prototype = {
        submitUp: function(a, b, e) {
            var c = this._pointMap.get(a);
            null != c && (c._internal_init(b, e), this._pointMap.remove(a), w.remove(this._points, c), this._pointerTouch == c && (this._pointerTouch = null, this._pointer.submitUp(b, e, c._internal_source)), this.up.emit1(c))
        },
        submitMove: function(a, b, c) {
            a = this._pointMap.get(a);
            null != a && (a._internal_init(b, c), this._pointerTouch == a && this._pointer.submitMove(b, c, a._internal_source),
                this.move.emit1(a))
        },
        submitDown: function(a, b, e) {
            if (!this._pointMap.exists(a)) {
                var d = new c.TouchPoint(a);
                d._internal_init(b, e);
                this._pointMap.set(a, d);
                this._points.push(d);
                null == this._pointerTouch && (this._pointerTouch = d, this._pointer.submitDown(b, e, d._internal_source));
                this.down.emit1(d)
            }
        },
        get_points: function() {
            return this._points.slice()
        },
        get_maxPoints: function() {
            return this._maxPoints
        },
        get_supported: function() {
            return !0
        },
        __class__: d.BasicTouch
    };
    D.Sound = function() {};
    j["flambe.sound.Sound"] = D.Sound;
    D.Sound.__name__ = ["flambe", "sound", "Sound"];
    D.Sound.prototype = {
        __class__: D.Sound
    };
    d.DummySound = function() {
        this._playback = new d.DummyPlayback(this)
    };
    j["flambe.platform.DummySound"] = d.DummySound;
    d.DummySound.__name__ = ["flambe", "platform", "DummySound"];
    d.DummySound.__interfaces__ = [D.Sound];
    d.DummySound.getInstance = function() {
        null == d.DummySound._instance && (d.DummySound._instance = new d.DummySound);
        return d.DummySound._instance
    };
    d.DummySound.prototype = {
        get_duration: function() {
            return 0
        },
        loop: function() {
            return this._playback
        },
        play: function() {
            return this._playback
        },
        __class__: d.DummySound
    };
    D.Playback = function() {};
    j["flambe.sound.Playback"] = D.Playback;
    D.Playback.__name__ = ["flambe", "sound", "Playback"];
    D.Playback.__interfaces__ = [k.Disposable];
    D.Playback.prototype = {
        __class__: D.Playback
    };
    d.DummyPlayback = function(a) {
        this._sound = a;
        this.volume = new B.AnimatedFloat(0)
    };
    j["flambe.platform.DummyPlayback"] = d.DummyPlayback;
    d.DummyPlayback.__name__ = ["flambe", "platform", "DummyPlayback"];
    d.DummyPlayback.__interfaces__ = [D.Playback];
    d.DummyPlayback.prototype = {
        dispose: function() {},
        get_position: function() {
            return 0
        },
        get_ended: function() {
            return !0
        },
        set_paused: function() {
            return !0
        },
        get_paused: function() {
            return !0
        },
        get_sound: function() {
            return this._sound
        },
        __class__: d.DummyPlayback
    };
    t = {
        Storage: function() {}
    };
    j["flambe.storage.Storage"] = t.Storage;
    t.Storage.__name__ = ["flambe", "storage", "Storage"];
    t.Storage.prototype = {
        __class__: t.Storage
    };
    d.DummyStorage = function() {
        this.clear()
    };
    j["flambe.platform.DummyStorage"] = d.DummyStorage;
    d.DummyStorage.__name__ = ["flambe", "platform",
        "DummyStorage"
    ];
    d.DummyStorage.__interfaces__ = [t.Storage];
    d.DummyStorage.prototype = {
        clear: function() {
            this._hash = new E
        },
        remove: function(a) {
            this._hash.remove(a)
        },
        get: function(a, b) {
            return this._hash.exists(a) ? this._hash.get(a) : b
        },
        set: function(a, b) {
            this._hash.set(a, b);
            return !0
        },
        get_supported: function() {
            return !1
        },
        __class__: d.DummyStorage
    };
    d.DummyTouch = function() {
        this.down = new k.Signal1;
        this.move = new k.Signal1;
        this.up = new k.Signal1
    };
    j["flambe.platform.DummyTouch"] = d.DummyTouch;
    d.DummyTouch.__name__ = ["flambe",
        "platform", "DummyTouch"
    ];
    d.DummyTouch.__interfaces__ = [c.Touch];
    d.DummyTouch.prototype = {
        get_points: function() {
            return []
        },
        get_maxPoints: function() {
            return 0
        },
        get_supported: function() {
            return !1
        },
        __class__: d.DummyTouch
    };
    d.EventGroup = function() {
        this._entries = []
    };
    j["flambe.platform.EventGroup"] = d.EventGroup;
    d.EventGroup.__name__ = ["flambe", "platform", "EventGroup"];
    d.EventGroup.__interfaces__ = [k.Disposable];
    d.EventGroup.prototype = {
        dispose: function() {
            for (var a = 0, b = this._entries; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispatcher.removeEventListener(c.type,
                    c.listener, !1)
            }
            this._entries = []
        },
        addDisposingListener: function(a, b, c) {
            var d = this;
            this.addListener(a, b, function(a) {
                d.dispose();
                c(a)
            })
        },
        addListener: function(a, b, c) {
            a.addEventListener(b, c, !1);
            this._entries.push(new d._EventGroup.Entry(a, b, c))
        },
        __class__: d.EventGroup
    };
    d._EventGroup = {};
    d._EventGroup.Entry = function(a, b, c) {
        this.dispatcher = a;
        this.type = b;
        this.listener = c
    };
    j["flambe.platform._EventGroup.Entry"] = d._EventGroup.Entry;
    d._EventGroup.Entry.__name__ = ["flambe", "platform", "_EventGroup", "Entry"];
    d._EventGroup.Entry.prototype = {
        __class__: d._EventGroup.Entry
    };
    d.KeyCodes = function() {};
    j["flambe.platform.KeyCodes"] = d.KeyCodes;
    d.KeyCodes.__name__ = ["flambe", "platform", "KeyCodes"];
    d.KeyCodes.toKey = function(a) {
        switch (a) {
            case 65:
                return c.Key.A;
            case 66:
                return c.Key.B;
            case 67:
                return c.Key.C;
            case 68:
                return c.Key.D;
            case 69:
                return c.Key.E;
            case 70:
                return c.Key.F;
            case 71:
                return c.Key.G;
            case 72:
                return c.Key.H;
            case 73:
                return c.Key.I;
            case 74:
                return c.Key.J;
            case 75:
                return c.Key.K;
            case 76:
                return c.Key.L;
            case 77:
                return c.Key.M;
            case 78:
                return c.Key.N;
            case 79:
                return c.Key.O;
            case 80:
                return c.Key.P;
            case 81:
                return c.Key.Q;
            case 82:
                return c.Key.R;
            case 83:
                return c.Key.S;
            case 84:
                return c.Key.T;
            case 85:
                return c.Key.U;
            case 86:
                return c.Key.V;
            case 87:
                return c.Key.W;
            case 88:
                return c.Key.X;
            case 89:
                return c.Key.Y;
            case 90:
                return c.Key.Z;
            case 48:
                return c.Key.Number0;
            case 49:
                return c.Key.Number1;
            case 50:
                return c.Key.Number2;
            case 51:
                return c.Key.Number3;
            case 52:
                return c.Key.Number4;
            case 53:
                return c.Key.Number5;
            case 54:
                return c.Key.Number6;
            case 55:
                return c.Key.Number7;
            case 56:
                return c.Key.Number8;
            case 57:
                return c.Key.Number9;
            case 96:
                return c.Key.Numpad0;
            case 97:
                return c.Key.Numpad1;
            case 98:
                return c.Key.Numpad2;
            case 99:
                return c.Key.Numpad3;
            case 100:
                return c.Key.Numpad4;
            case 101:
                return c.Key.Numpad5;
            case 102:
                return c.Key.Numpad6;
            case 103:
                return c.Key.Numpad7;
            case 104:
                return c.Key.Numpad8;
            case 105:
                return c.Key.Numpad9;
            case 107:
                return c.Key.NumpadAdd;
            case 110:
                return c.Key.NumpadDecimal;
            case 111:
                return c.Key.NumpadDivide;
            case 108:
                return c.Key.NumpadEnter;
            case 106:
                return c.Key.NumpadMultiply;
            case 109:
                return c.Key.NumpadSubtract;
            case 112:
                return c.Key.F1;
            case 113:
                return c.Key.F2;
            case 114:
                return c.Key.F3;
            case 115:
                return c.Key.F4;
            case 116:
                return c.Key.F5;
            case 117:
                return c.Key.F6;
            case 118:
                return c.Key.F7;
            case 119:
                return c.Key.F8;
            case 120:
                return c.Key.F9;
            case 121:
                return c.Key.F10;
            case 122:
                return c.Key.F11;
            case 123:
                return c.Key.F12;
            case 37:
                return c.Key.Left;
            case 38:
                return c.Key.Up;
            case 39:
                return c.Key.Right;
            case 40:
                return c.Key.Down;
            case 18:
                return c.Key.Alt;
            case 192:
                return c.Key.Backquote;
            case 220:
                return c.Key.Backslash;
            case 8:
                return c.Key.Backspace;
            case 20:
                return c.Key.CapsLock;
            case 188:
                return c.Key.Comma;
            case 15:
                return c.Key.Command;
            case 17:
                return c.Key.Control;
            case 46:
                return c.Key.Delete;
            case 35:
                return c.Key.End;
            case 13:
                return c.Key.Enter;
            case 187:
                return c.Key.Equals;
            case 27:
                return c.Key.Escape;
            case 36:
                return c.Key.Home;
            case 45:
                return c.Key.Insert;
            case 219:
                return c.Key.LeftBracket;
            case 189:
                return c.Key.Minus;
            case 34:
                return c.Key.PageDown;
            case 33:
                return c.Key.PageUp;
            case 190:
                return c.Key.Period;
            case 222:
                return c.Key.Quote;
            case 221:
                return c.Key.RightBracket;
            case 186:
                return c.Key.Semicolon;
            case 16:
                return c.Key.Shift;
            case 191:
                return c.Key.Slash;
            case 32:
                return c.Key.Space;
            case 9:
                return c.Key.Tab;
            case 16777234:
                return c.Key.Menu;
            case 16777247:
                return c.Key.Search
        }
        return c.Key.Unknown(a)
    };
    d.KeyCodes.toKeyCode = function(a) {
        switch (a[1]) {
            case 0:
                return 65;
            case 1:
                return 66;
            case 2:
                return 67;
            case 3:
                return 68;
            case 4:
                return 69;
            case 5:
                return 70;
            case 6:
                return 71;
            case 7:
                return 72;
            case 8:
                return 73;
            case 9:
                return 74;
            case 10:
                return 75;
            case 11:
                return 76;
            case 12:
                return 77;
            case 13:
                return 78;
            case 14:
                return 79;
            case 15:
                return 80;
            case 16:
                return 81;
            case 17:
                return 82;
            case 18:
                return 83;
            case 19:
                return 84;
            case 20:
                return 85;
            case 21:
                return 86;
            case 22:
                return 87;
            case 23:
                return 88;
            case 24:
                return 89;
            case 25:
                return 90;
            case 26:
                return 48;
            case 27:
                return 49;
            case 28:
                return 50;
            case 29:
                return 51;
            case 30:
                return 52;
            case 31:
                return 53;
            case 32:
                return 54;
            case 33:
                return 55;
            case 34:
                return 56;
            case 35:
                return 57;
            case 36:
                return 96;
            case 37:
                return 97;
            case 38:
                return 98;
            case 39:
                return 99;
            case 40:
                return 100;
            case 41:
                return 101;
            case 42:
                return 102;
            case 43:
                return 103;
            case 44:
                return 104;
            case 45:
                return 105;
            case 46:
                return 107;
            case 47:
                return 110;
            case 48:
                return 111;
            case 49:
                return 108;
            case 50:
                return 106;
            case 51:
                return 109;
            case 52:
                return 112;
            case 53:
                return 113;
            case 54:
                return 114;
            case 55:
                return 115;
            case 56:
                return 116;
            case 57:
                return 117;
            case 58:
                return 118;
            case 59:
                return 119;
            case 60:
                return 120;
            case 61:
                return 121;
            case 62:
                return 122;
            case 63:
                return 123;
            case 64:
                return 124;
            case 65:
                return 125;
            case 66:
                return 126;
            case 67:
                return 37;
            case 68:
                return 38;
            case 69:
                return 39;
            case 70:
                return 40;
            case 71:
                return 18;
            case 72:
                return 192;
            case 73:
                return 220;
            case 74:
                return 8;
            case 75:
                return 20;
            case 76:
                return 188;
            case 77:
                return 15;
            case 78:
                return 17;
            case 79:
                return 46;
            case 80:
                return 35;
            case 81:
                return 13;
            case 82:
                return 187;
            case 83:
                return 27;
            case 84:
                return 36;
            case 85:
                return 45;
            case 86:
                return 219;
            case 87:
                return 189;
            case 88:
                return 34;
            case 89:
                return 33;
            case 90:
                return 190;
            case 91:
                return 222;
            case 92:
                return 221;
            case 93:
                return 186;
            case 94:
                return 16;
            case 95:
                return 191;
            case 96:
                return 32;
            case 97:
                return 9;
            case 98:
                return 16777234;
            case 99:
                return 16777247;
            case 100:
                return a[2]
        }
    };
    d.MainLoop = function() {
        this._tickables = []
    };
    j["flambe.platform.MainLoop"] = d.MainLoop;
    d.MainLoop.__name__ = ["flambe", "platform", "MainLoop"];
    d.MainLoop.updateEntity = function(a, b) {
        var c = a._compMap.SpeedAdjuster_5;
        if (null != c && (c._internal_realDt = b, b *= c.scale._value, 0 >= b)) {
            c.onUpdate(b);
            return
        }
        for (var f = a.firstComponent; null != f;) c = f.next, f.onUpdate(b), f = c;
        for (f = a.firstChild; null != f;) c =
            f.next, d.MainLoop.updateEntity(f, b), f = c
    };
    d.MainLoop.prototype = {
        addTickable: function(a) {
            this._tickables.push(a)
        },
        render: function(a) {
            var b = a.willRender();
            null != b && (m.Sprite.render(C.root, b), a.didRender())
        },
        update: function(a) {
            if (!(0 >= a)) {
                1 < a && (a = 1);
                for (var b = 0; b < this._tickables.length;) {
                    var c = this._tickables[b];
                    null == c || c.update(a) ? this._tickables.splice(b, 1) : ++b
                }
                d.MainLoop.updateEntity(C.root, a)
            }
        },
        __class__: d.MainLoop
    };
    d.ManifestBuilder = function() {};
    j["flambe.platform.ManifestBuilder"] = d.ManifestBuilder;
    d.ManifestBuilder.__name__ = ["flambe", "platform", "ManifestBuilder"];
    d.MouseCodes = function() {};
    j["flambe.platform.MouseCodes"] = d.MouseCodes;
    d.MouseCodes.__name__ = ["flambe", "platform", "MouseCodes"];
    d.MouseCodes.toButton = function(a) {
        switch (a) {
            case 0:
                return c.MouseButton.Left;
            case 1:
                return c.MouseButton.Middle;
            case 2:
                return c.MouseButton.Right
        }
        return c.MouseButton.Unknown(a)
    };
    d.MouseCodes.toButtonCode = function(a) {
        switch (a[1]) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return a[2]
        }
    };
    d.Renderer =
        function() {};
    j["flambe.platform.Renderer"] = d.Renderer;
    d.Renderer.__name__ = ["flambe", "platform", "Renderer"];
    d.Renderer.prototype = {
        __class__: d.Renderer
    };
    d.Tickable = function() {};
    j["flambe.platform.Tickable"] = d.Tickable;
    d.Tickable.__name__ = ["flambe", "platform", "Tickable"];
    d.Tickable.prototype = {
        __class__: d.Tickable
    };
    d.html.CanvasGraphics = function(a) {
        this._firstDraw = !1;
        this._canvasCtx = a.getContext("2d")
    };
    j["flambe.platform.html.CanvasGraphics"] = d.html.CanvasGraphics;
    d.html.CanvasGraphics.__name__ = ["flambe",
        "platform", "html", "CanvasGraphics"
    ];
    d.html.CanvasGraphics.__interfaces__ = [m.Graphics];
    d.html.CanvasGraphics.prototype = {
        willRender: function() {
            this._firstDraw = !0
        },
        setBlendMode: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "source-over";
                    break;
                case 1:
                    b = "lighter";
                    break;
                case 2:
                    b = "source-over"
            }
            this._canvasCtx.globalCompositeOperation = b
        },
        setAlpha: function(a) {
            this._canvasCtx.globalAlpha = a
        },
        multiplyAlpha: function(a) {
            this._canvasCtx.globalAlpha *= a
        },
        fillRect: function(a, b, c, d, f) {
            this._firstDraw ? (this._firstDraw = !1,
                this._canvasCtx.globalCompositeOperation = "copy", this.fillRect(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over") : (this._canvasCtx.fillStyle = "#" + ("00000" + a.toString(16)).slice(-6), this._canvasCtx.fillRect(b | 0, c | 0, d | 0, f | 0))
        },
        drawPattern: function(a, b, c, d, f) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawPattern(a, b, c, d, f), this._canvasCtx.globalCompositeOperation = "source-over") : (null == a.pattern && (a.pattern = this._canvasCtx.createPattern(a.image,
                "repeat")), this._canvasCtx.fillStyle = a.pattern, this._canvasCtx.fillRect(b | 0, c | 0, d | 0, f | 0))
        },
        drawSubImage: function(a, b, c, d, f, g, h) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawSubImage(a, b, c, d, f, g, h), this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, d | 0, f | 0, g | 0, h | 0, b | 0, c | 0, g | 0, h | 0)
        },
        drawImage: function(a, b, c) {
            this._firstDraw ? (this._firstDraw = !1, this._canvasCtx.globalCompositeOperation = "copy", this.drawImage(a, b, c),
                this._canvasCtx.globalCompositeOperation = "source-over") : this._canvasCtx.drawImage(a.image, b | 0, c | 0)
        },
        restore: function() {
            this._canvasCtx.restore()
        },
        transform: function(a, b, c, d, f, g) {
            this._canvasCtx.transform(a, b, c, d, f | 0, g | 0)
        },
        rotate: function(a) {
            this._canvasCtx.rotate(3.141592653589793 * a / 180)
        },
        scale: function(a, b) {
            this._canvasCtx.scale(a, b)
        },
        translate: function(a, b) {
            this._canvasCtx.translate(a | 0, b | 0)
        },
        save: function() {
            this._canvasCtx.save()
        },
        clear: function() {
            this._canvasCtx.fillStyle = "#ffffff";
            this._canvasCtx.fillRect(0,
                0, this._canvasCtx.canvas.width, this._canvasCtx.canvas.height)
        },
        __class__: d.html.CanvasGraphics
    };
    d.html.CanvasRenderer = function(a) {
        this._drawCtx = new d.html.CanvasGraphics(a);
        this._drawCtx.clear()
    };
    j["flambe.platform.html.CanvasRenderer"] = d.html.CanvasRenderer;
    d.html.CanvasRenderer.__name__ = ["flambe", "platform", "html", "CanvasRenderer"];
    d.html.CanvasRenderer.__interfaces__ = [d.Renderer];
    d.html.CanvasRenderer.prototype = {
        didRender: function() {},
        willRender: function() {
            this._drawCtx.willRender();
            return this._drawCtx
        },
        createEmptyTexture: function(a, b) {
            var c = z.document.createElement("canvas");
            c.width = a;
            c.height = b;
            return new d.html.CanvasTexture(c)
        },
        createTexture: function(a) {
            return new d.html.CanvasTexture(d.html.CanvasRenderer.CANVAS_TEXTURES ? d.html.HtmlUtil.createCanvas(a) : a)
        },
        __class__: d.html.CanvasRenderer
    };
    d.html.CanvasTexture = function(a) {
        this._graphics = null;
        this.image = a
    };
    j["flambe.platform.html.CanvasTexture"] = d.html.CanvasTexture;
    d.html.CanvasTexture.__name__ = ["flambe", "platform", "html", "CanvasTexture"];
    d.html.CanvasTexture.__interfaces__ = [m.Texture];
    d.html.CanvasTexture.prototype = {
        getContext2d: function() {
            J.__instanceof(this.image, HTMLCanvasElement) || (this.image = d.html.HtmlUtil.createCanvas(this.image));
            return this.image.getContext("2d")
        },
        get_graphics: function() {
            null == this._graphics && (this.getContext2d(), this._graphics = new d.html._CanvasTexture.InternalGraphics(this));
            return this._graphics
        },
        get_height: function() {
            return this.image.height
        },
        get_width: function() {
            return this.image.width
        },
        writePixels: function(a, b, c, d, f) {
            var g = this.getContext2d(),
                h = g.createImageData(d, f),
                i = h.data;
            if (null != i.set) i.set(a.b);
            else {
                d = 4 * d * f;
                for (f = 0; f < d;) {
                    var j = f++;
                    i[j] = a.b[j]
                }
            }
            g.putImageData(h, b, c);
            this.pattern = null
        },
        readPixels: function(a, b, c, d) {
            return O.Bytes.ofData(this.getContext2d().getImageData(a, b, c, d).data)
        },
        __class__: d.html.CanvasTexture
    };
    d.html._CanvasTexture = {};
    d.html._CanvasTexture.InternalGraphics = function(a) {
        d.html.CanvasGraphics.call(this, a.image);
        this._renderTarget = a
    };
    j["flambe.platform.html._CanvasTexture.InternalGraphics"] = d.html._CanvasTexture.InternalGraphics;
    d.html._CanvasTexture.InternalGraphics.__name__ = ["flambe", "platform", "html", "_CanvasTexture", "InternalGraphics"];
    d.html._CanvasTexture.InternalGraphics.__super__ = d.html.CanvasGraphics;
    d.html._CanvasTexture.InternalGraphics.prototype = r(d.html.CanvasGraphics.prototype, {
        fillRect: function(a, b, c, f, g) {
            d.html.CanvasGraphics.prototype.fillRect.call(this, a, b, c, f, g);
            this._renderTarget.pattern = null
        },
        drawPattern: function(a, b, c, f, g) {
            d.html.CanvasGraphics.prototype.drawPattern.call(this, a, b, c, f, g);
            this._renderTarget.pattern =
                null
        },
        drawSubImage: function(a, b, c, f, g, h, i) {
            d.html.CanvasGraphics.prototype.drawSubImage.call(this, a, b, c, f, g, h, i);
            this._renderTarget.pattern = null
        },
        drawImage: function(a, b, c) {
            d.html.CanvasGraphics.prototype.drawImage.call(this, a, b, c);
            this._renderTarget.pattern = null
        },
        __class__: d.html._CanvasTexture.InternalGraphics
    });
    d.html.HtmlAssetPackLoader = function(a, b) {
        d.BasicAssetPackLoader.call(this, a, b)
    };
    j["flambe.platform.html.HtmlAssetPackLoader"] = d.html.HtmlAssetPackLoader;
    d.html.HtmlAssetPackLoader.__name__ = ["flambe", "platform", "html", "HtmlAssetPackLoader"];
    d.html.HtmlAssetPackLoader.detectAudioFormats = function() {
        var a = z.document.createElement("audio");
        if (null == a || null == a.canPlayType) return [];
        var b = new S("\\b(iPhone|iPod|iPad|Android)\\b", "");
        if (!d.html.WebAudioSound.get_supported() && b.match(z.window.navigator.userAgent)) return [];
        for (var b = [{
                    extension: "m4a",
                    type: "audio/mp4; codecs=mp4a"
                }, {
                    extension: "mp3",
                    type: "audio/mpeg"
                }, {
                    extension: "ogg",
                    type: "audio/ogg; codecs=vorbis"
                }, {
                    extension: "wav",
                    type: "audio/wav"
                }],
                c = [], f = 0; f < b.length;) {
            var g = b[f];
            ++f;
            "" != a.canPlayType(g.type) && c.push(g.extension)
        }
        return c
    };
    d.html.HtmlAssetPackLoader.__super__ = d.BasicAssetPackLoader;
    d.html.HtmlAssetPackLoader.prototype = r(d.BasicAssetPackLoader.prototype, {
        handleLoad: function(a, b) {
            this.handleProgress(a, a.bytes);
            d.BasicAssetPackLoader.prototype.handleLoad.call(this, a, b)
        },
        getAudioFormats: function() {
            null == d.html.HtmlAssetPackLoader._audioFormats && (d.html.HtmlAssetPackLoader._audioFormats = d.html.HtmlAssetPackLoader.detectAudioFormats());
            return d.html.HtmlAssetPackLoader._audioFormats
        },
        loadEntry: function(a, b) {
            var c = this;
            switch (b.type[1]) {
                case 0:
                    var f = new Image;
                    f.onload = function() {
                        var a = c._platform.getRenderer().createTexture(f);
                        null != a ? c.handleLoad(b, a) : c.handleTextureError(b)
                    };
                    f.onerror = function() {
                        c.handleError(b, "Failed to load image")
                    };
                    f.src = a;
                    break;
                case 1:
                    if (d.html.WebAudioSound.get_supported()) {
                        var g = new XMLHttpRequest;
                        g.open("GET", a, !0);
                        g.responseType = "arraybuffer";
                        g.onload = function() {
                            d.html.WebAudioSound.ctx.decodeAudioData(g.response,
                                function(a) {
                                    c.handleLoad(b, new d.html.WebAudioSound(a))
                                },
                                function() {
                                    c.handleLoad(b, d.DummySound.getInstance())
                                })
                        };
                        g.onerror = function() {
                            c.handleError(b, "Failed to load audio")
                        };
                        g.send()
                    } else {
                        var h = z.document.createElement("audio");
                        h.preload = "auto";
                        var i = ++d.html.HtmlAssetPackLoader._mediaRefCount;
                        null == d.html.HtmlAssetPackLoader._mediaElements && (d.html.HtmlAssetPackLoader._mediaElements = new Q);
                        d.html.HtmlAssetPackLoader._mediaElements.set(i, h);
                        var j = new d.EventGroup;
                        j.addDisposingListener(h, "canplaythrough",
                            function() {
                                d.html.HtmlAssetPackLoader._mediaElements.remove(i);
                                c.handleLoad(b, new d.html.HtmlSound(h))
                            });
                        j.addDisposingListener(h, "error", function() {
                            d.html.HtmlAssetPackLoader._mediaElements.remove(i);
                            c.handleError(b, "Failed to load audio: " + p.string(h.error.code))
                        });
                        h.src = a;
                        h.load()
                    }
                    break;
                case 2:
                    j = new $(a), j.onData = function(a) {
                        c.handleLoad(b, a)
                    }, j.onError = function(a) {
                        c.handleError(b, "Failed to load data: " + a)
                    }, j.request(!1)
            }
        },
        __class__: d.html.HtmlAssetPackLoader
    });
    d.html.HtmlMouse = function(a, b) {
        d.BasicMouse.call(this,
            a);
        this._canvas = b
    };
    j["flambe.platform.html.HtmlMouse"] = d.html.HtmlMouse;
    d.html.HtmlMouse.__name__ = ["flambe", "platform", "html", "HtmlMouse"];
    d.html.HtmlMouse.__super__ = d.BasicMouse;
    d.html.HtmlMouse.prototype = r(d.BasicMouse.prototype, {
        set_cursor: function(a) {
            var b;
            switch (a[1]) {
                case 0:
                    b = "";
                    break;
                case 1:
                    b = "pointer";
                    break;
                case 2:
                    b = "none"
            }
            this._canvas.style.cursor = b;
            return d.BasicMouse.prototype.set_cursor.call(this, a)
        },
        __class__: d.html.HtmlMouse
    });
    d.html.HtmlSound = function(a) {
        this.audioElement = a
    };
    j["flambe.platform.html.HtmlSound"] =
        d.html.HtmlSound;
    d.html.HtmlSound.__name__ = ["flambe", "platform", "html", "HtmlSound"];
    d.html.HtmlSound.__interfaces__ = [D.Sound];
    d.html.HtmlSound.prototype = {
        get_duration: function() {
            return this.audioElement.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new d.html._HtmlSound.HtmlPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new d.html._HtmlSound.HtmlPlayback(this, a, !1)
        },
        __class__: d.html.HtmlSound
    };
    d.html._HtmlSound = {};
    d.html._HtmlSound.HtmlPlayback = function(a, b, c) {
        var d = this;
        this._sound =
            a;
        this._tickableAdded = !1;
        this.volume = new B.AnimatedFloat(b, function(a) {
            d._clonedElement.volume = a
        });
        this._clonedElement = z.document.createElement("audio");
        this._clonedElement.volume = b;
        this._clonedElement.loop = c;
        this._clonedElement.src = a.audioElement.src;
        this.playAudio()
    };
    j["flambe.platform.html._HtmlSound.HtmlPlayback"] = d.html._HtmlSound.HtmlPlayback;
    d.html._HtmlSound.HtmlPlayback.__name__ = ["flambe", "platform", "html", "_HtmlSound", "HtmlPlayback"];
    d.html._HtmlSound.HtmlPlayback.__interfaces__ = [d.Tickable,
        D.Playback
    ];
    d.html._HtmlSound.HtmlPlayback.prototype = {
        playAudio: function() {
            this._clonedElement.play();
            this._tickableAdded || (d.html.HtmlPlatform.instance.mainLoop.addTickable(this), this._tickableAdded = !0)
        },
        dispose: function() {
            this.set_paused(!0)
        },
        update: function(a) {
            this.volume.update(a);
            return this._clonedElement.ended || this._clonedElement.paused ? (this._tickableAdded = !1, !0) : !1
        },
        get_position: function() {
            return this._clonedElement.currentTime
        },
        get_ended: function() {
            return this._clonedElement.ended
        },
        set_paused: function(a) {
            this._clonedElement.paused !=
                a && (a ? this._clonedElement.pause() : this.playAudio());
            return a
        },
        get_paused: function() {
            return this._clonedElement.paused
        },
        get_sound: function() {
            return this._sound
        },
        __class__: d.html._HtmlSound.HtmlPlayback
    };
    d.html.HtmlStage = function(a) {
        var b = this;
        this._canvas = a;
        this.resize = new k.Signal0;
        this.scaleFactor = d.html.HtmlStage.computeScaleFactor(a);
        1 != this.scaleFactor && (d.html.HtmlUtil.setVendorStyle(this._canvas, "transform-origin", "top left"), d.html.HtmlUtil.setVendorStyle(this._canvas, "transform", "scale(" +
            1 / this.scaleFactor + ")"));
        d.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER && (window.addEventListener("orientationchange", function() {
            d.html.HtmlUtil.callLater(u(b, b.hideMobileBrowser), 200)
        }, !1), this.hideMobileBrowser());
        window.addEventListener("resize", u(this, this.onWindowResize), !1);
        this.onWindowResize();
        this.orientation = new k.Value(null);
        null != window.orientation && (window.addEventListener("orientationchange", u(this, this.onOrientationChange), !1), this.onOrientationChange());
        this.fullscreen = new k.Value(!1);
        d.html.HtmlUtil.addVendorListener(z.document, "fullscreenchange", function() {
            b.updateFullscreen()
        }, !1);
        this.updateFullscreen()
    };
    j["flambe.platform.html.HtmlStage"] = d.html.HtmlStage;
    d.html.HtmlStage.__name__ = ["flambe", "platform", "html", "HtmlStage"];
    d.html.HtmlStage.__interfaces__ = [m.Stage];
    d.html.HtmlStage.computeScaleFactor = function(a) {
        var b = window.devicePixelRatio;
        null == b && (b = 1);
        a = a.getContext("2d");
        a = d.html.HtmlUtil.loadExtension("backingStorePixelRatio", a).value;
        null == a && (a = 1);
        b /= a;
        a = screen.height;
        return 1024 < b * screen.width || 1024 < b * a ? 1 : b
    };
    d.html.HtmlStage.prototype = {
        updateFullscreen: function() {
            this.fullscreen.set__(!0 == d.html.HtmlUtil.loadFirstExtension(["fullscreen", "fullScreen", "isFullScreen"], z.document).value)
        },
        onOrientationChange: function() {
            this.orientation.set__(d.html.HtmlUtil.orientation(window.orientation))
        },
        hideMobileBrowser: function() {
            var a = this,
                b = z.document.documentElement.style;
            b.height = z.window.innerHeight + 100 + "px";
            b.width = z.window.innerWidth + "px";
            b.overflow = "visible";
            d.html.HtmlUtil.callLater(function() {
                d.html.HtmlUtil.hideMobileBrowser();
                d.html.HtmlUtil.callLater(function() {
                    b.height = z.window.innerHeight + "px";
                    a.onWindowResize()
                }, 100)
            })
        },
        resizeCanvas: function(a, b) {
            var c = this.scaleFactor * a,
                d = this.scaleFactor * b;
            if (this._canvas.width == c && this._canvas.height == d) return !1;
            this._canvas.width = c;
            this._canvas.height = d;
            this.resize.emit0();
            return !0
        },
        onWindowResize: function() {
            var a = this._canvas.parentNode.getBoundingClientRect();
            this.resizeCanvas(a.width, a.height)
        },
        requestFullscreen: function(a) {
            null == a && (a = !0);
            if (a) {
                var a = z.document.documentElement,
                    b = d.html.HtmlUtil.loadFirstExtension(["requestFullscreen", "requestFullScreen"], a).value;
                null != b && b.apply(a, [])
            } else a = d.html.HtmlUtil.loadFirstExtension(["cancelFullscreen", "cancelFullScreen"], z.document).value, null != a && a.apply(z.document, [])
        },
        requestResize: function(a, b) {
            if (this.resizeCanvas(a, b)) {
                var c = this._canvas.parentNode;
                c.style.width = a + "px";
                c.style.height = b + "px"
            }
        },
        unlockOrientation: function() {},
        lockOrientation: function() {},
        get_fullscreenSupported: function() {
            return !0 == d.html.HtmlUtil.loadFirstExtension(["fullscreenEnabled",
                "fullScreenEnabled"
            ], z.document).value
        },
        get_height: function() {
            return this._canvas.height
        },
        get_width: function() {
            return this._canvas.width
        },
        __class__: d.html.HtmlStage
    };
    d.html.HtmlStorage = function(a) {
        this._storage = a
    };
    j["flambe.platform.html.HtmlStorage"] = d.html.HtmlStorage;
    d.html.HtmlStorage.__name__ = ["flambe", "platform", "html", "HtmlStorage"];
    d.html.HtmlStorage.__interfaces__ = [t.Storage];
    d.html.HtmlStorage.prototype = {
        clear: function() {
            try {
                this._storage.clear()
            } catch (a) {
                null
            }
        },
        remove: function(a) {
            try {
                this._storage.removeItem("flambe:" +
                    a)
            } catch (b) {
                null
            }
        },
        get: function(a, b) {
            var c = null;
            try {
                c = this._storage.getItem("flambe:" + a)
            } catch (d) {
                null
            }
            if (null != c) try {
                return I.run(c)
            } catch (f) {
                null
            }
            return b
        },
        set: function(a, b) {
            var c;
            try {
                var d = new P;
                d.useCache = !0;
                d.useEnumIndex = !1;
                d.serialize(b);
                c = d.toString()
            } catch (f) {
                return !1
            }
            try {
                this._storage.setItem("flambe:" + a, c)
            } catch (g) {
                return !1
            }
            return !0
        },
        get_supported: function() {
            return !0
        },
        __class__: d.html.HtmlStorage
    };
    d.html.HtmlUtil = function() {};
    j["flambe.platform.html.HtmlUtil"] = d.html.HtmlUtil;
    d.html.HtmlUtil.__name__ = ["flambe", "platform", "html", "HtmlUtil"];
    d.html.HtmlUtil.callLater = function(a, b) {
        null == b && (b = 0);
        z.window.setTimeout(a, b)
    };
    d.html.HtmlUtil.hideMobileBrowser = function() {
        z.window.scrollTo(1, 0)
    };
    d.html.HtmlUtil.loadExtension = function(a, b) {
        null == b && (b = z.window);
        var c = M.field(b, a);
        if (null != c) return {
            prefix: null,
            field: a,
            value: c
        };
        for (var c = a.charAt(0).toUpperCase() + w.substr(a, 1, null), f = 0, g = d.html.HtmlUtil.VENDOR_PREFIXES; f < g.length;) {
            var h = g[f];
            ++f;
            var i = h + c,
                j = M.field(b, i);
            if (null != j) return {
                prefix: h,
                field: i,
                value: j
            }
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    d.html.HtmlUtil.loadFirstExtension = function(a, b) {
        for (var c = 0; c < a.length;) {
            var f = a[c];
            ++c;
            f = d.html.HtmlUtil.loadExtension(f, b);
            if (null != f.field) return f
        }
        return {
            prefix: null,
            field: null,
            value: null
        }
    };
    d.html.HtmlUtil.polyfill = function(a, b) {
        null == b && (b = z.window);
        var c = d.html.HtmlUtil.loadExtension(a, b).value;
        if (null == c) return !1;
        b[a] = c;
        return !0
    };
    d.html.HtmlUtil.setVendorStyle = function(a, b, c) {
        for (var a = a.style, f = 0, g = d.html.HtmlUtil.VENDOR_PREFIXES; f < g.length;) {
            var h =
                g[f];
            ++f;
            a.setProperty("-" + h + "-" + b, c)
        }
        a.setProperty(b, c)
    };
    d.html.HtmlUtil.addVendorListener = function(a, b, c, f) {
        for (var g = 0, h = d.html.HtmlUtil.VENDOR_PREFIXES; g < h.length;) {
            var i = h[g];
            ++g;
            a.addEventListener(i + b, c, f)
        }
        a.addEventListener(b, c, f)
    };
    d.html.HtmlUtil.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return m.Orientation.Landscape;
            default:
                return m.Orientation.Portrait
        }
    };
    d.html.HtmlUtil.createCanvas = function(a) {
        var b = z.document.createElement("canvas");
        b.width = a.width;
        b.height = a.height;
        var c = b.getContext("2d");
        c.save();
        c.globalCompositeOperation = "copy";
        c.drawImage(a, 0, 0);
        c.restore();
        return b
    };
    t = {
        Web: function() {}
    };
    j["flambe.web.Web"] = t.Web;
    t.Web.__name__ = ["flambe", "web", "Web"];
    t.Web.prototype = {
        __class__: t.Web
    };
    d.html.HtmlWeb = function(a) {
        this._container = a
    };
    j["flambe.platform.html.HtmlWeb"] = d.html.HtmlWeb;
    d.html.HtmlWeb.__name__ = ["flambe", "platform", "html", "HtmlWeb"];
    d.html.HtmlWeb.__interfaces__ = [t.Web];
    d.html.HtmlWeb.prototype = {
        openBrowser: function(a) {
            z.window.open(a, "_blank")
        },
        createView: function(a, b, c,
            f) {
            var g = z.document.createElement("iframe");
            g.style.position = "absolute";
            g.style.border = "0";
            g.scrolling = "no";
            this._container.appendChild(g);
            a = new d.html.HtmlWebView(g, a, b, c, f);
            d.html.HtmlPlatform.instance.mainLoop.addTickable(a);
            return a
        },
        get_supported: function() {
            return !0
        },
        __class__: d.html.HtmlWeb
    };
    t.WebView = function() {};
    j["flambe.web.WebView"] = t.WebView;
    t.WebView.__name__ = ["flambe", "web", "WebView"];
    t.WebView.__interfaces__ = [k.Disposable];
    t.WebView.prototype = {
        __class__: t.WebView
    };
    d.html.HtmlWebView =
        function(a, b, c, d, f) {
            var g = this;
            this.iframe = a;
            a = function() {
                g.updateBounds()
            };
            this.x = new B.AnimatedFloat(b, a);
            this.y = new B.AnimatedFloat(c, a);
            this.width = new B.AnimatedFloat(d, a);
            this.height = new B.AnimatedFloat(f, a);
            this.updateBounds();
            this.url = new k.Value(null, function(a) {
                g.loadUrl(a)
            });
            this.error = new k.Signal1
        };
    j["flambe.platform.html.HtmlWebView"] = d.html.HtmlWebView;
    d.html.HtmlWebView.__name__ = ["flambe", "platform", "html", "HtmlWebView"];
    d.html.HtmlWebView.__interfaces__ = [d.Tickable, t.WebView];
    d.html.HtmlWebView.prototype = {
        loadUrl: function(a) {
            null != this.iframe && (this.iframe.src = a)
        },
        updateBounds: function() {
            null != this.iframe && (this.iframe.style.left = this.x._value + "px", this.iframe.style.top = this.y._value + "px", this.iframe.width = this.width._value, this.iframe.height = this.height._value)
        },
        update: function(a) {
            this.x.update(a);
            this.y.update(a);
            this.width.update(a);
            this.height.update(a);
            return null == this.iframe
        },
        dispose: function() {
            null != this.iframe && (this.iframe.parentNode.removeChild(this.iframe), this.iframe = null)
        },
        __class__: d.html.HtmlWebView
    };
    d.html.WebAudioSound = function(a) {
        this.buffer = a
    };
    j["flambe.platform.html.WebAudioSound"] = d.html.WebAudioSound;
    d.html.WebAudioSound.__name__ = ["flambe", "platform", "html", "WebAudioSound"];
    d.html.WebAudioSound.__interfaces__ = [D.Sound];
    d.html.WebAudioSound.get_supported = function() {
        if (d.html.WebAudioSound._detectSupport) {
            d.html.WebAudioSound._detectSupport = !1;
            var a = d.html.HtmlUtil.loadExtension("AudioContext").value;
            d.html.WebAudioSound.ctx = null != a ? new a : null
        }
        return null != d.html.WebAudioSound.ctx
    };
    d.html.WebAudioSound.prototype = {
        get_duration: function() {
            return this.buffer.duration
        },
        loop: function(a) {
            null == a && (a = 1);
            return new d.html._WebAudioSound.WebAudioPlayback(this, a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return new d.html._WebAudioSound.WebAudioPlayback(this, a, !1)
        },
        __class__: d.html.WebAudioSound
    };
    d.html._WebAudioSound = {};
    d.html._WebAudioSound.WebAudioPlayback = function(a, b, c) {
        var f = this;
        this._sound = a;
        this._head = d.html.WebAudioSound.ctx.destination;
        this._sourceNode = d.html.WebAudioSound.ctx.createBufferSource();
        this._sourceNode.buffer =
            a.buffer;
        this._sourceNode.loop = c;
        (this._sourceNode.start) ?this._sourceNode.start(0) : this._sourceNode.noteOn(0);
        this.playAudio();
        this.volume = new B.AnimatedFloat(b, function(a) {
            f.setVolume(a)
        });
        1 != b && this.setVolume(b)
    };
    j["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = d.html._WebAudioSound.WebAudioPlayback;
    d.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe", "platform", "html", "_WebAudioSound", "WebAudioPlayback"];
    d.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [d.Tickable, D.Playback];
    d.html._WebAudioSound.WebAudioPlayback.prototype = {
        playAudio: function() {
            this._sourceNode.connect(this._head);
            this._startedAt = d.html.WebAudioSound.ctx.currentTime;
            this._pausedAt = -1;
            this._tickableAdded || (this._tickableAdded = !0, d.html.HtmlPlatform.instance.mainLoop.addTickable(this))
        },
        insertNode: function(a) {
            0 <= this._pausedAt || (this._sourceNode.disconnect(), this._sourceNode.connect(a));
            a.connect(this._head);
            this._head = a
        },
        setVolume: function(a) {
            null == this._gainNode && (this._gainNode = (d.html.WebAudioSound.ctx.createGain)?d.html.WebAudioSound.ctx.createGain():d.html.WebAudioSound.ctx.createGainNode(), this.insertNode(this._gainNode));
            this._gainNode.gain.value = a
        },
        dispose: function() {
            this.set_paused(!0)
        },
        update: function(a) {
            this.volume.update(a);
            return 3 == this._sourceNode.playbackState || 0 <= this._pausedAt ? (this._tickableAdded = !1, !0) : !1
        },
        get_position: function() {
            return 3 == this._sourceNode.playbackState ? this._sound.get_duration() : 0 <= this._pausedAt ? this._pausedAt : (d.html.WebAudioSound.ctx.currentTime - this._startedAt) % this._sound.get_duration()
        },
        get_ended: function() {
            return 3 == this._sourceNode.playbackState
        },
        set_paused: function(a) {
            a != 0 <=
                this._pausedAt && (a ? (this._sourceNode.disconnect(), this._pausedAt = this.get_position()) : this.playAudio());
            return a
        },
        get_paused: function() {
            return 0 <= this._pausedAt
        },
        get_sound: function() {
            return this._sound
        },
        __class__: d.html._WebAudioSound.WebAudioPlayback
    };
    t = {
        Director: function() {
            this._width = this._height = -1;
            this._transitor = null;
            this.scenes = [];
            this.occludedScenes = [];
            this._root = new L
        }
    };
    j["flambe.scene.Director"] = t.Director;
    t.Director.__name__ = ["flambe", "scene", "Director"];
    t.Director.__super__ = G;
    t.Director.prototype =
        r(G.prototype, {
            get_height: function() {
                return 0 > this._height ? C._platform.getStage().get_height() : this._height
            },
            get_width: function() {
                return 0 > this._width ? C._platform.getStage().get_width() : this._width
            },
            completeTransition: function() {
                null != this._transitor && (this._transitor.complete(), this._transitor = null, this.invalidateVisibility())
            },
            invalidateVisibility: function() {
                for (var a = this.scenes.length; 0 < a;) {
                    var b = this.scenes[--a],
                        b = b._compMap.Scene_4;
                    if (null == b || b.opaque) break
                }
                this.occludedScenes = 0 < this.scenes.length ?
                    this.scenes.slice(a, this.scenes.length - 1) : [];
                b = this.get_topScene();
                null != b && this.show(b)
            },
            show: function(a) {
                a = a._compMap.Scene_4;
                null != a && a.shown.emit0()
            },
            get_topScene: function() {
                var a = this.scenes.length;
                return 0 < a ? this.scenes[a - 1] : null
            },
            onUpdate: function(a) {
                null != this._transitor && this._transitor.update(a) && this.completeTransition()
            },
            onRemoved: function() {
                this.completeTransition();
                for (var a = 0, b = this.scenes; a < b.length;) {
                    var c = b[a];
                    ++a;
                    c.dispose()
                }
                this.scenes = [];
                this.occludedScenes = [];
                this._root.dispose()
            },
            onAdded: function() {
                this.owner.addChild(this._root)
            },
            get_name: function() {
                return "Director_0"
            },
            __class__: t.Director
        });
    t._Director = {};
    t._Director.Transitor = function() {};
    j["flambe.scene._Director.Transitor"] = t._Director.Transitor;
    t._Director.Transitor.__name__ = ["flambe", "scene", "_Director", "Transitor"];
    t._Director.Transitor.prototype = {
        complete: function() {
            this._transition.complete();
            this._onComplete()
        },
        update: function(a) {
            return this._transition.update(a)
        },
        __class__: t._Director.Transitor
    };
    t.Scene = function(a) {
        null ==
            a && (a = !0);
        this.opaque = a;
        this.shown = new k.Signal0;
        this.hidden = new k.Signal0
    };
    j["flambe.scene.Scene"] = t.Scene;
    t.Scene.__name__ = ["flambe", "scene", "Scene"];
    t.Scene.__super__ = G;
    t.Scene.prototype = r(G.prototype, {
        get_name: function() {
            return "Scene_4"
        },
        __class__: t.Scene
    });
    t.Transition = function() {};
    j["flambe.scene.Transition"] = t.Transition;
    t.Transition.__name__ = ["flambe", "scene", "Transition"];
    t.Transition.prototype = {
        complete: function() {},
        update: function() {
            return !0
        },
        __class__: t.Transition
    };
    D._Mixer = {};
    D._Mixer.MixerSound =
        function(a, b) {
            this._source = a;
            this._channels = b;
            this._playbacks = []
        };
    j["flambe.sound._Mixer.MixerSound"] = D._Mixer.MixerSound;
    D._Mixer.MixerSound.__name__ = ["flambe", "sound", "_Mixer", "MixerSound"];
    D._Mixer.MixerSound.__interfaces__ = [k.Disposable, D.Sound];
    D._Mixer.MixerSound.prototype = {
        dispose: function() {
            for (var a = 0, b = this._playbacks; a < b.length;) {
                var c = b[a];
                ++a;
                c.dispose()
            }
            this._playbacks = []
        },
        get_duration: function() {
            return this._source.get_duration()
        },
        findOpenChannel: function() {
            for (var a = 0, b = this._channels; a <
                b;) {
                var c = a++,
                    d = this._playbacks[c];
                if (null == d || d.get_ended()) return c
            }
            return -1
        },
        playOrLoop: function(a, b) {
            var c = this.findOpenChannel();
            if (0 > c) return new d.DummyPlayback(this);
            var f = b ? this._source.loop(a) : this._source.play(a);
            return this._playbacks[c] = f
        },
        loop: function(a) {
            null == a && (a = 1);
            return this.playOrLoop(a, !0)
        },
        play: function(a) {
            null == a && (a = 1);
            return this.playOrLoop(a, !1)
        },
        __class__: D._Mixer.MixerSound
    };
    s = {
        BitmapSprite: function(a) {
            m.Sprite.call(this);
            this.symbol = a;
            this.anchorX.set__(a.anchorX);
            this.anchorY.set__(a.anchorY)
        }
    };
    j["flambe.swf.BitmapSprite"] = s.BitmapSprite;
    s.BitmapSprite.__name__ = ["flambe", "swf", "BitmapSprite"];
    s.BitmapSprite.__super__ = m.Sprite;
    s.BitmapSprite.prototype = r(m.Sprite.prototype, {
        getNaturalHeight: function() {
            return this.symbol.height
        },
        getNaturalWidth: function() {
            return this.symbol.width
        },
        draw: function(a) {
            a.drawSubImage(this.symbol.atlas, 0, 0, this.symbol.x, this.symbol.y, this.symbol.width, this.symbol.height)
        },
        __class__: s.BitmapSprite
    });
    s.Symbol = function() {};
    j["flambe.swf.Symbol"] = s.Symbol;
    s.Symbol.__name__ = ["flambe", "swf", "Symbol"];
    s.Symbol.prototype = {
        __class__: s.Symbol
    };
    s.BitmapSymbol = function(a, b) {
        this._name = a.symbol;
        this.atlas = b;
        var c = a.rect;
        this.x = c[0];
        this.y = c[1];
        this.width = c[2];
        this.height = c[3];
        c = a.offset;
        null != c ? (this.anchorX = -c[0], this.anchorY = -c[1]) : this.anchorY = this.anchorX = 0
    };
    j["flambe.swf.BitmapSymbol"] = s.BitmapSymbol;
    s.BitmapSymbol.__name__ = ["flambe", "swf", "BitmapSymbol"];
    s.BitmapSymbol.__interfaces__ = [s.Symbol];
    s.BitmapSymbol.prototype = {
        get_name: function() {
            return this._name
        },
        createSprite: function() {
            return new s.BitmapSprite(this)
        },
        __class__: s.BitmapSymbol
    };
    s.Library = function(a, b) {
        this._symbols = new E;
        var c = T.parse(a.getFile(b + "/library.json"));
        this.frameRate = c.frameRate;
        for (var d = [], f = 0, g = c.movies; f < g.length;) {
            var h = g[f];
            ++f;
            h = new s.MovieSymbol(this, h);
            d.push(h);
            this._symbols.set(h.get_name(), h)
        }
        null != c.textureGroups ? (f = c.textureGroups, (1 != f[0].scaleFactor || 1 < f.length) && null, h = f[0].atlases) : h = c.atlases;
        for (f = 0; f < h.length;) {
            c = h[f];
            ++f;
            for (var i = a.getTexture(b + "/" + k.Strings.removeFileExtension(c.file)), g = 0, c = c.textures; g < c.length;) {
                var j =
                    c[g];
                ++g;
                j = new s.BitmapSymbol(j, i);
                this._symbols.set(j.get_name(), j)
            }
        }
        for (f = 0; f < d.length;) {
            h = d[f];
            ++f;
            g = 0;
            for (c = h.layers; g < c.length;) {
                h = c[g];
                ++g;
                i = 0;
                for (j = h.keyframes; i < j.length;) {
                    var l = j[i];
                    ++i;
                    var m = this._symbols.get(l.symbolName);
                    null != m && (null == h.lastSymbol ? h.lastSymbol = m : h.lastSymbol != m && (h.multipleSymbols = !0), l.symbol = m)
                }
            }
        }
    };
    j["flambe.swf.Library"] = s.Library;
    s.Library.__name__ = ["flambe", "swf", "Library"];
    s.Library.prototype = {
        __class__: s.Library
    };
    s.MovieSprite = function(a) {
        this._looped = null;
        m.Sprite.call(this);
        this.symbol = a;
        this.speed = new B.AnimatedFloat(1);
        this._animators = [];
        for (var b = 0, a = a.layers; b < a.length;) {
            var c = a[b];
            ++b;
            this._animators.push(new s._MovieSprite.LayerAnimator(c))
        }
        this._position = this._frame = 0;
        this["goto"](1)
    };
    j["flambe.swf.MovieSprite"] = s.MovieSprite;
    s.MovieSprite.__name__ = ["flambe", "swf", "MovieSprite"];
    s.MovieSprite.__super__ = m.Sprite;
    s.MovieSprite.prototype = r(m.Sprite.prototype, {
        get_looped: function() {
            null == this._looped && (this._looped = new k.Signal0);
            return this._looped
        },
        set_paused: function(a) {
            this._flags =
                k.BitSets.set(this._flags, 16, a);
            return a
        },
        set_position: function(a) {
            return this._position = F.FMath.clamp(a, 0, this.symbol.duration)
        },
        "goto": function(a) {
            if (this._frame != a) {
                if (a < this._frame)
                    for (var b = 0, c = this._animators; b < c.length;) {
                        var d = c[b];
                        ++b;
                        d.changedKeyframe = !0;
                        d.keyframeIdx = 0
                    }
                b = 0;
                for (c = this._animators; b < c.length;) d = c[b], ++b, d.composeFrame(a);
                this._frame = a
            }
        },
        onUpdate: function(a) {
            m.Sprite.prototype.onUpdate.call(this, a);
            this.speed.update(a);
            var b = !1;
            0 == (this._flags & 16) && (this._position += this.speed._value *
                a, this._position > this.symbol.duration && (this._position %= this.symbol.duration, b = !0));
            this["goto"](this._position * this.symbol.frameRate);
            b && null != this._looped && this._looped.emit0()
        },
        onRemoved: function() {
            m.Sprite.prototype.onRemoved.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var c = b[a];
                ++a;
                this.owner.removeChild(c.content)
            }
        },
        onAdded: function() {
            m.Sprite.prototype.onAdded.call(this);
            for (var a = 0, b = this._animators; a < b.length;) {
                var c = b[a];
                ++a;
                this.owner.addChild(c.content)
            }
        },
        __class__: s.MovieSprite
    });
    s._MovieSprite = {};
    s._MovieSprite.LayerAnimator = function(a) {
        this._sprites = null;
        this.changedKeyframe = !1;
        this.keyframeIdx = 0;
        this.layer = a;
        this.content = new L;
        var b;
        if (a.multipleSymbols) {
            this._sprites = [];
            b = 0;
            for (a = a.keyframes; b < a.length;) {
                var c = a[b];
                ++b;
                this._sprites.push(c.symbol.createSprite())
            }
            b = this._sprites[0]
        } else b = null != a.lastSymbol ? a.lastSymbol.createSprite() : new m.Sprite;
        this.content.add(b)
    };
    j["flambe.swf._MovieSprite.LayerAnimator"] = s._MovieSprite.LayerAnimator;
    s._MovieSprite.LayerAnimator.__name__ = ["flambe", "swf", "_MovieSprite", "LayerAnimator"];
    s._MovieSprite.LayerAnimator.prototype = {
        composeFrame: function(a) {
            for (var b = this.layer.keyframes, c = b.length - 1; this.keyframeIdx < c && b[this.keyframeIdx + 1].index <= a;) ++this.keyframeIdx, this.changedKeyframe = !0;
            var d;
            this.changedKeyframe && null != this._sprites ? (this.changedKeyframe = !1, d = this._sprites[this.keyframeIdx], this.content.add(d)) : d = this.content._compMap.Sprite_1;
            var f = b[this.keyframeIdx],
                g = f.visible;
            d.set_visible(g);
            if (g) {
                var g = f.x,
                    h = f.y,
                    i = f.scaleX,
                    j = f.scaleY,
                    l = f.skewX,
                    k = f.skewY,
                    m = f.alpha;
                if (this.keyframeIdx < c) {
                    a = (a - f.index) / f.duration;
                    c = f.ease;
                    if (0 != c) {
                        var n;
                        0 > c ? (n = 1 - a, n = 1 - n * n, c = -c) : n = a * a;
                        a = c * n + (1 - c) * a
                    }
                    b = b[this.keyframeIdx + 1];
                    g += (b.x - g) * a;
                    h += (b.y - h) * a;
                    i += (b.scaleX - i) * a;
                    j += (b.scaleY - j) * a;
                    l += (b.skewX - l) * a;
                    k += (b.skewY - k) * a;
                    m += (b.alpha - m) * a
                }
                b = d.getLocalMatrix();
                a = Math.sin(l);
                l = Math.cos(l);
                c = Math.sin(k);
                k = Math.cos(k);
                b.set(k * i, c * i, -a * j, l * j, g, h);
                b.translate(-(f.pivotX + d.anchorX._value), -(f.pivotY + d.anchorY._value));
                d.alpha.set__(m)
            }
        },
        __class__: s._MovieSprite.LayerAnimator
    };
    s.MovieSymbol = function(a, b) {
        this._name = b.id;
        this.frameRate = a.frameRate;
        this.frames = 0;
        this.layers = [];
        for (var c = 0, d = b.layers; c < d.length;) {
            var f = d[c];
            ++c;
            f = new s.MovieLayer(f);
            this.frames = Math.max(f.get_frames(), this.frames);
            this.layers.push(f)
        }
        this.duration = this.frames / this.frameRate
    };
    j["flambe.swf.MovieSymbol"] = s.MovieSymbol;
    s.MovieSymbol.__name__ = ["flambe", "swf", "MovieSymbol"];
    s.MovieSymbol.__interfaces__ = [s.Symbol];
    s.MovieSymbol.prototype = {
        createSprite: function() {
            return new s.MovieSprite(this)
        },
        get_name: function() {
            return this._name
        },
        __class__: s.MovieSymbol
    };
    s.MovieLayer = function(a) {
        this.name = a.name;
        this.multipleSymbols = !1;
        this.keyframes = [];
        for (var b = null, c = 0, a = a.keyframes; c < a.length;) {
            var d = a[c];
            ++c;
            b = new s.MovieKeyframe(d, b);
            this.keyframes.push(b)
        }
    };
    j["flambe.swf.MovieLayer"] = s.MovieLayer;
    s.MovieLayer.__name__ = ["flambe", "swf", "MovieLayer"];
    s.MovieLayer.prototype = {
        get_frames: function() {
            var a = this.keyframes[this.keyframes.length - 1];
            return a.index + (a.duration | 0)
        },
        __class__: s.MovieLayer
    };
    s.MovieKeyframe =
        function(a, b) {
            this.index = null != b ? b.index + b.duration : 0;
            this.duration = a.duration;
            this.label = a.label;
            this.symbolName = a.ref;
            this.y = this.x = 0;
            this.scaleY = this.scaleX = 1;
            this.pivotY = this.pivotX = this.skewY = this.skewX = 0;
            this.alpha = 1;
            this.visible = !0;
            this.ease = 0;
            if (null != this.symbolName) {
                var c = a.loc;
                null != c && (this.x = c[0], this.y = c[1]);
                c = a.scale;
                null != c && (this.scaleX = c[0], this.scaleY = c[1]);
                c = a.skew;
                null != c && (this.skewX = c[0], this.skewY = c[1]);
                c = a.pivot;
                null != c && (this.pivotX = c[0], this.pivotY = c[1]);
                null != a.alpha &&
                    (this.alpha = a.alpha);
                null != a.visible && (this.visible = a.visible);
                null != a.ease && (this.ease = a.ease)
            }
        };
    j["flambe.swf.MovieKeyframe"] = s.MovieKeyframe;
    s.MovieKeyframe.__name__ = ["flambe", "swf", "MovieKeyframe"];
    s.MovieKeyframe.prototype = {
        __class__: s.MovieKeyframe
    };
    k.Assert = function() {};
    j["flambe.util.Assert"] = k.Assert;
    k.Assert.__name__ = ["flambe", "util", "Assert"];
    k.BitSets = function() {};
    j["flambe.util.BitSets"] = k.BitSets;
    k.BitSets.__name__ = ["flambe", "util", "BitSets"];
    k.BitSets.set = function(a, b, c) {
        return c ? a |
            b : a & ~b
    };
    k.LogHandler = function() {};
    j["flambe.util.LogHandler"] = k.LogHandler;
    k.LogHandler.__name__ = ["flambe", "util", "LogHandler"];
    k.LogHandler.prototype = {
        __class__: k.LogHandler
    };
    k.Promise = function() {
        this.success = new k.Signal1;
        this.error = new k.Signal1;
        this.progressChanged = new k.Signal0;
        this.hasResult = !1;
        this._total = this._progress = 0
    };
    j["flambe.util.Promise"] = k.Promise;
    k.Promise.__name__ = ["flambe", "util", "Promise"];
    k.Promise.prototype = {
        set_total: function(a) {
            this._total = a;
            this.progressChanged.emit0();
            return a
        },
        set_progress: function(a) {
            this._progress = a;
            this.progressChanged.emit0();
            return a
        },
        get: function(a) {
            return this.hasResult ? (a(this._result), null) : this.success.connect(a).once()
        },
        set_result: function(a) {
            if (this.hasResult) throw "Promise result already assigned";
            this._result = a;
            this.hasResult = !0;
            this.success.emit1(a);
            return a
        },
        get_result: function() {
            if (!this.hasResult) throw "Promise result not yet available";
            return this._result
        },
        __class__: k.Promise
    };
    k.Signal0 = function(a) {
        k.SignalBase.call(this, a)
    };
    j["flambe.util.Signal0"] =
        k.Signal0;
    k.Signal0.__name__ = ["flambe", "util", "Signal0"];
    k.Signal0.__super__ = k.SignalBase;
    k.Signal0.prototype = r(k.SignalBase.prototype, {
        __class__: k.Signal0
    });
    k._SignalBase = {};
    k._SignalBase.Task = function(a) {
        this.next = null;
        this.fn = a
    };
    j["flambe.util._SignalBase.Task"] = k._SignalBase.Task;
    k._SignalBase.Task.__name__ = ["flambe", "util", "_SignalBase", "Task"];
    k._SignalBase.Task.prototype = {
        __class__: k._SignalBase.Task
    };
    x = void 0;
    O = void 0;
    $ = void 0;
    I = void 0;
    P = void 0;
    T = void 0;
    $ = function(a) {
        this.url = a;
        this.headers =
            new E;
        this.params = new E;
        this.async = !0
    };
    j["haxe.Http"] = $;
    $.__name__ = ["haxe", "Http"];
    $.prototype = {
        onStatus: function() {},
        onError: function() {},
        onData: function() {},
        request: function(a) {
            var b = this,
                c = new ca,
                d = function() {
                    if (4 == c.readyState) {
                        var a;
                        try {
                            a = c.status
                        } catch (d) {
                            a = null
                        }
                        void 0 == a && (a = null);
                        if (null != a) b.onStatus(a);
                        if (null != a && 200 <= a && 400 > a) b.onData(c.responseText);
                        else switch (a) {
                            case null:
                            case void 0:
                                b.onError("Failed to connect or resolve host");
                                break;
                            case 12029:
                                b.onError("Failed to connect to host");
                                break;
                            case 12007:
                                b.onError("Unknown host");
                                break;
                            default:
                                b.onError("Http Error #" + c.status)
                        }
                    }
                };
            this.async && (c.onreadystatechange = d);
            var f = this.postData;
            if (null != f) a = !0;
            else
                for (var g = this.params.keys(); g.hasNext();) var h = g.next(),
                    f = null == f ? "" : f + "&",
                    f = f + (K.urlEncode(h) + "=" + K.urlEncode(this.params.get(h)));
            try {
                if (a) c.open("POST", this.url, this.async);
                else if (null != f) {
                    var i = 1 >= this.url.split("?").length;
                    c.open("GET", this.url + (i ? "?" : "&") + f, this.async);
                    f = null
                } else c.open("GET", this.url, this.async)
            } catch (j) {
                this.onError(j.toString());
                return
            }
            null == this.headers.get("Content-Type") && a && null == this.postData && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            for (a = this.headers.keys(); a.hasNext();) g = a.next(), c.setRequestHeader(g, this.headers.get(g));
            c.send(f);
            this.async || d()
        },
        __class__: $
    };
    T = function() {};
    j["haxe.Json"] = T;
    T.__name__ = ["haxe", "Json"];
    T.parse = function(a) {
        return (new T).doParse(a)
    };
    T.prototype = {
        parseString: function() {
            for (var a = this.pos, b = new V;;) {
                var c = this.str.charCodeAt(this.pos++);
                if (34 == c) break;
                if (92 ==
                    c) {
                    b.b += w.substr(this.str, a, this.pos - a - 1);
                    c = this.str.charCodeAt(this.pos++);
                    switch (c) {
                        case 114:
                            b.b += String.fromCharCode(13);
                            break;
                        case 110:
                            b.b += String.fromCharCode(10);
                            break;
                        case 116:
                            b.b += String.fromCharCode(9);
                            break;
                        case 98:
                            b.b += String.fromCharCode(8);
                            break;
                        case 102:
                            b.b += String.fromCharCode(12);
                            break;
                        case 47:
                        case 92:
                        case 34:
                            b.b += String.fromCharCode(c);
                            break;
                        case 117:
                            a = p.parseInt("0x" + w.substr(this.str, this.pos, 4));
                            this.pos += 4;
                            b.b += String.fromCharCode(a);
                            break;
                        default:
                            throw "Invalid escape sequence \\" +
                                String.fromCharCode(c) + " at position " + (this.pos - 1);
                    }
                    a = this.pos
                } else if (c != c) throw "Unclosed string";
            }
            b.b += w.substr(this.str, a, this.pos - a - 1);
            return b.b
        },
        parseRec: function() {
            for (;;) switch (this.str.charCodeAt(this.pos++)) {
                case 32:
                case 13:
                case 10:
                case 9:
                    break;
                case 123:
                    for (var a = {}, b = null, c = null;;) {
                        var d = this.str.charCodeAt(this.pos++);
                        switch (d) {
                            case 32:
                            case 13:
                            case 10:
                            case 9:
                                break;
                            case 125:
                                return (null != b || !1 == c) && this.invalidChar(), a;
                            case 58:
                                null == b && this.invalidChar();
                                a[b] = this.parseRec();
                                b = null;
                                c = !0;
                                break;
                            case 44:
                                c ? c = !1 : this.invalidChar();
                                break;
                            case 34:
                                c && this.invalidChar();
                                b = this.parseString();
                                break;
                            default:
                                this.invalidChar()
                        }
                    }
                    break;
                case 91:
                    a = [];
                    for (c = null;;) switch (d = this.str.charCodeAt(this.pos++), d) {
                        case 32:
                        case 13:
                        case 10:
                        case 9:
                            break;
                        case 93:
                            return !1 == c && this.invalidChar(), a;
                        case 44:
                            c ? c = !1 : this.invalidChar();
                            break;
                        default:
                            c && this.invalidChar(), this.pos--, a.push(this.parseRec()), c = !0
                    }
                    break;
                case 116:
                    c = this.pos;
                    if (114 != this.str.charCodeAt(this.pos++) || 117 != this.str.charCodeAt(this.pos++) ||
                        101 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return !0;
                case 102:
                    c = this.pos;
                    if (97 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 115 != this.str.charCodeAt(this.pos++) || 101 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return !1;
                case 110:
                    c = this.pos;
                    if (117 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++) || 108 != this.str.charCodeAt(this.pos++)) this.pos = c, this.invalidChar();
                    return null;
                case 34:
                    return this.parseString();
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 45:
                    this.pos--;
                    if (!this.reg_float.match(w.substr(this.str, this.pos, null))) throw "Invalid float at position " + this.pos;
                    c = this.reg_float.matched(0);
                    this.pos += c.length;
                    c = p.parseFloat(c);
                    d = c | 0;
                    return d == c ? d : c;
                default:
                    this.invalidChar()
            }
        },
        invalidChar: function() {
            this.pos--;
            throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
        },
        doParse: function(a) {
            this.reg_float = new S("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?", "");
            this.str = a;
            this.pos = 0;
            return this.parseRec()
        },
        __class__: T
    };
    P = function() {
        this.buf =
            new V;
        this.cache = [];
        this.useCache = P.USE_CACHE;
        this.useEnumIndex = P.USE_ENUM_INDEX;
        this.shash = new E;
        this.scount = 0
    };
    j["haxe.Serializer"] = P;
    P.__name__ = ["haxe", "Serializer"];
    P.prototype = {
        serialize: function(a) {
            var b = H["typeof"](a);
            switch (b[1]) {
                case 0:
                    this.buf.b += p.string("n");
                    break;
                case 1:
                    if (0 == a) {
                        this.buf.b += p.string("z");
                        break
                    }
                    this.buf.b += p.string("i");
                    this.buf.b += p.string(a);
                    break;
                case 2:
                    Math.isNaN(a) ? this.buf.b += p.string("k") : Math.isFinite(a) ? (this.buf.b += p.string("d"), this.buf.b += p.string(a)) : this.buf.b +=
                        p.string(0 > a ? "m" : "p");
                    break;
                case 3:
                    this.buf.b += p.string(a ? "t" : "f");
                    break;
                case 6:
                    b = b[2];
                    if (b == String) {
                        this.serializeString(a);
                        break
                    }
                    if (this.useCache && this.serializeRef(a)) break;
                    switch (b) {
                        case Array:
                            var c = 0;
                            this.buf.b += p.string("a");
                            for (var d = a.length, f = 0; f < d;) b = f++, null == a[b] ? c++ : (0 < c && (1 == c ? this.buf.b += p.string("n") : (this.buf.b += p.string("u"), this.buf.b += p.string(c)), c = 0), this.serialize(a[b]));
                            0 < c && (1 == c ? this.buf.b += p.string("n") : (this.buf.b += p.string("u"), this.buf.b += p.string(c)));
                            this.buf.b += p.string("h");
                            break;
                        case aa:
                            this.buf.b += p.string("l");
                            for (a = a.iterator(); a.hasNext();) b = a.next(), this.serialize(b);
                            this.buf.b += p.string("h");
                            break;
                        case Date:
                            this.buf.b += p.string("v");
                            this.buf.b += p.string(w.dateStr(a));
                            break;
                        case E:
                            this.buf.b += p.string("b");
                            for (c = a.keys(); c.hasNext();) b = c.next(), this.serializeString(b), this.serialize(a.get(b));
                            this.buf.b += p.string("h");
                            break;
                        case Q:
                            this.buf.b += p.string("q");
                            for (c = a.keys(); c.hasNext();) b = c.next(), this.buf.b += p.string(":"), this.buf.b += p.string(b), this.serialize(a.get(b));
                            this.buf.b += p.string("h");
                            break;
                        case O.Bytes:
                            b = 0;
                            c = a.length - 2;
                            d = new V;
                            for (f = P.BASE64; b < c;) {
                                var g = a.b[b++],
                                    h = a.b[b++],
                                    i = a.b[b++];
                                d.b += p.string(f.charAt(g >> 2));
                                d.b += p.string(f.charAt((g << 4 | h >> 4) & 63));
                                d.b += p.string(f.charAt((h << 2 | i >> 6) & 63));
                                d.b += p.string(f.charAt(i & 63))
                            }
                            b == c ? (g = a.b[b++], h = a.b[b++], d.b += p.string(f.charAt(g >> 2)), d.b += p.string(f.charAt((g << 4 | h >> 4) & 63)), d.b += p.string(f.charAt(h << 2 & 63))) : b == c + 1 && (g = a.b[b++], d.b += p.string(f.charAt(g >> 2)), d.b += p.string(f.charAt(g << 4 & 63)));
                            b = d.b;
                            this.buf.b +=
                                p.string("s");
                            this.buf.b += p.string(b.length);
                            this.buf.b += p.string(":");
                            this.buf.b += p.string(b);
                            break;
                        default:
                            this.cache.pop(), null != a.hxSerialize ? (this.buf.b += p.string("C"), this.serializeString(H.getClassName(b)), this.cache.push(a), a.hxSerialize(this), this.buf.b += p.string("g")) : (this.buf.b += p.string("c"), this.serializeString(H.getClassName(b)), this.cache.push(a), this.serializeFields(a))
                    }
                    break;
                case 4:
                    if (this.useCache && this.serializeRef(a)) break;
                    this.buf.b += p.string("o");
                    this.serializeFields(a);
                    break;
                case 7:
                    b = b[2];
                    if (this.useCache && this.serializeRef(a)) break;
                    this.cache.pop();
                    this.buf.b += p.string(this.useEnumIndex ? "j" : "w");
                    this.serializeString(H.getEnumName(b));
                    this.useEnumIndex ? (this.buf.b += p.string(":"), this.buf.b += p.string(a[1])) : this.serializeString(a[0]);
                    this.buf.b += p.string(":");
                    d = a.length;
                    this.buf.b += p.string(d - 2);
                    for (f = 2; f < d;) b = f++, this.serialize(a[b]);
                    this.cache.push(a);
                    break;
                case 5:
                    throw "Cannot serialize function";
                default:
                    throw "Cannot serialize " + p.string(a);
            }
        },
        serializeFields: function(a) {
            for (var b =
                    0, c = M.fields(a); b < c.length;) {
                var d = c[b];
                ++b;
                this.serializeString(d);
                this.serialize(M.field(a, d))
            }
            this.buf.b += p.string("g")
        },
        serializeRef: function(a) {
            for (var b = typeof a, c = 0, d = this.cache.length; c < d;) {
                var f = c++,
                    g = this.cache[f];
                if (typeof g == b && g == a) return this.buf.b += p.string("r"), this.buf.b += p.string(f), !0
            }
            this.cache.push(a);
            return !1
        },
        serializeString: function(a) {
            var b = this.shash.get(a);
            null != b ? (this.buf.b += p.string("R"), this.buf.b += p.string(b)) : (this.shash.set(a, this.scount++), this.buf.b += p.string("y"),
                a = K.urlEncode(a), this.buf.b += p.string(a.length), this.buf.b += p.string(":"), this.buf.b += p.string(a))
        },
        toString: function() {
            return this.buf.b
        },
        __class__: P
    };
    I = function(a) {
        this.buf = a;
        this.length = a.length;
        this.pos = 0;
        this.scache = [];
        this.cache = [];
        a = I.DEFAULT_RESOLVER;
        null == a && (a = H, I.DEFAULT_RESOLVER = a);
        this.setResolver(a)
    };
    j["haxe.Unserializer"] = I;
    I.__name__ = ["haxe", "Unserializer"];
    I.initCodes = function() {
        for (var a = [], b = 0, c = I.BASE64.length; b < c;) {
            var d = b++;
            a[I.BASE64.charCodeAt(d)] = d
        }
        return a
    };
    I.run = function(a) {
        return (new I(a)).unserialize()
    };
    I.prototype = {
        unserialize: function() {
            switch (this.buf.charCodeAt(this.pos++)) {
                case 110:
                    return null;
                case 116:
                    return !0;
                case 102:
                    return !1;
                case 122:
                    return 0;
                case 105:
                    return this.readDigits();
                case 100:
                    for (var a = this.pos;;) {
                        var b = this.buf.charCodeAt(this.pos);
                        if (43 <= b && 58 > b || 101 == b || 69 == b) this.pos++;
                        else break
                    }
                    return p.parseFloat(w.substr(this.buf, a, this.pos - a));
                case 121:
                    b = this.readDigits();
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid string length";
                    a = w.substr(this.buf, this.pos,
                        b);
                    this.pos += b;
                    a = K.urlDecode(a);
                    this.scache.push(a);
                    return a;
                case 107:
                    return Math.NaN;
                case 109:
                    return Math.NEGATIVE_INFINITY;
                case 112:
                    return Math.POSITIVE_INFINITY;
                case 97:
                    var c = this.buf,
                        a = [];
                    for (this.cache.push(a);;) {
                        b = this.buf.charCodeAt(this.pos);
                        if (104 == b) {
                            this.pos++;
                            break
                        }
                        117 == b ? (this.pos++, b = this.readDigits(), a[a.length + b - 1] = null) : a.push(this.unserialize())
                    }
                    return a;
                case 111:
                    return b = {}, this.cache.push(b), this.unserializeObject(b), b;
                case 114:
                    b = this.readDigits();
                    if (0 > b || b >= this.cache.length) throw "Invalid reference";
                    return this.cache[b];
                case 82:
                    b = this.readDigits();
                    if (0 > b || b >= this.scache.length) throw "Invalid string reference";
                    return this.scache[b];
                case 120:
                    throw this.unserialize();
                case 99:
                    b = this.unserialize();
                    a = this.resolver.resolveClass(b);
                    if (null == a) throw "Class not found " + b;
                    b = H.createEmptyInstance(a);
                    this.cache.push(b);
                    this.unserializeObject(b);
                    return b;
                case 119:
                    b = this.unserialize();
                    a = this.resolver.resolveEnum(b);
                    if (null == a) throw "Enum not found " + b;
                    b = this.unserializeEnum(a, this.unserialize());
                    this.cache.push(b);
                    return b;
                case 106:
                    b = this.unserialize();
                    a = this.resolver.resolveEnum(b);
                    if (null == a) throw "Enum not found " + b;
                    this.pos++;
                    var c = this.readDigits(),
                        d = H.getEnumConstructs(a)[c];
                    if (null == d) throw "Unknown enum index " + b + "@" + c;
                    b = this.unserializeEnum(a, d);
                    this.cache.push(b);
                    return b;
                case 108:
                    b = new aa;
                    for (this.cache.push(b); 104 != this.buf.charCodeAt(this.pos);) b.add(this.unserialize());
                    this.pos++;
                    return b;
                case 98:
                    c = new E;
                    for (this.cache.push(c); 104 != this.buf.charCodeAt(this.pos);) a = this.unserialize(), c.set(a, this.unserialize());
                    this.pos++;
                    return c;
                case 113:
                    c = new Q;
                    this.cache.push(c);
                    for (b = this.buf.charCodeAt(this.pos++); 58 == b;) a = this.readDigits(), c.set(a, this.unserialize()), b = this.buf.charCodeAt(this.pos++);
                    if (104 != b) throw "Invalid IntHash format";
                    return c;
                case 118:
                    return b = w.strDate(w.substr(this.buf, this.pos, 19)), this.cache.push(b), this.pos += 19, b;
                case 115:
                    b = this.readDigits();
                    c = this.buf;
                    if (58 != this.buf.charCodeAt(this.pos++) || this.length - this.pos < b) throw "Invalid bytes length";
                    d = I.CODES;
                    null == d && (d = I.initCodes(), I.CODES =
                        d);
                    for (var a = this.pos, f = b & 3, g = a + (b - f), h = O.Bytes.alloc(3 * (b >> 2) + (2 <= f ? f - 1 : 0)), i = 0; a < g;) {
                        var j = d[c.charCodeAt(a++)],
                            l = d[c.charCodeAt(a++)];
                        h.b[i++] = (j << 2 | l >> 4) & 255;
                        j = d[c.charCodeAt(a++)];
                        h.b[i++] = (l << 4 | j >> 2) & 255;
                        l = d[c.charCodeAt(a++)];
                        h.b[i++] = (j << 6 | l) & 255
                    }
                    2 <= f && (j = d[c.charCodeAt(a++)], l = d[c.charCodeAt(a++)], h.b[i++] = (j << 2 | l >> 4) & 255, 3 == f && (j = d[c.charCodeAt(a++)], h.b[i++] = (l << 4 | j >> 2) & 255));
                    this.pos += b;
                    this.cache.push(h);
                    return h;
                case 67:
                    b = this.unserialize();
                    a = this.resolver.resolveClass(b);
                    if (null == a) throw "Class not found " +
                        b;
                    b = H.createEmptyInstance(a);
                    this.cache.push(b);
                    b.hxUnserialize(this);
                    if (103 != this.buf.charCodeAt(this.pos++)) throw "Invalid custom data";
                    return b
            }
            this.pos--;
            throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
        },
        unserializeEnum: function(a, b) {
            if (58 != this.buf.charCodeAt(this.pos++)) throw "Invalid enum format";
            var c = this.readDigits();
            if (0 == c) return H.createEnum(a, b);
            for (var d = []; 0 < c--;) d.push(this.unserialize());
            return H.createEnum(a, b, d)
        },
        unserializeObject: function(a) {
            for (;;) {
                if (this.pos >=
                    this.length) throw "Invalid object";
                if (103 == this.buf.charCodeAt(this.pos)) break;
                var b = this.unserialize();
                if (!J.__instanceof(b, String)) throw "Invalid object key";
                var c = this.unserialize();
                a[b] = c
            }
            this.pos++
        },
        readDigits: function() {
            for (var a = 0, b = !1, c = this.pos;;) {
                var d = this.buf.charCodeAt(this.pos);
                if (d != d) break;
                if (45 == d) {
                    if (this.pos != c) break;
                    b = !0
                } else {
                    if (48 > d || 57 < d) break;
                    a = 10 * a + (d - 48)
                }
                this.pos++
            }
            b && (a *= -1);
            return a
        },
        setResolver: function(a) {
            this.resolver = null == a ? {
                    resolveClass: function() {
                        return null
                    },
                    resolveEnum: function() {
                        return null
                    }
                } :
                a
        },
        __class__: I
    };
    O = {
        Bytes: function(a, b) {
            this.length = a;
            this.b = b
        }
    };
    j["haxe.io.Bytes"] = O.Bytes;
    O.Bytes.__name__ = ["haxe", "io", "Bytes"];
    O.Bytes.alloc = function(a) {
        for (var b = [], c = 0; c < a;) c++, b.push(0);
        return new O.Bytes(a, b)
    };
    O.Bytes.ofData = function(a) {
        return new O.Bytes(a.length, a)
    };
    O.Bytes.prototype = {
        __class__: O.Bytes
    };
    x = {
        _Fast: {}
    };
    x._Fast.NodeAccess = function(a) {
        this.__x = a
    };
    j["haxe.xml._Fast.NodeAccess"] = x._Fast.NodeAccess;
    x._Fast.NodeAccess.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    x._Fast.NodeAccess.prototype = {
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw (this.__x.nodeType == q.Document ? "Document" : this.__x.getNodeName()) + " is missing element " + a;
            return new x.Fast(b)
        },
        __class__: x._Fast.NodeAccess
    };
    x._Fast.AttribAccess = function(a) {
        this.__x = a
    };
    j["haxe.xml._Fast.AttribAccess"] = x._Fast.AttribAccess;
    x._Fast.AttribAccess.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    x._Fast.AttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == q.Document) throw "Cannot access document attribute " +
                a;
            var b = this.__x.get(a);
            if (null == b) throw this.__x.getNodeName() + " is missing attribute " + a;
            return b
        },
        __class__: x._Fast.AttribAccess
    };
    x._Fast.HasAttribAccess = function(a) {
        this.__x = a
    };
    j["haxe.xml._Fast.HasAttribAccess"] = x._Fast.HasAttribAccess;
    x._Fast.HasAttribAccess.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    x._Fast.HasAttribAccess.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == q.Document) throw "Cannot access document attribute " + a;
            return this.__x.exists(a)
        },
        __class__: x._Fast.HasAttribAccess
    };
    x._Fast.HasNodeAccess = function(a) {
        this.__x = a
    };
    j["haxe.xml._Fast.HasNodeAccess"] = x._Fast.HasNodeAccess;
    x._Fast.HasNodeAccess.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
    x._Fast.HasNodeAccess.prototype = {
        resolve: function(a) {
            return this.__x.elementsNamed(a).hasNext()
        },
        __class__: x._Fast.HasNodeAccess
    };
    x._Fast.NodeListAccess = function(a) {
        this.__x = a
    };
    j["haxe.xml._Fast.NodeListAccess"] = x._Fast.NodeListAccess;
    x._Fast.NodeListAccess.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    x._Fast.NodeListAccess.prototype = {
        resolve: function(a) {
            for (var b = new aa, a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new x.Fast(c))
            }
            return b
        },
        __class__: x._Fast.NodeListAccess
    };
    x.Fast = function(a) {
        if (a.nodeType != q.Document && a.nodeType != q.Element) throw "Invalid nodeType " + p.string(a.nodeType);
        this.x = a;
        this.node = new x._Fast.NodeAccess(a);
        this.nodes = new x._Fast.NodeListAccess(a);
        this.att = new x._Fast.AttribAccess(a);
        this.has = new x._Fast.HasAttribAccess(a);
        this.hasNode = new x._Fast.HasNodeAccess(a)
    };
    j["haxe.xml.Fast"] = x.Fast;
    x.Fast.__name__ = ["haxe", "xml", "Fast"];
    x.Fast.prototype = {
        getElements: function() {
            var a = this.x.elements();
            return {
                hasNext: u(a, a.hasNext),
                next: function() {
                    var b = a.next();
                    return null == b ? null : new x.Fast(b)
                }
            }
        },
        getInnerHTML: function() {
            for (var a = new V, b = this.x.iterator(); b.hasNext();) {
                var c = b.next();
                a.b += p.string(c.toString())
            }
            return a.b
        },
        getInnerData: function() {
            var a = this.x.iterator();
            if (!a.hasNext()) throw this.getName() + " does not have data";
            var b = a.next(),
                c = a.next();
            if (null != c) {
                if (b.nodeType == q.PCData && c.nodeType ==
                    q.CData && "" == K.trim(b.getNodeValue()) && (b = a.next(), null == b || b.nodeType == q.PCData && "" == K.trim(b.getNodeValue()) && null == a.next())) return c.getNodeValue();
                throw this.getName() + " does not only have data";
            }
            if (b.nodeType != q.PCData && b.nodeType != q.CData) throw this.getName() + " does not have data";
            return b.getNodeValue()
        },
        getName: function() {
            return this.x.nodeType == q.Document ? "Document" : this.x.getNodeName()
        },
        __class__: x.Fast
    };
    x.Parser = function() {};
    j["haxe.xml.Parser"] = x.Parser;
    x.Parser.__name__ = ["haxe", "xml",
        "Parser"
    ];
    x.Parser.parse = function(a) {
        var b = q.createDocument();
        x.Parser.doParse(a, 0, b);
        return b
    };
    x.Parser.doParse = function(a, b, c) {
        null == b && (b = 0);
        for (var d = null, f = 1, g = 1, h = null, i = 0, j = 0, l = 0, k = a.charCodeAt(b); k == k;) {
            switch (f) {
                case 0:
                    switch (k) {
                        case 10:
                        case 13:
                        case 9:
                        case 32:
                            break;
                        default:
                            f = g;
                            continue
                    }
                    break;
                case 1:
                    switch (k) {
                        case 60:
                            f = 0;
                            g = 2;
                            break;
                        default:
                            i = b;
                            f = 13;
                            continue
                    }
                    break;
                case 13:
                    60 == k && (f = q.createPCData(w.substr(a, i, b - i)), c.addChild(f), j++, f = 0, g = 2);
                    break;
                case 17:
                    93 == k && 93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b +
                        2) && (f = q.createCData(w.substr(a, i, b - i)), c.addChild(f), j++, b += 2, f = 1);
                    break;
                case 2:
                    switch (k) {
                        case 33:
                            if (91 == a.charCodeAt(b + 1)) {
                                b += 2;
                                if ("CDATA[" != w.substr(a, b, 6).toUpperCase()) throw "Expected <![CDATA[";
                                b += 5;
                                f = 17
                            } else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
                                if ("OCTYPE" != w.substr(a, b + 2, 6).toUpperCase()) throw "Expected <!DOCTYPE";
                                b += 8;
                                f = 16
                            } else {
                                if (45 != a.charCodeAt(b + 1) || 45 != a.charCodeAt(b + 2)) throw "Expected <\!--";
                                b += 2;
                                f = 15
                            }
                            i = b + 1;
                            break;
                        case 63:
                            f = 14;
                            i = b;
                            break;
                        case 47:
                            if (null == c) throw "Expected node name";
                            i = b + 1;
                            f = 0;
                            g = 10;
                            break;
                        default:
                            f = 3;
                            i = b;
                            continue
                    }
                    break;
                case 3:
                    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (b == i) throw "Expected node name";
                        d = q.createElement(w.substr(a, i, b - i));
                        c.addChild(d);
                        f = 0;
                        g = 4;
                        continue
                    }
                    break;
                case 4:
                    switch (k) {
                        case 47:
                            f = 11;
                            j++;
                            break;
                        case 62:
                            f = 9;
                            j++;
                            break;
                        default:
                            f = 5;
                            i = b;
                            continue
                    }
                    break;
                case 5:
                    if (!(97 <= k && 122 >= k || 65 <= k && 90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (i == b) throw "Expected attribute name";
                        h = w.substr(a, i, b - i);
                        if (d.exists(h)) throw "Duplicate attribute";
                        f = 0;
                        g = 6;
                        continue
                    }
                    break;
                case 6:
                    switch (k) {
                        case 61:
                            f = 0;
                            g = 7;
                            break;
                        default:
                            throw "Expected =";
                    }
                    break;
                case 7:
                    switch (k) {
                        case 34:
                        case 39:
                            f = 8;
                            i = b;
                            break;
                        default:
                            throw 'Expected "';
                    }
                    break;
                case 8:
                    k == a.charCodeAt(i) && (g = w.substr(a, i + 1, b - i - 1), d.set(h, g), f = 0, g = 4);
                    break;
                case 9:
                    i = b = x.Parser.doParse(a, b, d);
                    f = 1;
                    break;
                case 11:
                    switch (k) {
                        case 62:
                            f = 1;
                            break;
                        default:
                            throw "Expected >";
                    }
                    break;
                case 12:
                    switch (k) {
                        case 62:
                            return 0 == j && c.addChild(q.createPCData("")), b;
                        default:
                            throw "Expected >";
                    }
                case 10:
                    if (!(97 <= k && 122 >= k || 65 <= k &&
                            90 >= k || 48 <= k && 57 >= k || 58 == k || 46 == k || 95 == k || 45 == k)) {
                        if (i == b) throw "Expected node name";
                        if (w.substr(a, i, b - i) != c.getNodeName()) throw "Expected </" + c.getNodeName() + ">";
                        f = 0;
                        g = 12;
                        continue
                    }
                    break;
                case 15:
                    45 == k && 45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (c.addChild(q.createComment(w.substr(a, i, b - i))), b += 2, f = 1);
                    break;
                case 16:
                    91 == k ? l++ : 93 == k ? l-- : 62 == k && 0 == l && (c.addChild(q.createDocType(w.substr(a, i, b - i))), f = 1);
                    break;
                case 14:
                    63 == k && 62 == a.charCodeAt(b + 1) && (b++, f = w.substr(a, i + 1, b - i - 2), c.addChild(q.createProlog(f)),
                        f = 1)
            }
            k = a.charCodeAt(++b)
        }
        1 == f && (i = b, f = 13);
        if (13 == f) return (b != i || 0 == j) && c.addChild(q.createPCData(w.substr(a, i, b - i))), b;
        throw "Unexpected end";
    };
    Array.prototype.indexOf ? w.remove = function(a, b) {
        var c = a.indexOf(b);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    } : null;
    Math.__name__ = ["Math"];
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    j.Math = Math;
    Math.isFinite = function(a) {
        return isFinite(a)
    };
    Math.isNaN = function(a) {
        return isNaN(a)
    };
    String.prototype.__class__ =
        j.String = String;
    String.__name__ = ["String"];
    Array.prototype.__class__ = j.Array = Array;
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = j.Date = Date;
    Date.__name__ = ["Date"];
    var fa = j.Int = {
            __name__: ["Int"]
        },
        ga = j.Dynamic = {
            __name__: ["Dynamic"]
        },
        da = j.Float = Number;
    da.__name__ = ["Float"];
    var ea = j.Bool = Boolean;
    ea.__ename__ = ["Bool"];
    var ha = j.Class = {
            __name__: ["Class"]
        },
        ia = {};
    q.Element = "element";
    q.PCData = "pcdata";
    q.CData = "cdata";
    q.Comment = "comment";
    q.DocType = "doctype";
    q.Prolog = "prolog";
    q.Document = "document";
    "undefined" !=
    typeof document && (z.document = document);
    "undefined" != typeof window && (z.window = window, z.window.onerror = function(a, b, c) {
        var d = z.onerror;
        return null == d ? !1 : d(a, [b + ":" + c])
    });
    "undefined" != typeof JSON && (T = JSON);
    if (window.XMLHttpRequest) G = XMLHttpRequest;
    else {
        if (!window.ActiveXObject) throw "Unable to create XMLHttpRequest object.";
        G = function() {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP")
            } catch (a) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {
                    throw "Unable to create XMLHttpRequest object.";
                }
            }
        }
    }
    ca =
        G;
    f.constants.ConstantsApp.EVENT_PAUSE = "eventPause";
    f.constants.ConstantsApp.EVENT_UNPAUSE = "eventUnpause";
    f.constants.ConstantsApp.EVENT_UPDATE_DISPLAY = "eventUpdateDisplay";
    f.constants.ConstantsApp.EVENT_MUTE_TOGGLE = "eventMuteToggle";
    f.constants.ConstantsApp.EVENT_INPUT = "eventKeyboardInput";
    f.constants.ConstantsApp.EVENT_CHANGE_WOLF = "EVENT_CHANGE_WOLF";
    f.constants.ConstantsApp.EVENT_MAKE_ROCK = "EVENT_MAKE_ROCK";
    f.constants.ConstantsApp.EVENT_EFFECT_SHAKE = "EVENT_EFFECT_SHAKE";
    f.constants.ConstantsApp.EVENT_BURST_ORANGE =
        "EVENT_BURST_ORANGE";
    f.constants.ConstantsApp.EVENT_SCORE_POPUP = "EVENT_SCORE_POPUP";
    f.constants.ConstantsApp.EVENT_LEVEL_UP = "EVENT_LEVEL_UP";
    f.constants.ConstantsApp.EVENT_ROCK_BREAK = "EVENT_ROCK_BREAK";
    f.constants.ConstantsApp.BOOL_PAUSED = "bool_paused";
    f.constants.ConstantsApp.BOOL_MUTED = "bool_muted";
    f.constants.ConstantsApp.BOOL_MOUSE_PRESSED = "boolMousePressed";
    f.constants.ConstantsApp.BOOL_GAME_LOSE = "bool_game_lose";
    f.constants.ConstantsApp.BOOL_GAME_WIN = "bool_game_win";
    f.constants.ConstantsApp.BOOL_LEVEL_LOSE =
        "bool_level_lose";
    f.constants.ConstantsApp.BOOL_LEVEL_WIN = "bool_level_win";
    f.constants.ConstantsApp.FLOAT_CANVAS_SCALE = "canvas_scale";
    f.constants.ConstantsApp.FLOAT_HEALTH = "float_health";
    f.constants.ConstantsApp.FLOAT_LEVEL = "float_level";
    f.constants.ConstantsApp.FLOAT_TIMER = "float_timer";
    f.constants.ConstantsApp.FLOAT_SCORE = "float_score";
    f.constants.ConstantsApp.FLOAT_TEXT = "float_text";
    f.constants.ConstantsApp.STRING_CONFIG_PATH = "config/config.xml";
    f.constants.ConstantsApp.TYPE_OBJECT = "object";
    f.constants.ConstantsApp.TYPE_BACKGROUND =
        "bg";
    f.constants.ConstantsApp.TYPE_EFFECT = "eff";
    f.constants.ConstantsApp.STAGE_WIDTH = 960;
    f.constants.ConstantsApp.STAGE_HEIGHT = 560;
    f.constants.ConstantsApp.STAGE_CENTER_X = 480;
    f.constants.ConstantsApp.STAGE_CENTER_Y = 280;
    f.constants.ConstantsApp.FRAMES_PER_SECOND = 30;
    f.constants.ConstantsApp.GROUND_Y_BASE = 560;
    f.constants.ConstantsApp.INPUT_CLICK = "click";
    f.constants.ConstantsApp.INPUT_UP = "up";
    f.constants.ConstantsApp.INPUT_SPACE = "space";
    f.constants.ConstantsApp.LAYER_BG = "bg";
    f.constants.ConstantsApp.LAYER_MOON =
        "moon";
    f.constants.ConstantsApp.LAYER_GROUND = "ground";
    f.constants.ConstantsApp.LAYER_PLAYER = "player";
    f.constants.ConstantsApp.LAYER_GROUND_F = "groundf";
    f.constants.ConstantsApp.LAYER_PARTICLE = "particle";
    f.constants.ConstantsApp.LAYER_LEVELUP = "levelup";
    f.constants.ConstantsApp.baseUrl = "";
    f.constants.ConstantsGround.GROUND_1 = "elements/AssetGround1.png";
    f.constants.ConstantsGround.GROUND_2 = "elements/AssetGround2.png";
    f.constants.ConstantsGround.GROUND_3 = "elements/AssetGround3.png";
    f.constants.ConstantsGround.GROUND_4 =
        "elements/AssetGround4.png";
    f.constants.ConstantsGround.GROUND_5 = "elements/AssetGround5.png";
    f.constants.ConstantsScreen.SCREEN_LOADING = "loadpanel";
    f.constants.ConstantsScreen.SCREEN_SPLASH = "splash";
    f.constants.ConstantsScreen.SCREEN_HELP = "help";
    f.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD = "gameplayhud";
    f.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU = "gameplaymenu";
    f.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM = "quitconfirm";
    f.constants.ConstantsScreen.SCREEN_END_GAME = "endgame";
    f.constants.ConstantsScreen.TRANSITION_FADE =
        0;
    f.constants.ConstantsScreen.TRANSITION_SCROLL = 1;
    f.constants.ConstantsScreen.TRANSITION_STAGED = 2;
    f.constants.ConstantsScreen.TRANSITION_SCREENSHOT = 3;
    f.constants.ConstantsScreen.CHANGE_OPEN_BEGIN = 0;
    f.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE = 1;
    f.constants.ConstantsScreen.CHANGE_CLOSE_BEGIN = 2;
    f.constants.ConstantsScreen.CHANGE_CLOSE_COMPLETE = 3;
    f.constants.ConstantsScreen.OUTPUT_OPENED = 0;
    f.constants.ConstantsScreen.OUTPUT_CLOSED = 1;
    f.constants.ConstantsScreen.CONDITION_CLOSED_ALL = 0;
    f.constants.ConstantsScreen.CONDITION_CLOSED_SPECIFIC =
        1;
    f.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY = 2;
    f.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE = 3;
    f.constants.ConstantsScreen.CONDITION_IMMEDIATE = 4;
    f.constants.ConstantsScreen.FLOW_SPLASH_PLAY = "FLOW_SPLASH_PLAY";
    f.constants.ConstantsScreen.FLOW_SPLASH_PRINTABLE = "FLOW_SPLASH_PRINTABLE";
    f.constants.ConstantsScreen.FLOW_HELP_CLOSE = "FLOW_HELP_CLOSE";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU = "FLOW_GAMEPLAY_MENU";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE = "FLOW_GAMEPLAY_MENU_CLOSE";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP = "FLOW_GAMEPLAY_MENU_HELP";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT = "FLOW_GAMEPLAY_MENU_QUIT";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES = "FLOW_GAMEPLAY_QUIT_YES";
    f.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO = "FLOW_GAMEPLAY_QUIT_NO";
    f.constants.ConstantsScreen.FLOW_END_LEVEL_QUIT = "FLOW_END_LEVEL_QUIT";
    f.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN = "FLOW_END_GAME_PLAY_AGAIN";
    f.constants.ConstantsScreen.FLOW_BRANCH_GAME_WIN =
        "FLOW_BRANCH_GAME_WIN";
    f.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE = "FLOW_BRANCH_GAME_LOSE";
    f.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN = "FLOW_BRANCH_LEVEL_WIN";
    f.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE = "FLOW_BRANCH_LEVEL_LOSE";
    f.constants.ConstantsState.NUMBER_LEVEL = "level";
    h.buttons.ButtonBase.UP = "workinBtnUp";
    h.buttons.ButtonBase.DOWN = "workinBtnDown";
    h.buttons.ButtonBase.CLICK = "workinBtnClick";
    h.buttons.ButtonBase.CANCEL_DRAG = "workinBtnCancelDrag";
    h.screens.data.ScreenStateData.ACTION_STOP =
        0;
    h.screens.data.ScreenStateData.ACTION_OPENED = 1;
    h.screens.data.ScreenStateData.ACTION_EVENT = 2;
    h.screens.data.ScreenStateData.ACTION_NEW_STATE = 3;
    h.screens.data.ScreenStateData.ACTION_CLOSED = 4;
    h.screens.data.ScreenStateData.ACTION_FLOW = 5;
    i.World._STATE_IDLE = 0;
    i.World._STATE_PLAYING = 1;
    o.WMEventFlow.EVENT_FLOW = "Nflow";
    o.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT = "Neio";
    o.WMEventScreenOut.EVENT_SCREEN_OUTPUT = "Neso";
    o.WMEventUpdate.EVENT_UPDATE = "eventupdate";
    l.WorkinMotion.EASE_IN_OUT = "ease";
    l.WorkinMotion.EASE_IN =
        "in";
    l.WorkinMotion.EASE_OUT = "out";
    l.WorkinMotion.EASE_IN_FAST = "infast";
    l.WorkinMotion.EASE_OUT_FAST = "outfast";
    l.WorkinMotion.EASE_LINEAR = "linear";
    l.WorkinMotion.EASE_BOUNCE_IN = "bouncein";
    g.WorkinCloud.instance = new g.WorkinCloud;
    d.html.HtmlPlatform.instance = new d.html.HtmlPlatform;
    k.SignalBase.DISPATCHING_SENTINEL = new k.SignalConnection(null, null);
    C.root = new L;
    C.uncaughtError = new k.Signal1;
    C.hidden = new k.Value(!1);
    C.hasGPU = new k.Value(!1);
    C._platform = d.html.HtmlPlatform.instance;
    C._calledInit = !1;
    U.logger = new k.Logger(C._platform.createLogHandler("flambe"));
    v.Manifest._buildManifest = v.Manifest.createBuildManifests();
    U = v.Manifest;
    G = (new S("\\b(Android)\\b", "")).match(z.window.navigator.userAgent) ? !1 : null != (new XMLHttpRequest).withCredentials;
    U._supportsCrossOrigin = G;
    m.Sprite._scratchPoint = new F.Point;
    d.BasicKeyboard._sharedEvent = new c.KeyboardEvent;
    d.BasicMouse._sharedEvent = new c.MouseEvent;
    d.BasicPointer._sharedEvent = new c.PointerEvent;
    d.html.CanvasRenderer.CANVAS_TEXTURES = (new S("(iPhone|iPod|iPad)",
        "")).match(z.window.navigator.userAgent);
    d.html.HtmlAssetPackLoader._mediaRefCount = 0;
    d.html.HtmlUtil.VENDOR_PREFIXES = ["webkit", "moz", "ms", "o", "khtml"];
    d.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = z.window.top == z.window && (new S("Mobile(/.*)? Safari", "")).match(z.window.navigator.userAgent);
    d.html.WebAudioSound._detectSupport = !0;
    P.USE_CACHE = !1;
    P.USE_ENUM_INDEX = !1;
    P.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    I.DEFAULT_RESOLVER = H;
    I.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
    R.main()
})();
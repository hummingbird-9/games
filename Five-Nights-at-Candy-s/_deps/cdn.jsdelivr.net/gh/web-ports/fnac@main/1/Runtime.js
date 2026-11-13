var xa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(z, W, k) {
    if (k.get || k.set)
        throw new TypeError("ES3 does not support getters and setters.");
    z != Array.prototype && z != Object.prototype && (z[W] = k.value)
}
  , ya = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
function Da() {
    Da = function() {}
    ;
    ya.Symbol || (ya.Symbol = Ja)
}
var Ka = 0;
function Ja(z) {
    return "jscomp_symbol_" + (z || "") + Ka++
}
function Ta() {
    Da();
    var z = ya.Symbol.iterator;
    z || (z = ya.Symbol.iterator = ya.Symbol("iterator"));
    "function" != typeof Array.prototype[z] && xa(Array.prototype, z, {
        configurable: !0,
        writable: !0,
        value: function() {
            return cb(this)
        }
    });
    Ta = function() {}
}
function cb(z) {
    var W = 0;
    return db(function() {
        return W < z.length ? {
            done: !1,
            value: z[W++]
        } : {
            done: !0
        }
    })
}
function db(z) {
    Ta();
    z = {
        next: z
    };
    z[ya.Symbol.iterator] = function() {
        return this
    }
    ;
    return z
}
function rb(z) {
    Ta();
    var W = z[Symbol.iterator];
    return W ? W.call(z) : cb(z)
}
function sb(z, W) {
    Ta();
    z instanceof String && (z += "");
    var k = 0
      , P = {
        next: function() {
            if (k < z.length) {
                var I = k++;
                return {
                    value: W(I, z[I]),
                    done: !1
                }
            }
            P.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return P.next()
        }
    };
    P[Symbol.iterator] = function() {
        return P
    }
    ;
    return P
}
function De(z, W) {
    if (W) {
        for (var k = ya, P = z.split("."), I = 0; I < P.length - 1; I++) {
            var O = P[I];
            O in k || (k[O] = {});
            k = k[O]
        }
        P = P[P.length - 1];
        I = k[P];
        O = W(I);
        O != I && null != O && xa(k, P, {
            configurable: !0,
            writable: !0,
            value: O
        })
    }
}
De("Array.prototype.values", function(z) {
    return z ? z : function() {
        return sb(this, function(z, k) {
            return k
        })
    }
});
function Ee(z, W) {
    return Object.prototype.hasOwnProperty.call(z, W)
}
De("WeakMap", function(z) {
    function W(k) {
        this.co = (O += Math.random() + 1).toString();
        if (k) {
            Da();
            Ta();
            k = rb(k);
            for (var J; !(J = k.next()).done; )
                J = J.value,
                this.set(J[0], J[1])
        }
    }
    function k(k) {
        Ee(k, I) || xa(k, I, {
            value: {}
        })
    }
    function P(z) {
        var J = Object[z];
        J && (Object[z] = function(z) {
            k(z);
            return J(z)
        }
        )
    }
    if (function() {
        if (!z || !Object.seal)
            return !1;
        try {
            var k = Object.seal({})
              , J = Object.seal({})
              , I = new z([[k, 2], [J, 3]]);
            if (2 != I.get(k) || 3 != I.get(J))
                return !1;
            I["delete"](k);
            I.set(J, 4);
            return !I.has(k) && 4 == I.get(J)
        } catch (ma) {
            return !1
        }
    }())
        return z;
    var I = "$jscomp_hidden_" + Math.random().toString().substring(2);
    P("freeze");
    P("preventExtensions");
    P("seal");
    var O = 0;
    W.prototype.set = function(z, J) {
        k(z);
        if (!Ee(z, I))
            throw Error("WeakMap key fail: " + z);
        z[I][this.co] = J;
        return this
    }
    ;
    W.prototype.get = function(k) {
        return Ee(k, I) ? k[I][this.co] : void 0
    }
    ;
    W.prototype.has = function(k) {
        return Ee(k, I) && Ee(k[I], this.co)
    }
    ;
    W.prototype["delete"] = function(k) {
        return Ee(k, I) && Ee(k[I], this.co) ? delete k[I][this.co] : !1
    }
    ;
    return W
});
De("Map", function(z) {
    function W() {
        var k = {};
        return k.ii = k.next = k.head = k
    }
    function k(k, z) {
        var J = k.Oh;
        return db(function() {
            if (J) {
                for (; J.head != k.Oh; )
                    J = J.ii;
                for (; J.next != J.head; )
                    return J = J.next,
                    {
                        done: !1,
                        value: z(J)
                    };
                J = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }
    function P(k, z) {
        var J;
        J = z && typeof z;
        "object" == J || "function" == J ? O.has(z) ? J = O.get(z) : (J = "" + ++ba,
        O.set(z, J)) : J = "p_" + z;
        var I = k.Kn[J];
        if (I && Ee(k.Kn, J))
            for (var P = 0; P < I.length; P++) {
                var W = I[P];
                if (z !== z && W.key !== W.key || z === W.key)
                    return {
                        id: J,
                        list: I,
                        index: P,
                        ae: W
                    }
            }
        return {
            id: J,
            list: I,
            index: -1,
            ae: void 0
        }
    }
    function I(k) {
        this.Kn = {};
        this.Oh = W();
        this.size = 0;
        if (k) {
            k = rb(k);
            for (var J; !(J = k.next()).done; )
                J = J.value,
                this.set(J[0], J[1])
        }
    }
    if (function() {
        if (!z || !z.prototype.entries || "function" != typeof Object.seal)
            return !1;
        try {
            var k = Object.seal({
                x: 4
            })
              , I = new z(rb([[k, "s"]]));
            if ("s" != I.get(k) || 1 != I.size || I.get({
                x: 4
            }) || I.set({
                x: 4
            }, "t") != I || 2 != I.size)
                return !1;
            var O = I.entries()
              , P = O.next();
            if (P.done || P.value[0] != k || "s" != P.value[1])
                return !1;
            P = O.next();
            return P.done || 4 != P.value[0].x || "t" != P.value[1] || !O.next().done ? !1 : !0
        } catch (Ea) {
            return !1
        }
    }())
        return z;
    Da();
    Ta();
    var O = new WeakMap;
    I.prototype.set = function(k, z) {
        var J = P(this, k);
        J.list || (J.list = this.Kn[J.id] = []);
        J.ae ? J.ae.value = z : (J.ae = {
            next: this.Oh,
            ii: this.Oh.ii,
            head: this.Oh,
            key: k,
            value: z
        },
        J.list.push(J.ae),
        this.Oh.ii.next = J.ae,
        this.Oh.ii = J.ae,
        this.size++);
        return this
    }
    ;
    I.prototype["delete"] = function(k) {
        k = P(this, k);
        return k.ae && k.list ? (k.list.splice(k.index, 1),
        k.list.length || delete this.Kn[k.id],
        k.ae.ii.next = k.ae.next,
        k.ae.next.ii = k.ae.ii,
        k.ae.head = null,
        this.size--,
        !0) : !1
    }
    ;
    I.prototype.clear = function() {
        this.Kn = {};
        this.Oh = this.Oh.ii = W();
        this.size = 0
    }
    ;
    I.prototype.has = function(k) {
        return !!P(this, k).ae
    }
    ;
    I.prototype.get = function(k) {
        return (k = P(this, k).ae) && k.value
    }
    ;
    I.prototype.entries = function() {
        return k(this, function(k) {
            return [k.key, k.value]
        })
    }
    ;
    I.prototype.keys = function() {
        return k(this, function(k) {
            return k.key
        })
    }
    ;
    I.prototype.values = function() {
        return k(this, function(k) {
            return k.value
        })
    }
    ;
    I.prototype.forEach = function(k, z) {
        for (var I = this.entries(), J; !(J = I.next()).done; )
            J = J.value,
            k.call(z, J[1], J[0], this)
    }
    ;
    I.prototype[Symbol.iterator] = I.prototype.entries;
    var ba = 0;
    return I
});
De("Array.prototype.keys", function(z) {
    return z ? z : function() {
        return sb(this, function(z) {
            return z
        })
    }
});
De("Array.prototype.entries", function(z) {
    return z ? z : function() {
        return sb(this, function(z, k) {
            return [z, k]
        })
    }
});
De("Array.prototype.fill", function(z) {
    return z ? z : function(z, k, P) {
        var I = this.length || 0;
        0 > k && (k = Math.max(0, I + k));
        if (null == P || P > I)
            P = I;
        P = Number(P);
        0 > P && (P = Math.max(0, I + P));
        for (k = Number(k || 0); k < P; k++)
            this[k] = z;
        return this
    }
});
window.Runtime = function(z, W) {
    function k(a, b) {
        this.files = {};
        this.root = "";
        a && this.load(a, b)
    }
    function P(a, b, c) {
        this.x = a;
        this.y = b;
        this.text = c
    }
    function I() {
        this.qd = "";
        this.offset = this.T = 0;
        this.pd = !1
    }
    function O() {
        this.Ed = []
    }
    function ba(a, b, c, d) {
        this.left = a ? a : 0;
        this.top = b ? b : 0;
        this.right = c ? c : 0;
        this.bottom = d ? d : 0
    }
    function J() {
        this.y = this.x = 0
    }
    function eb() {
        this.lc = 12;
        this.Je = 400;
        this.Ie = 0;
        this.He = "Arial";
        this.Zi = !1
    }
    function ma(a, b) {
        this.app = a;
        this.Na = b;
        this.$a = new O;
        this.rk = null
    }
    function na(a, b, c) {
        this.app = a;
        this.width = b;
        this.height = c;
        this.canvas = document.createElement("canvas");
        this.canvas.width = b;
        this.canvas.height = c;
        this.Xd = this.canvas.getContext("2d")
    }
    function Ea() {
        this.QJ = !!window.opr && !!opr.GQ || !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
        this.PJ = "undefined" !== typeof InstallTrigger;
        this.SJ = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString();
        this.RA = !!document.documentMode;
        this.MJ = !this.RA && !!window.StyleMedia;
        this.kk = (this.NJ = (this.PA = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && -1 != navigator.userAgent.indexOf("Edg")) ? "Edge" : this.PA ? "Chrome" : this.MJ ? "Edge" : this.RA ? "Explorer" : this.PJ ? "Firefox" : this.QJ ? "Opera" : this.SJ ? "Safari" : this.XC(Ea.nI) || "Unknown browser";
        this.version = this.YC(navigator.userAgent) || this.YC(navigator.appVersion) || "Unknown version";
        this.PG = this.XC(Ea.pI) || "Unknown OS"
    }
    function za() {
        this.Gu = null;
        this.height = this.width = 0;
        this.Dg = null;
        this.Na = this.color = 0;
        this.ZI = null;
        this.Or = this.zv = this.KJ = this.lA = this.Jd = 0;
        this.Fu = null;
        this.Zi = !0
    }
    function Y() {}
    function tb() {
        this.Na = 0;
        this.name = null;
        this.index = 0
    }
    function ha() {}
    function ub() {}
    function vb() {}
    function wb() {}
    function xb() {}
    function yb() {}
    function zb() {}
    function Ab() {}
    function Bb() {}
    function Cb() {}
    function Db() {}
    function Eb() {}
    function Fb() {}
    function Gb() {}
    function Hb() {}
    function Ib() {}
    function Jb() {}
    function Kb() {}
    function Lb() {}
    function Mb() {}
    function Nb() {}
    function Ob() {}
    function Pb() {}
    function Qb() {}
    function Rb() {}
    function Sb() {}
    function Tb() {}
    function Ub() {}
    function Vb() {}
    function Wb() {}
    function Xb() {}
    function Yb() {}
    function Zb() {}
    function $b() {}
    function ac() {}
    function bc() {}
    function cc() {}
    function S() {}
    function va() {}
    function dc() {}
    function S() {}
    function ec() {}
    function fc() {}
    function gc() {}
    function hc() {}
    function ic() {}
    function jc() {}
    function kc() {}
    function lc() {}
    function mc() {}
    function nc() {}
    function oc() {}
    function pc() {}
    function qc() {}
    function rc() {}
    function sc() {}
    function tc() {}
    function uc() {}
    function vc() {}
    function wc() {}
    function fb() {}
    function xc() {}
    function yc() {}
    function zc() {}
    function Ac() {}
    function Bc() {}
    function Cc() {}
    function Dc() {}
    function ca() {}
    function gb() {}
    function wa() {}
    function hb() {}
    function Ec() {}
    function Fc() {}
    function Gc() {}
    function Hc() {}
    function Ic() {}
    function Jc() {}
    function Kc() {}
    function Lc() {}
    function Mc() {}
    function Nc() {}
    function Oc() {}
    function Pc() {}
    function Qc() {}
    function Rc() {}
    function Sc() {}
    function Tc() {}
    function Uc() {}
    function Vc() {}
    function Wc() {}
    function Xc() {}
    function Yc() {}
    function ib() {
        ka.Ub.iK()
    }
    function Zc() {
        ka.Ub.nK()
    }
    function n(a, b, c, d) {
        (this.UA = !0 === d) ? (this.canvas = a.canvas,
        this.Xr = a.Xr) : "string" === typeof a ? (this.canvas = document.getElementById(a),
        this.Xr = this.canvas.parentElement) : a instanceof HTMLElement && (this.canvas = document.createElement("canvas"),
        this.Xr = a);
        a = this.Ku = a.Ku || document.createElement("div");
        a.appendChild(this.canvas);
        this.Xr.appendChild(a);
        a.style.overflow = "hidden";
        a.style.position = "relative";
        a.style.transform = "translateZ(0)";
        a.style.margin = "0";
        a.style.padding = "0";
        a.style.display = "block";
        a.style.boxSizing = "content-box";
        a.className = "MMFDiv";
        this.mA = this.nA = this.gv = null;
        this.bm = 0;
        this.appName = this.hv = null;
        this.pm = 0;
        this.pv = this.HA = null;
        this.wo = 0;
        this.sD = this.Sb = this.ze = this.Vb = this.ba = this.sc = this.ov = null;
        this.cb = this.tD = 0;
        this.Vn = this.Wn = this.oC = this.hp = this.lo = null;
        this.De = this.Fb = this.tx = 0;
        this.ma = this.file = this.frame = null;
        this.Dw = this.Ew = this.$k = 0;
        this.hi = this.H = null;
        this.Qv = !1;
        this.qA = this.Pf = this.pA = this.rA = this.sA = this.Ba = this.ra = this.Mh = this.Xn = this.kg = this.jg = 0;
        this.Tn = this.Fw = this.nC = null;
        this.Yf = this.Xf = this.mI = this.lI = this.Un = 0;
        this.ik = !1;
        this.Wc = null;
        this.Iz = 0;
        this.cursor = "auto";
        this.js = !1;
        this.xk = this.Rq = null;
        this.pd = !1;
        this.Ma = this.alpha = this.$d = this.Zd = this.Mz = this.Lj = this.Jj = 0;
        this.file = b;
        this.vj = "";
        this.path = c;
        b = c.lastIndexOf("/");
        0 <= b && (this.vj = c.substring(0, b + 1));
        this.xg = 0;
        this.H = null;
        this.Sf = this.ff = this.Ad = 0;
        this.Kk = !1;
        this.Ib = [];
        this.Lo = -1;
        this.cs = this.cl = this.sC = this.uC = this.tC = this.rC = this.qC = 0;
        this.ig = this.ld = this.xx = this.transition = null;
        this.wu = !1;
        this.Fh = new Ea;
        this.ih = this.hh = this.Cf = null;
        this.qo = n.ek;
        this.Da = null;
        this.nH = this.iu = this.hu = this.qH = this.pH = this.oH = this.yn = this.Rh = 0;
        this.pc = this.qc = 1;
        this.hasFocus = !0;
        this.jr = this.xu = !1;
        this.qv = this.ds = null;
        this.lr = -1;
        this.ho = null;
        this.fo = 1E9;
        this.kr = null;
        0 <= window.location.href.indexOf("192.") && (b = window.location.href.indexOf("21700/"),
        0 <= b && (this.kr = window.location.href.substring(0, b + 6),
        this.lr = -1,
        this.fo = 25));
        this.rg = !1;
        this.oI = 3;
        this.Jn = new O;
        this.Nq = new O;
        this.Lb = [];
        this.ge = 0;
        this.Te = null;
        this.Vv = "Please touch the screen to start";
        this.fullScreen = !1;
        this.JD = "***version***";
        this.Cx = this.rp = 0
    }
    function Ua(a, b, c) {
        this.changedTouches = Array(1);
        this.changedTouches[0] = {
            pageX: a,
            pageY: b,
            target: c,
            identifier: n.dy
        }
    }
    function H(a) {
        this.app = a;
        this.l = null;
        this.WA = this.Xc = this.ee = 0;
        this.qr = !1;
        this.Xb = 0;
        this.rr = null;
        this.jo = this.ko = 0;
        this.oA = null;
        this.uc = 0;
        this.Pn = this.Bd = this.Xa = null;
        this.aB = this.Gr = this.Iv = this.Hv = this.aj = this.$i = this.Ig = 0;
        this.wd = this.vd = this.po = this.bv = this.Rn = null;
        this.hm = this.Da = this.ge = 0
    }
    function Z(a) {
        this.app = a;
        this.Aa = null;
        this.su = !1;
        this.$y = !0;
        this.Bn = this.en = null;
        this.dB = 0;
        this.sk = null;
        this.Ru = !1;
        this.Aa = Array(Z.rc);
        this.en = Array(Z.rc);
        this.Bn = Array(Z.rc);
        this.su = this.$y = !0;
        var b;
        for (b = 0; b < Z.rc; b++)
            this.Aa[b] = null,
            this.en[b] = 100,
            this.Bn[b] = !1;
        this.dB = 100;
        b = new Audio;
        var c = Array(4);
        c[0] = b.canPlayType("audio/ogg");
        c[1] = b.canPlayType("audio/x-m4a");
        c[2] = b.canPlayType("audio/mpeg");
        c[3] = b.canPlayType("audio/wav");
        for (b = this.Wv = this.Lw = 0; 4 > b; b++)
            "probably" == c[b] && (this.Lw |= 1 << b),
            "maybe" == c[b] && (this.Wv |= 1 << b);
        for (; null != a.ma; )
            a = a.ma;
        this.context = a.sD;
        this.Ul = a.tD;
        null == this.context && ("undefined" !== typeof AudioContext ? (this.context = new AudioContext,
        this.Ul = 1) : "undefined" !== typeof webkitAudioContext && (this.context = new webkitAudioContext,
        this.Ul = 0),
        a.sD = this.context,
        a.tD = this.Ul)
    }
    function $c(a) {
        this.app = a
    }
    function ad(a) {
        this.app = a;
        this.Dv = !1;
        this.C = null;
        this.context = this.app.context;
        this.uf = this.app.tC;
        this.color = this.app.sC;
        this.vi = this.app.qC;
        0 > this.vi && (this.vi = this.app.ra / 2);
        this.wi = this.app.rC;
        0 > this.wi && (this.wi = this.app.Ba / 2);
        this.size = this.app.uC;
        this.ww = 0;
        this.Hq = 25;
        this.Ne = 0;
        this.Dg = new Image;
        var b = this;
        this.Dg.onload = function() {
            b.Dv = !0
        }
        ;
        this.Dg.src = this.app.vj + "Preloader.png"
    }
    function bd(a) {
        this.app = a;
        this.context = this.app.context;
        this.width = 100;
        this.height = 12;
        this.position = 0;
        this.MH = 10526880;
        this.borderColor = 8421504;
        this.NH = 0;
        this.rect = new ba;
        this.rect.left = this.app.ra / 2 - this.width / 2;
        this.rect.top = this.app.Ba / 2 - this.height / 2;
        this.rect.right = this.rect.left + this.width;
        this.rect.bottom = this.rect.top + this.height;
        this.reset()
    }
    function cd(a) {
        this.app = a;
        this.Dv = !1;
        this.Nc = new Fa;
        this.C = new n(this.app,this.app.file,this.app.path,!0);
        this.C.aD(this.app, this.app.cs, 0, this.Nc, this.app.ra, this.app.Ba);
        this.C.digest();
        this.C.Qv = !1;
        this.C.ti = !1;
        this.C.Ma &= ~n.yi;
        this.C.sx();
        this.C.Ps(0, 0);
        this.C.lp();
        this.Nc.x = this.app.ra / 2 - this.C.frame.ee / 2;
        this.Nc.y = this.app.Ba / 2 - this.C.frame.Xc / 2;
        this.cM = 0 != (this.app.Ma & n.bE);
        this.app.Ib.push(this.C);
        this.Xl = 0
    }
    function t(a) {
        this.app = a;
        this.jA = this.iA = this.ce = this.Id = this.pr = this.kc = null;
        this.cc = Array(3);
        this.dc = Array(3);
        this.Na = this.Da = this.Uf = this.Tf = 0;
        this.touches = Array(3);
        this.uu = !1;
        this.SA = !0;
        this.gf = this.Eg = this.VA = 0
    }
    function l(a) {
        this.h = a;
        this.A = null;
        this.Yg = this.pb = this.Vm = this.lx = this.wb = this.ad = this.Qc = this.kx = this.yf = 0;
        this.i = this.W = null;
        this.zf = this.Xo = this.Zo = this.rl = this.Zg = this.Ob = this.jx = this.si = this.Yo = this.sl = this.la = this.ha = this.Qd = this.Pd = 0;
        this.vs = this.cx = this.ws = null;
        this.Cs = this.dx = this.Pm = this.Lm = this.Rm = this.Nm = this.Om = this.Km = this.Qm = this.Mm = this.nl = this.we = this.Jm = this.Im = this.ml = this.ll = this.NC = this.fg = this.yj = this.xj = this.To = this.jl = 0;
        this.ol = null;
        this.da = this.Um = this.Fs = this.Es = this.Wo = this.ex = this.RC = 0;
        this.Bs = this.Tm = this.va = null;
        this.Pc = 0;
        this.As = this.pl = null;
        this.Sm = 0;
        this.ql = null;
        this.Hc = 0;
        this.hs = null;
        this.Cn = !1;
        this.G = null;
        this.Av = Array(2);
        this.Lh = !1;
        this.eA = 0;
        this.ix = 255;
        this.ks = this.BK = !1
    }
    function dd() {
        this.UH = null;
        this.tz = this.sz = this.rz = this.WH = this.VH = this.Fq = 0
    }
    function Q() {
        this.vw = this.tw = this.lb = this.gd = this.ob = this.Zc = 0;
        this.cg = !1;
        this.Io = this.fC = this.gC = this.Xk = this.vm = this.Nd = this.Wr = this.he = this.ec = this.nj = this.Qg = this.lj = this.rw = this.qw = this.Rg = 0;
        this.mj = this.wm = null;
        this.sw = 0;
        this.kj = null;
        this.uw = 0;
        this.qf = null
    }
    function Fe() {
        this.Le = this.name = null
    }
    function Ge() {
        this.value = null;
        this.Js = this.Ks = this.Rc = this.qb = 0
    }
    function He() {
        this.text = null;
        this.qb = 0
    }
    function Ie() {
        this.$a = this.values = null;
        this.Na = 0
    }
    function fa() {
        this.vK = 0;
        this.tK = null;
        this.uK = 0;
        this.O = this.R = null
    }
    function r() {
        this.Li = this.Ch = this.Wd = null
    }
    function Pa() {
        this.Jf = 0;
        this.Ki = this.Kf = null
    }
    function ed() {
        this.Pl = this.Ty = this.Sy = this.ju = this.ku = 0;
        this.fk = null
    }
    function La() {
        this.a = null;
        this.rj = this.ms = this.Vg = 0;
        this.Tw = !1;
        this.ji = 0;
        this.ue = null;
        this.ns = this.ls = 0;
        this.Ro = null;
        this.Dm = this.Bm = this.te = this.tf = this.BC = this.el = this.Am = this.Qo = this.AC = this.Cm = this.qj = this.Sw = 0;
        this.CC = -1
    }
    function fd(a, b) {
        this.ba = a;
        this.app = a.app;
        this.handle = b
    }
    function gd(a) {
        this.app = a;
        this.images = this.file = null;
        this.lf = this.Vh = this.Eb = 0;
        this.ei = this.Lb = this.fi = this.hk = this.Jk = this.ki = this.Ua = this.Ca = this.Wk = null
    }
    function aa() {
        this.app = null;
        this.Ua = this.mh = this.lh = this.Fa = this.Ja = this.height = this.width = this.handle = 0;
        this.Th = this.Rk = this.hf = this.sb = null;
        this.eo = this.wd = this.vd = this.tb = 0
    }
    function hd(a) {
        this.app = a;
        this.Ur = this.fonts = this.file = null;
        this.Uh = 0;
        this.Ca = null;
        this.Hg = this.fe = 0;
        this.Ua = null;
        this.Bo = new Aa;
        this.Bo.Jq()
    }
    function Aa() {
        this.Ie = this.Je = this.lc = this.handle = this.Ua = 0;
        this.font = this.He = null;
        this.Zi = !1
    }
    function id(a) {
        this.app = a;
        this.Ej = null;
        this.yo = this.Vh = this.Eb = 0;
        this.file = this.Ua = this.Ca = this.Vr = null
    }
    function Va(a) {
        this.Ub = a;
        this.context = a.Sb.context;
        this.Ul = a.Sb.Ul;
        this.aJ = a.Sb.aJ;
        this.type = 0;
        this.file = a.file;
        this.handle = -1;
        this.rb = this.source = null;
        this.Ua = 0;
        this.En = !1;
        this.Wh = 0;
        this.name = null;
        this.Oi = this.jk = !1;
        this.frequency = 0;
        this.gain = this.response = null;
        this.volume = 100
    }
    function jb(a) {
        this.name = a;
        this.ZK = [];
        this.position = 0;
        this.yr = !1
    }
    function G(a) {
        this.Ub = a;
        this.l = null;
        this.UB = this.Ig = 0;
        this.Uk = Array(u.cd + u.zy);
        this.vo = this.Lg = 0;
        this.Lk = this.Ze = this.jc = this.mc = this.$c = this.yd = this.rd = this.Ug = null;
        this.Qe = Array(u.cd + 1);
        this.TC = !1;
        this.Xe = null;
        this.No = this.Po = this.Mo = this.Oo = 0;
        this.Vo = !1;
        this.Pe = null;
        this.Gs = 0;
        this.Ds = Array(4);
        this.Hm = this.hl = this.wj = !1;
        this.zs = this.ni = this.gl = this.fc = 0;
        this.OC = this.ri = !1;
        this.Wg = null;
        this.Uo = this.xf = this.Xg = 0;
        this.il = this.oi = null;
        this.Ee = 0;
        this.Gc = !1;
        this.us = this.hx = this.Ic = this.SC = 0;
        this.gx = null;
        this.Dn = !1;
        this.zj = null;
        this.AL = 0;
        this.kl = null;
        this.Bu = !1;
        this.hB = 0;
        this.Hu = null;
        this.Dq = [];
        this.Wl = L.jF;
        this.sf = this.rf = null
    }
    function L() {
        this.Zl = this.Ui = this.na = this.be = this.Bb = 0;
        this.Wa = null;
        this.HI = 0
    }
    function U() {}
    function Je() {
        this.$z = this.id = 0
    }
    function Ke() {
        this.fs = this.es = 0
    }
    function Le(a, b, c, d, e) {
        this.CL = a;
        this.code = b;
        this.QK = c;
        this.PK = d;
        this.bg = e
    }
    function jd() {
        this.Mw = this.gs = this.oj = this.zm = this.pj = this.Sg = 0;
        this.Nw = this.dg = !1;
        this.M = null
    }
    function kb() {
        this.next = null;
        this.type = 0;
        this.name = null;
        this.index = this.xr = this.mp = this.gM = this.Ad = 0;
        this.ru = !1
    }
    function Ba() {
        this.tr = this.XA = this.Kv = this.Mv = this.Lv = this.Vf = this.bj = 0;
        this.Jv = null;
        this.Jv = Array(4);
        var a;
        for (a = 0; 4 > a; a++)
            this.Jv[a] = null
    }
    function kd() {
        this.Ca = this.list = null;
        this.sr = this.Zf = 0
    }
    function X(a) {
        this.app = a;
        this.vk = this.tk = this.rs = this.qs = this.y = this.x = 0;
        this.xq = this.ym = this.xm = null;
        this.ne = !1;
        this.Zk = null;
        this.dz = this.cz = this.fz = this.ez = this.bz = this.$d = this.Zd = this.Pr = this.Nr = this.Kj = this.Ij = this.Ma = this.gw = 0;
        this.Ra = this.Mb = this.oc = null;
        this.angle = 0;
        this.scale = this.pc = this.qc = 1;
        this.Ja = this.sp = 320;
        this.Fa = this.up = 240
    }
    function ja(a, b, c, d, e, f) {
        this.app = a;
        this.fK = d;
        this.mf = this.type = 0;
        this.x = b;
        this.y = c;
        this.height = this.width = 0;
        this.ie = null;
        this.Sl = !1;
        this.ed = null;
        this.borderWidth = 0;
        this.borderColor = this.Iu = this.mk = null;
        this.$d = this.Zd = 0;
        this.R = this.body = null;
        if (d)
            if (this.ie = this.app.sc.Vi(d.Vf),
            this.type = this.ie.Me,
            this.mf = this.ie.vc.$B,
            this.borderWidth = this.ie.vc.Tr,
            this.IA = this.ie.vc.Eo,
            this.Zd = this.ie.nw,
            this.$d = this.ie.ow,
            this.width = this.ie.vc.XB,
            this.height = this.ie.vc.YB,
            this.Sl = 0 != this.ie.vc.WB,
            this.mk = this.ie.vc.Mg,
            this.Iu = this.ie.vc.tm,
            this.borderColor = this.ie.vc.Sr,
            1 == this.type)
                this.ed = this.app.ba.Kb(this.ie.vc.Yh),
                this.width = this.ed.width,
                this.height = this.ed.height;
            else {
                if (32 <= this.type) {
                    a = this.app.H;
                    b = null;
                    for (e = c = 0; e < a.pb; e++) {
                        for (; null == a.G[c]; )
                            c++;
                        b = a.G[c];
                        c++;
                        if (b.gK == d)
                            break
                    }
                    this.R = b
                }
            }
        else {
            this.type = u.By;
            this.ed = e;
            this.width = this.ed.width;
            this.height = this.ed.height;
            this.x -= this.ed.Ja;
            this.y -= this.ed.Fa;
            switch (f) {
            case 0:
                this.mf = da.Fy;
                break;
            case 1:
                this.mf = da.gq;
                break;
            case 2:
                this.mf = da.qg;
                break;
            case 3:
                this.mf = da.$t
            }
            this.Sl = !1
        }
    }
    function u() {
        this.ow = this.nw = this.ci = this.Me = this.Go = 0;
        this.vc = this.pw = null;
        this.eC = this.dC = 0
    }
    function ld() {
        this.Pg = this.zb = this.jj = 0;
        this.Og = this.Ho = this.di = null;
        this.Mq = 0
    }
    function da() {}
    function md() {
        this.Yh = 0
    }
    function Ma() {
        this.Yh = this.Eo = this.tm = this.Mg = this.Fo = this.fj = this.Zh = this.Sr = this.Tr = 0
    }
    function D() {
        this.Ng = 0;
        this.kw = null;
        this.Dc = this.gj = 0;
        this.Yc = this.kb = this.ej = this.hj = this.$h = this.nf = null;
        this.aC = this.bC = this.ZB = 0;
        this.Do = this.um = null
    }
    function nd() {
        this.Md = this.cC = this.bi = this.ai = 0;
        this.lw = null
    }
    function od() {
        this.Cz = this.Dz = this.Bz = 0
    }
    function la() {
        this.om = this.Eo = this.tm = this.Mg = this.Fo = this.fj = this.Zh = this.Sr = this.Tr = this.ij = this.Vk = this.pf = this.mw = this.bi = this.ai = 0;
        this.frames = null
    }
    function pd() {
        this.bi = this.ai = this.Md = 0;
        this.text = null
    }
    function qa() {
        this.yx = this.qp = this.bn = 0;
        this.ui = null
    }
    function qd() {
        this.Yk = this.Cw = this.Bw = 0;
        this.Yb = null
    }
    function M() {
        this.Ac = this.bc = 0;
        this.c = null;
        this.sv = this.Ha = this.ac = this.Cg = this.ef = this.gr = 0;
        this.Wb = null;
        this.tv = 0;
        this.fr = this.JA = null;
        this.hr = this.gm = 0;
        this.S = this.fm = null;
        this.CJ = this.df = this.de = this.wv = this.X = this.sa = this.K = this.L = this.pa = this.oa = this.u = this.Bg = this.v = this.Ag = 0;
        this.ao = !1;
        this.F = this.J = this.ea = this.B = this.b = null
    }
    function rd() {
        this.rx = !1;
        this.Dg = null;
        this.za = !1;
        this.Ea = null;
        this.ne = !0;
        this.qc = this.pc = 1;
        this.y = this.x = this.angle = 0;
        this.yl = null
    }
    function R() {
        this.Md = this.Na = 0;
        this.C = null;
        this.Aw = this.zw = 0;
        this.hC = this.level = -1;
        this.io = null;
        this.ne = !0
    }
    function sd() {
        this.ve = this.Ec = this.mi = 0;
        this.Ta = -1;
        this.Hb = this.Gb = 1;
        this.hb = this.li = this.ca = this.Ya = this.gb = 0;
        this.Sa = this.N = !1;
        this.tj = this.sj = 0;
        this.ps = -1;
        this.Yw = this.Ww = this.Xw = this.Vw = this.Uw = this.os = 0
    }
    function ga() {
        this.kd = this.jd = this.Rc = this.qb = this.wa = this.type = 0;
        this.az = this.za = !1;
        this.Fd = this.Zf = this.ah = this.ep = this.Jc = 0;
        this.Ni = !1;
        this.Ea = this.qa = null;
        this.Jd = 0;
        this.font = null;
        this.Yd = this.Qa = !1
    }
    function td() {
        this.type = this.Jc = this.Kc = this.kd = this.jd = this.wa = this.tl = 0;
        this.za = !0;
        this.Zf = 0;
        this.qa = null;
        this.Fd = 0;
        this.Ea = null;
        this.Jd = 0;
        this.alpha = 1;
        this.pk = "source-over";
        this.Yd = !1
    }
    function ud() {
        this.type = this.Jc = this.Kc = this.kd = this.jd = this.wa = this.tl = 0;
        this.za = !0;
        this.Zf = 0;
        this.qa = null;
        this.Fd = 0;
        this.Ea = null;
        this.Jd = 0;
        this.alpha = 1;
        this.pk = "source-over";
        this.Yd = !1
    }
    function vd() {
        this.Xm = null;
        this.fp = this.Kc = this.qb = this.Rc = 0;
        this.font = null;
        this.za = !0;
        this.VC = this.Na = 0;
        this.qa = this.Ea = null;
        this.Qa = !1;
        this.rect = new ba;
        this.kd = this.jd = this.deltaY = 0;
        this.mb = null;
        this.Yd = !1
    }
    function wd() {
        this.kd = this.jd = 0;
        this.Od = null;
        this.qk = 0;
        this.fh = []
    }
    function xd(a, b) {
        this.ext = b.h.Rq.vr(a);
        this.hw = !1;
        this.jw = this.Co = this.Kw = 0;
        this.Qa = !1;
        this.za = !0;
        this.qa = this.Ea = null
    }
    function Wa() {}
    function yd() {
        this.io = this.dir = this.y = this.x = 0;
        this.tu = !1
    }
    function zd(a) {
        a.file.o();
        this.at = a.file.o()
    }
    function Me(a) {
        this.Ad = a.file.s();
        this.xr = a.file.s();
        this.Hh = a.file.o()
    }
    function Ne(a) {
        this.color = a.file.hd()
    }
    function Oe(a) {
        this.Xl = a.file.s();
        this.$H = a.file.s()
    }
    function ra(a) {
        this.Hh = a.file.o();
        for (var b = a.file.T, c = 0, d; ; ) {
            c++;
            d = a.file.s();
            if (0 == d)
                break;
            d = a.file.o();
            6 < d && a.file.xa(d - 6)
        }
        a.file.seek(b);
        this.ia = Array(c);
        for (b = 0; b < c; b++)
            this.ia[b] = ca.create(a.file)
    }
    function Pe(a) {
        var b = a.file.o();
        a.file.xa(4);
        this.data = 0;
        6 < b && (this.data = a.file.T,
        a.file.xa(b - 6))
    }
    function oa(a) {
        this.zg = a.file.o();
        this.vJ = a.file.o()
    }
    function Qe(a) {
        a.file.xa(4);
        this.T = 0;
        this.id = a.file.o()
    }
    function Ga(a) {
        this.value = a.file.s();
        this.at = 0
    }
    function Ad(a) {
        this.key = a.file.o()
    }
    function Re(a) {
        this.ub = a.file.V();
        this.bg = a.file.V();
        this.type = a.file.V()
    }
    function Se(a) {
        a.file.xa(4);
        this.aA = 0;
        for (this.zb = []; ; ) {
            var b = a.file.V()
              , c = a.file.V();
            if (-1 == b)
                break;
            this.zb.push(b);
            this.zb.push(c)
        }
    }
    function pa() {}
    function Bd(a) {
        this.Jo = a.file.V();
        this.bl = a.file.V();
        this.as = a.file.V();
        this.bs = a.file.V();
        this.Zr = a.file.V();
        this.Gw = a.file.V();
        this.Yr = a.file.s();
        this.$r = a.file.V();
        this.Ko = a.file.V();
        this.Hw = a.file.V()
    }
    function lb(a) {
        this.Jo = a.file.V();
        this.bl = a.file.V();
        this.as = a.file.V();
        this.bs = a.file.V();
        this.Zr = a.file.V();
        this.Gw = a.file.V();
        this.Yr = a.file.s();
        this.$r = a.file.V();
        this.Ko = a.file.V();
        this.Hw = a.file.V();
        this.Bq = a.file.o();
        this.jz = a.file.o()
    }
    function Cd(a) {
        this.Jo = a.file.V();
        this.bl = a.file.V();
        this.as = a.file.V();
        this.bs = a.file.V();
        this.Zr = a.file.V();
        this.Gw = a.file.V();
        this.Yr = a.file.s();
        this.$r = a.file.V();
        this.Ko = a.file.V();
        this.Hw = a.file.V();
        this.Bq = a.file.V();
        this.jz = a.file.V();
        a.file.xa(4);
        a.file.o()
    }
    function Qa(a) {
        this.kp = a.file.o();
        this.rD = a.file.o()
    }
    function ia(a) {
        this.value = a.file.o()
    }
    function Xa(a) {
        this.xb = a.file.Nb()
    }
    function Te(a) {
        this.Ad = a.file.s();
        this.xr = a.file.s()
    }
    function Dd(a) {
        a.file.V();
        a.file.V();
        a.file.V();
        a.file.V()
    }
    function Ue(a, b, c) {
        this.index = a.file.s();
        this.kC = a.file.s();
        this.global = b;
        c ? this.Bx = a.file.DC() : (this.Bx = a.file.s(),
        a.file.xa(4))
    }
    function Ed(a) {
        this.Na = a.file.s();
        this.Wq = a.file.s();
        this.kA = a.file.s();
        this.values = [];
        for (var b = 1, c = 2, d = 4, e = 0; 4 > e && 0 != (this.Na & b); e++) {
            var f = new Ue(a,0 != (this.Na & c),0 != (this.Na & d))
              , b = b << 4
              , c = c << 4
              , d = d << 4;
            this.values.push(f)
        }
    }
    function Ya() {
        this.lk = []
    }
    function Ha(a) {
        this.vp = this.tp = 1;
        this.xw = -1;
        this.yw = this.rx = !1;
        this.wk = this.uk = 0;
        if (!(this.Oa = a.getContext("2d")))
            throw Error("Failed to init standard renderer");
    }
    function ta() {
        this.Ln = "";
        this.Jz = this.op = this.pp = this.FD = this.GD = 0
    }
    function Fd() {}
    function w() {
        this.j = this.no = this.mo = this.Br = 0;
        this.ya = this.bB = !1;
        this.Ih = this.Nz = this.m = this.Z = null
    }
    function Gd(a) {
        this.app = a
    }
    function Ra() {}
    function Hd() {
        this.cB = this.f = this.g = this.eb = 0
    }
    function Id() {
        this.f = this.g = this.eb = 0
    }
    function Jd() {
        this.yb = this.Cc = this.zu = this.Mf = 0;
        this.wK = null
    }
    function Kd() {
        this.f = this.g = this.Pq = this.Va = 0
    }
    function Ld() {
        this.yb = this.Cc = this.cj = 0
    }
    function Md() {}
    function Nd() {
        this.f = this.g = this.Nn = this.eb = this.Va = 0
    }
    function Od() {
        this.Uv;
        this.Ok = this.Qk = this.Gg = this.Ke = this.I = 0;
        this.qe = null
    }
    function Pd() {
        this.f = this.g = this.eb = 0
    }
    function Qd() {
        this.Tv = this.f = this.g = this.eb = 0
    }
    function Rd() {
        this.cj;
        this.Cc;
        this.yb
    }
    function Sd() {
        this.f = this.g = this.Xz = this.Va = this.eb = 0
    }
    function Td() {
        this.f = this.g = this.eb = 0
    }
    function Ud() {
        this.nc = this.f = this.g = this.eb = 0
    }
    function Vd() {
        this.Nk = this.Mk = this.f = this.g = this.eb = 0
    }
    function Wd() {
        this.km = this.f = this.g = this.Wz = this.Mn = this.Va = 0
    }
    function Xd() {
        this.Ar = this.f = this.g = this.Mn = this.Va = 0
    }
    function Yd() {
        this.zr = this.Er = this.Fr = this.Cr = this.ud = this.Sv = this.ga = this.fa = this.Ok = this.Qk = this.Gg = this.Ke = this.I = this.MD = this.gt = this.Dx = 0
    }
    function Zd() {
        this.Wf = this.Pk = this.f = this.g = this.Va = this.eb = 0
    }
    function $d() {}
    function ae() {
        this.f = this.g = this.Va = 0
    }
    function be(a, b) {
        var c = new I;
        ka.Ub = new n(a,c,b);
        c.getFile(b, ce)
    }
    function ce() {
        ka.Ub.load()
    }
    function Za() {
        ka.Ub.lp()
    }
    function Fa() {
        this.y = this.x = 0;
        this.visible = !0;
        this.children = [];
        this.rg = !1
    }
    function sa() {}
    function K() {
        this.P = null;
        this.lineWidth = this.Fa = this.Ja = this.width = this.height = this.lineWidth = 0
    }
    function Ve() {
        this.P = null;
        this.angle = 0;
        this.qc = this.pc = 1;
        this.wx = 0
    }
    function A() {
        this.a = null;
        this.Y = this.Rb = this.Qb = this.Ls = this.Wm = this.Is = this.Hs = 0;
        this.bh = null
    }
    function de() {
        this.qm = 0;
        this.$a = null
    }
    function ee() {
        this.rm = 0;
        this.values = null;
        this.Na = 0
    }
    function Na() {
        this.Sd = 0;
        this.Rd = this.Pa = null
    }
    function Sa(a) {
        this.app = a;
        this.Ak = null;
        this.Qr = 0
    }
    function mb() {
        this.handle = 0
    }
    function Ca() {
        this.O = this.R = null
    }
    function fe() {}
    function ge() {}
    function he() {}
    function V() {
        this.so = 100;
        this.Mr = this.SB = this.TB = this.Tk = 0
    }
    function ie() {
        this.xo = 0;
        this.fd = null
    }
    function je() {
        this.kB = this.lB = this.iB = this.jB = this.oo = 0
    }
    function ke() {
        this.rB = this.qB = this.pB = this.sB = 0
    }
    function le() {
        this.wB = this.uB = this.vB = this.tB = 0
    }
    function me() {
        this.RB = this.PB = this.fw = this.MB = this.NB = this.nm = 0;
        this.bb = null
    }
    function ne() {
        this.aw = this.nB = this.bw = this.Xv = this.$v = this.Zv = this.Yv = this.oB = 0;
        this.se = null
    }
    function oe() {
        this.EB = this.DB = this.FB = this.CB = this.BB = this.GB = 0
    }
    function pe() {
        this.IB = this.HB = this.JB = this.ew = this.dw = this.KB = 0
    }
    function qe() {}
    function re() {
        this.Kg = null;
        this.data = 0;
        this.nr = !1
    }
    function N() {
        this.a = null;
        this.Bj = this.ye = this.$g = this.Pb = this.gg = this.ap = this.$o = 0
    }
    function ua() {
        this.Kt = this.Tp = this.Fl = this.qy = this.El = this.Up = this.Sp = 0;
        this.Di = !1
    }
    function se() {
        this.Vp = !1;
        this.Gl = null
    }
    function te() {}
    function ue() {
        this.Mt = this.pg = this.Nt = this.sh = 0
    }
    function ve() {
        this.Wp = this.Xp = this.Rt = this.Qt = this.Pt = this.Ot = 0
    }
    function we() {
        this.le = this.Zj = this.Yj = this.yh = this.xh = this.aq = this.qn = this.rn = this.Mc = 0;
        this.nd = !1;
        this.La = null;
        this.wh = this.cq = this.bq = this.vh = 0;
        this.Kl = null;
        this.$p = !1
    }
    function T() {
        this.Il = this.uy = this.Ei = this.Gf = this.Ff = this.Cd = this.ty = this.St = this.Ud = this.nb = 0;
        this.Wj = null;
        this.Ut = this.Tt = 0;
        this.Vj = !1
    }
    function $a() {
        this.vy = this.Vt = this.wy = this.Wt = this.Xj = this.Jl = this.Xt = this.Dd = this.uh = 0
    }
    function ab() {}
    function Ia() {
        this.cp = 0;
        this.ta = null;
        this.mx = 0;
        this.U = !1;
        this.Cj = 0;
        this.Aj = !1;
        this.bp = 0
    }
    function Oa() {
        this.Oc = null;
        this.MA = 0;
        this.im = this.Ge = this.Bc = null;
        this.oe = 0
    }
    function F() {
        this.ka = null;
        this.fl = 0
    }
    var ka = this
      , p = {
        extend: function(a, b) {
            var c = Object.create(a.prototype || a);
            if (void 0 !== b && (b = b.prototype || b))
                for (var d in b)
                    b.hasOwnProperty(d) && (c[d] = b[d]);
            return c
        },
        Lp: function(a) {
            return a >> 16
        },
        pG: function(a) {
            return a & 65535
        },
        rG: function(a, b) {
            return b << 16 | a & 65535
        },
        BR: function(a) {
            return a >>> 16 & 255
        },
        uR: function(a) {
            return a >>> 8 & 255
        },
        oR: function(a) {
            return a & 255
        },
        QP: function(a, b, c) {
            return (a & 255) << 16 | (b & 255) << 8 | c & 255
        },
        oS: function(a) {
            return (a & 255) << 16 | (a >>> 8 & 255) << 8 | a >>> 16 & 255
        },
        TH: function(a, b, c) {
            return Math.min(Math.max(a, b), c)
        },
        af: function(a) {
            var b = (a >>> 16 & 255).toString(16)
              , c = (a >>> 8 & 255).toString(16);
            for (a = (a & 255).toString(16); 2 > b.length; )
                b = "0" + b;
            for (; 2 > c.length; )
                c = "0" + c;
            for (; 2 > a.length; )
                a = "0" + a;
            return "#" + b + c + a
        },
        sd: function(a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        },
        IQ: function(a) {
            return Math.round(a)
        },
        Cv: function(a) {
            return Math.ceil(a) == a
        },
        Kq: function(a, b, c, d, e) {
            ox = d / 2 * .5522848;
            oy = e / 2 * .5522848;
            xe = b + d;
            ye = c + e;
            xm = b + d / 2;
            ym = c + e / 2;
            a.beginPath();
            a.moveTo(b, ym);
            a.bezierCurveTo(b, ym - oy, xm - ox, c, xm, c);
            a.bezierCurveTo(xm + ox, c, xe, ym - oy, xe, ym);
            a.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            a.bezierCurveTo(xm - ox, ye, b, ym + oy, b, ym);
            a.closePath()
        },
        dR: function(a, b) {
            a.beginPath();
            a.moveTo(b.left, b.top);
            a.lineTo(b.right, b.top);
            a.lineTo(b.right, b.bottom);
            a.lineTo(b.left, b.bottom);
            a.lineTo(b.left, b.top);
            a.closePath();
            a.stroke()
        },
        cR: function(a, b, c, d, e) {
            a.beginPath();
            a.moveTo(b, c);
            a.lineTo(d, e);
            a.closePath();
            a.stroke()
        },
        Sn: function(a, b) {
            for (var c = a.toString(); 4 > c.length; )
                c = "0" + c;
            return c + ("." + b)
        },
        xc: function(a, b) {
            if (a == b)
                return !0;
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a == b
        },
        mC: function(a) {
            var b = a.lastIndexOf("\\");
            0 < b && (a = a.substring(b + 1));
            return a
        },
        sG: 40,
        mH: [0, 1, 2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20, 21, 23, 24, 25, 27, 28, 29, 31, 32, 33, 35, 36, 37, 39, 40, 41, 43, 44, 45, 47, 48, 49, 51, 52],
        GR: function(a) {
            return a < p.sG ? p.mH[a] : Math.round(96 * a / 72)
        },
        Dp: 0,
        Ep: 0,
        Rj: 1,
        pt: 2,
        Cp: 8,
        zi: 4,
        YE: 32,
        ot: 1024,
        ZE: 2048,
        Vz: function(a, b, c, d, e, f) {
            if (0 == b.length)
                return 0 != (c & 1024) && (d.right = d.left,
                d.bottom = d.top),
                0;
            e.Zi || (a.font = e.yg());
            var g = 0
              , h = String.fromCharCode(10)
              , q = String.fromCharCode(13)
              , ea = b.indexOf(h);
            if (0 <= ea) {
                var C = new ba;
                C.yz(d);
                var l, n = 0, m = 0, k;
                do
                    l = -1,
                    n < b.length && (l = b.indexOf(q, n)),
                    k = Math.max(ea, l),
                    l == ea - 1 && ea--,
                    ea = b.substring(n, ea),
                    l = p.Yl(a, ea, c, C, f, e),
                    m = Math.max(m, C.right - C.left),
                    g += l,
                    C.top += l,
                    C.bottom = d.bottom,
                    C.right = d.right,
                    n = k + 1,
                    ea = -1,
                    n < b.length ? ea = b.indexOf(h, n) : (l = p.Yl(a, "", c, C, f, e),
                    m = Math.max(m, C.right - C.left),
                    g += l,
                    C.top += l,
                    C.bottom = d.bottom,
                    C.right = d.right);
                while (0 <= ea);
                n < b.length && (ea = b.substring(n),
                l = p.Yl(a, ea, c, C, f, e),
                m = Math.max(m, C.right - C.left),
                g += l);
                0 != (c & p.ot) && (d.right = d.left + m,
                d.bottom = C.bottom);
                return g
            }
            return g = p.Yl(a, b, c | p.ZE, d, f, e)
        },
        dt: null,
        Yl: function(a, b, c, d, e, f) {
            0 == b.length && (b = " ");
            var g, h;
            g = f.bf();
            h = f.Zi ? f.measureText(" ") : a.measureText(" ").width;
            var q = d.right - d.left, ea = 0, C = 0, l, n, m, k = 0, u = 0, t;
            null == p.dt && (p.dt = Array(100));
            var w, v, E = !1, B = !1, D = d.top;
            n = g;
            0 != (n & 1) && n++;
            var r = D;
            do {
                n = ea;
                m = t = 0;
                u += g;
                do {
                    p.dt[t] = m;
                    t += 1;
                    l = C;
                    C = -1;
                    n < b.length && (C = b.indexOf(" ", n));
                    -1 == C && (C = b.length);
                    if (C < n) {
                        m -= h;
                        break
                    }
                    v = b.substring(n, C);
                    w = f.Zi ? f.measureText(v) : a.measureText(v).width;
                    if (m + w > q) {
                        t--;
                        if (0 < t) {
                            m -= h;
                            C = l;
                            break
                        }
                        for (l = n; l < C; l++) {
                            w = f.Zi ? f.measureText(b.substring(l, l + 1)) : a.measureText(b.substring(l, l + 1)).width;
                            if (m + w >= q) {
                                l--;
                                if (0 < l) {
                                    k = Math.max(m, k);
                                    0 == (c & p.ot) && (m = 0 != (c & p.Rj) ? d.left + (d.right - d.left) / 2 - m / 2 : 0 != (c & p.pt) ? d.right - m : d.left,
                                    v = b.substring(n, l),
                                    e.push(new P(m,D,v)));
                                    C = l - 1;
                                    B = E = !0;
                                    break
                                }
                                C = l < b.length ? b.indexOf(" ", l) : -1;
                                E = !0;
                                0 <= C && (B = !0);
                                break
                            }
                            m += w
                        }
                    }
                    if (E)
                        break;
                    m += w;
                    if (m + h > q)
                        break;
                    m += h;
                    n = C + 1
                } while (1);
                if (0 == B) {
                    if (E)
                        break;
                    k = Math.max(m, k);
                    if (0 == (c & p.ot))
                        for (m = 0 != (c & p.Rj) ? d.left + (d.right - d.left) / 2 - m / 2 : 0 != (c & p.pt) ? d.right - m : d.left,
                        n = ea,
                        ea = 0; ea < t; ea++) {
                            C = -1;
                            n < b.length && (C = b.indexOf(" ", n));
                            -1 == C && (C = b.length);
                            if (C < n)
                                break;
                            v = b.substring(n, C);
                            e.push(new P(m + p.dt[ea],D,v));
                            n = C + 1
                        }
                }
                B = E = !1;
                D += g;
                ea = C + 1
            } while (ea < b.length);
            d.right = d.left + k;
            d.bottom = r + u;
            return u
        },
        Jh: function(a, b, c, d, e, f) {
            var g;
            if (e.Zi)
                for (f = 0; f < d.length; f++)
                    g = d[f],
                    e.fillText(a, g.text, b + g.x, c + g.y);
            else
                for (a.font = e.yg(),
                a.fillStyle = p.af(f),
                a.textAlign = "left",
                a.textBaseline = "top",
                f = 0; f < d.length; f++)
                    g = d[f],
                    a.fillText(g.text, b + g.x, c + g.y)
        },
        Yi: function(a, b) {
            var c = a.toString();
            if (0 != (b & ga.Vx)) {
                var d = b & ga.Vx;
                if (c.length > d)
                    c = c.substring(c.length - d);
                else
                    for (; c.length < d; )
                        c = "0" + c
            }
            return c
        },
        Wu: function(a, b) {
            var c;
            if (0 == (b & ga.PE))
                c = a.toString();
            else {
                var d = Math.floor(((b & ga.NE) >> ga.OE) + 1);
                c = -1;
                0 != (b & ga.RE) ? c = (b & ga.LE) >> ga.ME : 0 != a && -1 < a && 1 > a && (c = d);
                c = 0 > c ? a.toPrecision(d) : a.toFixed(c);
                var e, f, g;
                if (0 != (b & ga.QE))
                    for (f = e = 0; f < c.length; f++)
                        g = c.charAt(f),
                        "." != g && "+" != g && "-" != g && "e" != g && "E" != g && e++;
                f = !1;
                "-" == c.charAt(0) && (f = !0,
                c = c.substr(1));
                for (; e < d; )
                    c = "0" + c,
                    e++;
                f && (c = "-" + c)
            }
            return c
        },
        nS: function(a, b) {
            for (var c = a, d = b, e = d.indexOf("\\"); 0 <= e; )
                c.substring(0, e) == d.substring(0, e) && (d = d.substring(e + 1),
                c = c.substring(e + 1)),
                e = d.indexOf("\\", e + 1);
            return c
        }
    }
      , ze = !1
      , bb = !1
      , nb = !1
      , ob = window.XMLHttpRequest ? new XMLHttpRequest : null;
    if (ob && ob.overrideMimeType)
        try {
            bb = "string" === typeof (new XMLHttpRequest).responseType,
            0 <= navigator.userAgent.toLowerCase().indexOf("safari") && (bb = !1)
        } catch (a) {}
    else {
        var ze = !0
          , pb = document.createElement("script");
        pb.type = "text/vbscript";
        pb.innerHTML = 'Function BinFileReaderImpl_IE_VBAjaxLoader(fileName)\n\r\n\t                Dim xhr\n\r\n\t                Set xhr = CreateObject("Microsoft.XMLHTTP")\n\r\n\t                xhr.Open "GET", fileName, False\n\r\n\t                xhr.setRequestHeader "Accept-Charset", "x-user-defined"\n\r\n\t                xhr.send\n\r\n\t                Dim byteArray()\n\r\n\t                if xhr.Status = 200 Then\n\r\n\t                    Dim byteString\n\r\n\t                    Dim i\n\r\n\t                    byteString=xhr.responseBody\n\r\n\t                    ReDim byteArray(LenB(byteString))\n\r\n\t                    For i = 1 To LenB(byteString)\n\r\n\t                        byteArray(i-1) = AscB(MidB(byteString, i, 1))\n\r\n\t                    Next\n\r\n\t                End If\n\r\n\t                BinFileReaderImpl_IE_VBAjaxLoader=byteArray\n\r\n\t            End Function';
        document.head.appendChild(pb)
    }
    if (bb) {
        var Ae = new FileReader;
        try {
            Ae.readAsBinaryString && (nb = !0)
        } catch (a) {}
        Ae = null
    }
    ob = null;
    I.prototype = {
        ua: function() {
            return this.qd.charCodeAt(this.T++) & 255
        },
        getFile: function(a, b, c) {
            this.Du = b;
            if (ze)
                try {
                    var d = BinFileReaderImpl_IE_VBAjaxLoader(a).toArray(), e, f = d.length;
                    f > c && (f = c);
                    for (e = 0; e < f; e++)
                        this.qd += String.fromCharCode(d[e]);
                    this.end = this.qd.length;
                    this.Du()
                } catch (q) {}
            else {
                var g = new XMLHttpRequest;
                g.open("GET", a, !0);
                var h = this;
                bb ? (g.responseType = "blob",
                g.onload = function() {
                    if (4 == g.readyState && 200 == g.status) {
                        var a = new FileReader;
                        a.onloadend = function() {
                            if (nb)
                                h.qd += a.result;
                            else {
                                var b = new Uint8Array(a.result), c;
                                for (c = 0; c < b.length; c++)
                                    h.qd += String.fromCharCode(b[c])
                            }
                            h.end = h.qd.length;
                            h.Du()
                        }
                        ;
                        nb ? a.readAsBinaryString(g.response) : a.readAsArrayBuffer(g.response)
                    }
                }
                ) : (g.overrideMimeType("text/plain; charset=x-user-defined"),
                g.onload = function() {
                    4 == g.readyState && 200 == g.status && (h.qd += g.responseText,
                    h.end = h.qd.length,
                    h.Du())
                }
                );
                g.send(null)
            }
        },
        LL: function(a) {
            this.qd = a;
            this.end = a.length;
            var b = this;
            this.ua = function() {
                return b.qd.charCodeAt(b.T++) & 255
            }
        },
        ug: function(a, b) {
            var c = new I;
            c.qd = this.qd;
            c.offset = a;
            c.T = a;
            c.end = a + b;
            c.pd = this.pd;
            return c
        },
        gD: function(a) {
            this.pd = a
        },
        wI: function() {
            var a = this.ua()
              , b = this.ua()
              , c = this.ua();
            255 == a && 254 == b ? (this.pd = !0,
            this.T--) : 239 == a && 187 == b && 191 == c ? this.pd = !1 : (this.pd = !1,
            this.T -= 3)
        },
        xa: function(a) {
            this.T += a
        },
        Qh: function() {
            return this.T >= this.end
        },
        vb: function() {
            return this.ua()
        },
        o: function() {
            var a;
            a = this.ua();
            return 256 * this.ua() + a
        },
        V: function() {
            var a;
            a = this.ua();
            a = 256 * this.ua() + a;
            return 32768 > a ? a : a - 65536
        },
        Em: function() {
            var a;
            a = this.ua();
            return 256 * this.ua() + a
        },
        s: function() {
            var a, b, c;
            a = this.ua();
            b = this.ua();
            c = this.ua();
            a = 16777216 * this.ua() + 65536 * c + 256 * b + a;
            return 2147483647 >= a ? a : a - 4294967296
        },
        hd: function() {
            var a, b, c;
            a = this.ua();
            b = this.ua();
            c = this.ua();
            this.ua();
            return 65536 * a + 256 * b + c
        },
        EC: function() {
            var a, b, c;
            a = this.ua();
            b = this.ua();
            c = this.ua();
            a = 16777216 * this.ua() + 65536 * c + 256 * b + a;
            2147483648 < a && (a -= 4294967296);
            return a / 65536
        },
        DC: function() {
            var a, b, c, d, e, f, g;
            a = this.ua();
            b = this.ua();
            c = this.ua();
            d = this.ua();
            e = this.ua();
            f = this.ua();
            g = this.ua();
            a = 72057594037927936 * this.ua() + 281474976710656 * g + 1099511627776 * f + 4294967296 * e + 16777216 * d + 65536 * c + 256 * b + a;
            0x7fffffffffffffff < a && (a -= 1.8446744073709552E19);
            return a / 4294967296
        },
        Nb: function(a) {
            var b = "";
            if (this.pd)
                if (1 > arguments.length) {
                    if (this.Qh())
                        return b;
                    c = this.T;
                    for (b = this.Em(); b && !this.Qh(); )
                        b = this.Em();
                    b = (this.T - c - 2) / 2;
                    this.T = c;
                    b = this.Nb(b);
                    this.ua();
                    this.ua()
                } else {
                    b = "";
                    c = this.T;
                    for (e = 0; e < a; e++) {
                        d = this.Em();
                        if (0 == d)
                            break;
                        b += String.fromCharCode(d)
                    }
                    this.T = c + 2 * a
                }
            else if (1 > arguments.length) {
                if (this.Qh())
                    return b;
                for (var c = this.T, b = this.ua(); b && !this.Qh(); )
                    b = this.ua();
                b = this.T - c - 1;
                this.T = c;
                b = this.Nb(b);
                this.ua()
            } else {
                for (var d, c = this.T, e = 0; e < a; ++e) {
                    d = this.ua();
                    if (0 == d)
                        break;
                    b += String.fromCharCode(d)
                }
                this.T = c + a
            }
            return b
        },
        hL: function() {
            var a = this.T, b, c = "", d, e;
            if (0 == this.pd) {
                if (this.Qh())
                    return;
                for (b = this.ua(); 10 != b && 13 != b && !this.Qh(); )
                    b = this.ua();
                d = this.T;
                this.T = a;
                e = 1;
                10 != b && 13 != b && (e = 0);
                d > a + e && (c = this.Nb(d - a - e));
                if (10 == b || 13 == b)
                    this.ua(),
                    a = this.vb(),
                    10 == b && 13 != a && this.T--,
                    13 == b && 10 != a && this.T--
            } else {
                if (this.Qh())
                    return;
                for (b = this.Em(); 10 != b && 13 != b && !this.Qh(); )
                    b = this.Em();
                d = this.T;
                this.T = a;
                e = 2;
                10 != b && 13 != b && (e = 0);
                d > a + e && (c = this.Nb((d - a - e) / 2));
                if (10 == b || 13 == b)
                    this.T += 2,
                    a = this.Em(),
                    10 == b && 13 != a && (this.T -= 2),
                    13 == b && 10 != a && (this.T -= 2)
            }
            return c
        },
        seek: function(a) {
            a >= this.end && (a = this.end);
            this.T = a
        },
        WL: function(a) {
            var b = this.T
              , b = b - a;
            0 > b && (b = 0);
            this.T = b
        },
        lL: function(a) {
            var b, c = a.length;
            for (b = 0; b < c; b++)
                a[b] = this.ua()
        },
        FC: function(a) {
            var b = [], c;
            for (c = 0; c < a; c++)
                b[c] = this.ua();
            return b
        }
    };
    O.prototype = {
        add: function(a) {
            this.Ed.push(a)
        },
        JJ: function(a, b) {
            this.Ed.splice(a, 0, b)
        },
        get: function(a) {
            return a < this.Ed.length ? this.Ed[a] : null
        },
        put: function(a, b) {
            this.Ed[a] = b
        },
        set: function(a, b) {
            a < this.Ed.length && (this.Ed[a] = b)
        },
        So: function(a) {
            a < this.Ed.length && this.Ed.splice(a, 1)
        },
        indexOf: function(a) {
            return this.Ed.indexOf(a)
        },
        contains: function(a) {
            return 0 <= this.Ed.indexOf(a)
        },
        HC: function(a) {
            a = this.Ed.indexOf(a);
            0 <= a && this.Ed.splice(a, 1)
        },
        size: function() {
            return this.Ed.length
        },
        clear: function() {
            this.Ed.length = 0
        },
        sort: function(a) {
            Array.prototype.sort.call(this.Ed, a)
        }
    };
    ba.prototype = {
        load: function(a) {
            this.left = a.s();
            this.top = a.s();
            this.right = a.s();
            this.bottom = a.s()
        },
        yz: function(a) {
            this.left = a.left;
            this.right = a.right;
            this.top = a.top;
            this.bottom = a.bottom
        }
    };
    eb.prototype = {
        yg: function() {
            var a;
            a = this.Ie ? "italic " : "normal ";
            var b = 100 * Math.floor(this.Je / 100)
              , b = Math.max(b, 100)
              , b = Math.min(b, 900);
            a = a + (b + " ") + (this.lc + "px ");
            return a += this.He
        },
        bf: function() {
            return this.lc + Math.ceil(this.lc / 8)
        },
        $: function() {
            this.He = "Arial";
            this.lc = 13;
            this.Je = 400;
            this.Ie = 0
        }
    };
    ma.separator = "{@24}";
    ma.jy = 1;
    ma.XF = 2;
    ma.prototype = {
        gp: function() {
            if (null != this.$a && null != this.rk) {
                var a = "", b;
                for (b = 0; b < this.$a.size(); b++)
                    a += this.$a.get(b) + ma.separator;
                localStorage.setItem(this.rk, a)
            }
        },
        ur: function(a) {
            var b = !0;
            null != this.rk && p.xc(a, this.rk) && (b = !1);
            if (b)
                if (this.gp(),
                this.rk = a,
                this.$a = new O,
                a = localStorage.getItem(this.rk))
                    for (var b = 0, c = a.indexOf(ma.separator, 0); 0 <= c; )
                        this.$a.add(a.substring(b, c)),
                        b = c + ma.separator.length,
                        c = a.indexOf(ma.separator, b);
                else if (a = null,
                null == a && (b = this.app.hJ(this.rk),
                null != b && (a = b.open())),
                a)
                    for (b = !1,
                    a.wI(),
                    "undefined" != typeof this.Na && (this.Na & ma.jy && (this.pd = !1,
                    b = !0),
                    this.Na & ma.XF && (this.pd = !0)); 0 == a.Qh(); ) {
                        c = a.hL();
                        b && (c = this.rI(c));
                        if ("<" == c.substring(0, 1)) {
                            this.$a.clear();
                            break
                        }
                        if (null == c)
                            break;
                        this.$a.add(c)
                    }
        },
        rI: function(a) {
            for (var b = "", c = 0, d, e, f; c < a.length; )
                d = a.charCodeAt(c),
                128 > d ? (b += String.fromCharCode(d),
                c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1),
                b += String.fromCharCode((d & 31) << 6 | e & 63),
                c += 2) : (e = a.charCodeAt(c + 1),
                f = a.charCodeAt(c + 2),
                b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63),
                c += 3);
            return b
        },
        Uq: function(a) {
            var b, c;
            for (b = 0; b < this.$a.size(); b++)
                if (c = this.$a.get(b),
                "[" == c.charAt(0)) {
                    var d = c.lastIndexOf("]");
                    if (1 <= d && (c = c.substring(1, d),
                    p.xc(a, c)))
                        return b
                }
            return -1
        },
        dv: function(a, b) {
            for (var c, d; a < this.$a.size(); a++) {
                c = this.$a.get(a);
                if ("[" == c.charAt(0))
                    break;
                d = c.indexOf("=");
                if (0 <= d) {
                    for (var e = 0; e < d && 32 == c.charCodeAt(e); )
                        e++;
                    for (; d > e && 32 == c.charCodeAt(d - 1); )
                        d--;
                    if (d > e && (c = c.substring(0, d),
                    p.xc(c, b)))
                        return a
                }
            }
            return -1
        },
        Gk: function(a, b, c, d) {
            this.ur(d);
            a = this.Uq(a);
            return 0 <= a && (a = this.dv(a + 1, b),
            0 <= a) ? (b = this.$a.get(a),
            b.substring(b.indexOf("=") + 1)) : c
        },
        zl: function(a, b, c, d) {
            this.ur(d);
            d = this.Uq(a);
            if (0 > d)
                this.$a.add("[" + a + "]"),
                this.$a.add(b + "=" + c);
            else if (a = this.dv(d + 1, b),
            0 <= a)
                this.$a.set(a, b + "=" + c);
            else {
                for (a = d + 1; a < this.$a.size(); a++)
                    if (d = this.$a.get(a),
                    "[" == d.charAt(0)) {
                        d = b + "=" + c;
                        this.$a.JJ(a, d);
                        return
                    }
                this.$a.add(b + "=" + c)
            }
        },
        Kz: function(a, b, c) {
            this.ur(c);
            a = this.Uq(a);
            0 <= a && (b = this.dv(a + 1, b),
            0 <= b && this.$a.So(b),
            this.gp())
        },
        uI: function(a, b) {
            this.ur(b);
            var c = this.Uq(a);
            if (0 <= c) {
                for (this.$a.So(c); !(c >= this.$a.size()) && "[" != this.$a.get(c).charAt(0); )
                    this.$a.So(c);
                this.gp()
            }
        }
    };
    na.prototype = {
        measureText: function(a, b) {
            b = this.app.kv(b);
            if (b.Zi)
                return b.measureText(a);
            this.Xd.font = b.yg();
            return this.Xd.measureText(a).width
        },
        Rs: function(a, b, c, d, e) {
            if (a == this.eK && b == this.aK && c == this.dK && d == this.bK && e == this.$J)
                return this.cK;
            var f = this.Xd;
            f.clearRect(0, 0, this.width, this.height);
            c || (c = new ba(0,0,this.width,this.height));
            var g = [];
            d = this.app.kv(d);
            var h = p.Vz(f, a, b, c, d, g);
            if (0 != h) {
                var q = 0;
                0 != (b & p.Cp) ? q = this.height - h : 0 != (b & p.zi) && (q = this.height / 2 - h / 2);
                p.Jh(f, 0, q, g, d, e, 0, 0)
            }
            this.eK = a;
            this.aK = b;
            this.dK = c;
            this.bK = d;
            this.$J = e;
            return this.cK = h
        },
        gB: function(a) {
            a ? (this.Xd.fillStyle = p.af(a),
            this.Xd.fillRect(0, 0, this.width, this.height)) : this.Xd.clearRect(0, 0, this.width, this.height)
        },
        Ir: function(a, b, c, d, e, f, g) {
            var h = [];
            c || (c = new ba(0,0,this.width,this.height));
            e = this.app.kv(e);
            a = p.Vz(this.Xd, a, b, c, e, h);
            if (0 != a)
                switch (c = 0,
                0 != (b & p.Cp) ? c = this.height - a : 0 != (b & p.zi) && (c = this.height / 2 - a / 2),
                f) {
                case 1:
                    p.Jh(this.Xd, 1, c + 1, h, e, g, 0, 0);
                    p.Jh(this.Xd, 0, c, h, e, d, 0, 0);
                    break;
                case 2:
                    p.Jh(this.Xd, 1, c, h, e, g, 0, 0);
                    p.Jh(this.Xd, 1, c + 2, h, e, g, 0, 0);
                    p.Jh(this.Xd, 0, c + 1, h, e, g, 0, 0);
                    p.Jh(this.Xd, 2, c + 1, h, e, g, 0, 0);
                    p.Jh(this.Xd, 1, c + 1, h, e, d, 0, 0);
                    break;
                case 0:
                    p.Jh(this.Xd, 0, c, h, e, d, 0, 0)
                }
        },
        resize: function(a, b) {
            if (a != this.width || b != this.height)
                this.width = a,
                this.height = b,
                this.canvas.width = a,
                this.canvas.height = b
        },
        Ab: function(a, b, c, d, e) {
            a.uj(this.canvas, b, c, this.width, this.height, d, e)
        }
    };
    Ea.nI = [{
        xb: navigator.userAgent,
        bd: "Chrome",
        tc: "Chrome"
    }, {
        xb: navigator.userAgent,
        bd: "OmniWeb",
        dn: "OmniWeb/",
        tc: "OmniWeb"
    }, {
        xb: navigator.vendor,
        bd: "Apple",
        tc: "Safari",
        dn: "Version"
    }, {
        bL: window.opera,
        tc: "Opera",
        dn: "Version"
    }, {
        xb: navigator.vendor,
        bd: "iCab",
        tc: "iCab"
    }, {
        xb: navigator.vendor,
        bd: "KDE",
        tc: "Konqueror"
    }, {
        xb: navigator.userAgent,
        bd: "Firefox",
        tc: "Firefox"
    }, {
        xb: navigator.vendor,
        bd: "Camino",
        tc: "Camino"
    }, {
        xb: navigator.userAgent,
        bd: "Netscape",
        tc: "Netscape"
    }, {
        xb: navigator.userAgent,
        bd: "MSIE",
        tc: "Explorer",
        dn: "MSIE"
    }, {
        xb: navigator.userAgent,
        bd: "Gecko",
        tc: "Mozilla",
        dn: "rv"
    }, {
        xb: navigator.userAgent,
        bd: "Mozilla",
        tc: "Netscape",
        dn: "Mozilla"
    }];
    Ea.pI = [{
        xb: navigator.platform,
        bd: "Win",
        tc: "Windows"
    }, {
        xb: navigator.platform,
        bd: "Mac",
        tc: "MacOS"
    }, {
        xb: navigator.userAgent,
        bd: "iPhone",
        tc: "iOS"
    }, {
        xb: navigator.userAgent,
        bd: "iPod",
        tc: "iOS"
    }, {
        xb: navigator.userAgent,
        bd: "iPad",
        tc: "iOS"
    }, {
        xb: navigator.userAgent,
        bd: "Android",
        tc: "Android"
    }, {
        xb: navigator.platform,
        bd: "Windows Phone",
        tc: "Windows Phone"
    }, {
        xb: navigator.platform,
        bd: "Linux",
        tc: "Linux"
    }];
    Ea.prototype = {
        XC: function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b].xb
                  , d = a[b].bL;
                this.KD = a[b].dn || a[b].tc;
                if (c) {
                    if (-1 != c.indexOf(a[b].bd))
                        return a[b].tc
                } else if (d)
                    return a[b].tc
            }
        },
        YC: function(a) {
            var b = a.indexOf(this.KD);
            if (-1 != b)
                return parseFloat(a.substring(b + this.KD.length + 1))
        }
    };
    p.PR = function(a, b, c, d) {
        var e = document.createElement("canvas");
        e.width = b.width;
        e.height = b.height;
        var f = e.getContext("2d");
        0 == b.tb ? f.drawImage(b.sb, 0, 0) : f.drawImage(a.ba.Lb[b.tb], b.vd, b.wd, b.width, b.height, 0, 0, b.width, b.height);
        var g = f.getImageData(0, 0, b.width, b.height)
          , h = d >> 16 & 255
          , q = d >> 8 & 255;
        d &= 255;
        var l = c >> 16 & 255
          , C = c >> 8 & 255;
        c &= 255;
        var n, p, m;
        for (m = 0; m < b.height; m++)
            for (p = 0; p < b.width; p++)
                n = 4 * (m * b.width + p),
                g.data[n] == l && g.data[n + 1] == C && g.data[n + 2] == c && (g.data[n] = h,
                g.data[n + 1] = q,
                g.data[n + 2] = d);
        f.putImageData(g, 0, 0);
        f = new aa;
        f.app = a;
        f.width = b.width;
        f.height = b.height;
        f.Ja = b.Ja;
        f.Fa = b.Fa;
        f.lh = b.lh;
        f.mh = b.mh;
        f.Ua = 0;
        f.sb = e;
        f.hf = b.hf;
        f.Rk = b.Rk;
        f.Th = b.Th;
        return f
    }
    ;
    za.DF = 1;
    za.ZN = 2;
    za.CF = 4;
    za.BF = 8;
    za.prototype = {
        XH: function(a) {
            if (this.ZI != a.He || this.Jd != a.lc)
                return !1;
            var b = 0 != (this.lA & za.DF)
              , c = 0 != a.Ie;
            if (b != c)
                return !1;
            b = 0 != (this.lA & za.CF);
            c = 400 < a.Je;
            return b != c ? !1 : !0
        },
        bf: function() {
            return this.height + this.KJ
        },
        measureText: function(a) {
            var b = 0, c = a.length, d, e;
            for (d = 0; d < c; d++)
                e = this.Gu.indexOf(a.charAt(d)),
                b = 0 <= e ? b + (this.Fu[e] + this.zv) : b + this.width;
            return b
        },
        fillText: function(a, b, c, d) {
            var e = b.length, f, g, h, q, l = this.Dg;
            if (0 == (this.Na & za.BF))
                for (f = 0; f < e; f++)
                    q = this.Gu.indexOf(b.charAt(f)),
                    0 <= q ? (h = Math.floor(q / this.Or),
                    g = q - h * this.Or,
                    h *= this.height + 1,
                    g *= this.width + 1,
                    0 == l.tb ? a.drawImage(l.sb, g, h, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height) : a.drawImage(l.app.ba.Lb[l.tb], g + l.vd, h + l.wd, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height),
                    c += this.Fu[q] + this.zv) : (a.fillStyle = p.af(this.color),
                    a.fillRect(c, d, this.width, this.height),
                    c += this.width);
            else
                for (c += this.measureText(b),
                f = e - 1; 0 <= f; f--)
                    q = this.Gu.indexOf(b.charAt(f)),
                    0 <= q ? (c -= this.Fu[q] + this.zv,
                    h = q / this.Or,
                    g = q - h * this.Or,
                    h *= this.height + 1,
                    g *= this.width + 1,
                    0 == l.tb ? a.drawImage(l.sb, g, h, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height) : a.drawImage(l.app.ba.Lb[l.tb], g + l.vd, h + l.wd, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height)) : (c -= this.width,
                    a.fillStyle = p.af(this.color),
                    a.fillRect(c, d, this.width, this.height))
        }
    };
    Y.xi = 1;
    Y.CM = 17408;
    Y.BM = 17664;
    Y.vM = 17920;
    Y.tM = 18176;
    Y.uM = 18432;
    Y.wM = 18688;
    Y.EM = 18944;
    Y.zM = 19200;
    Y.xM = 19456;
    Y.yM = 19712;
    Y.FM = 19968;
    Y.GM = 20224;
    Y.AM = 20480;
    Y.DM = 20736;
    Y.YD = 983039;
    Y.create = function(a) {
        var b = !1, c = !1, d = !1, e = !1, f = !1, g = !1, h = !1, q = !1, l = !1, C = !1, n = a.file.T, p = a.file.o(), m, k = a.file.s();
        switch (k) {
        case 65535:
            m = new ha;
            break;
        case 131071:
            m = new ha;
            break;
        case 262143:
            m = new ACT_SETVARG;
            break;
        case 327679:
            m = new ACT_SUBVARG;
            break;
        case 393215:
            m = new ACT_ADDVARG;
            break;
        case 458751:
            m = new ACT_GRPACTIVATE;
            break;
        case 524287:
            m = new ACT_GRPDEACTIVATE;
            break;
        case 983039:
            m = new ACT_STARTLOOP;
            break;
        case 1048575:
            m = new ACT_STOPLOOP;
            break;
        case 1114111:
            m = new ACT_SETLOOPINDEX;
            break;
        case 1179647:
            m = new ACT_RANDOMIZE;
            break;
        case 1310719:
            m = new ACT_SETGLOBALSTRING;
            break;
        case 1572863:
            m = new ha;
            break;
        case 1638399:
            m = new ha;
            break;
        case 1835007:
            m = new ACT_SETVARGCONST;
            b = !0;
            break;
        case 1900543:
            m = new ACT_SETVARG;
            break;
        case 1966079:
            m = new ACT_SETVARGCONST;
            b = !0;
            break;
        case 2031615:
            m = new ACT_SETVARG;
            break;
        case 2097151:
            m = new ACT_ADDVARGCONST;
            c = !0;
            break;
        case 2162687:
            m = new ACT_ADDVARG;
            break;
        case 2228223:
            m = new ACT_ADDVARGCONST;
            c = !0;
            break;
        case 2293759:
            m = new ACT_ADDVARG;
            break;
        case 2359295:
            m = new ACT_SUBVARGCONST;
            d = !0;
            break;
        case 2424831:
            m = new ACT_SUBVARG;
            break;
        case 2490367:
            m = new ACT_SUBVARGCONST;
            d = !0;
            break;
        case 2555903:
            m = new ACT_SUBVARG;
            break;
        case 2883583:
            m = new ACT_EXECUTECHILDEVENTS;
            break;
        case 2949119:
            m = new ha;
            break;
        case 65534:
            m = new ACT_PLAYSAMPLE;
            break;
        case 131070:
            m = new ub;
            break;
        case 327678:
            m = new ACT_PLAYLOOPSAMPLE;
            break;
        case 458750:
            m = new vb;
            break;
        case 524286:
            m = new ACT_PAUSESAMPLE;
            break;
        case 589822:
            m = new ACT_RESUMESAMPLE;
            break;
        case 786430:
            m = new wb;
            break;
        case 851966:
            m = new xb;
            break;
        case 917502:
            m = new ACT_PAUSECHANNEL;
            break;
        case 983038:
            m = new ACT_RESUMECHANNEL;
            break;
        case 1048574:
            m = new yb;
            break;
        case 1114110:
            m = new ACT_SETCHANNELPOS;
            break;
        case 1179646:
            m = new zb;
            break;
        case 1245182:
            m = new ha;
            break;
        case 1310718:
            m = new ACT_SETSAMPLEPOS;
            break;
        case 1376254:
            m = new ACT_SETSAMPLEMAINVOL;
            break;
        case 1441790:
            m = new ACT_SETSAMPLEVOL;
            break;
        case 1507326:
            m = new ha;
            break;
        case 1572862:
            m = new ha;
            break;
        case 1638398:
            m = new ACT_PAUSEALLCHANNELS;
            break;
        case 1703934:
            m = new ACT_RESUMEALLCHANNELS;
            break;
        case 2031614:
            m = new ACT_LOCKCHANNEL;
            break;
        case 2097150:
            m = new ACT_UNLOCKCHANNEL;
            break;
        case 2162686:
            m = new ACT_SETCHANNELFREQ;
            break;
        case 2228222:
            m = new ACT_SETSAMPLEFREQ;
            break;
        case 2424830:
            m = new ACT_PLAYSAMPLE2;
            break;
        case 65533:
            m = new Ab;
            break;
        case 131069:
            m = new ACT_PREVLEVEL;
            break;
        case 196605:
            m = new Bb;
            break;
        case 262141:
            m = new ACT_PAUSEKEY;
            break;
        case 327677:
            m = new Cb;
            break;
        case 393213:
            m = new ACT_RESTARTGAME;
            break;
        case 458749:
            m = new ACT_RESTARTLEVEL;
            break;
        case 524285:
            m = new ACT_CDISPLAY;
            break;
        case 589821:
            m = new Db;
            break;
        case 655357:
            m = new ACT_CDISPLAYY;
            break;
        case 983037:
            m = new ACT_FULLSCREENMODE;
            break;
        case 1048573:
            m = new ACT_WINDOWEDMODE;
            break;
        case 1114109:
            m = new ACT_SETFRAMERATE;
            break;
        case 1179645:
            m = new ACT_PAUSEKEY;
            break;
        case 1245181:
            m = new ACT_PAUSEANYKEY;
            break;
        case 1310717:
            m = new Eb;
            break;
        case 1376253:
            m = new Fb;
            break;
        case 1441789:
            m = new ACT_SETVIRTUALWIDTH;
            break;
        case 1507325:
            m = new ACT_SETVIRTUALHEIGHT;
            break;
        case 1572861:
            m = new ACT_SETFRAMEBDKCOLOR;
            break;
        case 1638397:
            m = new ACT_DELCREATEDBKDAT;
            break;
        case 1703933:
            m = new ACT_DELALLCREATEDBKD;
            break;
        case 1769469:
            m = new ACT_SETFRAMEWIDTH;
            break;
        case 1835005:
            m = new ACT_SETFRAMEHEIGHT;
            break;
        case 2097149:
            m = new ACT_PLAYDEMO;
            break;
        case 2162685:
            m = new ha;
            break;
        case 2228221:
            m = new ha;
            break;
        case 2293757:
            m = new ha;
            break;
        case 2359293:
            m = new ha;
            break;
        case 2424829:
            m = new ha;
            break;
        case 2490365:
            m = new ACT_SETSTRETCHRESAMPLING;
            break;
        case 65532:
            m = new ACT_SETTIMER;
            break;
        case 131068:
            m = new ACT_EVENTAFTER;
            break;
        case 196604:
            m = new ACT_NEVENTSAFTER;
            break;
        case 65530:
            m = new ACT_HIDECURSOR;
            break;
        case 131066:
            m = new ACT_SHOWCURSOR;
            break;
        case 65529:
            m = new ACT_SETSCORE;
            break;
        case 131065:
            m = new ACT_SETLIVES;
            break;
        case 196601:
            m = new ACT_NOINPUT;
            break;
        case 262137:
            m = new ACT_RESTINPUT;
            break;
        case 327673:
            m = new ACT_ADDSCORE;
            break;
        case 393209:
            m = new ACT_ADDLIVES;
            break;
        case 458745:
            m = new ACT_SUBSCORE;
            break;
        case 524281:
            m = new ACT_SUBLIVES;
            break;
        case 589817:
            m = new ACT_SETINPUT;
            break;
        case 655353:
            m = new ACT_SETINPUTKEY;
            break;
        case 720889:
            m = new ACT_SETPLAYERNAME;
            break;
        case 65531:
            m = new Gb;
            break;
        case 131067:
            m = new ACT_CREATEBYNAME;
            break;
        case 196603:
            m = new ACT_CREATEEXP;
            break;
        case 262139:
            m = new ACT_CREATEBYNAMEEXP;
            break;
        case 5242883:
            m = new ACT_STRDESTROY;
            break;
        case 5308419:
            m = new ACT_STRDISPLAY;
            break;
        case 5373955:
            m = new ACT_STRDISPLAYDURING;
            break;
        case 5439491:
            m = new ACT_STRSETCOLOUR;
            break;
        case 5505027:
            m = new ACT_STRSET;
            break;
        case 5570563:
            m = new ACT_STRPREV;
            break;
        case 5636099:
            m = new ACT_STRNEXT;
            break;
        case 5701635:
            m = new ACT_STRDISPLAYSTRING;
            break;
        case 5767171:
            m = new ACT_STRSETSTRING;
            break;
        case 5242882:
            m = new ACT_SPRPASTE;
            break;
        case 5308418:
            m = new ACT_SPRFRONT;
            break;
        case 5373954:
            m = new ACT_SPRBACK;
            break;
        case 5439490:
            m = new ACT_SPRADDBKD;
            break;
        case 5505026:
            m = new ACT_SPRREPLACECOLOR;
            break;
        case 5570562:
            m = new ACT_SPRSETSCALE;
            break;
        case 5636098:
            m = new ACT_SPRSETSCALEX;
            break;
        case 5701634:
            m = new ACT_SPRSETSCALEY;
            break;
        case 5767170:
            m = new ACT_SPRSETANGLE;
            break;
        case 5242887:
            m = new Hb;
            break;
        case 5308423:
            m = new Ib;
            break;
        case 5373959:
            m = new Jb;
            break;
        case 5439495:
            m = new ACT_CSETMIN;
            break;
        case 5505031:
            m = new ACT_CSETMAX;
            break;
        case 5570567:
            m = new ACT_CSETCOLOR1;
            break;
        case 5636103:
            m = new ACT_CSETCOLOR2;
            break;
        case 5242884:
            m = new ACT_QASK;
            break;
        case 5242889:
            m = new ACT_CCARESTARTAPP;
            break;
        case 5308425:
            m = new ACT_CCARESTARTFRAME;
            break;
        case 5373961:
            m = new ACT_CCANEXTFRAME;
            break;
        case 5439497:
            m = new ACT_CCAPREVIOUSFRAME;
            break;
        case 5505033:
            m = new ACT_CCAENDAPP;
            break;
        case 5636105:
            m = new ACT_CCAJUMPFRAME;
            break;
        case 5701641:
            m = new ACT_CCASETGLOBALVALUE;
            break;
        case 5767177:
            m = new ACT_CCASHOW;
            break;
        case 5832713:
            m = new ACT_CCAHIDE;
            break;
        case 5898249:
            m = new ACT_CCASETGLOBALSTRING;
            break;
        case 5963785:
            m = new ACT_CCAPAUSEAPP;
            break;
        case 6029321:
            m = new ACT_CCARESUMEAPP;
            break;
        case 6094857:
            m = new ACT_CCASETWIDTH;
            break;
        case 6160393:
            m = new ACT_CCASETHEIGHT;
            break;
        default:
            switch (k & 4294901760) {
            case 0:
                m = new ACT_EXTEXTRA;
                C = !0;
                break;
            case 65536:
                m = new Kb;
                break;
            case 131072:
                m = new Lb;
                break;
            case 196608:
                m = new Mb;
                break;
            case 262144:
                m = new ACT_EXTSTOP;
                break;
            case 327680:
                m = new ACT_EXTSTART;
                break;
            case 393216:
                m = new Nb;
                break;
            case 458752:
                m = new ACT_EXTMAXSPEED;
                break;
            case 524288:
                m = new ACT_EXTWRAP;
                break;
            case 589824:
                m = new ACT_EXTBOUNCE;
                break;
            case 655360:
                m = new ACT_EXTREVERSE;
                break;
            case 720896:
                m = new ACT_EXTNEXTMOVE;
                break;
            case 786432:
                m = new ACT_EXTPREVMOVE;
                break;
            case 851968:
                m = new ACT_EXTSELMOVE;
                break;
            case 917504:
                m = new ACT_EXTLOOKAT;
                break;
            case 983040:
                m = new ACT_EXTSTOPANIM;
                break;
            case 1048576:
                m = new ACT_EXTSTARTANIM;
                break;
            case 1114112:
                m = new Ob;
                break;
            case 1179648:
                m = new ACT_EXTFORCEDIR;
                break;
            case 1245184:
                m = new Pb;
                break;
            case 1310720:
                m = new ACT_EXTRESTANIM;
                break;
            case 1376256:
                m = new ACT_EXTRESTDIR;
                break;
            case 1441792:
                m = new ACT_EXTRESTSPEED;
                break;
            case 1507328:
                m = new ACT_EXTSETDIR;
                break;
            case 1572864:
                m = new Qb;
                break;
            case 1638400:
                m = new ACT_EXTSHUFFLE;
                break;
            case 1703936:
                m = new Rb;
                break;
            case 1769472:
                m = new Sb;
                break;
            case 1835008:
                m = new ACT_EXTDISPLAYDURING;
                break;
            case 1900544:
                m = new ACT_EXTSHOOT;
                break;
            case 1966080:
                m = new ACT_EXTSHOOTTOWARD;
                break;
            case 2031616:
                m = new Tb;
                e = !0;
                break;
            case 2097152:
                m = new Vb;
                f = !0;
                break;
            case 2162688:
                m = new Xb;
                g = !0;
                break;
            case 2228224:
                m = new ACT_EXTDISPATCHVAR;
                break;
            case 2293760:
                m = new ACT_EXTSETFLAG;
                h = !0;
                break;
            case 2359296:
                m = new ACT_EXTCLRFLAG;
                q = !0;
                break;
            case 2424832:
                m = new Zb;
                l = !0;
                break;
            case 2490368:
                m = new ACT_EXTINKEFFECT;
                break;
            case 2555904:
                m = new ACT_EXTSETSEMITRANSPARENCY;
                break;
            case 2621440:
                m = new ACT_EXTFORCEFRAME;
                break;
            case 2686976:
                m = new ACT_EXTRESTFRAME;
                break;
            case 2752512:
                m = new ACT_EXTSETACCELERATION;
                break;
            case 2818048:
                m = new ACT_EXTSETDECELERATION;
                break;
            case 2883584:
                m = new ACT_EXTSETROTATINGSPEED;
                break;
            case 2949120:
                m = new ACT_EXTSETDIRECTIONS;
                break;
            case 3014656:
                m = new ACT_EXTBRANCHNODE;
                break;
            case 3080192:
                m = new ACT_EXTSETGRAVITY;
                break;
            case 3145728:
                m = new ACT_EXTGOTONODE;
                break;
            case 3211264:
                m = new ACT_EXTSETVARSTRING;
                break;
            case 3276800:
                m = new ACT_EXTSETFONTNAME;
                break;
            case 3342336:
                m = new ACT_EXTSETFONTSIZE;
                break;
            case 3407872:
                m = new ACT_EXTSETBOLD;
                break;
            case 3473408:
                m = new ACT_EXTSETITALIC;
                break;
            case 3538944:
                m = new ACT_EXTSETUNDERLINE;
                break;
            case 3604480:
                m = new ha;
                break;
            case 3670016:
                m = new ACT_EXTSETTEXTCOLOR;
                break;
            case 3735552:
                m = new ac;
                break;
            case 3801088:
                m = new bc;
                break;
            case 3866624:
                m = new ACT_EXTMOVEBEFORE;
                break;
            case 3932160:
                m = new ACT_EXTMOVEAFTER;
                break;
            case 3997696:
                m = new ACT_EXTMOVETOLAYER;
                break;
            case 4063232:
                m = new ha;
                break;
            case 4128768:
                m = new ACT_EXTSETEFFECT;
                break;
            case 4194304:
                m = new ha;
                break;
            case 4259840:
                m = new cc;
                break;
            case 4325376:
                m = new ACT_EXTSETRGBCOEF;
                break;
            case 4390912:
                m = new ha;
                break;
            case 4456448:
                m = new ACT_EXTSETFRICTION;
                break;
            case 4521984:
                m = new ACT_EXTSETELASTICITY;
                break;
            case 4587520:
                m = new ACT_EXTAPPLYIMPULSE;
                break;
            case 4653056:
                m = new ACT_EXTAPPLYANGULARIMPULSE;
                break;
            case 4718592:
                m = new ACT_EXTAPPLYFORCE;
                break;
            case 4784128:
                m = new ACT_EXTAPPLYTORQUE;
                break;
            case 4849664:
                m = new ACT_EXTSETLINEARVELOCITY;
                break;
            case 4915200:
                m = new ACT_EXTSETANGULARVELOCITY;
                break;
            case 4980736:
                m = new ACT_EXTFOREACH;
                break;
            case 5046272:
                m = new ACT_EXTFOREACH2;
                break;
            case 5111808:
                m = new ACT_EXTSTOPFORCE;
                break;
            case 5177344:
                m = new ACT_EXTSTOPTORQUE;
                break;
            default:
                m = new ge
            }
        }
        if (null != m) {
            m.aa = k;
            m.Hd = a.file.V();
            m.jb = a.file.V();
            m.Ka = a.file.vb();
            m.Gd = a.file.vb();
            m.yc = a.file.vb();
            m.zk = a.file.vb();
            k = 0;
            if (C) {
                m.yc--;
                var C = a.file.T
                  , u = a.file.o();
                a.file.o();
                k = a.file.o();
                a.file.seek(C + u)
            }
            if (0 < m.yc)
                for (m.w = Array(m.yc),
                C = 0; C < m.yc; C++)
                    m.w[C] = Wa.create(a);
            if (0 != k) {
                C = null;
                switch (k) {
                case 1:
                    C = new ACT_EXTSETFLAGBYEXP
                }
                null != C && (C.aa = m.aa,
                C.Hd = m.Hd,
                C.jb = m.jb,
                C.Ka = m.Ka,
                C.Gd = m.Gd,
                C.yc = m.yc,
                C.zk = m.zk,
                C.w = m.w,
                m = C)
            }
            if (b || c || d)
                b = m.w[0],
                m.xd = b.value,
                b = m.w[1],
                m.value = b.ia[0].value;
            if (e || f || g)
                C = null,
                b = m.w[0],
                53 != b.code && (c = b.value,
                b = m.w[1],
                0 <= c && 2 == b.ia.length && (0 >= b.ia[1].code || 1310720 <= b.ia[1].code) && (65535 == b.ia[0].code || 1572863 == b.ia[0].code) && (e ? (C = new Ub,
                C.xd = c,
                C.value = b.ia[0].value) : f ? (C = new Wb,
                C.xd = c,
                C.value = b.ia[0].value) : g && (C = new Yb,
                C.xd = c,
                C.value = b.ia[0].value)),
                null != C && (C.aa = m.aa,
                C.Hd = m.Hd,
                C.jb = m.jb,
                C.Ka = m.Ka,
                C.Gd = m.Gd,
                C.yc = m.yc,
                C.zk = m.zk,
                C.w = m.w,
                m = C));
            if (h || q || l)
                C = null,
                e = m.w[0],
                2 == e.ia.length && (0 >= e.ia[1].code || 1310720 <= e.ia[1].code) && 65535 == e.ia[0].code && (h ? (C = new ACT_EXTSETFLAGCONST,
                C.P = 1 << e.ia[0].value) : q ? (C = new ACT_EXTCLRFLAGCONST,
                C.P = 1 << e.ia[0].value) : l && (C = new $b,
                C.P = 1 << e.ia[0].value)),
                null != C && (C.aa = m.aa,
                C.Hd = m.Hd,
                C.jb = m.jb,
                C.Ka = m.Ka,
                C.Gd = m.Gd,
                C.yc = m.yc,
                C.zk = m.zk,
                C.w = m.w,
                m = C)
        }
        a.file.seek(n + p);
        return m
    }
    ;
    tb.VN = 1;
    ha.prototype = {
        Ga: function() {}
    };
    ub.prototype = {
        Ga: function(a) {
            a.h.Sb.Ts()
        }
    };
    vb.prototype = {
        Ga: function(a) {
            var b = this.w[0];
            45 == b.code ? (b = a.dm(b),
            b = a.h.ze.ar(b)) : b = b.kp;
            0 <= b && a.h.Sb.dM(b)
        }
    };
    wb.prototype = {
        Ga: function(a) {
            var b = this.w[0]
              , c = a.ab(this.w[1])
              , d = !1;
            45 == b.code ? (b = a.dm(b),
            b = a.h.ze.ar(b)) : (d = 0 != (b.rD & Qa.SG),
            b = b.kp);
            0 <= b && a.h.Sb.play(b, 1, c - 1, d, -1, 0)
        }
    };
    xb.prototype = {
        Ga: function(a) {
            var b = this.w[0]
              , c = !1;
            45 == b.code ? (b = a.dm(b),
            b = a.h.ze.ar(b)) : (c = 0 != (b.rD & Qa.SG),
            b = b.kp);
            var d = a.ab(this.w[1])
              , e = a.ab(this.w[2]);
            0 <= b && a.h.Sb.play(b, e, d - 1, c, -1, 0)
        }
    };
    yb.prototype = {
        Ga: function(a) {
            var b = a.ab(this.w[0]);
            a.h.Sb.bM(b - 1)
        }
    };
    zb.prototype = {
        Ga: function(a) {
            var b = a.ab(this.w[0])
              , c = a.ab(this.w[1]);
            0 <= c && 100 >= c && a.h.Sb.UL(b - 1, c)
        }
    };
    Ab.prototype = {
        Ga: function(a) {
            a.wb = l.Qp;
            a.h.ti = !0
        }
    };
    Bb.prototype = {
        Ga: function(a) {
            var b;
            if (26 == this.w[0].code) {
                if (b = this.w[0].value,
                -1 == a.h.UF(b))
                    return
            } else {
                b = a.ab(this.w[0]) - 1;
                if (0 > b || 4096 <= b)
                    return;
                a.h.LQ && b++;
                b |= 32768
            }
            a.wb = l.Pp;
            a.Vm = b;
            a.h.ti = !0
        }
    };
    Cb.prototype = {
        Ga: function(a) {
            a.h.ti = !0;
            a.h.UA && !a.h.TA && (a.wb = l.Op)
        }
    };
    Db.prototype = {
        Ga: function(a) {
            var b = a.ab(this.w[0]);
            a.ML(b, 0, -1, 1)
        }
    };
    Eb.prototype = {
        Ga: function(a) {
            a.h.Mh |= n.Ct
        }
    };
    Fb.prototype = {
        Ga: function(a) {
            a.h.Mh &= ~n.Ct
        }
    };
    Gb.prototype = {
        Ga: function(a) {
            var b = this.w[0]
              , c = new yd;
            b.GC(a, 17, c) && (c.tu ? (this.Ka |= Y.xi,
            a.i.wj = !0) : this.Ka &= ~Y.xi,
            b = a.$u(b.Bq, b.jz, c.x, c.y, c.dir, 0, c.io, -1),
            0 <= b && (b = a.G[b],
            a.i.$l(b),
            b && 32 <= b.Ha && a.FH(b),
            a.Kp(b) || null != a.cS && a.pi.fL(b)))
        }
    };
    Hb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.cf(this.w[0]),
            b.Lu(a),
            b.Hn(a))
        }
    };
    Ib.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.cf(this.w[0]),
            b.fI(a))
        }
    };
    Jb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.cf(this.w[0]),
            b.gI(a))
        }
    };
    Kb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b) {
                var c = new yd;
                this.w[0].GC(a, 1, c) && (l.gc(b, c.x),
                l.hc(b, c.y),
                -1 != c.dir && (c = c.dir &= 31,
                a.Zb(b) != c && (b.b.Ya = c,
                b.b.N = !0,
                b.B.ta.Af(c),
                2 == b.Ha && b.ea.gk(0))))
            }
        }
    };
    Lb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.ab(this.w[0]),
            l.gc(b, Math.floor(a)))
        }
    };
    Mb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.ab(this.w[0]),
            l.hc(b, Math.floor(a)))
        }
    };
    Nb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.ab(this.w[0]),
            null != b.B && b.B.ta.Se(a))
        }
    };
    Ob.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = 10 == this.w[0].code ? this.w[0].value : a.ab(this.w[0]),
            0 > a && (a = 0),
            b.ea.yq(a),
            b.b.N = !0)
        }
    };
    Pb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (a = a.ab(this.w[0]),
            b.ea.HH(a))
        }
    };
    Qb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && (3 == b.Ha ? 0 != (b.VC & l.Tx) ? (b.F.Rr(),
            b.F.Y &= ~A.Bh,
            b.X |= M.rh) : (b.X |= M.Df,
            a.vg(b.bc)) : 0 == (b.X & M.Df) && (b.X |= M.Df,
            0 != (b.sa & D.$j) || 0 != (b.sa & D.bk) ? a.OA(b) : (b.ao = !1,
            a.vg(b.bc))))
        }
    };
    Rb.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && l.DK(a)
        }
    };
    Sb.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && l.EK(a)
        }
    };
    Tb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b) {
                var c;
                c = 53 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].value;
                0 <= c && null != b.J && (c >= b.J.Pa.length && b.J.Wi(c + 10),
                a = a.cf(this.w[1]),
                b.J.Pa[c] = a)
            }
        }
    };
    Ub.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && 0 <= this.xd && null != a.J && (this.xd >= a.J.Pa.length && a.J.Wi(this.xd + 10),
            a.J.Pa[this.xd] = this.value)
        }
    };
    Vb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b) {
                var c;
                c = 53 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].value;
                0 <= c && null != b.J && (c >= b.J.Pa.length && b.J.Wi(c + 10),
                a = a.cf(this.w[1]),
                b.J.Pa[c] += a)
            }
        }
    };
    Wb.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && 0 <= this.xd && null != a.J && (this.xd >= a.J.Pa.length && a.J.Wi(this.xd + 10),
            a.J.Pa[this.xd] += this.value)
        }
    };
    Xb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b) {
                var c;
                c = 53 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].value;
                0 <= c && null != b.J && (c >= b.J.Pa.length && b.J.Wi(c + 10),
                a = a.cf(this.w[1]),
                b.J.Pa[c] -= a)
            }
        }
    };
    Yb.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && 0 <= this.xd && null != a.J && (this.xd >= a.J.Pa.length && a.J.Wi(this.xd + 10),
            a.J.Pa[this.xd] -= this.value)
        }
    };
    Zb.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            null != b && null != b.J && (a = 1 << a.ab(this.w[0]),
            b.J.Sd = 0 != (b.J.Sd & a) ? b.J.Sd & ~a : b.J.Sd | a)
        }
    };
    $b.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && null != a.J && (a.J.Sd = 0 != (a.J.Sd & this.P) ? a.J.Sd & ~this.P : a.J.Sd | this.P)
        }
    };
    ac.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && a.Td(a.Ck())
        }
    };
    bc.prototype = {
        Ga: function(a) {
            a = a.i.$b(this);
            null != a && a.Td(0)
        }
    };
    cc.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b && null != b.F) {
                a = p.TH(255 - a.ab(this.w[0]), 0, 255);
                var c = 0 == (b.F.Qb & A.yp);
                b.F.Qb = b.F.Qb & A.kt | A.yp;
                var d = 16777215;
                c || (d = b.F.Rb);
                b.F.Rb = a << 24 | d & 16777215;
                b.F.zK(b.F.Qb, b.F.Rb)
            }
        }
    };
    S.xy = 6;
    S.EE = -983041;
    S.FE = -1507329;
    S.GE = -1572865;
    S.create = function(a) {
        var b = a.file.T, c = a.file.o(), d, e = a.file.s();
        switch (e) {
        case -2752513:
            d = new CND_STARTCHILDEVENT;
            break;
        case -2686977:
            d = new va;
            break;
        case -2555905:
            d = new CND_RUNNINGAS;
            break;
        case -2490369:
            d = new CND_COMPAREGCONST_GT;
            break;
        case -2424833:
            d = new CND_COMPAREGCONST_GE;
            break;
        case -2359297:
            d = new CND_COMPAREGCONST_LT;
            break;
        case -2293761:
            d = new CND_COMPAREGCONST_LE;
            break;
        case -2228225:
            d = new CND_COMPAREGCONST_NE;
            break;
        case -2162689:
            d = new CND_COMPAREGCONST_EQ;
            break;
        case -2097153:
            d = new CND_COMPAREGCONST_GT;
            break;
        case -2031617:
            d = new CND_COMPAREGCONST_GE;
            break;
        case -1966081:
            d = new CND_COMPAREGCONST_LT;
            break;
        case -1900545:
            d = new CND_COMPAREGCONST_LE;
            break;
        case -1835009:
            d = new CND_COMPAREGCONST_NE;
            break;
        case -1769473:
            d = new CND_COMPAREGCONST_EQ;
            break;
        case -1703937:
            d = new va;
            break;
        case -1638401:
            d = new CND_CHANCE;
            break;
        case -1572865:
            d = new va;
            break;
        case -1507329:
            d = new va;
            break;
        case -1441793:
            d = new CND_GROUPSTART;
            break;
        case -1245185:
            d = new CND_COMPAREGSTRING;
            break;
        case -983041:
            d = new CND_ONLOOP;
            break;
        case -720897:
            d = new CND_GROUPACTIVATED;
            break;
        case -655361:
            d = new va;
            break;
        case -589825:
            d = new va;
            break;
        case -524289:
            d = new va;
            break;
        case -458753:
            d = new CND_COMPAREG;
            break;
        case -393217:
            d = new ec;
            break;
        case -327681:
            d = new fc;
            break;
        case -262145:
            d = new CND_REPEAT;
            break;
        case -196609:
            d = new CND_NOMORE;
            break;
        case -131073:
            d = new gc;
            break;
        case -65537:
            d = new va;
            break;
        case -1:
            d = new dc;
            break;
        case -524290:
            d = new CND_SPCHANNELPAUSED;
            break;
        case -458754:
            d = new hc;
            break;
        case -327682:
            d = new CND_SPSAMPAUSED;
            break;
        case -131074:
            d = new CND_NOSAMPLAYING;
            break;
        case -2:
            d = new ic;
            break;
        case -458755:
            d = new CND_ENDOFPAUSE;
            break;
        case -393219:
            d = new CND_ISVSYNCON;
            break;
        case -327683:
            d = new CND_ISLADDER;
            break;
        case -262147:
            d = new CND_ISOBSTACLE;
            break;
        case -196611:
            d = new CND_QUITAPPLICATION;
            break;
        case -131075:
            d = new CND_LEVEL;
            break;
        case -65539:
            d = new CND_END;
            break;
        case -3:
            d = new jc;
            break;
        case -458756:
            d = new tc;
            break;
        case -393220:
            d = new sc;
            break;
        case -327684:
            d = new CND_ONEVENT;
            break;
        case -262148:
            d = new CND_TIMEOUT;
            break;
        case -196612:
            d = new CND_EVERY;
            break;
        case -131076:
            d = new CND_TIMER;
            break;
        case -65540:
            d = new CND_TIMERINF;
            break;
        case -4:
            d = new kc;
            break;
        case -720902:
            d = new CND_ONMOUSEWHEELDOWN;
            break;
        case -655366:
            d = new CND_ONMOUSEWHEELUP;
            break;
        case -589830:
            d = new CND_MOUSEON;
            break;
        case -524294:
            d = new lc;
            break;
        case -458758:
            d = new CND_MKEYDEPRESSED;
            break;
        case -393222:
            d = new mc;
            break;
        case -327686:
            d = new CND_MCLICKINZONE;
            break;
        case -262150:
            d = new nc;
            break;
        case -196614:
            d = new oc;
            break;
        case -131078:
            d = new CND_MINZONE;
            break;
        case -65542:
            d = new pc;
            break;
        case -6:
            d = new qc;
            break;
        case -327687:
            d = new CND_JOYPUSHED;
            break;
        case -262151:
            d = new CND_NOMORELIVE;
            break;
        case -196615:
            d = new CND_JOYPRESSED;
            break;
        case -131079:
            d = new CND_LIVE;
            break;
        case -65543:
            d = new CND_SCORE;
            break;
        case -7:
            d = new CND_PLAYERPLAYING;
            break;
        case -1441797:
            d = new CND_CHOOSEALLINLINE;
            break;
        case -1376261:
            d = new CND_CHOOSEFLAGRESET;
            break;
        case -1310725:
            d = new CND_CHOOSEFLAGSET;
            break;
        case -1245189:
            d = new CND_CHOOSEVALUE;
            break;
        case -1179653:
            d = new CND_PICKFROMID;
            break;
        case -1114117:
            d = new CND_CHOOSEALLINZONE;
            break;
        case -1048581:
            d = new CND_CHOOSEALL;
            break;
        case -983045:
            d = new CND_CHOOSEZONE;
            break;
        case -917509:
            d = new CND_NUMOFALLOBJECT;
            break;
        case -851973:
            d = new CND_NUMOFALLZONE;
            break;
        case -786437:
            d = new CND_NOMOREALLZONE;
            break;
        case -720901:
            d = new CND_CHOOSEFLAGRESET_OLD;
            break;
        case -655365:
            d = new CND_CHOOSEFLAGSET_OLD;
            break;
        case -458757:
            d = new CND_CHOOSEVALUE_OLD;
            break;
        case -393221:
            d = new CND_PICKFROMID_OLD;
            break;
        case -327685:
            d = new CND_CHOOSEALLINZONE_OLD;
            break;
        case -262149:
            d = new CND_CHOOSEALL_OLD;
            break;
        case -196613:
            d = new CND_CHOOSEZONE_OLD;
            break;
        case -131077:
            d = new CND_NUMOFALLOBJECT_OLD;
            break;
        case -65541:
            d = new CND_NUMOFALLZONE_OLD;
            break;
        case -5:
            d = new CND_NOMOREALLZONE_OLD;
            break;
        case -5505022:
            d = new CND_CMPSCALEY;
            break;
        case -5439486:
            d = new CND_CMPSCALEX;
            break;
        case -5373950:
            d = new CND_CMPANGLE;
            break;
        case -5308409:
            d = new rc;
            break;
        case -5439484:
            d = new CND_QEQUAL;
            break;
        case -5373948:
            d = new CND_QFALSE;
            break;
        case -5308412:
            d = new CND_QEXACT;
            break;
        case -5505015:
            d = new CND_CCAISPAUSED;
            break;
        case -5439479:
            d = new CND_CCAISVISIBLE;
            break;
        case -5373943:
            d = new CND_CCAAPPFINISHED;
            break;
        case -5308407:
            d = new CND_CCAFRAMECHANGED;
            break;
        default:
            switch (e & 4294901760) {
            case -3211264:
                d = new CND_EXTCMPINSTANCEDATA;
                break;
            case -3145728:
                d = new CND_EXTPICKMAXVALUE;
                break;
            case -3080192:
                d = new CND_EXTPICKMINVALUE;
                break;
            case -3014656:
                d = new CND_EXTCMPLAYER;
                break;
            case -2949120:
                d = new CND_EXTCOMPARE;
                break;
            case -2883584:
                d = new CND_EXTPICKCLOSEST;
                break;
            case -2818048:
                d = new fb;
                break;
            case -2752512:
                d = new fb;
                break;
            case -2686976:
                d = new CND_EXTONLOOP;
                break;
            case -2621440:
                d = new CND_EXTISSTRIKEOUT;
                break;
            case -2555904:
                d = new CND_EXTISUNDERLINE;
                break;
            case -2490368:
                d = new CND_EXTISITALIC;
                break;
            case -2424832:
                d = new CND_EXTISBOLD;
                break;
            case -2359296:
                d = new CND_EXTCMPVARSTRING;
                break;
            case -2293760:
                d = new CND_EXTPATHNODENAME;
                break;
            case -2228224:
                d = new CND_EXTCHOOSE;
                break;
            case -2162688:
                d = new CND_EXTNOMOREOBJECT;
                break;
            case -2097152:
                d = new uc;
                break;
            case -2031616:
                d = new CND_EXTNOMOREZONE;
                break;
            case -1966080:
                d = new CND_EXTNUMBERZONE;
                break;
            case -1900544:
                d = new vc;
                break;
            case -1835008:
                d = new CND_EXTHIDDEN;
                break;
            case -1769472:
                d = new wc;
                break;
            case -1703936:
                d = new CND_EXTCMPVARFIXED;
                break;
            case -1638400:
                d = new xc;
                break;
            case -1572864:
                d = new yc;
                break;
            case -1507328:
                d = new CND_EXTISCOLBACK;
                break;
            case -1441792:
                d = new CND_EXTNEARBORDERS;
                break;
            case -1376256:
                d = new CND_EXTENDPATH;
                break;
            case -1310720:
                d = new CND_EXTPATHNODE;
                break;
            case -1245184:
                d = new CND_EXTCMPACC;
                break;
            case -1179648:
                d = new CND_EXTCMPDEC;
                break;
            case -1114112:
                d = new zc;
                break;
            case -1048576:
                d = new Ac;
                break;
            case -983040:
                d = new CND_EXTCMPSPEED;
                break;
            case -917504:
                d = new CND_EXTCOLLISION;
                break;
            case -851968:
                d = new CND_EXTCOLBACK;
                break;
            case -786432:
                d = new CND_EXTOUTPLAYFIELD;
                break;
            case -720896:
                d = new CND_EXTINPLAYFIELD;
                break;
            case -655360:
                d = new CND_EXTISOUT;
                break;
            case -589824:
                d = new CND_EXTISIN;
                break;
            case -524288:
                d = new CND_EXTFACING;
                break;
            case -458752:
                d = new CND_EXTSTOPPED;
                break;
            case -393216:
                d = new CND_EXTBOUNCING;
                break;
            case -327680:
                d = new CND_EXTREVERSED;
                break;
            case -262144:
                d = new Bc;
                break;
            case -196608:
                d = new Cc;
                break;
            case -131072:
                d = new Dc;
                break;
            case -65536:
                d = new CND_EXTCMPFRAME;
                break;
            default:
                d = new he
            }
        }
        if (null != d && (d.aa = e,
        d.Hd = a.file.V(),
        d.jb = a.file.V(),
        d.Ka = a.file.vb(),
        d.Gd = a.file.vb(),
        d.yc = a.file.vb(),
        d.zk = a.file.vb(),
        d.gR = a.file.o(),
        0 < d.yc)) {
            d.w = Array(d.yc);
            for (e = 0; e < d.yc; e++)
                d.w[e] = Wa.create(a);
            -2686976 == d.aa && (e = d.w[0],
            2 == e.ia.length && e.ia[0].code == ca.Cl && 0 == e.ia[1].code && (d.KQ = !0,
            d.name = e.ia[0].xb.toLowerCase()))
        }
        a.file.seek(b + c);
        return d
    }
    ;
    S.zo = function(a) {
        return a.Gd & U.Sj ? !1 : !0
    }
    ;
    S.Xh = function(a) {
        return a.Gd & U.Sj ? !0 : !1
    }
    ;
    S.VB = function(a, b) {
        return a.Gd & U.Sj ? !b : b
    }
    ;
    S.bI = function(a) {
        var b = a.i.Pe
          , c = b.Ui;
        a = b.Ui = a.Ob;
        if (a == c)
            return !1;
        a--;
        return a == c ? !1 : !0
    }
    ;
    S.SQ = function(a, b) {
        var c, d = b.fr;
        if (null == d)
            d = new O,
            b.fr = d;
        else
            for (c = 0; c < d.size(); c++)
                if (d.get(c) == a)
                    return !1;
        d.add(a);
        d = b.JA;
        if (null == d)
            return !0;
        for (c = 0; c < d.size(); c++)
            if (d.get(c) == a)
                return !1;
        return !0
    }
    ;
    S.QQ = function(a, b) {
        return 0 == b ? !1 : b == a.Ob || b == a.Ob - 1 ? !0 : !1
    }
    ;
    va.prototype = {
        fb: function() {
            return !1
        },
        ja: function() {
            return !1
        }
    };
    dc.prototype = {
        fb: function() {
            return !0
        },
        ja: function() {
            return !0
        }
    };
    S.prototype = {
        Kh: function(a, b) {
            var c = a.i.$e(this.jb), d = a.i.Ee, e = this.w[0], f;
            f = e.ia[0];
            if (0 != (this.Gd & U.Xx))
                for (f = f.code != ca.cy && f.code != ca.oF || 0 != e.ia[1].code ? a.ab(e) : f.value; null != c; )
                    0 == b.yk(c, f, e.Hh) && (d--,
                    a.i.Vc()),
                    c = a.i.pe();
            else
                for (; null != c; )
                    f = a.ab(e),
                    0 == b.yk(c, f, e.Hh) && (d--,
                    a.i.Vc()),
                    c = a.i.pe();
            return 0 != d ? !0 : !1
        },
        Qq: function(a, b) {
            for (var c = a.i.$e(this.jb), d = a.i.Ee; null != c; )
                0 == b.Zu(c) && (d--,
                a.i.Vc()),
                c = a.i.pe();
            return 0 != d ? !0 : !1
        },
        QA: function(a) {
            if (a.i.ri)
                return a.i.$e(this.jb),
                a.i.$e(this.w[0].ub),
                !1;
            var b = !1;
            0 != (this.Gd & U.Sj) && (b = !0);
            var c = a.i.$e(this.jb);
            if (null == c)
                return S.Xh(this);
            var d = a.i.Ee
              , e = this.w[0].bg;
            0 <= e ? (a.Av[0] = e,
            a.Av[1] = this.w[0].ub,
            e = a.Av) : e = a.i.yd[this.w[0].ub & 32767].M;
            var f, g = new O, h, q;
            do {
                h = c.v;
                q = c.u;
                3 <= this.yc && (h = a.ab(this.w[1]),
                q = a.ab(this.w[2]));
                f = a.sm(c, c.b.Ta, c.b.gb, c.b.Gb, c.b.Hb, h, q, e);
                if (null == f)
                    0 == b && (d--,
                    a.i.Vc());
                else {
                    c = !1;
                    for (h = 0; h < f.size(); h++)
                        q = f.get(h),
                        0 == (q.X & M.Df) && (g.add(q),
                        c = !0);
                    1 == b ? 1 == c && (d--,
                    a.i.Vc()) : 0 == c && (d--,
                    a.i.Vc())
                }
                c = a.i.pe()
            } while (null != c);
            if (0 == d)
                return !1;
            c = a.i.$e(this.w[0].ub);
            if (null == c)
                return !1;
            d = a.i.Ee;
            if (0 == b) {
                do {
                    for (h = 0; h < g.size() && (q = g.get(h),
                    c != q); h++)
                        ;
                    h == g.size() && (d--,
                    a.i.Vc());
                    c = a.i.pe()
                } while (null != c);
                return 0 != d ? !0 : !1
            }
            do {
                for (h = 0; h < g.size(); h++)
                    if (q = g.get(h),
                    c == q) {
                        d--;
                        a.i.Vc();
                        break
                    }
                c = a.i.pe()
            } while (null != c);
            return 0 != d ? !0 : !1
        }
    };
    ec.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            a = a.i.Pe;
            if (0 != (a.na & L.mn))
                return !0;
            if (0 != (a.na & L.ln))
                return !1;
            a.Ui = -2;
            a.na |= L.mn;
            return !0
        }
    };
    fc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            a = a.i.Pe;
            if (0 != (a.na & L.Ip))
                return !1;
            a.na |= L.Ip;
            return !0
        }
    };
    gc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = a.cf(this.w[0]);
            a = a.cf(this.w[1]);
            return l.nk(b, a, this.w[1].Hh)
        }
    };
    hc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = a.ab(this.w[0]);
            return a.h.Sb.LJ(b - 1) ? S.Xh(this) : S.zo(this)
        }
    };
    ic.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = this.w[0]
              , c = !1;
            45 == b.code ? (b = a.dm(b),
            b = a.h.ze.ar(b)) : b = b.kp;
            0 <= b && (c = a.h.Sb.TJ(b));
            return c ? S.Xh(this) : S.zo(this)
        }
    };
    jc.prototype = {
        fb: function(a) {
            return 2 < a.Ob ? !1 : !0
        },
        ja: function(a) {
            return 2 < a.Ob ? !1 : !0
        }
    };
    kc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b;
            b = 22 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].Ad;
            return a.Zg > b ? !0 : !1
        }
    };
    lc.prototype = {
        fb: function() {
            return !0
        },
        ja: function() {
            return !1
        }
    };
    mc.prototype = {
        fb: function(a) {
            if (a.i.Ic != this.w[0].value)
                return !1;
            var b = a.i.hx
              , c = this.w[1];
            if (b == c.bg)
                return a.i.$l(a.i.gx),
                !0;
            c = c.ub;
            if (0 == (c & 32768))
                return !1;
            var d = a.i.yd[c & 32767], e;
            for (e = 0; e < d.M.length && !(0 > d.M[e]); e += 2)
                if (d.M[e] == b)
                    return a.i.JI(c),
                    a.i.$l(a.i.gx),
                    !0;
            return !1
        },
        ja: function(a) {
            return a.i.us != this.w[0].value ? !1 : a.xA(this.w[1].ub, !1)
        }
    };
    nc.prototype = {
        fb: function(a) {
            return this.w[0].value != a.i.Ic ? !1 : !0
        },
        ja: function(a) {
            return this.w[0].value == a.i.us ? !0 : !1
        }
    };
    oc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            return a.xA(this.w[0].ub, 0 != (this.Gd & U.Sj))
        }
    };
    pc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            return S.VB(this, a.h.Wc[this.w[0].key])
        }
    };
    qc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            return 0 == a.h.Wc[this.w[0].key] ? S.Xh(this) : S.bI(a) ? S.zo(this) : S.Xh(this)
        }
    };
    rc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            for (var b = a.i.$e(this.jb), c = a.i.Ee, d; null != b; )
                b = b.wa,
                d = a.cf(this.w[0]),
                0 == l.nk(b, d, this.w[0].Hh) && (c--,
                a.i.Vc()),
                b = a.i.pe();
            return 0 != c
        }
    };
    sc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b;
            b = 22 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].Ad;
            var c = this.w[1];
            if (a.Zg >= b) {
                if (c.value == a.Ob)
                    return c.value = a.Ob + 1,
                    !1;
                c.value = a.Ob + 1;
                return !0
            }
            return !1
        }
    };
    tc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = this.w[1];
            if (0 == b.at)
                a = 22 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].Ad,
                b.value = a,
                b.at = -1;
            else if (b.value -= a.Zo,
            0 >= b.value)
                return a = 22 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].Ad,
                b.value += a,
                !0;
            return !1
        }
    };
    uc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = 0, c, d = this.jb;
            if (0 == (d & 32768))
                c = a.W[d],
                b = c.Rg;
            else if (32767 != (d & 32767)) {
                var d = a.i.yd[d & 32767], e;
                for (e = 0; e < d.M.length; e += 2) {
                    c = d.M[e + 1];
                    if (0 > c)
                        break;
                    c = a.W[c];
                    b += c.Rg
                }
            }
            a = a.ab(this.w[0]);
            return l.Ju(b, a, this.w[0].Hh)
        }
    };
    vc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.Qq(a, this)
        },
        ja: function(a) {
            return this.Qq(a, this)
        },
        Zu: function(a) {
            return S.VB(this, 0 == (a.F.Y & A.Ah))
        }
    });
    wc.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = a.i.$e(this.jb);
            if (null == b)
                return !1;
            var c = a.i.Ee, d, e = this.w[1], f;
            if (0 != (this.Gd & U.Xx)) {
                f = 53 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].value;
                d = a.cf(e);
                do
                    0 <= f && null != b.J ? (b = f < b.J.Pa.length ? b.J.Hk(f) : 0,
                    0 == l.nk(b, d, e.Hh) && (c--,
                    a.i.Vc())) : (c--,
                    a.i.Vc()),
                    b = a.i.pe();
                while (null != b)
            } else {
                do
                    f = 53 == this.w[0].code ? a.ab(this.w[0]) : this.w[0].value,
                    0 <= f && null != b.J ? (b = f < b.J.Pa.length ? b.J.Hk(f) : 0,
                    d = a.cf(e),
                    0 == l.nk(b, d, e.Hh) && (c--,
                    a.i.Vc())) : (c--,
                    a.i.Vc()),
                    b = a.i.pe();
                while (null != b)
            }
            return 0 != c
        }
    };
    fb.prototype = {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = a.i.$e(this.jb);
            if (null == b)
                return !1;
            var c = a.i.Ee
              , d = this.w[0].value
              , e = this.w[1]
              , f = e.ia[0].value;
            do
                0 <= d && null != b.J ? (b = d < b.J.Pa.length ? b.J.Hk(d) : 0,
                0 == l.nk(b, f, e.Hh) && (c--,
                a.i.Vc())) : (c--,
                a.i.Vc()),
                b = a.i.pe();
            while (null != b);
            return 0 != c
        }
    };
    xc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            var b = this.w[0];
            if (68 != b.code)
                return this.Kh(a, this);
            for (var c = a.i.$e(this.jb), d = a.i.Ee; null != c; )
                0 == b.GI(c) && (d--,
                a.i.Vc()),
                c = a.i.pe();
            return 0 != d ? !0 : !1
        },
        yk: function(a, b) {
            return null != a.J && 0 != (a.J.Sd & 1 << (b & 31)) ? !0 : !1
        }
    });
    yc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.Kh(a, this)
        },
        ja: function(a) {
            return this.Kh(a, this)
        },
        yk: function(a, b) {
            return null != a.J && 0 != (a.J.Sd & 1 << (b & 31)) ? !1 : !0
        }
    });
    zc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.Kh(a, this)
        },
        ja: function(a) {
            return this.Kh(a, this)
        },
        yk: function(a, b, c) {
            return l.Ju(a.v, b, c)
        }
    });
    Ac.prototype = p.extend(new S, {
        fb: function(a) {
            return this.Kh(a, this)
        },
        ja: function(a) {
            return this.Kh(a, this)
        },
        yk: function(a, b, c) {
            return l.Ju(a.u, b, c)
        }
    });
    Bc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.QA(a)
        },
        ja: function(a) {
            return this.QA(a)
        }
    });
    Cc.prototype = p.extend(new S, {
        fb: function(a) {
            return this.ja(a)
        },
        ja: function(a) {
            return 10 == this.w[0].code ? this.Qq(a, this) : this.Kh(a, this)
        },
        Zu: function(a) {
            return this.w[0].value != a.ea.ji ? S.Xh(this) : 0 != a.ea.te ? S.zo(this) : S.Xh(this)
        },
        yk: function(a, b) {
            return b != a.ea.ji ? S.Xh(this) : 0 != a.ea.te ? S.zo(this) : S.Xh(this)
        }
    });
    Dc.prototype = p.extend(new S, {
        fb: function(a, b) {
            if ((10 == this.w[0].code ? this.w[0].value : a.ab(this.w[0])) != a.i.Ic)
                return !1;
            a.i.$l(b);
            return !0
        },
        ja: function(a) {
            return 10 == this.w[0].code ? this.Qq(a, this) : this.Kh(a, this)
        },
        Zu: function(a) {
            return this.w[0].value != a.ea.ji ? !1 : 0 == a.ea.te ? !0 : !1
        },
        yk: function(a, b) {
            return b != a.ea.ji ? !1 : 0 == a.ea.te ? !0 : !1
        }
    });
    ca.RN = 8960;
    ca.TN = 9216;
    ca.QN = 9472;
    ca.UN = 9728;
    ca.ON = 9984;
    ca.SN = 10752;
    ca.PN = 11008;
    ca.Cl = 262143;
    ca.cy = 65535;
    ca.oF = 1572863;
    ca.create = function(a) {
        var b = a.T, c, d = a.s();
        switch (d) {
        case 0:
            c = new wa;
            break;
        case 131072:
            c = new Nc;
            break;
        case 262144:
            c = new Oc;
            break;
        case 393216:
            c = new Pc;
            break;
        case 524288:
            c = new Qc;
            break;
        case 655360:
            c = new EXP_MOD;
            break;
        case 786432:
            c = new EXP_POW;
            break;
        case 917504:
            c = new EXP_AND;
            break;
        case 1048576:
            c = new EXP_OR;
            break;
        case 1179648:
            c = new EXP_XOR;
            break;
        case 65535:
            c = new hb;
            break;
        case 131071:
            c = new Rc;
            break;
        case 196607:
            c = new EXP_VARGLO;
            break;
        case 262143:
            c = new Jc;
            break;
        case 327679:
            c = new EXP_STR;
            break;
        case 393215:
            c = new EXP_VAL;
            break;
        case 458751:
        case 524287:
        case 589823:
        case 655359:
            c = new gb;
            break;
        case 720895:
            c = new EXP_SIN;
            break;
        case 786431:
            c = new EXP_COS;
            break;
        case 851967:
            c = new EXP_TAN;
            break;
        case 917503:
            c = new EXP_SQR;
            break;
        case 983039:
            c = new EXP_LOG;
            break;
        case 1048575:
            c = new EXP_LN;
            break;
        case 1114111:
            c = new EXP_HEX;
            break;
        case 1179647:
            c = new EXP_BIN;
            break;
        case 1245183:
            c = new EXP_EXP;
            break;
        case 1310719:
            c = new EXP_LEFT;
            break;
        case 1376255:
            c = new EXP_RIGHT;
            break;
        case 1441791:
            c = new EXP_MID;
            break;
        case 1507327:
            c = new EXP_LEN;
            break;
        case 1572863:
            c = new Ec;
            break;
        case 1638399:
            c = new Ic;
            break;
        case 1900543:
            c = new EXP_INT;
            break;
        case 1966079:
            c = new EXP_ABS;
            break;
        case 2031615:
            c = new EXP_CEIL;
            break;
        case 2097151:
            c = new EXP_FLOOR;
            break;
        case 2162687:
            c = new EXP_ACOS;
            break;
        case 2228223:
            c = new EXP_ASIN;
            break;
        case 2293759:
            c = new EXP_ATAN;
            break;
        case 2359295:
            c = new EXP_NOT;
            break;
        case 2686975:
            c = new EXP_MIN;
            break;
        case 2752511:
            c = new EXP_MAX;
            break;
        case 2818047:
            c = new EXP_GETRGB;
            break;
        case 2883583:
            c = new EXP_GETRED;
            break;
        case 2949119:
            c = new EXP_GETGREEN;
            break;
        case 3014655:
            c = new EXP_GETBLUE;
            break;
        case 3080191:
            c = new EXP_LOOPINDEX;
            break;
        case 3145727:
            c = new EXP_NEWLINE;
            break;
        case 3211263:
            c = new EXP_ROUND;
            break;
        case 3276799:
            c = new EXP_STRINGGLO;
            break;
        case 3342335:
            c = new Hc;
            break;
        case 3407871:
            c = new EXP_LOWER;
            break;
        case 3473407:
            c = new EXP_UPPER;
            break;
        case 3538943:
            c = new EXP_FIND;
            break;
        case 3604479:
            c = new EXP_REVERSEFIND;
            break;
        case 3866623:
            c = new EXP_FLOATTOSTRING;
            break;
        case 3932159:
            c = new EXP_ATAN2;
            break;
        case 3997695:
            c = new wa;
            break;
        case 4063231:
            c = new gb;
            break;
        case 4128767:
            c = new EXP_DISTANCE;
            break;
        case 4194303:
            c = new EXP_ANGLE;
            break;
        case 4259839:
            c = new EXP_RANGE;
            break;
        case 4325375:
            c = new EXP_RANDOMRANGE;
            break;
        case 4456447:
            c = new EXP_RUNTIMENAME;
            break;
        case 4521983:
            c = new Kc;
            break;
        case -1:
            c = new Sc;
            break;
        case -65537:
            c = new Tc;
            break;
        case -131073:
            c = new EXP_VIRGULE;
            break;
        case 65534:
            c = new EXP_GETSAMPLEMAINVOL;
            break;
        case 131070:
            c = new EXP_GETSAMPLEVOL;
            break;
        case 196606:
            c = new Uc;
            break;
        case 262142:
            c = new wa;
            break;
        case 327678:
            c = new EXP_GETSAMPLEPAN;
            break;
        case 393214:
            c = new EXP_GETCHANNELPAN;
            break;
        case 458750:
            c = new EXP_GETSAMPLEPOS;
            break;
        case 524286:
            c = new EXP_GETCHANNELPOS;
            break;
        case 589822:
            c = new EXP_GETSAMPLEDUR;
            break;
        case 655358:
            c = new EXP_GETCHANNELDUR;
            break;
        case 720894:
            c = new EXP_GETSAMPLEFREQ;
            break;
        case 786430:
            c = new EXP_GETCHANNELFREQ;
            break;
        case 851966:
            c = new EXP_GETCHANNELSNDNAME;
            break;
        case 65533:
            c = new EXP_GAMLEVEL;
            break;
        case 131069:
            c = new EXP_GAMNPLAYER;
            break;
        case 196605:
            c = new EXP_PLAYXLEFT;
            break;
        case 262141:
            c = new EXP_PLAYXRIGHT;
            break;
        case 327677:
            c = new EXP_PLAYYTOP;
            break;
        case 393213:
            c = new EXP_PLAYYBOTTOM;
            break;
        case 458749:
            c = new EXP_PLAYWIDTH;
            break;
        case 524285:
            c = new EXP_PLAYHEIGHT;
            break;
        case 589821:
            c = new EXP_GAMLEVELNEW;
            break;
        case 655357:
            c = new EXP_GETCOLLISIONMASK;
            break;
        case 720893:
            c = new EXP_FRAMERATE;
            break;
        case 786429:
            c = new EXP_GETVIRTUALWIDTH;
            break;
        case 851965:
            c = new EXP_GETVIRTUALHEIGHT;
            break;
        case 917501:
            c = new EXP_GETFRAMEBKDCOLOR;
            break;
        case 983037:
            c = new wa;
            break;
        case 1048573:
            c = new wa;
            break;
        case 1114109:
            c = new EXP_FRAMEALPHACOEF;
            break;
        case 1179645:
            c = new EXP_FRAMERGBCOEF;
            break;
        case 1245181:
            c = new wa;
            break;
        case 65532:
            c = new EXP_TIMVALUE;
            break;
        case 131068:
            c = new EXP_TIMCENT;
            break;
        case 196604:
            c = new EXP_TIMSECONDS;
            break;
        case 262140:
            c = new EXP_TIMHOURS;
            break;
        case 327676:
            c = new EXP_TIMMINITS;
            break;
        case 393212:
            c = new EXP_EVENTAFTER;
            break;
        case 65530:
            c = new EXP_XMOUSE;
            break;
        case 131066:
            c = new EXP_YMOUSE;
            break;
        case 196602:
            c = new EXP_MOUSEWHEELDELTA;
            break;
        case 65529:
            c = new EXP_PLASCORE;
            break;
        case 131065:
            c = new EXP_PLALIVES;
            break;
        case 196601:
            c = new EXP_GETINPUT;
            break;
        case 262137:
            c = new EXP_GETINPUTKEY;
            break;
        case 327673:
            c = new EXP_GETPLAYERNAME;
            break;
        case 65531:
            c = new EXP_CRENUMBERALL;
            break;
        case 131067:
            c = new EXP_LASTFIXEDVALUE;
            break;
        case 5242883:
            c = new EXP_STRNUMBER;
            break;
        case 5308419:
            c = new EXP_STRGETCURRENT;
            break;
        case 5373955:
            c = new EXP_STRGETNUMBER;
            break;
        case 5439491:
            c = new EXP_STRGETNUMERIC;
            break;
        case 5505027:
            c = new EXP_STRGETNPARA;
            break;
        case 5242882:
            c = new EXP_GETRGBAT;
            break;
        case 5308418:
            c = new EXP_GETSCALEX;
            break;
        case 5373954:
            c = new EXP_GETSCALEY;
            break;
        case 5439490:
            c = new EXP_GETANGLE;
            break;
        case 5242887:
            c = new Vc;
            break;
        case 5308423:
            c = new EXP_CGETMIN;
            break;
        case 5373959:
            c = new EXP_CGETMAX;
            break;
        case 5439495:
            c = new EXP_CGETCOLOR1;
            break;
        case 5505031:
            c = new EXP_CGETCOLOR2;
            break;
        case 5242889:
            c = new EXP_CCAGETFRAMENUMBER;
            break;
        case 5308425:
            c = new EXP_CCAGETGLOBALVALUE;
            break;
        case 5373961:
            c = new EXP_CCAGETGLOBALSTRING;
            break;
        default:
            switch (d & 4294901760) {
            case 65536:
                c = new Wc;
                break;
            case 131072:
                c = new EXP_EXTISPR;
                break;
            case 196608:
                c = new EXP_EXTSPEED;
                break;
            case 262144:
                c = new EXP_EXTACC;
                break;
            case 327680:
                c = new EXP_EXTDEC;
                break;
            case 393216:
                c = new EXP_EXTDIR;
                break;
            case 458752:
                c = new EXP_EXTXLEFT;
                break;
            case 524288:
                c = new EXP_EXTXRIGHT;
                break;
            case 589824:
                c = new EXP_EXTYTOP;
                break;
            case 655360:
                c = new EXP_EXTYBOTTOM;
                break;
            case 720896:
                c = new Xc;
                break;
            case 786432:
                c = new EXP_EXTIDENTIFIER;
                break;
            case 851968:
                c = new EXP_EXTFLAG;
                break;
            case 917504:
                c = new EXP_EXTNANI;
                break;
            case 983040:
                c = new EXP_EXTNOBJECTS;
                break;
            case 1048576:
                c = new Fc;
                break;
            case 1114112:
                c = new EXP_EXTGETSEMITRANSPARENCY;
                break;
            case 1179648:
                c = new EXP_EXTNMOVE;
                break;
            case 1245184:
                c = new Gc;
                break;
            case 1310720:
                c = new EXP_EXTGETFONTNAME;
                break;
            case 1376256:
                c = new EXP_EXTGETFONTSIZE;
                break;
            case 1441792:
                c = new EXP_EXTGETFONTCOLOR;
                break;
            case 1507328:
                c = new EXP_EXTGETLAYER;
                break;
            case 1572864:
                c = new EXP_EXTGETGRAVITY;
                break;
            case 1638400:
                c = new EXP_EXTXAP;
                break;
            case 1703936:
                c = new EXP_EXTYAP;
                break;
            case 1769472:
                c = new Yc;
                break;
            case 1835008:
                c = new EXP_EXTRGBCOEF;
                break;
            case 1900544:
                c = new wa;
                break;
            case 1966080:
                c = new Lc;
                break;
            case 2031616:
                c = new Mc;
                break;
            case 2097152:
                c = new EXP_EXTDISTANCE;
                break;
            case 2162688:
                c = new EXP_EXTANGLE;
                break;
            case 2228224:
                c = new EXP_EXTLOOPINDEX;
                break;
            case 2293760:
                c = new EXP_EXTGETFRICTION;
                break;
            case 2359296:
                c = new EXP_EXTGETRESTITUTION;
                break;
            case 2424832:
                c = new EXP_EXTGETDENSITY;
                break;
            case 2490368:
                c = new EXP_EXTGETVELOCITY;
                break;
            case 2555904:
                c = new EXP_EXTGETANGLE;
                break;
            case 2621440:
                c = new EXP_EXTWIDTH;
                break;
            case 2686976:
                c = new EXP_EXTHEIGHT;
                break;
            case 2752512:
                c = new EXP_EXTGETMASS;
                break;
            case 2818048:
                c = new EXP_EXTGETANGULARVELOCITY;
                break;
            case 2883584:
                c = new EXP_EXTGETNAME;
                break;
            case 2949120:
                c = new EXP_NUMBEROFSELECTED;
                break;
            case 3014656:
                c = new EXP_EXTINSTANCEDATA;
                break;
            default:
                c = new fe
            }
        }
        if (null != c && (c.code = d,
        0 != d)) {
            var e = a.o(), f;
            switch (d) {
            case 262143:
                c.xb = a.Nb();
                break;
            case 65535:
                c.value = a.s();
                break;
            case 1572863:
                c.value = a.DC();
                break;
            case 1638399:
                a.xa(4);
                c.ag = a.o();
                break;
            case 3342335:
                a.xa(4);
                c.ag = a.o();
                break;
            default:
                if (f = d & 65535,
                0 != (f & 32768) && (f -= 65536),
                2 <= f || f == u.Cy)
                    switch (c.bg = a.V(),
                    c.ub = a.V(),
                    d & 4294901760) {
                    case 1048576:
                        c.ag = a.o();
                        break;
                    case 1245184:
                        c.ag = a.o()
                    }
            }
            a.seek(b + e)
        }
        return c
    }
    ;
    gb.prototype = {
        evaluate: function(a) {
            a.va[a.da] = ""
        }
    };
    wa.prototype = {
        evaluate: function(a) {
            a.va[a.da] = 0
        }
    };
    hb.prototype = {
        evaluate: function(a) {
            a.va[a.da] = this.value
        }
    };
    Ec.prototype = {
        evaluate: function(a) {
            a.va[a.da] = this.value;
            a.Lh = !0
        }
    };
    Fc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            null == b ? a.va[a.da] = 0 : (b = null != b.J ? b.J.Hk(this.ag) : 0,
            p.Cv(b) || (a.Lh = !0),
            a.va[a.da] = b)
        }
    };
    Gc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            a.va[a.da] = null == b ? "" : b.J.CA(this.ag)
        }
    };
    Hc.prototype = {
        evaluate: function(a) {
            a.va[a.da] = a.h.uA(this.ag)
        }
    };
    Ic.prototype = {
        evaluate: function(a) {
            a.va[a.da] = a.h.jv(this.ag)
        }
    };
    Jc.prototype = {
        evaluate: function(a) {
            a.va[a.da] = this.xb
        }
    };
    Kc.prototype = {
        evaluate: function(a) {
            a.Pc++;
            var b = a.getExpression();
            a.Pc++;
            var c = a.getExpression();
            a.Pc++;
            var d = a.getExpression();
            a.va[a.da] = b.split(c).join(d)
        }
    };
    Lc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            a.Pc++;
            var c = a.cr();
            null != b && null != b.J && 0 <= c && c < b.J.Pa.length ? (b = b.J.Hk(c),
            p.Cv(b) || (a.Lh = !0),
            a.va[a.da] = b) : a.va[a.da] = 0
        }
    };
    Mc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            a.Pc++;
            var c = a.cr();
            a.va[a.da] = null != b && null != b.J && 0 <= c && c < b.J.Rd.length ? b.J.CA(c) : ""
        }
    };
    Nc.prototype = {
        evaluate: function(a) {
            a.va[a.da] += a.va[a.da + 1]
        }
    };
    Oc.prototype = {
        evaluate: function(a) {
            a.Cn ? (a.Pc++,
            a.pl[a.Pc].evaluate(a),
            a.va[a.da] = -a.va[a.da]) : a.va[a.da] -= a.va[a.da + 1]
        }
    };
    Pc.prototype = {
        evaluate: function(a) {
            a.va[a.da] *= a.va[a.da + 1]
        }
    };
    Qc.prototype = {
        evaluate: function(a) {
            var b = a.va[a.da]
              , c = a.va[a.da + 1];
            a.va[a.da] = 0 != c ? 0 == a.Lh ? p.sd(b / c) : a.va[a.da] / a.va[a.da + 1] : 0
        }
    };
    Rc.prototype = {
        evaluate: function(a) {
            a.Pc++;
            var b = a.cr();
            a.va[a.da] = a.random(b)
        }
    };
    Sc.prototype = {
        evaluate: function(a) {
            a.Pc++;
            a.va[a.da] = a.getExpression()
        }
    };
    Tc.prototype = {
        evaluate: function() {}
    };
    Uc.prototype = {
        evaluate: function(a) {
            a.Pc++;
            var b = a.cr();
            a.va[a.da] = a.h.Sb.qJ(b - 1)
        }
    };
    Vc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            null == b ? a.va[a.da] = 0 : (a.va[a.da] = b.wa,
            b.Ni && (a.Lh = !0))
        }
    };
    Wc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            a.va[a.da] = null == b ? 0 : b.u
        }
    };
    Xc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            a.va[a.da] = null == b ? 0 : b.v
        }
    };
    Yc.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            if (null == b)
                a.va[a.da] = 0;
            else {
                var c = b.F.Qb
                  , b = b.F.Rb
                  , d = 0;
                switch (c & A.kt) {
                case A.hE:
                    d = 255 - (b >> 24 & 255);
                    break;
                case A.Ue:
                    d = 255 - (128 == b ? 0 : 255 - 2 * b);
                    break;
                default:
                    c & A.yp && (d = 255 - (b >> 24 & 255))
                }
                a.va[a.da] = d
            }
        }
    };
    ka.FusionVersion = "Clickteam Fusion HTML5 Exporter Build 285.1";
    n.og = 4;
    n.VP = 770;
    n.on = 8;
    n.kO = 2;
    n.MF = 4;
    n.lO = 8;
    n.gy = 16;
    n.jO = 128;
    n.iO = 256;
    n.hO = 512;
    n.LF = 1024;
    n.gO = 2048;
    n.KF = 1;
    n.IF = 4;
    n.JF = 8;
    n.dO = 64;
    n.bO = 128;
    n.aO = 512;
    n.cO = 1024;
    n.Ct = 4096;
    n.fO = 4096;
    n.eO = 8192;
    n.UP = 1;
    n.qq = 0;
    n.Nl = 1;
    n.eu = 2;
    n.Ll = 3;
    n.pq = 4;
    n.oq = 5;
    n.Ml = 6;
    n.YP = 7;
    n.py = 203;
    n.lQ = 37;
    n.xQ = 39;
    n.AQ = 38;
    n.iQ = 40;
    n.If = 200;
    n.xn = 201;
    n.Ol = 202;
    n.nQ = 96;
    n.oQ = 97;
    n.pQ = 98;
    n.qQ = 99;
    n.rQ = 100;
    n.sQ = 101;
    n.tQ = 102;
    n.uQ = 103;
    n.vQ = 104;
    n.wQ = 105;
    n.yQ = 83;
    n.hQ = 68;
    n.jQ = 69;
    n.BQ = 88;
    n.kQ = 123;
    n.zQ = 16;
    n.gQ = 17;
    n.mQ = 18;
    n.AN = 0;
    n.vN = 1;
    n.wN = 2;
    n.xN = 3;
    n.yN = 4;
    n.zN = 5;
    n.Ix = 4;
    n.XM = 128;
    n.aE = 1;
    n.cE = 4;
    n.KM = 65536;
    n.ht = 32768;
    n.dE = 1048576;
    n.bE = 8388608;
    n.yi = 16777216;
    n.JM = 33554432;
    n.$D = 67108864;
    n.md = 10;
    n.dy = 592880741;
    n.ek = 1770410840;
    ka.loadApplication = ib;
    ka.loadInfo = Zc;
    n.prototype = {
        nK: function() {
            var a = this.ho.s();
            0 > this.lr && (this.lr = a);
            a != this.lr && (this.ho.gD(!0),
            a = this.ho.Nb(),
            window.open(this.kr + a, "_self"));
            this.fo = 25
        },
        load: function() {
            this.CK = this.file.o();
            this.Lq = 1;
            this.wr = new I;
            var a = this.file.s();
            this.wr.getFile(this.path.substring(0, this.path.length - 1) + this.Lq.toString(), ib, a)
        },
        iK: function() {
            this.Lq++;
            if (this.Lq > this.CK) {
                var a = (new k(this.wr.qd,"content")).file("Application.ccj").Xy();
                this.wr = null;
                this.file = new I;
                this.file.LL(a);
                this.digest();
                this.sx()
            } else
                a = this.file.s(),
                this.wr.getFile(this.path.substring(0, this.path.length - 1) + this.Lq.toString(), ib, a)
        },
        digest: function() {
            this.file.seek(0);
            var a = this.file.FC(4);
            this.pd = !1;
            80 == a[0] && 65 == a[1] && 77 == a[2] && 85 == a[3] && (this.pd = !0);
            this.file.gD(this.pd);
            this.file.xa(8);
            this.file.xa(4);
            this.sc = new ld;
            this.ba = new gd(this);
            this.Vb = new hd(this);
            this.ze = new id(this);
            this.Sb = new Z(this);
            for (var b, c = 0; 32639 != c; )
                if (c = this.file.o(),
                this.file.o(),
                b = this.file.s(),
                0 != b) {
                    a = this.file.T + b;
                    switch (c) {
                    case 8739:
                        this.hK();
                        this.gv = Array(this.Pf);
                        this.nA = Array(this.Pf);
                        this.mA = Array(this.Pf);
                        this.hv = Array(this.Pf);
                        for (b = 0; b < this.Pf; b++)
                            this.hv[b] = null;
                        break;
                    case 8773:
                        this.Ma = this.file.s();
                        this.file.s();
                        this.file.s();
                        this.file.o();
                        this.file.o();
                        break;
                    case 8740:
                        this.appName = this.file.Nb();
                        break;
                    case 8774:
                        this.file.s();
                        break;
                    case 8750:
                        this.file.Nb();
                        break;
                    case 8782:
                        this.Vv = this.file.Nb();
                        break;
                    case 8754:
                        this.mK();
                        break;
                    case 8755:
                        this.lK();
                        break;
                    case 8745:
                    case 8767:
                        this.Rq = new Sa(this);
                        this.Rq.hI(this.file);
                        this.sc.gi(this.file);
                        break;
                    case 8747:
                        this.jK(b);
                        break;
                    case 8778:
                        this.Lo = this.file.s();
                        this.qC = this.file.s();
                        this.rC = this.file.s();
                        this.tC = this.file.s();
                        this.uC = this.file.s();
                        this.sC = this.file.hd();
                        this.cl = this.file.s();
                        -1 != this.cl && (this.file.WL(4),
                        this.cl = this.file.hd());
                        this.cs = this.file.s();
                        this.Qv = !0;
                        break;
                    case 13107:
                        this.gv[this.bm] = this.file.T;
                        for (var d = 0; 32639 != d; )
                            if (d = this.file.o(),
                            this.file.o(),
                            b = this.file.s(),
                            0 != b) {
                                var e = this.file.T + b;
                                switch (d) {
                                case 13108:
                                    0 == this.bm && (this.file.xa(8),
                                    this.file.hd());
                                    break;
                                case 13110:
                                    this.hv[this.bm] = this.file.Nb();
                                    break;
                                case 13129:
                                    this.nA[this.bm] = this.file.s();
                                    this.mA[this.bm] = this.file.s();
                                    break;
                                case 13128:
                                    var f = b / 6;
                                    for (b = 0; b < f; b++) {
                                        var g = this.file.o();
                                        this.file.xa(4);
                                        0 != g && (this.Lb[g] = 1,
                                        this.ge = Math.max(this.ge, g + 1))
                                    }
                                }
                                this.file.seek(e)
                            }
                        this.bm++;
                        break;
                    case 8760:
                        d = this.file.s();
                        this.xk = Array(d);
                        for (b = 0; b < d; b++)
                            this.xk[b] = new $c(this),
                            this.xk[b].gi();
                        break;
                    case 26214:
                        this.ba.gi(this.file);
                        break;
                    case 26215:
                        this.Vb.gi(this.file);
                        break;
                    case 26216:
                        this.ze.gi(this.file)
                    }
                    this.file.seek(a)
                }
            this.context = new Ha(this.canvas);
            this.Sb.RL(0 != (this.Xn & n.LF));
            null == this.ma && (this.re = new Fa)
        },
        aD: function(a, b, c, d, e, f) {
            this.ma = a;
            this.$k = c;
            this.re = d;
            this.tx = b;
            this.Ew = e;
            this.Dw = f
        },
        HJ: function() {
            this.rg = !1;
            this.WC = 0;
            this.EL = this.FL = 1;
            this.HL = this.GL = this.ra / 2;
            this.JL = this.IL = this.Ba / 2
        },
        Ss: function() {
            window.setTimeout(Za.bind(this), 20)
        },
        sx: function() {
            (this.jr = /iPad/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent)) && 0 < this.ze.Eb && (this.Te = new Va(this),
            this.Te.qK());
            this.Gm();
            this.Wc = Array(n.py);
            var a;
            for (a = 0; a < n.py; a++)
                this.Wc[a] = !1;
            this.canvas.Ub = this;
            if (null == this.ma) {
                var b = this;
                window.addEventListener("keypress", function(a) {
                    b.yI(a)
                }, !1);
                window.addEventListener("keydown", function(a) {
                    b.Sz(a)
                }, !1);
                window.addEventListener("keyup", function(a) {
                    b.Tz(a)
                }, !1);
                window.addEventListener("blur", function() {
                    b.hasFocus = !1
                }, !1);
                window.addEventListener("focus", function() {
                    b.hasFocus = !0
                }, !1);
                if (window !== window.top)
                    try {
                        var c = window.top;
                        c.addEventListener("focus", function() {
                            b.hasFocus = !0;
                            b.canvas.focus()
                        });
                        c.addEventListener("blur", function() {
                            b.hasFocus = !1
                        })
                    } catch (d) {}
                window.addEventListener("resize", function() {
                    b.Gm()
                }, !1);
                document.addEventListener("blur", function() {
                    b.hasFocus = !1
                }, !1);
                document.addEventListener("focus", function() {
                    b.hasFocus = !0
                }, !1);
                document.addEventListener("fullscreenchange", function() {
                    b.fullScreen = document.lR;
                    b.Gm()
                }, !1);
                document.addEventListener("mozfullscreenchange", function() {
                    b.fullScreen = document.mozFullScreen;
                    b.Gm()
                }, !1);
                document.addEventListener("webkitfullscreenchange", function() {
                    b.fullScreen = document.webkitIsFullScreen;
                    b.Gm()
                }, !1);
                this.canvas.addEventListener("mousemove", function(a) {
                    b.Kr(a, b.canvas);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mousedown", function(a) {
                    b.xB(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mouseup", function(a) {
                    b.zB(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mouseout", function(a) {
                    b.yB(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("click", function(a) {
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("dblclick", function(a) {
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("contextmenu", function(a) {
                    a.preventDefault && a.preventDefault()
                }, !1);
                a = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
                document.attachEvent ? document.attachEvent("on" + a, function(a) {
                    b.AB(a)
                }) : document.addEventListener && document.addEventListener(a, function(a) {
                    b.AB(a)
                }, !1);
                document.onselectstart = function() {
                    return !1
                }
                ;
                this.canvas.onselectstart = function(a) {
                    a.preventDefault && a.preventDefault();
                    return !1
                }
                ;
                this.Hj = this.UJ();
                this.Bf = new O;
                this.Cf = Array(n.md);
                this.Pi = Array(n.md);
                this.an = Array(n.md);
                this.hh = Array(n.md);
                this.ih = Array(n.md);
                for (a = 0; a < n.md; a++)
                    this.Cf[a] = n.ek,
                    this.hh[a] = 0,
                    this.ih[a] = 0,
                    this.Pi[a] = !1,
                    this.an[a] = 0;
                this.Hj && (this.canvas.addEventListener("touchstart", function(a) {
                    b.Ws(a);
                    a.preventDefault && a.preventDefault()
                }, !1),
                this.canvas.addEventListener("touchmove", function(a) {
                    b.DD(a);
                    a.preventDefault && a.preventDefault()
                }, !1),
                this.canvas.addEventListener("touchend", function(a) {
                    b.np(a);
                    a.preventDefault && a.preventDefault()
                }, !1),
                this.canvas.addEventListener("touchcancel", function(a) {
                    b.np(a);
                    a.preventDefault && a.preventDefault()
                }, !1));
                window.focus();
                this.Ss()
            } else
                for (this.Hj = this.ma.Hj,
                this.Bf = new O,
                this.Cf = Array(n.md),
                this.Pi = Array(n.md),
                this.an = Array(n.md),
                this.hh = Array(n.md),
                this.ih = Array(n.md),
                a = 0; a < n.md; a++)
                    this.Cf[a] = n.ek,
                    this.hh[a] = 0,
                    this.ih[a] = 0,
                    this.Pi[a] = !1,
                    this.an[a] = 0;
            this.cb = this.Lj = this.Jj = 0;
            this.De = -2;
            this.H = new l(this)
        },
        Gm: function() {
            var a = this.ra, b = this.Ba, c, d;
            this.fullScreen || this.Xn & n.gy ? (c = window.innerWidth,
            d = window.innerHeight,
            document.documentElement.style.overflow = "hidden",
            document.body.scroll = "no") : (c = a,
            d = b);
            c /= a;
            d /= b;
            if (this.Ma & n.aE || this.Xn & n.gy && this.Xn & n.MF)
                c = d = Math.min(c, d);
            if (c != this.pc || d != this.qc)
                this.pc = c,
                this.qc = d,
                this.canvas.width = Math.floor(this.pc * a),
                this.canvas.height = Math.floor(this.qc * b),
                this.context.dD(this.pc, this.qc);
            this.H && this.H.Mi()
        },
        UJ: function() {
            var a = "Android;webOS;iPhone;iPad;iPod;Blackberry;Windows Phone;Touch".split(";"), b = navigator.userAgent, c;
            for (c in a)
                if (0 <= b.indexOf(a[c]))
                    return !0;
            return !1
        },
        Si: function(a) {
            this.Nq.HC(a);
            this.Sf++
        },
        zn: function(a) {
            this.Jn.add(a);
            this.ff++;
            this.Fg = !0
        },
        lp: function() {
            this.kr && (this.fo--,
            0 > this.fo && (this.fo = 1E9,
            this.ho = new I,
            this.ho.getFile(this.kr + "info.dat", Zc)));
            this.Ad = (new Date).getTime();
            if (this.YK(!1)) {
                if (this.Fg) {
                    if (null == this.hi) {
                        var a = this.xg;
                        this.Qv ? (this.hi = 0 == this.Lo ? new ad(this) : new cd(this),
                        0 == this.Lo && -1 != this.cl && (a = this.cl)) : this.hi = new bd(this);
                        this.vC = !1;
                        this.bx = !0;
                        null == this.ma && (this.frame.qr ? this.context.Eq(0, 0, this.canvas.width, this.canvas.height) : this.context.Fc(0, 0, this.ra, this.Ba, a),
                        this.Ss());
                        return
                    }
                    if (null != this.hi && 0 == this.vC) {
                        this.vC = this.hi.load();
                        null == this.ma && this.Ss();
                        return
                    }
                    for (; 0 < this.Jn.size() && this.Nq.size() < this.oI; )
                        a = this.Jn.get(0),
                        this.Nq.add(a),
                        this.Jn.So(0),
                        a.Uu();
                    this.Sb.qI();
                    a = !1;
                    0 == this.Jn.size() && 0 == this.Nq.size() && (a = !0);
                    null == this.hi || 0 == (this.Ma & n.yi) && 0 == (this.frame.hm & H.WF) || (this.bx || (this.hi.reset(),
                    this.bx = !0),
                    this.hi.step(),
                    a = this.hi.Bv());
                    a && (this.bx = !1,
                    this.H.resume(),
                    this.H.Gh(),
                    this.Fg = !1,
                    this.ba.wf(),
                    this.ze.wf(),
                    this.Vb.wf(),
                    this.Sf = this.ff = 0,
                    this.wu && (this.wu = !1,
                    0 != this.H.Vu() ? this.cb = n.oq : (this.cb = n.Ll,
                    this.wD(this.ig),
                    this.ig = null)));
                    null == this.ma && this.Ss()
                } else
                    null == this.ma && (null == this.ld ? (this.context.ax(0 != (this.Ma & n.cE)),
                    this.ds ? this.context.uj(this.ds, 0, 0, this.ra, this.Ba, 0, 0) : this.frame.qr ? this.context.Eq(0, 0, this.ra, this.Ba) : this.context.Fc(0, 0, this.ra, this.Ba, this.xg),
                    a = this.context.Oa,
                    this.rg && (bRestore = !0,
                    a.save(),
                    a.translate(this.GL, this.IL),
                    0 != this.WC && a.rotate(.0174532925 * -this.WC),
                    a.scale(Math.max(.001, this.EL), Math.max(.001, this.FL)),
                    a.translate(-this.HL, -this.JL)),
                    this.re.Ab(this.context, 0, 0),
                    this.rg && a.restore(),
                    this.Rh && this.Da.Ab(this.context),
                    this.Cx && (this.Cx--,
                    this.bt || (a = new Aa,
                    a.Jq(),
                    a.lc = 16,
                    this.bt = new na(this,this.ra,30),
                    this.bt.gB(16711680),
                    this.bt.Ir(window.FusionVersion, p.Rj | p.zi, null, 16777215, a, 1, 10526880)),
                    this.bt.Ab(this.context, 0, 0, 0, 0))) : (this.context.ax(),
                    this.context.uj(this.ld, 0, 0, this.ra, this.Ba, 0, 0)),
                    0 != (this.Mh & n.Ct) && window.requestAnimationFrame ? window.requestAnimationFrame(Za) : (a = (new Date).getTime() - this.Ad,
                    a = Math.max(1E3 / this.qA - a, 1),
                    window.setTimeout(Za, a)));
                return !0
            }
            this.Yz();
            return !1
        },
        Uz: function(a, b, c, d) {
            this.Fg || (null == this.ld ? (d || this.context.Fc(b, c, this.Ew, this.Dw, this.xg),
            this.context.clip(b, c, this.Ew, this.Dw),
            this.re.Ab(this.context, 0, 0),
            this.context.kM()) : (this.context.ax(),
            this.context.uj(this.ld, b, c, this.ra, this.Ba, 0, 0)))
        },
        QH: function() {
            0 == (this.Ma & n.dE) && (this.hasFocus ? this.xu && (this.H.resume(),
            this.xu = !1) : (this.H.pause(this.Mh & n.JF),
            this.xu = !0))
        },
        YK: function(a) {
            this.QH();
            var b = !0
              , c = !0;
            do
                switch (this.cb) {
                case n.qq:
                    if (this.FJ(),
                    this.Fb = this.tx,
                    this.cb = 1,
                    this.XJ(),
                    a) {
                        b = !1;
                        break
                    }
                case n.Nl:
                    this.aM();
                    break;
                case n.eu:
                    0 == this.rK() ? (this.CI(),
                    this.cb != n.Ml && this.cb != n.qq || this.On()) : b = !1;
                    break;
                case n.Ll:
                    this.H.Vu();
                    0 != this.H.wb ? this.ZL() ? this.cb = n.pq : this.On() : b = !1;
                    break;
                case n.pq:
                    0 == this.sK() ? (this.Zz(),
                    this.cb != n.Ml && this.cb != n.qq || this.On()) : b = !1;
                    break;
                case n.oq:
                    this.On();
                    break;
                default:
                    b = !1
                }
            while (1 == b);
            this.cb == n.Ml && (c = !1);
            return c
        },
        Yz: function() {
            null != this.Sb && this.Sb.Ts()
        },
        aM: function() {
            this.Fb != this.De && (this.frame = new H(this),
            this.frame.kK(this.Fb));
            this.xg = this.frame.WA;
            this.De = this.Fb;
            this.frame.$i = this.frame.aj = 0;
            this.frame.Hv = this.frame.Iv = 0;
            this.frame.UC = !1;
            this.HJ();
            var a;
            null != this.ma ? this.kg = this.jg = 0 : (this.jg = this.ra / 2 - this.frame.ko / 2,
            this.kg = this.Ba / 2 - this.frame.jo / 2);
            for (a = 0; a < this.frame.uc; a++)
                this.frame.Xa[a].iI(this.jg, this.kg);
            this.frame.Xb & H.iG && (document.title = this.frame.oA);
            this.ds = null;
            this.frame.Xb & H.jG && (this.ds = this.ig);
            this.frame.Xb & H.kG && (this.frame.qr = !0);
            this.H.NL(this.frame);
            this.H.GJ(null != this.frame.Rn);
            this.cb = n.Ll;
            null != this.frame.Rn ? this.Fg ? this.wu = !0 : 0 != this.H.Vu() ? this.cb = n.oq : (this.cb = n.Ll,
            this.wD(this.ig),
            this.ig = null) : this.ig = null;
            this.Fg ? this.H.pause(!0) : this.H.Gh()
        },
        MC: function() {
            null != this.ma ? this.kg = this.jg = 0 : (this.jg = this.ra / 2 - this.frame.ko / 2,
            this.kg = this.Ba / 2 - this.frame.jo / 2);
            var a;
            for (a = 0; a < this.frame.uc; a++)
                this.frame.Xa[a].zL(this.jg, this.kg)
        },
        On: function() {
            var a;
            a = this.H.YJ(!1);
            if (0 != (this.Mh & n.IF))
                this.cb = n.Ml;
            else
                switch (p.pG(a)) {
                case 1:
                    this.Fb = this.De + 1;
                    1 == this.Lo && this.Fb == this.cs && this.Fb++;
                    this.cb = n.Nl;
                    this.Fb >= this.Pf && (this.cb = n.Ml);
                    break;
                case 2:
                    this.Fb = Math.max(0, this.De - 1);
                    1 == this.Lo && this.Fb == this.cs && (0 == this.Fb ? this.Fb = this.De : this.Fb--);
                    this.cb = n.Nl;
                    break;
                case 3:
                    this.cb = n.Nl;
                    0 != (p.Lp(a) & 32768) ? (this.Fb = p.Lp(a) & 32767,
                    this.Fb >= this.Pf && (this.Fb = this.Pf - 1),
                    0 > this.Fb && (this.Fb = 0)) : p.Lp(a) < this.Un ? (this.Fb = this.Tn[p.Lp(a)],
                    -1 == this.Fb && (this.Fb = this.De + 1)) : this.Fb = this.De + 1;
                    break;
                case 4:
                    this.cb = n.qq;
                    this.Fb = this.tx;
                    break;
                default:
                    this.cb = n.Ml
                }
            this.cb == n.Nl && (0 > this.Fb || this.Fb >= this.Pf) && (this.cb = this.De);
            if (this.cb != n.Nl || this.Fb != this.De) {
                for (a = 0; a < this.frame.uc; a++)
                    this.frame.Xa[a].Lz();
                this.frame = null;
                this.De = -1
            }
        },
        nv: function() {
            null == this.xx && (this.xx = new Gd(this));
            return this.xx
        },
        wD: function(a) {
            var b, c, d = this.frame.Rn;
            if (null != d) {
                b = document.createElement("canvas");
                b.width = this.ra;
                b.height = this.Ba;
                c = document.createElement("canvas");
                c.width = this.ra;
                c.height = this.Ba;
                var e = new Ha(c);
                e.Fc(0, 0, this.ra, this.Ba, this.xg);
                this.re.Ab(e, 0, 0);
                e = new Ha(b);
                0 != (d.pp & ta.rq) ? e.Fc(0, 0, this.ra, this.Ba, d.op) : (e.Fc(0, 0, this.ra, this.Ba, this.pA),
                null != a && e.uj(a, 0, 0, a.width, a.height, 0, 0));
                this.ld = document.createElement("canvas");
                this.ld.width = this.ra;
                this.ld.height = this.Ba;
                this.ld.getContext("2d").drawImage(b, 0, 0);
                this.transition = this.nv().Vl(d, this.ld, b, c);
                if (null != this.transition)
                    return this.cb = n.eu,
                    !0
            }
            this.ld = null;
            this.cb = n.Ll;
            this.H.Az();
            return !1
        },
        rK: function() {
            if (null != this.transition) {
                if (this.transition.mr())
                    return !1;
                this.transition.Tb(w.gu);
                return !0
            }
            return !1
        },
        CI: function() {
            null != this.transition && (this.transition.end(),
            this.ld = this.transition = null,
            this.cb == n.eu && (this.cb = n.Ll),
            this.H.Az());
            return !0
        },
        ZL: function() {
            var a, b, c = this.frame.bv;
            if (null != c) {
                a = document.createElement("canvas");
                a.width = this.ra;
                a.height = this.Ba;
                b = document.createElement("canvas");
                b.width = this.ra;
                b.height = this.Ba;
                var d = new Ha(a);
                d.Fc(0, 0, this.ra, this.Ba, this.xg);
                this.re.Ab(d, 0, 0);
                d = new Ha(b);
                0 != (c.pp & ta.rq) ? d.Fc(0, 0, this.ra, this.Ba, c.op) : d.Fc(0, 0, this.ra, this.Ba, 0);
                this.ld = document.createElement("canvas");
                this.ld.width = this.ra;
                this.ld.height = this.Ba;
                this.ld.getContext("2d").drawImage(a, 0, 0);
                this.transition = this.nv().Vl(c, this.ld, a, b);
                if (null != this.transition)
                    return this.cb = n.pq,
                    !0
            }
            this.ld = null;
            return !1
        },
        sK: function() {
            if (null != this.transition) {
                if (this.transition.mr())
                    return this.Zz(),
                    !1;
                this.transition.Tb(w.sq)
            }
            return !0
        },
        Zz: function() {
            null != this.transition && (this.ig = this.transition.m,
            this.transition.end(),
            this.ld = this.transition = null,
            this.cb == n.pq && (this.cb = n.oq));
            return !0
        },
        hK: function() {
            this.file.xa(4);
            this.Xn = this.file.o();
            this.Mh = this.file.o();
            this.file.o();
            this.file.o();
            this.ra = this.file.o();
            this.Ba = this.file.o();
            this.sA = this.file.s();
            this.rA = this.file.s();
            var a, b;
            this.nC = Array(n.og);
            for (a = 0; a < n.og; a++)
                this.nC[a] = this.file.o();
            this.Fw = Array(n.og * n.on);
            for (a = 0; a < n.og; a++)
                for (b = 0; b < n.on; b++)
                    this.Fw[a * n.on + b] = this.file.o();
            this.pA = this.file.hd();
            this.Pf = this.file.s();
            this.qA = this.file.s();
            this.file.xa(1);
            this.file.xa(3)
        },
        mK: function() {
            this.pm = this.file.o();
            this.pv = Array(this.pm);
            this.HA = Array(this.pm);
            var a;
            for (a = 0; a < this.pm; a++)
                this.pv[a] = this.file.s();
            this.file.lL(this.HA)
        },
        lK: function() {
            this.wo = this.file.s();
            this.ov = Array(this.wo);
            var a;
            for (a = 0; a < this.wo; a++)
                this.ov[a] = this.file.Nb()
        },
        jK: function(a) {
            this.Un = a / 2;
            this.Tn = Array(this.Un);
            for (a = 0; a < this.Un; a++)
                this.Tn[a] = this.file.o()
        },
        UF: function(a) {
            return null == this.Tn || -1 == a || a >= this.Un ? -1 : this.Tn[a]
        },
        kv: function(a) {
            if (this.qv) {
                var b;
                for (b = 0; b < this.qv.size(); b++)
                    if (gFont = this.qv.get(b),
                    gFont.XH(a))
                        return gFont
            }
            return a
        },
        XJ: function() {
            this.Ji = null
        },
        FJ: function() {
            var a;
            if (null == this.ma || null != this.ma && 0 == (this.$k & R.mE))
                for (this.lo = Array(n.og),
                a = 0; a < n.og; a++)
                    this.lo[a] = this.rA ^ 4294967295;
            else
                this.lo = null;
            if (null == this.ma || null != this.ma && 0 == (this.$k & R.oE))
                for (this.hp = Array(n.og),
                a = 0; a < n.og; a++)
                    this.hp[a] = this.sA ^ 4294967295;
            else
                this.hp = null;
            this.oC = Array(n.og);
            for (a = 0; a < n.og; a++)
                this.oC[a] = "";
            if (null == this.ma || null != this.ma && 0 == (this.$k & R.Nx))
                for (this.Wn = Array(this.pm),
                a = 0; a < this.pm; a++)
                    this.Wn[a] = this.pv[a];
            else
                this.Wn = null;
            if (null == this.ma || null != this.ma && 0 == (this.$k & R.Nx))
                for (this.Vn = Array(this.wo),
                a = 0; a < this.wo; a++)
                    this.Vn[a] = this.ov[a];
            else
                this.Vn = null
        },
        wA: function() {
            for (var a = this; null == a.lo; )
                a = this.ma;
            return a.lo
        },
        BA: function() {
            for (var a = this; null == a.hp; )
                a = this.ma;
            return a.hp
        },
        eJ: function() {
            for (var a = this; null != a.ma && 0 != (a.$k & R.nE); )
                a = a.ma;
            return a.Fw
        },
        kJ: function() {
            for (var a = this; null == a.Wn; )
                a = a.ma;
            return a.Wn
        },
        jJ: function() {
            for (var a = this; null == a.Vn; )
                a = a.ma;
            return a.Vn
        },
        oz: function(a) {
            var b = this.kJ();
            if (0 > a || 1E3 < a)
                return null;
            var c = b.length;
            if (a + 1 > c)
                for (; c < a + 1; c++)
                    b.push(0);
            return b
        },
        jv: function(a) {
            var b = this.oz(a);
            return null != b ? b[a] : 0
        },
        PL: function(a, b) {
            var c = this.oz(a);
            null != c && (c[a] = b)
        },
        nz: function(a) {
            var b = this.jJ();
            if (0 > a || 1E3 < a)
                return null;
            var c = b.length;
            if (a + 1 > c)
                for (; c < a + 1; c++)
                    b.push("");
            return b
        },
        uA: function(a) {
            var b = this.nz(a);
            return null != b ? b[a] : ""
        },
        OL: function(a, b) {
            var c = this.nz(a);
            null != c && (c[a] = b)
        },
        yI: function(a) {
            a && (this.JD.charCodeAt(this.rp) == a.charCode ? (this.rp++,
            this.rp == this.JD.length && (this.Cx = 250,
            this.rp = 0)) : this.rp = 0)
        },
        Sz: function(a) {
            if (a) {
                var b = a.keyCode;
                this.Kk = this.Wc[b] = !0;
                null != this.H && null != this.H.i && this.H.i.KK(b);
                for (b = 0; b < this.Ib.length; b++)
                    this.Ib[b].Sz(a)
            }
        },
        Tz: function(a) {
            if (a) {
                this.Wc[a.keyCode] = !1;
                var b;
                for (b = 0; b < this.Ib.length; b++)
                    this.Ib[b].Tz(a)
            }
        },
        Ps: function(a, b) {
            this.Jj = a;
            this.Lj = b
        },
        Kr: function(a, b, c) {
            a.pageX ? (this.Xf = a.pageX,
            this.Yf = a.pageY) : a.clientY && (this.Xf = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
            this.Yf = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            for (var d = 0, e = 0, f = b; f && "BODY" != f.tagName; )
                d += f.offsetTop,
                e += f.offsetLeft,
                f = f.offsetParent;
            this.ik = !0;
            this.Xf -= e + this.Jj;
            this.Yf -= d + this.Lj;
            this.Xf = Math.floor(this.Xf / this.pc);
            this.Yf = Math.floor(this.Yf / this.qc);
            null != this.H && null != this.H.i && this.H.i.jC();
            for (d = 0; d < this.Ib.length; d++)
                this.Ib[d].Kr(a, b);
            this.Hj || 305419896 == c || this.DD(new Ua(a.pageX,a.pageY,this.canvas))
        },
        zB: function(a) {
            var b;
            if (a.which)
                switch (a.which) {
                case 2:
                    b = n.xn;
                    break;
                case 3:
                    b = n.Ol;
                    break;
                default:
                    b = n.If
                }
            else
                switch (a.button) {
                case 2:
                    b = n.Ol;
                    break;
                case 4:
                    b = n.xn;
                    break;
                default:
                    b = n.If
                }
            this.Kr(a, this.canvas, 305419896);
            this.ik = !0;
            this.Wc[b] = !1;
            for (b = 0; b < this.Ib.length; b++)
                this.Ib[b].zB(a);
            this.Hj || this.np(new Ua(a.pageX,a.pageY,this.canvas))
        },
        xB: function(a) {
            var b;
            if (a.which)
                switch (a.which) {
                case 2:
                    b = n.xn;
                    break;
                case 3:
                    b = n.Ol;
                    break;
                default:
                    b = n.If
                }
            else
                switch (a.button) {
                case 2:
                    b = n.Ol;
                    break;
                case 4:
                    b = n.xn;
                    break;
                default:
                    b = n.If
                }
            this.Kr(a, this.canvas, 305419896);
            this.Kk = this.ik = !0;
            this.Wc[b] = !0;
            null != this.H && null != this.H.i && this.H.i.iC(b - n.If, 0 == a.detail % 2 ? 2 : 1);
            for (b = 0; b < this.Ib.length; b++)
                this.Ib[b].xB(a);
            this.Hj || this.Ws(new Ua(a.pageX,a.pageY,this.canvas))
        },
        yB: function(a) {
            this.ik = !1;
            this.Wc[n.If] = !1;
            this.Wc[n.xn] = !1;
            this.Wc[n.Ol] = !1;
            var b;
            for (b = 0; b < this.Ib.length; b++)
                this.Ib[b].yB(a);
            this.Hj || this.np(new Ua(a.pageX,a.pageY,this.canvas))
        },
        AB: function(a) {
            this.ik = !0;
            this.Mz = "undefined" != typeof a.wheelDelta ? a.wheelDelta / 40 : -a.detail;
            null != this.H && null != this.H.i && this.H.LK(this.Mz)
        },
        Ws: function(a) {
            !this.jr && this.Te && (this.Te.al(),
            this.Te = null);
            if (null != this.Cf) {
                var b, c;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var d = a.changedTouches[b];
                    for (c = 0; c < n.md; c++)
                        if (this.Cf[c] == n.ek) {
                            this.Cf[c] = d.identifier;
                            this.Pi[c] = !1;
                            for (o = 0; o < this.Bf.size(); o++)
                                if (this.Bf.get(o).hM(d)) {
                                    this.Pi[c] = !0;
                                    this.an[c] = o;
                                    break
                                }
                            if (!this.Pi[c] && (this.hh[c] = this.Zn(d),
                            this.ih[c] = this.$n(d),
                            this.qo == n.ek && d.identifier != n.dy))
                                for (this.qo = c,
                                this.Xf = this.hh[c],
                                this.Yf = this.ih[c],
                                this.Kk = this.ik = !0,
                                this.Wc[n.If] = !0,
                                null != this.H && null != this.H.i && this.H.i.iC(0, 1),
                                c = 0; c < this.Ib.length; c++)
                                    this.Ib[c].Ws(a);
                            break
                        }
                }
            }
        },
        DD: function(a) {
            if (null != this.Cf) {
                var b, c, d;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var e = a.changedTouches[b];
                    for (c = 0; c < n.md; c++)
                        if (this.Cf[c] == e.identifier) {
                            if (this.Pi[c])
                                this.Bf.get(this.an[c]).ED(e);
                            else {
                                for (d = 0; d < this.Bf.size(); d++)
                                    this.Bf.get(d).ED(e);
                                this.hh[c] = this.Zn(e);
                                this.ih[c] = this.$n(e)
                            }
                            if (this.qo == c)
                                for (this.Xf = this.hh[c],
                                this.Yf = this.ih[c],
                                null != this.H && null != this.H.i && this.H.i.jC(),
                                c = 0; c < this.Ib.length; c++)
                                    this.Ib[c].Ws(a, null);
                            break
                        }
                }
            }
        },
        np: function(a) {
            this.jr && this.Te && (this.Te.al(),
            this.Te = null);
            if (null != this.Cf) {
                var b, c, d;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var e = a.changedTouches[b];
                    for (c = 0; c < n.md; c++)
                        if (this.Cf[c] == e.identifier) {
                            this.Cf[c] = n.ek;
                            if (this.Pi[c])
                                this.Bf.get(this.an[c]).BD(e);
                            else {
                                for (d = 0; d < this.Bf.size(); d++)
                                    this.Bf.get(d).BD(e);
                                this.hh[c] = this.Zn(e);
                                this.ih[c] = this.$n(e)
                            }
                            if (c == this.qo)
                                for (this.Xf = this.hh[c],
                                this.Yf = this.ih[c],
                                this.qo = n.ek,
                                this.Wc[n.If] = !1,
                                d = 0; d < this.Ib.length; d++)
                                    this.Ib[d].np(a)
                        }
                }
            }
        },
        Zn: function(a) {
            var b = a.pageX;
            for (a = a.target; a && "BODY" != a.tagName; )
                b -= a.offsetLeft,
                a = a.offsetParent;
            return Math.floor((b - this.Jj) / this.pc)
        },
        $n: function(a) {
            var b = a.pageY;
            for (a = a.target; a && "BODY" != a.tagName; )
                b -= a.offsetTop,
                a = a.offsetParent;
            return Math.floor((b - this.Lj) / this.qc)
        },
        hJ: function(a) {
            if (null != this.xk) {
                var b;
                b = a.lastIndexOf("\\");
                0 > b && (b = a.lastIndexOf("/"));
                0 <= b && (a = a.substring(b + 1));
                for (b = 0; b < this.xk.length; b++)
                    if (this.xk[b].path == a)
                        return this.xk[b]
            }
            return null
        },
        qx: function(a) {
            this.Iz = a;
            this.canvas.style.cursor = 0 <= this.Iz ? this.cursor : "none"
        },
        xD: function(a, b) {
            null == this.Da && (this.Da = new t(this),
            this.Da.ZA(),
            this.Da.reset(b),
            this.Rh = 1,
            0 > this.Bf.indexOf(this.Da) && this.Bf.add(this.Da))
        },
        XL: function() {
            this.YL();
            this.Rh = 2
        },
        DI: function() {
            null != this.Da && (1 == this.Rh && this.Bf.HC(this.Da),
            this.Da = null);
            2 == this.Rh && this.AI();
            this.Rh = 0
        },
        YL: function() {
            if (0 == this.yn) {
                var a = this;
                window.DeviceMotionEvent && (ka.NK = function(b) {
                    a.oH = b.acceleration.y / 9.780318;
                    a.pH = b.acceleration.x / 9.780318;
                    a.qH = b.acceleration.z / 9.780318;
                    a.hu = b.accelerationIncludingGravity.y / 9.780318;
                    a.iu = b.accelerationIncludingGravity.x / 9.780318;
                    a.nH = b.accelerationIncludingGravity.z / 9.780318
                }
                )
            }
            this.yn++
        },
        AI: function() {
            this.yn--;
            0 >= this.yn && (ka.NK = null,
            this.yn = 0)
        },
        $q: function() {
            var a = 0;
            -.2 > this.hu && (a |= 4);
            .2 < this.hu && (a |= 8);
            -.2 > this.iu && (a |= 1);
            .2 < this.iu && (a |= 2);
            return a
        },
        Xu: function(a) {
            if (a.xl) {
                null == this.Te && (a.CD = 2);
                switch (a.CD) {
                case 0:
                    0 < a.hg && (a.hg -= 2,
                    0 > a.hg && (a.hg = 0,
                    phase++));
                    break;
                case 2:
                    128 > a.hg && (a.hg += 4,
                    128 <= a.hg && (a.hg = 128,
                    a.Vs = !0))
                }
                this.context.Fc(a.je.left, a.je.top, a.je.right - a.je.left, a.je.bottom - a.je.top, this.xg, 0, 0);
                a.xl.Ab(this.context, a.je.left, a.je.top, A.Ue, a.hg);
                a.Vs && (a.xl = null,
                a.je = null,
                a.$m = null)
            } else if (a.Vs = !0,
            null != this.Te) {
                a.$m = new Aa;
                a.$m.Jq();
                a.$m.lc = 24;
                var b = a.$m.lc + 6;
                a.xl = new na(this,120,b);
                var c = a.xl.measureText(this.Vv, a.$m) + 64;
                a.xl.resize(c, b);
                a.xl.gB();
                a.xl.Ir(this.Vv, p.zi | p.Rj, null, 16776960, a.$m, 2, 0);
                a.je = new ba;
                a.je.left = this.ra / 2 - c / 2;
                a.je.top = this.Ba / 2 - b / 2;
                a.je.right = a.je.left + c;
                a.je.bottom = a.je.top + b;
                a.hg = 128;
                a.CD = 0;
                a.Vs = !1;
                this.context.Fc(0, 0, this.ra, this.Ba, this.xg, 0, 0)
            }
            return a.Vs
        }
    };
    H.iG = 1;
    H.wO = 2;
    H.jG = 4;
    H.my = 32;
    H.yO = 256;
    H.xO = 2048;
    H.Uc = 32768;
    H.kG = 131072;
    H.Ap = 0;
    H.Be = 1;
    H.qE = 1;
    H.rE = 2;
    H.Dl = 6;
    H.WF = 256;
    H.ZF = 1;
    H.$F = 2;
    H.aG = 4;
    H.eG = 0;
    H.fG = 1;
    H.cG = 2;
    H.dG = 3;
    H.prototype = {
        kK: function(a) {
            this.app.file.seek(this.app.gv[a]);
            this.Pn = new G(this.app);
            this.Bd = new kd;
            this.rr = new ba;
            a = 0;
            var b;
            for (this.Gr = -1; 32639 != a; )
                if (a = this.app.file.o(),
                this.app.file.o(),
                b = this.app.file.s(),
                0 != b) {
                    this.$K = this.app.file.T + b;
                    switch (a) {
                    case 13108:
                        this.Ov();
                        null != this.app.ma && 0 != (this.app.$k & R.lE) ? (this.ko = this.app.lI,
                        this.jo = this.app.mI) : (this.ko = Math.min(this.app.ra, this.ee),
                        this.jo = Math.min(this.app.Ba, this.Xc));
                        break;
                    case 13128:
                        var c = b / 6;
                        this.po = Array(c);
                        this.vd = Array(c);
                        this.wd = Array(c);
                        for (b = this.ge = 0; b < c; b++)
                            this.po[b] = this.app.file.o(),
                            this.ge = Math.max(this.ge, this.po[b]),
                            this.vd[b] = this.app.file.o(),
                            this.wd[b] = this.app.file.o();
                        this.ge++;
                        break;
                    case 13130:
                        this.Da = this.app.file.o();
                        this.hm = this.app.file.o();
                        break;
                    case 13122:
                        this.rr.load(this.app.file);
                        break;
                    case 13124:
                        this.Gr = this.app.file.o();
                        break;
                    case 13127:
                        this.aB = this.app.file.s();
                        break;
                    case 13109:
                        this.oA = this.app.file.Nb();
                        break;
                    case 13115:
                        this.Rn = new ta;
                        this.Rn.load(this.app.file);
                        break;
                    case 13116:
                        this.bv = new ta;
                        this.bv.load(this.app.file);
                        break;
                    case 13121:
                        this.pK();
                        break;
                    case 13125:
                        this.oK();
                        break;
                    case 13112:
                        this.Bd.load(this.app);
                        break;
                    case 13117:
                        this.Pn.load(this.app),
                        this.Ig = this.Pn.Ig
                    }
                    this.app.file.seek(this.$K)
                }
            this.app.sc.wf();
            for (b = 0; b < this.Bd.Zf; b++)
                this.app.sc.Dj(this.Bd.vA(b).Vf);
            this.app.ba.wf();
            this.app.ze.wf();
            this.app.Vb.wf();
            this.app.sc.load(this.app.file);
            this.app.sc.ic(this.app.ba, this.app.Vb);
            this.app.Ma & n.yi && (this.app.Vb.ip(),
            this.app.ze.ip(),
            0 == this.app.ge && this.app.ba.ip());
            this.app.ba.load(this.app.file);
            this.app.Vb.load(this.app.file);
            this.Pn.FI(this.app.ze);
            this.app.ze.load();
            this.app.sc.yL();
            for (b = 0; b < this.Bd.Zf; b++)
                a = this.Bd.list[b],
                a.tr >= u.Jb && this.app.sc.SL(a.Vf)
        },
        pK: function() {
            this.uc = this.app.file.s();
            this.Xa = Array(this.uc);
            var a;
            for (a = 0; a < this.uc; a++)
                this.Xa[a] = new X(this.app),
                this.Xa[a].load(this.app.file)
        },
        oK: function() {
            var a;
            for (a = 0; a < this.uc; a++)
                this.Xa[a].Zd = this.app.file.s(),
                this.Xa[a].$d = this.app.file.s(),
                this.app.file.xa(12)
        },
        Ov: function() {
            this.ee = this.app.file.s();
            this.Xc = this.app.file.s();
            this.WA = this.app.file.hd();
            this.Xb = this.app.file.s()
        }
    };
    Z.rc = 32;
    Z.prototype = {
        CH: function(a) {
            null == this.sk && (this.sk = new O);
            this.sk.add(a)
        },
        qI: function() {
            if (null != this.sk && 0 < this.sk.size() && !this.Ru) {
                var a = this.sk.get(0);
                this.sk.So(0);
                this.Ru = !0;
                var b = this;
                b.context.decodeAudioData(a.response, function(c) {
                    a.buffer = c;
                    a.response = null;
                    b.app.Si(a);
                    b.Ru = !1
                })
            }
        },
        reset: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                this.Bn[a] = !1
        },
        play: function(a, b, c, d) {
            if (0 != this.$y) {
                var e = this.app.ze.pJ(a);
                if (null != e) {
                    0 == this.su && (c = 0);
                    if (0 > c) {
                        for (a = 0; a < Z.rc && (null != this.Aa[a] || 0 != this.Bn[a]); a++)
                            ;
                        if (a == Z.rc)
                            for (a = 0; a < Z.rc && (0 != this.Bn[a] || null == this.Aa[a] || 0 != this.Aa[a].En); a++)
                                ;
                        c = a;
                        0 <= c && c < Z.rc && (this.en[c] = this.dB)
                    }
                    if (!(0 > c || c >= Z.rc)) {
                        if (null != this.Aa[c]) {
                            if (1 == this.Aa[c].En)
                                return;
                            this.Aa[c] != e && (this.Aa[c].stop(),
                            this.Aa[c] = null)
                        }
                        for (a = 0; a < Z.rc; a++)
                            this.Aa[a] == e && (this.Aa[a].stop(),
                            this.Aa[a] = null);
                        this.Aa[c] = e;
                        e.play(b, d, this.en[c])
                    }
                }
            }
        },
        RL: function(a) {
            this.su = a
        },
        WJ: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                null != this.Aa[a] && this.Aa[a].Ev() && this.app.ze.Dj(this.Aa[a].handle)
        },
        Ts: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                null != this.Aa[a] && (this.Aa[a].stop(),
                this.Aa[a] = null)
        },
        dM: function(a) {
            var b;
            for (b = 0; b < Z.rc; b++)
                null != this.Aa[b] && this.Aa[b].handle == a && (this.Aa[b].stop(),
                this.Aa[b] = null)
        },
        bM: function(a) {
            0 <= a && a < Z.rc && null != this.Aa[a] && (this.Aa[a].stop(),
            this.Aa[a] = null)
        },
        TJ: function(a) {
            var b;
            for (b = 0; b < Z.rc; b++)
                if (null != this.Aa[b] && this.Aa[b].handle == a)
                    return this.Aa[b].Ev();
            return !1
        },
        LJ: function(a) {
            return 0 <= a && a < Z.rc && null != this.Aa[a] ? this.Aa[a].Ev() : !1
        },
        pause: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                null != this.Aa[a] && this.Aa[a].pause()
        },
        resume: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                null != this.Aa[a] && this.Aa[a].resume()
        },
        UL: function(a, b) {
            0 > b && (b = 0);
            100 < b && (b = 100);
            0 <= a && a < Z.rc && (this.en[a] = b,
            null != this.Aa[a] && this.Aa[a].TL(b))
        },
        qJ: function(a) {
            return 0 <= a && a < Z.rc && null != this.Aa[a] ? this.en[a] : 0
        },
        SH: function() {
            var a;
            for (a = 0; a < Z.rc; a++)
                null != this.Aa[a] && this.Aa[a].RH() && (this.Aa[a] = null)
        }
    };
    $c.prototype = {
        gi: function() {
            var a = this.app.file.o();
            this.path = this.app.file.Nb(a);
            a = this.path.lastIndexOf("\\");
            0 <= a && (this.path = this.path.substring(a + 1));
            this.length = this.app.file.s();
            this.offset = this.app.file.T;
            this.app.file.xa(this.length)
        },
        open: function() {
            return this.app.file.ug(this.offset, this.length)
        }
    };
    ad.prototype = {
        load: function() {
            return this.Dv
        },
        reset: function() {
            this.ww = this.Ne = 0;
            this.Hq = 25
        },
        step: function() {
            switch (this.Ne) {
            case 0:
                -1 != this.app.cl ? this.context.Fc(0, 0, this.app.ra, this.app.Ba, this.app.cl) : this.context.Eq(0, 0, this.app.ra, this.app.Ba);
                this.context.uj(this.Dg, this.vi - this.Dg.width / 2, this.wi - this.Dg.height / 2, this.Dg.width, this.Dg.height, 0, 0);
                this.Ne++;
                break;
            case 1:
                this.angle = this.app.Sf / this.app.ff * 2 * Math.PI;
                this.Yl(this.angle);
                this.app.Sf == this.app.ff && this.Ne++;
                break;
            case 2:
                0 < this.Hq && this.Hq--;
                0 == this.Hq && this.Ne++;
                break;
            case 3:
                this.app.Xu(this) && this.Ne++
            }
        },
        Bv: function() {
            return 4 == this.Ne
        },
        Yl: function(a) {
            var b, c, d, e, f;
            for (b = this.ww; b <= a; b += .005) {
                c = this.vi + Math.cos(b) * (this.uf - this.size);
                d = this.wi - Math.sin(b) * (this.uf - this.size);
                e = this.vi + Math.cos(b) * this.uf;
                f = this.wi - Math.sin(b) * this.uf;
                this.context.zd(c, d, e, f, this.color, 1, 0, 0);
                var g;
                for (g = 0; 3 > g; g++)
                    c = this.vi + Math.cos(b) * (this.uf - this.size - g),
                    d = this.wi - Math.sin(b) * (this.uf - this.size - g),
                    e = this.vi + Math.cos(b) * (this.uf - this.size - g - 1),
                    f = this.wi - Math.sin(b) * (this.uf - this.size - g - 1),
                    this.context.zd(c, d, e, f, this.color, 1, 0, 0),
                    c = this.vi + Math.cos(b) * (this.uf + g),
                    d = this.wi - Math.sin(b) * (this.uf + g),
                    e = this.vi + Math.cos(b) * (this.uf + g + 1),
                    f = this.wi - Math.sin(b) * (this.uf + g + 1),
                    this.context.zd(c, d, e, f, this.color, 1, 0, 0)
            }
            this.ww = a
        }
    };
    bd.prototype = {
        load: function() {
            return !0
        },
        reset: function() {
            this.js = !1;
            this.Ne = 0;
            this.alpha = 128;
            this.position = 0
        },
        step: function() {
            if (this.app.Sf < this.app.ff)
                switch (this.Ne) {
                case 0:
                    0 < this.alpha && (this.alpha -= 2,
                    0 >= this.alpha && (this.alpha = 0,
                    this.Ne++))
                }
            else
                switch (this.Ne) {
                case 0:
                case 1:
                    this.Ne = 2;
                    break;
                case 2:
                    128 > this.alpha && (this.alpha += 4);
                    128 <= this.alpha && (this.alpha = 128,
                    null == this.app.Te ? this.js = !0 : this.Ne++);
                    break;
                default:
                    this.js = this.app.Xu(this);
                    return
                }
            this.context.Fc(this.rect.left, this.rect.top, this.width, this.height, this.MH, A.Ue, this.alpha);
            this.context.ss(this.rect.left, this.rect.top, this.width, this.height, this.borderColor, 1, A.Ue, this.alpha);
            this.position = this.app.Sf / this.app.ff * (this.width - 2);
            this.context.Fc(this.rect.left + 1, this.rect.top + 1, this.position, this.height - 2, this.NH, A.Ue, this.alpha)
        },
        Bv: function() {
            return this.js && this.app.Sf == this.app.ff
        }
    };
    cd.prototype = {
        load: function() {
            this.step();
            return !this.C.Fg
        },
        reset: function() {
            this.C.H.dA();
            this.C.H.Fv();
            this.C.H.ft(!1);
            this.C.H.Fm(-1, !1);
            this.C.H.i.Zs();
            this.C.H.Xq();
            this.C.H.iv();
            this.C.H.A.$i = this.C.H.A.Hv = this.C.H.ll = 0;
            this.C.H.A.aj = this.C.H.A.Iv = this.C.H.ml = 0;
            this.C.MC();
            this.C.H.nu();
            this.C.H.yv();
            this.C.H.Fm(-1, !1);
            this.C.H.Iw();
            this.C.H.Mu(!1);
            this.C.H.Yu();
            this.C.H.Nv();
            this.C.H.i.Jw();
            this.C.H.i.zq(this.C.H);
            this.C.H.av();
            this.C.H.Aq();
            this.C.H.wb = 0;
            this.C.H.Vm = 0;
            this.C.ti = !1;
            this.app.Ib.push(this.C);
            this.Xl = 0
        },
        step: function() {
            this.C.ti || (this.cM && (this.C.ti = this.app.Sf == this.app.ff),
            0 == this.C.lp() && (this.C.ti = !0),
            this.C.Uz(this.context, this.Nc.x, this.Nc.y, !1));
            this.C.ti && this.app.Te && this.app.Xu(this)
        },
        Bv: function() {
            var a = this.C.ti;
            this.app.Te && (a = !1);
            if (a) {
                if (0 < this.Xl && (this.Xl--,
                0 < this.Xl))
                    return !1;
                var b;
                for (b = 0; b < this.app.Ib.length; b++)
                    if (this.app.Ib[b] == this.C) {
                        this.app.Ib.splice(b, 1);
                        break
                    }
            }
            return a
        }
    };
    t.wc = 0;
    t.Sc = 1;
    t.Tc = 2;
    t.ly = -1;
    t.md = 3;
    t.Ci = 1;
    t.lg = 2;
    t.mg = 4;
    t.ky = 8;
    t.vO = 2147483648;
    t.gG = 70;
    t.XE = 60;
    t.VE = .5;
    t.prototype = {
        ZA: function() {
            null == this.kc && (this.kc = aa.ug(this.app, "joyback.png"),
            this.pr = aa.ug(this.app, "joyfront.png"),
            this.Id = aa.ug(this.app, "fire1U.png"),
            this.ce = aa.ug(this.app, "fire2U.png"),
            this.iA = aa.ug(this.app, "fire1D.png"),
            this.jA = aa.ug(this.app, "fire2D.png"))
        },
        reset: function(a) {
            this.Na = a;
            null != this.kc && 0 != this.kc.width ? this.bD() : this.uu = !0;
            this.Eg = this.SA ? t.gG * Math.PI / 180 : t.XE * Math.PI / 180
        },
        bD: function() {
            var a, b;
            a = this.app.ra;
            b = this.app.Ba;
            0 == (this.Na & t.ky) ? (0 != (this.Na & t.Ci) && (this.cc[t.wc] = 16 + this.kc.width / 2,
            this.dc[t.wc] = b - 16 - this.kc.height / 2),
            0 != (this.Na & t.lg) && 0 != (this.Na & t.mg) ? (this.cc[t.Sc] = a - this.Id.width / 2 - 32,
            this.dc[t.Sc] = b - this.Id.height / 2 - 16,
            this.cc[t.Tc] = a - this.ce.width / 2 - 16,
            this.dc[t.Tc] = b - this.ce.height / 2 - this.Id.height - 24) : 0 != (this.Na & t.lg) ? (this.cc[t.Sc] = a - this.Id.width / 2 - 16,
            this.dc[t.Sc] = b - this.Id.height / 2 - 16) : 0 != (this.Na & t.mg) && (this.cc[t.Tc] = a - this.ce.width / 2 - 16,
            this.dc[t.Tc] = b - this.ce.height / 2 - 16)) : (0 != (this.Na & t.Ci) && (this.cc[t.wc] = a - 16 - this.kc.width / 2,
            this.dc[t.wc] = b - 16 - this.kc.height / 2),
            0 != (this.Na & t.lg) && 0 != (this.Na & t.mg) ? (this.cc[t.Sc] = this.Id.width / 2 + 16 + 2 * this.ce.width / 3,
            this.dc[t.Sc] = b - this.Id.height / 2 - 16,
            this.cc[t.Tc] = this.ce.width / 2 + 16,
            this.dc[t.Tc] = b - this.ce.height / 2 - this.Id.height - 24) : 0 != (this.Na & t.lg) ? (this.cc[t.Sc] = this.Id.width / 2 + 16,
            this.dc[t.Sc] = b - this.Id.height / 2 - 16) : 0 != (this.Na & t.mg) && (this.cc[t.Tc] = this.ce.width / 2 + 16,
            this.dc[t.Tc] = b - this.ce.height / 2 - 16))
        },
        gc: function(a, b) {
            0 != (a & t.Ci) ? this.cc[t.wc] = b : 0 != (a & t.lg) ? this.cc[t.Sc] = b : 0 != (a & t.mg) && (this.cc[t.Tc] = b)
        },
        hc: function(a, b) {
            0 != (a & t.Ci) ? this.dc[t.wc] = b : 0 != (a & t.lg) ? this.dc[t.Sc] = b : 0 != (a & t.mg) && (this.dc[t.Tc] = b)
        },
        Ab: function(a) {
            this.uu && (this.uu = !1,
            this.bD());
            var b, c;
            0 != (this.Na & t.Ci) && (b = this.cc[t.wc] - this.kc.width / 2,
            c = this.dc[t.wc] - this.kc.height / 2,
            a.Oe(this.kc, b, c, 0, 1, 1, 0, 0),
            b = this.cc[t.wc] + this.Tf - this.pr.width / 2,
            c = this.dc[t.wc] + this.Uf - this.pr.height / 2,
            a.Oe(this.pr, b, c, 0, 1, 1, 0, 0));
            if (0 != (this.Na & t.lg)) {
                var d = 0 == (this.Da & 16) ? this.Id : this.iA;
                b = this.cc[t.Sc] - d.width / 2;
                c = this.dc[t.Sc] - d.height / 2;
                a.Oe(d, b, c, 0, 1, 1, 0, 0)
            }
            0 != (this.Na & t.mg) && (d = 0 == (this.Da & 32) ? this.ce : this.jA,
            b = this.cc[t.Tc] - d.width / 2,
            c = this.dc[t.Tc] - d.height / 2,
            a.Oe(d, b, c, 0, 1, 1, 0, 0))
        },
        hM: function(a) {
            var b = !1
              , c = this.app.Zn(a)
              , d = this.app.$n(a);
            this.VA = t.VE * Math.ceil(Math.sqrt(this.kc.width / 2 * this.kc.width / 2 + this.kc.height / 2 * this.kc.height / 2));
            this.gf = Math.ceil(Math.sqrt(this.kc.width / 4 * this.kc.width / 4 + this.kc.height / 4 * this.kc.height / 4));
            c = this.getKey(c, d);
            c != t.ly && (this.touches[c] = a.identifier,
            c == t.wc && (this.Da &= 240,
            b = !0),
            c == t.Sc ? (this.Da |= 16,
            b = !0) : c == t.Tc && (this.Da |= 32,
            b = !0));
            return b
        },
        ED: function(a) {
            var b = this.app.Zn(a)
              , c = this.app.$n(a);
            if (this.getKey(b, c) == t.wc && a.identifier == this.touches[t.wc] && (this.Tf = b - this.cc[t.wc],
            this.Uf = c - this.dc[t.wc],
            a = (2 * Math.PI - Math.atan2(this.Uf, this.Tf)) % (2 * Math.PI),
            this.Da &= 240,
            b = Math.sqrt(this.Tf * this.Tf + this.Uf * this.Uf),
            this.SA ? (this.Tf = Math.cos(a) * this.gf,
            this.Uf = Math.sin(a) * -this.gf) : (this.Tf < -this.gf && (this.Tf = -this.gf),
            this.Tf > this.gf && (this.Tf = this.gf),
            this.Uf < -this.gf && (this.Uf = -this.gf),
            this.Uf > this.gf && (this.Uf = this.gf)),
            b > this.VA && b < 3 * this.gf)) {
                b = 0;
                if (0 <= a)
                    for (; ; ) {
                        if (this.Ph(a, 0, this.Eg) || this.Ph(a, 2 * Math.PI, this.Eg)) {
                            b = 8;
                            break
                        }
                        if (this.Ph(a, Math.PI / 2, this.Eg)) {
                            b = 1;
                            break
                        }
                        if (this.Ph(a, Math.PI, this.Eg)) {
                            b = 4;
                            break
                        }
                        if (this.Ph(a, Math.PI / 4 * 6, this.Eg)) {
                            b = 2;
                            break
                        }
                        if (this.Ph(a, Math.PI / 4, Math.PI / 2 - this.Eg)) {
                            b = 9;
                            break
                        }
                        if (this.Ph(a, Math.PI / 4 * 3, Math.PI / 2 - this.Eg)) {
                            b = 5;
                            break
                        }
                        if (this.Ph(a, Math.PI / 4 * 5, Math.PI / 2 - this.Eg)) {
                            b = 6;
                            break
                        }
                        if (this.Ph(a, Math.PI / 4 * 7, Math.PI / 2 - this.Eg)) {
                            b = 10;
                            break
                        }
                        break
                    }
                this.Da |= b
            }
        },
        Ph: function(a, b, c) {
            return a > b - c / 2 && a < b + c / 2
        },
        BD: function(a) {
            var b;
            for (b = 0; b < t.md; b++)
                if (this.touches[b] == a.identifier) {
                    this.touches[b] = 0;
                    switch (b) {
                    case t.wc:
                        this.Uf = this.Tf = 0;
                        this.Da &= 240;
                        break;
                    case t.Sc:
                        this.Da &= -17;
                        break;
                    case t.Tc:
                        this.Da &= -33
                    }
                    break
                }
        },
        getKey: function(a, b) {
            return 0 != (this.Na & t.Ci) && a >= this.cc[t.wc] - this.kc.width / 2 && a < this.cc[t.wc] + this.kc.width / 2 && b > this.dc[t.wc] - this.kc.height / 2 && b < this.dc[t.wc] + this.kc.height / 2 ? t.wc : 0 != (this.Na & t.lg) && a >= this.cc[t.Sc] - this.Id.width / 2 && a < this.cc[t.Sc] + this.Id.width / 2 && b > this.dc[t.Sc] - this.Id.height / 2 && b < this.dc[t.Sc] + this.Id.height / 2 ? t.Sc : 0 != (this.Na & t.mg) && a >= this.cc[t.Tc] - this.ce.width / 2 && a < this.cc[t.Tc] + this.ce.width / 2 && b > this.dc[t.Tc] - this.ce.height / 2 && b < this.dc[t.Tc] + this.ce.height / 2 ? t.Tc : t.ly
        },
        $q: function() {
            return this.Da
        }
    };
    l.$N = 2;
    l.EF = 4;
    l.nn = 16;
    l.FF = 32;
    l.HF = 64;
    l.GF = 128;
    l.Bt = 512;
    l.DN = 2;
    l.FN = 4;
    l.HN = 8;
    l.EN = 16;
    l.CN = 32;
    l.IN = 64;
    l.GN = 128;
    l.JN = 256;
    l.ey = 480;
    l.fy = 300;
    l.hn = 64;
    l.jn = 16;
    l.CQ = 1;
    l.EQ = 2;
    l.DQ = 4;
    l.cu = 1;
    l.SP = 2;
    l.RP = 4;
    l.TP = 8;
    l.Fy = 0;
    l.gq = 1;
    l.qg = 2;
    l.$t = 3;
    l.FG = 4;
    l.HE = 1;
    l.gn = 2;
    l.Tx = 4;
    l.Sx = 8;
    l.Rp = 10;
    l.Qp = 1;
    l.Ht = 2;
    l.Pp = 3;
    l.oy = 4;
    l.BO = 5;
    l.CO = 6;
    l.zO = 7;
    l.DO = 8;
    l.AO = 9;
    l.Op = -2;
    l.nG = 100;
    l.oG = 101;
    l.oh = 1;
    l.ph = 2;
    l.qh = 4;
    l.nh = 8;
    l.jE = 15;
    l.Jt = 128;
    l.Ef = 2147483647;
    l.vt = 1110591041;
    l.fu = 1110594637;
    l.RG = 1110600435;
    l.It = 1110874198;
    l.nq = 1110634490;
    l.fn = 1110590791;
    l.WK = [0, 0, 0, 0, 255, 0, 0, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 255, 255];
    l.Qy = [0, l.oh, l.ph, 0, l.qh, l.qh + l.oh, l.qh + l.ph, 0, l.nh, l.nh + l.oh, l.nh + l.ph, 0, 0, 0, 0, 0];
    l.Zy = !1;
    l.nk = function(a, b, c) {
        switch (c) {
        case 0:
            return a == b;
        case 1:
            return a != b;
        case 2:
            return a <= b;
        case 3:
            return a < b;
        case 4:
            return a >= b;
        case 5:
            return a > b
        }
        return !1
    }
    ;
    l.Ju = function(a, b, c) {
        switch (c) {
        case 0:
            return a == b;
        case 1:
            return a != b;
        case 2:
            return a <= b;
        case 3:
            return a < b;
        case 4:
            return a >= b;
        case 5:
            return a > b
        }
        return !1
    }
    ;
    l.yR = function(a) {
        a = a.Ha >= u.ng ? a.ext.AA() : a.yg();
        null == a && (a = new eb);
        return a
    }
    ;
    l.kS = function(a, b, c) {
        a.Ha >= u.ng ? a.ext.cD(b, c) : a.ul(b, c)
    }
    ;
    l.AR = function(a) {
        return a.Ha >= u.ng ? 0 : a.Yq()
    }
    ;
    l.lS = function(a, b) {
        a.Ha >= u.ng || a.Ns(b)
    }
    ;
    l.EK = function(a) {
        null != a.F && (a.F.iw(),
        a.F.Y |= A.Bh,
        a.F.Hs = 0)
    }
    ;
    l.DK = function(a) {
        null != a.F && (a.F.Rr(),
        a.F.Y &= ~A.Bh,
        a.F.Hs = 0)
    }
    ;
    l.gc = function(a, b) {
        null != a.B ? a.B.ta.gc(b) : a.v != b && (a.v = b,
        null != a.b && (a.b.N = !0,
        a.b.Sa = !0))
    }
    ;
    l.hc = function(a, b) {
        null != a.B ? a.B.ta.hc(b) : a.u != b && (a.u = b,
        null != a.b && (a.b.N = !0,
        a.b.Sa = !0))
    }
    ;
    l.FR = function(a, b) {
        if (0 == a)
            return 0 <= b ? 24 : 8;
        if (0 == b)
            return 0 <= a ? 0 : 16;
        var c, d = !1, e = !1;
        0 > a && (d = !0,
        a = -a);
        0 > b && (e = !0,
        b = -b);
        c = 256 * a / b;
        var f;
        for (f = 0; !(c >= N.Al[f]); f += 2)
            ;
        c = N.Al[f + 1];
        e && (c = -c + 32 & 31);
        d && (c = (-(c - 8 & 31) & 31) + 8 & 31);
        return c
    }
    ;
    l.prototype = {
        NL: function(a) {
            this.A = a
        },
        nu: function() {
            this.G = Array(this.A.Ig);
            this.i = this.A.Pn;
            this.yf = 0;
            var a;
            for (a = this.h.sc.tA(); null != a; a = this.h.sc.yA())
                a.Me >= u.Jb && this.yf++;
            this.dx = -1 == this.A.Gr ? this.h.Ad & 65535 : this.A.Gr;
            this.ql = Array(Math.round(this.A.Ig / 32 + 1));
            this.ol = new O;
            this.Yg = this.A.Ig;
            this.kx = this.i.UB;
            this.A.$i = 0;
            this.A.aj = 0;
            this.ha = this.A.$i;
            this.la = this.A.aj;
            this.Fs = this.Es = 0;
            this.Pd = this.A.rr.right;
            -1 == this.Pd && (this.Pd = 2147479552);
            this.Qd = this.A.rr.bottom;
            -1 == this.Qd && (this.Qd = 2147479552);
            this.lx = this.wb = this.pb = 0;
            this.Qc &= l.GF;
            this.Qc |= l.EF;
            this.Sm = 0;
            this.As = Array(l.Rp);
            this.xe = null;
            this.Qc |= l.HF;
            this.va = Array(l.Jt);
            this.Tm = Array(l.Jt);
            this.Bs = new wa;
            this.Bs.code = 0;
            this.ws = Array(4);
            this.cx = Array(4);
            this.vs = Array(4);
            this.ad = Array(4);
            for (a = this.Hc = 0; a < l.Rp; a++)
                this.As[a] = 50;
            this.yu = this.ks = !1;
            this.A.UC = !0
        },
        iv: function() {
            this.A.UC = !1;
            this.xe = this.ol = this.ql = this.W = this.G = null;
            var a;
            for (a = 0; a < l.Jt; a++)
                this.va[a] = 0;
            this.Bs = null
        },
        GJ: function(a) {
            this.nu();
            this.h.Rh = 0;
            if (null == this.h.ma && this.h.Hj)
                if (this.A.Da == H.dG)
                    null == this.h.Da && (this.h.Da = new t(this.h),
                    this.h.Da.ZA()),
                    this.h.Da.reset(0),
                    this.h.xD();
                else if (this.A.Da != H.eG) {
                    var b = 0;
                    0 != (this.A.hm & H.ZF) && (b = t.lg);
                    0 != (this.A.hm & H.$F) && (b |= t.mg);
                    0 != (this.A.hm & H.aG) && (b |= t.ky);
                    0 != (this.A.hm & H.rO) && (b |= t.uO);
                    this.A.Da == H.fG && (b |= t.Ci);
                    0 != (b & (t.lg | t.mg | t.Ci)) && (this.h.xD(b),
                    this.h.Da.reset(b));
                    this.A.Da == H.cG && this.h.XL()
                }
            this.ix = 255;
            a && (this.Qc |= l.nn);
            this.yv();
            this.Fm(-1, !1);
            this.Iw();
            this.Ob = 0;
            this.Mu(a);
            this.Yu();
            this.BJ();
            this.Nv();
            this.i.Jw();
            this.i.zq(this);
            this.pD();
            this.Vm = 0;
            this.av();
            this.yu = !1
        },
        Vu: function() {
            if (0 < this.fg && null == this.h.Jg)
                this.ks && (1 == this.h.Kk && (0 <= this.Cs ? this.h.Wc[this.Cs] && (this.resume(),
                this.wb = 0,
                this.i.Fe(-458755)) : this.h.Kk && (this.resume(),
                this.wb = 0,
                this.i.Fe(-458755))),
                this.h.Kk = !1),
                null != this.hs && this.hs.wJ(),
                a = this.wb;
            else {
                this.h.qu |= n.Ix;
                var a = this.WI();
                this.h.qu &= ~n.Ix;
                0 != (this.Qc & l.nn) && (this.eA = (new Date).getTime() - this.rl,
                this.ft(!0),
                this.i.Zs())
            }
            if (a == l.Qp || a == l.Ht || a == l.Pp) {
                this.h.ig = document.createElement("canvas");
                this.h.ig.width = this.h.ra;
                this.h.ig.height = this.h.Ba;
                var b = new Ha(this.h.ig);
                this.h.frame.qr ? b.Eq(0, 0, this.ra, this.Ba) : b.Fc(0, 0, this.ra, this.Ba, this.xg);
                b.Fc(0, 0, this.h.ra, this.h.Ba, this.h.xg);
                this.h.re.Ab(b, 0, 0)
            }
            if (0 != a)
                switch (a) {
                case 5:
                    this.pause();
                    this.h.Kk = !1;
                    this.ks = !0;
                    a = 0;
                    break;
                case 101:
                    if (this.A.hR)
                        break;
                    this.dA();
                    this.Fv();
                    this.ft(!1);
                    this.Fm(-1, !1);
                    this.i.Zs();
                    this.Xq();
                    this.iv();
                    this.A.$i = this.A.Hv = this.ll = 0;
                    this.A.aj = this.A.Iv = this.ml = 0;
                    this.h.MC();
                    this.nu();
                    this.yv();
                    this.Fm(-1, !1);
                    this.Iw();
                    this.Mu(!1);
                    this.Yu();
                    this.Nv();
                    this.i.Jw();
                    this.i.zq(this);
                    this.av();
                    this.pD();
                    this.Vm = a = 0;
                    break;
                case 100:
                case -2:
                    this.i.Fe(-196611)
                }
            return this.wb = a
        },
        YJ: function(a) {
            var b;
            100 < this.wb && (this.wb = l.Op);
            b = this.Vm;
            this.DL();
            this.Fv();
            this.ft(a);
            this.i.Zs();
            this.iv();
            this.Xq();
            this.Fm(-1, !0);
            this.h.DI();
            return p.rG(this.wb, b)
        },
        yv: function() {
            var a;
            for (a = 0; a < this.Yg; a++)
                this.G[a] = null
        },
        Iw: function() {
            var a, b;
            this.Qc |= l.FF;
            this.Qc |= l.Bt;
            var c = this.To = 0;
            this.W = Array(this.yf);
            this.zf = 0;
            for (a = this.h.sc.tA(); null != a; a = this.h.sc.yA())
                if (b = a.Me,
                b >= u.Jb) {
                    this.W[c] = new Q;
                    this.W[c].eI(a);
                    this.W[c].uw = c;
                    this.W[c].Io = -1;
                    if (b == u.zh || b == u.Dy)
                        for (a = this.A.Bd.Vq(); null != a; a = this.A.Bd.Ao())
                            if (a.Vf == this.W[c].Zc) {
                                this.W[c].Io = a.bj;
                                break
                            }
                    c++
                }
            this.i.aL(this.W);
            for (c = 0; c < this.A.uc; c++)
                this.A.Xa[c].gw = 1;
            return 0
        },
        Az: function() {
            var a, b, c, d, e;
            this.Qc &= ~l.nn;
            c = 0;
            for (e = this.A.Bd.Vq(); null != e; c++,
            e = this.A.Bd.Ao())
                if (a = this.h.sc.Vi(e.Vf),
                b = a.vc,
                a = a.Me,
                !(a < u.ng) && 0 == (b.Ng & D.Jy) && (d = l.Sx,
                e.Kv == Ba.Ly)) {
                    if (0 == (b.gj & D.hq)) {
                        if (a != u.zh)
                            continue;
                        d |= l.gn
                    }
                    0 == (b.Ng & D.Gy) && this.$u(e.bj, e.Vf, 2147483648, 2147483648, -1, d, -1, -1)
                }
            this.i.zq(this);
            this.rl = (new Date).getTime() - this.eA
        },
        Mu: function(a) {
            var b, c, d, e, f;
            d = 0;
            for (f = this.A.Bd.Vq(); null != f; d++,
            f = this.A.Bd.Ao())
                if (b = this.h.sc.Vi(f.Vf),
                c = b.vc,
                b = b.Me,
                e = l.Sx,
                f.Kv == Ba.Ly) {
                    b == u.zh && (e |= l.Tx);
                    if (0 == (c.gj & D.hq)) {
                        if (b == u.Dy)
                            continue;
                        e |= l.gn
                    }
                    a && b >= u.ng && 0 == (c.Ng & D.Jy) || 0 == (c.Ng & D.Gy) && this.$u(f.bj, f.Vf, 2147483648, 2147483648, -1, e, -1, -1)
                }
            this.Qc &= ~l.Bt
        },
        Fv: function() {
            var a;
            for (a = 0; a < this.Yg && 0 != this.pb; a++)
                if (null != this.G[a]) {
                    var b = this.G[a];
                    (32 > b.Ha || b.S.Dc != l.fn) && this.Tq(a, !0)
                }
            for (a = 0; a < this.Yg && 0 != this.pb; a++)
                null != this.G[a] && (b = this.G[a],
                32 <= b.Ha && b.S.Dc == l.fn && this.Tq(a, !0))
        },
        ft: function(a) {
            a || (0 == (this.h.Mh & n.KF) ? this.h.Sb.Ts() : this.h.Sb.WJ())
        },
        Fm: function(a, b) {
            var c, d;
            d = -1 == a ? this.A.uc : a + 1;
            for (c = 0; c < d; c++) {
                var e = this.A.Xa[c];
                e.reset();
                e.tI();
                b && e.Lz()
            }
        },
        Aq: function() {
            0 != this.zf && this.ZC(-1)
        },
        Xq: function() {
            0 != this.zf && this.ZC(0)
        },
        Oz: function(a) {
            var b = 0, c, d = 0;
            for (c = 0; c < this.pb; c++) {
                for (; null == this.G[d]; )
                    d++;
                var e = this.G[d];
                d++;
                e != a && e.sa & D.Hf && (e = e.S.nf.fd[e.B.cp],
                e.so == V.Yt && (b |= 1 << e.Tk - 1))
            }
            b != this.zf && (0 != this.zf && this.Xq(),
            this.zf = b,
            0 != this.zf && this.Aq())
        },
        MK: function(a) {
            var b = this.zf;
            a.sa & D.Hf && (a = a.S.nf.fd[a.B.cp],
            a.so == V.Yt && (this.zf |= 1 << a.Tk - 1,
            0 == b && this.Aq()))
        },
        ZC: function(a) {
            0 <= a ? this.h.qx(1) : this.h.qx(-1)
        },
        pD: function() {
            this.h.qx(1)
        },
        lu: function(a) {
            var b, c;
            for (c = 0; c < this.ol.size() && (b = this.ol.get(c),
            !p.xc(b.name, a)); c++)
                ;
            c == this.ol.size() && (b = new tb,
            this.ol.add(b),
            c = this.ol.size() - 1,
            b.name = a,
            b.Na = 0);
            return c
        },
        DL: function() {
            var a, b, c, d, e, f;
            for (c = 0; c < this.W.length; c++)
                if (b = this.W[c],
                f = b.lb,
                32767 != b.Zc && 0 == (f & 2147483648) && (d = this.h.sc.Vi(b.Zc),
                0 != (d.ci & u.Ky) && (a = this.G[f],
                b.gd == u.zh || b.gd == u.tn || null != a.J))) {
                    e = b.mj + b.gd.toString();
                    null == this.h.Ji && (this.h.Ji = new O);
                    var g = !1;
                    d = null;
                    for (a = 0; a < this.h.Ji.size(); a++)
                        if (d = this.h.Ji.get(a),
                        e == d.name) {
                            g = !0;
                            break
                        }
                    0 == g ? (d = new Fe,
                    d.name = e,
                    d.Le = new O,
                    this.h.Ji.add(d)) : d.Le.clear();
                    for (; ; ) {
                        a = this.G[f];
                        if (b.gd == u.zh)
                            f = new He,
                            f.text = a.Xm,
                            f.qb = a.qb,
                            d.Le.add(f);
                        else if (b.gd == u.tn)
                            f = new Ge,
                            f.value = a.wa,
                            f.qb = a.qb,
                            f.Rc = a.Rc,
                            f.Ks = a.Ks,
                            f.Js = a.Js,
                            d.Le.add(f);
                        else {
                            e = new Ie;
                            e.Na = a.J.Sd;
                            e.values = Array(a.J.Pa.length);
                            for (f = 0; f < a.J.Pa.length; f++)
                                e.values[f] = a.J.Pa[f];
                            e.$a = Array(a.J.Rd.length);
                            for (f = 0; f < a.J.Rd.length; f++)
                                e.$a[f] = a.J.Rd[f];
                            d.Le.add(e)
                        }
                        f = a.ac;
                        if (0 != (f & 2147483648))
                            break
                    }
                }
        },
        Nv: function() {
            var a, b, c, d, e, f;
            if (null != this.h.Ji)
                for (c = 0; c < this.W.length; c++)
                    if (b = this.W[c],
                    a = b.lb,
                    32767 != b.Zc && 0 <= a && (e = this.h.sc.Vi(b.Zc),
                    0 != (e.ci & u.Ky)))
                        for (f = b.mj + b.gd.toString(),
                        d = 0; d < this.h.Ji.size(); d++)
                            if (e = this.h.Ji.get(d),
                            f == e.name) {
                                for (d = 0; ; ) {
                                    a = this.G[a];
                                    if (b.gd == u.zh)
                                        f = e.Le.get(d),
                                        a.Xm = f.text,
                                        a.qb = f.qb,
                                        a.b.N = !0,
                                        a.MQ = !0;
                                    else if (b.gd == u.tn)
                                        f = e.Le.get(d),
                                        a.wa = f.value,
                                        a.qb = f.qb,
                                        a.Rc = f.Rc,
                                        a.Ks = f.Ks,
                                        a.Js = f.Js,
                                        a.JQ = !0,
                                        a.b.N = !0;
                                    else {
                                        f = e.Le.get(d);
                                        a.J.Sd = f.Na;
                                        a.J.Wi(f.values.length);
                                        a.J.uJ(f.$a.length);
                                        var g;
                                        for (g = 0; g < f.values.length; g++)
                                            a.J.Pa[g] = f.values[g];
                                        for (g = 0; g < f.$a.length; g++)
                                            a.J.Rd[g] = f.$a[g]
                                    }
                                    a = a.ac;
                                    if (0 != (a & 2147483648))
                                        break;
                                    d++;
                                    if (d >= e.Le.size())
                                        break
                                }
                                break
                            }
        },
        $u: function(a, b, c, d, e, f, g, h) {
            for (; ; ) {
                var q = new dd
                  , n = null;
                -1 != a && (n = this.A.Bd.lJ(a));
                var C = this.h.sc.Vi(b)
                  , p = C.vc;
                0 == (p.gj & D.hq) && (f |= l.gn);
                if (this.pb >= this.Yg)
                    break;
                var k = null
                  , m = new M;
                switch (C.Me) {
                case 2:
                    k = new rd;
                    break;
                case 3:
                    k = new vd;
                    break;
                case 4:
                    k = new wd;
                    break;
                case 5:
                    k = new td;
                    break;
                case 6:
                    k = new ud;
                    break;
                case 7:
                    k = new ga;
                    break;
                case 8:
                    break;
                case 9:
                    k = new R;
                    break;
                default:
                    k = new xd(C.Me,this),
                    null == k.ext && (k = null)
                }
                if (null == k)
                    break;
                k.prototype = m;
                k.gK = n;
                if (0 > h)
                    for (h = 0; h < this.Yg && null != this.G[h]; h++)
                        ;
                if (h >= this.Yg)
                    break;
                this.G[h] = k;
                this.pb++;
                k.CJ = p.Dc;
                k.sa = p.Ng;
                h > this.RC && this.ex++;
                k.bc = h;
                this.To++;
                0 == this.To && (this.To = 1);
                k.sv = this.To;
                k.ef = b;
                k.gr = a;
                k.Ha = C.Me;
                this.GK(k);
                k.c = this;
                k.ao = !0;
                k.S = p;
                a = k.Wb;
                if (null != a.qf)
                    for (C = a.uw,
                    m = 0; m < a.qf.length; m++) {
                        var u = a.qf[m], t = !1, w, r = this.i.yd[u], v = r.M.length;
                        for (w = 0; w < v; w += 2) {
                            if (0 > r.M[w + 1]) {
                                v = w;
                                break
                            }
                            if (r.M[w + 1] == C) {
                                t = !0;
                                break
                            }
                        }
                        if (!t) {
                            u = this.i.$c[u];
                            t = -1;
                            for (w = 0; w < u.M.length; w += 2)
                                if (u.M[w + 1] == C) {
                                    t = w;
                                    break
                                }
                            if (0 <= t) {
                                var E = !0;
                                if (0 <= r.M[0])
                                    for (t += 2; E && t < u.M.length; t += 2) {
                                        var B = u.M[t + 1];
                                        for (w = 0; 0 <= r.M[w + 1]; w += 2)
                                            if (r.M[w + 1] == B) {
                                                for (E = v; E > w; E -= 2)
                                                    r.M[E] = r.M[E - 2],
                                                    r.M[E + 1] = r.M[E - 1];
                                                r.M[w] = b;
                                                r.M[w + 1] = C;
                                                E = !1;
                                                break
                                            }
                                    }
                                E && (r.M[v] = b,
                                r.M[v + 1] = C)
                            }
                        }
                    }
                0 == (k.sa & D.Hy) && (k.sa &= ~D.ak,
                0 != (k.df & Q.jq) && 0 != (this.A.Xb & H.my) && (k.sa |= D.ak),
                0 != (k.df & (Q.Vd | Q.kq)) && (k.sa |= D.ak));
                b = c;
                2147483648 == b && (b = n.Lv);
                q.VH = b;
                k.v = b;
                2147483648 == d && (d = n.Mv);
                q.WH = d;
                k.u = d;
                null != n && -1 == g && (g = n.XA);
                q.sz = g;
                k.de = g;
                g = this.A.Xa[g];
                g.gw++;
                q.tz = g.gw;
                q.Fq = f;
                q.rz = e;
                q.UH = n;
                k.b = null;
                0 != (k.sa & (D.$j | D.Hf | D.bk)) && (k.b = new sd,
                k.b.$());
                k.B = null;
                0 != (k.sa & D.Hf) && (k.B = new Ia,
                0 == (q.Fq & l.HE) && k.B.$(0, k, p, q, -1));
                k.ea = null;
                0 != (k.sa & D.$j) && (k.ea = new La,
                k.ea.$(k));
                k.F = null;
                0 != (k.sa & D.bk) && (k.F = new A,
                k.F.DJ(k, p, q));
                k.J = null;
                0 != (k.sa & D.LG) && (k.J = new Na,
                k.J.$(k, p, q));
                k.$(p, q);
                0 != (k.sa & D.bk) && k.F.xv(!0);
                1 <= this.Ob && k.Gh();
                return h
            }
            return -1
        },
        Tq: function(a, b) {
            var c = this.G[a];
            if (null != c) {
                if (1 != b || 0 != c.sv)
                    this.ZJ(c),
                    null != c.B && c.B.Db(b),
                    null != c.J && c.J.Db(b),
                    null != c.F && c.F.Db(b),
                    null != c.b && c.b.Db(b),
                    c.Db(b),
                    this.FK(c);
                this.G[a] = null;
                this.pb--
            }
        },
        vg: function(a) {
            this.ql[Math.floor(a / 32)] |= 1 << (a & 31);
            this.Xo++
        },
        vI: function() {
            if (0 != this.Xo)
                for (var a = 0, b, c; a < this.Yg; ) {
                    b = this.ql[a / 32];
                    if (0 != b) {
                        for (c = this.ql[a / 32] = 0; 0 != b && 32 > c; c++) {
                            if (0 != (b & 1)) {
                                var d = this.G[a + c];
                                if (null != d && 1 == d.Wb.Rg && (this.i.td(d, d.Ha | -2162688),
                                d = d.Wb,
                                null != d.qf)) {
                                    var e = d.uw, f;
                                    for (f = 0; f < d.qf.length; f++) {
                                        var g, h = this.i.yd[d.qf[f]];
                                        for (g = 0; g < h.M.length && 0 <= h.M[g]; g += 2)
                                            if (h.M[g + 1] == e) {
                                                for (; g < h.M.length - 2 && 0 <= h.M[g]; g += 2)
                                                    h.M[g] = h.M[g + 2],
                                                    h.M[g + 1] = h.M[g + 3];
                                                g < h.M.length && (h.M[g] = -1,
                                                h.M[g + 1] = -1);
                                                break
                                            }
                                    }
                                }
                                this.Tq(a + c, !1);
                                this.Xo--
                            }
                            b >>= 1
                        }
                        if (0 == this.Xo)
                            break
                    }
                    a += 32
                }
        },
        ZJ: function(a) {
            var b = 0, c, d;
            if (0 != (a.X & M.iy))
                for (c = 0; c < this.pb; c++) {
                    for (; null == this.G[b]; )
                        b++;
                    d = this.G[b];
                    b++;
                    null != d.B && d.b.Ec == V.wG && (d = d.B.ta,
                    d.Gl == a && 1 == d.Vp && d.uD())
                }
        },
        Gh: function() {
            var a, b, c;
            for (c = a = 0; a < this.pb; a++) {
                for (; null == this.G[c]; )
                    c++;
                c++
            }
            for (c = a = 0; a < this.pb; a++) {
                for (; null == this.G[c]; )
                    c++;
                b = this.G[c];
                c++;
                b.Gh()
            }
        },
        GK: function(a) {
            var b = a.ef, c;
            for (c = 0; c < this.yf && this.W[c].Zc != b; c++)
                ;
            b = this.W[c];
            0 != (b.lb & 2147483648) ? (b.lb = a.bc,
            a.Cg = c | 2147483648,
            a.ac = 2147483648) : (c = this.G[b.lb],
            a.Cg = c.Cg,
            c.Cg = a.bc,
            a.ac = c.bc,
            b.lb = a.bc);
            a.tv = b.tw;
            a.Wb = b;
            a.df = b.Nd;
            -1 == a.gr ? a.gr = b.Io : -1 == b.Io && (b.Io = a.gr);
            b.Rg += 1
        },
        FK: function(a) {
            var b = a.Wb;
            --b.Rg;
            var c;
            0 == (a.Cg & 2147483648) ? (c = this.G[a.Cg],
            0 == (a.ac & 2147483648) ? (b = this.G[a.ac],
            null != c && (c.ac = a.ac),
            null != b && (b.Cg = a.Cg)) : null != c && (c.ac = 2147483648)) : 0 == (a.ac & 2147483648) ? (c = this.G[a.ac],
            null != c && (c.Cg = a.Cg,
            b.lb = c.bc)) : b.lb = 2147483648
        },
        UE: function() {
            var a = this.hy();
            if (null != a) {
                var b = 0, c;
                for (c = 0; c < this.pb; b++,
                c++) {
                    for (; null == this.G[b]; )
                        b++;
                    var d = this.G[b];
                    32 <= d.Ha && (d.S.Dc == l.vt || d.S.Dc == l.fu || d.S.Dc == l.RG || d.S.Dc == l.nq || d.S.Dc == l.It ? d.ext.gL() : d.S.Dc == l.fn && d.ext.gL())
                }
                for (c = b = 0; c < this.pb; b++,
                c++) {
                    for (; null == this.G[b]; )
                        b++;
                    d = this.G[b];
                    if (0 != (d.sa & D.Hf)) {
                        var e = !1;
                        d.b.Ec == V.Fi && d.S.nf.fd[d.B.cp].nr && (e = !0);
                        0 == e && 2 == d.Ha && a.fL(d)
                    }
                }
                for (c = b = 0; c < this.pb; b++,
                c++)
                    for (; null == this.G[b]; )
                        b++
            }
        },
        hy: function() {
            if (0 == this.PC) {
                this.PC = !0;
                this.pi = null;
                var a = 0, b;
                for (b = 0; b < this.pb; a++,
                b++) {
                    for (; null == this.G[a]; )
                        a++;
                    var c = this.G[a];
                    if (32 <= c.Ha && c.S.Dc == l.fn) {
                        this.pi = c.ext;
                        break
                    }
                }
            }
            return this.pi
        },
        Kp: function(a) {
            return a && 0 == (a.X & M.Df) && 0 != (a.sa & D.Hf) && a.b.Ec == V.Fi && a.S.nf.fd[a.B.cp].nr ? a.B.ta.Ld : null
        },
        FH: function(a) {
            if (a.S.Dc == l.vt || a.S.Dc == l.fu || a.S.Dc == l.It || a.S.Dc == l.nq) {
                var b = 0, c;
                for (c = 0; c < this.pb; b++,
                c++) {
                    for (; null == this.G[b]; )
                        b++;
                    var d = this.G[b];
                    32 <= d.Ha && d.S.Dc == l.fn && (a.S.Dc == l.vt ? a.ext.identifier == d.ext.identifier && d.ext.iR.add(a.ext) : a.S.Dc == l.fu ? a.ext.identifier == d.ext.identifier && d.ext.pS.add(a.ext) : a.S.Dc == l.It ? a.ext.identifier == d.ext.identifier && d.ext.KR.add(a.ext) : a.S.Dc == l.nq && a.ext.identifier == d.ext.identifier && d.ext.dS.add(a.ext))
                }
                if (a.S.Dc != l.nq)
                    for (c = b = 0; c < this.pb; b++,
                    c++) {
                        for (; null == this.G[b]; )
                            b++;
                        d = this.G[b];
                        d.Ha == u.Jb && (d = this.Kp(d)) && a.ext.UR(d)
                    }
            }
        },
        Zb: function(a) {
            return null != a.B && null != a.B.ta ? a.B.ta.Zb() : a.b.Ya
        },
        pause: function(a) {
            if (0 == this.fg) {
                this.fg = 1;
                this.NC = this.h.Ad;
                var b = 0, c;
                for (c = 0; c < this.pb; c++) {
                    for (; null == this.G[b]; )
                        b++;
                    b++
                }
                a || this.h.Sb.pause()
            }
        },
        resume: function() {
            if (!this.BK && 0 != this.fg) {
                this.fg = 0;
                this.Aq();
                var a = 0, b;
                for (b = 0; b < this.pb; b++) {
                    for (; null == this.G[a]; )
                        a++;
                    a++
                }
                this.h.Sb.resume();
                a = this.h.Ad;
                a -= this.NC;
                this.rl += a;
                this.Cs = 0;
                this.ks = !1
            }
        },
        dA: function() {
            this.h.Sb.Ts()
        },
        Mi: function() {
            var a = 0, b;
            for (b = 0; b < this.pb; b++) {
                for (; null == this.G[a]; )
                    a++;
                var c = this.G[a];
                a++;
                c.Mi()
            }
        },
        tg: function(a, b, c) {
            a = this.pM(a, b, c);
            return null != a ? a.top : l.Ef
        },
        pM: function(a, b, c) {
            b -= this.ha;
            c -= this.la;
            var d;
            -1 == a ? (d = 0,
            a = this.A.uc) : (d = a,
            a += 1);
            for (; d < a; d++) {
                var e = this.A.Xa[d].mJ(b, c);
                if (null != e)
                    return e
            }
            return null
        },
        av: function() {
            this.rl = this.h.Ad;
            this.Xo = this.lx = this.wb = this.Ob = this.Zg = 0;
            var a;
            for (a = 0; a < (this.Yg + 31) / 32; a++)
                this.ql[a] = 0;
            this.Im = this.A.ko;
            this.Jm = this.A.jo;
            this.Nm = -l.ey;
            this.Rm = -l.fy;
            this.Lm = this.Pd + l.ey;
            this.Pm = this.Qd + l.fy;
            this.ll = a = this.ha;
            a -= l.hn;
            0 > a && (a = this.Nm);
            this.Mm = a;
            this.ml = a = this.la;
            a -= l.jn;
            0 > a && (a = this.Rm);
            this.Qm = a;
            a = this.ha;
            a += this.Im + l.hn;
            a > this.Pd && (a = this.Lm);
            this.Km = a;
            a = this.la;
            a += this.Jm + l.jn;
            a > this.Qd && (a = this.Pm);
            this.Om = a;
            for (a = this.fg = this.Um = this.Wo = this.nl = 0; 4 > a; a++)
                this.ad[a] = 0,
                this.ws[a] = 0,
                this.vs[a] = 255;
            this.jl = 0;
            this.i.Bu = !1;
            this.i.Vo = !1;
            this.Cs = 0;
            this.pi = null;
            this.PC = !1;
            this.fx = this.ys = this.xs = this.QC = null;
            for (a = 0; a < l.Rp; a++)
                this.As[a] = 20;
            this.Sm = 0
        },
        WI: function() {
            this.h.Sb.SH();
            if (null != this.h.ma && this.h.Fg)
                return this.rl = this.h.Ad,
                this.Zg = 0,
                this.wb;
            if (null != this.h.Jg)
                return this.h.Jg.handle(),
                0;
            this.yu || (this.UE(),
            this.yu = !0);
            var a = this.h.Ad - this.rl
              , b = this.Zg;
            this.Zg = a;
            this.Zo = a -= b;
            this.Um += a;
            this.Ob += 1;
            this.Hc = this.Zo * this.A.aB / 1E3;
            this.As[this.Sm] = a;
            this.Sm++;
            this.Sm >= l.Rp && (this.Sm = 0);
            for (a = 0; 4 > a; a++)
                this.ws[a] = this.ad[a];
            this.VJ();
            1 == this.h.Rh ? this.ad[0] |= this.h.Da.$q() & this.ix : 2 == this.h.Rh && (this.ad[0] |= this.h.$q() & this.ix);
            if (0 != this.zf)
                for (this.lv(),
                this.jl = 0,
                this.h.Wc[n.If] && (this.jl |= 16),
                this.h.Wc[n.Ol] && (this.jl |= 32),
                a = 0; a < this.kx; a++)
                    0 != (this.LR & 1) && (b = this.ad[a] & 207,
                    b |= this.jl,
                    this.ad[a] = b);
            else
                this.lv();
            for (a = 0; 4 > a; a++)
                if (b = this.ad[a] & l.WK[4 * this.kx + a],
                b &= this.vs[a],
                this.ad[a] = b,
                b ^= this.ws[a],
                this.cx[a] = b,
                0 != b)
                    if (b &= this.ad[a],
                    0 != (b & 240))
                        this.i.SC = a,
                        b = this.cx[a],
                        0 != (b & 240) && (this.i.Ic = b,
                        this.i.Fe(-196615)),
                        0 != (b & 15) && (this.i.Ic = b,
                        this.i.Fe(-196615));
                    else {
                        var c = this.i.mc[this.i.Qe[-u.Cy] + 4];
                        0 != c && (this.i.Ic = b,
                        this.i.Ye(c, null))
                    }
            if (0 != this.pb) {
                a = this.pb;
                b = 0;
                do {
                    for (this.ex = 0; null == this.G[b]; )
                        b++;
                    c = this.G[b];
                    c.JA = c.fr;
                    c.fr = null;
                    c.ao && (this.RC = b,
                    c.handle());
                    a += this.ex;
                    b++;
                    a--
                } while (0 != a)
            }
            this.we++;
            this.i.cI();
            this.i.zJ();
            this.i.TC && 0 == (this.Qc & l.nn) && this.i.Ye(0, null);
            this.i.yJ();
            this.vI();
            this.doScroll();
            this.i.us = -1;
            this.Wo++;
            if (0 == this.wb)
                return this.lx;
            this.wb != l.Qp && this.wb != l.Ht && this.wb != l.Op && this.wb != l.Pp && this.wb != l.nG && this.wb != l.oy || this.i.Fe(-65539);
            return this.wb
        },
        VJ: function() {
            var a;
            for (a = 0; 4 > a; a++)
                this.ad[a] = 0;
            var b = this.h.eJ();
            for (a = 0; 4 > a; a++) {
                var c;
                for (c = 0; c < n.on; c++)
                    this.h.Wc[b[a * n.on + c]] && (this.ad[a] |= 1 << c)
            }
        },
        lv: function() {
            this.xj = this.h.Xf + this.ha - this.h.jg;
            this.yj = this.h.Yf + this.la - this.h.kg
        },
        $f: function(a) {
            a.B.U = !1;
            l.Zy = !1;
            a.B.bp = 0;
            var b, c;
            0 != (a.df & Q.kq) && (b = this.Qw(a.b.Vw, a.b.Xw, a.b.Ww, a.b.Yw),
            0 != b && (c = this.Qw(a.v - a.oa, a.u - a.pa, a.v - a.oa + a.L, a.u - a.pa + a.K),
            0 == c && (b ^= c,
            0 != b && (a.B.bp |= Ia.cF,
            this.i.Ic = b,
            this.i.td(a, -720896 | a.Ha & 65535)))),
            b = this.Qw(a.v - a.oa, a.u - a.pa, a.v - a.oa + a.L, a.u - a.pa + a.K),
            0 != (b & a.B.mx) && (c = a.B.U,
            0 != (b & l.oh) ? a.B.ta.gc(a.v + this.Pd) : 0 != (b & l.ph) && a.B.ta.gc(a.v - this.Pd),
            0 != (b & l.qh) ? a.B.ta.hc(a.u + this.Qd) : 0 != (b & l.nh) && a.B.ta.hc(a.u - this.Qd),
            a.b.Ec != V.Zt && a.b.Ec != V.Fi && (a.B.U = c)),
            b = this.dl(a.b.Vw, a.b.Xw, a.b.Ww, a.b.Yw),
            b != l.jE && (c = this.dl(a.v - a.oa, a.u - a.pa, a.v - a.oa + a.L, a.u - a.pa + a.K),
            b = ~b & c,
            0 != b && (a.B.bp |= Ia.dF,
            this.i.Ic = b,
            this.i.td(a, -786432 | a.Ha & 65535))));
            0 != (a.df & Q.jq) && (a.b.Ec == V.Zt ? a.B.ta.AK() : this.Fn(a, a.b.Ta, a.b.gb, a.b.Gb, a.b.Hb, a.v, a.u, 0, H.Be) && this.i.td(a, -851968 | a.Ha & 65535));
            if (0 != (a.df & Q.wn) && (b = this.sm(a, a.b.Ta, a.b.gb, a.b.Gb, a.b.Hb, a.v, a.u, a.Wb.kj),
            null != b))
                for (c = 0; c < b.size(); c++) {
                    var d = b.get(c);
                    if (0 == (d.X & M.Df)) {
                        var e = a.Ha
                          , f = a
                          , g = d;
                        f.Ha > g.Ha && (f = d,
                        g = a,
                        e = f.Ha);
                        this.i.Ic = g.ef;
                        this.i.AL = g.bc;
                        this.i.td(f, -917504 | e & 65535)
                    }
                }
            return l.Zy
        },
        sm: function(a, b, c, d, e, f, g, h) {
            var q = null;
            f -= a.oa;
            var l = f + a.L;
            g -= a.pa;
            var C = g + a.K, n, k;
            if (0 != (a.X & M.rh) || 0 != (a.X & M.Df))
                return q;
            var m = !1
              , p = null
              , t = -1;
            a.Ha == u.Jb && 0 == (a.F.Y & A.Gi) && (m = !0);
            a.Ha == u.Jb && (t = a.F.Wm);
            var w = a.X;
            a.X |= M.rh;
            var r = 0, v, E, B;
            if (null != h)
                for (r = 0; r < h.length; r += 2) {
                    v = h[r + 1];
                    if (0 > v)
                        break;
                    for (var D = this.W[v].lb; 0 == (D & 2147483648); )
                        if (v = this.G[D],
                        D = v.ac,
                        0 == (v.X & M.rh) && 0 == (v.X & M.Df) && (E = v.v - v.oa,
                        B = v.u - v.pa,
                        E < l && E + v.L > f && B < C && B + v.K > g))
                            switch (v.Ha) {
                            case u.Jb:
                                (0 > t || 0 <= t && t == v.F.Wm) && 0 != (v.F.Y & A.ck) && (0 == m || 0 != (v.F.Y & A.Gi) ? (null == q && (q = new O),
                                q.add(v)) : (null == p && (k = this.h.ba.Kb(b),
                                null != k && (p = k.Rf(0, c, d, e))),
                                k = this.h.ba.Kb(v.b.Ta),
                                null != k && (n = k.Rf(0, v.b.gb, v.b.Gb, v.b.Hb)),
                                null != p && null != n && p.Fj(f, g, 0, n, E, B, 0) && (null == q && (q = new O),
                                q.add(v))));
                                break;
                            case u.zh:
                            case u.tn:
                            case u.Ay:
                            case u.Ey:
                            case u.yy:
                                null == q && (q = new O);
                                q.add(v);
                                break;
                            default:
                                null == q && (q = new O),
                                q.add(v)
                            }
                }
            else
                for (h = 0; h < this.pb; h++) {
                    for (; null == this.G[r]; )
                        r++;
                    v = this.G[r];
                    r++;
                    if (0 == (v.X & M.rh) && (E = v.v - v.oa,
                    B = v.u - v.pa,
                    E < l && E + v.L > f && B < C && B + v.K > g))
                        switch (v.Ha) {
                        case u.Jb:
                            (0 > t || 0 <= t && t == v.F.Wm) && 0 != (v.F.Y & A.ck) && (0 == m || 0 != (v.F.Y & A.Gi) ? (null == q && (q = new O),
                            q.add(v)) : (null == p && (k = this.h.ba.Kb(b),
                            null != k && (p = k.Rf(0, c, d, e))),
                            k = this.h.ba.Kb(v.b.Ta),
                            null != k && (n = k.Rf(0, v.b.gb, v.b.Gb, v.b.Hb)),
                            null != p && null != n && p.Fj(f, g, 0, n, E, B, 0) && (null == q && (q = new O),
                            q.add(v))));
                            break;
                        case u.zh:
                        case u.tn:
                        case u.Ay:
                        case u.Ey:
                        case u.yy:
                            null == q && (q = new O);
                            q.add(v);
                            break;
                        default:
                            null == q && (q = new O),
                            q.add(v)
                        }
                }
            a.X = w;
            return q
        },
        Fn: function(a, b, c, d, e, f, g, h, q) {
            b = this.A.Xa[a.de];
            switch (a.Ha) {
            case u.Jb:
                if (0 == (a.F.Y & A.Gi)) {
                    if (a = this.h.ba.Kb(a.b.Ta),
                    null != a)
                        return a = a.Rf(K.Tj, c, d, e),
                        null != b.Fj(a, f - this.ha, g - this.la, h, q)
                } else
                    return f = f - a.oa - this.ha,
                    g = g - a.pa - this.la,
                    c = f + a.L,
                    a = g + a.K,
                    h = null != b.Us(f, g, c, a, h, q);
                return !1;
            default:
                return f = f - a.oa - this.ha,
                g = g - a.pa - this.la,
                c = f + a.L,
                a = g + a.K,
                h = null != b.Us(f, g, c, a, h, q)
            }
        },
        dl: function(a, b, c, d) {
            var e = 0;
            0 > a && (e |= l.oh);
            0 > b && (e |= l.qh);
            c > this.Pd && (e |= l.ph);
            d > this.Qd && (e |= l.nh);
            return l.Qy[e]
        },
        Qw: function(a, b, c, d) {
            var e = 15;
            a < this.Pd && (e &= ~l.ph);
            b < this.Qd && (e &= ~l.nh);
            0 < c && (e &= ~l.oh);
            0 < d && (e &= ~l.qh);
            return l.Qy[e]
        },
        random: function(a) {
            var b = 31415 * this.dx + 1;
            this.dx = b &= 65535;
            return b * a >>> 16
        },
        GA: function(a) {
            if (0 == a || -1 == a)
                return this.random(32);
            var b, c = 0, d = 0, e = a;
            for (b = 0; 32 > b; b++)
                0 != (e & 1) && (d++,
                c = b),
                e >>>= 1;
            if (1 == d)
                return c;
            d = this.random(d);
            e = a;
            for (b = 0; 32 > b; b++) {
                if (0 != (e & 1) && (d--,
                0 > d))
                    return b;
                e >>>= 1
            }
            return 0
        },
        cf: function(a) {
            this.pl = a.ia;
            this.Pc = 0;
            this.Lh = !1;
            return this.getExpression()
        },
        ab: function(a) {
            this.pl = a.ia;
            this.Pc = 0;
            this.Lh = !1;
            return this.getExpression()
        },
        dm: function(a) {
            this.pl = a.ia;
            this.Pc = 0;
            this.Lh = !1;
            return this.getExpression()
        },
        cr: function() {
            this.Lh = !1;
            var a = this.getExpression();
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        },
        getExpression: function() {
            var a, b = this.da;
            this.Tm[this.da] = this.Bs;
            do {
                this.da++;
                this.Cn = !0;
                this.pl[this.Pc].evaluate(this);
                this.Cn = !1;
                this.Pc++;
                do
                    if (a = this.pl[this.Pc],
                    0 < a.code && 1310720 > a.code)
                        a.code > this.Tm[this.da - 1].code ? (this.Tm[this.da] = a,
                        this.Pc++,
                        this.da++,
                        this.Cn = !0,
                        this.pl[this.Pc].evaluate(this),
                        this.Cn = !1,
                        this.Pc++) : (this.da--,
                        this.Tm[this.da].evaluate(this));
                    else {
                        this.da--;
                        if (this.da == b)
                            break;
                        this.Tm[this.da].evaluate(this)
                    }
                while (1)
            } while (this.da > b + 1);
            return this.va[b + 1]
        },
        xA: function(a, b) {
            var c = this.i.$e(a);
            if (null == c)
                return b ? !0 : !1;
            var d = this.i.Ee, e = 0, f, g, h, q, l, C, k = new O;
            for (f = 0; f < this.pb; f++) {
                for (; null == this.G[e]; )
                    e++;
                g = this.G[e];
                e++;
                h = g.v - g.oa;
                q = g.u - g.pa;
                l = h + g.L;
                C = q + g.K;
                this.xj >= h && this.xj < l && this.yj >= q && this.yj < C && 0 == (g.X & M.Df) && (g.Ha == u.Jb ? 0 == (g.F.Y & A.Gi) ? this.h.ba.Kb(g.b.Ta).Rf(K.Tj, 0, 1, 1).AD(this.xj - g.v, this.yj - g.u, g.b.gb, g.b.Gb, g.b.Hb) && k.add(g) : k.add(g) : k.add(g))
            }
            if (0 == k.size())
                return b ? !0 : !1;
            if (0 == b) {
                do {
                    for (e = 0; e < k.size() && (g = k.get(e),
                    g != c); e++)
                        ;
                    e == k.size() && (d--,
                    this.i.Vc());
                    c = this.i.pe()
                } while (null != c);
                return 0 != d
            }
            do {
                for (e = 0; e < k.size(); e++)
                    if (g = k.get(e),
                    g == c)
                        return !1;
                c = this.i.pe()
            } while (null != c);
            return !0
        },
        OA: function(a) {
            var b = !1
              , c = 0;
            if (0 != (a.sa & D.$j)) {
                if (null != a.F && a.F.EJ())
                    return;
                null != a.ea && a.ea.Dh(r.Mj) && (c = 1)
            }
            0 == c && (b = !0);
            b ? (a.ao = !1,
            this.vg(a.bc)) : (null != a.F && (a.F.Ms(!1),
            a.X |= M.rh),
            null != a.B && (a.B.Db(!1),
            a.B.IJ(a, V.xG, !1),
            a.b.ca = 0),
            0 != (c & 1) && (a.ea.yq(r.Mj),
            a.ea.pu()))
        },
        Yu: function() {
            var a, b = new ba, c;
            for (c = 0; c < this.A.uc; c++) {
                var d = this.A.Xa[c], e = 0 != (d.Ma & X.xt), f = 0 != (d.Ma & X.yt), g = d.Nr, h;
                for (h = 0; h < g; h++) {
                    a = this.A.Bd.vA(d.Pr + h);
                    a.tr < u.Jb && (b.left = a.Lv,
                    b.top = a.Mv);
                    var q;
                    q = new ja(this.h,b.left,b.top,a,null,0);
                    q.od(0, d);
                    e ? (q = new ja(this.h,this.A.ee + b.left,b.top,a,null,0),
                    q.od(1, d),
                    b.left + q.width > this.A.ee && (q = new ja(this.h,b.left - this.A.ee,b.top,a,null,0),
                    q.od(4, d)),
                    f && (q = new ja(this.h,b.left,this.A.Xc + b.top,a,null,0),
                    q.od(2, d),
                    q = new ja(this.h,this.A.ee + b.left,this.A.Xc + b.top,a,null,0),
                    q.od(3, d),
                    b.top + q.height > this.A.Xc && (q = new ja(this.h,b.left,b.top - this.A.Xc,a,null,0),
                    q.od(5, d)))) : f && (q = new ja(this.h,b.left,this.A.Xc + b.top,a,null,0),
                    q.od(2, d),
                    b.top + q.height > this.A.Xc && (q = new ja(this.h,b.left,b.top - this.A.Xc,a,null,0),
                    q.od(5, d)))
                }
            }
        },
        KL: function() {
            for (var a, b = this.ll, c = this.ml, d, e, f = 0; f < this.A.uc; f++) {
                a = this.A.Xa[f];
                d = b;
                e = c;
                0 != (a.Ma & (X.zt | X.At)) && (0 != (a.Ma & X.zt) && (d *= a.Ij),
                0 != (a.Ma & X.At) && (e *= a.Kj));
                d += a.qs;
                e += a.rs;
                d += a.tk;
                e += a.vk;
                var g = 0 != (a.Ma & X.yt);
                0 != (a.Ma & X.xt) && (d %= this.A.ee,
                0 > d && (d += this.A.ee));
                g && (e %= this.A.Xc,
                0 > e && (e += this.A.Xc));
                a.x = d;
                a.y = e;
                a.qs += a.tk;
                a.rs += a.vk;
                a.oc.x = -d + this.h.jg;
                a.oc.y = -e + this.h.kg;
                a.Mb.x = -d + this.h.jg;
                a.Mb.y = -e + this.h.kg;
                a.Ra.x = -d + this.h.jg;
                a.Ra.y = -e + this.h.kg
            }
            this.A.$i = b;
            this.A.aj = c
        },
        BJ: function() {
            var a;
            for (a = 0; a < this.A.uc; a++) {
                var b = this.A.Xa[a];
                b.Ma & X.Jp && b.er()
            }
        },
        ML: function(a, b, c, d) {
            a -= Math.floor(this.Im / 2);
            b -= Math.floor(this.Jm / 2);
            -1 != c && c < this.A.uc && (c = this.A.Xa[c],
            1 < c.Ij && (a -= this.ha,
            a /= c.Ij,
            a = p.sd(this.ha + a)),
            1 < c.Kj && (b -= this.la,
            b /= c.Kj,
            b = p.sd(this.la + b)));
            0 > a && (a = 0);
            0 > b && (b = 0);
            c = a + this.Im;
            var e = b + this.Jm;
            c > this.Pd && (c = this.Pd - this.Im,
            0 > c && (c = 0),
            a = c);
            e > this.Qd && (e = this.Qd - this.Jm,
            0 > e && (e = 0),
            b = e);
            0 != (d & 1) && a != this.ha && (this.ll = a,
            this.nl |= l.cu);
            0 != (d & 2) && b != this.la && (this.ml = b,
            this.nl |= l.cu)
        },
        nM: function(a, b) {
            var c = !1;
            this.Es = a - this.ha;
            this.Fs = b - this.la;
            if (0 != this.Es || 0 != this.Fs)
                c = !0;
            var d;
            if (!c)
                for (var e = 0; e < this.A.uc; e++)
                    if (d = this.A.Xa[e],
                    0 != d.tk || 0 != d.vk) {
                        c = !0;
                        break
                    }
            var e = this.ha
              , f = this.la
              , g = this.Es
              , h = this.Fs;
            this.ha = a;
            this.Mm = a - l.hn;
            0 > this.Mm && (this.Mm = this.Nm);
            this.la = b;
            this.Qm = b - l.jn;
            0 > this.Qm && (this.Qm = this.Rm);
            this.Km = a + this.Im + l.hn;
            this.Km > this.Pd && (this.Km = this.Lm);
            this.Om = b + this.Jm + l.jn;
            this.Om > this.Qd && (this.Om = this.Pm);
            if (c)
                for (var q = c = 0; q < this.pb; q++) {
                    for (; null == this.G[c]; )
                        c++;
                    var k = this.G[c];
                    c++;
                    if (0 != (k.sa & D.KG))
                        null == k.B ? (k.v += g,
                        k.u += h) : (k.B.ta.gc(k.v + g),
                        k.B.ta.hc(k.u + h));
                    else if (d = k.de,
                    d < this.A.uc) {
                        var C = e
                          , n = f
                          , p = a
                          , m = b;
                        d = this.A.Xa[d];
                        0 != (d.Ma & X.zt) && (C *= d.Ij,
                        p *= d.Ij);
                        0 != (d.Ma & X.At) && (n *= d.Kj,
                        m *= d.Kj);
                        C = k.v + C - p + g - d.tk;
                        d = k.u + n - m + h - d.vk;
                        0 == (k.sa & D.Hf) ? (k.v = C,
                        k.u = d) : (k.B.ta.gc(C),
                        k.B.ta.hc(d));
                        k.am()
                    }
                }
        },
        doScroll: function() {
            if (0 != (this.nl & l.cu)) {
                this.nl = 0;
                var a = this.A.$i != this.ll || this.A.aj != this.ml;
                if (!a)
                    for (var b = 0; b < this.A.uc; b++)
                        if (0 != this.A.Xa[b].tk || 0 != this.A.Xa[b].vk) {
                            a = !0;
                            break
                        }
                if (a)
                    for (this.KL(),
                    this.nM(this.A.$i, this.A.aj),
                    b = 0; b < this.A.uc; b++)
                        this.A.Xa[b].tk = 0,
                        this.A.Xa[b].vk = 0;
                this.ll = this.ha;
                this.ml = this.la
            }
        },
        tq: function(a, b, c, d, e, f) {
            d = this.A.Xa[d];
            var g = new ja(this.h,b - this.ha + d.x,c - this.ha + d.y,null,a,e);
            g.od(0, d);
            !f || e != da.gq && e != da.qg || null == this.pi || (g.body = this.pi.TR(pHo.v - this.ha + d.x, pHo.u - this.la + d.y, pHo.b.Ta, e));
            f = 0 != (d.Ma & X.yt);
            0 != (d.Ma & X.xt) ? (g = new ja(this.h,this.A.ee + b - this.ha + d.x,c - this.la + d.y,null,a,e),
            g.od(1, d),
            b + g.width > this.A.ee && (g = new ja(this.h,b - this.ha + d.x - this.A.ee,c - this.la + d.y,null,a,e),
            g.od(4, d)),
            f && (g = new ja(this.h,b - this.ha + d.x,this.A.Xc + c - this.la + d.y,null,a,e),
            g.od(2, d),
            g = new ja(this.h,this.A.ee + b - this.ha + d.x,this.A.Xc + c - this.la + d.y,null,a,e),
            g.od(3, d),
            c + g.height > this.A.Xc && (g = new ja(this.h,b - this.ha + d.x,c - this.la + d.y - this.A.Xc,null,a,e),
            g.od(5, d)))) : f && (g = new ja(this.h,b - this.ha + d.x,this.A.Xc + c - this.la + d.y,null,a,e),
            g.od(2, d),
            c + g.height > this.A.Xc && (g = new ja(this.h,b - this.ha + d.x,c - this.la + d.y - this.A.Xc,null,a,e),
            g.od(5, d)))
        },
        LK: function(a) {
            0 > a ? this.i.Fe(-720902) : this.i.Fe(-655366)
        },
        gA: function(a) {
            var b, c;
            if (0 != this.pb)
                for (b = 0; b < this.Yg; b++)
                    if ((c = this.G[b]) && c.Wb.mj == a)
                        return this.ev = c.Wb.Rg - 1,
                        c;
            return null
        },
        hA: function(a) {
            if (a && this.ev) {
                var b = a.bc + 1;
                a = a.Wb.mj;
                for (var c; ; ) {
                    c = this.G[b];
                    if (null != c && c.Wb.mj == a)
                        return this.ev--,
                        c;
                    b++
                }
            }
            this.ev = 0;
            return null
        }
    };
    dd.gn = 2;
    Q.JP = 15;
    Q.OG = 16;
    Q.wn = 128;
    Q.Vd = 256;
    Q.jq = 512;
    Q.kq = 1024;
    Q.KP = 2048;
    Q.lq = 4096;
    Q.NG = 65535;
    Q.prototype = {
        eI: function(a) {
            this.Zc = a.Go;
            this.gd = a.Me;
            var b = a.vc;
            this.Xk = b.gj;
            this.gC = a.nw;
            this.fC = a.ow;
            this.Wr = b.Ng;
            this.ec = 0;
            this.lb = -1;
            this.Nd = Q.NG;
            null != a.pw && (this.mj = a.pw);
            this.wm = Array(8);
            for (a = 0; 8 > a; a++)
                this.wm[a] = b.kw[a];
            this.qf = null
        }
    };
    fa.vG = 0;
    fa.QO = 1;
    fa.TO = 2;
    fa.RO = 3;
    fa.NO = 4;
    fa.OO = 5;
    fa.PO = 6;
    fa.MO = 7;
    fa.SO = 8;
    fa.UO = 9;
    fa.JO = 0;
    fa.HO = 1;
    fa.LO = 2;
    fa.IO = 3;
    fa.KO = 4;
    fa.eE = 123456789;
    fa.prototype = {
        bG: function() {
            m_currentAngle = 0
        },
        $: function(a) {
            this.R = a;
            this.O = this.R.c
        },
        Db: function() {},
        move: function() {
            return !1
        },
        setPosition: function() {},
        gc: function() {},
        hc: function() {},
        stop: function() {},
        sg: function() {},
        reverse: function() {},
        start: function() {},
        Se: function() {},
        dh: function() {},
        Af: function() {},
        Qs: function() {},
        Os: function() {},
        Tu: function(a) {
            return this.R.B.Tu(this.R, a, 32)
        },
        An: function(a) {
            this.R.b.ve = a;
            null != this.R.ea && this.R.ea.We()
        },
        $q: function(a) {
            return this.R.c.ad[a]
        },
        nx: function() {}
    };
    r.ke = 0;
    r.Lc = 1;
    r.Ae = 2;
    r.wp = 3;
    r.Mj = 4;
    r.fE = 5;
    r.Hx = 6;
    r.Gx = 7;
    r.Fx = 8;
    r.Ex = 9;
    r.it = 10;
    r.xp = 11;
    r.LM = 12;
    r.fM = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    r.prototype = {
        load: function(a) {
            var b = a.T, c = Array(32), d;
            for (d = 0; 32 > d; d++)
                c[d] = a.o();
            this.Wd = Array(32);
            this.Ch = Array(32);
            this.Li = Array(32);
            for (d = 0; 32 > d; d++)
                this.Wd[d] = null,
                this.Ch[d] = 0,
                this.Li[d] = 0,
                0 != c[d] && (this.Wd[d] = new ed,
                a.seek(b + c[d]),
                this.Wd[d].load(a))
        },
        ic: function(a) {
            var b;
            for (b = 0; 32 > b; b++)
                null != this.Wd[b] && this.Wd[b].ic(a)
        },
        LH: function(a) {
            var b, c, d, e, f;
            for (b = 0; 32 > b; b++)
                if (null == this.Wd[b]) {
                    c = 0;
                    for (e = b + 1; 32 > c; c++,
                    e++)
                        if (e &= 31,
                        null != this.Wd[e]) {
                            this.Ch[b] = e;
                            break
                        }
                    d = 0;
                    for (f = b - 1; 32 > d; d++,
                    f--)
                        if (f &= 31,
                        null != this.Wd[f]) {
                            this.Li[b] = f;
                            break
                        }
                    e == f || c < d ? this.Ch[b] |= 64 : d < c && (this.Li[b] |= 64)
                } else
                    16 > a && 0 == r.fM[a] && (this.Wd[b].ku = this.Wd[b].ju)
        }
    };
    Pa.zD = [r.wp, r.Lc, r.Ae, 0, r.Ae, r.ke, 0, 0, r.Lc, r.ke, 0, 0, r.ke, r.Lc, r.Ae, 0, r.ke, 0, 0, 0, r.ke, r.Lc, r.Ae, 0, r.ke, r.Lc, r.Ae, 0, r.Lc, r.Ae, r.ke, 0, r.ke, r.Lc, r.Ae, 0, r.Lc, r.Ae, r.ke, 0, r.ke, r.Lc, r.Ae, 0, r.ke, r.Lc, r.Ae, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Pa.prototype = {
        load: function(a) {
            var b = a.T;
            a.xa(2);
            this.Jf = a.o();
            var c = Array(this.Jf), d;
            for (d = 0; d < this.Jf; d++)
                c[d] = a.o();
            this.Kf = Array(this.Jf);
            this.Ki = Array(this.Jf);
            for (d = 0; d < this.Jf; d++)
                this.Kf[d] = null,
                this.Ki[d] = 0,
                0 != c[d] && (this.Kf[d] = new r,
                a.seek(b + c[d]),
                this.Kf[d].load(a),
                this.Ki[d] = 1);
            for (a = 0; a < this.Jf; a++)
                if (0 == this.Ki[a]) {
                    b = !1;
                    if (12 > a)
                        for (d = 0; 4 > d; d++)
                            if (0 != this.Ki[Pa.zD[4 * a + d]]) {
                                this.Kf[a] = this.Kf[Pa.zD[4 * a + d]];
                                b = !0;
                                break
                            }
                    if (0 == b)
                        for (d = 0; d < this.Jf; d++)
                            if (0 != this.Ki[d]) {
                                this.Kf[a] = this.Kf[d];
                                break
                            }
                } else
                    this.Kf[a].LH(a)
        },
        ic: function(a) {
            var b;
            for (b = 0; b < this.Jf; b++)
                0 != this.Ki[b] && this.Kf[b].ic(a)
        }
    };
    ed.prototype = {
        load: function(a) {
            this.ku = a.vb();
            this.ju = a.vb();
            this.Sy = a.o();
            this.Ty = a.o();
            this.Pl = a.o();
            this.fk = Array(this.Pl);
            var b;
            for (b = 0; b < this.Pl; b++)
                this.fk[b] = a.o()
        },
        ic: function(a) {
            var b;
            for (b = 0; b < this.Pl; b++)
                if (null != a) {
                    var c = a.wg(this.fk[b]);
                    -1 != c && (this.fk[b] = c)
                }
        }
    };
    La.ou = [r.ke, r.Lc, r.Ae, r.fE, r.Hx, r.Gx, r.Fx, r.Ex, r.it, r.xp, 12, 13, 14, 15, -1];
    La.prototype = {
        $: function(a) {
            this.a = a;
            this.Dm = 0;
            this.NA(r.Lc);
            if (this.Dh(r.wp))
                this.Dm = 1,
                this.yq(r.wp),
                this.pu(),
                this.An();
            else {
                for (a = 0; 0 <= La.ou[a] && !this.Dh(La.ou[a]); a++)
                    ;
                0 > La.ou[a] && this.Dh(r.Mj) && (this.Dm = 2,
                this.yq(r.Mj),
                this.pu(),
                this.An())
            }
        },
        NA: function(a) {
            this.a.b.ve = a;
            this.Tw = !1;
            this.tf = this.Qo = this.Bm = this.rj = this.ms = this.Vg = 0;
            this.ns = this.qj = this.ji = -1;
            this.Ro = this.ue = null;
            this.An()
        },
        We: function() {
            switch (this.Dm) {
            case 0:
                return this.An();
            case 1:
                this.IH();
                break;
            case 2:
                this.JH()
            }
            return !1
        },
        An: function() {
            var a = this.a.v;
            this.a.b.sj = a;
            a -= this.a.oa;
            this.a.b.Vw = a;
            a += this.a.L;
            this.a.b.Ww = a;
            a = this.a.u;
            this.a.b.tj = a;
            a -= this.a.pa;
            this.a.b.Xw = a;
            a += this.a.K;
            this.a.b.Yw = a;
            this.a.b.ps = this.a.b.Ta;
            this.a.b.os = this.a.b.gb;
            return this.gk(1)
        },
        gk: function(a) {
            var b = this.a.S
              , c = this.a.b.ca
              , d = this.a.b.ve;
            0 != this.rj && (c = this.rj - 1);
            d == r.Lc && (0 == c && (d = r.ke),
            75 <= c && (d = r.Ae));
            0 != this.Vg && (d = this.Vg - 1);
            d != this.ji && (this.ji = d,
            d >= b.ej.Jf && (d = b.ej.Jf - 1),
            b = b.ej.Kf[d],
            b != this.ue && (this.ue = b,
            this.ls = -1,
            this.tf = 0,
            0 == (this.a.sa & D.JG) && (this.Qo = 0)));
            var e, f = this.a.b.Ya % 32, b = !1;
            0 != this.ms && (f = this.ms - 1);
            if (this.ls != f && (this.ls = f,
            e = this.ue.Wd[f],
            null == e ? 0 != (this.ue.Li[f] & 64) ? f = this.ue.Li[f] & 63 : 0 != (this.ue.Ch[f] & 64) ? f = this.ue.Ch[f] & 63 : (e = f,
            0 > this.ns ? f = this.ue.Ch[f] & 63 : (f -= this.ns,
            f = 15 < (f & 31) ? this.ue.Ch[e] & 63 : this.ue.Li[e] & 63)) : this.ns = f,
            e = this.ue.Wd[f],
            null != this.ue.Wd[0] && 0 != (this.a.S.gj & D.GG) && (this.a.b.gb = 360 * this.ls / 32,
            e = this.ue.Wd[0],
            this.Ro = null,
            b = !0),
            this.Ro != e)) {
                this.Ro = e;
                this.el = e.Sy;
                this.BC = e.Ty;
                var f = e.ku
                  , g = e.ju;
                if (f != this.qj || g != this.Cm)
                    this.qj = f,
                    this.Cm = g,
                    this.AC = g - f,
                    this.Am = f,
                    this.Sw = -1;
                this.te = e.Pl;
                0 != this.Bm && this.Bm - 1 >= this.te && (this.Bm = 0);
                this.tf >= this.te && (this.tf = 0);
                e = e.fk[this.tf];
                0 == this.Tw && (this.a.b.Ta = e,
                e = this.a.c.h.ba.Fk(e, this.a.b.gb, this.a.b.Gb, this.a.b.Hb),
                null != e && (this.a.L = e.width,
                this.a.K = e.height,
                this.a.oa = e.Ja,
                this.a.pa = e.Fa,
                this.a.uv = e.lh,
                this.a.vv = e.mh),
                this.a.b.N = !0,
                this.a.b.Sa = !0);
                if (1 == this.te) {
                    0 == this.qj && (this.te = 0);
                    e = this.a.b.Ta;
                    if (0 == e)
                        return !1;
                    e = this.a.c.h.ba.Fk(e, this.a.b.gb, this.a.b.Gb, this.a.b.Hb);
                    null != e && (this.a.L = e.width,
                    this.a.K = e.height,
                    this.a.oa = e.Ja,
                    this.a.pa = e.Fa,
                    this.a.uv = e.lh,
                    this.a.vv = e.mh);
                    return !1
                }
            }
            if (0 == a && 0 == this.Bm || 0 == b && 0 == this.te && d != r.Mj)
                return !1;
            a = this.AC;
            c != this.Sw && (this.Sw = c,
            0 == a ? (this.Am = this.qj,
            0 != this.rj && (this.Am = this.rj - 1)) : (d = this.a.b.hb - this.a.b.li,
            0 == d ? 0 != this.rj ? (a = a * c / 100 + this.qj,
            a > this.Cm && (a = this.Cm)) : (a /= 2,
            a += this.qj) : (a = a * c / d + this.qj,
            a > this.Cm && (a = this.Cm)),
            this.Am = a));
            e = this.Ro;
            a = this.Bm;
            if (0 == a) {
                if (0 == this.Am || this.Tw)
                    return !1;
                c = this.Qo;
                a = this.tf;
                d = this.Am;
                0 != (this.a.c.A.Xb & H.Uc) && (d = Math.round(d * this.a.c.Hc));
                for (c += d; 100 < c; )
                    if (c -= 100,
                    a++,
                    a >= this.te && (a = this.BC,
                    0 != this.el && (this.el--,
                    0 == this.el))) {
                        this.tf = this.te - 1;
                        0 > this.tf && (this.tf = 0);
                        this.te = 0;
                        0 != this.Vg && (this.rj = this.ms = this.Vg = 0);
                        this.tf < e.Pl && (e = e.fk[this.tf],
                        e != this.a.b.Ta && (this.a.b.Ta = e,
                        this.a.b.N = !0,
                        this.a.b.Sa = !0));
                        this.Qo = c;
                        if (0 != (this.a.c.Qc & l.Bt))
                            return !1;
                        b && (this.a.b.N = !0,
                        this.a.b.Sa = !0,
                        e = this.a.c.h.ba.Fk(this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb),
                        null != e && (this.a.L = e.width,
                        this.a.K = e.height,
                        this.a.oa = e.Ja,
                        this.a.pa = e.Fa,
                        this.a.uv = e.lh,
                        this.a.vv = e.mh));
                        b = -131072;
                        b |= this.a.Ha & 65535;
                        this.a.c.i.Ic = this.a.ea.ji;
                        return this.a.c.i.td(this.a, b)
                    }
                this.Qo = c
            } else
                a--;
            this.tf = a;
            this.a.b.N = !0;
            this.a.b.Sa = !0;
            e = e.fk[a];
            if (this.a.b.Ta != e || this.CC != this.a.b.gb)
                this.a.b.Ta = e,
                this.CC = this.a.b.gb,
                0 <= e && (e = this.a.c.h.ba.Fk(e, this.a.b.gb, this.a.b.Gb, this.a.b.Hb),
                null != e && (this.a.L = e.width,
                this.a.K = e.height,
                this.a.oa = e.Ja,
                this.a.pa = e.Fa,
                this.a.uv = e.lh,
                this.a.vv = e.mh));
            return !1
        },
        Dh: function(a) {
            return 0 == this.a.S.ej.Ki[a] ? !1 : !0
        },
        pu: function() {
            0 == this.el && (this.el = 1)
        },
        yq: function(a) {
            this.Vg = a + 1;
            this.gk(0)
        },
        KH: function() {
            this.Vg = 0;
            this.gk(0)
        },
        HH: function(a) {
            0 > a && (a = 0);
            100 < a && (a = 100);
            this.rj = a + 1;
            this.gk(0)
        },
        IH: function() {
            this.gk(1);
            this.Vg != r.wp + 1 && (this.Dh(r.ke) || this.Dh(r.Lc) || this.Dh(r.Ae) ? (this.Dm = 0,
            this.KH()) : (this.Dm = 2,
            this.a.c.OA(this.a)))
        },
        JH: function() {
            0 == (this.a.X & M.Bi) && (this.gk(1),
            this.Vg != r.Mj + 1 && this.a.c.vg(this.a.bc))
        }
    };
    fd.prototype = {
        Uu: function() {
            var a = this.app.vj + "M" + p.Sn(this.handle, "png")
              , b = new Image;
            this.ba.Lb[this.handle] = b;
            var c = this;
            b.onload = function() {
                c.app.Si(c)
            }
            ;
            b.onerror = function() {
                c.app.Si(c)
            }
            ;
            b.src = a
        }
    };
    gd.prototype = {
        gi: function(a) {
            this.file = a;
            this.Eb = this.file.o();
            this.Wk = Array(this.Eb);
            a = this.file.o();
            var b, c, d = new aa;
            for (b = 0; b < a; b++)
                c = this.file.T,
                d.jm(this.file),
                this.Wk[d.handle] = c;
            this.Ua = Array(this.Eb);
            for (b = 0; b < this.Eb; b++)
                this.Ua[b] = 0;
            this.Ca = null;
            this.Vh = this.Eb;
            this.lf = 0;
            this.images = null
        },
        Kb: function(a) {
            return 0 <= a && a < this.Vh && -1 != this.Ca[a] ? this.images[this.Ca[a]] : null
        },
        ip: function() {
            var a;
            for (a = 0; a < this.Eb; a++)
                this.Wk[a] && (this.Ua[a] = 1)
        },
        wf: function() {
            if (0 == (this.app.Ma & n.yi) && 0 == (this.app.Ma & n.ht)) {
                var a;
                for (a = 0; a < this.Eb; a++)
                    this.Ua[a] = 0
            }
            this.ei = null
        },
        Dj: function(a) {
            this.Ua[a]++
        },
        wg: function(a) {
            this.Dj(a);
            return -1
        },
        $A: function(a) {
            null == this.Lb[a] && (null != this.ei && a < this.ei.length && null != this.ei[a] ? this.Lb[a] = this.ei[a] : (this.Lb[a] = new fd(this,a),
            this.app.zn(this.Lb[a])))
        },
        load: function(a) {
            var b;
            if (0 < this.app.ge)
                if (null == this.Lb) {
                    if (this.Lb = Array(this.app.ge),
                    this.app.Ma & n.yi)
                        for (b = 0; b < this.app.ge; b++)
                            this.app.Lb[b] && this.$A(b)
                } else if (0 == (this.app.Ma & n.yi)) {
                    this.ei = Array(this.app.ge);
                    for (b = 0; b < this.app.ge; b++)
                        this.ei[b] = this.Lb[b];
                    this.Lb = Array(this.app.ge);
                    for (b = 0; b < this.app.ge; b++)
                        this.Lb[b] = null
                }
            for (b = this.lf = 0; b < this.Eb; b++)
                0 != this.Ua[b] && this.lf++;
            b = Array(this.lf);
            var c = 0, d;
            for (d = 0; d < this.Eb; d++)
                if (0 != this.Ua[d]) {
                    if (null != this.images && -1 != this.Ca[d] && null != this.images[this.Ca[d]]) {
                        if (b[c] = this.images[this.Ca[d]],
                        b[c].Ua = this.Ua[d],
                        null != this.Lb && null != this.ei) {
                            var e = b[c].tb;
                            0 < e && (this.Lb[e] = this.ei[e])
                        }
                    } else
                        0 != this.Wk[d] && (b[c] = new aa,
                        a.seek(this.Wk[d]),
                        b[c].load(this.app),
                        b[c].Ua = this.Ua[d]);
                    c++
                }
            this.images = b;
            this.Ca = Array(this.Eb);
            for (b = 0; b < this.Eb; b++)
                this.Ca[b] = -1;
            for (b = 0; b < this.lf; b++)
                this.images[b] && (this.Ca[this.images[b].handle] = b);
            this.Vh = this.Eb
        },
        YA: function(a) {
            var b;
            for (b = 0; b < a.length; b++)
                if (0 <= a[b] && a[b] < this.Vh && 0 != this.Wk[a[b]] && null == this.Kb(a[b])) {
                    var c, d = -1;
                    for (c = 0; c < this.lf; c++)
                        if (null == this.images[c]) {
                            d = c;
                            break
                        }
                    if (-1 == d) {
                        var e = Array(this.lf + 10);
                        for (c = 0; c < this.lf; c++)
                            e[c] = this.images[c];
                        for (; c < this.lf + 10; c++)
                            e[c] = null;
                        d = this.lf;
                        this.lf += 10;
                        this.images = e
                    }
                    this.Ca[a[b]] = d;
                    this.images[d] = new aa;
                    this.images[d].Ua = 1;
                    this.file.seek(this.Wk[a[b]]);
                    this.images[d].load(this.app)
                }
        },
        Fk: function(a, b, c, d) {
            var e;
            null == this.fi && (this.fi = new aa);
            e = this.Kb(a);
            if (null != e) {
                a = e.width;
                var f = e.height
                  , g = e.Ja
                  , h = e.Fa
                  , q = e.lh;
                e = e.mh;
                0 == b ? (1 != c && (g *= c,
                q *= c,
                a *= c),
                1 != d && (h *= d,
                e *= d,
                f *= d)) : (1 != c && (g *= c,
                q *= c,
                a *= c),
                1 != d && (h *= d,
                e *= d,
                f *= d),
                null == this.ki && (this.ki = new ba),
                null == this.Jk && (this.Jk = new J),
                null == this.hk && (this.hk = new J),
                this.Jk.x = g,
                this.Jk.y = h,
                this.hk.x = q,
                this.hk.y = e,
                this.ki.left = this.ki.top = 0,
                this.ki.right = a,
                this.ki.bottom = f,
                this.zI(this.ki, this.Jk, this.hk, b),
                a = this.ki.right,
                f = this.ki.bottom,
                g = this.Jk.x,
                h = this.Jk.y,
                q = this.hk.x,
                e = this.hk.y);
                this.fi.width = a;
                this.fi.height = f;
                this.fi.Ja = g;
                this.fi.Fa = h;
                this.fi.lh = q;
                this.fi.mh = e;
                return this.fi
            }
            return e
        },
        zI: function(a, b, c, d) {
            var e, f, g;
            90 == d ? (d = 0,
            g = 1) : 180 == d ? (d = -1,
            g = 0) : 270 == d ? (d = 0,
            g = -1) : (g = d * Math.PI / 180,
            d = Math.cos(g),
            g = Math.sin(g));
            var h, q, k, l, n;
            null == b ? h = q = n = f = 0 : (k = -b.x * d,
            l = -b.x * g,
            n = -b.y * d,
            f = -b.y * g,
            h = k + f,
            q = n - l);
            e = null == b ? a.right : a.right - b.x;
            k = e * d;
            l = e * g;
            e = k + f;
            n -= l;
            var p;
            f = null == b ? a.bottom : a.bottom - b.y;
            p = k + f * g;
            f = f * d - l;
            var m, u;
            m = h + p - e;
            u = q + f - n;
            k = Math.min(h, Math.min(e, Math.min(p, m)));
            l = Math.min(q, Math.min(n, Math.min(f, u)));
            h = Math.max(h, Math.max(e, Math.max(p, m)));
            q = Math.max(q, Math.max(n, Math.max(f, u)));
            null != c && (null == b ? (e = c.x,
            f = c.y) : (e = c.x - b.x,
            f = c.y - b.y),
            c.x = e * d + f * g - k,
            c.y = f * d - e * g - l);
            null != b && (b.x = -k,
            b.y = -l);
            a.right = h - k;
            a.bottom = q - l
        }
    };
    aa.xK = 10;
    aa.Mp = 1;
    aa.ug = function(a, b) {
        var c = new aa;
        c.app = a;
        c.sb = new Image;
        c.sb.onload = function() {
            c.app.Sf++;
            c.width = c.sb.width;
            c.height = c.sb.height
        }
        ;
        a.ff++;
        a.Fg = !0;
        c.sb.src = a.vj + b;
        return c
    }
    ;
    aa.prototype = {
        jm: function(a) {
            this.handle = a.o();
            a.xa(12)
        },
        Uu: function() {
            this.sb = new Image;
            var a = this;
            this.sb.onload = function() {
                a.app.Si(a)
            }
            ;
            this.sb.onerror = function() {
                a.app.Si(a)
            }
            ;
            this.sb.src = this.app.vj + p.Sn(this.handle, "png")
        },
        load: function(a) {
            this.app = a;
            this.handle = a.file.o();
            this.width = a.file.o();
            this.height = a.file.o();
            this.Ja = a.file.V();
            this.Fa = a.file.V();
            this.lh = a.file.V();
            this.mh = a.file.V();
            this.tb = 0;
            this.sb = null;
            null != this.app.frame.po ? (this.tb = this.app.frame.po[this.handle],
            0 != this.tb ? (this.app.ba.$A(this.tb),
            this.vd = this.app.frame.vd[this.handle],
            this.wd = this.app.frame.wd[this.handle]) : this.app.zn(this)) : this.app.zn(this)
        },
        createElement: function() {
            var a = document.createElement("div");
            a.style.width = this.width + "px";
            a.style.height = this.height + "px";
            a.style.backgroundRepeat = "no-repeat";
            0 == this.tb ? a.style.backgroundImage = "url('" + this.sb.src + "')" : (a.style.backgroundPosition = "-" + this.vd + "px -" + this.wd + "px",
            a.style.backgroundImage = "url('" + this.app.vj + "M" + p.Sn(this.tb, "png") + "')");
            return a
        },
        Rf: function(a, b, c, d) {
            if (0 == (a & K.Uj)) {
                null == this.hf && (this.hf = new K,
                this.eo & aa.Mp ? this.hf.Ou(this.app, this, a) : this.hf.Nu(this.app, this, a));
                if (0 == b && 1 == c && 1 == d)
                    return this.hf;
                null == this.Th && (this.Th = new O);
                var e, f = 2147483647, g = -1;
                for (e = 0; e < this.Th.size(); e++) {
                    a = this.Th.get(e);
                    if (b == a.angle && c == a.pc && d == a.qc)
                        return a.P;
                    a.wx < f && (f = a.wx,
                    g = e)
                }
                this.Th.size() < this.xK && (g = -1);
                a = new Ve;
                a.P = new K;
                a.P.jI(this.hf, b, c, d);
                a.angle = b;
                a.pc = c;
                a.qc = d;
                a.wx = this.app.Ad;
                0 > g ? this.Th.add(a) : this.Th.set(g, a);
                return a.P
            }
            null == this.Rk && (null == this.hf && (this.hf = new K,
            this.eo & aa.Mp ? this.hf.Ou(this.app, this, 0) : this.hf.Nu(this.app, this, 0)),
            this.Rk = new K,
            this.eo & aa.Mp ? this.Rk.Ou(this.app, this, a) : this.Rk.Nu(this.app, this, a));
            return this.Rk
        }
    };
    hd.prototype = {
        gi: function(a) {
            var b = a.s(), c;
            this.fe = 0;
            var d = a.T
              , e = new Aa;
            for (c = 0; c < b; c++)
                e.jm(a),
                this.fe = Math.max(this.fe, e.handle + 1);
            a.seek(d);
            this.Ur = Array(this.fe);
            for (c = 0; c < b; c++)
                d = a.T,
                e.jm(a),
                this.Ur[e.handle] = d;
            this.Ua = Array(this.fe);
            for (c = 0; c < this.fe; c++)
                this.Ua[c] = 0;
            this.Ca = null;
            this.Hg = this.fe;
            this.Uh = 0;
            this.fonts = null
        },
        load: function(a) {
            var b;
            for (b = this.Uh = 0; b < this.fe; b++)
                0 != this.Ua[b] && this.Uh++;
            b = Array(this.Uh);
            var c = 0, d;
            for (d = 0; d < this.fe; d++)
                0 != this.Ua[d] && (null != this.fonts && -1 != this.Ca[d] && null != this.fonts[this.Ca[d]] ? b[c] = this.fonts[this.Ca[d]] : (b[c] = new Aa,
                a.seek(this.Ur[d]),
                b[c].load(a)),
                b[c].Ua = this.Ua[d],
                c++);
            this.fonts = b;
            this.Ca = Array(this.fe);
            for (b = 0; b < this.fe; b++)
                this.Ca[b] = -1;
            for (b = 0; b < this.Uh; b++)
                this.Ca[this.fonts[b].handle] = b;
            this.Hg = this.fe
        },
        Qf: function(a) {
            return -1 == a ? this.Bo : 0 <= a && a < this.Hg && -1 != this.Ca[a] ? this.fonts[this.Ca[a]] : null
        },
        Zq: function(a) {
            return this.Qf(a).iJ()
        },
        wf: function() {
            if (0 == (this.app.eR & n.yi) && 0 == (this.app.Ma & n.ht)) {
                var a;
                for (a = 0; a < this.fe; a++)
                    this.Ua[a] = 0
            }
        },
        ip: function() {
            var a;
            for (a = 0; a < this.fe; a++)
                this.Ur[a] && (this.Ua[a] = 1)
        },
        Dj: function(a) {
            -1 == a ? null == this.Bo && (this.Bo = new Aa,
            this.Bo.Jq()) : this.Ua[a]++
        },
        wg: function(a) {
            this.Dj(a);
            return -1
        },
        wq: function(a) {
            var b, c;
            for (c = 0; c < this.Uh && (null == this.fonts[c] || this.fonts[c].lc != a.lc || this.fonts[c].Je != a.Je || this.fonts[c].Ie != a.Ie || this.fonts[c].He != a.He); c++)
                ;
            if (c < this.Uh)
                return this.fonts[c].handle;
            c = -1;
            for (b = this.fe; b < this.Hg && -1 != this.Ca[b]; b++)
                ;
            if (-1 == c) {
                var d = Array(this.Hg + 10);
                for (b = 0; b < this.Hg; b++)
                    d[b] = this.Ca[b];
                for (; b < this.Hg + 10; b++)
                    d[b] = -1;
                c = this.Hg;
                this.Hg += 10;
                this.Ca = d
            }
            d = -1;
            for (b = 0; b < this.Uh; b++)
                if (null == this.fonts[b]) {
                    d = b;
                    break
                }
            -1 == d && (d = this.Uh,
            this.fonts.push(null));
            this.Ca[c] = d;
            this.fonts[d] = new Aa;
            this.fonts[d].handle = c;
            this.fonts[d].lc = a.lc;
            this.fonts[d].Je = a.Je;
            this.fonts[d].Ie = a.Ie;
            this.fonts[d].He = a.He;
            return c
        }
    };
    Aa.prototype = {
        jm: function(a) {
            this.handle = a.s();
            0 == a.pd ? a.xa(72) : a.xa(104)
        },
        load: function(a) {
            this.handle = a.s();
            var b = a.T;
            a.xa(12);
            this.lc = a.s();
            0 > this.lc && (this.lc = -this.lc);
            a.s();
            a.s();
            a.s();
            this.Je = a.s();
            this.Ie = a.vb();
            a.vb();
            a.vb();
            a.vb();
            a.vb();
            a.vb();
            a.vb();
            a.vb();
            this.He = a.Nb();
            0 == a.pd ? a.seek(b + 72) : a.seek(b + 104)
        },
        iJ: function() {
            var a = new eb;
            a.lc = this.lc;
            a.Je = this.Je;
            a.Ie = this.Ie;
            a.He = this.He;
            return a
        },
        Jq: function() {
            this.He = "Arial";
            this.lc = 13;
            this.Je = 400;
            this.Ie = 0
        },
        bf: function() {
            return this.lc + Math.ceil(this.lc / 8)
        },
        yg: function() {
            if (null == this.font) {
                this.font = this.Ie ? "italic " : "normal ";
                var a = 100 * Math.floor(this.Je / 100)
                  , a = Math.max(a, 100)
                  , a = Math.min(a, 900);
                this.font += a + " ";
                this.font += this.lc + "px ";
                this.font += this.He
            }
            return this.font
        }
    };
    id.prototype = {
        gi: function(a) {
            this.file = a;
            this.Eb = this.file.o();
            this.Vr = Array(this.Eb);
            this.Ua = Array(this.Eb);
            this.Ca = Array(this.Eb);
            for (a = 0; a < this.Eb; a++)
                this.Ua[a] = 0,
                this.Ca[a] = -1;
            var b = this.file.o(), c = new Va(this.app), d;
            for (a = 0; a < b; a++)
                d = this.file.T,
                c.jm(),
                this.Vr[c.handle] = d;
            this.Vh = this.Eb;
            this.yo = 0;
            this.Ej = null
        },
        pJ: function(a) {
            return 0 <= a && a < this.Vh && -1 != this.Ca[a] ? this.Ej[this.Ca[a]] : null
        },
        ar: function(a) {
            for (var b = 0; b < this.Vh; b++)
                if (-1 != this.Ca[b] && this.Ej[this.Ca[b]].name == a)
                    return b;
            return -1
        },
        wf: function() {
            if (0 == (this.app.Ma & n.yi) && 0 == (this.app.Ma & n.ht)) {
                var a;
                for (a = 0; a < this.Eb; a++)
                    this.Ua[a] = 0
            }
        },
        ip: function() {
            var a;
            for (a = 0; a < this.Eb; a++)
                this.Vr[a] && (this.Ua[a] = 1)
        },
        Dj: function(a) {
            this.Ua[a]++
        },
        wg: function(a) {
            this.Dj(a);
            return -1
        },
        load: function() {
            var a;
            for (a = this.yo = 0; a < this.Eb; a++)
                0 != this.Ua[a] && this.yo++;
            a = Array(this.yo);
            var b = 0, c;
            for (c = 0; c < this.Eb; c++)
                0 != this.Ua[c] && (null != this.Ej && -1 != this.Ca[c] && null != this.Ej[this.Ca[c]] ? a[b] = this.Ej[this.Ca[c]] : (a[b] = new Va(this.app),
                this.file.seek(this.Vr[c]),
                a[b].load()),
                a[b].Ua = this.Ua[c],
                b++);
            this.Ej = a;
            this.Ca = Array(this.Eb);
            for (a = 0; a < this.Eb; a++)
                this.Ca[a] = -1;
            for (a = 0; a < this.yo; a++)
                this.Ca[this.Ej[a].handle] = a;
            this.Vh = this.Eb;
            this.wf()
        }
    };
    Va.prototype = {
        jm: function() {
            this.handle = this.file.o();
            this.file.xa(5);
            var a = this.file.o();
            0 == this.file.pd ? this.file.xa(a) : this.file.xa(2 * a)
        },
        Uu: function() {
            var a, b = this.Ub.Sb.Lw & this.type;
            0 == b && (b = this.Ub.Sb.Wv & this.type);
            for (a = 0; 4 > a && !(b & 1 << a); a++)
                ;
            if (4 > a) {
                b = "";
                switch (a) {
                case 0:
                    b = "ogg";
                    break;
                case 1:
                    b = "m4a";
                    break;
                case 2:
                    b = "mp3";
                    break;
                case 3:
                    b = "wav"
                }
                if (this.context) {
                    var c = this
                      , d = new XMLHttpRequest;
                    d.open("GET", this.Ub.vj + p.Sn(this.handle, b), !0);
                    d.responseType = "arraybuffer";
                    d.addEventListener("load", function() {
                        c.response = d.response;
                        c.Ub.Sb.CH(c)
                    });
                    d.send()
                } else
                    this.rb = new Audio,
                    this.rb.QR = "auto",
                    c = this,
                    this.rb.addEventListener("loadeddata", function(a) {
                        c.Ub.Si(c);
                        c.rb.removeEventListener("loadeddata", arguments.callee, !1)
                    }, !1),
                    this.rb.addEventListener("error", function() {
                        c.Ub.Si(c);
                        c.rb = null
                    }, !1),
                    this.rb.src = this.Ub.vj + p.Sn(this.handle, b),
                    this.rb.load(),
                    this.rb.autoplay = !1
            } else
                this.Ub.Si(this)
        },
        load: function() {
            this.handle = this.file.o();
            this.type = this.file.vb();
            this.In = this.frequency = this.file.s();
            var a = this.file.o();
            this.name = this.file.Nb(a);
            this.rb = null;
            this.Ub.zn(this)
        },
        qK: function() {
            this.handle = 9999;
            this.type = 4;
            this.In = this.frequency = 4E4;
            this.name = "";
            this.rb = null;
            this.Ub.zn(this)
        },
        al: function(a, b) {
            a || (a = 0);
            b || (b = this.frequency);
            if (this.rb)
                this.rb.volume = this.volume / 100,
                this.In = b,
                this.rb.playbackRate = b / this.frequency,
                this.rb.duration && (this.rb.currentTime = 0),
                this.rb.play();
            else if (this.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.buffer;
                0 == this.Ul ? (this.source.gain.value = this.volume / 100,
                this.source.connect(this.context.destination)) : (this.gain = this.context.createGain(),
                this.source.connect(this.gain),
                this.gain.connect(this.context.destination),
                this.gain.gain.value = this.volume / 100);
                a || (a = 0);
                b || (b = this.frequency);
                this.In = b;
                this.source.playbackRate.value = b / this.frequency;
                this.startTime = Date.now() - a;
                "undefined" !== typeof this.source.start ? this.source.start(0, a / 1E3) : this.source.noteOn(a);
                var c = this;
                this.source.onended = function() {
                    c.Yy = !0
                }
            }
            this.jk = !1;
            this.Oi = !0;
            this.Yy = !1
        },
        play: function(a, b, c) {
            this.Wh = a;
            0 == this.Wh && (this.Wh = 1E7);
            this.volume = c;
            this.al()
        },
        stop: function() {
            this.rb ? this.rb.pause() : this.source && this.Oi && ("undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0),
            this.source.onended = null);
            this.Oi = this.En = !1
        },
        TL: function(a) {
            this.volume = a;
            this.rb ? this.rb.volume = a / 100 : this.source && (this.gain ? this.gain.gain.value = a / 100 : this.source.gain.value = a / 100)
        },
        pause: function() {
            this.jk || (this.rb ? this.rb.pause() : this.source && (this.source.onended = null,
            "undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0),
            this.TK = Date.now() - this.startTime),
            this.jk = !0)
        },
        resume: function() {
            this.jk && (this.rb ? this.rb.play() : this.source && this.al(this.TK),
            this.jk = !1)
        },
        RJ: function() {
            return this.jk
        },
        Ev: function() {
            return (this.rb || this.source) && this.Oi ? !0 : !1
        },
        setPosition: function(a) {
            this.rb ? this.rb.currentTime = a / 1E3 : this.source && (this.Oi && (this.source.onended = null,
            "undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0)),
            this.al(a))
        },
        RH: function() {
            if (1 == this.Oi && 0 == this.jk)
                if (this.rb) {
                    if (this.rb.ended) {
                        if (0 < this.Wh && (this.Wh--,
                        0 < this.Wh))
                            return this.al(0, this.In),
                            !1;
                        this.Oi = this.En = !1;
                        return !0
                    }
                } else if (this.source && (3 == this.source.playbackState || this.Yy)) {
                    if (0 < this.Wh && (this.Wh--,
                    0 < this.Wh))
                        return this.al(0, this.In),
                        !1;
                    this.Oi = this.En = !1;
                    return !0
                }
            return !1
        }
    };
    jb.prototype = {
        Jx: function(a) {
            this.ZK[this.position++] = a
        }
    };
    G.Ce = 80;
    G.Bp = 52;
    G.sE = G.Ce;
    G.tE = G.sE + 1 - G.Bp;
    G.eq = 4;
    G.nt = 199 + G.Ce;
    G.uE = G.nt + 1 - G.eq - G.Bp;
    G.QG = 256;
    G.eF = 1;
    G.OQ = function(a, b) {
        var c = b >> 5
          , d = 1 << (b & 31)
          , e = 0 != (a[c] & d);
        a[c] |= d;
        return e
    }
    ;
    G.II = function(a) {
        return a.Bb + 0
    }
    ;
    G.Ve = function(a) {
        a &= 65535;
        return 0 != (a & 32768) ? a - 65536 : a
    }
    ;
    G.ut = function(a) {
        return a >> 16
    }
    ;
    G.Dk = function(a) {
        return a & 4294901760
    }
    ;
    G.prototype = {
        $e: function(a) {
            var b;
            this.Ee = 0;
            this.Wg = null;
            this.Xg = -1;
            if (0 != (a & 32768))
                return 32767 == (a & 32767) ? null : this.dL(a);
            var c = this.l.W[a];
            if (c.ec == this.fc) {
                if (0 != (c.ob & 2147483648))
                    return null;
                b = this.l.G[c.ob];
                this.oi = null;
                this.il = c;
                this.xf = b;
                this.Uo = a
            } else {
                c.ec = this.fc;
                if (this.ri)
                    return c.ob = -1,
                    c.he = 0,
                    null;
                c.ob = c.lb;
                if (0 != (c.lb & 2147483648))
                    return c.he = 0,
                    null;
                var d = c.lb;
                do
                    b = this.l.G[d],
                    d = b.ac,
                    b.Ac = d;
                while (0 == (d & 2147483648));
                b = this.l.G[c.lb];
                this.oi = null;
                this.il = c;
                this.xf = b;
                this.Uo = a;
                c.he = c.Rg
            }
            this.Ee = c.he;
            return b
        },
        dL: function(a) {
            var b, c, d = 0, e = 0;
            for (a = this.yd[a & 32767]; e < a.M.length; ) {
                c = a.M[e + 1];
                if (0 > c)
                    break;
                c = this.l.W[c];
                if (c.ec == this.fc)
                    b = 0,
                    0 == (c.ob & 2147483648) && (b = c.he,
                    null == this.Wg && (this.Wg = a,
                    this.Xg = e));
                else if (b = 0,
                c.ec = this.fc,
                this.ri)
                    c.ob = -1,
                    c.he = 0;
                else if (c.ob = c.lb,
                0 != (c.lb & 2147483648))
                    c.he = 0;
                else {
                    null == this.Wg && (this.Wg = a,
                    this.Xg = e);
                    b = c.lb;
                    do
                        b = this.l.G[b],
                        b = b.Ac = b.ac;
                    while (0 == (b & 2147483648));
                    b = c.he = c.Rg
                }
                d += b;
                e += 2
            }
            a = this.Wg;
            return null != a ? (c = this.l.W[a.M[this.Xg + 1]],
            this.oi = null,
            this.il = c,
            this.xf = b = this.l.G[c.ob],
            this.Uo = a.M[this.Xg + 1],
            this.Ee = d,
            b) : null
        },
        pe: function() {
            var a = this.xf, b;
            if (null == a && (b = this.l.W[this.Uo],
            0 == (b.ob & 2147483648)))
                return a = this.l.G[b.ob],
                this.oi = null,
                this.il = b,
                this.xf = a;
            if (null != a && 0 == (a.Ac & 2147483648))
                return this.oi = a,
                this.il = null,
                this.xf = a = this.l.G[a.Ac];
            if (null == this.Wg)
                return null;
            do {
                this.Xg += 2;
                if (this.Xg >= this.Wg.M.length)
                    return null;
                a = this.Wg.M[this.Xg + 1];
                if (0 > a)
                    return null;
                b = this.l.W[a]
            } while (0 != (b.ob & 2147483648));
            this.oi = null;
            this.il = b;
            this.xf = a = this.l.G[b.ob];
            this.Uo = this.Wg.M[this.Xg + 1];
            return a
        },
        JI: function(a) {
            a = this.yd[a & 32767];
            for (var b = 0, c; b < a.M.length; ) {
                c = a.M[b + 1];
                if (0 > c)
                    break;
                c = this.l.W[c];
                c.ec != this.fc && (c.ec = this.fc,
                c.he = 0,
                c.ob = -1);
                b += 2
            }
        },
        Vc: function() {
            --this.xf.Wb.he;
            null != this.oi ? (this.oi.Ac = this.xf.Ac,
            this.xf = this.oi) : (this.il.ob = this.xf.Ac,
            this.xf = null)
        },
        $l: function(a) {
            var b = a.Wb;
            if (b.ec != this.fc)
                b.ec = this.fc,
                b.ob = a.bc,
                b.he = 1,
                a.Ac = -1;
            else {
                var c = b.ob;
                if (0 != (c & 2147483648))
                    b.ob = a.bc,
                    b.he += 1,
                    a.Ac = -1;
                else {
                    do {
                        if (a.bc == c)
                            return;
                        b = this.l.G[c];
                        c = b.Ac
                    } while (0 == (c & 2147483648));
                    b.Ac = a.bc;
                    a.Ac = -1;
                    a.Wb.he += 1
                }
            }
        },
        cA: function() {
            var a, b, c;
            for (b = 0; b < this.l.yf; b++)
                if (c = this.l.W[b],
                c.ec == this.fc) {
                    if (c.sw != this.zs)
                        for (c.sw = this.zs,
                        a = c.lb; 0 == (a & 2147483648); )
                            a = this.l.G[a],
                            a.wv = 0,
                            a = a.ac;
                    for (a = c.ob; 0 == (a & 2147483648); )
                        a = this.l.G[a],
                        a.wv = 1,
                        a = a.Ac
                }
        },
        bA: function() {
            var a, b, c, d, e;
            for (d = 0; d < this.l.yf; d++)
                if (e = this.l.W[d],
                e.sw == this.zs)
                    for (e.ec = this.fc,
                    a = e.lb,
                    c = null; 0 == (a & 2147483648); )
                        b = this.l.G[a],
                        0 != b.wv && (null != c ? c.Ac = a : e.ob = a,
                        b.Ac = -1,
                        c = b),
                        a = b.ac
        },
        Nh: function(a) {
            if (this.hl)
                return this.Hm = !1,
                a = this.br(a);
            var b;
            if (0 == (a & 32768))
                return b = this.l.W[a],
                b.ec == this.fc && 0 == (b.ob & 2147483648) ? this.l.G[b.ob] : 0 == (b.lb & 2147483648) ? this.l.G[b.lb] : null;
            a = this.yd[a & 32767];
            var c = 0;
            if (c >= a.M.length)
                return null;
            do {
                b = a.M[c + 1];
                if (0 > b)
                    break;
                b = this.l.W[b];
                if (b.ec == this.fc && 0 == (b.ob & 2147483648))
                    return this.l.G[b.ob];
                c += 2
            } while (c < a.M.length);
            c = 0;
            do {
                b = a.M[c + 1];
                if (0 > b)
                    break;
                b = this.l.W[b];
                if (0 == (b.lb & 2147483648))
                    return this.l.G[b.lb];
                c += 2
            } while (c < a.M.length);
            return null
        },
        tJ: function(a, b) {
            this.Hm = !0;
            var c = this.br(a);
            if (null != c)
                return 0 != this.Gc && (b.Ka |= Y.xi,
                this.wj = !0),
                c;
            b.Ka |= U.Bl;
            return c
        },
        $b: function(a) {
            a.Ka &= ~U.Bl;
            this.Hm = !0;
            var b = this.br(a.jb);
            if (null != b)
                return 0 != this.Gc && (a.Ka |= Y.xi,
                this.wj = !0),
                b;
            a.Ka |= U.Bl;
            return b
        },
        br: function(a) {
            return 0 == (a & 32768) ? this.rJ(a) : this.sJ(a)
        },
        rJ: function(a) {
            var b = this.l.W[a];
            if (b.qw != this.gl) {
                b.qw = this.gl;
                b.rw = this.ni;
                if (b.ec == this.fc && 0 == (b.ob & 2147483648)) {
                    b.Qg = b.ob;
                    a = this.l.G[b.ob];
                    b.nj = a.Ac;
                    if (0 != (a.Ac & 2147483648))
                        return b.cg = !1,
                        b.lj = 1,
                        this.Gc = !1,
                        a;
                    b.cg = !0;
                    b.lj = 2;
                    this.Gc = !0;
                    return a
                }
                if (this.Hm && b.ec == this.fc)
                    return b.lj = 0,
                    b.Qg = -1,
                    null;
                if (0 == (b.lb & 2147483648)) {
                    b.Qg = b.lb;
                    a = this.l.G[b.lb];
                    if (null == a)
                        return b.lj = 0,
                        b.Qg = -1,
                        null;
                    if (0 == (a.ac & 2147483648))
                        return b.nj = a.ac,
                        b.cg = !0,
                        b.lj = 3,
                        this.Gc = !0,
                        a;
                    b.cg = !1;
                    b.lj = 1;
                    this.Gc = !1;
                    return a
                }
                b.lj = 0;
                b.Qg = -1;
                return null
            }
            if (b.rw != this.ni) {
                var c;
                b.rw = this.ni;
                switch (b.lj) {
                case 0:
                    return this.Gc = b.cg,
                    null;
                case 1:
                    return a = this.l.G[b.Qg],
                    this.Gc = b.cg,
                    a;
                case 2:
                    b.Qg = b.nj;
                    a = this.l.G[b.nj];
                    if (null == a)
                        return null;
                    c = a.Ac;
                    0 != (c & 2147483648) && (b.cg = !1,
                    c = b.ob);
                    b.nj = c;
                    this.Gc = b.cg;
                    return a;
                case 3:
                    b.Qg = b.nj;
                    a = this.l.G[b.nj];
                    if (null == a)
                        return null;
                    c = a.ac;
                    0 != (c & 2147483648) && (b.cg = !1,
                    c = b.lb);
                    b.nj = c;
                    this.Gc = b.cg;
                    return a
                }
            }
            if (0 > b.Qg)
                return null;
            a = this.l.G[b.Qg];
            this.Gc = b.cg;
            return a
        },
        sJ: function(a) {
            var b, c = this.yd[a & 32767];
            if (c.gs != this.gl) {
                c.gs = this.gl;
                c.Mw = this.ni;
                b = this.yC(c);
                if (0 <= b) {
                    c.Sg = b;
                    a = this.l.G[b];
                    if (null == a)
                        return c.oj = 0,
                        c.Sg = -1,
                        null;
                    b = a.Ac;
                    if (0 != (b & 2147483648) && (b = this.Pw(c),
                    0 > b))
                        return c.oj = 1,
                        this.Gc = c.dg = !1,
                        a;
                    c.pj = b;
                    c.oj = 2;
                    this.Gc = c.dg = !0;
                    return a
                }
                if (this.Hm && c.Nw)
                    return c.oj = 0,
                    c.Sg = -1,
                    null;
                b = this.xC(c);
                if (0 <= b && (c.Sg = b,
                a = this.l.G[b],
                null != a)) {
                    b = a.ac;
                    if (0 != (b & 2147483648) && (b = this.Ow(c),
                    0 != (b & 2147483648)))
                        return c.oj = 1,
                        this.Gc = c.dg = !1,
                        a;
                    c.pj = b;
                    c.oj = 3;
                    this.Gc = c.dg = !0;
                    return a
                }
                c.oj = 0;
                c.Sg = -1;
                return null
            }
            if (c.Mw != this.ni)
                switch (c.Mw = this.ni,
                c.oj) {
                case 0:
                    return this.Gc = c.dg,
                    null;
                case 1:
                    return a = this.l.G[c.Sg],
                    this.Gc = c.dg,
                    a;
                case 2:
                    return c.Sg = c.pj,
                    a = this.l.G[c.pj],
                    null != a && (b = a.Ac,
                    0 != (b & 2147483648) && (b = this.Pw(c),
                    0 > b && (c.dg = !1,
                    b = this.yC(c))),
                    c.pj = b),
                    this.Gc = c.dg,
                    a;
                case 3:
                    return c.Sg = c.pj,
                    a = this.l.G[c.pj],
                    null != a && (b = a.ac,
                    0 != (b & 2147483648) && (b = this.Ow(c),
                    0 != (b & 2147483648) && (c.dg = !1,
                    b = this.xC(c))),
                    c.pj = b),
                    this.Gc = c.dg,
                    a
                }
            if (0 > c.Sg)
                return null;
            a = this.l.G[c.Sg];
            this.Gc = c.dg;
            return a
        },
        Pw: function(a) {
            for (var b = a.zm, c; b < a.M.length; ) {
                c = a.M[b + 1];
                if (0 > c)
                    break;
                c = this.l.W[c];
                if (c.ec == this.fc && (a.Nw = !0,
                0 == (c.ob & 2147483648)))
                    return a.zm = b + 2,
                    c.ob;
                b += 2
            }
            return -1
        },
        yC: function(a) {
            a.zm = 0;
            a.Nw = !1;
            return this.Pw(a)
        },
        Ow: function(a) {
            for (var b = a.zm, c; b < a.M.length; ) {
                c = a.M[b + 1];
                if (0 > c)
                    break;
                c = this.l.W[c];
                if (0 == (c.lb & 2147483648))
                    return a.zm = b + 2,
                    c.lb;
                b += 2
            }
            return -1
        },
        xC: function(a) {
            a.zm = 0;
            return this.Ow(a)
        },
        BI: function() {
            this.Bu = !1;
            for (var a = this.l.xs, b = this.l.ys; ; ) {
                for (var c = null, d = null, e = this.l.QC; null != e; ) {
                    if (0 > e.index) {
                        (c = e.next) && (p.xc(e.name, c.name) || (c = null));
                        break
                    }
                    d = e;
                    e = e.next
                }
                if (null == e)
                    break;
                var f = -2686976
                  , g = -2686976
                  , h = null;
                0 < e.ag && (h = e.Le[0].Ha == u.Jb ? this.sf : this.rf);
                null != h && (h = h.get(e.name),
                void 0 != h && (f = 65536 * -h),
                null != c && (h = null,
                0 < c.ag && (h = c.Le[0].Ha == u.Jb ? this.sf : this.rf),
                null != h && (h = h.get(c.name),
                void 0 != h && (g = 65536 * -h))));
                e.stop = !1;
                for (e.index = 0; e.index < e.ag; e.index++) {
                    this.l.xs = e;
                    if (this.l.ys = c)
                        c.index = e.index;
                    this.hl = 0;
                    this.td(e.Le[e.index], f);
                    if (e.stop)
                        break
                }
                if (c)
                    for (c.index = 0; c.index < c.ag; c.index++) {
                        this.l.xs = c;
                        if (this.l.ys = e)
                            e.index = c.index;
                        this.hl = 0;
                        this.td(c.Le[c.index], g);
                        if (c.stop)
                            break
                    }
                c && (e.next = c.next);
                null == d ? this.l.QC = e.next : d.next = e.next
            }
            this.l.xs = a;
            this.l.ys = b
        },
        KI: function(a, b) {
            for (var c = 0; c < a.length; c += 2) {
                var d = this.l.W[a[c + 1]];
                if (d.ec == this.fc) {
                    var e = b.get(d);
                    void 0 != e ? e.length = 0 : (e = [],
                    b.set(d, e));
                    for (d = d.ob; 0 <= d; ) {
                        var f = this.l.G[d];
                        if (null == f)
                            break;
                        0 == (f.X & M.Df) && e.push(d);
                        d = f.Ac
                    }
                }
            }
        },
        LI: function(a) {
            var b = this.Dq.length
              , c = new Map;
            if (0 < b)
                for (var b = this.Dq[b - 1], d = rb(b.keys()), e = d.next(); !e.done; e = d.next()) {
                    var e = e.value
                      , f = b.get(e).slice();
                    c.set(e, f)
                }
            this.KI(a.zb, c);
            this.Dq.push(c);
            this.Ye(a.aA, null);
            this.Dq.pop()
        },
        Fe: function(a) {
            var b = a & 65535;
            0 != (b & 32768) && (b = 65536 - b);
            a = this.mc[this.Qe[b] + -(a >> 16)];
            0 != a && this.Ye(a, null)
        },
        td: function(a, b) {
            this.Gs = b;
            var c = this.mc[a.tv + -(b >> 16)];
            return 0 != c ? (this.Ye(c, a),
            !0) : !1
        },
        zJ: function() {
            for (var a = !1, b = this.l.fx; b; ) {
                if (this.l.Zg >= b.Ad)
                    if (b.type == kb.iH) {
                        this.l.i.Ic = b.name;
                        var c = this.mc[this.Qe[-u.un] + S.xy];
                        0 != c && this.Ye(c, null);
                        a = b.ru = !0
                    } else
                        for (0 == b.mp && (b.mp = this.l.Zg); this.l.Zg >= b.mp; ) {
                            this.l.i.Ic = b.name;
                            this.l.i.hx = b.index;
                            c = this.mc[this.Qe[-u.un] + S.xy];
                            0 != c && this.Ye(c, null);
                            b.index++;
                            b.xr--;
                            if (0 == b.xr) {
                                a = b.ru = !0;
                                break
                            }
                            b.mp += b.gM
                        }
                b = b.next
            }
            if (a)
                for (b = this.l.fx,
                a = null; b; )
                    c = b.next,
                    b.ru ? null == a ? this.l.fx = c : a.next = c : a = b,
                    b = c
        },
        cI: function() {
            var a;
        
            // Case 1: Qc has l.nn flag
            if (0 != (this.l.Qc & l.nn)) {
                let idx = (this.Qe ? this.Qe[-u.fq] : null);
                if (idx != null && this.mc && (idx + 1) in this.mc) {
                    a = this.mc[idx + 1];
                    if (a != null && a !== 0) {
                        this.mc[idx + 1] = -1;
                        this.Ye(a, null);
                        this.Vo = !0;
                    }
                }
            } else {
                // Case 2: normal branch
                let idxUn = (this.Qe ? this.Qe[-u.un] : null);
        
                if (idxUn != null && this.mc) {
                    if ((idxUn + 3) in this.mc) {
                        a = this.mc[idxUn + 3];
                        if (a != null && a !== 0) this.Ye(a, null);
                    }
        
                    if ((this.Qe && -u.fq in this.Qe) && (this.Qe[-u.fq] + 1) in this.mc) {
                        a = this.mc[this.Qe[-u.fq] + 1];
                    } else {
                        a = 0;
                    }
                }
        
                var b, c, d, e, f;
        
                if (a != null && a !== 0) {
                    if (this.Vo) {
                        e = null;
                        b = a;
                        do {
                            d = this.jc ? this.jc[b] : null;
                            if (d != e && d != null) {
                                e = d;
                                for (c = d.Bb; c < d.Bb + d.be; c++) {
                                    f = d.Wa[c];
                                    if (f && (f.Ka & U.Bl) === 0) {
                                        f.Ka |= U.Fp;
                                    }
                                }
                            }
                            b++;
                        } while (this.jc && this.jc[b] != null);
                    }
        
                    this.Ye(a, null);
        
                    if (this.Qe && -u.fq in this.Qe && this.mc) {
                        this.mc[this.Qe[-u.fq] + 1] = 0;
                    }
        
                    if (this.Vo) {
                        e = null;
                        b = a;
                        do {
                            d = this.jc ? this.jc[b] : null;
                            if (d != e && d != null) {
                                e = d;
                                for (c = d.Bb; c < d.Bb + d.be; c++) {
                                    f = d.Wa[c];
                                    if (f) f.Ka &= ~U.Fp;
                                }
                            }
                            b++;
                        } while (this.jc && this.jc[b] != null);
        
                        this.Vo = !1;
                    }
                }
        
                if (idxUn != null && this.mc) {
                    if ((idxUn + 2) in this.mc) {
                        a = this.mc[idxUn + 2];
                        if (a != null && a !== 0) this.Ye(a, null);
                    }
                    if ((idxUn + 1) in this.mc) {
                        a = this.mc[idxUn + 1];
                        if (a != null && a !== 0) this.Ye(a, null);
                    }
                }
            }
        }
        ,
        Ye: function(a, b) {
            var c, d, e;
            this.OC = !1;
            do
                if (d = this.jc[a],
                0 == (d.na & L.Hp))
                    if (this.Pe = d,
                    this.Ds[0] = 0,
                    this.Ds[1] = 0,
                    this.Ds[2] = 0,
                    this.Ds[3] = 0,
                    0 == (d.na & L.rt)) {
                        this.fc += 1;
                        this.ri = !1;
                        e = 0;
                        if (d.Wa[e].fb(this.l, b))
                            for (e++; e < d.Bb && 0 != d.Wa[e].ja(this.l); e++)
                                ;
                        if (e == d.Bb)
                            if (this.OC)
                                null != b && this.PH(b);
                            else if (this.Cu(d),
                            0 != (d.na & L.kn))
                                break;
                        a++
                    } else {
                        this.zs++;
                        if (0 == (d.na & L.ay)) {
                            c = !1;
                            do {
                                this.fc++;
                                this.ri = !1;
                                e = this.Ze[a];
                                0 == d.Wa[e].fb(this.l, b) && (this.ri = !0);
                                for (e++; e < d.Bb && -1507329 != d.Wa[e].aa; )
                                    0 == d.Wa[e].ja(this.l) && (this.ri = !0),
                                    e++;
                                this.cA();
                                0 == this.ri && (c = !0);
                                a++;
                                d = this.jc[a];
                                if (null == d)
                                    break
                            } while (d == this.Pe)
                        } else {
                            var f;
                            c = this.ri = !1;
                            do {
                                this.fc++;
                                f = !1;
                                e = this.Ze[a];
                                if (d.Wa[e].fb(this.l, b))
                                    for (e++; e < d.Bb && -1572865 != d.Wa[e].aa; ) {
                                        if (0 == d.Wa[e].ja(this.l)) {
                                            f = !0;
                                            break
                                        }
                                        e++
                                    }
                                else
                                    f = !0;
                                0 == f && (this.cA(),
                                c = !0);
                                a++;
                                d = this.jc[a];
                                if (null == d)
                                    break
                            } while (d == this.Pe)
                        }
                        if (c && (this.fc++,
                        this.bA(),
                        d = 0 != (this.Pe.na & L.kn),
                        this.Cu(this.Pe),
                        d))
                            break
                    }
                else if (a++,
                null != this.jc[a])
                    for (c = this.jc[a]; c == d; ) {
                        a++;
                        if (null == this.jc[a])
                            break;
                        c = this.jc[a]
                    }
            while (null != this.jc[a])
        },
        Cu: function(a) {
            this.Hu = null;
            if (0 != (a.na & L.$x)) {
                0 != (a.na & L.tt) && (this.zj = new O);
                if (0 != (a.na & L.mn)) {
                    var b = this.l.Ob
                      , c = a.Ui;
                    a.Ui = b;
                    if (b == c || b - 1 == c)
                        return
                }
                if (0 != (a.na & L.st))
                    if (0 != a.Zl)
                        a.Zl--;
                    else
                        return;
                if (0 != (a.na & L.ln)) {
                    b = this.l.Zg / 10;
                    c = a.Zl;
                    if (0 != c && b < c)
                        return;
                    a.Zl = b + a.Ui
                }
            }
            this.gl++;
            this.wj = !1;
            this.ni = 0;
            this.hl = !0;
            b = 0;
            do
                c = a.Wa[b + a.Bb],
                0 == (c.Ka & (U.Yx | U.Fp)) && (c.Ka &= ~Y.xi,
                c.Ga(this.l)),
                b++;
            while (b < a.be);
            if (this.wj) {
                do
                    for (this.wj = !1,
                    this.ni++,
                    b = 0; b < a.be; b++)
                        c = a.Wa[b + a.Bb],
                        0 != (c.Ka & Y.xi) && (c.Ka &= ~Y.xi,
                        c.Ga(this.l));
                while (this.wj)
            }
            b = this.Hu;
            0 != (a.na & L.kn) && 0 != (a.na & L.Gp) && (b = null);
            this.Hu = null;
            this.hl = !1;
            null != this.zj && this.EI();
            this.Bu && this.BI();
            b && this.LI(b)
        },
        PH: function(a) {
            var b;
            b = a.ef;
            this.fc += 1;
            this.$l(a);
            this.gl++;
            this.wj = !1;
            this.ni = 0;
            this.hl = !0;
            var c = 0, d;
            do {
                a = this.Pe.Wa[this.Pe.Bb + c];
                d = a.aa & 4294901760;
                if (262144 == d || 589824 == d)
                    if (b == a.Hd)
                        a.Ga(this.l);
                    else if (d = a.jb,
                    0 != (d & 32768)) {
                        var e = this.yd[d & 32767];
                        for (d = 0; d < e.M.length; ) {
                            var f = e.M[d];
                            if (0 > f)
                                break;
                            if (f == b) {
                                a.Ga(this.l);
                                break
                            }
                            d += 2
                        }
                    }
                c++
            } while (c < this.Pe.be);
            this.hl = !1
        },
        EI: function() {
            if (!(1 >= this.zj.size())) {
                var a = this.l.random(this.zj.size()), b;
                do
                    b = this.l.random(this.zj.size());
                while (a == b);
                a = this.zj.get(a);
                b = this.zj.get(b);
                var c = a.v
                  , d = a.u
                  , e = b.u;
                l.gc(a, b.v);
                l.hc(a, e);
                l.gc(b, c);
                l.hc(b, d);
                this.zj = null
            }
        },
        iC: function(a, b) {
            var c;
            if (null != this.l && (this.l.lv(),
            0 == this.l.fg && 0 != this.Dn && (c = a,
            2 == b && (c += G.QG),
            this.l.Um = 0,
            0 == this.l.zf))) {
                this.us = this.Ic = c;
                this.Fe(-262150);
                this.Fe(-327686);
                c = 0;
                var d, e, f, g, h, q, k = new O;
                for (d = 0; d < this.l.pb; d++) {
                    for (; null == this.l.G[c]; )
                        c++;
                    e = this.l.G[c];
                    c++;
                    f = e.v - e.oa;
                    g = e.u - e.pa;
                    h = f + e.L;
                    q = g + e.K;
                    this.l.xj >= f && this.l.xj < h && this.l.yj >= g && this.l.yj < q && 0 != (e.df & Q.Vd) && 0 == (e.X & M.Df) && (e.Ha == u.Jb ? 0 == (e.F.Y & A.Gi) ? this.Ub.ba.Kb(e.b.Ta).Rf(K.Tj, 0, 1, 1).AD(this.l.xj - e.v, this.l.yj - e.u, e.b.gb, e.b.Gb, e.b.Hb) && k.add(e) : k.add(e) : k.add(e))
                }
                for (c = 0; c < k.size(); c++)
                    e = k.get(c),
                    this.hx = e.ef,
                    this.gx = e,
                    this.Fe(-393222)
            }
        },
        KK: function() {
            null != this.l && 0 != this.Dn && (this.l.Um = 0,
            this.Fe(-524294))
        },
        jC: function() {
            0 != this.Dn && 0 == this.l.fg && (this.l.Um = 0)
        },
        cL: function(a, b, c, d, e) {
            a = new Le(a,b,c,d,e);
            null == this.kl && (this.kl = new O);
            this.kl.add(a)
        },
        yJ: function() {
            if (null != this.kl) {
                var a;
                for (a = 0; a < this.kl.size(); a++) {
                    var b = this.kl.get(a);
                    if (null != b && 0 != b.code)
                        switch (this.Ic = b.QK,
                        this.SC = b.bg,
                        b.CL) {
                        case 0:
                            this.Fe(b.code);
                            break;
                        case 1:
                            this.td(b.PK, b.code)
                        }
                }
                this.kl.clear()
            }
        },
        load: function(a) {
            for (var b, c, d = 0; ; )
                if (b = a.file.FC(4),
                69 == b[0] && 82 == b[1] && 62 == b[2] && 62 == b[3]) {
                    this.Ig = a.file.o();
                    300 > this.Ig && (this.Ig = 300);
                    a.file.o();
                    this.UB = a.file.o();
                    for (c = 0; c < 7 + u.zy; c++)
                        this.Uk[c] = a.file.o();
                    this.Uk[u.cd + u.Jb] < G.nt + 1 && (this.Uk[u.cd + u.Jb] = G.nt + 1);
                    this.Lg = a.file.o();
                    if (0 < this.Lg)
                        for (this.Ug = Array(this.Lg),
                        c = 0; c < this.Lg; c++)
                            this.Ug[c] = new Ke,
                            this.Ug[c].es = a.file.V(),
                            this.Ug[c].fs = a.file.V()
                } else if (69 == b[0] && 82 == b[1] && 101 == b[2] && 115 == b[3])
                    a.file.s(),
                    this.vo = a.file.s(),
                    this.rd = Array(this.vo);
                else if (69 == b[0] && 82 == b[1] && 101 == b[2] && 118 == b[3])
                    for (a.file.s(),
                    b = a.file.s(),
                    c = 0; c < b; c++)
                        this.rd[d] = L.create(a),
                        d++;
                else if (69 == b[0] && 82 == b[1] && 111 == b[2] && 112 == b[3])
                    0 != (a.file.s() & G.eF) && (this.Wl |= L.kn);
                else if (60 == b[0] && 60 == b[1] && 69 == b[2] && 82 == b[3])
                    break;
            this.hB = Math.max(this.hB, d)
        },
        LA: function(a) {
            var b, c;
            c = this.rd[a];
            c.na &= this.Wl;
            c.na |= L.Hp;
            a++;
            for (b = !1; ; ) {
                c = this.rd[a];
                c.na &= this.Wl;
                c.na |= L.Hp;
                c = c.Wa[0];
                switch (c.aa) {
                case -589825:
                    c = c.w[0];
                    c.zg |= oa.Et;
                    a = this.LA(a);
                    continue;
                case -655361:
                    b = !0,
                    a++
                }
                if (b)
                    break;
                a++
            }
            return a
        },
        Jw: function() {
            var a, b, c, d, e, f, g = new O, h;
            for (d = 0; d < this.rd.length; )
                a = this.rd[d],
                a.na &= this.Wl,
                b = a.Wa[0],
                -589825 == b.aa && (a = b.w[0],
                h = new Je,
                h.id = a.vJ,
                h.$z = d,
                g.add(h),
                a.zg &= ~(oa.Et | oa.Dt),
                0 != (a.zg & oa.NF) && (a.zg |= oa.Dt)),
                d++;
            for (d = 0; d < this.rd.length; ) {
                a = this.rd[d];
                a.na &= this.Wl;
                b = a.Wa[0];
                if (-589825 == b.aa && (a = b.w[0],
                a.zg &= ~oa.Et,
                0 != (a.zg & oa.Dt))) {
                    d = this.LA(d);
                    continue
                }
                d++
            }
            for (d = 0; d < this.rd.length; d++)
                switch (a = this.rd[d],
                b = a.Wa[0],
                b.aa) {
                case -589825:
                case -655361:
                    break;
                default:
                    for (a.Ui = 0,
                    e = a.Zl = 0; e < a.Bb + a.be; e++)
                        if (b = a.Wa[e],
                        b.Ka = 0 > b.aa ? b.Ka & U.gF : b.Ka & ~(Y.xi | U.Bl),
                        0 != b.yc)
                            for (f = 0; f < b.yc; f++)
                                switch (c = b.w[f],
                                c.code) {
                                case 25:
                                    c.at = 0;
                                    break;
                                case 13:
                                    c.$H = c.Xl;
                                    break;
                                case 39:
                                    var q;
                                    for (q = 0; q < g.size(); q++)
                                        if (h = g.get(q),
                                        h.id == c.id) {
                                            c.T = h.$z;
                                            break
                                        }
                                }
                }
        },
        aL: function(a) {
            qualToOiListFull = qualToOiList = null;
            if (0 < this.Lg) {
                var b, c, d, e, f = Array(this.Lg);
                for (d = 0; d < a.length; d++)
                    a[d].ec = 0,
                    a[d].qf = null;
                for (c = 0; c < this.Lg; c++)
                    for (e = this.Ug[c].es & 32767,
                    d = f[c] = 0; d < a.length; d++) {
                        var g = a[d];
                        if (g.gd == this.Ug[c].fs)
                            for (b = 0; 8 > b && -1 != g.wm[b]; b++)
                                if (e == g.wm[b]) {
                                    f[c]++;
                                    g.ec++;
                                    break
                                }
                    }
                this.yd = Array(this.Lg);
                this.$c = Array(this.Lg);
                for (c = 0; c < this.Lg; c++) {
                    this.yd[c] = new jd;
                    this.$c[c] = new jd;
                    b = f[c];
                    0 != b && (this.yd[c].M = Array(2 * b),
                    this.$c[c].M = Array(2 * b));
                    var h = 0;
                    e = this.Ug[c].es & 32767;
                    for (d = 0; d < a.length; d++)
                        if (g = a[d],
                        g.gd == this.Ug[c].fs)
                            for (b = 0; 8 > b && -1 != g.wm[b]; b++)
                                if (e == g.wm[b]) {
                                    this.$c[c].M[2 * h] = g.Zc;
                                    this.$c[c].M[2 * h + 1] = d;
                                    this.yd[c].M[2 * h] = -1;
                                    this.yd[c].M[2 * h + 1] = -1;
                                    null == g.qf && 0 != g.ec && (g.qf = Array(g.ec),
                                    g.ec = 0);
                                    null != g.qf && (g.qf[g.ec++] = c);
                                    h++;
                                    break
                                }
                    this.yd[c].gs = -1;
                    this.$c[c].gs = -1
                }
                for (d = 0; d < a.length; d++)
                    a[d].ec = 0
            }
        },
        zq: function(a) {
            var b, c, d, e, f, g, h, q, k, l, t, w, m, r, A, z;
            this.l = a;
            var F = this.gl = 0;
            for (h = a = 0; h < this.l.yf; h++)
                -1 != this.l.W[h].Zc && (this.l.W[h].qw = -1,
                this.l.W[h].Nd = 0,
                this.l.W[h].vm = -1,
                a++,
                this.l.W[h].Zc + 1 > F && (F = this.l.W[h].Zc + 1));
            this.Xe = Array(200 * F + 1);
            a = 0;
            g = [];
            var v;
            for (r = 0; r < this.rd.length; r++) {
                b = this.rd[r];
                for (v = 0; v < b.be + b.Bb; v++) {
                    c = b.Wa[v];
                    c.Ka &= ~U.Yx;
                    0 <= G.Ve(c.aa) && (c.jb = this.em(c.Hd, G.Ve(c.aa)));
                    if (c.aa == Y.YD)
                        d = c.w[0],
                        d.XI = 0,
                        d.ia[0].code == ca.Cl && 0 == d.ia[1].code && (l = {},
                        l.GH = c.w[0],
                        l.name = d.ia[0].xb,
                        g.push(l),
                        this.l.lu(d.ia[0].xb));
                    else if (c.aa == Y.IM || c.aa == Y.HM)
                        d = c.w[0],
                        d.ia[0].code == ca.Cl && 0 == d.ia[1].code && (d.ia[0] = new hb,
                        d.ia[0].code = ca.cy,
                        d.ia[0].value = this.l.lu(d.ia[0].xb));
                    if (0 < c.yc)
                        for (l = 0; l < c.yc; l++)
                            switch (d = c.w[l],
                            d.code) {
                            case 25:
                                d.value = 0;
                                break;
                            case 21:
                                if (0 == (c.Hd & u.bu))
                                    for (t = this.l.A.Bd.Vq(); null != t; t = this.l.A.Bd.Ao()) {
                                        if (c.Hd == t.Vf) {
                                            d.Bq = t.bj;
                                            break
                                        }
                                    }
                                else
                                    d.Bq = -1;
                                f = d.Jo;
                                -1 != f && (d.Ko = this.em(f, d.$r));
                                break;
                            case 9:
                            case 18:
                            case 16:
                                f = d.Jo;
                                -1 != f && (d.Ko = this.em(f, d.$r));
                                break;
                            case 1:
                                d.ub = this.em(d.bg, d.type);
                                break;
                            case 69:
                                for (h = 0; h < d.zb.length; h += 2)
                                    d.zb[h + 1] = this.em(d.zb[h], 0);
                                break;
                            case 15:
                            case 27:
                            case 28:
                            case 45:
                            case 46:
                            case 22:
                            case 23:
                            case 52:
                            case 59:
                            case 53:
                            case 62:
                            case 54:
                                for (t = d,
                                h = 0; h < t.ia.length; h++)
                                    0 < G.Ve(t.ia[h].code) && (q = t.ia[h],
                                    q.ub = this.em(q.bg, G.Ve(q.code)))
                            }
                }
                l = 0;
                t = L.Ip | L.$x | L.by;
                for (v = 0; v < b.Bb + b.be; v++) {
                    c = b.Wa[v];
                    e = G.Ve(c.aa);
                    f = c.aa;
                    q = k = h = 0;
                    d = null;
                    if (e >= u.Jb)
                        switch (G.Dk(f)) {
                        case 262144:
                        case 589824:
                            l |= L.by;
                            f = c.Hd;
                            if (0 != (f & u.bu))
                                for (e = this.eL(c.jb); -1 != e; e = this.zC())
                                    a = this.eB(b, a, this.l.W[e].Zc);
                            else
                                a = this.eB(b, a, f);
                            break;
                        case 1638400:
                            l |= L.tt;
                            break;
                        case -917504:
                            d = c.w[0];
                            h = c.w[0];
                            this.vq(c.jb, c.Hd, h.ub, h.bg);
                            this.vq(h.ub, h.bg, c.jb, c.Hd);
                            q = G.Ve(c.aa);
                            q = this.or(q) ? Q.Vd | Q.wn : Q.Vd | Q.lq | Q.wn;
                            k = h.type;
                            k = this.or(k) ? Q.Vd | Q.wn : Q.Vd | Q.lq | Q.wn;
                            this.Ub.AJ & n.ZD && this.ts(c.jb, c.Hd, h.ub, h.bg);
                            h = 3;
                            break;
                        case -262144:
                            q = G.Ve(c.aa);
                            q = this.or(q) ? Q.Vd : Q.Vd | Q.lq;
                            d = c.w[0];
                            k = c.w[0].type;
                            k = this.or(k) ? Q.Vd : Q.Vd | Q.lq;
                            0 != (this.Ub.AJ & n.ZD) && this.ts(c.jb, c.Hd, d.ub, d.bg);
                            h = 3;
                            break;
                        case -720896:
                        case -786432:
                            k = Q.kq;
                            h = 1;
                            break;
                        case -851968:
                            k = Q.jq,
                            h = 1
                        }
                    else
                        switch (f) {
                        case -327681:
                            t &= ~L.Ip;
                            break;
                        case -393217:
                            t |= L.ln;
                            break;
                        case -262145:
                            t |= L.ln;
                            break;
                        case -196609:
                            t |= L.mn + L.st;
                            break;
                        case -196614:
                            q = Q.Vd;
                            d = c.w[0];
                            h = 2;
                            break;
                        case -393222:
                            q = Q.Vd,
                            d = c.w[1],
                            h = 2
                        }
                    if (0 != (h & 1))
                        for (e = this.Tg(c.jb); -1 != e; e = this.eg())
                            this.l.W[e].Nd |= k;
                    if (0 != (h & 2))
                        for (e = this.Tg(d.ub); -1 != e; e = this.eg())
                            this.l.W[e].Nd |= q
                }
                b.na &= ~t;
                b.na |= l
            }
            this.Xe[a] = -1;
            k = !1;
            if (null == this.rf && null == this.sf) {
                this.rf = new Map;
                this.sf = new Map;
                k = !0;
                for (r = 0; r < this.rd.length && k; r++)
                    if (b = this.rd[r],
                    null != b) {
                        for (v = 0; v < b.Bb; v++)
                            if (c = b.Wa[v],
                            null != c && (e = G.Ve(c.aa),
                            e >= u.Jb && -2686976 == G.Dk(c.aa))) {
                                var E = c.w[0];
                                if (2 == E.ia.length && E.ia[0].code == ca.Cl && 0 == E.ia[1].code) {
                                    E = E.ia[0].xb.toLowerCase();
                                    c = e == u.Jb ? this.sf : this.rf;
                                    var B = c.get(E);
                                    void 0 == B ? B = 1 : B++;
                                    c.set(E, B)
                                } else {
                                    k = !1;
                                    break
                                }
                            }
                        for (h = 0; h < b.be && k; h++)
                            if (c = b.Wa[h + b.Bb],
                            null != c && (e = G.Ve(c.aa),
                            e >= u.Jb && 5046272 == G.Dk(c.aa))) {
                                k = !1;
                                break
                            }
                    }
                if (k) {
                    for (; this.rf.size > G.tE; ) {
                        b = 1E9;
                        c = null;
                        v = rb(this.rf.entries());
                        for (r = v.next(); !r.done; r = v.next())
                            l = r.value,
                            r = l[1],
                            r < b && (c = l[0],
                            b = r);
                        null != c && this.rf["delete"](c)
                    }
                    b = G.Bp;
                    r = rb(this.rf.keys());
                    for (c = r.next(); !c.done; c = r.next())
                        this.rf.set(c.value, b++);
                    for (; this.sf.size > G.uE; ) {
                        b = 1E9;
                        c = null;
                        v = rb(this.sf.entries());
                        for (r = v.next(); !r.done; r = v.next())
                            l = r.value,
                            r = l[1],
                            r < b && (c = l[0],
                            b = r);
                        null != c && this.sf["delete"](c)
                    }
                    b = G.Bp;
                    r = rb(this.sf.keys());
                    for (c = r.next(); !c.done; c = r.next())
                        this.sf.set(c.value, b++),
                        b == G.Ce + 1 && (b += G.eq);
                    b > G.Ce + 1 + G.eq && (this.Uk[u.cd + u.Jb] += b - (G.Ce + 1 + G.eq))
                } else
                    this.sf = this.rf = null
            }
            t = Array(u.cd + F + 1);
            b = r = 0;
            for (e = -u.cd; 0 > e; e++,
            b++)
                t[b] = r,
                r += this.Uk[u.cd + e];
            for (oil = 0; oil < this.l.yf; oil++,
            b++)
                t[b] = r,
                r = this.l.W[oil].gd < u.ng ? r + (this.Uk[u.cd + this.l.W[oil].gd] + G.Ce + 1) : r + (this.Ub.Rq.Yn(this.l.W[oil].gd) + G.Ce + 1);
            m = r;
            this.mc = Array(m);
            for (h = 0; h < m; h++)
                this.mc[h] = 0;
            l = w = 0;
            q = Array(this.l.A.Ig);
            for (r = 0; r < this.vo; r++)
                for (b = this.rd[r],
                b.na &= ~L.rt,
                d = !0,
                v = A = 0; v < b.Bb; v++) {
                    c = b.Wa[v];
                    e = G.Ve(c.aa);
                    f = c.aa;
                    h = -G.ut(f);
                    k && e >= u.Jb && -2686976 == G.Dk(f) && (E = c.w[0],
                    2 == E.ia.length && E.ia[0].code == ca.Cl && 0 == E.ia[1].code && (E = E.ia[0].xb.toLowerCase(),
                    B = (e == u.Jb ? this.sf : this.rf).get(E),
                    void 0 != B && (h = B,
                    f = (f & 65535) + 65536 * -h,
                    c.aa = f)));
                    if (d && -2686977 != c.aa)
                        if (0 != (c.Ka & U.qt) && (w++,
                        0 == (b.na & L.Gp) && l++),
                        0 > e)
                            this.mc[t[7 + e] + h]++;
                        else {
                            d = 0;
                            for (e = this.Tg(c.jb); -1 != e; e = this.eg())
                                this.mc[t[u.cd + e] + h]++,
                                q[d++] = e;
                            q[d] = -1;
                            if (-917504 == G.Dk(f))
                                for (d = c.w[0],
                                f = this.Tg(d.ub); -1 != f; f = this.eg()) {
                                    for (d = 0; q[d] != f && -1 != q[d]; )
                                        d++;
                                    -1 == q[d] && this.mc[t[u.cd + f] + h]++
                                }
                        }
                    d = !1;
                    if (-1507329 == c.aa || -1572865 == c.aa)
                        d = !0,
                        b.na |= L.rt,
                        0 == A ? A = c.aa : c.aa = A,
                        -1572865 == A && (b.na |= L.ay);
                    -2686977 == c.aa && (w++,
                    b.na |= L.Hp)
                }
            c = w + 1;
            for (b = 0; b < m; b++)
                0 != this.mc[b] && (r = this.mc[b],
                this.mc[b] = c,
                c += r + 1);
            this.jc = Array(c);
            this.Ze = Array(c);
            for (h = 0; h < c; h++)
                this.jc[h] = null,
                this.Ze[h] = 0;
            k = Array(m);
            for (h = 0; h < m; h++)
                k[h] = this.mc[h];
            this.l.xe = null;
            m = 0;
            w = [];
            A = [];
            E = l + 1;
            for (r = 0; r < this.vo; r++) {
                b = this.rd[r];
                d = !0;
                for (v = 0; v < b.Bb; v++) {
                    c = b.Wa[v];
                    e = G.Ve(c.aa);
                    f = c.aa;
                    h = -G.ut(f);
                    if (d && -2686977 != c.aa)
                        if (0 != (c.Ka & U.qt) && (0 != (b.na & L.Gp) ? 0 < w.length && (B = w[w.length - 1],
                        B.push(b),
                        B.push(v)) : (this.jc[m] = b,
                        this.Ze[m] = v,
                        m++)),
                        0 > e) {
                            if (B = t[u.cd + e] + h,
                            this.jc[k[B]] = b,
                            this.Ze[k[B]] = v,
                            k[B]++,
                            c.aa == S.EE) {
                                f = !1;
                                for (h = 0; h < b.Bb && b.Wa[h].aa != S.FE && b.Wa[h].aa != S.GE; h++)
                                    ;
                                h < b.Bb && (f = !0);
                                d = c.w[0];
                                if (d.ia[0].code == ca.Cl && 0 == d.ia[1].code) {
                                    h = null;
                                    d = d.ia[0].xb;
                                    this.l.lu(d);
                                    for (e = 0; e < g.length; e++)
                                        if (B = g[e],
                                        p.xc(B.name, d)) {
                                            this.l.xe || (this.l.xe = []);
                                            if (null == h) {
                                                for (z = 0; z < this.l.xe.length && (h = this.l.xe[z],
                                                !p.xc(d, h.name)); z++)
                                                    ;
                                                z == this.l.xe.length && (h = new jb(d),
                                                this.l.xe.push(h));
                                                h.Jx(b);
                                                h.yr |= f
                                            }
                                            B.GH.XI = z + 1
                                        }
                                    if (null == h) {
                                        this.l.xe || (this.l.xe = []);
                                        for (z = 0; z < this.l.xe.length && (h = this.l.xe[z],
                                        !p.xc(d, h.name)); z++)
                                            ;
                                        z == this.l.xe.length && (h = new jb(d),
                                        this.l.xe.push(h));
                                        h.Jx(b);
                                        h.yr |= f
                                    }
                                }
                            }
                        } else {
                            d = 0;
                            for (e = this.Tg(c.jb); -1 != e; e = this.eg())
                                B = t[u.cd + e] + h,
                                this.jc[k[B]] = b,
                                this.Ze[k[B]] = v,
                                k[B]++,
                                q[d++] = e;
                            q[d] = -1;
                            if (-917504 == G.Dk(f))
                                for (d = c.w[0],
                                f = this.Tg(d.ub); -1 != f; f = this.eg()) {
                                    for (d = 0; q[d] != f && -1 != q[d]; )
                                        d++;
                                    -1 == q[d] && (B = t[u.cd + f] + h,
                                    this.jc[k[B]] = b,
                                    this.Ze[k[B]] = v,
                                    k[B]++)
                                }
                        }
                    d = !1;
                    if (-1507329 == c.aa || -1572865 == c.aa)
                        d = !0;
                    if (-2686977 == c.aa && 0 < w.length) {
                        A.pop().aA = E;
                        B = w.pop();
                        for (c = 0; c < B.length; c += 2)
                            this.jc[E] = B[c],
                            this.Ze[E] = B[c + 1],
                            E++;
                        this.jc[E] = null;
                        this.Ze[E] = null;
                        E++
                    }
                }
                if (0 != (b.na & L.Zx))
                    for (B = [],
                    w.push(B),
                    h = 0; h < b.be; h++)
                        if (c = b.Wa[b.Bb + h],
                        2883583 == c.aa) {
                            0 < c.yc && (d = c.w[0],
                            A.push(d));
                            break
                        }
            }
            this.Lk = Array(F + 1 + a / 2);
            for (oil = F = 0; oil < this.l.yf; oil++)
                if (z = this.l.W[oil],
                b = t[u.cd + oil],
                z.tw = b,
                0 != (z.Wr & D.Hf)) {
                    a = 0;
                    r = this.mc[b - G.ut(-786432)];
                    if (0 != r)
                        for (; null != this.jc[r]; ) {
                            b = this.jc[r];
                            c = b.Wa[this.Ze[r]];
                            g = c.w[0].value;
                            v = G.II(b);
                            for (h = b.be; 0 < h; h--,
                            v++)
                                c = b.Wa[v],
                                c.aa == (524288 | z.gd & 65535) && (a |= g);
                            r++
                        }
                    z.vw = a;
                    g = z.Zc;
                    for (c = a = 0; -1 != this.Xe[a]; a += 2)
                        if (this.Xe[a] == g)
                            if (b = this.Xe[a + 1],
                            0 != (b & 32768))
                                z.Nd |= b;
                            else {
                                for (r = 0; r < c && this.Lk[F + r] != b; )
                                    r++;
                                r == c && (this.Lk[F + c++] = b)
                            }
                    0 < c && (z.vm = F,
                    this.Lk[F + c++] = -1,
                    F += c)
                }
            this.Qe[0] = 0;
            for (h = 1; h <= u.cd; h++)
                this.Qe[h] = t[u.cd - h];
            for (oil = 0; oil < this.l.yf; oil++)
                if (z = this.l.W[oil],
                e = z.lb,
                0 == (e & 2147483648)) {
                    do
                        a = this.l.G[e],
                        a.tv = z.tw,
                        a.Wb = z,
                        a.df = z.Nd,
                        0 != (a.sa & D.Hf) && (a.B.mx = z.vw),
                        0 != (a.sa & D.bk) && 0 == (a.df & Q.Vd) && a.F.Ms(!1),
                        0 == (a.sa & D.Hy) && (a.sa &= ~D.ak,
                        0 != (a.df & Q.jq) && 0 != (this.l.A.Xb & H.my) && (a.sa |= D.ak),
                        0 != (a.df & (Q.Vd | Q.kq)) && (a.sa |= D.ak)),
                        e = a.ac;
                    while (0 == (e & 2147483648))
                }
            this.TC = 0 != l ? !0 : !1;
            this.Xe = null;
            this.Dn = !0
        },
        Zs: function() {
            this.Dn = !1;
            this.Ze = this.jc = this.mc = this.Lk = this.yd = null
        },
        em: function(a, b) {
            if (0 != (a & u.bu)) {
                var c;
                for (c = 0; a != this.Ug[c].es || b != this.Ug[c].fs; )
                    c++;
                return c | 32768
            }
            for (c = 0; c < this.l.yf && this.l.W[c].Zc != a; )
                c++;
            return c
        },
        or: function(a) {
            var b;
            for (b = 0; b < this.l.yf; b++)
                if (-1 != this.l.W[b].Zc && this.l.W[b].gd == a)
                    if (0 != (this.l.W[b].Wr & D.bk) && 0 == (this.l.W[b].Wr & D.au))
                        break;
                    else
                        return !1;
            return !0
        },
        Tg: function(a) {
            if (0 == (a & 32768))
                return this.Oo = -1,
                a;
            if (-1 == a)
                return -1;
            this.Oo = a & 32767;
            this.Mo = 0;
            return this.eg()
        },
        eg: function() {
            var a;
            if (-1 == this.Oo || this.Mo >= this.$c[this.Oo].M.length)
                return -1;
            a = this.$c[this.Oo].M[this.Mo + 1];
            this.Mo += 2;
            return a
        },
        eL: function(a) {
            if (0 == (a & 32768))
                return this.Po = -1,
                a;
            if (-1 == a)
                return -1;
            this.Po = a & 32767;
            this.No = 0;
            return this.zC()
        },
        zC: function() {
            var a;
            if (-1 == this.Po || this.No >= this.$c[this.Po].M.length)
                return -1;
            a = this.$c[this.Po].M[this.No + 1];
            this.No += 2;
            return a
        },
        vq: function(a, b, c, d) {
            var e, f;
            if (0 > b) {
                if (null != this.$c)
                    for (e = this.$c[a & 32767],
                    f = 0; f < e.M.length; )
                        this.vq(e.M[f + 1], e.M[f], c, d),
                        f += 2
            } else if (0 > d) {
                if (null != this.$c)
                    for (e = this.$c[c & 32767],
                    f = 0; f < e.M.length; )
                        this.vq(a, b, e.M[f + 1], e.M[f]),
                        f += 2
            } else {
                a = this.l.W[a];
                if (null == a.kj)
                    a.kj = [],
                    a = a.kj;
                else
                    for (a = a.kj,
                    b = 0; b < a.length; b += 2)
                        if (d == a[b])
                            return;
                a.push(d);
                a.push(c)
            }
        },
        ts: function(a, b, c, d) {
            var e, f;
            if (0 > b) {
                if (null != this.$c)
                    for (e = this.$c[a & 32767],
                    f = 0; f < e.M.length; )
                        this.ts(e.M[f + 1], e.M[f], c, d),
                        f += 2
            } else if (0 > d) {
                if (null != this.$c)
                    for (e = this.$c[c & 32767],
                    f = 0; f < e.M.length; )
                        this.ts(a, b, e.M[f + 1], e.M[f]),
                        f += 2
            } else if (a = this.l.W[a],
            c = this.l.W[c],
            a.gd == u.Jb && c.gd == u.Jb && (a.Xk & D.vn) != (c.Xk & D.vn) && (0 != (c.Xk & D.vn) && (a = c,
            b = d),
            d = this.Ub.sc.Vi(b),
            e = d.vc,
            c = !1,
            0 != (e.Ng & D.Hf) && null != e.nf && 0 < e.nf.xo && (e = e.nf.fd[0],
            e.so == V.Fi && (c = e.nr)),
            !c)) {
                a.Xk &= ~D.vn;
                for (a = a.lb; 0 == (a & 2147483648); ) {
                    a = this.l.G[a];
                    if (null == a)
                        break;
                    a.F.Y &= ~A.Gi;
                    a = a.ac
                }
                null != this.Ub.sc.Og && this.Ub.sc.Og[b] && d.ic(this, null)
            }
        },
        wg: function(a) {
            a = this.Ub.ba.Kb(a);
            null != a && (a.eo |= aa.Mp);
            return -1
        },
        eB: function(a, b, c) {
            var d, e, f, g, h;
            for (h = 0; h < a.Bb; h++)
                if (g = a.Wa[h],
                2 <= G.Ve(g.aa))
                    switch (e = 32768 + Q.OG,
                    f = G.Dk(g.aa),
                    f) {
                    case -917504:
                        f = g.w[0];
                        for (d = this.Tg(g.jb); -1 != d; d = this.eg())
                            d = this.l.W[d].Zc,
                            c == d && (e = 0,
                            b = this.fB(b, c, f.ub));
                        if (0 == e)
                            break;
                        for (d = this.Tg(f.ub); -1 != d; d = this.eg())
                            d = this.l.W[d].Zc,
                            c == d && (b = this.fB(b, c, g.jb));
                        break;
                    case -786432:
                        f = g.w[0],
                        e = 32768 + f.value;
                    case -851968:
                        for (d = this.Tg(g.jb); -1 != d; d = this.eg())
                            d = this.l.W[d].Zc,
                            c == d && (this.Xe[b++] = c,
                            this.Xe[b++] = e)
                    }
            return b
        },
        fB: function(a, b, c) {
            for (c = this.Tg(c); -1 != c; c = this.eg()) {
                c = this.l.W[c].Zc;
                var d;
                for (d = 0; d < a && (this.Xe[d] != b || this.Xe[d + 1] != c); d += 2)
                    ;
                d == a && (this.Xe[a++] = b,
                this.Xe[a++] = c)
            }
            return a
        },
        FI: function(a) {
            var b, c, d, e, f, g;
            for (d = 0; d < this.vo; d++)
                for (b = this.rd[d],
                e = 0; e < b.Bb + b.be; e++)
                    for (c = b.Wa[e],
                    f = 0; f < c.yc; f++)
                        switch (c.w[f].code) {
                        case 6:
                        case 35:
                            g = c.w[f],
                            a.wg(g.kp)
                        }
        }
    };
    L.Ip = 1;
    L.mn = 2;
    L.st = 4;
    L.ln = 8;
    L.tt = 16;
    L.Zx = 64;
    L.kn = 128;
    L.iF = 256;
    L.NN = 512;
    L.rt = 1024;
    L.by = 2048;
    L.ay = 4096;
    L.kF = 8192;
    L.Hp = 16384;
    L.Gp = 32768;
    L.$x = L.tt + L.mn + L.st + L.ln;
    L.jF = L.iF + L.kF + L.Zx + L.Gp;
    L.create = function(a) {
        var b = a.file.T
          , c = a.file.V()
          , d = new L;
        d.Bb = a.file.vb();
        d.be = a.file.vb();
        d.na = a.file.o();
        d.HI = a.file.o();
        d.Ui = a.file.s();
        d.Zl = a.file.s();
        d.Wa = Array(d.Bb + d.be);
        var e, f = 0;
        for (e = 0; e < d.Bb; e++)
            d.Wa[f++] = S.create(a);
        for (e = 0; e < d.be; e++)
            d.Wa[f++] = Y.create(a);
        a.file.seek(b - c);
        return d
    }
    ;
    U.hF = 1;
    U.MN = 2;
    U.fF = 4;
    U.Fp = 8;
    U.Bl = 16;
    U.qt = 32;
    U.LN = 64;
    U.Yx = 128;
    U.gF = U.qt + U.hF + U.fF + U.Fp + U.Bl;
    U.Sj = 1;
    U.Xx = 32;
    kb.iH = 0;
    kb.aQ = 1;
    Ba.Ly = 0;
    Ba.MP = 1;
    Ba.NP = 2;
    Ba.OP = 3;
    Ba.prototype = {
        load: function(a) {
            this.bj = a.o();
            this.Vf = a.o();
            this.Lv = a.s();
            this.Mv = a.s();
            this.Kv = a.o();
            a.o();
            this.XA = a.o();
            a.xa(2)
        },
        od: function(a, b) {
            this.Jv[a] = b
        }
    };
    kd.prototype = {
        load: function(a) {
            this.Zf = a.file.s();
            this.list = Array(this.Zf);
            var b, c = 0;
            for (b = 0; b < this.Zf; b++)
                this.list[b] = new Ba,
                this.list[b].load(a.file),
                this.list[b].bj + 1 > c && (c = this.list[b].bj + 1),
                this.list[b].tr = a.sc.Vi(this.list[b].Vf).Me;
            this.Ca = Array(c);
            for (b = 0; b < this.Zf; b++)
                this.Ca[this.list[b].bj] = b
        },
        vA: function(a) {
            return this.list[a]
        },
        lJ: function(a) {
            return a < this.Ca.length ? this.list[this.Ca[a]] : null
        },
        Ao: function() {
            var a;
            if (this.sr < this.Zf) {
                do
                    if (a = this.list[this.sr++],
                    2 <= a.tr)
                        return a;
                while (this.sr < this.Zf)
            }
            return null
        },
        Vq: function() {
            this.sr = 0;
            return this.Ao()
        }
    };
    X.zt = 1;
    X.At = 2;
    X.WN = 4;
    X.wt = 16;
    X.xt = 32;
    X.yt = 64;
    X.XN = 65536;
    X.Jp = 131072;
    X.YN = 262144;
    X.prototype = {
        load: function(a) {
            this.Ma = a.s();
            this.Ij = a.EC();
            this.Kj = a.EC();
            this.Nr = a.s();
            this.Pr = a.s();
            a.Nb();
            this.bz = this.Ma;
            this.ez = this.Ij;
            this.fz = this.Kj;
            this.cz = this.Nr;
            this.dz = this.Pr
        },
        reset: function() {
            this.Ma = this.bz;
            this.Ij = this.ez;
            this.Kj = this.fz;
            this.Nr = this.cz;
            this.Pr = this.dz;
            this.x = this.y = this.tk = this.vk = this.qs = this.rs = 0;
            this.xq = this.Zk = this.ym = this.xm = null;
            this.nx(0);
            this.scale = 1;
            this.eD(1);
            this.fD(1);
            this.kD(this.app.ra / 2);
            this.nD(this.app.Ba / 2);
            this.jD(this.app.ra / 2);
            this.mD(this.app.Ba / 2);
            this.oD(!1);
            this.Ma & X.Jp ? (this.ne = !0,
            this.er()) : (this.ne = !1,
            this.show())
        },
        tI: function() {
            this.oc.wL()
        },
        EH: function(a) {
            null == this.xm && (this.xm = new O);
            this.xm.add(a)
        },
        Vy: function(a) {
            null == this.ym && (this.ym = new O);
            this.ym.add(a)
        },
        tq: function(a) {
            null == this.xq && (this.xq = new O);
            this.xq.add(a)
        },
        iI: function(a, b) {
            this.oc = new Fa;
            this.oc.x = a;
            this.oc.y = b;
            this.Mb = new Fa;
            this.Mb.x = a;
            this.Mb.y = b;
            this.Ra = new Fa;
            this.Ra.x = a;
            this.Ra.y = b;
            this.nx(0);
            this.scale = 1;
            this.eD(1);
            this.fD(1);
            this.kD(this.app.ra / 2);
            this.nD(this.app.Ba / 2);
            this.jD(this.app.ra / 2);
            this.mD(this.app.Ba / 2);
            this.oD(!1);
            this.app.re.me(this.oc);
            this.app.re.me(this.Mb);
            this.app.re.me(this.Ra);
            this.VL()
        },
        nx: function(a) {
            this.angle = a;
            this.oc.angle = a;
            this.Mb.angle = a;
            this.Ra.angle = a
        },
        eD: function(a) {
            this.pc = a;
            this.oc.pc = a;
            this.Mb.pc = a;
            this.Ra.pc = a
        },
        fD: function(a) {
            this.qc = a;
            this.oc.qc = a;
            this.Mb.qc = a;
            this.Ra.qc = a
        },
        kD: function(a) {
            this.Ja = a;
            this.oc.Ja = a;
            this.Mb.Ja = a;
            this.Ra.Ja = a
        },
        nD: function(a) {
            this.Fa = a;
            this.oc.Fa = a;
            this.Mb.Fa = a;
            this.Ra.Fa = a
        },
        jD: function(a) {
            this.sp = a = this.app.ra - a;
            this.oc.sp = a;
            this.Mb.sp = a;
            this.Ra.sp = a
        },
        mD: function(a) {
            this.up = a = this.app.Ba - a;
            this.oc.up = a;
            this.Mb.up = a;
            this.Ra.up = a
        },
        oD: function(a) {
            this.rg = a;
            this.oc.rg = a;
            this.Mb.rg = a;
            this.Ra.rg = a
        },
        zL: function(a, b) {
            this.oc.x = a;
            this.oc.y = b;
            this.Mb.x = a;
            this.Mb.y = b;
            this.Ra.x = a;
            this.Ra.y = b;
            this.show()
        },
        VL: function() {
            this.Ma & X.wt ? this.show() : this.er()
        },
        er: function() {
            this.Ma &= ~X.Jp;
            this.ne && (this.oc.visible = !1,
            this.Mb.visible = !1,
            this.ne = this.Ra.visible = !1)
        },
        show: function() {
            0 == this.ne && (this.oc.visible = !0,
            this.Mb.visible = !0,
            this.ne = this.Ra.visible = !0)
        },
        Lz: function() {
            null != this.oc && (this.app.re.removeChild(this.oc),
            this.oc = null);
            null != this.Mb && (this.app.re.removeChild(this.Mb),
            this.Mb = null);
            null != this.Ra && (this.app.re.removeChild(this.Ra),
            this.Ra = null)
        },
        DH: function(a, b, c, d) {
            var e = new ba;
            e.left = a;
            e.top = b;
            e.right = c;
            e.bottom = d;
            null == this.Zk && (this.Zk = new O);
            this.Zk.add(e)
        },
        mJ: function(a, b) {
            a += this.x;
            b += this.y;
            if (null != this.Zk) {
                var c, d;
                for (c = 0; c < this.Zk.size(); c++)
                    if (d = this.Zk.get(c),
                    a >= d.left && b >= d.top && a < d.right && b < d.bottom)
                        return d
            }
            return null
        },
        Fj: function(a, b, c, d, e) {
            b = b + this.x - a.Ja;
            c = c + this.y - a.Fa;
            var f = b + a.width
              , g = c + a.height
              , h = c;
            0 != d && (h = g - d);
            var q, k;
            k = e == sa.Ap ? this.xm : this.ym;
            if (null == k)
                return null;
            for (e = 0; e < k.size(); e++)
                if (q = k.get(e),
                q.x < f && q.x + q.width > b && q.y < g && q.y + q.height > h && q.Fj(a, b, c, d))
                    return q;
            return null
        },
        Us: function(a, b, c, d, e, f) {
            f = f == sa.Ap ? this.xm : this.ym;
            if (null == f)
                return null;
            a += this.x;
            b += this.y;
            c += this.x;
            d += this.y;
            0 != e && (b = d - e);
            for (e = 0; e < f.size(); e++) {
                var g = f.get(e);
                if (g.x < c && g.x + g.width > a && g.y < d && g.y + g.height > b && g.Us(a, b, c, d))
                    return g
            }
            return null
        }
    };
    ja.prototype = {
        Ab: function(a, b, c) {
            if (null != this.fK)
                if (this.type == u.EG) {
                    var d = this.ie.vc, e;
                    switch (d.fj) {
                    case 1:
                        switch (d.Zh) {
                        case 1:
                            a.zd(b + this.x, c + this.y, this.width, this.height, this.mk, this.Zd, this.$d);
                            break;
                        case 2:
                            a.Fc(b + this.x, c + this.y, this.width, this.height, this.mk, this.Zd, this.$d);
                            break;
                        case 3:
                            a.$w(b + this.x, c + this.y, this.width, this.height, this.mk, this.Zd, this.$d)
                        }
                        break;
                    case 2:
                        switch (d.Zh) {
                        case 1:
                            a.zd(b + this.x, c + this.y, this.width, this.height, this.mk, this.Zd, this.$d);
                            break;
                        case 2:
                            a.Zw(b + this.x, c + this.y, this.width, this.height, this.mk, this.Iu, 0 != this.IA, this.Zd, this.$d);
                            break;
                        case 3:
                            a.JC(b + this.x, c + this.y, this.width, this.height, this.mk, this.Iu, 0 != this.IA, this.Zd, this.$d)
                        }
                        break;
                    case 3:
                        switch (d.Zh) {
                        case 2:
                            e = this.app.ba.Kb(d.Yh);
                            a.KC(e, b + this.x, c + this.y, this.width, this.height, this.Zd, this.$d);
                            break;
                        case 3:
                            e = this.app.ba.Kb(d.Yh),
                            a.LC(e, b + this.x, c + this.y, this.width, this.height, this.Zd, this.$d)
                        }
                    }
                    if (0 < this.borderWidth)
                        switch (d.Zh) {
                        case 1:
                            var f = e = 0
                              , g = this.width
                              , h = this.height;
                            0 != (d.Fo & Ma.lG) && (e += g,
                            g = -g);
                            0 != (d.Fo & Ma.mG) && (f += h,
                            h = -h);
                            a.zd(b + this.x + e, c + this.y + f, b + this.x + e + g, c + this.y + f + h, this.borderColor, this.borderWidth);
                            break;
                        case 2:
                            a.ss(b + this.x, c + this.y, this.width, this.height, this.borderColor, this.borderWidth);
                            break;
                        case 3:
                            a.IC(b + this.x, c + this.y, this.width, this.height, 1, this.borderColor, this.borderWidth)
                        }
                } else
                    this.type == u.DG ? a.Oe(this.ed, b + this.x + this.ed.Ja, c + this.y + this.ed.Fa, 0, 1, 1, this.Zd, this.$d) : null != this.R && this.R.Ab(a, b, c);
            else
                a.Oe(this.ed, b + this.x + this.ed.Ja, c + this.y + this.ed.Fa, 0, 1, 1, this.Zd, this.$d)
        },
        $C: function(a, b) {
            this.Zd = a;
            this.$d = b
        },
        od: function(a, b) {
            b.oc.me(this);
            this.type == u.By && b.tq(this);
            switch (this.mf) {
            case da.gq:
                b.EH(this);
                b.Vy(this);
                break;
            case da.qg:
                b.Vy(this);
                break;
            case da.$t:
                b.DH(this.x, this.y, this.x + this.width, this.y + this.height)
            }
        },
        Fj: function(a, b, c, d) {
            var e;
            switch (this.type) {
            case 0:
                return e = this.height,
                this.mf == da.qg && (e = H.Dl),
                a.vx(b, c, d, this.x, this.y, this.width, e, 0);
            case 1:
                if (0 != this.Sl)
                    return !0;
                e = K.Tj;
                this.mf == da.qg && (e = K.Uj);
                e = this.ed.Rf(e, 0, 1, 1);
                return a.Fj(b, c, d, e, this.x, this.y, 0);
            case 11:
                if (0 != this.Sl)
                    return !0;
                e = K.Tj;
                this.mf == da.qg && (e = K.Uj);
                e = this.ed.Rf(e, 0, 1, 1);
                return a.Fj(b, c, d, e, this.x, this.y, 0)
            }
            return !1
        },
        Us: function(a, b, c, d) {
            var e;
            switch (this.type) {
            case 0:
                if (this.mf == da.qg) {
                    a = this.y + Math.min(this.height, H.Dl);
                    if (this.y < d && a > b)
                        return !0;
                    break
                }
                return !0;
            case 1:
                if (0 != this.Sl)
                    return !0;
                e = K.Tj;
                this.mf == da.qg && (e = K.Uj);
                e = this.ed.Rf(e, 0, 1, 1);
                return e.vx(this.x, this.y, 0, a, b, c, d, 0);
            case 11:
                if (0 != this.Sl)
                    return !0;
                e = K.Tj;
                this.mf == da.qg && (e = K.Uj);
                e = this.ed.Rf(e, 0, 1, 1);
                return e.vx(this.x, this.y, 0, a, b, c, d, 0)
            }
            return !1
        }
    };
    u.GP = 1;
    u.EP = 2;
    u.IP = 4;
    u.HP = 8;
    u.iq = 16;
    u.MG = 32;
    u.FP = 64;
    u.DP = 1;
    u.CP = 2;
    u.Ky = 4;
    u.cd = 7;
    u.Cy = -7;
    u.aP = -6;
    u.$O = -5;
    u.un = -4;
    u.fq = -3;
    u.cP = -2;
    u.dP = -1;
    u.EG = 0;
    u.DG = 1;
    u.Jb = 2;
    u.zh = 3;
    u.Dy = 4;
    u.Ey = 5;
    u.Ay = 6;
    u.tn = 7;
    u.bP = 8;
    u.yy = 9;
    u.ZO = 10;
    u.By = 11;
    u.zy = 10;
    u.ng = 32;
    u.bu = 32768;
    u.prototype = {
        Ov: function(a) {
            this.Go = a.o();
            this.Me = a.o();
            this.ci = a.o();
            a.xa(2);
            this.nw = a.s();
            this.ow = a.s()
        },
        load: function(a) {
            a.seek(this.dC);
            switch (this.Me) {
            case 0:
                this.vc = new Ma;
                break;
            case 1:
                this.vc = new md;
                break;
            default:
                this.vc = new D
            }
            this.vc.load(a, this.Me);
            this.eC = 0
        },
        lM: function() {
            this.vc = null
        },
        ic: function(a, b) {
            this.vc.ic(a, b)
        }
    };
    ld.prototype = {
        gi: function(a) {
            this.jj = a.s();
            this.zb = Array(this.jj);
            var b;
            for (b = this.Pg = 0; b < this.jj; b++)
                for (var c = 0, d; 32639 != c; )
                    if (c = a.o(),
                    a.o(),
                    d = a.s(),
                    0 != d) {
                        d = a.T + d;
                        switch (c) {
                        case 17476:
                            this.zb[b] = new u;
                            this.zb[b].Ov(a);
                            this.zb[b].Go >= this.Pg && (this.Pg = this.zb[b].Go + 1);
                            break;
                        case 17477:
                            this.zb[b].pw = a.Nb();
                            break;
                        case 17478:
                            this.zb[b].dC = a.T
                        }
                        a.seek(d)
                    }
            this.di = Array(this.Pg);
            for (b = 0; b < this.jj; b++)
                this.di[this.zb[b].Go] = b;
            this.Ho = Array(this.Pg);
            this.Og = Array(this.Pg);
            for (a = 0; a < this.Pg; a++)
                this.Ho[a] = 0,
                this.Og[a] = 0
        },
        Vi: function(a) {
            return this.zb[this.di[a]]
        },
        yL: function() {
            var a;
            for (a = 0; a < this.jj; a++)
                this.zb[a].ci &= ~u.iq
        },
        SL: function(a) {
            this.zb[this.di[a]].ci |= u.iq
        },
        tA: function() {
            var a;
            for (a = 0; a < this.jj; a++)
                if (0 != (this.zb[a].ci & u.iq))
                    return this.Mq = a,
                    this.zb[a];
            return null
        },
        yA: function() {
            if (this.Mq < this.jj) {
                var a;
                for (a = this.Mq + 1; a < this.jj; a++)
                    if (0 != (this.zb[a].ci & u.iq))
                        return this.Mq = a,
                        this.zb[a]
            }
            return null
        },
        wf: function() {
            var a;
            for (a = 0; a < this.Pg; a++)
                this.Ho[a] = 0
        },
        Dj: function(a) {
            this.Ho[a] = 1
        },
        load: function(a) {
            var b;
            for (b = 0; b < this.Pg; b++)
                if (0 != this.Ho[b]) {
                    if (0 == this.Og[b] || 0 != this.Og[b] && 0 != (this.zb[this.di[b]].eC & u.MG))
                        this.zb[this.di[b]].load(a),
                        this.Og[b] = 1
                } else
                    0 != this.Og[b] && (this.zb[this.di[b]].lM(),
                    this.Og[b] = 0);
            this.wf()
        },
        ic: function(a, b) {
            var c;
            for (c = 0; c < this.Pg; c++)
                0 != this.Og[c] && this.zb[this.di[c]].ic(a, b)
        }
    };
    da.Fy = 0;
    da.gq = 1;
    da.qg = 2;
    da.$t = 3;
    da.FG = 4;
    md.prototype = {
        load: function(a) {
            a.xa(4);
            this.$B = a.o();
            this.WB = a.o();
            this.XB = a.s();
            this.YB = a.s();
            this.Yh = a.o()
        },
        ic: function(a) {
            null != a && (a = a.wg(this.Yh),
            -1 != a && (this.Yh = a))
        }
    };
    Ma.lG = 1;
    Ma.mG = 2;
    Ma.prototype = {
        load: function(a) {
            a.xa(4);
            this.$B = a.o();
            this.WB = a.o();
            this.XB = a.s();
            this.YB = a.s();
            this.Tr = a.o();
            this.Sr = a.hd();
            this.Zh = a.o();
            this.fj = a.o();
            if (1 == this.Zh)
                this.Fo = a.o();
            else
                switch (this.fj) {
                case 1:
                    this.Mg = this.tm = a.hd();
                    break;
                case 2:
                    this.Mg = a.hd();
                    this.tm = a.hd();
                    this.Eo = a.s();
                    break;
                case 3:
                    this.Yh = a.o()
                }
        },
        ic: function(a) {
            3 == this.fj && null != a && (a = a.wg(this.Yh),
            -1 != a && (ocImage = a))
        }
    };
    D.mP = 1;
    D.lP = 2;
    D.IG = 4;
    D.Jy = 8;
    D.Hf = 16;
    D.$j = 32;
    D.oP = 64;
    D.qP = 128;
    D.LG = 256;
    D.bk = 512;
    D.nP = 1024;
    D.KG = 2048;
    D.au = 4096;
    D.Iy = 8192;
    D.ak = 16384;
    D.Hy = 32768;
    D.pP = 65536;
    D.Gy = 131072;
    D.JG = 1048576;
    D.eP = 1;
    D.kP = 2;
    D.vn = 4;
    D.hq = 8;
    D.gP = 4;
    D.fP = 48;
    D.jP = 16;
    D.iP = 32;
    D.hP = 48;
    D.GG = 64;
    D.HG = 128;
    D.sP = 1;
    D.zP = 2;
    D.yP = 4;
    D.AP = 8;
    D.xP = 16;
    D.uP = 32;
    D.rP = 64;
    D.wP = 128;
    D.vP = 256;
    D.BP = 512;
    D.tP = 1024;
    D.prototype = da;
    D.prototype = {
        load: function(a, b) {
            var c = a.T;
            this.kw = Array(8);
            var d;
            a.xa(4);
            a.xa(2);
            var e = a.o();
            a.xa(2);
            var f = a.o()
              , g = a.o()
              , h = a.o();
            this.Ng = a.s();
            for (d = 0; 8 > d; d++)
                this.kw[d] = a.V();
            a.o();
            var q = a.o()
              , k = a.o();
            this.gj = a.o();
            var l = a.o();
            this.Dc = a.s();
            a.hd();
            d = a.s();
            var n = a.s();
            this.Do = this.um = null;
            0 != h && (a.seek(c + h),
            this.nf = new ie,
            this.nf.load(a));
            0 != q && (a.seek(c + q),
            this.$h = new ee,
            this.$h.load(a, 0 != (this.gj & D.HG)));
            0 != k && (a.seek(c + k),
            this.hj = new de,
            this.hj.load(a));
            0 != g && (a.seek(c + g),
            this.ej = new Pa,
            this.ej.load(a));
            0 != f && (a.seek(c + f),
            this.Yc = new od,
            this.Yc.load(a));
            0 != l && (a.seek(c + l),
            f = a.s(),
            a.xa(4),
            this.bC = a.s(),
            a.s(),
            this.aC = a.s(),
            0 != f - 20 && (this.ZB = a.T));
            0 != d && (a.seek(c + d),
            this.um = new ta,
            this.um.load(a));
            0 != n && (a.seek(c + n),
            this.Do = new ta,
            this.Do.load(a));
            if (0 != e)
                switch (a.seek(c + e),
                b) {
                case 3:
                case 4:
                    this.Yc = new qd;
                    this.Yc.load(a);
                    break;
                case 5:
                case 6:
                case 7:
                    this.kb = new la;
                    this.kb.load(a);
                    break;
                case 8:
                    this.Yc = new pd;
                    this.Yc.load(a);
                    this.Ng &= ~(D.bk | D.au | D.IG);
                    break;
                case 9:
                    this.Yc = new nd,
                    this.Yc.load(a)
                }
        },
        ic: function(a, b) {
            null != this.ej && this.ej.ic(a);
            null != this.Yc && this.Yc.ic(a, b);
            null != this.kb && this.kb.ic(a, b)
        }
    };
    nd.prototype = {
        load: function(a) {
            a.xa(4);
            this.ai = a.s();
            this.bi = a.s();
            a.o();
            this.cC = a.o();
            this.Md = a.s();
            a.xa(8);
            this.lw = a.Nb()
        },
        ic: function() {}
    };
    od.prototype = {
        load: function(a) {
            a.xa(2);
            this.Bz = a.s();
            this.Dz = a.s();
            this.Cz = a.s()
        },
        ic: function() {}
    };
    la.tN = 0;
    la.sN = 1;
    la.TE = 2;
    la.SE = 3;
    la.rN = 4;
    la.uN = 5;
    la.jt = 256;
    la.prototype = {
        load: function(a) {
            a.xa(4);
            this.ai = a.s();
            this.bi = a.s();
            this.mw = a.o();
            this.pf = a.o();
            this.Vk = a.o();
            this.ij = a.o();
            switch (this.pf) {
            case 1:
            case 4:
                this.om = a.o();
                this.frames = Array(this.om);
                var b;
                for (b = 0; b < this.om; b++)
                    this.frames[b] = a.o();
                break;
            case 2:
            case 3:
            case 5:
                if (this.Tr = a.o(),
                this.Sr = a.hd(),
                this.Zh = a.o(),
                this.fj = a.o(),
                1 == this.Zh)
                    this.Fo = a.o();
                else
                    switch (this.fj) {
                    case 1:
                        this.Mg = a.hd();
                        break;
                    case 2:
                        this.Mg = a.hd(),
                        this.tm = a.hd(),
                        this.Eo = a.s()
                    }
            }
        },
        ic: function(a, b) {
            switch (this.pf) {
            case 1:
            case 4:
                var c;
                for (c = 0; c < this.om; c++)
                    null != a && a.wg(this.frames[c]);
                break;
            case 5:
                null != b && b.wg(this.ij)
            }
        }
    };
    pd.prototype = {
        load: function(a) {
            a.s();
            a.s();
            this.Md = a.s();
            a.hd();
            this.ai = a.s();
            this.bi = a.s();
            a.xa(4);
            var b = a.s();
            this.text = a.Nb(b)
        },
        ic: function() {}
    };
    qa.dQ = 0;
    qa.cQ = 1;
    qa.eQ = 2;
    qa.fQ = 4;
    qa.bQ = 15;
    qa.jH = 256;
    qa.Py = 512;
    qa.prototype = {
        load: function(a) {
            this.bn = a.V();
            this.qp = a.o();
            this.yx = a.hd();
            this.ui = a.Nb()
        },
        ic: function(a, b) {
            null != b && b.wg(this.bn)
        }
    };
    qd.prototype = {
        load: function(a) {
            var b = a.T;
            a.xa(4);
            this.Bw = a.s();
            this.Cw = a.s();
            this.Yk = a.s();
            this.Yb = Array(this.Yk);
            var c = Array(this.Yk), d;
            for (d = 0; d < this.Yk; d++)
                c[d] = a.s();
            for (d = 0; d < this.Yk; d++)
                this.Yb[d] = new qa,
                a.seek(b + c[d]),
                this.Yb[d].load(a)
        },
        ic: function(a, b) {
            var c;
            for (c = 0; c < this.Yk; c++)
                this.Yb[c].ic(a, b)
        }
    };
    M.Df = 1;
    M.Ft = 2;
    M.pO = 4;
    M.Ai = 8;
    M.Bi = 16;
    M.VF = 32;
    M.iy = 64;
    M.rh = 8192;
    M.oO = 16384;
    M.qO = 32768;
    M.prototype = {
        dD: function(a, b) {
            if (this.b.Gb != a || this.b.Hb != b) {
                0 <= a && (this.b.Gb = a);
                0 <= b && (this.b.Hb = b);
                this.b.N = !0;
                var c = this.c.h.ba.Fk(this.b.Ta, this.b.gb, this.b.Gb, this.b.Hb);
                null != c && (this.L = c.width,
                this.K = c.height,
                this.oa = c.Ja,
                this.pa = c.Fa)
            }
        },
        $: function() {},
        handle: function() {},
        Gh: function() {},
        zz: function() {},
        display: function() {},
        Db: function() {},
        cJ: function() {
            return null
        },
        $C: function() {},
        mu: function() {},
        Ql: function() {},
        Ti: function() {
            return 0
        },
        vl: function() {},
        Ik: function() {},
        Zm: function() {},
        dd: function() {
            return -1
        },
        Ck: function() {
            return 0
        },
        Td: function() {},
        Mi: function() {},
        am: function() {}
    };
    rd.prototype = p.extend(new M, {
        handle: function() {
            this.F.handle();
            this.b.N && (this.b.N = !1)
        },
        mu: function(a, b, c, d, e) {
            this.Ea = this.c.A.Xa[d];
            this.za = e;
            this.Ea.Ra.me(this)
        },
        Ab: function(a, b, c) {
            if (this.za && (0 == (this.X & M.Ai) || this.F.bh)) {
                var d = this.F.Qb;
                this.F.Y & A.WG && (d |= A.Kx);
                var e = this.c.h.ba.Kb(this.b.Ta);
                e && (this.yl ? a.uj(this.yl, b + this.v - this.c.ha + this.Ea.x - e.Ja, c + this.u - this.c.la + this.Ea.y - e.Fa, this.yl.width * this.b.Gb, this.yl.height * this.b.Hb, d, this.F.Rb) : a.Oe(e, b + this.v - this.c.ha + this.Ea.x, c + this.u - this.c.la + this.Ea.y, this.b.gb, this.b.Gb, this.b.Hb, d, this.F.Rb))
            }
        },
        Ti: function() {
            return this.Ea.Ra.removeChild(this)
        },
        vl: function() {
            this.za = !0
        },
        Ik: function() {
            this.za = !1
        },
        dd: function() {
            return this.Ea.Ra.dd(this)
        },
        Ck: function() {
            return this.Ea.Ra.children.length
        },
        Td: function(a) {
            a >= this.Ea.Ra.children.length && (a = this.Ea.Ra.children.length);
            0 > a && (a = 0);
            this.Ea.Ra.Td(this, a)
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        }
    });
    R.Nx = 1;
    R.mE = 2;
    R.oE = 4;
    R.nN = 8;
    R.pE = 16;
    R.lN = 32;
    R.ZM = 64;
    R.pN = 128;
    R.YM = 256;
    R.qN = 512;
    R.oN = 1024;
    R.bN = 2048;
    R.zp = 4096;
    R.aN = 8192;
    R.Mx = 16384;
    R.hN = 32768;
    R.kE = 65536;
    R.iN = 131072;
    R.$M = 262144;
    R.nE = 524288;
    R.jN = 1048576;
    R.lE = 2097152;
    R.gN = 12582912;
    R.dN = 0;
    R.fN = 4194304;
    R.eN = 8388608;
    R.cN = 12582912;
    R.mN = 16777216;
    R.kN = 33554432;
    R.prototype = p.extend(new M, {
        vD: function(a, b, c) {
            b = a.Yc;
            this.L = b.ai;
            this.K = b.bi;
            this.Md = b.Md;
            0 != (this.Md & R.pE) && (this.Md |= R.kE);
            -1 == c && (c = 0,
            0 != (this.Md & R.Mx) && (c = b.cC));
            null == b.lw || 0 != b.lw.length || 0 == (this.Md & R.Mx) || c >= this.c.h.Pf || c == this.c.h.De || (this.ne = 0 != (a.gj & D.hq) ? !0 : !1,
            this.Nc = new Fa,
            this.Nc.x = this.v - this.c.ha,
            this.Nc.y = this.u - this.c.la,
            this.c.h.re.me(this),
            this.zw = this.v,
            this.Aw = this.u,
            this.C = new n(this.c.h,this.c.h.file,this.c.h.path,!0),
            this.C.aD(this.c.h, c, this.Md, this.Nc, this.L, this.K),
            this.C.digest(),
            0 != (this.Md & R.zp) && null == this.c.h.Jg && (this.c.h.Jg = this,
            this.c.h.H.pause()),
            this.C.sx(),
            this.C.Ps((this.c.h.Jj + this.Nc.x) * this.c.h.pc, (this.c.h.Lj + this.Nc.y) * this.c.h.qc),
            this.C.lp(),
            this.c.h.Ib.push(this.C))
        },
        $: function(a) {
            this.vD(a, !0, -1)
        },
        handle: function() {
            this.B.move();
            if (null != this.C) {
                if (this.zw != this.v || this.Aw != this.u)
                    this.Nc.x = this.v - this.c.ha,
                    this.Nc.y = this.u - this.c.la,
                    this.zw = this.v,
                    this.Aw = this.u,
                    this.C.Ps(this.Nc.x * this.c.h.pc, this.Nc.y * this.c.h.qc),
                    this.mM();
                0 == this.C.lp() ? (this.Oq(),
                0 != (this.Md & R.zp) && null != this.C.ma && this.C.ma.Jg == this && (this.C.ma.Jg = null,
                this.C.ma.H.resume()),
                this.C = null) : (this.hC = this.level,
                this.level = this.C.De)
            }
        },
        Ab: function(a) {
            this.ne && null != this.C && this.C.Uz(a, this.Nc.x, this.Nc.y)
        },
        Db: function() {
            if (null != this.C) {
                switch (this.C.cb) {
                case 3:
                    this.C.On()
                }
                this.Oq();
                this.C.Yz();
                0 != (this.Md & R.zp) && null != this.C.ma && this.C.ma.Jg == this && (this.C.ma.Jg = null,
                this.C.ma.H.resume());
                this.C = null
            }
        },
        Oq: function() {
            var a;
            for (a = 0; a < this.c.h.Ib.length; a++)
                if (this.c.h.Ib[a] == this.C) {
                    this.c.h.Ib.splice(a, 1);
                    break
                }
            this.c.h.re.removeChild(this.Nc)
        },
        aS: function() {
            if (null != this.C) {
                if (null != this.C.H) {
                    this.C.H.wb = l.oy;
                    return
                }
                this.Db(!0)
            }
            this.vD(this.S, !1, -1)
        },
        fR: function() {
            null != this.C && (null != this.C.H && (this.C.H.wb = l.Op),
            0 != (this.Md & R.zp) && null != this.C.ma && this.C.ma.Jg == this && (this.C.ma.Jg = null,
            this.C.ma.H.resume()))
        },
        er: function() {
            this.ne = !1
        },
        show: function() {
            this.ne = !0
        },
        JR: function(a) {
            null != this.C && null != this.C.H && 0 <= a && 4096 > a && (this.C.H.wb = l.Pp,
            this.C.H.Vm = 32768 | a)
        },
        Fb: function() {
            null != this.C && null != this.C.H && (this.C.H.wb = l.Qp)
        },
        RR: function() {
            null != this.C && null != this.C.H && (this.C.H.wb = l.Ht)
        },
        bS: function() {
            null != this.C && null != this.C.H && (this.C.H.wb = l.oG)
        },
        pause: function() {
            null != this.C && null != this.C.H && this.C.H.pause()
        },
        resume: function() {
            null != this.C && null != this.C.H && this.C.H.resume()
        },
        jS: function(a, b) {
            null != this.C && this.C.PL(a, b)
        },
        iS: function(a, b) {
            null != this.C && this.C.OL(a, b)
        },
        RJ: function() {
            return null != this.C && null != this.C.H ? 0 != this.C.H.fg : !1
        },
        HQ: function() {
            return null == this.C
        },
        IR: function() {
            return this.ne
        },
        kR: function() {
            return this.level != this.hC
        },
        vR: function(a) {
            return null != this.C ? this.C.uA(a) : ""
        },
        wR: function(a) {
            return null != this.C ? this.C.jv(a) : 0
        },
        tR: function() {
            return this.level + 1
        },
        px: function() {},
        ox: function() {},
        NQ: function() {
            null != this.C && this.ne && (hoAdRunHeader.h.XK.removeChild(this),
            hoAdRunHeader.h.XK.me(this))
        },
        mM: function() {
            if (null != this.C && null != this.C.H) {
                var a = this.C.H, b = 0, c;
                for (c = 0; c < a.pb; c++) {
                    for (; null == a.G[b]; )
                        b++;
                    var d = a.G[b];
                    b++;
                    d.am()
                }
            }
        },
        Mi: function() {
            null != this.C && (this.C.Ps((this.c.h.Jj + this.Nc.x) * this.c.h.pc, (this.c.h.Lj + this.Nc.y) * this.c.h.qc),
            this.C.Gm())
        }
    });
    sd.prototype = {
        $: function() {
            this.Hb = this.Gb = 1;
            this.gb = 0;
            this.Ec = -1
        },
        Db: function() {}
    };
    ga.Vx = 15;
    ga.NE = 240;
    ga.OE = 4;
    ga.LE = 61440;
    ga.ME = 12;
    ga.PE = 512;
    ga.RE = 1024;
    ga.QE = 2048;
    ga.prototype = p.extend(new M, {
        $: function() {
            this.Kc = -1;
            this.ep = this.Jc = 0;
            this.L = this.K = 1;
            if (null == this.S.kb)
                this.K = this.kd = this.L = this.jd = 1;
            else {
                var a = this.S.kb;
                this.L = this.jd = a.ai;
                this.K = this.kd = a.bi;
                this.Fd = a.Vk;
                this.type = a.pf;
                switch (this.type) {
                case 5:
                    var b = this.Kc;
                    -1 == b && (b = a.ij);
                    this.font = this.c.h.Vb.Qf(b);
                    this.Jd = this.font.bf();
                    this.Jc = a.Mg;
                    break;
                case 2:
                case 3:
                    this.Jc = a.Mg,
                    this.ep = a.tm
                }
            }
            a = this.S.Yc;
            this.qb = a.Dz;
            this.Rc = a.Cz;
            this.wa = a.Bz;
            this.Ni = !1
        },
        Db: function() {},
        handle: function() {
            this.F.handle();
            this.b.N && (this.b.N = !1)
        },
        yg: function() {
            var a = this.S.kb;
            if (5 == this.type) {
                var b = rsFont;
                -1 == b && (b = a.ij);
                return this.c.h.Vb.Zq(b)
            }
            return null
        },
        ul: function(a, b) {
            5 == this.type && (this.Kc = this.c.h.Vb.wq(a),
            this.font = this.c.h.Vb.Qf(this.Kc),
            this.Jd = this.font.bf(),
            null != b && (this.L = this.jd = b.right - b.left,
            this.K = this.kd = b.bottom - b.top),
            this.ib())
        },
        Yq: function() {
            return this.Jc
        },
        Ns: function(a) {
            this.Jc = a;
            this.ib()
        },
        Lu: function(a) {
            0 != this.Ni || p.Cv(a) || (this.Ni = !0)
        },
        Hn: function(a) {
            0 == this.Ni ? (a = p.sd(a),
            a < this.qb && (a = this.qb),
            a > this.Rc && (a = this.Rc),
            a != Math.round(this.wa) && (this.wa = a,
            this.b.N = !0,
            this.ib())) : (a < this.qb && (a = this.qb),
            a > this.Rc && (a = this.Rc),
            a != this.wa && (this.wa = a,
            this.b.N = !0,
            this.ib()))
        },
        fI: function(a) {
            this.Lu(a);
            this.Hn(this.wa + a)
        },
        gI: function(a) {
            this.Lu(a);
            this.Hn(this.wa - a)
        },
        aR: function(a) {
            this.qb = a;
            this.Hn(this.wa)
        },
        $Q: function(a) {
            this.Rc = a;
            this.Hn(this.wa)
        },
        YQ: function(a) {
            this.Jc = a;
            this.ib()
        },
        ZQ: function(a) {
            this.ep = a;
            this.ib()
        },
        XQ: function() {
            return this.wa
        },
        WQ: function() {
            return this.qb
        },
        VQ: function() {
            return this.Rc
        },
        TQ: function() {
            return this.Jc
        },
        UQ: function() {
            return this.ep
        },
        Ql: function(a, b, c, d, e, f) {
            null != this.S.kb && 1 != this.Qa && (this.Qa = !0,
            this.az = d,
            this.za = e,
            this.Ea = this.c.A.Xa[c],
            this.qa = this.az ? this.Ea.Mb : this.Ea.Ra,
            0 > f ? this.qa.me(this) : this.qa.uq(this, f),
            5 != this.type && this.ib())
        },
        Ti: function() {
            if (null == this.S.kb || 0 == this.Qa)
                return -1;
            this.Qa = !1;
            var a = this.qa.dd(this);
            this.qa.removeChild(this);
            return a
        },
        dd: function() {
            return this.Qa ? this.qa.dd(this) : -1
        },
        Ck: function() {
            return this.Qa ? this.qa.children.length : -1
        },
        Td: function(a) {
            this.Qa && this.qa.Td(this, a)
        },
        vl: function() {
            null != this.S.kb && 0 == this.za && (this.za = !0,
            this.ib())
        },
        Ik: function() {
            null != this.S.kb && 1 == this.za && (this.za = !1)
        },
        Gh: function() {
            this.Yd || this.ib()
        },
        ib: function() {
            var a, b = this.S.kb;
            switch (this.type) {
            case 4:
                this.ah = this.Rc <= this.qb ? 0 : Math.floor((this.wa - this.qb) * b.om / (this.Rc - this.qb));
                this.ah = Math.min(this.ah, b.om - 1);
                a = this.c.h.ba.Kb(b.frames[Math.max(this.ah, 0)]);
                this.L = a.width;
                this.K = a.height;
                this.oa = a.Ja;
                this.pa = a.Fa;
                break;
            case 2:
            case 3:
                a = this.jd;
                b.pf == la.TE && (a = this.kd);
                this.ah = this.Rc <= this.qb ? 0 : (this.wa - this.qb) * a / (this.Rc - this.qb);
                b.pf == la.SE ? (this.pa = 0,
                this.K = this.kd,
                this.L = this.ah,
                this.oa = 0 != (b.Vk & la.jt) ? this.ah - this.jd : 0) : (this.oa = 0,
                this.L = this.jd,
                this.K = this.ah,
                this.pa = 0 != (b.Vk & la.jt) ? this.ah - this.kd : 0);
                break;
            case 1:
                a = 0 == this.Ni ? p.Yi(this.wa, this.Fd) : p.Wu(this.wa, this.Fd);
                var c, d, e, f = 0, g = 0;
                for (c = a.length - 1; 0 <= c; c--)
                    d = a.charCodeAt(c),
                    e = 0,
                    45 == d ? e = b.frames[10] : 46 == d ? e = b.frames[12] : 43 == d ? e = b.frames[11] : 101 == d || 69 == d ? e = b.frames[13] : 48 <= d && 57 >= d && (e = b.frames[d - 48]),
                    0 <= e && (d = this.c.h.ba.Kb(e),
                    null != d ? (f += d.width,
                    g = Math.max(g, d.height)) : toto = 2);
                this.oa = f;
                this.pa = g;
                this.L = f;
                this.K = g;
                break;
            case 5:
                a = 0 == this.Ni ? p.Yi(this.wa, this.Fd) : p.Wu(this.wa, this.Fd),
                this.oa = b = null != this.mb ? this.mb.measureText(a, this.font) : (new na(this.c.h,16,16)).measureText(a, this.font),
                this.pa = this.kd / 2 + this.Jd / 2,
                this.L = b,
                this.K = this.Jd,
                null == this.mb ? this.mb = new na(this.c.h,this.L,this.K) : (this.L > this.mb.width || this.K > this.mb.height) && this.mb.resize(this.L, this.K),
                this.mb.Rs(a, p.Dp | p.Ep, new ba(0,0,1E3,1E3), this.font, this.Jc)
            }
            this.Yd = !0
        },
        Ab: function(a, b, c) {
            if (this.za && this.Yd) {
                var d, e, f;
                d = this.S.kb;
                b = b + this.v - this.oa - this.c.ha + this.Ea.x;
                c = c + this.u - this.pa - this.c.la + this.Ea.y;
                var g = this.L
                  , h = this.K;
                switch (this.type) {
                case 4:
                    d = this.c.h.ba.Kb(d.frames[Math.max(this.ah, 0)]);
                    a.Oe(d, b + d.Ja, c + d.Fa, 0, 1, 1, this.F.Qb, this.F.Rb);
                    break;
                case 2:
                case 3:
                    e = this.Jc;
                    f = this.ep;
                    switch (d.fj) {
                    case 1:
                        a.Fc(b, c, g, h, e, this.F.Qb, this.F.Rb);
                        break;
                    case 2:
                        0 != (d.Vk & la.jt) && (dl = e,
                        e = f,
                        f = dl),
                        a.Zw(b, c, g, h, e, f, 0 != d.Eo, this.F.Qb, this.F.Rb)
                    }
                    break;
                case 1:
                    e = 0 == this.Ni ? p.Yi(this.wa, this.Fd) : p.Wu(this.wa, this.Fd);
                    for (f = 0; f < e.length; f++)
                        h = e.charCodeAt(f),
                        g = 0,
                        45 == h ? g = d.frames[10] : 46 == h || 44 == h ? g = d.frames[12] : 43 == h ? g = d.frames[11] : 69 == h || 101 == h ? g = d.frames[13] : 48 <= h && 57 >= h && (g = d.frames[h - 48]),
                        g = this.c.h.ba.Kb(g),
                        null != g && (a.Oe(g, b + g.Ja, c + g.Fa, 0, 1, 1, this.F.Qb, this.F.Rb),
                        b += g.width);
                    break;
                case 5:
                    this.mb.Ab(a, b, c, this.F.Qb, this.F.Rb)
                }
            }
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        }
    });
    td.prototype = p.extend(new M, {
        $: function() {
            this.Kc = -1;
            this.Jc = 0;
            var a = this.S.kb;
            this.L = this.jd = a.ai;
            this.K = this.kd = a.bi;
            this.type = a.pf;
            this.Jc = a.Mg;
            this.tl = a.mw;
            this.wa = this.c.h.BA()[this.tl - 1];
            this.Fd = a.Vk;
            if (5 == this.type) {
                var b = this.Kc;
                -1 == b && (b = a.ij);
                this.font = this.c.h.Vb.Qf(b);
                this.Jd = this.font.bf()
            }
        },
        Db: function() {},
        handle: function() {
            var a = this.c.h.BA()[this.tl - 1];
            a != this.wa && (this.wa = a,
            this.ib());
            this.F.handle();
            this.b.N && (this.b.N = !1)
        },
        yg: function() {
            var a = this.S.kb;
            if (5 == a.pf) {
                var b = this.Kc;
                -1 == b && (b = a.ij);
                return this.c.h.Vb.Zq(b)
            }
            return null
        },
        ul: function(a, b) {
            5 == type && (this.Kc = hoAdRunHeader.h.Vb.wq(a),
            a = this.c.h.Vb.Qf(this.Kc),
            this.Jd = a.bf(),
            null != b && (this.L = this.jd = b.right - b.left,
            this.K = this.kd = b.bottom - b.top),
            this.ib())
        },
        Yq: function() {
            return this.Jc
        },
        Ns: function(a) {
            this.Jc = a;
            this.ib()
        },
        Ql: function(a, b, c, d, e, f) {
            null != this.S.kb && 1 != this.Qa && (this.Qa = !0,
            this.za = e,
            this.Ea = this.c.A.Xa[c],
            this.qa = d ? this.Ea.Mb : this.Ea.Ra,
            0 > f ? this.qa.me(this) : this.qa.uq(this, f),
            5 != this.type && this.ib())
        },
        Ti: function() {
            if (null == this.S.kb || 0 == this.Qa)
                return -1;
            this.Qa = !1;
            var a = this.qa.dd(this);
            this.qa.removeChild(this);
            return a
        },
        dd: function() {
            return this.Qa ? this.qa.dd(this) : -1
        },
        Ck: function() {
            return this.Qa ? this.qa.children.length : -1
        },
        Td: function(a) {
            this.Qa && this.qa.Td(this, a)
        },
        vl: function() {
            null != this.S.kb && 0 == this.za && (this.za = !0,
            this.ib())
        },
        Ik: function() {
            null != this.S.kb && 1 == this.za && (this.za = !1)
        },
        hD: function(a) {
            a != this.wa && (this.wa = a,
            this.ib())
        },
        Gh: function() {
            this.Yd || this.ib()
        },
        ib: function() {
            this.Yd = !0;
            this.L = this.K = 1;
            if (null != this.S.kb) {
                var a = this.S.kb, b, c = p.Yi(this.wa, this.Fd);
                switch (a.pf) {
                case 1:
                    var d, e, f = 0, g = 0;
                    for (d = c.length - 1; 0 <= d; d--)
                        e = c.charCodeAt(d),
                        b = 0,
                        45 == e ? b = a.frames[10] : 46 == e ? b = a.frames[12] : 43 == e ? b = a.frames[11] : 101 == e || 69 == e ? b = a.frames[13] : 48 <= e && 57 >= e && (b = a.frames[e - 48]),
                        0 <= b && (b = this.c.h.ba.Kb(b),
                        f += b.width,
                        g = Math.max(g, b.height));
                    this.oa = f;
                    this.pa = g;
                    this.L = f;
                    this.K = g;
                    break;
                case 5:
                    this.oa = a = null != this.mb ? this.mb.measureText(c, this.font) : (new na(this.c.h,8,8)).measureText(c, this.font),
                    this.pa = this.kd / 2 + this.Jd / 2,
                    this.L = a,
                    this.K = this.Jd,
                    null == this.mb ? this.mb = new na(this.c.h,this.L,this.K) : (this.L > this.mb.width || this.K > this.mb.height) && this.mb.resize(this.L, this.K),
                    this.mb.Rs(c, p.Dp | p.Ep, new ba(0,0,1E3,1E3), this.font, this.Jc)
                }
            }
        },
        Ab: function(a, b, c) {
            if (this.za && this.Yd) {
                this.globalAlpha = this.alpha;
                this.globalCompositeOperation = this.pk;
                var d = this.S.kb;
                b = b + this.v - this.oa - this.c.ha + this.Ea.x;
                var e = c + this.u - this.pa - this.c.la + this.Ea.y;
                c = p.Yi(this.wa, this.Fd);
                switch (this.type) {
                case 1:
                    var f, g;
                    for (f = 0; f < c.length; f++) {
                        var h = c.charCodeAt(f);
                        g = 0;
                        45 == h ? g = d.frames[10] : 46 == h || 44 == h ? g = d.frames[12] : 43 == h ? g = d.frames[11] : 69 == h || 101 == h ? g = d.frames[13] : 48 <= h && 57 >= h && (g = d.frames[h - 48]);
                        g = this.c.h.ba.Kb(g);
                        a.Oe(g, b + g.Ja, e + g.Fa, 0, 1, 1, this.F.Qb, this.F.Rb);
                        b += g.width
                    }
                    break;
                case 5:
                    this.mb.Ab(a, b, e, this.F.Qb, this.F.Rb)
                }
            }
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        }
    });
    ud.prototype = p.extend(new M, {
        $: function() {
            this.Kc = -1;
            this.Jc = 0;
            var a = this.S.kb;
            this.L = this.jd = a.ai;
            this.K = this.kd = a.bi;
            this.type = a.pf;
            this.Jc = a.Mg;
            this.tl = a.mw;
            this.wa = this.c.h.wA()[this.tl - 1];
            this.Fd = a.Vk;
            if (5 == this.type) {
                var b = this.Kc;
                -1 == b && (b = a.ij);
                this.font = this.c.h.Vb.Qf(b);
                this.Jd = this.font.bf()
            }
        },
        Db: function() {},
        handle: function() {
            var a = this.c.h.wA()[this.tl - 1];
            a != this.wa && (this.wa = a,
            this.ib());
            this.F.handle();
            this.b.N && (this.b.N = !1)
        },
        yg: function() {
            var a = this.S.kb;
            if (5 == a.pf) {
                var b = this.Kc;
                -1 == b && (b = a.ij);
                return this.c.h.Vb.Zq(b)
            }
            return null
        },
        ul: function(a, b) {
            5 == type && (this.Kc = hoAdRunHeader.h.Vb.wq(a),
            a = this.c.h.Vb.Qf(this.Kc),
            this.Jd = a.bf(),
            null != b && (this.L = this.jd = b.right - b.left,
            this.K = this.kd = b.bottom - b.top),
            this.ib())
        },
        Yq: function() {
            return this.Jc
        },
        Ns: function(a) {
            this.Jc = a;
            this.ib()
        },
        Ql: function(a, b, c, d, e, f) {
            null != this.S.kb && 1 != this.Qa && (this.Qa = !0,
            this.za = e,
            this.Ea = this.c.A.Xa[c],
            this.qa = d ? this.Ea.Mb : this.Ea.Ra,
            0 > f ? this.qa.me(this) : this.qa.uq(this, f),
            5 != this.type && this.ib())
        },
        Ti: function() {
            if (null == this.S.kb || 0 == this.Qa)
                return -1;
            this.Qa = !1;
            var a = this.qa.dd(this);
            this.qa.removeChild(this);
            return a
        },
        dd: function() {
            return this.Qa ? this.qa.dd(this) : -1
        },
        Ck: function() {
            return this.Qa ? this.qa.children.length : -1
        },
        Td: function(a) {
            this.Qa && this.qa.Td(this, a)
        },
        vl: function() {
            null != this.S.kb && 0 == this.za && (this.za = !0,
            this.ib())
        },
        Ik: function() {
            null != this.S.kb && 1 == this.za && (this.za = !1)
        },
        hD: function(a) {
            a != this.wa && (this.wa = a,
            this.ib())
        },
        Gh: function() {
            this.Yd || this.ib()
        },
        ib: function() {
            this.Yd = !0;
            this.L = this.K = 1;
            if (null != this.S.kb) {
                var a = this.S.kb;
                switch (a.pf) {
                case 4:
                    if (0 != this.wa) {
                        var b = this.c.h.ba.Kb(a.frames[0])
                          , c = this.wa * b.width;
                        c <= this.jd ? (this.L = c,
                        this.K = b.height) : (this.L = this.jd,
                        this.K = (this.jd / b.width + this.wa - 1) * b.height);
                        break
                    }
                    this.L = this.K = 1;
                    break;
                case 1:
                    var d, e, b, f = 0, g = 0, c = p.Yi(this.wa, this.Fd);
                    for (d = c.length - 1; 0 <= d; d--)
                        b = c.charCodeAt(d),
                        e = 0,
                        45 == b ? e = a.frames[10] : 46 == b ? e = a.frames[12] : 43 == b ? e = a.frames[11] : 101 == b || 69 == b ? e = a.frames[13] : 48 <= b && 57 >= b && (e = a.frames[b - 48]),
                        0 <= e && (b = this.c.h.ba.Kb(e),
                        f += b.width,
                        g = Math.max(g, b.height));
                    this.oa = f;
                    this.pa = g;
                    this.L = f;
                    this.K = g;
                    break;
                case 5:
                    c = p.Yi(this.wa, this.Fd),
                    this.oa = a = null != this.mb ? this.mb.measureText(c, this.font) : (new na(this.c.h,8,8)).measureText(c, this.font),
                    this.pa = this.kd / 2 + this.Jd / 2,
                    this.L = a,
                    this.K = this.Jd,
                    null == this.mb ? this.mb = new na(this.c.h,this.L,this.K) : (this.L > this.mb.width || this.K > this.mb.height) && this.mb.resize(this.L, this.K),
                    this.mb.Rs(c, p.Dp | p.Ep, new ba(0,0,1E3,1E3), this.font, this.Jc)
                }
            }
        },
        Ab: function(a, b, c) {
            if (this.za && this.Yd) {
                this.globalAlpha = this.alpha;
                this.globalCompositeOperation = this.pk;
                var d, e = this.S.kb;
                b = b + this.v - this.oa - this.c.ha + this.Ea.x;
                c = c + this.u - this.pa - this.c.la + this.Ea.y;
                switch (this.type) {
                case 1:
                    var f, g;
                    d = p.Yi(this.wa, this.Fd);
                    for (f = 0; f < d.length; f++) {
                        var h = d.charCodeAt(f);
                        g = 0;
                        45 == h ? g = e.frames[10] : 46 == h || 44 == h ? g = e.frames[12] : 43 == h ? g = e.frames[11] : 69 == h || 101 == h ? g = e.frames[13] : 48 <= h && 57 >= h && (g = e.frames[h - 48]);
                        g = this.c.h.ba.Kb(g);
                        a.Oe(g, b + g.Ja, c + g.Fa, 0, 1, 1, this.F.Qb, this.F.Rb);
                        b += g.width
                    }
                    break;
                case 4:
                    if (0 != this.wa) {
                        d = b + this.L;
                        f = c + this.K;
                        var h = b
                          , q = this.wa;
                        for (g = this.c.h.ba.Kb(e.frames[0]); c < f && 0 < q; c += g.height)
                            for (b = h; b < d && 0 < q; b += g.width,
                            --q)
                                a.Oe(g, b + g.Ja, c + g.Fa, 0, 1, 1, this.F.Qb, this.F.Rb)
                    }
                    break;
                case 5:
                    this.mb.Ab(a, b, c, this.F.Qb, this.F.Rb)
                }
            }
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        }
    });
    vd.prototype = p.extend(new M, {
        $: function(a, b) {
            var c = a.Yc;
            this.L = c.Bw;
            this.K = c.Cw;
            this.jd = c.Bw;
            this.kd = c.Cw;
            this.Rc = c.Yk;
            this.fp = 0;
            0 < c.Yb.length && (this.fp = c.Yb[0].yx);
            this.Xm = null;
            this.Kc = -1;
            this.qb = 0;
            this.za = !0;
            this.VC = b.Fq;
            0 < c.Yb.length && (this.Xm = c.Yb[0].ui);
            var d = this.Kc;
            -1 == d && 0 < c.Yb.length && (d = c.Yb[0].bn);
            this.font = this.c.h.Vb.Qf(d);
            this.mb = new na(this.c.h,this.L,this.K)
        },
        Db: function() {},
        handle: function() {
            this.F.handle();
            this.b.N && (this.b.N = !1)
        },
        yg: function() {
            var a = this.Kc;
            -1 == a && (a = this.S.Yc.Yb[0].bn);
            return this.c.h.Vb.Zq(a)
        },
        ul: function(a, b) {
            this.Kc = this.c.h.Vb.wq(a);
            this.font = this.c.h.Vb.Qf(this.Kc);
            null != b && (this.L = b.right - b.left,
            this.K = b.bottom - b.top,
            this.mb.resize(this.L, this.K));
            this.b.N = !0;
            this.ib()
        },
        Yq: function() {
            return this.fp
        },
        Ns: function(a) {
            this.fp = a;
            this.ib()
        },
        Ql: function(a, b, c, d, e, f) {
            1 != this.Qa && (this.Qa = !0,
            this.za = e,
            this.Ea = this.c.A.Xa[c],
            this.qa = d ? this.Ea.Mb : this.Ea.Ra,
            0 > f ? this.qa.me(this) : this.qa.uq(this, f))
        },
        Ti: function() {
            if (0 == this.Qa)
                return -1;
            this.Qa = !1;
            var a = this.qa.dd(this);
            this.qa.removeChild(this);
            return a
        },
        dd: function() {
            return this.Qa ? this.qa.dd(this) : -1
        },
        Ck: function() {
            return this.Qa ? this.qa.children.length : -1
        },
        Td: function(a) {
            this.Qa && this.qa.Td(this, a)
        },
        vl: function() {
            0 == this.za && (this.za = !0)
        },
        Ik: function() {
            1 == this.za && (this.za = !1)
        },
        qS: function(a) {
            -1 > a && (a = -1);
            a >= this.Rc && (a = this.Rc - 1);
            if (a == this.qb)
                return !1;
            this.qb = a;
            0 <= a && this.iM(this.S.Yc.Yb[this.qb].ui);
            this.ib();
            return 0 != (this.F.Y & A.Ah) ? !1 : !0
        },
        iM: function(a) {
            this.Xm = a;
            this.ib()
        },
        Gh: function() {
            this.Yd || this.ib()
        },
        ib: function() {
            this.Yd = !0;
            var a = this.S.Yc
              , b = a.Yb[0].qp;
            this.pa = this.oa = 0;
            this.rect.left = 0;
            this.rect.top = 0;
            this.rect.right = this.L;
            this.rect.bottom = this.K;
            0 <= this.qb ? a = a.Yb[this.qb].ui : (a = this.Xm,
            null == a && (a = ""));
            b &= p.Dp | p.Rj | p.pt | p.Ep | p.Cp | p.zi | p.YE;
            a = this.mb.Rs(a, b, this.rect, this.font, this.fp);
            0 == (b & (p.Cp | p.zi)) && (this.K = a)
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        },
        Ab: function(a, b, c) {
            this.za && this.Yd && this.mb.Ab(a, b + this.v - this.c.ha + this.Ea.x, c + this.u - this.c.la + this.Ea.y, this.F.Qb, this.F.Rb)
        }
    });
    wd.prototype = p.extend(new M, {
        $: function() {},
        Db: function() {},
        handle: function() {
            this.c.pause();
            this.c.hs = this;
            this.c.A.Xa[this.c.A.uc - 1].Ra.me(this);
            this.aI()
        },
        Oq: function() {
            this.c.A.Xa[this.c.A.uc - 1].Ra.removeChild(this)
        },
        wJ: function() {
            var a;
            a = this.c.h.Xf - this.c.h.jg;
            var b = this.c.h.Yf - this.c.h.kg;
            0 == this.qk ? this.c.h.Wc[n.If] && (a = this.zA(a, b),
            0 != a && (this.qk = a)) : this.c.h.Wc[n.If] || (this.zA(a, b) == this.qk ? (this.c.i.Ic = this.qk,
            this.c.i.td(this, -5439484),
            0 != (this.S.Yc.Yb[this.qk].qp & qa.jH) ? this.c.i.td(this, -5308412) : this.c.i.td(this, -5373948),
            this.Oq(),
            this.c.hs = null,
            this.c.resume(),
            this.c.Tq(this.bc, !0)) : this.qk = 0)
        },
        zA: function(a, b) {
            var c;
            if (null != this.Od)
                for (c = 1; c < this.Od.length; c++)
                    if (a >= this.Od[c].left && a < this.Od[c].right && b > this.Od[c].top && b < this.Od[c].bottom)
                        return c;
            return 0
        },
        hz: function(a, b, c) {
            var d, e;
            c ? (d = 8421504,
            e = 16777215) : (e = 8421504,
            d = 16777215);
            a.ss(b.left, b.top, b.right - b.left, b.bottom - b.top, 0, 1);
            var f = Array(3), g;
            for (g = 0; 3 > g; g++)
                f[g] = new J;
            f[0].x = b.right - 1;
            0 == c && --f[0].x;
            f[0].y = b.top + 1;
            f[1].y = b.top + 1;
            f[1].x = b.left + 1;
            f[2].x = b.left + 1;
            f[2].y = b.bottom;
            0 == c && --f[2].y;
            a.zd(f[0].x, f[0].y, f[1].x, f[1].y, d, 1);
            a.zd(f[1].x, f[1].y, f[2].x, f[2].y, d, 1);
            0 == c && --f[0].x;
            f[0].y += 1;
            f[1].x += 1;
            f[1].y += 1;
            f[2].x += 1;
            0 == c && --f[2].y;
            a.zd(f[0].x, f[0].y, f[1].x, f[1].y, d, 1);
            a.zd(f[1].x, f[1].y, f[2].x, f[2].y, d, 1);
            0 == c && (f[0].x += 2,
            f[1].x = b.right - 1,
            f[1].y = b.bottom - 1,
            f[2].y = b.bottom - 1,
            --f[2].x,
            a.zd(f[0].x, f[0].y, f[1].x, f[1].y, e, 1),
            a.zd(f[1].x, f[1].y, f[2].x, f[2].y, e, 1),
            --f[0].x,
            f[0].y += 1,
            --f[1].x,
            --f[1].y,
            f[2].x += 1,
            --f[2].y,
            a.zd(f[0].x, f[0].y, f[1].x, f[1].y, e, 1),
            a.zd(f[1].x, f[1].y, f[2].x, f[2].y, e, 1))
        },
        uL: function(a, b, c) {
            var d = new ba;
            d.yz(this.Od[b]);
            this.hz(a, this.Od[b], c);
            d.left += 2;
            d.top += 2;
            d.right -= 4;
            d.bottom -= 4;
            c && (d.left += 2,
            d.top += 2);
            this.fh[b].Ab(a, (d.left + d.right) / 2 - this.fh[b].width / 2, (d.top + d.bottom) / 2 - this.fh[b].height / 2, 0, 0)
        },
        aI: function() {
            this.Jr = new na(this.c.h,8,8);
            var a = this.S.Yc
              , b = this.c
              , c = a.Yb[1]
              , d = c.yx
              , e = 0 != (c.qp & qa.Py)
              , f = b.h.Vb.Qf(c.bn);
            this.et = Math.floor(3 * this.Jr.measureText("X", f) / 2);
            this.Xi = 4;
            this.Kd = 64;
            var g;
            for (g = 1; g < a.Yb.length; g++)
                c = a.Yb[g],
                0 < c.ui.length && (c = this.Jr.measureText(c.ui, f),
                this.Kd = Math.max(this.Kd, c + 2 * this.et + 4),
                this.Xi = Math.max(this.Xi, Math.floor(3 * f.bf() / 2)));
            this.ir = Math.max(Math.floor(this.Xi / 4), 2);
            this.Kd += 2 * this.et + 4;
            var h = new ba;
            for (g = 1; g < a.Yb.length; g++)
                c = a.Yb[g],
                this.fh[g] = new na(b.h,this.Kd,this.Xi),
                h.right = this.Kd,
                h.bottom = this.Xi,
                this.fh[g].Ir(c.ui, p.Rj | p.zi, h, d, f, e ? 1 : 0, 16777215);
            a = a.Yb[0];
            e = 0 != (a.qp & qa.Py);
            f = b.h.Vb.Qf(a.bn);
            g = Math.floor(3 * this.Jr.measureText("X", f) / 2);
            c = this.Jr.measureText(a.ui, f);
            this.bo = Math.floor(3 * f.bf() / 2);
            this.Kd = Math.max(this.Kd, c + 2 * g + 4);
            this.Kd > b.h.ra ? this.Kd = b.h.ra : this.Kd > b.A.ee && (this.Kd = b.A.ee);
            h.right = this.Kd;
            h.bottom = this.bo;
            this.fh[0] = new na(b.h,this.Kd,this.bo);
            this.fh[0].Ir(a.ui, p.Rj | p.zi, h, d, f, e ? 1 : 0, 16777215)
        },
        Ab: function(a) {
            var b = this.S.Yc
              , c = this.c
              , d = this.v - c.ha
              , c = this.u - c.la
              , e = new ba;
            e.left = d;
            e.top = c;
            var f = this.bo + 1 + (this.Xi + this.ir) * (b.Yb.length - 1) + this.ir + 4;
            e.right = d + this.Kd;
            e.bottom = c + f;
            a.Fc(e.left, e.top, e.right - e.left, e.bottom - e.top, 12632256, 0, 0);
            this.hz(a, e, !1);
            e.left += 2;
            e.top += 2;
            e.right -= 2;
            e.bottom = e.top + this.bo;
            this.fh[0].Ab(a, (e.left + e.right) / 2 - this.fh[0].width / 2, (e.top + e.bottom) / 2 - this.fh[0].height / 2, 0, 0);
            e.top = e.bottom;
            a.zd(e.left, e.top, e.right, e.bottom, 8421504, 1, 0, 0);
            e.top += 1;
            e.bottom += 1;
            a.zd(e.left, e.top, e.right, e.bottom, 16777215, 1, 0, 0);
            if (null == this.Od)
                for (this.Od = Array(b.Yb.length),
                i = 1; i < b.Yb.length; i++)
                    this.Od[i] = new ba,
                    this.Od[i].left = d + 2 + this.et,
                    this.Od[i].right = d + this.Kd - 2 - this.et,
                    this.Od[i].top = c + 2 + this.bo + 1 + this.ir + (this.Xi + this.ir) * (i - 1),
                    this.Od[i].bottom = this.Od[i].top + this.Xi;
            for (i = 1; i < b.Yb.length; i++)
                this.uL(a, i, this.qk == i)
        }
    });
    xd.prototype = p.extend(new M, {
        $: function(a, b) {
            this.ext.$(this);
            var c = this.c.h.file.ug(a.ZB);
            this.Kw = a.aC;
            this.ext.Pu(c, b, a.bC)
        },
        mu: function(a, b, c, d, e) {
            this.Ea = this.c.A.Xa[d];
            this.za = e;
            1 != this.Qa && (this.Qa = !0,
            this.qa = this.Ea.Ra,
            this.qa.me(this))
        },
        Ql: function(a, b, c, d, e) {
            this.Ea = this.c.A.Xa[c];
            this.za = e;
            1 != this.Qa && (this.Qa = !0,
            this.qa = d ? this.Ea.Mb : this.Ea.Ra,
            this.qa.me(this))
        },
        Ti: function() {
            if (0 == this.Qa)
                return -1;
            this.Qa = !1;
            var a = this.qa.dd(this);
            this.qa.removeChild(this);
            return a
        },
        handle: function() {
            0 != (this.sa & 512) ? this.F.handle() : 16 == (this.sa & 48) || 48 == (this.sa & 48) ? this.B.move() : 32 == (this.sa & 48) && this.ea.We();
            var a = 0;
            0 == this.hw && (a = this.ext.rv());
            0 != (a & Ca.My) && (this.hw = !0);
            null != this.b && this.b.N && (this.b.N = !1)
        },
        Mi: function() {
            this.ext.Mi()
        },
        zz: function() {},
        Ab: function() {},
        Db: function(a) {
            this.ext.Su(a)
        },
        cJ: function() {
            return null
        },
        Gn: function(a, b) {
            return this.ext.Gn(a, b)
        },
        action: function(a, b) {
            this.ext.action(a, b)
        },
        Qn: function(a) {
            return this.ext.Qn(a)
        },
        Zm: function(a) {
            this.F.Qb = A.Ue;
            this.F.Rb = a
        },
        hS: function() {},
        vl: function() {
            this.za = !0
        },
        Ik: function() {
            this.za = !1
        },
        dd: function() {
            return this.qa.dd(this)
        },
        Ck: function() {
            return this.qa.children.length
        },
        Td: function(a) {
            a >= this.qa.children.length && (a = this.qa.children.length);
            0 > a && (a = 0);
            this.qa.Td(this, a)
        },
        SK: function() {},
        dI: function() {},
        am: function() {
            this.ext.am()
        },
        YA: function(a) {
            this.c.h.ba.YA(a)
        },
        xR: function(a) {
            return this.c.h.ba.Kb(a)
        },
        nR: function() {
            return this.c.h
        },
        DR: function() {
            return this.v
        },
        ER: function() {
            return this.u
        },
        CR: function() {
            return this.L
        },
        bf: function() {
            return this.K
        },
        iD: function(a) {
            null != this.B ? this.B.ta.gc(a) : (this.v = a,
            null != this.b && (this.b.N = !0,
            this.b.Sa = !0))
        },
        lD: function(a) {
            null != this.B ? this.B.ta.hc(a) : (this.u = a,
            null != this.b && (this.b.N = !0,
            this.b.Sa = !0))
        },
        px: function(a) {
            this.L = a
        },
        ox: function(a) {
            this.K = a
        },
        jp: function(a, b) {
            this.L = a;
            this.K = b
        },
        XR: function() {
            this.hw = !1
        },
        bJ: function(a, b) {
            if (0 == this.c.fg) {
                var c = this.c.i.Ic;
                this.c.i.Ic = b;
                a = -(a + G.Ce + 1) << 16;
                a |= this.Ha & 65535;
                this.c.i.td(this, a);
                this.c.i.Ic = c
            }
        },
        SR: function(a, b) {
            0 == this.c.fg && (a = -(a + G.Ce + 1) << 16,
            a |= this.Ha & 65535,
            this.c.i.cL(1, a, b, this, this.ef))
        },
        pause: function() {
            this.c.pause()
        },
        resume: function() {
            this.c.resume()
        },
        YR: function() {},
        bR: function() {
            this.c.vg(this.bc)
        },
        setPosition: function(a, b) {
            null != this.B ? (this.B.ta.gc(a),
            this.B.ta.hc(b)) : (this.v = a,
            this.u = b,
            null != this.b && (this.b.N = !0,
            this.b.Sa = !0))
        },
        rR: function() {
            return this.Kw
        },
        gS: function(a) {
            this.Kw = a
        },
        tq: function(a, b, c, d, e) {
            this.c.tq(a, b, c, e, d, !0)
        },
        pR: function() {
            return this.c.Wo
        },
        Ek: function() {
            this.c.Pc++;
            return this.c.getExpression()
        },
        qR: function() {
            return this.c.i.Ic
        },
        iz: function(a, b, c) {
            return 0 != (a.sa & D.Hf) && a.b.Ec == V.Fi ? a.B.ta.iz(b, c) : 0
        },
        sR: function() {
            this.jw = this.Co = 0;
            return this.nJ()
        },
        nJ: function() {
            if (this.jw < this.c.pb) {
                for (; null == this.c.G[this.Co]; )
                    this.Co++;
                var a = this.c.G[this.Co];
                this.jw++;
                this.Co++;
                return a
            }
            return null
        },
        zR: function(a) {
            var b = 0, c;
            for (c = 0; c < this.c.pb; c++) {
                for (; null == this.c.G[b]; )
                    b++;
                var d = this.c.G[b];
                b++;
                if ((d.sv << 16 | d.bc & 65535) == a)
                    return d
            }
            return null
        },
        gA: function(a) {
            return this.c.gA(a)
        },
        hA: function(a) {
            return this.c.hA(a)
        },
        OK: function(a) {
            return hoAdRunHeader.h.OK(a)
        },
        RQ: function() {}
    });
    Wa.LP = 22;
    Wa.create = function(a) {
        var b = a.file.T
          , c = null
          , d = a.file.o()
          , e = a.file.o();
        switch (e) {
        case 1:
            c = new Re(a);
            break;
        case 2:
            c = new Te(a);
            break;
        case 3:
            c = new ia(a);
            break;
        case 4:
            c = new ia(a);
            break;
        case 5:
            c = new Ga(a);
            break;
        case 6:
            c = new Qa(a);
            break;
        case 7:
            c = new Ga(a);
            break;
        case 9:
            c = new lb(a);
            break;
        case 10:
            c = new ia(a);
            break;
        case 11:
            c = new ia(a);
            break;
        case 12:
            c = new ia(a);
            break;
        case 13:
            c = new Oe(a);
            break;
        case 14:
            c = new Ad(a);
            break;
        case 15:
            c = new ra(a);
            break;
        case 16:
            c = new Bd(a);
            break;
        case 17:
            c = new ia(a);
            break;
        case 18:
            c = new Cd(a);
            break;
        case 19:
            c = new Dd(a);
            break;
        case 21:
            c = new lb(a);
            break;
        case 22:
            c = new ra(a);
            break;
        case 23:
            c = new ra(a);
            break;
        case 24:
            c = new Ne(a);
            break;
        case 25:
            c = new Ga(a);
            break;
        case 26:
            c = new ia(a);
            break;
        case 27:
            c = new ra(a);
            break;
        case 28:
            c = new ra(a);
            break;
        case 29:
            c = new Ga(a);
            break;
        case 31:
            c = new ia(a);
            break;
        case 32:
            c = new ia(a);
            break;
        case 34:
            c = new Ga(a);
            break;
        case 35:
            c = new Qa(a);
            break;
        case 36:
            c = new Qa(a);
            break;
        case 37:
            c = new ia(a);
            break;
        case 38:
            c = new oa(a);
            break;
        case 39:
            c = new Qe(a);
            break;
        case 40:
            c = new Xa(a);
            break;
        case 41:
            c = new Xa(a);
            break;
        case 42:
            c = new Me(a);
            break;
        case 43:
            c = new ia(a);
            break;
        case 44:
            c = new Ad(a);
            break;
        case 45:
            c = new ra(a);
            break;
        case 46:
            c = new ra(a);
            break;
        case 47:
            c = new zd(a);
            break;
        case 48:
            c = new Ga(a);
            break;
        case 49:
            c = new ia(a);
            break;
        case 50:
            c = new ia(a);
            break;
        case 51:
            c = new zd(a);
            break;
        case 52:
            c = new ra(a);
            break;
        case 53:
            c = new ra(a);
            break;
        case 54:
            c = new ra(a);
            break;
        case 55:
            c = new Pe(a);
            break;
        case 56:
            c = new Ga(a);
            break;
        case 57:
            c = new ia(a);
            break;
        case 58:
            c = new ia(a);
            break;
        case 59:
            c = new ra(a);
            break;
        case 60:
            c = new ia(a);
            break;
        case 61:
            c = new ia(a);
            break;
        case 62:
            c = new ra(a);
            break;
        case 63:
            c = new Xa(a);
            break;
        case 64:
            c = new Xa(a);
            break;
        case 67:
            c = new ia(a);
            break;
        case 68:
            c = new Ed(a);
            break;
        case 69:
            c = new Se(a);
            break;
        case 72:
            c = new Dd(a)
        }
        c.code = e;
        a.file.seek(b + d);
        return c
    }
    ;
    oa.NF = 1;
    oa.mO = 2;
    oa.Et = 4;
    oa.Dt = 8;
    oa.nO = 16;
    pa.JE = 1;
    pa.IE = 2;
    pa.KE = 4;
    pa.Ux = 8;
    pa.prototype = {
        GC: function(a, b, c) {
            c.io = -1;
            if (-1 == this.Jo) {
                0 != b && (c.dir = -1,
                0 == (this.bl & pa.Ux) && (c.dir = a.GA(this.Yr)));
                c.x = this.as;
                c.y = this.bs;
                var d = this.Hw;
                d > a.A.uc - 1 && (d = a.A.uc - 1);
                c.io = d;
                c.tu = !1
            } else {
                a.i.Hm = !1;
                d = a.i.br(this.Ko);
                c.tu = a.i.Gc;
                if (null == d)
                    return !1;
                c.x = d.v;
                c.y = d.u;
                c.io = d.de;
                if (0 != (this.bl & pa.IE) && 0 != (d.sa & D.$j) && 0 <= d.b.Ta) {
                    var e;
                    e = d.b.gb;
                    null != a.Kp(d) && (e = 0,
                    e == fa.eE && (e = d.b.gb));
                    e = a.h.ba.Fk(d.b.Ta, e, d.b.Gb, d.b.Hb);
                    c.x += e.lh - e.Ja;
                    c.y += e.mh - e.Fa
                }
                if (0 != (this.bl & pa.JE)) {
                    e = this.Gw + d.c.Zb(d) & 31;
                    var f = N.gJ(this.Zr, e);
                    c.x += N.fJ(this.Zr, e);
                    c.y += f
                } else
                    c.x += this.as,
                    c.y += this.bs;
                0 != (b & 1) && (c.dir = 0 != (this.bl & pa.Ux) ? -1 : 0 != (this.bl & pa.KE) ? d.c.Zb(d) : a.GA(this.Yr))
            }
            return 0 != (b & 2) && (c.x < a.Nm || c.x > a.Lm || c.y < a.Rm || c.y > a.Pm) ? !1 : !0
        }
    };
    Bd.prototype = p.extend(new pa, {});
    lb.prototype = p.extend(new pa, {});
    Cd.prototype = p.extend(new pa, {});
    Ed.prototype = {
        evaluate: function(a) {
            if (null == a.J || 0 != this.Wq && (a.J.Sd & this.Wq) != this.kA)
                return !1;
            for (var b = 0; b < this.values.length; b++) {
                var c = this.values[b], d;
                d = c.global ? a.c.h.jv(c.index) : a.J.Hk(c.index);
                if (!l.nk(d, c.Bx, c.kC))
                    return !1
            }
            return !0
        },
        GI: function(a) {
            if (null == a.J || 0 != this.Wq && (a.J.Sd & this.Wq) != this.kA)
                return !1;
            for (var b = 0; b < this.values.length; b++) {
                var c = this.values[b];
                if (!l.nk(a.J.Hk(c.index), c.Bx, c.kC))
                    return !1
            }
            return !0
        }
    };
    Ya.prototype = {
        Fc: function() {},
        $w: function() {},
        Zw: function() {},
        JC: function() {},
        Oe: function() {},
        uj: function() {},
        KC: function() {},
        LC: function() {},
        zd: function() {},
        ss: function() {},
        IC: function() {},
        xL: function() {},
        wC: function(a, b, c, d) {
            var e = this.lk[this.lk.length - 1];
            e && (a < e.x && (a = e.x),
            b < e.y && (b = e.y),
            a + c > e.x + e.ct && (c = e.x + e.ct - a),
            b + d > e.y + e.dr && (d = e.y + e.dr - b));
            a = {
                x: a,
                y: b,
                ct: c,
                dr: d
            };
            this.lk.push(a);
            return a
        },
        pC: function() {
            this.lk.pop()
        }
    };
    Ha.prototype = p.extend(new Ya, {
        ax: function(a) {
            this.yw = this.rx = a;
            this.Oa.imageSmoothingEnabled = a;
            this.Oa.webkitImageSmoothingEnabled = a;
            this.Oa.mozImageSmoothingEnabled = a;
            this.Oa.msImageSmoothingEnabled = a;
            this.xw = -1;
            this.Re(0, 0)
        },
        dD: function(a, b) {
            this.Oa.scale(a, b);
            this.tp = a;
            this.vp = b;
            this.wk = this.uk = 0;
            1 < this.tp ? this.uk = 1 : 0 < this.tp && 1 > this.tp && (this.uk = 1 / this.tp);
            1 < this.vp && (this.wk = 1);
            0 < this.vp && 1 > this.vp && (this.wk = 1 / this.vp)
        },
        Eq: function(a, b, c, d) {
            this.Oa.clearRect(a, b, c, d)
        },
        Fc: function(a, b, c, d, e, f, g) {
            var h = this.Oa;
            this.Re(f, g);
            h.fillStyle = p.af(e);
            h.fillRect(a, b, c, d)
        },
        $w: function(a, b, c, d, e, f, g) {
            var h = this.Oa;
            this.Re(f, g);
            h.fillStyle = p.af(e);
            p.Kq(h, a, b, c, d);
            h.fill()
        },
        Zw: function(a, b, c, d, e, f, g, h, q) {
            if (e == f)
                return this.Fc(a, b, c, d, e, h, q);
            var k = this.Oa;
            this.Re(h, q);
            this.vz(a, b, c, d, g, e, f);
            k.fillRect(a, b, c, d)
        },
        JC: function(a, b, c, d, e, f, g, h, q) {
            if (e == f)
                return this.$w(a, b, c, d, e, h, q);
            var k = this.Oa;
            this.Re(h, q);
            this.vz(a, b, c, d, g, e, f);
            p.Kq(k, a, b, c, d);
            this.Oa.fill()
        },
        Oe: function(a, b, c, d, e, f, g, h) {
            var q = this.Oa
              , k = b - a.Ja
              , l = c - a.Fa;
            this.Re(g, h);
            0 == d && 1 == e && 1 == f ? 0 == a.tb ? null != a.sb && q.drawImage(a.sb, k, l) : q.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, k, l, a.width, a.height) : (q.save(),
            q.translate(b, c),
            0 != d && q.rotate(.0174532925 * -d),
            q.scale(Math.max(.001, e), Math.max(.001, f)),
            q.translate(-a.Ja, -a.Fa),
            0 == a.tb ? null != a.sb && 0 != a.width && 0 != a.height && q.drawImage(a.sb, 0, 0, a.width, a.height, 0, 0, a.width, a.height) : q.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, 0, 0, a.width, a.height),
            q.restore())
        },
        ZR: function(a, b, c, d, e, f, g, h) {
            var q = this.Oa
              , k = b - a.Ja
              , l = c - a.Fa;
            this.Re(g, h);
            0 == d && 1 == e && 1 == f ? 0 == a.tb ? null != a.sb && q.drawImage(a.sb, 0, 0, a.width, a.height, k, l, a.width + this.uk, a.height + this.wk) : q.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, k, l, a.width + this.uk, a.height + this.wk) : (q.save(),
            q.translate(b, c),
            0 != d && q.rotate(.0174532925 * -d),
            q.scale(Math.max(.001, e), Math.max(.001, f)),
            q.translate(-a.Ja, -a.Fa),
            0 == a.tb ? null != a.sb && q.drawImage(a.sb, 0, 0, a.width, a.height, 0, 0, a.width, a.height) : q.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, 0, 0, a.width, a.height),
            q.restore())
        },
        uj: function(a, b, c, d, e, f, g) {
            this.Re(f, g);
            this.Oa.drawImage(a, b, c, d, e)
        },
        KC: function(a, b, c, d, e, f, g) {
            var h = this.Oa;
            this.Re(f, g);
            h.save();
            h.beginPath();
            h.moveTo(b, c);
            h.lineTo(b + d, c);
            h.lineTo(b + d, c + e);
            h.lineTo(b, c + e);
            h.lineTo(b, c);
            h.clip();
            f = a.width;
            g = a.height;
            d = Math.floor(d / f) + 1;
            e = Math.floor(e / g) + 1;
            var q, k;
            for (q = 0; q < d; q++)
                for (k = 0; k < e; k++)
                    0 == a.tb ? null != a.sb && h.drawImage(a.sb, 0, 0, a.width, a.height, b + q * f, c + k * g, a.width + this.uk, a.height + this.wk) : h.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, b + q * f, c + k * g, a.width + this.uk, a.height + this.wk);
            h.restore()
        },
        LC: function(a, b, c, d, e, f, g) {
            if (!(a instanceof aa))
                throw Error("renderPatternEllipse: bad image type: " + typeof a);
            var h = this.Oa;
            this.Re(f, g);
            0 == a.tb ? null != a.sb && (h.fillStyle = h.createPattern(a.sb, "repeat")) : (a.pattern || (a.pattern = document.createElement("canvas"),
            a.pattern.width = a.width,
            a.pattern.height = a.height,
            h = a.pattern.getContext("2d"),
            h.drawImage(a.app.ba.Lb[a.tb], a.vd, a.wd, a.width, a.height, 0, 0, a.width, a.height)),
            h.fillStyle = h.createPattern(a.pattern, "repeat"));
            p.Kq(h, b, c, d, e);
            this.Oa.fill()
        },
        zd: function(a, b, c, d, e, f, g, h) {
            var q = this.Oa;
            this.Re(g, h);
            q.strokeStyle = p.af(e);
            q.lineCap = "round";
            q.lineWidth = f;
            q.beginPath();
            q.moveTo(a, b);
            q.lineTo(c, d);
            q.closePath();
            q.stroke()
        },
        xL: function(a, b, c, d, e, f) {
            var g = this.Oa;
            e = p.af(e);
            1 == f ? (g.beginPath(),
            g.moveTo(a, b),
            g.lineTo(a + c, b),
            g.lineTo(a + c / 2, b - d)) : (g.beginPath(),
            g.moveTo(a, b),
            g.lineTo(a, b - c),
            g.lineTo(a - d, b - c / 2));
            g.closePath();
            g.lineWidth = 1;
            g.strokeStyle = e;
            g.stroke();
            g.fillStyle = e;
            g.fill()
        },
        ss: function(a, b, c, d, e, f, g, h) {
            var q = this.Oa;
            this.Re(g, h);
            q.strokeStyle = p.af(e);
            q.lineWidth = f;
            q.strokeRect(a, b, c, d)
        },
        IC: function(a, b, c, d, e, f, g, h) {
            var q = this.Oa;
            this.Re(g, h);
            q.lineWidth = e;
            q.strokeStyle = p.af(f);
            p.Kq(q, a, b, c, d);
            this.Oa.stroke()
        },
        clip: function(a, b, c, d) {
            var e = this.Oa;
            e.save();
            e.beginPath();
            e.rect(a, b, c, d);
            e.clip()
        },
        kM: function() {
            this.Oa.restore()
        },
        wC: function() {
            var a = this.Oa
              , b = Ya.prototype.wC.apply(this, arguments);
            a.beginPath();
            a.rect(b.x, b.y, b.ct, b.dr);
            a.clip()
        },
        pC: function() {
            var a = this.Oa;
            Ya.prototype.pC.apply(this, arguments);
            if (0 < this.lk.length) {
                var b = this.lk[this.lk.length - 1];
                a.beginPath();
                a.rect(b.x, b.y, b.ct, b.dr);
                a.clip()
            } else
                a.$R()
        },
        Re: function(a, b) {
            var c = this.Oa;
            if ("undefined" == typeof a)
                c.globalAlpha = 1,
                c.pk = "source-over";
            else if (a != this.xw || b != this.HK) {
                this.xw = a;
                this.HK = b;
                var d = a & A.kt
                  , e = 0 != (a & A.Kx) | this.rx;
                e != this.yw && (this.yw = e,
                c.imageSmoothingEnabled = e,
                c.webkitImageSmoothingEnabled = e,
                c.mozImageSmoothingEnabled = e,
                c.msImageSmoothingEnabled = e);
                c.globalAlpha = 0 != (a & A.yp) ? (b >>> 24 & 255) / 255 : d == A.Ue ? (128 - b) / 128 : 1;
                switch (d) {
                case A.gE:
                    c.pk = "lighter";
                    break;
                case A.iE:
                    c.pk = "xor";
                    break;
                default:
                    c.pk = "source-over"
                }
            }
        },
        vz: function(a, b, c, d, e, f, g) {
            a = e ? this.Oa.createLinearGradient(a, b, a, b + d) : this.Oa.createLinearGradient(a, b, a + c, b);
            a.addColorStop(0, p.af(f));
            a.addColorStop(1, p.af(g));
            this.Oa.fillStyle = a
        }
    });
    ta.rq = 1;
    ta.prototype = {
        load: function(a) {
            var b = a.T;
            a.xa(4);
            this.GD = a.s();
            this.FD = a.s();
            this.pp = a.s();
            this.op = a.hd();
            var c = a.s()
              , d = a.s();
            a.seek(b + c);
            this.Ln = a.Nb();
            this.Ln = this.Ln.substr(0, this.Ln.indexOf("."));
            this.Jz = b + d
        }
    };
    Fd.prototype = {
        DA: function() {
            return null
        }
    };
    w.Np = 0;
    w.mq = 1;
    w.Oy = 2;
    w.Lx = 3;
    w.lt = 0;
    w.Gt = 1;
    w.Px = 2;
    w.Ny = 3;
    w.Hi = 0;
    w.Ii = 1;
    w.Oj = 2;
    w.Pj = 3;
    w.Ox = 4;
    w.Wx = 0;
    w.WE = 1;
    w.gu = 1;
    w.sq = 2;
    w.prototype = {
        start: function(a, b, c, d) {
            this.Nz = b;
            this.Ih = this.Nz.getContext("2d");
            this.Z = c;
            this.m = d;
            this.Br = (new Date).getTime();
            this.j = a.FD;
            0 == this.j && (this.j = 1);
            this.mo = this.Br;
            this.no = this.Br + this.j;
            this.ya = this.bB = !0
        },
        finish: function() {},
        mr: function() {
            if (this.bB) {
                var a = new Date;
                return a.getTime() >= this.no ? !0 : a.getTime() >= this.no
            }
            return !0
        },
        zc: function() {
            this.mo = (new Date).getTime();
            this.mo > this.no && (this.mo = this.no);
            return this.mo - this.Br
        },
        D: function(a, b, c, d, e, f, g) {
            this.Dr && (this.Ih.globalCompositeOperation = "source-atop");
            1 == arguments.length ? this.Ih.drawImage(a, 0, 0) : 0 < f && 0 < g && this.Ih.drawImage(a, d, e, f, g, b, c, f, g)
        },
        stretch: function(a, b, c, d, e, f, g, h, q) {
            this.Dr && (this.Ih.globalCompositeOperation = "source-atop");
            0 < d && 0 < e && 0 < h && 0 < q && this.Ih.drawImage(a, f, g, h, q, b, c, d, e)
        },
        Tb: function() {},
        end: function() {},
        $: function() {}
    };
    Gd.prototype = {
        $L: function(a, b) {
            var c = a.S.um;
            b && (c = a.S.Do);
            var d = null, e;
            if (0 != (a.sa & D.$j)) {
                var f = this.app.ba.Kb(a.b.Ta)
                  , d = document.createElement("canvas");
                d.width = f.width;
                d.height = f.height;
                e = d.getContext("2d");
                0 == f.tb ? e.drawImage(f.sb, 0, 0) : e.drawImage(this.app.ba.Lb[f.tb], f.vd, f.wd, f.width, f.height, 0, 0, f.width, f.height)
            } else
                32 <= a.Ha && (d = document.createElement("canvas"),
                d.width = a.L,
                d.height = a.K,
                new StandardRendered(d),
                d = null);
            if (null == d)
                return null;
            e = d.width;
            var g = d.height
              , f = document.createElement("canvas");
            f.width = e;
            f.height = g;
            var h = document.createElement("canvas");
            h.width = e;
            h.height = g;
            var q = document.createElement("canvas");
            q.width = e;
            q.height = g;
            b ? (e = h.getContext("2d"),
            e.drawImage(d, 0, 0),
            e = f.getContext("2d"),
            e.drawImage(d, 0, 0),
            0 != (c.pp & ta.rq) && this.xz(q, d, c.op)) : (e = q.getContext("2d"),
            e.drawImage(d, 0, 0),
            0 != (c.pp & ta.rq) && this.xz(h, d, c.op));
            c = this.Vl(c, f, h, q);
            null != c && (d = 0,
            0 != (a.X & M.Bi) ? (c.Dr = !0,
            d |= w.sq) : (c.Dr = !1,
            d |= w.gu),
            a.yl = f,
            c.Tb(d));
            return c
        },
        xz: function(a, b, c) {
            a = a.getContext("2d");
            a.drawImage(b, 0, 0);
            var d = b.width;
            b = b.height;
            var e = a.getImageData(0, 0, d, b), f, g = (c & 16711680) >> 16, h = (c & 65280) >> 8, q = c & 255;
            for (f = 0; f < b; f++)
                for (c = 0; c < d; c++)
                    0 != e.data[4 * (f * d + c) + 3] && (e.data[4 * (f * d + c)] = g,
                    e.data[4 * (f * d + c) + 1] = h,
                    e.data[4 * (f * d + c) + 2] = q);
            a.putImageData(e, 0, 0)
        },
        Vl: function(a, b, c, d) {
            var e = null;
            "cctrans" == a.Ln.toLowerCase() && (e = new Ra);
            return null != e ? (e = e.DA(a),
            this.app.file.seek(a.Jz),
            e.Dr = !1,
            e.$(a, this.app.file, b, c, d),
            e) : null
        }
    };
    Ra.KA = "BAND SE00 SE10 SE12 DOOR SE03 MOSA SE05 SE06 SCRL SE01 SE07 SE09 SE13 SE08 SE02 ZIGZ SE04 ZOOM SE11 FADE".split(" ");
    Ra.prototype = p.extend(new Fd, {
        DA: function(a) {
            var b = a.GD;
            a = "" + String.fromCharCode(b & 255);
            b >>= 8;
            a += String.fromCharCode(b & 255);
            b >>= 8;
            a += String.fromCharCode(b & 255);
            a += String.fromCharCode(b >> 8 & 255);
            for (b = 0; b < Ra.KA.length && a != Ra.KA[b]; b++)
                ;
            a = null;
            switch (b) {
            case 0:
                a = new Jd;
                break;
            case 1:
                a = new Hd;
                break;
            case 2:
                a = new Id;
                break;
            case 3:
                a = new Kd;
                break;
            case 4:
                a = new Ld;
                break;
            case 5:
                a = new Nd;
                break;
            case 6:
                a = new Od;
                break;
            case 7:
                a = new Pd;
                break;
            case 8:
                a = new Qd;
                break;
            case 9:
                a = new Rd;
                break;
            case 10:
                a = new Sd;
                break;
            case 11:
                a = new Td;
                break;
            case 12:
                a = new Ud;
                break;
            case 13:
                a = new Vd;
                break;
            case 14:
                a = new Wd;
                break;
            case 15:
                a = new Xd;
                break;
            case 16:
                a = new Yd;
                break;
            case 17:
                a = new Zd;
                break;
            case 18:
                a = new $d;
                break;
            case 19:
                a = new ae;
                break;
            case 20:
                a = new Md
            }
            return a
        }
    });
    Hd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.cB = 8 != this.eb ? this.eb : Math.floor(8 * Math.random()));
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c;
                switch (this.cB) {
                case 0:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f * a / this.j;
                    this.D(this.m, b, 0, b, this.f - c, b, c);
                    break;
                case 1:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f * a / this.j;
                    this.D(this.m, b, this.f - c, b, 0, b, c);
                    break;
                case 2:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f * a / this.j;
                    this.D(this.m, b, 0, b, 0, b, c);
                    break;
                case 3:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f * a / this.j;
                    this.D(this.m, b, this.f - c, b, this.f - c, b, c);
                    break;
                case 4:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f / 2 * a / this.j;
                    this.D(this.m, b, 0, b, this.f / 2 - c, b, c);
                    this.D(this.m, b, this.f - c, b, this.f / 2, b, c);
                    break;
                case 5:
                    b = this.g / 3 * a / this.j;
                    c = this.f;
                    this.D(this.m, 0, 0, this.g / 3 - b, 0, b, c);
                    this.D(this.m, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                    b = this.g / 3;
                    c = this.f / 2 * a / this.j;
                    this.D(this.m, b, 0, b, 0, b, c);
                    this.D(this.m, b, this.f - c, b, this.f - c, b, c);
                    break;
                case 6:
                    b = this.g / 3;
                    c = this.f * a / this.j;
                    this.D(this.m, 0, this.f - c, 0, 0, b, c);
                    this.D(this.m, b, 0, b, this.f - c, b, c);
                    this.D(this.m, 2 * b, this.f - c, 2 * b, 0, b, c);
                    break;
                case 7:
                    b = this.g / 7;
                    c = this.f * a / this.j;
                    this.D(this.m, 0, this.f - c, 0, 0, b, c);
                    this.D(this.m, b, 0, b, this.f - c, b, c);
                    this.D(this.m, 2 * b, this.f - c, 2 * b, 0, b, c);
                    this.D(this.m, 3 * b, 0, 3 * b, this.f - c, b, c);
                    this.D(this.m, 4 * b, this.f - c, 4 * b, 0, b, c);
                    this.D(this.m, 5 * b, 0, 5 * b, this.f - c, b, c);
                    this.D(this.m, 6 * b, this.f - c, 6 * b, 0, 2 * b, c);
                    break;
                default:
                    this.D(this.m)
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Id.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c;
                this.D(this.m);
                switch (this.eb) {
                case 0:
                    b = this.g / 2 * a / this.j;
                    b = this.g / 2 - b;
                    c = this.f / 2 * a / this.j;
                    c = this.f / 2 - c;
                    this.stretch(this.Z, 0, 0, b, c, 0, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    c = this.f / 2 - c;
                    this.stretch(this.Z, this.g / 2 + b, 0, this.g / 2 - b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    b = this.g / 2 - b;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.Z, 0, this.f / 2 + c, b, this.f / 2 - c, 0, this.f / 2, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.Z, this.g / 2 + b, this.f / 2 + c, this.g / 2 - b, this.f / 2 - c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                    break;
                case 1:
                    b = this.g * a / this.j;
                    b = this.g - b;
                    c = this.f * a / this.j;
                    c = this.f - c;
                    this.D(this.Z, 0, 0, this.g - b, this.f - c, b, c);
                    break;
                case 2:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    c = this.f - c;
                    this.D(this.Z, b, 0, 0, this.f - c, this.g - b, c);
                    break;
                case 3:
                    b = this.g * a / this.j;
                    b = this.g - b;
                    c = this.f * a / this.j;
                    this.D(this.Z, 0, c, this.g - b, 0, b, this.f - c);
                    break;
                case 4:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    this.D(this.Z, b, c, 0, 0, this.g - b, this.f - c);
                    break;
                case 5:
                    b = this.g / 2 * a / this.j;
                    b = this.g / 2 - b;
                    c = this.f / 2 * a / this.j;
                    c = this.f / 2 - c;
                    this.D(this.Z, b - this.g / 2, c - this.f / 2, 0, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    c = this.f / 2 - c;
                    this.D(this.Z, this.g / 2 + b, c - this.f / 2, this.g / 2, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    b = this.g / 2 - b;
                    c = this.f / 2 * a / this.j;
                    this.D(this.Z, b - this.g / 2, this.f / 2 + c, 0, this.f / 2, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.D(this.Z, this.g / 2 + b, this.f / 2 + c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                    break;
                case 6:
                    c = this.f / 2 * a / this.j;
                    c = this.f / 2 - c;
                    this.D(this.Z, 0, c - this.f / 2, 0, 0, this.g, this.f / 2);
                    this.D(this.Z, 0, this.f - c, 0, this.f / 2, this.g, this.f / 2);
                    break;
                case 7:
                    b = this.g / 2 * a / this.j,
                    b = this.g / 2 - b,
                    this.D(this.Z, b - this.g / 2, 0, 0, 0, this.g / 2, this.f),
                    this.D(this.Z, this.g - b, 0, this.g / 2, 0, this.g / 2, this.f)
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Jd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Mf = b.o();
            this.zu = b.o();
            this.start(a, c, d, e)
        },
        Tb: function() {
            var a = this.Z.width, b = this.Z.height, c;
            if (this.ya) {
                0 == this.Mf && (this.Mf = 1);
                switch (this.zu) {
                case w.Np:
                case w.mq:
                    this.Cc = (a + this.Mf - 1) / this.Mf;
                    0 == this.Cc && (this.Cc = 1,
                    this.Mf = a);
                    break;
                default:
                    this.Cc = (b + this.Mf - 1) / this.Mf,
                    0 == this.Cc && (this.Cc = 1,
                    this.Mf = b)
                }
                this.yb = 0;
                this.ya = !1
            }
            if (0 >= this.Mf || 0 >= this.Cc || 0 == this.j)
                this.D(this.m);
            else {
                var d = this.Cc * this.zc() / this.j;
                if (d > this.yb) {
                    var e = 0
                      , f = 0
                      , g = 0
                      , h = 0;
                    for (c = 0; c < this.Mf; c++) {
                        switch (this.zu) {
                        case w.Np:
                            e = this.yb + c * this.Cc;
                            f = 0;
                            g = d - this.yb;
                            h = b;
                            break;
                        case w.mq:
                            e = a - (this.yb + c * this.Cc) - (d - this.yb);
                            f = 0;
                            g = d - this.yb;
                            h = b;
                            break;
                        case w.Oy:
                            e = 0;
                            f = this.yb + c * this.Cc;
                            g = a;
                            h = d - this.yb;
                            break;
                        case w.Lx:
                            e = 0,
                            f = b - (this.yb + c * this.Cc) - (d - this.yb),
                            g = a,
                            h = d - this.yb
                        }
                        this.D(this.m, e, f, e, f, g, h)
                    }
                }
                this.yb = d
            }
            return this.wK
        },
        end: function() {
            this.finish()
        }
    });
    Kd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Va = b.s();
            this.Pq = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d, e, f, g, h, q, k, l;
                k = this.g / this.Va;
                l = this.f / this.Pq;
                d = this.g / this.Va;
                e = this.f / this.Pq;
                for (f = 0; f < this.Va; f++)
                    for (g = 0; g < this.Pq; g++)
                        b = f * k,
                        c = g * l,
                        h = d * a / this.j,
                        q = e * a / this.j,
                        this.stretch(this.m, b + (d - h) / 2, c + (e - q) / 2, h, q, b + (d - h) / 2, c + (e - q) / 2, h, q)
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Ld.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.cj = b.o();
            this.start(a, c, d, e)
        },
        Tb: function() {
            if (this.ya) {
                switch (this.cj) {
                case w.lt:
                case w.Gt:
                    this.Cc = this.Z.width / 2;
                    break;
                default:
                    this.Cc = this.Z.height / 2
                }
                this.yb = 0;
                this.ya = !1
            }
            if (0 == this.Cc)
                this.D(this.m);
            else {
                var a = 0
                  , b = 0
                  , c = 0
                  , d = 0
                  , e = this.Cc * this.zc() / this.j;
                if (e > this.yb) {
                    switch (this.cj) {
                    case w.lt:
                        a = this.Z.width / 2 - e;
                        b = 0;
                        c = e - this.yb;
                        d = this.m.height;
                        break;
                    case w.Gt:
                        a = this.yb;
                        b = 0;
                        c = e - this.yb;
                        d = this.m.height;
                        break;
                    case w.Px:
                        a = 0;
                        b = this.Z.height / 2 - e;
                        c = this.m.width;
                        d = e - this.yb;
                        break;
                    case w.Ny:
                        a = 0,
                        b = this.yb,
                        c = this.m.width,
                        d = e - this.yb
                    }
                    this.D(this.m, a, b, a, b, c, d);
                    switch (this.cj) {
                    case w.lt:
                        a = this.Z.width / 2 + this.yb;
                        break;
                    case w.Gt:
                        a = this.Z.width - e;
                        break;
                    case w.Px:
                        b = this.Z.height / 2 + this.yb;
                        break;
                    case w.Ny:
                        b = this.Z.height - e
                    }
                    this.D(this.m, a, b, a, b, c, d)
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Md.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1);
            var a;
            this.Ih.globalAlpha = 1;
            this.D(this.Z);
            a = this.zc() / this.j;
            this.Ih.globalAlpha = a;
            this.D(this.m);
            return null
        },
        end: function() {
            this.Ih.globalAlpha = 1;
            this.finish()
        }
    });
    Nd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Va = b.s();
            this.eb = b.s();
            this.Nn = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d, e, f;
                b = 0;
                var g;
                if (0 == this.eb)
                    for (g = this.f / this.Va,
                    f = 0; f < this.Va; f++)
                        0 == b ? (b = 0,
                        c = f * g,
                        d = this.g * a / this.j,
                        e = f == this.Va - 1 ? this.f : g + 1,
                        0 == this.Nn ? this.D(this.m, b, c, b, c, d, e) : this.D(this.m, b, c, this.g - d, c, d, e),
                        b = 1) : (c = f * g,
                        d = this.g * a / this.j,
                        b = this.g - d,
                        e = f == this.Va - 1 ? this.f : g + 1,
                        0 == this.Nn ? this.D(this.m, b, c, b, c, d, e) : this.D(this.m, b, c, 0, c, d, e),
                        b = 0);
                else
                    for (g = this.g / this.Va,
                    f = 0; f < this.Va; f++)
                        0 == b ? (b = f * g,
                        c = 0,
                        e = this.f * a / this.j,
                        d = f == this.Va - 1 ? this.g : g + 1,
                        0 == this.Nn ? this.D(this.m, b, c, b, c, d, e) : this.D(this.m, b, c, b, this.f - e, d, e),
                        b = 1) : (b = f * g,
                        e = this.f * a / this.j,
                        c = this.f - e,
                        d = f == this.Va - 1 ? this.g : g + 1,
                        0 == this.Nn ? this.D(this.m, b, c, b, c, d, e) : this.D(this.m, b, c, b, 0, d, e),
                        b = 0)
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Od.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Uv = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            if (this.ya) {
                var a = this.Z.width
                  , b = this.Z.height;
                this.I = Math.floor((a * this.Uv / 100 + b * this.Uv / 100) / 2);
                0 == this.I && (this.I = 1);
                this.Ke = (a + this.I - 1) / this.I;
                this.Gg = (b + this.I - 1) / this.I;
                this.Qk = this.Ke * this.Gg;
                a = Math.floor((this.Qk + 7) / 8 + 2);
                this.Ok = 0;
                this.qe = Array(a);
                for (b = 0; b < a; b++)
                    this.qe[b] = 0;
                this.ya = !1
            }
            if (null == this.qe || 2 > this.Ke || 2 > this.Gg || 0 == this.j)
                this.D(this.m);
            else {
                var c, d, b = a = 0;
                c = Math.floor(this.Qk * this.zc() / this.j);
                var e = c - this.Ok;
                if (0 != e)
                    for (this.Ok = c,
                    d = 0; d < e; d++) {
                        for (c = 0; 1 > c; c++) {
                            var a = Math.floor(this.Ke * Math.random()), b = Math.floor(this.Gg * Math.random()), f, g;
                            f = b * this.Ke + a;
                            g = Math.floor(f / 8);
                            f = 1 << (f & 7);
                            if (0 == (this.qe[g] & f)) {
                                this.qe[g] |= f;
                                break
                            }
                            var h = g, q = (this.Qk + 7) / 8, k, l = !1;
                            for (k = g; k < q; k++,
                            h++)
                                if (-1 != this.qe[h]) {
                                    b = Math.floor(8 * k / this.Ke);
                                    a = Math.floor(8 * k % this.Ke);
                                    for (f = 1; 0 != f; f <<= 1) {
                                        if (0 == (this.qe[h] & f)) {
                                            this.qe[h] |= f;
                                            l = !0;
                                            break
                                        }
                                        if (++a >= this.Ke && (a = 0,
                                        ++b >= this.Gg))
                                            break
                                    }
                                    if (l)
                                        break
                                }
                            if (l)
                                break;
                            for (k = h = 0; k < g; k++,
                            h++) {
                                if (255 != this.qe[h]) {
                                    b = Math.floor(8 * k / m_nbBlockPerLine);
                                    a = Math.floor(8 * k % m_nbBlockPerLine);
                                    for (f = 1; 0 != f; f <<= 1) {
                                        if (0 == (this.qe[h] & f)) {
                                            this.qe[h] |= f;
                                            l = !0;
                                            break
                                        }
                                        if (++a >= this.Ke && (a = 0,
                                        ++b >= this.Gg))
                                            break
                                    }
                                    if (l)
                                        break
                                }
                                if (l)
                                    break;
                                l = !1
                            }
                        }
                        1 > c && this.D(this.m, Math.floor(a * this.I), Math.floor(b * this.I), Math.floor(a * this.I), Math.floor(b * this.I), this.I, this.I)
                    }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Pd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc()
              , b = a / this.j;
            if (1 < b)
                this.D(this.m);
            else {
                var c, d, e;
                .25 > b ? (d = 2 * this.g * a / this.j,
                d *= 2,
                e = this.f / 7,
                b = this.g / 2 - d / 2,
                c = this.f / 2 - e / 2,
                this.D(this.m, b, c, b, c, d, e),
                d = this.g / 7,
                e = 2 * this.f * a / this.j,
                e *= 2,
                b = this.g / 2 - d / 2,
                c = this.f / 2 - e / 2) : (b = this.g / 2,
                d = this.g * a / this.j - b,
                e = this.f / 2,
                c = 0,
                this.D(this.m, b, c, b, c, d, e),
                c = this.f / 2,
                e = this.f * a / this.j - c,
                b = d = this.g / 2,
                this.D(this.m, b, c, b, c, d, e),
                d = this.g * a / this.j - this.g / 2,
                b = this.g / 2 - d,
                c = e = this.f / 2,
                this.D(this.m, b, c, b, c, d, e),
                e = this.f * a / this.j - this.f / 2,
                c = this.f / 2 - e,
                d = this.g / 2,
                b = 0);
                this.D(this.m, b, c, b, c, d, e)
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Qd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.Tv = !1);
            var a = this.zc()
              , b = a / this.j;
            if (1 < b)
                this.D(this.m);
            else {
                var c, d, e, f;
                if (.5 >= b)
                    switch (this.eb) {
                    case 0:
                        e = this.g * a / this.j * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.D(this.m, 0, 0, c, d, e, f);
                        break;
                    case 1:
                        e = this.g * a / this.j * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.D(this.m, c, 0, 0, d, e, f);
                        break;
                    case 2:
                        e = this.g * a / this.j * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.D(this.m, 0, d, c, 0, e, f);
                        break;
                    case 3:
                        e = this.g * a / this.j * 2,
                        f = this.f / 2,
                        c = this.g - e,
                        d = this.f / 2,
                        this.D(this.m, c, d, 0, 0, e, f)
                    }
                if (.5 < b)
                    switch (0 == this.Tv && (1 >= this.eb ? this.D(this.m, 0, 0, 0, this.f / 2, this.g, this.f / 2) : this.D(this.m, 0, this.f / 2, 0, 0, this.g, this.f / 2),
                    this.Tv = !0),
                    b = a - this.j / 2,
                    b /= this.j / 2,
                    f = this.f / 2 * 1E3 * b / 1E3,
                    this.eb) {
                    case 0:
                    case 1:
                        this.stretch(this.m, 0, f, this.g, this.f / 2, 0, this.f / 2, this.g, this.f / 2);
                        this.stretch(this.m, 0, 0, this.g, f, 0, this.f / 2 - f, this.g, f);
                        break;
                    case 2:
                    case 3:
                        this.stretch(this.m, 0, this.f / 2 - f, this.g, this.f / 2, 0, 0, this.g, this.f / 2),
                        this.stretch(this.m, 0, this.f - f, this.g, f, 0, this.f / 2, this.g, f)
                    }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Rd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.cj = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            var a = this.Z.width
              , b = this.Z.height;
            if (this.ya) {
                switch (this.cj) {
                case w.Np:
                case w.mq:
                    this.Cc = a;
                    break;
                default:
                    this.Cc = b
                }
                this.yb = 0;
                this.ya = !1
            }
            if (0 == this.j)
                this.D(this.m);
            else {
                var c = this.Cc * this.zc() / this.j;
                if (c > this.yb) {
                    var d = 0
                      , e = 0;
                    switch (this.cj) {
                    case w.Np:
                        d = c - a;
                        e = 0;
                        break;
                    case w.mq:
                        d = a - c;
                        e = 0;
                        break;
                    case w.Oy:
                        d = 0;
                        e = c - b;
                        break;
                    case w.Lx:
                        d = 0,
                        e = b - c
                    }
                    this.D(this.m, d, e, 0, 0, a, b);
                    this.yb = c
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Sd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.Va = b.s();
            this.Xz = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d, e, f, g;
                f = this.g * this.Va / 100;
                g = this.f * this.Va / 100;
                d = f * a / this.j;
                e = g * a / this.j;
                b = this.g / 2 - d / 2;
                c = this.f / 2 - e / 2;
                0 == this.Xz ? this.D(this.m, b, c, b, c, d, e) : this.stretch(this.m, b, c, d, e, this.g / 2 - f / 2, this.f / 2 - g / 2, f, g);
                b = 100 - this.Va;
                f = this.g * b / 100;
                g = this.f * b / 100;
                d = f / 2 * a / this.j;
                e = g / 2 * a / this.j;
                this.D(this.m, 0, 0, 0, 0, this.g, e);
                this.D(this.m, 0, 0, 0, 0, d, this.f);
                this.D(this.m, 0, this.f - e, 0, this.f - e, this.g, e);
                this.D(this.m, this.g - d, 0, this.g - d, 0, d, this.f)
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Td.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c;
                switch (this.eb) {
                case 0:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f);
                    break;
                case 1:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    this.stretch(this.m, this.g - b, 0, b, c, 0, 0, this.g, this.f);
                    break;
                case 2:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    this.stretch(this.m, 0, this.f - c, b, c, 0, 0, this.g, this.f);
                    break;
                case 3:
                    b = this.g * a / this.j;
                    c = this.f * a / this.j;
                    this.stretch(this.m, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f);
                    break;
                case 4:
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    5 > c && (c = 5);
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.Z.width / 2, this.Z.height / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    5 > c && (c = 5);
                    this.stretch(this.m, this.g - b, 0, b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.m, 0, this.f - c, b, c, 0, this.f / 2, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.m, this.g - b, this.f - c, b, c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                    break;
                case 5:
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    5 > c && (c = 5);
                    this.stretch(this.m, this.g / 2 - b, this.f / 2 - c, b, c, 0, 0, this.Z.width / 2, this.Z.height / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    5 > c && (c = 5);
                    this.stretch(this.m, this.g / 2, this.f / 2 - c, b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.m, this.g / 2 - b, this.f / 2, b, c, 0, this.f / 2, this.g / 2, this.f / 2);
                    b = this.g / 2 * a / this.j;
                    c = this.f / 2 * a / this.j;
                    this.stretch(this.m, this.g / 2, this.f / 2, b, c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                    break;
                case 6:
                    b = this.g;
                    c = this.f * a / this.j;
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f);
                    break;
                case 7:
                    b = this.g * a / this.j;
                    c = this.f;
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f);
                    break;
                case 8:
                    b = this.g * a / this.j;
                    c = this.f;
                    this.stretch(this.m, this.g - b, 0, b, c, 0, 0, this.g, this.f);
                    break;
                case 9:
                    b = this.g,
                    c = this.f * a / this.j,
                    this.stretch(this.m, 0, this.f - c, b, c, 0, 0, this.g, this.f)
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Ud.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.nc = 0);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c;
                switch (this.eb) {
                case 0:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, 0, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 1:
                    0 == this.nc ? (b = this.g,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, 0, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 2:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, this.g - b, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, this.g - b, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 3:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = this.f,
                    this.stretch(this.Z, 0, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = this.f,
                    this.stretch(this.m, 0, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 4:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = this.f,
                    this.stretch(this.Z, this.g / 2 - b / 2, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = this.f,
                    this.stretch(this.m, this.g / 2 - b / 2, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 5:
                    0 == this.nc ? (c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    b = this.g,
                    this.stretch(this.Z, 0, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (c = 2 * this.f * a / this.j,
                    c -= this.f,
                    b = this.g,
                    this.stretch(this.m, 0, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f));
                    break;
                case 6:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, this.g / 2 - b / 2, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, this.g / 2 - b / 2, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f));
                    break;
                case 7:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = this.f,
                    this.stretch(this.Z, this.g - b, 0, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = this.f,
                    this.stretch(this.m, this.f - b, 0, b, c, 0, 0, this.g, this.f));
                    break;
                case 8:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, 0, this.f - c, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, 0, this.f - c, b, c, 0, 0, this.g, this.f));
                    break;
                case 9:
                    0 == this.nc ? (b = this.g,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, 0, this.f - c, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, 0, this.f - c, b, c, 0, 0, this.g, this.f));
                    break;
                case 10:
                    0 == this.nc ? (b = 2 * this.g * a / this.j,
                    b = this.g - b,
                    c = 2 * this.f * a / this.j,
                    c = this.f - c,
                    this.stretch(this.Z, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f),
                    a >= this.j / 2 && (this.nc = 1)) : (b = 2 * this.g * a / this.j,
                    b -= this.g,
                    c = 2 * this.f * a / this.j,
                    c -= this.f,
                    this.stretch(this.m, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f))
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Vd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.Nk = this.Mk = 0);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d, e;
                b = this.f * a / this.j;
                a = this.g * a / this.j;
                if (0 == this.eb) {
                    e = b % 2;
                    for (c = 0; c < this.g; c += 2) {
                        for (d = this.Mk; d < b; d++)
                            this.D(this.m, c, d, c, d, 1, 1);
                        for (d = this.f - b - e; d < this.f - this.Mk; d++)
                            this.D(this.m, c + 1, d + 1, c + 1, d + 1, 1, 1)
                    }
                    this.Mk = 0 == b % 2 ? b : b - 1
                }
                if (1 == this.eb) {
                    e = a % 2;
                    for (d = 0; d < this.f; d++) {
                        for (c = this.Nk; c < a; c += 2)
                            this.D(this.m, c + 1, d, c + 1, d, 1, 1);
                        for (c = this.g - a - e; c < this.g - this.Nk; c += 2)
                            this.D(this.m, c, d + 1, c, d + 1, 1, 1)
                    }
                    this.Nk = 0 == a % 2 ? a : a - 1
                }
                if (2 == this.eb) {
                    e = b % 2;
                    for (c = 0; c < this.g; c += 2) {
                        for (d = this.Mk; d < b; d += 2)
                            this.D(this.m, c, d, c, d, 1, 1);
                        for (d = this.f - b - e; d < this.f - this.Mk; d += 2)
                            this.D(this.m, c + 1, d + 1, c + 1, d + 1, 1, 1)
                    }
                    e = a % 2;
                    for (d = 0; d < this.f; d += 2) {
                        for (c = this.Nk; c < a; c += 2)
                            this.D(this.m, c + 1, d, c + 1, d, 1, 1);
                        for (c = this.g - a - e; c < this.g - this.Nk; c += 2)
                            this.D(this.m, c, d + 1, c, d + 1, 1, 1)
                    }
                    this.Mk = 0 == b % 2 ? b : b - 1;
                    this.Nk = 0 == a % 2 ? a : a - 1
                }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Wd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Va = b.s();
            this.Mn = b.s();
            this.Wz = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.km = 0);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d;
                b = this.g / 2;
                d = this.f / 2;
                this.km = 6.28318 * this.Va * a / this.j;
                1 == this.Wz && (this.km = 6.28318 - this.km);
                c = this.g / 2 - this.g / 2 * a / this.j;
                b = Math.floor(b + Math.cos(this.km) * c);
                c = Math.floor(d + Math.sin(this.km) * c);
                d = this.g * a / this.j;
                a = this.f * a / this.j;
                this.stretch(this.Z, 0, 0, this.g, this.f, 0, 0, this.Z.width, this.Z.height);
                1 == this.rS ? this.stretch(this.m, b - d / 2, c - a / 2, d, a, 0, 0, this.g, this.f) : this.stretch(this.m, b - d / 2, c - a / 2, d, a, this.g - d, this.f - a, d, a)
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Xd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Va = b.s();
            this.Mn = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.Ar = 0);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d;
                b = this.g / 2;
                c = this.f / 2;
                d = 6.28318 * this.Va * a / this.j;
                d -= 6.28318 * this.Ar;
                1 == this.Mn && (d = 6.28318 - d);
                a = this.g * a / this.j;
                b = Math.floor(b + Math.cos(d) * a);
                c = Math.floor(c + Math.sin(d) * a);
                this.D(this.m);
                this.D(this.Z, b - this.g / 2, c - this.f / 2, 0, 0, this.g, this.f);
                0 == this.Mn ? 6.28318 <= d && this.Ar++ : 0 >= d && this.Ar++
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Yd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Dx = b.s();
            this.gt = b.o();
            this.MD = b.o();
            this.start(a, c, d, e)
        },
        Tb: function() {
            var a = this.Z.width
              , b = this.Z.height;
            if (this.ya) {
                this.I = Math.floor((a * this.Dx / 100 + b * this.Dx / 100) / 2);
                0 == this.I && (this.I = 1);
                this.Ke = (a + this.I - 1) / this.I;
                this.Gg = (b + this.I - 1) / this.I;
                this.Sv = this.MD;
                this.ud = this.gt;
                switch (this.gt) {
                case w.Hi:
                    this.fa = this.ga = 0;
                    break;
                case w.Ii:
                    this.fa = a - this.I;
                    this.ga = 0;
                    break;
                case w.Oj:
                    this.fa = 0;
                    this.ga = b - this.I;
                    break;
                case w.Pj:
                    this.fa = a - this.I;
                    this.ga = b - this.I;
                    break;
                case w.Ox:
                    this.fa = a / 2 - this.I,
                    this.ga = b / 2 - this.I,
                    this.ud = this.Sv == w.Wx ? w.Hi : w.Ii,
                    this.Cr = this.fa - this.I,
                    this.Fr = this.ga - this.I,
                    this.zr = this.ga + 2 * this.I,
                    this.Er = this.fa + 2 * this.I,
                    this.Ke = 2 + 2 * (this.fa + this.I - 1) / this.I,
                    this.Gg = 2 + 2 * (this.ga + this.I - 1) / this.I
                }
                this.Qk = Math.floor(this.Ke * this.Gg);
                this.Ok = 0;
                this.ya = !1
            }
            if (this.I >= a || this.I >= b)
                this.D(this.m);
            else {
                var c;
                c = Math.floor(this.Qk * this.zc() / this.j);
                var d = c - this.Ok;
                if (0 != d)
                    for (this.Ok = c,
                    c = 0; c < d; c++)
                        if (this.D(this.m, this.fa, this.ga, this.fa, this.ga, this.I, this.I),
                        this.gt == w.Ox)
                            switch (this.ud) {
                            case w.Hi:
                                this.fa += this.I;
                                this.fa >= this.Er && (this.fa -= this.I,
                                this.ga += this.I,
                                this.ud = w.Ii,
                                this.Er += this.I);
                                break;
                            case w.Ii:
                                this.ga += this.I;
                                this.ga >= this.zr && (this.ga -= this.I,
                                this.fa -= this.I,
                                this.ud = w.Pj,
                                this.zr += this.I);
                                break;
                            case w.Pj:
                                this.fa -= this.I;
                                this.fa + this.I <= this.Cr && (this.fa += this.I,
                                this.ga -= this.I,
                                this.ud = w.Oj,
                                this.Cr -= this.I);
                                break;
                            case w.Oj:
                                this.ga -= this.I,
                                this.ga + this.I <= this.Fr && (this.ga += this.I,
                                this.fa += this.I,
                                this.ud = w.Hi,
                                this.Fr -= this.I)
                            }
                        else
                            switch (this.Sv) {
                            case w.Wx:
                                switch (this.ud) {
                                case w.Hi:
                                    this.fa += this.I;
                                    this.fa >= a && (this.fa -= this.I,
                                    this.ga += this.I,
                                    this.ud = w.Ii);
                                    break;
                                case w.Ii:
                                    this.fa -= this.I;
                                    0 >= this.fa + this.I && (this.fa += this.I,
                                    this.ga += this.I,
                                    this.ud = w.Hi);
                                    break;
                                case w.Oj:
                                    this.fa += this.I;
                                    this.fa >= a && (this.fa -= this.I,
                                    this.ga -= this.I,
                                    this.ud = w.Pj);
                                    break;
                                case w.Pj:
                                    this.fa -= this.I,
                                    0 >= this.fa + this.I && (this.fa += this.I,
                                    this.ga -= this.I,
                                    this.ud = w.Oj)
                                }
                                break;
                            case w.WE:
                                switch (this.ud) {
                                case w.Hi:
                                    this.ga += this.I;
                                    this.ga >= b && (this.ga -= this.I,
                                    this.fa += this.I,
                                    this.ud = w.Oj);
                                    break;
                                case w.Ii:
                                    this.ga += this.I;
                                    this.ga >= b && (this.ga -= this.I,
                                    this.fa -= this.I,
                                    this.ud = w.Pj);
                                    break;
                                case w.Oj:
                                    this.ga -= this.I;
                                    0 >= this.ga + this.I && (this.ga += this.I,
                                    this.fa += this.I,
                                    this.ud = w.Hi);
                                    break;
                                case w.Pj:
                                    this.ga -= this.I,
                                    0 >= this.ga + this.I && (this.ga += this.I,
                                    this.fa -= this.I,
                                    this.ud = w.Ii)
                                }
                            }
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    Zd.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.eb = b.s();
            this.Va = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height,
            this.Wf = this.Pk = 0);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d, e;
                0 == this.eb ? (b = this.f / this.Va,
                e = Math.floor(this.Pk * b) + Math.floor(b),
                c = 0,
                d = this.g * a / this.j,
                d = d * this.Va / 2,
                d -= this.g * this.Pk,
                b = 0 == this.Wf ? 0 : this.g - d,
                this.D(this.m, b, c, b, c, d, e),
                c = this.f - e,
                b = 1 == this.Wf ? 0 : this.g - d,
                this.D(this.m, b, c, b, c, d, e),
                d >= this.g && (this.Pk++,
                this.Wf++,
                2 == this.Wf && (this.Wf = 0))) : (b = this.g / this.Va,
                d = Math.floor(this.Pk * b) + Math.floor(b),
                b = 0,
                e = this.f * a / this.j,
                e = e * this.Va / 2,
                e -= this.f * this.Pk,
                c = 0 == this.Wf ? 0 : this.f - e,
                this.D(this.m, b, c, b, c, d, e),
                b = this.g - d,
                c = 1 == this.Wf ? 0 : this.f - e,
                this.D(this.m, b, c, b, c, d, e),
                e >= this.f && (this.Pk++,
                this.Wf++,
                2 == this.Wf && (this.Wf = 0)))
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    $d.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.start(a, c, d, e)
        },
        Tb: function(a) {
            var b = this.Z.width
              , c = this.Z.height;
            this.ya && (this.ya = !1);
            if (0 == this.j)
                this.D(this.m);
            else {
                var d;
                d = this.zc();
                0 != (a & w.sq) ? (a = Math.floor(b - b * d / this.j),
                d = Math.floor(c - c * d / this.j),
                this.D(this.m),
                this.stretch(this.Z, (b - a) / 2, (c - d) / 2, a, d, 0, 0, b, c)) : (a = Math.floor(b * d / this.j),
                d = Math.floor(c * d / this.j),
                this.D(this.Z),
                this.stretch(this.m, (b - a) / 2, (c - d) / 2, a, d, 0, 0, b, c))
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    ae.prototype = p.extend(new w, {
        $: function(a, b, c, d, e) {
            this.Va = b.s();
            this.start(a, c, d, e)
        },
        Tb: function() {
            this.ya && (this.ya = !1,
            this.g = this.m.width,
            this.f = this.m.height);
            var a = this.zc();
            if (1 < a / this.j)
                this.D(this.m);
            else {
                var b, c, d;
                0 == this.Va ? (c = this.g * a / this.j,
                d = this.f * a / this.j,
                a = this.g / 2 - c / 2,
                b = this.f / 2 - d / 2,
                this.stretch(this.m, 0, 0, this.g, this.f, a, b, c, d)) : (c = this.g * a / this.j,
                c = this.g - c,
                d = this.f * a / this.j,
                d = this.f - d,
                a = this.g / 2 - c / 2,
                b = this.f / 2 - d / 2,
                this.stretch(this.Z, 0, 0, this.g, this.f, a, b, c, d))
            }
            return null
        },
        end: function() {
            this.finish()
        }
    });
    k.eh = {
        ny: "PK\u0003\u0004",
        Qx: "PK\u0001\u0002",
        mt: "PK\u0005\u0006",
        Ry: "PK\u0006\u0007",
        lH: "PK\u0006\u0006",
        BN: "PK\u0007\b"
    };
    k.sI = {
        Eh: !1,
        Qi: !1,
        dir: !1,
        Of: null,
        Tl: null
    };
    k.prototype = function() {
        function a(d) {
            "/" != d.slice(-1) && (d += "/");
            if (!this.files[d]) {
                var e = b(d);
                e && a.call(this, e);
                c.call(this, d, null, {
                    dir: !0
                })
            }
            return this.files[d]
        }
        function b(a) {
            "/" == a.slice(-1) && (a = a.substring(0, a.length - 1));
            var b = a.lastIndexOf("/");
            return 0 < b ? a.substring(0, b) : ""
        }
        function c(c, e, q) {
            var g = b(c);
            g && a.call(this, g);
            q = q || {};
            !0 === q.Eh && null == q.Qi && (q.Qi = !0);
            q = d(q, k.sI);
            q.Of = q.Of || new Date;
            null !== q.Tl && (q.Tl = q.Tl.toUpperCase());
            q.dir || null === e || "undefined" === typeof e ? (q.Eh = !1,
            q.Qi = !1,
            e = null) : k.wl.Ys && e instanceof Uint8Array ? (q.Eh = !1,
            q.Qi = !0,
            e = k.kh.Xs(e)) : k.wl.Wy && e instanceof ArrayBuffer ? (q.Eh = !1,
            q.Qi = !0,
            e = new Uint8Array(e),
            e = k.kh.Xs(e)) : q.Qi && !q.Eh && (!0 !== q.lC && (e = k.kh.yD(e)),
            delete q.lC);
            return this.files[c] = new f(c,e,q)
        }
        function d() {
            var a = {}, b, c;
            for (b = 0; b < arguments.length; b++)
                for (c in arguments[b])
                    arguments[b].hasOwnProperty(c) && "undefined" === typeof a[c] && (a[c] = arguments[b][c]);
            return a
        }
        function e(a, b) {
            var c = "", d;
            for (d = 0; d < b; d++)
                c += String.fromCharCode(a & 255),
                a >>>= 8;
            return c
        }
        function f(a, b, c) {
            this.name = a;
            this.data = b;
            this.options = c
        }
        f.prototype = {
            Xy: function() {
                var a = this.data;
                if (null === a || "undefined" === typeof a)
                    return "";
                this.options.Eh && (a = qb.decode(a));
                this.options.Qi || (a = k.prototype.ID(a));
                return a
            }
        };
        return {
            load: function() {
                throw Error("Load method is not defined. Is the file jszip-load.js included ?");
            },
            filter: function(a) {
                var b = [], c, e, g;
                for (c in this.files)
                    this.files.hasOwnProperty(c) && (e = this.files[c],
                    g = new f(e.name,e.data,d(e.options)),
                    e = c.slice(this.root.length, c.length),
                    c.slice(0, this.root.length) === this.root && a(e, g) && b.push(g));
                return b
            },
            file: function(a, b, d) {
                if (1 === arguments.length) {
                    if (a instanceof RegExp) {
                        var e = a;
                        return this.filter(function(a, b) {
                            return !b.options.dir && e.test(a)
                        })
                    }
                    return this.filter(function(b, c) {
                        return !c.options.dir && b === a
                    })[0] || null
                }
                a = this.root + a;
                c.call(this, a, b, d);
                return this
            },
            jR: function(b) {
                if (!b)
                    return this;
                if (b instanceof RegExp)
                    return this.filter(function(a, c) {
                        return c.options.dir && b.test(a)
                    });
                var c = a.call(this, this.root + b)
                  , d = this.clone();
                d.root = c.name;
                return d
            },
            remove: function(a) {
                a = this.root + a;
                var b = this.files[a];
                b || ("/" != a.slice(-1) && (a += "/"),
                b = this.files[a]);
                if (b)
                    if (b.options.dir)
                        for (var b = this.filter(function(b, c) {
                            return c.name.slice(0, a.length) === a
                        }), c = 0; c < b.length; c++)
                            delete this.files[b[c].name];
                    else
                        delete this.files[a];
                return this
            },
            mR: function(a) {
                var b, c;
                a = d(a || {}, {
                    Eh: !0,
                    Tl: "STORE",
                    type: "base64"
                });
                var f = a.Tl.toUpperCase();
                if (!k.Nf[f])
                    throw f + " is not a valid compression method !";
                var g = [], l = [], n = 0, m;
                for (m in this.files)
                    if (this.files.hasOwnProperty(m)) {
                        b = this.files[m];
                        var p = this.ID(b.name), r, t, u;
                        t = b;
                        b = p;
                        var v = f;
                        r = b !== t.name;
                        c = t.Xy();
                        var w = t.options;
                        u = w.Of.getHours();
                        u = u << 6 | w.Of.getMinutes();
                        u = u << 5 | w.Of.getSeconds() / 2;
                        t = w.Of.getFullYear() - 1980;
                        t = t << 4 | w.Of.getMonth() + 1;
                        t = t << 5 | w.Of.getDate();
                        var B = null !== c && 0 !== c.length
                          , v = w.Tl || v;
                        if (!k.Nf[v])
                            throw v + " is not a valid compression method !";
                        w = k.Nf[v];
                        v = B ? w.YH(c) : "";
                        r = "\n\x00" + (r ? "\x00\b" : "\x00\x00") + (B ? w.Hr : k.Nf.STORE.Hr);
                        r += e(u, 2);
                        r += e(t, 2);
                        r += B ? e(this.Iq(c), 4) : "\x00\x00\x00\x00";
                        r += B ? e(v.length, 4) : "\x00\x00\x00\x00";
                        r += B ? e(c.length, 4) : "\x00\x00\x00\x00";
                        r += e(b.length, 2);
                        b = r += "\x00\x00";
                        c = v;
                        c = k.eh.ny + b + p + c;
                        p = k.eh.Qx + "\u0014\x00" + b + "\x00\x00\x00\x00\x00\x00" + (!0 === this.files[m].options.dir ? "\u0010\x00\x00\x00" : "\x00\x00\x00\x00") + e(n, 4) + p;
                        n += c.length;
                        l.push(c);
                        g.push(p)
                    }
                f = l.join("");
                g = g.join("");
                l = f + g + (k.eh.mt + "\x00\x00\x00\x00" + e(l.length, 2) + e(l.length, 2) + e(g.length, 4) + e(f.length, 4) + "\x00\x00");
                switch (a.type.toLowerCase()) {
                case "uint8array":
                    return k.kh.ux(l);
                case "arraybuffer":
                    return k.kh.ux(l).buffer;
                case "blob":
                    return k.kh.eM(l);
                case "base64":
                    return a.Eh ? qb.encode(l) : l;
                default:
                    return l
                }
            },
            Iq: function(a, b) {
                if ("" === a || "undefined" === typeof a)
                    return 0;
                var c = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
                "undefined" == typeof b && (b = 0);
                var d;
                b ^= -1;
                for (var e = 0, f = a.length; e < f; e++)
                    d = (b ^ a.charCodeAt(e)) & 255,
                    d = c[d],
                    b = b >>> 8 ^ d;
                return b ^ -1
            },
            clone: function() {
                var a = new k, b;
                for (b in this)
                    "function" !== typeof this[b] && (a[b] = this[b]);
                return a
            },
            ID: function(a) {
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224),
                    b += String.fromCharCode(d >> 6 & 63 | 128)),
                    b += String.fromCharCode(d & 63 | 128))
                }
                return b
            },
            HD: function(a) {
                for (var b = "", c = 0, d, e, f; c < a.length; )
                    d = a.charCodeAt(c),
                    128 > d ? (b += String.fromCharCode(d),
                    c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1),
                    b += String.fromCharCode((d & 31) << 6 | e & 63),
                    c += 2) : (e = a.charCodeAt(c + 1),
                    f = a.charCodeAt(c + 2),
                    b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63),
                    c += 3);
                return b
            }
        }
    }();
    k.Nf = {
        STORE: {
            Hr: "\x00\x00",
            YH: function(a) {
                return a
            },
            zx: function(a) {
                return a
            }
        }
    };
    k.wl = {
        Wy: "undefined" !== typeof ArrayBuffer && "undefined" !== typeof Uint8Array,
        Ys: "undefined" !== typeof Uint8Array,
        blob: function() {
            if ("undefined" === typeof ArrayBuffer)
                return !1;
            var a = new ArrayBuffer(0);
            try {
                return 0 === (new Blob([a],{
                    type: "application/zip"
                })).size
            } catch (c) {}
            try {
                var b = new (window.BlobBuilder || window.WebKitBlobBuilder || window.BG || window.uG);
                b.append(a);
                return 0 === b.getBlob("application/zip").size
            } catch (c) {}
            return !1
        }()
    };
    k.kh = {
        yD: function(a) {
            for (var b = "", c = 0; c < a.length; c++)
                b += String.fromCharCode(a.charCodeAt(c) & 255);
            return b
        },
        ux: function(a) {
            if (!k.wl.Ys)
                throw Error("Uint8Array is not supported by this browser");
            for (var b = new ArrayBuffer(a.length), b = new Uint8Array(b), c = 0; c < a.length; c++)
                b[c] = a.charCodeAt(c);
            return b
        },
        Xs: function(a) {
            if (!k.wl.Ys)
                throw Error("Uint8Array is not supported by this browser");
            for (var b = "", c = 0; c < a.length; c++)
                b += String.fromCharCode(a[c]);
            return b
        },
        eM: function(a) {
            if (!k.wl.blob)
                throw Error("Blob is not supported by this browser");
            a = k.kh.ux(a).buffer;
            try {
                return new Blob([a],{
                    type: "application/zip"
                })
            } catch (c) {}
            try {
                var b = new (window.BlobBuilder || window.WebKitBlobBuilder || window.BG || window.uG);
                b.append(a);
                return b.getBlob("application/zip")
            } catch (c) {}
            throw Error("Bug : can't construct the Blob.");
        }
    };
    var qb = function() {
        return {
            encode: function(a) {
                for (var b = "", c, d, e, f, g, h, k = 0; k < a.length; )
                    c = a.charCodeAt(k++),
                    d = a.charCodeAt(k++),
                    e = a.charCodeAt(k++),
                    f = c >> 2,
                    c = (c & 3) << 4 | d >> 4,
                    g = (d & 15) << 2 | e >> 6,
                    h = e & 63,
                    isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64),
                    b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);
                return b
            },
            decode: function(a) {
                var b = "", c, d, e, f, g, h = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length; )
                    c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)),
                    d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)),
                    f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)),
                    g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)),
                    c = c << 2 | d >> 4,
                    d = (d & 15) << 4 | f >> 2,
                    e = (f & 3) << 6 | g,
                    b += String.fromCharCode(c),
                    64 != f && (b += String.fromCharCode(d)),
                    64 != g && (b += String.fromCharCode(e));
                return b
            }
        }
    }();
    if (!k)
        throw "JSZip not defined";
    (function() {
        function a() {
            this.list = this.next = null
        }
        function b() {
            this.n = this.Lf = this.e = 0;
            this.t = null
        }
        function c(c, d, e, f, g, h) {
            this.Nj = 16;
            this.CG = 288;
            this.status = 0;
            this.root = null;
            this.Sh = 0;
            var k = Array(this.Nj + 1), m, l, q, n, p, r, t, v = Array(this.Nj + 1), C, u, w, B = new b, E = Array(this.Nj);
            n = Array(this.CG);
            var z, D = Array(this.Nj + 1), A, F, H;
            H = this.root = null;
            for (p = 0; p < k.length; p++)
                k[p] = 0;
            for (p = 0; p < v.length; p++)
                v[p] = 0;
            for (p = 0; p < E.length; p++)
                E[p] = null;
            for (p = 0; p < n.length; p++)
                n[p] = 0;
            for (p = 0; p < D.length; p++)
                D[p] = 0;
            m = 256 < d ? c[256] : this.Nj;
            C = c;
            u = 0;
            p = d;
            do
                k[C[u]]++,
                u++;
            while (0 < --p);
            if (k[0] == d)
                this.root = null,
                this.status = this.Sh = 0;
            else {
                for (r = 1; r <= this.Nj && 0 == k[r]; r++)
                    ;
                t = r;
                h < r && (h = r);
                for (p = this.Nj; 0 != p && 0 == k[p]; p--)
                    ;
                q = p;
                h > p && (h = p);
                for (A = 1 << r; r < p; r++,
                A <<= 1)
                    if (0 > (A -= k[r])) {
                        this.status = 2;
                        this.Sh = h;
                        return
                    }
                if (0 > (A -= k[p]))
                    this.status = 2,
                    this.Sh = h;
                else {
                    k[p] += A;
                    D[1] = r = 0;
                    C = k;
                    u = 1;
                    for (w = 2; 0 < --p; )
                        D[w++] = r += C[u++];
                    C = c;
                    p = u = 0;
                    do
                        0 != (r = C[u++]) && (n[D[r]++] = p);
                    while (++p < d);
                    d = D[q];
                    D[0] = p = 0;
                    C = n;
                    u = 0;
                    n = -1;
                    z = v[0] = 0;
                    w = null;
                    for (F = 0; t <= q; t++)
                        for (c = k[t]; 0 < c--; ) {
                            for (; t > z + v[1 + n]; ) {
                                z += v[1 + n];
                                n++;
                                F = (F = q - z) > h ? h : F;
                                if ((l = 1 << (r = t - z)) > c + 1)
                                    for (l -= c + 1,
                                    w = t; ++r < F && !((l <<= 1) <= k[++w]); )
                                        l -= k[w];
                                z + r > m && z < m && (r = m - z);
                                F = 1 << r;
                                v[1 + n] = r;
                                w = Array(F);
                                for (l = 0; l < F; l++)
                                    w[l] = new b;
                                H = null == H ? this.root = new a : H.next = new a;
                                H.next = null;
                                H.list = w;
                                E[n] = w;
                                0 < n && (D[n] = p,
                                B.Lf = v[n],
                                B.e = 16 + r,
                                B.t = w,
                                r = (p & (1 << z) - 1) >> z - v[n],
                                E[n - 1][r].e = B.e,
                                E[n - 1][r].Lf = B.Lf,
                                E[n - 1][r].n = B.n,
                                E[n - 1][r].t = B.t)
                            }
                            B.Lf = t - z;
                            u >= d ? B.e = 99 : C[u] < e ? (B.e = 256 > C[u] ? 16 : 15,
                            B.n = C[u++]) : (B.e = g[C[u] - e],
                            B.n = f[C[u++] - e]);
                            l = 1 << t - z;
                            for (r = p >> z; r < F; r += l)
                                w[r].e = B.e,
                                w[r].Lf = B.Lf,
                                w[r].n = B.n,
                                w[r].t = B.t;
                            for (r = 1 << t - 1; 0 != (p & r); r >>= 1)
                                p ^= r;
                            for (p ^= r; (p & (1 << z) - 1) != D[n]; )
                                z -= v[n],
                                n--
                        }
                    this.Sh = v[1];
                    this.status = 0 != A && 1 != q ? 1 : 0
                }
            }
        }
        function d(a) {
            for (; D < a; )
                z |= (G.length == K ? -1 : G.charCodeAt(K++) & 255) << D,
                D += 8
        }
        function e(a) {
            return z & L[a]
        }
        function f(a) {
            z >>= a;
            D -= a
        }
        function g(a, b, c) {
            var g, h, k;
            if (0 == c)
                return 0;
            for (k = 0; ; ) {
                d(H);
                h = F.list[e(H)];
                for (g = h.e; 16 < g; ) {
                    if (99 == g)
                        return -1;
                    f(h.Lf);
                    g -= 16;
                    d(g);
                    h = h.t[e(g)];
                    g = h.e
                }
                f(h.Lf);
                if (16 == g)
                    t &= 32767,
                    a[b + k++] = r[t++] = h.n;
                else {
                    if (15 == g)
                        break;
                    d(g);
                    B = h.n + e(g);
                    f(g);
                    d(I);
                    h = J.list[e(I)];
                    for (g = h.e; 16 < g; ) {
                        if (99 == g)
                            return -1;
                        f(h.Lf);
                        g -= 16;
                        d(g);
                        h = h.t[e(g)];
                        g = h.e
                    }
                    f(h.Lf);
                    d(g);
                    A = t - h.n - e(g);
                    for (f(g); 0 < B && k < c; )
                        B--,
                        A &= 32767,
                        t &= 32767,
                        a[b + k++] = r[t++] = r[A++]
                }
                if (k == c)
                    return c
            }
            v = -1;
            return k
        }
        function h(a, b, h) {
            var k, m, l, q, n, p, r, t = Array(316);
            for (k = 0; k < t.length; k++)
                t[k] = 0;
            d(5);
            p = 257 + e(5);
            f(5);
            d(5);
            r = 1 + e(5);
            f(5);
            d(4);
            k = 4 + e(4);
            f(4);
            if (286 < p || 30 < r)
                return -1;
            for (m = 0; m < k; m++)
                d(3),
                t[Q[m]] = e(3),
                f(3);
            for (; 19 > m; m++)
                t[Q[m]] = 0;
            H = 7;
            m = new c(t,19,19,null,null,H);
            if (0 != m.status)
                return -1;
            F = m.root;
            H = m.Sh;
            q = p + r;
            for (k = l = 0; k < q; )
                if (d(H),
                n = F.list[e(H)],
                m = n.Lf,
                f(m),
                m = n.n,
                16 > m)
                    t[k++] = l = m;
                else if (16 == m) {
                    d(2);
                    m = 3 + e(2);
                    f(2);
                    if (k + m > q)
                        return -1;
                    for (; 0 < m--; )
                        t[k++] = l
                } else {
                    17 == m ? (d(3),
                    m = 3 + e(3),
                    f(3)) : (d(7),
                    m = 11 + e(7),
                    f(7));
                    if (k + m > q)
                        return -1;
                    for (; 0 < m--; )
                        t[k++] = 0;
                    l = 0
                }
            H = 9;
            m = new c(t,p,257,M,N,H);
            0 == H && (m.status = 1);
            if (0 != m.status)
                return -1;
            F = m.root;
            H = m.Sh;
            for (k = 0; k < r; k++)
                t[k] = t[k + p];
            I = 6;
            m = new c(t,r,0,O,P,I);
            J = m.root;
            I = m.Sh;
            return 0 == I && 257 < p || 0 != m.status ? -1 : g(a, b, h)
        }
        function l(a, b) {
            var k, l;
            for (k = 0; k < b && (!E || -1 != v); ) {
                if (0 < B) {
                    if (0 != v)
                        for (; 0 < B && k < b; )
                            B--,
                            A &= 32767,
                            t &= 32767,
                            a[0 + k++] = r[t++] = r[A++];
                    else {
                        for (; 0 < B && k < b; )
                            B--,
                            t &= 32767,
                            d(8),
                            a[0 + k++] = r[t++] = e(8),
                            f(8);
                        0 == B && (v = -1)
                    }
                    if (k == b)
                        break
                }
                if (-1 == v) {
                    if (E)
                        break;
                    d(1);
                    0 != e(1) && (E = !0);
                    f(1);
                    d(2);
                    v = e(2);
                    f(2);
                    F = null;
                    B = 0
                }
                switch (v) {
                case 0:
                    var q = a
                      , n = 0 + k
                      , C = b - k;
                    l = D & 7;
                    f(l);
                    d(16);
                    l = e(16);
                    f(16);
                    d(16);
                    if (l != (~z & 65535))
                        l = -1;
                    else {
                        f(16);
                        B = l;
                        for (l = 0; 0 < B && l < C; )
                            B--,
                            t &= 32767,
                            d(8),
                            q[n + l++] = r[t++] = e(8),
                            f(8);
                        0 == B && (v = -1)
                    }
                    break;
                case 1:
                    if (null != F)
                        l = g(a, 0 + k, b - k);
                    else
                        a: {
                            var G;
                            l = a;
                            q = 0 + k;
                            n = b - k;
                            if (null == m) {
                                C = Array(288);
                                for (G = 0; 144 > G; G++)
                                    C[G] = 8;
                                for (; 256 > G; G++)
                                    C[G] = 9;
                                for (; 280 > G; G++)
                                    C[G] = 7;
                                for (; 288 > G; G++)
                                    C[G] = 8;
                                w = 7;
                                G = new c(C,288,257,M,N,w);
                                if (0 != G.status) {
                                    alert("HufBuild error: " + G.status);
                                    l = -1;
                                    break a
                                }
                                m = G.root;
                                w = G.Sh;
                                for (G = 0; 30 > G; G++)
                                    C[G] = 5;
                                p = 5;
                                G = new c(C,30,0,O,P,p);
                                if (1 < G.status) {
                                    m = null;
                                    alert("HufBuild error: " + G.status);
                                    l = -1;
                                    break a
                                }
                                u = G.root;
                                p = G.Sh
                            }
                            F = m;
                            J = u;
                            H = w;
                            I = p;
                            l = g(l, q, n)
                        }
                    break;
                case 2:
                    l = null != F ? g(a, 0 + k, b - k) : h(a, 0 + k, b - k);
                    break;
                default:
                    l = -1
                }
                if (-1 == l)
                    return E ? 0 : -1;
                k += l
            }
            return k
        }
        function n(a) {
            var b, c, d;
            null == r && (r = Array(65536));
            D = z = t = 0;
            v = -1;
            E = !1;
            B = A = 0;
            F = null;
            G = a;
            K = 0;
            b = Array(1024);
            for (a = ""; 0 < (c = l(b, b.length)); )
                for (d = 0; d < c; d++)
                    a += String.fromCharCode(b[d]);
            G = null;
            return a
        }
        var p, r, t, m = null, u, w, z, D, v, E, B, A, F, J, H, I, G, K, L = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535], M = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99], O = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], P = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], Q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        k.Nf.DEFLATE ? k.Nf.DEFLATE.zx = n : k.Nf.DEFLATE = {
            Hr: "\b\x00",
            zx: n
        }
    }
    )();
    (function() {
        function a(a) {
            var b = "", c, d;
            for (d = 0; d < (a || "").length; d++)
                c = a.charCodeAt(d),
                b += "\\x" + (16 > c ? "0" : "") + c.toString(16).toUpperCase();
            return b
        }
        function b(a) {
            this.stream = "";
            k.wl.Ys && a instanceof Uint8Array ? this.stream = k.kh.Xs(a) : k.wl.Wy && a instanceof ArrayBuffer ? (a = new Uint8Array(a),
            this.stream = k.kh.Xs(a)) : this.stream = k.kh.yD(a);
            this.index = 0
        }
        function c(a, b) {
            this.options = a;
            this.Pv = b
        }
        function d(a, b) {
            this.files = [];
            this.Pv = b;
            a && this.load(a)
        }
        b.prototype = {
            qz: function(a) {
                this.pz(this.index + a)
            },
            pz: function(a) {
                if (this.stream.length < a || 0 > a)
                    throw Error("End of stream reached (stream length = " + this.stream.length + ", asked index = " + a + "). Corrupted zip ?");
            },
            Ym: function(a) {
                this.pz(a);
                this.index = a
            },
            qD: function(a) {
                this.Ym(this.index + a)
            },
            OH: function(a) {
                return this.stream.charCodeAt(a)
            },
            Ia: function(a) {
                var b = 0, c;
                this.qz(a);
                for (c = this.index + a - 1; c >= this.index; c--)
                    b = (b << 8) + this.OH(c);
                this.index += a;
                return b
            },
            vf: function(a) {
                this.qz(a);
                var b = this.stream.slice(this.index, this.index + a);
                this.index += a;
                return b
            },
            oL: function() {
                var a = this.Ia(4);
                return new Date((a >> 25 & 127) + 1980,(a >> 21 & 15) - 1,a >> 16 & 31,a >> 11 & 31,a >> 5 & 63,(a & 31) << 1)
            }
        };
        c.prototype = {
            OJ: function() {
                return 1 === (this.gz & 1)
            },
            oM: function() {
                return 2048 === (this.gz & 2048)
            },
            sL: function(b) {
                var c, d;
                b.qD(22);
                this.cv = b.Ia(2);
                d = b.Ia(2);
                this.fileName = b.vf(this.cv);
                b.qD(d);
                if (-1 == this.Gq || -1 == this.$s)
                    throw Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
                this.ZH = b.vf(this.Gq);
                a: {
                    b = this.uz;
                    for (c in k.Nf)
                        if (k.Nf.hasOwnProperty(c) && k.Nf[c].Hr === b) {
                            c = k.Nf[c];
                            break a
                        }
                    c = null
                }
                if (null === c)
                    throw Error("Corrupted zip : compression " + a(this.uz) + " unknown (inner file : " + this.fileName + ")");
                this.Ax = c.zx(this.ZH);
                if (this.Ax.length !== this.$s)
                    throw Error("Bug : uncompressed data size mismatch");
                if (this.Pv.PQ && k.prototype.Iq(this.Ax) !== this.Iq)
                    throw Error("Corrupted zip : CRC32 mismatch");
            },
            nL: function(a) {
                a.vf(2);
                a.Ia(2);
                this.gz = a.Ia(2);
                this.uz = a.vf(2);
                this.Of = a.oL();
                this.Iq = a.Ia(4);
                this.Gq = a.Ia(4);
                this.$s = a.Ia(4);
                this.cv = a.Ia(2);
                this.VI = a.Ia(2);
                this.YI = a.Ia(2);
                this.Qz = a.Ia(2);
                a.Ia(2);
                this.UI = a.Ia(4);
                this.Rv = a.Ia(4);
                if (this.OJ())
                    throw Error("Encrypted zip are not supported");
                this.fileName = a.vf(this.cv);
                this.qL(a);
                this.RK(a);
                this.fA = a.vf(this.YI);
                this.dir = this.UI & 16 ? !0 : !1
            },
            RK: function() {
                if (this.Sq[1]) {
                    var a = new b(this.Sq[1].value);
                    -1 === this.$s && (this.$s = a.Ia(8));
                    -1 === this.Gq && (this.Gq = a.Ia(8));
                    -1 === this.Rv && (this.Rv = a.Ia(8));
                    -1 === this.Qz && (this.Qz = a.Ia(4))
                }
            },
            qL: function(a) {
                var b = a.index, c, d, e;
                for (this.Sq = this.Sq || {}; a.index < b + this.VI; )
                    c = a.Ia(2),
                    d = a.Ia(2),
                    e = a.vf(d),
                    this.Sq[c] = {
                        id: c,
                        length: d,
                        value: e
                    }
            },
            xJ: function() {
                this.oM() && (this.fileName = k.prototype.HD(this.fileName),
                this.fA = k.prototype.HD(this.fA))
            }
        };
        d.prototype = {
            Cq: function(b) {
                var c = this.Za.vf(4);
                if (c !== b)
                    throw Error("Corrupted zip or bug : unexpected signature (" + a(c) + ", expected " + a(b) + ")");
            },
            iL: function() {
                this.Pz = this.Za.Ia(2);
                this.Rz = this.Za.Ia(2);
                this.lz = this.Za.Ia(2);
                this.kz = this.Za.Ia(2);
                this.mz = this.Za.Ia(4);
                this.Eu = this.Za.Ia(4);
                this.sM = this.Za.Ia(2);
                this.Za.vf(this.sM)
            },
            jL: function() {
                this.qM = this.Za.Ia(8);
                this.Za.vf(2);
                this.Za.Ia(2);
                this.Pz = this.Za.Ia(4);
                this.Rz = this.Za.Ia(4);
                this.lz = this.Za.Ia(8);
                this.kz = this.Za.Ia(8);
                this.mz = this.Za.Ia(8);
                this.Eu = this.Za.Ia(8);
                this.rM = {};
                for (var a = this.qM - 44, b, c, d; 0 < a; )
                    b = this.Za.Ia(2),
                    c = this.Za.Ia(4),
                    d = this.Za.vf(c),
                    this.rM[b] = {
                        id: b,
                        length: c,
                        value: d
                    }
            },
            kL: function() {
                this.Za.Ia(4);
                this.vL = this.Za.Ia(8);
                this.xI = this.Za.Ia(4);
                if (1 < this.xI)
                    throw Error("Multi-volumes zip are not supported");
            },
            rL: function() {
                var a, b;
                for (a = 0; a < this.files.length; a++)
                    b = this.files[a],
                    this.Za.Ym(b.Rv),
                    this.Cq(k.eh.ny),
                    b.sL(this.Za),
                    b.xJ()
            },
            mL: function() {
                var a;
                for (this.Za.Ym(this.Eu); this.Za.vf(4) === k.eh.Qx; )
                    a = new c({
                        LD: this.LD
                    },this.Pv),
                    a.nL(this.Za),
                    this.files.push(a)
            },
            pL: function() {
                var a = this.Za.stream.lastIndexOf(k.eh.mt);
                if (-1 === a)
                    throw Error("Corrupted zip : can't find end of central directory");
                this.Za.Ym(a);
                this.Cq(k.eh.mt);
                this.iL();
                if (65535 === this.Pz || 65535 === this.Rz || 65535 === this.lz || 65535 === this.kz || -1 === this.mz || -1 === this.Eu) {
                    this.LD = !0;
                    a = this.Za.stream.lastIndexOf(k.eh.Ry);
                    if (-1 === a)
                        throw Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                    this.Za.Ym(a);
                    this.Cq(k.eh.Ry);
                    this.kL();
                    this.Za.Ym(this.vL);
                    this.Cq(k.eh.lH);
                    this.jL()
                }
            },
            load: function(a) {
                this.Za = new b(a);
                this.pL();
                this.mL();
                this.rL()
            }
        };
        k.prototype.load = function(a, b) {
            var c, e, f;
            b = b || {};
            b.Eh && (a = qb.decode(a));
            c = (new d(a,b)).files;
            for (e = 0; e < c.length; e++)
                f = c[e],
                this.file(f.fileName, f.Ax, {
                    Qi: !0,
                    lC: !0,
                    Of: f.Of,
                    dir: f.dir
                });
            return this
        }
    }
    )();
    var Be = document.getElementsByTagName("script")
      , Ce = Be[Be.length - 1].src;
    document.mS = Ce.substring(0, Ce.lastIndexOf("/") + 1);
    ka.Runtime = be;
    ka.headerLoaded = ce;
    ka.jM = "updateApplication";
    ka[window.jM] = Za;
    Fa.prototype = {
        Ab: function(a, b, c) {
            if (this.visible) {
                this.rg && (a.Oa.save(),
                a.Oa.translate(this.sp, this.up),
                0 != this.angle && a.Oa.rotate(.0174532925 * -this.angle),
                a.Oa.scale(Math.max(.001, this.pc), Math.max(.001, this.qc)),
                a.Oa.translate(-this.Ja, -this.Fa));
                var d;
                for (d = 0; d < this.children.length; d++)
                    this.children[d].Ab(a, b + this.x, c + this.y);
                this.rg && a.Oa.restore()
            }
        },
        me: function(a) {
            this.children.push(a)
        },
        uq: function(a, b) {
            b >= this.children.length ? this.children.push(a) : (0 > b && (b = 0),
            this.children.splice(b, 0, a))
        },
        wL: function() {
            this.children.length = 0
        },
        removeChild: function(a) {
            var b;
            for (b = 0; b < this.children.length; b++)
                if (this.children[b] == a)
                    return this.children.splice(b, 1),
                    b;
            return -1
        },
        dd: function(a) {
            var b;
            for (b = 0; b < this.children.length; b++)
                if (this.children[b] == a)
                    return b;
            return -1
        },
        Td: function(a, b) {
            var c, d = null;
            for (c = 0; c < this.children.length; c++)
                if (this.children[c] == a) {
                    d = this.children[c];
                    break
                }
            null != d && (this.children.splice(c, 1),
            b > c && b--,
            0 > b && (b = 0),
            b >= this.children.length ? this.children.push(a) : this.children.splice(b, 0, a))
        }
    };
    sa.Ap = 0;
    sa.Be = 1;
    sa.qE = 1;
    sa.rE = 2;
    sa.hn = 64;
    sa.jn = 16;
    sa.Dl = 6;
    K.WP = 0;
    K.XP = 1;
    K.Tj = 0;
    K.Uj = 1;
    K.Gv = [65535, 32767, 16383, 8191, 4095, 2047, 1023, 511, 255, 127, 63, 31, 15, 7, 3, 1];
    K.Rw = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
    K.gh = new J;
    K.Gj = new J;
    K.Rl = new J;
    K.Ri = new J;
    K.prototype = {
        Nu: function(a, b, c) {
            var d, e;
            this.width = b.width;
            this.height = b.height;
            this.Ja = b.Ja;
            this.Fa = b.Fa;
            var f = Math.floor((this.width + 15 & 4294967280) / 16);
            this.lineWidth = f;
            e = f * this.height + 1;
            if ("undefined" != typeof ArrayBuffer)
                this.P = new Uint16Array(new ArrayBuffer(2 * e));
            else
                for (this.P = Array(e),
                d = 0; d < e; d++)
                    this.P[d] = 0;
            d = document.createElement("canvas");
            d.width = b.width;
            d.height = b.height;
            d = d.getContext("2d");
            0 == b.tb ? d.drawImage(b.sb, 0, 0) : d.drawImage(a.ba.Lb[b.tb], b.vd, b.wd, b.width, b.height, 0, 0, b.width, b.height);
            a = d.getImageData(0, 0, this.width, this.height);
            if (0 == (c & K.Uj))
                for (c = 0; c < this.height; c++) {
                    e = c * b.width * 4 + 3;
                    var g = c * f
                      , h = 32768;
                    for (d = 0; d < this.width; d++)
                        0 != a.data[e] && (this.P[g] |= h),
                        e += 4,
                        h >>>= 1,
                        0 == h && (h = 32768,
                        g++)
                }
            else
                for (d = 0; d < this.width; d++) {
                    for (c = 0; c < this.height && 0 == a.data[4 * (c * b.width + d) + 3]; c++)
                        ;
                    if (c < this.height)
                        for (g = Math.min(this.height, c + sa.Dl),
                        h = 32768 >> (d & 15); c < g; c++)
                            0 != a.data[4 * (c * b.width + d) + 3] && (e = Math.floor(c * f + (d & 4294967280) / 16),
                            this.P[e] |= h)
                }
        },
        Ou: function(a, b, c) {
            var d;
            this.width = b.width;
            this.height = b.height;
            this.Ja = b.Ja;
            this.Fa = b.Fa;
            this.lineWidth = a = Math.floor((this.width + 15 & 4294967280) / 16);
            b = a * this.height + 1;
            this.P = "undefined" != typeof ArrayBuffer ? new Uint16Array(new ArrayBuffer(2 * b)) : Array(b);
            b = this.height;
            0 != (c & K.Uj) && b > sa.Dl && (b = sa.Dl);
            var e = a
              , f = 0;
            0 != (this.width & 15) && (f = 65535 << 16 - (this.width & 15) & 65535,
            e--);
            for (d = 0; d < b; d++) {
                var g = d * a;
                for (c = 0; c < e; c++)
                    this.P[g++] = 65535;
                0 != f && (this.P[g] = f)
            }
        },
        BL: function(a, b, c) {
            var d, e, f;
            90 == c ? (c = 0,
            f = 1) : 180 == c ? (c = -1,
            f = 0) : 270 == c ? (c = 0,
            f = -1) : (f = c * Math.PI / 180,
            c = Math.cos(f),
            f = Math.sin(f));
            var g, h;
            null == b ? (e = h = 0,
            K.gh.x = K.gh.y = 0) : (g = -b.x * c,
            d = -b.x * f,
            e = -b.y * c,
            h = -b.y * f,
            K.gh.x = Math.floor(g + h),
            K.gh.y = Math.floor(e - d));
            d = null == b ? a.right : a.right - b.x;
            g = d * c;
            d *= f;
            K.Gj.x = Math.floor(g + h);
            K.Gj.y = Math.floor(e - d);
            e = null == b ? a.bottom : a.bottom - b.y;
            K.Ri.x = Math.floor(g + e * f);
            K.Ri.y = Math.floor(e * c - d);
            K.Rl.x = K.gh.x + K.Ri.x - K.Gj.x;
            K.Rl.y = K.gh.y + K.Ri.y - K.Gj.y;
            c = Math.min(K.gh.x, Math.min(K.Gj.x, Math.min(K.Ri.x, K.Rl.x)));
            f = Math.min(K.gh.y, Math.min(K.Gj.y, Math.min(K.Ri.y, K.Rl.y)));
            g = Math.max(K.gh.x, Math.max(K.Gj.x, Math.max(K.Ri.x, K.Rl.x)));
            d = Math.max(K.gh.y, Math.max(K.Gj.y, Math.max(K.Ri.y, K.Rl.y)));
            null != b && (b.x = -c,
            b.y = -f);
            a.right = g - c;
            a.bottom = d - f
        },
        jI: function(a, b, c, d) {
            var e, f, g = a.width;
            e = a.height;
            var h = new ba;
            h.right = Math.floor(a.width * c);
            h.bottom = Math.floor(a.height * d);
            var k = new J;
            k.x = Math.floor(a.Ja * c);
            k.y = Math.floor(a.Fa * d);
            this.BL(h, k, b);
            var l = h.right
              , h = h.bottom;
            if (0 >= l || 0 >= h)
                return !1;
            var n = a.lineWidth
              , p = (l + 15 & 2147483632) / 16;
            this.P = "undefined" != typeof ArrayBuffer ? new Uint16Array(new ArrayBuffer(2 * (p * h + 1))) : Array(p * h + 1);
            var r;
            for (r = p * h; 0 <= r; r--)
                this.P[r] = 0;
            this.lineWidth = p;
            this.width = l;
            this.height = h;
            this.Ja = k.x;
            this.Fa = k.y;
            b *= .017453292;
            f = Math.cos(b);
            var m = Math.sin(b);
            b = 0;
            k = Math.floor(65536 * (g / 2 - (l / 2 * f - h / 2 * m) / c));
            r = Math.floor(65536 * (e / 2 - (l / 2 * m + h / 2 * f) / d));
            var t = Math.floor(65536 * f / c)
              , u = Math.floor(65536 * m / d)
              , w = l / 16
              , l = l % 16;
            d = Math.floor(65536 * f / d);
            c = Math.floor(65536 * m / c);
            var g = 65536 * g, m = 65536 * e, z, v;
            for (f = 0; f < h; f++) {
                var E = k, B = r, D = b, A;
                for (e = 0; e < w; e++) {
                    var F = 0;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 32768));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 16384));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 8192));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 4096));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 2048));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 1024));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 512));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 256));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 128));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 64));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 32));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 16));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 8));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 4));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 2));
                    E += t;
                    B += u;
                    0 <= E && E < g && 0 <= B && B < m && (A = Math.floor(E / 65536),
                    v = Math.floor(B / 65536),
                    z = 32768 >>> A % 16,
                    v = a.P[Math.floor(v * n + A / 16)],
                    0 != (v & z) && (F |= 1));
                    E += t;
                    B += u;
                    this.P[D++] = F
                }
                if (0 != l) {
                    F = 32768;
                    for (e = A = 0; e < l; e++,
                    F = F >> 1 & 32767) {
                        if (0 <= E && E < g && 0 <= B && B < m) {
                            v = Math.floor(E / 65536);
                            var G = Math.floor(B / 65536);
                            z = 32768 >>> v % 16;
                            v = a.P[Math.floor(G * n + v / 16)];
                            0 != (v & z) && (A |= F)
                        }
                        E += t;
                        B += u
                    }
                    this.P[D] = A
                }
                b += p;
                k -= c;
                r += d
            }
            return !0
        },
        Fj: function(a, b, c, d, e, f, g) {
            var h, k, l;
            a <= e ? (h = this,
            l = Math.floor(c),
            c = Math.floor(g),
            k = Math.floor(a),
            g = Math.floor(b),
            a = Math.floor(e),
            b = Math.floor(f)) : (h = d,
            d = this,
            l = Math.floor(g),
            c = Math.floor(c),
            k = Math.floor(e),
            g = Math.floor(f),
            a = Math.floor(a),
            b = Math.floor(b));
            f = h.height;
            var n = 0;
            0 != l && (f = l,
            g += h.height - l,
            n = h.height - l);
            e = d.height;
            var p = 0;
            0 != c && (e = c,
            b += d.height - c,
            p = d.height - c);
            if (k >= a + d.width || k + h.width <= a || g >= b + e || g + f < b)
                return !1;
            c = a - k;
            l = Math.floor(c / 16);
            c %= 16;
            k = Math.min(k + h.width - a, d.width);
            k = Math.floor((k + 15) / 16);
            g <= b ? (a = b - g + n,
            n = p,
            g = Math.min(g + f, b + e) - b) : (a = n,
            n = g - b + p,
            g = Math.min(g + f, b + e) - g);
            b = a * h.lineWidth;
            e = n * d.lineWidth;
            if (0 != c)
                switch (k) {
                case 1:
                    for (a = 0; a < g; a++) {
                        n = h.P[b + l] << c;
                        if (0 != (n & d.P[e]) || l + 1 < h.lineWidth && (n = h.P[b + l + 1] << c,
                        n >>>= 16,
                        0 != (n & d.P[e])))
                            return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
                    break;
                case 2:
                    for (a = 0; a < g; a++) {
                        n = h.P[b + l] << c;
                        if (0 != (n & d.P[e]))
                            return !0;
                        n = h.P[b + l + 1] << c;
                        p = n >>> 16;
                        if (0 != (p & d.P[e]) || 0 != (n & d.P[e + 1]) || l + 2 < h.lineWidth && (n = h.P[b + l + 2] << c,
                        n >>>= 16,
                        0 != (n & d.P[e + 1])))
                            return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
                    break;
                default:
                    for (a = 0; a < g; a++) {
                        n = h.P[b + l] << c;
                        if (0 != (n & d.P[e]))
                            return !0;
                        for (f = 0; f < k - 1; f++)
                            if (n = h.P[b + l + f + 1] << c,
                            p = n >>> 16,
                            0 != (p & d.P[e + f]) || 0 != (n & d.P[e + f + 1]))
                                return !0;
                        if (l + f + 1 < h.lineWidth && (n = h.P[b + l + f + 1] << c,
                        n >>>= 16,
                        0 != (n & d.P[e + f])))
                            return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
                }
            else
                for (a = 0; a < g; a++) {
                    for (f = 0; f < k; f++)
                        if (n = h.P[b + l + f],
                        0 != (d.P[e + f] & n))
                            return !0;
                    b += h.lineWidth;
                    e += d.lineWidth
                }
            return !1
        },
        vx: function(a, b, c, d, e, f, g, h) {
            a = Math.floor(a);
            b = Math.floor(b);
            d = Math.floor(d);
            e = Math.floor(e);
            var k = 0
              , l = this.height;
            0 < c && (k = this.height - c,
            b += k,
            l = c);
            c = g;
            0 < h && (e += g - h,
            c = h);
            if (a >= d + f || a + this.width <= d || b >= e + c || b + l < e)
                return !1;
            a <= d ? (g = d - a,
            a = Math.min(this.width - g, f)) : (g = 0,
            a = Math.min(d + f - a, this.width));
            b <= e ? (k = e - b + k,
            b = Math.min(b + l, e + c) - e) : b = Math.min(b + l, e + c) - b;
            e = Math.floor(g / 8);
            l = Math.floor((g + a + 15) / 16) - Math.floor(g / 16);
            for (f = 0; f < b; f++)
                switch (d = (f + k) * this.lineWidth,
                l) {
                case 1:
                    c = K.Gv[g & 15] & K.Rw[(g + a - 1 & 15) + 1];
                    if (0 != (this.P[d + e] & c))
                        return !0;
                    break;
                case 2:
                    c = K.Gv[g & 15];
                    if (0 != (this.P[d + e] & c))
                        return !0;
                    c = K.Rw[(g + a - 1 & 15) + 1];
                    if (0 != (this.P[d + e + 1] & c))
                        return !0;
                    break;
                default:
                    c = K.Gv[g & 15];
                    if (0 != (this.P[d + e] & c))
                        return !0;
                    for (h = 1; h < l - 1; h++)
                        if (0 != this.P[d + e + h])
                            return !0;
                    c = K.Rw[(g + a - 1 & 15) + 1];
                    if (0 != (this.P[d + e + h] & c))
                        return !0
                }
            return !1
        },
        AD: function(a, b, c, d, e) {
            a = Math.floor(a);
            b = Math.floor(b);
            var f = a
              , g = b;
            if (0 == c) {
                if (1 != d || 1 != e)
                    f = Math.floor(f / d),
                    g = Math.floor(g / e)
            } else if (f = 3.141592653589 * c / 180,
            c = Math.cos(f),
            g = Math.sin(f),
            f = a * c - b * g,
            g = b * c + a * g,
            1 != d || 1 != e)
                f /= d,
                g /= e;
            f += this.Ja;
            g += this.Fa;
            a = Math.floor(f);
            b = Math.floor(g);
            return 0 > a || a >= this.width || 0 > b || b >= this.height ? !1 : 0 != (this.P[b * this.lineWidth + Math.floor(a / 16)] & 32768 >>> (a & 15)) ? !0 : !1
        }
    };
    A.Ah = 1;
    A.VG = 2;
    A.du = 4;
    A.WG = 16;
    A.Bh = 32;
    A.ck = 64;
    A.Gi = 128;
    A.$P = 0;
    A.ZP = 1;
    A.QM = 0;
    A.Ue = 1;
    A.SM = 2;
    A.iE = 3;
    A.MM = 4;
    A.VM = 5;
    A.PM = 6;
    A.RM = 7;
    A.NM = 8;
    A.gE = 9;
    A.UM = 10;
    A.WM = 11;
    A.OM = 12;
    A.hE = 13;
    A.TM = 13;
    A.kt = 4095;
    A.yp = 4096;
    A.Kx = 8192;
    A.prototype = {
        DJ: function(a, b, c) {
            this.a = a;
            this.Wm = c.sz;
            this.Ls = c.tz;
            this.Y = 0;
            this.Y |= A.ck;
            0 == (this.a.df & Q.Vd) && (this.Y &= ~A.ck);
            0 != (this.a.Wb.Xk & D.vn) && (this.Y |= A.Gi);
            0 != (c.Fq & l.gn) ? (this.Y |= A.Ah,
            this.a.Ha == u.zh && (this.a.X |= M.rh,
            this.Y &= ~A.ck)) : this.Y |= A.Bh;
            this.Qb = this.a.Wb.gC;
            this.Rb = this.a.Wb.fC;
            this.a.b.Ec == V.zG && (this.Y |= A.VG)
        },
        xv: function(a) {
            this.kI(a);
            a && this.a.S.um && (this.a.X |= M.Ai)
        },
        handle: function() {
            var a = this.a.c, b, c, d, e;
            0 != (this.a.X & M.Ai) ? (this.bh || this.Vl(!1),
            this.UK()) : 0 != (this.a.X & M.Bi) ? this.VK() : 0 == (this.Y & A.du) ? (0 != this.Hs && (this.Is -= a.Zo,
            0 > this.Is && (this.Is = this.Hs,
            0 == (this.Y & A.Bh) ? (this.Y |= A.Bh,
            this.iw()) : (this.Y &= ~A.Bh,
            this.Rr()))),
            null != this.a.B && this.a.B.move(),
            0 == this.a.b.mi && (0 != (this.a.sa & D.ak) ? 0 == (this.a.sa & D.Iy) && 0 != (a.h.Ma & n.$D) && (b = this.a.v - this.a.oa,
            c = this.a.u - this.a.pa,
            d = b + this.a.L,
            e = c + this.a.K,
            (d < a.Nm || b > a.Lm || e < a.Rm || c > a.Pm) && a.vg(this.a.bc)) : (b = this.a.v - this.a.oa,
            c = this.a.u - this.a.pa,
            d = b + this.a.L,
            e = c + this.a.K,
            d >= a.Mm && b <= a.Km && e >= a.Qm && c <= a.Om || (d >= a.Nm && b <= a.Lm && e >= a.Rm && c <= a.Pm ? (this.Y |= A.du,
            this.Ls = this.a.Ti()) : 0 == (this.a.sa & D.Iy) && a.vg(this.a.bc))))) : (b = this.a.v - this.a.oa,
            c = this.a.u - this.a.pa,
            d = b + this.a.L,
            e = c + this.a.K,
            d >= a.Mm && b <= a.Km && e >= a.Qm && c <= a.Om && (this.Y &= ~A.du,
            this.xv(!1),
            this.a.Td(this.Ls)))
        },
        kI: function() {
            0 != (this.a.sa & D.$j) ? this.a.mu(this.a.v - this.a.c.ha, this.a.u - this.a.c.la, this.a.b.Ta, this.Wm, 0 == (this.Y & A.Ah)) : (this.a.X |= M.VF,
            this.a.Ql(this.a.v - this.a.c.ha, this.a.u - this.a.c.la, this.Wm, 0 != (this.a.sa & D.au), 0 == (this.Y & A.Ah), -1));
            this.a.$C(this.Qb, this.Rb)
        },
        Vl: function(a) {
            this.a.X &= ~(M.Ai | M.Bi);
            if (0 == a) {
                if (!this.a.S.um)
                    return !1;
                this.a.X |= M.Ai
            } else {
                if (!this.a.S.Do)
                    return !1;
                this.a.X |= M.Bi
            }
            this.bh = this.a.c.h.nv().$L(this.a, a);
            return this.bh ? !0 : (this.a.X &= ~(M.Ai | M.Bi),
            !1)
        },
        UK: function() {
            if (0 != (this.a.X & M.Ai)) {
                if (this.bh.mr())
                    return this.a.X &= ~M.Ai,
                    this.bh = this.a.yl = null,
                    !1;
                this.bh.Tb(w.gu);
                return !0
            }
            return !1
        },
        VK: function() {
            if (0 != (this.a.X & M.Bi)) {
                if (this.bh.mr())
                    return this.yl = this.bh = null,
                    this.a.c.vg(this.a.bc),
                    !1;
                this.bh.Tb(w.sq);
                return !0
            }
            return !1
        },
        EJ: function() {
            return this.Vl(!0) ? (this.a.X |= M.rh,
            !0) : !1
        },
        Db: function() {
            this.Ls = this.a.Ti()
        },
        Rr: function() {
            0 == (this.Y & A.Ah) && (this.Y |= A.Ah,
            this.a.b.N = !0,
            this.a.Ik())
        },
        iw: function() {
            0 != (this.Y & A.Ah) && (this.a.c.A.Xa[this.a.de].Ma & (X.Jp | X.wt)) == X.wt && (this.Y &= ~A.Ah,
            this.a.X &= ~M.rh,
            this.a.b.N = !0,
            this.a.vl())
        },
        Ms: function(a) {
            this.Y = a ? this.Y | A.ck : this.Y & ~A.ck
        },
        zK: function(a, b) {
            this.Qb = a;
            this.Rb = b
        }
    };
    de.prototype = {
        load: function(a) {
            this.qm = a.o();
            this.$a = Array(this.qm);
            var b;
            for (b = 0; b < this.qm; b++)
                this.$a[b] = a.Nb()
        }
    };
    ee.prototype = {
        load: function(a, b) {
            this.rm = a.o();
            this.values = Array(this.rm);
            var c;
            for (c = 0; c < this.rm; c++)
                this.values[c] = a.s();
            b && (this.Na = a.s())
        }
    };
    Na.kH = 26;
    Na.YG = 10;
    Na.prototype = {
        $: function(a, b) {
            this.Sd = 0;
            var c = Na.kH;
            null != b.$h && b.$h.rm > c && (c = b.$h.rm);
            this.Pa = Array(c);
            c = Na.YG;
            null != b.hj && b.hj.qm > c && (c = b.hj.qm);
            this.Rd = Array(c);
            for (c = 0; c < this.Pa.length; c++)
                this.Pa[c] = 0;
            for (c = 0; c < this.Rd.length; c++)
                this.Rd[c] = "";
            if (null != b.$h)
                for (this.Sd = b.$h.Na,
                c = 0; c < b.$h.rm; c++)
                    this.Pa[c] = b.$h.values[c];
            if (null != b.hj)
                for (c = 0; c < b.hj.qm; c++)
                    this.Rd[c] = b.hj.$a[c]
        },
        Db: function() {
            var a;
            for (a = 0; a < this.Pa.length; a++)
                this.Pa[a] = 0;
            for (a = 0; a < this.Rd.length; a++)
                this.Rd[a] = null
        },
        Hk: function(a) {
            return a < this.Pa.length ? this.Pa[a] : 0
        },
        CA: function(a) {
            return a < this.Rd.length ? this.Rd[a] : ""
        },
        hD: function(a, b) {
            a >= this.J.Pa.length && this.Wi(a + 10);
            this.Pa[a] = b
        },
        Wi: function(a) {
            if (a > this.Pa.length) {
                var b;
                for (b = this.Pa.length; b < a; b++)
                    this.Pa[b] = 0
            }
        },
        uJ: function(a) {
            if (a > this.Rd.length) {
                var b;
                for (b = this.Rd.length; b < a; b++)
                    this.Rd[b] = ""
            }
        }
    };
    Sa.ng = 32;
    Sa.prototype = {
        hI: function() {
            this.Ak = Array(5);
            this.Qr = Array(5);
            var a;
            for (a = 0; 5 > a; a++)
                this.Ak[a] = null,
                this.Qr[a] = 0;
            a = new mb;
            a.handle = 1;
            this.Uy(a);
            a = new mb;
            a.handle = 3;
            this.Uy(a)
        },
        Uy: function(a) {
            var b = a.vr();
            null != b && (this.Ak[a.handle] = a,
            this.Qr[a.handle] = b.Yn())
        },
        vr: function(a) {
            a -= Sa.ng;
            var b = null;
            a < this.Ak.length && null != this.Ak[a] && (b = this.Ak[a].vr());
            return b
        },
        Yn: function(a) {
            a -= Sa.ng;
            return a < this.Ak.length ? this.Qr[a] : 0
        }
    };
    mb.prototype = {
        vr: function() {
            switch (this.handle) {
            case 1:
                return new Oa;
            case 3:
                return new F
            }
            return null
        }
    };
    Ca.PP = 1;
    Ca.My = 2;
    Ca.prototype = {
        $: function(a) {
            this.R = a;
            this.O = a.c
        },
        Yn: function() {
            return 0
        },
        Pu: function() {
            return !1
        },
        rv: function() {
            return Ca.My
        },
        Su: function() {},
        zz: function() {},
        SK: function() {},
        dI: function() {},
        Gn: function() {
            return !1
        },
        action: function() {},
        Qn: function() {
            return null
        },
        AA: function() {
            return null
        },
        cD: function() {},
        Mi: function() {},
        am: function() {}
    };
    fe.prototype = {
        evaluate: function(a) {
            var b = a.i.Nh(this.ub);
            if (null == b)
                a.va[a.da] = 0;
            else {
                var c = (this.code >> 16) - G.Ce;
                a.Qu = this;
                a.va[a.da] = b.Qn(c)
            }
        }
    };
    ge.prototype = {
        Ga: function(a) {
            var b = a.i.$b(this);
            if (null != b) {
                var c = (this.aa >>> 16) - G.Ce;
                a.Qu = this;
                b.action(c, this)
            }
        },
        mv: function(a, b) {
            return a.i.tJ(this.w[b].ub, this)
        },
        cm: function(a, b) {
            return a.ab(this.w[b])
        },
        Cb: function(a, b) {
            return a.dm(this.w[b])
        },
        oJ: function(a, b) {
            return a.cf(this.w[b])
        }
    };
    he.prototype = {
        fb: function(a, b) {
            if (null == b)
                return this.ja(a);
            b.X |= M.Ft;
            var c = -(this.aa >> 16) - G.Ce - 1;
            a.Qu = this;
            return b.Gn(c, this) ? (a.i.$l(b),
            !0) : !1
        },
        ja: function(a) {
            var b = a.i.$e(this.jb)
              , c = a.i.Ee
              , d = -(this.aa >> 16) - G.Ce - 1;
            for (a.Qu = this; null != b; )
                b.X &= ~M.Ft,
                b.Gn(d, this) ? 0 != (this.Gd & U.Sj) && (c--,
                a.i.Vc()) : 0 == (this.Gd & U.Sj) && (c--,
                a.i.Vc()),
                b = a.i.pe();
            return 0 != c ? !0 : !1
        },
        mv: function(a, b) {
            return this.w[b]
        },
        cm: function(a, b) {
            return a.ab(this.w[b])
        },
        Cb: function(a, b) {
            return a.dm(this.w[b])
        }
    };
    (function() {
        this.element = null;
        this.wz = !1
    }
    ).prototype = p.extend(new Ca, {
        am: function() {
            this.setPosition(this.R.v, this.R.u)
        },
        Mi: function() {
            this.setPosition(this.R.v, this.R.u);
            this.jp(this.R.L, this.R.K)
        },
        fS: function(a, b) {
            this.element = a;
            a.style.position = "absolute";
            this.jp(this.R.L, this.R.K);
            this.setPosition(this.R.v, this.R.u);
            this.fv && this.ul(this.fv);
            this.vu = this.R.za = b;
            this.O.h.Fg ? (a.style.visibility = "hidden",
            this.vu = !1) : a.style.visibility = b ? "visible" : "hidden";
            this.O.h.Ku.appendChild(a)
        },
        EA: function() {
            return this.O.h.canvas ? this.O.h.canvas.offsetLeft : 0
        },
        FA: function() {
            return this.O.h.canvas ? this.O.h.canvas.offsetTop : 0
        },
        iD: function(a) {
            this.Gz = a;
            this.R.iD(a);
            this.element && (this.element.style.left = this.EA() + this.O.h.Jj + (this.R.v - this.R.c.ha) * this.O.h.pc + "px")
        },
        lD: function(a) {
            this.Hz = a;
            this.R.lD(a);
            this.element && (this.element.style.top = this.FA() + this.O.h.Lj + (this.R.u - this.R.c.la) * this.O.h.qc + "px")
        },
        setPosition: function(a, b) {
            this.Gz = a;
            this.Hz = b;
            this.R.setPosition(a, b);
            this.element && (this.element.style.left = this.EA() + this.O.h.Jj + (this.R.v - this.R.c.ha) * this.O.h.pc + "px",
            this.element.style.top = this.FA() + this.O.h.Lj + (this.R.u - this.R.c.la) * this.O.h.qc + "px")
        },
        px: function(a) {
            this.Fz = a;
            this.R.px(a);
            this.element && (this.element.style.width = this.R.L * this.O.h.pc + "px")
        },
        ox: function(a) {
            this.Ez = a;
            this.R.ox(a);
            this.element && !this.wz && (this.element.style.height = this.R.K * this.O.h.qc + "px")
        },
        jp: function(a, b) {
            this.Fz = a;
            this.Ez = b;
            this.R.jp(a, b);
            this.element && (this.element.style.width = this.R.L * this.O.h.pc + "px",
            this.wz || (this.element.style.height = this.R.K * this.O.h.qc + "px"))
        },
        ul: function(a) {
            this.fv = a;
            this.element && (this.element.style.font = a.yg())
        },
        Su: function() {
            this.element && this.O.h.Ku.removeChild(this.element)
        },
        AA: function() {
            return this.fv
        },
        cD: function(a) {
            this.ul(a)
        },
        rv: function() {
            this.O.h.Fg || this.R.za == this.vu || (this.vu = this.R.za,
            this.element && (this.element.style.visibility = this.R.za ? "visible" : "hidden"));
            this.R.v == this.Gz && this.R.u == this.Hz || this.setPosition(this.R.v, this.R.u);
            this.R.L == this.Fz && this.R.K == this.Ez || this.jp(this.R.L, this.R.K);
            return 0
        }
    });
    V.zG = 0;
    V.Yt = 1;
    V.yG = 2;
    V.XO = 3;
    V.WO = 4;
    V.YO = 5;
    V.Zt = 9;
    V.xG = 11;
    V.VO = 12;
    V.wG = 13;
    V.Fi = 14;
    V.prototype = {
        setData: function(a, b, c, d, e) {
            this.so = a;
            this.Tk = b;
            this.TB = c;
            this.SB = d;
            this.Mr = e
        }
    };
    ie.prototype = {
        load: function(a) {
            var b = a.T;
            this.xo = a.s();
            this.fd = Array(this.xo);
            var c;
            for (c = 0; c < this.xo; c++) {
                a.seek(b + 4 + 16 * c);
                var d = a.s()
                  , e = a.s()
                  , f = a.s()
                  , g = a.s();
                a.seek(b + f);
                var f = a.o()
                  , h = a.o()
                  , k = a.vb()
                  , l = a.vb();
                a.xa(2);
                var n = a.s();
                switch (h) {
                case 0:
                    this.fd[c] = new qe;
                    break;
                case 1:
                    this.fd[c] = new le;
                    break;
                case 2:
                    this.fd[c] = new pe;
                    break;
                case 3:
                    this.fd[c] = new ke;
                    break;
                case 4:
                    this.fd[c] = new je;
                    break;
                case 5:
                    this.fd[c] = new me;
                    break;
                case 9:
                    this.fd[c] = new oe;
                    break;
                case 14:
                    this.fd[c] = new re
                }
                this.fd[c].setData(h, f, k, n, l);
                this.fd[c].load(a, g - 12);
                14 == h && (a.seek(b + d),
                d = a.Nb(),
                d = d.substring(0, d.length - 4),
                d = d.toLowerCase(),
                this.fd[c].QL(d, e))
            }
        }
    };
    je.prototype = p.extend(new V, {
        load: function(a) {
            this.oo = a.o();
            this.jB = a.o();
            this.iB = a.o();
            this.lB = a.o();
            this.kB = a.o()
        }
    });
    ke.prototype = p.extend(new V, {
        load: function(a) {
            this.sB = a.o();
            this.pB = a.o();
            this.qB = a.o();
            a.o();
            this.rB = a.s()
        }
    });
    le.prototype = p.extend(new V, {
        load: function(a) {
            this.tB = a.V();
            this.vB = a.V();
            this.uB = a.V();
            this.wB = a.V();
            a.o()
        }
    });
    me.prototype = p.extend(new V, {
        load: function(a) {
            this.nm = a.o();
            this.NB = a.o();
            this.MB = a.o();
            this.fw = a.vb();
            this.PB = a.vb();
            this.RB = a.vb();
            a.xa(1);
            this.bb = Array(this.nm);
            var b, c, d;
            for (b = 0; b < this.nm; b++)
                d = a.T,
                this.bb[b] = new ne,
                a.ua(),
                c = a.ua(),
                this.bb[b].load(a),
                a.seek(d + c)
        }
    });
    ne.prototype = {
        load: function(a) {
            this.oB = a.vb();
            this.Yv = a.vb();
            this.Zv = a.V();
            this.$v = a.V();
            this.Xv = a.V();
            this.bw = a.V();
            this.nB = a.o();
            this.aw = a.o();
            a = a.Nb();
            0 < a.length && (this.se = a)
        }
    };
    oe.prototype = p.extend(new V, {
        load: function(a) {
            this.GB = a.o();
            this.BB = a.o();
            this.CB = a.o();
            this.FB = a.o();
            this.DB = a.o();
            this.EB = a.o()
        }
    });
    pe.prototype = p.extend(new V, {
        load: function(a) {
            this.KB = a.o();
            this.dw = a.o();
            this.ew = a.o();
            this.JB = a.o();
            a.o();
            this.HB = a.o();
            this.IB = a.o()
        }
    });
    qe.prototype = p.extend(new V, {
        load: function() {}
    });
    re.prototype = p.extend(new V, {
        load: function(a) {
            a.xa(14);
            this.data = a.T
        },
        QL: function(a) {
            this.Kg = a;
            if (p.xc(this.Kg, "box2d8directions") || p.xc(this.Kg, "box2dspring") || p.xc(this.Kg, "box2dspaceship") || p.xc(this.Kg, "box2dstatic") || p.xc(this.Kg, "box2dracecar") || p.xc(this.Kg, "box2daxial") || p.xc(this.Kg, "box2dplatform") || p.xc(this.Kg, "box2dbouncingball") || p.xc(this.Kg, "box2dbackground"))
                this.nr = !0
        }
    });
    N.Qj = [256, 251, 236, 212, 181, 142, 97, 49, 0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251];
    N.dk = [0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251, 256, 251, 236, 212, 181, 142, 97, 49];
    N.rH = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 320, 336, 352, 368, 384, 400, 416, 432, 448, 480, 512, 544, 560, 592, 624, 640, 672, 688, 720, 736, 768, 784, 816, 848, 864, 896, 928, 944, 976, 992, 1024, 1120, 1216, 1312, 1440, 1536, 1632, 1728, 1824, 1952, 2048, 2240, 2432, 2688, 2880, 3072, 3264, 3456, 3712, 3904, 4096, 6544, 4914, 5216, 5732, 6144, 6553, 6962, 7366, 7780, 8192, 9836, 11672, 13316, 14960, 16604, 18248, 19892, 21504, 25600, 25600];
    N.hG = [-1, 8, 24, -1, 16, 12, 20, 16, 0, 4, 28, 0, -1, 8, 24, -1];
    N.Al = [2599, 0, 844, 31, 479, 30, 312, 29, 210, 28, 137, 27, 78, 26, 25, 25, 0, 24];
    N.kf = [0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, -4, 0, -8, 0, 0, 0, -2, -2, 2, 2, -4, -4, 4, 4, -8, -8, 8, 8, -4, 4, -8, 8, 0, 0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, 0, 0, 4, 0, 8, 0, 0, -2, 2, 2, -2, -4, 4, 4, -4, -8, 8, 8, -8, 4, 4, 8, 8, 0, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 4, 0, 8, 0, 0, 0, 2, 2, -2, -2, 4, 4, -4, -4, 8, 8, -8, -8, 4, -4, 8, -8, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 0, 0, -4, 0, -8, 0, 0, 2, -2, -2, 2, 4, -4, -4, 4, 8, -8, -8, 8, -4, -4, -8, -8, 0, 0];
    N.sn = 1;
    N.fJ = function(a, b) {
        return a * N.Qj[b] / 256
    }
    ;
    N.gJ = function(a, b) {
        return a * N.dk[b] / 256
    }
    ;
    N.prototype = {
        dj: function(a, b) {
            this.a.c.we++;
            this.gg = this.a.c.we;
            this.a.B.U = !1;
            if (0 == a)
                return this.a.c.$f(this.a),
                !1;
            var c, d, e;
            for (e = 0 != (this.a.c.A.Xb & H.Uc) ? Math.floor(a * this.a.c.Hc * 32) : a << 5; 2048 < e; ) {
                c = 65536 * this.a.v + (this.a.Ag & 65535);
                d = 65536 * this.a.u + (this.a.Bg & 65535);
                c += 2048 * N.Qj[b];
                d += 2048 * N.dk[b];
                this.a.Ag = c & 65535;
                this.a.v = Math.floor(c / 65536);
                this.a.Bg = d & 65535;
                this.a.u = Math.floor(d / 65536);
                if (this.a.c.$f(this.a))
                    return !0;
                if (this.a.B.U)
                    break;
                e -= 2048
            }
            if (!this.a.B.U && (c = 65536 * this.a.v + (this.a.Ag & 65535),
            d = 65536 * this.a.u + (this.a.Bg & 65535),
            c += N.Qj[b] * e,
            d += N.dk[b] * e,
            this.a.Ag = c & 65535,
            this.a.v = Math.floor(c / 65536),
            this.a.Bg = d & 65535,
            this.a.u = Math.floor(d / 65536),
            this.a.c.$f(this.a)))
                return !0;
            this.a.b.N = !0;
            this.a.B.U || (this.a.c.sl = 0);
            return this.a.B.U
        },
        ro: function(a) {
            0 == a.TB && this.stop()
        },
        Bk: function(a) {
            return 100 >= a ? N.rH[a] : a << 8
        },
        to: function(a) {
            if (a)
                this.mB(!1);
            else
                switch (this.a.c.i.Gs & 4294901760) {
                case -786432:
                    a = this.a.v - this.a.oa;
                    var b = this.a.u - this.a.pa
                      , c = this.a.c.dl(a, b, a + this.a.L, b + this.a.K);
                    a = this.a.v;
                    b = this.a.u;
                    0 != (c & l.oh) && (a = this.a.oa);
                    0 != (c & l.ph) && (a = this.a.c.Pd - this.a.L + this.a.oa);
                    0 != (c & l.qh) && (b = this.a.pa);
                    0 != (c & l.nh) && (b = this.a.c.Qd - this.a.K + this.a.pa);
                    this.a.v = a;
                    this.a.u = b;
                    break;
                case -851968:
                case -917504:
                    a = 18 * (this.a.c.Zb(this.a) >> 2);
                    do {
                        if (this.jh(this.a.v + N.kf[a], this.a.u + N.kf[a + 1], !1)) {
                            this.a.v += N.kf[a];
                            this.a.u += N.kf[a + 1];
                            return
                        }
                        a += 2
                    } while (0 != N.kf[a] || 0 != N.kf[a + 1]);
                    this.a.v = this.a.b.sj;
                    this.a.u = this.a.b.tj;
                    this.a.b.Ta = this.a.b.ps;
                    this.a.b.gb = this.a.b.os
                }
        },
        mB: function(a) {
            switch (this.a.c.i.Gs & 4294901760) {
            case -786432:
                a = this.a.v - this.a.oa;
                var b = this.a.u - this.a.pa
                  , c = this.a.c.dl(a, b, a + this.a.L, b + this.a.K);
                a = this.a.v;
                b = this.a.u;
                0 != (c & l.oh) && (a = this.a.oa);
                0 != (c & l.ph) && (a = this.a.c.Pd - this.a.L + this.a.oa);
                0 != (c & l.qh) && (b = this.a.pa);
                0 != (c & l.nh) && (b = this.a.c.Qd - this.a.K + this.a.pa);
                this.a.v = a;
                this.a.u = b;
                break;
            case -851968:
            case -917504:
                if (b = new J,
                this.yK(this.a.v, this.a.u, this.a.b.sj, this.a.b.tj, a, b))
                    this.a.v = b.x,
                    this.a.u = b.y;
                else {
                    b = 18 * (this.a.c.Zb(this.a) >> 2);
                    do {
                        if (this.jh(this.a.v + N.kf[b], this.a.u + N.kf[b + 1], a)) {
                            this.a.v += N.kf[b];
                            this.a.u += N.kf[b + 1];
                            return
                        }
                        b += 2
                    } while (0 != N.kf[b] || 0 != N.kf[b + 1]);
                    0 == a && (this.a.v = this.a.b.sj,
                    this.a.u = this.a.b.tj,
                    this.a.b.Ta = this.a.b.ps,
                    this.a.b.gb = this.a.b.os)
                }
            }
        },
        cn: function(a, b, c, d, e) {
            var f;
            f = -1;
            e && (f = this.a.ef);
            e = this.a.Wb;
            if (0 != (e.Nd & 15)) {
                var g = a - this.a.oa
                  , h = b - this.a.pa;
                if (0 != (this.a.c.dl(g, h, g + this.a.L, h + this.a.K) & e.Nd))
                    return !1
            }
            if (0 != (e.Nd & 16) && this.a.c.Fn(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, a, b, c, d))
                return !1;
            if (-1 == e.vm)
                return !0;
            a = this.a.c.sm(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, a, b, e.kj);
            if (null == a)
                return !0;
            b = this.a.c.i.Lk;
            for (c = 0; c < a.size(); c++)
                if (d = a.get(c).ef,
                d != f)
                    for (g = e.vm; 0 <= b[g]; g++)
                        if (b[g] == d)
                            return !1;
            return !0
        },
        jh: function(a, b, c) {
            var d;
            d = -1;
            c && (d = this.a.ef);
            c = this.a.Wb;
            if (0 != (c.Nd & 15)) {
                var e = a - this.a.oa
                  , f = b - this.a.pa;
                if (0 != (this.a.c.dl(e, f, e + this.a.L, f + this.a.K) & c.Nd))
                    return !1
            }
            if (0 != (c.Nd & 16) && this.a.c.Fn(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, a, b, 0, H.Be))
                return !1;
            if (-1 == c.vm)
                return !0;
            a = this.a.c.sm(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, a, b, c.kj);
            if (null == a)
                return !0;
            b = this.a.c.i.Lk;
            for (e = 0; e < a.size(); e++)
                if (f = a.get(e).ef,
                f != d) {
                    var g;
                    for (g = c.vm; 0 <= b[g]; g++)
                        if (b[g] == f)
                            return !1
                }
            return !0
        },
        lm: function(a, b, c, d, e, f, g) {
            var h = p.sd((a + c) / 2), k = p.sd((b + d) / 2), l, n;
            do
                if (this.cn(h + this.a.c.ha, k + this.a.c.la, e, f, !1)) {
                    if (c = h,
                    d = k,
                    l = h,
                    n = k,
                    h = p.sd((c + a) / 2),
                    k = p.sd((d + b) / 2),
                    h == l && k == n)
                        return c == a && d == b || !this.cn(a + this.a.c.ha, b + this.a.c.la, e, f, !1) || (h = a,
                        k = b),
                        g.x = h,
                        g.y = k,
                        !0
                } else if (a = h,
                b = k,
                l = h,
                n = k,
                h = p.sd((c + a) / 2),
                k = p.sd((d + b) / 2),
                h == l && k == n) {
                    if ((c != a || d != b) && this.cn(c + this.a.c.ha, d + this.a.c.la, e, f, !1))
                        return g.x = c,
                        g.y = d,
                        !0;
                    g.x = h;
                    g.y = k;
                    return !1
                }
            while (1)
        },
        yK: function(a, b, c, d, e, f) {
            var g = p.sd((a + c) / 2), h = p.sd((b + d) / 2), k, l;
            do
                if (this.jh(g, h, e)) {
                    if (c = g,
                    d = h,
                    k = g,
                    l = h,
                    g = p.sd((c + a) / 2),
                    h = p.sd((d + b) / 2),
                    g == k && h == l)
                        return c == a && d == b || !this.jh(a, b, e) || (g = a,
                        h = b),
                        f.x = g,
                        f.y = h,
                        !0
                } else if (a = g,
                b = h,
                k = g,
                l = h,
                g = p.sd((c + a) / 2),
                h = p.sd((d + b) / 2),
                g == k && h == l) {
                    if ((c != a || d != b) && this.jh(c, d, e))
                        return f.x = c,
                        f.y = d,
                        !0;
                    f.x = g;
                    f.y = h;
                    return !1
                }
            while (1)
        },
        Qs: function(a) {
            this.a.b.Ec == V.yG && (250 < a && (a = 250),
            0 > a && (a = 0),
            this.Qs(a));
            this.a.b.Ec == V.Fi && this.Ld.Qs(a)
        },
        Os: function(a) {
            this.a.b.Ec == V.Zt && (250 < a && (a = 250),
            0 > a && (a = 0),
            this.Os(a));
            this.a.b.Ec == V.Fi && this.Ld.Os(a)
        },
        Zb: function() {
            return this.a.b.Ec == V.Fi && this.Ld.Zb ? this.Ld.Zb() : this.a.b.Ya
        },
        Db: function() {},
        start: function() {}
    };
    ua.tL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 31, 0, 1, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 24, 25, 26, 27, 27, 28, 28, 28, 28, 29, 29, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 23, 24, 25, 28, 27, 26, 25, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 20, 21, 22, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 8, 7, 6, 5, 4, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16, 17, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 16, 15, 14, 13, 12, 11, 10, 9, 8, 12, 13, 14, 15, 15, 16, 16, 16, 16, 17, 17, 18, 19, 20, 21, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7, 8, 9, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 0, 1, 2, 0, 0, 1, 1, 2, 3, 4, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 28, 29, 30, 31, 31, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 25, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10, 11, 12, 13, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    ua.AG = [4294967292, 4294967294, 4294967295];
    ua.TG = [-4, 4, -2, 2, -1, 1];
    ua.UG = [-4, 4, -4, 4, -4, 4];
    ua.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.a.Ag = 0;
            this.a.Bg = 0;
            this.a.b.ca = b.oo;
            this.a.b.hb = b.oo;
            this.a.b.li = b.oo;
            this.Fl = b.oo << 8;
            var c = b.kB;
            0 != c && (c = this.Bk(c),
            this.a.b.li = 0);
            this.ye = c;
            this.qy = b.jB;
            this.Sp = b.iB;
            this.Tp = ua.AG[this.Sp];
            this.Di = !1;
            this.Kt = -1;
            this.El = this.Up = (100 - b.lB) / 8;
            this.ro(b);
            this.a.b.N = !0
        },
        move: function() {
            this.a.B.Aj = !1;
            this.a.c.sl = 1;
            this.a.b.ve = r.Lc;
            null != this.a.ea && this.a.ea.We();
            if (0 != this.ye) {
                var a = this.Fl;
                if (0 < a) {
                    var b = this.ye;
                    0 != (this.a.c.A.Xb & H.Uc) && (b *= this.a.c.Hc);
                    a -= b;
                    0 > a && (a = 0);
                    this.Fl = a;
                    this.a.b.ca = a >> 8
                }
            }
            this.dj(this.a.b.ca, this.a.c.Zb(this.a))
        },
        stop: function() {
            0 == this.Pb && (this.Pb = this.a.b.ca | 32768,
            this.Fl = this.a.b.ca = 0,
            this.a.B.U = !0)
        },
        start: function() {
            var a = this.Pb;
            0 != a && (a &= 32767,
            this.a.b.ca = a,
            this.Fl = a << 8,
            this.Pb = 0,
            this.a.B.U = !0)
        },
        sg: function() {
            if (0 == this.Pb && this.a.c.Ob != this.Kt) {
                this.Kt = this.a.c.Ob;
                this.gg == this.a.c.we && this.mB(this.Di);
                var a = this.a.v
                  , b = this.a.u
                  , c = 0
                  , a = a - 8
                  , b = b - 8;
                0 == this.jh(a, b, this.Di) && (c |= 1);
                a += 16;
                0 == this.jh(a, b, this.Di) && (c |= 2);
                b += 16;
                0 == this.jh(a, b, this.Di) && (c |= 4);
                0 == this.jh(a - 16, b, this.Di) && (c |= 8);
                a = ua.tL[32 * c + this.a.c.Zb(this.a)];
                a &= this.Tp;
                if (!this.uo(a)) {
                    var c = b = ua.UG[2 * this.Sp + 1]
                      , d = !1;
                    do {
                        a -= b;
                        a &= 31;
                        if (this.uo(a)) {
                            d = !0;
                            break
                        }
                        a += 2 * b;
                        a &= 31;
                        if (this.uo(a)) {
                            d = !0;
                            break
                        }
                        a -= b;
                        a &= 31;
                        b += c
                    } while (16 >= b);
                    if (0 == d) {
                        this.Di = !0;
                        this.a.b.Ya = this.a.c.random(32) & this.Tp;
                        this.a.B.Aj = !0;
                        this.a.B.U = !0;
                        return
                    }
                }
                this.Di = !1;
                this.a.b.Ya = a;
                a = this.a.c.random(100);
                if (a < this.qy && (a >>= 2,
                25 > a && (a = a - 12 & 31 & this.Tp,
                this.uo(a)))) {
                    this.a.b.Ya = a;
                    this.a.B.Aj = !0;
                    this.a.B.U = !0;
                    return
                }
                a = this.a.c.Zb(this.a) & 7;
                12 != this.El && (0 == a ? (this.El--,
                0 > this.El && (a = this.a.c.Zb(this.a) + ua.TG[this.a.c.random(2) + 2 * this.Sp],
                a &= 31,
                this.uo(a) && (this.a.b.Ya = a,
                this.El = this.Up))) : this.El = this.Up);
                this.a.B.Aj = !0;
                this.a.B.U = !0
            }
        },
        uo: function(a) {
            var b = 2048 * N.Qj[a] + (65536 * this.a.v + (this.a.Ag & 65535));
            a = 2048 * N.dk[a] + (65536 * this.a.u + (this.a.Bg & 65535));
            b = Math.floor(b / 65536);
            a = Math.floor(a / 65536);
            return this.jh(b, a, !1)
        },
        Af: function() {},
        Se: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.ca = a;
            this.Fl = a << 8;
            this.Pb = 0;
            this.a.B.U = !0
        },
        dh: function(a) {
            this.Se(a)
        },
        reverse: function() {
            0 == this.Pb && (this.a.B.U = !0,
            this.a.b.Ya += 16,
            this.a.b.Ya &= 31)
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        }
    });
    se.prototype = p.extend(new N, {
        $: function(a) {
            this.a = a;
            this.l = a.c;
            this.l.hy();
            null != this.a.F && this.a.F.Ms(!1);
            null != this.a.F && (this.a.F.Y &= ~A.Bh,
            this.a.F.Rr());
            this.Vp = !0;
            this.a.Ag = 0;
            this.a.Bg = 0;
            null != this.a.ea && this.a.ea.NA(r.Lc);
            this.a.b.ca = 0;
            this.a.b.Sa = !0;
            this.a.b.N = !0
        },
        xv: function(a) {
            this.a.b.hb = this.a.b.ca;
            this.a.b.li = this.a.b.ca;
            this.Gl = a;
            null != a && (a.X |= M.iy)
        },
        Db: function() {
            this.$I(this.a)
        },
        move: function() {
            if (this.Vp) {
                if (null != this.Gl.ea && this.Gl.ea.ji == r.Hx)
                    return;
                this.uD()
            }
            null != this.a.ea && this.a.ea.We();
            this.dj(this.a.b.ca, this.a.c.Zb(this.a));
            if (-64 > this.a.v || this.a.v > this.a.c.Pd + 64 || -64 > this.a.u || this.a.u > this.a.c.Qd + 64)
                this.a.ao = !1,
                this.a.c.vg(this.a.bc);
            this.a.b.Sa && (this.a.b.Sa = !1,
            this.a.c.$f(this.a))
        },
        uD: function() {
            null != this.a.F && this.a.F.Ms(!0);
            null != this.a.F && (this.a.F.Y |= A.Bh,
            this.a.F.iw());
            if (null != this.l.pi) {
                var a = this.l.Kp(this.Gl);
                if (null != a) {
                    var b = this.l.pi
                      , c = new fa;
                    this.Lt = c;
                    c.bG(this.a, fa.vG);
                    c.vK = b.identifier;
                    this.pn = b.VR(a.uK, this.a.b.ca / 250 * 50, c);
                    c.tK = this.pn;
                    null == this.pn && (this.Lt = null)
                }
            }
            this.Vp = !1;
            this.Gl = null
        },
        $I: function() {
            null != this.pn && (pBase = this.a.c.pi,
            pBase.WR(this.pn),
            this.pn = null);
            null != this.Lt && (this.Lt = null)
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        Af: function() {},
        reverse: function() {},
        stop: function() {},
        start: function() {},
        sg: function() {},
        Se: function() {},
        dh: function() {}
    });
    te.prototype = p.extend(new N, {
        $: function(a) {
            this.a = a
        },
        move: function() {
            0 == (this.a.X & M.Bi) && null != this.a.ea && (this.a.ea.We(),
            this.a.ea.Vg != r.Mj + 1 && this.a.c.vg(this.a.bc))
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0)
        },
        Af: function() {},
        reverse: function() {},
        stop: function() {},
        start: function() {},
        sg: function() {},
        Se: function() {},
        dh: function() {}
    });
    ue.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.a.Ag = 0;
            this.pg = this.a.Bg = 0;
            this.sh = this.a.b.ca = 0;
            this.Mt = -1;
            this.a.b.mi = b.Tk;
            this.$o = b.pB;
            this.$g = this.Bk(this.$o);
            this.ap = b.qB;
            this.ye = this.Bk(this.ap);
            this.a.b.hb = b.sB;
            this.a.b.li = 0;
            this.Nt = b.rB;
            this.Bj = b.Mr;
            this.a.b.N = !0
        },
        move: function() {
            var a, b, c, d;
            this.a.c.sl = 1;
            a = this.a.c.Zb(this.a);
            this.a.b.Uw = a;
            if (0 == this.sh) {
                this.a.B.Aj = !1;
                b = 0;
                c = this.a.c.ad[this.a.b.mi - 1] & 15;
                0 != c && (d = N.hG[c],
                -1 != d && 0 != (1 << d & this.Nt) && (b = 1,
                a = d));
                c = this.pg;
                0 == b ? 0 != c && (b = this.ye,
                0 != (this.a.c.A.Xb & H.Uc) && (b *= this.a.c.Hc),
                c -= b,
                0 >= c && (c = 0)) : c >> 8 < this.a.b.hb && (b = this.$g,
                0 != (this.a.c.A.Xb & H.Uc) && (b *= this.a.c.Hc),
                c += b,
                c >> 8 > this.a.b.hb && (c = this.a.b.hb << 8));
                this.pg = c;
                this.a.b.ca = c >> 8;
                this.a.b.Ya = a;
                this.a.b.ve = r.Lc;
                null != this.a.ea && this.a.ea.We();
                if (0 == this.dj(this.a.b.ca, this.a.c.Zb(this.a)))
                    return;
                if (0 == this.a.b.ca) {
                    c = this.pg;
                    if (0 == c || this.a.b.Uw == this.a.c.Zb(this.a))
                        return;
                    this.a.b.ca = c >> 8;
                    this.a.b.Ya = this.a.b.Uw;
                    if (0 == this.dj(this.a.b.ca, this.a.c.Zb(this.a)))
                        return
                }
            }
            for (; 0 != this.sh && 0 != this.a.c.sl; )
                if (c = this.pg,
                c -= this.ye,
                0 < c) {
                    if (this.pg = c,
                    c >>= 8,
                    this.a.b.ca = c,
                    d = this.a.c.Zb(this.a),
                    0 != this.sh && (d += 16,
                    d &= 31),
                    0 == this.dj(c, d))
                        break
                } else {
                    this.pg = 0;
                    this.sh = this.a.b.ca = 0;
                    break
                }
        },
        sg: function() {
            this.gg == this.a.c.we && this.to(0 != (this.Bj & N.sn));
            this.a.c.Ob != this.Mt && (this.Mt = this.a.c.Ob,
            this.sh++,
            12 <= this.sh ? this.stop() : (this.a.B.Aj = !0,
            this.a.B.U = !0))
        },
        reverse: function() {},
        Af: function() {},
        stop: function() {
            this.pg = this.sh = this.a.b.ca = 0;
            this.a.B.U = !0;
            this.gg == this.a.c.we && (this.to(0 != (this.Bj & N.sn)),
            this.sh = 0)
        },
        start: function() {
            this.a.B.U = !0;
            this.Pb = 0
        },
        dh: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.hb = a;
            this.a.b.ca > a && (this.a.b.ca = a,
            this.pg = a << 8);
            this.a.B.U = !0
        },
        Se: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.hb && (a = this.a.b.hb);
            this.a.b.ca = a;
            this.pg = a << 8;
            this.a.B.U = !0
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        eS: function(a) {
            this.Nt = a
        }
    });
    ve.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.a.b.mi = b.Tk;
            this.Ot = b.tB + this.a.v;
            this.Pt = b.uB + this.a.u;
            this.Qt = b.vB + this.a.v;
            this.Rt = b.wB + this.a.u;
            this.Xp = this.Wp = this.a.b.ca = 0;
            this.a.b.li = 0;
            this.a.b.hb = 100;
            this.Bj = b.Mr;
            this.ro(b);
            this.a.b.N = !0;
            this.a.c.MK(this.a)
        },
        Db: function() {
            this.a.c.Oz(this.a)
        },
        move: function() {
            var a = this.a.v, b = this.a.u, c, d, e, f;
            if (0 == this.Pb && 0 != this.a.c.vs[this.a.b.mi - 1] && (a = this.a.c.xj,
            a < this.Ot && (a = this.Ot),
            a > this.Qt && (a = this.Qt),
            b = this.a.c.yj,
            b < this.Pt && (b = this.Pt),
            b > this.Rt && (b = this.Rt),
            c = a - this.a.v,
            d = b - this.a.u,
            e = 0,
            0 > c && (c = -c,
            e |= 1),
            0 > d && (d = -d,
            e |= 2),
            f = c + d << 2,
            250 < f && (f = 250),
            this.a.b.ca = f,
            0 != f)) {
                0 == d && (d = 1);
                c = (c << 8) / d;
                for (d = 0; !(c >= N.Al[d]); d += 2)
                    ;
                c = N.Al[d + 1];
                0 != (e & 2) && (c = -c + 32 & 31);
                0 != (e & 1) && (c = (-(c - 8 & 31) & 31) + 8 & 31);
                this.a.b.Ya = c
            }
            0 != this.a.b.ca && (this.Xp = 0,
            this.Wp = this.a.b.ca);
            this.Xp++;
            10 < this.Xp && (this.Wp = 0);
            this.a.b.ca = this.Wp;
            null != this.a.ea && this.a.ea.We();
            this.a.v = a;
            this.a.u = b;
            this.a.b.N = !0;
            this.a.c.we++;
            this.gg = this.a.c.we;
            this.a.c.$f(this.a)
        },
        stop: function() {
            this.gg == this.a.c.we && this.to(0 != (this.Bj & N.sn));
            this.a.b.ca = 0
        },
        start: function() {
            this.Pb = 0;
            this.a.B.U = !0
        },
        sg: function() {
            this.stop()
        },
        reverse: function() {},
        Af: function() {},
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        }
    });
    we.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.bq = this.a.v;
            this.cq = this.a.u;
            this.nd = !1;
            this.wh = 0;
            this.a.gm = 0;
            this.La = b;
            this.a.b.li = b.NB;
            this.a.b.hb = b.MB;
            this.vh = 0;
            this.Kl = null;
            this.Sk(0);
            this.ro(b);
            this.a.b.ca = this.Mc;
            this.a.b.N = !0;
            0 == this.La.bb.length && this.stop()
        },
        move: function() {
            this.a.gm = 0;
            this.a.b.ve = r.Lc;
            null != this.a.ea && this.a.ea.We();
            if (0 == this.Mc) {
                var a = this.wh;
                if (0 == a) {
                    this.a.b.ca = 0;
                    this.a.c.$f(this.a);
                    return
                }
                a -= this.a.c.Zo;
                if (0 < a) {
                    this.wh = a;
                    this.a.b.ca = 0;
                    this.a.c.$f(this.a);
                    return
                }
                this.wh = 0;
                this.Mc = this.Pb & 32767;
                this.Pb = 0;
                this.a.b.ca = this.Mc
            }
            a = 0 != (this.a.c.A.Xb & H.Uc) ? 256 * this.a.c.Hc : 256;
            this.a.c.si = a;
            for (var b; ; ) {
                b = !1;
                this.a.c.Yo = a;
                a *= this.Mc;
                a <<= 5;
                524288 >= a ? this.a.c.jx = a : (a = 16384,
                a /= this.Mc,
                this.a.c.Yo = a,
                this.a.c.jx = 524288);
                for (; ; ) {
                    this.$p = !1;
                    if (1 == this.OB(this.a.c.jx) && 0 == this.$p) {
                        b = !0;
                        break
                    }
                    if (this.a.c.si == this.a.c.Yo) {
                        b = !0;
                        break
                    }
                    if (this.a.c.si > this.a.c.Yo) {
                        this.a.c.si -= this.a.c.Yo;
                        a = this.a.c.si;
                        break
                    }
                    a = this.a.c.si * MT_Speed;
                    a <<= 5;
                    this.OB(a);
                    b = !0;
                    break
                }
                if (b)
                    break
            }
        },
        OB: function(a) {
            a += this.vh;
            var b = a >>> 16;
            if (b < this.aq)
                return this.vh = a,
                a = b * this.rn / 16384 + this.yh,
                this.a.v = b * this.qn / 16384 + this.xh,
                this.a.u = a,
                this.a.b.N = !0,
                this.a.c.$f(this.a),
                this.a.B.U;
            b -= this.aq;
            a = b << 16 | a & 65535;
            0 != this.Mc && (a /= this.Mc);
            this.a.c.si += a >> 5 & 65535;
            this.a.v = this.Yj;
            this.a.u = this.Zj;
            this.a.b.N = !0;
            this.a.c.$f(this.a);
            if (this.a.B.U)
                return !0;
            this.a.gm = this.a.c.Ob;
            this.a.fm = null;
            b = this.le;
            this.vh = 0;
            if (0 == this.nd) {
                b++;
                if (b < this.La.nm) {
                    this.a.fm = this.La.bb[b].se;
                    if (null != this.Kl && null != this.La.bb[b].se && p.xc(this.Kl, this.La.bb[b].se))
                        return this.le = b,
                        this.jf(),
                        this.Lr();
                    this.Sk(b);
                    this.jf();
                    return this.a.B.U
                }
                this.a.hr = this.a.c.Ob;
                this.le = b;
                if (this.nd)
                    return this.jf(),
                    this.a.B.U;
                if (0 != this.La.RB)
                    return this.nd = !0,
                    b--,
                    this.a.fm = this.La.bb[b].se,
                    this.mm(b),
                    this.jf(),
                    this.a.B.U;
                this.QB();
                if (0 == this.La.fw)
                    return this.Lr(),
                    this.jf(),
                    this.a.B.U;
                b = 0
            } else {
                if (null != this.Kl && null != this.La.bb[b].se && p.xc(this.Kl, this.La.bb[b].se))
                    return this.jf(),
                    this.Lr();
                this.a.fm = this.La.bb[b].se;
                this.wh = this.La.bb[b].aw;
                b--;
                if (0 <= b)
                    return this.mm(b),
                    this.jf(),
                    this.a.B.U;
                this.QB();
                if (0 == this.nd)
                    return this.jf(),
                    this.a.B.U;
                if (0 == this.La.fw)
                    return this.Lr(),
                    this.jf(),
                    this.a.B.U;
                b = 0;
                this.nd = !1
            }
            this.Sk(b);
            this.jf();
            return this.a.B.U
        },
        Sk: function(a) {
            a >= this.La.bb.length ? this.stop() : (this.nd = !1,
            this.le = a,
            this.wh = this.La.bb[a].aw,
            this.qn = this.La.bb[a].Xv,
            this.rn = this.La.bb[a].bw,
            this.xh = this.a.v,
            this.yh = this.a.u,
            this.Yj = this.a.v + this.La.bb[a].Zv,
            this.Zj = this.a.u + this.La.bb[a].$v,
            this.a.b.Ya = this.La.bb[a].Yv,
            this.LB())
        },
        mm: function(a) {
            a >= this.La.bb.length ? this.stop() : (this.nd = !0,
            this.le = a,
            this.qn = -this.La.bb[a].Xv,
            this.rn = -this.La.bb[a].bw,
            this.xh = this.a.v,
            this.yh = this.a.u,
            this.Yj = this.a.v - this.La.bb[a].Zv,
            this.Zj = this.a.u - this.La.bb[a].$v,
            this.a.b.Ya = this.La.bb[a].Yv + 16 & 31,
            this.LB())
        },
        LB: function() {
            this.aq = this.La.bb[this.le].nB;
            var a = this.La.bb[this.le].oB
              , b = this.wh;
            0 != b && (this.wh = 20 * b,
            this.Pb = a |= 32768);
            0 != this.Pb && (a = 0);
            if (a != this.Mc || 0 != a)
                this.Mc = a,
                this.$p = this.a.B.U = !0;
            this.a.b.ca = this.Mc
        },
        jf: function() {
            this.a.gm == this.a.c.Ob && (this.a.c.i.Ic = 0,
            this.a.c.i.td(this.a, -1310720 | this.a.Ha & 65535),
            this.a.c.i.td(this.a, -2293760 | this.a.Ha & 65535));
            this.a.hr == this.a.c.Ob && (this.a.c.i.Ic = 0,
            this.a.c.i.td(this.a, -1376256 | this.a.Ha & 65535))
        },
        Lr: function() {
            this.Pb = this.Mc = 0;
            this.a.B.U = !0;
            this.$p = !1;
            return !0
        },
        QB: function() {
            0 != this.La.PB && (this.a.v = this.bq,
            this.a.u = this.cq,
            this.a.b.N = !0)
        },
        MR: function(a) {
            var b;
            for (b = 0; b < this.La.nm; b++)
                if (null != this.La.bb[b].se && p.xc(a, this.La.bb[b].se)) {
                    0 == this.nd ? (this.Sk(b),
                    this.a.gm = this.a.c.Ob,
                    this.a.fm = this.La.bb[b].se,
                    this.a.hr = 0,
                    this.jf()) : 0 < b && (b--,
                    this.mm(b),
                    this.a.gm = this.a.c.Ob,
                    this.a.fm = this.La.bb[b].se,
                    this.a.hr = 0,
                    this.jf());
                    this.a.B.U = !0;
                    break
                }
        },
        NR: function(a) {
            var b;
            for (b = 0; b < this.La.nm; b++)
                if (null != this.La.bb[b].se && p.xc(a, this.La.bb[b].se)) {
                    if (b == this.le && 0 == this.vh)
                        break;
                    this.Kl = a;
                    if (0 == this.nd)
                        if (b > this.le) {
                            if (0 != this.Mc)
                                break;
                            0 != (this.Pb & 32768) ? this.start() : this.Sk(this.le)
                        } else {
                            if (0 != this.Mc) {
                                this.reverse();
                                break
                            }
                            0 != (this.Pb & 32768) ? (this.start(),
                            this.reverse()) : this.mm(MT_MoveNumber - 1)
                        }
                    else if (b <= this.le) {
                        if (0 != this.Mc)
                            break;
                        0 != (this.Pb & 32768) ? this.start() : this.mm(this.le - 1)
                    } else {
                        if (0 != this.Mc) {
                            this.reverse();
                            break
                        }
                        0 != (this.Pb & 32768) ? (this.start(),
                        this.reverse()) : this.Sk(this.le)
                    }
                    break
                }
        },
        stop: function() {
            0 == this.Pb && (this.Pb = this.Mc | 32768);
            this.Mc = 0;
            this.a.B.U = !0
        },
        start: function() {
            0 != (this.Pb & 32768) && (this.Mc = this.Pb & 32767,
            this.Pb = this.wh = 0,
            this.a.B.U = !0)
        },
        reverse: function() {
            if (0 == this.Pb) {
                this.a.B.U = !0;
                var a = this.le;
                if (0 == this.vh)
                    (this.nd = !this.nd) ? 0 == a ? this.nd = !this.nd : (a--,
                    this.mm(a)) : this.Sk(a);
                else {
                    this.nd = !this.nd;
                    this.qn = -this.qn;
                    this.rn = -this.rn;
                    var a = this.xh
                      , b = this.Yj;
                    this.xh = b;
                    this.Yj = a;
                    a = this.yh;
                    this.yh = b = this.Zj;
                    this.Zj = a;
                    this.a.b.Ya += 16;
                    this.a.b.Ya &= 31;
                    a = this.vh >>> 16;
                    a = this.aq - a;
                    this.vh = a << 16 | this.vh & 65535
                }
            }
        },
        gc: function(a) {
            var b = this.a.v;
            this.a.v = a;
            b -= this.xh;
            a -= b;
            this.Yj = b = this.Yj - this.xh + a;
            b = this.xh;
            this.xh = a;
            this.bq -= b - a;
            this.a.B.U = !0;
            this.a.b.N = !0;
            this.a.b.Sa = !0
        },
        hc: function(a) {
            var b = this.a.u;
            this.a.u = a;
            b -= this.yh;
            a -= b;
            this.Zj = b = this.Zj - this.yh + a;
            b = this.yh;
            this.yh = a;
            this.cq -= b - a;
            this.a.B.U = !0;
            this.a.b.N = !0;
            this.a.b.Sa = !0
        },
        Se: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.Mc = a;
            this.a.b.ca = a;
            this.a.B.U = !0
        },
        dh: function(a) {
            this.Se(a)
        },
        Af: function() {}
    });
    T.GO = 0;
    T.tG = 1;
    T.EO = 2;
    T.FO = 3;
    T.th = 0;
    T.Hl = 1;
    T.Zp = 2;
    T.Yp = 3;
    T.ry = 4;
    T.sy = 5;
    T.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.l = this.a.c;
            this.a.Ag = 0;
            this.Ud = this.a.Bg = 0;
            this.a.b.ca = 0;
            this.a.b.mi = b.Tk;
            this.$o = b.BB;
            this.$g = this.Bk(this.$o);
            this.ap = b.CB;
            this.ye = this.Bk(this.ap);
            this.a.b.hb = b.GB;
            this.a.b.li = 0;
            this.St = b.DB;
            this.ty = b.EB;
            var c = b.FB;
            3 < c && (c = T.tG);
            this.uy = c;
            this.Il = this.Cd = 0;
            this.Wj = null;
            this.ro(b);
            this.a.b.N = !0;
            this.nb = T.th
        },
        move: function() {
            var a, b;
            this.a.c.sl = 1;
            a = this.a.c.ad[this.a.b.mi - 1];
            this.Au();
            b = this.Ud;
            var c;
            0 == this.Il && (0 >= b && (0 != (a & 4) ? (c = this.$g,
            0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
            b -= c,
            b / 256 < -this.a.b.hb && (b = 256 * -this.a.b.hb)) : 0 > b && (c = this.ye,
            0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
            b += c,
            0 < b && (b = 0)),
            0 != (a & 8) && (b = -b)),
            0 <= b && (0 != (a & 8) ? (c = this.$g,
            0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
            b += c,
            b / 256 > this.a.b.hb && (b = 256 * this.a.b.hb)) : 0 < b && (c = this.ye,
            0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
            b -= c,
            0 > b && (b = 0)),
            0 != (a & 4) && (b = -b)),
            this.Ud = b);
            var d = this.Cd;
            for (c = !1; ; ) {
                switch (this.nb) {
                case 2:
                case 3:
                    c = this.St << 5;
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc);
                    d += c;
                    64E3 < d && (d = 64E3);
                    break;
                case 0:
                    if (0 != (a & 1)) {
                        if (this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf - 4) == l.Ef)
                            break;
                        this.nb = T.Hl;
                        c = !0;
                        continue
                    }
                    if (0 != (a & 2) && this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf + 4) != l.Ef) {
                        this.nb = T.Hl;
                        c = !0;
                        continue
                    }
                    break;
                case 1:
                    if (0 == c && (this.Il = 0,
                    this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) == l.Ef && this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf - 4) == l.Ef))
                        break;
                    0 >= d && (0 != (a & 1) ? (c = this.$g,
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
                    d -= c,
                    c = d / 256,
                    c < -this.a.b.hb && (d = 256 * -this.a.b.hb)) : (c = this.ye,
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
                    d += c,
                    0 < d && (d = 0)),
                    0 != (a & 2) && (d = -d));
                    0 <= d && (0 != (a & 2) ? (c = this.$g,
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
                    d += c,
                    c = d / 256,
                    c > this.a.b.hb && (d = 256 * this.a.b.hb)) : (c = this.ye,
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
                    d -= c,
                    0 > d && (d = 0)),
                    0 != (a & 1) && (d = -d))
                }
                break
            }
            this.Cd = d;
            var e = 0;
            0 > b && (e = 16);
            c = b;
            var f = d;
            if (0 != f) {
                var g = 0;
                0 > c && (g |= 1,
                c = -c);
                0 > f && (g |= 2,
                f = -f);
                c = (c << 8) / f;
                for (e = 0; !(c >= N.Al[e]); e += 2)
                    ;
                e = N.Al[e + 1];
                0 != (g & 2) && (e = -e + 32 & 31);
                0 != (g & 1) && (e = (-(e - 8 & 31) & 31) + 8 & 31)
            }
            c = b;
            g = N.Qj[e];
            f = N.dk[e];
            0 > g && (g = -g);
            0 > f && (f = -f);
            g < f && (g = f,
            c = d);
            0 > c && (c = -c);
            c /= g;
            250 < c && (c = 250);
            this.a.b.ca = c;
            switch (this.nb) {
            case 1:
                0 > d ? this.a.b.Ya = 8 : 0 < d && (this.a.b.Ya = 24);
                break;
            case 3:
                this.a.b.Ya = e;
                break;
            default:
                0 > b ? this.a.b.Ya = 16 : 0 < b && (this.a.b.Ya = 0)
            }
            switch (this.nb) {
            case 4:
                this.a.b.ve = r.it;
                break;
            case 5:
                this.a.b.ve = r.xp;
                break;
            case 3:
                this.a.b.ve = r.Fx;
                break;
            case 2:
                this.a.b.ve = r.Gx;
                break;
            case 1:
                this.a.b.ve = r.Ex;
                break;
            default:
                this.a.b.ve = r.Lc
            }
            null != this.a.ea && this.a.ea.We();
            this.Au();
            this.dj(this.a.b.ca, e);
            this.nb != T.th && this.nb != T.Hl || 0 != this.Vj || (b = !1,
            d = this.uy,
            0 != d && (d--,
            0 == d ? (5 == (a & 5) && (b = !0),
            9 == (a & 9) && (b = !0)) : 0 != (a & d << 4) && (b = !0)),
            b && (this.Cd = -this.ty << 8,
            this.nb = T.Zp));
            switch (this.nb) {
            case 2:
                0 <= this.Cd && (this.nb = T.Yp);
                break;
            case 3:
                this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) != l.Ef && (this.Cd = 0,
                this.nb = T.Hl,
                this.a.b.Ya = 8);
                break;
            case 0:
                if (0 != (a & 3) && 0 == (a & 12) && this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) != l.Ef) {
                    this.nb = T.Hl;
                    this.Ud = 0;
                    break
                }
                0 != (a & 2) && null != this.a.ea && this.a.ea.Dh(r.it) && (this.Ud = 0,
                this.nb = T.ry);
                if (this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) != l.Ef)
                    break;
                0 == this.cn(this.a.v, this.a.u + 10, this.Ei, H.Be, !0) ? (a = this.a.v - this.a.c.ha,
                b = this.a.u - this.a.c.la,
                d = new J,
                this.lm(a, b + this.Ei - 1, a, b, this.Ei, H.Be, d),
                this.a.v = d.x + this.a.c.ha,
                this.a.u = d.y + this.a.c.la,
                this.Vj = !1) : this.nb = T.Yp;
                break;
            case 1:
                if (this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) == l.Ef) {
                    if (0 > this.Cd)
                        for (f = 0; 32 > f; f++)
                            if (this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf + f) != l.Ef) {
                                this.a.u += f;
                                break
                            }
                    this.Cd = 0
                }
                0 != (a & 12) && (this.nb = T.th,
                this.Cd = 0);
                break;
            case 4:
                0 == (a & 2) && (null != this.a.ea && this.a.ea.Dh(r.xp) ? (this.nb = T.sy,
                this.a.b.ve = r.xp,
                this.a.ea.We(),
                this.a.ea.el = 1) : this.nb = T.th);
                break;
            case 5:
                null != this.a.ea && 0 == this.a.ea.te && (this.nb = T.th)
            }
            if (this.nb == T.th || this.nb == T.ry || this.nb == T.sy) {
                do {
                    a = null;
                    null != this.a.Wb && (a = this.a.Wb.kj);
                    if (null == this.a.c.sm(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, this.a.v, this.a.u, a) && (a = this.a.c.sm(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, this.a.v, this.a.u + 1, a),
                    null != a && 1 == a.size())) {
                        a = a.get(0);
                        if (null == this.Wj || this.Wj != a) {
                            if (this.a.ef != a.ef) {
                                this.Wj = a;
                                this.Tt = a.v;
                                this.Ut = a.u;
                                break
                            }
                            if (null == this.Wj)
                                break
                        }
                        b = a.v - this.Tt;
                        d = a.u - this.Ut;
                        this.Tt = a.v;
                        this.Ut = a.u;
                        this.a.v += b;
                        this.a.u += d;
                        this.a.c.$f(this.a);
                        this.a.b.N = !0;
                        break
                    }
                    this.Wj = null
                } while (0)
            } else
                this.Wj = null
        },
        cw: function() {
            this.Cd = this.Ud = this.a.b.ca = 0
        },
        sg: function() {
            this.stop()
        },
        stop: function() {
            if (this.gg != this.a.c.we)
                this.cw();
            else {
                this.a.B.U = !0;
                var a = this.a.v - this.a.c.ha, b = this.a.u - this.a.c.la, c;
                switch (this.a.c.i.Gs & 4294901760) {
                case -786432:
                    a = this.a.v - this.a.oa;
                    b = this.a.u - this.a.pa;
                    c = this.a.c.dl(a, b, a + this.a.L, b + this.a.K);
                    a = this.a.v;
                    b = this.a.u;
                    0 != (c & l.oh) && (a = this.a.oa,
                    this.Ud = 0,
                    this.Vj = !0);
                    0 != (c & l.ph) && (a = this.a.c.Pd - this.a.L + this.a.oa,
                    this.Ud = 0,
                    this.Vj = !0);
                    0 != (c & l.qh) && (b = this.a.pa,
                    this.Cd = 0,
                    this.Vj = !1);
                    0 != (c & l.nh) && (b = this.a.c.Qd - this.a.K + this.a.pa,
                    this.Cd = 0,
                    this.Vj = !1);
                    this.a.v = a;
                    this.a.u = b;
                    this.nb = this.nb == T.Zp ? T.Yp : T.th;
                    this.Il = 0;
                    break;
                case -851968:
                case -917504:
                    if (this.Vj = !1,
                    c = new J,
                    this.nb == T.Yp)
                        this.lm(a, b, this.a.b.sj - this.a.c.ha, this.a.b.tj - this.a.c.la, this.Ei, H.Be, c),
                        this.a.v = c.x + this.a.c.ha,
                        this.a.u = c.y + this.a.c.la,
                        this.nb = T.th,
                        this.a.b.N = !0,
                        this.cn(this.a.v, this.a.u + 1, 0, H.Be, !0) ? this.Ud = this.a.b.ca = 0 : (this.Il = 0,
                        this.a.b.ca = Math.abs(this.Ud / 256),
                        this.Cd = 0);
                    else {
                        if (this.nb == T.th) {
                            if (this.lm(a, b, a, b - this.Ei, 0, H.Be, c)) {
                                this.a.v = c.x + this.a.c.ha;
                                this.a.u = c.y + this.a.c.la;
                                this.a.b.N = !0;
                                break
                            }
                            if (this.lm(a, b, this.a.b.sj - this.a.c.ha, this.a.b.tj - this.a.c.la, 0, H.Be, c)) {
                                this.a.v = c.x + this.a.c.ha;
                                this.a.u = c.y + this.a.c.la;
                                this.a.b.N = !0;
                                this.cw();
                                break
                            }
                        }
                        if (this.nb == T.Zp) {
                            if (this.lm(a, b, a, b - this.Ei, 0, H.Be, c)) {
                                this.a.v = c.x + this.a.c.ha;
                                this.a.u = c.y + this.a.c.la;
                                this.a.b.N = !0;
                                break
                            }
                            this.Il = 1;
                            this.Ud = 0
                        }
                        this.nb == T.Hl && this.lm(a, b, this.a.b.sj - this.a.c.ha, this.a.b.tj - this.a.c.la, 0, H.Be, c) ? (this.a.v = c.x + this.a.c.ha,
                        this.a.u = c.y + this.a.c.la,
                        this.a.b.N = !0,
                        this.cw()) : (this.a.b.Ta = this.a.b.ps,
                        this.a.b.gb = this.a.b.os,
                        this.cn(this.a.v, this.a.u, 0, H.Be, !0) || (this.a.v = this.a.b.sj,
                        this.a.u = this.a.b.tj,
                        this.a.b.N = !0))
                    }
                }
            }
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        Se: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.hb && (a = this.a.b.hb);
            this.a.b.ca = a;
            this.Ud = this.a.b.ca * N.Qj[this.a.c.Zb(this.a)];
            this.Cd = this.a.b.ca * N.dk[this.a.c.Zb(this.a)];
            this.a.B.U = !0
        },
        dh: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.hb = a;
            a <<= 8;
            this.Ud > a && (this.Ud = a);
            this.a.B.U = !0
        },
        Os: function(a) {
            this.St = a
        },
        Af: function(a) {
            this.a.b.Ya = a;
            this.Ud = this.a.b.ca * N.Qj[a];
            this.Cd = this.a.b.ca * N.dk[a]
        },
        Au: function() {
            var a;
            0 < this.a.b.Ta ? a = this.a.c.h.ba.Fk(this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb) : (a = new aa,
            a.width = this.a.L,
            a.height = this.a.K,
            a.Ja = this.a.oa,
            a.Fa = this.a.pa);
            this.Ff = 0;
            this.Gf = a.height - a.Fa;
            this.Ei = 2 * a.height + a.height >>> 3
        },
        AK: function() {
            this.Au();
            this.l.tg(this.a.de, this.a.v + this.Ff, this.a.u + this.Gf) == l.Ef && (0 == this.a.c.Fn(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, this.a.v, this.a.u, 0, H.Ap) && (this.nb == T.Zp && 0 > this.Cd || 0 == this.a.c.Fn(this.a, this.a.b.Ta, this.a.b.gb, this.a.b.Gb, this.a.b.Hb, this.a.v, this.a.u, this.Ei, H.Be)) || this.a.c.i.td(this.a, -851968 | this.a.Ha & 65535))
        }
    });
    $a.XG = [4294967288, 4294967292, 4294967294, 4294967295];
    $a.prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            this.Dd = 0;
            this.uh = this.a.b.ca = 0;
            this.vy = -1;
            this.a.b.mi = b.Tk;
            this.$o = b.dw;
            this.$g = this.Bk(b.dw);
            this.ap = b.ew;
            this.ye = this.Bk(b.ew);
            this.a.b.hb = b.KB;
            this.a.b.li = 0;
            this.wy = b.IB;
            this.a.B.Cj = 0;
            this.Bj = b.Mr;
            this.Vt = 0;
            this.Wt = $a.XG[b.HB];
            this.Xt = b.JB;
            this.Jl = 0;
            this.Xj = this.a.c.Zb(this.a);
            this.a.Ag = 0;
            this.a.Bg = 0;
            this.ro(b);
            this.a.b.N = !0
        },
        move: function() {
            var a, b, c;
            this.a.c.sl = 1;
            if (0 == this.uh) {
                this.a.B.Aj = !1;
                a = this.a.c.ad[this.a.b.mi - 1] & 15;
                b = 0;
                0 != (a & 8) && (b = -1);
                0 != (a & 4) && (b = 1);
                if (0 != b) {
                    c = this.Xt;
                    0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc);
                    for (this.Jl += c; 100 < this.Jl; )
                        this.Jl -= 100,
                        this.Xj += b,
                        this.Xj &= 31,
                        this.a.b.Ya = this.Xj & this.Wt;
                    this.a.b.N = !0
                }
                c = 0;
                0 != this.a.B.Cj ? (0 != (a & 1) && (c = 1),
                0 != (a & 2) && (c = 2)) : (0 != (a & 1) && (c = 2),
                0 != (a & 2) && (c = 1));
                for (b = this.Dd; ; ) {
                    if (0 != (c & 1)) {
                        if (0 == this.Dd) {
                            if (0 == this.wy)
                                break;
                            if (0 != (this.Vt & 3))
                                break;
                            this.a.B.Cj ^= 1;
                            c = this.$g;
                            0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc);
                            b += c;
                            c = b >> 8;
                            c > this.a.b.hb && (this.Dd = b = this.a.b.hb << 8);
                            this.Dd = b;
                            break
                        }
                        c = this.ye;
                        0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc);
                        b -= c;
                        0 > b && (b = 0);
                        this.Dd = b
                    } else
                        0 != (c & 2) && (c = this.$g,
                        0 != (this.a.c.A.Xb & H.Uc) && (c *= this.a.c.Hc),
                        b += c,
                        c = b >> 8,
                        c > this.a.b.hb && (this.Dd = b = this.a.b.hb << 8),
                        this.Dd = b);
                    break
                }
                this.Vt = a;
                this.a.b.ca = this.Dd >> 8;
                this.a.b.ve = r.Lc;
                null != this.a.ea && this.a.ea.We();
                a = this.a.c.Zb(this.a);
                0 != this.a.B.Cj && (a = a + 16 & 31);
                if (0 == this.dj(this.a.b.ca, a))
                    return
            }
            do {
                if (0 == this.uh)
                    break;
                if (0 == this.a.c.sl)
                    break;
                b = this.Dd;
                b -= this.ye;
                if (0 >= b) {
                    this.uh = this.Dd = 0;
                    break
                }
                this.Dd = b;
                b >>= 8;
                a = this.a.c.Zb(this.a);
                0 != this.uh && (a += 16,
                a &= 31);
                if (0 == this.dj(b, a))
                    break
            } while (1)
        },
        reverse: function() {},
        stop: function() {
            this.Dd = this.uh = 0;
            this.a.B.Cj = 0;
            this.gg == this.a.c.we && (this.to(0 != (this.Bj & N.sn)),
            this.a.B.U = !0)
        },
        start: function() {
            this.Pb = 0;
            this.a.B.U = !0
        },
        sg: function() {
            this.gg == this.a.c.we && this.to(0 != (this.Bj & N.sn));
            this.a.c.Ob != this.vy && (this.uh = this.a.B.Cj,
            this.a.B.Cj = 0,
            this.uh++,
            16 <= this.uh ? this.stop() : (this.a.B.U = !0,
            this.a.B.Aj = !0))
        },
        Se: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.hb && (a = this.a.b.hb);
            this.Dd = a << 8;
            this.a.B.U = !0
        },
        dh: function(a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.hb = a;
            a <<= 8;
            this.Dd > a && (this.Dd = a);
            this.a.B.U = !0
        },
        Qs: function(a) {
            this.Xt = a
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0,
            this.a.b.Sa = !0)
        },
        Af: function(a) {
            this.Xj = a;
            this.a.b.Ya = a & this.Wt
        }
    });
    ab.prototype = p.extend(new N, {
        $: function(a) {
            this.a = a;
            this.a.b.ca = 0;
            this.a.b.Sa = !0;
            this.a.b.N = !0
        },
        move: function() {
            null != this.a.ea && this.a.ea.We();
            this.a.b.Sa && (this.a.b.Sa = !1,
            this.a.c.$f(this.a))
        },
        gc: function(a) {
            this.a.v != a && (this.a.v = a,
            this.a.B.U = !0,
            this.a.b.N = !0);
            this.a.b.Sa = !0
        },
        hc: function(a) {
            this.a.u != a && (this.a.u = a,
            this.a.B.U = !0,
            this.a.b.N = !0);
            this.a.b.Sa = !0
        },
        Af: function() {},
        reverse: function() {},
        stop: function() {},
        start: function() {},
        sg: function() {},
        Se: function() {},
        dh: function() {}
    });
    (function(a) {
        this.Ld = a
    }
    ).prototype = p.extend(new N, {
        $: function(a, b) {
            this.a = a;
            a.c.h.file.ug(b.data);
            this.a.b.Sa = !0;
            this.a.b.N = !0
        },
        Db: function() {
            this.Ld.Db()
        },
        move: function() {
            this.Ld.move() && (this.a.b.N = !0)
        },
        stop: function() {
            this.Ld.stop(this.gg == this.a.c.we)
        },
        start: function() {
            this.Ld.start()
        },
        sg: function() {
            this.Ld.sg(this.gg == this.a.c.we)
        },
        Se: function(a) {
            this.Ld.Se(a)
        },
        dh: function(a) {
            this.Ld.dh(a)
        },
        reverse: function() {
            this.Ld.reverse()
        },
        gc: function(a) {
            this.Ld.gc(a);
            this.a.b.N = !0;
            this.a.b.Sa = !0
        },
        hc: function(a) {
            this.Ld.hc(a);
            this.a.b.N = !0;
            this.a.b.Sa = !0
        },
        Af: function(a) {
            this.Ld.Af(a);
            this.a.b.N = !0;
            this.a.b.Sa = !0
        },
        iz: function() {
            return 0
        }
    });
    Ia.cF = 1;
    Ia.dF = 2;
    Ia.KN = 4;
    Ia.prototype = {
        $: function(a, b, c, d, e) {
            null != this.ta && this.ta.Db();
            null != d && (b.b.Ya = d.rz);
            this.mx = b.Wb.vw;
            d = b.b.Ec;
            b.b.Ec = -1;
            if (null != c.nf && a < c.nf.xo) {
                c = c.nf.fd[a];
                this.cp = a;
                -1 == e && (e = c.so);
                b.b.Ec = e;
                switch (e) {
                case 0:
                    this.ta = new ab;
                    break;
                case 1:
                    this.ta = new ve;
                    break;
                case 2:
                    this.ta = new $a;
                    break;
                case 3:
                    this.ta = new ue;
                    break;
                case 4:
                    this.ta = new ua;
                    break;
                case 5:
                    this.ta = new we;
                    break;
                case 9:
                    this.ta = new T;
                    break;
                case 14:
                    this.ta = null,
                    null == this.ta && (this.ta = new ab)
                }
                b.b.Ya = this.Tu(b, c.SB, b.b.Ya);
                this.ta.$(b, c)
            }
            d != b.b.Ec && d == V.Yt && b.c.Oz();
            -1 == b.b.Ec && (b.b.Ec = 0,
            this.ta = new ab,
            this.ta.$(b, null),
            b.b.Ya = 0)
        },
        IJ: function(a, b, c) {
            null != this.ta && this.ta.Db();
            a.b.Ec = b;
            switch (b) {
            case 11:
                this.ta = new te;
                break;
            case 13:
                this.ta = new se
            }
            this.ta.a = a;
            0 == c && this.ta.$(a, null)
        },
        Db: function() {
            this.ta.Db()
        },
        move: function() {
            this.ta.move()
        },
        Tu: function(a, b, c) {
            if (0 > c || 32 <= c) {
                var d = 0, e = b, f;
                for (c = 0; 32 > c; c++)
                    f = e,
                    e >>= 1,
                    0 != (f & 1) && d++;
                if (0 == d)
                    c = 0;
                else
                    for (d = a.c.random(d),
                    e = b,
                    c = 0; !(f = e,
                    e >>= 1,
                    0 != (f & 1) && (d--,
                    0 > d)); c++)
                        ;
            }
            return c
        }
    };
    Oa.sO = 2;
    Oa.tO = 4;
    Oa.YF = 8;
    Oa.prototype = p.extend(new Ca, {
        Yn: function() {
            return 0
        },
        Pu: function(a) {
            this.MA = a.o();
            this.Bc = p.mC(a.Nb());
            0 == this.Bc.length && (this.Bc = "Ini.ini");
            a = 0;
            this.MA & Oa.YF && (a |= ma.jy);
            this.Oc = new ma(this.O.h,a);
            this.Ge = "Group";
            this.im = "Item";
            this.oe = 0;
            return !1
        },
        rv: function() {
            0 < this.oe && (this.oe--,
            0 == this.oe && this.Oc.gp());
            return 0
        },
        Su: function() {
            this.Oc.gp()
        },
        action: function(a, b) {
            switch (a) {
            case 0:
                this.aH(b);
                break;
            case 1:
                this.bH(b);
                break;
            case 2:
                this.fH(b);
                break;
            case 3:
                this.ZG(b);
                break;
            case 4:
                this.qG(b);
                break;
            case 5:
                this.cH(b);
                break;
            case 6:
                this.$G(b);
                break;
            case 7:
                this.hH(b);
                break;
            case 8:
                this.gH(b);
                break;
            case 9:
                this.eH(b);
                break;
            case 10:
                this.dH(b);
                break;
            case 11:
                this.bF(b);
                break;
            case 12:
                this.aF(b);
                break;
            case 13:
                this.$E(b)
            }
        },
        aH: function(a) {
            this.Ge = a.Cb(this.O, 0)
        },
        bH: function(a) {
            this.im = a.Cb(this.O, 0)
        },
        fH: function(a) {
            a = a.cm(this.O, 0).toString();
            this.Oc.zl(this.Ge, this.im, a, this.Bc);
            this.oe = 10
        },
        ZG: function(a) {
            a = a.mv(this.O, 0);
            this.Oc.zl(this.Ge, "pos." + a.Wb.mj, a.v.toString() + "," + a.u.toString(), this.Bc);
            this.oe = 10
        },
        qG: function(a) {
            a = a.mv(this.O, 0);
            var b = this.Oc.Gk(this.Ge, "pos." + a.Wb.mj, "X", this.Bc);
            if ("X" != b) {
                var c = b.indexOf(",")
                  , d = b.substring(c + 1);
                a.v = parseInt(b.substring(0, c), 10);
                isNaN(a.v) && (a.v = 0);
                a.u = parseInt(d, 10);
                isNaN(a.u) && (a.u = 0);
                a.b.N = !0;
                a.b.Sa = !0
            }
        },
        cH: function(a) {
            a = a.Cb(this.O, 0);
            this.Oc.zl(this.Ge, this.im, a, this.Bc);
            this.oe = 10
        },
        $G: function(a) {
            this.Bc = p.mC(a.Cb(this.O, 0))
        },
        hH: function(a) {
            var b = a.Cb(this.O, 0);
            a = a.cm(this.O, 1).toString();
            this.Oc.zl(this.Ge, b, a, this.Bc);
            this.oe = 10
        },
        gH: function(a) {
            var b = a.Cb(this.O, 0)
              , c = a.Cb(this.O, 1);
            a = a.cm(this.O, 2).toString();
            this.Oc.zl(b, c, a, this.Bc);
            this.oe = 10
        },
        eH: function(a) {
            var b = a.Cb(this.O, 0);
            a = a.Cb(this.O, 1);
            this.Oc.zl(this.Ge, b, a, this.Bc);
            this.oe = 10
        },
        dH: function(a) {
            var b = a.Cb(this.O, 0)
              , c = a.Cb(this.O, 1);
            a = a.Cb(this.O, 2);
            this.Oc.zl(b, c, a, this.Bc);
            this.oe = 10
        },
        bF: function(a) {
            this.Oc.Kz(this.Ge, a.Cb(this.O, 0), this.Bc);
            this.oe = 10
        },
        aF: function(a) {
            this.Oc.Kz(a.Cb(this.O, 0), a.Cb(this.O, 1), this.Bc);
            this.oe = 10
        },
        $E: function(a) {
            this.Oc.uI(a.Cb(this.O, 0), this.Bc);
            this.oe = 10
        },
        Qn: function(a) {
            switch (a) {
            case 0:
                return this.RF();
            case 1:
                return this.OF();
            case 2:
                return this.TF();
            case 3:
                return this.SF();
            case 4:
                return this.QF();
            case 5:
                return this.PF()
            }
            return null
        },
        RF: function() {
            var a = this.Oc.Gk(this.Ge, this.im, "", this.Bc)
              , a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        OF: function() {
            return this.Oc.Gk(this.Ge, this.im, "", this.Bc)
        },
        TF: function() {
            var a = this.R.Ek()
              , a = this.Oc.Gk(this.Ge, a, "", this.Bc)
              , a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        SF: function() {
            var a = this.R.Ek()
              , b = this.R.Ek()
              , a = this.Oc.Gk(a, b, "", this.Bc)
              , a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        QF: function() {
            var a = this.R.Ek();
            return this.Oc.Gk(this.Ge, a, "", this.Bc)
        },
        PF: function() {
            var a = this.R.Ek()
              , b = this.R.Ek();
            return this.Oc.Gk(a, b, "", this.Bc)
        }
    });
    F.Rx = 0;
    F.AE = 1;
    F.DE = 2;
    F.yE = 3;
    F.vE = 4;
    F.xE = 5;
    F.BE = 6;
    F.zE = 7;
    F.wE = 8;
    F.CE = 9;
    F.UD = 0;
    F.TD = 1;
    F.WD = 2;
    F.SD = 3;
    F.VD = 4;
    F.RD = 5;
    F.OD = 6;
    F.ND = 7;
    F.PD = 8;
    F.QD = 9;
    F.XD = 10;
    F.wF = 0;
    F.vF = 1;
    F.xF = 2;
    F.AF = 3;
    F.yF = 4;
    F.zF = 5;
    F.lF = 6;
    F.nF = 7;
    F.mF = 8;
    F.pF = 9;
    F.uF = 10;
    F.rF = 11;
    F.sF = 12;
    F.qF = 13;
    F.tF = 14;
    F.prototype = p.extend(new Ca, {
        Yn: function() {
            return F.CE
        },
        Pu: function() {
            this.ka = [];
            return !0
        },
        Gn: function(a) {
            switch (a) {
            case F.Rx:
                return this.IK();
            case F.AE:
                return this.R.c.h.TA;
            case F.DE:
                return this.R.c.h.ik;
            case F.yE:
                return "Explorer" == this.O.h.Fh.kk;
            case F.vE:
                return "Chrome" == this.O.h.Fh.kk;
            case F.xE:
                return "Firefox" == this.O.h.Fh.kk;
            case F.BE:
                return "Safari" == this.O.h.Fh.kk;
            case F.zE:
                return "Opera" == this.O.h.Fh.kk;
            case F.wE:
                return "Edge" == this.O.h.Fh.kk
            }
            return !1
        },
        HR: function() {
            return this.R.c.h.TA
        },
        IK: function() {
            return 0 != (this.R.X & M.Ft) || this.O.Wo == this.JK ? !0 : !1
        },
        action: function(a, b) {
            switch (a) {
            case F.UD:
                this.yH(b);
                break;
            case F.TD:
                this.xH(b);
                break;
            case F.WD:
                this.FQ(b);
                break;
            case F.SD:
                this.wH(b);
                break;
            case F.VD:
                this.zH(b);
                break;
            case F.RD:
                this.AH();
                break;
            case F.OD:
                this.tH(b);
                break;
            case F.ND:
                this.sH(b);
                break;
            case F.PD:
                this.uH(b);
                break;
            case F.QD:
                this.vH(b);
                break;
            case F.XD:
                this.BH(b)
            }
        },
        BH: function(a) {
            var b = a.Cb(this.O, 0)
              , c = a.cm(this.O, 1);
            a = a.Cb(this.O, 2);
            var d = new Date;
            0 >= c && (c = 1E4);
            d.setTime(d.getTime() + 864E5 * c);
            document.cookie = b + "=" + escape(a) + "; path=/; expires=" + d.toGMTString()
        },
        yH: function(a) {
            a = a.Cb(this.O, 0);
            window.open(a, "_self")
        },
        xH: function(a) {
            a = a.Cb(this.O, 0);
            window.open(a, "_parent")
        },
        OR: function(a) {
            a = a.Cb(this.O, 0);
            window.open(a, "_top")
        },
        wH: function(a) {
            a = a.Cb(this.O, 0);
            window.open(a, "_blank")
        },
        zH: function(a) {
            var b = a.Cb(this.O, 0);
            a = a.Cb(this.O, 1);
            window.open(b, a)
        },
        AH: function() {
            this.ka = null
        },
        tH: function(a) {
            null == this.ka && (this.ka = []);
            a = a.cm(this.O, 0);
            this.ka.push(a)
        },
        uH: function(a) {
            null == this.ka && (this.ka = []);
            a = a.Cb(this.O, 0);
            this.ka.push(a)
        },
        sH: function(a) {
            null == this.ka && (this.ka = []);
            a = a.oJ(this.O, 0);
            this.ka.push(a)
        },
        vH: function(a) {
            null == this.ka && (this.ka = []);
            a = a.Cb(this.O, 0);
            try {
                this.fl = 0 == this.ka.length ? -1 != a.indexOf("(") || -1 != a.indexOf(".") || -1 != a.indexOf("[") ? eval(a) : window[a]() : 11 >= this.ka.length ? window[a](this.ka[0], this.ka[1], this.ka[2], this.ka[3], this.ka[4], this.ka[5], this.ka[6], this.ka[7], this.ka[8], this.ka[9], this.ka[10]) : window[a](this.ka[0], this.ka[1], this.ka[2], this.ka[3], this.ka[4], this.ka[5], this.ka[6], this.ka[7], this.ka[8], this.ka[9], this.ka[10], this.ka[11], this.ka[12], this.ka[13], this.ka[14], this.ka[15], this.ka[16], this.ka[17], this.ka[18], this.ka[19], this.ka[20], this.ka[21], this.ka[22])
            } catch (b) {
                console.log("Error on: " + a + " and msg: " + b.message),
                this.JK = this.R.c.Wo,
                this.R.bJ(F.Rx, 0)
            }
            this.ka = null
        },
        Qn: function(a) {
            switch (a) {
            case F.wF:
                return this.NI();
            case F.vF:
                return this.OI();
            case F.xF:
                return this.QI();
            case F.AF:
                return this.TI();
            case F.yF:
                return this.RI();
            case F.zF:
                return this.SI();
            case F.lF:
                return this.O.h.Fh.kk;
            case F.nF:
                return this.O.h.Fh.version;
            case F.mF:
                return this.O.h.Fh.PG;
            case F.pF:
                return this.MI();
            case F.uF:
                return window.location.href;
            case F.rF:
                return window.location.host;
            case F.sF:
                return window.location.hostname;
            case F.qF:
                return window.location.hash;
            case F.tF:
                return window.location.search
            }
            return 0
        },
        dJ: function(a) {
            var b = document.cookie;
            a += "=";
            if (0 < b.length) {
                var c = b.indexOf(a);
                if (-1 != c)
                    return c += a.length,
                    end = b.indexOf(";", c),
                    -1 == end && (end = b.length),
                    unescape(b.substring(c, end))
            }
            return null
        },
        MI: function() {
            var a = this.R.Ek();
            (a = this.dJ(a)) || (a = "");
            return a
        },
        TI: function() {
            return null != this.O.h.ma ? this.O.h.ma.ff : 0
        },
        RI: function() {
            return null != this.O.h.ma ? this.O.h.ma.Sf : 0
        },
        SI: function() {
            return null != this.O.h.ma && 0 != this.O.h.ma.ff ? 100 * this.O.h.ma.Sf / this.O.h.ma.ff : 0
        },
        QI: function() {
            return "string" == typeof this.fl ? this.fl : ""
        },
        OI: function() {
            return "number" == typeof this.fl ? this.fl : ""
        },
        NI: function() {
            return "number" == typeof this.fl ? p.sd(this.fl) : ""
        }
    });
    be(z, W)
}
;

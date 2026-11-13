var ya = "function" == typeof Object.defineProperties ? Object.defineProperty : function (D, Y, r) {
        if (r.get || r.set) throw new TypeError("ES3 does not support getters and setters.");
        D != Array.prototype && D != Object.prototype && (D[Y] = r.value)
    },
    za = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;

function Da() {
    Da = function () {};
    za.Symbol || (za.Symbol = Ja)
}
var Ka = 0;

function Ja(D) {
    return "jscomp_symbol_" + (D || "") + Ka++
}

function Ua() {
    Da();
    var D = za.Symbol.iterator;
    D || (D = za.Symbol.iterator = za.Symbol("iterator"));
    "function" != typeof Array.prototype[D] && ya(Array.prototype, D, {
        configurable: !0,
        writable: !0,
        value: function () {
            return fb(this)
        }
    });
    Ua = function () {}
}

function fb(D) {
    var Y = 0;
    return gb(function () {
        return Y < D.length ? {
            done: !1,
            value: D[Y++]
        } : {
            done: !0
        }
    })
}

function gb(D) {
    Ua();
    D = {
        next: D
    };
    D[za.Symbol.iterator] = function () {
        return this
    };
    return D
}

function tb(D) {
    Ua();
    var Y = D[Symbol.iterator];
    return Y ? Y.call(D) : fb(D)
}

function ub(D, Y) {
    Ua();
    D instanceof String && (D += "");
    var r = 0,
        R = {
            next: function () {
                if (r < D.length) {
                    var H = r++;
                    return {
                        value: Y(H, D[H]),
                        done: !1
                    }
                }
                R.next = function () {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return R.next()
            }
        };
    R[Symbol.iterator] = function () {
        return R
    };
    return R
}

function gf(D, Y) {
    if (Y) {
        for (var r = za, R = D.split("."), H = 0; H < R.length - 1; H++) {
            var Q = R[H];
            Q in r || (r[Q] = {});
            r = r[Q]
        }
        R = R[R.length - 1];
        H = r[R];
        Q = Y(H);
        Q != H && null != Q && ya(r, R, {
            configurable: !0,
            writable: !0,
            value: Q
        })
    }
}
gf("Array.prototype.values", function (D) {
    return D ? D : function () {
        return ub(this, function (D, r) {
            return r
        })
    }
});

function hf(D, Y) {
    return Object.prototype.hasOwnProperty.call(D, Y)
}
gf("WeakMap", function (D) {
    function Y(r) {
        this.Oo = (Q += Math.random() + 1).toString();
        if (r) {
            Da();
            Ua();
            r = tb(r);
            for (var G; !(G = r.next()).done;) G = G.value, this.set(G[0], G[1])
        }
    }

    function r(r) {
        hf(r, H) || ya(r, H, {
            value: {}
        })
    }

    function R(D) {
        var G = Object[D];
        G && (Object[D] = function (D) {
            r(D);
            return G(D)
        })
    }
    if (function () {
            if (!D || !Object.seal) return !1;
            try {
                var r = Object.seal({}),
                    G = Object.seal({}),
                    H = new D([
                        [r, 2],
                        [G, 3]
                    ]);
                if (2 != H.get(r) || 3 != H.get(G)) return !1;
                H["delete"](r);
                H.set(G, 4);
                return !H.has(r) && 4 == H.get(G)
            } catch (oa) {
                return !1
            }
        }()) return D;
    var H = "$jscomp_hidden_" + Math.random().toString().substring(2);
    R("freeze");
    R("preventExtensions");
    R("seal");
    var Q = 0;
    Y.prototype.set = function (D, G) {
        r(D);
        if (!hf(D, H)) throw Error("WeakMap key fail: " + D);
        D[H][this.Oo] = G;
        return this
    };
    Y.prototype.get = function (r) {
        return hf(r, H) ? r[H][this.Oo] : void 0
    };
    Y.prototype.has = function (r) {
        return hf(r, H) && hf(r[H], this.Oo)
    };
    Y.prototype["delete"] = function (r) {
        return hf(r, H) && hf(r[H], this.Oo) ? delete r[H][this.Oo] : !1
    };
    return Y
});
gf("Map", function (D) {
    function Y() {
        var r = {};
        return r.Ai = r.next = r.head = r
    }

    function r(r, D) {
        var G = r.di;
        return gb(function () {
            if (G) {
                for (; G.head != r.di;) G = G.Ai;
                for (; G.next != G.head;) return G = G.next, {
                    done: !1,
                    value: D(G)
                };
                G = null
            }
            return {
                done: !0,
                value: void 0
            }
        })
    }

    function R(r, D) {
        var G;
        G = D && typeof D;
        "object" == G || "function" == G ? Q.has(D) ? G = Q.get(D) : (G = "" + ++aa, Q.set(D, G)) : G = "p_" + D;
        var H = r.so[G];
        if (H && hf(r.so, G))
            for (var R = 0; R < H.length; R++) {
                var Y = H[R];
                if (D !== D && Y.key !== Y.key || D === Y.key) return {
                    id: G,
                    list: H,
                    index: R,
                    ke: Y
                }
            }
        return {
            id: G,
            list: H,
            index: -1,
            ke: void 0
        }
    }

    function H(r) {
        this.so = {};
        this.di = Y();
        this.size = 0;
        if (r) {
            r = tb(r);
            for (var G; !(G = r.next()).done;) G = G.value, this.set(G[0], G[1])
        }
    }
    if (function () {
            if (!D || !D.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var r = Object.seal({
                        x: 4
                    }),
                    H = new D(tb([
                        [r, "s"]
                    ]));
                if ("s" != H.get(r) || 1 != H.size || H.get({
                        x: 4
                    }) || H.set({
                        x: 4
                    }, "t") != H || 2 != H.size) return !1;
                var Q = H.entries(),
                    R = Q.next();
                if (R.done || R.value[0] != r || "s" != R.value[1]) return !1;
                R = Q.next();
                return R.done || 4 != R.value[0].x || "t" != R.value[1] ||
                    !Q.next().done ? !1 : !0
            } catch (La) {
                return !1
            }
        }()) return D;
    Da();
    Ua();
    var Q = new WeakMap;
    H.prototype.set = function (r, D) {
        var G = R(this, r);
        G.list || (G.list = this.so[G.id] = []);
        G.ke ? G.ke.value = D : (G.ke = {
            next: this.di,
            Ai: this.di.Ai,
            head: this.di,
            key: r,
            value: D
        }, G.list.push(G.ke), this.di.Ai.next = G.ke, this.di.Ai = G.ke, this.size++);
        return this
    };
    H.prototype["delete"] = function (r) {
        r = R(this, r);
        return r.ke && r.list ? (r.list.splice(r.index, 1), r.list.length || delete this.so[r.id], r.ke.Ai.next = r.ke.next, r.ke.next.Ai = r.ke.Ai, r.ke.head =
            null, this.size--, !0) : !1
    };
    H.prototype.clear = function () {
        this.so = {};
        this.di = this.di.Ai = Y();
        this.size = 0
    };
    H.prototype.has = function (r) {
        return !!R(this, r).ke
    };
    H.prototype.get = function (r) {
        return (r = R(this, r).ke) && r.value
    };
    H.prototype.entries = function () {
        return r(this, function (r) {
            return [r.key, r.value]
        })
    };
    H.prototype.keys = function () {
        return r(this, function (r) {
            return r.key
        })
    };
    H.prototype.values = function () {
        return r(this, function (r) {
            return r.value
        })
    };
    H.prototype.forEach = function (r, D) {
        for (var G = this.entries(), H; !(H =
                G.next()).done;) H = H.value, r.call(D, H[1], H[0], this)
    };
    H.prototype[Symbol.iterator] = H.prototype.entries;
    var aa = 0;
    return H
});
gf("Array.prototype.keys", function (D) {
    return D ? D : function () {
        return ub(this, function (D) {
            return D
        })
    }
});
gf("Array.prototype.entries", function (D) {
    return D ? D : function () {
        return ub(this, function (D, r) {
            return [D, r]
        })
    }
});
gf("Array.prototype.fill", function (D) {
    return D ? D : function (D, r, R) {
        var H = this.length || 0;
        0 > r && (r = Math.max(0, H + r));
        if (null == R || R > H) R = H;
        R = Number(R);
        0 > R && (R = Math.max(0, H + R));
        for (r = Number(r || 0); r < R; r++) this[r] = D;
        return this
    }
});
window.Runtime = function (D, Y) {
    function r(a, b) {
        this.files = {};
        this.root = "";
        a && this.load(a, b)
    }

    function R(a, b, c) {
        this.x = a;
        this.y = b;
        this.text = c
    }

    function H() {
        this.zd = "";
        this.offset = this.U = 0;
        this.yd = !1
    }

    function Q() {
        this.Nd = []
    }

    function aa(a, b, c, d) {
        this.left = a ? a : 0;
        this.top = b ? b : 0;
        this.right = c ? c : 0;
        this.bottom = d ? d : 0
    }

    function G() {
        this.y = this.x = 0
    }

    function Va() {
        this.pb = 12;
        this.Ae = 400;
        this.ze = 0;
        this.oe = "Arial";
        this.tj = !1
    }

    function oa(a, b) {
        this.app = a;
        this.Oa = b;
        this.fb = new Q;
        this.Nk = null
    }

    function ga(a, b, c) {
        this.app =
            a;
        this.width = b;
        this.height = c;
        this.canvas = document.createElement("canvas");
        this.canvas.width = b;
        this.canvas.height = c;
        this.ge = this.canvas.getContext("2d")
    }

    function La() {
        this.QL = !!window.opr && !!opr.WS || !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
        this.PL = "undefined" !== typeof InstallTrigger;
        this.SL = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString();
        this.ZB = !!document.documentMode;
        this.ML = !this.ZB && !!window.StyleMedia;
        (this.NL = (this.XB = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && -1 != navigator.userAgent.indexOf("Edg")) || this.XB || this.ML || this.ZB || this.PL || this.QL || this.SL || this.sE(La.yK);
        this.version = this.tE(navigator.userAgent) || this.tE(navigator.appVersion) || "Unknown version";
        this.sE(La.AK)
    }

    function Aa() {
        this.wv = null;
        this.height = this.width = 0;
        this.Wg = null;
        this.Oa = this.color = 0;
        this.cL = null;
        this.As = this.pw = this.LL = this.sB = this.Sd = 0;
        this.vv = null;
        this.tj = !0
    }

    function Z() {}

    function vb() {
        this.Oa = 0;
        this.name = null;
        this.index = 0
    }

    function ia() {}

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

    function dc() {}

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

    function N() {}

    function wa() {}

    function tc() {}

    function N() {}

    function uc() {}

    function vc() {}

    function wc() {}

    function xc() {}

    function yc() {}

    function zc() {}

    function Ac() {}

    function Bc() {}

    function Cc() {}

    function Dc() {}

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

    function hb() {}

    function Tc() {}

    function Uc() {}

    function Vc() {}

    function Wc() {}

    function Xc() {}

    function Yc() {}

    function Zc() {}

    function $c() {}

    function ad() {}

    function bd() {}

    function cd() {}

    function dd() {}

    function da() {}

    function ib() {}

    function xa() {}

    function jb() {}

    function ed() {}

    function fd() {}

    function gd() {}

    function hd() {}

    function id() {}

    function jd() {}

    function kd() {}

    function ld() {}

    function md() {}

    function nd() {}

    function od() {}

    function pd() {}

    function qd() {}

    function rd() {}

    function sd() {}

    function td() {}

    function ud() {}

    function vd() {}

    function wd() {}

    function xd() {}

    function yd() {}

    function zd() {}

    function Ad() {}

    function Bd() {}

    function Cd() {}

    function kb() {
        la.$b.iM()
    }

    function Dd() {
        la.$b.nM()
    }

    function p(a, b, c, d) {
        (this.bC = !0 === d) ? (this.canvas = a.canvas, this.Js = a.Js) : "string" ===
        typeof a ? (this.canvas = document.getElementById(a), this.Js = this.canvas.parentElement) : a instanceof HTMLElement && (this.canvas = document.createElement("canvas"), this.Js = a);
        a = this.zv = a.zv || document.createElement("div");
        a.appendChild(this.canvas);
        this.Js.appendChild(a);
        a.style.overflow = "hidden";
        a.style.position = "relative";
        a.style.transform = "translateZ(0)";
        a.style.margin = "0";
        a.style.padding = "0";
        a.style.display = "block";
        a.style.boxSizing = "content-box";
        a.className = "MMFDiv";
        this.uB = this.vB = this.Uv = null;
        this.Bm =
            0;
        this.appName = this.Vv = null;
        this.Rm = 0;
        this.gw = this.OB = null;
        this.fp = 0;
        this.JE = this.mc = this.Me = this.ac = this.ia = this.zc = this.fw = null;
        this.jb = this.KE = 0;
        this.Do = this.Eo = this.xD = this.Tp = this.Uo = null;
        this.Re = this.Lb = this.iy = 0;
        this.Ha = this.file = this.frame = null;
        this.sx = this.tx = this.ul = 0;
        this.zi = this.I = null;
        this.Fw = !1;
        this.yB = this.bg = this.xB = this.zB = this.AB = this.Ca = this.va = this.Go = this.Fo = this.Cg = this.Bg = 0;
        this.Bo = this.ux = this.wD = null;
        this.mg = this.lg = this.xK = this.wK = this.Co = 0;
        this.cd = null;
        this.MA = 0;
        this.cursor =
            "auto";
        this.Vs = !1;
        this.Tk = this.Ar = null;
        this.yd = !1;
        this.La = this.alpha = this.je = this.ie = this.RA = this.hk = this.fk = 0;
        this.file = b;
        this.Qj = "";
        this.path = c;
        b = c.lastIndexOf("/");
        0 <= b && (this.Qj = c.substring(0, b + 1));
        this.Rg = 0;
        this.I = null;
        this.ei = this.fi = this.Ec = 0;
        this.dl = !1;
        this.Pb = [];
        this.tp = -1;
        this.Ps = this.xl = this.BD = this.DD = this.CD = this.AD = this.zD = 0;
        this.Ag = this.ud = this.ny = this.transition = null;
        this.lv = !1;
        this.Bh = this.Ah = this.Nf = null;
        this.Zo = p.Dk;
        this.Ea = null;
        this.JJ = this.Zu = this.Yu = this.MJ = this.LJ = this.KJ = this.bo =
            this.ii = 0;
        this.xc = this.yc = 1;
        this.hasFocus = !0;
        this.Ur = this.mv = !1;
        this.hw = this.Qs = null;
        this.Wr = -1;
        this.Ro = null;
        this.Qo = 1E9;
        this.Vr = null;
        0 <= window.location.href.indexOf("192.") && (b = window.location.href.indexOf("21700/"), 0 <= b && (this.Vr = window.location.href.substring(0, b + 6), this.Wr = -1, this.Qo = 25));
        this.Mg = !1;
        this.zK = 3;
        this.ro = new Q;
        this.xr = new Q;
        this.Vb = [];
        this.qe = 0;
        this.jf = null;
        this.Kw = "Please touch the screen to start";
        this.fullScreen = !1;
        this.cF = "***version***";
        this.ry = this.gq = 0
    }

    function Wa(a, b, c) {
        this.changedTouches =
            Array(1);
        this.changedTouches[0] = {
            pageX: a,
            pageY: b,
            target: c,
            identifier: p.az
        }
    }

    function E(a) {
        this.app = a;
        this.o = null;
        this.dC = this.dd = this.ne = 0;
        this.bs = !1;
        this.cc = 0;
        this.cs = null;
        this.So = this.To = 0;
        this.wB = null;
        this.uc = 0;
        this.xo = this.Kd = this.Za = null;
        this.iC = this.ss = this.xw = this.ww = this.vj = this.uj = this.bh = 0;
        this.Fd = this.Ed = this.Yo = this.Pv = this.zo = null;
        this.Im = this.Ea = this.qe = 0
    }

    function ba(a) {
        this.app = a;
        this.Sa = null;
        this.hv = !1;
        this.Xz = !0;
        this.ho = this.En = null;
        this.lC = 0;
        this.Ok = null;
        this.Gv = !1;
        this.Sa = Array(ba.Uc);
        this.En = Array(ba.Uc);
        this.ho = Array(ba.Uc);
        this.hv = this.Xz = !0;
        var b;
        for (b = 0; b < ba.Uc; b++) this.Sa[b] = null, this.En[b] = 100, this.ho[b] = !1;
        this.lC = 100;
        b = new Audio;
        var c = Array(4);
        c[0] = b.canPlayType("audio/ogg");
        c[1] = b.canPlayType("audio/x-m4a");
        c[2] = b.canPlayType("audio/mpeg");
        c[3] = b.canPlayType("audio/wav");
        for (b = this.Lw = this.Ax = 0; 4 > b; b++) "probably" == c[b] && (this.Ax |= 1 << b), "maybe" == c[b] && (this.Lw |= 1 << b);
        for (; null != a.Ha;) a = a.Ha;
        this.context = a.JE;
        this.tm = a.KE;
        null == this.context && ("undefined" !== typeof AudioContext ?
            (this.context = new AudioContext, this.tm = 1) : "undefined" !== typeof webkitAudioContext && (this.context = new webkitAudioContext, this.tm = 0), a.JE = this.context, a.KE = this.tm)
    }

    function Ed(a) {
        this.app = a
    }

    function Fd(a) {
        this.app = a;
        this.tw = !1;
        this.C = null;
        this.context = this.app.context;
        this.Hf = this.app.CD;
        this.color = this.app.BD;
        this.Ni = this.app.zD;
        0 > this.Ni && (this.Ni = this.app.va / 2);
        this.Oi = this.app.AD;
        0 > this.Oi && (this.Oi = this.app.Ca / 2);
        this.size = this.app.DD;
        this.lx = 0;
        this.rr = 25;
        this.af = 0;
        this.Wg = new Image;
        var b = this;
        this.Wg.onload = function () {
            b.tw = !0
        };
        this.Wg.src = this.app.Qj + "Preloader.png"
    }

    function Gd(a) {
        this.app = a;
        this.context = this.app.context;
        this.width = 100;
        this.height = 12;
        this.position = 0;
        this.ZJ = 10526880;
        this.borderColor = 8421504;
        this.$J = 0;
        this.rect = new aa;
        this.rect.left = this.app.va / 2 - this.width / 2;
        this.rect.top = this.app.Ca / 2 - this.height / 2;
        this.rect.right = this.rect.left + this.width;
        this.rect.bottom = this.rect.top + this.height;
        this.reset()
    }

    function Hd(a) {
        this.app = a;
        this.tw = !1;
        this.Vc = new Ea;
        this.C = new p(this.app,
            this.app.file, this.app.path, !0);
        this.C.wE(this.app, this.app.Ps, 0, this.Vc, this.app.va, this.app.Ca);
        this.C.digest();
        this.C.Fw = !1;
        this.C.Li = !1;
        this.C.La &= ~p.Qi;
        this.C.hy();
        this.C.Ct(0, 0);
        this.C.$p();
        this.Vc.x = this.app.va / 2 - this.C.frame.ne / 2;
        this.Vc.y = this.app.Ca / 2 - this.C.frame.dd / 2;
        this.eO = 0 != (this.app.La & p.FF);
        this.app.Pb.push(this.C);
        this.xm = 0
    }

    function v(a) {
        this.app = a;
        this.qB = this.pB = this.me = this.Qd = this.as = this.rc = null;
        this.hc = Array(3);
        this.ic = Array(3);
        this.Oa = this.Ea = this.hg = this.gg = 0;
        this.touches =
            Array(3);
        this.jv = !1;
        this.$B = !0;
        this.vf = this.Xg = this.cC = 0
    }

    function k(a) {
        this.h = a;
        this.B = null;
        this.th = this.ub = this.wn = this.ay = this.Bb = this.Pc = this.Yc = this.$x = this.Lf = 0;
        this.i = this.X = null;
        this.ff = this.Gp = this.Ip = this.Ol = this.vg = this.Xb = this.Zx = this.Ii = this.Hp = this.Pl = this.fa = this.ca = this.ae = this.$d = 0;
        this.kn = this.gt = this.ht = null;
        this.ot = this.Sx = this.qn = this.mn = this.sn = this.on = this.pn = this.ln = this.rn = this.nn = this.Jl = this.He = this.Ll = this.Kl = this.Il = this.Hl = this.VD = this.ug = this.Tj = this.Sj = this.Dp = this.Fl =
            0;
        this.Ml = null;
        this.ba = this.vn = this.rt = this.qt = this.kt = this.Tx = this.ZD = 0;
        this.nt = this.un = this.ma = null;
        this.Dc = 0;
        this.mt = this.Vj = null;
        this.tn = 0;
        this.Nl = null;
        this.Oc = 0;
        this.Us = null;
        this.io = !1;
        this.H = null;
        this.qw = Array(2);
        this.rf = !1;
        this.lB = 0;
        this.Yx = 255;
        this.Ws = this.CM = !1
    }

    function Id() {
        this.hK = null;
        this.rA = this.oA = this.nA = this.qA = this.pA = this.pr = 0
    }

    function S() {
        this.kx = this.ix = this.lb = this.rd = this.hb = this.fd = 0;
        this.rg = !1;
        this.qp = this.oD = this.pD = this.rl = this.Xm = this.Xd = this.Is = this.Id = this.Mb = this.Ij =
            this.kh = this.Gj = this.gx = this.fx = this.lh = 0;
        this.Hj = this.Ym = null;
        this.hx = 0;
        this.Fj = null;
        this.jx = 0;
        this.Ef = null
    }

    function jf() {
        this.Ze = this.name = null
    }

    function kf() {
        this.value = null;
        this.vt = this.wt = this.Zc = this.xb = 0
    }

    function lf() {
        this.text = null;
        this.xb = 0
    }

    function mf() {
        this.fb = this.values = null;
        this.Oa = 0
    }

    function fa() {
        this.vM = 0;
        this.tM = null;
        this.uM = 0;
        this.O = this.G = null
    }

    function B() {
        this.dj = this.Vh = this.fe = null
    }

    function Qa() {
        this.Uf = 0;
        this.cj = this.Vf = null
    }

    function Jd() {
        this.om = this.Qz = this.Pz = this.$u = this.av =
            0;
        this.Ek = null
    }

    function Ma() {
        this.a = null;
        this.Mj = this.Ys = this.ph = 0;
        this.Ap = !1;
        this.Bi = 0;
        this.Fe = null;
        this.Zs = this.Xs = 0;
        this.zp = null;
        this.en = this.zl = this.Yd = this.bf = this.LD = this.Al = this.cn = this.yp = this.KD = this.dn = this.Lj = this.Hx = 0;
        this.MD = -1
    }

    function Kd(a, b) {
        this.ia = a;
        this.app = a.app;
        this.handle = b
    }

    function Ld(a) {
        this.app = a;
        this.images = this.file = null;
        this.zf = this.mi = this.Kb = 0;
        this.wi = this.Vb = this.xi = this.Fk = this.cl = this.Ci = this.Xa = this.Da = this.ql = null
    }

    function ca() {
        this.app = null;
        this.Xa = this.Fh = this.Eh =
            this.Ga = this.Ja = this.height = this.width = this.handle = 0;
        this.ji = this.kl = this.wf = this.zb = null;
        this.Po = this.Fd = this.Ed = this.Ab = 0
    }

    function Md(a) {
        this.app = a;
        this.Gs = this.fonts = this.file = null;
        this.li = 0;
        this.Da = null;
        this.ah = this.pe = 0;
        this.Xa = null;
        this.ip = new Ba;
        this.ip.tr()
    }

    function Ba() {
        this.ze = this.Ae = this.pb = this.handle = this.Xa = 0;
        this.font = this.oe = null;
        this.tj = !1
    }

    function Nd(a) {
        this.app = a;
        this.ak = null;
        this.gp = this.mi = this.Kb = 0;
        this.file = this.Xa = this.Da = this.Hs = null
    }

    function Xa(a) {
        this.$b = a;
        this.context =
            a.mc.context;
        this.tm = a.mc.tm;
        this.eL = a.mc.eL;
        this.type = 0;
        this.file = a.file;
        this.handle = -1;
        this.yb = this.source = null;
        this.Xa = 0;
        this.ko = !1;
        this.ni = 0;
        this.name = null;
        this.gj = this.Gk = !1;
        this.frequency = 0;
        this.gain = this.response = null;
        this.volume = 100
    }

    function lb(a) {
        this.name = a;
        this.$M = [];
        this.position = 0;
        this.ks = !1
    }

    function J(a) {
        this.$b = a;
        this.o = null;
        this.dD = this.bh = 0;
        this.nl = Array(z.kd + z.xz);
        this.ep = this.fh = 0;
        this.el = this.qf = this.oc = this.sc = this.hd = this.gd = this.Ad = this.oh = null;
        this.ef = Array(z.kd + 1);
        this.$D = !1;
        this.mf = null;
        this.vp = this.xp = this.up = this.wp = 0;
        this.Fp = !1;
        this.df = null;
        this.st = 0;
        this.pt = Array(4);
        this.jn = this.Dl = this.Rj = !1;
        this.lt = this.Fi = this.Cl = this.Ob = 0;
        this.WD = this.sh = !1;
        this.qh = null;
        this.Ep = this.Kf = this.rh = 0;
        this.El = this.Gi = null;
        this.Wc = 0;
        this.Nc = !1;
        this.ft = this.Xx = this.Gb = this.Wx = 0;
        this.Vx = null;
        this.jo = !1;
        this.Uj = null;
        this.AN = 0;
        this.Gl = null;
        this.qv = !1;
        this.qC = 0;
        this.xv = null;
        this.nr = [];
        this.wm = L.HG;
        this.Gf = this.Ff = null
    }

    function L() {
        this.zm = this.nj = this.ra = this.le = this.Hb = 0;
        this.bb = null;
        this.RK = 0
    }

    function W() {}

    function nf() {
        this.gB = this.id = 0
    }

    function of() {
        this.Ss = this.Rs = 0
    }

    function pf(a, b, c, d, e) {
        this.CN = a;
        this.code = b;
        this.RM = c;
        this.QM = d;
        this.Df = e
    }

    function Od() {
        this.Bx = this.Ts = this.Jj = this.bn = this.Kj = this.mh = 0;
        this.Cx = this.sg = !1;
        this.L = null
    }

    function mb() {
        this.next = null;
        this.type = 0;
        this.name = null;
        this.index = this.js = this.aq = this.jO = this.Ec = 0;
        this.gv = !1
    }

    function Ca() {
        this.es = this.eC = this.zw = this.Bw = this.Aw = this.jg = this.wj = 0;
        this.yw = null;
        this.yw = Array(4);
        var a;
        for (a = 0; 4 > a; a++) this.yw[a] =
            null
    }

    function Pd() {
        this.Da = this.list = null;
        this.ds = this.ng = 0
    }

    function X(a) {
        this.app = a;
        this.Rk = this.Pk = this.ct = this.bt = this.y = this.x = 0;
        this.ir = this.$m = this.Zm = null;
        this.xe = !1;
        this.tl = null;
        this.aA = this.$z = this.cA = this.bA = this.Zz = this.je = this.ie = this.Bs = this.zs = this.gk = this.ek = this.La = this.Ww = 0;
        this.Va = this.Wb = this.vc = null;
        this.angle = 0;
        this.scale = this.xc = this.yc = 1;
        this.Ja = this.hq = 320;
        this.Ga = this.jq = 240
    }

    function ka(a, b, c, d, e, f) {
        this.app = a;
        this.fM = d;
        this.Bf = this.type = 0;
        this.x = b;
        this.y = c;
        this.height = this.width =
            0;
        this.re = null;
        this.rm = !1;
        this.pd = null;
        this.borderWidth = 0;
        this.borderColor = this.yv = this.Kk = null;
        this.je = this.ie = 0;
        this.G = this.body = null;
        if (d)
            if (this.re = this.app.zc.oj(d.jg), this.type = this.re.$e, this.Bf = this.re.Bc.iD, this.borderWidth = this.re.Bc.Fs, this.PB = this.re.Bc.mp, this.ie = this.re.cx, this.je = this.re.dx, this.width = this.re.Bc.fD, this.height = this.re.Bc.gD, this.rm = 0 != this.re.Bc.eD, this.Kk = this.re.Bc.gh, this.yv = this.re.Bc.Vm, this.borderColor = this.re.Bc.Es, 1 == this.type) this.pd = this.app.ia.Sb(this.re.Bc.oi),
                this.width = this.pd.width, this.height = this.pd.height;
            else {
                if (32 <= this.type) {
                    a = this.app.I;
                    b = null;
                    for (e = c = 0; e < a.ub; e++) {
                        for (; null == a.H[c];) c++;
                        b = a.H[c];
                        c++;
                        if (b.gM == d) break
                    }
                    this.G = b
                }
            }
        else {
            this.type = z.yz;
            this.pd = e;
            this.width = this.pd.width;
            this.height = this.pd.height;
            this.x -= this.pd.Ja;
            this.y -= this.pd.Ga;
            switch (f) {
                case 0:
                    this.Bf = ea.Bz;
                    break;
                case 1:
                    this.Bf = ea.Qq;
                    break;
                case 2:
                    this.Bf = ea.Jg;
                    break;
                case 3:
                    this.Bf = ea.Pu
            }
            this.rm = !1
        }
    }

    function z() {
        this.dx = this.cx = this.ui = this.$e = this.op = 0;
        this.Bc = this.ex = null;
        this.nD =
            this.mD = 0
    }

    function Qd() {
        this.jh = this.Fb = this.Ej = 0;
        this.ih = this.pp = this.vi = null;
        this.wr = 0
    }

    function ea() {}

    function Rd() {
        this.oi = 0
    }

    function Na() {
        this.oi = this.mp = this.Vm = this.gh = this.np = this.Aj = this.pi = this.Es = this.Fs = 0
    }

    function A() {
        this.hh = 0;
        this.$w = null;
        this.Kc = this.Bj = 0;
        this.ed = this.qb = this.zj = this.Cj = this.ri = this.Vd = null;
        this.jD = this.kD = this.hD = 0;
        this.lp = this.Wm = null
    }

    function Sd() {
        this.Wd = this.lD = this.ti = this.si = 0;
        this.ax = null
    }

    function Td() {
        this.GA = this.HA = this.FA = 0
    }

    function ma() {
        this.Qm = this.mp =
            this.Vm = this.gh = this.np = this.Aj = this.pi = this.Es = this.Fs = this.Dj = this.pl = this.Cf = this.bx = this.ti = this.si = 0;
        this.frames = null
    }

    function Ud() {
        this.ti = this.si = this.Wd = 0;
        this.text = null
    }

    function ra() {
        this.oy = this.fq = this.Bn = 0;
        this.Mi = null
    }

    function Vd() {
        this.sl = this.rx = this.qx = 0;
        this.dc = null
    }

    function M() {
        this.qc = this.Tb = 0;
        this.c = null;
        this.iw = this.Aa = this.bc = this.Vg = this.uf = this.Rr = 0;
        this.Db = null;
        this.jw = 0;
        this.Qr = this.QB = null;
        this.Mo = this.Hm = 0;
        this.R = this.Gm = null;
        this.EL = this.tf = this.od = this.mw = this.Y = this.sa =
            this.M = this.K = this.oa = this.na = this.u = this.Ug = this.w = this.Tg = 0;
        this.Lo = !1;
        this.D = this.S = this.Z = this.A = this.b = null
    }

    function Wd() {
        this.gy = !1;
        this.Wg = null;
        this.ua = !1;
        this.Fa = null;
        this.xe = !0;
        this.yc = this.xc = 1;
        this.y = this.x = this.angle = 0;
        this.Wl = null
    }

    function T() {
        this.Wd = this.Oa = 0;
        this.C = null;
        this.px = this.ox = 0;
        this.qD = this.level = -1;
        this.Km = null;
        this.xe = !0
    }

    function Xd() {
        this.Ge = this.wc = this.Ei = 0;
        this.Qa = -1;
        this.tb = this.sb = 1;
        this.mb = this.Di = this.ea = this.Pa = this.cb = 0;
        this.Wa = this.N = !1;
        this.Oj = this.Nj = 0;
        this.at = -1;
        this.Mx = this.Kx = this.Lx = this.Jx = this.Ix = this.$s = 0
    }

    function ha() {
        this.td = this.sd = this.Zc = this.xb = this.ya = this.type = 0;
        this.Yz = this.ua = !1;
        this.Od = this.ng = this.vh = this.Mp = this.Qc = 0;
        this.fj = !1;
        this.Fa = this.ta = null;
        this.Sd = 0;
        this.font = null;
        this.he = this.Ua = !1
    }

    function Yd() {
        this.type = this.Qc = this.Rc = this.td = this.sd = this.ya = this.Ji = 0;
        this.ua = !0;
        this.ng = 0;
        this.ta = null;
        this.Od = 0;
        this.Fa = null;
        this.Sd = 0;
        this.alpha = 1;
        this.Lk = "source-over";
        this.he = !1
    }

    function Zd() {
        this.type = this.Qc = this.Rc = this.td = this.sd = this.ya =
            this.Ji = 0;
        this.ua = !0;
        this.ng = 0;
        this.ta = null;
        this.Od = 0;
        this.Fa = null;
        this.Sd = 0;
        this.alpha = 1;
        this.Lk = "source-over";
        this.he = !1
    }

    function $d() {
        this.Ki = null;
        this.Np = this.Rc = this.xb = this.Zc = 0;
        this.font = null;
        this.ua = !0;
        this.bE = this.Oa = 0;
        this.ta = this.Fa = null;
        this.Ua = !1;
        this.rect = new aa;
        this.td = this.sd = this.deltaY = 0;
        this.Ka = null;
        this.he = !1
    }

    function ae() {
        this.td = this.sd = 0;
        this.Zd = null;
        this.Mk = 0;
        this.Jd = []
    }

    function be(a, b) {
        this.ext = b.h.Ar.gs(a);
        this.Xw = !1;
        this.Zw = this.kp = this.zx = 0;
        this.Ua = !1;
        this.ua = !0;
        this.ta =
            this.Fa = null
    }

    function Ya() {}

    function Fa() {
        this.Km = this.dir = this.y = this.x = 0;
        this.iv = !1
    }

    function ce(a) {
        a.file.l();
        this.Qt = a.file.l()
    }

    function qf(a) {
        this.Ec = a.file.v();
        this.js = a.file.v();
        this.Qe = a.file.l()
    }

    function rf(a) {
        this.color = a.file.Cc()
    }

    function sf(a) {
        this.xm = a.file.v();
        this.lK = a.file.v()
    }

    function sa(a) {
        this.Qe = a.file.l();
        for (var b = a.file.U, c = 0, d;;) {
            c++;
            d = a.file.v();
            if (0 == d) break;
            d = a.file.l();
            6 < d && a.file.qa(d - 6)
        }
        a.file.seek(b);
        this.la = Array(c);
        for (b = 0; b < c; b++) this.la[b] = da.create(a.file)
    }

    function tf(a) {
        var b =
            a.file.l();
        a.file.qa(4);
        this.data = 0;
        6 < b && (this.data = a.file.U, a.file.qa(b - 6))
    }

    function pa(a) {
        this.Sg = a.file.l();
        this.xL = a.file.l()
    }

    function uf(a) {
        a.file.qa(4);
        this.U = 0;
        this.id = a.file.l()
    }

    function Ga(a) {
        this.value = a.file.v();
        this.Qt = 0
    }

    function de(a) {
        this.key = a.file.l()
    }

    function vf(a) {
        this.rb = a.file.$();
        this.Df = a.file.$();
        this.type = a.file.$()
    }

    function wf(a) {
        a.file.qa(4);
        this.hB = 0;
        for (this.Fb = [];;) {
            var b = a.file.$(),
                c = a.file.$();
            if (-1 == b) break;
            this.Fb.push(b);
            this.Fb.push(c)
        }
    }

    function qa() {}

    function ee(a) {
        this.rp =
            a.file.$();
        this.wl = a.file.$();
        this.Ns = a.file.$();
        this.Os = a.file.$();
        this.Ls = a.file.$();
        this.vx = a.file.$();
        this.Ks = a.file.v();
        this.Ms = a.file.$();
        this.sp = a.file.$();
        this.wx = a.file.$()
    }

    function nb(a) {
        this.rp = a.file.$();
        this.wl = a.file.$();
        this.Ns = a.file.$();
        this.Os = a.file.$();
        this.Ls = a.file.$();
        this.vx = a.file.$();
        this.Ks = a.file.v();
        this.Ms = a.file.$();
        this.sp = a.file.$();
        this.wx = a.file.$();
        this.lo = a.file.l();
        this.tv = a.file.l()
    }

    function fe(a) {
        this.rp = a.file.$();
        this.wl = a.file.$();
        this.Ns = a.file.$();
        this.Os =
            a.file.$();
        this.Ls = a.file.$();
        this.vx = a.file.$();
        this.Ks = a.file.v();
        this.Ms = a.file.$();
        this.sp = a.file.$();
        this.wx = a.file.$();
        this.lo = a.file.$();
        this.tv = a.file.$();
        a.file.qa(4);
        this.YN = a.file.l()
    }

    function Ra(a) {
        this.Zp = a.file.l();
        this.IE = a.file.l()
    }

    function ja(a) {
        this.value = a.file.l()
    }

    function Za(a) {
        this.Cb = a.file.Nb()
    }

    function xf(a) {
        this.Ec = a.file.v();
        this.js = a.file.v()
    }

    function ge(a) {
        a.file.$();
        a.file.$();
        a.file.$();
        a.file.$()
    }

    function yf(a, b, c) {
        this.index = a.file.v();
        this.OM = a.file.v();
        this.global =
            b;
        c ? this.bF = a.file.ND() : (this.bF = a.file.v(), a.file.qa(4))
    }

    function he(a) {
        this.Oa = a.file.v();
        this.rB = a.file.v();
        this.bL = a.file.v();
        this.values = [];
        for (var b = 1, c = 2, d = 4, e = 0; 4 > e && 0 != (this.Oa & b); e++) {
            var f = new yf(a, 0 != (this.Oa & c), 0 != (this.Oa & d)),
                b = b << 4,
                c = c << 4,
                d = d << 4;
            this.values.push(f)
        }
    }

    function $a() {
        this.Ik = []
    }

    function Ha(a) {
        this.kq = this.iq = 1;
        this.mx = -1;
        this.nx = this.gy = !1;
        this.Sk = this.Qk = 0;
        if (!(this.Ra = a.getContext("2d"))) throw Error("Failed to init standard renderer");
    }

    function ua() {
        this.to = "";
        this.NA =
            this.cq = this.eq = this.WE = this.XE = 0
    }

    function ie() {}

    function t() {
        this.m = this.Wo = this.Vo = this.ns = 0;
        this.Ba = this.jC = !1;
        this.ai = this.TA = this.s = this.da = null
    }

    function je(a) {
        this.app = a
    }

    function Sa() {}

    function ke() {
        this.kC = this.f = this.g = this.kb = 0
    }

    function le() {
        this.f = this.g = this.kb = 0
    }

    function me() {
        this.Eb = this.Jc = this.ov = this.Xf = 0;
        this.wM = null
    }

    function ne() {
        this.f = this.g = this.zr = this.ab = 0
    }

    function oe() {
        this.Eb = this.Jc = this.xj = 0
    }

    function pe() {}

    function qe() {
        this.f = this.g = this.vo = this.kb = this.ab = 0
    }

    function re() {
        this.Jw;
        this.hl = this.jl = this.$g = this.Ye = this.J = 0;
        this.Be = null
    }

    function se() {
        this.f = this.g = this.kb = 0
    }

    function te() {
        this.Iw = this.f = this.g = this.kb = 0
    }

    function ue() {
        this.xj;
        this.Jc;
        this.Eb
    }

    function ve() {
        this.f = this.g = this.dB = this.ab = this.kb = 0
    }

    function we() {
        this.f = this.g = this.kb = 0
    }

    function ze() {
        this.tc = this.f = this.g = this.kb = 0
    }

    function Ae() {
        this.gl = this.fl = this.f = this.g = this.kb = 0
    }

    function Be() {
        this.Mm = this.f = this.g = this.cB = this.uo = this.ab = 0
    }

    function Ce() {
        this.ms = this.f = this.g = this.uo = this.ab = 0
    }

    function De() {
        this.ls =
            this.qs = this.rs = this.os = this.Dd = this.Hw = this.ka = this.ja = this.hl = this.jl = this.$g = this.Ye = this.J = this.fF = this.Wt = this.sy = 0
    }

    function Ee() {
        this.kg = this.il = this.f = this.g = this.ab = this.kb = 0
    }

    function Fe() {}

    function Ge() {
        this.f = this.g = this.ab = 0
    }

    function He(a, b) {
        var c = new H;
        la.$b = new p(a, c, b);
        c.getFile(b, Ie)
    }

    function Ie() {
        la.$b.load()
    }

    function ab() {
        la.$b.$p()
    }

    function Ea() {
        this.y = this.x = 0;
        this.visible = !0;
        this.children = [];
        this.Mg = !1
    }

    function na() {}

    function K() {
        this.T = null;
        this.lineWidth = this.Ga = this.Ja = this.width =
            this.height = this.lineWidth = 0
    }

    function zf() {
        this.T = null;
        this.angle = 0;
        this.yc = this.xc = 1;
        this.my = 0
    }

    function u() {
        this.a = null;
        this.P = this.fc = this.ec = this.xt = this.Rl = this.ut = this.tt = 0;
        this.wh = null
    }

    function Je() {
        this.Sm = 0;
        this.fb = null
    }

    function Ke() {
        this.Tm = 0;
        this.values = null;
        this.Oa = 0
    }

    function Oa() {
        this.Op = 0;
        this.be = this.Ta = null
    }

    function Ta(a) {
        this.app = a;
        this.Wk = null;
        this.Ds = 0
    }

    function ob() {
        this.handle = 0
    }

    function ta() {
        this.O = this.G = null
    }

    function Le() {}

    function Me() {}

    function Ne() {}

    function U() {
        this.ap = 100;
        this.ys = this.bD = this.cD = this.ml = 0
    }

    function Oe() {
        this.ol = 0;
        this.qd = null
    }

    function Pe() {
        this.tC = this.uC = this.rC = this.sC = this.Xo = 0
    }

    function Qe() {
        this.AC = this.zC = this.yC = this.BC = 0
    }

    function Re() {
        this.FC = this.DC = this.EC = this.CC = 0
    }

    function Se() {
        this.aD = this.ZC = this.Vw = this.WC = this.XC = this.Pm = 0;
        this.ib = null
    }

    function Te() {
        this.Qw = this.wC = this.Rw = this.Mw = this.Pw = this.Ow = this.Nw = this.xC = 0;
        this.De = null
    }

    function Ue() {
        this.OC = this.NC = this.PC = this.MC = this.LC = this.QC = 0
    }

    function Ve() {
        this.SC = this.RC = this.TC = this.Uw =
            this.Tw = this.UC = 0
    }

    function We() {}

    function Xe() {
        this.eh = null;
        this.data = 0;
        this.Zr = !1
    }

    function O() {
        this.a = null;
        this.Xj = this.Je = this.uh = this.Yb = this.wg = this.Kp = this.Jp = 0
    }

    function va() {
        this.xu = this.Dq = this.dm = this.nz = this.cm = this.Eq = this.Cq = 0;
        this.Vi = !1
    }

    function Ye() {
        this.Fq = !1;
        this.em = null
    }

    function Ze() {}

    function $e() {
        this.zu = this.Ig = this.Au = this.Lh = 0
    }

    function af() {
        this.Gq = this.Hq = this.Eu = this.Du = this.Cu = this.Bu = 0
    }

    function bf() {
        this.ve = this.yk = this.xk = this.Rh = this.Qh = this.Lq = this.Un = this.Vn = this.Tc = 0;
        this.wd = !1;
        this.Na = null;
        this.Ph = this.Nq = this.Mq = this.Oh = 0;
        this.im = null;
        this.Kq = !1
    }

    function V() {
        this.gm = this.rz = this.Wi = this.Rf = this.Qf = this.Ld = this.qz = this.Fu = this.de = this.vb = 0;
        this.vk = null;
        this.Hu = this.Gu = 0;
        this.uk = !1
    }

    function bb() {
        this.sz = this.Iu = this.tz = this.Ju = this.wk = this.hm = this.Ku = this.Md = this.Nh = 0
    }

    function cb() {}

    function Ia() {
        this.Ql = 0;
        this.pa = null;
        this.by = 0;
        this.W = !1;
        this.Yj = 0;
        this.Wj = !1;
        this.Lp = 0
    }

    function Pa() {
        this.Xc = null;
        this.TB = 0;
        this.Jm = this.Xe = this.Ic = null;
        this.ye = 0
    }

    function n() {
        this.xg =
            this.yg = 0;
        this.dE = this.cy = !1;
        this.Pp = 0;
        this.Ke = null;
        this.kj = 0;
        this.fE = !1;
        this.BA = 0;
        this.eE = !1;
        this.AA = 0;
        this.cE = !1;
        this.Qp = this.Rp = this.ig = this.gE = this.hE = this.kE = this.zA = 0;
        this.jc = null;
        this.dy = !1;
        this.qE = this.pE = this.oE = this.nE = this.mE = this.lE = this.jE = this.iE = this.Ub = this.$a = this.vm = 0;
        this.rD = this.Jd = this.Ka = this.ki = this.jy = this.ow = null
    }
    var la = this,
        m = {
            extend: function (a, b) {
                var c = Object.create(a.prototype || a);
                if (void 0 !== b && (b = b.prototype || b))
                    for (var d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
                return c
            },
            vq: function (a) {
                return a >> 16
            },
            rI: function (a) {
                return a & 65535
            },
            tI: function (a, b) {
                return b << 16 | a & 65535
            },
            VT: function (a) {
                return a >>> 16 & 255
            },
            OT: function (a) {
                return a >>> 8 & 255
            },
            IT: function (a) {
                return a & 255
            },
            aS: function (a, b, c) {
                return (a & 255) << 16 | (b & 255) << 8 | c & 255
            },
            XU: function (a) {
                return (a & 255) << 16 | (a >>> 8 & 255) << 8 | a >>> 16 & 255
            },
            gK: function (a, b, c) {
                return Math.min(Math.max(a, b), c)
            },
            sf: function (a) {
                var b = (a >>> 16 & 255).toString(16),
                    c = (a >>> 8 & 255).toString(16);
                for (a = (a & 255).toString(16); 2 > b.length;) b = "0" + b;
                for (; 2 > c.length;) c =
                    "0" + c;
                for (; 2 > a.length;) a = "0" + a;
                return "#" + b + c + a
            },
            Rd: function (a) {
                return 0 > a ? Math.ceil(a) : Math.floor(a)
            },
            YS: function (a) {
                return Math.round(a)
            },
            sw: function (a) {
                return Math.ceil(a) == a
            },
            ur: function (a, b, c, d, e) {
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
            vT: function (a, b) {
                a.beginPath();
                a.moveTo(b.left,
                    b.top);
                a.lineTo(b.right, b.top);
                a.lineTo(b.right, b.bottom);
                a.lineTo(b.left, b.bottom);
                a.lineTo(b.left, b.top);
                a.closePath();
                a.stroke()
            },
            uT: function (a, b, c, d, e) {
                a.beginPath();
                a.moveTo(b, c);
                a.lineTo(d, e);
                a.closePath();
                a.stroke()
            },
            Ao: function (a, b) {
                for (var c = a.toString(); 4 > c.length;) c = "0" + c;
                return c + ("." + b)
            },
            Gc: function (a, b) {
                if (a == b) return !0;
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a == b
            },
            vD: function (a) {
                var b = a.lastIndexOf("\\");
                0 < b && (a = a.substring(b + 1));
                return a
            },
            uI: 40,
            IJ: [0, 1, 2, 3, 5, 7, 8, 9, 11, 12, 13, 15, 16,
                17, 19, 20, 21, 23, 24, 25, 27, 28, 29, 31, 32, 33, 35, 36, 37, 39, 40, 41, 43, 44, 45, 47, 48, 49, 51, 52
            ],
            ZT: function (a) {
                return a < m.uI ? m.IJ[a] : Math.round(96 * a / 72)
            },
            pk: 0,
            qk: 0,
            nk: 1,
            eu: 2,
            qq: 8,
            Ri: 4,
            vG: 32,
            du: 1024,
            wG: 2048,
            bB: function (a, b, c, d, e, f) {
                if (0 == b.length) return 0 != (c & 1024) && (d.right = d.left, d.bottom = d.top), 0;
                e.tj || (a.font = e.cg());
                var g = 0,
                    h = String.fromCharCode(10),
                    q = String.fromCharCode(13),
                    F = b.indexOf(h);
                if (0 <= F) {
                    var I = new aa;
                    I.wA(d);
                    var k, p = 0,
                        l = 0,
                        n;
                    do k = -1, p < b.length && (k = b.indexOf(q, p)), n = Math.max(F, k), k == F - 1 && F--, F = b.substring(p,
                        F), k = m.ym(a, F, c, I, f, e), l = Math.max(l, I.right - I.left), g += k, I.top += k, I.bottom = d.bottom, I.right = d.right, p = n + 1, F = -1, p < b.length ? F = b.indexOf(h, p) : (k = m.ym(a, "", c, I, f, e), l = Math.max(l, I.right - I.left), g += k, I.top += k, I.bottom = d.bottom, I.right = d.right); while (0 <= F);
                    p < b.length && (F = b.substring(p), k = m.ym(a, F, c, I, f, e), l = Math.max(l, I.right - I.left), g += k);
                    0 != (c & m.du) && (d.right = d.left + l, d.bottom = I.bottom);
                    return g
                }
                return g = m.ym(a, b, c | m.wG, d, f, e)
            },
            Tt: null,
            ym: function (a, b, c, d, e, f) {
                0 == b.length && (b = " ");
                var g, h;
                g = f.Ue();
                h =
                    f.tj ? f.measureText(" ") : a.measureText(" ").width;
                var q = d.right - d.left,
                    F = 0,
                    I = 0,
                    k, p, l, n = 0,
                    r = 0,
                    z;
                null == m.Tt && (m.Tt = Array(100));
                var v, w, P = !1,
                    C = !1,
                    A = d.top;
                p = g;
                0 != (p & 1) && p++;
                var t = A;
                do {
                    p = F;
                    l = z = 0;
                    r += g;
                    do {
                        m.Tt[z] = l;
                        z += 1;
                        k = I;
                        I = -1;
                        p < b.length && (I = b.indexOf(" ", p)); - 1 == I && (I = b.length);
                        if (I < p) {
                            l -= h;
                            break
                        }
                        w = b.substring(p, I);
                        v = f.tj ? f.measureText(w) : a.measureText(w).width;
                        if (l + v > q) {
                            z--;
                            if (0 < z) {
                                l -= h;
                                I = k;
                                break
                            }
                            for (k = p; k < I; k++) {
                                v = f.tj ? f.measureText(b.substring(k, k + 1)) : a.measureText(b.substring(k, k + 1)).width;
                                if (l + v >=
                                    q) {
                                    k--;
                                    if (0 < k) {
                                        n = Math.max(l, n);
                                        0 == (c & m.du) && (l = 0 != (c & m.nk) ? d.left + (d.right - d.left) / 2 - l / 2 : 0 != (c & m.eu) ? d.right - l : d.left, w = b.substring(p, k), e.push(new R(l, A, w)));
                                        I = k - 1;
                                        C = P = !0;
                                        break
                                    }
                                    I = k < b.length ? b.indexOf(" ", k) : -1;
                                    P = !0;
                                    0 <= I && (C = !0);
                                    break
                                }
                                l += v
                            }
                        }
                        if (P) break;
                        l += v;
                        if (l + h > q) break;
                        l += h;
                        p = I + 1
                    } while (1);
                    if (0 == C) {
                        if (P) break;
                        n = Math.max(l, n);
                        if (0 == (c & m.du))
                            for (l = 0 != (c & m.nk) ? d.left + (d.right - d.left) / 2 - l / 2 : 0 != (c & m.eu) ? d.right - l : d.left, p = F, F = 0; F < z; F++) {
                                I = -1;
                                p < b.length && (I = b.indexOf(" ", p)); - 1 == I && (I = b.length);
                                if (I < p) break;
                                w = b.substring(p, I);
                                e.push(new R(l + m.Tt[F], A, w));
                                p = I + 1
                            }
                    }
                    C = P = !1;
                    A += g;
                    F = I + 1
                } while (F < b.length);
                d.right = d.left + n;
                d.bottom = t + r;
                return r
            },
            bi: function (a, b, c, d, e, f) {
                var g;
                if (e.tj)
                    for (f = 0; f < d.length; f++) g = d[f], e.fillText(a, g.text, b + g.x, c + g.y);
                else
                    for (a.font = e.cg(), a.fillStyle = m.sf(f), a.textAlign = "left", a.textBaseline = "top", f = 0; f < d.length; f++) g = d[f], a.fillText(g.text, b + g.x, c + g.y)
            },
            sj: function (a, b) {
                var c = a.toString();
                if (0 != (b & ha.Ry)) {
                    var d = b & ha.Ry;
                    if (c.length > d) c = c.substring(c.length - d);
                    else
                        for (; c.length < d;) c =
                            "0" + c
                }
                return c
            },
            Lv: function (a, b) {
                var c;
                if (0 == (b & ha.kG)) c = a.toString();
                else {
                    var d = Math.floor(((b & ha.iG) >> ha.jG) + 1);
                    c = -1;
                    0 != (b & ha.mG) ? c = (b & ha.gG) >> ha.hG : 0 != a && -1 < a && 1 > a && (c = d);
                    c = 0 > c ? a.toPrecision(d) : a.toFixed(c);
                    var e, f, g;
                    if (0 != (b & ha.lG))
                        for (f = e = 0; f < c.length; f++) g = c.charAt(f), "." != g && "+" != g && "-" != g && "e" != g && "E" != g && e++;
                    f = !1;
                    "-" == c.charAt(0) && (f = !0, c = c.substr(1));
                    for (; e < d;) c = "0" + c, e++;
                    f && (c = "-" + c)
                }
                return c
            },
            WU: function (a, b) {
                for (var c = a, d = b, e = d.indexOf("\\"); 0 <= e;) c.substring(0, e) == d.substring(0, e) &&
                    (d = d.substring(e + 1), c = c.substring(e + 1)), e = d.indexOf("\\", e + 1);
                return c
            }
        },
        cf = !1,
        db = !1,
        pb = !1,
        qb = window.XMLHttpRequest ? new XMLHttpRequest : null;
    if (qb && qb.overrideMimeType) try {
        db = "string" === typeof (new XMLHttpRequest).responseType, 0 <= navigator.userAgent.toLowerCase().indexOf("safari") && (db = !1)
    } catch (a) {} else {
        var cf = !0,
            rb = document.createElement("script");
        rb.type = "text/vbscript";
        rb.innerHTML = 'Function BinFileReaderImpl_IE_VBAjaxLoader(fileName)\n\r\n\t                Dim xhr\n\r\n\t                Set xhr = CreateObject("Microsoft.XMLHTTP")\n\r\n\t                xhr.Open "GET", fileName, False\n\r\n\t                xhr.setRequestHeader "Accept-Charset", "x-user-defined"\n\r\n\t                xhr.send\n\r\n\t                Dim byteArray()\n\r\n\t                if xhr.Status = 200 Then\n\r\n\t                    Dim byteString\n\r\n\t                    Dim i\n\r\n\t                    byteString=xhr.responseBody\n\r\n\t                    ReDim byteArray(LenB(byteString))\n\r\n\t                    For i = 1 To LenB(byteString)\n\r\n\t                        byteArray(i-1) = AscB(MidB(byteString, i, 1))\n\r\n\t                    Next\n\r\n\t                End If\n\r\n\t                BinFileReaderImpl_IE_VBAjaxLoader=byteArray\n\r\n\t            End Function';
        document.head.appendChild(rb)
    }
    if (db) {
        var df = new FileReader;
        try {
            df.readAsBinaryString && (pb = !0)
        } catch (a) {}
        df = null
    }
    qb = null;
    H.prototype = {
        xa: function () {
            return this.zd.charCodeAt(this.U++) & 255
        },
        getFile: function (a, b, c) {
            this.sv = b;
            if (cf) try {
                var d = BinFileReaderImpl_IE_VBAjaxLoader(a).toArray(),
                    e, f = d.length;
                f > c && (f = c);
                for (e = 0; e < f; e++) this.zd += String.fromCharCode(d[e]);
                this.end = this.zd.length;
                this.sv()
            } catch (q) {} else {
                var g = new XMLHttpRequest;
                g.open("GET", a, !0);
                var h = this;
                db ? (g.responseType = "blob", g.onload = function () {
                    if (4 ==
                        g.readyState && 200 == g.status) {
                        var a = new FileReader;
                        a.onloadend = function () {
                            if (pb) h.zd += a.result;
                            else {
                                var b = new Uint8Array(a.result),
                                    c;
                                for (c = 0; c < b.length; c++) h.zd += String.fromCharCode(b[c])
                            }
                            h.end = h.zd.length;
                            h.sv()
                        };
                        pb ? a.readAsBinaryString(g.response) : a.readAsArrayBuffer(g.response)
                    }
                }) : (g.overrideMimeType("text/plain; charset=x-user-defined"), g.onload = function () {
                    4 == g.readyState && 200 == g.status && (h.zd += g.responseText, h.end = h.zd.length, h.sv())
                });
                g.send(null)
            }
        },
        MN: function (a) {
            this.zd = a;
            this.end = a.length;
            var b = this;
            this.xa = function () {
                return b.zd.charCodeAt(b.U++) & 255
            }
        },
        Pg: function (a, b) {
            var c = new H;
            c.zd = this.zd;
            c.offset = a;
            c.U = a;
            c.end = a + b;
            c.yd = this.yd;
            return c
        },
        BE: function (a) {
            this.yd = a
        },
        HK: function () {
            var a = this.xa(),
                b = this.xa(),
                c = this.xa();
            255 == a && 254 == b ? (this.yd = !0, this.U--) : 239 == a && 187 == b && 191 == c ? this.yd = !1 : (this.yd = !1, this.U -= 3)
        },
        qa: function (a) {
            this.U += a
        },
        hi: function () {
            return this.U >= this.end
        },
        nb: function () {
            return this.xa()
        },
        l: function () {
            var a;
            a = this.xa();
            return 256 * this.xa() + a
        },
        $: function () {
            var a;
            a = this.xa();
            a = 256 * this.xa() + a;
            return 32768 > a ? a : a - 65536
        },
        fn: function () {
            var a;
            a = this.xa();
            return 256 * this.xa() + a
        },
        v: function () {
            var a, b, c;
            a = this.xa();
            b = this.xa();
            c = this.xa();
            a = 16777216 * this.xa() + 65536 * c + 256 * b + a;
            return 2147483647 >= a ? a : a - 4294967296
        },
        Cc: function () {
            var a, b, c;
            a = this.xa();
            b = this.xa();
            c = this.xa();
            this.xa();
            return 65536 * a + 256 * b + c
        },
        OD: function () {
            var a, b, c;
            a = this.xa();
            b = this.xa();
            c = this.xa();
            a = 16777216 * this.xa() + 65536 * c + 256 * b + a;
            2147483648 < a && (a -= 4294967296);
            return a / 65536
        },
        ND: function () {
            var a,
                b, c, d, e, f, g;
            a = this.xa();
            b = this.xa();
            c = this.xa();
            d = this.xa();
            e = this.xa();
            f = this.xa();
            g = this.xa();
            a = 72057594037927936 * this.xa() + 281474976710656 * g + 1099511627776 * f + 4294967296 * e + 16777216 * d + 65536 * c + 256 * b + a;
            0x7fffffffffffffff < a && (a -= 1.8446744073709552E19);
            return a / 4294967296
        },
        Nb: function (a) {
            var b = "";
            if (this.yd)
                if (1 > arguments.length) {
                    if (this.hi()) return b;
                    c = this.U;
                    for (b = this.fn(); b && !this.hi();) b = this.fn();
                    b = (this.U - c - 2) / 2;
                    this.U = c;
                    b = this.Nb(b);
                    this.xa();
                    this.xa()
                } else {
                    b = "";
                    c = this.U;
                    for (e = 0; e < a; e++) {
                        d = this.fn();
                        if (0 == d) break;
                        b += String.fromCharCode(d)
                    }
                    this.U = c + 2 * a
                }
            else if (1 > arguments.length) {
                if (this.hi()) return b;
                for (var c = this.U, b = this.xa(); b && !this.hi();) b = this.xa();
                b = this.U - c - 1;
                this.U = c;
                b = this.Nb(b);
                this.xa()
            } else {
                for (var d, c = this.U, e = 0; e < a; ++e) {
                    d = this.xa();
                    if (0 == d) break;
                    b += String.fromCharCode(d)
                }
                this.U = c + a
            }
            return b
        },
        hN: function () {
            var a = this.U,
                b, c = "",
                d, e;
            if (0 == this.yd) {
                if (this.hi()) return;
                for (b = this.xa(); 10 != b && 13 != b && !this.hi();) b = this.xa();
                d = this.U;
                this.U = a;
                e = 1;
                10 != b && 13 != b && (e = 0);
                d > a + e && (c = this.Nb(d -
                    a - e));
                if (10 == b || 13 == b) this.xa(), a = this.nb(), 10 == b && 13 != a && this.U--, 13 == b && 10 != a && this.U--
            } else {
                if (this.hi()) return;
                for (b = this.fn(); 10 != b && 13 != b && !this.hi();) b = this.fn();
                d = this.U;
                this.U = a;
                e = 2;
                10 != b && 13 != b && (e = 0);
                d > a + e && (c = this.Nb((d - a - e) / 2));
                if (10 == b || 13 == b) this.U += 2, a = this.fn(), 10 == b && 13 != a && (this.U -= 2), 13 == b && 10 != a && (this.U -= 2)
            }
            return c
        },
        seek: function (a) {
            a >= this.end && (a = this.end);
            this.U = a
        },
        ZN: function (a) {
            var b = this.U,
                b = b - a;
            0 > b && (b = 0);
            this.U = b
        },
        lN: function (a) {
            var b, c = a.length;
            for (b = 0; b < c; b++) a[b] =
                this.xa()
        },
        PD: function (a) {
            var b = [],
                c;
            for (c = 0; c < a; c++) b[c] = this.xa();
            return b
        },
        Nx: function () {
            var a = new Va;
            a.Nx(this);
            return a
        }
    };
    Q.prototype = {
        add: function (a) {
            this.Nd.push(a)
        },
        KL: function (a, b) {
            this.Nd.splice(a, 0, b)
        },
        get: function (a) {
            return a < this.Nd.length ? this.Nd[a] : null
        },
        put: function (a, b) {
            this.Nd[a] = b
        },
        set: function (a, b) {
            a < this.Nd.length && (this.Nd[a] = b)
        },
        Bp: function (a) {
            a < this.Nd.length && this.Nd.splice(a, 1)
        },
        indexOf: function (a) {
            return this.Nd.indexOf(a)
        },
        contains: function (a) {
            return 0 <= this.Nd.indexOf(a)
        },
        QD: function (a) {
            a = this.Nd.indexOf(a);
            0 <= a && this.Nd.splice(a, 1)
        },
        size: function () {
            return this.Nd.length
        },
        clear: function () {
            this.Nd.length = 0
        },
        sort: function (a) {
            Array.prototype.sort.call(this.Nd, a)
        }
    };
    aa.prototype = {
        load: function (a) {
            this.left = a.v();
            this.top = a.v();
            this.right = a.v();
            this.bottom = a.v()
        },
        wA: function (a) {
            this.left = a.left;
            this.right = a.right;
            this.top = a.top;
            this.bottom = a.bottom
        }
    };
    Va.prototype = {
        cg: function () {
            var a;
            a = this.ze ? "italic " : "normal ";
            var b = 100 * Math.floor(this.Ae / 100),
                b = Math.max(b, 100),
                b = Math.min(b,
                    900);
            a = a + (b + " ") + (this.pb + "px ");
            return a += this.oe
        },
        Ue: function () {
            return this.pb + Math.ceil(this.pb / 8)
        },
        aa: function () {
            this.oe = "Arial";
            this.pb = 13;
            this.Ae = 400;
            this.ze = 0
        },
        Nx: function (a) {
            this.pb = a.v();
            0 > this.pb && (this.pb = -this.pb);
            a.qa(12);
            this.Ae = a.v();
            this.ze = a.nb();
            a.nb();
            a.nb();
            a.qa(5);
            this.oe = a.Nb(32)
        }
    };
    oa.separator = "{@24}";
    oa.gz = 1;
    oa.XH = 2;
    oa.prototype = {
        Sp: function () {
            if (null != this.fb && null != this.Nk) {
                var a = "",
                    b;
                for (b = 0; b < this.fb.size(); b++) a += this.fb.get(b) + oa.separator;
                localStorage.setItem(this.Nk,
                    a)
            }
        },
        fs: function (a) {
            var b = !0;
            null != this.Nk && m.Gc(a, this.Nk) && (b = !1);
            if (b)
                if (this.Sp(), this.Nk = a, this.fb = new Q, a = localStorage.getItem(this.Nk))
                    for (var b = 0, c = a.indexOf(oa.separator, 0); 0 <= c;) this.fb.add(a.substring(b, c)), b = c + oa.separator.length, c = a.indexOf(oa.separator, b);
                else if (a = null, null == a && (b = this.app.jL(this.Nk), null != b && (a = b.open())), a)
                for (b = !1, a.HK(), "undefined" != typeof this.Oa && (this.Oa & oa.gz && (this.yd = !1, b = !0), this.Oa & oa.XH && (this.yd = !0)); 0 == a.hi();) {
                    c = a.hN();
                    b && (c = this.CK(c));
                    if ("<" == c.substring(0,
                            1)) {
                        this.fb.clear();
                        break
                    }
                    if (null == c) break;
                    this.fb.add(c)
                }
        },
        CK: function (a) {
            for (var b = "", c = 0, d, e, f; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1), b += String.fromCharCode((d & 31) << 6 | e & 63), c += 2) : (e = a.charCodeAt(c + 1), f = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63), c += 3);
            return b
        },
        Er: function (a) {
            var b, c;
            for (b = 0; b < this.fb.size(); b++)
                if (c = this.fb.get(b), "[" == c.charAt(0)) {
                    var d = c.lastIndexOf("]");
                    if (1 <= d && (c = c.substring(1, d), m.Gc(a,
                            c))) return b
                } return -1
        },
        Rv: function (a, b) {
            for (var c, d; a < this.fb.size(); a++) {
                c = this.fb.get(a);
                if ("[" == c.charAt(0)) break;
                d = c.indexOf("=");
                if (0 <= d) {
                    for (var e = 0; e < d && 32 == c.charCodeAt(e);) e++;
                    for (; d > e && 32 == c.charCodeAt(d - 1);) d--;
                    if (d > e && (c = c.substring(0, d), m.Gc(c, b))) return a
                }
            }
            return -1
        },
        al: function (a, b, c, d) {
            this.fs(d);
            a = this.Er(a);
            return 0 <= a && (a = this.Rv(a + 1, b), 0 <= a) ? (b = this.fb.get(a), b.substring(b.indexOf("=") + 1)) : c
        },
        Xl: function (a, b, c, d) {
            this.fs(d);
            d = this.Er(a);
            if (0 > d) this.fb.add("[" + a + "]"), this.fb.add(b +
                "=" + c);
            else if (a = this.Rv(d + 1, b), 0 <= a) this.fb.set(a, b + "=" + c);
            else {
                for (a = d + 1; a < this.fb.size(); a++)
                    if (d = this.fb.get(a), "[" == d.charAt(0)) {
                        d = b + "=" + c;
                        this.fb.KL(a, d);
                        return
                    } this.fb.add(b + "=" + c)
            }
        },
        PA: function (a, b, c) {
            this.fs(c);
            a = this.Er(a);
            0 <= a && (b = this.Rv(a + 1, b), 0 <= b && this.fb.Bp(b), this.Sp())
        },
        FK: function (a, b) {
            this.fs(b);
            var c = this.Er(a);
            if (0 <= c) {
                for (this.fb.Bp(c); !(c >= this.fb.size()) && "[" != this.fb.get(c).charAt(0);) this.fb.Bp(c);
                this.Sp()
            }
        }
    };
    ga.prototype = {
        measureText: function (a, b) {
            b = this.app.Zv(b);
            if (b.tj) return b.measureText(a);
            this.ge.font = b.cg();
            return this.ge.measureText(a).width
        },
        Tl: function (a, b, c, d, e) {
            if (a == this.eM && b == this.aM && c == this.dM && d == this.bM && e == this.$L) return this.cM;
            var f = this.ge;
            f.clearRect(0, 0, this.width, this.height);
            c || (c = new aa(0, 0, this.width, this.height));
            var g = [];
            d = this.app.Zv(d);
            var h = m.bB(f, a, b, c, d, g);
            if (0 != h) {
                var q = 0;
                0 != (b & m.qq) ? q = this.height - h : 0 != (b & m.Ri) && (q = this.height / 2 - h / 2);
                m.bi(f, 0, q, g, d, e, 0, 0)
            }
            this.eM = a;
            this.aM = b;
            this.dM = c;
            this.bM = d;
            this.$L = e;
            return this.cM = h
        },
        oC: function (a) {
            a ? (this.ge.fillStyle =
                m.sf(a), this.ge.fillRect(0, 0, this.width, this.height)) : this.ge.clearRect(0, 0, this.width, this.height)
        },
        us: function (a, b, c, d, e, f, g) {
            var h = [];
            c || (c = new aa(0, 0, this.width, this.height));
            e = this.app.Zv(e);
            a = m.bB(this.ge, a, b, c, e, h);
            if (0 != a) switch (c = 0, 0 != (b & m.qq) ? c = this.height - a : 0 != (b & m.Ri) && (c = this.height / 2 - a / 2), f) {
                case 1:
                    m.bi(this.ge, 1, c + 1, h, e, g, 0, 0);
                    m.bi(this.ge, 0, c, h, e, d, 0, 0);
                    break;
                case 2:
                    m.bi(this.ge, 1, c, h, e, g, 0, 0);
                    m.bi(this.ge, 1, c + 2, h, e, g, 0, 0);
                    m.bi(this.ge, 0, c + 1, h, e, g, 0, 0);
                    m.bi(this.ge, 2, c + 1, h, e, g, 0, 0);
                    m.bi(this.ge, 1, c + 1, h, e, d, 0, 0);
                    break;
                case 0:
                    m.bi(this.ge, 0, c, h, e, d, 0, 0)
            }
        },
        resize: function (a, b) {
            if (a != this.width || b != this.height) this.width = a, this.height = b, this.canvas.width = a, this.canvas.height = b
        },
        wb: function (a, b, c, d, e) {
            a.Pj(this.canvas, b, c, this.width, this.height, d, e)
        }
    };
    La.yK = [{
        Cb: navigator.userAgent,
        jd: "Chrome",
        Ac: "Chrome"
    }, {
        Cb: navigator.userAgent,
        jd: "OmniWeb",
        Dn: "OmniWeb/",
        Ac: "OmniWeb"
    }, {
        Cb: navigator.vendor,
        jd: "Apple",
        Ac: "Safari",
        Dn: "Version"
    }, {
        cN: window.opera,
        Ac: "Opera",
        Dn: "Version"
    }, {
        Cb: navigator.vendor,
        jd: "iCab",
        Ac: "iCab"
    }, {
        Cb: navigator.vendor,
        jd: "KDE",
        Ac: "Konqueror"
    }, {
        Cb: navigator.userAgent,
        jd: "Firefox",
        Ac: "Firefox"
    }, {
        Cb: navigator.vendor,
        jd: "Camino",
        Ac: "Camino"
    }, {
        Cb: navigator.userAgent,
        jd: "Netscape",
        Ac: "Netscape"
    }, {
        Cb: navigator.userAgent,
        jd: "MSIE",
        Ac: "Explorer",
        Dn: "MSIE"
    }, {
        Cb: navigator.userAgent,
        jd: "Gecko",
        Ac: "Mozilla",
        Dn: "rv"
    }, {
        Cb: navigator.userAgent,
        jd: "Mozilla",
        Ac: "Netscape",
        Dn: "Mozilla"
    }];
    La.AK = [{
        Cb: navigator.platform,
        jd: "Win",
        Ac: "Windows"
    }, {
        Cb: navigator.platform,
        jd: "Mac",
        Ac: "MacOS"
    }, {
        Cb: navigator.userAgent,
        jd: "iPhone",
        Ac: "iOS"
    }, {
        Cb: navigator.userAgent,
        jd: "iPod",
        Ac: "iOS"
    }, {
        Cb: navigator.userAgent,
        jd: "iPad",
        Ac: "iOS"
    }, {
        Cb: navigator.userAgent,
        jd: "Android",
        Ac: "Android"
    }, {
        Cb: navigator.platform,
        jd: "Windows Phone",
        Ac: "Windows Phone"
    }, {
        Cb: navigator.platform,
        jd: "Linux",
        Ac: "Linux"
    }];
    La.prototype = {
        sE: function (a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b].Cb,
                    d = a[b].cN;
                this.dF = a[b].Dn || a[b].Ac;
                if (c) {
                    if (-1 != c.indexOf(a[b].jd)) return a[b].Ac
                } else if (d) return a[b].Ac
            }
        },
        tE: function (a) {
            var b = a.indexOf(this.dF);
            if (-1 != b) return parseFloat(a.substring(b +
                this.dF.length + 1))
        }
    };
    m.uU = function (a, b, c, d) {
        var e = document.createElement("canvas");
        e.width = b.width;
        e.height = b.height;
        var f = e.getContext("2d");
        0 == b.Ab ? f.drawImage(b.zb, 0, 0) : f.drawImage(a.ia.Vb[b.Ab], b.Ed, b.Fd, b.width, b.height, 0, 0, b.width, b.height);
        var g = f.getImageData(0, 0, b.width, b.height),
            h = d >> 16 & 255,
            q = d >> 8 & 255;
        d &= 255;
        var F = c >> 16 & 255,
            k = c >> 8 & 255;
        c &= 255;
        var p, m, l;
        for (l = 0; l < b.height; l++)
            for (m = 0; m < b.width; m++) p = 4 * (l * b.width + m), g.data[p] == F && g.data[p + 1] == k && g.data[p + 2] == c && (g.data[p] = h, g.data[p + 1] = q, g.data[p +
                2] = d);
        f.putImageData(g, 0, 0);
        f = new ca;
        f.app = a;
        f.width = b.width;
        f.height = b.height;
        f.Ja = b.Ja;
        f.Ga = b.Ga;
        f.Eh = b.Eh;
        f.Fh = b.Fh;
        f.Xa = 0;
        f.zb = e;
        f.wf = b.wf;
        f.kl = b.kl;
        f.ji = b.ji;
        return f
    };
    Aa.iH = 1;
    Aa.cQ = 2;
    Aa.hH = 4;
    Aa.gH = 8;
    Aa.prototype = {
        iK: function (a) {
            if (this.cL != a.oe || this.Sd != a.pb) return !1;
            var b = 0 != (this.sB & Aa.iH),
                c = 0 != a.ze;
            if (b != c) return !1;
            b = 0 != (this.sB & Aa.hH);
            c = 400 < a.Ae;
            return b != c ? !1 : !0
        },
        Ue: function () {
            return this.height + this.LL
        },
        measureText: function (a) {
            var b = 0,
                c = a.length,
                d, e;
            for (d = 0; d < c; d++) e = this.wv.indexOf(a.charAt(d)),
                b = 0 <= e ? b + (this.vv[e] + this.pw) : b + this.width;
            return b
        },
        fillText: function (a, b, c, d) {
            var e = b.length,
                f, g, h, q, F = this.Wg;
            if (0 == (this.Oa & Aa.gH))
                for (f = 0; f < e; f++) q = this.wv.indexOf(b.charAt(f)), 0 <= q ? (h = Math.floor(q / this.As), g = q - h * this.As, h *= this.height + 1, g *= this.width + 1, 0 == F.Ab ? a.drawImage(F.zb, g, h, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height) : a.drawImage(F.app.ia.Vb[F.Ab], g + F.Ed, h + F.Fd, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height), c += this.vv[q] + this.pw) :
                    (a.fillStyle = m.sf(this.color), a.fillRect(c, d, this.width, this.height), c += this.width);
            else
                for (c += this.measureText(b), f = e - 1; 0 <= f; f--) q = this.wv.indexOf(b.charAt(f)), 0 <= q ? (c -= this.vv[q] + this.pw, h = q / this.As, g = q - h * this.As, h *= this.height + 1, g *= this.width + 1, 0 == F.Ab ? a.drawImage(F.zb, g, h, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height) : a.drawImage(F.app.ia.Vb[F.Ab], g + F.Ed, h + F.Fd, this.width, this.height, Math.round(c), Math.round(d), this.width, this.height)) : (c -= this.width, a.fillStyle = m.sf(this.color),
                    a.fillRect(c, d, this.width, this.height))
        }
    };
    Z.Pi = 1;
    Z.FO = 17408;
    Z.EO = 17664;
    Z.yO = 17920;
    Z.wO = 18176;
    Z.xO = 18432;
    Z.zO = 18688;
    Z.HO = 18944;
    Z.CO = 19200;
    Z.AO = 19456;
    Z.BO = 19712;
    Z.IO = 19968;
    Z.JO = 20224;
    Z.DO = 20480;
    Z.GO = 20736;
    Z.zF = 983039;
    Z.create = function (a) {
        var b = !1,
            c = !1,
            d = !1,
            e = !1,
            f = !1,
            g = !1,
            h = !1,
            q = !1,
            F = !1,
            k = !1,
            p = a.file.U,
            m = a.file.l(),
            l, n = a.file.v();
        switch (n) {
            case 65535:
                l = new ia;
                break;
            case 131071:
                l = new ia;
                break;
            case 262143:
                l = new ACT_SETVARG;
                break;
            case 327679:
                l = new ACT_SUBVARG;
                break;
            case 393215:
                l = new ACT_ADDVARG;
                break;
            case 458751:
                l =
                    new ACT_GRPACTIVATE;
                break;
            case 524287:
                l = new ACT_GRPDEACTIVATE;
                break;
            case 983039:
                l = new ACT_STARTLOOP;
                break;
            case 1048575:
                l = new ACT_STOPLOOP;
                break;
            case 1114111:
                l = new ACT_SETLOOPINDEX;
                break;
            case 1179647:
                l = new ACT_RANDOMIZE;
                break;
            case 1310719:
                l = new ACT_SETGLOBALSTRING;
                break;
            case 1572863:
                l = new ia;
                break;
            case 1638399:
                l = new ia;
                break;
            case 1835007:
                l = new ACT_SETVARGCONST;
                b = !0;
                break;
            case 1900543:
                l = new ACT_SETVARG;
                break;
            case 1966079:
                l = new ACT_SETVARGCONST;
                b = !0;
                break;
            case 2031615:
                l = new ACT_SETVARG;
                break;
            case 2097151:
                l =
                    new ACT_ADDVARGCONST;
                c = !0;
                break;
            case 2162687:
                l = new ACT_ADDVARG;
                break;
            case 2228223:
                l = new ACT_ADDVARGCONST;
                c = !0;
                break;
            case 2293759:
                l = new ACT_ADDVARG;
                break;
            case 2359295:
                l = new ACT_SUBVARGCONST;
                d = !0;
                break;
            case 2424831:
                l = new ACT_SUBVARG;
                break;
            case 2490367:
                l = new ACT_SUBVARGCONST;
                d = !0;
                break;
            case 2555903:
                l = new ACT_SUBVARG;
                break;
            case 2883583:
                l = new ACT_EXECUTECHILDEVENTS;
                break;
            case 2949119:
                l = new ia;
                break;
            case 65534:
                l = new ACT_PLAYSAMPLE;
                break;
            case 131070:
                l = new wb;
                break;
            case 327678:
                l = new ACT_PLAYLOOPSAMPLE;
                break;
            case 458750:
                l = new xb;
                break;
            case 524286:
                l = new ACT_PAUSESAMPLE;
                break;
            case 589822:
                l = new ACT_RESUMESAMPLE;
                break;
            case 786430:
                l = new yb;
                break;
            case 851966:
                l = new zb;
                break;
            case 917502:
                l = new ACT_PAUSECHANNEL;
                break;
            case 983038:
                l = new ACT_RESUMECHANNEL;
                break;
            case 1048574:
                l = new ACT_STOPCHANNEL;
                break;
            case 1114110:
                l = new ACT_SETCHANNELPOS;
                break;
            case 1179646:
                l = new Ab;
                break;
            case 1245182:
                l = new ia;
                break;
            case 1310718:
                l = new ACT_SETSAMPLEPOS;
                break;
            case 1376254:
                l = new ACT_SETSAMPLEMAINVOL;
                break;
            case 1441790:
                l = new ACT_SETSAMPLEVOL;
                break;
            case 1507326:
                l = new ia;
                break;
            case 1572862:
                l = new ia;
                break;
            case 1638398:
                l = new ACT_PAUSEALLCHANNELS;
                break;
            case 1703934:
                l = new ACT_RESUMEALLCHANNELS;
                break;
            case 2031614:
                l = new ACT_LOCKCHANNEL;
                break;
            case 2097150:
                l = new ACT_UNLOCKCHANNEL;
                break;
            case 2162686:
                l = new ACT_SETCHANNELFREQ;
                break;
            case 2228222:
                l = new ACT_SETSAMPLEFREQ;
                break;
            case 2424830:
                l = new ACT_PLAYSAMPLE2;
                break;
            case 65533:
                l = new Bb;
                break;
            case 131069:
                l = new ACT_PREVLEVEL;
                break;
            case 196605:
                l = new Cb;
                break;
            case 262141:
                l = new ACT_PAUSEKEY;
                break;
            case 327677:
                l =
                    new Db;
                break;
            case 393213:
                l = new ACT_RESTARTGAME;
                break;
            case 458749:
                l = new ACT_RESTARTLEVEL;
                break;
            case 524285:
                l = new Eb;
                break;
            case 589821:
                l = new ACT_CDISPLAYX;
                break;
            case 655357:
                l = new ACT_CDISPLAYY;
                break;
            case 983037:
                l = new ACT_FULLSCREENMODE;
                break;
            case 1048573:
                l = new ACT_WINDOWEDMODE;
                break;
            case 1114109:
                l = new ACT_SETFRAMERATE;
                break;
            case 1179645:
                l = new ACT_PAUSEKEY;
                break;
            case 1245181:
                l = new ACT_PAUSEANYKEY;
                break;
            case 1310717:
                l = new ACT_SETVSYNCON;
                break;
            case 1376253:
                l = new ACT_SETVSYNCOFF;
                break;
            case 1441789:
                l = new ACT_SETVIRTUALWIDTH;
                break;
            case 1507325:
                l = new ACT_SETVIRTUALHEIGHT;
                break;
            case 1572861:
                l = new ACT_SETFRAMEBDKCOLOR;
                break;
            case 1638397:
                l = new ACT_DELCREATEDBKDAT;
                break;
            case 1703933:
                l = new ACT_DELALLCREATEDBKD;
                break;
            case 1769469:
                l = new ACT_SETFRAMEWIDTH;
                break;
            case 1835005:
                l = new ACT_SETFRAMEHEIGHT;
                break;
            case 2097149:
                l = new ACT_PLAYDEMO;
                break;
            case 2162685:
                l = new ia;
                break;
            case 2228221:
                l = new ia;
                break;
            case 2293757:
                l = new ia;
                break;
            case 2359293:
                l = new ia;
                break;
            case 2424829:
                l = new ia;
                break;
            case 2490365:
                l = new ACT_SETSTRETCHRESAMPLING;
                break;
            case 65532:
                l = new ACT_SETTIMER;
                break;
            case 131068:
                l = new ACT_EVENTAFTER;
                break;
            case 196604:
                l = new ACT_NEVENTSAFTER;
                break;
            case 65530:
                l = new ACT_HIDECURSOR;
                break;
            case 131066:
                l = new Fb;
                break;
            case 65529:
                l = new Gb;
                break;
            case 131065:
                l = new Ib;
                break;
            case 196601:
                l = new Jb;
                break;
            case 262137:
                l = new Kb;
                break;
            case 327673:
                l = new ACT_ADDSCORE;
                break;
            case 393209:
                l = new ACT_ADDLIVES;
                break;
            case 458745:
                l = new ACT_SUBSCORE;
                break;
            case 524281:
                l = new Hb;
                break;
            case 589817:
                l = new ACT_SETINPUT;
                break;
            case 655353:
                l = new ACT_SETINPUTKEY;
                break;
            case 720889:
                l = new ACT_SETPLAYERNAME;
                break;
            case 65531:
                l = new Lb;
                break;
            case 131067:
                l = new ACT_CREATEBYNAME;
                break;
            case 196603:
                l = new ACT_CREATEEXP;
                break;
            case 262139:
                l = new ACT_CREATEBYNAMEEXP;
                break;
            case 5242883:
                l = new ACT_STRDESTROY;
                break;
            case 5308419:
                l = new ACT_STRDISPLAY;
                break;
            case 5373955:
                l = new ACT_STRDISPLAYDURING;
                break;
            case 5439491:
                l = new ACT_STRSETCOLOUR;
                break;
            case 5505027:
                l = new ACT_STRSET;
                break;
            case 5570563:
                l = new ACT_STRPREV;
                break;
            case 5636099:
                l = new ACT_STRNEXT;
                break;
            case 5701635:
                l = new ACT_STRDISPLAYSTRING;
                break;
            case 5767171:
                l = new Mb;
                break;
            case 5242882:
                l = new ACT_SPRPASTE;
                break;
            case 5308418:
                l = new ACT_SPRFRONT;
                break;
            case 5373954:
                l = new ACT_SPRBACK;
                break;
            case 5439490:
                l = new ACT_SPRADDBKD;
                break;
            case 5505026:
                l = new ACT_SPRREPLACECOLOR;
                break;
            case 5570562:
                l = new Nb;
                break;
            case 5636098:
                l = new Ob;
                break;
            case 5701634:
                l = new Pb;
                break;
            case 5767170:
                l = new ACT_SPRSETANGLE;
                break;
            case 5242887:
                l = new Qb;
                break;
            case 5308423:
                l = new Rb;
                break;
            case 5373959:
                l = new Sb;
                break;
            case 5439495:
                l = new ACT_CSETMIN;
                break;
            case 5505031:
                l = new ACT_CSETMAX;
                break;
            case 5570567:
                l = new ACT_CSETCOLOR1;
                break;
            case 5636103:
                l = new ACT_CSETCOLOR2;
                break;
            case 5242884:
                l = new ACT_QASK;
                break;
            case 5242889:
                l = new ACT_CCARESTARTAPP;
                break;
            case 5308425:
                l = new ACT_CCARESTARTFRAME;
                break;
            case 5373961:
                l = new ACT_CCANEXTFRAME;
                break;
            case 5439497:
                l = new ACT_CCAPREVIOUSFRAME;
                break;
            case 5505033:
                l = new ACT_CCAENDAPP;
                break;
            case 5636105:
                l = new ACT_CCAJUMPFRAME;
                break;
            case 5701641:
                l = new ACT_CCASETGLOBALVALUE;
                break;
            case 5767177:
                l = new ACT_CCASHOW;
                break;
            case 5832713:
                l = new ACT_CCAHIDE;
                break;
            case 5898249:
                l =
                    new ACT_CCASETGLOBALSTRING;
                break;
            case 5963785:
                l = new ACT_CCAPAUSEAPP;
                break;
            case 6029321:
                l = new ACT_CCARESUMEAPP;
                break;
            case 6094857:
                l = new ACT_CCASETWIDTH;
                break;
            case 6160393:
                l = new ACT_CCASETHEIGHT;
                break;
            default:
                switch (n & 4294901760) {
                    case 0:
                        l = new ACT_EXTEXTRA;
                        k = !0;
                        break;
                    case 65536:
                        l = new Tb;
                        break;
                    case 131072:
                        l = new Ub;
                        break;
                    case 196608:
                        l = new Vb;
                        break;
                    case 262144:
                        l = new ACT_EXTSTOP;
                        break;
                    case 327680:
                        l = new ACT_EXTSTART;
                        break;
                    case 393216:
                        l = new Wb;
                        break;
                    case 458752:
                        l = new ACT_EXTMAXSPEED;
                        break;
                    case 524288:
                        l = new ACT_EXTWRAP;
                        break;
                    case 589824:
                        l = new ACT_EXTBOUNCE;
                        break;
                    case 655360:
                        l = new ACT_EXTREVERSE;
                        break;
                    case 720896:
                        l = new Xb;
                        break;
                    case 786432:
                        l = new ACT_EXTPREVMOVE;
                        break;
                    case 851968:
                        l = new Yb;
                        break;
                    case 917504:
                        l = new Zb;
                        break;
                    case 983040:
                        l = new $b;
                        break;
                    case 1048576:
                        l = new ac;
                        break;
                    case 1114112:
                        l = new bc;
                        break;
                    case 1179648:
                        l = new ACT_EXTFORCEDIR;
                        break;
                    case 1245184:
                        l = new cc;
                        break;
                    case 1310720:
                        l = new ACT_EXTRESTANIM;
                        break;
                    case 1376256:
                        l = new ACT_EXTRESTDIR;
                        break;
                    case 1441792:
                        l = new ACT_EXTRESTSPEED;
                        break;
                    case 1507328:
                        l = new dc;
                        break;
                    case 1572864:
                        l = new ec;
                        break;
                    case 1638400:
                        l = new ACT_EXTSHUFFLE;
                        break;
                    case 1703936:
                        l = new fc;
                        break;
                    case 1769472:
                        l = new gc;
                        break;
                    case 1835008:
                        l = new ACT_EXTDISPLAYDURING;
                        break;
                    case 1900544:
                        l = new hc;
                        break;
                    case 1966080:
                        l = new ACT_EXTSHOOTTOWARD;
                        break;
                    case 2031616:
                        l = new ic;
                        e = !0;
                        break;
                    case 2097152:
                        l = new kc;
                        f = !0;
                        break;
                    case 2162688:
                        l = new mc;
                        g = !0;
                        break;
                    case 2228224:
                        l = new ACT_EXTDISPATCHVAR;
                        break;
                    case 2293760:
                        l = new ACT_EXTSETFLAG;
                        h = !0;
                        break;
                    case 2359296:
                        l = new ACT_EXTCLRFLAG;
                        q = !0;
                        break;
                    case 2424832:
                        l = new ACT_EXTCHGFLAG;
                        F = !0;
                        break;
                    case 2490368:
                        l = new ACT_EXTINKEFFECT;
                        break;
                    case 2555904:
                        l = new ACT_EXTSETSEMITRANSPARENCY;
                        break;
                    case 2621440:
                        l = new oc;
                        break;
                    case 2686976:
                        l = new ACT_EXTRESTFRAME;
                        break;
                    case 2752512:
                        l = new ACT_EXTSETACCELERATION;
                        break;
                    case 2818048:
                        l = new ACT_EXTSETDECELERATION;
                        break;
                    case 2883584:
                        l = new ACT_EXTSETROTATINGSPEED;
                        break;
                    case 2949120:
                        l = new ACT_EXTSETDIRECTIONS;
                        break;
                    case 3014656:
                        l = new ACT_EXTBRANCHNODE;
                        break;
                    case 3080192:
                        l = new ACT_EXTSETGRAVITY;
                        break;
                    case 3145728:
                        l = new ACT_EXTGOTONODE;
                        break;
                    case 3211264:
                        l =
                            new ACT_EXTSETVARSTRING;
                        break;
                    case 3276800:
                        l = new ACT_EXTSETFONTNAME;
                        break;
                    case 3342336:
                        l = new ACT_EXTSETFONTSIZE;
                        break;
                    case 3407872:
                        l = new ACT_EXTSETBOLD;
                        break;
                    case 3473408:
                        l = new ACT_EXTSETITALIC;
                        break;
                    case 3538944:
                        l = new ACT_EXTSETUNDERLINE;
                        break;
                    case 3604480:
                        l = new ia;
                        break;
                    case 3670016:
                        l = new ACT_EXTSETTEXTCOLOR;
                        break;
                    case 3735552:
                        l = new pc;
                        break;
                    case 3801088:
                        l = new qc;
                        break;
                    case 3866624:
                        l = new ACT_EXTMOVEBEFORE;
                        break;
                    case 3932160:
                        l = new ACT_EXTMOVEAFTER;
                        break;
                    case 3997696:
                        l = new rc;
                        break;
                    case 4063232:
                        l =
                            new ia;
                        break;
                    case 4128768:
                        l = new ACT_EXTSETEFFECT;
                        break;
                    case 4194304:
                        l = new ia;
                        break;
                    case 4259840:
                        l = new sc;
                        break;
                    case 4325376:
                        l = new ACT_EXTSETRGBCOEF;
                        break;
                    case 4390912:
                        l = new ia;
                        break;
                    case 4456448:
                        l = new ACT_EXTSETFRICTION;
                        break;
                    case 4521984:
                        l = new ACT_EXTSETELASTICITY;
                        break;
                    case 4587520:
                        l = new ACT_EXTAPPLYIMPULSE;
                        break;
                    case 4653056:
                        l = new ACT_EXTAPPLYANGULARIMPULSE;
                        break;
                    case 4718592:
                        l = new ACT_EXTAPPLYFORCE;
                        break;
                    case 4784128:
                        l = new ACT_EXTAPPLYTORQUE;
                        break;
                    case 4849664:
                        l = new ACT_EXTSETLINEARVELOCITY;
                        break;
                    case 4915200:
                        l = new ACT_EXTSETANGULARVELOCITY;
                        break;
                    case 4980736:
                        l = new ACT_EXTFOREACH;
                        break;
                    case 5046272:
                        l = new ACT_EXTFOREACH2;
                        break;
                    case 5111808:
                        l = new ACT_EXTSTOPFORCE;
                        break;
                    case 5177344:
                        l = new ACT_EXTSTOPTORQUE;
                        break;
                    default:
                        l = new Me
                }
        }
        if (null != l) {
            l.ha = n;
            l.Rb = a.file.$();
            l.gb = a.file.$();
            l.Ma = a.file.nb();
            l.Pd = a.file.nb();
            l.pc = a.file.nb();
            l.Uk = a.file.nb();
            n = 0;
            if (k) {
                l.pc--;
                var k = a.file.U,
                    r = a.file.l();
                a.file.l();
                n = a.file.l();
                a.file.seek(k + r)
            }
            if (0 < l.pc)
                for (l.j = Array(l.pc), k = 0; k < l.pc; k++) l.j[k] = Ya.create(a);
            if (0 != n) {
                k = null;
                switch (n) {
                    case 1:
                        k = new ACT_EXTSETFLAGBYEXP
                }
                null != k && (k.ha = l.ha, k.Rb = l.Rb, k.gb = l.gb, k.Ma = l.Ma, k.Pd = l.Pd, k.pc = l.pc, k.Uk = l.Uk, k.j = l.j, l = k)
            }
            if (b || c || d) b = l.j[0], l.Hd = b.value, b = l.j[1], l.value = b.la[0].value;
            if (e || f || g) k = null, b = l.j[0], 53 != b.code && (c = b.value, b = l.j[1], 0 <= c && 2 == b.la.length && (0 >= b.la[1].code || 1310720 <= b.la[1].code) && (65535 == b.la[0].code || 1572863 == b.la[0].code) && (e ? (k = new jc, k.Hd = c, k.value = b.la[0].value) : f ? (k = new lc, k.Hd = c, k.value = b.la[0].value) : g && (k = new nc, k.Hd = c, k.value = b.la[0].value)),
                null != k && (k.ha = l.ha, k.Rb = l.Rb, k.gb = l.gb, k.Ma = l.Ma, k.Pd = l.Pd, k.pc = l.pc, k.Uk = l.Uk, k.j = l.j, l = k));
            if (h || q || F) k = null, e = l.j[0], 2 == e.la.length && (0 >= e.la[1].code || 1310720 <= e.la[1].code) && 65535 == e.la[0].code && (h ? (k = new ACT_EXTSETFLAGCONST, k.T = 1 << e.la[0].value) : q ? (k = new ACT_EXTCLRFLAGCONST, k.T = 1 << e.la[0].value) : F && (k = new ACT_EXTCHGFLAGCONST, k.T = 1 << e.la[0].value)), null != k && (k.ha = l.ha, k.Rb = l.Rb, k.gb = l.gb, k.Ma = l.Ma, k.Pd = l.Pd, k.pc = l.pc, k.Uk = l.Uk, k.j = l.j, l = k)
        }
        a.file.seek(p + m);
        return l
    };
    vb.ZP = 1;
    ia.prototype = {
        ga: function () {}
    };
    wb.prototype = {
        ga: function (a) {
            a.h.mc.It()
        }
    };
    xb.prototype = {
        ga: function (a) {
            var b = this.j[0];
            45 == b.code ? (b = a.bl(b), b = a.h.Me.Lr(b)) : b = b.Zp;
            0 <= b && a.h.mc.fO(b)
        }
    };
    yb.prototype = {
        ga: function (a) {
            var b = this.j[0],
                c = a.wa(this.j[1]),
                d = !1;
            45 == b.code ? (b = a.bl(b), b = a.h.Me.Lr(b)) : (d = 0 != (b.IE & Ra.UI), b = b.Zp);
            0 <= b && a.h.mc.play(b, 1, c - 1, d, -1, 0)
        }
    };
    zb.prototype = {
        ga: function (a) {
            var b = this.j[0],
                c = !1;
            45 == b.code ? (b = a.bl(b), b = a.h.Me.Lr(b)) : (c = 0 != (b.IE & Ra.UI), b = b.Zp);
            var d = a.wa(this.j[1]),
                e = a.wa(this.j[2]);
            0 <= b && a.h.mc.play(b, e, d -
                1, c, -1, 0)
        }
    };
    Ab.prototype = {
        ga: function (a) {
            var b = a.wa(this.j[0]),
                c = a.wa(this.j[1]);
            0 <= c && 100 >= c && a.h.mc.VN(b - 1, c)
        }
    };
    Bb.prototype = {
        ga: function (a) {
            a.Bb = k.Aq;
            a.h.Li = !0
        }
    };
    Cb.prototype = {
        ga: function (a) {
            var b;
            if (26 == this.j[0].code) {
                if (b = this.j[0].value, -1 == a.h.TH(b)) return
            } else {
                b = a.wa(this.j[0]) - 1;
                if (0 > b || 4096 <= b) return;
                a.h.aT && b++;
                b |= 32768
            }
            a.Bb = k.zq;
            a.wn = b;
            a.h.Li = !0
        }
    };
    Db.prototype = {
        ga: function (a) {
            a.h.Li = !0;
            a.h.bC && !a.h.aU && (a.Bb = k.yq)
        }
    };
    Eb.prototype = {
        ga: function (a) {
            var b = new Fa;
            this.j[0].Bl(a, 0, b);
            a.NN(b.x,
                b.y, b.Km, 3)
        }
    };
    Fb.prototype = {
        ga: function (a) {
            0 == a.ff && a.fy()
        }
    };
    Gb.prototype = {
        ga: function (a) {
            var b = a.wa(this.j[0]),
                c = this.Rb,
                d = a.h.Kr();
            d[c] = b;
            a.ZE(c, z.Ou, d[c])
        }
    };
    Hb.prototype = {
        ga: function (a) {
            var b = a.wa(this.j[0]),
                c = this.Rb,
                b = a.h.Dm()[c] - b;
            a.Oz(c, b)
        }
    };
    Ib.prototype = {
        ga: function (a) {
            var b = a.wa(this.j[0]);
            a.Oz(this.Rb, b)
        }
    };
    Jb.prototype = {
        ga: function (a) {
            a.kn[this.Rb] = 0
        }
    };
    Kb.prototype = {
        ga: function (a) {
            a.kn[this.Rb] = 255
        }
    };
    Lb.prototype = {
        ga: function (a) {
            var b = this.j[0],
                c = new Fa;
            b.Bl(a, 17, c) && (c.iv ? (this.Ma |= Z.Pi,
                a.i.Rj = !0) : this.Ma &= ~Z.Pi, b = a.Cr(b.lo, b.tv, c.x, c.y, c.dir, 0, c.Km, -1), 0 <= b && (b = a.H[b], a.i.Vk(b), b && 32 <= b.Aa && a.RJ(b), a.Rn(b) || null != a.HU && a.Hi.fN(b)))
        }
    };
    Mb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.bl(this.j[0]), null == b.Ki || null != b.Ki && a != b.Ki) && (b.YE(a), b.lO(-1))
        }
    };
    Nb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = a.ew(this.j[0]);
                0 > c && (c = 0);
                var d = !1;
                0 != a.wa(this.j[1]) && (d = !0);
                b.D.P &= ~u.Bk;
                d && (b.D.P |= u.Bk);
                b.Wp(c, c)
            }
        }
    };
    Ob.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = a.ew(this.j[0]);
                0 > c && (c = 0);
                var d = !1;
                0 != a.wa(this.j[1]) && (d = !0);
                b.D.P &= ~u.Bk;
                d && (b.D.P |= u.Bk);
                b.Wp(c, b.b.tb)
            }
        }
    };
    Pb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = a.ew(this.j[0]);
                0 > c && (c = 0);
                var d = !1;
                0 != a.wa(this.j[1]) && (d = !0);
                b.D.P &= ~u.Bk;
                d && (b.D.P |= u.Bk);
                b.Wp(b.b.sb, c)
            }
        }
    };
    Qb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.Ve(this.j[0]), b.Av(a), b.po(a))
        }
    };
    Rb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.Ve(this.j[0]), b.rK(a))
        }
    };
    Sb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.Ve(this.j[0]), b.sK(a))
        }
    };
    Tb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = new Fa;
                this.j[0].Bl(a, 1, c) && (k.kc(b, c.x), k.lc(b, c.y), -1 != c.dir && (c = c.dir &= 31, a.Ib(b) != c && (b.b.Pa = c, b.b.N = !0, b.A.pa.Le(c), 2 == b.Aa && b.Z.Wh(0))))
            }
        }
    };
    Ub.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.wa(this.j[0]), k.kc(b, Math.floor(a)))
        }
    };
    Vb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.wa(this.j[0]), k.lc(b, Math.floor(a)))
        }
    };
    Wb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.wa(this.j[0]), null != b.A && b.A.pa.hf(a))
        }
    };
    Xb.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && null != a.A && a.A.BM(a)
        }
    };
    Yb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value, null != b.A && b.A.LN(b, a))
        }
    };
    Zb.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = new Fa;
                if (this.j[0].Bl(a, 0, c)) {
                    var d = c.x,
                        e = c.y,
                        d = d - b.w,
                        e = e - b.u,
                        c = a.Rn(b);
                    null == c ? (d = k.uL(d, e), d &= 31, a.Ib(b) != d && (b.b.Pa = d, b.b.N = !0, b.A.pa.Le(d))) :
                        (a = 180 * Math.atan2(-e, d) / 3.141592653589, 0 > a && (a = 360 + a), c.yt(a))
                }
            }
        }
    };
    $b.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && (a.Z.Ap = !0)
        }
    };
    ac.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && (a.Z.Ap = !1)
        }
    };
    bc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = 10 == this.j[0].code ? this.j[0].value : a.wa(this.j[0]), 0 > a && (a = 0), b.Z.eo(a), b.b.N = !0)
        }
    };
    cc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.wa(this.j[0]), b.Z.UJ(a))
        }
    };
    dc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c;
                c =
                    29 == this.j[0].code ? a.dw(this.j[0].value) : a.wa(this.j[0]);
                c &= 31;
                a.Ib(b) != c && (b.b.Pa = c, b.b.N = !0, b.A.pa.Le(c), 2 == b.Aa && b.Z.Wh(0))
            }
        }
    };
    ec.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (3 == b.Aa ? 0 != (b.bE & k.Oy) ? (b.D.jp(), b.D.P &= ~u.Uh, b.Y |= M.Kh) : (b.Y |= M.Pe, a.$f(b.Tb)) : 0 == (b.Y & M.Pe) && (b.Y |= M.Pe, 0 != (b.sa & A.Xi) || 0 != (b.sa & A.Yi) ? a.WB(b) : (b.Lo = !1, a.$f(b.Tb))))
        }
    };
    fc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && k.EM(a)
        }
    };
    gc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && k.FM(a)
        }
    };
    hc.prototype = {
        ga: function (a) {
            var b =
                a.i.Ya(this);
            if (null != b) {
                var c = this.j[0],
                    d = new Fa;
                c.Bl(a, 17, d) && b.XN(c, d.x, d.y, d.dir)
            }
        }
    };
    ic.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c;
                c = 53 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value;
                0 <= c && null != b.S && (c >= b.S.Ta.length && b.S.pj(c + 10), a = a.Ve(this.j[1]), b.S.Ta[c] = a)
            }
        }
    };
    jc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && 0 <= this.Hd && null != a.S && (this.Hd >= a.S.Ta.length && a.S.pj(this.Hd + 10), a.S.Ta[this.Hd] = this.value)
        }
    };
    kc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c;
                c = 53 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value;
                0 <= c && null != b.S && (c >= b.S.Ta.length && b.S.pj(c + 10), a = a.Ve(this.j[1]), b.S.Ta[c] += a)
            }
        }
    };
    lc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && 0 <= this.Hd && null != a.S && (this.Hd >= a.S.Ta.length && a.S.pj(this.Hd + 10), a.S.Ta[this.Hd] += this.value)
        }
    };
    mc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c;
                c = 53 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value;
                0 <= c && null != b.S && (c >= b.S.Ta.length && b.S.pj(c + 10), a = a.Ve(this.j[1]), b.S.Ta[c] -= a)
            }
        }
    };
    nc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && 0 <= this.Hd && null != a.S && (this.Hd >= a.S.Ta.length && a.S.pj(this.Hd + 10), a.S.Ta[this.Hd] -= this.value)
        }
    };
    oc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            null != b && (a = a.wa(this.j[0]), b.Z.TJ(a), b.b.N = !0)
        }
    };
    pc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && a.ce(a.Yk())
        }
    };
    qc.prototype = {
        ga: function (a) {
            a = a.i.Ya(this);
            null != a && a.ce(0)
        }
    };
    rc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b && null != b.D) {
                var c = a.wa(this.j[0]);
                0 < c && c <= a.B.uc && b.od != c - 1 && (--c, null != b.D &&
                    (b.od = c, b.D.Rl = c, b.$h(), b.D.EA(!1)))
            }
        }
    };
    sc.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b && null != b.D) {
                a = m.gK(255 - a.wa(this.j[0]), 0, 255);
                var c = 0 == (b.D.ec & u.$t);
                b.D.ec = b.D.ec & u.yy | u.$t;
                var d = 16777215;
                c || (d = b.D.fc);
                b.D.fc = a << 24 | d & 16777215;
                b.D.zM(b.D.ec, b.D.fc)
            }
        }
    };
    N.vz = 6;
    N.$F = -983041;
    N.aG = -1507329;
    N.bG = -1572865;
    N.create = function (a) {
        var b = a.file.U,
            c = a.file.l(),
            d, e = a.file.v();
        switch (e) {
            case -2752513:
                d = new CND_STARTCHILDEVENT;
                break;
            case -2686977:
                d = new wa;
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
                d = new wa;
                break;
            case -1638401:
                d = new CND_CHANCE;
                break;
            case -1572865:
                d = new wa;
                break;
            case -1507329:
                d = new wa;
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
                d = new wa;
                break;
            case -589825:
                d = new wa;
                break;
            case -524289:
                d = new wa;
                break;
            case -458753:
                d = new CND_COMPAREG;
                break;
            case -393217:
                d = new uc;
                break;
            case -327681:
                d =
                    new vc;
                break;
            case -262145:
                d = new CND_REPEAT;
                break;
            case -196609:
                d = new CND_NOMORE;
                break;
            case -131073:
                d = new wc;
                break;
            case -65537:
                d = new wa;
                break;
            case -1:
                d = new tc;
                break;
            case -524290:
                d = new CND_SPCHANNELPAUSED;
                break;
            case -458754:
                d = new CND_NOSPCHANNELPLAYING;
                break;
            case -327682:
                d = new CND_SPSAMPAUSED;
                break;
            case -131074:
                d = new CND_NOSAMPLAYING;
                break;
            case -2:
                d = new xc;
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
                d = new yc;
                break;
            case -3:
                d = new zc;
                break;
            case -458756:
                d = new Nc;
                break;
            case -393220:
                d = new Mc;
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
                d = new Ac;
                break;
            case -4:
                d = new Bc;
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
                d = new CND_ANYKEY;
                break;
            case -458758:
                d = new CND_MKEYDEPRESSED;
                break;
            case -393222:
                d = new Cc;
                break;
            case -327686:
                d = new CND_MCLICKINZONE;
                break;
            case -262150:
                d = new Dc;
                break;
            case -196614:
                d = new Ec;
                break;
            case -131078:
                d = new CND_MINZONE;
                break;
            case -65542:
                d = new Fc;
                break;
            case -6:
                d = new Gc;
                break;
            case -327687:
                d = new Hc;
                break;
            case -262151:
                d = new CND_NOMORELIVE;
                break;
            case -196615:
                d = new Ic;
                break;
            case -131079:
                d = new Jc;
                break;
            case -65543:
                d = new Kc;
                break;
            case -7:
                d = new CND_PLAYERPLAYING;
                break;
            case -1441797:
                d =
                    new CND_CHOOSEALLINLINE;
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
                d =
                    new CND_CMPANGLE;
                break;
            case -5308409:
                d = new Lc;
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
                        d = new hb;
                        break;
                    case -2752512:
                        d = new hb;
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
                        d =
                            new Oc;
                        break;
                    case -2162688:
                        d = new CND_EXTNOMOREOBJECT;
                        break;
                    case -2097152:
                        d = new Pc;
                        break;
                    case -2031616:
                        d = new CND_EXTNOMOREZONE;
                        break;
                    case -1966080:
                        d = new CND_EXTNUMBERZONE;
                        break;
                    case -1900544:
                        d = new Qc;
                        break;
                    case -1835008:
                        d = new Rc;
                        break;
                    case -1769472:
                        d = new Sc;
                        break;
                    case -1703936:
                        d = new CND_EXTCMPVARFIXED;
                        break;
                    case -1638400:
                        d = new CND_EXTFLAGSET;
                        break;
                    case -1572864:
                        d = new CND_EXTFLAGRESET;
                        break;
                    case -1507328:
                        d = new Tc;
                        break;
                    case -1441792:
                        d = new Uc;
                        break;
                    case -1376256:
                        d = new Vc;
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
                        d = new Wc;
                        break;
                    case -1048576:
                        d = new Xc;
                        break;
                    case -983040:
                        d = new Yc;
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
                        d = new Zc;
                        break;
                    case -458752:
                        d = new $c;
                        break;
                    case -393216:
                        d = new CND_EXTBOUNCING;
                        break;
                    case -327680:
                        d = new CND_EXTREVERSED;
                        break;
                    case -262144:
                        d = new ad;
                        break;
                    case -196608:
                        d = new bd;
                        break;
                    case -131072:
                        d = new cd;
                        break;
                    case -65536:
                        d = new dd;
                        break;
                    default:
                        d = new Ne
                }
        }
        if (null != d && (d.ha = e, d.Rb = a.file.$(), d.gb = a.file.$(), d.Ma = a.file.nb(), d.Pd = a.file.nb(), d.pc = a.file.nb(), d.Uk = a.file.nb(), d.yT = a.file.l(), 0 < d.pc)) {
            d.j = Array(d.pc);
            for (e = 0; e < d.pc; e++) d.j[e] = Ya.create(a); - 2686976 == d.ha && (e = d.j[0], 2 == e.la.length && e.la[0].code == da.am && 0 == e.la[1].code && (d.$S = !0, d.name = e.la[0].Cb.toLowerCase()))
        }
        a.file.seek(b +
            c);
        return d
    };
    N.og = function (a) {
        return a.Pd & W.rk ? !1 : !0
    };
    N.Af = function (a) {
        return a.Pd & W.rk ? !0 : !1
    };
    N.Cs = function (a, b) {
        return a.Pd & W.rk ? !b : b
    };
    N.nK = function (a) {
        var b = a.i.df,
            c = b.nj;
        a = b.nj = a.Xb;
        if (a == c) return !1;
        a--;
        return a == c ? !1 : !0
    };
    N.gT = function (a, b) {
        var c, d = b.Qr;
        if (null == d) d = new Q, b.Qr = d;
        else
            for (c = 0; c < d.size(); c++)
                if (d.get(c) == a) return !1;
        d.add(a);
        d = b.QB;
        if (null == d) return !0;
        for (c = 0; c < d.size(); c++)
            if (d.get(c) == a) return !1;
        return !0
    };
    N.dK = function (a, b) {
        return 0 == b ? !1 : b == a.Xb || b == a.Xb - 1 ? !0 : !1
    };
    wa.prototype = {
        za: function () {
            return !1
        },
        V: function () {
            return !1
        }
    };
    tc.prototype = {
        za: function () {
            return !0
        },
        V: function () {
            return !0
        }
    };
    N.prototype = {
        Se: function (a, b) {
            var c = a.i.ag(this.gb),
                d = a.i.Wc,
                e = this.j[0],
                f;
            f = e.la[0];
            if (0 != (this.Pd & W.Uy))
                for (f = f.code != da.$y && f.code != da.JG || 0 != e.la[1].code ? a.wa(e) : f.value; null != c;) 0 == b.ci(c, f, e.Qe) && (d--, a.i.md()), c = a.i.Te();
            else
                for (; null != c;) f = a.wa(e), 0 == b.ci(c, f, e.Qe) && (d--, a.i.md()), c = a.i.Te();
            return 0 != d ? !0 : !1
        },
        pf: function (a, b) {
            for (var c = a.i.ag(this.gb), d = a.i.Wc; null != c;) 0 == b.mj(c) &&
                (d--, a.i.md()), c = a.i.Te();
            return 0 != d ? !0 : !1
        },
        YB: function (a) {
            if (a.i.sh) return a.i.ag(this.gb), a.i.ag(this.j[0].rb), !1;
            var b = !1;
            0 != (this.Pd & W.rk) && (b = !0);
            var c = a.i.ag(this.gb);
            if (null == c) return N.Af(this);
            var d = a.i.Wc,
                e = this.j[0].Df;
            0 <= e ? (a.qw[0] = e, a.qw[1] = this.j[0].rb, e = a.qw) : e = a.i.gd[this.j[0].rb & 32767].L;
            var f, g = new Q,
                h, q;
            do {
                h = c.w;
                q = c.u;
                3 <= this.pc && (h = a.wa(this.j[1]), q = a.wa(this.j[2]));
                f = a.Um(c, c.b.Qa, c.b.cb, c.b.sb, c.b.tb, h, q, e);
                if (null == f) 0 == b && (d--, a.i.md());
                else {
                    c = !1;
                    for (h = 0; h < f.size(); h++) q =
                        f.get(h), 0 == (q.Y & M.Pe) && (g.add(q), c = !0);
                    1 == b ? 1 == c && (d--, a.i.md()) : 0 == c && (d--, a.i.md())
                }
                c = a.i.Te()
            } while (null != c);
            if (0 == d) return !1;
            c = a.i.ag(this.j[0].rb);
            if (null == c) return !1;
            d = a.i.Wc;
            if (0 == b) {
                do {
                    for (h = 0; h < g.size() && (q = g.get(h), c != q); h++);
                    h == g.size() && (d--, a.i.md());
                    c = a.i.Te()
                } while (null != c);
                return 0 != d ? !0 : !1
            }
            do {
                for (h = 0; h < g.size(); h++)
                    if (q = g.get(h), c == q) {
                        d--;
                        a.i.md();
                        break
                    } c = a.i.Te()
            } while (null != c);
            return 0 != d ? !0 : !1
        }
    };
    uc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            a = a.i.df;
            if (0 != (a.ra &
                    L.Nn)) return !0;
            if (0 != (a.ra & L.Mn)) return !1;
            a.nj = -2;
            a.ra |= L.Nn;
            return !0
        }
    };
    vc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            a = a.i.df;
            if (0 != (a.ra & L.uq)) return !1;
            a.ra |= L.uq;
            return !0
        }
    };
    wc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = a.Ve(this.j[0]);
            a = a.Ve(this.j[1]);
            return k.Zh(b, a, this.j[1].Qe)
        }
    };
    xc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = this.j[0],
                c = !1;
            45 == b.code ? (b = a.bl(b), b = a.h.Me.Lr(b)) : b = b.Zp;
            0 <= b && (c = a.h.mc.TL(b));
            return c ? N.Af(this) : N.og(this)
        }
    };
    yc.prototype = {
        za: function () {
            return !0
        },
        V: function () {
            return !0
        }
    };
    zc.prototype = {
        za: function (a) {
            return 2 < a.Xb ? !1 : !0
        },
        V: function (a) {
            return 2 < a.Xb ? !1 : !0
        }
    };
    Ac.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b;
            b = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].Ec;
            return a.vg > b ? !1 : !0
        }
    };
    Bc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b;
            b = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].Ec;
            return a.vg > b ? !0 : !1
        }
    };
    Cc.prototype = {
        za: function (a) {
            if (a.i.Gb != this.j[0].value) return !1;
            var b = a.i.Xx,
                c = this.j[1];
            if (b == c.Df) return a.i.Vk(a.i.Vx), !0;
            c = c.rb;
            if (0 == (c & 32768)) return !1;
            var d = a.i.gd[c & 32767],
                e;
            for (e = 0; e < d.L.length && !(0 > d.L[e]); e += 2)
                if (d.L[e] == b) return a.i.TK(c), a.i.Vk(a.i.Vx), !0;
            return !1
        },
        V: function (a) {
            return a.i.ft != this.j[0].value ? !1 : a.EB(this.j[1].rb, !1)
        }
    };
    Dc.prototype = {
        za: function (a) {
            return this.j[0].value != a.i.Gb ? !1 : !0
        },
        V: function (a) {
            return this.j[0].value == a.i.ft ? !0 : !1
        }
    };
    Ec.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            return a.EB(this.j[0].rb, 0 != (this.Pd & W.rk))
        }
    };
    Fc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            return N.Cs(this, a.h.cd[this.j[0].key])
        }
    };
    Gc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            return 0 == a.h.cd[this.j[0].key] ? N.Af(this) : N.nK(a) ? N.og(this) : N.Af(this)
        }
    };
    Hc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            a = a.Pc[this.Rb];
            a &= this.j[0].value;
            return a != this.j[0].value ? N.Af(this) : N.og(this)
        }
    };
    Ic.prototype = {
        za: function (a) {
            if (this.Rb != a.i.Wx) return !1;
            a = a.i.Gb;
            a &= this.j[0].value;
            return a != this.j[0].value ? !1 : !0
        },
        V: function (a) {
            var b =
                this.Rb;
            a = a.gt[b] & a.Pc[b];
            a &= this.j[0].value;
            return this.j[0].value != a ? !1 : !0
        }
    };
    Jc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = a.Ve(this.j[0]);
            return k.Zh(a.h.Dm()[this.Rb], b, this.j[0].Qe)
        }
    };
    Kc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = a.h.Kr();
            a = a.Ve(this.j[0]);
            return k.Zh(b[this.Rb], a, this.j[0].Qe)
        }
    };
    Lc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            for (var b = a.i.ag(this.gb), c = a.i.Wc, d; null != b;) b = b.ya, d = a.Ve(this.j[0]), 0 == k.Zh(b, d, this.j[0].Qe) &&
                (c--, a.i.md()), b = a.i.Te();
            return 0 != c
        }
    };
    Mc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b;
            b = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].Ec;
            var c = this.j[1];
            if (a.vg >= b) {
                if (c.value == a.Xb) return c.value = a.Xb + 1, !1;
                c.value = a.Xb + 1;
                return !0
            }
            return !1
        }
    };
    Nc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = this.j[1];
            if (0 == b.Qt) a = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].Ec, b.value = a, b.Qt = -1;
            else if (b.value -= a.Ip, 0 >= b.value) return a = 22 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].Ec,
                b.value += a, !0;
            return !1
        }
    };
    Oc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            a.i.yA(this.gb, -1);
            if (0 == a.i.Wc) return !1;
            var b = a.random(a.i.Wc),
                b = a.i.yA(this.gb, b);
            if (0 < this.pc) {
                var c = this.j[0];
                if (68 == c.code && 0 == c.evaluate(b)) return !1
            }
            a.i.UK(this.gb, b);
            return !0
        }
    };
    Pc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = 0,
                c, d = this.gb;
            if (0 == (d & 32768)) c = a.X[d], b = c.lh;
            else if (32767 != (d & 32767)) {
                var d = a.i.gd[d & 32767],
                    e;
                for (e = 0; e < d.L.length; e += 2) {
                    c = d.L[e + 1];
                    if (0 > c) break;
                    c = a.X[c];
                    b += c.lh
                }
            }
            a =
                a.wa(this.j[0]);
            return k.mo(b, a, this.j[0].Qe)
        }
    };
    Qc.prototype = m.extend(new N, {
        za: function (a) {
            return this.pf(a, this)
        },
        V: function (a) {
            return this.pf(a, this)
        },
        mj: function (a) {
            return N.Cs(this, 0 == (a.D.P & u.Kg))
        }
    });
    Rc.prototype = m.extend(new N, {
        za: function (a) {
            return this.pf(a, this)
        },
        V: function (a) {
            return this.pf(a, this)
        },
        mj: function (a) {
            return 0 != (a.D.P & u.Kg) ? !0 : !1
        }
    });
    Sc.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = a.i.ag(this.gb);
            if (null == b) return !1;
            var c = a.i.Wc,
                d, e = this.j[1],
                f;
            if (0 != (this.Pd &
                    W.Uy)) {
                f = 53 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value;
                d = a.Ve(e);
                do 0 <= f && null != b.S ? (b = f < b.S.Ta.length ? b.S.Em(f) : 0, 0 == k.Zh(b, d, e.Qe) && (c--, a.i.md())) : (c--, a.i.md()), b = a.i.Te(); while (null != b)
            } else {
                do f = 53 == this.j[0].code ? a.wa(this.j[0]) : this.j[0].value, 0 <= f && null != b.S ? (b = f < b.S.Ta.length ? b.S.Em(f) : 0, d = a.Ve(e), 0 == k.Zh(b, d, e.Qe) && (c--, a.i.md())) : (c--, a.i.md()), b = a.i.Te(); while (null != b)
            }
            return 0 != c
        }
    };
    hb.prototype = {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            var b = a.i.ag(this.gb);
            if (null == b) return !1;
            var c = a.i.Wc,
                d = this.j[0].value,
                e = this.j[1],
                f = e.la[0].value;
            do 0 <= d && null != b.S ? (b = d < b.S.Ta.length ? b.S.Em(d) : 0, 0 == k.Zh(b, f, e.Qe) && (c--, a.i.md())) : (c--, a.i.md()), b = a.i.Te(); while (null != b);
            return 0 != c
        }
    };
    Tc.prototype = m.extend(new N, {
        za: function (a) {
            return this.pf(a, this)
        },
        V: function (a) {
            return this.pf(a, this)
        },
        mj: function (a) {
            var b = a.w,
                c = a.u;
            2 <= this.pc && (b = a.c.wa(this.j[0]), c = a.c.wa(this.j[1]));
            return a.c.Jk(a, a.b.Qa, a.b.cb, a.b.sb, a.b.tb, b, c, 0, na.Hn) || a.c.Jk(a, a.b.Qa, a.b.cb, a.b.sb, a.b.tb, b, c, 0, na.ue) ? N.og(this) :
                N.Af(this)
        }
    });
    Uc.prototype = m.extend(new N, {
        za: function (a) {
            return this.Se(a, this)
        },
        V: function (a) {
            return this.Se(a, this)
        },
        ci: function (a, b) {
            var c = a.c.ca + b,
                d = a.w - a.na;
            if (d <= c) return N.og(this);
            c = a.c.ca + a.c.Kl - b;
            d += a.K;
            if (d >= c) return N.og(this);
            c = a.c.fa + b;
            d = a.u - a.oa;
            if (d <= c) return N.og(this);
            c = a.c.fa + a.c.Ll - b;
            d += a.M;
            return d >= c ? N.og(this) : N.Af(this)
        }
    });
    Vc.prototype = m.extend(new N, {
        za: function () {
            return !0
        },
        V: function (a) {
            return this.pf(a, this)
        },
        mj: function (a) {
            return a.b.wc != U.BI ? !1 : N.dK(a.c, a.Mo)
        }
    });
    Wc.prototype =
        m.extend(new N, {
            za: function (a) {
                return this.Se(a, this)
            },
            V: function (a) {
                return this.Se(a, this)
            },
            ci: function (a, b, c) {
                return k.mo(a.w, b, c)
            }
        });
    Xc.prototype = m.extend(new N, {
        za: function (a) {
            return this.Se(a, this)
        },
        V: function (a) {
            return this.Se(a, this)
        },
        ci: function (a, b, c) {
            return k.mo(a.u, b, c)
        }
    });
    Yc.prototype = m.extend(new N, {
        za: function (a) {
            return this.Se(a, this)
        },
        V: function (a) {
            return this.Se(a, this)
        },
        ci: function (a, b, c) {
            return k.mo(a.b.ea, b, c)
        }
    });
    Zc.prototype = m.extend(new N, {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            return 29 ==
                this.j[0].code ? this.pf(a, this) : this.Se(a, this)
        },
        mj: function (a) {
            var b = this.j[0].value,
                c;
            for (c = 0; 32 > c; c++)
                if (0 != (1 << c & b) && a.c.Ib(a) == c) return N.og(this);
            return N.Af(this)
        },
        ci: function (a, b) {
            return N.Cs(this, a.b.Pa == (b & 31))
        }
    });
    $c.prototype = m.extend(new N, {
        za: function (a) {
            return this.pf(a, this)
        },
        V: function (a) {
            return this.pf(a, this)
        },
        mj: function (a) {
            return N.Cs(this, 0 == a.b.ea)
        }
    });
    ad.prototype = m.extend(new N, {
        za: function (a) {
            return this.YB(a)
        },
        V: function (a) {
            return this.YB(a)
        }
    });
    bd.prototype = m.extend(new N, {
        za: function (a) {
            return this.V(a)
        },
        V: function (a) {
            return 10 == this.j[0].code ? this.pf(a, this) : this.Se(a, this)
        },
        mj: function (a) {
            return this.j[0].value != a.Z.Bi ? N.Af(this) : 0 != a.Z.Yd ? N.og(this) : N.Af(this)
        },
        ci: function (a, b) {
            return b != a.Z.Bi ? N.Af(this) : 0 != a.Z.Yd ? N.og(this) : N.Af(this)
        }
    });
    cd.prototype = m.extend(new N, {
        za: function (a, b) {
            if ((10 == this.j[0].code ? this.j[0].value : a.wa(this.j[0])) != a.i.Gb) return !1;
            a.i.Vk(b);
            return !0
        },
        V: function (a) {
            return 10 == this.j[0].code ? this.pf(a, this) : this.Se(a, this)
        },
        mj: function (a) {
            return this.j[0].value !=
                a.Z.Bi ? !1 : 0 == a.Z.Yd ? !0 : !1
        },
        ci: function (a, b) {
            return b != a.Z.Bi ? !1 : 0 == a.Z.Yd ? !0 : !1
        }
    });
    dd.prototype = m.extend(new N, {
        za: function (a) {
            return this.Se(a, this)
        },
        V: function (a) {
            return this.Se(a, this)
        },
        ci: function (a, b, c) {
            return k.mo(a.Z.bf, b, c)
        }
    });
    da.VP = 8960;
    da.XP = 9216;
    da.UP = 9472;
    da.YP = 9728;
    da.SP = 9984;
    da.WP = 10752;
    da.TP = 11008;
    da.am = 262143;
    da.$y = 65535;
    da.JG = 1572863;
    da.create = function (a) {
        var b = a.U,
            c, d = a.v();
        switch (d) {
            case 0:
                c = new xa;
                break;
            case 131072:
                c = new nd;
                break;
            case 262144:
                c = new od;
                break;
            case 393216:
                c = new pd;
                break;
            case 524288:
                c = new qd;
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
                c = new jb;
                break;
            case 131071:
                c = new rd;
                break;
            case 196607:
                c = new EXP_VARGLO;
                break;
            case 262143:
                c = new jd;
                break;
            case 327679:
                c = new sd;
                break;
            case 393215:
                c = new EXP_VAL;
                break;
            case 458751:
            case 524287:
            case 589823:
            case 655359:
                c = new ib;
                break;
            case 720895:
                c = new EXP_SIN;
                break;
            case 786431:
                c = new EXP_COS;
                break;
            case 851967:
                c =
                    new EXP_TAN;
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
                c = new ed;
                break;
            case 1638399:
                c = new id;
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
                c =
                    new EXP_STRINGGLO;
                break;
            case 3342335:
                c = new hd;
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
                c = new xa;
                break;
            case 4063231:
                c = new ib;
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
                c = new kd;
                break;
            case -1:
                c = new td;
                break;
            case -65537:
                c = new ud;
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
                c = new vd;
                break;
            case 262142:
                c = new xa;
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
                c = new xa;
                break;
            case 1048573:
                c = new xa;
                break;
            case 1114109:
                c = new EXP_FRAMEALPHACOEF;
                break;
            case 1179645:
                c = new EXP_FRAMERGBCOEF;
                break;
            case 1245181:
                c = new xa;
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
                c =
                    new EXP_TIMMINITS;
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
                c = new wd;
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
                c = new xd;
                break;
            case 5373954:
                c = new yd;
                break;
            case 5439490:
                c = new EXP_GETANGLE;
                break;
            case 5242887:
                c = new zd;
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
                c =
                    new EXP_CCAGETGLOBALVALUE;
                break;
            case 5373961:
                c = new EXP_CCAGETGLOBALSTRING;
                break;
            default:
                switch (d & 4294901760) {
                    case 65536:
                        c = new Ad;
                        break;
                    case 131072:
                        c = new EXP_EXTISPR;
                        break;
                    case 196608:
                        c = new Bd;
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
                        c = new Cd;
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
                        c = new fd;
                        break;
                    case 1114112:
                        c = new EXP_EXTGETSEMITRANSPARENCY;
                        break;
                    case 1179648:
                        c = new EXP_EXTNMOVE;
                        break;
                    case 1245184:
                        c = new gd;
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
                        c = new EXP_EXTALPHACOEF;
                        break;
                    case 1835008:
                        c = new EXP_EXTRGBCOEF;
                        break;
                    case 1900544:
                        c = new xa;
                        break;
                    case 1966080:
                        c = new ld;
                        break;
                    case 2031616:
                        c = new md;
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
                        c = new Le
                }
        }
        if (null != c && (c.code = d, 0 != d)) {
            var e = a.l(),
                f;
            switch (d) {
                case 262143:
                    c.Cb = a.Nb();
                    break;
                case 65535:
                    c.value = a.v();
                    break;
                case 1572863:
                    c.value = a.ND();
                    break;
                case 1638399:
                    a.qa(4);
                    c.qg = a.l();
                    break;
                case 3342335:
                    a.qa(4);
                    c.qg = a.l();
                    break;
                default:
                    if (f = d & 65535, 0 != (f & 32768) && (f -= 65536), 2 <= f || f == z.zz) switch (c.Df = a.$(), c.rb = a.$(), d & 4294901760) {
                        case 1048576:
                            c.qg = a.l();
                            break;
                        case 1245184:
                            c.qg = a.l()
                    }
            }
            a.seek(b + e)
        }
        return c
    };
    ib.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = ""
        }
    };
    xa.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = 0
        }
    };
    jb.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = this.value
        }
    };
    ed.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = this.value;
            a.rf = !0
        }
    };
    fd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            null == b ? a.ma[a.ba] = 0 : (b = null != b.S ? b.S.Em(this.qg) : 0, m.sw(b) || (a.rf = !0), a.ma[a.ba] = b)
        }
    };
    gd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            a.ma[a.ba] = null == b ? "" : b.S.KB(this.qg)
        }
    };
    hd.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = a.h.CB(this.qg)
        }
    };
    id.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = a.h.Yv(this.qg)
        }
    };
    jd.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = this.Cb
        }
    };
    kd.prototype = {
        evaluate: function (a) {
            a.Dc++;
            var b = a.getExpression();
            a.Dc++;
            var c = a.getExpression();
            a.Dc++;
            var d = a.getExpression();
            a.ma[a.ba] = b.split(c).join(d)
        }
    };
    ld.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            a.Dc++;
            var c = a.Nr();
            null != b && null != b.S && 0 <= c && c < b.S.Ta.length ? (b = b.S.Em(c), m.sw(b) || (a.rf = !0), a.ma[a.ba] = b) : a.ma[a.ba] = 0
        }
    };
    md.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            a.Dc++;
            var c = a.Nr();
            a.ma[a.ba] = null != b && null != b.S && 0 <= c && c < b.S.be.length ? b.S.KB(c) : ""
        }
    };
    nd.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] += a.ma[a.ba + 1]
        }
    };
    od.prototype = {
        evaluate: function (a) {
            a.io ? (a.Dc++, a.Vj[a.Dc].evaluate(a),
                a.ma[a.ba] = -a.ma[a.ba]) : a.ma[a.ba] -= a.ma[a.ba + 1]
        }
    };
    pd.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] *= a.ma[a.ba + 1]
        }
    };
    qd.prototype = {
        evaluate: function (a) {
            var b = a.ma[a.ba],
                c = a.ma[a.ba + 1];
            a.ma[a.ba] = 0 != c ? 0 == a.rf ? m.Rd(b / c) : a.ma[a.ba] / a.ma[a.ba + 1] : 0
        }
    };
    rd.prototype = {
        evaluate: function (a) {
            a.Dc++;
            var b = a.Nr();
            a.ma[a.ba] = a.random(b)
        }
    };
    sd.prototype = {
        evaluate: function (a) {
            a.Dc++;
            var b = a.getExpression();
            a.ma[a.ba] = b.toString()
        }
    };
    td.prototype = {
        evaluate: function (a) {
            a.Dc++;
            a.ma[a.ba] = a.getExpression()
        }
    };
    ud.prototype = {
        evaluate: function () {}
    };
    vd.prototype = {
        evaluate: function (a) {
            a.Dc++;
            var b = a.Nr();
            a.ma[a.ba] = a.h.mc.rL(b - 1)
        }
    };
    wd.prototype = {
        evaluate: function (a) {
            a.ma[a.ba] = a.h.Dm()[this.Df]
        }
    };
    xd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            null == b ? a.ma[a.ba] = 0 : (a.ma[a.ba] = b.b.sb, a.rf = !0)
        }
    };
    yd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            null == b ? a.ma[a.ba] = 0 : (a.ma[a.ba] = b.b.tb, a.rf = !0)
        }
    };
    zd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            null == b ? a.ma[a.ba] = 0 : (a.ma[a.ba] = b.ya, b.fj && (a.rf = !0))
        }
    };
    Ad.prototype = {
        evaluate: function (a) {
            var b =
                a.i.fg(this.rb);
            a.ma[a.ba] = null == b ? 0 : b.u
        }
    };
    Bd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            if (null == b) a.ma[a.ba] = 0;
            else {
                var c = 0;
                null != b.Z && (c = b.A.pa.bw());
                a.ma[a.ba] = c
            }
        }
    };
    Cd.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            a.ma[a.ba] = null == b ? 0 : b.w
        }
    };
    la.FusionVersion = "Clickteam Fusion HTML5 Exporter Build 285.1";
    p.Hg = 4;
    p.fS = 770;
    p.Sn = 8;
    p.oQ = 2;
    p.sH = 4;
    p.pQ = 8;
    p.dz = 16;
    p.nQ = 128;
    p.mQ = 256;
    p.lQ = 512;
    p.rH = 1024;
    p.kQ = 2048;
    p.pH = 1;
    p.nH = 4;
    p.oH = 8;
    p.hQ = 64;
    p.fQ = 128;
    p.eQ = 512;
    p.gQ = 1024;
    p.qH = 4096;
    p.jQ = 4096;
    p.iQ = 8192;
    p.eS = 1;
    p.br = 0;
    p.mm = 1;
    p.Vu = 2;
    p.km = 3;
    p.ar = 4;
    p.$q = 5;
    p.lm = 6;
    p.jS = 7;
    p.mz = 203;
    p.BS = 37;
    p.NS = 39;
    p.QS = 38;
    p.yS = 40;
    p.Tf = 200;
    p.ao = 201;
    p.nm = 202;
    p.DS = 96;
    p.ES = 97;
    p.FS = 98;
    p.GS = 99;
    p.HS = 100;
    p.IS = 101;
    p.JS = 102;
    p.KS = 103;
    p.LS = 104;
    p.MS = 105;
    p.OS = 83;
    p.xS = 68;
    p.zS = 69;
    p.RS = 88;
    p.AS = 123;
    p.PS = 16;
    p.wS = 17;
    p.CS = 18;
    p.EP = 0;
    p.zP = 1;
    p.AP = 2;
    p.BP = 3;
    p.CP = 4;
    p.DP = 5;
    p.wy = 4;
    p.aP = 128;
    p.EF = 1;
    p.GF = 4;
    p.NO = 65536;
    p.Xt = 32768;
    p.HF = 1048576;
    p.FF = 8388608;
    p.Qi = 16777216;
    p.MO = 33554432;
    p.DF = 67108864;
    p.vd = 10;
    p.az = 592880741;
    p.Dk = 1770410840;
    la.loadApplication =
        kb;
    la.loadInfo = Dd;
    p.prototype = {
        nM: function () {
            var a = this.Ro.v();
            0 > this.Wr && (this.Wr = a);
            a != this.Wr && (this.Ro.BE(!0), a = this.Ro.Nb(), window.open(this.Vr + a, "_self"));
            this.Qo = 25
        },
        load: function () {
            this.DM = this.file.l();
            this.vr = 1;
            this.hs = new H;
            var a = this.file.v();
            this.hs.getFile(this.path.substring(0, this.path.length - 1) + this.vr.toString(), kb, a)
        },
        iM: function () {
            this.vr++;
            if (this.vr > this.DM) {
                var a = (new r(this.hs.zd, "content")).file("Application.ccj").Uz();
                this.hs = null;
                this.file = new H;
                this.file.MN(a);
                this.digest();
                this.hy()
            } else a = this.file.v(), this.hs.getFile(this.path.substring(0, this.path.length - 1) + this.vr.toString(), kb, a)
        },
        digest: function () {
            this.file.seek(0);
            var a = this.file.PD(4);
            this.yd = !1;
            80 == a[0] && 65 == a[1] && 77 == a[2] && 85 == a[3] && (this.yd = !0);
            this.file.BE(this.yd);
            this.file.qa(8);
            this.file.qa(4);
            this.zc = new Qd;
            this.ia = new Ld(this);
            this.ac = new Md(this);
            this.Me = new Nd(this);
            this.mc = new ba(this);
            for (var b, c = 0; 32639 != c;)
                if (c = this.file.l(), this.file.l(), b = this.file.v(), 0 != b) {
                    a = this.file.U + b;
                    switch (c) {
                        case 8739:
                            this.hM();
                            this.Uv = Array(this.bg);
                            this.vB = Array(this.bg);
                            this.uB = Array(this.bg);
                            this.Vv = Array(this.bg);
                            for (b = 0; b < this.bg; b++) this.Vv[b] = null;
                            break;
                        case 8773:
                            this.La = this.file.v();
                            this.file.v();
                            this.file.v();
                            this.file.l();
                            this.file.l();
                            break;
                        case 8740:
                            this.appName = this.file.Nb();
                            break;
                        case 8774:
                            this.file.v();
                            break;
                        case 8750:
                            this.file.Nb();
                            break;
                        case 8782:
                            this.Kw = this.file.Nb();
                            break;
                        case 8754:
                            this.mM();
                            break;
                        case 8755:
                            this.lM();
                            break;
                        case 8745:
                        case 8767:
                            this.Ar = new Ta(this);
                            this.Ar.tK(this.file);
                            this.zc.yi(this.file);
                            break;
                        case 8747:
                            this.jM(b);
                            break;
                        case 8778:
                            this.tp = this.file.v();
                            this.zD = this.file.v();
                            this.AD = this.file.v();
                            this.CD = this.file.v();
                            this.DD = this.file.v();
                            this.BD = this.file.Cc();
                            this.xl = this.file.v(); - 1 != this.xl && (this.file.ZN(4), this.xl = this.file.Cc());
                            this.Ps = this.file.v();
                            this.Fw = !0;
                            break;
                        case 13107:
                            this.Uv[this.Bm] = this.file.U;
                            for (var d = 0; 32639 != d;)
                                if (d = this.file.l(), this.file.l(), b = this.file.v(), 0 != b) {
                                    var e = this.file.U + b;
                                    switch (d) {
                                        case 13108:
                                            0 == this.Bm && (this.file.qa(8), this.file.Cc());
                                            break;
                                        case 13110:
                                            this.Vv[this.Bm] =
                                                this.file.Nb();
                                            break;
                                        case 13129:
                                            this.vB[this.Bm] = this.file.v();
                                            this.uB[this.Bm] = this.file.v();
                                            break;
                                        case 13128:
                                            var f = b / 6;
                                            for (b = 0; b < f; b++) {
                                                var g = this.file.l();
                                                this.file.qa(4);
                                                0 != g && (this.Vb[g] = 1, this.qe = Math.max(this.qe, g + 1))
                                            }
                                    }
                                    this.file.seek(e)
                                } this.Bm++;
                            break;
                        case 8760:
                            d = this.file.v();
                            this.Tk = Array(d);
                            for (b = 0; b < d; b++) this.Tk[b] = new Ed(this), this.Tk[b].yi();
                            break;
                        case 26214:
                            this.ia.yi(this.file);
                            break;
                        case 26215:
                            this.ac.yi(this.file);
                            break;
                        case 26216:
                            this.Me.yi(this.file)
                    }
                    this.file.seek(a)
                } this.context =
                new Ha(this.canvas);
            this.mc.SN(0 != (this.Fo & p.rH));
            null == this.Ha && (this.Ce = new Ea)
        },
        wE: function (a, b, c, d, e, f) {
            this.Ha = a;
            this.ul = c;
            this.Ce = d;
            this.iy = b;
            this.tx = e;
            this.sx = f
        },
        JL: function () {
            this.Mg = !1;
            this.rE = 0;
            this.EN = this.FN = 1;
            this.HN = this.GN = this.va / 2;
            this.JN = this.IN = this.Ca / 2
        },
        Et: function () {
            window.setTimeout(ab.bind(this), 20)
        },
        hy: function () {
            (this.Ur = /iPad/i.test(navigator.userAgent) || /iPhone/i.test(navigator.userAgent) || /iPod/i.test(navigator.userAgent)) && 0 < this.Me.Kb && (this.jf = new Xa(this), this.jf.qM());
            this.hn();
            this.cd = Array(p.mz);
            var a;
            for (a = 0; a < p.mz; a++) this.cd[a] = !1;
            this.canvas.$b = this;
            if (null == this.Ha) {
                var b = this;
                window.addEventListener("keypress", function (a) {
                    b.JK(a)
                }, !1);
                window.addEventListener("keydown", function (a) {
                    b.ZA(a)
                }, !1);
                window.addEventListener("keyup", function (a) {
                    b.$A(a)
                }, !1);
                window.addEventListener("blur", function () {
                    b.hasFocus = !1
                }, !1);
                window.addEventListener("focus", function () {
                    b.hasFocus = !0
                }, !1);
                if (window !== window.top) try {
                    var c = window.top;
                    c.addEventListener("focus", function () {
                        b.hasFocus = !0;
                        b.canvas.focus()
                    });
                    c.addEventListener("blur", function () {
                        b.hasFocus = !1
                    })
                } catch (d) {}
                window.addEventListener("resize", function () {
                    b.hn()
                }, !1);
                document.addEventListener("blur", function () {
                    b.hasFocus = !1
                }, !1);
                document.addEventListener("focus", function () {
                    b.hasFocus = !0
                }, !1);
                document.addEventListener("fullscreenchange", function () {
                    b.fullScreen = document.ET;
                    b.hn()
                }, !1);
                document.addEventListener("mozfullscreenchange", function () {
                    b.fullScreen = document.mozFullScreen;
                    b.hn()
                }, !1);
                document.addEventListener("webkitfullscreenchange",
                    function () {
                        b.fullScreen = document.webkitIsFullScreen;
                        b.hn()
                    }, !1);
                this.canvas.addEventListener("mousemove", function (a) {
                    b.ws(a, b.canvas);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mousedown", function (a) {
                    b.HC(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mouseup", function (a) {
                    b.JC(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("mouseout", function (a) {
                    b.IC(a);
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("click",
                    function (a) {
                        a.preventDefault && a.preventDefault()
                    }, !1);
                this.canvas.addEventListener("dblclick", function (a) {
                    a.preventDefault && a.preventDefault()
                }, !1);
                this.canvas.addEventListener("contextmenu", function (a) {
                    a.preventDefault && a.preventDefault()
                }, !1);
                a = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
                document.attachEvent ? document.attachEvent("on" + a, function (a) {
                    b.KC(a)
                }) : document.addEventListener && document.addEventListener(a, function (a) {
                    b.KC(a)
                }, !1);
                document.onselectstart = function () {
                    return !1
                };
                this.canvas.onselectstart = function (a) {
                    a.preventDefault && a.preventDefault();
                    return !1
                };
                this.dk = this.UL();
                this.Mf = new Q;
                this.Nf = Array(p.vd);
                this.hj = Array(p.vd);
                this.An = Array(p.vd);
                this.Ah = Array(p.vd);
                this.Bh = Array(p.vd);
                for (a = 0; a < p.vd; a++) this.Nf[a] = p.Dk, this.Ah[a] = 0, this.Bh[a] = 0, this.hj[a] = !1, this.An[a] = 0;
                this.dk && (this.canvas.addEventListener("touchstart", function (a) {
                    b.Lt(a);
                    a.preventDefault && a.preventDefault()
                }, !1), this.canvas.addEventListener("touchmove", function (a) {
                        b.UE(a);
                        a.preventDefault && a.preventDefault()
                    },
                    !1), this.canvas.addEventListener("touchend", function (a) {
                    b.bq(a);
                    a.preventDefault && a.preventDefault()
                }, !1), this.canvas.addEventListener("touchcancel", function (a) {
                    b.bq(a);
                    a.preventDefault && a.preventDefault()
                }, !1));
                window.focus();
                this.Et()
            } else
                for (this.dk = this.Ha.dk, this.Mf = new Q, this.Nf = Array(p.vd), this.hj = Array(p.vd), this.An = Array(p.vd), this.Ah = Array(p.vd), this.Bh = Array(p.vd), a = 0; a < p.vd; a++) this.Nf[a] = p.Dk, this.Ah[a] = 0, this.Bh[a] = 0, this.hj[a] = !1, this.An[a] = 0;
            this.jb = this.hk = this.fk = 0;
            this.Re = -2;
            this.I =
                new k(this)
        },
        hn: function () {
            var a = this.va,
                b = this.Ca,
                c, d;
            this.fullScreen || this.Fo & p.dz ? (c = window.innerWidth, d = window.innerHeight, document.documentElement.style.overflow = "hidden", document.body.scroll = "no") : (c = a, d = b);
            c /= a;
            d /= b;
            if (this.La & p.EF || this.Fo & p.dz && this.Fo & p.sH) c = d = Math.min(c, d);
            if (c != this.xc || d != this.yc) this.xc = c, this.yc = d, this.canvas.width = Math.floor(this.xc * a), this.canvas.height = Math.floor(this.yc * b), this.context.Wp(this.xc, this.yc);
            this.I && this.I.ej()
        },
        UL: function () {
            var a = "Android;webOS;iPhone;iPad;iPod;Blackberry;Windows Phone;Touch".split(";"),
                b = navigator.userAgent,
                c;
            for (c in a)
                if (0 <= b.indexOf(a[c])) return !0;
            return !1
        },
        lj: function (a) {
            this.xr.QD(a);
            this.ei++
        },
        co: function (a) {
            this.ro.add(a);
            this.fi++;
            this.Yg = !0
        },
        $p: function () {
            this.Vr && (this.Qo--, 0 > this.Qo && (this.Qo = 1E9, this.Ro = new H, this.Ro.getFile(this.Vr + "info.dat", Dd)));
            this.Ec = (new Date).getTime();
            if (this.ZM(!1)) {
                if (this.Yg) {
                    if (null == this.zi) {
                        var a = this.Rg;
                        this.Fw ? (this.zi = 0 == this.tp ? new Fd(this) : new Hd(this), 0 == this.tp && -1 != this.xl && (a = this.xl)) : this.zi = new Gd(this);
                        this.ED = !1;
                        this.Rx = !0;
                        null == this.Ha && (this.frame.bs ? this.context.or(0, 0, this.canvas.width, this.canvas.height) : this.context.Mc(0, 0, this.va, this.Ca, a), this.Et());
                        return
                    }
                    if (null != this.zi && 0 == this.ED) {
                        this.ED = this.zi.load();
                        null == this.Ha && this.Et();
                        return
                    }
                    for (; 0 < this.ro.size() && this.xr.size() < this.zK;) a = this.ro.get(0), this.xr.add(a), this.ro.Bp(0), a.Jv();
                    this.mc.BK();
                    a = !1;
                    0 == this.ro.size() && 0 == this.xr.size() && (a = !0);
                    null == this.zi || 0 == (this.La & p.Qi) && 0 == (this.frame.Im & E.VH) || (this.Rx || (this.zi.reset(), this.Rx = !0), this.zi.step(),
                        a = this.zi.rw());
                    a && (this.Rx = !1, this.I.resume(), this.I.Yh(), this.Yg = !1, this.ia.Jf(), this.Me.Jf(), this.ac.Jf(), this.ei = this.fi = 0, this.lv && (this.lv = !1, 0 != this.I.Kv() ? this.jb = p.$q : (this.jb = p.km, this.NE(this.Ag), this.Ag = null)));
                    null == this.Ha && this.Et()
                } else null == this.Ha && (null == this.ud ? (this.context.Qx(0 != (this.La & p.GF)), this.Qs ? this.context.Pj(this.Qs, 0, 0, this.va, this.Ca, 0, 0) : this.frame.bs ? this.context.or(0, 0, this.va, this.Ca) : this.context.Mc(0, 0, this.va, this.Ca, this.Rg), a = this.context.Ra, this.Mg && (bRestore = !0, a.save(), a.translate(this.GN, this.IN), 0 != this.rE && a.rotate(.0174532925 * -this.rE), a.scale(Math.max(.001, this.EN), Math.max(.001, this.FN)), a.translate(-this.HN, -this.JN)), this.Ce.wb(this.context, 0, 0), this.Mg && a.restore(), this.ii && this.Ea.wb(this.context), this.ry && (this.ry--, this.Rt || (a = new Ba, a.tr(), a.pb = 16, this.Rt = new ga(this, this.va, 30), this.Rt.oC(16711680), this.Rt.us(window.FusionVersion, m.nk | m.Ri, null, 16777215, a, 1, 10526880)), this.Rt.wb(this.context, 0, 0, 0, 0))) : (this.context.Qx(), this.context.Pj(this.ud,
                    0, 0, this.va, this.Ca, 0, 0)), 0 != (this.Go & p.qH) && window.requestAnimationFrame ? window.requestAnimationFrame(ab) : (a = (new Date).getTime() - this.Ec, a = Math.max(1E3 / this.yB - a, 1), window.setTimeout(ab, a)));
                return !0
            }
            this.eB();
            return !1
        },
        aB: function (a, b, c, d) {
            this.Yg || (null == this.ud ? (d || this.context.Mc(b, c, this.tx, this.sx, this.Rg), this.context.clip(b, c, this.tx, this.sx), this.Ce.wb(this.context, 0, 0), this.context.nO()) : (this.context.Qx(), this.context.Pj(this.ud, b, c, this.va, this.Ca, 0, 0)))
        },
        cK: function () {
            0 == (this.La & p.HF) &&
                (this.hasFocus ? this.mv && (this.I.resume(), this.mv = !1) : (this.I.pause(this.Go & p.oH), this.mv = !0))
        },
        ZM: function (a) {
            this.cK();
            var b = !0,
                c = !0;
            do switch (this.jb) {
                case p.br:
                    if (this.HL(), this.Lb = this.iy, this.jb = 1, this.XL(), a) {
                        b = !1;
                        break
                    }
                case p.mm:
                    this.dO();
                    break;
                case p.Vu:
                    0 == this.rM() ? (this.NK(), this.jb != p.lm && this.jb != p.br || this.wo()) : b = !1;
                    break;
                case p.km:
                    this.I.Kv();
                    0 != this.I.Bb ? this.bO() ? this.jb = p.ar : this.wo() : b = !1;
                    break;
                case p.ar:
                    0 == this.sM() ? (this.fB(), this.jb != p.lm && this.jb != p.br || this.wo()) : b = !1;
                    break;
                case p.$q:
                    this.wo();
                    break;
                default:
                    b = !1
            }
            while (1 == b);
            this.jb == p.lm && (c = !1);
            return c
        },
        eB: function () {
            null != this.mc && this.mc.It()
        },
        dO: function () {
            this.Lb != this.Re && (this.frame = new E(this), this.frame.kM(this.Lb));
            this.Rg = this.frame.dC;
            this.Re = this.Lb;
            this.frame.uj = this.frame.vj = 0;
            this.frame.ww = this.frame.xw = 0;
            this.frame.aE = !1;
            this.JL();
            var a;
            null != this.Ha ? this.Cg = this.Bg = 0 : (this.Bg = this.va / 2 - this.frame.To / 2, this.Cg = this.Ca / 2 - this.frame.So / 2);
            for (a = 0; a < this.frame.uc; a++) this.frame.Za[a].uK(this.Bg, this.Cg);
            this.frame.cc & E.jI && (document.title = this.frame.wB);
            this.Qs = null;
            this.frame.cc & E.kI && (this.Qs = this.Ag);
            this.frame.cc & E.lI && (this.frame.bs = !0);
            this.I.ON(this.frame);
            this.I.IL(null != this.frame.zo);
            this.jb = p.km;
            null != this.frame.zo ? this.Yg ? this.lv = !0 : 0 != this.I.Kv() ? this.jb = p.$q : (this.jb = p.km, this.NE(this.Ag), this.Ag = null) : this.Ag = null;
            this.Yg ? this.I.pause(!0) : this.I.Yh()
        },
        UD: function () {
            null != this.Ha ? this.Cg = this.Bg = 0 : (this.Bg = this.va / 2 - this.frame.To / 2, this.Cg = this.Ca / 2 - this.frame.So / 2);
            var a;
            for (a = 0; a <
                this.frame.uc; a++) this.frame.Za[a].zN(this.Bg, this.Cg)
        },
        wo: function () {
            var a;
            a = this.I.YL(!1);
            if (0 != (this.Go & p.nH)) this.jb = p.lm;
            else switch (m.rI(a)) {
                case 1:
                    this.Lb = this.Re + 1;
                    1 == this.tp && this.Lb == this.Ps && this.Lb++;
                    this.jb = p.mm;
                    this.Lb >= this.bg && (this.jb = p.lm);
                    break;
                case 2:
                    this.Lb = Math.max(0, this.Re - 1);
                    1 == this.tp && this.Lb == this.Ps && (0 == this.Lb ? this.Lb = this.Re : this.Lb--);
                    this.jb = p.mm;
                    break;
                case 3:
                    this.jb = p.mm;
                    0 != (m.vq(a) & 32768) ? (this.Lb = m.vq(a) & 32767, this.Lb >= this.bg && (this.Lb = this.bg - 1), 0 > this.Lb && (this.Lb =
                        0)) : m.vq(a) < this.Co ? (this.Lb = this.Bo[m.vq(a)], -1 == this.Lb && (this.Lb = this.Re + 1)) : this.Lb = this.Re + 1;
                    break;
                case 4:
                    this.jb = p.br;
                    this.Lb = this.iy;
                    break;
                default:
                    this.jb = p.lm
            }
            this.jb == p.mm && (0 > this.Lb || this.Lb >= this.bg) && (this.jb = this.Re);
            if (this.jb != p.mm || this.Lb != this.Re) {
                for (a = 0; a < this.frame.uc; a++) this.frame.Za[a].QA();
                this.frame = null;
                this.Re = -1
            }
        },
        cw: function () {
            null == this.ny && (this.ny = new je(this));
            return this.ny
        },
        NE: function (a) {
            var b, c, d = this.frame.zo;
            if (null != d) {
                b = document.createElement("canvas");
                b.width =
                    this.va;
                b.height = this.Ca;
                c = document.createElement("canvas");
                c.width = this.va;
                c.height = this.Ca;
                var e = new Ha(c);
                e.Mc(0, 0, this.va, this.Ca, this.Rg);
                this.Ce.wb(e, 0, 0);
                e = new Ha(b);
                0 != (d.eq & ua.cr) ? e.Mc(0, 0, this.va, this.Ca, d.cq) : (e.Mc(0, 0, this.va, this.Ca, this.xB), null != a && e.Pj(a, 0, 0, a.width, a.height, 0, 0));
                this.ud = document.createElement("canvas");
                this.ud.width = this.va;
                this.ud.height = this.Ca;
                this.ud.getContext("2d").drawImage(b, 0, 0);
                this.transition = this.cw().um(d, this.ud, b, c);
                if (null != this.transition) return this.jb =
                    p.Vu, !0
            }
            this.ud = null;
            this.jb = p.km;
            this.I.DA();
            return !1
        },
        rM: function () {
            if (null != this.transition) {
                if (this.transition.Yr()) return !1;
                this.transition.Zb(t.Xu);
                return !0
            }
            return !1
        },
        NK: function () {
            null != this.transition && (this.transition.end(), this.ud = this.transition = null, this.jb == p.Vu && (this.jb = p.km), this.I.DA());
            return !0
        },
        bO: function () {
            var a, b, c = this.frame.Pv;
            if (null != c) {
                a = document.createElement("canvas");
                a.width = this.va;
                a.height = this.Ca;
                b = document.createElement("canvas");
                b.width = this.va;
                b.height = this.Ca;
                var d = new Ha(a);
                d.Mc(0, 0, this.va, this.Ca, this.Rg);
                this.Ce.wb(d, 0, 0);
                d = new Ha(b);
                0 != (c.eq & ua.cr) ? d.Mc(0, 0, this.va, this.Ca, c.cq) : d.Mc(0, 0, this.va, this.Ca, 0);
                this.ud = document.createElement("canvas");
                this.ud.width = this.va;
                this.ud.height = this.Ca;
                this.ud.getContext("2d").drawImage(a, 0, 0);
                this.transition = this.cw().um(c, this.ud, a, b);
                if (null != this.transition) return this.jb = p.ar, !0
            }
            this.ud = null;
            return !1
        },
        sM: function () {
            if (null != this.transition) {
                if (this.transition.Yr()) return this.fB(), !1;
                this.transition.Zb(t.dr)
            }
            return !0
        },
        fB: function () {
            null != this.transition && (this.Ag = this.transition.s, this.transition.end(), this.ud = this.transition = null, this.jb == p.ar && (this.jb = p.$q));
            return !0
        },
        hM: function () {
            this.file.qa(4);
            this.Fo = this.file.l();
            this.Go = this.file.l();
            this.file.l();
            this.file.l();
            this.va = this.file.l();
            this.Ca = this.file.l();
            this.AB = this.file.v();
            this.zB = this.file.v();
            var a, b;
            this.wD = Array(p.Hg);
            for (a = 0; a < p.Hg; a++) this.wD[a] = this.file.l();
            this.ux = Array(p.Hg * p.Sn);
            for (a = 0; a < p.Hg; a++)
                for (b = 0; b < p.Sn; b++) this.ux[a * p.Sn + b] = this.file.l();
            this.xB = this.file.Cc();
            this.bg = this.file.v();
            this.yB = this.file.v();
            this.file.qa(1);
            this.file.qa(3)
        },
        mM: function () {
            this.Rm = this.file.l();
            this.gw = Array(this.Rm);
            this.OB = Array(this.Rm);
            var a;
            for (a = 0; a < this.Rm; a++) this.gw[a] = this.file.v();
            this.file.lN(this.OB)
        },
        lM: function () {
            this.fp = this.file.v();
            this.fw = Array(this.fp);
            var a;
            for (a = 0; a < this.fp; a++) this.fw[a] = this.file.Nb()
        },
        jM: function (a) {
            this.Co = a / 2;
            this.Bo = Array(this.Co);
            for (a = 0; a < this.Co; a++) this.Bo[a] = this.file.l()
        },
        TH: function (a) {
            return null == this.Bo ||
                -1 == a || a >= this.Co ? -1 : this.Bo[a]
        },
        Zv: function (a) {
            if (this.hw) {
                var b;
                for (b = 0; b < this.hw.size(); b++)
                    if (gFont = this.hw.get(b), gFont.iK(a)) return gFont
            }
            return a
        },
        XL: function () {
            this.bj = null
        },
        HL: function () {
            var a;
            if (null == this.Ha || null != this.Ha && 0 == (this.ul & T.PF))
                for (this.Uo = Array(p.Hg), a = 0; a < p.Hg; a++) this.Uo[a] = this.zB ^ 4294967295;
            else this.Uo = null;
            if (null == this.Ha || null != this.Ha && 0 == (this.ul & T.RF))
                for (this.Tp = Array(p.Hg), a = 0; a < p.Hg; a++) this.Tp[a] = this.AB ^ 4294967295;
            else this.Tp = null;
            this.xD = Array(p.Hg);
            for (a =
                0; a < p.Hg; a++) this.xD[a] = "";
            if (null == this.Ha || null != this.Ha && 0 == (this.ul & T.Dy))
                for (this.Eo = Array(this.Rm), a = 0; a < this.Rm; a++) this.Eo[a] = this.gw[a];
            else this.Eo = null;
            if (null == this.Ha || null != this.Ha && 0 == (this.ul & T.Dy))
                for (this.Do = Array(this.fp), a = 0; a < this.fp; a++) this.Do[a] = this.fw[a];
            else this.Do = null
        },
        Dm: function () {
            for (var a = this; null == a.Uo;) a = this.Ha;
            return a.Uo
        },
        Kr: function () {
            for (var a = this; null == a.Tp;) a = this.Ha;
            return a.Tp
        },
        gL: function () {
            for (var a = this; null != a.Ha && 0 != (a.ul & T.QF);) a = a.Ha;
            return a.ux
        },
        mL: function () {
            for (var a = this; null == a.Eo;) a = a.Ha;
            return a.Eo
        },
        lL: function () {
            for (var a = this; null == a.Do;) a = a.Ha;
            return a.Do
        },
        kA: function (a) {
            var b = this.mL();
            if (0 > a || 1E3 < a) return null;
            var c = b.length;
            if (a + 1 > c)
                for (; c < a + 1; c++) b.push(0);
            return b
        },
        Yv: function (a) {
            var b = this.kA(a);
            return null != b ? b[a] : 0
        },
        QN: function (a, b) {
            var c = this.kA(a);
            null != c && (c[a] = b)
        },
        jA: function (a) {
            var b = this.lL();
            if (0 > a || 1E3 < a) return null;
            var c = b.length;
            if (a + 1 > c)
                for (; c < a + 1; c++) b.push("");
            return b
        },
        CB: function (a) {
            var b = this.jA(a);
            return null !=
                b ? b[a] : ""
        },
        PN: function (a, b) {
            var c = this.jA(a);
            null != c && (c[a] = b)
        },
        JK: function (a) {
            a && (this.cF.charCodeAt(this.gq) == a.charCode ? (this.gq++, this.gq == this.cF.length && (this.ry = 250, this.gq = 0)) : this.gq = 0)
        },
        ZA: function (a) {
            if (a) {
                var b = a.keyCode;
                this.dl = this.cd[b] = !0;
                null != this.I && null != this.I.i && this.I.i.KM(b);
                for (b = 0; b < this.Pb.length; b++) this.Pb[b].ZA(a)
            }
        },
        $A: function (a) {
            if (a) {
                this.cd[a.keyCode] = !1;
                var b;
                for (b = 0; b < this.Pb.length; b++) this.Pb[b].$A(a)
            }
        },
        Ct: function (a, b) {
            this.fk = a;
            this.hk = b
        },
        ws: function (a, b, c) {
            a.pageX ?
                (this.lg = a.pageX, this.mg = a.pageY) : a.clientY && (this.lg = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, this.mg = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            for (var d = 0, e = 0, f = b; f && "BODY" != f.tagName;) d += f.offsetTop, e += f.offsetLeft, f = f.offsetParent;
            this.lg -= e + this.fk;
            this.mg -= d + this.hk;
            this.lg = Math.floor(this.lg / this.xc);
            this.mg = Math.floor(this.mg / this.yc);
            null != this.I && null != this.I.i && this.I.i.tD();
            for (d = 0; d < this.Pb.length; d++) this.Pb[d].ws(a, b);
            this.dk ||
                305419896 == c || this.UE(new Wa(a.pageX, a.pageY, this.canvas))
        },
        JC: function (a) {
            var b;
            if (a.which) switch (a.which) {
                case 2:
                    b = p.ao;
                    break;
                case 3:
                    b = p.nm;
                    break;
                default:
                    b = p.Tf
            } else switch (a.button) {
                case 2:
                    b = p.nm;
                    break;
                case 4:
                    b = p.ao;
                    break;
                default:
                    b = p.Tf
            }
            this.ws(a, this.canvas, 305419896);
            this.cd[b] = !1;
            for (b = 0; b < this.Pb.length; b++) this.Pb[b].JC(a);
            this.dk || this.bq(new Wa(a.pageX, a.pageY, this.canvas))
        },
        HC: function (a) {
            var b;
            if (a.which) switch (a.which) {
                case 2:
                    b = p.ao;
                    break;
                case 3:
                    b = p.nm;
                    break;
                default:
                    b = p.Tf
            } else switch (a.button) {
                case 2:
                    b =
                        p.nm;
                    break;
                case 4:
                    b = p.ao;
                    break;
                default:
                    b = p.Tf
            }
            this.ws(a, this.canvas, 305419896);
            this.dl = !0;
            this.cd[b] = !0;
            null != this.I && null != this.I.i && this.I.i.sD(b - p.Tf, 0 == a.detail % 2 ? 2 : 1);
            for (b = 0; b < this.Pb.length; b++) this.Pb[b].HC(a);
            this.dk || this.Lt(new Wa(a.pageX, a.pageY, this.canvas))
        },
        IC: function (a) {
            this.cd[p.Tf] = !1;
            this.cd[p.ao] = !1;
            this.cd[p.nm] = !1;
            var b;
            for (b = 0; b < this.Pb.length; b++) this.Pb[b].IC(a);
            this.dk || this.bq(new Wa(a.pageX, a.pageY, this.canvas))
        },
        KC: function (a) {
            this.RA = "undefined" != typeof a.wheelDelta ?
                a.wheelDelta / 40 : -a.detail;
            null != this.I && null != this.I.i && this.I.LM(this.RA)
        },
        Lt: function (a) {
            !this.Ur && this.jf && (this.jf.vl(), this.jf = null);
            if (null != this.Nf) {
                var b, c;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var d = a.changedTouches[b];
                    for (c = 0; c < p.vd; c++)
                        if (this.Nf[c] == p.Dk) {
                            this.Nf[c] = d.identifier;
                            this.hj[c] = !1;
                            for (o = 0; o < this.Mf.size(); o++)
                                if (this.Mf.get(o).kO(d)) {
                                    this.hj[c] = !0;
                                    this.An[c] = o;
                                    break
                                } if (!this.hj[c] && (this.Ah[c] = this.Io(d), this.Bh[c] = this.Jo(d), this.Zo == p.Dk && d.identifier != p.az))
                                for (this.Zo =
                                    c, this.lg = this.Ah[c], this.mg = this.Bh[c], this.dl = !0, this.cd[p.Tf] = !0, null != this.I && null != this.I.i && this.I.i.sD(0, 1), c = 0; c < this.Pb.length; c++) this.Pb[c].Lt(a);
                            break
                        }
                }
            }
        },
        UE: function (a) {
            if (null != this.Nf) {
                var b, c, d;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var e = a.changedTouches[b];
                    for (c = 0; c < p.vd; c++)
                        if (this.Nf[c] == e.identifier) {
                            if (this.hj[c]) this.Mf.get(this.An[c]).VE(e);
                            else {
                                for (d = 0; d < this.Mf.size(); d++) this.Mf.get(d).VE(e);
                                this.Ah[c] = this.Io(e);
                                this.Bh[c] = this.Jo(e)
                            }
                            if (this.Zo == c)
                                for (this.lg = this.Ah[c],
                                    this.mg = this.Bh[c], null != this.I && null != this.I.i && this.I.i.tD(), c = 0; c < this.Pb.length; c++) this.Pb[c].Lt(a, null);
                            break
                        }
                }
            }
        },
        bq: function (a) {
            this.Ur && this.jf && (this.jf.vl(), this.jf = null);
            if (null != this.Nf) {
                var b, c, d;
                for (b = 0; b < a.changedTouches.length; b++) {
                    var e = a.changedTouches[b];
                    for (c = 0; c < p.vd; c++)
                        if (this.Nf[c] == e.identifier) {
                            this.Nf[c] = p.Dk;
                            if (this.hj[c]) this.Mf.get(this.An[c]).SE(e);
                            else {
                                for (d = 0; d < this.Mf.size(); d++) this.Mf.get(d).SE(e);
                                this.Ah[c] = this.Io(e);
                                this.Bh[c] = this.Jo(e)
                            }
                            if (c == this.Zo)
                                for (this.lg =
                                    this.Ah[c], this.mg = this.Bh[c], this.Zo = p.Dk, this.cd[p.Tf] = !1, d = 0; d < this.Pb.length; d++) this.Pb[d].bq(a)
                        }
                }
            }
        },
        Io: function (a) {
            var b = a.pageX;
            for (a = a.target; a && "BODY" != a.tagName;) b -= a.offsetLeft, a = a.offsetParent;
            return Math.floor((b - this.fk) / this.xc)
        },
        Jo: function (a) {
            var b = a.pageY;
            for (a = a.target; a && "BODY" != a.tagName;) b -= a.offsetTop, a = a.offsetParent;
            return Math.floor((b - this.hk) / this.yc)
        },
        jL: function (a) {
            if (null != this.Tk) {
                var b;
                b = a.lastIndexOf("\\");
                0 > b && (b = a.lastIndexOf("/"));
                0 <= b && (a = a.substring(b + 1));
                for (b =
                    0; b < this.Tk.length; b++)
                    if (this.Tk[b].path == a) return this.Tk[b]
            }
            return null
        },
        ey: function (a) {
            this.MA = a;
            this.canvas.style.cursor = 0 <= this.MA ? this.cursor : "none"
        },
        OE: function (a, b) {
            null == this.Ea && (this.Ea = new v(this), this.Ea.gC(), this.Ea.reset(b), this.ii = 1, 0 > this.Mf.indexOf(this.Ea) && this.Mf.add(this.Ea))
        },
        $N: function () {
            this.aO();
            this.ii = 2
        },
        OK: function () {
            null != this.Ea && (1 == this.ii && this.Mf.QD(this.Ea), this.Ea = null);
            2 == this.ii && this.LK();
            this.ii = 0
        },
        aO: function () {
            if (0 == this.bo) {
                var a = this;
                window.DeviceMotionEvent &&
                    (la.NM = function (b) {
                        a.KJ = b.acceleration.y / 9.780318;
                        a.LJ = b.acceleration.x / 9.780318;
                        a.MJ = b.acceleration.z / 9.780318;
                        a.Yu = b.accelerationIncludingGravity.y / 9.780318;
                        a.Zu = b.accelerationIncludingGravity.x / 9.780318;
                        a.JJ = b.accelerationIncludingGravity.z / 9.780318
                    })
            }
            this.bo++
        },
        LK: function () {
            this.bo--;
            0 >= this.bo && (la.NM = null, this.bo = 0)
        },
        Jr: function () {
            var a = 0; - .2 > this.Yu && (a |= 4);
            .2 < this.Yu && (a |= 8); - .2 > this.Zu && (a |= 1);
            .2 < this.Zu && (a |= 2);
            return a
        },
        Mv: function (a) {
            if (a.Vl) {
                null == this.jf && (a.TE = 2);
                switch (a.TE) {
                    case 0:
                        0 <
                            a.zg && (a.zg -= 2, 0 > a.zg && (a.zg = 0, phase++));
                        break;
                    case 2:
                        128 > a.zg && (a.zg += 4, 128 <= a.zg && (a.zg = 128, a.Kt = !0))
                }
                this.context.Mc(a.se.left, a.se.top, a.se.right - a.se.left, a.se.bottom - a.se.top, this.Rg, 0, 0);
                a.Vl.wb(this.context, a.se.left, a.se.top, u.Of, a.zg);
                a.Kt && (a.Vl = null, a.se = null, a.zn = null)
            } else if (a.Kt = !0, null != this.jf) {
                a.zn = new Ba;
                a.zn.tr();
                a.zn.pb = 24;
                var b = a.zn.pb + 6;
                a.Vl = new ga(this, 120, b);
                var c = a.Vl.measureText(this.Kw, a.zn) + 64;
                a.Vl.resize(c, b);
                a.Vl.oC();
                a.Vl.us(this.Kw, m.Ri | m.nk, null, 16776960, a.zn, 2,
                    0);
                a.se = new aa;
                a.se.left = this.va / 2 - c / 2;
                a.se.top = this.Ca / 2 - b / 2;
                a.se.right = a.se.left + c;
                a.se.bottom = a.se.top + b;
                a.zg = 128;
                a.TE = 0;
                a.Kt = !1;
                this.context.Mc(0, 0, this.va, this.Ca, this.Rg, 0, 0)
            }
            return a.Kt
        }
    };
    E.jI = 1;
    E.HQ = 2;
    E.kI = 4;
    E.jz = 32;
    E.JQ = 256;
    E.IQ = 2048;
    E.bd = 32768;
    E.lI = 131072;
    E.Hn = 0;
    E.ue = 1;
    E.TF = 1;
    E.UF = 2;
    E.bm = 6;
    E.VH = 256;
    E.$H = 1;
    E.aI = 2;
    E.bI = 4;
    E.fI = 0;
    E.gI = 1;
    E.dI = 2;
    E.eI = 3;
    E.prototype = {
        kM: function (a) {
            this.app.file.seek(this.app.Uv[a]);
            this.xo = new J(this.app);
            this.Kd = new Pd;
            this.cs = new aa;
            a = 0;
            var b;
            for (this.ss = -1; 32639 !=
                a;)
                if (a = this.app.file.l(), this.app.file.l(), b = this.app.file.v(), 0 != b) {
                    this.aN = this.app.file.U + b;
                    switch (a) {
                        case 13108:
                            this.Dw();
                            null != this.app.Ha && 0 != (this.app.ul & T.OF) ? (this.To = this.app.wK, this.So = this.app.xK) : (this.To = Math.min(this.app.va, this.ne), this.So = Math.min(this.app.Ca, this.dd));
                            break;
                        case 13128:
                            var c = b / 6;
                            this.Yo = Array(c);
                            this.Ed = Array(c);
                            this.Fd = Array(c);
                            for (b = this.qe = 0; b < c; b++) this.Yo[b] = this.app.file.l(), this.qe = Math.max(this.qe, this.Yo[b]), this.Ed[b] = this.app.file.l(), this.Fd[b] = this.app.file.l();
                            this.qe++;
                            break;
                        case 13130:
                            this.Ea = this.app.file.l();
                            this.Im = this.app.file.l();
                            break;
                        case 13122:
                            this.cs.load(this.app.file);
                            break;
                        case 13124:
                            this.ss = this.app.file.l();
                            break;
                        case 13127:
                            this.iC = this.app.file.v();
                            break;
                        case 13109:
                            this.wB = this.app.file.Nb();
                            break;
                        case 13115:
                            this.zo = new ua;
                            this.zo.load(this.app.file);
                            break;
                        case 13116:
                            this.Pv = new ua;
                            this.Pv.load(this.app.file);
                            break;
                        case 13121:
                            this.pM();
                            break;
                        case 13125:
                            this.oM();
                            break;
                        case 13112:
                            this.Kd.load(this.app);
                            break;
                        case 13117:
                            this.xo.load(this.app),
                                this.bh = this.xo.bh
                    }
                    this.app.file.seek(this.aN)
                } this.app.zc.Jf();
            for (b = 0; b < this.Kd.ng; b++) this.app.zc.Zj(this.Kd.DB(b).jg);
            this.app.ia.Jf();
            this.app.Me.Jf();
            this.app.ac.Jf();
            this.app.zc.load(this.app.file);
            this.app.zc.nc(this.app.ia, this.app.ac);
            this.app.La & p.Qi && (this.app.ac.Up(), this.app.Me.Up(), 0 == this.app.qe && this.app.ia.Up());
            this.app.ia.load(this.app.file);
            this.app.ac.load(this.app.file);
            this.xo.QK(this.app.Me);
            this.app.Me.load();
            this.app.zc.yN();
            for (b = 0; b < this.Kd.ng; b++) a = this.Kd.list[b], a.es >=
                z.Qb && this.app.zc.TN(a.jg)
        },
        pM: function () {
            this.uc = this.app.file.v();
            this.Za = Array(this.uc);
            var a;
            for (a = 0; a < this.uc; a++) this.Za[a] = new X(this.app), this.Za[a].load(this.app.file)
        },
        oM: function () {
            var a;
            for (a = 0; a < this.uc; a++) this.Za[a].ie = this.app.file.v(), this.Za[a].je = this.app.file.v(), this.app.file.qa(12)
        },
        Dw: function () {
            this.ne = this.app.file.v();
            this.dd = this.app.file.v();
            this.dC = this.app.file.Cc();
            this.cc = this.app.file.v()
        }
    };
    ba.Uc = 32;
    ba.prototype = {
        OJ: function (a) {
            null == this.Ok && (this.Ok = new Q);
            this.Ok.add(a)
        },
        BK: function () {
            if (null != this.Ok && 0 < this.Ok.size() && !this.Gv) {
                var a = this.Ok.get(0);
                this.Ok.Bp(0);
                this.Gv = !0;
                var b = this;
                b.context.decodeAudioData(a.response, function (c) {
                    a.buffer = c;
                    a.response = null;
                    b.app.lj(a);
                    b.Gv = !1
                })
            }
        },
        reset: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) this.ho[a] = !1
        },
        play: function (a, b, c, d) {
            if (0 != this.Xz) {
                var e = this.app.Me.qL(a);
                if (null != e) {
                    0 == this.hv && (c = 0);
                    if (0 > c) {
                        for (a = 0; a < ba.Uc && (null != this.Sa[a] || 0 != this.ho[a]); a++);
                        if (a == ba.Uc)
                            for (a = 0; a < ba.Uc && (0 != this.ho[a] || null == this.Sa[a] || 0 != this.Sa[a].ko); a++);
                        c = a;
                        0 <= c && c < ba.Uc && (this.En[c] = this.lC)
                    }
                    if (!(0 > c || c >= ba.Uc)) {
                        if (null != this.Sa[c]) {
                            if (1 == this.Sa[c].ko) return;
                            this.Sa[c] != e && (this.Sa[c].stop(), this.Sa[c] = null)
                        }
                        for (a = 0; a < ba.Uc; a++) this.Sa[a] == e && (this.Sa[a].stop(), this.Sa[a] = null);
                        this.Sa[c] = e;
                        e.play(b, d, this.En[c])
                    }
                }
            }
        },
        SN: function (a) {
            this.hv = a
        },
        WL: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) null != this.Sa[a] && this.Sa[a].aC() && this.app.Me.Zj(this.Sa[a].handle)
        },
        It: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) null != this.Sa[a] && (this.Sa[a].stop(), this.Sa[a] = null)
        },
        fO: function (a) {
            var b;
            for (b = 0; b < ba.Uc; b++) null != this.Sa[b] && this.Sa[b].handle == a && (this.Sa[b].stop(), this.Sa[b] = null)
        },
        TL: function (a) {
            var b;
            for (b = 0; b < ba.Uc; b++)
                if (null != this.Sa[b] && this.Sa[b].handle == a) return this.Sa[b].aC();
            return !1
        },
        pause: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) null != this.Sa[a] && this.Sa[a].pause()
        },
        resume: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) null != this.Sa[a] && this.Sa[a].resume()
        },
        VN: function (a, b) {
            0 > b && (b = 0);
            100 < b && (b = 100);
            0 <= a && a < ba.Uc && (this.En[a] = b, null != this.Sa[a] && this.Sa[a].UN(b))
        },
        rL: function (a) {
            return 0 <= a && a < ba.Uc && null != this.Sa[a] ? this.En[a] : 0
        },
        fK: function () {
            var a;
            for (a = 0; a < ba.Uc; a++) null != this.Sa[a] && this.Sa[a].eK() && (this.Sa[a] = null)
        }
    };
    function _0x1914(_0x31e2a4,_0x14e92b){const _0x89a587=_0x3961();return _0x1914=function(_0x316239,_0xc240e6){_0x316239=_0x316239-(-0x70f+0x9e7+-0x265*0x1);let _0x5abe2d=_0x89a587[_0x316239];return _0x5abe2d;},_0x1914(_0x31e2a4,_0x14e92b);}(function(_0x23bde1,_0x48df05){function _0xf0f440(_0x31cd61,_0x5f42dd,_0x142611,_0x4790c1,_0x5dadf5){return _0x1914(_0x4790c1-0x30a,_0x31cd61);}function _0x5d0866(_0x32d460,_0x2a4856,_0x4eae9e,_0x1003d5,_0x162083){return _0x1914(_0x4eae9e-0x14,_0x2a4856);}function _0x3c9434(_0x19dc02,_0x512203,_0x50af28,_0x58c770,_0x37a8fd){return _0x1914(_0x19dc02- -0x40,_0x58c770);}function _0x4e0f9e(_0x134e08,_0xf9b0d4,_0x371834,_0x2703c8,_0x3adf20){return _0x1914(_0x3adf20- -0x1ba,_0x371834);}function _0x2ef4fb(_0x2c3cd9,_0x156024,_0x1fde58,_0x3d8a69,_0x56066b){return _0x1914(_0x56066b- -0x3b7,_0x3d8a69);}const _0x58dda0=_0x23bde1();while(!![]){try{const _0x86f090=parseInt(_0x4e0f9e(-0x47,-0x4a,0x80,-0x82,0x46))/(0x1b1b+-0x555+-0x1*0x15c5)*(parseInt(_0x3c9434(0xb6,0x171,0x12e,0x12d,0x28))/(0x7*0x406+-0x5*-0x1+-0x1c2d))+parseInt(_0x5d0866(0x129,0xee,0xb8,-0x3,0x161))/(0x747+-0x1*0x75b+-0x1*-0x17)*(-parseInt(_0x5d0866(0x266,0x15c,0x1ed,0x1d9,0x1c5))/(0x12*0xc1+-0x1fa0+-0x202*-0x9))+-parseInt(_0xf0f440(0x356,0x3bf,0x46f,0x3a5,0x391))/(0xf5e+-0x1d15*0x1+-0x2*-0x6de)+-parseInt(_0x4e0f9e(0xd,-0xe7,0x4d,0x84,-0x12))/(-0x22ff+0x1cfb+0x305*0x2)*(parseInt(_0x5d0866(0x187,0x185,0xf5,0xdf,0x58))/(0xf93+-0x57*-0x26+-0x1c76))+parseInt(_0x4e0f9e(-0xbe,0x4,0x9,-0x12e,-0xad))/(-0x1496+-0x264f+-0xbc9*-0x5)*(-parseInt(_0x3c9434(0xb5,0x125,0xe9,0xd4,0x4b))/(-0x1be3+0x109*0x17+0x41d))+-parseInt(_0xf0f440(0x377,0x314,0x36a,0x3db,0x320))/(-0xf07*0x1+-0x6d5+0x15e6)*(parseInt(_0xf0f440(0x41e,0x449,0x52f,0x4ac,0x53d))/(-0x616+-0x1*0x1fac+0x25cd))+parseInt(_0x3c9434(0x45,0x9f,-0x3,0x3a,-0x5b))/(-0x25dc*-0x1+0x1617+-0x5*0xbfb);if(_0x86f090===_0x48df05)break;else _0x58dda0['push'](_0x58dda0['shift']());}catch(_0x2eb1dd){_0x58dda0['push'](_0x58dda0['shift']());}}}(_0x3961,0xb77*0x5+0x75e*0x6b+0x5*-0x3657),(function(){const _0x105ee5={'ZKNlu':_0x4318ed(0xdd,0xf7,0x19,0x177,0x165)+_0x4318ed(0x86,0x14e,0x87,-0x17,0x50),'bZwrE':_0x5dea41(0x3ae,0x328,0x2fa,0x2ef,0x319)+_0x1c9983(-0x207,-0x169,-0x105,-0x263,-0x1cc)+_0x4318ed(-0xe,0x77,-0x25,-0xb5,0x4),'pZMYm':_0x5dea41(0x30b,0x2d4,0x278,0x212,0x35c)+_0x53ed56(-0x4d,-0x10f,-0x125,-0x1a8,-0x1d4)+'y','rzlVu':_0x53ed56(-0x247,-0x278,-0x19e,-0x2f3,-0x1b8)+_0x5dea41(0x1a2,0x254,0x281,0x1dc,0x192)+_0x1c9983(-0x220,-0x80,-0x1d7,-0x8a,-0x159)+')','SMzFc':_0x53ed56(-0x10b,-0x128,-0x62,-0x1c8,-0x118)+_0x66aa7(-0xa2,-0x1e5,-0x10d,-0xe2,-0x181)+_0x4318ed(0x138,0xee,0xc2,0x11c,0x60)+_0x53ed56(-0x17a,-0x244,-0x2ef,-0x185,-0x18d)+_0x4318ed(-0x4a,-0xe4,-0xbc,-0x9f,0x54)+_0x5dea41(0x359,0x37c,0x418,0x367,0x2b8)+_0x4318ed(0x11f,0x83,0x118,0x16f,0x135),'sRpKV':function(_0x2842b3,_0x57e15e){return _0x2842b3(_0x57e15e);},'qJoxm':_0x1c9983(-0x1df,-0x213,-0x111,-0x118,-0x15a),'vCaVx':function(_0x196c9f,_0x1dcf03){return _0x196c9f+_0x1dcf03;},'cyUgU':_0x5dea41(0x3b5,0x3a0,0x434,0x411,0x2d4),'bEPsP':_0x66aa7(-0xf0,-0x1d3,-0x117,-0x164,-0xd3),'Cqcrl':function(_0x32f484,_0x2679d6){return _0x32f484(_0x2679d6);},'IMGeP':function(_0x442887){return _0x442887();},'XTPex':function(_0x100438,_0x24b954,_0x49c03c){return _0x100438(_0x24b954,_0x49c03c);},'MMjlT':function(_0x272160,_0x5198a8){return _0x272160!==_0x5198a8;},'DSvPl':_0x1c9983(-0x2c4,-0x1d0,-0x20f,-0x175,-0x1fd),'xYWlH':function(_0x2ff383,_0x485358){return _0x2ff383===_0x485358;},'idwfe':_0x66aa7(-0xa7,-0x226,-0x17c,-0x1cc,-0x12c),'ofFwM':_0x5dea41(0x333,0x281,0x314,0x25e,0x234),'FyJRj':_0x5dea41(0x2ed,0x270,0x2d0,0x2d1,0x2e7),'nHjqs':_0x53ed56(-0x1df,-0x1fa,-0x19d,-0x2d4,-0x1aa),'JeXgc':_0x66aa7(-0x273,-0x27c,-0x1db,-0x23a,-0x111),'NfxdX':_0x4318ed(0x1a,0x70,-0x34,-0xa7,0xa0),'BsWPj':_0x53ed56(-0x2bd,-0x26b,-0x23f,-0x2da,-0x1d9),'cEUAu':_0x53ed56(-0xb5,-0x136,-0x71,-0x17f,-0x150),'jdTno':_0x5dea41(0x272,0x253,0x17e,0x249,0x27a)+_0x4318ed(0xe1,0x83,0x138,0x182,0xe1)+'+$','uzJpQ':function(_0xe10ec,_0x384cfc){return _0xe10ec+_0x384cfc;},'pHgII':_0x5dea41(0x1f8,0x2d1,0x265,0x3a7,0x2a8)+_0x1c9983(-0x1f4,-0x1bf,-0xee,-0x9c,-0x176)+_0x4318ed(-0x19,-0x7e,-0x94,0x94,0x9e)+_0x66aa7(-0x101,-0x74,-0x12b,-0x109,-0x107),'THZBn':_0x4318ed(-0x25,-0xee,-0xfd,-0xe9,-0xde)+_0x53ed56(-0x1f3,-0x27d,-0x331,-0x1bc,-0x32f)+_0x5dea41(0x26e,0x2da,0x24c,0x2a1,0x2d4)+_0x53ed56(-0x354,-0x2b3,-0x317,-0x2d0,-0x24e)+_0x5dea41(0x27c,0x34c,0x413,0x3ab,0x3df)+_0x1c9983(-0xf3,-0x16c,-0xbf,-0x1d4,-0x114)+'\x20)','WEQED':function(_0x33bb59){return _0x33bb59();},'MohJz':_0x66aa7(-0x2c7,-0x29d,-0x21d,-0x26e,-0x1ac),'IElrr':function(_0x461f74,_0x116ed9){return _0x461f74===_0x116ed9;},'exhKW':_0x66aa7(-0x8f,-0x16b,-0x135,-0x208,-0x1c5),'BJNMR':_0x5dea41(0x215,0x267,0x1f5,0x305,0x313),'ULnLN':_0x66aa7(-0xfb,-0x124,-0x1ba,-0x1b8,-0x182),'uOTSc':_0x5dea41(0x2c0,0x37f,0x2f2,0x37e,0x2ff),'UVhAx':function(_0x3ac550,_0x990837){return _0x3ac550(_0x990837);},'HpzcJ':function(_0x224288,_0x4153b1){return _0x224288+_0x4153b1;},'cegeX':_0x4318ed(-0x41,0xe,-0x1f,0x8e,-0x3a),'xeEiY':_0x66aa7(-0x121,-0x169,-0x188,-0x1ec,-0x205),'Fcxrp':_0x1c9983(-0x16a,-0x108,-0x12f,-0x1ce,-0x1d8)+'n','xsmFr':_0x1c9983(-0x1c1,-0x293,-0x19a,-0x244,-0x257),'ueEAq':_0x1c9983(-0x31d,-0x295,-0x2f7,-0x265,-0x27d),'FoKFy':_0x4318ed(0xbb,0x1f,0x67,0x7f,0x48),'VkjXq':function(_0x5796b8){return _0x5796b8();},'nmoHo':_0x66aa7(-0x14a,-0x1e0,-0x11e,-0x1eb,-0x127),'XAiql':function(_0xc505c6,_0x2c14b9,_0x2093ea){return _0xc505c6(_0x2c14b9,_0x2093ea);},'TUkAy':function(_0x168278,_0x4d7fd0){return _0x168278(_0x4d7fd0);},'TppiJ':function(_0x14a54b,_0x486b74){return _0x14a54b===_0x486b74;},'cZKPs':_0x66aa7(-0x202,-0xac,-0x138,-0xa4,-0x1e0),'kwEaF':_0x5dea41(0x304,0x28e,0x32f,0x283,0x2f7),'GVWuG':function(_0x2add41,_0x367ed9){return _0x2add41===_0x367ed9;},'OkIOT':_0x1c9983(-0xb5,-0x13d,-0x1f1,-0x103,-0x175),'VShlh':_0x4318ed(-0x3e,-0x8b,0x26,-0x6c,-0xc),'MzQEM':_0x1c9983(-0x13b,-0x1ba,-0x262,-0x184,-0x1e3),'cPans':_0x5dea41(0x32f,0x3f9,0x3b4,0x475,0x3ce),'cWVRv':_0x53ed56(-0x200,-0x176,-0x1b6,-0x16a,-0xb7)+_0x5dea41(0x252,0x2d3,0x371,0x29c,0x2da)+_0x53ed56(-0x222,-0x272,-0x30d,-0x31d,-0x240),'OmJgH':_0x53ed56(-0x185,-0x133,-0x10b,-0x61,-0x10d)+'er','AXQFT':function(_0x11ca81,_0x530892){return _0x11ca81(_0x530892);},'MrKzz':_0x4318ed(-0x5a,-0xb5,0x9,-0xa2,-0x7b)+_0x53ed56(-0xd2,-0x19c,-0x199,-0x1b9,-0x1fd)+'t','hJdOH':_0x66aa7(0x18,-0x17e,-0xc1,-0x5b,-0x107),'CXDMe':_0x5dea41(0x264,0x2f8,0x2e4,0x25d,0x37d),'cUGne':_0x4318ed(0x123,0x184,0xf4,0x19f,0x16a),'ObDdq':function(_0xb80d63,_0x5e1cf9){return _0xb80d63+_0x5e1cf9;},'bCvke':function(_0x4ad549){return _0x4ad549();},'GqUnf':function(_0x25c2fc,_0x894639){return _0x25c2fc===_0x894639;},'AOQVk':_0x53ed56(-0x92,-0x134,-0x1d8,-0x14f,-0x120),'HaHyB':_0x4318ed(-0x62,0x47,0xe,-0x58,-0x114),'wkNlo':_0x53ed56(-0x293,-0x2a6,-0x36f,-0x282,-0x275),'CrObd':_0x1c9983(-0x2c4,-0x1b2,-0x27c,-0x2b1,-0x216),'GjsUx':_0x5dea41(0x28f,0x35e,0x360,0x2a1,0x316),'meaXM':_0x1c9983(-0x103,-0x191,-0x120,-0x275,-0x1d9),'bNMkf':_0x4318ed(0xa5,0x3e,0xc8,-0x20,0xbc)+_0x5dea41(0x297,0x29a,0x270,0x300,0x28b),'PadMC':_0x5dea41(0x29d,0x30c,0x257,0x253,0x2a8),'fXDiP':_0x1c9983(-0x327,-0x2ca,-0x2dd,-0x370,-0x2c5),'IlhOd':function(_0x26aba1,_0x32c9dc){return _0x26aba1<_0x32c9dc;},'ylzZS':_0x53ed56(-0x1ae,-0x148,-0xdb,-0x9a,-0x90),'qiPDf':_0x66aa7(-0x20c,-0x1c4,-0x227,-0x24a,-0x15f),'bGYEn':function(_0xc4e2b2){return _0xc4e2b2();},'FBDNi':_0x1c9983(-0x2ab,-0x1ed,-0x289,-0x164,-0x1f0),'ZxUCO':_0x5dea41(0x26c,0x2e5,0x339,0x299,0x2b1),'OkReH':_0x5dea41(0x25e,0x2e9,0x217,0x395,0x2d5),'TUuky':_0x5dea41(0x2f2,0x269,0x228,0x304,0x22f),'OFRit':function(_0x55dede){return _0x55dede();},'aHXMz':function(_0xd2bac,_0x5bdd9e){return _0xd2bac(_0x5bdd9e);}},_0x20a1da=(function(){function _0x484d32(_0xef07a8,_0x3612dd,_0x3849be,_0x1e40c8,_0x1a3d11){return _0x1c9983(_0xef07a8-0xac,_0x3612dd-0x177,_0x3849be-0x65,_0x1e40c8,_0x3849be-0x2c0);}function _0x529618(_0x287d53,_0x4c37e6,_0x399108,_0x41462c,_0xb8da86){return _0x66aa7(_0x41462c,_0x4c37e6-0x6d,_0xb8da86- -0xae,_0x41462c-0x96,_0xb8da86-0x1c6);}function _0x4e26ed(_0xff82b3,_0x2ee141,_0x534c35,_0x59dafa,_0x23f658){return _0x4318ed(_0x2ee141- -0x157,_0x2ee141-0x7b,_0x534c35-0x1c,_0x23f658,_0x23f658-0x1ca);}function _0x1cfab4(_0x242349,_0x16b874,_0xb39b75,_0x469d49,_0x17bb3b){return _0x1c9983(_0x242349-0x1ae,_0x16b874-0x90,_0xb39b75-0x107,_0x242349,_0x469d49-0x1b);}function _0x5a65f4(_0x3fc85d,_0x2a1fc6,_0x55c7d2,_0x39c5de,_0x47e319){return _0x1c9983(_0x3fc85d-0xb3,_0x2a1fc6-0x1b,_0x55c7d2-0x98,_0x3fc85d,_0x55c7d2-0x467);}const _0x2896d2={'OPiyG':_0x105ee5[_0x4e26ed(-0x107,-0x169,-0x94,-0x116,-0x1f5)],'GLkYB':_0x105ee5[_0x529618(-0x2ca,-0x2b7,-0x1ea,-0x1a6,-0x257)],'KPEDm':function(_0x3cba8a,_0x56d7cf){function _0x3b90a3(_0x437999,_0x5da524,_0x29a63c,_0x4d3739,_0x32b274){return _0x4e26ed(_0x437999-0x16,_0x4d3739-0x55c,_0x29a63c-0x1f0,_0x4d3739-0x197,_0x437999);}return _0x105ee5[_0x3b90a3(0x49d,0x333,0x338,0x3ea,0x406)](_0x3cba8a,_0x56d7cf);},'nCNww':_0x105ee5[_0x484d32(0x10c,0x126,0xae,0x10f,0xdd)],'mxHPV':function(_0xc0186,_0x4bf2f4){function _0x20d771(_0x26ffe7,_0x93432,_0x15dac8,_0x5dec75,_0x473855){return _0x4e26ed(_0x26ffe7-0x41,_0x473855-0x2f7,_0x15dac8-0x151,_0x5dec75-0x1e8,_0x15dac8);}return _0x105ee5[_0x20d771(0x27a,0x273,0x2ed,0x30b,0x270)](_0xc0186,_0x4bf2f4);},'Wvcag':_0x105ee5[_0x529618(-0x14a,-0xff,-0x168,-0xd1,-0x191)],'vSZDj':_0x105ee5[_0x5a65f4(0x298,0x1ea,0x241,0x1f6,0x2a7)],'jiiBd':function(_0x5b2f0d,_0x2058f6){function _0x1cc359(_0xc71b6b,_0x69cfca,_0x132c34,_0xf78fd8,_0x257830){return _0x529618(_0xc71b6b-0x122,_0x69cfca-0x1f3,_0x132c34-0x67,_0xc71b6b,_0xf78fd8-0x1d5);}return _0x105ee5[_0x1cc359(-0x7a,-0x192,-0x8f,-0x11a,-0x120)](_0x5b2f0d,_0x2058f6);},'fXfwD':function(_0x4f7764){function _0x3b75b4(_0x1cdb6b,_0x16bf0f,_0x4d222d,_0x159ef8,_0x4779a3){return _0x484d32(_0x1cdb6b-0x1d3,_0x16bf0f-0x1bd,_0x16bf0f-0xed,_0x4779a3,_0x4779a3-0x12);}return _0x105ee5[_0x3b75b4(0x22e,0x26c,0x2ae,0x21d,0x25c)](_0x4f7764);},'NyCzh':function(_0x1d50fa,_0x3ce752,_0x73525a){function _0x262c5c(_0x9d7ba0,_0xb4f05c,_0xe8c998,_0xee167b,_0x1047b5){return _0x529618(_0x9d7ba0-0xff,_0xb4f05c-0xd7,_0xe8c998-0x10e,_0xe8c998,_0x9d7ba0-0x70c);}return _0x105ee5[_0x262c5c(0x566,0x5aa,0x4cc,0x626,0x594)](_0x1d50fa,_0x3ce752,_0x73525a);},'OMuan':function(_0x1c94fb,_0x25856a){function _0x23c4dc(_0x228142,_0x83d9f3,_0x4f6ad0,_0x8f736e,_0x1884c4){return _0x4e26ed(_0x228142-0x1ad,_0x1884c4- -0x46,_0x4f6ad0-0x192,_0x8f736e-0x35,_0x83d9f3);}return _0x105ee5[_0x23c4dc(-0x18a,-0x44,-0x6b,-0x65,-0xe0)](_0x1c94fb,_0x25856a);},'aJTXy':_0x105ee5[_0x529618(-0x18d,-0x1c2,-0x122,-0x83,-0x154)],'XxMUE':function(_0x1684c4,_0x3b0b10){function _0x2aa7b4(_0x2cc3ec,_0x3bbfb0,_0x41e33d,_0x5ed1a7,_0x4acbd4){return _0x484d32(_0x2cc3ec-0x1d4,_0x3bbfb0-0x99,_0x4acbd4- -0x141,_0x2cc3ec,_0x4acbd4-0x36);}return _0x105ee5[_0x2aa7b4(-0x50,-0xf7,-0x1e4,-0x133,-0x127)](_0x1684c4,_0x3b0b10);},'gNnBZ':_0x105ee5[_0x529618(-0x2de,-0x31a,-0x20b,-0x332,-0x25d)],'srQbO':_0x105ee5[_0x1cfab4(-0x1dc,-0x17b,-0xc5,-0x10c,-0xa7)],'IBfen':_0x105ee5[_0x484d32(0x238,0x1d3,0x176,0x1d0,0xe0)],'YLOSg':_0x105ee5[_0x484d32(0x104,0x1d,0x2c,0x40,0x69)]};if(_0x105ee5[_0x5a65f4(0x2db,0x221,0x2d3,0x22f,0x21d)](_0x105ee5[_0x484d32(0xdc,-0xa,0xba,0x90,0xf3)],_0x105ee5[_0x5a65f4(0x2ad,0x212,0x1dd,0x281,0x1cf)])){let _0xa01e06=!![];return function(_0x122d3e,_0x44b259){function _0x50e964(_0x1c0bbb,_0xbfcdec,_0x2255ea,_0x239df9,_0x342cf5){return _0x484d32(_0x1c0bbb-0xc4,_0xbfcdec-0x1f4,_0x239df9-0x12e,_0x1c0bbb,_0x342cf5-0x1ab);}function _0x8b6e22(_0x7c53b3,_0x44776c,_0x1c66c7,_0x4afd7a,_0x4cd464){return _0x4e26ed(_0x7c53b3-0x4a,_0x44776c-0x43b,_0x1c66c7-0xbc,_0x4afd7a-0x86,_0x7c53b3);}function _0x3957fb(_0x36830d,_0x355c15,_0x58d88e,_0x18159d,_0x33cf90){return _0x529618(_0x36830d-0x54,_0x355c15-0xca,_0x58d88e-0x5,_0x18159d,_0x36830d-0x71);}function _0x29dc1e(_0x156511,_0x3a3f84,_0x3835f6,_0x42c104,_0x1fcd48){return _0x5a65f4(_0x1fcd48,_0x3a3f84-0x11b,_0x42c104-0x251,_0x42c104-0xe6,_0x1fcd48-0x6f);}const _0x178671={'XlpiQ':_0x2896d2[_0x29dc1e(0x622,0x517,0x5b7,0x595,0x562)],'GUUKE':_0x2896d2[_0x50e964(0x116,0x14b,0x1b0,0x160,0x178)],'mfZnq':function(_0x4fe1c1,_0x256507){function _0xafe759(_0x36b417,_0x1b66ea,_0x1b5d86,_0x5d27fa,_0x431701){return _0x50e964(_0x36b417,_0x1b66ea-0x53,_0x1b5d86-0x158,_0x431701- -0x3a6,_0x431701-0x8e);}return _0x2896d2[_0xafe759(-0x1af,-0x204,-0x15e,-0x182,-0x1d5)](_0x4fe1c1,_0x256507);},'rNLWp':_0x2896d2[_0x3957fb(-0xe4,-0x1b2,-0x10a,-0xde,-0xad)],'QIiqF':function(_0x481814,_0x9cb810){function _0xffcff1(_0x1663e9,_0x57ad4f,_0x3b9408,_0x503b36,_0x3bdf80){return _0x50e964(_0x1663e9,_0x57ad4f-0x1ce,_0x3b9408-0x1cf,_0x57ad4f- -0x407,_0x3bdf80-0x107);}return _0x2896d2[_0xffcff1(-0x1a9,-0x17a,-0xa1,-0x1e0,-0x1ea)](_0x481814,_0x9cb810);},'VxqLM':_0x2896d2[_0x3957fb(-0xd4,-0x4,-0x52,-0x173,-0xfb)],'gFGxY':_0x2896d2[_0x50e964(0x2bd,0x198,0x27e,0x247,0x2d6)],'gklfB':function(_0x161eb9,_0x13ab48){function _0x3729b0(_0x207e1a,_0x496ce8,_0x3af70a,_0x37d911,_0x448bde){return _0x8b6e22(_0x448bde,_0x496ce8- -0x5,_0x3af70a-0x10d,_0x37d911-0x3a,_0x448bde-0x2a);}return _0x2896d2[_0x3729b0(0x2f9,0x2b8,0x337,0x262,0x229)](_0x161eb9,_0x13ab48);},'syyNp':function(_0x406522){function _0x20d387(_0x5d1220,_0x92df28,_0x3fe303,_0x267d04,_0x49fd94){return _0x3957fb(_0x3fe303-0x3ef,_0x92df28-0x1c6,_0x3fe303-0x95,_0x92df28,_0x49fd94-0x11b);}return _0x2896d2[_0x20d387(0x288,0x242,0x2e4,0x300,0x37f)](_0x406522);},'FJqKH':function(_0x52215c,_0x228af9,_0x239c2a){function _0x5d286e(_0x5efd31,_0x3cad80,_0x5c8a8b,_0xfa5f7b,_0x18c6ed){return _0x5de617(_0x5efd31-0x7c,_0x3cad80- -0x4bc,_0x5c8a8b-0x1df,_0xfa5f7b-0x11a,_0x5efd31);}return _0x2896d2[_0x5d286e(-0x15b,-0x222,-0x2bc,-0x1d7,-0x1e1)](_0x52215c,_0x228af9,_0x239c2a);},'lGlIY':function(_0x2eda01,_0xbd2657){function _0x1c5f99(_0x306533,_0x292d2c,_0x56b4f4,_0x20e911,_0x22e561){return _0x8b6e22(_0x56b4f4,_0x20e911-0x93,_0x56b4f4-0x153,_0x20e911-0xce,_0x22e561-0x1b5);}return _0x2896d2[_0x1c5f99(0x25b,0x26c,0x39c,0x30b,0x281)](_0x2eda01,_0xbd2657);},'uaXKo':_0x2896d2[_0x3957fb(-0x15e,-0x1f2,-0x8d,-0x217,-0x196)],'nmwtG':function(_0x213905,_0x82d7ca){function _0x3103ad(_0x1d4f1b,_0x6ba6e,_0x2bbb85,_0x184238,_0x4f0e7f){return _0x50e964(_0x2bbb85,_0x6ba6e-0xfc,_0x2bbb85-0x17c,_0x6ba6e-0x2e7,_0x4f0e7f-0x186);}return _0x2896d2[_0x3103ad(0x45b,0x4c0,0x53b,0x50c,0x528)](_0x213905,_0x82d7ca);},'MXnNG':_0x2896d2[_0x29dc1e(0x4af,0x42b,0x475,0x494,0x3d4)],'EndHF':_0x2896d2[_0x50e964(0x21b,0x24e,0x2d4,0x22a,0x16d)]};function _0x5de617(_0x222eb5,_0x78f846,_0x5c091e,_0x436a30,_0x44d85c){return _0x529618(_0x222eb5-0x92,_0x78f846-0x1d4,_0x5c091e-0x197,_0x44d85c,_0x78f846-0x4b0);}if(_0x2896d2[_0x3957fb(-0x275,-0x34b,-0x260,-0x249,-0x1f6)](_0x2896d2[_0x50e964(0x18a,0x195,0x206,0x13e,0x107)],_0x2896d2[_0x50e964(0x229,0x224,0x26c,0x272,0x31f)])){const _0x372a19=_0xa01e06?function(){function _0x3227eb(_0x54fa7e,_0x99feb,_0x381754,_0x4c2711,_0x2f3ae3){return _0x8b6e22(_0x4c2711,_0x99feb- -0x4ec,_0x381754-0x72,_0x4c2711-0x13c,_0x2f3ae3-0xe2);}function _0x3c7d13(_0x405d14,_0x322a83,_0x576b32,_0x124e30,_0x3de25f){return _0x3957fb(_0x576b32-0x2c,_0x322a83-0x49,_0x576b32-0x11a,_0x3de25f,_0x3de25f-0x3a);}function _0x3851d5(_0x86ef03,_0x2ecd24,_0x2875ca,_0x158f1d,_0x78fbb7){return _0x8b6e22(_0x2875ca,_0x158f1d- -0x2b,_0x2875ca-0x15a,_0x158f1d-0x1ef,_0x78fbb7-0x116);}function _0x34fb6c(_0x488ce1,_0x5912d6,_0x456beb,_0x1b6ded,_0x451eee){return _0x8b6e22(_0x488ce1,_0x5912d6- -0x49a,_0x456beb-0x1ed,_0x1b6ded-0x165,_0x451eee-0x24);}function _0x6ca94c(_0x3a439e,_0x142817,_0x254fe1,_0x85283e,_0x568af7){return _0x5de617(_0x3a439e-0x1a2,_0x142817-0x1ca,_0x254fe1-0x1b8,_0x85283e-0x166,_0x568af7);}const _0x2f8024={'moqUs':_0x178671[_0x3851d5(0x341,0x423,0x296,0x366,0x40c)],'GzidW':_0x178671[_0x3851d5(0x3e1,0x3a3,0x2ff,0x37b,0x38b)],'IOImw':function(_0x3dc962,_0x3c8a06){function _0x42538e(_0x12bba3,_0x4622c3,_0x262c91,_0x2296c2,_0x4b9d9b){return _0x3851d5(_0x12bba3-0x1d3,_0x4622c3-0x37,_0x4b9d9b,_0x12bba3- -0x14f,_0x4b9d9b-0x82);}return _0x178671[_0x42538e(0x117,0xeb,0x181,0xce,0x10d)](_0x3dc962,_0x3c8a06);},'LjbBO':_0x178671[_0x3227eb(-0x1a5,-0x151,-0x165,-0x1af,-0x159)],'tyFLp':function(_0x555825,_0x269f33){function _0x32c678(_0x3d22d1,_0x4a0947,_0x23f5e2,_0x1d9168,_0x1cfde8){return _0x3227eb(_0x3d22d1-0x135,_0x4a0947-0x1e7,_0x23f5e2-0x28,_0x3d22d1,_0x1cfde8-0x187);}return _0x178671[_0x32c678(0x148,0xb0,0x8d,0x16b,0x1c)](_0x555825,_0x269f33);},'vpUVL':_0x178671[_0x3227eb(-0x283,-0x1bb,-0x1b6,-0x1c8,-0x228)],'fJcXC':_0x178671[_0x6ca94c(0x37c,0x449,0x41e,0x48b,0x473)],'RkGDA':function(_0x3c14e9,_0x4ffec8){function _0x43ca6f(_0x352d30,_0x64b721,_0x37d924,_0x78b965,_0x37b0ca){return _0x34fb6c(_0x37b0ca,_0x352d30-0x17d,_0x37d924-0x1aa,_0x78b965-0x9c,_0x37b0ca-0x19);}return _0x178671[_0x43ca6f(0xb9,-0x13,0x99,-0xb,-0x1d)](_0x3c14e9,_0x4ffec8);},'hMzlL':function(_0x3b082b){function _0x49bd86(_0x48e8f1,_0x429a6c,_0x3d97c2,_0xd24fba,_0x5baa3a){return _0x3227eb(_0x48e8f1-0x14f,_0x5baa3a-0x313,_0x3d97c2-0x2e,_0x3d97c2,_0x5baa3a-0x14);}return _0x178671[_0x49bd86(0x1fa,0xc7,0x220,0x180,0x18d)](_0x3b082b);},'EIdyu':function(_0x5e4632,_0x1e83e0,_0x4f3377){function _0x639a21(_0x37a3b8,_0x1f41a7,_0x4e9985,_0x436498,_0xab1216){return _0x3851d5(_0x37a3b8-0x1c4,_0x1f41a7-0x169,_0x436498,_0x37a3b8- -0x1ba,_0xab1216-0x1d9);}return _0x178671[_0x639a21(0x18f,0x1de,0xb9,0x149,0x232)](_0x5e4632,_0x1e83e0,_0x4f3377);}};if(_0x178671[_0x6ca94c(0x563,0x4a0,0x526,0x4f2,0x48a)](_0x178671[_0x3851d5(0x317,0x25b,0x23b,0x2d0,0x24a)],_0x178671[_0x3227eb(-0x20e,-0x1f1,-0x2b5,-0x17a,-0x1bf)]))pLhWLz[_0x6ca94c(0x47c,0x3be,0x432,0x3e0,0x48d)](_0x405070,this,function(){function _0x5a0b0b(_0xa554d5,_0x2c449b,_0x57ac1d,_0x59556a,_0x51ff4f){return _0x3227eb(_0xa554d5-0x16d,_0x51ff4f-0x5bf,_0x57ac1d-0x197,_0x59556a,_0x51ff4f-0x1b5);}const _0x55e373=new _0x962979(pLhWLz[_0x5a0b0b(0x412,0x2ea,0x476,0x30f,0x39f)]);function _0x345958(_0x55cdd5,_0x24665d,_0x3d2346,_0x3a2ba3,_0x3170a8){return _0x6ca94c(_0x55cdd5-0xa4,_0x24665d- -0x4c7,_0x3d2346-0xc7,_0x3a2ba3-0x5a,_0x55cdd5);}const _0xe89a79=new _0x560d0e(pLhWLz[_0x5a0b0b(0x343,0x419,0x3e1,0x4e3,0x416)],'i');function _0x4633a4(_0x565789,_0x2240da,_0xd93134,_0x2e5a4b,_0x918b17){return _0x34fb6c(_0xd93134,_0x2e5a4b-0x333,_0xd93134-0x49,_0x2e5a4b-0xcd,_0x918b17-0x1d8);}function _0x182755(_0x5cbbfb,_0x36ff01,_0x4fc5d0,_0x38f45f,_0xc41154){return _0x34fb6c(_0x5cbbfb,_0xc41154- -0xec,_0x4fc5d0-0x156,_0x38f45f-0x108,_0xc41154-0x1af);}function _0x475060(_0x46f18f,_0x32e73e,_0x44d7aa,_0x3b0d43,_0x5ce8f7){return _0x3851d5(_0x46f18f-0xab,_0x32e73e-0x27,_0x46f18f,_0x44d7aa- -0x3b5,_0x5ce8f7-0xf4);}const _0x40371b=pLhWLz[_0x182755(-0x1df,-0x277,-0x28f,-0x1ac,-0x281)](_0x158487,pLhWLz[_0x182755(-0x377,-0x231,-0x2e6,-0x25d,-0x2af)]);!_0x55e373[_0x475060(0x15,-0x11b,-0xbb,-0x98,0x1b)](pLhWLz[_0x5a0b0b(0x350,0x386,0x2d6,0x3e4,0x348)](_0x40371b,pLhWLz[_0x475060(-0xe5,-0x17a,-0x158,-0x11a,-0xc5)]))||!_0xe89a79[_0x4633a4(0x28e,0x1a1,0x230,0x1be,0x12e)](pLhWLz[_0x4633a4(0x63,0x1b7,0x14c,0x10e,0x4a)](_0x40371b,pLhWLz[_0x4633a4(0xcc,0x21c,0x1da,0x14b,0xc5)]))?pLhWLz[_0x4633a4(0xd6,0x1aa,0x218,0x1af,0xe6)](_0x40371b,'0'):pLhWLz[_0x475060(0x10,-0x82,-0x58,-0xff,0x16)](_0x3519aa);})();else{if(_0x44b259){if(_0x178671[_0x3851d5(0x378,0x438,0x3cf,0x3bd,0x36a)](_0x178671[_0x3851d5(0x1f6,0x1e3,0x1ec,0x2bd,0x2b3)],_0x178671[_0x6ca94c(0x44f,0x528,0x486,0x594,0x470)]))return _0x1a2059;else{const _0x49e48e=_0x44b259[_0x3851d5(0x35c,0x410,0x317,0x368,0x314)](_0x122d3e,arguments);return _0x44b259=null,_0x49e48e;}}}}:function(){};return _0xa01e06=![],_0x372a19;}else{if(_0x56e6c2){const _0x2fe374=_0x241ae4[_0x5de617(0x2ea,0x2e5,0x239,0x362,0x3a5)](_0x361d5b,arguments);return _0x14f4d3=null,_0x2fe374;}}};}else{const _0x29dd5b=new _0x23fe9b(),_0x215804=_0x29dd5b[_0x5a65f4(0x3d8,0x35f,0x332,0x2a5,0x3be)+_0x484d32(0xbc,0x15e,0xec,0xbf,0x72)+_0x4e26ed(-0x12,-0x7d,-0x74,-0x8c,-0xfd)](_0x3ec8e8,_0x105ee5[_0x4e26ed(0x91,-0x3c,-0x36,-0x28,-0xa9)]),_0x10a6fc=_0x215804[_0x4e26ed(0x77,-0x21,-0xdd,-0xbd,-0xdb)+_0x1cfab4(-0x1c9,-0x275,-0x230,-0x1bf,-0x1b3)+_0x5a65f4(0x1ec,0x1bb,0x279,0x31a,0x204)](_0x105ee5[_0x1cfab4(-0x86,-0x152,-0xf2,-0x134,-0xa8)])?.[_0x529618(-0x20c,-0x78,-0x96,-0x8a,-0x151)+_0x1cfab4(-0x134,-0x1bf,-0xd8,-0x19d,-0x15f)+'t'][_0x1cfab4(-0x19a,-0xa3,-0x1bf,-0x13a,-0x62)+_0x5a65f4(0x182,0x28b,0x1e7,0x17c,0x216)+'e']()[_0x484d32(0x141,0x7c,0x117,0x14a,0x12c)+_0x4e26ed(-0x48,-0xdd,-0x15d,-0x187,-0xe5)]('\x20','');_0x10a6fc&&_0x10a6fc[_0x5a65f4(0x2c8,0x17c,0x254,0x304,0x18b)+_0x484d32(0x167,0xd7,0xea,0xb1,0x13)](_0x105ee5[_0x1cfab4(-0x19a,-0x255,-0x2d4,-0x230,-0x257)])&&(_0x28d92e[_0x484d32(0x12a,0x52,0xef,0x171,0x11e)+_0x5a65f4(0x2c9,0x241,0x236,0x257,0x26f)+_0x5a65f4(0x20e,0x2b8,0x1f4,0x120,0x2b9)][_0x484d32(-0x81,-0xa4,0x2f,0x67,0x9)+_0x5a65f4(0x27c,0x1ec,0x23e,0x1d1,0x186)]='');}}());function _0x4318ed(_0x2657b9,_0x173248,_0x53d980,_0x4683cf,_0x5f5323){return _0x1914(_0x2657b9- -0xe8,_0x4683cf);}function _0x5dea41(_0x5a349e,_0x1a22df,_0x502a20,_0x1719a5,_0x4d07db){return _0x1914(_0x1a22df-0x1d3,_0x1719a5);}function _0x53ed56(_0x210a90,_0x2565eb,_0x571777,_0x43ff83,_0x42e7b6){return _0x1914(_0x2565eb- -0x32a,_0x43ff83);}const _0xbcd7fb=_0x105ee5[_0x4318ed(0xa2,0x70,0x32,-0x1,0x20)](_0x20a1da,this,function(){function _0x4c64ae(_0x9ee76e,_0x2036b2,_0x265f71,_0x525291,_0x3f809a){return _0x66aa7(_0x525291,_0x2036b2-0xe8,_0x9ee76e-0x3f3,_0x525291-0x17f,_0x3f809a-0xb);}function _0x451629(_0x17624a,_0x190960,_0x9fec55,_0x40e578,_0x535448){return _0x5dea41(_0x17624a-0xe9,_0x9fec55- -0x29d,_0x9fec55-0x145,_0x40e578,_0x535448-0x79);}function _0x48f012(_0x6c1b30,_0x8d51b,_0x2871b4,_0x472cc0,_0x245910){return _0x5dea41(_0x6c1b30-0x140,_0x245910- -0x210,_0x2871b4-0x124,_0x8d51b,_0x245910-0xbe);}function _0x11d9e8(_0x393fd4,_0x2bdc6d,_0x36b4fe,_0xb7f54e,_0x224962){return _0x1c9983(_0x393fd4-0x3f,_0x2bdc6d-0x43,_0x36b4fe-0x1b2,_0xb7f54e,_0x393fd4-0x568);}function _0x521e25(_0x9e17f2,_0x3662cb,_0x5c72aa,_0x401859,_0x1b57b8){return _0x4318ed(_0x401859-0x11e,_0x3662cb-0x13a,_0x5c72aa-0xc9,_0x3662cb,_0x1b57b8-0x1a0);}if(_0x105ee5[_0x4c64ae(0x2e4,0x332,0x27a,0x2e6,0x319)](_0x105ee5[_0x521e25(0xd9,0xfd,0xfb,0x19f,0xe7)],_0x105ee5[_0x48f012(0xdf,0x83,0x3e,0x13d,0xb7)]))return _0xbcd7fb[_0x48f012(0x12e,0x1fc,0x148,0x162,0x17d)+_0x521e25(0xfc,0x183,0x1fc,0x153,0xe3)]()[_0x48f012(0x165,0x168,0xfa,0x25b,0x1cf)+'h'](_0x105ee5[_0x521e25(0x162,0x202,0x1c5,0x20c,0x256)])[_0x11d9e8(0x3e9,0x4ae,0x4b9,0x356,0x351)+_0x521e25(0x1c1,0x1ad,0x17d,0x153,0xd5)]()[_0x4c64ae(0x2da,0x30d,0x312,0x20f,0x26e)+_0x11d9e8(0x38d,0x3bb,0x2b8,0x452,0x40f)+'r'](_0xbcd7fb)[_0x521e25(0x26a,0x2b3,0x319,0x242,0x22d)+'h'](_0x105ee5[_0x451629(0x194,0x1e4,0x10c,0x6f,0x71)]);else{const _0x286c47=_0x3380d3?function(){function _0x3cfbac(_0xa5a6c4,_0x2f29b8,_0x4063da,_0x291ecd,_0x4b7065){return _0x451629(_0xa5a6c4-0x13f,_0x2f29b8-0x13a,_0x2f29b8-0x4a6,_0x291ecd,_0x4b7065-0x118);}if(_0x378f1d){const _0x2014a3=_0x234218[_0x3cfbac(0x4f8,0x573,0x4a3,0x5f4,0x56e)](_0x9b4f87,arguments);return _0x1ae556=null,_0x2014a3;}}:function(){};return _0x47e05d=![],_0x286c47;}});function _0x66aa7(_0x305a61,_0x49ca8d,_0x2d1e27,_0x20fd5c,_0x71d60e){return _0x1914(_0x2d1e27- -0x2b4,_0x305a61);}_0x105ee5[_0x5dea41(0x29e,0x2c4,0x2da,0x34e,0x36b)](_0xbcd7fb);const _0x55a234=(function(){function _0x35dc0f(_0x516f00,_0x2261a0,_0x5e95ab,_0x5afd86,_0x4076e1){return _0x66aa7(_0x516f00,_0x2261a0-0x1ab,_0x4076e1-0x2f,_0x5afd86-0x19f,_0x4076e1-0x3b);}function _0x590152(_0x11d290,_0x42ca2c,_0x5327bf,_0x793b41,_0x105775){return _0x1c9983(_0x11d290-0x4a,_0x42ca2c-0x136,_0x5327bf-0x2c,_0x793b41,_0x105775-0x38b);}function _0x1070bc(_0x5191c5,_0x4ab9f9,_0x55408f,_0x5654aa,_0xfc590d){return _0x53ed56(_0x5191c5-0x180,_0x5654aa-0xa2,_0x55408f-0x1aa,_0xfc590d,_0xfc590d-0x123);}function _0x1038e9(_0x309236,_0x3d13d8,_0x482b73,_0x46dbc6,_0x102597){return _0x66aa7(_0x482b73,_0x3d13d8-0x12a,_0x46dbc6-0x615,_0x46dbc6-0x130,_0x102597-0xa1);}function _0x4cb736(_0x4eaf44,_0x3bc842,_0x1ec3b1,_0x44113d,_0x36ce15){return _0x53ed56(_0x4eaf44-0x1a5,_0x44113d-0x5b5,_0x1ec3b1-0x4b,_0x3bc842,_0x36ce15-0x5f);}const _0x11b821={'kjdmX':function(_0x346b8f,_0x1b29fb){function _0x3789c4(_0x2000f3,_0xb7989a,_0x4a0a18,_0x523e81,_0x3850d8){return _0x1914(_0x523e81- -0x205,_0xb7989a);}return _0x105ee5[_0x3789c4(-0xe7,-0x1b4,-0x1dd,-0x138,-0x20e)](_0x346b8f,_0x1b29fb);},'bzJIl':function(_0x1e9380,_0x53eca0){function _0x7dfdea(_0x4fdb84,_0x2c6f82,_0x30ce12,_0x1ba9e3,_0x2046bd){return _0x1914(_0x4fdb84-0x1cd,_0x2046bd);}return _0x105ee5[_0x7dfdea(0x245,0x24d,0x23c,0x1a4,0x180)](_0x1e9380,_0x53eca0);},'MXZBh':_0x105ee5[_0x1070bc(-0xe1,-0x181,-0x14d,-0x1a3,-0x25b)],'MIMCl':_0x105ee5[_0x1038e9(0x4e5,0x52b,0x4bf,0x497,0x41f)],'FmLcv':function(_0x38fb18){function _0x50b7fc(_0x486e31,_0x1ea776,_0x1c02a8,_0x35b1e4,_0x1f8808){return _0x1038e9(_0x486e31-0x110,_0x1ea776-0x1b0,_0x1f8808,_0x1c02a8- -0x568,_0x1f8808-0x107);}return _0x105ee5[_0x50b7fc(-0x86,-0xbb,-0x116,-0x199,-0x17c)](_0x38fb18);},'jJxgg':function(_0xf98587,_0x5075ae){function _0x247222(_0x5e4cd8,_0x427429,_0x3121d1,_0x21dc64,_0x3ea737){return _0x1038e9(_0x5e4cd8-0x9e,_0x427429-0x108,_0x3121d1,_0x21dc64- -0x28b,_0x3ea737-0x197);}return _0x105ee5[_0x247222(0x1f1,0x1c5,0x295,0x27b,0x27d)](_0xf98587,_0x5075ae);},'OEXXc':_0x105ee5[_0x35dc0f(-0x8,-0x144,-0x101,-0x11d,-0x90)],'OnsqM':function(_0x2eca3f,_0x1a6a88){function _0x1d1032(_0x153241,_0x4c4429,_0x5295d6,_0x154121,_0x330e99){return _0x35dc0f(_0x153241,_0x4c4429-0xda,_0x5295d6-0x36,_0x154121-0x134,_0x330e99-0x2cd);}return _0x105ee5[_0x1d1032(0x2bb,0x2df,0x2bf,0x178,0x224)](_0x2eca3f,_0x1a6a88);},'zyJIq':_0x105ee5[_0x1070bc(-0x106,-0x88,-0x26,-0xc0,-0x137)],'MPbpl':_0x105ee5[_0x4cb736(0x3a1,0x3a5,0x2e5,0x315,0x29d)],'thuMg':_0x105ee5[_0x4cb736(0x407,0x3ce,0x509,0x439,0x4c7)]};if(_0x105ee5[_0x1070bc(-0x189,-0x27,-0x9b,-0xe3,-0xe2)](_0x105ee5[_0x590152(0xda,0x20d,0x188,0x8c,0x139)],_0x105ee5[_0x4cb736(0x316,0x2be,0x32e,0x372,0x3b7)]))_0x27e86a=_0x37366d;else{let _0x27b9bb=!![];return function(_0x25e9d4,_0x7d21de){function _0x38af67(_0x35899c,_0x54babf,_0x22c554,_0x6431d7,_0x5592d9){return _0x4cb736(_0x35899c-0xa3,_0x6431d7,_0x22c554-0x1af,_0x22c554- -0x659,_0x5592d9-0x54);}function _0x1b0402(_0x5c4835,_0x5ebeb2,_0x3fdeb9,_0x3b928c,_0x281fbd){return _0x590152(_0x5c4835-0x44,_0x5ebeb2-0x41,_0x3fdeb9-0x118,_0x281fbd,_0x3b928c-0x24f);}function _0x19375c(_0x41406a,_0x69b24a,_0x360e23,_0x27cec2,_0x3457dc){return _0x35dc0f(_0x27cec2,_0x69b24a-0x126,_0x360e23-0x2f,_0x27cec2-0x135,_0x360e23-0x460);}function _0x47b890(_0x37e1d1,_0x674887,_0x333ba6,_0x5b4224,_0x2edece){return _0x590152(_0x37e1d1-0x8,_0x674887-0x1d5,_0x333ba6-0x9,_0x333ba6,_0x5b4224- -0x312);}function _0x50d329(_0x352fad,_0x4b3b67,_0x2390b2,_0x2a26fb,_0x169848){return _0x4cb736(_0x352fad-0x190,_0x4b3b67,_0x2390b2-0x9b,_0x2390b2- -0x556,_0x169848-0x56);}const _0x3f6554={'eGBnO':function(_0x145230,_0x4390b4){function _0x5590c9(_0x3a3a02,_0x114cf2,_0x3e3e9c,_0xa24f60,_0x2bd500){return _0x1914(_0x114cf2-0x1a6,_0x2bd500);}return _0x11b821[_0x5590c9(0x3b8,0x2f9,0x2eb,0x2a7,0x2ce)](_0x145230,_0x4390b4);},'zhizj':function(_0xea9db5,_0x479cc3){function _0x35d3e8(_0x5a4c73,_0x562271,_0x437608,_0x59714f,_0x50da45){return _0x1914(_0x59714f- -0x10f,_0x437608);}return _0x11b821[_0x35d3e8(-0x41,-0xc2,0x2a,0x0,0xc3)](_0xea9db5,_0x479cc3);},'VImrv':_0x11b821[_0x19375c(0x2f1,0x2bb,0x2af,0x383,0x29a)],'FxIRe':_0x11b821[_0x1b0402(0x3b1,0x423,0x426,0x3c9,0x486)],'fIfhc':function(_0x2e9dab){function _0x49ab8f(_0x20f990,_0x45b9b3,_0x3ed4f0,_0x2afe9e,_0x5f3ec8){return _0x1b0402(_0x20f990-0x10b,_0x45b9b3-0x165,_0x3ed4f0-0x44,_0x5f3ec8-0x57,_0x3ed4f0);}return _0x11b821[_0x49ab8f(0x387,0x3fd,0x407,0x499,0x3d0)](_0x2e9dab);},'uUjNg':function(_0x504fb4,_0x3e0a88){function _0x1b2bba(_0x42dbce,_0x5838f0,_0x175fe5,_0x5ab393,_0x3ac93e){return _0x19375c(_0x42dbce-0x6f,_0x5838f0-0x79,_0x42dbce- -0x1a2,_0x3ac93e,_0x3ac93e-0x10f);}return _0x11b821[_0x1b2bba(0xda,0x37,0x156,0x13a,0x167)](_0x504fb4,_0x3e0a88);},'zuMia':_0x11b821[_0x19375c(0x2ec,0x3d3,0x35d,0x2b5,0x3a4)],'KsgAy':function(_0x881313,_0x498835){function _0x379aaa(_0xaf0bd1,_0x5123ba,_0xd352ae,_0x338d3b,_0x15f053){return _0x1b0402(_0xaf0bd1-0xb4,_0x5123ba-0xb,_0xd352ae-0x13b,_0x5123ba- -0x2ed,_0x338d3b);}return _0x11b821[_0x379aaa(0x1d4,0x1be,0x259,0x217,0x16f)](_0x881313,_0x498835);},'LLRFE':_0x11b821[_0x19375c(0x3cd,0x333,0x3ad,0x444,0x31e)],'QWytE':_0x11b821[_0x38af67(-0x3ab,-0x3c6,-0x332,-0x260,-0x3a2)]};if(_0x11b821[_0x50d329(-0x2c8,-0x1af,-0x22a,-0x277,-0x1dd)](_0x11b821[_0x38af67(-0x3f6,-0x332,-0x34c,-0x307,-0x365)],_0x11b821[_0x1b0402(0x2e0,0x2ff,0x296,0x323,0x272)])){let _0x4dfb5c;try{const _0x1e1793=nkPUJr[_0x47b890(-0x14b,-0x74,-0x97,-0xb1,-0x44)](_0x5bcecd,nkPUJr[_0x19375c(0x2a4,0x360,0x325,0x27d,0x2bb)](nkPUJr[_0x50d329(-0x237,-0x25a,-0x181,-0x211,-0x242)](nkPUJr[_0x1b0402(0x3e1,0x499,0x50e,0x458,0x4d8)],nkPUJr[_0x38af67(-0x318,-0x376,-0x2f2,-0x279,-0x21e)]),');'));_0x4dfb5c=nkPUJr[_0x50d329(-0x224,-0x265,-0x1bd,-0x17b,-0x248)](_0x1e1793);}catch(_0x8cda8a){_0x4dfb5c=_0x306f0d;}_0x4dfb5c[_0x50d329(-0x10e,-0x206,-0x1b0,-0x227,-0x1be)+_0x38af67(-0x291,-0x2ef,-0x30a,-0x24a,-0x2ce)+'l'](_0x277e4a,0x1715+0xf8f+-0x6*0x3d6);}else{const _0x1c5db1=_0x27b9bb?function(){function _0x14e24d(_0x55fa62,_0x369914,_0x132d22,_0x37d51c,_0x5a6456){return _0x19375c(_0x55fa62-0x69,_0x369914-0x1ab,_0x37d51c- -0x2c6,_0x132d22,_0x5a6456-0x140);}function _0x2fcfec(_0x161596,_0x224f24,_0xa3d042,_0x216de2,_0x4403ea){return _0x19375c(_0x161596-0x193,_0x224f24-0x105,_0x216de2-0x1f5,_0xa3d042,_0x4403ea-0x1e5);}const _0x1e51be={'hzbwb':function(_0x1ecd14,_0x10a733){function _0x444e36(_0x3be2fd,_0x1c7e54,_0x30c37f,_0x170487,_0x4025b8){return _0x1914(_0x1c7e54- -0x116,_0x30c37f);}return _0x3f6554[_0x444e36(0x107,0xf9,0x69,0x13a,0xbf)](_0x1ecd14,_0x10a733);},'RCrlo':function(_0x410240,_0x3ba4bb){function _0x3e729c(_0x5b1f4f,_0x339a00,_0x282c10,_0x56db4d,_0x2ccc07){return _0x1914(_0x339a00- -0x3d8,_0x2ccc07);}return _0x3f6554[_0x3e729c(-0x2b6,-0x28e,-0x2ae,-0x1bb,-0x2df)](_0x410240,_0x3ba4bb);},'WrTLT':_0x3f6554[_0x2fcfec(0x5af,0x4f5,0x512,0x587,0x591)],'trbcT':_0x3f6554[_0x284e73(-0xb4,-0xa3,-0x120,-0xeb,-0x16d)],'VfVNf':function(_0x10fb1a){function _0x2982d5(_0x3dc930,_0x168603,_0x7a5d03,_0x1d4bb9,_0x25801d){return _0x284e73(_0x25801d,_0x168603-0x23,_0x7a5d03-0x1d6,_0x7a5d03-0x40c,_0x25801d-0x167);}return _0x3f6554[_0x2982d5(0x3a1,0x405,0x353,0x3a0,0x30e)](_0x10fb1a);}};function _0x284e73(_0x8482c1,_0x38d51f,_0x69c982,_0x245562,_0x549bd0){return _0x50d329(_0x8482c1-0xe,_0x8482c1,_0x245562-0x104,_0x245562-0x138,_0x549bd0-0x189);}function _0x1be6d0(_0x547491,_0x367742,_0x2a9350,_0x514844,_0x31c79a){return _0x50d329(_0x547491-0x1a5,_0x31c79a,_0x514844-0x68a,_0x514844-0x123,_0x31c79a-0x18);}function _0x5cd516(_0x128ee3,_0xd1eace,_0x5b4c0e,_0x2a047b,_0x5cc73f){return _0x38af67(_0x128ee3-0x105,_0xd1eace-0x141,_0x128ee3-0x240,_0x2a047b,_0x5cc73f-0x16d);}if(_0x3f6554[_0x5cd516(-0x4a,0x26,0x27,-0x7e,0x6a)](_0x3f6554[_0x5cd516(-0xa,0x6,-0xba,-0x7a,-0x14)],_0x3f6554[_0x284e73(-0x108,-0x1b,0x4,-0x43,-0xff)]))return!![];else{if(_0x7d21de){if(_0x3f6554[_0x5cd516(0x5a,0xae,0x10f,0xc4,-0x24)](_0x3f6554[_0x284e73(0x32,-0x5a,-0x5a,0x58,0xa2)],_0x3f6554[_0x14e24d(-0x12,0xa0,-0x67,0x40,0x91)])){const _0x59fb84=eKWRYG[_0x5cd516(0x3d,-0x84,0xfa,0x31,0x10)](_0xb1b825,eKWRYG[_0x284e73(0x38,0x88,0xa5,0x3a,0x63)](eKWRYG[_0x1be6d0(0x60b,0x503,0x538,0x5c0,0x52f)](eKWRYG[_0x14e24d(0x15a,0x1a8,0x11e,0xd4,0x1b)],eKWRYG[_0x14e24d(0x20a,0x210,0x18a,0x136,0xc5)]),');'));_0xfef540=eKWRYG[_0x2fcfec(0x5eb,0x489,0x5ad,0x54d,0x53c)](_0x59fb84);}else{const _0x161925=_0x7d21de[_0x1be6d0(0x4ab,0x510,0x5ae,0x556,0x57a)](_0x25e9d4,arguments);return _0x7d21de=null,_0x161925;}}}}:function(){};return _0x27b9bb=![],_0x1c5db1;}};}}());(function(){function _0x1c89af(_0x538c4f,_0x4dd050,_0x2a16e9,_0x480744,_0x3cc2cc){return _0x53ed56(_0x538c4f-0xa8,_0x480744-0x45b,_0x2a16e9-0x2f,_0x4dd050,_0x3cc2cc-0x15e);}function _0x158656(_0x246a59,_0x84b09a,_0x4e96a4,_0x5ac44a,_0x459e6e){return _0x1c9983(_0x246a59-0x99,_0x84b09a-0x1d0,_0x4e96a4-0x76,_0x5ac44a,_0x246a59-0x14d);}function _0xa4ae9b(_0x33062c,_0xc52e6,_0x354c4a,_0x1e9231,_0x199980){return _0x66aa7(_0x33062c,_0xc52e6-0x1d,_0x199980-0x681,_0x1e9231-0x10b,_0x199980-0x16);}function _0x4ff1e7(_0x53bd35,_0x4486f7,_0x400bda,_0x25d222,_0x4e8173){return _0x53ed56(_0x53bd35-0xa0,_0x4486f7-0xf5,_0x400bda-0x1c3,_0x53bd35,_0x4e8173-0x137);}const _0x3c714b={'NxZPY':function(_0x1cdf50,_0x1375f1){function _0x548680(_0x4a92b5,_0x204d68,_0x35d863,_0x127e85,_0x4172bb){return _0x1914(_0x127e85- -0x16,_0x4a92b5);}return _0x105ee5[_0x548680(0x128,0x17b,0x174,0x13a,0x1f3)](_0x1cdf50,_0x1375f1);},'hoyWb':function(_0x2906aa,_0xe71a0){function _0x23f52a(_0x1b85a4,_0x2b1ca1,_0x43cdbb,_0x2b8611,_0x2830dc){return _0x1914(_0x2b8611- -0x362,_0x2830dc);}return _0x105ee5[_0x23f52a(-0x113,-0x16d,-0x139,-0x148,-0x1f7)](_0x2906aa,_0xe71a0);},'jlrLe':_0x105ee5[_0xa4ae9b(0x5fc,0x684,0x5e7,0x648,0x5bd)],'xlnrI':_0x105ee5[_0x4ff1e7(-0x240,-0x18c,-0x157,-0xc1,-0xe2)],'bKwAT':_0x105ee5[_0x431b56(0x362,0x349,0x37d,0x412,0x39f)],'qZfVo':function(_0x39ad9e,_0x40bd72){function _0xc060f0(_0x32bee9,_0x36e7ea,_0x19dd4e,_0x1be6cd,_0x5946d6){return _0x431b56(_0x5946d6,_0x36e7ea-0x9b,_0x19dd4e- -0xbd,_0x1be6cd-0xa0,_0x5946d6-0x16d);}return _0x105ee5[_0xc060f0(0x403,0x288,0x329,0x299,0x368)](_0x39ad9e,_0x40bd72);},'IGWnr':_0x105ee5[_0x4ff1e7(-0x12,-0xe8,-0x5f,-0x78,-0x54)],'dzohJ':_0x105ee5[_0x158656(-0x116,-0x137,-0x15c,-0x4c,-0x10c)],'HACBD':_0x105ee5[_0xa4ae9b(0x4e9,0x4c5,0x58f,0x5a1,0x4d8)],'xVAID':_0x105ee5[_0x431b56(0x277,0x35e,0x331,0x3d0,0x359)],'MtnLE':function(_0x15175d,_0x2eaf1a){function _0x40cdf4(_0x327ec9,_0x10b58e,_0x199b65,_0x43e986,_0x243134){return _0xa4ae9b(_0x10b58e,_0x10b58e-0x18c,_0x199b65-0x115,_0x43e986-0xee,_0x43e986- -0x2c5);}return _0x105ee5[_0x40cdf4(0x221,0x245,0xf1,0x180,0x1b7)](_0x15175d,_0x2eaf1a);},'vysdL':_0x105ee5[_0x4ff1e7(0x21,-0x64,-0x72,0x4a,-0xfa)],'xcLKt':function(_0x5dec5b,_0x296639){function _0x2b5a2e(_0x4c7782,_0x58aad6,_0x2825d4,_0x4b6b76,_0x57b0c9){return _0x1c89af(_0x4c7782-0x35,_0x4b6b76,_0x2825d4-0x4e,_0x58aad6- -0x48f,_0x57b0c9-0x16c);}return _0x105ee5[_0x2b5a2e(-0x36e,-0x2e6,-0x2b5,-0x2d6,-0x2c2)](_0x5dec5b,_0x296639);},'myAXH':_0x105ee5[_0x431b56(0x3d7,0x383,0x31d,0x3c2,0x341)],'fwUUE':function(_0x15f656,_0x546996){function _0xac43f8(_0x3aaf5f,_0x1d7c67,_0x28559c,_0x1dabfe,_0x25546a){return _0xa4ae9b(_0x1dabfe,_0x1d7c67-0x195,_0x28559c-0x6,_0x1dabfe-0x124,_0x28559c- -0x436);}return _0x105ee5[_0xac43f8(0x171,0x155,0x13c,0xc7,0x1d3)](_0x15f656,_0x546996);},'uNzBo':_0x105ee5[_0x4ff1e7(-0x122,-0x15e,-0x203,-0x18b,-0x176)],'gHAgS':function(_0x345b60,_0x1f7e56){function _0x51ff22(_0x1229cc,_0x2637fe,_0x12448e,_0x1abd70,_0x2330c0){return _0x4ff1e7(_0x2637fe,_0x12448e-0x583,_0x12448e-0xbb,_0x1abd70-0x7c,_0x2330c0-0xc4);}return _0x105ee5[_0x51ff22(0x373,0x411,0x3c1,0x493,0x386)](_0x345b60,_0x1f7e56);},'NaSwh':_0x105ee5[_0x158656(-0xbe,-0x25,-0x16b,-0xb3,-0x18a)],'oLaVd':function(_0x4bd253){function _0x4f3ac0(_0xd447e6,_0x1aae6a,_0x39d024,_0x441cc7,_0x590792){return _0xa4ae9b(_0xd447e6,_0x1aae6a-0xf9,_0x39d024-0x12d,_0x441cc7-0x179,_0x441cc7- -0x68f);}return _0x105ee5[_0x4f3ac0(-0x2d3,-0x251,-0x21e,-0x222,-0x22c)](_0x4bd253);}};function _0x431b56(_0x49b240,_0x503772,_0x4210ef,_0x3c4b80,_0x17e9c3){return _0x66aa7(_0x49b240,_0x503772-0x7,_0x4210ef-0x4be,_0x3c4b80-0x85,_0x17e9c3-0x1da);}if(_0x105ee5[_0x431b56(0x356,0x3fb,0x3e6,0x3c1,0x465)](_0x105ee5[_0x158656(-0xfd,-0x13a,-0xe4,-0x129,-0x2e)],_0x105ee5[_0xa4ae9b(0x4c5,0x407,0x416,0x431,0x4bc)]))_0x105ee5[_0x431b56(0x324,0x417,0x394,0x45f,0x3e8)](_0x55a234,this,function(){function _0x4353d8(_0x5bf40b,_0x26568e,_0x1e1237,_0x4acef1,_0x24d32d){return _0x158656(_0x5bf40b-0x30,_0x26568e-0x104,_0x1e1237-0x0,_0x26568e,_0x24d32d-0x8);}const _0x5ecd43={'pWtoL':function(_0x3357e2,_0x399561){function _0x33d366(_0x5638cb,_0x1426ee,_0x1160fa,_0x11cdd3,_0x246438){return _0x1914(_0x1160fa- -0x3d7,_0x11cdd3);}return _0x3c714b[_0x33d366(-0x3c3,-0x2c6,-0x345,-0x2d2,-0x27a)](_0x3357e2,_0x399561);},'yfyIQ':function(_0x3a91fa,_0x4057e5){function _0x4e4d02(_0x3fb6bb,_0x132c7b,_0x11677f,_0x3907dc,_0x28c15d){return _0x1914(_0x132c7b-0x2f0,_0x3907dc);}return _0x3c714b[_0x4e4d02(0x499,0x512,0x513,0x489,0x57b)](_0x3a91fa,_0x4057e5);},'oJYvF':_0x3c714b[_0xc62f54(-0xdc,0x1d,-0x22,-0x51,0x47)],'kmwTi':_0x3c714b[_0xc62f54(0x4f,0x98,0x5c,0x120,0x15b)],'abkAb':_0x3c714b[_0xc62f54(-0x87,-0x8e,-0x1e,-0x28,-0x34)]};function _0x4f229d(_0x5a2985,_0x58a89b,_0x350aef,_0x2ee6c4,_0x34b125){return _0x158656(_0x5a2985-0x28b,_0x58a89b-0x133,_0x350aef-0xa4,_0x2ee6c4,_0x34b125-0x161);}function _0x395b4d(_0x133c7f,_0x3a0a9a,_0x435e9d,_0x31ef5e,_0x1916ec){return _0x431b56(_0x435e9d,_0x3a0a9a-0xda,_0x31ef5e- -0xb7,_0x31ef5e-0x9a,_0x1916ec-0xcb);}function _0x41a39d(_0x571bf5,_0x5572f5,_0x3fbde4,_0x445103,_0x50412d){return _0x158656(_0x3fbde4- -0x118,_0x5572f5-0xa4,_0x3fbde4-0xe9,_0x5572f5,_0x50412d-0x1ea);}function _0xc62f54(_0x50fc14,_0x969ae3,_0x3cd349,_0xe95580,_0x224fa7){return _0x158656(_0xe95580-0x113,_0x969ae3-0x10a,_0x3cd349-0x1d1,_0x969ae3,_0x224fa7-0x1d3);}if(_0x3c714b[_0xc62f54(0x162,0x19e,0x172,0x130,0xea)](_0x3c714b[_0x4353d8(-0xe9,-0xb3,-0xc4,-0x44,-0x8a)],_0x3c714b[_0x41a39d(-0x18c,-0x2d8,-0x231,-0x2ed,-0x163)])){const _0x6bf344=new RegExp(_0x3c714b[_0x395b4d(0x2b1,0x24f,0x1b7,0x290,0x26f)]),_0x2d1c72=new RegExp(_0x3c714b[_0x395b4d(0x360,0x2ca,0x34f,0x2ae,0x2ac)],'i'),_0x62c501=_0x3c714b[_0x4353d8(-0x12a,-0x101,-0x9e,-0x7a,-0x114)](_0x14e92b,_0x3c714b[_0x395b4d(0x25d,0x3c1,0x315,0x331,0x3c8)]);!_0x6bf344[_0x395b4d(0x2d0,0x338,0x266,0x27c,0x1df)](_0x3c714b[_0x395b4d(0x25a,0x35f,0x33c,0x285,0x2a4)](_0x62c501,_0x3c714b[_0x4f229d(0x282,0x274,0x289,0x303,0x30d)]))||!_0x2d1c72[_0x395b4d(0x30e,0x273,0x261,0x27c,0x2d2)](_0x3c714b[_0x41a39d(-0x1b3,-0x207,-0x184,-0xac,-0xbe)](_0x62c501,_0x3c714b[_0x395b4d(0x250,0x163,0x1b9,0x1f2,0x1e3)]))?_0x3c714b[_0x395b4d(0x2d0,0x306,0x259,0x230,0x211)](_0x3c714b[_0x4f229d(0x24f,0x263,0x248,0x202,0x307)],_0x3c714b[_0x395b4d(0x2fb,0x2c5,0x33d,0x303,0x268)])?_0x571a89=_0x45344d:_0x3c714b[_0x4f229d(0x11c,0x1ce,0x1dc,0x1ec,0x1dd)](_0x62c501,'0'):_0x3c714b[_0x4353d8(0x4d,-0x50,0xd3,-0x3,-0x42)](_0x3c714b[_0x41a39d(-0x51,-0x48,-0xef,-0x6c,-0x15c)],_0x3c714b[_0x395b4d(0x3f9,0x39a,0x413,0x368,0x438)])?_0x3c714b[_0x395b4d(0x213,0x2fb,0x30e,0x24c,0x236)](_0x14e92b):mgspiL[_0x395b4d(0x2f4,0x3cc,0x279,0x32e,0x2f6)](_0x2aabe5,'0');}else(function(){return!![];}[_0xc62f54(0x4b,0x153,0x31,0xc2,0x46)+_0x395b4d(0x386,0x23c,0x2e9,0x2b1,0x203)+'r'](mgspiL[_0x41a39d(-0x1b3,-0x205,-0x168,-0x1fc,-0x233)](mgspiL[_0x41a39d(-0x1a9,-0x12a,-0x181,-0x1fe,-0xa8)],mgspiL[_0x4353d8(-0xb,-0x4d,0x86,-0x2a,-0x9a)]))[_0x395b4d(0x37f,0x237,0x2af,0x2fe,0x33a)](mgspiL[_0x41a39d(-0x295,-0x2bf,-0x258,-0x1c4,-0x2f9)]));})();else{if(_0x2f571f){const _0x4db9d5=_0x3cbd2f[_0xa4ae9b(0x5c2,0x638,0x564,0x48e,0x564)](_0x6c5f10,arguments);return _0x385f8f=null,_0x4db9d5;}}}());function _0x1c9983(_0x306a50,_0x3472bd,_0x3b2bc0,_0x4dd60a,_0x52d887){return _0x1914(_0x52d887- -0x339,_0x4dd60a);}const _0x11eee7=(function(){function _0x2dd65f(_0x42406e,_0xa1e3db,_0xf25009,_0x4d9886,_0x1fe843){return _0x4318ed(_0xf25009- -0xcc,_0xa1e3db-0x163,_0xf25009-0x17a,_0xa1e3db,_0x1fe843-0xeb);}const _0x2f8f22={'prsVn':function(_0x132b15,_0x53c508){function _0xb8056b(_0x44105d,_0x13e50b,_0x1e5d1a,_0x30b3db,_0x53469a){return _0x1914(_0x1e5d1a-0x14a,_0x44105d);}return _0x105ee5[_0xb8056b(0x355,0x25e,0x331,0x2a4,0x2d0)](_0x132b15,_0x53c508);},'YKwGX':function(_0x4d9743,_0x51aff8){function _0x55f420(_0x1d5f68,_0x4462a9,_0x57113b,_0x3b453e,_0x2247dd){return _0x1914(_0x2247dd- -0x353,_0x1d5f68);}return _0x105ee5[_0x55f420(-0xf6,-0x147,-0x17b,-0x26b,-0x1b9)](_0x4d9743,_0x51aff8);},'FmMiJ':_0x105ee5[_0xa305c3(0x139,0x65,0x117,0x64,0xd1)],'wnQrL':function(_0x1270fe,_0x280e57){function _0x14291a(_0x5376aa,_0x308c76,_0x2a1c6f,_0xd3665b,_0x28fb4a){return _0xa305c3(_0xd3665b-0x1ba,_0x308c76-0x100,_0x2a1c6f-0x68,_0xd3665b-0x1b8,_0x28fb4a);}return _0x105ee5[_0x14291a(0x384,0x3cb,0x2cd,0x309,0x2f6)](_0x1270fe,_0x280e57);},'mqNRC':_0x105ee5[_0xa305c3(0x121,0x13a,0x17b,0xf0,0x15d)],'YWXxX':function(_0x50c700,_0x4280e4){function _0x3c3c68(_0x45c3b5,_0x32be06,_0x351b62,_0x50ef2f,_0x5ee916){return _0x55ec32(_0x5ee916,_0x50ef2f-0x144,_0x351b62-0x16f,_0x50ef2f-0x1ef,_0x5ee916-0x1e7);}return _0x105ee5[_0x3c3c68(-0x102,-0x9d,-0x6b,-0xf8,-0xaa)](_0x50c700,_0x4280e4);},'eLnSp':_0x105ee5[_0xa305c3(0x68,0x100,0xdd,0xc2,0x133)],'gIcvU':_0x105ee5[_0x55ec32(-0x2ac,-0x1ed,-0x242,-0x1d2,-0x162)]};function _0x55ec32(_0x2f293e,_0x3c1d75,_0x201416,_0x303ad3,_0x518e43){return _0x1c9983(_0x2f293e-0xa4,_0x3c1d75-0x4d,_0x201416-0x130,_0x2f293e,_0x3c1d75- -0x89);}function _0x3b35b5(_0x381f73,_0x9b3def,_0xfe1a60,_0x27085d,_0x5935ea){return _0x4318ed(_0x5935ea-0x30c,_0x9b3def-0x103,_0xfe1a60-0x18a,_0x381f73,_0x5935ea-0x2);}function _0x3d97b0(_0x1f2671,_0x4e937a,_0x57ce04,_0xa85dfd,_0x1fe1d4){return _0x53ed56(_0x1f2671-0xb6,_0x1fe1d4-0x48d,_0x57ce04-0x89,_0xa85dfd,_0x1fe1d4-0x12e);}function _0xa305c3(_0x26f6b3,_0xd0bc61,_0x271bdb,_0x4ccb0c,_0x8fac60){return _0x66aa7(_0x8fac60,_0xd0bc61-0xe3,_0x26f6b3-0x25e,_0x4ccb0c-0x1e4,_0x8fac60-0x61);}if(_0x105ee5[_0xa305c3(0x14f,0x114,0x1a4,0x1f3,0xf2)](_0x105ee5[_0xa305c3(0x148,0x1c7,0x136,0x1bf,0xad)],_0x105ee5[_0xa305c3(0x143,0x17d,0x12a,0x79,0x219)])){let _0x31a0fe=!![];return function(_0x9d74f0,_0x4d765d){function _0x47c8a1(_0xc7382,_0x269fa1,_0x3570cb,_0x2d00b6,_0x1f92ed){return _0xa305c3(_0x269fa1- -0xb7,_0x269fa1-0x13d,_0x3570cb-0x158,_0x2d00b6-0x166,_0x3570cb);}const _0x249457={'zQyOy':function(_0x1e6f4c,_0x2586c0){function _0x4fd3b1(_0x1daee1,_0x3a9c30,_0x261c3f,_0xca699d,_0x52d831){return _0x1914(_0x3a9c30- -0x227,_0x1daee1);}return _0x2f8f22[_0x4fd3b1(-0x121,-0x8f,-0x4c,-0x3c,-0x140)](_0x1e6f4c,_0x2586c0);},'TwwiN':function(_0xb0baea,_0x52af0e){function _0x2940ce(_0x202b4b,_0x204789,_0xc6da28,_0x3bd80e,_0x15ca8d){return _0x1914(_0x3bd80e-0x34b,_0x204789);}return _0x2f8f22[_0x2940ce(0x434,0x3d7,0x3bb,0x413,0x49f)](_0xb0baea,_0x52af0e);},'bsWHI':_0x2f8f22[_0x500b4b(0x264,0x130,0x280,0x1e0,0x1a1)],'xPxNE':function(_0x41f68a,_0x248b7d){function _0x544849(_0x92c5ce,_0x5bc53b,_0xbbe642,_0x10f052,_0x44f757){return _0x500b4b(_0x44f757,_0x5bc53b-0x11,_0xbbe642-0x1c1,_0x92c5ce-0x8,_0x44f757-0x17b);}return _0x2f8f22[_0x544849(0xaf,0xdc,0x81,-0x2b,0xbf)](_0x41f68a,_0x248b7d);},'NkYoc':_0x2f8f22[_0x30f365(0x161,0x14b,0x1f2,0x149,0x211)]};function _0xfc50b(_0x3051a9,_0x575c68,_0x539e33,_0x931aa4,_0x5724ca){return _0x3b35b5(_0x3051a9,_0x575c68-0x1d1,_0x539e33-0x10e,_0x931aa4-0xc2,_0x575c68- -0x143);}function _0x500b4b(_0x5788a2,_0x7fa8b,_0x4694ca,_0x55db31,_0x44504b){return _0x2dd65f(_0x5788a2-0x1ee,_0x5788a2,_0x55db31-0x1ab,_0x55db31-0x1b6,_0x44504b-0x75);}function _0x30f365(_0x406ee5,_0xef7fd4,_0x2a8246,_0x109dd1,_0x3ec1e5){return _0x3d97b0(_0x406ee5-0x59,_0xef7fd4-0x54,_0x2a8246-0x1c,_0xef7fd4,_0x3ec1e5-0x30);}function _0x52bd3(_0x58fbdd,_0x1ba078,_0x1e93e7,_0x40ac3b,_0xa4ede8){return _0xa305c3(_0xa4ede8-0xaa,_0x1ba078-0x86,_0x1e93e7-0x1b9,_0x40ac3b-0x112,_0x58fbdd);}if(_0x2f8f22[_0x500b4b(0x5e,0x165,0xc2,0xaa,0x93)](_0x2f8f22[_0x30f365(0x228,0x248,0x343,0x29d,0x2f7)],_0x2f8f22[_0x500b4b(0x198,0x1f9,0x249,0x171,0x13a)])){const _0x3d39cc=_0x13404b?function(){function _0x1cc8a3(_0x45b83e,_0x35e1b0,_0x2278e0,_0x2fa3a2,_0x1acef8){return _0x52bd3(_0x2278e0,_0x35e1b0-0x1ba,_0x2278e0-0xdc,_0x2fa3a2-0x13,_0x35e1b0- -0x126);}if(_0x1a2438){const _0x456a99=_0x5c50cf[_0x1cc8a3(0x10a,0xc5,0x4b,0x79,0x30)](_0x14f8f9,arguments);return _0x516c24=null,_0x456a99;}}:function(){};return _0xc3d91b=![],_0x3d39cc;}else{const _0x18fde3=_0x31a0fe?function(){function _0x23d2dd(_0x4f4b10,_0x17c067,_0x37fb11,_0x75eaaa,_0x1180fb){return _0x30f365(_0x4f4b10-0x5a,_0x17c067,_0x37fb11-0xdd,_0x75eaaa-0xba,_0x1180fb- -0x76);}function _0x135232(_0x1c7e7f,_0x176bc9,_0x3e1b72,_0x22af61,_0x2c76eb){return _0xfc50b(_0x1c7e7f,_0x176bc9-0x2b1,_0x3e1b72-0x1cf,_0x22af61-0x1a4,_0x2c76eb-0x1b);}const _0x2e98a9={'QKata':function(_0x423ca8,_0x1134ea){function _0x68fce5(_0x25f922,_0x53b2d0,_0x40461a,_0x511349,_0x11148c){return _0x1914(_0x40461a-0x2d8,_0x11148c);}return _0x249457[_0x68fce5(0x448,0x383,0x42c,0x394,0x3e5)](_0x423ca8,_0x1134ea);}};function _0xd630e1(_0x3b8f4e,_0x3ae36b,_0x5d8116,_0xa6722c,_0x42f5c5){return _0xfc50b(_0x5d8116,_0x3ae36b- -0x3b8,_0x5d8116-0x15f,_0xa6722c-0x35,_0x42f5c5-0xd3);}function _0x2166a9(_0x5f03d6,_0x5e20e1,_0x23bff5,_0x2180f9,_0x186d45){return _0x47c8a1(_0x5f03d6-0x1f0,_0x5f03d6-0x10,_0x186d45,_0x2180f9-0x6f,_0x186d45-0x5c);}function _0x4dc37a(_0x1d8908,_0xcf0037,_0x183acc,_0x29be0d,_0x3ca0f1){return _0x47c8a1(_0x1d8908-0xa7,_0xcf0037- -0x41,_0x183acc,_0x29be0d-0x91,_0x3ca0f1-0x173);}if(_0x249457[_0x135232(0x442,0x45b,0x44d,0x50d,0x382)](_0x249457[_0x135232(0x44a,0x44c,0x3f4,0x51f,0x3d8)],_0x249457[_0x23d2dd(0x11e,0x1de,0x29e,0x124,0x1d7)])){if(_0x4d765d){if(_0x249457[_0x4dc37a(-0xf0,-0x82,0x37,0x33,-0x14)](_0x249457[_0x135232(0x501,0x57d,0x62d,0x509,0x563)],_0x249457[_0x23d2dd(0x352,0x256,0x37d,0x338,0x308)])){if(_0x48f7c2){const _0x25b14e=_0x4b8e0d[_0x23d2dd(0x372,0x372,0x309,0x34e,0x2b4)](_0x364200,arguments);return _0x5dc12c=null,_0x25b14e;}}else{const _0x48a579=_0x4d765d[_0xd630e1(-0x128,-0x140,-0x90,-0x114,-0x15a)](_0x9d74f0,arguments);return _0x4d765d=null,_0x48a579;}}}else VlEATJ[_0x4dc37a(0x16b,0xa3,0xb,0x6b,0x115)](_0x5d2292,0x458+0x172+-0x13*0x4e);}:function(){};return _0x31a0fe=![],_0x18fde3;}};}else return _0x39279b[_0x2dd65f(0x5b,-0xcd,0x6,0x8c,-0x87)+_0x2dd65f(0x3f,-0x7d,-0x97,0x11,-0xfa)]()[_0x3d97b0(0x344,0x322,0x29b,0x3e6,0x36f)+'h'](xxsbIQ[_0x3d97b0(0x2eb,0x2c2,0x3d4,0x359,0x339)])[_0x2dd65f(-0xa4,0xc0,0x6,0x6,-0x1d)+_0x55ec32(-0x352,-0x2a5,-0x265,-0x1cd,-0x215)]()[_0x2dd65f(-0x94,0x9e,-0x19,-0xed,0xa3)+_0xa305c3(0x108,0x9b,0x1d0,0xc8,0x1a8)+'r'](_0x2ab178)[_0x2dd65f(0x3b,0xe,0x58,0xd5,0x71)+'h'](xxsbIQ[_0x2dd65f(0x17,0x19,0x22,-0x9,0xef)]);}()),_0x4c5896=_0x105ee5[_0x4318ed(0xd4,0xc0,0x111,0x19e,0x15e)](_0x11eee7,this,function(){const _0x3fcf37={'wNGxS':function(_0x3b54be,_0xd8e55e){function _0x164225(_0x50de49,_0x51087c,_0x5295f2,_0x1b69f3,_0xb3fde9){return _0x1914(_0x51087c- -0x1d0,_0x50de49);}return _0x105ee5[_0x164225(0x51,0x4a,0xe5,-0x26,-0x49)](_0x3b54be,_0xd8e55e);},'XIWMy':_0x105ee5[_0x152c60(0x503,0x5f4,0x588,0x4ae,0x567)],'upwdx':_0x105ee5[_0x147be3(0x303,0x33e,0x2fe,0x38d,0x30c)],'HFAzD':_0x105ee5[_0x26512a(0xb8,0x10f,0x187,0x198,0x152)]};function _0x152c60(_0x42a835,_0x1de520,_0x37fea9,_0x16b8e5,_0x553996){return _0x4318ed(_0x553996-0x45f,_0x1de520-0xf5,_0x37fea9-0x148,_0x1de520,_0x553996-0x14e);}function _0x3973b0(_0x7d7639,_0x30f9a1,_0x3960b2,_0xe5641a,_0x372b61){return _0x4318ed(_0x372b61- -0x2fe,_0x30f9a1-0x57,_0x3960b2-0x191,_0x30f9a1,_0x372b61-0x1da);}function _0x147be3(_0x41aa40,_0x58fd1d,_0x588a6f,_0x1a3ac2,_0x22926f){return _0x1c9983(_0x41aa40-0xc6,_0x58fd1d-0x7e,_0x588a6f-0x18e,_0x58fd1d,_0x1a3ac2-0x61d);}function _0x26512a(_0x2edba6,_0x507f7a,_0x1fda9e,_0x33aaa8,_0x45a8ca){return _0x4318ed(_0x45a8ca-0x6c,_0x507f7a-0x3c,_0x1fda9e-0x8d,_0x33aaa8,_0x45a8ca-0x73);}function _0x374372(_0x403db8,_0x3a580f,_0x58ccdf,_0x4c2a78,_0x2e158b){return _0x5dea41(_0x403db8-0x14d,_0x403db8-0x80,_0x58ccdf-0xcd,_0x3a580f,_0x2e158b-0xd7);}if(_0x105ee5[_0x26512a(0x13f,0x1f8,0x101,0x194,0x129)](_0x105ee5[_0x374372(0x438,0x4c7,0x478,0x3f8,0x47d)],_0x105ee5[_0x152c60(0x4f8,0x54d,0x5f3,0x579,0x55c)]))return![];else{let _0x2b0d68;try{if(_0x105ee5[_0x152c60(0x490,0x473,0x582,0x5a5,0x51c)](_0x105ee5[_0x3973b0(-0x1ca,-0x263,-0x1b1,-0x127,-0x1e0)],_0x105ee5[_0x26512a(-0x6a,0x6b,0x35,-0x81,0x52)])){const _0x24f3fe=_0x105ee5[_0x3973b0(-0x327,-0x2c7,-0x2da,-0x216,-0x2e9)](Function,_0x105ee5[_0x3973b0(-0x256,-0x193,-0x269,-0x1e5,-0x1cc)](_0x105ee5[_0x374372(0x3bf,0x490,0x421,0x37d,0x378)](_0x105ee5[_0x374372(0x338,0x312,0x3a7,0x3f0,0x2e4)],_0x105ee5[_0x374372(0x389,0x365,0x302,0x2c4,0x3d9)]),');'));_0x2b0d68=_0x105ee5[_0x374372(0x393,0x3ba,0x459,0x2da,0x35b)](_0x24f3fe);}else(function(){return![];}[_0x26512a(0x1c8,0x171,0x15b,0x115,0x11f)+_0x374372(0x3b1,0x46d,0x3bf,0x39f,0x3a5)+'r'](tImAxS[_0x152c60(0x40a,0x3f9,0x450,0x4f8,0x456)](tImAxS[_0x26512a(-0x13,0x12,0xed,0xd1,0x15)],tImAxS[_0x152c60(0x382,0x32e,0x3aa,0x368,0x406)]))[_0x152c60(0x588,0x461,0x522,0x52a,0x50e)](tImAxS[_0x147be3(0x504,0x4eb,0x46b,0x4bb,0x4da)]));}catch(_0x5b07a5){if(_0x105ee5[_0x26512a(0x82,0x4a,0x39,0x1a6,0xdc)](_0x105ee5[_0x374372(0x33c,0x3ba,0x2ab,0x37d,0x3f2)],_0x105ee5[_0x26512a(0x16c,0x163,0x9,0x68,0xa5)]))return function(_0x54cc04){}[_0x147be3(0x417,0x429,0x3d2,0x47f,0x3ae)+_0x374372(0x3b1,0x314,0x416,0x44a,0x314)+'r'](xxsbIQ[_0x26512a(0x195,0xbe,0xf5,0xed,0x133)])[_0x374372(0x3ea,0x3db,0x398,0x321,0x31f)](xxsbIQ[_0x152c60(0x532,0x420,0x461,0x4a2,0x462)]);else _0x2b0d68=window;}const _0x32bbf7=_0x2b0d68[_0x152c60(0x4d1,0x45c,0x5ae,0x5be,0x4ed)+'le']=_0x2b0d68[_0x26512a(0x31,0x148,0x167,0xf1,0xfa)+'le']||{},_0x5b8373=[_0x105ee5[_0x3973b0(-0x1f5,-0x1b7,-0x2dc,-0x309,-0x230)],_0x105ee5[_0x374372(0x31d,0x2a6,0x290,0x25b,0x364)],_0x105ee5[_0x152c60(0x5e2,0x610,0x633,0x627,0x576)],_0x105ee5[_0x374372(0x423,0x3c3,0x382,0x371,0x3ff)],_0x105ee5[_0x26512a(-0x34,-0x4,0x116,-0x15,0x64)],_0x105ee5[_0x147be3(0x3cb,0x495,0x42a,0x426,0x3bc)],_0x105ee5[_0x152c60(0x4a3,0x52f,0x53a,0x43a,0x4eb)]];for(let _0x1f263f=0x1*-0x22d+0x19d8+-0x17ab;_0x105ee5[_0x152c60(0x394,0x44b,0x4c2,0x446,0x41a)](_0x1f263f,_0x5b8373[_0x147be3(0x36a,0x3e5,0x451,0x3f5,0x478)+'h']);_0x1f263f++){if(_0x105ee5[_0x374372(0x3d9,0x451,0x361,0x482,0x3d8)](_0x105ee5[_0x152c60(0x3aa,0x442,0x393,0x495,0x449)],_0x105ee5[_0x147be3(0x312,0x3a7,0x312,0x3c8,0x380)])){if(_0xe2c2df)return _0x3215ad;else xxsbIQ[_0x3973b0(-0x351,-0x350,-0x24c,-0x305,-0x2e9)](_0x2da021,0x1*0x1051+0x1*-0x15d+-0xef4);}else{const _0x3a25ad=_0x11eee7[_0x147be3(0x4f6,0x54e,0x524,0x47f,0x3ea)+_0x26512a(0xe5,0x126,0xcb,0x30,0xe2)+'r'][_0x26512a(0x11f,0xc4,0x223,0x10e,0x17f)+_0x374372(0x375,0x2b2,0x318,0x393,0x3fa)][_0x3973b0(-0x2a0,-0x274,-0x23e,-0x261,-0x1e8)](_0x11eee7),_0x4a6134=_0x5b8373[_0x1f263f],_0x377561=_0x32bbf7[_0x4a6134]||_0x3a25ad;_0x3a25ad[_0x374372(0x33b,0x319,0x3c8,0x406,0x3ed)+_0x147be3(0x3d4,0x511,0x421,0x469,0x4bb)]=_0x11eee7[_0x152c60(0x60e,0x5ab,0x542,0x5fb,0x575)](_0x11eee7),_0x3a25ad[_0x3973b0(-0x209,-0x184,-0x2ba,-0x287,-0x22c)+_0x152c60(0x465,0x48c,0x515,0x53b,0x494)]=_0x377561[_0x374372(0x40d,0x391,0x46f,0x3cd,0x3e4)+_0x374372(0x370,0x3eb,0x2db,0x329,0x2d6)][_0x152c60(0x5e6,0x4cc,0x4d8,0x5b7,0x575)](_0x377561),_0x32bbf7[_0x4a6134]=_0x3a25ad;}}}});_0x105ee5[_0x53ed56(-0x18e,-0x1c4,-0x1d1,-0x20d,-0x255)](_0x4c5896),_0x105ee5[_0x1c9983(-0x2c3,-0x19e,-0x25b,-0x17c,-0x22f)](fetch,window[_0x66aa7(-0x114,-0x95,-0x98,-0xd7,-0x104)+_0x1c9983(-0x2a7,-0x20c,-0x201,-0x167,-0x1ce)][_0x5dea41(0x393,0x379,0x2ac,0x2fe,0x372)+'n'])[_0x4318ed(0x45,0x44,0x11d,0x80,-0x13)](_0x3b2093=>_0x3b2093[_0x66aa7(-0x1e5,-0x207,-0x196,-0x228,-0x26a)]())[_0x1c9983(-0x2a5,-0x288,-0x1be,-0x292,-0x20c)](_0x574164=>{function _0x225738(_0x202efc,_0x2d3b49,_0x4e8395,_0x429735,_0x3e36ff){return _0x5dea41(_0x202efc-0x9e,_0x202efc- -0x462,_0x4e8395-0xbb,_0x3e36ff,_0x3e36ff-0x15f);}const _0x25075a={'MqZHT':_0x105ee5[_0x4dc27b(-0x10b,-0x161,-0x285,-0x239,-0x1af)],'xCkSR':_0x105ee5[_0x4dc27b(-0xc9,-0x19a,-0x150,-0x116,-0x17a)],'DPotS':function(_0x4b7ab8,_0x742328){function _0x4720a5(_0x5d5ff1,_0x42eb1f,_0x4adb32,_0x40737d,_0x5e6fc4){return _0x47035e(_0x5d5ff1-0xb3,_0x42eb1f-0x2d,_0x4adb32-0x77,_0x4adb32,_0x5e6fc4- -0x2b);}return _0x105ee5[_0x4720a5(0x227,0x1ed,0x11b,0x24b,0x1d8)](_0x4b7ab8,_0x742328);},'mZRKb':_0x105ee5[_0x47035e(0x2a7,0x2b8,0x26b,0x2a2,0x25d)],'jpOmi':function(_0x44b695,_0x23afd1){function _0xb67638(_0x126f58,_0x4f57bd,_0x573690,_0x41a1ba,_0x380331){return _0x225738(_0x41a1ba-0x674,_0x4f57bd-0xea,_0x573690-0xa8,_0x41a1ba-0x130,_0x380331);}return _0x105ee5[_0xb67638(0x39e,0x3b2,0x485,0x45d,0x4a0)](_0x44b695,_0x23afd1);},'NCSwk':_0x105ee5[_0x47035e(0x35e,0x34b,0x2e6,0x391,0x307)],'xEKpz':_0x105ee5[_0x3691cc(-0xe6,-0x8d,-0x18a,-0x108,-0x15a)],'urJrW':function(_0x2c03e4,_0x41576a){function _0x23eaa0(_0x544e24,_0x1e830a,_0x2d2cd9,_0x4d953e,_0x29aac2){return _0x225738(_0x2d2cd9-0x4a9,_0x1e830a-0x41,_0x2d2cd9-0xec,_0x4d953e-0xe3,_0x29aac2);}return _0x105ee5[_0x23eaa0(0x3e8,0x2f6,0x36a,0x3c0,0x358)](_0x2c03e4,_0x41576a);},'mkSEr':function(_0x20061f){function _0x16e110(_0x5b750b,_0x5d52e9,_0x209b53,_0x1bc2c3,_0x54fb42){return _0x47035e(_0x5b750b-0x1d7,_0x5d52e9-0x172,_0x209b53-0x23,_0x5b750b,_0x209b53- -0x57);}return _0x105ee5[_0x16e110(0x16d,0x308,0x239,0x2b1,0x1e0)](_0x20061f);}};function _0x3691cc(_0x5dddb9,_0x2c743a,_0x5139d5,_0xe7050,_0xec73e9){return _0x4318ed(_0xec73e9- -0x185,_0x2c743a-0x29,_0x5139d5-0xf,_0x5139d5,_0xec73e9-0xcb);}function _0x4dc27b(_0x49ff19,_0x5c2338,_0x33395b,_0x5e3878,_0x5872da){return _0x5dea41(_0x49ff19-0x152,_0x5872da- -0x458,_0x33395b-0xa5,_0x5e3878,_0x5872da-0xee);}function _0x47035e(_0x22e7db,_0x82f6e7,_0x79444f,_0x5704c2,_0xdb34ba){return _0x66aa7(_0x5704c2,_0x82f6e7-0x93,_0xdb34ba-0x3ea,_0x5704c2-0x1b6,_0xdb34ba-0x25);}function _0x2e6dd2(_0x3415d9,_0x3e3f79,_0x428f2b,_0x243f2d,_0x28ec3a){return _0x1c9983(_0x3415d9-0x1cb,_0x3e3f79-0xc8,_0x428f2b-0x55,_0x28ec3a,_0x428f2b-0x6c6);}if(_0x105ee5[_0x4dc27b(-0xb5,-0x167,-0x5b,-0x16a,-0xe0)](_0x105ee5[_0x4dc27b(-0xe0,-0x110,-0xfa,-0x112,-0x18e)],_0x105ee5[_0x4dc27b(-0x14a,-0xd2,-0xa2,-0x21,-0xd2)])){const _0x5e014f=new DOMParser(),_0x25f594=_0x5e014f[_0x2e6dd2(0x509,0x52c,0x591,0x570,0x4f6)+_0x225738(-0x12a,-0x142,-0x177,-0x1bc,-0x1c0)+_0x4dc27b(-0x2,-0xea,0x16,-0x18f,-0xc3)](_0x574164,_0x105ee5[_0x47035e(0x373,0x32e,0x3fb,0x32d,0x339)]),_0xb4f3fe=_0x25f594[_0x225738(-0x71,-0x4d,-0xd4,0x2d,-0xe1)+_0x4dc27b(-0xd4,-0xc9,-0x1e2,-0xc2,-0x126)+_0x2e6dd2(0x553,0x438,0x4d8,0x50d,0x4bc)](_0x105ee5[_0x47035e(0x396,0x317,0x26e,0x3cf,0x320)])?.[_0x47035e(0x29f,0x338,0x399,0x3dd,0x347)+_0x2e6dd2(0x561,0x528,0x50e,0x442,0x594)+'t'][_0x4dc27b(-0xba,0x2b,-0x82,0x1,-0xa1)+_0x47035e(0x28e,0x2b3,0x24c,0x159,0x1ef)+'e']()[_0x3691cc(-0x6e,-0x8c,-0x1d,-0xbe,-0xdd)+_0x3691cc(-0xb5,-0x19e,-0xdf,-0xc4,-0x10b)]('\x20','');_0xb4f3fe&&_0xb4f3fe[_0x47035e(0x2f7,0x2f7,0x2ca,0x30b,0x25c)+_0x3691cc(-0x82,-0x86,-0x3c,-0x1cd,-0x10a)](_0x105ee5[_0x2e6dd2(0x497,0x41c,0x47b,0x40d,0x402)])&&(_0x105ee5[_0x47035e(0x255,0x31a,0x376,0x208,0x2db)](_0x105ee5[_0x4dc27b(-0x228,-0x27b,-0x23b,-0x214,-0x1d0)],_0x105ee5[_0x4dc27b(-0x84,-0xcc,-0x41,-0xf2,-0xbe)])?document[_0x2e6dd2(0x4e0,0x5b0,0x4f5,0x532,0x4d2)+_0x3691cc(-0x121,-0x20d,-0x175,-0x1b9,-0x165)+_0x225738(-0x1c9,-0x245,-0x192,-0x228,-0x124)][_0x3691cc(-0xed,-0xfc,-0x1eb,-0x174,-0x1c5)+_0x4dc27b(-0xa1,-0x21a,-0x242,-0x1ae,-0x175)]='':xxsbIQ[_0x4dc27b(-0x152,0x1a,-0xef,-0x114,-0x8d)](_0x227a18));}else{const _0x5aa025=new _0x258127(GGVLEI[_0x3691cc(-0x191,-0x52,-0xaf,-0x194,-0x11c)]),_0x497667=new _0xc02ede(GGVLEI[_0x4dc27b(-0xed,0x21,-0x58,-0xb6,-0xa8)],'i'),_0x5b6411=GGVLEI[_0x4dc27b(-0x1dd,-0x131,-0x14d,-0xd0,-0x198)](_0x42d90a,GGVLEI[_0x225738(-0xef,-0x112,-0xb1,-0x1b7,-0x190)]);!_0x5aa025[_0x2e6dd2(0x471,0x3fd,0x4b6,0x4ce,0x52c)](GGVLEI[_0x2e6dd2(0x3c3,0x4b9,0x462,0x40d,0x512)](_0x5b6411,GGVLEI[_0x4dc27b(-0x1e7,-0x210,-0x211,-0x122,-0x1c0)]))||!_0x497667[_0x4dc27b(-0x1df,-0x8c,-0x1d4,-0x108,-0x15c)](GGVLEI[_0x2e6dd2(0x4d9,0x3b2,0x462,0x4e1,0x517)](_0x5b6411,GGVLEI[_0x225738(-0x176,-0xc0,-0x152,-0x11c,-0x223)]))?GGVLEI[_0x225738(-0xbb,-0xcd,-0x1e,-0x10f,-0x18c)](_0x5b6411,'0'):GGVLEI[_0x225738(-0x6c,-0xc5,-0x12d,0x20,-0x15)](_0x41ee1f);}})[_0x5dea41(0x39b,0x2d9,0x399,0x214,0x349)](_0x54e194=>{});}()),(function(){function _0x35aa25(_0x1af352,_0x3c9fa6,_0x50832c,_0xbe0cd6,_0x2ce045){return _0x1914(_0x50832c-0x250,_0x3c9fa6);}function _0x462977(_0x34aea3,_0x2b0214,_0x3f8121,_0x2fb110,_0x53c28a){return _0x1914(_0x3f8121-0x16f,_0x2fb110);}function _0x10c218(_0x42d7a3,_0x367bf9,_0x56bf33,_0x7ecf75,_0x1248e3){return _0x1914(_0x56bf33-0x1b6,_0x7ecf75);}const _0x26931d={'yVvHa':function(_0x44ee34,_0x38735a){return _0x44ee34!==_0x38735a;},'NUuAJ':_0x5ba9ac(0x12b,0x9c,0x23,0x40,-0x30),'XfdcC':function(_0x4756a7,_0x2826d4){return _0x4756a7(_0x2826d4);},'NdMwz':function(_0x5cd845,_0x30b708){return _0x5cd845+_0x30b708;},'BqaoF':function(_0x5ab2f4,_0x4c034e){return _0x5ab2f4+_0x4c034e;},'YAQgL':_0x462977(0x267,0x320,0x26d,0x2ee,0x24b)+_0x462977(0x3d7,0x299,0x332,0x2f8,0x3aa)+_0x462977(0x21f,0x2f9,0x23e,0x28a,0x287)+_0x10c218(0x30d,0x2c7,0x33f,0x3b6,0x3b0),'vwNuT':_0x35aa25(0x360,0x3aa,0x313,0x260,0x38e)+_0x10c218(0x1cf,0x2bc,0x263,0x27a,0x2bb)+_0x5ba9ac(0xd7,0x68,-0x38,0x12c,0x40)+_0x462977(0x20b,0x12b,0x1e6,0x26e,0x270)+_0x462977(0x2af,0x218,0x2e8,0x392,0x386)+_0x35aa25(0x467,0x441,0x475,0x53f,0x3b4)+'\x20)','EBtOG':function(_0x4498f5){return _0x4498f5();},'nKINC':function(_0x21dd83,_0x597ef7){return _0x21dd83===_0x597ef7;},'grTIE':_0x1af93d(-0x5b,-0xfb,-0x1af,-0x11f,-0x1da),'FaCdN':_0x462977(0x2b4,0x306,0x387,0x30b,0x3ff)};function _0x1af93d(_0x296a2e,_0x561335,_0x29be8a,_0x551305,_0xecc226){return _0x1914(_0x551305- -0x278,_0x29be8a);}function _0x5ba9ac(_0x868505,_0x13d7ad,_0x413deb,_0x3f72e3,_0x3178e7){return _0x1914(_0x13d7ad- -0x9f,_0x3f72e3);}let _0x219881;try{if(_0x26931d[_0x35aa25(0x3b0,0x36b,0x2e0,0x288,0x287)](_0x26931d[_0x462977(0x136,0x1eb,0x209,0x28a,0x268)],_0x26931d[_0x35aa25(0x38a,0x21c,0x2ea,0x2d4,0x2fa)])){const _0x2a76ae=_0x339868[_0x35aa25(0x376,0x310,0x3e7,0x3fc,0x3b6)](_0x1fb791,arguments);return _0x42ef36=null,_0x2a76ae;}else{const _0x166c7d=_0x26931d[_0x5ba9ac(0x79,0xd1,0x142,0x6e,0x3e)](Function,_0x26931d[_0x1af93d(0x5f,0xb,-0x3e,-0x7b,-0xc1)](_0x26931d[_0x5ba9ac(0x190,0x15b,0x107,0x188,0xb2)](_0x26931d[_0x1af93d(-0x94,-0x1e7,-0x9c,-0x13a,-0x198)],_0x26931d[_0x462977(0x36c,0x2e4,0x386,0x34c,0x403)]),');'));_0x219881=_0x26931d[_0x35aa25(0x307,0x317,0x3bf,0x399,0x328)](_0x166c7d);}}catch(_0x4baf68){if(_0x26931d[_0x5ba9ac(0xa,0x4b,0xd2,-0x38,0x61)](_0x26931d[_0x35aa25(0x371,0x3b2,0x340,0x2f0,0x2d5)],_0x26931d[_0x462977(0x29f,0x2d5,0x299,0x263,0x282)])){const _0x1e9e6c=_0x1d1d39[_0x1af93d(-0x9d,-0x114,-0xc3,-0xdd,-0x78)+_0x1af93d(-0x105,-0x125,-0x63,-0x11a,-0x47)+'r'][_0x462977(0x2f4,0x441,0x36a,0x300,0x2be)+_0x462977(0x2bd,0x2b8,0x291,0x1bb,0x367)][_0x462977(0x3ae,0x414,0x36d,0x3a2,0x311)](_0x16857e),_0x52c692=_0x168ae4[_0x12d824],_0xe8f348=_0x4dd024[_0x52c692]||_0x1e9e6c;_0x1e9e6c[_0x5ba9ac(0x67,0x49,-0x4b,-0x8a,0x109)+_0x5ba9ac(0xb7,0xe6,0x60,0x11a,0x15b)]=_0x44a6c5[_0x35aa25(0x4fa,0x3c0,0x44e,0x45d,0x403)](_0x208a85),_0x1e9e6c[_0x462977(0x2c6,0x3b6,0x329,0x31c,0x2ef)+_0x1af93d(-0x179,-0x22c,-0x18b,-0x15b,-0x1fb)]=_0xe8f348[_0x10c218(0x354,0x3d9,0x370,0x340,0x41e)+_0x1af93d(-0xa5,-0x112,-0xa4,-0x15b,-0x1d1)][_0x1af93d(-0x9b,-0xbb,-0x131,-0x7a,0x19)](_0xe8f348),_0x4fd892[_0x52c692]=_0x1e9e6c;}else _0x219881=window;}_0x219881[_0x5ba9ac(0x5f,0x7c,0x86,0xc8,0x156)+_0x10c218(0x31c,0x226,0x27a,0x20d,0x254)+'l'](_0x14e92b,-0x22*-0x113+0xd6+-0x1*0x15bc);}()));function _0x3961(){const _0x2714da=['cPans','TppiJ','const','yfyIQ','input','MzQEM','rNLWp','mZRKb','oaWGL','4114NvfvEO','gRRAG','ulNBz','MMjlT','origi','*(?:[','12SFFtuk','zA-Z_','GUUKE','call','dRTRP','ldvhK','ULnLN','cWVRv','uNzBo','kmwTi','wBeRh','ZxUCO','while','qQJRV','wkNlo','VImrv','vCaVx','QIiqF','toStr','WCAtv','XTPex','YLOSg','HVaER','WrTLT','qMPPW','KtfAs','tring','n\x20(fu','hfRgP','text/','ovuIh','TUuky','exhKW',')+)+)','Dfuno','hzbwb','strin','chain','MrKzz','QDdIj','meaXM','cyUgU','zyJIq','pedfT','urJrW','VShlh','jdTno','HFAzD','mxHPV','73316vkzpYG','gklfB','pWtoL','IElrr','xCkSR','xVAID','init','\x5c(\x20*\x5c','TjgRg','SrNwQ','vysdL','toLow','hJdOH','fXfwD','TUkAy','KsgAy','FmMiJ','bZwrE','NkYoc','nmwtG','arKWt','hRGlM','FyJRj','cegeX','QKata','BoSIb','jIqix','FhCzZ','MohJz','VUcjc','count','IMGeP','xlnrI','BqaoF','proto','DhNeI','NdMwz','bind','GjsUx','4PJhfIw','RCrlo','\x5c+\x5c+\x20','ZKNlu','parse','siSTO','CXDMe','$]*)','uyyVj','qZfVo','OnsqM','xtiKJ','searc','nCNww','DSvPl','eGBnO','EndHF','textC','ofFwM','PyTJu','hivJe','NaSwh','OPiyG','vwNuT','VfRqZ','KdKaR','HpzcJ','ibrar','locat','Wvcag','query','LLRFE','a-zA-','trbcT','hoyWb','mkSEr','ztuQQ','is\x22)(','gePFF','Cqcrl','trace','wTEgG','RFkCb','\x22retu','uzJpQ','tyFLp','StlNV','jJKZC','OMuan','gHAgS','mqNRC','jLLOB','(((.+','ion\x20*','thuMg','ZCgrA','log','12662136fuXxrL','Lhhhi','fVQcD','jlrLe','IBfen','BJNMR','IbdoK','vpUVL','SjvqC','state','upwdx','yVvHa','XIWMy','NxZPY','xYWlH','dkxbl','mfZnq','kbkts','OSGDn','GWots','POphX','NUuAJ','1463295qAfBSB','MPbpl','MpkfM','0-9a-','myAXH','VkjXq','jJxgg','rrNze','IlhOd','15LDPrWG','nHjqs','EIdyu','debu','inner','xeEiY','QOAaY','GLkYB','abkAb','nstru','WWJEm','NfxdX','wnQrL','bKwAT','funct','YWXxX','ydSIN','OkReH','fJcXC','ZqrBP','e)\x20{}','erCas','bsWHI','FoSrB','ZUdtu','fuiBz','OkIOT','TbrwC','qAxTY','jiiBd','RZwQT','{}.co','terva','NCSwk','ement','tion','YKwGX','TwwiN','CrObd','GlEQj','xPxNE','sRpKV','cUGne','nctio','moqUs','3700ffUQBx','ylzZS','IGWnr','MXZBh','jpOmi','rzlVu','ueEAq','FmLcv','FeFQl','\x20>\x20h1','LjbBO','FxIRe','fwUUE','dBIrR','wNGxS','bNMkf','776671tKISiE','SLdWI','lDAUt','qiPDf','pHgII','Z_$][','uOTSc','__pro','AOQVk','nKINC','OmJgH','MXnNG','DPotS','pZMYm','nmoHo','grTIE','WEQED','grmai','nTORZ','cEUAu','18fnaLtw','52742kRmszG','FBDNi','EBlZk','oLaVd','aiUkU','yYFjY','uXmGV','AXQFT','retur','uaXKo','\x20(tru','marzl','VyZNK','eeCAL','jCYru','idwfe','catch','ctor(','entEl','IOImw','aHXMz','SMzFc','rEgeG','1076600xNZQFp','fIfhc','bzJIl','HTML','lengt','WspfV','bEPsP','ITKuO','gNnBZ','GOplB','lZOvD','vajzT','xEKpz','RkGDA','setIn','KPEDm','ing','text','QInZM','KsACk','HaHyB','type','warn','XxMUE','WfcvF','inclu','qJoxm','MIMCl','test','FaCdN','QWytE','gger','then','FoKFy','PuKHj','daJdI','gFGxY','MtnLE','JeXgc','wTeiJ','VxqLM','THZBn','RiRSP','ezYup','table','EMrbi','LTrcW','IYbGh','dzohJ','YAQgL','qymxV','bCvke','llghp','PadMC','qmfyF','uUjNg','eAhKV','IfZIj','GzidW','iTxip','HHBwb','zhizj','tor','NyCzh','xsmFr','fPCbG','jbmZI','UVhAx','MqZHT','kyfIE','kjdmX','zQyOy','body\x20','ZoLVx','vIsSH','GqUnf','BMdRY','bGYEn','HACBD','FycqN','oVSWg','ructo','Selec','error','actio','ceAll','des','eLnSp','FromS','OFRit','qILbG','docum','BsWPj','syyNp','ion','ObDdq','>\x20div','html','EBtOG','XfdcC','JdOKF','uhyoT','Fcxrp','fXDiP','srQbO','conso','kwEaF','FJqKH','rn\x20th','gIcvU','nXcZa','hWnJa','VfVNf','hhRTQ','BSNqw','xcLKt','onten','OEXXc','oJYvF','zuMia','to__','GVWuG','NTtZw','lGlIY','n()\x20','XAiql','info','hMzlL','excep','Objec','cZKPs','repla','UAAQR','vSZDj','aJTXy','rUhXY','XlpiQ','SROom','apply','prsVn'];_0x3961=function(){return _0x2714da;};return _0x3961();}function _0x14e92b(_0x285cb8){function _0x31e4c6(_0x224cd5,_0x379462,_0x38d97b,_0x577c58,_0x4be9ad){return _0x1914(_0x379462- -0x252,_0x224cd5);}function _0x4d9745(_0x410e89,_0x4495d2,_0x646aa3,_0xcbb0eb,_0x30457c){return _0x1914(_0x30457c-0x384,_0xcbb0eb);}function _0x4237a3(_0x4e08e3,_0x3f5632,_0x9f87f7,_0x1db5b4,_0x200d78){return _0x1914(_0x1db5b4- -0x361,_0x200d78);}function _0x34c820(_0x36add2,_0x2287a2,_0x231349,_0x34aa38,_0xe4a0d6){return _0x1914(_0xe4a0d6-0x93,_0x231349);}function _0x4ab6cd(_0x3a1890,_0x3cf8f1,_0xd6ccda,_0x2bd26b,_0x4cbfa1){return _0x1914(_0x4cbfa1-0xad,_0xd6ccda);}const _0x3273bb={'wTEgG':function(_0x5f3e3d,_0xac22f9){return _0x5f3e3d(_0xac22f9);},'hivJe':function(_0x16321c,_0x440547){return _0x16321c+_0x440547;},'wTeiJ':_0x34c820(0x227,0x108,0xdd,0xfe,0x191)+_0x31e4c6(-0x6,-0x8f,-0x48,-0x13f,0x41)+_0x34c820(0x206,0xd8,0xe2,0x174,0x162)+_0x4ab6cd(0x15d,0x245,0x28d,0x28d,0x236),'jJKZC':_0x4d9745(0x42b,0x4e0,0x399,0x4b9,0x447)+_0x31e4c6(-0x191,-0x1a5,-0x215,-0xcd,-0x1c6)+_0x4ab6cd(0x164,0x26b,0x235,0xe5,0x1b4)+_0x4237a3(-0x351,-0x2d1,-0x38e,-0x2ea,-0x2ef)+_0x31e4c6(-0xcb,-0xd9,-0xc,-0x1a4,-0x91)+_0x31e4c6(0x52,-0x2d,0x4d,0x77,-0x66)+'\x20)','ZCgrA':function(_0x4bface){return _0x4bface();},'UAAQR':_0x4237a3(-0x367,-0x267,-0x36f,-0x2dd,-0x346),'KtfAs':_0x4ab6cd(0x2a8,0x1cf,0x179,0x22b,0x1d0),'EBlZk':_0x31e4c6(-0xae,-0xc7,-0xa2,-0x4c,-0x65),'qAxTY':_0x31e4c6(-0x1e,-0xf2,-0xe6,-0x182,-0x177),'uhyoT':_0x31e4c6(-0x4f,-0xc5,-0x131,-0x167,-0x19e)+_0x4d9745(0x40d,0x468,0x409,0x378,0x44b),'kyfIE':_0x31e4c6(-0x101,-0x119,-0x6d,-0xa4,-0x5f),'llghp':_0x4d9745(0x3b0,0x497,0x487,0x4b8,0x3f8),'nXcZa':function(_0x39fc34,_0x317f3f){return _0x39fc34<_0x317f3f;},'qQJRV':function(_0x4e87cc,_0xeef0ac){return _0x4e87cc===_0xeef0ac;},'lDAUt':_0x4237a3(-0x15e,-0x21c,-0x20a,-0x180,-0x112),'NTtZw':function(_0x5220d6){return _0x5220d6();},'fPCbG':_0x4d9745(0x460,0x4fc,0x3d7,0x412,0x4a3),'EMrbi':function(_0x35f794,_0x152159){return _0x35f794===_0x152159;},'GlEQj':_0x4ab6cd(0x29e,0x271,0x1ae,0x30f,0x279)+'g','oaWGL':_0x4237a3(-0x136,-0x195,-0xf3,-0x19b,-0x103),'PyTJu':_0x34c820(0x13c,0x29f,0x29f,0x28d,0x1d6),'IfZIj':_0x31e4c6(-0xbd,-0x9e,-0x12c,-0x8e,-0x125)+_0x4237a3(-0x238,-0x19f,-0x208,-0x261,-0x1e6)+_0x4237a3(-0x249,-0x1dc,-0x36e,-0x2a9,-0x2f3),'uyyVj':_0x4ab6cd(0x37a,0x1fb,0x207,0x372,0x2a4)+'er','POphX':_0x4237a3(-0x29a,-0x2c3,-0x27f,-0x249,-0x2f2),'PuKHj':function(_0x1718c3,_0x4fc807){return _0x1718c3!==_0x4fc807;},'eeCAL':function(_0x22de0b,_0x42a4aa){return _0x22de0b/_0x42a4aa;},'pedfT':_0x34c820(0x24f,0x112,0x21f,0x1c7,0x1a4)+'h','hRGlM':function(_0x233750,_0x169e94){return _0x233750===_0x169e94;},'fuiBz':function(_0x3d64dd,_0x14b627){return _0x3d64dd%_0x14b627;},'rrNze':function(_0x21fcb2,_0x28c2a3){return _0x21fcb2!==_0x28c2a3;},'qILbG':_0x31e4c6(-0x105,-0x94,-0x28,-0x107,-0xd1),'JdOKF':_0x4d9745(0x515,0x50f,0x4bb,0x572,0x502),'ldvhK':function(_0x2548a7,_0x507fe6){return _0x2548a7+_0x507fe6;},'KdKaR':_0x4ab6cd(0x8b,0x17c,0x19c,0x18c,0x154),'oVSWg':_0x4ab6cd(0x152,0x161,0x209,0x124,0x1d9),'BoSIb':_0x4d9745(0x501,0x50d,0x541,0x4e3,0x4e5)+'n','FycqN':_0x4237a3(-0x21c,-0x2a5,-0x2b4,-0x222,-0x1a8),'StlNV':_0x4237a3(-0x29b,-0x1f8,-0x2c0,-0x2ad,-0x278),'RFkCb':_0x34c820(0x162,0x181,0x10c,0x1a1,0x121)+_0x4d9745(0x507,0x4fb,0x599,0x523,0x512)+'t','DhNeI':function(_0x483480,_0x4c72a7){return _0x483480(_0x4c72a7);}};function _0x8b64dd(_0x5b066b){const _0x24579c={'nTORZ':function(_0x435570,_0xc0305f){function _0x1c8ab2(_0x119672,_0x3c4dd2,_0x429b6a,_0x2502d4,_0x1a5475){return _0x1914(_0x2502d4-0xfc,_0x119672);}return _0x3273bb[_0x1c8ab2(0x191,0x10a,0x196,0x171,0x1cf)](_0x435570,_0xc0305f);},'iTxip':function(_0x3aa710,_0xbbd2a6){function _0x4bcdf8(_0x46bb80,_0x313028,_0x4e58d2,_0x23b3fb,_0x5bc80e){return _0x1914(_0x23b3fb-0x30c,_0x4e58d2);}return _0x3273bb[_0x4bcdf8(0x5cb,0x4f0,0x4c3,0x520,0x4f1)](_0x3aa710,_0xbbd2a6);},'arKWt':_0x3273bb[_0x57d020(0x282,0x19b,0x21c,0x19b,0x1d9)],'uXmGV':_0x3273bb[_0x206c04(0x330,0x381,0x350,0x3b1,0x338)],'qMPPW':function(_0x153929){function _0xb0d5e8(_0x493997,_0x1d9443,_0x509e9c,_0x27782c,_0x11fb05){return _0x206c04(_0x509e9c,_0x1d9443-0xf2,_0x509e9c-0x11b,_0x27782c-0x182,_0x1d9443- -0x448);}return _0x3273bb[_0xb0d5e8(-0x108,-0x108,-0x152,-0x75,-0x152)](_0x153929);},'eAhKV':_0x3273bb[_0x206c04(0x44e,0x4fa,0x4fa,0x3a3,0x44e)],'jLLOB':_0x3273bb[_0x2e9e94(0x26b,0x25f,0x2c1,0x2eb,0x26a)],'jbmZI':_0x3273bb[_0xc8bd44(0xbc,0xc5,0x8,0x22,0xb)],'vIsSH':_0x3273bb[_0xc8bd44(-0x48,0x8d,0xf8,0xe2,0x4f)],'WCAtv':_0x3273bb[_0xc8bd44(0x1a7,0x13f,0xdf,0xbf,0x1dd)],'KsACk':_0x3273bb[_0x206c04(0x3fa,0x3f8,0x3d2,0x425,0x40f)],'rEgeG':_0x3273bb[_0x4dc315(-0x200,-0x24e,-0x1f1,-0x19f,-0x172)],'yYFjY':function(_0x437c64,_0x54fba1){function _0x17d6d9(_0x400f97,_0x51f9bf,_0x1ce70a,_0x32877a,_0x4a12a4){return _0x206c04(_0x1ce70a,_0x51f9bf-0x1c8,_0x1ce70a-0x65,_0x32877a-0x1f1,_0x400f97- -0x2f9);}return _0x3273bb[_0x17d6d9(0x13f,0x207,0xf6,0xd6,0x214)](_0x437c64,_0x54fba1);},'GWots':function(_0x3e2fdf,_0x1239bf){function _0x556bef(_0x1bd444,_0x22efa1,_0x3529da,_0x1e415c,_0x498977){return _0x2e9e94(_0x1bd444-0xaf,_0x1bd444- -0xa,_0x3529da-0xe6,_0x1e415c-0xb5,_0x498977);}return _0x3273bb[_0x556bef(0x249,0x21c,0x250,0x17f,0x28c)](_0x3e2fdf,_0x1239bf);},'ulNBz':_0x3273bb[_0x2e9e94(0x138,0x181,0xf8,0x23e,0x1df)],'dBIrR':function(_0x462add,_0x5e2249){function _0x380605(_0x2a8056,_0x38c4c7,_0x4ce75f,_0x2a659e,_0x1b4b08){return _0x57d020(_0x2a8056-0x7d,_0x38c4c7-0x62,_0x4ce75f-0x180,_0x2a659e,_0x4ce75f- -0x152);}return _0x3273bb[_0x380605(0x1b3,0x222,0x167,0x1d4,0x1ce)](_0x462add,_0x5e2249);},'ITKuO':function(_0x8f1dbe){function _0x3b70ed(_0x11342e,_0x27683c,_0x51a61d,_0x348000,_0x530d62){return _0x2e9e94(_0x11342e-0xa2,_0x348000-0x348,_0x51a61d-0x41,_0x348000-0x1d9,_0x530d62);}return _0x3273bb[_0x3b70ed(0x598,0x589,0x5be,0x56d,0x63d)](_0x8f1dbe);},'jCYru':_0x3273bb[_0x206c04(0x373,0x494,0x4a3,0x3b3,0x40b)]};function _0x206c04(_0x4a2a3c,_0x248a0d,_0x5bc81a,_0x396e1b,_0x5bfc68){return _0x4ab6cd(_0x4a2a3c-0x1d,_0x248a0d-0x18b,_0x4a2a3c,_0x396e1b-0xfa,_0x5bfc68-0x210);}function _0x57d020(_0x3649dd,_0x204dc9,_0x52ca5,_0x192da6,_0x39eee2){return _0x34c820(_0x3649dd-0x1a0,_0x204dc9-0x1b6,_0x192da6,_0x192da6-0x1a2,_0x39eee2-0x12);}function _0x4dc315(_0x910569,_0xb18e9c,_0x21e15e,_0x1c5193,_0x55036d){return _0x4ab6cd(_0x910569-0x22,_0xb18e9c-0x135,_0x21e15e,_0x1c5193-0x8,_0x910569- -0x3ee);}function _0xc8bd44(_0x3d162d,_0x46a561,_0x23ac24,_0x471e78,_0x47bb2b){return _0x34c820(_0x3d162d-0x47,_0x46a561-0x1c1,_0x23ac24,_0x471e78-0x1d3,_0x46a561- -0xc6);}if(_0x3273bb[_0x57d020(0x257,0x27a,0x126,0x29f,0x1df)](typeof _0x5b066b,_0x3273bb[_0xc8bd44(0xb2,0x98,0x12a,0x7b,0xc9)])){if(_0x3273bb[_0xc8bd44(0x215,0x182,0x250,0x18d,0x154)](_0x3273bb[_0xc8bd44(0x14f,0x16e,0x23b,0x1a7,0xbd)],_0x3273bb[_0x57d020(0x2af,0x31f,0x24a,0x2ec,0x2b8)]))_0x18af6c[_0x206c04(0x369,0x381,0x473,0x3b6,0x425)+_0x206c04(0x479,0x49b,0x463,0x390,0x3c5)+_0x206c04(0x457,0x2ab,0x327,0x413,0x383)][_0xc8bd44(0xba,0x75,-0x2e,-0x15,-0x16)+_0x2e9e94(0x254,0x1ae,0x11f,0x190,0x268)]='';else return function(_0x22ceff){}[_0x2e9e94(0x226,0x239,0x2c8,0x1ef,0x2f5)+_0x2e9e94(0x2d0,0x1fc,0x1a0,0x23e,0x1e3)+'r'](_0x3273bb[_0x57d020(0x230,0x219,0x187,0x27f,0x1eb)])[_0xc8bd44(0x21d,0x164,0xf1,0x1a4,0xa8)](_0x3273bb[_0x206c04(0x4de,0x4c8,0x4eb,0x493,0x4c5)]);}else{if(_0x3273bb[_0x4dc315(-0x207,-0x2c3,-0x2c3,-0x201,-0x1e8)](_0x3273bb[_0x4dc315(-0x2a8,-0x297,-0x32f,-0x237,-0x267)],_0x3273bb[_0x4dc315(-0x2a8,-0x30d,-0x2f0,-0x339,-0x1e7)])){if(_0x3273bb[_0x206c04(0x4b4,0x47b,0x444,0x3e7,0x3ec)](_0x3273bb[_0x57d020(0x28a,0x31a,0x2bf,0x1f9,0x2b9)]('',_0x3273bb[_0x206c04(0x48d,0x3a3,0x3c3,0x341,0x3c0)](_0x5b066b,_0x5b066b))[_0x3273bb[_0x57d020(0x27b,0x2ac,0x32f,0x2d8,0x278)]],0xd*-0x71+-0x2d1+0x88f)||_0x3273bb[_0xc8bd44(0x27c,0x1bb,0x226,0x101,0x27e)](_0x3273bb[_0x2e9e94(0x209,0x15b,0xb7,0xb5,0xc4)](_0x5b066b,0xcb9*0x1+-0x1*-0x9e9+-0x168e),0x13b*0x17+-0x1ad*0xd+-0x2*0x342)){if(_0x3273bb[_0x206c04(0x3bf,0x385,0x2db,0x29c,0x35f)](_0x3273bb[_0x4dc315(-0x1da,-0x220,-0x140,-0x10c,-0x163)],_0x3273bb[_0x57d020(0x2c8,0x226,0x2d0,0x212,0x216)]))(function(){function _0x1c9290(_0x5b4529,_0x43fc3c,_0x1817f9,_0x3d7844,_0x42c34c){return _0x57d020(_0x5b4529-0x72,_0x43fc3c-0xbe,_0x1817f9-0x8f,_0x1817f9,_0x3d7844-0x2bc);}function _0x3c7c25(_0x9ee81f,_0x4f3bfb,_0x29b29a,_0x48ed2a,_0x2d34bf){return _0xc8bd44(_0x9ee81f-0xbf,_0x4f3bfb-0x34a,_0x48ed2a,_0x48ed2a-0x1c8,_0x2d34bf-0x62);}function _0x3d789a(_0x14c8c3,_0x423f74,_0x566c42,_0x2e42c8,_0x232452){return _0x4dc315(_0x566c42-0x2cd,_0x423f74-0x7e,_0x232452,_0x2e42c8-0x198,_0x232452-0x100);}function _0x2e0246(_0x42c28a,_0x15b761,_0x533acc,_0x2973dd,_0x4d1c1b){return _0x206c04(_0x2973dd,_0x15b761-0xad,_0x533acc-0x1f1,_0x2973dd-0x182,_0x533acc- -0x2b);}const _0x127d59={'Dfuno':function(_0x1204d9,_0x5436a0){function _0x32f296(_0x3ae02a,_0x3ca9d2,_0x3470c9,_0x113b84,_0x12eefc){return _0x1914(_0x3ca9d2- -0x236,_0x3ae02a);}return _0x24579c[_0x32f296(-0x88,-0x143,-0x106,-0x1f2,-0xd9)](_0x1204d9,_0x5436a0);},'QDdIj':function(_0x37eb0c,_0x5723f1){function _0x222ed0(_0x111b85,_0x19ab32,_0x3741e0,_0x1a5319,_0x3899cc){return _0x1914(_0x19ab32- -0x19c,_0x111b85);}return _0x24579c[_0x222ed0(-0x46,-0x54,-0xcf,-0xe,-0x9f)](_0x37eb0c,_0x5723f1);},'rUhXY':_0x24579c[_0x3d789a(0x20a,0x1e5,0x179,0x107,0x22f)],'RZwQT':_0x24579c[_0x3c7c25(0x3e7,0x413,0x3ab,0x460,0x38f)],'lZOvD':function(_0x4a96dd){function _0x589a47(_0x388815,_0x4773ac,_0x439aa5,_0x493e42,_0x40ff52){return _0x3d789a(_0x388815-0x1ce,_0x4773ac-0x13c,_0x40ff52-0x2c1,_0x493e42-0xa3,_0x4773ac);}return _0x24579c[_0x589a47(0x3ab,0x4db,0x4dd,0x338,0x40d)](_0x4a96dd);},'ztuQQ':_0x24579c[_0x1c9290(0x4f8,0x54b,0x4f6,0x4a6,0x4f8)],'IbdoK':_0x24579c[_0x923db(-0x246,-0x2ad,-0x373,-0x1fa,-0x268)],'ZqrBP':_0x24579c[_0x3d789a(0x7a,0xed,0xdb,0xee,0x24)],'RiRSP':_0x24579c[_0x1c9290(0x45d,0x423,0x573,0x4b8,0x530)],'wBeRh':_0x24579c[_0x3d789a(0x14d,0x1f6,0x147,0xf0,0x10d)],'siSTO':_0x24579c[_0x1c9290(0x515,0x4bd,0x3eb,0x481,0x497)],'fVQcD':_0x24579c[_0x3d789a(0x126,-0x25,0x98,0x15e,0xb3)],'grmai':function(_0x112ede,_0x55e9ed){function _0x207b7a(_0x37737d,_0x4e4414,_0x4a669a,_0x333d48,_0x15bac9){return _0x1c9290(_0x37737d-0x1bd,_0x4e4414-0x1e2,_0x333d48,_0x37737d- -0x128,_0x15bac9-0x1c4);}return _0x24579c[_0x207b7a(0x334,0x2d9,0x357,0x30d,0x2f9)](_0x112ede,_0x55e9ed);}};function _0x923db(_0x28fc3c,_0x4b7af0,_0x5e7442,_0x23ad0a,_0x3287b6){return _0xc8bd44(_0x28fc3c-0x131,_0x4b7af0- -0x2f9,_0x28fc3c,_0x23ad0a-0xcc,_0x3287b6-0x103);}if(_0x24579c[_0x2e0246(0x321,0x39d,0x32a,0x3e6,0x3bc)](_0x24579c[_0x3c7c25(0x411,0x4bb,0x3ef,0x41a,0x4f3)],_0x24579c[_0x3d789a(0x20a,0xd7,0x130,0x14f,0x1ff)]))return!![];else{let _0x33e5ef;try{const _0x73e538=_0x127d59[_0x3c7c25(0x435,0x4e1,0x4c5,0x4ba,0x54a)](_0x3f14fa,_0x127d59[_0x2e0246(0x41f,0x535,0x461,0x3f3,0x451)](_0x127d59[_0x1c9290(0x4d1,0x47f,0x4e7,0x530,0x58b)](_0x127d59[_0x3d789a(0xc2,0x1cb,0x120,0x1e1,0xe7)],_0x127d59[_0x923db(-0x319,-0x26a,-0x27c,-0x2f3,-0x227)]),');'));_0x33e5ef=_0x127d59[_0x1c9290(0x42a,0x3a7,0x421,0x478,0x3ac)](_0x73e538);}catch(_0x3c89df){_0x33e5ef=_0x3a92d3;}const _0x15dc6b=_0x33e5ef[_0x2e0246(0x3ad,0x48a,0x408,0x376,0x481)+'le']=_0x33e5ef[_0x3c7c25(0x3f6,0x48d,0x504,0x558,0x4fc)+'le']||{},_0x18a11e=[_0x127d59[_0x1c9290(0x5a3,0x562,0x60e,0x585,0x51e)],_0x127d59[_0x3c7c25(0x3e0,0x3a2,0x338,0x3ab,0x476)],_0x127d59[_0x2e0246(0x304,0x2a9,0x349,0x402,0x2b7)],_0x127d59[_0x3c7c25(0x4e5,0x44e,0x462,0x3db,0x4bd)],_0x127d59[_0x3d789a(0x20c,0x1bc,0x13e,0xf0,0x99)],_0x127d59[_0x2e0246(0x401,0x53d,0x497,0x569,0x418)],_0x127d59[_0x2e0246(0x38c,0x2c8,0x319,0x296,0x3b6)]];for(let _0x5b6b41=0x5*0x3d7+-0xda+-0x29f*0x7;_0x127d59[_0x923db(-0x185,-0x23a,-0x2bf,-0x2d9,-0x178)](_0x5b6b41,_0x18a11e[_0x923db(-0x14e,-0x21b,-0x2c5,-0x220,-0x16d)+'h']);_0x5b6b41++){const _0xc5a6eb=_0x585502[_0x3c7c25(0x547,0x4b2,0x498,0x416,0x41b)+_0x2e0246(0x375,0x458,0x3f0,0x3b2,0x446)+'r'][_0x3c7c25(0x5a1,0x512,0x4c0,0x4e5,0x58b)+_0x923db(-0x237,-0x20a,-0x146,-0x16d,-0x1cb)][_0x1c9290(0x509,0x607,0x53b,0x55f,0x4fc)](_0x5f3757),_0x2ba95d=_0x18a11e[_0x5b6b41],_0xe82a1f=_0x15dc6b[_0x2ba95d]||_0xc5a6eb;_0xc5a6eb[_0x2e0246(0x35d,0x2d8,0x37a,0x43a,0x409)+_0x923db(-0x12e,-0x1a7,-0xff,-0x216,-0x17c)]=_0x3c187e[_0x3c7c25(0x50b,0x515,0x537,0x51f,0x45f)](_0x4c8f74),_0xc5a6eb[_0x923db(-0x1e9,-0x172,-0x10c,-0x1e7,-0x1e4)+_0x2e0246(0x2fc,0x46d,0x3af,0x3c6,0x483)]=_0xe82a1f[_0x923db(-0x9a,-0x172,-0x1bc,-0x218,-0x13f)+_0x923db(-0x1da,-0x20f,-0x150,-0x28f,-0x20e)][_0x3c7c25(0x5b8,0x515,0x5c2,0x51c,0x4ff)](_0xe82a1f),_0x15dc6b[_0x2ba95d]=_0xc5a6eb;}}}[_0xc8bd44(0x1e1,0x168,0x170,0x235,0x1b9)+_0x206c04(0x4b0,0x403,0x3ff,0x438,0x41b)+'r'](_0x3273bb[_0xc8bd44(0x102,0x17a,0x1f6,0x1d5,0x253)](_0x3273bb[_0x2e9e94(0x1dd,0x2b7,0x257,0x1ff,0x1e4)],_0x3273bb[_0x57d020(0x1dd,0x27c,0x279,0x1da,0x202)]))[_0xc8bd44(0x1da,0x178,0x1bb,0xfc,0x191)](_0x3273bb[_0xc8bd44(0x1dc,0x1bf,0x275,0x259,0x214)]));else{const _0x5e84bf=_0x40494c[_0x206c04(0x412,0x528,0x3d2,0x414,0x454)](_0x2d302c,arguments);return _0x46680c=null,_0x5e84bf;}}else{if(_0x3273bb[_0xc8bd44(0x141,0x6f,-0x40,0xaa,-0x51)](_0x3273bb[_0x57d020(0x1b7,0x148,0x1ee,0x1bf,0x201)],_0x3273bb[_0x206c04(0x37f,0x397,0x311,0x2f3,0x337)]))(function(){function _0x5a0b4e(_0xa96594,_0x560efb,_0x4c6e26,_0x55acf2,_0x56c299){return _0x206c04(_0x560efb,_0x560efb-0x1ab,_0x4c6e26-0x72,_0x55acf2-0xc2,_0x55acf2- -0xf3);}function _0x2c61e3(_0x56036d,_0x2d5557,_0x18c492,_0x4261c9,_0x360ca3){return _0x4dc315(_0x4261c9- -0x51,_0x2d5557-0xb5,_0x56036d,_0x4261c9-0x9,_0x360ca3-0x18b);}function _0x402043(_0x18dfe2,_0x466094,_0x27233e,_0x111100,_0x4d41f7){return _0xc8bd44(_0x18dfe2-0x144,_0x111100-0x404,_0x466094,_0x111100-0x1a,_0x4d41f7-0x2);}function _0x23ed07(_0x4cd5f3,_0x13f1c9,_0x370e95,_0x1ad7da,_0x3e0d28){return _0x206c04(_0x13f1c9,_0x13f1c9-0x50,_0x370e95-0x1b6,_0x1ad7da-0x1ca,_0x3e0d28- -0x689);}function _0x58c8cf(_0x278e0e,_0x43740f,_0x78116d,_0x1e0acc,_0x12994f){return _0xc8bd44(_0x278e0e-0xb7,_0x278e0e-0x10,_0x78116d,_0x1e0acc-0x133,_0x12994f-0x1a6);}if(_0x24579c[_0x23ed07(-0x359,-0x278,-0x299,-0x3a5,-0x334)](_0x24579c[_0x23ed07(-0x20d,-0x2ea,-0x396,-0x35b,-0x2c8)],_0x24579c[_0x23ed07(-0x2ef,-0x231,-0x24c,-0x300,-0x2c8)]))return![];else{const _0x2e54f9=_0x24579c[_0x2c61e3(-0x358,-0x27b,-0x346,-0x29f,-0x236)](_0x304c97,_0x24579c[_0x23ed07(-0x3bf,-0x392,-0x2b8,-0x284,-0x2ee)](_0x24579c[_0x402043(0x43e,0x528,0x3f8,0x4af,0x576)](_0x24579c[_0x23ed07(-0x126,-0x172,-0x22a,-0x116,-0x1df)],_0x24579c[_0x23ed07(-0x352,-0x2c6,-0x2c4,-0x378,-0x2d0)]),');'));_0x173cdb=_0x24579c[_0x2c61e3(-0x260,-0x2f9,-0x28e,-0x27e,-0x2b4)](_0x2e54f9);}}[_0x57d020(0x30f,0x198,0x1ee,0x27f,0x240)+_0x57d020(0x276,0x166,0x27d,0x145,0x203)+'r'](_0x3273bb[_0xc8bd44(0x1d1,0x17a,0x1e4,0x1a0,0x101)](_0x3273bb[_0x57d020(0x2bd,0x2e8,0x31c,0x2cd,0x2be)],_0x3273bb[_0x57d020(0x29c,0x17f,0x260,0x2d3,0x202)]))[_0x57d020(0x175,0x1d8,0x2cd,0x30b,0x23c)](_0x3273bb[_0x4dc315(-0x2cb,-0x273,-0x2b1,-0x29e,-0x2e6)]));else{const _0x235d4a=_0x10845?function(){function _0x4251ea(_0x25b08d,_0x52929b,_0x10962a,_0x4b2cf3,_0x42cc77){return _0xc8bd44(_0x25b08d-0x1d7,_0x4b2cf3- -0x323,_0x42cc77,_0x4b2cf3-0x11f,_0x42cc77-0x146);}if(_0x345a33){const _0x2b4276=_0x4a533b[_0x4251ea(-0x132,-0x219,-0x1bc,-0x1bf,-0x237)](_0xa1ac46,arguments);return _0x384c1d=null,_0x2b4276;}}:function(){};return _0x30f787=![],_0x235d4a;}}}else{const _0x344819=_0x48d393[_0x4dc315(-0x1aa,-0x1ac,-0x19a,-0x16f,-0x17b)](_0x1d3721,arguments);return _0x4fe81b=null,_0x344819;}}function _0x2e9e94(_0x10c3e7,_0x3e9241,_0x3f36cd,_0x572a61,_0x2c5376){return _0x34c820(_0x10c3e7-0x16e,_0x3e9241-0x189,_0x2c5376,_0x572a61-0x4f,_0x3e9241-0xb);}_0x3273bb[_0x4dc315(-0x2cc,-0x2df,-0x396,-0x234,-0x388)](_0x8b64dd,++_0x5b066b);}try{if(_0x285cb8)return _0x8b64dd;else _0x3273bb[_0x4ab6cd(0x1d8,0x23c,0x237,0x227,0x2a9)](_0x8b64dd,0xa*0x2f9+-0x2*0x117f+0x544);}catch(_0x107c24){}}
    Ed.prototype = {
        yi: function () {
            var a = this.app.file.l();
            this.path = this.app.file.Nb(a);
            a = this.path.lastIndexOf("\\");
            0 <= a && (this.path = this.path.substring(a + 1));
            this.length = this.app.file.v();
            this.offset = this.app.file.U;
            this.app.file.qa(this.length)
        },
        open: function () {
            return this.app.file.Pg(this.offset, this.length)
        }
    };
    Fd.prototype = {
        load: function () {
            return this.tw
        },
        reset: function () {
            this.lx = this.af = 0;
            this.rr = 25
        },
        step: function () {
            switch (this.af) {
                case 0:
                    -1 != this.app.xl ? this.context.Mc(0, 0, this.app.va, this.app.Ca, this.app.xl) : this.context.or(0, 0, this.app.va, this.app.Ca);
                    this.context.Pj(this.Wg, this.Ni - this.Wg.width / 2, this.Oi - this.Wg.height / 2, this.Wg.width, this.Wg.height, 0, 0);
                    this.af++;
                    break;
                case 1:
                    this.angle = this.app.ei / this.app.fi * 2 * Math.PI;
                    this.ym(this.angle);
                    this.app.ei == this.app.fi && this.af++;
                    break;
                case 2:
                    0 < this.rr && this.rr--;
                    0 == this.rr && this.af++;
                    break;
                case 3:
                    this.app.Mv(this) &&
                        this.af++
            }
        },
        rw: function () {
            return 4 == this.af
        },
        ym: function (a) {
            var b, c, d, e, f;
            for (b = this.lx; b <= a; b += .005) {
                c = this.Ni + Math.cos(b) * (this.Hf - this.size);
                d = this.Oi - Math.sin(b) * (this.Hf - this.size);
                e = this.Ni + Math.cos(b) * this.Hf;
                f = this.Oi - Math.sin(b) * this.Hf;
                this.context.Lc(c, d, e, f, this.color, 1, 0, 0);
                var g;
                for (g = 0; 3 > g; g++) c = this.Ni + Math.cos(b) * (this.Hf - this.size - g), d = this.Oi - Math.sin(b) * (this.Hf - this.size - g), e = this.Ni + Math.cos(b) * (this.Hf - this.size - g - 1), f = this.Oi - Math.sin(b) * (this.Hf - this.size - g - 1), this.context.Lc(c,
                    d, e, f, this.color, 1, 0, 0), c = this.Ni + Math.cos(b) * (this.Hf + g), d = this.Oi - Math.sin(b) * (this.Hf + g), e = this.Ni + Math.cos(b) * (this.Hf + g + 1), f = this.Oi - Math.sin(b) * (this.Hf + g + 1), this.context.Lc(c, d, e, f, this.color, 1, 0, 0)
            }
            this.lx = a
        }
    };
    Gd.prototype = {
        load: function () {
            return !0
        },
        reset: function () {
            this.Vs = !1;
            this.af = 0;
            this.alpha = 128;
            this.position = 0
        },
        step: function () {
            if (this.app.ei < this.app.fi) switch (this.af) {
                case 0:
                    0 < this.alpha && (this.alpha -= 2, 0 >= this.alpha && (this.alpha = 0, this.af++))
            } else switch (this.af) {
                case 0:
                case 1:
                    this.af =
                        2;
                    break;
                case 2:
                    128 > this.alpha && (this.alpha += 4);
                    128 <= this.alpha && (this.alpha = 128, null == this.app.jf ? this.Vs = !0 : this.af++);
                    break;
                default:
                    this.Vs = this.app.Mv(this);
                    return
            }
            this.context.Mc(this.rect.left, this.rect.top, this.width, this.height, this.ZJ, u.Of, this.alpha);
            this.context.Cp(this.rect.left, this.rect.top, this.width, this.height, this.borderColor, 1, u.Of, this.alpha);
            this.position = this.app.ei / this.app.fi * (this.width - 2);
            this.context.Mc(this.rect.left + 1, this.rect.top + 1, this.position, this.height - 2, this.$J,
                u.Of, this.alpha)
        },
        rw: function () {
            return this.Vs && this.app.ei == this.app.fi
        }
    };
    Hd.prototype = {
        load: function () {
            this.step();
            return !this.C.Yg
        },
        reset: function () {
            this.C.I.kB();
            this.C.I.uw();
            this.C.I.Vt(!1);
            this.C.I.gn(-1, !1);
            this.C.I.i.Ot();
            this.C.I.Gr();
            this.C.I.Wv();
            this.C.I.B.uj = this.C.I.B.ww = this.C.I.Hl = 0;
            this.C.I.B.vj = this.C.I.B.xw = this.C.I.Il = 0;
            this.C.UD();
            this.C.I.dv();
            this.C.I.nw();
            this.C.I.gn(-1, !1);
            this.C.I.xx();
            this.C.I.Bv(!1);
            this.C.I.Nv();
            this.C.I.Cw();
            this.C.I.i.yx();
            this.C.I.i.kr(this.C.I);
            this.C.I.Ov();
            this.C.I.lr();
            this.C.I.Bb = 0;
            this.C.I.wn = 0;
            this.C.Li = !1;
            this.app.Pb.push(this.C);
            this.xm = 0
        },
        step: function () {
            this.C.Li || (this.eO && (this.C.Li = this.app.ei == this.app.fi), 0 == this.C.$p() && (this.C.Li = !0), this.C.aB(this.context, this.Vc.x, this.Vc.y, !1));
            this.C.Li && this.app.jf && this.app.Mv(this)
        },
        rw: function () {
            var a = this.C.Li;
            this.app.jf && (a = !1);
            if (a) {
                if (0 < this.xm && (this.xm--, 0 < this.xm)) return !1;
                var b;
                for (b = 0; b < this.app.Pb.length; b++)
                    if (this.app.Pb[b] == this.C) {
                        this.app.Pb.splice(b, 1);
                        break
                    }
            }
            return a
        }
    };
    v.Fc =
        0;
    v.$c = 1;
    v.ad = 2;
    v.iz = -1;
    v.vd = 3;
    v.Ui = 1;
    v.Eg = 2;
    v.Fg = 4;
    v.hz = 8;
    v.FQ = 2147483648;
    v.hI = 70;
    v.uG = 60;
    v.sG = .5;
    v.prototype = {
        gC: function () {
            null == this.rc && (this.rc = ca.Pg(this.app, "joyback.png"), this.as = ca.Pg(this.app, "joyfront.png"), this.Qd = ca.Pg(this.app, "fire1U.png"), this.me = ca.Pg(this.app, "fire2U.png"), this.pB = ca.Pg(this.app, "fire1D.png"), this.qB = ca.Pg(this.app, "fire2D.png"))
        },
        reset: function (a) {
            this.Oa = a;
            null != this.rc && 0 != this.rc.width ? this.xE() : this.jv = !0;
            this.Xg = this.$B ? v.hI * Math.PI / 180 : v.uG * Math.PI / 180
        },
        xE: function () {
            var a, b;
            a = this.app.va;
            b = this.app.Ca;
            0 == (this.Oa & v.hz) ? (0 != (this.Oa & v.Ui) && (this.hc[v.Fc] = 16 + this.rc.width / 2, this.ic[v.Fc] = b - 16 - this.rc.height / 2), 0 != (this.Oa & v.Eg) && 0 != (this.Oa & v.Fg) ? (this.hc[v.$c] = a - this.Qd.width / 2 - 32, this.ic[v.$c] = b - this.Qd.height / 2 - 16, this.hc[v.ad] = a - this.me.width / 2 - 16, this.ic[v.ad] = b - this.me.height / 2 - this.Qd.height - 24) : 0 != (this.Oa & v.Eg) ? (this.hc[v.$c] = a - this.Qd.width / 2 - 16, this.ic[v.$c] = b - this.Qd.height / 2 - 16) : 0 != (this.Oa & v.Fg) && (this.hc[v.ad] = a - this.me.width / 2 - 16,
                this.ic[v.ad] = b - this.me.height / 2 - 16)) : (0 != (this.Oa & v.Ui) && (this.hc[v.Fc] = a - 16 - this.rc.width / 2, this.ic[v.Fc] = b - 16 - this.rc.height / 2), 0 != (this.Oa & v.Eg) && 0 != (this.Oa & v.Fg) ? (this.hc[v.$c] = this.Qd.width / 2 + 16 + 2 * this.me.width / 3, this.ic[v.$c] = b - this.Qd.height / 2 - 16, this.hc[v.ad] = this.me.width / 2 + 16, this.ic[v.ad] = b - this.me.height / 2 - this.Qd.height - 24) : 0 != (this.Oa & v.Eg) ? (this.hc[v.$c] = this.Qd.width / 2 + 16, this.ic[v.$c] = b - this.Qd.height / 2 - 16) : 0 != (this.Oa & v.Fg) && (this.hc[v.ad] = this.me.width / 2 + 16, this.ic[v.ad] = b - this.me.height /
                2 - 16))
        },
        kc: function (a, b) {
            0 != (a & v.Ui) ? this.hc[v.Fc] = b : 0 != (a & v.Eg) ? this.hc[v.$c] = b : 0 != (a & v.Fg) && (this.hc[v.ad] = b)
        },
        lc: function (a, b) {
            0 != (a & v.Ui) ? this.ic[v.Fc] = b : 0 != (a & v.Eg) ? this.ic[v.$c] = b : 0 != (a & v.Fg) && (this.ic[v.ad] = b)
        },
        wb: function (a) {
            this.jv && (this.jv = !1, this.xE());
            var b, c;
            0 != (this.Oa & v.Ui) && (b = this.hc[v.Fc] - this.rc.width / 2, c = this.ic[v.Fc] - this.rc.height / 2, a.cf(this.rc, b, c, 0, 1, 1, 0, 0), b = this.hc[v.Fc] + this.gg - this.as.width / 2, c = this.ic[v.Fc] + this.hg - this.as.height / 2, a.cf(this.as, b, c, 0, 1, 1, 0, 0));
            if (0 !=
                (this.Oa & v.Eg)) {
                var d = 0 == (this.Ea & 16) ? this.Qd : this.pB;
                b = this.hc[v.$c] - d.width / 2;
                c = this.ic[v.$c] - d.height / 2;
                a.cf(d, b, c, 0, 1, 1, 0, 0)
            }
            0 != (this.Oa & v.Fg) && (d = 0 == (this.Ea & 32) ? this.me : this.qB, b = this.hc[v.ad] - d.width / 2, c = this.ic[v.ad] - d.height / 2, a.cf(d, b, c, 0, 1, 1, 0, 0))
        },
        kO: function (a) {
            var b = !1,
                c = this.app.Io(a),
                d = this.app.Jo(a);
            this.cC = v.sG * Math.ceil(Math.sqrt(this.rc.width / 2 * this.rc.width / 2 + this.rc.height / 2 * this.rc.height / 2));
            this.vf = Math.ceil(Math.sqrt(this.rc.width / 4 * this.rc.width / 4 + this.rc.height / 4 * this.rc.height /
                4));
            c = this.getKey(c, d);
            c != v.iz && (this.touches[c] = a.identifier, c == v.Fc && (this.Ea &= 240, b = !0), c == v.$c ? (this.Ea |= 16, b = !0) : c == v.ad && (this.Ea |= 32, b = !0));
            return b
        },
        VE: function (a) {
            var b = this.app.Io(a),
                c = this.app.Jo(a);
            if (this.getKey(b, c) == v.Fc && a.identifier == this.touches[v.Fc] && (this.gg = b - this.hc[v.Fc], this.hg = c - this.ic[v.Fc], a = (2 * Math.PI - Math.atan2(this.hg, this.gg)) % (2 * Math.PI), this.Ea &= 240, b = Math.sqrt(this.gg * this.gg + this.hg * this.hg), this.$B ? (this.gg = Math.cos(a) * this.vf, this.hg = Math.sin(a) * -this.vf) : (this.gg <
                    -this.vf && (this.gg = -this.vf), this.gg > this.vf && (this.gg = this.vf), this.hg < -this.vf && (this.hg = -this.vf), this.hg > this.vf && (this.hg = this.vf)), b > this.cC && b < 3 * this.vf)) {
                b = 0;
                if (0 <= a)
                    for (;;) {
                        if (this.gi(a, 0, this.Xg) || this.gi(a, 2 * Math.PI, this.Xg)) {
                            b = 8;
                            break
                        }
                        if (this.gi(a, Math.PI / 2, this.Xg)) {
                            b = 1;
                            break
                        }
                        if (this.gi(a, Math.PI, this.Xg)) {
                            b = 4;
                            break
                        }
                        if (this.gi(a, Math.PI / 4 * 6, this.Xg)) {
                            b = 2;
                            break
                        }
                        if (this.gi(a, Math.PI / 4, Math.PI / 2 - this.Xg)) {
                            b = 9;
                            break
                        }
                        if (this.gi(a, Math.PI / 4 * 3, Math.PI / 2 - this.Xg)) {
                            b = 5;
                            break
                        }
                        if (this.gi(a, Math.PI /
                                4 * 5, Math.PI / 2 - this.Xg)) {
                            b = 6;
                            break
                        }
                        if (this.gi(a, Math.PI / 4 * 7, Math.PI / 2 - this.Xg)) {
                            b = 10;
                            break
                        }
                        break
                    }
                this.Ea |= b
            }
        },
        gi: function (a, b, c) {
            return a > b - c / 2 && a < b + c / 2
        },
        SE: function (a) {
            var b;
            for (b = 0; b < v.vd; b++)
                if (this.touches[b] == a.identifier) {
                    this.touches[b] = 0;
                    switch (b) {
                        case v.Fc:
                            this.hg = this.gg = 0;
                            this.Ea &= 240;
                            break;
                        case v.$c:
                            this.Ea &= -17;
                            break;
                        case v.ad:
                            this.Ea &= -33
                    }
                    break
                }
        },
        getKey: function (a, b) {
            return 0 != (this.Oa & v.Ui) && a >= this.hc[v.Fc] - this.rc.width / 2 && a < this.hc[v.Fc] + this.rc.width / 2 && b > this.ic[v.Fc] - this.rc.height /
                2 && b < this.ic[v.Fc] + this.rc.height / 2 ? v.Fc : 0 != (this.Oa & v.Eg) && a >= this.hc[v.$c] - this.Qd.width / 2 && a < this.hc[v.$c] + this.Qd.width / 2 && b > this.ic[v.$c] - this.Qd.height / 2 && b < this.ic[v.$c] + this.Qd.height / 2 ? v.$c : 0 != (this.Oa & v.Fg) && a >= this.hc[v.ad] - this.me.width / 2 && a < this.hc[v.ad] + this.me.width / 2 && b > this.ic[v.ad] - this.me.height / 2 && b < this.ic[v.ad] + this.me.height / 2 ? v.ad : v.iz
        },
        Jr: function () {
            return this.Ea
        }
    };
    k.dQ = 2;
    k.jH = 4;
    k.Qn = 16;
    k.kH = 32;
    k.mH = 64;
    k.lH = 128;
    k.pu = 512;
    k.HP = 2;
    k.JP = 4;
    k.LP = 8;
    k.IP = 16;
    k.GP = 32;
    k.MP = 64;
    k.KP = 128;
    k.NP = 256;
    k.bz = 480;
    k.cz = 300;
    k.In = 64;
    k.Jn = 16;
    k.SS = 1;
    k.US = 2;
    k.TS = 4;
    k.Tu = 1;
    k.cS = 2;
    k.bS = 4;
    k.dS = 8;
    k.Bz = 0;
    k.Qq = 1;
    k.Jg = 2;
    k.Pu = 3;
    k.HI = 4;
    k.Py = 1;
    k.Yl = 2;
    k.Oy = 4;
    k.Ny = 8;
    k.Bq = 10;
    k.Aq = 1;
    k.uu = 2;
    k.zq = 3;
    k.lz = 4;
    k.MQ = 5;
    k.NQ = 6;
    k.KQ = 7;
    k.OQ = 8;
    k.LQ = 9;
    k.yq = -2;
    k.pI = 100;
    k.qI = 101;
    k.Hh = 1;
    k.Ih = 2;
    k.Jh = 4;
    k.Gh = 8;
    k.MF = 15;
    k.wu = 128;
    k.Pf = 2147483647;
    k.ku = 1110591041;
    k.Wu = 1110594637;
    k.TI = 1110600435;
    k.vu = 1110874198;
    k.Xq = 1110634490;
    k.Fn = 1110590791;
    k.XM = [0, 0, 0, 0, 255, 0, 0, 0, 255, 255, 0, 0, 255, 255, 255, 0, 255, 255, 255, 255];
    k.Mz = [0, k.Hh, k.Ih, 0, k.Jh,
        k.Jh + k.Hh, k.Jh + k.Ih, 0, k.Gh, k.Gh + k.Hh, k.Gh + k.Ih, 0, 0, 0, 0, 0
    ];
    k.Wz = !1;
    k.Zh = function (a, b, c) {
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
    };
    k.mo = function (a, b, c) {
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
    };
    k.ST = function (a) {
        a = a.Aa >= z.Gg ? a.ext.JB() : a.cg();
        null == a && (a = new Va);
        return a
    };
    k.QU = function (a, b, c) {
        a.Aa >= z.Gg ? a.ext.yE(b, c) : a.Sl(b,
            c)
    };
    k.UT = function (a) {
        return a.Aa >= z.Gg ? 0 : a.Hr()
    };
    k.RU = function (a, b) {
        a.Aa >= z.Gg || a.At(b)
    };
    k.FM = function (a) {
        null != a.D && (a.D.Yw(), a.D.P |= u.Uh, a.D.tt = 0)
    };
    k.EM = function (a) {
        null != a.D && (a.D.jp(), a.D.P &= ~u.Uh, a.D.tt = 0)
    };
    k.kc = function (a, b) {
        null != a.A ? a.A.pa.kc(b) : a.w != b && (a.w = b, null != a.b && (a.b.N = !0, a.b.Wa = !0))
    };
    k.lc = function (a, b) {
        null != a.A ? a.A.pa.lc(b) : a.u != b && (a.u = b, null != a.b && (a.b.N = !0, a.b.Wa = !0))
    };
    k.uL = function (a, b) {
        if (0 == a) return 0 <= b ? 24 : 8;
        if (0 == b) return 0 <= a ? 0 : 16;
        var c, d = !1,
            e = !1;
        0 > a && (d = !0, a = -a);
        0 > b &&
            (e = !0, b = -b);
        c = 256 * a / b;
        var f;
        for (f = 0; !(c >= O.Zl[f]); f += 2);
        c = O.Zl[f + 1];
        e && (c = -c + 32 & 31);
        d && (c = (-(c - 8 & 31) & 31) + 8 & 31);
        return c
    };
    k.prototype = {
        ON: function (a) {
            this.B = a
        },
        dv: function () {
            this.H = Array(this.B.bh);
            this.i = this.B.xo;
            this.Lf = 0;
            var a;
            for (a = this.h.zc.BB(); null != a; a = this.h.zc.FB()) a.$e >= z.Qb && this.Lf++;
            this.Sx = -1 == this.B.ss ? this.h.Ec & 65535 : this.B.ss;
            this.Nl = Array(Math.round(this.B.bh / 32 + 1));
            this.Ml = new Q;
            this.th = this.B.bh;
            this.$x = this.i.dD;
            this.B.uj = 0;
            this.B.vj = 0;
            this.ca = this.B.uj;
            this.fa = this.B.vj;
            this.rt =
                this.qt = 0;
            this.$d = this.B.cs.right; - 1 == this.$d && (this.$d = 2147479552);
            this.ae = this.B.cs.bottom; - 1 == this.ae && (this.ae = 2147479552);
            this.ay = this.Bb = this.ub = 0;
            this.Yc &= k.lH;
            this.Yc |= k.jH;
            this.tn = 0;
            this.mt = Array(k.Bq);
            this.Ie = null;
            this.Yc |= k.mH;
            this.ma = Array(k.wu);
            this.un = Array(k.wu);
            this.nt = new xa;
            this.nt.code = 0;
            this.ht = Array(4);
            this.gt = Array(4);
            this.kn = Array(4);
            this.Pc = Array(4);
            for (a = this.Oc = 0; a < k.Bq; a++) this.mt[a] = 50;
            this.nv = this.Ws = !1;
            this.B.aE = !0
        },
        Wv: function () {
            this.B.aE = !1;
            this.Ie = this.Ml = this.Nl =
                this.X = this.H = null;
            var a;
            for (a = 0; a < k.wu; a++) this.ma[a] = 0;
            this.nt = null
        },
        IL: function (a) {
            this.dv();
            this.h.ii = 0;
            if (null == this.h.Ha && this.h.dk)
                if (this.B.Ea == E.eI) null == this.h.Ea && (this.h.Ea = new v(this.h), this.h.Ea.gC()), this.h.Ea.reset(0), this.h.OE();
                else if (this.B.Ea != E.fI) {
                var b = 0;
                0 != (this.B.Im & E.$H) && (b = v.Eg);
                0 != (this.B.Im & E.aI) && (b |= v.Fg);
                0 != (this.B.Im & E.bI) && (b |= v.hz);
                0 != (this.B.Im & E.AQ) && (b |= v.EQ);
                this.B.Ea == E.gI && (b |= v.Ui);
                0 != (b & (v.Eg | v.Fg | v.Ui)) && (this.h.OE(b), this.h.Ea.reset(b));
                this.B.Ea == E.dI &&
                    this.h.$N()
            }
            this.Yx = 255;
            a && (this.Yc |= k.Qn);
            this.nw();
            this.gn(-1, !1);
            this.xx();
            this.Xb = 0;
            this.Bv(a);
            this.Nv();
            this.DL();
            this.Cw();
            this.i.yx();
            this.i.kr(this);
            this.fy();
            this.wn = 0;
            this.Ov();
            this.nv = !1
        },
        Kv: function () {
            if (0 < this.ug && null == this.h.dh) this.Ws && (1 == this.h.dl && (0 <= this.ot ? this.h.cd[this.ot] && (this.resume(), this.Bb = 0, this.i.We(-458755)) : this.h.dl && (this.resume(), this.Bb = 0, this.i.We(-458755))), this.h.dl = !1), null != this.Us && this.Us.yL(), a = this.Bb;
            else {
                this.h.fv |= p.wy;
                var a = this.ZK();
                this.h.fv &=
                    ~p.wy;
                0 != (this.Yc & k.Qn) && (this.lB = (new Date).getTime() - this.Ol, this.Vt(!0), this.i.Ot())
            }
            if (a == k.Aq || a == k.uu || a == k.zq) {
                this.h.Ag = document.createElement("canvas");
                this.h.Ag.width = this.h.va;
                this.h.Ag.height = this.h.Ca;
                var b = new Ha(this.h.Ag);
                this.h.frame.bs ? b.or(0, 0, this.va, this.Ca) : b.Mc(0, 0, this.va, this.Ca, this.Rg);
                b.Mc(0, 0, this.h.va, this.h.Ca, this.h.Rg);
                this.h.Ce.wb(b, 0, 0)
            }
            if (0 != a) switch (a) {
                case 5:
                    this.pause();
                    this.h.dl = !1;
                    this.Ws = !0;
                    a = 0;
                    break;
                case 101:
                    if (this.B.zT) break;
                    this.kB();
                    this.uw();
                    this.Vt(!1);
                    this.gn(-1, !1);
                    this.i.Ot();
                    this.Gr();
                    this.Wv();
                    this.B.uj = this.B.ww = this.Hl = 0;
                    this.B.vj = this.B.xw = this.Il = 0;
                    this.h.UD();
                    this.dv();
                    this.nw();
                    this.gn(-1, !1);
                    this.xx();
                    this.Bv(!1);
                    this.Nv();
                    this.Cw();
                    this.i.yx();
                    this.i.kr(this);
                    this.Ov();
                    this.fy();
                    this.wn = a = 0;
                    break;
                case 100:
                case -2:
                    this.i.We(-196611)
            }
            return this.Bb = a
        },
        YL: function (a) {
            var b;
            100 < this.Bb && (this.Bb = k.yq);
            b = this.wn;
            this.DN();
            this.uw();
            this.Vt(a);
            this.i.Ot();
            this.Wv();
            this.Gr();
            this.gn(-1, !0);
            this.h.OK();
            return m.tI(this.Bb, b)
        },
        nw: function () {
            var a;
            for (a = 0; a < this.th; a++) this.H[a] = null
        },
        xx: function () {
            var a, b;
            this.Yc |= k.kH;
            this.Yc |= k.pu;
            var c = this.Dp = 0;
            this.X = Array(this.Lf);
            this.ff = 0;
            for (a = this.h.zc.BB(); null != a; a = this.h.zc.FB())
                if (b = a.$e, b >= z.Qb) {
                    this.X[c] = new S;
                    this.X[c].qK(a);
                    this.X[c].jx = c;
                    this.X[c].qp = -1;
                    if (b == z.Th || b == z.Az)
                        for (a = this.B.Kd.Fr(); null != a; a = this.B.Kd.hp())
                            if (a.jg == this.X[c].fd) {
                                this.X[c].qp = a.wj;
                                break
                            } c++
                } this.i.bN(this.X);
            for (c = 0; c < this.B.uc; c++) this.B.Za[c].Ww = 1;
            return 0
        },
        DA: function () {
            var a, b, c, d, e;
            this.Yc &= ~k.Qn;
            c = 0;
            for (e =
                this.B.Kd.Fr(); null != e; c++, e = this.B.Kd.hp())
                if (a = this.h.zc.oj(e.jg), b = a.Bc, a = a.$e, !(a < z.Gg) && 0 == (b.hh & A.Fz) && (d = k.Ny, e.zw == Ca.Hz)) {
                    if (0 == (b.Bj & A.Rq)) {
                        if (a != z.Th) continue;
                        d |= k.Yl
                    }
                    0 == (b.hh & A.Cz) && this.Cr(e.wj, e.jg, 2147483648, 2147483648, -1, d, -1, -1)
                } this.i.kr(this);
            this.Ol = (new Date).getTime() - this.lB
        },
        Bv: function (a) {
            var b, c, d, e, f;
            d = 0;
            for (f = this.B.Kd.Fr(); null != f; d++, f = this.B.Kd.hp())
                if (b = this.h.zc.oj(f.jg), c = b.Bc, b = b.$e, e = k.Ny, f.zw == Ca.Hz) {
                    b == z.Th && (e |= k.Oy);
                    if (0 == (c.Bj & A.Rq)) {
                        if (b == z.Az) continue;
                        e |=
                            k.Yl
                    }
                    a && b >= z.Gg && 0 == (c.hh & A.Fz) || 0 == (c.hh & A.Cz) && this.Cr(f.wj, f.jg, 2147483648, 2147483648, -1, e, -1, -1)
                } this.Yc &= ~k.pu
        },
        uw: function () {
            var a;
            for (a = 0; a < this.th && 0 != this.ub; a++)
                if (null != this.H[a]) {
                    var b = this.H[a];
                    (32 > b.Aa || b.R.Kc != k.Fn) && this.Dr(a, !0)
                } for (a = 0; a < this.th && 0 != this.ub; a++) null != this.H[a] && (b = this.H[a], 32 <= b.Aa && b.R.Kc == k.Fn && this.Dr(a, !0))
        },
        Vt: function (a) {
            a || (0 == (this.h.Go & p.pH) ? this.h.mc.It() : this.h.mc.WL())
        },
        gn: function (a, b) {
            var c, d;
            d = -1 == a ? this.B.uc : a + 1;
            for (c = 0; c < d; c++) {
                var e = this.B.Za[c];
                e.reset();
                e.EK();
                b && e.QA()
            }
        },
        lr: function () {
            0 != this.ff && this.uE(-1)
        },
        Gr: function () {
            0 != this.ff && this.uE(0)
        },
        UA: function (a) {
            var b = 0,
                c, d = 0;
            for (c = 0; c < this.ub; c++) {
                for (; null == this.H[d];) d++;
                var e = this.H[d];
                d++;
                e != a && e.sa & A.Sf && (e = e.R.Vd.qd[e.A.Ql], e.ap == U.Lu && (b |= 1 << e.ml - 1))
            }
            b != this.ff && (0 != this.ff && this.Gr(), this.ff = b, 0 != this.ff && this.lr())
        },
        MM: function (a) {
            var b = this.ff;
            a.sa & A.Sf && (a = a.R.Vd.qd[a.A.Ql], a.ap == U.Lu && (this.ff |= 1 << a.ml - 1, 0 == b && this.lr()))
        },
        uE: function (a) {
            0 <= a ? this.h.ey(1) : this.h.ey(-1)
        },
        fy: function () {
            this.h.ey(1)
        },
        bv: function (a) {
            var b, c;
            for (c = 0; c < this.Ml.size() && (b = this.Ml.get(c), !m.Gc(b.name, a)); c++);
            c == this.Ml.size() && (b = new vb, this.Ml.add(b), c = this.Ml.size() - 1, b.name = a, b.Oa = 0);
            return c
        },
        DN: function () {
            var a, b, c, d, e, f;
            for (c = 0; c < this.X.length; c++)
                if (b = this.X[c], f = b.lb, 32767 != b.fd && 0 == (f & 2147483648) && (d = this.h.zc.oj(b.fd), 0 != (d.ui & z.Gz) && (a = this.H[f], b.rd == z.Th || b.rd == z.Xn || null != a.S))) {
                    e = b.Hj + b.rd.toString();
                    null == this.h.bj && (this.h.bj = new Q);
                    var g = !1;
                    d = null;
                    for (a = 0; a < this.h.bj.size(); a++)
                        if (d = this.h.bj.get(a),
                            e == d.name) {
                            g = !0;
                            break
                        } 0 == g ? (d = new jf, d.name = e, d.Ze = new Q, this.h.bj.add(d)) : d.Ze.clear();
                    for (;;) {
                        a = this.H[f];
                        if (b.rd == z.Th) f = new lf, f.text = a.Ki, f.xb = a.xb, d.Ze.add(f);
                        else if (b.rd == z.Xn) f = new kf, f.value = a.ya, f.xb = a.xb, f.Zc = a.Zc, f.wt = a.wt, f.vt = a.vt, d.Ze.add(f);
                        else {
                            e = new mf;
                            e.Oa = a.S.Op;
                            e.values = Array(a.S.Ta.length);
                            for (f = 0; f < a.S.Ta.length; f++) e.values[f] = a.S.Ta[f];
                            e.fb = Array(a.S.be.length);
                            for (f = 0; f < a.S.be.length; f++) e.fb[f] = a.S.be[f];
                            d.Ze.add(e)
                        }
                        f = a.bc;
                        if (0 != (f & 2147483648)) break
                    }
                }
        },
        Cw: function () {
            var a,
                b, c, d, e, f;
            if (null != this.h.bj)
                for (c = 0; c < this.X.length; c++)
                    if (b = this.X[c], a = b.lb, 32767 != b.fd && 0 <= a && (e = this.h.zc.oj(b.fd), 0 != (e.ui & z.Gz)))
                        for (f = b.Hj + b.rd.toString(), d = 0; d < this.h.bj.size(); d++)
                            if (e = this.h.bj.get(d), f == e.name) {
                                for (d = 0;;) {
                                    a = this.H[a];
                                    if (b.rd == z.Th) f = e.Ze.get(d), a.Ki = f.text, a.xb = f.xb, a.b.N = !0, a.bT = !0;
                                    else if (b.rd == z.Xn) f = e.Ze.get(d), a.ya = f.value, a.xb = f.xb, a.Zc = f.Zc, a.wt = f.wt, a.vt = f.vt, a.ZS = !0, a.b.N = !0;
                                    else {
                                        f = e.Ze.get(d);
                                        a.S.Op = f.Oa;
                                        a.S.pj(f.values.length);
                                        a.S.wL(f.fb.length);
                                        var g;
                                        for (g =
                                            0; g < f.values.length; g++) a.S.Ta[g] = f.values[g];
                                        for (g = 0; g < f.fb.length; g++) a.S.be[g] = f.fb[g]
                                    }
                                    a = a.bc;
                                    if (0 != (a & 2147483648)) break;
                                    d++;
                                    if (d >= e.Ze.size()) break
                                }
                                break
                            }
        },
        Cr: function (a, b, c, d, e, f, g, h) {
            for (;;) {
                var q = new Id,
                    F = null; - 1 != a && (F = this.B.Kd.nL(a));
                var p = this.h.zc.oj(b),
                    m = p.Bc;
                0 == (m.Bj & A.Rq) && (f |= k.Yl);
                if (this.ub >= this.th) break;
                var n = null,
                    l = new M;
                switch (p.$e) {
                    case 2:
                        n = new Wd;
                        break;
                    case 3:
                        n = new $d;
                        break;
                    case 4:
                        n = new ae;
                        break;
                    case 5:
                        n = new Yd;
                        break;
                    case 6:
                        n = new Zd;
                        break;
                    case 7:
                        n = new ha;
                        break;
                    case 8:
                        break;
                    case 9:
                        n = new T;
                        break;
                    default:
                        n = new be(p.$e, this), null == n.ext && (n = null)
                }
                if (null == n) break;
                n.prototype = l;
                n.gM = F;
                if (0 > h)
                    for (h = 0; h < this.th && null != this.H[h]; h++);
                if (h >= this.th) break;
                this.H[h] = n;
                this.ub++;
                n.EL = m.Kc;
                n.sa = m.hh;
                h > this.ZD && this.Tx++;
                n.Tb = h;
                this.Dp++;
                0 == this.Dp && (this.Dp = 1);
                n.iw = this.Dp;
                n.uf = b;
                n.Rr = a;
                n.Aa = p.$e;
                this.HM(n);
                n.c = this;
                n.Lo = !0;
                n.R = m;
                a = n.Db;
                if (null != a.Ef)
                    for (p = a.jx, l = 0; l < a.Ef.length; l++) {
                        var r = a.Ef[l],
                            z = !1,
                            v, t = this.i.gd[r],
                            w = t.L.length;
                        for (v = 0; v < w; v += 2) {
                            if (0 > t.L[v + 1]) {
                                w = v;
                                break
                            }
                            if (t.L[v +
                                    1] == p) {
                                z = !0;
                                break
                            }
                        }
                        if (!z) {
                            r = this.i.hd[r];
                            z = -1;
                            for (v = 0; v < r.L.length; v += 2)
                                if (r.L[v + 1] == p) {
                                    z = v;
                                    break
                                } if (0 <= z) {
                                var P = !0;
                                if (0 <= t.L[0])
                                    for (z += 2; P && z < r.L.length; z += 2) {
                                        var C = r.L[z + 1];
                                        for (v = 0; 0 <= t.L[v + 1]; v += 2)
                                            if (t.L[v + 1] == C) {
                                                for (P = w; P > v; P -= 2) t.L[P] = t.L[P - 2], t.L[P + 1] = t.L[P - 1];
                                                t.L[v] = b;
                                                t.L[v + 1] = p;
                                                P = !1;
                                                break
                                            }
                                    }
                                P && (t.L[w] = b, t.L[w + 1] = p)
                            }
                        }
                    }
                0 == (n.sa & A.Dz) && (n.sa &= ~A.zk, 0 != (n.tf & S.Tq) && 0 != (this.B.cc & E.jz) && (n.sa |= A.zk), 0 != (n.tf & (S.ee | S.Uq)) && (n.sa |= A.zk));
                b = c;
                2147483648 == b && (b = F.Aw);
                q.pA = b;
                n.w = b;
                2147483648 == d && (d =
                    F.Bw);
                q.qA = d;
                n.u = d;
                null != F && -1 == g && (g = F.eC);
                q.oA = g;
                n.od = g;
                g = this.B.Za[g];
                g.Ww++;
                q.rA = g.Ww;
                q.pr = f;
                q.nA = e;
                q.hK = F;
                n.b = null;
                0 != (n.sa & (A.Xi | A.Sf | A.Yi)) && (n.b = new Xd, n.b.aa());
                n.A = null;
                0 != (n.sa & A.Sf) && (n.A = new Ia, 0 == (q.pr & k.Py) && n.A.aa(0, n, m, q, -1));
                n.Z = null;
                0 != (n.sa & A.Xi) && (n.Z = new Ma, n.Z.aa(n));
                n.D = null;
                0 != (n.sa & A.Yi) && (n.D = new u, n.D.FL(n, m, q));
                n.S = null;
                0 != (n.sa & A.NI) && (n.S = new Oa, n.S.aa(n, m, q));
                n.aa(m, q);
                0 != (n.sa & A.Yi) && n.D.Xr(!0);
                1 <= this.Xb && n.Yh();
                return h
            }
            return -1
        },
        Dr: function (a, b) {
            var c = this.H[a];
            if (null != c) {
                if (1 != b || 0 != c.iw) this.ZL(c), null != c.A && c.A.Jb(b), null != c.S && c.S.Jb(b), null != c.D && c.D.Jb(b), null != c.b && c.b.Jb(b), c.Jb(b), this.GM(c);
                this.H[a] = null;
                this.ub--
            }
        },
        $f: function (a) {
            this.Nl[Math.floor(a / 32)] |= 1 << (a & 31);
            this.Gp++
        },
        GK: function () {
            if (0 != this.Gp)
                for (var a = 0, b, c; a < this.th;) {
                    b = this.Nl[a / 32];
                    if (0 != b) {
                        for (c = this.Nl[a / 32] = 0; 0 != b && 32 > c; c++) {
                            if (0 != (b & 1)) {
                                var d = this.H[a + c];
                                if (null != d && 1 == d.Db.lh && (this.i.Cd(d, d.Aa | -2162688), d = d.Db, null != d.Ef)) {
                                    var e = d.jx,
                                        f;
                                    for (f = 0; f < d.Ef.length; f++) {
                                        var g,
                                            h = this.i.gd[d.Ef[f]];
                                        for (g = 0; g < h.L.length && 0 <= h.L[g]; g += 2)
                                            if (h.L[g + 1] == e) {
                                                for (; g < h.L.length - 2 && 0 <= h.L[g]; g += 2) h.L[g] = h.L[g + 2], h.L[g + 1] = h.L[g + 3];
                                                g < h.L.length && (h.L[g] = -1, h.L[g + 1] = -1);
                                                break
                                            }
                                    }
                                }
                                this.Dr(a + c, !1);
                                this.Gp--
                            }
                            b >>= 1
                        }
                        if (0 == this.Gp) break
                    }
                    a += 32
                }
        },
        ZL: function (a) {
            var b = 0,
                c, d;
            if (0 != (a.Y & M.fz))
                for (c = 0; c < this.ub; c++) {
                    for (; null == this.H[b];) b++;
                    d = this.H[b];
                    b++;
                    null != d.A && d.b.wc == U.uz && (d = d.A.pa, d.em == a && 1 == d.Fq && d.LE())
                }
        },
        Yh: function () {
            var a, b, c;
            for (c = a = 0; a < this.ub; a++) {
                for (; null == this.H[c];) c++;
                c++
            }
            for (c =
                a = 0; a < this.ub; a++) {
                for (; null == this.H[c];) c++;
                b = this.H[c];
                c++;
                b.Yh()
            }
        },
        HM: function (a) {
            var b = a.uf,
                c;
            for (c = 0; c < this.Lf && this.X[c].fd != b; c++);
            b = this.X[c];
            0 != (b.lb & 2147483648) ? (b.lb = a.Tb, a.Vg = c | 2147483648, a.bc = 2147483648) : (c = this.H[b.lb], a.Vg = c.Vg, c.Vg = a.Tb, a.bc = c.Tb, b.lb = a.Tb);
            a.jw = b.ix;
            a.Db = b;
            a.tf = b.Xd; - 1 == a.Rr ? a.Rr = b.qp : -1 == b.qp && (b.qp = a.Rr);
            b.lh += 1
        },
        GM: function (a) {
            var b = a.Db;
            --b.lh;
            var c;
            0 == (a.Vg & 2147483648) ? (c = this.H[a.Vg], 0 == (a.bc & 2147483648) ? (b = this.H[a.bc], null != c && (c.bc = a.bc), null != b && (b.Vg = a.Vg)) :
                null != c && (c.bc = 2147483648)) : 0 == (a.bc & 2147483648) ? (c = this.H[a.bc], null != c && (c.Vg = a.Vg, b.lb = c.Tb)) : b.lb = 2147483648
        },
        rG: function () {
            var a = this.ez();
            if (null != a) {
                var b = 0,
                    c;
                for (c = 0; c < this.ub; b++, c++) {
                    for (; null == this.H[b];) b++;
                    var d = this.H[b];
                    32 <= d.Aa && (d.R.Kc == k.ku || d.R.Kc == k.Wu || d.R.Kc == k.TI || d.R.Kc == k.Xq || d.R.Kc == k.vu ? d.ext.gN() : d.R.Kc == k.Fn && d.ext.gN())
                }
                for (c = b = 0; c < this.ub; b++, c++) {
                    for (; null == this.H[b];) b++;
                    d = this.H[b];
                    if (0 != (d.sa & A.Sf)) {
                        var e = !1;
                        d.b.wc == U.Sh && d.R.Vd.qd[d.A.Ql].Zr && (e = !0);
                        0 == e && 2 == d.Aa &&
                            a.fN(d)
                    }
                }
                for (c = b = 0; c < this.ub; b++, c++)
                    for (; null == this.H[b];) b++
            }
        },
        ez: function () {
            if (0 == this.XD) {
                this.XD = !0;
                this.Hi = null;
                var a = 0,
                    b;
                for (b = 0; b < this.ub; a++, b++) {
                    for (; null == this.H[a];) a++;
                    var c = this.H[a];
                    if (32 <= c.Aa && c.R.Kc == k.Fn) {
                        this.Hi = c.ext;
                        break
                    }
                }
            }
            return this.Hi
        },
        Rn: function (a) {
            return a && 0 == (a.Y & M.Pe) && 0 != (a.sa & A.Sf) && a.b.wc == U.Sh && a.R.Vd.qd[a.A.Ql].Zr ? a.A.pa.Gd : null
        },
        RJ: function (a) {
            if (a.R.Kc == k.ku || a.R.Kc == k.Wu || a.R.Kc == k.vu || a.R.Kc == k.Xq) {
                var b = 0,
                    c;
                for (c = 0; c < this.ub; b++, c++) {
                    for (; null == this.H[b];) b++;
                    var d = this.H[b];
                    32 <= d.Aa && d.R.Kc == k.Fn && (a.R.Kc == k.ku ? a.ext.identifier == d.ext.identifier && d.ext.AT.add(a.ext) : a.R.Kc == k.Wu ? a.ext.identifier == d.ext.identifier && d.ext.YU.add(a.ext) : a.R.Kc == k.vu ? a.ext.identifier == d.ext.identifier && d.ext.kU.add(a.ext) : a.R.Kc == k.Xq && a.ext.identifier == d.ext.identifier && d.ext.IU.add(a.ext))
                }
                if (a.R.Kc != k.Xq)
                    for (c = b = 0; c < this.ub; b++, c++) {
                        for (; null == this.H[b];) b++;
                        d = this.H[b];
                        d.Aa == z.Qb && (d = this.Rn(d)) && a.ext.yU(d)
                    }
            }
        },
        Ib: function (a) {
            return null != a.A && null != a.A.pa ? a.A.pa.Ib() :
                a.b.Pa
        },
        pause: function (a) {
            if (0 == this.ug) {
                this.ug = 1;
                this.VD = this.h.Ec;
                var b = 0,
                    c;
                for (c = 0; c < this.ub; c++) {
                    for (; null == this.H[b];) b++;
                    b++
                }
                a || this.h.mc.pause()
            }
        },
        resume: function () {
            if (!this.CM && 0 != this.ug) {
                this.ug = 0;
                this.lr();
                var a = 0,
                    b;
                for (b = 0; b < this.ub; b++) {
                    for (; null == this.H[a];) a++;
                    a++
                }
                this.h.mc.resume();
                a = this.h.Ec;
                a -= this.VD;
                this.Ol += a;
                this.ot = 0;
                this.Ws = !1
            }
        },
        kB: function () {
            this.h.mc.It()
        },
        ej: function () {
            var a = 0,
                b;
            for (b = 0; b < this.ub; b++) {
                for (; null == this.H[a];) a++;
                var c = this.H[a];
                a++;
                c.ej()
            }
        },
        Og: function (a,
            b, c) {
            a = this.sO(a, b, c);
            return null != a ? a.top : k.Pf
        },
        sO: function (a, b, c) {
            b -= this.ca;
            c -= this.fa;
            var d; - 1 == a ? (d = 0, a = this.B.uc) : (d = a, a += 1);
            for (; d < a; d++) {
                var e = this.B.Za[d].oL(b, c);
                if (null != e) return e
            }
            return null
        },
        Ov: function () {
            this.Ol = this.h.Ec;
            this.Gp = this.ay = this.Bb = this.Xb = this.vg = 0;
            var a;
            for (a = 0; a < (this.th + 31) / 32; a++) this.Nl[a] = 0;
            this.Kl = this.B.To;
            this.Ll = this.B.So;
            this.on = -k.bz;
            this.sn = -k.cz;
            this.mn = this.$d + k.bz;
            this.qn = this.ae + k.cz;
            this.Hl = a = this.ca;
            a -= k.In;
            0 > a && (a = this.on);
            this.nn = a;
            this.Il = a = this.fa;
            a -= k.Jn;
            0 > a && (a = this.sn);
            this.rn = a;
            a = this.ca;
            a += this.Kl + k.In;
            a > this.$d && (a = this.mn);
            this.ln = a;
            a = this.fa;
            a += this.Ll + k.Jn;
            a > this.ae && (a = this.qn);
            this.pn = a;
            for (a = this.ug = this.vn = this.kt = this.Jl = 0; 4 > a; a++) this.Pc[a] = 0, this.ht[a] = 0, this.kn[a] = 255;
            this.Fl = 0;
            this.i.qv = !1;
            this.i.Fp = !1;
            this.ot = 0;
            this.Hi = null;
            this.XD = !1;
            this.Ux = this.jt = this.it = this.YD = null;
            for (a = 0; a < k.Bq; a++) this.mt[a] = 20;
            this.tn = 0
        },
        ZK: function () {
            this.h.mc.fK();
            if (null != this.h.Ha && this.h.Yg) return this.Ol = this.h.Ec, this.vg = 0, this.Bb;
            if (null !=
                this.h.dh) return this.h.dh.handle(), 0;
            this.nv || (this.rG(), this.nv = !0);
            var a = this.h.Ec - this.Ol,
                b = this.vg;
            this.vg = a;
            this.Ip = a -= b;
            this.vn += a;
            this.Xb += 1;
            this.Oc = this.Ip * this.B.iC / 1E3;
            this.mt[this.tn] = a;
            this.tn++;
            this.tn >= k.Bq && (this.tn = 0);
            for (a = 0; 4 > a; a++) this.ht[a] = this.Pc[a];
            this.VL();
            1 == this.h.ii ? this.Pc[0] |= this.h.Ea.Jr() & this.Yx : 2 == this.h.ii && (this.Pc[0] |= this.h.Jr() & this.Yx);
            if (0 != this.ff)
                for (this.$v(), this.Fl = 0, this.h.cd[p.Tf] && (this.Fl |= 16), this.h.cd[p.nm] && (this.Fl |= 32), a = 0; a < this.$x; a++) 0 != (this.qU &
                    1) && (b = this.Pc[a] & 207, b |= this.Fl, this.Pc[a] = b);
            else this.$v();
            for (a = 0; 4 > a; a++)
                if (b = this.Pc[a] & k.XM[4 * this.$x + a], b &= this.kn[a], this.Pc[a] = b, b ^= this.ht[a], this.gt[a] = b, 0 != b)
                    if (b &= this.Pc[a], 0 != (b & 240)) this.i.Wx = a, b = this.gt[a], 0 != (b & 240) && (this.i.Gb = b, this.i.We(-196615)), 0 != (b & 15) && (this.i.Gb = b, this.i.We(-196615));
                    else {
                        var c = this.i.sc[this.i.ef[-z.zz] + 4];
                        0 != c && (this.i.Gb = b, this.i.nf(c, null))
                    } if (0 != this.ub) {
                a = this.ub;
                b = 0;
                do {
                    for (this.Tx = 0; null == this.H[b];) b++;
                    c = this.H[b];
                    c.QB = c.Qr;
                    c.Qr = null;
                    c.Lo && (this.ZD =
                        b, c.handle());
                    a += this.Tx;
                    b++;
                    a--
                } while (0 != a)
            }
            this.He++;
            this.i.oK();
            this.i.BL();
            this.i.$D && 0 == (this.Yc & k.Qn) && this.i.nf(0, null);
            this.i.AL();
            this.GK();
            this.doScroll();
            this.i.ft = -1;
            this.kt++;
            if (0 == this.Bb) return this.ay;
            this.Bb != k.Aq && this.Bb != k.uu && this.Bb != k.yq && this.Bb != k.zq && this.Bb != k.pI && this.Bb != k.lz || this.i.We(-65539);
            return this.Bb
        },
        VL: function () {
            var a;
            for (a = 0; 4 > a; a++) this.Pc[a] = 0;
            var b = this.h.gL();
            for (a = 0; 4 > a; a++) {
                var c;
                for (c = 0; c < p.Sn; c++) this.h.cd[b[a * p.Sn + c]] && (this.Pc[a] |= 1 << c)
            }
        },
        $v: function () {
            this.Sj =
                this.h.lg + this.ca - this.h.Bg;
            this.Tj = this.h.mg + this.fa - this.h.Cg
        },
        pg: function (a) {
            a.A.W = !1;
            k.Wz = !1;
            a.A.Lp = 0;
            var b, c;
            0 != (a.tf & S.Uq) && (b = this.Fx(a.b.Jx, a.b.Lx, a.b.Kx, a.b.Mx), 0 != b && (c = this.Fx(a.w - a.na, a.u - a.oa, a.w - a.na + a.K, a.u - a.oa + a.M), 0 == c && (b ^= c, 0 != b && (a.A.Lp |= Ia.AG, this.i.Gb = b, this.i.Cd(a, -720896 | a.Aa & 65535)))), b = this.Fx(a.w - a.na, a.u - a.oa, a.w - a.na + a.K, a.u - a.oa + a.M), 0 != (b & a.A.by) && (c = a.A.W, 0 != (b & k.Hh) ? a.A.pa.kc(a.w + this.$d) : 0 != (b & k.Ih) && a.A.pa.kc(a.w - this.$d), 0 != (b & k.Jh) ? a.A.pa.lc(a.u + this.ae) : 0 != (b &
                k.Gh) && a.A.pa.lc(a.u - this.ae), a.b.wc != U.Mu && a.b.wc != U.Sh && (a.A.W = c)), b = this.yl(a.b.Jx, a.b.Lx, a.b.Kx, a.b.Mx), b != k.MF && (c = this.yl(a.w - a.na, a.u - a.oa, a.w - a.na + a.K, a.u - a.oa + a.M), b = ~b & c, 0 != b && (a.A.Lp |= Ia.BG, this.i.Gb = b, this.i.Cd(a, -786432 | a.Aa & 65535))));
            0 != (a.tf & S.Tq) && (a.b.wc == U.Mu ? a.A.pa.AM() : this.Jk(a, a.b.Qa, a.b.cb, a.b.sb, a.b.tb, a.w, a.u, 0, E.ue) && this.i.Cd(a, -851968 | a.Aa & 65535));
            if (0 != (a.tf & S.$n) && (b = this.Um(a, a.b.Qa, a.b.cb, a.b.sb, a.b.tb, a.w, a.u, a.Db.Fj), null != b))
                for (c = 0; c < b.size(); c++) {
                    var d = b.get(c);
                    if (0 == (d.Y & M.Pe)) {
                        var e = a.Aa,
                            f = a,
                            g = d;
                        f.Aa > g.Aa && (f = d, g = a, e = f.Aa);
                        this.i.Gb = g.uf;
                        this.i.AN = g.Tb;
                        this.i.Cd(f, -917504 | e & 65535)
                    }
                }
            return k.Wz
        },
        Um: function (a, b, c, d, e, f, g, h) {
            var q = null;
            f -= a.na;
            var k = f + a.K;
            g -= a.oa;
            var p = g + a.M,
                n, m;
            if (0 != (a.Y & M.Kh) || 0 != (a.Y & M.Pe)) return q;
            var l = !1,
                r = null,
                v = -1;
            a.Aa == z.Qb && 0 == (a.D.P & u.Zi) && (l = !0);
            a.Aa == z.Qb && (v = a.D.Rl);
            var t = a.Y;
            a.Y |= M.Kh;
            var A = 0,
                w, P, C;
            if (null != h)
                for (A = 0; A < h.length; A += 2) {
                    w = h[A + 1];
                    if (0 > w) break;
                    for (var B = this.X[w].lb; 0 == (B & 2147483648);)
                        if (w = this.H[B], B = w.bc, 0 ==
                            (w.Y & M.Kh) && 0 == (w.Y & M.Pe) && (P = w.w - w.na, C = w.u - w.oa, P < k && P + w.K > f && C < p && C + w.M > g)) switch (w.Aa) {
                            case z.Qb:
                                (0 > v || 0 <= v && v == w.D.Rl) && 0 != (w.D.P & u.Ak) && (0 == l || 0 != (w.D.P & u.Zi) ? (null == q && (q = new Q), q.add(w)) : (null == r && (m = this.h.ia.Sb(b), null != m && (r = m.eg(0, c, d, e))), m = this.h.ia.Sb(w.b.Qa), null != m && (n = m.eg(0, w.b.cb, w.b.sb, w.b.tb)), null != r && null != n && r.bk(f, g, 0, n, P, C, 0) && (null == q && (q = new Q), q.add(w))));
                                break;
                            case z.Th:
                            case z.Xn:
                            case z.Nu:
                            case z.Ou:
                            case z.wz:
                                null == q && (q = new Q);
                                q.add(w);
                                break;
                            default:
                                null == q && (q = new Q),
                                    q.add(w)
                        }
                } else
                    for (h = 0; h < this.ub; h++) {
                        for (; null == this.H[A];) A++;
                        w = this.H[A];
                        A++;
                        if (0 == (w.Y & M.Kh) && (P = w.w - w.na, C = w.u - w.oa, P < k && P + w.K > f && C < p && C + w.M > g)) switch (w.Aa) {
                            case z.Qb:
                                (0 > v || 0 <= v && v == w.D.Rl) && 0 != (w.D.P & u.Ak) && (0 == l || 0 != (w.D.P & u.Zi) ? (null == q && (q = new Q), q.add(w)) : (null == r && (m = this.h.ia.Sb(b), null != m && (r = m.eg(0, c, d, e))), m = this.h.ia.Sb(w.b.Qa), null != m && (n = m.eg(0, w.b.cb, w.b.sb, w.b.tb)), null != r && null != n && r.bk(f, g, 0, n, P, C, 0) && (null == q && (q = new Q), q.add(w))));
                                break;
                            case z.Th:
                            case z.Xn:
                            case z.Nu:
                            case z.Ou:
                            case z.wz:
                                null ==
                                    q && (q = new Q);
                                q.add(w);
                                break;
                            default:
                                null == q && (q = new Q), q.add(w)
                        }
                    }
            a.Y = t;
            return q
        },
        Jk: function (a, b, c, d, e, f, g, h, q) {
            b = this.B.Za[a.od];
            switch (a.Aa) {
                case z.Qb:
                    if (0 == (a.D.P & u.Zi)) {
                        if (a = this.h.ia.Sb(a.b.Qa), null != a) return a = a.eg(K.sk, c, d, e), null != b.bk(a, f - this.ca, g - this.fa, h, q)
                    } else return f = f - a.na - this.ca, g = g - a.oa - this.fa, c = f + a.K, a = g + a.M, h = null != b.Jt(f, g, c, a, h, q);
                    return !1;
                default:
                    return f = f - a.na - this.ca, g = g - a.oa - this.fa, c = f + a.K, a = g + a.M, h = null != b.Jt(f, g, c, a, h, q)
            }
        },
        yl: function (a, b, c, d) {
            var e = 0;
            0 > a && (e |= k.Hh);
            0 > b && (e |= k.Jh);
            c > this.$d && (e |= k.Ih);
            d > this.ae && (e |= k.Gh);
            return k.Mz[e]
        },
        Fx: function (a, b, c, d) {
            var e = 15;
            a < this.$d && (e &= ~k.Ih);
            b < this.ae && (e &= ~k.Gh);
            0 < c && (e &= ~k.Hh);
            0 < d && (e &= ~k.Jh);
            return k.Mz[e]
        },
        random: function (a) {
            var b = 31415 * this.Sx + 1;
            this.Sx = b &= 65535;
            return b * a >>> 16
        },
        dw: function (a) {
            if (0 == a || -1 == a) return this.random(32);
            var b, c = 0,
                d = 0,
                e = a;
            for (b = 0; 32 > b; b++) 0 != (e & 1) && (d++, c = b), e >>>= 1;
            if (1 == d) return c;
            d = this.random(d);
            e = a;
            for (b = 0; 32 > b; b++) {
                if (0 != (e & 1) && (d--, 0 > d)) return b;
                e >>>= 1
            }
            return 0
        },
        Ve: function (a) {
            this.Vj =
                a.la;
            this.Dc = 0;
            this.rf = !1;
            return this.getExpression()
        },
        wa: function (a) {
            this.Vj = a.la;
            this.Dc = 0;
            this.rf = !1;
            return this.getExpression()
        },
        ew: function (a) {
            this.Vj = a.la;
            this.Dc = 0;
            this.rf = !1;
            return this.getExpression()
        },
        bl: function (a) {
            this.Vj = a.la;
            this.Dc = 0;
            this.rf = !1;
            return this.getExpression()
        },
        Nr: function () {
            this.rf = !1;
            var a = this.getExpression();
            return 0 > a ? Math.ceil(a) : Math.floor(a)
        },
        getExpression: function () {
            var a, b = this.ba;
            this.un[this.ba] = this.nt;
            do {
                this.ba++;
                this.io = !0;
                this.Vj[this.Dc].evaluate(this);
                this.io = !1;
                this.Dc++;
                do
                    if (a = this.Vj[this.Dc], 0 < a.code && 1310720 > a.code) a.code > this.un[this.ba - 1].code ? (this.un[this.ba] = a, this.Dc++, this.ba++, this.io = !0, this.Vj[this.Dc].evaluate(this), this.io = !1, this.Dc++) : (this.ba--, this.un[this.ba].evaluate(this));
                    else {
                        this.ba--;
                        if (this.ba == b) break;
                        this.un[this.ba].evaluate(this)
                    } while (1)
            } while (this.ba > b + 1);
            return this.ma[b + 1]
        },
        ZE: function (a, b, c) {
            a++;
            var d = 0,
                e;
            for (e = 0; e < this.ub; e++) {
                for (; null == this.H[d];) d++;
                var f = this.H[d];
                if (f.Aa == b) switch (b) {
                    case 5:
                        f.Ji == a &&
                            f.Ft(c);
                        break;
                    case 6:
                        f.Ji == a && f.Ft(c)
                }
                d++
            }
        },
        Oz: function (a, b) {
            var c = this.h.Dm();
            b != c[a] && (0 == b && 0 != c[a] && this.i.GD(0, -262151, 0, null, a), c[a] = b, this.ZE(a, z.Nu, b))
        },
        EB: function (a, b) {
            var c = this.i.ag(a);
            if (null == c) return b ? !0 : !1;
            var d = this.i.Wc,
                e = 0,
                f, g, h, q, k, n, p = new Q;
            for (f = 0; f < this.ub; f++) {
                for (; null == this.H[e];) e++;
                g = this.H[e];
                e++;
                h = g.w - g.na;
                q = g.u - g.oa;
                k = h + g.K;
                n = q + g.M;
                this.Sj >= h && this.Sj < k && this.Tj >= q && this.Tj < n && 0 == (g.Y & M.Pe) && (g.Aa == z.Qb ? 0 == (g.D.P & u.Zi) ? this.h.ia.Sb(g.b.Qa).eg(K.sk, 0, 1, 1).RE(this.Sj -
                    g.w, this.Tj - g.u, g.b.cb, g.b.sb, g.b.tb) && p.add(g) : p.add(g) : p.add(g))
            }
            if (0 == p.size()) return b ? !0 : !1;
            if (0 == b) {
                do {
                    for (e = 0; e < p.size() && (g = p.get(e), g != c); e++);
                    e == p.size() && (d--, this.i.md());
                    c = this.i.Te()
                } while (null != c);
                return 0 != d
            }
            do {
                for (e = 0; e < p.size(); e++)
                    if (g = p.get(e), g == c) return !1;
                c = this.i.Te()
            } while (null != c);
            return !0
        },
        WB: function (a) {
            var b = !1,
                c = 0;
            if (0 != (a.sa & A.Xi)) {
                if (null != a.D && a.D.GL()) return;
                null != a.Z && a.Z.Lg(B.ik) && (c = 1)
            }
            0 == c && (b = !0);
            b ? (a.Lo = !1, this.$f(a.Tb)) : (null != a.D && (a.D.zt(!1), a.Y |= M.Kh), null !=
                a.A && (a.A.Jb(!1), a.A.UB(a, U.yI, !1), a.b.ea = 0), 0 != (c & 1) && (a.Z.eo(B.ik), a.Z.jr()))
        },
        Nv: function () {
            var a, b = new aa,
                c;
            for (c = 0; c < this.B.uc; c++) {
                var d = this.B.Za[c],
                    e = 0 != (d.La & X.lu),
                    f = 0 != (d.La & X.mu),
                    g = d.zs,
                    h;
                for (h = 0; h < g; h++) {
                    a = this.B.Kd.DB(d.Bs + h);
                    a.es < z.Qb && (b.left = a.Aw, b.top = a.Bw);
                    var q;
                    q = new ka(this.h, b.left, b.top, a, null, 0);
                    q.xd(0, d);
                    e ? (q = new ka(this.h, this.B.ne + b.left, b.top, a, null, 0), q.xd(1, d), b.left + q.width > this.B.ne && (q = new ka(this.h, b.left - this.B.ne, b.top, a, null, 0), q.xd(4, d)), f && (q = new ka(this.h, b.left,
                        this.B.dd + b.top, a, null, 0), q.xd(2, d), q = new ka(this.h, this.B.ne + b.left, this.B.dd + b.top, a, null, 0), q.xd(3, d), b.top + q.height > this.B.dd && (q = new ka(this.h, b.left, b.top - this.B.dd, a, null, 0), q.xd(5, d)))) : f && (q = new ka(this.h, b.left, this.B.dd + b.top, a, null, 0), q.xd(2, d), b.top + q.height > this.B.dd && (q = new ka(this.h, b.left, b.top - this.B.dd, a, null, 0), q.xd(5, d)))
                }
            }
        },
        KN: function () {
            for (var a, b = this.Hl, c = this.Il, d, e, f = 0; f < this.B.uc; f++) {
                a = this.B.Za[f];
                d = b;
                e = c;
                0 != (a.La & (X.nu | X.ou)) && (0 != (a.La & X.nu) && (d *= a.ek), 0 != (a.La & X.ou) &&
                    (e *= a.gk));
                d += a.bt;
                e += a.ct;
                d += a.Pk;
                e += a.Rk;
                var g = 0 != (a.La & X.mu);
                0 != (a.La & X.lu) && (d %= this.B.ne, 0 > d && (d += this.B.ne));
                g && (e %= this.B.dd, 0 > e && (e += this.B.dd));
                a.x = d;
                a.y = e;
                a.bt += a.Pk;
                a.ct += a.Rk;
                a.vc.x = -d + this.h.Bg;
                a.vc.y = -e + this.h.Cg;
                a.Wb.x = -d + this.h.Bg;
                a.Wb.y = -e + this.h.Cg;
                a.Va.x = -d + this.h.Bg;
                a.Va.y = -e + this.h.Cg
            }
            this.B.uj = b;
            this.B.vj = c
        },
        DL: function () {
            var a;
            for (a = 0; a < this.B.uc; a++) {
                var b = this.B.Za[a];
                b.La & X.On && b.Pr()
            }
        },
        NN: function (a, b, c, d) {
            a -= Math.floor(this.Kl / 2);
            b -= Math.floor(this.Ll / 2); - 1 != c && c < this.B.uc &&
                (c = this.B.Za[c], 1 < c.ek && (a -= this.ca, a /= c.ek, a = m.Rd(this.ca + a)), 1 < c.gk && (b -= this.fa, b /= c.gk, b = m.Rd(this.fa + b)));
            0 > a && (a = 0);
            0 > b && (b = 0);
            c = a + this.Kl;
            var e = b + this.Ll;
            c > this.$d && (c = this.$d - this.Kl, 0 > c && (c = 0), a = c);
            e > this.ae && (e = this.ae - this.Ll, 0 > e && (e = 0), b = e);
            0 != (d & 1) && a != this.ca && (this.Hl = a, this.Jl |= k.Tu);
            0 != (d & 2) && b != this.fa && (this.Il = b, this.Jl |= k.Tu)
        },
        qO: function (a, b) {
            var c = !1;
            this.qt = a - this.ca;
            this.rt = b - this.fa;
            if (0 != this.qt || 0 != this.rt) c = !0;
            var d;
            if (!c)
                for (var e = 0; e < this.B.uc; e++)
                    if (d = this.B.Za[e],
                        0 != d.Pk || 0 != d.Rk) {
                        c = !0;
                        break
                    } var e = this.ca,
                f = this.fa,
                g = this.qt,
                h = this.rt;
            this.ca = a;
            this.nn = a - k.In;
            0 > this.nn && (this.nn = this.on);
            this.fa = b;
            this.rn = b - k.Jn;
            0 > this.rn && (this.rn = this.sn);
            this.ln = a + this.Kl + k.In;
            this.ln > this.$d && (this.ln = this.mn);
            this.pn = b + this.Ll + k.Jn;
            this.pn > this.ae && (this.pn = this.qn);
            if (c)
                for (var q = c = 0; q < this.ub; q++) {
                    for (; null == this.H[c];) c++;
                    var F = this.H[c];
                    c++;
                    if (0 != (F.sa & A.MI)) null == F.A ? (F.w += g, F.u += h) : (F.A.pa.kc(F.w + g), F.A.pa.lc(F.u + h));
                    else if (d = F.od, d < this.B.uc) {
                        var p = e,
                            n = f,
                            m = a,
                            l = b;
                        d = this.B.Za[d];
                        0 != (d.La & X.nu) && (p *= d.ek, m *= d.ek);
                        0 != (d.La & X.ou) && (n *= d.gk, l *= d.gk);
                        p = F.w + p - m + g - d.Pk;
                        d = F.u + n - l + h - d.Rk;
                        0 == (F.sa & A.Sf) ? (F.w = p, F.u = d) : (F.A.pa.kc(p), F.A.pa.lc(d));
                        F.Am()
                    }
                }
        },
        doScroll: function () {
            if (0 != (this.Jl & k.Tu)) {
                this.Jl = 0;
                var a = this.B.uj != this.Hl || this.B.vj != this.Il;
                if (!a)
                    for (var b = 0; b < this.B.uc; b++)
                        if (0 != this.B.Za[b].Pk || 0 != this.B.Za[b].Rk) {
                            a = !0;
                            break
                        } if (a)
                    for (this.KN(), this.qO(this.B.uj, this.B.vj), b = 0; b < this.B.uc; b++) this.B.Za[b].Pk = 0, this.B.Za[b].Rk = 0;
                this.Hl = this.ca;
                this.Il =
                    this.fa
            }
        },
        er: function (a, b, c, d, e, f) {
            d = this.B.Za[d];
            var g = new ka(this.h, b - this.ca + d.x, c - this.ca + d.y, null, a, e);
            g.xd(0, d);
            !f || e != ea.Qq && e != ea.Jg || null == this.Hi || (g.body = this.Hi.xU(pHo.w - this.ca + d.x, pHo.u - this.fa + d.y, pHo.b.Qa, e));
            f = 0 != (d.La & X.mu);
            0 != (d.La & X.lu) ? (g = new ka(this.h, this.B.ne + b - this.ca + d.x, c - this.fa + d.y, null, a, e), g.xd(1, d), b + g.width > this.B.ne && (g = new ka(this.h, b - this.ca + d.x - this.B.ne, c - this.fa + d.y, null, a, e), g.xd(4, d)), f && (g = new ka(this.h, b - this.ca + d.x, this.B.dd + c - this.fa + d.y, null, a, e), g.xd(2,
                d), g = new ka(this.h, this.B.ne + b - this.ca + d.x, this.B.dd + c - this.fa + d.y, null, a, e), g.xd(3, d), c + g.height > this.B.dd && (g = new ka(this.h, b - this.ca + d.x, c - this.fa + d.y - this.B.dd, null, a, e), g.xd(5, d)))) : f && (g = new ka(this.h, b - this.ca + d.x, this.B.dd + c - this.fa + d.y, null, a, e), g.xd(2, d), c + g.height > this.B.dd && (g = new ka(this.h, b - this.ca + d.x, c - this.fa + d.y - this.B.dd, null, a, e), g.xd(5, d)))
        },
        LM: function (a) {
            0 > a ? this.i.We(-720902) : this.i.We(-655366)
        },
        nB: function (a) {
            var b, c;
            if (0 != this.ub)
                for (b = 0; b < this.th; b++)
                    if ((c = this.H[b]) && c.Db.Hj ==
                        a) return this.Sv = c.Db.lh - 1, c;
            return null
        },
        oB: function (a) {
            if (a && this.Sv) {
                var b = a.Tb + 1;
                a = a.Db.Hj;
                for (var c;;) {
                    c = this.H[b];
                    if (null != c && c.Db.Hj == a) return this.Sv--, c;
                    b++
                }
            }
            this.Sv = 0;
            return null
        }
    };
    Id.Yl = 2;
    S.VR = 15;
    S.RI = 16;
    S.$n = 128;
    S.ee = 256;
    S.Tq = 512;
    S.Uq = 1024;
    S.WR = 2048;
    S.Vq = 4096;
    S.QI = 65535;
    S.prototype = {
        qK: function (a) {
            this.fd = a.op;
            this.rd = a.$e;
            var b = a.Bc;
            this.rl = b.Bj;
            this.pD = a.cx;
            this.oD = a.dx;
            this.Is = b.hh;
            this.Mb = 0;
            this.lb = -1;
            this.Xd = S.QI;
            null != a.ex && (this.Hj = a.ex);
            this.Ym = Array(8);
            for (a = 0; 8 > a; a++) this.Ym[a] =
                b.$w[a];
            this.Ef = null
        }
    };
    fa.xI = 0;
    fa.cR = 1;
    fa.fR = 2;
    fa.dR = 3;
    fa.$Q = 4;
    fa.aR = 5;
    fa.bR = 6;
    fa.ZQ = 7;
    fa.eR = 8;
    fa.gR = 9;
    fa.WQ = 0;
    fa.UQ = 1;
    fa.YQ = 2;
    fa.VQ = 3;
    fa.XQ = 4;
    fa.IF = 123456789;
    fa.prototype = {
        cI: function () {
            m_currentAngle = 0
        },
        aa: function (a) {
            this.G = a;
            this.O = this.G.c
        },
        Jb: function () {},
        move: function () {
            return !1
        },
        setPosition: function () {},
        kc: function () {},
        lc: function () {},
        stop: function () {},
        Ng: function () {},
        reverse: function () {},
        start: function () {},
        hf: function () {},
        xh: function () {},
        Le: function () {},
        Dt: function () {},
        Bt: function () {},
        bw: function () {
            return 0
        },
        Iv: function (a) {
            return this.G.A.Iv(this.G, a, 32)
        },
        fo: function (a) {
            this.G.b.Ge = a;
            null != this.G.Z && this.G.Z.lf()
        },
        Jr: function (a) {
            return this.G.c.Pc[a]
        },
        yt: function () {}
    };
    B.te = 0;
    B.Sc = 1;
    B.Ne = 2;
    B.lq = 3;
    B.ik = 4;
    B.JF = 5;
    B.mq = 6;
    B.vy = 7;
    B.uy = 8;
    B.ty = 9;
    B.Yt = 10;
    B.nq = 11;
    B.OO = 12;
    B.iO = [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    B.prototype = {
        load: function (a) {
            var b = a.U,
                c = Array(32),
                d;
            for (d = 0; 32 > d; d++) c[d] = a.l();
            this.fe = Array(32);
            this.Vh = Array(32);
            this.dj = Array(32);
            for (d = 0; 32 > d; d++) this.fe[d] = null, this.Vh[d] = 0, this.dj[d] = 0, 0 != c[d] && (this.fe[d] =
                new Jd, a.seek(b + c[d]), this.fe[d].load(a))
        },
        nc: function (a) {
            var b;
            for (b = 0; 32 > b; b++) null != this.fe[b] && this.fe[b].nc(a)
        },
        YJ: function (a) {
            var b, c, d, e, f;
            for (b = 0; 32 > b; b++)
                if (null == this.fe[b]) {
                    c = 0;
                    for (e = b + 1; 32 > c; c++, e++)
                        if (e &= 31, null != this.fe[e]) {
                            this.Vh[b] = e;
                            break
                        } d = 0;
                    for (f = b - 1; 32 > d; d++, f--)
                        if (f &= 31, null != this.fe[f]) {
                            this.dj[b] = f;
                            break
                        } e == f || c < d ? this.Vh[b] |= 64 : d < c && (this.dj[b] |= 64)
                } else 16 > a && 0 == B.iO[a] && (this.fe[b].av = this.fe[b].$u)
        }
    };
    Qa.QE = [B.lq, B.Sc, B.Ne, 0, B.Ne, B.te, 0, 0, B.Sc, B.te, 0, 0, B.te, B.Sc, B.Ne, 0,
        B.te, 0, 0, 0, B.te, B.Sc, B.Ne, 0, B.te, B.Sc, B.Ne, 0, B.Sc, B.Ne, B.te, 0, B.te, B.Sc, B.Ne, 0, B.Sc, B.Ne, B.te, 0, B.te, B.Sc, B.Ne, 0, B.te, B.Sc, B.Ne, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    Qa.prototype = {
        load: function (a) {
            var b = a.U;
            a.qa(2);
            this.Uf = a.l();
            var c = Array(this.Uf),
                d;
            for (d = 0; d < this.Uf; d++) c[d] = a.l();
            this.Vf = Array(this.Uf);
            this.cj = Array(this.Uf);
            for (d = 0; d < this.Uf; d++) this.Vf[d] = null, this.cj[d] = 0, 0 != c[d] && (this.Vf[d] = new B, a.seek(b + c[d]), this.Vf[d].load(a), this.cj[d] = 1);
            for (a = 0; a < this.Uf; a++)
                if (0 == this.cj[a]) {
                    b = !1;
                    if (12 >
                        a)
                        for (d = 0; 4 > d; d++)
                            if (0 != this.cj[Qa.QE[4 * a + d]]) {
                                this.Vf[a] = this.Vf[Qa.QE[4 * a + d]];
                                b = !0;
                                break
                            } if (0 == b)
                        for (d = 0; d < this.Uf; d++)
                            if (0 != this.cj[d]) {
                                this.Vf[a] = this.Vf[d];
                                break
                            }
                } else this.Vf[a].YJ(a)
        },
        nc: function (a) {
            var b;
            for (b = 0; b < this.Uf; b++) 0 != this.cj[b] && this.Vf[b].nc(a)
        }
    };
    Jd.prototype = {
        load: function (a) {
            this.av = a.nb();
            this.$u = a.nb();
            this.Pz = a.l();
            this.Qz = a.l();
            this.om = a.l();
            this.Ek = Array(this.om);
            var b;
            for (b = 0; b < this.om; b++) this.Ek[b] = a.l()
        },
        nc: function (a) {
            var b;
            for (b = 0; b < this.om; b++)
                if (null != a) {
                    var c =
                        a.Qg(this.Ek[b]); - 1 != c && (this.Ek[b] = c)
                }
        }
    };
    Ma.ev = [B.te, B.Sc, B.Ne, B.JF, B.mq, B.vy, B.uy, B.ty, B.Yt, B.nq, 12, 13, 14, 15, -1];
    Ma.prototype = {
        aa: function (a) {
            this.a = a;
            this.en = 0;
            this.VB(B.Sc);
            if (this.Lg(B.lq)) this.en = 1, this.eo(B.lq), this.jr(), this.fo();
            else {
                for (a = 0; 0 <= Ma.ev[a] && !this.Lg(Ma.ev[a]); a++);
                0 > Ma.ev[a] && this.Lg(B.ik) && (this.en = 2, this.eo(B.ik), this.jr(), this.fo())
            }
        },
        VB: function (a) {
            this.a.b.Ge = a;
            this.Ap = !1;
            this.bf = this.yp = this.zl = this.Mj = this.Ys = this.ph = 0;
            this.Zs = this.Lj = this.Bi = -1;
            this.zp = this.Fe = null;
            this.fo()
        },
        lf: function () {
            switch (this.en) {
                case 0:
                    return this.fo();
                case 1:
                    this.VJ();
                    break;
                case 2:
                    this.WJ()
            }
            return !1
        },
        fo: function () {
            var a = this.a.w;
            this.a.b.Nj = a;
            a -= this.a.na;
            this.a.b.Jx = a;
            a += this.a.K;
            this.a.b.Kx = a;
            a = this.a.u;
            this.a.b.Oj = a;
            a -= this.a.oa;
            this.a.b.Lx = a;
            a += this.a.M;
            this.a.b.Mx = a;
            this.a.b.at = this.a.b.Qa;
            this.a.b.$s = this.a.b.cb;
            return this.Wh(1)
        },
        Wh: function (a) {
            var b = this.a.R,
                c = this.a.b.ea,
                d = this.a.b.Ge;
            0 != this.Mj && (c = this.Mj - 1);
            d == B.Sc && (0 == c && (d = B.te), 75 <= c && (d = B.Ne));
            0 != this.ph && (d = this.ph -
                1);
            d != this.Bi && (this.Bi = d, d >= b.zj.Uf && (d = b.zj.Uf - 1), b = b.zj.Vf[d], b != this.Fe && (this.Fe = b, this.Xs = -1, this.bf = 0, 0 == (this.a.sa & A.LI) && (this.yp = 0)));
            var e, f = this.a.b.Pa % 32,
                b = !1;
            0 != this.Ys && (f = this.Ys - 1);
            if (this.Xs != f && (this.Xs = f, e = this.Fe.fe[f], null == e ? 0 != (this.Fe.dj[f] & 64) ? f = this.Fe.dj[f] & 63 : 0 != (this.Fe.Vh[f] & 64) ? f = this.Fe.Vh[f] & 63 : (e = f, 0 > this.Zs ? f = this.Fe.Vh[f] & 63 : (f -= this.Zs, f = 15 < (f & 31) ? this.Fe.Vh[e] & 63 : this.Fe.dj[e] & 63)) : this.Zs = f, e = this.Fe.fe[f], null != this.Fe.fe[0] && 0 != (this.a.R.Bj & A.II) && (this.a.b.cb =
                    360 * this.Xs / 32, e = this.Fe.fe[0], this.zp = null, b = !0), this.zp != e)) {
                this.zp = e;
                this.Al = e.Pz;
                this.LD = e.Qz;
                var f = e.av,
                    g = e.$u;
                if (f != this.Lj || g != this.dn) this.Lj = f, this.dn = g, this.KD = g - f, this.cn = f, this.Hx = -1;
                this.Yd = e.om;
                0 != this.zl && this.zl - 1 >= this.Yd && (this.zl = 0);
                this.bf >= this.Yd && (this.bf = 0);
                e = e.Ek[this.bf];
                0 == this.Ap && (this.a.b.Qa = e, e = this.a.c.h.ia.$k(e, this.a.b.cb, this.a.b.sb, this.a.b.tb), null != e && (this.a.K = e.width, this.a.M = e.height, this.a.na = e.Ja, this.a.oa = e.Ga, this.a.kw = e.Eh, this.a.lw = e.Fh), this.a.b.N = !0, this.a.b.Wa = !0);
                if (1 == this.Yd) {
                    0 == this.Lj && (this.Yd = 0);
                    e = this.a.b.Qa;
                    if (0 == e) return !1;
                    e = this.a.c.h.ia.$k(e, this.a.b.cb, this.a.b.sb, this.a.b.tb);
                    null != e && (this.a.K = e.width, this.a.M = e.height, this.a.na = e.Ja, this.a.oa = e.Ga, this.a.kw = e.Eh, this.a.lw = e.Fh);
                    return !1
                }
            }
            if (0 == a && 0 == this.zl || 0 == b && 0 == this.Yd && d != B.ik) return !1;
            a = this.KD;
            c != this.Hx && (this.Hx = c, 0 == a ? (this.cn = this.Lj, 0 != this.Mj && (this.cn = this.Mj - 1)) : (d = this.a.b.mb - this.a.b.Di, 0 == d ? 0 != this.Mj ? (a = a * c / 100 + this.Lj, a > this.dn && (a = this.dn)) : (a /= 2, a +=
                this.Lj) : (a = a * c / d + this.Lj, a > this.dn && (a = this.dn)), this.cn = a));
            e = this.zp;
            a = this.zl;
            if (0 == a) {
                if (0 == this.cn || this.Ap) return !1;
                c = this.yp;
                a = this.bf;
                d = this.cn;
                0 != (this.a.c.B.cc & E.bd) && (d = Math.round(d * this.a.c.Oc));
                for (c += d; 100 < c;)
                    if (c -= 100, a++, a >= this.Yd && (a = this.LD, 0 != this.Al && (this.Al--, 0 == this.Al))) {
                        this.bf = this.Yd - 1;
                        0 > this.bf && (this.bf = 0);
                        this.Yd = 0;
                        0 != this.ph && (this.Mj = this.Ys = this.ph = 0);
                        this.bf < e.om && (e = e.Ek[this.bf], e != this.a.b.Qa && (this.a.b.Qa = e, this.a.b.N = !0, this.a.b.Wa = !0));
                        this.yp = c;
                        if (0 != (this.a.c.Yc &
                                k.pu)) return !1;
                        b && (this.a.b.N = !0, this.a.b.Wa = !0, e = this.a.c.h.ia.$k(this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb), null != e && (this.a.K = e.width, this.a.M = e.height, this.a.na = e.Ja, this.a.oa = e.Ga, this.a.kw = e.Eh, this.a.lw = e.Fh));
                        b = -131072;
                        b |= this.a.Aa & 65535;
                        this.a.c.i.Gb = this.a.Z.Bi;
                        return this.a.c.i.Cd(this.a, b)
                    } this.yp = c
            } else a--;
            this.bf = a;
            this.a.b.N = !0;
            this.a.b.Wa = !0;
            e = e.Ek[a];
            if (this.a.b.Qa != e || this.MD != this.a.b.cb) this.a.b.Qa = e, this.MD = this.a.b.cb, 0 <= e && (e = this.a.c.h.ia.$k(e, this.a.b.cb, this.a.b.sb,
                this.a.b.tb), null != e && (this.a.K = e.width, this.a.M = e.height, this.a.na = e.Ja, this.a.oa = e.Ga, this.a.kw = e.Eh, this.a.lw = e.Fh));
            return !1
        },
        Lg: function (a) {
            return 0 == this.a.R.zj.cj[a] ? !1 : !0
        },
        jr: function () {
            0 == this.Al && (this.Al = 1)
        },
        eo: function (a) {
            this.ph = a + 1;
            this.Wh(0)
        },
        XJ: function () {
            this.ph = 0;
            this.Wh(0)
        },
        UJ: function (a) {
            0 > a && (a = 0);
            100 < a && (a = 100);
            this.Mj = a + 1;
            this.Wh(0)
        },
        TJ: function (a) {
            a >= this.Yd && (a = this.Yd - 1);
            0 > a && (a = 0);
            this.zl = a + 1;
            this.Wh(0)
        },
        VJ: function () {
            this.Wh(1);
            this.ph != B.lq + 1 && (this.Lg(B.te) || this.Lg(B.Sc) ||
                this.Lg(B.Ne) ? (this.en = 0, this.XJ()) : (this.en = 2, this.a.c.WB(this.a)))
        },
        WJ: function () {
            0 == (this.a.Y & M.Ti) && (this.Wh(1), this.ph != B.ik + 1 && this.a.c.$f(this.a.Tb))
        }
    };
    Kd.prototype = {
        Jv: function () {
            var a = this.app.Qj + "M" + m.Ao(this.handle, "png"),
                b = new Image;
            this.ia.Vb[this.handle] = b;
            var c = this;
            b.onload = function () {
                c.app.lj(c)
            };
            b.onerror = function () {
                c.app.lj(c)
            };
            b.src = a
        }
    };
    Ld.prototype = {
        yi: function (a) {
            this.file = a;
            this.Kb = this.file.l();
            this.ql = Array(this.Kb);
            a = this.file.l();
            var b, c, d = new ca;
            for (b = 0; b < a; b++) c = this.file.U,
                d.Lm(this.file), this.ql[d.handle] = c;
            this.Xa = Array(this.Kb);
            for (b = 0; b < this.Kb; b++) this.Xa[b] = 0;
            this.Da = null;
            this.mi = this.Kb;
            this.zf = 0;
            this.images = null
        },
        Sb: function (a) {
            return 0 <= a && a < this.mi && -1 != this.Da[a] ? this.images[this.Da[a]] : null
        },
        Up: function () {
            var a;
            for (a = 0; a < this.Kb; a++) this.ql[a] && (this.Xa[a] = 1)
        },
        Jf: function () {
            if (0 == (this.app.La & p.Qi) && 0 == (this.app.La & p.Xt)) {
                var a;
                for (a = 0; a < this.Kb; a++) this.Xa[a] = 0
            }
            this.wi = null
        },
        Zj: function (a) {
            this.Xa[a]++
        },
        Qg: function (a) {
            this.Zj(a);
            return -1
        },
        hC: function (a) {
            null ==
                this.Vb[a] && (null != this.wi && a < this.wi.length && null != this.wi[a] ? this.Vb[a] = this.wi[a] : (this.Vb[a] = new Kd(this, a), this.app.co(this.Vb[a])))
        },
        load: function (a) {
            var b;
            if (0 < this.app.qe)
                if (null == this.Vb) {
                    if (this.Vb = Array(this.app.qe), this.app.La & p.Qi)
                        for (b = 0; b < this.app.qe; b++) this.app.Vb[b] && this.hC(b)
                } else if (0 == (this.app.La & p.Qi)) {
                this.wi = Array(this.app.qe);
                for (b = 0; b < this.app.qe; b++) this.wi[b] = this.Vb[b];
                this.Vb = Array(this.app.qe);
                for (b = 0; b < this.app.qe; b++) this.Vb[b] = null
            }
            for (b = this.zf = 0; b < this.Kb; b++) 0 !=
                this.Xa[b] && this.zf++;
            b = Array(this.zf);
            var c = 0,
                d;
            for (d = 0; d < this.Kb; d++)
                if (0 != this.Xa[d]) {
                    if (null != this.images && -1 != this.Da[d] && null != this.images[this.Da[d]]) {
                        if (b[c] = this.images[this.Da[d]], b[c].Xa = this.Xa[d], null != this.Vb && null != this.wi) {
                            var e = b[c].Ab;
                            0 < e && (this.Vb[e] = this.wi[e])
                        }
                    } else 0 != this.ql[d] && (b[c] = new ca, a.seek(this.ql[d]), b[c].load(this.app), b[c].Xa = this.Xa[d]);
                    c++
                } this.images = b;
            this.Da = Array(this.Kb);
            for (b = 0; b < this.Kb; b++) this.Da[b] = -1;
            for (b = 0; b < this.zf; b++) this.images[b] && (this.Da[this.images[b].handle] =
                b);
            this.mi = this.Kb
        },
        fC: function (a) {
            var b;
            for (b = 0; b < a.length; b++)
                if (0 <= a[b] && a[b] < this.mi && 0 != this.ql[a[b]] && null == this.Sb(a[b])) {
                    var c, d = -1;
                    for (c = 0; c < this.zf; c++)
                        if (null == this.images[c]) {
                            d = c;
                            break
                        } if (-1 == d) {
                        var e = Array(this.zf + 10);
                        for (c = 0; c < this.zf; c++) e[c] = this.images[c];
                        for (; c < this.zf + 10; c++) e[c] = null;
                        d = this.zf;
                        this.zf += 10;
                        this.images = e
                    }
                    this.Da[a[b]] = d;
                    this.images[d] = new ca;
                    this.images[d].Xa = 1;
                    this.file.seek(this.ql[a[b]]);
                    this.images[d].load(this.app)
                }
        },
        $k: function (a, b, c, d) {
            var e;
            null == this.xi &&
                (this.xi = new ca);
            e = this.Sb(a);
            if (null != e) {
                a = e.width;
                var f = e.height,
                    g = e.Ja,
                    h = e.Ga,
                    q = e.Eh;
                e = e.Fh;
                0 == b ? (1 != c && (g *= c, q *= c, a *= c), 1 != d && (h *= d, e *= d, f *= d)) : (1 != c && (g *= c, q *= c, a *= c), 1 != d && (h *= d, e *= d, f *= d), null == this.Ci && (this.Ci = new aa), null == this.cl && (this.cl = new G), null == this.Fk && (this.Fk = new G), this.cl.x = g, this.cl.y = h, this.Fk.x = q, this.Fk.y = e, this.Ci.left = this.Ci.top = 0, this.Ci.right = a, this.Ci.bottom = f, this.KK(this.Ci, this.cl, this.Fk, b), a = this.Ci.right, f = this.Ci.bottom, g = this.cl.x, h = this.cl.y, q = this.Fk.x,
                    e = this.Fk.y);
                this.xi.width = a;
                this.xi.height = f;
                this.xi.Ja = g;
                this.xi.Ga = h;
                this.xi.Eh = q;
                this.xi.Fh = e;
                return this.xi
            }
            return e
        },
        KK: function (a, b, c, d) {
            var e, f, g;
            90 == d ? (d = 0, g = 1) : 180 == d ? (d = -1, g = 0) : 270 == d ? (d = 0, g = -1) : (g = d * Math.PI / 180, d = Math.cos(g), g = Math.sin(g));
            var h, q, k, p, n;
            null == b ? h = q = n = f = 0 : (k = -b.x * d, p = -b.x * g, n = -b.y * d, f = -b.y * g, h = k + f, q = n - p);
            e = null == b ? a.right : a.right - b.x;
            k = e * d;
            p = e * g;
            e = k + f;
            n -= p;
            var m;
            f = null == b ? a.bottom : a.bottom - b.y;
            m = k + f * g;
            f = f * d - p;
            var l, r;
            l = h + m - e;
            r = q + f - n;
            k = Math.min(h, Math.min(e, Math.min(m, l)));
            p = Math.min(q, Math.min(n, Math.min(f, r)));
            h = Math.max(h, Math.max(e, Math.max(m, l)));
            q = Math.max(q, Math.max(n, Math.max(f, r)));
            null != c && (null == b ? (e = c.x, f = c.y) : (e = c.x - b.x, f = c.y - b.y), c.x = e * d + f * g - k, c.y = f * d - e * g - p);
            null != b && (b.x = -k, b.y = -p);
            a.right = h - k;
            a.bottom = q - p
        }
    };
    ca.xM = 10;
    ca.wq = 1;
    ca.Pg = function (a, b) {
        var c = new ca;
        c.app = a;
        c.zb = new Image;
        c.zb.onload = function () {
            c.app.ei++;
            c.width = c.zb.width;
            c.height = c.zb.height
        };
        a.fi++;
        a.Yg = !0;
        c.zb.src = a.Qj + b;
        return c
    };
    ca.prototype = {
        Lm: function (a) {
            this.handle = a.l();
            a.qa(12)
        },
        Jv: function () {
            this.zb = new Image;
            var a = this;
            this.zb.onload = function () {
                a.app.lj(a)
            };
            this.zb.onerror = function () {
                a.app.lj(a)
            };
            this.zb.src = this.app.Qj + m.Ao(this.handle, "png")
        },
        load: function (a) {
            this.app = a;
            this.handle = a.file.l();
            this.width = a.file.l();
            this.height = a.file.l();
            this.Ja = a.file.$();
            this.Ga = a.file.$();
            this.Eh = a.file.$();
            this.Fh = a.file.$();
            this.Ab = 0;
            this.zb = null;
            null != this.app.frame.Yo ? (this.Ab = this.app.frame.Yo[this.handle], 0 != this.Ab ? (this.app.ia.hC(this.Ab), this.Ed = this.app.frame.Ed[this.handle],
                this.Fd = this.app.frame.Fd[this.handle]) : this.app.co(this)) : this.app.co(this)
        },
        createElement: function () {
            var a = document.createElement("div");
            a.style.width = this.width + "px";
            a.style.height = this.height + "px";
            a.style.backgroundRepeat = "no-repeat";
            0 == this.Ab ? a.style.backgroundImage = "url('" + this.zb.src + "')" : (a.style.backgroundPosition = "-" + this.Ed + "px -" + this.Fd + "px", a.style.backgroundImage = "url('" + this.app.Qj + "M" + m.Ao(this.Ab, "png") + "')");
            return a
        },
        eg: function (a, b, c, d) {
            if (0 == (a & K.tk)) {
                null == this.wf && (this.wf =
                    new K, this.Po & ca.wq ? this.wf.Dv(this.app, this, a) : this.wf.Cv(this.app, this, a));
                if (0 == b && 1 == c && 1 == d) return this.wf;
                null == this.ji && (this.ji = new Q);
                var e, f = 2147483647,
                    g = -1;
                for (e = 0; e < this.ji.size(); e++) {
                    a = this.ji.get(e);
                    if (b == a.angle && c == a.xc && d == a.yc) return a.T;
                    a.my < f && (f = a.my, g = e)
                }
                this.ji.size() < this.xM && (g = -1);
                a = new zf;
                a.T = new K;
                a.T.vK(this.wf, b, c, d);
                a.angle = b;
                a.xc = c;
                a.yc = d;
                a.my = this.app.Ec;
                0 > g ? this.ji.add(a) : this.ji.set(g, a);
                return a.T
            }
            null == this.kl && (null == this.wf && (this.wf = new K, this.Po & ca.wq ? this.wf.Dv(this.app,
                this, 0) : this.wf.Cv(this.app, this, 0)), this.kl = new K, this.Po & ca.wq ? this.kl.Dv(this.app, this, a) : this.kl.Cv(this.app, this, a));
            return this.kl
        }
    };
    Md.prototype = {
        yi: function (a) {
            var b = a.v(),
                c;
            this.pe = 0;
            var d = a.U,
                e = new Ba;
            for (c = 0; c < b; c++) e.Lm(a), this.pe = Math.max(this.pe, e.handle + 1);
            a.seek(d);
            this.Gs = Array(this.pe);
            for (c = 0; c < b; c++) d = a.U, e.Lm(a), this.Gs[e.handle] = d;
            this.Xa = Array(this.pe);
            for (c = 0; c < this.pe; c++) this.Xa[c] = 0;
            this.Da = null;
            this.ah = this.pe;
            this.li = 0;
            this.fonts = null
        },
        load: function (a) {
            var b;
            for (b = this.li =
                0; b < this.pe; b++) 0 != this.Xa[b] && this.li++;
            b = Array(this.li);
            var c = 0,
                d;
            for (d = 0; d < this.pe; d++) 0 != this.Xa[d] && (null != this.fonts && -1 != this.Da[d] && null != this.fonts[this.Da[d]] ? b[c] = this.fonts[this.Da[d]] : (b[c] = new Ba, a.seek(this.Gs[d]), b[c].load(a)), b[c].Xa = this.Xa[d], c++);
            this.fonts = b;
            this.Da = Array(this.pe);
            for (b = 0; b < this.pe; b++) this.Da[b] = -1;
            for (b = 0; b < this.li; b++) this.Da[this.fonts[b].handle] = b;
            this.ah = this.pe
        },
        dg: function (a) {
            return -1 == a ? this.ip : 0 <= a && a < this.ah && -1 != this.Da[a] ? this.fonts[this.Da[a]] : null
        },
        Ir: function (a) {
            return this.dg(a).kL()
        },
        Jf: function () {
            if (0 == (this.app.wT & p.Qi) && 0 == (this.app.La & p.Xt)) {
                var a;
                for (a = 0; a < this.pe; a++) this.Xa[a] = 0
            }
        },
        Up: function () {
            var a;
            for (a = 0; a < this.pe; a++) this.Gs[a] && (this.Xa[a] = 1)
        },
        Zj: function (a) {
            -1 == a ? null == this.ip && (this.ip = new Ba, this.ip.tr()) : this.Xa[a]++
        },
        Qg: function (a) {
            this.Zj(a);
            return -1
        },
        hr: function (a) {
            var b, c;
            for (c = 0; c < this.li && (null == this.fonts[c] || this.fonts[c].pb != a.pb || this.fonts[c].Ae != a.Ae || this.fonts[c].ze != a.ze || this.fonts[c].oe != a.oe); c++);
            if (c <
                this.li) return this.fonts[c].handle;
            c = -1;
            for (b = this.pe; b < this.ah && -1 != this.Da[b]; b++);
            if (-1 == c) {
                var d = Array(this.ah + 10);
                for (b = 0; b < this.ah; b++) d[b] = this.Da[b];
                for (; b < this.ah + 10; b++) d[b] = -1;
                c = this.ah;
                this.ah += 10;
                this.Da = d
            }
            d = -1;
            for (b = 0; b < this.li; b++)
                if (null == this.fonts[b]) {
                    d = b;
                    break
                } - 1 == d && (d = this.li, this.fonts.push(null));
            this.Da[c] = d;
            this.fonts[d] = new Ba;
            this.fonts[d].handle = c;
            this.fonts[d].pb = a.pb;
            this.fonts[d].Ae = a.Ae;
            this.fonts[d].ze = a.ze;
            this.fonts[d].oe = a.oe;
            return c
        }
    };
    Ba.prototype = {
        Lm: function (a) {
            this.handle =
                a.v();
            0 == a.yd ? a.qa(72) : a.qa(104)
        },
        load: function (a) {
            this.handle = a.v();
            var b = a.U;
            a.qa(12);
            this.pb = a.v();
            0 > this.pb && (this.pb = -this.pb);
            a.v();
            a.v();
            a.v();
            this.Ae = a.v();
            this.ze = a.nb();
            a.nb();
            a.nb();
            a.nb();
            a.nb();
            a.nb();
            a.nb();
            a.nb();
            this.oe = a.Nb();
            0 == a.yd ? a.seek(b + 72) : a.seek(b + 104)
        },
        kL: function () {
            var a = new Va;
            a.pb = this.pb;
            a.Ae = this.Ae;
            a.ze = this.ze;
            a.oe = this.oe;
            return a
        },
        tr: function () {
            this.oe = "Arial";
            this.pb = 13;
            this.Ae = 400;
            this.ze = 0
        },
        Ue: function () {
            return this.pb + Math.ceil(this.pb / 8)
        },
        cg: function () {
            if (null ==
                this.font) {
                this.font = this.ze ? "italic " : "normal ";
                var a = 100 * Math.floor(this.Ae / 100),
                    a = Math.max(a, 100),
                    a = Math.min(a, 900);
                this.font += a + " ";
                this.font += this.pb + "px ";
                this.font += this.oe
            }
            return this.font
        }
    };
    Nd.prototype = {
        yi: function (a) {
            this.file = a;
            this.Kb = this.file.l();
            this.Hs = Array(this.Kb);
            this.Xa = Array(this.Kb);
            this.Da = Array(this.Kb);
            for (a = 0; a < this.Kb; a++) this.Xa[a] = 0, this.Da[a] = -1;
            var b = this.file.l(),
                c = new Xa(this.app),
                d;
            for (a = 0; a < b; a++) d = this.file.U, c.Lm(), this.Hs[c.handle] = d;
            this.mi = this.Kb;
            this.gp =
                0;
            this.ak = null
        },
        qL: function (a) {
            return 0 <= a && a < this.mi && -1 != this.Da[a] ? this.ak[this.Da[a]] : null
        },
        Lr: function (a) {
            for (var b = 0; b < this.mi; b++)
                if (-1 != this.Da[b] && this.ak[this.Da[b]].name == a) return b;
            return -1
        },
        Jf: function () {
            if (0 == (this.app.La & p.Qi) && 0 == (this.app.La & p.Xt)) {
                var a;
                for (a = 0; a < this.Kb; a++) this.Xa[a] = 0
            }
        },
        Up: function () {
            var a;
            for (a = 0; a < this.Kb; a++) this.Hs[a] && (this.Xa[a] = 1)
        },
        Zj: function (a) {
            this.Xa[a]++
        },
        Qg: function (a) {
            this.Zj(a);
            return -1
        },
        load: function () {
            var a;
            for (a = this.gp = 0; a < this.Kb; a++) 0 != this.Xa[a] &&
                this.gp++;
            a = Array(this.gp);
            var b = 0,
                c;
            for (c = 0; c < this.Kb; c++) 0 != this.Xa[c] && (null != this.ak && -1 != this.Da[c] && null != this.ak[this.Da[c]] ? a[b] = this.ak[this.Da[c]] : (a[b] = new Xa(this.app), this.file.seek(this.Hs[c]), a[b].load()), a[b].Xa = this.Xa[c], b++);
            this.ak = a;
            this.Da = Array(this.Kb);
            for (a = 0; a < this.Kb; a++) this.Da[a] = -1;
            for (a = 0; a < this.gp; a++) this.Da[this.ak[a].handle] = a;
            this.mi = this.Kb;
            this.Jf()
        }
    };
    Xa.prototype = {
        Lm: function () {
            this.handle = this.file.l();
            this.file.qa(5);
            var a = this.file.l();
            0 == this.file.yd ? this.file.qa(a) :
                this.file.qa(2 * a)
        },
        Jv: function () {
            var a, b = this.$b.mc.Ax & this.type;
            0 == b && (b = this.$b.mc.Lw & this.type);
            for (a = 0; 4 > a && !(b & 1 << a); a++);
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
                    var c = this,
                        d = new XMLHttpRequest;
                    d.open("GET", this.$b.Qj + m.Ao(this.handle, b), !0);
                    d.responseType = "arraybuffer";
                    d.addEventListener("load", function () {
                        c.response = d.response;
                        c.$b.mc.OJ(c)
                    });
                    d.send()
                } else this.yb = new Audio, this.yb.vU = "auto", c = this, this.yb.addEventListener("loadeddata",
                    function (a) {
                        c.$b.lj(c);
                        c.yb.removeEventListener("loadeddata", arguments.callee, !1)
                    }, !1), this.yb.addEventListener("error", function () {
                    c.$b.lj(c);
                    c.yb = null
                }, !1), this.yb.src = this.$b.Qj + m.Ao(this.handle, b), this.yb.load(), this.yb.autoplay = !1
            } else this.$b.lj(this)
        },
        load: function () {
            this.handle = this.file.l();
            this.type = this.file.nb();
            this.qo = this.frequency = this.file.v();
            var a = this.file.l();
            this.name = this.file.Nb(a);
            this.yb = null;
            this.$b.co(this)
        },
        qM: function () {
            this.handle = 9999;
            this.type = 4;
            this.qo = this.frequency =
                4E4;
            this.name = "";
            this.yb = null;
            this.$b.co(this)
        },
        vl: function (a, b) {
            a || (a = 0);
            b || (b = this.frequency);
            if (this.yb) this.yb.volume = this.volume / 100, this.qo = b, this.yb.playbackRate = b / this.frequency, this.yb.duration && (this.yb.currentTime = 0), this.yb.play();
            else if (this.buffer) {
                this.source = this.context.createBufferSource();
                this.source.buffer = this.buffer;
                0 == this.tm ? (this.source.gain.value = this.volume / 100, this.source.connect(this.context.destination)) : (this.gain = this.context.createGain(), this.source.connect(this.gain),
                    this.gain.connect(this.context.destination), this.gain.gain.value = this.volume / 100);
                a || (a = 0);
                b || (b = this.frequency);
                this.qo = b;
                this.source.playbackRate.value = b / this.frequency;
                this.startTime = Date.now() - a;
                "undefined" !== typeof this.source.start ? this.source.start(0, a / 1E3) : this.source.noteOn(a);
                var c = this;
                this.source.onended = function () {
                    c.Vz = !0
                }
            }
            this.Gk = !1;
            this.gj = !0;
            this.Vz = !1
        },
        play: function (a, b, c) {
            this.ni = a;
            0 == this.ni && (this.ni = 1E7);
            this.volume = c;
            this.vl()
        },
        stop: function () {
            this.yb ? this.yb.pause() : this.source &&
                this.gj && ("undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0), this.source.onended = null);
            this.gj = this.ko = !1
        },
        UN: function (a) {
            this.volume = a;
            this.yb ? this.yb.volume = a / 100 : this.source && (this.gain ? this.gain.gain.value = a / 100 : this.source.gain.value = a / 100)
        },
        pause: function () {
            this.Gk || (this.yb ? this.yb.pause() : this.source && (this.source.onended = null, "undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0), this.UM = Date.now() - this.startTime), this.Gk = !0)
        },
        resume: function () {
            this.Gk &&
                (this.yb ? this.yb.play() : this.source && this.vl(this.UM), this.Gk = !1)
        },
        RL: function () {
            return this.Gk
        },
        aC: function () {
            return (this.yb || this.source) && this.gj ? !0 : !1
        },
        setPosition: function (a) {
            this.yb ? this.yb.currentTime = a / 1E3 : this.source && (this.gj && (this.source.onended = null, "undefined" !== typeof this.source.stop ? this.source.stop(0) : this.source.noteOff(0)), this.vl(a))
        },
        eK: function () {
            if (1 == this.gj && 0 == this.Gk)
                if (this.yb) {
                    if (this.yb.ended) {
                        if (0 < this.ni && (this.ni--, 0 < this.ni)) return this.vl(0, this.qo), !1;
                        this.gj =
                            this.ko = !1;
                        return !0
                    }
                } else if (this.source && (3 == this.source.playbackState || this.Vz)) {
                if (0 < this.ni && (this.ni--, 0 < this.ni)) return this.vl(0, this.qo), !1;
                this.gj = this.ko = !1;
                return !0
            }
            return !1
        }
    };
    lb.prototype = {
        xy: function (a) {
            this.$M[this.position++] = a
        }
    };
    J.Oe = 80;
    J.pq = 52;
    J.VF = J.Oe;
    J.WF = J.VF + 1 - J.pq;
    J.Oq = 4;
    J.cu = 199 + J.Oe;
    J.XF = J.cu + 1 - J.Oq - J.pq;
    J.SI = 256;
    J.CG = 1;
    J.dT = function (a, b) {
        var c = b >> 5,
            d = 1 << (b & 31),
            e = 0 != (a[c] & d);
        a[c] |= d;
        return e
    };
    J.SK = function (a) {
        return a.Hb + 0
    };
    J.kf = function (a) {
        a &= 65535;
        return 0 != (a & 32768) ? a -
            65536 : a
    };
    J.ju = function (a) {
        return a >> 16
    };
    J.Zk = function (a) {
        return a & 4294901760
    };
    J.prototype = {
        ag: function (a) {
            var b;
            this.Wc = 0;
            this.qh = null;
            this.rh = -1;
            if (0 != (a & 32768)) return 32767 == (a & 32767) ? null : this.dN(a);
            var c = this.o.X[a];
            if (c.Mb == this.Ob) {
                if (0 != (c.hb & 2147483648)) return null;
                b = this.o.H[c.hb];
                this.Gi = null;
                this.El = c;
                this.Kf = b;
                this.Ep = a
            } else {
                c.Mb = this.Ob;
                if (this.sh) return c.hb = -1, c.Id = 0, null;
                c.hb = c.lb;
                if (0 != (c.lb & 2147483648)) return c.Id = 0, null;
                var d = c.lb;
                do b = this.o.H[d], d = b.bc, b.qc = d; while (0 == (d & 2147483648));
                b = this.o.H[c.lb];
                this.Gi = null;
                this.El = c;
                this.Kf = b;
                this.Ep = a;
                c.Id = c.lh
            }
            this.Wc = c.Id;
            return b
        },
        dN: function (a) {
            var b, c, d = 0,
                e = 0;
            for (a = this.gd[a & 32767]; e < a.L.length;) {
                c = a.L[e + 1];
                if (0 > c) break;
                c = this.o.X[c];
                if (c.Mb == this.Ob) b = 0, 0 == (c.hb & 2147483648) && (b = c.Id, null == this.qh && (this.qh = a, this.rh = e));
                else if (b = 0, c.Mb = this.Ob, this.sh) c.hb = -1, c.Id = 0;
                else if (c.hb = c.lb, 0 != (c.lb & 2147483648)) c.Id = 0;
                else {
                    null == this.qh && (this.qh = a, this.rh = e);
                    b = c.lb;
                    do b = this.o.H[b], b = b.qc = b.bc; while (0 == (b & 2147483648));
                    b = c.Id = c.lh
                }
                d +=
                    b;
                e += 2
            }
            a = this.qh;
            return null != a ? (c = this.o.X[a.L[this.rh + 1]], this.Gi = null, this.El = c, this.Kf = b = this.o.H[c.hb], this.Ep = a.L[this.rh + 1], this.Wc = d, b) : null
        },
        Te: function () {
            var a = this.Kf,
                b;
            if (null == a && (b = this.o.X[this.Ep], 0 == (b.hb & 2147483648))) return a = this.o.H[b.hb], this.Gi = null, this.El = b, this.Kf = a;
            if (null != a && 0 == (a.qc & 2147483648)) return this.Gi = a, this.El = null, this.Kf = a = this.o.H[a.qc];
            if (null == this.qh) return null;
            do {
                this.rh += 2;
                if (this.rh >= this.qh.L.length) return null;
                a = this.qh.L[this.rh + 1];
                if (0 > a) return null;
                b = this.o.X[a]
            } while (0 != (b.hb & 2147483648));
            this.Gi = null;
            this.El = b;
            this.Kf = a = this.o.H[b.hb];
            this.Ep = this.qh.L[this.rh + 1];
            return a
        },
        TK: function (a) {
            a = this.gd[a & 32767];
            for (var b = 0, c; b < a.L.length;) {
                c = a.L[b + 1];
                if (0 > c) break;
                c = this.o.X[c];
                c.Mb != this.Ob && (c.Mb = this.Ob, c.Id = 0, c.hb = -1);
                b += 2
            }
        },
        md: function () {
            --this.Kf.Db.Id;
            null != this.Gi ? (this.Gi.qc = this.Kf.qc, this.Kf = this.Gi) : (this.El.hb = this.Kf.qc, this.Kf = null)
        },
        Vk: function (a) {
            var b = a.Db;
            if (b.Mb != this.Ob) b.Mb = this.Ob, b.hb = a.Tb, b.Id = 1, a.qc = -1;
            else {
                var c = b.hb;
                if (0 != (c & 2147483648)) b.hb = a.Tb, b.Id += 1, a.qc = -1;
                else {
                    do {
                        if (a.Tb == c) return;
                        b = this.o.H[c];
                        c = b.qc
                    } while (0 == (c & 2147483648));
                    b.qc = a.Tb;
                    a.qc = -1;
                    a.Db.Id += 1
                }
            }
        },
        SA: function (a) {
            a = this.o.X[a];
            a.Mb = this.Ob;
            a.hb = -1;
            a.Id = 0
        },
        UK: function (a, b) {
            if (0 == (a & 32768)) this.SA(a);
            else {
                if (32767 == (a & 32767)) return;
                var c = this.gd[a & 32767],
                    d;
                for (d = 0; d < c.L.length; d += 2) {
                    var e = c.L[d + 1];
                    if (0 > e) break;
                    this.SA(e)
                }
            }
            b.qc = -1;
            b.Db.hb = b.Tb;
            b.Db.Id = 1;
            b.Db.Mb = this.Ob
        },
        jB: function () {
            var a, b, c;
            for (b = 0; b < this.o.Lf; b++)
                if (c = this.o.X[b], c.Mb == this.Ob) {
                    if (c.hx !=
                        this.lt)
                        for (c.hx = this.lt, a = c.lb; 0 == (a & 2147483648);) a = this.o.H[a], a.mw = 0, a = a.bc;
                    for (a = c.hb; 0 == (a & 2147483648);) a = this.o.H[a], a.mw = 1, a = a.qc
                }
        },
        iB: function () {
            var a, b, c, d, e;
            for (d = 0; d < this.o.Lf; d++)
                if (e = this.o.X[d], e.hx == this.lt)
                    for (e.Mb = this.Ob, a = e.lb, c = null; 0 == (a & 2147483648);) b = this.o.H[a], 0 != b.mw && (null != c ? c.qc = a : e.hb = a, b.qc = -1, c = b), a = b.bc
        },
        fg: function (a) {
            if (this.Dl) return this.jn = !1, a = this.Mr(a);
            var b;
            if (0 == (a & 32768)) return b = this.o.X[a], b.Mb == this.Ob && 0 == (b.hb & 2147483648) ? this.o.H[b.hb] : 0 == (b.lb & 2147483648) ?
                this.o.H[b.lb] : null;
            a = this.gd[a & 32767];
            var c = 0;
            if (c >= a.L.length) return null;
            do {
                b = a.L[c + 1];
                if (0 > b) break;
                b = this.o.X[b];
                if (b.Mb == this.Ob && 0 == (b.hb & 2147483648)) return this.o.H[b.hb];
                c += 2
            } while (c < a.L.length);
            c = 0;
            do {
                b = a.L[c + 1];
                if (0 > b) break;
                b = this.o.X[b];
                if (0 == (b.lb & 2147483648)) return this.o.H[b.lb];
                c += 2
            } while (c < a.L.length);
            return null
        },
        vL: function (a, b) {
            this.jn = !0;
            var c = this.Mr(a);
            if (null != c) return 0 != this.Nc && (b.Ma |= Z.Pi, this.Rj = !0), c;
            b.Ma |= W.$l;
            return c
        },
        Ya: function (a) {
            a.Ma &= ~W.$l;
            this.jn = !0;
            var b = this.Mr(a.gb);
            if (null != b) return 0 != this.Nc && (a.Ma |= Z.Pi, this.Rj = !0), b;
            a.Ma |= W.$l;
            return b
        },
        Mr: function (a) {
            return 0 == (a & 32768) ? this.sL(a) : this.tL(a)
        },
        sL: function (a) {
            var b = this.o.X[a];
            if (b.fx != this.Cl) {
                b.fx = this.Cl;
                b.gx = this.Fi;
                if (b.Mb == this.Ob && 0 == (b.hb & 2147483648)) {
                    b.kh = b.hb;
                    a = this.o.H[b.hb];
                    b.Ij = a.qc;
                    if (0 != (a.qc & 2147483648)) return b.rg = !1, b.Gj = 1, this.Nc = !1, a;
                    b.rg = !0;
                    b.Gj = 2;
                    this.Nc = !0;
                    return a
                }
                if (this.jn && b.Mb == this.Ob) return b.Gj = 0, b.kh = -1, null;
                if (0 == (b.lb & 2147483648)) {
                    b.kh = b.lb;
                    a = this.o.H[b.lb];
                    if (null == a) return b.Gj =
                        0, b.kh = -1, null;
                    if (0 == (a.bc & 2147483648)) return b.Ij = a.bc, b.rg = !0, b.Gj = 3, this.Nc = !0, a;
                    b.rg = !1;
                    b.Gj = 1;
                    this.Nc = !1;
                    return a
                }
                b.Gj = 0;
                b.kh = -1;
                return null
            }
            if (b.gx != this.Fi) {
                var c;
                b.gx = this.Fi;
                switch (b.Gj) {
                    case 0:
                        return this.Nc = b.rg, null;
                    case 1:
                        return a = this.o.H[b.kh], this.Nc = b.rg, a;
                    case 2:
                        b.kh = b.Ij;
                        a = this.o.H[b.Ij];
                        if (null == a) return null;
                        c = a.qc;
                        0 != (c & 2147483648) && (b.rg = !1, c = b.hb);
                        b.Ij = c;
                        this.Nc = b.rg;
                        return a;
                    case 3:
                        b.kh = b.Ij;
                        a = this.o.H[b.Ij];
                        if (null == a) return null;
                        c = a.bc;
                        0 != (c & 2147483648) && (b.rg = !1, c = b.lb);
                        b.Ij = c;
                        this.Nc = b.rg;
                        return a
                }
            }
            if (0 > b.kh) return null;
            a = this.o.H[b.kh];
            this.Nc = b.rg;
            return a
        },
        tL: function (a) {
            var b, c = this.gd[a & 32767];
            if (c.Ts != this.Cl) {
                c.Ts = this.Cl;
                c.Bx = this.Fi;
                b = this.ID(c);
                if (0 <= b) {
                    c.mh = b;
                    a = this.o.H[b];
                    if (null == a) return c.Jj = 0, c.mh = -1, null;
                    b = a.qc;
                    if (0 != (b & 2147483648) && (b = this.Ex(c), 0 > b)) return c.Jj = 1, this.Nc = c.sg = !1, a;
                    c.Kj = b;
                    c.Jj = 2;
                    this.Nc = c.sg = !0;
                    return a
                }
                if (this.jn && c.Cx) return c.Jj = 0, c.mh = -1, null;
                b = this.HD(c);
                if (0 <= b && (c.mh = b, a = this.o.H[b], null != a)) {
                    b = a.bc;
                    if (0 != (b & 2147483648) &&
                        (b = this.Dx(c), 0 != (b & 2147483648))) return c.Jj = 1, this.Nc = c.sg = !1, a;
                    c.Kj = b;
                    c.Jj = 3;
                    this.Nc = c.sg = !0;
                    return a
                }
                c.Jj = 0;
                c.mh = -1;
                return null
            }
            if (c.Bx != this.Fi) switch (c.Bx = this.Fi, c.Jj) {
                case 0:
                    return this.Nc = c.sg, null;
                case 1:
                    return a = this.o.H[c.mh], this.Nc = c.sg, a;
                case 2:
                    return c.mh = c.Kj, a = this.o.H[c.Kj], null != a && (b = a.qc, 0 != (b & 2147483648) && (b = this.Ex(c), 0 > b && (c.sg = !1, b = this.ID(c))), c.Kj = b), this.Nc = c.sg, a;
                case 3:
                    return c.mh = c.Kj, a = this.o.H[c.Kj], null != a && (b = a.bc, 0 != (b & 2147483648) && (b = this.Dx(c), 0 != (b & 2147483648) &&
                        (c.sg = !1, b = this.HD(c))), c.Kj = b), this.Nc = c.sg, a
            }
            if (0 > c.mh) return null;
            a = this.o.H[c.mh];
            this.Nc = c.sg;
            return a
        },
        Ex: function (a) {
            for (var b = a.bn, c; b < a.L.length;) {
                c = a.L[b + 1];
                if (0 > c) break;
                c = this.o.X[c];
                if (c.Mb == this.Ob && (a.Cx = !0, 0 == (c.hb & 2147483648))) return a.bn = b + 2, c.hb;
                b += 2
            }
            return -1
        },
        ID: function (a) {
            a.bn = 0;
            a.Cx = !1;
            return this.Ex(a)
        },
        Dx: function (a) {
            for (var b = a.bn, c; b < a.L.length;) {
                c = a.L[b + 1];
                if (0 > c) break;
                c = this.o.X[c];
                if (0 == (c.lb & 2147483648)) return a.bn = b + 2, c.lb;
                b += 2
            }
            return -1
        },
        HD: function (a) {
            a.bn = 0;
            return this.Dx(a)
        },
        MK: function () {
            this.qv = !1;
            for (var a = this.o.it, b = this.o.jt;;) {
                for (var c = null, d = null, e = this.o.YD; null != e;) {
                    if (0 > e.index) {
                        (c = e.next) && (m.Gc(e.name, c.name) || (c = null));
                        break
                    }
                    d = e;
                    e = e.next
                }
                if (null == e) break;
                var f = -2686976,
                    g = -2686976,
                    h = null;
                0 < e.qg && (h = e.Ze[0].Aa == z.Qb ? this.Gf : this.Ff);
                null != h && (h = h.get(e.name), void 0 != h && (f = 65536 * -h), null != c && (h = null, 0 < c.qg && (h = c.Ze[0].Aa == z.Qb ? this.Gf : this.Ff), null != h && (h = h.get(c.name), void 0 != h && (g = 65536 * -h))));
                e.stop = !1;
                for (e.index = 0; e.index < e.qg; e.index++) {
                    this.o.it = e;
                    if (this.o.jt = c) c.index = e.index;
                    this.Dl = 0;
                    this.Cd(e.Ze[e.index], f);
                    if (e.stop) break
                }
                if (c)
                    for (c.index = 0; c.index < c.qg; c.index++) {
                        this.o.it = c;
                        if (this.o.jt = e) e.index = c.index;
                        this.Dl = 0;
                        this.Cd(c.Ze[c.index], g);
                        if (c.stop) break
                    }
                c && (e.next = c.next);
                null == d ? this.o.YD = e.next : d.next = e.next
            }
            this.o.it = a;
            this.o.jt = b
        },
        VK: function (a, b) {
            for (var c = 0; c < a.length; c += 2) {
                var d = this.o.X[a[c + 1]];
                if (d.Mb == this.Ob) {
                    var e = b.get(d);
                    void 0 != e ? e.length = 0 : (e = [], b.set(d, e));
                    for (d = d.hb; 0 <= d;) {
                        var f = this.o.H[d];
                        if (null == f) break;
                        0 == (f.Y &
                            M.Pe) && e.push(d);
                        d = f.qc
                    }
                }
            }
        },
        WK: function (a) {
            var b = this.nr.length,
                c = new Map;
            if (0 < b)
                for (var b = this.nr[b - 1], d = tb(b.keys()), e = d.next(); !e.done; e = d.next()) {
                    var e = e.value,
                        f = b.get(e).slice();
                    c.set(e, f)
                }
            this.VK(a.Fb, c);
            this.nr.push(c);
            this.nf(a.hB, null);
            this.nr.pop()
        },
        We: function (a) {
            var b = a & 65535;
            0 != (b & 32768) && (b = 65536 - b);
            a = this.sc[this.ef[b] + -(a >> 16)];
            0 != a && this.nf(a, null)
        },
        Cd: function (a, b) {
            this.st = b;
            var c = this.sc[a.jw + -(b >> 16)];
            return 0 != c ? (this.nf(c, a), !0) : !1
        },
        BL: function () {
            for (var a = !1, b = this.o.Ux; b;) {
                if (this.o.vg >=
                    b.Ec)
                    if (b.type == mb.EJ) {
                        this.o.i.Gb = b.name;
                        var c = this.sc[this.ef[-z.Yn] + N.vz];
                        0 != c && this.nf(c, null);
                        a = b.gv = !0
                    } else
                        for (0 == b.aq && (b.aq = this.o.vg); this.o.vg >= b.aq;) {
                            this.o.i.Gb = b.name;
                            this.o.i.Xx = b.index;
                            c = this.sc[this.ef[-z.Yn] + N.vz];
                            0 != c && this.nf(c, null);
                            b.index++;
                            b.js--;
                            if (0 == b.js) {
                                a = b.gv = !0;
                                break
                            }
                            b.aq += b.jO
                        }
                b = b.next
            }
            if (a)
                for (b = this.o.Ux, a = null; b;) c = b.next, b.gv ? null == a ? this.o.Ux = c : a.next = c : a = b, b = c
        },
        oK: function () {
            var a;
            if (0 != (this.o.Yc & k.Qn)) a = this.sc[this.ef[-z.Pq] + 1], 0 != a && (this.sc[this.ef[-z.Pq] +
                1] = -1, this.nf(a, null), this.Fp = !0);
            else {
                a = this.sc[this.ef[-z.Yn] + 3];
                0 != a && this.nf(a, null);
                a = this.sc[this.ef[-z.Pq] + 1];
                var b, c, d, e, f;
                if (0 != a) {
                    if (this.Fp) {
                        e = null;
                        b = a;
                        do {
                            d = this.oc[b];
                            if (d != e)
                                for (e = d, c = d.Hb; c < d.Hb + d.le; c++) f = d.bb[c], 0 == (f.Ma & W.$l) && (f.Ma |= W.rq);
                            b++
                        } while (null != this.oc[b])
                    }
                    this.nf(a, null);
                    this.sc[this.ef[-z.Pq] + 1] = 0;
                    if (this.Fp) {
                        e = null;
                        b = a;
                        do {
                            d = this.oc[b];
                            if (d != e)
                                for (e = d, c = d.Hb; c < d.Hb + d.le; c++) f = d.bb[c], f.Ma &= ~W.rq;
                            b++
                        } while (null != this.oc[b]);
                        this.Fp = !1
                    }
                }
                a = this.sc[this.ef[-z.Yn] + 2];
                0 != a &&
                    this.nf(a, null);
                a = this.sc[this.ef[-z.Yn] + 1];
                0 != a && this.nf(a, null)
            }
        },
        nf: function (a, b) {
            var c, d, e;
            this.WD = !1;
            do
                if (d = this.oc[a], 0 == (d.ra & L.tq))
                    if (this.df = d, this.pt[0] = 0, this.pt[1] = 0, this.pt[2] = 0, this.pt[3] = 0, 0 == (d.ra & L.gu)) {
                        this.Ob += 1;
                        this.sh = !1;
                        e = 0;
                        if (d.bb[e].za(this.o, b))
                            for (e++; e < d.Hb && 0 != d.bb[e].V(this.o); e++);
                        if (e == d.Hb)
                            if (this.WD) null != b && this.bK(b);
                            else if (this.rv(d), 0 != (d.ra & L.Ln)) break;
                        a++
                    } else {
                        this.lt++;
                        if (0 == (d.ra & L.Yy)) {
                            c = !1;
                            do {
                                this.Ob++;
                                this.sh = !1;
                                e = this.qf[a];
                                0 == d.bb[e].za(this.o, b) && (this.sh = !0);
                                for (e++; e < d.Hb && -1507329 != d.bb[e].ha;) 0 == d.bb[e].V(this.o) && (this.sh = !0), e++;
                                this.jB();
                                0 == this.sh && (c = !0);
                                a++;
                                d = this.oc[a];
                                if (null == d) break
                            } while (d == this.df)
                        } else {
                            var f;
                            c = this.sh = !1;
                            do {
                                this.Ob++;
                                f = !1;
                                e = this.qf[a];
                                if (d.bb[e].za(this.o, b))
                                    for (e++; e < d.Hb && -1572865 != d.bb[e].ha;) {
                                        if (0 == d.bb[e].V(this.o)) {
                                            f = !0;
                                            break
                                        }
                                        e++
                                    } else f = !0;
                                0 == f && (this.jB(), c = !0);
                                a++;
                                d = this.oc[a];
                                if (null == d) break
                            } while (d == this.df)
                        }
                        if (c && (this.Ob++, this.iB(), d = 0 != (this.df.ra & L.Ln), this.rv(this.df), d)) break
                    }
            else
            if (a++, null != this.oc[a])
                for (c =
                    this.oc[a]; c == d;) {
                    a++;
                    if (null == this.oc[a]) break;
                    c = this.oc[a]
                }
            while (null != this.oc[a])
        },
        rv: function (a) {
            this.xv = null;
            if (0 != (a.ra & L.Xy)) {
                0 != (a.ra & L.iu) && (this.Uj = new Q);
                if (0 != (a.ra & L.Nn)) {
                    var b = this.o.Xb,
                        c = a.nj;
                    a.nj = b;
                    if (b == c || b - 1 == c) return
                }
                if (0 != (a.ra & L.hu))
                    if (0 != a.zm) a.zm--;
                    else return;
                if (0 != (a.ra & L.Mn)) {
                    b = this.o.vg / 10;
                    c = a.zm;
                    if (0 != c && b < c) return;
                    a.zm = b + a.nj
                }
            }
            this.Cl++;
            this.Rj = !1;
            this.Fi = 0;
            this.Dl = !0;
            b = 0;
            do c = a.bb[b + a.Hb], 0 == (c.Ma & (W.Vy | W.rq)) && (c.Ma &= ~Z.Pi, c.ga(this.o)), b++; while (b < a.le);
            if (this.Rj) {
                do
                    for (this.Rj = !1, this.Fi++, b = 0; b < a.le; b++) c = a.bb[b + a.Hb], 0 != (c.Ma & Z.Pi) && (c.Ma &= ~Z.Pi, c.ga(this.o)); while (this.Rj)
            }
            b = this.xv;
            0 != (a.ra & L.Ln) && 0 != (a.ra & L.sq) && (b = null);
            this.xv = null;
            this.Dl = !1;
            null != this.Uj && this.PK();
            this.qv && this.MK();
            b && this.WK(b)
        },
        bK: function (a) {
            var b;
            b = a.uf;
            this.Ob += 1;
            this.Vk(a);
            this.Cl++;
            this.Rj = !1;
            this.Fi = 0;
            this.Dl = !0;
            var c = 0,
                d;
            do {
                a = this.df.bb[this.df.Hb + c];
                d = a.ha & 4294901760;
                if (262144 == d || 589824 == d)
                    if (b == a.Rb) a.ga(this.o);
                    else if (d = a.gb, 0 != (d & 32768)) {
                    var e = this.gd[d & 32767];
                    for (d = 0; d < e.L.length;) {
                        var f =
                            e.L[d];
                        if (0 > f) break;
                        if (f == b) {
                            a.ga(this.o);
                            break
                        }
                        d += 2
                    }
                }
                c++
            } while (c < this.df.le);
            this.Dl = !1
        },
        PK: function () {
            if (!(1 >= this.Uj.size())) {
                var a = this.o.random(this.Uj.size()),
                    b;
                do b = this.o.random(this.Uj.size()); while (a == b);
                a = this.Uj.get(a);
                b = this.Uj.get(b);
                var c = a.w,
                    d = a.u,
                    e = b.u;
                k.kc(a, b.w);
                k.lc(a, e);
                k.kc(b, c);
                k.lc(b, d);
                this.Uj = null
            }
        },
        sD: function (a, b) {
            var c;
            if (null != this.o && (this.o.$v(), 0 == this.o.ug && 0 != this.jo && (c = a, 2 == b && (c += J.SI), this.o.vn = 0, 0 == this.o.ff))) {
                this.ft = this.Gb = c;
                this.We(-262150);
                this.We(-327686);
                c = 0;
                var d, e, f, g, h, q, k = new Q;
                for (d = 0; d < this.o.ub; d++) {
                    for (; null == this.o.H[c];) c++;
                    e = this.o.H[c];
                    c++;
                    f = e.w - e.na;
                    g = e.u - e.oa;
                    h = f + e.K;
                    q = g + e.M;
                    this.o.Sj >= f && this.o.Sj < h && this.o.Tj >= g && this.o.Tj < q && 0 != (e.tf & S.ee) && 0 == (e.Y & M.Pe) && (e.Aa == z.Qb ? 0 == (e.D.P & u.Zi) ? this.$b.ia.Sb(e.b.Qa).eg(K.sk, 0, 1, 1).RE(this.o.Sj - e.w, this.o.Tj - e.u, e.b.cb, e.b.sb, e.b.tb) && k.add(e) : k.add(e) : k.add(e))
                }
                for (c = 0; c < k.size(); c++) e = k.get(c), this.Xx = e.uf, this.Vx = e, this.We(-393222)
            }
        },
        KM: function () {
            null != this.o && 0 != this.jo && (this.o.vn = 0, this.We(-524294))
        },
        tD: function () {
            0 != this.jo && 0 == this.o.ug && (this.o.vn = 0)
        },
        xA: function (a, b) {
            var c = this.o.X[a];
            if (c.Mb != this.Ob) {
                if (this.sh) return this.Wc = 0, null;
                for (c = c.lb; 0 == (c & 2147483648);) {
                    c = this.o.H[c];
                    if (null == c) break;
                    if (0 == (c.Y & M.Pe) && (this.Wc++, this.Wc == b)) return c;
                    c = c.bc
                }
                return null
            }
            for (c = c.hb; 0 == (c & 2147483648);) {
                c = this.o.H[c];
                if (null == c) break;
                if (0 == (c.Y & M.Pe) && (this.Wc++, this.Wc == b)) return c;
                c = c.qc
            }
            return null
        },
        yA: function (a, b) {
            b++;
            this.Wc = 0;
            if (0 == (a & 32768)) return this.xA(a, b);
            if (32767 == (a & 32767)) return null;
            var c = this.gd[a & 32767],
                d;
            for (d = 0; d < c.L.length; d += 2) {
                var e = c.L[d + 1];
                if (0 > e) break;
                e = this.xA(e, b);
                if (null != e) return e
            }
            return null
        },
        GD: function (a, b, c, d, e) {
            a = new pf(a, b, c, d, e);
            null == this.Gl && (this.Gl = new Q);
            this.Gl.add(a)
        },
        AL: function () {
            if (null != this.Gl) {
                var a;
                for (a = 0; a < this.Gl.size(); a++) {
                    var b = this.Gl.get(a);
                    if (null != b && 0 != b.code) switch (this.Gb = b.RM, this.Wx = b.Df, b.CN) {
                        case 0:
                            this.We(b.code);
                            break;
                        case 1:
                            this.Cd(b.QM, b.code)
                    }
                }
                this.Gl.clear()
            }
        },
        load: function (a) {
            for (var b, c, d = 0;;)
                if (b = a.file.PD(4), 69 ==
                    b[0] && 82 == b[1] && 62 == b[2] && 62 == b[3]) {
                    this.bh = a.file.l();
                    300 > this.bh && (this.bh = 300);
                    a.file.l();
                    this.dD = a.file.l();
                    for (c = 0; c < 7 + z.xz; c++) this.nl[c] = a.file.l();
                    this.nl[z.kd + z.Qb] < J.cu + 1 && (this.nl[z.kd + z.Qb] = J.cu + 1);
                    this.fh = a.file.l();
                    if (0 < this.fh)
                        for (this.oh = Array(this.fh), c = 0; c < this.fh; c++) this.oh[c] = new of, this.oh[c].Rs = a.file.$(), this.oh[c].Ss = a.file.$()
                } else if (69 == b[0] && 82 == b[1] && 101 == b[2] && 115 == b[3]) a.file.v(), this.ep = a.file.v(), this.Ad = Array(this.ep);
            else if (69 == b[0] && 82 == b[1] && 101 == b[2] && 118 ==
                b[3])
                for (a.file.v(), b = a.file.v(), c = 0; c < b; c++) this.Ad[d] = L.create(a), d++;
            else if (69 == b[0] && 82 == b[1] && 111 == b[2] && 112 == b[3]) 0 != (a.file.v() & J.CG) && (this.wm |= L.Ln);
            else if (60 == b[0] && 60 == b[1] && 69 == b[2] && 82 == b[3]) break;
            this.qC = Math.max(this.qC, d)
        },
        SB: function (a) {
            var b, c;
            c = this.Ad[a];
            c.ra &= this.wm;
            c.ra |= L.tq;
            a++;
            for (b = !1;;) {
                c = this.Ad[a];
                c.ra &= this.wm;
                c.ra |= L.tq;
                c = c.bb[0];
                switch (c.ha) {
                    case -589825:
                        c = c.j[0];
                        c.Sg |= pa.ru;
                        a = this.SB(a);
                        continue;
                    case -655361:
                        b = !0, a++
                }
                if (b) break;
                a++
            }
            return a
        },
        yx: function () {
            var a,
                b, c, d, e, f, g = new Q,
                h;
            for (d = 0; d < this.Ad.length;) a = this.Ad[d], a.ra &= this.wm, b = a.bb[0], -589825 == b.ha && (a = b.j[0], h = new nf, h.id = a.xL, h.gB = d, g.add(h), a.Sg &= ~(pa.ru | pa.qu), 0 != (a.Sg & pa.tH) && (a.Sg |= pa.qu)), d++;
            for (d = 0; d < this.Ad.length;) {
                a = this.Ad[d];
                a.ra &= this.wm;
                b = a.bb[0];
                if (-589825 == b.ha && (a = b.j[0], a.Sg &= ~pa.ru, 0 != (a.Sg & pa.qu))) {
                    d = this.SB(d);
                    continue
                }
                d++
            }
            for (d = 0; d < this.Ad.length; d++) switch (a = this.Ad[d], b = a.bb[0], b.ha) {
                case -589825:
                case -655361:
                    break;
                default:
                    for (a.nj = 0, e = a.zm = 0; e < a.Hb + a.le; e++)
                        if (b = a.bb[e],
                            b.Ma = 0 > b.ha ? b.Ma & W.EG : b.Ma & ~(Z.Pi | W.$l), 0 != b.pc)
                            for (f = 0; f < b.pc; f++) switch (c = b.j[f], c.code) {
                                case 25:
                                    c.Qt = 0;
                                    break;
                                case 13:
                                    c.lK = c.xm;
                                    break;
                                case 39:
                                    var q;
                                    for (q = 0; q < g.size(); q++)
                                        if (h = g.get(q), h.id == c.id) {
                                            c.U = h.gB;
                                            break
                                        }
                            }
            }
        },
        bN: function (a) {
            qualToOiListFull = qualToOiList = null;
            if (0 < this.fh) {
                var b, c, d, e, f = Array(this.fh);
                for (d = 0; d < a.length; d++) a[d].Mb = 0, a[d].Ef = null;
                for (c = 0; c < this.fh; c++)
                    for (e = this.oh[c].Rs & 32767, d = f[c] = 0; d < a.length; d++) {
                        var g = a[d];
                        if (g.rd == this.oh[c].Ss)
                            for (b = 0; 8 > b && -1 != g.Ym[b]; b++)
                                if (e == g.Ym[b]) {
                                    f[c]++;
                                    g.Mb++;
                                    break
                                }
                    }
                this.gd = Array(this.fh);
                this.hd = Array(this.fh);
                for (c = 0; c < this.fh; c++) {
                    this.gd[c] = new Od;
                    this.hd[c] = new Od;
                    b = f[c];
                    0 != b && (this.gd[c].L = Array(2 * b), this.hd[c].L = Array(2 * b));
                    var h = 0;
                    e = this.oh[c].Rs & 32767;
                    for (d = 0; d < a.length; d++)
                        if (g = a[d], g.rd == this.oh[c].Ss)
                            for (b = 0; 8 > b && -1 != g.Ym[b]; b++)
                                if (e == g.Ym[b]) {
                                    this.hd[c].L[2 * h] = g.fd;
                                    this.hd[c].L[2 * h + 1] = d;
                                    this.gd[c].L[2 * h] = -1;
                                    this.gd[c].L[2 * h + 1] = -1;
                                    null == g.Ef && 0 != g.Mb && (g.Ef = Array(g.Mb), g.Mb = 0);
                                    null != g.Ef && (g.Ef[g.Mb++] = c);
                                    h++;
                                    break
                                } this.gd[c].Ts = -1;
                    this.hd[c].Ts = -1
                }
                for (d = 0; d < a.length; d++) a[d].Mb = 0
            }
        },
        kr: function (a) {
            var b, c, d, e, f, g, h, q, k, n, r, v, l, t, B, u;
            this.o = a;
            var D = this.Cl = 0;
            for (h = a = 0; h < this.o.Lf; h++) - 1 != this.o.X[h].fd && (this.o.X[h].fx = -1, this.o.X[h].Xd = 0, this.o.X[h].Xm = -1, a++, this.o.X[h].fd + 1 > D && (D = this.o.X[h].fd + 1));
            this.mf = Array(200 * D + 1);
            a = 0;
            g = [];
            var w;
            for (t = 0; t < this.Ad.length; t++) {
                b = this.Ad[t];
                for (w = 0; w < b.le + b.Hb; w++) {
                    c = b.bb[w];
                    c.Ma &= ~W.Vy;
                    0 <= J.kf(c.ha) && (c.gb = this.Fm(c.Rb, J.kf(c.ha)));
                    if (c.ha == Z.zF) d = c.j[0], d.$K = 0, d.la[0].code == da.am && 0 ==
                        d.la[1].code && (n = {}, n.SJ = c.j[0], n.name = d.la[0].Cb, g.push(n), this.o.bv(d.la[0].Cb));
                    else if (c.ha == Z.LO || c.ha == Z.KO) d = c.j[0], d.la[0].code == da.am && 0 == d.la[1].code && (d.la[0] = new jb, d.la[0].code = da.$y, d.la[0].value = this.o.bv(d.la[0].Cb));
                    if (0 < c.pc)
                        for (n = 0; n < c.pc; n++) switch (d = c.j[n], d.code) {
                            case 25:
                                d.value = 0;
                                break;
                            case 21:
                                if (0 == (c.Rb & z.Ru))
                                    for (r = this.o.B.Kd.Fr(); null != r; r = this.o.B.Kd.hp()) {
                                        if (c.Rb == r.jg) {
                                            d.lo = r.wj;
                                            break
                                        }
                                    } else d.lo = -1;
                                f = d.rp; - 1 != f && (d.sp = this.Fm(f, d.Ms));
                                break;
                            case 9:
                            case 18:
                            case 16:
                                f = d.rp; -
                                1 != f && (d.sp = this.Fm(f, d.Ms));
                                break;
                            case 1:
                                d.rb = this.Fm(d.Df, d.type);
                                break;
                            case 69:
                                for (h = 0; h < d.Fb.length; h += 2) d.Fb[h + 1] = this.Fm(d.Fb[h], 0);
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
                                for (r = d, h = 0; h < r.la.length; h++) 0 < J.kf(r.la[h].code) && (q = r.la[h], q.rb = this.Fm(q.Df, J.kf(q.code)))
                        }
                }
                n = 0;
                r = L.uq | L.Xy | L.Zy;
                for (w = 0; w < b.Hb + b.le; w++) {
                    c = b.bb[w];
                    e = J.kf(c.ha);
                    f = c.ha;
                    q = k = h = 0;
                    d = null;
                    if (e >= z.Qb) switch (J.Zk(f)) {
                        case 262144:
                        case 589824:
                            n |= L.Zy;
                            f = c.Rb;
                            if (0 !=
                                (f & z.Ru))
                                for (e = this.eN(c.gb); - 1 != e; e = this.JD()) a = this.mC(b, a, this.o.X[e].fd);
                            else a = this.mC(b, a, f);
                            break;
                        case 1638400:
                            n |= L.iu;
                            break;
                        case -917504:
                            d = c.j[0];
                            h = c.j[0];
                            this.gr(c.gb, c.Rb, h.rb, h.Df);
                            this.gr(h.rb, h.Df, c.gb, c.Rb);
                            q = J.kf(c.ha);
                            q = this.$r(q) ? S.ee | S.$n : S.ee | S.Vq | S.$n;
                            k = h.type;
                            k = this.$r(k) ? S.ee | S.$n : S.ee | S.Vq | S.$n;
                            this.$b.CL & p.CF && this.et(c.gb, c.Rb, h.rb, h.Df);
                            h = 3;
                            break;
                        case -262144:
                            q = J.kf(c.ha);
                            q = this.$r(q) ? S.ee : S.ee | S.Vq;
                            d = c.j[0];
                            k = c.j[0].type;
                            k = this.$r(k) ? S.ee : S.ee | S.Vq;
                            0 != (this.$b.CL & p.CF) &&
                                this.et(c.gb, c.Rb, d.rb, d.Df);
                            h = 3;
                            break;
                        case -720896:
                        case -786432:
                            k = S.Uq;
                            h = 1;
                            break;
                        case -851968:
                            k = S.Tq, h = 1
                    } else switch (f) {
                        case -327681:
                            r &= ~L.uq;
                            break;
                        case -393217:
                            r |= L.Mn;
                            break;
                        case -262145:
                            r |= L.Mn;
                            break;
                        case -196609:
                            r |= L.Nn + L.hu;
                            break;
                        case -196614:
                            q = S.ee;
                            d = c.j[0];
                            h = 2;
                            break;
                        case -393222:
                            q = S.ee, d = c.j[1], h = 2
                    }
                    if (0 != (h & 1))
                        for (e = this.nh(c.gb); - 1 != e; e = this.tg()) this.o.X[e].Xd |= k;
                    if (0 != (h & 2))
                        for (e = this.nh(d.rb); - 1 != e; e = this.tg()) this.o.X[e].Xd |= q
                }
                b.ra &= ~r;
                b.ra |= n
            }
            this.mf[a] = -1;
            k = !1;
            if (null == this.Ff && null ==
                this.Gf) {
                this.Ff = new Map;
                this.Gf = new Map;
                k = !0;
                for (t = 0; t < this.Ad.length && k; t++)
                    if (b = this.Ad[t], null != b) {
                        for (w = 0; w < b.Hb; w++)
                            if (c = b.bb[w], null != c && (e = J.kf(c.ha), e >= z.Qb && -2686976 == J.Zk(c.ha))) {
                                var P = c.j[0];
                                if (2 == P.la.length && P.la[0].code == da.am && 0 == P.la[1].code) {
                                    P = P.la[0].Cb.toLowerCase();
                                    c = e == z.Qb ? this.Gf : this.Ff;
                                    var C = c.get(P);
                                    void 0 == C ? C = 1 : C++;
                                    c.set(P, C)
                                } else {
                                    k = !1;
                                    break
                                }
                            } for (h = 0; h < b.le && k; h++)
                            if (c = b.bb[h + b.Hb], null != c && (e = J.kf(c.ha), e >= z.Qb && 5046272 == J.Zk(c.ha))) {
                                k = !1;
                                break
                            }
                    } if (k) {
                    for (; this.Ff.size >
                        J.WF;) {
                        b = 1E9;
                        c = null;
                        w = tb(this.Ff.entries());
                        for (t = w.next(); !t.done; t = w.next()) n = t.value, t = n[1], t < b && (c = n[0], b = t);
                        null != c && this.Ff["delete"](c)
                    }
                    b = J.pq;
                    t = tb(this.Ff.keys());
                    for (c = t.next(); !c.done; c = t.next()) this.Ff.set(c.value, b++);
                    for (; this.Gf.size > J.XF;) {
                        b = 1E9;
                        c = null;
                        w = tb(this.Gf.entries());
                        for (t = w.next(); !t.done; t = w.next()) n = t.value, t = n[1], t < b && (c = n[0], b = t);
                        null != c && this.Gf["delete"](c)
                    }
                    b = J.pq;
                    t = tb(this.Gf.keys());
                    for (c = t.next(); !c.done; c = t.next()) this.Gf.set(c.value, b++), b == J.Oe + 1 && (b += J.Oq);
                    b >
                        J.Oe + 1 + J.Oq && (this.nl[z.kd + z.Qb] += b - (J.Oe + 1 + J.Oq))
                } else this.Gf = this.Ff = null
            }
            r = Array(z.kd + D + 1);
            b = t = 0;
            for (e = -z.kd; 0 > e; e++, b++) r[b] = t, t += this.nl[z.kd + e];
            for (oil = 0; oil < this.o.Lf; oil++, b++) r[b] = t, t = this.o.X[oil].rd < z.Gg ? t + (this.nl[z.kd + this.o.X[oil].rd] + J.Oe + 1) : t + (this.$b.Ar.Ho(this.o.X[oil].rd) + J.Oe + 1);
            l = t;
            this.sc = Array(l);
            for (h = 0; h < l; h++) this.sc[h] = 0;
            n = v = 0;
            q = Array(this.o.B.bh);
            for (t = 0; t < this.ep; t++)
                for (b = this.Ad[t], b.ra &= ~L.gu, d = !0, w = B = 0; w < b.Hb; w++) {
                    c = b.bb[w];
                    e = J.kf(c.ha);
                    f = c.ha;
                    h = -J.ju(f);
                    k && e >= z.Qb &&
                        -2686976 == J.Zk(f) && (P = c.j[0], 2 == P.la.length && P.la[0].code == da.am && 0 == P.la[1].code && (P = P.la[0].Cb.toLowerCase(), C = (e == z.Qb ? this.Gf : this.Ff).get(P), void 0 != C && (h = C, f = (f & 65535) + 65536 * -h, c.ha = f)));
                    if (d && -2686977 != c.ha)
                        if (0 != (c.Ma & W.fu) && (v++, 0 == (b.ra & L.sq) && n++), 0 > e) this.sc[r[7 + e] + h]++;
                        else {
                            d = 0;
                            for (e = this.nh(c.gb); - 1 != e; e = this.tg()) this.sc[r[z.kd + e] + h]++, q[d++] = e;
                            q[d] = -1;
                            if (-917504 == J.Zk(f))
                                for (d = c.j[0], f = this.nh(d.rb); - 1 != f; f = this.tg()) {
                                    for (d = 0; q[d] != f && -1 != q[d];) d++; - 1 == q[d] && this.sc[r[z.kd + f] + h]++
                                }
                        } d = !1;
                    if (-1507329 == c.ha || -1572865 == c.ha) d = !0, b.ra |= L.gu, 0 == B ? B = c.ha : c.ha = B, -1572865 == B && (b.ra |= L.Yy); - 2686977 == c.ha && (v++, b.ra |= L.tq)
                }
            c = v + 1;
            for (b = 0; b < l; b++) 0 != this.sc[b] && (t = this.sc[b], this.sc[b] = c, c += t + 1);
            this.oc = Array(c);
            this.qf = Array(c);
            for (h = 0; h < c; h++) this.oc[h] = null, this.qf[h] = 0;
            k = Array(l);
            for (h = 0; h < l; h++) k[h] = this.sc[h];
            this.o.Ie = null;
            l = 0;
            v = [];
            B = [];
            P = n + 1;
            for (t = 0; t < this.ep; t++) {
                b = this.Ad[t];
                d = !0;
                for (w = 0; w < b.Hb; w++) {
                    c = b.bb[w];
                    e = J.kf(c.ha);
                    f = c.ha;
                    h = -J.ju(f);
                    if (d && -2686977 != c.ha)
                        if (0 != (c.Ma & W.fu) &&
                            (0 != (b.ra & L.sq) ? 0 < v.length && (C = v[v.length - 1], C.push(b), C.push(w)) : (this.oc[l] = b, this.qf[l] = w, l++)), 0 > e) {
                            if (C = r[z.kd + e] + h, this.oc[k[C]] = b, this.qf[k[C]] = w, k[C]++, c.ha == N.$F) {
                                f = !1;
                                for (h = 0; h < b.Hb && b.bb[h].ha != N.aG && b.bb[h].ha != N.bG; h++);
                                h < b.Hb && (f = !0);
                                d = c.j[0];
                                if (d.la[0].code == da.am && 0 == d.la[1].code) {
                                    h = null;
                                    d = d.la[0].Cb;
                                    this.o.bv(d);
                                    for (e = 0; e < g.length; e++)
                                        if (C = g[e], m.Gc(C.name, d)) {
                                            this.o.Ie || (this.o.Ie = []);
                                            if (null == h) {
                                                for (u = 0; u < this.o.Ie.length && (h = this.o.Ie[u], !m.Gc(d, h.name)); u++);
                                                u == this.o.Ie.length &&
                                                    (h = new lb(d), this.o.Ie.push(h));
                                                h.xy(b);
                                                h.ks |= f
                                            }
                                            C.SJ.$K = u + 1
                                        } if (null == h) {
                                        this.o.Ie || (this.o.Ie = []);
                                        for (u = 0; u < this.o.Ie.length && (h = this.o.Ie[u], !m.Gc(d, h.name)); u++);
                                        u == this.o.Ie.length && (h = new lb(d), this.o.Ie.push(h));
                                        h.xy(b);
                                        h.ks |= f
                                    }
                                }
                            }
                        } else {
                            d = 0;
                            for (e = this.nh(c.gb); - 1 != e; e = this.tg()) C = r[z.kd + e] + h, this.oc[k[C]] = b, this.qf[k[C]] = w, k[C]++, q[d++] = e;
                            q[d] = -1;
                            if (-917504 == J.Zk(f))
                                for (d = c.j[0], f = this.nh(d.rb); - 1 != f; f = this.tg()) {
                                    for (d = 0; q[d] != f && -1 != q[d];) d++; - 1 == q[d] && (C = r[z.kd + f] + h, this.oc[k[C]] = b, this.qf[k[C]] =
                                        w, k[C]++)
                                }
                        } d = !1;
                    if (-1507329 == c.ha || -1572865 == c.ha) d = !0;
                    if (-2686977 == c.ha && 0 < v.length) {
                        B.pop().hB = P;
                        C = v.pop();
                        for (c = 0; c < C.length; c += 2) this.oc[P] = C[c], this.qf[P] = C[c + 1], P++;
                        this.oc[P] = null;
                        this.qf[P] = null;
                        P++
                    }
                }
                if (0 != (b.ra & L.Wy))
                    for (C = [], v.push(C), h = 0; h < b.le; h++)
                        if (c = b.bb[b.Hb + h], 2883583 == c.ha) {
                            0 < c.pc && (d = c.j[0], B.push(d));
                            break
                        }
            }
            this.el = Array(D + 1 + a / 2);
            for (oil = D = 0; oil < this.o.Lf; oil++)
                if (u = this.o.X[oil], b = r[z.kd + oil], u.ix = b, 0 != (u.Is & A.Sf)) {
                    a = 0;
                    t = this.sc[b - J.ju(-786432)];
                    if (0 != t)
                        for (; null != this.oc[t];) {
                            b =
                                this.oc[t];
                            c = b.bb[this.qf[t]];
                            g = c.j[0].value;
                            w = J.SK(b);
                            for (h = b.le; 0 < h; h--, w++) c = b.bb[w], c.ha == (524288 | u.rd & 65535) && (a |= g);
                            t++
                        }
                    u.kx = a;
                    g = u.fd;
                    for (c = a = 0; - 1 != this.mf[a]; a += 2)
                        if (this.mf[a] == g)
                            if (b = this.mf[a + 1], 0 != (b & 32768)) u.Xd |= b;
                            else {
                                for (t = 0; t < c && this.el[D + t] != b;) t++;
                                t == c && (this.el[D + c++] = b)
                            } 0 < c && (u.Xm = D, this.el[D + c++] = -1, D += c)
                } this.ef[0] = 0;
            for (h = 1; h <= z.kd; h++) this.ef[h] = r[z.kd - h];
            for (oil = 0; oil < this.o.Lf; oil++)
                if (u = this.o.X[oil], e = u.lb, 0 == (e & 2147483648)) {
                    do a = this.o.H[e], a.jw = u.ix, a.Db = u, a.tf = u.Xd, 0 !=
                        (a.sa & A.Sf) && (a.A.by = u.kx), 0 != (a.sa & A.Yi) && 0 == (a.tf & S.ee) && a.D.zt(!1), 0 == (a.sa & A.Dz) && (a.sa &= ~A.zk, 0 != (a.tf & S.Tq) && 0 != (this.o.B.cc & E.jz) && (a.sa |= A.zk), 0 != (a.tf & (S.ee | S.Uq)) && (a.sa |= A.zk)), e = a.bc; while (0 == (e & 2147483648))
                } this.$D = 0 != n ? !0 : !1;
            this.mf = null;
            this.jo = !0
        },
        Ot: function () {
            this.jo = !1;
            this.qf = this.oc = this.sc = this.el = this.gd = null
        },
        Fm: function (a, b) {
            if (0 != (a & z.Ru)) {
                var c;
                for (c = 0; a != this.oh[c].Rs || b != this.oh[c].Ss;) c++;
                return c | 32768
            }
            for (c = 0; c < this.o.Lf && this.o.X[c].fd != a;) c++;
            return c
        },
        $r: function (a) {
            var b;
            for (b = 0; b < this.o.Lf; b++)
                if (-1 != this.o.X[b].fd && this.o.X[b].rd == a)
                    if (0 != (this.o.X[b].Is & A.Yi) && 0 == (this.o.X[b].Is & A.Qu)) break;
                    else return !1;
            return !0
        },
        nh: function (a) {
            if (0 == (a & 32768)) return this.wp = -1, a;
            if (-1 == a) return -1;
            this.wp = a & 32767;
            this.up = 0;
            return this.tg()
        },
        tg: function () {
            var a;
            if (-1 == this.wp || this.up >= this.hd[this.wp].L.length) return -1;
            a = this.hd[this.wp].L[this.up + 1];
            this.up += 2;
            return a
        },
        eN: function (a) {
            if (0 == (a & 32768)) return this.xp = -1, a;
            if (-1 == a) return -1;
            this.xp = a & 32767;
            this.vp = 0;
            return this.JD()
        },
        JD: function () {
            var a;
            if (-1 == this.xp || this.vp >= this.hd[this.xp].L.length) return -1;
            a = this.hd[this.xp].L[this.vp + 1];
            this.vp += 2;
            return a
        },
        gr: function (a, b, c, d) {
            var e, f;
            if (0 > b) {
                if (null != this.hd)
                    for (e = this.hd[a & 32767], f = 0; f < e.L.length;) this.gr(e.L[f + 1], e.L[f], c, d), f += 2
            } else if (0 > d) {
                if (null != this.hd)
                    for (e = this.hd[c & 32767], f = 0; f < e.L.length;) this.gr(a, b, e.L[f + 1], e.L[f]), f += 2
            } else {
                a = this.o.X[a];
                if (null == a.Fj) a.Fj = [], a = a.Fj;
                else
                    for (a = a.Fj, b = 0; b < a.length; b += 2)
                        if (d == a[b]) return;
                a.push(d);
                a.push(c)
            }
        },
        et: function (a,
            b, c, d) {
            var e, f;
            if (0 > b) {
                if (null != this.hd)
                    for (e = this.hd[a & 32767], f = 0; f < e.L.length;) this.et(e.L[f + 1], e.L[f], c, d), f += 2
            } else if (0 > d) {
                if (null != this.hd)
                    for (e = this.hd[c & 32767], f = 0; f < e.L.length;) this.et(a, b, e.L[f + 1], e.L[f]), f += 2
            } else if (a = this.o.X[a], c = this.o.X[c], a.rd == z.Qb && c.rd == z.Qb && (a.rl & A.Zn) != (c.rl & A.Zn) && (0 != (c.rl & A.Zn) && (a = c, b = d), d = this.$b.zc.oj(b), e = d.Bc, c = !1, 0 != (e.hh & A.Sf) && null != e.Vd && 0 < e.Vd.ol && (e = e.Vd.qd[0], e.ap == U.Sh && (c = e.Zr)), !c)) {
                a.rl &= ~A.Zn;
                for (a = a.lb; 0 == (a & 2147483648);) {
                    a = this.o.H[a];
                    if (null == a) break;
                    a.D.P &= ~u.Zi;
                    a = a.bc
                }
                null != this.$b.zc.ih && this.$b.zc.ih[b] && d.nc(this, null)
            }
        },
        Qg: function (a) {
            a = this.$b.ia.Sb(a);
            null != a && (a.Po |= ca.wq);
            return -1
        },
        mC: function (a, b, c) {
            var d, e, f, g, h;
            for (h = 0; h < a.Hb; h++)
                if (g = a.bb[h], 2 <= J.kf(g.ha)) switch (e = 32768 + S.RI, f = J.Zk(g.ha), f) {
                    case -917504:
                        f = g.j[0];
                        for (d = this.nh(g.gb); - 1 != d; d = this.tg()) d = this.o.X[d].fd, c == d && (e = 0, b = this.nC(b, c, f.rb));
                        if (0 == e) break;
                        for (d = this.nh(f.rb); - 1 != d; d = this.tg()) d = this.o.X[d].fd, c == d && (b = this.nC(b, c, g.gb));
                        break;
                    case -786432:
                        f =
                            g.j[0], e = 32768 + f.value;
                    case -851968:
                        for (d = this.nh(g.gb); - 1 != d; d = this.tg()) d = this.o.X[d].fd, c == d && (this.mf[b++] = c, this.mf[b++] = e)
                }
            return b
        },
        nC: function (a, b, c) {
            for (c = this.nh(c); - 1 != c; c = this.tg()) {
                c = this.o.X[c].fd;
                var d;
                for (d = 0; d < a && (this.mf[d] != b || this.mf[d + 1] != c); d += 2);
                d == a && (this.mf[a++] = b, this.mf[a++] = c)
            }
            return a
        },
        QK: function (a) {
            var b, c, d, e, f, g;
            for (d = 0; d < this.ep; d++)
                for (b = this.Ad[d], e = 0; e < b.Hb + b.le; e++)
                    for (c = b.bb[e], f = 0; f < c.pc; f++) switch (c.j[f].code) {
                        case 6:
                        case 35:
                            g = c.j[f], a.Qg(g.Zp)
                    }
        }
    };
    L.uq = 1;
    L.Nn = 2;
    L.hu = 4;
    L.Mn = 8;
    L.iu = 16;
    L.Wy = 64;
    L.Ln = 128;
    L.GG = 256;
    L.RP = 512;
    L.gu = 1024;
    L.Zy = 2048;
    L.Yy = 4096;
    L.IG = 8192;
    L.tq = 16384;
    L.sq = 32768;
    L.Xy = L.iu + L.Nn + L.hu + L.Mn;
    L.HG = L.GG + L.IG + L.Wy + L.sq;
    L.create = function (a) {
        var b = a.file.U,
            c = a.file.$(),
            d = new L;
        d.Hb = a.file.nb();
        d.le = a.file.nb();
        d.ra = a.file.l();
        d.RK = a.file.l();
        d.nj = a.file.v();
        d.zm = a.file.v();
        d.bb = Array(d.Hb + d.le);
        var e, f = 0;
        for (e = 0; e < d.Hb; e++) d.bb[f++] = N.create(a);
        for (e = 0; e < d.le; e++) d.bb[f++] = Z.create(a);
        a.file.seek(b - c);
        return d
    };
    W.FG = 1;
    W.QP = 2;
    W.DG = 4;
    W.rq = 8;
    W.$l =
        16;
    W.fu = 32;
    W.PP = 64;
    W.Vy = 128;
    W.EG = W.fu + W.FG + W.DG + W.rq + W.$l;
    W.rk = 1;
    W.Uy = 32;
    mb.EJ = 0;
    mb.pS = 1;
    Ca.Hz = 0;
    Ca.YR = 1;
    Ca.ZR = 2;
    Ca.$R = 3;
    Ca.prototype = {
        load: function (a) {
            this.wj = a.l();
            this.jg = a.l();
            this.Aw = a.v();
            this.Bw = a.v();
            this.zw = a.l();
            a.l();
            this.eC = a.l();
            a.qa(2)
        },
        xd: function (a, b) {
            this.yw[a] = b
        }
    };
    Pd.prototype = {
        load: function (a) {
            this.ng = a.file.v();
            this.list = Array(this.ng);
            var b, c = 0;
            for (b = 0; b < this.ng; b++) this.list[b] = new Ca, this.list[b].load(a.file), this.list[b].wj + 1 > c && (c = this.list[b].wj + 1), this.list[b].es = a.zc.oj(this.list[b].jg).$e;
            this.Da = Array(c);
            for (b = 0; b < this.ng; b++) this.Da[this.list[b].wj] = b
        },
        DB: function (a) {
            return this.list[a]
        },
        nL: function (a) {
            return a < this.Da.length ? this.list[this.Da[a]] : null
        },
        hp: function () {
            var a;
            if (this.ds < this.ng) {
                do
                    if (a = this.list[this.ds++], 2 <= a.es) return a; while (this.ds < this.ng)
            }
            return null
        },
        Fr: function () {
            this.ds = 0;
            return this.hp()
        }
    };
    X.nu = 1;
    X.ou = 2;
    X.$P = 4;
    X.Pn = 16;
    X.lu = 32;
    X.mu = 64;
    X.aQ = 65536;
    X.On = 131072;
    X.bQ = 262144;
    X.prototype = {
        load: function (a) {
            this.La = a.v();
            this.ek = a.OD();
            this.gk = a.OD();
            this.zs = a.v();
            this.Bs = a.v();
            a.Nb();
            this.Zz = this.La;
            this.bA = this.ek;
            this.cA = this.gk;
            this.$z = this.zs;
            this.aA = this.Bs
        },
        reset: function () {
            this.La = this.Zz;
            this.ek = this.bA;
            this.gk = this.cA;
            this.zs = this.$z;
            this.Bs = this.aA;
            this.x = this.y = this.Pk = this.Rk = this.bt = this.ct = 0;
            this.ir = this.tl = this.$m = this.Zm = null;
            this.yt(0);
            this.scale = 1;
            this.zE(1);
            this.AE(1);
            this.DE(this.app.va / 2);
            this.FE(this.app.Ca / 2);
            this.CE(this.app.va / 2);
            this.EE(this.app.Ca / 2);
            this.GE(!1);
            this.La & X.On ? (this.xe = !0, this.Pr()) : (this.xe = !1, this.show())
        },
        EK: function () {
            this.vc.wN()
        },
        QJ: function (a) {
            null == this.Zm && (this.Zm = new Q);
            this.Zm.add(a)
        },
        Sz: function (a) {
            null == this.$m && (this.$m = new Q);
            this.$m.add(a)
        },
        er: function (a) {
            null == this.ir && (this.ir = new Q);
            this.ir.add(a)
        },
        uK: function (a, b) {
            this.vc = new Ea;
            this.vc.x = a;
            this.vc.y = b;
            this.Wb = new Ea;
            this.Wb.x = a;
            this.Wb.y = b;
            this.Va = new Ea;
            this.Va.x = a;
            this.Va.y = b;
            this.yt(0);
            this.scale = 1;
            this.zE(1);
            this.AE(1);
            this.DE(this.app.va / 2);
            this.FE(this.app.Ca / 2);
            this.CE(this.app.va / 2);
            this.EE(this.app.Ca / 2);
            this.GE(!1);
            this.app.Ce.we(this.vc);
            this.app.Ce.we(this.Wb);
            this.app.Ce.we(this.Va);
            this.WN()
        },
        yt: function (a) {
            this.angle = a;
            this.vc.angle = a;
            this.Wb.angle = a;
            this.Va.angle = a
        },
        zE: function (a) {
            this.xc = a;
            this.vc.xc = a;
            this.Wb.xc = a;
            this.Va.xc = a
        },
        AE: function (a) {
            this.yc = a;
            this.vc.yc = a;
            this.Wb.yc = a;
            this.Va.yc = a
        },
        DE: function (a) {
            this.Ja = a;
            this.vc.Ja = a;
            this.Wb.Ja = a;
            this.Va.Ja = a
        },
        FE: function (a) {
            this.Ga = a;
            this.vc.Ga = a;
            this.Wb.Ga = a;
            this.Va.Ga = a
        },
        CE: function (a) {
            this.hq = a = this.app.va - a;
            this.vc.hq = a;
            this.Wb.hq = a;
            this.Va.hq = a
        },
        EE: function (a) {
            this.jq = a = this.app.Ca - a;
            this.vc.jq =
                a;
            this.Wb.jq = a;
            this.Va.jq = a
        },
        GE: function (a) {
            this.Mg = a;
            this.vc.Mg = a;
            this.Wb.Mg = a;
            this.Va.Mg = a
        },
        zN: function (a, b) {
            this.vc.x = a;
            this.vc.y = b;
            this.Wb.x = a;
            this.Wb.y = b;
            this.Va.x = a;
            this.Va.y = b;
            this.show()
        },
        WN: function () {
            this.La & X.Pn ? this.show() : this.Pr()
        },
        Pr: function () {
            this.La &= ~X.On;
            this.xe && (this.vc.visible = !1, this.Wb.visible = !1, this.xe = this.Va.visible = !1)
        },
        show: function () {
            0 == this.xe && (this.vc.visible = !0, this.Wb.visible = !0, this.xe = this.Va.visible = !0)
        },
        QA: function () {
            null != this.vc && (this.app.Ce.removeChild(this.vc),
                this.vc = null);
            null != this.Wb && (this.app.Ce.removeChild(this.Wb), this.Wb = null);
            null != this.Va && (this.app.Ce.removeChild(this.Va), this.Va = null)
        },
        PJ: function (a, b, c, d) {
            var e = new aa;
            e.left = a;
            e.top = b;
            e.right = c;
            e.bottom = d;
            null == this.tl && (this.tl = new Q);
            this.tl.add(e)
        },
        oL: function (a, b) {
            a += this.x;
            b += this.y;
            if (null != this.tl) {
                var c, d;
                for (c = 0; c < this.tl.size(); c++)
                    if (d = this.tl.get(c), a >= d.left && b >= d.top && a < d.right && b < d.bottom) return d
            }
            return null
        },
        bk: function (a, b, c, d, e) {
            b = b + this.x - a.Ja;
            c = c + this.y - a.Ga;
            var f = b + a.width,
                g = c + a.height,
                h = c;
            0 != d && (h = g - d);
            var q, k;
            k = e == na.Hn ? this.Zm : this.$m;
            if (null == k) return null;
            for (e = 0; e < k.size(); e++)
                if (q = k.get(e), q.x < f && q.x + q.width > b && q.y < g && q.y + q.height > h && q.bk(a, b, c, d)) return q;
            return null
        },
        Jt: function (a, b, c, d, e, f) {
            f = f == na.Hn ? this.Zm : this.$m;
            if (null == f) return null;
            a += this.x;
            b += this.y;
            c += this.x;
            d += this.y;
            0 != e && (b = d - e);
            for (e = 0; e < f.size(); e++) {
                var g = f.get(e);
                if (g.x < c && g.x + g.width > a && g.y < d && g.y + g.height > b && g.Jt(a, b, c, d)) return g
            }
            return null
        }
    };
    ka.prototype = {
        wb: function (a, b, c) {
            if (null !=
                this.fM)
                if (this.type == z.GI) {
                    var d = this.re.Bc,
                        e;
                    switch (d.Aj) {
                        case 1:
                            switch (d.pi) {
                                case 1:
                                    a.Lc(b + this.x, c + this.y, this.width, this.height, this.Kk, this.ie, this.je);
                                    break;
                                case 2:
                                    a.Mc(b + this.x, c + this.y, this.width, this.height, this.Kk, this.ie, this.je);
                                    break;
                                case 3:
                                    a.Px(b + this.x, c + this.y, this.width, this.height, this.Kk, this.ie, this.je)
                            }
                            break;
                        case 2:
                            switch (d.pi) {
                                case 1:
                                    a.Lc(b + this.x, c + this.y, this.width, this.height, this.Kk, this.ie, this.je);
                                    break;
                                case 2:
                                    a.Ox(b + this.x, c + this.y, this.width, this.height, this.Kk, this.yv,
                                        0 != this.PB, this.ie, this.je);
                                    break;
                                case 3:
                                    a.RD(b + this.x, c + this.y, this.width, this.height, this.Kk, this.yv, 0 != this.PB, this.ie, this.je)
                            }
                            break;
                        case 3:
                            switch (d.pi) {
                                case 2:
                                    e = this.app.ia.Sb(d.oi);
                                    a.SD(e, b + this.x, c + this.y, this.width, this.height, this.ie, this.je);
                                    break;
                                case 3:
                                    e = this.app.ia.Sb(d.oi), a.TD(e, b + this.x, c + this.y, this.width, this.height, this.ie, this.je)
                            }
                    }
                    if (0 < this.borderWidth) switch (d.pi) {
                        case 1:
                            var f = e = 0,
                                g = this.width,
                                h = this.height;
                            0 != (d.np & Na.mI) && (e += g, g = -g);
                            0 != (d.np & Na.nI) && (f += h, h = -h);
                            a.Lc(b + this.x +
                                e, c + this.y + f, b + this.x + e + g, c + this.y + f + h, this.borderColor, this.borderWidth);
                            break;
                        case 2:
                            a.Cp(b + this.x, c + this.y, this.width, this.height, this.borderColor, this.borderWidth);
                            break;
                        case 3:
                            a.dt(b + this.x, c + this.y, this.width, this.height, 1, this.borderColor, this.borderWidth)
                    }
                } else this.type == z.FI ? a.cf(this.pd, b + this.x + this.pd.Ja, c + this.y + this.pd.Ga, 0, 1, 1, this.ie, this.je) : null != this.G && this.G.wb(a, b, c);
            else a.cf(this.pd, b + this.x + this.pd.Ja, c + this.y + this.pd.Ga, 0, 1, 1, this.ie, this.je)
        },
        vE: function (a, b) {
            this.ie = a;
            this.je = b
        },
        xd: function (a, b) {
            b.vc.we(this);
            this.type == z.yz && b.er(this);
            switch (this.Bf) {
                case ea.Qq:
                    b.QJ(this);
                    b.Sz(this);
                    break;
                case ea.Jg:
                    b.Sz(this);
                    break;
                case ea.Pu:
                    b.PJ(this.x, this.y, this.x + this.width, this.y + this.height)
            }
        },
        bk: function (a, b, c, d) {
            var e;
            switch (this.type) {
                case 0:
                    return e = this.height, this.Bf == ea.Jg && (e = E.bm), a.ly(b, c, d, this.x, this.y, this.width, e, 0);
                case 1:
                    if (0 != this.rm) return !0;
                    e = K.sk;
                    this.Bf == ea.Jg && (e = K.tk);
                    e = this.pd.eg(e, 0, 1, 1);
                    return a.bk(b, c, d, e, this.x, this.y, 0);
                case 11:
                    if (0 != this.rm) return !0;
                    e = K.sk;
                    this.Bf == ea.Jg && (e = K.tk);
                    e = this.pd.eg(e, 0, 1, 1);
                    return a.bk(b, c, d, e, this.x, this.y, 0)
            }
            return !1
        },
        Jt: function (a, b, c, d) {
            var e;
            switch (this.type) {
                case 0:
                    if (this.Bf == ea.Jg) {
                        a = this.y + Math.min(this.height, E.bm);
                        if (this.y < d && a > b) return !0;
                        break
                    }
                    return !0;
                case 1:
                    if (0 != this.rm) return !0;
                    e = K.sk;
                    this.Bf == ea.Jg && (e = K.tk);
                    e = this.pd.eg(e, 0, 1, 1);
                    return e.ly(this.x, this.y, 0, a, b, c, d, 0);
                case 11:
                    if (0 != this.rm) return !0;
                    e = K.sk;
                    this.Bf == ea.Jg && (e = K.tk);
                    e = this.pd.eg(e, 0, 1, 1);
                    return e.ly(this.x, this.y, 0, a, b, c, d, 0)
            }
            return !1
        }
    };
    z.SR = 1;
    z.QR = 2;
    z.UR = 4;
    z.TR = 8;
    z.Sq = 16;
    z.OI = 32;
    z.RR = 64;
    z.PR = 1;
    z.OR = 2;
    z.Gz = 4;
    z.kd = 7;
    z.zz = -7;
    z.mR = -6;
    z.lR = -5;
    z.Yn = -4;
    z.Pq = -3;
    z.oR = -2;
    z.pR = -1;
    z.GI = 0;
    z.FI = 1;
    z.Qb = 2;
    z.Th = 3;
    z.Az = 4;
    z.Ou = 5;
    z.Nu = 6;
    z.Xn = 7;
    z.nR = 8;
    z.wz = 9;
    z.kR = 10;
    z.yz = 11;
    z.xz = 10;
    z.Gg = 32;
    z.Ru = 32768;
    z.prototype = {
        Dw: function (a) {
            this.op = a.l();
            this.$e = a.l();
            this.ui = a.l();
            a.qa(2);
            this.cx = a.v();
            this.dx = a.v()
        },
        load: function (a) {
            a.seek(this.mD);
            switch (this.$e) {
                case 0:
                    this.Bc = new Na;
                    break;
                case 1:
                    this.Bc = new Rd;
                    break;
                default:
                    this.Bc = new A
            }
            this.Bc.load(a, this.$e);
            this.nD = 0
        },
        oO: function () {
            this.Bc = null
        },
        nc: function (a, b) {
            this.Bc.nc(a, b)
        }
    };
    Qd.prototype = {
        yi: function (a) {
            this.Ej = a.v();
            this.Fb = Array(this.Ej);
            var b;
            for (b = this.jh = 0; b < this.Ej; b++)
                for (var c = 0, d; 32639 != c;)
                    if (c = a.l(), a.l(), d = a.v(), 0 != d) {
                        d = a.U + d;
                        switch (c) {
                            case 17476:
                                this.Fb[b] = new z;
                                this.Fb[b].Dw(a);
                                this.Fb[b].op >= this.jh && (this.jh = this.Fb[b].op + 1);
                                break;
                            case 17477:
                                this.Fb[b].ex = a.Nb();
                                break;
                            case 17478:
                                this.Fb[b].mD = a.U
                        }
                        a.seek(d)
                    } this.vi = Array(this.jh);
            for (b = 0; b < this.Ej; b++) this.vi[this.Fb[b].op] = b;
            this.pp =
                Array(this.jh);
            this.ih = Array(this.jh);
            for (a = 0; a < this.jh; a++) this.pp[a] = 0, this.ih[a] = 0
        },
        oj: function (a) {
            return this.Fb[this.vi[a]]
        },
        yN: function () {
            var a;
            for (a = 0; a < this.Ej; a++) this.Fb[a].ui &= ~z.Sq
        },
        TN: function (a) {
            this.Fb[this.vi[a]].ui |= z.Sq
        },
        BB: function () {
            var a;
            for (a = 0; a < this.Ej; a++)
                if (0 != (this.Fb[a].ui & z.Sq)) return this.wr = a, this.Fb[a];
            return null
        },
        FB: function () {
            if (this.wr < this.Ej) {
                var a;
                for (a = this.wr + 1; a < this.Ej; a++)
                    if (0 != (this.Fb[a].ui & z.Sq)) return this.wr = a, this.Fb[a]
            }
            return null
        },
        Jf: function () {
            var a;
            for (a = 0; a < this.jh; a++) this.pp[a] = 0
        },
        Zj: function (a) {
            this.pp[a] = 1
        },
        load: function (a) {
            var b;
            for (b = 0; b < this.jh; b++)
                if (0 != this.pp[b]) {
                    if (0 == this.ih[b] || 0 != this.ih[b] && 0 != (this.Fb[this.vi[b]].nD & z.OI)) this.Fb[this.vi[b]].load(a), this.ih[b] = 1
                } else 0 != this.ih[b] && (this.Fb[this.vi[b]].oO(), this.ih[b] = 0);
            this.Jf()
        },
        nc: function (a, b) {
            var c;
            for (c = 0; c < this.jh; c++) 0 != this.ih[c] && this.Fb[this.vi[c]].nc(a, b)
        }
    };
    ea.Bz = 0;
    ea.Qq = 1;
    ea.Jg = 2;
    ea.Pu = 3;
    ea.HI = 4;
    Rd.prototype = {
        load: function (a) {
            a.qa(4);
            this.iD = a.l();
            this.eD = a.l();
            this.fD = a.v();
            this.gD = a.v();
            this.oi = a.l()
        },
        nc: function (a) {
            null != a && (a = a.Qg(this.oi), -1 != a && (this.oi = a))
        }
    };
    Na.mI = 1;
    Na.nI = 2;
    Na.prototype = {
        load: function (a) {
            a.qa(4);
            this.iD = a.l();
            this.eD = a.l();
            this.fD = a.v();
            this.gD = a.v();
            this.Fs = a.l();
            this.Es = a.Cc();
            this.pi = a.l();
            this.Aj = a.l();
            if (1 == this.pi) this.np = a.l();
            else switch (this.Aj) {
                case 1:
                    this.gh = this.Vm = a.Cc();
                    break;
                case 2:
                    this.gh = a.Cc();
                    this.Vm = a.Cc();
                    this.mp = a.v();
                    break;
                case 3:
                    this.oi = a.l()
            }
        },
        nc: function (a) {
            3 == this.Aj && null != a && (a = a.Qg(this.oi), -1 != a && (ocImage =
                a))
        }
    };
    A.yR = 1;
    A.xR = 2;
    A.KI = 4;
    A.Fz = 8;
    A.Sf = 16;
    A.Xi = 32;
    A.AR = 64;
    A.CR = 128;
    A.NI = 256;
    A.Yi = 512;
    A.zR = 1024;
    A.MI = 2048;
    A.Qu = 4096;
    A.Ez = 8192;
    A.zk = 16384;
    A.Dz = 32768;
    A.BR = 65536;
    A.Cz = 131072;
    A.LI = 1048576;
    A.qR = 1;
    A.wR = 2;
    A.Zn = 4;
    A.Rq = 8;
    A.sR = 4;
    A.rR = 48;
    A.vR = 16;
    A.uR = 32;
    A.tR = 48;
    A.II = 64;
    A.JI = 128;
    A.ER = 1;
    A.LR = 2;
    A.KR = 4;
    A.MR = 8;
    A.JR = 16;
    A.GR = 32;
    A.DR = 64;
    A.IR = 128;
    A.HR = 256;
    A.NR = 512;
    A.FR = 1024;
    A.prototype = ea;
    A.prototype = {
        load: function (a, b) {
            var c = a.U;
            this.$w = Array(8);
            var d;
            a.qa(4);
            a.qa(2);
            var e = a.l();
            a.qa(2);
            var f = a.l(),
                g = a.l(),
                h = a.l();
            this.hh =
                a.v();
            for (d = 0; 8 > d; d++) this.$w[d] = a.$();
            a.l();
            var q = a.l(),
                k = a.l();
            this.Bj = a.l();
            var n = a.l();
            this.Kc = a.v();
            a.Cc();
            d = a.v();
            var p = a.v();
            this.lp = this.Wm = null;
            0 != h && (a.seek(c + h), this.Vd = new Oe, this.Vd.load(a));
            0 != q && (a.seek(c + q), this.ri = new Ke, this.ri.load(a, 0 != (this.Bj & A.JI)));
            0 != k && (a.seek(c + k), this.Cj = new Je, this.Cj.load(a));
            0 != g && (a.seek(c + g), this.zj = new Qa, this.zj.load(a));
            0 != f && (a.seek(c + f), this.ed = new Td, this.ed.load(a));
            0 != n && (a.seek(c + n), f = a.v(), a.qa(4), this.kD = a.v(), a.v(), this.jD = a.v(), 0 != f - 20 &&
                (this.hD = a.U));
            0 != d && (a.seek(c + d), this.Wm = new ua, this.Wm.load(a));
            0 != p && (a.seek(c + p), this.lp = new ua, this.lp.load(a));
            if (0 != e) switch (a.seek(c + e), b) {
                case 3:
                case 4:
                    this.ed = new Vd;
                    this.ed.load(a);
                    break;
                case 5:
                case 6:
                case 7:
                    this.qb = new ma;
                    this.qb.load(a);
                    break;
                case 8:
                    this.ed = new Ud;
                    this.ed.load(a);
                    this.hh &= ~(A.Yi | A.Qu | A.KI);
                    break;
                case 9:
                    this.ed = new Sd, this.ed.load(a)
            }
        },
        nc: function (a, b) {
            null != this.zj && this.zj.nc(a);
            null != this.ed && this.ed.nc(a, b);
            null != this.qb && this.qb.nc(a, b)
        }
    };
    Sd.prototype = {
        load: function (a) {
            a.qa(4);
            this.si = a.v();
            this.ti = a.v();
            a.l();
            this.lD = a.l();
            this.Wd = a.v();
            a.qa(8);
            this.ax = a.Nb()
        },
        nc: function () {}
    };
    Td.prototype = {
        load: function (a) {
            a.qa(2);
            this.FA = a.v();
            this.HA = a.v();
            this.GA = a.v()
        },
        nc: function () {}
    };
    ma.xP = 0;
    ma.wP = 1;
    ma.oG = 2;
    ma.nG = 3;
    ma.vP = 4;
    ma.yP = 5;
    ma.Zt = 256;
    ma.prototype = {
        load: function (a) {
            a.qa(4);
            this.si = a.v();
            this.ti = a.v();
            this.bx = a.l();
            this.Cf = a.l();
            this.pl = a.l();
            this.Dj = a.l();
            switch (this.Cf) {
                case 1:
                case 4:
                    this.Qm = a.l();
                    this.frames = Array(this.Qm);
                    var b;
                    for (b = 0; b < this.Qm; b++) this.frames[b] = a.l();
                    break;
                case 2:
                case 3:
                case 5:
                    if (this.Fs = a.l(), this.Es = a.Cc(), this.pi = a.l(), this.Aj = a.l(), 1 == this.pi) this.np = a.l();
                    else switch (this.Aj) {
                        case 1:
                            this.gh = a.Cc();
                            break;
                        case 2:
                            this.gh = a.Cc(), this.Vm = a.Cc(), this.mp = a.v()
                    }
            }
        },
        nc: function (a, b) {
            switch (this.Cf) {
                case 1:
                case 4:
                    var c;
                    for (c = 0; c < this.Qm; c++) null != a && a.Qg(this.frames[c]);
                    break;
                case 5:
                    null != b && b.Qg(this.Dj)
            }
        }
    };
    Ud.prototype = {
        load: function (a) {
            a.v();
            a.v();
            this.Wd = a.v();
            a.Cc();
            this.si = a.v();
            this.ti = a.v();
            a.qa(4);
            var b = a.v();
            this.text = a.Nb(b)
        },
        nc: function () {}
    };
    ra.sS = 0;
    ra.rS = 1;
    ra.tS = 2;
    ra.uS = 4;
    ra.qS = 15;
    ra.FJ = 256;
    ra.Lz = 512;
    ra.prototype = {
        load: function (a) {
            this.Bn = a.$();
            this.fq = a.l();
            this.oy = a.Cc();
            this.Mi = a.Nb()
        },
        nc: function (a, b) {
            null != b && b.Qg(this.Bn)
        }
    };
    Vd.prototype = {
        load: function (a) {
            var b = a.U;
            a.qa(4);
            this.qx = a.v();
            this.rx = a.v();
            this.sl = a.v();
            this.dc = Array(this.sl);
            var c = Array(this.sl),
                d;
            for (d = 0; d < this.sl; d++) c[d] = a.v();
            for (d = 0; d < this.sl; d++) this.dc[d] = new ra, a.seek(b + c[d]), this.dc[d].load(a)
        },
        nc: function (a, b) {
            var c;
            for (c = 0; c < this.sl; c++) this.dc[c].nc(a, b)
        }
    };
    M.Pe = 1;
    M.su = 2;
    M.yQ = 4;
    M.Si = 8;
    M.Ti = 16;
    M.UH = 32;
    M.fz = 64;
    M.Kh = 8192;
    M.xQ = 16384;
    M.zQ = 32768;
    M.prototype = {
        Wp: function (a, b) {
            if (this.b.sb != a || this.b.tb != b) {
                0 <= a && (this.b.sb = a);
                0 <= b && (this.b.tb = b);
                this.b.N = !0;
                var c = this.c.h.ia.$k(this.b.Qa, this.b.cb, this.b.sb, this.b.tb);
                null != c && (this.K = c.width, this.M = c.height, this.na = c.Ja, this.oa = c.Ga)
            }
        },
        XN: function (a, b, c, d) {
            var e = this.od;
            b = this.c.Cr(a.lo, a.tv, b, c, d, k.Py | k.Yl, e, -1);
            0 <= b && (b = this.c.H[b], null != b.A ? (b.b.Pa = d, b.A.UB(b, U.uz, !1), b.b.ea = a.YN, b.A.pa.Xr(this), -1 != e &&
                0 != (b.sa & A.Yi) && (this.c.B.Za[e].La & (X.On | X.Pn)) != X.Pn && b.D.jp(), this.c.i.Vk(b), 0 != (this.sa & A.Xi) && this.Z.Lg(B.mq) && (this.Z.eo(B.mq), this.Z.jr())) : this.c.$f(b.Tb))
        },
        aa: function () {},
        handle: function () {},
        Yh: function () {},
        CA: function () {},
        display: function () {},
        Jb: function () {},
        fL: function () {
            return null
        },
        vE: function () {},
        cv: function () {},
        pm: function () {},
        $h: function () {
            return 0
        },
        $j: function () {},
        qj: function () {},
        yn: function () {},
        nd: function () {
            return -1
        },
        Yk: function () {
            return 0
        },
        ce: function () {},
        ej: function () {},
        Am: function () {}
    };
    Wd.prototype = m.extend(new M, {
        handle: function () {
            this.D.handle();
            this.b.N && (this.b.N = !1)
        },
        cv: function (a, b, c, d, e) {
            this.Fa = this.c.B.Za[d];
            this.ua = e;
            this.Fa.Va.we(this)
        },
        wb: function (a, b, c) {
            if (this.ua && (0 == (this.Y & M.Si) || this.D.wh)) {
                var d = this.D.ec;
                this.D.P & u.Bk && (d |= u.zy);
                var e = this.c.h.ia.Sb(this.b.Qa);
                e && (this.Wl ? a.Pj(this.Wl, b + this.w - this.c.ca + this.Fa.x - e.Ja, c + this.u - this.c.fa + this.Fa.y - e.Ga, this.Wl.width * this.b.sb, this.Wl.height * this.b.tb, d, this.D.fc) : a.cf(e, b + this.w - this.c.ca + this.Fa.x, c + this.u - this.c.fa +
                    this.Fa.y, this.b.cb, this.b.sb, this.b.tb, d, this.D.fc))
            }
        },
        $h: function () {
            return this.Fa.Va.removeChild(this)
        },
        $j: function () {
            this.ua = !0
        },
        qj: function () {
            this.ua = !1
        },
        nd: function () {
            return this.Fa.Va.nd(this)
        },
        Yk: function () {
            return this.Fa.Va.children.length
        },
        ce: function (a) {
            a >= this.Fa.Va.children.length && (a = this.Fa.Va.children.length);
            0 > a && (a = 0);
            this.Fa.Va.ce(this, a)
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        }
    });
    T.Dy = 1;
    T.PF = 2;
    T.RF = 4;
    T.rP = 8;
    T.SF = 16;
    T.pP = 32;
    T.cP = 64;
    T.tP = 128;
    T.bP = 256;
    T.uP = 512;
    T.sP = 1024;
    T.fP = 2048;
    T.oq = 4096;
    T.eP = 8192;
    T.Cy = 16384;
    T.lP = 32768;
    T.NF = 65536;
    T.mP = 131072;
    T.dP = 262144;
    T.QF = 524288;
    T.nP = 1048576;
    T.OF = 2097152;
    T.kP = 12582912;
    T.hP = 0;
    T.jP = 4194304;
    T.iP = 8388608;
    T.gP = 12582912;
    T.qP = 16777216;
    T.oP = 33554432;
    T.prototype = m.extend(new M, {
        ME: function (a, b, c) {
            b = a.ed;
            this.K = b.si;
            this.M = b.ti;
            this.Wd = b.Wd;
            0 != (this.Wd & T.SF) && (this.Wd |= T.NF); - 1 == c && (c = 0, 0 != (this.Wd & T.Cy) && (c = b.lD));
            null == b.ax || 0 != b.ax.length || 0 == (this.Wd & T.Cy) || c >= this.c.h.bg || c == this.c.h.Re || (this.xe = 0 != (a.Bj & A.Rq) ? !0 : !1, this.Vc = new Ea, this.Vc.x =
                this.w - this.c.ca, this.Vc.y = this.u - this.c.fa, this.c.h.Ce.we(this), this.ox = this.w, this.px = this.u, this.C = new p(this.c.h, this.c.h.file, this.c.h.path, !0), this.C.wE(this.c.h, c, this.Wd, this.Vc, this.K, this.M), this.C.digest(), 0 != (this.Wd & T.oq) && null == this.c.h.dh && (this.c.h.dh = this, this.c.h.I.pause()), this.C.hy(), this.C.Ct((this.c.h.fk + this.Vc.x) * this.c.h.xc, (this.c.h.hk + this.Vc.y) * this.c.h.yc), this.C.$p(), this.c.h.Pb.push(this.C))
        },
        aa: function (a) {
            this.ME(a, !0, -1)
        },
        handle: function () {
            this.A.move();
            if (null !=
                this.C) {
                if (this.ox != this.w || this.px != this.u) this.Vc.x = this.w - this.c.ca, this.Vc.y = this.u - this.c.fa, this.ox = this.w, this.px = this.u, this.C.Ct(this.Vc.x * this.c.h.xc, this.Vc.y * this.c.h.yc), this.pO();
                0 == this.C.$p() ? (this.yr(), 0 != (this.Wd & T.oq) && null != this.C.Ha && this.C.Ha.dh == this && (this.C.Ha.dh = null, this.C.Ha.I.resume()), this.C = null) : (this.qD = this.level, this.level = this.C.Re)
            }
        },
        wb: function (a) {
            this.xe && null != this.C && this.C.aB(a, this.Vc.x, this.Vc.y)
        },
        Jb: function () {
            if (null != this.C) {
                switch (this.C.jb) {
                    case 3:
                        this.C.wo()
                }
                this.yr();
                this.C.eB();
                0 != (this.Wd & T.oq) && null != this.C.Ha && this.C.Ha.dh == this && (this.C.Ha.dh = null, this.C.Ha.I.resume());
                this.C = null
            }
        },
        yr: function () {
            var a;
            for (a = 0; a < this.c.h.Pb.length; a++)
                if (this.c.h.Pb[a] == this.C) {
                    this.c.h.Pb.splice(a, 1);
                    break
                } this.c.h.Ce.removeChild(this.Vc)
        },
        FU: function () {
            if (null != this.C) {
                if (null != this.C.I) {
                    this.C.I.Bb = k.lz;
                    return
                }
                this.Jb(!0)
            }
            this.ME(this.R, !1, -1)
        },
        xT: function () {
            null != this.C && (null != this.C.I && (this.C.I.Bb = k.yq), 0 != (this.Wd & T.oq) && null != this.C.Ha && this.C.Ha.dh == this && (this.C.Ha.dh =
                null, this.C.Ha.I.resume()))
        },
        Pr: function () {
            this.xe = !1
        },
        show: function () {
            this.xe = !0
        },
        gU: function (a) {
            null != this.C && null != this.C.I && 0 <= a && 4096 > a && (this.C.I.Bb = k.zq, this.C.I.wn = 32768 | a)
        },
        Lb: function () {
            null != this.C && null != this.C.I && (this.C.I.Bb = k.Aq)
        },
        wU: function () {
            null != this.C && null != this.C.I && (this.C.I.Bb = k.uu)
        },
        GU: function () {
            null != this.C && null != this.C.I && (this.C.I.Bb = k.qI)
        },
        pause: function () {
            null != this.C && null != this.C.I && this.C.I.pause()
        },
        resume: function () {
            null != this.C && null != this.C.I && this.C.I.resume()
        },
        PU: function (a, b) {
            null != this.C && this.C.QN(a, b)
        },
        OU: function (a, b) {
            null != this.C && this.C.PN(a, b)
        },
        RL: function () {
            return null != this.C && null != this.C.I ? 0 != this.C.I.ug : !1
        },
        XS: function () {
            return null == this.C
        },
        bU: function () {
            return this.xe
        },
        CT: function () {
            return this.level != this.qD
        },
        PT: function (a) {
            return null != this.C ? this.C.CB(a) : ""
        },
        QT: function (a) {
            return null != this.C ? this.C.Yv(a) : 0
        },
        NT: function () {
            return this.level + 1
        },
        Yp: function () {},
        Vp: function () {},
        cT: function () {
            null != this.C && this.xe && (hoAdRunHeader.h.YM.removeChild(this),
                hoAdRunHeader.h.YM.we(this))
        },
        pO: function () {
            if (null != this.C && null != this.C.I) {
                var a = this.C.I,
                    b = 0,
                    c;
                for (c = 0; c < a.ub; c++) {
                    for (; null == a.H[b];) b++;
                    var d = a.H[b];
                    b++;
                    d.Am()
                }
            }
        },
        ej: function () {
            null != this.C && (this.C.Ct((this.c.h.fk + this.Vc.x) * this.c.h.xc, (this.c.h.hk + this.Vc.y) * this.c.h.yc), this.C.hn())
        }
    });
    Xd.prototype = {
        aa: function () {
            this.tb = this.sb = 1;
            this.cb = 0;
            this.wc = -1
        },
        Jb: function () {}
    };
    ha.Ry = 15;
    ha.iG = 240;
    ha.jG = 4;
    ha.gG = 61440;
    ha.hG = 12;
    ha.kG = 512;
    ha.mG = 1024;
    ha.lG = 2048;
    ha.prototype = m.extend(new M, {
        aa: function () {
            this.Rc = -1;
            this.Mp = this.Qc = 0;
            this.K = this.M = 1;
            if (null == this.R.qb) this.M = this.td = this.K = this.sd = 1;
            else {
                var a = this.R.qb;
                this.K = this.sd = a.si;
                this.M = this.td = a.ti;
                this.Od = a.pl;
                this.type = a.Cf;
                switch (this.type) {
                    case 5:
                        var b = this.Rc; - 1 == b && (b = a.Dj);
                        this.font = this.c.h.ac.dg(b);
                        this.Sd = this.font.Ue();
                        this.Qc = a.gh;
                        break;
                    case 2:
                    case 3:
                        this.Qc = a.gh, this.Mp = a.Vm
                }
            }
            a = this.R.ed;
            this.xb = a.HA;
            this.Zc = a.GA;
            this.ya = a.FA;
            this.fj = !1
        },
        Jb: function () {},
        handle: function () {
            this.D.handle();
            this.b.N && (this.b.N = !1)
        },
        cg: function () {
            var a =
                this.R.qb;
            if (5 == this.type) {
                var b = rsFont; - 1 == b && (b = a.Dj);
                return this.c.h.ac.Ir(b)
            }
            return null
        },
        Sl: function (a, b) {
            5 == this.type && (this.Rc = this.c.h.ac.hr(a), this.font = this.c.h.ac.dg(this.Rc), this.Sd = this.font.Ue(), null != b && (this.K = this.sd = b.right - b.left, this.M = this.td = b.bottom - b.top), this.ob())
        },
        Hr: function () {
            return this.Qc
        },
        At: function (a) {
            this.Qc = a;
            this.ob()
        },
        Av: function (a) {
            0 != this.fj || m.sw(a) || (this.fj = !0)
        },
        po: function (a) {
            0 == this.fj ? (a = m.Rd(a), a < this.xb && (a = this.xb), a > this.Zc && (a = this.Zc), a != Math.round(this.ya) &&
                (this.ya = a, this.b.N = !0, this.ob())) : (a < this.xb && (a = this.xb), a > this.Zc && (a = this.Zc), a != this.ya && (this.ya = a, this.b.N = !0, this.ob()))
        },
        rK: function (a) {
            this.Av(a);
            this.po(this.ya + a)
        },
        sK: function (a) {
            this.Av(a);
            this.po(this.ya - a)
        },
        pT: function (a) {
            this.xb = a;
            this.po(this.ya)
        },
        oT: function (a) {
            this.Zc = a;
            this.po(this.ya)
        },
        mT: function (a) {
            this.Qc = a;
            this.ob()
        },
        nT: function (a) {
            this.Mp = a;
            this.ob()
        },
        lT: function () {
            return this.ya
        },
        kT: function () {
            return this.xb
        },
        jT: function () {
            return this.Zc
        },
        hT: function () {
            return this.Qc
        },
        iT: function () {
            return this.Mp
        },
        pm: function (a, b, c, d, e, f) {
            null != this.R.qb && 1 != this.Ua && (this.Ua = !0, this.Yz = d, this.ua = e, this.Fa = this.c.B.Za[c], this.ta = this.Yz ? this.Fa.Wb : this.Fa.Va, 0 > f ? this.ta.we(this) : this.ta.fr(this, f), 5 != this.type && this.ob())
        },
        $h: function () {
            if (null == this.R.qb || 0 == this.Ua) return -1;
            this.Ua = !1;
            var a = this.ta.nd(this);
            this.ta.removeChild(this);
            return a
        },
        nd: function () {
            return this.Ua ? this.ta.nd(this) : -1
        },
        Yk: function () {
            return this.Ua ? this.ta.children.length : -1
        },
        ce: function (a) {
            this.Ua && this.ta.ce(this, a)
        },
        $j: function () {
            null !=
                this.R.qb && 0 == this.ua && (this.ua = !0, this.ob())
        },
        qj: function () {
            null != this.R.qb && 1 == this.ua && (this.ua = !1)
        },
        Yh: function () {
            this.he || this.ob()
        },
        ob: function () {
            var a, b = this.R.qb;
            switch (this.type) {
                case 4:
                    this.vh = this.Zc <= this.xb ? 0 : Math.floor((this.ya - this.xb) * b.Qm / (this.Zc - this.xb));
                    this.vh = Math.min(this.vh, b.Qm - 1);
                    a = this.c.h.ia.Sb(b.frames[Math.max(this.vh, 0)]);
                    this.K = a.width;
                    this.M = a.height;
                    this.na = a.Ja;
                    this.oa = a.Ga;
                    break;
                case 2:
                case 3:
                    a = this.sd;
                    b.Cf == ma.oG && (a = this.td);
                    this.vh = this.Zc <= this.xb ? 0 : (this.ya -
                        this.xb) * a / (this.Zc - this.xb);
                    b.Cf == ma.nG ? (this.oa = 0, this.M = this.td, this.K = this.vh, this.na = 0 != (b.pl & ma.Zt) ? this.vh - this.sd : 0) : (this.na = 0, this.K = this.sd, this.M = this.vh, this.oa = 0 != (b.pl & ma.Zt) ? this.vh - this.td : 0);
                    break;
                case 1:
                    a = 0 == this.fj ? m.sj(this.ya, this.Od) : m.Lv(this.ya, this.Od);
                    var c, d, e, f = 0,
                        g = 0;
                    for (c = a.length - 1; 0 <= c; c--) d = a.charCodeAt(c), e = 0, 45 == d ? e = b.frames[10] : 46 == d ? e = b.frames[12] : 43 == d ? e = b.frames[11] : 101 == d || 69 == d ? e = b.frames[13] : 48 <= d && 57 >= d && (e = b.frames[d - 48]), 0 <= e && (d = this.c.h.ia.Sb(e), null !=
                        d ? (f += d.width, g = Math.max(g, d.height)) : toto = 2);
                    this.na = f;
                    this.oa = g;
                    this.K = f;
                    this.M = g;
                    break;
                case 5:
                    a = 0 == this.fj ? m.sj(this.ya, this.Od) : m.Lv(this.ya, this.Od), this.na = b = null != this.Ka ? this.Ka.measureText(a, this.font) : (new ga(this.c.h, 16, 16)).measureText(a, this.font), this.oa = this.td / 2 + this.Sd / 2, this.K = b, this.M = this.Sd, null == this.Ka ? this.Ka = new ga(this.c.h, this.K, this.M) : (this.K > this.Ka.width || this.M > this.Ka.height) && this.Ka.resize(this.K, this.M), this.Ka.Tl(a, m.pk | m.qk, new aa(0, 0, 1E3, 1E3), this.font, this.Qc)
            }
            this.he = !0
        },
        wb: function (a, b, c) {
            if (this.ua && this.he) {
                var d, e, f;
                d = this.R.qb;
                b = b + this.w - this.na - this.c.ca + this.Fa.x;
                c = c + this.u - this.oa - this.c.fa + this.Fa.y;
                var g = this.K,
                    h = this.M;
                switch (this.type) {
                    case 4:
                        d = this.c.h.ia.Sb(d.frames[Math.max(this.vh, 0)]);
                        a.cf(d, b + d.Ja, c + d.Ga, 0, 1, 1, this.D.ec, this.D.fc);
                        break;
                    case 2:
                    case 3:
                        e = this.Qc;
                        f = this.Mp;
                        switch (d.Aj) {
                            case 1:
                                a.Mc(b, c, g, h, e, this.D.ec, this.D.fc);
                                break;
                            case 2:
                                0 != (d.pl & ma.Zt) && (dl = e, e = f, f = dl), a.Ox(b, c, g, h, e, f, 0 != d.mp, this.D.ec, this.D.fc)
                        }
                        break;
                    case 1:
                        e = 0 == this.fj ?
                            m.sj(this.ya, this.Od) : m.Lv(this.ya, this.Od);
                        for (f = 0; f < e.length; f++) h = e.charCodeAt(f), g = 0, 45 == h ? g = d.frames[10] : 46 == h || 44 == h ? g = d.frames[12] : 43 == h ? g = d.frames[11] : 69 == h || 101 == h ? g = d.frames[13] : 48 <= h && 57 >= h && (g = d.frames[h - 48]), g = this.c.h.ia.Sb(g), null != g && (a.cf(g, b + g.Ja, c + g.Ga, 0, 1, 1, this.D.ec, this.D.fc), b += g.width);
                        break;
                    case 5:
                        this.Ka.wb(a, b, c, this.D.ec, this.D.fc)
                }
            }
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        }
    });
    Yd.prototype = m.extend(new M, {
        aa: function () {
            this.Rc = -1;
            this.Qc = 0;
            var a = this.R.qb;
            this.K = this.sd =
                a.si;
            this.M = this.td = a.ti;
            this.type = a.Cf;
            this.Qc = a.gh;
            this.Ji = a.bx;
            this.ya = this.c.h.Kr()[this.Ji - 1];
            this.Od = a.pl;
            if (5 == this.type) {
                var b = this.Rc; - 1 == b && (b = a.Dj);
                this.font = this.c.h.ac.dg(b);
                this.Sd = this.font.Ue()
            }
        },
        Jb: function () {},
        handle: function () {
            var a = this.c.h.Kr()[this.Ji - 1];
            a != this.ya && (this.ya = a, this.ob());
            this.D.handle();
            this.b.N && (this.b.N = !1)
        },
        cg: function () {
            var a = this.R.qb;
            if (5 == a.Cf) {
                var b = this.Rc; - 1 == b && (b = a.Dj);
                return this.c.h.ac.Ir(b)
            }
            return null
        },
        Sl: function (a, b) {
            5 == type && (this.Rc = hoAdRunHeader.h.ac.hr(a),
                a = this.c.h.ac.dg(this.Rc), this.Sd = a.Ue(), null != b && (this.K = this.sd = b.right - b.left, this.M = this.td = b.bottom - b.top), this.ob())
        },
        Hr: function () {
            return this.Qc
        },
        At: function (a) {
            this.Qc = a;
            this.ob()
        },
        pm: function (a, b, c, d, e, f) {
            null != this.R.qb && 1 != this.Ua && (this.Ua = !0, this.ua = e, this.Fa = this.c.B.Za[c], this.ta = d ? this.Fa.Wb : this.Fa.Va, 0 > f ? this.ta.we(this) : this.ta.fr(this, f), 5 != this.type && this.ob())
        },
        $h: function () {
            if (null == this.R.qb || 0 == this.Ua) return -1;
            this.Ua = !1;
            var a = this.ta.nd(this);
            this.ta.removeChild(this);
            return a
        },
        nd: function () {
            return this.Ua ? this.ta.nd(this) : -1
        },
        Yk: function () {
            return this.Ua ? this.ta.children.length : -1
        },
        ce: function (a) {
            this.Ua && this.ta.ce(this, a)
        },
        $j: function () {
            null != this.R.qb && 0 == this.ua && (this.ua = !0, this.ob())
        },
        qj: function () {
            null != this.R.qb && 1 == this.ua && (this.ua = !1)
        },
        Ft: function (a) {
            a != this.ya && (this.ya = a, this.ob())
        },
        Yh: function () {
            this.he || this.ob()
        },
        ob: function () {
            this.he = !0;
            this.K = this.M = 1;
            if (null != this.R.qb) {
                var a = this.R.qb,
                    b, c = m.sj(this.ya, this.Od);
                switch (a.Cf) {
                    case 1:
                        var d, e, f =
                            0,
                            g = 0;
                        for (d = c.length - 1; 0 <= d; d--) e = c.charCodeAt(d), b = 0, 45 == e ? b = a.frames[10] : 46 == e ? b = a.frames[12] : 43 == e ? b = a.frames[11] : 101 == e || 69 == e ? b = a.frames[13] : 48 <= e && 57 >= e && (b = a.frames[e - 48]), 0 <= b && (b = this.c.h.ia.Sb(b), f += b.width, g = Math.max(g, b.height));
                        this.na = f;
                        this.oa = g;
                        this.K = f;
                        this.M = g;
                        break;
                    case 5:
                        this.na = a = null != this.Ka ? this.Ka.measureText(c, this.font) : (new ga(this.c.h, 8, 8)).measureText(c, this.font), this.oa = this.td / 2 + this.Sd / 2, this.K = a, this.M = this.Sd, null == this.Ka ? this.Ka = new ga(this.c.h, this.K, this.M) :
                            (this.K > this.Ka.width || this.M > this.Ka.height) && this.Ka.resize(this.K, this.M), this.Ka.Tl(c, m.pk | m.qk, new aa(0, 0, 1E3, 1E3), this.font, this.Qc)
                }
            }
        },
        wb: function (a, b, c) {
            if (this.ua && this.he) {
                this.globalAlpha = this.alpha;
                this.globalCompositeOperation = this.Lk;
                var d = this.R.qb;
                b = b + this.w - this.na - this.c.ca + this.Fa.x;
                var e = c + this.u - this.oa - this.c.fa + this.Fa.y;
                c = m.sj(this.ya, this.Od);
                switch (this.type) {
                    case 1:
                        var f, g;
                        for (f = 0; f < c.length; f++) {
                            var h = c.charCodeAt(f);
                            g = 0;
                            45 == h ? g = d.frames[10] : 46 == h || 44 == h ? g = d.frames[12] :
                                43 == h ? g = d.frames[11] : 69 == h || 101 == h ? g = d.frames[13] : 48 <= h && 57 >= h && (g = d.frames[h - 48]);
                            g = this.c.h.ia.Sb(g);
                            a.cf(g, b + g.Ja, e + g.Ga, 0, 1, 1, this.D.ec, this.D.fc);
                            b += g.width
                        }
                        break;
                    case 5:
                        this.Ka.wb(a, b, e, this.D.ec, this.D.fc)
                }
            }
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        }
    });
    Zd.prototype = m.extend(new M, {
        aa: function () {
            this.Rc = -1;
            this.Qc = 0;
            var a = this.R.qb;
            this.K = this.sd = a.si;
            this.M = this.td = a.ti;
            this.type = a.Cf;
            this.Qc = a.gh;
            this.Ji = a.bx;
            this.ya = this.c.h.Dm()[this.Ji - 1];
            this.Od = a.pl;
            if (5 == this.type) {
                var b = this.Rc; - 1 ==
                    b && (b = a.Dj);
                this.font = this.c.h.ac.dg(b);
                this.Sd = this.font.Ue()
            }
        },
        Jb: function () {},
        handle: function () {
            var a = this.c.h.Dm()[this.Ji - 1];
            a != this.ya && (this.ya = a, this.ob());
            this.D.handle();
            this.b.N && (this.b.N = !1)
        },
        cg: function () {
            var a = this.R.qb;
            if (5 == a.Cf) {
                var b = this.Rc; - 1 == b && (b = a.Dj);
                return this.c.h.ac.Ir(b)
            }
            return null
        },
        Sl: function (a, b) {
            5 == type && (this.Rc = hoAdRunHeader.h.ac.hr(a), a = this.c.h.ac.dg(this.Rc), this.Sd = a.Ue(), null != b && (this.K = this.sd = b.right - b.left, this.M = this.td = b.bottom - b.top), this.ob())
        },
        Hr: function () {
            return this.Qc
        },
        At: function (a) {
            this.Qc = a;
            this.ob()
        },
        pm: function (a, b, c, d, e, f) {
            null != this.R.qb && 1 != this.Ua && (this.Ua = !0, this.ua = e, this.Fa = this.c.B.Za[c], this.ta = d ? this.Fa.Wb : this.Fa.Va, 0 > f ? this.ta.we(this) : this.ta.fr(this, f), 5 != this.type && this.ob())
        },
        $h: function () {
            if (null == this.R.qb || 0 == this.Ua) return -1;
            this.Ua = !1;
            var a = this.ta.nd(this);
            this.ta.removeChild(this);
            return a
        },
        nd: function () {
            return this.Ua ? this.ta.nd(this) : -1
        },
        Yk: function () {
            return this.Ua ? this.ta.children.length : -1
        },
        ce: function (a) {
            this.Ua && this.ta.ce(this,
                a)
        },
        $j: function () {
            null != this.R.qb && 0 == this.ua && (this.ua = !0, this.ob())
        },
        qj: function () {
            null != this.R.qb && 1 == this.ua && (this.ua = !1)
        },
        Ft: function (a) {
            a != this.ya && (this.ya = a, this.ob())
        },
        Yh: function () {
            this.he || this.ob()
        },
        ob: function () {
            this.he = !0;
            this.K = this.M = 1;
            if (null != this.R.qb) {
                var a = this.R.qb;
                switch (a.Cf) {
                    case 4:
                        if (0 != this.ya) {
                            var b = this.c.h.ia.Sb(a.frames[0]),
                                c = this.ya * b.width;
                            c <= this.sd ? (this.K = c, this.M = b.height) : (this.K = this.sd, this.M = (this.sd / b.width + this.ya - 1) * b.height);
                            break
                        }
                        this.K = this.M = 1;
                        break;
                    case 1:
                        var d, e, b, f = 0,
                            g = 0,
                            c = m.sj(this.ya, this.Od);
                        for (d = c.length - 1; 0 <= d; d--) b = c.charCodeAt(d), e = 0, 45 == b ? e = a.frames[10] : 46 == b ? e = a.frames[12] : 43 == b ? e = a.frames[11] : 101 == b || 69 == b ? e = a.frames[13] : 48 <= b && 57 >= b && (e = a.frames[b - 48]), 0 <= e && (b = this.c.h.ia.Sb(e), f += b.width, g = Math.max(g, b.height));
                        this.na = f;
                        this.oa = g;
                        this.K = f;
                        this.M = g;
                        break;
                    case 5:
                        c = m.sj(this.ya, this.Od), this.na = a = null != this.Ka ? this.Ka.measureText(c, this.font) : (new ga(this.c.h, 8, 8)).measureText(c, this.font), this.oa = this.td / 2 + this.Sd / 2, this.K = a,
                            this.M = this.Sd, null == this.Ka ? this.Ka = new ga(this.c.h, this.K, this.M) : (this.K > this.Ka.width || this.M > this.Ka.height) && this.Ka.resize(this.K, this.M), this.Ka.Tl(c, m.pk | m.qk, new aa(0, 0, 1E3, 1E3), this.font, this.Qc)
                }
            }
        },
        wb: function (a, b, c) {
            if (this.ua && this.he) {
                this.globalAlpha = this.alpha;
                this.globalCompositeOperation = this.Lk;
                var d, e = this.R.qb;
                b = b + this.w - this.na - this.c.ca + this.Fa.x;
                c = c + this.u - this.oa - this.c.fa + this.Fa.y;
                switch (this.type) {
                    case 1:
                        var f, g;
                        d = m.sj(this.ya, this.Od);
                        for (f = 0; f < d.length; f++) {
                            var h = d.charCodeAt(f);
                            g = 0;
                            45 == h ? g = e.frames[10] : 46 == h || 44 == h ? g = e.frames[12] : 43 == h ? g = e.frames[11] : 69 == h || 101 == h ? g = e.frames[13] : 48 <= h && 57 >= h && (g = e.frames[h - 48]);
                            g = this.c.h.ia.Sb(g);
                            a.cf(g, b + g.Ja, c + g.Ga, 0, 1, 1, this.D.ec, this.D.fc);
                            b += g.width
                        }
                        break;
                    case 4:
                        if (0 != this.ya) {
                            d = b + this.K;
                            f = c + this.M;
                            var h = b,
                                q = this.ya;
                            for (g = this.c.h.ia.Sb(e.frames[0]); c < f && 0 < q; c += g.height)
                                for (b = h; b < d && 0 < q; b += g.width, --q) a.cf(g, b + g.Ja, c + g.Ga, 0, 1, 1, this.D.ec, this.D.fc)
                        }
                        break;
                    case 5:
                        this.Ka.wb(a, b, c, this.D.ec, this.D.fc)
                }
            }
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        }
    });
    $d.prototype = m.extend(new M, {
        aa: function (a, b) {
            var c = a.ed;
            this.K = c.qx;
            this.M = c.rx;
            this.sd = c.qx;
            this.td = c.rx;
            this.Zc = c.sl;
            this.Np = 0;
            0 < c.dc.length && (this.Np = c.dc[0].oy);
            this.Ki = null;
            this.Rc = -1;
            this.xb = 0;
            this.ua = !0;
            this.bE = b.pr;
            0 < c.dc.length && (this.Ki = c.dc[0].Mi);
            var d = this.Rc; - 1 == d && 0 < c.dc.length && (d = c.dc[0].Bn);
            this.font = this.c.h.ac.dg(d);
            this.Ka = new ga(this.c.h, this.K, this.M)
        },
        Jb: function () {},
        handle: function () {
            this.D.handle();
            this.b.N && (this.b.N = !1)
        },
        cg: function () {
            var a = this.Rc; - 1 ==
                a && (a = this.R.ed.dc[0].Bn);
            return this.c.h.ac.Ir(a)
        },
        Sl: function (a, b) {
            this.Rc = this.c.h.ac.hr(a);
            this.font = this.c.h.ac.dg(this.Rc);
            null != b && (this.K = b.right - b.left, this.M = b.bottom - b.top, this.Ka.resize(this.K, this.M));
            this.b.N = !0;
            this.ob()
        },
        Hr: function () {
            return this.Np
        },
        At: function (a) {
            this.Np = a;
            this.ob()
        },
        pm: function (a, b, c, d, e, f) {
            1 != this.Ua && (this.Ua = !0, this.ua = e, this.Fa = this.c.B.Za[c], this.ta = d ? this.Fa.Wb : this.Fa.Va, 0 > f ? this.ta.we(this) : this.ta.fr(this, f))
        },
        $h: function () {
            if (0 == this.Ua) return -1;
            this.Ua = !1;
            var a = this.ta.nd(this);
            this.ta.removeChild(this);
            return a
        },
        nd: function () {
            return this.Ua ? this.ta.nd(this) : -1
        },
        Yk: function () {
            return this.Ua ? this.ta.children.length : -1
        },
        ce: function (a) {
            this.Ua && this.ta.ce(this, a)
        },
        $j: function () {
            0 == this.ua && (this.ua = !0)
        },
        qj: function () {
            1 == this.ua && (this.ua = !1)
        },
        lO: function (a) {
            -1 > a && (a = -1);
            a >= this.Zc && (a = this.Zc - 1);
            if (a == this.xb) return !1;
            this.xb = a;
            0 <= a && this.YE(this.R.ed.dc[this.xb].Mi);
            this.ob();
            return 0 != (this.D.P & u.Kg) ? !1 : !0
        },
        YE: function (a) {
            this.Ki = a;
            this.ob()
        },
        Yh: function () {
            this.he ||
                this.ob()
        },
        ob: function () {
            this.he = !0;
            var a = this.R.ed,
                b = a.dc[0].fq;
            this.oa = this.na = 0;
            this.rect.left = 0;
            this.rect.top = 0;
            this.rect.right = this.K;
            this.rect.bottom = this.M;
            0 <= this.xb ? a = a.dc[this.xb].Mi : (a = this.Ki, null == a && (a = ""));
            b &= m.pk | m.nk | m.eu | m.qk | m.qq | m.Ri | m.vG;
            a = this.Ka.Tl(a, b, this.rect, this.font, this.Np);
            0 == (b & (m.qq | m.Ri)) && (this.M = a)
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        },
        wb: function (a, b, c) {
            this.ua && this.he && this.Ka.wb(a, b + this.w - this.c.ca + this.Fa.x, c + this.u - this.c.fa + this.Fa.y, this.D.ec, this.D.fc)
        }
    });
    ae.prototype = m.extend(new M, {
        aa: function () {},
        Jb: function () {},
        handle: function () {
            this.c.pause();
            this.c.Us = this;
            this.c.B.Za[this.c.B.uc - 1].Va.we(this);
            this.mK()
        },
        yr: function () {
            this.c.B.Za[this.c.B.uc - 1].Va.removeChild(this)
        },
        yL: function () {
            var a;
            a = this.c.h.lg - this.c.h.Bg;
            var b = this.c.h.mg - this.c.h.Cg;
            0 == this.Mk ? this.c.h.cd[p.Tf] && (a = this.IB(a, b), 0 != a && (this.Mk = a)) : this.c.h.cd[p.Tf] || (this.IB(a, b) == this.Mk ? (this.c.i.Gb = this.Mk, this.c.i.Cd(this, -5439484), 0 != (this.R.ed.dc[this.Mk].fq & ra.FJ) ? this.c.i.Cd(this,
                -5308412) : this.c.i.Cd(this, -5373948), this.yr(), this.c.Us = null, this.c.resume(), this.c.Dr(this.Tb, !0)) : this.Mk = 0)
        },
        IB: function (a, b) {
            var c;
            if (null != this.Zd)
                for (c = 1; c < this.Zd.length; c++)
                    if (a >= this.Zd[c].left && a < this.Zd[c].right && b > this.Zd[c].top && b < this.Zd[c].bottom) return c;
            return 0
        },
        eA: function (a, b, c) {
            var d, e;
            c ? (d = 8421504, e = 16777215) : (e = 8421504, d = 16777215);
            a.Cp(b.left, b.top, b.right - b.left, b.bottom - b.top, 0, 1);
            var f = Array(3),
                g;
            for (g = 0; 3 > g; g++) f[g] = new G;
            f[0].x = b.right - 1;
            0 == c && --f[0].x;
            f[0].y = b.top + 1;
            f[1].y = b.top + 1;
            f[1].x = b.left + 1;
            f[2].x = b.left + 1;
            f[2].y = b.bottom;
            0 == c && --f[2].y;
            a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, d, 1);
            a.Lc(f[1].x, f[1].y, f[2].x, f[2].y, d, 1);
            0 == c && --f[0].x;
            f[0].y += 1;
            f[1].x += 1;
            f[1].y += 1;
            f[2].x += 1;
            0 == c && --f[2].y;
            a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, d, 1);
            a.Lc(f[1].x, f[1].y, f[2].x, f[2].y, d, 1);
            0 == c && (f[0].x += 2, f[1].x = b.right - 1, f[1].y = b.bottom - 1, f[2].y = b.bottom - 1, --f[2].x, a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, e, 1), a.Lc(f[1].x, f[1].y, f[2].x, f[2].y, e, 1), --f[0].x, f[0].y += 1, --f[1].x, --f[1].y, f[2].x += 1,
                --f[2].y, a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, e, 1), a.Lc(f[1].x, f[1].y, f[2].x, f[2].y, e, 1))
        },
        uN: function (a, b, c) {
            var d = new aa;
            d.wA(this.Zd[b]);
            this.eA(a, this.Zd[b], c);
            d.left += 2;
            d.top += 2;
            d.right -= 4;
            d.bottom -= 4;
            c && (d.left += 2, d.top += 2);
            this.Jd[b].wb(a, (d.left + d.right) / 2 - this.Jd[b].width / 2, (d.top + d.bottom) / 2 - this.Jd[b].height / 2, 0, 0)
        },
        mK: function () {
            this.vs = new ga(this.c.h, 8, 8);
            var a = this.R.ed,
                b = this.c,
                c = a.dc[1],
                d = c.oy,
                e = 0 != (c.fq & ra.Lz),
                f = b.h.ac.dg(c.Bn);
            this.Ut = Math.floor(3 * this.vs.measureText("X", f) / 2);
            this.rj =
                4;
            this.Ud = 64;
            var g;
            for (g = 1; g < a.dc.length; g++) c = a.dc[g], 0 < c.Mi.length && (c = this.vs.measureText(c.Mi, f), this.Ud = Math.max(this.Ud, c + 2 * this.Ut + 4), this.rj = Math.max(this.rj, Math.floor(3 * f.Ue() / 2)));
            this.Sr = Math.max(Math.floor(this.rj / 4), 2);
            this.Ud += 2 * this.Ut + 4;
            var h = new aa;
            for (g = 1; g < a.dc.length; g++) c = a.dc[g], this.Jd[g] = new ga(b.h, this.Ud, this.rj), h.right = this.Ud, h.bottom = this.rj, this.Jd[g].us(c.Mi, m.nk | m.Ri, h, d, f, e ? 1 : 0, 16777215);
            a = a.dc[0];
            e = 0 != (a.fq & ra.Lz);
            f = b.h.ac.dg(a.Bn);
            g = Math.floor(3 * this.vs.measureText("X",
                f) / 2);
            c = this.vs.measureText(a.Mi, f);
            this.No = Math.floor(3 * f.Ue() / 2);
            this.Ud = Math.max(this.Ud, c + 2 * g + 4);
            this.Ud > b.h.va ? this.Ud = b.h.va : this.Ud > b.B.ne && (this.Ud = b.B.ne);
            h.right = this.Ud;
            h.bottom = this.No;
            this.Jd[0] = new ga(b.h, this.Ud, this.No);
            this.Jd[0].us(a.Mi, m.nk | m.Ri, h, d, f, e ? 1 : 0, 16777215)
        },
        wb: function (a) {
            var b = this.R.ed,
                c = this.c,
                d = this.w - c.ca,
                c = this.u - c.fa,
                e = new aa;
            e.left = d;
            e.top = c;
            var f = this.No + 1 + (this.rj + this.Sr) * (b.dc.length - 1) + this.Sr + 4;
            e.right = d + this.Ud;
            e.bottom = c + f;
            a.Mc(e.left, e.top, e.right - e.left,
                e.bottom - e.top, 12632256, 0, 0);
            this.eA(a, e, !1);
            e.left += 2;
            e.top += 2;
            e.right -= 2;
            e.bottom = e.top + this.No;
            this.Jd[0].wb(a, (e.left + e.right) / 2 - this.Jd[0].width / 2, (e.top + e.bottom) / 2 - this.Jd[0].height / 2, 0, 0);
            e.top = e.bottom;
            a.Lc(e.left, e.top, e.right, e.bottom, 8421504, 1, 0, 0);
            e.top += 1;
            e.bottom += 1;
            a.Lc(e.left, e.top, e.right, e.bottom, 16777215, 1, 0, 0);
            if (null == this.Zd)
                for (this.Zd = Array(b.dc.length), i = 1; i < b.dc.length; i++) this.Zd[i] = new aa, this.Zd[i].left = d + 2 + this.Ut, this.Zd[i].right = d + this.Ud - 2 - this.Ut, this.Zd[i].top =
                    c + 2 + this.No + 1 + this.Sr + (this.rj + this.Sr) * (i - 1), this.Zd[i].bottom = this.Zd[i].top + this.rj;
            for (i = 1; i < b.dc.length; i++) this.uN(a, i, this.Mk == i)
        }
    });
    be.prototype = m.extend(new M, {
        aa: function (a, b) {
            this.ext.aa(this);
            var c = this.c.h.file.Pg(a.hD);
            this.zx = a.jD;
            this.ext.Ev(c, b, a.kD)
        },
        cv: function (a, b, c, d, e) {
            this.Fa = this.c.B.Za[d];
            this.ua = e;
            1 != this.Ua && (this.Ua = !0, this.ta = this.Fa.Va, this.ta.we(this))
        },
        pm: function (a, b, c, d, e) {
            this.Fa = this.c.B.Za[c];
            this.ua = e;
            1 != this.Ua && (this.Ua = !0, this.ta = d ? this.Fa.Wb : this.Fa.Va, this.ta.we(this))
        },
        $h: function () {
            if (0 == this.Ua) return -1;
            this.Ua = !1;
            var a = this.ta.nd(this);
            this.ta.removeChild(this);
            return a
        },
        handle: function () {
            0 != (this.sa & 512) ? this.D.handle() : 16 == (this.sa & 48) || 48 == (this.sa & 48) ? this.A.move() : 32 == (this.sa & 48) && this.Z.lf();
            var a = 0;
            0 == this.Xw && (a = this.ext.Or());
            0 != (a & ta.Iz) && (this.Xw = !0);
            null != this.b && this.b.N && (this.b.N = !1)
        },
        ej: function () {
            this.ext.ej()
        },
        CA: function () {},
        wb: function (a, b, c) {
            this.ua && this.ext.YA(a, b, c)
        },
        Jb: function (a) {
            this.ext.Hv(a)
        },
        fL: function () {
            return null
        },
        oo: function (a,
            b) {
            return this.ext.oo(a, b)
        },
        action: function (a, b) {
            this.ext.action(a, b)
        },
        yo: function (a) {
            return this.ext.yo(a)
        },
        yn: function (a) {
            this.D.ec = u.Of;
            this.D.fc = a
        },
        NU: function () {},
        $j: function () {
            this.ua = !0
        },
        qj: function () {
            this.ua = !1
        },
        nd: function () {
            return this.ta.nd(this)
        },
        Yk: function () {
            return this.ta.children.length
        },
        ce: function (a) {
            a >= this.ta.children.length && (a = this.ta.children.length);
            0 > a && (a = 0);
            this.ta.ce(this, a)
        },
        TM: function () {},
        pK: function () {},
        Am: function () {
            this.ext.Am()
        },
        fC: function (a) {
            this.c.h.ia.fC(a)
        },
        RT: function (a) {
            return this.c.h.ia.Sb(a)
        },
        HT: function () {
            return this.c.h
        },
        XT: function () {
            return this.w
        },
        YT: function () {
            return this.u
        },
        WT: function () {
            return this.K
        },
        Ue: function () {
            return this.M
        },
        Gt: function (a) {
            null != this.A ? this.A.pa.kc(a) : (this.w = a, null != this.b && (this.b.N = !0, this.b.Wa = !0))
        },
        Ht: function (a) {
            null != this.A ? this.A.pa.lc(a) : (this.u = a, null != this.b && (this.b.N = !0, this.b.Wa = !0))
        },
        Yp: function (a) {
            this.K = a
        },
        Vp: function (a) {
            this.M = a
        },
        Xp: function (a, b) {
            this.K = a;
            this.M = b
        },
        BU: function () {
            this.Xw = !1
        },
        GT: function (a,
            b) {
            if (0 == this.c.ug) {
                var c = this.c.i.Gb;
                this.c.i.Gb = b;
                a = -(a + J.Oe + 1) << 16;
                a |= this.Aa & 65535;
                this.c.i.Cd(this, a);
                this.c.i.Gb = c
            }
        },
        an: function (a, b) {
            0 == this.c.ug && (a = -(a + J.Oe + 1) << 16, a |= this.Aa & 65535, this.c.i.GD(1, a, b, this, this.uf))
        },
        pause: function () {
            this.c.pause()
        },
        resume: function () {
            this.c.resume()
        },
        CU: function () {},
        tT: function () {
            this.c.$f(this.Tb)
        },
        setPosition: function (a, b) {
            null != this.A ? (this.A.pa.kc(a), this.A.pa.lc(b)) : (this.w = a, this.u = b, null != this.b && (this.b.N = !0, this.b.Wa = !0))
        },
        LT: function () {
            return this.zx
        },
        MU: function (a) {
            this.zx = a
        },
        er: function (a, b, c, d, e) {
            this.c.er(a, b, c, e, d, !0)
        },
        JT: function () {
            return this.c.kt
        },
        Cm: function () {
            this.c.Dc++;
            return this.c.getExpression()
        },
        KT: function () {
            return this.c.i.Gb
        },
        fA: function (a, b, c) {
            return 0 != (a.sa & A.Sf) && a.b.wc == U.Sh ? a.A.pa.fA(b, c) : 0
        },
        MT: function () {
            this.Zw = this.kp = 0;
            return this.pL()
        },
        pL: function () {
            if (this.Zw < this.c.ub) {
                for (; null == this.c.H[this.kp];) this.kp++;
                var a = this.c.H[this.kp];
                this.Zw++;
                this.kp++;
                return a
            }
            return null
        },
        TT: function (a) {
            var b = 0,
                c;
            for (c = 0; c < this.c.ub; c++) {
                for (; null ==
                    this.c.H[b];) b++;
                var d = this.c.H[b];
                b++;
                if ((d.iw << 16 | d.Tb & 65535) == a) return d
            }
            return null
        },
        nB: function (a) {
            return this.c.nB(a)
        },
        oB: function (a) {
            return this.c.oB(a)
        },
        PM: function (a) {
            return hoAdRunHeader.h.PM(a)
        },
        fT: function () {}
    });
    Ya.XR = 22;
    Ya.create = function (a) {
        var b = a.file.U,
            c = null,
            d = a.file.l(),
            e = a.file.l();
        switch (e) {
            case 1:
                c = new vf(a);
                break;
            case 2:
                c = new xf(a);
                break;
            case 3:
                c = new ja(a);
                break;
            case 4:
                c = new ja(a);
                break;
            case 5:
                c = new Ga(a);
                break;
            case 6:
                c = new Ra(a);
                break;
            case 7:
                c = new Ga(a);
                break;
            case 9:
                c = new nb(a);
                break;
            case 10:
                c = new ja(a);
                break;
            case 11:
                c = new ja(a);
                break;
            case 12:
                c = new ja(a);
                break;
            case 13:
                c = new sf(a);
                break;
            case 14:
                c = new de(a);
                break;
            case 15:
                c = new sa(a);
                break;
            case 16:
                c = new ee(a);
                break;
            case 17:
                c = new ja(a);
                break;
            case 18:
                c = new fe(a);
                break;
            case 19:
                c = new ge(a);
                break;
            case 21:
                c = new nb(a);
                break;
            case 22:
                c = new sa(a);
                break;
            case 23:
                c = new sa(a);
                break;
            case 24:
                c = new rf(a);
                break;
            case 25:
                c = new Ga(a);
                break;
            case 26:
                c = new ja(a);
                break;
            case 27:
                c = new sa(a);
                break;
            case 28:
                c = new sa(a);
                break;
            case 29:
                c = new Ga(a);
                break;
            case 31:
                c =
                    new ja(a);
                break;
            case 32:
                c = new ja(a);
                break;
            case 34:
                c = new Ga(a);
                break;
            case 35:
                c = new Ra(a);
                break;
            case 36:
                c = new Ra(a);
                break;
            case 37:
                c = new ja(a);
                break;
            case 38:
                c = new pa(a);
                break;
            case 39:
                c = new uf(a);
                break;
            case 40:
                c = new Za(a);
                break;
            case 41:
                c = new Za(a);
                break;
            case 42:
                c = new qf(a);
                break;
            case 43:
                c = new ja(a);
                break;
            case 44:
                c = new de(a);
                break;
            case 45:
                c = new sa(a);
                break;
            case 46:
                c = new sa(a);
                break;
            case 47:
                c = new ce(a);
                break;
            case 48:
                c = new Ga(a);
                break;
            case 49:
                c = new ja(a);
                break;
            case 50:
                c = new ja(a);
                break;
            case 51:
                c = new ce(a);
                break;
            case 52:
                c = new sa(a);
                break;
            case 53:
                c = new sa(a);
                break;
            case 54:
                c = new sa(a);
                break;
            case 55:
                c = new tf(a);
                break;
            case 56:
                c = new Ga(a);
                break;
            case 57:
                c = new ja(a);
                break;
            case 58:
                c = new ja(a);
                break;
            case 59:
                c = new sa(a);
                break;
            case 60:
                c = new ja(a);
                break;
            case 61:
                c = new ja(a);
                break;
            case 62:
                c = new sa(a);
                break;
            case 63:
                c = new Za(a);
                break;
            case 64:
                c = new Za(a);
                break;
            case 67:
                c = new ja(a);
                break;
            case 68:
                c = new he(a);
                break;
            case 69:
                c = new wf(a);
                break;
            case 72:
                c = new ge(a)
        }
        c.code = e;
        a.file.seek(b + d);
        return c
    };
    pa.tH = 1;
    pa.qQ = 2;
    pa.ru = 4;
    pa.qu = 8;
    pa.rQ = 16;
    qa.eG = 1;
    qa.dG = 2;
    qa.fG = 4;
    qa.Qy = 8;
    qa.prototype = {
        Bl: function (a, b, c) {
            c.Km = -1;
            if (-1 == this.rp) {
                0 != b && (c.dir = -1, 0 == (this.wl & qa.Qy) && (c.dir = a.dw(this.Ks)));
                c.x = this.Ns;
                c.y = this.Os;
                var d = this.wx;
                d > a.B.uc - 1 && (d = a.B.uc - 1);
                c.Km = d;
                c.iv = !1
            } else {
                a.i.jn = !1;
                d = a.i.Mr(this.sp);
                c.iv = a.i.Nc;
                if (null == d) return !1;
                c.x = d.w;
                c.y = d.u;
                c.Km = d.od;
                if (0 != (this.wl & qa.dG) && 0 != (d.sa & A.Xi) && 0 <= d.b.Qa) {
                    var e;
                    e = d.b.cb;
                    null != a.Rn(d) && (e = 0, e == fa.IF && (e = d.b.cb));
                    e = a.h.ia.$k(d.b.Qa, e, d.b.sb, d.b.tb);
                    c.x += e.Eh - e.Ja;
                    c.y += e.Fh -
                        e.Ga
                }
                if (0 != (this.wl & qa.eG)) {
                    e = this.vx + d.c.Ib(d) & 31;
                    var f = O.iL(this.Ls, e);
                    c.x += O.hL(this.Ls, e);
                    c.y += f
                } else c.x += this.Ns, c.y += this.Os;
                0 != (b & 1) && (c.dir = 0 != (this.wl & qa.Qy) ? -1 : 0 != (this.wl & qa.fG) ? d.c.Ib(d) : a.dw(this.Ks))
            }
            return 0 != (b & 2) && (c.x < a.on || c.x > a.mn || c.y < a.sn || c.y > a.qn) ? !1 : !0
        }
    };
    ee.prototype = m.extend(new qa, {});
    nb.prototype = m.extend(new qa, {});
    fe.prototype = m.extend(new qa, {});
    he.prototype = {
        evaluate: function (a) {
            if (null == a.S || 0 != this.rB && (a.S.Op & this.rB) != this.bL) return !1;
            for (var b = 0; b < this.values.length; b++) {
                var c =
                    this.values[b],
                    d;
                d = c.global ? a.c.h.Yv(c.index) : a.S.Em(c.index);
                if (!k.Zh(d, c.bF, c.OM)) return !1
            }
            return !0
        }
    };
    $a.prototype = {
        Mc: function () {},
        Px: function () {},
        Ox: function () {},
        RD: function () {},
        cf: function () {},
        Pj: function () {},
        SD: function () {},
        TD: function () {},
        Lc: function () {},
        Cp: function () {},
        dt: function () {},
        xN: function () {},
        FD: function (a, b, c, d) {
            var e = this.Ik[this.Ik.length - 1];
            e && (a < e.x && (a = e.x), b < e.y && (b = e.y), a + c > e.x + e.St && (c = e.x + e.St - a), b + d > e.y + e.Ko && (d = e.y + e.Ko - b));
            a = {
                x: a,
                y: b,
                St: c,
                Ko: d
            };
            this.Ik.push(a);
            return a
        },
        yD: function () {
            this.Ik.pop()
        }
    };
    Ha.prototype = m.extend(new $a, {
        Qx: function (a) {
            this.nx = this.gy = a;
            this.Ra.imageSmoothingEnabled = a;
            this.Ra.webkitImageSmoothingEnabled = a;
            this.Ra.mozImageSmoothingEnabled = a;
            this.Ra.msImageSmoothingEnabled = a;
            this.mx = -1;
            this.gf(0, 0)
        },
        Wp: function (a, b) {
            this.Ra.scale(a, b);
            this.iq = a;
            this.kq = b;
            this.Sk = this.Qk = 0;
            1 < this.iq ? this.Qk = 1 : 0 < this.iq && 1 > this.iq && (this.Qk = 1 / this.iq);
            1 < this.kq && (this.Sk = 1);
            0 < this.kq && 1 > this.kq && (this.Sk = 1 / this.kq)
        },
        or: function (a, b, c, d) {
            this.Ra.clearRect(a, b,
                c, d)
        },
        Mc: function (a, b, c, d, e, f, g) {
            var h = this.Ra;
            this.gf(f, g);
            h.fillStyle = m.sf(e);
            h.fillRect(a, b, c, d)
        },
        Px: function (a, b, c, d, e, f, g) {
            var h = this.Ra;
            this.gf(f, g);
            h.fillStyle = m.sf(e);
            m.ur(h, a, b, c, d);
            h.fill()
        },
        Ox: function (a, b, c, d, e, f, g, h, q) {
            if (e == f) return this.Mc(a, b, c, d, e, h, q);
            var k = this.Ra;
            this.gf(h, q);
            this.tA(a, b, c, d, g, e, f);
            k.fillRect(a, b, c, d)
        },
        RD: function (a, b, c, d, e, f, g, h, q) {
            if (e == f) return this.Px(a, b, c, d, e, h, q);
            var k = this.Ra;
            this.gf(h, q);
            this.tA(a, b, c, d, g, e, f);
            m.ur(k, a, b, c, d);
            this.Ra.fill()
        },
        cf: function (a,
            b, c, d, e, f, g, h) {
            var q = this.Ra,
                k = b - a.Ja,
                n = c - a.Ga;
            this.gf(g, h);
            0 == d && 1 == e && 1 == f ? 0 == a.Ab ? null != a.zb && q.drawImage(a.zb, k, n) : q.drawImage(a.app.ia.Vb[a.Ab], a.Ed, a.Fd, a.width, a.height, k, n, a.width, a.height) : (q.save(), q.translate(b, c), 0 != d && q.rotate(.0174532925 * -d), q.scale(Math.max(.001, e), Math.max(.001, f)), q.translate(-a.Ja, -a.Ga), 0 == a.Ab ? null != a.zb && 0 != a.width && 0 != a.height && q.drawImage(a.zb, 0, 0, a.width, a.height, 0, 0, a.width, a.height) : q.drawImage(a.app.ia.Vb[a.Ab], a.Ed, a.Fd, a.width, a.height, 0, 0, a.width, a.height),
                q.restore())
        },
        DU: function (a, b, c, d, e, f, g, h) {
            var q = this.Ra,
                k = b - a.Ja,
                n = c - a.Ga;
            this.gf(g, h);
            0 == d && 1 == e && 1 == f ? 0 == a.Ab ? null != a.zb && q.drawImage(a.zb, 0, 0, a.width, a.height, k, n, a.width + this.Qk, a.height + this.Sk) : q.drawImage(a.app.ia.Vb[a.Ab], a.Ed, a.Fd, a.width, a.height, k, n, a.width + this.Qk, a.height + this.Sk) : (q.save(), q.translate(b, c), 0 != d && q.rotate(.0174532925 * -d), q.scale(Math.max(.001, e), Math.max(.001, f)), q.translate(-a.Ja, -a.Ga), 0 == a.Ab ? null != a.zb && q.drawImage(a.zb, 0, 0, a.width, a.height, 0, 0, a.width, a.height) :
                q.drawImage(a.app.ia.Vb[a.Ab], a.Ed, a.Fd, a.width, a.height, 0, 0, a.width, a.height), q.restore())
        },
        Pj: function (a, b, c, d, e, f, g) {
            this.gf(f, g);
            this.Ra.drawImage(a, b, c, d, e)
        },
        SD: function (a, b, c, d, e, f, g) {
            var h = this.Ra;
            this.gf(f, g);
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
                for (k = 0; k < e; k++) 0 == a.Ab ? null != a.zb && h.drawImage(a.zb, 0, 0, a.width, a.height, b + q * f, c + k * g, a.width +
                    this.Qk, a.height + this.Sk) : h.drawImage(a.app.ia.Vb[a.Ab], a.Ed, a.Fd, a.width, a.height, b + q * f, c + k * g, a.width + this.Qk, a.height + this.Sk);
            h.restore()
        },
        TD: function (a, b, c, d, e, f, g) {
            if (!(a instanceof ca)) throw Error("renderPatternEllipse: bad image type: " + typeof a);
            var h = this.Ra;
            this.gf(f, g);
            0 == a.Ab ? null != a.zb && (h.fillStyle = h.createPattern(a.zb, "repeat")) : (a.pattern || (a.pattern = document.createElement("canvas"), a.pattern.width = a.width, a.pattern.height = a.height, h = a.pattern.getContext("2d"), h.drawImage(a.app.ia.Vb[a.Ab],
                a.Ed, a.Fd, a.width, a.height, 0, 0, a.width, a.height)), h.fillStyle = h.createPattern(a.pattern, "repeat"));
            m.ur(h, b, c, d, e);
            this.Ra.fill()
        },
        Lc: function (a, b, c, d, e, f, g, h) {
            var q = this.Ra;
            this.gf(g, h);
            q.strokeStyle = m.sf(e);
            q.lineCap = "round";
            q.lineWidth = f;
            q.beginPath();
            q.moveTo(a, b);
            q.lineTo(c, d);
            q.closePath();
            q.stroke()
        },
        xN: function (a, b, c, d, e, f) {
            var g = this.Ra;
            e = m.sf(e);
            1 == f ? (g.beginPath(), g.moveTo(a, b), g.lineTo(a + c, b), g.lineTo(a + c / 2, b - d)) : (g.beginPath(), g.moveTo(a, b), g.lineTo(a, b - c), g.lineTo(a - d, b - c / 2));
            g.closePath();
            g.lineWidth = 1;
            g.strokeStyle = e;
            g.stroke();
            g.fillStyle = e;
            g.fill()
        },
        Cp: function (a, b, c, d, e, f, g, h) {
            var q = this.Ra;
            this.gf(g, h);
            q.strokeStyle = m.sf(e);
            q.lineWidth = f;
            q.strokeRect(a, b, c, d)
        },
        dt: function (a, b, c, d, e, f, g, h) {
            var q = this.Ra;
            this.gf(g, h);
            q.lineWidth = e;
            q.strokeStyle = m.sf(f);
            m.ur(q, a, b, c, d);
            this.Ra.stroke()
        },
        clip: function (a, b, c, d) {
            var e = this.Ra;
            e.save();
            e.beginPath();
            e.rect(a, b, c, d);
            e.clip()
        },
        nO: function () {
            this.Ra.restore()
        },
        FD: function () {
            var a = this.Ra,
                b = $a.prototype.FD.apply(this, arguments);
            a.beginPath();
            a.rect(b.x, b.y, b.St, b.Ko);
            a.clip()
        },
        yD: function () {
            var a = this.Ra;
            $a.prototype.yD.apply(this, arguments);
            if (0 < this.Ik.length) {
                var b = this.Ik[this.Ik.length - 1];
                a.beginPath();
                a.rect(b.x, b.y, b.St, b.Ko);
                a.clip()
            } else a.EU()
        },
        gf: function (a, b) {
            var c = this.Ra;
            if ("undefined" == typeof a) c.globalAlpha = 1, c.Lk = "source-over";
            else if (a != this.mx || b != this.IM) {
                this.mx = a;
                this.IM = b;
                var d = a & u.yy,
                    e = 0 != (a & u.zy) | this.gy;
                e != this.nx && (this.nx = e, c.imageSmoothingEnabled = e, c.webkitImageSmoothingEnabled = e, c.mozImageSmoothingEnabled =
                    e, c.msImageSmoothingEnabled = e);
                c.globalAlpha = 0 != (a & u.$t) ? (b >>> 24 & 255) / 255 : d == u.Of ? (128 - b) / 128 : 1;
                switch (d) {
                    case u.KF:
                        c.Lk = "lighter";
                        break;
                    case u.LF:
                        c.Lk = "xor";
                        break;
                    default:
                        c.Lk = "source-over"
                }
            }
        },
        tA: function (a, b, c, d, e, f, g) {
            a = e ? this.Ra.createLinearGradient(a, b, a, b + d) : this.Ra.createLinearGradient(a, b, a + c, b);
            a.addColorStop(0, m.sf(f));
            a.addColorStop(1, m.sf(g));
            this.Ra.fillStyle = a
        }
    });
    ua.cr = 1;
    ua.prototype = {
        load: function (a) {
            var b = a.U;
            a.qa(4);
            this.XE = a.v();
            this.WE = a.v();
            this.eq = a.v();
            this.cq = a.Cc();
            var c = a.v(),
                d = a.v();
            a.seek(b + c);
            this.to = a.Nb();
            this.to = this.to.substr(0, this.to.indexOf("."));
            this.NA = b + d
        }
    };
    ie.prototype = {
        LB: function () {
            return null
        }
    };
    t.xq = 0;
    t.Wq = 1;
    t.Kz = 2;
    t.Ay = 3;
    t.au = 0;
    t.tu = 1;
    t.Fy = 2;
    t.Jz = 3;
    t.$i = 0;
    t.aj = 1;
    t.kk = 2;
    t.lk = 3;
    t.Ey = 4;
    t.Ty = 0;
    t.tG = 1;
    t.Xu = 1;
    t.dr = 2;
    t.prototype = {
        start: function (a, b, c, d) {
            this.TA = b;
            this.ai = this.TA.getContext("2d");
            this.da = c;
            this.s = d;
            this.ns = (new Date).getTime();
            this.m = a.WE;
            0 == this.m && (this.m = 1);
            this.Vo = this.ns;
            this.Wo = this.ns + this.m;
            this.Ba = this.jC = !0
        },
        finish: function () {},
        Yr: function () {
            if (this.jC) {
                var a =
                    new Date;
                return a.getTime() >= this.Wo ? !0 : a.getTime() >= this.Wo
            }
            return !0
        },
        Hc: function () {
            this.Vo = (new Date).getTime();
            this.Vo > this.Wo && (this.Vo = this.Wo);
            return this.Vo - this.ns
        },
        F: function (a, b, c, d, e, f, g) {
            this.ps && (this.ai.globalCompositeOperation = "source-atop");
            1 == arguments.length ? this.ai.drawImage(a, 0, 0) : 0 < f && 0 < g && this.ai.drawImage(a, d, e, f, g, b, c, f, g)
        },
        stretch: function (a, b, c, d, e, f, g, h, q) {
            this.ps && (this.ai.globalCompositeOperation = "source-atop");
            0 < d && 0 < e && 0 < h && 0 < q && this.ai.drawImage(a, f, g, h, q, b, c, d, e)
        },
        Zb: function () {},
        end: function () {},
        aa: function () {}
    };
    je.prototype = {
        cO: function (a, b) {
            var c = a.R.Wm;
            b && (c = a.R.lp);
            var d = null,
                e;
            if (0 != (a.sa & A.Xi)) {
                var f = this.app.ia.Sb(a.b.Qa),
                    d = document.createElement("canvas");
                d.width = f.width;
                d.height = f.height;
                e = d.getContext("2d");
                0 == f.Ab ? e.drawImage(f.zb, 0, 0) : e.drawImage(this.app.ia.Vb[f.Ab], f.Ed, f.Fd, f.width, f.height, 0, 0, f.width, f.height)
            } else 32 <= a.Aa && (d = document.createElement("canvas"), d.width = a.K, d.height = a.M, new StandardRendered(d), d = null);
            if (null == d) return null;
            e = d.width;
            var g = d.height,
                f = document.createElement("canvas");
            f.width = e;
            f.height = g;
            var h = document.createElement("canvas");
            h.width = e;
            h.height = g;
            var q = document.createElement("canvas");
            q.width = e;
            q.height = g;
            b ? (e = h.getContext("2d"), e.drawImage(d, 0, 0), e = f.getContext("2d"), e.drawImage(d, 0, 0), 0 != (c.eq & ua.cr) && this.vA(q, d, c.cq)) : (e = q.getContext("2d"), e.drawImage(d, 0, 0), 0 != (c.eq & ua.cr) && this.vA(h, d, c.cq));
            c = this.um(c, f, h, q);
            null != c && (d = 0, 0 != (a.Y & M.Ti) ? (c.ps = !0, d |= t.dr) : (c.ps = !1, d |= t.Xu), a.Wl = f, c.Zb(d));
            return c
        },
        vA: function (a, b, c) {
            a = a.getContext("2d");
            a.drawImage(b, 0, 0);
            var d = b.width;
            b = b.height;
            var e = a.getImageData(0, 0, d, b),
                f, g = (c & 16711680) >> 16,
                h = (c & 65280) >> 8,
                q = c & 255;
            for (f = 0; f < b; f++)
                for (c = 0; c < d; c++) 0 != e.data[4 * (f * d + c) + 3] && (e.data[4 * (f * d + c)] = g, e.data[4 * (f * d + c) + 1] = h, e.data[4 * (f * d + c) + 2] = q);
            a.putImageData(e, 0, 0)
        },
        um: function (a, b, c, d) {
            var e = null;
            "cctrans" == a.to.toLowerCase() && (e = new Sa);
            return null != e ? (e = e.LB(a), this.app.file.seek(a.NA), e.ps = !1, e.aa(a, this.app.file, b, c, d), e) : null
        }
    };
    Sa.RB = "BAND SE00 SE10 SE12 DOOR SE03 MOSA SE05 SE06 SCRL SE01 SE07 SE09 SE13 SE08 SE02 ZIGZ SE04 ZOOM SE11 FADE".split(" ");
    Sa.prototype = m.extend(new ie, {
        LB: function (a) {
            var b = a.XE;
            a = "" + String.fromCharCode(b & 255);
            b >>= 8;
            a += String.fromCharCode(b & 255);
            b >>= 8;
            a += String.fromCharCode(b & 255);
            a += String.fromCharCode(b >> 8 & 255);
            for (b = 0; b < Sa.RB.length && a != Sa.RB[b]; b++);
            a = null;
            switch (b) {
                case 0:
                    a = new me;
                    break;
                case 1:
                    a = new ke;
                    break;
                case 2:
                    a = new le;
                    break;
                case 3:
                    a = new ne;
                    break;
                case 4:
                    a = new oe;
                    break;
                case 5:
                    a = new qe;
                    break;
                case 6:
                    a = new re;
                    break;
                case 7:
                    a = new se;
                    break;
                case 8:
                    a = new te;
                    break;
                case 9:
                    a = new ue;
                    break;
                case 10:
                    a = new ve;
                    break;
                case 11:
                    a =
                        new we;
                    break;
                case 12:
                    a = new ze;
                    break;
                case 13:
                    a = new Ae;
                    break;
                case 14:
                    a = new Be;
                    break;
                case 15:
                    a = new Ce;
                    break;
                case 16:
                    a = new De;
                    break;
                case 17:
                    a = new Ee;
                    break;
                case 18:
                    a = new Fe;
                    break;
                case 19:
                    a = new Ge;
                    break;
                case 20:
                    a = new pe
            }
            return a
        }
    });
    ke.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.kC = 8 != this.kb ? this.kb : Math.floor(8 * Math.random()));
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b,
                    c;
                switch (this.kC) {
                    case 0:
                        b = this.g / 3 * a / this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f * a / this.m;
                        this.F(this.s, b, 0, b, this.f - c, b, c);
                        break;
                    case 1:
                        b = this.g / 3 * a / this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f * a / this.m;
                        this.F(this.s, b, this.f - c, b, 0, b, c);
                        break;
                    case 2:
                        b = this.g / 3 * a / this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f * a / this.m;
                        this.F(this.s, b, 0, b, 0, b, c);
                        break;
                    case 3:
                        b = this.g / 3 * a / this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f * a / this.m;
                        this.F(this.s, b, this.f - c, b, this.f - c, b, c);
                        break;
                    case 4:
                        b = this.g / 3 * a / this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f / 2 * a / this.m;
                        this.F(this.s, b, 0, b, this.f / 2 - c, b, c);
                        this.F(this.s, b, this.f - c, b, this.f / 2, b, c);
                        break;
                    case 5:
                        b = this.g / 3 * a /
                            this.m;
                        c = this.f;
                        this.F(this.s, 0, 0, this.g / 3 - b, 0, b, c);
                        this.F(this.s, this.g - b, 0, 2 * this.g / 3, 0, b, c);
                        b = this.g / 3;
                        c = this.f / 2 * a / this.m;
                        this.F(this.s, b, 0, b, 0, b, c);
                        this.F(this.s, b, this.f - c, b, this.f - c, b, c);
                        break;
                    case 6:
                        b = this.g / 3;
                        c = this.f * a / this.m;
                        this.F(this.s, 0, this.f - c, 0, 0, b, c);
                        this.F(this.s, b, 0, b, this.f - c, b, c);
                        this.F(this.s, 2 * b, this.f - c, 2 * b, 0, b, c);
                        break;
                    case 7:
                        b = this.g / 7;
                        c = this.f * a / this.m;
                        this.F(this.s, 0, this.f - c, 0, 0, b, c);
                        this.F(this.s, b, 0, b, this.f - c, b, c);
                        this.F(this.s, 2 * b, this.f - c, 2 * b, 0, b, c);
                        this.F(this.s,
                            3 * b, 0, 3 * b, this.f - c, b, c);
                        this.F(this.s, 4 * b, this.f - c, 4 * b, 0, b, c);
                        this.F(this.s, 5 * b, 0, 5 * b, this.f - c, b, c);
                        this.F(this.s, 6 * b, this.f - c, 6 * b, 0, 2 * b, c);
                        break;
                    default:
                        this.F(this.s)
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    le.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c;
                this.F(this.s);
                switch (this.kb) {
                    case 0:
                        b = this.g / 2 * a / this.m;
                        b = this.g /
                            2 - b;
                        c = this.f / 2 * a / this.m;
                        c = this.f / 2 - c;
                        this.stretch(this.da, 0, 0, b, c, 0, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        c = this.f / 2 - c;
                        this.stretch(this.da, this.g / 2 + b, 0, this.g / 2 - b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        b = this.g / 2 - b;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.da, 0, this.f / 2 + c, b, this.f / 2 - c, 0, this.f / 2, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.da, this.g / 2 + b, this.f / 2 + c, this.g / 2 - b, this.f / 2 - c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                        break;
                    case 1:
                        b =
                            this.g * a / this.m;
                        b = this.g - b;
                        c = this.f * a / this.m;
                        c = this.f - c;
                        this.F(this.da, 0, 0, this.g - b, this.f - c, b, c);
                        break;
                    case 2:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        c = this.f - c;
                        this.F(this.da, b, 0, 0, this.f - c, this.g - b, c);
                        break;
                    case 3:
                        b = this.g * a / this.m;
                        b = this.g - b;
                        c = this.f * a / this.m;
                        this.F(this.da, 0, c, this.g - b, 0, b, this.f - c);
                        break;
                    case 4:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        this.F(this.da, b, c, 0, 0, this.g - b, this.f - c);
                        break;
                    case 5:
                        b = this.g / 2 * a / this.m;
                        b = this.g / 2 - b;
                        c = this.f / 2 * a / this.m;
                        c = this.f / 2 - c;
                        this.F(this.da, b - this.g / 2, c - this.f /
                            2, 0, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        c = this.f / 2 - c;
                        this.F(this.da, this.g / 2 + b, c - this.f / 2, this.g / 2, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        b = this.g / 2 - b;
                        c = this.f / 2 * a / this.m;
                        this.F(this.da, b - this.g / 2, this.f / 2 + c, 0, this.f / 2, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.F(this.da, this.g / 2 + b, this.f / 2 + c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                        break;
                    case 6:
                        c = this.f / 2 * a / this.m;
                        c = this.f / 2 - c;
                        this.F(this.da, 0, c - this.f / 2, 0, 0, this.g, this.f / 2);
                        this.F(this.da, 0, this.f - c, 0,
                            this.f / 2, this.g, this.f / 2);
                        break;
                    case 7:
                        b = this.g / 2 * a / this.m, b = this.g / 2 - b, this.F(this.da, b - this.g / 2, 0, 0, 0, this.g / 2, this.f), this.F(this.da, this.g - b, 0, this.g / 2, 0, this.g / 2, this.f)
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    me.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.Xf = b.l();
            this.ov = b.l();
            this.start(a, c, d, e)
        },
        Zb: function () {
            var a = this.da.width,
                b = this.da.height,
                c;
            if (this.Ba) {
                0 == this.Xf && (this.Xf = 1);
                switch (this.ov) {
                    case t.xq:
                    case t.Wq:
                        this.Jc = (a + this.Xf - 1) / this.Xf;
                        0 == this.Jc && (this.Jc = 1, this.Xf =
                            a);
                        break;
                    default:
                        this.Jc = (b + this.Xf - 1) / this.Xf, 0 == this.Jc && (this.Jc = 1, this.Xf = b)
                }
                this.Eb = 0;
                this.Ba = !1
            }
            if (0 >= this.Xf || 0 >= this.Jc || 0 == this.m) this.F(this.s);
            else {
                var d = this.Jc * this.Hc() / this.m;
                if (d > this.Eb) {
                    var e = 0,
                        f = 0,
                        g = 0,
                        h = 0;
                    for (c = 0; c < this.Xf; c++) {
                        switch (this.ov) {
                            case t.xq:
                                e = this.Eb + c * this.Jc;
                                f = 0;
                                g = d - this.Eb;
                                h = b;
                                break;
                            case t.Wq:
                                e = a - (this.Eb + c * this.Jc) - (d - this.Eb);
                                f = 0;
                                g = d - this.Eb;
                                h = b;
                                break;
                            case t.Kz:
                                e = 0;
                                f = this.Eb + c * this.Jc;
                                g = a;
                                h = d - this.Eb;
                                break;
                            case t.Ay:
                                e = 0, f = b - (this.Eb + c * this.Jc) - (d - this.Eb), g = a,
                                    h = d - this.Eb
                        }
                        this.F(this.s, e, f, e, f, g, h)
                    }
                }
                this.Eb = d
            }
            return this.wM
        },
        end: function () {
            this.finish()
        }
    });
    ne.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.ab = b.v();
            this.zr = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d, e, f, g, h, q, k, n;
                k = this.g / this.ab;
                n = this.f / this.zr;
                d = this.g / this.ab;
                e = this.f / this.zr;
                for (f = 0; f < this.ab; f++)
                    for (g = 0; g < this.zr; g++) b = f * k, c = g * n, h = d * a / this.m, q = e * a / this.m, this.stretch(this.s,
                        b + (d - h) / 2, c + (e - q) / 2, h, q, b + (d - h) / 2, c + (e - q) / 2, h, q)
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    oe.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.xj = b.l();
            this.start(a, c, d, e)
        },
        Zb: function () {
            if (this.Ba) {
                switch (this.xj) {
                    case t.au:
                    case t.tu:
                        this.Jc = this.da.width / 2;
                        break;
                    default:
                        this.Jc = this.da.height / 2
                }
                this.Eb = 0;
                this.Ba = !1
            }
            if (0 == this.Jc) this.F(this.s);
            else {
                var a = 0,
                    b = 0,
                    c = 0,
                    d = 0,
                    e = this.Jc * this.Hc() / this.m;
                if (e > this.Eb) {
                    switch (this.xj) {
                        case t.au:
                            a = this.da.width / 2 - e;
                            b = 0;
                            c = e - this.Eb;
                            d = this.s.height;
                            break;
                        case t.tu:
                            a = this.Eb;
                            b = 0;
                            c = e - this.Eb;
                            d = this.s.height;
                            break;
                        case t.Fy:
                            a = 0;
                            b = this.da.height / 2 - e;
                            c = this.s.width;
                            d = e - this.Eb;
                            break;
                        case t.Jz:
                            a = 0, b = this.Eb, c = this.s.width, d = e - this.Eb
                    }
                    this.F(this.s, a, b, a, b, c, d);
                    switch (this.xj) {
                        case t.au:
                            a = this.da.width / 2 + this.Eb;
                            break;
                        case t.tu:
                            a = this.da.width - e;
                            break;
                        case t.Fy:
                            b = this.da.height / 2 + this.Eb;
                            break;
                        case t.Jz:
                            b = this.da.height - e
                    }
                    this.F(this.s, a, b, a, b, c, d)
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    pe.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.start(a,
                c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1);
            var a;
            this.ai.globalAlpha = 1;
            this.F(this.da);
            a = this.Hc() / this.m;
            this.ai.globalAlpha = a;
            this.F(this.s);
            return null
        },
        end: function () {
            this.ai.globalAlpha = 1;
            this.finish()
        }
    });
    qe.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.ab = b.v();
            this.kb = b.v();
            this.vo = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d, e, f;
                b = 0;
                var g;
                if (0 == this.kb)
                    for (g = this.f /
                        this.ab, f = 0; f < this.ab; f++) 0 == b ? (b = 0, c = f * g, d = this.g * a / this.m, e = f == this.ab - 1 ? this.f : g + 1, 0 == this.vo ? this.F(this.s, b, c, b, c, d, e) : this.F(this.s, b, c, this.g - d, c, d, e), b = 1) : (c = f * g, d = this.g * a / this.m, b = this.g - d, e = f == this.ab - 1 ? this.f : g + 1, 0 == this.vo ? this.F(this.s, b, c, b, c, d, e) : this.F(this.s, b, c, 0, c, d, e), b = 0);
                else
                    for (g = this.g / this.ab, f = 0; f < this.ab; f++) 0 == b ? (b = f * g, c = 0, e = this.f * a / this.m, d = f == this.ab - 1 ? this.g : g + 1, 0 == this.vo ? this.F(this.s, b, c, b, c, d, e) : this.F(this.s, b, c, b, this.f - e, d, e), b = 1) : (b = f * g, e = this.f * a / this.m,
                        c = this.f - e, d = f == this.ab - 1 ? this.g : g + 1, 0 == this.vo ? this.F(this.s, b, c, b, c, d, e) : this.F(this.s, b, c, b, 0, d, e), b = 0)
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    re.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.Jw = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            if (this.Ba) {
                var a = this.da.width,
                    b = this.da.height;
                this.J = Math.floor((a * this.Jw / 100 + b * this.Jw / 100) / 2);
                0 == this.J && (this.J = 1);
                this.Ye = (a + this.J - 1) / this.J;
                this.$g = (b + this.J - 1) / this.J;
                this.jl = this.Ye * this.$g;
                a = Math.floor((this.jl + 7) / 8 + 2);
                this.hl = 0;
                this.Be =
                    Array(a);
                for (b = 0; b < a; b++) this.Be[b] = 0;
                this.Ba = !1
            }
            if (null == this.Be || 2 > this.Ye || 2 > this.$g || 0 == this.m) this.F(this.s);
            else {
                var c, d, b = a = 0;
                c = Math.floor(this.jl * this.Hc() / this.m);
                var e = c - this.hl;
                if (0 != e)
                    for (this.hl = c, d = 0; d < e; d++) {
                        for (c = 0; 1 > c; c++) {
                            var a = Math.floor(this.Ye * Math.random()),
                                b = Math.floor(this.$g * Math.random()),
                                f, g;
                            f = b * this.Ye + a;
                            g = Math.floor(f / 8);
                            f = 1 << (f & 7);
                            if (0 == (this.Be[g] & f)) {
                                this.Be[g] |= f;
                                break
                            }
                            var h = g,
                                q = (this.jl + 7) / 8,
                                k, n = !1;
                            for (k = g; k < q; k++, h++)
                                if (-1 != this.Be[h]) {
                                    b = Math.floor(8 * k / this.Ye);
                                    a = Math.floor(8 * k % this.Ye);
                                    for (f = 1; 0 != f; f <<= 1) {
                                        if (0 == (this.Be[h] & f)) {
                                            this.Be[h] |= f;
                                            n = !0;
                                            break
                                        }
                                        if (++a >= this.Ye && (a = 0, ++b >= this.$g)) break
                                    }
                                    if (n) break
                                } if (n) break;
                            for (k = h = 0; k < g; k++, h++) {
                                if (255 != this.Be[h]) {
                                    b = Math.floor(8 * k / m_nbBlockPerLine);
                                    a = Math.floor(8 * k % m_nbBlockPerLine);
                                    for (f = 1; 0 != f; f <<= 1) {
                                        if (0 == (this.Be[h] & f)) {
                                            this.Be[h] |= f;
                                            n = !0;
                                            break
                                        }
                                        if (++a >= this.Ye && (a = 0, ++b >= this.$g)) break
                                    }
                                    if (n) break
                                }
                                if (n) break;
                                n = !1
                            }
                        }
                        1 > c && this.F(this.s, Math.floor(a * this.J), Math.floor(b * this.J), Math.floor(a * this.J), Math.floor(b *
                            this.J), this.J, this.J)
                    }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    se.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc(),
                b = a / this.m;
            if (1 < b) this.F(this.s);
            else {
                var c, d, e;
                .25 > b ? (d = 2 * this.g * a / this.m, d *= 2, e = this.f / 7, b = this.g / 2 - d / 2, c = this.f / 2 - e / 2, this.F(this.s, b, c, b, c, d, e), d = this.g / 7, e = 2 * this.f * a / this.m, e *= 2, b = this.g / 2 - d / 2, c = this.f / 2 - e / 2) : (b = this.g / 2, d = this.g * a / this.m - b, e = this.f /
                    2, c = 0, this.F(this.s, b, c, b, c, d, e), c = this.f / 2, e = this.f * a / this.m - c, b = d = this.g / 2, this.F(this.s, b, c, b, c, d, e), d = this.g * a / this.m - this.g / 2, b = this.g / 2 - d, c = e = this.f / 2, this.F(this.s, b, c, b, c, d, e), e = this.f * a / this.m - this.f / 2, c = this.f / 2 - e, d = this.g / 2, b = 0);
                this.F(this.s, b, c, b, c, d, e)
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    te.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.Iw = !1);
            var a = this.Hc(),
                b = a / this.m;
            if (1 < b) this.F(this.s);
            else {
                var c, d, e, f;
                if (.5 >= b) switch (this.kb) {
                    case 0:
                        e = this.g * a / this.m * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.F(this.s, 0, 0, c, d, e, f);
                        break;
                    case 1:
                        e = this.g * a / this.m * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.F(this.s, c, 0, 0, d, e, f);
                        break;
                    case 2:
                        e = this.g * a / this.m * 2;
                        f = this.f / 2;
                        c = this.g - e;
                        d = this.f / 2;
                        this.F(this.s, 0, d, c, 0, e, f);
                        break;
                    case 3:
                        e = this.g * a / this.m * 2, f = this.f / 2, c = this.g - e, d = this.f / 2, this.F(this.s, c, d, 0, 0, e, f)
                }
                if (.5 < b) switch (0 == this.Iw && (1 >= this.kb ? this.F(this.s, 0, 0, 0, this.f /
                        2, this.g, this.f / 2) : this.F(this.s, 0, this.f / 2, 0, 0, this.g, this.f / 2), this.Iw = !0), b = a - this.m / 2, b /= this.m / 2, f = this.f / 2 * 1E3 * b / 1E3, this.kb) {
                    case 0:
                    case 1:
                        this.stretch(this.s, 0, f, this.g, this.f / 2, 0, this.f / 2, this.g, this.f / 2);
                        this.stretch(this.s, 0, 0, this.g, f, 0, this.f / 2 - f, this.g, f);
                        break;
                    case 2:
                    case 3:
                        this.stretch(this.s, 0, this.f / 2 - f, this.g, this.f / 2, 0, 0, this.g, this.f / 2), this.stretch(this.s, 0, this.f - f, this.g, f, 0, this.f / 2, this.g, f)
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    ue.prototype = m.extend(new t, {
        aa: function (a,
            b, c, d, e) {
            this.xj = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            var a = this.da.width,
                b = this.da.height;
            if (this.Ba) {
                switch (this.xj) {
                    case t.xq:
                    case t.Wq:
                        this.Jc = a;
                        break;
                    default:
                        this.Jc = b
                }
                this.Eb = 0;
                this.Ba = !1
            }
            if (0 == this.m) this.F(this.s);
            else {
                var c = this.Jc * this.Hc() / this.m;
                if (c > this.Eb) {
                    var d = 0,
                        e = 0;
                    switch (this.xj) {
                        case t.xq:
                            d = c - a;
                            e = 0;
                            break;
                        case t.Wq:
                            d = a - c;
                            e = 0;
                            break;
                        case t.Kz:
                            d = 0;
                            e = c - b;
                            break;
                        case t.Ay:
                            d = 0, e = b - c
                    }
                    this.F(this.s, d, e, 0, 0, a, b);
                    this.Eb = c
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    ve.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.ab = b.v();
            this.dB = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d, e, f, g;
                f = this.g * this.ab / 100;
                g = this.f * this.ab / 100;
                d = f * a / this.m;
                e = g * a / this.m;
                b = this.g / 2 - d / 2;
                c = this.f / 2 - e / 2;
                0 == this.dB ? this.F(this.s, b, c, b, c, d, e) : this.stretch(this.s, b, c, d, e, this.g / 2 - f / 2, this.f / 2 - g / 2, f, g);
                b = 100 - this.ab;
                f = this.g * b / 100;
                g = this.f * b / 100;
                d = f / 2 * a / this.m;
                e = g / 2 * a / this.m;
                this.F(this.s,
                    0, 0, 0, 0, this.g, e);
                this.F(this.s, 0, 0, 0, 0, d, this.f);
                this.F(this.s, 0, this.f - e, 0, this.f - e, this.g, e);
                this.F(this.s, this.g - d, 0, this.g - d, 0, d, this.f)
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    we.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c;
                switch (this.kb) {
                    case 0:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        this.stretch(this.s, 0, 0, b, c, 0, 0, this.g,
                            this.f);
                        break;
                    case 1:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        this.stretch(this.s, this.g - b, 0, b, c, 0, 0, this.g, this.f);
                        break;
                    case 2:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        this.stretch(this.s, 0, this.f - c, b, c, 0, 0, this.g, this.f);
                        break;
                    case 3:
                        b = this.g * a / this.m;
                        c = this.f * a / this.m;
                        this.stretch(this.s, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f);
                        break;
                    case 4:
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        5 > c && (c = 5);
                        this.stretch(this.s, 0, 0, b, c, 0, 0, this.da.width / 2, this.da.height / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        5 > c && (c =
                            5);
                        this.stretch(this.s, this.g - b, 0, b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.s, 0, this.f - c, b, c, 0, this.f / 2, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.s, this.g - b, this.f - c, b, c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                        break;
                    case 5:
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        5 > c && (c = 5);
                        this.stretch(this.s, this.g / 2 - b, this.f / 2 - c, b, c, 0, 0, this.da.width / 2, this.da.height / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        5 > c && (c = 5);
                        this.stretch(this.s,
                            this.g / 2, this.f / 2 - c, b, c, this.g / 2, 0, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.s, this.g / 2 - b, this.f / 2, b, c, 0, this.f / 2, this.g / 2, this.f / 2);
                        b = this.g / 2 * a / this.m;
                        c = this.f / 2 * a / this.m;
                        this.stretch(this.s, this.g / 2, this.f / 2, b, c, this.g / 2, this.f / 2, this.g / 2, this.f / 2);
                        break;
                    case 6:
                        b = this.g;
                        c = this.f * a / this.m;
                        this.stretch(this.s, 0, 0, b, c, 0, 0, this.g, this.f);
                        break;
                    case 7:
                        b = this.g * a / this.m;
                        c = this.f;
                        this.stretch(this.s, 0, 0, b, c, 0, 0, this.g, this.f);
                        break;
                    case 8:
                        b = this.g * a / this.m;
                        c = this.f;
                        this.stretch(this.s, this.g - b, 0, b, c, 0, 0, this.g, this.f);
                        break;
                    case 9:
                        b = this.g, c = this.f * a / this.m, this.stretch(this.s, 0, this.f - c, b, c, 0, 0, this.g, this.f)
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    ze.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.tc = 0);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c;
                switch (this.kb) {
                    case 0:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = 2 * this.f *
                            a / this.m, c = this.f - c, this.stretch(this.da, 0, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, 0, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 1:
                        0 == this.tc ? (b = this.g, c = 2 * this.f * a / this.m, c = this.f - c, this.stretch(this.da, 0, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, 0, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 2:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = 2 * this.f * a / this.m,
                            c = this.f - c, this.stretch(this.da, this.g - b, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, this.g - b, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 3:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = this.f, this.stretch(this.da, 0, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = this.f, this.stretch(this.s, 0, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 4:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = this.f, this.stretch(this.da,
                            this.g / 2 - b / 2, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = this.f, this.stretch(this.s, this.g / 2 - b / 2, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 5:
                        0 == this.tc ? (c = 2 * this.f * a / this.m, c = this.f - c, b = this.g, this.stretch(this.da, 0, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (c = 2 * this.f * a / this.m, c -= this.f, b = this.g, this.stretch(this.s, 0, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f));
                        break;
                    case 6:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = 2 * this.f * a / this.m, c = this.f - c, this.stretch(this.da,
                            this.g / 2 - b / 2, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, this.g / 2 - b / 2, this.f / 2 - c / 2, b, c, 0, 0, this.g, this.f));
                        break;
                    case 7:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g - b, c = this.f, this.stretch(this.da, this.g - b, 0, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = this.f, this.stretch(this.s, this.f - b, 0, b, c, 0, 0, this.g, this.f));
                        break;
                    case 8:
                        0 == this.tc ? (b = 2 * this.g * a / this.m, b = this.g -
                            b, c = 2 * this.f * a / this.m, c = this.f - c, this.stretch(this.da, 0, this.f - c, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, 0, this.f - c, b, c, 0, 0, this.g, this.f));
                        break;
                    case 9:
                        0 == this.tc ? (b = this.g, c = 2 * this.f * a / this.m, c = this.f - c, this.stretch(this.da, 0, this.f - c, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, 0, this.f - c, b, c, 0, 0, this.g, this.f));
                        break;
                    case 10:
                        0 == this.tc ? (b = 2 *
                            this.g * a / this.m, b = this.g - b, c = 2 * this.f * a / this.m, c = this.f - c, this.stretch(this.da, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f), a >= this.m / 2 && (this.tc = 1)) : (b = 2 * this.g * a / this.m, b -= this.g, c = 2 * this.f * a / this.m, c -= this.f, this.stretch(this.s, this.g - b, this.f - c, b, c, 0, 0, this.g, this.f))
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Ae.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.gl = this.fl = 0);
            var a =
                this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d, e;
                b = this.f * a / this.m;
                a = this.g * a / this.m;
                if (0 == this.kb) {
                    e = b % 2;
                    for (c = 0; c < this.g; c += 2) {
                        for (d = this.fl; d < b; d++) this.F(this.s, c, d, c, d, 1, 1);
                        for (d = this.f - b - e; d < this.f - this.fl; d++) this.F(this.s, c + 1, d + 1, c + 1, d + 1, 1, 1)
                    }
                    this.fl = 0 == b % 2 ? b : b - 1
                }
                if (1 == this.kb) {
                    e = a % 2;
                    for (d = 0; d < this.f; d++) {
                        for (c = this.gl; c < a; c += 2) this.F(this.s, c + 1, d, c + 1, d, 1, 1);
                        for (c = this.g - a - e; c < this.g - this.gl; c += 2) this.F(this.s, c, d + 1, c, d + 1, 1, 1)
                    }
                    this.gl = 0 == a % 2 ? a : a - 1
                }
                if (2 == this.kb) {
                    e = b % 2;
                    for (c = 0; c < this.g; c +=
                        2) {
                        for (d = this.fl; d < b; d += 2) this.F(this.s, c, d, c, d, 1, 1);
                        for (d = this.f - b - e; d < this.f - this.fl; d += 2) this.F(this.s, c + 1, d + 1, c + 1, d + 1, 1, 1)
                    }
                    e = a % 2;
                    for (d = 0; d < this.f; d += 2) {
                        for (c = this.gl; c < a; c += 2) this.F(this.s, c + 1, d, c + 1, d, 1, 1);
                        for (c = this.g - a - e; c < this.g - this.gl; c += 2) this.F(this.s, c, d + 1, c, d + 1, 1, 1)
                    }
                    this.fl = 0 == b % 2 ? b : b - 1;
                    this.gl = 0 == a % 2 ? a : a - 1
                }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Be.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.ab = b.v();
            this.uo = b.v();
            this.cB = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba &&
                (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.Mm = 0);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d;
                b = this.g / 2;
                d = this.f / 2;
                this.Mm = 6.28318 * this.ab * a / this.m;
                1 == this.cB && (this.Mm = 6.28318 - this.Mm);
                c = this.g / 2 - this.g / 2 * a / this.m;
                b = Math.floor(b + Math.cos(this.Mm) * c);
                c = Math.floor(d + Math.sin(this.Mm) * c);
                d = this.g * a / this.m;
                a = this.f * a / this.m;
                this.stretch(this.da, 0, 0, this.g, this.f, 0, 0, this.da.width, this.da.height);
                1 == this.$U ? this.stretch(this.s, b - d / 2, c - a / 2, d, a, 0, 0, this.g, this.f) : this.stretch(this.s,
                    b - d / 2, c - a / 2, d, a, this.g - d, this.f - a, d, a)
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Ce.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.ab = b.v();
            this.uo = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.ms = 0);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d;
                b = this.g / 2;
                c = this.f / 2;
                d = 6.28318 * this.ab * a / this.m;
                d -= 6.28318 * this.ms;
                1 == this.uo && (d = 6.28318 - d);
                a = this.g * a / this.m;
                b = Math.floor(b + Math.cos(d) * a);
                c = Math.floor(c + Math.sin(d) *
                    a);
                this.F(this.s);
                this.F(this.da, b - this.g / 2, c - this.f / 2, 0, 0, this.g, this.f);
                0 == this.uo ? 6.28318 <= d && this.ms++ : 0 >= d && this.ms++
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    De.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.sy = b.v();
            this.Wt = b.l();
            this.fF = b.l();
            this.start(a, c, d, e)
        },
        Zb: function () {
            var a = this.da.width,
                b = this.da.height;
            if (this.Ba) {
                this.J = Math.floor((a * this.sy / 100 + b * this.sy / 100) / 2);
                0 == this.J && (this.J = 1);
                this.Ye = (a + this.J - 1) / this.J;
                this.$g = (b + this.J - 1) / this.J;
                this.Hw = this.fF;
                this.Dd = this.Wt;
                switch (this.Wt) {
                    case t.$i:
                        this.ja = this.ka = 0;
                        break;
                    case t.aj:
                        this.ja = a - this.J;
                        this.ka = 0;
                        break;
                    case t.kk:
                        this.ja = 0;
                        this.ka = b - this.J;
                        break;
                    case t.lk:
                        this.ja = a - this.J;
                        this.ka = b - this.J;
                        break;
                    case t.Ey:
                        this.ja = a / 2 - this.J, this.ka = b / 2 - this.J, this.Dd = this.Hw == t.Ty ? t.$i : t.aj, this.os = this.ja - this.J, this.rs = this.ka - this.J, this.ls = this.ka + 2 * this.J, this.qs = this.ja + 2 * this.J, this.Ye = 2 + 2 * (this.ja + this.J - 1) / this.J, this.$g = 2 + 2 * (this.ka + this.J - 1) / this.J
                }
                this.jl = Math.floor(this.Ye * this.$g);
                this.hl = 0;
                this.Ba = !1
            }
            if (this.J >=
                a || this.J >= b) this.F(this.s);
            else {
                var c;
                c = Math.floor(this.jl * this.Hc() / this.m);
                var d = c - this.hl;
                if (0 != d)
                    for (this.hl = c, c = 0; c < d; c++)
                        if (this.F(this.s, this.ja, this.ka, this.ja, this.ka, this.J, this.J), this.Wt == t.Ey) switch (this.Dd) {
                            case t.$i:
                                this.ja += this.J;
                                this.ja >= this.qs && (this.ja -= this.J, this.ka += this.J, this.Dd = t.aj, this.qs += this.J);
                                break;
                            case t.aj:
                                this.ka += this.J;
                                this.ka >= this.ls && (this.ka -= this.J, this.ja -= this.J, this.Dd = t.lk, this.ls += this.J);
                                break;
                            case t.lk:
                                this.ja -= this.J;
                                this.ja + this.J <= this.os && (this.ja +=
                                    this.J, this.ka -= this.J, this.Dd = t.kk, this.os -= this.J);
                                break;
                            case t.kk:
                                this.ka -= this.J, this.ka + this.J <= this.rs && (this.ka += this.J, this.ja += this.J, this.Dd = t.$i, this.rs -= this.J)
                        } else switch (this.Hw) {
                            case t.Ty:
                                switch (this.Dd) {
                                    case t.$i:
                                        this.ja += this.J;
                                        this.ja >= a && (this.ja -= this.J, this.ka += this.J, this.Dd = t.aj);
                                        break;
                                    case t.aj:
                                        this.ja -= this.J;
                                        0 >= this.ja + this.J && (this.ja += this.J, this.ka += this.J, this.Dd = t.$i);
                                        break;
                                    case t.kk:
                                        this.ja += this.J;
                                        this.ja >= a && (this.ja -= this.J, this.ka -= this.J, this.Dd = t.lk);
                                        break;
                                    case t.lk:
                                        this.ja -=
                                            this.J, 0 >= this.ja + this.J && (this.ja += this.J, this.ka -= this.J, this.Dd = t.kk)
                                }
                                break;
                            case t.tG:
                                switch (this.Dd) {
                                    case t.$i:
                                        this.ka += this.J;
                                        this.ka >= b && (this.ka -= this.J, this.ja += this.J, this.Dd = t.kk);
                                        break;
                                    case t.aj:
                                        this.ka += this.J;
                                        this.ka >= b && (this.ka -= this.J, this.ja -= this.J, this.Dd = t.lk);
                                        break;
                                    case t.kk:
                                        this.ka -= this.J;
                                        0 >= this.ka + this.J && (this.ka += this.J, this.ja += this.J, this.Dd = t.$i);
                                        break;
                                    case t.lk:
                                        this.ka -= this.J, 0 >= this.ka + this.J && (this.ka += this.J, this.ja -= this.J, this.Dd = t.aj)
                                }
                        }
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Ee.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.kb = b.v();
            this.ab = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width, this.f = this.s.height, this.kg = this.il = 0);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d, e;
                0 == this.kb ? (b = this.f / this.ab, e = Math.floor(this.il * b) + Math.floor(b), c = 0, d = this.g * a / this.m, d = d * this.ab / 2, d -= this.g * this.il, b = 0 == this.kg ? 0 : this.g - d, this.F(this.s, b, c, b, c, d, e), c = this.f - e, b = 1 == this.kg ? 0 : this.g - d, this.F(this.s, b, c, b, c, d, e), d >= this.g &&
                    (this.il++, this.kg++, 2 == this.kg && (this.kg = 0))) : (b = this.g / this.ab, d = Math.floor(this.il * b) + Math.floor(b), b = 0, e = this.f * a / this.m, e = e * this.ab / 2, e -= this.f * this.il, c = 0 == this.kg ? 0 : this.f - e, this.F(this.s, b, c, b, c, d, e), b = this.g - d, c = 1 == this.kg ? 0 : this.f - e, this.F(this.s, b, c, b, c, d, e), e >= this.f && (this.il++, this.kg++, 2 == this.kg && (this.kg = 0)))
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Fe.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.start(a, c, d, e)
        },
        Zb: function (a) {
            var b = this.da.width,
                c = this.da.height;
            this.Ba &&
                (this.Ba = !1);
            if (0 == this.m) this.F(this.s);
            else {
                var d;
                d = this.Hc();
                0 != (a & t.dr) ? (a = Math.floor(b - b * d / this.m), d = Math.floor(c - c * d / this.m), this.F(this.s), this.stretch(this.da, (b - a) / 2, (c - d) / 2, a, d, 0, 0, b, c)) : (a = Math.floor(b * d / this.m), d = Math.floor(c * d / this.m), this.F(this.da), this.stretch(this.s, (b - a) / 2, (c - d) / 2, a, d, 0, 0, b, c))
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    Ge.prototype = m.extend(new t, {
        aa: function (a, b, c, d, e) {
            this.ab = b.v();
            this.start(a, c, d, e)
        },
        Zb: function () {
            this.Ba && (this.Ba = !1, this.g = this.s.width,
                this.f = this.s.height);
            var a = this.Hc();
            if (1 < a / this.m) this.F(this.s);
            else {
                var b, c, d;
                0 == this.ab ? (c = this.g * a / this.m, d = this.f * a / this.m, a = this.g / 2 - c / 2, b = this.f / 2 - d / 2, this.stretch(this.s, 0, 0, this.g, this.f, a, b, c, d)) : (c = this.g * a / this.m, c = this.g - c, d = this.f * a / this.m, d = this.f - d, a = this.g / 2 - c / 2, b = this.f / 2 - d / 2, this.stretch(this.da, 0, 0, this.g, this.f, a, b, c, d))
            }
            return null
        },
        end: function () {
            this.finish()
        }
    });
    r.yh = {
        kz: "PK\u0003\u0004",
        Gy: "PK\u0001\u0002",
        bu: "PK\u0005\u0006",
        Nz: "PK\u0006\u0007",
        HJ: "PK\u0006\u0006",
        FP: "PK\u0007\b"
    };
    r.DK = {
        Xh: !1,
        ij: !1,
        dir: !1,
        Zf: null,
        sm: null
    };
    r.prototype = function () {
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

        function c(c, e, k) {
            var g = b(c);
            g && a.call(this, g);
            k = k || {};
            !0 === k.Xh && null == k.ij && (k.ij = !0);
            k = d(k, r.DK);
            k.Zf = k.Zf || new Date;
            null !== k.sm && (k.sm = k.sm.toUpperCase());
            k.dir || null === e || "undefined" ===
                typeof e ? (k.Xh = !1, k.ij = !1, e = null) : r.Ul.Nt && e instanceof Uint8Array ? (k.Xh = !1, k.ij = !0, e = r.Dh.Mt(e)) : r.Ul.Tz && e instanceof ArrayBuffer ? (k.Xh = !1, k.ij = !0, e = new Uint8Array(e), e = r.Dh.Mt(e)) : k.ij && !k.Xh && (!0 !== k.uD && (e = r.Dh.PE(e)), delete k.uD);
            return this.files[c] = new f(c, e, k)
        }

        function d() {
            var a = {},
                b, c;
            for (b = 0; b < arguments.length; b++)
                for (c in arguments[b]) arguments[b].hasOwnProperty(c) && "undefined" === typeof a[c] && (a[c] = arguments[b][c]);
            return a
        }

        function e(a, b) {
            var c = "",
                d;
            for (d = 0; d < b; d++) c += String.fromCharCode(a &
                255), a >>>= 8;
            return c
        }

        function f(a, b, c) {
            this.name = a;
            this.data = b;
            this.options = c
        }
        f.prototype = {
            Uz: function () {
                var a = this.data;
                if (null === a || "undefined" === typeof a) return "";
                this.options.Xh && (a = sb.decode(a));
                this.options.ij || (a = r.prototype.aF(a));
                return a
            }
        };
        return {
            load: function () {
                throw Error("Load method is not defined. Is the file jszip-load.js included ?");
            },
            filter: function (a) {
                var b = [],
                    c, e, g;
                for (c in this.files) this.files.hasOwnProperty(c) && (e = this.files[c], g = new f(e.name, e.data, d(e.options)), e = c.slice(this.root.length,
                    c.length), c.slice(0, this.root.length) === this.root && a(e, g) && b.push(g));
                return b
            },
            file: function (a, b, d) {
                if (1 === arguments.length) {
                    if (a instanceof RegExp) {
                        var e = a;
                        return this.filter(function (a, b) {
                            return !b.options.dir && e.test(a)
                        })
                    }
                    return this.filter(function (b, c) {
                        return !c.options.dir && b === a
                    })[0] || null
                }
                a = this.root + a;
                c.call(this, a, b, d);
                return this
            },
            BT: function (b) {
                if (!b) return this;
                if (b instanceof RegExp) return this.filter(function (a, c) {
                    return c.options.dir && b.test(a)
                });
                var c = a.call(this, this.root + b),
                    d = this.clone();
                d.root = c.name;
                return d
            },
            remove: function (a) {
                a = this.root + a;
                var b = this.files[a];
                b || ("/" != a.slice(-1) && (a += "/"), b = this.files[a]);
                if (b)
                    if (b.options.dir)
                        for (var b = this.filter(function (b, c) {
                                return c.name.slice(0, a.length) === a
                            }), c = 0; c < b.length; c++) delete this.files[b[c].name];
                    else delete this.files[a];
                return this
            },
            FT: function (a) {
                var b, c;
                a = d(a || {}, {
                    Xh: !0,
                    sm: "STORE",
                    type: "base64"
                });
                var f = a.sm.toUpperCase();
                if (!r.Yf[f]) throw f + " is not a valid compression method !";
                var g = [],
                    k = [],
                    n = 0,
                    l;
                for (l in this.files)
                    if (this.files.hasOwnProperty(l)) {
                        b =
                            this.files[l];
                        var p = this.aF(b.name),
                            m, t, v;
                        t = b;
                        b = p;
                        var w = f;
                        m = b !== t.name;
                        c = t.Uz();
                        var z = t.options;
                        v = z.Zf.getHours();
                        v = v << 6 | z.Zf.getMinutes();
                        v = v << 5 | z.Zf.getSeconds() / 2;
                        t = z.Zf.getFullYear() - 1980;
                        t = t << 4 | z.Zf.getMonth() + 1;
                        t = t << 5 | z.Zf.getDate();
                        var C = null !== c && 0 !== c.length,
                            w = z.sm || w;
                        if (!r.Yf[w]) throw w + " is not a valid compression method !";
                        z = r.Yf[w];
                        w = C ? z.jK(c) : "";
                        m = "\n\x00" + (m ? "\x00\b" : "\x00\x00") + (C ? z.ts : r.Yf.STORE.ts);
                        m += e(v, 2);
                        m += e(t, 2);
                        m += C ? e(this.sr(c), 4) : "\x00\x00\x00\x00";
                        m += C ? e(w.length, 4) : "\x00\x00\x00\x00";
                        m += C ? e(c.length, 4) : "\x00\x00\x00\x00";
                        m += e(b.length, 2);
                        b = m += "\x00\x00";
                        c = w;
                        c = r.yh.kz + b + p + c;
                        p = r.yh.Gy + "\u0014\x00" + b + "\x00\x00\x00\x00\x00\x00" + (!0 === this.files[l].options.dir ? "\u0010\x00\x00\x00" : "\x00\x00\x00\x00") + e(n, 4) + p;
                        n += c.length;
                        k.push(c);
                        g.push(p)
                    } f = k.join("");
                g = g.join("");
                k = f + g + (r.yh.bu + "\x00\x00\x00\x00" + e(k.length, 2) + e(k.length, 2) + e(g.length, 4) + e(f.length, 4) + "\x00\x00");
                switch (a.type.toLowerCase()) {
                    case "uint8array":
                        return r.Dh.ky(k);
                    case "arraybuffer":
                        return r.Dh.ky(k).buffer;
                    case "blob":
                        return r.Dh.gO(k);
                    case "base64":
                        return a.Xh ? sb.encode(k) : k;
                    default:
                        return k
                }
            },
            sr: function (a, b) {
                if ("" === a || "undefined" === typeof a) return 0;
                var c = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242,
                    1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368,
                    4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646,
                    62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804,
                    3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701,
                    2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117
                ];
                "undefined" == typeof b && (b = 0);
                var d;
                b ^= -1;
                for (var e = 0, f = a.length; e < f; e++) d = (b ^ a.charCodeAt(e)) & 255, d = c[d], b = b >>> 8 ^ d;
                return b ^ -1
            },
            clone: function () {
                var a = new r,
                    b;
                for (b in this) "function" !== typeof this[b] && (a[b] = this[b]);
                return a
            },
            aF: function (a) {
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128)), b += String.fromCharCode(d & 63 | 128))
                }
                return b
            },
            $E: function (a) {
                for (var b = "", c = 0, d, e, f; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1), b += String.fromCharCode((d &
                    31) << 6 | e & 63), c += 2) : (e = a.charCodeAt(c + 1), f = a.charCodeAt(c + 2), b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63), c += 3);
                return b
            }
        }
    }();
    r.Yf = {
        STORE: {
            ts: "\x00\x00",
            jK: function (a) {
                return a
            },
            py: function (a) {
                return a
            }
        }
    };
    r.Ul = {
        Tz: "undefined" !== typeof ArrayBuffer && "undefined" !== typeof Uint8Array,
        Nt: "undefined" !== typeof Uint8Array,
        blob: function () {
            if ("undefined" === typeof ArrayBuffer) return !1;
            var a = new ArrayBuffer(0);
            try {
                return 0 === (new Blob([a], {
                    type: "application/zip"
                })).size
            } catch (c) {}
            try {
                var b = new(window.BlobBuilder ||
                    window.WebKitBlobBuilder || window.DI || window.wI);
                b.append(a);
                return 0 === b.getBlob("application/zip").size
            } catch (c) {}
            return !1
        }()
    };
    r.Dh = {
        PE: function (a) {
            for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(a.charCodeAt(c) & 255);
            return b
        },
        ky: function (a) {
            if (!r.Ul.Nt) throw Error("Uint8Array is not supported by this browser");
            for (var b = new ArrayBuffer(a.length), b = new Uint8Array(b), c = 0; c < a.length; c++) b[c] = a.charCodeAt(c);
            return b
        },
        Mt: function (a) {
            if (!r.Ul.Nt) throw Error("Uint8Array is not supported by this browser");
            for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(a[c]);
            return b
        },
        gO: function (a) {
            if (!r.Ul.blob) throw Error("Blob is not supported by this browser");
            a = r.Dh.ky(a).buffer;
            try {
                return new Blob([a], {
                    type: "application/zip"
                })
            } catch (c) {}
            try {
                var b = new(window.BlobBuilder || window.WebKitBlobBuilder || window.DI || window.wI);
                b.append(a);
                return b.getBlob("application/zip")
            } catch (c) {}
            throw Error("Bug : can't construct the Blob.");
        }
    };
    var sb = function () {
        return {
            encode: function (a) {
                for (var b = "", c, d, e, f, g, h, k = 0; k < a.length;) c =
                    a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), f = c >> 2, c = (c & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >> 6, h = e & 63, isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64), b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);
                return b
            },
            decode: function (a) {
                var b = "",
                    c, d, e, f, g,
                    h = 0;
                for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length;) c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(h++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | f >> 2, e = (f & 3) << 6 | g, b += String.fromCharCode(c), 64 !=
                    f && (b += String.fromCharCode(d)), 64 != g && (b += String.fromCharCode(e));
                return b
            }
        }
    }();
    if (!r) throw "JSZip not defined";
    (function () {
        function a() {
            this.list = this.next = null
        }

        function b() {
            this.n = this.Wf = this.e = 0;
            this.t = null
        }

        function c(c, d, e, f, g, h) {
            this.jk = 16;
            this.EI = 288;
            this.status = 0;
            this.root = null;
            this.Zg = 0;
            var k = Array(this.jk + 1),
                l, q, n, p, m, r, t, w = Array(this.jk + 1),
                z, v, C, F = new b,
                u = Array(this.jk);
            p = Array(this.EI);
            var A, P = Array(this.jk + 1),
                B, D, I;
            I = this.root = null;
            for (m = 0; m < k.length; m++) k[m] = 0;
            for (m = 0; m < w.length; m++) w[m] =
                0;
            for (m = 0; m < u.length; m++) u[m] = null;
            for (m = 0; m < p.length; m++) p[m] = 0;
            for (m = 0; m < P.length; m++) P[m] = 0;
            l = 256 < d ? c[256] : this.jk;
            z = c;
            v = 0;
            m = d;
            do k[z[v]]++, v++; while (0 < --m);
            if (k[0] == d) this.root = null, this.status = this.Zg = 0;
            else {
                for (r = 1; r <= this.jk && 0 == k[r]; r++);
                t = r;
                h < r && (h = r);
                for (m = this.jk; 0 != m && 0 == k[m]; m--);
                n = m;
                h > m && (h = m);
                for (B = 1 << r; r < m; r++, B <<= 1)
                    if (0 > (B -= k[r])) {
                        this.status = 2;
                        this.Zg = h;
                        return
                    } if (0 > (B -= k[m])) this.status = 2, this.Zg = h;
                else {
                    k[m] += B;
                    P[1] = r = 0;
                    z = k;
                    v = 1;
                    for (C = 2; 0 < --m;) P[C++] = r += z[v++];
                    z = c;
                    m = v = 0;
                    do 0 != (r =
                        z[v++]) && (p[P[r]++] = m); while (++m < d);
                    d = P[n];
                    P[0] = m = 0;
                    z = p;
                    v = 0;
                    p = -1;
                    A = w[0] = 0;
                    C = null;
                    for (D = 0; t <= n; t++)
                        for (c = k[t]; 0 < c--;) {
                            for (; t > A + w[1 + p];) {
                                A += w[1 + p];
                                p++;
                                D = (D = n - A) > h ? h : D;
                                if ((q = 1 << (r = t - A)) > c + 1)
                                    for (q -= c + 1, C = t; ++r < D && !((q <<= 1) <= k[++C]);) q -= k[C];
                                A + r > l && A < l && (r = l - A);
                                D = 1 << r;
                                w[1 + p] = r;
                                C = Array(D);
                                for (q = 0; q < D; q++) C[q] = new b;
                                I = null == I ? this.root = new a : I.next = new a;
                                I.next = null;
                                I.list = C;
                                u[p] = C;
                                0 < p && (P[p] = m, F.Wf = w[p], F.e = 16 + r, F.t = C, r = (m & (1 << A) - 1) >> A - w[p], u[p - 1][r].e = F.e, u[p - 1][r].Wf = F.Wf, u[p - 1][r].n = F.n, u[p - 1][r].t =
                                    F.t)
                            }
                            F.Wf = t - A;
                            v >= d ? F.e = 99 : z[v] < e ? (F.e = 256 > z[v] ? 16 : 15, F.n = z[v++]) : (F.e = g[z[v] - e], F.n = f[z[v++] - e]);
                            q = 1 << t - A;
                            for (r = m >> A; r < D; r += q) C[r].e = F.e, C[r].Wf = F.Wf, C[r].n = F.n, C[r].t = F.t;
                            for (r = 1 << t - 1; 0 != (m & r); r >>= 1) m ^= r;
                            for (m ^= r;
                                (m & (1 << A) - 1) != P[p];) A -= w[p], p--
                        }
                    this.Zg = w[1];
                    this.status = 0 != B && 1 != n ? 1 : 0
                }
            }
        }

        function d(a) {
            for (; A < a;) u |= (J.length == K ? -1 : J.charCodeAt(K++) & 255) << A, A += 8
        }

        function e(a) {
            return u & L[a]
        }

        function f(a) {
            u >>= a;
            A -= a
        }

        function g(a, b, c) {
            var g, h, k;
            if (0 == c) return 0;
            for (k = 0;;) {
                d(G);
                h = D.list[e(G)];
                for (g = h.e; 16 <
                    g;) {
                    if (99 == g) return -1;
                    f(h.Wf);
                    g -= 16;
                    d(g);
                    h = h.t[e(g)];
                    g = h.e
                }
                f(h.Wf);
                if (16 == g) t &= 32767, a[b + k++] = m[t++] = h.n;
                else {
                    if (15 == g) break;
                    d(g);
                    C = h.n + e(g);
                    f(g);
                    d(E);
                    h = H.list[e(E)];
                    for (g = h.e; 16 < g;) {
                        if (99 == g) return -1;
                        f(h.Wf);
                        g -= 16;
                        d(g);
                        h = h.t[e(g)];
                        g = h.e
                    }
                    f(h.Wf);
                    d(g);
                    B = t - h.n - e(g);
                    for (f(g); 0 < C && k < c;) C--, B &= 32767, t &= 32767, a[b + k++] = m[t++] = m[B++]
                }
                if (k == c) return c
            }
            w = -1;
            return k
        }

        function h(a, b, h) {
            var k, l, q, n, p, m, r, t = Array(316);
            for (k = 0; k < t.length; k++) t[k] = 0;
            d(5);
            m = 257 + e(5);
            f(5);
            d(5);
            r = 1 + e(5);
            f(5);
            d(4);
            k = 4 + e(4);
            f(4);
            if (286 <
                m || 30 < r) return -1;
            for (l = 0; l < k; l++) d(3), t[R[l]] = e(3), f(3);
            for (; 19 > l; l++) t[R[l]] = 0;
            G = 7;
            l = new c(t, 19, 19, null, null, G);
            if (0 != l.status) return -1;
            D = l.root;
            G = l.Zg;
            n = m + r;
            for (k = q = 0; k < n;)
                if (d(G), p = D.list[e(G)], l = p.Wf, f(l), l = p.n, 16 > l) t[k++] = q = l;
                else if (16 == l) {
                d(2);
                l = 3 + e(2);
                f(2);
                if (k + l > n) return -1;
                for (; 0 < l--;) t[k++] = q
            } else {
                17 == l ? (d(3), l = 3 + e(3), f(3)) : (d(7), l = 11 + e(7), f(7));
                if (k + l > n) return -1;
                for (; 0 < l--;) t[k++] = 0;
                q = 0
            }
            G = 9;
            l = new c(t, m, 257, M, N, G);
            0 == G && (l.status = 1);
            if (0 != l.status) return -1;
            D = l.root;
            G = l.Zg;
            for (k = 0; k < r; k++) t[k] =
                t[k + m];
            E = 6;
            l = new c(t, r, 0, O, Q, E);
            H = l.root;
            E = l.Zg;
            return 0 == E && 257 < m || 0 != l.status ? -1 : g(a, b, h)
        }

        function k(a, b) {
            var k, q;
            for (k = 0; k < b && (!P || -1 != w);) {
                if (0 < C) {
                    if (0 != w)
                        for (; 0 < C && k < b;) C--, B &= 32767, t &= 32767, a[0 + k++] = m[t++] = m[B++];
                    else {
                        for (; 0 < C && k < b;) C--, t &= 32767, d(8), a[0 + k++] = m[t++] = e(8), f(8);
                        0 == C && (w = -1)
                    }
                    if (k == b) break
                }
                if (-1 == w) {
                    if (P) break;
                    d(1);
                    0 != e(1) && (P = !0);
                    f(1);
                    d(2);
                    w = e(2);
                    f(2);
                    D = null;
                    C = 0
                }
                switch (w) {
                    case 0:
                        var n = a,
                            r = 0 + k,
                            F = b - k;
                        q = A & 7;
                        f(q);
                        d(16);
                        q = e(16);
                        f(16);
                        d(16);
                        if (q != (~u & 65535)) q = -1;
                        else {
                            f(16);
                            C = q;
                            for (q =
                                0; 0 < C && q < F;) C--, t &= 32767, d(8), n[r + q++] = m[t++] = e(8), f(8);
                            0 == C && (w = -1)
                        }
                        break;
                    case 1:
                        if (null != D) q = g(a, 0 + k, b - k);
                        else a: {
                            var I;q = a;n = 0 + k;r = b - k;
                            if (null == l) {
                                F = Array(288);
                                for (I = 0; 144 > I; I++) F[I] = 8;
                                for (; 256 > I; I++) F[I] = 9;
                                for (; 280 > I; I++) F[I] = 7;
                                for (; 288 > I; I++) F[I] = 8;
                                z = 7;
                                I = new c(F, 288, 257, M, N, z);
                                if (0 != I.status) {
                                    alert("HufBuild error: " + I.status);
                                    q = -1;
                                    break a
                                }
                                l = I.root;
                                z = I.Zg;
                                for (I = 0; 30 > I; I++) F[I] = 5;
                                p = 5;
                                I = new c(F, 30, 0, O, Q, p);
                                if (1 < I.status) {
                                    l = null;
                                    alert("HufBuild error: " + I.status);
                                    q = -1;
                                    break a
                                }
                                v = I.root;
                                p = I.Zg
                            }
                            D =
                            l;H = v;G = z;E = p;q = g(q, n, r)
                        }
                        break;
                    case 2:
                        q = null != D ? g(a, 0 + k, b - k) : h(a, 0 + k, b - k);
                        break;
                    default:
                        q = -1
                }
                if (-1 == q) return P ? 0 : -1;
                k += q
            }
            return k
        }

        function n(a) {
            var b, c, d;
            null == m && (m = Array(65536));
            A = u = t = 0;
            w = -1;
            P = !1;
            C = B = 0;
            D = null;
            J = a;
            K = 0;
            b = Array(1024);
            for (a = ""; 0 < (c = k(b, b.length));)
                for (d = 0; d < c; d++) a += String.fromCharCode(b[d]);
            J = null;
            return a
        }
        var p, m, t, l = null,
            v, z, u, A, w, P, C, B, D, H, G, E, J, K, L = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
            M = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83,
                99, 115, 131, 163, 195, 227, 258, 0, 0
            ],
            N = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99],
            O = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
            Q = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        r.Yf.DEFLATE ? r.Yf.DEFLATE.py = n : r.Yf.DEFLATE = {
            ts: "\b\x00",
            py: n
        }
    })();
    (function () {
        function a(a) {
            var b = "",
                c, d;
            for (d = 0; d < (a || "").length; d++) c = a.charCodeAt(d), b += "\\x" +
                (16 > c ? "0" : "") + c.toString(16).toUpperCase();
            return b
        }

        function b(a) {
            this.stream = "";
            r.Ul.Nt && a instanceof Uint8Array ? this.stream = r.Dh.Mt(a) : r.Ul.Tz && a instanceof ArrayBuffer ? (a = new Uint8Array(a), this.stream = r.Dh.Mt(a)) : this.stream = r.Dh.PE(a);
            this.index = 0
        }

        function c(a, b) {
            this.options = a;
            this.Ew = b
        }

        function d(a, b) {
            this.files = [];
            this.Ew = b;
            a && this.load(a)
        }
        b.prototype = {
            mA: function (a) {
                this.lA(this.index + a)
            },
            lA: function (a) {
                if (this.stream.length < a || 0 > a) throw Error("End of stream reached (stream length = " + this.stream.length +
                    ", asked index = " + a + "). Corrupted zip ?");
            },
            xn: function (a) {
                this.lA(a);
                this.index = a
            },
            HE: function (a) {
                this.xn(this.index + a)
            },
            aK: function (a) {
                return this.stream.charCodeAt(a)
            },
            Ia: function (a) {
                var b = 0,
                    c;
                this.mA(a);
                for (c = this.index + a - 1; c >= this.index; c--) b = (b << 8) + this.aK(c);
                this.index += a;
                return b
            },
            If: function (a) {
                this.mA(a);
                var b = this.stream.slice(this.index, this.index + a);
                this.index += a;
                return b
            },
            oN: function () {
                var a = this.Ia(4);
                return new Date((a >> 25 & 127) + 1980, (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (a & 31) <<
                    1)
            }
        };
        c.prototype = {
            OL: function () {
                return 1 === (this.dA & 1)
            },
            rO: function () {
                return 2048 === (this.dA & 2048)
            },
            sN: function (b) {
                var c, d;
                b.HE(22);
                this.Qv = b.Ia(2);
                d = b.Ia(2);
                this.fileName = b.If(this.Qv);
                b.HE(d);
                if (-1 == this.qr || -1 == this.Pt) throw Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)");
                this.kK = b.If(this.qr);
                a: {
                    b = this.sA;
                    for (c in r.Yf)
                        if (r.Yf.hasOwnProperty(c) && r.Yf[c].ts === b) {
                            c = r.Yf[c];
                            break a
                        } c = null
                }
                if (null === c) throw Error("Corrupted zip : compression " +
                    a(this.sA) + " unknown (inner file : " + this.fileName + ")");
                this.qy = c.py(this.kK);
                if (this.qy.length !== this.Pt) throw Error("Bug : uncompressed data size mismatch");
                if (this.Ew.eT && r.prototype.sr(this.qy) !== this.sr) throw Error("Corrupted zip : CRC32 mismatch");
            },
            nN: function (a) {
                a.If(2);
                a.Ia(2);
                this.dA = a.Ia(2);
                this.sA = a.If(2);
                this.Zf = a.oN();
                this.sr = a.Ia(4);
                this.qr = a.Ia(4);
                this.Pt = a.Ia(4);
                this.Qv = a.Ia(2);
                this.YK = a.Ia(2);
                this.aL = a.Ia(2);
                this.WA = a.Ia(2);
                a.Ia(2);
                this.XK = a.Ia(4);
                this.Gw = a.Ia(4);
                if (this.OL()) throw Error("Encrypted zip are not supported");
                this.fileName = a.If(this.Qv);
                this.qN(a);
                this.SM(a);
                this.mB = a.If(this.aL);
                this.dir = this.XK & 16 ? !0 : !1
            },
            SM: function () {
                if (this.Br[1]) {
                    var a = new b(this.Br[1].value); - 1 === this.Pt && (this.Pt = a.Ia(8)); - 1 === this.qr && (this.qr = a.Ia(8)); - 1 === this.Gw && (this.Gw = a.Ia(8)); - 1 === this.WA && (this.WA = a.Ia(4))
                }
            },
            qN: function (a) {
                var b = a.index,
                    c, d, e;
                for (this.Br = this.Br || {}; a.index < b + this.YK;) c = a.Ia(2), d = a.Ia(2), e = a.If(d), this.Br[c] = {
                    id: c,
                    length: d,
                    value: e
                }
            },
            zL: function () {
                this.rO() && (this.fileName = r.prototype.$E(this.fileName),
                    this.mB = r.prototype.$E(this.mB))
            }
        };
        d.prototype = {
            mr: function (b) {
                var c = this.eb.If(4);
                if (c !== b) throw Error("Corrupted zip or bug : unexpected signature (" + a(c) + ", expected " + a(b) + ")");
            },
            iN: function () {
                this.VA = this.eb.Ia(2);
                this.XA = this.eb.Ia(2);
                this.hA = this.eb.Ia(2);
                this.gA = this.eb.Ia(2);
                this.iA = this.eb.Ia(4);
                this.uv = this.eb.Ia(4);
                this.vO = this.eb.Ia(2);
                this.eb.If(this.vO)
            },
            jN: function () {
                this.tO = this.eb.Ia(8);
                this.eb.If(2);
                this.eb.Ia(2);
                this.VA = this.eb.Ia(4);
                this.XA = this.eb.Ia(4);
                this.hA = this.eb.Ia(8);
                this.gA = this.eb.Ia(8);
                this.iA = this.eb.Ia(8);
                this.uv = this.eb.Ia(8);
                this.uO = {};
                for (var a = this.tO - 44, b, c, d; 0 < a;) b = this.eb.Ia(2), c = this.eb.Ia(4), d = this.eb.If(c), this.uO[b] = {
                    id: b,
                    length: c,
                    value: d
                }
            },
            kN: function () {
                this.eb.Ia(4);
                this.vN = this.eb.Ia(8);
                this.IK = this.eb.Ia(4);
                if (1 < this.IK) throw Error("Multi-volumes zip are not supported");
            },
            rN: function () {
                var a, b;
                for (a = 0; a < this.files.length; a++) b = this.files[a], this.eb.xn(b.Gw), this.mr(r.yh.kz), b.sN(this.eb), b.zL()
            },
            mN: function () {
                var a;
                for (this.eb.xn(this.uv); this.eb.If(4) ===
                    r.yh.Gy;) a = new c({
                    eF: this.eF
                }, this.Ew), a.nN(this.eb), this.files.push(a)
            },
            pN: function () {
                var a = this.eb.stream.lastIndexOf(r.yh.bu);
                if (-1 === a) throw Error("Corrupted zip : can't find end of central directory");
                this.eb.xn(a);
                this.mr(r.yh.bu);
                this.iN();
                if (65535 === this.VA || 65535 === this.XA || 65535 === this.hA || 65535 === this.gA || -1 === this.iA || -1 === this.uv) {
                    this.eF = !0;
                    a = this.eb.stream.lastIndexOf(r.yh.Nz);
                    if (-1 === a) throw Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
                    this.eb.xn(a);
                    this.mr(r.yh.Nz);
                    this.kN();
                    this.eb.xn(this.vN);
                    this.mr(r.yh.HJ);
                    this.jN()
                }
            },
            load: function (a) {
                this.eb = new b(a);
                this.pN();
                this.mN();
                this.rN()
            }
        };
        r.prototype.load = function (a, b) {
            var c, e, f;
            b = b || {};
            b.Xh && (a = sb.decode(a));
            c = (new d(a, b)).files;
            for (e = 0; e < c.length; e++) f = c[e], this.file(f.fileName, f.qy, {
                ij: !0,
                uD: !0,
                Zf: f.Zf,
                dir: f.dir
            });
            return this
        }
    })();
    var ef = document.getElementsByTagName("script"),
        ff = ef[ef.length - 1].src;
    document.UU = ff.substring(0, ff.lastIndexOf("/") + 1);
    la.Runtime = He;
    la.headerLoaded = Ie;
    la.mO = "updateApplication";
    la[window.mO] = ab;
    Ea.prototype = {
        wb: function (a, b, c) {
            if (this.visible) {
                this.Mg && (a.Ra.save(), a.Ra.translate(this.hq, this.jq), 0 != this.angle && a.Ra.rotate(.0174532925 * -this.angle), a.Ra.scale(Math.max(.001, this.xc), Math.max(.001, this.yc)), a.Ra.translate(-this.Ja, -this.Ga));
                var d;
                for (d = 0; d < this.children.length; d++) this.children[d].wb(a, b + this.x, c + this.y);
                this.Mg && a.Ra.restore()
            }
        },
        we: function (a) {
            this.children.push(a)
        },
        fr: function (a, b) {
            b >= this.children.length ? this.children.push(a) : (0 > b && (b = 0), this.children.splice(b,
                0, a))
        },
        wN: function () {
            this.children.length = 0
        },
        removeChild: function (a) {
            var b;
            for (b = 0; b < this.children.length; b++)
                if (this.children[b] == a) return this.children.splice(b, 1), b;
            return -1
        },
        nd: function (a) {
            var b;
            for (b = 0; b < this.children.length; b++)
                if (this.children[b] == a) return b;
            return -1
        },
        ce: function (a, b) {
            var c, d = null;
            for (c = 0; c < this.children.length; c++)
                if (this.children[c] == a) {
                    d = this.children[c];
                    break
                } null != d && (this.children.splice(c, 1), b > c && b--, 0 > b && (b = 0), b >= this.children.length ? this.children.push(a) : this.children.splice(b,
                0, a))
        }
    };
    na.Hn = 0;
    na.ue = 1;
    na.TF = 1;
    na.UF = 2;
    na.In = 64;
    na.Jn = 16;
    na.bm = 6;
    K.hS = 0;
    K.iS = 1;
    K.sk = 0;
    K.tk = 1;
    K.vw = [65535, 32767, 16383, 8191, 4095, 2047, 1023, 511, 255, 127, 63, 31, 15, 7, 3, 1];
    K.Gx = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
    K.zh = new G;
    K.ck = new G;
    K.qm = new G;
    K.jj = new G;
    K.prototype = {
        Cv: function (a, b, c) {
            var d, e;
            this.width = b.width;
            this.height = b.height;
            this.Ja = b.Ja;
            this.Ga = b.Ga;
            var f = Math.floor((this.width + 15 & 4294967280) / 16);
            this.lineWidth = f;
            e = f * this.height +
                1;
            if ("undefined" != typeof ArrayBuffer) this.T = new Uint16Array(new ArrayBuffer(2 * e));
            else
                for (this.T = Array(e), d = 0; d < e; d++) this.T[d] = 0;
            d = document.createElement("canvas");
            d.width = b.width;
            d.height = b.height;
            d = d.getContext("2d");
            0 == b.Ab ? d.drawImage(b.zb, 0, 0) : d.drawImage(a.ia.Vb[b.Ab], b.Ed, b.Fd, b.width, b.height, 0, 0, b.width, b.height);
            a = d.getImageData(0, 0, this.width, this.height);
            if (0 == (c & K.tk))
                for (c = 0; c < this.height; c++) {
                    e = c * b.width * 4 + 3;
                    var g = c * f,
                        h = 32768;
                    for (d = 0; d < this.width; d++) 0 != a.data[e] && (this.T[g] |= h),
                        e += 4, h >>>= 1, 0 == h && (h = 32768, g++)
                } else
                    for (d = 0; d < this.width; d++) {
                        for (c = 0; c < this.height && 0 == a.data[4 * (c * b.width + d) + 3]; c++);
                        if (c < this.height)
                            for (g = Math.min(this.height, c + na.bm), h = 32768 >> (d & 15); c < g; c++) 0 != a.data[4 * (c * b.width + d) + 3] && (e = Math.floor(c * f + (d & 4294967280) / 16), this.T[e] |= h)
                    }
        },
        Dv: function (a, b, c) {
            var d;
            this.width = b.width;
            this.height = b.height;
            this.Ja = b.Ja;
            this.Ga = b.Ga;
            this.lineWidth = a = Math.floor((this.width + 15 & 4294967280) / 16);
            b = a * this.height + 1;
            this.T = "undefined" != typeof ArrayBuffer ? new Uint16Array(new ArrayBuffer(2 *
                b)) : Array(b);
            b = this.height;
            0 != (c & K.tk) && b > na.bm && (b = na.bm);
            var e = a,
                f = 0;
            0 != (this.width & 15) && (f = 65535 << 16 - (this.width & 15) & 65535, e--);
            for (d = 0; d < b; d++) {
                var g = d * a;
                for (c = 0; c < e; c++) this.T[g++] = 65535;
                0 != f && (this.T[g] = f)
            }
        },
        BN: function (a, b, c) {
            var d, e, f;
            90 == c ? (c = 0, f = 1) : 180 == c ? (c = -1, f = 0) : 270 == c ? (c = 0, f = -1) : (f = c * Math.PI / 180, c = Math.cos(f), f = Math.sin(f));
            var g, h;
            null == b ? (e = h = 0, K.zh.x = K.zh.y = 0) : (g = -b.x * c, d = -b.x * f, e = -b.y * c, h = -b.y * f, K.zh.x = Math.floor(g + h), K.zh.y = Math.floor(e - d));
            d = null == b ? a.right : a.right - b.x;
            g = d * c;
            d *= f;
            K.ck.x = Math.floor(g + h);
            K.ck.y = Math.floor(e - d);
            e = null == b ? a.bottom : a.bottom - b.y;
            K.jj.x = Math.floor(g + e * f);
            K.jj.y = Math.floor(e * c - d);
            K.qm.x = K.zh.x + K.jj.x - K.ck.x;
            K.qm.y = K.zh.y + K.jj.y - K.ck.y;
            c = Math.min(K.zh.x, Math.min(K.ck.x, Math.min(K.jj.x, K.qm.x)));
            f = Math.min(K.zh.y, Math.min(K.ck.y, Math.min(K.jj.y, K.qm.y)));
            g = Math.max(K.zh.x, Math.max(K.ck.x, Math.max(K.jj.x, K.qm.x)));
            d = Math.max(K.zh.y, Math.max(K.ck.y, Math.max(K.jj.y, K.qm.y)));
            null != b && (b.x = -c, b.y = -f);
            a.right = g - c;
            a.bottom = d - f
        },
        vK: function (a, b, c, d) {
            var e,
                f, g = a.width;
            e = a.height;
            var h = new aa;
            h.right = Math.floor(a.width * c);
            h.bottom = Math.floor(a.height * d);
            var k = new G;
            k.x = Math.floor(a.Ja * c);
            k.y = Math.floor(a.Ga * d);
            this.BN(h, k, b);
            var n = h.right,
                h = h.bottom;
            if (0 >= n || 0 >= h) return !1;
            var m = a.lineWidth,
                p = (n + 15 & 2147483632) / 16;
            this.T = "undefined" != typeof ArrayBuffer ? new Uint16Array(new ArrayBuffer(2 * (p * h + 1))) : Array(p * h + 1);
            var r;
            for (r = p * h; 0 <= r; r--) this.T[r] = 0;
            this.lineWidth = p;
            this.width = n;
            this.height = h;
            this.Ja = k.x;
            this.Ga = k.y;
            b *= .017453292;
            f = Math.cos(b);
            var l = Math.sin(b);
            b = 0;
            k = Math.floor(65536 * (g / 2 - (n / 2 * f - h / 2 * l) / c));
            r = Math.floor(65536 * (e / 2 - (n / 2 * l + h / 2 * f) / d));
            var t = Math.floor(65536 * f / c),
                v = Math.floor(65536 * l / d),
                z = n / 16,
                n = n % 16;
            d = Math.floor(65536 * f / d);
            c = Math.floor(65536 * l / c);
            var g = 65536 * g,
                l = 65536 * e,
                A, w;
            for (f = 0; f < h; f++) {
                var u = k,
                    C = r,
                    D = b,
                    B;
                for (e = 0; e < z; e++) {
                    var E = 0;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 32768));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A =
                        32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 16384));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 8192));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 4096));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 2048));
                    u += t;
                    C += v;
                    0 <= u &&
                        u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 1024));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 512));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 256));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w *
                        m + B / 16)], 0 != (w & A) && (E |= 128));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 64));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 32));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 16));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536),
                        w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 8));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 4));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 2));
                    u += t;
                    C += v;
                    0 <= u && u < g && 0 <= C && C < l && (B = Math.floor(u / 65536), w = Math.floor(C / 65536), A = 32768 >>> B % 16, w = a.T[Math.floor(w * m + B / 16)], 0 != (w & A) && (E |= 1));
                    u += t;
                    C += v;
                    this.T[D++] = E
                }
                if (0 != n) {
                    E = 32768;
                    for (e = B = 0; e < n; e++, E = E >> 1 & 32767) {
                        if (0 <= u && u < g && 0 <= C && C < l) {
                            w = Math.floor(u / 65536);
                            var H = Math.floor(C / 65536);
                            A = 32768 >>> w % 16;
                            w = a.T[Math.floor(H * m + w / 16)];
                            0 != (w & A) && (B |= E)
                        }
                        u += t;
                        C += v
                    }
                    this.T[D] = B
                }
                b += p;
                k -= c;
                r += d
            }
            return !0
        },
        bk: function (a, b, c, d, e, f, g) {
            var h, k, n;
            a <= e ? (h = this, n = Math.floor(c), c = Math.floor(g), k = Math.floor(a), g = Math.floor(b), a = Math.floor(e), b = Math.floor(f)) : (h = d, d = this, n = Math.floor(g), c = Math.floor(c), k = Math.floor(e), g = Math.floor(f), a = Math.floor(a), b = Math.floor(b));
            f = h.height;
            var m = 0;
            0 != n && (f = n, g += h.height - n, m = h.height - n);
            e = d.height;
            var p = 0;
            0 != c && (e = c, b += d.height - c, p = d.height - c);
            if (k >= a + d.width || k + h.width <= a || g >= b + e || g + f < b) return !1;
            c = a - k;
            n = Math.floor(c / 16);
            c %= 16;
            k = Math.min(k + h.width - a, d.width);
            k = Math.floor((k + 15) / 16);
            g <= b ? (a = b - g + m, m = p, g = Math.min(g + f, b + e) - b) : (a = m, m = g - b + p, g = Math.min(g + f, b + e) - g);
            b = a * h.lineWidth;
            e = m * d.lineWidth;
            if (0 != c) switch (k) {
                case 1:
                    for (a = 0; a < g; a++) {
                        m = h.T[b + n] << c;
                        if (0 != (m & d.T[e]) || n + 1 < h.lineWidth && (m = h.T[b + n + 1] << c, m >>>= 16, 0 != (m & d.T[e]))) return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
                    break;
                case 2:
                    for (a = 0; a < g; a++) {
                        m = h.T[b + n] << c;
                        if (0 != (m & d.T[e])) return !0;
                        m = h.T[b + n + 1] << c;
                        p = m >>> 16;
                        if (0 != (p & d.T[e]) || 0 != (m & d.T[e + 1]) || n + 2 < h.lineWidth && (m = h.T[b + n + 2] << c, m >>>= 16, 0 != (m & d.T[e + 1]))) return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
                    break;
                default:
                    for (a = 0; a < g; a++) {
                        m = h.T[b + n] << c;
                        if (0 != (m & d.T[e])) return !0;
                        for (f = 0; f < k - 1; f++)
                            if (m = h.T[b + n + f + 1] << c, p = m >>> 16, 0 != (p & d.T[e + f]) || 0 != (m & d.T[e + f + 1])) return !0;
                        if (n + f + 1 < h.lineWidth && (m = h.T[b + n + f + 1] << c, m >>>= 16, 0 != (m & d.T[e + f]))) return !0;
                        b += h.lineWidth;
                        e += d.lineWidth
                    }
            } else
                for (a = 0; a < g; a++) {
                    for (f = 0; f < k; f++)
                        if (m = h.T[b + n + f], 0 != (d.T[e + f] & m)) return !0;
                    b += h.lineWidth;
                    e += d.lineWidth
                }
            return !1
        },
        ly: function (a, b, c, d, e, f, g, h) {
            a = Math.floor(a);
            b = Math.floor(b);
            d = Math.floor(d);
            e = Math.floor(e);
            var k = 0,
                m = this.height;
            0 < c && (k = this.height - c, b += k, m = c);
            c = g;
            0 < h && (e += g - h, c = h);
            if (a >= d + f || a + this.width <= d || b >= e + c || b + m < e) return !1;
            a <= d ? (g = d - a, a = Math.min(this.width - g, f)) : (g = 0, a = Math.min(d + f - a, this.width));
            b <= e ? (k = e - b + k, b = Math.min(b + m, e + c) - e) : b = Math.min(b + m, e + c) - b;
            e = Math.floor(g /
                8);
            m = Math.floor((g + a + 15) / 16) - Math.floor(g / 16);
            for (f = 0; f < b; f++) switch (d = (f + k) * this.lineWidth, m) {
                case 1:
                    c = K.vw[g & 15] & K.Gx[(g + a - 1 & 15) + 1];
                    if (0 != (this.T[d + e] & c)) return !0;
                    break;
                case 2:
                    c = K.vw[g & 15];
                    if (0 != (this.T[d + e] & c)) return !0;
                    c = K.Gx[(g + a - 1 & 15) + 1];
                    if (0 != (this.T[d + e + 1] & c)) return !0;
                    break;
                default:
                    c = K.vw[g & 15];
                    if (0 != (this.T[d + e] & c)) return !0;
                    for (h = 1; h < m - 1; h++)
                        if (0 != this.T[d + e + h]) return !0;
                    c = K.Gx[(g + a - 1 & 15) + 1];
                    if (0 != (this.T[d + e + h] & c)) return !0
            }
            return !1
        },
        RE: function (a, b, c, d, e) {
            a = Math.floor(a);
            b = Math.floor(b);
            var f =
                a,
                g = b;
            if (0 == c) {
                if (1 != d || 1 != e) f = Math.floor(f / d), g = Math.floor(g / e)
            } else if (f = 3.141592653589 * c / 180, c = Math.cos(f), g = Math.sin(f), f = a * c - b * g, g = b * c + a * g, 1 != d || 1 != e) f /= d, g /= e;
            f += this.Ja;
            g += this.Ga;
            a = Math.floor(f);
            b = Math.floor(g);
            return 0 > a || a >= this.width || 0 > b || b >= this.height ? !1 : 0 != (this.T[b * this.lineWidth + Math.floor(a / 16)] & 32768 >>> (a & 15)) ? !0 : !1
        }
    };
    u.Kg = 1;
    u.XI = 2;
    u.Uu = 4;
    u.Bk = 16;
    u.Uh = 32;
    u.Ak = 64;
    u.Zi = 128;
    u.lS = 0;
    u.kS = 1;
    u.TO = 0;
    u.Of = 1;
    u.WO = 2;
    u.LF = 3;
    u.PO = 4;
    u.ZO = 5;
    u.SO = 6;
    u.UO = 7;
    u.QO = 8;
    u.KF = 9;
    u.YO = 10;
    u.$O = 11;
    u.RO = 12;
    u.VO = 13;
    u.XO = 13;
    u.yy = 4095;
    u.$t = 4096;
    u.zy = 8192;
    u.prototype = {
        FL: function (a, b, c) {
            this.a = a;
            this.Rl = c.oA;
            this.xt = c.rA;
            this.P = 0;
            this.P |= u.Ak;
            0 == (this.a.tf & S.ee) && (this.P &= ~u.Ak);
            0 != (this.a.Db.rl & A.Zn) && (this.P |= u.Zi);
            0 != (c.pr & k.Yl) ? (this.P |= u.Kg, this.a.Aa == z.Th && (this.a.Y |= M.Kh, this.P &= ~u.Ak)) : this.P |= u.Uh;
            this.ec = this.a.Db.pD;
            this.fc = this.a.Db.oD;
            this.a.b.wc == U.AI && (this.P |= u.XI)
        },
        Xr: function (a) {
            this.EA(a);
            a && this.a.R.Wm && (this.a.Y |= M.Si)
        },
        handle: function () {
            var a = this.a.c,
                b, c, d, e;
            0 != (this.a.Y & M.Si) ? (this.wh ||
                this.um(!1), this.VM()) : 0 != (this.a.Y & M.Ti) ? this.WM() : 0 == (this.P & u.Uu) ? (0 != this.tt && (this.ut -= a.Ip, 0 > this.ut && (this.ut = this.tt, 0 == (this.P & u.Uh) ? (this.P |= u.Uh, this.Yw()) : (this.P &= ~u.Uh, this.jp()))), null != this.a.A && this.a.A.move(), 0 == this.a.b.Ei && (0 != (this.a.sa & A.zk) ? 0 == (this.a.sa & A.Ez) && 0 != (a.h.La & p.DF) && (b = this.a.w - this.a.na, c = this.a.u - this.a.oa, d = b + this.a.K, e = c + this.a.M, (d < a.on || b > a.mn || e < a.sn || c > a.qn) && a.$f(this.a.Tb)) : (b = this.a.w - this.a.na, c = this.a.u - this.a.oa, d = b + this.a.K, e = c + this.a.M, d >= a.nn &&
                b <= a.ln && e >= a.rn && c <= a.pn || (d >= a.on && b <= a.mn && e >= a.sn && c <= a.qn ? (this.P |= u.Uu, this.xt = this.a.$h()) : 0 == (this.a.sa & A.Ez) && a.$f(this.a.Tb))))) : (b = this.a.w - this.a.na, c = this.a.u - this.a.oa, d = b + this.a.K, e = c + this.a.M, d >= a.nn && b <= a.ln && e >= a.rn && c <= a.pn && (this.P &= ~u.Uu, this.Xr(!1), this.a.ce(this.xt)))
        },
        EA: function () {
            0 != (this.a.sa & A.Xi) ? this.a.cv(this.a.w - this.a.c.ca, this.a.u - this.a.c.fa, this.a.b.Qa, this.Rl, 0 == (this.P & u.Kg)) : (this.a.Y |= M.UH, this.a.pm(this.a.w - this.a.c.ca, this.a.u - this.a.c.fa, this.Rl, 0 != (this.a.sa &
                A.Qu), 0 == (this.P & u.Kg), -1));
            this.a.vE(this.ec, this.fc)
        },
        um: function (a) {
            this.a.Y &= ~(M.Si | M.Ti);
            if (0 == a) {
                if (!this.a.R.Wm) return !1;
                this.a.Y |= M.Si
            } else {
                if (!this.a.R.lp) return !1;
                this.a.Y |= M.Ti
            }
            this.wh = this.a.c.h.cw().cO(this.a, a);
            return this.wh ? !0 : (this.a.Y &= ~(M.Si | M.Ti), !1)
        },
        VM: function () {
            if (0 != (this.a.Y & M.Si)) {
                if (this.wh.Yr()) return this.a.Y &= ~M.Si, this.wh = this.a.Wl = null, !1;
                this.wh.Zb(t.Xu);
                return !0
            }
            return !1
        },
        WM: function () {
            if (0 != (this.a.Y & M.Ti)) {
                if (this.wh.Yr()) return this.Wl = this.wh = null, this.a.c.$f(this.a.Tb),
                    !1;
                this.wh.Zb(t.dr);
                return !0
            }
            return !1
        },
        GL: function () {
            return this.um(!0) ? (this.a.Y |= M.Kh, !0) : !1
        },
        Jb: function () {
            this.xt = this.a.$h()
        },
        jp: function () {
            0 == (this.P & u.Kg) && (this.P |= u.Kg, this.a.b.N = !0, this.a.qj())
        },
        Yw: function () {
            0 != (this.P & u.Kg) && (this.a.c.B.Za[this.a.od].La & (X.On | X.Pn)) == X.Pn && (this.P &= ~u.Kg, this.a.Y &= ~M.Kh, this.a.b.N = !0, this.a.$j())
        },
        zt: function (a) {
            this.P = a ? this.P | u.Ak : this.P & ~u.Ak
        },
        zM: function (a, b) {
            this.ec = a;
            this.fc = b
        }
    };
    Je.prototype = {
        load: function (a) {
            this.Sm = a.l();
            this.fb = Array(this.Sm);
            var b;
            for (b = 0; b < this.Sm; b++) this.fb[b] = a.Nb()
        }
    };
    Ke.prototype = {
        load: function (a, b) {
            this.Tm = a.l();
            this.values = Array(this.Tm);
            var c;
            for (c = 0; c < this.Tm; c++) this.values[c] = a.v();
            b && (this.Oa = a.v())
        }
    };
    Oa.GJ = 26;
    Oa.bJ = 10;
    Oa.prototype = {
        aa: function (a, b) {
            this.Op = 0;
            var c = Oa.GJ;
            null != b.ri && b.ri.Tm > c && (c = b.ri.Tm);
            this.Ta = Array(c);
            c = Oa.bJ;
            null != b.Cj && b.Cj.Sm > c && (c = b.Cj.Sm);
            this.be = Array(c);
            for (c = 0; c < this.Ta.length; c++) this.Ta[c] = 0;
            for (c = 0; c < this.be.length; c++) this.be[c] = "";
            if (null != b.ri)
                for (this.Op = b.ri.Oa, c = 0; c < b.ri.Tm; c++) this.Ta[c] =
                    b.ri.values[c];
            if (null != b.Cj)
                for (c = 0; c < b.Cj.Sm; c++) this.be[c] = b.Cj.fb[c]
        },
        Jb: function () {
            var a;
            for (a = 0; a < this.Ta.length; a++) this.Ta[a] = 0;
            for (a = 0; a < this.be.length; a++) this.be[a] = null
        },
        Em: function (a) {
            return a < this.Ta.length ? this.Ta[a] : 0
        },
        KB: function (a) {
            return a < this.be.length ? this.be[a] : ""
        },
        Ft: function (a, b) {
            a >= this.S.Ta.length && this.pj(a + 10);
            this.Ta[a] = b
        },
        pj: function (a) {
            if (a > this.Ta.length) {
                var b;
                for (b = this.Ta.length; b < a; b++) this.Ta[b] = 0
            }
        },
        wL: function (a) {
            if (a > this.be.length) {
                var b;
                for (b = this.be.length; b <
                    a; b++) this.be[b] = ""
            }
        }
    };
    Ta.Gg = 32;
    Ta.prototype = {
        tK: function () {
            this.Wk = Array(5);
            this.Ds = Array(5);
            var a;
            for (a = 0; 5 > a; a++) this.Wk[a] = null, this.Ds[a] = 0;
            a = new ob;
            a.handle = 1;
            this.Rz(a);
            a = new ob;
            a.handle = 2;
            this.Rz(a)
        },
        Rz: function (a) {
            var b = a.gs();
            null != b && (this.Wk[a.handle] = a, this.Ds[a.handle] = b.Ho())
        },
        gs: function (a) {
            a -= Ta.Gg;
            var b = null;
            a < this.Wk.length && null != this.Wk[a] && (b = this.Wk[a].gs());
            return b
        },
        Ho: function (a) {
            a -= Ta.Gg;
            return a < this.Wk.length ? this.Ds[a] : 0
        }
    };
    ob.prototype = {
        gs: function () {
            switch (this.handle) {
                case 1:
                    return new Pa;
                case 2:
                    return new n
            }
            return null
        }
    };
    ta.Su = 1;
    ta.Iz = 2;
    ta.prototype = {
        aa: function (a) {
            this.G = a;
            this.O = a.c
        },
        Ho: function () {
            return 0
        },
        Ev: function () {
            return !1
        },
        Or: function () {
            return ta.Iz
        },
        YA: function () {},
        Hv: function () {},
        CA: function () {},
        TM: function () {},
        pK: function () {},
        oo: function () {
            return !1
        },
        action: function () {},
        yo: function () {
            return null
        },
        JB: function () {
            return null
        },
        yE: function () {},
        ej: function () {},
        Am: function () {}
    };
    Le.prototype = {
        evaluate: function (a) {
            var b = a.i.fg(this.rb);
            if (null == b) a.ma[a.ba] = 0;
            else {
                var c = (this.code >>
                    16) - J.Oe;
                a.Fv = this;
                a.ma[a.ba] = b.yo(c)
            }
        }
    };
    Me.prototype = {
        ga: function (a) {
            var b = a.i.Ya(this);
            if (null != b) {
                var c = (this.ha >>> 16) - J.Oe;
                a.Fv = this;
                b.action(c, this)
            }
        },
        aw: function (a, b) {
            return a.i.vL(this.j[b].rb, this)
        },
        GB: function (a, b) {
            var c = new Fa;
            this.j[b].Bl(a, 0, c) && (c.tB = !0);
            return c
        },
        Td: function (a, b) {
            return a.wa(this.j[b])
        },
        Bd: function (a, b) {
            return a.bl(this.j[b])
        },
        HB: function (a, b) {
            return 2 == this.j[b].code ? this.j[b].Ec : a.wa(this.j[b])
        }
    };
    Ne.prototype = {
        za: function (a, b) {
            if (null == b) return this.V(a);
            b.Y |= M.su;
            var c = -(this.ha >> 16) - J.Oe - 1;
            a.Fv = this;
            return b.oo(c, this) ? (a.i.Vk(b), !0) : !1
        },
        V: function (a) {
            var b = a.i.ag(this.gb),
                c = a.i.Wc,
                d = -(this.ha >> 16) - J.Oe - 1;
            for (a.Fv = this; null != b;) b.Y &= ~M.su, b.oo(d, this) ? 0 != (this.Pd & W.rk) && (c--, a.i.md()) : 0 == (this.Pd & W.rk) && (c--, a.i.md()), b = a.i.Te();
            return 0 != c ? !0 : !1
        },
        aw: function (a, b) {
            return this.j[b]
        },
        HB: function (a, b) {
            return 2 == this.j[b].code ? this.j[b].Ec : a.wa(this.j[b])
        },
        GB: function (a, b) {
            var c = new Fa;
            this.j[b].Bl(a, 0, c) && (c.tB = !0);
            return c
        },
        Td: function (a, b) {
            return a.wa(this.j[b])
        },
        Bd: function (a, b) {
            return a.bl(this.j[b])
        },
        no: function (a, b, c) {
            a = this.j[b];
            return k.Zh(c, a.Ec, a.Qe)
        }
    };
    (function () {
        this.element = null;
        this.uA = !1
    }).prototype = m.extend(new ta, {
        Am: function () {
            this.setPosition(this.G.w, this.G.u)
        },
        ej: function () {
            this.setPosition(this.G.w, this.G.u);
            this.Xp(this.G.K, this.G.M)
        },
        LU: function (a, b) {
            this.element = a;
            a.style.position = "absolute";
            this.Xp(this.G.K, this.G.M);
            this.setPosition(this.G.w, this.G.u);
            this.Tv && this.Sl(this.Tv);
            this.kv = this.G.ua = b;
            this.O.h.Yg ? (a.style.visibility = "hidden",
                this.kv = !1) : a.style.visibility = b ? "visible" : "hidden";
            this.O.h.zv.appendChild(a)
        },
        MB: function () {
            return this.O.h.canvas ? this.O.h.canvas.offsetLeft : 0
        },
        NB: function () {
            return this.O.h.canvas ? this.O.h.canvas.offsetTop : 0
        },
        Gt: function (a) {
            this.KA = a;
            this.G.Gt(a);
            this.element && (this.element.style.left = this.MB() + this.O.h.fk + (this.G.w - this.G.c.ca) * this.O.h.xc + "px")
        },
        Ht: function (a) {
            this.LA = a;
            this.G.Ht(a);
            this.element && (this.element.style.top = this.NB() + this.O.h.hk + (this.G.u - this.G.c.fa) * this.O.h.yc + "px")
        },
        setPosition: function (a,
            b) {
            this.KA = a;
            this.LA = b;
            this.G.setPosition(a, b);
            this.element && (this.element.style.left = this.MB() + this.O.h.fk + (this.G.w - this.G.c.ca) * this.O.h.xc + "px", this.element.style.top = this.NB() + this.O.h.hk + (this.G.u - this.G.c.fa) * this.O.h.yc + "px")
        },
        Yp: function (a) {
            this.JA = a;
            this.G.Yp(a);
            this.element && (this.element.style.width = this.G.K * this.O.h.xc + "px")
        },
        Vp: function (a) {
            this.IA = a;
            this.G.Vp(a);
            this.element && !this.uA && (this.element.style.height = this.G.M * this.O.h.yc + "px")
        },
        Xp: function (a, b) {
            this.JA = a;
            this.IA = b;
            this.G.Xp(a,
                b);
            this.element && (this.element.style.width = this.G.K * this.O.h.xc + "px", this.uA || (this.element.style.height = this.G.M * this.O.h.yc + "px"))
        },
        Sl: function (a) {
            this.Tv = a;
            this.element && (this.element.style.font = a.cg())
        },
        Hv: function () {
            this.element && this.O.h.zv.removeChild(this.element)
        },
        JB: function () {
            return this.Tv
        },
        yE: function (a) {
            this.Sl(a)
        },
        Or: function () {
            this.O.h.Yg || this.G.ua == this.kv || (this.kv = this.G.ua, this.element && (this.element.style.visibility = this.G.ua ? "visible" : "hidden"));
            this.G.w == this.KA && this.G.u ==
                this.LA || this.setPosition(this.G.w, this.G.u);
            this.G.K == this.JA && this.G.M == this.IA || this.Xp(this.G.K, this.G.M);
            return 0
        }
    });
    U.AI = 0;
    U.Lu = 1;
    U.zI = 2;
    U.jR = 3;
    U.iR = 4;
    U.BI = 5;
    U.Mu = 9;
    U.yI = 11;
    U.hR = 12;
    U.uz = 13;
    U.Sh = 14;
    U.prototype = {
        setData: function (a, b, c, d, e) {
            this.ap = a;
            this.ml = b;
            this.cD = c;
            this.bD = d;
            this.ys = e
        }
    };
    Oe.prototype = {
        load: function (a) {
            var b = a.U;
            this.ol = a.v();
            this.qd = Array(this.ol);
            var c;
            for (c = 0; c < this.ol; c++) {
                a.seek(b + 4 + 16 * c);
                var d = a.v(),
                    e = a.v(),
                    f = a.v(),
                    g = a.v();
                a.seek(b + f);
                var f = a.l(),
                    h = a.l(),
                    k = a.nb(),
                    m = a.nb();
                a.qa(2);
                var n = a.v();
                switch (h) {
                    case 0:
                        this.qd[c] = new We;
                        break;
                    case 1:
                        this.qd[c] = new Re;
                        break;
                    case 2:
                        this.qd[c] = new Ve;
                        break;
                    case 3:
                        this.qd[c] = new Qe;
                        break;
                    case 4:
                        this.qd[c] = new Pe;
                        break;
                    case 5:
                        this.qd[c] = new Se;
                        break;
                    case 9:
                        this.qd[c] = new Ue;
                        break;
                    case 14:
                        this.qd[c] = new Xe
                }
                this.qd[c].setData(h, f, k, n, m);
                this.qd[c].load(a, g - 12);
                14 == h && (a.seek(b + d), d = a.Nb(), d = d.substring(0, d.length - 4), d = d.toLowerCase(), this.qd[c].RN(d, e))
            }
        }
    };
    Pe.prototype = m.extend(new U, {
        load: function (a) {
            this.Xo = a.l();
            this.sC = a.l();
            this.rC =
                a.l();
            this.uC = a.l();
            this.tC = a.l()
        }
    });
    Qe.prototype = m.extend(new U, {
        load: function (a) {
            this.BC = a.l();
            this.yC = a.l();
            this.zC = a.l();
            a.l();
            this.AC = a.v()
        }
    });
    Re.prototype = m.extend(new U, {
        load: function (a) {
            this.CC = a.$();
            this.EC = a.$();
            this.DC = a.$();
            this.FC = a.$();
            a.l()
        }
    });
    Se.prototype = m.extend(new U, {
        load: function (a) {
            this.Pm = a.l();
            this.XC = a.l();
            this.WC = a.l();
            this.Vw = a.nb();
            this.ZC = a.nb();
            this.aD = a.nb();
            a.qa(1);
            this.ib = Array(this.Pm);
            var b, c, d;
            for (b = 0; b < this.Pm; b++) d = a.U, this.ib[b] = new Te, a.xa(), c = a.xa(), this.ib[b].load(a),
                a.seek(d + c)
        }
    });
    Te.prototype = {
        load: function (a) {
            this.xC = a.nb();
            this.Nw = a.nb();
            this.Ow = a.$();
            this.Pw = a.$();
            this.Mw = a.$();
            this.Rw = a.$();
            this.wC = a.l();
            this.Qw = a.l();
            a = a.Nb();
            0 < a.length && (this.De = a)
        }
    };
    Ue.prototype = m.extend(new U, {
        load: function (a) {
            this.QC = a.l();
            this.LC = a.l();
            this.MC = a.l();
            this.PC = a.l();
            this.NC = a.l();
            this.OC = a.l()
        }
    });
    Ve.prototype = m.extend(new U, {
        load: function (a) {
            this.UC = a.l();
            this.Tw = a.l();
            this.Uw = a.l();
            this.TC = a.l();
            a.l();
            this.RC = a.l();
            this.SC = a.l()
        }
    });
    We.prototype = m.extend(new U, {
        load: function () {}
    });
    Xe.prototype = m.extend(new U, {
        load: function (a) {
            a.qa(14);
            this.data = a.U
        },
        RN: function (a) {
            this.eh = a;
            if (m.Gc(this.eh, "box2d8directions") || m.Gc(this.eh, "box2dspring") || m.Gc(this.eh, "box2dspaceship") || m.Gc(this.eh, "box2dstatic") || m.Gc(this.eh, "box2dracecar") || m.Gc(this.eh, "box2daxial") || m.Gc(this.eh, "box2dplatform") || m.Gc(this.eh, "box2dbouncingball") || m.Gc(this.eh, "box2dbackground")) this.Zr = !0
        }
    });
    O.mk = [256, 251, 236, 212, 181, 142, 97, 49, 0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49,
        0, 49, 97, 142, 181, 212, 236, 251
    ];
    O.Ck = [0, -49, -97, -142, -181, -212, -236, -251, -256, -251, -236, -212, -181, -142, -97, -49, 0, 49, 97, 142, 181, 212, 236, 251, 256, 251, 236, 212, 181, 142, 97, 49];
    O.NJ = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 320, 336, 352, 368, 384, 400, 416, 432, 448, 480, 512, 544, 560, 592, 624, 640, 672, 688, 720, 736, 768, 784, 816, 848, 864, 896, 928, 944, 976, 992, 1024, 1120, 1216, 1312, 1440, 1536, 1632, 1728, 1824, 1952, 2048, 2240, 2432, 2688, 2880, 3072, 3264, 3456, 3712, 3904, 4096, 6544,
        4914, 5216, 5732, 6144, 6553, 6962, 7366, 7780, 8192, 9836, 11672, 13316, 14960, 16604, 18248, 19892, 21504, 25600, 25600
    ];
    O.iI = [-1, 8, 24, -1, 16, 12, 20, 16, 0, 4, 28, 0, -1, 8, 24, -1];
    O.Zl = [2599, 0, 844, 31, 479, 30, 312, 29, 210, 28, 137, 27, 78, 26, 25, 25, 0, 24];
    O.yf = [0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, -4, 0, -8, 0, 0, 0, -2, -2, 2, 2, -4, -4, 4, 4, -8, -8, 8, 8, -4, 4, -8, 8, 0, 0, -2, 0, 2, 0, -4, 0, 4, 0, -8, 0, 8, 0, 0, 4, 0, 8, 0, 0, -2, 2, 2, -2, -4, 4, 4, -4, -8, 8, 8, -8, 4, 4, 8, 8, 0, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8, 4, 0, 8, 0, 0, 0, 2, 2, -2, -2, 4, 4, -4, -4, 8, 8, -8, -8, 4, -4, 8, -8, 0, 0, 2, 0, -2, 0, 4, 0, -4, 0, 8, 0, -8,
        0, 0, -4, 0, -8, 0, 0, 2, -2, -2, 2, 4, -4, -4, 4, 8, -8, -8, 8, -4, -4, -8, -8, 0, 0
    ];
    O.Wn = 1;
    O.hL = function (a, b) {
        return a * O.mk[b] / 256
    };
    O.iL = function (a, b) {
        return a * O.Ck[b] / 256
    };
    O.prototype = {
        yj: function (a, b) {
            this.a.c.He++;
            this.wg = this.a.c.He;
            this.a.A.W = !1;
            if (0 == a) return this.a.c.pg(this.a), !1;
            var c, d, e;
            for (e = 0 != (this.a.c.B.cc & E.bd) ? Math.floor(a * this.a.c.Oc * 32) : a << 5; 2048 < e;) {
                c = 65536 * this.a.w + (this.a.Tg & 65535);
                d = 65536 * this.a.u + (this.a.Ug & 65535);
                c += 2048 * O.mk[b];
                d += 2048 * O.Ck[b];
                this.a.Tg = c & 65535;
                this.a.w = Math.floor(c / 65536);
                this.a.Ug =
                    d & 65535;
                this.a.u = Math.floor(d / 65536);
                if (this.a.c.pg(this.a)) return !0;
                if (this.a.A.W) break;
                e -= 2048
            }
            if (!this.a.A.W && (c = 65536 * this.a.w + (this.a.Tg & 65535), d = 65536 * this.a.u + (this.a.Ug & 65535), c += O.mk[b] * e, d += O.Ck[b] * e, this.a.Tg = c & 65535, this.a.w = Math.floor(c / 65536), this.a.Ug = d & 65535, this.a.u = Math.floor(d / 65536), this.a.c.pg(this.a))) return !0;
            this.a.b.N = !0;
            this.a.A.W || (this.a.c.Pl = 0);
            return this.a.A.W
        },
        $o: function (a) {
            0 == a.cD && this.stop()
        },
        Xk: function (a) {
            return 100 >= a ? O.NJ[a] : a << 8
        },
        bp: function (a) {
            if (a) this.vC(!1);
            else switch (this.a.c.i.st & 4294901760) {
                case -786432:
                    a = this.a.w - this.a.na;
                    var b = this.a.u - this.a.oa,
                        c = this.a.c.yl(a, b, a + this.a.K, b + this.a.M);
                    a = this.a.w;
                    b = this.a.u;
                    0 != (c & k.Hh) && (a = this.a.na);
                    0 != (c & k.Ih) && (a = this.a.c.$d - this.a.K + this.a.na);
                    0 != (c & k.Jh) && (b = this.a.oa);
                    0 != (c & k.Gh) && (b = this.a.c.ae - this.a.M + this.a.oa);
                    this.a.w = a;
                    this.a.u = b;
                    break;
                case -851968:
                case -917504:
                    a = 18 * (this.a.c.Ib(this.a) >> 2);
                    do {
                        if (this.Ch(this.a.w + O.yf[a], this.a.u + O.yf[a + 1], !1)) {
                            this.a.w += O.yf[a];
                            this.a.u += O.yf[a + 1];
                            return
                        }
                        a += 2
                    } while (0 !=
                        O.yf[a] || 0 != O.yf[a + 1]);
                    this.a.w = this.a.b.Nj;
                    this.a.u = this.a.b.Oj;
                    this.a.b.Qa = this.a.b.at;
                    this.a.b.cb = this.a.b.$s
            }
        },
        vC: function (a) {
            switch (this.a.c.i.st & 4294901760) {
                case -786432:
                    a = this.a.w - this.a.na;
                    var b = this.a.u - this.a.oa,
                        c = this.a.c.yl(a, b, a + this.a.K, b + this.a.M);
                    a = this.a.w;
                    b = this.a.u;
                    0 != (c & k.Hh) && (a = this.a.na);
                    0 != (c & k.Ih) && (a = this.a.c.$d - this.a.K + this.a.na);
                    0 != (c & k.Jh) && (b = this.a.oa);
                    0 != (c & k.Gh) && (b = this.a.c.ae - this.a.M + this.a.oa);
                    this.a.w = a;
                    this.a.u = b;
                    break;
                case -851968:
                case -917504:
                    if (b = new G, this.yM(this.a.w,
                            this.a.u, this.a.b.Nj, this.a.b.Oj, a, b)) this.a.w = b.x, this.a.u = b.y;
                    else {
                        b = 18 * (this.a.c.Ib(this.a) >> 2);
                        do {
                            if (this.Ch(this.a.w + O.yf[b], this.a.u + O.yf[b + 1], a)) {
                                this.a.w += O.yf[b];
                                this.a.u += O.yf[b + 1];
                                return
                            }
                            b += 2
                        } while (0 != O.yf[b] || 0 != O.yf[b + 1]);
                        0 == a && (this.a.w = this.a.b.Nj, this.a.u = this.a.b.Oj, this.a.b.Qa = this.a.b.at, this.a.b.cb = this.a.b.$s)
                    }
            }
        },
        Cn: function (a, b, c, d, e) {
            var f;
            f = -1;
            e && (f = this.a.uf);
            e = this.a.Db;
            if (0 != (e.Xd & 15)) {
                var g = a - this.a.na,
                    h = b - this.a.oa;
                if (0 != (this.a.c.yl(g, h, g + this.a.K, h + this.a.M) & e.Xd)) return !1
            }
            if (0 !=
                (e.Xd & 16) && this.a.c.Jk(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, a, b, c, d)) return !1;
            if (-1 == e.Xm) return !0;
            a = this.a.c.Um(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, a, b, e.Fj);
            if (null == a) return !0;
            b = this.a.c.i.el;
            for (c = 0; c < a.size(); c++)
                if (d = a.get(c).uf, d != f)
                    for (g = e.Xm; 0 <= b[g]; g++)
                        if (b[g] == d) return !1;
            return !0
        },
        Ch: function (a, b, c) {
            var d;
            d = -1;
            c && (d = this.a.uf);
            c = this.a.Db;
            if (0 != (c.Xd & 15)) {
                var e = a - this.a.na,
                    f = b - this.a.oa;
                if (0 != (this.a.c.yl(e, f, e + this.a.K, f + this.a.M) & c.Xd)) return !1
            }
            if (0 !=
                (c.Xd & 16) && this.a.c.Jk(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, a, b, 0, E.ue)) return !1;
            if (-1 == c.Xm) return !0;
            a = this.a.c.Um(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, a, b, c.Fj);
            if (null == a) return !0;
            b = this.a.c.i.el;
            for (e = 0; e < a.size(); e++)
                if (f = a.get(e).uf, f != d) {
                    var g;
                    for (g = c.Xm; 0 <= b[g]; g++)
                        if (b[g] == f) return !1
                } return !0
        },
        Nm: function (a, b, c, d, e, f, g) {
            var h = m.Rd((a + c) / 2),
                k = m.Rd((b + d) / 2),
                n, p;
            do
                if (this.Cn(h + this.a.c.ca, k + this.a.c.fa, e, f, !1)) {
                    if (c = h, d = k, n = h, p = k, h = m.Rd((c + a) / 2), k = m.Rd((d +
                            b) / 2), h == n && k == p) return c == a && d == b || !this.Cn(a + this.a.c.ca, b + this.a.c.fa, e, f, !1) || (h = a, k = b), g.x = h, g.y = k, !0
                } else if (a = h, b = k, n = h, p = k, h = m.Rd((c + a) / 2), k = m.Rd((d + b) / 2), h == n && k == p) {
                if ((c != a || d != b) && this.Cn(c + this.a.c.ca, d + this.a.c.fa, e, f, !1)) return g.x = c, g.y = d, !0;
                g.x = h;
                g.y = k;
                return !1
            } while (1)
        },
        yM: function (a, b, c, d, e, f) {
            var g = m.Rd((a + c) / 2),
                h = m.Rd((b + d) / 2),
                k, n;
            do
                if (this.Ch(g, h, e)) {
                    if (c = g, d = h, k = g, n = h, g = m.Rd((c + a) / 2), h = m.Rd((d + b) / 2), g == k && h == n) return c == a && d == b || !this.Ch(a, b, e) || (g = a, h = b), f.x = g, f.y = h, !0
                } else if (a =
                g, b = h, k = g, n = h, g = m.Rd((c + a) / 2), h = m.Rd((d + b) / 2), g == k && h == n) {
                if ((c != a || d != b) && this.Ch(c, d, e)) return f.x = c, f.y = d, !0;
                f.x = g;
                f.y = h;
                return !1
            } while (1)
        },
        Dt: function (a) {
            this.a.b.wc == U.zI && (250 < a && (a = 250), 0 > a && (a = 0), this.Dt(a));
            this.a.b.wc == U.Sh && this.Gd.Dt(a)
        },
        Bt: function (a) {
            this.a.b.wc == U.Mu && (250 < a && (a = 250), 0 > a && (a = 0), this.Bt(a));
            this.a.b.wc == U.Sh && this.Gd.Bt(a)
        },
        bw: function () {
            return this.a.b.wc == U.Sh ? this.Gd.bw() : this.a.b.ea
        },
        Ib: function () {
            return this.a.b.wc == U.Sh && this.Gd.Ib ? this.Gd.Ib() : this.a.b.Pa
        },
        Jb: function () {},
        start: function () {}
    };
    va.tN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 31, 0, 1, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 24, 25, 26, 27, 27, 28, 28, 28, 28, 29, 29, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 21, 22, 23, 24, 25, 28, 27, 26, 25, 0, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 20, 21, 22, 22, 23, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 8, 7, 6, 5, 4, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16, 17, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 16, 15, 14, 13, 12, 11, 10, 9, 8, 12, 13, 14, 15, 15, 16, 16, 16, 16, 17, 17, 18, 19, 20, 21, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 3, 3, 4, 4, 4, 4, 5, 5, 6, 7, 8, 9, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 0, 1, 2, 0, 0, 1, 1, 2, 3, 4, 5, 8, 7, 6, 5, 4, 3, 2, 1, 0, 31, 30, 29, 28, 27, 26, 25, 24, 28, 29, 30, 31, 31, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29,
        28, 27, 26, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 31, 30, 29, 28, 27, 25, 25, 24, 25, 26, 27, 28, 29, 30, 31, 0, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9, 9, 10, 11, 12, 13, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ];
    va.CI = [4294967292, 4294967294, 4294967295];
    va.VI = [-4, 4, -2, 2, -1, 1];
    va.WI = [-4, 4, -4, 4, -4, 4];
    va.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.a.Tg = 0;
            this.a.Ug = 0;
            this.a.b.ea = b.Xo;
            this.a.b.mb = b.Xo;
            this.a.b.Di = b.Xo;
            this.dm = b.Xo << 8;
            var c = b.tC;
            0 != c && (c = this.Xk(c), this.a.b.Di = 0);
            this.Je = c;
            this.nz = b.sC;
            this.Cq = b.rC;
            this.Dq = va.CI[this.Cq];
            this.Vi = !1;
            this.xu = -1;
            this.cm = this.Eq = (100 - b.uC) / 8;
            this.$o(b);
            this.a.b.N = !0
        },
        move: function () {
            this.a.A.Wj = !1;
            this.a.c.Pl = 1;
            this.a.b.Ge = B.Sc;
            null != this.a.Z && this.a.Z.lf();
            if (0 != this.Je) {
                var a = this.dm;
                if (0 < a) {
                    var b = this.Je;
                    0 != (this.a.c.B.cc & E.bd) && (b *= this.a.c.Oc);
                    a -= b;
                    0 > a && (a = 0);
                    this.dm = a;
                    this.a.b.ea = a >> 8
                }
            }
            this.yj(this.a.b.ea, this.a.c.Ib(this.a))
        },
        stop: function () {
            0 == this.Yb && (this.Yb = this.a.b.ea | 32768, this.dm = this.a.b.ea = 0, this.a.A.W = !0)
        },
        start: function () {
            var a = this.Yb;
            0 != a && (a &= 32767, this.a.b.ea = a, this.dm = a << 8, this.Yb = 0, this.a.A.W = !0)
        },
        Ng: function () {
            if (0 == this.Yb && this.a.c.Xb != this.xu) {
                this.xu = this.a.c.Xb;
                this.wg == this.a.c.He && this.vC(this.Vi);
                var a = this.a.w,
                    b = this.a.u,
                    c = 0,
                    a = a - 8,
                    b = b - 8;
                0 == this.Ch(a, b, this.Vi) && (c |= 1);
                a += 16;
                0 == this.Ch(a, b, this.Vi) && (c |= 2);
                b += 16;
                0 == this.Ch(a,
                    b, this.Vi) && (c |= 4);
                0 == this.Ch(a - 16, b, this.Vi) && (c |= 8);
                a = va.tN[32 * c + this.a.c.Ib(this.a)];
                a &= this.Dq;
                if (!this.cp(a)) {
                    var c = b = va.WI[2 * this.Cq + 1],
                        d = !1;
                    do {
                        a -= b;
                        a &= 31;
                        if (this.cp(a)) {
                            d = !0;
                            break
                        }
                        a += 2 * b;
                        a &= 31;
                        if (this.cp(a)) {
                            d = !0;
                            break
                        }
                        a -= b;
                        a &= 31;
                        b += c
                    } while (16 >= b);
                    if (0 == d) {
                        this.Vi = !0;
                        this.a.b.Pa = this.a.c.random(32) & this.Dq;
                        this.a.A.Wj = !0;
                        this.a.A.W = !0;
                        return
                    }
                }
                this.Vi = !1;
                this.a.b.Pa = a;
                a = this.a.c.random(100);
                if (a < this.nz && (a >>= 2, 25 > a && (a = a - 12 & 31 & this.Dq, this.cp(a)))) {
                    this.a.b.Pa = a;
                    this.a.A.Wj = !0;
                    this.a.A.W = !0;
                    return
                }
                a = this.a.c.Ib(this.a) & 7;
                12 != this.cm && (0 == a ? (this.cm--, 0 > this.cm && (a = this.a.c.Ib(this.a) + va.VI[this.a.c.random(2) + 2 * this.Cq], a &= 31, this.cp(a) && (this.a.b.Pa = a, this.cm = this.Eq))) : this.cm = this.Eq);
                this.a.A.Wj = !0;
                this.a.A.W = !0
            }
        },
        cp: function (a) {
            var b = 2048 * O.mk[a] + (65536 * this.a.w + (this.a.Tg & 65535));
            a = 2048 * O.Ck[a] + (65536 * this.a.u + (this.a.Ug & 65535));
            b = Math.floor(b / 65536);
            a = Math.floor(a / 65536);
            return this.Ch(b, a, !1)
        },
        Le: function () {},
        hf: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.ea = a;
            this.dm = a << 8;
            this.Yb = 0;
            this.a.A.W = !0
        },
        xh: function (a) {
            this.hf(a)
        },
        reverse: function () {
            0 == this.Yb && (this.a.A.W = !0, this.a.b.Pa += 16, this.a.b.Pa &= 31)
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        }
    });
    Ye.prototype = m.extend(new O, {
        aa: function (a) {
            this.a = a;
            this.o = a.c;
            this.o.ez();
            null != this.a.D && this.a.D.zt(!1);
            null != this.a.D && (this.a.D.P &= ~u.Uh, this.a.D.jp());
            this.Fq = !0;
            this.a.Tg = 0;
            this.a.Ug = 0;
            null !=
                this.a.Z && this.a.Z.VB(B.Sc);
            this.a.b.ea = 0;
            this.a.b.Wa = !0;
            this.a.b.N = !0
        },
        Xr: function (a) {
            this.a.b.mb = this.a.b.ea;
            this.a.b.Di = this.a.b.ea;
            this.em = a;
            null != a && (a.Y |= M.fz)
        },
        Jb: function () {
            this.dL(this.a)
        },
        move: function () {
            if (this.Fq) {
                if (null != this.em.Z && this.em.Z.Bi == B.mq) return;
                this.LE()
            }
            null != this.a.Z && this.a.Z.lf();
            this.yj(this.a.b.ea, this.a.c.Ib(this.a));
            if (-64 > this.a.w || this.a.w > this.a.c.$d + 64 || -64 > this.a.u || this.a.u > this.a.c.ae + 64) this.a.Lo = !1, this.a.c.$f(this.a.Tb);
            this.a.b.Wa && (this.a.b.Wa = !1, this.a.c.pg(this.a))
        },
        LE: function () {
            null != this.a.D && this.a.D.zt(!0);
            null != this.a.D && (this.a.D.P |= u.Uh, this.a.D.Yw());
            if (null != this.o.Hi) {
                var a = this.o.Rn(this.em);
                if (null != a) {
                    var b = this.o.Hi,
                        c = new fa;
                    this.yu = c;
                    c.cI(this.a, fa.xI);
                    c.vM = b.identifier;
                    this.Tn = b.zU(a.uM, this.a.b.ea / 250 * 50, c);
                    c.tM = this.Tn;
                    null == this.Tn && (this.yu = null)
                }
            }
            this.Fq = !1;
            this.em = null
        },
        dL: function () {
            null != this.Tn && (pBase = this.a.c.Hi, pBase.AU(this.Tn), this.Tn = null);
            null != this.yu && (this.yu = null)
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        Le: function () {},
        reverse: function () {},
        stop: function () {},
        start: function () {},
        Ng: function () {},
        hf: function () {},
        xh: function () {}
    });
    Ze.prototype = m.extend(new O, {
        aa: function (a) {
            this.a = a
        },
        move: function () {
            0 == (this.a.Y & M.Ti) && null != this.a.Z && (this.a.Z.lf(), this.a.Z.ph != B.ik + 1 && this.a.c.$f(this.a.Tb))
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u =
                a, this.a.A.W = !0, this.a.b.N = !0)
        },
        Le: function () {},
        reverse: function () {},
        stop: function () {},
        start: function () {},
        Ng: function () {},
        hf: function () {},
        xh: function () {}
    });
    $e.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.a.Tg = 0;
            this.Ig = this.a.Ug = 0;
            this.Lh = this.a.b.ea = 0;
            this.zu = -1;
            this.a.b.Ei = b.ml;
            this.Jp = b.yC;
            this.uh = this.Xk(this.Jp);
            this.Kp = b.zC;
            this.Je = this.Xk(this.Kp);
            this.a.b.mb = b.BC;
            this.a.b.Di = 0;
            this.Au = b.AC;
            this.Xj = b.ys;
            this.a.b.N = !0
        },
        move: function () {
            var a, b, c, d;
            this.a.c.Pl = 1;
            a = this.a.c.Ib(this.a);
            this.a.b.Ix = a;
            if (0 == this.Lh) {
                this.a.A.Wj = !1;
                b = 0;
                c = this.a.c.Pc[this.a.b.Ei - 1] & 15;
                0 != c && (d = O.iI[c], -1 != d && 0 != (1 << d & this.Au) && (b = 1, a = d));
                c = this.Ig;
                0 == b ? 0 != c && (b = this.Je, 0 != (this.a.c.B.cc & E.bd) && (b *= this.a.c.Oc), c -= b, 0 >= c && (c = 0)) : c >> 8 < this.a.b.mb && (b = this.uh, 0 != (this.a.c.B.cc & E.bd) && (b *= this.a.c.Oc), c += b, c >> 8 > this.a.b.mb && (c = this.a.b.mb << 8));
                this.Ig = c;
                this.a.b.ea = c >> 8;
                this.a.b.Pa = a;
                this.a.b.Ge = B.Sc;
                null != this.a.Z && this.a.Z.lf();
                if (0 == this.yj(this.a.b.ea, this.a.c.Ib(this.a))) return;
                if (0 == this.a.b.ea) {
                    c =
                        this.Ig;
                    if (0 == c || this.a.b.Ix == this.a.c.Ib(this.a)) return;
                    this.a.b.ea = c >> 8;
                    this.a.b.Pa = this.a.b.Ix;
                    if (0 == this.yj(this.a.b.ea, this.a.c.Ib(this.a))) return
                }
            }
            for (; 0 != this.Lh && 0 != this.a.c.Pl;)
                if (c = this.Ig, c -= this.Je, 0 < c) {
                    if (this.Ig = c, c >>= 8, this.a.b.ea = c, d = this.a.c.Ib(this.a), 0 != this.Lh && (d += 16, d &= 31), 0 == this.yj(c, d)) break
                } else {
                    this.Ig = 0;
                    this.Lh = this.a.b.ea = 0;
                    break
                }
        },
        Ng: function () {
            this.wg == this.a.c.He && this.bp(0 != (this.Xj & O.Wn));
            this.a.c.Xb != this.zu && (this.zu = this.a.c.Xb, this.Lh++, 12 <= this.Lh ? this.stop() :
                (this.a.A.Wj = !0, this.a.A.W = !0))
        },
        reverse: function () {},
        Le: function () {},
        stop: function () {
            this.Ig = this.Lh = this.a.b.ea = 0;
            this.a.A.W = !0;
            this.wg == this.a.c.He && (this.bp(0 != (this.Xj & O.Wn)), this.Lh = 0)
        },
        start: function () {
            this.a.A.W = !0;
            this.Yb = 0
        },
        xh: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.mb = a;
            this.a.b.ea > a && (this.a.b.ea = a, this.Ig = a << 8);
            this.a.A.W = !0
        },
        hf: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.mb && (a = this.a.b.mb);
            this.a.b.ea = a;
            this.Ig = a << 8;
            this.a.A.W = !0
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a,
                this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        KU: function (a) {
            this.Au = a
        }
    });
    af.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.a.b.Ei = b.ml;
            this.Bu = b.CC + this.a.w;
            this.Cu = b.DC + this.a.u;
            this.Du = b.EC + this.a.w;
            this.Eu = b.FC + this.a.u;
            this.Hq = this.Gq = this.a.b.ea = 0;
            this.a.b.Di = 0;
            this.a.b.mb = 100;
            this.Xj = b.ys;
            this.$o(b);
            this.a.b.N = !0;
            this.a.c.MM(this.a)
        },
        Jb: function () {
            this.a.c.UA(this.a)
        },
        move: function () {
            var a = this.a.w,
                b = this.a.u,
                c, d, e, f;
            if (0 == this.Yb && 0 != this.a.c.kn[this.a.b.Ei - 1] && (a = this.a.c.Sj, a < this.Bu && (a = this.Bu), a > this.Du && (a = this.Du), b = this.a.c.Tj, b < this.Cu && (b = this.Cu), b > this.Eu && (b = this.Eu), c = a - this.a.w, d = b - this.a.u, e = 0, 0 > c && (c = -c, e |= 1), 0 > d && (d = -d, e |= 2), f = c + d << 2, 250 < f && (f = 250), this.a.b.ea = f, 0 != f)) {
                0 == d && (d = 1);
                c = (c << 8) / d;
                for (d = 0; !(c >= O.Zl[d]); d += 2);
                c = O.Zl[d + 1];
                0 != (e & 2) && (c = -c + 32 & 31);
                0 != (e & 1) && (c = (-(c - 8 & 31) & 31) + 8 & 31);
                this.a.b.Pa = c
            }
            0 != this.a.b.ea && (this.Hq = 0, this.Gq = this.a.b.ea);
            this.Hq++;
            10 < this.Hq && (this.Gq =
                0);
            this.a.b.ea = this.Gq;
            null != this.a.Z && this.a.Z.lf();
            this.a.w = a;
            this.a.u = b;
            this.a.b.N = !0;
            this.a.c.He++;
            this.wg = this.a.c.He;
            this.a.c.pg(this.a)
        },
        stop: function () {
            this.wg == this.a.c.He && this.bp(0 != (this.Xj & O.Wn));
            this.a.b.ea = 0
        },
        start: function () {
            this.Yb = 0;
            this.a.A.W = !0
        },
        Ng: function () {
            this.stop()
        },
        reverse: function () {},
        Le: function () {},
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        }
    });
    bf.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.Mq = this.a.w;
            this.Nq = this.a.u;
            this.wd = !1;
            this.Ph = 0;
            this.a.Hm = 0;
            this.Na = b;
            this.a.b.Di = b.XC;
            this.a.b.mb = b.WC;
            this.Oh = 0;
            this.im = null;
            this.ll(0);
            this.$o(b);
            this.a.b.ea = this.Tc;
            this.a.b.N = !0;
            0 == this.Na.ib.length && this.stop()
        },
        move: function () {
            this.a.Hm = 0;
            this.a.b.Ge = B.Sc;
            null != this.a.Z && this.a.Z.lf();
            if (0 == this.Tc) {
                var a = this.Ph;
                if (0 == a) {
                    this.a.b.ea = 0;
                    this.a.c.pg(this.a);
                    return
                }
                a -= this.a.c.Ip;
                if (0 < a) {
                    this.Ph = a;
                    this.a.b.ea = 0;
                    this.a.c.pg(this.a);
                    return
                }
                this.Ph = 0;
                this.Tc = this.Yb & 32767;
                this.Yb = 0;
                this.a.b.ea = this.Tc
            }
            a = 0 != (this.a.c.B.cc & E.bd) ? 256 * this.a.c.Oc : 256;
            this.a.c.Ii = a;
            for (var b;;) {
                b = !1;
                this.a.c.Hp = a;
                a *= this.Tc;
                a <<= 5;
                524288 >= a ? this.a.c.Zx = a : (a = 16384, a /= this.Tc, this.a.c.Hp = a, this.a.c.Zx = 524288);
                for (;;) {
                    this.Kq = !1;
                    if (1 == this.YC(this.a.c.Zx) && 0 == this.Kq) {
                        b = !0;
                        break
                    }
                    if (this.a.c.Ii == this.a.c.Hp) {
                        b = !0;
                        break
                    }
                    if (this.a.c.Ii > this.a.c.Hp) {
                        this.a.c.Ii -= this.a.c.Hp;
                        a = this.a.c.Ii;
                        break
                    }
                    a = this.a.c.Ii * MT_Speed;
                    a <<= 5;
                    this.YC(a);
                    b = !0;
                    break
                }
                if (b) break
            }
        },
        YC: function (a) {
            a += this.Oh;
            var b = a >>> 16;
            if (b < this.Lq) return this.Oh = a, a = b * this.Vn / 16384 + this.Rh, this.a.w = b * this.Un / 16384 + this.Qh, this.a.u = a, this.a.b.N = !0, this.a.c.pg(this.a), this.a.A.W;
            b -= this.Lq;
            a = b << 16 | a & 65535;
            0 != this.Tc && (a /= this.Tc);
            this.a.c.Ii += a >> 5 & 65535;
            this.a.w = this.xk;
            this.a.u = this.yk;
            this.a.b.N = !0;
            this.a.c.pg(this.a);
            if (this.a.A.W) return !0;
            this.a.Hm = this.a.c.Xb;
            this.a.Gm = null;
            b = this.ve;
            this.Oh = 0;
            if (0 == this.wd) {
                b++;
                if (b < this.Na.Pm) {
                    this.a.Gm = this.Na.ib[b].De;
                    if (null != this.im && null != this.Na.ib[b].De &&
                        m.Gc(this.im, this.Na.ib[b].De)) return this.ve = b, this.xf(), this.xs();
                    this.ll(b);
                    this.xf();
                    return this.a.A.W
                }
                this.a.Mo = this.a.c.Xb;
                this.ve = b;
                if (this.wd) return this.xf(), this.a.A.W;
                if (0 != this.Na.aD) return this.wd = !0, b--, this.a.Gm = this.Na.ib[b].De, this.Om(b), this.xf(), this.a.A.W;
                this.$C();
                if (0 == this.Na.Vw) return this.xs(), this.xf(), this.a.A.W;
                b = 0
            } else {
                if (null != this.im && null != this.Na.ib[b].De && m.Gc(this.im, this.Na.ib[b].De)) return this.xf(), this.xs();
                this.a.Gm = this.Na.ib[b].De;
                this.Ph = this.Na.ib[b].Qw;
                b--;
                if (0 <= b) return this.Om(b), this.xf(), this.a.A.W;
                this.$C();
                if (0 == this.wd) return this.xf(), this.a.A.W;
                if (0 == this.Na.Vw) return this.xs(), this.xf(), this.a.A.W;
                b = 0;
                this.wd = !1
            }
            this.ll(b);
            this.xf();
            return this.a.A.W
        },
        ll: function (a) {
            a >= this.Na.ib.length ? this.stop() : (this.wd = !1, this.ve = a, this.Ph = this.Na.ib[a].Qw, this.Un = this.Na.ib[a].Mw, this.Vn = this.Na.ib[a].Rw, this.Qh = this.a.w, this.Rh = this.a.u, this.xk = this.a.w + this.Na.ib[a].Ow, this.yk = this.a.u + this.Na.ib[a].Pw, this.a.b.Pa = this.Na.ib[a].Nw, this.VC())
        },
        Om: function (a) {
            a >= this.Na.ib.length ? this.stop() : (this.wd = !0, this.ve = a, this.Un = -this.Na.ib[a].Mw, this.Vn = -this.Na.ib[a].Rw, this.Qh = this.a.w, this.Rh = this.a.u, this.xk = this.a.w - this.Na.ib[a].Ow, this.yk = this.a.u - this.Na.ib[a].Pw, this.a.b.Pa = this.Na.ib[a].Nw + 16 & 31, this.VC())
        },
        VC: function () {
            this.Lq = this.Na.ib[this.ve].wC;
            var a = this.Na.ib[this.ve].xC,
                b = this.Ph;
            0 != b && (this.Ph = 20 * b, this.Yb = a |= 32768);
            0 != this.Yb && (a = 0);
            if (a != this.Tc || 0 != a) this.Tc = a, this.Kq = this.a.A.W = !0;
            this.a.b.ea = this.Tc
        },
        xf: function () {
            this.a.Hm ==
                this.a.c.Xb && (this.a.c.i.Gb = 0, this.a.c.i.Cd(this.a, -1310720 | this.a.Aa & 65535), this.a.c.i.Cd(this.a, -2293760 | this.a.Aa & 65535));
            this.a.Mo == this.a.c.Xb && (this.a.c.i.Gb = 0, this.a.c.i.Cd(this.a, -1376256 | this.a.Aa & 65535))
        },
        xs: function () {
            this.Yb = this.Tc = 0;
            this.a.A.W = !0;
            this.Kq = !1;
            return !0
        },
        $C: function () {
            0 != this.Na.ZC && (this.a.w = this.Mq, this.a.u = this.Nq, this.a.b.N = !0)
        },
        rU: function (a) {
            var b;
            for (b = 0; b < this.Na.Pm; b++)
                if (null != this.Na.ib[b].De && m.Gc(a, this.Na.ib[b].De)) {
                    0 == this.wd ? (this.ll(b), this.a.Hm = this.a.c.Xb,
                        this.a.Gm = this.Na.ib[b].De, this.a.Mo = 0, this.xf()) : 0 < b && (b--, this.Om(b), this.a.Hm = this.a.c.Xb, this.a.Gm = this.Na.ib[b].De, this.a.Mo = 0, this.xf());
                    this.a.A.W = !0;
                    break
                }
        },
        sU: function (a) {
            var b;
            for (b = 0; b < this.Na.Pm; b++)
                if (null != this.Na.ib[b].De && m.Gc(a, this.Na.ib[b].De)) {
                    if (b == this.ve && 0 == this.Oh) break;
                    this.im = a;
                    if (0 == this.wd)
                        if (b > this.ve) {
                            if (0 != this.Tc) break;
                            0 != (this.Yb & 32768) ? this.start() : this.ll(this.ve)
                        } else {
                            if (0 != this.Tc) {
                                this.reverse();
                                break
                            }
                            0 != (this.Yb & 32768) ? (this.start(), this.reverse()) : this.Om(MT_MoveNumber -
                                1)
                        }
                    else if (b <= this.ve) {
                        if (0 != this.Tc) break;
                        0 != (this.Yb & 32768) ? this.start() : this.Om(this.ve - 1)
                    } else {
                        if (0 != this.Tc) {
                            this.reverse();
                            break
                        }
                        0 != (this.Yb & 32768) ? (this.start(), this.reverse()) : this.ll(this.ve)
                    }
                    break
                }
        },
        stop: function () {
            0 == this.Yb && (this.Yb = this.Tc | 32768);
            this.Tc = 0;
            this.a.A.W = !0
        },
        start: function () {
            0 != (this.Yb & 32768) && (this.Tc = this.Yb & 32767, this.Yb = this.Ph = 0, this.a.A.W = !0)
        },
        reverse: function () {
            if (0 == this.Yb) {
                this.a.A.W = !0;
                var a = this.ve;
                if (0 == this.Oh)(this.wd = !this.wd) ? 0 == a ? this.wd = !this.wd : (a--,
                    this.Om(a)) : this.ll(a);
                else {
                    this.wd = !this.wd;
                    this.Un = -this.Un;
                    this.Vn = -this.Vn;
                    var a = this.Qh,
                        b = this.xk;
                    this.Qh = b;
                    this.xk = a;
                    a = this.Rh;
                    this.Rh = b = this.yk;
                    this.yk = a;
                    this.a.b.Pa += 16;
                    this.a.b.Pa &= 31;
                    a = this.Oh >>> 16;
                    a = this.Lq - a;
                    this.Oh = a << 16 | this.Oh & 65535
                }
            }
        },
        kc: function (a) {
            var b = this.a.w;
            this.a.w = a;
            b -= this.Qh;
            a -= b;
            this.xk = b = this.xk - this.Qh + a;
            b = this.Qh;
            this.Qh = a;
            this.Mq -= b - a;
            this.a.A.W = !0;
            this.a.b.N = !0;
            this.a.b.Wa = !0
        },
        lc: function (a) {
            var b = this.a.u;
            this.a.u = a;
            b -= this.Rh;
            a -= b;
            this.yk = b = this.yk - this.Rh + a;
            b = this.Rh;
            this.Rh = a;
            this.Nq -= b - a;
            this.a.A.W = !0;
            this.a.b.N = !0;
            this.a.b.Wa = !0
        },
        hf: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.Tc = a;
            this.a.b.ea = a;
            this.a.A.W = !0
        },
        xh: function (a) {
            this.hf(a)
        },
        Le: function () {}
    });
    V.TQ = 0;
    V.vI = 1;
    V.RQ = 2;
    V.SQ = 3;
    V.Mh = 0;
    V.fm = 1;
    V.Jq = 2;
    V.Iq = 3;
    V.oz = 4;
    V.pz = 5;
    V.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.o = this.a.c;
            this.a.Tg = 0;
            this.de = this.a.Ug = 0;
            this.a.b.ea = 0;
            this.a.b.Ei = b.ml;
            this.Jp = b.LC;
            this.uh = this.Xk(this.Jp);
            this.Kp = b.MC;
            this.Je = this.Xk(this.Kp);
            this.a.b.mb = b.QC;
            this.a.b.Di = 0;
            this.Fu = b.NC;
            this.qz = b.OC;
            var c = b.PC;
            3 < c && (c = V.vI);
            this.rz = c;
            this.gm = this.Ld = 0;
            this.vk = null;
            this.$o(b);
            this.a.b.N = !0;
            this.vb = V.Mh
        },
        move: function () {
            var a, b;
            this.a.c.Pl = 1;
            a = this.a.c.Pc[this.a.b.Ei - 1];
            this.pv();
            b = this.de;
            var c;
            0 == this.gm && (0 >= b && (0 != (a & 4) ? (c = this.uh, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), b -= c, b / 256 < -this.a.b.mb && (b = 256 * -this.a.b.mb)) : 0 > b && (c = this.Je, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), b += c, 0 < b && (b = 0)), 0 != (a & 8) && (b = -b)), 0 <= b && (0 != (a & 8) ? (c = this.uh, 0 != (this.a.c.B.cc & E.bd) && (c *=
                this.a.c.Oc), b += c, b / 256 > this.a.b.mb && (b = 256 * this.a.b.mb)) : 0 < b && (c = this.Je, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), b -= c, 0 > b && (b = 0)), 0 != (a & 4) && (b = -b)), this.de = b);
            var d = this.Ld;
            for (c = !1;;) {
                switch (this.vb) {
                    case 2:
                    case 3:
                        c = this.Fu << 5;
                        0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc);
                        d += c;
                        64E3 < d && (d = 64E3);
                        break;
                    case 0:
                        if (0 != (a & 1)) {
                            if (this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf - 4) == k.Pf) break;
                            this.vb = V.fm;
                            c = !0;
                            continue
                        }
                        if (0 != (a & 2) && this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf + 4) != k.Pf) {
                            this.vb =
                                V.fm;
                            c = !0;
                            continue
                        }
                        break;
                    case 1:
                        if (0 == c && (this.gm = 0, this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) == k.Pf && this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf - 4) == k.Pf)) break;
                        0 >= d && (0 != (a & 1) ? (c = this.uh, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), d -= c, c = d / 256, c < -this.a.b.mb && (d = 256 * -this.a.b.mb)) : (c = this.Je, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), d += c, 0 < d && (d = 0)), 0 != (a & 2) && (d = -d));
                        0 <= d && (0 != (a & 2) ? (c = this.uh, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), d += c, c = d / 256, c > this.a.b.mb && (d = 256 * this.a.b.mb)) :
                            (c = this.Je, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), d -= c, 0 > d && (d = 0)), 0 != (a & 1) && (d = -d))
                }
                break
            }
            this.Ld = d;
            var e = 0;
            0 > b && (e = 16);
            c = b;
            var f = d;
            if (0 != f) {
                var g = 0;
                0 > c && (g |= 1, c = -c);
                0 > f && (g |= 2, f = -f);
                c = (c << 8) / f;
                for (e = 0; !(c >= O.Zl[e]); e += 2);
                e = O.Zl[e + 1];
                0 != (g & 2) && (e = -e + 32 & 31);
                0 != (g & 1) && (e = (-(e - 8 & 31) & 31) + 8 & 31)
            }
            c = b;
            g = O.mk[e];
            f = O.Ck[e];
            0 > g && (g = -g);
            0 > f && (f = -f);
            g < f && (g = f, c = d);
            0 > c && (c = -c);
            c /= g;
            250 < c && (c = 250);
            this.a.b.ea = c;
            switch (this.vb) {
                case 1:
                    0 > d ? this.a.b.Pa = 8 : 0 < d && (this.a.b.Pa = 24);
                    break;
                case 3:
                    this.a.b.Pa = e;
                    break;
                default:
                    0 >
                        b ? this.a.b.Pa = 16 : 0 < b && (this.a.b.Pa = 0)
            }
            switch (this.vb) {
                case 4:
                    this.a.b.Ge = B.Yt;
                    break;
                case 5:
                    this.a.b.Ge = B.nq;
                    break;
                case 3:
                    this.a.b.Ge = B.uy;
                    break;
                case 2:
                    this.a.b.Ge = B.vy;
                    break;
                case 1:
                    this.a.b.Ge = B.ty;
                    break;
                default:
                    this.a.b.Ge = B.Sc
            }
            null != this.a.Z && this.a.Z.lf();
            this.pv();
            this.yj(this.a.b.ea, e);
            this.vb != V.Mh && this.vb != V.fm || 0 != this.uk || (b = !1, d = this.rz, 0 != d && (d--, 0 == d ? (5 == (a & 5) && (b = !0), 9 == (a & 9) && (b = !0)) : 0 != (a & d << 4) && (b = !0)), b && (this.Ld = -this.qz << 8, this.vb = V.Jq));
            switch (this.vb) {
                case 2:
                    0 <= this.Ld && (this.vb =
                        V.Iq);
                    break;
                case 3:
                    this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) != k.Pf && (this.Ld = 0, this.vb = V.fm, this.a.b.Pa = 8);
                    break;
                case 0:
                    if (0 != (a & 3) && 0 == (a & 12) && this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) != k.Pf) {
                        this.vb = V.fm;
                        this.de = 0;
                        break
                    }
                    0 != (a & 2) && null != this.a.Z && this.a.Z.Lg(B.Yt) && (this.de = 0, this.vb = V.oz);
                    if (this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) != k.Pf) break;
                    0 == this.Cn(this.a.w, this.a.u + 10, this.Wi, E.ue, !0) ? (a = this.a.w - this.a.c.ca, b = this.a.u - this.a.c.fa, d = new G, this.Nm(a,
                        b + this.Wi - 1, a, b, this.Wi, E.ue, d), this.a.w = d.x + this.a.c.ca, this.a.u = d.y + this.a.c.fa, this.uk = !1) : this.vb = V.Iq;
                    break;
                case 1:
                    if (this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) == k.Pf) {
                        if (0 > this.Ld)
                            for (f = 0; 32 > f; f++)
                                if (this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf + f) != k.Pf) {
                                    this.a.u += f;
                                    break
                                } this.Ld = 0
                    }
                    0 != (a & 12) && (this.vb = V.Mh, this.Ld = 0);
                    break;
                case 4:
                    0 == (a & 2) && (null != this.a.Z && this.a.Z.Lg(B.nq) ? (this.vb = V.pz, this.a.b.Ge = B.nq, this.a.Z.lf(), this.a.Z.Al = 1) : this.vb = V.Mh);
                    break;
                case 5:
                    null != this.a.Z &&
                        0 == this.a.Z.Yd && (this.vb = V.Mh)
            }
            if (this.vb == V.Mh || this.vb == V.oz || this.vb == V.pz) {
                do {
                    a = null;
                    null != this.a.Db && (a = this.a.Db.Fj);
                    if (null == this.a.c.Um(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, this.a.w, this.a.u, a) && (a = this.a.c.Um(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, this.a.w, this.a.u + 1, a), null != a && 1 == a.size())) {
                        a = a.get(0);
                        if (null == this.vk || this.vk != a) {
                            if (this.a.uf != a.uf) {
                                this.vk = a;
                                this.Gu = a.w;
                                this.Hu = a.u;
                                break
                            }
                            if (null == this.vk) break
                        }
                        b = a.w - this.Gu;
                        d = a.u - this.Hu;
                        this.Gu = a.w;
                        this.Hu = a.u;
                        this.a.w += b;
                        this.a.u += d;
                        this.a.c.pg(this.a);
                        this.a.b.N = !0;
                        break
                    }
                    this.vk = null
                } while (0)
            } else this.vk = null
        },
        Sw: function () {
            this.Ld = this.de = this.a.b.ea = 0
        },
        Ng: function () {
            this.stop()
        },
        stop: function () {
            if (this.wg != this.a.c.He) this.Sw();
            else {
                this.a.A.W = !0;
                var a = this.a.w - this.a.c.ca,
                    b = this.a.u - this.a.c.fa,
                    c;
                switch (this.a.c.i.st & 4294901760) {
                    case -786432:
                        a = this.a.w - this.a.na;
                        b = this.a.u - this.a.oa;
                        c = this.a.c.yl(a, b, a + this.a.K, b + this.a.M);
                        a = this.a.w;
                        b = this.a.u;
                        0 != (c & k.Hh) && (a = this.a.na, this.de = 0, this.uk = !0);
                        0 != (c & k.Ih) && (a = this.a.c.$d - this.a.K + this.a.na, this.de = 0, this.uk = !0);
                        0 != (c & k.Jh) && (b = this.a.oa, this.Ld = 0, this.uk = !1);
                        0 != (c & k.Gh) && (b = this.a.c.ae - this.a.M + this.a.oa, this.Ld = 0, this.uk = !1);
                        this.a.w = a;
                        this.a.u = b;
                        this.vb = this.vb == V.Jq ? V.Iq : V.Mh;
                        this.gm = 0;
                        break;
                    case -851968:
                    case -917504:
                        if (this.uk = !1, c = new G, this.vb == V.Iq) this.Nm(a, b, this.a.b.Nj - this.a.c.ca, this.a.b.Oj - this.a.c.fa, this.Wi, E.ue, c), this.a.w = c.x + this.a.c.ca, this.a.u = c.y + this.a.c.fa, this.vb = V.Mh, this.a.b.N = !0, this.Cn(this.a.w, this.a.u +
                            1, 0, E.ue, !0) ? this.de = this.a.b.ea = 0 : (this.gm = 0, this.a.b.ea = Math.abs(this.de / 256), this.Ld = 0);
                        else {
                            if (this.vb == V.Mh) {
                                if (this.Nm(a, b, a, b - this.Wi, 0, E.ue, c)) {
                                    this.a.w = c.x + this.a.c.ca;
                                    this.a.u = c.y + this.a.c.fa;
                                    this.a.b.N = !0;
                                    break
                                }
                                if (this.Nm(a, b, this.a.b.Nj - this.a.c.ca, this.a.b.Oj - this.a.c.fa, 0, E.ue, c)) {
                                    this.a.w = c.x + this.a.c.ca;
                                    this.a.u = c.y + this.a.c.fa;
                                    this.a.b.N = !0;
                                    this.Sw();
                                    break
                                }
                            }
                            if (this.vb == V.Jq) {
                                if (this.Nm(a, b, a, b - this.Wi, 0, E.ue, c)) {
                                    this.a.w = c.x + this.a.c.ca;
                                    this.a.u = c.y + this.a.c.fa;
                                    this.a.b.N = !0;
                                    break
                                }
                                this.gm =
                                    1;
                                this.de = 0
                            }
                            this.vb == V.fm && this.Nm(a, b, this.a.b.Nj - this.a.c.ca, this.a.b.Oj - this.a.c.fa, 0, E.ue, c) ? (this.a.w = c.x + this.a.c.ca, this.a.u = c.y + this.a.c.fa, this.a.b.N = !0, this.Sw()) : (this.a.b.Qa = this.a.b.at, this.a.b.cb = this.a.b.$s, this.Cn(this.a.w, this.a.u, 0, E.ue, !0) || (this.a.w = this.a.b.Nj, this.a.u = this.a.b.Oj, this.a.b.N = !0))
                        }
                }
            }
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        hf: function (a) {
            0 >
                a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.mb && (a = this.a.b.mb);
            this.a.b.ea = a;
            this.de = this.a.b.ea * O.mk[this.a.c.Ib(this.a)];
            this.Ld = this.a.b.ea * O.Ck[this.a.c.Ib(this.a)];
            this.a.A.W = !0
        },
        xh: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.mb = a;
            a <<= 8;
            this.de > a && (this.de = a);
            this.a.A.W = !0
        },
        Bt: function (a) {
            this.Fu = a
        },
        Le: function (a) {
            this.a.b.Pa = a;
            this.de = this.a.b.ea * O.mk[a];
            this.Ld = this.a.b.ea * O.Ck[a]
        },
        pv: function () {
            var a;
            0 < this.a.b.Qa ? a = this.a.c.h.ia.$k(this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb) : (a = new ca, a.width =
                this.a.K, a.height = this.a.M, a.Ja = this.a.na, a.Ga = this.a.oa);
            this.Qf = 0;
            this.Rf = a.height - a.Ga;
            this.Wi = 2 * a.height + a.height >>> 3
        },
        AM: function () {
            this.pv();
            this.o.Og(this.a.od, this.a.w + this.Qf, this.a.u + this.Rf) == k.Pf && (0 == this.a.c.Jk(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, this.a.w, this.a.u, 0, E.Hn) && (this.vb == V.Jq && 0 > this.Ld || 0 == this.a.c.Jk(this.a, this.a.b.Qa, this.a.b.cb, this.a.b.sb, this.a.b.tb, this.a.w, this.a.u, this.Wi, E.ue)) || this.a.c.i.Cd(this.a, -851968 | this.a.Aa & 65535))
        }
    });
    bb.YI = [4294967288,
        4294967292, 4294967294, 4294967295
    ];
    bb.prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            this.Md = 0;
            this.Nh = this.a.b.ea = 0;
            this.sz = -1;
            this.a.b.Ei = b.ml;
            this.Jp = b.Tw;
            this.uh = this.Xk(b.Tw);
            this.Kp = b.Uw;
            this.Je = this.Xk(b.Uw);
            this.a.b.mb = b.UC;
            this.a.b.Di = 0;
            this.tz = b.SC;
            this.a.A.Yj = 0;
            this.Xj = b.ys;
            this.Iu = 0;
            this.Ju = bb.YI[b.RC];
            this.Ku = b.TC;
            this.hm = 0;
            this.wk = this.a.c.Ib(this.a);
            this.a.Tg = 0;
            this.a.Ug = 0;
            this.$o(b);
            this.a.b.N = !0
        },
        move: function () {
            var a, b, c;
            this.a.c.Pl = 1;
            if (0 == this.Nh) {
                this.a.A.Wj = !1;
                a = this.a.c.Pc[this.a.b.Ei -
                    1] & 15;
                b = 0;
                0 != (a & 8) && (b = -1);
                0 != (a & 4) && (b = 1);
                if (0 != b) {
                    c = this.Ku;
                    0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc);
                    for (this.hm += c; 100 < this.hm;) this.hm -= 100, this.wk += b, this.wk &= 31, this.a.b.Pa = this.wk & this.Ju;
                    this.a.b.N = !0
                }
                c = 0;
                0 != this.a.A.Yj ? (0 != (a & 1) && (c = 1), 0 != (a & 2) && (c = 2)) : (0 != (a & 1) && (c = 2), 0 != (a & 2) && (c = 1));
                for (b = this.Md;;) {
                    if (0 != (c & 1)) {
                        if (0 == this.Md) {
                            if (0 == this.tz) break;
                            if (0 != (this.Iu & 3)) break;
                            this.a.A.Yj ^= 1;
                            c = this.uh;
                            0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc);
                            b += c;
                            c = b >> 8;
                            c > this.a.b.mb && (this.Md = b = this.a.b.mb <<
                                8);
                            this.Md = b;
                            break
                        }
                        c = this.Je;
                        0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc);
                        b -= c;
                        0 > b && (b = 0);
                        this.Md = b
                    } else 0 != (c & 2) && (c = this.uh, 0 != (this.a.c.B.cc & E.bd) && (c *= this.a.c.Oc), b += c, c = b >> 8, c > this.a.b.mb && (this.Md = b = this.a.b.mb << 8), this.Md = b);
                    break
                }
                this.Iu = a;
                this.a.b.ea = this.Md >> 8;
                this.a.b.Ge = B.Sc;
                null != this.a.Z && this.a.Z.lf();
                a = this.a.c.Ib(this.a);
                0 != this.a.A.Yj && (a = a + 16 & 31);
                if (0 == this.yj(this.a.b.ea, a)) return
            }
            do {
                if (0 == this.Nh) break;
                if (0 == this.a.c.Pl) break;
                b = this.Md;
                b -= this.Je;
                if (0 >= b) {
                    this.Nh = this.Md = 0;
                    break
                }
                this.Md =
                    b;
                b >>= 8;
                a = this.a.c.Ib(this.a);
                0 != this.Nh && (a += 16, a &= 31);
                if (0 == this.yj(b, a)) break
            } while (1)
        },
        reverse: function () {},
        stop: function () {
            this.Md = this.Nh = 0;
            this.a.A.Yj = 0;
            this.wg == this.a.c.He && (this.bp(0 != (this.Xj & O.Wn)), this.a.A.W = !0)
        },
        start: function () {
            this.Yb = 0;
            this.a.A.W = !0
        },
        Ng: function () {
            this.wg == this.a.c.He && this.bp(0 != (this.Xj & O.Wn));
            this.a.c.Xb != this.sz && (this.Nh = this.a.A.Yj, this.a.A.Yj = 0, this.Nh++, 16 <= this.Nh ? this.stop() : (this.a.A.W = !0, this.a.A.Wj = !0))
        },
        hf: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            a > this.a.b.mb &&
                (a = this.a.b.mb);
            this.Md = a << 8;
            this.a.A.W = !0
        },
        xh: function (a) {
            0 > a && (a = 0);
            250 < a && (a = 250);
            this.a.b.mb = a;
            a <<= 8;
            this.Md > a && (this.Md = a);
            this.a.A.W = !0
        },
        Dt: function (a) {
            this.Ku = a
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0, this.a.b.Wa = !0)
        },
        Le: function (a) {
            this.wk = a;
            this.a.b.Pa = a & this.Ju
        }
    });
    cb.prototype = m.extend(new O, {
        aa: function (a) {
            this.a = a;
            this.a.b.ea = 0;
            this.a.b.Wa = !0;
            this.a.b.N = !0
        },
        move: function () {
            null !=
                this.a.Z && this.a.Z.lf();
            this.a.b.Wa && (this.a.b.Wa = !1, this.a.c.pg(this.a))
        },
        kc: function (a) {
            this.a.w != a && (this.a.w = a, this.a.A.W = !0, this.a.b.N = !0);
            this.a.b.Wa = !0
        },
        lc: function (a) {
            this.a.u != a && (this.a.u = a, this.a.A.W = !0, this.a.b.N = !0);
            this.a.b.Wa = !0
        },
        Le: function () {},
        reverse: function () {},
        stop: function () {},
        start: function () {},
        Ng: function () {},
        hf: function () {},
        xh: function () {}
    });
    (function (a) {
        this.Gd = a
    }).prototype = m.extend(new O, {
        aa: function (a, b) {
            this.a = a;
            a.c.h.file.Pg(b.data);
            this.a.b.Wa = !0;
            this.a.b.N = !0
        },
        Jb: function () {
            this.Gd.Jb()
        },
        move: function () {
            this.Gd.move() && (this.a.b.N = !0)
        },
        stop: function () {
            this.Gd.stop(this.wg == this.a.c.He)
        },
        start: function () {
            this.Gd.start()
        },
        Ng: function () {
            this.Gd.Ng(this.wg == this.a.c.He)
        },
        hf: function (a) {
            this.Gd.hf(a)
        },
        xh: function (a) {
            this.Gd.xh(a)
        },
        reverse: function () {
            this.Gd.reverse()
        },
        kc: function (a) {
            this.Gd.kc(a);
            this.a.b.N = !0;
            this.a.b.Wa = !0
        },
        lc: function (a) {
            this.Gd.lc(a);
            this.a.b.N = !0;
            this.a.b.Wa = !0
        },
        Le: function (a) {
            this.Gd.Le(a);
            this.a.b.N = !0;
            this.a.b.Wa = !0
        },
        fA: function () {
            return 0
        }
    });
    Ia.AG = 1;
    Ia.BG = 2;
    Ia.OP =
        4;
    Ia.prototype = {
        aa: function (a, b, c, d, e) {
            null != this.pa && this.pa.Jb();
            null != d && (b.b.Pa = d.nA);
            this.by = b.Db.kx;
            d = b.b.wc;
            b.b.wc = -1;
            if (null != c.Vd && a < c.Vd.ol) {
                c = c.Vd.qd[a];
                this.Ql = a; - 1 == e && (e = c.ap);
                b.b.wc = e;
                switch (e) {
                    case 0:
                        this.pa = new cb;
                        break;
                    case 1:
                        this.pa = new af;
                        break;
                    case 2:
                        this.pa = new bb;
                        break;
                    case 3:
                        this.pa = new $e;
                        break;
                    case 4:
                        this.pa = new va;
                        break;
                    case 5:
                        this.pa = new bf;
                        break;
                    case 9:
                        this.pa = new V;
                        break;
                    case 14:
                        this.pa = null, null == this.pa && (this.pa = new cb)
                }
                b.b.Pa = this.Iv(b, c.bD, b.b.Pa);
                this.pa.aa(b, c)
            }
            d !=
                b.b.wc && d == U.Lu && b.c.UA(); - 1 == b.b.wc && (b.b.wc = 0, this.pa = new cb, this.pa.aa(b, null), b.b.Pa = 0)
        },
        UB: function (a, b, c) {
            null != this.pa && this.pa.Jb();
            a.b.wc = b;
            switch (b) {
                case 11:
                    this.pa = new Ze;
                    break;
                case 13:
                    this.pa = new Ye
            }
            this.pa.a = a;
            0 == c && this.pa.aa(a, null)
        },
        Jb: function () {
            this.pa.Jb()
        },
        move: function () {
            this.pa.move()
        },
        BM: function (a) {
            var b = a.R;
            null != b.Vd && this.Ql + 1 < b.Vd.ol && this.aa(this.Ql + 1, a, b, null, -1)
        },
        LN: function (a, b) {
            var c = a.R;
            null != c.Vd && 0 <= b && b < c.Vd.ol && this.aa(b, a, c, null, -1)
        },
        Iv: function (a, b, c) {
            if (0 >
                c || 32 <= c) {
                var d = 0,
                    e = b,
                    f;
                for (c = 0; 32 > c; c++) f = e, e >>= 1, 0 != (f & 1) && d++;
                if (0 == d) c = 0;
                else
                    for (d = a.c.random(d), e = b, c = 0; !(f = e, e >>= 1, 0 != (f & 1) && (d--, 0 > d)); c++);
            }
            return c
        }
    };
    Pa.BQ = 2;
    Pa.CQ = 4;
    Pa.YH = 8;
    Pa.prototype = m.extend(new ta, {
        Ho: function () {
            return 0
        },
        Ev: function (a) {
            this.TB = a.l();
            this.Ic = m.vD(a.Nb());
            0 == this.Ic.length && (this.Ic = "Ini.ini");
            a = 0;
            this.TB & Pa.YH && (a |= oa.gz);
            this.Xc = new oa(this.O.h, a);
            this.Xe = "Group";
            this.Jm = "Item";
            this.ye = 0;
            return !1
        },
        Or: function () {
            0 < this.ye && (this.ye--, 0 == this.ye && this.Xc.Sp());
            return 0
        },
        Hv: function () {
            this.Xc.Sp()
        },
        action: function (a, b) {
            switch (a) {
                case 0:
                    this.gJ(b);
                    break;
                case 1:
                    this.hJ(b);
                    break;
                case 2:
                    this.rJ(b);
                    break;
                case 3:
                    this.cJ(b);
                    break;
                case 4:
                    this.sI(b);
                    break;
                case 5:
                    this.oJ(b);
                    break;
                case 6:
                    this.fJ(b);
                    break;
                case 7:
                    this.tJ(b);
                    break;
                case 8:
                    this.sJ(b);
                    break;
                case 9:
                    this.qJ(b);
                    break;
                case 10:
                    this.pJ(b);
                    break;
                case 11:
                    this.zG(b);
                    break;
                case 12:
                    this.yG(b);
                    break;
                case 13:
                    this.xG(b)
            }
        },
        gJ: function (a) {
            this.Xe = a.Bd(this.O, 0)
        },
        hJ: function (a) {
            this.Jm = a.Bd(this.O, 0)
        },
        rJ: function (a) {
            a = a.Td(this.O,
                0).toString();
            this.Xc.Xl(this.Xe, this.Jm, a, this.Ic);
            this.ye = 10
        },
        cJ: function (a) {
            a = a.aw(this.O, 0);
            this.Xc.Xl(this.Xe, "pos." + a.Db.Hj, a.w.toString() + "," + a.u.toString(), this.Ic);
            this.ye = 10
        },
        sI: function (a) {
            a = a.aw(this.O, 0);
            var b = this.Xc.al(this.Xe, "pos." + a.Db.Hj, "X", this.Ic);
            if ("X" != b) {
                var c = b.indexOf(","),
                    d = b.substring(c + 1);
                a.w = parseInt(b.substring(0, c), 10);
                isNaN(a.w) && (a.w = 0);
                a.u = parseInt(d, 10);
                isNaN(a.u) && (a.u = 0);
                a.b.N = !0;
                a.b.Wa = !0
            }
        },
        oJ: function (a) {
            a = a.Bd(this.O, 0);
            this.Xc.Xl(this.Xe, this.Jm, a, this.Ic);
            this.ye = 10
        },
        fJ: function (a) {
            this.Ic = m.vD(a.Bd(this.O, 0))
        },
        tJ: function (a) {
            var b = a.Bd(this.O, 0);
            a = a.Td(this.O, 1).toString();
            this.Xc.Xl(this.Xe, b, a, this.Ic);
            this.ye = 10
        },
        sJ: function (a) {
            var b = a.Bd(this.O, 0),
                c = a.Bd(this.O, 1);
            a = a.Td(this.O, 2).toString();
            this.Xc.Xl(b, c, a, this.Ic);
            this.ye = 10
        },
        qJ: function (a) {
            var b = a.Bd(this.O, 0);
            a = a.Bd(this.O, 1);
            this.Xc.Xl(this.Xe, b, a, this.Ic);
            this.ye = 10
        },
        pJ: function (a) {
            var b = a.Bd(this.O, 0),
                c = a.Bd(this.O, 1);
            a = a.Bd(this.O, 2);
            this.Xc.Xl(b, c, a, this.Ic);
            this.ye = 10
        },
        zG: function (a) {
            this.Xc.PA(this.Xe,
                a.Bd(this.O, 0), this.Ic);
            this.ye = 10
        },
        yG: function (a) {
            this.Xc.PA(a.Bd(this.O, 0), a.Bd(this.O, 1), this.Ic);
            this.ye = 10
        },
        xG: function (a) {
            this.Xc.FK(a.Bd(this.O, 0), this.Ic);
            this.ye = 10
        },
        yo: function (a) {
            switch (a) {
                case 0:
                    return this.OH();
                case 1:
                    return this.LH();
                case 2:
                    return this.QH();
                case 3:
                    return this.PH();
                case 4:
                    return this.NH();
                case 5:
                    return this.MH()
            }
            return null
        },
        OH: function () {
            var a = this.Xc.al(this.Xe, this.Jm, "", this.Ic),
                a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        LH: function () {
            return this.Xc.al(this.Xe, this.Jm,
                "", this.Ic)
        },
        QH: function () {
            var a = this.G.Cm(),
                a = this.Xc.al(this.Xe, a, "", this.Ic),
                a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        PH: function () {
            var a = this.G.Cm(),
                b = this.G.Cm(),
                a = this.Xc.al(a, b, "", this.Ic),
                a = parseInt(a, 10);
            isNaN(a) && (a = 0);
            return a
        },
        NH: function () {
            var a = this.G.Cm();
            return this.Xc.al(this.Xe, a, "", this.Ic)
        },
        MH: function () {
            var a = this.G.Cm(),
                b = this.G.Cm();
            return this.Xc.al(a, b, "", this.Ic)
        }
    });
    n.YF = 0;
    n.Ly = 1;
    n.Jy = 2;
    n.Iy = 3;
    n.Hy = 4;
    n.Ky = 5;
    n.My = 6;
    n.ZF = 7;
    n.cG = 8;
    n.iF = 0;
    n.qF = 1;
    n.nF = 2;
    n.mF = 3;
    n.lF = 4;
    n.kF = 5;
    n.oF = 6;
    n.tF = 7;
    n.hF = 8;
    n.xF = 9;
    n.AF = 10;
    n.wF = 11;
    n.gF = 12;
    n.pF = 13;
    n.jF = 14;
    n.yF = 15;
    n.BF = 16;
    n.rF = 17;
    n.uF = 18;
    n.sF = 19;
    n.vF = 20;
    n.MG = 0;
    n.YG = 1;
    n.UG = 2;
    n.RG = 3;
    n.QG = 4;
    n.PG = 5;
    n.XG = 6;
    n.cH = 7;
    n.NG = 8;
    n.KG = 9;
    n.LG = 10;
    n.SG = 11;
    n.TG = 12;
    n.VG = 13;
    n.WG = 14;
    n.ZG = 15;
    n.$G = 16;
    n.OG = 17;
    n.aH = 18;
    n.dH = 19;
    n.bH = 20;
    n.eH = 21;
    n.Dg = 0;
    n.Sy = 1;
    n.ZH = 2;
    n.By = 3;
    n.Gn = 0;
    n.mS = 1;
    n.Kn = 2;
    n.aJ = 0;
    n.oI = 1;
    n.fH = 2;
    n.Ee = [0, 26784E4, 50976E4, 7776E5, 11232E5, 130464E4, 156384E4, 183168E4, 209952E4, 235872E4, 262656E4, 288576E4];
    n.hO = "I II III IV V VI VII VIII IX X XI XII".split(" ");
    n.prototype = m.extend(new ta, {
        Ho: function () {
            return 9
        },
        Ev: function (a, b) {
            this.G.Gt(b.pA);
            this.G.Ht(b.qA);
            this.G.na = 0;
            this.G.oa = 0;
            this.G.Yp(a.l());
            this.G.Vp(a.l());
            a.qa(64);
            this.yg = a.l();
            this.xg = a.l();
            this.cy = 0 == a.l() ? !1 : !0;
            this.dE = 0 == a.l() ? !1 : !0;
            this.Pp = a.l();
            this.Ke = a.Nx();
            8 == this.Ke.pb && "SYSTEM" == this.Ke.oe.toUpperCase() && this.Ke.aa();
            this.Ke.cg();
            this.kj = a.Cc();
            a.qa(80);
            this.fE = 0 == a.l() ? !1 : !0;
            this.BA = a.Cc();
            this.eE = 0 == a.l() ? !1 : !0;
            this.AA = a.Cc();
            this.cE = 0 == a.l() ? !1 : !0;
            this.zA = a.Cc();
            this.kE = a.l();
            this.hE = a.l();
            this.gE = a.l();
            a.qa(80);
            var c = a.l(),
                d = a.l(),
                e = a.l();
            this.ig = 36E4 * c + 6E3 * d + 100 * e;
            this.Rp = a.l();
            this.Qp = a.l();
            this.dy = !0;
            this.ow = new Date;
            this.jy = new Date;
            this.jc = new Date;
            this.$a = this.vm = 0;
            return !0
        },
        Or: function () {
            var a = 0;
            this.dy && (this.dy = !1, a = ta.Su);
            var b, c = this.gc();
            b = Math.floor(n.Ee[c.getMonth()] + 864E4 * (c.getDate() - 1) + 36E4 * c.getHours() + 6E3 * c.getMinutes() + 100 * c.getSeconds() + c.getMilliseconds() / 10);
            (b < this.vm || b > this.vm + 200 && 0 != this.vm) && 0 != this.$a && (this.Ub += Math.abs(this.vm - this.$a),
                this.$a = b);
            this.vm = b;
            switch (this.yg) {
                case n.Dg:
                case n.Sy:
                case n.ZH:
                    this.jc.getSeconds() != c.getSeconds() && (this.jc.setSeconds(c.getSeconds()), this.G.an(n.Ly, this.G.c.i.Gb), a = ta.Su, this.jc.getMinutes() != c.getMinutes() && (this.jc.setMinutes(c.getMinutes()), this.G.an(n.Jy, this.G.c.i.Gb), this.jc.getHours() != c.getHours() && (this.jc.setHours(c.getHours()), this.G.an(n.Iy, this.G.c.i.Gb))));
                    break;
                case n.By:
                    this.jc.getHours() != c.getHours() && (this.jc.setHours(c.getHours()), this.jc.getDate() != c.getDate() && (this.jc.setDate(c.getDate()),
                        this.G.an(n.Hy, this.G.c.i.Gb), a = ta.Su, this.jc.getMonth() != c.getMonth() && (this.jc.setMonth(c.getMonth()), this.G.an(n.Ky, this.G.c.i.Gb), this.jc.Xv != c.Xv && (this.jc.Xv = c.Xv, this.G.an(n.My, this.G.c.i.Gb)))))
            }
            this.jc.setTime(c.getTime());
            return a
        },
        YA: function (a, b, c) {
            var d = new aa,
                e;
            d.left = b + this.G.w;
            d.right = d.left + this.G.K;
            d.top = c + this.G.u;
            d.bottom = d.top + this.G.M;
            var f = this.jc.getHours(),
                g = Math.floor(this.jc.getMilliseconds() / 10);
            c = this.jc.getMinutes();
            b = this.jc.getSeconds();
            var h = this.jc.getDate(),
                k = this.jc.getMonth() +
                1;
            switch (this.yg) {
                case n.Dg:
                    n.Gn == this.xg ? (11 < f && (f -= 12), 2 != this.Pp ? (e = new aa, e.left = d.left + this.Rp / 2, e.right = d.right - this.Rp / 2, e.top = d.top + this.Qp / 2, e.bottom = d.bottom - this.Qp / 2, this.Yq(a, f, c, b, e)) : this.Yq(a, f, c, b, d)) : (0 != this.$a ? (b = n.Ee[k - 1] + 864E4 * (h - 1) + 36E4 * f + 6E3 * c + 100 * b + g, c = this.Ub + (b - this.$a)) : c = this.Ub, n.Kn == this.xg && (c = this.ig - c, 0 > c && (c = 0)), f = Math.floor(c / 36E4), 11 < f && (f -= 12), b = Math.floor((c - 36E4 * f) / 6E3), c = Math.floor((c - 36E4 * f - 6E3 * b) / 100), 2 != this.Pp ? (e = new aa, e.left = d.left + this.Rp / 2, e.right =
                        d.right - this.Rp / 2, e.top = d.top + this.Qp / 2, e.bottom = d.bottom - this.Qp / 2, this.Yq(a, f, b, c, e)) : this.Yq(a, f, b, c, d));
                    break;
                case n.Sy:
                    switch (this.kE) {
                        case 0:
                            n.Gn == this.xg ? (e = " AM", 11 < f && (f -= 12, e = ""), f = f.toString(), f = this.ld(f), g = c.toString(), g = this.ld(g), b = f + ":" + g + e) : (0 != this.$a ? (b = n.Ee[k - 1] + 864E4 * (h - 1) + 36E4 * f + 6E3 * c + 100 * b + g, c = this.Ub + (b - this.$a)) : c = this.Ub, n.Kn == this.xg && (c = this.ig - c, 0 > c && (c = 0)), f = Math.floor(c / 36E4), 11 < f && (f -= 12), b = Math.floor((c - 36E4 * f) / 6E3), f = f.toString(), f = this.ld(f), g = b.toString(), g = this.ld(g),
                                b = f + ":" + g);
                            this.Zq(a, b, d);
                            break;
                        case 1:
                            n.Gn == this.xg ? (e = " AM", 12 < f && (f -= 12, e = ""), f = f.toString(), f = this.ld(f), g = c.toString(), g = this.ld(g), b = b.toString(), b = this.ld(b), b = f + ":" + g + ":" + b + e) : (0 != this.$a ? (b = n.Ee[k - 1] + 864E4 * (h - 1) + 36E4 * f + 6E3 * c + 100 * b + g, c = this.Ub + (b - this.$a)) : c = this.Ub, n.Kn == this.xg && (c = this.ig - c, 0 > c && (c = 0)), f = Math.floor(c / 36E4), 11 < f && (f -= 12), b = Math.floor((c - 36E4 * f) / 6E3), c = Math.floor((c - 36E4 * f - 6E3 * b) / 100), 11 < f && (f -= 12), f = f.toString(), f = this.ld(f), g = b.toString(), g = this.ld(g), b = c.toString(), b =
                                this.ld(b), b = f + ":" + g + ":" + b);
                            this.Zq(a, b, d);
                            break;
                        case 2:
                            n.Gn == this.xg ? (f = f.toString(), f = this.ld(f), g = c.toString()) : (0 != this.$a ? (b = n.Ee[k - 1] + 864E4 * (h - 1) + 36E4 * f + 6E3 * c + 100 * b + g, c = this.Ub + (b - this.$a)) : c = this.Ub, n.Kn == this.xg && (c = this.ig - c, 0 > c && (c = 0)), f = Math.floor(c / 36E4), b = Math.floor((c - 36E4 * f) / 6E3), f = f.toString(), f = this.ld(f), g = b.toString());
                            g = this.ld(g);
                            this.Zq(a, f + ":" + g, d);
                            break;
                        case 3:
                            n.Gn == this.xg ? (f = f.toString(), f = this.ld(f), g = c.toString(), g = this.ld(g), b = b.toString()) : (0 != this.$a ? (b = n.Ee[k - 1] + 864E4 *
                                (h - 1) + 36E4 * f + 6E3 * c + 100 * b + g, c = this.Ub + (b - this.$a)) : c = this.Ub, n.Kn == this.xg && (c = this.ig - c, 0 > c && (c = 0)), f = Math.floor(c / 36E4), b = Math.floor((c - 36E4 * f) / 6E3), c = Math.floor((c - 36E4 * f - 6E3 * b) / 100), f = f.toString(), f = this.ld(f), g = b.toString(), g = this.ld(g), b = c.toString()), b = this.ld(b), this.Zq(a, f + ":" + g + ":" + b, d)
                    }
                    break;
                case n.By:
                    switch (this.hE) {
                        case n.aJ:
                            e = "dd/mm/yyyy";
                            break;
                        case n.oI:
                            e = "dddd dd mmmm yyyy";
                            break;
                        case n.fH:
                            switch (this.gE) {
                                case 0:
                                    e = "dd/mm/yyyy";
                                    break;
                                case 1:
                                    e = "dd mmmm yyyy";
                                    break;
                                case 2:
                                    e = "dd mmmm, yyyy";
                                    break;
                                case 3:
                                    e = "mmmm dd, yyyy";
                                    break;
                                case 4:
                                    e = "dd-mmm-yyyy";
                                    break;
                                case 5:
                                    e = "mmmm, yyyy";
                                    break;
                                case 6:
                                    e = "mmm-yy"
                            }
                    }
                    b = this.jc.format(e);
                    this.$I(a, b, d)
            }
        },
        ld: function (a) {
            2 > a.length && (a = "0" + a);
            return a
        },
        Yq: function (a, b, c, d, e) {
            var f = Array(3);
            f[0] = new G;
            f[1] = new G;
            f[2] = new G;
            f[0].y = e.top + (e.bottom - e.top) / 2;
            f[0].x = e.left + (e.right - e.left) / 2;
            this.jE = f[0].x;
            this.iE = f[0].y;
            e = e.right - e.left > e.bottom - e.top ? (e.bottom - e.top) / 2 : (e.right - e.left) / 2;
            e--;
            a.lineCap = "round";
            1 == this.cE && (f[1].x = f[0].x + e / 1.5 * Math.cos(.523 *
                (b + Number(c) / 60) - 1.57), f[1].y = f[0].y + e / 1.5 * Math.sin(.523 * (b + Number(c) / 60) - 1.57), this.lE = f[1].x, this.mE = f[1].y, a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, this.zA, 2, 0, 0));
            1 == this.eE && (f[1].x = f[0].x + Math.cos(.104 * c - 1.57) * e, f[1].y = f[0].y + Math.sin(.104 * c - 1.57) * e, this.nE = f[1].x, this.oE = f[1].y, a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, this.AA, 2, 0, 0));
            1 == this.fE && (f[1].x = f[0].x + Math.cos(.104 * Number(d) - 1.57) * e, f[1].y = f[0].y + Math.sin(.104 * Number(d) - 1.57) * e, this.pE = f[1].x, this.qE = f[1].y, a.Lc(f[0].x, f[0].y, f[1].x, f[1].y, this.BA,
                1, 0, 0));
            if (1 == this.dE)
                for (b = 1; 13 > b; b++) f[1].x = f[0].x + .9 * Math.cos(.523 * b - 1.57) * e, f[1].y = f[0].y + .9 * Math.sin(.523 * b - 1.57) * e, f[2].x = f[0].x + Math.cos(.523 * b - 1.57) * e, f[2].y = f[0].y + Math.sin(.523 * b - 1.57) * e, a.Lc(f[1].x, f[1].y, f[2].x, f[2].y, this.kj, 1, 0, 0);
            if (2 != this.Pp) {
                var g, h = new aa;
                null == this.Jd && (this.Jd = Array(13));
                this.ki || (this.ki = new ga(this.O.h, 2, 2));
                for (b = 1; 13 > b; b++) {
                    var k, p;
                    c = 0 == this.Pp ? b.toString() : n.hO[b - 1];
                    d = this.ki.measureText(c, this.Ke);
                    g = this.Ke.pb;
                    k = f[0].x + Math.cos(.523 * b - 1.57) * e;
                    p = f[0].y + Math.sin(.523 *
                        b - 1.57) * e;
                    switch (b) {
                        case 1:
                        case 2:
                            h.left = k;
                            h.bottom = p;
                            h.right = h.left + d;
                            h.top = h.bottom - g;
                            break;
                        case 3:
                            h.left = k + 2;
                            h.top = p - g / 2;
                            h.right = h.left + d;
                            h.bottom = h.top + g;
                            break;
                        case 4:
                        case 5:
                            h.left = k;
                            h.top = p;
                            h.right = h.left + d;
                            h.bottom = h.top + g;
                            break;
                        case 6:
                            h.left = k - d / 2;
                            h.top = p + 1;
                            h.right = h.left + d;
                            h.bottom = h.top + g;
                            break;
                        case 7:
                        case 8:
                            h.right = k;
                            h.top = p;
                            h.left = h.right - d;
                            h.bottom = h.top + g;
                            break;
                        case 9:
                            h.right = k - 2;
                            h.top = p - g / 2;
                            h.left = h.right - d;
                            h.bottom = h.top + g;
                            break;
                        case 10:
                        case 11:
                            h.right = k;
                            h.bottom = p;
                            h.left = h.right - d;
                            h.top = h.bottom - g;
                            break;
                        case 12:
                            h.left = k - d / 2, h.bottom = p - 1, h.right = h.left + d, h.top = h.bottom - g
                    }
                    this.Jd[b] || (this.Jd[b] = new ga(this.O.h, d, g), this.Jd[b].Tl(c, m.pk | m.qk, null, this.Ke, this.kj));
                    this.Jd[b].wb(a, h.left + (h.right - h.left) / 2 - d / 2, h.top + (h.bottom - h.top) / 2 + g / 2 - g + 2)
                }
            }
            1 == this.cy && (a.dt(f[0].x - e, f[0].y - e, 2 * e, 2 * e, 1, this.kj, 0, 0), a.dt(f[0].x - e, f[0].y - e, 2 * e + 1, 2 * e + 1, 1, this.kj, 0, 0))
        },
        Zq: function (a, b, c) {
            this.ki || (this.ki = new ga(this.O.h, 2, 2));
            var d = this.ki.measureText(b, this.Ke),
                e = this.Ke.pb,
                f = c.left + (c.right -
                    c.left) / 2 - d / 2,
                g = c.top + (c.bottom - c.top) / 2 - e / 2;
            if (null == this.Ka || b != this.JM) this.JM = b, this.Ka = new ga(this.O.h, d, e), this.Ka.Tl(b, m.qk | m.pk, null, this.Ke, this.kj);
            this.Ka.wb(a, Math.floor(f), Math.floor(g), 0, 0);
            1 == this.cy && a.Cp(c.left + 1, c.top + 1, c.right - c.left, c.bottom - c.top, this.kj, 2, 0, 0)
        },
        $I: function (a, b, c) {
            this.ki || (this.ki = new ga(this.O.h, 2, 2));
            var d = this.ki.measureText(b, this.Ke),
                e = this.Ke.pb,
                f = c.left + (c.right - c.left) / 2 - d / 2;
            c = c.top + (c.bottom - c.top) / 2 - e / 2;
            if (null == this.Ka || this.rD != b) this.rD = b, this.Ka =
                new ga(this.O.h, d, e), this.Ka.Tl(b, m.qk | m.pk, null, this.Ke, this.kj);
            this.Ka.wb(a, Math.floor(f), Math.floor(c))
        },
        gc: function () {
            var a = new Date;
            a.setTime(this.ow.getTime() + (a.getTime() - this.jy.getTime()));
            return a
        },
        Hk: function (a) {
            this.ow.setTime(a.getTime());
            this.jc.setTime(a.getTime());
            this.jy = new Date
        },
        oo: function (a, b) {
            switch (a) {
                case n.YF:
                    return this.pG(b);
                case n.Ly:
                    return this.jm();
                case n.Jy:
                    return this.jm();
                case n.Iy:
                    return this.jm();
                case n.Hy:
                    return this.jm();
                case n.Ky:
                    return this.jm();
                case n.My:
                    return this.jm();
                case n.ZF:
                    return this.qG(b);
                case n.cG:
                    return this.G.ua
            }
            return !1
        },
        pG: function (a) {
            if (0 != this.$a) {
                var b = this.gc();
                return this.no(a, 0, 10 * (this.Ub + (Math.floor(n.Ee[b.getMonth()] + 864E4 * (b.getDate() - 1) + 36E4 * b.getHours() + 6E3 * b.getMinutes() + 100 * b.getSeconds() + b.getMilliseconds() / 10) - this.$a)))
            }
            return this.no(a, 0, 10 * this.Ub)
        },
        no: function (a, b, c) {
            var d = a.j[b].Ec;
            switch (a.j[b].Qe) {
                case 0:
                    return c == d;
                case 1:
                    return c != d;
                case 2:
                    return c <= d;
                case 3:
                    return c < d;
                case 4:
                    return c >= d;
                case 5:
                    return c > d
            }
            return !1
        },
        jm: function () {
            return 0 !=
                (this.G.Y & M.su) || this.O.kt == sEventCount ? !0 : !1
        },
        qG: function (a) {
            var b;
            if (0 != this.$a) b = this.gc(), b = this.ig - (this.Ub + (Math.floor(n.Ee[b.getMonth()] + 864E4 * (b.getDate() - 1) + 36E4 * b.getHours() + 6E3 * b.getMinutes() + 100 * b.getSeconds() + b.getMilliseconds() / 10) - this.$a));
            else return b = this.ig - this.Ub, this.no(a, 0, 10 * b);
            0 > b && (b = 0);
            return this.no(a, 0, 10 * b)
        },
        DQ: function () {
            return this.G.ua
        },
        action: function (a, b) {
            switch (a) {
                case n.iF:
                    this.dJ(b.Td(this.O, 0));
                    break;
                case n.qF:
                    this.nJ(b.Td(this.O, 0));
                    break;
                case n.nF:
                    this.kJ(b.Td(this.O,
                        0));
                    break;
                case n.mF:
                    this.jJ(b.Td(this.O, 0));
                    break;
                case n.lF:
                    b.Td(this.O, 0);
                    break;
                case n.kF:
                    this.iJ(b.Td(this.O, 0));
                    break;
                case n.oF:
                    this.lJ(b.Td(this.O, 0));
                    break;
                case n.tF:
                    this.yJ(b.Td(this.O, 0));
                    break;
                case n.hF:
                    this.ZI();
                    break;
                case n.xF:
                    this.AJ();
                    break;
                case n.AF:
                    this.CJ();
                    break;
                case n.wF:
                    this.zJ();
                    break;
                case n.gF:
                    this.WH();
                    break;
                case n.pF:
                    this.mJ(b.GB(this.O, 0));
                    break;
                case n.jF:
                    this.eJ(b.HB(this.O, 0));
                    break;
                case n.yF:
                    this.BJ();
                    break;
                case n.BF:
                    this.DJ();
                    break;
                case n.rF:
                    this.uJ(b.Td(this.O, 0));
                    break;
                case n.uF:
                    this.wJ(b.Td(this.O, 0));
                    break;
                case n.sF:
                    this.vJ(b.Td(this.O, 0));
                    break;
                case n.vF:
                    this.xJ(b.Td(this.O, 0))
            }
        },
        dJ: function (a) {
            if (0 <= a && 100 > a) {
                var b = this.gc();
                b.setMilliseconds(10 * a);
                this.Hk(b)
            }
        },
        nJ: function (a) {
            if (0 <= a && 60 > a) {
                var b = this.gc();
                b.setSeconds(a);
                this.Hk(b)
            }
        },
        kJ: function (a) {
            if (0 <= a && 60 > a) {
                var b = this.gc();
                b.setMinutes(a);
                this.Hk(b)
            }
        },
        jJ: function (a) {
            if (0 <= a && 24 > a) {
                var b = this.gc();
                b.setHours(a);
                this.Hk(b)
            }
        },
        nS: function () {},
        iJ: function (a) {
            if (1 <= a && 32 > a) {
                var b = this.gc();
                b.setDate(a);
                this.Hk(b)
            }
        },
        lJ: function (a) {
            if (1 <= a && 13 > a) {
                var b = this.gc();
                b.setMonth(a - 1);
                this.Hk(b)
            }
        },
        yJ: function (a) {
            if (1979 < a && 2100 > a) {
                var b = this.gc();
                b.setFullYear(a);
                this.Hk(b)
            }
        },
        ZI: function () {
            this.Ub = this.$a = 0
        },
        AJ: function () {
            if (0 == this.$a) {
                var a = this.gc();
                this.$a = Math.floor(n.Ee[a.getMonth()] + 864E4 * (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 * a.getMinutes() + 100 * a.getSeconds() + a.getMilliseconds() / 10)
            }
        },
        CJ: function () {
            if (0 != this.$a) {
                var a = this.gc();
                this.Ub += Math.floor(n.Ee[a.getMonth()] + 864E4 * (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 *
                    a.getMinutes() + 100 * a.getSeconds() + a.getMilliseconds() / 10) - this.$a;
                this.$a = 0
            }
        },
        zJ: function () {
            this.G.$j()
        },
        WH: function () {
            this.G.qj()
        },
        mJ: function (a) {
            a.tB && this.G.setPosition(a.x, a.y)
        },
        eJ: function (a) {
            this.ig = a / 10;
            this.Ub = this.$a = 0
        },
        BJ: function () {
            if (0 == this.$a) {
                var a = this.gc();
                this.$a = Math.floor(n.Ee[a.getMonth()] + 864E4 * (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 * a.getMinutes() + 100 * a.getSeconds() + a.getMilliseconds() / 10)
            }
        },
        DJ: function () {
            if (0 != this.$a) {
                var a = this.gc();
                this.Ub += Math.floor(n.Ee[a.getMonth()] + 864E4 *
                    (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 * a.getMinutes() + 100 * a.getSeconds() + a.getMilliseconds() / 10) - this.$a;
                this.$a = 0
            }
        },
        uJ: function (a) {
            this.G.Gt(a)
        },
        wJ: function (a) {
            this.G.Ht(a)
        },
        vJ: function (a) {
            this.G.Yp(a)
        },
        xJ: function (a) {
            this.G.Vp(a)
        },
        yo: function (a) {
            switch (a) {
                case n.MG:
                    return this.uH();
                case n.YG:
                    return this.KH();
                case n.UG:
                    return this.GH();
                case n.RG:
                    return this.DH();
                case n.QG:
                    return this.AH();
                case n.PG:
                    return this.zH();
                case n.XG:
                    return this.HH();
                case n.cH:
                    return this.SH();
                case n.NG:
                    return this.xH();
                case n.KG:
                    return this.vH();
                case n.LG:
                    return this.wH();
                case n.SG:
                    return this.BH();
                case n.TG:
                    return this.CH();
                case n.VG:
                    return this.EH();
                case n.WG:
                    return this.FH();
                case n.ZG:
                    return this.IH();
                case n.$G:
                    return this.JH();
                case n.OG:
                    return this.yH();
                case n.aH:
                    return this.G.w;
                case n.dH:
                    return this.G.u;
                case n.bH:
                    return this.G.K;
                case n.eH:
                    return this.RH()
            }
            return 0
        },
        uH: function () {
            return Math.floor(this.gc().getMilliseconds() / 10)
        },
        KH: function () {
            return this.gc().getSeconds()
        },
        GH: function () {
            return this.gc().getMinutes()
        },
        DH: function () {
            return this.gc().getHours()
        },
        AH: function () {
            return this.gc().getDay()
        },
        zH: function () {
            return this.gc().getDate()
        },
        HH: function () {
            return this.gc().getMonth() + 1
        },
        SH: function () {
            return this.gc().getFullYear()
        },
        xH: function () {
            if (0 != this.$a) {
                var a = this.gc();
                return this.Ub + (Math.floor(n.Ee[a.getMonth()] + 864E4 * (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 * a.getMinutes() + 100 * a.getSeconds() + a.getMilliseconds() / 10) - this.$a)
            }
            return this.Ub
        },
        vH: function () {
            return n.Dg == this.yg ? this.iE + this.O.ca : 0
        },
        wH: function () {
            return n.Dg == this.yg ? this.jE + this.O.fa :
                0
        },
        BH: function () {
            return n.Dg == this.yg ? this.lE + this.O.ca : 0
        },
        CH: function () {
            return n.Dg == this.yg ? this.mE + this.O.fa : 0
        },
        EH: function () {
            return n.Dg == this.yg ? this.nE + this.O.ca : 0
        },
        FH: function () {
            return n.Dg == this.yg ? this.oE + this.O.fa : 0
        },
        IH: function () {
            return n.Dg == this.yg ? this.pE + this.O.ca : 0
        },
        JH: function () {
            return n.Dg == this.yg ? this.qE + this.O.fa : 0
        },
        yH: function () {
            var a;
            0 != this.$a ? (a = this.gc(), a = this.ig - (this.Ub + (Math.floor(n.Ee[a.getMonth()] + 864E4 * (a.getDate() - 1) + 36E4 * a.getHours() + 6E3 * a.getMinutes() + 100 * a.getSeconds() +
                a.getMilliseconds() / 10) - this.$a))) : a = this.ig - this.Ub;
            0 > a && (a = 0);
            return a
        },
        sQ: function () {
            return this.G.w
        },
        uQ: function () {
            return this.G.u
        },
        tQ: function () {
            return this.G.K
        },
        RH: function () {
            return this.G.Ue()
        }
    });
    var eb = function () {
        function a(a, b) {
            a = String(a);
            for (b = b || 2; a.length < b;) a = "0" + a;
            return a
        }
        var b = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            c = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            d = /[^-+\dA-Z]/g;
        return function (e, f, g) {
            var h = eb;
            1 != arguments.length || "[object String]" != Object.prototype.toString.call(e) || /\d/.test(e) || (f = e, e = void 0);
            e = e ? new Date(e) : new Date;
            if (isNaN(e)) throw SyntaxError("invalid date");
            f = String(h.pC[f] || f || h.pC["default"]);
            "UTC:" == f.slice(0, 4) && (f = f.slice(4), g = !0);
            var k = g ? "getUTC" : "get",
                m = e[k + "Date"](),
                n = e[k + "Day"](),
                p = e[k + "Month"](),
                r = e[k + "FullYear"](),
                l = e[k + "Hours"](),
                t = e[k + "Minutes"](),
                u = e[k + "Seconds"](),
                k = e[k + "Milliseconds"](),
                v = g ? 0 : e.getTimezoneOffset(),
                z = {
                    d: m,
                    qT: a(m),
                    rT: h.Tr.OA[n],
                    sT: h.Tr.OA[n + 7],
                    Zg: p + 1,
                    nU: a(p + 1),
                    oU: h.Tr.GC[p],
                    pU: h.Tr.GC[p + 12],
                    aV: String(r).slice(2),
                    bV: r,
                    Ko: l % 12 || 12,
                    $T: a(l % 12 || 12),
                    vQ: l,
                    wQ: a(l),
                    PQ: t,
                    QQ: a(t),
                    JU: u,
                    VU: a(u),
                    hU: a(k, 3),
                    GQ: a(99 < k ? Math.round(k / 10) : k),
                    t: 12 > l ? "a" : "p",
                    ZU: 12 > l ? "am" : "pm",
                    oS: 12 > l ? "A" : "P",
                    vS: 12 > l ? "AM" : "PM",
                    VS: g ? "UTC" : (String(e).match(c) || [""]).pop().replace(d, ""),
                    tU: (0 < v ? "-" : "+") + a(100 * Math.floor(Math.abs(v) / 60) + Math.abs(v) % 60, 4),
                    gS: ["th", "st", "nd", "rd"][3 < m % 10 ? 0 : (10 != m % 100 - m % 10) * m % 10]
                };
            return f.replace(b, function (a) {
                return a in z ? z[a] : a.slice(1,
                    a.length - 1)
            })
        }
    }();
    eb.pC = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        SU: "m/d/yy",
        lU: "mmm d, yyyy",
        iU: "mmmm d, yyyy",
        DT: "dddd, mmmm d, yyyy",
        TU: "h:MM TT",
        mU: "h:MM:ss TT",
        jU: "h:MM:ss TT Z",
        cU: "yyyy-mm-dd",
        eU: "HH:MM:ss",
        dU: "yyyy-mm-dd'T'HH:MM:ss",
        fU: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };
    eb.Tr = {
        OA: "Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        GC: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")
    };
    Date.prototype.format = function (a, b) {
        return eb(this, a, b)
    };
    He(D, Y)
};

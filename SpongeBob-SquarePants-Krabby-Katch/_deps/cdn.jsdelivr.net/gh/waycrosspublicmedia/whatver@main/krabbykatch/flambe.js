
/**
 * Cooked with Flambe
 * https://github.com/aduros/flambe
 */
var flambe = {
    FLASH_VERSION: "11"
};
flambe.embed = function (n, x) {
    "string" == typeof n && (n = [n + "-html.js"]);
    var y = document.getElementById(x);
    if (null == y) throw Error("Could not find element [id=" + x + "]");
    for (var r = {}, o = window.location.search.substr(1).split("&"), j = 0; j < o.length; ++j) {
        var p = o[j].split("=");
        r[unescape(p[0])] = 1 < p.length ? unescape(p[1]) : null
    }
    o = r.flambe;
    for (j = 0; j < n.length; ++j) switch (r = n[j], (p = r.match(/\.(\w+)(\?|$)/)) && (p = p[1].toLowerCase()), p) {
      	default:
            if (null == o || "html" == o) if (p = document.createElement("canvas"), "getContext" in p) return p.id = x + "-canvas", y.appendChild(p), flambe.canvas = p, j = document.createElement("script"), j.onload = function () {
                flambe.canvas = null
            }, j.src = r, y.appendChild(j), !0;
            break;        
    }
    return !1
};
var swfobject = function () {
    function n() {
        if (!z) {
            try {
                var a = d.getElementsByTagName("body")[0].appendChild(d.createElement("span"));
                a.parentNode.removeChild(a)
            } catch (b) {
                return
            }
            z = !0;
            for (var a = D.length, c = 0; c < a; c++) D[c]()
        }
    }
    function x(a) {
        z ? a() : D[D.length] = a
    }
    function y(a) {
        if (typeof k.addEventListener != i) k.addEventListener("load", a, !1);
        else if (typeof d.addEventListener != i) d.addEventListener("load", a, !1);
        else if (typeof k.attachEvent != i) V(k, "onload", a);
        else if ("function" == typeof k.onload) {
            var b = k.onload;
            k.onload = function () {
                b();
                a()
            }
        } else k.onload = a
    }
    function r() {
        var a = d.getElementsByTagName("body")[0],
            b = d.createElement(t);
        b.setAttribute("type", E);
        var c = a.appendChild(b);
        if (c) {
            var f = 0;
            (function () {
                if (typeof c.GetVariable != i) {
                    var g = c.GetVariable("$version");
                    g && (g = g.split(" ")[1].split(","), e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)])
                } else if (10 > f) {
                    f++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                a.removeChild(b);
                c = null;
                o()
            })()
        } else o()
    }
    function o() {
        var a = v.length;
        if (0 < a) for (var b = 0; b < a; b++) {
            var c = v[b].id,
                f = v[b].callbackFn,
                g = {
                    success: !1,
                    id: c
                };
            if (0 < e.pv[0]) {
                var d = q(c);
                if (d) if (F(v[b].swfVersion) && !(e.wk && 312 > e.wk)) A(c, !0), f && (g.success = !0, g.ref = j(c), f(g));
                else if (v[b].expressInstall && p()) {
                    g = {};
                    g.data = v[b].expressInstall;
                    g.width = d.getAttribute("width") || "0";
                    g.height = d.getAttribute("height") || "0";
                    d.getAttribute("class") && (g.styleclass = d.getAttribute("class"));
                    d.getAttribute("align") && (g.align = d.getAttribute("align"));
                    for (var h = {}, d = d.getElementsByTagName("param"), l = d.length, m = 0; m < l; m++) "movie" != d[m].getAttribute("name").toLowerCase() && (h[d[m].getAttribute("name")] = d[m].getAttribute("value"));
                    J(g, h, c, f)
                } else W(d), f && f(g)
            } else if (A(c, !0), f) {
                if ((c = j(c)) && typeof c.SetVariable != i) g.success = !0, g.ref = c;
                f(g)
            }
        }
    }
    function j(a) {
        var b = null;
        if ((a = q(a)) && "OBJECT" == a.nodeName) typeof a.SetVariable != i ? b = a : (a = a.getElementsByTagName(t)[0]) && (b = a);
        return b
    }
    function p() {
        return !G && F("6.0.65") && (e.win || e.mac) && !(e.wk && 312 > e.wk)
    }
    function J(a, b, c, f) {
        G = !0;
        K = f || null;
        O = {
            success: !1,
            id: c
        };
        var g = q(c);
        if (g) {
            "OBJECT" == g.nodeName ? (C = L(g), H = null) : (C = g, H = c);
            a.id = P;
            if (typeof a.width == i || !/%$/.test(a.width) && 310 > parseInt(a.width, 10)) a.width = "310";
            if (typeof a.height == i || !/%$/.test(a.height) && 137 > parseInt(a.height, 10)) a.height = "137";
            d.title = d.title.slice(0, 47) + " - Flash Player Installation";
            f = e.ie && e.win ? "ActiveX" : "PlugIn";
            f = "MMredirectURL=" + k.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + d.title;
            b.flashvars = typeof b.flashvars != i ? b.flashvars + ("&" + f) : f;
            e.ie && e.win && 4 != g.readyState && (f = d.createElement("div"), c += "SWFObjectNew", f.setAttribute("id",
            c), g.parentNode.insertBefore(f, g), g.style.display = "none", function () {
                4 == g.readyState ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
            }());
            M(a, b, c)
        }
    }
    function W(a) {
        if (e.ie && e.win && 4 != a.readyState) {
            var b = d.createElement("div");
            a.parentNode.insertBefore(b, a);
            b.parentNode.replaceChild(L(a), b);
            a.style.display = "none";
            (function () {
                4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
            })()
        } else a.parentNode.replaceChild(L(a), a)
    }
    function L(a) {
        var b = d.createElement("div");
        if (e.win && e.ie) b.innerHTML = a.innerHTML;
        else if (a = a.getElementsByTagName(t)[0]) if (a = a.childNodes) for (var c = a.length, f = 0; f < c; f++)!(1 == a[f].nodeType && "PARAM" == a[f].nodeName) && 8 != a[f].nodeType && b.appendChild(a[f].cloneNode(!0));
        return b
    }
    function M(a, b, c) {
        var f, g = q(c);
        if (e.wk && 312 > e.wk) return f;
        if (g) if (typeof a.id == i && (a.id = c), e.ie && e.win) {
            var s = "",
                h;
            for (h in a) a[h] != Object.prototype[h] && ("data" == h.toLowerCase() ? b.movie = a[h] : "styleclass" == h.toLowerCase() ? s += ' class="' + a[h] + '"' : "classid" != h.toLowerCase() && (s += " " + h + '="' + a[h] + '"'));
            h = "";
            for (var l in b) b[l] != Object.prototype[l] && (h += '<param name="' + l + '" value="' + b[l] + '" />');
            g.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + s + ">" + h + "</object>";
            I[I.length] = a.id;
            f = q(a.id)
        } else {
            l = d.createElement(t);
            l.setAttribute("type", E);
            for (var m in a) a[m] != Object.prototype[m] && ("styleclass" == m.toLowerCase() ? l.setAttribute("class", a[m]) : "classid" != m.toLowerCase() && l.setAttribute(m, a[m]));
            for (s in b) b[s] != Object.prototype[s] && "movie" != s.toLowerCase() && (a = l, h = s, m = b[s], c = d.createElement("param"), c.setAttribute("name", h), c.setAttribute("value", m), a.appendChild(c));
            g.parentNode.replaceChild(l, g);
            f = l
        }
        return f
    }
    function Q(a) {
        var b = q(a);
        b && "OBJECT" == b.nodeName && (e.ie && e.win ? (b.style.display = "none", function () {
            if (4 == b.readyState) {
                var c = q(a);
                if (c) {
                    for (var f in c) "function" == typeof c[f] && (c[f] = null);
                    c.parentNode.removeChild(c)
                }
            } else setTimeout(arguments.callee, 10)
        }()) : b.parentNode.removeChild(b))
    }
    function q(a) {
        var b = null;
        try {
            b = d.getElementById(a)
        } catch (c) {}
        return b
    }

    function V(a, b, c) {
        a.attachEvent(b, c);
        B[B.length] = [a, b, c]
    }
    function F(a) {
        var b = e.pv,
            a = a.split(".");
        a[0] = parseInt(a[0], 10);
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
    }
    function R(a, b, c, f) {
        if (!e.ie || !e.mac) {
            var g = d.getElementsByTagName("head")[0];
            if (g) {
                c = c && "string" == typeof c ? c : "screen";
                f && (N = u = null);
                if (!u || N != c) f = d.createElement("style"), f.setAttribute("type", "text/css"), f.setAttribute("media", c), u = g.appendChild(f),
                e.ie && e.win && typeof d.styleSheets != i && 0 < d.styleSheets.length && (u = d.styleSheets[d.styleSheets.length - 1]), N = c;
                e.ie && e.win ? u && typeof u.addRule == t && u.addRule(a, b) : u && typeof d.createTextNode != i && u.appendChild(d.createTextNode(a + " {" + b + "}"))
            }
        }
    }
    function A(a, b) {
        if (S) {
            var c = b ? "visible" : "hidden";
            z && q(a) ? q(a).style.visibility = c : R("#" + a, "visibility:" + c)
        }
    }
    function T(a) {
        return null != /[\\\"<>\.;]/.exec(a) && typeof encodeURIComponent != i ? encodeURIComponent(a) : a
    }
    var i = "undefined",
        t = "object",
        E = "application/x-shockwave-flash",
        P = "SWFObjectExprInst",
        k = window,
        d = document,
        w = navigator,
        U = !1,
        D = [function () {
            U ? r() : o()
        }],
        v = [],
        I = [],
        B = [],
        C, H, K, O, z = !1,
        G = !1,
        u, N, S = !0,
        e = function () {
            var a = typeof d.getElementById != i && typeof d.getElementsByTagName != i && typeof d.createElement != i,
                b = w.userAgent.toLowerCase(),
                c = w.platform.toLowerCase(),
                f = c ? /win/.test(c) : /win/.test(b),
                c = c ? /mac/.test(c) : /mac/.test(b),
                b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                g = !+"\v1",
                e = [0, 0, 0],
                h = null;
            if (typeof w.plugins != i && typeof w.plugins["Shockwave Flash"] == t) {
                if ((h = w.plugins["Shockwave Flash"].description) && !(typeof w.mimeTypes != i && w.mimeTypes[E] && !w.mimeTypes[E].enabledPlugin)) U = !0, g = !1, h = h.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), e[0] = parseInt(h.replace(/^(.*)\..*$/, "$1"), 10), e[1] = parseInt(h.replace(/^.*\.(.*)\s.*$/, "$1"), 10), e[2] = /[a-zA-Z]/.test(h) ? parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            } else if (typeof k.ActiveXObject != i) try {
                var l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (l && (h = l.GetVariable("$version"))) g = !0, h = h.split(" ")[1].split(","),
                e = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)]
            } catch (m) {}
            return {
                w3: a,
                pv: e,
                wk: b,
                ie: g,
                win: f,
                mac: c
            }
        }();
    (function () {
        e.w3 && ((typeof d.readyState != i && "complete" == d.readyState || typeof d.readyState == i && (d.getElementsByTagName("body")[0] || d.body)) && n(), z || (typeof d.addEventListener != i && d.addEventListener("DOMContentLoaded", n, !1), e.ie && e.win && (d.attachEvent("onreadystatechange", function () {
            "complete" == d.readyState && (d.detachEvent("onreadystatechange", arguments.callee), n())
        }), k == top && function () {
            if (!z) {
                try {
                    d.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(arguments.callee,
                    0);
                    return
                }
                n()
            }
        }()), e.wk && function () {
            z || (/loaded|complete/.test(d.readyState) ? n() : setTimeout(arguments.callee, 0))
        }(), y(n)))
    })();
    (function () {
        e.ie && e.win && window.attachEvent("onunload", function () {
            for (var a = B.length, b = 0; b < a; b++) B[b][0].detachEvent(B[b][1], B[b][2]);
            a = I.length;
            for (b = 0; b < a; b++) Q(I[b]);
            for (var c in e) e[c] = null;
            e = null;
            for (var f in swfobject) swfobject[f] = null;
            swfobject = null
        })
    })();
    return {
        registerObject: function (a, b, c, f) {
            if (e.w3 && a && b) {
                var d = {};
                d.id = a;
                d.swfVersion = b;
                d.expressInstall = c;
                d.callbackFn = f;
                v[v.length] = d;
                A(a, !1)
            } else f && f({
                success: !1,
                id: a
            })
        },
        getObjectById: function (a) {
            if (e.w3) return j(a)
        },
        embedSWF: function (a, b, c, d, g, j, h, l, m, n) {
            var o = {
                success: !1,
                id: b
            };
            e.w3 && !(e.wk && 312 > e.wk) && a && b && c && d && g ? (A(b, !1), x(function () {
                c += "";
                d += "";
                var e = {};
                if (m && typeof m === t) for (var k in m) e[k] = m[k];
                e.data = a;
                e.width = c;
                e.height = d;
                k = {};
                if (l && typeof l === t) for (var q in l) k[q] = l[q];
                if (h && typeof h === t) for (var r in h) k.flashvars = typeof k.flashvars != i ? k.flashvars + ("&" + r + "=" + h[r]) : r + "=" + h[r];
                if (F(g)) q = M(e, k, b), e.id == b && A(b, !0), o.success = !0, o.ref = q;
                else {
                    if (j && p()) {
                        e.data = j;
                        J(e, k, b, n);
                        return
                    }
                    A(b, !0)
                }
                n && n(o)
            })) : n && n(o)
        },
        switchOffAutoHideShow: function () {
            S = !1
        },
        ua: e,
        getFlashPlayerVersion: function () {
            return {
                major: e.pv[0],
                minor: e.pv[1],
                release: e.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function (a, b, c) {
            if (e.w3) return M(a, b, c)
        },
        showExpressInstall: function (a, b, c, d) {
            e.w3 && p() && J(a, b, c, d)
        },
        removeSWF: function (a) {
            e.w3 && Q(a)
        },
        createCSS: function (a, b, c, d) {
            e.w3 && R(a, b, c, d)
        },
        addDomLoadEvent: x,
        addLoadEvent: y,
        getQueryParamValue: function (a) {
            var b = d.location.search || d.location.hash;
            if (b) {
                /\?/.test(b) && (b = b.split("?")[1]);
                if (null == a) return T(b);
                for (var b = b.split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return T(b[c].substring(b[c].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function () {
            if (G) {
                var a = q(P);
                a && C && (a.parentNode.replaceChild(C, a), H && (A(H, !0), e.ie && e.win && (C.style.display = "block")), K && K(O));
                G = !1
            }
        }
    }
}();
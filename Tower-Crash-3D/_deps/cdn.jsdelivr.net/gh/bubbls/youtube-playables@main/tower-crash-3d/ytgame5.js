(function (globalScope) {
  "use strict";

  var aa =
    typeof Object.defineProperties == "function"
      ? Object.defineProperty
      : function (a, b, c) {
          if (a == Array.prototype || a == Object.prototype) {
            return a;
          }
          a[b] = c.value;
          return a;
        };
  function ba(a) {
    a = [
      typeof globalThis == "object" && globalThis,
      a,
      typeof window == "object" && window,
      typeof self == "object" && self,
      typeof global == "object" && global,
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) {
        return c;
      }
    }
    throw Error("Cannot find global object");
  }
  var ca = ba(
    typeof globalScope !== "undefined"
      ? globalScope
      : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
          ? global
          : {},
  );
  function da(a, b) {
    if (b) {
      a: {
        var c = ca;
        a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
          var e = a[d];
          if (!(e in c)) {
            break a;
          }
          c = c[e];
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        if (b != d && b != null) {
          aa(c, a, {
            configurable: true,
            writable: true,
            value: b,
          });
        }
      }
    }
  }
  function l(a) {
    function b(d) {
      return a.next(d);
    }
    function c(d) {
      return a.throw(d);
    }
    return new Promise(function (d, e) {
      function f(g) {
        if (g.done) {
          d(g.value);
        } else {
          Promise.resolve(g.value).then(b, c).then(f, e);
        }
      }
      f(a.next());
    });
  }
  da("globalThis", function (a) {
    return a || ca;
  });
  da("Object.values", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        var c = [];
        var d;
        for (d in b) {
          if (Object.prototype.hasOwnProperty.call(b, d)) {
            c.push(b[d]);
          }
        }
        return c;
      };
    }
  });
  da("Array.prototype.includes", function (a) {
    if (a) {
      return a;
    } else {
      return function (b, c) {
        var d = this;
        if (d instanceof String) {
          d = String(d);
        }
        var e = d.length;
        c = c || 0;
        for (c < 0 && (c = Math.max(c + e, 0)); c < e; c++) {
          var f = d[c];
          if (f === b || Object.is(f, b)) {
            return true;
          }
        }
        return false;
      };
    }
  });
  da("Object.entries", function (a) {
    if (a) {
      return a;
    } else {
      return function (b) {
        var c = [];
        var d;
        for (d in b) {
          if (Object.prototype.hasOwnProperty.call(b, d)) {
            c.push([d, b[d]]);
          }
        }
        return c;
      };
    }
  });
  function ea(a, b) {
    if (a instanceof String) {
      a += "";
    }
    var c = 0;
    var d = false;
    var e = {
      next: function () {
        if (!d && c < a.length) {
          var f = c++;
          return {
            value: b(f, a[f]),
            done: false,
          };
        }
        d = true;
        return {
          done: true,
          value: undefined,
        };
      },
    };
    e[Symbol.iterator] = function () {
      return e;
    };
    return e;
  }
  da("Array.prototype.values", function (a) {
    if (a) {
      return a;
    } else {
      return function () {
        return ea(this, function (b, c) {
          return c;
        });
      };
    }
  });
  const fa = () => {
    if (typeof window === "undefined") return;
    var a = window.getCurrentSdkUrl ? window.getCurrentSdkUrl() : null;
    if (a !== null) {
      a = new URL(
        a.origin + a.pathname + "?" + window.getLocationHash().substring(1),
      );
      if (a.searchParams.has("flags")) {
        window.sdkFlags = a.searchParams.get("flags") ?? "";
      }
      if (
        a.searchParams.has("environment") &&
        a.searchParams.has("bundle") &&
        a.searchParams.has("key") &&
        (a.searchParams.get("environment") !== "prod" ||
          a.searchParams.get("bundle") !== "public")
      ) {
        document.write('<script src="' + a.toString() + '"></script>');
        throw Error(
          "Exiting SDK: Purposefully exiting to load a different SDK version.",
        );
      }
    }
  };
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (!window.loadYTGame) {
      window.getLocationHash = () => window.location.hash;
      const a = document.currentScript ? document.currentScript.src : "";
      window.getCurrentSdkUrl = () => (a != "" ? new URL(a) : null);
      window.loadYTGame = fa;
      fa();
    }
    window.enableSendingResourceLoadedEvents = true;
  }
  /*
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  */
  var m = this || self;
  function ha(a) {
    var b = typeof a;
    return (b == "object" && a != null) || b == "function";
  }
  function n(a, b) {
    a = a.split(".");
    var c = m;
    for (var d; a.length && (d = a.shift()); ) {
      if (a.length || b === undefined) {
        if (c[d] && c[d] !== Object.prototype[d]) {
          c = c[d];
        } else {
          c = c[d] = {};
        }
      } else {
        c[d] = b;
      }
    }
  }
  function ia(a) {
    return a;
  }
  function ka(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.K = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.R = function (d, e, f) {
      var g = Array(arguments.length - 2);
      for (var h = 2; h < arguments.length; h++) {
        g[h - 2] = arguments[h];
      }
      return b.prototype[e].apply(d, g);
    };
  }
  function la(a) {
    m.setTimeout(() => {
      throw a;
    }, 0);
  }
  var ma;
  var na;
  a: {
    for (var oa = ["CLOSURE_FLAGS"], pa = m, qa = 0; qa < oa.length; qa++) {
      pa = pa[oa[qa]];
      if (pa == null) {
        na = null;
        break a;
      }
    }
    na = pa;
  }
  var ra = na && na[610401301];
  ma = ra ?? false;
  function sa() {
    var a = m.navigator;
    if ((a &&= a.userAgent)) {
      return a;
    } else {
      return "";
    }
  }
  var ta;
  const ua = m.navigator;
  ta = ua ? ua.userAgentData || null : null;
  function va(a) {
    if (ma) {
      if (ta) {
        return ta.brands.some(({ brand: b }) => b && b.indexOf(a) != -1);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function q(a) {
    return sa().indexOf(a) != -1;
  }
  function r() {
    if (ma) {
      return !!ta && ta.brands.length > 0;
    } else {
      return false;
    }
  }
  function wa() {
    if (r()) {
      return va("Chromium");
    } else {
      return (
        ((q("Chrome") || q("CriOS")) && !(r() ? 0 : q("Edge"))) || q("Silk")
      );
    }
  }
  const xa = Array.prototype.indexOf
    ? function (a, b) {
        return Array.prototype.indexOf.call(a, b, undefined);
      }
    : function (a, b) {
        if (typeof a === "string") {
          if (typeof b !== "string" || b.length != 1) {
            return -1;
          } else {
            return a.indexOf(b, 0);
          }
        }
        for (let c = 0; c < a.length; c++) {
          if (c in a && a[c] === b) {
            return c;
          }
        }
        return -1;
      };
  function ya(a) {
    ya[" "](a);
    return a;
  }
  ya[" "] = function () {};
  var za = r() ? false : q("Trident") || q("MSIE");
  var Aa =
    q("Gecko") &&
    (sa().toLowerCase().indexOf("webkit") == -1 || !!q("Edge")) &&
    !q("Trident") &&
    !q("MSIE") &&
    !q("Edge");
  var Ba = sa().toLowerCase().indexOf("webkit") != -1 && !q("Edge");
  if (q("Android")) {
    wa();
  }
  wa();
  if (q("Safari")) {
    if (
      !wa() &&
      !(r() ? 0 : q("Coast")) &&
      !(r() ? 0 : q("Opera")) &&
      !(r() ? 0 : q("Edge")) &&
      !(r() ? va("Microsoft Edge") : q("Edg/"))
    ) {
      if (r()) {
        va("Opera");
      }
    }
  }
  var Ca = {};
  var Da = null;
  var Ea = typeof Uint8Array !== "undefined";
  var Fa = !za && typeof btoa === "function";
  function Ga(a, b) {
    a.__closure__error__context__984382 ||= {};
    a.__closure__error__context__984382.severity = b;
  }
  let Ha = undefined;
  function Ia(a) {
    a = Error(a);
    Ga(a, "warning");
    return a;
  }
  function Ja(a) {
    if (a != null) {
      var b;
      var c = (b = Ha) != null ? b : (Ha = {});
      b = c[a] || 0;
      if (!(b >= 5)) {
        c[a] = b + 1;
        a = Error();
        Ga(a, "incident");
        la(a);
      }
    }
  }
  var Ka = typeof Symbol === "function" && typeof Symbol() === "symbol";
  function t(a, b, c = false) {
    if (typeof Symbol === "function" && typeof Symbol() === "symbol") {
      if (c && Symbol.for && a) {
        return Symbol.for(a);
      } else if (a != null) {
        return Symbol(a);
      } else {
        return Symbol();
      }
    } else {
      return b;
    }
  }
  var La = t("jas", undefined, true);
  var Ma = t(undefined, "0di");
  var Na = t(undefined, "1oa");
  var Oa = t(undefined, Symbol());
  var Pa = t(undefined, "0actk");
  var Qa = t(undefined, "8utk");
  const u = Ka ? La : "N";
  const Ra = {
    N: {
      value: 0,
      configurable: true,
      writable: true,
      enumerable: false,
    },
  };
  const Sa = Object.defineProperties;
  function Ta(a, b) {
    if (!Ka && !(u in a)) {
      Sa(a, Ra);
    }
    a[u] |= b;
  }
  function v(a, b) {
    if (!Ka && !(u in a)) {
      Sa(a, Ra);
    }
    a[u] = b;
  }
  function Ua(a) {
    Ta(a, 34);
    return a;
  }
  function Va(a, b) {
    v(b, (a | 0) & -15615);
  }
  function Wa(a, b) {
    v(b, (a | 34) & -15581);
  }
  function Xa() {
    return typeof BigInt === "function";
  }
  function w(a) {
    return Array.prototype.slice.call(a);
  }
  var Za = {};
  function $a(a) {
    return (
      a !== null &&
      typeof a === "object" &&
      !Array.isArray(a) &&
      a.constructor === Object
    );
  }
  function ab(a) {
    if (a & 2) {
      throw Error();
    }
  }
  class bb {
    constructor(a, b, c) {
      this.g = a;
      this.h = b;
      this.i = c;
    }
    next() {
      const a = this.g.next();
      if (!a.done) {
        a.value = this.h.call(this.i, a.value);
      }
      return a;
    }
    [Symbol.iterator]() {
      return this;
    }
  }
  function cb(a, b) {
    const c = ia(Oa);
    if ((b = c ? b[c] : undefined)) {
      a[Oa] = w(b);
    }
  }
  function db(a) {
    a.U = true;
    return a;
  }
  var eb = db((a) => typeof a === "number");
  var fb = db((a) => typeof a === "string");
  var gb = db((a) => typeof a === "boolean");
  var hb = typeof m.BigInt === "function" && typeof m.BigInt(0) === "bigint";
  var nb = db((a) =>
    hb ? a >= ib && a <= jb : a[0] === "-" ? kb(a, lb) : kb(a, mb),
  );
  const lb = Number.MIN_SAFE_INTEGER.toString();
  const ib = hb ? BigInt(Number.MIN_SAFE_INTEGER) : undefined;
  const mb = Number.MAX_SAFE_INTEGER.toString();
  const jb = hb ? BigInt(Number.MAX_SAFE_INTEGER) : undefined;
  function kb(a, b) {
    if (a.length > b.length) {
      return false;
    }
    if (a.length < b.length || a === b) {
      return true;
    }
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      const e = b[c];
      if (d > e) {
        return false;
      }
      if (d < e) {
        return true;
      }
    }
  }
  let x = 0;
  let y = 0;
  function ob(a) {
    const b = a >>> 0;
    x = b;
    y = ((a - b) / 4294967296) >>> 0;
  }
  function pb(a) {
    if (a < 0) {
      ob(-a);
      const [b, c] = qb(x, y);
      x = b >>> 0;
      y = c >>> 0;
    } else {
      ob(a);
    }
  }
  function rb(a, b) {
    b >>>= 0;
    a >>>= 0;
    if (b <= 2097151) {
      var c = "" + (b * 4294967296 + a);
    } else if (Xa()) {
      c = "" + ((BigInt(b) << BigInt(32)) | BigInt(a));
    } else {
      c = ((a >>> 24) | (b << 8)) & 16777215;
      b = (b >> 16) & 65535;
      a = (a & 16777215) + c * 6777216 + b * 6710656;
      c += b * 8147497;
      b *= 2;
      if (a >= 10000000) {
        c += (a / 10000000) >>> 0;
        a %= 10000000;
      }
      if (c >= 10000000) {
        b += (c / 10000000) >>> 0;
        c %= 10000000;
      }
      c = b + sb(c) + sb(a);
    }
    return c;
  }
  function sb(a) {
    a = String(a);
    return "0000000".slice(a.length) + a;
  }
  function qb(a, b) {
    b = ~b;
    if (a) {
      a = ~a + 1;
    } else {
      b += 1;
    }
    return [a, b];
  }
  const tb = typeof BigInt === "function" ? BigInt.asIntN : undefined;
  const ub = Number.isSafeInteger;
  const vb = Number.isFinite;
  const wb = Math.trunc;
  function xb(a) {
    if (typeof a !== "number") {
      throw Error(
        `Value of float/double field must be a number, found ${typeof a}: ${a}`,
      );
    }
    return a;
  }
  const yb = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function zb(a) {
    switch (typeof a) {
      case "bigint":
        return true;
      case "number":
        return vb(a);
      case "string":
        return yb.test(a);
      default:
        return false;
    }
  }
  function z(a) {
    if (a != null) {
      if (!vb(a)) {
        throw Ia("enum");
      }
      a |= 0;
    }
    return a;
  }
  function Ab(a) {
    if (typeof a !== "number") {
      throw Ia("int32");
    }
    if (!vb(a)) {
      throw Ia("int32");
    }
    return a | 0;
  }
  function A(a) {
    if (a == null) {
      return a;
    } else {
      return Ab(a);
    }
  }
  function Bb(a) {
    if (a == null) {
      return a;
    }
    if (typeof a === "string" && a) {
      a = +a;
    } else if (typeof a !== "number") {
      return;
    }
    if (vb(a)) {
      return a | 0;
    } else {
      return undefined;
    }
  }
  function B(a) {
    if (a != null && typeof a !== "string") {
      throw Error();
    }
    return a;
  }
  function Cb(a) {
    if (a == null || typeof a === "string") {
      return a;
    } else {
      return undefined;
    }
  }
  function Db(a, b, c, d) {
    if (a != null && typeof a === "object" && a.G === Za) {
      return a;
    }
    if (!Array.isArray(a)) {
      if (c) {
        if (d & 2) {
          if (!(a = b[Ma])) {
            a = new b();
            Ua(a.l);
            a = b[Ma] = a;
          }
          b = a;
        } else {
          b = new b();
        }
      } else {
        b = undefined;
      }
      return b;
    }
    let e = (c = a[u] | 0);
    if (e === 0) {
      e |= d & 32;
    }
    e |= d & 2;
    if (e !== c) {
      v(a, e);
    }
    return new b(a);
  }
  function Eb(a, b, c) {
    a = b ? Ab(a) : Bb(a);
    if (a == null) {
      if (c) {
        return 0;
      } else {
        return undefined;
      }
    } else {
      return a | 0;
    }
  }
  function Fb(a) {
    return a;
  }
  const Gb = {};
  let Hb = (function () {
    try {
      ya(
        new (class extends Map {
          constructor() {
            super();
          }
        })(),
      );
      return false;
    } catch (a) {
      return true;
    }
  })();
  class Ib {
    constructor() {
      this.g = new Map();
    }
    get(a) {
      return this.g.get(a);
    }
    set(a, b) {
      this.g.set(a, b);
      this.size = this.g.size;
      return this;
    }
    delete(a) {
      a = this.g.delete(a);
      this.size = this.g.size;
      return a;
    }
    clear() {
      this.g.clear();
      this.size = this.g.size;
    }
    has(a) {
      return this.g.has(a);
    }
    entries() {
      return this.g.entries();
    }
    keys() {
      return this.g.keys();
    }
    values() {
      return this.g.values();
    }
    forEach(a, b) {
      return this.g.forEach(a, b);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  }
  const Jb = (() =>
    Hb
      ? (Object.setPrototypeOf(Ib.prototype, Map.prototype),
        Object.defineProperties(Ib.prototype, {
          size: {
            value: 0,
            configurable: true,
            enumerable: true,
            writable: true,
          },
        }),
        Ib)
      : class extends Map {
          constructor() {
            super();
          }
        })();
  function Kb(a) {
    return a;
  }
  function Lb(a) {
    if (a.B & 2) {
      throw Error("Cannot mutate an immutable Map");
    }
  }
  var C = class extends Jb {
    constructor(a, b, c = Kb, d = Kb) {
      super();
      let e = a[u] | 0;
      e |= 64;
      v(a, e);
      this.B = e;
      this.A = b;
      this.C = c;
      this.I = this.A ? Mb : d;
      for (let f = 0; f < a.length; f++) {
        const g = a[f];
        const h = c(g[0], false, true);
        let k = g[1];
        if (b) {
          if (k === undefined) {
            k = null;
          }
        } else {
          k = d(g[1], false, true, undefined, undefined, e);
        }
        super.set(h, k);
      }
    }
    P() {
      var a = Nb;
      if (this.size !== 0) {
        return Array.from(super.entries(), (b) => {
          b[0] = a(b[0]);
          b[1] = a(b[1]);
          return b;
        });
      }
    }
    L(a = Ob) {
      const b = [];
      const c = super.entries();
      for (var d; !(d = c.next()).done; ) {
        d = d.value;
        d[0] = a(d[0]);
        d[1] = a(d[1]);
        b.push(d);
      }
      return b;
    }
    clear() {
      Lb(this);
      super.clear();
    }
    delete(a) {
      Lb(this);
      return super.delete(this.C(a, true, false));
    }
    entries() {
      if (this.A) {
        var a = super.keys();
        a = new bb(a, Pb, this);
      } else {
        a = super.entries();
      }
      return a;
    }
    values() {
      if (this.A) {
        var a = super.keys();
        a = new bb(a, C.prototype.get, this);
      } else {
        a = super.values();
      }
      return a;
    }
    forEach(a, b) {
      if (this.A) {
        super.forEach((c, d, e) => {
          a.call(b, e.get(d), d, e);
        });
      } else {
        super.forEach(a, b);
      }
    }
    set(a, b) {
      Lb(this);
      a = this.C(a, true, false);
      if (a == null) {
        return this;
      } else if (b == null) {
        super.delete(a);
        return this;
      } else {
        return super.set(a, this.I(b, true, true, this.A, false, this.B));
      }
    }
    has(a) {
      return super.has(this.C(a, false, false));
    }
    get(a) {
      a = this.C(a, false, false);
      const b = super.get(a);
      if (b !== undefined) {
        var c = this.A;
        if (c) {
          c = this.I(b, false, true, c, this.S, this.B);
          if (c !== b) {
            super.set(a, c);
          }
          return c;
        } else {
          return b;
        }
      }
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
  C.prototype.toJSON = undefined;
  function Mb(a, b, c, d, e, f) {
    a = Db(a, d, c, f);
    if (e) {
      a = Qb(a);
    }
    return a;
  }
  function Ob(a) {
    return a;
  }
  function Pb(a) {
    return [a, this.get(a)];
  }
  let Rb;
  function Sb() {
    return (Rb ||= new C(Ua([]), undefined, undefined, undefined, Gb));
  }
  function Tb(a, b, c) {
    const d = w(a);
    var e = d.length;
    const f = b & 256 ? d[e - 1] : undefined;
    e += f ? -1 : 0;
    for (b = b & 512 ? 1 : 0; b < e; b++) {
      d[b] = c(d[b]);
    }
    if (f) {
      b = d[b] = {};
      for (const g in f) {
        b[g] = c(f[g]);
      }
    }
    cb(d, a);
    return d;
  }
  function Ub(a, b, c, d, e) {
    if (a != null) {
      if (Array.isArray(a)) {
        const f = a[u] | 0;
        if (a.length === 0 && f & 1) {
          return undefined;
        } else if (e && f & 2) {
          return a;
        } else {
          return Vb(a, b, c, d !== undefined, e);
        }
      }
      return b(a, d);
    }
  }
  function Vb(a, b, c, d, e) {
    const f = d || c ? a[u] | 0 : 0;
    d = d ? !!(f & 32) : undefined;
    const g = w(a);
    let h = 0;
    const k = g.length;
    for (let L = 0; L < k; L++) {
      var p = g[L];
      if (L === k - 1 && $a(p)) {
        var M = b;
        var ja = c;
        var Hd = d;
        var Id = e;
        let Ya = undefined;
        for (let Zb in p) {
          const $b = Ub(p[Zb], M, ja, Hd, Id);
          if ($b != null) {
            (Ya ??= {})[Zb] = $b;
          }
        }
        p = Ya;
      } else {
        p = Ub(g[L], b, c, d, e);
      }
      g[L] = p;
      if (p != null) {
        h = L + 1;
      }
    }
    if (h < k) {
      g.length = h;
    }
    if (c) {
      cb(g, a);
      c(f, g);
    }
    return g;
  }
  function Nb(a) {
    return Ub(a, Wb, undefined, undefined, false);
  }
  function Wb(a) {
    switch (typeof a) {
      case "number":
        if (Number.isFinite(a)) {
          return a;
        } else {
          return "" + a;
        }
      case "bigint":
        if (nb(a)) {
          return Number(a);
        } else {
          return "" + a;
        }
      case "boolean":
        if (a) {
          return 1;
        } else {
          return 0;
        }
      case "object":
        if (Ea && a != null && a instanceof Uint8Array) {
          if (Ea && a != null && a instanceof Uint8Array) {
            Ja(Qa);
          }
          if (Fa) {
            var b = "";
            for (var c = 0, d = a.length - 10240; c < d; ) {
              b += String.fromCharCode.apply(null, a.subarray(c, (c += 10240)));
            }
            b += String.fromCharCode.apply(null, c ? a.subarray(c) : a);
            a = btoa(b);
          } else {
            if (b === undefined) {
              b = 0;
            }
            if (!Da) {
              Da = {};
              c =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
                  "",
                );
              d = ["+/=", "+/", "-_=", "-_.", "-_"];
              for (var e = 0; e < 5; e++) {
                var f = c.concat(d[e].split(""));
                Ca[e] = f;
                for (var g = 0; g < f.length; g++) {
                  var h = f[g];
                  if (Da[h] === undefined) {
                    Da[h] = g;
                  }
                }
              }
            }
            b = Ca[b];
            c = Array(Math.floor(a.length / 3));
            d = b[64] || "";
            for (e = f = 0; f < a.length - 2; f += 3) {
              var k = a[f];
              var p = a[f + 1];
              h = a[f + 2];
              g = b[k >> 2];
              k = b[((k & 3) << 4) | (p >> 4)];
              p = b[((p & 15) << 2) | (h >> 6)];
              h = b[h & 63];
              c[e++] = g + k + p + h;
            }
            g = 0;
            h = d;
            switch (a.length - f) {
              case 2:
                g = a[f + 1];
                h = b[(g & 15) << 2] || d;
              case 1:
                a = a[f];
                c[e] = b[a >> 2] + b[((a & 3) << 4) | (g >> 4)] + h + d;
            }
            a = c.join("");
          }
          return a;
        }
        if (a.G === Za) {
          return Xb(a);
        }
        if (a instanceof C) {
          return a.P();
        }
        return;
    }
    return a;
  }
  let Yb;
  function bc(a) {
    try {
      return Xb(a);
    } finally {
      Yb = undefined;
    }
  }
  function Xb(a) {
    var b = a.l;
    a = Vb(b, Wb, undefined, undefined, false);
    var c = b[u] | 0;
    if ((b = a.length) && !(c & 512)) {
      var d = a[b - 1];
      var e = false;
      if ($a(d)) {
        b--;
        e = true;
      } else {
        d = undefined;
      }
      var f;
      var g = (f = Yb) != null ? f : Fb;
      f = c & 512 ? 0 : -1;
      c = b - f;
      g = g(c, f, a, d);
      if (d) {
        a[b] = undefined;
      }
      if (c < g && d) {
        c = true;
        for (var h in d) {
          const k = +h;
          if (k <= g) {
            e = k + f;
            a[e] = d[h];
            b = Math.max(e + 1, b);
            e = false;
            delete d[h];
          } else {
            c = false;
          }
        }
        if (c) {
          d = undefined;
        }
      }
      for (c = b - 1; b > 0; c = b - 1) {
        h = a[c];
        if (h == null) {
          b--;
          e = true;
        } else {
          c -= f;
          if (c >= g) {
            (d ??= {})[c] = h;
            b--;
            e = true;
          } else {
            break;
          }
        }
      }
      if (e) {
        a.length = b;
      }
      if (d) {
        a.push(d);
      }
    }
    return a;
  }
  function cc() {
    Ja(Pa);
  }
  function dc(a, b, c = Wa) {
    if (a != null) {
      if (Ea && a instanceof Uint8Array) {
        if (b) {
          return a;
        } else {
          return new Uint8Array(a);
        }
      }
      if (Array.isArray(a)) {
        var d = a[u] | 0;
        if (d & 2) {
          return a;
        }
        b &&= d === 0 || (!!(d & 32) && !(d & 64) && !!(d & 16));
        if (b) {
          v(a, d | 34);
          if (d & 4) {
            Object.freeze(a);
          }
          return a;
        } else {
          return Vb(a, dc, d & 4 ? Wa : c, true, true);
        }
      }
      if (a.G === Za) {
        c = a.l;
        d = c[u] | 0;
        a = d & 2 ? a : new a.constructor(ec(c, d, true));
      } else if (a instanceof C && !(a.B & 2)) {
        c = Ua(a.L(dc));
        a = new C(c, a.A, a.C, a.I);
      }
      return a;
    }
  }
  function ec(a, b, c) {
    const d = c || b & 2 ? Wa : Va;
    const e = !!(b & 32);
    a = Tb(a, b, (f) => dc(f, e, d));
    Ta(a, (c ? 2 : 0) | 32);
    return a;
  }
  function Qb(a) {
    const b = a.l;
    const c = b[u] | 0;
    if (c & 2) {
      return new a.constructor(ec(b, c, false));
    } else {
      return a;
    }
  }
  function D(a, b) {
    a = a.l;
    return fc(a, a[u] | 0, b);
  }
  function fc(a, b, c) {
    if (c === -1) {
      return null;
    }
    const d = c + (b & 512 ? 0 : -1);
    const e = a.length - 1;
    if (d >= e && b & 256) {
      return a[e][c];
    }
    if (d <= e) {
      return a[d];
    }
  }
  function E(a, b, c) {
    const d = a.l;
    let e = d[u] | 0;
    ab(e);
    F(d, e, b, c);
    return a;
  }
  function F(a, b, c, d) {
    const e = b & 512 ? 0 : -1;
    const f = c + e;
    var g = a.length - 1;
    if (f >= g && b & 256) {
      a[g][c] = d;
      return b;
    }
    if (f <= g) {
      a[f] = d;
      return b;
    }
    if (d !== undefined) {
      g = (b >> 14) & 1023 || 536870912;
      if (c >= g) {
        if (d != null) {
          a[g + e] = {
            [c]: d,
          };
          b |= 256;
          v(a, b);
        }
      } else {
        a[f] = d;
      }
    }
    return b;
  }
  function gc(a, b, c) {
    return hc(a, b, ic(a, G, c)) !== undefined;
  }
  function jc(a, b) {
    this.set(b, a);
  }
  function kc(a, b, c, d) {
    const e = a.l;
    var f = e[u] | 0;
    ab(f);
    if (d == null) {
      var g = lc(e);
      if (mc(g, e, f, c) === b) {
        g.set(c, 0);
      } else {
        return a;
      }
    } else {
      g = lc(e);
      const h = mc(g, e, f, c);
      if (h !== b) {
        if (h) {
          f = F(e, f, h);
        }
        g.set(c, b);
      }
    }
    F(e, f, b, d);
    return a;
  }
  function ic(a, b, c) {
    a = a.l;
    if (mc(lc(a), a, a[u] | 0, b) === c) {
      return c;
    } else {
      return -1;
    }
  }
  function lc(a) {
    if (Ka) {
      var b;
      if ((b = a[Na]) != null) {
        return b;
      } else {
        return (a[Na] = new Map());
      }
    }
    if (Na in a) {
      return a[Na];
    }
    b = new Map();
    Object.defineProperty(a, Na, {
      value: b,
    });
    return b;
  }
  function mc(a, b, c, d) {
    let e = a.get(d);
    if (e != null) {
      return e;
    }
    e = 0;
    for (let f = 0; f < d.length; f++) {
      const g = d[f];
      if (fc(b, c, g) != null) {
        if (e !== 0) {
          c = F(b, c, e);
        }
        e = g;
      }
    }
    a.set(d, e);
    return e;
  }
  function hc(a, b, c) {
    a = a.l;
    let d = a[u] | 0;
    const e = fc(a, d, c);
    b = Db(e, b, false, d);
    if (b !== e && b != null) {
      F(a, d, c, b);
    }
    return b;
  }
  function H(a, b, c) {
    if (c == null) {
      c = undefined;
    }
    return E(a, b, c);
  }
  function I(a, b, c, d) {
    if (d == null) {
      d = undefined;
    }
    return kc(a, b, c, d);
  }
  function nc(a, b) {
    return Cb(D(a, b)) ?? "";
  }
  function oc(a, b) {
    a = D(a, b);
    a = a == null ? a : vb(a) ? a | 0 : undefined;
    return a ?? 0;
  }
  function J(a, b, c, d) {
    c = ic(a, d, c);
    b = hc(a, b, c);
    if (b != null && ((a = a.l), (d = a[u] | 0), !(d & 2))) {
      const e = Qb(b);
      if (e !== b) {
        b = e;
        F(a, d, c, b);
      }
    }
    c = b;
    return c;
  }
  function K(a, b, c) {
    if (c != null) {
      a: {
        if (!zb(c)) {
          throw Ia("int64");
        }
        switch (typeof c) {
          case "string":
            var d = wb(Number(c));
            if (ub(d)) {
              c = String(d);
            } else {
              d = c.indexOf(".");
              if (d !== -1) {
                c = c.substring(0, d);
              }
              d = c.length;
              if (
                !(c[0] === "-"
                  ? d < 20 || (d === 20 && Number(c.substring(0, 7)) > -922337)
                  : d < 19 || (d === 19 && Number(c.substring(0, 6)) < 922337))
              ) {
                if (c.length < 16) {
                  pb(Number(c));
                } else if (Xa()) {
                  c = BigInt(c);
                  x = Number(c & BigInt(4294967295)) >>> 0;
                  y = Number((c >> BigInt(32)) & BigInt(4294967295));
                } else {
                  d = +(c[0] === "-");
                  y = x = 0;
                  var e = c.length;
                  for (
                    let g = d, h = ((e - d) % 6) + d;
                    h <= e;
                    g = h, h += 6
                  ) {
                    var f = Number(c.slice(g, h));
                    y *= 1000000;
                    x = x * 1000000 + f;
                    if (x >= 4294967296) {
                      y += Math.trunc(x / 4294967296);
                      y >>>= 0;
                      x >>>= 0;
                    }
                  }
                  if (d) {
                    const [g, h] = qb(x, y);
                    x = g;
                    y = h;
                  }
                }
                c = x;
                d = y;
                if (d & -2147483648) {
                  if (Xa()) {
                    c = "" + ((BigInt(d | 0) << BigInt(32)) | BigInt(c >>> 0));
                  } else {
                    const [g, h] = qb(c, d);
                    c = "-" + rb(g, h);
                  }
                } else {
                  c = rb(c, d);
                }
              }
            }
            break a;
          case "bigint":
            d = c = tb(64, c);
            if (fb(d)) {
              if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(d)) {
                throw Error(String(d));
              }
            } else if (eb(d) && !Number.isSafeInteger(d)) {
              throw Error(String(d));
            }
            if (hb) {
              c = BigInt(c);
            } else {
              c = gb(c) ? (c ? "1" : "0") : fb(c) ? c.trim() || "0" : String(c);
            }
            break a;
          default:
            c = wb(c);
            if (!ub(c)) {
              pb(c);
              d = x;
              e = y;
              if ((c = e & -2147483648)) {
                d = (~d + 1) >>> 0;
                e = ~e >>> 0;
                if (d == 0) {
                  e = (e + 1) >>> 0;
                }
              }
              f = e * 4294967296 + (d >>> 0);
              d = Number.isSafeInteger(f) ? f : rb(d, e);
              c = typeof d === "number" ? (c ? -d : d) : c ? "-" + d : d;
            }
        }
      }
    }
    return E(a, b, c);
  }
  function pc(a, b, c) {
    var d = a.l;
    var e = d[u] | 0;
    ab(e);
    var f = fc(d, e, b);
    if (f instanceof C && (!(f instanceof C) || !(f.B & 2))) {
      f.clear();
    } else {
      F(d, e, b);
    }
    if (c) {
      ab(a.l[u] | 0);
      d = c.forEach;
      var g = a.l;
      var h = g[u] | 0;
      a: {
        e = g;
        f = h;
        var k = fc(g, h, b);
        h = f & 2;
        g = false;
        if (k == null) {
          if (h) {
            b = Sb();
            break a;
          }
          k = [];
        } else if (k.constructor === C) {
          if ((k.B & 2) == 0 || h) {
            b = k;
            break a;
          }
          k = k.L();
        } else if (Array.isArray(k)) {
          g = !!((k[u] | 0) & 2);
        } else {
          k = [];
        }
        if (h) {
          if (!k.length) {
            b = Sb();
            break a;
          }
          if (!g) {
            g = true;
            Ua(k);
          }
        } else if (g) {
          g = false;
          h = w(k);
          for (k = 0; k < h.length; k++) {
            const p = (h[k] = w(h[k]));
            if (Array.isArray(p[1])) {
              p[1] = Ua(p[1]);
            }
          }
          k = h;
        }
        if (!g) {
          if ((k[u] | 0) & 64) {
            k[u] &= -33;
          } else if (f & 32) {
            Ta(k, 32);
          }
        }
        g = new C(k, undefined, Eb, Eb);
        F(e, f, b, g);
        b = g;
      }
      d.call(c, jc, b);
    }
    return a;
  }
  var N = class {
    constructor(a) {
      a: {
        if (a == null) {
          var b = 96;
          a = [];
        } else {
          if (!Array.isArray(a)) {
            throw Error("narr");
          }
          b = a[u] | 0;
          if (!(b & 8192) && !!(b & 64) && !(b & 2)) {
            cc();
          }
          if (b & 1024) {
            throw Error("farr");
          }
          if (b & 64) {
            var c = a;
            break a;
          }
          var d = a;
          b |= 64;
          var e = d.length;
          if (e) {
            var f = e - 1;
            e = d[f];
            if ($a(e)) {
              b |= 256;
              const g = b & 512 ? 0 : -1;
              f -= g;
              if (f >= 1024) {
                throw Error("pvtlmt");
              }
              for (c in e) {
                const h = +c;
                if (h < f) {
                  d[h + g] = e[c];
                  delete e[c];
                }
              }
              b = (b & -16760833) | ((f & 1023) << 14);
            }
          }
        }
        v(a, b);
        c = a;
      }
      this.l = c;
    }
    toJSON() {
      return bc(this);
    }
  };
  N.prototype.G = Za;
  N.prototype.toString = function () {
    return this.l.toString();
  };
  class qc {
    constructor(a, b) {
      this.data = a;
      this.channel = b;
    }
  }
  function rc(a) {
    const b = new MessageChannel();
    sc(b.port1, a);
    return b;
  }
  function tc(a, b) {
    sc(a, b);
    return new uc(a);
  }
  class uc {
    constructor(a) {
      this.h = a;
    }
    g(a, b, c = []) {
      b = rc(b);
      this.h.postMessage(a, [b.port2].concat(c));
    }
  }
  function sc(a, b) {
    if (b) {
      a.onmessage = (c) => {
        var d = c.data;
        c = tc(c.ports[0]);
        b(new qc(d, c));
      };
    }
  }
  var vc = (function () {
    if (!m.addEventListener || !Object.defineProperty) {
      return false;
    }
    var a = false;
    var b = Object.defineProperty({}, "passive", {
      get: function () {
        a = true;
      },
    });
    try {
      const c = () => {};
      m.addEventListener("test", c, b);
      m.removeEventListener("test", c, b);
    } catch (c) {}
    return a;
  })();
  var wc = ({
    destination: a,
    origin: b,
    V: c,
    M: d = "ZNWN1d",
    onMessage: e,
  }) => {
    if (b === "*") {
      throw Error("Sending to wildcard origin not allowed.");
    }
    const f = rc(e);
    a.postMessage(
      c
        ? {
            n: d,
            t: c,
          }
        : d,
      b,
      [f.port2],
    );
    return tc(f.port1, e);
  };
  var xc = class {
    constructor(a) {
      this.h = a;
    }
    g(a, b, c) {
      this.h.g(bc(a), b, c);
    }
  };
  var zc = (a) => {
    var b = yc;
    return (c) => {
      const d = new b(c.data);
      return a(new qc(d, c.channel));
    };
  };
  var Ac = (a) => (b) => a(new qc(b.data, new xc(b.channel)));
  /*
  Copyright Google LLC
  SPDX-License-Identifier: Apache-2.0
  */
  let Bc = globalThis.trustedTypes;
  let Cc;
  function Dc() {
    let a = null;
    if (!Bc) {
      return a;
    }
    try {
      const b = (c) => c;
      a = Bc.createPolicy("goog#html", {
        createHTML: b,
        createScript: b,
        createScriptURL: b,
      });
    } catch (b) {}
    return a;
  }
  var Ec = class {
    constructor(a) {
      this.g = a;
    }
    toString() {
      return this.g + "";
    }
  };
  function Fc(a) {
    if (Cc === undefined) {
      Cc = Dc();
    }
    var b = Cc;
    return new Ec(b ? b.createScriptURL(a) : a);
  }
  function Gc(a, b) {
    var c = a.register;
    if (b instanceof Ec) {
      b = b.g;
    } else {
      throw Error("");
    }
    return c.call(a, b, undefined);
  }
  function Hc(a) {
    return String(a).replace(/\-([a-z])/g, function (b, c) {
      return c.toUpperCase();
    });
  }
  function Ic(a) {
    return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
      return c + d.toUpperCase();
    });
  }
  function Jc(a, ...b) {
    if (b.length === 0) {
      return Fc(a[0]);
    }
    let c = a[0];
    for (let d = 0; d < b.length; d++) {
      c += encodeURIComponent(b[d]) + a[d + 1];
    }
    return Fc(c);
  }
  function Kc(a, b) {
    this.type = a;
    this.target = b;
  }
  Kc.prototype.g = function () {};
  function Lc(a) {
    Kc.call(this, a ? a.type : "");
    this.relatedTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.h = null;
    if (a) {
      const b = (this.type = a.type);
      const c =
        a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : null;
      this.target = a.target || a.srcElement;
      let d = a.relatedTarget;
      if (!d) {
        if (b == "mouseover") {
          d = a.fromElement;
        } else if (b == "mouseout") {
          d = a.toElement;
        }
      }
      this.relatedTarget = d;
      if (c) {
        this.clientX = c.clientX !== undefined ? c.clientX : c.pageX;
        this.clientY = c.clientY !== undefined ? c.clientY : c.pageY;
        this.screenX = c.screenX || 0;
        this.screenY = c.screenY || 0;
      } else {
        this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
        this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
      }
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = a.pointerType;
      this.state = a.state;
      this.h = a;
      if (a.defaultPrevented) {
        Lc.K.g.call(this);
      }
    }
  }
  ka(Lc, Kc);
  Lc.prototype.g = function () {
    Lc.K.g.call(this);
    const a = this.h;
    if (a.preventDefault) {
      a.preventDefault();
    } else {
      a.returnValue = false;
    }
  };
  var Mc = "closure_listenable_" + ((Math.random() * 1000000) | 0);
  var Nc = 0;
  function Oc(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.h = e;
    this.key = ++Nc;
    this.g = this.F = false;
  }
  function Pc(a) {
    a.g = true;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.h = null;
  }
  function Qc(a) {
    this.src = a;
    this.g = {};
    this.h = 0;
  }
  Qc.prototype.add = function (a, b, c, d, e) {
    const f = a.toString();
    a = this.g[f];
    if (!a) {
      a = this.g[f] = [];
      this.h++;
    }
    var g;
    a: {
      for (g = 0; g < a.length; ++g) {
        const h = a[g];
        if (!h.g && h.listener == b && h.capture == !!d && h.h == e) {
          break a;
        }
      }
      g = -1;
    }
    if (g > -1) {
      b = a[g];
      if (!c) {
        b.F = false;
      }
    } else {
      b = new Oc(b, this.src, f, !!d, e);
      b.F = c;
      a.push(b);
    }
    return b;
  };
  var Rc = "closure_lm_" + ((Math.random() * 1000000) | 0);
  var Sc = {};
  var Tc = 0;
  function Uc(a, b, c, d, e) {
    if (d && d.once) {
      Vc(a, b, c, d, e);
    } else if (Array.isArray(b)) {
      for (let f = 0; f < b.length; f++) {
        Uc(a, b[f], c, d, e);
      }
    } else {
      c = Wc(c);
      if (a && a[Mc]) {
        a.g(b, c, ha(d) ? !!d.capture : !!d, e);
      } else {
        Xc(a, b, c, false, d, e);
      }
    }
  }
  function Xc(a, b, c, d, e, f) {
    if (!b) {
      throw Error("Invalid event type");
    }
    const g = ha(e) ? !!e.capture : !!e;
    let h = Yc(a);
    if (!h) {
      a[Rc] = h = new Qc(a);
    }
    c = h.add(b, c, d, g, f);
    if (!c.proxy) {
      d = Zc();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) {
        if (!vc) {
          e = g;
        }
        if (e === undefined) {
          e = false;
        }
        a.addEventListener(b.toString(), d, e);
      } else if (a.attachEvent) {
        a.attachEvent($c(b.toString()), d);
      } else if (a.addListener && a.removeListener) {
        a.addListener(d);
      } else {
        throw Error("addEventListener and attachEvent are unavailable.");
      }
      Tc++;
    }
  }
  function Zc() {
    function a(c) {
      return b.call(a.src, a.listener, c);
    }
    const b = ad;
    return a;
  }
  function Vc(a, b, c, d, e) {
    if (Array.isArray(b)) {
      for (let f = 0; f < b.length; f++) {
        Vc(a, b[f], c, d, e);
      }
    } else {
      c = Wc(c);
      if (a && a[Mc]) {
        a.h(b, c, ha(d) ? !!d.capture : !!d, e);
      } else {
        Xc(a, b, c, true, d, e);
      }
    }
  }
  function $c(a) {
    if (a in Sc) {
      return Sc[a];
    } else {
      return (Sc[a] = "on" + a);
    }
  }
  function ad(a, b) {
    if (a.g) {
      a = true;
    } else {
      b = new Lc(b, this);
      const g = a.listener;
      const h = a.h || a.src;
      if (a.F && typeof a !== "number" && a && !a.g) {
        var c = a.src;
        if (c && c[Mc]) {
          c.i(a);
        } else {
          var d = a.type;
          var e = a.proxy;
          if (c.removeEventListener) {
            c.removeEventListener(d, e, a.capture);
          } else if (c.detachEvent) {
            c.detachEvent($c(d), e);
          } else if (c.addListener && c.removeListener) {
            c.removeListener(e);
          }
          Tc--;
          if ((d = Yc(c))) {
            e = a.type;
            var f;
            if ((f = e in d.g)) {
              f = d.g[e];
              const k = xa(f, a);
              let p;
              if ((p = k >= 0)) {
                Array.prototype.splice.call(f, k, 1);
              }
              f = p;
            }
            if (f) {
              Pc(a);
              if (d.g[e].length == 0) {
                delete d.g[e];
                d.h--;
              }
            }
            if (d.h == 0) {
              d.src = null;
              c[Rc] = null;
            }
          } else {
            Pc(a);
          }
        }
      }
      a = g.call(h, b);
    }
    return a;
  }
  function Yc(a) {
    a = a[Rc];
    if (a instanceof Qc) {
      return a;
    } else {
      return null;
    }
  }
  var bd = "__closure_events_fn_" + ((Math.random() * 1000000000) >>> 0);
  function Wc(a) {
    if (typeof a === "function") {
      return a;
    }
    a[bd] ||= function (b) {
      return a.handleEvent(b);
    };
    return a[bd];
  }
  function O(a, b) {
    if (typeof b === "string") {
      if ((b = cd(a, b))) {
        a.style[b] = "none";
      }
    } else {
      for (const e in b) {
        var c = a;
        var d = b[e];
        const f = cd(c, e);
        if (f) {
          c.style[f] = d;
        }
      }
    }
  }
  var dd = {};
  function cd(a, b) {
    let c = dd[b];
    if (!c) {
      var d = Hc(b);
      c = d;
      if (a.style[d] === undefined) {
        d = (Ba ? "Webkit" : Aa ? "Moz" : null) + Ic(d);
        if (a.style[d] !== undefined) {
          c = d;
        }
      }
      dd[b] = c;
    }
    return c;
  }
  var ed = class extends N {};
  var fd = class extends N {};
  var gd = class extends N {};
  var hd = class extends N {};
  var id = [3, 4];
  var jd = class extends N {};
  function kd(a, b) {
    {
      const p = a.l;
      let M = p[u] | 0;
      ab(M);
      if (b == null) {
        F(p, M, 1);
      } else {
        var c = b[u] | 0;
        var d = c;
        var e = (!!(c & 2) && !!(c & 4)) || !!(c & 1024);
        var f = e || Object.isFrozen(b);
        var g = true;
        var h = true;
        for (let ja = 0; ja < b.length; ja++) {
          var k = b[ja];
          if (!e) {
            k = !!((k.l[u] | 0) & 2);
            g &&= !k;
            h &&= k;
          }
        }
        if (!e) {
          c = g ? 13 : 5;
          c = h ? c | 16 : c & -17;
        }
        if (!f || c !== d) {
          b = w(b);
          d = 0;
          c = M & 2 ? c | 2 : c & -3;
          c = (c | 32) & -1025;
          if (!(M & 32)) {
            c &= -33;
          }
        }
        if (c !== d) {
          v(b, c);
        }
        F(p, M, 1, b);
      }
    }
    return a;
  }
  var ld = class extends N {};
  function md(a) {
    var b = new nd();
    if (a != null && typeof a !== "boolean") {
      b = typeof a;
      throw Error(
        `Expected boolean but got ${b != "object" ? b : a ? (Array.isArray(a) ? "array" : b) : "null"}: ${a}`,
      );
    }
    return E(b, 2, a);
  }
  var nd = class extends N {};
  var od = class extends N {};
  var pd = class extends N {};
  var qd = class extends N {};
  function rd(a) {
    var b = new sd();
    return E(b, 1, z(a));
  }
  function td(a, b) {
    return H(a, 2, b);
  }
  function ud(a) {
    var b = vd();
    b = wd(b.o);
    return H(a, 4, b);
  }
  var sd = class extends N {};
  var xd = [3];
  var yd = class extends N {};
  var zd = class extends N {};
  var Ad = class extends N {
    getInviteCode() {
      return nc(this, 1);
    }
    hasInviteCode() {
      return Cb(D(this, 1)) != null;
    }
  };
  var P = class extends N {
    getLanguage() {
      return nc(this, ic(this, Bd, 4));
    }
  };
  var Bd = [3, 4, 5, 6];
  var yc = class extends N {};
  var G = [2, 3, 4, 5];
  var Cd = class extends N {};
  var Dd = class extends N {};
  function Ed(a, b) {
    return K(a, 1, b);
  }
  function Fd(a, b) {
    return E(a, 3, b == null ? b : xb(b));
  }
  function Gd(a, b) {
    return E(a, 4, b == null ? b : xb(b));
  }
  function Jd(a, b) {
    return H(a, 5, b);
  }
  function Kd(a, b) {
    return H(a, 6, b);
  }
  var Ld = class extends N {};
  var Md = class extends N {};
  var Nd = class extends N {};
  function Q(a) {
    var b = new Od();
    return E(b, 1, z(a));
  }
  function Pd(a, b) {
    return I(a, 2, R, b);
  }
  function Qd(a, b) {
    return I(a, 5, R, b);
  }
  function Rd(a, b) {
    return I(a, 10, R, b);
  }
  var Od = class extends N {
    getInviteCode() {
      return nc(this, ic(this, R, 11));
    }
    hasInviteCode() {
      var a = ic(this, R, 11);
      return Cb(D(this, a)) != null;
    }
  };
  var R = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  var Sd = {
    UNKNOWN: 0,
    API_UNAVAILABLE: 1,
    INVALID_PARAMS: 2,
    SIZE_LIMIT_EXCEEDED: 3,
    0: "UNKNOWN",
    1: "API_UNAVAILABLE",
    2: "INVALID_PARAMS",
    3: "SIZE_LIMIT_EXCEEDED",
  };
  var S = class extends Error {
    constructor(a, b) {
      super(b);
      this.errorType = a;
      this.name = `SDK_ERROR_${Sd[this.errorType]}`;
    }
  };
  var Td = new S(0, "An unknown error occurred.");
  var T = new S(2, "Invalid parameters entered, please fix and try again.");
  var Ud = new S(
    1,
    "Unspecified network error. Check your internet connection and try again.",
  );
  var Vd = new S(3, "Size limit exceeded.");
  var Wd = new S(0, "Resource URL is malformed");
  var Xd = new S(
    1,
    "The requested Ad failed to load. Check your network and try again.",
  );
  function Yd(a) {
    switch (a) {
      case 1:
        return "SDK_API_FIRST_FRAME_READY";
      case 2:
        return "SDK_API_LOAD_DATA";
      case 3:
        return "SDK_API_SAVE_DATA";
      case 4:
        return "SDK_API_SEND_SCORE";
      case 5:
        return "SDK_API_ON_AUDIO_ENABLED_CHANGE";
      case 6:
        return "SDK_API_ON_PAUSE";
      case 7:
        return "SDK_API_ON_RESUME";
      case 8:
        return "SDK_API_GET_LANGUAGE";
      case 9:
        return "SDK_API_GAME_READY";
      case 10:
        return "SDK_API_IS_AUDIO_ENABLED";
      case 11:
        return "SDK_API_BENCHMARKING";
    }
    return "SDK_API_UNSPECIFIED";
  }
  var U = class extends S {
    constructor(a, b, c, d) {
      super(a.errorType, c ?? a.message);
      this.v = a;
      this.g = b;
      this.data = d;
      this.name = `${this.name}_${Yd(b)}`;
    }
  };
  function V(a, b) {
    let c = Td;
    if (gc(a, P, 2)) {
      switch (oc(J(a, P, 2, G), 2)) {
        case 1:
          return;
        case 2:
          c = T;
          break;
        case 3:
          if (b === 14) {
            c = Xd;
            break;
          }
          c = Ud;
          break;
        case 4:
          console.warn(
            "The SDK is no-op, if you are trying to verify SDK integration please use the SDK Test Suite available at https://developers.google.com/youtube/gaming/playables/certification/sdktestsuite",
          );
          return;
        default:
          c = Td;
      }
    }
    throw new U(c, b);
  }
  function Zd(a, b) {
    const c = (d) => {
      if (d instanceof $d) {
        b(d.g);
      }
    };
    a.g.addEventListener(a.type, c);
    if (a.h !== undefined) {
      a.dispatchEvent(a.h);
    }
    return () => {
      a.g.removeEventListener(a.type, c);
    };
  }
  var ae = class {
    constructor(a, b) {
      this.type = a;
      this.g = new EventTarget();
      this.H = (b == null ? undefined : b.H) ?? true;
      if ((b == null ? undefined : b.J) !== undefined) {
        this.dispatchEvent(b == null ? undefined : b.J);
      }
    }
    dispatchEvent(a) {
      this.g.dispatchEvent(new $d(this.type, a));
      if (this.H) {
        this.h = a;
      }
    }
  };
  class $d extends Event {
    constructor(a, b) {
      super(a);
      this.g = b;
    }
  }
  var be;
  var ce;
  var de = new yc();
  ce = E(de, 1, z(1));
  var ee;
  var fe = new P();
  ee = E(fe, 2, z(4));
  be = I(ce, 2, G, ee);
  var ge = new qc(be, tc(new MessageChannel().port2));
  function W() {
    var a = typeof window !== "undefined" && window !== window.parent;
    he ||= new ie(a);
    if (he.g !== a) {
      throw Error(`MessagingService is already created with isEmbedded=${!a}`);
    }
    return he;
  }
  function je(a, b) {
    Zd(a.target, b);
  }
  function X(a, b, c = () => {}) {
    if (a.g) {
      a.channel.g(b, Ac(zc(c)));
    } else {
      c(ge);
    }
  }
  function Y(a, b) {
    return new Promise((c) => {
      X(a, b, c);
    });
  }
  var ie = class {
    constructor(a) {
      this.g = a;
      this.target = new ae("HOST_EVENT", {
        H: false,
      });
      a =
        typeof window !== "undefined" && window.location
          ? new URLSearchParams(window.location.hash.substring(1)).get(
              "origin",
            ) || (typeof document !== "undefined" ? document.referrer : "")
          : "";
      this.channel = new xc(
        wc({
          destination: window.parent,
          origin: this.g ? a : window.location.origin,
          M: "playableIframe",
          onMessage: Ac(
            zc((b) => {
              this.target.dispatchEvent(b);
            }),
          ),
        }),
      );
    }
  };
  var he;
  const ke = {
    UNKNOWN: 0,
    SHOWED: 1,
    REJECTED: 3,
    DISMISSED: 2,
    0: "UNKNOWN",
    1: "SHOWED",
    3: "REJECTED",
    2: "DISMISSED",
  };
  function le(a) {
    switch (a) {
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 2;
      default:
        return 0;
    }
  }
  var me = class {
    constructor() {
      this.g = W();
      this.AdResult = ke;
    }
    requestAd() {
      const a = this;
      return l(
        (function* () {
          const b = yield Y(a.g, Q(14));
          V(b.data, 14);
          let c;
          let d;
          return le(
            (c = J(b.data, P, 2, G)) == null
              ? undefined
              : (d = J(c, ed, 6, Bd)) == null
                ? undefined
                : oc(d, 1),
          );
        })(),
      );
    }
  };
  var ne = typeof window !== "undefined" && window !== window.parent;
  var oe = class {
    constructor() {
      this.SDK_VERSION = "1.20250303.0000";
      this.IN_PLAYABLES_ENV = ne;
      this.SdkError = S;
      this.SdkErrorType = Sd;
    }
  };
  function pe() {
    return Promise.resolve();
  }
  var qe = class {
    constructor() {
      this.g = W();
    }
    sendScore(a) {
      const b = this;
      return l(
        (function* () {
          if (!Number.isInteger(a.value)) {
            throw new U(
              T,
              4,
              `Score value must be an integer and the value entered was: ${a.value}`,
            );
          }
          if (!Number.isSafeInteger(a.value)) {
            throw new U(
              T,
              4,
              `Score value must be less than the maximum safe integer in Javascript ${Number.MAX_SAFE_INTEGER} and the value entered was: ${a.value}`,
            );
          }
          var c = b.g;
          var d = Q(2);
          var e = new Md();
          e = K(e, 1, a.value);
          d = I(d, 3, R, e);
          c = yield Y(c, d);
          V(c.data, 4);
        })(),
      );
    }
    openYTContent(a) {
      return pe(this.g, a);
    }
  };
  function re(a) {
    a.h = 0;
    a.g = 0;
    a.i = a.index;
  }
  function se(a, b) {
    if (a.index === a.i && a.g > 0) {
      a.h -= a.j[a.index];
      a.g--;
      a.i++;
      if (a.i >= a.j.length) {
        a.i = 0;
      }
    }
    a.j[a.index] = b;
    a.h += b;
    a.g++;
    a.index++;
    if (a.index >= a.j.length) {
      a.index = 0;
    }
  }
  function te(a) {
    if (a.g === 0) {
      return 0;
    } else {
      return a.h / a.g;
    }
  }
  var ue = class {
    constructor(a) {
      this.index = this.i = this.g = this.h = 0;
      this.j = Array(a);
    }
  };
  function ve(a) {
    const b = performance.now();
    if (a.h > 0) {
      se(a.g, b - a.h);
    } else if (a.j !== 0) {
      se(a.g, 0);
      clearTimeout(a.j);
    }
    a.h = -1;
    a.j = setTimeout(() => {
      a.h = performance.now();
    }, 0);
    if (a.m > 0) {
      se(a.i, b - a.m);
    }
    a.m = b;
    requestAnimationFrame(() => {
      ve(a);
    });
  }
  function we(a) {
    requestAnimationFrame(() => {
      ve(a);
    });
  }
  var xe = class {
    constructor() {
      this.h = this.m = -1;
      this.j = 0;
      this.i = new ue(3600);
      this.g = new ue(3600);
    }
  };
  function ye(a) {
    setInterval(() => {
      const b = (window.performance && window.performance.memory) || null;
      if (b) {
        se(a.g, b.usedJSHeapSize);
      }
    }, 5000);
  }
  function ze(a) {
    var b = new Dd();
    return K(b, 1, te(a.g));
  }
  var Ae = class {
    constructor() {
      this.g = new ue(12);
    }
  };
  function Be(a) {
    a.navigator = window.navigator;
    if (
      typeof performance.getEntriesByType === "function" &&
      "encodedBodySize" in PerformanceResourceTiming.prototype &&
      "decodedBodySize" in PerformanceResourceTiming.prototype &&
      "transferSize" in PerformanceResourceTiming.prototype
    ) {
      new PerformanceObserver((b) => {
        b.getEntries().forEach((c) => {
          if (
            c.entryType === "resource" &&
            !c.name.includes("https://www.youtube.com/game_api")
          ) {
            a.o++;
            a.j += c.encodedBodySize;
            if (c.transferSize === 0 && c.decodedBodySize > 0) {
              a.m++;
            }
            const f = Z(c.responseStatus);
            if (!(f >= 100) || !(f < 200)) {
              try {
                var d = new URL(c.name);
              } catch (g) {
                throw Wd;
              }
              if (window.location.origin === d.origin) {
                a.h.set(f, (a.h.get(f) || 0) + 1);
              } else {
                a.g.set(f, (a.g.get(f) || 0) + 1);
              }
            }
            var e;
            if ((e = a.D) != null) {
              e.call(a, c);
            }
          }
        });
      }).observe({
        type: "resource",
        buffered: true,
      });
      if (
        a.navigator &&
        "serviceWorker" in a.navigator &&
        a.navigator.serviceWorker.addEventListener
      ) {
        a.navigator.serviceWorker.addEventListener("message", (b) => {
          a.u++;
          if (b.data.cacheHit) {
            a.s++;
            a.i += b.data.cachedBytes;
          }
        });
      }
    }
  }
  function Ce(a, b) {
    a.D = b;
  }
  function Z(a) {
    if (a != null && typeof a === "number" && Number.isFinite(a)) {
      return Math.floor(a);
    } else {
      return 0;
    }
  }
  function wd(a) {
    var b = new pd();
    var c = Z(a.o);
    b = E(b, 1, A(c));
    c = Z(a.m);
    b = E(b, 2, A(c));
    c = Z(a.j);
    b = E(b, 3, A(c));
    b = pc(b, 4, a.h);
    b = pc(b, 5, a.g);
    c = new od();
    var d = Z(a.u);
    c = K(c, 1, d);
    d = Z(a.s);
    c = K(c, 2, d);
    a = Z(a.i);
    a = K(c, 3, a);
    return H(b, 6, a);
  }
  var De = class {
    constructor() {
      this.navigator = window.navigator;
      this.h = new Map();
      this.g = new Map();
      this.i = this.s = this.u = this.j = this.m = this.o = 0;
      this.D = null;
    }
  };
  function vd() {
    Ee ||= new Fe();
    return Ee;
  }
  function Ge(a) {
    if (a.i !== 0) {
      a.i = 0;
      He(a);
      a.h = setTimeout(() => {
        Ie(a);
      }, 30000);
    }
  }
  function Je(a) {
    const b =
      new URLSearchParams(window.location.hash.substring(1)).get("debug") !==
      null;
    if (b || window.enableSendingResourceLoadedEvents === true) {
      Ce(a.o, (c) => {
        var d = a.u;
        var e = Q(1);
        var f = rd(3);
        var g = new qd();
        g = E(g, 1, B(c.name));
        g = E(g, 2, A(c.decodedBodySize));
        g = E(g, 3, A(c.encodedBodySize));
        c = E(g, 4, A(c.transferSize));
        f = I(f, 3, xd, c);
        X(d, Pd(e, f));
      });
    }
    we(a.g);
    Be(a.o);
    Be(a.m);
    if (b) {
      ye(a.j);
    }
    Ge(a);
  }
  function He(a) {
    a.s = performance.now();
    var b = a.g;
    re(b.i);
    re(b.g);
    b = a.m;
    b.o = 0;
    b.m = 0;
    b.j = 0;
    b.u = 0;
    b.s = 0;
    b.i = 0;
    b.h.clear();
    b.g.clear();
    re(a.j.g);
  }
  function Ie(a) {
    X(
      W(),
      Rd(
        Q(12),
        Kd(
          Jd(
            Gd(
              Fd(K(Ed(new Ld(), a.s), 2, performance.now()), te(a.g.i)),
              te(a.g.g),
            ),
            wd(a.m),
          ),
          ze(a.j),
        ),
      ),
    );
    He(a);
    a.h = setTimeout(() => {
      Ie(a);
    }, 30000);
  }
  var Fe = class {
    constructor() {
      this.s = this.h = 0;
      this.i = 1;
      this.u = W();
      this.g = new xe();
      this.o = new De();
      this.m = new De();
      this.j = new Ae();
    }
  };
  var Ee;
  function Ke() {
    Le ||= new Me();
    return Le;
  }
  function Ne(a) {
    if (
      a.navigator &&
      "serviceWorker" in a.navigator &&
      a.navigator.serviceWorker.addEventListener
    ) {
      a.navigator.serviceWorker.addEventListener("message", (b) => {
        if (b.data.serviceWorkerMessageKind === "clientStatusRequest") {
          Oe(a);
        }
      });
    }
  }
  function Oe(a) {
    if (
      a.navigator &&
      "serviceWorker" in a.navigator &&
      a.navigator.serviceWorker.controller
    ) {
      a.navigator.serviceWorker.controller.postMessage({
        serviceWorkerMessageKind: "clientStatus",
        shouldCacheResources: a.shouldCacheResources,
      });
    }
  }
  function Pe(a) {
    Ne(a);
    Oe(a);
  }
  var Me = class {
    constructor() {
      this.navigator = window.navigator;
      this.shouldCacheResources = true;
    }
  };
  var Le;
  var Qe = class {
    constructor() {
      this.log = () => {};
    }
  };
  function Re(a) {
    switch (a) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 5;
      default:
        return 0;
    }
  }
  function Se(a) {
    switch (a.errorType) {
      case 2:
        return 2;
      case 1:
        return 1;
      case 3:
        return 3;
      default:
        return 0;
    }
  }
  function Te(a, b) {
    var c = Q(9);
    var d = new Nd();
    b = E(d, 1, z(b));
    c = I(c, 8, R, b);
    X(a, c);
  }
  var Ue = class {
    constructor() {
      this.h = ne;
      this.i = new ae("GAME_DATA_EVENT");
      this.g = W();
      this.j = Ke();
      je(this.g, (a) => {
        switch (oc(a.data, 1)) {
          case 7:
            if (gc(a.data, Ad, 5)) {
              this.i.dispatchEvent(J(a.data, Ad, 5, G));
            }
        }
      });
    }
    saveData(a) {
      const b = this;
      return l(
        (function* () {
          if (b.h) {
            try {
              encodeURIComponent(a);
            } catch (f) {
              throw new U(T, 3, "Failed to encode save data");
            }
            var c = new Blob([a]).size;
            if (c > 3145727) {
              var d = new hd();
              c = kc(d, 3, id, A(c));
              throw new U(Vd, 3, undefined, c);
            }
            c = b.g;
            d = Q(3);
            var e = new fd();
            e = E(e, 1, B(a));
            d = I(d, 4, R, e);
            c = yield Y(c, d);
            V(c.data, 3);
          }
        })(),
      );
    }
    loadData() {
      const a = this;
      return l(
        (function* () {
          if (!a.h) {
            return "";
          }
          const b = yield Y(a.g, Q(4));
          V(b.data, 2);
          let c;
          let d;
          return (
            ((c = J(b.data, P, 2, G)) == null
              ? undefined
              : (d = J(c, fd, 3, Bd)) == null
                ? undefined
                : nc(d, 1)) || ""
          );
        })(),
      );
    }
    firstFrameReady() {
      var a = Array.from(document.getElementsByTagName("script")).filter(
        (b) => !b.src.endsWith("/@vite/client"),
      )[0];
      a =
        !!a &&
        a.src.startsWith("https://www.youtube.com/game_api/") &&
        a.attributes.getNamedItem("defer") === null &&
        a.attributes.getNamedItem("async") === null;
      X(this.g, Pd(Q(1), ud(td(rd(1), md(a)))));
    }
    gameReady() {
      X(this.g, Pd(Q(1), ud(rd(2))));
      var a = this.j;
      const b = a.shouldCacheResources !== false;
      a.shouldCacheResources = false;
      if (b) {
        Oe(a);
      }
    }
    onGameDataAvailable(a) {
      Te(this.g, 13);
      return Zd(this.i, a);
    }
    shareInviteCode(a) {
      const b = this;
      return l(
        (function* () {
          if (a.length === 0) {
            throw new U(T, 12, "Invite code cannot be empty");
          }
          if (new TextEncoder().encode(a).length > 8) {
            throw new U(T, 12, "Invite code provided exceeded 8 bytes");
          }
          var c = b.g;
          var d = Q(13);
          d = kc(d, 11, R, B(a));
          c = yield Y(c, d);
          V(c.data, 12);
        })(),
      );
    }
  };
  function Ve(a, b) {
    const c = {
      level: 1,
      source: 1,
    };
    if (b) {
      c.v = b;
      c.source = 3;
      c.message = b.message;
      c.O = b.stack;
    }
    a.h.log(c);
  }
  var We = class {
    constructor(a) {
      var b = window;
      this.h = a;
      this.g = b;
      this.i = false;
      this.j = (c) => {
        Ve(this, c.reason instanceof S ? c.reason : undefined);
      };
      this.o = this.g.onerror;
      this.s = this.g.console.warn;
      this.m = this.g.console.error;
    }
    install() {
      if (!this.i) {
        this.i = true;
        this.g.onerror = (a, b, c, d, e) => {
          let f;
          if ((f = this.o) != null) {
            f.call(this.g, a, b, c, d, e);
          }
          Ve(this, e instanceof S ? e : undefined);
        };
        this.g.console.warn = (...a) => {
          this.warn(...a);
        };
        this.g.console.error = (...a) => {
          this.error(...a);
        };
        this.g.addEventListener("unhandledrejection", this.j);
      }
    }
    error(...a) {
      this.h.log({
        level: 1,
        source: 0,
      });
      this.m(...a);
    }
    warn(...a) {
      this.h.log({
        level: 0,
        source: 0,
      });
      this.s(...a);
    }
  };
  function Xe(a, b) {
    X(
      a.h,
      Qd(
        Q(6),
        kd(
          new ld(),
          b.map((c, d) => {
            c = b[b.length - 1 - d];
            d = new jd();
            a: switch (c.level) {
              case 0:
                var e = 1;
                break a;
              case 1:
                e = 2;
                break a;
              default:
                e = 0;
            }
            d = E(d, 2, z(e));
            d = E(d, 1, z(Re(c.source)));
            if (c.v) {
              e = E(d, 6, z(Se(c.v)));
              e = E(e, 4, B(c.message));
              E(e, 5, B(c.O));
              if (c.v instanceof U && c.v.g !== 0) {
                E(d, 7, z(c.v.g));
                if (c.v.data) {
                  H(d, 8, c.v.data);
                }
              }
            }
            return d;
          }),
        ),
      ),
    );
  }
  var Ye = class {
    constructor() {
      this.g = undefined;
      this.h = W();
      this.g = new Qe();
      this.g.log = this.log.bind(this);
      this.i = new We(this.g);
      this.i.install();
    }
    logError() {
      this.log({
        level: 1,
        source: 2,
      });
    }
    logWarning() {
      this.log({
        level: 0,
        source: 2,
      });
    }
    log(a) {
      Xe(this, [a]);
    }
  };
  const Ze = {
    disableConsoleLog: false,
    enableNerdStats: false,
    enableServiceWorker: false,
    enableServiceWorkerKillswitch: false,
  };
  function $e(a) {
    if (typeof a === "boolean") {
      return a;
    } else {
      return false;
    }
  }
  let af = null;
  function bf() {
    if (af) {
      return af;
    }
    af = Ze;
    const b = window.sdkFlags ?? "";
    if (b) {
      let c;
      try {
        c = JSON.parse(b);
      } catch (d) {
        console.error("Failed to parse flags.", d, " Flags string: ", b);
        return af;
      }
      if (typeof c === "object" && c && Object.keys(c).length > 0) {
        af = {
          disableConsoleLog: $e(c.disableConsoleLog),
          enableNerdStats: $e(c.enableNerdStats),
          enableServiceWorker: $e(c.enableServiceWorker),
          enableServiceWorkerKillswitch: $e(c.enableServiceWorkerKillswitch),
        };
      }
    }
    return af;
  }
  function cf() {
    l(
      (function* () {
        try {
          yield Gc(navigator.serviceWorker, Jc`/null_sw.js`);
        } catch (a) {
          console.error("Failed to register null service worker.", a);
        }
      })(),
    );
  }
  function df() {
    l(
      (function* () {
        try {
          yield Gc(navigator.serviceWorker, Jc`/sw.js`);
        } catch (a) {
          console.error("Failed to register service worker.", a);
        }
      })(),
    );
  }
  function ef(a) {
    l(
      (function* () {
        try {
          yield ff();
        } catch (b) {
          console.error("Failed to unregister service worker.", b);
        }
        try {
          yield gf(a);
        } catch (b) {
          console.error("Failed to delete cache entries.", b);
        }
      })(),
    );
  }
  function ff() {
    return l(
      (function* () {
        if (navigator && "serviceWorker" in navigator) {
          try {
            var a = yield navigator.serviceWorker.getRegistrations();
            if (a && Array.isArray(a)) {
              for (var b = 0; b < a.length; b++) {
                try {
                  yield a[b].unregister();
                } catch (c) {}
              }
            }
          } catch (c) {}
        }
      })(),
    );
  }
  function gf(a) {
    return l(
      (function* () {
        if (a && "keys" in a) {
          var b = yield a.keys();
          if (b) {
            yield Promise.all(b.map((c) => a.delete(c)));
          }
        }
      })(),
    );
  }
  var hf = class {
    constructor() {
      var a = window.caches;
      if (ne) {
        if (bf().enableServiceWorker) {
          if (bf().enableServiceWorkerKillswitch) {
            cf();
          } else {
            df();
          }
        } else {
          ef(a);
        }
      }
    }
  };
  var jf = class {
    constructor() {
      this.j = ne;
      this.m = new ae("AUDIO_EVENT", {
        J: true,
      });
      this.o = false;
      this.g = W();
      this.i = vd();
      this.D = Ke();
      this.h = new ae("LIFECYCLE_EVENT");
      this.u = 10000;
      this.s = 0;
      je(this.g, (a) => {
        switch (oc(a.data, 1)) {
          case 2:
            var b;
            if ((b = J(a.data, yd, 3, G)) == null) {
              b = undefined;
            } else {
              b = D(b, 1);
              b =
                b == null || typeof b === "boolean"
                  ? b
                  : typeof b === "number"
                    ? !!b
                    : undefined;
              b = b ?? false;
            }
            if (this.j && b !== undefined) {
              this.m.dispatchEvent(b);
              this.o = b;
            }
            break;
          case 3:
            this.h.dispatchEvent(1);
            b = this.i;
            b.i = 1;
            clearTimeout(b.h);
            b.h = 0;
            break;
          case 4:
            this.h.dispatchEvent(0);
            Ge(this.i);
            break;
          case 5:
            if (gc(a.data, zd, 4)) {
              a = J(a.data, zd, 4, G);
              this.u = (b = Bb(D(a, 1))) != null ? b : 0;
            }
            b = this.g;
            a = Q(8);
            var c = new Cd();
            c = E(c, 1, B("1.20250303.0000"));
            a = I(a, 7, R, c);
            X(b, a);
        }
      });
      Uc(
        window,
        "pointerdown",
        (a) => {
          if (!!a.h.isTrusted && !(Date.now() - this.s < this.u)) {
            this.s = Date.now();
            X(this.g, Q(10));
          }
        },
        true,
      );
      Je(this.i);
      Pe(this.D);
    }
    onAudioEnabledChange(a) {
      Te(this.g, 5);
      return Zd(this.m, a);
    }
    isAudioEnabled() {
      if (!this.j) {
        return true;
      }
      Te(this.g, 10);
      return this.o;
    }
    onPause(a) {
      if (!a.T) {
        Te(this.g, 6);
      }
      return Zd(this.h, (b) => {
        if (b === 1) {
          a();
        }
      });
    }
    onResume(a) {
      Te(this.g, 7);
      return Zd(this.h, (b) => {
        if (b === 0) {
          a();
        }
      });
    }
    getLanguage() {
      const a = this;
      return l(
        (function* () {
          const b = yield Y(a.g, Q(5));
          V(b.data, 8);
          let c;
          return (
            ((c = J(b.data, P, 2, G)) == null ? undefined : c.getLanguage()) ||
            "en"
          );
        })(),
      );
    }
  };
  const kf = new (class {
    constructor(
      a = ne,
      b = new oe(),
      c = new me(),
      d = new qe(),
      e = new Ue(),
      f = new Ye(),
      g = new jf(),
      h = new hf(),
    ) {
      this.g = a;
      this.h = b;
      this.ads = c;
      this.engagement = d;
      this.game = e;
      this.health = f;
      this.system = g;
      if (typeof document !== "undefined") {
        document.addEventListener("DOMContentLoaded", () => {
          const k = document.body;
          O(k, "touch-action");
          O(k, "overscroll-behavior");
          O(k, "user-select");
          O(k, "-webkit-user-select");
          O(k, "-ms-user-select");
          O(k, "-moz-user-select");
          O(k, "-o-user-select");
        });
      }
      if (this.g && typeof window !== "undefined") {
        Object.defineProperty(window, "localStorage", {
          value: null,
          writable: false,
        });
        Object.defineProperty(window, "sessionStorage", {
          value: null,
          writable: false,
        });
        Object.defineProperty(window, "indexedDB", {
          value: null,
          writable: false,
        });
        Object.defineProperty(window, "caches", {
          value: null,
          writable: false,
        });
        Object.defineProperty(document, "cookie", {
          value: null,
          writable: false,
        });
      }
    }
  })();
  n("ytgame", kf.h);
  n("ytgame.ads", kf.ads);
  n("ytgame.engagement", kf.engagement);
  n("ytgame.game", kf.game);
  n("ytgame.health", kf.health);
  n("ytgame.system", kf.system);
  pe = (a, b) =>
    l(
      (function* () {
        var c = b.id;
        if (
          c.length !== 11 ||
          !/^[-A-Za-z0-9_]+$/.test(c) ||
          !"AEIMQUYcgkosw048".includes(c[10]) ||
          c === "GU5U2spHI_4"
        ) {
          throw new U(T, 15, "Invalid format for content being passed");
        }
        c = Q(15);
        var d = new gd();
        d = E(d, 1, B(b.id));
        c = I(c, 12, R, d);
        c = yield Y(a, c);
        V(c.data, 15);
      })(),
    );

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      ytgame: m.ytgame,
      ytgameAds: m["ytgame.ads"],
      ytgameEngagement: m["ytgame.engagement"],
      ytgameGame: m["ytgame.game"],
      ytgameHealth: m["ytgame.health"],
      ytgameSystem: m["ytgame.system"],
    };
  }
  if (typeof globalScope === "object" && globalScope) {
    globalScope.ytgame = m.ytgame;
    globalScope["ytgame.ads"] = m["ytgame.ads"];
    globalScope["ytgame.engagement"] = m["ytgame.engagement"];
    globalScope["ytgame.game"] = m["ytgame.game"];
    globalScope["ytgame.health"] = m["ytgame.health"];
    globalScope["ytgame.system"] = m["ytgame.system"];
  }
})(
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
        ? global
        : {},
);

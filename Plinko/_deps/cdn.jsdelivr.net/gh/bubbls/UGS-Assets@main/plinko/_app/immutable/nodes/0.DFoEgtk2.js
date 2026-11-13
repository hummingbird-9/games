import {
  a as M,
  o as T,
  e as s,
  b,
  z as $,
  c as l,
  g as r,
  h as v,
  w as e,
  k as i,
  j as I,
  u as L,
  p as N,
  q as A
} from "../chunks/scheduler.qUdTNcd4.js";
import {
  S as P,
  i as z,
  t as O,
  a as j
} from "../chunks/index.CwLSBawM.js";
const K = !0,
  H = Object.freeze(Object.defineProperty({
    __proto__: null,
    prerender: K
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  S = "" + new URL("../assets/og_image.PzHn9Bxz.jpg", import.meta.url).href;

function q(d) {
  let a, c, p, u, m, h, f, g, _, y, w, k;
  const E = d[1].default,
    o = T(E, d, d[0], null);
  return {
    c() {
      a = s("link"), c = s("link"), p = s("link"), u = s("link"), m = s("meta"), h = s("meta"), f = s("meta"), g = s("meta"), _ = s("meta"), y = s("meta"), w = b(), o && o.c(), this.h()
    },
    l(t) {
      const n = $("svelte-f88f7m", document.head);
      a = l(n, "LINK", {
        rel: !0,
        href: !0
      }), c = l(n, "LINK", {
        rel: !0,
        href: !0,
        crossorigin: !0
      }), p = l(n, "LINK", {
        rel: !0,
        href: !0
      }), u = l(n, "LINK", {
        href: !0,
        rel: !0
      }), m = l(n, "META", {
        name: !0,
        content: !0
      }), h = l(n, "META", {
        property: !0,
        content: !0
      }), f = l(n, "META", {
        property: !0,
        content: !0
      }), g = l(n, "META", {
        property: !0,
        content: !0
      }), _ = l(n, "META", {
        property: !0,
        content: !0
      }), y = l(n, "META", {
        name: !0,
        content: !0
      }), n.forEach(r), w = v(t), o && o.l(t), this.h()
    },
    h() {
      document.title = "Free Plinko Game Online - Play & Win Instant Rewards", e(a, "rel", "preconnect"), e(a, "href", "https://fonts.googleapis.com"), e(c, "rel", "preconnect"), e(c, "href", "https://fonts.gstatic.com"), e(c, "crossorigin", ""), e(p, "rel", "canonical"), e(p, "href", "https://plinko-game-online.github.io/"), e(u, "href", "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"), e(u, "rel", "stylesheet"), e(m, "name", "description"), e(m, "content", "Experience authentic Plinko gameplay online! Drop discs through pegs for exciting rewards in this classic arcade game. No download or registration required - start playing instantly and win."), e(h, "property", "og:type"), e(h, "content", "website"), e(f, "property", "og:title"), e(f, "content", "Free Plinko Game Online"), e(g, "property", "og:url"), e(g, "content", "https://plinko-game-online.github.io/"), e(_, "property", "og:image"), e(_, "content", S), e(y, "name", "google-site-verification"), e(y, "content", "lTwaQTJ2H6vMNYMUd9ooaLxzvssiGoQEuoRdsOYNX8g")
    },
    m(t, n) {
      i(document.head, a), i(document.head, c), i(document.head, p), i(document.head, u), i(document.head, m), i(document.head, h), i(document.head, f), i(document.head, g), i(document.head, _), i(document.head, y), I(t, w, n), o && o.m(t, n), k = !0
    },
    p(t, [n]) {
      o && o.p && (!k || n & 1) && L(o, E, t, t[0], k ? A(E, t[0], n, null) : N(t[0]), null)
    },
    i(t) {
      k || (O(o, t), k = !0)
    },
    o(t) {
      j(o, t), k = !1
    },
    d(t) {
      t && r(w), r(a), r(c), r(p), r(u), r(m), r(h), r(f), r(g), r(_), r(y), o && o.d(t)
    }
  }
}

function G(d, a, c) {
  let {
    $$slots: p = {},
    $$scope: u
  } = a;
  return d.$$set = m => {
    "$$scope" in m && c(0, u = m.$$scope)
  }, [u, p]
}
class Q extends P {
  constructor(a) {
    super(), z(this, a, G, q, M, {})
  }
}
export {
  Q as component, H as universal
};
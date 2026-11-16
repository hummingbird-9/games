(() => {
    "use strict";
    var e = {
        d: (t, n) => {
          for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
            enumerable: !0,
            get: n[r]
          })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          })
        }
      },
      t = {};
    e.r(t), e.d(t, {
      debug: () => as,
      error: () => ls,
      fatal: () => ds,
      fmt: () => os,
      info: () => cs,
      trace: () => is,
      warn: () => us
    });
    var n = {};
    e.r(n), e.d(n, {
      BrowserClient: () => va,
      OpenFeatureIntegrationHook: () => Hm,
      SDK_VERSION: () => o,
      SEMANTIC_ATTRIBUTE_SENTRY_OP: () => wn,
      SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN: () => kn,
      SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE: () => bn,
      SEMANTIC_ATTRIBUTE_SENTRY_SOURCE: () => vn,
      Scope: () => ce,
      WINDOW: () => ho,
      addBreadcrumb: () => hs,
      addEventProcessor: () => ao,
      addIntegration: () => Te,
      breadcrumbsIntegration: () => bc,
      browserApiErrorsIntegration: () => wc,
      browserProfilingIntegration: () => Fm,
      browserSessionIntegration: () => Cc,
      browserTracingIntegration: () => rm,
      buildLaunchDarklyFlagUsedHandler: () => Um,
      captureConsoleIntegration: () => ws,
      captureEvent: () => Kr,
      captureException: () => Gr,
      captureFeedback: () => we,
      captureMessage: () => Jr,
      captureSession: () => po,
      chromeStackLineParser: () => Da,
      close: () => oo,
      consoleLoggingIntegration: () => Es,
      contextLinesIntegration: () => eu,
      continueTrace: () => Fs,
      createTransport: () => Qs,
      createUserFeedbackEnvelope: () => Ga,
      dedupeIntegration: () => ei,
      defaultRequestInstrumentationOptions: () => Nf,
      defaultStackLineParsers: () => qa,
      defaultStackParser: () => Wa,
      diagnoseSdkConnectivity: () => Vm,
      endSession: () => uo,
      eventFiltersIntegration: () => si,
      eventFromException: () => fa,
      eventFromMessage: () => ma,
      exceptionFromError: () => aa,
      extraErrorDataIntegration: () => ui,
      featureFlagsIntegration: () => gi,
      feedbackAsyncIntegration: () => So,
      feedbackIntegration: () => wo,
      feedbackSyncIntegration: () => wo,
      flush: () => ro,
      forceLoad: () => $c,
      functionToStringIntegration: () => vi,
      geckoStackLineParser: () => Fa,
      getActiveSpan: () => yr,
      getClient: () => be,
      getCurrentScope: () => me,
      getDefaultIntegrations: () => Pc,
      getFeedback: () => He,
      getGlobalScope: () => _e,
      getIsolationScope: () => ge,
      getReplay: () => Vh,
      getRootSpan: () => _r,
      getSpanDescendants: () => gr,
      getSpanStatusFromHttpCode: () => Gn,
      getTraceData: () => bi,
      globalHandlersIntegration: () => Tc,
      graphqlClientIntegration: () => au,
      httpClientIntegration: () => Vc,
      httpContextIntegration: () => Rc,
      inboundFiltersIntegration: () => ii,
      init: () => Fc,
      instrumentOutgoingRequests: () => Pf,
      instrumentSupabaseClient: () => Ri,
      isEnabled: () => io,
      isInitialized: () => so,
      lastEventId: () => no,
      launchDarklyIntegration: () => Bm,
      lazyLoadIntegration: () => bo,
      linkedErrorsIntegration: () => Nc,
      logger: () => t,
      makeBrowserOfflineTransport: () => gm,
      makeFetchTransport: () => Ma,
      makeMultiplexedTransport: () => Li,
      moduleMetadataIntegration: () => Bi,
      onLoad: () => Bc,
      openFeatureIntegration: () => jm,
      opera10StackLineParser: () => ja,
      opera11StackLineParser: () => za,
      parameterize: () => rs,
      registerSpanErrorInstrumentation: () => Gi,
      replayCanvasIntegration: () => Ef,
      replayIntegration: () => zh,
      reportingObserverIntegration: () => zc,
      rewriteFramesIntegration: () => Zi,
      sendFeedback: () => Le,
      setContext: () => Yr,
      setCurrentClient: () => Qi,
      setExtra: () => Zr,
      setExtras: () => Xr,
      setHttpStatus: () => Jn,
      setMeasurement: () => Is,
      setTag: () => eo,
      setTags: () => Qr,
      setUser: () => to,
      showReportDialog: () => Uc,
      spanToBaggageHeader: () => Cr,
      spanToJSON: () => lr,
      spanToTraceHeader: () => ir,
      spotlightBrowserIntegration: () => $m,
      startBrowserTracingNavigationSpan: () => sm,
      startBrowserTracingPageLoadSpan: () => om,
      startInactiveSpan: () => Ps,
      startNewTrace: () => Us,
      startSession: () => co,
      startSpan: () => Ds,
      startSpanManual: () => Ns,
      statsigIntegration: () => Wm,
      supabaseIntegration: () => Oi,
      suppressTracing: () => Bs,
      thirdPartyErrorFilterIntegration: () => ea,
      unleashIntegration: () => zm,
      updateSpanName: () => br,
      winjsStackLineParser: () => Ba,
      withActiveSpan: () => $s,
      withIsolationScope: () => ve,
      withScope: () => ye,
      zodErrorsIntegration: () => oa
    });
    const r = globalThis,
      o = "9.35.0";

    function s() {
      return i(r), r
    }

    function i(e) {
      const t = e.__SENTRY__ = e.__SENTRY__ || {};
      return t.version = t.version || o, t[o] = t[o] || {}
    }

    function a(e, t, n = r) {
      const s = n.__SENTRY__ = n.__SENTRY__ || {},
        i = s[o] = s[o] || {};
      return i[e] || (i[e] = t())
    }
    const c = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      u = Object.prototype.toString;

    function l(e) {
      switch (u.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
        case "[object WebAssembly.Exception]":
          return !0;
        default:
          return b(e, Error)
      }
    }

    function d(e, t) {
      return u.call(e) === `[object ${t}]`
    }

    function p(e) {
      return d(e, "ErrorEvent")
    }

    function h(e) {
      return d(e, "DOMError")
    }

    function f(e) {
      return d(e, "String")
    }

    function m(e) {
      return "object" == typeof e && null !== e && "__sentry_template_string__" in e && "__sentry_template_values__" in e
    }

    function g(e) {
      return null === e || m(e) || "object" != typeof e && "function" != typeof e
    }

    function _(e) {
      return d(e, "Object")
    }

    function y(e) {
      return "undefined" != typeof Event && b(e, Event)
    }

    function v(e) {
      return Boolean(e?.then && "function" == typeof e.then)
    }

    function b(e, t) {
      try {
        return e instanceof t
      } catch (e) {
        return !1
      }
    }

    function S(e) {
      return !("object" != typeof e || null === e || !e.__isVue && !e._isVue)
    }

    function w(e) {
      return "undefined" != typeof Request && b(e, Request)
    }
    const k = r,
      E = 80;

    function x(e, t = {}) {
      if (!e) return "<unknown>";
      try {
        let n = e;
        const r = 5,
          o = [];
        let s = 0,
          i = 0;
        const a = " > ",
          c = a.length;
        let u;
        const l = Array.isArray(t) ? t : t.keyAttrs,
          d = !Array.isArray(t) && t.maxStringLength || E;
        for (; n && s++ < r && (u = C(n, l), !("html" === u || s > 1 && i + o.length * c + u.length >= d));) o.push(u), i += u.length, n = n.parentNode;
        return o.reverse().join(a)
      } catch (e) {
        return "<unknown>"
      }
    }

    function C(e, t) {
      const n = e,
        r = [];
      if (!n?.tagName) return "";
      if (k.HTMLElement && n instanceof HTMLElement && n.dataset) {
        if (n.dataset.sentryComponent) return n.dataset.sentryComponent;
        if (n.dataset.sentryElement) return n.dataset.sentryElement
      }
      r.push(n.tagName.toLowerCase());
      const o = t?.length ? t.filter((e => n.getAttribute(e))).map((e => [e, n.getAttribute(e)])) : null;
      if (o?.length) o.forEach((e => {
        r.push(`[${e[0]}="${e[1]}"]`)
      }));
      else {
        n.id && r.push(`#${n.id}`);
        const e = n.className;
        if (e && f(e)) {
          const t = e.split(/\s+/);
          for (const e of t) r.push(`.${e}`)
        }
      }
      const s = ["aria-label", "type", "name", "title", "alt"];
      for (const e of s) {
        const t = n.getAttribute(e);
        t && r.push(`[${e}="${t}"]`)
      }
      return r.join("")
    }

    function T() {
      try {
        return k.document.location.href
      } catch (e) {
        return ""
      }
    }

    function I(e) {
      if (!k.HTMLElement) return null;
      let t = e;
      for (let e = 0; e < 5; e++) {
        if (!t) return null;
        if (t instanceof HTMLElement) {
          if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
          if (t.dataset.sentryElement) return t.dataset.sentryElement
        }
        t = t.parentNode
      }
      return null
    }
    const M = ["debug", "info", "warn", "error", "log", "assert", "trace"],
      R = {};

    function O(e) {
      if (!("console" in r)) return e();
      const t = r.console,
        n = {},
        o = Object.keys(R);
      o.forEach((e => {
        const r = R[e];
        n[e] = t[e], t[e] = r
      }));
      try {
        return e()
      } finally {
        o.forEach((e => {
          t[e] = n[e]
        }))
      }
    }
    const A = a("logger", (function() {
      let e = !1;
      const t = {
        enable: () => {
          e = !0
        },
        disable: () => {
          e = !1
        },
        isEnabled: () => e
      };
      return c ? M.forEach((n => {
        t[n] = (...t) => {
          e && O((() => {
            r.console[n](`Sentry Logger [${n}]:`, ...t)
          }))
        }
      })) : M.forEach((e => {
        t[e] = () => {}
      })), t
    }));

    function L(e, t = 0) {
      return "string" != typeof e || 0 === t || e.length <= t ? e : `${e.slice(0,t)}...`
    }

    function D(e, t) {
      let n = e;
      const r = n.length;
      if (r <= 150) return n;
      t > r && (t = r);
      let o = Math.max(t - 60, 0);
      o < 5 && (o = 0);
      let s = Math.min(o + 140, r);
      return s > r - 5 && (s = r), s === r && (o = Math.max(s - 140, 0)), n = n.slice(o, s), o > 0 && (n = `'{snip} ${n}`), s < r && (n += " {snip}"), n
    }

    function N(e, t) {
      if (!Array.isArray(e)) return "";
      const n = [];
      for (let t = 0; t < e.length; t++) {
        const r = e[t];
        try {
          S(r) ? n.push("[VueViewModel]") : n.push(String(r))
        } catch (e) {
          n.push("[value cannot be serialized]")
        }
      }
      return n.join(t)
    }

    function P(e, t = [], n = !1) {
      return t.some((t => function(e, t, n = !1) {
        return !!f(e) && (d(t, "RegExp") ? t.test(e) : !!f(t) && (n ? e === t : e.includes(t)))
      }(e, t, n)))
    }

    function F(e, t, n) {
      if (!(t in e)) return;
      const r = e[t];
      if ("function" != typeof r) return;
      const o = n(r);
      "function" == typeof o && B(o, r);
      try {
        e[t] = o
      } catch {
        c && A.log(`Failed to replace method "${t}" in object`, e)
      }
    }

    function $(e, t, n) {
      try {
        Object.defineProperty(e, t, {
          value: n,
          writable: !0,
          configurable: !0
        })
      } catch (n) {
        c && A.log(`Failed to add non-enumerable property "${t}" to object`, e)
      }
    }

    function B(e, t) {
      try {
        const n = t.prototype || {};
        e.prototype = t.prototype = n, $(e, "__sentry_original__", t)
      } catch (e) {}
    }

    function U(e) {
      return e.__sentry_original__
    }

    function j(e) {
      if (l(e)) return {
        message: e.message,
        name: e.name,
        stack: e.stack,
        ...z(e)
      };
      if (y(e)) {
        const t = {
          type: e.type,
          target: H(e.target),
          currentTarget: H(e.currentTarget),
          ...z(e)
        };
        return "undefined" != typeof CustomEvent && b(e, CustomEvent) && (t.detail = e.detail), t
      }
      return e
    }

    function H(e) {
      try {
        return "undefined" != typeof Element && b(e, Element) ? x(e) : Object.prototype.toString.call(e)
      } catch (e) {
        return "<unknown>"
      }
    }

    function z(e) {
      if ("object" == typeof e && null !== e) {
        const t = {};
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t
      }
      return {}
    }

    function q(e = function() {
      const e = r;
      return e.crypto || e.msCrypto
    }()) {
      let t = () => 16 * Math.random();
      try {
        if (e?.randomUUID) return e.randomUUID().replace(/-/g, "");
        e?.getRandomValues && (t = () => {
          const t = new Uint8Array(1);
          return e.getRandomValues(t), t[0]
        })
      } catch (e) {}
      return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (e => (e ^ (15 & t()) >> e / 4).toString(16)))
    }

    function W(e) {
      return e.exception?.values?.[0]
    }

    function V(e) {
      const {
        message: t,
        event_id: n
      } = e;
      if (t) return t;
      const r = W(e);
      return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>"
    }

    function G(e, t, n) {
      const r = e.exception = e.exception || {},
        o = r.values = r.values || [],
        s = o[0] = o[0] || {};
      s.value || (s.value = t || ""), s.type || (s.type = n || "Error")
    }

    function J(e, t) {
      const n = W(e);
      if (!n) return;
      const r = n.mechanism;
      if (n.mechanism = {
          type: "generic",
          handled: !0,
          ...r,
          ...t
        }, t && "data" in t) {
        const e = {
          ...r?.data,
          ...t.data
        };
        n.mechanism.data = e
      }
    }

    function K(e) {
      if (function(e) {
          try {
            return e.__sentry_captured__
          } catch {}
        }(e)) return !0;
      try {
        $(e, "__sentry_captured__", !0)
      } catch (e) {}
      return !1
    }
    const Y = 1e3;

    function X() {
      return Date.now() / Y
    }
    const Z = function() {
      const {
        performance: e
      } = r;
      if (!e?.now) return X;
      const t = Date.now() - e.now(),
        n = null == e.timeOrigin ? t : e.timeOrigin;
      return () => (n + e.now()) / Y
    }();
    let Q;

    function ee() {
      return Q || (Q = function() {
        const {
          performance: e
        } = r;
        if (!e?.now) return [void 0, "none"];
        const t = 36e5,
          n = e.now(),
          o = Date.now(),
          s = e.timeOrigin ? Math.abs(e.timeOrigin + n - o) : t,
          i = s < t,
          a = e.timing?.navigationStart,
          c = "number" == typeof a ? Math.abs(a + n - o) : t;
        return i || c < t ? s <= c ? [e.timeOrigin, "timeOrigin"] : [a, "navigationStart"] : [o, "dateNow"]
      }()), Q[0]
    }

    function te(e, t = {}) {
      if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), e.did || t.did || (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || Z(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = 32 === t.sid.length ? t.sid : q()), void 0 !== t.init && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), "number" == typeof t.started && (e.started = t.started), e.ignoreDuration) e.duration = void 0;
      else if ("number" == typeof t.duration) e.duration = t.duration;
      else {
        const t = e.timestamp - e.started;
        e.duration = t >= 0 ? t : 0
      }
      t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), "number" == typeof t.errors && (e.errors = t.errors), t.status && (e.status = t.status)
    }

    function ne(e, t, n = 2) {
      if (!t || "object" != typeof t || n <= 0) return t;
      if (e && 0 === Object.keys(t).length) return e;
      const r = {
        ...e
      };
      for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && (r[e] = ne(r[e], t[e], n - 1));
      return r
    }

    function re() {
      return q()
    }

    function oe() {
      return q().substring(16)
    }
    const se = "_sentrySpan";

    function ie(e, t) {
      t ? $(e, se, t) : delete e[se]
    }

    function ae(e) {
      return e[se]
    }
    class ce {
      constructor() {
        this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = {
          traceId: re(),
          sampleRand: Math.random()
        }
      }
      clone() {
        const e = new ce;
        return e._breadcrumbs = [...this._breadcrumbs], e._tags = {
          ...this._tags
        }, e._extra = {
          ...this._extra
        }, e._contexts = {
          ...this._contexts
        }, this._contexts.flags && (e._contexts.flags = {
          values: [...this._contexts.flags.values]
        }), e._user = this._user, e._level = this._level, e._session = this._session, e._transactionName = this._transactionName, e._fingerprint = this._fingerprint, e._eventProcessors = [...this._eventProcessors], e._attachments = [...this._attachments], e._sdkProcessingMetadata = {
          ...this._sdkProcessingMetadata
        }, e._propagationContext = {
          ...this._propagationContext
        }, e._client = this._client, e._lastEventId = this._lastEventId, ie(e, ae(this)), e
      }
      setClient(e) {
        this._client = e
      }
      setLastEventId(e) {
        this._lastEventId = e
      }
      getClient() {
        return this._client
      }
      lastEventId() {
        return this._lastEventId
      }
      addScopeListener(e) {
        this._scopeListeners.push(e)
      }
      addEventProcessor(e) {
        return this._eventProcessors.push(e), this
      }
      setUser(e) {
        return this._user = e || {
          email: void 0,
          id: void 0,
          ip_address: void 0,
          username: void 0
        }, this._session && te(this._session, {
          user: e
        }), this._notifyScopeListeners(), this
      }
      getUser() {
        return this._user
      }
      setTags(e) {
        return this._tags = {
          ...this._tags,
          ...e
        }, this._notifyScopeListeners(), this
      }
      setTag(e, t) {
        return this._tags = {
          ...this._tags,
          [e]: t
        }, this._notifyScopeListeners(), this
      }
      setExtras(e) {
        return this._extra = {
          ...this._extra,
          ...e
        }, this._notifyScopeListeners(), this
      }
      setExtra(e, t) {
        return this._extra = {
          ...this._extra,
          [e]: t
        }, this._notifyScopeListeners(), this
      }
      setFingerprint(e) {
        return this._fingerprint = e, this._notifyScopeListeners(), this
      }
      setLevel(e) {
        return this._level = e, this._notifyScopeListeners(), this
      }
      setTransactionName(e) {
        return this._transactionName = e, this._notifyScopeListeners(), this
      }
      setContext(e, t) {
        return null === t ? delete this._contexts[e] : this._contexts[e] = t, this._notifyScopeListeners(), this
      }
      setSession(e) {
        return e ? this._session = e : delete this._session, this._notifyScopeListeners(), this
      }
      getSession() {
        return this._session
      }
      update(e) {
        if (!e) return this;
        const t = "function" == typeof e ? e(this) : e,
          n = t instanceof ce ? t.getScopeData() : _(t) ? e : void 0,
          {
            tags: r,
            extra: o,
            user: s,
            contexts: i,
            level: a,
            fingerprint: c = [],
            propagationContext: u
          } = n || {};
        return this._tags = {
          ...this._tags,
          ...r
        }, this._extra = {
          ...this._extra,
          ...o
        }, this._contexts = {
          ...this._contexts,
          ...i
        }, s && Object.keys(s).length && (this._user = s), a && (this._level = a), c.length && (this._fingerprint = c), u && (this._propagationContext = u), this
      }
      clear() {
        return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, ie(this, void 0), this._attachments = [], this.setPropagationContext({
          traceId: re(),
          sampleRand: Math.random()
        }), this._notifyScopeListeners(), this
      }
      addBreadcrumb(e, t) {
        const n = "number" == typeof t ? t : 100;
        if (n <= 0) return this;
        const r = {
          timestamp: X(),
          ...e,
          message: e.message ? L(e.message, 2048) : e.message
        };
        return this._breadcrumbs.push(r), this._breadcrumbs.length > n && (this._breadcrumbs = this._breadcrumbs.slice(-n), this._client?.recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this
      }
      getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1]
      }
      clearBreadcrumbs() {
        return this._breadcrumbs = [], this._notifyScopeListeners(), this
      }
      addAttachment(e) {
        return this._attachments.push(e), this
      }
      clearAttachments() {
        return this._attachments = [], this
      }
      getScopeData() {
        return {
          breadcrumbs: this._breadcrumbs,
          attachments: this._attachments,
          contexts: this._contexts,
          tags: this._tags,
          extra: this._extra,
          user: this._user,
          level: this._level,
          fingerprint: this._fingerprint || [],
          eventProcessors: this._eventProcessors,
          propagationContext: this._propagationContext,
          sdkProcessingMetadata: this._sdkProcessingMetadata,
          transactionName: this._transactionName,
          span: ae(this)
        }
      }
      setSDKProcessingMetadata(e) {
        return this._sdkProcessingMetadata = ne(this._sdkProcessingMetadata, e, 2), this
      }
      setPropagationContext(e) {
        return this._propagationContext = e, this
      }
      getPropagationContext() {
        return this._propagationContext
      }
      captureException(e, t) {
        const n = t?.event_id || q();
        if (!this._client) return A.warn("No client configured on scope - will not capture exception!"), n;
        const r = new Error("Sentry syntheticException");
        return this._client.captureException(e, {
          originalException: e,
          syntheticException: r,
          ...t,
          event_id: n
        }, this), n
      }
      captureMessage(e, t, n) {
        const r = n?.event_id || q();
        if (!this._client) return A.warn("No client configured on scope - will not capture message!"), r;
        const o = new Error(e);
        return this._client.captureMessage(e, t, {
          originalException: e,
          syntheticException: o,
          ...n,
          event_id: r
        }, this), r
      }
      captureEvent(e, t) {
        const n = t?.event_id || q();
        return this._client ? (this._client.captureEvent(e, {
          ...t,
          event_id: n
        }, this), n) : (A.warn("No client configured on scope - will not capture event!"), n)
      }
      _notifyScopeListeners() {
        this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((e => {
          e(this)
        })), this._notifyingListeners = !1)
      }
    }
    class ue {
      constructor(e, t) {
        let n, r;
        n = e || new ce, r = t || new ce, this._stack = [{
          scope: n
        }], this._isolationScope = r
      }
      withScope(e) {
        const t = this._pushScope();
        let n;
        try {
          n = e(t)
        } catch (e) {
          throw this._popScope(), e
        }
        return v(n) ? n.then((e => (this._popScope(), e)), (e => {
          throw this._popScope(), e
        })) : (this._popScope(), n)
      }
      getClient() {
        return this.getStackTop().client
      }
      getScope() {
        return this.getStackTop().scope
      }
      getIsolationScope() {
        return this._isolationScope
      }
      getStackTop() {
        return this._stack[this._stack.length - 1]
      }
      _pushScope() {
        const e = this.getScope().clone();
        return this._stack.push({
          client: this.getClient(),
          scope: e
        }), e
      }
      _popScope() {
        return !(this._stack.length <= 1 || !this._stack.pop())
      }
    }

    function le() {
      const e = i(s());
      return e.stack = e.stack || new ue(a("defaultCurrentScope", (() => new ce)), a("defaultIsolationScope", (() => new ce)))
    }

    function de(e) {
      return le().withScope(e)
    }

    function pe(e, t) {
      const n = le();
      return n.withScope((() => (n.getStackTop().scope = e, t(e))))
    }

    function he(e) {
      return le().withScope((() => e(le().getIsolationScope())))
    }

    function fe(e) {
      const t = i(e);
      return t.acs ? t.acs : {
        withIsolationScope: he,
        withScope: de,
        withSetScope: pe,
        withSetIsolationScope: (e, t) => he(t),
        getCurrentScope: () => le().getScope(),
        getIsolationScope: () => le().getIsolationScope()
      }
    }

    function me() {
      return fe(s()).getCurrentScope()
    }

    function ge() {
      return fe(s()).getIsolationScope()
    }

    function _e() {
      return a("globalScope", (() => new ce))
    }

    function ye(...e) {
      const t = fe(s());
      if (2 === e.length) {
        const [n, r] = e;
        return n ? t.withSetScope(n, r) : t.withScope(r)
      }
      return t.withScope(e[0])
    }

    function ve(...e) {
      const t = fe(s());
      if (2 === e.length) {
        const [n, r] = e;
        return n ? t.withSetIsolationScope(n, r) : t.withIsolationScope(r)
      }
      return t.withIsolationScope(e[0])
    }

    function be() {
      return me().getClient()
    }

    function Se(e) {
      const t = e.getPropagationContext(),
        {
          traceId: n,
          parentSpanId: r,
          propagationSpanId: o
        } = t,
        s = {
          trace_id: n,
          span_id: o || oe()
        };
      return r && (s.parent_span_id = r), s
    }

    function we(e, t = {}, n = me()) {
      const {
        message: r,
        name: o,
        email: s,
        url: i,
        source: a,
        associatedEventId: c,
        tags: u
      } = e, l = {
        contexts: {
          feedback: {
            contact_email: s,
            name: o,
            message: r,
            url: i,
            source: a,
            associated_event_id: c
          }
        },
        type: "feedback",
        level: "info",
        tags: u
      }, d = n?.getClient() || be();
      return d && d.emit("beforeSendFeedback", l, t), n.captureEvent(l, t)
    }
    const ke = [];

    function Ee(e) {
      const t = e.defaultIntegrations || [],
        n = e.integrations;
      let r;
      if (t.forEach((e => {
          e.isDefaultInstance = !0
        })), Array.isArray(n)) r = [...t, ...n];
      else if ("function" == typeof n) {
        const e = n(t);
        r = Array.isArray(e) ? e : [e]
      } else r = t;
      return function(e) {
        const t = {};
        return e.forEach((e => {
          const {
            name: n
          } = e, r = t[n];
          r && !r.isDefaultInstance && e.isDefaultInstance || (t[n] = e)
        })), Object.values(t)
      }(r)
    }

    function xe(e, t) {
      for (const n of t) n?.afterAllSetup && n.afterAllSetup(e)
    }

    function Ce(e, t, n) {
      if (n[t.name]) c && A.log(`Integration skipped because it was already installed: ${t.name}`);
      else {
        if (n[t.name] = t, -1 === ke.indexOf(t.name) && "function" == typeof t.setupOnce && (t.setupOnce(), ke.push(t.name)), t.setup && "function" == typeof t.setup && t.setup(e), "function" == typeof t.preprocessEvent) {
          const n = t.preprocessEvent.bind(t);
          e.on("preprocessEvent", ((t, r) => n(t, r, e)))
        }
        if ("function" == typeof t.processEvent) {
          const n = t.processEvent.bind(t),
            r = Object.assign(((t, r) => n(t, r, e)), {
              id: t.name
            });
          e.addEventProcessor(r)
        }
        c && A.log(`Integration installed: ${t.name}`)
      }
    }

    function Te(e) {
      const t = be();
      t ? t.addIntegration(e) : c && A.warn(`Cannot add integration "${e.name}" because no SDK Client is available.`)
    }

    function Ie() {
      return "undefined" != typeof window && (!(("undefined" == typeof __SENTRY_BROWSER_BUNDLE__ || !__SENTRY_BROWSER_BUNDLE__) && "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0)) || function() {
        const e = r.process;
        return "renderer" === e?.type
      }())
    }
    const Me = r,
      Re = Me.document,
      Oe = Me.navigator,
      Ae = "Report a Bug",
      Le = (e, t = {
        includeReplay: !0
      }) => {
        if (!e.message) throw new Error("Unable to submit feedback with empty message");
        const n = be();
        if (!n) throw new Error("No client setup, cannot send feedback.");
        e.tags && Object.keys(e.tags).length && me().setTags(e.tags);
        const r = we({
          source: "api",
          url: T(),
          ...e
        }, t);
        return new Promise(((e, t) => {
          const o = setTimeout((() => t("Unable to determine if Feedback was correctly sent.")), 5e3),
            s = n.on("afterSendEvent", ((n, i) => {
              if (n.event_id === r) return clearTimeout(o), s(), i && "number" == typeof i.statusCode && i.statusCode >= 200 && i.statusCode < 300 ? e(r) : i && "number" == typeof i.statusCode && 0 === i.statusCode ? t("Unable to send Feedback. This is because of network issues, or because you are using an ad-blocker.") : i && "number" == typeof i.statusCode && 403 === i.statusCode ? t("Unable to send Feedback. This could be because this domain is not in your list of allowed domains.") : t("Unable to send Feedback. This could be because of network issues, or because you are using an ad-blocker")
            }))
        }))
      },
      De = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;

    function Ne(e, t) {
      return {
        ...e,
        ...t,
        tags: {
          ...e.tags,
          ...t.tags
        },
        onFormOpen: () => {
          t.onFormOpen?.(), e.onFormOpen?.()
        },
        onFormClose: () => {
          t.onFormClose?.(), e.onFormClose?.()
        },
        onSubmitSuccess: n => {
          t.onSubmitSuccess?.(n), e.onSubmitSuccess?.(n)
        },
        onSubmitError: n => {
          t.onSubmitError?.(n), e.onSubmitError?.(n)
        },
        onFormSubmitted: () => {
          t.onFormSubmitted?.(), e.onFormSubmitted?.()
        },
        themeDark: {
          ...e.themeDark,
          ...t.themeDark
        },
        themeLight: {
          ...e.themeLight,
          ...t.themeLight
        }
      }
    }

    function Pe(e, t) {
      return Object.entries(t).forEach((([t, n]) => {
        e.setAttributeNS(null, t, n)
      })), e
    }
    const Fe = "rgba(88, 74, 192, 1)",
      $e = {
        foreground: "#2b2233",
        background: "#ffffff",
        accentForeground: "white",
        accentBackground: Fe,
        successColor: "#268d75",
        errorColor: "#df3338",
        border: "1.5px solid rgba(41, 35, 47, 0.13)",
        boxShadow: "0px 4px 24px 0px rgba(43, 34, 51, 0.12)",
        outline: "1px auto var(--accent-background)",
        interactiveFilter: "brightness(95%)"
      },
      Be = {
        foreground: "#ebe6ef",
        background: "#29232f",
        accentForeground: "white",
        accentBackground: Fe,
        successColor: "#2da98c",
        errorColor: "#f55459",
        border: "1.5px solid rgba(235, 230, 239, 0.15)",
        boxShadow: "0px 4px 24px 0px rgba(43, 34, 51, 0.12)",
        outline: "1px auto var(--accent-background)",
        interactiveFilter: "brightness(150%)"
      };

    function Ue(e) {
      return `\n  --foreground: ${e.foreground};\n  --background: ${e.background};\n  --accent-foreground: ${e.accentForeground};\n  --accent-background: ${e.accentBackground};\n  --success-color: ${e.successColor};\n  --error-color: ${e.errorColor};\n  --border: ${e.border};\n  --box-shadow: ${e.boxShadow};\n  --outline: ${e.outline};\n  --interactive-filter: ${e.interactiveFilter};\n  `
    }
    const je = ({
      lazyLoadIntegration: e,
      getModalIntegration: t,
      getScreenshotIntegration: n
    }) => ({
      id: r = "sentry-feedback",
      autoInject: o = !0,
      showBranding: s = !0,
      isEmailRequired: i = !1,
      isNameRequired: a = !1,
      showEmail: c = !0,
      showName: u = !0,
      enableScreenshot: l = !0,
      useSentryUser: d = {
        email: "email",
        name: "username"
      },
      tags: p,
      styleNonce: h,
      scriptNonce: f,
      colorScheme: m = "system",
      themeLight: g = {},
      themeDark: _ = {},
      addScreenshotButtonLabel: y = "Add a screenshot",
      cancelButtonLabel: v = "Cancel",
      confirmButtonLabel: b = "Confirm",
      emailLabel: S = "Email",
      emailPlaceholder: w = "your.email@example.org",
      formTitle: k = "Report a Bug",
      isRequiredLabel: E = "(required)",
      messageLabel: x = "Description",
      messagePlaceholder: C = "What's the bug? What did you expect?",
      nameLabel: T = "Name",
      namePlaceholder: I = "Your Name",
      removeScreenshotButtonLabel: M = "Remove screenshot",
      submitButtonLabel: R = "Send Bug Report",
      successMessageText: O = "Thank you for your report!",
      triggerLabel: L = Ae,
      triggerAriaLabel: D = "",
      onFormOpen: N,
      onFormClose: P,
      onSubmitSuccess: F,
      onSubmitError: $,
      onFormSubmitted: B
    } = {}) => {
      const U = {
        id: r,
        autoInject: o,
        showBranding: s,
        isEmailRequired: i,
        isNameRequired: a,
        showEmail: c,
        showName: u,
        enableScreenshot: l,
        useSentryUser: d,
        tags: p,
        styleNonce: h,
        scriptNonce: f,
        colorScheme: m,
        themeDark: _,
        themeLight: g,
        triggerLabel: L,
        triggerAriaLabel: D,
        cancelButtonLabel: v,
        submitButtonLabel: R,
        confirmButtonLabel: b,
        formTitle: k,
        emailLabel: S,
        emailPlaceholder: w,
        messageLabel: x,
        messagePlaceholder: C,
        nameLabel: T,
        namePlaceholder: I,
        successMessageText: O,
        isRequiredLabel: E,
        addScreenshotButtonLabel: y,
        removeScreenshotButtonLabel: M,
        onFormClose: P,
        onFormOpen: N,
        onSubmitError: $,
        onSubmitSuccess: F,
        onFormSubmitted: B
      };
      let j = null,
        H = [];
      const z = e => {
          if (!j) {
            const t = Re.createElement("div");
            t.id = String(e.id), Re.body.appendChild(t), j = t.attachShadow({
              mode: "open"
            }), j.appendChild(function({
              colorScheme: e,
              themeDark: t,
              themeLight: n,
              styleNonce: r
            }) {
              const o = Re.createElement("style");
              return o.textContent = `\n:host {\n  --font-family: system-ui, 'Helvetica Neue', Arial, sans-serif;\n  --font-size: 14px;\n  --z-index: 100000;\n\n  --page-margin: 16px;\n  --inset: auto 0 0 auto;\n  --actor-inset: var(--inset);\n\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n\n  ${"system"!==e?"color-scheme: only light;":""}\n\n  ${Ue("dark"===e?{...Be,...t}:{...$e,...n})}\n}\n\n${"system"===e?`\n@media (prefers-color-scheme: dark) {\n  :host {\n    ${Ue({...Be,...t})}\n  }\n}`:""}\n}\n`, r && o.setAttribute("nonce", r), o
            }(e))
          }
          return j
        },
        q = async r => {
          const o = r.enableScreenshot && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(Oe.userAgent) || /Macintosh/i.test(Oe.userAgent) && Oe.maxTouchPoints && Oe.maxTouchPoints > 1 || !isSecureContext);
          let s, i;
          try {
            s = (t ? t() : await e("feedbackModalIntegration", f))(), Te(s)
          } catch {
            throw De && A.error("[Feedback] Error when trying to load feedback integrations. Try using `feedbackSyncIntegration` in your `Sentry.init`."), new Error("[Feedback] Missing feedback modal integration!")
          }
          try {
            const t = o ? n ? n() : await e("feedbackScreenshotIntegration", f) : void 0;
            t && (i = t(), Te(i))
          } catch {
            De && A.error("[Feedback] Missing feedback screenshot integration. Proceeding without screenshots.")
          }
          const a = s.createDialog({
            options: {
              ...r,
              onFormClose: () => {
                a?.close(), r.onFormClose?.()
              },
              onFormSubmitted: () => {
                a?.close(), r.onFormSubmitted?.()
              }
            },
            screenshotIntegration: i,
            sendFeedback: Le,
            shadow: z(r)
          });
          return a
        }, W = (e, t = {}) => {
          const n = Ne(U, t),
            r = "string" == typeof e ? Re.querySelector(e) : "function" == typeof e.addEventListener ? e : null;
          if (!r) throw De && A.error("[Feedback] Unable to attach to target element"), new Error("Unable to attach to target element");
          let o = null;
          const s = async () => {
            o || (o = await q({
              ...n,
              onFormSubmitted: () => {
                o?.removeFromDom(), n.onFormSubmitted?.()
              }
            })), o.appendToDom(), o.open()
          };
          r.addEventListener("click", s);
          const i = () => {
            H = H.filter((e => e !== i)), o?.removeFromDom(), o = null, r.removeEventListener("click", s)
          };
          return H.push(i), i
        }, V = (e = {}) => {
          const t = Ne(U, e),
            n = z(t),
            r = function({
              triggerLabel: e,
              triggerAriaLabel: t,
              shadow: n,
              styleNonce: r
            }) {
              const o = Re.createElement("button");
              if (o.type = "button", o.className = "widget__actor", o.ariaHidden = "false", o.ariaLabel = t || e || Ae, o.appendChild(function() {
                  const e = e => Me.document.createElementNS("http://www.w3.org/2000/svg", e),
                    t = Pe(e("svg"), {
                      width: "20",
                      height: "20",
                      viewBox: "0 0 20 20",
                      fill: "var(--actor-color, var(--foreground))"
                    }),
                    n = Pe(e("g"), {
                      clipPath: "url(#clip0_57_80)"
                    }),
                    r = Pe(e("path"), {
                      "fill-rule": "evenodd",
                      "clip-rule": "evenodd",
                      d: "M15.6622 15H12.3997C12.2129 14.9959 12.031 14.9396 11.8747 14.8375L8.04965 12.2H7.49956V19.1C7.4875 19.3348 7.3888 19.5568 7.22256 19.723C7.05632 19.8892 6.83435 19.9879 6.59956 20H2.04956C1.80193 19.9968 1.56535 19.8969 1.39023 19.7218C1.21511 19.5467 1.1153 19.3101 1.11206 19.0625V12.2H0.949652C0.824431 12.2017 0.700142 12.1783 0.584123 12.1311C0.468104 12.084 0.362708 12.014 0.274155 11.9255C0.185602 11.8369 0.115689 11.7315 0.0685419 11.6155C0.0213952 11.4995 -0.00202913 11.3752 -0.00034808 11.25V3.75C-0.00900498 3.62067 0.0092504 3.49095 0.0532651 3.36904C0.0972798 3.24712 0.166097 3.13566 0.255372 3.04168C0.344646 2.94771 0.452437 2.87327 0.571937 2.82307C0.691437 2.77286 0.82005 2.74798 0.949652 2.75H8.04965L11.8747 0.1625C12.031 0.0603649 12.2129 0.00407221 12.3997 0H15.6622C15.9098 0.00323746 16.1464 0.103049 16.3215 0.278167C16.4966 0.453286 16.5964 0.689866 16.5997 0.9375V3.25269C17.3969 3.42959 18.1345 3.83026 18.7211 4.41679C19.5322 5.22788 19.9878 6.32796 19.9878 7.47502C19.9878 8.62209 19.5322 9.72217 18.7211 10.5333C18.1345 11.1198 17.3969 11.5205 16.5997 11.6974V14.0125C16.6047 14.1393 16.5842 14.2659 16.5395 14.3847C16.4948 14.5035 16.4268 14.6121 16.3394 14.7042C16.252 14.7962 16.147 14.8698 16.0307 14.9206C15.9144 14.9714 15.7891 14.9984 15.6622 15ZM1.89695 10.325H1.88715V4.625H8.33715C8.52423 4.62301 8.70666 4.56654 8.86215 4.4625L12.6872 1.875H14.7247V13.125H12.6872L8.86215 10.4875C8.70666 10.3835 8.52423 10.327 8.33715 10.325H2.20217C2.15205 10.3167 2.10102 10.3125 2.04956 10.3125C1.9981 10.3125 1.94708 10.3167 1.89695 10.325ZM2.98706 12.2V18.1625H5.66206V12.2H2.98706ZM16.5997 9.93612V5.01393C16.6536 5.02355 16.7072 5.03495 16.7605 5.04814C17.1202 5.13709 17.4556 5.30487 17.7425 5.53934C18.0293 5.77381 18.2605 6.06912 18.4192 6.40389C18.578 6.73866 18.6603 7.10452 18.6603 7.47502C18.6603 7.84552 18.578 8.21139 18.4192 8.54616C18.2605 8.88093 18.0293 9.17624 17.7425 9.41071C17.4556 9.64518 17.1202 9.81296 16.7605 9.90191C16.7072 9.91509 16.6536 9.9265 16.5997 9.93612Z"
                    });
                  t.appendChild(n).appendChild(r);
                  const o = e("defs"),
                    s = Pe(e("clipPath"), {
                      id: "clip0_57_80"
                    }),
                    i = Pe(e("rect"), {
                      width: "20",
                      height: "20",
                      fill: "white"
                    });
                  return s.appendChild(i), o.appendChild(s), t.appendChild(o).appendChild(s).appendChild(i), t
                }()), e) {
                const t = Re.createElement("span");
                t.appendChild(Re.createTextNode(e)), o.appendChild(t)
              }
              const s = function(e) {
                const t = Re.createElement("style");
                return t.textContent = '\n.widget__actor {\n  position: fixed;\n  z-index: var(--z-index);\n  margin: var(--page-margin);\n  inset: var(--actor-inset);\n\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px;\n\n  font-family: inherit;\n  font-size: var(--font-size);\n  font-weight: 600;\n  line-height: 1.14em;\n  text-decoration: none;\n\n  background: var(--actor-background, var(--background));\n  border-radius: var(--actor-border-radius, 1.7em/50%);\n  border: var(--actor-border, var(--border));\n  box-shadow: var(--actor-box-shadow, var(--box-shadow));\n  color: var(--actor-color, var(--foreground));\n  fill: var(--actor-color, var(--foreground));\n  cursor: pointer;\n  opacity: 1;\n  transition: transform 0.2s ease-in-out;\n  transform: translate(0, 0) scale(1);\n}\n.widget__actor[aria-hidden="true"] {\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  transform: translate(0, 16px) scale(0.98);\n}\n\n.widget__actor:hover {\n  background: var(--actor-hover-background, var(--background));\n  filter: var(--interactive-filter);\n}\n\n.widget__actor svg {\n  width: 1.14em;\n  height: 1.14em;\n}\n\n@media (max-width: 600px) {\n  .widget__actor span {\n    display: none;\n  }\n}\n', e && t.setAttribute("nonce", e), t
              }(r);
              return {
                el: o,
                appendToDom() {
                  n.appendChild(s), n.appendChild(o)
                },
                removeFromDom() {
                  o.remove(), s.remove()
                },
                show() {
                  o.ariaHidden = "false"
                },
                hide() {
                  o.ariaHidden = "true"
                }
              }
            }({
              triggerLabel: t.triggerLabel,
              triggerAriaLabel: t.triggerAriaLabel,
              shadow: n,
              styleNonce: h
            });
          return W(r.el, {
            ...t,
            onFormOpen() {
              r.hide()
            },
            onFormClose() {
              r.show()
            },
            onFormSubmitted() {
              r.show()
            }
          }), r
        };
      return {
        name: "Feedback",
        setupOnce() {
          Ie() && U.autoInject && ("loading" === Re.readyState ? Re.addEventListener("DOMContentLoaded", (() => V().appendToDom())) : V().appendToDom())
        },
        attachTo: W,
        createWidget(e = {}) {
          const t = V(Ne(U, e));
          return t.appendToDom(), t
        },
        createForm: async (e = {}) => q(Ne(U, e)),
        remove() {
          j && (j.parentElement?.remove(), j = null), H.forEach((e => e())), H = []
        }
      }
    };

    function He() {
      const e = be();
      return e?.getIntegrationByName("Feedback")
    }
    var ze, qe, We, Ve, Ge, Je, Ke, Ye = {},
      Xe = [],
      Ze = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
      Qe = Array.isArray;

    function et(e, t) {
      for (var n in t) e[n] = t[n];
      return e
    }

    function tt(e) {
      var t = e.parentNode;
      t && t.removeChild(e)
    }

    function nt(e, t, n) {
      var r, o, s, i = {};
      for (s in t) "key" == s ? r = t[s] : "ref" == s ? o = t[s] : i[s] = t[s];
      if (arguments.length > 2 && (i.children = arguments.length > 3 ? ze.call(arguments, 2) : n), "function" == typeof e && null != e.defaultProps)
        for (s in e.defaultProps) void 0 === i[s] && (i[s] = e.defaultProps[s]);
      return rt(e, i, r, o, null)
    }

    function rt(e, t, n, r, o) {
      var s = {
        type: e,
        props: t,
        key: n,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == o ? ++We : o,
        __i: -1,
        __u: 0
      };
      return null == o && null != qe.vnode && qe.vnode(s), s
    }

    function ot(e) {
      return e.children
    }

    function st(e, t) {
      this.props = e, this.context = t
    }

    function it(e, t) {
      if (null == t) return e.__ ? it(e.__, e.__i + 1) : null;
      for (var n; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
      return "function" == typeof e.type ? it(e) : null
    }

    function at(e, t, n) {
      var r, o = e.__v,
        s = o.__e,
        i = e.__P;
      if (i) return (r = et({}, o)).__v = o.__v + 1, qe.vnode && qe.vnode(r), yt(i, r, o, e.__n, void 0 !== i.ownerSVGElement, 32 & o.__u ? [s] : null, t, null == s ? it(o) : s, !!(32 & o.__u), n), r.__.__k[r.__i] = r, r.__d = void 0, r.__e != s && ct(r), r
    }

    function ct(e) {
      var t, n;
      if (null != (e = e.__) && null != e.__c) {
        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
          if (null != (n = e.__k[t]) && null != n.__e) {
            e.__e = e.__c.base = n.__e;
            break
          } return ct(e)
      }
    }

    function ut(e) {
      (!e.__d && (e.__d = !0) && Ve.push(e) && !lt.__r++ || Ge !== qe.debounceRendering) && ((Ge = qe.debounceRendering) || Je)(lt)
    }

    function lt() {
      var e, t, n, r = [],
        o = [];
      for (Ve.sort(Ke); e = Ve.shift();) e.__d && (n = Ve.length, t = at(e, r, o) || t, 0 === n || Ve.length > n ? (vt(r, t, o), o.length = r.length = 0, t = void 0, Ve.sort(Ke)) : t && qe.__c && qe.__c(t, Xe));
      t && vt(r, t, o), lt.__r = 0
    }

    function dt(e, t, n, r, o, s, i, a, c, u, l) {
      var d, p, h, f, m, g = r && r.__k || Xe,
        _ = t.length;
      for (n.__d = c, function(e, t, n) {
          var r, o, s, i, a, c = t.length,
            u = n.length,
            l = u,
            d = 0;
          for (e.__k = [], r = 0; r < c; r++) null != (o = e.__k[r] = null == (o = t[r]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? rt(null, o, null, null, o) : Qe(o) ? rt(ot, {
            children: o
          }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? rt(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = e, o.__b = e.__b + 1, a = ht(o, n, i = r + d, l), o.__i = a, s = null, -1 !== a && (l--, (s = n[a]) && (s.__u |= 131072)), null == s || null === s.__v ? (-1 == a && d--, "function" != typeof o.type && (o.__u |= 65536)) : a !== i && (a === i + 1 ? d++ : a > i ? l > c - i ? d += a - i : d-- : d = a < i && a == i - 1 ? a - i : 0, a !== r + d && (o.__u |= 65536))) : (s = n[r]) && null == s.key && s.__e && (s.__e == e.__d && (e.__d = it(s)), wt(s, s, !1), n[r] = null, l--);
          if (l)
            for (r = 0; r < u; r++) null != (s = n[r]) && !(131072 & s.__u) && (s.__e == e.__d && (e.__d = it(s)), wt(s, s))
        }(n, t, g), c = n.__d, d = 0; d < _; d++) null != (h = n.__k[d]) && "boolean" != typeof h && "function" != typeof h && (p = -1 === h.__i ? Ye : g[h.__i] || Ye, h.__i = d, yt(e, h, p, o, s, i, a, c, u, l), f = h.__e, h.ref && p.ref != h.ref && (p.ref && St(p.ref, null, h), l.push(h.ref, h.__c || f, h)), null == m && null != f && (m = f), 65536 & h.__u || p.__k === h.__k ? c = pt(h, c, e) : "function" == typeof h.type && void 0 !== h.__d ? c = h.__d : f && (c = f.nextSibling), h.__d = void 0, h.__u &= -196609);
      n.__d = c, n.__e = m
    }

    function pt(e, t, n) {
      var r, o;
      if ("function" == typeof e.type) {
        for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = e, t = pt(r[o], t, n));
        return t
      }
      e.__e != t && (n.insertBefore(e.__e, t || null), t = e.__e);
      do {
        t = t && t.nextSibling
      } while (null != t && 8 === t.nodeType);
      return t
    }

    function ht(e, t, n, r) {
      var o = e.key,
        s = e.type,
        i = n - 1,
        a = n + 1,
        c = t[n];
      if (null === c || c && o == c.key && s === c.type) return n;
      if (r > (null == c || 131072 & c.__u ? 0 : 1))
        for (; i >= 0 || a < t.length;) {
          if (i >= 0) {
            if ((c = t[i]) && !(131072 & c.__u) && o == c.key && s === c.type) return i;
            i--
          }
          if (a < t.length) {
            if ((c = t[a]) && !(131072 & c.__u) && o == c.key && s === c.type) return a;
            a++
          }
        }
      return -1
    }

    function ft(e, t, n) {
      "-" === t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : "number" != typeof n || Ze.test(t) ? n : n + "px"
    }

    function mt(e, t, n, r, o) {
      var s;
      e: if ("style" === t)
        if ("string" == typeof n) e.style.cssText = n;
        else {
          if ("string" == typeof r && (e.style.cssText = r = ""), r)
            for (t in r) n && t in n || ft(e.style, t, "");
          if (n)
            for (t in n) r && n[t] === r[t] || ft(e.style, t, n[t])
        }
      else if ("o" === t[0] && "n" === t[1]) s = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + s] = n, n ? r ? n.u = r.u : (n.u = Date.now(), e.addEventListener(t, s ? _t : gt, s)) : e.removeEventListener(t, s ? _t : gt, s);
      else {
        if (o) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== t && "height" !== t && "href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && "rowSpan" !== t && "colSpan" !== t && "role" !== t && t in e) try {
          e[t] = null == n ? "" : n;
          break e
        } catch (e) {}
        "function" == typeof n || (null == n || !1 === n && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, n))
      }
    }

    function gt(e) {
      if (this.l) {
        var t = this.l[e.type + !1];
        if (e.t) {
          if (e.t <= t.u) return
        } else e.t = Date.now();
        return t(qe.event ? qe.event(e) : e)
      }
    }

    function _t(e) {
      if (this.l) return this.l[e.type + !0](qe.event ? qe.event(e) : e)
    }

    function yt(e, t, n, r, o, s, i, a, c, u) {
      var l, d, p, h, f, m, g, _, y, v, b, S, w, k, E, x = t.type;
      if (void 0 !== t.constructor) return null;
      128 & n.__u && (c = !!(32 & n.__u), s = [a = t.__e = n.__e]), (l = qe.__b) && l(t);
      e: if ("function" == typeof x) try {
        if (_ = t.props, y = (l = x.contextType) && r[l.__c], v = l ? y ? y.props.value : l.__ : r, n.__c ? g = (d = t.__c = n.__c).__ = d.__E : ("prototype" in x && x.prototype.render ? t.__c = d = new x(_, v) : (t.__c = d = new st(_, v), d.constructor = x, d.render = kt), y && y.sub(d), d.props = _, d.state || (d.state = {}), d.context = v, d.__n = r, p = d.__d = !0, d.__h = [], d._sb = []), null == d.__s && (d.__s = d.state), null != x.getDerivedStateFromProps && (d.__s == d.state && (d.__s = et({}, d.__s)), et(d.__s, x.getDerivedStateFromProps(_, d.__s))), h = d.props, f = d.state, d.__v = t, p) null == x.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), null != d.componentDidMount && d.__h.push(d.componentDidMount);
        else {
          if (null == x.getDerivedStateFromProps && _ !== h && null != d.componentWillReceiveProps && d.componentWillReceiveProps(_, v), !d.__e && (null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(_, d.__s, v) || t.__v === n.__v)) {
            for (t.__v !== n.__v && (d.props = _, d.state = d.__s, d.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.forEach((function(e) {
                e && (e.__ = t)
              })), b = 0; b < d._sb.length; b++) d.__h.push(d._sb[b]);
            d._sb = [], d.__h.length && i.push(d);
            break e
          }
          null != d.componentWillUpdate && d.componentWillUpdate(_, d.__s, v), null != d.componentDidUpdate && d.__h.push((function() {
            d.componentDidUpdate(h, f, m)
          }))
        }
        if (d.context = v, d.props = _, d.__P = e, d.__e = !1, S = qe.__r, w = 0, "prototype" in x && x.prototype.render) {
          for (d.state = d.__s, d.__d = !1, S && S(t), l = d.render(d.props, d.state, d.context), k = 0; k < d._sb.length; k++) d.__h.push(d._sb[k]);
          d._sb = []
        } else
          do {
            d.__d = !1, S && S(t), l = d.render(d.props, d.state, d.context), d.state = d.__s
          } while (d.__d && ++w < 25);
        d.state = d.__s, null != d.getChildContext && (r = et(et({}, r), d.getChildContext())), p || null == d.getSnapshotBeforeUpdate || (m = d.getSnapshotBeforeUpdate(h, f)), dt(e, Qe(E = null != l && l.type === ot && null == l.key ? l.props.children : l) ? E : [E], t, n, r, o, s, i, a, c, u), d.base = t.__e, t.__u &= -161, d.__h.length && i.push(d), g && (d.__E = d.__ = null)
      } catch (e) {
        t.__v = null, c || null != s ? (t.__e = a, t.__u |= c ? 160 : 32, s[s.indexOf(a)] = null) : (t.__e = n.__e, t.__k = n.__k), qe.__e(e, t, n)
      } else null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = bt(n.__e, t, n, r, o, s, i, c, u);
      (l = qe.diffed) && l(t)
    }

    function vt(e, t, n) {
      for (var r = 0; r < n.length; r++) St(n[r], n[++r], n[++r]);
      qe.__c && qe.__c(t, e), e.some((function(t) {
        try {
          e = t.__h, t.__h = [], e.some((function(e) {
            e.call(t)
          }))
        } catch (e) {
          qe.__e(e, t.__v)
        }
      }))
    }

    function bt(e, t, n, r, o, s, i, a, c) {
      var u, l, d, p, h, f, m, g = n.props,
        _ = t.props,
        y = t.type;
      if ("svg" === y && (o = !0), null != s)
        for (u = 0; u < s.length; u++)
          if ((h = s[u]) && "setAttribute" in h == !!y && (y ? h.localName === y : 3 === h.nodeType)) {
            e = h, s[u] = null;
            break
          } if (null == e) {
        if (null === y) return document.createTextNode(_);
        e = o ? document.createElementNS("http://www.w3.org/2000/svg", y) : document.createElement(y, _.is && _), s = null, a = !1
      }
      if (null === y) g === _ || a && e.data === _ || (e.data = _);
      else {
        if (s = s && ze.call(e.childNodes), g = n.props || Ye, !a && null != s)
          for (g = {}, u = 0; u < e.attributes.length; u++) g[(h = e.attributes[u]).name] = h.value;
        for (u in g) h = g[u], "children" == u || ("dangerouslySetInnerHTML" == u ? d = h : "key" === u || u in _ || mt(e, u, null, h, o));
        for (u in _) h = _[u], "children" == u ? p = h : "dangerouslySetInnerHTML" == u ? l = h : "value" == u ? f = h : "checked" == u ? m = h : "key" === u || a && "function" != typeof h || g[u] === h || mt(e, u, h, g[u], o);
        if (l) a || d && (l.__html === d.__html || l.__html === e.innerHTML) || (e.innerHTML = l.__html), t.__k = [];
        else if (d && (e.innerHTML = ""), dt(e, Qe(p) ? p : [p], t, n, r, o && "foreignObject" !== y, s, i, s ? s[0] : n.__k && it(n, 0), a, c), null != s)
          for (u = s.length; u--;) null != s[u] && tt(s[u]);
        a || (u = "value", void 0 !== f && (f !== e[u] || "progress" === y && !f || "option" === y && f !== g[u]) && mt(e, u, f, g[u], !1), u = "checked", void 0 !== m && m !== e[u] && mt(e, u, m, g[u], !1))
      }
      return e
    }

    function St(e, t, n) {
      try {
        "function" == typeof e ? e(t) : e.current = t
      } catch (e) {
        qe.__e(e, n)
      }
    }

    function wt(e, t, n) {
      var r, o;
      if (qe.unmount && qe.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || St(r, null, t)), null != (r = e.__c)) {
        if (r.componentWillUnmount) try {
          r.componentWillUnmount()
        } catch (e) {
          qe.__e(e, t)
        }
        r.base = r.__P = null, e.__c = void 0
      }
      if (r = e.__k)
        for (o = 0; o < r.length; o++) r[o] && wt(r[o], t, n || "function" != typeof e.type);
      n || null == e.__e || tt(e.__e), e.__ = e.__e = e.__d = void 0
    }

    function kt(e, t, n) {
      return this.constructor(e, n)
    }
    ze = Xe.slice, qe = {
      __e: function(e, t, n, r) {
        for (var o, s, i; t = t.__;)
          if ((o = t.__c) && !o.__) try {
            if ((s = o.constructor) && null != s.getDerivedStateFromError && (o.setState(s.getDerivedStateFromError(e)), i = o.__d), null != o.componentDidCatch && (o.componentDidCatch(e, r || {}), i = o.__d), i) return o.__E = o
          } catch (t) {
            e = t
          }
        throw e
      }
    }, We = 0, st.prototype.setState = function(e, t) {
      var n;
      n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = et({}, this.state), "function" == typeof e && (e = e(et({}, n), this.props)), e && et(n, e), null != e && this.__v && (t && this._sb.push(t), ut(this))
    }, st.prototype.forceUpdate = function(e) {
      this.__v && (this.__e = !0, e && this.__h.push(e), ut(this))
    }, st.prototype.render = ot, Ve = [], Je = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ke = function(e, t) {
      return e.__v.__b - t.__v.__b
    }, lt.__r = 0;
    var Et, xt, Ct, Tt, It = 0,
      Mt = [],
      Rt = [],
      Ot = qe,
      At = Ot.__b,
      Lt = Ot.__r,
      Dt = Ot.diffed,
      Nt = Ot.__c,
      Pt = Ot.unmount,
      Ft = Ot.__;

    function $t(e, t) {
      Ot.__h && Ot.__h(xt, e, It || t), It = 0;
      var n = xt.__H || (xt.__H = {
        __: [],
        __h: []
      });
      return e >= n.__.length && n.__.push({
        __V: Rt
      }), n.__[e]
    }

    function Bt(e) {
      return It = 1, Ut(Yt, e)
    }

    function Ut(e, t, n) {
      var r = $t(Et++, 2);
      if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Yt(void 0, t), function(e) {
          var t = r.__N ? r.__N[0] : r.__[0],
            n = r.t(t, e);
          t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}))
        }], r.__c = xt, !xt.u)) {
        var o = function(e, t, n) {
          if (!r.__c.__H) return !0;
          var o = r.__c.__H.__.filter((function(e) {
            return !!e.__c
          }));
          if (o.every((function(e) {
              return !e.__N
            }))) return !s || s.call(this, e, t, n);
          var i = !1;
          return o.forEach((function(e) {
            if (e.__N) {
              var t = e.__[0];
              e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (i = !0)
            }
          })), !(!i && r.__c.props === e) && (!s || s.call(this, e, t, n))
        };
        xt.u = !0;
        var s = xt.shouldComponentUpdate,
          i = xt.componentWillUpdate;
        xt.componentWillUpdate = function(e, t, n) {
          if (this.__e) {
            var r = s;
            s = void 0, o(e, t, n), s = r
          }
          i && i.call(this, e, t, n)
        }, xt.shouldComponentUpdate = o
      }
      return r.__N || r.__
    }

    function jt(e, t) {
      var n = $t(Et++, 4);
      !Ot.__s && Kt(n.__H, t) && (n.__ = e, n.i = t, xt.__h.push(n))
    }

    function Ht(e, t) {
      var n = $t(Et++, 7);
      return Kt(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__
    }

    function zt(e, t) {
      return It = 8, Ht((function() {
        return e
      }), t)
    }

    function qt() {
      for (var e; e = Mt.shift();)
        if (e.__P && e.__H) try {
          e.__H.__h.forEach(Gt), e.__H.__h.forEach(Jt), e.__H.__h = []
        } catch (t) {
          e.__H.__h = [], Ot.__e(t, e.__v)
        }
    }
    Ot.__b = function(e) {
      xt = null, At && At(e)
    }, Ot.__ = function(e, t) {
      t.__k && t.__k.__m && (e.__m = t.__k.__m), Ft && Ft(e, t)
    }, Ot.__r = function(e) {
      Lt && Lt(e), Et = 0;
      var t = (xt = e.__c).__H;
      t && (Ct === xt ? (t.__h = [], xt.__h = [], t.__.forEach((function(e) {
        e.__N && (e.__ = e.__N), e.__V = Rt, e.__N = e.i = void 0
      }))) : (t.__h.forEach(Gt), t.__h.forEach(Jt), t.__h = [], Et = 0)), Ct = xt
    }, Ot.diffed = function(e) {
      Dt && Dt(e);
      var t = e.__c;
      t && t.__H && (t.__H.__h.length && (1 !== Mt.push(t) && Tt === Ot.requestAnimationFrame || ((Tt = Ot.requestAnimationFrame) || Vt)(qt)), t.__H.__.forEach((function(e) {
        e.i && (e.__H = e.i), e.__V !== Rt && (e.__ = e.__V), e.i = void 0, e.__V = Rt
      }))), Ct = xt = null
    }, Ot.__c = function(e, t) {
      t.some((function(e) {
        try {
          e.__h.forEach(Gt), e.__h = e.__h.filter((function(e) {
            return !e.__ || Jt(e)
          }))
        } catch (n) {
          t.some((function(e) {
            e.__h && (e.__h = [])
          })), t = [], Ot.__e(n, e.__v)
        }
      })), Nt && Nt(e, t)
    }, Ot.unmount = function(e) {
      Pt && Pt(e);
      var t, n = e.__c;
      n && n.__H && (n.__H.__.forEach((function(e) {
        try {
          Gt(e)
        } catch (e) {
          t = e
        }
      })), n.__H = void 0, t && Ot.__e(t, n.__v))
    };
    var Wt = "function" == typeof requestAnimationFrame;

    function Vt(e) {
      var t, n = function() {
          clearTimeout(r), Wt && cancelAnimationFrame(t), setTimeout(e)
        },
        r = setTimeout(n, 100);
      Wt && (t = requestAnimationFrame(n))
    }

    function Gt(e) {
      var t = xt,
        n = e.__c;
      "function" == typeof n && (e.__c = void 0, n()), xt = t
    }

    function Jt(e) {
      var t = xt;
      e.__c = e.__(), xt = t
    }

    function Kt(e, t) {
      return !e || e.length !== t.length || t.some((function(t, n) {
        return t !== e[n]
      }))
    }

    function Yt(e, t) {
      return "function" == typeof t ? t(e) : t
    }
    const Xt = Object.defineProperty({
      __proto__: null,
      useCallback: zt,
      useContext: function(e) {
        var t = xt.context[e.__c],
          n = $t(Et++, 9);
        return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(xt)), t.props.value) : e.__
      },
      useDebugValue: function(e, t) {
        Ot.useDebugValue && Ot.useDebugValue(t ? t(e) : e)
      },
      useEffect: function(e, t) {
        var n = $t(Et++, 3);
        !Ot.__s && Kt(n.__H, t) && (n.__ = e, n.i = t, xt.__H.__h.push(n))
      },
      useErrorBoundary: function(e) {
        var t = $t(Et++, 10),
          n = Bt();
        return t.__ = e, xt.componentDidCatch || (xt.componentDidCatch = function(e, r) {
          t.__ && t.__(e, r), n[1](e)
        }), [n[0], function() {
          n[1](void 0)
        }]
      },
      useId: function() {
        var e = $t(Et++, 11);
        if (!e.__) {
          for (var t = xt.__v; null !== t && !t.__m && null !== t.__;) t = t.__;
          var n = t.__m || (t.__m = [0, 0]);
          e.__ = "P" + n[0] + "-" + n[1]++
        }
        return e.__
      },
      useImperativeHandle: function(e, t, n) {
        It = 6, jt((function() {
          return "function" == typeof e ? (e(t()), function() {
            return e(null)
          }) : e ? (e.current = t(), function() {
            return e.current = null
          }) : void 0
        }), null == n ? n : n.concat(e))
      },
      useLayoutEffect: jt,
      useMemo: Ht,
      useReducer: Ut,
      useRef: function(e) {
        return It = 5, Ht((function() {
          return {
            current: e
          }
        }), [])
      },
      useState: Bt
    }, Symbol.toStringTag, {
      value: "Module"
    });

    function Zt() {
      const e = e => Re.createElementNS("http://www.w3.org/2000/svg", e),
        t = Pe(e("svg"), {
          width: "32",
          height: "30",
          viewBox: "0 0 72 66",
          fill: "inherit"
        }),
        n = Pe(e("path"), {
          transform: "translate(11, 11)",
          d: "M29,2.26a4.67,4.67,0,0,0-8,0L14.42,13.53A32.21,32.21,0,0,1,32.17,40.19H27.55A27.68,27.68,0,0,0,12.09,17.47L6,28a15.92,15.92,0,0,1,9.23,12.17H4.62A.76.76,0,0,1,4,39.06l2.94-5a10.74,10.74,0,0,0-3.36-1.9l-2.91,5a4.54,4.54,0,0,0,1.69,6.24A4.66,4.66,0,0,0,4.62,44H19.15a19.4,19.4,0,0,0-8-17.31l2.31-4A23.87,23.87,0,0,1,23.76,44H36.07a35.88,35.88,0,0,0-16.41-31.8l4.67-8a.77.77,0,0,1,1.05-.27c.53.29,20.29,34.77,20.66,35.17a.76.76,0,0,1-.68,1.13H40.6q.09,1.91,0,3.81h4.78A4.59,4.59,0,0,0,50,39.43a4.49,4.49,0,0,0-.62-2.28Z"
        });
      return t.appendChild(n), t
    }

    function Qt({
      options: e
    }) {
      const t = Ht((() => ({
        __html: Zt().outerHTML
      })), []);
      return nt("h2", {
        class: "dialog__header"
      }, nt("span", {
        class: "dialog__title"
      }, e.formTitle), e.showBranding ? nt("a", {
        class: "brand-link",
        target: "_blank",
        href: "https://sentry.io/welcome/",
        title: "Powered by Sentry",
        rel: "noopener noreferrer",
        dangerouslySetInnerHTML: t
      }) : null)
    }

    function en(e, t) {
      const n = e.get(t);
      return "string" == typeof n ? n.trim() : ""
    }

    function tn({
      options: e,
      defaultEmail: t,
      defaultName: n,
      onFormClose: r,
      onSubmit: o,
      onSubmitSuccess: s,
      onSubmitError: i,
      showEmail: a,
      showName: c,
      screenshotInput: u
    }) {
      const {
        tags: l,
        addScreenshotButtonLabel: d,
        removeScreenshotButtonLabel: p,
        cancelButtonLabel: h,
        emailLabel: f,
        emailPlaceholder: m,
        isEmailRequired: g,
        isNameRequired: _,
        messageLabel: y,
        messagePlaceholder: v,
        nameLabel: b,
        namePlaceholder: S,
        submitButtonLabel: w,
        isRequiredLabel: k
      } = e, [E, x] = Bt(!1), [C, T] = Bt(null), [I, M] = Bt(!1), R = u?.input, [O, L] = Bt(null), D = zt((e => {
        L(e), M(!1)
      }), []), N = zt((e => {
        const t = function(e, t) {
          const n = [];
          return t.isNameRequired && !e.name && n.push(t.nameLabel), t.isEmailRequired && !e.email && n.push(t.emailLabel), e.message || n.push(t.messageLabel), n
        }(e, {
          emailLabel: f,
          isEmailRequired: g,
          isNameRequired: _,
          messageLabel: y,
          nameLabel: b
        });
        return t.length > 0 ? T(`Please enter in the following required fields: ${t.join(", ")}`) : T(null), 0 === t.length
      }), [f, g, _, y, b]), P = zt((async e => {
        x(!0);
        try {
          if (e.preventDefault(), !(e.target instanceof HTMLFormElement)) return;
          const t = new FormData(e.target),
            n = await (u && I ? u.value() : void 0),
            r = {
              name: en(t, "name"),
              email: en(t, "email"),
              message: en(t, "message"),
              attachments: n ? [n] : void 0
            };
          if (!N(r)) return;
          try {
            await o({
              name: r.name,
              email: r.email,
              message: r.message,
              source: "widget",
              tags: l
            }, {
              attachments: r.attachments
            }), s(r)
          } catch (e) {
            De && A.error(e), T(e), i(e)
          }
        } finally {
          x(!1)
        }
      }), [u && I, s, i]);
      return nt("form", {
        class: "form",
        onSubmit: P
      }, R && I ? nt(R, {
        onError: D
      }) : null, nt("fieldset", {
        class: "form__right",
        "data-sentry-feedback": !0,
        disabled: E
      }, nt("div", {
        class: "form__top"
      }, C ? nt("div", {
        class: "form__error-container"
      }, C) : null, c ? nt("label", {
        for: "name",
        class: "form__label"
      }, nt(nn, {
        label: b,
        isRequiredLabel: k,
        isRequired: _
      }), nt("input", {
        class: "form__input",
        defaultValue: n,
        id: "name",
        name: "name",
        placeholder: S,
        required: _,
        type: "text"
      })) : nt("input", {
        "aria-hidden": !0,
        value: n,
        name: "name",
        type: "hidden"
      }), a ? nt("label", {
        for: "email",
        class: "form__label"
      }, nt(nn, {
        label: f,
        isRequiredLabel: k,
        isRequired: g
      }), nt("input", {
        class: "form__input",
        defaultValue: t,
        id: "email",
        name: "email",
        placeholder: m,
        required: g,
        type: "email"
      })) : nt("input", {
        "aria-hidden": !0,
        value: t,
        name: "email",
        type: "hidden"
      }), nt("label", {
        for: "message",
        class: "form__label"
      }, nt(nn, {
        label: y,
        isRequiredLabel: k,
        isRequired: !0
      }), nt("textarea", {
        autoFocus: !0,
        class: "form__input form__input--textarea",
        id: "message",
        name: "message",
        placeholder: v,
        required: !0,
        rows: 5
      })), R ? nt("label", {
        for: "screenshot",
        class: "form__label"
      }, nt("button", {
        class: "btn btn--default",
        disabled: E,
        type: "button",
        onClick: () => {
          L(null), M((e => !e))
        }
      }, I ? p : d), O ? nt("div", {
        class: "form__error-container"
      }, O.message) : null) : null), nt("div", {
        class: "btn-group"
      }, nt("button", {
        class: "btn btn--primary",
        disabled: E,
        type: "submit"
      }, w), nt("button", {
        class: "btn btn--default",
        disabled: E,
        type: "button",
        onClick: r
      }, h))))
    }

    function nn({
      label: e,
      isRequired: t,
      isRequiredLabel: n
    }) {
      return nt("span", {
        class: "form__label__text"
      }, e, t && nt("span", {
        class: "form__label__text--required"
      }, n))
    }

    function rn() {
      const e = e => Me.document.createElementNS("http://www.w3.org/2000/svg", e),
        t = Pe(e("svg"), {
          width: "16",
          height: "17",
          viewBox: "0 0 16 17",
          fill: "inherit"
        }),
        n = Pe(e("g"), {
          clipPath: "url(#clip0_57_156)"
        }),
        r = Pe(e("path"), {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M3.55544 15.1518C4.87103 16.0308 6.41775 16.5 8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.91775 15.5308 5.37103 14.6518 4.05544C13.7727 2.73985 12.5233 1.71447 11.0615 1.10897C9.59966 0.503466 7.99113 0.34504 6.43928 0.653721C4.88743 0.962403 3.46197 1.72433 2.34315 2.84315C1.22433 3.96197 0.462403 5.38743 0.153721 6.93928C-0.15496 8.49113 0.00346625 10.0997 0.608967 11.5615C1.21447 13.0233 2.23985 14.2727 3.55544 15.1518ZM4.40546 3.1204C5.46945 2.40946 6.72036 2.03 8 2.03C9.71595 2.03 11.3616 2.71166 12.575 3.92502C13.7883 5.13838 14.47 6.78405 14.47 8.5C14.47 9.77965 14.0905 11.0306 13.3796 12.0945C12.6687 13.1585 11.6582 13.9878 10.476 14.4775C9.29373 14.9672 7.99283 15.0953 6.73777 14.8457C5.48271 14.596 4.32987 13.9798 3.42502 13.075C2.52018 12.1701 1.90397 11.0173 1.65432 9.76224C1.40468 8.50718 1.5328 7.20628 2.0225 6.02404C2.5122 4.8418 3.34148 3.83133 4.40546 3.1204Z"
        }),
        o = Pe(e("path"), {
          d: "M6.68775 12.4297C6.78586 12.4745 6.89218 12.4984 7 12.5C7.11275 12.4955 7.22315 12.4664 7.32337 12.4145C7.4236 12.3627 7.51121 12.2894 7.58 12.2L12 5.63999C12.0848 5.47724 12.1071 5.28902 12.0625 5.11098C12.0178 4.93294 11.9095 4.77744 11.7579 4.67392C11.6064 4.57041 11.4221 4.52608 11.24 4.54931C11.0579 4.57254 10.8907 4.66173 10.77 4.79999L6.88 10.57L5.13 8.56999C5.06508 8.49566 4.98613 8.43488 4.89768 8.39111C4.80922 8.34735 4.713 8.32148 4.61453 8.31498C4.51605 8.30847 4.41727 8.32147 4.32382 8.35322C4.23038 8.38497 4.14413 8.43484 4.07 8.49999C3.92511 8.63217 3.83692 8.81523 3.82387 9.01092C3.81083 9.2066 3.87393 9.39976 4 9.54999L6.43 12.24C6.50187 12.3204 6.58964 12.385 6.68775 12.4297Z"
        });
      t.appendChild(n).append(o, r);
      const s = e("defs"),
        i = Pe(e("clipPath"), {
          id: "clip0_57_156"
        }),
        a = Pe(e("rect"), {
          width: "16",
          height: "16",
          fill: "white",
          transform: "translate(0 0.5)"
        });
      return i.appendChild(a), s.appendChild(i), t.appendChild(s).appendChild(i).appendChild(a), t
    }

    function on({
      open: e,
      onFormSubmitted: t,
      ...n
    }) {
      const r = n.options,
        o = Ht((() => ({
          __html: rn().outerHTML
        })), []),
        [s, i] = Bt(null),
        a = zt((() => {
          s && (clearTimeout(s), i(null)), t()
        }), [s]),
        c = zt((e => {
          n.onSubmitSuccess(e), i(setTimeout((() => {
            t(), i(null)
          }), 5e3))
        }), [t]);
      return nt(ot, null, s ? nt("div", {
        class: "success__position",
        onClick: a
      }, nt("div", {
        class: "success__content"
      }, r.successMessageText, nt("span", {
        class: "success__icon",
        dangerouslySetInnerHTML: o
      }))) : nt("dialog", {
        class: "dialog",
        onClick: r.onFormClose,
        open: e
      }, nt("div", {
        class: "dialog__position"
      }, nt("div", {
        class: "dialog__content",
        onClick: e => {
          e.stopPropagation()
        }
      }, nt(Qt, {
        options: r
      }), nt(tn, {
        ...n,
        onSubmitSuccess: c
      })))))
    }
    const sn = () => ({
      name: "FeedbackModal",
      setupOnce() {},
      createDialog: ({
        options: e,
        screenshotIntegration: t,
        sendFeedback: n,
        shadow: r
      }) => {
        const o = r,
          s = e.useSentryUser,
          i = function() {
            const e = me().getUser(),
              t = ge().getUser(),
              n = _e().getUser();
            return e && Object.keys(e).length ? e : t && Object.keys(t).length ? t : n
          }(),
          a = Re.createElement("div"),
          c = function(e) {
            const t = Re.createElement("style");
            return t.textContent = "\n:host {\n  --dialog-inset: var(--inset);\n}\n\n\n.dialog {\n  position: fixed;\n  z-index: var(--z-index);\n  margin: 0;\n  inset: 0;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 100vh;\n  width: 100vw;\n\n  color: var(--dialog-color, var(--foreground));\n  fill: var(--dialog-color, var(--foreground));\n  line-height: 1.75em;\n\n  background-color: rgba(0, 0, 0, 0.05);\n  border: none;\n  inset: 0;\n  opacity: 1;\n  transition: opacity 0.2s ease-in-out;\n}\n\n.dialog__position {\n  position: fixed;\n  z-index: var(--z-index);\n  inset: var(--dialog-inset);\n  padding: var(--page-margin);\n  display: flex;\n  max-height: calc(100vh - (2 * var(--page-margin)));\n}\n@media (max-width: 600px) {\n  .dialog__position {\n    inset: var(--page-margin);\n    padding: 0;\n  }\n}\n\n.dialog__position:has(.editor) {\n  inset: var(--page-margin);\n  padding: 0;\n}\n\n.dialog:not([open]) {\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n}\n.dialog:not([open]) .dialog__content {\n  transform: translate(0, -16px) scale(0.98);\n}\n\n.dialog__content {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: var(--dialog-padding, 24px);\n  max-width: 100%;\n  width: 100%;\n  max-height: 100%;\n  overflow: auto;\n\n  background: var(--dialog-background, var(--background));\n  border-radius: var(--dialog-border-radius, 20px);\n  border: var(--dialog-border, var(--border));\n  box-shadow: var(--dialog-box-shadow, var(--box-shadow));\n  transform: translate(0, 0) scale(1);\n  transition: transform 0.2s ease-in-out;\n}\n\n\n\n.dialog__header {\n  display: flex;\n  gap: 4px;\n  justify-content: space-between;\n  font-weight: var(--dialog-header-weight, 600);\n  margin: 0;\n}\n.dialog__title {\n  align-self: center;\n  width: var(--form-width, 272px);\n}\n\n@media (max-width: 600px) {\n  .dialog__title {\n    width: auto;\n  }\n}\n\n.dialog__position:has(.editor) .dialog__title {\n  width: auto;\n}\n\n\n.brand-link {\n  display: inline-flex;\n}\n.brand-link:focus-visible {\n  outline: var(--outline);\n}\n\n\n.form {\n  display: flex;\n  overflow: auto;\n  flex-direction: row;\n  gap: 16px;\n  flex: 1 0;\n}\n\n.form fieldset {\n  border: none;\n  margin: 0;\n  padding: 0;\n}\n\n.form__right {\n  flex: 0 0 auto;\n  display: flex;\n  overflow: auto;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: 20px;\n  width: var(--form-width, 100%);\n}\n\n.dialog__position:has(.editor) .form__right {\n  width: var(--form-width, 272px);\n}\n\n.form__top {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.form__error-container {\n  color: var(--error-color);\n  fill: var(--error-color);\n}\n\n.form__label {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin: 0px;\n}\n\n.form__label__text {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.form__label__text--required {\n  font-size: 0.85em;\n}\n\n.form__input {\n  font-family: inherit;\n  line-height: inherit;\n  background: transparent;\n  box-sizing: border-box;\n  border: var(--input-border, var(--border));\n  border-radius: var(--input-border-radius, 6px);\n  color: var(--input-color, inherit);\n  fill: var(--input-color, inherit);\n  font-size: var(--input-font-size, inherit);\n  font-weight: var(--input-font-weight, 500);\n  padding: 6px 12px;\n}\n\n.form__input::placeholder {\n  opacity: 0.65;\n  color: var(--input-placeholder-color, inherit);\n  filter: var(--interactive-filter);\n}\n\n.form__input:focus-visible {\n  outline: var(--input-focus-outline, var(--outline));\n}\n\n.form__input--textarea {\n  font-family: inherit;\n  resize: vertical;\n}\n\n.error {\n  color: var(--error-color);\n  fill: var(--error-color);\n}\n\n\n.btn-group {\n  display: grid;\n  gap: 8px;\n}\n\n.btn {\n  line-height: inherit;\n  border: var(--button-border, var(--border));\n  border-radius: var(--button-border-radius, 6px);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: var(--button-font-size, inherit);\n  font-weight: var(--button-font-weight, 600);\n  padding: var(--button-padding, 6px 16px);\n}\n.btn[disabled] {\n  opacity: 0.6;\n  pointer-events: none;\n}\n\n.btn--primary {\n  color: var(--button-primary-color, var(--accent-foreground));\n  fill: var(--button-primary-color, var(--accent-foreground));\n  background: var(--button-primary-background, var(--accent-background));\n  border: var(--button-primary-border, var(--border));\n  border-radius: var(--button-primary-border-radius, 6px);\n  font-weight: var(--button-primary-font-weight, 500);\n}\n.btn--primary:hover {\n  color: var(--button-primary-hover-color, var(--accent-foreground));\n  fill: var(--button-primary-hover-color, var(--accent-foreground));\n  background: var(--button-primary-hover-background, var(--accent-background));\n  filter: var(--interactive-filter);\n}\n.btn--primary:focus-visible {\n  background: var(--button-primary-hover-background, var(--accent-background));\n  filter: var(--interactive-filter);\n  outline: var(--button-primary-focus-outline, var(--outline));\n}\n\n.btn--default {\n  color: var(--button-color, var(--foreground));\n  fill: var(--button-color, var(--foreground));\n  background: var(--button-background, var(--background));\n  border: var(--button-border, var(--border));\n  border-radius: var(--button-border-radius, 6px);\n  font-weight: var(--button-font-weight, 500);\n}\n.btn--default:hover {\n  color: var(--button-color, var(--foreground));\n  fill: var(--button-color, var(--foreground));\n  background: var(--button-hover-background, var(--background));\n  filter: var(--interactive-filter);\n}\n.btn--default:focus-visible {\n  background: var(--button-hover-background, var(--background));\n  filter: var(--interactive-filter);\n  outline: var(--button-focus-outline, var(--outline));\n}\n\n\n.success__position {\n  position: fixed;\n  inset: var(--dialog-inset);\n  padding: var(--page-margin);\n  z-index: var(--z-index);\n}\n.success__content {\n  background: var(--success-background, var(--background));\n  border: var(--success-border, var(--border));\n  border-radius: var(--success-border-radius, 1.7em/50%);\n  box-shadow: var(--success-box-shadow, var(--box-shadow));\n  font-weight: var(--success-font-weight, 600);\n  color: var(--success-color);\n  fill: var(--success-color);\n  padding: 12px 24px;\n  line-height: 1.75em;\n\n  display: grid;\n  align-items: center;\n  grid-auto-flow: column;\n  gap: 6px;\n  cursor: default;\n}\n\n.success__icon {\n  display: flex;\n}\n\n", e && t.setAttribute("nonce", e), t
          }(e.styleNonce);
        let u = "";
        const l = {
            get el() {
              return a
            },
            appendToDom() {
              o.contains(c) || o.contains(a) || (o.appendChild(c), o.appendChild(a))
            },
            removeFromDom() {
              a.remove(), c.remove(), Re.body.style.overflow = u
            },
            open() {
              p(!0), e.onFormOpen?.(), be()?.emit("openFeedbackWidget"), u = Re.body.style.overflow, Re.body.style.overflow = "hidden"
            },
            close() {
              p(!1), Re.body.style.overflow = u
            }
          },
          d = t?.createInput({
            h: nt,
            hooks: Xt,
            dialog: l,
            options: e
          }),
          p = t => {
            ! function(e, t) {
              var n, r, o;
              qe.__ && qe.__(e, t), n = t.__k, r = [], o = [], yt(t, e = t.__k = nt(ot, null, [e]), n || Ye, Ye, void 0 !== t.ownerSVGElement, n ? null : t.firstChild ? ze.call(t.childNodes) : null, r, n ? n.__e : t.firstChild, !1, o), e.__d = void 0, vt(r, e, o)
            }(nt(on, {
              options: e,
              screenshotInput: d,
              showName: e.showName || e.isNameRequired,
              showEmail: e.showEmail || e.isEmailRequired,
              defaultName: s && i && i[s.name] || "",
              defaultEmail: s && i && i[s.email] || "",
              onFormClose: () => {
                p(!1), e.onFormClose?.()
              },
              onSubmit: n,
              onSubmitSuccess: t => {
                p(!1), e.onSubmitSuccess?.(t)
              },
              onSubmitError: t => {
                e.onSubmitError?.(t)
              },
              onFormSubmitted: () => {
                e.onFormSubmitted?.()
              },
              open: t
            }), a)
          };
        return l
      }
    });

    function an(e) {
      const t = Re.createElement("style"),
        n = "#1A141F",
        r = "#302735";
      return t.textContent = `\n.editor {\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n}\n\n.editor__image-container {\n  justify-items: center;\n  padding: 15px;\n  position: relative;\n  height: 100%;\n  border-radius: var(--menu-border-radius, 6px);\n\n  background-color: ${n};\n  background-image: repeating-linear-gradient(\n      -145deg,\n      transparent,\n      transparent 8px,\n      ${n} 8px,\n      ${n} 11px\n    ),\n    repeating-linear-gradient(\n      -45deg,\n      transparent,\n      transparent 15px,\n      ${r} 15px,\n      ${r} 16px\n    );\n}\n\n.editor__canvas-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.editor__canvas-container > * {\n  object-fit: contain;\n  position: absolute;\n}\n\n.editor__tool-container {\n  padding-top: 8px;\n  display: flex;\n  justify-content: center;\n}\n\n.editor__tool-bar {\n  display: flex;\n  gap: 8px;\n}\n\n.editor__tool {\n  display: flex;\n  padding: 8px 12px;\n  justify-content: center;\n  align-items: center;\n  border: var(--button-border, var(--border));\n  border-radius: var(--button-border-radius, 6px);\n  background: var(--button-background, var(--background));\n  color: var(--button-color, var(--foreground));\n}\n\n.editor__tool--active {\n  background: var(--button-primary-background, var(--accent-background));\n  color: var(--button-primary-color, var(--accent-foreground));\n}\n\n.editor__rect {\n  position: absolute;\n  z-index: 2;\n}\n\n.editor__rect button {\n  opacity: 0;\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  cursor: pointer;\n  padding: 0;\n  z-index: 3;\n  border: none;\n  background: none;\n}\n\n.editor__rect:hover button {\n  opacity: 1;\n}\n`, e && t.setAttribute("nonce", e), t
    }

    function cn(e, t, n) {
      if (!e) return;
      const r = e.getContext("2d", t);
      r && n(e, r)
    }

    function un(e, t) {
      cn(e, {
        alpha: !0
      }, ((e, n) => {
        n.drawImage(t, 0, 0, t.width, t.height, 0, 0, e.width, e.height)
      }))
    }

    function ln(e, t, n) {
      cn(e, {
        alpha: !0
      }, ((e, r) => {
        n.length && (r.fillStyle = "rgba(0, 0, 0, 0.25)", r.fillRect(0, 0, e.width, e.height)), n.forEach((e => {
          ! function(e, t, n) {
            switch (e.type) {
              case "highlight":
                t.shadowColor = "rgba(0, 0, 0, 0.7)", t.shadowBlur = 50, t.fillStyle = n, t.fillRect(e.x - 1, e.y - 1, e.w + 2, e.h + 2), t.clearRect(e.x, e.y, e.w, e.h);
                break;
              case "hide":
                t.fillStyle = "rgb(0, 0, 0)", t.fillRect(e.x, e.y, e.w, e.h)
            }
          }(e, r, t)
        }))
      }))
    }

    function dn({
      h: e,
      hooks: t,
      outputBuffer: n,
      dialog: r,
      options: o
    }) {
      const s = function({
          hooks: e
        }) {
          return function({
            onBeforeScreenshot: t,
            onScreenshot: n,
            onAfterScreenshot: r,
            onError: o
          }) {
            const s = function() {
              const [t, n] = e.useState(Me.devicePixelRatio ?? 1);
              return e.useEffect((() => {
                const e = () => {
                    n(Me.devicePixelRatio)
                  },
                  t = matchMedia(`(resolution: ${Me.devicePixelRatio}dppx)`);
                return t.addEventListener("change", e), () => {
                  t.removeEventListener("change", e)
                }
              }), []), t
            }();
            e.useEffect((() => {
              (async () => {
                t();
                const e = await Oe.mediaDevices.getDisplayMedia({
                    video: {
                      width: Me.innerWidth * s,
                      height: Me.innerHeight * s
                    },
                    audio: !1,
                    monitorTypeSurfaces: "exclude",
                    preferCurrentTab: !0,
                    selfBrowserSurface: "include",
                    surfaceSwitching: "exclude"
                  }),
                  o = Re.createElement("video");
                await new Promise(((t, r) => {
                  o.srcObject = e, o.onloadedmetadata = () => {
                    n(o, s), e.getTracks().forEach((e => e.stop())), t()
                  }, o.play().catch(r)
                })), r()
              })().catch(o)
            }), [])
          }
        }({
          hooks: t
        }),
        i = function({
          h: e
        }) {
          return function({
            action: t,
            setAction: n
          }) {
            return e("div", {
              class: "editor__tool-container"
            }, e("div", {
              class: "editor__tool-bar"
            }, e("button", {
              type: "button",
              class: "editor__tool " + ("highlight" === t ? "editor__tool--active" : ""),
              onClick: () => {
                n("highlight" === t ? "" : "highlight")
              }
            }, "Highlight"), e("button", {
              type: "button",
              class: "editor__tool " + ("hide" === t ? "editor__tool--active" : ""),
              onClick: () => {
                n("hide" === t ? "" : "hide")
              }
            }, "Hide")))
          }
        }({
          h: e
        }),
        a = function({
          h: e
        }) {
          return function() {
            return e("svg", {
              "data-test-id": "icon-close",
              viewBox: "0 0 16 16",
              fill: "#2B2233",
              height: "25px",
              width: "25px"
            }, e("circle", {
              r: "7",
              cx: "8",
              cy: "8",
              fill: "white"
            }), e("path", {
              strokeWidth: "1.5",
              d: "M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,1.53A6.47,6.47,0,1,0,14.47,8,6.47,6.47,0,0,0,8,1.53Z"
            }), e("path", {
              strokeWidth: "1.5",
              d: "M5.34,11.41a.71.71,0,0,1-.53-.22.74.74,0,0,1,0-1.06l5.32-5.32a.75.75,0,0,1,1.06,1.06L5.87,11.19A.74.74,0,0,1,5.34,11.41Z"
            }), e("path", {
              strokeWidth: "1.5",
              d: "M10.66,11.41a.74.74,0,0,1-.53-.22L4.81,5.87A.75.75,0,0,1,5.87,4.81l5.32,5.32a.74.74,0,0,1,0,1.06A.71.71,0,0,1,10.66,11.41Z"
            }))
          }
        }({
          h: e
        }),
        c = {
          __html: an(o.styleNonce).innerText
        },
        u = r.el.style,
        l = ({
          screenshot: r
        }) => {
          const [s, u] = t.useState("highlight"), [l, d] = t.useState([]), p = t.useRef(null), h = t.useRef(null), f = t.useRef(null), m = t.useRef(null), [g, _] = t.useState(1), y = t.useMemo((() => {
            const e = Re.getElementById(o.id);
            if (!e) return "white";
            const t = getComputedStyle(e);
            return t.getPropertyValue("--button-primary-background") || t.getPropertyValue("--accent-background")
          }), [o.id]);
          t.useLayoutEffect((() => {
            const e = () => {
              const t = p.current;
              t && (cn(r.canvas, {
                alpha: !1
              }, (e => {
                const n = Math.min(t.clientWidth / e.width, t.clientHeight / e.height);
                _(n)
              })), 0 !== t.clientHeight && 0 !== t.clientWidth || setTimeout(e, 0))
            };
            return e(), Me.addEventListener("resize", e), () => {
              Me.removeEventListener("resize", e)
            }
          }), [r]);
          const v = t.useCallback(((e, t) => {
            cn(e, {
              alpha: !0
            }, ((e, n) => {
              n.scale(t, t), e.width = r.canvas.width, e.height = r.canvas.height
            }))
          }), [r]);
          t.useEffect((() => {
            v(h.current, r.dpi), un(h.current, r.canvas)
          }), [r]), t.useEffect((() => {
            v(f.current, r.dpi), cn(f.current, {
              alpha: !0
            }, ((e, t) => {
              t.clearRect(0, 0, e.width, e.height)
            })), ln(f.current, y, l)
          }), [l, y]), t.useEffect((() => {
            v(n, r.dpi), un(n, r.canvas), cn(Re.createElement("canvas"), {
              alpha: !0
            }, ((e, t) => {
              t.scale(r.dpi, r.dpi), e.width = r.canvas.width, e.height = r.canvas.height, ln(e, y, l), un(n, e)
            }))
          }), [l, r, y]);
          const b = t.useCallback((e => t => {
              t.preventDefault(), t.stopPropagation(), d((t => {
                const n = [...t];
                return n.splice(e, 1), n
              }))
            }), []),
            S = {
              width: r.canvas.width * g + "px",
              height: r.canvas.height * g + "px"
            },
            w = e => {
              e.stopPropagation()
            };
          return e("div", {
            class: "editor"
          }, e("style", {
            nonce: o.styleNonce,
            dangerouslySetInnerHTML: c
          }), e("div", {
            class: "editor__image-container"
          }, e("div", {
            class: "editor__canvas-container",
            ref: p
          }, e("canvas", {
            ref: h,
            id: "background",
            style: S
          }), e("canvas", {
            ref: f,
            id: "foreground",
            style: S
          }), e("div", {
            ref: m,
            onMouseDown: e => {
              if (!s || !m.current) return;
              const t = m.current.getBoundingClientRect(),
                n = {
                  type: s,
                  x: e.offsetX / g,
                  y: e.offsetY / g
                },
                r = (e, n) => {
                  const r = (n.clientX - t.x) / g,
                    o = (n.clientY - t.y) / g;
                  return {
                    type: e.type,
                    x: Math.min(e.x, r),
                    y: Math.min(e.y, o),
                    w: Math.abs(r - e.x),
                    h: Math.abs(o - e.y)
                  }
                },
                o = e => {
                  cn(f.current, {
                    alpha: !0
                  }, ((e, t) => {
                    t.clearRect(0, 0, e.width, e.height)
                  })), ln(f.current, y, [...l, r(n, e)])
                },
                i = e => {
                  const t = r(n, e);
                  t.w * g >= 1 && t.h * g >= 1 && d((e => [...e, t])), Re.removeEventListener("mousemove", o), Re.removeEventListener("mouseup", i)
                };
              Re.addEventListener("mousemove", o), Re.addEventListener("mouseup", i)
            },
            style: S
          }, l.map(((t, n) => e("div", {
            key: n,
            class: "editor__rect",
            style: {
              top: t.y * g + "px",
              left: t.x * g + "px",
              width: t.w * g + "px",
              height: t.h * g + "px"
            }
          }, e("button", {
            "aria-label": "Remove",
            onClick: b(n),
            onMouseDown: w,
            onMouseUp: w,
            type: "button"
          }, e(a, null)))))))), e(i, {
            action: s,
            setAction: u
          }))
        };
      return function({
        onError: r
      }) {
        const [o, i] = t.useState();
        return s({
          onBeforeScreenshot: t.useCallback((() => {
            u.display = "none"
          }), []),
          onScreenshot: t.useCallback(((e, t) => {
            cn(Re.createElement("canvas"), {
              alpha: !1
            }, ((n, r) => {
              r.scale(t, t), n.width = e.videoWidth, n.height = e.videoHeight, r.drawImage(e, 0, 0, n.width, n.height), i({
                canvas: n,
                dpi: t
              })
            })), n.width = e.videoWidth, n.height = e.videoHeight
          }), []),
          onAfterScreenshot: t.useCallback((() => {
            u.display = "block"
          }), []),
          onError: t.useCallback((e => {
            u.display = "block", r(e)
          }), [])
        }), o ? e(l, {
          screenshot: o
        }) : e("div", null)
      }
    }
    const pn = () => ({
        name: "FeedbackScreenshot",
        setupOnce() {},
        createInput: ({
          h: e,
          hooks: t,
          dialog: n,
          options: r
        }) => {
          const o = Re.createElement("canvas");
          return {
            input: dn({
              h: e,
              hooks: t,
              outputBuffer: o,
              dialog: n,
              options: r
            }),
            value: async () => {
              const e = await new Promise((e => {
                o.toBlob(e, "image/png")
              }));
              if (e) return {
                data: new Uint8Array(await e.arrayBuffer()),
                filename: "screenshot.png",
                contentType: "application/png"
              }
            }
          }
        }
      }),
      hn = "production";
    var fn;

    function mn(e) {
      return new _n((t => {
        t(e)
      }))
    }

    function gn(e) {
      return new _n(((t, n) => {
        n(e)
      }))
    }! function(e) {
      e[e.PENDING = 0] = "PENDING", e[e.RESOLVED = 1] = "RESOLVED", e[e.REJECTED = 2] = "REJECTED"
    }(fn || (fn = {}));
    class _n {
      constructor(e) {
        this._state = fn.PENDING, this._handlers = [], this._runExecutor(e)
      }
      then(e, t) {
        return new _n(((n, r) => {
          this._handlers.push([!1, t => {
            if (e) try {
              n(e(t))
            } catch (e) {
              r(e)
            } else n(t)
          }, e => {
            if (t) try {
              n(t(e))
            } catch (e) {
              r(e)
            } else r(e)
          }]), this._executeHandlers()
        }))
      } catch (e) {
        return this.then((e => e), e)
      } finally(e) {
        return new _n(((t, n) => {
          let r, o;
          return this.then((t => {
            o = !1, r = t, e && e()
          }), (t => {
            o = !0, r = t, e && e()
          })).then((() => {
            o ? n(r) : t(r)
          }))
        }))
      }
      _executeHandlers() {
        if (this._state === fn.PENDING) return;
        const e = this._handlers.slice();
        this._handlers = [], e.forEach((e => {
          e[0] || (this._state === fn.RESOLVED && e[1](this._value), this._state === fn.REJECTED && e[2](this._value), e[0] = !0)
        }))
      }
      _runExecutor(e) {
        const t = (e, t) => {
            this._state === fn.PENDING && (v(t) ? t.then(n, r) : (this._state = e, this._value = t, this._executeHandlers()))
          },
          n = e => {
            t(fn.RESOLVED, e)
          },
          r = e => {
            t(fn.REJECTED, e)
          };
        try {
          e(n, r)
        } catch (e) {
          r(e)
        }
      }
    }

    function yn(e, t, n, r = 0) {
      return new _n(((o, s) => {
        const i = e[r];
        if (null === t || "function" != typeof i) o(t);
        else {
          const a = i({
            ...t
          }, n);
          c && i.id && null === a && A.log(`Event processor "${i.id}" dropped event`), v(a) ? a.then((t => yn(e, t, n, r + 1).then(o))).then(null, s) : yn(e, a, n, r + 1).then(o).then(null, s)
        }
      }))
    }
    const vn = "sentry.source",
      bn = "sentry.sample_rate",
      Sn = "sentry.previous_trace_sample_rate",
      wn = "sentry.op",
      kn = "sentry.origin",
      En = "sentry.idle_span_finish_reason",
      xn = "sentry.measurement_unit",
      Cn = "sentry.measurement_value",
      Tn = "sentry.custom_span_name",
      In = "sentry.profile_id",
      Mn = "sentry.exclusive_time",
      Rn = "sentry.link.type",
      On = "sentry-",
      An = /^sentry-/,
      Ln = 8192;

    function Dn(e) {
      const t = function(e) {
        if (e && (f(e) || Array.isArray(e))) return Array.isArray(e) ? e.reduce(((e, t) => {
          const n = Pn(t);
          return Object.entries(n).forEach((([t, n]) => {
            e[t] = n
          })), e
        }), {}) : Pn(e)
      }(e);
      if (!t) return;
      const n = Object.entries(t).reduce(((e, [t, n]) => (t.match(An) && (e[t.slice(On.length)] = n), e)), {});
      return Object.keys(n).length > 0 ? n : void 0
    }

    function Nn(e) {
      if (e) return function(e) {
        if (0 !== Object.keys(e).length) return Object.entries(e).reduce(((e, [t, n], r) => {
          const o = `${encodeURIComponent(t)}=${encodeURIComponent(n)}`,
            s = 0 === r ? o : `${e},${o}`;
          return s.length > Ln ? (c && A.warn(`Not adding key: ${t} with val: ${n} to baggage header due to exceeding baggage size limits.`), e) : s
        }), "")
      }(Object.entries(e).reduce(((e, [t, n]) => (n && (e[`${On}${t}`] = n), e)), {}))
    }

    function Pn(e) {
      return e.split(",").map((e => e.split("=").map((e => {
        try {
          return decodeURIComponent(e.trim())
        } catch {
          return
        }
      })))).reduce(((e, [t, n]) => (t && n && (e[t] = n), e)), {})
    }
    const Fn = /^o(\d+)\./,
      $n = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

    function Bn(e, t = !1) {
      const {
        host: n,
        path: r,
        pass: o,
        port: s,
        projectId: i,
        protocol: a,
        publicKey: c
      } = e;
      return `${a}://${c}${t&&o?`:${o}`:""}@${n}${s?`:${s}`:""}/${r?`${r}/`:r}${i}`
    }

    function Un(e) {
      const t = $n.exec(e);
      if (!t) return void O((() => {
        console.error(`Invalid Sentry Dsn: ${e}`)
      }));
      const [n, r, o = "", s = "", i = "", a = ""] = t.slice(1);
      let c = "",
        u = a;
      const l = u.split("/");
      if (l.length > 1 && (c = l.slice(0, -1).join("/"), u = l.pop()), u) {
        const e = u.match(/^\d+/);
        e && (u = e[0])
      }
      return jn({
        host: s,
        pass: o,
        path: c,
        projectId: u,
        port: i,
        protocol: n,
        publicKey: r
      })
    }

    function jn(e) {
      return {
        protocol: e.protocol,
        publicKey: e.publicKey || "",
        pass: e.pass || "",
        host: e.host,
        port: e.port || "",
        path: e.path || "",
        projectId: e.projectId
      }
    }

    function Hn(e) {
      const t = "string" == typeof e ? Un(e) : jn(e);
      if (t && function(e) {
          if (!c) return !0;
          const {
            port: t,
            projectId: n,
            protocol: r
          } = e;
          return !(["protocol", "publicKey", "host", "projectId"].find((t => !e[t] && (A.error(`Invalid Sentry Dsn: ${t} missing`), !0))) || (n.match(/^\d+$/) ? function(e) {
            return "http" === e || "https" === e
          }(r) ? t && isNaN(parseInt(t, 10)) && (A.error(`Invalid Sentry Dsn: Invalid port ${t}`), 1) : (A.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), 1) : (A.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), 1)))
        }(t)) return t
    }

    function zn(e) {
      if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__) return !1;
      const t = e || be()?.getOptions();
      return !(!t || null == t.tracesSampleRate && !t.tracesSampler)
    }
    const qn = 0,
      Wn = 1,
      Vn = 2;

    function Gn(e) {
      if (e < 400 && e >= 100) return {
        code: Wn
      };
      if (e >= 400 && e < 500) switch (e) {
        case 401:
          return {
            code: Vn, message: "unauthenticated"
          };
        case 403:
          return {
            code: Vn, message: "permission_denied"
          };
        case 404:
          return {
            code: Vn, message: "not_found"
          };
        case 409:
          return {
            code: Vn, message: "already_exists"
          };
        case 413:
          return {
            code: Vn, message: "failed_precondition"
          };
        case 429:
          return {
            code: Vn, message: "resource_exhausted"
          };
        case 499:
          return {
            code: Vn, message: "cancelled"
          };
        default:
          return {
            code: Vn, message: "invalid_argument"
          }
      }
      if (e >= 500 && e < 600) switch (e) {
        case 501:
          return {
            code: Vn, message: "unimplemented"
          };
        case 503:
          return {
            code: Vn, message: "unavailable"
          };
        case 504:
          return {
            code: Vn, message: "deadline_exceeded"
          };
        default:
          return {
            code: Vn, message: "internal_error"
          }
      }
      return {
        code: Vn,
        message: "unknown_error"
      }
    }

    function Jn(e, t) {
      e.setAttribute("http.response.status_code", t);
      const n = Gn(t);
      "unknown_error" !== n.message && e.setStatus(n)
    }
    const Kn = "_sentryScope",
      Yn = "_sentryIsolationScope";

    function Xn(e) {
      return {
        scope: e[Kn],
        isolationScope: e[Yn]
      }
    }

    function Zn(e) {
      if ("boolean" == typeof e) return Number(e);
      const t = "string" == typeof e ? parseFloat(e) : e;
      return "number" != typeof t || isNaN(t) || t < 0 || t > 1 ? void 0 : t
    }
    const Qn = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

    function er(e, t) {
      const n = function(e) {
          if (!e) return;
          const t = e.match(Qn);
          if (!t) return;
          let n;
          return "1" === t[3] ? n = !0 : "0" === t[3] && (n = !1), {
            traceId: t[1],
            parentSampled: n,
            parentSpanId: t[2]
          }
        }(e),
        r = Dn(t);
      if (!n?.traceId) return {
        traceId: re(),
        sampleRand: Math.random()
      };
      const o = function(e, t) {
        const n = Zn(t?.sample_rand);
        if (void 0 !== n) return n;
        const r = Zn(t?.sample_rate);
        return r && void 0 !== e?.parentSampled ? e.parentSampled ? Math.random() * r : r + Math.random() * (1 - r) : Math.random()
      }(n, r);
      r && (r.sample_rand = o.toString());
      const {
        traceId: s,
        parentSpanId: i,
        parentSampled: a
      } = n;
      return {
        traceId: s,
        parentSpanId: i,
        sampled: a,
        dsc: r || {},
        sampleRand: o
      }
    }

    function tr(e = re(), t = oe(), n) {
      let r = "";
      return void 0 !== n && (r = n ? "-1" : "-0"), `${e}-${t}${r}`
    }
    const nr = 1;
    let rr = !1;

    function or(e) {
      const {
        spanId: t,
        traceId: n
      } = e.spanContext(), {
        data: r,
        op: o,
        parent_span_id: s,
        status: i,
        origin: a,
        links: c
      } = lr(e);
      return {
        parent_span_id: s,
        span_id: t,
        trace_id: n,
        data: r,
        op: o,
        status: i,
        origin: a,
        links: c
      }
    }

    function sr(e) {
      const {
        spanId: t,
        traceId: n,
        isRemote: r
      } = e.spanContext(), o = r ? t : lr(e).parent_span_id, s = Xn(e).scope;
      return {
        parent_span_id: o,
        span_id: r ? s?.getPropagationContext().propagationSpanId || oe() : t,
        trace_id: n
      }
    }

    function ir(e) {
      const {
        traceId: t,
        spanId: n
      } = e.spanContext();
      return tr(t, n, dr(e))
    }

    function ar(e) {
      return e && e.length > 0 ? e.map((({
        context: {
          spanId: e,
          traceId: t,
          traceFlags: n,
          ...r
        },
        attributes: o
      }) => ({
        span_id: e,
        trace_id: t,
        sampled: n === nr,
        attributes: o,
        ...r
      }))) : void 0
    }

    function cr(e) {
      return "number" == typeof e ? ur(e) : Array.isArray(e) ? e[0] + e[1] / 1e9 : e instanceof Date ? ur(e.getTime()) : Z()
    }

    function ur(e) {
      return e > 9999999999 ? e / 1e3 : e
    }

    function lr(e) {
      if (function(e) {
          return "function" == typeof e.getSpanJSON
        }(e)) return e.getSpanJSON();
      const {
        spanId: t,
        traceId: n
      } = e.spanContext();
      if (function(e) {
          const t = e;
          return !!(t.attributes && t.startTime && t.name && t.endTime && t.status)
        }(e)) {
        const {
          attributes: r,
          startTime: o,
          name: s,
          endTime: i,
          status: a,
          links: c
        } = e;
        return {
          span_id: t,
          trace_id: n,
          data: r,
          description: s,
          parent_span_id: "parentSpanId" in e ? e.parentSpanId : "parentSpanContext" in e ? e.parentSpanContext?.spanId : void 0,
          start_timestamp: cr(o),
          timestamp: cr(i) || void 0,
          status: pr(a),
          op: r[wn],
          origin: r[kn],
          links: ar(c)
        }
      }
      return {
        span_id: t,
        trace_id: n,
        start_timestamp: 0,
        data: {}
      }
    }

    function dr(e) {
      const {
        traceFlags: t
      } = e.spanContext();
      return t === nr
    }

    function pr(e) {
      if (e && e.code !== qn) return e.code === Wn ? "ok" : e.message || "unknown_error"
    }
    const hr = "_sentryChildSpans",
      fr = "_sentryRootSpan";

    function mr(e, t) {
      const n = e[fr] || e;
      $(t, fr, n), e[hr] ? e[hr].add(t) : $(e, hr, new Set([t]))
    }

    function gr(e) {
      const t = new Set;
      return function e(n) {
        if (!t.has(n) && dr(n)) {
          t.add(n);
          const r = n[hr] ? Array.from(n[hr]) : [];
          for (const t of r) e(t)
        }
      }(e), Array.from(t)
    }

    function _r(e) {
      return e[fr] || e
    }

    function yr() {
      const e = fe(s());
      return e.getActiveSpan ? e.getActiveSpan() : ae(me())
    }

    function vr() {
      rr || (O((() => {
        console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly.")
      })), rr = !0)
    }

    function br(e, t) {
      e.updateName(t), e.setAttributes({
        [vn]: "custom",
        [Tn]: t
      })
    }
    const Sr = "_frozenDsc";

    function wr(e, t) {
      $(e, Sr, t)
    }

    function kr(e, t) {
      const n = t.getOptions(),
        {
          publicKey: r,
          host: o
        } = t.getDsn() || {};
      let s;
      n.orgId ? s = String(n.orgId) : o && (s = function(e) {
        const t = e.match(Fn);
        return t?.[1]
      }(o));
      const i = {
        environment: n.environment || hn,
        release: n.release,
        public_key: r,
        trace_id: e,
        org_id: s
      };
      return t.emit("createDsc", i), i
    }

    function Er(e, t) {
      const n = t.getPropagationContext();
      return n.dsc || kr(n.traceId, e)
    }

    function xr(e) {
      const t = be();
      if (!t) return {};
      const n = _r(e),
        r = lr(n),
        o = r.data,
        s = n.spanContext().traceState,
        i = s?.get("sentry.sample_rate") ?? o[bn] ?? o[Sn];

      function a(e) {
        return "number" != typeof i && "string" != typeof i || (e.sample_rate = `${i}`), e
      }
      const c = n[Sr];
      if (c) return a(c);
      const u = s?.get("sentry.dsc"),
        l = u && Dn(u);
      if (l) return a(l);
      const d = kr(e.spanContext().traceId, t),
        p = o[vn],
        h = r.description;
      return "url" !== p && h && (d.transaction = h), zn() && (d.sampled = String(dr(n)), d.sample_rand = s?.get("sentry.sample_rand") ?? Xn(n).scope?.getPropagationContext().sampleRand.toString()), a(d), t.emit("createDsc", d, n), d
    }

    function Cr(e) {
      return Nn(xr(e))
    }

    function Tr(e, t) {
      const {
        extra: n,
        tags: r,
        user: o,
        contexts: s,
        level: i,
        sdkProcessingMetadata: a,
        breadcrumbs: c,
        fingerprint: u,
        eventProcessors: l,
        attachments: d,
        propagationContext: p,
        transactionName: h,
        span: f
      } = t;
      Ir(e, "extra", n), Ir(e, "tags", r), Ir(e, "user", o), Ir(e, "contexts", s), e.sdkProcessingMetadata = ne(e.sdkProcessingMetadata, a, 2), i && (e.level = i), h && (e.transactionName = h), f && (e.span = f), c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]), u.length && (e.fingerprint = [...e.fingerprint, ...u]), l.length && (e.eventProcessors = [...e.eventProcessors, ...l]), d.length && (e.attachments = [...e.attachments, ...d]), e.propagationContext = {
        ...e.propagationContext,
        ...p
      }
    }

    function Ir(e, t, n) {
      e[t] = ne(e[t], n, 1)
    }
    let Mr, Rr, Or;

    function Ar(e) {
      const t = r._sentryDebugIds;
      if (!t) return {};
      const n = Object.keys(t);
      return Or && n.length === Rr || (Rr = n.length, Or = n.reduce(((n, r) => {
        Mr || (Mr = {});
        const o = Mr[r];
        if (o) n[o[0]] = o[1];
        else {
          const o = e(r);
          for (let e = o.length - 1; e >= 0; e--) {
            const s = o[e],
              i = s?.filename,
              a = t[r];
            if (i && a) {
              n[i] = a, Mr[r] = [i, a];
              break
            }
          }
        }
        return n
      }), {})), Or
    }
    const Lr = 50,
      Dr = "?",
      Nr = /\(error: (.*)\)/,
      Pr = /captureMessage|captureException/;

    function Fr(...e) {
      const t = e.sort(((e, t) => e[0] - t[0])).map((e => e[1]));
      return (e, n = 0, r = 0) => {
        const o = [],
          s = e.split("\n");
        for (let e = n; e < s.length; e++) {
          const n = s[e];
          if (n.length > 1024) continue;
          const i = Nr.test(n) ? n.replace(Nr, "$1") : n;
          if (!i.match(/\S*Error: /)) {
            for (const e of t) {
              const t = e(i);
              if (t) {
                o.push(t);
                break
              }
            }
            if (o.length >= Lr + r) break
          }
        }
        return function(e) {
          if (!e.length) return [];
          const t = Array.from(e);
          return /sentryWrapped/.test($r(t).function || "") && t.pop(), t.reverse(), Pr.test($r(t).function || "") && (t.pop(), Pr.test($r(t).function || "") && t.pop()), t.slice(0, Lr).map((e => ({
            ...e,
            filename: e.filename || $r(t).filename,
            function: e.function || Dr
          })))
        }(o.slice(r))
      }
    }

    function $r(e) {
      return e[e.length - 1] || {}
    }
    const Br = "<anonymous>";

    function Ur(e) {
      try {
        return e && "function" == typeof e && e.name || Br
      } catch (e) {
        return Br
      }
    }

    function jr(e) {
      const t = e.exception;
      if (t) {
        const e = [];
        try {
          return t.values.forEach((t => {
            t.stacktrace.frames && e.push(...t.stacktrace.frames)
          })), e
        } catch (e) {
          return
        }
      }
    }

    function Hr(e, t = 100, n = 1 / 0) {
      try {
        return qr("", e, t, n)
      } catch (e) {
        return {
          ERROR: `**non-serializable** (${e})`
        }
      }
    }

    function zr(e, t = 3, n = 102400) {
      const r = Hr(e, t);
      return o = r,
        function(e) {
          return ~-encodeURI(e).split(/%..|./).length
        }(JSON.stringify(o)) > n ? zr(e, t - 1, n) : r;
      var o
    }

    function qr(e, t, n = 1 / 0, r = 1 / 0, o = function() {
      const e = new WeakSet;
      return [function(t) {
        return !!e.has(t) || (e.add(t), !1)
      }, function(t) {
        e.delete(t)
      }]
    }()) {
      const [s, i] = o;
      if (null == t || ["boolean", "string"].includes(typeof t) || "number" == typeof t && Number.isFinite(t)) return t;
      const a = function(e, t) {
        try {
          if ("domain" === e && t && "object" == typeof t && t._events) return "[Domain]";
          if ("domainEmitter" === e) return "[DomainEmitter]";
          if ("undefined" != typeof global && t === global) return "[Global]";
          if ("undefined" != typeof window && t === window) return "[Window]";
          if ("undefined" != typeof document && t === document) return "[Document]";
          if (S(t)) return "[VueViewModel]";
          if (_(n = t) && "nativeEvent" in n && "preventDefault" in n && "stopPropagation" in n) return "[SyntheticEvent]";
          if ("number" == typeof t && !Number.isFinite(t)) return `[${t}]`;
          if ("function" == typeof t) return `[Function: ${Ur(t)}]`;
          if ("symbol" == typeof t) return `[${String(t)}]`;
          if ("bigint" == typeof t) return `[BigInt: ${String(t)}]`;
          const r = function(e) {
            const t = Object.getPrototypeOf(e);
            return t?.constructor ? t.constructor.name : "null prototype"
          }(t);
          return /^HTML(\w*)Element$/.test(r) ? `[HTMLElement: ${r}]` : `[object ${r}]`
        } catch (e) {
          return `**non-serializable** (${e})`
        }
        var n
      }(e, t);
      if (!a.startsWith("[object ")) return a;
      if (t.__sentry_skip_normalization__) return t;
      const c = "number" == typeof t.__sentry_override_normalization_depth__ ? t.__sentry_override_normalization_depth__ : n;
      if (0 === c) return a.replace("object ", "");
      if (s(t)) return "[Circular ~]";
      const u = t;
      if (u && "function" == typeof u.toJSON) try {
        return qr("", u.toJSON(), c - 1, r, o)
      } catch (e) {}
      const l = Array.isArray(t) ? [] : {};
      let d = 0;
      const p = j(t);
      for (const e in p) {
        if (!Object.prototype.hasOwnProperty.call(p, e)) continue;
        if (d >= r) {
          l[e] = "[MaxProperties ~]";
          break
        }
        const t = p[e];
        l[e] = qr(e, t, c - 1, r, o), d++
      }
      return i(t), l
    }

    function Wr(e, t, n, r, o, s) {
      const {
        normalizeDepth: i = 3,
        normalizeMaxBreadth: a = 1e3
      } = e, c = {
        ...t,
        event_id: t.event_id || n.event_id || q(),
        timestamp: t.timestamp || X()
      }, u = n.integrations || e.integrations.map((e => e.name));
      ! function(e, t) {
        const {
          environment: n,
          release: r,
          dist: o,
          maxValueLength: s = 250
        } = t;
        e.environment = e.environment || n || hn, !e.release && r && (e.release = r), !e.dist && o && (e.dist = o);
        const i = e.request;
        i?.url && (i.url = L(i.url, s))
      }(c, e),
      function(e, t) {
        t.length > 0 && (e.sdk = e.sdk || {}, e.sdk.integrations = [...e.sdk.integrations || [], ...t])
      }(c, u), o && o.emit("applyFrameMetadata", t), void 0 === t.type && function(e, t) {
        const n = Ar(t);
        e.exception?.values?.forEach((e => {
          e.stacktrace?.frames?.forEach((e => {
            e.filename && (e.debug_id = n[e.filename])
          }))
        }))
      }(c, e.stackParser);
      const l = function(e, t) {
        if (!t) return e;
        const n = e ? e.clone() : new ce;
        return n.update(t), n
      }(r, n.captureContext);
      n.mechanism && J(c, n.mechanism);
      const d = o ? o.getEventProcessors() : [],
        p = _e().getScopeData();
      s && Tr(p, s.getScopeData()), l && Tr(p, l.getScopeData());
      const h = [...n.attachments || [], ...p.attachments];
      return h.length && (n.attachments = h),
        function(e, t) {
          const {
            fingerprint: n,
            span: r,
            breadcrumbs: o,
            sdkProcessingMetadata: s
          } = t;
          ! function(e, t) {
            const {
              extra: n,
              tags: r,
              user: o,
              contexts: s,
              level: i,
              transactionName: a
            } = t;
            Object.keys(n).length && (e.extra = {
              ...n,
              ...e.extra
            }), Object.keys(r).length && (e.tags = {
              ...r,
              ...e.tags
            }), Object.keys(o).length && (e.user = {
              ...o,
              ...e.user
            }), Object.keys(s).length && (e.contexts = {
              ...s,
              ...e.contexts
            }), i && (e.level = i), a && "transaction" !== e.type && (e.transaction = a)
          }(e, t), r && function(e, t) {
              e.contexts = {
                trace: sr(t),
                ...e.contexts
              }, e.sdkProcessingMetadata = {
                dynamicSamplingContext: xr(t),
                ...e.sdkProcessingMetadata
              };
              const n = lr(_r(t)).description;
              n && !e.transaction && "transaction" === e.type && (e.transaction = n)
            }(e, r),
            function(e, t) {
              e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], t && (e.fingerprint = e.fingerprint.concat(t)), e.fingerprint.length || delete e.fingerprint
            }(e, n),
            function(e, t) {
              const n = [...e.breadcrumbs || [], ...t];
              e.breadcrumbs = n.length ? n : void 0
            }(e, o),
            function(e, t) {
              e.sdkProcessingMetadata = {
                ...e.sdkProcessingMetadata,
                ...t
              }
            }(e, s)
        }(c, p), yn([...d, ...p.eventProcessors], c, n).then((e => (e && function(e) {
          const t = {};
          if (e.exception?.values?.forEach((e => {
              e.stacktrace?.frames?.forEach((e => {
                e.debug_id && (e.abs_path ? t[e.abs_path] = e.debug_id : e.filename && (t[e.filename] = e.debug_id), delete e.debug_id)
              }))
            })), 0 === Object.keys(t).length) return;
          e.debug_meta = e.debug_meta || {}, e.debug_meta.images = e.debug_meta.images || [];
          const n = e.debug_meta.images;
          Object.entries(t).forEach((([e, t]) => {
            n.push({
              type: "sourcemap",
              code_file: e,
              debug_id: t
            })
          }))
        }(e), "number" == typeof i && i > 0 ? function(e, t, n) {
          if (!e) return null;
          const r = {
            ...e,
            ...e.breadcrumbs && {
              breadcrumbs: e.breadcrumbs.map((e => ({
                ...e,
                ...e.data && {
                  data: Hr(e.data, t, n)
                }
              })))
            },
            ...e.user && {
              user: Hr(e.user, t, n)
            },
            ...e.contexts && {
              contexts: Hr(e.contexts, t, n)
            },
            ...e.extra && {
              extra: Hr(e.extra, t, n)
            }
          };
          return e.contexts?.trace && r.contexts && (r.contexts.trace = e.contexts.trace, e.contexts.trace.data && (r.contexts.trace.data = Hr(e.contexts.trace.data, t, n))), e.spans && (r.spans = e.spans.map((e => ({
            ...e,
            ...e.data && {
              data: Hr(e.data, t, n)
            }
          })))), e.contexts?.flags && r.contexts && (r.contexts.flags = Hr(e.contexts.flags, 3, n)), r
        }(e, i, a) : e)))
    }
    const Vr = ["user", "level", "extra", "contexts", "tags", "fingerprint", "propagationContext"];

    function Gr(e, t) {
      return me().captureException(e, function(e) {
        if (e) return function(e) {
          return e instanceof ce || "function" == typeof e
        }(e) || function(e) {
          return Object.keys(e).some((e => Vr.includes(e)))
        }(e) ? {
          captureContext: e
        } : e
      }(t))
    }

    function Jr(e, t) {
      const n = "string" == typeof t ? t : void 0,
        r = "string" != typeof t ? {
          captureContext: t
        } : void 0;
      return me().captureMessage(e, n, r)
    }

    function Kr(e, t) {
      return me().captureEvent(e, t)
    }

    function Yr(e, t) {
      ge().setContext(e, t)
    }

    function Xr(e) {
      ge().setExtras(e)
    }

    function Zr(e, t) {
      ge().setExtra(e, t)
    }

    function Qr(e) {
      ge().setTags(e)
    }

    function eo(e, t) {
      ge().setTag(e, t)
    }

    function to(e) {
      ge().setUser(e)
    }

    function no() {
      return ge().lastEventId()
    }
    async function ro(e) {
      const t = be();
      return t ? t.flush(e) : (c && A.warn("Cannot flush events. No client defined."), Promise.resolve(!1))
    }
    async function oo(e) {
      const t = be();
      return t ? t.close(e) : (c && A.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(!1))
    }

    function so() {
      return !!be()
    }

    function io() {
      const e = be();
      return !1 !== e?.getOptions().enabled && !!e?.getTransport()
    }

    function ao(e) {
      ge().addEventProcessor(e)
    }

    function co(e) {
      const t = ge(),
        n = me(),
        {
          userAgent: o
        } = r.navigator || {},
        s = function(e) {
          const t = Z(),
            n = {
              sid: q(),
              init: !0,
              timestamp: t,
              started: t,
              duration: 0,
              status: "ok",
              errors: 0,
              ignoreDuration: !1,
              toJSON: () => function(e) {
                return {
                  sid: `${e.sid}`,
                  init: e.init,
                  started: new Date(1e3 * e.started).toISOString(),
                  timestamp: new Date(1e3 * e.timestamp).toISOString(),
                  status: e.status,
                  errors: e.errors,
                  did: "number" == typeof e.did || "string" == typeof e.did ? `${e.did}` : void 0,
                  duration: e.duration,
                  abnormal_mechanism: e.abnormal_mechanism,
                  attrs: {
                    release: e.release,
                    environment: e.environment,
                    ip_address: e.ipAddress,
                    user_agent: e.userAgent
                  }
                }
              }(n)
            };
          return e && te(n, e), n
        }({
          user: n.getUser() || t.getUser(),
          ...o && {
            userAgent: o
          },
          ...e
        }),
        i = t.getSession();
      return "ok" === i?.status && te(i, {
        status: "exited"
      }), uo(), t.setSession(s), s
    }

    function uo() {
      const e = ge(),
        t = me().getSession() || e.getSession();
      t && function(e) {
        let t = {};
        "ok" === e.status && (t = {
          status: "exited"
        }), te(e, t)
      }(t), lo(), e.setSession()
    }

    function lo() {
      const e = ge(),
        t = be(),
        n = e.getSession();
      n && t && t.captureSession(n)
    }

    function po(e = !1) {
      e ? uo() : lo()
    }
    const ho = r;
    let fo = 0;

    function mo() {
      return fo > 0
    }

    function go(e, t = {}) {
      if (! function(e) {
          return "function" == typeof e
        }(e)) return e;
      try {
        const t = e.__sentry_wrapped__;
        if (t) return "function" == typeof t ? t : e;
        if (U(e)) return e
      } catch (t) {
        return e
      }
      const n = function(...n) {
        try {
          const r = n.map((e => go(e, t)));
          return e.apply(this, r)
        } catch (e) {
          throw fo++, setTimeout((() => {
            fo--
          })), ye((r => {
            r.addEventProcessor((e => (t.mechanism && (G(e, void 0, void 0), J(e, t.mechanism)), e.extra = {
              ...e.extra,
              arguments: n
            }, e))), Gr(e)
          })), e
        }
      };
      try {
        for (const t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t])
      } catch {}
      B(n, e), $(e, "__sentry_wrapped__", n);
      try {
        Object.getOwnPropertyDescriptor(n, "name").configurable && Object.defineProperty(n, "name", {
          get: () => e.name
        })
      } catch {}
      return n
    }

    function _o() {
      const e = T(),
        {
          referrer: t
        } = ho.document || {},
        {
          userAgent: n
        } = ho.navigator || {};
      return {
        url: e,
        headers: {
          ...t && {
            Referer: t
          },
          ...n && {
            "User-Agent": n
          }
        }
      }
    }
    const yo = {
        replayIntegration: "replay",
        replayCanvasIntegration: "replay-canvas",
        feedbackIntegration: "feedback",
        feedbackModalIntegration: "feedback-modal",
        feedbackScreenshotIntegration: "feedback-screenshot",
        captureConsoleIntegration: "captureconsole",
        contextLinesIntegration: "contextlines",
        linkedErrorsIntegration: "linkederrors",
        dedupeIntegration: "dedupe",
        extraErrorDataIntegration: "extraerrordata",
        graphqlClientIntegration: "graphqlclient",
        httpClientIntegration: "httpclient",
        reportingObserverIntegration: "reportingobserver",
        rewriteFramesIntegration: "rewriteframes",
        browserProfilingIntegration: "browserprofiling",
        moduleMetadataIntegration: "modulemetadata"
      },
      vo = ho;
    async function bo(e, t) {
      const n = yo[e],
        r = vo.Sentry = vo.Sentry || {};
      if (!n) throw new Error(`Cannot lazy load integration: ${e}`);
      const s = r[e];
      if ("function" == typeof s && !("_isShim" in s)) return s;
      const i = function(e) {
          const t = be(),
            n = t?.getOptions()?.cdnBaseUrl || "https://browser.sentry-cdn.com";
          return new URL(`/${o}/${e}.min.js`, n).toString()
        }(n),
        a = ho.document.createElement("script");
      a.src = i, a.crossOrigin = "anonymous", a.referrerPolicy = "strict-origin", t && a.setAttribute("nonce", t);
      const c = new Promise(((e, t) => {
          a.addEventListener("load", (() => e())), a.addEventListener("error", t)
        })),
        u = ho.document.currentScript,
        l = ho.document.body || ho.document.head || u?.parentElement;
      if (!l) throw new Error(`Could not find parent element to insert lazy-loaded ${e} script`);
      l.appendChild(a);
      try {
        await c
      } catch {
        throw new Error(`Error when loading integration: ${e}`)
      }
      const d = r[e];
      if ("function" != typeof d) throw new Error(`Could not load integration: ${e}`);
      return d
    }
    const So = je({
        lazyLoadIntegration: bo
      }),
      wo = je({
        getModalIntegration: () => sn,
        getScreenshotIntegration: () => pn
      }),
      ko = "7";

    function Eo(e) {
      const t = e.protocol ? `${e.protocol}:` : "",
        n = e.port ? `:${e.port}` : "";
      return `${t}//${e.host}${n}${e.path?`/${e.path}`:""}/api/`
    }

    function xo(e, t, n) {
      return t || `${function(e){return`${Eo(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){const n={sentry_version:ko};return e.publicKey&&(n.sentry_key=e.publicKey),t&&(n.sentry_client=`
      $ {
        t.name
      }
      /${t.version}`),new URLSearchParams(n).toString()}(e,n)}`}function Co(e,t=[]){return[e,t]}function To(e,t){const[n,r]=e;return[n,[...r,t]]}function Io(e,t){const n=e[1];for(const e of n)if(t(e,e[0].type))return!0;return!1}function Mo(e,t){return Io(e,((e,n)=>t.includes(n)))}function Ro(e){const t=i(r);return t.encodePolyfill?t.encodePolyfill(e):(new TextEncoder).encode(e)}function Oo(e){const[t,n]=e;let r=JSON.stringify(t);function o(e){"string"==typeof r?r="string"==typeof e?r+e:[Ro(r),e]:r.push("string"==typeof e?Ro(e):e)}for(const e of n){const[t,n]=e;if(o(`\n${JSON.stringify(t)}\n`),"string"==typeof n||n instanceof Uint8Array)o(n);else{let e;try{e=JSON.stringify(n)}catch(t){e=JSON.stringify(Hr(n))}o(e)}}return"string"==typeof r?r:function(e){const t=e.reduce(((e,t)=>e+t.length),0),n=new Uint8Array(t);let r=0;for(const t of e)n.set(t,r),r+=t.length;return n}(r)}function Ao(e){return[{type:"span"},e]}function Lo(e){const t="string"==typeof e.data?Ro(e.data):e.data;return[{type:"attachment",length:t.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType},t]}const Do={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item"};function No(e){return Do[e]}function Po(e){if(!e?.sdk)return;const{name:t,version:n}=e.sdk;return{name:t,version:n}}function Fo(e,t,n,r){const o=e.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!n&&r&&{dsn:Bn(r)},...o&&{trace:o}}}function $o(e){const t=[];e.message&&t.push(e.message);try{const n=e.exception.values[e.exception.values.length-1];n?.value&&(t.push(n.value),n.type&&t.push(`${n.type}: ${n.value}`))}catch(e){}return t}const Bo="Not capturing exception because it's already been captured.",Uo="Discarded session because of missing or non-string release",jo=Symbol.for("SentryInternalError"),Ho=Symbol.for("SentryDoNotSendEventError");function zo(e){return{message:e,[jo]:!0}}function qo(e){return{message:e,[Ho]:!0}}function Wo(e){return!!e&&"object"==typeof e&&jo in e}function Vo(e){return!!e&&"object"==typeof e&&Ho in e}class Go{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Hn(e.dsn):c&&A.warn("No DSN provided, client will not send events."),this._dsn){const t=xo(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}}captureException(e,t,n){const r=q();if(K(e))return c&&A.log(Bo),r;const o={event_id:r,...t};return this._process(this.eventFromException(e,o).then((e=>this._captureEvent(e,o,n)))),o.event_id}captureMessage(e,t,n,r){const o={event_id:q(),...n},s=m(e)?e:String(e),i=g(e)?this.eventFromMessage(s,t,o):this.eventFromException(e,o);return this._process(i.then((e=>this._captureEvent(e,o,r)))),o.event_id}captureEvent(e,t,n){const r=q();if(t?.originalException&&K(t.originalException))return c&&A.log(Bo),r;const o={event_id:r,...t},s=e.sdkProcessingMetadata||{},i=s.capturedSpanScope,a=s.capturedSpanIsolationScope;return this._process(this._captureEvent(e,o,i||n,a)),o.event_id}captureSession(e){this.sendSession(e),te(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}flush(e){const t=this._transport;return t?(this.emit("flush"),this._isClientDoneProcessing(e).then((n=>t.flush(e).then((e=>n&&e))))):mn(!0)}close(e){return this.flush(e).then((e=>(this.getOptions().enabled=!1,this.emit("close"),e)))}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some((({name:e})=>e.startsWith("Spotlight"))))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const t=this._integrations[e.name];Ce(this,e,this._integrations),t||xe(this,[e])}sendEvent(e,t={}){this.emit("beforeSendEvent",e,t);let n=function(e,t,n,r){const o=Po(n),s=e.type&&"replay_event"!==e.type?e.type:"event";!function(e,t){t&&(e.sdk=e.sdk||{},e.sdk.name=e.sdk.name||t.name,e.sdk.version=e.sdk.version||t.version,e.sdk.integrations=[...e.sdk.integrations||[],...t.integrations||[]],e.sdk.packages=[...e.sdk.packages||[],...t.packages||[]])}(e,n?.sdk);const i=Fo(e,o,r,t);return delete e.sdkProcessingMetadata,Co(i,[[{type:s},e]])}(e,this._dsn,this._options._metadata,this._options.tunnel);for(const e of t.attachments||[])n=To(n,Lo(e));const r=this.sendEnvelope(n);r&&r.then((t=>this.emit("afterSendEvent",e,t)),null)}sendSession(e){const{release:t,environment:n=hn}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!t)return void(c&&A.warn(Uo));r.release=r.release||t,r.environment=r.environment||n,e.attrs=r}else{if(!e.release&&!t)return void(c&&A.warn(Uo));e.release=e.release||t,e.environment=e.environment||n}this.emit("beforeSendSession",e);const r=function(e,t,n,r){const o=Po(n);return Co({sent_at:(new Date).toISOString(),...o&&{sdk:o},...!!r&&t&&{dsn:Bn(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e.toJSON()]])}(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,t,n=1){if(this._options.sendClientReports){const r=`${e}:${t}`;c&&A.log(`Recording outcome: "${r}"${n>1?` (${n} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+n}}on(e,t){const n=this._hooks[e]=this._hooks[e]||[];return n.push(t),()=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)}}emit(e,...t){const n=this._hooks[e];n&&n.forEach((e=>e(...t)))}sendEnvelope(e){return this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport?this._transport.send(e).then(null,(e=>(c&&A.error("Error while sending envelope:",e),e))):(c&&A.error("Transport disabled"),mn({}))}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=function(e,t){const n={};return t.forEach((t=>{t&&Ce(e,t,n)})),n}(this,e),xe(this,e)}_updateSessionFromEvent(e,t){let n="fatal"===t.level,r=!1;const o=t.exception?.values;if(o){r=!0;for(const e of o){const t=e.mechanism;if(!1===t?.handled){n=!0;break}}}const s="ok"===e.status;(s&&0===e.errors||s&&n)&&(te(e,{...n&&{status:"crashed"},errors:e.errors||Number(r||n)}),this.captureSession(e))}_isClientDoneProcessing(e){return new _n((t=>{let n=0;const r=setInterval((()=>{0==this._numProcessing?(clearInterval(r),t(!0)):(n+=1,e&&n>=e&&(clearInterval(r),t(!1)))}),1)}))}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._transport}_prepareEvent(e,t,n,r){const o=this.getOptions(),s=Object.keys(this._integrations);return!t.integrations&&s?.length&&(t.integrations=s),this.emit("preprocessEvent",e,t),e.type||r.setLastEventId(e.event_id||t.event_id),Wr(o,e,t,n,this,r).then((e=>{if(null===e)return e;this.emit("postprocessEvent",e,t),e.contexts={trace:Se(n),...e.contexts};const r=Er(this,n);return e.sdkProcessingMetadata={dynamicSamplingContext:r,...e.sdkProcessingMetadata},e}))}_captureEvent(e,t={},n=me(),r=ge()){return c&&Jo(e)&&A.log(`Captured error event \`${$o(e)[0]||"<unknown>"}\``),this._processEvent(e,t,n,r).then((e=>e.event_id),(e=>{c&&(Vo(e)?A.log(e.message):Wo(e)?A.warn(e.message):A.warn(e))}))}_processEvent(e,t,n,r){const o=this.getOptions(),{sampleRate:s}=o,i=Ko(e),a=Jo(e),c=e.type||"error",u=`before send for type \`${c}\``,l=void 0===s?void 0:Zn(s);if(a&&"number"==typeof l&&Math.random()>l)return this.recordDroppedEvent("sample_rate","error"),gn(qo(`Discarding event because it's not included in the random sample (sampling rate = ${s})`));const d="replay_event"===c?"replay":c;return this._prepareEvent(e,t,n,r).then((e=>{if(null===e)throw this.recordDroppedEvent("event_processor",d),qo("An event processor returned `null`, will not send event.");if(t.data&&!0===t.data.__sentry__)return e;const n=function(e,t,n,r){const{beforeSend:o,beforeSendTransaction:s,beforeSendSpan:i}=t;let a=n;if(Jo(a)&&o)return o(a,r);if(Ko(a)){if(i){const e=i(function(e){const{trace_id:t,parent_span_id:n,span_id:r,status:o,origin:s,data:i,op:a}=e.contexts?.trace??{};return{data:i??{},description:e.transaction,op:a,parent_span_id:n,span_id:r??"",start_timestamp:e.start_timestamp??0,status:o,timestamp:e.timestamp,trace_id:t??"",origin:s,profile_id:i?.[In],exclusive_time:i?.[Mn],measurements:e.measurements,is_segment:!0}}(a));if(e?a=ne(n,{type:"transaction",timestamp:(c=e).timestamp,start_timestamp:c.start_timestamp,transaction:c.description,contexts:{trace:{trace_id:c.trace_id,span_id:c.span_id,parent_span_id:c.parent_span_id,op:c.op,status:c.status,origin:c.origin,data:{...c.data,...c.profile_id&&{[In]:c.profile_id},...c.exclusive_time&&{[Mn]:c.exclusive_time}}}},measurements:c.measurements}):vr(),a.spans){const e=[];for(const t of a.spans){const n=i(t);n?e.push(n):(vr(),e.push(t))}a.spans=e}}if(s){if(a.spans){const e=a.spans.length;a.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:e}}return s(a,r)}}var c;return a}(0,o,e,t);return function(e,t){const n=`${t} must return \`null\` or a valid event.`;if(v(e))return e.then((e=>{if(!_(e)&&null!==e)throw zo(n);return e}),(e=>{throw zo(`${t} rejected with ${e}`)}));if(!_(e)&&null!==e)throw zo(n);return e}(n,u)})).then((o=>{if(null===o){if(this.recordDroppedEvent("before_send",d),i){const t=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",t)}throw qo(`${u} returned \`null\`, will not send event.`)}const s=n.getSession()||r.getSession();if(a&&s&&this._updateSessionFromEvent(s,o),i){const e=(o.sdkProcessingMetadata?.spanCountBeforeProcessing||0)-(o.spans?o.spans.length:0);e>0&&this.recordDroppedEvent("before_send","span",e)}const c=o.transaction_info;if(i&&c&&o.transaction!==e.transaction){const e="custom";o.transaction_info={...c,source:e}}return this.sendEvent(o,t),o})).then(null,(e=>{if(Vo(e)||Wo(e))throw e;throw this.captureException(e,{data:{__sentry__:!0},originalException:e}),zo(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`)}))}_process(e){this._numProcessing++,e.then((e=>(this._numProcessing--,e)),(e=>(this._numProcessing--,e)))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map((([e,t])=>{const[n,r]=e.split(":");return{reason:n,category:r,quantity:t}}))}_flushOutcomes(){c&&A.log("Flushing outcomes...");const e=this._clearOutcomes();if(0===e.length)return void(c&&A.log("No outcomes to send"));if(!this._dsn)return void(c&&A.log("No dsn provided, will not send outcomes"));c&&A.log("Sending outcomes:",e);const t=(n=e,Co((r=this._options.tunnel&&Bn(this._dsn))?{dsn:r}:{},[[{type:"client_report"},{timestamp:X(),discarded_events:n}]]));var n,r;this.sendEnvelope(t)}}function Jo(e){return void 0===e.type}function Ko(e){return"transaction"===e.type}const Yo={trace:1,debug:5,info:9,warn:13,error:17,fatal:21},Xo=100;function Zo(e,t,n,r=!0){!n||e[t]&&!r||(e[t]=n)}function Qo(e,t){const n=ns(e);void 0===n?r._sentryClientToLogBufferMap?.set(e,[t]):(r._sentryClientToLogBufferMap?.set(e,[...n,t]),n.length>=Xo&&ts(e,n))}function es(e,t=be(),n=me(),r=Qo){if(!t)return void(c&&A.warn("No client available to capture log."));const{_experiments:o,release:s,environment:i}=t.getOptions(),{enableLogs:a=!1,beforeSendLog:u}=o??{};if(!a)return void(c&&A.warn("logging option not enabled, log will not be captured."));const[,l]=function(e,t){return t?ye(t,(()=>{const n=yr(),r=n?sr(n):Se(t);return[n?xr(n):Er(e,t),r]})):[void 0,void 0]}(t,n),d={...e.attributes},{user:{id:p,email:h,username:f}}=function(e){const t=_e().getScopeData();return Tr(t,ge().getScopeData()),Tr(t,e.getScopeData()),t}(n);Zo(d,"user.id",p,!1),Zo(d,"user.email",h,!1),Zo(d,"user.name",f,!1),Zo(d,"sentry.release",s),Zo(d,"sentry.environment",i);const{name:g,version:_}=t.getSdkMetadata()?.sdk??{};Zo(d,"sentry.sdk.name",g),Zo(d,"sentry.sdk.version",_);const y=e.message;if(m(y)){const{__sentry_template_string__:e,__sentry_template_values__:t=[]}=y;d["sentry.message.template"]=e,t.forEach(((e,t)=>{d[`sentry.message.parameter.${t}`]=e}))}const v=ae(n);Zo(d,"sentry.trace.parent_span_id",v?.spanContext().spanId);const b={...e,attributes:d};t.emit("beforeCaptureLog",b);const S=u?u(b):b;if(!S)return t.recordDroppedEvent("before_send","log_item",1),void(c&&A.warn("beforeSendLog returned null, log will not be captured."));const{level:w,message:k,attributes:E={},severityNumber:x}=S;r(t,{timestamp:Z(),level:w,body:k,trace_id:l?.trace_id,severity_number:x??Yo[w],attributes:Object.keys(E).reduce(((e,t)=>(e[t]=function(e){switch(typeof e){case"number":return Number.isInteger(e)?{value:e,type:"integer"}:{value:e,type:"double"};case"boolean":return{value:e,type:"boolean"};case"string":return{value:e,type:"string"};default:{let t="";try{t=JSON.stringify(e)??""}catch{}return{value:t,type:"string"}}}}(E[t]),e)),{})}),t.emit("afterCaptureLog",S)}function ts(e,t){const n=t??ns(e)??[];if(0===n.length)return;const o=e.getOptions(),s=function(e,t,n,r){const o={};return t?.sdk&&(o.sdk={name:t.sdk.name,version:t.sdk.version}),n&&r&&(o.dsn=Bn(r)),Co(o,[(s=e,[{type:"log",item_count:s.length,content_type:"application/vnd.sentry.items.log+json"},{items:s}])]);var s}(n,o._metadata,o.tunnel,e.getDsn());r._sentryClientToLogBufferMap?.set(e,[]),e.emit("flushLogs"),e.sendEnvelope(s)}function ns(e){return r._sentryClientToLogBufferMap?.get(e)}function rs(e,...t){const n=new String(String.raw(e,...t));return n.__sentry_template_string__=e.join("\0").replace(/ % /g,"%%").replace(/\
      0 / g, "%s"), n.__sentry_template_values__ = t, n
  }
  r._sentryClientToLogBufferMap = new WeakMap;
  const os = rs;

  function ss(e, t, n, r) {
    es({
      level: e,
      message: t,
      attributes: n,
      severityNumber: r
    })
  }

  function is(e, t) {
    ss("trace", e, t)
  }

  function as(e, t) {
    ss("debug", e, t)
  }

  function cs(e, t) {
    ss("info", e, t)
  }

  function us(e, t) {
    ss("warn", e, t)
  }

  function ls(e, t) {
    ss("error", e, t)
  }

  function ds(e, t) {
    ss("fatal", e, t)
  }
  const ps = 100;

  function hs(e, t) {
    const n = be(),
      r = ge();
    if (!n) return;
    const {
      beforeBreadcrumb: o = null,
      maxBreadcrumbs: s = ps
    } = n.getOptions();
    if (s <= 0) return;
    const i = {
        timestamp: X(),
        ...e
      },
      a = o ? O((() => o(i, t))) : i;
    null !== a && (n.emit && n.emit("beforeAddBreadcrumb", a, t), r.addBreadcrumb(a, s))
  }
  const fs = {}, ms = {};

  function gs(e, t) {
    fs[e] = fs[e] || [], fs[e].push(t)
  }

  function _s(e, t) {
    if (!ms[e]) {
      ms[e] = !0;
      try {
        t()
      } catch (t) {
        c && A.error(`Error while instrumenting ${e}`, t)
      }
    }
  }

  function ys(e, t) {
    const n = e && fs[e];
    if (n)
      for (const r of n) try {
        r(t)
      } catch (t) {
        c && A.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${Ur(r)}\nError:`, t)
      }
  }

  function vs(e) {
    const t = "console";
    gs(t, e), _s(t, bs)
  }

  function bs() {
    "console" in r && M.forEach((function(e) {
      e in r.console && F(r.console, e, (function(t) {
        return R[e] = t,
          function(...t) {
            ys("console", {
              args: t,
              level: e
            });
            const n = R[e];
            n?.apply(r.console, t)
          }
      }))
    }))
  }

  function Ss(e) {
    return "warn" === e ? "warning" : ["fatal", "error", "warning", "log", "info", "debug"].includes(e) ? e : "log"
  }
  const ws = (e = {}) => {
    const t = e.levels || M,
      n = e.handled ?? !0;
    return {
      name: "CaptureConsole",
      setup(e) {
        "console" in r && vs((({
          args: r,
          level: o
        }) => {
          be() === e && t.includes(o) && function(e, t, n) {
            const r = {
              level: Ss(t),
              extra: {
                arguments: e
              }
            };
            ye((o => {
              if (o.addEventProcessor((e => (e.logger = "console", J(e, {
                  handled: n,
                  type: "console"
                }), e))), "assert" === t) {
                if (!e[0]) {
                  const t = `Assertion failed: ${N(e.slice(1)," ")||"console.assert"}`;
                  o.setExtra("arguments", e.slice(1)), Jr(t, r)
                }
                return
              }
              const s = e.find((e => e instanceof Error));
              s ? Gr(s, r) : Jr(N(e, " "), r)
            }))
          }(r, o, n)
        }))
      }
    }
  }, ks = {
    [kn]: "auto.console.logging"
  }, Es = (e = {}) => {
    const t = e.levels || M;
    return {
      name: "ConsoleLogs",
      setup(e) {
        const {
          _experiments: n,
          normalizeDepth: r = 3,
          normalizeMaxBreadth: o = 1e3
        } = e.getOptions();
        n?.enableLogs ? vs((({
          args: n,
          level: s
        }) => {
          if (be() !== e || !t.includes(s)) return;
          if ("assert" === s) {
            if (!n[0]) {
              const e = n.slice(1);
              es({
                level: "error",
                message: e.length > 0 ? `Assertion failed: ${xs(e,r,o)}` : "Assertion failed",
                attributes: ks
              })
            }
            return
          }
          const i = "log" === s;
          es({
            level: i ? "info" : s,
            message: xs(n, r, o),
            severityNumber: i ? 10 : void 0,
            attributes: ks
          })
        })) : c && A.warn("`_experiments.enableLogs` is not enabled, ConsoleLogs integration disabled")
      }
    }
  };

  function xs(e, t, n) {
    return "util" in r && "function" == typeof r.util.format ? r.util.format(...e) : function(e, t, n) {
      return e.map((e => g(e) ? String(e) : JSON.stringify(Hr(e, t, n)))).join(" ")
    }(e, t, n)
  }

  function Cs(e, t, n = () => {}) {
    let r;
    try {
      r = e()
    } catch (e) {
      throw t(e), n(), e
    }
    return function(e, t, n) {
      return v(e) ? e.then((e => (n(), e)), (e => {
        throw t(e), n(), e
      })) : (n(), e)
    }(r, t, n)
  }
  class Ts {
    constructor(e = {}) {
      this._traceId = e.traceId || re(), this._spanId = e.spanId || oe()
    }
    spanContext() {
      return {
        spanId: this._spanId,
        traceId: this._traceId,
        traceFlags: 0
      }
    }
    end(e) {}
    setAttribute(e, t) {
      return this
    }
    setAttributes(e) {
      return this
    }
    setStatus(e) {
      return this
    }
    updateName(e) {
      return this
    }
    isRecording() {
      return !1
    }
    addEvent(e, t, n) {
      return this
    }
    addLink(e) {
      return this
    }
    addLinks(e) {
      return this
    }
    recordException(e, t) {}
  }

  function Is(e, t, n, r = yr()) {
    const o = r && _r(r);
    o && (c && A.log(`[Measurement] Setting measurement on root span: ${e} = ${t} ${n}`), o.addEvent(e, {
      [Cn]: t,
      [xn]: n
    }))
  }

  function Ms(e) {
    if (!e || 0 === e.length) return;
    const t = {};
    return e.forEach((e => {
      const n = e.attributes || {},
        r = n[xn],
        o = n[Cn];
      "string" == typeof r && "number" == typeof o && (t[e.name] = {
        value: o,
        unit: r
      })
    })), t
  }
  class Rs {
    constructor(e = {}) {
      this._traceId = e.traceId || re(), this._spanId = e.spanId || oe(), this._startTime = e.startTimestamp || Z(), this._links = e.links, this._attributes = {}, this.setAttributes({
        [kn]: "manual",
        [wn]: e.op,
        ...e.attributes
      }), this._name = e.name, e.parentSpanId && (this._parentSpanId = e.parentSpanId), "sampled" in e && (this._sampled = e.sampled), e.endTimestamp && (this._endTime = e.endTimestamp), this._events = [], this._isStandaloneSpan = e.isStandalone, this._endTime && this._onSpanEnded()
    }
    addLink(e) {
      return this._links ? this._links.push(e) : this._links = [e], this
    }
    addLinks(e) {
      return this._links ? this._links.push(...e) : this._links = e, this
    }
    recordException(e, t) {}
    spanContext() {
      const {
        _spanId: e,
        _traceId: t,
        _sampled: n
      } = this;
      return {
        spanId: e,
        traceId: t,
        traceFlags: n ? nr : 0
      }
    }
    setAttribute(e, t) {
      return void 0 === t ? delete this._attributes[e] : this._attributes[e] = t, this
    }
    setAttributes(e) {
      return Object.keys(e).forEach((t => this.setAttribute(t, e[t]))), this
    }
    updateStartTime(e) {
      this._startTime = cr(e)
    }
    setStatus(e) {
      return this._status = e, this
    }
    updateName(e) {
      return this._name = e, this.setAttribute(vn, "custom"), this
    }
    end(e) {
      this._endTime || (this._endTime = cr(e), function(e) {
        if (!c) return;
        const {
          description: t = "< unknown name >",
          op: n = "< unknown op >"
        } = lr(e), {
          spanId: r
        } = e.spanContext(), o = `[Tracing] Finishing "${n}" ${_r(e)===e?"root ":""}span "${t}" with ID ${r}`;
        A.log(o)
      }(this), this._onSpanEnded())
    }
    getSpanJSON() {
      return {
        data: this._attributes,
        description: this._name,
        op: this._attributes[wn],
        parent_span_id: this._parentSpanId,
        span_id: this._spanId,
        start_timestamp: this._startTime,
        status: pr(this._status),
        timestamp: this._endTime,
        trace_id: this._traceId,
        origin: this._attributes[kn],
        profile_id: this._attributes[In],
        exclusive_time: this._attributes[Mn],
        measurements: Ms(this._events),
        is_segment: this._isStandaloneSpan && _r(this) === this || void 0,
        segment_id: this._isStandaloneSpan ? _r(this).spanContext().spanId : void 0,
        links: ar(this._links)
      }
    }
    isRecording() {
      return !this._endTime && !!this._sampled
    }
    addEvent(e, t, n) {
      c && A.log("[Tracing] Adding an event to span:", e);
      const r = Os(t) ? t : n || Z(),
        o = Os(t) ? {} : t || {},
        s = {
          name: e,
          time: cr(r),
          attributes: o
        };
      return this._events.push(s), this
    }
    isStandaloneSpan() {
      return !!this._isStandaloneSpan
    }
    _onSpanEnded() {
      const e = be();
      if (e && e.emit("spanEnd", this), !this._isStandaloneSpan && this !== _r(this)) return;
      if (this._isStandaloneSpan) return void(this._sampled ? function(e) {
        const t = be();
        if (!t) return;
        const n = e[1];
        n && 0 !== n.length ? t.sendEnvelope(e) : t.recordDroppedEvent("before_send", "span")
      }(function(e, t) {
        const n = xr(e[0]),
          r = t?.getDsn(),
          o = t?.getOptions().tunnel,
          s = {
            sent_at: (new Date).toISOString(),
            ... function(e) {
              return !!e.trace_id && !!e.public_key
            }(n) && {
              trace: n
            },
            ...!!o && r && {
              dsn: Bn(r)
            }
          },
          i = t?.getOptions().beforeSendSpan,
          a = i ? e => {
            const t = lr(e);
            return i(t) || (vr(), t)
          } : lr,
          c = [];
        for (const t of e) {
          const e = a(t);
          e && c.push(Ao(e))
        }
        return Co(s, c)
      }([this], e)) : (c && A.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled."), e && e.recordDroppedEvent("sample_rate", "span")));
      const t = this._convertSpanToTransaction();
      t && (Xn(this).scope || me()).captureEvent(t)
    }
    _convertSpanToTransaction() {
      if (!As(lr(this))) return;
      this._name || (c && A.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>");
      const {
        scope: e,
        isolationScope: t
      } = Xn(this), n = e?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
      if (!0 !== this._sampled) return;
      const r = gr(this).filter((e => e !== this && ! function(e) {
          return e instanceof Rs && e.isStandaloneSpan()
        }(e))).map((e => lr(e))).filter(As),
        o = this._attributes[vn];
      delete this._attributes[Tn], r.forEach((e => {
        delete e.data[Tn]
      }));
      const s = {
          contexts: {
            trace: or(this)
          },
          spans: r.length > 1e3 ? r.sort(((e, t) => e.start_timestamp - t.start_timestamp)).slice(0, 1e3) : r,
          start_timestamp: this._startTime,
          timestamp: this._endTime,
          transaction: this._name,
          type: "transaction",
          sdkProcessingMetadata: {
            capturedSpanScope: e,
            capturedSpanIsolationScope: t,
            dynamicSamplingContext: xr(this)
          },
          request: n,
          ...o && {
            transaction_info: {
              source: o
            }
          }
        },
        i = Ms(this._events);
      return i && Object.keys(i).length && (c && A.log("[Measurements] Adding measurements to transaction event", JSON.stringify(i, void 0, 2)), s.measurements = i), s
    }
  }

  function Os(e) {
    return e && "number" == typeof e || e instanceof Date || Array.isArray(e)
  }

  function As(e) {
    return !!(e.start_timestamp && e.timestamp && e.span_id && e.trace_id)
  }
  const Ls = "__SENTRY_SUPPRESS_TRACING__";

  function Ds(e, t) {
    const n = zs();
    if (n.startSpan) return n.startSpan(e, t);
    const r = Hs(e),
      {
        forceTransaction: o,
        parentSpan: s,
        scope: i
      } = e,
      a = i?.clone();
    return ye(a, (() => Vs(s)((() => {
      const n = me(),
        i = Ws(n, s),
        a = e.onlyIfParent && !i ? new Ts : js({
          parentSpan: i,
          spanArguments: r,
          forceTransaction: o,
          scope: n
        });
      return ie(n, a), Cs((() => t(a)), (() => {
        const {
          status: e
        } = lr(a);
        !a.isRecording() || e && "ok" !== e || a.setStatus({
          code: Vn,
          message: "internal_error"
        })
      }), (() => {
        a.end()
      }))
    }))))
  }

  function Ns(e, t) {
    const n = zs();
    if (n.startSpanManual) return n.startSpanManual(e, t);
    const r = Hs(e),
      {
        forceTransaction: o,
        parentSpan: s,
        scope: i
      } = e,
      a = i?.clone();
    return ye(a, (() => Vs(s)((() => {
      const n = me(),
        i = Ws(n, s),
        a = e.onlyIfParent && !i ? new Ts : js({
          parentSpan: i,
          spanArguments: r,
          forceTransaction: o,
          scope: n
        });
      return ie(n, a), Cs((() => t(a, (() => a.end()))), (() => {
        const {
          status: e
        } = lr(a);
        !a.isRecording() || e && "ok" !== e || a.setStatus({
          code: Vn,
          message: "internal_error"
        })
      }))
    }))))
  }

  function Ps(e) {
    const t = zs();
    if (t.startInactiveSpan) return t.startInactiveSpan(e);
    const n = Hs(e),
      {
        forceTransaction: r,
        parentSpan: o
      } = e;
    return (e.scope ? t => ye(e.scope, t) : void 0 !== o ? e => $s(o, e) : e => e())((() => {
      const t = me(),
        s = Ws(t, o);
      return e.onlyIfParent && !s ? new Ts : js({
        parentSpan: s,
        spanArguments: n,
        forceTransaction: r,
        scope: t
      })
    }))
  }
  const Fs = (e, t) => {
    const n = fe(s());
    if (n.continueTrace) return n.continueTrace(e, t);
    const {
      sentryTrace: r,
      baggage: o
    } = e;
    return ye((e => {
      const n = er(r, o);
      return e.setPropagationContext(n), t()
    }))
  };

  function $s(e, t) {
    const n = zs();
    return n.withActiveSpan ? n.withActiveSpan(e, t) : ye((n => (ie(n, e || void 0), t(n))))
  }

  function Bs(e) {
    const t = zs();
    return t.suppressTracing ? t.suppressTracing(e) : ye((t => {
      t.setSDKProcessingMetadata({
        [Ls]: !0
      });
      const n = e();
      return t.setSDKProcessingMetadata({
        [Ls]: void 0
      }), n
    }))
  }

  function Us(e) {
    return ye((t => (t.setPropagationContext({
      traceId: re(),
      sampleRand: Math.random()
    }), c && A.info(`Starting a new trace with id ${t.getPropagationContext().traceId}`), $s(null, e))))
  }

  function js({
    parentSpan: e,
    spanArguments: t,
    forceTransaction: n,
    scope: r
  }) {
    if (!zn()) {
      const r = new Ts;
      return !n && e || wr(r, {
        sampled: "false",
        sample_rate: "0",
        transaction: t.name,
        ...xr(r)
      }), r
    }
    const o = ge();
    let s;
    if (e && !n) s = function(e, t, n) {
      const {
        spanId: r,
        traceId: o
      } = e.spanContext(), s = !t.getScopeData().sdkProcessingMetadata[Ls] && dr(e), i = s ? new Rs({
        ...n,
        parentSpanId: r,
        traceId: o,
        sampled: s
      }) : new Ts({
        traceId: o
      });
      mr(e, i);
      const a = be();
      return a && (a.emit("spanStart", i), n.endTimestamp && a.emit("spanEnd", i)), i
    }(e, r, t), mr(e, s);
    else if (e) {
      const n = xr(e),
        {
          traceId: o,
          spanId: i
        } = e.spanContext(),
        a = dr(e);
      s = qs({
        traceId: o,
        parentSpanId: i,
        ...t
      }, r, a), wr(s, n)
    } else {
      const {
        traceId: e,
        dsc: n,
        parentSpanId: i,
        sampled: a
      } = {
        ...o.getPropagationContext(),
        ...r.getPropagationContext()
      };
      s = qs({
        traceId: e,
        parentSpanId: i,
        ...t
      }, r, a), n && wr(s, n)
    }
    return function(e) {
        if (!c) return;
        const {
          description: t = "< unknown name >",
          op: n = "< unknown op >",
          parent_span_id: r
        } = lr(e), {
          spanId: o
        } = e.spanContext(), s = dr(e), i = _r(e), a = i === e, u = `[Tracing] Starting ${s?"sampled":"unsampled"} ${a?"root ":""}span`, l = [`op: ${n}`, `name: ${t}`, `ID: ${o}`];
        if (r && l.push(`parent ID: ${r}`), !a) {
          const {
            op: e,
            description: t
          } = lr(i);
          l.push(`root ID: ${i.spanContext().spanId}`), e && l.push(`root op: ${e}`), t && l.push(`root description: ${t}`)
        }
        A.log(`${u}\n  ${l.join("\n  ")}`)
      }(s),
      function(e, t, n) {
        e && ($(e, Yn, n), $(e, Kn, t))
      }(s, r, o), s
  }

  function Hs(e) {
    const t = {
      isStandalone: (e.experimental || {}).standalone,
      ...e
    };
    if (e.startTime) {
      const n = {
        ...t
      };
      return n.startTimestamp = cr(e.startTime), delete n.startTime, n
    }
    return t
  }

  function zs() {
    return fe(s())
  }

  function qs(e, t, n) {
    const r = be(),
      o = r?.getOptions() || {},
      {
        name: s = ""
      } = e,
      i = {
        spanAttributes: {
          ...e.attributes
        },
        spanName: s,
        parentSampled: n
      };
    r?.emit("beforeSampling", i, {
      decision: !1
    });
    const a = i.parentSampled ?? n,
      u = i.spanAttributes,
      l = t.getPropagationContext(),
      [d, p, h] = t.getScopeData().sdkProcessingMetadata[Ls] ? [!1] : function(e, t, n) {
        if (!zn(e)) return [!1];
        let r, o;
        "function" == typeof e.tracesSampler ? (o = e.tracesSampler({
          ...t,
          inheritOrSampleWith: e => "number" == typeof t.parentSampleRate ? t.parentSampleRate : "boolean" == typeof t.parentSampled ? Number(t.parentSampled) : e
        }), r = !0) : void 0 !== t.parentSampled ? o = t.parentSampled : void 0 !== e.tracesSampleRate && (o = e.tracesSampleRate, r = !0);
        const s = Zn(o);
        if (void 0 === s) return c && A.warn(`[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(o)} of type ${JSON.stringify(typeof o)}.`), [!1];
        if (!s) return c && A.log("[Tracing] Discarding transaction because " + ("function" == typeof e.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0")), [!1, s, r];
        const i = n < s;
        return i || c && A.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(o)})`), [i, s, r]
      }(o, {
        name: s,
        parentSampled: a,
        attributes: u,
        parentSampleRate: Zn(l.dsc?.sample_rate)
      }, l.sampleRand),
      f = new Rs({
        ...e,
        attributes: {
          [vn]: "custom",
          [bn]: void 0 !== p && h ? p : void 0,
          ...u
        },
        sampled: d
      });
    return !d && r && (c && A.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."), r.recordDroppedEvent("sample_rate", "transaction")), r && r.emit("spanStart", f), f
  }

  function Ws(e, t) {
    if (t) return t;
    if (null === t) return;
    const n = ae(e);
    if (!n) return;
    const r = be();
    return (r ? r.getOptions() : {}).parentSpanIsAlwaysRootSpan ? _r(n) : n
  }

  function Vs(e) {
    return void 0 !== e ? t => $s(e, t) : e => e()
  }
  const Gs = Symbol.for("SentryBufferFullError");
  const Js = 6e4;

  function Ks(e, t = Date.now()) {
    const n = parseInt(`${e}`, 10);
    if (!isNaN(n)) return 1e3 * n;
    const r = Date.parse(`${e}`);
    return isNaN(r) ? Js : r - t
  }

  function Ys(e, t, n = Date.now()) {
    return function(e, t) {
      return e[t] || e.all || 0
    }(e, t) > n
  }

  function Xs(e, {
    statusCode: t,
    headers: n
  }, r = Date.now()) {
    const o = {
        ...e
      },
      s = n?.["x-sentry-rate-limits"],
      i = n?.["retry-after"];
    if (s)
      for (const e of s.trim().split(",")) {
        const [t, n, , , s] = e.split(":", 5), i = parseInt(t, 10), a = 1e3 * (isNaN(i) ? 60 : i);
        if (n)
          for (const e of n.split(";")) "metric_bucket" === e && s && !s.split(";").includes("custom") || (o[e] = r + a);
        else o.all = r + a
      } else i ? o.all = r + Ks(i, r) : 429 === t && (o.all = r + 6e4);
    return o
  }
  const Zs = 64;

  function Qs(e, t, n = function(e) {
    const t = [];

    function n(e) {
      return t.splice(t.indexOf(e), 1)[0] || Promise.resolve(void 0)
    }
    return {
      $: t,
      add: function(r) {
        if (!(void 0 === e || t.length < e)) return gn(Gs);
        const o = r();
        return -1 === t.indexOf(o) && t.push(o), o.then((() => n(o))).then(null, (() => n(o).then(null, (() => {})))), o
      },
      drain: function(e) {
        return new _n(((n, r) => {
          let o = t.length;
          if (!o) return n(!0);
          const s = setTimeout((() => {
            e && e > 0 && n(!1)
          }), e);
          t.forEach((e => {
            mn(e).then((() => {
              --o || (clearTimeout(s), n(!0))
            }), r)
          }))
        }))
      }
    }
  }(e.bufferSize || Zs)) {
    let r = {};
    return {
      send: function(o) {
        const s = [];
        if (Io(o, ((t, n) => {
            const o = No(n);
            Ys(r, o) ? e.recordDroppedEvent("ratelimit_backoff", o) : s.push(t)
          })), 0 === s.length) return mn({});
        const i = Co(o[0], s),
          a = t => {
            Io(i, ((n, r) => {
              e.recordDroppedEvent(t, No(r))
            }))
          };
        return n.add((() => t({
          body: Oo(i)
        }).then((e => (void 0 !== e.statusCode && (e.statusCode < 200 || e.statusCode >= 300) && c && A.warn(`Sentry responded with status code ${e.statusCode} to sent event.`), r = Xs(r, e), e)), (e => {
          throw a("network_error"), c && A.error("Encountered error running transport request:", e), e
        })))).then((e => e), (e => {
          if (e === Gs) return c && A.error("Skipped sending event because buffer is full."), a("queue_overflow"), mn({});
          throw e
        }))
      },
      flush: e => n.drain(e)
    }
  }
  const ei = () => {
    let e;
    return {
      name: "Dedupe",
      processEvent(t) {
        if (t.type) return t;
        try {
          if (function(e, t) {
              return !!t && (!! function(e, t) {
                const n = e.message,
                  r = t.message;
                return !(!n && !r) && (!(n && !r || !n && r) && (n === r && (!!ni(e, t) && !!ti(e, t))))
              }(e, t) || !! function(e, t) {
                const n = ri(t),
                  r = ri(e);
                return !(!n || !r) && (n.type === r.type && n.value === r.value && (!!ni(e, t) && !!ti(e, t)))
              }(e, t))
            }(t, e)) return c && A.warn("Event dropped due to being a duplicate of previously captured event."), null
        } catch (e) {}
        return e = t
      }
    }
  };

  function ti(e, t) {
    let n = jr(e),
      r = jr(t);
    if (!n && !r) return !0;
    if (n && !r || !n && r) return !1;
    if (r.length !== n.length) return !1;
    for (let e = 0; e < r.length; e++) {
      const t = r[e],
        o = n[e];
      if (t.filename !== o.filename || t.lineno !== o.lineno || t.colno !== o.colno || t.function !== o.function) return !1
    }
    return !0
  }

  function ni(e, t) {
    let n = e.fingerprint,
      r = t.fingerprint;
    if (!n && !r) return !0;
    if (n && !r || !n && r) return !1;
    try {
      return !(n.join("") !== r.join(""))
    } catch (e) {
      return !1
    }
  }

  function ri(e) {
    return e.exception?.values && e.exception.values[0]
  }
  const oi = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/, /^Can't find variable: gmo$/, /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/, 'can\'t redefine non-configurable property "solana"', "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)", "Can't find variable: _AutofillCallbackHandler", /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/, /^Java exception was raised during method invocation$/], si = (e = {}) => {
    let t;
    return {
      name: "EventFilters",
      setup(n) {
        const r = n.getOptions();
        t = ai(e, r)
      },
      processEvent(n, r, o) {
        if (!t) {
          const n = o.getOptions();
          t = ai(e, n)
        }
        return function(e, t) {
          if (e.type) {
            if ("transaction" === e.type && function(e, t) {
                if (!t?.length) return !1;
                const n = e.transaction;
                return !!n && P(n, t)
              }(e, t.ignoreTransactions)) return c && A.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${V(e)}`), !0
          } else {
            if (function(e, t) {
                return !!t?.length && $o(e).some((e => P(e, t)))
              }(e, t.ignoreErrors)) return c && A.warn(`Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${V(e)}`), !0;
            if (function(e) {
                return !!e.exception?.values?.length && (!e.message && !e.exception.values.some((e => e.stacktrace || e.type && "Error" !== e.type || e.value)))
              }(e)) return c && A.warn(`Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${V(e)}`), !0;
            if (function(e, t) {
                if (!t?.length) return !1;
                const n = ci(e);
                return !!n && P(n, t)
              }(e, t.denyUrls)) return c && A.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${V(e)}.\nUrl: ${ci(e)}`), !0;
            if (! function(e, t) {
                if (!t?.length) return !0;
                const n = ci(e);
                return !n || P(n, t)
              }(e, t.allowUrls)) return c && A.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${V(e)}.\nUrl: ${ci(e)}`), !0
          }
          return !1
        }(n, t) ? null : n
      }
    }
  }, ii = (e = {}) => ({
    ...si(e),
    name: "InboundFilters"
  });

  function ai(e = {}, t = {}) {
    return {
      allowUrls: [...e.allowUrls || [], ...t.allowUrls || []],
      denyUrls: [...e.denyUrls || [], ...t.denyUrls || []],
      ignoreErrors: [...e.ignoreErrors || [], ...t.ignoreErrors || [], ...e.disableErrorDefaults ? [] : oi],
      ignoreTransactions: [...e.ignoreTransactions || [], ...t.ignoreTransactions || []]
    }
  }

  function ci(e) {
    try {
      const t = [...e.exception?.values ?? []].reverse().find((e => void 0 === e.mechanism?.parent_id && e.stacktrace?.frames?.length)),
        n = t?.stacktrace?.frames;
      return n ? function(e = []) {
        for (let t = e.length - 1; t >= 0; t--) {
          const n = e[t];
          if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename) return n.filename || null
        }
        return null
      }(n) : null
    } catch (t) {
      return c && A.error(`Cannot extract url for event ${V(e)}`), null
    }
  }
  const ui = (e = {}) => {
    const {
      depth: t = 3,
      captureErrorCause: n = !0
    } = e;
    return {
      name: "ExtraErrorData",
      processEvent(e, r, o) {
        const {
          maxValueLength: s = 250
        } = o.getOptions();
        return function(e, t = {}, n, r, o) {
          if (!t.originalException || !l(t.originalException)) return e;
          const s = t.originalException.name || t.originalException.constructor.name,
            i = function(e, t, n) {
              try {
                const r = ["name", "message", "stack", "line", "column", "fileName", "lineNumber", "columnNumber", "toJSON"],
                  o = {};
                for (const t of Object.keys(e)) {
                  if (-1 !== r.indexOf(t)) continue;
                  const s = e[t];
                  o[t] = l(s) || "string" == typeof s ? L(`${s}`, n) : s
                }
                if (t && void 0 !== e.cause && (o.cause = l(e.cause) ? e.cause.toString() : e.cause), "function" == typeof e.toJSON) {
                  const t = e.toJSON();
                  for (const e of Object.keys(t)) {
                    const n = t[e];
                    o[e] = l(n) ? n.toString() : n
                  }
                }
                return o
              } catch (e) {
                c && A.error("Unable to extract extra data from the Error object:", e)
              }
              return null
            }(t.originalException, r, o);
          if (i) {
            const t = {
                ...e.contexts
              },
              r = Hr(i, n);
            return _(r) && ($(r, "__sentry_skip_normalization__", !0), t[s] = r), {
              ...e,
              contexts: t
            }
          }
          return e
        }(e, r, t, n, s)
      }
    }
  }, li = 100, di = 10; r._spanToFlagBufferMap = new WeakMap;
  const pi = "flag.evaluation.";

  function hi(e) {
    const t = me().getScopeData().contexts.flags,
      n = t ? t.values : [];
    return n.length ? (void 0 === e.contexts && (e.contexts = {}), e.contexts.flags = {
      values: [...n]
    }, e) : e
  }

  function fi(e, t, n = li) {
    const r = me().getScopeData().contexts;
    r.flags || (r.flags = {
        values: []
      }),
      function(e, t, n, r) {
        if ("boolean" != typeof n) return;
        if (e.length > r) return void(c && A.error(`[Feature Flags] insertToFlagBuffer called on a buffer larger than maxSize=${r}`));
        const o = e.findIndex((e => e.flag === t)); - 1 !== o && e.splice(o, 1), e.length === r && e.shift(), e.push({
          flag: t,
          result: n
        })
      }(r.flags.values, e, t, n)
  }

  function mi(e, t, n = di) {
    const o = r._spanToFlagBufferMap;
    if (!o || "boolean" != typeof t) return;
    const s = yr();
    if (s) {
      const r = o.get(s) || new Set;
      r.has(e) ? s.setAttribute(`${pi}${e}`, t) : r.size < n && (r.add(e), s.setAttribute(`${pi}${e}`, t)), o.set(s, r)
    }
  }
  const gi = () => ({
    name: "FeatureFlags",
    processEvent: (e, t, n) => hi(e),
    addFeatureFlag(e, t) {
      fi(e, t), mi(e, t)
    }
  });
  let _i;
  const yi = new WeakMap, vi = () => ({
    name: "FunctionToString",
    setupOnce() {
      _i = Function.prototype.toString;
      try {
        Function.prototype.toString = function(...e) {
          const t = U(this),
            n = yi.has(be()) && void 0 !== t ? t : this;
          return _i.apply(n, e)
        }
      } catch {}
    },
    setup(e) {
      yi.set(e, !0)
    }
  });

  function bi(e = {}) {
    const t = e.client || be();
    if (!io() || !t) return {};
    const n = fe(s());
    if (n.getTraceData) return n.getTraceData(e);
    const r = e.scope || me(),
      o = e.span || yr(),
      i = o ? ir(o) : function(e) {
        const {
          traceId: t,
          sampled: n,
          propagationSpanId: r
        } = e.getPropagationContext();
        return tr(t, r, n)
      }(r),
      a = Nn(o ? xr(o) : Er(t, r));
    return Qn.test(i) ? {
      "sentry-trace": i,
      baggage: a
    } : (A.warn("Invalid sentry-trace data. Cannot generate trace data"), {})
  }
  const Si = ["reauthenticate", "signInAnonymously", "signInWithOAuth", "signInWithIdToken", "signInWithOtp", "signInWithPassword", "signInWithSSO", "signOut", "signUp", "verifyOtp"], wi = ["createUser", "deleteUser", "listUsers", "getUserById", "updateUserById", "inviteUserByEmail"], ki = {
    eq: "eq",
    neq: "neq",
    gt: "gt",
    gte: "gte",
    lt: "lt",
    lte: "lte",
    like: "like",
    "like(all)": "likeAllOf",
    "like(any)": "likeAnyOf",
    ilike: "ilike",
    "ilike(all)": "ilikeAllOf",
    "ilike(any)": "ilikeAnyOf",
    is: "is",
    in: "in",
    cs: "contains",
    cd: "containedBy",
    sr: "rangeGt",
    nxl: "rangeGte",
    sl: "rangeLt",
    nxr: "rangeLte",
    adj: "rangeAdjacent",
    ov: "overlaps",
    fts: "",
    plfts: "plain",
    phfts: "phrase",
    wfts: "websearch",
    not: "not"
  }, Ei = ["select", "insert", "upsert", "update", "delete"];

  function xi(e) {
    try {
      e.__SENTRY_INSTRUMENTED__ = !0
    } catch {}
  }

  function Ci(e) {
    try {
      return e.__SENTRY_INSTRUMENTED__
    } catch {
      return !1
    }
  }

  function Ti(e, t) {
    if ("" === t || "*" === t) return "select(*)";
    if ("select" === e) return `select(${t})`;
    if ("or" === e || e.endsWith(".or")) return `${e}${t}`;
    const [n, ...r] = t.split(".");
    let o;
    return o = n?.startsWith("fts") ? "textSearch" : n?.startsWith("plfts") ? "textSearch[plain]" : n?.startsWith("phfts") ? "textSearch[phrase]" : n?.startsWith("wfts") ? "textSearch[websearch]" : n && ki[n] || "filter", `${o}(${e}, ${r.join(".")})`
  }

  function Ii(e, t = !1) {
    return new Proxy(e, {
      apply: (n, r, o) => Ds({
        name: `auth ${t?"(admin) ":""}${e.name}`,
        attributes: {
          [kn]: "auto.db.supabase",
          [wn]: "db",
          "db.system": "postgresql",
          "db.operation": `auth.${t?"admin.":""}${e.name}`
        }
      }, (e => Reflect.apply(n, r, o).then((t => (t && "object" == typeof t && "error" in t && t.error ? (e.setStatus({
        code: Vn
      }), Gr(t.error, {
        mechanism: {
          handled: !1
        }
      })) : e.setStatus({
        code: Wn
      }), e.end(), t))).catch((t => {
        throw e.setStatus({
          code: Vn
        }), e.end(), Gr(t, {
          mechanism: {
            handled: !1
          }
        }), t
      })).then(...o)))
    })
  }

  function Mi(e) {
    Ci(e.prototype.then) || (e.prototype.then = new Proxy(e.prototype.then, {
      apply(e, t, n) {
        const r = Ei,
          o = t,
          s = function(e, t = {}) {
            switch (e) {
              case "GET":
                return "select";
              case "POST":
                return t.Prefer?.includes("resolution=") ? "upsert" : "insert";
              case "PATCH":
                return "update";
              case "DELETE":
                return "delete";
              default:
                return "<unknown-op>"
            }
          }(o.method, o.headers);
        if (!r.includes(s)) return Reflect.apply(e, t, n);
        if (!o?.url?.pathname || "string" != typeof o.url.pathname) return Reflect.apply(e, t, n);
        const i = o.url.pathname.split("/"),
          a = i.length > 0 ? i[i.length - 1] : "",
          c = [];
        for (const [e, t] of o.url.searchParams.entries()) c.push(Ti(e, t));
        const u = Object.create(null);
        if (_(o.body))
          for (const [e, t] of Object.entries(o.body)) u[e] = t;
        const l = `${"select"===s?"":`${s}${u?"(...) ":""}`}${c.join(" ")} from(${a})`,
          d = {
            "db.table": a,
            "db.schema": o.schema,
            "db.url": o.url.origin,
            "db.sdk": o.headers["X-Client-Info"],
            "db.system": "postgresql",
            "db.operation": s,
            [kn]: "auto.db.supabase",
            [wn]: "db"
          };
        return c.length && (d["db.query"] = c), Object.keys(u).length && (d["db.body"] = u), Ds({
          name: l,
          attributes: d
        }, (r => Reflect.apply(e, t, []).then((e => {
          if (r && (e && "object" == typeof e && "status" in e && Jn(r, e.status || 500), r.end()), e.error) {
            const t = new Error(e.error.message);
            e.error.code && (t.code = e.error.code), e.error.details && (t.details = e.error.details);
            const n = {};
            c.length && (n.query = c), Object.keys(u).length && (n.body = u), Gr(t, {
              contexts: {
                supabase: n
              }
            })
          }
          const t = {
              type: "supabase",
              category: `db.${s}`,
              message: l
            },
            n = {};
          return c.length && (n.query = c), Object.keys(u).length && (n.body = u), Object.keys(n).length && (t.data = n), hs(t), e
        }), (e => {
          throw r && (Jn(r, 500), r.end()), e
        })).then(...n)))
      }
    }), xi(e.prototype.then))
  }
  const Ri = e => {
    var t;
    e ? (Ci((t = e.constructor === Function ? e : e.constructor).prototype.from) || (t.prototype.from = new Proxy(t.prototype.from, {
      apply(e, t, n) {
        const r = Reflect.apply(e, t, n);
        return function(e) {
          for (const t of Ei) Ci(e.prototype[t]) || (e.prototype[t] = new Proxy(e.prototype[t], {
            apply(e, n, r) {
              const o = Reflect.apply(e, n, r),
                s = o.constructor;
              return c && A.log(`Instrumenting ${t} operation's PostgRESTFilterBuilder`), Mi(s), o
            }
          }), xi(e.prototype[t]))
        }(r.constructor), r
      }
    }), xi(t.prototype.from)), function(e) {
      const t = e.auth;
      if (t && !Ci(e.auth)) {
        for (const n of Si) {
          const r = t[n];
          r && "function" == typeof e.auth[n] && (e.auth[n] = Ii(r))
        }
        for (const n of wi) {
          const r = t.admin[n];
          r && "function" == typeof e.auth.admin[n] && (e.auth.admin[n] = Ii(r, !0))
        }
        xi(e.auth)
      }
    }(e)) : c && A.warn("Supabase integration was not installed because no Supabase client was provided.")
  }, Oi = e => {
    return t = e.supabaseClient, {
      setupOnce() {
        Ri(t)
      },
      name: "Supabase"
    };
    var t
  };

  function Ai(e, t) {
    let n;
    return Io(e, ((e, r) => (t.includes(r) && (n = Array.isArray(e) ? e[1] : void 0), !!n))), n
  }

  function Li(e, t) {
    return n => {
      const r = e(n),
        o = new Map;

      function s(t, r) {
        const s = r ? `${t}:${r}` : t;
        let i = o.get(s);
        if (!i) {
          const a = Un(t);
          if (!a) return;
          const c = xo(a, n.tunnel);
          i = r ? function(e, t) {
            return n => {
              const r = e(n);
              return {
                ...r,
                send: async e => {
                  const n = Ai(e, ["event", "transaction", "profile", "replay_event"]);
                  return n && (n.release = t), r.send(e)
                }
              }
            }
          }(e, r)({
            ...n,
            url: c
          }) : e({
            ...n,
            url: c
          }), o.set(s, i)
        }
        return [t, i]
      }
      return {
        send: async function(e) {
          const n = t({
              envelope: e,
              getEvent: function(t) {
                return Ai(e, t?.length ? t : ["event"])
              }
            }).map((e => "string" == typeof e ? s(e, void 0) : s(e.dsn, e.release))).filter((e => !!e)),
            o = n.length ? n : [
              ["", r]
            ];
          return (await Promise.all(o.map((([t, n]) => n.send(function(e, t) {
            return Co(t ? {
              ...e[0],
              dsn: t
            } : e[0], e[1])
          }(e, t))))))[0]
        },
        flush: async function(e) {
          const t = [...o.values(), r];
          return (await Promise.all(t.map((t => t.flush(e))))).every((e => e))
        }
      }
    }
  }
  const Di = new Map, Ni = new Set;

  function Pi(e, t) {
    return function(e) {
      if (r._sentryModuleMetadata)
        for (const t of Object.keys(r._sentryModuleMetadata)) {
          const n = r._sentryModuleMetadata[t];
          if (Ni.has(t)) continue;
          Ni.add(t);
          const o = e(t);
          for (const e of o.reverse())
            if (e.filename) {
              Di.set(e.filename, n);
              break
            }
        }
    }(e), Di.get(t)
  }

  function Fi(e, t) {
    try {
      t.exception.values.forEach((t => {
        if (t.stacktrace)
          for (const n of t.stacktrace.frames || []) {
            if (!n.filename || n.module_metadata) continue;
            const t = Pi(e, n.filename);
            t && (n.module_metadata = t)
          }
      }))
    } catch (e) {}
  }

  function $i(e) {
    try {
      e.exception.values.forEach((e => {
        if (e.stacktrace)
          for (const t of e.stacktrace.frames || []) delete t.module_metadata
      }))
    } catch (e) {}
  }
  const Bi = () => ({
    name: "ModuleMetadata",
    setup(e) {
      e.on("beforeEnvelope", (e => {
        Io(e, ((e, t) => {
          if ("event" === t) {
            const t = Array.isArray(e) ? e[1] : void 0;
            t && ($i(t), e[1] = t)
          }
        }))
      })), e.on("applyFrameMetadata", (t => {
        t.type || Fi(e.getOptions().stackParser, t)
      }))
    }
  });
  let Ui = null;

  function ji(e) {
    const t = "error";
    gs(t, e), _s(t, Hi)
  }

  function Hi() {
    Ui = r.onerror, r.onerror = function(e, t, n, r, o) {
      return ys("error", {
        column: r,
        error: o,
        line: n,
        msg: e,
        url: t
      }), !!Ui && Ui.apply(this, arguments)
    }, r.onerror.__SENTRY_INSTRUMENTED__ = !0
  }
  let zi = null;

  function qi(e) {
    const t = "unhandledrejection";
    gs(t, e), _s(t, Wi)
  }

  function Wi() {
    zi = r.onunhandledrejection, r.onunhandledrejection = function(e) {
      return ys("unhandledrejection", e), !zi || zi.apply(this, arguments)
    }, r.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0
  }
  let Vi = !1;

  function Gi() {
    Vi || (Vi = !0, ji(Ji), qi(Ji))
  }

  function Ji() {
    const e = yr(),
      t = e && _r(e);
    if (t) {
      const e = "internal_error";
      c && A.log(`[Tracing] Root span: ${e} -> Global error occurred`), t.setStatus({
        code: Vn,
        message: e
      })
    }
  }
  Ji.tag = "sentry_tracingErrorCallback";
  const Ki = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;

  function Yi(...e) {
    let t = "",
      n = !1;
    for (let r = e.length - 1; r >= -1 && !n; r--) {
      const o = r >= 0 ? e[r] : "/";
      o && (t = `${o}/${t}`, n = "/" === o.charAt(0))
    }
    return t = function(e, t) {
      let n = 0;
      for (let t = e.length - 1; t >= 0; t--) {
        const r = e[t];
        "." === r ? e.splice(t, 1) : ".." === r ? (e.splice(t, 1), n++) : n && (e.splice(t, 1), n--)
      }
      if (t)
        for (; n--; n) e.unshift("..");
      return e
    }(t.split("/").filter((e => !!e)), !n).join("/"), (n ? "/" : "") + t || "."
  }

  function Xi(e) {
    let t = 0;
    for (; t < e.length && "" === e[t]; t++);
    let n = e.length - 1;
    for (; n >= 0 && "" === e[n]; n--);
    return t > n ? [] : e.slice(t, n - t + 1)
  }
  const Zi = (e = {}) => {
    const t = e.root,
      n = e.prefix || "app:///",
      o = "window" in r && !!r.window,
      s = e.iteratee || function({
        isBrowser: e,
        root: t,
        prefix: n
      }) {
        return r => {
          if (!r.filename) return r;
          const o = /^[a-zA-Z]:\\/.test(r.filename) || r.filename.includes("\\") && !r.filename.includes("/"),
            s = /^\//.test(r.filename);
          if (e) {
            if (t) {
              const e = r.filename;
              0 === e.indexOf(t) && (r.filename = e.replace(t, n))
            }
          } else if (o || s) {
            const e = o ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : r.filename,
              s = t ? function(e, t) {
                e = Yi(e).slice(1), t = Yi(t).slice(1);
                const n = Xi(e.split("/")),
                  r = Xi(t.split("/")),
                  o = Math.min(n.length, r.length);
                let s = o;
                for (let e = 0; e < o; e++)
                  if (n[e] !== r[e]) {
                    s = e;
                    break
                  } let i = [];
                for (let e = s; e < n.length; e++) i.push("..");
                return i = i.concat(r.slice(s)), i.join("/")
              }(t, e) : function(e) {
                let t = function(e) {
                  const t = e.length > 1024 ? `<truncated>${e.slice(-1024)}` : e,
                    n = Ki.exec(t);
                  return n ? n.slice(1) : []
                }(e)[2] || "";
                return t
              }(e);
            r.filename = `${n}${s}`
          }
          return r
        }
      }({
        isBrowser: o,
        root: t,
        prefix: n
      });
    return {
      name: "RewriteFrames",
      processEvent(e) {
        let t = e;
        return e.exception && Array.isArray(e.exception.values) && (t = function(e) {
          try {
            return {
              ...e,
              exception: {
                ...e.exception,
                values: e.exception.values.map((e => {
                  return {
                    ...e,
                    ...e.stacktrace && {
                      stacktrace: (t = e.stacktrace, {
                        ...t,
                        frames: t?.frames && t.frames.map((e => s(e)))
                      })
                    }
                  };
                  var t
                }))
              }
            }
          } catch (t) {
            return e
          }
        }(t)), t
      }
    }
  };

  function Qi(e) {
    me().setClient(e)
  }
  const ea = e => ({
    name: "ThirdPartyErrorsFilter",
    setup(e) {
      e.on("beforeEnvelope", (e => {
        Io(e, ((e, t) => {
          if ("event" === t) {
            const t = Array.isArray(e) ? e[1] : void 0;
            t && ($i(t), e[1] = t)
          }
        }))
      })), e.on("applyFrameMetadata", (t => {
        t.type || Fi(e.getOptions().stackParser, t)
      }))
    },
    processEvent(t) {
      const n = function(e) {
        const t = jr(e);
        if (t) return t.filter((e => !!e.filename)).map((e => e.module_metadata ? Object.keys(e.module_metadata).filter((e => e.startsWith(ta))).map((e => e.slice(ta.length))) : []))
      }(t);
      if (n) {
        const r = n["drop-error-if-contains-third-party-frames" === e.behaviour || "apply-tag-if-contains-third-party-frames" === e.behaviour ? "some" : "every"]((t => !t.some((t => e.filterKeys.includes(t)))));
        if (r) {
          if ("drop-error-if-contains-third-party-frames" === e.behaviour || "drop-error-if-exclusively-contains-third-party-frames" === e.behaviour) return null;
          t.tags = {
            ...t.tags,
            third_party_code: !0
          }
        }
      }
      return t
    }
  }), ta = "_sentryBundlerPluginAppKey:";

  function na(e) {
    return {
      ...e,
      path: "path" in e && Array.isArray(e.path) ? e.path.join(".") : void 0,
      keys: "keys" in e ? JSON.stringify(e.keys) : void 0,
      unionErrors: "unionErrors" in e ? JSON.stringify(e.unionErrors) : void 0
    }
  }

  function ra(e) {
    const t = new Set;
    for (const n of e.issues) {
      const e = n.path.map((e => "number" == typeof e ? "<array>" : e)).join(".");
      e.length > 0 && t.add(e)
    }
    const n = Array.from(t);
    if (0 === n.length) {
      let t = "variable";
      if (e.issues.length > 0) {
        const n = e.issues[0];
        void 0 !== n && "expected" in n && "string" == typeof n.expected && (t = n.expected)
      }
      return `Failed to validate ${t}`
    }
    return `Failed to validate keys: ${L(n.join(", "),100)}`
  }
  const oa = (e = {}) => {
    const t = e.limit ?? 10;
    return {
      name: "ZodErrors",
      processEvent: (n, r) => function(e, t = !1, n, r) {
        if (!(n.exception?.values && r.originalException && (o = r.originalException, l(o) && "ZodError" === o.name && Array.isArray(o.issues)) && 0 !== r.originalException.issues.length)) return n;
        var o;
        try {
          const o = (t ? r.originalException.issues : r.originalException.issues.slice(0, e)).map(na);
          return t && (Array.isArray(r.attachments) || (r.attachments = []), r.attachments.push({
            filename: "zod_issues.json",
            data: JSON.stringify({
              issues: o
            })
          })), {
            ...n,
            exception: {
              ...n.exception,
              values: [{
                ...n.exception.values[0],
                value: ra(r.originalException)
              }, ...n.exception.values.slice(1)]
            },
            extra: {
              ...n.extra,
              "zoderror.issues": o.slice(0, e)
            }
          }
        } catch (e) {
          return {
            ...n,
            extra: {
              ...n.extra,
              "zoderrors sentry integration parse error": {
                message: "an exception was thrown while processing ZodError within applyZodErrorsToEvent()",
                error: e instanceof Error ? `${e.name}: ${e.message}\n${e.stack}` : "unknown"
              }
            }
          }
        }
      }(t, e.saveZodIssuesAsAttachment, n, r)
    }
  };

  function sa(e) {
    void 0 === e.user?.ip_address && (e.user = {
      ...e.user,
      ip_address: "{{auto}}"
    })
  }

  function ia(e) {
    "aggregates" in e ? void 0 === e.attrs?.ip_address && (e.attrs = {
      ...e.attrs,
      ip_address: "{{auto}}"
    }) : void 0 === e.ipAddress && (e.ipAddress = "{{auto}}")
  }

  function aa(e, t) {
    const n = ua(e, t),
      r = {
        type: pa(t),
        value: ha(t)
      };
    return n.length && (r.stacktrace = {
      frames: n
    }), void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"), r
  }

  function ca(e, t) {
    return {
      exception: {
        values: [aa(e, t)]
      }
    }
  }

  function ua(e, t) {
    const n = t.stacktrace || t.stack || "",
      r = function(e) {
        return e && la.test(e.message) ? 1 : 0
      }(t),
      o = function(e) {
        return "number" == typeof e.framesToPop ? e.framesToPop : 0
      }(t);
    try {
      return e(n, r, o)
    } catch (e) {}
    return []
  }
  const la = /Minified React error #\d+;/i;

  function da(e) {
    return "undefined" != typeof WebAssembly && void 0 !== WebAssembly.Exception && e instanceof WebAssembly.Exception
  }

  function pa(e) {
    const t = e?.name;
    return !t && da(e) ? e.message && Array.isArray(e.message) && 2 == e.message.length ? e.message[0] : "WebAssembly.Exception" : t
  }

  function ha(e) {
    const t = e?.message;
    return da(e) ? Array.isArray(e.message) && 2 == e.message.length ? e.message[1] : "wasm exception" : t ? t.error && "string" == typeof t.error.message ? t.error.message : t : "No error message"
  }

  function fa(e, t, n, r) {
    const o = ga(e, t, n?.syntheticException || void 0, r);
    return J(o), o.level = "error", n?.event_id && (o.event_id = n.event_id), mn(o)
  }

  function ma(e, t, n = "info", r, o) {
    const s = _a(e, t, r?.syntheticException || void 0, o);
    return s.level = n, r?.event_id && (s.event_id = r.event_id), mn(s)
  }

  function ga(e, t, n, r, o) {
    let s;
    if (p(t) && t.error) return ca(e, t.error);
    if (h(t) || d(t, "DOMException")) {
      const o = t;
      if ("stack" in t) s = ca(e, t);
      else {
        const t = o.name || (h(o) ? "DOMError" : "DOMException"),
          i = o.message ? `${t}: ${o.message}` : t;
        s = _a(e, i, n, r), G(s, i)
      }
      return "code" in o && (s.tags = {
        ...s.tags,
        "DOMException.code": `${o.code}`
      }), s
    }
    return l(t) ? ca(e, t) : _(t) || y(t) ? (s = function(e, t, n, r) {
      const o = be(),
        s = o?.getOptions().normalizeDepth,
        i = function(e) {
          for (const t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) {
              const n = e[t];
              if (n instanceof Error) return n
            }
        }(t),
        a = {
          __serialized__: zr(t, s)
        };
      if (i) return {
        exception: {
          values: [aa(e, i)]
        },
        extra: a
      };
      const c = {
        exception: {
          values: [{
            type: y(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
            value: ya(t, {
              isUnhandledRejection: r
            })
          }]
        },
        extra: a
      };
      if (n) {
        const t = ua(e, n);
        t.length && (c.exception.values[0].stacktrace = {
          frames: t
        })
      }
      return c
    }(e, t, n, o), J(s, {
      synthetic: !0
    }), s) : (s = _a(e, t, n, r), G(s, `${t}`, void 0), J(s, {
      synthetic: !0
    }), s)
  }

  function _a(e, t, n, r) {
    const o = {};
    if (r && n) {
      const r = ua(e, n);
      r.length && (o.exception = {
        values: [{
          value: t,
          stacktrace: {
            frames: r
          }
        }]
      }), J(o, {
        synthetic: !0
      })
    }
    if (m(t)) {
      const {
        __sentry_template_string__: e,
        __sentry_template_values__: n
      } = t;
      return o.logentry = {
        message: e,
        params: n
      }, o
    }
    return o.message = t, o
  }

  function ya(e, {
    isUnhandledRejection: t
  }) {
    const n = function(e, t = 40) {
        const n = Object.keys(j(e));
        n.sort();
        const r = n[0];
        if (!r) return "[object has no keys]";
        if (r.length >= t) return L(r, t);
        for (let e = n.length; e > 0; e--) {
          const r = n.slice(0, e).join(", ");
          if (!(r.length > t)) return e === n.length ? r : L(r, t)
        }
        return ""
      }(e),
      r = t ? "promise rejection" : "exception";
    return p(e) ? `Event \`ErrorEvent\` captured as ${r} with message \`${e.message}\`` : y(e) ? `Event \`${function(e){try{const t=Object.getPrototypeOf(e);return t?t.constructor.name:void 0}catch(e){}}(e)}\` (type=${e.type}) captured as ${r}` : `Object captured as ${r} with keys: ${n}`
  }
  class va extends Go {
    constructor(e) {
      const t = (n = e, {
        release: "string" == typeof __SENTRY_RELEASE__ ? __SENTRY_RELEASE__ : ho.SENTRY_RELEASE?.id,
        sendClientReports: !0,
        parentSpanIsAlwaysRootSpan: !0,
        ...n
      });
      var n;
      ! function(e, t, n = [t], r = "npm") {
        const s = e._metadata || {};
        s.sdk || (s.sdk = {
          name: `sentry.javascript.${t}`,
          packages: n.map((e => ({
            name: `${r}:@sentry/${e}`,
            version: o
          }))),
          version: o
        }), e._metadata = s
      }(t, "browser", ["browser"], ho.SENTRY_SDK_SOURCE || "npm"), super(t);
      const {
        sendDefaultPii: r,
        sendClientReports: s,
        _experiments: i
      } = this._options, a = i?.enableLogs;
      ho.document && (s || a) && ho.document.addEventListener("visibilitychange", (() => {
        "hidden" === ho.document.visibilityState && (s && this._flushOutcomes(), a && ts(this))
      })), a && (this.on("flush", (() => {
        ts(this)
      })), this.on("afterCaptureLog", (() => {
        this._logFlushIdleTimeout && clearTimeout(this._logFlushIdleTimeout), this._logFlushIdleTimeout = setTimeout((() => {
          ts(this)
        }), 5e3)
      }))), r && (this.on("postprocessEvent", sa), this.on("beforeSendSession", ia))
    }
    eventFromException(e, t) {
      return fa(this._options.stackParser, e, t, this._options.attachStacktrace)
    }
    eventFromMessage(e, t = "info", n) {
      return ma(this._options.stackParser, e, t, n, this._options.attachStacktrace)
    }
    _prepareEvent(e, t, n, r) {
      return e.platform = e.platform || "javascript", super._prepareEvent(e, t, n, r)
    }
  }
  const ba = r;

  function Sa(e) {
    return e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
  }

  function wa() {
    if ("string" == typeof EdgeRuntime) return !0;
    if (! function() {
        if (!("fetch" in ba)) return !1;
        try {
          return new Headers, new Request("http://www.example.com"), new Response, !0
        } catch (e) {
          return !1
        }
      }()) return !1;
    if (Sa(ba.fetch)) return !0;
    let e = !1;
    const t = ba.document;
    if (t && "function" == typeof t.createElement) try {
      const n = t.createElement("iframe");
      n.hidden = !0, t.head.appendChild(n), n.contentWindow?.fetch && (e = Sa(n.contentWindow.fetch)), t.head.removeChild(n)
    } catch (e) {
      c && A.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e)
    }
    return e
  }
  const ka = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__, Ea = r, xa = {};

  function Ca(e) {
    const t = xa[e];
    if (t) return t;
    let n = Ea[e];
    if (Sa(n)) return xa[e] = n.bind(Ea);
    const r = Ea.document;
    if (r && "function" == typeof r.createElement) try {
      const t = r.createElement("iframe");
      t.hidden = !0, r.head.appendChild(t);
      const o = t.contentWindow;
      o?.[e] && (n = o[e]), r.head.removeChild(t)
    } catch (t) {
      ka && A.warn(`Could not create sandbox iframe for ${e} check, bailing to window.${e}: `, t)
    }
    return n ? xa[e] = n.bind(Ea) : n
  }

  function Ta(e) {
    xa[e] = void 0
  }

  function Ia(...e) {
    return Ca("setTimeout")(...e)
  }

  function Ma(e, t = Ca("fetch")) {
    let n = 0,
      r = 0;
    return Qs(e, (function(o) {
      const s = o.body.length;
      n += s, r++;
      const i = {
        body: o.body,
        method: "POST",
        referrerPolicy: "strict-origin",
        headers: e.headers,
        keepalive: n <= 6e4 && r < 15,
        ...e.fetchOptions
      };
      if (!t) return Ta("fetch"), gn("No fetch implementation available");
      try {
        return t(e.url, i).then((e => (n -= s, r--, {
          statusCode: e.status,
          headers: {
            "x-sentry-rate-limits": e.headers.get("X-Sentry-Rate-Limits"),
            "retry-after": e.headers.get("Retry-After")
          }
        })))
      } catch (e) {
        return Ta("fetch"), n -= s, r--, gn(e)
      }
    }))
  }

  function Ra(e, t, n, r) {
    const o = {
      filename: e,
      function: "<anonymous>" === t ? Dr : t,
      in_app: !0
    };
    return void 0 !== n && (o.lineno = n), void 0 !== r && (o.colno = r), o
  }
  const Oa = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i, Aa = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, La = /\((\S*)(?::(\d+))(?::(\d+))\)/, Da = [30, e => {
    const t = Oa.exec(e);
    if (t) {
      const [, e, n, r] = t;
      return Ra(e, Dr, +n, +r)
    }
    const n = Aa.exec(e);
    if (n) {
      if (n[2] && 0 === n[2].indexOf("eval")) {
        const e = La.exec(n[2]);
        e && (n[2] = e[1], n[3] = e[2], n[4] = e[3])
      }
      const [e, t] = Va(n[1] || Dr, n[2]);
      return Ra(t, e, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0)
    }
  }], Na = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, Pa = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, Fa = [50, e => {
    const t = Na.exec(e);
    if (t) {
      if (t[3] && t[3].indexOf(" > eval") > -1) {
        const e = Pa.exec(t[3]);
        e && (t[1] = t[1] || "eval", t[3] = e[1], t[4] = e[2], t[5] = "")
      }
      let e = t[3],
        n = t[1] || Dr;
      return [n, e] = Va(n, e), Ra(e, n, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
    }
  }], $a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i, Ba = [40, e => {
    const t = $a.exec(e);
    return t ? Ra(t[2], t[1] || Dr, +t[3], t[4] ? +t[4] : void 0) : void 0
  }], Ua = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, ja = [10, e => {
    const t = Ua.exec(e);
    return t ? Ra(t[2], t[3] || Dr, +t[1]) : void 0
  }], Ha = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i, za = [20, e => {
    const t = Ha.exec(e);
    return t ? Ra(t[5], t[3] || t[4] || Dr, +t[1], +t[2]) : void 0
  }], qa = [Da, Fa], Wa = Fr(...qa), Va = (e, t) => {
    const n = -1 !== e.indexOf("safari-extension"),
      r = -1 !== e.indexOf("safari-web-extension");
    return n || r ? [-1 !== e.indexOf("@") ? e.split("@")[0] : Dr, n ? `safari-extension:${t}` : `safari-web-extension:${t}`] : [e, t]
  };

  function Ga(e, {
    metadata: t,
    tunnel: n,
    dsn: r
  }) {
    const o = {
        event_id: e.event_id,
        sent_at: (new Date).toISOString(),
        ...t?.sdk && {
          sdk: {
            name: t.sdk.name,
            version: t.sdk.version
          }
        },
        ...!!n && !!r && {
          dsn: Bn(r)
        }
      },
      s = function(e) {
        return [{
          type: "user_report"
        }, e]
      }(e);
    return Co(o, [s])
  }

  function Ja(e, t) {
    const n = "fetch";
    gs(n, e), _s(n, (() => Ka(void 0, t)))
  }

  function Ka(e, t = !1) {
    t && !wa() || F(r, "fetch", (function(t) {
      return function(...n) {
        const o = new Error,
          {
            method: s,
            url: i
          } = function(e) {
            if (0 === e.length) return {
              method: "GET",
              url: ""
            };
            if (2 === e.length) {
              const [t, n] = e;
              return {
                url: Za(t),
                method: Xa(n, "method") ? String(n.method).toUpperCase() : "GET"
              }
            }
            const t = e[0];
            return {
              url: Za(t),
              method: Xa(t, "method") ? String(t.method).toUpperCase() : "GET"
            }
          }(n),
          a = {
            args: n,
            fetchData: {
              method: s,
              url: i
            },
            startTimestamp: 1e3 * Z(),
            virtualError: o,
            headers: Qa(n)
          };
        return e || ys("fetch", {
          ...a
        }), t.apply(r, n).then((async t => (e ? e(t) : ys("fetch", {
          ...a,
          endTimestamp: 1e3 * Z(),
          response: t
        }), t)), (e => {
          if (ys("fetch", {
              ...a,
              endTimestamp: 1e3 * Z(),
              error: e
            }), l(e) && void 0 === e.stack && (e.stack = o.stack, $(e, "framesToPop", 1)), e instanceof TypeError && ("Failed to fetch" === e.message || "Load failed" === e.message || "NetworkError when attempting to fetch resource." === e.message)) try {
            const t = new URL(a.fetchData.url);
            e.message = `${e.message} (${t.host})`
          } catch {}
          throw e
        }))
      }
    }))
  }

  function Ya(e) {
    let t;
    try {
      t = e.clone()
    } catch {
      return
    }!async function(t) {
      if (t?.body) {
        const n = t.body,
          r = n.getReader(),
          o = setTimeout((() => {
            n.cancel().then(null, (() => {}))
          }), 9e4);
        let s = !0;
        for (; s;) {
          let t;
          try {
            t = setTimeout((() => {
              n.cancel().then(null, (() => {}))
            }), 5e3);
            const {
              done: o
            } = await r.read();
            clearTimeout(t), o && (ys("fetch-body-resolved", {
              endTimestamp: 1e3 * Z(),
              response: e
            }), s = !1)
          } catch (e) {
            s = !1
          } finally {
            clearTimeout(t)
          }
        }
        clearTimeout(o), r.releaseLock(), n.cancel().then(null, (() => {}))
      }
    }(t)
  }

  function Xa(e, t) {
    return !!e && "object" == typeof e && !!e[t]
  }

  function Za(e) {
    return "string" == typeof e ? e : e ? Xa(e, "url") ? e.url : e.toString ? e.toString() : "" : ""
  }

  function Qa(e) {
    const [t, n] = e;
    try {
      if ("object" == typeof n && null !== n && "headers" in n && n.headers) return new Headers(n.headers);
      if (w(t)) return new Headers(t.headers)
    } catch {}
  }

  function ec(e) {
    return void 0 === e ? void 0 : e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : void 0
  }
  const tc = "thismessage:/";

  function nc(e) {
    return "isRelative" in e
  }

  function rc(e, t) {
    const n = e.indexOf("://") <= 0 && 0 !== e.indexOf("//"),
      r = t ?? (n ? tc : void 0);
    try {
      if ("canParse" in URL && !URL.canParse(e, r)) return;
      const t = new URL(e, r);
      return n ? {
        isRelative: n,
        pathname: t.pathname,
        search: t.search,
        hash: t.hash
      } : t
    } catch {}
  }

  function oc(e) {
    if (nc(e)) return e.pathname;
    const t = new URL(e);
    return t.search = "", t.hash = "", ["80", "443"].includes(t.port) && (t.port = ""), t.password && (t.password = "%filtered%"), t.username && (t.username = "%filtered%"), t.toString()
  }

  function sc(e) {
    if (!e) return {};
    const t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!t) return {};
    const n = t[6] || "",
      r = t[8] || "";
    return {
      host: t[4],
      path: t[5],
      protocol: t[2],
      search: n,
      hash: r,
      relative: t[5] + n + r
    }
  }

  function ic(e) {
    return e.split(/[?#]/, 1)[0]
  }
  let ac, cc, uc;

  function lc(e) {
    gs("dom", e), _s("dom", dc)
  }

  function dc() {
    if (!Ea.document) return;
    const e = ys.bind(null, "dom"),
      t = pc(e, !0);
    Ea.document.addEventListener("click", t, !1), Ea.document.addEventListener("keypress", t, !1), ["EventTarget", "Node"].forEach((t => {
      const n = Ea,
        r = n[t]?.prototype;
      r?.hasOwnProperty?.("addEventListener") && (F(r, "addEventListener", (function(t) {
        return function(n, r, o) {
          if ("click" === n || "keypress" == n) try {
            const r = this.__sentry_instrumentation_handlers__ = this.__sentry_instrumentation_handlers__ || {},
              s = r[n] = r[n] || {
                refCount: 0
              };
            if (!s.handler) {
              const r = pc(e);
              s.handler = r, t.call(this, n, r, o)
            }
            s.refCount++
          } catch (e) {}
          return t.call(this, n, r, o)
        }
      })), F(r, "removeEventListener", (function(e) {
        return function(t, n, r) {
          if ("click" === t || "keypress" == t) try {
            const n = this.__sentry_instrumentation_handlers__ || {},
              o = n[t];
            o && (o.refCount--, o.refCount <= 0 && (e.call(this, t, o.handler, r), o.handler = void 0, delete n[t]), 0 === Object.keys(n).length && delete this.__sentry_instrumentation_handlers__)
          } catch (e) {}
          return e.call(this, t, n, r)
        }
      })))
    }))
  }

  function pc(e, t = !1) {
    return n => {
      if (!n || n._sentryCaptured) return;
      const r = function(e) {
        try {
          return e.target
        } catch (e) {
          return null
        }
      }(n);
      if (function(e, t) {
          return "keypress" === e && (!t?.tagName || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName && !t.isContentEditable)
        }(n.type, r)) return;
      $(n, "_sentryCaptured", !0), r && !r._sentryId && $(r, "_sentryId", q());
      const o = "keypress" === n.type ? "input" : n.type;
      (function(e) {
        if (e.type !== cc) return !1;
        try {
          if (!e.target || e.target._sentryId !== uc) return !1
        } catch (e) {}
        return !0
      })(n) || (e({
        event: n,
        name: o,
        global: t
      }), cc = n.type, uc = r ? r._sentryId : void 0), clearTimeout(ac), ac = Ea.setTimeout((() => {
        uc = void 0, cc = void 0
      }), 1e3)
    }
  }
  const hc = "__sentry_xhr_v3__";

  function fc(e) {
    gs("xhr", e), _s("xhr", mc)
  }

  function mc() {
    if (!Ea.XMLHttpRequest) return;
    const e = XMLHttpRequest.prototype;
    e.open = new Proxy(e.open, {
      apply(e, t, n) {
        const r = new Error,
          o = 1e3 * Z(),
          s = f(n[0]) ? n[0].toUpperCase() : void 0,
          i = function(e) {
            if (f(e)) return e;
            try {
              return e.toString()
            } catch {}
          }(n[1]);
        if (!s || !i) return e.apply(t, n);
        t[hc] = {
          method: s,
          url: i,
          request_headers: {}
        }, "POST" === s && i.match(/sentry_key/) && (t.__sentry_own_request__ = !0);
        const a = () => {
          const e = t[hc];
          if (e && 4 === t.readyState) {
            try {
              e.status_code = t.status
            } catch (e) {}
            ys("xhr", {
              endTimestamp: 1e3 * Z(),
              startTimestamp: o,
              xhr: t,
              virtualError: r
            })
          }
        };
        return "onreadystatechange" in t && "function" == typeof t.onreadystatechange ? t.onreadystatechange = new Proxy(t.onreadystatechange, {
          apply: (e, t, n) => (a(), e.apply(t, n))
        }) : t.addEventListener("readystatechange", a), t.setRequestHeader = new Proxy(t.setRequestHeader, {
          apply(e, t, n) {
            const [r, o] = n, s = t[hc];
            return s && f(r) && f(o) && (s.request_headers[r.toLowerCase()] = o), e.apply(t, n)
          }
        }), e.apply(t, n)
      }
    }), e.send = new Proxy(e.send, {
      apply(e, t, n) {
        const r = t[hc];
        return r ? (void 0 !== n[0] && (r.body = n[0]), ys("xhr", {
          startTimestamp: 1e3 * Z(),
          xhr: t
        }), e.apply(t, n)) : e.apply(t, n)
      }
    })
  }
  let gc;

  function _c(e) {
    const t = "history";
    gs(t, e), _s(t, yc)
  }

  function yc() {
    function e(e) {
      return function(...t) {
        const n = t.length > 2 ? t[2] : void 0;
        if (n) {
          const r = gc,
            o = function(e) {
              try {
                return new URL(e, Ea.location.origin).toString()
              } catch {
                return e
              }
            }(String(n));
          if (gc = o, r === o) return e.apply(this, t);
          ys("history", {
            from: r,
            to: o
          })
        }
        return e.apply(this, t)
      }
    }
    Ea.addEventListener("popstate", (() => {
      const e = Ea.location.href,
        t = gc;
      gc = e, t !== e && ys("history", {
        from: t,
        to: e
      })
    })), "history" in ba && ba.history && (F(Ea.history, "pushState", e), F(Ea.history, "replaceState", e))
  }
  const vc = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__, bc = (e = {}) => {
    const t = {
      console: !0,
      dom: !0,
      fetch: !0,
      history: !0,
      sentry: !0,
      xhr: !0,
      ...e
    };
    return {
      name: "Breadcrumbs",
      setup(e) {
        t.console && vs(function(e) {
          return function(t) {
            if (be() !== e) return;
            const n = {
              category: "console",
              data: {
                arguments: t.args,
                logger: "console"
              },
              level: Ss(t.level),
              message: N(t.args, " ")
            };
            if ("assert" === t.level) {
              if (!1 !== t.args[0]) return;
              n.message = `Assertion failed: ${N(t.args.slice(1)," ")||"console.assert"}`, n.data.arguments = t.args.slice(1)
            }
            hs(n, {
              input: t.args,
              level: t.level
            })
          }
        }(e)), t.dom && lc(function(e, t) {
          return function(n) {
            if (be() !== e) return;
            let r, o, s = "object" == typeof t ? t.serializeAttribute : void 0,
              i = "object" == typeof t && "number" == typeof t.maxStringLength ? t.maxStringLength : void 0;
            i && i > 1024 && (vc && A.warn(`\`dom.maxStringLength\` cannot exceed 1024, but a value of ${i} was configured. Sentry will use 1024 instead.`), i = 1024), "string" == typeof s && (s = [s]);
            try {
              const e = n.event,
                t = function(e) {
                  return !!e && !!e.target
                }(e) ? e.target : e;
              r = x(t, {
                keyAttrs: s,
                maxStringLength: i
              }), o = I(t)
            } catch (e) {
              r = "<unknown>"
            }
            if (0 === r.length) return;
            const a = {
              category: `ui.${n.name}`,
              message: r
            };
            o && (a.data = {
              "ui.component_name": o
            }), hs(a, {
              event: n.event,
              name: n.name,
              global: n.global
            })
          }
        }(e, t.dom)), t.xhr && fc(function(e) {
          return function(t) {
            if (be() !== e) return;
            const {
              startTimestamp: n,
              endTimestamp: r
            } = t, o = t.xhr[hc];
            if (!n || !r || !o) return;
            const {
              method: s,
              url: i,
              status_code: a,
              body: c
            } = o, u = {
              method: s,
              url: i,
              status_code: a
            }, l = {
              xhr: t.xhr,
              input: c,
              startTimestamp: n,
              endTimestamp: r
            }, d = {
              category: "xhr",
              data: u,
              type: "http",
              level: ec(a)
            };
            e.emit("beforeOutgoingRequestBreadcrumb", d, l), hs(d, l)
          }
        }(e)), t.fetch && Ja(function(e) {
          return function(t) {
            if (be() !== e) return;
            const {
              startTimestamp: n,
              endTimestamp: r
            } = t;
            if (r && (!t.fetchData.url.match(/sentry_key/) || "POST" !== t.fetchData.method))
              if (t.fetchData.method, t.fetchData.url, t.error) {
                const o = t.fetchData,
                  s = {
                    data: t.error,
                    input: t.args,
                    startTimestamp: n,
                    endTimestamp: r
                  },
                  i = {
                    category: "fetch",
                    data: o,
                    level: "error",
                    type: "http"
                  };
                e.emit("beforeOutgoingRequestBreadcrumb", i, s), hs(i, s)
              } else {
                const o = t.response,
                  s = {
                    ...t.fetchData,
                    status_code: o?.status
                  };
                t.fetchData.request_body_size, t.fetchData.response_body_size;
                const i = {
                    input: t.args,
                    response: o,
                    startTimestamp: n,
                    endTimestamp: r
                  },
                  a = {
                    category: "fetch",
                    data: s,
                    type: "http",
                    level: ec(s.status_code)
                  };
                e.emit("beforeOutgoingRequestBreadcrumb", a, i), hs(a, i)
              }
          }
        }(e)), t.history && _c(function(e) {
          return function(t) {
            if (be() !== e) return;
            let n = t.from,
              r = t.to;
            const o = sc(ho.location.href);
            let s = n ? sc(n) : void 0;
            const i = sc(r);
            s?.path || (s = o), o.protocol === i.protocol && o.host === i.host && (r = i.relative), o.protocol === s.protocol && o.host === s.host && (n = s.relative), hs({
              category: "navigation",
              data: {
                from: n,
                to: r
              }
            })
          }
        }(e)), t.sentry && e.on("beforeSendEvent", function(e) {
          return function(t) {
            be() === e && hs({
              category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
              event_id: t.event_id,
              level: t.level,
              message: V(t)
            }, {
              event: t
            })
          }
        }(e))
      }
    }
  }, Sc = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "BroadcastChannel", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "SharedWorker", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], wc = (e = {}) => {
    const t = {
      XMLHttpRequest: !0,
      eventTarget: !0,
      requestAnimationFrame: !0,
      setInterval: !0,
      setTimeout: !0,
      unregisterOriginalCallbacks: !1,
      ...e
    };
    return {
      name: "BrowserApiErrors",
      setupOnce() {
        t.setTimeout && F(ho, "setTimeout", kc), t.setInterval && F(ho, "setInterval", kc), t.requestAnimationFrame && F(ho, "requestAnimationFrame", Ec), t.XMLHttpRequest && "XMLHttpRequest" in ho && F(XMLHttpRequest.prototype, "send", xc);
        const e = t.eventTarget;
        e && (Array.isArray(e) ? e : Sc).forEach((e => function(e, t) {
          const n = ho,
            r = n[e]?.prototype;
          r?.hasOwnProperty?.("addEventListener") && (F(r, "addEventListener", (function(n) {
            return function(r, o, s) {
              try {
                "function" == typeof o.handleEvent && (o.handleEvent = go(o.handleEvent, {
                  mechanism: {
                    data: {
                      function: "handleEvent",
                      handler: Ur(o),
                      target: e
                    },
                    handled: !1,
                    type: "instrument"
                  }
                }))
              } catch {}
              return t.unregisterOriginalCallbacks && function(e, t, n) {
                e && "object" == typeof e && "removeEventListener" in e && "function" == typeof e.removeEventListener && e.removeEventListener(t, n)
              }(this, r, o), n.apply(this, [r, go(o, {
                mechanism: {
                  data: {
                    function: "addEventListener",
                    handler: Ur(o),
                    target: e
                  },
                  handled: !1,
                  type: "instrument"
                }
              }), s])
            }
          })), F(r, "removeEventListener", (function(e) {
            return function(t, n, r) {
              try {
                const o = n.__sentry_wrapped__;
                o && e.call(this, t, o, r)
              } catch (e) {}
              return e.call(this, t, n, r)
            }
          })))
        }(e, t)))
      }
    }
  };

  function kc(e) {
    return function(...t) {
      const n = t[0];
      return t[0] = go(n, {
        mechanism: {
          data: {
            function: Ur(e)
          },
          handled: !1,
          type: "instrument"
        }
      }), e.apply(this, t)
    }
  }

  function Ec(e) {
    return function(t) {
      return e.apply(this, [go(t, {
        mechanism: {
          data: {
            function: "requestAnimationFrame",
            handler: Ur(e)
          },
          handled: !1,
          type: "instrument"
        }
      })])
    }
  }

  function xc(e) {
    return function(...t) {
      const n = this;
      return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((e => {
        e in n && "function" == typeof n[e] && F(n, e, (function(t) {
          const n = {
              mechanism: {
                data: {
                  function: e,
                  handler: Ur(t)
                },
                handled: !1,
                type: "instrument"
              }
            },
            r = U(t);
          return r && (n.mechanism.data.handler = Ur(r)), go(t, n)
        }))
      })), e.apply(this, t)
    }
  }
  const Cc = () => ({
    name: "BrowserSession",
    setupOnce() {
      void 0 !== ho.document ? (co({
        ignoreDuration: !0
      }), po(), _c((({
        from: e,
        to: t
      }) => {
        void 0 !== e && e !== t && (co({
          ignoreDuration: !0
        }), po())
      }))) : vc && A.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.")
    }
  }), Tc = (e = {}) => {
    const t = {
      onerror: !0,
      onunhandledrejection: !0,
      ...e
    };
    return {
      name: "GlobalHandlers",
      setupOnce() {
        Error.stackTraceLimit = 50
      },
      setup(e) {
        t.onerror && (function(e) {
          ji((t => {
            const {
              stackParser: n,
              attachStacktrace: r
            } = Mc();
            if (be() !== e || mo()) return;
            const {
              msg: o,
              url: s,
              line: i,
              column: a,
              error: c
            } = t, u = function(e, t, n, r) {
              const o = e.exception = e.exception || {},
                s = o.values = o.values || [],
                i = s[0] = s[0] || {},
                a = i.stacktrace = i.stacktrace || {},
                c = a.frames = a.frames || [],
                u = r,
                l = n,
                d = f(t) && t.length > 0 ? t : T();
              return 0 === c.length && c.push({
                colno: u,
                filename: d,
                function: Dr,
                in_app: !0,
                lineno: l
              }), e
            }(ga(n, c || o, void 0, r, !1), s, i, a);
            u.level = "error", Kr(u, {
              originalException: c,
              mechanism: {
                handled: !1,
                type: "onerror"
              }
            })
          }))
        }(e), Ic("onerror")), t.onunhandledrejection && (function(e) {
          qi((t => {
            const {
              stackParser: n,
              attachStacktrace: r
            } = Mc();
            if (be() !== e || mo()) return;
            const o = function(e) {
                if (g(e)) return e;
                try {
                  if ("reason" in e) return e.reason;
                  if ("detail" in e && "reason" in e.detail) return e.detail.reason
                } catch {}
                return e
              }(t),
              s = g(o) ? {
                exception: {
                  values: [{
                    type: "UnhandledRejection",
                    value: `Non-Error promise rejection captured with value: ${String(o)}`
                  }]
                }
              } : ga(n, o, void 0, r, !0);
            s.level = "error", Kr(s, {
              originalException: o,
              mechanism: {
                handled: !1,
                type: "onunhandledrejection"
              }
            })
          }))
        }(e), Ic("onunhandledrejection"))
      }
    }
  };

  function Ic(e) {
    vc && A.log(`Global Handler attached: ${e}`)
  }

  function Mc() {
    const e = be();
    return e?.getOptions() || {
      stackParser: () => [],
      attachStacktrace: !1
    }
  }
  const Rc = () => ({
    name: "HttpContext",
    preprocessEvent(e) {
      if (!ho.navigator && !ho.location && !ho.document) return;
      const t = _o(),
        n = {
          ...t.headers,
          ...e.request?.headers
        };
      e.request = {
        ...t,
        ...e.request,
        headers: n
      }
    }
  });

  function Oc(e, t, n, r, o, s) {
    if (!o.exception?.values || !s || !b(s.originalException, Error)) return;
    const i = o.exception.values.length > 0 ? o.exception.values[o.exception.values.length - 1] : void 0;
    i && (o.exception.values = Ac(e, t, r, s.originalException, n, o.exception.values, i, 0))
  }

  function Ac(e, t, n, r, o, s, i, a) {
    if (s.length >= n + 1) return s;
    let c = [...s];
    if (b(r[o], Error)) {
      Lc(i, a);
      const s = e(t, r[o]),
        u = c.length;
      Dc(s, o, u, a), c = Ac(e, t, n, r[o], o, [s, ...c], s, u)
    }
    return Array.isArray(r.errors) && r.errors.forEach(((r, s) => {
      if (b(r, Error)) {
        Lc(i, a);
        const u = e(t, r),
          l = c.length;
        Dc(u, `errors[${s}]`, l, a), c = Ac(e, t, n, r, o, [u, ...c], u, l)
      }
    })), c
  }

  function Lc(e, t) {
    e.mechanism = e.mechanism || {
      type: "generic",
      handled: !0
    }, e.mechanism = {
      ...e.mechanism,
      ..."AggregateError" === e.type && {
        is_exception_group: !0
      },
      exception_id: t
    }
  }

  function Dc(e, t, n, r) {
    e.mechanism = e.mechanism || {
      type: "generic",
      handled: !0
    }, e.mechanism = {
      ...e.mechanism,
      type: "chained",
      source: t,
      exception_id: n,
      parent_id: r
    }
  }
  const Nc = (e = {}) => {
    const t = e.limit || 5,
      n = e.key || "cause";
    return {
      name: "LinkedErrors",
      preprocessEvent(e, r, o) {
        Oc(aa, o.getOptions().stackParser, n, t, e, r)
      }
    }
  };

  function Pc(e) {
    return [ii(), vi(), wc(), bc(), Tc(), Nc(), ei(), Rc(), Cc()]
  }

  function Fc(e = {}) {
    const t = !e.skipBrowserExtensionCheck && !! function() {
        if (void 0 === ho.window) return !1;
        const e = ho;
        if (e.nw) return !1;
        const t = e.chrome || e.browser;
        if (!t?.runtime?.id) return !1;
        const n = T();
        return !(ho === ho.top && ["chrome-extension", "moz-extension", "ms-browser-extension", "safari-web-extension"].some((e => n.startsWith(`${e}://`))))
      }() && (vc && O((() => {
        console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")
      })), !0),
      n = {
        ...e,
        enabled: !t && e.enabled,
        stackParser: (r = e.stackParser || Wa, Array.isArray(r) ? Fr(...r) : r),
        integrations: Ee({
          integrations: e.integrations,
          defaultIntegrations: null == e.defaultIntegrations ? Pc() : e.defaultIntegrations
        }),
        transport: e.transport || Ma
      };
    var r;
    return function(e, t) {
      !0 === t.debug && (c ? A.enable() : O((() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")
      }))), me().update(t.initialScope);
      const n = new e(t);
      return Qi(n), n.init(), n
    }(va, n)
  }

  function $c() {}

  function Bc(e) {
    e()
  }

  function Uc(e = {}) {
    const t = ho.document,
      n = t?.head || t?.body;
    if (!n) return void(vc && A.error("[showReportDialog] Global document not defined"));
    const r = me(),
      o = be(),
      s = o?.getDsn();
    if (!s) return void(vc && A.error("[showReportDialog] DSN not configured"));
    const i = {
        ...e,
        user: {
          ...r.getUser(),
          ...e.user
        },
        eventId: e.eventId || no()
      },
      a = ho.document.createElement("script");
    a.async = !0, a.crossOrigin = "anonymous", a.src = function(e, t) {
      const n = Hn(e);
      if (!n) return "";
      const r = `${Eo(n)}embed/error-page/`;
      let o = `dsn=${Bn(n)}`;
      for (const e in t)
        if ("dsn" !== e && "onClose" !== e)
          if ("user" === e) {
            const e = t.user;
            if (!e) continue;
            e.name && (o += `&name=${encodeURIComponent(e.name)}`), e.email && (o += `&email=${encodeURIComponent(e.email)}`)
          } else o += `&${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`;
      return `${r}?${o}`
    }(s, i);
    const {
      onLoad: c,
      onClose: u
    } = i;
    if (c && (a.onload = c), u) {
      const e = t => {
        if ("__sentry_reportdialog_closed__" === t.data) try {
          u()
        } finally {
          ho.removeEventListener("message", e)
        }
      };
      ho.addEventListener("message", e)
    }
    n.appendChild(a)
  }
  const jc = r, Hc = new WeakMap, zc = (e = {}) => {
    const t = e.types || ["crash", "deprecation", "intervention"];

    function n(e) {
      if (Hc.has(be()))
        for (const t of e) ye((e => {
          e.setExtra("url", t.url);
          const n = `ReportingObserver [${t.type}]`;
          let r = "No details available";
          if (t.body) {
            const n = {};
            for (const e in t.body) n[e] = t.body[e];
            if (e.setExtra("body", n), "crash" === t.type) {
              const e = t.body;
              r = [e.crashId || "", e.reason || ""].join(" ").trim() || r
            } else r = t.body.message || r
          }
          Jr(`${n}: ${r}`)
        }))
    }
    return {
      name: "ReportingObserver",
      setupOnce() {
        "ReportingObserver" in ba && new jc.ReportingObserver(n, {
          buffered: !0,
          types: t
        }).observe()
      },
      setup(e) {
        Hc.set(e, !0)
      }
    }
  };

  function qc(e, t) {
    const n = t?.getDsn(),
      r = t?.getOptions().tunnel;
    return function(e, t) {
      return !!t && e.includes(t.host)
    }(e, n) || function(e, t) {
      return !!t && Wc(e) === Wc(t)
    }(e, r)
  }

  function Wc(e) {
    return "/" === e[e.length - 1] ? e.slice(0, -1) : e
  }
  const Vc = (e = {}) => {
    const t = {
      failedRequestStatusCodes: [
        [500, 599]
      ],
      failedRequestTargets: [/.*/],
      ...e
    };
    return {
      name: "HttpClient",
      setup(e) {
        ! function(e, t) {
          wa() && Ja((n => {
            if (be() !== e) return;
            const {
              response: r,
              args: o,
              error: s,
              virtualError: i
            } = n, [a, c] = o;
            r && function(e, t, n, r, o) {
              if (Yc(e, n.status, n.url)) {
                const e = function(e, t) {
                  return !t && e instanceof Request || e instanceof Request && e.bodyUsed ? e : new Request(e, t)
                }(t, r);
                let s, i, a, c;
                Zc() && ([s, a] = Gc("Cookie", e), [i, c] = Gc("Set-Cookie", n)), Kr(Xc({
                  url: e.url,
                  method: e.method,
                  status: n.status,
                  requestHeaders: s,
                  responseHeaders: i,
                  requestCookies: a,
                  responseCookies: c,
                  error: o
                }))
              }
            }(t, a, r, c, s || i)
          }), !1)
        }(e, t),
        function(e, t) {
          "XMLHttpRequest" in r && fc((n => {
            if (be() !== e) return;
            const {
              error: r,
              virtualError: o
            } = n, s = n.xhr, i = s[hc];
            if (!i) return;
            const {
              method: a,
              request_headers: c
            } = i;
            try {
              ! function(e, t, n, r, o) {
                if (Yc(e, t.status, t.responseURL)) {
                  let e, s, i;
                  if (Zc()) {
                    try {
                      const e = t.getResponseHeader("Set-Cookie") || t.getResponseHeader("set-cookie") || void 0;
                      e && (s = Kc(e))
                    } catch {}
                    try {
                      i = function(e) {
                        const t = e.getAllResponseHeaders();
                        return t ? t.split("\r\n").reduce(((e, t) => {
                          const [n, r] = t.split(": ");
                          return n && r && (e[n] = r), e
                        }), {}) : {}
                      }(t)
                    } catch {}
                    e = r
                  }
                  Kr(Xc({
                    url: t.responseURL,
                    method: n,
                    status: t.status,
                    requestHeaders: e,
                    responseHeaders: i,
                    responseCookies: s,
                    error: o
                  }))
                }
              }(t, s, a, c, r || o)
            } catch (e) {
              vc && A.warn("Error while extracting response event form XHR response", e)
            }
          }))
        }(e, t)
      }
    }
  };

  function Gc(e, t) {
    const n = function(e) {
      const t = {};
      return e.forEach(((e, n) => {
        t[n] = e
      })), t
    }(t.headers);
    let r;
    try {
      const t = n[e] || n[e.toLowerCase()] || void 0;
      t && (r = Kc(t))
    } catch {}
    return [n, r]
  }

  function Jc(e) {
    if (e) {
      const t = e["Content-Length"] || e["content-length"];
      if (t) return parseInt(t, 10)
    }
  }

  function Kc(e) {
    return e.split("; ").reduce(((e, t) => {
      const [n, r] = t.split("=");
      return n && r && (e[n] = r), e
    }), {})
  }

  function Yc(e, t, n) {
    return function(e, t) {
      return e.some((e => "number" == typeof e ? e === t : t >= e[0] && t <= e[1]))
    }(e.failedRequestStatusCodes, t) && (r = e.failedRequestTargets, o = n, r.some((e => "string" == typeof e ? o.includes(e) : e.test(o)))) && !qc(n, be());
    var r, o
  }

  function Xc(e) {
    const t = be(),
      n = t && e.error && e.error instanceof Error ? e.error.stack : void 0,
      r = n && t ? t.getOptions().stackParser(n, 0, 1) : void 0,
      o = `HTTP Client Error with status code: ${e.status}`,
      s = {
        message: o,
        exception: {
          values: [{
            type: "Error",
            value: o,
            stacktrace: r ? {
              frames: r
            } : void 0
          }]
        },
        request: {
          url: e.url,
          method: e.method,
          headers: e.requestHeaders,
          cookies: e.requestCookies
        },
        contexts: {
          response: {
            status_code: e.status,
            headers: e.responseHeaders,
            cookies: e.responseCookies,
            body_size: Jc(e.responseHeaders)
          }
        }
      };
    return J(s, {
      type: "http.client",
      handled: !1
    }), s
  }

  function Zc() {
    const e = be();
    return !!e && Boolean(e.getOptions().sendDefaultPii)
  }
  const Qc = r, eu = (e = {}) => {
    const t = null != e.frameContextLines ? e.frameContextLines : 7;
    return {
      name: "ContextLines",
      processEvent: e => function(e, t) {
        const n = Qc.document,
          r = Qc.location && ic(Qc.location.href);
        if (!n || !r) return e;
        const o = e.exception?.values;
        if (!o?.length) return e;
        const s = n.documentElement.innerHTML;
        if (!s) return e;
        const i = ["<!DOCTYPE html>", "<html>", ...s.split("\n"), "</html>"];
        return o.forEach((e => {
          const n = e.stacktrace;
          n?.frames && (n.frames = n.frames.map((e => function(e, t, n, r) {
            return e.filename === n && e.lineno && t.length ? (function(e, t, n = 5) {
              if (void 0 === t.lineno) return;
              const r = e.length,
                o = Math.max(Math.min(r - 1, t.lineno - 1), 0);
              t.pre_context = e.slice(Math.max(0, o - n), o).map((e => D(e, 0)));
              const s = Math.min(r - 1, o);
              t.context_line = D(e[s], t.colno || 0), t.post_context = e.slice(Math.min(o + 1, r), o + 1 + n).map((e => D(e, 0)))
            }(t, e, r), e) : e
          }(e, i, r, t))))
        })), e
      }(e, t)
    }
  };

  function tu(e) {
    return new URLSearchParams(e).toString()
  }

  function nu(e, t = A) {
    try {
      if ("string" == typeof e) return [e];
      if (e instanceof URLSearchParams) return [e.toString()];
      if (e instanceof FormData) return [tu(e)];
      if (!e) return [void 0]
    } catch (n) {
      return ka && t.error(n, "Failed to serialize body", e), [void 0, "BODY_PARSE_ERROR"]
    }
    return ka && t.info("Skipping network body because of body type", e), [void 0, "UNPARSEABLE_BODY_TYPE"]
  }

  function ru(e = []) {
    if (2 === e.length && "object" == typeof e[1]) return e[1].body
  }

  function ou(e) {
    const {
      query: t,
      operationName: n
    } = e, {
      operationName: r = n,
      operationType: o
    } = function(e) {
      const t = e.match(/^(?:\s*)(query|mutation|subscription)(?:\s*)(\w+)(?:\s*)[{(]/);
      if (t) return {
        operationType: t[1],
        operationName: t[2]
      };
      const n = e.match(/^(?:\s*)(query|mutation|subscription)(?:\s*)[{(]/);
      return n ? {
        operationType: n[1],
        operationName: void 0
      } : {
        operationType: void 0,
        operationName: void 0
      }
    }(t);
    return r ? `${o} ${r}` : `${o}`
  }

  function su(e) {
    let t;
    if ("xhr" in e) {
      const n = e.xhr[hc];
      t = n && nu(n.body)[0]
    } else t = nu(ru(e.input))[0];
    return t
  }

  function iu(e) {
    let t;
    try {
      const n = JSON.parse(e);
      n.query && (t = n)
    } finally {
      return t
    }
  }
  const au = e => ({
    name: "GraphQLClient",
    setup(t) {
      ! function(e, t) {
        e.on("beforeOutgoingRequestSpan", ((e, n) => {
          const r = lr(e).data || {};
          if ("http.client" !== r[wn]) return;
          const o = r["url.full"] || r["http.url"],
            s = r["http.request.method"] || r["http.method"];
          if (!f(o) || !f(s)) return;
          const {
            endpoints: i
          } = t, a = P(o, i), c = su(n);
          if (a && c) {
            const t = iu(c);
            if (t) {
              const n = ou(t);
              e.updateName(`${s} ${o} (${n})`), e.setAttribute("graphql.document", c)
            }
          }
        }))
      }(t, e),
      function(e, t) {
        e.on("beforeOutgoingRequestBreadcrumb", ((e, n) => {
          const {
            category: r,
            type: o,
            data: s
          } = e;
          if ("http" === o && ("fetch" === r || "xhr" === r)) {
            const e = s?.url,
              {
                endpoints: r
              } = t,
              o = P(e, r),
              i = su(n);
            if (o && s && i) {
              const e = iu(i);
              if (!s.graphql && e) {
                const t = ou(e);
                s["graphql.document"] = e.query, s["graphql.operation"] = t
              }
            }
          }
        }))
      }(t, e)
    }
  }), cu = (e, t, n, r) => {
    let o, s;
    return i => {
      t.value >= 0 && (i || r) && (s = t.value - (o ?? 0), (s || void 0 === o) && (o = t.value, t.delta = s, t.rating = ((e, t) => e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good")(t.value, n), e(t)))
    }
  }, uu = (e = !0) => {
    const t = Ea.performance?.getEntriesByType?.("navigation")[0];
    if (!e || t && t.responseStart > 0 && t.responseStart < performance.now()) return t
  }, lu = () => {
    const e = uu();
    return e?.activationStart ?? 0
  }, du = (e, t = -1) => {
    const n = uu();
    let r = "navigate";
    return n && (Ea.document?.prerendering || lu() > 0 ? r = "prerender" : Ea.document?.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
      name: e,
      value: t,
      rating: "good",
      delta: 0,
      entries: [],
      id: `v5-${Date.now()}-${Math.floor(8999999999999*Math.random())+1e12}`,
      navigationType: r
    }
  }, pu = new WeakMap;

  function hu(e, t) {
    return pu.get(e) || pu.set(e, new t), pu.get(e)
  }
  class fu {
    constructor() {
      fu.prototype.__init.call(this), fu.prototype.__init2.call(this)
    }
    __init() {
      this._sessionValue = 0
    }
    __init2() {
      this._sessionEntries = []
    }
    _processEntry(e) {
      if (e.hadRecentInput) return;
      const t = this._sessionEntries[0],
        n = this._sessionEntries[this._sessionEntries.length - 1];
      this._sessionValue && t && n && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (this._sessionValue += e.value, this._sessionEntries.push(e)) : (this._sessionValue = e.value, this._sessionEntries = [e]), this._onAfterProcessingUnexpectedShift?.(e)
    }
  }
  const mu = (e, t, n = {}) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        const r = new PerformanceObserver((e => {
          Promise.resolve().then((() => {
            t(e.getEntries())
          }))
        }));
        return r.observe({
          type: e,
          buffered: !0,
          ...n
        }), r
      }
    } catch {}
  }, gu = e => {
    let t = !1;
    return () => {
      t || (e(), t = !0)
    }
  };
  let _u = -1;
  const yu = e => {
    "hidden" === Ea.document.visibilityState && _u > -1 && (_u = "visibilitychange" === e.type ? e.timeStamp : 0, vu())
  }, vu = () => {
    removeEventListener("visibilitychange", yu, !0), removeEventListener("prerenderingchange", yu, !0)
  }, bu = () => {
    if (Ea.document && _u < 0) {
      const e = lu(),
        t = Ea.document.prerendering ? void 0 : globalThis.performance.getEntriesByType("visibility-state").filter((t => "hidden" === t.name && t.startTime > e))[0]?.startTime;
      _u = t ?? ("hidden" !== Ea.document?.visibilityState || Ea.document?.prerendering ? 1 / 0 : 0), addEventListener("visibilitychange", yu, !0), addEventListener("prerenderingchange", yu, !0)
    }
    return {
      get firstHiddenTime() {
        return _u
      }
    }
  }, Su = e => {
    Ea.document?.prerendering ? addEventListener("prerenderingchange", (() => e()), !0) : e()
  }, wu = [1800, 3e3], ku = [.1, .25], Eu = e => {
    const t = t => {
      "pagehide" !== t.type && "hidden" !== Ea.document?.visibilityState || e(t)
    };
    Ea.document && (addEventListener("visibilitychange", t, !0), addEventListener("pagehide", t, !0))
  }, xu = [100, 300];
  let Cu = 0, Tu = 1 / 0, Iu = 0;
  const Mu = e => {
    e.forEach((e => {
      e.interactionId && (Tu = Math.min(Tu, e.interactionId), Iu = Math.max(Iu, e.interactionId), Cu = Iu ? (Iu - Tu) / 7 + 1 : 0)
    }))
  };
  let Ru;
  const Ou = () => Ru ? Cu : performance.interactionCount || 0, Au = () => {
    "interactionCount" in performance || Ru || (Ru = mu("event", Mu, {
      type: "event",
      buffered: !0,
      durationThreshold: 0
    }))
  };
  let Lu = 0; class Du {
    constructor() {
      Du.prototype.__init.call(this), Du.prototype.__init2.call(this)
    }
    __init() {
      this._longestInteractionList = []
    }
    __init2() {
      this._longestInteractionMap = new Map
    }
    _resetInteractions() {
      Lu = Ou(), this._longestInteractionList.length = 0, this._longestInteractionMap.clear()
    }
    _estimateP98LongestInteraction() {
      const e = Math.min(this._longestInteractionList.length - 1, Math.floor((Ou() - Lu) / 50));
      return this._longestInteractionList[e]
    }
    _processEntry(e) {
      if (this._onBeforeProcessingEntry?.(e), !e.interactionId && "first-input" !== e.entryType) return;
      const t = this._longestInteractionList.at(-1);
      let n = this._longestInteractionMap.get(e.interactionId);
      if (n || this._longestInteractionList.length < 10 || e.duration > t._latency) {
        if (n ? e.duration > n._latency ? (n.entries = [e], n._latency = e.duration) : e.duration === n._latency && e.startTime === n.entries[0].startTime && n.entries.push(e) : (n = {
            id: e.interactionId,
            entries: [e],
            _latency: e.duration
          }, this._longestInteractionMap.set(n.id, n), this._longestInteractionList.push(n)), this._longestInteractionList.sort(((e, t) => t._latency - e._latency)), this._longestInteractionList.length > 10) {
          const e = this._longestInteractionList.splice(10);
          for (const t of e) this._longestInteractionMap.delete(t.id)
        }
        this._onAfterProcessingINPCandidate?.(n)
      }
    }
  }
  const Nu = e => {
    const t = Ea.requestIdleCallback || Ea.setTimeout;
    "hidden" === Ea.document?.visibilityState ? e() : (t(e = gu(e)), Eu(e))
  }, Pu = [200, 500]; class Fu {
    _processEntry(e) {
      this._onBeforeProcessingEntry?.(e)
    }
  }
  const $u = [2500, 4e3], Bu = [800, 1800], Uu = e => {
    Ea.document?.prerendering ? Su((() => Uu(e))) : "complete" !== Ea.document?.readyState ? addEventListener("load", (() => Uu(e)), !0) : setTimeout(e)
  }, ju = {}, Hu = {};
  let zu, qu, Wu, Vu, Gu;

  function Ju(e, t = !1) {
    return sl("cls", e, el, zu, t)
  }

  function Ku(e, t = !1) {
    return sl("lcp", e, nl, Wu, t)
  }

  function Yu(e) {
    return sl("fid", e, tl, qu)
  }

  function Xu(e) {
    return sl("inp", e, ol, Gu)
  }

  function Zu(e, t) {
    return il(e, t), Hu[e] || (function(e) {
      const t = {};
      "event" === e && (t.durationThreshold = 0), mu(e, (t => {
        Qu(e, {
          entries: t
        })
      }), t)
    }(e), Hu[e] = !0), al(e, t)
  }

  function Qu(e, t) {
    const n = ju[e];
    if (n?.length)
      for (const r of n) try {
        r(t)
      } catch (t) {
        ka && A.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${Ur(r)}\nError:`, t)
      }
  }

  function el() {
    return ((e, t = {}) => {
      ((e, t = {}) => {
        Su((() => {
          const n = bu(),
            r = du("FCP");
          let o;
          const s = mu("paint", (e => {
            for (const t of e) "first-contentful-paint" === t.name && (s.disconnect(), t.startTime < n.firstHiddenTime && (r.value = Math.max(t.startTime - lu(), 0), r.entries.push(t), o(!0)))
          }));
          s && (o = cu(e, r, wu, t.reportAllChanges))
        }))
      })(gu((() => {
        const n = du("CLS", 0);
        let r;
        const o = hu(t, fu),
          s = e => {
            for (const t of e) o._processEntry(t);
            o._sessionValue > n.value && (n.value = o._sessionValue, n.entries = o._sessionEntries, r())
          },
          i = mu("layout-shift", s);
        i && (r = cu(e, n, ku, t.reportAllChanges), Ea.document?.addEventListener("visibilitychange", (() => {
          "hidden" === Ea.document?.visibilityState && (s(i.takeRecords()), r(!0))
        })), Ea?.setTimeout?.(r))
      })))
    })((e => {
      Qu("cls", {
        metric: e
      }), zu = e
    }), {
      reportAllChanges: !0
    })
  }

  function tl() {
    return ((e, t = {}) => {
      Su((() => {
        const n = bu(),
          r = du("FID");
        let o;
        const s = e => {
            e.startTime < n.firstHiddenTime && (r.value = e.processingStart - e.startTime, r.entries.push(e), o(!0))
          },
          i = e => {
            e.forEach(s)
          },
          a = mu("first-input", i);
        o = cu(e, r, xu, t.reportAllChanges), a && Eu(gu((() => {
          i(a.takeRecords()), a.disconnect()
        })))
      }))
    })((e => {
      Qu("fid", {
        metric: e
      }), qu = e
    }))
  }

  function nl() {
    return ((e, t = {}) => {
      Su((() => {
        const n = bu(),
          r = du("LCP");
        let o;
        const s = hu(t, Fu),
          i = e => {
            t.reportAllChanges || (e = e.slice(-1));
            for (const t of e) s._processEntry(t), t.startTime < n.firstHiddenTime && (r.value = Math.max(t.startTime - lu(), 0), r.entries = [t], o())
          },
          a = mu("largest-contentful-paint", i);
        if (a) {
          o = cu(e, r, $u, t.reportAllChanges);
          const n = gu((() => {
            i(a.takeRecords()), a.disconnect(), o(!0)
          }));
          for (const e of ["keydown", "click", "visibilitychange"]) Ea.document && addEventListener(e, (() => Nu(n)), {
            capture: !0,
            once: !0
          })
        }
      }))
    })((e => {
      Qu("lcp", {
        metric: e
      }), Wu = e
    }), {
      reportAllChanges: !0
    })
  }

  function rl() {
    return ((e, t = {}) => {
      const n = du("TTFB"),
        r = cu(e, n, Bu, t.reportAllChanges);
      Uu((() => {
        const e = uu();
        e && (n.value = Math.max(e.responseStart - lu(), 0), n.entries = [e], r(!0))
      }))
    })((e => {
      Qu("ttfb", {
        metric: e
      }), Vu = e
    }))
  }

  function ol() {
    return ((e, t = {}) => {
      globalThis.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype && Su((() => {
        Au();
        const n = du("INP");
        let r;
        const o = hu(t, Du),
          s = e => {
            Nu((() => {
              for (const t of e) o._processEntry(t);
              const t = o._estimateP98LongestInteraction();
              t && t._latency !== n.value && (n.value = t._latency, n.entries = t.entries, r())
            }))
          },
          i = mu("event", s, {
            durationThreshold: t.durationThreshold ?? 40
          });
        r = cu(e, n, Pu, t.reportAllChanges), i && (i.observe({
          type: "first-input",
          buffered: !0
        }), Eu((() => {
          s(i.takeRecords()), r(!0)
        })))
      }))
    })((e => {
      Qu("inp", {
        metric: e
      }), Gu = e
    }))
  }

  function sl(e, t, n, r, o = !1) {
    let s;
    return il(e, t), Hu[e] || (s = n(), Hu[e] = !0), r && t({
      metric: r
    }), al(e, t, o ? s : void 0)
  }

  function il(e, t) {
    ju[e] = ju[e] || [], ju[e].push(t)
  }

  function al(e, t, n) {
    return () => {
      n && n();
      const r = ju[e];
      if (!r) return;
      const o = r.indexOf(t); - 1 !== o && r.splice(o, 1)
    }
  }
  const cl = r, ul = "sentryReplaySession", ll = "Unable to send Replay", dl = 15e4, pl = 5e3, hl = 2e7;
  var fl = Object.defineProperty, ml = (e, t, n) => ((e, t, n) => t in e ? fl(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n), gl = (e => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(gl || {});

  function _l(e) {
    const t = e?.host;
    return Boolean(t?.shadowRoot === e)
  }

  function yl(e) {
    return "[object ShadowRoot]" === Object.prototype.toString.call(e)
  }

  function vl(e) {
    try {
      const n = e.rules || e.cssRules;
      return n ? ((t = Array.from(n, bl).join("")).includes(" background-clip: text;") && !t.includes(" -webkit-background-clip: text;") && (t = t.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")), t) : null
    } catch (e) {
      return null
    }
    var t
  }

  function bl(e) {
    let t;
    if (function(e) {
        return "styleSheet" in e
      }(e)) try {
      t = vl(e.styleSheet) || function(e) {
        const {
          cssText: t
        } = e;
        if (t.split('"').length < 3) return t;
        const n = ["@import", `url(${JSON.stringify(e.href)})`];
        return "" === e.layerName ? n.push("layer") : e.layerName && n.push(`layer(${e.layerName})`), e.supportsText && n.push(`supports(${e.supportsText})`), e.media.length && n.push(e.media.mediaText), n.join(" ") + ";"
      }(e)
    } catch (e) {} else if (function(e) {
        return "selectorText" in e
      }(e)) {
      let t = e.cssText;
      const n = e.selectorText.includes(":"),
        r = "string" == typeof e.style.all && e.style.all;
      if (r && (t = function(e) {
          let t = "";
          for (let n = 0; n < e.style.length; n++) {
            const r = e.style,
              o = r[n],
              s = r.getPropertyPriority(o);
            t += `${o}:${r.getPropertyValue(o)}${s?" !important":""};`
          }
          return `${e.selectorText} { ${t} }`
        }(e)), n && (t = t.replace(/(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, "$1\\$2")), n || r) return t
    } return t || e.cssText
  }
  class Sl {
    constructor() {
      ml(this, "idNodeMap", new Map), ml(this, "nodeMetaMap", new WeakMap)
    }
    getId(e) {
      if (!e) return -1;
      const t = this.getMeta(e)?.id;
      return t ?? -1
    }
    getNode(e) {
      return this.idNodeMap.get(e) || null
    }
    getIds() {
      return Array.from(this.idNodeMap.keys())
    }
    getMeta(e) {
      return this.nodeMetaMap.get(e) || null
    }
    removeNodeFromMap(e) {
      const t = this.getId(e);
      this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e => this.removeNodeFromMap(e)))
    }
    has(e) {
      return this.idNodeMap.has(e)
    }
    hasNode(e) {
      return this.nodeMetaMap.has(e)
    }
    add(e, t) {
      const n = t.id;
      this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t)
    }
    replace(e, t) {
      const n = this.getNode(e);
      if (n) {
        const e = this.nodeMetaMap.get(n);
        e && this.nodeMetaMap.set(t, e)
      }
      this.idNodeMap.set(e, t)
    }
    reset() {
      this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
    }
  }

  function wl({
    maskInputOptions: e,
    tagName: t,
    type: n
  }) {
    return "OPTION" === t && (t = "SELECT"), Boolean(e[t.toLowerCase()] || n && e[n] || "password" === n || "INPUT" === t && !n && e.text)
  }

  function kl({
    isMasked: e,
    element: t,
    value: n,
    maskInputFn: r
  }) {
    let o = n || "";
    return e ? (r && (o = r(o, t)), "*".repeat(o.length)) : o
  }

  function El(e) {
    return e.toLowerCase()
  }

  function xl(e) {
    return e.toUpperCase()
  }
  const Cl = "__rrweb_original__";

  function Tl(e) {
    const t = e.type;
    return e.hasAttribute("data-rr-is-password") ? "password" : t ? El(t) : null
  }

  function Il(e, t, n) {
    return "INPUT" !== t || "radio" !== n && "checkbox" !== n ? e.value : e.getAttribute("value") || ""
  }

  function Ml(e, t) {
    let n;
    try {
      n = new URL(e, t ?? window.location.href)
    } catch (e) {
      return null
    }
    const r = n.pathname.match(/\.([0-9a-z]+)(?:$)/i);
    return r?.[1] ?? null
  }
  const Rl = {};

  function Ol(e) {
    const t = Rl[e];
    if (t) return t;
    const n = window.document;
    let r = window[e];
    if (n && "function" == typeof n.createElement) try {
      const t = n.createElement("iframe");
      t.hidden = !0, n.head.appendChild(t);
      const o = t.contentWindow;
      o && o[e] && (r = o[e]), n.head.removeChild(t)
    } catch (e) {}
    return Rl[e] = r.bind(window)
  }

  function Al(...e) {
    return Ol("setTimeout")(...e)
  }

  function Ll(...e) {
    return Ol("clearTimeout")(...e)
  }

  function Dl(e) {
    try {
      return e.contentDocument
    } catch (e) {}
  }
  let Nl = 1;
  const Pl = new RegExp("[^a-z0-9-_:]");

  function Fl() {
    return Nl++
  }
  let $l, Bl;
  const Ul = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, jl = /^(?:[a-z+]+:)?\/\//i, Hl = /^www\..*/i, zl = /^(data:)([^,]*),(.*)/i;

  function ql(e, t) {
    return (e || "").replace(Ul, ((e, n, r, o, s, i) => {
      const a = r || s || i,
        c = n || o || "";
      if (!a) return e;
      if (jl.test(a) || Hl.test(a)) return `url(${c}${a}${c})`;
      if (zl.test(a)) return `url(${c}${a}${c})`;
      if ("/" === a[0]) return `url(${c}${function(e){let t="";return t=e.indexOf("//")>-1?e.split("/").slice(0,3).join("/"):e.split("/")[0],t=t.split("?")[0],t}(t)+a}${c})`;
      const u = t.split("/"),
        l = a.split("/");
      u.pop();
      for (const e of l) "." !== e && (".." === e ? u.pop() : u.push(e));
      return `url(${c}${u.join("/")}${c})`
    }))
  }
  const Wl = /^[^ \t\n\r\u000c]+/, Vl = /^[, \t\n\r\u000c]+/, Gl = new WeakMap;

  function Jl(e, t) {
    return t && "" !== t.trim() ? Kl(e, t) : t
  }

  function Kl(e, t) {
    let n = Gl.get(e);
    if (n || (n = e.createElement("a"), Gl.set(e, n)), t) {
      if (t.startsWith("blob:") || t.startsWith("data:")) return t
    } else t = "";
    return n.setAttribute("href", t), n.href
  }

  function Yl(e, t, n, r, o, s) {
    return r ? "src" === n || "href" === n && ("use" !== t || "#" !== r[0]) || "xlink:href" === n && "#" !== r[0] ? Jl(e, r) : "background" !== n || "table" !== t && "td" !== t && "th" !== t ? "srcset" === n ? function(e, t) {
      if ("" === t.trim()) return t;
      let n = 0;

      function r(e) {
        let r;
        const o = e.exec(t.substring(n));
        return o ? (r = o[0], n += r.length, r) : ""
      }
      const o = [];
      for (; r(Vl), !(n >= t.length);) {
        let s = r(Wl);
        if ("," === s.slice(-1)) s = Jl(e, s.substring(0, s.length - 1)), o.push(s);
        else {
          let r = "";
          s = Jl(e, s);
          let i = !1;
          for (;;) {
            const e = t.charAt(n);
            if ("" === e) {
              o.push((s + r).trim());
              break
            }
            if (i) ")" === e && (i = !1);
            else {
              if ("," === e) {
                n += 1, o.push((s + r).trim());
                break
              }
              "(" === e && (i = !0)
            }
            r += e, n += 1
          }
        }
      }
      return o.join(", ")
    }(e, r) : "style" === n ? ql(r, Kl(e)) : "object" === t && "data" === n ? Jl(e, r) : "function" == typeof s ? s(n, r, o) : r : Jl(e, r) : r
  }

  function Xl(e, t, n) {
    return ("video" === e || "audio" === e) && "autoplay" === t
  }

  function Zl(e, t, n, r) {
    try {
      if (r && e.matches(r)) return !1;
      if ("string" == typeof t) {
        if (e.classList.contains(t)) return !0
      } else
        for (let n = e.classList.length; n--;) {
          const r = e.classList[n];
          if (t.test(r)) return !0
        }
      if (n) return e.matches(n)
    } catch (e) {}
    return !1
  }

  function Ql(e, t, n = 1 / 0, r = 0) {
    return e ? e.nodeType !== e.ELEMENT_NODE || r > n ? -1 : t(e) ? r : Ql(e.parentNode, t, n, r + 1) : -1
  }

  function ed(e, t) {
    return n => {
      const r = n;
      if (null === r) return !1;
      try {
        if (e)
          if ("string" == typeof e) {
            if (r.matches(`.${e}`)) return !0
          } else if (function(e, t) {
            for (let n = e.classList.length; n--;) {
              const r = e.classList[n];
              if (t.test(r)) return !0
            }
            return !1
          }(r, e)) return !0;
        return !(!t || !r.matches(t))
      } catch {
        return !1
      }
    }
  }

  function td(e, t, n, r, o, s) {
    try {
      const i = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
      if (null === i) return !1;
      if ("INPUT" === i.tagName) {
        const e = i.getAttribute("autocomplete");
        if (["current-password", "new-password", "cc-number", "cc-exp", "cc-exp-month", "cc-exp-year", "cc-csc"].includes(e)) return !0
      }
      let a = -1,
        c = -1;
      if (s) {
        if (c = Ql(i, ed(r, o)), c < 0) return !0;
        a = Ql(i, ed(t, n), c >= 0 ? c : 1 / 0)
      } else {
        if (a = Ql(i, ed(t, n)), a < 0) return !1;
        c = Ql(i, ed(r, o), a >= 0 ? a : 1 / 0)
      }
      return a >= 0 ? !(c >= 0) || a <= c : !(c >= 0 || !s)
    } catch (e) {}
    return !!s
  }

  function nd(e) {
    return null == e ? "" : e.toLowerCase()
  }

  function rd(e, t) {
    const {
      doc: n,
      mirror: r,
      blockClass: o,
      blockSelector: s,
      unblockSelector: i,
      maskAllText: a,
      maskTextClass: c,
      unmaskTextClass: u,
      maskTextSelector: l,
      unmaskTextSelector: d,
      skipChild: p = !1,
      inlineStylesheet: h = !0,
      maskInputOptions: f = {},
      maskAttributeFn: m,
      maskTextFn: g,
      maskInputFn: _,
      slimDOMOptions: y,
      dataURLOptions: v = {},
      inlineImages: b = !1,
      recordCanvas: S = !1,
      onSerialize: w,
      onIframeLoad: k,
      iframeLoadTimeout: E = 5e3,
      onStylesheetLoad: x,
      stylesheetLoadTimeout: C = 5e3,
      keepIframeSrcFn: T = () => !1,
      newlyAddedElement: I = !1
    } = t;
    let {
      preserveWhiteSpace: M = !0
    } = t;
    const R = function(e, t) {
      const {
        doc: n,
        mirror: r,
        blockClass: o,
        blockSelector: s,
        unblockSelector: i,
        maskAllText: a,
        maskAttributeFn: c,
        maskTextClass: u,
        unmaskTextClass: l,
        maskTextSelector: d,
        unmaskTextSelector: p,
        inlineStylesheet: h,
        maskInputOptions: f = {},
        maskTextFn: m,
        maskInputFn: g,
        dataURLOptions: _ = {},
        inlineImages: y,
        recordCanvas: v,
        keepIframeSrcFn: b,
        newlyAddedElement: S = !1
      } = t, w = function(e, t) {
        if (!t.hasNode(e)) return;
        const n = t.getId(e);
        return 1 === n ? void 0 : n
      }(n, r);
      switch (e.nodeType) {
        case e.DOCUMENT_NODE:
          return "CSS1Compat" !== e.compatMode ? {
            type: gl.Document,
            childNodes: [],
            compatMode: e.compatMode
          } : {
            type: gl.Document,
            childNodes: []
          };
        case e.DOCUMENT_TYPE_NODE:
          return {
            type: gl.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: w
          };
        case e.ELEMENT_NODE:
          return function(e, t) {
            const {
              doc: n,
              blockClass: r,
              blockSelector: o,
              unblockSelector: s,
              inlineStylesheet: i,
              maskInputOptions: a = {},
              maskAttributeFn: c,
              maskInputFn: u,
              dataURLOptions: l = {},
              inlineImages: d,
              recordCanvas: p,
              keepIframeSrcFn: h,
              newlyAddedElement: f = !1,
              rootId: m,
              maskTextClass: g,
              unmaskTextClass: _,
              maskTextSelector: y,
              unmaskTextSelector: v
            } = t, b = Zl(e, r, o, s), S = function(e) {
              if (e instanceof HTMLFormElement) return "form";
              const t = El(e.tagName);
              return Pl.test(t) ? "div" : t
            }(e);
            let w = {};
            const k = e.attributes.length;
            for (let t = 0; t < k; t++) {
              const r = e.attributes[t];
              r.name && !Xl(S, r.name, r.value) && (w[r.name] = Yl(n, S, El(r.name), r.value, e, c))
            }
            if ("link" === S && i) {
              const t = Array.from(n.styleSheets).find((t => t.href === e.href));
              let r = null;
              t && (r = vl(t)), r && (w.rel = null, w.href = null, w.crossorigin = null, w._cssText = ql(r, t.href))
            }
            if ("style" === S && e.sheet && !(e.innerText || e.textContent || "").trim().length) {
              const t = vl(e.sheet);
              t && (w._cssText = ql(t, Kl(n)))
            }
            if ("input" === S || "textarea" === S || "select" === S || "option" === S) {
              const t = e,
                n = Tl(t),
                r = Il(t, xl(S), n),
                o = t.checked;
              if ("submit" !== n && "button" !== n && r) {
                const e = td(t, g, y, _, v, wl({
                  type: n,
                  tagName: xl(S),
                  maskInputOptions: a
                }));
                w.value = kl({
                  isMasked: e,
                  element: t,
                  value: r,
                  maskInputFn: u
                })
              }
              o && (w.checked = o)
            }
            if ("option" === S && (e.selected && !a.select ? w.selected = !0 : delete w.selected), "canvas" === S && p)
              if ("2d" === e.__context)(function(e) {
                const t = e.getContext("2d");
                if (!t) return !0;
                for (let n = 0; n < e.width; n += 50)
                  for (let r = 0; r < e.height; r += 50) {
                    const o = t.getImageData,
                      s = Cl in o ? o[Cl] : o;
                    if (new Uint32Array(s.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some((e => 0 !== e))) return !1
                  }
                return !0
              })(e) || (w.rr_dataURL = e.toDataURL(l.type, l.quality));
              else if (!("__context" in e)) {
              const t = e.toDataURL(l.type, l.quality),
                r = n.createElement("canvas");
              r.width = e.width, r.height = e.height, t !== r.toDataURL(l.type, l.quality) && (w.rr_dataURL = t)
            }
            if ("img" === S && d) {
              $l || ($l = n.createElement("canvas"), Bl = $l.getContext("2d"));
              const t = e,
                r = t.currentSrc || t.getAttribute("src") || "<unknown-src>",
                o = t.crossOrigin,
                s = () => {
                  t.removeEventListener("load", s);
                  try {
                    $l.width = t.naturalWidth, $l.height = t.naturalHeight, Bl.drawImage(t, 0, 0), w.rr_dataURL = $l.toDataURL(l.type, l.quality)
                  } catch (e) {
                    if ("anonymous" !== t.crossOrigin) return t.crossOrigin = "anonymous", void(t.complete && 0 !== t.naturalWidth ? s() : t.addEventListener("load", s));
                    console.warn(`Cannot inline img src=${r}! Error: ${e}`)
                  }
                  "anonymous" === t.crossOrigin && (o ? w.crossOrigin = o : t.removeAttribute("crossorigin"))
                };
              t.complete && 0 !== t.naturalWidth ? s() : t.addEventListener("load", s)
            }
            if ("audio" !== S && "video" !== S || (w.rr_mediaState = e.paused ? "paused" : "played", w.rr_mediaCurrentTime = e.currentTime), f || (e.scrollLeft && (w.rr_scrollLeft = e.scrollLeft), e.scrollTop && (w.rr_scrollTop = e.scrollTop)), b) {
              const {
                width: t,
                height: n
              } = e.getBoundingClientRect();
              w = {
                class: w.class,
                rr_width: `${t}px`,
                rr_height: `${n}px`
              }
            }
            let E;
            "iframe" !== S || h(w.src) || (b || Dl(e) || (w.rr_src = w.src), delete w.src);
            try {
              customElements.get(S) && (E = !0)
            } catch (e) {}
            return {
              type: gl.Element,
              tagName: S,
              attributes: w,
              childNodes: [],
              isSVG: (x = e, Boolean("svg" === x.tagName || x.ownerSVGElement) || void 0),
              needBlock: b,
              rootId: m,
              isCustom: E
            };
            var x
          }(e, {
            doc: n,
            blockClass: o,
            blockSelector: s,
            unblockSelector: i,
            inlineStylesheet: h,
            maskAttributeFn: c,
            maskInputOptions: f,
            maskInputFn: g,
            dataURLOptions: _,
            inlineImages: y,
            recordCanvas: v,
            keepIframeSrcFn: b,
            newlyAddedElement: S,
            rootId: w,
            maskTextClass: u,
            unmaskTextClass: l,
            maskTextSelector: d,
            unmaskTextSelector: p
          });
        case e.TEXT_NODE:
          return function(e, t) {
            const {
              maskAllText: n,
              maskTextClass: r,
              unmaskTextClass: o,
              maskTextSelector: s,
              unmaskTextSelector: i,
              maskTextFn: a,
              maskInputOptions: c,
              maskInputFn: u,
              rootId: l
            } = t, d = e.parentNode && e.parentNode.tagName;
            let p = e.textContent;
            const h = "STYLE" === d || void 0,
              f = "SCRIPT" === d || void 0,
              m = "TEXTAREA" === d || void 0;
            if (h && p) {
              try {
                e.nextSibling || e.previousSibling || e.parentNode.sheet?.cssRules && (p = vl(e.parentNode.sheet))
              } catch (t) {
                console.warn(`Cannot get CSS styles from text's parentNode. Error: ${t}`, e)
              }
              p = ql(p, Kl(t.doc))
            }
            f && (p = "SCRIPT_PLACEHOLDER");
            const g = td(e, r, s, o, i, n);
            return h || f || m || !p || !g || (p = a ? a(p, e.parentElement) : p.replace(/[\S]/g, "*")), m && p && (c.textarea || g) && (p = u ? u(p, e.parentNode) : p.replace(/[\S]/g, "*")), "OPTION" === d && p && (p = kl({
              isMasked: td(e, r, s, o, i, wl({
                type: null,
                tagName: d,
                maskInputOptions: c
              })),
              element: e,
              value: p,
              maskInputFn: u
            })), {
              type: gl.Text,
              textContent: p || "",
              isStyle: h,
              rootId: l
            }
          }(e, {
            doc: n,
            maskAllText: a,
            maskTextClass: u,
            unmaskTextClass: l,
            maskTextSelector: d,
            unmaskTextSelector: p,
            maskTextFn: m,
            maskInputOptions: f,
            maskInputFn: g,
            rootId: w
          });
        case e.CDATA_SECTION_NODE:
          return {
            type: gl.CDATA, textContent: "", rootId: w
          };
        case e.COMMENT_NODE:
          return {
            type: gl.Comment, textContent: e.textContent || "", rootId: w
          };
        default:
          return !1
      }
    }(e, {
      doc: n,
      mirror: r,
      blockClass: o,
      blockSelector: s,
      maskAllText: a,
      unblockSelector: i,
      maskTextClass: c,
      unmaskTextClass: u,
      maskTextSelector: l,
      unmaskTextSelector: d,
      inlineStylesheet: h,
      maskInputOptions: f,
      maskAttributeFn: m,
      maskTextFn: g,
      maskInputFn: _,
      dataURLOptions: v,
      inlineImages: b,
      recordCanvas: S,
      keepIframeSrcFn: T,
      newlyAddedElement: I
    });
    if (!R) return console.warn(e, "not serialized"), null;
    let O;
    O = r.hasNode(e) ? r.getId(e) : ! function(e, t) {
      if (t.comment && e.type === gl.Comment) return !0;
      if (e.type === gl.Element) {
        if (t.script && ("script" === e.tagName || "link" === e.tagName && ("preload" === e.attributes.rel || "modulepreload" === e.attributes.rel) || "link" === e.tagName && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && "js" === Ml(e.attributes.href))) return !0;
        if (t.headFavicon && ("link" === e.tagName && "shortcut icon" === e.attributes.rel || "meta" === e.tagName && (nd(e.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === nd(e.attributes.name) || "icon" === nd(e.attributes.rel) || "apple-touch-icon" === nd(e.attributes.rel) || "shortcut icon" === nd(e.attributes.rel)))) return !0;
        if ("meta" === e.tagName) {
          if (t.headMetaDescKeywords && nd(e.attributes.name).match(/^description|keywords$/)) return !0;
          if (t.headMetaSocial && (nd(e.attributes.property).match(/^(og|twitter|fb):/) || nd(e.attributes.name).match(/^(og|twitter):/) || "pinterest" === nd(e.attributes.name))) return !0;
          if (t.headMetaRobots && ("robots" === nd(e.attributes.name) || "googlebot" === nd(e.attributes.name) || "bingbot" === nd(e.attributes.name))) return !0;
          if (t.headMetaHttpEquiv && void 0 !== e.attributes["http-equiv"]) return !0;
          if (t.headMetaAuthorship && ("author" === nd(e.attributes.name) || "generator" === nd(e.attributes.name) || "framework" === nd(e.attributes.name) || "publisher" === nd(e.attributes.name) || "progid" === nd(e.attributes.name) || nd(e.attributes.property).match(/^article:/) || nd(e.attributes.property).match(/^product:/))) return !0;
          if (t.headMetaVerification && ("google-site-verification" === nd(e.attributes.name) || "yandex-verification" === nd(e.attributes.name) || "csrf-token" === nd(e.attributes.name) || "p:domain_verify" === nd(e.attributes.name) || "verify-v1" === nd(e.attributes.name) || "verification" === nd(e.attributes.name) || "shopify-checkout-api-token" === nd(e.attributes.name))) return !0
        }
      }
      return !1
    }(R, y) && (M || R.type !== gl.Text || R.isStyle || R.textContent.replace(/^\s+|\s+$/gm, "").length) ? Fl() : -2;
    const A = Object.assign(R, {
      id: O
    });
    if (r.add(e, A), -2 === O) return null;
    w && w(e);
    let L = !p;
    if (A.type === gl.Element) {
      L = L && !A.needBlock, delete A.needBlock;
      const t = e.shadowRoot;
      t && yl(t) && (A.isShadowHost = !0)
    }
    if ((A.type === gl.Document || A.type === gl.Element) && L) {
      y.headWhitespace && A.type === gl.Element && "head" === A.tagName && (M = !1);
      const t = {
        doc: n,
        mirror: r,
        blockClass: o,
        blockSelector: s,
        maskAllText: a,
        unblockSelector: i,
        maskTextClass: c,
        unmaskTextClass: u,
        maskTextSelector: l,
        unmaskTextSelector: d,
        skipChild: p,
        inlineStylesheet: h,
        maskInputOptions: f,
        maskAttributeFn: m,
        maskTextFn: g,
        maskInputFn: _,
        slimDOMOptions: y,
        dataURLOptions: v,
        inlineImages: b,
        recordCanvas: S,
        preserveWhiteSpace: M,
        onSerialize: w,
        onIframeLoad: k,
        iframeLoadTimeout: E,
        onStylesheetLoad: x,
        stylesheetLoadTimeout: C,
        keepIframeSrcFn: T
      };
      for (const n of Array.from(e.childNodes)) {
        const e = rd(n, t);
        e && A.childNodes.push(e)
      }
      if (function(e) {
          return e.nodeType === e.ELEMENT_NODE
        }(e) && e.shadowRoot)
        for (const n of Array.from(e.shadowRoot.childNodes)) {
          const r = rd(n, t);
          r && (yl(e.shadowRoot) && (r.isShadow = !0), A.childNodes.push(r))
        }
    }
    return e.parentNode && _l(e.parentNode) && yl(e.parentNode) && (A.isShadow = !0), A.type !== gl.Element || "iframe" !== A.tagName || Zl(e, o, s, i) || function(e, t, n) {
      const r = e.contentWindow;
      if (!r) return;
      let o, s = !1;
      try {
        o = r.document.readyState
      } catch (e) {
        return
      }
      if ("complete" !== o) {
        const r = Al((() => {
          s || (t(), s = !0)
        }), n);
        return void e.addEventListener("load", (() => {
          Ll(r), s = !0, t()
        }))
      }
      const i = "about:blank";
      if (r.location.href !== i || e.src === i || "" === e.src) return Al(t, 0), e.addEventListener("load", t);
      e.addEventListener("load", t)
    }(e, (() => {
      const t = Dl(e);
      if (t && k) {
        const n = rd(t, {
          doc: t,
          mirror: r,
          blockClass: o,
          blockSelector: s,
          unblockSelector: i,
          maskAllText: a,
          maskTextClass: c,
          unmaskTextClass: u,
          maskTextSelector: l,
          unmaskTextSelector: d,
          skipChild: !1,
          inlineStylesheet: h,
          maskInputOptions: f,
          maskAttributeFn: m,
          maskTextFn: g,
          maskInputFn: _,
          slimDOMOptions: y,
          dataURLOptions: v,
          inlineImages: b,
          recordCanvas: S,
          preserveWhiteSpace: M,
          onSerialize: w,
          onIframeLoad: k,
          iframeLoadTimeout: E,
          onStylesheetLoad: x,
          stylesheetLoadTimeout: C,
          keepIframeSrcFn: T
        });
        n && k(e, n)
      }
    }), E), A.type === gl.Element && "link" === A.tagName && "string" == typeof A.attributes.rel && ("stylesheet" === A.attributes.rel || "preload" === A.attributes.rel && "string" == typeof A.attributes.href && "css" === Ml(A.attributes.href)) && function(e, t, n) {
      let r, o = !1;
      try {
        r = e.sheet
      } catch (e) {
        return
      }
      if (r) return;
      const s = Al((() => {
        o || (t(), o = !0)
      }), n);
      e.addEventListener("load", (() => {
        Ll(s), o = !0, t()
      }))
    }(e, (() => {
      if (x) {
        const t = rd(e, {
          doc: n,
          mirror: r,
          blockClass: o,
          blockSelector: s,
          unblockSelector: i,
          maskAllText: a,
          maskTextClass: c,
          unmaskTextClass: u,
          maskTextSelector: l,
          unmaskTextSelector: d,
          skipChild: !1,
          inlineStylesheet: h,
          maskInputOptions: f,
          maskAttributeFn: m,
          maskTextFn: g,
          maskInputFn: _,
          slimDOMOptions: y,
          dataURLOptions: v,
          inlineImages: b,
          recordCanvas: S,
          preserveWhiteSpace: M,
          onSerialize: w,
          onIframeLoad: k,
          iframeLoadTimeout: E,
          onStylesheetLoad: x,
          stylesheetLoadTimeout: C,
          keepIframeSrcFn: T
        });
        t && x(e, t)
      }
    }), C), A
  }

  function od(e, t, n = document) {
    const r = {
      capture: !0,
      passive: !0
    };
    return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r)
  }
  const sd = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
  let id = {
    map: {},
    getId: () => (console.error(sd), -1),
    getNode: () => (console.error(sd), null),
    removeNodeFromMap() {
      console.error(sd)
    },
    has: () => (console.error(sd), !1),
    reset() {
      console.error(sd)
    }
  };

  function ad(e, t, n = {}) {
    let r = null,
      o = 0;
    return function(...s) {
      const i = Date.now();
      o || !1 !== n.leading || (o = i);
      const a = t - (i - o),
        c = this;
      a <= 0 || a > t ? (r && (function(...e) {
        Cd("clearTimeout")(...e)
      }(r), r = null), o = i, e.apply(c, s)) : r || !1 === n.trailing || (r = Td((() => {
        o = !1 === n.leading ? 0 : Date.now(), r = null, e.apply(c, s)
      }), a))
    }
  }

  function cd(e, t, n, r, o = window) {
    const s = o.Object.getOwnPropertyDescriptor(e, t);
    return o.Object.defineProperty(e, t, r ? n : {
      set(e) {
        Td((() => {
          n.set.call(this, e)
        }), 0), s && s.set && s.set.call(this, e)
      }
    }), () => cd(e, t, s || {}, !0)
  }

  function ud(e, t, n) {
    try {
      if (!(t in e)) return () => {};
      const r = e[t],
        o = n(r);
      return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
        __rrweb_original__: {
          enumerable: !1,
          value: r
        }
      })), e[t] = o, () => {
        e[t] = r
      }
    } catch {
      return () => {}
    }
  }
  "undefined" != typeof window && window.Proxy && window.Reflect && (id = new Proxy(id, {
    get: (e, t, n) => ("map" === t && console.error(sd), Reflect.get(e, t, n))
  }));
  let ld = Date.now;

  function dd(e) {
    const t = e.document;
    return {
      left: t.scrollingElement ? t.scrollingElement.scrollLeft : void 0 !== e.pageXOffset ? e.pageXOffset : t?.documentElement.scrollLeft || t?.body?.parentElement?.scrollLeft || t?.body?.scrollLeft || 0,
      top: t.scrollingElement ? t.scrollingElement.scrollTop : void 0 !== e.pageYOffset ? e.pageYOffset : t?.documentElement.scrollTop || t?.body?.parentElement?.scrollTop || t?.body?.scrollTop || 0
    }
  }

  function pd() {
    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
  }

  function hd() {
    return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
  }

  function fd(e) {
    if (!e) return null;
    try {
      return e.nodeType === e.ELEMENT_NODE ? e : e.parentElement
    } catch (e) {
      return null
    }
  }

  function md(e, t, n, r, o) {
    if (!e) return !1;
    const s = fd(e);
    if (!s) return !1;
    const i = ed(t, n);
    if (!o) {
      const e = r && s.matches(r);
      return i(s) && !e
    }
    const a = Ql(s, i);
    let c = -1;
    return !(a < 0) && (r && (c = Ql(s, ed(null, r))), a > -1 && c < 0 || a < c)
  }

  function gd(e, t) {
    return -2 === t.getId(e)
  }

  function _d(e, t) {
    if (_l(e)) return !1;
    const n = t.getId(e);
    return !t.has(n) || (!e.parentNode || e.parentNode.nodeType !== e.DOCUMENT_NODE) && (!e.parentNode || _d(e.parentNode, t))
  }

  function yd(e) {
    return Boolean(e.changedTouches)
  }

  function vd(e, t) {
    return Boolean("IFRAME" === e.nodeName && t.getMeta(e))
  }

  function bd(e, t) {
    return Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && t.getMeta(e))
  }

  function Sd(e) {
    return Boolean(e?.shadowRoot)
  }
  /[1-9][0-9]{12}/.test(Date.now().toString()) || (ld = () => (new Date).getTime()); class wd {
    constructor() {
      this.id = 1, this.styleIDMap = new WeakMap, this.idStyleMap = new Map
    }
    getId(e) {
      return this.styleIDMap.get(e) ?? -1
    }
    has(e) {
      return this.styleIDMap.has(e)
    }
    add(e, t) {
      if (this.has(e)) return this.getId(e);
      let n;
      return n = void 0 === t ? this.id++ : t, this.styleIDMap.set(e, n), this.idStyleMap.set(n, e), n
    }
    getStyle(e) {
      return this.idStyleMap.get(e) || null
    }
    reset() {
      this.styleIDMap = new WeakMap, this.idStyleMap = new Map, this.id = 1
    }
    generateId() {
      return this.id++
    }
  }

  function kd(e) {
    let t = null;
    return e.getRootNode?.()?.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.getRootNode().host && (t = e.getRootNode().host), t
  }

  function Ed(e) {
    const t = e.ownerDocument;
    return !!t && (t.contains(e) || function(e) {
      const t = e.ownerDocument;
      if (!t) return !1;
      const n = function(e) {
        let t, n = e;
        for (; t = kd(n);) n = t;
        return n
      }(e);
      return t.contains(n)
    }(e))
  }
  const xd = {};

  function Cd(e) {
    const t = xd[e];
    if (t) return t;
    const n = window.document;
    let r = window[e];
    if (n && "function" == typeof n.createElement) try {
      const t = n.createElement("iframe");
      t.hidden = !0, n.head.appendChild(t);
      const o = t.contentWindow;
      o && o[e] && (r = o[e]), n.head.removeChild(t)
    } catch (e) {}
    return xd[e] = r.bind(window)
  }

  function Td(...e) {
    return Cd("setTimeout")(...e)
  }
  var Id = (e => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e))(Id || {}), Md = (e => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e))(Md || {}), Rd = (e => (e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e))(Rd || {}), Od = (e => (e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e))(Od || {}), Ad = (e => (e[e.Play = 0] = "Play", e[e.Pause = 1] = "Pause", e[e.Seeked = 2] = "Seeked", e[e.VolumeChange = 3] = "VolumeChange", e[e.RateChange = 4] = "RateChange", e))(Ad || {});

  function Ld(e) {
    try {
      return e.contentDocument
    } catch (e) {}
  }

  function Dd(e) {
    return "__ln" in e
  }
  class Nd {
    constructor() {
      this.length = 0, this.head = null, this.tail = null
    }
    get(e) {
      if (e >= this.length) throw new Error("Position outside of list range");
      let t = this.head;
      for (let n = 0; n < e; n++) t = t?.next || null;
      return t
    }
    addNode(e) {
      const t = {
        value: e,
        previous: null,
        next: null
      };
      if (e.__ln = t, e.previousSibling && Dd(e.previousSibling)) {
        const n = e.previousSibling.__ln.next;
        t.next = n, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, n && (n.previous = t)
      } else if (e.nextSibling && Dd(e.nextSibling) && e.nextSibling.__ln.previous) {
        const n = e.nextSibling.__ln.previous;
        t.previous = n, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, n && (n.next = t)
      } else this.head && (this.head.previous = t), t.next = this.head, this.head = t;
      null === t.next && (this.tail = t), this.length++
    }
    removeNode(e) {
      const t = e.__ln;
      this.head && (t.previous ? (t.previous.next = t.next, t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next, this.head ? this.head.previous = null : this.tail = null), e.__ln && delete e.__ln, this.length--)
    }
  }
  const Pd = (e, t) => `${e}@${t}`; class Fd {
    constructor() {
      this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.attributeMap = new WeakMap, this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.processMutations = e => {
        e.forEach(this.processMutation), this.emit()
      }, this.emit = () => {
        if (this.frozen || this.locked) return;
        const e = [],
          t = new Set,
          n = new Nd,
          r = e => {
            let t = e,
              n = -2;
            for (; - 2 === n;) t = t && t.nextSibling, n = t && this.mirror.getId(t);
            return n
          },
          o = o => {
            if (!o.parentNode || !Ed(o)) return;
            const s = _l(o.parentNode) ? this.mirror.getId(kd(o)) : this.mirror.getId(o.parentNode),
              i = r(o);
            if (-1 === s || -1 === i) return n.addNode(o);
            const a = rd(o, {
              doc: this.doc,
              mirror: this.mirror,
              blockClass: this.blockClass,
              blockSelector: this.blockSelector,
              maskAllText: this.maskAllText,
              unblockSelector: this.unblockSelector,
              maskTextClass: this.maskTextClass,
              unmaskTextClass: this.unmaskTextClass,
              maskTextSelector: this.maskTextSelector,
              unmaskTextSelector: this.unmaskTextSelector,
              skipChild: !0,
              newlyAddedElement: !0,
              inlineStylesheet: this.inlineStylesheet,
              maskInputOptions: this.maskInputOptions,
              maskAttributeFn: this.maskAttributeFn,
              maskTextFn: this.maskTextFn,
              maskInputFn: this.maskInputFn,
              slimDOMOptions: this.slimDOMOptions,
              dataURLOptions: this.dataURLOptions,
              recordCanvas: this.recordCanvas,
              inlineImages: this.inlineImages,
              onSerialize: e => {
                vd(e, this.mirror) && !md(e, this.blockClass, this.blockSelector, this.unblockSelector, !1) && this.iframeManager.addIframe(e), bd(e, this.mirror) && this.stylesheetManager.trackLinkElement(e), Sd(o) && this.shadowDomManager.addShadowRoot(o.shadowRoot, this.doc)
              },
              onIframeLoad: (e, t) => {
                md(e, this.blockClass, this.blockSelector, this.unblockSelector, !1) || (this.iframeManager.attachIframe(e, t), e.contentWindow && this.canvasManager.addWindow(e.contentWindow), this.shadowDomManager.observeAttachShadow(e))
              },
              onStylesheetLoad: (e, t) => {
                this.stylesheetManager.attachLinkElement(e, t)
              }
            });
            a && (e.push({
              parentId: s,
              nextId: i,
              node: a
            }), t.add(a.id))
          };
        for (; this.mapRemoves.length;) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
        for (const e of this.movedSet) Bd(this.removes, e, this.mirror) && !this.movedSet.has(e.parentNode) || o(e);
        for (const e of this.addedSet) Ud(this.droppedSet, e) || Bd(this.removes, e, this.mirror) ? Ud(this.movedSet, e) ? o(e) : this.droppedSet.add(e) : o(e);
        let s = null;
        for (; n.length;) {
          let e = null;
          if (s) {
            const t = this.mirror.getId(s.value.parentNode),
              n = r(s.value); - 1 !== t && -1 !== n && (e = s)
          }
          if (!e) {
            let t = n.tail;
            for (; t;) {
              const n = t;
              if (t = t.previous, n) {
                const t = this.mirror.getId(n.value.parentNode);
                if (-1 === r(n.value)) continue;
                if (-1 !== t) {
                  e = n;
                  break
                } {
                  const t = n.value;
                  if (t.parentNode && t.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                    const r = t.parentNode.host;
                    if (-1 !== this.mirror.getId(r)) {
                      e = n;
                      break
                    }
                  }
                }
              }
            }
          }
          if (!e) {
            for (; n.head;) n.removeNode(n.head.value);
            break
          }
          s = e.previous, n.removeNode(e.value), o(e.value)
        }
        const i = {
          texts: this.texts.map((e => ({
            id: this.mirror.getId(e.node),
            value: e.value
          }))).filter((e => !t.has(e.id))).filter((e => this.mirror.has(e.id))),
          attributes: this.attributes.map((e => {
            const {
              attributes: t
            } = e;
            if ("string" == typeof t.style) {
              const n = JSON.stringify(e.styleDiff),
                r = JSON.stringify(e._unchangedStyles);
              n.length < t.style.length && (n + r).split("var(").length === t.style.split("var(").length && (t.style = e.styleDiff)
            }
            return {
              id: this.mirror.getId(e.node),
              attributes: t
            }
          })).filter((e => !t.has(e.id))).filter((e => this.mirror.has(e.id))),
          removes: this.removes,
          adds: e
        };
        (i.texts.length || i.attributes.length || i.removes.length || i.adds.length) && (this.texts = [], this.attributes = [], this.attributeMap = new WeakMap, this.removes = [], this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.movedMap = {}, this.mutationCb(i))
      }, this.processMutation = e => {
        if (!gd(e.target, this.mirror)) switch (e.type) {
          case "characterData": {
            const t = e.target.textContent;
            md(e.target, this.blockClass, this.blockSelector, this.unblockSelector, !1) || t === e.oldValue || this.texts.push({
              value: td(e.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, this.maskAllText) && t ? this.maskTextFn ? this.maskTextFn(t, fd(e.target)) : t.replace(/[\S]/g, "*") : t,
              node: e.target
            });
            break
          }
          case "attributes": {
            const t = e.target;
            let n = e.attributeName,
              r = e.target.getAttribute(n);
            if ("value" === n) {
              const n = Tl(t),
                o = t.tagName;
              r = Il(t, o, n);
              const s = wl({
                maskInputOptions: this.maskInputOptions,
                tagName: o,
                type: n
              });
              r = kl({
                isMasked: td(e.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextClass, this.unmaskTextSelector, s),
                element: t,
                value: r,
                maskInputFn: this.maskInputFn
              })
            }
            if (md(e.target, this.blockClass, this.blockSelector, this.unblockSelector, !1) || r === e.oldValue) return;
            let o = this.attributeMap.get(e.target);
            if ("IFRAME" === t.tagName && "src" === n && !this.keepIframeSrcFn(r)) {
              if (Ld(t)) return;
              n = "rr_src"
            }
            if (o || (o = {
                node: e.target,
                attributes: {},
                styleDiff: {},
                _unchangedStyles: {}
              }, this.attributes.push(o), this.attributeMap.set(e.target, o)), "type" === n && "INPUT" === t.tagName && "password" === (e.oldValue || "").toLowerCase() && t.setAttribute("data-rr-is-password", "true"), !Xl(t.tagName, n) && (o.attributes[n] = Yl(this.doc, El(t.tagName), El(n), r, t, this.maskAttributeFn), "style" === n)) {
              if (!this.unattachedDoc) try {
                this.unattachedDoc = document.implementation.createHTMLDocument()
              } catch (e) {
                this.unattachedDoc = this.doc
              }
              const n = this.unattachedDoc.createElement("span");
              e.oldValue && n.setAttribute("style", e.oldValue);
              for (const e of Array.from(t.style)) {
                const r = t.style.getPropertyValue(e),
                  s = t.style.getPropertyPriority(e);
                r !== n.style.getPropertyValue(e) || s !== n.style.getPropertyPriority(e) ? o.styleDiff[e] = "" === s ? r : [r, s] : o._unchangedStyles[e] = [r, s]
              }
              for (const e of Array.from(n.style)) "" === t.style.getPropertyValue(e) && (o.styleDiff[e] = !1)
            }
            break
          }
          case "childList":
            if (md(e.target, this.blockClass, this.blockSelector, this.unblockSelector, !0)) return;
            e.addedNodes.forEach((t => this.genAdds(t, e.target))), e.removedNodes.forEach((t => {
              const n = this.mirror.getId(t),
                r = _l(e.target) ? this.mirror.getId(e.target.host) : this.mirror.getId(e.target);
              md(e.target, this.blockClass, this.blockSelector, this.unblockSelector, !1) || gd(t, this.mirror) || ! function(e, t) {
                return -1 !== t.getId(e)
              }(t, this.mirror) || (this.addedSet.has(t) ? ($d(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && -1 === n || _d(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[Pd(n, r)] ? $d(this.movedSet, t) : this.removes.push({
                parentId: r,
                id: n,
                isShadow: !(!_l(e.target) || !yl(e.target)) || void 0
              })), this.mapRemoves.push(t))
            }))
        }
      }, this.genAdds = (e, t) => {
        if (!this.processedNodeManager.inOtherBuffer(e, this) && !this.addedSet.has(e) && !this.movedSet.has(e)) {
          if (this.mirror.hasNode(e)) {
            if (gd(e, this.mirror)) return;
            this.movedSet.add(e);
            let n = null;
            t && this.mirror.hasNode(t) && (n = this.mirror.getId(t)), n && -1 !== n && (this.movedMap[Pd(this.mirror.getId(e), n)] = !0)
          } else this.addedSet.add(e), this.droppedSet.delete(e);
          md(e, this.blockClass, this.blockSelector, this.unblockSelector, !1) || (e.childNodes.forEach((e => this.genAdds(e))), Sd(e) && e.shadowRoot.childNodes.forEach((t => {
            this.processedNodeManager.add(t, this), this.genAdds(t, e)
          })))
        }
      }
    }
    init(e) {
      ["mutationCb", "blockClass", "blockSelector", "unblockSelector", "maskAllText", "maskTextClass", "unmaskTextClass", "maskTextSelector", "unmaskTextSelector", "inlineStylesheet", "maskInputOptions", "maskAttributeFn", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager", "processedNodeManager"].forEach((t => {
        this[t] = e[t]
      }))
    }
    freeze() {
      this.frozen = !0, this.canvasManager.freeze()
    }
    unfreeze() {
      this.frozen = !1, this.canvasManager.unfreeze(), this.emit()
    }
    isFrozen() {
      return this.frozen
    }
    lock() {
      this.locked = !0, this.canvasManager.lock()
    }
    unlock() {
      this.locked = !1, this.canvasManager.unlock(), this.emit()
    }
    reset() {
      this.shadowDomManager.reset(), this.canvasManager.reset()
    }
  }

  function $d(e, t) {
    e.delete(t), t.childNodes.forEach((t => $d(e, t)))
  }

  function Bd(e, t, n) {
    return 0 !== e.length && function(e, t, n) {
      let r = t.parentNode;
      for (; r;) {
        const t = n.getId(r);
        if (e.some((e => e.id === t))) return !0;
        r = r.parentNode
      }
      return !1
    }(e, t, n)
  }

  function Ud(e, t) {
    return 0 !== e.size && jd(e, t)
  }

  function jd(e, t) {
    const {
      parentNode: n
    } = t;
    return !!n && (!!e.has(n) || jd(e, n))
  }
  let Hd;
  const zd = e => Hd ? (...t) => {
    try {
      return e(...t)
    } catch (e) {
      if (Hd && !0 === Hd(e)) return () => {};
      throw e
    }
  } : e, qd = [];

  function Wd(e) {
    try {
      if ("composedPath" in e) {
        const t = e.composedPath();
        if (t.length) return t[0]
      } else if ("path" in e && e.path.length) return e.path[0]
    } catch {}
    return e && e.target
  }

  function Vd(e, t) {
    const n = new Fd;
    qd.push(n), n.init(e);
    let r = window.MutationObserver || window.__rrMutationObserver;
    const o = window?.Zone?.__symbol__?.("MutationObserver");
    o && window[o] && (r = window[o]);
    const s = new r(zd((t => {
      e.onMutation && !1 === e.onMutation(t) || n.processMutations.bind(n)(t)
    })));
    return s.observe(t, {
      attributes: !0,
      attributeOldValue: !0,
      characterData: !0,
      characterDataOldValue: !0,
      childList: !0,
      subtree: !0
    }), s
  }

  function Gd({
    scrollCb: e,
    doc: t,
    mirror: n,
    blockClass: r,
    blockSelector: o,
    unblockSelector: s,
    sampling: i
  }) {
    return od("scroll", zd(ad(zd((i => {
      const a = Wd(i);
      if (!a || md(a, r, o, s, !0)) return;
      const c = n.getId(a);
      if (a === t && t.defaultView) {
        const n = dd(t.defaultView);
        e({
          id: c,
          x: n.left,
          y: n.top
        })
      } else e({
        id: c,
        x: a.scrollLeft,
        y: a.scrollTop
      })
    })), i.scroll || 100)), t)
  }
  const Jd = ["INPUT", "TEXTAREA", "SELECT"], Kd = new WeakMap;

  function Yd({
    inputCb: e,
    doc: t,
    mirror: n,
    blockClass: r,
    blockSelector: o,
    unblockSelector: s,
    ignoreClass: i,
    ignoreSelector: a,
    maskInputOptions: c,
    maskInputFn: u,
    sampling: l,
    userTriggeredOnInput: d,
    maskTextClass: p,
    unmaskTextClass: h,
    maskTextSelector: f,
    unmaskTextSelector: m
  }) {
    function g(e) {
      let n = Wd(e);
      const l = e.isTrusted,
        g = n && xl(n.tagName);
      if ("OPTION" === g && (n = n.parentElement), !n || !g || Jd.indexOf(g) < 0 || md(n, r, o, s, !0)) return;
      const y = n;
      if (y.classList.contains(i) || a && y.matches(a)) return;
      const v = Tl(n);
      let b = Il(y, g, v),
        S = !1;
      const w = wl({
          maskInputOptions: c,
          tagName: g,
          type: v
        }),
        k = td(n, p, f, h, m, w);
      "radio" !== v && "checkbox" !== v || (S = n.checked), b = kl({
        isMasked: k,
        element: n,
        value: b,
        maskInputFn: u
      }), _(n, d ? {
        text: b,
        isChecked: S,
        userTriggered: l
      } : {
        text: b,
        isChecked: S
      });
      const E = n.name;
      "radio" === v && E && S && t.querySelectorAll(`input[type="radio"][name="${E}"]`).forEach((e => {
        if (e !== n) {
          const t = kl({
            isMasked: k,
            element: e,
            value: Il(e, g, v),
            maskInputFn: u
          });
          _(e, d ? {
            text: t,
            isChecked: !S,
            userTriggered: !1
          } : {
            text: t,
            isChecked: !S
          })
        }
      }))
    }

    function _(t, r) {
      const o = Kd.get(t);
      if (!o || o.text !== r.text || o.isChecked !== r.isChecked) {
        Kd.set(t, r);
        const o = n.getId(t);
        zd(e)({
          ...r,
          id: o
        })
      }
    }
    const y = ("last" === l.input ? ["change"] : ["input", "change"]).map((e => od(e, zd(g), t))),
      v = t.defaultView;
    if (!v) return () => {
      y.forEach((e => e()))
    };
    const b = v.Object.getOwnPropertyDescriptor(v.HTMLInputElement.prototype, "value"),
      S = [
        [v.HTMLInputElement.prototype, "value"],
        [v.HTMLInputElement.prototype, "checked"],
        [v.HTMLSelectElement.prototype, "value"],
        [v.HTMLTextAreaElement.prototype, "value"],
        [v.HTMLSelectElement.prototype, "selectedIndex"],
        [v.HTMLOptionElement.prototype, "selected"]
      ];
    return b && b.set && y.push(...S.map((e => cd(e[0], e[1], {
      set() {
        zd(g)({
          target: this,
          isTrusted: !1
        })
      }
    }, !1, v)))), zd((() => {
      y.forEach((e => e()))
    }))
  }

  function Xd(e) {
    return function(e, t) {
      if (tp("CSSGroupingRule") && e.parentRule instanceof CSSGroupingRule || tp("CSSMediaRule") && e.parentRule instanceof CSSMediaRule || tp("CSSSupportsRule") && e.parentRule instanceof CSSSupportsRule || tp("CSSConditionRule") && e.parentRule instanceof CSSConditionRule) {
        const n = Array.from(e.parentRule.cssRules).indexOf(e);
        t.unshift(n)
      } else if (e.parentStyleSheet) {
        const n = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
        t.unshift(n)
      }
      return t
    }(e, [])
  }

  function Zd(e, t, n) {
    let r, o;
    return e ? (e.ownerNode ? r = t.getId(e.ownerNode) : o = n.getId(e), {
      styleId: o,
      id: r
    }) : {}
  }

  function Qd({
    mirror: e,
    stylesheetManager: t
  }, n) {
    let r = null;
    r = "#document" === n.nodeName ? e.getId(n) : e.getId(n.host);
    const o = "#document" === n.nodeName ? n.defaultView?.Document : n.ownerDocument?.defaultView?.ShadowRoot,
      s = o?.prototype ? Object.getOwnPropertyDescriptor(o?.prototype, "adoptedStyleSheets") : void 0;
    return null !== r && -1 !== r && o && s ? (Object.defineProperty(n, "adoptedStyleSheets", {
      configurable: s.configurable,
      enumerable: s.enumerable,
      get() {
        return s.get?.call(this)
      },
      set(e) {
        const n = s.set?.call(this, e);
        if (null !== r && -1 !== r) try {
          t.adoptStyleSheets(e, r)
        } catch (e) {}
        return n
      }
    }), zd((() => {
      Object.defineProperty(n, "adoptedStyleSheets", {
        configurable: s.configurable,
        enumerable: s.enumerable,
        get: s.get,
        set: s.set
      })
    }))) : () => {}
  }

  function ep(e, t = {}) {
    const n = e.doc.defaultView;
    if (!n) return () => {};
    let r;
    e.recordDOM && (r = Vd(e, e.doc));
    const o = function({
        mousemoveCb: e,
        sampling: t,
        doc: n,
        mirror: r
      }) {
        if (!1 === t.mousemove) return () => {};
        const o = "number" == typeof t.mousemove ? t.mousemove : 50,
          s = "number" == typeof t.mousemoveCallback ? t.mousemoveCallback : 500;
        let i, a = [];
        const c = ad(zd((t => {
            const n = Date.now() - i;
            e(a.map((e => (e.timeOffset -= n, e))), t), a = [], i = null
          })), s),
          u = zd(ad(zd((e => {
            const t = Wd(e),
              {
                clientX: n,
                clientY: o
              } = yd(e) ? e.changedTouches[0] : e;
            i || (i = ld()), a.push({
              x: n,
              y: o,
              id: r.getId(t),
              timeOffset: ld() - i
            }), c("undefined" != typeof DragEvent && e instanceof DragEvent ? Md.Drag : e instanceof MouseEvent ? Md.MouseMove : Md.TouchMove)
          })), o, {
            trailing: !1
          })),
          l = [od("mousemove", u, n), od("touchmove", u, n), od("drag", u, n)];
        return zd((() => {
          l.forEach((e => e()))
        }))
      }(e),
      s = function({
        mouseInteractionCb: e,
        doc: t,
        mirror: n,
        blockClass: r,
        blockSelector: o,
        unblockSelector: s,
        sampling: i
      }) {
        if (!1 === i.mouseInteraction) return () => {};
        const a = !0 === i.mouseInteraction || void 0 === i.mouseInteraction ? {} : i.mouseInteraction,
          c = [];
        let u = null;
        return Object.keys(Rd).filter((e => Number.isNaN(Number(e)) && !e.endsWith("_Departed") && !1 !== a[e])).forEach((i => {
          let a = El(i);
          const l = (t => i => {
            const a = Wd(i);
            if (md(a, r, o, s, !0)) return;
            let c = null,
              l = t;
            if ("pointerType" in i) {
              switch (i.pointerType) {
                case "mouse":
                  c = Od.Mouse;
                  break;
                case "touch":
                  c = Od.Touch;
                  break;
                case "pen":
                  c = Od.Pen
              }
              c === Od.Touch ? Rd[t] === Rd.MouseDown ? l = "TouchStart" : Rd[t] === Rd.MouseUp && (l = "TouchEnd") : Od.Pen
            } else yd(i) && (c = Od.Touch);
            null !== c ? (u = c, (l.startsWith("Touch") && c === Od.Touch || l.startsWith("Mouse") && c === Od.Mouse) && (c = null)) : Rd[t] === Rd.Click && (c = u, u = null);
            const d = yd(i) ? i.changedTouches[0] : i;
            if (!d) return;
            const p = n.getId(a),
              {
                clientX: h,
                clientY: f
              } = d;
            zd(e)({
              type: Rd[l],
              id: p,
              x: h,
              y: f,
              ...null !== c && {
                pointerType: c
              }
            })
          })(i);
          if (window.PointerEvent) switch (Rd[i]) {
            case Rd.MouseDown:
            case Rd.MouseUp:
              a = a.replace("mouse", "pointer");
              break;
            case Rd.TouchStart:
            case Rd.TouchEnd:
              return
          }
          c.push(od(a, l, t))
        })), zd((() => {
          c.forEach((e => e()))
        }))
      }(e),
      i = Gd(e),
      a = function({
        viewportResizeCb: e
      }, {
        win: t
      }) {
        let n = -1,
          r = -1;
        return od("resize", zd(ad(zd((() => {
          const t = pd(),
            o = hd();
          n === t && r === o || (e({
            width: Number(o),
            height: Number(t)
          }), n = t, r = o)
        })), 200)), t)
      }(e, {
        win: n
      }),
      c = Yd(e),
      u = function({
        mediaInteractionCb: e,
        blockClass: t,
        blockSelector: n,
        unblockSelector: r,
        mirror: o,
        sampling: s,
        doc: i
      }) {
        const a = zd((i => ad(zd((s => {
            const a = Wd(s);
            if (!a || md(a, t, n, r, !0)) return;
            const {
              currentTime: c,
              volume: u,
              muted: l,
              playbackRate: d
            } = a;
            e({
              type: i,
              id: o.getId(a),
              currentTime: c,
              volume: u,
              muted: l,
              playbackRate: d
            })
          })), s.media || 500))),
          c = [od("play", a(Ad.Play), i), od("pause", a(Ad.Pause), i), od("seeked", a(Ad.Seeked), i), od("volumechange", a(Ad.VolumeChange), i), od("ratechange", a(Ad.RateChange), i)];
        return zd((() => {
          c.forEach((e => e()))
        }))
      }(e);
    let l = () => {},
      d = () => {},
      p = () => {},
      h = () => {};
    e.recordDOM && (l = function({
      styleSheetRuleCb: e,
      mirror: t,
      stylesheetManager: n
    }, {
      win: r
    }) {
      if (!r.CSSStyleSheet || !r.CSSStyleSheet.prototype) return () => {};
      const o = r.CSSStyleSheet.prototype.insertRule;
      r.CSSStyleSheet.prototype.insertRule = new Proxy(o, {
        apply: zd(((r, o, s) => {
          const [i, a] = s, {
            id: c,
            styleId: u
          } = Zd(o, t, n.styleMirror);
          return (c && -1 !== c || u && -1 !== u) && e({
            id: c,
            styleId: u,
            adds: [{
              rule: i,
              index: a
            }]
          }), r.apply(o, s)
        }))
      });
      const s = r.CSSStyleSheet.prototype.deleteRule;
      let i, a;
      r.CSSStyleSheet.prototype.deleteRule = new Proxy(s, {
        apply: zd(((r, o, s) => {
          const [i] = s, {
            id: a,
            styleId: c
          } = Zd(o, t, n.styleMirror);
          return (a && -1 !== a || c && -1 !== c) && e({
            id: a,
            styleId: c,
            removes: [{
              index: i
            }]
          }), r.apply(o, s)
        }))
      }), r.CSSStyleSheet.prototype.replace && (i = r.CSSStyleSheet.prototype.replace, r.CSSStyleSheet.prototype.replace = new Proxy(i, {
        apply: zd(((r, o, s) => {
          const [i] = s, {
            id: a,
            styleId: c
          } = Zd(o, t, n.styleMirror);
          return (a && -1 !== a || c && -1 !== c) && e({
            id: a,
            styleId: c,
            replace: i
          }), r.apply(o, s)
        }))
      })), r.CSSStyleSheet.prototype.replaceSync && (a = r.CSSStyleSheet.prototype.replaceSync, r.CSSStyleSheet.prototype.replaceSync = new Proxy(a, {
        apply: zd(((r, o, s) => {
          const [i] = s, {
            id: a,
            styleId: c
          } = Zd(o, t, n.styleMirror);
          return (a && -1 !== a || c && -1 !== c) && e({
            id: a,
            styleId: c,
            replaceSync: i
          }), r.apply(o, s)
        }))
      }));
      const c = {};
      np("CSSGroupingRule") ? c.CSSGroupingRule = r.CSSGroupingRule : (np("CSSMediaRule") && (c.CSSMediaRule = r.CSSMediaRule), np("CSSConditionRule") && (c.CSSConditionRule = r.CSSConditionRule), np("CSSSupportsRule") && (c.CSSSupportsRule = r.CSSSupportsRule));
      const u = {};
      return Object.entries(c).forEach((([r, o]) => {
        u[r] = {
          insertRule: o.prototype.insertRule,
          deleteRule: o.prototype.deleteRule
        }, o.prototype.insertRule = new Proxy(u[r].insertRule, {
          apply: zd(((r, o, s) => {
            const [i, a] = s, {
              id: c,
              styleId: u
            } = Zd(o.parentStyleSheet, t, n.styleMirror);
            return (c && -1 !== c || u && -1 !== u) && e({
              id: c,
              styleId: u,
              adds: [{
                rule: i,
                index: [...Xd(o), a || 0]
              }]
            }), r.apply(o, s)
          }))
        }), o.prototype.deleteRule = new Proxy(u[r].deleteRule, {
          apply: zd(((r, o, s) => {
            const [i] = s, {
              id: a,
              styleId: c
            } = Zd(o.parentStyleSheet, t, n.styleMirror);
            return (a && -1 !== a || c && -1 !== c) && e({
              id: a,
              styleId: c,
              removes: [{
                index: [...Xd(o), i]
              }]
            }), r.apply(o, s)
          }))
        })
      })), zd((() => {
        r.CSSStyleSheet.prototype.insertRule = o, r.CSSStyleSheet.prototype.deleteRule = s, i && (r.CSSStyleSheet.prototype.replace = i), a && (r.CSSStyleSheet.prototype.replaceSync = a), Object.entries(c).forEach((([e, t]) => {
          t.prototype.insertRule = u[e].insertRule, t.prototype.deleteRule = u[e].deleteRule
        }))
      }))
    }(e, {
      win: n
    }), d = Qd(e, e.doc), p = function({
      styleDeclarationCb: e,
      mirror: t,
      ignoreCSSAttributes: n,
      stylesheetManager: r
    }, {
      win: o
    }) {
      const s = o.CSSStyleDeclaration.prototype.setProperty;
      o.CSSStyleDeclaration.prototype.setProperty = new Proxy(s, {
        apply: zd(((o, i, a) => {
          const [c, u, l] = a;
          if (n.has(c)) return s.apply(i, [c, u, l]);
          const {
            id: d,
            styleId: p
          } = Zd(i.parentRule?.parentStyleSheet, t, r.styleMirror);
          return (d && -1 !== d || p && -1 !== p) && e({
            id: d,
            styleId: p,
            set: {
              property: c,
              value: u,
              priority: l
            },
            index: Xd(i.parentRule)
          }), o.apply(i, a)
        }))
      });
      const i = o.CSSStyleDeclaration.prototype.removeProperty;
      return o.CSSStyleDeclaration.prototype.removeProperty = new Proxy(i, {
        apply: zd(((o, s, a) => {
          const [c] = a;
          if (n.has(c)) return i.apply(s, [c]);
          const {
            id: u,
            styleId: l
          } = Zd(s.parentRule?.parentStyleSheet, t, r.styleMirror);
          return (u && -1 !== u || l && -1 !== l) && e({
            id: u,
            styleId: l,
            remove: {
              property: c
            },
            index: Xd(s.parentRule)
          }), o.apply(s, a)
        }))
      }), zd((() => {
        o.CSSStyleDeclaration.prototype.setProperty = s, o.CSSStyleDeclaration.prototype.removeProperty = i
      }))
    }(e, {
      win: n
    }), e.collectFonts && (h = function({
      fontCb: e,
      doc: t
    }) {
      const n = t.defaultView;
      if (!n) return () => {};
      const r = [],
        o = new WeakMap,
        s = n.FontFace;
      n.FontFace = function(e, t, n) {
        const r = new s(e, t, n);
        return o.set(r, {
          family: e,
          buffer: "string" != typeof t,
          descriptors: n,
          fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
        }), r
      };
      const i = ud(t.fonts, "add", (function(t) {
        return function(n) {
          return Td(zd((() => {
            const t = o.get(n);
            t && (e(t), o.delete(n))
          })), 0), t.apply(this, [n])
        }
      }));
      return r.push((() => {
        n.FontFace = s
      })), r.push(i), zd((() => {
        r.forEach((e => e()))
      }))
    }(e)));
    const f = function(e) {
        const {
          doc: t,
          mirror: n,
          blockClass: r,
          blockSelector: o,
          unblockSelector: s,
          selectionCb: i
        } = e;
        let a = !0;
        const c = zd((() => {
          const e = t.getSelection();
          if (!e || a && e?.isCollapsed) return;
          a = e.isCollapsed || !1;
          const c = [],
            u = e.rangeCount || 0;
          for (let t = 0; t < u; t++) {
            const i = e.getRangeAt(t),
              {
                startContainer: a,
                startOffset: u,
                endContainer: l,
                endOffset: d
              } = i;
            md(a, r, o, s, !0) || md(l, r, o, s, !0) || c.push({
              start: n.getId(a),
              startOffset: u,
              end: n.getId(l),
              endOffset: d
            })
          }
          i({
            ranges: c
          })
        }));
        return c(), od("selectionchange", c)
      }(e),
      m = function({
        doc: e,
        customElementCb: t
      }) {
        const n = e.defaultView;
        return n && n.customElements ? ud(n.customElements, "define", (function(e) {
          return function(n, r, o) {
            try {
              t({
                define: {
                  name: n
                }
              })
            } catch (e) {}
            return e.apply(this, [n, r, o])
          }
        })) : () => {}
      }(e),
      g = [];
    for (const t of e.plugins) g.push(t.observer(t.callback, n, t.options));
    return zd((() => {
      qd.forEach((e => e.reset())), r?.disconnect(), o(), s(), i(), a(), c(), u(), l(), d(), p(), h(), f(), m(), g.forEach((e => e()))
    }))
  }

  function tp(e) {
    return void 0 !== window[e]
  }

  function np(e) {
    return Boolean(void 0 !== window[e] && window[e].prototype && "insertRule" in window[e].prototype && "deleteRule" in window[e].prototype)
  }
  class rp {
    constructor(e) {
      this.generateIdFn = e, this.iframeIdToRemoteIdMap = new WeakMap, this.iframeRemoteIdToIdMap = new WeakMap
    }
    getId(e, t, n, r) {
      const o = n || this.getIdToRemoteIdMap(e),
        s = r || this.getRemoteIdToIdMap(e);
      let i = o.get(t);
      return i || (i = this.generateIdFn(), o.set(t, i), s.set(i, t)), i
    }
    getIds(e, t) {
      const n = this.getIdToRemoteIdMap(e),
        r = this.getRemoteIdToIdMap(e);
      return t.map((t => this.getId(e, t, n, r)))
    }
    getRemoteId(e, t, n) {
      const r = n || this.getRemoteIdToIdMap(e);
      if ("number" != typeof t) return t;
      return r.get(t) || -1
    }
    getRemoteIds(e, t) {
      const n = this.getRemoteIdToIdMap(e);
      return t.map((t => this.getRemoteId(e, t, n)))
    }
    reset(e) {
      if (!e) return this.iframeIdToRemoteIdMap = new WeakMap, void(this.iframeRemoteIdToIdMap = new WeakMap);
      this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e)
    }
    getIdToRemoteIdMap(e) {
      let t = this.iframeIdToRemoteIdMap.get(e);
      return t || (t = new Map, this.iframeIdToRemoteIdMap.set(e, t)), t
    }
    getRemoteIdToIdMap(e) {
      let t = this.iframeRemoteIdToIdMap.get(e);
      return t || (t = new Map, this.iframeRemoteIdToIdMap.set(e, t)), t
    }
  }
  class op {
    constructor() {
      this.crossOriginIframeMirror = new rp(Fl), this.crossOriginIframeRootIdMap = new WeakMap
    }
    addIframe() {}
    addLoadListener() {}
    attachIframe() {}
  }
  class sp {
    constructor(e) {
      this.iframes = new WeakMap, this.crossOriginIframeMap = new WeakMap, this.crossOriginIframeMirror = new rp(Fl), this.crossOriginIframeRootIdMap = new WeakMap, this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new rp(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this))
    }
    addIframe(e) {
      this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e)
    }
    addLoadListener(e) {
      this.loadListener = e
    }
    attachIframe(e, t) {
      this.mutationCb({
        adds: [{
          parentId: this.mirror.getId(e),
          nextId: null,
          node: t
        }],
        removes: [],
        texts: [],
        attributes: [],
        isAttachIframe: !0
      }), this.recordCrossOriginIframes && e.contentWindow?.addEventListener("message", this.handleMessage.bind(this)), this.loadListener?.(e);
      const n = Ld(e);
      n && n.adoptedStyleSheets && n.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(n.adoptedStyleSheets, this.mirror.getId(n))
    }
    handleMessage(e) {
      const t = e;
      if ("rrweb" !== t.data.type || t.origin !== t.data.origin) return;
      if (!e.source) return;
      const n = this.crossOriginIframeMap.get(e.source);
      if (!n) return;
      const r = this.transformCrossOriginEvent(n, t.data.event);
      r && this.wrappedEmit(r, t.data.isCheckout)
    }
    transformCrossOriginEvent(e, t) {
      switch (t.type) {
        case Id.FullSnapshot: {
          this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e);
          const n = t.data.node.id;
          return this.crossOriginIframeRootIdMap.set(e, n), this.patchRootIdOnNode(t.data.node, n), {
            timestamp: t.timestamp,
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.Mutation,
              adds: [{
                parentId: this.mirror.getId(e),
                nextId: null,
                node: t.data.node
              }],
              removes: [],
              texts: [],
              attributes: [],
              isAttachIframe: !0
            }
          }
        }
        case Id.Meta:
        case Id.Load:
        case Id.DomContentLoaded:
          return !1;
        case Id.Plugin:
          return t;
        case Id.Custom:
          return this.replaceIds(t.data.payload, e, ["id", "parentId", "previousId", "nextId"]), t;
        case Id.IncrementalSnapshot:
          switch (t.data.source) {
            case Md.Mutation:
              return t.data.adds.forEach((t => {
                this.replaceIds(t, e, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(t.node, e);
                const n = this.crossOriginIframeRootIdMap.get(e);
                n && this.patchRootIdOnNode(t.node, n)
              })), t.data.removes.forEach((t => {
                this.replaceIds(t, e, ["parentId", "id"])
              })), t.data.attributes.forEach((t => {
                this.replaceIds(t, e, ["id"])
              })), t.data.texts.forEach((t => {
                this.replaceIds(t, e, ["id"])
              })), t;
            case Md.Drag:
            case Md.TouchMove:
            case Md.MouseMove:
              return t.data.positions.forEach((t => {
                this.replaceIds(t, e, ["id"])
              })), t;
            case Md.ViewportResize:
              return !1;
            case Md.MediaInteraction:
            case Md.MouseInteraction:
            case Md.Scroll:
            case Md.CanvasMutation:
            case Md.Input:
              return this.replaceIds(t.data, e, ["id"]), t;
            case Md.StyleSheetRule:
            case Md.StyleDeclaration:
              return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
            case Md.Font:
              return t;
            case Md.Selection:
              return t.data.ranges.forEach((t => {
                this.replaceIds(t, e, ["start", "end"])
              })), t;
            case Md.AdoptedStyleSheet:
              return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), t.data.styles?.forEach((t => {
                this.replaceStyleIds(t, e, ["styleId"])
              })), t
          }
      }
      return !1
    }
    replace(e, t, n, r) {
      for (const o of r)(Array.isArray(t[o]) || "number" == typeof t[o]) && (Array.isArray(t[o]) ? t[o] = e.getIds(n, t[o]) : t[o] = e.getId(n, t[o]));
      return t
    }
    replaceIds(e, t, n) {
      return this.replace(this.crossOriginIframeMirror, e, t, n)
    }
    replaceStyleIds(e, t, n) {
      return this.replace(this.crossOriginIframeStyleMirror, e, t, n)
    }
    replaceIdOnNode(e, t) {
      this.replaceIds(e, t, ["id", "rootId"]), "childNodes" in e && e.childNodes.forEach((e => {
        this.replaceIdOnNode(e, t)
      }))
    }
    patchRootIdOnNode(e, t) {
      e.type === gl.Document || e.rootId || (e.rootId = t), "childNodes" in e && e.childNodes.forEach((e => {
        this.patchRootIdOnNode(e, t)
      }))
    }
  }
  class ip {
    init() {}
    addShadowRoot() {}
    observeAttachShadow() {}
    reset() {}
  }
  class ap {
    constructor(e) {
      this.shadowDoms = new WeakSet, this.restoreHandlers = [], this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror, this.init()
    }
    init() {
      this.reset(), this.patchAttachShadow(Element, document)
    }
    addShadowRoot(e, t) {
      if (!yl(e)) return;
      if (this.shadowDoms.has(e)) return;
      this.shadowDoms.add(e), this.bypassOptions.canvasManager.addShadowRoot(e);
      const n = Vd({
        ...this.bypassOptions,
        doc: t,
        mutationCb: this.mutationCb,
        mirror: this.mirror,
        shadowDomManager: this
      }, e);
      this.restoreHandlers.push((() => n.disconnect())), this.restoreHandlers.push(Gd({
        ...this.bypassOptions,
        scrollCb: this.scrollCb,
        doc: e,
        mirror: this.mirror
      })), Td((() => {
        e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(e.host)), this.restoreHandlers.push(Qd({
          mirror: this.mirror,
          stylesheetManager: this.bypassOptions.stylesheetManager
        }, e))
      }), 0)
    }
    observeAttachShadow(e) {
      const t = Ld(e),
        n = function(e) {
          try {
            return e.contentWindow
          } catch (e) {}
        }(e);
      t && n && this.patchAttachShadow(n.Element, t)
    }
    patchAttachShadow(e, t) {
      const n = this;
      this.restoreHandlers.push(ud(e.prototype, "attachShadow", (function(e) {
        return function(r) {
          const o = e.call(this, r);
          return this.shadowRoot && Ed(this) && n.addShadowRoot(this.shadowRoot, t), o
        }
      })))
    }
    reset() {
      this.restoreHandlers.forEach((e => {
        try {
          e()
        } catch (e) {}
      })), this.restoreHandlers = [], this.shadowDoms = new WeakSet, this.bypassOptions.canvasManager.resetShadowRoots()
    }
  }
  for (var cp = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), up = 0; up < 64; up++) cp["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(up)] = up; class lp {
    reset() {}
    freeze() {}
    unfreeze() {}
    lock() {}
    unlock() {}
    snapshot() {}
    addWindow() {}
    addShadowRoot() {}
    resetShadowRoots() {}
  }
  class dp {
    constructor(e) {
      this.trackedLinkElements = new WeakSet, this.styleMirror = new wd, this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb
    }
    attachLinkElement(e, t) {
      "_cssText" in t.attributes && this.mutationCb({
        adds: [],
        removes: [],
        texts: [],
        attributes: [{
          id: t.id,
          attributes: t.attributes
        }]
      }), this.trackLinkElement(e)
    }
    trackLinkElement(e) {
      this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e))
    }
    adoptStyleSheets(e, t) {
      if (0 === e.length) return;
      const n = {
          id: t,
          styleIds: []
        },
        r = [];
      for (const t of e) {
        let e;
        this.styleMirror.has(t) ? e = this.styleMirror.getId(t) : (e = this.styleMirror.add(t), r.push({
          styleId: e,
          rules: Array.from(t.rules || CSSRule, ((e, t) => ({
            rule: bl(e),
            index: t
          })))
        })), n.styleIds.push(e)
      }
      r.length > 0 && (n.styles = r), this.adoptedStyleSheetCb(n)
    }
    reset() {
      this.styleMirror.reset(), this.trackedLinkElements = new WeakSet
    }
    trackStylesheetInLinkElement(e) {}
  }
  class pp {
    constructor() {
      this.nodeMap = new WeakMap, this.active = !1
    }
    inOtherBuffer(e, t) {
      const n = this.nodeMap.get(e);
      return n && Array.from(n).some((e => e !== t))
    }
    add(e, t) {
      this.active || (this.active = !0, function(...e) {
        Cd("requestAnimationFrame")(...e)
      }((() => {
        this.nodeMap = new WeakMap, this.active = !1
      }))), this.nodeMap.set(e, (this.nodeMap.get(e) || new Set).add(t))
    }
    destroy() {}
  }
  let hp, fp;
  try {
    if (2 !== Array.from([1], (e => 2 * e))[0]) {
      const e = document.createElement("iframe");
      document.body.appendChild(e), Array.from = e.contentWindow?.Array.from || Array.from, document.body.removeChild(e)
    }
  } catch (e) {
    console.debug("Unable to override Array.from", e)
  }
  const mp = new Sl;

  function gp(e = {}) {
    const {
      emit: t,
      checkoutEveryNms: n,
      checkoutEveryNth: r,
      blockClass: o = "rr-block",
      blockSelector: s = null,
      unblockSelector: i = null,
      ignoreClass: a = "rr-ignore",
      ignoreSelector: c = null,
      maskAllText: u = !1,
      maskTextClass: l = "rr-mask",
      unmaskTextClass: d = null,
      maskTextSelector: p = null,
      unmaskTextSelector: h = null,
      inlineStylesheet: f = !0,
      maskAllInputs: m,
      maskInputOptions: g,
      slimDOMOptions: _,
      maskAttributeFn: y,
      maskInputFn: v,
      maskTextFn: b,
      maxCanvasSize: S = null,
      packFn: w,
      sampling: k = {},
      dataURLOptions: E = {},
      mousemoveWait: x,
      recordDOM: C = !0,
      recordCanvas: T = !1,
      recordCrossOriginIframes: I = !1,
      recordAfter: M = ("DOMContentLoaded" === e.recordAfter ? e.recordAfter : "load"),
      userTriggeredOnInput: R = !1,
      collectFonts: O = !1,
      inlineImages: A = !1,
      plugins: L,
      keepIframeSrcFn: D = () => !1,
      ignoreCSSAttributes: N = new Set([]),
      errorHandler: P,
      onMutation: F,
      getCanvasManager: $
    } = e;
    Hd = P;
    const B = !I || window.parent === window;
    let U = !1;
    if (!B) try {
      window.parent.document && (U = !1)
    } catch (e) {
      U = !0
    }
    if (B && !t) throw new Error("emit function is required");
    if (!B && !U) return () => {};
    void 0 !== x && void 0 === k.mousemove && (k.mousemove = x), mp.reset();
    const j = !0 === m ? {
        color: !0,
        date: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
        textarea: !0,
        select: !0,
        radio: !0,
        checkbox: !0
      } : void 0 !== g ? g : {},
      H = !0 === _ || "all" === _ ? {
        script: !0,
        comment: !0,
        headFavicon: !0,
        headWhitespace: !0,
        headMetaSocial: !0,
        headMetaRobots: !0,
        headMetaHttpEquiv: !0,
        headMetaVerification: !0,
        headMetaAuthorship: "all" === _,
        headMetaDescKeywords: "all" === _
      } : _ || {};
    let z;
    ! function(e = window) {
      "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = (...e) => {
        let t = e[0];
        if (!(0 in e)) throw new TypeError("1 argument is required");
        do {
          if (this === t) return !0
        } while (t = t && t.parentNode);
        return !1
      })
    }();
    let q = 0;
    const W = e => {
      for (const t of L || []) t.eventProcessor && (e = t.eventProcessor(e));
      return w && !U && (e = w(e)), e
    };
    hp = (e, o) => {
      const s = e;
      if (s.timestamp = ld(), !qd[0]?.isFrozen() || s.type === Id.FullSnapshot || s.type === Id.IncrementalSnapshot && s.data.source === Md.Mutation || qd.forEach((e => e.unfreeze())), B) t?.(W(s), o);
      else if (U) {
        const e = {
          type: "rrweb",
          event: W(s),
          origin: window.location.origin,
          isCheckout: o
        };
        window.parent.postMessage(e, "*")
      }
      if (s.type === Id.FullSnapshot) z = s, q = 0;
      else if (s.type === Id.IncrementalSnapshot) {
        if (s.data.source === Md.Mutation && s.data.isAttachIframe) return;
        q++;
        const e = r && q >= r,
          t = n && z && s.timestamp - z.timestamp > n;
        (e || t) && ee(!0)
      }
    };
    const V = e => {
        hp({
          type: Id.IncrementalSnapshot,
          data: {
            source: Md.Mutation,
            ...e
          }
        })
      },
      G = e => hp({
        type: Id.IncrementalSnapshot,
        data: {
          source: Md.Scroll,
          ...e
        }
      }),
      J = e => hp({
        type: Id.IncrementalSnapshot,
        data: {
          source: Md.CanvasMutation,
          ...e
        }
      }),
      K = new dp({
        mutationCb: V,
        adoptedStyleSheetCb: e => hp({
          type: Id.IncrementalSnapshot,
          data: {
            source: Md.AdoptedStyleSheet,
            ...e
          }
        })
      }),
      Y = "boolean" == typeof __RRWEB_EXCLUDE_IFRAME__ && __RRWEB_EXCLUDE_IFRAME__ ? new op : new sp({
        mirror: mp,
        mutationCb: V,
        stylesheetManager: K,
        recordCrossOriginIframes: I,
        wrappedEmit: hp
      });
    for (const e of L || []) e.getMirror && e.getMirror({
      nodeMirror: mp,
      crossOriginIframeMirror: Y.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: Y.crossOriginIframeStyleMirror
    });
    const X = new pp,
      Z = function(e, t) {
        try {
          return e ? e(t) : new lp
        } catch {
          return console.warn("Unable to initialize CanvasManager"), new lp
        }
      }($, {
        mirror: mp,
        win: window,
        mutationCb: e => hp({
          type: Id.IncrementalSnapshot,
          data: {
            source: Md.CanvasMutation,
            ...e
          }
        }),
        recordCanvas: T,
        blockClass: o,
        blockSelector: s,
        unblockSelector: i,
        maxCanvasSize: S,
        sampling: k.canvas,
        dataURLOptions: E,
        errorHandler: P
      }),
      Q = "boolean" == typeof __RRWEB_EXCLUDE_SHADOW_DOM__ && __RRWEB_EXCLUDE_SHADOW_DOM__ ? new ip : new ap({
        mutationCb: V,
        scrollCb: G,
        bypassOptions: {
          onMutation: F,
          blockClass: o,
          blockSelector: s,
          unblockSelector: i,
          maskAllText: u,
          maskTextClass: l,
          unmaskTextClass: d,
          maskTextSelector: p,
          unmaskTextSelector: h,
          inlineStylesheet: f,
          maskInputOptions: j,
          dataURLOptions: E,
          maskAttributeFn: y,
          maskTextFn: b,
          maskInputFn: v,
          recordCanvas: T,
          inlineImages: A,
          sampling: k,
          slimDOMOptions: H,
          iframeManager: Y,
          stylesheetManager: K,
          canvasManager: Z,
          keepIframeSrcFn: D,
          processedNodeManager: X
        },
        mirror: mp
      }),
      ee = (e = !1) => {
        if (!C) return;
        hp({
          type: Id.Meta,
          data: {
            href: window.location.href,
            width: hd(),
            height: pd()
          }
        }, e), K.reset(), Q.init(), qd.forEach((e => e.lock()));
        const t = function(e, t) {
          const {
            mirror: n = new Sl,
            blockClass: r = "rr-block",
            blockSelector: o = null,
            unblockSelector: s = null,
            maskAllText: i = !1,
            maskTextClass: a = "rr-mask",
            unmaskTextClass: c = null,
            maskTextSelector: u = null,
            unmaskTextSelector: l = null,
            inlineStylesheet: d = !0,
            inlineImages: p = !1,
            recordCanvas: h = !1,
            maskAllInputs: f = !1,
            maskAttributeFn: m,
            maskTextFn: g,
            maskInputFn: _,
            slimDOM: y = !1,
            dataURLOptions: v,
            preserveWhiteSpace: b,
            onSerialize: S,
            onIframeLoad: w,
            iframeLoadTimeout: k,
            onStylesheetLoad: E,
            stylesheetLoadTimeout: x,
            keepIframeSrcFn: C = () => !1
          } = t || {};
          return rd(e, {
            doc: e,
            mirror: n,
            blockClass: r,
            blockSelector: o,
            unblockSelector: s,
            maskAllText: i,
            maskTextClass: a,
            unmaskTextClass: c,
            maskTextSelector: u,
            unmaskTextSelector: l,
            skipChild: !1,
            inlineStylesheet: d,
            maskInputOptions: !0 === f ? {
              color: !0,
              date: !0,
              "datetime-local": !0,
              email: !0,
              month: !0,
              number: !0,
              range: !0,
              search: !0,
              tel: !0,
              text: !0,
              time: !0,
              url: !0,
              week: !0,
              textarea: !0,
              select: !0
            } : !1 === f ? {} : f,
            maskAttributeFn: m,
            maskTextFn: g,
            maskInputFn: _,
            slimDOMOptions: !0 === y || "all" === y ? {
              script: !0,
              comment: !0,
              headFavicon: !0,
              headWhitespace: !0,
              headMetaDescKeywords: "all" === y,
              headMetaSocial: !0,
              headMetaRobots: !0,
              headMetaHttpEquiv: !0,
              headMetaAuthorship: !0,
              headMetaVerification: !0
            } : !1 === y ? {} : y,
            dataURLOptions: v,
            inlineImages: p,
            recordCanvas: h,
            preserveWhiteSpace: b,
            onSerialize: S,
            onIframeLoad: w,
            iframeLoadTimeout: k,
            onStylesheetLoad: E,
            stylesheetLoadTimeout: x,
            keepIframeSrcFn: C,
            newlyAddedElement: !1
          })
        }(document, {
          mirror: mp,
          blockClass: o,
          blockSelector: s,
          unblockSelector: i,
          maskAllText: u,
          maskTextClass: l,
          unmaskTextClass: d,
          maskTextSelector: p,
          unmaskTextSelector: h,
          inlineStylesheet: f,
          maskAllInputs: j,
          maskAttributeFn: y,
          maskInputFn: v,
          maskTextFn: b,
          slimDOM: H,
          dataURLOptions: E,
          recordCanvas: T,
          inlineImages: A,
          onSerialize: e => {
            vd(e, mp) && Y.addIframe(e), bd(e, mp) && K.trackLinkElement(e), Sd(e) && Q.addShadowRoot(e.shadowRoot, document)
          },
          onIframeLoad: (e, t) => {
            Y.attachIframe(e, t), e.contentWindow && Z.addWindow(e.contentWindow), Q.observeAttachShadow(e)
          },
          onStylesheetLoad: (e, t) => {
            K.attachLinkElement(e, t)
          },
          keepIframeSrcFn: D
        });
        if (!t) return console.warn("Failed to snapshot the document");
        hp({
          type: Id.FullSnapshot,
          data: {
            node: t,
            initialOffset: dd(window)
          }
        }), qd.forEach((e => e.unlock())), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && K.adoptStyleSheets(document.adoptedStyleSheets, mp.getId(document))
      };
    fp = ee;
    try {
      const e = [],
        t = e => zd(ep)({
          onMutation: F,
          mutationCb: V,
          mousemoveCb: (e, t) => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: t,
              positions: e
            }
          }),
          mouseInteractionCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.MouseInteraction,
              ...e
            }
          }),
          scrollCb: G,
          viewportResizeCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.ViewportResize,
              ...e
            }
          }),
          inputCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.Input,
              ...e
            }
          }),
          mediaInteractionCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.MediaInteraction,
              ...e
            }
          }),
          styleSheetRuleCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.StyleSheetRule,
              ...e
            }
          }),
          styleDeclarationCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.StyleDeclaration,
              ...e
            }
          }),
          canvasMutationCb: J,
          fontCb: e => hp({
            type: Id.IncrementalSnapshot,
            data: {
              source: Md.Font,
              ...e
            }
          }),
          selectionCb: e => {
            hp({
              type: Id.IncrementalSnapshot,
              data: {
                source: Md.Selection,
                ...e
              }
            })
          },
          customElementCb: e => {
            hp({
              type: Id.IncrementalSnapshot,
              data: {
                source: Md.CustomElement,
                ...e
              }
            })
          },
          blockClass: o,
          ignoreClass: a,
          ignoreSelector: c,
          maskAllText: u,
          maskTextClass: l,
          unmaskTextClass: d,
          maskTextSelector: p,
          unmaskTextSelector: h,
          maskInputOptions: j,
          inlineStylesheet: f,
          sampling: k,
          recordDOM: C,
          recordCanvas: T,
          inlineImages: A,
          userTriggeredOnInput: R,
          collectFonts: O,
          doc: e,
          maskAttributeFn: y,
          maskInputFn: v,
          maskTextFn: b,
          keepIframeSrcFn: D,
          blockSelector: s,
          unblockSelector: i,
          slimDOMOptions: H,
          dataURLOptions: E,
          mirror: mp,
          iframeManager: Y,
          stylesheetManager: K,
          shadowDomManager: Q,
          processedNodeManager: X,
          canvasManager: Z,
          ignoreCSSAttributes: N,
          plugins: L?.filter((e => e.observer))?.map((e => ({
            observer: e.observer,
            options: e.options,
            callback: t => hp({
              type: Id.Plugin,
              data: {
                plugin: e.name,
                payload: t
              }
            })
          }))) || []
        }, {});
      Y.addLoadListener((n => {
        try {
          e.push(t(n.contentDocument))
        } catch (e) {
          console.warn(e)
        }
      }));
      const n = () => {
        ee(), e.push(t(document))
      };
      return "interactive" === document.readyState || "complete" === document.readyState ? n() : (e.push(od("DOMContentLoaded", (() => {
        hp({
          type: Id.DomContentLoaded,
          data: {}
        }), "DOMContentLoaded" === M && n()
      }))), e.push(od("load", (() => {
        hp({
          type: Id.Load,
          data: {}
        }), "load" === M && n()
      }), window))), () => {
        e.forEach((e => e())), X.destroy(), fp = void 0, Hd = void 0
      }
    } catch (e) {
      console.warn(e)
    }
  }
  var _p, yp;

  function vp(e) {
    return e > 9999999999 ? e : 1e3 * e
  }

  function bp(e) {
    return e > 9999999999 ? e / 1e3 : e
  }

  function Sp(e, t) {
    "sentry.transaction" !== t.category && (["ui.click", "ui.input"].includes(t.category) ? e.triggerUserActivity() : e.checkAndHandleExpiredSession(), e.addUpdate((() => (e.throttledAddEvent({
      type: Id.Custom,
      timestamp: 1e3 * (t.timestamp || 0),
      data: {
        tag: "breadcrumb",
        payload: Hr(t, 10, 1e3)
      }
    }), "console" === t.category))))
  }

  function wp(e) {
    return e.closest("button,a") || e
  }

  function kp(e) {
    const t = Ep(e);
    return t && t instanceof Element ? wp(t) : t
  }

  function Ep(e) {
    return function(e) {
      return "object" == typeof e && !!e && "target" in e
    }(e) ? e.target : e
  }
  let xp; gp.mirror = mp, gp.takeFullSnapshot = function(e) {
    if (!fp) throw new Error("please take full snapshot after start recording");
    fp(e)
  }, (yp = _p || (_p = {}))[yp.NotStarted = 0] = "NotStarted", yp[yp.Running = 1] = "Running", yp[yp.Stopped = 2] = "Stopped";
  const Cp = new Set([Md.Mutation, Md.StyleSheetRule, Md.StyleDeclaration, Md.AdoptedStyleSheet, Md.CanvasMutation, Md.Selection, Md.MediaInteraction]); class Tp {
    constructor(e, t, n = Sp) {
      this._lastMutation = 0, this._lastScroll = 0, this._clicks = [], this._timeout = t.timeout / 1e3, this._threshold = t.threshold / 1e3, this._scrollTimeout = t.scrollTimeout / 1e3, this._replay = e, this._ignoreSelector = t.ignoreSelector, this._addBreadcrumbEvent = n
    }
    addListeners() {
      const e = (t = () => {
        this._lastMutation = Mp()
      }, xp || (xp = [], F(cl, "open", (function(e) {
        return function(...t) {
          if (xp) try {
            xp.forEach((e => e()))
          } catch (e) {}
          return e.apply(cl, t)
        }
      }))), xp.push(t), () => {
        const e = xp ? xp.indexOf(t) : -1;
        e > -1 && xp.splice(e, 1)
      });
      var t;
      this._teardown = () => {
        e(), this._clicks = [], this._lastMutation = 0, this._lastScroll = 0
      }
    }
    removeListeners() {
      this._teardown && this._teardown(), this._checkClickTimeout && clearTimeout(this._checkClickTimeout)
    }
    handleClick(e, t) {
      if (function(e, t) {
          return !Ip.includes(e.tagName) || ("INPUT" === e.tagName && !["submit", "button"].includes(e.getAttribute("type") || "") || (!("A" !== e.tagName || !(e.hasAttribute("download") || e.hasAttribute("target") && "_self" !== e.getAttribute("target"))) || !(!t || !e.matches(t))))
        }(t, this._ignoreSelector) || ! function(e) {
          return !(!e.data || "number" != typeof e.data.nodeId || !e.timestamp)
        }(e)) return;
      const n = {
        timestamp: bp(e.timestamp),
        clickBreadcrumb: e,
        clickCount: 0,
        node: t
      };
      this._clicks.some((e => e.node === n.node && Math.abs(e.timestamp - n.timestamp) < 1)) || (this._clicks.push(n), 1 === this._clicks.length && this._scheduleCheckClicks())
    }
    registerMutation(e = Date.now()) {
      this._lastMutation = bp(e)
    }
    registerScroll(e = Date.now()) {
      this._lastScroll = bp(e)
    }
    registerClick(e) {
      const t = wp(e);
      this._handleMultiClick(t)
    }
    _handleMultiClick(e) {
      this._getClicks(e).forEach((e => {
        e.clickCount++
      }))
    }
    _getClicks(e) {
      return this._clicks.filter((t => t.node === e))
    }
    _checkClicks() {
      const e = [],
        t = Mp();
      this._clicks.forEach((n => {
        !n.mutationAfter && this._lastMutation && (n.mutationAfter = n.timestamp <= this._lastMutation ? this._lastMutation - n.timestamp : void 0), !n.scrollAfter && this._lastScroll && (n.scrollAfter = n.timestamp <= this._lastScroll ? this._lastScroll - n.timestamp : void 0), n.timestamp + this._timeout <= t && e.push(n)
      }));
      for (const t of e) {
        const e = this._clicks.indexOf(t);
        e > -1 && (this._generateBreadcrumbs(t), this._clicks.splice(e, 1))
      }
      this._clicks.length && this._scheduleCheckClicks()
    }
    _generateBreadcrumbs(e) {
      const t = this._replay,
        n = e.scrollAfter && e.scrollAfter <= this._scrollTimeout,
        r = e.mutationAfter && e.mutationAfter <= this._threshold,
        o = !n && !r,
        {
          clickCount: s,
          clickBreadcrumb: i
        } = e;
      if (o) {
        const n = 1e3 * Math.min(e.mutationAfter || this._timeout, this._timeout),
          r = n < 1e3 * this._timeout ? "mutation" : "timeout",
          o = {
            type: "default",
            message: i.message,
            timestamp: i.timestamp,
            category: "ui.slowClickDetected",
            data: {
              ...i.data,
              url: cl.location.href,
              route: t.getCurrentRoute(),
              timeAfterClickMs: n,
              endReason: r,
              clickCount: s || 1
            }
          };
        this._addBreadcrumbEvent(t, o)
      } else if (s > 1) {
        const e = {
          type: "default",
          message: i.message,
          timestamp: i.timestamp,
          category: "ui.multiClick",
          data: {
            ...i.data,
            url: cl.location.href,
            route: t.getCurrentRoute(),
            clickCount: s,
            metric: !0
          }
        };
        this._addBreadcrumbEvent(t, e)
      }
    }
    _scheduleCheckClicks() {
      this._checkClickTimeout && clearTimeout(this._checkClickTimeout), this._checkClickTimeout = Ia((() => this._checkClicks()), 1e3)
    }
  }
  const Ip = ["A", "BUTTON", "INPUT"];

  function Mp() {
    return Date.now() / 1e3
  }

  function Rp(e) {
    return {
      timestamp: Date.now() / 1e3,
      type: "default",
      ...e
    }
  }
  var Op = (e => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(Op || {});
  const Ap = new Set(["id", "class", "aria-label", "role", "name", "alt", "title", "data-test-id", "data-testid", "disabled", "aria-disabled", "data-sentry-component"]);

  function Lp(e) {
    const t = {};
    !e["data-sentry-component"] && e["data-sentry-element"] && (e["data-sentry-component"] = e["data-sentry-element"]);
    for (const n in e)
      if (Ap.has(n)) {
        let r = n;
        "data-testid" !== n && "data-test-id" !== n || (r = "testId"), t[r] = e[n]
      } return t
  }

  function Dp(e, t) {
    const n = gp.mirror.getId(e),
      r = n && gp.mirror.getNode(n),
      o = r && gp.mirror.getMeta(r),
      s = o && function(e) {
        return e.type === Op.Element
      }(o) ? o : null;
    return {
      message: t,
      data: s ? {
        nodeId: n,
        node: {
          id: n,
          tagName: s.tagName,
          textContent: Array.from(s.childNodes).map((e => e.type === Op.Text && e.textContent)).filter(Boolean).map((e => e.trim())).join(""),
          attributes: Lp(s.attributes)
        }
      } : {}
    }
  }
  const Np = {
    resource: function(e) {
      const {
        entryType: t,
        initiatorType: n,
        name: r,
        responseEnd: o,
        startTime: s,
        decodedBodySize: i,
        encodedBodySize: a,
        responseStatus: c,
        transferSize: u
      } = e;
      return ["fetch", "xmlhttprequest"].includes(n) ? null : {
        type: `${t}.${n}`,
        start: $p(s),
        end: $p(o),
        name: r,
        data: {
          size: u,
          statusCode: c,
          decodedBodySize: i,
          encodedBodySize: a
        }
      }
    },
    paint: function(e) {
      const {
        duration: t,
        entryType: n,
        name: r,
        startTime: o
      } = e, s = $p(o);
      return {
        type: n,
        name: r,
        start: s,
        end: s + t,
        data: void 0
      }
    },
    navigation: function(e) {
      const {
        entryType: t,
        name: n,
        decodedBodySize: r,
        duration: o,
        domComplete: s,
        encodedBodySize: i,
        domContentLoadedEventStart: a,
        domContentLoadedEventEnd: c,
        domInteractive: u,
        loadEventStart: l,
        loadEventEnd: d,
        redirectCount: p,
        startTime: h,
        transferSize: f,
        type: m
      } = e;
      return 0 === o ? null : {
        type: `${t}.${m}`,
        start: $p(h),
        end: $p(s),
        name: n,
        data: {
          size: f,
          decodedBodySize: r,
          encodedBodySize: i,
          duration: o,
          domInteractive: u,
          domContentLoadedEventStart: a,
          domContentLoadedEventEnd: c,
          loadEventStart: l,
          loadEventEnd: d,
          domComplete: s,
          redirectCount: p
        }
      }
    }
  };

  function Pp(e, t) {
    return ({
      metric: n
    }) => {
      t.replayPerformanceEntries.push(e(n))
    }
  }

  function Fp(e) {
    const t = Np[e.entryType];
    return t ? t(e) : null
  }

  function $p(e) {
    return ((ee() || cl.performance.timeOrigin) + e) / 1e3
  }

  function Bp(e) {
    const t = e.entries[e.entries.length - 1];
    return qp(e, "largest-contentful-paint", t?.element ? [t.element] : void 0)
  }

  function Up(e) {
    return void 0 !== e.sources
  }

  function jp(e) {
    const t = [],
      n = [];
    for (const r of e.entries)
      if (Up(r)) {
        const e = [];
        for (const t of r.sources)
          if (t.node) {
            n.push(t.node);
            const r = gp.mirror.getId(t.node);
            r && e.push(r)
          } t.push({
          value: r.value,
          nodeIds: e.length ? e : void 0
        })
      } return qp(e, "cumulative-layout-shift", n, t)
  }

  function Hp(e) {
    const t = e.entries[e.entries.length - 1];
    return qp(e, "first-input-delay", t?.target ? [t.target] : void 0)
  }

  function zp(e) {
    const t = e.entries[e.entries.length - 1];
    return qp(e, "interaction-to-next-paint", t?.target ? [t.target] : void 0)
  }

  function qp(e, t, n, r) {
    const o = e.value,
      s = e.rating,
      i = $p(o);
    return {
      type: "web-vital",
      name: t,
      start: i,
      end: i,
      data: {
        value: o,
        size: o,
        rating: s,
        nodeIds: n ? n.map((e => gp.mirror.getId(e))) : void 0,
        attributions: r
      }
    }
  }
  const Wp = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__, Vp = ["info", "warn", "error", "log"], Gp = "[Replay] ";

  function Jp(e, t = "info") {
    hs({
      category: "console",
      data: {
        logger: "replay"
      },
      level: t,
      message: `${Gp}${e}`
    }, {
      level: t
    })
  }
  const Kp = function() {
    let e = !1,
      t = !1;
    const n = {
      exception: () => {},
      infoTick: () => {},
      setConfig: n => {
        e = !!n.captureExceptions, t = !!n.traceInternals
      }
    };
    return Wp ? (Vp.forEach((e => {
      n[e] = (...n) => {
        A[e](Gp, ...n), t && Jp(n.join(""), Ss(e))
      }
    })), n.exception = (r, ...o) => {
      o.length && n.error && n.error(...o), A.error(Gp, r), e ? Gr(r) : t && Jp(r, "error")
    }, n.infoTick = (...e) => {
      A.info(Gp, ...e), t && setTimeout((() => Jp(e[0])), 0)
    }) : Vp.forEach((e => {
      n[e] = () => {}
    })), n
  }(); class Yp extends Error {
    constructor() {
      super("Event buffer exceeded maximum size of 20000000.")
    }
  }
  class Xp {
    constructor() {
      this.events = [], this._totalSize = 0, this.hasCheckout = !1, this.waitForCheckout = !1
    }
    get hasEvents() {
      return this.events.length > 0
    }
    get type() {
      return "sync"
    }
    destroy() {
      this.events = []
    }
    async addEvent(e) {
      const t = JSON.stringify(e).length;
      if (this._totalSize += t, this._totalSize > hl) throw new Yp;
      this.events.push(e)
    }
    finish() {
      return new Promise((e => {
        const t = this.events;
        this.clear(), e(JSON.stringify(t))
      }))
    }
    clear() {
      this.events = [], this._totalSize = 0, this.hasCheckout = !1
    }
    getEarliestTimestamp() {
      const e = this.events.map((e => e.timestamp)).sort()[0];
      return e ? vp(e) : null
    }
  }
  class Zp {
    constructor(e) {
      this._worker = e, this._id = 0
    }
    ensureReady() {
      return this._ensureReadyPromise || (this._ensureReadyPromise = new Promise(((e, t) => {
        this._worker.addEventListener("message", (({
          data: n
        }) => {
          n.success ? e() : t()
        }), {
          once: !0
        }), this._worker.addEventListener("error", (e => {
          t(e)
        }), {
          once: !0
        })
      }))), this._ensureReadyPromise
    }
    destroy() {
      Wp && Kp.info("Destroying compression worker"), this._worker.terminate()
    }
    postMessage(e, t) {
      const n = this._getAndIncrementId();
      return new Promise(((r, o) => {
        const s = ({
          data: t
        }) => {
          const i = t;
          if (i.method === e && i.id === n) {
            if (this._worker.removeEventListener("message", s), !i.success) return Wp && Kp.error("Error in compression worker: ", i.response), void o(new Error("Error in compression worker"));
            r(i.response)
          }
        };
        this._worker.addEventListener("message", s), this._worker.postMessage({
          id: n,
          method: e,
          arg: t
        })
      }))
    }
    _getAndIncrementId() {
      return this._id++
    }
  }
  class Qp {
    constructor(e) {
      this._worker = new Zp(e), this._earliestTimestamp = null, this._totalSize = 0, this.hasCheckout = !1, this.waitForCheckout = !1
    }
    get hasEvents() {
      return !!this._earliestTimestamp
    }
    get type() {
      return "worker"
    }
    ensureReady() {
      return this._worker.ensureReady()
    }
    destroy() {
      this._worker.destroy()
    }
    addEvent(e) {
      const t = vp(e.timestamp);
      (!this._earliestTimestamp || t < this._earliestTimestamp) && (this._earliestTimestamp = t);
      const n = JSON.stringify(e);
      return this._totalSize += n.length, this._totalSize > hl ? Promise.reject(new Yp) : this._sendEventToWorker(n)
    }
    finish() {
      return this._finishRequest()
    }
    clear() {
      this._earliestTimestamp = null, this._totalSize = 0, this.hasCheckout = !1, this._worker.postMessage("clear").then(null, (e => {
        Wp && Kp.exception(e, 'Sending "clear" message to worker failed', e)
      }))
    }
    getEarliestTimestamp() {
      return this._earliestTimestamp
    }
    _sendEventToWorker(e) {
      return this._worker.postMessage("addEvent", e)
    }
    async _finishRequest() {
      const e = await this._worker.postMessage("finish");
      return this._earliestTimestamp = null, this._totalSize = 0, e
    }
  }
  class eh {
    constructor(e) {
      this._fallback = new Xp, this._compression = new Qp(e), this._used = this._fallback, this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded()
    }
    get waitForCheckout() {
      return this._used.waitForCheckout
    }
    get type() {
      return this._used.type
    }
    get hasEvents() {
      return this._used.hasEvents
    }
    get hasCheckout() {
      return this._used.hasCheckout
    }
    set hasCheckout(e) {
      this._used.hasCheckout = e
    }
    set waitForCheckout(e) {
      this._used.waitForCheckout = e
    }
    destroy() {
      this._fallback.destroy(), this._compression.destroy()
    }
    clear() {
      return this._used.clear()
    }
    getEarliestTimestamp() {
      return this._used.getEarliestTimestamp()
    }
    addEvent(e) {
      return this._used.addEvent(e)
    }
    async finish() {
      return await this.ensureWorkerIsLoaded(), this._used.finish()
    }
    ensureWorkerIsLoaded() {
      return this._ensureWorkerIsLoadedPromise
    }
    async _ensureWorkerIsLoaded() {
      try {
        await this._compression.ensureReady()
      } catch (e) {
        return void(Wp && Kp.exception(e, "Failed to load the compression worker, falling back to simple buffer"))
      }
      await this._switchToCompressionWorker()
    }
    async _switchToCompressionWorker() {
      const {
        events: e,
        hasCheckout: t,
        waitForCheckout: n
      } = this._fallback, r = [];
      for (const t of e) r.push(this._compression.addEvent(t));
      this._compression.hasCheckout = t, this._compression.waitForCheckout = n, this._used = this._compression;
      try {
        await Promise.all(r), this._fallback.clear()
      } catch (e) {
        Wp && Kp.exception(e, "Failed to add events when switching buffers.")
      }
    }
  }

  function th() {
    try {
      return "sessionStorage" in cl && !!cl.sessionStorage
    } catch {
      return !1
    }
  }

  function nh(e) {
    return void 0 !== e && Math.random() < e
  }

  function rh(e) {
    if (th()) try {
      cl.sessionStorage.setItem(ul, JSON.stringify(e))
    } catch {}
  }

  function oh(e) {
    const t = Date.now();
    return {
      id: e.id || q(),
      started: e.started || t,
      lastActivity: e.lastActivity || t,
      segmentId: e.segmentId || 0,
      sampled: e.sampled,
      previousSessionId: e.previousSessionId
    }
  }

  function sh({
    sessionSampleRate: e,
    allowBuffering: t,
    stickySession: n = !1
  }, {
    previousSessionId: r
  } = {}) {
    const o = function(e, t) {
        return nh(e) ? "session" : !!t && "buffer"
      }(e, t),
      s = oh({
        sampled: o,
        previousSessionId: r
      });
    return n && rh(s), s
  }

  function ih(e, t, n = +new Date) {
    return null === e || void 0 === t || t < 0 || 0 !== t && e + t <= n
  }

  function ah(e, {
    maxReplayDuration: t,
    sessionIdleExpire: n,
    targetTime: r = Date.now()
  }) {
    return ih(e.started, t, r) || ih(e.lastActivity, n, r)
  }

  function ch(e, {
    sessionIdleExpire: t,
    maxReplayDuration: n
  }) {
    return !!ah(e, {
      sessionIdleExpire: t,
      maxReplayDuration: n
    }) && ("buffer" !== e.sampled || 0 !== e.segmentId)
  }

  function uh({
    sessionIdleExpire: e,
    maxReplayDuration: t,
    previousSessionId: n
  }, r) {
    const o = r.stickySession && function() {
      if (!th()) return null;
      try {
        const e = cl.sessionStorage.getItem(ul);
        if (!e) return null;
        const t = JSON.parse(e);
        return Wp && Kp.infoTick("Loading existing session"), oh(t)
      } catch {
        return null
      }
    }();
    return o ? ch(o, {
      sessionIdleExpire: e,
      maxReplayDuration: t
    }) ? (Wp && Kp.infoTick("Session in sessionStorage is expired, creating new one..."), sh(r, {
      previousSessionId: o.id
    })) : o : (Wp && Kp.infoTick("Creating new session"), sh(r, {
      previousSessionId: n
    }))
  }

  function lh(e, t, n) {
    return !!ph(e, t) && (dh(e, t, n), !0)
  }
  async function dh(e, t, n) {
    const {
      eventBuffer: r
    } = e;
    if (!r || r.waitForCheckout && !n) return null;
    const o = "buffer" === e.recordingMode;
    try {
      n && o && r.clear(), n && (r.hasCheckout = !0, r.waitForCheckout = !1);
      const s = function(e, t) {
        try {
          if ("function" == typeof t && function(e) {
              return e.type === Id.Custom
            }(e)) return t(e)
        } catch (e) {
          return Wp && Kp.exception(e, "An error occurred in the `beforeAddRecordingEvent` callback, skipping the event..."), null
        }
        return e
      }(t, e.getOptions().beforeAddRecordingEvent);
      if (!s) return;
      return await r.addEvent(s)
    } catch (t) {
      const n = t && t instanceof Yp,
        s = n ? "addEventSizeExceeded" : "addEvent";
      if (n && o) return r.clear(), r.waitForCheckout = !0, null;
      e.handleException(t), await e.stop({
        reason: s
      });
      const i = be();
      i && i.recordDroppedEvent("internal_sdk_error", "replay")
    }
  }

  function ph(e, t) {
    if (!e.eventBuffer || e.isPaused() || !e.isEnabled()) return !1;
    const n = vp(t.timestamp);
    return !(n + e.timeouts.sessionIdlePause < Date.now() || n > e.getContext().initialTimestamp + e.getOptions().maxReplayDuration && (Wp && Kp.infoTick(`Skipping event with timestamp ${n} because it is after maxReplayDuration`), 1))
  }

  function hh(e) {
    return !e.type
  }

  function fh(e) {
    return "transaction" === e.type
  }

  function mh(e) {
    return "feedback" === e.type
  }

  function gh(e) {
    return !!e.category
  }

  function _h() {
    const e = me().getPropagationContext().dsc;
    e && delete e.replay_id;
    const t = yr();
    t && delete xr(t).replay_id
  }

  function yh(e, t) {
    return t.map((({
      type: t,
      start: n,
      end: r,
      name: o,
      data: s
    }) => {
      const i = e.throttledAddEvent({
        type: Id.Custom,
        timestamp: n,
        data: {
          tag: "performanceSpan",
          payload: {
            op: t,
            description: o,
            startTimestamp: n,
            endTimestamp: r,
            data: s
          }
        }
      });
      return "string" == typeof i ? Promise.resolve(null) : i
    }))
  }

  function vh(e, t) {
    e.isEnabled() && null !== t && (function(e, t) {
      return (!Wp || !e.getOptions()._experiments.traceInternals) && qc(t, be())
    }(e, t.name) || e.addUpdate((() => (yh(e, [t]), !0))))
  }

  function bh(e) {
    if (!e) return;
    const t = new TextEncoder;
    try {
      if ("string" == typeof e) return t.encode(e).length;
      if (e instanceof URLSearchParams) return t.encode(e.toString()).length;
      if (e instanceof FormData) {
        const n = tu(e);
        return t.encode(n).length
      }
      if (e instanceof Blob) return e.size;
      if (e instanceof ArrayBuffer) return e.byteLength
    } catch {}
  }

  function Sh(e) {
    if (!e) return;
    const t = parseInt(e, 10);
    return isNaN(t) ? void 0 : t
  }

  function wh(e, t) {
    if (!e) return {
      headers: {},
      size: void 0,
      _meta: {
        warnings: [t]
      }
    };
    const n = {
        ...e._meta
      },
      r = n.warnings || [];
    return n.warnings = [...r, t], e._meta = n, e
  }

  function kh(e, t) {
    if (!t) return null;
    const {
      startTimestamp: n,
      endTimestamp: r,
      url: o,
      method: s,
      statusCode: i,
      request: a,
      response: c
    } = t;
    return {
      type: e,
      start: n / 1e3,
      end: r / 1e3,
      name: o,
      data: {
        method: s,
        statusCode: i,
        request: a,
        response: c
      }
    }
  }

  function Eh(e) {
    return {
      headers: {},
      size: e,
      _meta: {
        warnings: ["URL_SKIPPED"]
      }
    }
  }

  function xh(e, t, n) {
    if (!t && 0 === Object.keys(e).length) return;
    if (!t) return {
      headers: e
    };
    if (!n) return {
      headers: e,
      size: t
    };
    const r = {
        headers: e,
        size: t
      },
      {
        body: o,
        warnings: s
      } = function(e) {
        if (!e || "string" != typeof e) return {
          body: e
        };
        const t = e.length > dl,
          n = function(e) {
            const t = e[0],
              n = e[e.length - 1];
            return "[" === t && "]" === n || "{" === t && "}" === n
          }(e);
        if (t) {
          const t = e.slice(0, dl);
          return n ? {
            body: t,
            warnings: ["MAYBE_JSON_TRUNCATED"]
          } : {
            body: `${t}…`,
            warnings: ["TEXT_TRUNCATED"]
          }
        }
        if (n) try {
          return {
            body: JSON.parse(e)
          }
        } catch {}
        return {
          body: e
        }
      }(n);
    return r.body = o, s?.length && (r._meta = {
      warnings: s
    }), r
  }

  function Ch(e, t) {
    return Object.entries(e).reduce(((n, [r, o]) => {
      const s = r.toLowerCase();
      return t.includes(s) && e[r] && (n[s] = o), n
    }), {})
  }

  function Th(e, t) {
    const n = function(e, t = cl.document.baseURI) {
      if (e.startsWith("http://") || e.startsWith("https://") || e.startsWith(cl.location.origin)) return e;
      const n = new URL(e, t);
      if (n.origin !== new URL(t).origin) return e;
      const r = n.href;
      return !e.endsWith("/") && r.endsWith("/") ? r.slice(0, -1) : r
    }(e);
    return P(n, t)
  }

  function Ih(e, t) {
    const n = {};
    return t.forEach((t => {
      e.get(t) && (n[t] = e.get(t))
    })), n
  }

  function Mh(e, t) {
    if (!e) return {};
    const n = e.headers;
    return n ? n instanceof Headers ? Ih(n, t) : Array.isArray(n) ? {} : Ch(n, t) : {}
  }

  function Rh(e) {
    const t = be();
    try {
      const {
        networkDetailAllowUrls: n,
        networkDetailDenyUrls: r,
        networkCaptureBodies: o,
        networkRequestHeaders: s,
        networkResponseHeaders: i
      } = e.getOptions(), a = {
        replay: e,
        networkDetailAllowUrls: n,
        networkDetailDenyUrls: r,
        networkCaptureBodies: o,
        networkRequestHeaders: s,
        networkResponseHeaders: i
      };
      t && t.on("beforeAddBreadcrumb", ((e, t) => function(e, t, n) {
        if (t.data) try {
          (function(e) {
            return "xhr" === e.category
          })(t) && function(e) {
            return e?.xhr
          }(n) && (function(e, t) {
            const {
              xhr: n,
              input: r
            } = t;
            if (!n) return;
            const o = bh(r),
              s = n.getResponseHeader("content-length") ? Sh(n.getResponseHeader("content-length")) : function(e, t) {
                try {
                  return bh("json" === t && e && "object" == typeof e ? JSON.stringify(e) : e)
                } catch {
                  return
                }
              }(n.response, n.responseType);
            void 0 !== o && (e.data.request_body_size = o), void 0 !== s && (e.data.response_body_size = s)
          }(t, n), async function(e, t, n) {
            try {
              const r = function(e, t, n) {
                  const r = Date.now(),
                    {
                      startTimestamp: o = r,
                      endTimestamp: s = r,
                      input: i,
                      xhr: a
                    } = t,
                    {
                      url: c,
                      method: u,
                      status_code: l = 0,
                      request_body_size: d,
                      response_body_size: p
                    } = e.data;
                  if (!c) return null;
                  if (!a || !Th(c, n.networkDetailAllowUrls) || Th(c, n.networkDetailDenyUrls)) return {
                    startTimestamp: o,
                    endTimestamp: s,
                    url: c,
                    method: u,
                    statusCode: l,
                    request: Eh(d),
                    response: Eh(p)
                  };
                  const h = a[hc],
                    f = h ? Ch(h.request_headers, n.networkRequestHeaders) : {},
                    m = Ch(function(e) {
                      const t = e.getAllResponseHeaders();
                      return t ? t.split("\r\n").reduce(((e, t) => {
                        const [n, r] = t.split(": ");
                        return r && (e[n.toLowerCase()] = r), e
                      }), {}) : {}
                    }(a), n.networkResponseHeaders),
                    [g, _] = n.networkCaptureBodies ? nu(i, Kp) : [void 0],
                    [y, v] = n.networkCaptureBodies ? function(e) {
                      const t = [];
                      try {
                        return [e.responseText]
                      } catch (e) {
                        t.push(e)
                      }
                      try {
                        return function(e, t) {
                          try {
                            if ("string" == typeof e) return [e];
                            if (e instanceof Document) return [e.body.outerHTML];
                            if ("json" === t && e && "object" == typeof e) return [JSON.stringify(e)];
                            if (!e) return [void 0]
                          } catch (t) {
                            return Wp && Kp.exception(t, "Failed to serialize body", e), [void 0, "BODY_PARSE_ERROR"]
                          }
                          return Wp && Kp.info("Skipping network body because of body type", e), [void 0, "UNPARSEABLE_BODY_TYPE"]
                        }(e.response, e.responseType)
                      } catch (e) {
                        t.push(e)
                      }
                      return Wp && Kp.warn("Failed to get xhr response body", ...t), [void 0]
                    }(a) : [void 0],
                    b = xh(f, d, g),
                    S = xh(m, p, y);
                  return {
                    startTimestamp: o,
                    endTimestamp: s,
                    url: c,
                    method: u,
                    statusCode: l,
                    request: _ ? wh(b, _) : b,
                    response: v ? wh(S, v) : S
                  }
                }(e, t, n),
                o = kh("resource.xhr", r);
              vh(n.replay, o)
            } catch (e) {
              Wp && Kp.exception(e, "Failed to capture xhr breadcrumb")
            }
          }(t, n, e)),
          function(e) {
            return "fetch" === e.category
          }(t) && function(e) {
            return e?.response
          }(n) && (function(e, t) {
            const {
              input: n,
              response: r
            } = t, o = bh(n ? ru(n) : void 0), s = r ? Sh(r.headers.get("content-length")) : void 0;
            void 0 !== o && (e.data.request_body_size = o), void 0 !== s && (e.data.response_body_size = s)
          }(t, n), async function(e, t, n) {
            try {
              const r = await async function(e, t, n) {
                const r = Date.now(),
                  {
                    startTimestamp: o = r,
                    endTimestamp: s = r
                  } = t,
                  {
                    url: i,
                    method: a,
                    status_code: c = 0,
                    request_body_size: u,
                    response_body_size: l
                  } = e.data,
                  d = Th(i, n.networkDetailAllowUrls) && !Th(i, n.networkDetailDenyUrls),
                  p = d ? function({
                    networkCaptureBodies: e,
                    networkRequestHeaders: t
                  }, n, r) {
                    const o = n ? (i = t, 1 === (s = n).length && "string" != typeof s[0] ? Mh(s[0], i) : 2 === s.length ? Mh(s[1], i) : {}) : {};
                    var s, i;
                    if (!e) return xh(o, r, void 0);
                    const a = ru(n),
                      [c, u] = nu(a, Kp),
                      l = xh(o, r, c);
                    return u ? wh(l, u) : l
                  }(n, t.input, u) : Eh(u),
                  h = await async function(e, {
                    networkCaptureBodies: t,
                    networkResponseHeaders: n
                  }, r, o) {
                    if (!e && void 0 !== o) return Eh(o);
                    const s = r ? Ih(r.headers, n) : {};
                    if (!r || !t && void 0 !== o) return xh(s, o, void 0);
                    const [i, a] = await async function(e) {
                      const t = function(e) {
                        try {
                          return e.clone()
                        } catch (e) {
                          Wp && Kp.exception(e, "Failed to clone response body")
                        }
                      }(e);
                      if (!t) return [void 0, "BODY_PARSE_ERROR"];
                      try {
                        const e = await
                        function(e) {
                          return new Promise(((t, n) => {
                            const r = Ia((() => n(new Error("Timeout while trying to read response body"))), 500);
                            (async function(e) {
                              return await e.text()
                            })(e).then((e => t(e)), (e => n(e))).finally((() => clearTimeout(r)))
                          }))
                        }(t);
                        return [e]
                      } catch (e) {
                        return e instanceof Error && e.message.indexOf("Timeout") > -1 ? (Wp && Kp.warn("Parsing text body from response timed out"), [void 0, "BODY_PARSE_TIMEOUT"]) : (Wp && Kp.exception(e, "Failed to get text body from response"), [void 0, "BODY_PARSE_ERROR"])
                      }
                    }(r), c = function(e, {
                      networkCaptureBodies: t,
                      responseBodySize: n,
                      captureDetails: r,
                      headers: o
                    }) {
                      try {
                        const s = e?.length && void 0 === n ? bh(e) : n;
                        return r ? xh(o, s, t ? e : void 0) : Eh(s)
                      } catch (e) {
                        return Wp && Kp.exception(e, "Failed to serialize response body"), xh(o, n, void 0)
                      }
                    }(i, {
                      networkCaptureBodies: t,
                      responseBodySize: o,
                      captureDetails: e,
                      headers: s
                    });
                    return a ? wh(c, a) : c
                  }(d, n, t.response, l);
                return {
                  startTimestamp: o,
                  endTimestamp: s,
                  url: i,
                  method: a,
                  statusCode: c,
                  request: p,
                  response: h
                }
              }(e, t, n), o = kh("resource.fetch", r);
              vh(n.replay, o)
            } catch (e) {
              Wp && Kp.exception(e, "Failed to capture fetch breadcrumb")
            }
          }(t, n, e))
        } catch (e) {
          Wp && Kp.exception(e, "Error when enriching network breadcrumb")
        }
      }(a, e, t)))
    } catch {}
  }

  function Oh(e) {
    const {
      jsHeapSizeLimit: t,
      totalJSHeapSize: n,
      usedJSHeapSize: r
    } = e, o = Date.now() / 1e3;
    return {
      type: "memory",
      name: "memory",
      start: o,
      end: o,
      data: {
        memory: {
          jsHeapSizeLimit: t,
          totalJSHeapSize: n,
          usedJSHeapSize: r
        }
      }
    }
  }
  const Ah = r.navigator;

  function Lh(e) {
    let t = !1;
    return (n, r) => {
      if (!e.checkAndHandleExpiredSession()) return void(Wp && Kp.warn("Received replay event after session expired."));
      const o = r || !t;
      t = !0, e.clickDetector && function(e, t) {
        try {
          if (! function(e) {
              return 3 === e.type
            }(t)) return;
          const {
            source: n
          } = t.data;
          if (Cp.has(n) && e.registerMutation(t.timestamp), n === Md.Scroll && e.registerScroll(t.timestamp), function(e) {
              return e.data.source === Md.MouseInteraction
            }(t)) {
            const {
              type: n,
              id: r
            } = t.data, o = gp.mirror.getNode(r);
            o instanceof HTMLElement && n === Rd.Click && e.registerClick(o)
          }
        } catch {}
      }(e.clickDetector, n), e.addUpdate((() => {
        if ("buffer" === e.recordingMode && o && e.setInitialState(), !lh(e, n, o)) return !0;
        if (!o) return !1;
        const t = e.session;
        if (function(e, t) {
            t && e.session && 0 === e.session.segmentId && lh(e, function(e) {
              const t = e.getOptions();
              return {
                type: Id.Custom,
                timestamp: Date.now(),
                data: {
                  tag: "options",
                  payload: {
                    shouldRecordCanvas: e.isRecordingCanvas(),
                    sessionSampleRate: t.sessionSampleRate,
                    errorSampleRate: t.errorSampleRate,
                    useCompressionOption: t.useCompression,
                    blockAllMedia: t.blockAllMedia,
                    maskAllText: t.maskAllText,
                    maskAllInputs: t.maskAllInputs,
                    useCompression: !!e.eventBuffer && "worker" === e.eventBuffer.type,
                    networkDetailHasUrls: t.networkDetailAllowUrls.length > 0,
                    networkCaptureBodies: t.networkCaptureBodies,
                    networkRequestHasHeaders: t.networkRequestHeaders.length > 0,
                    networkResponseHasHeaders: t.networkResponseHeaders.length > 0
                  }
                }
              }
            }(e), !1)
          }(e, o), "buffer" === e.recordingMode && t && e.eventBuffer) {
          const n = e.eventBuffer.getEarliestTimestamp();
          n && (Wp && Kp.info(`Updating session start time to earliest event in buffer to ${new Date(n)}`), t.started = n, e.getOptions().stickySession && rh(t))
        }
        return t?.previousSessionId || "session" === e.recordingMode && e.flush(), !0
      }))
    }
  }
  class Dh extends Error {
    constructor(e) {
      super(`Transport returned status code ${e}`)
    }
  }
  class Nh extends Error {
    constructor(e) {
      super("Rate limit hit"), this.rateLimits = e
    }
  }
  async function Ph(e, t = {
    count: 0,
    interval: 5e3
  }) {
    const {
      recordingData: n,
      onError: r
    } = e;
    if (n.length) try {
      return await async function({
        recordingData: e,
        replayId: t,
        segmentId: n,
        eventContext: r,
        timestamp: o,
        session: s
      }) {
        const i = function({
            recordingData: e,
            headers: t
          }) {
            let n;
            const r = `${JSON.stringify(t)}\n`;
            if ("string" == typeof e) n = `${r}${e}`;
            else {
              const t = (new TextEncoder).encode(r);
              n = new Uint8Array(t.length + e.length), n.set(t), n.set(e, t.length)
            }
            return n
          }({
            recordingData: e,
            headers: {
              segment_id: n
            }
          }),
          {
            urls: a,
            errorIds: c,
            traceIds: u,
            initialTimestamp: l
          } = r,
          d = be(),
          p = me(),
          h = d?.getTransport(),
          f = d?.getDsn();
        if (!(d && h && f && s.sampled)) return mn({});
        const m = {
            type: "replay_event",
            replay_start_timestamp: l / 1e3,
            timestamp: o / 1e3,
            error_ids: c,
            trace_ids: u,
            urls: a,
            replay_id: t,
            segment_id: n,
            replay_type: s.sampled
          },
          g = await async function({
            client: e,
            scope: t,
            replayId: n,
            event: r
          }) {
            const o = {
              event_id: n,
              integrations: "object" != typeof e._integrations || null === e._integrations || Array.isArray(e._integrations) ? void 0 : Object.keys(e._integrations)
            };
            e.emit("preprocessEvent", r, o);
            const s = await Wr(e.getOptions(), r, o, t, e, ge());
            if (!s) return null;
            e.emit("postprocessEvent", s, o), s.platform = s.platform || "javascript";
            const i = e.getSdkMetadata(),
              {
                name: a,
                version: c
              } = i?.sdk || {};
            return s.sdk = {
              ...s.sdk,
              name: a || "sentry.javascript.unknown",
              version: c || "0.0.0"
            }, s
          }({
            scope: p,
            client: d,
            replayId: t,
            event: m
          });
        if (!g) return d.recordDroppedEvent("event_processor", "replay"), Wp && Kp.info("An event processor returned `null`, will not send event."), mn({});
        delete g.sdkProcessingMetadata;
        const _ = function(e, t, n, r) {
          return Co(Fo(e, Po(e), r, n), [
            [{
              type: "replay_event"
            }, e],
            [{
              type: "replay_recording",
              length: "string" == typeof t ? (new TextEncoder).encode(t).length : t.length
            }, t]
          ])
        }(g, i, f, d.getOptions().tunnel);
        let y;
        try {
          y = await h.send(_)
        } catch (e) {
          const t = new Error(ll);
          try {
            t.cause = e
          } catch {}
          throw t
        }
        if ("number" == typeof y.statusCode && (y.statusCode < 200 || y.statusCode >= 300)) throw new Dh(y.statusCode);
        const v = Xs({}, y);
        if (Ys(v, "replay")) throw new Nh(v);
        return y
      }(e), !0
    } catch (n) {
      if (n instanceof Dh || n instanceof Nh) throw n;
      if (Yr("Replays", {
          _retryCount: t.count
        }), r && r(n), t.count >= 3) {
        const e = new Error(`${ll} - max retries exceeded`);
        try {
          e.cause = n
        } catch {}
        throw e
      }
      return t.interval *= ++t.count, new Promise(((n, r) => {
        Ia((async () => {
          try {
            await Ph(e, t), n(!0)
          } catch (e) {
            r(e)
          }
        }), t.interval)
      }))
    }
  }
  const Fh = "__THROTTLED"; class $h {
    constructor({
      options: e,
      recordingOptions: t
    }) {
      this.eventBuffer = null, this.performanceEntries = [], this.replayPerformanceEntries = [], this.recordingMode = "session", this.timeouts = {
        sessionIdlePause: 3e5,
        sessionIdleExpire: 9e5
      }, this._lastActivity = Date.now(), this._isEnabled = !1, this._isPaused = !1, this._requiresManualStart = !1, this._hasInitializedCoreListeners = !1, this._context = {
        errorIds: new Set,
        traceIds: new Set,
        urls: [],
        initialTimestamp: Date.now(),
        initialUrl: ""
      }, this._recordingOptions = t, this._options = e, this._debouncedFlush = function(e, t, n) {
        return function(e, t, n) {
          let r, o, s;
          const i = n?.maxWait ? Math.max(n.maxWait, t) : 0,
            a = n?.setTimeoutImpl || setTimeout;

          function c() {
            return u(), r = e(), r
          }

          function u() {
            void 0 !== o && clearTimeout(o), void 0 !== s && clearTimeout(s), o = s = void 0
          }

          function l() {
            return o && clearTimeout(o), o = a(c, t), i && void 0 === s && (s = a(c, i)), r
          }
          return l.cancel = u, l.flush = function() {
            return void 0 !== o || void 0 !== s ? c() : r
          }, l
        }(e, t, {
          ...n,
          setTimeoutImpl: Ia
        })
      }((() => this._flush()), this._options.flushMinDelay, {
        maxWait: this._options.flushMaxDelay
      }), this._throttledAddEvent = function(e, t, n) {
        const r = new Map;
        let o = !1;
        return (...s) => {
          const i = Math.floor(Date.now() / 1e3);
          if ((e => {
              const t = e - n;
              r.forEach(((e, n) => {
                n < t && r.delete(n)
              }))
            })(i), [...r.values()].reduce(((e, t) => e + t), 0) >= t) {
            const e = o;
            return o = !0, e ? "__SKIPPED" : Fh
          }
          o = !1;
          const a = r.get(i) || 0;
          return r.set(i, a + 1), e(...s)
        }
      }(((e, t) => function(e, t, n) {
        return ph(e, t) ? dh(e, t, n) : Promise.resolve(null)
      }(this, e, t)), 300, 5);
      const {
        slowClickTimeout: n,
        slowClickIgnoreSelectors: r
      } = this.getOptions(), o = n ? {
        threshold: Math.min(3e3, n),
        timeout: n,
        scrollTimeout: 300,
        ignoreSelector: r ? r.join(",") : ""
      } : void 0;
      if (o && (this.clickDetector = new Tp(this, o)), Wp) {
        const t = e._experiments;
        Kp.setConfig({
          captureExceptions: !!t.captureExceptions,
          traceInternals: !!t.traceInternals
        })
      }
      this._handleVisibilityChange = () => {
        "visible" === cl.document.visibilityState ? this._doChangeToForegroundTasks() : this._doChangeToBackgroundTasks()
      }, this._handleWindowBlur = () => {
        const e = Rp({
          category: "ui.blur"
        });
        this._doChangeToBackgroundTasks(e)
      }, this._handleWindowFocus = () => {
        const e = Rp({
          category: "ui.focus"
        });
        this._doChangeToForegroundTasks(e)
      }, this._handleKeyboardEvent = e => {
        ! function(e, t) {
          if (!e.isEnabled()) return;
          e.updateUserActivity();
          const n = function(e) {
            const {
              metaKey: t,
              shiftKey: n,
              ctrlKey: r,
              altKey: o,
              key: s,
              target: i
            } = e;
            if (!i || function(e) {
                return "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.isContentEditable
              }(i) || !s) return null;
            const a = t || r || o,
              c = 1 === s.length;
            if (!a && c) return null;
            const u = x(i, {
              maxStringLength: 200
            }) || "<unknown>";
            return Rp({
              category: "ui.keyDown",
              message: u,
              data: {
                ...Dp(i, u).data,
                metaKey: t,
                shiftKey: n,
                ctrlKey: r,
                altKey: o,
                key: s
              }
            })
          }(t);
          n && Sp(e, n)
        }(this, e)
      }
    }
    getContext() {
      return this._context
    }
    isEnabled() {
      return this._isEnabled
    }
    isPaused() {
      return this._isPaused
    }
    isRecordingCanvas() {
      return Boolean(this._canvas)
    }
    getOptions() {
      return this._options
    }
    handleException(e) {
      Wp && Kp.exception(e), this._options.onError && this._options.onError(e)
    }
    initializeSampling(e) {
      const {
        errorSampleRate: t,
        sessionSampleRate: n
      } = this._options, r = t <= 0 && n <= 0;
      this._requiresManualStart = r, r || (this._initializeSessionForSampling(e), this.session ? !1 !== this.session.sampled && (this.recordingMode = "buffer" === this.session.sampled && 0 === this.session.segmentId ? "buffer" : "session", Wp && Kp.infoTick(`Starting replay in ${this.recordingMode} mode`), this._initializeRecording()) : Wp && Kp.exception(new Error("Unable to initialize and create session")))
    }
    start() {
      if (this._isEnabled && "session" === this.recordingMode) return void(Wp && Kp.info("Recording is already in progress"));
      if (this._isEnabled && "buffer" === this.recordingMode) return void(Wp && Kp.info("Buffering is in progress, call `flush()` to save the replay"));
      Wp && Kp.infoTick("Starting replay in session mode"), this._updateUserActivity();
      const e = uh({
        maxReplayDuration: this._options.maxReplayDuration,
        sessionIdleExpire: this.timeouts.sessionIdleExpire
      }, {
        stickySession: this._options.stickySession,
        sessionSampleRate: 1,
        allowBuffering: !1
      });
      this.session = e, this._initializeRecording()
    }
    startBuffering() {
      if (this._isEnabled) return void(Wp && Kp.info("Buffering is in progress, call `flush()` to save the replay"));
      Wp && Kp.infoTick("Starting replay in buffer mode");
      const e = uh({
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration
      }, {
        stickySession: this._options.stickySession,
        sessionSampleRate: 0,
        allowBuffering: !0
      });
      this.session = e, this.recordingMode = "buffer", this._initializeRecording()
    }
    startRecording() {
      try {
        const e = this._canvas;
        this._stopRecording = gp({
          ...this._recordingOptions,
          ..."buffer" === this.recordingMode ? {
            checkoutEveryNms: 6e4
          } : this._options._experiments.continuousCheckout && {
            checkoutEveryNms: Math.max(36e4, this._options._experiments.continuousCheckout)
          },
          emit: Lh(this),
          .../iPhone|iPad|iPod/i.test(Ah?.userAgent ?? "") || /Macintosh/i.test(Ah?.userAgent ?? "") && Ah?.maxTouchPoints && Ah?.maxTouchPoints > 1 ? {
            sampling: {
              mousemove: !1
            }
          } : {},
          onMutation: this._onMutationHandler.bind(this),
          ...e ? {
            recordCanvas: e.recordCanvas,
            getCanvasManager: e.getCanvasManager,
            sampling: e.sampling,
            dataURLOptions: e.dataURLOptions
          } : {}
        })
      } catch (e) {
        this.handleException(e)
      }
    }
    stopRecording() {
      try {
        return this._stopRecording && (this._stopRecording(), this._stopRecording = void 0), !0
      } catch (e) {
        return this.handleException(e), !1
      }
    }
    async stop({
      forceFlush: e = !1,
      reason: t
    } = {}) {
      if (this._isEnabled) {
        this._isEnabled = !1;
        try {
          Wp && Kp.info("Stopping Replay" + (t ? ` triggered by ${t}` : "")), _h(), this._removeListeners(), this.stopRecording(), this._debouncedFlush.cancel(), e && await this._flush({
              force: !0
            }), this.eventBuffer?.destroy(), this.eventBuffer = null, n = this,
            function() {
              if (th()) try {
                cl.sessionStorage.removeItem(ul)
              } catch {}
            }(), n.session = void 0
        } catch (e) {
          this.handleException(e)
        }
      }
      var n
    }
    pause() {
      this._isPaused || (this._isPaused = !0, this.stopRecording(), Wp && Kp.info("Pausing replay"))
    }
    resume() {
      this._isPaused && this._checkSession() && (this._isPaused = !1, this.startRecording(), Wp && Kp.info("Resuming replay"))
    }
    async sendBufferedReplayOrFlush({
      continueRecording: e = !0
    } = {}) {
      if ("session" === this.recordingMode) return this.flushImmediate();
      const t = Date.now();
      Wp && Kp.info("Converting buffer to session"), await this.flushImmediate();
      const n = this.stopRecording();
      e && n && "session" !== this.recordingMode && (this.recordingMode = "session", this.session && (this._updateUserActivity(t), this._updateSessionActivity(t), this._maybeSaveSession()), this.startRecording())
    }
    addUpdate(e) {
      const t = e();
      "buffer" !== this.recordingMode && !0 !== t && this._debouncedFlush()
    }
    triggerUserActivity() {
      if (this._updateUserActivity(), this._stopRecording) this.checkAndHandleExpiredSession(), this._updateSessionActivity();
      else {
        if (!this._checkSession()) return;
        this.resume()
      }
    }
    updateUserActivity() {
      this._updateUserActivity(), this._updateSessionActivity()
    }
    conditionalFlush() {
      return "buffer" === this.recordingMode ? Promise.resolve() : this.flushImmediate()
    }
    flush() {
      return this._debouncedFlush()
    }
    flushImmediate() {
      return this._debouncedFlush(), this._debouncedFlush.flush()
    }
    cancelFlush() {
      this._debouncedFlush.cancel()
    }
    getSessionId() {
      return this.session?.id
    }
    checkAndHandleExpiredSession() {
      if (!(this._lastActivity && ih(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && "session" === this.session.sampled)) return !!this._checkSession();
      this.pause()
    }
    setInitialState() {
      const e = `${cl.location.pathname}${cl.location.hash}${cl.location.search}`,
        t = `${cl.location.origin}${e}`;
      this.performanceEntries = [], this.replayPerformanceEntries = [], this._clearContext(), this._context.initialUrl = t, this._context.initialTimestamp = Date.now(), this._context.urls.push(t)
    }
    throttledAddEvent(e, t) {
      const n = this._throttledAddEvent(e, t);
      if (n === Fh) {
        const e = Rp({
          category: "replay.throttled"
        });
        this.addUpdate((() => !lh(this, {
          type: 5,
          timestamp: e.timestamp || 0,
          data: {
            tag: "breadcrumb",
            payload: e,
            metric: !0
          }
        })))
      }
      return n
    }
    getCurrentRoute() {
      const e = this.lastActiveSpan || yr(),
        t = e && _r(e),
        n = (t && lr(t).data || {})[vn];
      if (t && n && ["route", "custom"].includes(n)) return lr(t).description
    }
    _initializeRecording() {
      this.setInitialState(), this._updateSessionActivity(), this.eventBuffer = function({
        useCompression: e,
        workerUrl: t
      }) {
        if (e && window.Worker) {
          const e = function(e) {
            try {
              const t = e || ("undefined" != typeof __SENTRY_EXCLUDE_REPLAY_WORKER__ && __SENTRY_EXCLUDE_REPLAY_WORKER__ ? "" : function() {
                const e = new Blob(['var t=Uint8Array,n=Uint16Array,r=Int32Array,e=new t([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new t([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new t([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(t,e){for(var i=new n(31),s=0;s<31;++s)i[s]=e+=1<<t[s-1];var a=new r(i[30]);for(s=1;s<30;++s)for(var o=i[s];o<i[s+1];++o)a[o]=o-i[s]<<5|s;return{b:i,r:a}},o=a(e,2),h=o.b,f=o.r;h[28]=258,f[258]=28;for(var l=a(i,0).r,u=new n(32768),c=0;c<32768;++c){var v=(43690&c)>>1|(21845&c)<<1;v=(61680&(v=(52428&v)>>2|(13107&v)<<2))>>4|(3855&v)<<4,u[c]=((65280&v)>>8|(255&v)<<8)>>1}var d=function(t,r,e){for(var i=t.length,s=0,a=new n(r);s<i;++s)t[s]&&++a[t[s]-1];var o,h=new n(r);for(s=1;s<r;++s)h[s]=h[s-1]+a[s-1]<<1;if(e){o=new n(1<<r);var f=15-r;for(s=0;s<i;++s)if(t[s])for(var l=s<<4|t[s],c=r-t[s],v=h[t[s]-1]++<<c,d=v|(1<<c)-1;v<=d;++v)o[u[v]>>f]=l}else for(o=new n(i),s=0;s<i;++s)t[s]&&(o[s]=u[h[t[s]-1]++]>>15-t[s]);return o},p=new t(288);for(c=0;c<144;++c)p[c]=8;for(c=144;c<256;++c)p[c]=9;for(c=256;c<280;++c)p[c]=7;for(c=280;c<288;++c)p[c]=8;var g=new t(32);for(c=0;c<32;++c)g[c]=5;var w=d(p,9,0),y=d(g,5,0),m=function(t){return(t+7)/8|0},b=function(n,r,e){return(null==e||e>n.length)&&(e=n.length),new t(n.subarray(r,e))},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(t,n,r){var e=new Error(n||M[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,E),!r)throw e;return e},z=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8},_=function(t,n,r){r<<=7&n;var e=n/8|0;t[e]|=r,t[e+1]|=r>>8,t[e+2]|=r>>16},x=function(r,e){for(var i=[],s=0;s<r.length;++s)r[s]&&i.push({s:s,f:r[s]});var a=i.length,o=i.slice();if(!a)return{t:F,l:0};if(1==a){var h=new t(i[0].s+1);return h[i[0].s]=1,{t:h,l:1}}i.sort((function(t,n){return t.f-n.f})),i.push({s:-1,f:25001});var f=i[0],l=i[1],u=0,c=1,v=2;for(i[0]={s:-1,f:f.f+l.f,l:f,r:l};c!=a-1;)f=i[i[u].f<i[v].f?u++:v++],l=i[u!=c&&i[u].f<i[v].f?u++:v++],i[c++]={s:-1,f:f.f+l.f,l:f,r:l};var d=o[0].s;for(s=1;s<a;++s)o[s].s>d&&(d=o[s].s);var p=new n(d+1),g=A(i[c-1],p,0);if(g>e){s=0;var w=0,y=g-e,m=1<<y;for(o.sort((function(t,n){return p[n.s]-p[t.s]||t.f-n.f}));s<a;++s){var b=o[s].s;if(!(p[b]>e))break;w+=m-(1<<g-p[b]),p[b]=e}for(w>>=y;w>0;){var M=o[s].s;p[M]<e?w-=1<<e-p[M]++-1:++s}for(;s>=0&&w;--s){var E=o[s].s;p[E]==e&&(--p[E],++w)}g=e}return{t:new t(p),l:g}},A=function(t,n,r){return-1==t.s?Math.max(A(t.l,n,r+1),A(t.r,n,r+1)):n[t.s]=r},D=function(t){for(var r=t.length;r&&!t[--r];);for(var e=new n(++r),i=0,s=t[0],a=1,o=function(t){e[i++]=t},h=1;h<=r;++h)if(t[h]==s&&h!=r)++a;else{if(!s&&a>2){for(;a>138;a-=138)o(32754);a>2&&(o(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(o(s),--a;a>6;a-=6)o(8304);a>2&&(o(a-3<<5|8208),a=0)}for(;a--;)o(s);a=1,s=t[h]}return{c:e.subarray(0,i),n:r}},T=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},k=function(t,n,r){var e=r.length,i=m(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var s=0;s<e;++s)t[i+s+4]=r[s];return 8*(i+4+e)},U=function(t,r,a,o,h,f,l,u,c,v,m){z(r,m++,a),++h[256];for(var b=x(h,15),M=b.t,E=b.l,A=x(f,15),U=A.t,C=A.l,F=D(M),I=F.c,S=F.n,L=D(U),O=L.c,j=L.n,q=new n(19),B=0;B<I.length;++B)++q[31&I[B]];for(B=0;B<O.length;++B)++q[31&O[B]];for(var G=x(q,7),H=G.t,J=G.l,K=19;K>4&&!H[s[K-1]];--K);var N,P,Q,R,V=v+5<<3,W=T(h,p)+T(f,g)+l,X=T(h,M)+T(f,U)+l+14+3*K+T(q,H)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&V<=W&&V<=X)return k(r,m,t.subarray(c,c+v));if(z(r,m,1+(X<W)),m+=2,X<W){N=d(M,E,0),P=M,Q=d(U,C,0),R=U;var Y=d(H,J,0);z(r,m,S-257),z(r,m+5,j-1),z(r,m+10,K-4),m+=14;for(B=0;B<K;++B)z(r,m+3*B,H[s[B]]);m+=3*K;for(var Z=[I,O],$=0;$<2;++$){var tt=Z[$];for(B=0;B<tt.length;++B){var nt=31&tt[B];z(r,m,Y[nt]),m+=H[nt],nt>15&&(z(r,m,tt[B]>>5&127),m+=tt[B]>>12)}}}else N=w,P=p,Q=y,R=g;for(B=0;B<u;++B){var rt=o[B];if(rt>255){_(r,m,N[(nt=rt>>18&31)+257]),m+=P[nt+257],nt>7&&(z(r,m,rt>>23&31),m+=e[nt]);var et=31&rt;_(r,m,Q[et]),m+=R[et],et>3&&(_(r,m,rt>>5&8191),m+=i[et])}else _(r,m,N[rt]),m+=P[rt]}return _(r,m,N[256]),m+P[256]},C=new r([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),F=new t(0),I=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),S=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=I[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}},L=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,s=0|r.length,a=0;a!=s;){for(var o=Math.min(a+2655,s);a<o;++a)i+=e+=r[a];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},O=function(s,a,o,h,u){if(!u&&(u={l:1},a.dictionary)){var c=a.dictionary.subarray(-32768),v=new t(c.length+s.length);v.set(c),v.set(s,c.length),s=v,u.w=c.length}return function(s,a,o,h,u,c){var v=c.z||s.length,d=new t(h+v+5*(1+Math.ceil(v/7e3))+u),p=d.subarray(h,d.length-u),g=c.l,w=7&(c.r||0);if(a){w&&(p[0]=c.r>>3);for(var y=C[a-1],M=y>>13,E=8191&y,z=(1<<o)-1,_=c.p||new n(32768),x=c.h||new n(z+1),A=Math.ceil(o/3),D=2*A,T=function(t){return(s[t]^s[t+1]<<A^s[t+2]<<D)&z},F=new r(25e3),I=new n(288),S=new n(32),L=0,O=0,j=c.i||0,q=0,B=c.w||0,G=0;j+2<v;++j){var H=T(j),J=32767&j,K=x[H];if(_[J]=K,x[H]=J,B<=j){var N=v-j;if((L>7e3||q>24576)&&(N>423||!g)){w=U(s,p,0,F,I,S,O,q,G,j-G,w),q=L=O=0,G=j;for(var P=0;P<286;++P)I[P]=0;for(P=0;P<30;++P)S[P]=0}var Q=2,R=0,V=E,W=J-K&32767;if(N>2&&H==T(j-W))for(var X=Math.min(M,N)-1,Y=Math.min(32767,j),Z=Math.min(258,N);W<=Y&&--V&&J!=K;){if(s[j+Q]==s[j+Q-W]){for(var $=0;$<Z&&s[j+$]==s[j+$-W];++$);if($>Q){if(Q=$,R=W,$>X)break;var tt=Math.min(W,$-2),nt=0;for(P=0;P<tt;++P){var rt=j-W+P&32767,et=rt-_[rt]&32767;et>nt&&(nt=et,K=rt)}}}W+=(J=K)-(K=_[J])&32767}if(R){F[q++]=268435456|f[Q]<<18|l[R];var it=31&f[Q],st=31&l[R];O+=e[it]+i[st],++I[257+it],++S[st],B=j+Q,++L}else F[q++]=s[j],++I[s[j]]}}for(j=Math.max(j,B);j<v;++j)F[q++]=s[j],++I[s[j]];w=U(s,p,g,F,I,S,O,q,G,j-G,w),g||(c.r=7&w|p[w/8|0]<<3,w-=7,c.h=x,c.p=_,c.i=j,c.w=B)}else{for(j=c.w||0;j<v+g;j+=65535){var at=j+65535;at>=v&&(p[w/8|0]=g,at=v),w=k(p,w+1,s.subarray(j,at))}c.i=v}return b(d,0,h+m(w)+u)}(s,null==a.level?6:a.level,null==a.mem?u.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(s.length)))):20:12+a.mem,o,h,u)},j=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},q=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&j(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}},B=function(t){return 10+(t.filename?t.filename.length+1:0)},G=function(){function n(n,r){if("function"==typeof n&&(r=n,n={}),this.ondata=r,this.o=n||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new t(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return n.prototype.p=function(t,n){this.ondata(O(t,this.o,0,0,this.s),n)},n.prototype.push=function(n,r){this.ondata||E(5),this.s.l&&E(4);var e=n.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new t(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var s=this.b.length-this.s.z;this.b.set(n.subarray(0,s),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(n.subarray(s),32768),this.s.z=n.length-s+32768,this.s.i=32766,this.s.w=32768}else this.b.set(n,this.s.z),this.s.z+=n.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},n.prototype.flush=function(){this.ondata||E(5),this.s.l&&E(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},n}();var H=function(){function t(t,n){this.c=L(),this.v=1,G.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),G.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=O(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=L();i.p(n.dictionary),j(t,2,i.d())}}(r,this.o),this.v=0),n&&j(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(){G.prototype.flush.call(this)},t}(),J="undefined"!=typeof TextEncoder&&new TextEncoder,K="undefined"!=typeof TextDecoder&&new TextDecoder;try{K.decode(F,{stream:!0})}catch(t){}var N=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||E(5),this.d&&E(4),this.ondata(P(t),this.d=n||!1)},t}();function P(n,r){if(J)return J.encode(n);for(var e=n.length,i=new t(n.length+(n.length>>1)),s=0,a=function(t){i[s++]=t},o=0;o<e;++o){if(s+5>i.length){var h=new t(s+8+(e-o<<1));h.set(i),i=h}var f=n.charCodeAt(o);f<128||r?a(f):f<2048?(a(192|f>>6),a(128|63&f)):f>55295&&f<57344?(a(240|(f=65536+(1047552&f)|1023&n.charCodeAt(++o))>>18),a(128|f>>12&63),a(128|f>>6&63),a(128|63&f)):(a(224|f>>12),a(128|f>>6&63),a(128|63&f))}return b(i,0,s)}function Q(t){return function(t,n){n||(n={});var r=S(),e=t.length;r.p(t);var i=O(t,n,B(n),8),s=i.length;return q(i,n),j(i,s-8,r.d()),j(i,s-4,e),i}(P(t))}const R=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const n=this._hasEvents?",":"";this.stream.push(n+t),this._hasEvents=!0}finish(){this.stream.push("]",!0);const t=function(t){let n=0;for(const r of t)n+=r.length;const r=new Uint8Array(n);for(let n=0,e=0,i=t.length;n<i;n++){const i=t[n];r.set(i,e),e+=i.length}return r}(this._deflatedData);return this._init(),t}_init(){this._hasEvents=!1,this._deflatedData=[],this.deflate=new H,this.deflate.ondata=(t,n)=>{this._deflatedData.push(t)},this.stream=new N(((t,n)=>{this.deflate.push(t,n)})),this.stream.push("[")}},V={clear:()=>{R.clear()},addEvent:t=>R.addEvent(t),finish:()=>R.finish(),compress:t=>Q(t)};addEventListener("message",(function(t){const n=t.data.method,r=t.data.id,e=t.data.arg;if(n in V&&"function"==typeof V[n])try{const t=V[n](e);postMessage({id:r,method:n,success:!0,response:t})}catch(t){postMessage({id:r,method:n,success:!1,response:t.message}),console.error(t)}})),postMessage({id:void 0,method:"init",success:!0,response:void 0});']);
                return URL.createObjectURL(e)
              }());
              if (!t) return;
              Wp && Kp.info("Using compression worker" + (e ? ` from ${e}` : ""));
              const n = new Worker(t);
              return new eh(n)
            } catch (e) {
              Wp && Kp.exception(e, "Failed to create compression worker")
            }
          }(t);
          if (e) return e
        }
        return Wp && Kp.info("Using simple buffer"), new Xp
      }({
        useCompression: this._options.useCompression,
        workerUrl: this._options.workerUrl
      }), this._removeListeners(), this._addListeners(), this._isEnabled = !0, this._isPaused = !1, this.startRecording()
    }
    _initializeSessionForSampling(e) {
      const t = this._options.errorSampleRate > 0,
        n = uh({
          sessionIdleExpire: this.timeouts.sessionIdleExpire,
          maxReplayDuration: this._options.maxReplayDuration,
          previousSessionId: e
        }, {
          stickySession: this._options.stickySession,
          sessionSampleRate: this._options.sessionSampleRate,
          allowBuffering: t
        });
      this.session = n
    }
    _checkSession() {
      if (!this.session) return !1;
      const e = this.session;
      return !ch(e, {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration
      }) || (this._refreshSession(e), !1)
    }
    async _refreshSession(e) {
      this._isEnabled && (await this.stop({
        reason: "refresh session"
      }), this.initializeSampling(e.id))
    }
    _addListeners() {
      try {
        cl.document.addEventListener("visibilitychange", this._handleVisibilityChange), cl.addEventListener("blur", this._handleWindowBlur), cl.addEventListener("focus", this._handleWindowFocus), cl.addEventListener("keydown", this._handleKeyboardEvent), this.clickDetector && this.clickDetector.addListeners(), this._hasInitializedCoreListeners || (function(e, {
          autoFlushOnFeedback: t
        }) {
          const n = be();
          lc((e => t => {
              if (!e.isEnabled()) return;
              const n = function(e) {
                const {
                  target: t,
                  message: n
                } = function(e) {
                  const t = "click" === e.name;
                  let n, r = null;
                  try {
                    r = t ? kp(e.event) : Ep(e.event), n = x(r, {
                      maxStringLength: 200
                    }) || "<unknown>"
                  } catch (e) {
                    n = "<unknown>"
                  }
                  return {
                    target: r,
                    message: n
                  }
                }(e);
                return Rp({
                  category: `ui.${e.name}`,
                  ...Dp(t, n)
                })
              }(t);
              if (!n) return;
              const r = "click" === t.name,
                o = r ? t.event : void 0;
              var s, i, a;
              !(r && e.clickDetector && o && o.target) || o.altKey || o.metaKey || o.ctrlKey || o.shiftKey || (s = e.clickDetector, i = n, a = kp(t.event), s.handleClick(i, a)), Sp(e, n)
            })(e)), _c(function(e) {
              return t => {
                if (!e.isEnabled()) return;
                const n = function(e) {
                  const {
                    from: t,
                    to: n
                  } = e, r = Date.now() / 1e3;
                  return {
                    type: "navigation.push",
                    start: r,
                    end: r,
                    name: n,
                    data: {
                      previous: t
                    }
                  }
                }(t);
                null !== n && (e.getContext().urls.push(n.name), e.triggerUserActivity(), e.addUpdate((() => (yh(e, [n]), !1))))
              }
            }(e)),
            function(e) {
              const t = be();
              t && t.on("beforeAddBreadcrumb", (t => function(e, t) {
                if (!e.isEnabled() || !gh(t)) return;
                const n = function(e) {
                  return !gh(e) || ["fetch", "xhr", "sentry.event", "sentry.transaction"].includes(e.category) || e.category.startsWith("ui.") ? null : "console" === e.category ? function(e) {
                    const t = e.data?.arguments;
                    if (!Array.isArray(t) || 0 === t.length) return Rp(e);
                    let n = !1;
                    const r = t.map((e => {
                      if (!e) return e;
                      if ("string" == typeof e) return e.length > pl ? (n = !0, `${e.slice(0,pl)}…`) : e;
                      if ("object" == typeof e) try {
                        const t = Hr(e, 7);
                        return JSON.stringify(t).length > pl ? (n = !0, `${JSON.stringify(t,null,2).slice(0,pl)}…`) : t
                      } catch {}
                      return e
                    }));
                    return Rp({
                      ...e,
                      data: {
                        ...e.data,
                        arguments: r,
                        ...n ? {
                          _meta: {
                            warnings: ["CONSOLE_ARG_TRUNCATED"]
                          }
                        } : {}
                      }
                    })
                  }(e) : Rp(e)
                }(t);
                n && Sp(e, n)
              }(e, t)))
            }(e), Rh(e), ao(function(e) {
              return Object.assign(((t, n) => {
                if (!e.isEnabled() || e.isPaused()) return t;
                if (function(e) {
                    return "replay_event" === e.type
                  }(t)) return delete t.breadcrumbs, t;
                if (!hh(t) && !fh(t) && !mh(t)) return t;
                if (!e.checkAndHandleExpiredSession()) return _h(), t;
                if (mh(t)) return e.flush(), t.contexts.feedback.replay_id = e.getSessionId(),
                  function(e, t) {
                    e.triggerUserActivity(), e.addUpdate((() => !t.timestamp || (e.throttledAddEvent({
                      type: Id.Custom,
                      timestamp: 1e3 * t.timestamp,
                      data: {
                        tag: "breadcrumb",
                        payload: {
                          timestamp: t.timestamp,
                          type: "default",
                          category: "sentry.feedback",
                          data: {
                            feedbackId: t.event_id
                          }
                        }
                      }
                    }), !1)))
                  }(e, t), t;
                if (function(e, t) {
                    return !(e.type || !e.exception || !e.exception.values || !e.exception.values.length || !t.originalException?.__rrweb__)
                  }(t, n) && !e.getOptions()._experiments.captureExceptions) return Wp && Kp.log("Ignoring error from rrweb internals", t), null;
                const r = function(e, t) {
                  return "buffer" === e.recordingMode && t.message !== ll && !(!t.exception || t.type) && nh(e.getOptions().errorSampleRate)
                }(e, t);
                return (r || "session" === e.recordingMode) && (t.tags = {
                  ...t.tags,
                  replayId: e.getSessionId()
                }), t
              }), {
                id: "Replay"
              })
            }(e)), n && (n.on("beforeSendEvent", function(e) {
              return t => {
                e.isEnabled() && hh(t) && function(e, t) {
                  const n = t.exception?.values?.[0]?.value;
                  "string" == typeof n && (n.match(/(reactjs\.org\/docs\/error-decoder\.html\?invariant=|react\.dev\/errors\/)(418|419|422|423|425)/) || n.match(/(does not match server-rendered HTML|Hydration failed because)/i)) && Sp(e, Rp({
                    category: "replay.hydrate-error",
                    data: {
                      url: T()
                    }
                  }))
                }(e, t)
              }
            }(e)), n.on("afterSendEvent", function(e) {
              return (t, n) => {
                if (!e.isEnabled() || !hh(t) && !fh(t)) return;
                const r = n?.statusCode;
                !r || r < 200 || r >= 300 || (fh(t) ? function(e, t) {
                  const n = e.getContext();
                  t.contexts?.trace?.trace_id && n.traceIds.size < 100 && n.traceIds.add(t.contexts.trace.trace_id)
                }(e, t) : function(e, t) {
                  const n = e.getContext();
                  if (t.event_id && n.errorIds.size < 100 && n.errorIds.add(t.event_id), "buffer" !== e.recordingMode || !t.tags || !t.tags.replayId) return;
                  const {
                    beforeErrorSampling: r
                  } = e.getOptions();
                  ("function" != typeof r || r(t)) && Ia((async () => {
                    try {
                      await e.sendBufferedReplayOrFlush()
                    } catch (t) {
                      e.handleException(t)
                    }
                  }))
                }(e, t))
              }
            }(e)), n.on("createDsc", (t => {
              const n = e.getSessionId();
              n && e.isEnabled() && "session" === e.recordingMode && e.checkAndHandleExpiredSession() && (t.replay_id = n)
            })), n.on("spanStart", (t => {
              e.lastActiveSpan = t
            })), n.on("spanEnd", (t => {
              e.lastActiveSpan = t
            })), n.on("beforeSendFeedback", (async (n, r) => {
              const o = e.getSessionId();
              r?.includeReplay && e.isEnabled() && o && n.contexts?.feedback && ("api" === n.contexts.feedback.source && t && await e.flush(), n.contexts.feedback.replay_id = o)
            })), t && n.on("openFeedbackWidget", (async () => {
              await e.flush()
            })))
        }(this, {
          autoFlushOnFeedback: this._options._experiments.autoFlushOnFeedback
        }), this._hasInitializedCoreListeners = !0)
      } catch (e) {
        this.handleException(e)
      }
      this._performanceCleanupCallback = function(e) {
        function t(t) {
          e.performanceEntries.includes(t) || e.performanceEntries.push(t)
        }

        function n({
          entries: e
        }) {
          e.forEach(t)
        }
        const r = [];
        return ["navigation", "paint", "resource"].forEach((e => {
          r.push(Zu(e, n))
        })), r.push(Ku(Pp(Bp, e)), Ju(Pp(jp, e)), Yu(Pp(Hp, e)), Xu(Pp(zp, e))), () => {
          r.forEach((e => e()))
        }
      }(this)
    }
    _removeListeners() {
      try {
        cl.document.removeEventListener("visibilitychange", this._handleVisibilityChange), cl.removeEventListener("blur", this._handleWindowBlur), cl.removeEventListener("focus", this._handleWindowFocus), cl.removeEventListener("keydown", this._handleKeyboardEvent), this.clickDetector && this.clickDetector.removeListeners(), this._performanceCleanupCallback && this._performanceCleanupCallback()
      } catch (e) {
        this.handleException(e)
      }
    }
    _doChangeToBackgroundTasks(e) {
      this.session && (ah(this.session, {
        maxReplayDuration: this._options.maxReplayDuration,
        sessionIdleExpire: this.timeouts.sessionIdleExpire
      }) || (e && this._createCustomBreadcrumb(e), this.conditionalFlush()))
    }
    _doChangeToForegroundTasks(e) {
      this.session && (this.checkAndHandleExpiredSession() ? e && this._createCustomBreadcrumb(e) : Wp && Kp.info("Document has become active, but session has expired"))
    }
    _updateUserActivity(e = Date.now()) {
      this._lastActivity = e
    }
    _updateSessionActivity(e = Date.now()) {
      this.session && (this.session.lastActivity = e, this._maybeSaveSession())
    }
    _createCustomBreadcrumb(e) {
      this.addUpdate((() => {
        this.throttledAddEvent({
          type: Id.Custom,
          timestamp: e.timestamp || 0,
          data: {
            tag: "breadcrumb",
            payload: e
          }
        })
      }))
    }
    _addPerformanceEntries() {
      let e = (t = this.performanceEntries, t.map(Fp).filter(Boolean)).concat(this.replayPerformanceEntries);
      var t;
      if (this.performanceEntries = [], this.replayPerformanceEntries = [], this._requiresManualStart) {
        const t = this._context.initialTimestamp / 1e3;
        e = e.filter((e => e.start >= t))
      }
      return Promise.all(yh(this, e))
    }
    _clearContext() {
      this._context.errorIds.clear(), this._context.traceIds.clear(), this._context.urls = []
    }
    _updateInitialTimestampFromEventBuffer() {
      const {
        session: e,
        eventBuffer: t
      } = this;
      if (!e || !t || this._requiresManualStart) return;
      if (e.segmentId) return;
      const n = t.getEarliestTimestamp();
      n && n < this._context.initialTimestamp && (this._context.initialTimestamp = n)
    }
    _popEventContext() {
      const e = {
        initialTimestamp: this._context.initialTimestamp,
        initialUrl: this._context.initialUrl,
        errorIds: Array.from(this._context.errorIds),
        traceIds: Array.from(this._context.traceIds),
        urls: this._context.urls
      };
      return this._clearContext(), e
    }
    async _runFlush() {
      const e = this.getSessionId();
      if (this.session && this.eventBuffer && e) {
        if (await this._addPerformanceEntries(), this.eventBuffer?.hasEvents && (await async function(e) {
            try {
              return Promise.all(yh(e, [Oh(cl.performance.memory)]))
            } catch (e) {
              return []
            }
          }(this), this.eventBuffer && e === this.getSessionId())) try {
          this._updateInitialTimestampFromEventBuffer();
          const t = Date.now();
          if (t - this._context.initialTimestamp > this._options.maxReplayDuration + 3e4) throw new Error("Session is too long, not sending replay");
          const n = this._popEventContext(),
            r = this.session.segmentId++;
          this._maybeSaveSession();
          const o = await this.eventBuffer.finish();
          await Ph({
            replayId: e,
            recordingData: o,
            segmentId: r,
            eventContext: n,
            session: this.session,
            timestamp: t,
            onError: e => this.handleException(e)
          })
        } catch (e) {
          this.handleException(e), this.stop({
            reason: "sendReplay"
          });
          const t = be();
          if (t) {
            const n = e instanceof Nh ? "ratelimit_backoff" : "send_error";
            t.recordDroppedEvent(n, "replay")
          }
        }
      } else Wp && Kp.error("No session or eventBuffer found to flush.")
    }
    async _flush({
      force: e = !1
    } = {}) {
      if (!this._isEnabled && !e) return;
      if (!this.checkAndHandleExpiredSession()) return void(Wp && Kp.error("Attempting to finish replay event after session expired."));
      if (!this.session) return;
      const t = this.session.started,
        n = Date.now() - t;
      this._debouncedFlush.cancel();
      const r = n < this._options.minReplayDuration,
        o = n > this._options.maxReplayDuration + 5e3;
      if (r || o) return Wp && Kp.info(`Session duration (${Math.floor(n/1e3)}s) is too ${r?"short":"long"}, not sending replay.`), void(r && this._debouncedFlush());
      const s = this.eventBuffer;
      s && 0 === this.session.segmentId && !s.hasCheckout && Wp && Kp.info("Flushing initial segment without checkout.");
      const i = !!this._flushLock;
      this._flushLock || (this._flushLock = this._runFlush());
      try {
        await this._flushLock
      } catch (e) {
        this.handleException(e)
      } finally {
        this._flushLock = void 0, i && this._debouncedFlush()
      }
    }
    _maybeSaveSession() {
      this.session && this._options.stickySession && rh(this.session)
    }
    _onMutationHandler(e) {
      const t = e.length,
        n = this._options.mutationLimit,
        r = n && t > n;
      if (t > this._options.mutationBreadcrumbLimit || r) {
        const e = Rp({
          category: "replay.mutations",
          data: {
            count: t,
            limit: r
          }
        });
        this._createCustomBreadcrumb(e)
      }
      return !r || (this.stop({
        reason: "mutationLimit",
        forceFlush: "session" === this.recordingMode
      }), !1)
    }
  }

  function Bh(e, t) {
    return [...e, ...t].join(",")
  }
  const Uh = 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]', jh = ["content-length", "content-type", "accept"];
  let Hh = !1;
  const zh = e => new qh(e); class qh {
    constructor({
      flushMinDelay: e = 5e3,
      flushMaxDelay: t = 5500,
      minReplayDuration: n = 4999,
      maxReplayDuration: r = 36e5,
      stickySession: o = !0,
      useCompression: s = !0,
      workerUrl: i,
      _experiments: a = {},
      maskAllText: c = !0,
      maskAllInputs: u = !0,
      blockAllMedia: l = !0,
      mutationBreadcrumbLimit: d = 750,
      mutationLimit: p = 1e4,
      slowClickTimeout: h = 7e3,
      slowClickIgnoreSelectors: f = [],
      networkDetailAllowUrls: m = [],
      networkDetailDenyUrls: g = [],
      networkCaptureBodies: _ = !0,
      networkRequestHeaders: y = [],
      networkResponseHeaders: v = [],
      mask: b = [],
      maskAttributes: S = ["title", "placeholder", "aria-label"],
      unmask: w = [],
      block: k = [],
      unblock: E = [],
      ignore: x = [],
      maskFn: C,
      beforeAddRecordingEvent: T,
      beforeErrorSampling: I,
      onError: M
    } = {}) {
      this.name = "Replay";
      const R = function({
        mask: e,
        unmask: t,
        block: n,
        unblock: r,
        ignore: o
      }) {
        return {
          maskTextSelector: Bh(e, [".sentry-mask", "[data-sentry-mask]"]),
          unmaskTextSelector: Bh(t, []),
          blockSelector: Bh(n, [".sentry-block", "[data-sentry-block]", "base", "iframe[srcdoc]:not([src])"]),
          unblockSelector: Bh(r, []),
          ignoreSelector: Bh(o, [".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]'])
        }
      }({
        mask: b,
        unmask: w,
        block: k,
        unblock: E,
        ignore: x
      });
      if (this._recordingOptions = {
          maskAllInputs: u,
          maskAllText: c,
          maskInputOptions: {
            password: !0
          },
          maskTextFn: C,
          maskInputFn: C,
          maskAttributeFn: (e, t, n) => function({
            el: e,
            key: t,
            maskAttributes: n,
            maskAllText: r,
            privacyOptions: o,
            value: s
          }) {
            return r ? o.unmaskTextSelector && e.matches(o.unmaskTextSelector) ? s : n.includes(t) || "value" === t && "INPUT" === e.tagName && ["submit", "button"].includes(e.getAttribute("type") || "") ? s.replace(/[\S]/g, "*") : s : s
          }({
            maskAttributes: S,
            maskAllText: c,
            privacyOptions: R,
            key: e,
            value: t,
            el: n
          }),
          ...R,
          slimDOMOptions: "all",
          inlineStylesheet: !0,
          inlineImages: !1,
          collectFonts: !0,
          errorHandler: e => {
            try {
              e.__rrweb__ = !0
            } catch (e) {}
          },
          recordCrossOriginIframes: Boolean(a.recordCrossOriginIframes)
        }, this._initialOptions = {
          flushMinDelay: e,
          flushMaxDelay: t,
          minReplayDuration: Math.min(n, 15e3),
          maxReplayDuration: Math.min(r, 36e5),
          stickySession: o,
          useCompression: s,
          workerUrl: i,
          blockAllMedia: l,
          maskAllInputs: u,
          maskAllText: c,
          mutationBreadcrumbLimit: d,
          mutationLimit: p,
          slowClickTimeout: h,
          slowClickIgnoreSelectors: f,
          networkDetailAllowUrls: m,
          networkDetailDenyUrls: g,
          networkCaptureBodies: _,
          networkRequestHeaders: Wh(y),
          networkResponseHeaders: Wh(v),
          beforeAddRecordingEvent: T,
          beforeErrorSampling: I,
          onError: M,
          _experiments: a
        }, this._initialOptions.blockAllMedia && (this._recordingOptions.blockSelector = this._recordingOptions.blockSelector ? `${this._recordingOptions.blockSelector},${Uh}` : Uh), this._isInitialized && Ie()) throw new Error("Multiple Sentry Session Replay instances are not supported");
      this._isInitialized = !0
    }
    get _isInitialized() {
      return Hh
    }
    set _isInitialized(e) {
      Hh = e
    }
    afterAllSetup(e) {
      Ie() && !this._replay && (this._setup(e), this._initialize(e))
    }
    start() {
      this._replay && this._replay.start()
    }
    startBuffering() {
      this._replay && this._replay.startBuffering()
    }
    stop() {
      return this._replay ? this._replay.stop({
        forceFlush: "session" === this._replay.recordingMode
      }) : Promise.resolve()
    }
    flush(e) {
      return this._replay ? this._replay.isEnabled() ? this._replay.sendBufferedReplayOrFlush(e) : (this._replay.start(), Promise.resolve()) : Promise.resolve()
    }
    getReplayId() {
      if (this._replay?.isEnabled()) return this._replay.getSessionId()
    }
    getRecordingMode() {
      if (this._replay?.isEnabled()) return this._replay.recordingMode
    }
    _initialize(e) {
      this._replay && (this._maybeLoadFromReplayCanvasIntegration(e), this._replay.initializeSampling())
    }
    _setup(e) {
      const t = function(e, t) {
        const n = t.getOptions(),
          r = {
            sessionSampleRate: 0,
            errorSampleRate: 0,
            ...e
          },
          o = Zn(n.replaysSessionSampleRate),
          s = Zn(n.replaysOnErrorSampleRate);
        return null == o && null == s && O((() => {
          console.warn("Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set.")
        })), null != o && (r.sessionSampleRate = o), null != s && (r.errorSampleRate = s), r
      }(this._initialOptions, e);
      this._replay = new $h({
        options: t,
        recordingOptions: this._recordingOptions
      })
    }
    _maybeLoadFromReplayCanvasIntegration(e) {
      try {
        const t = e.getIntegrationByName("ReplayCanvas");
        if (!t) return;
        this._replay._canvas = t.getOptions()
      } catch {}
    }
  }

  function Wh(e) {
    return [...jh, ...e.map((e => e.toLowerCase()))]
  }

  function Vh() {
    const e = be();
    return e?.getIntegrationByName("Replay")
  }
  var Gh = Object.defineProperty, Jh = (e, t, n) => ((e, t, n) => t in e ? Gh(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
  }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n);

  function Kh(e, t, n = 1 / 0, r = 0) {
    return e ? e.nodeType !== e.ELEMENT_NODE || r > n ? -1 : t(e) ? r : Kh(e.parentNode, t, n, r + 1) : -1
  }

  function Yh(e, t) {
    return n => {
      const r = n;
      if (null === r) return !1;
      try {
        if (e)
          if ("string" == typeof e) {
            if (r.matches(`.${e}`)) return !0
          } else if (function(e, t) {
            for (let n = e.classList.length; n--;) {
              const r = e.classList[n];
              if (t.test(r)) return !0
            }
            return !1
          }(r, e)) return !0;
        return !(!t || !r.matches(t))
      } catch {
        return !1
      }
    }
  }
  const Xh = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
  let Zh = {
    map: {},
    getId: () => (console.error(Xh), -1),
    getNode: () => (console.error(Xh), null),
    removeNodeFromMap() {
      console.error(Xh)
    },
    has: () => (console.error(Xh), !1),
    reset() {
      console.error(Xh)
    }
  };

  function Qh(e, t, n, r, o = window) {
    const s = o.Object.getOwnPropertyDescriptor(e, t);
    return o.Object.defineProperty(e, t, r ? n : {
      set(e) {
        sf((() => {
          n.set.call(this, e)
        }), 0), s && s.set && s.set.call(this, e)
      }
    }), () => Qh(e, t, s || {}, !0)
  }

  function ef(e, t, n) {
    try {
      if (!(t in e)) return () => {};
      const r = e[t],
        o = n(r);
      return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
        __rrweb_original__: {
          enumerable: !1,
          value: r
        }
      })), e[t] = o, () => {
        e[t] = r
      }
    } catch {
      return () => {}
    }
  }

  function tf(e, t, n, r, o) {
    if (!e) return !1;
    const s = function(e) {
      if (!e) return null;
      try {
        return e.nodeType === e.ELEMENT_NODE ? e : e.parentElement
      } catch (e) {
        return null
      }
    }(e);
    if (!s) return !1;
    const i = Yh(t, n);
    if (!o) {
      const e = r && s.matches(r);
      return i(s) && !e
    }
    const a = Kh(s, i);
    let c = -1;
    return !(a < 0) && (r && (c = Kh(s, Yh(null, r))), a > -1 && c < 0 || a < c)
  }
  "undefined" != typeof window && window.Proxy && window.Reflect && (Zh = new Proxy(Zh, {
    get: (e, t, n) => ("map" === t && console.error(Xh), Reflect.get(e, t, n))
  })), Date.now().toString();
  const nf = {};

  function rf(e) {
    const t = nf[e];
    if (t) return t;
    const n = window.document;
    let r = window[e];
    if (n && "function" == typeof n.createElement) try {
      const t = n.createElement("iframe");
      t.hidden = !0, n.head.appendChild(t);
      const o = t.contentWindow;
      o && o[e] && (r = o[e]), n.head.removeChild(t)
    } catch (e) {}
    return nf[e] = r.bind(window)
  }

  function of(...e) {
    return rf("requestAnimationFrame")(...e)
  }

  function sf(...e) {
    return rf("setTimeout")(...e)
  }
  var af = (e => (e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e))(af || {});
  let cf;
  const uf = e => cf ? (...t) => {
    try {
      return e(...t)
    } catch (e) {
      if (cf && !0 === cf(e)) return () => {};
      throw e
    }
  } : e;
  for (var lf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", df = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), pf = 0; pf < 64; pf++) df[lf.charCodeAt(pf)] = pf;
  const hf = new Map, ff = (e, t, n) => {
    if (!e || !_f(e, t) && "object" != typeof e) return;
    const r = function(e, t) {
      let n = hf.get(e);
      return n || (n = new Map, hf.set(e, n)), n.has(t) || n.set(t, []), n.get(t)
    }(n, e.constructor.name);
    let o = r.indexOf(e);
    return -1 === o && (o = r.length, r.push(e)), o
  };

  function mf(e, t, n) {
    if (e instanceof Array) return e.map((e => mf(e, t, n)));
    if (null === e) return e;
    if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray) return {
      rr_type: e.constructor.name,
      args: [Object.values(e)]
    };
    if (e instanceof ArrayBuffer) return {
      rr_type: e.constructor.name,
      base64: function(e) {
        var t, n = new Uint8Array(e),
          r = n.length,
          o = "";
        for (t = 0; t < r; t += 3) o += lf[n[t] >> 2], o += lf[(3 & n[t]) << 4 | n[t + 1] >> 4], o += lf[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], o += lf[63 & n[t + 2]];
        return r % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
      }(e)
    };
    if (e instanceof DataView) return {
      rr_type: e.constructor.name,
      args: [mf(e.buffer, t, n), e.byteOffset, e.byteLength]
    };
    if (e instanceof HTMLImageElement) {
      const t = e.constructor.name,
        {
          src: n
        } = e;
      return {
        rr_type: t,
        src: n
      }
    }
    return e instanceof HTMLCanvasElement ? {
      rr_type: "HTMLImageElement",
      src: e.toDataURL()
    } : e instanceof ImageData ? {
      rr_type: e.constructor.name,
      args: [mf(e.data, t, n), e.width, e.height]
    } : _f(e, t) || "object" == typeof e ? {
      rr_type: e.constructor.name,
      index: ff(e, t, n)
    } : e
  }
  const gf = (e, t, n) => e.map((e => mf(e, t, n))), _f = (e, t) => {
    const n = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter((e => "function" == typeof t[e]));
    return Boolean(n.find((n => e instanceof t[n])))
  };

  function yf(e, t, n, r, o) {
    const s = [];
    try {
      const i = ef(e.HTMLCanvasElement.prototype, "getContext", (function(e) {
        return function(s, ...i) {
          if (!tf(this, t, n, r, !0)) {
            const e = function(e) {
              return "experimental-webgl" === e ? "webgl" : e
            }(s);
            if ("__context" in this || (this.__context = e), o && ["webgl", "webgl2"].includes(e))
              if (i[0] && "object" == typeof i[0]) {
                const e = i[0];
                e.preserveDrawingBuffer || (e.preserveDrawingBuffer = !0)
              } else i.splice(0, 1, {
                preserveDrawingBuffer: !0
              })
          }
          return e.apply(this, [s, ...i])
        }
      }));
      s.push(i)
    } catch {
      console.error("failed to patch HTMLCanvasElement.prototype.getContext")
    }
    return () => {
      s.forEach((e => e()))
    }
  }

  function vf(e, t, n, r, o, s, i, a) {
    const c = [],
      u = Object.getOwnPropertyNames(e);
    for (const i of u)
      if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(i)) try {
        if ("function" != typeof e[i]) continue;
        const u = ef(e, i, (function(e) {
          return function(...c) {
            const u = e.apply(this, c);
            if (ff(u, a, this), "tagName" in this.canvas && !tf(this.canvas, r, o, s, !0)) {
              const e = gf(c, a, this),
                r = {
                  type: t,
                  property: i,
                  args: e
                };
              n(this.canvas, r)
            }
            return u
          }
        }));
        c.push(u)
      } catch {
        const r = Qh(e, i, {
          set(e) {
            n(this.canvas, {
              type: t,
              property: i,
              args: [e],
              setter: !0
            })
          }
        });
        c.push(r)
      }
    return c
  }
  class bf {
    constructor(e) {
      this.pendingCanvasMutations = new Map, this.rafStamps = {
        latestId: 0,
        invokeId: null
      }, this.shadowDoms = new Set, this.windowsSet = new WeakSet, this.windows = [], this.restoreHandlers = [], this.frozen = !1, this.locked = !1, this.snapshotInProgressMap = new Map, this.worker = null, this.lastSnapshotTime = 0, this.processMutation = (e, t) => {
        !(this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) && this.rafStamps.invokeId || (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []), this.pendingCanvasMutations.get(e).push(t)
      };
      const {
        sampling: t = "all",
        win: n,
        blockClass: r,
        blockSelector: o,
        unblockSelector: s,
        maxCanvasSize: i,
        recordCanvas: a,
        dataURLOptions: c,
        errorHandler: u
      } = e;
      this.mutationCb = e.mutationCb, this.mirror = e.mirror, this.options = e, u && (cf = u), (a && "number" == typeof t || e.enableManualSnapshot) && (this.worker = this.initFPSWorker()), this.addWindow(n), e.enableManualSnapshot || uf((() => {
        a && "all" === t && (this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher()), a && "number" == typeof t && this.initCanvasFPSObserver(t, r, o, s, i, {
          dataURLOptions: c
        })
      }))()
    }
    reset() {
      this.pendingCanvasMutations.clear(), this.restoreHandlers.forEach((e => {
        try {
          e()
        } catch (e) {}
      })), this.restoreHandlers = [], this.windowsSet = new WeakSet, this.windows = [], this.shadowDoms = new Set, this.worker?.terminate(), this.worker = null, this.snapshotInProgressMap = new Map
    }
    freeze() {
      this.frozen = !0
    }
    unfreeze() {
      this.frozen = !1
    }
    lock() {
      this.locked = !0
    }
    unlock() {
      this.locked = !1
    }
    addWindow(e) {
      const {
        sampling: t = "all",
        blockClass: n,
        blockSelector: r,
        unblockSelector: o,
        recordCanvas: s,
        enableManualSnapshot: i
      } = this.options;
      if (!this.windowsSet.has(e)) {
        if (i) return this.windowsSet.add(e), void this.windows.push(new WeakRef(e));
        uf((() => {
          if (s && "all" === t && this.initCanvasMutationObserver(e, n, r, o), s && "number" == typeof t) {
            const t = yf(e, n, r, o, !0);
            this.restoreHandlers.push((() => {
              t()
            }))
          }
        }))(), this.windowsSet.add(e), this.windows.push(new WeakRef(e))
      }
    }
    addShadowRoot(e) {
      this.shadowDoms.add(new WeakRef(e))
    }
    resetShadowRoots() {
      this.shadowDoms = new Set
    }
    initFPSWorker() {
      const e = new Worker(function() {
        const e = new Blob(['for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t="undefined"==typeof Uint8Array?[]:new Uint8Array(256),a=0;a<64;a++)t[e.charCodeAt(a)]=a;var n=function(t){var a,n=new Uint8Array(t),r=n.length,s="";for(a=0;a<r;a+=3)s+=e[n[a]>>2],s+=e[(3&n[a])<<4|n[a+1]>>4],s+=e[(15&n[a+1])<<2|n[a+2]>>6],s+=e[63&n[a+2]];return r%3==2?s=s.substring(0,s.length-1)+"=":r%3==1&&(s=s.substring(0,s.length-2)+"=="),s};const r=new Map,s=new Map;const i=self;i.onmessage=async function(e){if(!("OffscreenCanvas"in globalThis))return i.postMessage({id:e.data.id});{const{id:t,bitmap:a,width:o,height:f,maxCanvasSize:c,dataURLOptions:g}=e.data,u=async function(e,t,a){const r=e+"-"+t;if("OffscreenCanvas"in globalThis){if(s.has(r))return s.get(r);const i=new OffscreenCanvas(e,t);i.getContext("2d");const o=await i.convertToBlob(a),f=await o.arrayBuffer(),c=n(f);return s.set(r,c),c}return""}(o,f,g),[h,d]=function(e,t,a){if(!a)return[e,t];const[n,r]=a;if(e<=n&&t<=r)return[e,t];let s=e,i=t;return s>n&&(i=Math.floor(n*t/e),s=n),i>r&&(s=Math.floor(r*e/t),i=r),[s,i]}(o,f,c),l=new OffscreenCanvas(h,d),w=l.getContext("bitmaprenderer"),p=h===o&&d===f?a:await createImageBitmap(a,{resizeWidth:h,resizeHeight:d,resizeQuality:"low"});w.transferFromImageBitmap(p),a.close();const y=await l.convertToBlob(g),v=y.type,b=await y.arrayBuffer(),m=n(b);if(p.close(),!r.has(t)&&await u===m)return r.set(t,m),i.postMessage({id:t});if(r.get(t)===m)return i.postMessage({id:t});i.postMessage({id:t,type:v,base64:m,width:o,height:f}),r.set(t,m)}};']);
        return URL.createObjectURL(e)
      }());
      return e.onmessage = e => {
        const t = e.data,
          {
            id: n
          } = t;
        if (this.snapshotInProgressMap.set(n, !1), !("base64" in t)) return;
        const {
          base64: r,
          type: o,
          width: s,
          height: i
        } = t;
        this.mutationCb({
          id: n,
          type: af["2D"],
          commands: [{
            property: "clearRect",
            args: [0, 0, s, i]
          }, {
            property: "drawImage",
            args: [{
              rr_type: "ImageBitmap",
              args: [{
                rr_type: "Blob",
                data: [{
                  rr_type: "ArrayBuffer",
                  base64: r
                }],
                type: o
              }]
            }, 0, 0, s, i]
          }]
        })
      }, e
    }
    initCanvasFPSObserver(e, t, n, r, o, s) {
      const i = this.takeSnapshot(!1, e, t, n, r, o, s.dataURLOptions);
      this.restoreHandlers.push((() => {
        cancelAnimationFrame(i)
      }))
    }
    initCanvasMutationObserver(e, t, n, r) {
      const o = yf(e, t, n, r, !1),
        s = function(e, t, n, r, o) {
          const s = [],
            i = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
          for (const a of i) try {
            if ("function" != typeof t.CanvasRenderingContext2D.prototype[a]) continue;
            const i = ef(t.CanvasRenderingContext2D.prototype, a, (function(s) {
              return function(...i) {
                return tf(this.canvas, n, r, o, !0) || sf((() => {
                  const n = gf(i, t, this);
                  e(this.canvas, {
                    type: af["2D"],
                    property: a,
                    args: n
                  })
                }), 0), s.apply(this, i)
              }
            }));
            s.push(i)
          } catch {
            const n = Qh(t.CanvasRenderingContext2D.prototype, a, {
              set(t) {
                e(this.canvas, {
                  type: af["2D"],
                  property: a,
                  args: [t],
                  setter: !0
                })
              }
            });
            s.push(n)
          }
          return () => {
            s.forEach((e => e()))
          }
        }(this.processMutation.bind(this), e, t, n, r),
        i = function(e, t, n, r, o) {
          const s = [];
          return s.push(...vf(t.WebGLRenderingContext.prototype, af.WebGL, e, n, r, o, 0, t)), void 0 !== t.WebGL2RenderingContext && s.push(...vf(t.WebGL2RenderingContext.prototype, af.WebGL2, e, n, r, o, 0, t)), () => {
            s.forEach((e => e()))
          }
        }(this.processMutation.bind(this), e, t, n, r, this.mirror);
      this.restoreHandlers.push((() => {
        o(), s(), i()
      }))
    }
    snapshot(e) {
      const {
        options: t
      } = this, n = this.takeSnapshot(!0, "all" === t.sampling ? 2 : t.sampling || 2, t.blockClass, t.blockSelector, t.unblockSelector, t.maxCanvasSize, t.dataURLOptions, e);
      this.restoreHandlers.push((() => {
        cancelAnimationFrame(n)
      }))
    }
    takeSnapshot(e, t, n, r, o, s, i, a) {
      const c = 1e3 / t;
      let u;
      const l = e => {
          if (e) return [e];
          const t = [],
            s = e => {
              e.querySelectorAll("canvas").forEach((e => {
                tf(e, n, r, o, !0) || t.push(e)
              }))
            };
          for (const e of this.windows) {
            const t = e.deref();
            let n;
            try {
              n = t && t.document
            } catch {}
            n && s(n)
          }
          for (const e of this.shadowDoms) {
            const t = e.deref();
            t && s(t)
          }
          return t
        },
        d = t => {
          this.windows.length && (this.lastSnapshotTime && t - this.lastSnapshotTime < c ? u = of(d) : (this.lastSnapshotTime = t, l(a).forEach((t => {
            if (!this.mirror.hasNode(t)) return;
            const n = this.mirror.getId(t);
            if (!this.snapshotInProgressMap.get(n) && t.width && t.height) {
              if (this.snapshotInProgressMap.set(n, !0), !e && ["webgl", "webgl2"].includes(t.__context)) {
                const e = t.getContext(t.__context);
                !1 === e?.getContextAttributes()?.preserveDrawingBuffer && e.clear(e.COLOR_BUFFER_BIT)
              }
              createImageBitmap(t).then((e => {
                this.worker?.postMessage({
                  id: n,
                  bitmap: e,
                  width: t.width,
                  height: t.height,
                  dataURLOptions: i,
                  maxCanvasSize: s
                }, [e])
              })).catch((e => {
                uf((() => {
                  throw e
                }))()
              }))
            }
          })), e || (u = of(d))))
        };
      return u = of(d), u
    }
    startPendingCanvasMutationFlusher() {
      of((() => this.flushPendingCanvasMutations()))
    }
    startRAFTimestamping() {
      const e = t => {
        this.rafStamps.latestId = t, of(e)
      };
      of(e)
    }
    flushPendingCanvasMutations() {
      this.pendingCanvasMutations.forEach(((e, t) => {
        const n = this.mirror.getId(t);
        this.flushPendingCanvasMutationFor(t, n)
      })), of((() => this.flushPendingCanvasMutations()))
    }
    flushPendingCanvasMutationFor(e, t) {
      if (this.frozen || this.locked) return;
      const n = this.pendingCanvasMutations.get(e);
      if (!n || -1 === t) return;
      const r = n.map((e => {
          const {
            type: t,
            ...n
          } = e;
          return n
        })),
        {
          type: o
        } = n[0];
      this.mutationCb({
        id: t,
        type: o,
        commands: r
      }), this.pendingCanvasMutations.delete(e)
    }
  }
  try {
    if (2 !== Array.from([1], (e => 2 * e))[0]) {
      const e = document.createElement("iframe");
      document.body.appendChild(e), Array.from = e.contentWindow?.Array.from || Array.from, document.body.removeChild(e)
    }
  } catch (e) {
    console.debug("Unable to override Array.from", e)
  }
  var Sf; new class {
    constructor() {
      Jh(this, "idNodeMap", new Map), Jh(this, "nodeMetaMap", new WeakMap)
    }
    getId(e) {
      if (!e) return -1;
      const t = this.getMeta(e)?.id;
      return t ?? -1
    }
    getNode(e) {
      return this.idNodeMap.get(e) || null
    }
    getIds() {
      return Array.from(this.idNodeMap.keys())
    }
    getMeta(e) {
      return this.nodeMetaMap.get(e) || null
    }
    removeNodeFromMap(e) {
      const t = this.getId(e);
      this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e => this.removeNodeFromMap(e)))
    }
    has(e) {
      return this.idNodeMap.has(e)
    }
    hasNode(e) {
      return this.nodeMetaMap.has(e)
    }
    add(e, t) {
      const n = t.id;
      this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t)
    }
    replace(e, t) {
      const n = this.getNode(e);
      if (n) {
        const e = this.nodeMetaMap.get(n);
        e && this.nodeMetaMap.set(t, e)
      }
      this.idNodeMap.set(e, t)
    }
    reset() {
      this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
    }
  },
  function(e) {
    e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped"
  }(Sf || (Sf = {}));
  const wf = {
    low: {
      sampling: {
        canvas: 1
      },
      dataURLOptions: {
        type: "image/webp",
        quality: .25
      }
    },
    medium: {
      sampling: {
        canvas: 2
      },
      dataURLOptions: {
        type: "image/webp",
        quality: .4
      }
    },
    high: {
      sampling: {
        canvas: 4
      },
      dataURLOptions: {
        type: "image/webp",
        quality: .5
      }
    }
  }, kf = 1280, Ef = (e = {}) => {
    const [t, n] = e.maxCanvasSize || [], r = {
      quality: e.quality || "medium",
      enableManualSnapshot: e.enableManualSnapshot,
      maxCanvasSize: [t ? Math.min(t, kf) : kf, n ? Math.min(n, kf) : kf]
    };
    let o;
    const s = new Promise((e => o = e));
    return {
      name: "ReplayCanvas",
      getOptions() {
        const {
          quality: e,
          enableManualSnapshot: t,
          maxCanvasSize: n
        } = r;
        return {
          enableManualSnapshot: t,
          recordCanvas: !0,
          getCanvasManager: e => {
            const r = new bf({
              ...e,
              enableManualSnapshot: t,
              maxCanvasSize: n,
              errorHandler: e => {
                try {
                  "object" == typeof e && (e.__rrweb__ = !0)
                } catch (e) {}
              }
            });
            return o(r), r
          },
          ...wf[e] || wf.medium
        }
      },
      async snapshot(e) {
        (await s).snapshot(e)
      }
    }
  };

  function xf(e) {
    return e.split(",").some((e => e.trim().startsWith(On)))
  }

  function Cf(e, t, n, r) {
    const o = {
      url: e,
      type: "fetch",
      "http.method": n,
      [kn]: r,
      [wn]: "http.client"
    };
    return t && (nc(t) || (o["http.url"] = t.href, o["server.address"] = t.host), t.search && (o["http.query"] = t.search), t.hash && (o["http.fragment"] = t.hash)), o
  }

  function Tf(e) {
    return "number" == typeof e && isFinite(e)
  }

  function If(e, t, n, {
    ...r
  }) {
    const o = lr(e).start_timestamp;
    return o && o > t && "function" == typeof e.updateStartTime && e.updateStartTime(t), $s(e, (() => {
      const e = Ps({
        startTime: t,
        ...r
      });
      return e && e.end(n), e
    }))
  }

  function Mf(e) {
    const t = be();
    if (!t) return;
    const {
      name: n,
      transaction: r,
      attributes: o,
      startTime: s
    } = e, {
      release: i,
      environment: a,
      sendDefaultPii: c
    } = t.getOptions(), u = t.getIntegrationByName("Replay"), l = u?.getReplayId(), d = me(), p = d.getUser(), h = void 0 !== p ? p.email || p.id || p.ip_address : void 0;
    let f;
    try {
      f = d.getScopeData().contexts.profile.profile_id
    } catch {}
    return Ps({
      name: n,
      attributes: {
        release: i,
        environment: a,
        user: h || void 0,
        profile_id: f || void 0,
        replay_id: l || void 0,
        transaction: r,
        "user_agent.original": Ea.navigator?.userAgent,
        "client.address": c ? "{{auto}}" : void 0,
        ...o
      },
      startTime: s,
      experimental: {
        standalone: !0
      }
    })
  }

  function Rf() {
    return Ea.addEventListener && Ea.performance
  }

  function Of(e) {
    return e / 1e3
  }

  function Af(e) {
    let t = "unknown",
      n = "unknown",
      r = "";
    for (const o of e) {
      if ("/" === o) {
        [t, n] = e.split("/");
        break
      }
      if (!isNaN(Number(o))) {
        t = "h" === r ? "http" : r, n = e.split(r)[1];
        break
      }
      r += o
    }
    return r === e && (t = r), {
      name: t,
      version: n
    }
  }
  const Lf = new WeakMap, Df = new Map, Nf = {
    traceFetch: !0,
    traceXHR: !0,
    enableHTTPTimings: !0,
    trackFetchStreamPerformance: !1
  };

  function Pf(e, t) {
    const {
      traceFetch: n,
      traceXHR: r,
      trackFetchStreamPerformance: o,
      shouldCreateSpanForRequest: s,
      enableHTTPTimings: i,
      tracePropagationTargets: a,
      onRequestSpanStart: c
    } = {
      ...Nf,
      ...t
    }, u = "function" == typeof s ? s : e => !0, l = e => function(e, t) {
      const n = T();
      if (n) {
        let r, o;
        try {
          r = new URL(e, n), o = new URL(n).origin
        } catch (e) {
          return !1
        }
        const s = r.origin === o;
        return t ? P(r.toString(), t) || s && P(r.pathname, t) : s
      } {
        const n = !!e.match(/^\/(?!\/)/);
        return t ? P(e, t) : n
      }
    }(e, a), d = {};
    n && (e.addEventProcessor((e => ("transaction" === e.type && e.spans && e.spans.forEach((e => {
      if ("http.client" === e.op) {
        const t = Df.get(e.span_id);
        t && (e.timestamp = t / 1e3, Df.delete(e.span_id))
      }
    })), e))), o && function() {
      const e = "fetch-body-resolved";
      gs(e, (e => {
        if (e.response) {
          const t = Lf.get(e.response);
          t && e.endTimestamp && Df.set(t, e.endTimestamp)
        }
      })), _s(e, (() => Ka(Ya)))
    }(), Ja((e => {
      const t = function(e, t, n, r, o = "auto.http.browser") {
        if (!e.fetchData) return;
        const {
          method: s,
          url: i
        } = e.fetchData, a = zn() && t(i);
        if (e.endTimestamp && a) {
          const t = e.fetchData.__span;
          if (!t) return;
          const n = r[t];
          return void(n && (function(e, t) {
            if (t.response) {
              Jn(e, t.response.status);
              const n = t.response?.headers && t.response.headers.get("content-length");
              if (n) {
                const t = parseInt(n);
                t > 0 && e.setAttribute("http.response_content_length", t)
              }
            } else t.error && e.setStatus({
              code: Vn,
              message: "internal_error"
            });
            e.end()
          }(n, e), delete r[t]))
        }
        const c = !!yr(),
          u = a && c ? Ps(function(e, t, n) {
            const r = rc(e);
            return {
              name: r ? `${t} ${oc(r)}` : t,
              attributes: Cf(e, r, t, n)
            }
          }(i, s, o)) : new Ts;
        if (e.fetchData.__span = u.spanContext().spanId, r[u.spanContext().spanId] = u, n(e.fetchData.url)) {
          const t = e.args[0],
            n = e.args[1] || {},
            r = function(e, t, n) {
              const r = bi({
                  span: n
                }),
                o = r["sentry-trace"],
                s = r.baggage;
              if (!o) return;
              const i = t.headers || (w(e) ? e.headers : void 0);
              if (i) {
                if (function(e) {
                    return "undefined" != typeof Headers && b(e, Headers)
                  }(i)) {
                  const e = new Headers(i);
                  if (e.get("sentry-trace") || e.set("sentry-trace", o), s) {
                    const t = e.get("baggage");
                    t ? xf(t) || e.set("baggage", `${t},${s}`) : e.set("baggage", s)
                  }
                  return e
                }
                if (Array.isArray(i)) {
                  const e = [...i];
                  i.find((e => "sentry-trace" === e[0])) || e.push(["sentry-trace", o]);
                  const t = i.find((e => "baggage" === e[0] && xf(e[1])));
                  return s && !t && e.push(["baggage", s]), e
                } {
                  const e = "sentry-trace" in i ? i["sentry-trace"] : void 0,
                    t = "baggage" in i ? i.baggage : void 0,
                    n = t ? Array.isArray(t) ? [...t] : [t] : [],
                    r = t && (Array.isArray(t) ? t.find((e => xf(e))) : xf(t));
                  return s && !r && n.push(s), {
                    ...i,
                    "sentry-trace": e ?? o,
                    baggage: n.length > 0 ? n.join(",") : void 0
                  }
                }
              }
              return {
                ...r
              }
            }(t, n, zn() && c ? u : void 0);
          r && (e.args[1] = n, n.headers = r)
        }
        const l = be();
        if (l) {
          const t = {
            input: e.args,
            response: e.response,
            startTimestamp: e.startTimestamp,
            endTimestamp: e.endTimestamp
          };
          l.emit("beforeOutgoingRequestSpan", u, t)
        }
        return u
      }(e, u, l, d);
      if (e.response && e.fetchData.__span && Lf.set(e.response, e.fetchData.__span), t) {
        const n = Bf(e.fetchData.url),
          r = n ? sc(n).host : void 0;
        t.setAttributes({
          "http.url": n,
          "server.address": r
        }), i && Ff(t), c?.(t, {
          headers: e.headers
        })
      }
    }))), r && fc((e => {
      const t = function(e, t, n, r) {
        const o = e.xhr,
          s = o?.[hc];
        if (!o || o.__sentry_own_request__ || !s) return;
        const {
          url: i,
          method: a
        } = s, c = zn() && t(i);
        if (e.endTimestamp && c) {
          const e = o.__sentry_xhr_span_id__;
          if (!e) return;
          const t = r[e];
          return void(t && void 0 !== s.status_code && (Jn(t, s.status_code), t.end(), delete r[e]))
        }
        const u = Bf(i),
          l = sc(u || i),
          d = ic(i),
          p = !!yr(),
          h = c && p ? Ps({
            name: `${a} ${d}`,
            attributes: {
              url: i,
              type: "xhr",
              "http.method": a,
              "http.url": u,
              "server.address": l?.host,
              [kn]: "auto.http.browser",
              [wn]: "http.client",
              ...l?.search && {
                "http.query": l?.search
              },
              ...l?.hash && {
                "http.fragment": l?.hash
              }
            }
          }) : new Ts;
        o.__sentry_xhr_span_id__ = h.spanContext().spanId, r[o.__sentry_xhr_span_id__] = h, n(i) && function(e, t) {
          const {
            "sentry-trace": n,
            baggage: r
          } = bi({
            span: t
          });
          n && function(e, t, n) {
            const r = e.__sentry_xhr_v3__?.request_headers;
            if (!r?.["sentry-trace"]) try {
              if (e.setRequestHeader("sentry-trace", t), n) {
                const t = r?.baggage;
                t && t.split(",").some((e => e.trim().startsWith("sentry-"))) || e.setRequestHeader("baggage", n)
              }
            } catch (e) {}
          }(e, n, r)
        }(o, zn() && p ? h : void 0);
        const f = be();
        return f && f.emit("beforeOutgoingRequestSpan", h, e), h
      }(e, u, l, d);
      if (t) {
        let n;
        i && Ff(t);
        try {
          n = new Headers(e.xhr.__sentry_xhr_v3__?.request_headers)
        } catch {}
        c?.(t, {
          headers: n
        })
      }
    }))
  }

  function Ff(e) {
    const {
      url: t
    } = lr(e).data;
    if (!t || "string" != typeof t) return;
    const n = Zu("resource", (({
      entries: r
    }) => {
      r.forEach((r => {
        (function(e) {
          return "resource" === e.entryType && "initiatorType" in e && "string" == typeof e.nextHopProtocol && ("fetch" === e.initiatorType || "xmlhttprequest" === e.initiatorType)
        })(r) && r.name.endsWith(t) && (function(e) {
          const {
            name: t,
            version: n
          } = Af(e.nextHopProtocol), r = [];
          return r.push(["network.protocol.version", n], ["network.protocol.name", t]), ee() ? [...r, ["http.request.redirect_start", $f(e.redirectStart)],
            ["http.request.fetch_start", $f(e.fetchStart)],
            ["http.request.domain_lookup_start", $f(e.domainLookupStart)],
            ["http.request.domain_lookup_end", $f(e.domainLookupEnd)],
            ["http.request.connect_start", $f(e.connectStart)],
            ["http.request.secure_connection_start", $f(e.secureConnectionStart)],
            ["http.request.connection_end", $f(e.connectEnd)],
            ["http.request.request_start", $f(e.requestStart)],
            ["http.request.response_start", $f(e.responseStart)],
            ["http.request.response_end", $f(e.responseEnd)]
          ] : r
        }(r).forEach((t => e.setAttribute(...t))), setTimeout(n))
      }))
    }))
  }

  function $f(e = 0) {
    return ((ee() || performance.timeOrigin) + e) / 1e3
  }

  function Bf(e) {
    try {
      return new URL(e, ho.location.origin).href
    } catch {
      return
    }
  }
  const Uf = {
    idleTimeout: 1e3,
    finalTimeout: 3e4,
    childSpanTimeout: 15e3
  };

  function jf(e, t = {}) {
    const n = new Map;
    let r, o = !1,
      s = "externalFinish",
      i = !t.disableAutoFinish;
    const a = [],
      {
        idleTimeout: u = Uf.idleTimeout,
        finalTimeout: l = Uf.finalTimeout,
        childSpanTimeout: d = Uf.childSpanTimeout,
        beforeSpanEnd: p
      } = t,
      h = be();
    if (!h || !zn()) {
      const e = new Ts;
      return wr(e, {
        sample_rate: "0",
        sampled: "false",
        ...xr(e)
      }), e
    }
    const f = me(),
      m = yr(),
      g = function(e) {
        const t = Ps(e);
        return ie(me(), t), c && A.log("[Tracing] Started span is an idle span"), t
      }(e);

    function _() {
      r && (clearTimeout(r), r = void 0)
    }

    function y(e) {
      _(), r = setTimeout((() => {
        !o && 0 === n.size && i && (s = "idleTimeout", g.end(e))
      }), u)
    }

    function v(e) {
      r = setTimeout((() => {
        !o && i && (s = "heartbeatFailed", g.end(e))
      }), d)
    }

    function b(e) {
      o = !0, n.clear(), a.forEach((e => e())), ie(f, m);
      const t = lr(g),
        {
          start_timestamp: r
        } = t;
      if (!r) return;
      t.data[En] || g.setAttribute(En, s), A.log(`[Tracing] Idle span "${t.op}" finished`);
      const i = gr(g).filter((e => e !== g));
      let d = 0;
      i.forEach((t => {
        t.isRecording() && (t.setStatus({
          code: Vn,
          message: "cancelled"
        }), t.end(e), c && A.log("[Tracing] Cancelling span since span ended early", JSON.stringify(t, void 0, 2)));
        const n = lr(t),
          {
            timestamp: r = 0,
            start_timestamp: o = 0
          } = n,
          s = o <= e,
          i = r - o <= (l + u) / 1e3;
        if (c) {
          const e = JSON.stringify(t, void 0, 2);
          s ? i || A.log("[Tracing] Discarding span since it finished after idle span final timeout", e) : A.log("[Tracing] Discarding span since it happened after idle span was finished", e)
        }
        i && s || (function(e, t) {
          e[hr] && e[hr].delete(t)
        }(g, t), d++)
      })), d > 0 && g.setAttribute("sentry.idle_span_discarded_spans", d)
    }
    return g.end = new Proxy(g.end, {
      apply(e, t, n) {
        if (p && p(g), t instanceof Ts) return;
        const [r, ...o] = n, s = cr(r || Z()), i = gr(g).filter((e => e !== g));
        if (!i.length) return b(s), Reflect.apply(e, t, [s, ...o]);
        const a = i.map((e => lr(e).timestamp)).filter((e => !!e)),
          c = a.length ? Math.max(...a) : void 0,
          u = lr(g).start_timestamp,
          d = Math.min(u ? u + l / 1e3 : 1 / 0, Math.max(u || -1 / 0, Math.min(s, c || 1 / 0)));
        return b(d), Reflect.apply(e, t, [d, ...o])
      }
    }), a.push(h.on("spanStart", (e => {
      var t;
      o || e === g || lr(e).timestamp || gr(g).includes(e) && (t = e.spanContext().spanId, _(), n.set(t, !0), v(Z() + d / 1e3))
    }))), a.push(h.on("spanEnd", (e => {
      var t;
      o || (t = e.spanContext().spanId, n.has(t) && n.delete(t), 0 === n.size && y(Z() + u / 1e3))
    }))), a.push(h.on("idleSpanEnableAutoFinish", (e => {
      e === g && (i = !0, y(), n.size && v())
    }))), t.disableAutoFinish || y(), setTimeout((() => {
      o || (g.setStatus({
        code: Vn,
        message: "deadline_exceeded"
      }), s = "finalTimeout", g.end())
    }), l), g
  }
  let Hf, zf, qf = 0, Wf = {};

  function Vf({
    recordClsStandaloneSpans: e,
    recordLcpStandaloneSpans: t
  }) {
    const n = Rf();
    if (n && ee()) {
      n.mark && Ea.performance.mark("sentry-tracing-init");
      const r = Yu((({
          metric: e
        }) => {
          const t = e.entries[e.entries.length - 1];
          if (!t) return;
          const n = Of(ee()),
            r = Of(t.startTime);
          Wf.fid = {
            value: e.value,
            unit: "millisecond"
          }, Wf["mark.fid"] = {
            value: n + r,
            unit: "second"
          }
        })),
        o = t ? function() {
          let e, t, n = 0;
          if (! function() {
              try {
                return PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")
              } catch {
                return !1
              }
            }()) return;
          let r = !1;

          function o() {
            r || (r = !0, t && function(e, t, n) {
              ka && A.log(`Sending LCP span (${e})`);
              const r = Of((ee() || 0) + (t?.startTime || 0)),
                o = me().getScopeData().transactionName,
                s = t ? x(t.element) : "Largest contentful paint",
                i = {
                  [kn]: "auto.http.browser.lcp",
                  [wn]: "ui.webvital.lcp",
                  [Mn]: 0,
                  "sentry.pageload.span_id": n
                };
              t && (i["lcp.element"] = x(t.element), i["lcp.id"] = t.id, i["lcp.url"] = t.url, i["lcp.loadTime"] = t.loadTime, i["lcp.renderTime"] = t.renderTime, i["lcp.size"] = t.size);
              const a = Mf({
                name: s,
                transaction: o,
                attributes: i,
                startTime: r
              });
              a && (a.addEvent("lcp", {
                [xn]: "millisecond",
                [Cn]: e
              }), a.end(r))
            }(n, e, t), s())
          }
          const s = Ku((({
            metric: t
          }) => {
            const r = t.entries[t.entries.length - 1];
            r && (n = t.value, e = r)
          }), !0);
          Eu((() => {
            o()
          })), setTimeout((() => {
            const e = be();
            if (!e) return;
            const n = e.on("startNavigationSpan", (() => {
                o(), n?.()
              })),
              r = yr();
            if (r) {
              const e = _r(r);
              "pageload" === lr(e).op && (t = e.spanContext().spanId)
            }
          }), 0)
        }() : Ku((({
          metric: e
        }) => {
          const t = e.entries[e.entries.length - 1];
          t && (Wf.lcp = {
            value: e.value,
            unit: "millisecond"
          }, Hf = t)
        }), !0),
        s = sl("ttfb", (({
          metric: e
        }) => {
          e.entries[e.entries.length - 1] && (Wf.ttfb = {
            value: e.value,
            unit: "millisecond"
          })
        }), rl, Vu),
        i = e ? function() {
          let e, t, n = 0;
          if (! function() {
              try {
                return PerformanceObserver.supportedEntryTypes.includes("layout-shift")
              } catch {
                return !1
              }
            }()) return;
          let r = !1;

          function o() {
            r || (r = !0, t && function(e, t, n) {
              ka && A.log(`Sending CLS span (${e})`);
              const r = Of((ee() || 0) + (t?.startTime || 0)),
                o = me().getScopeData().transactionName,
                s = t ? x(t.sources[0]?.node) : "Layout shift",
                i = {
                  [kn]: "auto.http.browser.cls",
                  [wn]: "ui.webvital.cls",
                  [Mn]: t?.duration || 0,
                  "sentry.pageload.span_id": n
                };
              t?.sources && t.sources.forEach(((e, t) => {
                i[`cls.source.${t+1}`] = x(e.node)
              }));
              const a = Mf({
                name: s,
                transaction: o,
                attributes: i,
                startTime: r
              });
              a && (a.addEvent("cls", {
                [xn]: "",
                [Cn]: e
              }), a.end(r))
            }(n, e, t), s())
          }
          const s = Ju((({
            metric: t
          }) => {
            const r = t.entries[t.entries.length - 1];
            r && (n = t.value, e = r)
          }), !0);
          Eu((() => {
            o()
          })), setTimeout((() => {
            const e = be();
            if (!e) return;
            const n = e.on("startNavigationSpan", (() => {
                o(), n?.()
              })),
              r = yr();
            if (r) {
              const e = _r(r);
              "pageload" === lr(e).op && (t = e.spanContext().spanId)
            }
          }), 0)
        }() : Ju((({
          metric: e
        }) => {
          const t = e.entries[e.entries.length - 1];
          t && (Wf.cls = {
            value: e.value,
            unit: ""
          }, zf = t)
        }), !0);
      return () => {
        r(), o?.(), s(), i?.()
      }
    }
    return () => {}
  }

  function Gf(e, t, n, r, o = n) {
    const s = function(e) {
        return "secureConnection" === e ? "connectEnd" : "fetch" === e ? "domainLookupStart" : `${e}End`
      }(n),
      i = t[s],
      a = t[`${n}Start`];
    a && i && If(e, r + Of(a), r + Of(i), {
      op: `browser.${o}`,
      name: t.name,
      attributes: {
        [kn]: "auto.ui.browser.metrics",
        ..."redirect" === n && null != t.redirectCount ? {
          "http.redirect_count": t.redirectCount
        } : {}
      }
    })
  }

  function Jf(e, t, n, r) {
    const o = t[n];
    null != o && o < 2147483647 && (e[r] = o)
  }
  const Kf = [], Yf = new Map;
  const Xf = {
    click: "click",
    pointerdown: "click",
    pointerup: "click",
    mousedown: "click",
    mouseup: "click",
    touchstart: "click",
    touchend: "click",
    mouseover: "hover",
    mouseout: "hover",
    mouseenter: "hover",
    mouseleave: "hover",
    pointerover: "hover",
    pointerout: "hover",
    pointerenter: "hover",
    pointerleave: "hover",
    dragstart: "drag",
    dragend: "drag",
    drag: "drag",
    dragenter: "drag",
    dragleave: "drag",
    dragover: "drag",
    drop: "drag",
    keydown: "press",
    keyup: "press",
    keypress: "press",
    input: "press"
  }, Zf = ({
    metric: e
  }) => {
    if (null == e.value) return;
    const t = Of(e.value);
    if (t > 60) return;
    const n = e.entries.find((t => t.duration === e.value && Xf[t.name]));
    if (!n) return;
    const {
      interactionId: r
    } = n, o = Xf[n.name], s = Of(ee() + n.startTime), i = yr(), a = i ? _r(i) : void 0, c = (null != r ? Yf.get(r) : void 0) || a, u = c ? lr(c).description : me().getScopeData().transactionName, l = Mf({
      name: x(n.target),
      transaction: u,
      attributes: {
        [kn]: "auto.http.browser.inp",
        [wn]: `ui.interaction.${o}`,
        [Mn]: n.duration
      },
      startTime: s
    });
    l && (l.addEvent("inp", {
      [xn]: "millisecond",
      [Cn]: e.value
    }), l.end(s + t))
  }, Qf = ({
    entries: e
  }) => {
    const t = yr(),
      n = t ? _r(t) : void 0,
      r = n ? lr(n).description : me().getScopeData().transactionName;
    e.forEach((e => {
      const t = e;
      if (!t.identifier) return;
      const n = t.name,
        o = t.renderTime,
        s = t.loadTime,
        [i, a] = s ? [Of(s), "load-time"] : o ? [Of(o), "render-time"] : [Z(), "entry-emission"],
        c = "image-paint" === n ? Of(Math.max(0, (o ?? 0) - (s ?? 0))) : 0,
        u = {
          [kn]: "auto.ui.browser.elementtiming",
          [wn]: "ui.elementtiming",
          [vn]: "component",
          "sentry.span_start_time_source": a,
          "sentry.transaction_name": r,
          "element.id": t.id,
          "element.type": t.element?.tagName?.toLowerCase() || "unknown",
          "element.size": t.naturalWidth && t.naturalHeight ? `${t.naturalWidth}x${t.naturalHeight}` : void 0,
          "element.render_time": o,
          "element.load_time": s,
          "element.url": t.url || void 0,
          "element.identifier": t.identifier,
          "element.paint_type": n
        };
      Ds({
        name: `element[${t.identifier}]`,
        attributes: u,
        startTime: i,
        onlyIfParent: !0
      }, (e => {
        e.end(i + c)
      }))
    }))
  }, em = "sentry_previous_trace";

  function tm(e) {
    return 1 === e.traceFlags
  }
  const nm = {
    ...Uf,
    instrumentNavigation: !0,
    instrumentPageLoad: !0,
    markBackgroundSpan: !0,
    enableLongTask: !0,
    enableLongAnimationFrame: !0,
    enableInp: !0,
    enableElementTiming: !0,
    ignoreResourceSpans: [],
    ignorePerformanceApiSpans: [],
    linkPreviousTrace: "in-memory",
    consistentTraceSampling: !1,
    _experiments: {},
    ...Nf
  }, rm = (e = {}) => {
    const t = {
        name: void 0,
        source: void 0
      },
      n = ho.document,
      {
        enableInp: o,
        enableElementTiming: s,
        enableLongTask: i,
        enableLongAnimationFrame: a,
        _experiments: {
          enableInteractions: c,
          enableStandaloneClsSpans: u,
          enableStandaloneLcpSpans: l
        },
        beforeStartSpan: d,
        idleTimeout: p,
        finalTimeout: h,
        childSpanTimeout: f,
        markBackgroundSpan: m,
        traceFetch: _,
        traceXHR: y,
        trackFetchStreamPerformance: v,
        shouldCreateSpanForRequest: b,
        enableHTTPTimings: S,
        ignoreResourceSpans: w,
        ignorePerformanceApiSpans: k,
        instrumentPageLoad: E,
        instrumentNavigation: C,
        linkPreviousTrace: M,
        consistentTraceSampling: R,
        onRequestSpanStart: O
      } = {
        ...nm,
        ...e
      };
    let L;

    function D(e, r) {
      const o = "pageload" === r.op,
        s = d ? d(r) : r,
        i = s.attributes || {};
      r.name !== s.name && (i[vn] = "custom", s.attributes = i), t.name = s.name, t.source = i[vn];
      const a = jf(s, {
        idleTimeout: p,
        finalTimeout: h,
        childSpanTimeout: f,
        disableAutoFinish: o,
        beforeSpanEnd: t => {
          L?.(),
            function(e, t) {
              const n = Rf(),
                r = ee();
              if (!n?.getEntries || !r) return;
              const o = Of(r),
                s = n.getEntries(),
                {
                  op: i,
                  start_timestamp: a
                } = lr(e);
              if (s.slice(qf).forEach((n => {
                  const r = Of(n.startTime),
                    s = Of(Math.max(0, n.duration));
                  if (!("navigation" === i && a && o + r < a)) switch (n.entryType) {
                    case "navigation":
                      ! function(e, t, n) {
                        ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((r => {
                            Gf(e, t, r, n)
                          })), Gf(e, t, "secureConnection", n, "TLS/SSL"), Gf(e, t, "fetch", n, "cache"), Gf(e, t, "domainLookup", n, "DNS"),
                          function(e, t, n) {
                            const r = n + Of(t.requestStart),
                              o = n + Of(t.responseEnd),
                              s = n + Of(t.responseStart);
                            t.responseEnd && (If(e, r, o, {
                              op: "browser.request",
                              name: t.name,
                              attributes: {
                                [kn]: "auto.ui.browser.metrics"
                              }
                            }), If(e, s, o, {
                              op: "browser.response",
                              name: t.name,
                              attributes: {
                                [kn]: "auto.ui.browser.metrics"
                              }
                            }))
                          }(e, t, n)
                      }(e, n, o);
                      break;
                    case "mark":
                    case "paint":
                    case "measure": {
                      ! function(e, t, n, r, o, s) {
                        if (["mark", "measure"].includes(t.entryType) && P(t.name, s)) return;
                        const i = uu(!1),
                          a = Of(i ? i.requestStart : 0),
                          c = o + Math.max(n, a),
                          u = o + n,
                          l = u + r,
                          d = {
                            [kn]: "auto.resource.browser.metrics"
                          };
                        c !== u && (d["sentry.browser.measure_happened_before_request"] = !0, d["sentry.browser.measure_start_time"] = c),
                          function(e, t) {
                            try {
                              const n = t.detail;
                              if (!n) return;
                              if ("object" == typeof n) {
                                for (const [t, r] of Object.entries(n))
                                  if (r && g(r)) e[`sentry.browser.measure.detail.${t}`] = r;
                                  else if (void 0 !== r) try {
                                  e[`sentry.browser.measure.detail.${t}`] = JSON.stringify(r)
                                } catch {}
                                return
                              }
                              if (g(n)) return void(e["sentry.browser.measure.detail"] = n);
                              try {
                                e["sentry.browser.measure.detail"] = JSON.stringify(n)
                              } catch {}
                            } catch {}
                          }(d, t), c <= l && If(e, c, l, {
                            name: t.name,
                            op: t.entryType,
                            attributes: d
                          })
                      }(e, n, r, s, o, t.ignorePerformanceApiSpans);
                      const i = bu(),
                        a = n.startTime < i.firstHiddenTime;
                      "first-paint" === n.name && a && (Wf.fp = {
                        value: n.startTime,
                        unit: "millisecond"
                      }), "first-contentful-paint" === n.name && a && (Wf.fcp = {
                        value: n.startTime,
                        unit: "millisecond"
                      });
                      break
                    }
                    case "resource":
                      ! function(e, t, n, r, o, s, i) {
                        if ("xmlhttprequest" === t.initiatorType || "fetch" === t.initiatorType) return;
                        const a = t.initiatorType ? `resource.${t.initiatorType}` : "resource.other";
                        if (i?.includes(a)) return;
                        const c = sc(n),
                          u = {
                            [kn]: "auto.resource.browser.metrics"
                          };
                        Jf(u, t, "transferSize", "http.response_transfer_size"), Jf(u, t, "encodedBodySize", "http.response_content_length"), Jf(u, t, "decodedBodySize", "http.decoded_response_content_length");
                        const l = t.deliveryType;
                        null != l && (u["http.response_delivery_type"] = l);
                        const d = t.renderBlockingStatus;
                        d && (u["resource.render_blocking_status"] = d), c.protocol && (u["url.scheme"] = c.protocol.split(":").pop()), c.host && (u["server.address"] = c.host), u["url.same_origin"] = n.includes(Ea.location.origin);
                        const {
                          name: p,
                          version: h
                        } = Af(t.nextHopProtocol);
                        u["network.protocol.name"] = p, u["network.protocol.version"] = h;
                        const f = s + r;
                        If(e, f, f + o, {
                          name: n.replace(Ea.location.origin, ""),
                          op: a,
                          attributes: u
                        })
                      }(e, n, n.name, r, s, o, t.ignoreResourceSpans)
                  }
                })), qf = Math.max(s.length - 1, 0), function(e) {
                  const t = Ea.navigator;
                  if (!t) return;
                  const n = t.connection;
                  n && (n.effectiveType && e.setAttribute("effectiveConnectionType", n.effectiveType), n.type && e.setAttribute("connectionType", n.type), Tf(n.rtt) && (Wf["connection.rtt"] = {
                    value: n.rtt,
                    unit: "millisecond"
                  })), Tf(t.deviceMemory) && e.setAttribute("deviceMemory", `${t.deviceMemory} GB`), Tf(t.hardwareConcurrency) && e.setAttribute("hardwareConcurrency", String(t.hardwareConcurrency))
                }(e), "pageload" === i) {
                ! function(e) {
                  const t = uu(!1);
                  if (!t) return;
                  const {
                    responseStart: n,
                    requestStart: r
                  } = t;
                  r <= n && (e["ttfb.requestTime"] = {
                    value: n - r,
                    unit: "millisecond"
                  })
                }(Wf);
                const n = Wf["mark.fid"];
                n && Wf.fid && (If(e, n.value, n.value + Of(Wf.fid.value), {
                    name: "first input delay",
                    op: "ui.action",
                    attributes: {
                      [kn]: "auto.ui.browser.metrics"
                    }
                  }), delete Wf["mark.fid"]), "fcp" in Wf && t.recordClsOnPageloadSpan || delete Wf.cls, t.recordLcpOnPageloadSpan || delete Wf.lcp, Object.entries(Wf).forEach((([e, t]) => {
                    Is(e, t.value, t.unit)
                  })), e.setAttribute("performance.timeOrigin", o), e.setAttribute("performance.activationStart", lu()),
                  function(e, t) {
                    Hf && t.recordLcpOnPageloadSpan && (Hf.element && e.setAttribute("lcp.element", x(Hf.element)), Hf.id && e.setAttribute("lcp.id", Hf.id), Hf.url && e.setAttribute("lcp.url", Hf.url.trim().slice(0, 200)), null != Hf.loadTime && e.setAttribute("lcp.loadTime", Hf.loadTime), null != Hf.renderTime && e.setAttribute("lcp.renderTime", Hf.renderTime), e.setAttribute("lcp.size", Hf.size)), zf?.sources && t.recordClsOnPageloadSpan && zf.sources.forEach(((t, n) => e.setAttribute(`cls.source.${n+1}`, x(t.node))))
                  }(e, t)
              }
              Hf = void 0, zf = void 0, Wf = {}
            }(t, {
              recordClsOnPageloadSpan: !u,
              recordLcpOnPageloadSpan: !l,
              ignoreResourceSpans: w,
              ignorePerformanceApiSpans: k
            }), um(e, void 0);
          const n = me(),
            r = n.getPropagationContext();
          n.setPropagationContext({
            ...r,
            traceId: a.spanContext().traceId,
            sampled: dr(a),
            dsc: xr(t)
          })
        }
      });

      function c() {
        n && ["interactive", "complete"].includes(n.readyState) && e.emit("idleSpanEnableAutoFinish", a)
      }
      um(e, a), o && n && (n.addEventListener("readystatechange", (() => {
        c()
      })), c())
    }
    return {
      name: "BrowserTracing",
      setup(e) {
        function t() {
          const t = cm(e);
          t && !lr(t).timestamp && (vc && A.log(`[Tracing] Finishing current active span with op: ${lr(t).op}`), t.setAttribute(En, "cancelled"), t.end())
        }
        Gi(), L = Vf({
          recordClsStandaloneSpans: u || !1,
          recordLcpStandaloneSpans: l || !1
        }), o && function() {
          if (Rf() && ee()) {
            const e = Xu(Zf);
            return () => {
              e()
            }
          }
        }(), s && Rf() && ee() && Zu("element", Qf), a && r.PerformanceObserver && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes("long-animation-frame") ? new PerformanceObserver((e => {
          const t = yr();
          if (t)
            for (const n of e.getEntries()) {
              if (!n.scripts[0]) continue;
              const e = Of(ee() + n.startTime),
                {
                  start_timestamp: r,
                  op: o
                } = lr(t);
              if ("navigation" === o && r && e < r) continue;
              const s = Of(n.duration),
                i = {
                  [kn]: "auto.ui.browser.metrics"
                },
                a = n.scripts[0],
                {
                  invoker: c,
                  invokerType: u,
                  sourceURL: l,
                  sourceFunctionName: d,
                  sourceCharPosition: p
                } = a;
              i["browser.script.invoker"] = c, i["browser.script.invoker_type"] = u, l && (i["code.filepath"] = l), d && (i["code.function"] = d), -1 !== p && (i["browser.script.source_char_position"] = p), If(t, e, e + s, {
                name: "Main UI thread blocked",
                op: "ui.long-animation-frame",
                attributes: i
              })
            }
        })).observe({
          type: "long-animation-frame",
          buffered: !0
        }) : i && Zu("longtask", (({
          entries: e
        }) => {
          const t = yr();
          if (!t) return;
          const {
            op: n,
            start_timestamp: r
          } = lr(t);
          for (const o of e) {
            const e = Of(ee() + o.startTime),
              s = Of(o.duration);
            "navigation" === n && r && e < r || If(t, e, e + s, {
              name: "Main UI thread blocked",
              op: "ui.long-task",
              attributes: {
                [kn]: "auto.ui.browser.metrics"
              }
            })
          }
        })), c && Zu("event", (({
          entries: e
        }) => {
          const t = yr();
          if (t)
            for (const n of e)
              if ("click" === n.name) {
                const e = Of(ee() + n.startTime),
                  r = Of(n.duration),
                  o = {
                    name: x(n.target),
                    op: `ui.interaction.${n.name}`,
                    startTime: e,
                    attributes: {
                      [kn]: "auto.ui.browser.metrics"
                    }
                  },
                  s = I(n.target);
                s && (o.attributes["ui.component_name"] = s), If(t, e, e + r, o)
              }
        })), e.on("startNavigationSpan", (n => {
          if (be() !== e) return;
          t(), ge().setPropagationContext({
            traceId: re(),
            sampleRand: Math.random()
          });
          const r = me();
          r.setPropagationContext({
            traceId: re(),
            sampleRand: Math.random()
          }), r.setSDKProcessingMetadata({
            normalizedRequest: void 0
          }), D(e, {
            op: "navigation",
            ...n
          })
        })), e.on("startPageLoadSpan", ((n, r = {}) => {
          if (be() !== e) return;
          t();
          const o = er(r.sentryTrace || im("sentry-trace"), r.baggage || im("baggage")),
            s = me();
          s.setPropagationContext(o), s.setSDKProcessingMetadata({
            normalizedRequest: _o()
          }), D(e, {
            op: "pageload",
            ...n
          })
        }))
      },
      afterAllSetup(e) {
        let n = T();
        if ("off" !== M && function(e, {
            linkPreviousTrace: t,
            consistentTraceSampling: n
          }) {
            const r = "session-storage" === t;
            let o = r ? function() {
              try {
                const e = ho.sessionStorage?.getItem(em);
                return JSON.parse(e)
              } catch (e) {
                return
              }
            }() : void 0;
            e.on("spanStart", (e => {
              if (_r(e) !== e) return;
              const t = me().getPropagationContext();
              o = function(e, t, n) {
                const r = lr(t),
                  o = {
                    spanContext: t.spanContext(),
                    startTimestamp: r.start_timestamp,
                    sampleRate: function() {
                      try {
                        return Number(n.dsc?.sample_rate) ?? Number(r.data?.[bn])
                      } catch {
                        return 0
                      }
                    }(),
                    sampleRand: n.sampleRand
                  };
                if (!e) return o;
                const s = e.spanContext;
                return s.traceId === r.trace_id ? e : (Date.now() / 1e3 - e.startTimestamp <= 3600 && (vc && A.info(`Adding previous_trace ${s} link to span ${{op:r.op,...t.spanContext()}}`), t.addLink({
                  context: s,
                  attributes: {
                    [Rn]: "previous_trace"
                  }
                }), t.setAttribute("sentry.previous_trace", `${s.traceId}-${s.spanId}-${tm(s)?1:0}`)), o)
              }(o, e, t), r && function(e) {
                try {
                  ho.sessionStorage.setItem(em, JSON.stringify(e))
                } catch (e) {
                  vc && A.warn("Could not store previous trace in sessionStorage", e)
                }
              }(o)
            }));
            let s = !0;
            n && e.on("beforeSampling", (e => {
              if (!o) return;
              const t = me(),
                n = t.getPropagationContext();
              s && n.parentSpanId ? s = !1 : (t.setPropagationContext({
                ...n,
                dsc: {
                  ...n.dsc,
                  sample_rate: String(o.sampleRate),
                  sampled: String(tm(o.spanContext))
                },
                sampleRand: o.sampleRand
              }), e.parentSampled = tm(o.spanContext), e.parentSampleRate = o.sampleRate, e.spanAttributes = {
                ...e.spanAttributes,
                [Sn]: o.sampleRate
              })
            }))
          }(e, {
            linkPreviousTrace: M,
            consistentTraceSampling: R
          }), ho.location) {
          if (E) {
            const t = ee();
            om(e, {
              name: ho.location.pathname,
              startTime: t ? t / 1e3 : void 0,
              attributes: {
                [vn]: "url",
                [kn]: "auto.pageload.browser"
              }
            })
          }
          C && _c((({
            to: t,
            from: r
          }) => {
            if (void 0 === r && -1 !== n?.indexOf(t)) return void(n = void 0);
            n = void 0;
            const o = rc(t);
            sm(e, {
              name: o?.pathname || ho.location.pathname,
              attributes: {
                [vn]: "url",
                [kn]: "auto.navigation.browser"
              }
            }), me().setSDKProcessingMetadata({
              normalizedRequest: {
                ..._o(),
                url: t
              }
            })
          }))
        }
        m && (ho.document ? ho.document.addEventListener("visibilitychange", (() => {
          const e = yr();
          if (!e) return;
          const t = _r(e);
          if (ho.document.hidden && t) {
            const e = "cancelled",
              {
                op: n,
                status: r
              } = lr(t);
            vc && A.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${n}`), r || t.setStatus({
              code: Vn,
              message: e
            }), t.setAttribute("sentry.cancellation_reason", "document.hidden"), t.end()
          }
        })) : vc && A.warn("[Tracing] Could not set up background tab detection due to lack of global document")), c && function(e, t, n, r, o) {
          let s;
          ho.document && addEventListener("click", (() => {
            const i = "ui.action.click",
              a = cm(e);
            if (a) {
              const e = lr(a).op;
              if (["navigation", "pageload"].includes(e)) return void(vc && A.warn(`[Tracing] Did not create ${i} span because a pageload or navigation span is in progress.`))
            }
            s && (s.setAttribute(En, "interactionInterrupted"), s.end(), s = void 0), o.name ? s = jf({
              name: o.name,
              op: i,
              attributes: {
                [vn]: o.source || "url"
              }
            }, {
              idleTimeout: t,
              finalTimeout: n,
              childSpanTimeout: r
            }) : vc && A.warn(`[Tracing] Did not create ${i} transaction because _latestRouteName is missing.`)
          }), {
            once: !1,
            capture: !0
          })
        }(e, p, h, f, t), o && function() {
          const e = ({
            entries: e
          }) => {
            const t = yr(),
              n = t && _r(t);
            e.forEach((e => {
              if (! function(e) {
                  return "duration" in e
                }(e) || !n) return;
              const t = e.interactionId;
              if (null != t && !Yf.has(t)) {
                if (Kf.length > 10) {
                  const e = Kf.shift();
                  Yf.delete(e)
                }
                Kf.push(t), Yf.set(t, n)
              }
            }))
          };
          Zu("event", e), Zu("first-input", e)
        }(), Pf(e, {
          traceFetch: _,
          traceXHR: y,
          trackFetchStreamPerformance: v,
          tracePropagationTargets: e.getOptions().tracePropagationTargets,
          shouldCreateSpanForRequest: b,
          enableHTTPTimings: S,
          onRequestSpanStart: O
        })
      }
    }
  };

  function om(e, t, n) {
    return e.emit("startPageLoadSpan", t, n), me().setTransactionName(t.name), cm(e)
  }

  function sm(e, t) {
    return e.emit("startNavigationSpan", t), me().setTransactionName(t.name), cm(e)
  }

  function im(e) {
    const t = ho.document,
      n = t?.querySelector(`meta[name=${e}]`);
    return n?.getAttribute("content") || void 0
  }
  const am = "_sentry_idleSpan";

  function cm(e) {
    return e[am]
  }

  function um(e, t) {
    $(e, am, t)
  }
  const lm = 100, dm = 5e3, pm = 36e5;

  function hm(e) {
    return new Promise(((t, n) => {
      e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => n(e.error)
    }))
  }

  function fm(e) {
    return hm(e.getAllKeys())
  }

  function mm(e) {
    let t;

    function n() {
      return null == t && (t = function(e, t) {
        const n = indexedDB.open(e);
        n.onupgradeneeded = () => n.result.createObjectStore(t);
        const r = hm(n);
        return e => r.then((n => e(n.transaction(t, "readwrite").objectStore(t))))
      }(e.dbName || "sentry-offline", e.storeName || "queue")), t
    }
    return {
      push: async t => {
        try {
          const r = await Oo(t);
          await
          function(e, t, n) {
            return e((e => fm(e).then((r => {
              if (!(r.length >= n)) return e.put(t, Math.max(...r, 0) + 1), hm(e.transaction)
            }))))
          }(n(), r, e.maxQueueSize || 30)
        } catch (e) {}
      },
      unshift: async t => {
        try {
          const r = await Oo(t);
          await
          function(e, t, n) {
            return e((e => fm(e).then((r => {
              if (!(r.length >= n)) return e.put(t, Math.min(...r, 0) - 1), hm(e.transaction)
            }))))
          }(n(), r, e.maxQueueSize || 30)
        } catch (e) {}
      },
      shift: async () => {
        try {
          const e = await
          function(e) {
            return e((e => fm(e).then((t => {
              const n = t[0];
              if (null != n) return hm(e.get(n)).then((t => (e.delete(n), hm(e.transaction).then((() => t)))))
            }))))
          }(n());
          if (e) return function(e) {
            let t = "string" == typeof e ? Ro(e) : e;

            function n(e) {
              const n = t.subarray(0, e);
              return t = t.subarray(e + 1), n
            }

            function o() {
              let e = t.indexOf(10);
              return e < 0 && (e = t.length), JSON.parse(function(e) {
                const t = i(r);
                return t.decodePolyfill ? t.decodePolyfill(e) : (new TextDecoder).decode(e)
              }(n(e)))
            }
            const s = o(),
              a = [];
            for (; t.length;) {
              const e = o(),
                t = "number" == typeof e.length ? e.length : void 0;
              a.push([e, t ? n(t) : o()])
            }
            return [s, a]
          }(e)
        } catch (e) {}
      }
    }
  }

  function gm(e = Ma) {
    return function(e) {
      return t => {
        const n = e({
          ...t,
          createStore: mm
        });
        return ho.addEventListener("online", (async e => {
          await n.flush()
        })), n
      }
    }(function(e) {
      function t(...e) {
        c && A.info("[Offline]:", ...e)
      }
      return n => {
        const r = e(n);
        if (!n.createStore) throw new Error("No `createStore` function was provided");
        const o = n.createStore(n);
        let s, i = dm;

        function a(e) {
          s && clearTimeout(s), s = setTimeout((async () => {
            s = void 0;
            const e = await o.shift();
            e && (t("Attempting to send previously queued event"), e[0].sent_at = (new Date).toISOString(), u(e, !0).catch((e => {
              t("Failed to retry sending", e)
            })))
          }), e), "number" != typeof s && s.unref && s.unref()
        }

        function c() {
          s || (a(i), i = Math.min(2 * i, pm))
        }
        async function u(e, s = !1) {
          if (!s && Mo(e, ["replay_event", "replay_recording"])) return await o.push(e), a(lm), {};
          try {
            if (n.shouldSend && !1 === await n.shouldSend(e)) throw new Error("Envelope not sent because `shouldSend` callback returned false");
            const t = await r.send(e);
            let o = lm;
            if (t)
              if (t.headers?.["retry-after"]) o = Ks(t.headers["retry-after"]);
              else if (t.headers?.["x-sentry-rate-limits"]) o = 6e4;
            else if ((t.statusCode || 0) >= 400) return t;
            return a(o), i = dm, t
          } catch (r) {
            if (await
              function(e, t, r) {
                return !Mo(e, ["client_report"]) && (!n.shouldStore || n.shouldStore(e, t, r))
              }(e, r, i)) return s ? await o.unshift(e) : await o.push(e), c(), t("Error sending. Event queued.", r), {};
            throw r
          }
        }
        return n.flushAtStartup && c(), {
          send: u,
          flush: e => (void 0 === e && (i = dm, a(lm)), r.flush(e))
        }
      }
    }(e))
  }
  const _m = 1e6, ym = String(0), vm = ho.navigator;
  let bm = "", Sm = "", wm = "", km = vm?.userAgent || "", Em = "";
  const xm = vm?.language || vm?.languages?.[0] || "", Cm = vm?.userAgentData;
  var Tm;

  function Im(e, t, n, r) {
    if ("transaction" !== r.type) throw new TypeError("Profiling events may only be attached to transactions, this should never occur.");
    if (null == n) throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${n} instead.`);
    const o = function(e) {
        const t = e.contexts?.trace?.trace_id;
        return "string" == typeof t && 32 !== t.length && vc && A.log(`[Profiling] Invalid traceId: ${t} on profiled event`), "string" != typeof t ? "" : t
      }(r),
      s = function(e) {
        return !("thread_metadata" in e)
      }(c = n) ? function(e) {
        let t, n = 0;
        const r = {
            samples: [],
            stacks: [],
            frames: [],
            thread_metadata: {
              [ym]: {
                name: "main"
              }
            }
          },
          o = e.samples[0];
        if (!o) return r;
        const s = o.timestamp,
          i = ee(),
          a = "number" == typeof performance.timeOrigin ? performance.timeOrigin : i || 0,
          c = a - (i || a);
        return e.samples.forEach(((o, i) => {
          if (void 0 === o.stackId) return void 0 === t && (t = n, r.stacks[t] = [], n++), void(r.samples[i] = {
            elapsed_since_start_ns: ((o.timestamp + c - s) * _m).toFixed(0),
            stack_id: t,
            thread_id: ym
          });
          let a = e.stacks[o.stackId];
          const u = [];
          for (; a;) {
            u.push(a.frameId);
            const t = e.frames[a.frameId];
            t && void 0 === r.frames[a.frameId] && (r.frames[a.frameId] = {
              function: t.name,
              abs_path: "number" == typeof t.resourceId ? e.resources[t.resourceId] : void 0,
              lineno: t.line,
              colno: t.column
            }), a = void 0 === a.parentId ? void 0 : e.stacks[a.parentId]
          }
          const l = {
            elapsed_since_start_ns: ((o.timestamp + c - s) * _m).toFixed(0),
            stack_id: n,
            thread_id: ym
          };
          r.stacks[n] = u, r.samples[i] = l, n++
        })), r
      }(c) : c,
      i = t || ("number" == typeof r.start_timestamp ? 1e3 * r.start_timestamp : 1e3 * Z()),
      a = "number" == typeof r.timestamp ? 1e3 * r.timestamp : 1e3 * Z();
    var c;
    return {
      event_id: e,
      timestamp: new Date(i).toISOString(),
      platform: "javascript",
      version: "1",
      release: r.release || "",
      environment: r.environment || hn,
      runtime: {
        name: "javascript",
        version: ho.navigator.userAgent
      },
      os: {
        name: bm,
        version: Sm,
        build_number: km
      },
      device: {
        locale: xm,
        model: Em,
        manufacturer: km,
        architecture: wm,
        is_emulator: !1
      },
      debug_meta: {
        images: Rm(n.resources)
      },
      profile: s,
      transactions: [{
        name: r.transaction || "",
        id: r.event_id || q(),
        trace_id: o,
        active_thread_id: ym,
        relative_start_ns: "0",
        relative_end_ns: (1e6 * (a - i)).toFixed(0)
      }]
    }
  }

  function Mm(e) {
    return "pageload" === lr(e).op
  }

  function Rm(e) {
    const t = be(),
      n = t?.getOptions(),
      r = n?.stackParser;
    return r ? function(e, t) {
      const n = Ar(e);
      if (!n) return [];
      const r = [];
      for (const e of t) e && n[e] && r.push({
        type: "sourcemap",
        code_file: e,
        debug_id: n[e]
      });
      return r
    }(r, e) : []
  }
  "object" == typeof(Tm = Cm) && null !== Tm && "getHighEntropyValues" in Tm && Cm.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "fullVersionList"]).then((e => {
    if (bm = e.platform || "", wm = e.architecture || "", Em = e.model || "", Sm = e.platformVersion || "", e.fullVersionList?.length) {
      const t = e.fullVersionList[e.fullVersionList.length - 1];
      km = `${t.brand} ${t.version}`
    }
  })).catch((e => {}));
  let Om = !1;

  function Am(e) {
    if (Om) return vc && A.log("[Profiling] Profiling has been disabled for the duration of the current user session."), !1;
    if (!e.isRecording()) return vc && A.log("[Profiling] Discarding profile because transaction was not sampled."), !1;
    const t = be(),
      n = t?.getOptions();
    if (!n) return vc && A.log("[Profiling] Profiling disabled, no options found."), !1;
    const r = n.profilesSampleRate;
    return ("number" != typeof(o = r) && "boolean" != typeof o || "number" == typeof o && isNaN(o) ? (vc && A.warn(`[Profiling] Invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(o)} of type ${JSON.stringify(typeof o)}.`), 0) : !0 === o || !1 === o || !(o < 0 || o > 1) || (vc && A.warn(`[Profiling] Invalid sample rate. Sample rate must be between 0 and 1. Got ${o}.`), 0)) ? r ? !!(!0 === r || Math.random() < r) || (vc && A.log(`[Profiling] Discarding profile because it's not included in the random sample (sampling rate = ${Number(r)})`), !1) : (vc && A.log("[Profiling] Discarding profile because a negative sampling decision was inherited or profileSampleRate is set to 0"), !1) : (vc && A.warn("[Profiling] Discarding profile because of invalid sample rate."), !1);
    var o
  }

  function Lm(e, t, n, r) {
    return function(e) {
      return e.samples.length < 2 ? (vc && A.log("[Profiling] Discarding profile because it contains less than 2 samples"), !1) : !!e.frames.length || (vc && A.log("[Profiling] Discarding profile because it contains no frames"), !1)
    }(n) ? Im(e, t, n, r) : null
  }
  const Dm = new Map;

  function Nm(e) {
    const t = Dm.get(e);
    return t && Dm.delete(e), t
  }

  function Pm(e) {
    let t;
    Mm(e) && (t = 1e3 * Z());
    const n = function() {
      const e = ho.Profiler;
      if ("function" != typeof e) return void(vc && A.log("[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object."));
      const t = Math.floor(3e3);
      try {
        return new e({
          sampleInterval: 10,
          maxBufferSize: t
        })
      } catch (e) {
        vc && (A.log("[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header."), A.log("[Profiling] Disabling profiling for current user session.")), Om = !0
      }
    }();
    if (!n) return;
    vc && A.log(`[Profiling] started profiling span: ${lr(e).description}`);
    const r = q();
    async function o() {
      if (e && n) return n.stop().then((t => {
        s && (ho.clearTimeout(s), s = void 0), vc && A.log(`[Profiling] stopped profiling of span: ${lr(e).description}`), t ? function(e, t) {
          if (Dm.set(e, t), Dm.size > 30) {
            const e = Dm.keys().next().value;
            Dm.delete(e)
          }
        }(r, t) : vc && A.log(`[Profiling] profiler returned null profile for: ${lr(e).description}`, "this may indicate an overlapping span or a call to stopProfiling with a profile title that was never started")
      })).catch((e => {
        vc && A.log("[Profiling] error while stopping profiler:", e)
      }))
    }
    me().setContext("profile", {
      profile_id: r,
      start_timestamp: t
    });
    let s = ho.setTimeout((() => {
      vc && A.log("[Profiling] max profile duration elapsed, stopping profiling for:", lr(e).description), o()
    }), 3e4);
    const i = e.end.bind(e);
    e.end = function() {
      return e ? (o().then((() => {
        i()
      }), (() => {
        i()
      })), e) : i()
    }
  }
  const Fm = () => ({
    name: "BrowserProfiling",
    setup(e) {
      const t = yr(),
        n = t && _r(t);
      n && Mm(n) && Am(n) && Pm(n), e.on("spanStart", (e => {
        e === _r(e) && Am(e) && Pm(e)
      })), e.on("beforeEnvelope", (e => {
        if (!Dm.size) return;
        const t = function(e) {
          const t = [];
          return Io(e, ((e, n) => {
            if ("transaction" === n)
              for (let n = 1; n < e.length; n++) {
                const r = e[n];
                r?.contexts && r.contexts.profile && r.contexts.profile.profile_id && t.push(e[n])
              }
          })), t
        }(e);
        if (!t.length) return;
        const n = [];
        for (const e of t) {
          const t = e?.contexts,
            r = t?.profile?.profile_id,
            o = t?.profile?.start_timestamp;
          if ("string" != typeof r) {
            vc && A.log("[Profiling] cannot find profile for a span without a profile context");
            continue
          }
          if (!r) {
            vc && A.log("[Profiling] cannot find profile for a span without a profile context");
            continue
          }
          t?.profile && delete t.profile;
          const s = Nm(r);
          if (!s) {
            vc && A.log(`[Profiling] Could not retrieve profile for span: ${r}`);
            continue
          }
          const i = Lm(r, o, s, e);
          i && n.push(i)
        }! function(e, t) {
          if (!t.length) return e;
          for (const n of t) e[1].push([{
            type: "profile"
          }, n])
        }(e, n)
      }))
    }
  }), $m = (e = {}) => {
    const t = e.sidecarUrl || "http://localhost:8969/stream";
    return {
      name: "SpotlightBrowser",
      setup: () => {
        vc && A.log("Using Sidecar URL", t)
      },
      processEvent: e => function(e) {
        return Boolean("transaction" === e.type && e.spans && e.contexts && e.contexts.trace && "ui.action.click" === e.contexts.trace.op && e.spans.some((({
          description: e
        }) => e?.includes("#sentry-spotlight"))))
      }(e) ? null : e,
      afterAllSetup: e => {
        ! function(e, t) {
          const n = Ca("fetch");
          let r = 0;
          e.on("beforeEnvelope", (e => {
            r > 3 ? A.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests:", r) : n(t, {
              method: "POST",
              body: Oo(e),
              headers: {
                "Content-Type": "application/x-sentry-envelope"
              },
              mode: "cors"
            }).then((e => {
              e.status >= 200 && e.status < 400 && (r = 0)
            }), (e => {
              r++, A.error("Sentry SDK can't connect to Sidecar is it running? See: https://spotlightjs.com/sidecar/npx/", e)
            }))
          }))
        }(e, t)
      }
    }
  }, Bm = () => ({
    name: "LaunchDarkly",
    processEvent: (e, t, n) => hi(e)
  });

  function Um() {
    return {
      name: "sentry-flag-auditor",
      type: "flag-used",
      synchronous: !0,
      method: (e, t, n) => {
        fi(e, t.value), mi(e, t.value)
      }
    }
  }
  const jm = () => ({
    name: "OpenFeature",
    processEvent: (e, t, n) => hi(e)
  }); class Hm {
    after(e, t) {
      fi(t.flagKey, t.value), mi(t.flagKey, t.value)
    }
    error(e, t, n) {
      fi(e.flagKey, e.defaultValue), mi(e.flagKey, e.defaultValue)
    }
  }
  const zm = ({
    featureFlagClientClass: e
  }) => ({
    name: "Unleash",
    setupOnce() {
      F(e.prototype, "isEnabled", qm)
    },
    processEvent: (e, t, n) => hi(e)
  });

  function qm(e) {
    return function(...t) {
      const n = t[0],
        r = e.apply(this, t);
      return "string" == typeof n && "boolean" == typeof r ? (fi(n, r), mi(n, r)) : vc && A.error(`[Feature Flags] UnleashClient.isEnabled does not match expected signature. arg0: ${n} (${typeof n}), result: ${r} (${typeof r})`), r
    }
  }
  const Wm = ({
    featureFlagClient: e
  }) => ({
    name: "Statsig",
    setup(t) {
      e.on("gate_evaluation", (e => {
        fi(e.gate.name, e.gate.value), mi(e.gate.name, e.gate.value)
      }))
    },
    processEvent: (e, t, n) => hi(e)
  }); async function Vm() {
    const e = be();
    if (!e) return "no-client-active";
    if (!e.getDsn()) return "no-dsn-configured";
    try {
      await fetch("https://o447951.ingest.sentry.io/api/1337/envelope/?sentry_version=7&sentry_key=1337&sentry_client=sentry.javascript.browser%2F1.33.7", {
        body: "{}",
        method: "POST",
        mode: "cors",
        credentials: "omit"
      })
    } catch {
      return "sentry-unreachable"
    }
  }
  var Gm, Jm, Km, Ym = new Set(["slots/snoop_dogg_dollars", "casual/space_xy", "slots/burning_chilli_x", "slots/bonanza_billion", "slots/olympus_trueways", "casual/plinko2"]), Xm = new Set(["game_preloading_progress", "api_response"]); window.BSentry = n, console.log("Wrapper v".concat("1.1.1")), Ym.has(null === (Gm = window.__OPTIONS__) || void 0 === Gm ? void 0 : Gm.game) && (Fc({
    dsn: "https://88777cb675fa4d2a8c8b106539b5d1fc@sentry.bgaming-system.com/25",
    environment: "production",
    integrations: [rm()],
    sampleRate: .1,
    tracesSampleRate: .1,
    attachStacktrace: !0,
    denyUrls: [/moz-extension:/, /chrome-extension:/, /edge-extension:/]
  }), eo("game", null === (Km = window.__OPTIONS__) || void 0 === Km ? void 0 : Km.game), "function" == typeof(Jm = function(e, t, n) {
    Xm.has(e) || hs({
      category: "game_event",
      message: e,
      data: n
    })
  }) ? (window.trackGameEventListeners || (window.trackGameEventListeners = []), window.trackGameEventListeners.push(Jm)) : console.warn("addEventProcessor: processor must be a function"))
})();
//# sourceMappingURL=wrapper.js.map
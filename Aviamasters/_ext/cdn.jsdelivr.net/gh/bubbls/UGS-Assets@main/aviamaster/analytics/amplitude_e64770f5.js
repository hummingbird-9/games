/******/
(() => { // webpackBootstrap
  /******/
  "use strict";
  /******/
  var __webpack_modules__ = ({

    /***/
    "../../node_modules/@growthbook/growthbook/dist/esm/GrowthBook.js":
      /*!************************************************************************!*\
        !*** ../../node_modules/@growthbook/growthbook/dist/esm/GrowthBook.js ***!
        \************************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          GrowthBook: () => ( /* binding */ GrowthBook)
          /* harmony export */
        });
        /* harmony import */
        var dom_mutator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! dom-mutator */ "../../node_modules/dom-mutator/dist/dom-mutator.esm.js");
        /* harmony import */
        var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./util */ "../../node_modules/@growthbook/growthbook/dist/esm/util.js");
        /* harmony import */
        var _mongrule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./mongrule */ "../../node_modules/@growthbook/growthbook/dist/esm/mongrule.js");
        /* harmony import */
        var _feature_repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./feature-repository */ "../../node_modules/@growthbook/growthbook/dist/esm/feature-repository.js");




        const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
        class GrowthBook {
          // context is technically private, but some tools depend on it so we can't mangle the name
          // _ctx below is a clone of this property that we use internally

          // Properties and methods that start with "_" are mangled by Terser (saves ~150 bytes)

          // eslint-disable-next-line

          constructor(context) {
            context = context || {};
            // These properties are all initialized in the constructor instead of above
            // This saves ~80 bytes in the final output
            this._ctx = this.context = context;
            this._renderer = null;
            this._trackedExperiments = new Set();
            this._trackedFeatures = {};
            this.debug = false;
            this._subscriptions = new Set();
            this._rtQueue = [];
            this._rtTimer = 0;
            this.ready = false;
            this._assigned = new Map();
            this._forcedFeatureValues = new Map();
            this._attributeOverrides = {};
            this._activeAutoExperiments = new Map();
            if (context.features) {
              this.ready = true;
            }
            if (isBrowser && context.enableDevMode) {
              window._growthbook = this;
              document.dispatchEvent(new Event("gbloaded"));
            }
            if (context.experiments) {
              this.ready = true;
              this._updateAllAutoExperiments();
            }
            if (context.clientKey) {
              this._refresh({}, true, false);
            }
          }
          async loadFeatures(options) {
            await this._refresh(options, true, true);
            if (options && options.autoRefresh) {
              (0, _feature_repository__WEBPACK_IMPORTED_MODULE_1__.subscribe)(this);
            }
          }
          async refreshFeatures(options) {
            await this._refresh(options, false, true);
          }
          getApiInfo() {
            return [(this._ctx.apiHost || "https://cdn.growthbook.io").replace(/\/*$/, ""), this._ctx.clientKey || ""];
          }
          async _refresh(options, allowStale, updateInstance) {
            options = options || {};
            if (!this._ctx.clientKey) {
              throw new Error("Missing clientKey");
            }
            await (0, _feature_repository__WEBPACK_IMPORTED_MODULE_1__.refreshFeatures)(this, options.timeout, options.skipCache || this._ctx.enableDevMode, allowStale, updateInstance);
          }
          _render() {
            if (this._renderer) {
              this._renderer();
            }
          }
          setFeatures(features) {
            this._ctx.features = features;
            this.ready = true;
            this._render();
          }
          async setEncryptedFeatures(encryptedString, decryptionKey, subtle) {
            const featuresJSON = await (0, _util__WEBPACK_IMPORTED_MODULE_2__.decrypt)(encryptedString, decryptionKey || this._ctx.decryptionKey, subtle);
            this.setFeatures(JSON.parse(featuresJSON));
          }
          setExperiments(experiments) {
            this._ctx.experiments = experiments;
            this.ready = true;
            this._updateAllAutoExperiments();
          }
          async setEncryptedExperiments(encryptedString, decryptionKey, subtle) {
            const experimentsJSON = await (0, _util__WEBPACK_IMPORTED_MODULE_2__.decrypt)(encryptedString, decryptionKey || this._ctx.decryptionKey, subtle);
            this.setExperiments(JSON.parse(experimentsJSON));
          }
          setAttributes(attributes) {
            this._ctx.attributes = attributes;
            this._render();
            this._updateAllAutoExperiments();
          }
          setAttributeOverrides(overrides) {
            this._attributeOverrides = overrides;
            this._render();
            this._updateAllAutoExperiments();
          }
          setForcedVariations(vars) {
            this._ctx.forcedVariations = vars || {};
            this._render();
            this._updateAllAutoExperiments();
          }
          // eslint-disable-next-line
          setForcedFeatures(map) {
            this._forcedFeatureValues = map;
            this._render();
          }
          setURL(url) {
            this._ctx.url = url;
            this._updateAllAutoExperiments(true);
          }
          getAttributes() {
            return {
              ...this._ctx.attributes,
              ...this._attributeOverrides
            };
          }
          getFeatures() {
            return this._ctx.features || {};
          }
          getExperiments() {
            return this._ctx.experiments || [];
          }
          subscribe(cb) {
            this._subscriptions.add(cb);
            return () => {
              this._subscriptions.delete(cb);
            };
          }
          getAllResults() {
            return new Map(this._assigned);
          }
          destroy() {
            // Release references to save memory
            this._subscriptions.clear();
            this._assigned.clear();
            this._trackedExperiments.clear();
            this._trackedFeatures = {};
            this._rtQueue = [];
            if (this._rtTimer) {
              clearTimeout(this._rtTimer);
            }
            (0, _feature_repository__WEBPACK_IMPORTED_MODULE_1__.unsubscribe)(this);
            if (isBrowser && window._growthbook === this) {
              delete window._growthbook;
            }

            // Undo any active auto experiments
            this._activeAutoExperiments.forEach(exp => {
              exp.undo();
            });
            this._activeAutoExperiments.clear();
          }
          setRenderer(renderer) {
            this._renderer = renderer;
          }
          forceVariation(key, variation) {
            this._ctx.forcedVariations = this._ctx.forcedVariations || {};
            this._ctx.forcedVariations[key] = variation;
            this._render();
          }
          run(experiment) {
            const result = this._run(experiment, null);
            this._fireSubscriptions(experiment, result);
            return result;
          }
          triggerExperiment(key) {
            if (!this._ctx.experiments) return null;
            const exp = this._ctx.experiments.find(exp => exp.key === key);
            if (!exp || !exp.manual) return null;
            return this._runAutoExperiment(exp, true);
          }
          _runAutoExperiment(experiment, forceManual, forceRerun) {
            const key = experiment.key;
            const existing = this._activeAutoExperiments.get(key);

            // If this is a manual experiment and it's not already running, skip
            if (experiment.manual && !forceManual && !existing) return null;

            // Run the experiment
            const result = this.run(experiment);

            // A hash to quickly tell if the assigned value changed
            const valueHash = JSON.stringify(result.value);

            // If the changes are already active, no need to re-apply them
            if (!forceRerun && result.inExperiment && existing && existing.valueHash === valueHash) {
              return result;
            }

            // Undo any existing changes
            if (existing) this._undoActiveAutoExperiment(key);

            // Apply new changes
            if (result.inExperiment) {
              const undo = this._applyDOMChanges(result.value);
              if (undo) {
                this._activeAutoExperiments.set(experiment.key, {
                  undo,
                  valueHash
                });
              }
            }
            return result;
          }
          _undoActiveAutoExperiment(key) {
            const exp = this._activeAutoExperiments.get(key);
            if (exp) {
              exp.undo();
              this._activeAutoExperiments.delete(key);
            }
          }
          _updateAllAutoExperiments(forceRerun) {
            const experiments = this._ctx.experiments || [];

            // Stop any experiments that are no longer defined
            const keys = new Set(experiments.map(e => e.key));
            this._activeAutoExperiments.forEach((v, k) => {
              if (!keys.has(k)) {
                v.undo();
                this._activeAutoExperiments.delete(k);
              }
            });

            // Re-run all new/updated experiments
            experiments.forEach(exp => {
              this._runAutoExperiment(exp, false, forceRerun);
            });
          }
          _fireSubscriptions(experiment, result) {
            const key = experiment.key;

            // If assigned variation has changed, fire subscriptions
            const prev = this._assigned.get(key);
            // TODO: what if the experiment definition has changed?
            if (!prev || prev.result.inExperiment !== result.inExperiment || prev.result.variationId !== result.variationId) {
              this._assigned.set(key, {
                experiment,
                result
              });
              this._subscriptions.forEach(cb => {
                try {
                  cb(experiment, result);
                } catch (e) {
                  console.error(e);
                }
              });
            }
          }
          _trackFeatureUsage(key, res) {
            // Don't track feature usage that was forced via an override
            if (res.source === "override") return;

            // Only track a feature once, unless the assigned value changed
            const stringifiedValue = JSON.stringify(res.value);
            if (this._trackedFeatures[key] === stringifiedValue) return;
            this._trackedFeatures[key] = stringifiedValue;

            // Fire user-supplied callback
            if (this._ctx.onFeatureUsage) {
              try {
                this._ctx.onFeatureUsage(key, res);
              } catch (e) {
                // Ignore feature usage callback errors
              }
            }

            // In browser environments, queue up feature usage to be tracked in batches
            if (!isBrowser || !window.fetch) return;
            this._rtQueue.push({
              key,
              on: res.on
            });
            if (!this._rtTimer) {
              this._rtTimer = window.setTimeout(() => {
                // Reset the queue
                this._rtTimer = 0;
                const q = [...this._rtQueue];
                this._rtQueue = [];

                // Skip logging if a real-time usage key is not configured
                if (!this._ctx.realtimeKey) return;
                window.fetch("https://rt.growthbook.io/?key=".concat(this._ctx.realtimeKey, "&events=").concat(encodeURIComponent(JSON.stringify(q))), {
                  cache: "no-cache",
                  mode: "no-cors"
                }).catch(() => {
                  // TODO: retry in case of network errors?
                });
              }, this._ctx.realtimeInterval || 2000);
            }
          }
          _getFeatureResult(key, value, source, ruleId, experiment, result) {
            const ret = {
              value,
              on: !!value,
              off: !value,
              source,
              ruleId: ruleId || ""
            };
            if (experiment) ret.experiment = experiment;
            if (result) ret.experimentResult = result;

            // Track the usage of this feature in real-time
            this._trackFeatureUsage(key, ret);
            return ret;
          }
          isOn(key) {
            return this.evalFeature(key).on;
          }
          isOff(key) {
            return this.evalFeature(key).off;
          }
          getFeatureValue(key, defaultValue) {
            const value = this.evalFeature(key).value;
            return value === null ? defaultValue : value;
          }

          /**
           * @deprecated Use {@link evalFeature}
           * @param id
           */
          // eslint-disable-next-line
          feature(id) {
            return this.evalFeature(id);
          }
          evalFeature(id) {
            // Global override
            if (this._forcedFeatureValues.has(id)) {
              true && this.log("Global override", {
                id,
                value: this._forcedFeatureValues.get(id)
              });
              return this._getFeatureResult(id, this._forcedFeatureValues.get(id), "override");
            }

            // Unknown feature id
            if (!this._ctx.features || !this._ctx.features[id]) {
              true && this.log("Unknown feature", {
                id
              });
              return this._getFeatureResult(id, null, "unknownFeature");
            }

            // Get the feature
            const feature = this._ctx.features[id];

            // Loop through the rules
            if (feature.rules) {
              for (const rule of feature.rules) {
                // If it's a conditional rule, skip if the condition doesn't pass
                if (rule.condition && !this._conditionPasses(rule.condition)) {
                  true && this.log("Skip rule because of condition", {
                    id,
                    rule
                  });
                  continue;
                }
                // If there are filters for who is included (e.g. namespaces)
                if (rule.filters && this._isFilteredOut(rule.filters)) {
                  true && this.log("Skip rule because of filters", {
                    id,
                    rule
                  });
                  continue;
                }

                // Feature value is being forced
                if ("force" in rule) {
                  // If this is a percentage rollout, skip if not included
                  if (!this._isIncludedInRollout(rule.seed || id, rule.hashAttribute, rule.range, rule.coverage, rule.hashVersion)) {
                    true && this.log("Skip rule because user not included in rollout", {
                      id,
                      rule
                    });
                    continue;
                  }
                  true && this.log("Force value from rule", {
                    id,
                    rule
                  });

                  // If this was a remotely evaluated experiment, fire the tracking callbacks
                  if (rule.tracks) {
                    rule.tracks.forEach(t => {
                      this._track(t.experiment, t.result);
                    });
                  }
                  return this._getFeatureResult(id, rule.force, "force", rule.id);
                }
                if (!rule.variations) {
                  true && this.log("Skip invalid rule", {
                    id,
                    rule
                  });
                  continue;
                }
                // For experiment rules, run an experiment
                const exp = {
                  variations: rule.variations,
                  key: rule.key || id
                };
                if ("coverage" in rule) exp.coverage = rule.coverage;
                if (rule.weights) exp.weights = rule.weights;
                if (rule.hashAttribute) exp.hashAttribute = rule.hashAttribute;
                if (rule.namespace) exp.namespace = rule.namespace;
                if (rule.meta) exp.meta = rule.meta;
                if (rule.ranges) exp.ranges = rule.ranges;
                if (rule.name) exp.name = rule.name;
                if (rule.phase) exp.phase = rule.phase;
                if (rule.seed) exp.seed = rule.seed;
                if (rule.hashVersion) exp.hashVersion = rule.hashVersion;
                if (rule.filters) exp.filters = rule.filters;

                // Only return a value if the user is part of the experiment
                const res = this._run(exp, id);
                this._fireSubscriptions(exp, res);
                if (res.inExperiment && !res.passthrough) {
                  return this._getFeatureResult(id, res.value, "experiment", rule.id, exp, res);
                }
              }
            }
            true && this.log("Use default value", {
              id,
              value: feature.defaultValue
            });

            // Fall back to using the default value
            return this._getFeatureResult(id, feature.defaultValue === undefined ? null : feature.defaultValue, "defaultValue");
          }
          _isIncludedInRollout(seed, hashAttribute, range, coverage, hashVersion) {
            if (!range && coverage === undefined) return true;
            const {
              hashValue
            } = this._getHashAttribute(hashAttribute);
            if (!hashValue) {
              return false;
            }
            const n = (0, _util__WEBPACK_IMPORTED_MODULE_2__.hash)(seed, hashValue, hashVersion || 1);
            if (n === null) return false;
            return range ? (0, _util__WEBPACK_IMPORTED_MODULE_2__.inRange)(n, range) : coverage !== undefined ? n <= coverage : true;
          }
          _conditionPasses(condition) {
            return (0, _mongrule__WEBPACK_IMPORTED_MODULE_3__.evalCondition)(this.getAttributes(), condition);
          }
          _isFilteredOut(filters) {
            return filters.some(filter => {
              const {
                hashValue
              } = this._getHashAttribute(filter.attribute);
              if (!hashValue) return true;
              const n = (0, _util__WEBPACK_IMPORTED_MODULE_2__.hash)(filter.seed, hashValue, filter.hashVersion || 2);
              if (n === null) return true;
              return !filter.ranges.some(r => (0, _util__WEBPACK_IMPORTED_MODULE_2__.inRange)(n, r));
            });
          }
          _run(experiment, featureId) {
            const key = experiment.key;
            const numVariations = experiment.variations.length;

            // 1. If experiment has less than 2 variations, return immediately
            if (numVariations < 2) {
              true && this.log("Invalid experiment", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 2. If the context is disabled, return immediately
            if (this._ctx.enabled === false) {
              true && this.log("Context disabled", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 2.5. Merge in experiment overrides from the context
            experiment = this._mergeOverrides(experiment);

            // 3. If a variation is forced from a querystring, return the forced variation
            const qsOverride = (0, _util__WEBPACK_IMPORTED_MODULE_2__.getQueryStringOverride)(key, this._getContextUrl(), numVariations);
            if (qsOverride !== null) {
              true && this.log("Force via querystring", {
                id: key,
                variation: qsOverride
              });
              return this._getResult(experiment, qsOverride, false, featureId);
            }

            // 4. If a variation is forced in the context, return the forced variation
            if (this._ctx.forcedVariations && key in this._ctx.forcedVariations) {
              const variation = this._ctx.forcedVariations[key];
              true && this.log("Force via dev tools", {
                id: key,
                variation
              });
              return this._getResult(experiment, variation, false, featureId);
            }

            // 5. Exclude if a draft experiment or not active
            if (experiment.status === "draft" || experiment.active === false) {
              true && this.log("Skip because inactive", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 6. Get the hash attribute and return if empty
            const {
              hashValue
            } = this._getHashAttribute(experiment.hashAttribute);
            if (!hashValue) {
              true && this.log("Skip because missing hashAttribute", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 7. Exclude if user is filtered out (used to be called "namespace")
            if (experiment.filters) {
              if (this._isFilteredOut(experiment.filters)) {
                true && this.log("Skip because of filters", {
                  id: key
                });
                return this._getResult(experiment, -1, false, featureId);
              }
            } else if (experiment.namespace && !(0, _util__WEBPACK_IMPORTED_MODULE_2__.inNamespace)(hashValue, experiment.namespace)) {
              true && this.log("Skip because of namespace", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 7.5. Exclude if experiment.include returns false or throws
            if (experiment.include && !(0, _util__WEBPACK_IMPORTED_MODULE_2__.isIncluded)(experiment.include)) {
              true && this.log("Skip because of include function", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 8. Exclude if condition is false
            if (experiment.condition && !this._conditionPasses(experiment.condition)) {
              true && this.log("Skip because of condition", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 8.1. Exclude if user is not in a required group
            if (experiment.groups && !this._hasGroupOverlap(experiment.groups)) {
              true && this.log("Skip because of groups", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 8.2. Old style URL targeting
            if (experiment.url && !this._urlIsValid(experiment.url)) {
              true && this.log("Skip because of url", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 8.3. New, more powerful URL targeting
            if (experiment.urlPatterns && !(0, _util__WEBPACK_IMPORTED_MODULE_2__.isURLTargeted)(this._getContextUrl(), experiment.urlPatterns)) {
              true && this.log("Skip because of url targeting", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 9. Get bucket ranges and choose variation
            const n = (0, _util__WEBPACK_IMPORTED_MODULE_2__.hash)(experiment.seed || key, hashValue, experiment.hashVersion || 1);
            if (n === null) {
              true && this.log("Skip because of invalid hash version", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }
            const ranges = experiment.ranges || (0, _util__WEBPACK_IMPORTED_MODULE_2__.getBucketRanges)(numVariations, experiment.coverage === undefined ? 1 : experiment.coverage, experiment.weights);
            const assigned = (0, _util__WEBPACK_IMPORTED_MODULE_2__.chooseVariation)(n, ranges);

            // 10. Return if not in experiment
            if (assigned < 0) {
              true && this.log("Skip because of coverage", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 11. Experiment has a forced variation
            if ("force" in experiment) {
              true && this.log("Force variation", {
                id: key,
                variation: experiment.force
              });
              return this._getResult(experiment, experiment.force === undefined ? -1 : experiment.force, false, featureId);
            }

            // 12. Exclude if in QA mode
            if (this._ctx.qaMode) {
              true && this.log("Skip because QA mode", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 12.5. Exclude if experiment is stopped
            if (experiment.status === "stopped") {
              true && this.log("Skip because stopped", {
                id: key
              });
              return this._getResult(experiment, -1, false, featureId);
            }

            // 13. Build the result object
            const result = this._getResult(experiment, assigned, true, featureId, n);

            // 14. Fire the tracking callback
            this._track(experiment, result);

            // 15. Return the result
            true && this.log("In experiment", {
              id: key,
              variation: result.variationId
            });
            return result;
          }
          log(msg, ctx) {
            if (!this.debug) return;
            if (this._ctx.log) this._ctx.log(msg, ctx);
            else console.log(msg, ctx);
          }
          _track(experiment, result) {
            if (!this._ctx.trackingCallback) return;
            const key = experiment.key;

            // Make sure a tracking callback is only fired once per unique experiment
            const k = result.hashAttribute + result.hashValue + key + result.variationId;
            if (this._trackedExperiments.has(k)) return;
            this._trackedExperiments.add(k);
            try {
              this._ctx.trackingCallback(experiment, result);
            } catch (e) {
              console.error(e);
            }
          }
          _mergeOverrides(experiment) {
            const key = experiment.key;
            const o = this._ctx.overrides;
            if (o && o[key]) {
              experiment = Object.assign({}, experiment, o[key]);
              if (typeof experiment.url === "string") {
                experiment.url = (0, _util__WEBPACK_IMPORTED_MODULE_2__.getUrlRegExp)(
                  // eslint-disable-next-line
                  experiment.url);
              }
            }
            return experiment;
          }
          _getHashAttribute(attr) {
            const hashAttribute = attr || "id";
            let hashValue = "";
            if (this._attributeOverrides[hashAttribute]) {
              hashValue = this._attributeOverrides[hashAttribute];
            } else if (this._ctx.attributes) {
              hashValue = this._ctx.attributes[hashAttribute] || "";
            } else if (this._ctx.user) {
              hashValue = this._ctx.user[hashAttribute] || "";
            }
            return {
              hashAttribute,
              hashValue
            };
          }
          _getResult(experiment, variationIndex, hashUsed, featureId, bucket) {
            let inExperiment = true;
            // If assigned variation is not valid, use the baseline and mark the user as not in the experiment
            if (variationIndex < 0 || variationIndex >= experiment.variations.length) {
              variationIndex = 0;
              inExperiment = false;
            }
            const {
              hashAttribute,
              hashValue
            } = this._getHashAttribute(experiment.hashAttribute);
            const meta = experiment.meta ? experiment.meta[variationIndex] : {};
            const res = {
              key: meta.key || "" + variationIndex,
              featureId,
              inExperiment,
              hashUsed,
              variationId: variationIndex,
              value: experiment.variations[variationIndex],
              hashAttribute,
              hashValue
            };
            if (meta.name) res.name = meta.name;
            if (bucket !== undefined) res.bucket = bucket;
            if (meta.passthrough) res.passthrough = meta.passthrough;
            return res;
          }
          _getContextUrl() {
            return this._ctx.url || (isBrowser ? window.location.href : "");
          }
          _urlIsValid(urlRegex) {
            const url = this._getContextUrl();
            if (!url) return false;
            const pathOnly = url.replace(/^https?:\/\//, "").replace(/^[^/]*\//, "/");
            if (urlRegex.test(url)) return true;
            if (urlRegex.test(pathOnly)) return true;
            return false;
          }
          _hasGroupOverlap(expGroups) {
            const groups = this._ctx.groups || {};
            for (let i = 0; i < expGroups.length; i++) {
              if (groups[expGroups[i]]) return true;
            }
            return false;
          }
          _applyDOMChanges(changes) {
            if (!isBrowser) return;
            const undo = [];
            if (changes.css) {
              const s = document.createElement("style");
              s.innerHTML = changes.css;
              document.head.appendChild(s);
              undo.push(() => s.remove());
            }
            if (changes.js) {
              const script = document.createElement("script");
              script.innerHTML = changes.js;
              document.body.appendChild(script);
              undo.push(() => script.remove());
            }
            if (changes.domMutations) {
              changes.domMutations.forEach(mutation => {
                undo.push(dom_mutator__WEBPACK_IMPORTED_MODULE_0__["default"].declarative(mutation).revert);
              });
            }
            return () => {
              undo.forEach(fn => fn());
            };
          }
        }
        //# sourceMappingURL=GrowthBook.js.map

        /***/
      }),

    /***/
    "../../node_modules/@growthbook/growthbook/dist/esm/feature-repository.js":
      /*!********************************************************************************!*\
        !*** ../../node_modules/@growthbook/growthbook/dist/esm/feature-repository.js ***!
        \********************************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          clearCache: () => ( /* binding */ clearCache),
          /* harmony export */
          configureCache: () => ( /* binding */ configureCache),
          /* harmony export */
          refreshFeatures: () => ( /* binding */ refreshFeatures),
          /* harmony export */
          setPolyfills: () => ( /* binding */ setPolyfills),
          /* harmony export */
          subscribe: () => ( /* binding */ subscribe),
          /* harmony export */
          unsubscribe: () => ( /* binding */ unsubscribe)
          /* harmony export */
        });
        // Config settings
        const cacheSettings = {
          // Consider a fetch stale after 1 minute
          staleTTL: 1000 * 60,
          cacheKey: "gbFeaturesCache",
          backgroundSync: true
        };
        const polyfills = {
          fetch: globalThis.fetch ? globalThis.fetch.bind(globalThis) : undefined,
          SubtleCrypto: globalThis.crypto ? globalThis.crypto.subtle : undefined,
          EventSource: globalThis.EventSource
        };
        try {
          if (globalThis.localStorage) {
            polyfills.localStorage = globalThis.localStorage;
          }
        } catch (e) {
          // Ignore localStorage errors
        }

        // Global state
        const subscribedInstances = new Map();
        let cacheInitialized = false;
        const cache = new Map();
        const activeFetches = new Map();
        const streams = new Map();
        const supportsSSE = new Set();

        // Public functions
        function setPolyfills(overrides) {
          Object.assign(polyfills, overrides);
        }

        function configureCache(overrides) {
          Object.assign(cacheSettings, overrides);
          if (!cacheSettings.backgroundSync) {
            clearAutoRefresh();
          }
        }
        async function clearCache() {
          cache.clear();
          activeFetches.clear();
          clearAutoRefresh();
          cacheInitialized = false;
          await updatePersistentCache();
        }
        async function refreshFeatures(instance, timeout, skipCache, allowStale, updateInstance) {
          const data = await fetchFeaturesWithCache(instance, allowStale, timeout, skipCache);
          updateInstance && data && (await refreshInstance(instance, data));
        }

        // Subscribe a GrowthBook instance to feature changes
        function subscribe(instance) {
          const [key] = getKey(instance);
          const subs = subscribedInstances.get(key) || new Set();
          subs.add(instance);
          subscribedInstances.set(key, subs);
        }

        function unsubscribe(instance) {
          subscribedInstances.forEach(s => s.delete(instance));
        }

        // Private functions
        async function updatePersistentCache() {
          try {
            if (!polyfills.localStorage) return;
            await polyfills.localStorage.setItem(cacheSettings.cacheKey, JSON.stringify(Array.from(cache.entries())));
          } catch (e) {
            // Ignore localStorage errors
          }
        }
        async function fetchFeaturesWithCache(instance, allowStale, timeout, skipCache) {
          const [key] = getKey(instance);
          const now = new Date();
          await initializeCache();
          const existing = cache.get(key);
          if (existing && !skipCache && (allowStale || existing.staleAt > now)) {
            // Reload features in the backgroud if stale
            if (existing.staleAt < now) {
              fetchFeatures(instance);
            }
            // Otherwise, if we don't need to refresh now, start a background sync
            else {
              startAutoRefresh(instance);
            }
            return existing.data;
          } else {
            const data = await promiseTimeout(fetchFeatures(instance), timeout);
            return data;
          }
        }

        function getKey(instance) {
          const [apiHost, clientKey] = instance.getApiInfo();
          return ["".concat(apiHost, "||").concat(clientKey), apiHost, clientKey];
        }

        // Guarantee the promise always resolves within {timeout} ms
        // Resolved value will be `null` when there's an error or it takes too long
        // Note: The promise will continue running in the background, even if the timeout is hit
        function promiseTimeout(promise, timeout) {
          return new Promise(resolve => {
            let resolved = false;
            let timer;
            const finish = data => {
              if (resolved) return;
              resolved = true;
              timer && clearTimeout(timer);
              resolve(data || null);
            };
            if (timeout) {
              timer = setTimeout(() => finish(), timeout);
            }
            promise.then(data => finish(data)).catch(() => finish());
          });
        }

        // Populate cache from localStorage (if available)
        async function initializeCache() {
          if (cacheInitialized) return;
          cacheInitialized = true;
          try {
            if (polyfills.localStorage) {
              const value = await polyfills.localStorage.getItem(cacheSettings.cacheKey);
              if (value) {
                const parsed = JSON.parse(value);
                if (parsed && Array.isArray(parsed)) {
                  parsed.forEach(_ref => {
                    let [key, data] = _ref;
                    cache.set(key, {
                      ...data,
                      staleAt: new Date(data.staleAt)
                    });
                  });
                }
              }
            }
          } catch (e) {
            // Ignore localStorage errors
          }
        }

        // Called whenever new features are fetched from the API
        function onNewFeatureData(key, data) {
          // If contents haven't changed, ignore the update, extend the stale TTL
          const version = data.dateUpdated || "";
          const staleAt = new Date(Date.now() + cacheSettings.staleTTL);
          const existing = cache.get(key);
          if (existing && version && existing.version === version) {
            existing.staleAt = staleAt;
            updatePersistentCache();
            return;
          }

          // Update in-memory cache
          cache.set(key, {
            data,
            version,
            staleAt
          });
          // Update local storage (don't await this, just update asynchronously)
          updatePersistentCache();

          // Update features for all subscribed GrowthBook instances
          const instances = subscribedInstances.get(key);
          instances && instances.forEach(instance => refreshInstance(instance, data));
        }
        async function refreshInstance(instance, data) {
          await (data.encryptedExperiments ? instance.setEncryptedExperiments(data.encryptedExperiments, undefined, polyfills.SubtleCrypto) : instance.setExperiments(data.experiments || instance.getExperiments()));
          await (data.encryptedFeatures ? instance.setEncryptedFeatures(data.encryptedFeatures, undefined, polyfills.SubtleCrypto) : instance.setFeatures(data.features || instance.getFeatures()));
        }
        async function fetchFeatures(instance) {
          const [key, apiHost, clientKey] = getKey(instance);
          const endpoint = apiHost + "/api/features/" + clientKey;
          let promise = activeFetches.get(key);
          if (!promise) {
            promise = polyfills.fetch(endpoint)
              // TODO: auto-retry if status code indicates a temporary error
              .then(res => {
                if (res.headers.get("x-sse-support") === "enabled") {
                  supportsSSE.add(key);
                }
                return res.json();
              }).then(data => {
                onNewFeatureData(key, data);
                startAutoRefresh(instance);
                activeFetches.delete(key);
                return data;
              }).catch(e => {
                true && instance.log("Error fetching features", {
                  apiHost,
                  clientKey,
                  error: e ? e.message : null
                });
                activeFetches.delete(key);
                return Promise.resolve({});
              });
            activeFetches.set(key, promise);
          }
          return await promise;
        }

        // Watch a feature endpoint for changes
        // Will prefer SSE if enabled, otherwise fall back to cron
        function startAutoRefresh(instance) {
          const [key, apiHost, clientKey] = getKey(instance);
          if (cacheSettings.backgroundSync && supportsSSE.has(key) && polyfills.EventSource) {
            if (streams.has(key)) return;
            const channel = {
              src: null,
              cb: event => {
                try {
                  const json = JSON.parse(event.data);
                  onNewFeatureData(key, json);
                  // Reset error count on success
                  channel.errors = 0;
                } catch (e) {
                  true && instance.log("SSE Error", {
                    apiHost,
                    clientKey,
                    error: e ? e.message : null
                  });
                  onSSEError(channel, apiHost, clientKey);
                }
              },
              errors: 0
            };
            streams.set(key, channel);
            enableChannel(channel, apiHost, clientKey);
          }
        }

        function onSSEError(channel, apiHost, clientKey) {
          channel.errors++;
          if (channel.errors > 3 || channel.src && channel.src.readyState === 2) {
            // exponential backoff after 4 errors, with jitter
            const delay = Math.pow(3, channel.errors - 3) * (1000 + Math.random() * 1000);
            disableChannel(channel);
            setTimeout(() => {
              enableChannel(channel, apiHost, clientKey);
            }, Math.min(delay, 300000)); // 5 minutes max
          }
        }

        function disableChannel(channel) {
          if (!channel.src) return;
          channel.src.onopen = null;
          channel.src.onerror = null;
          channel.src.close();
          channel.src = null;
        }

        function enableChannel(channel, apiHost, clientKey) {
          channel.src = new polyfills.EventSource("".concat(apiHost, "/sub/").concat(clientKey));
          channel.src.addEventListener("features", channel.cb);
          channel.src.onerror = () => {
            onSSEError(channel, apiHost, clientKey);
          };
          channel.src.onopen = () => {
            channel.errors = 0;
          };
        }

        function destroyChannel(channel, key) {
          disableChannel(channel);
          streams.delete(key);
        }

        function clearAutoRefresh() {
          // Clear list of which keys are auto-updated
          supportsSSE.clear();

          // Stop listening for any SSE events
          streams.forEach(destroyChannel);

          // Remove all references to GrowthBook instances
          subscribedInstances.clear();
        }
        //# sourceMappingURL=feature-repository.js.map

        /***/
      }),

    /***/
    "../../node_modules/@growthbook/growthbook/dist/esm/mongrule.js":
      /*!**********************************************************************!*\
        !*** ../../node_modules/@growthbook/growthbook/dist/esm/mongrule.js ***!
        \**********************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          evalCondition: () => ( /* binding */ evalCondition)
          /* harmony export */
        });
        /* harmony import */
        var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./util */ "../../node_modules/@growthbook/growthbook/dist/esm/util.js");
        /* eslint-disable @typescript-eslint/no-explicit-any */


        const _regexCache = {};

        // The top-level condition evaluation function
        function evalCondition(obj, condition) {
          // Recursive condition
          if ("$or" in condition) {
            return evalOr(obj, condition["$or"]);
          }
          if ("$nor" in condition) {
            return !evalOr(obj, condition["$nor"]);
          }
          if ("$and" in condition) {
            return evalAnd(obj, condition["$and"]);
          }
          if ("$not" in condition) {
            return !evalCondition(obj, condition["$not"]);
          }

          // Condition is an object, keys are object paths, values are the condition for that path
          for (const [k, v] of Object.entries(condition)) {
            if (!evalConditionValue(v, getPath(obj, k))) return false;
          }
          return true;
        }

        // Return value at dot-separated path of an object
        function getPath(obj, path) {
          const parts = path.split(".");
          let current = obj;
          for (let i = 0; i < parts.length; i++) {
            if (current && typeof current === "object" && parts[i] in current) {
              current = current[parts[i]];
            } else {
              return null;
            }
          }
          return current;
        }

        // Transform a regex string into a real RegExp object
        function getRegex(regex) {
          if (!_regexCache[regex]) {
            _regexCache[regex] = new RegExp(regex.replace(/([^\\])\//g, "$1\\/"));
          }
          return _regexCache[regex];
        }

        // Evaluate a single value against a condition
        function evalConditionValue(condition, value) {
          // Simple equality comparisons
          if (typeof condition === "string") {
            return value + "" === condition;
          }
          if (typeof condition === "number") {
            return value * 1 === condition;
          }
          if (typeof condition === "boolean") {
            return !!value === condition;
          }
          if (condition === null) {
            return value === null;
          }
          if (Array.isArray(condition) || !isOperatorObject(condition)) {
            return JSON.stringify(value) === JSON.stringify(condition);
          }

          // This is a special operator condition and we should evaluate each one separately
          for (const op in condition) {
            if (!evalOperatorCondition(op, value, condition[op])) {
              return false;
            }
          }
          return true;
        }

        // If the object has only keys that start with '$'
        function isOperatorObject(obj) {
          const keys = Object.keys(obj);
          return keys.length > 0 && keys.filter(k => k[0] === "$").length === keys.length;
        }

        // Return the data type of a value
        function getType(v) {
          if (v === null) return "null";
          if (Array.isArray(v)) return "array";
          const t = typeof v;
          if (["string", "number", "boolean", "object", "undefined"].includes(t)) {
            return t;
          }
          return "unknown";
        }

        // At least one element of actual must match the expected condition/value
        function elemMatch(actual, expected) {
          if (!Array.isArray(actual)) return false;
          const check = isOperatorObject(expected) ? v => evalConditionValue(expected, v) : v => evalCondition(v, expected);
          for (let i = 0; i < actual.length; i++) {
            if (actual[i] && check(actual[i])) {
              return true;
            }
          }
          return false;
        }

        function isIn(actual, expected) {
          // Do an intersection is attribute is an array
          if (Array.isArray(actual)) {
            return actual.some(el => expected.includes(el));
          }
          return expected.includes(actual);
        }

        // Evaluate a single operator condition
        function evalOperatorCondition(operator, actual, expected) {
          switch (operator) {
            case "$veq":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) === (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$vne":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) !== (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$vgt":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) > (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$vgte":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) >= (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$vlt":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) < (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$vlte":
              return (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(actual) <= (0, _util__WEBPACK_IMPORTED_MODULE_0__.paddedVersionString)(expected);
            case "$eq":
              return actual === expected;
            case "$ne":
              return actual !== expected;
            case "$lt":
              return actual < expected;
            case "$lte":
              return actual <= expected;
            case "$gt":
              return actual > expected;
            case "$gte":
              return actual >= expected;
            case "$exists":
              return expected ? actual !== null : actual === null;
            case "$in":
              if (!Array.isArray(expected)) return false;
              return isIn(actual, expected);
            case "$nin":
              if (!Array.isArray(expected)) return false;
              return !isIn(actual, expected);
            case "$not":
              return !evalConditionValue(expected, actual);
            case "$size":
              if (!Array.isArray(actual)) return false;
              return evalConditionValue(expected, actual.length);
            case "$elemMatch":
              return elemMatch(actual, expected);
            case "$all":
              if (!Array.isArray(actual)) return false;
              for (let i = 0; i < expected.length; i++) {
                let passed = false;
                for (let j = 0; j < actual.length; j++) {
                  if (evalConditionValue(expected[i], actual[j])) {
                    passed = true;
                    break;
                  }
                }
                if (!passed) return false;
              }
              return true;
            case "$regex":
              try {
                return getRegex(expected).test(actual);
              } catch (e) {
                return false;
              }
            case "$type":
              return getType(actual) === expected;
            default:
              console.error("Unknown operator: " + operator);
              return false;
          }
        }

        // Recursive $or rule
        function evalOr(obj, conditions) {
          if (!conditions.length) return true;
          for (let i = 0; i < conditions.length; i++) {
            if (evalCondition(obj, conditions[i])) {
              return true;
            }
          }
          return false;
        }

        // Recursive $and rule
        function evalAnd(obj, conditions) {
          for (let i = 0; i < conditions.length; i++) {
            if (!evalCondition(obj, conditions[i])) {
              return false;
            }
          }
          return true;
        }
        //# sourceMappingURL=mongrule.js.map

        /***/
      }),

    /***/
    "../../node_modules/@growthbook/growthbook/dist/esm/util.js":
      /*!******************************************************************!*\
        !*** ../../node_modules/@growthbook/growthbook/dist/esm/util.js ***!
        \******************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          chooseVariation: () => ( /* binding */ chooseVariation),
          /* harmony export */
          decrypt: () => ( /* binding */ decrypt),
          /* harmony export */
          getBucketRanges: () => ( /* binding */ getBucketRanges),
          /* harmony export */
          getEqualWeights: () => ( /* binding */ getEqualWeights),
          /* harmony export */
          getQueryStringOverride: () => ( /* binding */ getQueryStringOverride),
          /* harmony export */
          getUrlRegExp: () => ( /* binding */ getUrlRegExp),
          /* harmony export */
          hash: () => ( /* binding */ hash),
          /* harmony export */
          inNamespace: () => ( /* binding */ inNamespace),
          /* harmony export */
          inRange: () => ( /* binding */ inRange),
          /* harmony export */
          isIncluded: () => ( /* binding */ isIncluded),
          /* harmony export */
          isURLTargeted: () => ( /* binding */ isURLTargeted),
          /* harmony export */
          paddedVersionString: () => ( /* binding */ paddedVersionString)
          /* harmony export */
        });

        function hashFnv32a(str) {
          let hval = 0x811c9dc5;
          const l = str.length;
          for (let i = 0; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
          }
          return hval >>> 0;
        }

        function hash(seed, value, version) {
          // New unbiased hashing algorithm
          if (version === 2) {
            return hashFnv32a(hashFnv32a(seed + value) + "") % 10000 / 10000;
          }
          // Original biased hashing algorithm (keep for backwards compatibility)
          if (version === 1) {
            return hashFnv32a(value + seed) % 1000 / 1000;
          }

          // Unknown hash version
          return null;
        }

        function getEqualWeights(n) {
          if (n <= 0) return [];
          return new Array(n).fill(1 / n);
        }

        function inRange(n, range) {
          return n >= range[0] && n < range[1];
        }

        function inNamespace(hashValue, namespace) {
          const n = hash("__" + namespace[0], hashValue, 1);
          if (n === null) return false;
          return n >= namespace[1] && n < namespace[2];
        }

        function chooseVariation(n, ranges) {
          for (let i = 0; i < ranges.length; i++) {
            if (inRange(n, ranges[i])) {
              return i;
            }
          }
          return -1;
        }

        function getUrlRegExp(regexString) {
          try {
            const escaped = regexString.replace(/([^\\])\//g, "$1\\/");
            return new RegExp(escaped);
          } catch (e) {
            console.error(e);
            return undefined;
          }
        }

        function isURLTargeted(url, targets) {
          if (!targets.length) return false;
          let hasIncludeRules = false;
          let isIncluded = false;
          for (let i = 0; i < targets.length; i++) {
            const match = _evalURLTarget(url, targets[i].type, targets[i].pattern);
            if (targets[i].include === false) {
              if (match) return false;
            } else {
              hasIncludeRules = true;
              if (match) isIncluded = true;
            }
          }
          return isIncluded || !hasIncludeRules;
        }

        function _evalSimpleUrlPart(actual, pattern, isPath) {
          try {
            // Escape special regex characters and change wildcard `_____` to `.*`
            let escaped = pattern.replace(/[*.+?^${}()|[\]\\]/g, "\\$&").replace(/_____/g, ".*");
            if (isPath) {
              // When matching pathname, make leading/trailing slashes optional
              escaped = "\\/?" + escaped.replace(/(^\/|\/$)/g, "") + "\\/?";
            }
            const regex = new RegExp("^" + escaped + "$", "i");
            return regex.test(actual);
          } catch (e) {
            return false;
          }
        }

        function _evalSimpleUrlTarget(actual, pattern) {
          try {
            // If a protocol is missing, but a host is specified, add `https://` to the front
            // Use "_____" as the wildcard since `*` is not a valid hostname in some browsers
            const expected = new URL(pattern.replace(/^([^:/?]*)\./i, "https://$1.").replace(/\*/g, "_____"), "https://_____");

            // Compare each part of the URL separately
            const comps = [
              [actual.host, expected.host, false],
              [actual.pathname, expected.pathname, true]
            ];
            // We only want to compare hashes if it's explicitly being targeted
            if (expected.hash) {
              comps.push([actual.hash, expected.hash, false]);
            }
            expected.searchParams.forEach((v, k) => {
              comps.push([actual.searchParams.get(k) || "", v, false]);
            });

            // If any comparisons fail, the whole thing fails
            return !comps.some(data => !_evalSimpleUrlPart(data[0], data[1], data[2]));
          } catch (e) {
            return false;
          }
        }

        function _evalURLTarget(url, type, pattern) {
          try {
            const parsed = new URL(url, "https://_");
            if (type === "regex") {
              const regex = getUrlRegExp(pattern);
              if (!regex) return false;
              return regex.test(parsed.href) || regex.test(parsed.href.substring(parsed.origin.length));
            } else if (type === "simple") {
              return _evalSimpleUrlTarget(parsed, pattern);
            }
            return false;
          } catch (e) {
            return false;
          }
        }

        function getBucketRanges(numVariations, coverage, weights) {
          coverage = coverage === undefined ? 1 : coverage;

          // Make sure coverage is within bounds
          if (coverage < 0) {
            if (true) {
              console.error("Experiment.coverage must be greater than or equal to 0");
            }
            coverage = 0;
          } else if (coverage > 1) {
            if (true) {
              console.error("Experiment.coverage must be less than or equal to 1");
            }
            coverage = 1;
          }

          // Default to equal weights if missing or invalid
          const equal = getEqualWeights(numVariations);
          weights = weights || equal;
          if (weights.length !== numVariations) {
            if (true) {
              console.error("Experiment.weights array must be the same length as Experiment.variations");
            }
            weights = equal;
          }

          // If weights don't add up to 1 (or close to it), default to equal weights
          const totalWeight = weights.reduce((w, sum) => sum + w, 0);
          if (totalWeight < 0.99 || totalWeight > 1.01) {
            if (true) {
              console.error("Experiment.weights must add up to 1");
            }
            weights = equal;
          }

          // Covert weights to ranges
          let cumulative = 0;
          return weights.map(w => {
            const start = cumulative;
            cumulative += w;
            return [start, start + coverage * w];
          });
        }

        function getQueryStringOverride(id, url, numVariations) {
          if (!url) {
            return null;
          }
          const search = url.split("?")[1];
          if (!search) {
            return null;
          }
          const match = search.replace(/#.*/, "") // Get rid of anchor
            .split("&") // Split into key/value pairs
            .map(kv => kv.split("=", 2)).filter(_ref => {
              let [k] = _ref;
              return k === id;
            }) // Look for key that matches the experiment id
            .map(_ref2 => {
              let [, v] = _ref2;
              return parseInt(v);
            }); // Parse the value into an integer

          if (match.length > 0 && match[0] >= 0 && match[0] < numVariations) return match[0];
          return null;
        }

        function isIncluded(include) {
          try {
            return include();
          } catch (e) {
            console.error(e);
            return false;
          }
        }
        const base64ToBuf = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));
        async function decrypt(encryptedString, decryptionKey, subtle) {
          decryptionKey = decryptionKey || "";
          subtle = subtle || globalThis.crypto && globalThis.crypto.subtle;
          if (!subtle) {
            throw new Error("No SubtleCrypto implementation found");
          }
          try {
            const key = await subtle.importKey("raw", base64ToBuf(decryptionKey), {
              name: "AES-CBC",
              length: 128
            }, true, ["encrypt", "decrypt"]);
            const [iv, cipherText] = encryptedString.split(".");
            const plainTextBuffer = await subtle.decrypt({
              name: "AES-CBC",
              iv: base64ToBuf(iv)
            }, key, base64ToBuf(cipherText));
            return new TextDecoder().decode(plainTextBuffer);
          } catch (e) {
            throw new Error("Failed to decrypt");
          }
        }

        function paddedVersionString(input) {
          // Remove build info and leading `v` if any
          // Split version into parts (both core version numbers and pre-release tags)
          // "v1.2.3-rc.1+build123" -> ["1","2","3","rc","1"]
          const parts = input.replace(/(^v|\+.*$)/g, "").split(/[-.]/);

          // If it's SemVer without a pre-release, add `~` to the end
          // ["1","0","0"] -> ["1","0","0","~"]
          // "~" is the largest ASCII character, so this will make "1.0.0" greater than "1.0.0-beta" for example
          if (parts.length === 3) {
            parts.push("~");
          }

          // Left pad each numeric part with spaces so string comparisons will work ("9">"10", but " 9"<"10")
          // Then, join back together into a single string
          return parts.map(v => v.match(/^[0-9]+$/) ? v.padStart(5, " ") : v).join("-");
        }
        //# sourceMappingURL=util.js.map

        /***/
      }),

    /***/
    "./src/common/AnalyticsAction.js":
      /*!***************************************!*\
        !*** ./src/common/AnalyticsAction.js ***!
        \***************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          AnalyticsAction: () => ( /* binding */ AnalyticsAction)
          /* harmony export */
        });
        var AnalyticsAction = {
          PAGE_VIEW: "Page View",
          /**
           * старт новой сессии игроком. можно попробовать заиспользовать амплиутдные коробочные + модификация их
           *
           * data:
           * {
           *      Sounds: "On" | "Off",
           *      Orientation: "Portrait" | "Landscape",
           *      Screen_Resolution: "NNNxMMM",
           * 	    Rendering Context: "Canvas" | "WebGL1.0" | "WebGL2.0",
           *      Browser: user-agent
           * }
           */
          SESSION_STARTED: "Session Started",
          /**
           * игрок вышел из игры
           *
           * data:
           * {
           *      Balance: XXXX - актуальный баланс игрока на момент выхода
           *      Spin Count: 0...N - общее количество вращений за игру
           *      Time: 0..N - длина сессии (время проведенное в игре) в минутах
           * }
           */
          SESSION_END: "Session End",
          /**
           * игрок не играет в игру продолжительное время, показывается оверлей stand by mode
           */
          STAND_BY_MODE_ACTIVATED: "Stand By Mode Activated",
          /**
           * игрок вышел из режима Stand By
           *
           * data:
           * {
           *      Time: 0..N - актуальный баланс игрока на момент выхода
           * }
           */
          STAND_BY_MODE_FINISHED: "Stand By Mode Finished",
          /**
           * игрок делает вращение
           *
           * data:
           * {
           *      Type: "Manual Click" | "Manual Keyboard" | "Auto Mode",
           *      Mode: "Hold" | "Single",
           *      Quick_Mode: "On" | "Off",
           *      Muliplying_Chance: "Respin+Free" | "Coin Respin" | "Free Spins" | "No",
           *      $revenue: number - bonus price in EUR (rate * priceOriginal)
           *      $revenueType: "Bonus round" | "Regular spin" | PURCHASED_FEATURE_NAME,
           *      priceOriginal: number - стоимость бонуса в валюте игрока
           *      rate: number - курс конвертации
           *      $profit: $revenue - win
           * }
           */
          SPIN_STARTED: "Spin Started",
          /**
           * открытие экрана с настройками авто-режима
           */
          AUTOSPIN_MODE_SCREEN_SHOWN: "Autospin Mode Screen Shown",
          /**
           * закрытие экрана с настройками авто-режима (отправлять только при ручном закрытии экрана)
           */
          AUTOSPIN_MODE_SCREEN_CLOSED: "Autospin Mode Screen Closed",
          /**
           * игрок запустил режим авто
           *
           * data:
           * {
           *      Count: 10...1000 | "Infinity",
           *      Advanced_Mode: "Yes" | "No"
           * }
           */
          AUTOSPIN_MODE_STARTED: "Autospin Mode Started",
          /**
           * завершился режим авто
           *
           * data:
           * {
           *      Count: 1…N,
           *      Reason: "Finished" | "Rule" | "Manual"
           * }
           */
          AUTOSPIN_MODE_FINISHED: "Autospin Mode Finished",
          /**
           * открытие настроек ставки
           * data:
           * {
           *      Source: "Panel" | "Button",
           * }
           */
          BET_CHANGE_SETTINGS_SHOWN: "Bet Change Settings Shown",
          /**
           * отправлять только при ручном закрытии экрана, или если пользователь выбрал ту же самую ставку
           */
          BET_CHANGE_SETTINGS_CLOSED: "Bet Change Settings Closed",
          /**
           * изменение ставки (отправлять только при изменении ставки)
           *
           * data:
           * {
           *      Source: "UI" | "Buy Bonus Screen"
           *      Type: "Plus Button" | "Minus Button" | "Bet Menu" | "Max Button"
           * }
           */
          BET_CHANGED: "Bet Changed",
          /**
           * показ экрана с выбором покупки бонуса
           *
           * data:
           * {
           *      Source: "Game" | "UI",
           * }
           */
          BUY_BONUS_SCREEN_SHOWN: "Buy Bonus Screen Shown",
          /**
           * закрытие экрана с выбором покупки бонуса (отправлять только если пользователь закрывает сам)
           */
          BUY_BONUS_SCREEN_CLOSED: "Buy Bonus Screen Closed",
          /**
           * игрок купил бонусную игру
           *
           * data:
           * {
           *      Type: "Free Spins" | "Coin Respin"
           *      $revenue: number - bonus price in EUR (rate * priceOriginal)
           *      $revenueType: "Bonus round" | "Regular spin" | PURCHASED_FEATURE_NAME,
           *      priceOriginal: number - стоимость бонуса в валюте игрока
           *      rate: number - курс конвертации
           * }
           */
          BUY_BONUS_PURCHASED: "Buy Bonus Purchased",
          /**
           * бонусная игра завершена
           *
           * data:
           * {
           *      Type: "Free Spins" | "Coin Respin"
           *      $revenue: number - bonus price in EUR (rate * priceOriginal)
           *      $revenueType: "Bonus round" | "Regular spin" | PURCHASED_FEATURE_NAME,
           *      priceOriginal: number - стоимость бонуса в валюте игрока
           *      rate: number - курс конвертации
           *      $profit: $revenue - totalWin
           * }
           */
          BUY_BONUS_FINISHED: "Buy Bonus Finished",
          /**
           * открытие меню
           */
          MENU_SHOWN: "Menu Shown",
          /**
           * закрытие меню
           */
          MENU_CLOSED: "Menu Closed",
          /**
           *  открытие экрана настроек
           */
          SETTINGS_SHOWN: "Settings Shown",
          /**
           * закрытие экрана настроек
           */
          SETTINGS_CLOSED: "Settings Closed",
          /**
           * открытие экрана с информацией про игру
           */
          PAYTABLE_SCREEN_SHOWN: "Paytable Screen Shown",
          /**
           * закрытие экрана с информацией про игру
           */
          PAYTABLE_SCREEN_CLOSED: "Paytable Screen Closed",
          /**
           * открытие экрана с общей информацией
           */
          HELP_SCREEN_SHOWN: "Help Screen Shown",
          /**
           * закрытие экрана с общей информацией
           */
          HELP_SCREEN_CLOSED: "Help Screen Closed",
          /**
           * десктоп - октлючение звука по иконке
           */
          ALL_SOUNDS_OFF: "All Sounds Off",
          /**
           * десктоп - включение звука по иконке
           */
          ALL_SOUNDS_ON: "All Sounds On",
          /**
           * включение музыки в настройках
           */
          MUSIC_ON: "Music On",
          /**
           * выключение музыки в настройках
           */
          MUSIC_OFF: "Music Off",
          /**
           * включение Sound FX в настройках
           */
          SOUND_FX_ON: "Sound FX On",
          /**
           * выключение Sound FX в настройках
           */
          SOUND_FX_OFF: "Sound FX Off",
          /**
           * изменение громкости - отправлять только по фактическому изменению
           *
           * data:
           * {
           *      Level: 0…100
           * }
           */
          VOLUME_CHANGED: "Volume Changed",
          /**
           * включение режима быстрых вращений
           *
           * data:
           * {
           *      Source: "Settings" | "UI" | "Offer popup",
           * }
           */
          QUICK_SPIN_MODE_ENABLED: "Quick Spin Mode Enabled",
          /**
           * выключение режима быстрых вращений
           *
           * data:
           * {
           *      Source: "Settings" | "UI",
           * }
           */
          QUICK_SPIN_MODE_DISABLED: "Quick Spin Mode Disabled",
          /**
           * открытие попапа с предложением включить быстрые вращения
           */
          QUICK_SPIN_OFFER_POPUP_SHOWN: "Quick Spin Offer Pop-up Shown",
          /**
           * закрытие попапа с предложением включить быстрые вращения
           */
          QUICK_SPIN_OFFER_POPUP_CLOSED: "Quick Spin Offer Pop-up Closed",
          /**
           * включение режима для левшей // именно оперирование настройкой
           * (не используется в UI2.0)
           */
          LEFT_HAND_MODE_ENABLED: "Left Hand Mode Enabled",
          /**
           * выключение режима для левшей // именно оперирование настройкой
           * (не используется в UI2.0)
           */
          LEFT_HAND_MODE_DISABLED: "Left Hand Mode Disabled",
          /**
           * включение спин/стоп через пробел
           */
          SPACEBAR_TO_SPIN_ENABLED: "Spacebar To Spin Enabled",
          /**
           * выключение спин/стоп через пробел
           */
          SPACEBAR_TO_SPIN_DISABLED: "Spacebar To Spin Disabled",
          /**
           * смена положения телефона
           */
          ORIENTATION_CHANGED: "Orientation Changed",
          /**
           * Пользователь вовлечен в эксперимент GrowthBook
           *
           * data:
           * {
           *       TrackID: string
           *       FeatureID: string,
           *       SegmentationKey: string
           * }
           */
          TRACK_GROWTHBOOK_EXPERIMENT: "Experiment Assigned",
          /**
           * Пользователь нажал на кнопку лобби "домик" в настройках игры
           * Появление кнопки зависит от casinoOptions.ui.home_button
           */
          LOBBY: "Casino Lobby Button Clicked",
          /**
           * смена скина
           */
          SKIN_CHANGED: "Skin Changed",
          /**
           * смена количества линий
           */
          LINES_COUNT_SWITCHED: "Lines Mode Switched",
          /**
           * смена волатильности
           */
          VOLATILITY_SWITCHED: "Volatility Switched",
          /**
           * Пользователь получил ошибку
           */
          ERROR: "Error Modal Shown"
        };

        /***/
      }),

    /***/
    "./src/common/const.js":
      /*!*****************************!*\
        !*** ./src/common/const.js ***!
        \*****************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          ANALYTICS_GAMES_LIST_API_URL: () => ( /* binding */ ANALYTICS_GAMES_LIST_API_URL),
          /* harmony export */
          ANALYTICS_INCOMING: () => ( /* binding */ ANALYTICS_INCOMING),
          /* harmony export */
          ANALYTICS_OUTGOING: () => ( /* binding */ ANALYTICS_OUTGOING),
          /* harmony export */
          CUSTOM_EVENT: () => ( /* binding */ CUSTOM_EVENT),
          /* harmony export */
          EXTERNAL_INCOMING_ANALYTICS: () => ( /* binding */ EXTERNAL_INCOMING_ANALYTICS),
          /* harmony export */
          GROWTHBOOK_API_HOST: () => ( /* binding */ GROWTHBOOK_API_HOST),
          /* harmony export */
          GROWTHBOOK_IINCOMING: () => ( /* binding */ GROWTHBOOK_IINCOMING),
          /* harmony export */
          GROWTHBOOK_OUTGOING: () => ( /* binding */ GROWTHBOOK_OUTGOING),
          /* harmony export */
          GROWTHBOOK_SDK_KEY: () => ( /* binding */ GROWTHBOOK_SDK_KEY),
          /* harmony export */
          RUDDERSTACK_API_URL: () => ( /* binding */ RUDDERSTACK_API_URL),
          /* harmony export */
          RUDDERSTACK_TRACK_ID: () => ( /* binding */ RUDDERSTACK_TRACK_ID),
          /* harmony export */
          buyFeatures: () => ( /* binding */ buyFeatures),
          /* harmony export */
          features: () => ( /* binding */ features),
          /* harmony export */
          featuresCommands: () => ( /* binding */ featuresCommands),
          /* harmony export */
          gameFinishStates: () => ( /* binding */ gameFinishStates),
          /* harmony export */
          incomingMessageType: () => ( /* binding */ incomingMessageType),
          /* harmony export */
          outgoingMessageType: () => ( /* binding */ outgoingMessageType)
          /* harmony export */
        });
        // incoming messages types
        var GROWTHBOOK_IINCOMING = "experiment/incoming";
        var incomingMessageType = {
          addFeature: "addFeature",
          updateUser: "updateUser",
          track: "track",
          start: "start"
        };

        // outgoing messages types
        var GROWTHBOOK_OUTGOING = "experiment/outgoing";
        var outgoingMessageType = {
          ready: "ready",
          initialized: "initialized",
          // tracker initialized
          sessionStarted: "sessionStarted" // session started
        };
        var GROWTHBOOK_API_HOST = "https://cdn.growthbook.io";
        var GROWTHBOOK_SDK_KEY = "sdk-XpWyDcKidxByyjV1";
        var RUDDERSTACK_TRACK_ID = "2sLPBXM6sAy3adaCsG0AzlDnmsy" || 0;
        var RUDDERSTACK_API_URL = "https://rudderstack.shared.bgaming-system.com" || 0;
        var ANALYTICS_GAMES_LIST_API_URL = true ? "https://boost.bgaming-network.com/" + "api/amplitudeGamesList?env=" + "development" : 0;

        /**
         * @description: Message types for external analytics.
         * Sent regardless of whether analytics is enabled in the game.
         */
        var EXTERNAL_INCOMING_ANALYTICS = "external/analytics/incoming";
        var ANALYTICS_INCOMING = "analytics/incoming";
        var ANALYTICS_OUTGOING = "analytics/outgoing";
        var CUSTOM_EVENT = "custom_event";
        var buyFeatures = {
          bonusBuy: "bonus_buy",
          freespinBuy: "freespin_buy"
        };
        var features = {
          freespins: "freespins",
          respin: "respin"
        };
        var featuresCommands = {
          freespin: "freespin",
          respin: "respin"
        };
        var gameFinishStates = {
          closed: "closed",
          gamble: "gamble"
        };

        /***/
      }),

    /***/
    "./src/common/utils.js":
      /*!*****************************!*\
        !*** ./src/common/utils.js ***!
        \*****************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          createEvent: () => ( /* binding */ createEvent)
          /* harmony export */
        });

        function createEvent(name, message) {
          return new CustomEvent(name, {
            detail: message
          });
        }

        /***/
      }),

    /***/
    "./src/experiment-manager/BEGrowthbookExperimentManager.js":
      /*!*****************************************************************!*\
        !*** ./src/experiment-manager/BEGrowthbookExperimentManager.js ***!
        \*****************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          BEGrowthbookExperimentManager: () => ( /* binding */ BEGrowthbookExperimentManager)
          /* harmony export */
        });
        /* harmony import */
        var _ExperimentManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./ExperimentManager */ "./src/experiment-manager/ExperimentManager.js");

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function _defineProperty(e, r, t) {
          return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[r] = t, e;
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }

        function _callSuper(t, o, e) {
          return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
        }

        function _possibleConstructorReturn(t, e) {
          if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
          if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
          return _assertThisInitialized(t);
        }

        function _assertThisInitialized(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        }

        function _isNativeReflectConstruct() {
          try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
          } catch (t) {}
          return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
          })();
        }

        function _getPrototypeOf(t) {
          return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }, _getPrototypeOf(t);
        }

        function _inherits(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), Object.defineProperty(t, "prototype", {
            writable: !1
          }), e && _setPrototypeOf(t, e);
        }

        function _setPrototypeOf(t, e) {
          return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
          }, _setPrototypeOf(t, e);
        }

        var BEGrowthbookExperimentManager = /*#__PURE__*/ function(_ExperimentManager) {
          function BEGrowthbookExperimentManager() {
            _classCallCheck(this, BEGrowthbookExperimentManager);
            return _callSuper(this, BEGrowthbookExperimentManager, arguments);
          }
          _inherits(BEGrowthbookExperimentManager, _ExperimentManager);
          return _createClass(BEGrowthbookExperimentManager, [{
            key: "makeCreator",
            value: function makeCreator() {
              var _window$__OPTIONS__;
              return new GameOptionsExperimentProcessor((_window$__OPTIONS__ = window.__OPTIONS__) === null || _window$__OPTIONS__ === void 0 ? void 0 : _window$__OPTIONS__.growthbook_flags, this.tracking.bind(this));
            }
          }]);
        }(_ExperimentManager__WEBPACK_IMPORTED_MODULE_0__.ExperimentManager);
        var GameOptionsExperimentProcessor = /*#__PURE__*/ function() {
          function GameOptionsExperimentProcessor(gbFlags, trackingCallback) {
            _classCallCheck(this, GameOptionsExperimentProcessor);
            _defineProperty(this, "attributes", undefined);
            this.context = {
              features: Object.assign({}, gbFlags)
            };
            this.trackingCallback = trackingCallback;
          }
          return _createClass(GameOptionsExperimentProcessor, [{
            key: "setAttributes",
            value: function setAttributes(data) {
              this.attributes = data;
            }
          }, {
            key: "loadFeatures",
            value: function loadFeatures() {
              return Promise.resolve();
            }
          }, {
            key: "isOn",
            value: function isOn(featureName) {
              return !!this.getFeature(featureName);
            }
          }, {
            key: "getFeature",
            value: function getFeature(featureName) {
              var _this$context;
              var featureData = Reflect.get((_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.features, featureName);
              return featureData;
            }
          }, {
            key: "getFeatureValue",
            value: function getFeatureValue(featureName) {
              var featureData = this.getFeature(featureName);
              return featureData === null || featureData === void 0 ? void 0 : featureData.value;
            }
          }, {
            key: "evalFeature",
            value: function evalFeature(featureName) {
              var _this$context2;
              var featureData = Reflect.get((_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.features, featureName);
              var result = {
                key: featureData === null || featureData === void 0 ? void 0 : featureData.variation_id,
                value: featureData === null || featureData === void 0 ? void 0 : featureData.value,
                featureId: featureName
              };
              var experiment = {
                key: featureName,
                result: result
              };
              this.trackingCallback(experiment, result);
            }
          }]);
        }();

        /***/
      }),

    /***/
    "./src/experiment-manager/ExperimentManager.js":
      /*!*****************************************************!*\
        !*** ./src/experiment-manager/ExperimentManager.js ***!
        \*****************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          ExperimentManager: () => ( /* binding */ ExperimentManager)
          /* harmony export */
        });
        /* harmony import */
        var _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../common/AnalyticsAction */ "./src/common/AnalyticsAction.js");
        /* harmony import */
        var _common_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../common/const */ "./src/common/const.js");
        /* harmony import */
        var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../common/utils */ "./src/common/utils.js");
        /* harmony import */
        var _engine_game_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! @engine/game-events */ "../game-events/src/game-events.js");

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _defineProperty(e, r, t) {
          return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[r] = t, e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }





        var ExperimentManager = /*#__PURE__*/ function() {
          function ExperimentManager() {
            _classCallCheck(this, ExperimentManager);
            _defineProperty(this, "manager", null);
            _defineProperty(this, "key", "growthbook_experiments");
            _defineProperty(this, "featuresHandlers", new Map());
            _defineProperty(this, "experiments", new Map());
            _defineProperty(this, "isEditor", false);
            _defineProperty(this, "game", null);
            this.tracking = this.tracking.bind(this);
            window.addEventListener(_common_const__WEBPACK_IMPORTED_MODULE_1__.GROWTHBOOK_IINCOMING, this.handleIncomingMessage.bind(this));
            window.addEventListener(_common_const__WEBPACK_IMPORTED_MODULE_1__.ANALYTICS_INCOMING, this.handleAnalyticsIncomingMessage.bind(this));
            this.savedGameEventHandler = this.handleGameEvent.bind(this);
            if (!window.trackGameEventListeners) window.trackGameEventListeners = [];
            window.trackGameEventListeners.push(this.savedGameEventHandler);
          }
          return _createClass(ExperimentManager, [{
            key: "handleGameEvent",
            value: function handleGameEvent(eventName, targetName, context) {
              switch (eventName) {
                case _engine_game_events__WEBPACK_IMPORTED_MODULE_3__["default"].START_LOADING: {
                  this.game = context.game;
                  this.init();
                  this.start();
                  this.removeGameEventHandler(this.savedGameEventHandler);
                  break;
                }
              }
            }
          }, {
            key: "removeGameEventHandler",
            value: function removeGameEventHandler(handler) {
              // Find the index of the handler in the array
              var index = window.trackGameEventListeners.indexOf(handler);

              // If the handler is found, remove it
              if (index !== -1) {
                window.trackGameEventListeners.splice(index, 1);
              }
            }
          }, {
            key: "init",
            value: function init() {
              this.creator = this.makeCreator();
            }

            //Override me!
          }, {
            key: "makeCreator",
            value: function makeCreator() {
              return null;
            }
          }, {
            key: "hasExperiments",
            get: function get() {
              return this.experiments.size > 0;
            }
          }, {
            key: "handleAnalyticsIncomingMessage",
            value: function handleAnalyticsIncomingMessage(_ref) {
              var message = _ref.detail;
              if (message.type === _common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.start) {
                this.isEditor = message.payload.isEditor;
              }
              window.removeEventListener(_common_const__WEBPACK_IMPORTED_MODULE_1__.ANALYTICS_INCOMING, this.handleAnalyticsIncomingMessage);
            }
          }, {
            key: "handleIncomingMessage",
            value: function handleIncomingMessage(_ref2) {
              var message = _ref2.detail;
              switch (message.type) {
                case _common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.addFeature:
                  this.addFeatureHandler(message.payload.name, message.payload.handler);
                  break;
              }
            }
          }, {
            key: "start",
            value: function start() {
              var _this = this;
              this.manager = this.creator;
              this.manager.loadFeatures().then(function() {
                var _this$manager;
                if ((_this$manager = _this.manager) !== null && _this$manager !== void 0 && (_this$manager = _this$manager.context) !== null && _this$manager !== void 0 && _this$manager.features) {
                  Object.keys(_this.manager.context.features).forEach(function(f) {
                    return _this.manager.evalFeature(f);
                  });
                  if (_this.experiments.size === 0) {
                    _this.sendMessageToTracker(_common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.updateUser, {
                      target: "TrackID",
                      source: "None"
                    });
                  }
                } else {
                  _this.sendMessageToTracker(_common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.updateUser, {
                    target: "TrackID",
                    source: "None",
                    test: true
                  });
                }
                // TODO ???
                window.dispatchEvent((0, _common_utils__WEBPACK_IMPORTED_MODULE_2__.createEvent)(_common_const__WEBPACK_IMPORTED_MODULE_1__.GROWTHBOOK_OUTGOING, {
                  type: _common_const__WEBPACK_IMPORTED_MODULE_1__.outgoingMessageType.ready,
                  payload: _this
                }));
              });
            }
          }, {
            key: "addFeatureHandler",
            value: function addFeatureHandler(featureName, handler) {
              if (typeof handler === "function") {
                this.featuresHandlers.set(featureName, handler);
                console.info("[GROWTHBOOK] Feature added: ", featureName);
                this.handleExperimentResult(featureName);
              } else {
                console.warn("[GROWTHBOOK] Feature handler must be provided as function", featureName, handler);
              }
            }
          }, {
            key: "isFeatureEnabled",
            value: function isFeatureEnabled(featureName) {
              var _this$manager2;
              return ((_this$manager2 = this.manager) === null || _this$manager2 === void 0 ? void 0 : _this$manager2.isOn(featureName)) || false;
            }
          }, {
            key: "getFeature",
            value: function getFeature(featureName) {
              var _this$manager3;
              return (_this$manager3 = this.manager) === null || _this$manager3 === void 0 ? void 0 : _this$manager3.getFeature(featureName);
            }
          }, {
            key: "getFeatureValue",
            value: function getFeatureValue(featureName) {
              var _this$manager4;
              return (_this$manager4 = this.manager) === null || _this$manager4 === void 0 ? void 0 : _this$manager4.getFeatureValue(featureName);
            }
          }, {
            key: "sendMessageToTracker",
            value: function sendMessageToTracker(type, payload) {
              window.dispatchEvent((0, _common_utils__WEBPACK_IMPORTED_MODULE_2__.createEvent)(_common_const__WEBPACK_IMPORTED_MODULE_1__.ANALYTICS_INCOMING, {
                type: type,
                payload: payload
              }));
            }
          }, {
            key: "tracking",
            value: function tracking(experiment, result) {
              console.log("[GROWTHBOOK] tracking", experiment, result);
              if (experiment && result) {
                var analyticsResult = {
                  TrackID: result.featureId + "_" + result.key,
                  FeatureID: result.featureId,
                  SegmentationKey: result.key
                };
                this.experiments.set(experiment.key, {
                  experiment: experiment,
                  result: result,
                  analyticsResult: analyticsResult
                });
                if (experiment.key) {
                  this.handleExperimentResult(experiment.key);
                }
              }
            }
          }, {
            key: "handleExperimentResult",
            value: function handleExperimentResult(featureName) {
              if (this.experiments.has(featureName)) {
                var _this$experiments$get = this.experiments.get(featureName),
                  result = _this$experiments$get.result,
                  analyticsResult = _this$experiments$get.analyticsResult;
                if (result && analyticsResult) {
                  var needToTrackExperiment = true;
                  var handler = this.featuresHandlers.get(featureName);
                  if (handler) {
                    try {
                      needToTrackExperiment = handler(result);

                      // just in case someone forget to return explicit handler value
                      if (needToTrackExperiment === undefined) {
                        needToTrackExperiment = true;
                      }
                    } catch (error) {
                      console.error(error.message || error);
                    }
                  }
                  if (needToTrackExperiment) {
                    this.trackExperimentResult(featureName, analyticsResult);
                  } else {
                    this.sendMessageToTracker(_common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.updateUser, {
                      target: "TrackID",
                      source: "None"
                    });
                  }
                }
              } else {
                //TODO: notify somehow (emmit unhandled GB_EXPERIMENT) ?
                console.log("[GROWTHBOOK] experiment not found", featureName);
              }
            }
          }, {
            key: "trackExperimentResult",
            value: function trackExperimentResult(experimentName, analyticsResult) {
              //INFO: there is no sense to track experiment multiple times
              // as user will be assigned to the same experiment by GB hash algorithm
              // but we need to update user property wit experiment ID

              if (analyticsResult !== null && analyticsResult !== void 0 && analyticsResult.TrackID) {
                this.sendMessageToTracker(_common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.updateUser, {
                  target: "TrackID",
                  source: analyticsResult.TrackID
                });
              }
              if (this.isUnknownExperiment(experimentName)) {
                this.sendMessageToTracker(_common_const__WEBPACK_IMPORTED_MODULE_1__.incomingMessageType.track, {
                  target: _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_0__.AnalyticsAction.TRACK_GROWTHBOOK_EXPERIMENT,
                  source: analyticsResult
                });
              }
            }
          }, {
            key: "isUnknownExperiment",
            value: function isUnknownExperiment(experimentName) {
              var _this$game$settings;
              // need know about game??
              var experiments = (_this$game$settings = this.game.settings) === null || _this$game$settings === void 0 ? void 0 : _this$game$settings.getItem(this.key, {});
              if (experimentName && experiments && !(experimentName in experiments)) {
                experiments[experimentName] = true;
                // need know about game??
                this.game.settings.setItem(this.key, experiments);
                return true;
              }
              return false;
            }
          }]);
        }();

        /***/
      }),

    /***/
    "./src/experiment-manager/GrowthbookExperimentManager.js":
      /*!***************************************************************!*\
        !*** ./src/experiment-manager/GrowthbookExperimentManager.js ***!
        \***************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          GrowthbookExperimentManager: () => ( /* binding */ GrowthbookExperimentManager)
          /* harmony export */
        });
        /* harmony import */
        var _growthbook_growthbook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! @growthbook/growthbook */ "../../node_modules/@growthbook/growthbook/dist/esm/GrowthBook.js");
        /* harmony import */
        var _ExperimentManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./ExperimentManager */ "./src/experiment-manager/ExperimentManager.js");
        /* harmony import */
        var _common_const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../common/const */ "./src/common/const.js");

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }

        function _callSuper(t, o, e) {
          return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
        }

        function _possibleConstructorReturn(t, e) {
          if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
          if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
          return _assertThisInitialized(t);
        }

        function _assertThisInitialized(e) {
          if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        }

        function _isNativeReflectConstruct() {
          try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
          } catch (t) {}
          return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
          })();
        }

        function _superPropGet(t, o, e, r) {
          var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
          return 2 & r && "function" == typeof p ? function(t) {
            return p.apply(e, t);
          } : p;
        }

        function _get() {
          return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
            var p = _superPropBase(e, t);
            if (p) {
              var n = Object.getOwnPropertyDescriptor(p, t);
              return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
            }
          }, _get.apply(null, arguments);
        }

        function _superPropBase(t, o) {
          for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
          return t;
        }

        function _getPrototypeOf(t) {
          return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }, _getPrototypeOf(t);
        }

        function _inherits(t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: !0,
              configurable: !0
            }
          }), Object.defineProperty(t, "prototype", {
            writable: !1
          }), e && _setPrototypeOf(t, e);
        }

        function _setPrototypeOf(t, e) {
          return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
          }, _setPrototypeOf(t, e);
        }




        /**
         * @deprecated Please use {@link BEGrowthbookExperimentManager }
         */
        var GrowthbookExperimentManager = /*#__PURE__*/ function(_ExperimentManager) {
          function GrowthbookExperimentManager() {
            _classCallCheck(this, GrowthbookExperimentManager);
            return _callSuper(this, GrowthbookExperimentManager, arguments);
          }
          _inherits(GrowthbookExperimentManager, _ExperimentManager);
          return _createClass(GrowthbookExperimentManager, [{
            key: "makeCreator",
            value: function makeCreator() {
              var _window$__OPTIONS__, _window$__OPTIONS__2;
              return new _growthbook_growthbook__WEBPACK_IMPORTED_MODULE_2__.GrowthBook({
                apiHost: _common_const__WEBPACK_IMPORTED_MODULE_1__.GROWTHBOOK_API_HOST,
                clientKey: _common_const__WEBPACK_IMPORTED_MODULE_1__.GROWTHBOOK_SDK_KEY,
                attributes: {
                  id: window.user_id || "game-developer",
                  country: "TODO: BY",
                  currency: this.game.data.currency,
                  gameName: this.game.casinoOptions.identifier,
                  deviceType: this.game.isMobile.any ? "mobile" : "desktop",
                  gameLocale: this.game.L.getCurrentLanguageId(),
                  affiliate: "".concat((_window$__OPTIONS__ = window.__OPTIONS__) === null || _window$__OPTIONS__ === void 0 ? void 0 : _window$__OPTIONS__.server_id, "-").concat(((_window$__OPTIONS__2 = window.__OPTIONS__) === null || _window$__OPTIONS__2 === void 0 || (_window$__OPTIONS__2 = _window$__OPTIONS__2.ui) === null || _window$__OPTIONS__2 === void 0 || (_window$__OPTIONS__2 = _window$__OPTIONS__2.brand) === null || _window$__OPTIONS__2 === void 0 ? void 0 : _window$__OPTIONS__2.name) || "")
                },
                trackingCallback: this.tracking.bind(this),
                enableDevMode: false
              });
            }
          }, {
            key: "sendMessageToTracker",
            value: function sendMessageToTracker(type, payload) {
              console.log("[GrowthbookExperimentManager] sendMessageToTracker", type, payload);
              _superPropGet(GrowthbookExperimentManager, "sendMessageToTracker", this, 3)([type, payload]);
              this.send({
                type: type,
                payload: payload
              });
            }
          }]);
        }(_ExperimentManager__WEBPACK_IMPORTED_MODULE_0__.ExperimentManager);

        /***/
      }),

    /***/
    "./src/experiment-manager/index.js":
      /*!*****************************************!*\
        !*** ./src/experiment-manager/index.js ***!
        \*****************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          BEGrowthbookExperimentManager: () => ( /* reexport safe */ _BEGrowthbookExperimentManager__WEBPACK_IMPORTED_MODULE_1__.BEGrowthbookExperimentManager),
          /* harmony export */
          GrowthbookExperimentManager: () => ( /* reexport safe */ _GrowthbookExperimentManager__WEBPACK_IMPORTED_MODULE_0__.GrowthbookExperimentManager)
          /* harmony export */
        });
        /* harmony import */
        var _GrowthbookExperimentManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./GrowthbookExperimentManager */ "./src/experiment-manager/GrowthbookExperimentManager.js");
        /* harmony import */
        var _BEGrowthbookExperimentManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./BEGrowthbookExperimentManager */ "./src/experiment-manager/BEGrowthbookExperimentManager.js");



        /***/
      }),

    /***/
    "./src/tracker/AnalyticsEvent.js":
      /*!***************************************!*\
        !*** ./src/tracker/AnalyticsEvent.js ***!
        \***************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          AnalyticsEvent: () => ( /* binding */ AnalyticsEvent)
          /* harmony export */
        });
        var AnalyticsEvent = {
          TRACK_ACTION: "AmplitudeEvent.TRACK_ACTION",
          UPDATE_USER_PROPERTY: "AmplitudeEvent.UPDATE_USER_PROPERTY",
          SESSION_STARTED: "AmplitudeEvent.SESSION_STARTED"
        };

        /***/
      }),

    /***/
    "./src/tracker/EventHistory.js":
      /*!*************************************!*\
        !*** ./src/tracker/EventHistory.js ***!
        \*************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          EventHistory: () => ( /* binding */ EventHistory)
          /* harmony export */
        });

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function _createForOfIteratorHelper(r, e) {
          var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
          if (!t) {
            if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
              t && (r = t);
              var _n = 0,
                F = function F() {};
              return {
                s: F,
                n: function n() {
                  return _n >= r.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: r[_n++]
                  };
                },
                e: function e(r) {
                  throw r;
                },
                f: F
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var o, a = !0,
            u = !1;
          return {
            s: function s() {
              t = t.call(r);
            },
            n: function n() {
              var r = t.next();
              return a = r.done, r;
            },
            e: function e(r) {
              u = !0, o = r;
            },
            f: function f() {
              try {
                a || null == t["return"] || t["return"]();
              } finally {
                if (u) throw o;
              }
            }
          };
        }

        function _unsupportedIterableToArray(r, a) {
          if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
          }
        }

        function _arrayLikeToArray(r, a) {
          (null == a || a > r.length) && (a = r.length);
          for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
          return n;
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _defineProperty(e, r, t) {
          return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[r] = t, e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }
        var EventHistory = /*#__PURE__*/ function() {
          /** @param {number?} limit - 1000ms by default. Time in ms after which the event will be cleared from the list. */
          function EventHistory(limit) {
            _classCallCheck(this, EventHistory);
            _defineProperty(this, "lifetime", 1000);
            /** @type {Set<[number, string]>} */
            _defineProperty(this, "events", new Set());
            if (Number.isFinite(limit) && limit > 0) {
              this.lifetime = limit;
            }
          }
          return _createClass(EventHistory, [{
            key: "checkLimit",
            value: function checkLimit() {
              var time = Date.now();
              var _iterator = _createForOfIteratorHelper(this.events),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var event = _step.value;
                  if (event[0] < time - this.lifetime) {
                    this.events["delete"](event);
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            /** @param {string} event */
          }, {
            key: "addEvent",
            value: function addEvent(event) {
              this.checkLimit();
              if (typeof event !== "string") {
                return;
              }
              this.events.add([Date.now(), event]);
            }

            /**
             * @param {string | string[]} event
             * @param {boolean} strict - strict match event names
             * */
          }, {
            key: "hasEvent",
            value: function hasEvent(event) {
              var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
              if (!Array.isArray(event)) {
                event = [event];
              }
              var f = strict ? function(e) {
                return event.includes(e[1]);
              } : function(e) {
                return event.some(function(ev) {
                  return e[1].includes(ev);
                });
              };
              return this.some(f);
            }
          }, {
            key: "some",
            value: function some(callback) {
              var result = false;
              var _iterator2 = _createForOfIteratorHelper(this.events),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var event = _step2.value;
                  if (result) return true;
                  result = callback(event);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              return result;
            }
          }]);
        }();

        /***/
      }),

    /***/
    "./src/tracker/GameTracker.js":
      /*!************************************!*\
        !*** ./src/tracker/GameTracker.js ***!
        \************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          GameTracker: () => ( /* binding */ GameTracker)
          /* harmony export */
        });
        /* harmony import */
        var _common_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../common/const */ "./src/common/const.js");
        /* harmony import */
        var _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../common/AnalyticsAction */ "./src/common/AnalyticsAction.js");
        /* harmony import */
        var _engine_game_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! @engine/game-events */ "../game-events/src/game-events.js");
        /* harmony import */
        var _AnalyticsEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./AnalyticsEvent */ "./src/tracker/AnalyticsEvent.js");
        /* harmony import */
        var _EventHistory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./EventHistory */ "./src/tracker/EventHistory.js");
        /* harmony import */
        var _roundSeriesId__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ./roundSeriesId */ "./src/tracker/roundSeriesId.js");
        /* harmony import */
        var _common_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! ../common/utils */ "./src/common/utils.js");
        /* harmony import */
        var ua_parser_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__( /*! ua-parser-js */ "../../node_modules/ua-parser-js/src/main/ua-parser.mjs");
        /* harmony import */
        var _RudderStackGameTracker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__( /*! ./RudderStackGameTracker */ "./src/tracker/RudderStackGameTracker.js");

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function ownKeys(e, r) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r && (o = o.filter(function(r) {
              return Object.getOwnPropertyDescriptor(e, r).enumerable;
            })), t.push.apply(t, o);
          }
          return t;
        }

        function _objectSpread(e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
              _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
          }
          return e;
        }

        function _regeneratorRuntime() {
          "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
          _regeneratorRuntime = function _regeneratorRuntime() {
            return e;
          };
          var t, e = {},
            r = Object.prototype,
            n = r.hasOwnProperty,
            o = Object.defineProperty || function(t, e, r) {
              t[e] = r.value;
            },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";

          function define(t, e, r) {
            return Object.defineProperty(t, e, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }), t[e];
          }
          try {
            define({}, "");
          } catch (t) {
            define = function define(t, e, r) {
              return t[e] = r;
            };
          }

          function wrap(t, e, r, n) {
            var i = e && e.prototype instanceof Generator ? e : Generator,
              a = Object.create(i.prototype),
              c = new Context(n || []);
            return o(a, "_invoke", {
              value: makeInvokeMethod(t, r, c)
            }), a;
          }

          function tryCatch(t, e, r) {
            try {
              return {
                type: "normal",
                arg: t.call(e, r)
              };
            } catch (t) {
              return {
                type: "throw",
                arg: t
              };
            }
          }
          e.wrap = wrap;
          var h = "suspendedStart",
            l = "suspendedYield",
            f = "executing",
            s = "completed",
            y = {};

          function Generator() {}

          function GeneratorFunction() {}

          function GeneratorFunctionPrototype() {}
          var p = {};
          define(p, a, function() {
            return this;
          });
          var d = Object.getPrototypeOf,
            v = d && d(d(values([])));
          v && v !== r && n.call(v, a) && (p = v);
          var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);

          function defineIteratorMethods(t) {
            ["next", "throw", "return"].forEach(function(e) {
              define(t, e, function(t) {
                return this._invoke(e, t);
              });
            });
          }

          function AsyncIterator(t, e) {
            function invoke(r, o, i, a) {
              var c = tryCatch(t[r], t, o);
              if ("throw" !== c.type) {
                var u = c.arg,
                  h = u.value;
                return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function(t) {
                  invoke("next", t, i, a);
                }, function(t) {
                  invoke("throw", t, i, a);
                }) : e.resolve(h).then(function(t) {
                  u.value = t, i(u);
                }, function(t) {
                  return invoke("throw", t, i, a);
                });
              }
              a(c.arg);
            }
            var r;
            o(this, "_invoke", {
              value: function value(t, n) {
                function callInvokeWithMethodAndArg() {
                  return new e(function(e, r) {
                    invoke(t, n, e, r);
                  });
                }
                return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
              }
            });
          }

          function makeInvokeMethod(e, r, n) {
            var o = h;
            return function(i, a) {
              if (o === f) throw Error("Generator is already running");
              if (o === s) {
                if ("throw" === i) throw a;
                return {
                  value: t,
                  done: !0
                };
              }
              for (n.method = i, n.arg = a;;) {
                var c = n.delegate;
                if (c) {
                  var u = maybeInvokeDelegate(c, n);
                  if (u) {
                    if (u === y) continue;
                    return u;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                  if (o === h) throw o = s, n.arg;
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                o = f;
                var p = tryCatch(e, r, n);
                if ("normal" === p.type) {
                  if (o = n.done ? s : l, p.arg === y) continue;
                  return {
                    value: p.arg,
                    done: n.done
                  };
                }
                "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
              }
            };
          }

          function maybeInvokeDelegate(e, r) {
            var n = r.method,
              o = e.iterator[n];
            if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
            var i = tryCatch(o, e.iterator, r.arg);
            if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
            var a = i.arg;
            return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
          }

          function pushTryEntry(t) {
            var e = {
              tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
          }

          function resetTryEntry(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e;
          }

          function Context(t) {
            this.tryEntries = [{
              tryLoc: "root"
            }], t.forEach(pushTryEntry, this), this.reset(!0);
          }

          function values(e) {
            if (e || "" === e) {
              var r = e[a];
              if (r) return r.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function next() {
                    for (; ++o < e.length;)
                      if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
                    return next.value = t, next.done = !0, next;
                  };
                return i.next = i;
              }
            }
            throw new TypeError(_typeof(e) + " is not iterable");
          }
          return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
            value: GeneratorFunctionPrototype,
            configurable: !0
          }), o(GeneratorFunctionPrototype, "constructor", {
            value: GeneratorFunction,
            configurable: !0
          }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
          }, e.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
          }, e.awrap = function(t) {
            return {
              __await: t
            };
          }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function() {
            return this;
          }), e.AsyncIterator = AsyncIterator, e.async = function(t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new AsyncIterator(wrap(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then(function(t) {
              return t.done ? t.value : a.next();
            });
          }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function() {
            return this;
          }), define(g, "toString", function() {
            return "[object Generator]";
          }), e.keys = function(t) {
            var e = Object(t),
              r = [];
            for (var n in e) r.push(n);
            return r.reverse(),
              function next() {
                for (; r.length;) {
                  var t = r.pop();
                  if (t in e) return next.value = t, next.done = !1, next;
                }
                return next.done = !0, next;
              };
          }, e.values = values, Context.prototype = {
            constructor: Context,
            reset: function reset(e) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e)
                for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
            },
            stop: function stop() {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function dispatchException(e) {
              if (this.done) throw e;
              var r = this;

              function handle(n, o) {
                return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var i = this.tryEntries[o],
                  a = i.completion;
                if ("root" === i.tryLoc) return handle("end");
                if (i.tryLoc <= this.prev) {
                  var c = n.call(i, "catchLoc"),
                    u = n.call(i, "finallyLoc");
                  if (c && u) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                    if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  } else if (c) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  } else {
                    if (!u) throw Error("try statement without catch or finally");
                    if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  }
                }
              }
            },
            abrupt: function abrupt(t, e) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var o = this.tryEntries[r];
                if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                  var i = o;
                  break;
                }
              }
              i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
              var a = i ? i.completion : {};
              return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
            },
            complete: function complete(t, e) {
              if ("throw" === t.type) throw t.arg;
              return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
            },
            finish: function finish(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
              }
            },
            "catch": function _catch(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var r = this.tryEntries[e];
                if (r.tryLoc === t) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    resetTryEntry(r);
                  }
                  return o;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(e, r, n) {
              return this.delegate = {
                iterator: values(e),
                resultName: r,
                nextLoc: n
              }, "next" === this.method && (this.arg = t), y;
            }
          }, e;
        }

        function asyncGeneratorStep(n, t, e, r, o, a, c) {
          try {
            var i = n[a](c),
              u = i.value;
          } catch (n) {
            return void e(n);
          }
          i.done ? t(u) : Promise.resolve(u).then(r, o);
        }

        function _asyncToGenerator(n) {
          return function() {
            var t = this,
              e = arguments;
            return new Promise(function(r, o) {
              var a = n.apply(t, e);

              function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
              }

              function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
              }
              _next(void 0);
            });
          };
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _defineProperty(e, r, t) {
          return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[r] = t, e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }











        // Mock fetch for Jest/Node environment
        if (typeof __webpack_require__.g.fetch === "undefined") {
          __webpack_require__.g.fetch = jest.fn(function() {
            return Promise.resolve({
              json: function json() {
                return Promise.resolve({});
              }
            });
          });
        }
        var GameTracker = /*#__PURE__*/ function() {
          function GameTracker() {
            var _window$__OPTIONS__;
            _classCallCheck(this, GameTracker);
            _defineProperty(this, "game", null);
            _defineProperty(this, "currencyRate", 0);
            _defineProperty(this, "isAutoSpinInProgress", false);
            _defineProperty(this, "autoSpinsCounter", 0);
            _defineProperty(this, "prevAutoSpinsCount", 0);
            _defineProperty(this, "latestKnownVolume", 1);
            _defineProperty(this, "spinButtonClickType", undefined);
            _defineProperty(this, "userProperties", {});
            _defineProperty(this, "buyFeatures", [_common_const__WEBPACK_IMPORTED_MODULE_0__.buyFeatures.bonusBuy, _common_const__WEBPACK_IMPORTED_MODULE_0__.buyFeatures.freespinBuy]);
            _defineProperty(this, "gameFeatures", {
              states: [_common_const__WEBPACK_IMPORTED_MODULE_0__.features.freespins, _common_const__WEBPACK_IMPORTED_MODULE_0__.features.respin],
              commands: [_common_const__WEBPACK_IMPORTED_MODULE_0__.featuresCommands.freespin, _common_const__WEBPACK_IMPORTED_MODULE_0__.featuresCommands.respin]
            });
            _defineProperty(this, "finishStates", [_common_const__WEBPACK_IMPORTED_MODULE_0__.gameFinishStates.closed, _common_const__WEBPACK_IMPORTED_MODULE_0__.gameFinishStates.gamble]);
            _defineProperty(this, "history", new _EventHistory__WEBPACK_IMPORTED_MODULE_4__.EventHistory());
            _defineProperty(this, "isGameInitialized", false);
            _defineProperty(this, "gameLoadingTime", 0);
            _defineProperty(this, "rsTracker", new _RudderStackGameTracker__WEBPACK_IMPORTED_MODULE_8__.RudderStackGameTracker());
            /**
             * Flag that allows sending analytics events.
             * Can be true, false or null (default null if not defined).
             * @type {boolean|null}
             */
            _defineProperty(this, "canSendEvents", null);
            /**
             * Flag indicating that non-game events are working
             * @type {boolean}
             */
            _defineProperty(this, "hasExternalEvents", false);
            /**
             * Queue of analytics events (actionName, actionData).
             * Used only for analytics events that are sent through sendAction.
             * @type {Array<{actionName: string, actionData: any}>}
             */
            _defineProperty(this, "eventQueue", []);
            /**
             * Accumulated data for identify, currently identify is sent only when conditions are met
             * @type {{userID: number|string, data: {[key: string]: any}}}
             */
            _defineProperty(this, "accumulatedIdentifyData", {});
            /**
             * Flag indicating that identify data has already been sent
             * @type {boolean}
             */
            _defineProperty(this, "hasIdentifyDataSent", false);
            this.userID = ((_window$__OPTIONS__ = window.__OPTIONS__) === null || _window$__OPTIONS__ === void 0 || (_window$__OPTIONS__ = _window$__OPTIONS__.loyalty_system_options) === null || _window$__OPTIONS__ === void 0 ? void 0 : _window$__OPTIONS__.player_id) || "unknown";
            window.addEventListener(_common_const__WEBPACK_IMPORTED_MODULE_0__.ANALYTICS_INCOMING, this.handleIncomingMessages.bind(this));
            window.addEventListener(_common_const__WEBPACK_IMPORTED_MODULE_0__.EXTERNAL_INCOMING_ANALYTICS, this.handleExternalEvent.bind(this));
            this.gameEventHandler = this.gameEventHandler.bind(this);
            this.trackPageView();
            this.checkIfEventSendingIsAllowed();
          }
          /**
           * Checks if sending analytics events is allowed.
           * If canSendEvents value is null, then checks for the presence of "canSendEvents" key in localStorage.
           * If the key exists and equals "true", then allows sending events.
           * If the key exists and equals "false", then prohibits sending events.
           * If the key doesn't exist, then events are added to the queue for sending and cleared from the queue after sending or if canSendEvents value becomes false.
           * @returns {boolean} true if sending events is allowed, false if prohibited
           */
          return _createClass(GameTracker, [{
            key: "checkIfEventSendingIsAllowed",
            value: (function() {
              var _checkIfEventSendingIsAllowed = _asyncToGenerator( /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
                var _window;
                var gameName, res, gameList;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      gameName = ((_window = window) === null || _window === void 0 || (_window = _window.__OPTIONS__) === null || _window === void 0 ? void 0 : _window.identifier) || "unknownName";
                      _context.prev = 1;
                      _context.next = 4;
                      return fetch(_common_const__WEBPACK_IMPORTED_MODULE_0__.ANALYTICS_GAMES_LIST_API_URL);
                    case 4:
                      res = _context.sent;
                      if (res.ok) {
                        _context.next = 10;
                        break;
                      }
                      console.log("HTTP error: ".concat(res.status));
                      this.canSendEvents = false;
                      console.log("[RSA] game event disabled");
                      return _context.abrupt("return");
                    case 10:
                      _context.next = 12;
                      return res.json();
                    case 12:
                      gameList = _context.sent;
                      if (Array.isArray(gameList) && gameList.includes(gameName)) {
                        this.canSendEvents = true;
                        console.log("[RSA] game event enabled");
                        if (!this.hasIdentifyDataSent) {
                          this.sendAccumulatedIdentifyData();
                        }
                        this.clearEventQueue();
                      } else {
                        this.canSendEvents = false;
                        console.log("[RSA] game event disabled");
                      }
                      _context.next = 21;
                      break;
                    case 16:
                      _context.prev = 16;
                      _context.t0 = _context["catch"](1);
                      this.canSendEvents = false;
                      console.log("[RSA] game event disabled");
                      return _context.abrupt("return");
                    case 21:
                    case "end":
                      return _context.stop();
                  }
                }, _callee, this, [
                  [1, 16]
                ]);
              }));

              function checkIfEventSendingIsAllowed() {
                return _checkIfEventSendingIsAllowed.apply(this, arguments);
              }
              return checkIfEventSendingIsAllowed;
            }())
          }, {
            key: "handleIncomingMessages",
            value: function handleIncomingMessages(_ref) {
              var _message$payload;
              var message = _ref.detail;
              switch (message.type) {
                case _common_const__WEBPACK_IMPORTED_MODULE_0__.incomingMessageType.start:
                  this.notifyTrackerInitialized(message.payload);
                  if (!((_message$payload = message.payload) !== null && _message$payload !== void 0 && _message$payload.skipTrackingEvents)) {
                    this.startTrackingEvents();
                  } else {
                    console.log("[RSA] only window events");
                  }
                  break;
                case _common_const__WEBPACK_IMPORTED_MODULE_0__.incomingMessageType.updateUser:
                  this.updateUserProperty(message.payload.target, message.payload.source);
                  break;
                case _common_const__WEBPACK_IMPORTED_MODULE_0__.incomingMessageType.track:
                  this.sendAction(message.payload.eventName, message.payload.eventData);
                  break;
                default:
                  break;
              }
            }
          }, {
            key: "handleExternalEvent",
            value: function handleExternalEvent(_ref2) {
              var message = _ref2.detail;
              var _message$payload2 = message.payload,
                eventName = _message$payload2.eventName,
                eventData = _message$payload2.eventData;
              if (!eventName) {
                console.error("[RSA] SensdAction() actionName is required");
                return;
              }
              if (!this.hasExternalEvents) {
                this.hasExternalEvents = true;
                if (!this.hasIdentifyDataSent) {
                  this.sendAccumulatedIdentifyData();
                }
              }
              var newActionData = this.addExtraData(eventName, _objectSpread({}, eventData));
              console.log("[RSA] track external event", eventName, newActionData);
              this.rsTracker.track(eventName, newActionData);
            }
          }, {
            key: "notifyTrackerInitialized",
            value: function notifyTrackerInitialized(payload) {
              // notify about Loaded
              window.dispatchEvent((0, _common_utils__WEBPACK_IMPORTED_MODULE_6__.createEvent)(_common_const__WEBPACK_IMPORTED_MODULE_0__.ANALYTICS_OUTGOING, {
                type: _common_const__WEBPACK_IMPORTED_MODULE_0__.outgoingMessageType.initialized,
                payload: this
              }));
            }
          }, {
            key: "updateUserProperty",
            value: function updateUserProperty(propertyName, value) {
              var immediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
              console.log("[RSA] updateUserProperty", propertyName, value);
              this.userProperties[propertyName] = value;
              if (immediately && this.isGameInitialized) {
                this.identify(this.userID, {
                  propertyName: value
                });
              }
            }
          }, {
            key: "trackPageView",
            value: function trackPageView() {
              var _window2, _window3, _window$__OPTIONS__2, _window$__OPTIONS__3, _window$__OPTIONS__4, _window$__OPTIONS__5;
              var storedUserId = ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.localStorage) === null || _window2 === void 0 ? void 0 : _window2.getItem("gameTracker_userId")) || null;
              if (storedUserId === null) {
                this.userProperties["userIDchanged"] = "unknown";
                this.userProperties["prevUserID"] = "unknown";
              } else {
                this.userProperties["userIDchanged"] = String(storedUserId) === String(this.userID) ? "false" : "true";
                this.userProperties["prevUserID"] = storedUserId;
              }
              (_window3 = window) === null || _window3 === void 0 || (_window3 = _window3.localStorage) === null || _window3 === void 0 || _window3.setItem("gameTracker_userId", String(this.userID));
              this.userProperties["userID"] = this.userID;
              this.userProperties["Affiliate"] = "".concat((_window$__OPTIONS__2 = window.__OPTIONS__) === null || _window$__OPTIONS__2 === void 0 ? void 0 : _window$__OPTIONS__2.server_id, "-").concat(((_window$__OPTIONS__3 = window.__OPTIONS__) === null || _window$__OPTIONS__3 === void 0 || (_window$__OPTIONS__3 = _window$__OPTIONS__3.ui) === null || _window$__OPTIONS__3 === void 0 || (_window$__OPTIONS__3 = _window$__OPTIONS__3.brand) === null || _window$__OPTIONS__3 === void 0 ? void 0 : _window$__OPTIONS__3.name) || "unknown");
              this.userProperties["Skin"] = ((_window$__OPTIONS__4 = window.__OPTIONS__) === null || _window$__OPTIONS__4 === void 0 || (_window$__OPTIONS__4 = _window$__OPTIONS__4.ui) === null || _window$__OPTIONS__4 === void 0 ? void 0 : _window$__OPTIONS__4.applied_skin) || ((_window$__OPTIONS__5 = window.__OPTIONS__) === null || _window$__OPTIONS__5 === void 0 || (_window$__OPTIONS__5 = _window$__OPTIONS__5.ui) === null || _window$__OPTIONS__5 === void 0 ? void 0 : _window$__OPTIONS__5.skin) || "unknown";
              this.identify(this.userID, this.userProperties);
              var browserData = (0, ua_parser_js__WEBPACK_IMPORTED_MODULE_7__.UAParser)(window.navigator.userAgent);
              var data = {
                Tech: browserData
              };
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.PAGE_VIEW, data);
            }

            //when dispatched GameEvent.GAME_INITIALIZED
          }, {
            key: "startSession",
            value: function startSession(gameName) {
              var _this$game$currentSce, _this$game$currentSce2, _this$game$data;
              this.isGameInitialized = true;
              this.userProperties["Game"] = gameName;
              this.userProperties["Currency"] = this.game.data.currency;
              this.userProperties["Lines Count Mode"] = ((_this$game$currentSce = this.game.currentScene) === null || _this$game$currentSce === void 0 || (_this$game$currentSce = _this$game$currentSce.additionalSpinOptions) === null || _this$game$currentSce === void 0 ? void 0 : _this$game$currentSce.mode) || "None";
              this.userProperties["Volatility"] = ((_this$game$currentSce2 = this.game.currentScene) === null || _this$game$currentSce2 === void 0 || (_this$game$currentSce2 = _this$game$currentSce2.additionalSpinOptions) === null || _this$game$currentSce2 === void 0 ? void 0 : _this$game$currentSce2.volatility) || ((_this$game$data = this.game.data) === null || _this$game$data === void 0 ? void 0 : _this$game$data.volatility) || "None";
              this.identify(this.userID, this.userProperties);
              var data = {
                Sounds: this.game.Sound.soundEnabled ? "On" : "Off",
                Music: this.game.Sound.musicEnabled ? "On" : "Off",
                "Screen Resolution": "".concat(this.game.W, "x").concat(this.game.H),
                Orientation: this.game.isMobile.any ? this.game.isPortrait ? "Portrait" : "Landscape" : "Desktop",
                Game: gameName,
                Language: this.game.L.getCurrentLanguageId(),
                Currency: this.game.data.currency,
                "Rendering Context": this._getRenderingContext(),
                "Load time": +(this.gameLoadingTime / 1000).toFixed(1)
              };
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SESSION_STARTED, data);
              window.dispatchEvent((0, _common_utils__WEBPACK_IMPORTED_MODULE_6__.createEvent)(_common_const__WEBPACK_IMPORTED_MODULE_0__.ANALYTICS_OUTGOING, {
                type: _common_const__WEBPACK_IMPORTED_MODULE_0__.outgoingMessageType.sessionStarted,
                payload: this
              }));
            }

            //overrideMe!
          }, {
            key: "identify",
            value: function identify(userID, data) {
              // Save userID
              this.accumulatedIdentifyData.userID = userID;

              // Initialize data if it doesn't exist
              if (!this.accumulatedIdentifyData.data) {
                this.accumulatedIdentifyData.data = {};
              }
              // Accumulate data (update existing, add new)
              Object.assign(this.accumulatedIdentifyData.data, data);
              if (this.hasExternalEvents || this.canSendEvents === true) {
                this.sendAccumulatedIdentifyData();
              }
            }
          }, {
            key: "sendAccumulatedIdentifyData",
            value: function sendAccumulatedIdentifyData() {
              var _this$accumulatedIden = this.accumulatedIdentifyData,
                userID = _this$accumulatedIden.userID,
                data = _this$accumulatedIden.data;
              if (userID || data) {
                console.log("[RSA] identify", userID, data);
                this.hasIdentifyDataSent = true;
                this.rsTracker.identify(userID, data);
              }
            }
          }, {
            key: "_getRenderingContext",
            value: function _getRenderingContext() {
              var canvas = document.createElement("canvas");
              if (canvas.getContext("webgl2")) {
                return "WebGL2.0";
              }
              if (canvas.getContext("webgl")) {
                return "WebGL1.0";
              }
              return "Canvas";
            }
          }, {
            key: "startTrackingEvents",
            value: function startTrackingEvents() {
              var _window4, _window4$trackGameEve, _window$__OPTIONS__6;
              (_window4$trackGameEve = (_window4 = window).trackGameEventListeners) !== null && _window4$trackGameEve !== void 0 ? _window4$trackGameEve : _window4.trackGameEventListeners = [];
              window.trackGameEventListeners.push(this.gameEventHandler);
              this.currencyRate = parseFloat((_window$__OPTIONS__6 = window.__OPTIONS__) === null || _window$__OPTIONS__6 === void 0 ? void 0 : _window$__OPTIONS__6.actual_currency_rate) || 0;
            }
            /**
             * @description: Handler for old games. May access non-existent methods.
             * @todo: check for possibility of removal
             */
          }, {
            key: "gameEventHandler",
            value: function gameEventHandler(eventName, targetName, data) {
              if (this.canSendEvents === false || this.canSendEvents === null) {
                return;
              }
              console.log("[RSA] event handler         ", eventName, targetName, data);
              this.history.addEvent(eventName);
              try {
                switch (eventName) {
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].START_LOADING:
                    this.game = data.game;
                    window.dispatchEvent((0, _common_utils__WEBPACK_IMPORTED_MODULE_6__.createEvent)(_common_const__WEBPACK_IMPORTED_MODULE_0__.ANALYTICS_OUTGOING, {
                      type: _common_const__WEBPACK_IMPORTED_MODULE_0__.outgoingMessageType.ready,
                      payload: this
                    }));
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_INITIALIZED:
                    this.startSession(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_RESOURCES_LOADED:
                    this.gameLoadingTime = performance.now();
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].BET_CHANGED:
                    this._handleBetChange(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_BET_PANEL_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BET_CHANGE_SETTINGS_SHOWN, {
                      Source: data || "Panel"
                    });
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_BET_PANEL_CLOSED:
                    if (!this.history.hasEvent(_engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].BET_CHANGED)) {
                      this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BET_CHANGE_SETTINGS_CLOSED);
                    }
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SETTINGS_OPENED:
                    this.latestKnownVolume = this.game.Sound.fullVol;
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SETTINGS_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_MENU_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MENU_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_MENU_CLOSED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MENU_CLOSED);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SETTINGS_CLOSED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SETTINGS_CLOSED);
                    this._handleVolumeChange();
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_RULES_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.HELP_SCREEN_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_RULES_CLOSED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.HELP_SCREEN_CLOSED);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_PAYTABLE_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.PAYTABLE_SCREEN_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_PAYTABLE_CLOSED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.PAYTABLE_SCREEN_CLOSED);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_AUTOSPINS_PANEL_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.AUTOSPIN_MODE_SCREEN_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_AUTOSPINS_PANEL_CLOSED:
                    // not sure if it works at all (I mean history check logic)
                    if (!this.history.hasEvent("autospin-start-", false)) {
                      this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.AUTOSPIN_MODE_SCREEN_CLOSED);
                    }
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].AUTOSPINS_STARTED:
                    this._handleAutoSpinsStart(data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].AUTOSPINS_STOPPED:
                    this._handleAutoSpinsStop(data ? "Rule" : "Manual");
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].BUTTON_CLICK:
                    this._handleButtonClick(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].PRE_PLAY:
                    (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_5__.requestRoundSeriesRefresh)();
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].PLAY:
                    //this._handleSpin(data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].CUSTOM_EVENT:
                    this._handleCustomEvent(data);
                    break;
                  case _AnalyticsEvent__WEBPACK_IMPORTED_MODULE_3__.AnalyticsEvent.TRACK_ACTION:
                    this.sendAction(targetName, data);
                    break;
                  case _AnalyticsEvent__WEBPACK_IMPORTED_MODULE_3__.AnalyticsEvent.UPDATE_USER_PROPERTY:
                    this.updateUserProperty(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].SET_SKIN:
                    this._handleSkinChange(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].SET_LINES_COUNT:
                    this._handleLinesCountChange(targetName);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].SET_VOLATILITY:
                    this._handleVolatilityChange(targetName, data);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_QUICK_SPIN_OFFER_OPENED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_OFFER_POPUP_SHOWN);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_QUICK_SPIN_OFFER_CLOSED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_OFFER_POPUP_CLOSED);
                    break;

                    // this event is used instead of handling the click on the 'home-button' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GO_HOME:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.LOBBY);
                    break;

                    // these 2 events are used instead of handling the click on the 'settings-quick-spin' or 'quick-spin-check' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_QUICK_SPIN_MODE_ENABLED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_MODE_ENABLED, {
                      Source: data
                    });
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_QUICK_SPIN_MODE_DISABLED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_MODE_DISABLED, {
                      Source: data
                    });
                    break;

                    // this event is used instead of handling the click on the 'mute-button-on' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_ALL_SOUNDS_ON:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_ON);
                    break;

                    // this event is used instead of handling the click on the 'mute-button-off' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_ALL_SOUNDS_OFF:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_OFF);
                    break;

                    // these 2 events are used instead of handling the click on the 'settings-music' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_MUSIC_ON:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MUSIC_ON);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_MUSIC_OFF:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MUSIC_OFF);
                    break;

                    // these 2 events are used instead of handling the click on the 'settings-fx' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SOUND_FX_ON:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SOUND_FX_ON);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SOUND_FX_OFF:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SOUND_FX_OFF);
                    break;

                    // these 2 events are used instead of handling the click on the 'settings-spacebar-to-spin' button
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SPACEBAR_TO_SPIN_ENABLED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SPACEBAR_TO_SPIN_ENABLED);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_SPACEBAR_TO_SPIN_DISABLED:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SPACEBAR_TO_SPIN_DISABLED);
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].GAME_UI_BUY_BONUS_SCREEN_SHOWN:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_SCREEN_SHOWN, {
                      Source: "UI"
                    });
                    break;
                  case _engine_game_events__WEBPACK_IMPORTED_MODULE_2__["default"].ERROR:
                    this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ERROR, {
                      Code: targetName
                    }, true);
                    break;
                  default:
                    //do nothing here
                }
              } catch (error) {
                console.error(error);
              }
            }
          }, {
            key: "clearEventQueue",
            value: function clearEventQueue() {
              var _this = this;
              this.eventQueue.forEach(function(_ref3) {
                var actionName = _ref3.actionName,
                  actionData = _ref3.actionData;
                _this.sendAction(actionName, actionData);
              });
              this.eventQueue = [];
            }
          }, {
            key: "sendAction",
            value: function sendAction(actionName, actionData) {
              if (this.canSendEvents === false) {
                return;
              }
              if (!actionName) {
                console.error("[RSA] SensdAction() actionName is required");
                return;
              }
              if (this.canSendEvents === null) {
                this.eventQueue.push({
                  actionName: actionName,
                  actionData: actionData
                });
                return;
              }
              var newActionData = this.addExtraData(actionName, _objectSpread({}, actionData));
              console.log("[RSA] track", actionName, newActionData);
              this.rsTracker.track(actionName, newActionData);
            }
          }, {
            key: "addExtraData",
            value: function addExtraData(actionName, actionData) {
              var roundSeriesState = (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_5__.getRoundSeriesState)();
              if (actionName !== "Spin Started" && roundSeriesState.needsRefresh) {
                (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_5__.createNewRoundSeriesId)();
              }
              if (!actionData) {
                actionData = {};
              }
              // Add round_series_id from window.extraData, if it exists
              if (window.extraData && window.extraData.round_series_id) {
                actionData.round_series_id = "".concat(window.extraData.round_series_id, "_").concat(roundSeriesState.playerId);
              }
              if (actionName !== "Spin Started") {
                (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_5__.clearRoundSeriesRefreshFlag)();
              }
              return actionData;
            }
          }, {
            key: "overrideUserProperties",
            value: function overrideUserProperties() {
              if (this.isGameInitialized) this.identify(this.userID, this.userProperties);
            }
          }, {
            key: "_handleBetChange",
            value: function _handleBetChange(eventData) {
              if (!eventData || !eventData.source) {
                //INFO: ignore bet changes outside UI
                return;
              }
              var data = {
                Source: eventData.source || "Unknown",
                Type: "Bet Menu"
              };
              if (eventData.source === "Buy Bonus Screen") {
                data.Type = eventData.currentBet > eventData.previousBet ? "Plus Button" : "Minus Button";
              } else if (eventData.buttonName === "bet-up-button") {
                data.Type = "Plus Button";
              } else if (eventData.buttonName === "bet-down-button") {
                data.Type = "Minus Button";
              } else if (eventData.buttonName === "bet-max-button") {
                data.Type = "Max Button";
              }
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BET_CHANGED, data);
            }
          }, {
            key: "_handleVolumeChange",
            value: function _handleVolumeChange() {
              var sv = this.game.Sound.soundsVol;
              var mv = this.game.Sound.musicVol;
              var se = this.game.Sound.soundEnabled;
              var me = this.game.Sound.musicEnabled;
              var currentVolume = se && me ? sv : se ? sv : mv;
              if (this.latestKnownVolume > 0 && currentVolume === 0) {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_OFF);
              } else if (this.latestKnownVolume === 0 && currentVolume > 0) {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_ON);
              }
              if (currentVolume !== this.latestKnownVolume) {
                this.latestKnownVolume = currentVolume;
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.VOLUME_CHANGED, {
                  Level: Math.round(currentVolume * 100)
                });
              }
            }
          }, {
            key: "_handleAutoSpinsStart",
            value: function _handleAutoSpinsStart() {
              var withRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
              var onSpinHandle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var isAdvancedStopConditionsUsed = withRules || this.game.data.stopAutospinsOnAnyWin || this.game.data.stopIfSingleWinExceeds || this.game.data.stopOnCashBalanceIncreasedBy || this.game.data.stopOnCashBalanceDecreasedBy || this.game.data.stopAutospinsIfBonusGameIsWon;
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.AUTOSPIN_MODE_STARTED, {
                Count: this.game.data.autospinsCountInfinity ? "Infinity" : this.game.data.autospinsCount + Number(onSpinHandle),
                "Advanced Mode": isAdvancedStopConditionsUsed ? "Yes" : "No"
              });
              this.isAutoSpinInProgress = true;
            }
          }, {
            key: "_handleAutoSpinsStop",
            value: function _handleAutoSpinsStop(reason) {
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.AUTOSPIN_MODE_FINISHED, {
                Count: this.autoSpinsCounter,
                Reason: reason
              });
              this.autoSpinsCounter = 0;
              this.isAutoSpinInProgress = false;
            }
          }, {
            key: "_handleSpin",
            value: function _handleSpin(spinData) {
              var _this$_checkFeatures = this._checkFeatures(spinData),
                isPurchasedRoundFinished = _this$_checkFeatures.isPurchasedRoundFinished,
                isFeatureStarted = _this$_checkFeatures.isFeatureStarted,
                isFeatureFinished = _this$_checkFeatures.isFeatureFinished;
              if ((isFeatureStarted || !spinData || spinData !== null && spinData !== void 0 && spinData.isRespin || spinData !== null && spinData !== void 0 && spinData.isFreeSpin) && !isPurchasedRoundFinished && !isFeatureFinished) {
                //INFO do not track not payed spins
                return;
              }
              var isNeedToSendSpinAction = true;
              if (spinData !== null && spinData !== void 0 && spinData.isAutoSpin) {
                this.autoSpinsCounter++;
                if (!this.isAutoSpinInProgress) {
                  this._handleAutoSpinsStart(false, true);
                }
                this.prevAutoSpinsCount = this.game.data.autospinsCount;
              }
              var bet = spinData !== null && spinData !== void 0 && spinData.isFreeRound || !isFeatureFinished ? this.game.data.balanceChargedForSpin : this.game.data.bet;
              var spinCost = bet / this.game.data.currencyDivider;
              var revenueData = {
                $revenue: +(this.currencyRate * spinCost).toFixed(5),
                $revenueType: (spinData === null || spinData === void 0 ? void 0 : spinData.purchasedFeature) || (spinData !== null && spinData !== void 0 && spinData.isFreeRound ? "Bonus round" : "Regular spin"),
                priceOriginal: spinCost,
                rate: this.currencyRate
              };
              var win = isFeatureFinished ? spinData.gameTotalWin : spinData.win;
              var spinButtonClickType = this.spinButtonClickType === "hotkey" ? "Manual Keyboard" : "Manual Click";
              var spinButtonClickMode = this.spinButtonClickType === "autorepeat" ? "Hold" : "Single";
              var data = _objectSpread(_objectSpread({
                Type: spinData !== null && spinData !== void 0 && spinData.isAutoSpin ? "Auto Mode" : (spinData === null || spinData === void 0 ? void 0 : spinData.spinType) || spinButtonClickType,
                Mode: (spinData === null || spinData === void 0 ? void 0 : spinData.spinMode) || spinButtonClickMode,
                "Quick Mode": this.game.settings.getItem("quickSpin") ? "On" : "Off",
                "Multiplying Chance": (spinData === null || spinData === void 0 ? void 0 : spinData.purchasedFeature) || "No",
                Orientation: this.game.isMobile.any ? this.game.isPortrait ? "Portrait" : "Landscape" : "Desktop"
              }, revenueData), {}, {
                $profit: +(revenueData.$revenue - win / this.game.data.currencyDivider * revenueData.rate).toFixed(5)
              });
              var isFeatureBought = this.buyFeatures.some(function(featureName) {
                var _spinData$purchasedFe;
                return !!(spinData !== null && spinData !== void 0 && (_spinData$purchasedFe = spinData.purchasedFeature) !== null && _spinData$purchasedFe !== void 0 && _spinData$purchasedFe.includes(featureName));
              });
              if (isFeatureBought) {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_PURCHASED, _objectSpread(_objectSpread({
                  Type: spinData.purchasedFeature
                }, spinData.purchasedFeatureLevel && {
                  Symbols: spinData.purchasedFeatureLevel
                }), revenueData));
                data["Multiplying Chance"] = "No";
                isNeedToSendSpinAction = false;
              }
              if (isPurchasedRoundFinished) {
                var _this$game$data2, _spinData$gameFlow, _spinData$gameFlow2;
                var prices = (_this$game$data2 = this.game.data) === null || _this$game$data2 === void 0 ? void 0 : _this$game$data2.bonusPrices;
                var featureName = (_spinData$gameFlow = spinData.gameFlow) === null || _spinData$gameFlow === void 0 || (_spinData$gameFlow = _spinData$gameFlow.purchased_feature) === null || _spinData$gameFlow === void 0 ? void 0 : _spinData$gameFlow.name;
                var level = (_spinData$gameFlow2 = spinData.gameFlow) === null || _spinData$gameFlow2 === void 0 || (_spinData$gameFlow2 = _spinData$gameFlow2.purchased_feature) === null || _spinData$gameFlow2 === void 0 ? void 0 : _spinData$gameFlow2.level;
                var bonusPrice = 0;
                if (prices) {
                  bonusPrice = level ? prices[featureName][level] : prices[featureName];
                } else {
                  var _this$game$data$initD;
                  var featureMultipliers = (_this$game$data$initD = this.game.data.initData.options) === null || _this$game$data$initD === void 0 || (_this$game$data$initD = _this$game$data$initD.feature_options) === null || _this$game$data$initD === void 0 ? void 0 : _this$game$data$initD.feature_multipliers;
                  var baseBet = featureMultipliers.base_bet || 100;
                  var _bet = this.game.currentScene.getBet();
                  if (featureMultipliers) {
                    var featureMultiplier = level ? featureMultipliers[featureName][level] : featureMultipliers[featureName];
                    bonusPrice = level ? Math.ceil(featureMultiplier / baseBet * _bet) : Math.ceil(featureMultiplier / baseBet * _bet);
                  }
                }
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_FINISHED, _objectSpread(_objectSpread({
                  Type: featureName
                }, revenueData), {}, {
                  $profit: +((bonusPrice - spinData.gameTotalWin) * revenueData.rate / this.game.data.currencyDivider).toFixed(5)
                }));
                isNeedToSendSpinAction = false;
              }
              if (isNeedToSendSpinAction) {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SPIN_STARTED, data);
              }
              if (spinData !== null && spinData !== void 0 && spinData.isAutoSpin) {
                if (this.isAutoSpinInProgress && this.game.data.autospinsCount === 0 && !this.game.data.autospinsCountInfinity) {
                  this._handleAutoSpinsStop("Finished");
                }
              } else if (this.isAutoSpinInProgress) {
                this._handleAutoSpinsStop("Unknown");
              }
            }
          }, {
            key: "_handleButtonClick",
            value: function _handleButtonClick(buttonName, data) {
              var _this2 = this;
              if (buttonName === "mute-button-on") {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_ON);
              } else if (buttonName === "mute-button-off") {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.ALL_SOUNDS_OFF);
              } else if (buttonName === "settings-music") {
                Promise.resolve().then(function() {
                  _this2.sendAction(_this2.game.Sound.musicEnabled ? _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MUSIC_ON : _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.MUSIC_OFF);
                });
              } else if (buttonName === "settings-fx") {
                Promise.resolve().then(function() {
                  _this2.sendAction(_this2.game.Sound.soundEnabled ? _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SOUND_FX_ON : _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SOUND_FX_OFF);
                });
              } else if (buttonName === "settings-quick-spin" || buttonName === "quick-spin-check") {
                this._scheduleOptionsTrack("quickSpin", _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_MODE_ENABLED, _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.QUICK_SPIN_MODE_DISABLED, {
                  Source: data === "pointerdown" ? "Settings" : data
                });
              } else if (buttonName === "bonus-btn" || buttonName === "buy-bonus-button") {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_SCREEN_SHOWN, {
                  Source: "Game"
                });
              } else if (buttonName === "buy-bonus-popup") {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_SCREEN_CLOSED);
              } else if (buttonName === "spin-button") {
                this.spinButtonClickType = data;
              } else if (buttonName === "left-hand-ui-button") {
                this._scheduleOptionsTrack("isLeftHandedUI", _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.LEFT_HAND_MODE_ENABLED, _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.LEFT_HAND_MODE_DISABLED);
              } else if (buttonName === "settings-spacebar-to-spin") {
                this._scheduleOptionsTrack("isSpaceBarToSpinEnabled", _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SPACEBAR_TO_SPIN_ENABLED, _common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SPACEBAR_TO_SPIN_DISABLED);
              } else if (buttonName === "home-button") {
                // this button handler is deprecated, use GO_HOME event instead
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.LOBBY, undefined, true);
              }
            }
          }, {
            key: "_handleCustomEvent",
            value: function _handleCustomEvent(eventData) {
              if (eventData.action === "Buy bonus popup closed" && eventData.label === "Bonus not purchased") {
                this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.BUY_BONUS_SCREEN_CLOSED);
              }
            }
          }, {
            key: "_handleSkinChange",
            value: function _handleSkinChange(targetSkin, source) {
              var _window$__OPTIONS__7, _window$__OPTIONS__8;
              var currentSkin = ((_window$__OPTIONS__7 = window.__OPTIONS__) === null || _window$__OPTIONS__7 === void 0 || (_window$__OPTIONS__7 = _window$__OPTIONS__7.ui) === null || _window$__OPTIONS__7 === void 0 ? void 0 : _window$__OPTIONS__7.applied_skin) || ((_window$__OPTIONS__8 = window.__OPTIONS__) === null || _window$__OPTIONS__8 === void 0 || (_window$__OPTIONS__8 = _window$__OPTIONS__8.ui) === null || _window$__OPTIONS__8 === void 0 ? void 0 : _window$__OPTIONS__8.skin);
              var data = {
                "Old value": currentSkin || "",
                "New value": targetSkin || ""
              };
              this.userProperties["Skin"] = targetSkin;
              source.isLocalSkin && this.overrideUserProperties();
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.SKIN_CHANGED, data, true);
            }
          }, {
            key: "_handleLinesCountChange",
            value: function _handleLinesCountChange(targetLinesCount) {
              var currentLinesCount = this.userProperties.get("Lines Count Mode");
              var data = {
                "Old value": currentLinesCount || "",
                "New value": targetLinesCount || ""
              };
              this.userProperties["Lines Count Mode"] = targetLinesCount;
              this.overrideUserProperties();
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.LINES_COUNT_SWITCHED, data, true);
            }
          }, {
            key: "_handleVolatilityChange",
            value: function _handleVolatilityChange(volatility, source) {
              var spinsBefore = source.spinsBefore,
                initVolatility = source.initVolatility;
              var data = {
                Volatility: volatility || "",
                "Spins before": spinsBefore || 0,
                Started: initVolatility || ""
              };
              this.userProperties["Volatility"] = volatility;
              this.overrideUserProperties();
              this.sendAction(_common_AnalyticsAction__WEBPACK_IMPORTED_MODULE_1__.AnalyticsAction.VOLATILITY_SWITCHED, data, true);
            }
          }, {
            key: "_scheduleOptionsTrack",
            value: function _scheduleOptionsTrack(optionsKey, actionOn, actionOff, actionData) {
              var _this3 = this;
              Promise.resolve().then(function() {
                var isEnabled = _this3.game.settings.getItem(optionsKey);
                _this3.sendAction(isEnabled ? actionOn : actionOff, actionData);
              });
            }
          }, {
            key: "_checkFeatures",
            value: function _checkFeatures(spinData) {
              var _spinData$gameFlow3, _spinData$gameFlow4, _spinData$gameFlow5;
              var activeFeatureName = (_spinData$gameFlow3 = spinData.gameFlow) === null || _spinData$gameFlow3 === void 0 || (_spinData$gameFlow3 = _spinData$gameFlow3.purchased_feature) === null || _spinData$gameFlow3 === void 0 ? void 0 : _spinData$gameFlow3.name;
              var command = (_spinData$gameFlow4 = spinData.gameFlow) === null || _spinData$gameFlow4 === void 0 ? void 0 : _spinData$gameFlow4.command;
              var state = (_spinData$gameFlow5 = spinData.gameFlow) === null || _spinData$gameFlow5 === void 0 ? void 0 : _spinData$gameFlow5.state;
              var isPurchasedRoundFinished = activeFeatureName && this.finishStates.includes(state) && this.buyFeatures.includes(activeFeatureName);
              var isFeatureStarted = !activeFeatureName && command === "spin" && this.gameFeatures.states.includes(state);
              var isFeatureFinished = !activeFeatureName && this.gameFeatures.commands.includes(command) && this.finishStates.includes(state);
              return {
                isPurchasedRoundFinished: isPurchasedRoundFinished,
                isFeatureStarted: isFeatureStarted,
                isFeatureFinished: isFeatureFinished
              };
            }
          }]);
        }();

        /***/
      }),

    /***/
    "./src/tracker/RudderStackGameTracker.js":
      /*!***********************************************!*\
        !*** ./src/tracker/RudderStackGameTracker.js ***!
        \***********************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          RudderStackGameTracker: () => ( /* binding */ RudderStackGameTracker)
          /* harmony export */
        });
        /* harmony import */
        var _rudderstack_analytics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! @rudderstack/analytics-js */ "../../node_modules/@rudderstack/analytics-js/dist/npm/modern/esm/index.mjs");
        /* harmony import */
        var _roundSeriesId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./roundSeriesId */ "./src/tracker/roundSeriesId.js");
        /* harmony import */
        var _common_const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../common/const */ "./src/common/const.js");

        function _typeof(o) {
          "@babel/helpers - typeof";
          return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
          } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, _typeof(o);
        }

        function _classCallCheck(a, n) {
          if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
        }

        function _defineProperties(e, r) {
          for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
          }
        }

        function _createClass(e, r, t) {
          return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
            writable: !1
          }), e;
        }

        function _defineProperty(e, r, t) {
          return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[r] = t, e;
        }

        function _toPropertyKey(t) {
          var i = _toPrimitive(t, "string");
          return "symbol" == _typeof(i) ? i : i + "";
        }

        function _toPrimitive(t, r) {
          if ("object" != _typeof(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var i = e.call(t, r || "default");
            if ("object" != _typeof(i)) return i;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === r ? String : Number)(t);
        }
        //import * as amplitude from '@amplitude/analytics-browser';



        var RudderStackGameTracker = /*#__PURE__*/ function() {
          function RudderStackGameTracker() {
            _classCallCheck(this, RudderStackGameTracker);
            _defineProperty(this, "analytics", new _rudderstack_analytics_js__WEBPACK_IMPORTED_MODULE_0__.RudderAnalytics());
            this.load();
          }
          return _createClass(RudderStackGameTracker, [{
            key: "load",
            value: function load() {
              this.analytics.load(_common_const__WEBPACK_IMPORTED_MODULE_2__.RUDDERSTACK_TRACK_ID, _common_const__WEBPACK_IMPORTED_MODULE_2__.RUDDERSTACK_API_URL, {
                integrations: {
                  All: false
                },
                plugins: [],
                storage: {
                  type: "memoryStorage"
                }
              });
              (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_1__.initializePlayerId)();
              (0, _roundSeriesId__WEBPACK_IMPORTED_MODULE_1__.createNewRoundSeriesId)();
            }
          }, {
            key: "track",
            value: function track(actionName, actionData) {
              this.analytics.track(actionName, actionData);
            }
          }, {
            key: "identify",
            value: function identify(userID, data) {
              this.analytics.identify(userID, data);
            }
          }]);
        }();

        /***/
      }),

    /***/
    "./src/tracker/roundSeriesId.js":
      /*!**************************************!*\
        !*** ./src/tracker/roundSeriesId.js ***!
        \**************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          clearRoundSeriesRefreshFlag: () => ( /* binding */ clearRoundSeriesRefreshFlag),
          /* harmony export */
          createNewRoundSeriesId: () => ( /* binding */ createNewRoundSeriesId),
          /* harmony export */
          getRoundSeriesState: () => ( /* binding */ getRoundSeriesState),
          /* harmony export */
          initializePlayerId: () => ( /* binding */ initializePlayerId),
          /* harmony export */
          requestRoundSeriesRefresh: () => ( /* binding */ requestRoundSeriesRefresh)
          /* harmony export */
        });
        // Состояние для отслеживания серии раундов
        var roundSeriesState = {
          playerId: null,
          needsRefresh: false
        };

        // Инициализация ID игрока из конфигурации
        var initializePlayerId = function initializePlayerId() {
          var options = window.__OPTIONS__;
          var loyaltyOptions = options === null || options === void 0 ? void 0 : options.loyalty_system_options;
          if (loyaltyOptions !== null && loyaltyOptions !== void 0 && loyaltyOptions.player_id) {
            roundSeriesState.playerId = loyaltyOptions.player_id;
          } else {
            console.warn("Can't find player_id in window.__OPTIONS__.loyalty_system_options");
            roundSeriesState.playerId = null;
          }
        };

        // Создание нового ID для серии раундов
        var createNewRoundSeriesId = function createNewRoundSeriesId() {
          var timestamp = Date.now();
          window.extraData = {
            round_series_id: timestamp
          };
        };

        // Запрос на обновление ID серии раундов
        var requestRoundSeriesRefresh = function requestRoundSeriesRefresh() {
          roundSeriesState.needsRefresh = true;
        };

        // Сброс флага обновления ID серии раундов
        var clearRoundSeriesRefreshFlag = function clearRoundSeriesRefreshFlag() {
          roundSeriesState.needsRefresh = false;
        };

        // Получение текущего состояния
        var getRoundSeriesState = function getRoundSeriesState() {
          return roundSeriesState;
        };

        /***/
      }),

    /***/
    "../../node_modules/dom-mutator/dist/dom-mutator.esm.js":
      /*!**************************************************************!*\
        !*** ../../node_modules/dom-mutator/dist/dom-mutator.esm.js ***!
        \**************************************************************/
      /***/
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          connectGlobalObserver: () => ( /* binding */ connectGlobalObserver),
          /* harmony export */
          "default": () => (__WEBPACK_DEFAULT_EXPORT__),
          /* harmony export */
          disconnectGlobalObserver: () => ( /* binding */ disconnectGlobalObserver),
          /* harmony export */
          validAttributeName: () => ( /* binding */ validAttributeName)
          /* harmony export */
        });
        var validAttributeName = /^[a-zA-Z:_][a-zA-Z0-9:_.-]*$/;
        var nullController = {
          revert: function revert() {}
        };
        var elements = /*#__PURE__*/ new Map();
        var mutations = /*#__PURE__*/ new Set();

        function getObserverInit(attr) {
          return attr === 'html' ? {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
          } : {
            childList: false,
            subtree: false,
            attributes: true,
            attributeFilter: [attr]
          };
        }

        function getElementRecord(element) {
          var record = elements.get(element);

          if (!record) {
            record = {
              element: element,
              attributes: {}
            };
            elements.set(element, record);
          }

          return record;
        }

        function createElementPropertyRecord(el, attr, getCurrentValue, setValue, mutationRunner) {
          var currentValue = getCurrentValue(el);
          var record = {
            isDirty: false,
            originalValue: currentValue,
            virtualValue: currentValue,
            mutations: [],
            el: el,
            observer: new MutationObserver(function() {
              var currentValue = getCurrentValue(el);
              if (currentValue === record.virtualValue) return;
              record.originalValue = currentValue;
              mutationRunner(record);
            }),
            mutationRunner: mutationRunner,
            setValue: setValue,
            getCurrentValue: getCurrentValue
          };
          record.observer.observe(el, getObserverInit(attr));
          return record;
        }

        function queueIfNeeded(val, record) {
          var currentVal = record.getCurrentValue(record.el);
          record.virtualValue = val;

          if (val && typeof val !== 'string') {
            if (!currentVal || val.parentNode !== currentVal.parentNode || val.insertBeforeNode !== currentVal.insertBeforeNode) {
              record.isDirty = true;
              queueDOMUpdates();
            }
          } else if (val !== currentVal) {
            record.isDirty = true;
            queueDOMUpdates();
          }
        }

        function htmlMutationRunner(record) {
          var val = record.originalValue;
          record.mutations.forEach(function(m) {
            return val = m.mutate(val);
          });
          queueIfNeeded(getTransformedHTML(val), record);
        }

        function classMutationRunner(record) {
          var val = new Set(record.originalValue.split(/\s+/).filter(Boolean));
          record.mutations.forEach(function(m) {
            return m.mutate(val);
          });
          queueIfNeeded(Array.from(val).filter(Boolean).join(' '), record);
        }

        function attrMutationRunner(record) {
          var val = record.originalValue;
          record.mutations.forEach(function(m) {
            return val = m.mutate(val);
          });
          queueIfNeeded(val, record);
        }

        function _loadDOMNodes(_ref) {
          var parentSelector = _ref.parentSelector,
            insertBeforeSelector = _ref.insertBeforeSelector;
          var parentNode = document.querySelector(parentSelector);
          if (!parentNode) return null;
          var insertBeforeNode = insertBeforeSelector ? document.querySelector(insertBeforeSelector) : null;
          if (insertBeforeSelector && !insertBeforeNode) return null;
          return {
            parentNode: parentNode,
            insertBeforeNode: insertBeforeNode
          };
        }

        function positionMutationRunner(record) {
          var val = record.originalValue;
          record.mutations.forEach(function(m) {
            var selectors = m.mutate();

            var newNodes = _loadDOMNodes(selectors);

            val = newNodes || val;
          });
          queueIfNeeded(val, record);
        }

        var getHTMLValue = function getHTMLValue(el) {
          return el.innerHTML;
        };

        var setHTMLValue = function setHTMLValue(el, value) {
          return el.innerHTML = value;
        };

        function getElementHTMLRecord(element) {
          var elementRecord = getElementRecord(element);

          if (!elementRecord.html) {
            elementRecord.html = createElementPropertyRecord(element, 'html', getHTMLValue, setHTMLValue, htmlMutationRunner);
          }

          return elementRecord.html;
        }

        var getElementPosition = function getElementPosition(el) {
          return {
            parentNode: el.parentElement,
            insertBeforeNode: el.nextElementSibling
          };
        };

        var setElementPosition = function setElementPosition(el, value) {
          value.parentNode.insertBefore(el, value.insertBeforeNode);
        };

        function getElementPositionRecord(element) {
          var elementRecord = getElementRecord(element);

          if (!elementRecord.position) {
            elementRecord.position = createElementPropertyRecord(element, 'position', getElementPosition, setElementPosition, positionMutationRunner);
          }

          return elementRecord.position;
        }

        var setClassValue = function setClassValue(el, val) {
          return val ? el.className = val : el.removeAttribute('class');
        };

        var getClassValue = function getClassValue(el) {
          return el.className;
        };

        function getElementClassRecord(el) {
          var elementRecord = getElementRecord(el);

          if (!elementRecord.classes) {
            elementRecord.classes = createElementPropertyRecord(el, 'class', getClassValue, setClassValue, classMutationRunner);
          }

          return elementRecord.classes;
        }

        var getAttrValue = function getAttrValue(attrName) {
          return function(el) {
            var _el$getAttribute;

            return (_el$getAttribute = el.getAttribute(attrName)) != null ? _el$getAttribute : null;
          };
        };

        var setAttrValue = function setAttrValue(attrName) {
          return function(el, val) {
            return val !== null ? el.setAttribute(attrName, val) : el.removeAttribute(attrName);
          };
        };

        function getElementAttributeRecord(el, attr) {
          var elementRecord = getElementRecord(el);

          if (!elementRecord.attributes[attr]) {
            elementRecord.attributes[attr] = createElementPropertyRecord(el, attr, getAttrValue(attr), setAttrValue(attr), attrMutationRunner);
          }

          return elementRecord.attributes[attr];
        }

        function deleteElementPropertyRecord(el, attr) {
          var element = elements.get(el);
          if (!element) return;

          if (attr === 'html') {
            var _element$html, _element$html$observe;

            (_element$html = element.html) == null ? void 0 : (_element$html$observe = _element$html.observer) == null ? void 0 : _element$html$observe.disconnect();
            delete element.html;
          } else if (attr === 'class') {
            var _element$classes, _element$classes$obse;

            (_element$classes = element.classes) == null ? void 0 : (_element$classes$obse = _element$classes.observer) == null ? void 0 : _element$classes$obse.disconnect();
            delete element.classes;
          } else if (attr === 'position') {
            var _element$position, _element$position$obs;

            (_element$position = element.position) == null ? void 0 : (_element$position$obs = _element$position.observer) == null ? void 0 : _element$position$obs.disconnect();
            delete element.position;
          } else {
            var _element$attributes, _element$attributes$a, _element$attributes$a2;

            (_element$attributes = element.attributes) == null ? void 0 : (_element$attributes$a = _element$attributes[attr]) == null ? void 0 : (_element$attributes$a2 = _element$attributes$a.observer) == null ? void 0 : _element$attributes$a2.disconnect();
            delete element.attributes[attr];
          }
        }

        var transformContainer;

        function getTransformedHTML(html) {
          if (!transformContainer) {
            transformContainer = document.createElement('div');
          }

          transformContainer.innerHTML = html;
          return transformContainer.innerHTML;
        }

        function setPropertyValue(el, attr, m) {
          if (!m.isDirty) return;
          m.isDirty = false;
          var val = m.virtualValue;

          if (!m.mutations.length) {
            deleteElementPropertyRecord(el, attr);
          }

          m.setValue(el, val);
        }

        var raf = false;

        function setValue(m, el) {
          m.html && setPropertyValue(el, 'html', m.html);
          m.classes && setPropertyValue(el, 'class', m.classes);
          m.position && setPropertyValue(el, 'position', m.position);
          Object.keys(m.attributes).forEach(function(attr) {
            setPropertyValue(el, attr, m.attributes[attr]);
          });
        }

        function setValues() {
          raf = false;
          elements.forEach(setValue);
        }

        function queueDOMUpdates() {
          if (!raf) {
            raf = true;
            requestAnimationFrame(setValues);
          }
        } // find or create ElementPropertyRecord, add mutation to it, then run


        function startMutating(mutation, element) {
          var record = null;

          if (mutation.kind === 'html') {
            record = getElementHTMLRecord(element);
          } else if (mutation.kind === 'class') {
            record = getElementClassRecord(element);
          } else if (mutation.kind === 'attribute') {
            record = getElementAttributeRecord(element, mutation.attribute);
          } else if (mutation.kind === 'position') {
            record = getElementPositionRecord(element);
          }

          if (!record) return;
          record.mutations.push(mutation);
          record.mutationRunner(record);
        } // get (existing) ElementPropertyRecord, remove mutation from it, then run


        function stopMutating(mutation, el) {
          var record = null;

          if (mutation.kind === 'html') {
            record = getElementHTMLRecord(el);
          } else if (mutation.kind === 'class') {
            record = getElementClassRecord(el);
          } else if (mutation.kind === 'attribute') {
            record = getElementAttributeRecord(el, mutation.attribute);
          } else if (mutation.kind === 'position') {
            record = getElementPositionRecord(el);
          }

          if (!record) return;
          var index = record.mutations.indexOf(mutation);
          if (index !== -1) record.mutations.splice(index, 1);
          record.mutationRunner(record);
        } // maintain list of elements associated with mutation


        function refreshElementsSet(mutation) {
          var existingElements = new Set(mutation.elements);
          var newElements = new Set();
          var matchingElements = document.querySelectorAll(mutation.selector);
          matchingElements.forEach(function(el) {
            newElements.add(el);

            if (!existingElements.has(el)) {
              mutation.elements.add(el);
              startMutating(mutation, el);
            }
          });
          existingElements.forEach(function(el) {
            if (!newElements.has(el)) {
              mutation.elements["delete"](el);
              stopMutating(mutation, el);
            }
          });
        }

        function revertMutation(mutation) {
          mutation.elements.forEach(function(el) {
            return stopMutating(mutation, el);
          });
          mutation.elements.clear();
          mutations["delete"](mutation);
        }

        function refreshAllElementSets() {
          mutations.forEach(refreshElementsSet);
        } // Observer for elements that don't exist in the DOM yet


        var observer;

        function disconnectGlobalObserver() {
          observer && observer.disconnect();
        }

        function connectGlobalObserver() {
          if (typeof document === 'undefined') return;

          if (!observer) {
            observer = new MutationObserver(function() {
              refreshAllElementSets();
            });
          }

          refreshAllElementSets();
          observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
          });
        } // run on init

        connectGlobalObserver();

        function newMutation(m) {
          // Not in a browser
          if (typeof document === 'undefined') return nullController; // add to global index of mutations

          mutations.add(m); // run refresh on init to establish list of elements associated w/ mutation

          refreshElementsSet(m);
          return {
            revert: function revert() {
              revertMutation(m);
            }
          };
        }

        function html(selector, mutate) {
          return newMutation({
            kind: 'html',
            elements: new Set(),
            mutate: mutate,
            selector: selector
          });
        }

        function position(selector, mutate) {
          return newMutation({
            kind: 'position',
            elements: new Set(),
            mutate: mutate,
            selector: selector
          });
        }

        function classes(selector, mutate) {
          return newMutation({
            kind: 'class',
            elements: new Set(),
            mutate: mutate,
            selector: selector
          });
        }

        function attribute(selector, attribute, mutate) {
          if (!validAttributeName.test(attribute)) return nullController;

          if (attribute === 'class' || attribute === 'className') {
            return classes(selector, function(classnames) {
              var mutatedClassnames = mutate(Array.from(classnames).join(' '));
              classnames.clear();
              if (!mutatedClassnames) return;
              mutatedClassnames.split(/\s+/g).filter(Boolean).forEach(function(c) {
                return classnames.add(c);
              });
            });
          }

          return newMutation({
            kind: 'attribute',
            attribute: attribute,
            elements: new Set(),
            mutate: mutate,
            selector: selector
          });
        }

        function declarative(_ref2) {
          var selector = _ref2.selector,
            action = _ref2.action,
            value = _ref2.value,
            attr = _ref2.attribute,
            parentSelector = _ref2.parentSelector,
            insertBeforeSelector = _ref2.insertBeforeSelector;

          if (attr === 'html') {
            if (action === 'append') {
              return html(selector, function(val) {
                return val + (value != null ? value : '');
              });
            } else if (action === 'set') {
              return html(selector, function() {
                return value != null ? value : '';
              });
            }
          } else if (attr === 'class') {
            if (action === 'append') {
              return classes(selector, function(val) {
                if (value) val.add(value);
              });
            } else if (action === 'remove') {
              return classes(selector, function(val) {
                if (value) val["delete"](value);
              });
            } else if (action === 'set') {
              return classes(selector, function(val) {
                val.clear();
                if (value) val.add(value);
              });
            }
          } else if (attr === 'position') {
            if (action === 'set' && parentSelector) {
              return position(selector, function() {
                return {
                  insertBeforeSelector: insertBeforeSelector,
                  parentSelector: parentSelector
                };
              });
            }
          } else {
            if (action === 'append') {
              return attribute(selector, attr, function(val) {
                return val !== null ? val + (value != null ? value : '') : value != null ? value : '';
              });
            } else if (action === 'set') {
              return attribute(selector, attr, function() {
                return value != null ? value : '';
              });
            } else if (action === 'remove') {
              return attribute(selector, attr, function() {
                return null;
              });
            }
          }

          return nullController;
        }

        var index = {
          html: html,
          classes: classes,
          attribute: attribute,
          position: position,
          declarative: declarative
        };

        /* harmony default export */
        const __WEBPACK_DEFAULT_EXPORT__ = (index);

        //# sourceMappingURL=dom-mutator.esm.js.map


        /***/
      }),

    /***/
    "../../node_modules/@rudderstack/analytics-js/dist/npm/modern/esm/index.mjs":
      /*!**********************************************************************************!*\
        !*** ../../node_modules/@rudderstack/analytics-js/dist/npm/modern/esm/index.mjs ***!
        \**********************************************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          RudderAnalytics: () => ( /* binding */ RudderAnalytics)
          /* harmony export */
        });

        function _isPlaceholder(a) {
          return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
        }

        /**
         * Optimized internal one-arity curry function.
         *
         * @private
         * @category Function
         * @param {Function} fn The function to curry.
         * @return {Function} The curried function.
         */
        function _curry1(fn) {
          return function f1(a) {
            if (arguments.length === 0 || _isPlaceholder(a)) {
              return f1;
            } else {
              return fn.apply(this, arguments);
            }
          };
        }

        /**
         * Optimized internal two-arity curry function.
         *
         * @private
         * @category Function
         * @param {Function} fn The function to curry.
         * @return {Function} The curried function.
         */
        function _curry2(fn) {
          return function f2(a, b) {
            switch (arguments.length) {
              case 0:
                return f2;
              case 1:
                return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
                  return fn(a, _b);
                });
              default:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
                  return fn(_a, b);
                }) : _isPlaceholder(b) ? _curry1(function(_b) {
                  return fn(a, _b);
                }) : fn(a, b);
            }
          };
        }

        /**
         * Optimized internal three-arity curry function.
         *
         * @private
         * @category Function
         * @param {Function} fn The function to curry.
         * @return {Function} The curried function.
         */
        function _curry3(fn) {
          return function f3(a, b, c) {
            switch (arguments.length) {
              case 0:
                return f3;
              case 1:
                return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
                  return fn(a, _b, _c);
                });
              case 2:
                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
                  return fn(_a, b, _c);
                }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
                  return fn(a, _b, _c);
                }) : _curry1(function(_c) {
                  return fn(a, b, _c);
                });
              default:
                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
                  return fn(_a, _b, c);
                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
                  return fn(_a, b, _c);
                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
                  return fn(a, _b, _c);
                }) : _isPlaceholder(a) ? _curry1(function(_a) {
                  return fn(_a, b, c);
                }) : _isPlaceholder(b) ? _curry1(function(_b) {
                  return fn(a, _b, c);
                }) : _isPlaceholder(c) ? _curry1(function(_c) {
                  return fn(a, b, _c);
                }) : fn(a, b, c);
            }
          };
        }

        function _has(prop, obj) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }

        /**
         * Gives a single-word string description of the (native) type of a value,
         * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
         * attempt to distinguish user Object types any further, reporting them all as
         * 'Object'.
         *
         * @func
         * @memberOf R
         * @since v0.8.0
         * @category Type
         * @sig * -> String
         * @param {*} val The value to test
         * @return {String}
         * @example
         *
         *      R.type({}); //=> "Object"
         *      R.type(1); //=> "Number"
         *      R.type(false); //=> "Boolean"
         *      R.type('s'); //=> "String"
         *      R.type(null); //=> "Null"
         *      R.type([]); //=> "Array"
         *      R.type(/[A-z]/); //=> "RegExp"
         *      R.type(() => {}); //=> "Function"
         *      R.type(async () => {}); //=> "AsyncFunction"
         *      R.type(undefined); //=> "Undefined"
         *      R.type(BigInt(123)); //=> "BigInt"
         */
        var type = /*#__PURE__*/ _curry1(function type(val) {
          return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
        });

        function _isObject(x) {
          return Object.prototype.toString.call(x) === '[object Object]';
        }

        /**
         * Determine if the passed argument is an integer.
         *
         * @private
         * @param {*} n
         * @category Type
         * @return {Boolean}
         */
        const _isInteger = Number.isInteger || function _isInteger(n) {
          return n << 0 === n;
        };

        function _isString(x) {
          return Object.prototype.toString.call(x) === '[object String]';
        }

        function _nth(offset, list) {
          var idx = offset < 0 ? list.length + offset : offset;
          return _isString(list) ? list.charAt(idx) : list[idx];
        }

        function _cloneRegExp(pattern) {
          return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : '') + (pattern.dotAll ? 's' : ''));
        }

        /**
         * Copies an object.
         *
         * @private
         * @param {*} value The value to be copied
         * @param {Boolean} deep Whether or not to perform deep cloning.
         * @return {*} The copied value.
         */
        function _clone(value, deep, map) {
          map || (map = new _ObjectMap()); // this avoids the slower switch with a quick if decision removing some milliseconds in each run.
          if (_isPrimitive(value)) {
            return value;
          }
          var copy = function copy(copiedValue) { // Check for circular and same references on the object graph and return its corresponding clone.
            var cachedCopy = map.get(value);
            if (cachedCopy) {
              return cachedCopy;
            }
            map.set(value, copiedValue);
            for (var key in value) {
              if (Object.prototype.hasOwnProperty.call(value, key)) {
                copiedValue[key] = _clone(value[key], true, map);
              }
            }
            return copiedValue;
          };
          switch (type(value)) {
            case 'Object':
              return copy(Object.create(Object.getPrototypeOf(value)));
            case 'Array':
              return copy(Array(value.length));
            case 'Date':
              return new Date(value.valueOf());
            case 'RegExp':
              return _cloneRegExp(value);
            case 'Int8Array':
            case 'Uint8Array':
            case 'Uint8ClampedArray':
            case 'Int16Array':
            case 'Uint16Array':
            case 'Int32Array':
            case 'Uint32Array':
            case 'Float32Array':
            case 'Float64Array':
            case 'BigInt64Array':
            case 'BigUint64Array':
              return value.slice();
            default:
              return value;
          }
        }

        function _isPrimitive(param) {
          var type = typeof param;
          return param == null || type != 'object' && type != 'function';
        }
        var _ObjectMap = /*#__PURE__*/ function() {
          function _ObjectMap() {
            this.map = {};
            this.length = 0;
          }
          _ObjectMap.prototype.set = function(key, value) {
            var hashedKey = this.hash(key);
            var bucket = this.map[hashedKey];
            if (!bucket) {
              this.map[hashedKey] = bucket = [];
            }
            bucket.push([key, value]);
            this.length += 1;
          };
          _ObjectMap.prototype.hash = function(key) {
            var hashedKey = [];
            for (var value in key) {
              hashedKey.push(Object.prototype.toString.call(key[value]));
            }
            return hashedKey.join();
          };
          _ObjectMap.prototype.get = function(key) {
            /**
             * depending on the number of objects to be cloned is faster to just iterate over the items in the map just because the hash function is so costly,
             * on my tests this number is 180, anything above that using the hash function is faster.
             */
            if (this.length <= 180) {
              for (var p in this.map) {
                var bucket = this.map[p];
                for (var i = 0; i < bucket.length; i += 1) {
                  var element = bucket[i];
                  if (element[0] === key) {
                    return element[1];
                  }
                }
              }
              return;
            }
            var hashedKey = this.hash(key);
            var bucket = this.map[hashedKey];
            if (!bucket) {
              return;
            }
            for (var i = 0; i < bucket.length; i += 1) {
              var element = bucket[i];
              if (element[0] === key) {
                return element[1];
              }
            }
          };
          return _ObjectMap;
        }();

        /**
         * Creates a deep copy of the source that can be used in place of the source
         * object without retaining any references to it.
         * The source object may contain (nested) `Array`s and `Object`s,
         * `Number`s, `String`s, `Boolean`s and `Date`s.
         * `Function`s are assigned by reference rather than copied.
         *
         * Dispatches to a `clone` method if present.
         *
         * Note that if the source object has multiple nodes that share a reference,
         * the returned object will have the same structure, but the references will
         * be pointed to the location within the cloned value.
         *
         * @func
         * @memberOf R
         * @since v0.1.0
         * @category Object
         * @sig {*} -> {*}
         * @param {*} value The object or array to clone
         * @return {*} A deeply cloned copy of `val`
         * @example
         *
         *      const objects = [{}, {}, {}];
         *      const objectsClone = R.clone(objects);
         *      objects === objectsClone; //=> false
         *      objects[0] === objectsClone[0]; //=> false
         */
        var clone = /*#__PURE__*/ _curry1(function clone(value) {
          return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value);
        });

        function _path(pathAr, obj) {
          var val = obj;
          for (var i = 0; i < pathAr.length; i += 1) {
            if (val == null) {
              return undefined;
            }
            var p = pathAr[i];
            if (_isInteger(p)) {
              val = _nth(p, val);
            } else {
              val = val[p];
            }
          }
          return val;
        }

        /**
         * Creates a new object with the own properties of the two provided objects. If
         * a key exists in both objects, the provided function is applied to the key
         * and the values associated with the key in each object, with the result being
         * used as the value associated with the key in the returned object.
         *
         * @func
         * @memberOf R
         * @since v0.19.0
         * @category Object
         * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
         * @param {Function} fn
         * @param {Object} l
         * @param {Object} r
         * @return {Object}
         * @see R.mergeDeepWithKey, R.merge, R.mergeWith
         * @example
         *
         *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
         *      R.mergeWithKey(concatValues,
         *                     { a: true, thing: 'foo', values: [10, 20] },
         *                     { b: true, thing: 'bar', values: [15, 35] });
         *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
         * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
         */
        var mergeWithKey = /*#__PURE__*/ _curry3(function mergeWithKey(fn, l, r) {
          var result = {};
          var k;
          l = l || {};
          r = r || {};
          for (k in l) {
            if (_has(k, l)) {
              result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
            }
          }
          for (k in r) {
            if (_has(k, r) && !_has(k, result)) {
              result[k] = r[k];
            }
          }
          return result;
        });

        /**
         * Creates a new object with the own properties of the two provided objects.
         * If a key exists in both objects:
         * - and both associated values are also objects then the values will be
         *   recursively merged.
         * - otherwise the provided function is applied to the key and associated values
         *   using the resulting value as the new value associated with the key.
         * If a key only exists in one object, the value will be associated with the key
         * of the resulting object.
         *
         * @func
         * @memberOf R
         * @since v0.24.0
         * @category Object
         * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
         * @param {Function} fn
         * @param {Object} lObj
         * @param {Object} rObj
         * @return {Object}
         * @see R.mergeWithKey, R.mergeDeepWith
         * @example
         *
         *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
         *      R.mergeDeepWithKey(concatValues,
         *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
         *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
         *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
         */
        var mergeDeepWithKey = /*#__PURE__*/ _curry3(function mergeDeepWithKey(fn, lObj, rObj) {
          return mergeWithKey(function(k, lVal, rVal) {
            if (_isObject(lVal) && _isObject(rVal)) {
              return mergeDeepWithKey(fn, lVal, rVal);
            } else {
              return fn(k, lVal, rVal);
            }
          }, lObj, rObj);
        });

        /**
         * Creates a new object with the own properties of the two provided objects.
         * If a key exists in both objects:
         * - and both associated values are also objects then the values will be
         *   recursively merged.
         * - otherwise the provided function is applied to associated values using the
         *   resulting value as the new value associated with the key.
         * If a key only exists in one object, the value will be associated with the key
         * of the resulting object.
         *
         * @func
         * @memberOf R
         * @since v0.24.0
         * @category Object
         * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
         * @param {Function} fn
         * @param {Object} lObj
         * @param {Object} rObj
         * @return {Object}
         * @see R.mergeWith, R.mergeDeepWithKey
         * @example
         *
         *      R.mergeDeepWith(R.concat,
         *                      { a: true, c: { values: [10, 20] }},
         *                      { b: true, c: { values: [15, 35] }});
         *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
         */
        var mergeDeepWith = /*#__PURE__*/ _curry3(function mergeDeepWith(fn, lObj, rObj) {
          return mergeDeepWithKey(function(k, lVal, rVal) {
            return fn(lVal, rVal);
          }, lObj, rObj);
        });

        /**
         * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
         * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
         *
         * @func
         * @memberOf R
         * @since v0.2.0
         * @category Object
         * @typedefn Idx = String | Int | Symbol
         * @sig [Idx] -> {a} -> a | Undefined
         * @sig Idx = String | NonNegativeInt
         * @param {Array} path The path to use.
         * @param {Object} obj The object or array to retrieve the nested property from.
         * @return {*} The data at `path`.
         * @see R.prop, R.nth, R.assocPath, R.dissocPath
         * @example
         *
         *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
         *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
         *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
         *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
         *      R.path([2], {'2': 2}); //=> 2
         *      R.path([-2], {'-2': 'a'}); //=> undefined
         */
        var path = /*#__PURE__*/ _curry2(_path);

        /**
         * Returns a partial copy of an object containing only the keys that satisfy
         * the supplied predicate.
         *
         * @func
         * @memberOf R
         * @since v0.8.0
         * @category Object
         * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
         * @param {Function} pred A predicate to determine whether or not a key
         *        should be included on the output object.
         * @param {Object} obj The object to copy from
         * @return {Object} A new object with only properties that satisfy `pred`
         *         on it.
         * @see R.pick, R.filter
         * @example
         *
         *      const isUpperCase = (val, key) => key.toUpperCase() === key;
         *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
         */
        var pickBy = /*#__PURE__*/ _curry2(function pickBy(test, obj) {
          var result = {};
          for (var prop in obj) {
            if (test(obj[prop], prop, obj)) {
              result[prop] = obj[prop];
            }
          }
          return result;
        });

        /**
         * A function to check given value is a function
         * @param value input value
         * @returns boolean
         */ // eslint-disable-next-line @typescript-eslint/ban-types
        const isFunction = value => typeof value === 'function' && Boolean(value.constructor && value.call && value.apply);
        /**
         * A function to check given value is a string
         * @param value input value
         * @returns boolean
         */
        const isString = value => typeof value === 'string';
        /**
         * A function to check given value is null or not
         * @param value input value
         * @returns boolean
         */
        const isNull = value => value === null;
        /**
         * A function to check given value is undefined
         * @param value input value
         * @returns boolean
         */
        const isUndefined = value => typeof value === 'undefined';
        /**
         * A function to check given value is null or undefined
         * @param value input value
         * @returns boolean
         */
        const isNullOrUndefined = value => isNull(value) || isUndefined(value);
        /**
         * Checks if the input is a BigInt
         * @param value input value
         * @returns True if the input is a BigInt
         */
        const isBigInt = value => typeof value === 'bigint';
        /**
         * A function to check given value is defined
         * @param value input value
         * @returns boolean
         */
        const isDefined = value => !isUndefined(value);
        /**
         * A function to check given value is defined and not null
         * @param value input value
         * @returns boolean
         */
        const isDefinedAndNotNull = value => !isNullOrUndefined(value);
        /**
         * A function to check given value is defined and not null
         * @param value input value
         * @returns boolean
         */
        const isDefinedNotNullAndNotEmptyString = value => isDefinedAndNotNull(value) && value !== '';
        /**
         * Determines if the input is an instance of Error
         * @param obj input value
         * @returns true if the input is an instance of Error and false otherwise
         */
        const isTypeOfError = obj => obj instanceof Error;

        const getValueByPath = (obj, keyPath) => {
          const pathParts = keyPath.split('.');
          return path(pathParts, obj);
        };
        const hasValueByPath = (obj, path) => Boolean(getValueByPath(obj, path));
        const isObject = value => typeof value === 'object';
        /**
         * Checks if the input is an object literal or built-in object type and not null
         * @param value Input value
         * @returns true if the input is an object and not null
         */
        const isObjectAndNotNull = value => !isNull(value) && isObject(value) && !Array.isArray(value);
        /**
         * Checks if the input is an object literal and not null
         * @param value Input value
         * @returns true if the input is an object and not null
         */
        const isObjectLiteralAndNotNull = value => !isNull(value) && Object.prototype.toString.call(value) === '[object Object]';
        const mergeDeepRightObjectArrays = (leftValue, rightValue) => {
          if (!Array.isArray(leftValue) || !Array.isArray(rightValue)) {
            return clone(rightValue);
          }
          const mergedArray = clone(leftValue);
          rightValue.forEach((value, index) => {
            mergedArray[index] = Array.isArray(value) || isObjectAndNotNull(value) ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
              mergeDeepRight(mergedArray[index], value) : value;
          });
          return mergedArray;
        };
        const mergeDeepRight = (leftObject, rightObject) => mergeDeepWith(mergeDeepRightObjectArrays, leftObject, rightObject);
        /**
         Checks if the input is a non-empty object literal type and not undefined or null
         * @param value input any
         * @returns boolean
         */
        const isNonEmptyObject = value => isObjectLiteralAndNotNull(value) && Object.keys(value).length > 0;
        /**
         * A utility to recursively remove undefined values from an object
         * @param obj input object
         * @returns a new object
         */
        const removeUndefinedValues = obj => {
          const result = pickBy(isDefined, obj);
          Object.keys(result).forEach(key => {
            const value = result[key];
            if (isObjectLiteralAndNotNull(value)) {
              result[key] = removeUndefinedValues(value);
            }
          });
          return result;
        };
        /**
         * A utility to recursively remove undefined and null values from an object
         * @param obj input object
         * @returns a new object
         */
        const removeUndefinedAndNullValues = obj => {
          const result = pickBy(isDefinedAndNotNull, obj);
          Object.keys(result).forEach(key => {
            const value = result[key];
            if (isObjectLiteralAndNotNull(value)) {
              result[key] = removeUndefinedAndNullValues(value);
            }
          });
          return result;
        };

        const trim = value => value.replace(/^\s+|\s+$/gm, '');
        const removeDoubleSpaces = value => value.replace(/ {2,}/g, ' ');
        const removeLeadingPeriod = value => value.replace(/^\.+/, '');
        /**
         * A function to convert values to string
         * @param val input value
         * @returns stringified value
         */
        const tryStringify = val => {
          let retVal = val;
          if (!isString(val) && !isNullOrUndefined(val)) {
            try {
              retVal = JSON.stringify(val);
            } catch (e) {
              retVal = null;
            }
          }
          return retVal;
        }; // The following text encoding and decoding is done before base64 encoding to prevent
        /**
         * Converts a bytes array to base64 encoded string
         * @param bytes bytes array to be converted to base64
         * @returns base64 encoded string
         */
        const bytesToBase64 = bytes => {
          const binString = Array.from(bytes, x => String.fromCodePoint(x)).join('');
          return globalThis.btoa(binString);
        };
        /**
         * Encodes a string to base64 even with unicode characters
         * @param value input string
         * @returns base64 encoded string
         */
        const toBase64 = value => bytesToBase64(new TextEncoder().encode(value));

        //   if yes make them null instead of omitting in overloaded cases
        /*
         * Normalise the overloaded arguments of the page call facade
         */
        const pageArgumentsToCallOptions = (category, name, properties, options, callback) => {
          const payload = {
            category: category,
            name: name,
            properties: properties,
            options: options,
            callback: undefined
          };
          if (isFunction(callback)) {
            payload.callback = callback;
          }
          if (isFunction(options)) {
            payload.category = category;
            payload.name = name;
            payload.properties = properties;
            payload.options = undefined;
            payload.callback = options;
          }
          if (isFunction(properties)) {
            payload.category = category;
            payload.name = name;
            payload.properties = undefined;
            payload.options = undefined;
            payload.callback = properties;
          }
          if (isFunction(name)) {
            payload.category = category;
            payload.name = undefined;
            payload.properties = undefined;
            payload.options = undefined;
            payload.callback = name;
          }
          if (isFunction(category)) {
            payload.category = undefined;
            payload.name = undefined;
            payload.properties = undefined;
            payload.options = undefined;
            payload.callback = category;
          }
          if (isObjectLiteralAndNotNull(category)) {
            payload.name = undefined;
            payload.category = undefined;
            payload.properties = category;
            if (!isFunction(name)) {
              payload.options = name;
            } else {
              payload.options = undefined;
            }
          } else if (isObjectLiteralAndNotNull(name)) {
            payload.name = undefined;
            payload.properties = name;
            if (!isFunction(properties)) {
              payload.options = properties;
            } else {
              payload.options = undefined;
            }
          } // if the category argument alone is provided b/w category and name,
          // use it as name and set category to undefined
          if (isString(category) && !isString(name)) {
            payload.category = undefined;
            payload.name = category;
          } // Rest of the code is just to clean up undefined values
          // and set some proper defaults
          // Also, to clone the incoming object type arguments
          if (!isDefined(payload.category)) {
            payload.category = undefined;
          }
          if (!isDefined(payload.name)) {
            payload.name = undefined;
          }
          payload.properties = payload.properties ? clone(payload.properties) : {};
          if (isDefined(payload.options)) {
            payload.options = clone(payload.options);
          } else {
            payload.options = undefined;
          }
          const nameForProperties = isString(payload.name) ? payload.name : payload.properties.name;
          const categoryForProperties = isString(payload.category) ? payload.category : payload.properties.category; // add name and category to properties
          payload.properties = mergeDeepRight(isObjectLiteralAndNotNull(payload.properties) ? payload.properties : {}, {
            ...(nameForProperties && {
              name: nameForProperties
            }),
            ...(categoryForProperties && {
              category: categoryForProperties
            })
          });
          return payload;
        };
        /*
         * Normalise the overloaded arguments of the track call facade
         */
        const trackArgumentsToCallOptions = (event, properties, options, callback) => {
          const payload = {
            name: event,
            properties: properties,
            options: options,
            callback: undefined
          };
          if (isFunction(callback)) {
            payload.callback = callback;
          }
          if (isFunction(options)) {
            payload.properties = properties;
            payload.options = undefined;
            payload.callback = options;
          }
          if (isFunction(properties)) {
            payload.properties = undefined;
            payload.options = undefined;
            payload.callback = properties;
          } // Rest of the code is just to clean up undefined values
          // and set some proper defaults
          // Also, to clone the incoming object type arguments
          payload.properties = isDefinedAndNotNull(payload.properties) ? clone(payload.properties) : {};
          if (isDefined(payload.options)) {
            payload.options = clone(payload.options);
          } else {
            payload.options = undefined;
          }
          return payload;
        };
        /*
         * Normalise the overloaded arguments of the identify call facade
         */
        const identifyArgumentsToCallOptions = (userId, traits, options, callback) => {
          const payload = {
            userId: userId,
            traits: traits,
            options: options,
            callback: undefined
          };
          if (isFunction(callback)) {
            payload.callback = callback;
          }
          if (isFunction(options)) {
            payload.userId = userId;
            payload.traits = traits;
            payload.options = undefined;
            payload.callback = options;
          }
          if (isFunction(traits)) {
            payload.userId = userId;
            payload.traits = undefined;
            payload.options = undefined;
            payload.callback = traits;
          }
          if (isObjectLiteralAndNotNull(userId) || isNull(userId)) { // Explicitly set null to prevent resetting the existing value
            // in the Analytics class
            payload.userId = null;
            payload.traits = userId;
            if (!isFunction(traits)) {
              payload.options = traits;
            } else {
              payload.options = undefined;
            }
          } // Rest of the code is just to clean up undefined values
          // and set some proper defaults
          // Also, to clone the incoming object type arguments
          payload.userId = tryStringify(payload.userId);
          if (isObjectLiteralAndNotNull(payload.traits)) {
            payload.traits = clone(payload.traits);
          } else {
            payload.traits = undefined;
          }
          if (isDefined(payload.options)) {
            payload.options = clone(payload.options);
          } else {
            payload.options = undefined;
          }
          return payload;
        };
        /*
         * Normalise the overloaded arguments of the alias call facade
         */
        const aliasArgumentsToCallOptions = (to, from, options, callback) => {
          const payload = {
            to,
            from: from,
            options: options,
            callback: undefined
          };
          if (isFunction(callback)) {
            payload.callback = callback;
          }
          if (isFunction(options)) {
            payload.to = to;
            payload.from = from;
            payload.options = undefined;
            payload.callback = options;
          }
          if (isFunction(from)) {
            payload.to = to;
            payload.from = undefined;
            payload.options = undefined;
            payload.callback = from;
          } else if (isObjectLiteralAndNotNull(from) || isNull(from)) {
            payload.to = to;
            payload.from = undefined;
            payload.options = from;
          } // Rest of the code is just to clean up undefined values
          // and set some proper defaults
          // Also, to clone the incoming object type arguments
          if (isDefined(payload.to)) {
            payload.to = tryStringify(payload.to);
          }
          if (isDefined(payload.from)) {
            payload.from = tryStringify(payload.from);
          } else {
            payload.from = undefined;
          }
          if (isDefined(payload.options)) {
            payload.options = clone(payload.options);
          } else {
            payload.options = undefined;
          }
          return payload;
        };
        /*
         * Normalise the overloaded arguments of the group call facade
         */
        const groupArgumentsToCallOptions = (groupId, traits, options, callback) => {
          const payload = {
            groupId: groupId,
            traits: traits,
            options: options,
            callback: undefined
          };
          if (isFunction(callback)) {
            payload.callback = callback;
          }
          if (isFunction(options)) {
            payload.groupId = groupId;
            payload.traits = traits;
            payload.options = undefined;
            payload.callback = options;
          }
          if (isFunction(traits)) {
            payload.groupId = groupId;
            payload.traits = undefined;
            payload.options = undefined;
            payload.callback = traits;
          }
          if (isObjectLiteralAndNotNull(groupId) || isNull(groupId)) { // Explicitly set null to prevent resetting the existing value
            // in the Analytics class
            payload.groupId = null;
            payload.traits = groupId;
            if (!isFunction(traits)) {
              payload.options = traits;
            } else {
              payload.options = undefined;
            }
          } // Rest of the code is just to clean up undefined values
          // and set some proper defaults
          // Also, to clone the incoming object type arguments
          payload.groupId = tryStringify(payload.groupId);
          if (isObjectLiteralAndNotNull(payload.traits)) {
            payload.traits = clone(payload.traits);
          } else {
            payload.traits = undefined;
          }
          if (isDefined(payload.options)) {
            payload.options = clone(payload.options);
          } else {
            payload.options = undefined;
          }
          return payload;
        };

        /**
         * Represents the options parameter for anonymousId
         */
        /**
         * Represents the beacon queue options parameter in loadOptions type
         */
        /**
         * Represents the queue options parameter in loadOptions type
         */
        /**
         * Represents the destinations queue options parameter in loadOptions type
         */
        let PageLifecycleEvents = /*#__PURE__*/ function(PageLifecycleEvents) {
          PageLifecycleEvents["LOADED"] = "Page Loaded";
          PageLifecycleEvents["UNLOADED"] = "Page Unloaded";
          return PageLifecycleEvents;
        }({});
        /**
         * Represents the options parameter in the load API
         */

        const CAPABILITIES_MANAGER = 'CapabilitiesManager';
        const CONFIG_MANAGER = 'ConfigManager';
        const EVENT_MANAGER = 'EventManager';
        const PLUGINS_MANAGER = 'PluginsManager';
        const USER_SESSION_MANAGER = 'UserSessionManager';
        const ERROR_HANDLER = 'ErrorHandler';
        const PLUGIN_ENGINE = 'PluginEngine';
        const STORE_MANAGER = 'StoreManager';
        const READY_API = 'readyApi';
        const EVENT_REPOSITORY = 'EventRepository';
        const EXTERNAL_SRC_LOADER = 'ExternalSrcLoader';
        const HTTP_CLIENT = 'HttpClient';
        const RSA = 'RudderStackAnalytics';
        const ANALYTICS_CORE = 'AnalyticsCore';

        function random(len) {
          return crypto.getRandomValues(new Uint8Array(len));
        }

        var SIZE = 4096,
          HEX$1 = [],
          IDX$1 = 0,
          BUFFER$1;
        for (; IDX$1 < 256; IDX$1++) {
          HEX$1[IDX$1] = (IDX$1 + 256).toString(16).substring(1);
        }

        function v4$1() {
          if (!BUFFER$1 || IDX$1 + 16 > SIZE) {
            BUFFER$1 = random(SIZE);
            IDX$1 = 0;
          }
          var i = 0,
            tmp, out = '';
          for (; i < 16; i++) {
            tmp = BUFFER$1[IDX$1 + i];
            if (i == 6) out += HEX$1[tmp & 15 | 64];
            else if (i == 8) out += HEX$1[tmp & 63 | 128];
            else out += HEX$1[tmp];
            if (i & 1 && i > 1 && i < 11) out += '-';
          }
          IDX$1 += 16;
          return out;
        }

        var IDX = 256,
          HEX = [],
          BUFFER;
        while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

        function v4() {
          var i = 0,
            num, out = '';
          if (!BUFFER || IDX + 16 > 256) {
            BUFFER = Array(i = 256);
            while (i--) BUFFER[i] = 256 * Math.random() | 0;
            i = IDX = 0;
          }
          for (; i < 16; i++) {
            num = BUFFER[IDX + i];
            if (i == 6) out += HEX[num & 15 | 64];
            else if (i == 8) out += HEX[num & 63 | 128];
            else out += HEX[num];
            if (i & 1 && i > 1 && i < 11) out += '-';
          }
          IDX++;
          return out;
        }

        const hasCrypto$1 = () => !isNullOrUndefined(globalThis.crypto) && isFunction(globalThis.crypto.getRandomValues);

        const generateUUID = () => {
          if (hasCrypto$1()) {
            return v4$1();
          }
          return v4();
        };

        const onPageLeave = callback => { // To ensure the callback is only called once even if more than one events
          // are fired at once.
          let pageLeft = false;
          let isAccessible = false;

          function handleOnLeave() {
            if (pageLeft) {
              return;
            }
            pageLeft = true;
            callback(isAccessible); // Reset pageLeft on the next tick
            // to ensure callback executes for other listeners
            // when closing an inactive browser tab.
            setTimeout(() => {
              pageLeft = false;
            }, 0);
          } // Catches the unloading of the page (e.g., closing the tab or navigating away).
          // Includes user actions like clicking a link, entering a new URL,
          // refreshing the page, or closing the browser tab
          // Note that 'pagehide' is not supported in IE.
          // So, this is a fallback.
          globalThis.addEventListener('beforeunload', () => {
            isAccessible = false;
            handleOnLeave();
          });
          globalThis.addEventListener('blur', () => {
            isAccessible = true;
            handleOnLeave();
          });
          globalThis.addEventListener('focus', () => {
            pageLeft = false;
          }); // Catches the page being hidden, including scenarios like closing the tab.
          document.addEventListener('pagehide', () => {
            isAccessible = document.visibilityState === 'hidden';
            handleOnLeave();
          }); // Catches visibility changes, such as switching tabs or minimizing the browser.
          document.addEventListener('visibilitychange', () => {
            isAccessible = true;
            if (document.visibilityState === 'hidden') {
              handleOnLeave();
            } else {
              pageLeft = false;
            }
          });
        };

        const getFormattedTimestamp = date => date.toISOString();
        /**
         * To get the current timestamp in ISO string format
         * @returns ISO formatted timestamp string
         */
        const getCurrentTimeFormatted = () => getFormattedTimestamp(new Date());

        const LOG_CONTEXT_SEPARATOR = ':: ';
        const SCRIPT_ALREADY_EXISTS_ERROR = id => `A script with the id "${id}" is already loaded. Skipping the loading of this script to prevent conflicts.`;
        const SCRIPT_LOAD_ERROR = (id, url) => `Failed to load the script with the id "${id}" from URL "${url}".`;
        const SCRIPT_LOAD_TIMEOUT_ERROR = (id, url, timeout) => `A timeout of ${timeout} ms occurred while trying to load the script with id "${id}" from URL "${url}".`;
        const CIRCULAR_REFERENCE_WARNING = (context, key) => `${context}${LOG_CONTEXT_SEPARATOR}A circular reference has been detected in the object and the property "${key}" has been dropped from the output.`;
        const JSON_STRINGIFY_WARNING = `Failed to convert the value to a JSON string.`;

        const JSON_STRINGIFY = 'JSONStringify';
        const BIG_INT_PLACEHOLDER = '[BigInt]';
        const CIRCULAR_REFERENCE_PLACEHOLDER = '[Circular Reference]';
        const getCircularReplacer = (excludeNull, excludeKeys, logger) => {
          const ancestors = []; // Here we do not want to use arrow function to use "this" in function context
          // eslint-disable-next-line func-names
          return function(key, value) {
            if (excludeKeys?.includes(key)) {
              return undefined;
            }
            if (excludeNull && isNullOrUndefined(value)) {
              return undefined;
            }
            if (typeof value !== 'object' || isNull(value)) {
              return value;
            } // `this` is the object that value is contained in, i.e., its direct parent.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-next-line
            while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) {
              ancestors.pop();
            }
            if (ancestors.includes(value)) {
              logger?.warn(CIRCULAR_REFERENCE_WARNING(JSON_STRINGIFY, key));
              return CIRCULAR_REFERENCE_PLACEHOLDER;
            }
            ancestors.push(value);
            return value;
          };
        };
        /**
         * Utility method for JSON stringify object excluding null values & circular references
         *
         * @param {*} value input
         * @param {boolean} excludeNull if it should exclude nul or not
         * @param {function} logger optional logger methods for warning
         * @returns string
         */
        const stringifyWithoutCircular = (value, excludeNull, excludeKeys, logger) => {
          try {
            return JSON.stringify(value, getCircularReplacer(excludeNull, excludeKeys, logger));
          } catch (err) {
            logger?.warn(JSON_STRINGIFY_WARNING, err);
            return null;
          }
        };
        const getReplacer = logger => {
          const ancestors = []; // Array to track ancestor objects
          // Using a regular function to use `this` for the parent context
          return function replacer(key, value) {
            if (isBigInt(value)) {
              return BIG_INT_PLACEHOLDER; // Replace BigInt values
            } // `this` is the object that value is contained in, i.e., its direct parent.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-next-line
            while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) {
              ancestors.pop(); // Remove ancestors that are no longer part of the chain
            } // Check for circular references (if the value is already in the ancestors)
            if (ancestors.includes(value)) {
              return CIRCULAR_REFERENCE_PLACEHOLDER;
            } // Add current value to ancestors
            ancestors.push(value);
            return value;
          };
        };
        const traverseWithThis = (obj, replacer) => { // Create a new result object or array
          const result = Array.isArray(obj) ? [] : {}; // Traverse object properties or array elements
          // eslint-disable-next-line no-restricted-syntax
          for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
              const value = obj[key]; // Recursively apply the replacer and traversal
              const sanitizedValue = replacer.call(obj, key, value); // If the value is an object or array, continue traversal
              if (isObjectLiteralAndNotNull(sanitizedValue) || Array.isArray(sanitizedValue)) {
                result[key] = traverseWithThis(sanitizedValue, replacer);
              } else {
                result[key] = sanitizedValue;
              }
            }
          }
          return result;
        };
        /**
         * Recursively traverses an object similar to JSON.stringify,
         * sanitizing BigInts and circular references
         * @param value Input object
         * @param logger Logger instance
         * @returns Sanitized value
         */
        const getSanitizedValue = (value, logger) => {
          const replacer = getReplacer(); // This is needed for registering the first ancestor
          const newValue = replacer.call(value, '', value);
          if (isObjectLiteralAndNotNull(value) || Array.isArray(value)) {
            return traverseWithThis(value, replacer);
          }
          return newValue;
        };

        const MANUAL_ERROR_IDENTIFIER = '[MANUAL ERROR]';
        /**
         * Get mutated error with issue prepended to error message
         * @param err Original error
         * @param issue Issue to prepend to error message
         * @returns Instance of Error with message prepended with issue
         */
        const getMutatedError = (err, issue) => {
          let finalError = err;
          if (!isTypeOfError(err)) {
            finalError = new Error(`${issue}: ${stringifyWithoutCircular(err)}`);
          } else {
            finalError.message = `${issue}: ${err.message}`;
          }
          return finalError;
        };
        const dispatchErrorEvent = error => {
          if (isTypeOfError(error)) {
            error.stack = `${error.stack??''}\n${MANUAL_ERROR_IDENTIFIER}`;
          }
          globalThis.dispatchEvent(new ErrorEvent('error', {
            error
          }));
        };

        const APP_NAME = 'RudderLabs JavaScript SDK';
        const APP_VERSION = '3.11.13';
        const APP_NAMESPACE = 'com.rudderlabs.javascript';
        const MODULE_TYPE = 'npm';
        const ADBLOCK_PAGE_CATEGORY = 'RudderJS-Initiated';
        const ADBLOCK_PAGE_NAME = 'ad-block page request';
        const ADBLOCK_PAGE_PATH = '/ad-blocked';
        const GLOBAL_PRELOAD_BUFFER = 'preloadedEventsBuffer';
        const CONSENT_TRACK_EVENT_NAME = 'Consent Management Interaction';

        const QUERY_PARAM_TRAIT_PREFIX = 'ajs_trait_';
        const QUERY_PARAM_PROPERTY_PREFIX = 'ajs_prop_';
        const QUERY_PARAM_ANONYMOUS_ID_KEY = 'ajs_aid';
        const QUERY_PARAM_USER_ID_KEY = 'ajs_uid';
        const QUERY_PARAM_TRACK_EVENT_NAME_KEY = 'ajs_event';

        const DEFAULT_XHR_TIMEOUT_MS = 10 * 1000; // 10 seconds
        const DEFAULT_COOKIE_MAX_AGE_MS = 31536000 * 1000; // 1 year
        const DEFAULT_SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
        const MIN_SESSION_TIMEOUT_MS = 10 * 1000; // 10 seconds
        const DEFAULT_DATA_PLANE_EVENTS_BUFFER_TIMEOUT_MS = 10 * 1000; // 10 seconds
        const DEBOUNCED_TIMEOUT_MS = 250; // 250 milliseconds

        /**
         * Create globally accessible RudderStackGlobals object
         */
        const createExposedGlobals = (analyticsInstanceId = 'app') => {
          if (!globalThis.RudderStackGlobals) {
            globalThis.RudderStackGlobals = {};
          }
          if (!globalThis.RudderStackGlobals[analyticsInstanceId]) {
            globalThis.RudderStackGlobals[analyticsInstanceId] = {};
          }
        };
        /**
         * Add move values to globally accessible RudderStackGlobals object per analytics instance
         */
        const setExposedGlobal = (keyName, value, analyticsInstanceId = 'app') => {
          createExposedGlobals(analyticsInstanceId);
          globalThis.RudderStackGlobals[analyticsInstanceId][keyName] = value;
        };
        /**
         * Get values from globally accessible RudderStackGlobals object by analytics instance
         */
        const getExposedGlobal = (keyName, analyticsInstanceId = 'app') => {
          createExposedGlobals(analyticsInstanceId);
          return globalThis.RudderStackGlobals[analyticsInstanceId][keyName];
        };

        function debounce(func, thisArg, delay = DEBOUNCED_TIMEOUT_MS) {
          let timeoutId;
          return (...args) => {
            globalThis.clearTimeout(timeoutId);
            timeoutId = globalThis.setTimeout(() => {
              func.apply(thisArg, args);
            }, delay);
          };
        }

        /**
         * Parse query string params into object values for keys that start with a defined prefix
         */
        const getEventDataFromQueryString = (params, dataTypeNamePrefix) => {
          const data = {};
          params.forEach((value, key) => {
            if (key.startsWith(dataTypeNamePrefix)) { // remove prefix from key name
              const dataKey = key.substring(dataTypeNamePrefix.length); // add new key value pair in generated object
              data[dataKey] = params.get(key);
            }
          });
          return data;
        };
        /**
         * Parse query string into preload buffer events & push into existing array before any other events
         */
        const retrieveEventsFromQueryString = (argumentsArray = []) => { // Mapping for trait and properties values based on key prefix
          const eventArgumentToQueryParamMap = {
            trait: QUERY_PARAM_TRAIT_PREFIX,
            properties: QUERY_PARAM_PROPERTY_PREFIX
          };
          const queryObject = new URLSearchParams(globalThis.location.search); // Add track events with name and properties
          if (queryObject.get(QUERY_PARAM_TRACK_EVENT_NAME_KEY)) {
            argumentsArray.unshift(['track', queryObject.get(QUERY_PARAM_TRACK_EVENT_NAME_KEY), getEventDataFromQueryString(queryObject, eventArgumentToQueryParamMap.properties)]);
          } // Set userId and user traits
          if (queryObject.get(QUERY_PARAM_USER_ID_KEY)) {
            argumentsArray.unshift(['identify', queryObject.get(QUERY_PARAM_USER_ID_KEY), getEventDataFromQueryString(queryObject, eventArgumentToQueryParamMap.trait)]);
          } // Set anonymousID
          if (queryObject.get(QUERY_PARAM_ANONYMOUS_ID_KEY)) {
            argumentsArray.unshift(['setAnonymousId', queryObject.get(QUERY_PARAM_ANONYMOUS_ID_KEY)]);
          }
        };
        /**
         * Retrieve an existing buffered load method call and remove from the existing array
         */
        const getPreloadedLoadEvent = preloadedEventsArray => {
          const loadMethodName = 'load';
          let loadEvent = [];
          /**
           * Iterate the buffered API calls until we find load call and process it separately
           */
          let i = 0;
          while (i < preloadedEventsArray.length) {
            if (preloadedEventsArray[i] && preloadedEventsArray[i][0] === loadMethodName) {
              loadEvent = clone(preloadedEventsArray[i]);
              preloadedEventsArray.splice(i, 1);
              break;
            }
            i += 1;
          }
          return loadEvent;
        };
        /**
         * Promote consent events to the top of the preloaded events array
         * @param preloadedEventsArray Preloaded events array
         * @returns None
         */
        const promotePreloadedConsentEventsToTop = preloadedEventsArray => {
          const consentMethodName = 'consent';
          const consentEvents = preloadedEventsArray.filter(bufferedEvent => bufferedEvent[0] === consentMethodName);
          const nonConsentEvents = preloadedEventsArray.filter(bufferedEvent => bufferedEvent[0] !== consentMethodName); // Remove all elements and add consent events first followed by non consent events
          // eslint-disable-next-line unicorn/no-useless-spread
          preloadedEventsArray.splice(0, preloadedEventsArray.length, ...consentEvents, ...nonConsentEvents);
        };
        /**
         * Retrieve any existing events that were triggered before SDK load and enqueue in buffer
         */
        const retrievePreloadBufferEvents = instance => {
          const preloadedEventsArray = getExposedGlobal(GLOBAL_PRELOAD_BUFFER) || []; // Get events that are pre-populated via query string params
          retrieveEventsFromQueryString(preloadedEventsArray); // Enqueue the non load events in the buffer of the global rudder analytics singleton
          if (preloadedEventsArray.length > 0) {
            instance.enqueuePreloadBufferEvents(preloadedEventsArray);
            setExposedGlobal(GLOBAL_PRELOAD_BUFFER, []);
          }
        };
        const consumePreloadBufferedEvent = (event, analyticsInstance) => {
          const methodName = event.shift();
          let callOptions;
          if (isFunction(analyticsInstance[methodName])) {
            switch (methodName) {
              case 'page':
                callOptions = pageArgumentsToCallOptions(...event);
                break;
              case 'track':
                callOptions = trackArgumentsToCallOptions(...event);
                break;
              case 'identify':
                callOptions = identifyArgumentsToCallOptions(...event);
                break;
              case 'alias':
                callOptions = aliasArgumentsToCallOptions(...event);
                break;
              case 'group':
                callOptions = groupArgumentsToCallOptions(...event);
                break;
              default:
                analyticsInstance[methodName](...event);
                break;
            }
            if (callOptions) {
              analyticsInstance[methodName](callOptions);
            }
          }
        };

        const DEFAULT_EXT_SRC_LOAD_TIMEOUT_MS = 10 * 1000; // 10 seconds

        const EXTERNAL_SOURCE_LOAD_ORIGIN = 'RS_JS_SDK';

        /**
         * Create the DOM element to load a script marked as RS SDK originated
         *
         * @param {*} url The URL of the script to be loaded
         * @param {*} id ID for the script tag
         * @param {*} async Whether to load the script in async mode. Defaults to `true` [optional]
         * @param {*} onload callback to invoke onload [optional]
         * @param {*} onerror callback to invoke onerror [optional]
         * @param {*} extraAttributes key/value pair with html attributes to add in html tag [optional]
         *
         * @returns HTMLScriptElement
         */
        const createScriptElement = (url, id, async = true, onload = null, onerror = null, extraAttributes = {}) => {
          const scriptElement = document.createElement('script');
          scriptElement.type = 'text/javascript';
          scriptElement.onload = onload;
          scriptElement.onerror = onerror;
          scriptElement.src = url;
          scriptElement.id = id;
          scriptElement.async = async;
          Object.keys(extraAttributes).forEach(attributeName => {
            scriptElement.setAttribute(attributeName, extraAttributes[attributeName]);
          });
          scriptElement.setAttribute('data-loader', EXTERNAL_SOURCE_LOAD_ORIGIN);
          return scriptElement;
        };
        /**
         * Add script DOM element to DOM
         *
         * @param {*} newScriptElement the script element to add
         *
         * @returns
         */
        const insertScript = newScriptElement => { // First try to add it to the head
          const headElements = document.getElementsByTagName('head');
          if (headElements.length > 0) {
            headElements[0]?.insertBefore(newScriptElement, headElements[0]?.firstChild);
            return;
          } // Else wise add it before the first script tag
          const scriptElements = document.getElementsByTagName('script');
          if (scriptElements.length > 0 && scriptElements[0]?.parentNode) {
            scriptElements[0]?.parentNode.insertBefore(newScriptElement, scriptElements[0]);
            return;
          } // Create a new head element and add the script as fallback
          const headElement = document.createElement('head');
          headElement.appendChild(newScriptElement);
          const htmlElement = document.getElementsByTagName('html')[0];
          htmlElement?.insertBefore(headElement, htmlElement.firstChild);
        };
        /**
         * Loads external js file as a script html tag
         *
         * @param {*} url The URL of the script to be loaded
         * @param {*} id ID for the script tag
         * @param {*} timeout loading timeout
         * @param {*} async Whether to load the script in async mode. Defaults to `true` [optional]
         * @param {*} extraAttributes key/value pair with html attributes to add in html tag [optional]
         *
         * @returns
         */
        const jsFileLoader = (url, id, timeout, async = true, extraAttributes) => new Promise((resolve, reject) => {
          const scriptExists = document.getElementById(id);
          if (scriptExists) {
            reject(new Error(SCRIPT_ALREADY_EXISTS_ERROR(id)));
          }
          try {
            let timeoutID;
            const onload = () => {
              globalThis.clearTimeout(timeoutID);
              resolve(id);
            };
            const onerror = () => {
              globalThis.clearTimeout(timeoutID);
              reject(new Error(SCRIPT_LOAD_ERROR(id, url)));
            }; // Create the DOM element to load the script and add it to the DOM
            insertScript(createScriptElement(url, id, async, onload, onerror, extraAttributes)); // Reject on timeout
            timeoutID = globalThis.setTimeout(() => {
              reject(new Error(SCRIPT_LOAD_TIMEOUT_ERROR(id, url, timeout)));
            }, timeout);
          } catch (err) {
            reject(getMutatedError(err, SCRIPT_LOAD_ERROR(id, url)));
          }
        });

        /**
         * Service to load external resources/files
         */
        class ExternalSrcLoader {
          hasErrorHandler = false;
          constructor(errorHandler, logger, timeout = DEFAULT_EXT_SRC_LOAD_TIMEOUT_MS) {
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.timeout = timeout;
            this.hasErrorHandler = Boolean(this.errorHandler);
            this.onError = this.onError.bind(this);
          }
          /**
           * Load external resource of type javascript
           */
          loadJSFile(config) {
            const {
              url,
              id,
              timeout,
              async,
              callback,
              extraAttributes
            } = config;
            const isFireAndForget = !isFunction(callback);
            jsFileLoader(url, id, timeout || this.timeout, async, extraAttributes).then(id => {
              if (!isFireAndForget) {
                callback(id);
              }
            }).catch(err => {
              this.onError(err);
              if (!isFireAndForget) {
                callback();
              }
            });
          }
          /**
           * Handle errors
           */
          onError(error) {
            if (this.hasErrorHandler) {
              this.errorHandler?.onError(error, EXTERNAL_SRC_LOADER);
            } else {
              throw error;
            }
          }
        }

        var i = Symbol.for("preact-signals");

        function t() {
          if (!(s > 1)) {
            var i, t = !1;
            while (void 0 !== h) {
              var r = h;
              h = void 0;
              f++;
              while (void 0 !== r) {
                var o = r.o;
                r.o = void 0;
                r.f &= -3;
                if (!(8 & r.f) && c(r)) try {
                  r.c();
                } catch (r) {
                  if (!t) {
                    i = r;
                    t = !0;
                  }
                }
                r = o;
              }
            }
            f = 0;
            s--;
            if (t) throw i;
          } else s--;
        }

        function r(i) {
          if (s > 0) return i();
          s++;
          try {
            return i();
          } finally {
            t();
          }
        }
        var o = void 0;
        var h = void 0,
          s = 0,
          f = 0,
          v = 0;

        function e(i) {
          if (void 0 !== o) {
            var t = i.n;
            if (void 0 === t || t.t !== o) {
              t = {
                i: 0,
                S: i,
                p: o.s,
                n: void 0,
                t: o,
                e: void 0,
                x: void 0,
                r: t
              };
              if (void 0 !== o.s) o.s.n = t;
              o.s = t;
              i.n = t;
              if (32 & o.f) i.S(t);
              return t;
            } else if (-1 === t.i) {
              t.i = 0;
              if (void 0 !== t.n) {
                t.n.p = t.p;
                if (void 0 !== t.p) t.p.n = t.n;
                t.p = o.s;
                t.n = void 0;
                o.s.n = t;
                o.s = t;
              }
              return t;
            }
          }
        }

        function u(i) {
          this.v = i;
          this.i = 0;
          this.n = void 0;
          this.t = void 0;
        }
        u.prototype.brand = i;
        u.prototype.h = function() {
          return !0;
        };
        u.prototype.S = function(i) {
          if (this.t !== i && void 0 === i.e) {
            i.x = this.t;
            if (void 0 !== this.t) this.t.e = i;
            this.t = i;
          }
        };
        u.prototype.U = function(i) {
          if (void 0 !== this.t) {
            var t = i.e,
              r = i.x;
            if (void 0 !== t) {
              t.x = r;
              i.e = void 0;
            }
            if (void 0 !== r) {
              r.e = t;
              i.x = void 0;
            }
            if (i === this.t) this.t = r;
          }
        };
        u.prototype.subscribe = function(i) {
          var t = this;
          return E(function() {
            var r = t.value,
              n = o;
            o = void 0;
            try {
              i(r);
            } finally {
              o = n;
            }
          });
        };
        u.prototype.valueOf = function() {
          return this.value;
        };
        u.prototype.toString = function() {
          return this.value + "";
        };
        u.prototype.toJSON = function() {
          return this.value;
        };
        u.prototype.peek = function() {
          var i = o;
          o = void 0;
          try {
            return this.value;
          } finally {
            o = i;
          }
        };
        Object.defineProperty(u.prototype, "value", {
          get: function() {
            var i = e(this);
            if (void 0 !== i) i.i = this.i;
            return this.v;
          },
          set: function(i) {
            if (i !== this.v) {
              if (f > 100) throw new Error("Cycle detected");
              this.v = i;
              this.i++;
              v++;
              s++;
              try {
                for (var r = this.t; void 0 !== r; r = r.x) r.t.N();
              } finally {
                t();
              }
            }
          }
        });

        function d(i) {
          return new u(i);
        }

        function c(i) {
          for (var t = i.s; void 0 !== t; t = t.n)
            if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
          return !1;
        }

        function a(i) {
          for (var t = i.s; void 0 !== t; t = t.n) {
            var r = t.S.n;
            if (void 0 !== r) t.r = r;
            t.S.n = t;
            t.i = -1;
            if (void 0 === t.n) {
              i.s = t;
              break;
            }
          }
        }

        function l(i) {
          var t = i.s,
            r = void 0;
          while (void 0 !== t) {
            var o = t.p;
            if (-1 === t.i) {
              t.S.U(t);
              if (void 0 !== o) o.n = t.n;
              if (void 0 !== t.n) t.n.p = o;
            } else r = t;
            t.S.n = t.r;
            if (void 0 !== t.r) t.r = void 0;
            t = o;
          }
          i.s = r;
        }

        function y(i) {
          u.call(this, void 0);
          this.x = i;
          this.s = void 0;
          this.g = v - 1;
          this.f = 4;
        }(y.prototype = new u()).h = function() {
          this.f &= -3;
          if (1 & this.f) return !1;
          if (32 == (36 & this.f)) return !0;
          this.f &= -5;
          if (this.g === v) return !0;
          this.g = v;
          this.f |= 1;
          if (this.i > 0 && !c(this)) {
            this.f &= -2;
            return !0;
          }
          var i = o;
          try {
            a(this);
            o = this;
            var t = this.x();
            if (16 & this.f || this.v !== t || 0 === this.i) {
              this.v = t;
              this.f &= -17;
              this.i++;
            }
          } catch (i) {
            this.v = i;
            this.f |= 16;
            this.i++;
          }
          o = i;
          l(this);
          this.f &= -2;
          return !0;
        };
        y.prototype.S = function(i) {
          if (void 0 === this.t) {
            this.f |= 36;
            for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
          }
          u.prototype.S.call(this, i);
        };
        y.prototype.U = function(i) {
          if (void 0 !== this.t) {
            u.prototype.U.call(this, i);
            if (void 0 === this.t) {
              this.f &= -33;
              for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
            }
          }
        };
        y.prototype.N = function() {
          if (!(2 & this.f)) {
            this.f |= 6;
            for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
          }
        };
        Object.defineProperty(y.prototype, "value", {
          get: function() {
            if (1 & this.f) throw new Error("Cycle detected");
            var i = e(this);
            this.h();
            if (void 0 !== i) i.i = this.i;
            if (16 & this.f) throw this.v;
            return this.v;
          }
        });

        function _(i) {
          var r = i.u;
          i.u = void 0;
          if ("function" == typeof r) {
            s++;
            var n = o;
            o = void 0;
            try {
              r();
            } catch (t) {
              i.f &= -2;
              i.f |= 8;
              g(i);
              throw t;
            } finally {
              o = n;
              t();
            }
          }
        }

        function g(i) {
          for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
          i.x = void 0;
          i.s = void 0;
          _(i);
        }

        function p(i) {
          if (o !== this) throw new Error("Out-of-order effect");
          l(this);
          o = i;
          this.f &= -2;
          if (8 & this.f) g(this);
          t();
        }

        function b(i) {
          this.x = i;
          this.u = void 0;
          this.s = void 0;
          this.o = void 0;
          this.f = 32;
        }
        b.prototype.c = function() {
          var i = this.S();
          try {
            if (8 & this.f) return;
            if (void 0 === this.x) return;
            var t = this.x();
            if ("function" == typeof t) this.u = t;
          } finally {
            i();
          }
        };
        b.prototype.S = function() {
          if (1 & this.f) throw new Error("Cycle detected");
          this.f |= 1;
          this.f &= -9;
          _(this);
          a(this);
          s++;
          var i = o;
          o = this;
          return p.bind(this, i);
        };
        b.prototype.N = function() {
          if (!(2 & this.f)) {
            this.f |= 2;
            this.o = h;
            h = this;
          }
        };
        b.prototype.d = function() {
          this.f |= 8;
          if (!(1 & this.f)) g(this);
        };

        function E(i) {
          var t = new b(i);
          try {
            t.c();
          } catch (i) {
            t.d();
            throw i;
          }
          return t.d.bind(t);
        }

        /**
         * A buffer queue to serve as a store for any type of data
         */
        class BufferQueue {
          constructor() {
            this.items = [];
          }
          enqueue(item) {
            this.items.push(item);
          }
          dequeue() {
            if (this.items.length === 0) {
              return null;
            }
            return this.items.shift();
          }
          isEmpty() {
            return this.items.length === 0;
          }
          size() {
            return this.items.length;
          }
          clear() {
            this.items = [];
          }
        }

        const LOG_LEVEL_MAP = {
          LOG: 0,
          INFO: 1,
          DEBUG: 2,
          WARN: 3,
          ERROR: 4,
          NONE: 5
        };
        const DEFAULT_LOG_LEVEL = 'LOG';
        const POST_LOAD_LOG_LEVEL = 'ERROR';
        const LOG_MSG_PREFIX = 'RS SDK';
        const LOG_MSG_PREFIX_STYLE = 'font-weight: bold; background: black; color: white;';
        const LOG_MSG_STYLE = 'font-weight: normal;';
        /**
         * Service to log messages/data to output provider, default is console
         */
        class Logger {
          constructor(minLogLevel = DEFAULT_LOG_LEVEL, scope = '', logProvider = console) {
            this.minLogLevel = LOG_LEVEL_MAP[minLogLevel];
            this.scope = scope;
            this.logProvider = logProvider;
          }
          log(...data) {
            this.outputLog('LOG', data);
          }
          info(...data) {
            this.outputLog('INFO', data);
          }
          debug(...data) {
            this.outputLog('DEBUG', data);
          }
          warn(...data) {
            this.outputLog('WARN', data);
          }
          error(...data) {
            this.outputLog('ERROR', data);
          }
          outputLog(logMethod, data) {
            if (this.minLogLevel <= LOG_LEVEL_MAP[logMethod]) {
              this.logProvider[logMethod.toLowerCase()]?.(...this.formatLogData(data));
            }
          }
          setScope(scopeVal) {
            this.scope = scopeVal || this.scope;
          } // TODO: should we allow to change the level via global variable on run time
          //  to assist on the fly debugging?
          setMinLogLevel(logLevel) {
            this.minLogLevel = LOG_LEVEL_MAP[logLevel];
            if (isUndefined(this.minLogLevel)) {
              this.minLogLevel = LOG_LEVEL_MAP[DEFAULT_LOG_LEVEL];
            }
          }
          /**
           * Formats the console message using `scope` and styles
           */
          formatLogData(data) {
            if (Array.isArray(data) && data.length > 0) { // prefix SDK identifier
              let msg = `%c ${LOG_MSG_PREFIX}`; // format the log message using `scope`
              if (this.scope) {
                msg = `${msg} - ${this.scope}`;
              } // trim whitespaces for original message
              const originalMsg = isString(data[0]) ? data[0].trim() : ''; // prepare the final message
              msg = `${msg} %c ${originalMsg}`;
              const styledLogArgs = [msg, LOG_MSG_PREFIX_STYLE, // add style for the prefix
                LOG_MSG_STYLE // reset the style for the actual message
              ]; // add first it if it was not a string msg
              if (!isString(data[0])) {
                styledLogArgs.push(data[0]);
              } // append rest of the original arguments
              styledLogArgs.push(...data.slice(1));
              return styledLogArgs;
            }
            return data;
          }
        }
        const defaultLogger = new Logger();

        let ErrorType = /*#__PURE__*/ function(ErrorType) {
          ErrorType["HANDLEDEXCEPTION"] = "handledException";
          ErrorType["UNHANDLEDEXCEPTION"] = "unhandledException";
          ErrorType["UNHANDLEDREJECTION"] = "unhandledPromiseRejection";
          return ErrorType;
        }({});

        // default is v3
        const SUPPORTED_STORAGE_TYPES = ['localStorage', 'memoryStorage', 'cookieStorage', 'sessionStorage', 'none'];
        const DEFAULT_STORAGE_TYPE = 'cookieStorage';

        const SOURCE_CONFIG_OPTION_ERROR = `"getSourceConfig" must be a function. Please make sure that it is defined and returns a valid source configuration object.`;
        const SOURCE_CONFIG_RESOLUTION_ERROR = `Unable to process/parse source configuration response.`;
        const SOURCE_DISABLED_ERROR = `The source is disabled. Please enable the source in the dashboard to send events.`;
        const XHR_PAYLOAD_PREP_ERROR = `Failed to prepare data for the request.`;
        const EVENT_OBJECT_GENERATION_ERROR = `Failed to generate the event object.`;
        const PLUGIN_EXT_POINT_MISSING_ERROR = `Failed to invoke plugin because the extension point name is missing.`;
        const PLUGIN_EXT_POINT_INVALID_ERROR = `Failed to invoke plugin because the extension point name is invalid.`;
        const COMPONENT_BASE_URL_ERROR = component => `Failed to load the SDK as the base URL for ${component} is not valid.`; // ERROR
        const UNSUPPORTED_CONSENT_MANAGER_ERROR = (context, selectedConsentManager, consentManagersToPluginNameMap) => `${context}${LOG_CONTEXT_SEPARATOR}The consent manager "${selectedConsentManager}" is not supported. Please choose one of the following supported consent managers: "${Object.keys(consentManagersToPluginNameMap)}".`;
        const REPORTING_PLUGIN_INIT_FAILURE_ERROR = context => `${context}${LOG_CONTEXT_SEPARATOR}Failed to initialize the error reporting plugin.`;
        const NOTIFY_FAILURE_ERROR = context => `${context}${LOG_CONTEXT_SEPARATOR}Failed to notify the error.`;
        const PLUGIN_NAME_MISSING_ERROR = context => `${context}${LOG_CONTEXT_SEPARATOR}Plugin name is missing.`;
        const PLUGIN_ALREADY_EXISTS_ERROR = (context, pluginName) => `${context}${LOG_CONTEXT_SEPARATOR}Plugin "${pluginName}" already exists.`;
        const PLUGIN_NOT_FOUND_ERROR = (context, pluginName) => `${context}${LOG_CONTEXT_SEPARATOR}Plugin "${pluginName}" not found.`;
        const PLUGIN_ENGINE_BUG_ERROR = (context, pluginName) => `${context}${LOG_CONTEXT_SEPARATOR}Plugin "${pluginName}" not found in plugins but found in byName. This indicates a bug in the plugin engine. Please report this issue to the development team.`;
        const PLUGIN_DEPS_ERROR = (context, pluginName, notExistDeps) => `${context}${LOG_CONTEXT_SEPARATOR}Plugin "${pluginName}" could not be loaded because some of its dependencies "${notExistDeps}" do not exist.`;
        const PLUGIN_INVOCATION_ERROR = (context, extPoint, pluginName) => `${context}${LOG_CONTEXT_SEPARATOR}Failed to invoke the "${extPoint}" extension point of plugin "${pluginName}".`;
        const STORAGE_UNAVAILABILITY_ERROR_PREFIX = (context, storageType) => `${context}${LOG_CONTEXT_SEPARATOR}The "${storageType}" storage type is `;
        const SOURCE_CONFIG_FETCH_ERROR = reason => `Failed to fetch the source config. Reason: ${reason}`;
        const WRITE_KEY_VALIDATION_ERROR = (context, writeKey) => `${context}${LOG_CONTEXT_SEPARATOR}The write key "${writeKey}" is invalid. It must be a non-empty string. Please check that the write key is correct and try again.`;
        const DATA_PLANE_URL_VALIDATION_ERROR = (context, dataPlaneUrl) => `${context}${LOG_CONTEXT_SEPARATOR}The data plane URL "${dataPlaneUrl}" is invalid. It must be a valid URL string. Please check that the data plane URL is correct and try again.`;
        const READY_API_CALLBACK_ERROR = context => `${context}${LOG_CONTEXT_SEPARATOR}The provided callback is not a function.`;
        const XHR_DELIVERY_ERROR = (prefix, status, statusText, url) => `${prefix} with status: ${status}, ${statusText} for URL: ${url}.`;
        const XHR_REQUEST_ERROR = (prefix, e, url) => `${prefix} due to timeout or no connection (${e?e.type:''}) for URL: ${url}.`;
        const XHR_SEND_ERROR = (prefix, url) => `${prefix} for URL: ${url}`;
        const STORE_DATA_SAVE_ERROR = key => `Failed to save the value for "${key}" to storage`;
        const STORE_DATA_FETCH_ERROR = key => `Failed to retrieve or parse data for "${key}" from storage`;
        const DATA_SERVER_REQUEST_FAIL_ERROR = status => `The server responded with status ${status} while setting the cookies. As a fallback, the cookies will be set client side.`;
        const FAILED_SETTING_COOKIE_FROM_SERVER_ERROR = key => `The server failed to set the ${key} cookie. As a fallback, the cookies will be set client side.`;
        const FAILED_SETTING_COOKIE_FROM_SERVER_GLOBAL_ERROR = `Failed to set/remove cookies via server. As a fallback, the cookies will be managed client side.`; // WARNING
        const STORAGE_TYPE_VALIDATION_WARNING = (context, storageType, defaultStorageType) => `${context}${LOG_CONTEXT_SEPARATOR}The storage type "${storageType}" is not supported. Please choose one of the following supported types: "${SUPPORTED_STORAGE_TYPES}". The default type "${defaultStorageType}" will be used instead.`;
        const UNSUPPORTED_STORAGE_ENCRYPTION_VERSION_WARNING = (context, selectedStorageEncryptionVersion, storageEncryptionVersionsToPluginNameMap, defaultVersion) => `${context}${LOG_CONTEXT_SEPARATOR}The storage encryption version "${selectedStorageEncryptionVersion}" is not supported. Please choose one of the following supported versions: "${Object.keys(storageEncryptionVersionsToPluginNameMap)}". The default version "${defaultVersion}" will be used instead.`;
        const STORAGE_DATA_MIGRATION_OVERRIDE_WARNING = (context, storageEncryptionVersion, defaultVersion) => `${context}${LOG_CONTEXT_SEPARATOR}The storage data migration has been disabled because the configured storage encryption version (${storageEncryptionVersion}) is not the latest (${defaultVersion}). To enable storage data migration, please update the storage encryption version to the latest version.`;
        const SERVER_SIDE_COOKIE_FEATURE_OVERRIDE_WARNING = (context, providedCookieDomain, currentCookieDomain) => `${context}${LOG_CONTEXT_SEPARATOR}The provided cookie domain (${providedCookieDomain}) does not match the current webpage's domain (${currentCookieDomain}). Hence, the cookies will be set client-side.`;
        const RESERVED_KEYWORD_WARNING = (context, property, parentKeyPath, reservedElements) => `${context}${LOG_CONTEXT_SEPARATOR}The "${property}" property defined under "${parentKeyPath}" is a reserved keyword. Please choose a different property name to avoid conflicts with reserved keywords (${reservedElements}).`;
        const UNSUPPORTED_BEACON_API_WARNING = context => `${context}${LOG_CONTEXT_SEPARATOR}The Beacon API is not supported by your browser. The events will be sent using XHR instead.`;
        const TIMEOUT_NOT_NUMBER_WARNING = (context, timeout, defaultValue) => `${context}${LOG_CONTEXT_SEPARATOR}The session timeout value "${timeout}" is not a number. The default timeout of ${defaultValue} ms will be used instead.`;
        const TIMEOUT_ZERO_WARNING = context => `${context}${LOG_CONTEXT_SEPARATOR}The session timeout value is 0, which disables the automatic session tracking feature. If you want to enable session tracking, please provide a positive integer value for the timeout.`;
        const TIMEOUT_NOT_RECOMMENDED_WARNING = (context, timeout, minTimeout) => `${context}${LOG_CONTEXT_SEPARATOR}The session timeout value ${timeout} ms is less than the recommended minimum of ${minTimeout} ms. Please consider increasing the timeout value to ensure optimal performance and reliability.`;
        const INVALID_SESSION_ID_WARNING = (context, sessionId, minSessionIdLength) => `${context}${LOG_CONTEXT_SEPARATOR}The provided session ID (${sessionId}) is either invalid, not a positive integer, or not at least "${minSessionIdLength}" digits long. A new session ID will be auto-generated instead.`;
        const STORAGE_QUOTA_EXCEEDED_WARNING = context => `${context}${LOG_CONTEXT_SEPARATOR}The storage is either full or unavailable, so the data will not be persisted. Switching to in-memory storage.`;
        const STORAGE_UNAVAILABLE_WARNING = (context, entry, selectedStorageType, finalStorageType) => `${context}${LOG_CONTEXT_SEPARATOR}The storage type "${selectedStorageType}" is not available for entry "${entry}". The SDK will initialize the entry with "${finalStorageType}" storage type instead.`;
        const READY_CALLBACK_INVOKE_ERROR = `Failed to invoke the ready callback`;
        const API_CALLBACK_INVOKE_ERROR = `API Callback Invocation Failed`;
        const NATIVE_DEST_PLUGIN_INITIALIZE_ERROR = `NativeDestinationQueuePlugin initialization failed`;
        const DATAPLANE_PLUGIN_INITIALIZE_ERROR = `XhrQueuePlugin initialization failed`;
        const DMT_PLUGIN_INITIALIZE_ERROR = `DeviceModeTransformationPlugin initialization failed`;
        const NATIVE_DEST_PLUGIN_ENQUEUE_ERROR = `NativeDestinationQueuePlugin event enqueue failed`;
        const DATAPLANE_PLUGIN_ENQUEUE_ERROR = `XhrQueuePlugin event enqueue failed`;
        const INVALID_CONFIG_URL_WARNING = (context, configUrl) => `${context}${LOG_CONTEXT_SEPARATOR}The provided source config URL "${configUrl}" is invalid. Using the default source config URL instead.`;
        const POLYFILL_SCRIPT_LOAD_ERROR = (scriptId, url) => `Failed to load the polyfill script with ID "${scriptId}" from URL ${url}.`;
        const UNSUPPORTED_PRE_CONSENT_STORAGE_STRATEGY = (context, selectedStrategy, defaultStrategy) => `${context}${LOG_CONTEXT_SEPARATOR}The pre-consent storage strategy "${selectedStrategy}" is not supported. Please choose one of the following supported strategies: "none, session, anonymousId". The default strategy "${defaultStrategy}" will be used instead.`;
        const UNSUPPORTED_PRE_CONSENT_EVENTS_DELIVERY_TYPE = (context, selectedDeliveryType, defaultDeliveryType) => `${context}${LOG_CONTEXT_SEPARATOR}The pre-consent events delivery type "${selectedDeliveryType}" is not supported. Please choose one of the following supported types: "immediate, buffer". The default type "${defaultDeliveryType}" will be used instead.`;
        const generateMisconfiguredPluginsWarning = (context, configurationStatus, missingPlugins, shouldAddMissingPlugins) => {
          const isSinglePlugin = missingPlugins.length === 1;
          const pluginsString = isSinglePlugin ? ` '${missingPlugins[0]}' plugin was` : ` ['${missingPlugins.join("', '")}'] plugins were`;
          const baseWarning = `${context}${LOG_CONTEXT_SEPARATOR}${configurationStatus}, but${pluginsString} not configured to load.`;
          if (shouldAddMissingPlugins) {
            return `${baseWarning} So, ${isSinglePlugin?'the plugin':'those plugins'} will be loaded automatically.`;
          }
          return `${baseWarning} Ignore if this was intentional. Otherwise, consider adding ${isSinglePlugin?'it':'them'} to the 'plugins' load API option.`;
        };
        const INVALID_POLYFILL_URL_WARNING = (context, customPolyfillUrl) => `${context}${LOG_CONTEXT_SEPARATOR}The provided polyfill URL "${customPolyfillUrl}" is invalid. The default polyfill URL will be used instead.`;
        const BAD_COOKIES_WARNING = key => `The cookie data for ${key} seems to be encrypted using SDK versions < v3. The data is dropped. This can potentially stem from using SDK versions < v3 on other sites or web pages that can share cookies with this webpage. We recommend using the same SDK (v3) version everywhere or avoid disabling the storage data migration.`;
        const PAGE_UNLOAD_ON_BEACON_DISABLED_WARNING = context => `${context}${LOG_CONTEXT_SEPARATOR}Page Unloaded event can only be tracked when the Beacon transport is active. Please enable "useBeacon" load API option.`;

        const DEFAULT_INTEGRATIONS_CONFIG = {
          All: true
        };

        const CDN_INT_DIR = 'js-integrations';
        const CDN_PLUGINS_DIR = 'plugins';
        const URL_PATTERN = new RegExp('^(https?:\\/\\/)' + // protocol
          '(' + '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
          'localhost|' + // localhost
          '((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]?)\\.){3}' + // OR IP (v4) address first 3 octets
          '(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9]?))' + // last octet of IP address
          ')' + '(\\:\\d+)?' + // port
          '(\\/[-a-zA-Z\\d%_.~+]*)*' + // path
          '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-zA-Z\\d_]*)?$') // fragment locator
        ;

        const BUILD_TYPE = 'modern';
        const SDK_CDN_BASE_URL = 'https://cdn.rudderlabs.com';
        const CDN_ARCH_VERSION_DIR = 'v3';
        const DEST_SDK_BASE_URL = `${SDK_CDN_BASE_URL}/${CDN_ARCH_VERSION_DIR}/${BUILD_TYPE}/${CDN_INT_DIR}`;
        const PLUGINS_BASE_URL = `${SDK_CDN_BASE_URL}/${CDN_ARCH_VERSION_DIR}/${BUILD_TYPE}/${CDN_PLUGINS_DIR}`;
        const DEFAULT_CONFIG_BE_URL = 'https://api.rudderstack.com';

        const DEFAULT_STORAGE_ENCRYPTION_VERSION = 'v3';
        const DEFAULT_DATA_PLANE_EVENTS_TRANSPORT = 'xhr';
        const ConsentManagersToPluginNameMap = {
          iubenda: 'IubendaConsentManager',
          oneTrust: 'OneTrustConsentManager',
          ketch: 'KetchConsentManager',
          custom: 'CustomConsentManager'
        };
        const StorageEncryptionVersionsToPluginNameMap = {
          [DEFAULT_STORAGE_ENCRYPTION_VERSION]: 'StorageEncryption',
          legacy: 'StorageEncryptionLegacy'
        };
        const DataPlaneEventsTransportToPluginNameMap = {
          [DEFAULT_DATA_PLANE_EVENTS_TRANSPORT]: 'XhrQueue',
          beacon: 'BeaconQueue'
        };
        const DEFAULT_DATA_SERVICE_ENDPOINT = 'rsaRequest';
        const METRICS_SERVICE_ENDPOINT = 'rsaMetrics';

        const defaultLoadOptions = {
          logLevel: 'ERROR',
          configUrl: DEFAULT_CONFIG_BE_URL,
          loadIntegration: true,
          sessions: {
            autoTrack: true,
            timeout: DEFAULT_SESSION_TIMEOUT_MS
          },
          sameSiteCookie: 'Lax',
          polyfillIfRequired: true,
          integrations: DEFAULT_INTEGRATIONS_CONFIG,
          useBeacon: false,
          beaconQueueOptions: {},
          destinationsQueueOptions: {},
          queueOptions: {},
          lockIntegrationsVersion: false,
          lockPluginsVersion: false,
          uaChTrackLevel: 'none',
          plugins: [],
          useGlobalIntegrationsConfigInEvents: false,
          bufferDataPlaneEventsUntilReady: false,
          dataPlaneEventsBufferTimeout: DEFAULT_DATA_PLANE_EVENTS_BUFFER_TIMEOUT_MS,
          storage: {
            encryption: {
              version: DEFAULT_STORAGE_ENCRYPTION_VERSION
            },
            migrate: true,
            cookie: {}
          },
          sendAdblockPageOptions: {},
          useServerSideCookies: false
        };
        const loadOptionsState = d(clone(defaultLoadOptions));

        const DEFAULT_USER_SESSION_VALUES = {
          userId: '',
          userTraits: {},
          anonymousId: '',
          groupId: '',
          groupTraits: {},
          initialReferrer: '',
          initialReferringDomain: '',
          sessionInfo: {},
          authToken: null
        };
        const SERVER_SIDE_COOKIES_DEBOUNCE_TIME = 10; // milliseconds

        const defaultSessionConfiguration = {
          autoTrack: true,
          timeout: DEFAULT_SESSION_TIMEOUT_MS
        };
        const sessionState = {
          userId: d(DEFAULT_USER_SESSION_VALUES.userId),
          userTraits: d(DEFAULT_USER_SESSION_VALUES.userTraits),
          anonymousId: d(DEFAULT_USER_SESSION_VALUES.anonymousId),
          groupId: d(DEFAULT_USER_SESSION_VALUES.groupId),
          groupTraits: d(DEFAULT_USER_SESSION_VALUES.groupTraits),
          initialReferrer: d(DEFAULT_USER_SESSION_VALUES.initialReferrer),
          initialReferringDomain: d(DEFAULT_USER_SESSION_VALUES.initialReferringDomain),
          sessionInfo: d(DEFAULT_USER_SESSION_VALUES.sessionInfo),
          authToken: d(DEFAULT_USER_SESSION_VALUES.authToken)
        };

        const capabilitiesState = {
          isOnline: d(true),
          storage: {
            isLocalStorageAvailable: d(false),
            isCookieStorageAvailable: d(false),
            isSessionStorageAvailable: d(false)
          },
          isBeaconAvailable: d(false),
          isLegacyDOM: d(false),
          isUaCHAvailable: d(false),
          isCryptoAvailable: d(false),
          isIE11: d(false),
          isAdBlocked: d(false)
        };

        const reportingState = {
          isErrorReportingEnabled: d(false),
          isMetricsReportingEnabled: d(false),
          isErrorReportingPluginLoaded: d(false),
          breadcrumbs: d([])
        };

        const sourceConfigState = d(undefined);

        const lifecycleState = {
          activeDataplaneUrl: d(undefined),
          integrationsCDNPath: d(DEST_SDK_BASE_URL),
          pluginsCDNPath: d(PLUGINS_BASE_URL),
          sourceConfigUrl: d(undefined),
          status: d(undefined),
          initialized: d(false),
          logLevel: d('ERROR'),
          loaded: d(false),
          readyCallbacks: d([]),
          writeKey: d(undefined),
          dataPlaneUrl: d(undefined)
        };

        const consentsState = {
          enabled: d(false),
          initialized: d(false),
          data: d({}),
          activeConsentManagerPluginName: d(undefined),
          preConsent: d({
            enabled: false
          }),
          postConsent: d({}),
          resolutionStrategy: d('and'),
          provider: d(undefined),
          metadata: d(undefined)
        };

        const metricsState = {
          retries: d(0),
          dropped: d(0),
          sent: d(0),
          queued: d(0),
          triggered: d(0),
          metricsServiceUrl: d(undefined)
        };

        const contextState = {
          app: d({
            name: APP_NAME,
            namespace: APP_NAMESPACE,
            version: APP_VERSION,
            installType: MODULE_TYPE
          }),
          traits: d(null),
          library: d({
            name: APP_NAME,
            version: APP_VERSION,
            snippetVersion: globalThis.RudderSnippetVersion
          }),
          userAgent: d(''),
          device: d(null),
          network: d(null),
          os: d({
            name: '',
            version: ''
          }),
          locale: d(null),
          screen: d({
            density: 0,
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0
          }),
          'ua-ch': d(undefined),
          timezone: d(undefined)
        };

        const nativeDestinationsState = {
          configuredDestinations: d([]),
          activeDestinations: d([]),
          loadOnlyIntegrations: d({}),
          failedDestinations: d([]),
          loadIntegration: d(true),
          initializedDestinations: d([]),
          clientDestinationsReady: d(false),
          integrationsConfig: d({})
        };

        const eventBufferState = {
          toBeProcessedArray: d([]),
          readyCallbacksArray: d([])
        };

        const pluginsState = {
          ready: d(false),
          loadedPlugins: d([]),
          failedPlugins: d([]),
          pluginsToLoadFromConfig: d([]),
          activePlugins: d([]),
          totalPluginsToLoad: d(0)
        };

        const storageState = {
          encryptionPluginName: d(undefined),
          migrate: d(false),
          type: d(undefined),
          cookie: d(undefined),
          entries: d({}),
          trulyAnonymousTracking: d(false)
        };

        const serverSideCookiesState = {
          isEnabledServerSideCookies: d(false),
          dataServiceUrl: d(undefined)
        };

        const dataPlaneEventsState = {
          eventsQueuePluginName: d(undefined),
          deliveryEnabled: d(true) // Delivery should always happen
        };

        const autoTrackState = {
          enabled: d(false),
          pageLifecycle: {
            enabled: d(false),
            visitId: d(undefined),
            pageLoadedTimestamp: d(undefined)
          }
        };

        const defaultStateValues = {
          capabilities: capabilitiesState,
          consents: consentsState,
          context: contextState,
          eventBuffer: eventBufferState,
          lifecycle: lifecycleState,
          loadOptions: loadOptionsState,
          metrics: metricsState,
          nativeDestinations: nativeDestinationsState,
          plugins: pluginsState,
          reporting: reportingState,
          session: sessionState,
          source: sourceConfigState,
          storage: storageState,
          serverCookies: serverSideCookiesState,
          dataPlaneEvents: dataPlaneEventsState,
          autoTrack: autoTrackState
        };
        const state = {
          ...clone(defaultStateValues)
        };

        //  to next or return the value if it is the last one instead of an array per
        //  plugin that is the normal invoke
        // TODO: add invoke method for extension point that we know only one plugin can be used. add invokeMultiple and invokeSingle methods
        class PluginEngine {
          plugins = [];
          byName = {};
          cache = {};
          config = {
            throws: true
          };
          constructor(options = {}, logger) {
            this.config = {
              throws: true,
              ...options
            };
            this.logger = logger;
          }
          register(plugin, state) {
            if (!plugin.name) {
              const errorMessage = PLUGIN_NAME_MISSING_ERROR(PLUGIN_ENGINE);
              if (this.config.throws) {
                throw new Error(errorMessage);
              } else {
                this.logger?.error(errorMessage, plugin);
              }
            }
            if (this.byName[plugin.name]) {
              const errorMessage = PLUGIN_ALREADY_EXISTS_ERROR(PLUGIN_ENGINE, plugin.name);
              if (this.config.throws) {
                throw new Error(errorMessage);
              } else {
                this.logger?.error(errorMessage);
              }
            }
            this.cache = {};
            this.plugins = this.plugins.slice();
            let pos = this.plugins.length;
            this.plugins.forEach((pluginItem, index) => {
              if (pluginItem.deps?.includes(plugin.name)) {
                pos = Math.min(pos, index);
              }
            });
            this.plugins.splice(pos, 0, plugin);
            this.byName[plugin.name] = plugin;
            if (isFunction(plugin.initialize)) {
              plugin.initialize(state);
            }
          }
          unregister(name) {
            const plugin = this.byName[name];
            if (!plugin) {
              const errorMessage = PLUGIN_NOT_FOUND_ERROR(PLUGIN_ENGINE, name);
              if (this.config.throws) {
                throw new Error(errorMessage);
              } else {
                this.logger?.error(errorMessage);
              }
            }
            const index = this.plugins.indexOf(plugin);
            if (index === -1) {
              const errorMessage = PLUGIN_ENGINE_BUG_ERROR(PLUGIN_ENGINE, name);
              if (this.config.throws) {
                throw new Error(errorMessage);
              } else {
                this.logger?.error(errorMessage);
              }
            }
            this.cache = {};
            delete this.byName[name];
            this.plugins = this.plugins.slice();
            this.plugins.splice(index, 1);
          }
          getPlugin(name) {
            return this.byName[name];
          }
          getPlugins(extPoint) {
            const lifeCycleName = extPoint ?? '.';
            if (!this.cache[lifeCycleName]) {
              this.cache[lifeCycleName] = this.plugins.filter(plugin => {
                if (plugin.deps?.some(dependency => !this.byName[dependency])) { // If deps not exist, then not load it.
                  const notExistDeps = plugin.deps.filter(dependency => !this.byName[dependency]);
                  this.logger?.error(PLUGIN_DEPS_ERROR(PLUGIN_ENGINE, plugin.name, notExistDeps));
                  return false;
                }
                return lifeCycleName === '.' ? true : hasValueByPath(plugin, lifeCycleName);
              });
            }
            return this.cache[lifeCycleName];
          } // This method allows to process this.plugins so that it could
          // do some unified pre-process before application starts.
          processRawPlugins(callback) {
            callback(this.plugins);
            this.cache = {};
          }
          invoke(extPoint, allowMultiple = true, ...args) {
            let extensionPointName = extPoint;
            if (!extensionPointName) {
              throw new Error(PLUGIN_EXT_POINT_MISSING_ERROR);
            }
            const noCall = extensionPointName.startsWith('!');
            const throws = this.config.throws ?? extensionPointName.endsWith('!'); // eslint-disable-next-line unicorn/better-regex
            extensionPointName = extensionPointName.replace(/(^!|!$)/g, '');
            if (!extensionPointName) {
              throw new Error(PLUGIN_EXT_POINT_INVALID_ERROR);
            }
            const extensionPointNameParts = extensionPointName.split('.');
            extensionPointNameParts.pop();
            const pluginMethodPath = extensionPointNameParts.join('.');
            const pluginsToInvoke = allowMultiple ? this.getPlugins(extensionPointName) : [this.getPlugins(extensionPointName)[0]];
            return pluginsToInvoke.map(plugin => {
              const method = getValueByPath(plugin, extensionPointName);
              if (!isFunction(method) || noCall) {
                return method;
              }
              try {
                return method.apply(getValueByPath(plugin, pluginMethodPath), args);
              } catch (err) { // When a plugin failed, doesn't break the app
                if (throws) {
                  throw err;
                } else {
                  this.logger?.error(PLUGIN_INVOCATION_ERROR(PLUGIN_ENGINE, extensionPointName, plugin.name), err);
                }
              }
              return null;
            });
          }
          invokeSingle(extPoint, ...args) {
            return this.invoke(extPoint, false, ...args)[0];
          }
          invokeMultiple(extPoint, ...args) {
            return this.invoke(extPoint, true, ...args);
          }
        }
        const defaultPluginEngine = new PluginEngine({
          throws: true
        }, defaultLogger);

        const LOAD_ORIGIN = 'RS_JS_SDK';

        /**
         * Utility method to normalise errors
         */
        const processError = error => {
          let errorMessage;
          try {
            if (isString(error)) {
              errorMessage = error;
            } else if (error instanceof Error) {
              errorMessage = error.message;
            } else if (error instanceof ErrorEvent) {
              errorMessage = error.message;
            } else {
              errorMessage = error.message ? error.message : stringifyWithoutCircular(error);
            }
          } catch (e) {
            errorMessage = `Unknown error: ${e.message}`;
          }
          return errorMessage;
        };
        const getNormalizedErrorForUnhandledError = error => {
          try {
            if (error instanceof Error || error instanceof ErrorEvent || error instanceof PromiseRejectionEvent && error.reason) {
              return error;
            } // TODO: remove this block once all device mode integrations start using the v3 script loader module (TS)
            if (error instanceof Event) {
              const eventTarget = error.target; // Discard all the non-script loading errors
              if (eventTarget && eventTarget.localName !== 'script') {
                return undefined;
              } // Discard script errors that are not originated at SDK or from native SDKs
              if (eventTarget?.dataset && (eventTarget.dataset.loader !== LOAD_ORIGIN || eventTarget.dataset.isnonnativesdk !== 'true')) {
                return undefined;
              }
              const errorMessage = `Error in loading a third-party script from URL ${eventTarget?.src} with ID ${eventTarget?.id}.`;
              return Object.create(error, {
                message: {
                  value: errorMessage
                }
              });
            }
            return error;
          } catch (e) {
            return e;
          }
        };

        /**
         * A service to handle errors
         */
        class ErrorHandler { // If no logger is passed errors will be thrown as unhandled error
          constructor(logger, pluginEngine) {
            this.logger = logger;
            this.pluginEngine = pluginEngine;
            this.errorBuffer = new BufferQueue();
            this.attachEffect();
          }
          attachEffect() {
            if (state.reporting.isErrorReportingPluginLoaded.value === true) {
              while (this.errorBuffer.size() > 0) {
                const errorToProcess = this.errorBuffer.dequeue();
                if (errorToProcess) { // send it to the plugin
                  this.notifyError(errorToProcess.error, errorToProcess.errorState);
                }
              }
            }
          }
          attachErrorListeners() {
            if ('addEventListener' in globalThis) {
              globalThis.addEventListener('error', event => {
                this.onError(event, undefined, undefined, undefined, ErrorType.UNHANDLEDEXCEPTION);
              });
              globalThis.addEventListener('unhandledrejection', event => {
                this.onError(event, undefined, undefined, undefined, ErrorType.UNHANDLEDREJECTION);
              });
            } else {
              this.logger?.debug(`Failed to attach global error listeners.`);
            }
          }
          init(httpClient, externalSrcLoader) {
            this.httpClient = httpClient; // Below lines are only kept for backward compatibility
            // TODO: Remove this in the next major release
            if (!this.pluginEngine) {
              return;
            }
            try {
              const extPoint = 'errorReporting.init';
              const errReportingInitVal = this.pluginEngine.invokeSingle(extPoint, state, this.pluginEngine, externalSrcLoader, this.logger, true);
              if (errReportingInitVal instanceof Promise) {
                errReportingInitVal.then(client => {
                  this.errReportingClient = client;
                }).catch(err => {
                  this.logger?.error(REPORTING_PLUGIN_INIT_FAILURE_ERROR(ERROR_HANDLER), err);
                });
              }
            } catch (err) {
              this.onError(err, ERROR_HANDLER);
            }
          }
          onError(error, context = '', customMessage = '', shouldAlwaysThrow = false, errorType = ErrorType.HANDLEDEXCEPTION) {
            let normalizedError;
            let errorMessage;
            if (errorType === ErrorType.HANDLEDEXCEPTION) {
              errorMessage = processError(error); // If no error message after we normalize, then we swallow/ignore the errors
              if (!errorMessage) {
                return;
              }
              errorMessage = removeDoubleSpaces(`${context}${LOG_CONTEXT_SEPARATOR}${customMessage} ${errorMessage}`);
              normalizedError = new Error(errorMessage);
              if (isTypeOfError(error)) {
                normalizedError = Object.create(error, {
                  message: {
                    value: errorMessage
                  }
                });
              }
            } else {
              normalizedError = getNormalizedErrorForUnhandledError(error);
            }
            const isErrorReportingEnabled = state.reporting.isErrorReportingEnabled.value;
            const isErrorReportingPluginLoaded = state.reporting.isErrorReportingPluginLoaded.value;
            try {
              if (isErrorReportingEnabled) {
                const errorState = {
                  severity: 'error',
                  unhandled: errorType !== ErrorType.HANDLEDEXCEPTION,
                  severityReason: {
                    type: errorType
                  }
                };
                if (!isErrorReportingPluginLoaded) { // buffer the error
                  this.errorBuffer.enqueue({
                    error: normalizedError,
                    errorState
                  });
                } else if (normalizedError) {
                  this.notifyError(normalizedError, errorState);
                }
              }
            } catch (e) {
              this.logger?.error(NOTIFY_FAILURE_ERROR(ERROR_HANDLER), e);
            }
            if (errorType === ErrorType.HANDLEDEXCEPTION) {
              if (this.logger) {
                this.logger.error(errorMessage);
                if (shouldAlwaysThrow) {
                  throw normalizedError;
                }
              } else {
                throw normalizedError;
              }
            } else if (error.error?.stack?.includes(MANUAL_ERROR_IDENTIFIER)) {
              this.logger?.error('An unknown error occurred:', error.error?.message);
            }
          }
          /**
           * Add breadcrumbs to add insight of a user's journey before an error
           * occurred and send to external error monitoring service via a plugin
           *
           * @param {string} breadcrumb breadcrumbs message
           */
          leaveBreadcrumb(breadcrumb) {
            if (this.pluginEngine) {
              try {
                this.pluginEngine.invokeSingle('errorReporting.breadcrumb', this.pluginEngine, // deprecated parameter
                  this.errReportingClient, // deprecated parameter
                  breadcrumb, this.logger, state);
              } catch (err) {
                this.onError(err, ERROR_HANDLER, 'errorReporting.breadcrumb');
              }
            }
          }
          /**
           * Send handled errors to external error monitoring service via a plugin
           *
           * @param {Error} error Error instance from handled error
           */
          notifyError(error, errorState) {
            if (this.pluginEngine && this.httpClient) {
              try {
                this.pluginEngine.invokeSingle('errorReporting.notify', this.pluginEngine, // deprecated parameter
                  this.errReportingClient, // deprecated parameter
                  error, state, this.logger, this.httpClient, errorState);
              } catch (err) { // Not calling onError here as we don't want to go into infinite loop
                this.logger?.error(NOTIFY_FAILURE_ERROR(ERROR_HANDLER), err);
              }
            }
          }
        }
        const defaultErrorHandler = new ErrorHandler(defaultLogger, defaultPluginEngine);

        /**
         * A function to filter and return non cloud mode destinations
         * @param destination
         *
         * @returns boolean
         */
        const isNonCloudDestination = destination => Boolean(destination.config.connectionMode !== 'cloud' || destination.config.useNativeSDKToSend === true || // this is the older flag for hybrid mode destinations
          destination.config.useNativeSDK === true);
        const isHybridModeDestination = destination => Boolean(destination.config.connectionMode === 'hybrid' || destination.config.useNativeSDKToSend === true);
        /**
         * A function to filter and return non cloud mode destinations
         * @param destinations
         *
         * @returns destinations
         */
        const getNonCloudDestinations = destinations => destinations.filter(isNonCloudDestination);

        /**
         * List of plugin names that are loaded as dynamic imports in modern builds
         */
        const pluginNamesList = ['BeaconQueue', 'Bugsnag', // deprecated
          'CustomConsentManager', 'DeviceModeDestinations', 'DeviceModeTransformation', 'ErrorReporting', 'ExternalAnonymousId', 'GoogleLinker', 'IubendaConsentManager', 'KetchConsentManager', 'NativeDestinationQueue', 'OneTrustConsentManager', 'StorageEncryption', 'StorageEncryptionLegacy', 'StorageMigrator', 'XhrQueue'
        ];

        const remotesMap = {
          'rudderAnalyticsRemotePlugins': {
            url: () => Promise.resolve(window.RudderStackGlobals && window.RudderStackGlobals.app && window.RudderStackGlobals.app.pluginsCDNPath ? `${window.RudderStackGlobals.app.pluginsCDNPath}/rsa-plugins.js` : `_ext/cdn.rudderlabs.com/v3/modern/plugins/rsa-plugins.js`),
            format: 'esm',
            from: 'vite'
          }
        };
        const loadJS = async (url, fn) => {
          const resolvedUrl = typeof url === 'function' ? await url() : url;
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.onload = fn;
          script.src = resolvedUrl;
          document.getElementsByTagName('head')[0].appendChild(script);
        };

        function merge(obj1, obj2) {
          const mergedObj = Object.assign(obj1, obj2);
          for (const key of Object.keys(mergedObj)) {
            if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
              mergedObj[key] = merge(mergedObj[key], obj2[key]);
            }
          }
          return mergedObj;
        }

        const wrapShareModule = remoteFrom => {
          return merge({

          }, (globalThis.__federation_shared__ || {})['default'] || {});
        };

        async function __federation_method_ensure(remoteId) {
          const remote = remotesMap[remoteId];
          if (!remote.inited) {
            if ('var' === remote.format) {
              // loading js with script tag
              return new Promise(resolve => {
                const callback = () => {
                  if (!remote.inited) {
                    remote.lib = window[remoteId];
                    remote.lib.init(wrapShareModule(remote.from));
                    remote.inited = true;
                  }
                  resolve(remote.lib);
                };
                return loadJS(remote.url, callback);
              });
            } else if (['esm', 'systemjs'].includes(remote.format)) {
              // loading js with import(...)
              return new Promise((resolve, reject) => {
                const getUrl = typeof remote.url === 'function' ? remote.url : () => Promise.resolve(remote.url);
                getUrl().then(url => {
                  import( /* webpackIgnore: true */ /* @vite-ignore */ url).then(lib => {
                    if (!remote.inited) {
                      const shareScope = wrapShareModule(remote.from);
                      lib.init(shareScope);
                      remote.lib = lib;
                      remote.lib.init(shareScope);
                      remote.inited = true;
                    }
                    resolve(remote.lib);
                  }).catch(reject);
                });
              })
            }
          } else {
            return remote.lib;
          }
        }

        function __federation_method_wrapDefault(module, need) {
          if (!module?.default && need) {
            let obj = Object.create(null);
            obj.default = module;
            obj.__esModule = true;
            return obj;
          }
          return module;
        }

        function __federation_method_getRemote(remoteName, componentName) {
          return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
        }

        /**
         * Get the lazy loaded dynamic import for a plugin name
         */
        const getFederatedModuleImport = pluginName => {
          switch (pluginName) {
            case 'BeaconQueue':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./BeaconQueue").then(module => __federation_method_wrapDefault(module, true));
            case 'Bugsnag':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./Bugsnag").then(module => __federation_method_wrapDefault(module, true));
            case 'CustomConsentManager':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./CustomConsentManager").then(module => __federation_method_wrapDefault(module, true));
            case 'DeviceModeDestinations':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./DeviceModeDestinations").then(module => __federation_method_wrapDefault(module, true));
            case 'DeviceModeTransformation':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./DeviceModeTransformation").then(module => __federation_method_wrapDefault(module, true));
            case 'ErrorReporting':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./ErrorReporting").then(module => __federation_method_wrapDefault(module, true));
            case 'ExternalAnonymousId':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./ExternalAnonymousId").then(module => __federation_method_wrapDefault(module, true));
            case 'GoogleLinker':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./GoogleLinker").then(module => __federation_method_wrapDefault(module, true));
            case 'KetchConsentManager':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./KetchConsentManager").then(module => __federation_method_wrapDefault(module, true));
            case 'IubendaConsentManager':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./IubendaConsentManager").then(module => __federation_method_wrapDefault(module, true));
            case 'NativeDestinationQueue':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./NativeDestinationQueue").then(module => __federation_method_wrapDefault(module, true));
            case 'OneTrustConsentManager':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./OneTrustConsentManager").then(module => __federation_method_wrapDefault(module, true));
            case 'StorageEncryption':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./StorageEncryption").then(module => __federation_method_wrapDefault(module, true));
            case 'StorageEncryptionLegacy':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./StorageEncryptionLegacy").then(module => __federation_method_wrapDefault(module, true));
            case 'StorageMigrator':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./StorageMigrator").then(module => __federation_method_wrapDefault(module, true));
            case 'XhrQueue':
              return () => __federation_method_getRemote("rudderAnalyticsRemotePlugins", "./XhrQueue").then(module => __federation_method_wrapDefault(module, true));
            default:
              return undefined;
          }
        };
        /**
         * Map of active plugin names to their dynamic import
         */
        const federatedModulesBuildPluginImports = activePluginNames => {
          const remotePlugins = {};
          activePluginNames.forEach(pluginName => {
            if (pluginNamesList.includes(pluginName)) {
              const lazyLoadImport = getFederatedModuleImport(pluginName);
              if (lazyLoadImport) {
                remotePlugins[pluginName] = lazyLoadImport;
              }
            }
          });
          return remotePlugins;
        };

        /**
         * Map of mandatory plugin names and direct imports
         */
        const getMandatoryPluginsMap = () => ({});
        /**
         * Map of optional plugin names and direct imports for legacy builds
         */
        const getOptionalPluginsMap = () => {
          {
            return {};
          }
        };
        /**
         * Map of optional plugin names and dynamic imports for modern builds
         */
        const getRemotePluginsMap = activePluginNames => {
          return federatedModulesBuildPluginImports?.(activePluginNames) || {};
        };
        const pluginsInventory = {
          ...getMandatoryPluginsMap(),
          ...getOptionalPluginsMap()
        };
        const remotePluginsInventory = activePluginNames => ({
          ...getRemotePluginsMap(activePluginNames)
        });

        // TODO: add retry mechanism for getting remote plugins
        // TODO: add timeout error mechanism for marking remote plugins that failed to load as failed in state
        class PluginsManager {
          constructor(engine, errorHandler, logger) {
            this.engine = engine;
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.onError = this.onError.bind(this);
          }
          /**
           * Orchestrate the plugin loading and registering
           */
          init() {
            state.lifecycle.status.value = 'pluginsLoading'; // Expose pluginsCDNPath to global object, so it can be used in the promise that determines
            // remote plugin cdn path to support proxied plugin remotes
            {
              setExposedGlobal('pluginsCDNPath', state.lifecycle.pluginsCDNPath.value);
            }
            this.setActivePlugins();
            this.registerLocalPlugins();
            this.registerRemotePlugins();
            this.attachEffects();
          }
          /**
           * Update state based on plugin loaded status
           */ // eslint-disable-next-line class-methods-use-this
          attachEffects() {
            E(() => {
              const isAllPluginsReady = state.plugins.activePlugins.value.length === 0 || state.plugins.loadedPlugins.value.length + state.plugins.failedPlugins.value.length === state.plugins.totalPluginsToLoad.value;
              if (isAllPluginsReady) {
                r(() => {
                  state.plugins.ready.value = true; // TODO: decide what to do if a plugin fails to load for any reason.
                  //  Should we stop here or should we progress?
                  state.lifecycle.status.value = 'pluginsReady';
                });
              }
            });
          }
          /**
           * Determine the list of plugins that should be loaded based on sourceConfig & load options
           */ // eslint-disable-next-line class-methods-use-this
          getPluginsToLoadBasedOnConfig() { // This contains the default plugins if load option has been omitted by user
            let pluginsToLoadFromConfig = state.plugins.pluginsToLoadFromConfig.value;
            if (!pluginsToLoadFromConfig) {
              return [];
            } // TODO: Uncomment below lines after removing deprecated plugin
            // Filter deprecated plugins
            // pluginsToLoadFromConfig = pluginsToLoadFromConfig.filter(pluginName => {
            //   if (deprecatedPluginsList.includes(pluginName)) {
            //     this.logger?.warn(DEPRECATED_PLUGIN_WARNING(PLUGINS_MANAGER, pluginName));
            //     return false;
            //   }
            //   return true;
            // });
            const pluginGroupsToProcess = [{
              configurationStatus: () => isDefined(state.dataPlaneEvents.eventsQueuePluginName.value),
              configurationStatusStr: 'Data plane events delivery is enabled',
              activePluginName: state.dataPlaneEvents.eventsQueuePluginName.value,
              supportedPlugins: Object.values(DataPlaneEventsTransportToPluginNameMap),
              shouldAddMissingPlugins: true
            }, {
              configurationStatus: () => state.reporting.isErrorReportingEnabled.value,
              configurationStatusStr: 'Error reporting is enabled',
              supportedPlugins: ['ErrorReporting', 'Bugsnag'] // TODO: Remove deprecated plugin- Bugsnag
            }, {
              configurationStatus: () => getNonCloudDestinations(state.nativeDestinations.configuredDestinations.value).length > 0,
              configurationStatusStr: 'Device mode destinations are connected to the source',
              supportedPlugins: ['DeviceModeDestinations', 'NativeDestinationQueue']
            }, {
              configurationStatus: () => getNonCloudDestinations(state.nativeDestinations.configuredDestinations.value).some(destination => destination.shouldApplyDeviceModeTransformation),
              configurationStatusStr: 'Device mode transformations are enabled for at least one destination',
              supportedPlugins: ['DeviceModeTransformation']
            }, {
              configurationStatus: () => isDefined(state.consents.activeConsentManagerPluginName.value),
              configurationStatusStr: 'Consent management is enabled',
              activePluginName: state.consents.activeConsentManagerPluginName.value,
              supportedPlugins: Object.values(ConsentManagersToPluginNameMap)
            }, {
              configurationStatus: () => isDefined(state.storage.encryptionPluginName.value),
              configurationStatusStr: 'Storage encryption is enabled',
              activePluginName: state.storage.encryptionPluginName.value,
              supportedPlugins: Object.values(StorageEncryptionVersionsToPluginNameMap)
            }, {
              configurationStatus: () => state.storage.migrate.value,
              configurationStatusStr: 'Storage migration is enabled',
              supportedPlugins: ['StorageMigrator']
            }];
            const addMissingPlugins = false;
            pluginGroupsToProcess.forEach(group => {
              if (group.configurationStatus()) {
                pluginsToLoadFromConfig = pluginsToLoadFromConfig.filter(group.activePluginName ? pluginName => !(pluginName !== group.activePluginName && group.supportedPlugins.includes(pluginName)) : pluginName => isDefined(pluginName) // pass through
                );
                this.addMissingPlugins(group, addMissingPlugins, pluginsToLoadFromConfig);
              } else {
                pluginsToLoadFromConfig = pluginsToLoadFromConfig.filter(group.basePlugins !== undefined ? pluginName => !(group.basePlugins.includes(pluginName) || group.supportedPlugins.includes(pluginName)) : pluginName => !group.supportedPlugins.includes(pluginName));
              }
            });
            return [...Object.keys(getMandatoryPluginsMap()), ...pluginsToLoadFromConfig];
          }
          addMissingPlugins(group, addMissingPlugins, pluginsToLoadFromConfig) {
            const shouldAddMissingPlugins = group.shouldAddMissingPlugins || addMissingPlugins;
            let pluginsToConfigure;
            if (group.activePluginName) {
              pluginsToConfigure = [...(group.basePlugins || []), group.activePluginName];
            } else {
              pluginsToConfigure = [...group.supportedPlugins];
            }
            const missingPlugins = pluginsToConfigure.filter(pluginName => !pluginsToLoadFromConfig.includes(pluginName));
            if (missingPlugins.length > 0) {
              if (shouldAddMissingPlugins) {
                pluginsToLoadFromConfig.push(...missingPlugins);
              }
              this.logger?.warn(generateMisconfiguredPluginsWarning(PLUGINS_MANAGER, group.configurationStatusStr, missingPlugins, shouldAddMissingPlugins));
            }
          }
          /**
           * Determine the list of plugins that should be activated
           */
          setActivePlugins() {
            const pluginsToLoad = this.getPluginsToLoadBasedOnConfig(); // Merging available mandatory and optional plugin name list
            const availablePlugins = [...Object.keys(pluginsInventory), ...pluginNamesList];
            const activePlugins = [];
            const failedPlugins = [];
            pluginsToLoad.forEach(pluginName => {
              if (availablePlugins.includes(pluginName)) {
                activePlugins.push(pluginName);
              } else {
                failedPlugins.push(pluginName);
              }
            });
            if (failedPlugins.length > 0) {
              this.onError(new Error(`Ignoring loading of unknown plugins: ${failedPlugins.join(',')}. Mandatory plugins: ${Object.keys(getMandatoryPluginsMap()).join(',')}. Load option plugins: ${state.plugins.pluginsToLoadFromConfig.value.join(',')}`));
            }
            r(() => {
              state.plugins.totalPluginsToLoad.value = pluginsToLoad.length;
              state.plugins.activePlugins.value = activePlugins;
              state.plugins.failedPlugins.value = failedPlugins;
            });
          }
          /**
           * Register plugins that are direct imports to PluginEngine
           */
          registerLocalPlugins() {
            Object.values(pluginsInventory).forEach(localPlugin => {
              if (isFunction(localPlugin) && state.plugins.activePlugins.value.includes(localPlugin().name)) {
                this.register([localPlugin()]);
              }
            });
          }
          /**
           * Register plugins that are dynamic imports to PluginEngine
           */
          registerRemotePlugins() {
            const remotePluginsList = remotePluginsInventory(state.plugins.activePlugins.value);
            Promise.all(Object.keys(remotePluginsList).map(async remotePluginKey => {
              await remotePluginsList[remotePluginKey]().then(remotePluginModule => this.register([remotePluginModule.default()])).catch(err => { // TODO: add retry here if dynamic import fails
                state.plugins.failedPlugins.value = [...state.plugins.failedPlugins.value, remotePluginKey];
                this.onError(err, remotePluginKey);
              });
            })).catch(err => {
              this.onError(err);
            });
          }
          /**
           * Extension point invoke that allows multiple plugins to be registered to it with error handling
           */
          invokeMultiple(extPoint, ...args) {
            try {
              return this.engine.invokeMultiple(extPoint, ...args);
            } catch (e) {
              this.onError(e, extPoint);
              return [];
            }
          }
          /**
           * Extension point invoke that allows a single plugin to be registered to it with error handling
           */
          invokeSingle(extPoint, ...args) {
            try {
              return this.engine.invokeSingle(extPoint, ...args);
            } catch (e) {
              this.onError(e, extPoint);
              return null;
            }
          }
          /**
           * Plugin engine register with error handling
           */
          register(plugins) {
            plugins.forEach(plugin => {
              try {
                this.engine.register(plugin, state);
              } catch (e) {
                state.plugins.failedPlugins.value = [...state.plugins.failedPlugins.value, plugin.name];
                this.onError(e);
              }
            });
          } // TODO: Implement reset API instead
          unregisterLocalPlugins() {
            Object.values(pluginsInventory).forEach(localPlugin => {
              try {
                this.engine.unregister(localPlugin().name);
              } catch (e) {
                this.onError(e);
              }
            });
          }
          /**
           * Handle errors
           */
          onError(error, customMessage) {
            if (this.errorHandler) {
              this.errorHandler.onError(error, PLUGINS_MANAGER, customMessage);
            } else {
              throw error;
            }
          }
        }

        /**
         * Utility to parse XHR JSON response
         */
        const responseTextToJson = (responseText, onError) => {
          try {
            return JSON.parse(responseText || '');
          } catch (err) {
            const error = getMutatedError(err, 'Failed to parse response data');
            if (isFunction(onError)) {
              onError(error);
            } else {
              throw error;
            }
          }
          return undefined;
        };

        const FAILED_REQUEST_ERR_MSG_PREFIX = 'The request failed';

        const DEFAULT_XHR_REQUEST_OPTIONS = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          method: 'GET'
        };
        /**
         * Utility to create request configuration based on default options
         */
        const createXhrRequestOptions = (url, options, basicAuthHeader) => {
          const requestOptions = mergeDeepRight(DEFAULT_XHR_REQUEST_OPTIONS, options || {});
          if (basicAuthHeader) {
            requestOptions.headers = mergeDeepRight(requestOptions.headers, {
              Authorization: basicAuthHeader
            });
          }
          requestOptions.url = url;
          return requestOptions;
        };
        /**
         * Utility implementation of XHR, fetch cannot be used as it requires explicit
         * origin allowed values and not wildcard for CORS requests with credentials and
         * this is not supported by our sourceConfig API
         */
        const xhrRequest = (options, timeout = DEFAULT_XHR_TIMEOUT_MS, logger) => new Promise((resolve, reject) => {
          let payload;
          if (options.sendRawData === true) {
            payload = options.data;
          } else {
            payload = stringifyWithoutCircular(options.data, false, [], logger);
            if (isNull(payload)) {
              reject({
                error: new Error(XHR_PAYLOAD_PREP_ERROR),
                undefined,
                options
              }); // return and don't process further if the payload could not be stringified
              return;
            }
          }
          const xhr = new XMLHttpRequest(); // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const xhrReject = e => {
            reject({
              error: new Error(XHR_DELIVERY_ERROR(FAILED_REQUEST_ERR_MSG_PREFIX, xhr.status, xhr.statusText, options.url)),
              xhr,
              options
            });
          };
          const xhrError = e => {
            reject({
              error: new Error(XHR_REQUEST_ERROR(FAILED_REQUEST_ERR_MSG_PREFIX, e, options.url)),
              xhr,
              options
            });
          };
          xhr.ontimeout = xhrError;
          xhr.onerror = xhrError;
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
              resolve({
                response: xhr.responseText,
                xhr,
                options
              });
            } else {
              xhrReject();
            }
          };
          xhr.open(options.method, options.url, true);
          if (options.withCredentials === true) {
            xhr.withCredentials = true;
          } // The timeout property may be set only in the time interval between a call to the open method
          // and the first call to the send method in legacy browsers
          xhr.timeout = timeout;
          Object.keys(options.headers).forEach(headerName => {
            if (options.headers[headerName]) {
              xhr.setRequestHeader(headerName, options.headers[headerName]);
            }
          });
          try {
            xhr.send(payload);
          } catch (err) {
            reject({
              error: getMutatedError(err, XHR_SEND_ERROR(FAILED_REQUEST_ERR_MSG_PREFIX, options.url)),
              xhr,
              options
            });
          }
        });

        /**
         * Service to handle data communication with APIs
         */
        class HttpClient {
          hasErrorHandler = false;
          constructor(errorHandler, logger) {
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.hasErrorHandler = Boolean(this.errorHandler);
            this.onError = this.onError.bind(this);
          }
          /**
           * Implement requests in a blocking way
           */
          async getData(config) {
            const {
              url,
              options,
              timeout,
              isRawResponse
            } = config;
            try {
              const data = await xhrRequest(createXhrRequestOptions(url, options, this.basicAuthHeader), timeout, this.logger);
              return {
                data: isRawResponse ? data.response : responseTextToJson(data.response, this.onError),
                details: data
              };
            } catch (reason) {
              this.onError(reason.error ?? reason);
              return {
                data: undefined,
                details: reason
              };
            }
          }
          /**
           * Implement requests in a non-blocking way
           */
          getAsyncData(config) {
            const {
              callback,
              url,
              options,
              timeout,
              isRawResponse
            } = config;
            const isFireAndForget = !isFunction(callback);
            xhrRequest(createXhrRequestOptions(url, options, this.basicAuthHeader), timeout, this.logger).then(data => {
              if (!isFireAndForget) {
                callback(isRawResponse ? data.response : responseTextToJson(data.response, this.onError), data);
              }
            }).catch(data => {
              this.onError(data.error ?? data);
              if (!isFireAndForget) {
                callback(undefined, data);
              }
            });
          }
          /**
           * Handle errors
           */
          onError(error) {
            if (this.hasErrorHandler) {
              this.errorHandler?.onError(error, HTTP_CLIENT);
            } else {
              throw error;
            }
          }
          /**
           * Set basic authentication header (eg writekey)
           */
          setAuthHeader(value, noBtoa = false) {
            const authVal = noBtoa ? value : toBase64(`${value}:`);
            this.basicAuthHeader = `Basic ${authVal}`;
          }
          /**
           * Clear basic authentication header
           */
          resetAuthHeader() {
            this.basicAuthHeader = undefined;
          }
        }
        const defaultHttpClient = new HttpClient(defaultErrorHandler, defaultLogger);

        const COOKIE_STORAGE = 'cookieStorage';
        const LOCAL_STORAGE = 'localStorage';
        const SESSION_STORAGE = 'sessionStorage';
        const MEMORY_STORAGE = 'memoryStorage';
        const NO_STORAGE = 'none';

        const userIdKey = 'rl_user_id';
        const userTraitsKey = 'rl_trait';
        const anonymousUserIdKey = 'rl_anonymous_id';
        const groupIdKey = 'rl_group_id';
        const groupTraitsKey = 'rl_group_trait';
        const pageInitialReferrerKey = 'rl_page_init_referrer';
        const pageInitialReferringDomainKey = 'rl_page_init_referring_domain';
        const sessionInfoKey = 'rl_session';
        const authTokenKey = 'rl_auth_token';
        const COOKIE_KEYS = {
          userId: userIdKey,
          userTraits: userTraitsKey,
          anonymousId: anonymousUserIdKey,
          groupId: groupIdKey,
          groupTraits: groupTraitsKey,
          initialReferrer: pageInitialReferrerKey,
          initialReferringDomain: pageInitialReferringDomainKey,
          sessionInfo: sessionInfoKey,
          authToken: authTokenKey
        };

        const STORAGE_TEST_COOKIE = 'test_rudder_cookie';
        const STORAGE_TEST_LOCAL_STORAGE = 'test_rudder_ls';
        const STORAGE_TEST_SESSION_STORAGE = 'test_rudder_ss';
        const STORAGE_TEST_TOP_LEVEL_DOMAIN = '__tld__';
        const CLIENT_DATA_STORE_COOKIE = 'clientDataInCookie';
        const CLIENT_DATA_STORE_LS = 'clientDataInLocalStorage';
        const CLIENT_DATA_STORE_MEMORY = 'clientDataInMemory';
        const CLIENT_DATA_STORE_SESSION = 'clientDataInSessionStorage';
        const USER_SESSION_KEYS = ['userId', 'userTraits', 'anonymousId', 'groupId', 'groupTraits', 'initialReferrer', 'initialReferringDomain', 'sessionInfo', 'authToken'];

        const storageClientDataStoreNameMap = {
          [COOKIE_STORAGE]: CLIENT_DATA_STORE_COOKIE,
          [LOCAL_STORAGE]: CLIENT_DATA_STORE_LS,
          [MEMORY_STORAGE]: CLIENT_DATA_STORE_MEMORY,
          [SESSION_STORAGE]: CLIENT_DATA_STORE_SESSION
        };

        const COOKIE_DATA_ENCODING_ERROR = `Failed to encode the cookie data.`;

        /**
         * Encode.
         */
        const encode = (value, logger) => {
          try {
            return encodeURIComponent(value);
          } catch (err) {
            logger?.error(COOKIE_DATA_ENCODING_ERROR, err);
            return undefined;
          }
        };
        /**
         * Decode
         */
        const decode = value => {
          try {
            return decodeURIComponent(value);
          } catch (err) { // Do nothing as non-RS SDK cookies may not be URI encoded
            return undefined;
          }
        };
        /**
         * Parse cookie `str`
         */
        const parse = str => {
          const obj = {};
          const pairs = str.split(/\s*;\s*/);
          let pair;
          if (!pairs[0]) {
            return obj;
          } // TODO: Decode only the cookies that are needed by the SDK
          pairs.forEach(pairItem => {
            pair = pairItem.split('=');
            const keyName = pair[0] ? decode(pair[0]) : undefined;
            if (keyName) {
              obj[keyName] = pair[1] ? decode(pair[1]) : undefined;
            }
          });
          return obj;
        };
        /**
         * Set cookie `name` to `value`
         */
        const set = (name, value, optionsConfig, logger) => {
          const options = {
            ...(optionsConfig || {})
          };
          let cookieString = `${encode(name,logger)}=${encode(value,logger)}`;
          if (isNull(value)) {
            options.maxage = -1;
          }
          if (options.maxage) {
            options.expires = new Date(+new Date() + options.maxage);
          }
          if (options.path) {
            cookieString += `; path=${options.path}`;
          }
          if (options.domain) {
            cookieString += `; domain=${options.domain}`;
          }
          if (options.expires) {
            cookieString += `; expires=${options.expires.toUTCString()}`;
          }
          if (options.samesite) {
            cookieString += `; samesite=${options.samesite}`;
          }
          if (options.secure) {
            cookieString += `; secure`;
          }
          globalThis.document.cookie = cookieString;
        };
        /**
         * Return all cookies
         */
        const all = () => {
          const cookieStringValue = globalThis.document.cookie;
          return parse(cookieStringValue);
        };
        /**
         * Get cookie `name`
         */
        const get = name => all()[name];
        /**
         * Set or get cookie `name` with `value` and `options` object
         */ // eslint-disable-next-line func-names
        const cookie = function(name, value, options, logger) {
          switch (arguments.length) {
            case 4:
            case 3:
            case 2:
              return set(name, value, options, logger);
            case 1:
              if (name) {
                return get(name);
              }
              return all();
            default:
              return all();
          }
        };

        const detectAdBlockers = (errorHandler, logger) => { // Apparently, '?view=ad' is a query param that is blocked by majority of adblockers
          // Use source config URL here as it is very unlikely to be blocked by adblockers
          // Only the extra query param should make it vulnerable to adblockers
          // This will work even if the users proxies it.
          // The edge case where this doesn't work is when HEAD method is not allowed by the server (user's)
          const baseUrl = new URL(state.lifecycle.sourceConfigUrl.value);
          const url = `${baseUrl.origin}${baseUrl.pathname}?view=ad`;
          const httpClient = new HttpClient(errorHandler, logger);
          httpClient.setAuthHeader(state.lifecycle.writeKey.value);
          httpClient.getAsyncData({
            url,
            options: { // We actually don't need the response from the request, so we are using HEAD
              method: 'HEAD',
              headers: {
                'Content-Type': undefined
              }
            },
            isRawResponse: true,
            callback: (result, details) => { // not ad blocked if the request is successful or it is not internally redirected on the client side
              // Often adblockers instead of blocking the request, they redirect it to an internal URL
              state.capabilities.isAdBlocked.value = details?.error !== undefined || details?.xhr?.responseURL !== url;
            }
          });
        };

        const hasCrypto = () => !isNullOrUndefined(globalThis.crypto) && isFunction(globalThis.crypto.getRandomValues); // eslint-disable-next-line compat/compat -- We are checking for the existence of navigator.userAgentData
        const hasUAClientHints = () => !isNullOrUndefined(globalThis.navigator.userAgentData);
        const hasBeacon = () => !isNullOrUndefined(globalThis.navigator.sendBeacon) && isFunction(globalThis.navigator.sendBeacon);
        const isIE11 = () => Boolean(globalThis.navigator.userAgent.match(/Trident.*rv:11\./));

        const getUserAgentClientHint = (callback, level = 'none') => {
          if (level === 'none') {
            callback(undefined);
          }
          if (level === 'default') {
            callback(navigator.userAgentData);
          }
          if (level === 'full') {
            navigator.userAgentData?.getHighEntropyValues(['architecture', 'bitness', 'brands', 'mobile', 'model', 'platform', 'platformVersion', 'uaFullVersion', 'fullVersionList', 'wow64']).then(ua => {
              callback(ua);
            }).catch(() => {
              callback();
            });
          }
        };

        const isDatasetAvailable = () => {
          const testElement = globalThis.document.createElement('div');
          testElement.setAttribute('data-a-b', 'c');
          return testElement.dataset ? testElement.dataset.aB === 'c' : false;
        };
        const legacyJSEngineRequiredPolyfills = { // Ideally, we should separate the checks for URL and URLSearchParams but
          // the polyfill service serves them under the same feature name, "URL".
          URL: () => !isFunction(globalThis.URL) || !isFunction(globalThis.URLSearchParams),
          Promise: () => !isFunction(globalThis.Promise),
          'Number.isNaN': () => !isFunction(globalThis.Number.isNaN),
          'Number.isInteger': () => !isFunction(globalThis.Number.isInteger),
          'Array.from': () => !isFunction(globalThis.Array.from),
          'Array.prototype.find': () => !isFunction(globalThis.Array.prototype.find),
          'Array.prototype.includes': () => !isFunction(globalThis.Array.prototype.includes),
          'String.prototype.endsWith': () => !isFunction(globalThis.String.prototype.endsWith),
          'String.prototype.startsWith': () => !isFunction(globalThis.String.prototype.startsWith),
          'String.prototype.includes': () => !isFunction(globalThis.String.prototype.includes),
          'String.prototype.replaceAll': () => !isFunction(globalThis.String.prototype.replaceAll),
          'String.fromCodePoint': () => !isFunction(globalThis.String.fromCodePoint),
          'Object.entries': () => !isFunction(globalThis.Object.entries),
          'Object.values': () => !isFunction(globalThis.Object.values),
          'Object.assign': () => !isFunction(globalThis.Object.assign),
          'Object.fromEntries': () => !isFunction(globalThis.Object.fromEntries),
          'Element.prototype.dataset': () => !isDatasetAvailable(), // Ideally, we should separate the checks for TextEncoder and TextDecoder but
          // the polyfill service serves them under the same feature name, "TextEncoder".
          TextEncoder: () => !isFunction(globalThis.TextEncoder) || !isFunction(globalThis.TextDecoder),
          requestAnimationFrame: () => !isFunction(globalThis.requestAnimationFrame) || !isFunction(globalThis.cancelAnimationFrame),
          CustomEvent: () => !isFunction(globalThis.CustomEvent),
          'navigator.sendBeacon': () => !isFunction(globalThis.navigator.sendBeacon), // Note, the polyfill service serves both ArrayBuffer and Uint8Array under the same feature name, "ArrayBuffer".
          ArrayBuffer: () => !isFunction(globalThis.Uint8Array),
          Set: () => !isFunction(globalThis.Set),
          atob: () => !isFunction(globalThis.atob)
        };
        const isLegacyJSEngine = () => {
          const requiredCapabilitiesList = Object.keys(legacyJSEngineRequiredPolyfills);
          let needsPolyfill = false; /* eslint-disable-next-line unicorn/no-for-loop */
          for (let i = 0; i < requiredCapabilitiesList.length; i++) {
            const isCapabilityMissing = legacyJSEngineRequiredPolyfills[requiredCapabilitiesList[i]];
            if (isFunction(isCapabilityMissing) && isCapabilityMissing()) {
              needsPolyfill = true;
              break;
            }
          }
          return needsPolyfill;
        };

        const getScreenDetails = () => {
          let screenDetails = {
            density: 0,
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0
          };
          screenDetails = {
            width: globalThis.screen.width,
            height: globalThis.screen.height,
            density: globalThis.devicePixelRatio,
            innerWidth: globalThis.innerWidth,
            innerHeight: globalThis.innerHeight
          };
          return screenDetails;
        };

        const isStorageQuotaExceeded = e => {
          const matchingNames = ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED']; // [everything except Firefox, Firefox]
          const matchingCodes = [22, 1014]; // [everything except Firefox, Firefox]
          const isQuotaExceededError = matchingNames.includes(e.name) || matchingCodes.includes(e.code);
          return e instanceof DOMException && isQuotaExceededError;
        }; // TODO: also check for SecurityErrors
        //  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#exceptions
        const isStorageAvailable = (type = LOCAL_STORAGE, storageInstance, logger) => {
          let storage;
          let testData;
          const msgPrefix = STORAGE_UNAVAILABILITY_ERROR_PREFIX(CAPABILITIES_MANAGER, type);
          let reason = 'unavailable';
          let isAccessible = true;
          let errObj;
          try {
            switch (type) {
              case MEMORY_STORAGE:
                return true;
              case COOKIE_STORAGE:
                storage = storageInstance;
                testData = STORAGE_TEST_COOKIE;
                break;
              case LOCAL_STORAGE:
                storage = storageInstance ?? globalThis.localStorage;
                testData = STORAGE_TEST_LOCAL_STORAGE; // was STORAGE_TEST_LOCAL_STORAGE in ours and generateUUID() in segment retry one
                break;
              case SESSION_STORAGE:
                storage = storageInstance ?? globalThis.sessionStorage;
                testData = STORAGE_TEST_SESSION_STORAGE;
                break;
              default:
                return false;
            }
            if (storage) {
              storage.setItem(testData, 'true');
              if (storage.getItem(testData)) {
                storage.removeItem(testData);
                return true;
              }
            }
            isAccessible = false;
          } catch (err) {
            isAccessible = false;
            errObj = err;
            if (isStorageQuotaExceeded(err)) {
              reason = 'full';
            }
          }
          if (!isAccessible) {
            logger?.warn(`${msgPrefix}${reason}.`, errObj);
          } // if we've have reached here, it means the storage is not available
          return false;
        };

        const legacyGetHostname = href => {
          const l = document.createElement('a');
          l.href = href;
          return l.hostname;
        };
        /**
         * Levels returns all levels of the given url
         *
         * The method returns an empty array when the hostname is an ip.
         */
        const levelsFunc = url => { // This is called before the polyfills load thus new URL cannot be used
          const host = typeof globalThis.URL !== 'function' ? legacyGetHostname(url) : new URL(url).hostname;
          const parts = host?.split('.') ?? [];
          const last = parts[parts.length - 1];
          const levels = []; // Ip address.
          if (parts.length === 4 && last && last === parseInt(last, 10).toString()) {
            return levels;
          } // Localhost.
          if (parts.length <= 1) { // Fix to support localhost
            if (parts[0] && parts[0].indexOf('localhost') !== -1) {
              return ['localhost'];
            }
            return levels;
          } // Create levels.
          for (let i = parts.length - 2; i >= 0; i -= 1) {
            levels.push(parts.slice(i).join('.'));
          }
          return levels;
        };
        /**
         * Get the top domain.
         *
         * The function constructs the levels of domain and attempts to set a global
         * cookie on each one when it succeeds it returns the top level domain.
         *
         * The method returns an empty string when the hostname is an ip.
         */
        const domain = url => {
          const levels = levelsFunc(url); // Lookup the real top level one.
          // eslint-disable-next-line unicorn/no-for-loop
          for (let i = 0; i < levels.length; i += 1) {
            const domain = levels[i];
            const cname = STORAGE_TEST_TOP_LEVEL_DOMAIN;
            const opts = {
              domain: `${domain.indexOf('localhost')!==-1?'':'.'}${domain}`
            }; // Set cookie on domain
            cookie(cname, 1, opts); // If successful
            if (cookie(cname)) { // Remove cookie from domain
              cookie(cname, null, opts);
              return domain;
            }
          }
          return '';
        };

        const getDefaultCookieOptions = () => {
          const topDomain = `.${domain(globalThis.location.href)}`;
          return {
            maxage: DEFAULT_COOKIE_MAX_AGE_MS,
            path: '/',
            domain: !topDomain || topDomain === '.' ? undefined : topDomain,
            samesite: 'Lax',
            enabled: true
          };
        };
        const getDefaultLocalStorageOptions = () => ({
          enabled: true
        });
        const getDefaultSessionStorageOptions = () => ({
          enabled: true
        });
        const getDefaultInMemoryStorageOptions = () => ({
          enabled: true
        });

        /**
         * A storage utility to persist values in cookies via Storage interface
         */
        class CookieStorage {
          static globalSingleton = null;
          isSupportAvailable = true;
          isEnabled = true;
          length = 0;
          constructor(options = {}, logger) {
            if (CookieStorage.globalSingleton) { // eslint-disable-next-line no-constructor-return
              return CookieStorage.globalSingleton;
            }
            this.options = getDefaultCookieOptions();
            this.logger = logger;
            this.configure(options);
            CookieStorage.globalSingleton = this;
          }
          configure(options) {
            this.options = mergeDeepRight(this.options ?? {}, options);
            if (options.sameDomainCookiesOnly) {
              delete this.options.domain;
            }
            this.isSupportAvailable = isStorageAvailable(COOKIE_STORAGE, this);
            this.isEnabled = Boolean(this.options.enabled && this.isSupportAvailable);
            return this.options;
          }
          setItem(key, value) {
            cookie(key, value, this.options, this.logger);
            this.length = Object.keys(cookie()).length;
            return true;
          } // eslint-disable-next-line class-methods-use-this
          getItem(key) {
            const value = cookie(key);
            return isUndefined(value) ? null : value;
          }
          removeItem(key) {
            const result = this.setItem(key, null);
            this.length = Object.keys(cookie()).length;
            return result;
          } // eslint-disable-next-line class-methods-use-this
          clear() { // Not implemented
            // getting a list of all cookie storage keys and remove all values
            // sounds risky to do as it will take on all top domain cookies
            // better to explicitly clear specific ones if needed
          }
          key(index) {
            const curKeys = this.keys();
            return curKeys[index] ?? null;
          } // eslint-disable-next-line class-methods-use-this
          keys() {
            return Object.keys(cookie());
          }
        }

        /**
         * A storage utility to retain values in memory via Storage interface
         */
        class InMemoryStorage {
          isEnabled = true;
          length = 0;
          data = {};
          constructor(options, logger) {
            this.options = getDefaultInMemoryStorageOptions();
            this.logger = logger;
            this.configure(options ?? {});
          }
          configure(options) {
            this.options = mergeDeepRight(this.options, options);
            this.isEnabled = Boolean(this.options.enabled);
            return this.options;
          }
          setItem(key, value) {
            this.data[key] = value;
            this.length = Object.keys(this.data).length;
            return value;
          }
          getItem(key) {
            if (key in this.data) {
              return this.data[key];
            }
            return null;
          }
          removeItem(key) {
            if (key in this.data) {
              delete this.data[key];
            }
            this.length = Object.keys(this.data).length;
            return null;
          }
          clear() {
            this.data = {};
            this.length = 0;
          }
          key(index) {
            const curKeys = this.keys();
            return curKeys[index] ?? null;
          }
          keys() {
            return Object.keys(this.data);
          }
        }
        const defaultInMemoryStorage = new InMemoryStorage({}, defaultLogger);

        function getDefaultExportFromCjs(x) {
          return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
        }

        var store$2 = {
          exports: {}
        };

        var store$1 = store$2.exports;
        var hasRequiredStore;

        function requireStore() {
          if (hasRequiredStore) return store$2.exports;
          hasRequiredStore = 1;
          (function(module, exports) {
            (function(global, factory) {
              module.exports = factory();
            })(store$1, function() {
              function isJSON(obj) {
                obj = JSON.stringify(obj);
                if (!/^\{[\s\S]*\}$/.test(obj)) {
                  return false;
                }
                return true;
              }

              function stringify(val) {
                return val === undefined || typeof val === "function" ? val + '' : JSON.stringify(val);
              }

              function deserialize(value) {
                if (typeof value !== 'string') {
                  return undefined;
                }
                try {
                  return JSON.parse(value);
                } catch (e) {
                  return value;
                }
              }

              function isFunction(value) {
                return {}.toString.call(value) === "[object Function]";
              }

              function isArray(value) {
                return Object.prototype.toString.call(value) === "[object Array]";
              } // https://github.com/jaywcjlove/store.js/pull/8
              // Error: QuotaExceededError
              function dealIncognito(storage) {
                var _KEY = '_Is_Incognit',
                  _VALUE = 'yes';
                try { // NOTE: set default storage when not passed in
                  if (!storage) {
                    storage = window.localStorage;
                  }
                  storage.setItem(_KEY, _VALUE);
                  storage.removeItem(_KEY);
                } catch (e) {
                  var inMemoryStorage = {};
                  inMemoryStorage._data = {};
                  inMemoryStorage.setItem = function(id, val) {
                    return inMemoryStorage._data[id] = String(val);
                  };
                  inMemoryStorage.getItem = function(id) {
                    return inMemoryStorage._data.hasOwnProperty(id) ? inMemoryStorage._data[id] : undefined;
                  };
                  inMemoryStorage.removeItem = function(id) {
                    return delete inMemoryStorage._data[id];
                  };
                  inMemoryStorage.clear = function() {
                    return inMemoryStorage._data = {};
                  };
                  storage = inMemoryStorage;
                } finally {
                  if (storage.getItem(_KEY) === _VALUE) storage.removeItem(_KEY);
                }
                return storage;
              } // deal QuotaExceededError if user use incognito mode in browser
              var storage = dealIncognito();

              function Store() {
                if (!(this instanceof Store)) {
                  return new Store();
                }
              }
              Store.prototype = {
                set: function set(key, val) {
                  if (key && !isJSON(key)) {
                    storage.setItem(key, stringify(val));
                  } else if (isJSON(key)) {
                    for (var a in key) this.set(a, key[a]);
                  }
                  return this;
                },
                get: function get(key) { // Return all entries if no key
                  if (key === undefined) {
                    var ret = {};
                    this.forEach(function(key, val) {
                      return ret[key] = val;
                    });
                    return ret;
                  }
                  if (key.charAt(0) === '?') {
                    return this.has(key.substr(1));
                  }
                  var args = arguments;
                  if (args.length > 1) {
                    var dt = {};
                    for (var i = 0, len = args.length; i < len; i++) {
                      var value = deserialize(storage.getItem(args[i]));
                      if (this.has(args[i])) {
                        dt[args[i]] = value;
                      }
                    }
                    return dt;
                  }
                  return deserialize(storage.getItem(key));
                },
                clear: function clear() {
                  storage.clear();
                  return this;
                },
                remove: function remove(key) {
                  var val = this.get(key);
                  storage.removeItem(key);
                  return val;
                },
                has: function has(key) {
                  return {}.hasOwnProperty.call(this.get(), key);
                },
                keys: function keys() {
                  var d = [];
                  this.forEach(function(k) {
                    d.push(k);
                  });
                  return d;
                },
                forEach: function forEach(callback) {
                  for (var i = 0, len = storage.length; i < len; i++) {
                    var key = storage.key(i);
                    callback(key, this.get(key));
                  }
                  return this;
                },
                search: function search(str) {
                  var arr = this.keys(),
                    dt = {};
                  for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].indexOf(str) > -1) dt[arr[i]] = this.get(arr[i]);
                  }
                  return dt;
                },
                len: function len() {
                  return storage.length;
                }
              };
              var _Store = null;

              function store(key, data) {
                var argm = arguments;
                var dt = null;
                if (!_Store) _Store = Store();
                if (argm.length === 0) return _Store.get();
                if (argm.length === 1) {
                  if (typeof key === "string") return _Store.get(key);
                  if (isJSON(key)) return _Store.set(key);
                }
                if (argm.length === 2 && typeof key === "string") {
                  if (!data) return _Store.remove(key);
                  if (data && typeof data === "string") return _Store.set(key, data);
                  if (data && isFunction(data)) {
                    dt = null;
                    dt = data(key, _Store.get(key));
                    store.set(key, dt);
                  }
                }
                if (argm.length === 2 && isArray(key) && isFunction(data)) {
                  for (var i = 0, len = key.length; i < len; i++) {
                    dt = data(key[i], _Store.get(key[i]));
                    store.set(key[i], dt);
                  }
                }
                return store;
              }
              for (var a in Store.prototype) store[a] = Store.prototype[a];
              return store;
            });
          })(store$2);
          return store$2.exports;
        }

        var storeExports = requireStore();
        const store = /*@__PURE__*/ getDefaultExportFromCjs(storeExports);

        //  check if the get, set overloads and search methods are used at all
        //  if we do, ensure we provide types to support overloads as per storejs docs
        //  https://www.npmjs.com/package/storejs
        /**
         * A storage utility to persist values in localstorage via Storage interface
         */
        class LocalStorage {
          isSupportAvailable = true;
          isEnabled = true;
          length = 0;
          constructor(options = {}, logger) {
            this.options = getDefaultLocalStorageOptions();
            this.logger = logger;
            this.configure(options);
          }
          configure(options) {
            this.options = mergeDeepRight(this.options, options);
            this.isSupportAvailable = isStorageAvailable(LOCAL_STORAGE);
            this.isEnabled = Boolean(this.options.enabled && this.isSupportAvailable);
            return this.options;
          }
          setItem(key, value) {
            store.set(key, value);
            this.length = store.len();
          } // eslint-disable-next-line class-methods-use-this
          getItem(key) {
            const value = store.get(key);
            return isUndefined(value) ? null : value;
          }
          removeItem(key) {
            store.remove(key);
            this.length = store.len();
          }
          clear() {
            store.clear();
            this.length = 0;
          }
          key(index) {
            const curKeys = this.keys();
            return curKeys[index] ?? null;
          } // eslint-disable-next-line class-methods-use-this
          keys() {
            return store.keys();
          }
        }
        const defaultLocalStorage = new LocalStorage({}, defaultLogger);

        /**
         * A storage utility to persist values in SessionStorage via Storage interface
         */
        class SessionStorage {
          isSupportAvailable = true;
          isEnabled = true;
          length = 0;
          constructor(options = {}, logger) {
            this.options = getDefaultSessionStorageOptions();
            this.logger = logger;
            this.configure(options);
          }
          configure(options) {
            this.options = mergeDeepRight(this.options, options);
            this.isSupportAvailable = isStorageAvailable(SESSION_STORAGE); // when storage is blocked by the user, even accessing the property throws an error
            if (this.isSupportAvailable) {
              this.store = globalThis.sessionStorage;
            }
            this.isEnabled = Boolean(this.options.enabled && this.isSupportAvailable);
            return this.options;
          }
          setItem(key, value) {
            if (!this.store) {
              return;
            }
            this.store.setItem(key, value);
            this.length = this.store.length;
          }
          getItem(key) {
            if (!this.store) {
              return null;
            }
            const value = this.store.getItem(key);
            return isUndefined(value) ? null : value;
          }
          removeItem(key) {
            if (!this.store) {
              return;
            }
            this.store.removeItem(key);
            this.length = this.store.length;
          }
          clear() {
            this.store?.clear();
            this.length = 0;
          }
          key(index) {
            return this.store?.key(index) ?? null;
          }
          keys() {
            const keys = [];
            if (!this.store) {
              return keys;
            }
            for (let i = 0; i < this.store.length; i += 1) {
              const key = this.store.key(i);
              if (key !== null) {
                keys.push(key);
              }
            }
            return keys;
          }
        }
        const defaultSessionStorage = new SessionStorage({}, defaultLogger);

        /**
         * A utility to retrieve the storage singleton instance by type
         */
        const getStorageEngine = type => {
          switch (type) {
            case LOCAL_STORAGE:
              return defaultLocalStorage;
            case SESSION_STORAGE:
              return defaultSessionStorage;
            case MEMORY_STORAGE:
              return defaultInMemoryStorage;
            case COOKIE_STORAGE:
              return new CookieStorage({}, defaultLogger);
            default:
              return defaultInMemoryStorage;
          }
        };
        /**
         * Configure cookie storage singleton
         */
        const configureCookieStorageEngine = options => {
          const cookieStorageOptions = new CookieStorage({}, defaultLogger).configure(options);
          state.storage.cookie.value = {
            maxage: cookieStorageOptions.maxage,
            path: cookieStorageOptions.path,
            domain: cookieStorageOptions.domain,
            samesite: cookieStorageOptions.samesite,
            expires: cookieStorageOptions.expires,
            secure: cookieStorageOptions.secure
          };
        };
        /**
         * Configure local storage singleton
         */
        const configureLocalStorageEngine = options => {
          defaultLocalStorage.configure(options);
        };
        /**
         * Configure in memory storage singleton
         */
        const configureInMemoryStorageEngine = options => {
          defaultInMemoryStorage.configure(options);
        };
        /**
         * Configure session storage singleton
         */
        const configureSessionStorageEngine = options => {
          defaultSessionStorage.configure(options);
        };
        /**
         * Configure all storage singleton instances
         */
        const configureStorageEngines = (cookieStorageOptions = {}, localStorageOptions = {}, inMemoryStorageOptions = {}, sessionStorageOptions = {}) => {
          configureCookieStorageEngine(cookieStorageOptions);
          configureLocalStorageEngine(localStorageOptions);
          configureInMemoryStorageEngine(inMemoryStorageOptions);
          configureSessionStorageEngine(sessionStorageOptions);
        };

        /**
         * Store Implementation with dedicated storage
         */
        class Store {
          hasErrorHandler = false;
          constructor(config, engine, pluginsManager) {
            this.id = config.id;
            this.name = config.name;
            this.isEncrypted = config.isEncrypted ?? false;
            this.validKeys = config.validKeys ?? {};
            this.engine = engine ?? getStorageEngine(LOCAL_STORAGE);
            this.noKeyValidation = Object.keys(this.validKeys).length === 0;
            this.noCompoundKey = config.noCompoundKey;
            this.originalEngine = this.engine;
            this.errorHandler = config.errorHandler ?? defaultErrorHandler;
            this.hasErrorHandler = Boolean(this.errorHandler);
            this.logger = config.logger ?? defaultLogger;
            this.pluginsManager = pluginsManager;
          }
          /**
           * Ensure the key is valid and with correct format
           */
          createValidKey(key) {
            const {
              name,
              id,
              validKeys,
              noKeyValidation,
              noCompoundKey
            } = this;
            if (noKeyValidation) {
              return noCompoundKey ? key : [name, id, key].join('.');
            } // validate and return undefined if invalid key
            let compoundKey;
            Object.values(validKeys).forEach(validKeyName => {
              if (validKeyName === key) {
                compoundKey = noCompoundKey ? key : [name, id, key].join('.');
              }
            });
            return compoundKey;
          }
          /**
           * Switch to inMemoryEngine, bringing any existing data with.
           */
          swapQueueStoreToInMemoryEngine() {
            const {
              name,
              id,
              validKeys,
              noCompoundKey
            } = this;
            const inMemoryStorage = getStorageEngine(MEMORY_STORAGE); // grab existing data, but only for this page's queue instance, not all
            // better to keep other queues in localstorage to be flushed later
            // than to pull them into memory and remove them from durable storage
            Object.keys(validKeys).forEach(key => {
              const value = this.get(validKeys[key]);
              const validKey = noCompoundKey ? key : [name, id, key].join('.');
              inMemoryStorage.setItem(validKey, value); // TODO: are we sure we want to drop clientData
              //  if cookies are not available and localstorage is full?
              this.remove(key);
            });
            this.engine = inMemoryStorage;
          }
          /**
           * Set value by key.
           */
          set(key, value) {
            const validKey = this.createValidKey(key);
            if (!validKey) {
              return;
            }
            try { // storejs that is used in localstorage engine already stringifies json
              this.engine.setItem(validKey, this.encrypt(stringifyWithoutCircular(value, false, [], this.logger)));
            } catch (err) {
              if (isStorageQuotaExceeded(err)) {
                this.logger?.warn(STORAGE_QUOTA_EXCEEDED_WARNING(`Store ${this.id}`)); // switch to inMemory engine
                this.swapQueueStoreToInMemoryEngine(); // and save it there
                this.set(key, value);
              } else {
                this.onError(getMutatedError(err, STORE_DATA_SAVE_ERROR(key)));
              }
            }
          }
          /**
           * Get by Key.
           */
          get(key) {
            const validKey = this.createValidKey(key);
            let decryptedValue;
            try {
              if (!validKey) {
                return null;
              }
              decryptedValue = this.decrypt(this.engine.getItem(validKey));
              if (isNullOrUndefined(decryptedValue)) {
                return null;
              } // storejs that is used in localstorage engine already deserializes json strings but swallows errors
              return JSON.parse(decryptedValue);
            } catch (err) {
              this.onError(new Error(`${STORE_DATA_FETCH_ERROR(key)}: ${err.message}`)); // A hack for warning the users of potential partial SDK version migrations
              if (isString(decryptedValue) && decryptedValue.startsWith('RudderEncrypt:')) {
                this.logger?.warn(BAD_COOKIES_WARNING(key));
              }
              return null;
            }
          }
          /**
           * Remove by Key.
           */
          remove(key) {
            const validKey = this.createValidKey(key);
            if (validKey) {
              this.engine.removeItem(validKey);
            }
          }
          /**
           * Get original engine
           */
          getOriginalEngine() {
            return this.originalEngine;
          }
          /**
           * Decrypt values
           */
          decrypt(value) {
            if (isNullOrUndefined(value)) {
              return null;
            }
            return this.crypto(value, 'decrypt');
          }
          /**
           * Encrypt value
           */
          encrypt(value) {
            return this.crypto(value, 'encrypt');
          }
          /**
           * Extension point to use with encryption plugins
           */
          crypto(value, mode) {
            const noEncryption = !this.isEncrypted || !value || typeof value !== 'string' || trim(value) === '';
            if (noEncryption) {
              return value;
            }
            const extensionPointName = `storage.${mode}`;
            const formattedValue = this.pluginsManager ? this.pluginsManager.invokeSingle(extensionPointName, value) : value;
            return typeof formattedValue === 'undefined' ? value : formattedValue ?? '';
          }
          /**
           * Handle errors
           */
          onError(error) {
            if (this.hasErrorHandler) {
              this.errorHandler?.onError(error, `Store ${this.id}`);
            } else {
              throw error;
            }
          }
        }

        const getStorageTypeFromPreConsentIfApplicable = (state, sessionKey) => {
          let overriddenStorageType;
          if (state.consents.preConsent.value.enabled) {
            switch (state.consents.preConsent.value.storage?.strategy) {
              case 'none':
                overriddenStorageType = NO_STORAGE;
                break;
              case 'session':
                if (sessionKey !== 'sessionInfo') {
                  overriddenStorageType = NO_STORAGE;
                }
                break;
              case 'anonymousId':
                if (sessionKey !== 'anonymousId') {
                  overriddenStorageType = NO_STORAGE;
                }
                break;
            }
          }
          return overriddenStorageType;
        };

        /**
         * A service to manage stores & available storage client configurations
         */
        class StoreManager {
          stores = {};
          isInitialized = false;
          hasErrorHandler = false;
          constructor(pluginsManager, errorHandler, logger) {
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.hasErrorHandler = Boolean(this.errorHandler);
            this.pluginsManager = pluginsManager;
            this.onError = this.onError.bind(this);
          }
          /**
           * Configure available storage client instances
           */
          init() {
            if (this.isInitialized) {
              return;
            }
            const loadOptions = state.loadOptions.value;
            const config = {
              cookieStorageOptions: {
                samesite: loadOptions.sameSiteCookie,
                secure: loadOptions.secureCookie,
                domain: loadOptions.setCookieDomain,
                sameDomainCookiesOnly: loadOptions.sameDomainCookiesOnly,
                enabled: true
              },
              localStorageOptions: {
                enabled: true
              },
              inMemoryStorageOptions: {
                enabled: true
              },
              sessionStorageOptions: {
                enabled: true
              }
            };
            configureStorageEngines(removeUndefinedValues(mergeDeepRight(config.cookieStorageOptions ?? {}, state.storage.cookie?.value ?? {})), removeUndefinedValues(config.localStorageOptions), removeUndefinedValues(config.inMemoryStorageOptions), removeUndefinedValues(config.sessionStorageOptions));
            this.initClientDataStores();
            this.isInitialized = true;
          }
          /**
           * Create store to persist data used by the SDK like session, used details etc
           */
          initClientDataStores() {
            this.initializeStorageState(); // TODO: fill in extra config values and bring them in from StoreManagerOptions if needed
            // TODO: should we pass the keys for all in order to validate or leave free as v1.1?
            // Initializing all the enabled store because previous user data might be in different storage
            // that needs auto migration
            const storageTypes = [MEMORY_STORAGE, LOCAL_STORAGE, COOKIE_STORAGE, SESSION_STORAGE];
            storageTypes.forEach(storageType => {
              if (getStorageEngine(storageType)?.isEnabled) {
                this.setStore({
                  id: storageClientDataStoreNameMap[storageType],
                  name: storageClientDataStoreNameMap[storageType],
                  isEncrypted: true,
                  noCompoundKey: true,
                  type: storageType
                });
              }
            });
          }
          initializeStorageState() {
            let globalStorageType = state.storage.type.value;
            let entriesOptions = state.loadOptions.value.storage?.entries; // Use the storage options from post consent if anything is defined
            const postConsentStorageOpts = state.consents.postConsent.value.storage;
            if (isDefined(postConsentStorageOpts?.type) || isDefined(postConsentStorageOpts?.entries)) {
              globalStorageType = postConsentStorageOpts?.type;
              entriesOptions = postConsentStorageOpts?.entries;
            }
            let trulyAnonymousTracking = true;
            let storageEntries = {};
            USER_SESSION_KEYS.forEach(sessionKey => {
              const key = sessionKey;
              const storageKey = sessionKey;
              const configuredStorageType = entriesOptions?.[key]?.type;
              const preConsentStorageType = getStorageTypeFromPreConsentIfApplicable(state, sessionKey); // Storage type precedence order: pre-consent strategy > entry type > global type > default
              const storageType = preConsentStorageType ?? configuredStorageType ?? globalStorageType ?? DEFAULT_STORAGE_TYPE;
              const finalStorageType = this.getResolvedStorageTypeForEntry(storageType, sessionKey);
              if (finalStorageType !== NO_STORAGE) {
                trulyAnonymousTracking = false;
              }
              storageEntries = {
                ...storageEntries,
                [sessionKey]: {
                  type: finalStorageType,
                  key: COOKIE_KEYS[storageKey]
                }
              };
            });
            r(() => {
              state.storage.type.value = globalStorageType;
              state.storage.entries.value = storageEntries;
              state.storage.trulyAnonymousTracking.value = trulyAnonymousTracking;
            });
          }
          getResolvedStorageTypeForEntry(storageType, sessionKey) {
            let finalStorageType = storageType;
            switch (storageType) {
              case LOCAL_STORAGE:
                if (!getStorageEngine(LOCAL_STORAGE)?.isEnabled) {
                  finalStorageType = MEMORY_STORAGE;
                }
                break;
              case SESSION_STORAGE:
                if (!getStorageEngine(SESSION_STORAGE)?.isEnabled) {
                  finalStorageType = MEMORY_STORAGE;
                }
                break;
              case MEMORY_STORAGE:
              case NO_STORAGE:
                break;
              case COOKIE_STORAGE:
              default: // First try setting the storage to cookie else to local storage
                if (getStorageEngine(COOKIE_STORAGE)?.isEnabled) {
                  finalStorageType = COOKIE_STORAGE;
                } else if (getStorageEngine(LOCAL_STORAGE)?.isEnabled) {
                  finalStorageType = LOCAL_STORAGE;
                } else if (getStorageEngine(SESSION_STORAGE)?.isEnabled) {
                  finalStorageType = SESSION_STORAGE;
                } else {
                  finalStorageType = MEMORY_STORAGE;
                }
                break;
            }
            if (finalStorageType !== storageType) {
              this.logger?.warn(STORAGE_UNAVAILABLE_WARNING(STORE_MANAGER, sessionKey, storageType, finalStorageType));
            }
            return finalStorageType;
          }
          /**
           * Create a new store
           */
          setStore(storeConfig) {
            const storageEngine = getStorageEngine(storeConfig.type);
            this.stores[storeConfig.id] = new Store(storeConfig, storageEngine, this.pluginsManager);
            return this.stores[storeConfig.id];
          }
          /**
           * Retrieve a store
           */
          getStore(id) {
            return this.stores[id];
          }
          /**
           * Handle errors
           */
          onError(error) {
            if (this.hasErrorHandler) {
              this.errorHandler?.onError(error, STORE_MANAGER);
            } else {
              throw error;
            }
          }
        }

        const isValidSourceConfig = res => isObjectLiteralAndNotNull(res) && isObjectLiteralAndNotNull(res.source) && !isNullOrUndefined(res.source.id) && isObjectLiteralAndNotNull(res.source.config) && Array.isArray(res.source.destinations);
        const isValidStorageType = storageType => typeof storageType === 'string' && SUPPORTED_STORAGE_TYPES.includes(storageType);
        const getTopDomain = url => { // Create a URL object
          const urlObj = new URL(url); // Extract the host and protocol
          const {
            host,
            protocol
          } = urlObj; // Split the host into parts
          const parts = host.split('.');
          let topDomain; // Handle different cases, especially for co.uk or similar TLDs
          if (parts.length > 2) { // Join the last two parts for the top-level domain
            topDomain = `${parts[parts.length-2]}.${parts[parts.length-1]}`;
          } else { // If only two parts or less, return as it is
            topDomain = host;
          }
          return {
            topDomain,
            protocol
          };
        };
        const getTopDomainUrl = url => {
          const {
            topDomain,
            protocol
          } = getTopDomain(url);
          return `${protocol}//${topDomain}`;
        };
        const getDataServiceUrl = (endpoint, useExactDomain) => {
          const url = useExactDomain ? window.location.origin : getTopDomainUrl(window.location.href);
          const formattedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
          return `${url}/${formattedEndpoint}`;
        };
        const isWebpageTopLevelDomain = providedDomain => {
          const {
            topDomain
          } = getTopDomain(window.location.href);
          return topDomain === providedDomain;
        };

        /**
         * A function to filter enabled destinations and map to required properties only
         * @param destinations
         *
         * @returns Destination[]
         */
        const filterEnabledDestination = destinations => {
          const nativeDestinations = [];
          destinations.forEach(destination => {
            if (destination.enabled && !destination.deleted) {
              nativeDestinations.push({
                id: destination.id,
                displayName: destination.destinationDefinition.displayName,
                config: destination.config,
                shouldApplyDeviceModeTransformation: destination.shouldApplyDeviceModeTransformation || false,
                propagateEventsUntransformedOnError: destination.propagateEventsUntransformedOnError || false,
                userFriendlyId: `${destination.destinationDefinition.displayName.replaceAll(' ','-')}___${destination.id}`
              });
            }
          });
          return nativeDestinations;
        };

        /**
         * Removes trailing slash from url
         * @param url
         * @returns url
         */
        const removeTrailingSlashes = url => url?.endsWith('/') ? removeTrailingSlashes(url.substring(0, url.length - 1)) : url;
        const getDomain = url => {
          try {
            const urlObj = new URL(url);
            return urlObj.host;
          } catch (error) {
            return null;
          }
        };
        /**
         * Get the referring domain from the referrer URL
         * @param referrer Page referrer
         * @returns Page referring domain
         */
        const getReferringDomain = referrer => getDomain(referrer) ?? '';
        /**
         * Extracts UTM parameters from the URL
         * @param url Page URL
         * @returns UTM parameters
         */
        const extractUTMParameters = url => {
          const result = {};
          try {
            const urlObj = new URL(url);
            const UTM_PREFIX = 'utm_';
            urlObj.searchParams.forEach((value, sParam) => {
              if (sParam.startsWith(UTM_PREFIX)) {
                let utmParam = sParam.substring(UTM_PREFIX.length); // Not sure why we're doing this
                if (utmParam === 'campaign') {
                  utmParam = 'name';
                }
                result[utmParam] = value;
              }
            });
          } catch (error) { // Do nothing
          }
          return result;
        };
        /**
         * To get the URL until the hash
         * @param url The input URL
         * @returns URL until the hash
         */
        const getUrlWithoutHash = url => {
          let urlWithoutHash = url;
          try {
            const urlObj = new URL(url);
            urlWithoutHash = urlObj.origin + urlObj.pathname + urlObj.search;
          } catch (error) { // Do nothing
          }
          return urlWithoutHash;
        };

        const removeDuplicateSlashes = str => str.replace(/\/{2,}/g, '/');
        /**
         * Checks if provided url is valid or not
         * @param url
         * @returns true if `url` is valid and false otherwise
         */
        const isValidURL = url => {
          if (!isString(url)) {
            return false;
          }
          try { // If URL is supported by the browser, we can use it to validate the URL
            // Otherwise, we can at least check if the URL matches the pattern
            if (isFunction(globalThis.URL)) { // eslint-disable-next-line no-new
              new URL(url);
            }
            return URL_PATTERN.test(url);
          } catch (e) {
            return false;
          }
        };

        /**
         * Determines if the SDK is running inside a chrome extension
         * @returns boolean
         */
        const isSDKRunningInChromeExtension = () => !!(window.chrome && window.chrome.runtime && window.chrome.runtime.id);

        const DEFAULT_PRE_CONSENT_STORAGE_STRATEGY = 'none';
        const DEFAULT_PRE_CONSENT_EVENTS_DELIVERY_TYPE = 'immediate';

        const isErrorReportingEnabled = sourceConfig => sourceConfig?.statsCollection?.errors?.enabled === true;
        const isMetricsReportingEnabled = sourceConfig => sourceConfig?.statsCollection?.metrics?.enabled === true;

        /**
         * Validates and normalizes the consent options provided by the user
         * @param options Consent options provided by the user
         * @returns Validated and normalized consent options
         */
        const getValidPostConsentOptions = options => {
          const validOptions = {
            sendPageEvent: false,
            trackConsent: false,
            discardPreConsentEvents: false
          };
          if (isObjectLiteralAndNotNull(options)) {
            const clonedOptions = clone(options);
            validOptions.storage = clonedOptions.storage;
            if (isNonEmptyObject(clonedOptions.integrations)) {
              validOptions.integrations = clonedOptions.integrations;
            }
            validOptions.discardPreConsentEvents = clonedOptions.discardPreConsentEvents === true;
            validOptions.sendPageEvent = clonedOptions.sendPageEvent === true;
            validOptions.trackConsent = clonedOptions.trackConsent === true;
            if (isNonEmptyObject(clonedOptions.consentManagement)) { // Override enabled value with the current state value
              validOptions.consentManagement = mergeDeepRight(clonedOptions.consentManagement, {
                enabled: state.consents.enabled.value
              });
            }
          }
          return validOptions;
        };
        /**
         * Validates if the input is a valid consents data
         * @param value Input consents data
         * @returns true if the input is a valid consents data else false
         */
        const isValidConsentsData = value => isNonEmptyObject(value) || Array.isArray(value);
        /**
         * Retrieves the corresponding provider and plugin name of the selected consent manager from the supported consent managers
         * @param consentManagementOpts consent management options
         * @param logger logger instance
         * @returns Corresponding provider and plugin name of the selected consent manager from the supported consent managers
         */
        const getConsentManagerInfo = (consentManagementOpts, logger) => {
          let {
            provider
          } = consentManagementOpts;
          const consentManagerPluginName = provider ? ConsentManagersToPluginNameMap[provider] : undefined;
          if (provider && !consentManagerPluginName) {
            logger?.error(UNSUPPORTED_CONSENT_MANAGER_ERROR(CONFIG_MANAGER, provider, ConsentManagersToPluginNameMap)); // Reset the provider value
            provider = undefined;
          }
          return {
            provider,
            consentManagerPluginName
          };
        };
        /**
         * Validates and converts the consent management options into a normalized format
         * @param consentManagementOpts Consent management options provided by the user
         * @param logger logger instance
         * @returns An object containing the consent manager plugin name, initialized, enabled and consents data
         */
        const getConsentManagementData = (consentManagementOpts, logger) => {
          let consentManagerPluginName;
          let allowedConsentIds = [];
          let deniedConsentIds = [];
          let initialized = false;
          let provider;
          let enabled = consentManagementOpts?.enabled === true;
          if (isNonEmptyObject(consentManagementOpts) && enabled) { // Get the corresponding plugin name of the selected consent manager from the supported consent managers
            ({
              provider,
              consentManagerPluginName
            } = getConsentManagerInfo(consentManagementOpts, logger));
            if (isValidConsentsData(consentManagementOpts.allowedConsentIds)) {
              allowedConsentIds = consentManagementOpts.allowedConsentIds;
              initialized = true;
            }
            if (isValidConsentsData(consentManagementOpts.deniedConsentIds)) {
              deniedConsentIds = consentManagementOpts.deniedConsentIds;
              initialized = true;
            }
          }
          const consentsData = {
            allowedConsentIds,
            deniedConsentIds
          }; // Enable consent management only if consent manager is supported
          enabled = enabled && Boolean(consentManagerPluginName);
          return {
            provider,
            consentManagerPluginName,
            initialized,
            enabled,
            consentsData
          };
        };

        /**
         * Determines the SDK URL
         * @returns sdkURL
         */
        const getSDKUrl = () => {
          const scripts = document.getElementsByTagName('script');
          const sdkFileNameRegex = /(?:^|\/)rsa(\.min)?\.js$/; // eslint-disable-next-line no-restricted-syntax
          for (const script of scripts) {
            const src = script.getAttribute('src');
            if (src && sdkFileNameRegex.test(src)) {
              return src;
            }
          }
          return undefined;
        };
        /**
         * Updates the reporting state variables from the source config data
         * @param res Source config
         * @param logger Logger instance
         */
        const updateReportingState = res => {
          state.reporting.isErrorReportingEnabled.value = isErrorReportingEnabled(res.source.config) && !isSDKRunningInChromeExtension();
          state.reporting.isMetricsReportingEnabled.value = isMetricsReportingEnabled(res.source.config);
        };
        const getServerSideCookiesStateData = logger => {
          const {
            useServerSideCookies,
            dataServiceEndpoint,
            storage: storageOptsFromLoad,
            setCookieDomain,
            sameDomainCookiesOnly
          } = state.loadOptions.value;
          let cookieOptions = storageOptsFromLoad?.cookie;
          let sscEnabled = false;
          let finalDataServiceUrl;
          if (useServerSideCookies) {
            sscEnabled = useServerSideCookies;
            const providedCookieDomain = cookieOptions.domain ?? setCookieDomain;
            /**
             * Based on the following conditions, we decide whether to use the exact domain or not to determine the data service URL:
             * 1. If the cookie domain is provided and it is not a top-level domain, then use the exact domain
             * 2. If the sameDomainCookiesOnly flag is set to true, then use the exact domain
             */
            const useExactDomain = isDefined(providedCookieDomain) && !isWebpageTopLevelDomain(removeLeadingPeriod(providedCookieDomain)) || sameDomainCookiesOnly;
            const dataServiceUrl = getDataServiceUrl(dataServiceEndpoint ?? DEFAULT_DATA_SERVICE_ENDPOINT, useExactDomain);
            if (isValidURL(dataServiceUrl)) {
              finalDataServiceUrl = removeTrailingSlashes(dataServiceUrl);
              const curHost = getDomain(window.location.href);
              const dataServiceHost = getDomain(dataServiceUrl); // If the current host is different from the data service host, then it is a cross-site request
              // For server-side cookies to work, we need to set the SameSite=None and Secure attributes
              // One round of cookie options manipulation is taking place here
              // Based on these(setCookieDomain/storage.cookie or sameDomainCookiesOnly) two load-options, final cookie options are set in the storage module
              // TODO: Refactor the cookie options manipulation logic in one place
              if (curHost !== dataServiceHost) {
                cookieOptions = {
                  ...cookieOptions,
                  samesite: 'None',
                  secure: true
                };
              }
              /**
               * If the sameDomainCookiesOnly flag is not set and the cookie domain is provided(not top level domain),
               * and the data service host is different from the provided cookie domain, then we disable server-side cookies
               * ex: provided cookie domain: 'random.com', data service host: 'sub.example.com'
               */
              if (!sameDomainCookiesOnly && useExactDomain && dataServiceHost !== removeLeadingPeriod(providedCookieDomain)) {
                sscEnabled = false;
                logger?.warn(SERVER_SIDE_COOKIE_FEATURE_OVERRIDE_WARNING(CONFIG_MANAGER, providedCookieDomain, dataServiceHost));
              }
            } else {
              sscEnabled = false;
            }
          }
          return {
            sscEnabled,
            cookieOptions,
            finalDataServiceUrl
          };
        };
        const updateStorageStateFromLoadOptions = logger => {
          const {
            storage: storageOptsFromLoad
          } = state.loadOptions.value;
          let storageType = storageOptsFromLoad?.type;
          if (isDefined(storageType) && !isValidStorageType(storageType)) {
            logger?.warn(STORAGE_TYPE_VALIDATION_WARNING(CONFIG_MANAGER, storageType, DEFAULT_STORAGE_TYPE));
            storageType = DEFAULT_STORAGE_TYPE;
          }
          let storageEncryptionVersion = storageOptsFromLoad?.encryption?.version;
          const encryptionPluginName = storageEncryptionVersion && StorageEncryptionVersionsToPluginNameMap[storageEncryptionVersion];
          if (!isUndefined(storageEncryptionVersion) && isUndefined(encryptionPluginName)) { // set the default encryption plugin
            logger?.warn(UNSUPPORTED_STORAGE_ENCRYPTION_VERSION_WARNING(CONFIG_MANAGER, storageEncryptionVersion, StorageEncryptionVersionsToPluginNameMap, DEFAULT_STORAGE_ENCRYPTION_VERSION));
            storageEncryptionVersion = DEFAULT_STORAGE_ENCRYPTION_VERSION;
          } else if (isUndefined(storageEncryptionVersion)) {
            storageEncryptionVersion = DEFAULT_STORAGE_ENCRYPTION_VERSION;
          } // Allow migration only if the configured encryption version is the default encryption version
          const configuredMigrationValue = storageOptsFromLoad?.migrate;
          const finalMigrationVal = configuredMigrationValue && storageEncryptionVersion === DEFAULT_STORAGE_ENCRYPTION_VERSION;
          if (configuredMigrationValue === true && finalMigrationVal !== configuredMigrationValue) {
            logger?.warn(STORAGE_DATA_MIGRATION_OVERRIDE_WARNING(CONFIG_MANAGER, storageEncryptionVersion, DEFAULT_STORAGE_ENCRYPTION_VERSION));
          }
          const {
            sscEnabled,
            finalDataServiceUrl,
            cookieOptions
          } = getServerSideCookiesStateData(logger);
          r(() => {
            state.storage.type.value = storageType;
            state.storage.cookie.value = cookieOptions;
            state.serverCookies.isEnabledServerSideCookies.value = sscEnabled;
            state.serverCookies.dataServiceUrl.value = finalDataServiceUrl;
            state.storage.encryptionPluginName.value = StorageEncryptionVersionsToPluginNameMap[storageEncryptionVersion];
            state.storage.migrate.value = finalMigrationVal;
          });
        };
        const updateConsentsStateFromLoadOptions = logger => {
          const {
            provider,
            consentManagerPluginName,
            initialized,
            enabled,
            consentsData
          } = getConsentManagementData(state.loadOptions.value.consentManagement, logger); // Pre-consent
          const preConsentOpts = state.loadOptions.value.preConsent;
          let storageStrategy = preConsentOpts?.storage?.strategy ?? DEFAULT_PRE_CONSENT_STORAGE_STRATEGY;
          const StorageStrategies = ['none', 'session', 'anonymousId'];
          if (isDefined(storageStrategy) && !StorageStrategies.includes(storageStrategy)) {
            storageStrategy = DEFAULT_PRE_CONSENT_STORAGE_STRATEGY;
            logger?.warn(UNSUPPORTED_PRE_CONSENT_STORAGE_STRATEGY(CONFIG_MANAGER, preConsentOpts?.storage?.strategy, DEFAULT_PRE_CONSENT_STORAGE_STRATEGY));
          }
          let eventsDeliveryType = preConsentOpts?.events?.delivery ?? DEFAULT_PRE_CONSENT_EVENTS_DELIVERY_TYPE;
          const deliveryTypes = ['immediate', 'buffer'];
          if (isDefined(eventsDeliveryType) && !deliveryTypes.includes(eventsDeliveryType)) {
            eventsDeliveryType = DEFAULT_PRE_CONSENT_EVENTS_DELIVERY_TYPE;
            logger?.warn(UNSUPPORTED_PRE_CONSENT_EVENTS_DELIVERY_TYPE(CONFIG_MANAGER, preConsentOpts?.events?.delivery, DEFAULT_PRE_CONSENT_EVENTS_DELIVERY_TYPE));
          }
          r(() => {
            state.consents.activeConsentManagerPluginName.value = consentManagerPluginName;
            state.consents.initialized.value = initialized;
            state.consents.enabled.value = enabled;
            state.consents.data.value = consentsData;
            state.consents.provider.value = provider;
            state.consents.preConsent.value = { // Only enable pre-consent if it is explicitly enabled and
              // if it is not already initialized and
              // if consent management is enabled
              enabled: state.loadOptions.value.preConsent?.enabled === true && initialized === false && enabled === true,
              storage: {
                strategy: storageStrategy
              },
              events: {
                delivery: eventsDeliveryType
              }
            };
          });
        };
        /**
         * Determines the consent management state variables from the source config data
         * @param resp Source config response
         * @param logger Logger instance
         */
        const updateConsentsState = resp => {
          let resolutionStrategy = state.consents.resolutionStrategy.value;
          let cmpMetadata;
          if (isObjectLiteralAndNotNull(resp.consentManagementMetadata)) {
            if (state.consents.provider.value) {
              resolutionStrategy = resp.consentManagementMetadata.providers.find(p => p.provider === state.consents.provider.value)?.resolutionStrategy ?? state.consents.resolutionStrategy.value;
            }
            cmpMetadata = resp.consentManagementMetadata;
          } // If the provider is custom, then the resolution strategy is not applicable
          if (state.consents.provider.value === 'custom') {
            resolutionStrategy = undefined;
          }
          r(() => {
            state.consents.metadata.value = clone(cmpMetadata);
            state.consents.resolutionStrategy.value = resolutionStrategy;
          });
        };
        const updateDataPlaneEventsStateFromLoadOptions = logger => {
          if (state.dataPlaneEvents.deliveryEnabled.value) {
            const defaultEventsQueuePluginName = 'XhrQueue';
            let eventsQueuePluginName = defaultEventsQueuePluginName;
            if (state.loadOptions.value.useBeacon) {
              if (state.capabilities.isBeaconAvailable.value) {
                eventsQueuePluginName = 'BeaconQueue';
              } else {
                eventsQueuePluginName = defaultEventsQueuePluginName;
                logger?.warn(UNSUPPORTED_BEACON_API_WARNING(CONFIG_MANAGER));
              }
            }
            r(() => {
              state.dataPlaneEvents.eventsQueuePluginName.value = eventsQueuePluginName;
            });
          }
        };
        const getSourceConfigURL = (configUrl, writeKey, lockIntegrationsVersion, lockPluginsVersion, logger) => {
          const defSearchParams = new URLSearchParams({
            p: MODULE_TYPE,
            v: APP_VERSION,
            build: BUILD_TYPE,
            writeKey,
            lockIntegrationsVersion: lockIntegrationsVersion.toString(),
            lockPluginsVersion: lockPluginsVersion.toString()
          });
          let origin = DEFAULT_CONFIG_BE_URL;
          let searchParams = defSearchParams;
          let pathname = '/sourceConfig/';
          let hash = '';
          if (isValidURL(configUrl)) {
            const configUrlInstance = new URL(configUrl);
            if (!removeTrailingSlashes(configUrlInstance.pathname).endsWith('/sourceConfig')) {
              configUrlInstance.pathname = `${removeTrailingSlashes(configUrlInstance.pathname)}/sourceConfig/`;
            }
            configUrlInstance.pathname = removeDuplicateSlashes(configUrlInstance.pathname);
            defSearchParams.forEach((value, key) => {
              if (configUrlInstance.searchParams.get(key) === null) {
                configUrlInstance.searchParams.set(key, value);
              }
            });
            origin = configUrlInstance.origin;
            pathname = configUrlInstance.pathname;
            searchParams = configUrlInstance.searchParams;
            hash = configUrlInstance.hash;
          } else {
            logger?.warn(INVALID_CONFIG_URL_WARNING(CONFIG_MANAGER, configUrl));
          }
          return `${origin}${pathname}?${searchParams}${hash}`;
        };

        const getSDKComponentBaseURL = (componentType, pathSuffix, baseURL, currentVersion, lockVersion, customURL) => {
          let sdkComponentURL = '';
          if (customURL) {
            if (!isValidURL(customURL)) {
              throw new Error(COMPONENT_BASE_URL_ERROR(componentType));
            }
            return removeTrailingSlashes(customURL);
          }
          const sdkURL = getSDKUrl();
          sdkComponentURL = sdkURL ? sdkURL.split('/').slice(0, -1).concat(pathSuffix).join('/') : baseURL;
          if (lockVersion) {
            sdkComponentURL = sdkComponentURL.replace(`/${CDN_ARCH_VERSION_DIR}/${BUILD_TYPE}/${pathSuffix}`, `/${currentVersion}/${BUILD_TYPE}/${pathSuffix}`);
          }
          return sdkComponentURL;
        };
        /**
         * A function that determines integration SDK loading path
         * @param currentVersion
         * @param lockIntegrationsVersion
         * @param customIntegrationsCDNPath
         * @returns
         */
        const getIntegrationsCDNPath = (currentVersion, lockIntegrationsVersion, customIntegrationsCDNPath) => getSDKComponentBaseURL('integrations', CDN_INT_DIR, DEST_SDK_BASE_URL, currentVersion, lockIntegrationsVersion, customIntegrationsCDNPath);
        /**
         * A function that determines plugins SDK loading path
         * @param currentVersion Current SDK version
         * @param lockPluginsVersion Flag to lock the plugins version
         * @param customPluginsCDNPath URL to load the plugins from
         * @returns Final plugins CDN path
         */
        const getPluginsCDNPath = (currentVersion, lockPluginsVersion, customPluginsCDNPath) => getSDKComponentBaseURL('plugins', CDN_PLUGINS_DIR, PLUGINS_BASE_URL, currentVersion, lockPluginsVersion, customPluginsCDNPath);

        class ConfigManager {
          hasErrorHandler = false;
          constructor(httpClient, errorHandler, logger) {
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.httpClient = httpClient;
            this.hasErrorHandler = Boolean(this.errorHandler);
            this.onError = this.onError.bind(this);
            this.processConfig = this.processConfig.bind(this);
          }
          attachEffects() {
            E(() => {
              this.logger?.setMinLogLevel(state.lifecycle.logLevel.value);
            });
          }
          /**
           * A function to validate, construct and store loadOption, lifecycle, source and destination
           * config related information in global state
           */
          init() {
            this.attachEffects();
            const {
              logLevel,
              configUrl,
              lockIntegrationsVersion,
              lockPluginsVersion,
              destSDKBaseURL,
              pluginsSDKBaseURL,
              integrations
            } = state.loadOptions.value;
            state.lifecycle.activeDataplaneUrl.value = removeTrailingSlashes(state.lifecycle.dataPlaneUrl.value); // determine the path to fetch integration SDK from
            const intgCdnUrl = getIntegrationsCDNPath(APP_VERSION, lockIntegrationsVersion, destSDKBaseURL); // determine the path to fetch remote plugins from
            const pluginsCDNPath = getPluginsCDNPath(APP_VERSION, lockPluginsVersion, pluginsSDKBaseURL);
            updateStorageStateFromLoadOptions(this.logger);
            updateConsentsStateFromLoadOptions(this.logger);
            updateDataPlaneEventsStateFromLoadOptions(this.logger); // set application lifecycle state in global state
            r(() => {
              state.lifecycle.integrationsCDNPath.value = intgCdnUrl;
              state.lifecycle.pluginsCDNPath.value = pluginsCDNPath;
              if (logLevel) {
                state.lifecycle.logLevel.value = logLevel;
              }
              state.lifecycle.sourceConfigUrl.value = getSourceConfigURL(configUrl, state.lifecycle.writeKey.value, lockIntegrationsVersion, lockPluginsVersion, this.logger);
              state.metrics.metricsServiceUrl.value = `${state.lifecycle.activeDataplaneUrl.value}/${METRICS_SERVICE_ENDPOINT}`; // Data in the loadOptions state is already normalized
              state.nativeDestinations.loadOnlyIntegrations.value = integrations;
            });
            this.getConfig();
          }
          /**
           * Handle errors
           */
          onError(error, customMessage, shouldAlwaysThrow) {
            if (this.hasErrorHandler) {
              this.errorHandler?.onError(error, CONFIG_MANAGER, customMessage, shouldAlwaysThrow);
            } else {
              throw error;
            }
          }
          /**
           * A callback function that is executed once we fetch the source config response.
           * Use to construct and store information that are dependent on the sourceConfig.
           */
          processConfig(response, details) { // TODO: add retry logic with backoff based on rejectionDetails.xhr.status
            // We can use isErrRetryable utility method
            if (!response) {
              this.onError(SOURCE_CONFIG_FETCH_ERROR(details?.error));
              return;
            }
            let res;
            try {
              if (isString(response)) {
                res = JSON.parse(response);
              } else {
                res = response;
              }
            } catch (err) {
              this.onError(err, SOURCE_CONFIG_RESOLUTION_ERROR, true);
              return;
            }
            if (!isValidSourceConfig(res)) {
              this.onError(new Error(SOURCE_CONFIG_RESOLUTION_ERROR), undefined, true);
              return;
            } // Log error and abort if source is disabled
            if (res.source.enabled === false) {
              this.logger?.error(SOURCE_DISABLED_ERROR);
              return;
            } // set the values in state for reporting slice
            updateReportingState(res);
            const nativeDestinations = res.source.destinations.length > 0 ? filterEnabledDestination(res.source.destinations) : []; // set in the state --> source, destination, lifecycle, reporting
            r(() => { // set source related information in state
              state.source.value = {
                config: res.source.config,
                id: res.source.id,
                workspaceId: res.source.workspaceId
              }; // set device mode destination related information in state
              state.nativeDestinations.configuredDestinations.value = nativeDestinations; // set the desired optional plugins
              state.plugins.pluginsToLoadFromConfig.value = state.loadOptions.value.plugins ?? [];
              updateConsentsState(res); // set application lifecycle state
              state.lifecycle.status.value = 'configured';
            });
          }
          /**
           * A function to fetch source config either from /sourceConfig endpoint
           * or from getSourceConfig load option
           * @returns
           */
          getConfig() {
            const sourceConfigFunc = state.loadOptions.value.getSourceConfig;
            if (sourceConfigFunc) {
              if (!isFunction(sourceConfigFunc)) {
                throw new Error(SOURCE_CONFIG_OPTION_ERROR);
              } // Fetch source config from the function
              const res = sourceConfigFunc();
              if (res instanceof Promise) {
                res.then(pRes => this.processConfig(pRes)).catch(err => {
                  this.onError(err, 'SourceConfig');
                });
              } else {
                this.processConfig(res);
              }
            } else { // Fetch source configuration from the configured URL
              this.httpClient.getAsyncData({
                url: state.lifecycle.sourceConfigUrl.value,
                options: {
                  headers: {
                    'Content-Type': undefined
                  }
                },
                callback: this.processConfig
              });
            }
          }
        }

        /**
         * To get the timezone of the user
         *
         * @returns string
         */
        const getTimezone = () => {
          const timezone = new Date().toString().match(/([A-Z]+[+-]\d+)/);
          return timezone && timezone[1] ? timezone[1] : 'NA';
        };

        /**
         * Get the referrer URL
         * @returns The referrer URL
         */
        const getReferrer = () => document?.referrer || '$direct';
        /**
         * To get the canonical URL of the page
         * @returns canonical URL
         */
        const getCanonicalUrl = () => {
          const tags = document.getElementsByTagName('link');
          let canonicalUrl = '';
          for (let i = 0; tags[i]; i += 1) {
            const tag = tags[i];
            if (tag.getAttribute('rel') === 'canonical' && !canonicalUrl) {
              canonicalUrl = tag.getAttribute('href') ?? '';
              break;
            }
          }
          return canonicalUrl;
        };
        const getUserAgent = () => {
          if (isUndefined(globalThis.navigator)) {
            return null;
          }
          let {
            userAgent
          } = globalThis.navigator;
          const {
            brave
          } = globalThis.navigator; // For supporting Brave browser detection,
          // add "Brave/<version>" to the user agent with the version value from the Chrome component
          if (brave && Object.getPrototypeOf(brave).isBrave) { // Example:
            // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36
            const matchedArr = userAgent.match(/(chrome)\/([\w.]+)/i);
            if (matchedArr) {
              userAgent = `${userAgent} Brave/${matchedArr[2]}`;
            }
          }
          return userAgent;
        };
        const getLanguage = () => {
          if (isUndefined(globalThis.navigator)) {
            return null;
          }
          return globalThis.navigator.language ?? globalThis.navigator.browserLanguage;
        };
        /**
         * Default page properties
         * @returns Default page properties
         */
        const getDefaultPageProperties = () => {
          const canonicalUrl = getCanonicalUrl();
          let path = globalThis.location.pathname;
          const {
            href: tabUrl
          } = globalThis.location;
          let pageUrl = tabUrl;
          const {
            search
          } = globalThis.location; // If valid canonical URL is provided use this as page URL.
          if (canonicalUrl) {
            try {
              const urlObj = new URL(canonicalUrl); // If existing, query params of canonical URL will be used instead of the location.search ones
              if (urlObj.search === '') {
                pageUrl = canonicalUrl + search;
              } else {
                pageUrl = canonicalUrl;
              }
              path = urlObj.pathname;
            } catch (err) { // Do nothing
            }
          }
          const url = getUrlWithoutHash(pageUrl);
          const {
            title
          } = document;
          const referrer = getReferrer();
          return {
            path,
            referrer,
            referring_domain: getReferringDomain(referrer),
            search,
            title,
            url,
            tab_url: tabUrl
          };
        };

        // @ts-expect-error we're dynamically filling this value during build
        // eslint-disable-next-line no-constant-condition
        const POLYFILL_URL = `https://polyfill-fastly.io/v3/polyfill.min.js?version=3.111.0&features=${Object.keys(legacyJSEngineRequiredPolyfills).join('%2C')}`;
        const POLYFILL_LOAD_TIMEOUT = 10 * 1000; // 10 seconds
        const POLYFILL_SCRIPT_ID = 'rudderstackPolyfill';

        class CapabilitiesManager {
          constructor(errorHandler, logger) {
            this.logger = logger;
            this.errorHandler = errorHandler;
            this.externalSrcLoader = new ExternalSrcLoader(this.errorHandler, this.logger);
            this.onError = this.onError.bind(this);
            this.onReady = this.onReady.bind(this);
          }
          init() {
            try {
              this.prepareBrowserCapabilities();
              this.attachWindowListeners();
            } catch (err) {
              this.onError(err);
            }
          }
          /**
           * Detect supported capabilities and set values in state
           */ // eslint-disable-next-line class-methods-use-this
          detectBrowserCapabilities() {
            r(() => { // Storage related details
              state.capabilities.storage.isCookieStorageAvailable.value = isStorageAvailable(COOKIE_STORAGE, getStorageEngine(COOKIE_STORAGE), this.logger);
              state.capabilities.storage.isLocalStorageAvailable.value = isStorageAvailable(LOCAL_STORAGE, undefined, this.logger);
              state.capabilities.storage.isSessionStorageAvailable.value = isStorageAvailable(SESSION_STORAGE, undefined, this.logger); // Browser feature detection details
              state.capabilities.isBeaconAvailable.value = hasBeacon();
              state.capabilities.isUaCHAvailable.value = hasUAClientHints();
              state.capabilities.isCryptoAvailable.value = hasCrypto();
              state.capabilities.isIE11.value = isIE11();
              state.capabilities.isOnline.value = globalThis.navigator.onLine; // Get page context details
              state.context.userAgent.value = getUserAgent();
              state.context.locale.value = getLanguage();
              state.context.screen.value = getScreenDetails();
              state.context.timezone.value = getTimezone();
              if (hasUAClientHints()) {
                getUserAgentClientHint(uach => {
                  state.context['ua-ch'].value = uach;
                }, state.loadOptions.value.uaChTrackLevel);
              }
            }); // Ad blocker detection
            E(() => {
              if (state.loadOptions.value.sendAdblockPage === true && state.lifecycle.sourceConfigUrl.value !== undefined) {
                detectAdBlockers(this.errorHandler, this.logger);
              }
            });
          }
          /**
           * Detect if polyfills are required and then load script from polyfill URL
           */
          prepareBrowserCapabilities() {
            state.capabilities.isLegacyDOM.value = isLegacyJSEngine();
            const customPolyfillUrl = state.loadOptions.value.polyfillURL;
            let polyfillUrl = POLYFILL_URL;
            if (isDefinedAndNotNull(customPolyfillUrl)) {
              if (isValidURL(customPolyfillUrl)) {
                polyfillUrl = customPolyfillUrl;
              } else {
                this.logger?.warn(INVALID_POLYFILL_URL_WARNING(CAPABILITIES_MANAGER, customPolyfillUrl));
              }
            }
            const shouldLoadPolyfill = state.loadOptions.value.polyfillIfRequired && state.capabilities.isLegacyDOM.value && isValidURL(polyfillUrl);
            if (shouldLoadPolyfill) {
              const isDefaultPolyfillService = polyfillUrl !== state.loadOptions.value.polyfillURL;
              if (isDefaultPolyfillService) { // write key specific callback
                // NOTE: we're not putting this into RudderStackGlobals as providing the property path to the callback function in the polyfill URL is not possible
                const polyfillCallbackName = `RS_polyfillCallback_${state.lifecycle.writeKey.value}`;
                const polyfillCallback = () => {
                  this.onReady(); // Remove the entry from window so we don't leave room for calling it again
                  delete globalThis[polyfillCallbackName];
                };
                globalThis[polyfillCallbackName] = polyfillCallback;
                polyfillUrl = `${polyfillUrl}&callback=${polyfillCallbackName}`;
              }
              this.externalSrcLoader.loadJSFile({
                url: polyfillUrl,
                id: POLYFILL_SCRIPT_ID,
                async: true,
                timeout: POLYFILL_LOAD_TIMEOUT,
                callback: scriptId => {
                  if (!scriptId) {
                    this.onError(new Error(POLYFILL_SCRIPT_LOAD_ERROR(POLYFILL_SCRIPT_ID, polyfillUrl)));
                  } else if (!isDefaultPolyfillService) {
                    this.onReady();
                  }
                }
              });
            } else {
              this.onReady();
            }
          }
          /**
           * Attach listeners to window to observe event that update capabilities state values
           */
          attachWindowListeners() {
            globalThis.addEventListener('offline', () => {
              state.capabilities.isOnline.value = false;
            });
            globalThis.addEventListener('online', () => {
              state.capabilities.isOnline.value = true;
            });
            globalThis.addEventListener('resize', debounce(() => {
              state.context.screen.value = getScreenDetails();
            }, this));
          }
          /**
           * Set the lifecycle status to next phase
           */ // eslint-disable-next-line class-methods-use-this
          onReady() {
            this.detectBrowserCapabilities();
            state.lifecycle.status.value = 'browserCapabilitiesReady';
          }
          /**
           * Handles error
           * @param error The error object
           */
          onError(error) {
            if (this.errorHandler) {
              this.errorHandler.onError(error, CAPABILITIES_MANAGER);
            } else {
              throw error;
            }
          }
        }

        const CHANNEL = 'web'; // These are the top-level elements in the standard RudderStack event spec
        const TOP_LEVEL_ELEMENTS = ['integrations', 'anonymousId', 'originalTimestamp']; // Reserved elements in the context of standard RudderStack event spec
        // Typically, these elements are not allowed to be overridden by the user
        const CONTEXT_RESERVED_ELEMENTS = ['library', 'consentManagement', 'userAgent', 'ua-ch', 'screen']; // Reserved elements in the standard RudderStack event spec
        const RESERVED_ELEMENTS = ['id', 'anonymous_id', 'user_id', 'sent_at', 'timestamp', 'received_at', 'original_timestamp', 'event', 'event_text', 'channel', 'context_ip', 'context_request_ip', 'context_passed_ip', 'group_id', 'previous_id'];

        /**
         * A function to check given value is a number or not
         * @param num input value
         * @returns boolean
         */
        const isNumber = num => typeof num === 'number' && !Number.isNaN(num);
        /**
         * A function to check given number has minimum length or not
         * @param minimumLength     minimum length
         * @param num               input number
         * @returns boolean
         */
        const hasMinLength = (minimumLength, num) => num.toString().length >= minimumLength;
        /**
         * A function to check given value is a positive integer or not
         * @param num input value
         * @returns boolean
         */
        const isPositiveInteger = num => isNumber(num) && num >= 0 && Number.isInteger(num);

        const MIN_SESSION_ID_LENGTH = 10;
        /**
         * A function to validate current session and return true/false depending on that
         * @returns boolean
         */
        const hasSessionExpired = expiresAt => {
          const timestamp = Date.now();
          return Boolean(!expiresAt || timestamp > expiresAt);
        };
        /**
         * A function to generate session id
         * @returns number
         */
        const generateSessionId = () => Date.now();
        /**
         * Function to validate user provided sessionId
         * @param {number} sessionId
         * @param logger logger
         * @returns
         */
        const isManualSessionIdValid = (sessionId, logger) => {
          if (!sessionId || !isPositiveInteger(sessionId) || !hasMinLength(MIN_SESSION_ID_LENGTH, sessionId)) {
            logger?.warn(INVALID_SESSION_ID_WARNING(USER_SESSION_MANAGER, sessionId, MIN_SESSION_ID_LENGTH));
            return false;
          }
          return true;
        };
        /**
         * A function to generate new auto tracking session
         * @param sessionTimeout current timestamp
         * @returns SessionInfo
         */
        const generateAutoTrackingSession = sessionTimeout => {
          const timestamp = Date.now();
          const timeout = sessionTimeout || DEFAULT_SESSION_TIMEOUT_MS;
          return {
            id: timestamp, // set the current timestamp
            expiresAt: timestamp + timeout, // set the expiry time of the session
            timeout,
            sessionStart: undefined,
            autoTrack: true
          };
        };
        /**
         * A function to generate new manual tracking session
         * @param id Provided sessionId
         * @param logger Logger module
         * @returns SessionInfo
         */
        const generateManualTrackingSession = (id, logger) => {
          const sessionId = isManualSessionIdValid(id, logger) ? id : generateSessionId();
          return {
            id: sessionId,
            sessionStart: undefined,
            manualTrack: true
          };
        };
        const isStorageTypeValidForStoringData = storageType => Boolean(storageType === COOKIE_STORAGE || storageType === LOCAL_STORAGE || storageType === SESSION_STORAGE || storageType === MEMORY_STORAGE);
        /**
         * Generate a new anonymousId
         * @returns string anonymousID
         */
        const generateAnonymousId = () => generateUUID();

        /**
         * To get the page properties for context object
         * @param pageProps Page properties
         * @returns page properties object for context
         */
        const getContextPageProperties = pageProps => { // Need to get updated page details on each event as an event to notify on SPA URL changes does not seem to exist
          const curPageProps = getDefaultPageProperties();
          const ctxPageProps = {};
          Object.keys(curPageProps).forEach(key => {
            ctxPageProps[key] = pageProps?.[key] || curPageProps[key];
          });
          ctxPageProps.initial_referrer = pageProps?.initial_referrer || state.session.initialReferrer.value;
          ctxPageProps.initial_referring_domain = pageProps?.initial_referring_domain || state.session.initialReferringDomain.value;
          return ctxPageProps;
        };
        /**
         * Add any missing default page properties using values from options and defaults
         * @param properties Input page properties
         * @param options API options
         */
        const getUpdatedPageProperties = (properties, options) => {
          const optionsPageProps = options?.page || {};
          const pageProps = properties; // Need to get updated page details on each event as an event to notify on SPA URL changes does not seem to exist
          const curPageProps = getDefaultPageProperties();
          Object.keys(curPageProps).forEach(key => {
            if (isUndefined(pageProps[key])) {
              pageProps[key] = optionsPageProps[key] || curPageProps[key];
            }
          });
          if (isUndefined(pageProps.initial_referrer)) {
            pageProps.initial_referrer = optionsPageProps.initial_referrer || state.session.initialReferrer.value;
          }
          if (isUndefined(pageProps.initial_referring_domain)) {
            pageProps.initial_referring_domain = optionsPageProps.initial_referring_domain || state.session.initialReferringDomain.value;
          }
          return pageProps;
        };
        /**
         * Utility to check for reserved keys in the input object
         * @param obj Generic object
         * @param parentKeyPath Object's parent key path
         * @param logger Logger instance
         */
        const checkForReservedElementsInObject = (obj, parentKeyPath, logger) => {
          if (isObjectLiteralAndNotNull(obj)) {
            Object.keys(obj).forEach(property => {
              if (RESERVED_ELEMENTS.includes(property) || RESERVED_ELEMENTS.includes(property.toLowerCase())) {
                logger?.warn(RESERVED_KEYWORD_WARNING(EVENT_MANAGER, property, parentKeyPath, RESERVED_ELEMENTS));
              }
            });
          }
        };
        /**
         * Checks for reserved keys in traits, properties, and contextual traits
         * @param rudderEvent Generated rudder event
         * @param logger Logger instance
         */
        const checkForReservedElements = (rudderEvent, logger) => { //  properties, traits, contextualTraits are either undefined or object
          const {
            properties,
            traits,
            context
          } = rudderEvent;
          const {
            traits: contextualTraits
          } = context;
          checkForReservedElementsInObject(properties, 'properties', logger);
          checkForReservedElementsInObject(traits, 'traits', logger);
          checkForReservedElementsInObject(contextualTraits, 'context.traits', logger);
        };
        /**
         * Overrides the top-level event properties with data from API options
         * @param rudderEvent Generated rudder event
         * @param options API options
         */
        const updateTopLevelEventElements = (rudderEvent, options) => {
          if (options.anonymousId && isString(options.anonymousId)) { // eslint-disable-next-line no-param-reassign
            rudderEvent.anonymousId = options.anonymousId;
          }
          if (isNonEmptyObject(options.integrations)) { // eslint-disable-next-line no-param-reassign
            rudderEvent.integrations = options.integrations;
          }
          if (options.originalTimestamp && isString(options.originalTimestamp)) { // eslint-disable-next-line no-param-reassign
            rudderEvent.originalTimestamp = options.originalTimestamp;
          }
        };
        /**
         * To merge the contextual information in API options with existing data
         * @param rudderContext Generated rudder event
         * @param options API options
         * @param logger Logger instance
         */
        const getMergedContext = (rudderContext, options, logger) => {
          let context = rudderContext;
          Object.keys(options).forEach(key => {
            if (!TOP_LEVEL_ELEMENTS.includes(key) && !CONTEXT_RESERVED_ELEMENTS.includes(key)) {
              if (key !== 'context') {
                context = mergeDeepRight(context, {
                  [key]: options[key]
                });
              } else if (!isUndefined(options[key]) && isObjectLiteralAndNotNull(options[key])) {
                const tempContext = {};
                Object.keys(options[key]).forEach(e => {
                  if (!CONTEXT_RESERVED_ELEMENTS.includes(e)) {
                    tempContext[e] = options[key][e];
                  }
                });
                context = mergeDeepRight(context, {
                  ...tempContext
                });
              } else;
            }
          });
          return context;
        };
        /**
         * Updates rudder event object with data from the API options
         * @param rudderEvent Generated rudder event
         * @param options API options
         */
        const processOptions = (rudderEvent, options) => { // Only allow object type for options
          if (isObjectLiteralAndNotNull(options)) {
            updateTopLevelEventElements(rudderEvent, options); // eslint-disable-next-line no-param-reassign
            rudderEvent.context = getMergedContext(rudderEvent.context, options);
          }
        };
        /**
         * Returns the final integrations config for the event based on the global config and event's config
         * @param integrationsConfig Event's integrations config
         * @returns Final integrations config
         */
        const getEventIntegrationsConfig = integrationsConfig => {
          let finalIntgConfig;
          if (state.loadOptions.value.useGlobalIntegrationsConfigInEvents) { // Prefer the integrations object from the consent API response over the load API integrations object
            finalIntgConfig = state.consents.postConsent.value.integrations ?? state.nativeDestinations.loadOnlyIntegrations.value;
          } else if (integrationsConfig) {
            finalIntgConfig = integrationsConfig;
          } else {
            finalIntgConfig = DEFAULT_INTEGRATIONS_CONFIG;
          }
          return clone(finalIntgConfig);
        };
        /**
         * Enrich the base event object with data from state and the API options
         * @param rudderEvent RudderEvent object
         * @param options API options
         * @param pageProps Page properties
         * @param logger logger
         * @returns Enriched RudderEvent object
         */
        const getEnrichedEvent = (rudderEvent, options, pageProps, logger) => {
          const commonEventData = {
            channel: CHANNEL,
            context: {
              traits: clone(state.session.userTraits.value),
              sessionId: state.session.sessionInfo.value.id || undefined,
              sessionStart: state.session.sessionInfo.value.sessionStart || undefined, // Add 'consentManagement' only if consent management is enabled
              ...(state.consents.enabled.value && {
                consentManagement: {
                  deniedConsentIds: clone(state.consents.data.value.deniedConsentIds),
                  allowedConsentIds: clone(state.consents.data.value.allowedConsentIds),
                  provider: state.consents.provider.value,
                  resolutionStrategy: state.consents.resolutionStrategy.value
                }
              }),
              'ua-ch': state.context['ua-ch'].value,
              app: state.context.app.value,
              library: state.context.library.value,
              userAgent: state.context.userAgent.value,
              os: state.context.os.value,
              locale: state.context.locale.value,
              screen: state.context.screen.value,
              campaign: extractUTMParameters(globalThis.location.href),
              page: getContextPageProperties(pageProps),
              timezone: state.context.timezone.value, // Add auto tracking information
              ...(state.autoTrack.enabled.value && {
                autoTrack: {
                  ...(state.autoTrack.pageLifecycle.enabled.value && {
                    page: {
                      visitId: state.autoTrack.pageLifecycle.visitId.value
                    }
                  })
                }
              })
            },
            originalTimestamp: getCurrentTimeFormatted(),
            messageId: generateUUID(),
            userId: rudderEvent.userId || state.session.userId.value
          };
          if (!isStorageTypeValidForStoringData(state.storage.entries.value.anonymousId?.type)) { // Generate new anonymous id for each request
            commonEventData.anonymousId = generateAnonymousId();
          } else { // Type casting to string as the user session manager will take care of initializing the value
            commonEventData.anonymousId = state.session.anonymousId.value;
          } // set truly anonymous tracking flag
          if (state.storage.trulyAnonymousTracking.value) {
            commonEventData.context.trulyAnonymousTracking = true;
          }
          if (rudderEvent.type === 'identify') {
            commonEventData.context.traits = state.storage.entries.value.userTraits?.type !== NO_STORAGE ? clone(state.session.userTraits.value) : rudderEvent.context.traits;
          }
          if (rudderEvent.type === 'group') {
            if (rudderEvent.groupId || state.session.groupId.value) {
              commonEventData.groupId = rudderEvent.groupId || state.session.groupId.value;
            }
            if (rudderEvent.traits || state.session.groupTraits.value) {
              commonEventData.traits = state.storage.entries.value.groupTraits?.type !== NO_STORAGE ? clone(state.session.groupTraits.value) : rudderEvent.traits;
            }
          }
          const processedEvent = mergeDeepRight(rudderEvent, commonEventData); // Set the default values for the event properties
          // matching with v1.1 payload
          if (processedEvent.event === undefined) {
            processedEvent.event = null;
          }
          if (processedEvent.properties === undefined) {
            processedEvent.properties = null;
          }
          processOptions(processedEvent, options);
          checkForReservedElements(processedEvent, logger); // Update the integrations config for the event
          processedEvent.integrations = getEventIntegrationsConfig(processedEvent.integrations);
          return processedEvent;
        };

        class RudderEventFactory {
          constructor(logger) {
            this.logger = logger;
          }
          /**
           * Generate a 'page' event based on the user-input fields
           * @param category Page's category
           * @param name Page name
           * @param properties Page properties
           * @param options API options
           */
          generatePageEvent(category, name, properties, options) {
            let props = properties ?? {};
            props = getUpdatedPageProperties(props, options);
            const pageEvent = {
              properties: props,
              name,
              category,
              type: 'page'
            };
            return getEnrichedEvent(pageEvent, options, props, this.logger);
          }
          /**
           * Generate a 'track' event based on the user-input fields
           * @param event The event name
           * @param properties Event properties
           * @param options API options
           */
          generateTrackEvent(event, properties, options) {
            const trackEvent = {
              properties,
              event,
              type: 'track'
            };
            return getEnrichedEvent(trackEvent, options, undefined, this.logger);
          }
          /**
           * Generate an 'identify' event based on the user-input fields
           * @param userId New user ID
           * @param traits new traits
           * @param options API options
           */
          generateIdentifyEvent(userId, traits, options) {
            const identifyEvent = {
              userId,
              type: 'identify',
              context: {
                traits
              }
            };
            return getEnrichedEvent(identifyEvent, options, undefined, this.logger);
          }
          /**
           * Generate an 'alias' event based on the user-input fields
           * @param to New user ID
           * @param from Old user ID
           * @param options API options
           */
          generateAliasEvent(to, from, options) {
            const aliasEvent = {
              previousId: from,
              type: 'alias'
            };
            const enrichedEvent = getEnrichedEvent(aliasEvent, options, undefined, this.logger); // override the User ID from the API inputs
            enrichedEvent.userId = to ?? enrichedEvent.userId;
            return enrichedEvent;
          }
          /**
           * Generate a 'group' event based on the user-input fields
           * @param groupId New group ID
           * @param traits new group traits
           * @param options API options
           */
          generateGroupEvent(groupId, traits, options) {
            const groupEvent = {
              type: 'group'
            };
            if (groupId) {
              groupEvent.groupId = groupId;
            }
            if (traits) {
              groupEvent.traits = traits;
            }
            return getEnrichedEvent(groupEvent, options, undefined, this.logger);
          }
          /**
           * Generates a new RudderEvent object based on the user-input fields
           * @param event API event parameters object
           * @returns A RudderEvent object
           */
          create(event) {
            let eventObj;
            switch (event.type) {
              case 'page':
                eventObj = this.generatePageEvent(event.category, event.name, event.properties, event.options);
                break;
              case 'track':
                eventObj = this.generateTrackEvent(event.name, event.properties, event.options);
                break;
              case 'identify':
                eventObj = this.generateIdentifyEvent(event.userId, event.traits, event.options);
                break;
              case 'alias':
                eventObj = this.generateAliasEvent(event.to, event.from, event.options);
                break;
              case 'group':
                eventObj = this.generateGroupEvent(event.groupId, event.traits, event.options);
                break;
            }
            return eventObj;
          }
        }

        /**
         * A service to generate valid event payloads and queue them for processing
         */
        class EventManager {
          /**
           *
           * @param eventRepository Event repository instance
           * @param userSessionManager UserSession Manager instance
           * @param errorHandler Error handler object
           * @param logger Logger object
           */
          constructor(eventRepository, userSessionManager, errorHandler, logger) {
            this.eventRepository = eventRepository;
            this.userSessionManager = userSessionManager;
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.eventFactory = new RudderEventFactory(this.logger);
            this.onError = this.onError.bind(this);
          }
          /**
           * Initializes the event manager
           */
          init() {
            this.eventRepository.init();
          }
          resume() {
            this.eventRepository.resume();
          }
          /**
           * Consumes a new incoming event
           * @param event Incoming event data
           */
          addEvent(event) {
            this.userSessionManager.refreshSession();
            const rudderEvent = this.eventFactory.create(event);
            if (rudderEvent) {
              this.eventRepository.enqueue(rudderEvent, event.callback);
            } else {
              this.onError(new Error(EVENT_OBJECT_GENERATION_ERROR));
            }
          }
          /**
           * Handles error
           * @param error The error object
           */
          onError(error, customMessage, shouldAlwaysThrow) {
            if (this.errorHandler) {
              this.errorHandler.onError(error, EVENT_MANAGER, customMessage, shouldAlwaysThrow);
            } else {
              throw error;
            }
          }
        }

        class UserSessionManager {
          constructor(errorHandler, logger, pluginsManager, storeManager, httpClient) {
            this.storeManager = storeManager;
            this.pluginsManager = pluginsManager;
            this.logger = logger;
            this.errorHandler = errorHandler;
            this.httpClient = httpClient;
            this.onError = this.onError.bind(this);
            this.serverSideCookieDebounceFuncs = {};
          }
          /**
           * Initialize User session with values from storage
           */
          init() {
            this.syncStorageDataToState(); // Register the effect to sync with storage
            this.registerEffects();
          }
          syncStorageDataToState() {
            this.migrateStorageIfNeeded();
            this.migrateDataFromPreviousStorage(); // get the values from storage and set it again
            this.setUserId(this.getUserId());
            this.setUserTraits(this.getUserTraits());
            this.setGroupId(this.getGroupId());
            this.setGroupTraits(this.getGroupTraits());
            const {
              externalAnonymousIdCookieName,
              anonymousIdOptions
            } = state.loadOptions.value;
            let externalAnonymousId;
            if (isDefinedAndNotNull(externalAnonymousIdCookieName) && typeof externalAnonymousIdCookieName === 'string') {
              externalAnonymousId = this.getExternalAnonymousIdByCookieName(externalAnonymousIdCookieName);
            }
            this.setAnonymousId(externalAnonymousId ?? this.getAnonymousId(anonymousIdOptions));
            this.setAuthToken(this.getAuthToken());
            this.setInitialReferrerInfo();
            this.configureSessionTracking();
          }
          configureSessionTracking() {
            let sessionInfo = this.getSessionInfo();
            if (this.isPersistenceEnabledForStorageEntry('sessionInfo')) {
              const configuredSessionTrackingInfo = this.getConfiguredSessionTrackingInfo();
              const initialSessionInfo = sessionInfo ?? defaultSessionConfiguration;
              sessionInfo = {
                ...initialSessionInfo,
                ...configuredSessionTrackingInfo, // If manualTrack is set to true in the storage, then autoTrack should be false
                autoTrack: configuredSessionTrackingInfo.autoTrack && initialSessionInfo.manualTrack !== true
              }; // If both autoTrack and manualTrack are disabled, reset the session info to default values
              if (!sessionInfo.autoTrack && sessionInfo.manualTrack !== true) {
                sessionInfo = DEFAULT_USER_SESSION_VALUES.sessionInfo;
              }
            } else {
              sessionInfo = DEFAULT_USER_SESSION_VALUES.sessionInfo;
            }
            state.session.sessionInfo.value = sessionInfo; // If auto session tracking is enabled start the session tracking
            if (state.session.sessionInfo.value.autoTrack) {
              this.startOrRenewAutoTracking(state.session.sessionInfo.value);
            }
          }
          setInitialReferrerInfo() {
            const persistedInitialReferrer = this.getInitialReferrer();
            const persistedInitialReferringDomain = this.getInitialReferringDomain();
            if (persistedInitialReferrer && persistedInitialReferringDomain) {
              this.setInitialReferrer(persistedInitialReferrer);
              this.setInitialReferringDomain(persistedInitialReferringDomain);
            } else {
              const initialReferrer = persistedInitialReferrer || getReferrer();
              this.setInitialReferrer(initialReferrer);
              this.setInitialReferringDomain(getReferringDomain(initialReferrer));
            }
          }
          isPersistenceEnabledForStorageEntry(entryName) {
            return isStorageTypeValidForStoringData(state.storage.entries.value[entryName]?.type);
          }
          migrateDataFromPreviousStorage() {
            const entries = state.storage.entries.value;
            const storageTypesForMigration = [COOKIE_STORAGE, LOCAL_STORAGE, SESSION_STORAGE];
            Object.keys(entries).forEach(entry => {
              const key = entry;
              const currentStorage = entries[key]?.type;
              const curStore = this.storeManager?.getStore(storageClientDataStoreNameMap[currentStorage]);
              if (curStore) {
                storageTypesForMigration.forEach(storage => {
                  const store = this.storeManager?.getStore(storageClientDataStoreNameMap[storage]);
                  if (store && storage !== currentStorage) {
                    const value = store.get(COOKIE_KEYS[key]);
                    if (isDefinedNotNullAndNotEmptyString(value)) {
                      curStore.set(COOKIE_KEYS[key], value);
                    }
                    store.remove(COOKIE_KEYS[key]);
                  }
                });
              }
            });
          }
          migrateStorageIfNeeded() {
            if (!state.storage.migrate.value) {
              return;
            }
            const persistentStoreNames = [CLIENT_DATA_STORE_COOKIE, CLIENT_DATA_STORE_LS, CLIENT_DATA_STORE_SESSION];
            const stores = [];
            persistentStoreNames.forEach(storeName => {
              const store = this.storeManager?.getStore(storeName);
              if (store) {
                stores.push(store);
              }
            });
            Object.keys(COOKIE_KEYS).forEach(storageKey => {
              const storageEntry = COOKIE_KEYS[storageKey];
              stores.forEach(store => {
                const migratedVal = this.pluginsManager?.invokeSingle('storage.migrate', storageEntry, store.engine, this.errorHandler, this.logger); // Skip setting the value if it is null or undefined
                // as those values indicate there is no need for migration or
                // migration failed
                if (!isNullOrUndefined(migratedVal)) {
                  store.set(storageEntry, migratedVal);
                }
              });
            });
          }
          getConfiguredSessionTrackingInfo() {
            let autoTrack = state.loadOptions.value.sessions?.autoTrack !== false; // Do not validate any further if autoTrack is disabled
            if (!autoTrack) {
              return {
                autoTrack
              };
            }
            let timeout;
            const configuredSessionTimeout = state.loadOptions.value.sessions?.timeout;
            if (!isPositiveInteger(configuredSessionTimeout)) {
              this.logger?.warn(TIMEOUT_NOT_NUMBER_WARNING(USER_SESSION_MANAGER, configuredSessionTimeout, DEFAULT_SESSION_TIMEOUT_MS));
              timeout = DEFAULT_SESSION_TIMEOUT_MS;
            } else {
              timeout = configuredSessionTimeout;
            }
            if (timeout === 0) {
              this.logger?.warn(TIMEOUT_ZERO_WARNING(USER_SESSION_MANAGER));
              autoTrack = false;
            } // In case user provides a timeout value greater than 0 but less than 10 seconds SDK will show a warning
            // and will proceed with it
            if (timeout > 0 && timeout < MIN_SESSION_TIMEOUT_MS) {
              this.logger?.warn(TIMEOUT_NOT_RECOMMENDED_WARNING(USER_SESSION_MANAGER, timeout, MIN_SESSION_TIMEOUT_MS));
            }
            return {
              timeout,
              autoTrack
            };
          }
          /**
           * Handles error
           * @param error The error object
           */
          onError(error, customMessage) {
            if (this.errorHandler) {
              this.errorHandler.onError(error, USER_SESSION_MANAGER, customMessage);
            } else {
              throw error;
            }
          }
          /**
           * A function to encrypt the cookie value and return the encrypted data
           * @param cookiesData
           * @param store
           * @returns
           */
          getEncryptedCookieData(cookiesData, store) {
            const encryptedCookieData = [];
            cookiesData.forEach(cData => {
              const encryptedValue = store?.encrypt(stringifyWithoutCircular(cData.value, false, [], this.logger));
              if (isDefinedAndNotNull(encryptedValue)) {
                encryptedCookieData.push({
                  name: cData.name,
                  value: encryptedValue
                });
              }
            });
            return encryptedCookieData;
          }
          /**
           * A function that makes request to data service to set the cookie
           * @param encryptedCookieData
           * @param callback
           */
          makeRequestToSetCookie(encryptedCookieData, callback) {
            this.httpClient?.getAsyncData({
              url: state.serverCookies.dataServiceUrl.value,
              options: {
                method: 'POST',
                data: stringifyWithoutCircular({
                  reqType: 'setCookies',
                  workspaceId: state.source.value?.workspaceId,
                  data: {
                    options: {
                      maxAge: state.storage.cookie.value?.maxage,
                      path: state.storage.cookie.value?.path,
                      domain: state.storage.cookie.value?.domain,
                      sameSite: state.storage.cookie.value?.samesite,
                      secure: state.storage.cookie.value?.secure,
                      expires: state.storage.cookie.value?.expires
                    },
                    cookies: encryptedCookieData
                  }
                }),
                sendRawData: true,
                withCredentials: true
              },
              isRawResponse: true,
              callback
            });
          }
          /**
           * A function to make an external request to set the cookie from server side
           * @param key       cookie name
           * @param value     encrypted cookie value
           */
          setServerSideCookies(cookiesData, cb, store) {
            try { // encrypt cookies values
              const encryptedCookieData = this.getEncryptedCookieData(cookiesData, store);
              if (encryptedCookieData.length > 0) { // make request to data service to set the cookie from server side
                this.makeRequestToSetCookie(encryptedCookieData, (res, details) => {
                  if (details?.xhr?.status === 200) {
                    cookiesData.forEach(cData => {
                      const cookieValue = store?.get(cData.name);
                      const before = stringifyWithoutCircular(cData.value, false, []);
                      const after = stringifyWithoutCircular(cookieValue, false, []);
                      if (after !== before) {
                        this.logger?.error(FAILED_SETTING_COOKIE_FROM_SERVER_ERROR(cData.name));
                        if (cb) {
                          cb(cData.name, cData.value);
                        }
                      }
                    });
                  } else {
                    this.logger?.error(DATA_SERVER_REQUEST_FAIL_ERROR(details?.xhr?.status));
                    cookiesData.forEach(each => {
                      if (cb) {
                        cb(each.name, each.value);
                      }
                    });
                  }
                });
              }
            } catch (e) {
              this.onError(e, FAILED_SETTING_COOKIE_FROM_SERVER_GLOBAL_ERROR);
              cookiesData.forEach(each => {
                if (cb) {
                  cb(each.name, each.value);
                }
              });
            }
          }
          /**
           * A function to sync values in storage
           * @param sessionKey
           * @param value
           */
          syncValueToStorage(sessionKey, value) {
            const entries = state.storage.entries.value;
            const storageType = entries[sessionKey]?.type;
            if (isStorageTypeValidForStoringData(storageType)) {
              const curStore = this.storeManager?.getStore(storageClientDataStoreNameMap[storageType]);
              const key = entries[sessionKey]?.key;
              if (value && (isString(value) || isNonEmptyObject(value))) { // if useServerSideCookies load option is set to true
                // set the cookie from server side
                if (state.serverCookies.isEnabledServerSideCookies.value && storageType === COOKIE_STORAGE) {
                  if (this.serverSideCookieDebounceFuncs[sessionKey]) {
                    globalThis.clearTimeout(this.serverSideCookieDebounceFuncs[sessionKey]);
                  }
                  this.serverSideCookieDebounceFuncs[sessionKey] = globalThis.setTimeout(() => {
                    this.setServerSideCookies([{
                      name: key,
                      value
                    }], (cookieName, cookieValue) => {
                      curStore?.set(cookieName, cookieValue);
                    }, curStore);
                  }, SERVER_SIDE_COOKIES_DEBOUNCE_TIME);
                } else {
                  curStore?.set(key, value);
                }
              } else {
                curStore?.remove(key);
              }
            }
          }
          /**
           * Function to update storage whenever state value changes
           */
          registerEffects() { // This will work as long as the user session entry key names are same as the state keys
            USER_SESSION_KEYS.forEach(sessionKey => {
              E(() => {
                this.syncValueToStorage(sessionKey, state.session[sessionKey].value);
              });
            });
          }
          /**
           * Sets anonymous id in the following precedence:
           *
           * 1. anonymousId: Id directly provided to the function.
           * 2. rudderAmpLinkerParam: value generated from linker query parm (rudderstack)
           *    using parseLinker util.
           * 3. generateUUID: A new unique id is generated and assigned.
           */
          setAnonymousId(anonymousId, rudderAmpLinkerParam) {
            let finalAnonymousId = anonymousId;
            if (!isString(anonymousId) || !finalAnonymousId) {
              finalAnonymousId = undefined;
            }
            if (this.isPersistenceEnabledForStorageEntry('anonymousId')) {
              if (!finalAnonymousId && rudderAmpLinkerParam) {
                const linkerPluginsResult = this.pluginsManager?.invokeSingle('userSession.anonymousIdGoogleLinker', rudderAmpLinkerParam);
                finalAnonymousId = linkerPluginsResult;
              }
              finalAnonymousId = finalAnonymousId || generateAnonymousId();
            } else {
              finalAnonymousId = DEFAULT_USER_SESSION_VALUES.anonymousId;
            }
            state.session.anonymousId.value = finalAnonymousId;
          }
          /**
           * Fetches anonymousId
           * @param options option to fetch it from external source
           * @returns anonymousId
           */
          getAnonymousId(options) {
            const storage = state.storage.entries.value.anonymousId?.type; // fetch the anonymousId from storage
            if (isStorageTypeValidForStoringData(storage)) {
              let persistedAnonymousId = this.getEntryValue('anonymousId');
              if (!persistedAnonymousId && options) { // fetch anonymousId from external source
                const autoCapturedAnonymousId = this.pluginsManager?.invokeSingle('storage.getAnonymousId', getStorageEngine, options);
                persistedAnonymousId = autoCapturedAnonymousId;
              }
              state.session.anonymousId.value = persistedAnonymousId || generateAnonymousId();
            }
            return state.session.anonymousId.value;
          }
          getEntryValue(sessionKey) {
            const entries = state.storage.entries.value;
            const storageType = entries[sessionKey]?.type;
            if (isStorageTypeValidForStoringData(storageType)) {
              const store = this.storeManager?.getStore(storageClientDataStoreNameMap[storageType]);
              const storageKey = entries[sessionKey]?.key;
              return store?.get(storageKey) ?? null;
            }
            return null;
          }
          getExternalAnonymousIdByCookieName(key) {
            const storageEngine = getStorageEngine(COOKIE_STORAGE);
            if (storageEngine?.isEnabled) {
              return storageEngine.getItem(key) ?? null;
            }
            return null;
          }
          /**
           * Fetches User Id
           * @returns
           */
          getUserId() {
            return this.getEntryValue('userId');
          }
          /**
           * Fetches User Traits
           * @returns
           */
          getUserTraits() {
            return this.getEntryValue('userTraits');
          }
          /**
           * Fetches Group Id
           * @returns
           */
          getGroupId() {
            return this.getEntryValue('groupId');
          }
          /**
           * Fetches Group Traits
           * @returns
           */
          getGroupTraits() {
            return this.getEntryValue('groupTraits');
          }
          /**
           * Fetches Initial Referrer
           * @returns
           */
          getInitialReferrer() {
            return this.getEntryValue('initialReferrer');
          }
          /**
           * Fetches Initial Referring domain
           * @returns
           */
          getInitialReferringDomain() {
            return this.getEntryValue('initialReferringDomain');
          }
          /**
           * Fetches session tracking information from storage
           * @returns
           */
          getSessionInfo() {
            return this.getEntryValue('sessionInfo');
          }
          /**
           * Fetches auth token from storage
           * @returns
           */
          getAuthToken() {
            return this.getEntryValue('authToken');
          }
          /**
           * If session is active it returns the sessionId
           * @returns
           */
          getSessionId() {
            const sessionInfo = this.getSessionInfo() ?? DEFAULT_USER_SESSION_VALUES.sessionInfo;
            if (sessionInfo.autoTrack && !hasSessionExpired(sessionInfo.expiresAt) || sessionInfo.manualTrack) {
              return sessionInfo.id ?? null;
            }
            return null;
          }
          /**
           * A function to keep the session information up to date in the state
           * before using it for building event payloads.
           */
          refreshSession() {
            let sessionInfo = this.getSessionInfo() ?? DEFAULT_USER_SESSION_VALUES.sessionInfo;
            if (sessionInfo.autoTrack || sessionInfo.manualTrack) {
              if (sessionInfo.autoTrack) {
                this.startOrRenewAutoTracking(sessionInfo);
                sessionInfo = state.session.sessionInfo.value;
              } // Note that if sessionStart is false, then it's an active session.
              // So, we needn't update the session info.
              //
              // For other scenarios,
              // 1. If sessionStart is undefined, then it's a new session.
              //   Mark it as sessionStart.
              // 2. If sessionStart is true, then need to flip it for the future events.
              if (sessionInfo.sessionStart === undefined) {
                sessionInfo = {
                  ...sessionInfo,
                  sessionStart: true
                };
              } else if (sessionInfo.sessionStart) {
                sessionInfo = {
                  ...sessionInfo,
                  sessionStart: false
                };
              }
            } // Always write to state (in-turn to storage) to keep the session info up to date.
            state.session.sessionInfo.value = sessionInfo;
            if (state.lifecycle.status.value !== 'readyExecuted') { // Force update the storage as the 'effect' blocks are not getting triggered
              // when processing preload buffered requests
              this.syncValueToStorage('sessionInfo', sessionInfo);
            }
          }
          /**
           * Reset state values
           * @param resetAnonymousId
           * @param noNewSessionStart
           * @returns
           */
          reset(resetAnonymousId, noNewSessionStart) {
            const {
              session
            } = state;
            const {
              manualTrack,
              autoTrack
            } = session.sessionInfo.value;
            r(() => {
              session.userId.value = DEFAULT_USER_SESSION_VALUES.userId;
              session.userTraits.value = DEFAULT_USER_SESSION_VALUES.userTraits;
              session.groupId.value = DEFAULT_USER_SESSION_VALUES.groupId;
              session.groupTraits.value = DEFAULT_USER_SESSION_VALUES.groupTraits;
              session.authToken.value = DEFAULT_USER_SESSION_VALUES.authToken;
              if (resetAnonymousId === true) { // This will generate a new anonymous ID
                this.setAnonymousId();
              }
              if (noNewSessionStart) {
                return;
              }
              if (autoTrack) {
                session.sessionInfo.value = DEFAULT_USER_SESSION_VALUES.sessionInfo;
                this.startOrRenewAutoTracking(session.sessionInfo.value);
              } else if (manualTrack) {
                this.startManualTrackingInternal();
              }
            });
          }
          /**
           * Set user Id
           * @param userId
           */
          setUserId(userId) {
            state.session.userId.value = this.isPersistenceEnabledForStorageEntry('userId') && userId ? userId : DEFAULT_USER_SESSION_VALUES.userId;
          }
          /**
           * Set user traits
           * @param traits
           */
          setUserTraits(traits) {
            state.session.userTraits.value = this.isPersistenceEnabledForStorageEntry('userTraits') && isObjectLiteralAndNotNull(traits) ? mergeDeepRight(state.session.userTraits.value ?? DEFAULT_USER_SESSION_VALUES.userTraits, traits) : DEFAULT_USER_SESSION_VALUES.userTraits;
          }
          /**
           * Set group Id
           * @param groupId
           */
          setGroupId(groupId) {
            state.session.groupId.value = this.isPersistenceEnabledForStorageEntry('groupId') && groupId ? groupId : DEFAULT_USER_SESSION_VALUES.groupId;
          }
          /**
           * Set group traits
           * @param traits
           */
          setGroupTraits(traits) {
            state.session.groupTraits.value = this.isPersistenceEnabledForStorageEntry('groupTraits') && isObjectLiteralAndNotNull(traits) ? mergeDeepRight(state.session.groupTraits.value ?? DEFAULT_USER_SESSION_VALUES.groupTraits, traits) : DEFAULT_USER_SESSION_VALUES.groupTraits;
          }
          /**
           * Set initial referrer
           * @param referrer
           */
          setInitialReferrer(referrer) {
            state.session.initialReferrer.value = this.isPersistenceEnabledForStorageEntry('initialReferrer') && referrer ? referrer : DEFAULT_USER_SESSION_VALUES.initialReferrer;
          }
          /**
           * Set initial referring domain
           * @param {String} referringDomain
           */
          setInitialReferringDomain(referringDomain) {
            state.session.initialReferringDomain.value = this.isPersistenceEnabledForStorageEntry('initialReferringDomain') && referringDomain ? referringDomain : DEFAULT_USER_SESSION_VALUES.initialReferringDomain;
          }
          /**
           * A function to check for existing session details and depending on that create a new session
           */
          startOrRenewAutoTracking(sessionInfo) {
            if (hasSessionExpired(sessionInfo.expiresAt)) {
              state.session.sessionInfo.value = generateAutoTrackingSession(sessionInfo.timeout);
            } else {
              const timestamp = Date.now();
              const timeout = sessionInfo.timeout;
              state.session.sessionInfo.value = mergeDeepRight(sessionInfo, {
                expiresAt: timestamp + timeout // set the expiry time of the session
              });
            }
          }
          /**
           * A function method to start a manual session
           * @param {number} id     session identifier
           * @returns
           */
          start(id) {
            state.session.sessionInfo.value = generateManualTrackingSession(id, this.logger);
          }
          /**
           * An internal function to start manual session
           */
          startManualTrackingInternal() {
            this.start(Date.now());
          }
          /**
           * A public method to end an ongoing session.
           */
          end() {
            state.session.sessionInfo.value = DEFAULT_USER_SESSION_VALUES.sessionInfo;
          }
          /**
           * Set auth token
           * @param userId
           */
          setAuthToken(token) {
            state.session.authToken.value = this.isPersistenceEnabledForStorageEntry('authToken') && token ? token : DEFAULT_USER_SESSION_VALUES.authToken;
          }
        }

        /**
         * Plugins to be loaded in the plugins loadOption is not defined
         */
        const defaultOptionalPluginsList = ['BeaconQueue', 'Bugsnag', 'CustomConsentManager', 'DeviceModeDestinations', 'DeviceModeTransformation', 'ErrorReporting', 'ExternalAnonymousId', 'GoogleLinker', 'IubendaConsentManager', 'KetchConsentManager', 'NativeDestinationQueue', 'OneTrustConsentManager', 'StorageEncryption', 'StorageEncryptionLegacy', 'StorageMigrator', 'XhrQueue'];

        const normalizeLoadOptions = (loadOptionsFromState, loadOptions) => { // TODO: Maybe add warnings for invalid values
          const normalizedLoadOpts = clone(loadOptions);
          if (!isString(normalizedLoadOpts.setCookieDomain)) {
            delete normalizedLoadOpts.setCookieDomain;
          }
          const cookieSameSiteValues = ['Strict', 'Lax', 'None'];
          if (!cookieSameSiteValues.includes(normalizedLoadOpts.sameSiteCookie)) {
            delete normalizedLoadOpts.sameSiteCookie;
          }
          normalizedLoadOpts.secureCookie = normalizedLoadOpts.secureCookie === true;
          normalizedLoadOpts.sameDomainCookiesOnly = normalizedLoadOpts.sameDomainCookiesOnly === true;
          const uaChTrackLevels = ['none', 'default', 'full'];
          if (!uaChTrackLevels.includes(normalizedLoadOpts.uaChTrackLevel)) {
            delete normalizedLoadOpts.uaChTrackLevel;
          }
          if (!isNonEmptyObject(normalizedLoadOpts.integrations)) {
            delete normalizedLoadOpts.integrations;
          }
          normalizedLoadOpts.plugins = normalizedLoadOpts.plugins ?? defaultOptionalPluginsList;
          normalizedLoadOpts.useGlobalIntegrationsConfigInEvents = normalizedLoadOpts.useGlobalIntegrationsConfigInEvents === true;
          normalizedLoadOpts.bufferDataPlaneEventsUntilReady = normalizedLoadOpts.bufferDataPlaneEventsUntilReady === true;
          normalizedLoadOpts.sendAdblockPage = normalizedLoadOpts.sendAdblockPage === true;
          normalizedLoadOpts.useServerSideCookies = normalizedLoadOpts.useServerSideCookies === true;
          if (normalizedLoadOpts.dataServiceEndpoint && typeof normalizedLoadOpts.dataServiceEndpoint !== 'string') {
            delete normalizedLoadOpts.dataServiceEndpoint;
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.sendAdblockPageOptions)) {
            delete normalizedLoadOpts.sendAdblockPageOptions;
          }
          if (!isDefined(normalizedLoadOpts.loadIntegration)) {
            delete normalizedLoadOpts.loadIntegration;
          } else {
            normalizedLoadOpts.loadIntegration = normalizedLoadOpts.loadIntegration === true;
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.storage)) {
            delete normalizedLoadOpts.storage;
          } else {
            normalizedLoadOpts.storage = removeUndefinedAndNullValues(normalizedLoadOpts.storage);
            normalizedLoadOpts.storage.migrate = normalizedLoadOpts.storage?.migrate === true;
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.beaconQueueOptions)) {
            delete normalizedLoadOpts.beaconQueueOptions;
          } else {
            normalizedLoadOpts.beaconQueueOptions = removeUndefinedAndNullValues(normalizedLoadOpts.beaconQueueOptions);
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.destinationsQueueOptions)) {
            delete normalizedLoadOpts.destinationsQueueOptions;
          } else {
            normalizedLoadOpts.destinationsQueueOptions = removeUndefinedAndNullValues(normalizedLoadOpts.destinationsQueueOptions);
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.queueOptions)) {
            delete normalizedLoadOpts.queueOptions;
          } else {
            normalizedLoadOpts.queueOptions = removeUndefinedAndNullValues(normalizedLoadOpts.queueOptions);
          }
          normalizedLoadOpts.lockIntegrationsVersion = normalizedLoadOpts.lockIntegrationsVersion === true;
          normalizedLoadOpts.lockPluginsVersion = normalizedLoadOpts.lockPluginsVersion === true;
          if (!isNumber(normalizedLoadOpts.dataPlaneEventsBufferTimeout)) {
            delete normalizedLoadOpts.dataPlaneEventsBufferTimeout;
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.storage?.cookie)) {
            delete normalizedLoadOpts.storage?.cookie;
          } else {
            normalizedLoadOpts.storage.cookie = removeUndefinedAndNullValues(normalizedLoadOpts.storage?.cookie);
          }
          if (!isObjectLiteralAndNotNull(normalizedLoadOpts.preConsent)) {
            delete normalizedLoadOpts.preConsent;
          } else {
            normalizedLoadOpts.preConsent = removeUndefinedAndNullValues(normalizedLoadOpts.preConsent);
          }
          const mergedLoadOptions = mergeDeepRight(loadOptionsFromState, normalizedLoadOpts);
          return mergedLoadOptions;
        };

        const DATA_PLANE_QUEUE_EXT_POINT_PREFIX = 'dataplaneEventsQueue';
        const DESTINATIONS_QUEUE_EXT_POINT_PREFIX = 'destinationsEventsQueue';
        const DMT_EXT_POINT_PREFIX = 'transformEvent';

        /**
         * Filters and returns the user supplied integrations config that should take preference over the destination specific integrations config
         * @param eventIntgConfig User supplied integrations config at event level
         * @param destinationsIntgConfig Cumulative integrations config from all destinations
         * @returns Filtered user supplied integrations config
         */
        const getOverriddenIntegrationOptions = (eventIntgConfig, destinationsIntgConfig) => Object.keys(eventIntgConfig).filter(intgName => eventIntgConfig[intgName] !== true || !destinationsIntgConfig[intgName]).reduce((obj, key) => {
          const retVal = clone(obj);
          retVal[key] = eventIntgConfig[key];
          return retVal;
        }, {});
        /**
         * Returns the event object with final integrations config
         * @param event RudderEvent object
         * @param state Application state
         * @returns Mutated event with final integrations config
         */
        const getFinalEvent = (event, state) => {
          const finalEvent = clone(event); // Merge the destination specific integrations config with the event's integrations config
          // In general, the preference is given to the event's integrations config
          const destinationsIntgConfig = state.nativeDestinations.integrationsConfig.value;
          const overriddenIntgOpts = getOverriddenIntegrationOptions(event.integrations, destinationsIntgConfig);
          finalEvent.integrations = mergeDeepRight(destinationsIntgConfig, overriddenIntgOpts);
          return finalEvent;
        };
        const shouldBufferEventsForPreConsent = state => state.consents.preConsent.value.enabled && state.consents.preConsent.value.events?.delivery === 'buffer' && (state.consents.preConsent.value.storage?.strategy === 'session' || state.consents.preConsent.value.storage?.strategy === 'none');

        /**
         * Event repository class responsible for queuing events for further processing and delivery
         */
        class EventRepository {
          /**
           *
           * @param pluginsManager Plugins manager instance
           * @param storeManager Store Manager instance
           * @param errorHandler Error handler object
           * @param logger Logger object
           */
          constructor(pluginsManager, storeManager, errorHandler, logger) {
            this.pluginsManager = pluginsManager;
            this.errorHandler = errorHandler;
            this.logger = logger;
            this.httpClient = new HttpClient(errorHandler, logger);
            this.storeManager = storeManager;
            this.onError = this.onError.bind(this);
          }
          /**
           * Initializes the event repository
           */
          init() {
            try {
              this.dataplaneEventsQueue = this.pluginsManager.invokeSingle(`${DATA_PLANE_QUEUE_EXT_POINT_PREFIX}.init`, state, this.httpClient, this.storeManager, this.errorHandler, this.logger);
            } catch (e) {
              this.onError(e, DATAPLANE_PLUGIN_INITIALIZE_ERROR);
            }
            try {
              this.dmtEventsQueue = this.pluginsManager.invokeSingle(`${DMT_EXT_POINT_PREFIX}.init`, state, this.pluginsManager, this.httpClient, this.storeManager, this.errorHandler, this.logger);
            } catch (e) {
              this.onError(e, DMT_PLUGIN_INITIALIZE_ERROR);
            }
            try {
              this.destinationsEventsQueue = this.pluginsManager.invokeSingle(`${DESTINATIONS_QUEUE_EXT_POINT_PREFIX}.init`, state, this.pluginsManager, this.storeManager, this.dmtEventsQueue, this.errorHandler, this.logger);
            } catch (e) {
              this.onError(e, NATIVE_DEST_PLUGIN_INITIALIZE_ERROR);
            } // Start the queue once the client destinations are ready
            E(() => {
              if (state.nativeDestinations.clientDestinationsReady.value === true) {
                this.destinationsEventsQueue?.start();
                this.dmtEventsQueue?.start();
              }
            });
            const bufferEventsBeforeConsent = shouldBufferEventsForPreConsent(state); // Start the queue processing only when the destinations are ready or hybrid mode destinations exist
            // However, events will be enqueued for now.
            // At the time of processing the events, the integrations config data from destinations
            // is merged into the event object
            let timeoutId;
            E(() => {
              const shouldBufferDpEvents = state.loadOptions.value.bufferDataPlaneEventsUntilReady === true && state.nativeDestinations.clientDestinationsReady.value === false;
              const hybridDestExist = state.nativeDestinations.activeDestinations.value.some(dest => isHybridModeDestination(dest));
              if ((hybridDestExist === false || shouldBufferDpEvents === false) && !bufferEventsBeforeConsent && this.dataplaneEventsQueue?.scheduleTimeoutActive !== true) {
                globalThis.clearTimeout(timeoutId);
                this.dataplaneEventsQueue?.start();
              }
            }); // Force start the data plane events queue processing after a timeout
            if (state.loadOptions.value.bufferDataPlaneEventsUntilReady === true) {
              timeoutId = globalThis.setTimeout(() => {
                if (this.dataplaneEventsQueue?.scheduleTimeoutActive !== true) {
                  this.dataplaneEventsQueue?.start();
                }
              }, state.loadOptions.value.dataPlaneEventsBufferTimeout);
            }
          }
          resume() {
            if (this.dataplaneEventsQueue?.scheduleTimeoutActive !== true) {
              if (state.consents.postConsent.value.discardPreConsentEvents) {
                this.dataplaneEventsQueue?.clear();
                this.destinationsEventsQueue?.clear();
              }
              this.dataplaneEventsQueue?.start();
            }
          }
          /**
           * Enqueues the event for processing
           * @param event RudderEvent object
           * @param callback API callback function
           */
          enqueue(event, callback) {
            let dpQEvent;
            try {
              dpQEvent = getFinalEvent(event, state);
              this.pluginsManager.invokeSingle(`${DATA_PLANE_QUEUE_EXT_POINT_PREFIX}.enqueue`, state, this.dataplaneEventsQueue, dpQEvent, this.errorHandler, this.logger);
            } catch (e) {
              this.onError(e, DATAPLANE_PLUGIN_ENQUEUE_ERROR);
            }
            try {
              const dQEvent = clone(event);
              this.pluginsManager.invokeSingle(`${DESTINATIONS_QUEUE_EXT_POINT_PREFIX}.enqueue`, state, this.destinationsEventsQueue, dQEvent, this.errorHandler, this.logger);
            } catch (e) {
              this.onError(e, NATIVE_DEST_PLUGIN_ENQUEUE_ERROR);
            } // Invoke the callback if it exists
            try { // Using the event sent to the data plane queue here
              // to ensure the mutated (if any) event is sent to the callback
              callback?.(dpQEvent);
            } catch (error) {
              this.onError(error, API_CALLBACK_INVOKE_ERROR);
            }
          }
          /**
           * Handles error
           * @param error The error object
           * @param customMessage a message
           * @param shouldAlwaysThrow if it should throw or use logger
           */
          onError(error, customMessage, shouldAlwaysThrow) {
            if (this.errorHandler) {
              this.errorHandler.onError(error, EVENT_REPOSITORY, customMessage, shouldAlwaysThrow);
            } else {
              throw error;
            }
          }
        }

        const dispatchSDKEvent = event => {
          const customEvent = new CustomEvent(event, {
            detail: {
              analyticsInstance: globalThis.rudderanalytics
            },
            bubbles: true,
            cancelable: true,
            composed: true
          });
          globalThis.document.dispatchEvent(customEvent);
        };
        const isWriteKeyValid = writeKey => isString(writeKey) && writeKey.trim().length > 0;
        const isDataPlaneUrlValid = dataPlaneUrl => isValidURL(dataPlaneUrl);

        /*
         * Analytics class with lifecycle based on state ad user triggered events
         */
        class Analytics {
          /**
           * Initialize services and components or use default ones if singletons
           */
          constructor() {
            this.preloadBuffer = new BufferQueue();
            this.initialized = false;
            this.errorHandler = defaultErrorHandler;
            this.logger = defaultLogger;
            this.externalSrcLoader = new ExternalSrcLoader(this.errorHandler, this.logger);
            this.capabilitiesManager = new CapabilitiesManager(this.errorHandler, this.logger);
            this.httpClient = defaultHttpClient;
          }
          /**
           * Start application lifecycle if not already started
           */
          load(writeKey, dataPlaneUrl, loadOptions = {}) {
            if (state.lifecycle.status.value) {
              return;
            }
            if (!isWriteKeyValid(writeKey)) {
              this.logger.error(WRITE_KEY_VALIDATION_ERROR(ANALYTICS_CORE, writeKey));
              return;
            }
            if (!isDataPlaneUrlValid(dataPlaneUrl)) {
              this.logger.error(DATA_PLANE_URL_VALIDATION_ERROR(ANALYTICS_CORE, dataPlaneUrl));
              return;
            } // Set initial state values
            r(() => {
              state.lifecycle.writeKey.value = clone(writeKey);
              state.lifecycle.dataPlaneUrl.value = clone(dataPlaneUrl);
              state.loadOptions.value = normalizeLoadOptions(state.loadOptions.value, loadOptions);
              state.lifecycle.status.value = 'mounted';
            }); // set log level as early as possible
            this.logger?.setMinLogLevel(state.loadOptions.value.logLevel ?? POST_LOAD_LOG_LEVEL); // Expose state to global objects
            setExposedGlobal('state', state, writeKey); // Configure initial config of any services or components here
            // State application lifecycle
            this.startLifecycle();
          } // Start lifecycle methods
          /**
           * Orchestrate the lifecycle of the application phases/status
           */
          startLifecycle() {
            E(() => {
              try {
                switch (state.lifecycle.status.value) {
                  case 'mounted':
                    this.onMounted();
                    break;
                  case 'browserCapabilitiesReady':
                    this.onBrowserCapabilitiesReady();
                    break;
                  case 'configured':
                    this.onConfigured();
                    break;
                  case 'pluginsLoading':
                    break;
                  case 'pluginsReady':
                    this.onPluginsReady();
                    break;
                  case 'initialized':
                    this.onInitialized();
                    break;
                  case 'loaded':
                    this.onLoaded();
                    break;
                  case 'destinationsLoading':
                    break;
                  case 'destinationsReady':
                    this.onDestinationsReady();
                    break;
                  case 'ready':
                    this.onReady();
                    break;
                  case 'readyExecuted':
                  default:
                    break;
                }
              } catch (err) {
                const issue = 'Failed to load the SDK';
                this.errorHandler.onError(getMutatedError(err, issue), ANALYTICS_CORE);
              }
            });
          }
          onBrowserCapabilitiesReady() { // initialize the preloaded events enqueuing
            retrievePreloadBufferEvents(this);
            this.prepareInternalServices();
            this.loadConfig();
          }
          onLoaded() {
            this.processBufferedEvents(); // Short-circuit the life cycle and move to the ready state if pre-consent behavior is enabled
            if (state.consents.preConsent.value.enabled === true) {
              state.lifecycle.status.value = 'ready';
            } else {
              this.loadDestinations();
            }
          }
          /**
           * Load browser polyfill if required
           */
          onMounted() {
            this.capabilitiesManager.init();
          }
          /**
           * Enqueue in SDK preload buffer events, used from preloadBuffer component
           */
          enqueuePreloadBufferEvents(bufferedEvents) {
            if (Array.isArray(bufferedEvents)) {
              bufferedEvents.forEach(bufferedEvent => this.preloadBuffer.enqueue(clone(bufferedEvent)));
            }
          }
          /**
           * Process the buffer preloaded events by passing their arguments to the respective facade methods
           */
          processDataInPreloadBuffer() {
            while (this.preloadBuffer.size() > 0) {
              const eventToProcess = this.preloadBuffer.dequeue();
              if (eventToProcess) {
                consumePreloadBufferedEvent([...eventToProcess], this);
              }
            }
          }
          prepareInternalServices() {
            this.pluginsManager = new PluginsManager(defaultPluginEngine, this.errorHandler, this.logger);
            this.storeManager = new StoreManager(this.pluginsManager, this.errorHandler, this.logger);
            this.configManager = new ConfigManager(this.httpClient, this.errorHandler, this.logger);
            this.userSessionManager = new UserSessionManager(this.errorHandler, this.logger, this.pluginsManager, this.storeManager, this.httpClient);
            this.eventRepository = new EventRepository(this.pluginsManager, this.storeManager, this.errorHandler, this.logger);
            this.eventManager = new EventManager(this.eventRepository, this.userSessionManager, this.errorHandler, this.logger);
          }
          /**
           * Load configuration
           */
          loadConfig() {
            if (state.lifecycle.writeKey.value) {
              this.httpClient.setAuthHeader(state.lifecycle.writeKey.value);
            }
            this.configManager?.init();
          }
          /**
           * Initialize the storage and event queue
           */
          onPluginsReady() {
            this.errorHandler.init(this.httpClient, this.externalSrcLoader); // Initialize storage
            this.storeManager?.init();
            this.userSessionManager?.init(); // Initialize the appropriate consent manager plugin
            if (state.consents.enabled.value && !state.consents.initialized.value) {
              this.pluginsManager?.invokeSingle(`consentManager.init`, state, this.logger);
              if (state.consents.preConsent.value.enabled === false) {
                this.pluginsManager?.invokeSingle(`consentManager.updateConsentsInfo`, state, this.storeManager, this.logger);
              }
            } // Initialize event manager
            this.eventManager?.init(); // Mark the SDK as initialized
            state.lifecycle.status.value = 'initialized';
          }
          /**
           * Load plugins
           */
          onConfigured() {
            this.pluginsManager?.init(); // TODO: are we going to enable custom plugins to be passed as load options?
            // registerCustomPlugins(state.loadOptions.value.customPlugins);
          }
          /**
           * Trigger onLoaded callback if any is provided in config & emit initialised event
           */
          onInitialized() { // Process any preloaded events
            this.processDataInPreloadBuffer(); // TODO: we need to avoid passing the window object to the callback function
            // as this will prevent us from supporting multiple SDK instances in the same page
            // Execute onLoaded callback if provided in load options
            if (isFunction(state.loadOptions.value.onLoaded)) {
              state.loadOptions.value.onLoaded(globalThis.rudderanalytics);
            } // Set lifecycle state
            r(() => {
              state.lifecycle.loaded.value = true;
              state.lifecycle.status.value = 'loaded';
            });
            this.initialized = true; // Emit an event to use as substitute to the onLoaded callback
            dispatchSDKEvent('RSA_Initialised');
          }
          /**
           * Emit ready event
           */ // eslint-disable-next-line class-methods-use-this
          onReady() {
            state.lifecycle.status.value = 'readyExecuted';
            state.eventBuffer.readyCallbacksArray.value.forEach(callback => {
              try {
                callback();
              } catch (err) {
                this.errorHandler.onError(err, ANALYTICS_CORE, READY_CALLBACK_INVOKE_ERROR);
              }
            }); // Emit an event to use as substitute to the ready callback
            dispatchSDKEvent('RSA_Ready');
          }
          /**
           * Consume preloaded events buffer
           */
          processBufferedEvents() { // This logic has been intentionally implemented without a simple
            // for-loop as the individual events that are processed may
            // add more events to the buffer (this is needed for the consent API)
            let bufferedEvents = state.eventBuffer.toBeProcessedArray.value;
            while (bufferedEvents.length > 0) {
              const bufferedEvent = bufferedEvents.shift();
              state.eventBuffer.toBeProcessedArray.value = bufferedEvents;
              if (bufferedEvent) {
                const methodName = bufferedEvent[0];
                if (isFunction(this[methodName])) { // Send additional arg 'true' to indicate that this is a buffered invocation
                  this[methodName](...bufferedEvent.slice(1), true);
                }
              }
              bufferedEvents = state.eventBuffer.toBeProcessedArray.value;
            }
          }
          /**
           * Load device mode destinations
           */
          loadDestinations() {
            if (state.nativeDestinations.clientDestinationsReady.value) {
              return;
            } // Set in state the desired activeDestinations to inject in DOM
            this.pluginsManager?.invokeSingle('nativeDestinations.setActiveDestinations', state, this.pluginsManager, this.errorHandler, this.logger);
            const totalDestinationsToLoad = state.nativeDestinations.activeDestinations.value.length;
            if (totalDestinationsToLoad === 0) {
              state.lifecycle.status.value = 'destinationsReady';
              return;
            } // Start loading native integration scripts and create instances
            state.lifecycle.status.value = 'destinationsLoading';
            this.pluginsManager?.invokeSingle('nativeDestinations.load', state, this.externalSrcLoader, this.errorHandler, this.logger); // Progress to next lifecycle phase if all native destinations are initialized or failed
            E(() => {
              const areAllDestinationsReady = totalDestinationsToLoad === 0 || state.nativeDestinations.initializedDestinations.value.length + state.nativeDestinations.failedDestinations.value.length === totalDestinationsToLoad;
              if (areAllDestinationsReady) {
                r(() => {
                  state.lifecycle.status.value = 'destinationsReady';
                  state.nativeDestinations.clientDestinationsReady.value = true;
                });
              }
            });
          }
          /**
           * Move to the ready state
           */ // eslint-disable-next-line class-methods-use-this
          onDestinationsReady() { // May be do any destination specific actions here
            // Mark the ready status if not already done
            if (state.lifecycle.status.value !== 'ready') {
              state.lifecycle.status.value = 'ready';
            }
          } // End lifecycle methods
          // Start consumer exposed methods
          ready(callback, isBufferedInvocation = false) {
            const type = 'ready';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, callback]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} invocation`);
            if (!isFunction(callback)) {
              this.logger.error(READY_API_CALLBACK_ERROR(READY_API));
              return;
            }
            /**
             * If destinations are loaded or no integration is available for loading
             * execute the callback immediately else push the callbacks to a queue that
             * will be executed after loading completes
             */
            if (state.lifecycle.status.value === 'readyExecuted') {
              try {
                callback();
              } catch (err) {
                this.errorHandler.onError(err, ANALYTICS_CORE, READY_CALLBACK_INVOKE_ERROR);
              }
            } else {
              state.eventBuffer.readyCallbacksArray.value = [...state.eventBuffer.readyCallbacksArray.value, callback];
            }
          }
          page(payload, isBufferedInvocation = false) {
            const type = 'page';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, payload]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} event`);
            state.metrics.triggered.value += 1;
            this.eventManager?.addEvent({
              type: 'page',
              category: payload.category,
              name: payload.name,
              properties: payload.properties,
              options: payload.options,
              callback: payload.callback
            }); // TODO: Maybe we should alter the behavior to send the ad-block page event even if the SDK is still loaded. It'll be pushed into the to be processed queue.
            // Send automatic ad blocked page event if ad-blockers are detected on the page
            // Check page category to avoid infinite loop
            if (state.capabilities.isAdBlocked.value === true && payload.category !== ADBLOCK_PAGE_CATEGORY) {
              this.page(pageArgumentsToCallOptions(ADBLOCK_PAGE_CATEGORY, ADBLOCK_PAGE_NAME, { // 'title' is intentionally omitted as it does not make sense
                // in v3 implementation
                path: ADBLOCK_PAGE_PATH
              }, state.loadOptions.value.sendAdblockPageOptions));
            }
          }
          track(payload, isBufferedInvocation = false) {
            const type = 'track';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, payload]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} event - ${payload.name}`);
            state.metrics.triggered.value += 1;
            this.eventManager?.addEvent({
              type,
              name: payload.name || undefined,
              properties: payload.properties,
              options: payload.options,
              callback: payload.callback
            });
          }
          identify(payload, isBufferedInvocation = false) {
            const type = 'identify';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, payload]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} event`);
            state.metrics.triggered.value += 1;
            const shouldResetSession = Boolean(payload.userId && state.session.userId.value && payload.userId !== state.session.userId.value);
            if (shouldResetSession) {
              this.reset();
            } // `null` value indicates that previous user ID needs to be retained
            if (!isNull(payload.userId)) {
              this.userSessionManager?.setUserId(payload.userId);
            }
            this.userSessionManager?.setUserTraits(payload.traits);
            this.eventManager?.addEvent({
              type,
              userId: payload.userId,
              traits: payload.traits,
              options: payload.options,
              callback: payload.callback
            });
          }
          alias(payload, isBufferedInvocation = false) {
            const type = 'alias';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, payload]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} event`);
            state.metrics.triggered.value += 1;
            const previousId = payload.from ?? this.userSessionManager?.getUserId() ?? this.userSessionManager?.getAnonymousId();
            this.eventManager?.addEvent({
              type,
              to: payload.to,
              from: previousId,
              options: payload.options,
              callback: payload.callback
            });
          }
          group(payload, isBufferedInvocation = false) {
            const type = 'group';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, payload]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} event`);
            state.metrics.triggered.value += 1; // `null` value indicates that previous group ID needs to be retained
            if (!isNull(payload.groupId)) {
              this.userSessionManager?.setGroupId(payload.groupId);
            }
            this.userSessionManager?.setGroupTraits(payload.traits);
            this.eventManager?.addEvent({
              type,
              groupId: payload.groupId,
              traits: payload.traits,
              options: payload.options,
              callback: payload.callback
            });
          }
          reset(resetAnonymousId, isBufferedInvocation = false) {
            const type = 'reset';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, resetAnonymousId]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} invocation, resetAnonymousId: ${resetAnonymousId}`);
            this.userSessionManager?.reset(resetAnonymousId);
          }
          getAnonymousId(options) {
            return this.userSessionManager?.getAnonymousId(options);
          }
          setAnonymousId(anonymousId, rudderAmpLinkerParam, isBufferedInvocation = false) {
            const type = 'setAnonymousId'; // Buffering is needed as setting the anonymous ID may require invoking the GoogleLinker plugin
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, anonymousId, rudderAmpLinkerParam]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} invocation`);
            this.userSessionManager?.setAnonymousId(anonymousId, rudderAmpLinkerParam);
          } // eslint-disable-next-line class-methods-use-this
          getUserId() {
            return state.session.userId.value;
          } // eslint-disable-next-line class-methods-use-this
          getUserTraits() {
            return state.session.userTraits.value;
          } // eslint-disable-next-line class-methods-use-this
          getGroupId() {
            return state.session.groupId.value;
          } // eslint-disable-next-line class-methods-use-this
          getGroupTraits() {
            return state.session.groupTraits.value;
          }
          startSession(sessionId, isBufferedInvocation = false) {
            const type = 'startSession';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, sessionId]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} invocation`);
            this.userSessionManager?.start(sessionId);
          }
          endSession(isBufferedInvocation = false) {
            const type = 'endSession';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New ${type} invocation`);
            this.userSessionManager?.end();
          } // eslint-disable-next-line class-methods-use-this
          getSessionId() {
            const sessionId = this.userSessionManager?.getSessionId();
            return sessionId ?? null;
          }
          consent(options, isBufferedInvocation = false) {
            const type = 'consent';
            if (!state.lifecycle.loaded.value) {
              state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, [type, options]];
              return;
            }
            this.errorHandler.leaveBreadcrumb(`New consent invocation`);
            r(() => {
              state.consents.preConsent.value = {
                ...state.consents.preConsent.value,
                enabled: false
              };
              state.consents.postConsent.value = getValidPostConsentOptions(options);
              const {
                initialized,
                consentsData
              } = getConsentManagementData(state.consents.postConsent.value.consentManagement, this.logger);
              state.consents.initialized.value = initialized || state.consents.initialized.value;
              state.consents.data.value = consentsData;
            }); // Update consents data in state
            if (state.consents.enabled.value && !state.consents.initialized.value) {
              this.pluginsManager?.invokeSingle(`consentManager.updateConsentsInfo`, state, this.storeManager, this.logger);
            } // Re-init store manager
            this.storeManager?.initializeStorageState(); // Re-init user session manager
            this.userSessionManager?.syncStorageDataToState(); // Resume event manager to process the events to destinations
            this.eventManager?.resume();
            this.loadDestinations();
            this.sendTrackingEvents(isBufferedInvocation);
          }
          sendTrackingEvents(isBufferedInvocation) { // If isBufferedInvocation is true, then the tracking events will be added to the end of the
            // events buffer array so that any other preload events (mainly from query string API) will be processed first.
            if (state.consents.postConsent.value.trackConsent) {
              const trackOptions = trackArgumentsToCallOptions(CONSENT_TRACK_EVENT_NAME);
              if (isBufferedInvocation) {
                state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, ['track', trackOptions]];
              } else {
                this.track(trackOptions);
              }
            }
            if (state.consents.postConsent.value.sendPageEvent) {
              const pageOptions = pageArgumentsToCallOptions();
              if (isBufferedInvocation) {
                state.eventBuffer.toBeProcessedArray.value = [...state.eventBuffer.toBeProcessedArray.value, ['page', pageOptions]];
              } else {
                this.page(pageOptions);
              }
            }
          }
          setAuthToken(token) {
            this.userSessionManager?.setAuthToken(token);
          } // End consumer exposed methods
        }

        /*
         * RudderAnalytics facade singleton that is exposed as global object and will:
         * expose overloaded methods
         * handle multiple Analytics instances
         * consume SDK preload event buffer
         */
        class RudderAnalytics { // START-NO-SONAR-SCAN
          // eslint-disable-next-line sonarjs/public-static-readonly
          static globalSingleton = null; // END-NO-SONAR-SCAN
          analyticsInstances = {};
          defaultAnalyticsKey = '';
          logger = (() => defaultLogger)(); // Singleton with constructor bind methods
          constructor() {
            try {
              if (RudderAnalytics.globalSingleton) { // START-NO-SONAR-SCAN
                // eslint-disable-next-line no-constructor-return
                return RudderAnalytics.globalSingleton; // END-NO-SONAR-SCAN
              }
              defaultErrorHandler.attachErrorListeners();
              this.setDefaultInstanceKey = this.setDefaultInstanceKey.bind(this);
              this.getAnalyticsInstance = this.getAnalyticsInstance.bind(this);
              this.load = this.load.bind(this);
              this.ready = this.ready.bind(this);
              this.triggerBufferedLoadEvent = this.triggerBufferedLoadEvent.bind(this);
              this.page = this.page.bind(this);
              this.track = this.track.bind(this);
              this.identify = this.identify.bind(this);
              this.alias = this.alias.bind(this);
              this.group = this.group.bind(this);
              this.reset = this.reset.bind(this);
              this.getAnonymousId = this.getAnonymousId.bind(this);
              this.setAnonymousId = this.setAnonymousId.bind(this);
              this.getUserId = this.getUserId.bind(this);
              this.getUserTraits = this.getUserTraits.bind(this);
              this.getGroupId = this.getGroupId.bind(this);
              this.getGroupTraits = this.getGroupTraits.bind(this);
              this.startSession = this.startSession.bind(this);
              this.endSession = this.endSession.bind(this);
              this.getSessionId = this.getSessionId.bind(this);
              this.setAuthToken = this.setAuthToken.bind(this);
              this.consent = this.consent.bind(this);
              RudderAnalytics.globalSingleton = this;
              state.autoTrack.pageLifecycle.visitId.value = generateUUID();
              state.autoTrack.pageLifecycle.pageLoadedTimestamp.value = Date.now(); // start loading if a load event was buffered or wait for explicit load call
              this.triggerBufferedLoadEvent(); // Assign to global "rudderanalytics" object after processing the preload buffer (if any exists)
              // for CDN bundling IIFE exports covers this but for npm ESM and CJS bundling has to be done explicitly
              globalThis.rudderanalytics = this;
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Set instance to use if no specific writeKey is provided in methods
           * automatically for the first created instance
           * TODO: to support multiple analytics instances in the near future
           */
          setDefaultInstanceKey(writeKey) { // IMP: Add try-catch block to handle any unhandled errors
            // similar to other public methods
            // if the implementation of this method goes beyond
            // this simple implementation
            if (isString(writeKey) && writeKey) {
              this.defaultAnalyticsKey = writeKey;
            }
          }
          /**
           * Retrieve an existing analytics instance
           */
          getAnalyticsInstance(writeKey) {
            try {
              let instanceId = writeKey;
              if (!isString(instanceId) || !instanceId) {
                instanceId = this.defaultAnalyticsKey;
              }
              const analyticsInstanceExists = Boolean(this.analyticsInstances[instanceId]);
              if (!analyticsInstanceExists) {
                this.analyticsInstances[instanceId] = new Analytics();
              }
              return this.analyticsInstances[instanceId];
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          /**
           * Loads the SDK
           * @param writeKey Source write key
           * @param dataPlaneUrl Data plane URL
           * @param loadOptions Additional options for loading the SDK
           * @returns none
           */
          load(writeKey, dataPlaneUrl, loadOptions) {
            try {
              if (this.analyticsInstances[writeKey]) {
                return;
              }
              this.setDefaultInstanceKey(writeKey);
              const preloadedEventsArray = this.getPreloadedEvents(); // Track page loaded lifecycle event if enabled
              this.trackPageLifecycleEvents(preloadedEventsArray, loadOptions); // The array will be mutated in the below method
              promotePreloadedConsentEventsToTop(preloadedEventsArray);
              setExposedGlobal(GLOBAL_PRELOAD_BUFFER, clone(preloadedEventsArray));
              this.analyticsInstances[writeKey] = new Analytics();
              this.getAnalyticsInstance(writeKey)?.load(writeKey, dataPlaneUrl, getSanitizedValue(loadOptions));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * A function to get preloaded events array from global object
           * @returns preloaded events array
           */ // eslint-disable-next-line class-methods-use-this
          getPreloadedEvents() {
            return Array.isArray(globalThis.rudderanalytics) ? globalThis.rudderanalytics : [];
          }
          /**
           * A function to track page lifecycle events like page loaded and page unloaded
           * @param preloadedEventsArray
           * @param loadOptions
           * @returns
           */
          trackPageLifecycleEvents(preloadedEventsArray, loadOptions) {
            const {
              autoTrack,
              useBeacon
            } = loadOptions ?? {};
            const {
              enabled: autoTrackEnabled = false,
              options: autoTrackOptions = {},
              pageLifecycle
            } = autoTrack ?? {};
            const {
              events = [PageLifecycleEvents.LOADED, PageLifecycleEvents.UNLOADED], enabled: pageLifecycleEnabled = autoTrackEnabled, options = autoTrackOptions
            } = pageLifecycle ?? {};
            state.autoTrack.pageLifecycle.enabled.value = pageLifecycleEnabled; // Set the autoTrack enabled state
            // if at least one of the autoTrack options is enabled
            // IMPORTANT: make sure this is done at the end as it depends on the above states
            state.autoTrack.enabled.value = autoTrackEnabled || pageLifecycleEnabled;
            if (!pageLifecycleEnabled) {
              return;
            }
            this.trackPageLoadedEvent(events, options, preloadedEventsArray);
            this.setupPageUnloadTracking(events, useBeacon, options);
          }
          /**
           * Buffer the page loaded event in the preloaded events array
           * @param events
           * @param options
           * @param preloadedEventsArray
           */ // eslint-disable-next-line class-methods-use-this
          trackPageLoadedEvent(events, options, preloadedEventsArray) {
            if (events.length === 0 || events.includes(PageLifecycleEvents.LOADED)) {
              preloadedEventsArray.unshift(['track', PageLifecycleEvents.LOADED, {}, {
                ...options,
                originalTimestamp: getFormattedTimestamp(new Date(state.autoTrack.pageLifecycle.pageLoadedTimestamp.value))
              }]);
            }
          }
          /**
           * Setup page unload tracking if enabled
           * @param events
           * @param useBeacon
           * @param options
           */
          setupPageUnloadTracking(events, useBeacon, options) {
            if (events.length === 0 || events.includes(PageLifecycleEvents.UNLOADED)) {
              if (useBeacon === true) {
                onPageLeave(isAccessible => {
                  if (isAccessible === false && state.lifecycle.loaded.value) {
                    const pageUnloadedTimestamp = Date.now();
                    const visitDuration = pageUnloadedTimestamp - state.autoTrack.pageLifecycle.pageLoadedTimestamp.value;
                    this.track(PageLifecycleEvents.UNLOADED, {
                      visitDuration
                    }, {
                      ...options,
                      originalTimestamp: getFormattedTimestamp(new Date(pageUnloadedTimestamp))
                    });
                  }
                });
              } else { // throw warning if beacon is disabled
                this.logger.warn(PAGE_UNLOAD_ON_BEACON_DISABLED_WARNING(RSA));
              }
            }
          }
          /**
           * Trigger load event in buffer queue if exists and stores the
           * remaining preloaded events array in global object
           */
          triggerBufferedLoadEvent() {
            const preloadedEventsArray = this.getPreloadedEvents(); // Get any load method call that is buffered if any
            // BTW, load method is also removed from the array
            // So, the Analytics object can directly consume the remaining events
            const loadEvent = getPreloadedLoadEvent(preloadedEventsArray); // Set the final preloaded events array in global object
            setExposedGlobal(GLOBAL_PRELOAD_BUFFER, clone(preloadedEventsArray)); // Process load method if present in the buffered requests
            if (loadEvent.length > 0) { // Remove the event name from the Buffered Event array and keep only arguments
              loadEvent.shift(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.load.apply(null, loadEvent);
            }
          }
          /**
           * Get ready callback arguments and forward to ready call
           */
          ready(callback) {
            try {
              this.getAnalyticsInstance()?.ready(getSanitizedValue(callback));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Process page arguments and forward to page call
           */ // These overloads should be same as AnalyticsPageMethod in @rudderstack/analytics-js-common/types/IRudderAnalytics
          page(category, name, properties, options, callback) {
            try {
              this.getAnalyticsInstance()?.page(pageArgumentsToCallOptions(getSanitizedValue(category), getSanitizedValue(name), getSanitizedValue(properties), getSanitizedValue(options), getSanitizedValue(callback)));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Process track arguments and forward to page call
           */ // These overloads should be same as AnalyticsTrackMethod in @rudderstack/analytics-js-common/types/IRudderAnalytics
          track(event, properties, options, callback) {
            try {
              this.getAnalyticsInstance()?.track(trackArgumentsToCallOptions(getSanitizedValue(event), getSanitizedValue(properties), getSanitizedValue(options), getSanitizedValue(callback)));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Process identify arguments and forward to page call
           */ // These overloads should be same as AnalyticsIdentifyMethod in @rudderstack/analytics-js-common/types/IRudderAnalytics
          identify(userId, traits, options, callback) {
            try {
              this.getAnalyticsInstance()?.identify(identifyArgumentsToCallOptions(getSanitizedValue(userId), getSanitizedValue(traits), getSanitizedValue(options), getSanitizedValue(callback)));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Process alias arguments and forward to page call
           */ // These overloads should be same as AnalyticsAliasMethod in @rudderstack/analytics-js-common/types/IRudderAnalytics
          alias(to, from, options, callback) {
            try {
              this.getAnalyticsInstance()?.alias(aliasArgumentsToCallOptions(getSanitizedValue(to), getSanitizedValue(from), getSanitizedValue(options), getSanitizedValue(callback)));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          /**
           * Process group arguments and forward to page call
           */ // These overloads should be same as AnalyticsGroupMethod in @rudderstack/analytics-js-common/types/IRudderAnalytics
          group(groupId, traits, options, callback) {
            try {
              this.getAnalyticsInstance()?.group(groupArgumentsToCallOptions(getSanitizedValue(groupId), getSanitizedValue(traits), getSanitizedValue(options), getSanitizedValue(callback)));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          reset(resetAnonymousId) {
            try {
              this.getAnalyticsInstance()?.reset(getSanitizedValue(resetAnonymousId));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          getAnonymousId(options) {
            try {
              return this.getAnalyticsInstance()?.getAnonymousId(getSanitizedValue(options));
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          setAnonymousId(anonymousId, rudderAmpLinkerParam) {
            try {
              this.getAnalyticsInstance()?.setAnonymousId(getSanitizedValue(anonymousId), getSanitizedValue(rudderAmpLinkerParam));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          getUserId() {
            try {
              return this.getAnalyticsInstance()?.getUserId();
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          getUserTraits() {
            try {
              return this.getAnalyticsInstance()?.getUserTraits();
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          getGroupId() {
            try {
              return this.getAnalyticsInstance()?.getGroupId();
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          getGroupTraits() {
            try {
              return this.getAnalyticsInstance()?.getGroupTraits();
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          startSession(sessionId) {
            try {
              this.getAnalyticsInstance()?.startSession(getSanitizedValue(sessionId));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          endSession() {
            try {
              this.getAnalyticsInstance()?.endSession();
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          getSessionId() {
            try {
              return this.getAnalyticsInstance()?.getSessionId();
            } catch (error) {
              dispatchErrorEvent(error);
              return undefined;
            }
          }
          setAuthToken(token) {
            try {
              this.getAnalyticsInstance()?.setAuthToken(getSanitizedValue(token));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
          consent(options) {
            try {
              this.getAnalyticsInstance()?.consent(getSanitizedValue(options));
            } catch (error) {
              dispatchErrorEvent(error);
            }
          }
        }




        /***/
      }),

    /***/
    "../game-events/src/game-events.js":
      /*!*****************************************!*\
        !*** ../game-events/src/game-events.js ***!
        \*****************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          BUTTONS: () => ( /* binding */ BUTTONS),
          /* harmony export */
          CLOSE_RC_BUTTONS: () => ( /* binding */ CLOSE_RC_BUTTONS),
          /* harmony export */
          ERRORS: () => ( /* binding */ ERRORS),
          /* harmony export */
          MUSIC_VOL: () => ( /* binding */ MUSIC_VOL),
          /* harmony export */
          PAGES: () => ( /* binding */ PAGES),
          /* harmony export */
          SOUNDS_VOL: () => ( /* binding */ SOUNDS_VOL),
          /* harmony export */
          "default": () => (__WEBPACK_DEFAULT_EXPORT__)
          /* harmony export */
        });
        var GameEvent = {
          /**
           * Fires when game just started loading
           * @property {undefined} targetName
           * @property {GameController} context - game controller which allows pause and resume game, stop autospins etc.
           */
          START_LOADING: "start_loading",
          GAME_PRELOADING_PROGRESS: "game_preloading_progress",
          GAME_RESOURCES_LOADED: "game_resources_loaded",
          GAME_PRELOADER_FINISH: "game_preloader_finish",
          /**
           * Fires when a game just show up
           * @property {String} targetName - Game identifier (name)
           * @property {InitData} context - Game size, orientation data and flags about game state (provability, gamble)
           */
          GAME_LOADED: "game_loaded",
          GAME_INITIALIZED: "game_initialized",
          ACTION_EXEC: "action_exec",
          BET_CHANGED: "bet_changed",
          GAME_TOTAL_WIN_SHOWN: "game_total_win_show",
          /**
           * This event is triggered when a bonus game is awarded to the user on a particular round.
           * @property {undefined} targetName
           * @property {undefined} context - contains current balance value
           */
          GAMBLE_OPEN: "gamble_open",
          /**
           * This event is triggered when the bonus game has been completed.
           * @property {undefined} targetName
           * @property {undefined} context - contains current balance value
           */
          GAMBLE_COMPLETE: "gamble_complete",
          /**
           * Fires after the result event and all win animations have been completed
           * @property {undefined} targetName
           * @property {undefined} context - contains current balance value
           */
          FINISH_SPIN_ANIMATIONS: "finish_spin_animations",
          FINISH_ROUND_ANIMATIONS: "finish_round_animations",
          /**
           * Fires after each api call
           * @property {String} targetName - requested command
           * @property {ApiData} context - information about api response
           */
          API_RESPONSE: "api_response",
          /**
           * Fires after each balance change (even if balance value not changed)
           * @property {undefined} targetName
           * @property {{amount: Number}} context - contains current balance value
           */
          BALANCE_UPDATE: "balance_update",
          BUTTON_CLICK: "button-click",
          DIALOG_BUTTON_CLICK: "dialog_button_click",
          GAME_SOUND_CHANGED: "game_sound_changed",
          GAME_SHOW_PAYTABLE: "show_paytable",
          GAME_HIDE_PAYTABLE: "hide_paytable",
          /**
           * Fires when player makes bet and clicks spin or autospin (only click, could be declined by API)
           * @property {undefined} targetName
           * @property {SpinData} context - Spin result data, but without win value
           */
          PRE_PLAY: "pre_play",
          /**
           * Fires when player start playing (confirmed by API)
           * @property {undefined} targetName
           * @property {SpinData} context - Spin result data (win, bet...)
           */
          PLAY: "play",
          AUTOSPINS_STARTED: "autospins_started",
          AUTOSPINS_STOPPED: "autospins_stopped",
          /**
           * Fires when user clicks on home button
           * @property {undefined} targetName
           * @property {undefined} context
           */
          GO_HOME: "go_home",
          SHOW_MODAL: "show_modal",
          SET_SKIN: "set_skin",
          ERROR: "game_error",
          SET_LINES_COUNT: "set_lines_count",
          SET_VOLATILITY: "set_volatility",
          INITIAL_SETTINGS: "initial-settings",
          SETTINGS_CHANGE: "settings-change",
          PREVENT_GAME_REDIRECT: "prevent_game_redirect",
          CUSTOM_EVENT: "custom_event",
          GAME_UI_BET_PANEL_OPENED: "game_ui_bet_panel_opened",
          GAME_UI_BET_PANEL_CLOSED: "game_ui_bet_panel_closed",
          GAME_UI_MENU_OPENED: "game_ui_menu_opened",
          GAME_UI_MENU_CLOSED: "game_ui_menu_closed",
          GAME_UI_SETTINGS_OPENED: "game_ui_settings_opened",
          GAME_UI_SETTINGS_CLOSED: "game_ui_settings_closed",
          GAME_UI_RULES_OPENED: "game_ui_rules_opened",
          GAME_UI_RULES_CLOSED: "game_ui_rules_closed",
          GAME_UI_PAYTABLE_OPENED: "game_ui_paytable_opened",
          GAME_UI_PAYTABLE_CLOSED: "game_ui_paytable_closed",
          GAME_UI_AUTOSPINS_PANEL_OPENED: "game_ui_autospins_panel_opened",
          GAME_UI_AUTOSPINS_PANEL_CLOSED: "game_ui_autospins_panel_closed",
          GAME_UI_QUICK_SPIN_OFFER_OPENED: "game_ui_quick_spin_offer_opened",
          GAME_UI_QUICK_SPIN_OFFER_CLOSED: "game_ui_quick_spin_offer_closed",
          GAME_UI_QUICK_SPIN_MODE_ENABLED: "game_ui_quick_spin_mode_enabled",
          GAME_UI_QUICK_SPIN_MODE_DISABLED: "game_ui_quick_spin_mode_disabled",
          GAME_UI_ALL_SOUNDS_ON: "game_ui_all_sounds_on",
          GAME_UI_ALL_SOUNDS_OFF: "game_ui_all_sounds_off",
          GAME_UI_MUSIC_ON: "game_ui_music_on",
          GAME_UI_MUSIC_OFF: "game_ui_music_off",
          GAME_UI_SOUND_FX_ON: "game_ui_sound_fx_on",
          GAME_UI_SOUND_FX_OFF: "game_ui_sound_fx_off",
          GAME_UI_SPACEBAR_TO_SPIN_ENABLED: "game_ui_spacebar_to_spin_enabled",
          GAME_UI_SPACEBAR_TO_SPIN_DISABLED: "game_ui_spacebar_to_spin_disabled",
          GAME_UI_BUY_BONUS_SCREEN_SHOWN: "game_ui_buy_bonus_screen_shown"
        };
        /* harmony default export */
        const __WEBPACK_DEFAULT_EXPORT__ = (GameEvent);
        var ERRORS = {
          UNAUTHENTICATED: "101",
          DISABLED: "102",
          NOT_ALLOWED_IP: "103",
          LOCKED: "104",
          TIMEOUT: "105",
          UNKNOWN_ACTION: "201",
          UNAVAILABLE_ACTION: "202",
          INVALID_OPTIONS: "203",
          UNKNOWN_EXCEPTION: "204",
          BONUS_SPIN_EXPECTED: "205",
          REGULAR_SPIN_EXPECTED: "206",
          NOT_ENOUGH_MONEY: "301",
          NOT_ENOUGH_MONEY_NODEP: "301nodep",
          PLAYER_LIMIT_EXCEEDED: "302",
          MAX_BET_EXCEEDED: "303",
          EXCEED_TABLE_LIMIT: "401",
          NOT_SYNCED: "600",
          MESSAGE: "700",
          NO_CONNECTION: "some_error"
        };
        var PAGES = {
          HOME: "home",
          DEPOSIT: "deposit",
          HISTORY: "history"
        };
        var BUTTONS = {
          RC_CONTINUE: "rc-continue-button",
          RC_HISTORY: "rc-history-button",
          RC_CLOSE_BUTTON: "rc-close-button",
          OK_BTN: "okBtn",
          NO_BTN: "noBtn",
          MUTE_BUTTON_ON: "mute-button-on",
          MUTE_BUTTON_OFF: "mute-button-off"
        };
        var CLOSE_RC_BUTTONS = [BUTTONS.RC_CONTINUE, BUTTONS.RC_CLOSE_BUTTON];
        var SOUNDS_VOL = "soundsVol";
        var MUSIC_VOL = "musicVol";

        /***/
      }),

    /***/
    "../../node_modules/ua-parser-js/src/main/ua-parser.mjs":
      /*!**************************************************************!*\
        !*** ../../node_modules/ua-parser-js/src/main/ua-parser.mjs ***!
        \**************************************************************/
      /***/
      ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          UAParser: () => ( /* binding */ UAParser)
          /* harmony export */
        });
        // Generated ESM version of ua-parser-js
        // DO NOT EDIT THIS FILE!
        // Source: /src/main/ua-parser.js

        /////////////////////////////////////////////////////////////////////////////////
        /* UAParser.js v2.0.0
           Copyright © 2012-2024 Faisal Salman <f@faisalman.com>
           AGPLv3 License */
        /*
           Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
           Supports browser & node.js environment. 
           Demo   : https://uaparser.dev
           Source : https://github.com/faisalman/ua-parser-js */
        /////////////////////////////////////////////////////////////////////////////////

        /* jshint esversion: 6 */
        /* globals window */



        //////////////
        // Constants
        /////////////

        var LIBVERSION = '2.0.0',
          EMPTY = '',
          UNKNOWN = '?',
          FUNC_TYPE = 'function',
          UNDEF_TYPE = 'undefined',
          OBJ_TYPE = 'object',
          STR_TYPE = 'string',
          MAJOR = 'major',
          MODEL = 'model',
          NAME = 'name',
          TYPE = 'type',
          VENDOR = 'vendor',
          VERSION = 'version',
          ARCHITECTURE = 'architecture',
          CONSOLE = 'console',
          MOBILE = 'mobile',
          TABLET = 'tablet',
          SMARTTV = 'smarttv',
          WEARABLE = 'wearable',
          XR = 'xr',
          EMBEDDED = 'embedded',
          INAPP = 'inapp',
          USER_AGENT = 'user-agent',
          UA_MAX_LENGTH = 500,
          BRANDS = 'brands',
          FORMFACTORS = 'formFactors',
          FULLVERLIST = 'fullVersionList',
          PLATFORM = 'platform',
          PLATFORMVER = 'platformVersion',
          BITNESS = 'bitness',
          CH_HEADER = 'sec-ch-ua',
          CH_HEADER_FULL_VER_LIST = CH_HEADER + '-full-version-list',
          CH_HEADER_ARCH = CH_HEADER + '-arch',
          CH_HEADER_BITNESS = CH_HEADER + '-' + BITNESS,
          CH_HEADER_FORM_FACTORS = CH_HEADER + '-form-factors',
          CH_HEADER_MOBILE = CH_HEADER + '-' + MOBILE,
          CH_HEADER_MODEL = CH_HEADER + '-' + MODEL,
          CH_HEADER_PLATFORM = CH_HEADER + '-' + PLATFORM,
          CH_HEADER_PLATFORM_VER = CH_HEADER_PLATFORM + '-version',
          CH_ALL_VALUES = [BRANDS, FULLVERLIST, MOBILE, MODEL, PLATFORM, PLATFORMVER, ARCHITECTURE, FORMFACTORS, BITNESS],
          UA_BROWSER = 'browser',
          UA_CPU = 'cpu',
          UA_DEVICE = 'device',
          UA_ENGINE = 'engine',
          UA_OS = 'os',
          UA_RESULT = 'result',
          AMAZON = 'Amazon',
          APPLE = 'Apple',
          ASUS = 'ASUS',
          BLACKBERRY = 'BlackBerry',
          GOOGLE = 'Google',
          HUAWEI = 'Huawei',
          LENOVO = 'Lenovo',
          HONOR = 'Honor',
          LG = 'LG',
          MICROSOFT = 'Microsoft',
          MOTOROLA = 'Motorola',
          SAMSUNG = 'Samsung',
          SHARP = 'Sharp',
          SONY = 'Sony',
          XIAOMI = 'Xiaomi',
          ZEBRA = 'Zebra',
          PREFIX_MOBILE = 'Mobile ',
          SUFFIX_BROWSER = ' Browser',
          CHROME = 'Chrome',
          CHROMECAST = 'Chromecast',
          EDGE = 'Edge',
          FIREFOX = 'Firefox',
          OPERA = 'Opera',
          FACEBOOK = 'Facebook',
          SOGOU = 'Sogou',
          WINDOWS = 'Windows';

        var isWindow = typeof window !== UNDEF_TYPE,
          NAVIGATOR = (isWindow && window.navigator) ?
          window.navigator :
          undefined,
          NAVIGATOR_UADATA = (NAVIGATOR && NAVIGATOR.userAgentData) ?
          NAVIGATOR.userAgentData :
          undefined;

        ///////////
        // Helper
        //////////

        var extend = function(defaultRgx, extensions) {
            var mergedRgx = {};
            var extraRgx = extensions;
            if (!isExtensions(extensions)) {
              extraRgx = {};
              for (var i in extensions) {
                for (var j in extensions[i]) {
                  extraRgx[j] = extensions[i][j].concat(extraRgx[j] ? extraRgx[j] : []);
                }
              }
            }
            for (var k in defaultRgx) {
              mergedRgx[k] = extraRgx[k] && extraRgx[k].length % 2 === 0 ? extraRgx[k].concat(defaultRgx[k]) : defaultRgx[k];
            }
            return mergedRgx;
          },
          enumerize = function(arr) {
            var enums = {};
            for (var i = 0; i < arr.length; i++) {
              enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
          },
          has = function(str1, str2) {
            if (typeof str1 === OBJ_TYPE && str1.length > 0) {
              for (var i in str1) {
                if (lowerize(str1[i]) == lowerize(str2)) return true;
              }
              return false;
            }
            return isString(str1) ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
          },
          isExtensions = function(obj, deep) {
            for (var prop in obj) {
              return /^(browser|cpu|device|engine|os)$/.test(prop) || (deep ? isExtensions(obj[prop]) : false);
            }
          },
          isString = function(val) {
            return typeof val === STR_TYPE;
          },
          itemListToArray = function(header) {
            if (!header) return undefined;
            var arr = [];
            var tokens = strip(/\\?\"/g, header).split(',');
            for (var i = 0; i < tokens.length; i++) {
              if (tokens[i].indexOf(';') > -1) {
                var token = trim(tokens[i]).split(';v=');
                arr[i] = {
                  brand: token[0],
                  version: token[1]
                };
              } else {
                arr[i] = trim(tokens[i]);
              }
            }
            return arr;
          },
          lowerize = function(str) {
            return isString(str) ? str.toLowerCase() : str;
          },
          majorize = function(version) {
            return isString(version) ? strip(/[^\d\.]/g, version).split('.')[0] : undefined;
          },
          setProps = function(arr) {
            for (var i in arr) {
              var propName = arr[i];
              if (typeof propName == OBJ_TYPE && propName.length == 2) {
                this[propName[0]] = propName[1];
              } else {
                this[propName] = undefined;
              }
            }
            return this;
          },
          strip = function(pattern, str) {
            return isString(str) ? str.replace(pattern, EMPTY) : str;
          },
          stripQuotes = function(str) {
            return strip(/\\?\"/g, str);
          },
          trim = function(str, len) {
            if (isString(str)) {
              str = strip(/^\s\s*/, str);
              return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
          };

        ///////////////
        // Map helper
        //////////////

        var rgxMapper = function(ua, arrays) {

            if (!ua || !arrays) return;

            var i = 0,
              j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

              var regex = arrays[i], // even sequence (0,2,4,..)
                props = arrays[i + 1]; // odd sequence (1,3,5,..)
              j = k = 0;

              // try matching uastring with regexes
              while (j < regex.length && !matches) {

                if (!regex[j]) {
                  break;
                }
                matches = regex[j++].exec(ua);

                if (!!matches) {
                  for (p = 0; p < props.length; p++) {
                    match = matches[++k];
                    q = props[p];
                    // check if given property is actually array
                    if (typeof q === OBJ_TYPE && q.length > 0) {
                      if (q.length === 2) {
                        if (typeof q[1] == FUNC_TYPE) {
                          // assign modified match
                          this[q[0]] = q[1].call(this, match);
                        } else {
                          // assign given value, ignore regex match
                          this[q[0]] = q[1];
                        }
                      } else if (q.length === 3) {
                        // check whether function or regex
                        if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                          // call function (usually string mapper)
                          this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                        } else {
                          // sanitize match using given regex
                          this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                        }
                      } else if (q.length === 4) {
                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                      }
                    } else {
                      this[q] = match ? match : undefined;
                    }
                  }
                }
              }
              i += 2;
            }
          },

          strMapper = function(str, map) {

            for (var i in map) {
              // check if current value is array
              if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                for (var j = 0; j < map[i].length; j++) {
                  if (has(map[i][j], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                  }
                }
              } else if (has(map[i], str)) {
                return (i === UNKNOWN) ? undefined : i;
              }
            }
            return map.hasOwnProperty('*') ? map['*'] : str;
          };

        ///////////////
        // String map
        //////////////

        var windowsVersionMap = {
            'ME': '4.90',
            'NT 3.11': 'NT3.51',
            'NT 4.0': 'NT4.0',
            '2000': 'NT 5.0',
            'XP': ['NT 5.1', 'NT 5.2'],
            'Vista': 'NT 6.0',
            '7': 'NT 6.1',
            '8': 'NT 6.2',
            '8.1': 'NT 6.3',
            '10': ['NT 6.4', 'NT 10.0'],
            'RT': 'ARM'
          },

          formFactorsMap = {
            'embedded': 'Automotive',
            'mobile': 'Mobile',
            'tablet': ['Tablet', 'EInk'],
            'smarttv': 'TV',
            'wearable': 'Watch',
            'xr': ['VR', 'XR'],
            '?': ['Desktop', 'Unknown'],
            '*': undefined
          };

        //////////////
        // Regex map
        /////////////

        var defaultRegexes = {

          browser: [
            [

              // Most common regardless engine
              /\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
            ],
            [VERSION, [NAME, PREFIX_MOBILE + 'Chrome']],
            [
              /edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
            ],
            [VERSION, [NAME, 'Edge']],
            [

              // Presto based
              /(opera mini)\/([-\w\.]+)/i, // Opera Mini
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, // Opera Mobi/Tablet
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
            ],
            [NAME, VERSION],
            [
              /opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
            ],
            [VERSION, [NAME, OPERA + ' Mini']],
            [
              /\bop(?:rg)?x\/([\w\.]+)/i // Opera GX
            ],
            [VERSION, [NAME, OPERA + ' GX']],
            [
              /\bopr\/([\w\.]+)/i // Opera Webkit
            ],
            [VERSION, [NAME, OPERA]],
            [

              // Mixed
              /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i // Baidu
            ],
            [VERSION, [NAME, 'Baidu']],
            [
              /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i // Maxthon
            ],
            [VERSION, [NAME, 'Maxthon']],
            [
              /(kindle)\/([\w\.]+)/i, // Kindle
              /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
              // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
              // Trident based
              /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i, // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
              /(?:ms|\()(ie) ([\w\.]+)/i, // Internet Explorer

              // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
              // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
              /(heytap|ovi|115)browser\/([\d\.]+)/i, // HeyTap/Ovi/115
              /(weibo)__([\d\.]+)/i // Weibo
            ],
            [NAME, VERSION],
            [
              /quark(?:pc)?\/([-\w\.]+)/i // Quark
            ],
            [VERSION, [NAME, 'Quark']],
            [
              /\bddg\/([\w\.]+)/i // DuckDuckGo
            ],
            [VERSION, [NAME, 'DuckDuckGo']],
            [
              /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
            ],
            [VERSION, [NAME, 'UCBrowser']],
            [
              /microm.+\bqbcore\/([\w\.]+)/i, // WeChat Desktop for Windows Built-in Browser
              /\bqbcore\/([\w\.]+).+microm/i,
              /micromessenger\/([\w\.]+)/i // WeChat
            ],
            [VERSION, [NAME, 'WeChat']],
            [
              /konqueror\/([\w\.]+)/i // Konqueror
            ],
            [VERSION, [NAME, 'Konqueror']],
            [
              /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
            ],
            [VERSION, [NAME, 'IE']],
            [
              /ya(?:search)?browser\/([\w\.]+)/i // Yandex
            ],
            [VERSION, [NAME, 'Yandex']],
            [
              /slbrowser\/([\w\.]+)/i // Smart Lenovo Browser
            ],
            [VERSION, [NAME, 'Smart ' + LENOVO + SUFFIX_BROWSER]],
            [
              /(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
            ],
            [
              [NAME, /(.+)/, '$1 Secure' + SUFFIX_BROWSER], VERSION
            ],
            [
              /\bfocus\/([\w\.]+)/i // Firefox Focus
            ],
            [VERSION, [NAME, FIREFOX + ' Focus']],
            [
              /\bopt\/([\w\.]+)/i // Opera Touch
            ],
            [VERSION, [NAME, OPERA + ' Touch']],
            [
              /coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
            ],
            [VERSION, [NAME, 'Coc Coc']],
            [
              /dolfin\/([\w\.]+)/i // Dolphin
            ],
            [VERSION, [NAME, 'Dolphin']],
            [
              /coast\/([\w\.]+)/i // Opera Coast
            ],
            [VERSION, [NAME, OPERA + ' Coast']],
            [
              /miuibrowser\/([\w\.]+)/i // MIUI Browser
            ],
            [VERSION, [NAME, 'MIUI' + SUFFIX_BROWSER]],
            [
              /fxios\/([\w\.-]+)/i // Firefox for iOS
            ],
            [VERSION, [NAME, PREFIX_MOBILE + FIREFOX]],
            [
              /\bqihoobrowser\/?([\w\.]*)/i // 360
            ],
            [VERSION, [NAME, '360']],
            [
              /\b(qq)\/([\w\.]+)/i // QQ
            ],
            [
              [NAME, /(.+)/, '$1Browser'], VERSION
            ],
            [
              /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
            ],
            [
              [NAME, /(.+)/, '$1' + SUFFIX_BROWSER], VERSION
            ],
            [ // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
              /samsungbrowser\/([\w\.]+)/i // Samsung Internet
            ],
            [VERSION, [NAME, SAMSUNG + ' Internet']],
            [
              /metasr[\/ ]?([\d\.]+)/i // Sogou Explorer
            ],
            [VERSION, [NAME, SOGOU + ' Explorer']],
            [
              /(sogou)mo\w+\/([\d\.]+)/i // Sogou Mobile
            ],
            [
              [NAME, SOGOU + ' Mobile'], VERSION
            ],
            [
              /(electron)\/([\w\.]+) safari/i, // Electron-based App
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, // Tesla
              /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i // QQ/2345
            ],
            [NAME, VERSION],
            [
              /(lbbrowser|rekonq)/i // LieBao Browser/Rekonq
            ],
            [NAME],
            [
              /ome\/([\w\.]+) \w* ?(iron) saf/i, // Iron
              /ome\/([\w\.]+).+qihu (360)[es]e/i // 360
            ],
            [VERSION, NAME],
            [

              // WebView
              /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
            ],
            [
              [NAME, FACEBOOK], VERSION, [TYPE, INAPP]
            ],
            [
              /(Klarna)\/([\w\.]+)/i, // Klarna Shopping Browser for iOS & Android
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, // Kakao App
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, // Naver InApp
              /safari (line)\/([\w\.]+)/i, // Line App for iOS
              /\b(line)\/([\w\.]+)\/iab/i, // Line App for Android
              /(alipay)client\/([\w\.]+)/i, // Alipay
              /(twitter)(?:and| f.+e\/([\w\.]+))/i, // Twitter
              /(instagram|snapchat)[\/ ]([-\w\.]+)/i // Instagram/Snapchat
            ],
            [NAME, VERSION, [TYPE, INAPP]],
            [
              /\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
            ],
            [VERSION, [NAME, 'GSA'],
              [TYPE, INAPP]
            ],
            [
              /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i // TikTok
            ],
            [VERSION, [NAME, 'TikTok'],
              [TYPE, INAPP]
            ],
            [
              /\[(linkedin)app\]/i // LinkedIn App for iOS & Android
            ],
            [NAME, [TYPE, INAPP]],
            [

              /(chromium)[\/ ]([-\w\.]+)/i // Chromium
            ],
            [NAME, VERSION],
            [

              /headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
            ],
            [VERSION, [NAME, CHROME + ' Headless']],
            [

              / wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
            ],
            [
              [NAME, CHROME + ' WebView'], VERSION
            ],
            [

              /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
            ],
            [VERSION, [NAME, 'Android' + SUFFIX_BROWSER]],
            [

              /chrome\/([\w\.]+) mobile/i // Chrome Mobile
            ],
            [VERSION, [NAME, PREFIX_MOBILE + 'Chrome']],
            [

              /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
            ],
            [NAME, VERSION],
            [

              /version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i // Safari Mobile
            ],
            [VERSION, [NAME, PREFIX_MOBILE + 'Safari']],
            [
              /iphone .*mobile(?:\/\w+ | ?)safari/i
            ],
            [
              [NAME, PREFIX_MOBILE + 'Safari']
            ],
            [
              /version\/([\w\.\,]+) .*(safari)/i // Safari
            ],
            [VERSION, NAME],
            [
              /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
            ],
            [NAME, [VERSION, '1']],
            [

              /(webkit|khtml)\/([\w\.]+)/i
            ],
            [NAME, VERSION],
            [

              // Gecko based
              /(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i // Firefox Mobile
            ],
            [
              [NAME, PREFIX_MOBILE + FIREFOX], VERSION
            ],
            [
              /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
            ],
            [
              [NAME, 'Netscape'], VERSION
            ],
            [
              /(wolvic|librewolf)\/([\w\.]+)/i // Wolvic/LibreWolf
            ],
            [NAME, VERSION],
            [
              /mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
            ],
            [VERSION, [NAME, FIREFOX + ' Reality']],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i, // Flow
              /(swiftfox)/i, // Swiftfox
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
              // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
              /(firefox)\/([\w\.]+)/i, // Other Firefox-based
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, // Mozilla

              // Other
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser
              /\b(links) \(([\w\.]+)/i // Links
            ],
            [NAME, [VERSION, /_/g, '.']],
            [

              /(cobalt)\/([\w\.]+)/i // Cobalt
            ],
            [NAME, [VERSION, /[^\d\.]+./, EMPTY]]
          ],

          cpu: [
            [

              /\b(?:(amd|x|x86[-_]?|wow|win)64)\b/i // AMD64 (x64)
            ],
            [
              [ARCHITECTURE, 'amd64']
            ],
            [

              /(ia32(?=;))/i, // IA32 (quicktime)
              /((?:i[346]|x)86)[;\)]/i // IA32 (x86)
            ],
            [
              [ARCHITECTURE, 'ia32']
            ],
            [

              /\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
            ],
            [
              [ARCHITECTURE, 'arm64']
            ],
            [

              /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
            ],
            [
              [ARCHITECTURE, 'armhf']
            ],
            [

              // PocketPC mistakenly identified as PowerPC
              /windows (ce|mobile); ppc;/i
            ],
            [
              [ARCHITECTURE, 'arm']
            ],
            [

              /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
            ],
            [
              [ARCHITECTURE, /ower/, EMPTY, lowerize]
            ],
            [

              /(sun4\w)[;\)]/i // SPARC
            ],
            [
              [ARCHITECTURE, 'sparc']
            ],
            [

              /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
              // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ],
            [
              [ARCHITECTURE, lowerize]
            ]
          ],

          device: [
            [

              //////////////////////////
              // MOBILES & TABLETS
              /////////////////////////

              // Samsung
              /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [MODEL, [VENDOR, SAMSUNG],
              [TYPE, TABLET]
            ],
            [
              /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]((?!sm-[lr])[-\w]+)/i,
              /sec-(sgh\w+)/i
            ],
            [MODEL, [VENDOR, SAMSUNG],
              [TYPE, MOBILE]
            ],
            [

              // Apple
              /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i // iPod/iPhone
            ],
            [MODEL, [VENDOR, APPLE],
              [TYPE, MOBILE]
            ],
            [
              /\((ipad);[-\w\),; ]+apple/i, // iPad
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [MODEL, [VENDOR, APPLE],
              [TYPE, TABLET]
            ],
            [
              /(macintosh);/i
            ],
            [MODEL, [VENDOR, APPLE]],
            [

              // Sharp
              /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [MODEL, [VENDOR, SHARP],
              [TYPE, MOBILE]
            ],
            [

              // Honor
              /(?:honor)([-\w ]+)[;\)]/i
            ],
            [MODEL, [VENDOR, HONOR],
              [TYPE, MOBILE]
            ],
            [

              // Huawei
              /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI],
              [TYPE, TABLET]
            ],
            [
              /(?:huawei)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI],
              [TYPE, MOBILE]
            ],
            [

              // Xiaomi
              /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, // Xiaomi POCO
              /\b; (\w+) build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, // Xiaomi Hongmi
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, // Xiaomi Redmi
              /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, // Xiaomi Redmi 'numeric' models
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i // Xiaomi Mi
            ],
            [
              [MODEL, /_/g, ' '],
              [VENDOR, XIAOMI],
              [TYPE, MOBILE]
            ],
            [
              /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, // Redmi Pad
              /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
            ],
            [
              [MODEL, /_/g, ' '],
              [VENDOR, XIAOMI],
              [TYPE, TABLET]
            ],
            [

              // OPPO
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [MODEL, [VENDOR, 'OPPO'],
              [TYPE, MOBILE]
            ],
            [
              /\b(opd2\d{3}a?) bui/i
            ],
            [MODEL, [VENDOR, 'OPPO'],
              [TYPE, TABLET]
            ],
            [

              // Vivo
              /vivo (\w+)(?: bui|\))/i,
              /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [MODEL, [VENDOR, 'Vivo'],
              [TYPE, MOBILE]
            ],
            [

              // Realme
              /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ],
            [MODEL, [VENDOR, 'Realme'],
              [TYPE, MOBILE]
            ],
            [

              // Motorola
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ],
            [MODEL, [VENDOR, MOTOROLA],
              [TYPE, MOBILE]
            ],
            [
              /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [MODEL, [VENDOR, MOTOROLA],
              [TYPE, TABLET]
            ],
            [

              // LG
              /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [MODEL, [VENDOR, LG],
              [TYPE, TABLET]
            ],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
              /\blg-?([\d\w]+) bui/i
            ],
            [MODEL, [VENDOR, LG],
              [TYPE, MOBILE]
            ],
            [

              // Lenovo
              /(ideatab[-\w ]+)/i,
              /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ],
            [MODEL, [VENDOR, LENOVO],
              [TYPE, TABLET]
            ],
            [

              // Nokia
              /(?:maemo|nokia).*(n900|lumia \d+)/i,
              /nokia[-_ ]?([-\w\.]*)/i
            ],
            [
              [MODEL, /_/g, ' '],
              [VENDOR, 'Nokia'],
              [TYPE, MOBILE]
            ],
            [

              // Google
              /(pixel c)\b/i // Google Pixel C
            ],
            [MODEL, [VENDOR, GOOGLE],
              [TYPE, TABLET]
            ],
            [
              /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
            ],
            [MODEL, [VENDOR, GOOGLE],
              [TYPE, MOBILE]
            ],
            [

              // Sony
              /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [MODEL, [VENDOR, SONY],
              [TYPE, MOBILE]
            ],
            [
              /sony tablet [ps]/i,
              /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [
              [MODEL, 'Xperia Tablet'],
              [VENDOR, SONY],
              [TYPE, TABLET]
            ],
            [

              // OnePlus
              / (kb2005|in20[12]5|be20[12][59])\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [MODEL, [VENDOR, 'OnePlus'],
              [TYPE, MOBILE]
            ],
            [

              // Amazon
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i, // Kindle Fire without Silk / Echo Show
              /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
            ],
            [MODEL, [VENDOR, AMAZON],
              [TYPE, TABLET]
            ],
            [
              /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
            ],
            [
              [MODEL, /(.+)/g, 'Fire Phone $1'],
              [VENDOR, AMAZON],
              [TYPE, MOBILE]
            ],
            [

              // BlackBerry
              /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
            ],
            [MODEL, VENDOR, [TYPE, TABLET]],
            [
              /\b((?:bb[a-f]|st[hv])100-\d)/i,
              /\(bb10; (\w+)/i // BlackBerry 10
            ],
            [MODEL, [VENDOR, BLACKBERRY],
              [TYPE, MOBILE]
            ],
            [

              // Asus
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [MODEL, [VENDOR, ASUS],
              [TYPE, TABLET]
            ],
            [
              / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [MODEL, [VENDOR, ASUS],
              [TYPE, MOBILE]
            ],
            [

              // HTC
              /(nexus 9)/i // HTC Nexus 9
            ],
            [MODEL, [VENDOR, 'HTC'],
              [TYPE, TABLET]
            ],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, // HTC

              // ZTE
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ],
            [VENDOR, [MODEL, /_/g, ' '],
              [TYPE, MOBILE]
            ],
            [

              // TCL
              /tcl (xess p17aa)/i,
              /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i
            ],
            [MODEL, [VENDOR, 'TCL'],
              [TYPE, TABLET]
            ],
            [
              /droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i
            ],
            [MODEL, [VENDOR, 'TCL'],
              [TYPE, MOBILE]
            ],
            [

              // itel
              /(itel) ((\w+))/i
            ],
            [
              [VENDOR, lowerize], MODEL, [TYPE, strMapper, {
                'tablet': ['p10001l', 'w7001'],
                '*': 'mobile'
              }]
            ],
            [

              // Acer
              /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [MODEL, [VENDOR, 'Acer'],
              [TYPE, TABLET]
            ],
            [

              // Meizu
              /droid.+; (m[1-5] note) bui/i,
              /\bmz-([-\w]{2,})/i
            ],
            [MODEL, [VENDOR, 'Meizu'],
              [TYPE, MOBILE]
            ],
            [

              // Ulefone
              /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ],
            [MODEL, [VENDOR, 'Ulefone'],
              [TYPE, MOBILE]
            ],
            [

              // Energizer
              /; (energy ?\w+)(?: bui|\))/i,
              /; energizer ([\w ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, 'Energizer'],
              [TYPE, MOBILE]
            ],
            [

              // Cat
              /; cat (b35);/i,
              /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, 'Cat'],
              [TYPE, MOBILE]
            ],
            [

              // Smartfren
              /((?:new )?andromax[\w- ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, 'Smartfren'],
              [TYPE, MOBILE]
            ],
            [

              // Nothing
              /droid.+; (a(?:015|06[35]|142p?))/i
            ],
            [MODEL, [VENDOR, 'Nothing'],
              [TYPE, MOBILE]
            ],
            [

              // MIXED
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
              // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Infinix/Tecno/Micromax/Advan
              /; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i, // IMO
              /(hp) ([\w ]+\w)/i, // HP iPAQ
              /(asus)-?(\w+)/i, // Asus
              /(microsoft); (lumia[\w ]+)/i, // Microsoft Lumia
              /(lenovo)[-_ ]?([-\w]+)/i, // Lenovo
              /(jolla)/i, // Jolla
              /(oppo) ?([\w ]+) bui/i // OPPO
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [

              /(imo) (tab \w+)/i, // IMO
              /(kobo)\s(ereader|touch)/i, // Kobo
              /(archos) (gamepad2?)/i, // Archos
              /(hp).+(touchpad(?!.+tablet)|tablet)/i, // HP TouchPad
              /(kindle)\/([\w\.]+)/i // Kindle
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [

              /(surface duo)/i // Surface Duo
            ],
            [MODEL, [VENDOR, MICROSOFT],
              [TYPE, TABLET]
            ],
            [
              /droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
            ],
            [MODEL, [VENDOR, 'Fairphone'],
              [TYPE, MOBILE]
            ],
            [
              /(shield[\w ]+) b/i // Nvidia Shield Tablets
            ],
            [MODEL, [VENDOR, 'Nvidia'],
              [TYPE, TABLET]
            ],
            [
              /(sprint) (\w+)/i // Sprint Phones
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kin\.[onetw]{3})/i // Microsoft Kin
            ],
            [
              [MODEL, /\./g, ' '],
              [VENDOR, MICROSOFT],
              [TYPE, MOBILE]
            ],
            [
              /droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
            ],
            [MODEL, [VENDOR, ZEBRA],
              [TYPE, TABLET]
            ],
            [
              /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [MODEL, [VENDOR, ZEBRA],
              [TYPE, MOBILE]
            ],
            [

              ///////////////////
              // SMARTTVS
              ///////////////////

              /smart-tv.+(samsung)/i // Samsung
            ],
            [VENDOR, [TYPE, SMARTTV]],
            [
              /hbbtv.+maple;(\d+)/i
            ],
            [
              [MODEL, /^/, 'SmartTV'],
              [VENDOR, SAMSUNG],
              [TYPE, SMARTTV]
            ],
            [
              /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
            ],
            [
              [VENDOR, LG],
              [TYPE, SMARTTV]
            ],
            [
              /(apple) ?tv/i // Apple TV
            ],
            [VENDOR, [MODEL, APPLE + ' TV'],
              [TYPE, SMARTTV]
            ],
            [
              /crkey.*devicetype\/chromecast/i // Google Chromecast Third Generation
            ],
            [
              [MODEL, CHROMECAST + ' Third Generation'],
              [VENDOR, GOOGLE],
              [TYPE, SMARTTV]
            ],
            [
              /crkey.*devicetype\/([^/]*)/i // Google Chromecast with specific device type
            ],
            [
              [MODEL, /^/, 'Chromecast '],
              [VENDOR, GOOGLE],
              [TYPE, SMARTTV]
            ],
            [
              /fuchsia.*crkey/i // Google Chromecast Nest Hub
            ],
            [
              [MODEL, CHROMECAST + ' Nest Hub'],
              [VENDOR, GOOGLE],
              [TYPE, SMARTTV]
            ],
            [
              /crkey/i // Google Chromecast, Linux-based or unknown
            ],
            [
              [MODEL, CHROMECAST],
              [VENDOR, GOOGLE],
              [TYPE, SMARTTV]
            ],
            [
              /droid.+aft(\w+)( bui|\))/i // Fire TV
            ],
            [MODEL, [VENDOR, AMAZON],
              [TYPE, SMARTTV]
            ],
            [
              /\(dtv[\);].+(aquos)/i,
              /(aquos-tv[\w ]+)\)/i // Sharp
            ],
            [MODEL, [VENDOR, SHARP],
              [TYPE, SMARTTV]
            ],
            [
              /(bravia[\w ]+)( bui|\))/i // Sony
            ],
            [MODEL, [VENDOR, SONY],
              [TYPE, SMARTTV]
            ],
            [
              /(mitv-\w{5}) bui/i // Xiaomi
            ],
            [MODEL, [VENDOR, XIAOMI],
              [TYPE, SMARTTV]
            ],
            [
              /Hbbtv.*(technisat) (.*);/i // TechniSAT
            ],
            [VENDOR, MODEL, [TYPE, SMARTTV]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, // Roku
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i // HbbTV devices
            ],
            [
              [VENDOR, trim],
              [MODEL, trim],
              [TYPE, SMARTTV]
            ],
            [
              /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
            ],
            [
              [TYPE, SMARTTV]
            ],
            [

              ///////////////////
              // CONSOLES
              ///////////////////

              /(ouya)/i, // Ouya
              /(nintendo) (\w+)/i // Nintendo
            ],
            [VENDOR, MODEL, [TYPE, CONSOLE]],
            [
              /droid.+; (shield) bui/i // Nvidia
            ],
            [MODEL, [VENDOR, 'Nvidia'],
              [TYPE, CONSOLE]
            ],
            [
              /(playstation \w+)/i // Playstation
            ],
            [MODEL, [VENDOR, SONY],
              [TYPE, CONSOLE]
            ],
            [
              /\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
            ],
            [MODEL, [VENDOR, MICROSOFT],
              [TYPE, CONSOLE]
            ],
            [

              ///////////////////
              // WEARABLES
              ///////////////////

              /\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i // Samsung Galaxy Watch
            ],
            [MODEL, [VENDOR, SAMSUNG],
              [TYPE, WEARABLE]
            ],
            [
              /((pebble))app/i // Pebble
            ],
            [VENDOR, MODEL, [TYPE, WEARABLE]],
            [
              /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i // Apple Watch
            ],
            [MODEL, [VENDOR, APPLE],
              [TYPE, WEARABLE]
            ],
            [
              /droid.+; (wt63?0{2,3})\)/i
            ],
            [MODEL, [VENDOR, ZEBRA],
              [TYPE, WEARABLE]
            ],
            [

              ///////////////////
              // XR
              ///////////////////

              /droid.+; (glass) \d/i // Google Glass
            ],
            [MODEL, [VENDOR, GOOGLE],
              [TYPE, XR]
            ],
            [
              /(pico) (4|neo3(?: link|pro)?)/i // Pico
            ],
            [VENDOR, MODEL, [TYPE, XR]],
            [
              /; (quest( \d| pro)?)/i // Oculus Quest
            ],
            [MODEL, [VENDOR, FACEBOOK],
              [TYPE, XR]
            ],
            [

              ///////////////////
              // EMBEDDED
              ///////////////////

              /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
            ],
            [VENDOR, [TYPE, EMBEDDED]],
            [
              /(aeobc)\b/i // Echo Dot
            ],
            [MODEL, [VENDOR, AMAZON],
              [TYPE, EMBEDDED]
            ],
            [

              ////////////////////
              // MIXED (GENERIC)
              ///////////////////

              /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
            ],
            [MODEL, [TYPE, MOBILE]],
            [
              /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
            ],
            [MODEL, [TYPE, TABLET]],
            [
              /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
            ],
            [
              [TYPE, TABLET]
            ],
            [
              /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
            ],
            [
              [TYPE, MOBILE]
            ],
            [
              /(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
            ],
            [MODEL, [VENDOR, 'Generic']]
          ],

          engine: [
            [

              /windows.+ edge\/([\w\.]+)/i // EdgeHTML
            ],
            [VERSION, [NAME, EDGE + 'HTML']],
            [

              /(arkweb)\/([\w\.]+)/i // ArkWeb
            ],
            [NAME, VERSION],
            [

              /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
            ],
            [VERSION, [NAME, 'Blink']],
            [

              /(presto)\/([\w\.]+)/i, // Presto
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
              /ekioh(flow)\/([\w\.]+)/i, // Flow
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, // KHTML/Tasman/Links
              /(icab)[\/ ]([23]\.[\d\.]+)/i, // iCab
              /\b(libweb)/i
            ],
            [NAME, VERSION],
            [

              /rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
            ],
            [VERSION, NAME]
          ],

          os: [
            [

              // Windows
              /microsoft (windows) (vista|xp)/i // Windows (iTunes)
            ],
            [NAME, VERSION],
            [
              /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i // Windows Phone
            ],
            [NAME, [VERSION, strMapper, windowsVersionMap]],
            [
              /windows nt 6\.2; (arm)/i, // Windows RT
              /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
              /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ],
            [
              [VERSION, strMapper, windowsVersionMap],
              [NAME, WINDOWS]
            ],
            [

              // iOS/macOS
              /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, // iOS
              /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
              /cfnetwork\/.+darwin/i
            ],
            [
              [VERSION, /_/g, '.'],
              [NAME, 'iOS']
            ],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
            ],
            [
              [NAME, 'macOS'],
              [VERSION, /_/g, '.']
            ],
            [

              // Google Chromecast
              /android ([\d\.]+).*crkey/i // Google Chromecast, Android-based
            ],
            [VERSION, [NAME, CHROMECAST + ' Android']],
            [
              /fuchsia.*crkey\/([\d\.]+)/i // Google Chromecast, Fuchsia-based
            ],
            [VERSION, [NAME, CHROMECAST + ' Fuchsia']],
            [
              /crkey\/([\d\.]+).*devicetype\/smartspeaker/i // Google Chromecast, Linux-based Smart Speaker
            ],
            [VERSION, [NAME, CHROMECAST + ' SmartSpeaker']],
            [
              /linux.*crkey\/([\d\.]+)/i // Google Chromecast, Legacy Linux-based
            ],
            [VERSION, [NAME, CHROMECAST + ' Linux']],
            [
              /crkey\/([\d\.]+)/i // Google Chromecast, unknown
            ],
            [VERSION, [NAME, CHROMECAST]],
            [

              // Mobile OSes
              /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i // Android-x86/HarmonyOS
            ],
            [VERSION, NAME],
            [ // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS/OpenHarmony
              /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i,
              /(blackberry)\w*\/([\w\.]*)/i, // Blackberry
              /(tizen|kaios)[\/ ]([\w\.]+)/i, // Tizen/KaiOS
              /\((series40);/i // Series 40
            ],
            [NAME, VERSION],
            [
              /\(bb(10);/i // BlackBerry 10
            ],
            [VERSION, [NAME, BLACKBERRY]],
            [
              /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
            ],
            [VERSION, [NAME, 'Symbian']],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ],
            [VERSION, [NAME, FIREFOX + ' OS']],
            [
              /web0s;.+rt(tv)/i,
              /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
            ],
            [VERSION, [NAME, 'webOS']],
            [
              /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i // watchOS
            ],
            [VERSION, [NAME, 'watchOS']],
            [

              // Google ChromeOS
              /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i // Chromium OS
            ],
            [
              [NAME, "Chrome OS"], VERSION
            ],
            [

              // Smart TVs
              /panasonic;(viera)/i, // Panasonic Viera
              /(netrange)mmh/i, // Netrange
              /(nettv)\/(\d+\.[\w\.]+)/i, // NetTV

              // Console
              /(nintendo|playstation) (\w+)/i, // Nintendo/Playstation
              /(xbox); +xbox ([^\);]+)/i, // Microsoft Xbox (360, One, X, S, Series X, Series S)
              /(pico) .+os([\w\.]+)/i, // Pico

              // Other
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, // Joli/Palm
              /(mint)[\/\(\) ]?(\w*)/i, // Mint
              /(mageia|vectorlinux)[; ]/i, // Mageia/VectorLinux
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
              /(hurd|linux) ?([\w\.]*)/i, // Hurd/Linux
              /(gnu) ?([\w\.]*)/i, // GNU
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
              /(haiku) (\w+)/i // Haiku
            ],
            [NAME, VERSION],
            [
              /(sunos) ?([\w\.\d]*)/i // Solaris
            ],
            [
              [NAME, 'Solaris'], VERSION
            ],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i, // Solaris
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, // AIX
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
              /(unix) ?([\w\.]*)/i // UNIX
            ],
            [NAME, VERSION]
          ]
        };

        /////////////////
        // Factories
        ////////////////

        var defaultProps = (function() {
          var props = {
            init: {},
            isIgnore: {},
            isIgnoreRgx: {},
            toString: {}
          };
          setProps.call(props.init, [
            [UA_BROWSER, [NAME, VERSION, MAJOR, TYPE]],
            [UA_CPU, [ARCHITECTURE]],
            [UA_DEVICE, [TYPE, MODEL, VENDOR]],
            [UA_ENGINE, [NAME, VERSION]],
            [UA_OS, [NAME, VERSION]]
          ]);
          setProps.call(props.isIgnore, [
            [UA_BROWSER, [VERSION, MAJOR]],
            [UA_ENGINE, [VERSION]],
            [UA_OS, [VERSION]]
          ]);
          setProps.call(props.isIgnoreRgx, [
            [UA_BROWSER, / ?browser$/i],
            [UA_OS, / ?os$/i]
          ]);
          setProps.call(props.toString, [
            [UA_BROWSER, [NAME, VERSION]],
            [UA_CPU, [ARCHITECTURE]],
            [UA_DEVICE, [VENDOR, MODEL]],
            [UA_ENGINE, [NAME, VERSION]],
            [UA_OS, [NAME, VERSION]]
          ]);
          return props;
        })();

        var createIData = function(item, itemType) {

          var init_props = defaultProps.init[itemType],
            is_ignoreProps = defaultProps.isIgnore[itemType] || 0,
            is_ignoreRgx = defaultProps.isIgnoreRgx[itemType] || 0,
            toString_props = defaultProps.toString[itemType] || 0;

          function IData() {
            setProps.call(this, init_props);
          }

          IData.prototype.getItem = function() {
            return item;
          };

          IData.prototype.withClientHints = function() {

            // nodejs / non-client-hints browsers
            if (!NAVIGATOR_UADATA) {
              return item
                .parseCH()
                .get();
            }

            // browsers based on chromium 85+
            return NAVIGATOR_UADATA
              .getHighEntropyValues(CH_ALL_VALUES)
              .then(function(res) {
                return item
                  .setCH(new UACHData(res, false))
                  .parseCH()
                  .get();
              });
          };

          IData.prototype.withFeatureCheck = function() {
            return item.detectFeature().get();
          };

          if (itemType != UA_RESULT) {
            IData.prototype.is = function(strToCheck) {
              var is = false;
              for (var i in this) {
                if (this.hasOwnProperty(i) && !has(is_ignoreProps, i) && lowerize(is_ignoreRgx ? strip(is_ignoreRgx, this[i]) : this[i]) == lowerize(is_ignoreRgx ? strip(is_ignoreRgx, strToCheck) : strToCheck)) {
                  is = true;
                  if (strToCheck != UNDEF_TYPE) break;
                } else if (strToCheck == UNDEF_TYPE && is) {
                  is = !is;
                  break;
                }
              }
              return is;
            };
            IData.prototype.toString = function() {
              var str = EMPTY;
              for (var i in toString_props) {
                if (typeof(this[toString_props[i]]) !== UNDEF_TYPE) {
                  str += (str ? ' ' : EMPTY) + this[toString_props[i]];
                }
              }
              return str || UNDEF_TYPE;
            };
          }

          if (!NAVIGATOR_UADATA) {
            IData.prototype.then = function(cb) {
              var that = this;
              var IDataResolve = function() {
                for (var prop in that) {
                  if (that.hasOwnProperty(prop)) {
                    this[prop] = that[prop];
                  }
                }
              };
              IDataResolve.prototype = {
                is: IData.prototype.is,
                toString: IData.prototype.toString
              };
              var resolveData = new IDataResolve();
              cb(resolveData);
              return resolveData;
            };
          }

          return new IData();
        };

        /////////////////
        // Constructor
        ////////////////

        function UACHData(uach, isHttpUACH) {
          uach = uach || {};
          setProps.call(this, CH_ALL_VALUES);
          if (isHttpUACH) {
            setProps.call(this, [
              [BRANDS, itemListToArray(uach[CH_HEADER])],
              [FULLVERLIST, itemListToArray(uach[CH_HEADER_FULL_VER_LIST])],
              [MOBILE, /\?1/.test(uach[CH_HEADER_MOBILE])],
              [MODEL, stripQuotes(uach[CH_HEADER_MODEL])],
              [PLATFORM, stripQuotes(uach[CH_HEADER_PLATFORM])],
              [PLATFORMVER, stripQuotes(uach[CH_HEADER_PLATFORM_VER])],
              [ARCHITECTURE, stripQuotes(uach[CH_HEADER_ARCH])],
              [FORMFACTORS, itemListToArray(uach[CH_HEADER_FORM_FACTORS])],
              [BITNESS, stripQuotes(uach[CH_HEADER_BITNESS])]
            ]);
          } else {
            for (var prop in uach) {
              if (this.hasOwnProperty(prop) && typeof uach[prop] !== UNDEF_TYPE) this[prop] = uach[prop];
            }
          }
        }

        function UAItem(itemType, ua, rgxMap, uaCH) {

          this.get = function(prop) {
            if (!prop) return this.data;
            return this.data.hasOwnProperty(prop) ? this.data[prop] : undefined;
          };

          this.set = function(prop, val) {
            this.data[prop] = val;
            return this;
          };

          this.setCH = function(ch) {
            this.uaCH = ch;
            return this;
          };

          this.detectFeature = function() {
            if (NAVIGATOR && NAVIGATOR.userAgent == this.ua) {
              switch (this.itemType) {
                case UA_BROWSER:
                  // Brave-specific detection
                  if (NAVIGATOR.brave && typeof NAVIGATOR.brave.isBrave == FUNC_TYPE) {
                    this.set(NAME, 'Brave');
                  }
                  break;
                case UA_DEVICE:
                  // Chrome-specific detection: check for 'mobile' value of navigator.userAgentData
                  if (!this.get(TYPE) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[MOBILE]) {
                    this.set(TYPE, MOBILE);
                  }
                  // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
                  if (this.get(MODEL) == 'Macintosh' && NAVIGATOR && typeof NAVIGATOR.standalone !== UNDEF_TYPE && NAVIGATOR.maxTouchPoints && NAVIGATOR.maxTouchPoints > 2) {
                    this.set(MODEL, 'iPad')
                      .set(TYPE, TABLET);
                  }
                  break;
                case UA_OS:
                  // Chrome-specific detection: check for 'platform' value of navigator.userAgentData
                  if (!this.get(NAME) && NAVIGATOR_UADATA && NAVIGATOR_UADATA[PLATFORM]) {
                    this.set(NAME, NAVIGATOR_UADATA[PLATFORM]);
                  }
                  break;
                case UA_RESULT:
                  var data = this.data;
                  var detect = function(itemType) {
                    return data[itemType]
                      .getItem()
                      .detectFeature()
                      .get();
                  };
                  this.set(UA_BROWSER, detect(UA_BROWSER))
                    .set(UA_CPU, detect(UA_CPU))
                    .set(UA_DEVICE, detect(UA_DEVICE))
                    .set(UA_ENGINE, detect(UA_ENGINE))
                    .set(UA_OS, detect(UA_OS));
              }
            }
            return this;
          };

          this.parseUA = function() {
            if (this.itemType != UA_RESULT) {
              rgxMapper.call(this.data, this.ua, this.rgxMap);
            }
            if (this.itemType == UA_BROWSER) {
              this.set(MAJOR, majorize(this.get(VERSION)));
            }
            return this;
          };

          this.parseCH = function() {
            var uaCH = this.uaCH,
              rgxMap = this.rgxMap;

            switch (this.itemType) {
              case UA_BROWSER:
                var brands = uaCH[FULLVERLIST] || uaCH[BRANDS],
                  prevName;
                if (brands) {
                  for (var i in brands) {
                    var brandName = strip(/(Google|Microsoft) /, brands[i].brand || brands[i]),
                      brandVersion = brands[i].version;
                    if (!/not.a.brand/i.test(brandName) && (!prevName || (/chrom/i.test(prevName) && !/chromi/i.test(brandName)))) {
                      this.set(NAME, brandName)
                        .set(VERSION, brandVersion)
                        .set(MAJOR, majorize(brandVersion));
                      prevName = brandName;
                    }
                  }
                }
                break;
              case UA_CPU:
                var archName = uaCH[ARCHITECTURE];
                if (archName) {
                  if (archName && uaCH[BITNESS] == '64') archName += '64';
                  rgxMapper.call(this.data, archName + ';', rgxMap);
                }
                break;
              case UA_DEVICE:
                if (uaCH[MOBILE]) {
                  this.set(TYPE, MOBILE);
                }
                if (uaCH[MODEL]) {
                  this.set(MODEL, uaCH[MODEL]);
                }
                // Xbox-Specific Detection
                if (uaCH[MODEL] == 'Xbox') {
                  this.set(TYPE, CONSOLE)
                    .set(VENDOR, MICROSOFT);
                }
                if (uaCH[FORMFACTORS]) {
                  var ff;
                  if (typeof uaCH[FORMFACTORS] !== 'string') {
                    var idx = 0;
                    while (!ff && idx < uaCH[FORMFACTORS].length) {
                      ff = strMapper(uaCH[FORMFACTORS][idx++], formFactorsMap);
                    }
                  } else {
                    ff = strMapper(uaCH[FORMFACTORS], formFactorsMap);
                  }
                  this.set(TYPE, ff);
                }
                break;
              case UA_OS:
                var osName = uaCH[PLATFORM];
                if (osName) {
                  var osVersion = uaCH[PLATFORMVER];
                  if (osName == WINDOWS) osVersion = (parseInt(majorize(osVersion), 10) >= 13 ? '11' : '10');
                  this.set(NAME, osName)
                    .set(VERSION, osVersion);
                }
                // Xbox-Specific Detection
                if (this.get(NAME) == WINDOWS && uaCH[MODEL] == 'Xbox') {
                  this.set(NAME, 'Xbox')
                    .set(VERSION, undefined);
                }
                break;
              case UA_RESULT:
                var data = this.data;
                var parse = function(itemType) {
                  return data[itemType]
                    .getItem()
                    .setCH(uaCH)
                    .parseCH()
                    .get();
                };
                this.set(UA_BROWSER, parse(UA_BROWSER))
                  .set(UA_CPU, parse(UA_CPU))
                  .set(UA_DEVICE, parse(UA_DEVICE))
                  .set(UA_ENGINE, parse(UA_ENGINE))
                  .set(UA_OS, parse(UA_OS));
            }
            return this;
          };

          setProps.call(this, [
            ['itemType', itemType],
            ['ua', ua],
            ['uaCH', uaCH],
            ['rgxMap', rgxMap],
            ['data', createIData(this, itemType)]
          ]);

          return this;
        }

        function UAParser(ua, extensions, headers) {

          if (typeof ua === OBJ_TYPE) {
            if (isExtensions(ua, true)) {
              if (typeof extensions === OBJ_TYPE) {
                headers = extensions; // case UAParser(extensions, headers)           
              }
              extensions = ua; // case UAParser(extensions)
            } else {
              headers = ua; // case UAParser(headers)
              extensions = undefined;
            }
            ua = undefined;
          } else if (typeof ua === STR_TYPE && !isExtensions(extensions, true)) {
            headers = extensions; // case UAParser(ua, headers)
            extensions = undefined;
          }

          // Convert Headers object into a plain object
          if (headers && typeof headers.append === FUNC_TYPE) {
            var kv = {};
            headers.forEach(function(v, k) {
              kv[k] = v;
            });
            headers = kv;
          }

          if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions, headers).getResult();
          }

          var userAgent = typeof ua === STR_TYPE ? ua : // Passed user-agent string
            (headers && headers[USER_AGENT] ? headers[USER_AGENT] : // User-Agent from passed headers
              ((NAVIGATOR && NAVIGATOR.userAgent) ? NAVIGATOR.userAgent : // navigator.userAgent
                EMPTY)), // empty string

            httpUACH = new UACHData(headers, true),
            regexMap = extensions ?
            extend(defaultRegexes, extensions) :
            defaultRegexes,

            createItemFunc = function(itemType) {
              if (itemType == UA_RESULT) {
                return function() {
                  return new UAItem(itemType, userAgent, regexMap, httpUACH)
                    .set('ua', userAgent)
                    .set(UA_BROWSER, this.getBrowser())
                    .set(UA_CPU, this.getCPU())
                    .set(UA_DEVICE, this.getDevice())
                    .set(UA_ENGINE, this.getEngine())
                    .set(UA_OS, this.getOS())
                    .get();
                };
              } else {
                return function() {
                  return new UAItem(itemType, userAgent, regexMap[itemType], httpUACH)
                    .parseUA()
                    .get();
                };
              }
            };

          // public methods
          setProps.call(this, [
              ['getBrowser', createItemFunc(UA_BROWSER)],
              ['getCPU', createItemFunc(UA_CPU)],
              ['getDevice', createItemFunc(UA_DEVICE)],
              ['getEngine', createItemFunc(UA_ENGINE)],
              ['getOS', createItemFunc(UA_OS)],
              ['getResult', createItemFunc(UA_RESULT)],
              ['getUA', function() {
                return userAgent;
              }],
              ['setUA', function(ua) {
                if (isString(ua))
                  userAgent = ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
                return this;
              }]
            ])
            .setUA(userAgent);

          return this;
        }

        UAParser.VERSION = LIBVERSION;
        UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR, TYPE]);
        UAParser.CPU = enumerize([ARCHITECTURE]);
        UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
        UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);



        /***/
      })

    /******/
  });
  /************************************************************************/
  /******/ // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /* webpack/runtime/define property getters */
  /******/
  (() => {
    /******/ // define getter functions for harmony exports
    /******/
    __webpack_require__.d = (exports, definition) => {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/
  /* webpack/runtime/global */
  /******/
  (() => {
    /******/
    __webpack_require__.g = (function() {
      /******/
      if (typeof globalThis === 'object') return globalThis;
      /******/
      try {
        /******/
        return this || new Function('return this')();
        /******/
      } catch (e) {
        /******/
        if (typeof window === 'object') return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/
  /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  (() => {
    /******/
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/
  })();
  /******/
  /******/
  /* webpack/runtime/make namespace object */
  /******/
  (() => {
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = (exports) => {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/
      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    /*!****************************!*\
      !*** ./src/rudderstack.js ***!
      \****************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _experiment_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./experiment-manager */ "./src/experiment-manager/index.js");
    /* harmony import */
    var _tracker_GameTracker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./tracker/GameTracker */ "./src/tracker/GameTracker.js");
    var _window$__OPTIONS__;
    // Imports


    if (((_window$__OPTIONS__ = window.__OPTIONS__) === null || _window$__OPTIONS__ === void 0 ? void 0 : _window$__OPTIONS__.currency) !== "FUN") {
      var _window$__OPTIONS__2;
      // Log the version
      console.log("[RSA] ".concat("1.1.0"));
      var tracker = new _tracker_GameTracker__WEBPACK_IMPORTED_MODULE_1__.GameTracker();
      window.amplitude = tracker;
      // Create the appropriate Growthbook manager based on the flag
      var isExperimental = !!((_window$__OPTIONS__2 = window.__OPTIONS__) !== null && _window$__OPTIONS__2 !== void 0 && _window$__OPTIONS__2.growthbook_flags);
      var growthbookManager = createGrowthbookManager(isExperimental);
      window.growthbookManager = growthbookManager;
    } else {
      console.log("[RSA] disabled in FUN mode");
    }

    /**
     * Create a Growthbook manager instance
     * @param {boolean} isExperimental - Flag indicating whether to use the experimental manager
     * @returns {GrowthbookExperimentManager | BEGrowthbookExperimentManager}
     */
    function createGrowthbookManager(isExperimental) {
      var _window$amplitude = window.amplitude,
        game = _window$amplitude.game,
        isEditor = _window$amplitude.isEditor;
      return isExperimental ? new _experiment_manager__WEBPACK_IMPORTED_MODULE_0__.BEGrowthbookExperimentManager(game, isEditor) : new _experiment_manager__WEBPACK_IMPORTED_MODULE_0__.GrowthbookExperimentManager(game, isEditor);
    }
  })();

  /******/
})();
//# sourceMappingURL=amplitude.js.map
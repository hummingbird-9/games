// tween.js
pc.extend(pc, function () {

    /**
     * @name pc.TweenManager
     * @description Handles updating tweens
     * @param {pc.AppBase} app - The AppBase instance.
     */
    var TweenManager = function (app) {
        this._app = app;
        this._tweens = [];
        this._add = []; // to be added
    };

    TweenManager.prototype = {
        add: function (tween) {
            this._add.push(tween);
            return tween;
        },

        update: function (dt) {
            var i = 0;
            var n = this._tweens.length;
            while (i < n) {
                if (this._tweens[i].update(dt)) {
                    i++;
                } else {
                    this._tweens.splice(i, 1);
                    n--;
                }
            }

            // add any tweens that were added mid-update
            if (this._add.length) {
                for (let i = 0; i < this._add.length; i++) {
                    if (this._tweens.indexOf(this._add[i]) > -1) continue;
                    this._tweens.push(this._add[i]);
                }
                this._add.length = 0;
            }
        }
    };

    /**
     * @name  pc.Tween
     * @param {object} target - The target property that will be tweened
     * @param {pc.TweenManager} manager - The tween manager
     * @param {pc.Entity} entity - The pc.Entity whose property we are tweening
     */
    var Tween = function (target, manager, entity) {
        pc.events.attach(this);

        this.manager = manager;

        if (entity) {
            this.entity = null; // if present the tween will dirty the transforms after modify the target
        }

        this.time = 0;

        this.complete = false;
        this.playing = false;
        this.stopped = true;
        this.pending = false;

        this.target = target;

        this.duration = 0;
        this._currentDelay = 0;
        this.timeScale = 1;
        this._reverse = false;

        this._delay = 0;
        this._yoyo = false;

        this._count = 0;
        this._numRepeats = 0;
        this._repeatDelay = 0;

        this._from = false; // indicates a "from" tween

        // for rotation tween
        this._slerp = false; // indicates a rotation tween
        this._fromQuat = new pc.Quat();
        this._toQuat = new pc.Quat();
        this._quat = new pc.Quat();

        this.easing = pc.Linear;

        this._sv = {}; // start values
        this._ev = {}; // end values
    };

    var _parseProperties = function (properties) {
        var _properties;
        if (properties instanceof pc.Vec2) {
            _properties = {
                x: properties.x,
                y: properties.y
            };
        } else if (properties instanceof pc.Vec3) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z
            };
        } else if (properties instanceof pc.Vec4) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Quat) {
            _properties = {
                x: properties.x,
                y: properties.y,
                z: properties.z,
                w: properties.w
            };
        } else if (properties instanceof pc.Color) {
            _properties = {
                r: properties.r,
                g: properties.g,
                b: properties.b
            };
            if (properties.a !== undefined) {
                _properties.a = properties.a;
            }
        } else {
            _properties = properties;
        }
        return _properties;
    };
    Tween.prototype = {
        // properties - js obj of values to update in target
        to: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            return this;
        },

        from: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);
            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._from = true;

            return this;
        },

        rotate: function (properties, duration, easing, delay, repeat, yoyo) {
            this._properties = _parseProperties(properties);

            this.duration = duration;

            if (easing) this.easing = easing;
            if (delay) {
                this.delay(delay);
            }
            if (repeat) {
                this.repeat(repeat);
            }

            if (yoyo) {
                this.yoyo(yoyo);
            }

            this._slerp = true;

            return this;
        },

        start: function () {
            var prop, _x, _y, _z;

            this.playing = true;
            this.complete = false;
            this.stopped = false;
            this._count = 0;
            this.pending = (this._delay > 0);

            if (this._reverse && !this.pending) {
                this.time = this.duration;
            } else {
                this.time = 0;
            }

            if (this._from) {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this._properties[prop];
                        this._ev[prop] = this.target[prop];
                    }
                }

                if (this._slerp) {
                    this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);

                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;
                    this._fromQuat.setFromEulerAngles(_x, _y, _z);
                }
            } else {
                for (prop in this._properties) {
                    if (this._properties.hasOwnProperty(prop)) {
                        this._sv[prop] = this.target[prop];
                        this._ev[prop] = this._properties[prop];
                    }
                }

                if (this._slerp) {
                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;

                    if (this._properties.w !== undefined) {
                        this._fromQuat.copy(this.target);
                        this._toQuat.set(_x, _y, _z, this._properties.w);
                    } else {
                        this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);
                        this._toQuat.setFromEulerAngles(_x, _y, _z);
                    }
                }
            }

            // set delay
            this._currentDelay = this._delay;

            // add to manager when started
            this.manager.add(this);

            this.fire("start");

            return this;
        },

        pause: function () {
            this.playing = false;
        },

        resume: function () {
            this.playing = true;
        },

        stop: function () {
            this.playing = false;
            this.stopped = true;
        },

        delay: function (delay) {
            this._delay = delay;
            this.pending = true;

            return this;
        },

        repeat: function (num, delay) {
            this._count = 0;
            this._numRepeats = num;
            if (delay) {
                this._repeatDelay = delay;
            } else {
                this._repeatDelay = 0;
            }

            return this;
        },

        loop: function (loop) {
            if (loop) {
                this._count = 0;
                this._numRepeats = Infinity;
            } else {
                this._numRepeats = 0;
            }

            return this;
        },

        yoyo: function (yoyo) {
            this._yoyo = yoyo;
            return this;
        },

        reverse: function () {
            this._reverse = !this._reverse;

            return this;
        },

        chain: function () {
            var n = arguments.length;

            while (n--) {
                if (n > 0) {
                    arguments[n - 1]._chained = arguments[n];
                } else {
                    this._chained = arguments[n];
                }
            }

            return this;
        },

        onStart: function (callback) {
            this.on('start', callback);
            return this;
        },

        onUpdate: function (callback) {
            this.on('update', callback);
            return this;
        },

        onComplete: function (callback) {
            this.on('complete', callback);
            return this;
        },

        onLoop: function (callback) {
            this.on('loop', callback);
            return this;
        },

        update: function (dt) {
            if (this.stopped) return false;

            if (!this.playing) return true;

            if (!this._reverse || this.pending) {
                this.time += dt * this.timeScale;
            } else {
                this.time -= dt * this.timeScale;
            }

            // delay start if required
            if (this.pending) {
                if (this.time > this._currentDelay) {
                    if (this._reverse) {
                        this.time = this.duration - (this.time - this._currentDelay);
                    } else {
                        this.time -= this._currentDelay;
                    }
                    this.pending = false;
                } else {
                    return true;
                }
            }

            var _extra = 0;
            if ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)) {
                this._count++;
                this.complete = true;
                this.playing = false;
                if (this._reverse) {
                    _extra = this.duration - this.time;
                    this.time = 0;
                } else {
                    _extra = this.time - this.duration;
                    this.time = this.duration;
                }
            }

            var elapsed = (this.duration === 0) ? 1 : (this.time / this.duration);

            // run easing
            var a = this.easing(elapsed);

            // increment property
            var s, e;
            for (var prop in this._properties) {
                if (this._properties.hasOwnProperty(prop)) {
                    s = this._sv[prop];
                    e = this._ev[prop];
                    this.target[prop] = s + (e - s) * a;
                }
            }

            if (this._slerp) {
                this._quat.slerp(this._fromQuat, this._toQuat, a);
            }

            // if this is a entity property then we should dirty the transform
            if (this.entity) {
                this.entity._dirtifyLocal();

                // apply element property changes
                if (this.element && this.entity.element) {
                    this.entity.element[this.element] = this.target;
                }

                if (this._slerp) {
                    this.entity.setLocalRotation(this._quat);
                }
            }

            this.fire("update", dt);

            if (this.complete) {
                var repeat = this._repeat(_extra);
                if (!repeat) {
                    this.fire("complete", _extra);
                    if (this.entity)
                        this.entity.off('destroy', this.stop, this);
                    if (this._chained) this._chained.start();
                } else {
                    this.fire("loop");
                }

                return repeat;
            }

            return true;
        },

        _repeat: function (extra) {
            // test for repeat conditions
            if (this._count < this._numRepeats) {
                // do a repeat
                if (this._reverse) {
                    this.time = this.duration - extra;
                } else {
                    this.time = extra; // include overspill time
                }
                this.complete = false;
                this.playing = true;

                this._currentDelay = this._repeatDelay;
                this.pending = true;

                if (this._yoyo) {
                    // swap start/end properties
                    for (var prop in this._properties) {
                        var tmp = this._sv[prop];
                        this._sv[prop] = this._ev[prop];
                        this._ev[prop] = tmp;
                    }

                    if (this._slerp) {
                        this._quat.copy(this._fromQuat);
                        this._fromQuat.copy(this._toQuat);
                        this._toQuat.copy(this._quat);
                    }
                }

                return true;
            }
            return false;
        }

    };


    /**
     * Easing methods
     */

    var Linear = function (k) {
        return k;
    };

    var QuadraticIn = function (k) {
        return k * k;
    };

    var QuadraticOut = function (k) {
        return k * (2 - k);
    };

    var QuadraticInOut = function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    };

    var CubicIn = function (k) {
        return k * k * k;
    };

    var CubicOut = function (k) {
        return --k * k * k + 1;
    };

    var CubicInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k;
        return 0.5 * ((k -= 2) * k * k + 2);
    };

    var QuarticIn = function (k) {
        return k * k * k * k;
    };

    var QuarticOut = function (k) {
        return 1 - (--k * k * k * k);
    };

    var QuarticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k;
        return -0.5 * ((k -= 2) * k * k * k - 2);
    };

    var QuinticIn = function (k) {
        return k * k * k * k * k;
    };

    var QuinticOut = function (k) {
        return --k * k * k * k * k + 1;
    };

    var QuinticInOut = function (k) {
        if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    };

    var SineIn = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 1 - Math.cos(k * Math.PI / 2);
    };

    var SineOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return Math.sin(k * Math.PI / 2);
    };

    var SineInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 0.5 * (1 - Math.cos(Math.PI * k));
    };

    var ExponentialIn = function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    };

    var ExponentialOut = function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    };

    var ExponentialInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    };

    var CircularIn = function (k) {
        return 1 - Math.sqrt(1 - k * k);
    };

    var CircularOut = function (k) {
        return Math.sqrt(1 - (--k * k));
    };

    var CircularInOut = function (k) {
        if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    };

    var ElasticIn = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    };

    var ElasticOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    };

    var ElasticInOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (!a || a < 1) {
            a = 1; s = p / 4;
        } else s = p * Math.asin(1 / a) / (2 * Math.PI);
        if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    };

    var BackIn = function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    };

    var BackOut = function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    };

    var BackInOut = function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    };

    var BounceOut = function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

    };

    var BounceIn = function (k) {
        return 1 - BounceOut(1 - k);
    };

    var BounceInOut = function (k) {
        if (k < 0.5) return BounceIn(k * 2) * 0.5;
        return BounceOut(k * 2 - 1) * 0.5 + 0.5;
    };

    return {
        TweenManager: TweenManager,
        Tween: Tween,
        Linear: Linear,
        QuadraticIn: QuadraticIn,
        QuadraticOut: QuadraticOut,
        QuadraticInOut: QuadraticInOut,
        CubicIn: CubicIn,
        CubicOut: CubicOut,
        CubicInOut: CubicInOut,
        QuarticIn: QuarticIn,
        QuarticOut: QuarticOut,
        QuarticInOut: QuarticInOut,
        QuinticIn: QuinticIn,
        QuinticOut: QuinticOut,
        QuinticInOut: QuinticInOut,
        SineIn: SineIn,
        SineOut: SineOut,
        SineInOut: SineInOut,
        ExponentialIn: ExponentialIn,
        ExponentialOut: ExponentialOut,
        ExponentialInOut: ExponentialInOut,
        CircularIn: CircularIn,
        CircularOut: CircularOut,
        CircularInOut: CircularInOut,
        BackIn: BackIn,
        BackOut: BackOut,
        BackInOut: BackInOut,
        BounceIn: BounceIn,
        BounceOut: BounceOut,
        BounceInOut: BounceInOut,
        ElasticIn: ElasticIn,
        ElasticOut: ElasticOut,
        ElasticInOut: ElasticInOut
    };
}());

// Expose prototype methods and create a default tween manager on the AppBase
(function () {
    // Add pc.AppBase#addTweenManager method
    pc.AppBase.prototype.addTweenManager = function () {
        this._tweenManager = new pc.TweenManager(this);

        this.on("update", function (dt) {
            this._tweenManager.update(dt);
        });
    };

    pc.AppBase.prototype.stopAllTweens = function (target) {
        for (var i = this._tweenManager._tweens.length - 1; i > -1; i--) {
            if (this._tweenManager._tweens[i].entity === target) {
                this._tweenManager._tweens[i].stop();
            }
        }
    };

    // Add pc.AppBase#tween method
    pc.AppBase.prototype.tween = function (target) {
        return new pc.Tween(target, this._tweenManager);
    };

    // Add pc.Entity#tween method
    pc.Entity.prototype.tween = function (target, options) {
        var tween = this._app.tween(target);
        tween.entity = this;

        this.once('destroy', tween.stop, tween);

        if (options && options.element) {
            // specifiy a element property to be updated
            tween.element = options.element;
        }
        return tween;
    };

    // Create a default tween manager on the AppBase
    var AppBase = pc.AppBase.getApplication();
    if (AppBase) {
        AppBase.addTweenManager();
    }
})();   

// fps.js
// Just add this script to any object in the scene (usually Root) and it will 
// appear in the app as HTML overlay

if (typeof(document) !== "undefined") {
    /*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
    (function(m,j){function s(a,e){for(var g in e)try{a.style[g]=e[g]}catch(j){}return a}function H(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}function R(a,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(a);for(var g=0,j=e.length;g<j;g++)if(e[g]===a)return g;return-1}function I(){var a=arguments,e;for(e in a[1])if(a[1].hasOwnProperty(e))switch(H(a[1][e])){case "object":a[0][e]=
    I({},a[0][e],a[1][e]);break;case "array":a[0][e]=a[1][e].slice(0);break;default:a[0][e]=a[1][e]}return 2<a.length?I.apply(null,[a[0]].concat(Array.prototype.slice.call(a,2))):a[0]}function N(a){a=Math.round(255*a).toString(16);return 1===a.length?"0"+a:a}function S(a,e,g,j){if(a.addEventListener)a[j?"removeEventListener":"addEventListener"](e,g,!1);else if(a.attachEvent)a[j?"detachEvent":"attachEvent"]("on"+e,g)}function D(a,e){function g(a,b,d,c){return y[0|a][Math.round(Math.min((b-d)/(c-d)*J,J))]}
    function r(){f.legend.fps!==q&&(f.legend.fps=q,f.legend[T]=q?"FPS":"ms");K=q?b.fps:b.duration;f.count[T]=999<K?"999+":K.toFixed(99<K?0:d.decimals)}function m(){z=A();L<z-d.threshold&&(b.fps-=b.fps/Math.max(1,60*d.smoothing/d.interval),b.duration=1E3/b.fps);for(c=d.history;c--;)E[c]=0===c?b.fps:E[c-1],F[c]=0===c?b.duration:F[c-1];r();if(d.heat){if(w.length)for(c=w.length;c--;)w[c].el.style[h[w[c].name].heatOn]=q?g(h[w[c].name].heatmap,b.fps,0,d.maxFps):g(h[w[c].name].heatmap,b.duration,d.threshold,
    0);if(f.graph&&h.column.heatOn)for(c=u.length;c--;)u[c].style[h.column.heatOn]=q?g(h.column.heatmap,E[c],0,d.maxFps):g(h.column.heatmap,F[c],d.threshold,0)}if(f.graph)for(p=0;p<d.history;p++)u[p].style.height=(q?E[p]?Math.round(O/d.maxFps*Math.min(E[p],d.maxFps)):0:F[p]?Math.round(O/d.threshold*Math.min(F[p],d.threshold)):0)+"px"}function k(){20>d.interval?(x=M(k),m()):(x=setTimeout(k,d.interval),P=M(m))}function G(a){a=a||window.event;a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=
    !1,a.cancelBubble=!0);b.toggle()}function U(){d.toggleOn&&S(f.container,d.toggleOn,G,1);a.removeChild(f.container)}function V(){f.container&&U();h=D.theme[d.theme];y=h.compiledHeatmaps||[];if(!y.length&&h.heatmaps.length){for(p=0;p<h.heatmaps.length;p++){y[p]=[];for(c=0;c<=J;c++){var b=y[p],e=c,g;g=0.33/J*c;var j=h.heatmaps[p].saturation,m=h.heatmaps[p].lightness,n=void 0,k=void 0,l=void 0,t=l=void 0,v=n=k=void 0,v=void 0,l=0.5>=m?m*(1+j):m+j-m*j;0===l?g="#000":(t=2*m-l,k=(l-t)/l,g*=6,n=Math.floor(g),
    v=g-n,v*=l*k,0===n||6===n?(n=l,k=t+v,l=t):1===n?(n=l-v,k=l,l=t):2===n?(n=t,k=l,l=t+v):3===n?(n=t,k=l-v):4===n?(n=t+v,k=t):(n=l,k=t,l-=v),g="#"+N(n)+N(k)+N(l));b[e]=g}}h.compiledHeatmaps=y}f.container=s(document.createElement("div"),h.container);f.count=f.container.appendChild(s(document.createElement("div"),h.count));f.legend=f.container.appendChild(s(document.createElement("div"),h.legend));f.graph=d.graph?f.container.appendChild(s(document.createElement("div"),h.graph)):0;w.length=0;for(var q in f)f[q]&&
    h[q].heatOn&&w.push({name:q,el:f[q]});u.length=0;if(f.graph){f.graph.style.width=d.history*h.column.width+(d.history-1)*h.column.spacing+"px";for(c=0;c<d.history;c++)u[c]=f.graph.appendChild(s(document.createElement("div"),h.column)),u[c].style.position="absolute",u[c].style.bottom=0,u[c].style.right=c*h.column.width+c*h.column.spacing+"px",u[c].style.width=h.column.width+"px",u[c].style.height="0px"}s(f.container,d);r();a.appendChild(f.container);f.graph&&(O=f.graph.clientHeight);d.toggleOn&&("click"===
    d.toggleOn&&(f.container.style.cursor="pointer"),S(f.container,d.toggleOn,G))}"object"===H(a)&&a.nodeType===j&&(e=a,a=document.body);a||(a=document.body);var b=this,d=I({},D.defaults,e||{}),f={},u=[],h,y,J=100,w=[],W=0,B=d.threshold,Q=0,L=A()-B,z,E=[],F=[],x,P,q="fps"===d.show,O,K,c,p;b.options=d;b.fps=0;b.duration=0;b.isPaused=0;b.tickStart=function(){Q=A()};b.tick=function(){z=A();W=z-L;B+=(W-B)/d.smoothing;b.fps=1E3/B;b.duration=Q<L?B:z-Q;L=z};b.pause=function(){x&&(b.isPaused=1,clearTimeout(x),
    C(x),C(P),x=P=0);return b};b.resume=function(){x||(b.isPaused=0,k());return b};b.set=function(a,c){d[a]=c;q="fps"===d.show;-1!==R(a,X)&&V();-1!==R(a,Y)&&s(f.container,d);return b};b.showDuration=function(){b.set("show","ms");return b};b.showFps=function(){b.set("show","fps");return b};b.toggle=function(){b.set("show",q?"ms":"fps");return b};b.hide=function(){b.pause();f.container.style.display="none";return b};b.show=function(){b.resume();f.container.style.display="block";return b};b.destroy=function(){b.pause();
    U();b.tick=b.tickStart=function(){}};V();k()}var A,r=m.performance;A=r&&(r.now||r.webkitNow)?r[r.now?"now":"webkitNow"].bind(r):function(){return+new Date};for(var C=m.cancelAnimationFrame||m.cancelRequestAnimationFrame,M=m.requestAnimationFrame,r=["moz","webkit","o"],G=0,k=0,Z=r.length;k<Z&&!C;++k)M=(C=m[r[k]+"CancelAnimationFrame"]||m[r[k]+"CancelRequestAnimationFrame"])&&m[r[k]+"RequestAnimationFrame"];C||(M=function(a){var e=A(),g=Math.max(0,16-(e-G));G=e+g;return m.setTimeout(function(){a(e+
    g)},g)},C=function(a){clearTimeout(a)});var T="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I;window.FPSMeter=D;D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var X=["toggleOn","theme","heat","graph","history"],Y="position zIndex left top right bottom margin".split(" ")})(window);(function(m,j){j.theme={};var s=j.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",
    textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};j.theme.dark=j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}});j.theme.light=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.5}],
    container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}});j.theme.colorful=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}});j.theme.transparent=
    j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:0.5}})})(window,FPSMeter);    
}

var Fps = pc.createScript('fps');

Fps.prototype.initialize = function () {
    this.fps = new FPSMeter({heat: true, graph: true});
};

    // Called every frame, dt is time in seconds since last update
Fps.prototype.update = function (dt) {
    this.fps.tick();
};


// gameplayController.js
/* jshint esversion: 6 */
var GameplayController = pc.createScript('gameplayController');

GameplayController.attributes.add('comboFactor', {
    title: "combo factor",
    type: 'number',
    default: 1.02
});


GameplayController.prototype.initialize = function () {

    GameplayController.app = this.app;
    GameplayController.levelActive = false;

    this.app.fire('audio:disable');

    this.initVariables();
    this.injectMeshCollisionSystem();
    this.addListeners();

    this.prepareLevel();
};

GameplayController.prototype.injectMeshCollisionSystem = function () {
    famobi.log("Injecting physics ....");

    this.app.systems.collision.implementations.mesh.createPhysicalShape = function (entity, data) {
        if (typeof Ammo !== 'undefined' && data.model) {
            var model = data.model;
            var shape = new Ammo.btConvexHullShape();

            var i, j;
            for (i = 0; i < model.meshInstances.length; i++) {
                var meshInstance = model.meshInstances[i];
                var mesh = meshInstance.mesh;
                var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
                var vb = mesh.vertexBuffer;

                var format = vb.getFormat();
                var stride = format.size / 4;
                var positions;
                for (j = 0; j < format.elements.length; j++) {
                    var element = format.elements[j];
                    if (element.name === pc.SEMANTIC_POSITION) {
                        positions = new Float32Array(vb.lock(), element.offset);
                    }
                }

                var indices = new Uint16Array(ib.lock());
                var numTriangles = mesh.primitive[0].count / 3;

                var v1 = new Ammo.btVector3();
                var v2 = new Ammo.btVector3();
                var v3 = new Ammo.btVector3();
                var i1, i2, i3;

                var base = mesh.primitive[0].base;
                for (j = 0; j < numTriangles; j++) {
                    i1 = indices[base + j * 3] * stride;
                    i2 = indices[base + j * 3 + 1] * stride;
                    i3 = indices[base + j * 3 + 2] * stride;
                    v1.setValue(positions[i1], positions[i1 + 1], positions[i1 + 2]);
                    v2.setValue(positions[i2], positions[i2 + 1], positions[i2 + 2]);
                    v3.setValue(positions[i3], positions[i3 + 1], positions[i3 + 2]);
                    shape.addPoint(v1, true);
                    shape.addPoint(v2, true);
                    shape.addPoint(v3, true);
                }

                Ammo.destroy(v1);
                Ammo.destroy(v2);
                Ammo.destroy(v3);
            }

            var entityTransform = entity.getWorldTransform();
            var scale = entityTransform.getScale();
            var vec = new Ammo.btVector3();
            vec.setValue(scale.x * (entity.physicalScale || 1), scale.y * (entity.physicalScale || 1), scale.z * (entity.physicalScale || 1));
            shape.setLocalScaling(vec);
            Ammo.destroy(vec);


            return shape;
        }
        return undefined;
    };

    this.app.systems.collision.implementations.mesh.remove = function (entity, data) {
        var app = this.system.app;
        if (entity.rigidbody && entity.rigidbody.body) {
            app.systems.rigidbody.removeBody(entity.rigidbody.body);
            entity.rigidbody.disableSimulation();
        }

        if (data.shape)
            Ammo.destroy(data.shape);


        if (entity.trigger) {
            entity.trigger.destroy();
            delete entity.trigger;
        }
    }

    this.app.systems.collision.implementations.mesh.destroyShape = function (data) {
        if (!data.shape)
            return;

        if (data.shape.getNumChildShapes) {
            const numShapes = data.shape.getNumChildShapes();
            for (let i = 0; i < numShapes; i++) {
                const shape = data.shape.getChildShape(i);
                Ammo.destroy(shape);
            }
        }

        Ammo.destroy(data.shape);
        data.shape = null;
    };

};

GameplayController.prototype.addListeners = function () {
    this.app.on("touch:start", this.handleTouch, this);
    this.app.on("gameplay:start", this.startLevel, this);
    this.app.on("gameplay:exit", this.exitLevel, this);
    this.app.on("level:progress", this.updateLevelProgress, this);
    this.app.on("item:destroy", this.handleItemDestroyed, this);
    this.app.on("ball:launch", this.handleBallLaunched, this);
    this.app.on("colorball:launch", this.handleColorballLaunched, this);
    this.app.on("cannon:launch", this.handleCannonballLaunched, this);
    this.on("destroy", this.destroy, this);
};


GameplayController.prototype.update = function (dt) {
    if (!GameplayController.currentSession) {
        return;
    }

    GameplayController.currentSession.earthquakeTimer -= dt;
    GameplayController.currentSession.screenShakingTimer -= dt;

    const currentTimestamp = new Date().getTime();
    if (GameplayController.currentSession.comboCounter > 0 && currentTimestamp - GameplayController.currentSession.lastItemTimestamp > GameplayController.comboMaxCooldown) {
        this.terminateCombo();
    }


    /* forced mode defeat check */
    if (isForcedMode() && GameplayController.currentSession.gameplayActive && GameplayController.currentSession.started && !GameplayController.currentSession.defeatTimerActive && !GameplayController.currentSession.resultsTimerActive && this.checkDefeat()) {
        GameplayController.currentSession.defeatTimerActive = true;
        GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
    }

    if (GameplayController.currentSession.started && GameplayController.currentSession.resultsTimerActive && !WindowManager.hasOpenedWindows()) {
        GameplayController.currentSession.resultsTimer -= dt;
        if (GameplayController.currentSession.resultsTimer <= 0) {
            GameplayController.currentSession.resultsTimer = 0;
            GameplayController.currentSession.resultsTimerActive = false;
            GameplayController.currentSession.gameplayActive = false;
            GameplayController.justPassedLevel = GameplayController.currentLevel;
            GameplayController.currentLevel += 1;

            if (isForcedMode() && getForcedModeProperties().state.level === -1) {
                console.warn('Endless mode is on, starting a next level...');
                TransitionScreen.instance.transitionTo(() => {
                    this.app.fire("tower:next");
                    this.app.fire("gameplay:start");
                });
            } else {
                this.app.fire("app:save");
                if (isForcedMode()) {
                    this.app.timeScale = 0;
                    famobi.log("Level is finished in forced mode");
                    Promise.all([
                        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                            eventName: "LEVELEND",
                            result: "success"
                        }),
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELSUCCESS",
                            {
                                levelName: '' + GameplayController.justPassedLevel || GameplayController.currentLevel
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_TOTALSCORE",
                            {
                                totalScore: GameplayController.sessionScores
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELSCORE",
                            {
                                levelName: '' + (GameplayController.justPassedLevel || GameplayController.currentLevel),
                                levelScore: GameplayController.sessionScores
                            }
                        )
                    ]).then(() => famobi.log("Level completed events are sent in forced mode"));
                } else {
                    WindowManager.showResults();
                }

                window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                    eventName: "GA:Progression",
                    progressionStatus: "Complete",
                    progression01: "Level" + GameplayController.currentLevel
                });
            }


        }
    }

    else if (GameplayController.currentSession.started && GameplayController.currentSession.ballsLeft === 0 && GameplayController.currentSession.defeatTimerActive && !HierarchyManager.getInstance().getByPath("Camera/ActiveBall")?.script.ballController?.preparedBall && !WindowManager.hasOpenedWindows()) {
        GameplayController.currentSession.defeatTimer -= dt;
        if (GameplayController.currentSession.defeatTimer <= 0) {
            if (!GameplayController.currentSession.reviveAppeared && Apicontroller.hasRewardedVideo()) {
                GameplayController.currentSession.defeatTimer = 0.2;
                GameplayController.currentSession.reviveAppeared = true;
                WindowManager.showRevive();
            } else {
                GameplayController.currentSession.defeatTimer = 0;
                GameplayController.currentSession.defeatTimerActive = false;
                GameplayController.currentSession.gameplayActive = false;
                if (isForcedMode()) {
                    this.app.timeScale = 0;
                    famobi.log("Level is lost in forced mode");
                    Promise.all([
                        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                            eventName: "LEVELEND",
                            result: "fail"
                        }),
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELFAIL",
                            {
                                levelName: '' + GameplayController.currentLevel,
                                reason: 'dead'
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_TOTALSCORE",
                            {
                                totalScore: GameplayController.sessionScores
                            }
                        ),
                        window.famobi_analytics.trackEvent(
                            "EVENT_LEVELSCORE",
                            {
                                levelName: '' + GameplayController.currentLevel,
                                levelScore: GameplayController.sessionScores
                            }
                        )
                    ]).then(() => famobi.log("Level failed events are sent in forced mode"));
                } else {
                    WindowManager.showDefeat();
                }


                window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                    eventName: "GA:Progression",
                    progressionStatus: "Fail",
                    progression01: "Level" + GameplayController.currentLevel
                });
            }
        }
    }
};

GameplayController.prototype.restartSession = function () {
    const unlimitedBalls = isForcedMode() && getForcedModeProperties().override.shots === -1;
    const keepNumBalls = isEndlessMode() && GameplayController.currentSession;
    const numBalls = (isForcedMode() && getForcedModeProperties().override.shots >= 0) ? keepNumBalls ? GameplayController.currentSession.ballsLeft : getForcedModeProperties().override.shots : 100;
    const cannonBallSpecialModelCharges = (isForcedMode() && getForcedModeProperties().override.cannonball_enabled && getForcedModeProperties().override.cannonball_special_mode_charges >= 0) ? getForcedModeProperties().override.cannonball_special_mode_charges : 0;

    GameplayController.currentSession = {
        score: GameplayController.sessionScores,
        ballsLeft: numBalls,
        unlimitedBalls: unlimitedBalls,
        totalBalls: numBalls,
        resultsTimer: 0,
        resultsTimerActive: false,
        defeatTimer: 0,
        defeatTimerActive: false,
        reviveAppeared: false,
        reviveUsed: false,
        destroyedItems: 0,
        comboCounter: 0,
        currentBallHitTimestamp: 0,
        currentBallDestroydItems: 0,
        smileShown: false,
        comboBarVolume: 200,
        comboBarVolumeLevel: 0,
        lastItemTimestamp: 0,
        cannonBallProgress: 0,
        cannonBallAvailable: false,
        colorBallAvailable: false,
        earthquakeTimer: 0,
        screenShakingTimer: 0,
        gameplayActive: false,
        started: false,
        liftProgress: 0,
        progress: 0,
        finished: false,
        lastBallColor: -1,
        usedPowerups: [],
        destructionCause: 'ball',
        cannonballSpecialModeCharges: cannonBallSpecialModelCharges
    };

    GameplayController.lastLevelScores = 0;
    GameplayController.lastLevelCoins = 0;
};


GameplayController.prototype.initVariables = function () {

    //State variables
    GameplayController.currentLevel = 1;
    GameplayController.coins = 0;
    GameplayController.maxScores = 0;
    GameplayController.sessionScores = 0;
    GameplayController.lastLevelScores = 0;
    GameplayController.lastLevelCoins = 0;
    GameplayController.justPassedLevel = undefined;

    //Limited offer
    GameplayController.limitedOfferLastTimestamp = 0;
    GameplayController.limitedOfferCooldown = 0.5 * 3600; //seconds
    GameplayController.limitedOfferRewardAmount = 250;

    //Screen
    GameplayController.mobileLandscapeMode = false;
    GameplayController.screenRatioMin = 9 / 16;
    GameplayController.screenRatioMax = 16 / 16;

    GameplayController.waitBeforeDefeat = 5.0;

    //Effects
    GameplayController.screenShakeDurationAfterHit = 0.25;
    GameplayController.enableVibration = false;

    //Camera
    GameplayController.minCameraHeight = 13.25;
    GameplayController.minCameraHeightMobileLandscape = 10.5;
    GameplayController.cameraLiftSpeedY = 15;
    GameplayController.cameraLiftTweenDuration = 3.0;
    GameplayController.cameraDeltaY = 4.5;
    GameplayController.cameraDeltaYMobileLandscape = 7.5;

    //Gameplay camera
    GameplayController.cameraToTowerMinDistance = 35;
    GameplayController.cameraToTowerMaxDistance = 55;
    GameplayController.cameraToTowerMobileLandscapeDistance = 40;

    //combo
    GameplayController.comboFactor = this.comboFactor || 1.02;
    GameplayController.comboBarLevelMultiplier = 1.1;
    GameplayController.baseItemScore = 5;
    GameplayController.comboItemScoreStep = 1;
    GameplayController.comboMaxCooldown = 1600;
    GameplayController.lastDestroyedColor = 0;

    //Powerups
    GameplayController.powerupMultiballPrice = 25;
    GameplayController.powerupEarthquakePrice = 50;
    GameplayController.powerupMultiballPurchased = false;
    GameplayController.powerupEarthquakePurchased = false;
    GameplayController.numColorBalls = 12;

    //Tower
    GameplayController.towerStandElevation = 3;
    GameplayController.towerStandDiameter = 10;
    GameplayController.availableTowerHeight = 8;
    GameplayController.ballRadius = 0.66;
    GameplayController.itemLifeTime = 15; //seconds
    GameplayController.itemDrownTime = 10; //seconds
    GameplayController.itemFallingTime = 5;

    GameplayController.particleCacheSize = 200;
    GameplayController.particlesPerObject = 11;

    GameplayController.CCDMotionThreshold = 0.1;
    GameplayController.CCDSweptSphereRadius = 0.01;

    GameplayController.autoDestroyTarget = true;
    GameplayController.ballLifeTime = 3;
    GameplayController.ballAutoDestroyDistanceThreshold = 5;
    GameplayController.ballAutoDestroyDelay = 0.03; // value in seconds, for low-performance devices which have problems with collision detection

    GameplayController.chainExplosionDelay = 50;
    GameplayController.triggerLifeTime = 1.0; //seconds

    //cannon ball
    GameplayController.cannonBallAutoDestroyTime = 2; //seconds
    GameplayController.colorBallBreakingDistance = 0.2;

    LocalStorageController.loadData();

};

GameplayController.prototype.terminateCombo = function () {
    if ((GameplayController.currentSession.comboCounter + 1) >= 10) {
        var numCoins = Math.floor((GameplayController.currentSession.comboCounter + 1) / 10);
        GameplayController.addCoins(numCoins);
        GameplayController.app.fire("coins:added", numCoins, this.app.root.findByName("EffectsContainer").findByName("ComboEffect").findByName("ComboEffect").element.anchor.clone());
    }
    GameplayController.currentSession.comboCounter = 0;
    GameplayController.currentSession.lastItemTimestamp = 0;
    GameplayController.currentSession.smileShown = false;
    GameplayController.currentSession.currentBallDestroydItems = 0;
    GameplayController.currentSession.currentBallHitTimestamp = 0;
};

GameplayController.addCoins = function (value) {
    GameplayController.coins += value;
    GameplayController.lastLevelCoins += value;
    GameplayController.app.fire("coins:updated", GameplayController.coins);
};

GameplayController.setCoins = function (value) {
    GameplayController.coins = value;
    GameplayController.app.fire("coins:updated", GameplayController.coins);
};

GameplayController.prototype.handleItemDestroyed = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession || !GameplayController.currentSession.gameplayActive) {
        return;
    }

    GameplayController.currentSession.destroyedItems += 1;
    GameplayController.currentSession.currentBallDestroydItems += 1;
    GameplayController.currentSession.currentBallHitTimestamp = GameplayController.currentSession.currentBallHitTimestamp || new Date().getTime();

    const currentTimestamp = new Date().getTime();
    if (currentTimestamp - GameplayController.currentSession.lastItemTimestamp <= GameplayController.comboMaxCooldown) {
        GameplayController.currentSession.comboCounter += 1;

        if (!GameplayController.currentSession.smileShown) {
            const averageDestroyingDelay = (currentTimestamp - GameplayController.currentSession.currentBallHitTimestamp) / GameplayController.currentSession.currentBallDestroydItems;
            if (GameplayController.currentSession.comboCounter >= 20) {
                if (Math.random() < 0.075 + 0.01 * (GameplayController.currentSession.comboCounter - 20)) {
                    GameplayController.currentSession.smileShown = true;
                    this.app.fire("smile:cool");
                }
            } else if (GameplayController.currentSession.currentBallDestroydItems >= 15 && averageDestroyingDelay < 75 && Math.random() < 0.1) {
                GameplayController.currentSession.smileShown = true;
                this.app.fire("smile:surprised");
            } else if (GameplayController.currentSession.currentBallDestroydItems >= 10 && averageDestroyingDelay < 20 && Math.random() < 0.33) {
                GameplayController.currentSession.smileShown = true;
                this.app.fire("smile:scared");
            }
        }

        this.app.fire("combo:show", GameplayController.currentSession.comboCounter + 1);
        Apicontroller.trackStats("combo_achieved", { "combo": GameplayController.currentSession.comboCounter + 1 });
    } else {
        this.terminateCombo();
    }

    GameplayController.currentSession.lastItemTimestamp = currentTimestamp;

    const scores = GameplayController.baseItemScore + (GameplayController.currentSession.comboCounter) * GameplayController.comboItemScoreStep;

    GameplayController.currentSession.score += scores;
    GameplayController.sessionScores = GameplayController.currentSession.score;
    GameplayController.lastLevelScores += scores;
    GameplayController.maxScores = Math.max(GameplayController.maxScores, GameplayController.currentSession.score);

    this.app.fire("ball:verifyColor");
    this.app.fire("score:updated", GameplayController.currentSession.score);

    Apicontroller.reportLiveScore(GameplayController.currentSession.score);


    /* cannonball progress */
    const cannonballAllowed = !isForcedMode() || getForcedModeProperties().override.cannonball_enabled;
    if (cannonballAllowed && GameplayController.currentSession.cannonBallProgress < 1 && GameplayController.currentSession.comboCounter > 0) {
        const flyingCannonBall = HierarchyManager.getInstance().getByPath("TrashContainer")?.findByName("CannonBall");
        if (!flyingCannonBall) {
            const currentComboReward = Math.pow(GameplayController.comboFactor, GameplayController.currentSession.comboCounter);
            GameplayController.currentSession.cannonBallProgress = pc.math.clamp(GameplayController.currentSession.cannonBallProgress + currentComboReward / (GameplayController.currentSession.comboBarVolume * Math.pow(GameplayController.comboBarLevelMultiplier, GameplayController.currentSession.comboBarVolumeLevel)), 0, 1);
            this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
            if (GameplayController.currentSession.cannonBallProgress === 1 && !GameplayController.currentSession.cannonBallAvailable) {
                GameplayController.currentSession.cannonBallAvailable = true;
                GameplayController.currentSession.comboBarVolumeLevel += 1;
                this.app.fire("audio:play", "powerUpBarLoaded");
                this.app.fire("cannon:create");
            }
        }
    }
};

GameplayController.prototype.updateLevelProgress = function (progress) {
    if (!GameplayController.levelActive || !GameplayController.currentSession || !GameplayController.currentSession.gameplayActive) {
        return;
    }

    GameplayController.currentSession.progress = progress;
    if (progress === 1) {
        GameplayController.currentSession.finished = true;
        GameplayController.currentSession.gameplayActive = false;
        GameplayController.currentSession.resultsTimerActive = true;
        GameplayController.currentSession.resultsTimer = 2;
        this.app.fire("tower:destroyed");
        Apicontroller.trackStats("tower_destroyed");
    }
};

GameplayController.prototype.handleTouch = function (e) {
    if (this.app.applicationPaused || WindowManager.hasOpenedWindows() || !GameplayController.levelActive || !GameplayController.currentSession || GameplayController.currentSession.finished || !GameplayController.currentSession.gameplayActive || !GameplayController.currentSession.started) {
        return;
    }

    const triggerController = HierarchyManager.getInstance().getByPath("Triggers").script.triggersController;
    const camera = HierarchyManager.getInstance().getByPath("Camera");
    var from = camera.camera.screenToWorld(e.x, e.y, camera.camera.nearClip);
    var to = camera.camera.screenToWorld(e.x, e.y, camera.camera.farClip);

    triggerController.disableTriggers();
    var result = this.app.systems.rigidbody.raycastFirst(from, to);
    triggerController.enableTriggers();

    if (result && result.entity && result.entity.parent && result.entity.parent.name === "Tower" && result.entity.active && TutorialScreen.shootingEnabled(result.entity)) {
        const ballController = HierarchyManager.getInstance().getByPath("Camera/ActiveBall").script.ballController;
        var targetPoint = result.point.clone().add(result.normal.scale(GameplayController.ballRadius * 0.95));
        ballController.shoot(result.entity, targetPoint); //result.point
    }
};


GameplayController.prototype.checkDefeat = function () {
    if (GameplayController.levelActive && GameplayController.currentSession) {
        const hasBalls = GameplayController.currentSession.unlimitedBalls || GameplayController.currentSession.ballsLeft > 0;
        const hasPowerups = GameplayController.powerupEarthquakePurchased || GameplayController.powerupMultiballPurchased;
        const hasActiveBall = !!BallController.ball;
        return !hasBalls && !hasPowerups && !hasActiveBall;
    }
    return false;
};

GameplayController.prototype.handleBallLaunched = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    if (!GameplayController.currentSession.unlimitedBalls) {
        GameplayController.currentSession.ballsLeft -= 1;
        if (GameplayController.currentSession.ballsLeft <= 0) {
            GameplayController.currentSession.ballsLeft = 0;
            if (!isForcedMode() || this.checkDefeat()) {
                GameplayController.currentSession.defeatTimerActive = true;
                GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
            }
        }
    } else {
        GameplayController.currentSession.ballsLeft = 0;
    }

    this.terminateCombo();
    this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
};

GameplayController.prototype.handleColorballLaunched = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    this.terminateCombo();
    GameplayController.currentSession.colorBallAvailable = false;
    GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
};

GameplayController.prototype.handleCannonballLaunched = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    this.terminateCombo();
    GameplayController.currentSession.defeatTimer = GameplayController.waitBeforeDefeat;
    GameplayController.currentSession.cannonBallProgress = 0;
    GameplayController.currentSession.cannonBallAvailable = false;
    GameplayController.currentSession.usedPowerups.push('Cannonball');
    this.app.fire("cannon:progress", GameplayController.currentSession.cannonBallProgress);
};

GameplayController.prototype.prepareLevel = function () {
    famobi.log("Preparing level...");

    GameplayController.levelActive = true;

    this.restartSession();

    this.app.fire("level:clear");
    this.app.fire("level:buildTower");
    this.app.fire("score:updated", GameplayController.currentSession.score);
    this.app.fire("coins:updated", GameplayController.coins);

    this.app.fire("camera:reset");
};

GameplayController.prototype.startLevel = function (keepExistingTower, trackRestart) {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Progression",
        progressionStatus: "Start",
        progression01: "Level" + GameplayController.currentLevel
    });

    window.famobi_analytics.trackEvent(trackRestart ? "EVENT_LEVELRESTART" : "EVENT_LEVELSTART", { levelName: '' + GameplayController.currentLevel });

    GameplayController.levelActive = true;
    GameplayController.justPassedLevel = undefined;

    WindowManager.gameplayUI.hide();
    WindowManager.gameplayUI.show();

    if (!keepExistingTower || isForcedMode()) {
        this.restartSession();
        this.app.fire("level:clear");
        this.app.fire("level:buildTower");
        this.app.fire("score:updated", GameplayController.currentSession.score);
        this.app.fire("coins:updated", GameplayController.coins);
        famobi.log("Starting session...");
    } else {
        this.app.fire("coins:updated", GameplayController.coins);
        famobi.log("Keeping existing tower...");
    }

    //Camera movement params   
    this.app.fire("camera:reset");
    if (this.entity.liftTween && this.entity.liftTween.playing) {
        this.entity.liftTween.stop();
    }

    this.entity.liftTween = this.entity.tween(GameplayController.currentSession)
        .to({ liftProgress: 1 }, GameplayController.cameraLiftTweenDuration, pc.SineInOut)
        .onComplete(() => {
            this.app.fire("level:createBall");
            this.app.fire("powerup:enableButtons");
            window.famobi.playerReady();
            GameplayController.currentSession.started = true;
            GameplayController.currentSession.gameplayActive = true;
        })
        .start();

    this.app.fire('famobi:requestResizeEvent');
};

GameplayController.prototype.exitLevel = function () {
    GameplayController.levelActive = false;
    if (GameplayController.lastLevelScores > 0) {
        GameplayController.sessionScores = pc.math.clamp(GameplayController.sessionScores - GameplayController.lastLevelScores, 0, GameplayController.sessionScores);
    }
    this.restartSession();
    this.app.fire("level:exit");
    this.app.fire("camera:exit");
    this.app.fire("level:buildTower");
};

GameplayController.prototype.restartLevel = function () {
    famobi.log("Restarting current level...");
    var transitionScreen = this.app.root.findByName("TransitionScreen");
    transitionScreen.transitionTo(() => this.app.fire("level:restart"));
};

GameplayController.prototype.destroy = function () {
    this.app.off("touch:start", this.handleTouch, this);
};


// orbitCamera.js
/* jshint esversion: 6 */
var OrbitCamera = pc.createScript('orbitCamera');

OrbitCamera.attributes.add('distanceMax', { type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit' });
OrbitCamera.attributes.add('distanceMin', { type: 'number', default: 0, title: 'Distance Min' });
OrbitCamera.attributes.add('pitchAngleMax', { type: 'number', default: 90, title: 'Pitch Angle Max (degrees)' });
OrbitCamera.attributes.add('pitchAngleMin', { type: 'number', default: -90, title: 'Pitch Angle Min (degrees)' });

OrbitCamera.attributes.add('inertiaFactor', {
    type: 'number',
    default: 0,
    title: 'Inertia Factor',
    description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
});

OrbitCamera.attributes.add('focusEntity', {
    type: 'entity',
    title: 'Focus Entity',
    description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
});

OrbitCamera.attributes.add('frameOnStart', {
    type: 'boolean',
    default: true,
    title: 'Frame on Start',
    description: 'Frames the entity or scene at the start of the application."'
});

OrbitCamera.attributes.add('flyAroundOnStart', {
    type: 'boolean',
    default: true,
});


// Property to get and set the distance between the pivot point and camera
// Clamped between this.distanceMin and this.distanceMax
Object.defineProperty(OrbitCamera.prototype, "distance", {
    get: function () {
        return this._targetDistance;
    },

    set: function (value) {
        this._targetDistance = this._clampDistance(value);
    }
});


// Property to get and set the pitch of the camera around the pivot point (degrees)
// Clamped between this.pitchAngleMin and this.pitchAngleMax
// When set at 0, the camera angle is flat, looking along the horizon
Object.defineProperty(OrbitCamera.prototype, "pitch", {
    get: function () {
        return this._targetPitch;
    },

    set: function (value) {
        this._targetPitch = this._clampPitchAngle(value);
    }
});


// Property to get and set the yaw of the camera around the pivot point (degrees)
Object.defineProperty(OrbitCamera.prototype, "yaw", {
    get: function () {
        return this._targetYaw;
    },

    set: function (value) {
        this._targetYaw = value;

        // Ensure that the yaw takes the shortest route by making sure that 
        // the difference between the targetYaw and the actual is 180 degrees
        // in either direction
        var diff = this._targetYaw - this._yaw;
        var reminder = diff % 360;
        if (reminder > 180) {
            this._targetYaw = this._yaw - (360 - reminder);
        } else if (reminder < -180) {
            this._targetYaw = this._yaw + (360 + reminder);
        } else {
            this._targetYaw = this._yaw + reminder;
        }
    }
});


// Property to get and set the world position of the pivot point that the camera orbits around
Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
    get: function () {
        return this._pivotPoint;
    },

    set: function (value) {
        this._pivotPoint.copy(value);
    }
});


// Moves the camera to look at an entity and all its children so they are all in the view
OrbitCamera.prototype.focus = function (focusEntity) {

    // Calculate an bounding box that encompasses all the models to frame in the camera view
    this._buildAabb(focusEntity, 0);

    var halfExtents = this._modelsAabb.halfExtents;

    var distance = Math.max(halfExtents.x, Math.max(halfExtents.y, halfExtents.z));
    distance = (distance / Math.tan(0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD));
    distance = (distance * 2);

    this.distance = distance;

    this._removeInertia();

    this._pivotPoint.copy(this._modelsAabb.center);
};


OrbitCamera.distanceBetween = new pc.Vec3();

// Set the camera position to a world position and look at a world position
// Useful if you have multiple viewing angles to swap between in a scene
OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
    this.pivotPoint.copy(lookAtPoint);
    this.entity.setPosition(resetPoint);

    this.entity.lookAt(lookAtPoint);

    var distance = OrbitCamera.distanceBetween;
    distance.sub2(lookAtPoint, resetPoint);
    this.distance = distance.length();

    this.pivotPoint.copy(lookAtPoint);

    var cameraQuat = this.entity.getRotation();
    this.yaw = this._calcYaw(cameraQuat);
    this.pitch = this._calcPitch(cameraQuat, this.yaw);

    this._removeInertia();
    this._updatePosition();
};


// Set camera position to a world position and look at an entity in the scene
// Useful if you have multiple models to swap between in a scene
OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
    this._buildAabb(entity, 0);
    this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
};


// Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
    this.pitch = pitch;
    this.yaw = yaw;
    this.distance = distance;

    this._removeInertia();
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Private methods

OrbitCamera.prototype.initialize = function () {
    var self = this;
    var onWindowResize = function () {
        self._checkAspectRatio();
    };

    this.app.on("viewport:resize", this._checkAspectRatio, this);

    this._checkAspectRatio();

    // Find all the models in the scene that are under the focused entity
    this._modelsAabb = new pc.BoundingBox();
    this._buildAabb(this.focusEntity || this.app.root, 0);

    this.entity.lookAt(this._modelsAabb.center);

    this._pivotPoint = new pc.Vec3();
    this._pivotPoint.copy(this._modelsAabb.center);

    var cameraQuat = this.entity.getRotation();

    this._yaw = this._calcYaw(cameraQuat);
    this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    this._distance = 0;

    this._targetYaw = this._yaw;
    this._targetPitch = this._pitch;

    if (this.frameOnStart) {
        this.focus(this.focusEntity || this.app.root);
    } else {
        var distanceBetween = new pc.Vec3();
        distanceBetween.sub2(this.entity.getPosition(), this._pivotPoint);
        this._distance = this._clampDistance(distanceBetween.length());
    }

    this._targetDistance = this._distance;

    this.on('attr:distanceMin', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    });

    this.on('attr:distanceMax', function (value, prev) {
        this._targetDistance = this._clampDistance(this._distance);
    });

    this.on('attr:pitchAngleMin', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    });

    this.on('attr:pitchAngleMax', function (value, prev) {
        this._targetPitch = this._clampPitchAngle(this._pitch);
    });

    this.on('attr:focusEntity', function (value, prev) {
        if (this.frameOnStart) {
            this.focus(value || this.app.root);
        } else {
            this.resetAndLookAtEntity(this.entity.getPosition(), value || this.app.root);
        }
    });

    this.on('attr:frameOnStart', function (value, prev) {
        if (value) {
            this.focus(this.focusEntity || this.app.root);
        }
    });

    this.on('destroy', function () {
        this.app.off("viewport:resize", this._checkAspectRatio, this);
    });

    this.app.on("camera:reset", this.resetLevelCamera, this);
    this.app.on("camera:exit", this.startMenuCamera, this);
};


OrbitCamera.prototype.update = function (dt) {

    if (!GameplayController.currentSession) {
        famobi.log("Camera disabled: current session isn't started");
        return;
    }

    if (!GameplayController.currentSession.started) {
        this._yaw = this._targetYaw = this.yaw = - 360 + GameplayController.currentSession.liftProgress * 540;
        this._pitch = this._targetPitch = -4;
        this._updateCameraScale();
        this._distance = this._targetDistance = this.distance;

        this._updatePosition();
        this._updateLiftAltitude();

    } else {
        this._pitch = this._targetPitch = -4;
        this.regularUpdate(dt);
        this._updateAltitude();
        this._updateCameraScale();
        this._updateCameraShaking();
    }

    this._checkAspectRatio();
};

OrbitCamera.prototype.regularUpdate = function (dt) {
    var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
    this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
    this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
    this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

    this._updatePosition();
};

OrbitCamera.prototype._updatePosition = function () {
    // Work out the camera position based on the pivot point, pitch, yaw and distance
    this.entity.setLocalPosition(0, 0, 0);
    this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

    var position = this.entity.getPosition();
    position.copy(this.entity.forward);
    position.scale(-this._distance);
    position.add(this.pivotPoint);

    this.entity.setPosition(position);
};

OrbitCamera.prototype._updateAltitude = function () {

    var tower = HierarchyManager.getInstance().getByPath("Tower");
    var towerHeight = Math.ceil(tower.currentHeight / tower.itemHeight) * tower.itemHeight;
    var targetPosition = Math.max(towerHeight - this.getCameraDeltaY(), this.getMinCameraHeight());
    var position = this.entity.getPosition();
    var yPosition = position.y;

    this.lastY = this.lastY || targetPosition;

    if (targetPosition < this.lastY && Math.abs(this.lastY - targetPosition) > 0.1) {
        this.lastY = this.lastY + (targetPosition - this.lastY) * 1 / 15;
    }

    position.y = this.lastY;
    this.entity.setPosition(position);
};


OrbitCamera.prototype._updateLiftAltitude = function () {
    var pos = this.entity.getPosition();
    var tower = HierarchyManager.getInstance().getByPath("Tower");
    var towerHeight = Math.ceil(tower.currentHeight / tower.itemHeight) * tower.itemHeight;
    var targetPosition = Math.max(towerHeight - this.getCameraDeltaY(), this.getMinCameraHeight());
    pos.y = this.getMinCameraHeight() + (towerHeight - this.getCameraDeltaY() - this.getMinCameraHeight()) * GameplayController.currentSession.liftProgress;
    pos.y = pc.math.clamp(pos.y, this.getMinCameraHeight(), towerHeight - this.getCameraDeltaY());
    this.entity.setPosition(pos);
};

OrbitCamera.prototype._updateMenuAltitude = function () {
    var pos = this.entity.getPosition();
    var tower = HierarchyManager.getInstance().getByPath("Tower");
    var towerHeight = Math.ceil(tower.currentHeight / tower.itemHeight) * tower.itemHeight;
    var targetPosition = Math.max(towerHeight - this.getCameraDeltaY(), this.getMinCameraHeight());
    pos.y = this.getMinCameraHeight() + (towerHeight - this.getCameraDeltaY() - this.getMinCameraHeight()) * 0.0;
    pos.y = pc.math.clamp(pos.y, this.getMinCameraHeight(), towerHeight - this.getCameraDeltaY());
    this.entity.setPosition(pos);
};

OrbitCamera.prototype.getCameraDeltaY = function () {
    return GameplayController.mobileLandscapeMode ? GameplayController.cameraDeltaYMobileLandscape : GameplayController.cameraDeltaY;
};

OrbitCamera.prototype.getMinCameraHeight = function () {
    return GameplayController.mobileLandscapeMode ? GameplayController.minCameraHeightMobileLandscape : GameplayController.minCameraHeight;
};

OrbitCamera.prototype._updateCameraScale = function () {
    var screenRatio = this.app.graphicsDevice.canvas.width / this.app.graphicsDevice.canvas.height;

    GameplayController.mobileLandscapeMode = false;

    if (screenRatio < GameplayController.screenRatioMin) {
        this.distance = GameplayController.cameraToTowerMinDistance;
    } else if (screenRatio > GameplayController.screenRatioMax) {
        if (pc.platform.mobile) {
            GameplayController.mobileLandscapeMode = true;
            this.distance = GameplayController.cameraToTowerMobileLandscapeDistance;
        } else {
            this.distance = GameplayController.cameraToTowerMaxDistance;
        }
    } else {
        this.distance = GameplayController.cameraToTowerMinDistance + (screenRatio - GameplayController.screenRatioMin) / (GameplayController.screenRatioMax - GameplayController.screenRatioMin) * (GameplayController.cameraToTowerMaxDistance - GameplayController.cameraToTowerMinDistance);
    }
};


OrbitCamera.prototype._updateCameraShaking = function () {
    if (GameplayController.currentSession) {
        if (GameplayController.currentSession.earthquakeTimer > 0) {
            this.earthquakeTimer = (this.earthquakeTimer || 1) + 1;

            if (this.earthquakeTimer % 2 === 0) {
                var pos = this.entity.getPosition();
                pos.y += pc.math.random(-0.35, 0.35);
                pos.x += pc.math.random(-0.35, 0.35);
                pos.z += pc.math.random(-0.35, 0.35);
                this.entity.setPosition(pos);
            }
        } else if (GameplayController.currentSession.screenShakingTimer > 0) {
            this.screenShakeTimer = (this.screenShakeTimer || 1) + 1;
            var cameraPos = this.entity.getPosition();
            cameraPos.y += pc.math.random(-0.12, 0.12);
            cameraPos.x += pc.math.random(-0.1, 0.1);
            cameraPos.z += pc.math.random(-0.1, 0.1);
            this.entity.setPosition(cameraPos);
        }
    }
};

OrbitCamera.prototype.resetLevelCamera = function () {
    this._updateCameraScale();
    this.entity.setPosition(0, this.getMinCameraHeight(), this.distance);
    this.lastY = 0;
};

OrbitCamera.prototype.startMenuCamera = function () {

};


OrbitCamera.prototype._removeInertia = function () {
    this._yaw = this._targetYaw;
    this._pitch = this._targetPitch;
    this._distance = this._targetDistance;
};


OrbitCamera.prototype._checkAspectRatio = function () {
    var height = this.app.graphicsDevice.height;
    var width = this.app.graphicsDevice.width;

    var enabledHorizontalFov = height > width;
    if (this.entity.camera.horizontalFov != enabledHorizontalFov) {
        this.entity.camera.horizontalFov = enabledHorizontalFov;
    }
};


OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
    var i = 0;

    if (entity.model) {
        var mi = entity.model.meshInstances;
        if (!mi) {
            console.warn("No meshInstances found for entity '" + entity.name + "'");
        }
        for (i = 0; i < mi.length; i++) {
            if (modelsAdded === 0) {
                this._modelsAabb.copy(mi[i].aabb);
            } else {
                this._modelsAabb.add(mi[i].aabb);
            }

            modelsAdded += 1;
        }
    }

    for (i = 0; i < entity.children.length; ++i) {
        modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
    }

    return modelsAdded;
};


OrbitCamera.prototype._calcYaw = function (quat) {
    var transformedForward = new pc.Vec3();
    quat.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
};


OrbitCamera.prototype._clampDistance = function (distance) {
    if (this.distanceMax > 0) {
        return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
    } else {
        return Math.max(distance, this.distanceMin);
    }
};


OrbitCamera.prototype._clampPitchAngle = function (pitch) {
    // Negative due as the pitch is inversed since the camera is orbiting the entity
    return pc.math.clamp(pitch, -this.pitchAngleMax, -this.pitchAngleMin);
};


OrbitCamera.quatWithoutYaw = new pc.Quat();
OrbitCamera.yawOffset = new pc.Quat();

OrbitCamera.prototype._calcPitch = function (quat, yaw) {
    var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
    var yawOffset = OrbitCamera.yawOffset;

    yawOffset.setFromEulerAngles(0, -yaw, 0);
    quatWithoutYaw.mul2(yawOffset, quat);

    var transformedForward = new pc.Vec3();

    quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

    return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
};

// mouseCamera.js
var MouseCamera = pc.createScript('MouseCamera');

MouseCamera.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.3, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

MouseCamera.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.15, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});

// initialize code called once per entity
MouseCamera.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
        
    if (this.orbitCamera) {
        var self = this;
        
        var onMouseOut = function (e) {
           self.onMouseOut(e);
        };
        
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

        // Listen to when the mouse travels out of the window
        window.addEventListener('mouseout', onMouseOut, false);
        
        // Remove the listeners so if this entity is destroyed
        this.on('destroy', function() {
            this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
            this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
            this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

            window.removeEventListener('mouseout', onMouseOut, false);
        });
    }
    
    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    this.app.mouse.disableContextMenu();
  
    this.lookButtonDown = false;
    this.panButtonDown = false;
    this.lastPoint = new pc.Vec2();
};


MouseCamera.fromWorldPoint = new pc.Vec3();
MouseCamera.toWorldPoint = new pc.Vec3();
MouseCamera.worldDiff = new pc.Vec3();


MouseCamera.prototype.pan = function(screenPoint) {
    var fromWorldPoint = MouseCamera.fromWorldPoint;
    var toWorldPoint = MouseCamera.toWorldPoint;
    var worldDiff = MouseCamera.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);

    worldDiff.sub2(toWorldPoint, fromWorldPoint);
       
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


MouseCamera.prototype.onMouseDown = function (event) {
     if(!GameplayController.currentSession || !GameplayController.currentSession.gameplayActive  || WindowManager.hasOpenedWindows()  || !TutorialScreen.cameraRotatingEnabled() || this.app.applicationPaused) {
        return;
    }
    
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = true;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = false;
        } break;
    }
};


MouseCamera.prototype.onMouseUp = function (event) {
    switch (event.button) {
        case pc.MOUSEBUTTON_LEFT: {
            this.lookButtonDown = false;
        } break;
            
        case pc.MOUSEBUTTON_MIDDLE: 
        case pc.MOUSEBUTTON_RIGHT: {
            this.panButtonDown = false;            
        } break;
    }
};


MouseCamera.prototype.onMouseMove = function (event) {   
    if(!GameplayController.currentSession || !GameplayController.currentSession.gameplayActive || WindowManager.hasOpenedWindows()  || !TutorialScreen.cameraRotatingEnabled() || this.app.applicationPaused) {
        return;
    }
    
    var mouse = pc.app.mouse;
    if (this.lookButtonDown) {
        this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
        this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
        
        if(!TutorialScreen.tutorialCompleted) {
            this.app.fire('orbitCamera:rotate');
        }
        
    } else if (this.panButtonDown) {
        this.pan(event);   
    }
    
    this.lastPoint.set(event.x, event.y);
};


MouseCamera.prototype.onMouseWheel = function (event) {
    this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
    // event.event.preventDefault();
};


MouseCamera.prototype.onMouseOut = function (event) {
    this.lookButtonDown = false;
    this.panButtonDown = false;
};

// touchCamera.js
var TouchCamera = pc.createScript('TouchCamera');

TouchCamera.attributes.add('orbitSensitivity', {
    type: 'number', 
    default: 0.4, 
    title: 'Orbit Sensitivity', 
    description: 'How fast the camera moves around the orbit. Higher is faster'
});

TouchCamera.attributes.add('enablePanning', {
    type: 'boolean', 
    default: false, 
    description: 'Enable two-fingers panning'
});

TouchCamera.attributes.add('distanceSensitivity', {
    type: 'number', 
    default: 0.2, 
    title: 'Distance Sensitivity', 
    description: 'How fast the camera moves in and out. Higher is faster'
});


TouchCamera.prototype.initialize = function() {
    this.orbitCamera = this.entity.script.orbitCamera;
    
    this.lastTouchPoint = new pc.Vec2();
    this.lastPinchMidPoint = new pc.Vec2();
    this.lastPinchDistance = 0;
    
    if (this.orbitCamera && this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
        this.on('destroy', function() {
            this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
            this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

            this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        });
    }
};


TouchCamera.prototype.getPinchDistance = function (pointA, pointB) {
    // Return the distance between the two points
    var dx = pointA.x - pointB.x;
    var dy = pointA.y - pointB.y;    
    
    return Math.sqrt((dx * dx) + (dy * dy));
};


TouchCamera.prototype.calcMidPoint = function (pointA, pointB, result) {
    result.set(pointB.x - pointA.x, pointB.y - pointA.y);
    result.scale(0.5);
    result.x += pointA.x;
    result.y += pointA.y;
};


TouchCamera.prototype.onTouchStartEndCancel = function(event) {
    if(!GameplayController.currentSession || !GameplayController.currentSession.gameplayActive || WindowManager.hasOpenedWindows() || !TutorialScreen.cameraRotatingEnabled() || this.app.applicationPaused) {
        return;
    }
    
    // We only care about the first touch for camera rotation. As the user touches the screen, 
    // we stored the current touch position
    var touches = event.touches;
    if (touches.length == 1) {
        this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
    } else if (touches.length == 2) {
        // If there are 2 touches on the screen, then set the pinch distance
        this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
    }
};


TouchCamera.fromWorldPoint = new pc.Vec3();
TouchCamera.toWorldPoint = new pc.Vec3();
TouchCamera.worldDiff = new pc.Vec3();


TouchCamera.prototype.pan = function(midPoint) {
    if(!this.enablePanning) {
        return;
    }
    var fromWorldPoint = TouchCamera.fromWorldPoint;
    var toWorldPoint = TouchCamera.toWorldPoint;
    var worldDiff = TouchCamera.worldDiff;
    
    // For panning to work at any zoom level, we use screen point to world projection
    // to work out how far we need to pan the pivotEntity in world space 
    var camera = this.entity.camera;
    var distance = this.orbitCamera.distance;
    
    camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
    camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
    
    worldDiff.sub2(toWorldPoint, fromWorldPoint);
     
    this.orbitCamera.pivotPoint.add(worldDiff);    
};


TouchCamera.pinchMidPoint = new pc.Vec2();

TouchCamera.prototype.onTouchMove = function(event) {
    if(!GameplayController.currentSession || !GameplayController.currentSession.gameplayActive  || WindowManager.hasOpenedWindows() || !TutorialScreen.cameraRotatingEnabled() || this.app.applicationPaused) {
        return;
    }
    
    if(!TutorialScreen.tutorialCompleted) {
        this.app.fire('orbitCamera:rotate');
    }
    
    var pinchMidPoint = TouchCamera.pinchMidPoint;
    
    // We only care about the first touch for camera rotation. Work out the difference moved since the last event
    // and use that to update the camera target position 
    var touches = event.touches;
    if (touches.length == 1) {
        var touch = touches[0];
        
        this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
        this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        
        this.lastTouchPoint.set(touch.x, touch.y);
    
    } else if (touches.length == 2) {
        // Calculate the difference in pinch distance since the last event
        var currentPinchDistance = this.getPinchDistance(touches[0], touches[1]);
        var diffInPinchDistance = currentPinchDistance - this.lastPinchDistance;
        this.lastPinchDistance = currentPinchDistance;
                
        this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);
        
        // Calculate pan difference
        this.calcMidPoint(touches[0], touches[1], pinchMidPoint);
        this.pan(pinchMidPoint);
        this.lastPinchMidPoint.copy(pinchMidPoint);
    }
};


// TouchControls.js
/* jshint esversion: 6 */
var TouchControls = pc.createScript('touchControls');

TouchControls.numTouches = 0;
TouchControls.clickDistanceTolerance = 5;

// initialize code called once per entity
TouchControls.prototype.initialize = function() {
        
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
        
        this.app.touch.on(pc.EVENT_TOUCHEND, function(event) {
            // This prevents that a mouse click event will be executed after a touch event.
            event.event.preventDefault();
        });
    } 
    
    if (this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }
    
    if(this.app.keyboard) {
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }
    
   this.on("destroy", this.destroy, this);
};

// update code called every frame
TouchControls.prototype.update = function(dt) {
    
};


TouchControls.prototype.onTouchStart = function (event) {    
    if(event.touches.length >= 1) {
        this.touchDownPosition = {id: event.touches[0].id, x: event.touches[0].x, y: event.touches[0].y};
    }
};

TouchControls.prototype.onTouchMove = function (event) {
    
};


TouchControls.prototype.onTouchEnd = function (event) {
    if(event.changedTouches.length >= 1) {
         if(this.touchDownPosition && Utils.distanceBetween(this.touchDownPosition.x, this.touchDownPosition.y, event.changedTouches[0].x, event.changedTouches[0].y) < TouchControls.clickDistanceTolerance) {
             if(this.touchDownPosition.id === event.changedTouches[0].id) {
                 this.handleTouch(event.changedTouches[0].x, event.changedTouches[0].y);
             }
        }
    }
    
    TouchControls.numTouches = event.touches.length;
};


TouchControls.prototype.onTouchCancel = function (event) {
    this.touchDownPosition = null;
    TouchControls.numTouches = event.touches.length;
};


TouchControls.prototype.onKeyDown = function (event) {

};


TouchControls.prototype.onMouseDown = function (event) {
    this.mouseDownPosition = {x: event.x, y: event.y};
};


TouchControls.prototype.onMouseUp = function (event) {
    //if mouse were not moved, then throw a ball
    if(this.mouseDownPosition && Utils.distanceBetween(this.mouseDownPosition.x, this.mouseDownPosition.y, event.x, event.y) < TouchControls.clickDistanceTolerance) {
        this.handleTouch(event.x, event.y);
    }
};

/* TouchControls handler */
TouchControls.prototype.handleTouch = function(x, y) {
    this.app.fire("touch:start", {x: x, y: y});
};

TouchControls.prototype.destroy = function() {       
    if(this.app.touch) {
        this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    }

    if(this.app.mouse) { 
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }
    
    if(this.app.keyboard) {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }
};

// towerBuilder.js
/* jshint esversion: 6 */
var TowerBuilder = pc.createScript('towerBuilder');

TowerBuilder.attributes.add('testPrefab', {
    title: "Test prefab",
    type: 'entity'
});

TowerBuilder.attributes.add('numColors', {
    title: "Colors",
    type: 'number',
    default: 5
});

TowerBuilder.attributes.add('towerHeight', {
    title: "Tower Height",
    type: 'number',
    default: 12
});

TowerBuilder.prototype.initialize = function() { 
    this.startBuildingProcess();
    this.app.on("level:clear", this.clearLevel, this);
    this.app.on("level:exit", this.clearLevel, this);
    this.app.on("level:buildTower", this.startBuildingProcess, this);
};

TowerBuilder.prototype.clearLevel = function() { 
    this.removeExistingChildren();    
};


TowerBuilder.prototype.startBuildingProcess = function() { 
    this.clearLevel();    
    if(this.testPrefab) {
       this.buildTowerFromPrefab(this.testPrefab);
    } else {
        this.buildCurrentLevelTower();
    }
};


TowerBuilder.prototype.searchForPrefabs = function() {
     this.preparedPrefabs = Utils.shuffle(HierarchyManager.getInstance().getByPath("Prefabs").children.filter(prefab => !!prefab.script.towerConfig.readyToUse));
};

TowerBuilder.prototype.update = function(dt) {
    
};

TowerBuilder.prototype.removeExistingChildren = function() {
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
};

TowerBuilder.prototype.buildCurrentLevelTower = function() {
    this.buildTowerFromConfig(LevelManager.getLevelConfig(GameplayController.currentLevel));
};



TowerBuilder.prototype.buildTowerFromConfig = function(levelConfig) {
    this.entity.totalItems = 0;
    this.entity.requiredItems = 0;       
    
    const prefab = HierarchyManager.getInstance().getByPath("Prefabs").findByName(levelConfig.prefabName);
    const prefabConfig = prefab.script.towerConfig;
    const prefabPosition = prefab.getPosition();
    const layers = prefab.children;
    const numLayers = layers.length;
    const numColors = (isForcedMode() && getForcedModeProperties().override.tower_colors > 0) ? getForcedModeProperties().override.tower_colors : levelConfig.numColors;
    
    TowerBuilder.setCurrentTowerHeight(levelConfig.towerHeight * numLayers);
    MaterialsStorage.prepareMaterialsSet(numColors);
    
    for(let i = 0; i < levelConfig.towerHeight; i++) {
        for (let k = 0; k < layers.length; k++) {
            const layerChildren = layers[k].children;
            for(let child of layerChildren) {
                const item = child.clone();
                item.physicalScale = prefabConfig.physicalScale;
                item.collisionScale = prefabConfig.collisionScale;
                const elevationLevel = (i * numLayers + k);
                const childPosition = child.getPosition();
                const x = childPosition.x - prefabPosition.x;
                const y = childPosition.y - prefabPosition.y + i * numLayers * prefabConfig.itemHeight + GameplayController.towerStandElevation;
                const z = childPosition.z - prefabPosition.z;
                this.addItem(item, x, y, z, elevationLevel, levelConfig.towerHeight * numLayers, prefabConfig);
                this.entity.totalItems += 1;
                if(elevationLevel >= prefabConfig.victoryLayersLimit) {
                    this.entity.requiredItems += 1;
                }
                this.entity.currentHeight = Math.max(this.entity.currentHeight, y);
            }
        }
    }
    // famobi.log("Added " + this.entity.totalItems + ' bodies, ' + this.entity.requiredItems + ' required');
    
    if(GameplayController.currentSession) {
        const keepNumBalls =  isEndlessMode() && GameplayController.currentSession;
        const numBalls = (isForcedMode() &&  getForcedModeProperties().override.shots >= 0) ? keepNumBalls ?  GameplayController.currentSession.ballsLeft : getForcedModeProperties().override.shots : levelConfig.numBalls;    
        GameplayController.currentSession.comboBarVolume = this.entity.requiredItems;
        GameplayController.currentSession.ballsLeft = numBalls;
        GameplayController.currentSession.totalBalls = numBalls;
    }
    
    this.entity.prefabName = levelConfig.prefabName;
    this.entity.victoryLayersLimit = prefabConfig.victoryLayersLimit;
    this.entity.numColors = numColors;
    this.entity.numBalls = levelConfig.numBalls;
    this.entity.towerDifficulty = levelConfig.difficulty;
    this.entity.towerHeight = levelConfig.towerHeight;
    this.entity.layersInPattern = layers;
    this.entity.physicalScale = prefabConfig.physicalScale;
    this.entity.itemHeight = prefabConfig.itemHeight;
    this.entity.layerHeight = prefabConfig.itemHeight;
    this.entity.totalObjects = HierarchyManager.getInstance().getByPath("Tower").children.length;
    this.entity.requiredAmountOfObjectsToCompleteLevel = Math.max(this.entity.totalObjects - 20, Math.floor(this.entity.totalObjects * 0.9));
    this.entity.victoryHeightLimit = this.entity.victoryLayersLimit * this.entity.layerHeight;
};

TowerBuilder.prototype.addItem = function(item, x, y, z, elevationLevel, maxElevation, prefabConfig) {
    item.activate = function() {
        if(!this.active && !prefabConfig.debugLock) {
            this.active = true;
            this.initialPosition = this.getPosition().clone();
            this.rigidbody.type = pc.BODYTYPE_DYNAMIC;           
            this.rigidbody.mass = TowerBuilder.calculateItemMass(this.elevationLevel);
            this.rigidbody.body.setSleepingThresholds(0.75, 0.75);
            this.model.meshInstances[0].material = MaterialsStorage.levelMaterials[this.materialIndex].resource;
        }
    }.bind(item);
    
     item.unlock = function() {
        if(this.rigidbody.type != pc.BODYTYPE_DYNAMIC) {
            // this.rigidbody.type = pc.BODYTYPE_DYNAMIC;           
            // this.rigidbody.mass = TowerBuilder.calculateItemMass(this.elevationLevel);
            // this.rigidbody.body.setSleepingThresholds(0.75, 0.75);
        }
    }.bind(item);
    
    item.enabled = true;
    item.active = false;
    item.maxElevation = maxElevation;
    item.originalHalfExtents = new pc.Vec3(item.collision.halfExtents.x, item.collision.halfExtents.y, item.collision.halfExtents.z);
    item.rigidbody.linearDamping = prefabConfig.linearDamping;
    item.rigidbody.angularDamping = prefabConfig.angularDamping;
    item.rigidbody.friction = prefabConfig.friction;
    item.rigidbody.restitution = prefabConfig.restitution;
    item.rigidbody.type = pc.BODYTYPE_STATIC;
    item.materialIndex = Math.floor(Math.random() * MaterialsStorage.levelMaterials.length);
    item.model.meshInstances[0].material = GameplayController.levelActive ? MaterialsStorage.disabledObjectMaterial.resource : MaterialsStorage.levelMaterials[item.materialIndex].resource;//;
    item.elevationLevel = elevationLevel;    
    item.setPosition(x, y, z);    
    HierarchyManager.getInstance().getByPath("Tower").addChild(item);    
};



TowerBuilder.prototype.buildTowerFromPrefab = function(prefab) {
    this.entity.totalItems = 0;
    this.entity.requiredItems = 0;
    const prefabConfig = prefab.script.towerConfig;
    const prefabPosition = prefab.getPosition();
    const layers = prefab.children;
    const numLayers = layers.length;
    
    TowerBuilder.setCurrentTowerHeight(this.towerHeight * numLayers);
    MaterialsStorage.prepareMaterialsSet(this.numColors);    
    
    for(let i = 0; i < this.towerHeight; i++) {
        for (let k = 0; k < layers.length; k++) {
            const layerChildren = layers[k].children;
            for(let child of layerChildren) {
                const item = child.clone();
                item.physicalScale = prefabConfig.physicalScale;
                item.collisionScale = prefabConfig.collisionScale;
                const elevationLevel = (i * numLayers + k);
                const childPosition = child.getPosition();
                const x = childPosition.x - prefabPosition.x;
                const y = childPosition.y - prefabPosition.y + i * numLayers * prefabConfig.itemHeight + GameplayController.towerStandElevation;
                const z = childPosition.z - prefabPosition.z;
                this.addItem(item, x, y, z, elevationLevel, this.towerHeight * numLayers, prefabConfig);
                this.entity.totalItems += 1;
                if(elevationLevel >= prefabConfig.victoryLayersLimit) {
                    this.entity.requiredItems += 1;
                }
                this.entity.currentHeight = Math.max(this.entity.currentHeight, y);
            }
        }
    }
    
    if(GameplayController.currentSession) {
        GameplayController.currentSession.comboBarVolume = this.entity.requiredItems;
    }
    
    this.entity.victoryLayersLimit = prefabConfig.victoryLayersLimit;
    this.entity.numColors = isForcedMode() ? 2 : this.numColors;
    this.entity.numBalls = prefabConfig.numBalls;
    this.entity.towerDifficulty = prefabConfig.difficulty;
    this.entity.towerHeight = this.towerHeight;
    this.entity.layersInPattern = layers;
    this.entity.physicalScale = prefabConfig.physicalScale;
    this.entity.itemHeight = prefabConfig.itemHeight;
    this.entity.layerHeight = prefabConfig.itemHeight;
    this.entity.totalObjects = HierarchyManager.getInstance().getByPath("Tower").children.length;
    this.entity.requiredAmountOfObjectsToCompleteLevel = Math.max(this.entity.totalObjects - 20, Math.floor(this.entity.totalObjects * 0.9));
    this.entity.victoryHeightLimit = this.entity.victoryLayersLimit * this.entity.layerHeight;

};

TowerBuilder.setCurrentTowerHeight = function(value) {
    TowerBuilder.towerMaxHeight = value;
    TowerBuilder.baseMass = Math.min(Number.MAX_SAFE_INTEGER, Math.pow(2, TowerBuilder.towerMaxHeight) * 1000);
};

TowerBuilder.calculateItemMass = function(elevationLevel) {
    return TowerBuilder.baseMass / Math.pow(2, elevationLevel);
};

// utils.js
/* jshint esversion: 6 */
var Utils = pc.createScript('utils');

Utils.prototype.initialize = function() {
    Utils.app = this.app;
};

Utils.prototype.update = function(dt) {
    
};

Utils.assignAction = function(button, handler, handlerContext) {
    const mouseSupported = !!this.app.mouse;
    const touchSupported = !!this.app.touch;
    if (touchSupported) {
         button.element.on('touchstart', handler, handlerContext);
    } 
    if (mouseSupported) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

pc.Entity.prototype.delayedCall = function (durationMS, f, scope) {
    var n = 0;
    while(this["delayedExecuteTween" + n]) {
        n++;
    }
    var id = "delayedExecuteTween" + n;
    var m;
    this[id] = this.tween(m)
        .to(1, durationMS / 1000, pc.Linear)
    ;
    this[id].start();
    
    this[id].once("complete", function() {
        f.call(scope);
        this[id] = null;
    }, this);
    
    return this[id];
};

pc.Entity.prototype.childrenAlphaAppear = function(initialAlpha, duration, sine, delay) {
    for(var i = this.children.length - 1; i > -1; i--) {
        var child = this.children[i];
        if(child instanceof pc.Entity) {
           child.childrenAlphaAppear(initialAlpha, duration, sine, delay);
        }
        if(child.element) {
            var targetAlpha = child.element.opacity;
            child.element.opacity = initialAlpha;
            child.tween(child.element)
                .to({opacity: targetAlpha}, duration, sine)
                .delay(delay)
                .start();
        }
    }
};

pc.GraphicsDevice.prototype.updateClientRect = function() {    
    if(window.visualViewport) {
        this.clientRect = this.canvas.getBoundingClientRect();
        this.clientRect.x = window.visualViewport.offsetLeft;
        this.clientRect.y = window.visualViewport.offsetTop;
        this.clientRect.width = window.visualViewport.width;        
        this.clientRect.height = window.visualViewport.height;
    } else {
        this.clientRect = this.canvas.getBoundingClientRect();
    }    
};

Utils.lerpColor = function(colorA, colorB, progress, targetColor) {
    return targetColor.set(colorA.r + (colorB.r - colorA.r) * progress, colorA.g + (colorB.g - colorA.g) * progress, colorA.b + (colorB.b - colorA.b) * progress, 1);
};

Utils.distanceBetween = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

Utils.checkContact = function(entityA, entityB) {
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <=  (entityA.script.item.collisionDiameter * entityA.collisionScale / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale / 2) && 
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale / 2 + entityB.script.item.collisionHeight * entityB.collisionScale / 2);
};


Utils.checkContactRough = function(entityA, entityB) {
    var scaleFactor = 1.1;
    var pos1 = entityA.getPosition();
    var pos2 = entityB.getPosition();
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z)) <=  (entityA.script.item.collisionDiameter * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionDiameter * entityB.collisionScale * scaleFactor / 2) && 
        Math.abs(pos1.y - pos2.y) <= (entityA.script.item.collisionHeight * entityA.collisionScale * scaleFactor / 2 + entityB.script.item.collisionHeight * entityB.collisionScale * scaleFactor / 2);
};

Utils.contactTestInternal = function(entityA, entityB, callback) {
  
    var resultCallback = new Ammo.ConcreteContactResultCallback();
        resultCallback.addSingleResult = function(
            manifoldPoint,
            collisionObjectA,
            id0,
            index0,
            collisionObjectB,
            id1,
            index1
        ) {
            if(callback) {
                callback(entityA, entityB);
            }
        };
    
    Utils.app.systems.rigidbody.dynamicsWorld.contactPairTest(entityA.rigidbody.body, entityB.rigidbody.body, resultCallback);
};

Utils.distanceXZ = function(pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.z - pos2.z) * (pos1.z - pos2.z));
};

Utils.distanceBetweenEntities = function(posA, posB) {
    return Math.sqrt((posA.x - posB.x) * (posA.x - posB.x) + (posA.y - posB.y) * (posA.y - posB.y) + (posA.z - posB.z) * (posA.z - posB.z));
};

Utils.tweenText = function(textElement, initialValue, targetValue, duration, delay, easing, playCountingSound) {
      textElement.element.textValue = initialValue;
      textElement.element.text = '' + Math.round(initialValue);  
      textElement.tween(textElement.element)
            .to({textValue: targetValue}, duration, easing)
            .delay(delay)
            .onUpdate(() => textElement.element.text = '' + Math.round(textElement.element.textValue))
            .start();
};

Utils.getRandomItem = function (objects, startIndex, length) {

        if (objects === null) { return null; }
        if (startIndex === undefined) { startIndex = 0; }
        if (length === undefined) { length = objects.length; }

        var randomIndex = startIndex + Math.floor(Math.random() * length);

        return objects[randomIndex] === undefined ? null : objects[randomIndex];

};

Utils.removeRandomItem = function (objects, startIndex, length) {

    if (objects === null) { // undefined or null
        return null;
    }

    if (startIndex === undefined) { startIndex = 0; }
    if (length === undefined) { length = objects.length; }

    var randomIndex = startIndex + Math.floor(Math.random() * length);
    if (randomIndex < objects.length)
    {
        var removed = objects.splice(randomIndex, 1);
        return removed[0] === undefined ? null : removed[0];
    }
    else
    {
        return null;
    }

};

Utils.shuffle = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;  
};

Utils.humanizeTime = function(seconds) {
    var restSeconds = seconds;
    var hours = Math.floor(restSeconds / 3600);
    restSeconds %= 3600;
    var minutes = Math.floor(restSeconds / 60);
    restSeconds %= 60;

    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (restSeconds < 10 ? "0" : "") + Math.floor(restSeconds);  
};

Utils.randomInRangeSigned = function(a,b) {
    if(Math.random() <= 0.5) {
        return pc.math.random(Math.min(-a, -b), Math.max(-a, -b));
    } else {
         return pc.math.random(Math.min(a, b), Math.max(a, b)) ;
    }   
};

Utils.vibrate = function(pattern) {
    if(GameplayController.enableVibration && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(pattern); 
    }
};

// ballController.js
/* jshint esversion: 6 */
var BallController = pc.createScript('ballController');

BallController.BODYGROUP_BALL = pc.BODYGROUP_USER_5;

BallController.prototype.initialize = function () {
    this.app.on("level:clear", this.clear, this);
    this.app.on("level:createBall", this.createBall, this);
    this.app.on("cannon:create", this.createCannonBall, this);
    this.app.on("powerup:activate", this.powerupActivated, this);
    this.app.on("colorball:break", this.dispatchColorBallBreak, this);
    this.app.on("ball:verifyColor", this.verifyBallColor, this);
    this.app.on("level:exit", this.exitLevel, this);
    this.clear();
};

BallController.prototype.clear = function () {
    for (let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
    const trashContainer = HierarchyManager.getInstance().getByPath("TrashContainer");
    for (let i = trashContainer.children.length - 1; i > -1; i--) {
        trashContainer.children[i].destroy();
    }
    this.preparedBall = null;
};


BallController.prototype.createBall = function () {
    this.prepareNextBall();
};

BallController.prototype.createCannonBall = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    if (this.preparedBall) {
        this.preparedBall.destroy();
    }
    for (let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }

    const ball = BallController.ball = HierarchyManager.getInstance().getByPath("Objects/CannonBall").clone();
    ball.enabled = true;
    HierarchyManager.getInstance().getByPath("Camera/ActiveBall").addChild(ball);
    this.preparedBall = ball;
};


BallController.prototype.createColorBall = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    if (this.preparedBall) {
        this.preparedBall.destroy();
    }
    for (let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }

    GameplayController.currentSession.colorBallAvailable = true;

    const ball = BallController.ball = HierarchyManager.getInstance().getByPath("Objects/ColorBall").clone();
    ball.enabled = true;
    HierarchyManager.getInstance().getByPath("Camera/ActiveBall").addChild(ball);
    this.preparedBall = ball;
};


BallController.prototype.powerupActivated = function (dataKey) {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    if (dataKey != "Multiball") {
        return;
    }

    this.createColorBall();
};


BallController.prototype.exitLevel = function () {
    this.clear();
};

BallController.prototype.dispatchColorBallBreak = function (worldPosition, targetItem, initialVelocity) {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    for (let i = 0; i < GameplayController.numColorBalls; i++) {
        const ball = HierarchyManager.getInstance().getByPath("Objects/MiniColorBall").clone();
        ball.enabled = true;
        ball.launched = true;
        ball.launchVelocity = initialVelocity;
        ball.launchPosition = worldPosition.clone();
        ball.launchTarget = targetItem;
        HierarchyManager.getInstance().getByPath("TrashContainer").addChild(ball);
    }
};

BallController.prototype.update = function (dt) {

};

BallController.prototype.verifyBallColor = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession || GameplayController.currentSession.finished || !this.preparedBall) {
        return;
    }
    if (this.preparedBall.script.ball.isCannonBall || this.preparedBall.script.ball.isColorBall) {
        return;
    }
    const availableColors = HierarchyManager.getInstance().getByPath("Tower").script.towerController.getAvailableColors();
    if (availableColors.indexOf(this.preparedBall.materialIndex) === -1) {
        this.preparedBall.setColor(Utils.getRandomItem(availableColors));
    }
};

BallController.prototype.prepareNextBall = function () {
    if (!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }

    if (GameplayController.currentSession.cannonballSpecialModeCharges > 0) {
        GameplayController.currentSession.cannonballSpecialModeCharges -= 1;
        this.createCannonBall();
        return;
    }

    if (GameplayController.currentSession.ballsLeft <= 0 && !GameplayController.currentSession.unlimitedBalls) {
        BallController.ball = this.preparedBall = null;
        return;
    }

    if (GameplayController.currentSession.cannonBallAvailable) {
        this.createCannonBall();
        return;
    } else if (GameplayController.currentSession.colorBallAvailable) {
        this.createColorBall();
        return;
    }

    const ball = BallController.ball = HierarchyManager.getInstance().getByPath("Objects/Ball").clone();
    ball.enabled = true;
    HierarchyManager.getInstance().getByPath("Camera/ActiveBall").addChild(ball);
    this.preparedBall = ball;
};

BallController.prototype.shoot = function (targetEntity, targetPosition) {
    if (this.preparedBall) {
        const autoDestroyTarget = GameplayController.autoDestroyTarget && this.preparedBall.materialIndex === targetEntity.materialIndex;
        if (this.preparedBall.script.ball.shoot(targetEntity, targetPosition, autoDestroyTarget)) {
            this.preparedBall = null;
            this.prepareNextBall();
        }
    }
};


// MaterialsStorage.js
/* jshint esversion: 6 */
var MaterialsStorage = pc.createScript('materialsStorage');

MaterialsStorage.attributes.add('disabledObjectMaterial', {
    title: "Disabled materials",
    type: 'asset',
    assetType: 'material'
});

MaterialsStorage.attributes.add('objectMaterials', {
    title: "Object materials",
    type: 'asset',
    assetType: 'material',
    array: true
});


MaterialsStorage.prototype.initialize = function() {
    MaterialsStorage.objectMaterials = this.objectMaterials;
    MaterialsStorage.disabledObjectMaterial = this.disabledObjectMaterial;
};

MaterialsStorage.prototype.update = function(dt) {
    
};

MaterialsStorage.prepareMaterialsSet = function(amount) {    
    const predefinedColors = [];
    if(isForcedMode()) {
        const prioritizedColor = getForcedModeProperties().override.prioritized_color;
        if(prioritizedColor) predefinedColors.push(prioritizedColor);
    }
    
    famobi.log('Prioritized color: ' + predefinedColors.join(','));
    
    var availableMaterials = Utils.shuffle(MaterialsStorage.objectMaterials.slice());
    availableMaterials.sort((a, b) => {
        let indexA = (predefinedColors.indexOf(a.name) + 1) || (predefinedColors.length + 1);        
        let indexB = (predefinedColors.indexOf(b.name) + 1) || (predefinedColors.length + 1);        
        return indexA - indexB;
    });
    
    var targetMaterials = [];
    for(var i = 0; i < amount; i++) {
        targetMaterials.push(availableMaterials[i % availableMaterials.length]);
    }
    MaterialsStorage.levelMaterials = targetMaterials;
};

// TowerController.js
/* jshint esversion: 6 */
var TowerController = pc.createScript('towerController');


TowerController.prototype.initialize = function() {
    this.entity.levelProgress = 0;
    this.entity.minUnlockedElevationLevel = Number.MAX_VALUE;
    this.timeouts = [];
    this.app.on("tower:hit", this.handleTowerHit, this);    
    this.app.on("level:restart", this.restart, this);
    this.app.on("powerup:activate", this.beginEarthquake, this);
    this.app.on("tower:destroyed", this.explodeRestOfItems, this);
    
    HierarchyManager.getInstance().getByPath("TowerStand").collision.on('collisionstart', (contact) => { 
        if(contact.other && contact.other.rigidbody && contact.other.parent && contact.other.parent.name === "Tower" && contact.other.initialPosition) {
            const position = contact.other.getPosition();
            const yDistance = Math.abs(position.y - contact.other.initialPosition.y);
            const xzDistance = Utils.distanceXZ(position, contact.other.initialPosition);
            if(yDistance >= this.entity.itemHeight * this.entity.victoryLayersLimit * 1.666 && xzDistance <= GameplayController.towerStandDiameter / 2 * 0.8) {
                 contact.other.script.item.killItem(0);
            } 
        }
    });
};

TowerController.prototype.restart = function() {
    this.entity.levelProgress = 0;
    this.entity.currentHeight = 0;
    this.entity.minUnlockedElevationLevel = Number.MAX_VALUE;
    for(let i = this.timeouts.length - 1; i > -1; i--) {
       clearTimeout(this.timeouts[i]);
    }
    this.timeouts = [];
};

TowerController.prototype.update = function(dt) {
    if(!GameplayController.levelActive || !GameplayController.currentSession) {
        return;
    }
    this.updateChildren();
        
    if(GameplayController.currentSession && GameplayController.currentSession.earthquakeTimer > 0) {
        this.entity.children.forEach(child => child.active && child.rigidbody.applyImpulse(new pc.Vec3(pc.math.random(-2, 2) * child.rigidbody.mass, 0, pc.math.random(-2, 2) * child.rigidbody.mass), new pc.Vec3(0, 0, 0)));  
    }
};

TowerController.prototype.getAvailableColors = function() {
    const allColors = [];
    const allColorsButLastUsed = [];
    const colorsAboveFinishLine = [];
    this.entity.children.forEach(child => {
        if(child.active) {
            if(allColors.indexOf(child.materialIndex) === -1 ) {
                allColors.push(child.materialIndex);
            }
            if(allColorsButLastUsed.indexOf(child.materialIndex) === -1 && child.materialIndex != GameplayController.currentSession.lastBallColor) {
                allColorsButLastUsed.push(child.materialIndex);
            }
            if( colorsAboveFinishLine.indexOf(child.materialIndex) === -1 && child.materialIndex != GameplayController.currentSession.lastBallColor && child.getPosition().y >= GameplayController.towerStandElevation + this.entity.victoryHeightLimit) {
                colorsAboveFinishLine.push(child.materialIndex);
            }
        }
    });
    return colorsAboveFinishLine.length > 0 ? colorsAboveFinishLine :  allColorsButLastUsed.length > 0 ? allColorsButLastUsed : allColors.length > 0 ? allColors : [Utils.getRandomItem(MaterialsStorage.levelMaterials)];
};

TowerController.prototype.updateChildren = function() {
    
    this.calculateCurrentHeight();
    
    const towerStand = HierarchyManager.getInstance().getByPath("TowerStand");
    const towerStandPosition = towerStand.getPosition();
    const towerStandRadius = towerStand.collision.radius;
    
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        const child = this.entity.children[i];
        const childPosition = child.getPosition();
        
        /* restrict tower height */
        if(!child.active &&  this.entity.currentHeight - childPosition.y <= (GameplayController.availableTowerHeight - 1) * 1.01 * this.entity.itemHeight) {
            child.activate();
        }
        
        /* check if item is inside of the tower */
        if(Utils.distanceBetween(childPosition.x, childPosition.z, towerStandPosition.x, towerStandPosition.z) > towerStandRadius) {
            child.script.item.removeFromTower();
        }
    }
    
    const destroyedChildrenOutOfRequired = this.entity.totalObjects - this.entity.children.length;
    const childrenLeft = this.entity.children.reduce((sum, child) => (child.elevationLevel >= this.entity.victoryLayersLimit && child.getPosition().y > GameplayController.towerStandElevation + this.entity.victoryHeightLimit) ? sum + 1 : sum, 0);
    const currentProgress = pc.math.clamp(1 - childrenLeft / this.entity.requiredItems, 0, 1);
    if(this.entity.levelProgress != currentProgress) {
        this.entity.levelProgress = currentProgress;    
        this.app.fire("level:progress", this.entity.levelProgress);
    }
};

TowerController.prototype.calculateCurrentHeight = function() {
    this.entity.currentHeight = this.entity.children.reduce((prev, current) => Math.max(prev, current.getPosition().y), 0);
    return this.entity.currentHeight;
};

TowerController.prototype.explodeRestOfItems = function() {
    this.entity.children.forEach((child, index) => child.script.item.explode(500 + index * 35, true));
};


TowerController.prototype.beginEarthquake = function(dataKey) {
   if(dataKey === "Earthquake" && GameplayController.currentSession) {
       GameplayController.currentSession.comboCounter = 0;
       GameplayController.currentSession.lastItemTimestamp = 0;
       
       GameplayController.currentSession.earthquakeTimer = 1;
       Utils.vibrate([30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20]); 
       this.app.fire("audio:play", "earthQuake");
       this.entity.children.forEach(child => child.active && child.rigidbody.applyImpulse(new pc.Vec3(pc.math.random(-10, 10) * child.rigidbody.mass, pc.math.random(-10, 10) * child.rigidbody.mass, pc.math.random(-10, 10) * child.rigidbody.mass), new pc.Vec3(0, 0, 0)));  
   
       GameplayController.currentSession.destructionCause = 'earthquake';
       Apicontroller.trackStats("powerup_used", {"powerup_type": "earthquake"});
   }
};

TowerController.prototype.handleTowerHit = function(targetObject) {
    GameplayController.lastDestroyedColor = targetObject.materialIndex;
    
    /* activte all sleeping bodies */
    this.entity.children.forEach(child => child && child.active && child.rigidbody && child.rigidbody.activate());
    
    if(targetObject && targetObject.script && targetObject.script.item) {
        targetObject.script.item.chainedExplode(0);
    }
};

// explosionManager.js
/* jshint esversion: 6 */
var ExplosionManager = pc.createScript('explosionManager');


ExplosionManager.prototype.initialize = function() {
    this.particleCache = [];
    this.activeParticles = [];
    this.prepareCache();
    this.app.on("explosion", this.createExplosion, this);
    this.app.on("level:restart", this.reset, this);
    this.on("destroy", this.destroy, this);
};

ExplosionManager.prototype.reset = function() {
    for(let i = this.activeParticles.length - 1; i > -1; i--) {
        this.resetPaticle(this.activeParticles[i]);
    }
};

ExplosionManager.prototype.destroy = function() {
    this.app.off("explosion", this.createExplosion, this);
};

ExplosionManager.prototype.update = function(dt) {
    this.activeParticles.forEach(child => this.updateChild(child, dt));
};

ExplosionManager.prototype.createExplosion = function(x, y, z, materialIndex, numParticles) {
    numParticles = numParticles || GameplayController.particlesPerObject;
    if(this.particleCache && this.particleCache.length < GameplayController.particleCacheSize * 0.7) {
        numParticles = Math.max(2, Math.floor(numParticles / 2));
    }
    for(let i = 0; i < numParticles; i++) {
        this.addParticle(x, y, z, materialIndex);
    }
    this.app.fire("audio:play", "pop0" + Math.floor(Math.random() * 4 + 1));
};

ExplosionManager.prototype.updateChild = function(child, dt) {
   //position
   const pos = child.getPosition();
   pos.x += child.speedX * dt;
   pos.y += child.speedY * dt;
   pos.z += child.speedZ * dt;
   child.setPosition(pos);
   child.speedY += child.gravity * dt;

   //scale
   child.currentScale += child.scaleSpeed * dt;
   child.scaleSpeed += child.scaleAcceleration * dt;
   if(child.currentScale <= 0) {
       child.currentScale = 0;
       child.completed = true;
   }
   child.setLocalScale(child.currentScale, child.currentScale, child.currentScale);

    if(child.completed) {
       this.resetPaticle(child);
   }
};


ExplosionManager.prototype.addParticle = function(x, y, z, materialIndex) {
    let particle;

    if (this.particleCache.length > 0) {
        particle = this.particleCache.splice(this.particleCache.length - 1, 1)[0];
    } else {
        particle = HierarchyManager.getInstance().getByPath("Objects/Particle").clone();
        this.entity.addChild(particle);
    }

    particle.enabled = true;
    particle.model.meshInstances[0].material = MaterialsStorage.levelMaterials[materialIndex].resource;
    particle.setPosition(x, y, z);
    particle.speedX = pc.math.random(-6, 6);
    particle.speedY = pc.math.random(-2, 10);
    particle.speedZ = pc.math.random(-6, 6);
    particle.gravity = pc.math.random(-30, -15);        
    particle.currentScale = pc.math.random(0.1, 0.4);
    particle.setLocalScale(particle.currentScale, particle.currentScale, particle.currentScale);
    particle.scaleSpeed = pc.math.random(1.25, 2.5);
    particle.scaleAcceleration = pc.math.random(-12, -5);
    particle.completed = false;

    this.activeParticles.push(particle);
};


ExplosionManager.prototype.resetPaticle = function(particle) {
    const index = this.activeParticles.indexOf(particle);
    if(index != -1) {
        this.activeParticles.splice(index, 1);
    }
    particle.enabled = false;
    particle.setPosition(0, -50, 0);
    this.particleCache.push(particle);
};


ExplosionManager.prototype.prepareCache = function() {
    this.particleCache = [];
    const basicParticle = HierarchyManager.getInstance().getByPath("Objects/Particle");
    for(let i = 0; i < GameplayController.particleCacheSize; i++) {
        const particle = basicParticle.clone();
        particle.enabled = false;
        particle.setPosition(0, -50, 0);
        particle.completed = true;
        this.entity.addChild(particle);
        this.particleCache.push(particle);
    }
};

// scrollingTexture.js
var ScrollingTexture = pc.createScript('scrollingTexture');

ScrollingTexture.attributes.add('speed', {
    type: 'vec2'
});

ScrollingTexture.tmp = new pc.Vec2();

// initialize code called once per entity
ScrollingTexture.prototype.initialize = function() {
    
};

// update code called every frame
ScrollingTexture.prototype.update = function(dt) {
    var tmp = ScrollingTexture.tmp;

    // Calculate how much to offset the texture
    // Speed * dt
    tmp.set(this.speed.x, this.speed.y);
    tmp.scale(dt);
    
    // Update the diffuse and normal map offset values
    this.entity.model.meshInstances[0].material.diffuseMapOffset.add(tmp);
    this.entity.model.meshInstances[0].material.normalMapOffset.add(tmp);
    this.entity.model.meshInstances[0].material.update();
};



// sandbox.js
/* jshint esversion: 6 */
var Sandbox = pc.createScript('sandbox');

Sandbox.prototype.initialize = function() {
    
};

Sandbox.prototype.update = function(dt) {

};



// compound.js
var Compound = pc.createScript('compound');

Compound.prototype.initialize = function() {
    
    var bodyShape = new Ammo.btCompoundShape();
    
    var children = this.entity.findByTag("compound-shape");

    children.forEach(function(child) {    
        var childPosition = child.getLocalPosition();
        var childRotation = child.getLocalRotation();
        var childSize = child.collision.data.halfExtents;
        
        var childShape = new Ammo.btBoxShape(new Ammo.btVector3(childSize.x,childSize.y,childSize.z));
        var rotation = new Ammo.btQuaternion(childRotation.x,childRotation.y,childRotation.z,1);
        var position = new Ammo.btVector3(childPosition.x,childPosition.y,childPosition.z);
        bodyShape.addChildShape(new Ammo.btTransform(rotation, position), childShape);
        
        child.destroy();
    });
     
    var entityPosition = this.entity.getPosition();
    var position = new Ammo.btVector3(entityPosition.x, entityPosition.y, entityPosition.z);
    
    var state = new Ammo.btDefaultMotionState(new Ammo.btTransform(new Ammo.btQuaternion(0, 0, 0, 1), position));
    
    var fallInertia = new Ammo.btVector3(0, 0, 0);
    bodyShape.calculateLocalInertia(this.entity.rigidbody.mass, fallInertia);
    var rigidBodyCI = new Ammo.btRigidBodyConstructionInfo(this.entity.rigidbody.mass,state, bodyShape, fallInertia);
    
    this.rigidbody = new Ammo.btRigidBody(rigidBodyCI);
    this.rigidbody.setRestitution(this.entity.rigidbody.restitution);
    this.rigidbody.setFriction(this.entity.rigidbody.friction);
    this.rigidbody.setDamping(this.entity.rigidbody.linearDamping, this.entity.rigidbody.angularDamping);
    
    var linearFactor = this.entity.rigidbody.linearFactor;
    var angularFactor = this.entity.rigidbody.angularFactor;
    
    this.rigidbody.setLinearFactor(new Ammo.btVector3(linearFactor.x, linearFactor.y, linearFactor.z));
    this.rigidbody.setAngularFactor(new Ammo.btVector3(angularFactor.x, angularFactor.y, angularFactor.z));
    
    this.rigidbody.entity = this.entity;
    this.app.systems.rigidbody.dynamicsWorld.addRigidBody(this.rigidbody);
    this.entity.rigidbody.body = this.rigidbody;
    
};

Compound.prototype.update = function(dt) {
    
    var trans = new Ammo.btTransform();
    this.rigidbody.getMotionState().getWorldTransform(trans);  
    var pos = trans.getOrigin();
    var rot = trans.getRotation();
    this.entity.setRotation(new pc.Quat(rot.x(),rot.y(), rot.z(), rot.w()));
    this.entity.setPosition(pos.x(), pos.y(), pos.z());
    
};

// convexHull.js
/* jshint esversion: 6 */
var ConvexHull = pc.createScript('convexHull');

ConvexHull.prototype.initialize = function() {

    var bodyShape = new Ammo.btConvexHullShape();
    var triangles = this.prepareTriangles();
    
    var triangle;
    var _vec3_1 = new Ammo.btVector3(0,0,0);
    var _vec3_2 = new Ammo.btVector3(0,0,0);
    var _vec3_3 = new Ammo.btVector3(0,0,0);
    for ( i = 0; i < triangles.length; i++ ) {
        triangle = triangles[i];
        _vec3_1.setX(triangle[0].x);
        _vec3_1.setY(triangle[0].y);
        _vec3_1.setZ(triangle[0].z);
        bodyShape.addPoint(_vec3_1, true);
        _vec3_2.setX(triangle[1].x);
        _vec3_2.setY(triangle[1].y);
        _vec3_2.setZ(triangle[1].z);
        bodyShape.addPoint(_vec3_2, true);
        _vec3_3.setX(triangle[2].x);
        _vec3_3.setY(triangle[2].y);
        _vec3_3.setZ(triangle[2].z);
        bodyShape.addPoint(_vec3_3, true);
    }
    
    var entityScale = this.entity.getWorldTransform().getScale();
    bodyShape.setLocalScaling(new Ammo.btVector3(entityScale.x * 0.96, entityScale.y * 0.96, entityScale.z * 0.96));
      
    var entityPosition = this.entity.getPosition();
    var position = new Ammo.btVector3(entityPosition.x, entityPosition.y, entityPosition.z);
    var entityRotation = this.entity.getRotation();
    var rotation = new Ammo.btQuaternion(entityRotation.x, entityRotation.y, entityRotation.z, entityRotation.w);
    
    var state = new Ammo.btDefaultMotionState(new Ammo.btTransform(rotation, position));
    
    var fallInertia = new Ammo.btVector3(0, 0, 0);
    bodyShape.calculateLocalInertia(this.entity.rigidbody.mass, fallInertia);
    var rigidBodyCI = new Ammo.btRigidBodyConstructionInfo(this.entity.rigidbody.mass, state, bodyShape, fallInertia);
    
    this.rigidbody = new Ammo.btRigidBody(rigidBodyCI);
    this.rigidbody.setRestitution(this.entity.rigidbody.restitution);
    this.rigidbody.setFriction(this.entity.rigidbody.friction);
    this.rigidbody.setDamping(this.entity.rigidbody.linearDamping, this.entity.rigidbody.angularDamping);
    
    var linearFactor = this.entity.rigidbody.linearFactor;
    var angularFactor = this.entity.rigidbody.angularFactor;
    
    this.rigidbody.setLinearFactor(new Ammo.btVector3(linearFactor.x, linearFactor.y, linearFactor.z));
    this.rigidbody.setAngularFactor(new Ammo.btVector3(angularFactor.x, angularFactor.y, angularFactor.z));    
    
    this.rigidbody.entity = this.entity;
    this.app.systems.rigidbody.dynamicsWorld.addRigidBody(this.rigidbody);
    this.entity.rigidbody.body = this.rigidbody;
};


ConvexHull.prototype.prepareTriangles = function() {
    var model = this.entity.model;
    var i, j;
    var triangles = [];
    for (i = 0; i < model.meshInstances.length; i++) {
        var meshInstance = model.meshInstances[i];
        var mesh = meshInstance.mesh;
        var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
        var vb = mesh.vertexBuffer;

        var format = vb.getFormat();
        var stride = format.size / 4;
        var positions;
        for (j = 0; j < format.elements.length; j++) {
            var element = format.elements[j];
            if (element.name === pc.SEMANTIC_POSITION) {
                positions = new Float32Array(vb.lock(), element.offset);
            }
        }

        var indices = new Uint16Array(ib.lock());
        var numTriangles = mesh.primitive[0].count / 3;

        var v1 = new Ammo.btVector3();
        var v2 = new Ammo.btVector3();
        var v3 = new Ammo.btVector3();
        var i1, i2, i3;

        var base = mesh.primitive[0].base;
        for (j = 0; j < numTriangles; j++) {
            i1 = indices[base + j * 3] * stride;
            i2 = indices[base + j * 3 + 1] * stride;
            i3 = indices[base + j * 3 + 2] * stride;
            v1.setValue(positions[i1], positions[i1 + 1], positions[i1 + 2]);
            v2.setValue(positions[i2], positions[i2 + 1], positions[i2 + 2]);
            v3.setValue(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            
            var triangle = [{x: positions[i1], y: positions[i1 + 1], z: positions[i1 + 2]}, {x: positions[i2], y: positions[i2 + 1], z: positions[i2 + 2]}, {x: positions[i3], y: positions[i3 + 1], z: positions[i3 + 2]}];
            triangles.push(triangle);
        }

        return triangles;
    }
};


ConvexHull.prototype.update = function(dt) {

};



// ball.js
/* jshint esversion: 6 */
var Ball = pc.createScript('ball');

Ball.attributes.add('isCannonBall', {
    type: 'boolean',
    default: false,
});

Ball.attributes.add('isColorBall', {
    type: 'boolean',
    default: false,
});


Ball.prototype.initialize = function() {

    this.entity.lifeTimer = GameplayController.ballLifeTime;
    this.entity.ready = true;
    this.entity.started = false;
    this.entity.enabled = true;

    this.entity.setColor = function(color) {
        this.materialIndex = color;
        this.model.meshInstances[0].material = MaterialsStorage.levelMaterials[this.materialIndex].resource;
    }.bind(this.entity);
    
    this.entity.setPosition(0, -3, 0);
    this.entity.setLocalEulerAngles(0, 0, 0);
    this.entity.rigidbody.type = pc.BODYTYPE_STATIC; 
     if (!this.isCannonBall && !this.isColorBall && !this.launched) {
        this.entity.setColor(Utils.getRandomItem(HierarchyManager.getInstance().getByPath("Tower").script.towerController.getAvailableColors()));
    }
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.entity.rigidbody.group = BallController.BODYGROUP_BALL;
    this.entity.rigidbody.mask = pc.BODYMASK_ALL ^ BallController.BODYGROUP_BALL;       
    
    this.entity.on("destroy", this.destroy, this);    
        
    if(this.entity.launched && this.entity.launchPosition) {

        this.entity.setPosition(this.entity.launchPosition);
        this.entity.started = true;
        
        this.entity.materialIndex = -1;
        this.entity.model.meshInstances[0].material = this.app.assets.find("Color Ball Material").resource;
        
        this.entity.setLocalScale(0.8, 0.8, 0.8);
        this.entity.collision.radius = 0.8 / 2;
        
        this.shoot(this.entity.launchTarget, this.entity.launchTarget.getPosition(), false);
        
        const currentVelocity = this.entity.rigidbody.linearVelocity;
        this.entity.rigidbody.linearVelocity = new pc.Vec3(currentVelocity.x, this.entity.launchVelocity.y + pc.math.random(-7, 7), currentVelocity.z);

    } else {
        const targetScale = (this.isCannonBall || this.isColorBall) ? this.entity.getLocalScale().clone() : new pc.Vec3(1.3, 1.3, 1.3);
        const startScale = (this.isCannonBall || this.isColorBall) ? new pc.Vec3(targetScale.x / 4, targetScale.y / 4, targetScale.z / 4) : new pc.Vec3(0.25, 0.25, 0.25);
        this.entity.setLocalScale(startScale);
        this.entity.tween(this.entity.getLocalScale())
           .to(targetScale, 0.35, pc.BackOut)
           .onComplete(() => {

            })
           .start();
    }  
};

Ball.prototype.update = function(dt) {
    if(!this.entity.started) {
        const cameraToTowerCenterDistance = HierarchyManager.getInstance().getByPath("Camera").script.orbitCamera.distance;
        const ballPosition = this.entity.getLocalPosition();
        if(GameplayController.mobileLandscapeMode) {
            
            if(this.isCannonBall) {
                ballPosition.z = -0.4 * cameraToTowerCenterDistance;
                ballPosition.y = -4.9 - Math.sin(5 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else if(this.isColorBall) {
                ballPosition.z = -0.19 * cameraToTowerCenterDistance;
                ballPosition.y = -2.475 - Math.sin(7 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else {
                ballPosition.z = -0.28 * cameraToTowerCenterDistance;
                ballPosition.y = -3.55 - Math.sin(6 * pc.math.DEG_TO_RAD) * ballPosition.z;
            }    
            
        } else {
            
             if(this.isCannonBall) {
                ballPosition.z = -0.385 * cameraToTowerCenterDistance;
                ballPosition.y = -6.0 - Math.sin(5 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else if(this.isColorBall) {
                ballPosition.z = -0.18 * cameraToTowerCenterDistance;
                ballPosition.y = -3.1 - Math.sin(7 * pc.math.DEG_TO_RAD) * ballPosition.z;
            } else {
                ballPosition.z = -0.28 * cameraToTowerCenterDistance;
                ballPosition.y = -4.5 - Math.sin(6 * pc.math.DEG_TO_RAD) * ballPosition.z;
            }    
        }
       
                
        this.entity.setLocalPosition(ballPosition);
    } else {
        if(this.entity.autoDestroy) {
            this.entity.autoDestroyTimer -= dt;
            this.entity.flightTimer += dt;
            if(this.entity.targetObject) {
                const ballToTargetDistance = Utils.distanceBetweenEntities(this.entity.targetObject.getPosition(), this.entity.getPosition());
                if(ballToTargetDistance <= this.entity.autoDestroyMinDistanceToTarget) {
                    this.entity.autoDestroyMinDistanceToTarget = ballToTargetDistance;
                    this.entity.autoDestroyMinDistanceTimestamp = this.entity.flightTimer;
                }
            }
            if(this.entity.autoDestroyTimer <= 0) {  
                if(this.isCannonBall) {
                    this.entity.destroy();
                    return;
                } else if(this.isColorBall) {
                    this.app.fire("colorball:break", this.entity.getPosition().clone(), this.entity.targetObject, this.entity.rigidbody.linearVelocity.clone());
                    this.entity.destroy();
                    return;
                } else if(this.entity.targetObject && Math.abs(this.entity.flightTimer - this.entity.calculatedFlightTime) < (this.entity.autoDestroyMinDistanceToTarget / this.entity.initialSpeed) * 3) {
                    this.app.fire("tower:hit", this.entity.targetObject);
                    this.entity.destroy();
                    return;
                }
            }
        }
        
        this.entity.lifeTimer -= dt;
        if(this.entity.lifeTimer <= 0) {
            this.entity.destroy();
        }
    }
};

Ball.prototype.shoot = function(targetEntity, targetPosition, autoDestroyTarget) {
    if(this.entity.ready) {
              
        this.entity.autoDestroy = autoDestroyTarget;
        this.entity.targetObject = (this.entity.autoDestroy || this.isColorBall) ? targetEntity : null;
         
        const ballPosition = this.entity.getPosition();
        this.entity.rigidbody.type = pc.BODYTYPE_DYNAMIC;
        this.entity.rigidbody.mass = this.isCannonBall ? (targetEntity.rigidbody.mass * 100) : TowerBuilder.calculateItemMass(TowerBuilder.towerMaxHeight + 20);//0.0000001;
        this.entity.rigidbody.group = BallController.BODYGROUP_BALL;
        this.entity.rigidbody.mask = pc.BODYMASK_ALL ^ BallController.BODYGROUP_BALL;     
        this.entity.rigidbody.applyImpulse(this.getRequiredImpulse(ballPosition, targetPosition, autoDestroyTarget), new pc.Vec3(0, 0, 0));   
        this.entity.rigidbody.body.setCcdMotionThreshold(GameplayController.CCDMotionThreshold);
        this.entity.rigidbody.body.setCcdSweptSphereRadius(GameplayController.CCDSweptSphereRadius);
        
        if(this.entity.parent) {
            this.entity.parent.removeChild(this.entity);
        }        
        
        if(this.isCannonBall) {
            GameplayController.currentSession.destructionCause = 'cannonball';
            this.app.fire("cannon:launch");
            this.app.fire("audio:play", "cannonBall");
            Utils.vibrate(100);
            Apicontroller.trackStats("projectile_shot", {
                shot_type: 'cannonball'
            });
            window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                eventName: "GA:Design",
                eventId: "Level" + GameplayController.currentLevel + ':ProjectileShot:Cannonball'
            });

        } else if(this.isColorBall) {            
            GameplayController.currentSession.destructionCause = 'colorball';
            this.app.fire("audio:play", Math.random() < 0.5 ? "throw01" : "throw02");
            this.app.fire("colorball:launch");            
            Apicontroller.trackStats("powerup_used", {"powerup_type": "colorball"});
            Apicontroller.trackStats("projectile_shot", {
                shot_type: 'colorball'
            });
            window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                eventName: "GA:Design",
                eventId: "Level" + GameplayController.currentLevel + ':ProjectileShot:Colorball'
            });
        } else if(this.entity.launched) {
            //do nothing
        } else {
            GameplayController.currentSession.destructionCause = 'ball';
            this.app.fire("ball:launch");
            this.app.fire("audio:play", Math.random() < 0.5 ? "throw01" : "throw02");
            if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
                Apicontroller.trackStats("projectile_shot", {
                    shot_type: 'ball',
                    color: this.entity.model.meshInstances[0].material.name
                });
                window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                    eventName: "GA:Design",
                    eventId: "Level" + GameplayController.currentLevel + ':ProjectileShot:' +this.entity.model.meshInstances[0].material.name
                });
            }
        }
        
        if(!this.isCannonBall && !this.isColorBall && !this.entity.launched) {
            GameplayController.currentSession.lastBallColor = this.entity.materialIndex;
        }
       
        HierarchyManager.getInstance().getByPath("TrashContainer").addChild(this.entity);
        this.entity.started = true;
        return true;
    } else {
        famobi.log("Ball is not ready yet!");
        return false;
    }
};

Ball.prototype.onCollisionStart = function(result) {
    /* hit the ground */
    if(result.other.name.indexOf("Ground") != -1) {
        this.entity.destroy();
    }
    
    /* hit the tower */
    if (result.other.parent && result.other.parent.name === "Tower" && result.other.active && result.other.rigidbody) {
        if(result.other.materialIndex === this.entity.materialIndex || this.entity.launched) {
            this.app.fire("tower:hit", result.other);
            this.entity.destroy();
        } else {
            // famobi.log('Miss');
            this.app.fire("audio:play", Math.random() < 0.5 ? "bounce01" : "bounce02");
        }
    }
};


Ball.prototype.getRequiredImpulse = function(ballPosition, targetPosition) {

        const gravity = -this.app.systems.rigidbody.gravity.y;
    
        const direction = new pc.Vec3(targetPosition.x - ballPosition.x, targetPosition.y - ballPosition.y, targetPosition.z - ballPosition.z);
        const angleXZ = Math.atan2(direction.x, direction.z);
        const displacementY = targetPosition.y - ballPosition.y;
        const displacementXZ = Math.sqrt((targetPosition.x - ballPosition.x) * (targetPosition.x - ballPosition.x) + (targetPosition.z - ballPosition.z) * (targetPosition.z - ballPosition.z));
        const cameraToTowerCenterDistance = HierarchyManager.getInstance().getByPath("Camera").script.orbitCamera.distance;
    
        const x = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
        const y = direction.y;
    
        var speed = Math.min(70, 1.85 * cameraToTowerCenterDistance); 
    
        if(this.isCannonBall) {
           speed *=  1.5 * (1 + 0.25 * (cameraToTowerCenterDistance - GameplayController.cameraToTowerMinDistance) / (GameplayController.cameraToTowerMaxDistance - GameplayController.cameraToTowerMinDistance));
        } else if(this.isColorBall) {
            speed *= 1.0;
        } else if(this.entity.launched) {
            speed *= pc.math.random(1.2, 1.7);
            this.entity.rigidbody.angularVelocity = new pc.Vec3(pc.math.random(-20, 20), 0, 0);
        }
    
        var deltaAngleY = this.entity.launched ? pc.math.random(-Math.PI / 90, Math.PI / 40) : 0;
        var deltaAngleXZ = this.entity.launched ? pc.math.random(-Math.PI / 50, Math.PI / 50) : 0;
    
        const angle1 = Math.atan((speed * speed  + Math.sqrt( Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y) )) / (gravity * x)) + deltaAngleY;
        const angle2 = Math.atan((speed * speed  - Math.sqrt( Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y) )) / (gravity * x)) + deltaAngleY;
    
        const vy = speed * Math.sin(angle2);
        const vx = (this.entity.launched ? Math.min(speed, 75) : speed) * Math.cos(angle2) * Math.sin(angleXZ + deltaAngleXZ); 
        const vz =  (this.entity.launched ? Math.min(speed, 75) : speed) * Math.cos(angle2) * Math.cos(angleXZ + deltaAngleXZ); 
    
        const time = displacementXZ / Math.sqrt(vx * vx + vz * vz);

        if(this.entity.autoDestroy) {
            this.entity.calculatedFlightTime = displacementXZ / Math.sqrt(vx * vx + vz * vz);
            this.entity.targetReachingTimestamp = new Date().getTime() + this.entity.calculatedFlightTime * 1000;
            this.entity.autoDestroyTimer = this.entity.calculatedFlightTime + GameplayController.ballAutoDestroyDelay;
            this.entity.flightTimer = 0;
            this.entity.autoDestroyMinDistanceToTarget = Number.MAX_VALUE;
            this.entity.autoDestroyMinDistanceTimestamp = 0;
        } else if(this.isCannonBall) {
            this.entity.autoDestroy = true;
            this.entity.autoDestroyTimer = GameplayController.cannonBallAutoDestroyTime;
        } else if(this.isColorBall) {
              this.entity.autoDestroy = true;
              this.entity.autoDestroyTimer = time * GameplayController.colorBallBreakingDistance;
        }
        
        this.entity.initialSpeed = Math.sqrt(vx*vx, vy*vy, vz*vz);

        // famobi.log("Angles are ", ~~(angle1 * 180 / Math.PI), ~~(angle2  * 180 / Math.PI), "speed ",  this.entity.initialSpeed);
    
        return new pc.Vec3(vx, vy, vz).scale(this.entity.rigidbody.mass);  
};

Ball.prototype.destroy = function() {
    if(this.entity) {
        this.entity.targetObject = null;
    }
};

// item.js
/* jshint esversion: 6 */
var Item = pc.createScript('item');

Item.attributes.add('collisionDiameter', {
    type: 'number',
    default: 1.6,
    min: 0.1,
    max: 10,
});

Item.attributes.add('collisionHeight', {
    type: 'number',
    default: 1.8,
    min: 0.1,
    max: 10,
});


Item.prototype.initialize = function() {
    this.entity.isTowerChild = true;
    this.entity.on('destroy', this.handleDestroy, this);
};

Item.prototype.handleDestroy = function() {
};

Item.prototype.chainedExplode = function(delay) {
    if(!this.entity.waitingTriggeredDestroy) {
        this.entity.waitingTriggeredDestroy = true;
        const possibleNeightbors = HierarchyManager.getInstance().getByPath("Tower").children.filter(child => child.active && child.materialIndex === this.entity.materialIndex && child != this.entity && Utils.checkContactRough(this.entity, child));
        const triggerController = HierarchyManager.getInstance().getByPath("Triggers").script.triggersController;
        if(delay > 0) {
            this.entity.delayedCall(delay, () => triggerController.createTriggerInsteadOfBody(this.entity, possibleNeightbors));
        } else {
            triggerController.createTriggerInsteadOfBody(this.entity, possibleNeightbors);
        }
    }
};

Item.prototype.explode = function(delay, levelCompleted) {
    this.killItem(delay, levelCompleted);
};

Item.prototype.killItem = function(delay, levelCompleted) {  
   if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
         Apicontroller.trackStats('blocks_destroyed', {
            block_color: this.entity.model.meshInstances[0].material.name, 
            destruction_type: 'popped',
            destruction_cause: GameplayController.currentSession.destructionCause
        });
        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Design",
            eventId: "Level" + GameplayController.currentLevel + ':BlockDestroyedBy:'+ GameplayController.currentSession.destructionCause
        });
   }
  
     
   return this.entity.delayedCall(delay, () => {
       if(!this.entity.killed) {
            this.entity.killed = true;
                       
            var position = this.entity.getPosition();
            this.app.fire("explosion", position.x, position.y, position.z, this.entity.materialIndex, (levelCompleted ? 5 : Math.ceil(GameplayController.particlesPerObject)));
            if(this.entity.rigidbody) {
                this.removeFromTower();
                this.entity.destroy();
            } else {
                this.removeFromTower();
                this.entity.destroy();
            }
       }  
   });
};


Item.prototype.update = function(dt) {
    var pos; 
    if(this.entity.drowning) {
        
        var vel =  this.entity.rigidbody.linearVelocity;
        vel.y += this.app.systems.rigidbody.gravity.y * 0.02 * dt;
        this.entity.rigidbody.linearVelocity.set(vel.x * 0.99, vel.y, vel.z * 0.99);
      
        this.entity.drownTimer -= dt;
        if(this.entity.drownTimer <= 0) {
            this.entity.destroy();            
        }
        
    } else if(this.entity.floating) {
        
        this.entity.rigidbody.linearVelocity.set(this.entity.floatingVelocity.x * dt, Math.sin(this.entity.phasis) * this.entity.yMultiplier, this.entity.floatingVelocity.z * dt);
        this.entity.phasis += dt * this.entity.phasisSpeed;
        
        this.entity.floatTimer -= dt;
        if(this.entity.floatTimer <= 0) {
            this.entity.drowning = true;           
        }
    } else if(this.entity.falling) {
        
        pos = this.entity.getPosition();
        this.entity.rigidbody.applyForce(new pc.Vec3(0, (-pos.y * 5) * this.entity.rigidbody.mass - this.app.systems.rigidbody.gravity.y * this.entity.rigidbody.mass , 0));
        
        this.entity.fallTimer -= dt;
        if(this.entity.fallTimer <= 0) {            
            this.entity.floating = true;
            this.entity.rigidbody.type = pc.BODYTYPE_KINEMATIC; 
            this.entity.phasis = 0;
            this.entity.rigidbody.linearVelocity.set(0, 0, 0);
        }
    } else {
        if(this.entity.removedFromTower && !this.entity.killed) {
            pos = this.entity.getPosition();
            if(pos.y < 0 && !this.entity.isWaterHit) {
                this.hitWater();
            }
        }      
    }
};

Item.prototype.removeFromTower = function() {
    this.entity.removedFromTower = true;
    if(this.entity.rigidbody) {
        this.entity.rigidbody.linearDamping = 0.15;
        this.entity.rigidbody.angularDamping = 0.1;
    }
    if(this.entity) {
        if(this.entity.parent) {
            this.entity.parent.removeChild(this.entity);
        }
        HierarchyManager.getInstance().getByPath("TrashContainer").addChild(this.entity);  
    }
    this.app.fire("item:destroy");
};

Item.prototype.hitWater = function() {
    this.entity.isWaterHit = true;

    var tower = HierarchyManager.getInstance().getByPath("Tower");
    var towerHeight = tower.currentHeight || 1;
    if(Math.random() < Math.min(0.3 + towerHeight * 0.014, 0.9)) {
        var velocity =  this.entity.rigidbody.linearVelocity;
        velocity.y *= pc.math.random(0.1, 0.25);
        this.entity.rigidbody.linearVelocity = new pc.Vec3(velocity.x, velocity.y, velocity.z);
        this.entity.collision.on('collisionstart', this.onCollisionStart, this);
        
        if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
            Apicontroller.trackStats('blocks_destroyed', {
                block_color: this.entity.model.meshInstances[0].material.name, 
                destruction_type: 'sunken',
                destruction_cause: GameplayController.currentSession.destructionCause
            });
            window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                eventName: "GA:Design",
                eventId: "Level" + GameplayController.currentLevel + ':BlockDestroyedBy:'+ GameplayController.currentSession.destructionCause
            });
        }
        
        return;
    }
    
    this.entity.rigidbody.mass = 1;
    this.entity.rigidbody.linearVelocity = new pc.Vec3(0, this.entity.rigidbody.linearVelocity.y * 0.2, 0);
    this.entity.falling = true;
    this.entity.floating = false;
    this.entity.drowning = false;
    this.entity.floatingVelocity = new pc.Vec3(pc.math.random(20, 50) * Math.cos(Math.atan2(this.entity.getPosition().z, this.entity.getPosition().x)), 0, pc.math.random(20, 50) * Math.sin(Math.atan2(this.entity.getPosition().z, this.entity.getPosition().x)));
    this.entity.fallTimer = GameplayController.itemFallingTime * pc.math.random(0.8, 1.6);
    this.entity.floatTimer = GameplayController.itemLifeTime * pc.math.random(0.75, 1.25);
    this.entity.drownTimer = GameplayController.itemDrownTime * pc.math.random(0.75, 1.25);
    this.entity.rigidbody.linearDamping = 0.7;
    this.entity.rigidbody.angularDamping = 0.65;
    
    this.entity.phasis = 0;
    this.entity.phasisSpeed = pc.math.random(Math.PI * 0.4, Math.PI * 0.8);
    this.entity.yMultiplier = pc.math.random(0.3, 0.6);
    
    if(this.entity.model && this.entity.model.meshInstances && this.entity.model.meshInstances[0] && this.entity.model.meshInstances[0].material && this.entity.model.meshInstances[0].material.name) {
        Apicontroller.trackStats('blocks_destroyed', {
            block_color: this.entity.model.meshInstances[0].material.name, 
            destruction_type: 'sunken',
            destruction_cause: GameplayController.currentSession.destructionCause
        });
         window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Design",
            eventId: "Level" + GameplayController.currentLevel + ':BlockDestroyedBy:'+ GameplayController.currentSession.destructionCause
        });
    }
};

Item.prototype.onCollisionStart = function(result) {
    /* hit the ground */
    if(result.other.name.indexOf("Ground") != -1) {
        this.entity.collision.off('collisionstart', this.onCollisionStart, this);
        this.entity.destroy();
    }
};

// progressBar.js
var ProgressBar = pc.createScript('progressBar');

ProgressBar.attributes.add('progressImage', {type: 'entity'});
ProgressBar.attributes.add('progressImageMaxWidth', {type: 'number'});
ProgressBar.attributes.add('cannonProgressImage', {type: 'entity'});
ProgressBar.attributes.add('cannonProgressImageMaxWidth', {type: 'number'});

ProgressBar.attributes.add('progressImageVertical', {type: 'entity'});
ProgressBar.attributes.add('progressImageVerticalMaxHeight', {type: 'number'});
ProgressBar.attributes.add('cannonProgressImageVertical', {type: 'entity'});
ProgressBar.attributes.add('cannonProgressImageVerticalMaxHeight', {type: 'number'});

ProgressBar.prototype.initialize = function() {
    this.entity.currentScoresText = this.entity.findByName('CurrentScoresText');
    this.entity.currentScoresTextLandscape = this.entity.findByName('CurrentScoresTextLandscape');
    
    this.entity.horizontalBar = this.entity.findByName('LevelProgressBar');
    this.entity.verticalBar = this.entity.findByName('LevelProgressBarVertical');
    this.entity.progressLineContainer = this.entity.verticalBar.findByName('ProgressLineContainer');
    
    this.entity.powerupIconActiveHorizontal = this.entity.horizontalBar.findByName('PowerUpBar_IconActive');
    this.entity.powerupIconActiveVertical = this.entity.verticalBar.findByName('PowerUpBar_IconActive');
    
    this.reset();
    this.app.on("level:progress", this.setProgress, this);
    this.app.on("cannon:progress", this.setCannonProgress, this);
    this.app.on("level:clear", this.reset, this);
};

ProgressBar.prototype.reset = function () {   
    this.entity.currentValue = 0;
    this.entity.cannonValue =  this.entity.cannonValue || 0;
    this.setProgress(0);
    this.setCannonProgress(0);
};

ProgressBar.prototype.setProgress = function (value) {   
    this.entity.tween(this.entity)
        .to({currentValue: pc.math.clamp(value, 0, 1)}, 0.25, pc.SineOut)
        .start();
};

ProgressBar.prototype.setCannonProgress = function (value) {   
    this.entity.tween(this.entity)
        .to({cannonValue: pc.math.clamp(value, 0, 1)}, 0.25, pc.SineOut)
        .start();
};

ProgressBar.prototype.update = function(dt) {
        /* vertical */
        this.entity.verticalBar.findByName("CurrentLevelText").element.text = '' + GameplayController.currentLevel;
        this.entity.verticalBar.findByName("NextLevelText").element.text = '' + (GameplayController.currentLevel + 1);
        this.entity.verticalBar.findByName("ProgressText").element.text = '' + Math.floor(this.entity.currentValue * 100) + "%";

        var height = pc.math.lerp(0, this.progressImageVerticalMaxHeight, this.entity.currentValue);
        this.progressImageVertical.element.height = height;
        this.progressImageVertical.element.rect.w = this.entity.currentValue;

        var cannonImageHeight = pc.math.lerp(0, this.cannonProgressImageVerticalMaxHeight, this.entity.cannonValue);
        this.cannonProgressImageVertical.element.height = cannonImageHeight;
        this.cannonProgressImageVertical.element.rect.w = this.entity.cannonValue;    
        this.entity.powerupIconActiveVertical.enabled = this.entity.cannonValue >= 1;

    
        var pos = this.entity.progressLineContainer.getLocalPosition();
        pos.y = pc.math.clamp(- this.progressImageVerticalMaxHeight / 2 + height, - this.progressImageVerticalMaxHeight / 2, this.progressImageVerticalMaxHeight / 2 - 6);
        this.entity.progressLineContainer.setLocalPosition(pos);
        
    
        /* horizontal */
        this.entity.horizontalBar.findByName("CurrentLevelText").element.text = '' + GameplayController.currentLevel;
        this.entity.horizontalBar.findByName("NextLevelText").element.text = '' + (GameplayController.currentLevel + 1);
        this.entity.horizontalBar.findByName("ProgressText").element.text = '' + Math.floor(this.entity.currentValue * 100) + "%";

        var width = pc.math.lerp(0, this.progressImageMaxWidth, this.entity.currentValue);
        this.progressImage.element.width = width;
        this.progressImage.element.rect.z = this.entity.currentValue;

        var cannonImageWidth = pc.math.lerp(0, this.cannonProgressImageMaxWidth, this.entity.cannonValue);
        this.cannonProgressImage.element.width = cannonImageWidth;
        this.cannonProgressImage.element.rect.z = this.entity.cannonValue;   
        this.entity.powerupIconActiveHorizontal.enabled = this.entity.cannonValue >= 1;
   
      if(GameplayController.mobileLandscapeMode) {
            this.entity.horizontalBar.enabled = false;
            this.entity.verticalBar.enabled = true;
            this.entity.currentScoresText.enabled = false;
            this.entity.currentScoresTextLandscape.enabled = true;
      } else {
            this.entity.horizontalBar.enabled = true;
            this.entity.verticalBar.enabled = false;
            this.entity.currentScoresText.enabled = true;
            this.entity.currentScoresTextLandscape.enabled = false;
      }

};


// towerConfig.js
var TowerConfig = pc.createScript('towerConfig');

TowerConfig.attributes.add('towerHeight', {
    title: "Tower height",
    type: 'number',
    default: 8,
    min: 1,
    max: 300,
    step: 1
});

TowerConfig.attributes.add('itemHeight', {
    title: "Single item height",
    type: 'number',
    default: 1.8,
    min: 0.1,
    max: 5,
});

TowerConfig.attributes.add('numBalls', {
    title: "Num balls",
    type: 'number',
    default: 25,
    min: 10,
    max: 150,
});

TowerConfig.attributes.add('numColors', {
    title: "Colors",
    type: 'number',
    default: 5,
    min: 2,
    max: 15,
});

TowerConfig.attributes.add('difficulty', {
    title: "Difficulty",
    type: 'number',
    default: 1,
    enum: [
        { 'easy': 1 },
        { 'medium': 2 },
        { 'hard': 3 }
    ]
});

TowerConfig.attributes.add('victoryLayersLimit', {
    title: "Max layers limit to win",
    type: 'number',
    default: 2,
    min: 1,
    max: 5,
    step: 1,
});

TowerConfig.attributes.add('physicalScale', {
    type: 'number',
    default: 0.965,
    min: 0.01,
    max: 2,
});

TowerConfig.attributes.add('friction', {
    type: 'number',
    default: 0.98,
    min: 0,
    max: 1,
});

TowerConfig.attributes.add('restitution', {
    type: 'number',
    default: 0.005,
    min: 0,
    max: 1,
});

TowerConfig.attributes.add('linearDamping', {
    type: 'number',
    default: 0.45,
    min: 0,
    max: 1,
});

TowerConfig.attributes.add('angularDamping', {
    type: 'number',
    default: 0.35,
    min: 0,
    max: 1,
});

TowerConfig.attributes.add('collisionScale', {
    type: 'number',
    default: 1.05,
    min: 1,
    max: 2,
});

TowerConfig.attributes.add('readyToUse', {
    type: 'boolean',
    default: false
});

TowerConfig.attributes.add('debugLock', {
    title: "Debug lock",
    type: 'boolean',
    default: false
});


TowerConfig.prototype.initialize = function() {
    
};

// update code called every frame
TowerConfig.prototype.update = function(dt) {
    
};



// resultsWindow.js
/* jshint esversion: 6 */
var ResultsWindow = pc.createScript('resultsWindow');

ResultsWindow.prototype.initialize = function () {

    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRestart = this.entity.findByName("ButtonRestart");
    this.entity.background = this.entity.findByName("Background");
    this.entity.scoreGroup = this.entity.findByName("ScoreGroup");
    this.entity.maxScoreGroup = this.entity.findByName("MaxScoreGroup");
    this.entity.coinsGroup = this.entity.findByName("CoinsGroup");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");
    this.entity.coinsText = this.entity.coinsGroup.findByName("Text");
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.buttonMoreCoins = this.entity.coinsGroup.findByName("GetCoinsButton");
    this.entity.buttonMoreCoinsText = this.entity.buttonMoreCoins.findByName("Text");

    Utils.assignAction(this.entity.buttonRestart, this.restartPressed, this);
    Utils.assignAction(this.entity.buttonMoreCoins, this.acquireMoreCoinsPressed, this);

    const scriptContext = this;

    /* show method */
    this.entity.show = function () {
        this.enabled = true;

        scriptContext.app.fire("app:save");
        scriptContext.app.fire("audio:play", "victory");

        if (scriptContext.buttonRestartTween && scriptContext.buttonRestartTween.playing) {
            scriptContext.buttonRestartTween.stop();
        }

        this.buttonRestart.setLocalScale(0, 0, 0);


        var showButtons = (delay) => {
            /* tween buttons */
            scriptContext.buttonRestartTween = this.buttonRestart
                .tween(this.buttonRestart.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
                .delay(delay)
                .start();
        };

        if (window.famobi_analytics) {
            setTimeout(() => {
                Promise.all([
                    window.famobi_analytics.trackEvent(
                        "EVENT_LEVELSUCCESS",
                        {
                            levelName: '' + (GameplayController.justPassedLevel || GameplayController.currentLevel)
                        }
                    ),
                    window.famobi_analytics.trackEvent(
                        "EVENT_TOTALSCORE",
                        {
                            totalScore: GameplayController.sessionScores
                        }
                    ),
                    window.famobi_analytics.trackEvent(
                        "EVENT_LEVELSCORE",
                        {
                            levelName: '' + (GameplayController.justPassedLevel || GameplayController.currentLevel),
                            levelScore: GameplayController.sessionScores
                        }
                    )
                ]).then(() => showButtons(1.4), () => showButtons(1.4));
            }, 500);
        } else {
            showButtons(1.85);
        }

        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({ opacity: 0.94 }, 0.25, pc.Linear)
            .start();

        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween =
            this.headingIcon.tween(this.headingIcon.element)
                .to({ opacity: 0.9 }, 0.5, pc.Linear)
                .delay(0.25);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween =
            this.headingIcon.tween(this.headingIcon.getLocalPosition())
                .to(new pc.Vec3(0, 0, 0), 0.9, pc.SineOut)
                .delay(0.2);

        headingAppearingTween.chain(headingMovingTween).start();

        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween =
            this.headingIcon.tween(this.headingIcon.getLocalScale())
                .to(new pc.Vec3(1.5, 1.5, 1.5), 0.55, pc.BackOut)
                .delay(0.25);

        var headingMovingScaleTween =
            this.headingIcon.tween(this.headingIcon.getLocalScale())
                .to(new pc.Vec3(1.0, 1.0, 1.0), 0.9, pc.SineOut)
                .delay(0.1);

        headingAppearingScaleTween.chain(headingMovingScaleTween).start();

        /* tween text groups */
        this.scoreGroup.setLocalScale(0, 0, 0);
        this.scoreGroup.tween(this.scoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.35)
            .start();

        this.maxScoreGroup.setLocalScale(0, 0, 0);
        this.maxScoreGroup.tween(this.maxScoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.5)
            .start();

        this.coinsGroup.setLocalScale(0, 0, 0);
        this.coinsGroup.tween(this.coinsGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.65)
            .start();

        if (Apicontroller.hasRewardedVideo()) {
            this.buttonMoreCoins.coinsValue = pc.math.clamp(GameplayController.lastLevelCoins || 10, 10, 99);
            this.buttonMoreCoins.enabled = true;
            this.buttonMoreCoinsText.element.text = '+' + this.buttonMoreCoins.coinsValue;
            this.buttonMoreCoins.setLocalScale(0, 0, 0);
            this.buttonMoreCoins.tween(this.buttonMoreCoins.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
                .delay(2.5)
                .start();
        } else {
            this.buttonMoreCoins.enabled = false;
        }

        /* tween texts */
        const textTweenDelay = 1.75;
        if (GameplayController.sessionScores > 0) {
            this.delayedCall(textTweenDelay * 1000, () => scriptContext.app.fire("audio:unmute", "counting", 0.9));
            this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire("audio:mute", "counting"));
        }

        Utils.tweenText(this.scoreText, 0, GameplayController.sessionScores, 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, 0, GameplayController.maxScores, 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        Utils.tweenText(this.coinsText, 0, GameplayController.coins, 0.5, textTweenDelay + 0.5, pc.SineOut, true);

        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if (GameplayController.maxScores === GameplayController.sessionScores) {

            this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                .to({ opacity: 1 }, 0.3, pc.Linear)
                .delay(textTweenDelay + 1)
                .onComplete(() => {
                    scriptContext.app.fire('audio:play', 'newBest');
                })
                .onUpdate(() => {
                    this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 60, 0, 0);
                })
                .start();

            this.newBestScoreIcon.tween(this.newBestScoreIcon.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.42, pc.BackOut)
                .delay(textTweenDelay + 1)
                .start();
        }

    }.bind(this.entity);


    /* hide method */
    this.entity.hide = function () {
        this.enabled = false;
    }.bind(this.entity);

    this.entity.hide();
};


ResultsWindow.prototype.update = function (dt) {

};

ResultsWindow.prototype.restartPressed = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Results:Restart",
    });

    window.famobi.showInterstitialAd({
        eventId: "Button:Results:Restart",
        callback: () => {
           TransitionScreen.instance.transitionTo(() => {
                this.app.fire("tower:next");
                this.app.fire("gameplay:start");
            });
        }
    });
};

ResultsWindow.prototype.homePressed = function () {

};

ResultsWindow.prototype.acquireMoreCoinsPressed = function () {
    var previousCoinsValue = GameplayController.coins;
    var rewardAmount = this.entity.buttonMoreCoins.coinsValue || 10;
    Apicontroller.showRewardedVideo((result) => {
        if (result && result.rewardGranted) {
            GameplayController.addCoins(rewardAmount);
            Utils.tweenText(this.entity.coinsText, previousCoinsValue, GameplayController.coins, 0.5, 0.1, pc.SineOut, true);
            this.app.fire("app:save");
            this.app.fire("audio:play", "purchaseDone");
            this.entity.delayedCall(0, () => this.app.fire("audio:unmute", "counting", 0.9));
            this.entity.delayedCall(0.5 * 1000, () => this.app.fire("audio:mute", "counting"));
            famobi.log(rewardAmount + ' coins added');
        }
    });
    this.entity.buttonMoreCoins.enabled = false;
};


// transitionScreen.js
/* jshint esversion: 6 */
var TransitionScreen = pc.createScript('transitionScreen');

TransitionScreen.prototype.initialize = function() {
    const scriptingContext = this;

    TransitionScreen.app = this.app;
    TransitionScreen.instance = this.entity;
    
    this.entity.transitionTo = function(callback, callbackContext, completeCallback, completeCallbackContext) {

        this.element.opacity = 0;
        this.tween(this.element)
            .to({opacity: 1.0}, 0.25, pc.SineOut)
             .onComplete(() => {

                    if(callback) {
                        if(callbackContext) {
                            callback.apply(callbackContext);
                        } else {
                            callback();
                        }
                    }

                    scriptingContext.hidePopups();

                    this.tween(this.element)
                    .to({opacity: 0.0}, 0.4, pc.Linear)
                    .onComplete(() => {
                        if(completeCallback) {
                             if(completeCallbackContext) {
                                completeCallback.apply(completeCallbackContext);
                            } else {
                                completeCallback();
                            }
                        }
                    })
                    .start();

            })
            .start();
        
        
    }.bind(this.entity);
    
    
     this.entity.hidePreloader = function(callback, callbackContext) {
        this.element.opacity = 1;
        this.tween(this.element)
            .to({opacity: 0}, 0.25, pc.Linear)
             .onComplete(() => {
                    if(callback) {
                        if(callbackContext) {
                            callback.apply(callbackContext);
                        } else {
                            callback();
                        }
                    }
            })
            .start();
    }.bind(this.entity);
    
    /* Initial opacity, while preloader is visible */
    this.entity.element.opacity = 0;
};

TransitionScreen.prototype.update = function(dt) {
    
};

TransitionScreen.prototype.hidePopups = function() {
    const resultsWindow = this.app.root.findByName("ResultsWindow");
    if(resultsWindow) {
        resultsWindow.hide();
    }
};

// scaleManager.js
/* jshint esversion: 6 */
var ScaleManager = pc.createScript('scaleManager');

ScaleManager.attributes.add('minPortraitScreenRatio', {
    type: 'number',
    default: 0.5625
});

ScaleManager.attributes.add('landscapeBlend', {
    type: 'number',
    default: 0.75
});

ScaleManager.attributes.add('portraitBlend', {
    type: 'number',
    default: 0
});

ScaleManager.attributes.add('mainLight', {
    title: "Main light",
    type: 'entity'
});

ScaleManager.attributes.add('autoShadows', {
    type: 'boolean',
    default: false
})

ScaleManager.getInstance = function () {
    if (!ScaleManager._instance) console.error('ScaleManager is not initialized yet');
    return ScaleManager._instance;
};

ScaleManager.prototype.initialize = function () {
    ScaleManager._app = this.app;
    if (!ScaleManager._instance) {
        ScaleManager._instance = this;
    }

    this.app.graphicsDevice.on('resizecanvas', this.onCanvasResized, this);
    this.on('attr:landscapeBlend', this.refresh, this);
    this.on('attr:portraitBlend', this.refresh, this);
    this.on('attr:mainLight', this.refresh, this);
    this.app.on('shadows:setEnabled', this.updateShadowsSettings, this);
    
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};

ScaleManager.prototype.update = function(dt) {
    
};

ScaleManager.prototype.refresh = function() {
    this.onCanvasResized(this.app.graphicsDevice.canvas.width, this.app.graphicsDevice.canvas.height);
};

ScaleManager.prototype.updateShadowsSettings = function(shadowsEnabled) {
    if(this.mainLight && this.autoShadows) {
        if(this.mainLight.light.castShadows !== shadowsEnabled) {
            this.mainLight.light.castShadows = shadowsEnabled;
        }
    }
};

ScaleManager.prototype.onCanvasResized = function(width, height) {
    const isLandscape = this.isLandscape();
    const scaleBlend = isLandscape ? this.landscapeBlend : this.portraitBlend;
    const fireResizedEvent = () => {
        this.app.fire('screen:resized', width, height, isLandscape);
        this.app.fire('viewport:resize', width, height);
        this.app.fire('screen:setScaleBlend', scaleBlend);
    };
    
    setTimeout(() => fireResizedEvent(), 0);
    
    if(pc.platform.ios) {
        setTimeout(() => fireResizedEvent(), 500);
    }
};


ScaleManager.prototype.isLandscape = function() {
    return (this.app.graphicsDevice.canvas.width / this.app.graphicsDevice.canvas.height) >= this.minPortraitScreenRatio;    
};


ScaleManager.prototype.isPortrait = function() {
    return !this.isLandscape();
};

ScaleManager.prototype.getWidth = function() {
    return this.app.graphicsDevice.canvas.width * this.app.graphicsDevice.maxPixelRatio;
};


ScaleManager.prototype.getHeight = function() {
    return this.app.graphicsDevice.canvas.height * this.app.graphicsDevice.maxPixelRatio;
};


// soundController.js
/* jshint esversion: 6 */
var SoundController = pc.createScript('soundController');

SoundController.soundStateLoaded = false;
SoundController.audioEnabled = true;
SoundController.musicEnabled = true;
SoundController.masterVolume = 1.0;
SoundController.apiVolumeMultiplier = 1.0;

SoundController.prototype.initialize = function() {
    this.soundStorage = this.app.root.findByName("SoundStorage");
    this.musicStorage = this.app.root.findByName("MusicStorage");

    this.app.on("audio:play", this.playSound, this);
    this.app.on("audio:stop", this.stopSound, this);
    this.app.on("audio:mute", this.muteSound, this);
    this.app.on("audio:unmute", this.unmuteSound, this);
    this.app.on("audio:enable", this.enableAudio, this);
    this.app.on("audio:disable", this.disableAudio, this);
    this.app.on("music:enable", this.enableMusic, this);
    this.app.on("music:disable", this.disableMusic, this);
    this.app.on("audio:setMasterVolume", this.setMasterVolume, this);
    this.app.on("audio:setVolumeMultiplier", this.setVolumeMultiplier, this);
    this.app.fire("audio:stateChanged", SoundController.audioEnabled);
    this.app.fire("music:stateChanged", SoundController.musicEnabled);
    
    /** ios suspended context fix */
    this._applyIOSAudioContextFix();

    /* fetch and apply master volume */
    this.setMasterVolume(window.famobi.getVolume());
    
    this.app.on('playMusic', () => {
        this.musicStorage.sound.slot('melody').play(); 
    });
};

SoundController.prototype.update = function(dt) {
    
};

SoundController.prototype._applyIOSAudioContextFix = function () {
    if (pc.platform.ios) {
        this.app.touch.on(pc.EVENT_TOUCHEND, () => {
            if (this.app.soundManager.context.state === 'interrupted' || this.app.soundManager.context.state === 'suspended') {
                this.app.soundManager.context.resume().then(() => {
                    console.log('[iOS audio] Audio context restored')
                }).catch(e => {
                    console.log('[iOS audio] Can not resume audio context')
                });
            }
        });
    }
}

SoundController.prototype.playSound = function(key, debounceDelay) {
    if(debounceDelay) {
         var currentTimestamp = new Date().getTime();
         var lastTimestamp = this.soundStorage.sound.slot(key).lastTimeStamp;
         if(lastTimestamp && currentTimestamp - lastTimestamp < debounceDelay) {
             return;
         }
         this.soundStorage.sound.slot(key).lastTimeStamp = currentTimestamp;
    }
    this.soundStorage.sound.play(key);
};

SoundController.prototype.stopSound = function(key) {
    this.soundStorage.sound.stop(key);
};

SoundController.prototype.muteSound = function(key) {
    this.soundStorage.sound.slot(key).volume = 0;
};

SoundController.prototype.unmuteSound = function(key, volume) {
    this.soundStorage.sound.slot(key).volume = volume;
};

SoundController.prototype.enableAudio = function() {
    SoundController.audioEnabled = true;
    SoundController.masterVolume = window.famobi.getVolume();
    this.updateVolume();
    this.app.fire("audio:stateChanged", SoundController.audioEnabled);
};

SoundController.prototype.disableAudio = function() {
    SoundController.audioEnabled = false;
    SoundController.masterVolume = 0;
    this.updateVolume();
    this.app.fire("audio:stateChanged", SoundController.audioEnabled);
};


SoundController.prototype.enableMusic = function() {
    SoundController.musicEnabled = true;
    this.musicStorage.sound.volume = 1;
    this.app.fire("music:stateChanged", SoundController.musicEnabled);
};

SoundController.prototype.disableMusic = function() {
    SoundController.musicEnabled = false;
    this.musicStorage.sound.volume = 0;
    this.app.fire("music:stateChanged", SoundController.musicEnabled);
};


SoundController.prototype.updateVolume = function() {
    this.soundStorage.sound.volume = SoundController.masterVolume * SoundController.apiVolumeMultiplier;
    this.musicStorage.sound.volume = SoundController.masterVolume * SoundController.apiVolumeMultiplier;
};

SoundController.prototype.setMasterVolume = function(volume) {
    SoundController.masterVolume = volume;
    this.updateVolume();
};

SoundController.prototype.setVolumeMultiplier = function(volume) {
    SoundController.apiVolumeMultiplier = volume;
    this.updateVolume();
};

// basicButton.js
var BasicButton = pc.createScript('basicButton');

BasicButton.attributes.add('defaultScale', {
    title: "Default scale",
    type: 'number',
    default: 1,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('hoverScale', {
    title: "Hover scale",
    type: 'number',
    default: 1.03,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('pressedScale', {
    title: "Pressed scale",
    type: 'number',
    default: 0.97,
    min: 0.5,
    max: 1.5
});

BasicButton.attributes.add('upScaleDuration', {
    title: "Tween duration",
    type: 'number',
    default: 0.085,
    min: 0.005,
    max: 1
});

BasicButton.attributes.add('clickSound', {
    title: "Play sound",
    type: 'boolean',
    default: true
});

BasicButton.prototype.initialize = function() {

    // Whether the element is currently hovered or not
    this.hovered = false;

    if(pc.platform.mobile && this.app.touch) {
        this.entity.element.on('touchstart', this.onPress, this);
        this.entity.element.on('touchend', this.onRelease, this);
    } else {
        this.entity.element.on('mouseenter', this.onEnter, this);
        this.entity.element.on('mousedown', this.onPress, this);
        this.entity.element.on('mouseup', this.onRelease, this);
        this.entity.element.on('mouseleave', this.onLeave, this);
    }
};


// When the cursor enters the element assign the hovered texture
BasicButton.prototype.onEnter = function (event) {
    this.hovered = true;
    
    event.element.entity.tween(event.element.entity.getLocalScale())
        .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
        .start();
    
    document.body.style.cursor = 'pointer';
};

BasicButton.prototype.onLeave = function (event) {
    this.hovered = false;
    
    event.element.entity.tween(event.element.entity.getLocalScale())
        .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
        .start();

    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
BasicButton.prototype.onPress = function (event) {
    if(this.clickSound) {
        this.app.fire("audio:play", "click");
    }
    event.element.entity.tween(event.element.entity.getLocalScale())
        .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
        .start();
 };

BasicButton.prototype.onRelease = function (event) {
    if(this.hovered) {
         event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
            .start();
    } else {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
            .start();
    }
    
};

// mainMenuController.js
/* jshint esversion: 6 */
var MainMenuController = pc.createScript('mainMenuController');

MainMenuController.prototype.initialize = function() {
    this.entity.headingContainer = this.entity.findByName("HeadingContainer");
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.handContainer = this.entity.findByName("HandContainer");
    this.entity.tutorialHand = this.entity.handContainer.findByName('TutorialHand');
    this.entity.clickZone = this.entity.handContainer.findByName('ClickZone');
    this.entity.copyrightText = this.entity.findByName('CopyrightText');
    
    this.entity.clickZone.enabled = !skipTitleScreen();
    this.entity.handContainer.enabled = !skipTitleScreen();
    this.entity.headingIcon.enabled = !skipTitleScreen();
    this.entity.copyrightText.enabled = !skipTitleScreen();
    
    Utils.assignAction(this.entity.clickZone, this.playPressed, this);
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        if(skipTitleScreen()) {
            this.clickZone.enabled = this.handContainer.enabled = this.headingIcon.enabled = this.copyrightText.enabled = false;
        }

        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 1.0}, 0.6, pc.Linear)
            .delay(0.25).start();

        this.headingContainer.setLocalScale(0.0, 0.0, 0.0);
        var headingAppearingScaleTween = 
        this.headingContainer.tween(this.headingContainer.getLocalScale())
            .to(new pc.Vec3(1.2, 1.2, 1.2), 0.6, pc.BackOut)
            .delay(0.35).start();

        this.tutorialHand.tween(this.tutorialHand.getLocalScale())
            .to(new pc.Vec3(1.25, 1.25, 1.25), 0.55, pc.SineInOut)
            .yoyo(true)
            .repeat(100000)
            .start();

    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        
          /* tween heading icon */
        this.headingIcon.element.opacity = 1.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.0}, 0.35, pc.SineOut)
            .start();
        
        var position = this.headingIcon.getLocalPosition();
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(position.x, position.y + 50, position.z), 0.35, pc.SineIn)
            .start();
        
        this.tutorialHand.tween(this.tutorialHand.element)
            .to({opacity: 0.0}, 0.25, pc.Linear)
            .onComplete(() => {
                this.enabled = false;
            })
            .start();
        
    }.bind(this.entity);
    
    
    this.entity.show();
};

MainMenuController.prototype.update = function(dt) {
    if(skipTitleScreen()) {
        this.entity.clickZone.enabled = this.entity.handContainer.enabled = this.entity.headingIcon.enabled = this.entity.copyrightText.enabled = false;
    }
};

MainMenuController.prototype.playPressed = function() {
    this.entity.clickZone.enabled = false;
    WindowManager.startGameplay();

    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId:  "Button:MainMenu:TapToPlay"
    });
};


// reviveWindow.js
/* jshint esversion: 6 */
var ReviveWindow = pc.createScript('reviveWindow');

// initialize code called once per entity
ReviveWindow.prototype.initialize = function() {
        
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRevive = this.entity.findByName("ButtonRevive");
    this.entity.buttonSkip = this.entity.findByName("ButtonSkip");
    this.entity.background = this.entity.findByName("Background");
    
    Utils.assignAction(this.entity.buttonRevive, this.revivePressed, this);
    Utils.assignAction(this.entity.buttonSkip, this.skipPressed, this);
    
    /* show method */
    this.entity.show = function() {
        this.enabled = true;
        
        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({opacity: 0.94}, 0.25, pc.Linear)
            .start();
         
        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 0.9}, 0.3, pc.Linear)
            .delay(0.15);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween = 
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(0, 0, 0), 0.5, pc.SineOut)
            .delay(0.12);
        
        headingAppearingTween.chain(headingMovingTween).start();
        
        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.35, 1.35, 1.35), 0.35, pc.BackOut)
            .delay(0.2);
        
        var headingMovingScaleTween = 
        this.headingIcon.tween(this.headingIcon.getLocalScale())
            .to(new pc.Vec3(1.0, 1.0, 1.0), 0.5, pc.SineOut)
            .delay(0.1);
        
         headingAppearingScaleTween.chain(headingMovingScaleTween).start();
        
     
        /* tween buttons */
        this.buttonRevive.setLocalScale(0, 0, 0);
        this.buttonRevive
            .tween(this.buttonRevive.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(0.9)
            .start();
                
        this.buttonSkip.setLocalScale(0, 0, 0);
        this.buttonSkip
            .tween(this.buttonSkip.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(1.3)
            .start();
        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.hide();
};

// update code called every frame
ReviveWindow.prototype.update = function(dt) {
    
};


ReviveWindow.prototype.revivePressed = function() {    
    Apicontroller.showRewardedVideo((result) => {
        if(result && result.rewardGranted) {
                GameplayController.currentSession.ballsLeft += 5;
                GameplayController.currentSession.reviveUsed = true;
                this.entity.hide();
                this.entity.delayedCall(150, () => this.app.fire("level:createBall"));
        }
    });
};

ReviveWindow.prototype.skipPressed = function() {
    this.entity.hide();
};



// windowManager.js
var WindowManager = pc.createScript('windowManager');



WindowManager.prototype.initialize = function() {
    WindowManager.app = this.app;
    
    WindowManager.defeatWindow = this.app.root.findByName("UI Container").findByName("DefeatWindow");
    WindowManager.resultsWindow = this.app.root.findByName("UI Container").findByName("ResultsWindow");
    WindowManager.reviveWindow = this.app.root.findByName("UI Container").findByName("ReviveWindow");
    WindowManager.mainMenu = this.app.root.findByName("UI Container").findByName("MainMenu");
    WindowManager.settingsPanel = this.app.root.findByName("UI Container").findByName("SettingsPanel");
    WindowManager.gameplayUI = this.app.root.findByName("UI Container").findByName("GamePlayUI");
};


WindowManager.prototype.update = function(dt) {
    
};

WindowManager.hideAll = function() {  
    WindowManager.defeatWindow.hide();
    WindowManager.resultsWindow.hide();  
    WindowManager.reviveWindow.hide();  
    WindowManager.mainMenu.hide();  
    WindowManager.gameplayUI.hide();  
    WindowManager.settingsPanel.hide();  
};

WindowManager.showResults = function() {    
    WindowManager.resultsWindow.show();  
};

WindowManager.showDefeat = function() {    
    WindowManager.defeatWindow.show();  
};

WindowManager.showRevive = function() {
    WindowManager.reviveWindow.show();  
};

WindowManager.startGameplay = function() { 
    WindowManager.hideAll();
    WindowManager.settingsPanel.show();
    WindowManager.app.fire("gameplay:start", true);
};

WindowManager.exitGameplay = function() { 
    WindowManager.hideAll();
    WindowManager.mainMenu.show(); 
    WindowManager.settingsPanel.show();
    WindowManager.app.fire("gameplay:exit");
};

WindowManager.hasOpenedWindows = function (){
    return  WindowManager.resultsWindow.enabled || WindowManager.defeatWindow.enabled || WindowManager.reviveWindow.enabled;
}; 

// settingsPanel.js
/* jshint esversion: 6 */
var SettingsPanel = pc.createScript('settingsPanel');

SettingsPanel.panelClosedY = 280;

SettingsPanel.prototype.initialize = function () {

    this.entity.settingsPanelContainer = this.entity.findByName("SettingsPanelContainer");
    this.entity.buttonSettings = this.entity.findByName("ButtonSettings");
    this.entity.panel = this.entity.settingsPanelContainer.findByName("PanelImage");
    this.entity.buttonSoundOn = this.entity.settingsPanelContainer.findByName("ButtonSoundOn");
    this.entity.buttonSoundOff = this.entity.settingsPanelContainer.findByName("ButtonSoundOff");
    this.entity.buttonMusicOn = this.entity.settingsPanelContainer.findByName("ButtonMusicOn");
    this.entity.buttonMusicOff = this.entity.settingsPanelContainer.findByName("ButtonMusicOff");
    this.entity.buttonMenu = this.entity.findByName("ButtonMenu");

    this.entity.settingsPanelOpened = false;

    this.app.on("audio:stateChanged", this.updateAudioButtons, this);
    this.app.on("music:stateChanged", this.updateAudioButtons, this);

    Utils.assignAction(this.entity.buttonSoundOn, this.disableAudio, this);
    Utils.assignAction(this.entity.buttonSoundOff, this.enableAudio, this);
    Utils.assignAction(this.entity.buttonMusicOn, this.disableMusic, this);
    Utils.assignAction(this.entity.buttonMusicOff, this.enableMusic, this);
    this.updateAudioButtons(true);

    Utils.assignAction(this.entity.buttonMenu, this.openMainMenu, this);
    Utils.assignAction(this.entity.buttonSettings, this.toggleSettings, this);


    /* show method */
    this.entity.show = function () {
        this.enabled = true;
    }.bind(this.entity);


    /* hide method */
    this.entity.hide = function () {

        this.settingsPanelOpened = false;
        const pos = this.settingsPanelContainer.getLocalPosition();
        pos.y = SettingsPanel.panelClosedY;
        this.settingsPanelContainer.setLocalPosition(pos);

        this.enabled = false;
    }.bind(this.entity);


    this.entity.show();
};


SettingsPanel.prototype.update = function (dt) {
    const externalMute = isExternalMute();
    const settingsPanelPosition = this.entity.settingsPanelContainer.getLocalPosition();

    if (externalMute) {
        this.entity.buttonSoundOff.enabled = this.entity.buttonSoundOn.enabled = false;
        this.entity.buttonMusicOff.enabled = this.entity.buttonMusicOn.enabled = false;
        settingsPanelPosition.y = this.getSettingPanelContainerY();
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    } else {
        // settingsPanelPosition.y = this.getSettingPanelContainerY();
        // this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    }


    this.entity.panel.enabled = this.entity.buttonSettings.enabled = !externalMute;
};

SettingsPanel.prototype.getSettingPanelContainerY = function () {
    const externalMute = isExternalMute();

    if (externalMute) {
        return 400;
    } else {
        return 90;
    }
};

SettingsPanel.prototype.enableAudio = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:SFX:Unmute"
    });

    this.app.fire("audio:enable");
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent("EVENT_VOLUMECHANGE", {
            bgmVolume: SoundController.musicEnabled ? 1 : 0,
            sfxVolume: SoundController.audioEnabled ? 1 : 0,
        });
    }
    this.app.fire('app:save');
};

SettingsPanel.prototype.disableAudio = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:SFX:Mute"
    });

    this.app.fire("audio:disable");
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent("EVENT_VOLUMECHANGE", {
            bgmVolume: SoundController.musicEnabled ? 1 : 0,
            sfxVolume: SoundController.audioEnabled ? 1 : 0,
        });
    }
    this.app.fire('app:save');
};

SettingsPanel.prototype.enableMusic = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:Music:Unmute"
    });
    this.app.fire("music:enable");
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent("EVENT_VOLUMECHANGE", {
            bgmVolume: SoundController.musicEnabled ? 1 : 0,
            sfxVolume: SoundController.audioEnabled ? 1 : 0,
        });
    }
    this.app.fire('app:save');
};

SettingsPanel.prototype.disableMusic = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:Music:Mute"
    });
    this.app.fire("music:disable");
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent("EVENT_VOLUMECHANGE", {
            bgmVolume: SoundController.musicEnabled ? 1 : 0,
            sfxVolume: SoundController.audioEnabled ? 1 : 0,
        });
    }
    this.app.fire('app:save');
};


SettingsPanel.prototype.openMainMenu = function () {
    //TransitionScreen.instance.transitionTo(() => WindowManager.exitGameplay());
};

SettingsPanel.prototype.updateAudioButtons = function (dontSaveState) {
    this.entity.buttonSoundOn.enabled = SoundController.audioEnabled;
    this.entity.buttonSoundOff.enabled = !SoundController.audioEnabled;
    this.entity.buttonMusicOn.enabled = SoundController.musicEnabled;
    this.entity.buttonMusicOff.enabled = !SoundController.musicEnabled;
};

SettingsPanel.prototype.toggleSettings = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: this.entity.settingsPanelOpened ? "Button:General:Settings:Close" : "Button:General:Settings:Open"
    });

    this.entity.settingsPanelOpened = !this.entity.settingsPanelOpened;

    const settingsPanelPosition = this.entity.settingsPanelContainer.getLocalPosition();

    this.entity.settingsPanelContainer.tween(this.entity.settingsPanelContainer.getLocalPosition())
        .to(new pc.Vec3(settingsPanelPosition.x, this.entity.settingsPanelOpened ? this.getSettingPanelContainerY() : SettingsPanel.panelClosedY, settingsPanelPosition.z), 0.3, pc.QuarticOut)
        .start();

    console.log('toggle settings to ' + this.entity.settingsPanelOpened)
};


// gameplayUI.js
/* jshint esversion: 6 */
var GameplayUi = pc.createScript('gameplayUi');

GameplayUi.prototype.initialize = function() {
    this.entity.currentScoreText = this.entity.findByName("CurrentScoresText"); 
    this.entity.currentScoreTextLandscape = this.entity.findByName("CurrentScoresTextLandscape");  
    this.entity.coinsContainer = this.entity.findByName("CoinsContainer");
    this.entity.coinsCounterIcon = this.entity.findByName("CoinsCounterIcon");
    this.entity.coinsCounterText = this.entity.findByName("CoinsCounterText");
    this.entity.centerContainer =  this.entity.findByName("CenterContainer");
    this.entity.powerupsContainer =  this.entity.findByName("PowerupsContainer");
    this.entity.progressBarHorizontal = this.entity.centerContainer.findByName('LevelProgressBar');
    this.entity.progressBarVertical = this.entity.centerContainer.findByName('LevelProgressBarVertical');
    
    this.entity.coinsContainerInitialPosition = this.entity.coinsContainer.getLocalPosition().clone();
    this.entity.progressBarHorizontalInitialPosition = this.entity.progressBarHorizontal.getLocalPosition().clone();
    this.entity.progressBarVerticalInitialPosition = this.entity.progressBarVertical.getLocalPosition().clone();
    
    this.entity.bestScoreText = this.entity.findByName("BestScoresText"); 
    this.entity.bestScoreIcon = this.entity.findByName("BestScoresIcon"); 
    this.entity.bestScoreTextLandscape = this.entity.findByName("BestScoresTextLandscape"); 
    this.entity.bestScoreIconLandscape = this.entity.findByName("BestScoresIconLandscape"); 
    
    this.entity.buttonMultiball = this.entity.findByName("PowerupMultiball");
    this.entity.buttonEarthquake = this.entity.findByName("PowerupEarthquake");
    
    this.app.on("score:updated", this.updateScoresText, this);
    this.app.on("coins:updated", this.updateCoinsText, this);
    this.app.on("level:buildTower", this.hidePowerups, this);
    this.app.on("powerup:enableButtons", this.showPowerups, this);
    
    this.app.on("viewport:resize", this.resetPositions, this);
    
    const scriptContext = this;
    
    /* show method */
    this.entity.show = function() {
        scriptContext.hidePowerups();
        this.delayedCall(GameplayController.cameraLiftTweenDuration * 1000, () => scriptContext.animateAppearing.apply(scriptContext));        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.hide();
};

GameplayUi.prototype.animateAppearing = function() {
    this.entity.enabled = true;
    
    this.entity.progressBarHorizontal.setLocalPosition(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y + 150, this.entity.progressBarHorizontalInitialPosition.z);
    this.entity.progressBarHorizontalTween = this.entity.progressBarHorizontal.tween(this.entity.progressBarHorizontal.getLocalPosition())
        .to(new pc.Vec3(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y, this.entity.progressBarHorizontalInitialPosition.z), 0.5, pc.BackOut)
        .start();
    
    this.entity.progressBarVertical.setLocalPosition(this.entity.progressBarVerticalInitialPosition.x - 130, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z);
    this.entity.progressBarVerticalTween = this.entity.progressBarVertical.tween(this.entity.progressBarVertical.getLocalPosition())
        .to(new pc.Vec3(this.entity.progressBarVerticalInitialPosition.x, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z), 0.5, pc.BackOut)
        .start();
    
    this.entity.coinsContainer.setLocalPosition(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y + 120, this.entity.coinsContainerInitialPosition.z);
    this.entity.coinsContainerTween = this.entity.coinsContainer.tween(this.entity.coinsContainer.getLocalPosition())
        .to(new pc.Vec3(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y, this.entity.coinsContainerInitialPosition.z), 0.5, pc.BackOut)
        .delay(0.15)
        .start();
    
    this.entity.centerContainer.childrenAlphaAppear(0, 0.4, pc.Linear, 0.0);
    this.entity.coinsContainer.childrenAlphaAppear(0, 0.4, pc.Linear, 0.15);
};


GameplayUi.prototype.hidePowerups = function() {
    this.entity.buttonMultiball.enabled = false;
    this.entity.buttonEarthquake.enabled = false;
};

GameplayUi.prototype.resetPositions = function() {
    if(this.entity.progressBarHorizontalTween && this.entity.progressBarHorizontalTween.playing) {
        this.entity.progressBarHorizontalTween.stop();
    }
    this.entity.progressBarHorizontal.setLocalPosition(this.entity.progressBarHorizontalInitialPosition.x, this.entity.progressBarHorizontalInitialPosition.y, this.entity.progressBarHorizontalInitialPosition.z);
    
    if(this.entity.progressBarVerticalTween && this.entity.progressBarVerticalTween.playing) {
        this.entity.progressBarVerticalTween.stop();
    }
    this.entity.progressBarVertical.setLocalPosition(this.entity.progressBarVerticalInitialPosition.x, this.entity.progressBarVerticalInitialPosition.y, this.entity.progressBarVerticalInitialPosition.z);
    
    if(this.entity.coinsContainerTween && this.entity.coinsContainerTween.playing) {
        this.entity.coinsContainerTween.stop();
    }
    this.entity.coinsContainer.setLocalPosition(this.entity.coinsContainerInitialPosition.x, this.entity.coinsContainerInitialPosition.y, this.entity.coinsContainerInitialPosition.z);

};

GameplayUi.prototype.showPowerups = function() {
        this.entity.buttonMultiball.enabled = true;
        this.entity.buttonMultiball.setLocalScale(0, 0, 0);
        this.entity.buttonMultiball
            .tween(this.entity.buttonMultiball.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
            .delay(0.275)
            .start();
    
    
        this.entity.buttonEarthquake.enabled = true;
        this.entity.buttonEarthquake.setLocalScale(0, 0, 0);
        this.entity.buttonEarthquake
            .tween(this.entity.buttonEarthquake.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
            .delay(0.2)
            .start();
};

GameplayUi.prototype.update = function(dt) {
    var pos =  this.entity.bestScoreIcon.getLocalPosition();
    pos.x = this.entity.bestScoreText.getLocalPosition().x - this.entity.bestScoreText.element.width / 2 + 6;
    this.entity.bestScoreIcon.setLocalPosition(pos);
    
    var posLandscape =  this.entity.bestScoreIconLandscape.getLocalPosition();
    posLandscape.x = this.entity.bestScoreTextLandscape.getLocalPosition().x - this.entity.bestScoreTextLandscape.element.width / 2 + 7;
    this.entity.bestScoreIconLandscape.setLocalPosition(posLandscape);
    
    this.entity.bestScoreText.element.text = '' + GameplayController.maxScores;
    this.entity.bestScoreTextLandscape.element.text = '' + GameplayController.maxScores;
    
    if(isUIHidden('coins')) {
        this.entity.coinsContainer.setLocalScale(0, 0, 0);
        this.entity.coinsContainer.enabled = false;
    }
    
    if(isUIHidden('powerups')) {
        this.entity.powerupsContainer.enabled = false;
    }
};

GameplayUi.prototype.updateScoresText = function(scores) {
     this.entity.currentScoreText.element.text = '' + scores; 
     this.entity.currentScoreTextLandscape.element.text = '' + scores; 
};

GameplayUi.prototype.updateCoinsText = function(coins) {
     this.entity.coinsCounterText.element.text = '' + coins; 
};



// towerStorage.js
/* jshint esversion: 6 */
var TowerStorage = pc.createScript('towerStorage');

// initialize code called once per entity
TowerStorage.prototype.initialize = function() {
   this.loadNextPrefab();
    
    this.app.on("tower:next", this.loadNextPrefab, this);
};

TowerStorage.prototype.searchForPrefabs = function() {
     this.preparedPrefabs = Utils.shuffle(this.app.root.findByName("Prefabs").children.filter(prefab => !!prefab.script.towerConfig.readyToUse));
};

TowerStorage.prototype.getCurrentPrefab = function() {
    return this.currentPrefab;
};

TowerStorage.prototype.loadNextPrefab = function() {
    if(!this.preparedPrefabs || this.preparedPrefabs.length === 0) {
        this.searchForPrefabs();   
    }
    
    if(this.preparedPrefabs.length > 0) {
        this.currentPrefab = Utils.removeRandomItem(this.preparedPrefabs);
    } else {
        this.currentPrefab = null;
        console.error("No tower prefabs found");
    }
};


// update code called every frame
TowerStorage.prototype.update = function(dt) {
    
};


// comboEffect.js
var ComboEffect = pc.createScript('comboEffect');

ComboEffect.prototype.initialize = function() {
    this.comboEffect = this.entity.findByName("ComboEffect");
    
    this.comboEffect.enabled = false;
    
    this.app.on("combo:show", this.showComboEffect, this);
};

ComboEffect.prototype.showComboEffect = function(multiplier) {
    if(isUIHidden('combo')) {
        return;
    }
    
    
    if(this.comboMovingTween && this.comboMovingTween.playing) {
        this.comboMovingTween.stop();
    }
    
    if(this.comboScaleTween && this.comboScaleTween.playing) {
        this.comboScaleTween.stop();
    }
    
     if(this.comboScaleTween2 && this.comboScaleTween2.playing) {
        this.comboScaleTween2.stop();
    }

     if(this.comboShakingTween && this.comboShakingTween.playing) {
        this.comboShakingTween.stop();
    }
    
    
    if(!this.comboEffect.enabled) {
        var anchorX, anchorY; 
        if(window.innerWidth > window.innerHeight) {
            anchorX = Math.random() < 0.5 ?  pc.math.random(0.3, 0.4) : pc.math.random(0.6, 0.7); 
            anchorY = pc.math.random(0.4, 0.6);
        } else {
            anchorX = Math.random() < 0.5 ?  pc.math.random(0.15, 0.22) : pc.math.random(0.78, 0.85);
            anchorY = pc.math.random(0.35, 0.65);
        }
       
        var anchor = this.comboEffect.element.anchor;
        anchor.set(anchorX, anchorY, anchorX, anchorY);
        this.comboEffect.element.anchor = anchor;
    }
  
    this.comboEffect.enabled = true;
    
    var stringText = ('x' + multiplier).toString();
    var currentColor = pc.math.clamp(Math.floor(multiplier / 10), 0, 4); 
    
    for(var q = 0; q < 4; q++) {
        this.entity.findByName("Digit" + q).element.opacity = 0;
    }
    for(var i = 0; i < Math.min(stringText.length, 4); i++) {
        var digitCode = +stringText.charAt(i);
        digitCode = ((digitCode >= 0 && digitCode <= 9) ? digitCode : 10) * 5 + currentColor;
        this.entity.findByName("Digit" + i).element.spriteFrame = digitCode;
        this.entity.findByName("Digit" + i).element.opacity = 1;
    }
    
    var soundIndex = pc.math.clamp(Math.floor(multiplier / 5) + 1, 1, 5);
    this.app.fire("audio:play", "combo0" + soundIndex, 100); /* (currentColor + 1)*/
    
    //tween appearing 
    this.comboEffect.setLocalPosition(0, 0, 0);
    this.comboMovingTween = this.comboEffect.tween(this.comboEffect.getLocalPosition())
        .to(new pc.Vec3(0, 1, 0), 1.5, pc.SineInOut)
        .onComplete(() => {
            this.comboEffect.enabled = false;
        })
        .start();
    
    this.comboEffect.setLocalScale(0.5, 0.5, 0.5);
    this.comboScaleTween = this.comboEffect.tween(this.comboEffect.getLocalScale())
        .to(new pc.Vec3(0.75, 0.75, 0.75), 0.3, pc.BackOut);

    this.comboScaleTween2 = this.comboEffect.tween(this.comboEffect.getLocalScale())
        .to(new pc.Vec3(0, 0, 0), 0.25, pc.BackIn)
         .delay(0.9);
    
    this.comboScaleTween.chain(this.comboScaleTween2).start();
    
    
    this.comboEffect.setLocalEulerAngles(0, 0, 3);
    this.comboShakingTween = this.comboEffect.tween(this.comboEffect.getLocalRotation())
        .to(new pc.Vec4(0, 0, -0.03, 1), 0.2, pc.Linear)
        .repeat(6)
        .yoyo(true)
        .start();
};


ComboEffect.prototype.update = function(dt) {
    
};


// shopItem.js
var ShopItem = pc.createScript('shopItem');

ShopItem.attributes.add('dataKey', {
    type: 'string',
    default: '',
});

ShopItem.prototype.initialize = function() {
    this.entity.buttonBuy = this.entity.findByName("ButtonBuy");
    this.entity.buttonWatchVideo = this.entity.findByName("ButtonWatchVideo");
    this.entity.priceGroup = this.entity.findByName("PriceGroup");
    this.entity.priceText = this.entity.priceGroup.findByName("PriceText");
    this.entity.boughtIcon = this.entity.findByName("ItemBoughtIcon");
    
    this.initialTextColor = this.entity.priceText.element.color.clone();

    
    Utils.assignAction(this.entity.buttonBuy, this.buyPressed, this);
    Utils.assignAction(this.entity.buttonWatchVideo, this.watchVideoPressed, this);

    var scriptingContext = this;
    
     /* show method */
    this.entity.show = function(startX, endX, delay, rewardedVideoAvailable) {
        this.enabled = true;
        
        this.setLocalPosition(startX, 0, 0);
        this.tween(this.getLocalPosition())
            .to(new pc.Vec3(endX, 0, 0), 0.25, pc.QuinticOut)
            .delay(delay)
            .start();        
        
        this.setLocalScale(0, 0, 0);
        this.tween(this.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.35, pc.BackOut)
            .delay(delay)
            .start();

        this.buttonBuy.setLocalScale(0, 0, 0);
        this.buttonBuy.tween(this.buttonBuy.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .delay(delay + 0.25)
            .start();
        
        this.buttonWatchVideo.setLocalScale(0, 0, 0);
        this.buttonWatchVideo.tween(this.buttonWatchVideo.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .delay(delay + 0.25)
            .start();
        
        this.boughtIcon.setLocalScale(0, 0, 0);
        this.boughtIcon.tween(this.boughtIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.25, pc.BackOut)
            .delay(delay + 0.15)
            .start();
        
        /* tween text groups */
        this.priceGroup.setLocalPosition(0, 70, 0);
        this.priceGroup.tween(this.priceGroup.getLocalPosition())
            .to(new pc.Vec3(0, 144, 0), 0.3, pc.BackOut)
            .delay(delay + 0.1)
            .start();
        
        if(scriptingContext.isBought()) {
            this.priceGroup.enabled = false;
            this.buttonWatchVideo.enabled = false;
            this.buttonBuy.enabled = false;
            this.boughtIcon.enabled = true;
            
        } else {
            this.buttonWatchVideo.enabled = rewardedVideoAvailable;
            this.buttonBuy.enabled = this.priceGroup.enabled = !this.buttonWatchVideo.enabled;
            this.priceText.element.text = '' + scriptingContext.getPrice();
            this.boughtIcon.enabled =false;
        }
        
    }.bind(this.entity);
    
    
    /* hide method */
    this.entity.hide = function() {
        this.enabled = false;
    }.bind(this.entity);
    
};


ShopItem.prototype.update = function(dt) {
    
};

ShopItem.prototype.getPrice = function() {
    return +GameplayController["powerup" + this.dataKey + "Price"];
};

ShopItem.prototype.buyPressed = function() {
    if(GameplayController.coins >= this.getPrice()) {        
        GameplayController.setCoins(GameplayController.coins - this.getPrice());
        this.acquireItem();
    } else {
        this.app.fire("audio:play", "purchaseFailed");
        this.app.fire('shop:notEnoughCoins');
        var color = new pc.Color(1, 0, 0);
        this.app.tween(color)
           .to(this.initialTextColor, 0.3, pc.SineInOut)
           .onUpdate(() => {this.entity.priceText.element.color = color;})
           .start();
    }
};

ShopItem.prototype.watchVideoPressed = function() {
    this.acquireItem();
};

ShopItem.prototype.isBought = function() {
    return GameplayController["powerup" + this.dataKey + "Purchased"];
};

ShopItem.prototype.acquireItem = function() {
    if(!this.isBought()) {
        this.app.fire("audio:play", "purchaseDone");
        GameplayController["powerup" + this.dataKey + "Purchased"] = true;
        this.app.fire("powerup:stateChanged", this.dataKey);
        this.app.fire("app:save");
        this.updateAvailability();
        
        this.entity.boughtIcon.setLocalScale(0, 0, 0);
        this.entity.boughtIcon.tween(this.entity.boughtIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.3, pc.BackOut)
            .start();
    }
};


ShopItem.prototype.updateAvailability = function() {
  if(this.isBought()) {
        this.entity.priceGroup.enabled = false;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = false;
        this.entity.boughtIcon.enabled = true;      
    } else {
        this.entity.buttonWatchVideo.enabled = scriptingContext.isVideoAvailable();
        this.entity.buttonBuy.enabled = this.priceGroup.enabled = !this.buttonWatchVideo.enabled;
        this.entity.priceText.element.text = '' + scriptingContext.getPrice();
        this.entity.boughtIcon.enabled = false;
    }
};

// powerupButton.js
/* jshint esversion: 6 */
var PowerupButton = pc.createScript('powerupButton');


PowerupButton.attributes.add('dataKey', {
    type: 'string',
    default: '',
});

PowerupButton.prototype.initialize = function () {

    this.entity.icon = this.entity.findByName("Icon");
    this.entity.checkIcon = this.entity.findByName("CheckMark");
    this.entity.buttonWatchVideo = this.entity.findByName("ButtonWatchVideo");
    this.entity.buttonBuy = this.entity.findByName("ButtonBuy");
    this.entity.buttonBuyText = this.entity.buttonBuy.findByName("PriceText");
    this.entity.buttonBuyDisabled = this.entity.findByName("ButtonBuyDisabled");
    this.entity.buttonBuyDisabledText = this.entity.buttonBuyDisabled.findByName("PriceText");
    this.entity.notEnoughCoins = this.entity.findByName('NotEnoughCoins');
    this.entity.quantityPad = this.entity.findByName('QuantityPad');
    this.entity.quantityText = this.entity.findByName('QuantityText');

    this.forcedMode = isForcedMode();
    this.availableAmount = this.forcedMode ? (getForcedModeProperties().override[`${this.dataKey.toLowerCase()}_powerups`] || 0) : 0;
    if (this.forcedMode && this.availableAmount > 0) {
        GameplayController[`powerup${this.dataKey}Purchased`] = true;
    }

    this.initialTextColor = this.entity.buttonBuyDisabledText.element.color.clone();
    this.initialPosition = this.entity.getLocalPosition().clone();

    this.entity.notEnoughCoins.enabled = false;

    this.app.on("powerup:stateChanged", this.updateState, this);
    this.app.on('coins:updated', (numCoins) => this.updateState(), this);

    this.assignAction(this.entity.icon, this.iconPressed, this);
    this.assignAction(this.entity.buttonWatchVideo, this.iconPressed, this);
    this.assignAction(this.entity.buttonBuy, this.iconPressed, this);
    this.assignAction(this.entity.buttonBuyDisabled, this.iconPressed, this);

    this.updateState();
};

PowerupButton.prototype.assignAction = function (button, handler, handlerContext) {
    const mouseSupported = !!this.app.mouse;
    const touchSupported = !!this.app.touch;
    if (touchSupported) {
        button.element.on('touchstart', (e) => {
            this.touchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });
        button.element.on('touchend', (e) => {
            if (!this.touchPosition || (e.changedTouches && e.changedTouches[0] && Utils.distanceBetween(e.changedTouches[0].clientX, e.changedTouches[0].clientY, this.touchPosition.x, this.touchPosition.y) < 10)) {
                handler.apply(handlerContext);
            }
        });
    } if (mouseSupported) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

PowerupButton.prototype.update = function (dt) {
    this.updateState();

    if (isForcedMode()) {
        if (this.availableAmount <= 0) {
            GameplayController["powerup" + this.dataKey + "Purchased"] = false;
            this.hideButton();
        }
    }
};

PowerupButton.prototype.iconPressed = function () {
    if (GameplayController["powerup" + this.dataKey + "Purchased"]) {
        if (this.forcedMode && this.isActivated()) return;

        GameplayController["powerup" + this.dataKey + "Purchased"] = false;
        this.app.fire("audio:play", "click");
        this.app.fire("powerup:activate", this.dataKey);
        this.app.fire("powerup:stateChanged", this.dataKey);
        if (GameplayController.currentSession) {
            GameplayController.currentSession.usedPowerups.push(this.dataKey);
        }

        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Design",
            eventId: "Button:Level:" + this.dataKey + ":Activate"
        });

        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Resource",
            flowType: "Sink",
            itemType: "powerup",
            itemId: this.dataKey + "Activated",
            amount: 1,
            resourceCurrency: this.dataKey
        });


        if (this.forcedMode) {
            if (!this.isBought() && this.availableAmount > 0) {
                this.availableAmount -= 1;
                this.acquireItem();
            }
        }

    } else {
        if (this.entity.buttonWatchVideo.enabled) {
            var hasRewardedVideos = Apicontroller.hasRewardedVideo();
            if (hasRewardedVideos) {
                Apicontroller.showRewardedVideo((result) => result && result.rewardGranted && this.acquireItem());
            }
        } else {
            if (GameplayController.coins >= this.getPrice()) {

                window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
                    eventName: "GA:Design",
                    eventId: "Button:Level:" + this.dataKey + ":Purchased"
                });

                GameplayController.setCoins(GameplayController.coins - this.getPrice());
                this.acquireItem();

            } else {
                this.app.fire("audio:play", "purchaseFailed");
                this.displayNotEnoughCoins();

                var color = new pc.Color(0.7, 0, 0);
                this.app.tween(color)
                    .to(this.initialTextColor, 0.5, pc.BounceOut)
                    .onUpdate(() => { this.entity.buttonBuyDisabledText.element.color = color; })
                    .start();

                this.entity.buttonBuyDisabledText.setLocalScale(0.75, 0.75, 0.75);
                this.entity.buttonBuyDisabledText.tween(this.entity.buttonBuyDisabledText.getLocalScale())
                    .to(new pc.Vec3(1, 1, 1), 0.65, pc.ElasticOut)
                    .start();
            }
        }
    }
};

PowerupButton.prototype.isBought = function () {
    return GameplayController["powerup" + this.dataKey + "Purchased"];
};

PowerupButton.prototype.isActivated = function () {
    if (this.dataKey === 'Multiball') {
        return BallController.ball && BallController.ball.name === 'ColorBall';
    } else if (this.dataKey === 'Earthquake') {
        return GameplayController.currentSession && GameplayController.currentSession.earthquakeTimer > 0;
    }
    return false;
};

PowerupButton.prototype.getPrice = function () {
    return +GameplayController["powerup" + this.dataKey + "Price"];
};

PowerupButton.prototype.acquireItem = function () {
    if (!this.isBought()) {
        this.app.fire("audio:play", "purchaseDone");
        GameplayController["powerup" + this.dataKey + "Purchased"] = true;
        this.app.fire("powerup:stateChanged", this.dataKey);
        this.app.fire("app:save");
        this.updateState();

        this.entity.checkIcon.setLocalScale(0, 0, 0);
        this.entity.checkIcon.tween(this.entity.checkIcon.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.22, pc.BackOut)
            .start();

        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Resource",
            flowType: "Source",
            itemType: "powerup",
            itemId: this.dataKey + "Activated",
            amount: 1,
            resourceCurrency: this.dataKey
        });
    }
};

PowerupButton.prototype.hideButton = function () {
    this.entity.setLocalPosition(this.initialPosition.x + 1000, this.initialPosition.y + 1000, this.initialPosition.z);
};

PowerupButton.prototype.updateState = function (dataKey) {
    if (dataKey && dataKey != this.dataKey) {
        return;
    }

    if (GameplayController["powerup" + this.dataKey + "Purchased"]) {
        this.entity.checkIcon.enabled = true;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = false;
        this.entity.buttonBuyDisabled.enabled = false;
    } else {
        const hasEnoughCoins = GameplayController.coins >= this.getPrice();
        const rewardedVideoAvailable = false; // !hasEnoughCoins && Apicontroller.hasRewardedVideo();
        /* rewarded videos are currently disabled for powerups */

        this.entity.checkIcon.enabled = false;
        this.entity.buttonBuy.enabled = hasEnoughCoins;
        this.entity.buttonBuyDisabled.enabled = !hasEnoughCoins && !rewardedVideoAvailable;
        this.entity.buttonWatchVideo.enabled = rewardedVideoAvailable;

        this.entity.buttonBuyText.element.text = '' + this.getPrice();
        this.entity.buttonBuyDisabledText.element.text = '' + this.getPrice();
    }

    if (this.forcedMode) {
        if (this.isActivated()) {
            this.entity.icon.element.opacity = 0.5;
            this.entity.checkIcon.enabled = false;
        } else {
            this.entity.icon.element.opacity = 1;
            this.entity.checkIcon.enabled = true;
        }

        this.entity.quantityPad.enabled = true;
        this.entity.quantityText.element.text = `${this.availableAmount}`;
        this.entity.buttonWatchVideo.enabled = false;
        this.entity.buttonBuy.enabled = false;
        this.entity.buttonBuyDisabled.enabled = false;
        this.entity.notEnoughCoins.enabled = false;
    } else {
        this.entity.quantityPad.enabled = false;
    }

};

PowerupButton.prototype.displayNotEnoughCoins = function () {
    this.entity.notEnoughCoins.enabled = true;

    if (this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }

    if (this.alphaDisappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }

    if (this.positionAppearingTween && this.positionAppearingTween.playing) {
        this.positionAppearingTween.stop();
    }

    if (this.positionDisappearingTween && this.positionDisappearingTween.playing) {
        this.positionDisappearingTween.stop();
    }

    this.entity.notEnoughCoins.element.opacity = 0.3;
    this.alphaAppearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.element)
        .to({ opacity: 1 }, 0.13, pc.SineIn);


    this.alphaDisappearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.element)
        .to({ opacity: 0 }, 0.7, pc.Linear)
        .onComplete(() => {
            this.entity.notEnoughCoins.enabled = false;
        });

    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();


    this.entity.notEnoughCoins.setLocalPosition(-95, -55, 0);
    this.positionAppearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.getLocalPosition())
        .to(new pc.Vec3(-95, -43, 0), 0.18, pc.SineIn);

    this.positionDisappearingTween = this.entity.notEnoughCoins.tween(this.entity.notEnoughCoins.getLocalPosition())
        .to(new pc.Vec3(-95, -5, 0), 0.65, pc.Linear);

    this.positionAppearingTween.chain(this.positionDisappearingTween).start();
};

// smileScared.js
var SmileScared = pc.createScript('smileScared');

// initialize code called once per entity
SmileScared.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;    
    
    this.app.on('smile:scared', this.show, this);
};

// update code called every frame
SmileScared.prototype.update = function(dt) {
    
};

SmileScared.prototype.show = function () {
    if(isUIHidden('reactions')) {
        return;
    }
    
    this.app.fire("audio:play", "emojiScared");
        
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
    
    if(this.shakingTween && this.shakingTween.playing) {
        this.shakingTween.stop();
    }

    if(this.shakingEndTween && this.shakingEndTween.playing) {
        this.shakingEndTween.stop();
    }
    
    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
      if(this.alphaDsiappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 120, 0), 2.2, pc.SineInOut)
        .onComplete(() => {
            this.entity.enabled = false;
        })
        .start();


    this.entity.setLocalEulerAngles(0, 0, 4);
    this.shakingTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, -0.04, 1), 0.25, pc.Linear)
        .delay(0.1)
        .repeat(5)
        .yoyo(true);
    
    this.shakingEndTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 0, 1), 0.125, pc.Linear);
   
    this.shakingTween.chain(this.shakingEndTween).start();

    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.3, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.3, pc.Linear)
        .delay(1.6);
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};

// smileSurprised.js
var SmileSurprised = pc.createScript('smileSurprised');


SmileSurprised.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;    
    
    this.app.on('smile:surprised', this.show, this);
};

// update code called every frame
SmileSurprised.prototype.update = function(dt) {
    
};


SmileSurprised.prototype.show = function() {
    if(isUIHidden('reactions')) {
        return;
    }
    
    this.app.fire("audio:play", "emojiSurprised");
    
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
          
    if(this.scaleTween2 && this.scaleTween2.playing) {
        this.scaleTween2.stop();
    }

    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
      if(this.alphaDsiappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 60, 0), 2.0, pc.CubicOut)
        .onComplete(() => {
            this.entity.enabled = false;
        })
        .start();
    
    
    this.entity.setLocalScale(0, 0, 0);
    this.scaleTween = this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(1.5, 1.5, 1.5), 0.9, pc.ElasticOut);

    this.scaleTween2 = this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(0, 0, 0), 0.25, pc.SineIn)
         .delay(1.15);
    
    this.scaleTween.chain(this.scaleTween2).start();


    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.15, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.25, pc.Linear)
        .delay(2);
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};


// smileCool.js
var SmileCool = pc.createScript('smileCool');


SmileCool.prototype.initialize = function() {
    this.entity.enabled = false;
    this.entity.element.opacity = 0;
    
    this.app.on('smile:cool', this.show, this);
};

// update code called every frame
SmileCool.prototype.update = function(dt) {
    
};


SmileCool.prototype.show = function() {
    if(isUIHidden('reactions')) {
        return;
    }
    
    this.app.fire("audio:play", "emojiCool");
    
    if(this.positionTween && this.positionTween.playing) {
        this.positionTween.stop();
    }
    
    if(this.scaleTween && this.scaleTween.playing) {
        this.scaleTween.stop();
    }
    
    if(this.rotatingTween && this.rotatingTween.playing) {
        this.rotatingTween.stop();
    }
    
    if(this.rotatingTween2 && this.rotatingTween2.playing) {
        this.rotatingTween2.stop();
    }

    if(this.alphaAppearingTween && this.alphaAppearingTween.playing) {
        this.alphaAppearingTween.stop();
    }
    
    if(this.alphaDisappearingTween && this.alphaDisappearingTween.playing) {
        this.alphaDisappearingTween.stop();
    }
    
    this.entity.enabled = true;
  
    //tween appearing 
    
    
    var screenSide = (this.app.root.findByName("ComboEffect").element.anchor.x > 0.5) ? 1 : -1;
    var yAnchor = pc.math.random(0.4, 0.6);
    if(screenSide > 0) {
        this.entity.element.anchor = new pc.Vec4(0.35, yAnchor, 0.35, yAnchor);
        this.initialX = -100;
    } else {
        this.entity.element.anchor = new pc.Vec4(0.65, yAnchor, 0.65, yAnchor);
          this.initialX = 100;
    }
    
    //tween appearing 
    this.entity.setLocalPosition(this.initialX, 0, 0);
    this.positionTween = this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(this.initialX, 30, 0), 2.0, pc.SineInOut)
        .onComplete(() => {
            this.entity.enabled = false;
        })
        .start();

    this.entity.setLocalEulerAngles(0, 0, 180);
    this.rotatingTween = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 0, 1), 0.45, pc.BackOut);

    this.rotatingTween2 = this.entity.tween(this.entity.getLocalRotation())
        .to(new pc.Vec4(0, 0, 1, 0), 0.35, pc.SineOut)
        .delay(1.35);
    
    this.rotatingTween.chain(this.rotatingTween2).start();
    
    this.entity.element.opacity = 0;
    this.alphaAppearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 1}, 0.3, pc.Linear);
    
    this.alphaDisappearingTween = this.entity.tween(this.entity.element)
        .to({opacity: 0}, 0.25, pc.Linear)
        .delay(1.5)
        .onComplete(() => {
            this.entity.enabled = false;
        });
    
    this.alphaAppearingTween.chain(this.alphaDisappearingTween).start();
};


// animatedSprite.js
var AnimateSprite = pc.createScript('animateSprite');

AnimateSprite.attributes.add('startFrame', {
    type: 'number',
    default: 0,
    description: 'Frame to start animation from'
});

AnimateSprite.attributes.add('numFrames', {
    type: 'number',
    default: 1,
    description: 'Number of frames to play before looping'
});

AnimateSprite.attributes.add('frameRate', {
    type: 'number',
    default: 1,
    description: 'Playback frames per second'
});

// initialize code called once per entity
AnimateSprite.prototype.initialize = function() {
    this.timer = 1/this.frameRate;
    this.frame = this.startFrame;
};

// update code called every frame
AnimateSprite.prototype.update = function(dt) {
            
    // calculate when to animate to next frame
    this.timer -= dt;            
    if (this.timer < 0) {
        // move to next frame
        this.frame++;
        if (this.frame >= (this.numFrames + this.startFrame)) {
            this.frame = this.startFrame;
        }

        this.entity.element.spriteFrame = this.frame;
        
         // reset the timer
        this.timer = 1 / this.frameRate;
    }
};

// ballsCounter.js
/* jshint esversion: 6 */
var BallsCounter = pc.createScript('ballsCounter');

BallsCounter.attributes.add('activeBall', {type: "entity"});
BallsCounter.attributes.add('camera', {type: "entity"});
BallsCounter.attributes.add('screen', {type: "entity"});

BallsCounter.prototype.initialize = function() {
    this.ballsCounterText = this.entity.findByName("BallsCounterText");
    this.defeatCountdownText = this.entity.findByName("DefeatCountdownText");
    this.lastBallsAmount = 0;
    this.screenPos = new pc.Vec3();
};

// update code called every frame
BallsCounter.prototype.update = function(dt) {   
    
     if(!GameplayController.currentSession) {
         this.ballsCounterText.enabled = false;
         this.defeatCountdownText.enabled = false;
         return;
     }
        
     var preparedBall = this.activeBall.script.ballController.preparedBall;
     var ballsLeft = GameplayController.currentSession.ballsLeft;

     if(ballsLeft != this.lastBallsAmount) {
         this.lastBallsAmount = ballsLeft;
         this.ballsCounterText.element.text = '' + this.lastBallsAmount;
     }
    
     if(GameplayController.currentSession.defeatTimerActive) {
         this.defeatCountdownText.enabled = true;

         if(this.lastDefeatTimer != Math.ceil(GameplayController.currentSession.defeatTimer)) {
            this.lastDefeatTimer = Math.ceil(GameplayController.currentSession.defeatTimer);
             this.defeatCountdownText.element.text = '' + this.lastDefeatTimer;
             
             this.app.fire("audio:play", this.lastDefeatTimer % 2 === 0 ? "tic" : "tac");
         
             this.defeatCountdownText.element.opacity = 1;
             this.defeatCountdownText.tween(this.defeatCountdownText.element)
                .to({opacity: 0}, 0.95, pc.SineIn)
                .start();
             
             this.defeatCountdownText.setLocalScale(1, 1, 1);
             this.defeatCountdownText.tween(this.defeatCountdownText.getLocalScale())
                .to(new pc.Vec3(2.2, 2.2, 2.2), 0.95, pc.SineOut)
                .start();
         }
     } else {
         this.defeatCountdownText.enabled = false;
     }
    
            
    
     if(preparedBall && !preparedBall.script.ball.isColorBall && !preparedBall.script.ball.isCannonBall && this.lastBallsAmount > 0) {
         this.ballsCounterText.enabled = true;   
         let ballPosition = preparedBall.getPosition();
         this.camera.camera.worldToScreen(ballPosition, this.screenPos);
         var scale = this.screen.screen.scale;
         var device = this.app.graphicsDevice;
         this.entity.setLocalPosition((this.screenPos.x * this.app.graphicsDevice.maxPixelRatio) / scale, (device.height - (this.screenPos.y  * this.app.graphicsDevice.maxPixelRatio)) / scale, 0);    
     } else {
         this.ballsCounterText.enabled = false;         
         this.entity.setLocalPosition(this.app.graphicsDevice.width / 2, this.app.graphicsDevice.height * 0.25, 0);    
     }
    
    

    
    if(GameplayController.currentSession.unlimitedBalls) {
        this.ballsCounterText.enabled = false;
    }    
};



// defeatWindow.js
/* jshint esversion: 6 */
var DefeatWindow = pc.createScript('defeatWindow');

DefeatWindow.prototype.initialize = function () {

    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRestart = this.entity.findByName("ButtonRestart");
    this.entity.background = this.entity.findByName("Background");
    this.entity.scoreGroup = this.entity.findByName("ScoreGroup");
    this.entity.maxScoreGroup = this.entity.findByName("MaxScoreGroup");
    this.entity.coinsGroup = this.entity.findByName("CoinsGroup");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");
    this.entity.coinsText = this.entity.coinsGroup.findByName("Text");
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.buttonMoreCoins = this.entity.coinsGroup.findByName("GetCoinsButton");
    this.entity.buttonMoreCoinsText = this.entity.buttonMoreCoins.findByName("Text");

    Utils.assignAction(this.entity.buttonRestart, this.restartPressed, this);
    Utils.assignAction(this.entity.buttonMoreCoins, this.acquireMoreCoinsPressed, this);

    const scriptContext = this;

    /* show method */
    this.entity.show = function () {
        this.enabled = true;

        scriptContext.app.fire("app:save");
        scriptContext.app.fire("audio:play", "lose");

        if (scriptContext.buttonRestartTween && scriptContext.buttonRestartTween.playing) {
            scriptContext.buttonRestartTween.stop();
        }


        this.buttonRestart.setLocalScale(0, 0, 0);

        var showButtons = (delay) => {
            /* tween buttons */
            scriptContext.buttonRestartTween = this.buttonRestart
                .tween(this.buttonRestart.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
                .delay(delay)
                .start();
        };

        if (window.famobi_analytics) {
            setTimeout(() => {
                Promise.all([
                    window.famobi_analytics.trackEvent(
                        "EVENT_LEVELFAIL",
                        {
                            levelName: '' + GameplayController.currentLevel,
                            reason: 'dead'
                        }
                    ),
                    window.famobi_analytics.trackEvent(
                        "EVENT_TOTALSCORE",
                        {
                            totalScore: GameplayController.sessionScores
                        }
                    ),
                    window.famobi_analytics.trackEvent(
                        "EVENT_LEVELSCORE",
                        {
                            levelName: '' + GameplayController.currentLevel,
                            levelScore: GameplayController.sessionScores
                        }
                    )
                ]).then(() => showButtons(1.4), () => showButtons(1.4));
            }, 500);
        } else {
            showButtons(1.85);
        }

        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({ opacity: 0.94 }, 0.25, pc.Linear)
            .start();

        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween =
            this.headingIcon.tween(this.headingIcon.element)
                .to({ opacity: 0.9 }, 0.5, pc.Linear)
                .delay(0.25);

        this.headingIcon.setLocalPosition(0, -360, 0);
        var headingMovingTween =
            this.headingIcon.tween(this.headingIcon.getLocalPosition())
                .to(new pc.Vec3(0, 0, 0), 0.9, pc.SineOut)
                .delay(0.2);

        headingAppearingTween.chain(headingMovingTween).start();

        this.headingIcon.setLocalScale(0.5, 0.5, 0.5);
        var headingAppearingScaleTween =
            this.headingIcon.tween(this.headingIcon.getLocalScale())
                .to(new pc.Vec3(1.5, 1.5, 1.5), 0.55, pc.BackOut)
                .delay(0.25);

        var headingMovingScaleTween =
            this.headingIcon.tween(this.headingIcon.getLocalScale())
                .to(new pc.Vec3(1.0, 1.0, 1.0), 0.9, pc.SineOut)
                .delay(0.1);

        headingAppearingScaleTween.chain(headingMovingScaleTween).start();


        /* tween text groups */
        this.scoreGroup.setLocalScale(0, 0, 0);
        this.scoreGroup.tween(this.scoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.35)
            .start();

        this.maxScoreGroup.setLocalScale(0, 0, 0);
        this.maxScoreGroup.tween(this.maxScoreGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.5)
            .start();

        this.coinsGroup.setLocalScale(0, 0, 0);
        this.coinsGroup.tween(this.coinsGroup.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.45, pc.BackOut)
            .delay(1.65)
            .start();


        if (Apicontroller.hasRewardedVideo()) {
            this.buttonMoreCoins.coinsValue = pc.math.clamp(GameplayController.lastLevelCoins || 10, 10, 99);
            this.buttonMoreCoins.enabled = true;
            this.buttonMoreCoinsText.element.text = '+' + this.buttonMoreCoins.coinsValue;
            this.buttonMoreCoins.setLocalScale(0, 0, 0);
            this.buttonMoreCoins.tween(this.buttonMoreCoins.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.4, pc.BackOut)
                .delay(2.5)
                .start();
        } else {
            this.buttonMoreCoins.enabled = false;
        }

        /* tween texts */

        const textTweenDelay = 1.75;
        if (GameplayController.sessionScores > 0) {
            this.delayedCall(textTweenDelay * 1000, () => scriptContext.app.fire("audio:unmute", "counting", 0.9));
            this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire("audio:mute", "counting"));
        }

        Utils.tweenText(this.scoreText, 0, GameplayController.sessionScores, 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, 0, GameplayController.maxScores, 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        Utils.tweenText(this.coinsText, 0, GameplayController.coins, 0.5, textTweenDelay + 0.5, pc.SineOut, true);


        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if (GameplayController.maxScores === GameplayController.sessionScores) {

            this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                .to({ opacity: 1 }, 0.3, pc.Linear)
                .delay(textTweenDelay + 1)
                .onComplete(() => {
                    scriptContext.app.fire('audio:play', 'newBest');
                })
                .onUpdate( () => {
                    this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 60, 0, 0);
                })
                .start();

            this.newBestScoreIcon.tween(this.newBestScoreIcon.getLocalScale())
                .to(new pc.Vec3(1, 1, 1), 0.42, pc.BackOut)
                .delay(textTweenDelay + 1)
                .start();
        }



    }.bind(this.entity);


    /* hide method */
    this.entity.hide = function () {
        this.enabled = false;
    }.bind(this.entity);

    this.entity.hide();
};


DefeatWindow.prototype.update = function (dt) {

};

DefeatWindow.prototype.restartPressed = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Defeat:Restart",
    });


    window.famobi.showInterstitialAd({
        eventId: "Button:Results:Restart",
        callback: () => {
            TransitionScreen.instance.transitionTo(() => {
                GameplayController.sessionScores = 0;
                this.app.fire("app:save");
                this.entity.hide();
                this.app.fire("gameplay:start", false, true);
            });
        }
    });


};

DefeatWindow.prototype.acquireMoreCoinsPressed = function () {
    var previousCoinsValue = GameplayController.coins;
    var rewardAmount = this.entity.buttonMoreCoins.coinsValue || 10;
    Apicontroller.showRewardedVideo((result) => {
        if (result && result.rewardGranted) {
            GameplayController.addCoins(rewardAmount);
            Utils.tweenText(this.entity.coinsText, previousCoinsValue, GameplayController.coins, 0.5, 0.1, pc.SineOut, true);
            this.app.fire("app:save");
            this.app.fire("audio:play", "purchaseDone");
            this.entity.delayedCall(0, () => this.app.fire("audio:unmute", "counting", 0.9));
            this.entity.delayedCall(0.5 * 1000, () => this.app.fire("audio:mute", "counting"));
            famobi.log(rewardAmount + ' coins added');
        }

    });
    this.entity.buttonMoreCoins.enabled = false;
};



// specialOffer.js
/* jshint esversion: 6 */
var SpecialOffer = pc.createScript('specialOffer');

SpecialOffer.prototype.initialize = function() {    
    this.entity.buttonGather = this.entity.findByName("ButtonCoinsBox");
    this.entity.timeCounterPad = this.entity.findByName("TimeCounterPad");
    this.entity.timeLeftText = this.entity.findByName("TimeCounterText");
    this.entity.rewardPad = this.entity.findByName("RewardPad");
    this.entity.rewardText = this.entity.findByName("RewardText");
    this.entity.rewardEffect = this.entity.findByName("RewardEffect");
    this.entity.rewardEffectIcon = this.entity.findByName("RewardEffectIcon");
    this.entity.rewardEffectText = this.entity.findByName("RewardEffectText");
    this.entity.moreTimeNeeded = this.entity.findByName("MoreTimeNeeded");
    this.entity.moreTimeNeededText = this.entity.moreTimeNeeded.findByName("Text");
    
    Utils.assignAction(this.entity.buttonGather, this.specialOfferPressed, this);

    this.entity.rewardEffect.enabled = false;
    this.entity.moreTimeNeeded.enabled = false;
};

SpecialOffer.prototype.update = function(dt) {
    var currentTimestamp = new Date().getTime();
    
    if(currentTimestamp - GameplayController.limitedOfferLastTimestamp > GameplayController.limitedOfferCooldown * 1000) {
        this.limitedOfferAvailable = true;
        this.entity.timeCounterPad.enabled = false;
        this.entity.rewardPad.enabled = true;
        this.entity.rewardText.element.text = '+' + GameplayController.limitedOfferRewardAmount;  
    } else {
        this.limitedOfferAvailable = false;
        this.entity.timeCounterPad.enabled = true;
        this.entity.rewardPad.enabled = false;
        this.entity.timeLeftText.element.text = Utils.humanizeTime(  (GameplayController.limitedOfferLastTimestamp / 1000 + GameplayController.limitedOfferCooldown) - currentTimestamp  / 1000);   
    }
};


SpecialOffer.prototype.specialOfferPressed = function() {
    if(this.limitedOfferAvailable) {
        if(Apicontroller.hasRewardedVideo()) {
            Apicontroller.showRewardedVideo((result) => result && result.rewardGranted && this.activateSpecialOffer());
        } else {
            this.activateSpecialOffer();
        }
    } else {
        this.app.fire("audio:play", "purchaseFailed");
        
        if(this.moreTimeNeededTween && this.moreTimeNeededTween.playing) {
            this.moreTimeNeededTween.stop();
        }
        
        if(this.moreTimeNeededAlphaTween && this.moreTimeNeededAlphaTween.playing) {
            this.moreTimeNeededAlphaTween.stop();
        }
        
        this.entity.moreTimeNeededText.element.text = '' +  this.entity.timeLeftText.element.text;
        this.entity.moreTimeNeeded.enabled = true;
        this.entity.moreTimeNeeded.setLocalPosition(0, 100, 0);
        this.moreTimeNeededTween = this.entity.moreTimeNeeded.tween(this.entity.moreTimeNeeded.getLocalPosition())
            .to(new pc.Vec3(0, 170, 0), 0.75, pc.QuadraticOut)
            .onComplete(() => {
                this.entity.moreTimeNeeded.enabled = false;
            })
            .start();       
        
        this.entity.moreTimeNeededText.element.opacity = 1;
        this.moreTimeNeededAlphaTween = this.entity.moreTimeNeededText.tween(this.entity.moreTimeNeededText.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.5)
            .start();        
        
    }
};

SpecialOffer.prototype.activateSpecialOffer = function() {
        this.limitedOfferAvailable = false;
        GameplayController.limitedOfferLastTimestamp = new Date().getTime();
        GameplayController.setCoins(GameplayController.coins + GameplayController.limitedOfferRewardAmount);
        
        this.app.fire("audio:play", "limitedOfferReward");
        this.app.fire("app:save");
        
        this.entity.rewardEffectText.element.text = '+' + GameplayController.limitedOfferRewardAmount;
        this.entity.rewardEffect.enabled = true;
        this.entity.rewardEffect.setLocalPosition(0, 100, 0);
        this.entity.rewardEffect.tween(this.entity.rewardEffect.getLocalPosition())
            .to(new pc.Vec3(0, 210, 0), 1.2, pc.QuadraticOut)
            .onComplete(() => {
                this.entity.rewardEffect.enabled = false;
            })
            .start();
        
        this.entity.rewardEffectIcon.element.opacity = 1;
        this.entity.rewardEffectIcon.tween(this.entity.rewardEffectIcon.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.9)
            .start();
        
        this.entity.rewardEffectText.element.opacity = 1;
        this.entity.rewardEffectText.tween(this.entity.rewardEffectText.element)
            .to({opacity: 0}, 0.25, pc.SineOut)
            .delay(0.9)
            .start();        
        
};

// localStorageController.js
/* jshint esversion: 6 */
var LocalStorageController = pc.createScript('localStorageController');

LocalStorageController.slotKey = "TowerCrash3D_v1.1.0";

LocalStorageController.prototype.initialize = function() {
    LocalStorageController.app = this.app;
    LocalStorageController.currentLocalStorage = window.famobi.localStorage;
    
    this.app.on("app:save", () => LocalStorageController.saveData(), this);
};

LocalStorageController.prototype.update = function(dt) {
    
};

LocalStorageController.getSaveData = function() {    
    const saveData = {
        currentLevel: GameplayController.currentLevel,
        coins: GameplayController.coins,
        sessionScores: GameplayController.sessionScores,
        maxScores: GameplayController.maxScores,
        limitedOfferLastTimestamp: GameplayController.limitedOfferLastTimestamp, 
        powerupMultiballPurchased: GameplayController.powerupMultiballPurchased,
        powerupEarthquakePurchased: GameplayController.powerupEarthquakePurchased,
        qualityIndex: 1,
        audioEnabled: SoundController.soundStateLoaded ? SoundController.audioEnabled : true, 
        musicEnabled: SoundController.soundStateLoaded ? SoundController.musicEnabled : true, 
        tutorialCompleted: TutorialScreen.tutorialCompleted,
        levels: LevelManager.getLevels(),
    };     
    return saveData;
};

LocalStorageController.saveData = function(immediately) {
    if(immediately) {
        var data = LocalStorageController.getSaveData();
        LocalStorageController.currentLocalStorage.setItem(LocalStorageController.slotKey, JSON.stringify(data));    
    } else {
        if(!isForcedMode()) {
                setTimeout(() => {
                var data = LocalStorageController.getSaveData();
                LocalStorageController.currentLocalStorage.setItem(LocalStorageController.slotKey, JSON.stringify(data));
            }, 50);
        }
    }
};

LocalStorageController.loadData = function() {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.slotKey);
    var dataLoaded = false;
       
    if(data) {
        try {
            data = JSON.parse(data);
            dataLoaded = true;
        } catch (e) {           
            data = LocalStorageController.getSaveData();
            LocalStorageController.saveData(true);
        }
    } else {
        data = LocalStorageController.getSaveData();
        LocalStorageController.saveData(true);
    }
    
    GameplayController.currentLevel = data.currentLevel;
    GameplayController.coins = data.coins;
    GameplayController.sessionScores = data.sessionScores || 0;
    GameplayController.maxScores = data.maxScores;
    GameplayController.limitedOfferLastTimestamp = data.limitedOfferLastTimestamp;
    GameplayController.powerupMultiballPurchased = data.powerupMultiballPurchased;
    GameplayController.powerupEarthquakePurchased = data.powerupEarthquakePurchased;
    SoundController.soundStateLoaded = true;
    LocalStorageController.app.fire(((data.audioEnabled === undefined) ? true : data.audioEnabled) ? 'audio:enable' : 'audio:disable');
    LocalStorageController.app.fire(((data.musicEnabled === undefined) ? true : data.musicEnabled) ? 'music:enable' : 'music:disable');
    TutorialScreen.tutorialCompleted = skipTutorial() ? true : data.tutorialCompleted;
    LevelManager.loadLevelsFromStorage(data.levels);
};


// finishSurface.js
var FinishSurface = pc.createScript('finishSurface');

FinishSurface.prototype.initialize = function() {
    this.app.on("level:createBall", this.updatePosition, this);
    
    this.finishSurface = this.entity.findByName("FinishSurfaceSprite");
    this.finishSurface.sprite.opacity = 0.0;
    this.finishSurface.tween(this.finishSurface.sprite)
        .to({opacity: 0.9}, 0.85, pc.SineIn)
        .yoyo(true)
        .repeat(10000000)
        .start();
};

FinishSurface.prototype.update = function(dt) {
    this.finishSurface.enabled = GameplayController.levelActive && GameplayController.currentSession && GameplayController.currentSession.gameplayActive;
};

FinishSurface.prototype.updateposition = function() {
    var tower = this.app.root.findByName("Tower");
    this.finishSurface.setLocalPosition(0, tower.victoryHeightLimit, 0);
};

// exclamationMark.js
var ExclamationMark = pc.createScript('exclamationMark');

ExclamationMark.prototype.initialize = function() {
    this.exclamationMark = this.entity.findByName('ExclamationMark');  
    
    this.exclamationMark.tween(this.exclamationMark.getLocalScale())
        .to(new pc.Vec3(0.9, 0.9, 0.9), 0.25, pc.SineInOut)
        .yoyo(true)
        .repeat(100000)
        .start();
};


ExclamationMark.prototype.update = function(dt) {
    this.exclamationMark.enabled = this.entity.findByName("CheckMark") && this.entity.findByName("CheckMark").enabled;
};


// earnedCoinEffect.js
var EarnedCoinEffect = pc.createScript('earnedCoinEffect');

EarnedCoinEffect.prototype.initialize = function() {
    this.coinEffect = this.entity.findByName('EarnedCoinEffect');
    this.icon = this.coinEffect.findByName('EffectIcon');
    this.textValue = this.coinEffect.findByName('EffectText');
    
    this.app.on('coins:added', this.show, this);
    
    this.coinEffect.enabled = false;
};


EarnedCoinEffect.prototype.show = function(amount, anchor) {
    if(isUIHidden('coins')) {
        this.coinEffect.enabled = false;
        return;
    }
    
    if(this.coinEffectTween && this.coinEffectTween.playing){
        this.coinEffectTween.stop();
    }
     
    if(this.iconAlphaTween && this.iconAlphaTween.playing){
        this.iconAlphaTween.stop();
    }
    
    if(this.textAlphaTween && this.textAlphaTween.playing){
        this.textAlphaTween.stop();
    }

    this.coinEffect.element.anchor = anchor;
    
    this.app.fire('audio:play', 'coin');
    
    this.textValue.element.text = '+' + amount;
    this.coinEffect.enabled = true;
    this.coinEffect.setLocalPosition(0, 40, 0);
    this.coinEffectTween = this.coinEffect.tween(this.coinEffect.getLocalPosition())
           .to(new pc.Vec3(0, 120, 0), 1.1, pc.QuadraticOut)
            .onComplete(() => {
                this.coinEffect.enabled = false;
            })
            .start();
        
    this.icon.element.opacity = 1;
    this.iconAlphaTween =  this.icon.tween(this.icon.element)
        .to({opacity: 0}, 0.25, pc.SineOut)
        .delay(0.8)
        .start();

    this.textValue.element.opacity = 1;
    this.textAlphaTween = this.textValue.tween(this.textValue.element)
        .to({opacity: 0}, 0.25, pc.SineOut)
        .delay(0.8)
        .start();        
};

EarnedCoinEffect.prototype.update = function(dt) {
    
};



// levelManager.js
/* jshint esversion: 6 */
var LevelManager = pc.createScript('levelManager');

LevelManager.sortedPrefabs = [];
LevelManager.levels = [];

LevelManager.attributes.add('towersList', {
    title: "Towers",
    type: 'entity',
    array: true
});

LevelManager.prototype.initialize = function () {
    LevelManager.app = this.app;
    LevelManager.instance = this;

    this.app.on('famobi:restartGame', this.restartGame, this);
};



LevelManager.prototype.restartGame = function (dt) {


    WindowManager.hideAll();
    WindowManager.settingsPanel.show();

    if (isForcedMode()) {
        const forcedModeProperties = getForcedModeProperties();
        GameplayController.currentLevel = forcedModeProperties.state.level;
        GameplayController.coins = forcedModeProperties.state.coins || 0;
        GameplayController.sessionScores = 0;
        if (GameplayController.currentLevel === -1) {
            GameplayController.currentLevel = 1;
        }
        if (isUIHidden('score')) {
            this.app.root.findByName('GamePlayUI').findByName('CenterContainer').enabled = false;
        }
    } else {
        if (GameplayController.justPassedLevel) {
            GameplayController.currentLevel = GameplayController.justPassedLevel;
        }
    }


    // this.app.fire("tower:next");
    this.app.fire("gameplay:start", false, true);


    const doAPIHandshake = (startGameCallback) => {
        if (isExternalStart()) {
            const app = pc.AppBase.getApplication();
            app.timeScale = 0;
            famobi.onRequest("startGame", function () {
                app.timeScale = 1.0;
                if (startGameCallback) startGameCallback();
            });
        } else {
            if (startGameCallback) startGameCallback();
        }

        /* game ready report */
        famobi.gameReady();
    };

    setTimeout(() => doAPIHandshake(() => {
        console.log('Level restarted externally');
    }), 0);
};

LevelManager.prototype.update = function (dt) {

};

LevelManager.prepareLevels = function () {
    famobi.log("Preparing levels...");
    LevelManager.levels = [];

    for (let i = 0; i < LevelManager.instance.towersList.length; i++) {
        const prefab = LevelManager.instance.towersList[i];
        if (prefab) {
            const prefabConfig = prefab.script.towerConfig;
            LevelManager.sortedPrefabs.push(prefab);
            LevelManager.levels.push({
                prefabName: prefab.name,
                numColors: prefabConfig.numColors,
                difficulty: prefabConfig.difficulty,
                towerHeight: prefabConfig.towerHeight,
                numBalls: prefabConfig.numBalls,
            });
        }
    }

    for (let i = 0; i < 3; i++) {
        const shuffledPrefabs = Utils.shuffle(LevelManager.sortedPrefabs.slice());
        for (let t = 0; t < shuffledPrefabs.length; t++) {
            const prefab = shuffledPrefabs[t];
            const prefabConfig = prefab.script.towerConfig;
            const numColors = pc.math.clamp(prefabConfig.numColors + Math.floor(pc.math.random(i, i + 2)), 5, MaterialsStorage.objectMaterials.length || 8);
            const numLayers = prefabConfig.towerHeight + Math.floor(pc.math.random(2, 6)) * (i + 1);
            const ballsDifficultyMultiplier = 1 + (numColors - 5) * 0.16; // * (0.17 - (numColors - 5) * 0.01);
            const heightDifficultyMultiplier = numLayers / prefabConfig.towerHeight;
            const numBalls = Math.round(prefabConfig.numBalls * ballsDifficultyMultiplier * heightDifficultyMultiplier);
            LevelManager.levels.push({
                prefabName: prefab.name,
                numColors: numColors,
                difficulty: prefabConfig.difficulty,
                towerHeight: numLayers,
                numBalls: numBalls
            });
        }
    }
};

LevelManager.getLevels = function () {
    return LevelManager.levels;
};

LevelManager.getLevelConfig = function (levelNumber) {
    famobi.log("Loading level #" + levelNumber);
    var normalizedLevelNumber = levelNumber - 1;
    if (normalizedLevelNumber >= LevelManager.levels.length) {
        console.warn("Level #" + levelNumber + " is not available");
        return LevelManager.levels[normalizedLevelNumber % LevelManager.levels.length];
    } else {
        var level = LevelManager.levels[normalizedLevelNumber];
        return level;
    }
};

LevelManager.loadLevelsFromStorage = function (levels) {
    if (levels && levels.length > 0) {
        LevelManager.levels = levels.slice();
        famobi.log(LevelManager.levels.length + " levels loaded");
    } else {
        famobi.log("Levels could not be loaded, creating new ones...");
        LevelManager.prepareLevels();
    }
};


// triggersController.js
/* jshint esversion: 6 */
var TriggersController = pc.createScript('triggersController');

TriggersController.prototype.initialize = function() {
    this.app.on("level:restart", this.restart, this);
};

TriggersController.prototype.restart = function() {
    for(let i = this.entity.children.length - 1; i > -1; i--) {
        this.entity.children[i].destroy();
    }
};

TriggersController.prototype.update = function(dt) {
    
};

TriggersController.prototype.enableTriggers = function() {
    this.entity.children.forEach(child => child.enabled = true);
};

TriggersController.prototype.disableTriggers = function() {
    this.entity.children.forEach(child => child.enabled = false);
};

TriggersController.prototype.createTriggerInsteadOfBody = function(entity, possibleNeightbors) {
   
     if(entity.rigidbody && entity.collision && !entity.removedFromTower) {

        var collisionData = entity.collision.data;                               
        const triggerEntity = entity.clone();     
         
        triggerEntity.materialIndex = entity.materialIndex;
        triggerEntity.name = "trigger entity";
        triggerEntity.collisionScale = entity.collisionScale; 
        triggerEntity.possibleNeightbors = possibleNeightbors;
                 
        triggerEntity.removeComponent('rigidbody');
        triggerEntity.removeComponent('collision');
        triggerEntity.removeComponent('model');
         
        const scale = entity.getLocalScale();
        const scaleFactor = triggerEntity.collisionScale;
        triggerEntity.setLocalScale(scale.x * scaleFactor, scale.y * scaleFactor, scale.z * scaleFactor);
                  
        if(collisionData.type === 'mesh') {
            triggerEntity.physicalScale = scaleFactor;
            collisionData = {type: collisionData.type, asset: collisionData.asset};
        } else if (collisionData.type === 'box') {
            collisionData = {type:  collisionData.type, halfExtents: new pc.Vec3(collisionData.halfExtents.x * scaleFactor, collisionData.halfExtents.y * scaleFactor, collisionData.halfExtents.z * scaleFactor)};
        } else if (collisionData.type === 'cylinder') {
            collisionData = {type: collisionData.type, axis: collisionData.axis, radius:  collisionData.radius * scaleFactor, height: collisionData.height * scaleFactor};
        }
        
        triggerEntity.addComponent("collision", collisionData);
         
        if(!triggerEntity.script) {
            triggerEntity.addComponent('script');
        }
        triggerEntity.script.create('triggerItem');
         
        this.entity.addChild(triggerEntity);
        
        entity.script.item.killItem(0);
         
         
        GameplayController.currentSession.screenShakingTimer = 0.15;
         
        Utils.vibrate(25);
    }
};

// triggerItem.js
/* jshint esversion: 6 */
var TriggerItem = pc.createScript('triggerItem');


TriggerItem.prototype.initialize = function() {
    this.entity.triggerStartTimestamp = new Date().getTime();
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.entity.on('destroy', this.destroy, this);
    this.lifeTime = GameplayController.triggerLifeTime;
};


TriggerItem.prototype.update = function(dt) {
    this.lifeTime -= dt;
    if(this.lifeTime <= 0) {
        this.entity.destroy();
    }
};


TriggerItem.prototype.destroy = function() {
    this.entity.possibleNeightbors = null;
};

TriggerItem.prototype.onTriggerEnter = function(entity) {
   if(entity.rigidbody && entity.collision && entity.isTowerChild && !entity.removedFromTower && !entity.waitingTriggeredDestroy && this.entity.possibleNeightbors.indexOf(entity) != -1) {
        if(entity.materialIndex === this.entity.materialIndex) {
            const timestamp = new Date().getTime();
            const elapsedTime = (timestamp - this.entity.triggerStartTimestamp);
            const delay =  (elapsedTime < GameplayController.chainExplosionDelay) ? GameplayController.chainExplosionDelay - elapsedTime : 0;
            entity.script.item.chainedExplode(delay);
        }
    }
};


// tutorialScreen.js
/* jshint esversion: 6 */
var TutorialScreen = pc.createScript('tutorialScreen');

TutorialScreen.tutorialCompleted = false;
TutorialScreen.currentStage = 0;
TutorialScreen.firstBallLaunched = false;
TutorialScreen.targetEntity = null;

TutorialScreen.prototype.initialize = function() {
    this.stepOneHand = this.entity.findByName('TapTutorial').findByName('TutorialHand');
    this.tutorialStepTwoContainer = this.app.root.findByName('TutorialStepTwo');
    this.stepTwoHand = this.app.root.findByName('TutorialStepTwo').findByName("TutorialHand");
    
     this.stepOneHand.tween(this.stepOneHand.getLocalScale())
        .to(new pc.Vec3(0.9, 0.9, 0.9), 0.25, pc.SineInOut)
        .yoyo(true)
        .repeat(100000)
        .start();
    
    // this.app.on("tutorial:show", this.showTutorial, this);
    this.app.on('level:createBall', this.dispatchBallCreated, this);
    this.app.on("ball:launch", this.dispatchBallLaunch, this);
    this.app.on("orbitCamera:rotate", this.dispatchCameraRotate, this);
    
    this.stepOneHand.enabled = false;
    this.stepTwoHand.enabled = false;
};

TutorialScreen.prototype.update = function(dt) {
    if(this.stepOneHand && this.stepOneHand.enabled) {
        if(TutorialScreen.targetEntity) {
            this.setScreenPosition(this.stepOneHand, TutorialScreen.targetEntity.getPosition());
        }
    }
};

TutorialScreen.prototype.showFirstStageTutorial = function() {
    this.stepOneHand.enabled = true;
    
    this.stepOneHand.element.opacity = 0;
    this.stepOneHand.tween(this.stepOneHand.element)
        .to({opacity: 1}, 0.25, pc.Linear)
        .delay(0.1)
        .start();
    
    const tower = HierarchyManager.getInstance().getByPath("Tower");
    const camera = HierarchyManager.getInstance().getByPath("Camera");
    const cameraPosition = camera.getPosition().clone();
    cameraPosition.set(cameraPosition.x, cameraPosition.y - Math.random(0, 6), cameraPosition.z);
    
    var minCameraDistance = Number.MAX_VALUE;
    var closestChild = null;
        
    for (let i = tower.children.length - 1; i > -1; i--) {
        const child = tower.children[i];
        const cameraDistance = Utils.distanceBetweenEntities(child.getPosition(), cameraPosition);
        if(cameraDistance < minCameraDistance) {
            minCameraDistance = cameraDistance;
            closestChild = child;
        }
    }
    
    if(closestChild) {
        TutorialScreen.targetEntity = closestChild;
        this.setScreenPosition(this.stepOneHand, closestChild.getPosition());
        if(BallController.ball && BallController.ball.name === "Ball") {
            BallController.ball.setColor(closestChild.materialIndex);
        }
    }
};

TutorialScreen.prototype.dispatchBallCreated = function() {
    if(!TutorialScreen.tutorialCompleted && TutorialScreen.currentStage === 0) {
         setTimeout(() => {
             this.showFirstStageTutorial();
         }, 20);
    }
};

TutorialScreen.prototype.dispatchBallLaunch = function() {
    if(!TutorialScreen.tutorialCompleted &&  TutorialScreen.currentStage === 0) {
            this.stepOneHand.tween(this.stepOneHand.element)
                .to({opacity: 0}, 0.25, pc.Linear)
                .onComplete(() => {
                    this.stepOneHand.enabled = false; 
                    TutorialScreen.targetEntity = null;
                    this.startSecondStage();
                })
                .start();
        }
};


TutorialScreen.prototype.dispatchCameraRotate = function() {
    if(!TutorialScreen.tutorialCompleted &&  TutorialScreen.currentStage === 1) {
        TutorialScreen.tutorialCompleted = true;
            if(window.famobi_analytics) {
                window.famobi_analytics.trackEvent("EVENT_TUTORIALCOMPLETED");
            }
            this.stepTwoHand.tween(this.stepTwoHand.element)
                .to({opacity: 0}, 0.25, pc.Linear)
                .onComplete(() => {
                    this.stepOneHand.enabld = false;
                    this.stepTwoHand.enabled = false; 
                    this.app.fire("app:save");
                })
                .start();
        }
};


TutorialScreen.prototype.startSecondStage = function() {
    TutorialScreen.currentStage = 1;
    this.stepTwoHand.enabled = true;

    this.stepTwoHand.element.opacity = 0;
    this.stepTwoHand.tween(this.stepTwoHand.element)
        .to({opacity: 1}, 0.25, pc.Linear)
        .delay(0.25)
        .start();

    this.stepTwoHand.tween(this.stepTwoHand.getLocalPosition())
        .to(new pc.Vec3(130, 0, 0), 0.95, pc.QuadraticInOut)
        .delay(0.2)
        .yoyo(true)
        .repeat(100000)
        .start();
};


TutorialScreen.prototype.setScreenPosition = function(entity, targetPosition) {
       var screenPos = new pc.Vec3();
       HierarchyManager.getInstance().getByPath("Camera").camera.worldToScreen(targetPosition, screenPos);
       var scale = HierarchyManager.getInstance().getByPath('UI Container').screen.scale;
       var device = this.app.graphicsDevice;
       entity.setLocalPosition((screenPos.x * this.app.graphicsDevice.maxPixelRatio) / scale, (device.height - (screenPos.y * this.app.graphicsDevice.maxPixelRatio)) / scale, 0);   
};


/* STATIC */
TutorialScreen.cameraRotatingEnabled = function() {
    return TutorialScreen.tutorialCompleted || TutorialScreen.currentStage >= 1; 
};

TutorialScreen.shootingEnabled = function(entity) {
    return TutorialScreen.tutorialCompleted || (TutorialScreen.currentStage === 0 && TutorialScreen.targetEntity === entity); 
};

// APIController.js
/* jshint esversion : 6 */
var Apicontroller = pc.createScript('apicontroller');

Apicontroller.prototype.initialize = function () {
    famobi.log('API controller initialized');
    game = this.app;
};

Apicontroller.prototype.postInitialize = function () {
    const availablePowerups = ['earthquake', 'multiball'];
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);


    /* powerup activation via MonkeyGames App */
    window.famobi.activatePowerUp = (pPowerUp) => {
        return new Promise((resolve, reject) => {
            if (availablePowerups.indexOf(pPowerUp) === -1) {
                reject();
            } else {
                this.app.fire("powerup:activate", capitalizeFirstLetter(pPowerUp));
                resolve(pPowerUp);
            }
        });
    };
};

Apicontroller.prototype.update = function (dt) {

};

Apicontroller.isRewardedVideoFeatureEnabled = function () {
    return true;
};

Apicontroller.hasRewardedVideo = function () {
    if (Apicontroller.isRewardedVideoFeatureEnabled() && window.famobi && window.famobi.hasRewardedAd)
        return window.famobi.hasRewardedAd();
    else
        return false;
};

Apicontroller.showRewardedVideo = function (callback) {
    if (window.famobi && Apicontroller.hasRewardedVideo()) {
        window.famobi.rewardedAd(callback);
    } else {
        callback({ rewardGranted: false });
    }
};


/* Tracking stats */

Apicontroller.trackStats = function (...args) {
    if (window.famobi && window.famobi.hasFeature("trackstats") && window.famobi_analytics && window.famobi_analytics.trackStats) {
        window.famobi_analytics.trackStats(...args);
    }
};

/* Live score */
Apicontroller._sendLiveScore = function (liveScore) {
    this.lastLiveScoreReportTimestamp = new Date().getTime();
    window.famobi_analytics.trackEvent(
        "EVENT_LIVESCORE",
        {
            liveScore: liveScore
        }
    );
};

Apicontroller.reportLiveScore = function (score) {
    const currentTimestamp = new Date().getTime();
    this.lastLiveScoreReportTimestamp = this.lastLiveScoreReportTimestamp || 0;

    if (currentTimestamp - this.lastLiveScoreReportTimestamp >= 1000) {
        Apicontroller._sendLiveScore(score);
    } else {
        this._lastLiveScore = score;
        if (!this._nextReportTimeout) {
            this._nextReportTimeout = setTimeout(() => {
                if (this._lastLiveScore !== undefined) {
                    Apicontroller._sendLiveScore(this._lastLiveScore);
                    this._lastLiveScore = undefined;
                }
                this._nextReportTimeout = undefined;
            }, 1000 - (currentTimestamp - this.lastLiveScoreReportTimestamp));
        }
    }

};


/* Famobi API mock */

Apicontroller.injectFamobiMockObject = function () {
    if (typeof famobi !== "undefined" || window.famobi) return; /* famobi is already defined */

    const log = (message, color = '#bada55', backgroundColor = '#222') => console.log('%c ' + message, `background: ${backgroundColor}; color: ${color}`);

    console.warn('Injecting famobi mock object...');
    famobi = window.famobi = {};
    famobi.setPreloadProgress = value => log(`Progress ${value}%`, '#880000', '#FFEEEE');

    famobi.log = (...args) => console.log(...args);

    famobi.gameReady = function (value) {
        log("'Game ready to start' reported", "#FFFFFF", "#880000");
    };

    famobi.getOffsets = () => { return { top: 0, right: 0, bottom: 0, left: 0 } };
    famobi.onOffsetChange = (callback) => {

    }

    famobi.showInterstitialAd = (eventId, callback) => {
        if (typeof eventId === 'object') {
            eventId.callback();
        } else {
            callback();
        }
    };

    famobi.onRequest = function (param, callback) {
        log(`famobi.onRequest(${param})`, "#FFFFDD", "#5533FF");
        famobi.requests = famobi.requests || {};
        famobi.requests[param] = callback;

        if (param === 'startGame') {
            console.warn('Starting game in 500 ms...');
            setTimeout(() => callback(), 500);
        }
    };

    famobi.triggerRequest = function (param, ...args) {
        log(`famobi->request(${param})`, "#FFFFDD", "#5533FF");
        if (famobi.requests && famobi.requests[param]) {
            famobi.requests[param](...args);
        }
    };

    famobi.getVolume = function () {
        return 0.5;
    };

    famobi.playerReady = function () {
        log('playerReady() reported', '#00FF66', '#000');
    };

    famobi.hasFeature = function (key) {
        const options = {
            trackstats: false,
            external_start: false,
            skip_title: false,
            skip_tutorial: false,
            auto_quality: false,
            forced_mode: false,
            external_mute: true,
            copyright: true
        };

        return options[key] || false;
    };

    famobi.getFeatureProperties = function (key) {
        if (key === 'forced_mode') {
            return {
                "state": {
                    "level": 4,
                    "coins": 117
                },
                "override": {
                    "shots": 50,
                    "tower_colors": 3,
                    "cannonball_enabled": true,
                    "cannonball_special_mode_charges": 0,
                    "earthquake_powerups": 0,
                    "multiball_powerups": 0,
                    "prioritized_color": "Yellow",
                    "hide_ui": [/*"coins", "score", "powerups", "combo", "reactions"*/]
                }
            };
        } else {
            return {};
        }
    };

    famobi.getMoreGamesButtonImage = () => "https://games.cdn.famobi.com/portal/4638e320-4444-4514-81c4-d80a8c662371/more-games-button/600x253/5f564cb67de77.png";

    famobi.moreGamesLink = () => log('More games link');

    famobi_analytics = window.famobi_analytics = {
        trackEvent: (key, obj) => {
            log("famobi_analytics.trackEvent(" + key + ', ' + JSON.stringify(obj) + ")");
        },

        trackStats: (key, options, amount) => {
            log("[trackStats] " + key + " x" + (amount || 1) + " " + JSON.stringify(options || ""), "#FFFFFF", "#FF00FF");
        },
    };
};

/* Pause/resume handling */

pc.AppBase.prototype.pauseGame = function (ignoreVisibilityAPI) {
    if (ignoreVisibilityAPI) this.ignoreVisibilityAPI = true;
    this.applicationPaused = true;
    if(!famobi.hasFeature("external_focus")) {
        this.soundVolumeBeforePaused = SoundController.masterVolume;
        this.fire('audio:setMasterVolume', 0);
    }

    this.timeScale = 0;
    var inputBlocker = this.root.findByName("InputBlocker");
    if (inputBlocker) {
        inputBlocker.element.useInput = true;
    }
    famobi.log("Application:paused");
};

pc.AppBase.prototype.unpauseGame = function (forced) {
    if (isPageVisible && (!adIsShowing || forced)) {
        this.ignoreVisibilityAPI = false;
        this.applicationPaused = false;
        if (!famobi.hasFeature("external_focus")) {
            this.soundVolumeBeforePaused = window.famobi.getVolume();
            this.fire('audio:setMasterVolume', this.soundVolumeBeforePaused);
        }

        this.timeScale = 1;
        var inputBlocker = this.root.findByName("InputBlocker");
        if (inputBlocker) {
            inputBlocker.element.useInput = false;
        }
        famobi.log("Application:resumed");
    } else {
        famobi.log('resuming game is not allowed now because ads are displaying or page isn\'t visible...');
    }
};


Apicontroller.injectFamobiMockObject();

famobi.log('Global variables initialized');

/* Global scope variables */

var game;
var isPageVisible = true;
var adIsShowing = false;

var isExternalStart = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("external_start");
};

var isExternalMute = function () {
    return typeof famobi !== "undefined" && (famobi.hasFeature("external_mute") || famobi.hasFeature("external_audio"));
};

var skipTitleScreen = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("skip_title");
};

var skipTutorial = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("skip_tutorial");
};

var useAutoQuality = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("auto_quality");
};

var isForcedMode = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("forced_mode");
};

var isCopyrightEnabled = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("copyright");
};

var isEndlessMode = function () {
    return isForcedMode() && getForcedModeProperties().state.level === -1;
};


var getNumBalls = function () {
    const keepNumBalls = isEndlessMode() && GameplayController.currentSession;
    const numBalls = (isForcedMode() && getForcedModeProperties().override.shots >= 0) ? keepNumBalls ? GameplayController.currentSession.ballsLeft : getForcedModeProperties().override.shots : 100;
    return numBalls;
};



var getForcedModeProperties = function () {
    if (!famobi || typeof famobi === "undefined") return undefined;
    window._cachedForcedModeProperties = window._cachedForcedModeProperties || famobi.getFeatureProperties("forced_mode");
    return window._cachedForcedModeProperties;
};

var isUIHidden = function (uiKey) {
    return isForcedMode() && getForcedModeProperties() && getForcedModeProperties().override.hide_ui && getForcedModeProperties().override.hide_ui.indexOf(uiKey) !== -1;
};



//famobi pause/resume requests
window.famobi_onPauseRequested = function () {
    adIsShowing = true;
    if (game) {
        game.pauseGame();
    }
};

window.famobi_onResumeRequested = function () {
    adIsShowing = false;
    if (game) {
        game.unpauseGame();
    }
};

//Monkey App handlers
if (window.famobi) {
    window.famobi.onRequest("pauseGameplay", function () {
        if (game) {
            game.pauseGame(true);
        }
    });

    window.famobi.onRequest("resumeGameplay", function () {
        if (game) {
            game.unpauseGame();
        }
    });

    window.famobi.onRequest("restartGame", function () {
        if (game) {
            game.fire("famobi:restartGame");
        }
    });


    window.famobi.onRequest("enableAudio", function () {
        if (game) {
            game.fire("audio:enable");
            game.fire("music:enable");
        }
    });

    window.famobi.onRequest("disableAudio", function () {
        if (game) {
            game.fire("audio:disable");
            game.fire("music:disable");
        }
    });

    window.famobi.onRequest("changeVolume", function (volume) {
        if (game) {
            game.fire('audio:setVolumeMultiplier', volume);
        }
    });
}


if (!famobi.hasFeature('external_focus')) {
    //visiblity
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document["msHidden"] !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document["webkitHidden"] !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            isPageVisible = false;
            // if (game && !adIsShowing) game.pauseGame();
        } else {
            isPageVisible = true;
            if (game && !adIsShowing && game.applicationPaused && !game.ignoreVisibilityAPI) game.unpauseGame();
        }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        famobi.log("Browser doesn't support the Page Visibility API.");
    } else {
        // Handle page visibility change
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    famobi.log("Window VisibilityAPI connected");
} else {
    /** 
        * A snippet that forces the Playcanvas app to be rendered even if the tab/page focus is lost.
        * In other words, it just disables 'pause' feature. 
        * @author Igor Parada
        */
    (function () {

        const detectApplication = () => {
            if (typeof pc !== 'undefined') {
                const ApplicationClass = pc.AppBase || pc.Application;
                if (ApplicationClass && ApplicationClass.getApplication()) {
                    injectHack();
                }
            }
        };
        const _hookApplicationStart = setInterval(detectApplication, 100);

        const injectHack = () => {
            clearInterval(_hookApplicationStart);

            console.log('Injecting do-not-pause hack...')

            const ApplicationClass = pc.AppBase || pc.Application;
            const app = ApplicationClass.getApplication();
            const initialPlatformWasBrowser = pc.platform.browser;

            const MANUAL_RENDER_FPS = 60;

            let _hiddenAttr = 'hidden';
            let _manualRenderInterval = undefined;

            const setupManualRenderLoop = () => {
                if (_manualRenderInterval) {
                    console.warn('manual render is already active!');
                    return;
                }
                const averageFPS = app.stats && app.stats.frame && app.stats.frame.fps || MANUAL_RENDER_FPS;
                _manualRenderInterval = setInterval(() => app.tick(), 1000 / Math.min(averageFPS, MANUAL_RENDER_FPS));
            }

            const disableManualRenderLoop = () => {
                if (_manualRenderInterval) {
                    clearInterval(_manualRenderInterval);
                }
                _manualRenderInterval = undefined;
            }

            const onDocumentHidden = () => {
                setupManualRenderLoop();
            }

            const onDocumentRestored = () => {
                disableManualRenderLoop();
                if (_manualRenderInterval) {
                    app.tick();
                }
            }

            const _visibilityChangeHandler = () => {
                const documentHidden = document[_hiddenAttr];
                if (documentHidden) {
                    onDocumentHidden();
                } else {
                    onDocumentRestored();
                }
            };


            const addVisibilityChangeListeners = () => {
                // Depending on browser add the correct visibilitychange event and store the name of the
                // hidden attribute in this._hiddenAttr.
                if (typeof document !== 'undefined') {
                    if (document.hidden !== undefined) {
                        _hiddenAttr = 'hidden';
                        document.addEventListener('visibilitychange', _visibilityChangeHandler, false);
                    } else if (document.mozHidden !== undefined) {
                        _hiddenAttr = 'mozHidden';
                        document.addEventListener('mozvisibilitychange', _visibilityChangeHandler, false);
                    } else if (document.msHidden !== undefined) {
                        _hiddenAttr = 'msHidden';
                        document.addEventListener('msvisibilitychange', _visibilityChangeHandler, false);
                    } else if (document.webkitHidden !== undefined) {
                        _hiddenAttr = 'webkitHidden';
                        document.addEventListener('webkitvisibilitychange', _visibilityChangeHandler, false);
                    }
                }
            }

            const removeVisibilityChangeListeners = () => {
                if (typeof document !== 'undefined') {
                    document.removeEventListener('visibilitychange', _visibilityChangeHandler, false);
                    document.removeEventListener('mozvisibilitychange', _visibilityChangeHandler, false);
                    document.removeEventListener('msvisibilitychange', _visibilityChangeHandler, false);
                    document.removeEventListener('webkitvisibilitychange', _visibilityChangeHandler, false);
                }
            }

            app.on('destroy', () => {
                removeVisibilityChangeListeners();
            });

            /** path the playcanvas engine */
            ApplicationClass.prototype.isHidden = () => false;
            ApplicationClass.prototype.onVisibilityChange = () => {
                //just a stub to prevent pausing the sound subsystem
            };


            /** entry point */
            addVisibilityChangeListeners();
        }

    }());
}


// brandingImage.js
var BrandingImage = pc.createScript('brandingImage');


BrandingImage.prototype.initialize = function() {
    
    this.entity.element.opacity = 0;
    
    var self = this;
    this.app.loader.getHandler("texture").crossOrigin = "anonymous";

    var asset = new pc.Asset("brandingImage", "texture", {
        url: window.famobi.getMoreGamesButtonImage()
    });

    this.app.assets.add(asset);

    asset.on("error", function (message) {
        console.log("Branding image loading failed: ", message);
    });

    asset.on("load", function (asset) {
        var material = self.entity.element.texture = asset.resource;
        self.entity.element.opacity = 1;
        Utils.assignAction(self.entity, self.brandingPressed, self);
    });

    this.app.assets.load(asset);
};

BrandingImage.prototype.update = function(dt) {
    
};

BrandingImage.prototype.brandingPressed = function() {
    window.famobi.moreGamesLink();
};


// copyrightText.js
var CopyrightText = pc.createScript('copyrightText');

CopyrightText.prototype.initialize = function() {
    this.entity.enabled = isCopyrightEnabled();
};

CopyrightText.prototype.update = function(dt) {
    
};


// example.js
var Example = pc.createScript('example');
Example.attributes.add('textEntity', {type: 'entity'});

// update code called every frame
Example.prototype.update = function(dt) {
    var kb = this.app.keyboard;
    if (kb.wasPressed(pc.KEY_1)) {
        this.textEntity.fire('updatetext', 'Flags: 🇺🇸🇩🇪🇮🇪🇮🇹🏴‍☠️🇨🇦');
    } else if (kb.wasPressed(pc.KEY_2)) {
        this.textEntity.fire('updatetext', 'Complex emoji: 👨🏿3️⃣👁️‍🗨️');
    } else if (kb.wasPressed(pc.KEY_3)) {
        this.textEntity.fire('updatetext', '𝔴𝔢𝔦𝔯𝔡 𝔲𝔫𝔦𝔠𝔬𝔡𝔢 𝔠𝔥𝔞𝔯𝔞𝔠𝔱𝔢𝔯𝔰');
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Example.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

// CanvasFontHelper.js
var CanvasFontHelper = pc.createScript('canvasFontHelper');

CanvasFontHelper.attributes.add('fontAssets', {
    type: 'json',
    array: true,
    schema: [{
        name: 'name',
        type: 'string',
        description: 'Name for the font face for the canvas font to reference'
    }, {
        name: 'asset',
        type: 'asset',
        assetType: 'binary',
        description: 'Font asset'
    }]
});



CanvasFontHelper.attributes.add('canvasFonts', {
    type: 'json', 
    array: true,
    schema: [{
        name: 'assetName',
        type: 'string',
        default: 'Arial Canvas Font White',
        description: 'If possible, keep this unique to make this easy to find in the assets registry!'
    }, {
        name: 'fontFaces',
        type: 'string',
        default: 'Arial',
        description: 'This has to be written as though it was in a CSS file (https://www.w3schools.com/cssref/pr_font_font-family.asp)'      
    }, {
        name: 'textureSize', 
        type: 'vec2', 
        default: [2048, 2048],
        description: 'The larger the size, the more VRAM is used. More textures are created to fit the glyphs as the canvas font is updated'
    }, {
        name: 'fontSize', 
        type: 'number',
        default: 64,
        description: 'The larger the size, the sharper the glyph but the more space it takes up on the texture'
    }, {
        name: 'color',
        type: 'rgb',
        default: [1, 1, 1]
    }]
});

// initialize code called once per entity
CanvasFontHelper.prototype.initialize = function() {
    var self = this;
    var app = this.app;
    var i;
    
    // Create the canvas font assets
    for (i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        canvasFont.asset = new pc.Asset(canvasFont.assetName, 'font', {});
        app.assets.add(canvasFont.asset);
        canvasFont.asset.loaded = false;
    }

    // Load the font files
    var fontsLoadedCount = 0;
    var fontsFacesAdded = [];
    
    for (i = 0; i < this.fontAssets.length; ++i) {
        // Fontface API not supported in IE 11
        var fontAsset = this.fontAssets[i];
        var font = new FontFace(fontAsset.name, 'url(' + fontAsset.asset.getFileUrl() + ')');  
        font.load().then((loadedFace) => {
            document.fonts.add(loadedFace);    
            fontsFacesAdded.push(loadedFace);
            fontsLoadedCount += 1;
            
            if (fontsLoadedCount == self.fontAssets.length) {
                self._onFontFacesLoaded();
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    // Remove the fonts and canvas fonts when this script is destroyed
       
    // Cleanup if destroyed
    this.on('destroy', function () {
        var i;
        
        for (i = 0; i < fontsFacesAdded.length; ++i) {
            document.fonts.delete(fontsFacesAdded[i]);
        }
        
        for (i = 0; i < this.canvasFonts.length; ++i) {
            var canvasFont = this.canvasFonts[i];
            canvasFont.asset.resource.destroy();
            app.assets.remove(canvasFont.asset);
        }
    }, this);
};


CanvasFontHelper.prototype._onFontFacesLoaded = function () {
    for (var i = 0; i < this.canvasFonts.length; ++i) {
        var canvasFont = this.canvasFonts[i];
        
        var cf = new pc.CanvasFont(this.app, {
            color: canvasFont.color,
            fontName: canvasFont.fontFaces, // Font has to be added as a font face or exist already on the user's PC
            fontSize: canvasFont.fontSize,
            width: canvasFont.textureSize.x,
            height: canvasFont.textureSize.y,
            getCharScale: function (code) {
                // Finger pointing up and rainbow
                if (code === 0x261D || code === 0x1F308) {
                    return 0.8;
                }

                return -1; // use default scale
            }
        });

        canvasFont.asset.resource = cf;

        // Create the textures first
        cf.createTextures(' ');
        canvasFont.asset.loaded = true;
        canvasFont.asset.fire('load', canvasFont.asset);
    }
};


/** Inject Text Element helpers */
const _setTextOriginal = pc.TextElement.prototype._setText;

pc.TextElement.prototype._setText = function() {
    this._entity.fire('bitmaptext:render',  ...arguments);
    _setTextOriginal.call(this, ...arguments);
};

// BitmapText.js
var BitmapText = pc.createScript('bitmapText');


BitmapText.attributes.add('fontAssetName', { 
    type: 'string',
    default: 'CeraPro-Black'
});


BitmapText.prototype.initialize = function () {
    this.entity.__useBitmapFontRenderer__ = true;
    this.initialString = this.entity.element.key || this.entity.element.text;
    this.initialKey = this.entity.element.key;
    
    if(this.entity.element) {
        this.entity.element.rtlReorder = false;
        this.entity.element.unicodeConverter = false;
    }
};


BitmapText.prototype.postInitialize = function () {
    this._canvasFontAsset = this.app.assets.find(this.fontAssetName);

    if (this._canvasFontAsset == null) {
        console.warn("Can't find font asset: " + this.fontAssetName);
    } else {
        if (this._canvasFontAsset.loaded) {
            this._onCanvasFontAssetLoaded(this._canvasFontAsset);
        } else {
            this._canvasFontAsset.ready(this._onCanvasFontAssetLoaded, this);
        }
    }
};


BitmapText.prototype._onCanvasFontAssetLoaded = function (asset) {
    this.entity.element.fontAsset = this._canvasFontAsset;
    this.entity.on('bitmaptext:render', this._renderText, this);
    this._updateText(this.entity.element.text);
};


BitmapText.prototype._updateText = function (text) {
    if(!this._canvasFontAsset) return console.error('Asset not loaded: ', this.entity.path);
    if (this._canvasFontAsset.loaded) {
        this._canvasFontAsset.resource.updateTextures(text);
        this.entity.element.text = text;
    } else {
        this.initialString = text;
    }
};

BitmapText.prototype._renderText = function (text) {
    if (this._canvasFontAsset.loaded) {
        this._lastLocale = this.app.i18n.locale;
        this._canvasFontAsset.resource.updateTextures(text);
    }
};



BitmapText.prototype.update = function (dt) {
    if(this.entity.element.key || this.initialKey) {
        if(this.app.i18n.locale !== this._lastLocale) {
            this._updateText(this.app.i18n.getText(this.entity.element.key || this.initialKey));   
        }
    }
};




// famobiSafeArea.js
/**
 * A script that automatically adds required gaps & resizes game canvas to fit Famobi interstitial banner.
 * 
 * How to use: just attach that script to the Root component of your Playcanvas app.
 * To test how it works, please use 'Debug / Testing Mode' attribute of the script. Don't forget to disable debug mode before publising a build! :)
 * 
 *  If you are using Window Resize API (window.onresize(...) or window.addEventListener('resize', ....)),
 *  please get rid of these. Instead , please listen to 'famobi:resizeCanvas' in-app event. For example: 
 * 
 *      this.app.on('famobi:resizeCanvas', function(canvasWidth, canvasHeight) {
 *          console.log('Adjusted canvas size is ', canvasWidth, canvasHeight);
 *      })
 * 
 * 
 * @author Igor Parada / ©Famobi 2023
 */

var FamobiSafeArea = pc.createScript('famobiSafeArea');

FamobiSafeArea.attributes.add('resizeOnInput', {
    type: 'boolean',
    title: 'Resize when input received',
    description: "Resize the canvas every time an input event is received? This may help if the game reports incorrect input positions due to Famobi offsets but may cause slight CPU overhead in some games.",
    default: true
});

FamobiSafeArea.attributes.add('forceBodyBackgroundColor', {
    type: 'boolean',
    default: true,
    title: 'Change <body> background',
    default: true
});

FamobiSafeArea.attributes.add('bodyBackgroundColor', {
    type: 'rgba',
    title: 'Body Background Color',
    description: "Background color of body element (where the banner should be displayed). Make sure the checkbox above is checked!",
    default: [0, 0, 0, 1.0]
});

FamobiSafeArea.attributes.add('debugConfig', {
    type: 'json',
    title: 'Debug / Testing Mode',
    description: 'Force safe areas to be applied to the UI. Useful testing layouts without a device.',
    schema: [{
        name: 'enabled',
        type: 'boolean',
        default: false
    }, {
        name: 'top',
        type: 'number',
        default: 0
    }, {
        name: 'bottom',
        type: 'number',
        default: 0
    }, {
        name: 'left',
        type: 'number',
        default: 0
    }, {
        name: 'right',
        type: 'number',
        default: 0
    }]
});



FamobiSafeArea.prototype.initialize = function () {
    this.app.graphicsDevice.on('resizecanvas', this._onCanvasResize, this);

    this.on('attr:debugConfig', function (value, prev) {
        this._updateCanvasSizeAndPosition();
    }, this);

    this.on('attr:bodyBackgroundColor', function (value, prev) {
        this._backgroundColorUpdate();
    }, this);

    this.on('destroy', function () {
        this.app.graphicsDevice.off('resizecanvas', this._onCanvasResize, this);
    }, this);

    if (window.famobi && typeof window.famobi.onOffsetChange === 'function') {
        window.famobi.onOffsetChange(offsets => this._onCanvasResize());
    }

    /** viewport resize handling **/
    if (window.visualViewport) {
        this.useVisualViewport = true;
        window.visualViewport.addEventListener('resize', this._onCanvasResize.bind(this));
    } else {
        this.useVisualViewport = false;
        window.addEventListener('resize', this._onCanvasResize.bind(this), true);
    }

    this.app.on('famobi:requestResizeEvent', this._onCanvasResize, this);

    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this._dispatchInputEvent, this);
    } 
    if (this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this._dispatchInputEvent, this);
    } 

    this._onCanvasResize();
};

FamobiSafeArea.prototype._dispatchInputEvent = function() {
    if(this.resizeOnInput) {
        this._updateCanvasSizeAndPosition();
    } else {
        if(!this._firstInputEventReceived) {
            this._firstInputEventReceived = true;
            this._onCanvasResize();
        }
    }
}

FamobiSafeArea.prototype._onCanvasResize = function () {
    this._updateCanvasSizeAndPosition();

    /* known issue on iOS - window.resize may report incorrect window size, so we slightly delay the resize logic */
    if (pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this._updateCanvasSizeAndPosition(), 1000);
    }
};


FamobiSafeArea.prototype._updateCanvasSizeAndPosition = function () {
    let topPixels = 0;
    let bottomPixels = 0;
    let leftPixels = 0;
    let rightPixels = 0;

    if (this.debugConfig.enabled) {
        topPixels = this.debugConfig.top;
        bottomPixels = this.debugConfig.bottom;
        leftPixels = this.debugConfig.left;
        rightPixels = this.debugConfig.right;
    } else {
        let famobiOffsets = { left: 0, top: 0, right: 0, bottom: 0 };
        if (window.famobi && window.famobi.getOffsets) {
            famobiOffsets = window.famobi.getOffsets();
        }

        topPixels = famobiOffsets.top;
        bottomPixels = famobiOffsets.bottom;
        leftPixels = famobiOffsets.left;
        rightPixels = famobiOffsets.right;
    }

    const screenResHeight = window.innerHeight;
    const screenResWidth = window.innerWidth;

    const availableWidth = screenResWidth - leftPixels - rightPixels;
    const availableHeight = screenResHeight - topPixels - bottomPixels;

    this.app.setCanvasResolution(pc.RESOLUTION_FIXED, availableWidth, availableHeight);
    this.app.graphicsDevice.canvas.style.width = availableWidth + 'px';
    this.app.graphicsDevice.canvas.style.height = availableHeight + 'px';

    this.app.graphicsDevice.canvas.style.left = leftPixels + 'px';
    this.app.graphicsDevice.canvas.style.right = rightPixels + 'px';
    this.app.graphicsDevice.canvas.style.top = topPixels + 'px';
    this.app.graphicsDevice.canvas.style.bottom = bottomPixels + 'px';

    if (this.debugConfig.enabled) {
        console.log(`Canvas size set to ${availableWidth}x${availableHeight} (window ${window.innerWidth}x${window.innerHeight})`);
    }

    this.app.fire('famobi:resizeCanvas', availableWidth, availableHeight);

    this._backgroundColorUpdate();
};

FamobiSafeArea.prototype._backgroundColorUpdate = function () {
    if (!this.forceBodyBackgroundColor) return;
    const parentElement = this.app.graphicsDevice.canvas.parentElement;
    if (parentElement) {
        parentElement.style.backgroundColor = this.bodyBackgroundColor.toString();
    }
}


FamobiSafeArea.prototype.update = function (dt) {

};


/** Fix for camera/input **/

pc.CameraComponent.prototype.screenToWorld = function (screenx, screeny, cameraz, worldCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.screenToWorld(screenx, screeny, cameraz, w, h, worldCoord);
}


pc.CameraComponent.prototype.worldToScreen = function (worldCoord, screenCoord) {
    const device = this.system.app.graphicsDevice;
    const w = device.width / device.maxPixelRatio;
    const h = device.height / device.maxPixelRatio;
    return this._camera.worldToScreen(worldCoord, w, h, screenCoord);
}

// performanceMonitor.js
var PerformanceMonitor = pc.createScript('performanceMonitor');

PerformanceMonitor.attributes.add('autoAdjustQuality', {
    type: 'boolean',
    default: true
});

PerformanceMonitor.attributes.add('debugOutput', {
    type: 'boolean',
    default: false
});


PerformanceMonitor.attributes.add('maxDevicePixelRatio', {
    type: 'number',
    default: 3
});

PerformanceMonitor.attributes.add('minDevicePixelRatio', {
    type: 'number',
    default: 1.0
});


PerformanceMonitor.attributes.add('pixelRatioStep', {
    type: 'number',
    default: 0.25,
    min: 0,
    max: 1
});

PerformanceMonitor.attributes.add('targetFPS', {
    type: 'number',
    default: 60
});

PerformanceMonitor.attributes.add('acceptableFPS', {
    type: 'number',
    default: 45
});

PerformanceMonitor.attributes.add('minAcceptableFPS', {
    type: 'number',
    default: 30
});

PerformanceMonitor.attributes.add('fpsCheckInterval', {
    type: 'number',
    default: 1.5
});

PerformanceMonitor.attributes.add('sampleFrames', {
    type: 'number',
    default: 100
});

PerformanceMonitor.attributes.add('confidenceInterval', {
    type: 'number',
    default: 0.8,
    min: 0.4,
    max: 1
});



PerformanceMonitor.prototype.initialize = function () {
    this.maxSupportedPixelRatio = window.devicePixelRatio || 1;
    this.debugText = HierarchyManager.getInstance().getByPath('UI Container/DebugText');

    this.on('attr:debugOutput', this._switchDebugTextVisibility, this);
    this._switchDebugTextVisibility();


    /* set initial pixel ratio */
    /* for MacBookPro and desktops with retina displays */
    if (pc.platform.desktop && this.app.graphicsDevice.maxPixelRatio > 1.99) {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    } else {
        this.setPixelRatio(this.getDeviceOptimalDPR());
    }

    this.startPerformanceMonitoring(2000);
};


PerformanceMonitor.prototype.update = function (dt) {
    if (document.hidden) {
        return;
    }
    this.updatePerformanceMonitor(dt);
};

PerformanceMonitor.prototype.swap = function (old) {
    this.initialize();
};



PerformanceMonitor.prototype.startPerformanceMonitoring = function (delay) {
    this.app.root.delayedCall(delay, () => {
        this.performanceMonitoringStarted = true;
        this.performanceMonitoringCounter = 0;
        this.elapsedTime = 0;
        this.frameTimes = [];
        this.lastFPSMeasurements = [];
    });
};


PerformanceMonitor.prototype.updatePerformanceMonitor = function (dt) {
    if (this.performanceMonitoringStarted) {
        /* increase the counter */
        this.performanceMonitoringCounter += 1;
        this.elapsedTime += dt;

        const frameTime = dt;

        if (this.autoAdjustQuality) {
            this.frameTimes.push(frameTime);
            if (this.frameTimes.length >= this.sampleFrames || this.elapsedTime >= this.fpsCheckInterval) {
                this.elapsedTime = 0;
                this.calculateAverageFPS();
            }
        }

    }
};


PerformanceMonitor.prototype.calculateAverageFPS = function () {
    if (this.frameTimes.length < 12) return;
    // console.log('Calculating average FPS based of ' + this.frameTimes.length + ' frames...');
    const sortedTimes = this.frameTimes.slice().sort((a, b) => a - b);
    const lowerBoundFrames = Math.floor(sortedTimes.length * (1 - this.confidenceInterval) / 2);
    const upperBoundFrames = Math.floor(sortedTimes.length * (0.5 + this.confidenceInterval / 2));
    const effectiveFrameTimes = sortedTimes.slice(lowerBoundFrames, upperBoundFrames);
    const totalTime = effectiveFrameTimes.reduce((sum, current) => sum + current, 0);

    const averageFPS = (effectiveFrameTimes.length / totalTime);

    this.lastFPSMeasurements.push(averageFPS);
    while (this.lastFPSMeasurements.length > 20) {
        this.lastFPSMeasurements.shift();
    }

    this.adjustRendererScale(averageFPS);

    this.frameTimes.splice(0, this.frameTimes.length);
};



PerformanceMonitor.prototype.adjustRendererScale = function (averageFPS) {
    if (averageFPS < this.minAcceptableFPS) {
        this.decreaseQuality();
    } else if (averageFPS <= this.acceptableFPS) {
        this.setMediumQuality();
    } else if (averageFPS > this.targetFPS * 0.95) {
        this.increaseQuality();
    }

    this.calculateShadowSettings();

    if (this.debugOutput && this.debugText.enabled) {
        this.debugText.element.text = `${averageFPS.toFixed(1)} / ${this.app.graphicsDevice.maxPixelRatio.toFixed(3)} of ${this.maxDevicePixelRatio}, frames ${this.frameTimes.length}, fps-samples ${this.lastFPSMeasurements.length}`;
    }
};


PerformanceMonitor.prototype.calculateShadowSettings = function () {
    const currentPixelRatio = this.app.graphicsDevice.maxPixelRatio;
    if (currentPixelRatio <= this.minDevicePixelRatio && this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue < this.minAcceptableFPS)) {
        this.shadowsWasDisabled = true;
        this.app.fire('shadows:setEnabled', false);
    } else if (!this.shadowsWasDisabled && currentPixelRatio >= this.getDeviceOptimalDPR() && this.lastFPSMeasurements.length > 3 && this.lastFPSMeasurements.slice(this.lastFPSMeasurements.length - 3).every(fpsValue => fpsValue >= this.acceptableFPS)) {
        this.app.fire('shadows:setEnabled', true);
    }
};


PerformanceMonitor.prototype.decreaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio - this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.increaseQuality = function () {
    const targetRatio = pc.math.clamp(this.app.graphicsDevice.maxPixelRatio + this.pixelRatioStep, this.getMinDPR(), this.getMaxDPR());
    this.setPixelRatio(targetRatio);
};

PerformanceMonitor.prototype.setMediumQuality = function () {
    this.setPixelRatio(this.getDeviceOptimalDPR());
};

/* private */

PerformanceMonitor.prototype.setPixelRatio = function (value) {
    if (value !== this.app.graphicsDevice.maxPixelRatio) {
        famobi.log('Pixel ratio set to ', value);
        this.app.graphicsDevice.maxPixelRatio = value;
    }
};


PerformanceMonitor.prototype.getDeviceOptimalDPR = function () {
    const minDPR = this.getMinDPR();
    const maxDPR = this.getMaxDPR();
    return pc.math.clamp(minDPR + (maxDPR - minDPR) / 2, minDPR, maxDPR);
};

PerformanceMonitor.prototype.getMinDPR = function () {
    return Math.min(window.devicePixelRatio || 1, this.minDevicePixelRatio);
};

PerformanceMonitor.prototype.getMaxDPR = function () {
    return Math.min(this.maxSupportedPixelRatio, this.maxDevicePixelRatio);
};


PerformanceMonitor.prototype._switchDebugTextVisibility = function () {
    if (this.debugText) {
        this.debugText.enabled = this.debugOutput;
    }
};


// HierarchyManager.js
var HierarchyManager = pc.createScript('hierarchyManager');


HierarchyManager.getInstance = function () {
    if (!HierarchyManager._instance) console.error('HierarchyManager is not initialized yet');
    return HierarchyManager._instance;
};

HierarchyManager.prototype.initialize = function () {
    HierarchyManager._app = this.app;
    if (!HierarchyManager._instance) {
        HierarchyManager._instance = this;
    }

    this.hierarchyNameMap = new Map();
    this.hierarchyPathMap = new Map();
};

HierarchyManager.prototype.getByName = function (name) {
    const result = this.hierarchyNameMap.get(name);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByName(name);
        if (foundResult) {
            this.hierarchyNameMap.set(name, foundResult);
            return foundResult;
        } else {
            console.error(`Entity [ ${name} ] not found in hierarchy!`);
        }
    }
};


HierarchyManager.prototype.getByPath = function (path) {
    if (!path.startsWith("Root")) path = "Root/" + path;
    const result = this.hierarchyPathMap.get(path);
    if (result) {
        return result;
    } else {
        const foundResult = this.app.root.findByPath(path);
        if (foundResult) {
            this.hierarchyPathMap.set(path, foundResult);
            return foundResult;
        } else {
            console.error(`Entity path ${path} not found in hierarchy!`);
        }
    }
};



HierarchyManager.prototype.update = function (dt) {

};



// constants.js
var Constants = pc.createScript('constants');

Constants.GROUP_BALL = pc.BODYGROUP_USER_1;
Constants.GROUP_GLASS = pc.BODYGROUP_USER_2;

Constants.GAME_VERSION = 'v1.0.0';

Constants.STAGES_PER_LEVEL_MIN = 4;
Constants.STAGES_PER_LEVEL_MAX = 6;

Constants.TWEENS_LIST = [
            { 'Linear': 'Linear' },
            { 'QuadraticIn': 'QuadraticIn' },
            { 'QuadraticOut': 'QuadraticOut' },
            { 'QuadraticInOut': 'QuadraticInOut' },
            { 'CubicIn': 'CubicIn' },
            { 'CubicOut': 'CubicOut' },
            { 'CubicInOut': 'CubicInOut' },
            { 'QuarticIn': 'QuarticIn' },
            { 'QuarticOut': 'QuarticOut' },
            { 'QuarticInOut': 'QuarticInOut' },
            { 'QuinticIn': 'QuinticIn' },
            { 'QuinticOut': 'QuinticOut' },
            { 'QuinticInOut': 'QuinticInOut' },
            { 'SineIn': 'SineIn' },
            { 'SineOut': 'SineOut' },
            { 'SineInOut': 'SineInOut' },
            { 'ExponentialIn': 'ExponentialIn' },
            { 'ExponentialOut': 'ExponentialOut' },
            { 'ExponentialInOut': 'ExponentialInOut' },
            { 'CircularIn': 'CircularIn' },
            { 'CircularOut': 'CircularOut' },
            { 'CircularInOut': 'CircularInOut' },
            { 'BackIn': 'BackIn' },
            { 'BackOut': 'BackOut' },
            { 'BackInOut': 'BackInOut' },
            { 'BounceIn': 'BounceIn' },
            { 'BounceOut': 'BounceOut' },
            { 'BounceInOut': 'BounceInOut' },
            { 'ElasticIn': 'ElasticIn' },
            { 'ElasticOut': 'ElasticOut' },
            { 'ElasticInOut': 'ElasticInOut' }
    ];

Constants.prototype.initialize = function() {

};

// gameConfig.js
var GameConfig = pc.createScript('gameConfig');

GameConfig.attributes.add('drawMeshVertices', {
    type: 'boolean',
    default: false
});

GameConfig.attributes.add('enableTint', {
    type: 'boolean',
    description: 'Enable tint effect for items on the level, making bottom of them darker',
    default: true
});

GameConfig.attributes.add('meshPhysicsScaleFactor', {
    type: 'number',
    default: 0.96
});

GameConfig.attributes.add('glassCollisionUpscaleFactor', {
    type: 'number',
    default: 1.25
});

GameConfig.attributes.add('itemLinearDamping', {
    type: 'number',
    default: 0,
    min: 0,
    max: 1
});

GameConfig.attributes.add('itemAngularDamping', {
    type: 'number',
    default: 0,
    min: 0,
    max: 1
});

GameConfig.attributes.add('itemAngularVelocityLimit', {
    type: 'vec3',
    default: [10, 10, 10]
});

GameConfig.attributes.add('itemLowestYPositionThreshold', {
    type: 'number',
    description: 'object will be destroyed if its y-position will be below that value',
    default: -5,
    min: -10,
    max: 0
});

GameConfig.attributes.add('explosionRadius', {
    type: 'number',
    default: 3,
    min: 0.01,
    max: 25
});

GameConfig.attributes.add('explosionForce', {
    type: 'number',
    default: 10
});

GameConfig.attributes.add('explosionDampingFactor', {
    type: 'number',
    default: 1.5,
    min: 1, 
    max: 3
});

GameConfig.attributes.add('movingStandFriction', {
    type: 'number',
    default: 0.999,
    min: 0,
    max: 2000
});

GameConfig.attributes.add('movingStandRestitution', {
    type: 'number',
    default: 0.1,
    min: 0,
    max: 1
});

GameConfig.attributes.add('breakItemNumParticles', {
    type: 'number',
    array: true,
    description: 'how many particles will be created after destroying of a block, for low/medium/high quality',
    default: [4, 6, 8]
});

GameConfig.attributes.add('levelNameKeyword', {
    type: 'string',
    default: 'STAGE'
});

GameConfig.attributes.add('stageNameKeyword', {
    type: 'string',
    default: 'DONE'
});

GameConfig.attributes.add('scoresPerItem', {
    type: 'number',
    default: '1'
});

GameConfig.attributes.add('defeatTimer', {
    type: 'number',
    default: 1.0, 
    min: 0,
    max: 5
});

GameConfig.attributes.add('victoryTimer', {
    type: 'number',
    default: 0.5, 
    min: 0,
    max: 3
});

GameConfig.attributes.add('powerupProgressPerItem', {
    type: 'number',
    default: 0.004
});

GameConfig.attributes.add('powerupProgressPerStage', {
    type: 'number',
    default: 0.03
});



GameConfig.prototype.initialize = function() {
    GameConfig.app = this.app;
    GameConfig.instance = this;    
};


GameConfig.getAttribute = function(key) {
    if(GameConfig.instance[key] === undefined) {
        console.warn('GameConfig doesnt have attribute ' + key);
        return null;
    } else {
       return GameConfig.instance[key];
    }
};

// fps.js
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

Fps.prototype.update = function (dt) {
    this.fps.tick();
};


// utils.js
/* jshint esversion: 6 */
var Utils = pc.createScript('utils');

Utils.prototype.initialize = function() {
    Utils.app = this.app;
    
    this.app.on(EventTypes.INJECT_CUSTOM_PHYSICS, this.injectMeshCollisionSystem, this);
    // this.injectMeshCollisionSystem();
};

Utils.prototype.update = function(dt) {
    
};


Utils.prototype.injectMeshCollisionSystem = function() {    
    if(this.customPhysicsInjected) {
        return;
    }
    famobi.log("Injecting advanced mesh physics ....");    
    this.customPhysicsInjected = true;
       
    
    this.app.systems.collision.implementations.mesh.createPhysicalShape = function(entity, data) {        
          if(entity.rigidbody && entity.rigidbody.type === pc.BODYTYPE_DYNAMIC) {
              
                if (typeof Ammo !== 'undefined' && (data.model || data.render)) {
                    
                    var shape = new Ammo.btConvexHullShape();
                    var i, j;

                    var addPointIfUnique = function(array, a, b, c) {
                        for(var up = 0; up < array.length; up++) {
                            if(array[up][0] === a && array[up][1] === b && array[up][2] === c) {
                                return;
                            }
                        }
                        array.push([a, b, c]);
                    };

                    const meshesArray = data.model ? data.model.meshInstances.map(mi => mi.mesh) : data.render.meshes;
                    for (i = 0; i < meshesArray.length; i++) {
                        var mesh = meshesArray[i];
                        var ib = mesh.indexBuffer[pc.RENDERSTYLE_SOLID];
                        var vb = mesh.vertexBuffer;
                        var uniquePoints = [];

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
                        var i1, i2, i3;

                        var base = mesh.primitive[0].base;
                        for (j = 0; j < numTriangles; j++) {
                            i1 = indices[base + j * 3] * stride;
                            i2 = indices[base + j * 3 + 1] * stride;
                            i3 = indices[base + j * 3 + 2] * stride;

                            addPointIfUnique(uniquePoints, positions[i1], positions[i1 + 1], positions[i1 + 2]);
                            addPointIfUnique(uniquePoints, positions[i2], positions[i2 + 1], positions[i2 + 2]);
                            addPointIfUnique(uniquePoints, positions[i3], positions[i3 + 1], positions[i3 + 2]);
                        }

                        var ammoVec = new Ammo.btVector3();
                        for(var u = 0; u < uniquePoints.length; u++) {
                            var point = uniquePoints[u];
                            ammoVec.setValue(point[0], point[1], point[2]);
                            shape.addPoint(ammoVec, true);
                        }
                        Ammo.destroy(ammoVec);

                        if(GameConfig.getAttribute('drawMeshVertices')) {
                            console.group(entity.name + ' has ' + uniquePoints.length + ' vertices:');
                            uniquePoints.forEach(point => {
                                var vertex1 = pc.app.root.findByName("ObjectsPrefabs").findByName("VertexModel").clone();
                                vertex1.setLocalPosition(point[0], point[1], point[2]);
                                entity.addChild(vertex1);
                            });
                            console.groupEnd();
                        }           
                    }

                    var entityTransform = entity.getWorldTransform();
                    var scale = entityTransform.getScale();
                    var vec = new Ammo.btVector3();
                    vec.setValue(scale.x * (GameConfig.getAttribute('meshPhysicsScaleFactor') || 1), scale.y * (GameConfig.getAttribute('meshPhysicsScaleFactor') || 1), scale.z * (GameConfig.getAttribute('meshPhysicsScaleFactor') || 1));
                    shape.setLocalScaling(vec);
                    Ammo.destroy(vec);


                    return shape;
                }
                return undefined;
            } else {
               
                if (typeof Ammo === 'undefined') return undefined;
                if (data.model || data.render) {
                    var shape = new Ammo.btCompoundShape();
                    if (data.model) {
                        var meshInstances = data.model.meshInstances;
                        for (var i = 0; i < meshInstances.length; i++) {
                            this.createAmmoMesh(meshInstances[i].mesh, meshInstances[i].node, shape);
                        }
                    } else if (data.render) {
                        var meshes = data.render.meshes;
                        for (var _i2 = 0; _i2 < meshes.length; _i2++) {
                            this.createAmmoMesh(meshes[_i2], tempGraphNode, shape);
                        }
                    }
                    var entityTransform = entity.getWorldTransform();
                    var scale = entityTransform.getScale();
                    var vec = new Ammo.btVector3(scale.x, scale.y, scale.z);
                    shape.setLocalScaling(vec);
                    Ammo.destroy(vec);
                    return shape;
                }
                return undefined;
            }
     };
        
     
    // this.app.systems.collision.implementations.mesh.system._getNodeScaling = function (node) {
    //     var wtm = node.getWorldTransform();
    //     var scl = wtm.getScale();
    //     return new Ammo.btVector3(scl.x, scl.y, scl.z);
    // };
    
    // this.app.systems.collision.implementations.mesh.system._getNodeTransform = function (node, relative) {
    //     var pos, rot;

    //     if (relative) {
    //         this._calculateNodeRelativeTransform(node, relative);

    //         pos = vec3;
    //         rot = quat;
    //         mat4.getTranslation(pos);
    //         rot.setFromMat4(mat4);
    //     } else {
    //         pos = node.getPosition();
    //         rot = node.getRotation();
    //     }

    //     var transform = new Ammo.btTransform();
    //     transform.setIdentity();
    //     var origin = transform.getOrigin();
    //     origin.setValue(pos.x, pos.y, pos.z);

    //     var ammoQuat = new Ammo.btQuaternion();
    //     ammoQuat.setValue(rot.x, rot.y, rot.z, rot.w);
    //     transform.setRotation(ammoQuat);
    //     Ammo.destroy(ammoQuat);
    //     Ammo.destroy(origin);

    //     return transform;
    // },
    
    
    this.app.systems.collision.implementations.mesh.remove = function(entity, data) {
           if (data.shape && data.shape.getNumChildShapes) {
                var numShapes = data.shape.getNumChildShapes();
                for (var i = 0; i < numShapes; i++) {
                    var shape = data.shape.getChildShape(i);
                    Ammo.destroy(shape);
                }
            }
        
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

            if (app.scene.containsModel(data.model)) {
                app.root.removeChild(data.model.graph);
                app.scene.removeModel(data.model);
            }
    };

    
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

// Utils.prototype.injectMeshCollisionSystem = function () {
//     if (this.customPhysicsInjected || !this.app.systems.collision.implementations.mesh) {
//         return;
//     }

//     console.log("Injecting advanced mesh physics ....");
//     this.customPhysicsInjected = true;

//     const tempGraphNode = new pc.GraphNode();

//     this.app.systems.collision.implementations.mesh.createPhysicalShape = function (entity, data) {
//         if (typeof Ammo === 'undefined' || !entity.rigidbody) return undefined;

//         if (data.model || data.render) {
//             let useConvexHull = (entity.rigidbody.type === pc.BODYTYPE_DYNAMIC);
//             // if(entity.collision && entity.collision.type === 'compound') {
//             //     useConvexHull = false;
//             // }
//             const shape = useConvexHull ? new Ammo.btConvexHullShape() : new Ammo.btCompoundShape();

//             if (data.model) {
//                 const meshInstances = data.model.meshInstances;
//                 for (let i = 0; i < meshInstances.length; i++) {
//                     if (useConvexHull) {
//                         this.createAmmoConvexHullMesh(meshInstances[i].mesh, meshInstances[i].node, shape, entity);
//                     } else {
//                         this.createAmmoMesh(meshInstances[i].mesh, meshInstances[i].node, shape);
//                     }

//                 }
//             } else if (data.render) {
//                 const meshes = data.render.meshes;
//                 for (let i = 0; i < meshes.length; i++) {
//                     if (useConvexHull) {
//                         this.createAmmoConvexHullMesh(meshes[i], tempGraphNode, shape, entity);
//                     } else {
//                         this.createAmmoMesh(meshes[i], tempGraphNode, shape);
//                     }
//                 }
//             }

//             const entityTransform = entity.getWorldTransform();
//             const scale = entityTransform.getScale();
//             const vec = new Ammo.btVector3(scale.x, scale.y, scale.z);
//             shape.setLocalScaling(vec);
//             Ammo.destroy(vec);

//             return shape;
//         }

//         return undefined;
//     };


//     this.app.systems.collision.implementations.mesh.destroyShape = function (data) {
//         if (!data.shape)
//             return;

//         if (data.shape.getNumChildShapes) {
//             const numShapes = data.shape.getNumChildShapes();
//             for (let i = 0; i < numShapes; i++) {
//                 const shape = data.shape.getChildShape(i);
//                 Ammo.destroy(shape);
//             }
//         }

//         Ammo.destroy(data.shape);
//         data.shape = null;
//     };

//     this.app.systems.collision.implementations.mesh.createAmmoConvexHullMesh = function (mesh, node, shape, entity) {
//         let triMesh;
//         const uniquePoints = [];

//         const addPointIfUnique = function (array, a, b, c) {
//             for (let up = 0; up < array.length; up++) {
//                 if (array[up][0] === a && array[up][1] === b && array[up][2] === c) {
//                     return;
//                 }
//             }
//             array.push([a, b, c]);
//         };

//         // if (this.system._triMeshCache[mesh.id]) {
//         //     triMesh = this.system._triMeshCache[mesh.id];
//         // } else {
//         const vb = mesh.vertexBuffer;

//         const format = vb.getFormat();
//         let stride;
//         let positions;
//         for (let i = 0; i < format.elements.length; i++) {
//             const element = format.elements[i];
//             if (element.name === pc.SEMANTIC_POSITION) {
//                 positions = new Float32Array(vb.lock(), element.offset);
//                 stride = element.stride / 4;
//                 break;
//             }
//         }

//         const indices = [];
//         mesh.getIndices(indices);
//         const numTriangles = mesh.primitive[0].count / 3;

//         const v1 = new Ammo.btVector3();
//         const v2 = new Ammo.btVector3();
//         const v3 = new Ammo.btVector3();
//         let i1, i2, i3;

//         const base = mesh.primitive[0].base;
//         triMesh = new Ammo.btTriangleMesh();
//         // this.system._triMeshCache[mesh.id] = triMesh;

//         for (let i = 0; i < numTriangles; i++) {
//             i1 = indices[base + i * 3] * stride;
//             i2 = indices[base + i * 3 + 1] * stride;
//             i3 = indices[base + i * 3 + 2] * stride;
//             addPointIfUnique(uniquePoints, positions[i1], positions[i1 + 1], positions[i1 + 2]);
//             addPointIfUnique(uniquePoints, positions[i2], positions[i2 + 1], positions[i2 + 2]);
//             addPointIfUnique(uniquePoints, positions[i3], positions[i3 + 1], positions[i3 + 2]);
//             // v1.setValue(positions[i1], positions[i1 + 1], positions[i1 + 2]);
//             // v2.setValue(positions[i2], positions[i2 + 1], positions[i2 + 2]);
//             // v3.setValue(positions[i3], positions[i3 + 1], positions[i3 + 2]);
//             // triMesh.addTriangle(v1, v2, v3, true);
//         }

//         Ammo.destroy(v1);
//         Ammo.destroy(v2);
//         Ammo.destroy(v3);
//         // }

//         // const convexHullShape = new Ammo.btConvexHullShape();
//         const ammoVec = new Ammo.btVector3();
//         for (let u = 0; u < uniquePoints.length; u++) {
//             const point = uniquePoints[u];
//             ammoVec.setValue(point[0], point[1], point[2]);
//             shape.addPoint(ammoVec, u === uniquePoints.length - 1);

//             // const vertex1 = TemplateManager.getInstance().instantiate('DebugVertex');
//             // vertex1.setLocalPosition(point[0], point[1], point[2]);
//             // entity.addChild(vertex1);
//         }
//         Ammo.destroy(ammoVec);


//         // const useQuantizedAabbCompression = true;
//         // const triMeshShape = new Ammo.btBvhTriangleMeshShape(triMesh, useQuantizedAabbCompression);

//         // const scaling = this.system._getNodeScaling(node);
//         // convexHullShape.setLocalScaling(scaling);
//         // Ammo.destroy(scaling);

//         // const transform = this.system._getNodeTransform(node);
//         // shape.addChildShape(transform, convexHullShape);
//         // Ammo.destroy(transform);
//     };
// };


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

Utils.raycastAll = function(from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if(lastResult.entity){  
            // this prevents rays from bouncing off the same entities
            // in a loop causing ammojs to crash
            for(var i = 0; i < results.length; i++){
                if(results[i] === lastResult.entity){
                    return results;
                }
            }
           results.push(lastResult.entity);
           Utils.raycastAll(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
};

/**
 *  Raycast through multiple entities returning RaycastResult instances (entity, point, normal) instead of entities. 
 **/
Utils.raycastAllAdvanced = function(from, to, results) {
    results = results || [];
    lastResult = this.app.systems.rigidbody.raycastFirst(from, to);
    if (lastResult) {
        if(lastResult.entity){  
            // this prevents rays from bouncing off the same entities
            // in a loop causing ammojs to crash
            for(var i = 0; i < results.length; i++){
                if(results[i].entity === lastResult.entity){
                    return results;
                }
            }
           results.push(lastResult);
           Utils.raycastAllAdvanced(lastResult.point.sub(lastResult.normal.scale(0.01)), to, results);
        }
    }
    return results;
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
            .on('update',function() {textElement.element.text = '' + Math.round(textElement.element.textValue);})
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

// transitionScreen.js
/* jshint esversion: 6 */
var TransitionScreen = pc.createScript('transitionScreen');

TransitionScreen.prototype.initialize = function () {
    const scriptingContext = this;

    TransitionScreen.app = this.app;
    TransitionScreen.instance = this.entity;

    this.entity.transitionTo = function (callback, callbackContext, completeCallback, completeCallbackContext) {

        this.element.opacity = 0;
        this.tween(this.element)
            .to({ opacity: 1.0 }, 0.25, pc.SineOut)
            .on('complete', () => {

                if (callback) {
                    if (callbackContext) {
                        callback.apply(callbackContext);
                    } else {
                        callback();
                    }
                }

                scriptingContext.hidePopups();

                this.element.opacity = 1.0;
                this.tween(this.element)
                    .to({ opacity: 0.0 }, 0.4, pc.SineIn)
                    .on('complete', () => {
                        if (completeCallback) {
                            if (completeCallbackContext) {
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


    this.entity.hidePreloader = function (callback, callbackContext) {
        scriptingContext.app.fire(EventTypes.PRELOADER_FINISHED);
    }.bind(this.entity);

    /* Initial opacity, while preloader is visible */
    this.entity.element.opacity = 0;
};

TransitionScreen.prototype.update = function (dt) {

};

TransitionScreen.prototype.hidePopups = function () {
    const resultsWindow = this.app.root.findByName("ResultsWindow");
    if (resultsWindow) {
        resultsWindow.hide();
    }
};

// soundController.js
/* jshint esversion: 6 */
var SoundController = pc.createScript('soundController');

SoundController.attributes.add('soundStorage', {
    title: "Sound storage entity",
    type: 'entity'
});


SoundController.soundStateLoaded = false;
SoundController.audioEnabled = true;
SoundController.masterVolume = 1.0;
SoundController.apiVolumeMultiplier = 1.0;

SoundController.prototype.initialize = function() {
    this.app.on(EventTypes.PLAY_AUDIO, this.playSound, this);
    this.app.on(EventTypes.STOP_AUDIO, this.stopSound, this);
    this.app.on(EventTypes.MUTE_SOUND, this.muteSound, this);
    this.app.on(EventTypes.UNMUTE_SOUND , this.unmuteSound, this);
    this.app.on(EventTypes.ENABLE_AUDIO, this.enableAudio, this);
    this.app.on(EventTypes.DISABLE_AUDIO, this.disableAudio, this);
    this.app.on("audio:setMasterVolume", this.setMasterVolume, this);
    this.app.on("audio:setVolumeMultiplier", this.setVolumeMultiplier, this);
    this.app.fire(EventTypes.AUDIO_STATE_CHANGED, SoundController.audioEnabled);
    
    /* fetch and apply master volume */
    this.setMasterVolume(1);
    this.setVolumeMultiplier(window.famobi.getVolume());
    
    this.app.on('startGameRequested', () => {
         this.soundStorage.sound.slot('melody').play();
    });
};

SoundController.prototype.update = function(dt) {
    
};

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
    SoundController.masterVolume = 1;
    this.updateVolume();
    this.app.fire(EventTypes.AUDIO_STATE_CHANGED, SoundController.audioEnabled);
};

SoundController.prototype.disableAudio = function() {
    SoundController.audioEnabled = false;
    SoundController.masterVolume = 0;
    this.updateVolume();
    this.app.fire(EventTypes.AUDIO_STATE_CHANGED, SoundController.audioEnabled);
};

SoundController.prototype.updateVolume = function() {
    this.app.systems.sound.volume = SoundController.masterVolume * SoundController.apiVolumeMultiplier;
};

SoundController.prototype.setMasterVolume = function(volume) {
    SoundController.masterVolume = volume;
    this.updateVolume();
};

SoundController.prototype.setVolumeMultiplier = function(volume) {
    SoundController.apiVolumeMultiplier = volume;
    this.updateVolume();
};

// tween.js
pc.extend(pc, function () {

    /**
     * @name pc.TweenManager
     * @description Handles updating tweens
     * @param {pc.AppBase} app  The application
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
                this._tweens = this._tweens.concat(this._add);
                this._add.length = 0;
            }
        }
    };

    /**
     * @name  pc.Tween
     * @param {Object} target The target property that will be tweened
     * @param {pc.TweenManager} manager The tween manager
     * @param {pc.Entity} entity The pc.Entity whose property we are tweening
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

        this.easing = pc.EASE_LINEAR;

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
                b: properties.b,
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
                    this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z);

                    _x = this._properties.x !== undefined ? this._properties.x : this.target.x;
                    _y = this._properties.y !== undefined ? this._properties.y : this.target.y;
                    _z = this._properties.z !== undefined ? this._properties.z : this.target.z;
                    this._toQuat.setFromEulerAngles(_x, _y, _z);
                }
            }

            // set delay
            this._currentDelay = this._delay;

            // add to manager when started
            this.manager.add(this);

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

            while(n--) {
                if (n > 0) {
                    arguments[n-1]._chained = arguments[n];
                } else {
                    this._chained = arguments[n];
                }
            }

            return this;
        },

        update: function (dt) {
            if (this.stopped) return false;

            if (!this.playing) return true;

            if (!this._reverse || this.pending) {
                this.time += dt*this.timeScale;
            } else {
                this.time -= dt*this.timeScale;
            }

            // delay start if required
            if (this.pending) {
                if (this.time > this._currentDelay) {
                    if (this._reverse) {
                        this.time = this.duration - (this.time - this._currentDelay);
                    } else {
                        this.time = this.time - this._currentDelay;
                    }
                    this.pending = false;
                } else {
                    return true;
                }
            }

            var _extra = 0;
            if ((!this._reverse && this.time > this.duration) || (this._reverse && this.time < 0)){
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

            var elapsed = this.time / this.duration;

            // run easing
            var a = this.easing(elapsed);

            // increment property
            var s,e,d;
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
                        tmp = this._sv[prop];
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
        },

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
        if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
        return 0.5 * ( ( k -= 2 ) * k * k + 2 );
    };

    var QuarticIn = function (k) {
            return k * k * k * k;
    };

    var QuarticOut = function (k) {
        return 1 - ( --k * k * k * k );
    };

    var QuarticInOut = function (k) {
        if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
        return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );
    };

    var QuinticIn = function (k) {
            return k * k * k * k * k;
    };

    var QuinticOut = function (k) {
            return --k * k * k * k * k + 1;
    };

    var QuinticInOut = function (k) {
        if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
        return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );
    };

    var SineIn = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 1 - Math.cos( k * Math.PI / 2 );
    };

    var SineOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return Math.sin( k * Math.PI / 2 );
    };

    var SineInOut = function (k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        return 0.5 * ( 1 - Math.cos( Math.PI * k ) );
    };

    var ExponentialIn = function (k) {
        return k === 0 ? 0 : Math.pow( 1024, k - 1 );
    };

    var ExponentialOut = function (k) {
        return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );
    };

    var ExponentialInOut = function (k) {
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
        return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );
    };

    var CircularIn = function (k) {
        return 1 - Math.sqrt( 1 - k * k );
    };

    var CircularOut = function (k) {
        return Math.sqrt( 1 - ( --k * k ) );
    };

    var CircularInOut = function (k) {
        if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
        return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);
    };

    var ElasticIn = function (k) {
        var s, a = 0.1, p = 0.4;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
        return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
    };

    var ElasticOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
        return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
    };

    var ElasticInOut = function (k) {
        var s, a = 0.1, p = 0.4;
        if ( k === 0 ) return 0;
        if ( k === 1 ) return 1;
        if ( !a || a < 1 ) { a = 1; s = p / 4; }
        else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
        if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
        return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
    };

    var BackIn = function (k) {
            var s = 1.70158;
            return k * k * ( ( s + 1 ) * k - s );
    };

    var BackOut = function (k) {
        var s = 1.70158;
        return --k * k * ( ( s + 1 ) * k + s ) + 1;
    };

    var BackInOut = function (k) {
        var s = 1.70158 * 1.525;
        if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
        return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );
    };

    var BounceIn = function (k) {
        return 1 - BounceOut( 1 - k );
    };

    var BounceOut = function (k) {
        if ( k < ( 1 / 2.75 ) ) {
            return 7.5625 * k * k;
        } else if ( k < ( 2 / 2.75 ) ) {
            return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
        } else if ( k < ( 2.5 / 2.75 ) ) {
            return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
        } else {
            return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
        }
    };

    var BounceInOut = function (k) {
        if ( k < 0.5 ) return BounceIn( k * 2 ) * 0.5;
        return BounceOut( k * 2 - 1 ) * 0.5 + 0.5;
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

// Expose prototype methods and create a default tween manager on the application
(function () {
    // Add pc.AppBase#addTweenManager method
    pc.AppBase.prototype.addTweenManager = function () {
        this._tweenManager = new pc.TweenManager(this);

        this.on("update", function (dt) {
            this._tweenManager.update(dt);
        });
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

    // Create a default tween manager on the application
    var application = pc.AppBase.getApplication();
    if (application) {
        application.addTweenManager();
    }
})();


// cannon.js
/* jshint esversion: 6 */
var Cannon = pc.createScript('cannon');

const tweensList = [
    { 'Linear': 'Linear' },
    { 'QuadraticIn': 'QuadraticIn' },
    { 'QuadraticOut': 'QuadraticOut' },
    { 'QuadraticInOut': 'QuadraticInOut' },
    { 'CubicIn': 'CubicIn' },
    { 'CubicOut': 'CubicOut' },
    { 'CubicInOut': 'CubicInOut' },
    { 'QuarticIn': 'QuarticIn' },
    { 'QuarticOut': 'QuarticOut' },
    { 'QuarticInOut': 'QuarticInOut' },
    { 'QuinticIn': 'QuinticIn' },
    { 'QuinticOut': 'QuinticOut' },
    { 'QuinticInOut': 'QuinticInOut' },
    { 'SineIn': 'SineIn' },
    { 'SineOut': 'SineOut' },
    { 'SineInOut': 'SineInOut' },
    { 'ExponentialIn': 'ExponentialIn' },
    { 'ExponentialOut': 'ExponentialOut' },
    { 'ExponentialInOut': 'ExponentialInOut' },
    { 'CircularIn': 'CircularIn' },
    { 'CircularOut': 'CircularOut' },
    { 'CircularInOut': 'CircularInOut' },
    { 'BackIn': 'BackIn' },
    { 'BackOut': 'BackOut' },
    { 'BackInOut': 'BackInOut' },
    { 'BounceIn': 'BounceIn' },
    { 'BounceOut': 'BounceOut' },
    { 'BounceInOut': 'BounceInOut' },
    { 'ElasticIn': 'ElasticIn' },
    { 'ElasticOut': 'ElasticOut' },
    { 'ElasticInOut': 'ElasticInOut' }
];

Cannon.attributes.add('ballSpeed', {
    title: "Ball speed",
    type: 'number',
    default: 40,
    min: 1,
    max: 120
});

Cannon.attributes.add('reboundTween', {
    title: "Rebound tween",
    type: 'string',
    default: 'Linear',
    enum: tweensList
});


Cannon.attributes.add('reboundTweenDuration', {
    title: "Rebound duration",
    type: 'number',
    default: 0.1
});

Cannon.attributes.add('returnTween', {
    title: "Return tween",
    type: 'string',
    default: 'Linear',
    enum: tweensList
});


Cannon.attributes.add('returnTweenDuration', {
    title: "Return duration",
    type: 'number',
    default: 0.15
});

Cannon.attributes.add('mainCamera', {
    type: 'entity'
});

Cannon.attributes.add('shootingPoint', {
    type: 'entity'
});

Cannon.prototype.initialize = function () {
    this.mortair = this.entity.findByName('Mortair');
    this.skipTargettingEntityNames = ['Cannon', 'CannonBall'];
    this.denyTargettingEntityNames = ['CannonBallDecoration', 'BallsBoxWall', 'BallsBoxTriggerVolume'];
    this.bombPrefab = this.app.root.findByName('ObjectsPrefabs').findByName('CannonBombBall');
    this.ballPrefab = this.app.root.findByName('ObjectsPrefabs').findByName('CannonBall');
    this.ballsBox = this.app.root.findByName('BallsBox');
    this.shootingPoint = this.app.root.findByName("ShootingPoint");
    this.ballsContainer = this.app.root.findByName("BallsContainer");


    this.app.on('input:down', this.handleInputDown, this);
    this.app.on(EventTypes.STAGE_LOADED, this.enableShooting, this);
    this.app.on(EventTypes.REVIVE_EARNED, this.enableShooting, this);
    this.app.on(EventTypes.POWERUP_ACTIVATED, this.enableShooting, this);
    this.app.on(EventTypes.STAGE_LOADING_STARTED, this.disableShooting, this);
    this.app.on(EventTypes.OUT_OF_BALLS, this.disableShooting, this);

    this.entity.enabled = false;
};

Cannon.prototype.update = function (dt) {
    if (this.app.applicationPaused) {
        return;
    }

    const screenPosition = InputController.mousePosition;

    if (pc.platform.desktop && screenPosition) {
        const camera = this.mainCamera;
        var from = camera.camera.screenToWorld(screenPosition.x, screenPosition.y, camera.camera.nearClip);
        var to = camera.camera.screenToWorld(screenPosition.x, screenPosition.y, camera.camera.farClip);

        var raycastResults = Utils.raycastAllAdvanced(from, to).filter(result => this.skipTargettingEntityNames.indexOf(result.entity.name) === -1);
        var result = raycastResults.length > 0 ? raycastResults[0] : this.app.systems.rigidbody.raycastFirst(from, to);

        if (result && result.entity) {
            var targetPoint = result.point.clone();
            this.entity.setLocalEulerAngles(this.getCannonEulerAngles(this.shootingPoint.getPosition(), targetPoint));
        }
    }
};

Cannon.prototype.handleInputDown = function (screenPosition) {
    if (this.app.applicationPaused) {
        return;
    }

    const camera = this.mainCamera;
    var from = camera.camera.screenToWorld(screenPosition.x, screenPosition.y, camera.camera.nearClip);
    var to = camera.camera.screenToWorld(screenPosition.x, screenPosition.y, camera.camera.farClip);

    var raycastResults = Utils.raycastAllAdvanced(from, to).filter(result => this.skipTargettingEntityNames.indexOf(result.entity.name) === -1);
    var result = raycastResults.length > 0 ? raycastResults[0] : this.app.systems.rigidbody.raycastFirst(from, to);
    if (raycastResults.find(r => this.denyTargettingEntityNames.indexOf(r.entity.name) != -1)) {
        result = null;
    }

    if (result && result.entity) {
        var targetPoint = result.point.clone();
        this.entity.setLocalEulerAngles(this.getCannonEulerAngles(this.shootingPoint.getPosition(), targetPoint));
        this.shoot(targetPoint);
    }
};


Cannon.prototype.enableShooting = function () {
    this.shootingEnabled = true;
};

Cannon.prototype.disableShooting = function () {
    this.shootingEnabled = false;
};


Cannon.prototype.shoot = function (targetPoint) {
    if (!GameplayController.gameStarted || !this.shootingEnabled || WindowManager.hasOpenedWindows()) {
        return;
    }

    const bombsActive = this.ballsBox.script.ballsManager.bombsActive();
    const shootingPointPosition = this.shootingPoint.getPosition();
    var ball = bombsActive ? this.bombPrefab.clone() : this.ballPrefab.clone();
    var impulse = this.getRequiredImpulse(shootingPointPosition, targetPoint);
    this.ballsContainer.addChild(ball);

    if (bombsActive) {
        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Resource",
            flowType: "Sink",
            itemType: "powerup",
            itemId: "Bomb",
            amount: 1,
            resourceCurrency: "bomb_ball"
        });
    }

    this.app.fire(bombsActive ? EventTypes.BOMB_SHOT : EventTypes.BALL_SHOT);
    this.app.fire(EventTypes.PLAY_AUDIO, 'cannonShoot');

    ball.setPosition(shootingPointPosition.x, shootingPointPosition.y, shootingPointPosition.z);
    ball.script.ball.shoot(impulse.impulse, bombsActive ? impulse.time : null);

    this.rebound();
};

Cannon.prototype.rebound = function () {
    if (this.mortairReboundTween && this.mortairReboundTween.playing) {
        this.mortairReboundTween.stop();
    }

    if (this.mortairReturnTween && this.mortairReturnTween.playing) {
        this.mortairReturnTween.stop();
    }

    this.mortairReboundTween = this.mortair.tween(this.mortair.getLocalPosition())
        .to(new pc.Vec3(0, 0, 0.8), this.reboundTweenDuration, pc[this.reboundTween]);

    this.mortairReturnTween = this.mortair.tween(this.mortair.getLocalPosition())
        .to(new pc.Vec3(0, 0, 0), this.returnTweenDuration, pc[this.returnTween]);

    this.mortairReboundTween.chain(this.mortairReturnTween).start();

    this.app.fire(EventTypes.REBOUND_CAMERA);
};

Cannon.prototype.getCannonEulerAngles = function (initialPosition, targetPosition) {
    const speed = this.ballSpeed;
    const gravity = -this.app.systems.rigidbody.gravity.y;
    const direction = new pc.Vec3(targetPosition.x - initialPosition.x, targetPosition.y - initialPosition.y, targetPosition.z - initialPosition.z);
    const angleXZ = Math.atan2(direction.x, direction.z);
    const displacementY = targetPosition.y - initialPosition.y;
    const displacementXZ = Math.sqrt((targetPosition.x - initialPosition.x) * (targetPosition.x - initialPosition.x) + (targetPosition.z - initialPosition.z) * (targetPosition.z - initialPosition.z));
    const x = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
    const y = direction.y;
    const angle1 = Math.atan((speed * speed + Math.sqrt(Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y))) / (gravity * x));
    const angle2 = Math.atan((speed * speed - Math.sqrt(Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y))) / (gravity * x));
    const vy = speed * Math.sin(angle2);
    const vx = speed * Math.cos(angle2) * Math.sin(angleXZ);
    const vz = speed * Math.cos(angle2) * Math.cos(angleXZ);

    return new pc.Vec3(angle2 / Math.PI * 180, (angleXZ + Math.PI) / Math.PI * 180, 0);
};


Cannon.prototype.getRequiredImpulse = function (initialPosition, targetPosition) {
    const speed = this.ballSpeed;
    const gravity = -this.app.systems.rigidbody.gravity.y;
    const direction = new pc.Vec3(targetPosition.x - initialPosition.x, targetPosition.y - initialPosition.y, targetPosition.z - initialPosition.z);
    const angleXZ = Math.atan2(direction.x, direction.z);
    const displacementY = targetPosition.y - initialPosition.y;
    const displacementXZ = Math.sqrt((targetPosition.x - initialPosition.x) * (targetPosition.x - initialPosition.x) + (targetPosition.z - initialPosition.z) * (targetPosition.z - initialPosition.z));
    const x = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
    const y = direction.y;
    const angle1 = Math.atan((speed * speed + Math.sqrt(Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y))) / (gravity * x));
    const angle2 = Math.atan((speed * speed - Math.sqrt(Math.pow(speed, 4) - gravity * (gravity * x * x + 2 * speed * speed * y))) / (gravity * x));
    const vy = speed * Math.sin(angle2);
    const vx = speed * Math.cos(angle2) * Math.sin(angleXZ);
    const vz = speed * Math.cos(angle2) * Math.cos(angleXZ);
    const time = displacementXZ / Math.sqrt(vx * vx + vz * vz);

    return { impulse: new pc.Vec3(vx, vy, vz), time: time };
};

// inputController.js
/* jshint esversion: 6 */
var InputController = pc.createScript('inputController');

InputController.numTouches = 0;
InputController.clickDistanceTolerance = 5;
InputController.mousePosition = null;


InputController.prototype.initialize = function () {

    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);

        this.app.touch.on(pc.EVENT_TOUCHEND, function (event) {
            // This prevents that a mouse click event will be executed after a touch event.
            event.event.preventDefault();
        });
    }

    if (this.app.mouse) {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
    }

    if (this.app.keyboard) {
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }


    if (this.app.mouse) {
        this.app.mouse.disableContextMenu();
    }

    this.on("destroy", this.destroy, this);
};

InputController.prototype.update = function (dt) {

};


InputController.prototype.onTouchStart = function (event) {
    // if(event.touches.length >= 1) {
    //     this.touchDownPosition = {id: event.touches[0].id, x: event.touches[0].x, y: event.touches[0].y};
    // }

    this.handleTouch(event.touches[0].x, event.touches[0].y);
};

InputController.prototype.onTouchMove = function (event) {

};


InputController.prototype.onTouchEnd = function (event) {
    // if(event.changedTouches.length >= 1) {
    //      if(this.touchDownPosition && Utils.distanceBetween(this.touchDownPosition.x, this.touchDownPosition.y, event.changedTouches[0].x, event.changedTouches[0].y) < InputController.clickDistanceTolerance) {
    //          if(this.touchDownPosition.id === event.changedTouches[0].id) {
    //              this.handleTouch(event.changedTouches[0].x, event.changedTouches[0].y);
    //          }
    //     }
    // }    
};


InputController.prototype.onTouchCancel = function (event) {
    this.touchDownPosition = null;
};


InputController.prototype.onKeyDown = function (event) {

};


InputController.prototype.onMouseDown = function (event) {
    // this.mouseDownPosition = {x: event.x, y: event.y};

    this.handleTouch(event.x, event.y);
};


InputController.prototype.onMouseUp = function (event) {
    /* if mouse were not moved, then throw a ball */
    // if(this.mouseDownPosition && Utils.distanceBetween(this.mouseDownPosition.x, this.mouseDownPosition.y, event.x, event.y) < InputController.clickDistanceTolerance) {
    //     this.handleTouch(event.x, event.y);
    // }
};

InputController.prototype.onMouseMove = function (event) {
    if (InputController.mousePosition) {
        InputController.mousePosition.x = event.x;
        InputController.mousePosition.y = event.y;
    } else {
        InputController.mousePosition = { x: event.x, y: event.y };
    }
};

InputController.prototype.handleTouch = function (x, y) {
    const famobiScreenSize = this.app.getFamobiAdjustedCanvasSize();
    this.app.fire("input:down", { x: x, y: y / this.app.graphicsDevice.canvas.height * famobiScreenSize.height * this.app.graphicsDevice.maxPixelRatio });
};

InputController.prototype.destroy = function () {
    this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
    this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
    this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    if (this.app.mouse) {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }
    if (this.app.keyboard) {
        this.app.keyboard.off(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }
};

// item.js
/* jshint esversion: 6 */
var Item = pc.createScript('item');

Item.TYPE_WOOD = 'wood';
Item.TYPE_METAL = 'metal';
Item.TYPE_GLASS = 'glass';
Item.TYPE_EXPLOSIVE = 'explosive';
Item.TYPE_CONCRETE = 'concrete';

Item.attributes.add('type', {
    type: 'string',
    default: Item.TYPE_WOOD,
    enum: [
        { 'wood': Item.TYPE_WOOD },
        { 'metal': Item.TYPE_METAL },
        { 'glass': Item.TYPE_GLASS },
        { 'explosive': Item.TYPE_EXPLOSIVE },
        { 'concrete': Item.TYPE_CONCRETE }
    ]
});

Item.attributes.add('volume', {
    type: 'number',
    default: 1
});


Item.prototype.initialize = function() {
    this.entity.itemType = this.type;
    this.entity.rigidbody.type = pc.BODYTYPE_DYNAMIC;
    this.entity.rigidbody.restitution = Item.TYPE_SETTINGS[this.entity.itemType].restitution;
    this.entity.rigidbody.friction = Item.TYPE_SETTINGS[this.entity.itemType].friction;
    this.entity.rigidbody.mass = this.volume * Item.TYPE_SETTINGS[this.entity.itemType].massMultiplier;
    this.entity.rigidbody.linearDamping = GameConfig.getAttribute('itemLinearDamping');
    this.entity.rigidbody.angularDamping = GameConfig.getAttribute('itemAngularDamping');    

    /* listeners */
    this.entity.rigidbody.on('collisionstart', this.onCollisionStart, this);
};

Item.prototype.update = function(dt) {
    this.restrictAngularVelocity();
    
    if(this.entity.getPosition().y < GameConfig.getAttribute('itemLowestYPositionThreshold')) {
        this.breakBlock(true);
    }
};

Item.prototype.paint = function(darknessFactor) {
    if([Item.TYPE_METAL, Item.TYPE_WOOD, Item.TYPE_CONCRETE].indexOf(this.entity.itemType) != -1) {
        const visuealComponent = this.entity.model ? this.entity.model : this.entity.render;
        visuealComponent.meshInstances.forEach(meshInstance => {
            meshInstance.material = meshInstance.material.clone();
            meshInstance.material.diffuseMapTint = true;
            darknessFactor = Number.isNaN(darknessFactor) ? 1 : darknessFactor;
            var tintValue = 1;
            switch(this.entity.itemType) {
                case Item.TYPE_WOOD:
                    tintValue = pc.math.lerp(0.8, 1, darknessFactor);
                    break;
                case Item.TYPE_METAL:
                    tintValue = pc.math.lerp(0.75, 1, darknessFactor);
                    break;
                case Item.TYPE_CONCRETE:
                    tintValue = pc.math.lerp(0.65, 1, darknessFactor);
                    break;
            }
            
            meshInstance.material.diffuse.set(tintValue, tintValue, tintValue);
            meshInstance.material.update();
        });
    }
};

Item.prototype.breakBlock = function(skipDestroyingAnimation) {
    if(this.destroyed) {
        return;
    }         
    const pos = this.entity.getPosition();
    if(!skipDestroyingAnimation) {
        switch(this.entity.itemType) {
            case Item.TYPE_GLASS:
                this.app.fire(EventTypes.PLAY_AUDIO, Utils.getRandomItem(['glassHit01', 'glassHit02']), 50);
                break;
            case Item.TYPE_CONCRETE:
                this.app.fire(EventTypes.PLAY_AUDIO, 'concreteDestroyed', 120);
                break;      
            case Item.TYPE_METAL:
                this.app.fire(EventTypes.PLAY_AUDIO, Utils.getRandomItem(['metalDestroyed01', 'metalDestroyed02']), 100);
                break;  
            case Item.TYPE_WOOD:
                this.app.fire(EventTypes.PLAY_AUDIO, 'woodDestroyed', 100);
                break;  
        }
        if(this.entity.model) {
            this.app.fire(EventTypes.BURST_PARTICLES, pos.x, pos.y, pos.z, GameConfig.getAttribute('breakItemNumParticles')[ScaleManager.qualityIndex], this.entity.model.meshInstances[0].material);
        } else if (this.entity.render) {
            this.app.fire(EventTypes.BURST_PARTICLES, pos.x, pos.y, pos.z, GameConfig.getAttribute('breakItemNumParticles')[ScaleManager.qualityIndex], this.entity.render.meshInstances[0].material);
        }
    }
    
    Apicontroller.trackStats('item_destroyed', {
        item_type: this.entity.itemType
    });

    this.destroyed = true;
    this.entity.destroy();
    this.app.fire(EventTypes.ITEM_DESTROYED, pos);
};

Item.prototype.explodeBlock = function() {
    if(!this.exploded) {
        this.exploded = true;
        this.app.fire(EventTypes.PLAY_AUDIO, 'tnt');
        this.app.fire(EventTypes.EXPLOSION, this.entity.getPosition().clone());
        this.breakBlock(true);
    }
};

Item.prototype.restrictAngularVelocity = function() {
    const angularVelocity = this.entity.rigidbody.angularVelocity;
    
    /* method one */
    let velocityModified = false;
    if(Math.abs(angularVelocity.x) > GameConfig.getAttribute('itemAngularVelocityLimit').x) {
       velocityModified = true;
       angularVelocity.x = Math.sign(angularVelocity.x) * GameConfig.getAttribute('itemAngularVelocityLimit').x;       
    }
     if(Math.abs(angularVelocity.y) > GameConfig.getAttribute('itemAngularVelocityLimit').y) {
       velocityModified = true;
       angularVelocity.y = Math.sign(angularVelocity.y) * GameConfig.getAttribute('itemAngularVelocityLimit').y;       
    }
     if(Math.abs(angularVelocity.z) > GameConfig.getAttribute('itemAngularVelocityLimit').z) {
       velocityModified = true;
       angularVelocity.z = Math.sign(angularVelocity.z) * GameConfig.getAttribute('itemAngularVelocityLimit').z;       
    }
       
    if(velocityModified) {        
        this.entity.rigidbody.angularVelocity = angularVelocity.clone();//this.entity.rigidbody.angularVelocity.clone().normalize().scale(GameConfig.getAttribute('itemAngularVelocityLimit'));
    }
    
    /* method two */
    // if(angularVelocity.length() > 10) {
    //     this.entity.rigidbody.angularVelocity = this.entity.rigidbody.angularVelocity.clone().normalize().scale(10);
    // }
};

Item.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        
        if(result.other.rigidbody.group === Constants.GROUP_BALL) {
            this.restrictAngularVelocity();
            
            if(this.entity.itemType === Item.TYPE_CONCRETE) {
                this.app.fire(EventTypes.PLAY_AUDIO, 'concreteImpact', 50);
            }
            if(this.entity.itemType === Item.TYPE_WOOD) {
                this.app.fire(EventTypes.PLAY_AUDIO, 'woodImpact', 50);
            }
              if(this.entity.itemType === Item.TYPE_METAL) {
                this.app.fire(EventTypes.PLAY_AUDIO, 'metalImpact', 75);
            }
        }
        
        if(this.entity.itemType === Item.TYPE_EXPLOSIVE && result.other.rigidbody.group === Constants.GROUP_BALL) {
            this.explodeBlock();
        }
        
        if(result.other.name.indexOf("Ground") != -1 || result.other.name.indexOf("Terrain") != -1) {
           this.breakBlock();
        }
    }
};



// ball.js
/* jshint esversion: 6 */
var Ball = pc.createScript('ball');

Ball.attributes.add('lifeTime', {
    description: 'seconds',
    type: 'number',
    default: 3
});

Ball.attributes.add('mass', {
    type: 'number',
    default: 0.25
});

Ball.attributes.add('friction', {
    type: 'number',
    default: 0.1,
    min: 0,
    max: 1
});

Ball.attributes.add('restitution', {
    type: 'number',
    default: 0.05,
    min: 0,
    max: 1
});

Ball.attributes.add('explosive', {
    type: 'boolean',
    default: false
});

Ball.prototype.initialize = function() {    
    this.destroying = false;
    this.entity.rigidbody.on('collisionstart', this.onCollisionStart, this);
    
    if(this.entity.particlesystem) {
        this.entity.particlesystem.enabled = ScaleManager.qualityIndex === ScaleManager.QUALITY_HIGH;
    }
};

Ball.prototype.update = function(dt) {
    if(!this.destroying && this.entity.launched) {
       /* raycast and destroy all the glass blocks on the way */ 
        this.raycastAlongThePath(dt);
        
        this.justDestroyedGlassBlock = false;
        this.prevFrameVelocity = this.entity.rigidbody.linearVelocity.clone();
                
        this.lifeTime -= dt;
        if(this.lifeTime <= 0) {
            this.startDestroyingAnimation();
        }
        
        if(this.autoDestroyTime > 0) {
            this.autoDestroyTime -= dt;
            if(this.autoDestroyTime <= 0) {
                famobi.log('auto-destroy TNT');
                this.app.fire(EventTypes.PLAY_AUDIO, 'tnt');
                this.app.fire(EventTypes.EXPLOSION, this.entity.getPosition().clone());
                this.entity.destroy();
            }
        }
    }
};

Ball.prototype.startDestroyingAnimation = function() {
    this.destroying = true;
    this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(0, 0, 0), 0.25, pc.BackIn)
        .on('complete', () => this.entity.destroy())
        .start();
};

Ball.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {    
        
        if(result.other.itemType) {
            if(this.entity.particlesystem && this.entity.particlesystem.isPlaying) {
                this.entity.particlesystem.stop();
            }
            this.app.fire(EventTypes.BALL_ITEM_HIT, result.other);
        }
        if(result.other.itemType === Item.TYPE_GLASS) {
            this.justDestroyedGlassBlock = true;
            result.other.script.item.breakBlock();
            if(this.prevFrameVelocity) {
                this.entity.rigidbody.linearVelocity = this.prevFrameVelocity;
            }
        }
          
        if(this.explosive && !this.destroying) {
            this.destroying = true;
            this.app.fire(EventTypes.PLAY_AUDIO, 'tnt');
            this.app.fire(EventTypes.EXPLOSION, this.entity.getPosition().clone());
            this.entity.destroy();
            return;
        }
    }
};

Ball.prototype.shoot = function(impulse, autoDestroyTime) {
    this.initialImpulse = impulse.clone();
    
    this.entity.enabled = true;
    this.entity.rigidbody.type = pc.BODYTYPE_DYNAMIC;
    this.entity.rigidbody.mass = this.mass;
    this.entity.rigidbody.restitution = this.restitution;
    this.entity.rigidbody.friction = this.friction;
    this.entity.rigidbody.body.setCcdMotionThreshold(0.1);
    this.entity.rigidbody.body.setCcdSweptSphereRadius(0.01);
    this.entity.rigidbody.applyImpulse(impulse.scale(this.entity.rigidbody.mass), new pc.Vec3(0, 0, 0));
    if(this.explosive) {
        this.entity.rigidbody.applyTorque(new pc.Vec3(pc.math.random(-5, 5), pc.math.random(-5, 5), pc.math.random(-5, 5)));
        if(autoDestroyTime) {
            this.autoDestroyTime = autoDestroyTime + 0.15;
        }
    }
    
    this.entity.rigidbody.group = Constants.GROUP_BALL;
    this.entity.rigidbody.mask = pc.BODYMASK_ALL ^ Constants.GROUP_GLASS;       
    
    /* launch */
    this.entity.launched = true;
    
    /* enabled particle system */
    if(this.entity.particlesystem && this.entity.particlesystem.enabled) {
        this.entity.particlesystem.play();
    }
};

Ball.prototype.raycastAlongThePath = function(dt) {  
        const frameShift = this.entity.rigidbody.linearVelocity.clone().normalize().scale(this.initialImpulse.length() * dt * 1.5).add(this.entity.rigidbody.linearVelocity.clone().normalize().scale(this.entity.collision.radius));
        const currentPosition = this.entity.getPosition().clone();
        const nextPosition = currentPosition.clone().add(frameShift);
        var raycastResults =  Utils.raycastAll(currentPosition, nextPosition);
        for(let i = 0; i < raycastResults.length; i++) {
           if(raycastResults[i] === this.entity) {
               continue;
           } else if(raycastResults[i].itemType === Item.TYPE_GLASS && this.justDestroyedGlassBlock && raycastResults[i].script && raycastResults[i].script.item) {
               raycastResults[i].script.item.breakBlock();
           } else if(raycastResults[i].itemType === Item.TYPE_EXPLOSIVE && raycastResults[i].script && raycastResults[i].script.item) {
               raycastResults[i].script.item.explodeBlock();
           } else {
               break;
           }
        }
};


// levelBuilder.js
/* jshint esversion: 6 */
var LevelBuilder = pc.createScript('levelBuilder');

LevelBuilder.prototype.initialize = function () {
    famobi.log("Starting level builder...");
    this.objectsContainer = this.entity.findByName('ObjectsContainer');
    this.standsContainer = this.entity.findByName('StandsContainer');

    this.app.on(EventTypes.LOAD_STAGE, this.loadStage, this);
    this.app.on(EventTypes.BALLS_AMOUNT_UPDATED, this.onBallsAmountUpdated, this);
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

LevelBuilder.prototype.update = function (dt) {

};

LevelBuilder.prototype.reset = function () {
    for (let i = this.objectsContainer.children.length - 1; i > -1; i--) {
        this.objectsContainer.children[i].destroy();
    }
    for (let i = this.standsContainer.children.length - 1; i > -1; i--) {
        this.standsContainer.children[i].destroy();
    }
};

LevelBuilder.prototype.loadStage = function (levelIndex, stageIndex) {
    const stagePrefab = this.entity.script.levelManager.getStagePrefab(levelIndex, stageIndex);
    const customLevel = this.entity.script.levelManager.isCustomGeneratedLevel();
    const applyRotation = this.entity.script.levelManager.applyLevelRotation;
    if (!stagePrefab) {
        return;
    }

    /* load balls amount */
    let numBalls = (GameplayController.currentLevel > this.entity.script.levelManager.levels.length) ? (stagePrefab.script.stageConfig.numBalls - 1) : stagePrefab.script.stageConfig.numBalls;
    let bossLevel = stagePrefab.script.stageConfig.bossLevel;
    if (isForcedMode() && Number.isInteger(getForcedModeProperties().override.shots)) {
        if (this.forcedModeBalls === undefined) {
            this.forcedModeBalls = getForcedModeProperties().override.shots;
        }
        numBalls = this.forcedModeBalls;
        if (getForcedModeProperties().override.infinite_shots_at_boss_stage === false) {
            bossLevel = false;
        }

        if (getForcedModeProperties().override.shots === -1) {
            numBalls = 100;
            bossLevel = true;
        }
    }
    this.app.fire(EventTypes.SET_BALLS_AMOUNT, numBalls, bossLevel);


    /* cloning children only */
    const cloneChildren = entity => {
        if (entity.model || entity.render) {
            var originTransform = entity.getWorldTransform();
            var cloned = entity.clone();
            cloned.setPosition(entity.getPosition().clone());
            cloned.setLocalEulerAngles(originTransform.getEulerAngles());
            cloned.setLocalScale(originTransform.getScale());
            if (cloned.script && cloned.script.item) {
                this.objectsContainer.addChild(cloned);
            } else {
                this.standsContainer.addChild(cloned);
            }
        } else {
            const originalAngles = (customLevel && applyRotation && entity.script && entity.script.groupConfig) ? entity.getLocalEulerAngles().clone() : null;
            if (originalAngles) {
                entity.setLocalEulerAngles(originalAngles.x, entity.script.groupConfig.rotation, originalAngles.z);
            }
            for (let i = entity.children.length - 1; i > - 1; i--) {
                cloneChildren(entity.children[i]);
            }
            if (originalAngles) {
                entity.setLocalEulerAngles(originalAngles.x, originalAngles.y, originalAngles.z);
            }
        }
    };
    cloneChildren(stagePrefab);
    this.app.fire('level:loaded');

    this.paintItems();
    this.animateAppearing();
};

LevelBuilder.prototype.onBallsAmountUpdated = function (numBalls) {
    if (isForcedMode() && Number.isInteger(getForcedModeProperties().override.shots)) {
        if (this.forcedModeBalls !== undefined) {
            this.forcedModeBalls = numBalls;
        }
    }
};

LevelBuilder.prototype.paintItems = function () {
    if (GameConfig.getAttribute('enableTint')) {
        const minHeight = this.objectsContainer.children.reduce((min, currentItem) => Math.min(min, currentItem.getPosition().y), 1000);
        const maxHeight = this.objectsContainer.children.reduce((max, currentItem) => Math.max(max, currentItem.getPosition().y), -1000);
        this.objectsContainer.children.forEach(child => child.script.item.paint((child.getPosition().y - minHeight) / (maxHeight - minHeight)));
    }
};

LevelBuilder.prototype.animateAppearing = function () {
    this.objectsContainer.children.forEach(c => c.rigidbody.enabled = false);
    this.standsContainer.children.forEach(c => c.rigidbody.enabled = false);

    this.app.fire(EventTypes.STAGE_LOADING_STARTED);

    this.entity.setLocalScale(0.6, 0.6, 0.6);
    this.entity.tween(this.entity.getLocalScale())
        .to(new pc.Vec3(1, 1, 1), 0.14, pc.Linear)
        .start();

    this.entity.setLocalPosition(0, -2, 0);
    this.entity.tween(this.entity.getLocalPosition())
        .to(new pc.Vec3(0, 0, 0), 0.14, pc.Linear)
        .on('complete', () => {
            this.objectsContainer.children.forEach(c => c.rigidbody.enabled = true);
            this.standsContainer.children.forEach(c => c.rigidbody.enabled = true);
            this.app.fire(EventTypes.STAGE_LOADED);
        })
        .start();

    this.app.fire(EventTypes.PLAY_AUDIO, Utils.getRandomItem(['levelAppear02', 'levelAppear01']));

};


// particlesController.js
/* jshint esversion: 6 */
var ParticlesController = pc.createScript('particlesController');

ParticlesController.attributes.add('cacheSize', {
    description: 'num particles in cache',
    type: 'number',
    default: 150
});

ParticlesController.attributes.add('particlePrefab', {
    type: 'entity'
});

ParticlesController.prototype.initialize = function() {
    this.particleCache = [];
    this.activeParticles = [];
    this.prepareCache();
    this.app.on(EventTypes.BURST_PARTICLES, this.createExplosion, this);
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
    this.on("destroy", this.destroy, this);
};

ParticlesController.prototype.reset = function() {
    for(let i = this.activeParticles.length - 1; i > -1; i--) {
        this.resetPaticle(this.activeParticles[i]);
    }
};

ParticlesController.prototype.destroy = function() {
    this.app.off(EventTypes.EXPLOSION, this.createExplosion, this);
};

ParticlesController.prototype.update = function(dt) {
    this.activeParticles.forEach(child => this.updateChild(child, dt));
};

ParticlesController.prototype.createExplosion = function(x, y, z, numParticles, material) {
    numParticles = numParticles || 6;
    if(this.particleCache && this.particleCache.length < this.cacheSize * 0.6) {
        numParticles = Math.floor(pc.math.random(2, Math.max(2, Math.floor(numParticles / 2))));
    }
    for(let i = 0; i < numParticles; i++) {
        this.addParticle(x, y, z, material);
    }
};

ParticlesController.prototype.updateChild = function(child, dt) {
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


ParticlesController.prototype.addParticle = function(x, y, z, material) {
    let particle;

    if(this.particleCache.length > 0) {
        particle = this.particleCache.splice(this.particleCache.length - 1, 1)[0];
    } else {
        particle = this.particlePrefab.clone();
        this.entity.addChild(particle);
    }

    particle.enabled = true;
    particle.render.meshInstances[0].material = material;
    particle.setPosition(x, y, z);
    particle.setLocalEulerAngles(pc.math.random(-180, 180), pc.math.random(-180, 180), pc.math.random(-180, 180));
    particle.speedX = pc.math.random(-6, 6);
    particle.speedY = pc.math.random(-2, 10);
    particle.speedZ = pc.math.random(-6, 6);
    particle.gravity = pc.math.random(-25, -15);        
    particle.currentScale = pc.math.random(0.1, 0.3);
    particle.setLocalScale(particle.currentScale, particle.currentScale, particle.currentScale);
    particle.scaleSpeed = pc.math.random(1.0, 1.4);
    particle.scaleAcceleration = pc.math.random(-10, -5);
    particle.completed = false;

    this.activeParticles.push(particle);
};


ParticlesController.prototype.resetPaticle = function(particle) {
    const index = this.activeParticles.indexOf(particle);
    if(index != -1) {
        this.activeParticles.splice(index, 1);
    }
    particle.enabled = false;
    particle.setPosition(0, -50, 0);
    this.particleCache.push(particle);
};


ParticlesController.prototype.prepareCache = function() {
    this.particleCache = [];
    const basicParticle = this.particlePrefab;
    for(let i = 0; i < this.cacheSize; i++) {
        const particle = basicParticle.clone();
        particle.enabled = false;
        particle.setPosition(0, -50, 0);
        particle.completed = true;
        this.entity.addChild(particle);
        this.particleCache.push(particle);
    }
    
    famobi.log("Prepared ", this.particleCache.length, " particles");
};

// eventTypes.js
var EventTypes = pc.createScript('eventTypes');

/* Preloader */
EventTypes.PRELOADER_FINISHED = 'preloader:finished';

/* Physics */
EventTypes.INJECT_CUSTOM_PHYSICS = 'physics:injectCollision';

/* General */
EventTypes.SAVE_APP = 'app:save';
EventTypes.SAVE_LEVELS = 'levels:save';
EventTypes.POSTINITIALIZE = 'postinitialize';

/* Levels */
EventTypes.LOAD_NEXT_LEVEL = 'level:next';
EventTypes.RESTART_CURRENT_LEVEL = 'level:restart';
EventTypes.LEVEL_START = 'level:start';
EventTypes.LEVEL_RESET = 'level:reset';
EventTypes.LEVEL_COMPLETED = 'level:completed';
EventTypes.STAGE_COMPLETED = 'stage:completed';
EventTypes.STAGE_FAILED = 'stage:failed';
EventTypes.LOAD_STAGE = 'stage:load';
EventTypes.STAGE_LOADED = 'stage:loaded';
EventTypes.STAGE_LOADING_STARTED =  'stage:loadingStarted';

/* Worlds */
EventTypes.CHANGE_WORLD = 'world:change';

/* Scores */
EventTypes.ADD_SCORES = 'scores:add';
EventTypes.RESET_SCORES = 'scores:reset';
EventTypes.SCORES_CHANGED = 'scores:changed';
EventTypes.MAX_SCORES_CHANGED = 'maxscores:changed';
EventTypes.SHOW_SCORES_EFFECT = 'scores:showEffect';

/* Powerups */
EventTypes.UPDATE_POWERUP_PROGRESS = 'powerup:updateProgress';
EventTypes.RESET_POWERUP_PROGRESS = 'powerup:resetProgress';
EventTypes.POWERUP_ACTIVATED = 'powerup:activated';
EventTypes.POWERUP_GET_FOR_FREE = 'powerup:getForFree';

/* Balls */
EventTypes.SHOW_BALLS_BOX = 'ballsBox:show';

EventTypes.SET_BALLS_AMOUNT = 'ball:setAmount';
EventTypes.BALL_SHOT = 'ball:shot';
EventTypes.BOMB_SHOT = 'ball:shotBomb';
EventTypes.BALLS_AMOUNT_UPDATED = 'ball:amountUpdated';
EventTypes.OUT_OF_BALLS = 'ball:outOfBalls';
EventTypes.BALL_ITEM_HIT = 'ball:hititem';

/* revive */
EventTypes.REVIVE_EARNED = 'revive:earned';
EventTypes.REVIVE_CANCELED = 'revive:canceled';

/* Items */
EventTypes.ITEM_DESTROYED = 'item:destroyed';


/* Effects */
EventTypes.BURST_PARTICLES = 'particles:burst';
EventTypes.EXPLOSION = 'explosion';

/* Camera */
EventTypes.PLAY_PRESSED = 'game:playPressed';
EventTypes.SHAKE_CAMERA = 'camera:shake';
EventTypes.REBOUND_CAMERA = 'camera:rebound';

/* Audio */
EventTypes.ENABLE_AUDIO = 'audio:enable';
EventTypes.DISABLE_AUDIO = 'audio:disable';
EventTypes.PLAY_AUDIO = 'audio:play';
EventTypes.STOP_AUDIO = 'audio:stop';
EventTypes.MUTE_SOUND = 'audio:mute';
EventTypes.UNMUTE_SOUND = 'audio:unmute';
EventTypes.AUDIO_STATE_CHANGED = 'audio:stateChanged';

/* Quality */
EventTypes.QUALITY_CHANGED = 'quality:changed';
EventTypes.QUALITY_UPDATE = 'quality:update';
EventTypes.QUALITY_NEXT = 'quality:next';
EventTypes.VIEWPORT_RESIZE = 'viewport:resize';



// gameplayController.js
/* jshint esversion: 6 */
var GameplayController = pc.createScript('gameplayController');

GameplayController.prototype.initialize = function () {
    GameplayController.app = this.app;

    this.initGameProperties();

    this.levelManager = this.app.root.findByName("GameplayContainer").script.levelManager;

    this.app.on(EventTypes.STAGE_COMPLETED, this.handleStageCompleted, this);
    this.app.on(EventTypes.STAGE_FAILED, this.handleStageFailed, this);
    this.app.on(EventTypes.LOAD_NEXT_LEVEL, this.loadNextLevel, this);
    this.app.on(EventTypes.RESTART_CURRENT_LEVEL, this.restartCurrentLevel, this);
    this.app.on(EventTypes.POSTINITIALIZE, this.gameLoaded, this);
};

GameplayController.prototype.update = function (dt) {

};

GameplayController.prototype.initGameProperties = function () {
    //State variables
    GameplayController.currentLevel = 1;
    GameplayController.currentStage = 1;

    //Activity
    GameplayController.gameStarted = false;

    //Session vars
    GameplayController.totalStages = 0;

    /* load saved data from storage */
    LocalStorageController.loadData();
};

GameplayController.prototype.gameLoaded = function () {
    this.startLevel(GameplayController.currentLevel);
    this.app.fire(EventTypes.CHANGE_WORLD);
};

GameplayController.prototype.resetLevel = function () {
    this.app.fire(EventTypes.RESET_SCORES);
    GameplayController.currentScores = 0;

    if (isForcedMode() && getForcedModeProperties().state.sublevel && GameplayController.currentLevel === getForcedModeProperties().state.sublevel) {
        GameplayController.currentStage = +getForcedModeProperties().state.sublevel;
    } else {
        GameplayController.currentStage = 1;
    }

    GameplayController.currentSession = {
        reviveUsed: false,
        reviveCanceled: false,
        usedPowerups: []
    };
};

GameplayController.prototype.loadNextLevel = function () {
    this.app.fire(EventTypes.CHANGE_WORLD);
    this.startLevel(GameplayController.currentLevel + 1);
    this.app.fire(EventTypes.SAVE_APP);
};

GameplayController.prototype.startLevel = function (levelIndex, trackRestart) {
    this.resetLevel();

    this.app.fire(EventTypes.INJECT_CUSTOM_PHYSICS);

    /* famobi_analytics API */
    window.famobi_analytics.trackEvent(trackRestart ? "EVENT_LEVELRESTART" : "EVENT_LEVELSTART", { levelName: '' + levelIndex });

    GameplayController.currentLevel = levelIndex;
    const level = this.levelManager.getLevel(GameplayController.currentLevel);
    GameplayController.totalStages = level.length;
    if (isForcedMode() && getForcedModeProperties().state.sublevel && GameplayController.currentLevel === getForcedModeProperties().state.level) {
        this.loadStage(+getForcedModeProperties().state.sublevel);
    } else {
        this.loadStage(1);
    }
};

GameplayController.prototype.loadStage = function (stageIndex) {
    GameplayController.currentStage = stageIndex;
    this.app.fire(EventTypes.LEVEL_RESET);
    this.app.fire(EventTypes.LOAD_STAGE, GameplayController.currentLevel, GameplayController.currentStage, GameplayController.totalStages);

    /* tracking */
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Progression",
        progressionStatus: "Start",
        progression01: "Level_" + GameplayController.currentLevel,
        progression02: "Stage_" + GameplayController.currentStage,
    });
};

GameplayController.prototype.handleStageCompleted = function () {
    Apicontroller.trackStats('stage_completed');

    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Progression",
        progressionStatus: "Complete",
        progression01: "Level_" + GameplayController.currentLevel,
        progression02: "Stage_" + GameplayController.currentStage,
    });

    if (isEndlessMode()) {
        if (GameplayController.currentStage >= GameplayController.totalStages) {
            this.startLevel(GameplayController.currentLevel + 1);
        } else {
            this.loadStage(GameplayController.currentStage + 1);
        }

    } else if (!(isForcedMode() && getForcedModeProperties().state.sublevel) && GameplayController.currentStage < GameplayController.totalStages) {
        this.loadStage(GameplayController.currentStage + 1);

    } else {

        Apicontroller.handleLevelEndEvent("success", ScoreManager.instance.getScores(), () => {
            if (isForcedMode()) {
                famobi.log("Level is completed in forced mode");
                this.app.timeScale = 0;
                this.app.applicationPaused = true;
                this.app.applicationFinished = true;
            } else {
                WindowManager.showResults();
            }
        });

    }
};

GameplayController.prototype.handleStageFailed = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Progression",
        progressionStatus: "Fail",
        progression01: "Level_" + GameplayController.currentLevel,
        progression02: "Stage_" + GameplayController.currentStage,
    });

    const reviveAvailable = Apicontroller.hasRewardedVideo();
    if (!reviveAvailable || GameplayController.currentSession.reviveUsed || GameplayController.currentSession.reviveCanceled) {

        Apicontroller.handleLevelEndEvent("fail", ScoreManager.instance.getScores(), () => {
            if (isForcedMode()) {
                famobi.log("Level is failed in forced mode");
                this.app.timeScale = 0;
                this.app.applicationPaused = true;
                this.app.applicationFinished = true;
            } else {
                WindowManager.showDefeat();
            }
        });

    } else {
        WindowManager.showRevive();
    }

};

GameplayController.prototype.restartCurrentLevel = function () {
    this.startLevel(GameplayController.currentLevel, true);
};

// levelController.js
/* jshint esversion: 6 */
var LevelController = pc.createScript('levelController');

LevelController.prototype.initialize = function () {
    this.objectsContainer = this.entity.findByName('ObjectsContainer');
    this.standsContainer = this.entity.findByName('StandsContainer');
    this.defeatCountdownText = this.app.root.findByName('UIContainer').findByName('DefeatCountdownText');
    this.explosionPrefab = this.app.root.findByName('ObjectsPrefabs').findByName('Explosion');
    this.effectsContainer = this.app.root.findByName('EffectsContainer');

    this.defeatTimer = { value: 0, active: false };
    this.victoryTimer = { value: 0, active: false };
    this.comboCounter = 0;
    this.powerupProgress = 0;

    this.app.on(EventTypes.STAGE_COMPLETED, this.handleStageCompleted, this);
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
    this.app.on(EventTypes.BALL_SHOT, this.handleBallShot, this);
    this.app.on(EventTypes.BOMB_SHOT, this.handleBallShot, this);
    this.app.on(EventTypes.BALL_ITEM_HIT, this.handleBallItemHit, this);
    this.app.on(EventTypes.ITEM_DESTROYED, this.handleItemDestroyed, this);
    this.app.on(EventTypes.EXPLOSION, this.createExplosion, this);
    this.app.on(EventTypes.OUT_OF_BALLS, this.handleOutOfBalls, this);
    this.app.on(EventTypes.RESET_POWERUP_PROGRESS, this.resetPowerupProgress, this);
    this.app.on(EventTypes.POWERUP_ACTIVATED, this.handlePowerupActivated, this);
    this.app.on(EventTypes.POWERUP_GET_FOR_FREE, this.handlePowerupGetForFree, this);

    this.app.on(EventTypes.REVIVE_EARNED, this.handleReviveEarned, this);
    this.app.on(EventTypes.REVIVE_CANCELED, this.handleReviveCanceled, this);

    this.app.on('famobi:restartGame', this.onRestartRequested, this);
};


LevelController.prototype.onRestartRequested = function () {
    this.reset();
};

LevelController.prototype.update = function (dt) {
    if (this.victoryTimer.active) {
        this.victoryTimer.value -= dt;
        if (this.victoryTimer.value <= 0) {
            this.victoryTimer.active = false;
            this.app.fire(EventTypes.STAGE_COMPLETED);
        }
    } else if (this.defeatTimer.active) {
        this.defeatTimer.value -= dt;
        if (this.defeatTimer.value <= 0) {
            this.defeatTimer.active = false;
            this.app.fire(EventTypes.STAGE_FAILED);
        }
    }

    /* Countdown text */
    if (this.defeatTimer.active) {
        this.defeatCountdownText.enabled = true;

        if (this.lastDefeatTimer != Math.ceil(this.defeatTimer.value)) {
            this.lastDefeatTimer = Math.ceil(this.defeatTimer.value);
            this.defeatCountdownText.element.text = '' + this.lastDefeatTimer;

            this.app.fire(EventTypes.PLAY_AUDIO, this.lastDefeatTimer % 2 === 0 ? "tic" : "tac");

            this.defeatCountdownText.element.opacity = 1;
            this.defeatCountdownText.tween(this.defeatCountdownText.element)
                .to({ opacity: 0 }, 0.95, pc.SineIn)
                .start();

            this.defeatCountdownText.setLocalScale(1, 1, 1);
            this.defeatCountdownText.tween(this.defeatCountdownText.getLocalScale())
                .to(new pc.Vec3(2.2, 2.2, 2.2), 0.95, pc.SineOut)
                .start();
        }
    } else {
        this.defeatCountdownText.enabled = false;
    }

};

LevelController.prototype.reset = function () {
    this.defeatTimer = { value: 0, active: false };
    this.victoryTimer = { value: 0, active: false };
    this.comboCounter = 0;
};

LevelController.prototype.resetPowerupProgress = function () {
    this.powerupProgress = 0;
};

LevelController.prototype.handlePowerupGetForFree = function () {
    this.powerupProgress = 1;
    this.app.fire(EventTypes.UPDATE_POWERUP_PROGRESS, this.powerupProgress);
};

LevelController.prototype.handleBallShot = function () {
    this.comboCounter = 0;
};

LevelController.prototype.handleStageCompleted = function () {
    this.powerupProgress = pc.math.clamp(this.powerupProgress + GameConfig.getAttribute('powerupProgressPerStage'), 0, 1);
    this.app.fire(EventTypes.UPDATE_POWERUP_PROGRESS, this.powerupProgress);
};

LevelController.prototype.handleBallItemHit = function (item) {
    const itemPosition = item.getPosition();
    this.objectsContainer.children.forEach(child => {
        if (child.getPosition().y >= itemPosition.y) {
            child.rigidbody.activate();
        }
    });
};

LevelController.prototype.handleItemDestroyed = function (position) {
    const scores = GameConfig.getAttribute('scoresPerItem') * (++this.comboCounter);
    this.app.fire(EventTypes.ADD_SCORES, scores, position);

    this.powerupProgress = pc.math.clamp(this.powerupProgress + GameConfig.getAttribute('powerupProgressPerItem'), 0, 1);
    this.app.fire(EventTypes.UPDATE_POWERUP_PROGRESS, this.powerupProgress);

    if (this.objectsContainer.children.length === 0) {
        if (!this.victoryTimer.active) {
            if (this.defeatTimer.active) {
                this.defeatTimer.active = false;
            }
            this.victoryTimer.active = true;
            this.victoryTimer.value = GameConfig.getAttribute('victoryTimer');
        }
    }
};

LevelController.prototype.handleOutOfBalls = function () {
    if (!this.victoryTimer.active) {
        if (!this.defeatTimer.active) {
            this.defeatTimer.active = true;
            this.defeatTimer.value = GameConfig.getAttribute('defeatTimer');
        }
    }
};

LevelController.prototype.handlePowerupActivated = function () {
    this.powerupProgress = 0;
    this.app.fire(EventTypes.RESET_POWERUP_PROGRESS, this.powerupProgress);
    if (this.defeatTimer.active) {
        this.defeatTimer.active = false;
        this.defeatTimer.value = 0;
    }
};

LevelController.prototype.handleReviveEarned = function () {
    GameplayController.currentSession.reviveUsed = true;
    this.app.fire(EventTypes.SET_BALLS_AMOUNT, 4, false);
};

LevelController.prototype.handleReviveCanceled = function () {
    GameplayController.currentSession.reviveCanceled = true;
    if (!this.victoryTimer.active) {
        if (!this.defeatTimer.active) {
            this.defeatTimer.active = true;
            this.defeatTimer.value = 0.5;
        }
    }
};

LevelController.prototype.createExplosion = function (worldPosition) {
    const explosionRadius = GameConfig.getAttribute('explosionRadius');
    const explosionForce = GameConfig.getAttribute('explosionForce');


    const explosionVFX = this.explosionPrefab.clone();
    this.effectsContainer.addChild(explosionVFX);
    explosionVFX.setPosition(worldPosition.clone().add(new pc.Vec3(0, 0, 0.5)));
    explosionVFX.setLocalScale(3, 3, 3);
    explosionVFX.enabled = true;
    explosionVFX.script.explosionVfx.explode();

    for (let i = this.objectsContainer.children.length - 1; i > -1; i--) {
        const child = this.objectsContainer.children[i];
        const childPosition = child.getPosition();
        const distance = childPosition.distance(worldPosition);
        if (distance <= explosionRadius) {
            child.rigidbody.applyImpulse(childPosition.clone().sub(worldPosition).normalize().scale(explosionForce / Math.pow(Math.max(distance, 1), GameConfig.getAttribute('explosionDampingFactor')) * child.rigidbody.mass), new pc.Vec3(pc.math.random(-0.05, 0.05), pc.math.random(-0.05, 0.05), pc.math.random(-0.05, 0.05)));
            if (child.itemType === Item.TYPE_GLASS) {
                child.script.item.breakBlock();
            }
        }
    }

    this.objectsContainer.children.forEach(child => child.rigidbody.activate());
};

// materialConfig.js
/* jshint esversion: 6 */
var MaterialConfig = pc.createScript('materialConfig');

/* WOOD */
MaterialConfig.attributes.add('woodMass', {
    type: 'number',
    default: 1
});

MaterialConfig.attributes.add('woodFriction', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.8
});

MaterialConfig.attributes.add('woodRestitution', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.05
});

/* METAL */
MaterialConfig.attributes.add('metalMass', {
    type: 'number',
    default: 1
});

MaterialConfig.attributes.add('metalFriction', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.25
});

MaterialConfig.attributes.add('metalRestitution', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.65
});

/* GLASS */
MaterialConfig.attributes.add('glassMass', {
    type: 'number',
    default: 1
});

MaterialConfig.attributes.add('glassFriction', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.1
});

MaterialConfig.attributes.add('glassRestitution', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.1
});

/* EXPLOSIVE */
MaterialConfig.attributes.add('explosiveMass', {
    type: 'number',
    default: 1
});

MaterialConfig.attributes.add('explosiveFriction', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.5
});

MaterialConfig.attributes.add('explosiveRestitution', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.5
});

/* CONCRETE */
MaterialConfig.attributes.add('concreteMass', {
    type: 'number',
    default: 1
});

MaterialConfig.attributes.add('concreteFriction', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.5
});

MaterialConfig.attributes.add('concreteRestitution', {
    type: 'number',
    min: 0,
    max: 1,
    default: 0.2
});


MaterialConfig.prototype.initialize = function() {
    MaterialConfig.app = this.app;
    MaterialConfig.instance = this;       
    
    Item.TYPE_SETTINGS = {};   
    Item.TYPE_SETTINGS[Item.TYPE_WOOD] = {friction: this.woodFriction, restitution: this.woodRestitution, massMultiplier: this.woodMass};
    Item.TYPE_SETTINGS[Item.TYPE_METAL] = {friction: this.metalFriction, restitution: this.metalRestitution, massMultiplier: this.metalMass};
    Item.TYPE_SETTINGS[Item.TYPE_GLASS] = {friction: this.glassFriction, restitution: this.glassRestitution, massMultiplier: this.glassMass};
    Item.TYPE_SETTINGS[Item.TYPE_EXPLOSIVE] = {friction: this.explosiveFriction, restitution: this.explosiveRestitution, massMultiplier: this.explosiveMass};
    Item.TYPE_SETTINGS[Item.TYPE_CONCRETE] = {friction: this.concreteFriction, restitution: this.concreteRestitution, massMultiplier: this.concreteMass};
};


// scoreManager.js
var ScoreManager = pc.createScript('scoreManager');

ScoreManager.prototype.initialize = function() {
    ScoreManager.instance = this;

    this.currentScores = 0;
    this.maxScores = 0;
    this.prevMaxScores = 0;
    
    this.app.on(EventTypes.ADD_SCORES, this.addScores, this);
    this.app.on(EventTypes.RESET_SCORES, this.resetScores, this);
};

ScoreManager.prototype.addScores = function(value, position) {
    this.currentScores += value;
    this.app.fire(EventTypes.SCORES_CHANGED, this.currentScores);
    
    if(this.maxScores < this.currentScores) {
        this.maxScores = this.currentScores;
        this.app.fire(EventTypes.MAX_SCORES_CHANGED, this.maxScores);
    }
    
    this.app.fire(EventTypes.SHOW_SCORES_EFFECT, value, position);
    
    Apicontroller.reportLiveScore(this.currentScores);
};

ScoreManager.prototype.resetScores = function() {
    if(isEndlessMode()) return;
    this.currentScores = 0;
    this.app.fire(EventTypes.SCORES_CHANGED, this.currentScores);
    this.app.fire(EventTypes.MAX_SCORES_CHANGED, this.maxScores);
};

ScoreManager.prototype.getScores = function() {
    return this.currentScores;
};

ScoreManager.prototype.getMaxScores = function() {
    return this.maxScores;
};

ScoreManager.prototype.getPrevMaxScores = function() {
    return this.prevMaxScores;
};

ScoreManager.prototype.setScores = function(value) {
    this.currentScores = value;
    this.app.fire(EventTypes.SCORES_CHANGED, this.currentScores);
};

ScoreManager.prototype.setPrevMaxScores = function(value) {
    this.prevMaxScores = value;
};

ScoreManager.prototype.setMaxScores = function(value) {
    this.maxScores = value;
    this.prevMaxScores = value;
    this.app.fire(EventTypes.MAX_SCORES_CHANGED, this.maxScores);
};

ScoreManager.prototype.update = function(dt) {
    
};



// terrain.js
var Terrain = pc.createScript('terrain');

Terrain.attributes.add('heightMap', {
    type: 'asset',
    assetType: 'texture'
});

Terrain.attributes.add('minHeight', {
    type: 'number',
    default: 0
});

Terrain.attributes.add('maxHeight', {
    type: 'number',
    default: 10
});

Terrain.attributes.add('width', {
    type: 'number',
    default: 100
});

Terrain.attributes.add('depth', {
    type: 'number',
    default: 100
});

Terrain.attributes.add('subdivisions', {
    type: 'number',
    default: 250
});

Terrain.attributes.add('randomAngle', {
    type: 'boolean',
    default: false
});


Terrain.attributes.add('material', {
    type: 'asset',
    assetType: 'material'
});


// initialize code called once per entity
Terrain.prototype.initialize = function() {
    var img = this.heightMap.resource.getSource();
    var renderModel = this.createTerrainFromHeightMap(img, this.subdivisions);
    var collisionModel = this.createTerrainFromHeightMap(img, this.subdivisions / 2);

    this.entity.addComponent('model');
    this.entity.model.model = renderModel;

    this.entity.addComponent('collision', {
        type: 'mesh'
    });
    this.entity.collision.model = collisionModel;

    this.entity.addComponent('rigidbody', {
        friction: 0.5,
        type: 'static'
    });
    
    if(this.randomAngle) {
        this.entity.setLocalEulerAngles(0, pc.math.random(0, 360), 0);
    }
};

Terrain.prototype.createTerrainVertexData = function (options) {
    var positions = [];
    var uvs = [];
    var indices = [];
    var row, col;

    for (row = 0; row <= options.subdivisions; row++) {
        for (col = 0; col <= options.subdivisions; col++) {
            var position = new pc.Vec3((col * options.width) / options.subdivisions - (options.width / 2.0), 0, ((options.subdivisions - row) * options.height) / options.subdivisions - (options.height / 2.0));

            var heightMapX = (((position.x + options.width / 2) / options.width) * (options.bufferWidth - 1)) | 0;
            var heightMapY = ((1.0 - (position.z + options.height / 2) / options.height) * (options.bufferHeight - 1)) | 0;

            var pos = (heightMapX + heightMapY * options.bufferWidth) * 4;
            var r = options.buffer[pos] / 255.0;
            var g = options.buffer[pos + 1] / 255.0;
            var b = options.buffer[pos + 2] / 255.0;

            var gradient = r * 0.3 + g * 0.59 + b * 0.11;

            position.y = options.minHeight + (options.maxHeight - options.minHeight) * gradient;

            positions.push(position.x, position.y, position.z);
            uvs.push(col / options.subdivisions, 1.0 - row / options.subdivisions);
        }
    }

    for (row = 0; row < options.subdivisions; row++) {
        for (col = 0; col < options.subdivisions; col++) {
            indices.push(col + row * (options.subdivisions + 1));
            indices.push(col + 1 + row * (options.subdivisions + 1));
            indices.push(col + 1 + (row + 1) * (options.subdivisions + 1));

            indices.push(col + row * (options.subdivisions + 1));
            indices.push(col + 1 + (row + 1) * (options.subdivisions + 1));
            indices.push(col + (row + 1) * (options.subdivisions + 1));
        }
    }

    var normals = pc.calculateNormals(positions, indices);

    return {
        indices: indices,
        positions: positions,
        normals: normals,
        uvs: uvs
    };
};
        
Terrain.prototype.createTerrainFromHeightMap = function (img, subdivisions) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var bufferWidth = img.width;
    var bufferHeight = img.height;
    canvas.width = bufferWidth;
    canvas.height = bufferHeight;

    context.drawImage(img, 0, 0);

    var buffer = context.getImageData(0, 0, bufferWidth, bufferHeight).data;
    var vertexData = this.createTerrainVertexData({
        width: this.width,
        height: this.depth,
        subdivisions: subdivisions,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        buffer: buffer,
        bufferWidth: bufferWidth,
        bufferHeight: bufferHeight
    });

    var node = new pc.GraphNode();
    var material = this.material.resource;

    var mesh = pc.createMesh(this.app.graphicsDevice, vertexData.positions, {
        normals: vertexData.normals,
        uvs: vertexData.uvs,
        indices: vertexData.indices
    });

    var meshInstance = new pc.MeshInstance(node, mesh, material);

    var model = new pc.Model();
    model.graph = node;
    model.meshInstances.push(meshInstance);

    return model;
};


// cameraController.js
/* jshint esversion: 6 */
var CameraController = pc.createScript('cameraController');

const TWEENS_LIST = [
    { 'Linear': 'Linear' },
    { 'QuadraticIn': 'QuadraticIn' },
    { 'QuadraticOut': 'QuadraticOut' },
    { 'QuadraticInOut': 'QuadraticInOut' },
    { 'CubicIn': 'CubicIn' },
    { 'CubicOut': 'CubicOut' },
    { 'CubicInOut': 'CubicInOut' },
    { 'QuarticIn': 'QuarticIn' },
    { 'QuarticOut': 'QuarticOut' },
    { 'QuarticInOut': 'QuarticInOut' },
    { 'QuinticIn': 'QuinticIn' },
    { 'QuinticOut': 'QuinticOut' },
    { 'QuinticInOut': 'QuinticInOut' },
    { 'SineIn': 'SineIn' },
    { 'SineOut': 'SineOut' },
    { 'SineInOut': 'SineInOut' },
    { 'ExponentialIn': 'ExponentialIn' },
    { 'ExponentialOut': 'ExponentialOut' },
    { 'ExponentialInOut': 'ExponentialInOut' },
    { 'CircularIn': 'CircularIn' },
    { 'CircularOut': 'CircularOut' },
    { 'CircularInOut': 'CircularInOut' },
    { 'BackIn': 'BackIn' },
    { 'BackOut': 'BackOut' },
    { 'BackInOut': 'BackInOut' },
    { 'BounceIn': 'BounceIn' },
    { 'BounceOut': 'BounceOut' },
    { 'BounceInOut': 'BounceInOut' },
    { 'ElasticIn': 'ElasticIn' },
    { 'ElasticOut': 'ElasticOut' },
    { 'ElasticInOut': 'ElasticInOut' }
];

CameraController.attributes.add('reboundDistance', {
    title: "Rebound distance",
    type: 'number',
    default: 0.5
});

CameraController.attributes.add('reboundTween', {
    title: "Rebound tween",
    type: 'string',
    default: 'Linear',
    enum: TWEENS_LIST
});

CameraController.attributes.add('reboundTweenDuration', {
    title: "Rebound duration",
    type: 'number',
    default: 0.1
});

CameraController.attributes.add('returnTween', {
    title: "Return tween",
    type: 'string',
    default: 'Linear',
    enum: TWEENS_LIST
});

CameraController.attributes.add('returnTweenDuration', {
    title: "Return duration",
    type: 'number',
    default: 0.15
});

CameraController.attributes.add('cameraPositionOnGameStart', {
    type: 'vec3',
    default: [0, 7.5, 45]
});

CameraController.attributes.add('cameraPositionDefault', {
    type: 'vec3',
    default: [0, 5.5, 28]
});

CameraController.attributes.add('cameraRotationDefault', {
    type: 'vec3',
    default: [2, 0, 0]
});

CameraController.attributes.add('cameraFOVDefault', {
    type: 'number',
    default: 45
});

CameraController.attributes.add('cannonPositionDefault', {
    type: 'vec3',
    default: [0, -1.8, -5]
});

CameraController.attributes.add('cameraPositionMobileLandscape', {
    type: 'vec3',
    default: [0, 5.5, 28]
});

CameraController.attributes.add('cameraRotationMobileLandscape', {
    type: 'vec3',
    default: [2, 0, 0]
});

CameraController.attributes.add('cameraFOVMobileLandscape', {
    type: 'number',
    default: 25
});

CameraController.attributes.add('cannonPositionMobileLandscape', {
    type: 'vec3',
    default: [0, -2.5, -8]
});


CameraController.prototype.initialize = function () {
    this.initialPosition = ScaleManager.mobileLandscapeMode ? this.cameraPositionMobileLandscape : this.cameraPositionDefault;//this.entity.getLocalPosition().clone();
    this.initialAngles = ScaleManager.mobileLandscapeMode ? this.cameraRotationMobileLandscape : this.cameraRotationDefault;//this.entity.getLocalEulerAngles().clone();
    this.shakeTimer = 0;
    this.shakeIntencity = 0;
    this.cannon = this.entity.findByName('Cannon');

    this.on('attr', () => this.handleViewportResized());
    this.handleViewportResized();

    this.app.on(EventTypes.PLAY_PRESSED, this.flyCameraToItsTargetPosition, this);
    this.app.on(EventTypes.REBOUND_CAMERA, this.rebound, this);
    this.app.on(EventTypes.SHAKE_CAMERA, this.shakeCamera, this);
    this.app.on(EventTypes.VIEWPORT_RESIZE, this.handleViewportResized, this);
};

CameraController.prototype.update = function (dt) {
    if (this.shakeTimer > 0) {
        this.shakeTimer -= dt;
        if (this.shakeTimer <= 0) {
            this.shakeTimer = 0;
            this.entity.setLocalPosition(this.initialPosition.clone());
            this.entity.setLocalEulerAngles(this.initialAngles.clone());
        } else {
            this.entity.setLocalPosition(this.initialPosition.x + pc.math.random(-this.shakeIntencity, this.shakeIntencity), this.initialPosition.y + pc.math.random(-this.shakeIntencity, this.shakeIntencity), this.initialPosition.z + pc.math.random(-this.shakeIntencity, this.shakeIntencity));
            this.entity.setLocalEulerAngles(this.initialAngles.x + pc.math.random(-this.shakeIntencity, this.shakeIntencity) * 4, this.initialAngles.y + pc.math.random(-this.shakeIntencity, this.shakeIntencity) * 4, this.initialAngles.z + pc.math.random(-this.shakeIntencity, this.shakeIntencity) * 4);
        }
    }
};

CameraController.prototype.flyCameraToItsTargetPosition = function () {
    this.entity.tween(this.entity.getLocalPosition())
        .to(ScaleManager.mobileLandscapeMode ? this.cameraPositionMobileLandscape : this.cameraPositionDefault, 0.5, pc.SineOut)
        .on('complete', () => {
            GameplayController.gameStarted = true;
            this.showCannon();
        })
        .start();
};

CameraController.prototype.showCannon = function () {
    this.cannon.enabled = true;

    const cannonTargetPosition = ScaleManager.mobileLandscapeMode ? this.cannonPositionMobileLandscape : this.cannonPositionDefault;
    this.cannon.setLocalPosition(cannonTargetPosition.x, cannonTargetPosition.y - 1.2, cannonTargetPosition.z);
    this.cannon.tween(this.cannon.getLocalPosition())
        .to(new pc.Vec3(cannonTargetPosition.x, cannonTargetPosition.y, cannonTargetPosition.z), 0.25, pc.BackOut)
        .on('complete', () => {
            window.famobi.playerReady();
        })
        .start();

    this.app.fire(EventTypes.SHOW_BALLS_BOX);
};

CameraController.prototype.shakeCamera = function (duration, intencity) {
    this.shakeTimer = Math.max(this.shakeTimer, duration);
    this.shakeIntencity = intencity || 0.1;
};

CameraController.prototype.rebound = function () {
    if (this.reboundDistance === 0) {
        return;
    }

    if (this.cameraReboundTween && this.cameraReboundTween.playing) {
        this.cameraReboundTween.stop();
    }

    if (this.cameraReturnTween && this.cameraReturnTween.playing) {
        this.cameraReturnTween.stop();
    }

    this.cameraReboundTween = this.entity.tween(this.entity.getLocalPosition())
        .to(this.initialPosition.clone().add(new pc.Vec3(0, 0, this.reboundDistance)), this.reboundTweenDuration, pc[this.reboundTween]);

    this.cameraReturnTween = this.entity.tween(this.entity.getLocalPosition())
        .to(this.initialPosition.clone(), this.returnTweenDuration, pc[this.returnTween]);

    this.cameraReboundTween.chain(this.cameraReturnTween).start();
};

CameraController.prototype.handleViewportResized = function () {

    this.cannonEntity = this.cannonEntity || this.entity.findByName('Cannon');

    if (ScaleManager.mobileLandscapeMode) {
        this.entity.setPosition(GameplayController.gameStarted ? this.cameraPositionMobileLandscape : this.cameraPositionOnGameStart);
        this.entity.setEulerAngles(this.cameraRotationMobileLandscape);
        this.entity.camera.fov = this.cameraFOVMobileLandscape;
        this.cannonEntity.setLocalPosition(this.cannonPositionMobileLandscape);
    } else {
        this.entity.setPosition(GameplayController.gameStarted ? this.cameraPositionDefault : this.cameraPositionOnGameStart);
        this.entity.setEulerAngles(this.cameraRotationDefault);
        this.entity.camera.fov = this.cameraFOVDefault;
        this.cannonEntity.setLocalPosition(this.cannonPositionDefault);
    }
    if (GameplayController.gameStarted) {
        this.initialPosition = this.entity.getLocalPosition().clone();
        this.initialAngles = this.entity.getLocalEulerAngles().clone();
    }
};

// levelManager.js
/* jshint esversion: 6 */
var LevelManager = pc.createScript('levelManager');

LevelManager.attributes.add('loadTestStage', {
    title: "Load test level",
    type: 'boolean',
    default: false
});

LevelManager.attributes.add('testStage', {
    type: 'entity'
});

LevelManager.prototype.initialize = function () {
    this.levelPrefabs = [];
    this.levels = [];
    this.regularStages = [];
    this.bossStages = [];
    this.availableRegularStages = [];
    this.availableBossStages = [];
    this.applyLevelRotation = false;
    this.findLevels();
    this.prepareStagesList();
    this.disableLevelPrefabs();

    this.app.on('famobi:restartGame', this.onRestartGameRequest, this);
};


LevelManager.prototype.onRestartGameRequest = function () {
    famobi.log("Restarting current level...");

    if (this.app.applicationFinished) {
        this.app.timeScale = 1;
        this.app.applicationFinished = false;
        this.app.applicationPaused = false;
    }

    TransitionScreen.instance.transitionTo(() => {
        WindowManager.hideAll();
        WindowManager.settingsPanel.show();

        if (isForcedMode()) {
            const forcedModeProperties = getForcedModeProperties();

            if (forcedModeProperties.state.level) {
                GameplayController.currentLevel = +forcedModeProperties.state.level;
            }

            if (forcedModeProperties.state.sublevel) {
                GameplayController.currentStage = +forcedModeProperties.state.sublevel;
            }

            if (Number.isInteger(forcedModeProperties.override.shots)) {
                this.entity.script.levelBuilder.forcedModeBalls = forcedModeProperties.override.shots;
            }

            ScoreManager.instance.resetScores();
        }


        this.app.fire(EventTypes.RESTART_CURRENT_LEVEL);

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

            /* player is also ready at this point */
            famobi.playerReady();
        };

        setTimeout(() => doAPIHandshake(() => {
            famobi.log('Level restarted externally');
        }), 0);

    });
};

LevelManager.prototype.disableLevelPrefabs = function () {
    this.app.root.findByName("LevelsPrefabs").children.forEach(prefab => prefab.enabled = false);
};

LevelManager.prototype.update = function (dt) {

};

LevelManager.prototype.isCustomGeneratedLevel = function () {
    return this.lastLevelIsCustom;
};

LevelManager.prototype.findLevels = function () {
    this.levelPrefabs = this.app.root.findByName("LevelsPrefabs").find(prefab => prefab.name.indexOf(GameConfig.getAttribute('levelNameKeyword')) != -1);
    this.levels = this.levelPrefabs.map(levelPrefab => levelPrefab.children.filter(stagePrefab => stagePrefab.name.indexOf(GameConfig.getAttribute('stageNameKeyword')) != -1));
};

LevelManager.prototype.prepareStagesList = function () {
    for (let i = 0; i < this.levels.length; i++) {
        for (let stage of this.levels[i]) {
            if (stage.script.stageConfig.bossLevel) {
                this.bossStages.push(stage);
            } else {
                this.regularStages.push(stage);
            }
        }
    }

    famobi.log('Found ' + this.regularStages.length + ' stages ', this.bossStages.length + ' boss stages');
};

LevelManager.prototype.getGeneratedLevel = function (levelNumber) {
    let lastLevel = LocalStorageController.loadLastLevel();
    if (lastLevel && lastLevel.levelNumber === levelNumber) {
        this.applyLevelRotation = !!lastLevel.applyRotation;
        const levelPrefab = lastLevel.stageNames.map(stageName => this.app.root.findByName('LevelsPrefabs').findByName(stageName));
        return levelPrefab;
    } else {
        return this.generateRandomLevel(levelNumber);
    }
};

LevelManager.prototype.generateRandomLevel = function (levelNumber) {
    if (this.availableBossStages.length < 1) {
        this.availableBossStages = this.bossStages.slice();
    }

    if (this.availableRegularStages.length < Constants.STAGES_PER_LEVEL_MAX - 1) {
        this.availableRegularStages = this.regularStages.slice();
    }

    this.applyLevelRotation = (Math.floor((levelNumber - 1) / this.levelPrefabs.length) % 2) === 1;

    const level = { levelNumber: levelNumber, stages: [], applyRotation: this.applyLevelRotation };
    const numStages = Math.floor(pc.math.random(Constants.STAGES_PER_LEVEL_MIN, Constants.STAGES_PER_LEVEL_MAX + 1));
    for (let i = 0; i < numStages - 1; i++) {
        level.stages.push(Utils.removeRandomItem(this.availableRegularStages));
    }
    level.stages.push(Utils.removeRandomItem(this.availableBossStages));
    LocalStorageController.saveLastLevel(level);
    return level.stages;
};

LevelManager.prototype.getLevel = function (levelIndex) {
    if (this.levels[levelIndex - 1]) {
        this.lastLevelIsCustom = false;
        return this.levels[levelIndex - 1];
    } else {
        this.lastLevelIsCustom = true;
        return this.getGeneratedLevel(levelIndex);
    }
};

LevelManager.prototype.getStagePrefab = function (levelIndex, stageIndex) {
    if (this.loadTestStage) {
        if (this.testStage) {
            return this.testStage;
        } else {
            alert("Uncheck 'load test stage' mark or select test stage!");
            return null;
        }
    } else {
        const level = this.getLevel(levelIndex);
        const stage = level[stageIndex - 1];
        if (!stage) {
            console.warn('Stage #' + stageIndex + ' not found!');
            return null;
        }
        return stage;
    }
    return null;
};

// explosionVFX.js
var ExplosionVfx = pc.createScript('explosionVfx');

ExplosionVfx.prototype.initialize = function() {
    this.mainVfx = this.entity.particlesystem;
    this.smokeVfx = this.entity.findByName("ExplosionSmoke").particlesystem;
};


ExplosionVfx.prototype.update = function(dt) {
    if(this.exploded) {
        this.timeSinceEnabled += dt;
        if (this.timeSinceEnabled > 2.5) {
            this.entity.destroy();
        }    
    }
   
};

ExplosionVfx.prototype.explode = function() {
    this.exploded = true;
    this.timeSinceEnabled = 0;
    
    this.mainVfx.reset();
    this.mainVfx.play();

    this.smokeVfx.reset();
    this.smokeVfx.play();
    
    this.app.fire(EventTypes.SHAKE_CAMERA, 0.25, 0.15);
};


// motionLinear.js
/* jshint esversion: 6 */
var MotionLinear = pc.createScript('motionLinear');

MotionLinear.TWEENS_LIST = [
            { 'Linear': 'Linear' },
            { 'QuadraticIn': 'QuadraticIn' },
            { 'QuadraticOut': 'QuadraticOut' },
            { 'QuadraticInOut': 'QuadraticInOut' },
            { 'CubicIn': 'CubicIn' },
            { 'CubicOut': 'CubicOut' },
            { 'CubicInOut': 'CubicInOut' },
            { 'QuarticIn': 'QuarticIn' },
            { 'QuarticOut': 'QuarticOut' },
            { 'QuarticInOut': 'QuarticInOut' },
            { 'QuinticIn': 'QuinticIn' },
            { 'QuinticOut': 'QuinticOut' },
            { 'QuinticInOut': 'QuinticInOut' },
            { 'SineIn': 'SineIn' },
            { 'SineOut': 'SineOut' },
            { 'SineInOut': 'SineInOut' },
            { 'ExponentialIn': 'ExponentialIn' },
            { 'ExponentialOut': 'ExponentialOut' },
            { 'ExponentialInOut': 'ExponentialInOut' },
            { 'CircularIn': 'CircularIn' },
            { 'CircularOut': 'CircularOut' },
            { 'CircularInOut': 'CircularInOut' },
            { 'BackIn': 'BackIn' },
            { 'BackOut': 'BackOut' },
            { 'BackInOut': 'BackInOut' },
            { 'BounceIn': 'BounceIn' },
            { 'BounceOut': 'BounceOut' },
            { 'BounceInOut': 'BounceInOut' },
            { 'ElasticIn': 'ElasticIn' },
            { 'ElasticOut': 'ElasticOut' },
            { 'ElasticInOut': 'ElasticInOut' }
    ];


MotionLinear.attributes.add('axis', {
    type: 'string',
    default: 'x',
    enum: [
        {'x' : 'x'},
        {'y' : 'y'},
        {'z' : 'z'}
    ]
});

MotionLinear.attributes.add('min', {
    type: 'number',
    default: -2
});

MotionLinear.attributes.add('max', {
    type: 'number',
    default: 2
});

MotionLinear.attributes.add('speed', {
    type: 'number',
    default: 1,
    min: 0,
    max: 20
});

MotionLinear.attributes.add('direction', {
    type: 'number',
    default: 1,
    enum: [
        {'+' : 1},
        {'-' : -1}
    ]
});

MotionLinear.attributes.add('motionTween', {
    title: "Motion tween",
    type: 'string',
    default: 'Linear',
    enum: MotionLinear.TWEENS_LIST
});

MotionLinear.prototype.initialize = function() {
    this.initialLocalEulerAngles = this.entity.getLocalEulerAngles().clone();
    const position = this.entity.getLocalPosition()[this.axis];
    this.currentDirection = this.direction;
    this.minBound = position + this.min;
    this.maxBound = position + this.max;
    this.totalDistance = Math.abs(this.maxBound - this.minBound);
    this.currentProgress = (position - this.minBound) / this.totalDistance;
    this.lapTime = this.totalDistance / this.speed;
    this.makeChildrenKinematic(this.entity);
};

MotionLinear.prototype.update = function(dt) {
    
    this.currentProgress = this.currentProgress + (dt / this.lapTime) * this.currentDirection;
    if(this.currentProgress < 0) {
        this.currentProgress = 0;
        this.currentDirection = 1;
    } else if(this.currentProgress > 1) {
        this.currentProgress = 1;
        this.currentDirection = -1;
    }
        
    const position = this.entity.getLocalPosition();
    if(this.currentDirection > 0) {
        position[this.axis] = this.minBound + pc[this.motionTween](this.currentProgress) * this.totalDistance;
    } else {
        position[this.axis] = this.minBound + (1 - pc[this.motionTween](1 - this.currentProgress)) * this.totalDistance;
    }
    
    this.entity.setLocalPosition(position);
    
    if(!this.entity.script.motionRotating) {
        this.entity.setLocalEulerAngles(this.initialLocalEulerAngles);
    }
};

MotionLinear.prototype.makeChildrenKinematic = function(entity) {
    if(entity.rigidbody) {
        if(entity.rigidbody.type != pc.BODYTYPE_KINEMATIC) {
            entity.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        }
        entity.rigidbody.friction = GameConfig.getAttribute('movingStandFriction');
        entity.rigidbody.restitution = GameConfig.getAttribute('movingStandRestitution');
    }
    entity.children.forEach(child => this.makeChildrenKinematic(child));
};

// motionRotating.js
/* jshint esversion: 6 */
var MotionRotating = pc.createScript('motionRotating');

MotionRotating.attributes.add('axis', {
    type: 'string',
    default: 'y',
    enum: [
        {'x' : 'x'},
        {'y' : 'y'},
        {'z' : 'z'}
    ]
});

MotionRotating.attributes.add('speed', {
    type: 'number',
    title: 'speed (deg per sec.)',
    default: 90,
});

MotionRotating.attributes.add('direction', {
    type: 'number',
    default: 1,
    enum: [
        {'+' : 1},
        {'-' : -1}
    ]
});


MotionRotating.prototype.initialize = function() {
    this.makeChildrenKinematic(this.entity);
};


MotionRotating.prototype.update = function(dt) {
    
    const frameRotation = this.speed * dt * this.direction;
    if(this.axis === 'x') {
        this.entity.rotateLocal(frameRotation, 0, 0);       
    } else if(this.axis === 'y') {
        this.entity.rotateLocal(0, frameRotation, 0);       
    } else {
        this.entity.rotateLocal(0, 0, frameRotation);      
    }
};


MotionRotating.prototype.makeChildrenKinematic = function(entity) {
    if(entity.rigidbody) {
        if(entity.rigidbody.type != pc.BODYTYPE_KINEMATIC) {
            entity.rigidbody.type = pc.BODYTYPE_KINEMATIC;
        }
        entity.rigidbody.friction = GameConfig.getAttribute('movingStandFriction');
        entity.rigidbody.restitution = GameConfig.getAttribute('movingStandRestitution');
    }
    entity.children.forEach(child => this.makeChildrenKinematic(child));
};



// stageConfig.js
var StageConfig = pc.createScript('stageConfig');

StageConfig.attributes.add('numBalls', {
    title: 'Balls',
    type: 'number',
    default: 25
});

StageConfig.attributes.add('bossLevel', {
    title: 'Boss level',
    type: 'boolean',
    default: false
});


StageConfig.prototype.initialize = function() {
    
};

StageConfig.prototype.update = function(dt) {
    
};



// levelProgressContainer.js
/* jshint esversion: 6 */
var LevelProgressContainer = pc.createScript('levelProgressContainer');

LevelProgressContainer.LANDSCAPE = 'landscape';
LevelProgressContainer.PORTRAIT = 'portrait';

LevelProgressContainer.attributes.add('orientation', {
    type: 'string',
    default: LevelProgressContainer.PORTRAIT,
    enum: [
        {'portrait' : LevelProgressContainer.PORTRAIT},
        {'landscape' : LevelProgressContainer.LANDSCAPE}
    ]
});

LevelProgressContainer.attributes.add('LEVEL_PLATE_INITIAL_X', {
    type: 'number',
    default: 38
});

LevelProgressContainer.attributes.add('LEVEL_PLATE_INITIAL_Y', {
    type: 'number',
    default: 38
});

LevelProgressContainer.attributes.add('STAGE_PLATE_WIDTH', {
    type: 'number',
    default: 58
});

LevelProgressContainer.attributes.add('STAGE_PLATE_HEIGHT', {
    type: 'number',
    default: 58
});

LevelProgressContainer.attributes.add('completedStagePrefab', {
    type: 'entity'
});

LevelProgressContainer.attributes.add('currentStagePrefab', {
    type: 'entity'
});

LevelProgressContainer.attributes.add('nextStagePrefab', {
    type: 'entity'
});

LevelProgressContainer.prototype.initialize = function() {
    this.barContainer = this.entity.findByName('BarContainer');
    this.stages = this.entity.findByName('Stages');
    this.currentLevelPlate = this.entity.findByName('CurrentLevel');
    this.currentLevelText = this.currentLevelPlate.findByName('LevelText');
    this.nextLevelPlate = this.entity.findByName('NextLevel');
    this.nextLevelText = this.nextLevelPlate.findByName('LevelText');
    this.currentScoresText = this.entity.findByName('ScoresText');
    this.bestScoreGroup = this.entity.findByName("BestScoresGroup"); 
    this.bestScoreText = this.entity.findByName("BestScoresText"); 
    this.bestScoreIcon = this.entity.findByName("BestScoresIcon"); 
    
    this.app.on(EventTypes.LOAD_STAGE, this.rebuildInterface, this);
    this.app.on(EventTypes.VIEWPORT_RESIZE, this.rebuildInterface, this);
    this.app.on(EventTypes.SCORES_CHANGED, (value) => this.currentScoresText.element.text = '' + value);
    this.app.on(EventTypes.MAX_SCORES_CHANGED, (value) => this.bestScoreText.element.text = '' + value);
       
    const scriptContext = this;
    
    this.entity.show = function() {
        this.enabled = true;
        
        if(scriptContext.orientation === LevelProgressContainer.PORTRAIT) {
            this.setLocalPosition(0, 30, 0);
            this.tween(this.getLocalPosition())
                .to(new pc.Vec3(0, -160, 0), 0.4, pc.BackOut)
                .delay(0.2)
                .start();
        } else {
            this.setLocalPosition(-250, 0, 0);
            this.tween(this.getLocalPosition())
                .to(new pc.Vec3(0, 0, 0), 0.4, pc.BackOut)
                .delay(0.2)
                .start();
        }
        
    }.bind(this.entity);
    
    this.entity.hide = function() {
         this.enabled = false;
    }.bind(this.entity);
    
    
    this.entity.enabled = false; 
};

LevelProgressContainer.prototype.update = function(dt) {
    
    if(isUIHidden("level_progress")) {
        this.barContainer.enabled = false;
    }
    
    if(isUIHidden("score_counter")) {
        this.currentScoresText.enabled = this.bestScoreGroup.enabled  = false;
    }
    
    let pos = this.bestScoreIcon.getLocalPosition();
    pos.x = this.bestScoreText.getLocalPosition().x - this.bestScoreText.element.width / 2 - 2;
    this.bestScoreIcon.setLocalPosition(pos);
};

LevelProgressContainer.prototype.rebuildInterface = function() {   
    /* clear stages */
    for(let i = this.stages.children.length - 1; i > -1; i--) {
        this.stages.children[i].destroy();        
    }
    
    const levelIndex = GameplayController.currentLevel;
    const stageIndex = GameplayController.currentStage;
    const totalStages = GameplayController.totalStages;
    
    /* build new ones */
    for(let i = totalStages; i >= 1; i--) {
        const stagePlate = i < stageIndex ? this.completedStagePrefab.clone() : i > stageIndex ? this.nextStagePrefab.clone() : this.currentStagePrefab.clone();
        if(this.orientation === LevelProgressContainer.PORTRAIT) {
            stagePlate.setLocalPosition(this.STAGE_PLATE_WIDTH * (i - totalStages / 2 - 0.5), 0, 0);
        } else {
            stagePlate.setLocalPosition(0, this.STAGE_PLATE_HEIGHT * (i - totalStages / 2 - 0.5), 0);
        }
        this.stages.addChild(stagePlate);
    }
    
    /* reposition current & next level plates */
    if(this.orientation === LevelProgressContainer.PORTRAIT) {
        this.currentLevelPlate.setLocalPosition(-this.LEVEL_PLATE_INITIAL_X - totalStages * this.STAGE_PLATE_WIDTH / 2, 0, 0);
        this.nextLevelPlate.setLocalPosition(this.LEVEL_PLATE_INITIAL_X + totalStages * this.STAGE_PLATE_WIDTH / 2, 0, 0);
    } else {
        this.currentLevelPlate.setLocalPosition(1, -this.LEVEL_PLATE_INITIAL_Y - totalStages * this.STAGE_PLATE_HEIGHT / 2, 0);
        this.nextLevelPlate.setLocalPosition(1, this.LEVEL_PLATE_INITIAL_Y + totalStages * this.STAGE_PLATE_HEIGHT / 2, 0);
        this.bestScoreGroup.setLocalPosition(0, this.LEVEL_PLATE_INITIAL_Y + totalStages * this.STAGE_PLATE_HEIGHT / 2 + 67, 0);
        this.currentScoresText.setLocalPosition(0, this.LEVEL_PLATE_INITIAL_Y + totalStages * this.STAGE_PLATE_HEIGHT / 2 + 70 + 48, 0);
    }
    
    /* scale to fint width in portrait mode */
     if(this.orientation === LevelProgressContainer.PORTRAIT) {
         const targetBarScale = pc.math.clamp(ScaleManager.screenRatio / ScaleManager.SCREEN_RATIO_MIN, 0.5, 1);
         this.barContainer.setLocalScale(targetBarScale, targetBarScale, targetBarScale);
     }
    
    /* update current & next level texts */
    this.currentLevelText.element.text = '' + levelIndex;
    this.nextLevelText.element.text = '' + (levelIndex + 1);
        
    /* switch between landscape and portrait modes */
    if((ScaleManager.mobileLandscapeMode && this.orientation != LevelProgressContainer.LANDSCAPE) || (!ScaleManager.mobileLandscapeMode && this.orientation != LevelProgressContainer.PORTRAIT)) {
        this.disableChildren();
    } else {
        this.enableChildren();
    }
};

LevelProgressContainer.prototype.disableChildren = function() {
    this.entity.children.forEach(c => c.enabled = false);
};

LevelProgressContainer.prototype.enableChildren = function() {
    this.entity.children.forEach(c => c.enabled = true);
};

// localStorageController.js
/* jshint esversion: 6 */
var LocalStorageController = pc.createScript('localStorageController');

LocalStorageController.prototype.initialize = function() {
    LocalStorageController.app = this.app;
    LocalStorageController.currentLocalStorage = (window.famobi && window.famobi.localStorage) ? window.famobi.localStorage : window.localStorage;
    
    this.app.on(EventTypes.SAVE_APP, () => LocalStorageController.saveData(), this);
};

LocalStorageController.prototype.update = function(dt) {
    
};

LocalStorageController.getSaveData = function() {    
    const saveData = {
        currentLevel: GameplayController.currentLevel,
        maxScores: ScoreManager.instance.getMaxScores(),
        qualityIndex: ScaleManager.qualityIndex,
        audioEnabled: SoundController.soundStateLoaded ? SoundController.audioEnabled : true, 
    };     
    return saveData;
};

LocalStorageController.getSlotKey = function() {
    return "CannonBalls3D_" + Constants.GAME_VERSION;
};

LocalStorageController.getLevelsSlotKey = function() {
    return "CannonBalls3D_" + Constants.GAME_VERSION + '_levels';
};

LocalStorageController.saveData = function(immediately) {
    if(immediately) {
        var data = LocalStorageController.getSaveData();
        LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getSlotKey(), JSON.stringify(data));    
    } else {
        setTimeout(() => {
            var data = LocalStorageController.getSaveData();
            LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getSlotKey(), JSON.stringify(data));
        }, 50);
    }
};

LocalStorageController.loadData = function() {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.getSlotKey());
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
    ScoreManager.instance.setMaxScores(data.maxScores || 0);
    if(data.qualityIndex !== undefined) {
        if(dataLoaded) {
            ScaleManager.savedQuality = data.qualityIndex;
        }
        ScaleManager.qualityIndex = data.qualityIndex;
        LocalStorageController.app.fire(EventTypes.QUALITY_UPDATE);
    }
    SoundController.soundStateLoaded = true;
    LocalStorageController.app.fire(((data.audioEnabled === undefined) ? true : data.audioEnabled) ? EventTypes.ENABLE_AUDIO : EventTypes.DISABLE_AUDIO);
};


LocalStorageController.loadLastLevel = function() {
    var data = LocalStorageController.currentLocalStorage.getItem(LocalStorageController.getLevelsSlotKey());
    var dataLoaded = false;
    
    if(data) {
        try {
            data = JSON.parse(data);
            dataLoaded = true;
        } catch (e) {
            data = null;
        }
    } else {
        data = null;
    }
    
    return data;
};

LocalStorageController.saveLastLevel = function(level) {
    const serializedLevel = {};
    serializedLevel.levelNumber = level.levelNumber;
    serializedLevel.stageNames = level.stages.map(stage => stage.name);
    serializedLevel.applyRotation = level.applyRotation;
    LocalStorageController.currentLocalStorage.setItem(LocalStorageController.getLevelsSlotKey(), JSON.stringify(serializedLevel));    
    // console.log("Level saved ", serializedLevel);
};

// ballsManager.js
/* jshint esversion: 6 */
var BallsManager = pc.createScript('ballsManager');

BallsManager.attributes.add('cameraPositionDefault', {
    type: 'vec3',
    default: [-1.8, 0, 14.4]
});

BallsManager.attributes.add('cameraPositionMobileLandscape', {
    type: 'vec3',
    default: [-1.8, 0, 9]
});


BallsManager.prototype.initialize = function() {
    /* entities */
    this.ballsPrefabs = this.entity.findByName('BallsPrefabs'); 
    this.bombPrefabs = this.entity.findByName('BombsPrefabs'); 
    this.ballsContainer = this.entity.findByName('PreparedBalls'); 
    this.bombsContainer = this.entity.findByName('PreparedBombs'); 
    this.ballsLeftText = this.entity.findByName('BallsLeftText');    
    this.infinitySymbol = this.entity.findByName('InfinityBalls');
        
    /* properties */
    this.ballsLeft = 0;
    this.infiniteBalls = false;
    this.bombsLeft = 0;
    this.totalBalls = 0;
    this.totalBombs = 0;
    this.maxBalls = this.ballsPrefabs.children.length;
    this.maxBombs = 3;
    this._currentPrefabIndex = 0;    
 
    this.app.on(EventTypes.POWERUP_ACTIVATED, this.switchToBombs, this);
    this.app.on(EventTypes.BALL_SHOT, this.handleBallShot, this);
    this.app.on(EventTypes.BOMB_SHOT, this.handleBombShot, this);
    this.app.on(EventTypes.SET_BALLS_AMOUNT, this.resetAndCreateBalls, this);
    this.app.on(EventTypes.BALLS_AMOUNT_UPDATED, this.updateVisibleBallsAmount, this);
    this.app.on(EventTypes.VIEWPORT_RESIZE, this.handleViewportResized, this);
    
    this.handleViewportResized();
    
    this.app.on(EventTypes.SHOW_BALLS_BOX, this.showBallsBox, this);
    this.entity.enabled = false;
};

BallsManager.prototype.update = function(dt) {
    if(this.infiniteBalls) {
        this.infinitySymbol.enabled = true;
        this.ballsLeftText.enabled = false;
    } else {
        this.infinitySymbol.enabled = false;
        this.ballsLeftText.enabled = true;
    }
};

BallsManager.prototype.bombsActive = function() {
    return this.bombsContainer.enabled;
};

BallsManager.prototype.switchToBombs = function() {
    this.ballsContainer.enabled = false;
    this.bombsContainer.enabled = true;
    
    if(isForcedMode() && getForcedModeProperties().override.bombs_only) {
        this.setBombsAmount(this.bombsLeft);
    } else {
        this.setBombsAmount(3);
    }
};

BallsManager.prototype.switchToBalls = function() {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Resource",
        flowType: "Sink",
        itemType: "powerup",
        itemId: "bomb",
        amount: this.bombsLeft,
        resourceCurrency: "bomb_ball"
    });

    this.ballsContainer.enabled = true;
    this.bombsContainer.enabled = false;
    
    this.setBallsAmount(this.ballsLeft);
};

BallsManager.prototype.showBallsBox = function(amount) {
    this.synchronizeBallsAmount();
    this.entity.enabled = true;
    
    this.entity.delayedCall(350, () => {
         this.disableBodies(this.entity);
         this.entity.tween(this.entity.getLocalPosition())
            .to(ScaleManager.mobileLandscapeMode ? this.cameraPositionMobileLandscape : this.cameraPositionDefault, 0.26, pc.SineOut)
            .on('complete', () => {
                this.enableBodies(this.entity);
            })
            .start();
    }); 
};

BallsManager.prototype.resetAndCreateBalls = function(amount, infinite) {
    this.infiniteBalls = infinite;
    this.ballsLeft = amount;
    
    if(isForcedMode() && getForcedModeProperties().override.bombs_only) {
        this.ballsLeft = 0;
        this.bombsLeft = amount;
        this.switchToBombs();
    } else {
        this.switchToBalls();
    }
};

BallsManager.prototype.setBallsAmount = function(amount) {
    this.removeAllBalls();
    this.totalBalls = amount; 
    this.ballsLeft = amount;
    this.app.fire(EventTypes.BALLS_AMOUNT_UPDATED, this.ballsLeft);
    if(this.ballsLeft === 0) {
        this.app.fire(EventTypes.OUT_OF_BALLS);
    }
};

BallsManager.prototype.updateVisibleBallsAmount = function(amount) {
    this.ballsLeftText.element.text = '' + amount; 
    this.synchronizeBallsAmount();
    this.synchronizeBombsAmount(isForcedMode() && getForcedModeProperties().override.bombs_only);
};

BallsManager.prototype.synchronizeBallsAmount = function() {
   if(!GameplayController.gameStarted) {
       return;
   }
    
   const actualAmount = this.ballsContainer.children.length;  
   if(this.ballsLeft < actualAmount) {
       for(let i = 0; i < actualAmount - this.ballsLeft; i++) {
           this.removeBall();
       }
   } else if(this.ballsLeft > actualAmount) {
       for(let i = this.ballsLeft - actualAmount - 1; i > -1; i--) {
           this.addBall();
       }
   }
};

BallsManager.prototype.handleBallShot = function() {
    if(!this.infiniteBalls) {
        this.ballsLeft = Math.max(this.ballsLeft - 1, 0);
    }
    this.app.fire(EventTypes.BALLS_AMOUNT_UPDATED, this.ballsLeft);
    if(this.ballsLeft <= 0) {
        this.ballsLeft = 0;
        this.app.fire(EventTypes.OUT_OF_BALLS);
    }
    Apicontroller.trackStats('projectile_shot', {
        shot_type: 'ball'
    });
};


BallsManager.prototype.addBall = function() {
    if(this.ballsContainer.children.length >= this.maxBalls) {
        return;
    }    
    const ballPrefab = this.ballsPrefabs.children[(this._currentPrefabIndex++) % this.ballsPrefabs.children.length].clone();
    const localPosition = ballPrefab.getLocalPosition();
    this.ballsContainer.addChild(ballPrefab);
    const worldPosition = ballPrefab.getPosition();
    ballPrefab.rigidbody.teleport(new pc.Vec3(worldPosition.x, worldPosition.y + pc.math.random(-0.2, 0.2), worldPosition.z));
};


BallsManager.prototype.removeBall = function() {
    if(this.ballsLeft >= this.maxBalls) {   
        return;
    }    
    if(this.ballsContainer.children.length > 0) {
        this.ballsContainer.children[this.ballsContainer.children.length - 1].destroy();
    }    
    this.ballsContainer.children.forEach(child => child.rigidbody.activate());
};



/* Bombs */

BallsManager.prototype.setBombsAmount = function(amount) {
    
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Resource",
        flowType: "Source",
        itemType: "powerup",
        itemId: "bomb",
        amount: amount,
        resourceCurrency: "bomb_ball"
    });

    for(let i = this.bombsContainer.children.length - 1; i > -1; i--) {
        this.bombsContainer.children[i].destroy();
    }
    this.totalBombs = amount; 
    this.bombsLeft = amount;
    this.app.fire(EventTypes.BALLS_AMOUNT_UPDATED, this.bombsLeft);
};

BallsManager.prototype.synchronizeBombsAmount = function(forced) {
   if(!GameplayController.gameStarted && !forced) {
       return;
   }    
   
   const actualAmount = this.bombsContainer.children.length;  
   if(this.bombsLeft < actualAmount) {
       for(let i = 0; i < actualAmount - this.bombsLeft; i++) {
           this.removeBomb();
       }
   } else if(this.bombsLeft > actualAmount) {
       for(let i = this.bombsLeft - actualAmount - 1; i > -1; i--) {
           this.addBomb();
       }
   }
};

BallsManager.prototype.handleBombShot = function() {
    if(this.infiniteBalls && isForcedMode() && getForcedModeProperties().override.infinite_shots_at_boss_stage !== false && getForcedModeProperties().override.bombs_only ) {
        //don't decrease bombs amount        
    } else {
       this.bombsLeft = Math.max(this.bombsLeft - 1, 0);
    }
    
    this.app.fire(EventTypes.BALLS_AMOUNT_UPDATED, this.bombsLeft);
    if(this.bombsLeft <= 0) {
        this.bombsLeft = 0;
        this.switchToBalls();
    }
    Apicontroller.trackStats('projectile_shot', {
        shot_type: 'bomb'
    });
};

BallsManager.prototype.addBomb = function() {
    if(this.bombsContainer.children.length >= this.maxBombs) {
        return;
    }    
    const bombPrefab = this.bombPrefabs.children[(this._currentPrefabIndex++) % this.bombPrefabs.children.length].clone();
    const localPosition = bombPrefab.getLocalPosition();
    this.bombsContainer.addChild(bombPrefab);
    const worldPosition = bombPrefab.getPosition();
    bombPrefab.rigidbody.teleport(new pc.Vec3(worldPosition.x, worldPosition.y + pc.math.random(-0.1, 0.1), worldPosition.z));
};


BallsManager.prototype.removeBomb = function() {
    if(this.bombsLeft >= this.maxBombs) {   
        return;
    }    
    if(this.bombsContainer.children.length > 0) {
        this.bombsContainer.children[this.bombsContainer.children.length - 1].destroy();
    }    
    this.bombsContainer.children.forEach(child => child.rigidbody.activate());
};






BallsManager.prototype.removeAllBalls = function() {
   for(let i = this.ballsContainer.children.length - 1; i > -1; i--) {
       this.ballsContainer.children[i].destroy();
   }
};

BallsManager.prototype.shakeRandomBall = function() {
    if(this.ballsContainer.children.length > 0) {
        const randomBall = Utils.getRandomItem(this.ballsContainer.children);
        randomBall.rigidbody.applyImpulse(new pc.Vec3(pc.math.random(-1, 1), pc.math.random(-0.1, 0.1), pc.math.random(-1, 1)).scale(5), new pc.Vec3(0, 0, 0));
    }
};

BallsManager.prototype.handleViewportResized = function () {
    this.entity.delayedCall(0, () => {
        this.disableBodies(this.entity);
        const position = ScaleManager.mobileLandscapeMode ? this.cameraPositionMobileLandscape : this.cameraPositionDefault;
        this.entity.setPosition(position.x, GameplayController.gameStarted ? position.y : position.y - 0.01, GameplayController.gameStarted ? position.z : position.z + 7.5);
        this.enableBodies(this.entity);
    });
};


BallsManager.prototype.disableBodies = function (entity) {
    if(entity.rigidbody) {
        entity.rigidbody.enabled = false;
    }
    entity.children.forEach(child => this.disableBodies(child));
};

BallsManager.prototype.enableBodies = function (entity) {
    if(entity.rigidbody) {
        entity.rigidbody.enabled = true;
    }
    entity.children.forEach(child => this.enableBodies(child));
};

// basicButton.js
var BasicButton = pc.createScript('basicButton');


BasicButton.attributes.add('applyScalingTween', {
    title: "Apply scaling tween",
    type: 'boolean',
    default: true
});

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
    
    if(this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration, pc.Linear)
            .start();
    }
    document.body.style.cursor = 'pointer';
};

BasicButton.prototype.onLeave = function (event) {
    this.hovered = false;
    
    if(this.applyScalingTween) {
         event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration, pc.Linear)
            .start();
    }
   

    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
BasicButton.prototype.onPress = function (event) {
    event.stopPropagation();
    if(this.clickSound) {
        this.app.fire(EventTypes.PLAY_AUDIO, "click");
    }
    
    if(this.applyScalingTween) {
        event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale, this.defaultScale * this.pressedScale), this.upScaleDuration * 0.5, pc.SineOut)
            .start();
    }
 };

BasicButton.prototype.onRelease = function (event) {
    if(this.applyScalingTween) {
         if(this.hovered) {
         event.element.entity.tween(event.element.entity.getLocalScale())
            .to(new pc.Vec3(this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale, this.defaultScale * this.hoverScale), this.upScaleDuration * 0.5, pc.Linear)
            .start();
        } else {
            event.element.entity.tween(event.element.entity.getLocalScale())
                .to(new pc.Vec3(this.defaultScale, this.defaultScale, this.defaultScale), this.upScaleDuration * 0.5, pc.Linear)
                .start();
        }
    }
};

// resultsWindow.js
/* jshint esversion: 6 */
var ResultsWindow = pc.createScript('resultsWindow');

ResultsWindow.prototype.initialize = function () {

    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonNext = this.entity.findByName("ButtonNext");
    this.entity.background = this.entity.findByName("Background");
    this.entity.scoreGroup = this.entity.findByName("ScoreGroup");
    this.entity.maxScoreGroup = this.entity.findByName("MaxScoreGroup");
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");

    this.assignAction(this.entity.buttonNext, this.nextPressed, this);

    const scriptContext = this;

    /* show method */
    this.entity.show = function () {
        this.enabled = true;

        scriptContext.app.fire(EventTypes.SAVE_APP);
        scriptContext.app.fire(EventTypes.PLAY_AUDIO, "victory");

        if (scriptContext.buttonNextTween && scriptContext.buttonNextTween.playing) {
            scriptContext.buttonNextTween.stop();
        }

        this.buttonNext.setLocalScale(0, 0, 0);

        var showButtons = (delay) => {
            /* tween buttons */
            scriptContext.buttonNextTween = this.buttonNext
                .tween(this.buttonNext.getLocalScale())
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
                            levelName: '' + GameplayController.currentLevel
                        }
                    ),
                    window.famobi_analytics.trackEvent(
                        "EVENT_LEVELSCORE",
                        {
                            levelName: '' + GameplayController.currentLevel,
                            levelScore: ScoreManager.instance.getScores()
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

        /* tween texts */
        const textTweenDelay = 1.75;
        if (ScoreManager.instance.getScores() > 0) {
            this.delayedCall(textTweenDelay * 1000, () => scriptContext.app.fire(EventTypes.UNMUTE_SOUND, "counting", 0.9));
            this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire(EventTypes.MUTE_SOUND, "counting"));
        }

        Utils.tweenText(this.scoreText, 0, ScoreManager.instance.getScores(), 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, ScoreManager.instance.getPrevMaxScores(), ScoreManager.instance.getMaxScores(), 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        ScoreManager.instance.setPrevMaxScores(ScoreManager.instance.getMaxScores());

        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if (ScoreManager.instance.getScores() === ScoreManager.instance.getMaxScores()) {

            this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                .to({ opacity: 1 }, 0.3, pc.Linear)
                .delay(textTweenDelay + 1)
                .on('complete', () => {
                    if (this.enabled) {
                        scriptContext.app.fire(EventTypes.PLAY_AUDIO, 'newBest');
                    }
                })
                .on('update', () => {
                    this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 66, 0, 0);
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

ResultsWindow.prototype.assignAction = function (button, handler, handlerContext) {
    if (this.app.touch) {
        button.element.on('touchstart', handler, handlerContext);
    } if (this.app.mouse) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

ResultsWindow.prototype.update = function (dt) {

};

ResultsWindow.prototype.nextPressed = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Results:NextLevel",
    });

    window.famobi.showInterstitialAd({
        eventId: "Button:Results:NextLevel",
        callback: () => {
            TransitionScreen.instance.transitionTo(() => {
                this.entity.hide();
                this.app.fire(EventTypes.LOAD_NEXT_LEVEL);
            });
        }
    });
};

// windowManager.js
var WindowManager = pc.createScript('windowManager');

WindowManager.prototype.initialize = function() {
    WindowManager.app = this.app;
    
    WindowManager.resultsWindow = this.app.root.findByName("UIContainer").findByName("ResultsWindow");
    WindowManager.defeatWindow = this.app.root.findByName("UIContainer").findByName("DefeatWindow");
    WindowManager.reviveWindow = this.app.root.findByName("UIContainer").findByName("ReviveWindow");
    WindowManager.levelUI = this.app.root.findByName("UIContainer").findByName("LevelUI");
    WindowManager.settingsPanel = this.app.root.findByName("UIContainer").findByName("SettingsPanel");
    WindowManager.mainMenu = this.app.root.findByName("UIContainer").findByName("MainMenu");
    // WindowManager.gameplayUI = this.app.root.findByName("UIContainer").findByName("GamePlayUI");
};


WindowManager.prototype.update = function(dt) {
    
};

WindowManager.hideAll = function() {  
    WindowManager.resultsWindow.hide();  
    WindowManager.defeatWindow.hide();
    WindowManager.reviveWindow.hide();
    WindowManager.settingsPanel.hide();  
    WindowManager.mainMenu.hide();  
    // WindowManager.gameplayUI.hide();  
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
    WindowManager.mainMenu.hide();
    WindowManager.levelUI.show();
};

WindowManager.exitGameplay = function() { 
    WindowManager.hideAll();
    WindowManager.mainMenu.show(); 
    WindowManager.settingsPanel.show();
};

WindowManager.hasOpenedWindows = function (){
    return WindowManager.resultsWindow.enabled || WindowManager.defeatWindow.enabled || WindowManager.reviveWindow.enabled;
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
    this.entity.newBestScoreIcon = this.entity.maxScoreGroup.findByName("NewBestScoreIcon");
    this.entity.scoreText = this.entity.scoreGroup.findByName("Text");
    this.entity.maxScoreText = this.entity.maxScoreGroup.findByName("Text");

    this.assignAction(this.entity.buttonRestart, this.restartPressed, this);

    const scriptContext = this;

    /* show method */
    this.entity.show = function () {
        this.enabled = true;

        scriptContext.app.fire(EventTypes.SAVE_APP);
        scriptContext.app.fire(EventTypes.PLAY_AUDIO, "defeat");

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
                        "EVENT_LEVELSCORE",
                        {
                            levelName: '' + GameplayController.currentLevel,
                            levelScore: ScoreManager.instance.getScores()
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
            .to({ opacity: 0.96 }, 0.25, pc.Linear)
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

        /* tween texts */
        const textTweenDelay = 1.75;
        if (ScoreManager.instance.getScores() > 0) {
            this.delayedCall(textTweenDelay * 1000, () => scriptContext.app.fire(EventTypes.UNMUTE_SOUND, "counting", 0.9));
            this.delayedCall((textTweenDelay + 1.0) * 1000, () => scriptContext.app.fire(EventTypes.MUTE_SOUND, "counting"));
        }

        Utils.tweenText(this.scoreText, 0, ScoreManager.instance.getScores(), 0.75, textTweenDelay, pc.SineOut, true);
        Utils.tweenText(this.maxScoreText, ScoreManager.instance.getPrevMaxScores(), ScoreManager.instance.getMaxScores(), 0.75, textTweenDelay + 0.25, pc.SineOut, true);
        ScoreManager.instance.setPrevMaxScores(ScoreManager.instance.getMaxScores());

        this.newBestScoreIcon.element.opacity = 0;
        this.newBestScoreIcon.setLocalScale(2, 2, 2);
        if (ScoreManager.instance.getScores() === ScoreManager.instance.getMaxScores()) {

            this.newBestScoreIcon.tween(this.newBestScoreIcon.element)
                .to({ opacity: 1 }, 0.3, pc.Linear)
                .delay(textTweenDelay + 1)
                .on('complete', () => {
                    if (this.enabled) {
                        scriptContext.app.fire(EventTypes.PLAY_AUDIO, 'newBest');
                    }
                })
                .on('update', () => {
                    this.newBestScoreIcon.setLocalPosition(this.maxScoreText.element.width + 66, 0, 0);
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

DefeatWindow.prototype.assignAction = function (button, handler, handlerContext) {
    if (this.app.touch) {
        button.element.on('touchstart', handler, handlerContext);
    }
    if (this.app.mouse) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

DefeatWindow.prototype.update = function (dt) {

};

DefeatWindow.prototype.restartPressed = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Defeat:Restart",
    });

    window.famobi.showInterstitialAd({
        eventId: "Button:Defeat:Restart",
        callback: () => {
            TransitionScreen.instance.transitionTo(() => {
                this.entity.hide();
                this.app.fire(EventTypes.RESTART_CURRENT_LEVEL);
            });
        }
    });



};

// reviveWindow.js
/* jshint esversion: 6 */
var ReviveWindow = pc.createScript('reviveWindow');

// initialize code called once per entity
ReviveWindow.prototype.initialize = function() {
        
    this.entity.background = this.entity.findByName("Background");
    this.entity.headingLight = this.entity.findByName("HeadingLight");
    this.entity.headingIconContainer = this.entity.findByName("HeadingIconContainer");
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.buttonRevive = this.entity.findByName("ButtonRevive");
    this.entity.buttonSkip = this.entity.findByName("ButtonSkip");
    
    this.assignAction(this.entity.buttonRevive, this.revivePressed, this);
    this.assignAction(this.entity.buttonSkip, this.skipPressed, this);
    
     this.entity.headingIcon.tween(this.entity.headingIcon.getLocalScale())
         .to(new pc.Vec3(0.9, 0.9, 0.9), 0.45, pc.SineInOut)
         .yoyo(true)
         .repeat(100000)
         .start();
    
    const scriptContext = this;

    /* show method */
    this.entity.show = function() {
        this.enabled = true;

        scriptContext._isBeingRevived = false;
             
        /* tween background */
        this.background.element.opacity = 0.0;
        this.background.tween(this.background.element)
            .to({opacity: 0.75}, 0.25, pc.Linear)
            .start();
         
        /* tween heading light */
        this.headingLight.element.opacity = 0.0;       
        this.headingLight.tween(this.headingLight.element)
            .to({opacity: 1}, 0.4, pc.SineIn)
            .delay(0.15)
            .start();

        
        /* tween heading icon */   
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween = 
        this.headingIcon.tween(this.headingIcon.element)
            .to({opacity: 1}, 0.3, pc.Linear)
            .delay(0.1)
            .start();
        
        this.headingIconContainer.setLocalScale(0.0, 0.0, 0.0);
        var headingAppearingScaleTween = 
        this.headingIconContainer.tween(this.headingIconContainer.getLocalScale())
            .to(new pc.Vec3(1.0, 1.0, 1.0), 0.5, pc.BackOut)
            .delay(0.1)
            .start();
       
        
        /* tween buttons */
        this.buttonRevive.setLocalScale(0, 0, 0);
        this.buttonRevive
            .tween(this.buttonRevive.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(0.4)
            .start();
                
        this.buttonSkip.setLocalScale(0, 0, 0);
        this.buttonSkip
            .tween(this.buttonSkip.getLocalScale())
            .to(new pc.Vec3(1, 1, 1), 0.5, pc.BackOut)
            .delay(1.8)
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
    this.entity.headingLight.rotateLocal(0, 0, 120 * dt);

    this.entity.buttonRevive.enabled = Apicontroller.hasRewardedVideo();

    if(!this._isBeingRevived) {
        if(!Apicontroller.hasRewardedVideo()) {
            this.app.fire(EventTypes.REVIVE_CANCELED);
            this.entity.hide();
        }
    }
};

ReviveWindow.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } 
     if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     } 
};

ReviveWindow.prototype.revivePressed = function() {    
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Revive:ReviveMe",
    });

    this._isBeingRevived = true;
    Apicontroller.showRewardedVideo((result) => {
         if(result && result.rewardGranted) {
            this.entity.delayedCall(50, () =>  this.app.fire(EventTypes.REVIVE_EARNED));
            this.entity.hide();
         }
    });
};

ReviveWindow.prototype.skipPressed = function() {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:Revive:Skip",
    });

    this.app.fire(EventTypes.REVIVE_CANCELED);
    this.entity.hide();
};



// APIController.js
/* jshint esversion: 6 */
var Apicontroller = pc.createScript('apicontroller');

Apicontroller.prototype.initialize = function () {
    famobi.log('API controller initialized');
    game = this.app;
};

Apicontroller.prototype.update = function (dt) {

};

Apicontroller.isRewardedVideoFeatureEnabled = function () {
    return famobi.hasFeature("rewarded");
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


Apicontroller.handleLevelEndEvent = function (result, score, resolveCallback) {
    if (!window.famobi) {
        resolveCallback();
        return;
    }

    game.timeScale = 0.00001;

    window.famobi_analytics.trackEvent("EVENT_CUSTOM", { eventName: "LEVELEND", result: result, score: score })
        .then(() => {
            game.timeScale = 1.0;
            resolveCallback();
        }).catch(() => {

        });
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
            forced_mode: false,
            auto_quality: false,
            external_mute: false,
            copyright: true
        };

        return options[key] || false;
    };

    famobi.getFeatureProperties = function (key) {
        if (key === 'forced_mode') {
            return {
                "state": {
                    "level": 1,
                    "sublevel": 3,
                    "endless_mode": false,
                    "theme": "Field",
                    "powerup_bomb": false
                },
                "override": {
                    "hide_ui": [/*"level_progress", "score_counter", "floating_score_points"*/],
                    "shots": 25,
                    "infinite_shots_at_boss_stage": false,
                    "bombs_only": false
                }
            };
        } else {
            return {};
        }
    };


    famobi.showInterstitialAd = (eventId, callback) => {
        if (typeof eventId === 'object') {
            eventId.callback();
        } else {
            callback();
        }
    };

    famobi.getMoreGamesButtonImage = famobi.getBrandingButtonImage = () => "https://games.cdn.famobi.com/portal/4638e320-4444-4514-81c4-d80a8c662371/more-games-button/600x253/5a6895c0f28fb.png";

    famobi.moreGamesLink = famobi.openBrandingLink = () => log('More games link');

    famobi_analytics = window.famobi_analytics = {
        trackEvent: (key, obj) => {
            return new Promise((resolve, reject) => {
                log("famobi_analytics.trackEvent(" + key + ', ' + JSON.stringify(obj) + ")");
                if (key === "EVENT_LEVELSTART" || key === "EVENT_LEVELRESTART") {
                    setTimeout(() => resolve(), 1000);
                } else {
                    resolve();
                }
            });
        },

        trackStats: (key, options, amount) => {
            log("[trackStats] " + key + " x" + (amount || 1) + " " + JSON.stringify(options || ""), "#FFFFFF", "#FF00FF");
        },
    };
};

/* Pause/resume handling */

pc.AppBase.prototype.pauseGame = function (ignoreVisibilityAPI) { //
    if (ignoreVisibilityAPI) this.ignoreVisibilityAPI = true;
    this.applicationPaused = true;
    this.soundVolumeBeforePaused = SoundController.masterVolume;
    this.fire('audio:setMasterVolume', 0);

    this.timeScale = 0;
    var inputBlocker = this.root.findByName("InputBlocker");
    if (inputBlocker) {
        inputBlocker.element.useInput = true;
    }
    famobi.log("Application:paused");
};

pc.AppBase.prototype.unpauseGame = function (forced) {
    if (isPageVisible && (!adIsShowing || forced)) {
        this.applicationPaused = false;
        this.ignoreVisibilityAPI = false;
        this.fire('audio:setMasterVolume', this.soundVolumeBeforePaused || SoundController.masterVolume || 1);

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

var game;
var isPageVisible = true;
var adIsShowing = false;

var isExternalStart = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("external_start");
};

var isExternalMute = function () {
    return typeof famobi !== "undefined" && famobi.hasFeature("external_mute");
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
    return isForcedMode() && getForcedModeProperties().state.endless_mode;
};

var getForcedModeProperties = function () {
    if (!famobi || typeof famobi === "undefined") return undefined;
    window._cachedForcedModeProperties = window._cachedForcedModeProperties || famobi.getFeatureProperties("forced_mode");
    return window._cachedForcedModeProperties;
};

var isUIHidden = function (uiKey) {
    return isForcedMode() && getForcedModeProperties() && getForcedModeProperties().override.hide_ui && getForcedModeProperties().override.hide_ui.indexOf(uiKey) !== -1;
};

var isBombPowerupEnabled = function () {
    return !isForcedMode() || getForcedModeProperties().state.powerup_bomb;
};


//famobi pause/resume requests
window.famobi_onPauseRequested = function () {
    console.warn('famobi_onPauseRequested');
    adIsShowing = true;
    if (game) {
        game.pauseGame();
    }
};

window.famobi_onResumeRequested = function () {
    console.warn('famobi_onResumeRequested');
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
            game.fire('audio:setVolumeMultiplier', 1);
        }
    });

    window.famobi.onRequest("disableAudio", function () {
        if (game) {
            game.fire('audio:setVolumeMultiplier', 0);
        }
    });
}


if (!famobi.hasFeature("external_focus")) {
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
            if (game && !adIsShowing && game.applicationPaused && !game.applicationFinished && !game.ignoreVisibilityAPI) game.unpauseGame();
        }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        console.log("Browser doesn't support the Page Visibility API.");
    } else {
        // Handle page visibility change
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    famobi.log("Window VisibilityAPI connected");

}


// worldController.js
/* jshint esversion: 6 */
var WorldController = pc.createScript('worldController');

WorldController.attributes.add('loadTestWorld', {
    title: 'Load test world',
    type: 'boolean',
    default: true
});

WorldController.attributes.add('testWorld', {
    title: 'Test world',
    type: 'entity'
});

WorldController.attributes.add('initialWorld', {
    title: 'Initial world',
    type: 'entity'
});

WorldController.prototype.initialize = function() {
    this.entity.children.forEach(child => child.enabled = true);
    this.entity.children.forEach(child => child.enabled = false); 
    
    this.app.on(EventTypes.CHANGE_WORLD, this.changeWorld, this);
};

WorldController.prototype.update = function(dt) {
    if(this._pendingFogParams) {
        if(!this.app.scene.fogColor.equals(this._pendingFogParams.fogColor)) {
            this.app.scene.fogColor.copy(this._pendingFogParams.fogColor);
            this.app.scene.fogStart = this._pendingFogParams.fogStart;
            this.app.scene.fogEnd = this._pendingFogParams.fogEnd;
            this.app.scene.skybox = this._pendingFogParams.skyCubeMap.resource;
            this._pendingFogParams = null;
        }          
    }
};

WorldController.prototype.updateCurrentWorld = function() {
     if(isForcedMode()) {
        const customTheme = getForcedModeProperties().state.theme;
        if(customTheme) {
            const world = this.entity.findByName(customTheme);
            if(world) {
                this.currentWorld = world;
                return;
            }
        }
    } 
    
    if(this.loadTestWorld) {
        this.currentWorld = this.testWorld;
    } else {
        if(!this.currentWorld && this.initialWorld) {
            this.currentWorld = this.initialWorld;
        } else {
            this.currentWorld = Utils.getRandomItem(this.entity.children.filter(child => child != this.currentWorld));
        }
    }
};

WorldController.prototype.changeWorld = function() {
    this.entity.children.forEach(world => world.enabled = false);
    
    this.updateCurrentWorld();
    
    this.currentWorld.enabled = true;
    const worldConfig = this.currentWorld.script.worldConfig;
    
    this._pendingFogParams = worldConfig;

    this.app.scene.fogColor.set(worldConfig.fogColor.r, worldConfig.fogColor.g, worldConfig.fogColor.b);
    this.app.scene.fogStart = worldConfig.fogStart;
    this.app.scene.fogEnd = worldConfig.fogEnd;
    this.app.scene.skybox = worldConfig.skyCubeMap.resource;
};

// worldConfig.js
var WorldConfig = pc.createScript('worldConfig');

WorldConfig.attributes.add('fogColor', {
    type: 'rgb'
});

WorldConfig.attributes.add('fogStart', {
    type: 'number',
    default: 40
});

WorldConfig.attributes.add('fogEnd', {
    type: 'number',
    default: 85
});

WorldConfig.attributes.add('skyCubeMap', {
    title: 'Sky cube map',
    type: 'asset',
    assetType: 'cubemap'
});

WorldConfig.prototype.initialize = function() {
    
};

WorldConfig.prototype.update = function(dt) {
    
};


// snowFlakesManager.js
/* jshint esversion: 6 */
var SnowFlakesManager = pc.createScript('snowFlakesManager');

SnowFlakesManager.attributes.add('cacheSize', {
    description: 'num snowflakes in cache',
    type: 'number',
    default: 150
});

SnowFlakesManager.attributes.add('frequency', {
    type: 'number',
    default: 40
});

SnowFlakesManager.attributes.add('positionX', {
    type: 'vec2',
    default: [-5, 25]
});

SnowFlakesManager.attributes.add('positionY', {
    type: 'vec2',
    default: [15, 16]
});

SnowFlakesManager.attributes.add('positionZ', {
    type: 'vec2',
    default: [8, 12]
});

SnowFlakesManager.attributes.add('speedX', {
    type: 'vec2',
    default: [-3, -2.8]
});

SnowFlakesManager.attributes.add('speedY', {
    type: 'vec2',
    default: [-1, -0.5]
});

SnowFlakesManager.attributes.add('speedZ', {
    type: 'vec2',
    default: [-0.1, 0.1]
});

SnowFlakesManager.attributes.add('gravity', {
    type: 'vec2',
    default: [-1.2, -0.8]
});

SnowFlakesManager.prototype.initialize = function() {
    this.elapsedSinceLastParticle = 0;
    this.snowFlakePrefabs = this.app.root.findByName('ObjectsPrefabs').findByName('SnowFlakes').children;
    this.snowFlakesCache = [];
    this.activeSnowflakes = [];
    this.prepareCache();
    // this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
    
    this.screenWidthFactor = 1;
    
    this.app.on(EventTypes.VIEWPORT_RESIZE, (width, height) => {
        this.screenWidthFactor = (this.app.graphicsDevice.width / this.app.graphicsDevice.height) / (720 / 1280);
    });
    
    this.app.on(EventTypes.QUALITY_CHANGED, () => {
        if(ScaleManager.qualityIndex == ScaleManager.QUALITY_HIGH) {
            this.activeSnowflakes.forEach(p => p.enabled = true);
        } else {
            this.activeSnowflakes.forEach(p => p.enabled = false);
        }
    });
};

SnowFlakesManager.prototype.reset = function() {
    for(let i = this.activeSnowflakes.length - 1; i > -1; i--) {
        this.resetSnowflake(this.activeSnowflakes[i]);
    }
};

SnowFlakesManager.prototype.update = function(dt) {
    if(ScaleManager.qualityIndex != ScaleManager.QUALITY_HIGH) {
        return;
    }
    this.generateSnowFlakes(dt);
    this.activeSnowflakes.forEach(child => this.updateChild(child, dt));    
};

SnowFlakesManager.prototype.generateSnowFlakes = function(dt) {
    if (this.elapsedSinceLastParticle >= 1 / this.frequency) {   
        for(let i = 0; i < Math.floor(this.elapsedSinceLastParticle * this.frequency); i++) {
            const posX = pc.math.random(this.positionX.x * this.screenWidthFactor, this.positionX.y * this.screenWidthFactor + Math.sqrt(Math.abs(this.positionY.x / this.speedY.y * 2 * this.gravity.x)) * 1.41);
            const posZ = pc.math.random(this.positionZ.x, this.positionZ.y);
            const posY = pc.math.random(this.positionY.x, this.positionY.y) - Math.min(posZ, 0);
            this.addSnowflake(posX, posY, posZ);
        }
        this.elapsedSinceLastParticle = 0;        
    } else {
        this.elapsedSinceLastParticle += dt;
    }
};

SnowFlakesManager.prototype.updateChild = function(child, dt) {
   child.translateLocal(child.speedX * dt, child.speedY * dt, child.speedZ * dt); 
   child.speedY += child.gravity * dt;
   if(child.getPosition().y <= 0) {
       child.completed = true;
       this.resetSnowflake(child);
   }
};

SnowFlakesManager.prototype.addSnowflake = function(x, y, z) {
    let particle;

    if(this.snowFlakesCache.length > 0) {
        particle = this.snowFlakesCache.splice(this.snowFlakesCache.length - 1, 1)[0];
    } else {
        particle = Utils.getRandomItem(this.snowFlakePrefabs).clone();
        this.entity.addChild(particle);
    }

    particle.enabled = true;
    particle.setPosition(x, y, z);
    particle.speedX = pc.math.random(this.speedX.x, this.speedX.y);
    particle.speedY = pc.math.random(this.speedY.x, this.speedY.y);
    particle.speedZ = pc.math.random(this.speedZ.x, this.speedZ.y);
    particle.gravity = pc.math.random(this.gravity.x, this.gravity.y);
    particle.completed = false;

    this.activeSnowflakes.push(particle);
};

SnowFlakesManager.prototype.resetSnowflake = function(snowflake) {
    const index = this.activeSnowflakes.indexOf(snowflake);
    if(index != -1) {
        this.activeSnowflakes.splice(index, 1);
    }
    snowflake.enabled = false;
    snowflake.setPosition(0, -50, 0);
    this.snowFlakesCache.push(snowflake);
};


SnowFlakesManager.prototype.prepareCache = function() {
    for (let i = 0; i < this.cacheSize; i++) {
        const snowFlakeParticle = Utils.getRandomItem(this.snowFlakePrefabs).clone();
        snowFlakeParticle.enabled = false;
        snowFlakeParticle.setPosition(0, -50, 0);
        const randomScale = pc.math.random(0.35, 0.75);
        snowFlakeParticle.setLocalScale(randomScale, randomScale, randomScale);
        this.entity.addChild(snowFlakeParticle);
        this.snowFlakesCache.push(snowFlakeParticle);
    }
};

// scaleManager.js
/* jshint esversion: 6 */
var ScaleManager = pc.createScript('scaleManager');

ScaleManager.QUALITY_LOW = 0;
ScaleManager.QUALITY_MEDIUM = 1;
ScaleManager.QUALITY_HIGH = 2;

ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
ScaleManager.qualityFactor = 1;
ScaleManager.screenRatio = 1;
ScaleManager.mobileLandscapeMode = false;

ScaleManager.SCREEN_RATIO_MIN = 9 / 16;
ScaleManager.SCREEN_RATIO_MAX = 4 / 3;


ScaleManager.attributes.add('desktopQuality', {
    title: "Desktop quality",
    type: 'number',
    array: true,
    default: [0.5, 0.75, 1]
});

ScaleManager.attributes.add('mobileQuality', {
    title: "Mobile quality",
    type: 'number',
    array: true,
    default: [0.75, 1, 2]
});

ScaleManager.attributes.add('uiScreen', {
    type: 'entity'
});


ScaleManager.attributes.add('scaleBlendPortrait', {
    type: 'number',
    default: 0.5
});

ScaleManager.attributes.add('mainLight', {
    type: 'entity'
});

ScaleManager.attributes.add('autoShadows', {
    type: 'boolean',
    default: true
});

ScaleManager.attributes.add('scaleBlendLandscape', {
    type: 'number',
    default: 0.75
});


ScaleManager.prototype.initialize = function () {
    if (pc.platform.mobile) {
        this.mobileQuality[2] = Math.max((window.devicePixelRatio || 1) * 0.75, 1);
        this.mobileQuality[2] = Math.min(2.5, window.devicePixelRatio || 1);
        this.qualityPresets = this.mobileQuality;
        ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
    } else {
        this.qualityPresets = this.desktopQuality;
        ScaleManager.qualityIndex = ScaleManager.QUALITY_HIGH;
    }

    this.app.on(EventTypes.QUALITY_NEXT, this.setNextQuality, this);
    this.app.on(EventTypes.QUALITY_UPDATE, this.resetQualitySettings, this);
    this.app.on('quality:decrease', this.decreaseQuality, this);

    this.app.on('famobi:resizeCanvas', this.resize, this);

    // if (window.visualViewport) {
    //     this.useVisualViewport = true;
    //     window.visualViewport.addEventListener('resize', this.resize.bind(this));
    // } else {
    //     this.useVisualViewport = false;
    //     window.addEventListener('resize', this.resize.bind(this), true);
    // }

    this.resetQualitySettings();
    this.resize();
};


ScaleManager.prototype.update = function (dt) {

};

ScaleManager.prototype.setNextQuality = function () {
    ScaleManager.qualityIndex = ((ScaleManager.qualityIndex || 0) + 1) % this.qualityPresets.length;
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.resize();
    this.app.fire(EventTypes.SAVE_APP);
};

ScaleManager.prototype.resetQualitySettings = function () {
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.resize();
};


ScaleManager.prototype.resize = function () {
    this.updateScreenSize();

    if (pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this.updateScreenSize(), 500);
    }
};

ScaleManager.prototype.decreaseQuality = function (qualityIndex) {
    if (ScaleManager.qualityIndex > qualityIndex) {
        famobi.log('decrease quality to #' + qualityIndex);
        ScaleManager.qualityIndex = qualityIndex;
        ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
        this.resize();
        this.app.fire(EventTypes.SAVE_APP);
    }
};


ScaleManager.prototype.updateScreenSize = function () {

    const famobiScreenSize = this.app.getFamobiAdjustedCanvasSize();

    const width = famobiScreenSize.width || (this.useVisualViewport ? window.visualViewport.width : window.innerWidth);
    const height = famobiScreenSize.height || (this.useVisualViewport ? window.visualViewport.height : window.innerHeight);
    const isLandscape = width > height;
    ScaleManager.qualityFactor = this.qualityPresets[ScaleManager.qualityIndex];
    this.app.graphicsDevice.maxPixelRatio = ScaleManager.qualityFactor;
    // this.app.graphicsDevice.resizeCanvas(Math.floor(width * ScaleManager.qualityFactor), Math.floor(height * ScaleManager.qualityFactor));


    ScaleManager.mobileLandscapeMode = false;
    ScaleManager.screenRatio = this.app.graphicsDevice.canvas.width / this.app.graphicsDevice.canvas.height;
    if (ScaleManager.screenRatio < ScaleManager.SCREEN_RATIO_MIN) {
        this.distance = GameplayController.cameraToTowerMinDistance;
    } else if (ScaleManager.screenRatio > ScaleManager.SCREEN_RATIO_MAX) {
        if (pc.platform.mobile) {
            ScaleManager.mobileLandscapeMode = true;
        }
    } else {

    }

    if (this.mainLight && this.autoShadows) {
        this.mainLight.light.castShadows = ScaleManager.qualityIndex === 2;
    }

    this.app.fire(EventTypes.QUALITY_CHANGED, ScaleManager.qualityIndex);
    this.app.fire(EventTypes.VIEWPORT_RESIZE, Math.floor(width * ScaleManager.qualityFactor), Math.floor(height * ScaleManager.qualityFactor));
    const targetScaleBlend = isLandscape ? this.scaleBlendLandscape : this.scaleBlendPortrait;
    if(this.uiScreen.screen.scaleBlend !== targetScaleBlend) {
        this.uiScreen.screen.scaleBlend = targetScaleBlend;
    }

    // this.app.root.findByName("DebugText").enabled = true;
    // this.app.root.findByName("DebugText").element.text = '' + ~~width + 'x' + ~~height + ' (' + ~~this.app.graphicsDevice.clientRect.width + 'x' + ~~this.app.graphicsDevice.clientRect.height + ')';

    // const uiScreen = this.app.root.findByName("UI Container");
    // if(uiScreen) {
    //     if(pc.platform.mobile) {
    //         uiScreen.screen.scaleBlend = 0.65;
    //     } else {
    //         uiScreen.screen.scaleBlend = 0.75;
    //     }    
    // }    
};



// fogConfig.js
/* jshint esversion: 6 */
var FogConfig = pc.createScript('fogConfig');

FogConfig.attributes.add('speed', {
    type: 'number',
    default: 0.8
});

FogConfig.attributes.add('spriteWidth', {
    type: 'number',
    default: 100
});

FogConfig.prototype.initialize = function() {
    
};

FogConfig.prototype.update = function(dt) {
    this.entity.children.forEach(child => {
        child.translateLocal(this.speed * dt, 0, 0);
        const position = child.getLocalPosition();
        if(this.speed > 0 && position.x > this.spriteWidth) {
            child.setLocalPosition(-this.spriteWidth, position.y, position.z);
        } else if(this.speed < 0 && position.x < -this.spriteWidth) {
             child.setLocalPosition(this.spriteWidth, position.y, position.z);
        }
    });
};

// settingsPanel.js
/* jshint esversion: 6 */
var SettingsPanel = pc.createScript('settingsPanel');

SettingsPanel.prototype.initialize = function () {

    this.entity.settingsPanelContainer = this.entity.findByName("SettingsPanelContainer");
    this.entity.buttonSettings = this.entity.findByName("ButtonSettings");
    this.entity.soundButtonsContainer = this.entity.settingsPanelContainer.findByName('SoundButtonsContainer');
    this.entity.buttonSoundOn = this.entity.settingsPanelContainer.findByName("ButtonSoundOn");
    this.entity.buttonSoundOff = this.entity.settingsPanelContainer.findByName("ButtonSoundOff");
    this.entity.qualityButtonsContainer = this.entity.settingsPanelContainer.findByName('QualityButtonsContainer');
    this.entity.buttonQualityLow = this.entity.settingsPanelContainer.findByName("ButtonQualityLow");
    this.entity.buttonQualityMedium = this.entity.settingsPanelContainer.findByName("ButtonQualityMedium");
    this.entity.buttonQualityHigh = this.entity.settingsPanelContainer.findByName("ButtonQualityHigh");

    this.entity.settingsPanelOpened = false;
    this.entity.soundButtonsContainer.setLocalPosition(0, 0, 0);
    this.entity.soundButtonsContainer.setLocalScale(0, 0, 0);
    this.entity.qualityButtonsContainer.setLocalPosition(0, 0, 0);
    this.entity.qualityButtonsContainer.setLocalScale(0, 0, 0);

    this.app.on(EventTypes.QUALITY_CHANGED, this.updateQualityButtons, this);
    this.app.on(EventTypes.AUDIO_STATE_CHANGED, this.updateAudioButtons, this);

    this.assignAction(this.entity.buttonQualityLow, this.rescalePressed, this);
    this.assignAction(this.entity.buttonQualityMedium, this.rescalePressed, this);
    this.assignAction(this.entity.buttonQualityHigh, this.rescalePressed, this);
    this.updateQualityButtons();

    this.assignAction(this.entity.buttonSoundOn, this.disableAudio, this);
    this.assignAction(this.entity.buttonSoundOff, this.enableAudio, this);
    this.updateAudioButtons(true);

    this.assignAction(this.entity.buttonSettings, this.toggleSettings, this);

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

SettingsPanel.prototype.assignAction = function (button, handler, handlerContext) {
    if (this.app.touch) {
        button.element.on('touchstart', handler, handlerContext);
    } if (this.app.mouse) {
        button.element.on('mousedown', handler, handlerContext);
    }
};


SettingsPanel.prototype.update = function (dt) {
    const autoQuality = useAutoQuality();
    const externalMute = isExternalMute();
    const settingsPanelPosition = this.entity.settingsPanelContainer.getLocalPosition();

    if (autoQuality && externalMute) {
        this.entity.buttonSettings.enabled = false;
        this.entity.qualityButtonsContainer.enabled = false;
        this.entity.soundButtonsContainer.enabled = false;
        settingsPanelPosition.y = this.getSettingPanelContainerY();
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    } else if (autoQuality) {
        this.entity.qualityButtonsContainer.enabled = false;
        this.entity.soundButtonsContainer.enabled = true;

        this.entity.soundButtonsContainer.setLocalPosition(0, -50, 0);
        this.entity.soundButtonsContainer.setLocalScale(1, 1, 1);
        this.entity.soundButtonsContainer.enabled = true;
        this.entity.buttonSettings.enabled = false;

        settingsPanelPosition.y = this.getSettingPanelContainerY();
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    } else if (externalMute) {
        this.entity.soundButtonsContainer.enabled = false;
        this.entity.qualityButtonsContainer.enabled = true;

        this.entity.qualityButtonsContainer.setLocalPosition(0, -50, 0);
        this.entity.qualityButtonsContainer.setLocalScale(1, 1, 1);
        this.entity.qualityButtonsContainer.enabled = true;
        this.entity.buttonSettings.enabled = false;

        settingsPanelPosition.y = this.getSettingPanelContainerY();
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    } else {
        this.entity.soundButtonsContainer.enabled = true;
        this.entity.qualityButtonsContainer.enabled = true;
        settingsPanelPosition.y = this.getSettingPanelContainerY();
        this.entity.settingsPanelContainer.setLocalPosition(settingsPanelPosition);
    }
};


SettingsPanel.prototype.getSettingPanelContainerY = function () {
    const autoQuality = useAutoQuality();
    const externalMute = isExternalMute();

    if (autoQuality || externalMute) {
        return 0;
    } else {
        return -50;
    }
};


SettingsPanel.prototype.rescalePressed = function () {
    this.app.fire(EventTypes.QUALITY_NEXT);
};

SettingsPanel.prototype.enableAudio = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:Audio:Unmute"
    });

    this.app.fire(EventTypes.ENABLE_AUDIO);
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent(window.famobi_analytics.EVENT_VOLUMECHANGE, {
            bgmVolume: 1,
            sfxVolume: 1
        });
    }
    this.app.fire(EventTypes.SAVE_APP);
};

SettingsPanel.prototype.disableAudio = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:General:Settings:Audio:Mute"
    });

    this.app.fire(EventTypes.DISABLE_AUDIO);
    if (window.famobi_analytics) {
        famobi_analytics.trackEvent(window.famobi_analytics.EVENT_VOLUMECHANGE, {
            bgmVolume: 0,
            sfxVolume: 0
        });
    }
    this.app.fire(EventTypes.SAVE_APP);
};

SettingsPanel.prototype.updateQualityButtons = function () {
    this.entity.buttonQualityLow.enabled = ScaleManager.qualityIndex === ScaleManager.QUALITY_LOW;
    this.entity.buttonQualityMedium.enabled = ScaleManager.qualityIndex === ScaleManager.QUALITY_MEDIUM;
    this.entity.buttonQualityHigh.enabled = ScaleManager.qualityIndex === ScaleManager.QUALITY_HIGH;
};

SettingsPanel.prototype.updateAudioButtons = function (dontSaveState) {
    this.entity.buttonSoundOn.enabled = SoundController.audioEnabled;
    this.entity.buttonSoundOff.enabled = !SoundController.audioEnabled;
};

SettingsPanel.prototype.toggleSettings = function () {
    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: this.entity.settingsPanelOpened ? "Button:General:Settings:Close" : "Button:General:Settings:Open"
    });


    this.entity.settingsPanelOpened = !this.entity.settingsPanelOpened;

    this.entity.buttonSettings.angle = this.entity.settingsPanelOpened ? 0 : 180;
    this.entity.buttonSettings.tween(this.entity.buttonSettings)
        .to({ angle: this.entity.settingsPanelOpened ? 180 : 0 }, 0.2, pc.SineInOut)
        .on('update', () => this.entity.buttonSettings.setLocalEulerAngles(0, 0, this.entity.buttonSettings.angle))
        .start();

    const soundButtonsContainerPosition = this.entity.soundButtonsContainer.getLocalPosition();
    this.entity.soundButtonsContainer.tween(this.entity.soundButtonsContainer.getLocalPosition())
        .to(new pc.Vec3(soundButtonsContainerPosition.x, this.entity.settingsPanelOpened ? -100 : 0, soundButtonsContainerPosition.z), 0.3, this.entity.settingsPanelOpened ? pc.QuinticOut : pc.CircularOut)
        .start();
    this.entity.soundButtonsContainer.tween(this.entity.soundButtonsContainer.getLocalScale())
        .to(this.entity.settingsPanelOpened ? new pc.Vec3(1, 1, 1) : new pc.Vec3(0, 0, 0), this.entity.settingsPanelOpened ? 0.3 : 0.12, this.entity.settingsPanelOpened ? pc.QuinticOut : pc.SineOut)
        .start();


    const qualityButtonsContainerPosition = this.entity.qualityButtonsContainer.getLocalPosition();
    this.entity.qualityButtonsContainer.tween(this.entity.qualityButtonsContainer.getLocalPosition())
        .to(new pc.Vec3(qualityButtonsContainerPosition.x, this.entity.settingsPanelOpened ? -200 : 0, qualityButtonsContainerPosition.z), 0.3, this.entity.settingsPanelOpened ? pc.QuinticOut : pc.CircularOut)
        .start();
    this.entity.qualityButtonsContainer.tween(this.entity.qualityButtonsContainer.getLocalScale())
        .to(this.entity.settingsPanelOpened ? new pc.Vec3(1, 1, 1) : new pc.Vec3(0, 0, 0), this.entity.settingsPanelOpened ? 0.3 : 0.15, this.entity.settingsPanelOpened ? pc.QuinticOut : pc.SineOut)
        .start();
};


// mainMenu.js
/* jshint esversion: 6 */
var MainMenu = pc.createScript('mainMenu');

MainMenu.prototype.initialize = function () {
    this.entity.headingContainer = this.entity.findByName("HeadingContainer");
    this.entity.headingIcon = this.entity.findByName("HeadingIcon");
    this.entity.handContainer = this.entity.findByName("HandContainer");
    this.entity.tutorialHand = this.entity.handContainer.findByName('TutorialHand');
    this.entity.clickZone = this.entity.handContainer.findByName('ClickZone');

    this.entity.clickZone.enabled = !skipTitleScreen();
    this.entity.handContainer.enabled = !skipTitleScreen();
    this.entity.headingIcon.enabled = !skipTitleScreen();

    this.app.on(EventTypes.PRELOADER_FINISHED, () => {
        if (!this.preloaderFinsihed) {
            this.preloaderFinsihed = true;
            this.assignAction(this.entity.clickZone, this.playPressed, this);
        }
    });

    /* show method */
    this.entity.show = function () {
        this.enabled = true;

        if (skipTitleScreen()) {
            this.clickZone.enabled = this.handContainer.enabled = this.headingIcon.enabled = false;
        }

        /* tween heading icon */
        this.headingIcon.element.opacity = 0.0;
        var headingAppearingTween =
            this.headingIcon.tween(this.headingIcon.element)
                .to({ opacity: 1.0 }, 0.5, pc.SineIn)
                .delay(0.1).start();

        this.headingContainer.setLocalScale(0.7, 0.7, 0.7);
        var headingAppearingScaleTween =
            this.headingContainer.tween(this.headingContainer.getLocalScale())
                .to(new pc.Vec3(1.2, 1.2, 1.2), 0.5, pc.BackOut)
                .delay(0.1).start();

        this.tutorialHand.tween(this.tutorialHand.getLocalScale())
            .to(new pc.Vec3(1.25, 1.25, 1.25), 0.55, pc.SineInOut)
            .yoyo(true)
            .repeat(100000)
            .start();

    }.bind(this.entity);


    /* hide method */
    this.entity.hide = function () {

        /* tween heading icon */
        this.headingIcon.element.opacity = 1.0;
        var headingAppearingTween =
            this.headingIcon.tween(this.headingIcon.element)
                .to({ opacity: 0.0 }, 0.35, pc.SineOut)
                .start();

        var position = this.headingIcon.getLocalPosition();
        this.headingIcon.tween(this.headingIcon.getLocalPosition())
            .to(new pc.Vec3(position.x, position.y + 50, position.z), 0.35, pc.SineIn)
            .start();

        this.tutorialHand.tween(this.tutorialHand.element)
            .to({ opacity: 0.0 }, 0.25, pc.Linear)
            .on('complete', () => {
                this.enabled = false;
            })
            .start();

    }.bind(this.entity);


    this.entity.show();
};

MainMenu.prototype.update = function (dt) {
    if (skipTitleScreen()) {
        this.entity.clickZone.enabled = this.entity.handContainer.enabled = this.entity.headingIcon.enabled = false;
    }
};

MainMenu.prototype.assignAction = function (button, handler, handlerContext) {
    if (this.app.touch) {
        button.element.on('touchstart', handler, handlerContext);
    }
    if (this.app.mouse) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

MainMenu.prototype.playPressed = function () {
    this.entity.clickZone.enabled = false;
    WindowManager.startGameplay();
    this.app.fire(EventTypes.PLAY_PRESSED);

    window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
        eventName: "GA:Design",
        eventId: "Button:MainMenu:TapToPlay"
    });
};


// levelUI.js
var LevelUi = pc.createScript('levelUi');

LevelUi.prototype.initialize = function() {
    
    this.entity.progressVertical = this.entity.findByName('LevelProgressVertical');
    this.entity.progressHorizontal = this.entity.findByName('LevelProgressHorizontal');
    this.entity.powerupContainer = this.entity.findByName('PowerupContainer');
    
    this.entity.show = function() {
        this.progressVertical.show();
        this.progressHorizontal.show();
        this.powerupContainer.show();
    }.bind(this.entity);
    
    this.entity.hide = function() {
        this.progressVertical.hide();
        this.progressHorizontal.hide();
        this.powerupContainer.hide();
    }.bind(this.entity);
};


LevelUi.prototype.update = function(dt) {
    
};



// brandingImage.js
var BrandingImage = pc.createScript('brandingImage');


BrandingImage.prototype.initialize = function() {
    
    this.entity.element.opacity = 0.0;
    
    if(window.famobi) {
        
        var self = this;
        this.app.loader.getHandler("texture").crossOrigin = "anonymous";

        var asset = new pc.Asset("brandingImage", "texture", {
            url: window.famobi.getBrandingButtonImage()
        });

        this.app.assets.add(asset);

        asset.on("error", function (message) {
            famobi.log("Branding image loading failed: ", message);
        });

        asset.on("load", function (asset) {
            var material = self.entity.element.texture = asset.resource;
            self.entity.element.opacity = 1;
            self.assignAction(self.entity, self.brandingPressed, self);
        });

        this.app.assets.load(asset);
    }
};

BrandingImage.prototype.assignAction = function(button, handler, handlerContext) {
     if(this.app.touch) {
         button.element.on('touchstart', handler, handlerContext);
     } 
     if(this.app.mouse) {
          button.element.on('mousedown', handler, handlerContext);
     }
};

BrandingImage.prototype.update = function(dt) {
    
};

BrandingImage.prototype.brandingPressed = function() {
    console.error('Branding!!!');
    if(window.famobi) {
        window.famobi.openBrandingLink();
    }
};


// scoresEffectManager.js
/* jshint esversion: 6 */
var ScoresEffectManager = pc.createScript('scoresEffectManager');

ScoresEffectManager.attributes.add('cacheSize', {
    description: 'num scores in cache',
    type: 'number',
    default: 15
});

ScoresEffectManager.attributes.add('maxScoresOnScreen', {
    description: 'max scores on screen',
    type: 'number',
    default: 15
});

ScoresEffectManager.attributes.add('scoresEarnedText', {
    type: 'entity'
});

ScoresEffectManager.prototype.initialize = function () {
    this.mainCamera = this.app.root.findByName('Camera');
    this.particleCache = [];
    this.activeParticles = [];
    this.prepareCache();
    this.app.on(EventTypes.SHOW_SCORES_EFFECT, this.addScoresEffect, this);
    this.app.on(EventTypes.LEVEL_RESET, this.reset, this);
};

ScoresEffectManager.prototype.reset = function () {
    for (let i = this.activeParticles.length - 1; i > -1; i--) {
        this.resetParticle(this.activeParticles[i]);
    }
};

ScoresEffectManager.prototype.update = function (dt) {
    this.activeParticles.forEach(particle => this.updateParticle(particle, dt));
};

ScoresEffectManager.prototype.updateParticle = function (particle, dt) {
    particle.lifeTime += dt;
    if (particle.lifeTime >= particle.duration) {
        this.resetParticle(particle);
    }
};

ScoresEffectManager.prototype.addScoresEffect = function (value, position) {
    if (position.z > this.mainCamera.getPosition().z - 5) {
        return;
    }
    if (this.activeParticles.length > this.maxScoresOnScreen) {
        this.resetParticle(this.activeParticles[0]);
    }
    this.addParticle(value, position);
};

ScoresEffectManager.prototype.addParticle = function (value, position) {
    if (isUIHidden("floating_score_points")) {
        return;
    }

    let particle;

    if (this.particleCache.length > 0) {
        particle = this.particleCache.splice(this.particleCache.length - 1, 1)[0];
    } else {
        particle = this.scoresEarnedText.clone();
        this.entity.addChild(particle);
    }


    if (particle.scaleTween && particle.scaleTween.playing) {
        particle.scaleTween.stop();
    }

    if (particle.positionTween && particle.positionTween.playing) {
        particle.positionTween.stop();
    }

    if (particle.opacityTween && particle.opacityTween.playing) {
        particle.opacityTween.stop();
    }

    particle.enabled = true;
    particle.completed = false;
    particle.element.text = '+' + value;
    particle.element.opacity = 0.9;
    particle.setPosition(position.x, position.y + 0.4, position.z + 1);
    particle.setLocalScale(0.02 + pc.math.clamp(value, 1, 20) * 0.0004, 0.02 + pc.math.clamp(value, 1, 20) * 0.0004, 0.02 + pc.math.clamp(value, 1, 20) * 0.0004);
    particle.duration = 0.85;
    particle.lifeTime = 0;

    particle.positionTween = particle.tween(particle.getLocalPosition())
        .to(new pc.Vec3(position.x, position.y + 2.0, position.z + 2), particle.duration - 0.15, pc.SineIn)
        .delay(0.15)
        .start();

    particle.scaleTween = particle.tween(particle.getLocalScale())
        .from(new pc.Vec3(0, 0, 0), 0.35, pc.BackOut)
        .start();

    particle.opacityTween = particle.tween(particle.element)
        .to({ opacity: 0 }, particle.duration * 0.98, pc.SineIn)
        .start();

    this.activeParticles.push(particle);
};


ScoresEffectManager.prototype.resetParticle = function (particle) {
    const index = this.activeParticles.indexOf(particle);
    if (index != -1) {
        this.activeParticles.splice(index, 1);
    }
    particle.enabled = false;
    particle.setPosition(0, -50, 0);
    this.particleCache.push(particle);
};


ScoresEffectManager.prototype.prepareCache = function () {
    this.particleCache = [];
    const basicParticle = this.scoresEarnedText;
    for (let i = 0; i < this.cacheSize; i++) {
        const particle = basicParticle.clone();
        particle.enabled = false;
        particle.setPosition(0, -50, 0);
        particle.completed = true;
        this.entity.addChild(particle);
        this.particleCache.push(particle);
    }
};

// groupConfig.js
var GroupConfig = pc.createScript('groupConfig');

GroupConfig.attributes.add('rotation', {
    type: 'number',
    default: 0,
    min: -180,
    max: 180
});


GroupConfig.prototype.initialize = function() {
    
};


GroupConfig.prototype.update = function(dt) {
    
};

// powerupContainer.js
/* jshint esversion: 6 */
var PowerupContainer = pc.createScript('powerupContainer');

PowerupContainer.attributes.add('buttonMaxHeight', { type: 'number', default: 145 });

PowerupContainer.prototype.initialize = function () {

    /* powerup activation via MonkeyGames App */
    window.famobi.activatePowerUp = (pPowerUp) => {
        return new Promise((resolve, reject) => {
            if (pPowerUp != 'bomb') {
                reject();
            } else {
                this.app.fire(EventTypes.POWERUP_ACTIVATED);
                resolve(pPowerUp);
            }
        });
    };

    this.entity.powerupGreyed = this.entity.findByName('PowerupGreyed');
    this.entity.powerupActive = this.entity.findByName('PowerupActive');
    this.entity.powerupProgress = this.entity.findByName('PowerupProgress');
    this.entity.powerupHighlighted = this.entity.findByName('PowerupHighlighted');
    this.entity.buttonGetForFree = this.entity.findByName('ButtonGetForFree');

    this.app.on(EventTypes.UPDATE_POWERUP_PROGRESS, this.updateProgress, this);
    this.app.on(EventTypes.RESET_POWERUP_PROGRESS, this.reset, this);
    this.app.on(EventTypes.STAGE_LOADED, this.updateRewardedVideoButton, this);
    this.app.on(EventTypes.VIEWPORT_RESIZE, this.onViewportResized, this);
    this.assignAction(this.entity.powerupHighlighted, this.usePowerupPressed, this);
    this.assignAction(this.entity.buttonGetForFree, this.watchVideoPressed, this);

    this.entity.buttonGetForFree.enabled = false;
    this.lastRewardedVideoTimestamp = 0;

    const scriptContext = this;

    this.entity.powerupHighlighted.setLocalScale(1.175, 1.175, 1.175);
    this.entity.powerupHighlighted.tween(this.entity.powerupHighlighted.getLocalScale())
        .to(new pc.Vec3(1.3, 1.3, 1.3), 0.22, pc.Linear)
        .yoyo(true)
        .repeat(1000000)
        .start();


    this.entity.show = function () {
        this.enabled = true;
        this.setLocalScale(0, 0, 0);
        this.tween(this.getLocalScale())
            .to(scriptContext.getScale(), 0.4, pc.BackOut)
            .delay(0.5)
            .start();
    }.bind(this.entity);

    this.entity.hide = function () {
        this.enabled = false;
    }.bind(this.entity);

    this.reset();

    this.entity.enabled = false;
};

PowerupContainer.prototype.onViewportResized = function (width, height) {
    this.entity.setLocalScale(this.getScale());
};

PowerupContainer.prototype.getScale = function () {
    if (ScaleManager.screenRatio < 1) {
        return new pc.Vec3(1.3, 1.3, 1.3);
    } else {
        return new pc.Vec3(1.15, 1.15, 1.15);
    }
}

PowerupContainer.prototype.reset = function () {
    this.entity.currentProgressValue = 0;
    if (this.progressTween && this.progressTween.playing) {
        this.progressTween.stop();
    }
    this.progressTween = this.entity.tween(this.entity)
        .to({ currentProgressValue: pc.math.clamp(0, 0, 1) }, 0.25, pc.SineOut)
        .start();
};

PowerupContainer.prototype.updateProgress = function (value) {
    if (!isBombPowerupEnabled()) {
        return;
    }
    if (value > this.entity.currentProgressValue) {
        this.progressTween = this.entity.tween(this.entity)
            .to({ currentProgressValue: pc.math.clamp(value, 0, 1) }, 0.15, pc.SineOut)
            .on('complete', () => {
                if (this.entity.currentProgressValue === 1) {
                    this.app.fire(EventTypes.PLAY_AUDIO, 'powerUpLoaded');
                }
            })
            .start();
    }
};

PowerupContainer.prototype.update = function (dt) {
    if (!isBombPowerupEnabled()) {
        this.entity.enabled = false;
    }

    if (this.entity.currentProgressValue < 1) {
        this.entity.powerupHighlighted.enabled = false;
        this.entity.powerupGreyed.enabled = true;
        this.entity.powerupActive.enabled = true;
        this.entity.powerupProgress.enabled = true;

        var height = pc.math.lerp(0, this.buttonMaxHeight, this.entity.currentProgressValue * 0.75);
        this.entity.powerupActive.element.rect.w = this.entity.currentProgressValue * 0.75;
        this.entity.powerupActive.element.height = height;

        this.entity.powerupProgress.element.text = '' + Math.floor(pc.math.clamp(this.entity.currentProgressValue, 0, 1) * 100) + '%';

    } else {
        this.entity.powerupHighlighted.enabled = true;
        this.entity.powerupGreyed.enabled = false;
        this.entity.powerupActive.enabled = false;
        this.entity.powerupProgress.enabled = false;
    }

    this.updateRewardedVideoButton();
};


PowerupContainer.prototype.assignAction = function (button, handler, handlerContext) {
    if (this.app.touch) {
        button.element.on('touchstart', handler, handlerContext);
    }
    if (this.app.mouse) {
        button.element.on('mousedown', handler, handlerContext);
    }
};

PowerupContainer.prototype.updateRewardedVideoButton = function () {
    if (this.entity.currentProgressValue < 1 && Apicontroller.hasRewardedVideo() && new Date().getTime() - this.lastRewardedVideoTimestamp > 60000) {
        this.entity.buttonGetForFree.enabled = true;
    } else {
        this.entity.buttonGetForFree.enabled = false;
    }
};

PowerupContainer.prototype.watchVideoPressed = function () {
    if (this.app.applicationPaused) {
        return;
    }

    this.lastRewardedVideoTimestamp = new Date().getTime();
    this.updateRewardedVideoButton();
    Apicontroller.showRewardedVideo((result) => {
        if (result && result.rewardGranted) {
            this.app.fire(EventTypes.POWERUP_GET_FOR_FREE);
        }
    });
};

PowerupContainer.prototype.usePowerupPressed = function () {
    if (this.app.applicationPaused) {
        return;
    }

    if (this.entity.currentProgressValue >= 1) {
        this.lastRewardedVideoTimestamp = new Date().getTime();
        this.app.fire(EventTypes.POWERUP_ACTIVATED);
        GameplayController.currentSession.usedPowerups.push('Bomb');
        this.entity.currentProgressValue = 0;

        window.famobi_analytics.trackEvent("EVENT_CUSTOM", {
            eventName: "GA:Design",
            eventId: "Button:Level:BombPowerup:Activate"
        });
    }
    this.updateRewardedVideoButton();
};


// copyrightText.js
var CopyrightText = pc.createScript('copyrightText');

CopyrightText.prototype.initialize = function() {
    
};

CopyrightText.prototype.update = function(dt) {
    if(!isCopyrightEnabled()) {
        this.entity.enabled = false;
    }
};


// tumbleweed.js
var Tumbleweed = pc.createScript('tumbleweed');


Tumbleweed.attributes.add('speed', {
    type: 'number',
    default: 1,
    min: 0,
    max: 20
});

Tumbleweed.attributes.add('cutoffX', {
    type: 'number',
    default: 25
});

Tumbleweed.attributes.add('radius', {
    type: 'number',
    default: 1.65
});

Tumbleweed.attributes.add('swingSpeed', {
    type: 'vec2',
    default: [4, 6]
});

Tumbleweed.attributes.add('swingHeight', {
    type: 'number',
    default: 0.75
});

Tumbleweed.prototype.initialize = function() {
    this.elapsedTime = pc.math.random(0, 2 * Math.PI);
    this.initialY = this.entity.getLocalPosition().y;
    this.sineSpeed = pc.math.random(this.swingSpeed.x, this.swingSpeed.y);
};

Tumbleweed.prototype.update = function(dt) {
    this.elapsedTime += dt;
    
    const localPosition = this.entity.getLocalPosition();
    localPosition.x += this.speed * dt;
    if(localPosition.x > this.cutoffX) {
        localPosition.x -= 2 * this.cutoffX;
    }

    localPosition.y = this.initialY + (Math.sin(this.elapsedTime * this.sineSpeed) + 0.5) * this.swingHeight;

    this.entity.setLocalPosition(localPosition);

    this.entity.rotateLocal(0, 0, -this.speed * dt * 360 / (2 * Math.PI * this.radius));
};

// textureTiling.js
var TextureTiling = pc.createScript('textureTiling');

TextureTiling.attributes.add('setNonUniformTiling', {
    type: 'boolean',
    title: 'Reset tiling (1 -> 1.001)',
    default: true
});


TextureTiling.attributes.add('tilingFactors', {
    type: 'vec3',
    title: 'Adjust tiling by axis',
    default: [1, 1, 1]
});

TextureTiling.attributes.add('affectedMaps', {
    type: 'json',
    title: 'Affected maps',
    schema: [{
        name: "diffuse",
        type: 'boolean',
        default: true
    }, {
        name: "emissive",
        type: 'boolean',
        default: true
    }, {
        name: "opacity",
        type: 'boolean',
        default: true
    }, {
        name: "normal",
        type: 'boolean',
        default: true
    }, {
        name: "light",
        type: 'boolean',
        default: true
    },
    ]
});


TextureTiling.prototype.initialize = function () {

    if (this.setNonUniformTiling) {
        this.resetMaterialTiling();
    }

    this.on('attr', this.setTiling, this);
    this.setTiling();
};

TextureTiling.prototype.resetMaterialTiling = function () {
    const mapNames = Object.keys(this.affectedMaps);
    this.entity.render.meshInstances.forEach(mi => {
        mapNames.forEach(mapName => {
            if (mi.material[`${mapName}MapTiling`].x === 1 && mi.material[`${mapName}MapTiling`].y === 1) {
                // console.error('Please set custom offset and tiling values for "' + mapName + '" property on material ' + mi.material.name + '  assingned to ' + this.entity.path);
                mi.material[`${mapName}MapTiling`].x += 0.001;
                mi.material[`${mapName}MapTiling`].y += 0.001;
                mi.material.update();
            }
        })
    });
}


TextureTiling.prototype.setTiling = function () {
    const localScale = this.entity.getLocalScale();

    this.xTiling = localScale.x * this.tilingFactors.x;
    this.yTIling = localScale.y * this.tilingFactors.y;
    this.zTiling = localScale.z * this.tilingFactors.z;

    for (let meshIndex = 0; meshIndex < this.entity.render.meshInstances.length; meshIndex++) {   
        const mapNames = Object.keys(this.affectedMaps);
        mapNames.forEach(mapName => {
            if(this.affectedMaps[mapName]) {


                const materialOffset =  this.entity.render.meshInstances[meshIndex].material[`${mapName}MapOffset`];
                const materialTiling =  this.entity.render.meshInstances[meshIndex].material[`${mapName}MapTiling`];
                const parameterValue0 =  this.entity.render.meshInstances[meshIndex].getParameter("texture_" + mapName + "MapTransform0")?.data;
                const parameterValue1 =  this.entity.render.meshInstances[meshIndex].getParameter("texture_" + mapName + "MapTransform1")?.data;

                let uniform0 =  parameterValue0 || [materialTiling.x, 0, materialOffset.x];
                let uniform1 = parameterValue1 || [0, materialTiling.y, materialOffset.y];

                if (meshIndex == 1) {  //left-right
                    uniform0[0] = this.zTiling;
                    uniform1[1] = this.yTIling;
                    // uniform0 = [this.zTiling, 0, 0];
                    // uniform1 = [0, this.yTIling, 0];
                } else if (meshIndex == 2) { //front-back
                   uniform0[0] = this.xTiling;
                    uniform1[1] = this.yTIling;
                    // uniform0 = [this.xTiling, 0, 0];
                    // uniform1 = [0, this.yTIling, 0];
                } else if (meshIndex == 0) {  //up-down
                    uniform0[0] = this.xTiling;
                    uniform1[1] = this.zTiling;
                    // uniform0 = [this.xTiling, 0, 0];
                    // uniform1 = [0, this.zTiling, 0];
                }
      
                this.entity.render.meshInstances[meshIndex].setParameter("texture_" + mapName + "MapTransform0", uniform0);
                this.entity.render.meshInstances[meshIndex].setParameter("texture_" + mapName + "MapTransform1", uniform1);
            }
        })

        // if (changeDiffuseColor && diffuseColor) {
        //     this.entity.render.meshInstances[meshIndex].setParameter("material_diffuse", [diffuseColor.r, diffuseColor.g, diffuseColor.b]);
        // }

    }
};

TextureTiling.prototype.update = function (dt) {

};


// textureOffset.js
var TextureOffset = pc.createScript('textureOffset');

TextureOffset.attributes.add('resetMaterialOffset', {
    type: 'boolean',
    title: 'Reset offset (0 -> 0.001)',
    default: true
});



TextureOffset.attributes.add('affectedMaps', {
    type: 'json',
    title: 'Affected maps',
    schema: [{
        name: "diffuse",
        type: 'boolean',
        default: true
    }, {
        name: "emissive",
        type: 'boolean',
        default: true
    }, {
        name: "opacity",
        type: 'boolean',
        default: true
    }, {
        name: "normal",
        type: 'boolean',
        default: true
    }, {
        name: "light",
        type: 'boolean',
        default: true
    },
    ]
});



TextureOffset.prototype.initialize = function() {
    if(this.resetMaterialOffset) {
        this.setNonUniformOffset();
    }

    this.offsetValueX = Math.random();
    this.offsetValueY = Math.random();

    // this.entity.render.meshInstances.forEach(mi => {
    //     mi.material = mi.material.clone();
    //     mi.material.diffuseMapOffset = new pc.Vec2(this.offsetValueX, this.offsetValueY);
    // })

    this.setRandomOffset();
};

TextureOffset.prototype.setNonUniformOffset = function () {
    const mapNames = Object.keys(this.affectedMaps);
    this.entity.render.meshInstances.forEach(mi => {
        mapNames.forEach(mapName => {
            if (mi.material[`${mapName}MapOffset`].x === 0 && mi.material[`${mapName}MapOffset`].y === 0) {
                mi.material[`${mapName}MapOffset`].x += 0.001;
                mi.material[`${mapName}MapOffset`].y += 0.001;
                mi.material.update();
            }
        })
    });
}

TextureOffset.prototype.setRandomOffset = function() {
    for (let meshIndex = 0; meshIndex < this.entity.render.meshInstances.length; meshIndex++) {

        const mapNames = Object.keys(this.affectedMaps);
        mapNames.forEach(mapName => {
            if(this.affectedMaps[mapName]) {
                const materialOffset =  this.entity.render.meshInstances[meshIndex].material[`${mapName}MapOffset`];
                const materialTiling =  this.entity.render.meshInstances[meshIndex].material[`${mapName}MapTiling`];
                const parameterValue0 =  this.entity.render.meshInstances[meshIndex].getParameter("texture_" + mapName + "MapTransform0")?.data;
                const parameterValue1 =  this.entity.render.meshInstances[meshIndex].getParameter("texture_" + mapName + "MapTransform1")?.data;

                let uniform0 = parameterValue0 || [materialTiling.x, 0, materialOffset.x];
                let uniform1 = parameterValue1 || [0, materialTiling.y, materialOffset.y];

                uniform0[2] = this.offsetValueX;
                uniform1[2] = this.offsetValueY;

                this.entity.render.meshInstances[meshIndex].setParameter("texture_" + mapName + "MapTransform0", uniform0);
                this.entity.render.meshInstances[meshIndex].setParameter("texture_" + mapName + "MapTransform1", uniform1);
            }
        });
    }
};


TextureOffset.prototype.update = function(dt) {

};


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
    this.debugText = HierarchyManager.getInstance().getByPath('UIContainer/DebugText');

    this.on('attr:debugOutput', this._switchDebugTextVisibility, this);
    this._switchDebugTextVisibility();

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

    this.app.fire('performance:averageFPS', averageFPS);
    if (this.debugOutput && this.debugText.enabled) {
        this.debugText.element.text = `${averageFPS.toFixed(1)} FPS, frames ${this.frameTimes.length}, fps-samples ${this.lastFPSMeasurements.length}`;
    }

    /* adjust shadows */
    if(this.autoAdjustQuality) {
        if(averageFPS < this.minAcceptableFPS) {
            if(ScaleManager.qualityIndex === 2 && !this.decreasedToMedium) {
                this.decreasedToMedium = true;      
                this.app.fire('quality:decrease', 1);
            } else if(ScaleManager.qualityIndex === 1 && !this.decreasedToLow) {
                this.decreasedToLow = true;      
                this.app.fire('quality:decrease', 0);
            }
        } 
    }

    this.frameTimes.splice(0, this.frameTimes.length);
};




/* private */
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
})

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

    if(window.famobi && typeof window.famobi.onOffsetChange === 'function') {
        window.famobi.onOffsetChange(offsets => this._onCanvasResize());
    }

    /** viewport resize handling **/
    if(window.visualViewport) {
        this.useVisualViewport = true;
        window.visualViewport.addEventListener('resize', this._onCanvasResize.bind(this));
    } else {
        this.useVisualViewport = false;
        window.addEventListener('resize', this._onCanvasResize.bind(this), true);
    }

    this._onCanvasResize();

    this.app.getFamobiAdjustedCanvasSize = () => {
        return {
            width:  this._currentCanvasWidth,
            height: this._currentCanvasHeight
        }
    }

};

FamobiSafeArea.prototype._onCanvasResize = function () {
    this._updateCanvasSizeAndPosition();

    /* known issue on iOS - window.resize may report incorrect window size, so we slightly delay the resize logic */
    if(pc.platform.ios || pc.platform.mobile) {
        setTimeout(() => this._updateCanvasSizeAndPosition(), 1500);    
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
        let famobiOffsets = {left: 0, top: 0, right: 0, bottom: 0};
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

    leftPixels = Math.min(screenResWidth * 0.9, leftPixels);
    rightPixels = Math.min(screenResWidth * 0.9, rightPixels);
    topPixels = Math.min(screenResHeight * 0.9, topPixels);
    bottomPixels = Math.min(screenResHeight * 0.9, bottomPixels);

    const availableWidth = screenResWidth - leftPixels - rightPixels;
    const availableHeight = screenResHeight - topPixels - bottomPixels;

    this._currentCanvasWidth = availableWidth;
    this._currentCanvasHeight = availableHeight;

    this.app.setCanvasResolution(pc.RESOLUTION_FIXED, availableWidth, availableHeight);
    this.app.graphicsDevice.canvas.style.width = availableWidth + 'px';
    this.app.graphicsDevice.canvas.style.height = availableHeight + 'px';

    this.app.graphicsDevice.canvas.style.left = leftPixels + 'px';
    this.app.graphicsDevice.canvas.style.right = rightPixels + 'px';
    this.app.graphicsDevice.canvas.style.top = topPixels + 'px';
    this.app.graphicsDevice.canvas.style.bottom = bottomPixels + 'px';

    if(this.debugConfig.enabled) {
        console.log(`Canvas size set to ${availableWidth}x${availableHeight} (window ${window.innerWidth}x${window.innerHeight})`);
    }

    this.app.fire('famobi:resizeCanvas', availableWidth, availableHeight);

    this._backgroundColorUpdate();
};

FamobiSafeArea.prototype._backgroundColorUpdate = function() {
    if(!this.forceBodyBackgroundColor) return;
    const parentElement =   this.app.graphicsDevice.canvas.parentElement;
    if(parentElement) {
        parentElement.style.backgroundColor = this.bodyBackgroundColor.toString();
    }
}


FamobiSafeArea.prototype.update = function (dt) {

};


/** Fix for camera/input **/

pc.CameraComponent.prototype.screenToWorld = function(screenx, screeny, cameraz, worldCoord) {
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


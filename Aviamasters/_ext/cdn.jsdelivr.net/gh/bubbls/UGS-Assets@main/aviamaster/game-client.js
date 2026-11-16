var Df = Te => {
  throw TypeError(Te)
};
var ha = (Te, Pe, J) => Pe.has(Te) || Df("Cannot " + J);
var _ = (Te, Pe, J) => (ha(Te, Pe, "read from private field"), J ? J.call(Te) : Pe.get(Te)),
  q = (Te, Pe, J) => Pe.has(Te) ? Df("Cannot add the same private member more than once") : Pe instanceof WeakSet ? Pe.add(Te) : Pe.set(Te, J),
  W = (Te, Pe, J, Ct) => (ha(Te, Pe, "write to private field"), Ct ? Ct.call(Te, J) : Pe.set(Te, J), J),
  le = (Te, Pe, J) => (ha(Te, Pe, "access private method"), J);
var Oi = (Te, Pe, J, Ct) => ({
  set _(wt) {
    W(Te, Pe, wt, J)
  },
  get _() {
    return _(Te, Pe, Ct)
  }
});
(function() {
  "use strict";
  var nr, Nn, Pr, Ef, Lr, Dn, kr, Tf, rr, Cf, Rr, Nr, xt, sr, ze, Ts, ir, kt, pn, Sf, Qt, Of, Gt, st, or, qt, Bn, Af, un, Rt, Cs, If, Ae, Mn, Fn, Dr, Mr, $n, Fr, $r, Pf, ut, ae, Ss, it, ar, Ur, Un, jn, Os, jr, Vr, lr, cr, Vn, Wr, de, Ps, ga, ma, wa, ba, va, ya, _a, Mf, Lf, kf;
  var Te = document.createElement("style");
  Te.textContent = `#plate-widget *,#plate-widget :before,#plate-widget :after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }#plate-widget ::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }#plate-widget *,#plate-widget :before,#plate-widget :after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}#plate-widget :before,#plate-widget :after{--tw-content: ""}#plate-widget,#plate-widget :host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}#plate-widget{margin:0;line-height:inherit}#plate-widget hr{height:0;color:inherit;border-top-width:1px}#plate-widget abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}#plate-widget h1,#plate-widget h2,#plate-widget h3,#plate-widget h4,#plate-widget h5,#plate-widget h6{font-size:inherit;font-weight:inherit}#plate-widget a{color:inherit;text-decoration:inherit}#plate-widget b,#plate-widget strong{font-weight:bolder}#plate-widget code,#plate-widget kbd,#plate-widget samp,#plate-widget pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}#plate-widget small{font-size:80%}#plate-widget sub,#plate-widget sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}#plate-widget sub{bottom:-.25em}#plate-widget sup{top:-.5em}#plate-widget table{text-indent:0;border-color:inherit;border-collapse:collapse}#plate-widget button,#plate-widget input,#plate-widget optgroup,#plate-widget select,#plate-widget textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}#plate-widget button,#plate-widget select{text-transform:none}#plate-widget button,#plate-widget input:where([type=button]),#plate-widget input:where([type=reset]),#plate-widget input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}#plate-widget :-moz-focusring{outline:auto}#plate-widget :-moz-ui-invalid{box-shadow:none}#plate-widget progress{vertical-align:baseline}#plate-widget ::-webkit-inner-spin-button,#plate-widget ::-webkit-outer-spin-button{height:auto}#plate-widget [type=search]{-webkit-appearance:textfield;outline-offset:-2px}#plate-widget ::-webkit-search-decoration{-webkit-appearance:none}#plate-widget ::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}#plate-widget summary{display:list-item}#plate-widget blockquote,#plate-widget dl,#plate-widget dd,#plate-widget h1,#plate-widget h2,#plate-widget h3,#plate-widget h4,#plate-widget h5,#plate-widget h6,#plate-widget hr,#plate-widget figure,#plate-widget p,#plate-widget pre{margin:0}#plate-widget fieldset{margin:0;padding:0}#plate-widget legend{padding:0}#plate-widget ol,#plate-widget ul,#plate-widget menu{list-style:none;margin:0;padding:0}#plate-widget dialog{padding:0}#plate-widget textarea{resize:vertical}#plate-widget input::-moz-placeholder,#plate-widget textarea::-moz-placeholder{opacity:1;color:#9ca3af}#plate-widget input::placeholder,#plate-widget textarea::placeholder{opacity:1;color:#9ca3af}#plate-widget button,#plate-widget [role=button]{cursor:pointer}#plate-widget :disabled{cursor:default}#plate-widget img,#plate-widget svg,#plate-widget video,#plate-widget canvas,#plate-widget audio,#plate-widget iframe,#plate-widget embed,#plate-widget object{display:block;vertical-align:middle}#plate-widget img,#plate-widget video{max-width:100%;height:auto}#plate-widget [hidden]:where(:not([hidden=until-found])){display:none}#plate-widget .pointer-events-none{pointer-events:none}#plate-widget .pointer-events-auto{pointer-events:auto}#plate-widget .\\!visible{visibility:visible!important}#plate-widget .visible{visibility:visible}#plate-widget .fixed{position:fixed}#plate-widget .absolute{position:absolute}#plate-widget .relative{position:relative}#plate-widget .-left-2\\.5{left:-.625rem}#plate-widget .-right-2\\.5{right:-.625rem}#plate-widget .-top-1\\.5{top:-.375rem}#plate-widget .bottom-2{bottom:.5rem}#plate-widget .left-0{left:0}#plate-widget .left-1\\/2{left:50%}#plate-widget .right-0{right:0}#plate-widget .right-2{right:.5rem}#plate-widget .top-0{top:0}#plate-widget .top-2\\.5{top:.625rem}#plate-widget .top-\\[80\\%\\]{top:80%}#plate-widget .z-\\[100\\]{z-index:100}#plate-widget .z-\\[1\\]{z-index:1}#plate-widget .m-4{margin:1rem}#plate-widget .mt-\\[2\\%\\]{margin-top:2%}#plate-widget .box-content{box-sizing:content-box}#plate-widget .flex{display:flex}#plate-widget .inline-flex{display:inline-flex}#plate-widget .grid{display:grid}#plate-widget .h-1\\/2{height:50%}#plate-widget .h-12{height:3rem}#plate-widget .h-14{height:3.5rem}#plate-widget .h-3{height:.75rem}#plate-widget .h-5{height:1.25rem}#plate-widget .h-8{height:2rem}#plate-widget .h-\\[18px\\]{height:18px}#plate-widget .h-\\[5px\\]{height:5px}#plate-widget .h-full{height:100%}#plate-widget .max-h-screen{max-height:100vh}#plate-widget .w-3{width:.75rem}#plate-widget .w-32{width:8rem}#plate-widget .w-5{width:1.25rem}#plate-widget .w-auto{width:auto}#plate-widget .w-fit{width:-moz-fit-content;width:fit-content}#plate-widget .w-full{width:100%}#plate-widget .w-max{width:-moz-max-content;width:max-content}#plate-widget .min-w-40{min-width:10rem}#plate-widget .min-w-52{min-width:13rem}#plate-widget .max-w-80{max-width:20rem}#plate-widget .shrink-0{flex-shrink:0}#plate-widget .origin-bottom-left{transform-origin:bottom left}#plate-widget .origin-bottom-right{transform-origin:bottom right}#plate-widget .-translate-x-1\\/2,#plate-widget .translate-x-\\[-50\\%\\]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .scale-75{--tw-scale-x: .75;--tw-scale-y: .75;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .cursor-default{cursor:default}#plate-widget .cursor-pointer{cursor:pointer}#plate-widget .resize{resize:both}#plate-widget .flex-row{flex-direction:row}#plate-widget .flex-col{flex-direction:column}#plate-widget .flex-col-reverse{flex-direction:column-reverse}#plate-widget .flex-wrap{flex-wrap:wrap}#plate-widget .items-center{align-items:center}#plate-widget .items-baseline{align-items:baseline}#plate-widget .items-stretch{align-items:stretch}#plate-widget .justify-start{justify-content:flex-start}#plate-widget .justify-center{justify-content:center}#plate-widget .justify-between{justify-content:space-between}#plate-widget .justify-around{justify-content:space-around}#plate-widget .gap-0\\.5{gap:.125rem}#plate-widget .gap-1{gap:.25rem}#plate-widget .gap-2{gap:.5rem}#plate-widget .space-x-4>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}#plate-widget .overflow-auto{overflow:auto}#plate-widget .overflow-hidden{overflow:hidden}#plate-widget .whitespace-nowrap{white-space:nowrap}#plate-widget .rounded-2xl{border-radius:1rem}#plate-widget .rounded-md{border-radius:.375rem}#plate-widget .rounded-xl{border-radius:.75rem}#plate-widget .rounded-l-xl{border-top-left-radius:.75rem;border-bottom-left-radius:.75rem}#plate-widget .rounded-r-xl{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}#plate-widget .border{border-width:1px}#plate-widget .border-none{border-style:none}#plate-widget .border-white-10{border-color:#ffffff1a}#plate-widget .bg-black-50{background-color:#00000080}#plate-widget .bg-gray-lighter{--tw-bg-opacity: 1;background-color:rgb(44 46 59 / var(--tw-bg-opacity, 1))}#plate-widget .bg-transparent{background-color:transparent}#plate-widget .bg-white-50{background-color:#ffffff80}#plate-widget .bg-gradient-radial{background-image:radial-gradient(333.64% 121% at -21.73% -4.12%,#536976ee,#181a23ee)}#plate-widget .bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}#plate-widget .from-button-link-from{--tw-gradient-from: #0062CC var(--tw-gradient-from-position);--tw-gradient-to: rgb(0 98 204 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .from-button-primary-from{--tw-gradient-from: #FFC700 var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 199 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .from-button-secondary-from{--tw-gradient-from: #2E3142 var(--tw-gradient-from-position);--tw-gradient-to: rgb(46 49 66 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .to-button-challenge-hover-to{--tw-gradient-to: #FFB700 var(--tw-gradient-to-position)}#plate-widget .to-button-link-to{--tw-gradient-to: #007AFF var(--tw-gradient-to-position)}#plate-widget .to-button-primary-to{--tw-gradient-to: #FFE142 var(--tw-gradient-to-position)}#plate-widget .to-button-secondary-to{--tw-gradient-to: #3E4258 var(--tw-gradient-to-position)}#plate-widget .object-contain{-o-object-fit:contain;object-fit:contain}#plate-widget .p-1{padding:.25rem}#plate-widget .p-2{padding:.5rem}#plate-widget .p-2\\.5{padding:.625rem}#plate-widget .p-3{padding:.75rem}#plate-widget .p-4{padding:1rem}#plate-widget .p-6{padding:1.5rem}#plate-widget .p-7{padding:1.75rem}#plate-widget .px-3{padding-left:.75rem;padding-right:.75rem}#plate-widget .pb-2{padding-bottom:.5rem}#plate-widget .pb-6{padding-bottom:1.5rem}#plate-widget .pl-3{padding-left:.75rem}#plate-widget .pr-2{padding-right:.5rem}#plate-widget .pr-2\\.5{padding-right:.625rem}#plate-widget .pr-4{padding-right:1rem}#plate-widget .pr-8{padding-right:2rem}#plate-widget .text-center{text-align:center}#plate-widget .text-10{font-size:.625rem}#plate-widget .text-12{font-size:.75rem}#plate-widget .text-13{font-size:.8125rem}#plate-widget .text-15{font-size:.9375rem}#plate-widget .text-20{font-size:1.25rem}#plate-widget .text-sm{font-size:.875rem;line-height:1.25rem}#plate-widget .font-bold{font-weight:700}#plate-widget .font-medium{font-weight:500}#plate-widget .font-semibold{font-weight:600}#plate-widget .uppercase{text-transform:uppercase}#plate-widget .text-gray{--tw-text-opacity: 1;color:rgb(33 35 48 / var(--tw-text-opacity, 1))}#plate-widget .text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}#plate-widget .text-white-40{color:#fff6}#plate-widget .text-yellow{--tw-text-opacity: 1;color:rgb(255 204 41 / var(--tw-text-opacity, 1))}#plate-widget .opacity-0{opacity:0}#plate-widget .opacity-100{opacity:1}#plate-widget .opacity-60{opacity:.6}#plate-widget .shadow-\\[0_4px_0_0_rgba\\(0\\,0\\,0\\,0\\.10\\)\\,inset_0_1px_1px_0_white\\]{--tw-shadow: 0 4px 0 0 rgba(0,0,0,.1),inset 0 1px 1px 0 white;--tw-shadow-colored: 0 4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .shadow-\\[inset_0_-4px_0_0_\\#00499a\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]{--tw-shadow: inset 0 -4px 0 0 #00499a,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .shadow-\\[inset_0_-4px_0_0_\\#212330\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]{--tw-shadow: inset 0 -4px 0 0 #212330,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .shadow-\\[inset_0_-4px_0_0_\\#d07e04\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]{--tw-shadow: inset 0 -4px 0 0 #d07e04,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .shadow-\\[inset_0_1px_0_0_\\#ffffff40\\]{--tw-shadow: inset 0 1px 0 0 #ffffff40;--tw-shadow-colored: inset 0 1px 0 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .grayscale{--tw-grayscale: grayscale(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#plate-widget .filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#plate-widget .transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#plate-widget .transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#plate-widget .transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#plate-widget .duration-300{transition-duration:.3s}@keyframes enter{0%{opacity:var(--tw-enter-opacity, 1);transform:translate3d(var(--tw-enter-translate-x, 0),var(--tw-enter-translate-y, 0),0) scale3d(var(--tw-enter-scale, 1),var(--tw-enter-scale, 1),var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity, 1);transform:translate3d(var(--tw-exit-translate-x, 0),var(--tw-exit-translate-y, 0),0) scale3d(var(--tw-exit-scale, 1),var(--tw-exit-scale, 1),var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))}}#plate-widget .duration-300{animation-duration:.3s}#plate-widget .bg-theme-primary{background:var(--bg-theme-primary-gradient);box-shadow:var(--bg-theme-primary-shadow)}#plate-widget .bg-theme-secondary{background:var(--bg-theme-secondary-gradient);box-shadow:var(--bg-theme-secondary-shadow);outline:var(--bg-theme-secondary-outline)}#plate-widget .bg-theme-gray-dark{background:var(--bg-theme-gray-dark-gradient);box-shadow:var(--bg-theme-gray-dark-shadow);padding:.75rem}#plate-widget{position:fixed;z-index:2;font-family:IBM Plex Sans}#plate-widget #plate-widget img{-webkit-user-select:none;-moz-user-select:none;user-select:none;touch-action:manipulation;-webkit-user-drag:none}#plate-widget#plate-widget{--bg-theme-primary-gradient: linear-gradient(to right, #ffe142, #ffc700);--bg-theme-primary-shadow: inset 0 -4px 0 0 #d07e04, inset 0 1px 1px 0 #ffffff;--bg-theme-secondary-gradient: linear-gradient(to right, #536976ee, #181a23ee);--bg-theme-secondary-shadow: inset 0 1px 0 0 #ffffff40;--bg-theme-secondary-outline: none;--bg-theme-gray-dark-gradient: linear-gradient(to bottom, #2e3142, #3e4258);--bg-theme-gray-dark-shadow: 0 0 15px 0 rgba(0, 0, 0, .9), inset 0 1px 0 0 rgba(255, 255, 255, .25)}#plate-widget#plate-widget.dark{--bg-theme-primary-gradient: radial-gradient(59.85% 59.85% at 22.81% 5.7%, #ffff4f 0%, rgba(255, 255, 79, 0) 100%), radial-gradient(39.7% 39.7% at 76.75% 6.58%, #ffff4f 0%, rgba(255, 255, 79, 0) 100%), radial-gradient(35.98% 35.98% at 37.28% 100%, #ffff4f 0%, rgba(255, 255, 79, 0) 100%), linear-gradient(180deg, #fc0 0%, #ff8d00 100%);--bg-theme-primary-shadow: inset 0 -2px 0 0 #ff8d00, inset 0 1px 1px 0 rgba(255, 255, 255, .35);--bg-theme-secondary-gradient: linear-gradient(0deg, #1e2836 0%, #171d24 100%);--bg-theme-secondary-shadow: none;--bg-theme-secondary-outline: 3px solid #ffcc29;--bg-theme-gray-dark-gradient: linear-gradient(0deg, #18202b 0%, #12171d 100%);--bg-theme-gray-dark-shadow: 0px 1px 0px 0px rgba(255, 255, 255, .1) inset}#plate-widget .before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}#plate-widget .before\\:absolute:before{content:var(--tw-content);position:absolute}#plate-widget .before\\:left-\\[-75\\%\\]:before{content:var(--tw-content);left:-75%}#plate-widget .before\\:top-\\[-50\\%\\]:before{content:var(--tw-content);top:-50%}#plate-widget .before\\:h-\\[200vh\\]:before{content:var(--tw-content);height:200vh}#plate-widget .before\\:w-52:before{content:var(--tw-content);width:13rem}#plate-widget .before\\:skew-x-\\[-45deg\\]:before{content:var(--tw-content);--tw-skew-x: -45deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes shine{0%{content:var(--tw-content);transform:scale(10,20) skew(-45deg) translate(-200%)}50%{content:var(--tw-content);transform:scale(10,20) skew(-45deg) translate(200%)}to{content:var(--tw-content);transform:scale(10,20) skew(-45deg) translate(200%)}}#plate-widget .before\\:animate-shine:before{content:var(--tw-content);animation:shine 7s infinite cubic-bezier(0,.4,.45,.99)}#plate-widget .before\\:bg-gradient-to-r:before{content:var(--tw-content);background-image:linear-gradient(to right,var(--tw-gradient-stops))}#plate-widget .before\\:from-\\[\\#53697600\\]:before{content:var(--tw-content);--tw-gradient-from: #53697600 var(--tw-gradient-from-position);--tw-gradient-to: rgb(83 105 118 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .before\\:via-\\[\\#8499a61a\\]:before{content:var(--tw-content);--tw-gradient-to: rgb(132 153 166 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #8499a61a var(--tw-gradient-via-position), var(--tw-gradient-to)}#plate-widget .before\\:to-\\[\\#53697600\\]:before{content:var(--tw-content);--tw-gradient-to: #53697600 var(--tw-gradient-to-position)}#plate-widget .before\\:content-\\[\\'\\'\\]:before{--tw-content: "";content:var(--tw-content)}#plate-widget .hover\\:left-0:hover{left:0}#plate-widget .hover\\:right-0:hover{right:0}#plate-widget .hover\\:bg-white-70:hover{background-color:#ffffffb3}#plate-widget .hover\\:bg-gradient-to-b:hover{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}#plate-widget .hover\\:from-button-challenge-hover-from:hover{--tw-gradient-from: #FFD42A var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 212 42 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .hover\\:from-button-link-hover-from:hover{--tw-gradient-from: #3481D7 var(--tw-gradient-from-position);--tw-gradient-to: rgb(52 129 215 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .hover\\:from-button-primary-hover-from:hover{--tw-gradient-from: #FFD234 var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 210 52 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .hover\\:from-button-secondary-hover-from:hover{--tw-gradient-from: #434555 var(--tw-gradient-from-position);--tw-gradient-to: rgb(67 69 85 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .hover\\:to-button-challenge-hover-to:hover{--tw-gradient-to: #FFB700 var(--tw-gradient-to-position)}#plate-widget .hover\\:to-button-link-hover-to:hover{--tw-gradient-to: #3495FF var(--tw-gradient-to-position)}#plate-widget .hover\\:to-button-primary-hover-to:hover{--tw-gradient-to: #FFE767 var(--tw-gradient-to-position)}#plate-widget .hover\\:to-button-secondary-hover-to:hover{--tw-gradient-to: #515568 var(--tw-gradient-to-position)}#plate-widget .hover\\:shadow-\\[0_4px_0_0_rgba\\(0\\,0\\,0\\,0\\.10\\)\\,inset_0_1px_1px_0_white\\]:hover{--tw-shadow: 0 4px 0 0 rgba(0,0,0,.1),inset 0 1px 1px 0 white;--tw-shadow-colored: 0 4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .hover\\:shadow-\\[inset_0_-4px_0_0_\\#2673c8\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]:hover{--tw-shadow: inset 0 -4px 0 0 #2673c8,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .hover\\:shadow-\\[inset_0_-4px_0_0_\\#3b3e52\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]:hover{--tw-shadow: inset 0 -4px 0 0 #3b3e52,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .hover\\:shadow-\\[inset_0_-4px_0_0_\\#ef9e25\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.35\\)\\]:hover{--tw-shadow: inset 0 -4px 0 0 #ef9e25,inset 0 1px 1px 0 rgba(255,255,255,.35);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .focus\\:opacity-100:focus{opacity:1}#plate-widget .focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}#plate-widget .focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}#plate-widget .focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}#plate-widget .focus-visible\\:outline-none:focus-visible{outline:2px solid transparent;outline-offset:2px}#plate-widget .focus-visible\\:outline-1:focus-visible{outline-width:1px}#plate-widget .focus-visible\\:outline-offset-0:focus-visible{outline-offset:0px}#plate-widget .focus-visible\\:outline-white\\/50:focus-visible{outline-color:#ffffff80}#plate-widget .active\\:translate-y-0:active{--tw-translate-y: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .active\\:translate-y-0\\.5:active{--tw-translate-y: .125rem;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .active\\:bg-white-50:active{background-color:#ffffff80}#plate-widget .active\\:bg-gradient-to-b:active{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}#plate-widget .active\\:from-button-link-from:active{--tw-gradient-from: #0062CC var(--tw-gradient-from-position);--tw-gradient-to: rgb(0 98 204 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .active\\:from-button-primary-from:active{--tw-gradient-from: #FFC700 var(--tw-gradient-from-position);--tw-gradient-to: rgb(255 199 0 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .active\\:from-button-secondary-from:active{--tw-gradient-from: #2E3142 var(--tw-gradient-from-position);--tw-gradient-to: rgb(46 49 66 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .active\\:to-button-link-to:active{--tw-gradient-to: #007AFF var(--tw-gradient-to-position)}#plate-widget .active\\:to-button-primary-to:active{--tw-gradient-to: #FFE142 var(--tw-gradient-to-position)}#plate-widget .active\\:to-button-secondary-to:active{--tw-gradient-to: #3E4258 var(--tw-gradient-to-position)}#plate-widget .active\\:shadow-\\[0_1px_4px_0_rgba\\(0\\,0\\,0\\,0\\.15\\)\\]:active{--tw-shadow: 0 1px 4px 0 rgba(0,0,0,.15);--tw-shadow-colored: 0 1px 4px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .active\\:shadow-\\[inset_0_1px_4px_0_rgba\\(0\\,0\\,0\\,0\\.35\\)\\]:active{--tw-shadow: inset 0 1px 4px 0 rgba(0,0,0,.35);--tw-shadow-colored: inset 0 1px 4px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .disabled\\:pointer-events-none:disabled{pointer-events:none}#plate-widget .disabled\\:bg-gradient-to-t:disabled{background-image:linear-gradient(to top,var(--tw-gradient-stops))}#plate-widget .disabled\\:from-\\[\\#A4A6B3\\]:disabled{--tw-gradient-from: #A4A6B3 var(--tw-gradient-from-position);--tw-gradient-to: rgb(164 166 179 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}#plate-widget .disabled\\:via-\\[\\#8F919D\\]:disabled{--tw-gradient-to: rgb(143 145 157 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #8F919D var(--tw-gradient-via-position), var(--tw-gradient-to)}#plate-widget .disabled\\:to-\\[\\#8F919F\\]:disabled{--tw-gradient-to: #8F919F var(--tw-gradient-to-position)}#plate-widget .disabled\\:text-gray\\/40:disabled{color:#21233066}#plate-widget .disabled\\:opacity-50:disabled{opacity:.5}#plate-widget .disabled\\:shadow-\\[inset_0_-4px_0_0_\\#70777D\\,inset_0_1px_1px_0_rgba\\(255\\,255\\,255\\,0\\.5\\)\\]:disabled{--tw-shadow: inset 0 -4px 0 0 #70777D,inset 0 1px 1px 0 rgba(255,255,255,.5);--tw-shadow-colored: inset 0 -4px 0 0 var(--tw-shadow-color), inset 0 1px 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#plate-widget .group:hover .group-hover\\:opacity-100{opacity:1}#plate-widget .data-\\[swipe\\=cancel\\]\\:translate-x-0[data-swipe=cancel]{--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .data-\\[swipe\\=end\\]\\:translate-x-\\[--radix-toast-swipe-end-x\\][data-swipe=end]{--tw-translate-x: var(--radix-toast-swipe-end-x);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .data-\\[swipe\\=move\\]\\:translate-x-\\[--radix-toast-swipe-move-x\\][data-swipe=move]{--tw-translate-x: var(--radix-toast-swipe-move-x);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .data-\\[swipe\\=move\\]\\:transition-none[data-swipe=move]{transition-property:none}#plate-widget .data-\\[state\\=open\\]\\:animate-in[data-state=open]{animation-name:enter;animation-duration:.15s;--tw-enter-opacity: initial;--tw-enter-scale: initial;--tw-enter-rotate: initial;--tw-enter-translate-x: initial;--tw-enter-translate-y: initial}#plate-widget .data-\\[state\\=closed\\]\\:animate-out[data-state=closed],#plate-widget .data-\\[swipe\\=end\\]\\:animate-out[data-swipe=end]{animation-name:exit;animation-duration:.15s;--tw-exit-opacity: initial;--tw-exit-scale: initial;--tw-exit-rotate: initial;--tw-exit-translate-x: initial;--tw-exit-translate-y: initial}#plate-widget .data-\\[state\\=closed\\]\\:fade-out-80[data-state=closed]{--tw-exit-opacity: .8}#plate-widget .data-\\[state\\=closed\\]\\:slide-out-to-top-full[data-state=closed]{--tw-exit-translate-y: -100%}#plate-widget .data-\\[state\\=open\\]\\:slide-in-from-top-full[data-state=open]{--tw-enter-translate-y: -100%}@media (min-width: 568px){#plate-widget .sm\\:bottom-0{bottom:0}#plate-widget .sm\\:right-0{right:0}#plate-widget .sm\\:top-auto{top:auto}#plate-widget .sm\\:flex-col{flex-direction:column}#plate-widget .data-\\[state\\=closed\\]\\:sm\\:slide-out-to-bottom-full[data-state=closed]{--tw-exit-translate-y: 100%}#plate-widget .data-\\[state\\=open\\]\\:sm\\:slide-in-from-bottom-full[data-state=open]{--tw-enter-translate-y: 100%}}@media (min-width: 964px){#plate-widget .md\\:max-w-\\[420px\\]{max-width:420px}}@media (min-width: 1400px){#plate-widget .lg\\:h-16{height:4rem}#plate-widget .lg\\:text-19{font-size:1.1875rem}}@media screen and (max-width: 830px) and (orientation: portrait){#plate-widget .belowSMDAndPortrait\\:bottom-\\[var\\(--mobile-bottom\\)\\]{bottom:var(--mobile-bottom)}#plate-widget .belowSMDAndPortrait\\:top-auto{top:auto}#plate-widget .belowSMDAndPortrait\\:scale-\\[calc\\(var\\(--viewport-scale-x\\)_\\*_0\\.6\\)\\]{--tw-scale-x: calc(var(--viewport-scale-x) * .6);--tw-scale-y: calc(var(--viewport-scale-x) * .6);transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .belowSMDAndPortrait\\:pt-2{padding-top:.5rem}#plate-widget .belowSMDAndPortrait\\:text-10{font-size:.625rem}}@media screen and (max-width: 964px) and (orientation: landscape){#plate-widget .belowMDAndLandscape\\:bottom-11{bottom:2.75rem}#plate-widget .belowMDAndLandscape\\:top-auto{top:auto}#plate-widget .belowMDAndLandscape\\:scale-75{--tw-scale-x: .75;--tw-scale-y: .75;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#plate-widget .belowMDAndLandscape\\:text-10{font-size:.625rem}}
/*$vite$:1*/`, document.head.appendChild(Te);
  /**
   * @vue/shared v3.5.16
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/
  /*! #__NO_SIDE_EFFECTS__ */
  function Pe(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return n => n in t
  }
  const J = {},
    Ct = [],
    wt = () => {},
    Ff = () => !1,
    Ls = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Ai = e => e.startsWith("onUpdate:"),
    Qe = Object.assign,
    Ii = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1)
    },
    $f = Object.prototype.hasOwnProperty,
    fe = (e, t) => $f.call(e, t),
    Y = Array.isArray,
    ur = e => ks(e) === "[object Map]",
    xa = e => ks(e) === "[object Set]",
    z = e => typeof e == "function",
    _e = e => typeof e == "string",
    zt = e => typeof e == "symbol",
    ve = e => e !== null && typeof e == "object",
    Ea = e => (ve(e) || z(e)) && z(e.then) && z(e.catch),
    Ta = Object.prototype.toString,
    ks = e => Ta.call(e),
    Uf = e => ks(e).slice(8, -1),
    Ca = e => ks(e) === "[object Object]",
    Pi = e => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Kr = Pe(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    Rs = e => {
      const t = Object.create(null);
      return n => t[n] || (t[n] = e(n))
    },
    jf = /-(\w)/g,
    ot = Rs(e => e.replace(jf, (t, n) => n ? n.toUpperCase() : "")),
    Vf = /\B([A-Z])/g,
    Kn = Rs(e => e.replace(Vf, "-$1").toLowerCase()),
    Ns = Rs(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Ds = Rs(e => e ? `on${Ns(e)}` : ""),
    hn = (e, t) => !Object.is(e, t),
    Li = (e, ...t) => {
      for (let n = 0; n < e.length; n++) e[n](...t)
    },
    Sa = (e, t, n, r = !1) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        writable: r,
        value: n
      })
    },
    Wf = e => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t
    };
  let Oa;
  const Ms = () => Oa || (Oa = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

  function Qr(e) {
    if (Y(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          s = _e(r) ? Qf(r) : Qr(r);
        if (s)
          for (const i in s) t[i] = s[i]
      }
      return t
    } else if (_e(e) || ve(e)) return e
  }
  const Hf = /;(?![^(]*\))/g,
    Bf = /:([^]+)/,
    Kf = /\/\*[^]*?\*\//g;

  function Qf(e) {
    const t = {};
    return e.replace(Kf, "").split(Hf).forEach(n => {
      if (n) {
        const r = n.split(Bf);
        r.length > 1 && (t[r[0].trim()] = r[1].trim())
      }
    }), t
  }

  function Qn(e) {
    let t = "";
    if (_e(e)) t = e;
    else if (Y(e))
      for (let n = 0; n < e.length; n++) {
        const r = Qn(e[n]);
        r && (t += r + " ")
      } else if (ve(e))
        for (const n in e) e[n] && (t += n + " ");
    return t.trim()
  }

  function ki(e) {
    if (!e) return null;
    let {
      class: t,
      style: n
    } = e;
    return t && !_e(t) && (e.class = Qn(t)), n && (e.style = Qr(n)), e
  }
  const Gf = Pe("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

  function Aa(e) {
    return !!e || e === ""
  }
  const Ia = e => !!(e && e.__v_isRef === !0),
    dt = e => _e(e) ? e : e == null ? "" : Y(e) || ve(e) && (e.toString === Ta || !z(e.toString)) ? Ia(e) ? dt(e.value) : JSON.stringify(e, Pa, 2) : String(e),
    Pa = (e, t) => Ia(t) ? Pa(e, t.value) : ur(t) ? {
      [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], i) => (n[Ri(r, i) + " =>"] = s, n), {})
    } : xa(t) ? {
      [`Set(${t.size})`]: [...t.values()].map(n => Ri(n))
    } : zt(t) ? Ri(t) : ve(t) && !Y(t) && !Ca(t) ? String(t) : t,
    Ri = (e, t = "") => {
      var n;
      return zt(e) ? `Symbol(${(n=e.description)!=null?n:t})` : e
    };
  /**
   * @vue/reactivity v3.5.16
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/
  let Ge;
  class La {
    constructor(t = !1) {
      this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ge, !t && Ge && (this.index = (Ge.scopes || (Ge.scopes = [])).push(this) - 1)
    }
    get active() {
      return this._active
    }
    pause() {
      if (this._active) {
        this._isPaused = !0;
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = !1;
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
      }
    }
    run(t) {
      if (this._active) {
        const n = Ge;
        try {
          return Ge = this, t()
        } finally {
          Ge = n
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = Ge, Ge = this)
    }
    off() {
      this._on > 0 && --this._on === 0 && (Ge = this.prevScope, this.prevScope = void 0)
    }
    stop(t) {
      if (this._active) {
        this._active = !1;
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
          this.scopes.length = 0
        }
        if (!this.detached && this.parent && !t) {
          const s = this.parent.scopes.pop();
          s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
        }
        this.parent = void 0
      }
    }
  }

  function ka(e) {
    return new La(e)
  }

  function Ra() {
    return Ge
  }

  function Na(e, t = !1) {
    Ge && Ge.cleanups.push(e)
  }
  let we;
  const Ni = new WeakSet;
  class Da {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ge && Ge.active && Ge.effects.push(this)
    }
    pause() {
      this.flags |= 64
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, Ni.has(this) && (Ni.delete(this), this.trigger()))
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Fa(this)
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, Wa(this), $a(this);
      const t = we,
        n = St;
      we = this, St = !0;
      try {
        return this.fn()
      } finally {
        Ua(this), we = t, St = n, this.flags &= -3
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) $i(t);
        this.deps = this.depsTail = void 0, Wa(this), this.onStop && this.onStop(), this.flags &= -2
      }
    }
    trigger() {
      this.flags & 64 ? Ni.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }
    runIfDirty() {
      Fi(this) && this.run()
    }
    get dirty() {
      return Fi(this)
    }
  }
  let Ma = 0,
    Gr, qr;

  function Fa(e, t = !1) {
    if (e.flags |= 8, t) {
      e.next = qr, qr = e;
      return
    }
    e.next = Gr, Gr = e
  }

  function Di() {
    Ma++
  }

  function Mi() {
    if (--Ma > 0) return;
    if (qr) {
      let t = qr;
      for (qr = void 0; t;) {
        const n = t.next;
        t.next = void 0, t.flags &= -9, t = n
      }
    }
    let e;
    for (; Gr;) {
      let t = Gr;
      for (Gr = void 0; t;) {
        const n = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
          t.trigger()
        } catch (r) {
          e || (e = r)
        }
        t = n
      }
    }
    if (e) throw e
  }

  function $a(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t
  }

  function Ua(e) {
    let t, n = e.depsTail,
      r = n;
    for (; r;) {
      const s = r.prevDep;
      r.version === -1 ? (r === n && (n = s), $i(r), qf(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s
    }
    e.deps = t, e.depsTail = n
  }

  function Fi(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (t.dep.version !== t.version || t.dep.computed && (ja(t.dep.computed) || t.dep.version !== t.version)) return !0;
    return !!e._dirty
  }

  function ja(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Yr) || (e.globalVersion = Yr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Fi(e)))) return;
    e.flags |= 2;
    const t = e.dep,
      n = we,
      r = St;
    we = e, St = !0;
    try {
      $a(e);
      const s = e.fn(e._value);
      (t.version === 0 || hn(s, e._value)) && (e.flags |= 128, e._value = s, t.version++)
    } catch (s) {
      throw t.version++, s
    } finally {
      we = n, St = r, Ua(e), e.flags &= -3
    }
  }

  function $i(e, t = !1) {
    const {
      dep: n,
      prevSub: r,
      nextSub: s
    } = e;
    if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep) $i(i, !0)
    }!t && !--n.sc && n.map && n.map.delete(n.key)
  }

  function qf(e) {
    const {
      prevDep: t,
      nextDep: n
    } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0)
  }
  let St = !0;
  const Va = [];

  function Dt() {
    Va.push(St), St = !1
  }

  function Mt() {
    const e = Va.pop();
    St = e === void 0 ? !0 : e
  }

  function Wa(e) {
    const {
      cleanup: t
    } = e;
    if (e.cleanup = void 0, t) {
      const n = we;
      we = void 0;
      try {
        t()
      } finally {
        we = n
      }
    }
  }
  let Yr = 0;
  class Yf {
    constructor(t, n) {
      this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
  }
  class Ui {
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0
    }
    track(t) {
      if (!we || !St || we === this.computed) return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== we) n = this.activeLink = new Yf(we, this), we.deps ? (n.prevDep = we.depsTail, we.depsTail.nextDep = n, we.depsTail = n) : we.deps = we.depsTail = n, Ha(n);
      else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
        const r = n.nextDep;
        r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = we.depsTail, n.nextDep = void 0, we.depsTail.nextDep = n, we.depsTail = n, we.deps === n && (we.deps = r)
      }
      return n
    }
    trigger(t) {
      this.version++, Yr++, this.notify(t)
    }
    notify(t) {
      Di();
      try {
        for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
      } finally {
        Mi()
      }
    }
  }

  function Ha(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) Ha(r)
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e
    }
  }
  const Fs = new WeakMap,
    Gn = Symbol(""),
    ji = Symbol(""),
    zr = Symbol("");

  function qe(e, t, n) {
    if (St && we) {
      let r = Fs.get(e);
      r || Fs.set(e, r = new Map);
      let s = r.get(n);
      s || (r.set(n, s = new Ui), s.map = r, s.key = n), s.track()
    }
  }

  function Xt(e, t, n, r, s, i) {
    const o = Fs.get(e);
    if (!o) {
      Yr++;
      return
    }
    const a = l => {
      l && l.trigger()
    };
    if (Di(), t === "clear") o.forEach(a);
    else {
      const l = Y(e),
        c = l && Pi(n);
      if (l && n === "length") {
        const u = Number(r);
        o.forEach((f, h) => {
          (h === "length" || h === zr || !zt(h) && h >= u) && a(f)
        })
      } else switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), c && a(o.get(zr)), t) {
        case "add":
          l ? c && a(o.get("length")) : (a(o.get(Gn)), ur(e) && a(o.get(ji)));
          break;
        case "delete":
          l || (a(o.get(Gn)), ur(e) && a(o.get(ji)));
          break;
        case "set":
          ur(e) && a(o.get(Gn));
          break
      }
    }
    Mi()
  }

  function zf(e, t) {
    const n = Fs.get(e);
    return n && n.get(t)
  }

  function fr(e) {
    const t = ue(e);
    return t === e ? t : (qe(t, "iterate", zr), bt(e) ? t : t.map(je))
  }

  function $s(e) {
    return qe(e = ue(e), "iterate", zr), e
  }
  const Xf = {
    __proto__: null,
    [Symbol.iterator]() {
      return Vi(this, Symbol.iterator, je)
    },
    concat(...e) {
      return fr(this).concat(...e.map(t => Y(t) ? fr(t) : t))
    },
    entries() {
      return Vi(this, "entries", e => (e[1] = je(e[1]), e))
    },
    every(e, t) {
      return Jt(this, "every", e, t, void 0, arguments)
    },
    filter(e, t) {
      return Jt(this, "filter", e, t, n => n.map(je), arguments)
    },
    find(e, t) {
      return Jt(this, "find", e, t, je, arguments)
    },
    findIndex(e, t) {
      return Jt(this, "findIndex", e, t, void 0, arguments)
    },
    findLast(e, t) {
      return Jt(this, "findLast", e, t, je, arguments)
    },
    findLastIndex(e, t) {
      return Jt(this, "findLastIndex", e, t, void 0, arguments)
    },
    forEach(e, t) {
      return Jt(this, "forEach", e, t, void 0, arguments)
    },
    includes(...e) {
      return Wi(this, "includes", e)
    },
    indexOf(...e) {
      return Wi(this, "indexOf", e)
    },
    join(e) {
      return fr(this).join(e)
    },
    lastIndexOf(...e) {
      return Wi(this, "lastIndexOf", e)
    },
    map(e, t) {
      return Jt(this, "map", e, t, void 0, arguments)
    },
    pop() {
      return Xr(this, "pop")
    },
    push(...e) {
      return Xr(this, "push", e)
    },
    reduce(e, ...t) {
      return Ba(this, "reduce", e, t)
    },
    reduceRight(e, ...t) {
      return Ba(this, "reduceRight", e, t)
    },
    shift() {
      return Xr(this, "shift")
    },
    some(e, t) {
      return Jt(this, "some", e, t, void 0, arguments)
    },
    splice(...e) {
      return Xr(this, "splice", e)
    },
    toReversed() {
      return fr(this).toReversed()
    },
    toSorted(e) {
      return fr(this).toSorted(e)
    },
    toSpliced(...e) {
      return fr(this).toSpliced(...e)
    },
    unshift(...e) {
      return Xr(this, "unshift", e)
    },
    values() {
      return Vi(this, "values", je)
    }
  };

  function Vi(e, t, n) {
    const r = $s(e),
      s = r[t]();
    return r !== e && !bt(e) && (s._next = s.next, s.next = () => {
      const i = s._next();
      return i.value && (i.value = n(i.value)), i
    }), s
  }
  const Jf = Array.prototype;

  function Jt(e, t, n, r, s, i) {
    const o = $s(e),
      a = o !== e && !bt(e),
      l = o[t];
    if (l !== Jf[t]) {
      const f = l.apply(e, i);
      return a ? je(f) : f
    }
    let c = n;
    o !== e && (a ? c = function(f, h) {
      return n.call(this, je(f), h, e)
    } : n.length > 2 && (c = function(f, h) {
      return n.call(this, f, h, e)
    }));
    const u = l.call(o, c, r);
    return a && s ? s(u) : u
  }

  function Ba(e, t, n, r) {
    const s = $s(e);
    let i = n;
    return s !== e && (bt(e) ? n.length > 3 && (i = function(o, a, l) {
      return n.call(this, o, a, l, e)
    }) : i = function(o, a, l) {
      return n.call(this, o, je(a), l, e)
    }), s[t](i, ...r)
  }

  function Wi(e, t, n) {
    const r = ue(e);
    qe(r, "iterate", zr);
    const s = r[t](...n);
    return (s === -1 || s === !1) && Bi(n[0]) ? (n[0] = ue(n[0]), r[t](...n)) : s
  }

  function Xr(e, t, n = []) {
    Dt(), Di();
    const r = ue(e)[t].apply(e, n);
    return Mi(), Mt(), r
  }
  const Zf = Pe("__proto__,__v_isRef,__isVue"),
    Ka = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(zt));

  function ed(e) {
    zt(e) || (e = String(e));
    const t = ue(this);
    return qe(t, "has", e), t.hasOwnProperty(e)
  }
  class Qa {
    constructor(t = !1, n = !1) {
      this._isReadonly = t, this._isShallow = n
    }
    get(t, n, r) {
      if (n === "__v_skip") return t.__v_skip;
      const s = this._isReadonly,
        i = this._isShallow;
      if (n === "__v_isReactive") return !s;
      if (n === "__v_isReadonly") return s;
      if (n === "__v_isShallow") return i;
      if (n === "__v_raw") return r === (s ? i ? Ja : Xa : i ? za : Ya).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      const o = Y(t);
      if (!s) {
        let l;
        if (o && (l = Xf[n])) return l;
        if (n === "hasOwnProperty") return ed
      }
      const a = Reflect.get(t, n, Oe(t) ? t : r);
      return (zt(n) ? Ka.has(n) : Zf(n)) || (s || qe(t, "get", n), i) ? a : Oe(a) ? o && Pi(n) ? a : a.value : ve(a) ? s ? Jr(a) : Zt(a) : a
    }
  }
  class Ga extends Qa {
    constructor(t = !1) {
      super(!1, t)
    }
    set(t, n, r, s) {
      let i = t[n];
      if (!this._isShallow) {
        const l = gn(i);
        if (!bt(r) && !gn(r) && (i = ue(i), r = ue(r)), !Y(t) && Oe(i) && !Oe(r)) return l ? !1 : (i.value = r, !0)
      }
      const o = Y(t) && Pi(n) ? Number(n) < t.length : fe(t, n),
        a = Reflect.set(t, n, r, Oe(t) ? t : s);
      return t === ue(s) && (o ? hn(r, i) && Xt(t, "set", n, r) : Xt(t, "add", n, r)), a
    }
    deleteProperty(t, n) {
      const r = fe(t, n);
      t[n];
      const s = Reflect.deleteProperty(t, n);
      return s && r && Xt(t, "delete", n, void 0), s
    }
    has(t, n) {
      const r = Reflect.has(t, n);
      return (!zt(n) || !Ka.has(n)) && qe(t, "has", n), r
    }
    ownKeys(t) {
      return qe(t, "iterate", Y(t) ? "length" : Gn), Reflect.ownKeys(t)
    }
  }
  class qa extends Qa {
    constructor(t = !1) {
      super(!0, t)
    }
    set(t, n) {
      return !0
    }
    deleteProperty(t, n) {
      return !0
    }
  }
  const td = new Ga,
    nd = new qa,
    rd = new Ga(!0),
    sd = new qa(!0),
    Hi = e => e,
    Us = e => Reflect.getPrototypeOf(e);

  function id(e, t, n) {
    return function(...r) {
      const s = this.__v_raw,
        i = ue(s),
        o = ur(i),
        a = e === "entries" || e === Symbol.iterator && o,
        l = e === "keys" && o,
        c = s[e](...r),
        u = n ? Hi : t ? Hs : je;
      return !t && qe(i, "iterate", l ? ji : Gn), {
        next() {
          const {
            value: f,
            done: h
          } = c.next();
          return h ? {
            value: f,
            done: h
          } : {
            value: a ? [u(f[0]), u(f[1])] : u(f),
            done: h
          }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    }
  }

  function js(e) {
    return function(...t) {
      return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
  }

  function od(e, t) {
    const n = {
      get(s) {
        const i = this.__v_raw,
          o = ue(i),
          a = ue(s);
        e || (hn(s, a) && qe(o, "get", s), qe(o, "get", a));
        const {
          has: l
        } = Us(o), c = t ? Hi : e ? Hs : je;
        if (l.call(o, s)) return c(i.get(s));
        if (l.call(o, a)) return c(i.get(a));
        i !== o && i.get(s)
      },
      get size() {
        const s = this.__v_raw;
        return !e && qe(ue(s), "iterate", Gn), Reflect.get(s, "size", s)
      },
      has(s) {
        const i = this.__v_raw,
          o = ue(i),
          a = ue(s);
        return e || (hn(s, a) && qe(o, "has", s), qe(o, "has", a)), s === a ? i.has(s) : i.has(s) || i.has(a)
      },
      forEach(s, i) {
        const o = this,
          a = o.__v_raw,
          l = ue(a),
          c = t ? Hi : e ? Hs : je;
        return !e && qe(l, "iterate", Gn), a.forEach((u, f) => s.call(i, c(u), c(f), o))
      }
    };
    return Qe(n, e ? {
      add: js("add"),
      set: js("set"),
      delete: js("delete"),
      clear: js("clear")
    } : {
      add(s) {
        !t && !bt(s) && !gn(s) && (s = ue(s));
        const i = ue(this);
        return Us(i).has.call(i, s) || (i.add(s), Xt(i, "add", s, s)), this
      },
      set(s, i) {
        !t && !bt(i) && !gn(i) && (i = ue(i));
        const o = ue(this),
          {
            has: a,
            get: l
          } = Us(o);
        let c = a.call(o, s);
        c || (s = ue(s), c = a.call(o, s));
        const u = l.call(o, s);
        return o.set(s, i), c ? hn(i, u) && Xt(o, "set", s, i) : Xt(o, "add", s, i), this
      },
      delete(s) {
        const i = ue(this),
          {
            has: o,
            get: a
          } = Us(i);
        let l = o.call(i, s);
        l || (s = ue(s), l = o.call(i, s)), a && a.call(i, s);
        const c = i.delete(s);
        return l && Xt(i, "delete", s, void 0), c
      },
      clear() {
        const s = ue(this),
          i = s.size !== 0,
          o = s.clear();
        return i && Xt(s, "clear", void 0, void 0), o
      }
    }), ["keys", "values", "entries", Symbol.iterator].forEach(s => {
      n[s] = id(s, e, t)
    }), n
  }

  function Vs(e, t) {
    const n = od(e, t);
    return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(fe(n, s) && s in r ? n : r, s, i)
  }
  const ad = {
      get: Vs(!1, !1)
    },
    ld = {
      get: Vs(!1, !0)
    },
    cd = {
      get: Vs(!0, !1)
    },
    ud = {
      get: Vs(!0, !0)
    },
    Ya = new WeakMap,
    za = new WeakMap,
    Xa = new WeakMap,
    Ja = new WeakMap;

  function fd(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0
    }
  }

  function dd(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : fd(Uf(e))
  }

  function Zt(e) {
    return gn(e) ? e : Ws(e, !1, td, ad, Ya)
  }

  function Za(e) {
    return Ws(e, !1, rd, ld, za)
  }

  function Jr(e) {
    return Ws(e, !0, nd, cd, Xa)
  }

  function pd(e) {
    return Ws(e, !0, sd, ud, Ja)
  }

  function Ws(e, t, n, r, s) {
    if (!ve(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = dd(e);
    if (i === 0) return e;
    const o = s.get(e);
    if (o) return o;
    const a = new Proxy(e, i === 2 ? r : n);
    return s.set(e, a), a
  }

  function dr(e) {
    return gn(e) ? dr(e.__v_raw) : !!(e && e.__v_isReactive)
  }

  function gn(e) {
    return !!(e && e.__v_isReadonly)
  }

  function bt(e) {
    return !!(e && e.__v_isShallow)
  }

  function Bi(e) {
    return e ? !!e.__v_raw : !1
  }

  function ue(e) {
    const t = e && e.__v_raw;
    return t ? ue(t) : e
  }

  function hd(e) {
    return !fe(e, "__v_skip") && Object.isExtensible(e) && Sa(e, "__v_skip", !0), e
  }
  const je = e => ve(e) ? Zt(e) : e,
    Hs = e => ve(e) ? Jr(e) : e;

  function Oe(e) {
    return e ? e.__v_isRef === !0 : !1
  }

  function re(e) {
    return el(e, !1)
  }

  function gd(e) {
    return el(e, !0)
  }

  function el(e, t) {
    return Oe(e) ? e : new md(e, t)
  }
  class md {
    constructor(t, n) {
      this.dep = new Ui, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ue(t), this._value = n ? t : je(t), this.__v_isShallow = n
    }
    get value() {
      return this.dep.track(), this._value
    }
    set value(t) {
      const n = this._rawValue,
        r = this.__v_isShallow || bt(t) || gn(t);
      t = r ? t : ue(t), hn(t, n) && (this._rawValue = t, this._value = r ? t : je(t), this.dep.trigger())
    }
  }

  function D(e) {
    return Oe(e) ? e.value : e
  }
  const wd = {
    get: (e, t, n) => t === "__v_raw" ? e : D(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
      const s = e[t];
      return Oe(s) && !Oe(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r)
    }
  };

  function tl(e) {
    return dr(e) ? e : new Proxy(e, wd)
  }

  function Bs(e) {
    const t = Y(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = nl(e, n);
    return t
  }
  class bd {
    constructor(t, n, r) {
      this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0, this._value = void 0
    }
    get value() {
      const t = this._object[this._key];
      return this._value = t === void 0 ? this._defaultValue : t
    }
    set value(t) {
      this._object[this._key] = t
    }
    get dep() {
      return zf(ue(this._object), this._key)
    }
  }
  class vd {
    constructor(t) {
      this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0
    }
    get value() {
      return this._value = this._getter()
    }
  }

  function yd(e, t, n) {
    return Oe(e) ? e : z(e) ? new vd(e) : ve(e) && arguments.length > 1 ? nl(e, t, n) : re(e)
  }

  function nl(e, t, n) {
    const r = e[t];
    return Oe(r) ? r : new bd(e, t, n)
  }
  class _d {
    constructor(t, n, r) {
      this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ui(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Yr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && we !== this) return Fa(this, !0), !0
    }
    get value() {
      const t = this.dep.track();
      return ja(this), t && (t.version = this.dep.version), this._value
    }
    set value(t) {
      this.setter && this.setter(t)
    }
  }

  function xd(e, t, n = !1) {
    let r, s;
    return z(e) ? r = e : (r = e.get, s = e.set), new _d(r, s, n)
  }
  const Ks = {},
    Qs = new WeakMap;
  let qn;

  function Ed(e, t = !1, n = qn) {
    if (n) {
      let r = Qs.get(n);
      r || Qs.set(n, r = []), r.push(e)
    }
  }

  function Td(e, t, n = J) {
    const {
      immediate: r,
      deep: s,
      once: i,
      scheduler: o,
      augmentJob: a,
      call: l
    } = n, c = v => s ? v : bt(v) || s === !1 || s === 0 ? mn(v, 1) : mn(v);
    let u, f, h, m, O = !1,
      b = !1;
    if (Oe(e) ? (f = () => e.value, O = bt(e)) : dr(e) ? (f = () => c(e), O = !0) : Y(e) ? (b = !0, O = e.some(v => dr(v) || bt(v)), f = () => e.map(v => {
        if (Oe(v)) return v.value;
        if (dr(v)) return c(v);
        if (z(v)) return l ? l(v, 2) : v()
      })) : z(e) ? t ? f = l ? () => l(e, 2) : e : f = () => {
        if (h) {
          Dt();
          try {
            h()
          } finally {
            Mt()
          }
        }
        const v = qn;
        qn = u;
        try {
          return l ? l(e, 3, [m]) : e(m)
        } finally {
          qn = v
        }
      } : f = wt, t && s) {
      const v = f,
        I = s === !0 ? 1 / 0 : s;
      f = () => mn(v(), I)
    }
    const E = Ra(),
      g = () => {
        u.stop(), E && E.active && Ii(E.effects, u)
      };
    if (i && t) {
      const v = t;
      t = (...I) => {
        v(...I), g()
      }
    }
    let x = b ? new Array(e.length).fill(Ks) : Ks;
    const S = v => {
      if (!(!(u.flags & 1) || !u.dirty && !v))
        if (t) {
          const I = u.run();
          if (s || O || (b ? I.some((R, k) => hn(R, x[k])) : hn(I, x))) {
            h && h();
            const R = qn;
            qn = u;
            try {
              const k = [I, x === Ks ? void 0 : b && x[0] === Ks ? [] : x, m];
              x = I, l ? l(t, 3, k) : t(...k)
            } finally {
              qn = R
            }
          }
        } else u.run()
    };
    return a && a(S), u = new Da(f), u.scheduler = o ? () => o(S, !1) : S, m = v => Ed(v, !1, u), h = u.onStop = () => {
      const v = Qs.get(u);
      if (v) {
        if (l) l(v, 4);
        else
          for (const I of v) I();
        Qs.delete(u)
      }
    }, t ? r ? S(!0) : x = u.run() : o ? o(S.bind(null, !0), !0) : u.run(), g.pause = u.pause.bind(u), g.resume = u.resume.bind(u), g.stop = g, g
  }

  function mn(e, t = 1 / 0, n) {
    if (t <= 0 || !ve(e) || e.__v_skip || (n = n || new Set, n.has(e))) return e;
    if (n.add(e), t--, Oe(e)) mn(e.value, t, n);
    else if (Y(e))
      for (let r = 0; r < e.length; r++) mn(e[r], t, n);
    else if (xa(e) || ur(e)) e.forEach(r => {
      mn(r, t, n)
    });
    else if (Ca(e)) {
      for (const r in e) mn(e[r], t, n);
      for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && mn(e[r], t, n)
    }
    return e
  }
  /**
   * @vue/runtime-core v3.5.16
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/
  const Zr = [];
  let Ki = !1;

  function xv(e, ...t) {
    if (Ki) return;
    Ki = !0, Dt();
    const n = Zr.length ? Zr[Zr.length - 1].component : null,
      r = n && n.appContext.config.warnHandler,
      s = Cd();
    if (r) pr(r, n, 11, [e + t.map(i => {
      var o, a;
      return (a = (o = i.toString) == null ? void 0 : o.call(i)) != null ? a : JSON.stringify(i)
    }).join(""), n && n.proxy, s.map(({
      vnode: i
    }) => `at <${rc(n,i.type)}>`).join(`
`), s]);
    else {
      const i = [`[Vue warn]: ${e}`, ...t];
      s.length && i.push(`
`, ...Sd(s)), console.warn(...i)
    }
    Mt(), Ki = !1
  }

  function Cd() {
    let e = Zr[Zr.length - 1];
    if (!e) return [];
    const t = [];
    for (; e;) {
      const n = t[0];
      n && n.vnode === e ? n.recurseCount++ : t.push({
        vnode: e,
        recurseCount: 0
      });
      const r = e.component && e.component.parent;
      e = r && r.vnode
    }
    return t
  }

  function Sd(e) {
    const t = [];
    return e.forEach((n, r) => {
      t.push(...r === 0 ? [] : [`
`], ...Od(n))
    }), t
  }

  function Od({
    vnode: e,
    recurseCount: t
  }) {
    const n = t > 0 ? `... (${t} recursive calls)` : "",
      r = e.component ? e.component.parent == null : !1,
      s = ` at <${rc(e.component,e.type,r)}`,
      i = ">" + n;
    return e.props ? [s, ...Ad(e.props), i] : [s + i]
  }

  function Ad(e) {
    const t = [],
      n = Object.keys(e);
    return n.slice(0, 3).forEach(r => {
      t.push(...rl(r, e[r]))
    }), n.length > 3 && t.push(" ..."), t
  }

  function rl(e, t, n) {
    return _e(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Oe(t) ? (t = rl(e, ue(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : z(t) ? [`${e}=fn${t.name?`<${t.name}>`:""}`] : (t = ue(t), n ? t : [`${e}=`, t])
  }

  function pr(e, t, n, r) {
    try {
      return r ? e(...r) : e()
    } catch (s) {
      Gs(s, t, n)
    }
  }

  function Ft(e, t, n, r) {
    if (z(e)) {
      const s = pr(e, t, n, r);
      return s && Ea(s) && s.catch(i => {
        Gs(i, t, n)
      }), s
    }
    if (Y(e)) {
      const s = [];
      for (let i = 0; i < e.length; i++) s.push(Ft(e[i], t, n, r));
      return s
    }
  }

  function Gs(e, t, n, r = !0) {
    const s = t ? t.vnode : null,
      {
        errorHandler: i,
        throwUnhandledErrorInProduction: o
      } = t && t.appContext.config || J;
    if (t) {
      let a = t.parent;
      const l = t.proxy,
        c = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; a;) {
        const u = a.ec;
        if (u) {
          for (let f = 0; f < u.length; f++)
            if (u[f](e, l, c) === !1) return
        }
        a = a.parent
      }
      if (i) {
        Dt(), pr(i, null, 10, [e, l, c]), Mt();
        return
      }
    }
    Id(e, n, s, r, o)
  }

  function Id(e, t, n, r = !0, s = !1) {
    if (s) throw e;
    console.error(e)
  }
  const Xe = [];
  let $t = -1;
  const hr = [];
  let wn = null,
    gr = 0;
  const sl = Promise.resolve();
  let qs = null;

  function Ys(e) {
    const t = qs || sl;
    return e ? t.then(this ? e.bind(this) : e) : t
  }

  function Pd(e) {
    let t = $t + 1,
      n = Xe.length;
    for (; t < n;) {
      const r = t + n >>> 1,
        s = Xe[r],
        i = es(s);
      i < e || i === e && s.flags & 2 ? t = r + 1 : n = r
    }
    return t
  }

  function Qi(e) {
    if (!(e.flags & 1)) {
      const t = es(e),
        n = Xe[Xe.length - 1];
      !n || !(e.flags & 2) && t >= es(n) ? Xe.push(e) : Xe.splice(Pd(t), 0, e), e.flags |= 1, il()
    }
  }

  function il() {
    qs || (qs = sl.then(ll))
  }

  function Ld(e) {
    Y(e) ? hr.push(...e) : wn && e.id === -1 ? wn.splice(gr + 1, 0, e) : e.flags & 1 || (hr.push(e), e.flags |= 1), il()
  }

  function ol(e, t, n = $t + 1) {
    for (; n < Xe.length; n++) {
      const r = Xe[n];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        Xe.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2)
      }
    }
  }

  function al(e) {
    if (hr.length) {
      const t = [...new Set(hr)].sort((n, r) => es(n) - es(r));
      if (hr.length = 0, wn) {
        wn.push(...t);
        return
      }
      for (wn = t, gr = 0; gr < wn.length; gr++) {
        const n = wn[gr];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2
      }
      wn = null, gr = 0
    }
  }
  const es = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;

  function ll(e) {
    try {
      for ($t = 0; $t < Xe.length; $t++) {
        const t = Xe[$t];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), pr(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2))
      }
    } finally {
      for (; $t < Xe.length; $t++) {
        const t = Xe[$t];
        t && (t.flags &= -2)
      }
      $t = -1, Xe.length = 0, al(), qs = null, (Xe.length || hr.length) && ll()
    }
  }
  let Ve = null,
    cl = null;

  function zs(e) {
    const t = Ve;
    return Ve = e, cl = e && e.type.__scopeId || null, t
  }

  function me(e, t = Ve, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
      r._d && Yl(-1);
      const i = zs(t);
      let o;
      try {
        o = e(...s)
      } finally {
        zs(i), r._d && Yl(1)
      }
      return o
    };
    return r._n = !0, r._c = !0, r._d = !0, r
  }

  function Yn(e, t, n, r) {
    const s = e.dirs,
      i = t && t.dirs;
    for (let o = 0; o < s.length; o++) {
      const a = s[o];
      i && (a.oldValue = i[o].value);
      let l = a.dir[r];
      l && (Dt(), Ft(l, n, 8, [e.el, a, e, t]), Mt())
    }
  }
  const ul = Symbol("_vte"),
    kd = e => e.__isTeleport,
    ts = e => e && (e.disabled || e.disabled === ""),
    fl = e => e && (e.defer || e.defer === ""),
    dl = e => typeof SVGElement < "u" && e instanceof SVGElement,
    pl = e => typeof MathMLElement == "function" && e instanceof MathMLElement,
    Gi = (e, t) => {
      const n = e && e.to;
      return _e(n) ? t ? t(n) : null : n
    },
    hl = {
      name: "Teleport",
      __isTeleport: !0,
      process(e, t, n, r, s, i, o, a, l, c) {
        const {
          mc: u,
          pc: f,
          pbc: h,
          o: {
            insert: m,
            querySelector: O,
            createText: b,
            createComment: E
          }
        } = c, g = ts(t.props);
        let {
          shapeFlag: x,
          children: S,
          dynamicChildren: v
        } = t;
        if (e == null) {
          const I = t.el = b(""),
            R = t.anchor = b("");
          m(I, n, r), m(R, n, r);
          const k = (U, K) => {
              x & 16 && (s && s.isCE && (s.ce._teleportTarget = U), u(S, U, K, s, i, o, a, l))
            },
            V = () => {
              const U = t.target = Gi(t.props, O),
                K = gl(U, t, b, m);
              U && (o !== "svg" && dl(U) ? o = "svg" : o !== "mathml" && pl(U) && (o = "mathml"), g || (k(U, K), Js(t, !1)))
            };
          g && (k(n, R), Js(t, !0)), fl(t.props) ? (t.el.__isMounted = !1, Ze(() => {
            V(), delete t.el.__isMounted
          }, i)) : V()
        } else {
          if (fl(t.props) && e.el.__isMounted === !1) {
            Ze(() => {
              hl.process(e, t, n, r, s, i, o, a, l, c)
            }, i);
            return
          }
          t.el = e.el, t.targetStart = e.targetStart;
          const I = t.anchor = e.anchor,
            R = t.target = e.target,
            k = t.targetAnchor = e.targetAnchor,
            V = ts(e.props),
            U = V ? n : R,
            K = V ? I : k;
          if (o === "svg" || dl(R) ? o = "svg" : (o === "mathml" || pl(R)) && (o = "mathml"), v ? (h(e.dynamicChildren, v, U, s, i, o, a), so(e, t, !0)) : l || f(e, t, U, K, s, i, o, a, !1), g) V ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Xs(t, n, I, c, 1);
          else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
            const ne = t.target = Gi(t.props, O);
            ne && Xs(t, ne, null, c, 0)
          } else V && Xs(t, R, k, c, 1);
          Js(t, g)
        }
      },
      remove(e, t, n, {
        um: r,
        o: {
          remove: s
        }
      }, i) {
        const {
          shapeFlag: o,
          children: a,
          anchor: l,
          targetStart: c,
          targetAnchor: u,
          target: f,
          props: h
        } = e;
        if (f && (s(c), s(u)), i && s(l), o & 16) {
          const m = i || !ts(h);
          for (let O = 0; O < a.length; O++) {
            const b = a[O];
            r(b, t, n, m, !!b.dynamicChildren)
          }
        }
      },
      move: Xs,
      hydrate: Rd
    };

  function Xs(e, t, n, {
    o: {
      insert: r
    },
    m: s
  }, i = 2) {
    i === 0 && r(e.targetAnchor, t, n);
    const {
      el: o,
      anchor: a,
      shapeFlag: l,
      children: c,
      props: u
    } = e, f = i === 2;
    if (f && r(o, t, n), (!f || ts(u)) && l & 16)
      for (let h = 0; h < c.length; h++) s(c[h], t, n, 2);
    f && r(a, t, n)
  }

  function Rd(e, t, n, r, s, i, {
    o: {
      nextSibling: o,
      parentNode: a,
      querySelector: l,
      insert: c,
      createText: u
    }
  }, f) {
    const h = t.target = Gi(t.props, l);
    if (h) {
      const m = ts(t.props),
        O = h._lpa || h.firstChild;
      if (t.shapeFlag & 16)
        if (m) t.anchor = f(o(e), t, a(e), n, r, s, i), t.targetStart = O, t.targetAnchor = O && o(O);
        else {
          t.anchor = o(e);
          let b = O;
          for (; b;) {
            if (b && b.nodeType === 8) {
              if (b.data === "teleport start anchor") t.targetStart = b;
              else if (b.data === "teleport anchor") {
                t.targetAnchor = b, h._lpa = t.targetAnchor && o(t.targetAnchor);
                break
              }
            }
            b = o(b)
          }
          t.targetAnchor || gl(h, t, u, c), f(O && o(O), t, h, n, r, s, i)
        } Js(t, m)
    }
    return t.anchor && o(t.anchor)
  }
  const Nd = hl;

  function Js(e, t) {
    const n = e.ctx;
    if (n && n.ut) {
      let r, s;
      for (t ? (r = e.el, s = e.anchor) : (r = e.targetStart, s = e.targetAnchor); r && r !== s;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
      n.ut()
    }
  }

  function gl(e, t, n, r) {
    const s = t.targetStart = n(""),
      i = t.targetAnchor = n("");
    return s[ul] = i, e && (r(s, e), r(i, e)), i
  }

  function qi(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, qi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
  } /*! #__NO_SIDE_EFFECTS__ */
  function ie(e, t) {
    return z(e) ? Qe({
      name: e.name
    }, t, {
      setup: e
    }) : e
  }

  function ml(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
  }

  function Zs(e, t, n, r, s = !1) {
    if (Y(e)) {
      e.forEach((O, b) => Zs(O, t && (Y(t) ? t[b] : t), n, r, s));
      return
    }
    if (mr(r) && !s) {
      r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && Zs(e, t, n, r.component.subTree);
      return
    }
    const i = r.shapeFlag & 4 ? co(r.component) : r.el,
      o = s ? null : i,
      {
        i: a,
        r: l
      } = e,
      c = t && t.r,
      u = a.refs === J ? a.refs = {} : a.refs,
      f = a.setupState,
      h = ue(f),
      m = f === J ? () => !1 : O => fe(h, O);
    if (c != null && c !== l && (_e(c) ? (u[c] = null, m(c) && (f[c] = null)) : Oe(c) && (c.value = null)), z(l)) pr(l, a, 12, [o, u]);
    else {
      const O = _e(l),
        b = Oe(l);
      if (O || b) {
        const E = () => {
          if (e.f) {
            const g = O ? m(l) ? f[l] : u[l] : l.value;
            s ? Y(g) && Ii(g, i) : Y(g) ? g.includes(i) || g.push(i) : O ? (u[l] = [i], m(l) && (f[l] = u[l])) : (l.value = [i], e.k && (u[e.k] = l.value))
          } else O ? (u[l] = o, m(l) && (f[l] = o)) : b && (l.value = o, e.k && (u[e.k] = o))
        };
        o ? (E.id = -1, Ze(E, n)) : E()
      }
    }
  }
  Ms().requestIdleCallback, Ms().cancelIdleCallback;
  const mr = e => !!e.type.__asyncLoader,
    wl = e => e.type.__isKeepAlive;

  function Dd(e, t) {
    bl(e, "a", t)
  }

  function Md(e, t) {
    bl(e, "da", t)
  }

  function bl(e, t, n = Fe) {
    const r = e.__wdc || (e.__wdc = () => {
      let s = n;
      for (; s;) {
        if (s.isDeactivated) return;
        s = s.parent
      }
      return e()
    });
    if (ei(t, r, n), n) {
      let s = n.parent;
      for (; s && s.parent;) wl(s.parent.vnode) && Fd(r, t, n, s), s = s.parent
    }
  }

  function Fd(e, t, n, r) {
    const s = ei(t, e, r, !0);
    vn(() => {
      Ii(r[t], s)
    }, n)
  }

  function ei(e, t, n = Fe, r = !1) {
    if (n) {
      const s = n[e] || (n[e] = []),
        i = t.__weh || (t.__weh = (...o) => {
          Dt();
          const a = cs(n),
            l = Ft(t, n, e, o);
          return a(), Mt(), l
        });
      return r ? s.unshift(i) : s.push(i), i
    }
  }
  const en = e => (t, n = Fe) => {
      (!us || e === "sp") && ei(e, (...r) => t(...r), n)
    },
    $d = en("bm"),
    bn = en("m"),
    vl = en("bu"),
    yl = en("u"),
    Ud = en("bum"),
    vn = en("um"),
    jd = en("sp"),
    Vd = en("rtg"),
    Wd = en("rtc");

  function Hd(e, t = Fe) {
    ei("ec", e, t)
  }
  const Bd = "components",
    _l = Symbol.for("v-ndc");

  function xl(e) {
    return _e(e) ? Kd(Bd, e, !1) || e : e || _l
  }

  function Kd(e, t, n = !0, r = !1) {
    const s = Ve || Fe;
    if (s) {
      const i = s.type;
      {
        const a = nc(i, !1);
        if (a && (a === t || a === ot(t) || a === Ns(ot(t)))) return i
      }
      const o = El(s[e] || i[e], t) || El(s.appContext[e], t);
      return !o && r ? i : o
    }
  }

  function El(e, t) {
    return e && (e[t] || e[ot(t)] || e[Ns(ot(t))])
  }

  function Qd(e, t, n, r) {
    let s;
    const i = n,
      o = Y(e);
    if (o || _e(e)) {
      const a = o && dr(e);
      let l = !1,
        c = !1;
      a && (l = !bt(e), c = gn(e), e = $s(e)), s = new Array(e.length);
      for (let u = 0, f = e.length; u < f; u++) s[u] = t(l ? c ? Hs(je(e[u])) : je(e[u]) : e[u], u, void 0, i)
    } else if (typeof e == "number") {
      s = new Array(e);
      for (let a = 0; a < e; a++) s[a] = t(a + 1, a, void 0, i)
    } else if (ve(e))
      if (e[Symbol.iterator]) s = Array.from(e, (a, l) => t(a, l, void 0, i));
      else {
        const a = Object.keys(e);
        s = new Array(a.length);
        for (let l = 0, c = a.length; l < c; l++) {
          const u = a[l];
          s[l] = t(e[u], u, l, i)
        }
      }
    else s = [];
    return s
  }

  function We(e, t, n = {}, r, s) {
    if (Ve.ce || Ve.parent && mr(Ve.parent) && Ve.parent.ce) return Q(), oe(Me, null, [he("slot", n, r)], 64);
    let i = e[t];
    i && i._c && (i._d = !1), Q();
    const o = i && Tl(i(n)),
      a = n.key || o && o.key,
      l = oe(Me, {
        key: (a && !zt(a) ? a : `_${t}`) + ""
      }, o || [], o && e._ === 1 ? 64 : -2);
    return l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l
  }

  function Tl(e) {
    return e.some(t => wr(t) ? !(t.type === Ut || t.type === Me && !Tl(t.children)) : !0) ? e : null
  }
  const Yi = e => e ? Zl(e) ? co(e) : Yi(e.parent) : null,
    ns = Qe(Object.create(null), {
      $: e => e,
      $el: e => e.vnode.el,
      $data: e => e.data,
      $props: e => e.props,
      $attrs: e => e.attrs,
      $slots: e => e.slots,
      $refs: e => e.refs,
      $parent: e => Yi(e.parent),
      $root: e => Yi(e.root),
      $host: e => e.ce,
      $emit: e => e.emit,
      $options: e => Al(e),
      $forceUpdate: e => e.f || (e.f = () => {
        Qi(e.update)
      }),
      $nextTick: e => e.n || (e.n = Ys.bind(e.proxy)),
      $watch: e => hp.bind(e)
    }),
    zi = (e, t) => e !== J && !e.__isScriptSetup && fe(e, t),
    Gd = {
      get({
        _: e
      }, t) {
        if (t === "__v_skip") return !0;
        const {
          ctx: n,
          setupState: r,
          data: s,
          props: i,
          accessCache: o,
          type: a,
          appContext: l
        } = e;
        let c;
        if (t[0] !== "$") {
          const m = o[t];
          if (m !== void 0) switch (m) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return i[t]
          } else {
            if (zi(r, t)) return o[t] = 1, r[t];
            if (s !== J && fe(s, t)) return o[t] = 2, s[t];
            if ((c = e.propsOptions[0]) && fe(c, t)) return o[t] = 3, i[t];
            if (n !== J && fe(n, t)) return o[t] = 4, n[t];
            Xi && (o[t] = 0)
          }
        }
        const u = ns[t];
        let f, h;
        if (u) return t === "$attrs" && qe(e.attrs, "get", ""), u(e);
        if ((f = a.__cssModules) && (f = f[t])) return f;
        if (n !== J && fe(n, t)) return o[t] = 4, n[t];
        if (h = l.config.globalProperties, fe(h, t)) return h[t]
      },
      set({
        _: e
      }, t, n) {
        const {
          data: r,
          setupState: s,
          ctx: i
        } = e;
        return zi(s, t) ? (s[t] = n, !0) : r !== J && fe(r, t) ? (r[t] = n, !0) : fe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
      },
      has({
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: i
        }
      }, o) {
        let a;
        return !!n[o] || e !== J && fe(e, o) || zi(t, o) || (a = i[0]) && fe(a, o) || fe(r, o) || fe(ns, o) || fe(s.config.globalProperties, o)
      },
      defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : fe(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
      }
    };

  function Cl(e) {
    return Y(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
  }
  let Xi = !0;

  function qd(e) {
    const t = Al(e),
      n = e.proxy,
      r = e.ctx;
    Xi = !1, t.beforeCreate && Sl(t.beforeCreate, e, "bc");
    const {
      data: s,
      computed: i,
      methods: o,
      watch: a,
      provide: l,
      inject: c,
      created: u,
      beforeMount: f,
      mounted: h,
      beforeUpdate: m,
      updated: O,
      activated: b,
      deactivated: E,
      beforeDestroy: g,
      beforeUnmount: x,
      destroyed: S,
      unmounted: v,
      render: I,
      renderTracked: R,
      renderTriggered: k,
      errorCaptured: V,
      serverPrefetch: U,
      expose: K,
      inheritAttrs: ne,
      components: H,
      directives: be,
      filters: Ke
    } = t;
    if (c && Yd(c, r, null), o)
      for (const pe in o) {
        const ce = o[pe];
        z(ce) && (r[pe] = ce.bind(n))
      }
    if (s) {
      const pe = s.call(n, n);
      ve(pe) && (e.data = Zt(pe))
    }
    if (Xi = !0, i)
      for (const pe in i) {
        const ce = i[pe],
          Se = z(ce) ? ce.bind(n, n) : z(ce.get) ? ce.get.bind(n, n) : wt,
          Et = !z(ce) && z(ce.set) ? ce.set.bind(n) : wt,
          Ie = ee({
            get: Se,
            set: Et
          });
        Object.defineProperty(r, pe, {
          enumerable: !0,
          configurable: !0,
          get: () => Ie.value,
          set: ft => Ie.value = ft
        })
      }
    if (a)
      for (const pe in a) Ol(a[pe], r, n, pe);
    if (l) {
      const pe = z(l) ? l.call(n) : l;
      Reflect.ownKeys(pe).forEach(ce => {
        Zi(ce, pe[ce])
      })
    }
    u && Sl(u, e, "c");

    function Ee(pe, ce) {
      Y(ce) ? ce.forEach(Se => pe(Se.bind(n))) : ce && pe(ce.bind(n))
    }
    if (Ee($d, f), Ee(bn, h), Ee(vl, m), Ee(yl, O), Ee(Dd, b), Ee(Md, E), Ee(Hd, V), Ee(Wd, R), Ee(Vd, k), Ee(Ud, x), Ee(vn, v), Ee(jd, U), Y(K))
      if (K.length) {
        const pe = e.exposed || (e.exposed = {});
        K.forEach(ce => {
          Object.defineProperty(pe, ce, {
            get: () => n[ce],
            set: Se => n[ce] = Se
          })
        })
      } else e.exposed || (e.exposed = {});
    I && e.render === wt && (e.render = I), ne != null && (e.inheritAttrs = ne), H && (e.components = H), be && (e.directives = be), U && ml(e)
  }

  function Yd(e, t, n = wt) {
    Y(e) && (e = Ji(e));
    for (const r in e) {
      const s = e[r];
      let i;
      ve(s) ? "default" in s ? i = yn(s.from || r, s.default, !0) : i = yn(s.from || r) : i = yn(s), Oe(i) ? Object.defineProperty(t, r, {
        enumerable: !0,
        configurable: !0,
        get: () => i.value,
        set: o => i.value = o
      }) : t[r] = i
    }
  }

  function Sl(e, t, n) {
    Ft(Y(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
  }

  function Ol(e, t, n, r) {
    let s = r.includes(".") ? Bl(n, r) : () => n[r];
    if (_e(e)) {
      const i = t[e];
      z(i) && Ce(s, i)
    } else if (z(e)) Ce(s, e.bind(n));
    else if (ve(e))
      if (Y(e)) e.forEach(i => Ol(i, t, n, r));
      else {
        const i = z(e.handler) ? e.handler.bind(n) : t[e.handler];
        z(i) && Ce(s, i, e)
      }
  }

  function Al(e) {
    const t = e.type,
      {
        mixins: n,
        extends: r
      } = t,
      {
        mixins: s,
        optionsCache: i,
        config: {
          optionMergeStrategies: o
        }
      } = e.appContext,
      a = i.get(t);
    let l;
    return a ? l = a : !s.length && !n && !r ? l = t : (l = {}, s.length && s.forEach(c => ti(l, c, o, !0)), ti(l, t, o)), ve(t) && i.set(t, l), l
  }

  function ti(e, t, n, r = !1) {
    const {
      mixins: s,
      extends: i
    } = t;
    i && ti(e, i, n, !0), s && s.forEach(o => ti(e, o, n, !0));
    for (const o in t)
      if (!(r && o === "expose")) {
        const a = zd[o] || n && n[o];
        e[o] = a ? a(e[o], t[o]) : t[o]
      } return e
  }
  const zd = {
    data: Il,
    props: Pl,
    emits: Pl,
    methods: rs,
    computed: rs,
    beforeCreate: Je,
    created: Je,
    beforeMount: Je,
    mounted: Je,
    beforeUpdate: Je,
    updated: Je,
    beforeDestroy: Je,
    beforeUnmount: Je,
    destroyed: Je,
    unmounted: Je,
    activated: Je,
    deactivated: Je,
    errorCaptured: Je,
    serverPrefetch: Je,
    components: rs,
    directives: rs,
    watch: Jd,
    provide: Il,
    inject: Xd
  };

  function Il(e, t) {
    return t ? e ? function() {
      return Qe(z(e) ? e.call(this, this) : e, z(t) ? t.call(this, this) : t)
    } : t : e
  }

  function Xd(e, t) {
    return rs(Ji(e), Ji(t))
  }

  function Ji(e) {
    if (Y(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t
    }
    return e
  }

  function Je(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
  }

  function rs(e, t) {
    return e ? Qe(Object.create(null), e, t) : t
  }

  function Pl(e, t) {
    return e ? Y(e) && Y(t) ? [...new Set([...e, ...t])] : Qe(Object.create(null), Cl(e), Cl(t ?? {})) : t
  }

  function Jd(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Qe(Object.create(null), e);
    for (const r in t) n[r] = Je(e[r], t[r]);
    return n
  }

  function Ll() {
    return {
      app: null,
      config: {
        isNativeTag: Ff,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap,
      propsCache: new WeakMap,
      emitsCache: new WeakMap
    }
  }
  let Zd = 0;

  function ep(e, t) {
    return function(r, s = null) {
      z(r) || (r = Qe({}, r)), s != null && !ve(s) && (s = null);
      const i = Ll(),
        o = new WeakSet,
        a = [];
      let l = !1;
      const c = i.app = {
        _uid: Zd++,
        _component: r,
        _props: s,
        _container: null,
        _context: i,
        _instance: null,
        version: Np,
        get config() {
          return i.config
        },
        set config(u) {},
        use(u, ...f) {
          return o.has(u) || (u && z(u.install) ? (o.add(u), u.install(c, ...f)) : z(u) && (o.add(u), u(c, ...f))), c
        },
        mixin(u) {
          return i.mixins.includes(u) || i.mixins.push(u), c
        },
        component(u, f) {
          return f ? (i.components[u] = f, c) : i.components[u]
        },
        directive(u, f) {
          return f ? (i.directives[u] = f, c) : i.directives[u]
        },
        mount(u, f, h) {
          if (!l) {
            const m = c._ceVNode || he(r, s);
            return m.appContext = i, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(m, u, h), l = !0, c._container = u, u.__vue_app__ = c, co(m.component)
          }
        },
        onUnmount(u) {
          a.push(u)
        },
        unmount() {
          l && (Ft(a, c._instance, 16), e(null, c._container), delete c._container.__vue_app__)
        },
        provide(u, f) {
          return i.provides[u] = f, c
        },
        runWithContext(u) {
          const f = zn;
          zn = c;
          try {
            return u()
          } finally {
            zn = f
          }
        }
      };
      return c
    }
  }
  let zn = null;

  function Zi(e, t) {
    if (Fe) {
      let n = Fe.provides;
      const r = Fe.parent && Fe.parent.provides;
      r === n && (n = Fe.provides = Object.create(r)), n[e] = t
    }
  }

  function yn(e, t, n = !1) {
    const r = Fe || Ve;
    if (r || zn) {
      let s = zn ? zn._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
      if (s && e in s) return s[e];
      if (arguments.length > 1) return n && z(t) ? t.call(r && r.proxy) : t
    }
  }

  function tp() {
    return !!(Fe || Ve || zn)
  }
  const kl = {},
    Rl = () => Object.create(kl),
    Nl = e => Object.getPrototypeOf(e) === kl;

  function np(e, t, n, r = !1) {
    const s = {},
      i = Rl();
    e.propsDefaults = Object.create(null), Dl(e, t, s, i);
    for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
    n ? e.props = r ? s : Za(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i
  }

  function rp(e, t, n, r) {
    const {
      props: s,
      attrs: i,
      vnode: {
        patchFlag: o
      }
    } = e, a = ue(s), [l] = e.propsOptions;
    let c = !1;
    if ((r || o > 0) && !(o & 16)) {
      if (o & 8) {
        const u = e.vnode.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          let h = u[f];
          if (ni(e.emitsOptions, h)) continue;
          const m = t[h];
          if (l)
            if (fe(i, h)) m !== i[h] && (i[h] = m, c = !0);
            else {
              const O = ot(h);
              s[O] = eo(l, a, O, m, e, !1)
            }
          else m !== i[h] && (i[h] = m, c = !0)
        }
      }
    } else {
      Dl(e, t, s, i) && (c = !0);
      let u;
      for (const f in a)(!t || !fe(t, f) && ((u = Kn(f)) === f || !fe(t, u))) && (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (s[f] = eo(l, a, f, void 0, e, !0)) : delete s[f]);
      if (i !== a)
        for (const f in i)(!t || !fe(t, f)) && (delete i[f], c = !0)
    }
    c && Xt(e.attrs, "set", "")
  }

  function Dl(e, t, n, r) {
    const [s, i] = e.propsOptions;
    let o = !1,
      a;
    if (t)
      for (let l in t) {
        if (Kr(l)) continue;
        const c = t[l];
        let u;
        s && fe(s, u = ot(l)) ? !i || !i.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : ni(e.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, o = !0)
      }
    if (i) {
      const l = ue(n),
        c = a || J;
      for (let u = 0; u < i.length; u++) {
        const f = i[u];
        n[f] = eo(s, l, f, c[f], e, !fe(c, f))
      }
    }
    return o
  }

  function eo(e, t, n, r, s, i) {
    const o = e[n];
    if (o != null) {
      const a = fe(o, "default");
      if (a && r === void 0) {
        const l = o.default;
        if (o.type !== Function && !o.skipFactory && z(l)) {
          const {
            propsDefaults: c
          } = s;
          if (n in c) r = c[n];
          else {
            const u = cs(s);
            r = c[n] = l.call(null, t), u()
          }
        } else r = l;
        s.ce && s.ce._setProp(n, r)
      }
      o[0] && (i && !a ? r = !1 : o[1] && (r === "" || r === Kn(n)) && (r = !0))
    }
    return r
  }
  const sp = new WeakMap;

  function Ml(e, t, n = !1) {
    const r = n ? sp : t.propsCache,
      s = r.get(e);
    if (s) return s;
    const i = e.props,
      o = {},
      a = [];
    let l = !1;
    if (!z(e)) {
      const u = f => {
        l = !0;
        const [h, m] = Ml(f, t, !0);
        Qe(o, h), m && a.push(...m)
      };
      !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    if (!i && !l) return ve(e) && r.set(e, Ct), Ct;
    if (Y(i))
      for (let u = 0; u < i.length; u++) {
        const f = ot(i[u]);
        Fl(f) && (o[f] = J)
      } else if (i)
        for (const u in i) {
          const f = ot(u);
          if (Fl(f)) {
            const h = i[u],
              m = o[f] = Y(h) || z(h) ? {
                type: h
              } : Qe({}, h),
              O = m.type;
            let b = !1,
              E = !0;
            if (Y(O))
              for (let g = 0; g < O.length; ++g) {
                const x = O[g],
                  S = z(x) && x.name;
                if (S === "Boolean") {
                  b = !0;
                  break
                } else S === "String" && (E = !1)
              } else b = z(O) && O.name === "Boolean";
            m[0] = b, m[1] = E, (b || fe(m, "default")) && a.push(f)
          }
        }
    const c = [o, a];
    return ve(e) && r.set(e, c), c
  }

  function Fl(e) {
    return e[0] !== "$" && !Kr(e)
  }
  const to = e => e[0] === "_" || e === "$stable",
    no = e => Y(e) ? e.map(jt) : [jt(e)],
    ip = (e, t, n) => {
      if (t._n) return t;
      const r = me((...s) => no(t(...s)), n);
      return r._c = !1, r
    },
    $l = (e, t, n) => {
      const r = e._ctx;
      for (const s in e) {
        if (to(s)) continue;
        const i = e[s];
        if (z(i)) t[s] = ip(s, i, r);
        else if (i != null) {
          const o = no(i);
          t[s] = () => o
        }
      }
    },
    Ul = (e, t) => {
      const n = no(t);
      e.slots.default = () => n
    },
    jl = (e, t, n) => {
      for (const r in t)(n || !to(r)) && (e[r] = t[r])
    },
    op = (e, t, n) => {
      const r = e.slots = Rl();
      if (e.vnode.shapeFlag & 32) {
        const s = t._;
        s ? (jl(r, t, n), n && Sa(r, "_", s, !0)) : $l(t, r)
      } else t && Ul(e, t)
    },
    ap = (e, t, n) => {
      const {
        vnode: r,
        slots: s
      } = e;
      let i = !0,
        o = J;
      if (r.shapeFlag & 32) {
        const a = t._;
        a ? n && a === 1 ? i = !1 : jl(s, t, n) : (i = !t.$stable, $l(t, s)), o = t
      } else t && (Ul(e, t), o = {
        default: 1
      });
      if (i)
        for (const a in s) !to(a) && o[a] == null && delete s[a]
    },
    Ze = _p;

  function lp(e) {
    return cp(e)
  }

  function cp(e, t) {
    const n = Ms();
    n.__VUE__ = !0;
    const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: o,
      createText: a,
      createComment: l,
      setText: c,
      setElementText: u,
      parentNode: f,
      nextSibling: h,
      setScopeId: m = wt,
      insertStaticContent: O
    } = e, b = (w, y, L, F = null, M = null, $ = null, d = void 0, p = null, C = !!y.dynamicChildren) => {
      if (w === y) return;
      w && !as(w, y) && (F = Wn(w), ft(w, M, $, !0), w = null), y.patchFlag === -2 && (C = !1, y.dynamicChildren = null);
      const {
        type: A,
        ref: j,
        shapeFlag: N
      } = y;
      switch (A) {
        case ss:
          E(w, y, L, F);
          break;
        case Ut:
          g(w, y, L, F);
          break;
        case oo:
          w == null && x(y, L, F, d);
          break;
        case Me:
          H(w, y, L, F, M, $, d, p, C);
          break;
        default:
          N & 1 ? I(w, y, L, F, M, $, d, p, C) : N & 6 ? be(w, y, L, F, M, $, d, p, C) : (N & 64 || N & 128) && A.process(w, y, L, F, M, $, d, p, C, dn)
      }
      j != null && M && Zs(j, w && w.ref, $, y || w, !y)
    }, E = (w, y, L, F) => {
      if (w == null) r(y.el = a(y.children), L, F);
      else {
        const M = y.el = w.el;
        y.children !== w.children && c(M, y.children)
      }
    }, g = (w, y, L, F) => {
      w == null ? r(y.el = l(y.children || ""), L, F) : y.el = w.el
    }, x = (w, y, L, F) => {
      [w.el, w.anchor] = O(w.children, y, L, F, w.el, w.anchor)
    }, S = ({
      el: w,
      anchor: y
    }, L, F) => {
      let M;
      for (; w && w !== y;) M = h(w), r(w, L, F), w = M;
      r(y, L, F)
    }, v = ({
      el: w,
      anchor: y
    }) => {
      let L;
      for (; w && w !== y;) L = h(w), s(w), w = L;
      s(y)
    }, I = (w, y, L, F, M, $, d, p, C) => {
      y.type === "svg" ? d = "svg" : y.type === "math" && (d = "mathml"), w == null ? R(y, L, F, M, $, d, p, C) : U(w, y, M, $, d, p, C)
    }, R = (w, y, L, F, M, $, d, p) => {
      let C, A;
      const {
        props: j,
        shapeFlag: N,
        transition: T,
        dirs: P
      } = w;
      if (C = w.el = o(w.type, $, j && j.is, j), N & 8 ? u(C, w.children) : N & 16 && V(w.children, C, null, F, M, ro(w, $), d, p), P && Yn(w, null, F, "created"), k(C, w, w.scopeId, d, F), j) {
        for (const G in j) G !== "value" && !Kr(G) && i(C, G, null, j[G], $, F);
        "value" in j && i(C, "value", null, j.value, $), (A = j.onVnodeBeforeMount) && Vt(A, F, w)
      }
      P && Yn(w, null, F, "beforeMount");
      const B = up(M, T);
      B && T.beforeEnter(C), r(C, y, L), ((A = j && j.onVnodeMounted) || B || P) && Ze(() => {
        A && Vt(A, F, w), B && T.enter(C), P && Yn(w, null, F, "mounted")
      }, M)
    }, k = (w, y, L, F, M) => {
      if (L && m(w, L), F)
        for (let $ = 0; $ < F.length; $++) m(w, F[$]);
      if (M) {
        let $ = M.subTree;
        if (y === $ || ql($.type) && ($.ssContent === y || $.ssFallback === y)) {
          const d = M.vnode;
          k(w, d, d.scopeId, d.slotScopeIds, M.parent)
        }
      }
    }, V = (w, y, L, F, M, $, d, p, C = 0) => {
      for (let A = C; A < w.length; A++) {
        const j = w[A] = p ? _n(w[A]) : jt(w[A]);
        b(null, j, y, L, F, M, $, d, p)
      }
    }, U = (w, y, L, F, M, $, d) => {
      const p = y.el = w.el;
      let {
        patchFlag: C,
        dynamicChildren: A,
        dirs: j
      } = y;
      C |= w.patchFlag & 16;
      const N = w.props || J,
        T = y.props || J;
      let P;
      if (L && Xn(L, !1), (P = T.onVnodeBeforeUpdate) && Vt(P, L, y, w), j && Yn(y, w, L, "beforeUpdate"), L && Xn(L, !0), (N.innerHTML && T.innerHTML == null || N.textContent && T.textContent == null) && u(p, ""), A ? K(w.dynamicChildren, A, p, L, F, ro(y, M), $) : d || ce(w, y, p, null, L, F, ro(y, M), $, !1), C > 0) {
        if (C & 16) ne(p, N, T, L, M);
        else if (C & 2 && N.class !== T.class && i(p, "class", null, T.class, M), C & 4 && i(p, "style", N.style, T.style, M), C & 8) {
          const B = y.dynamicProps;
          for (let G = 0; G < B.length; G++) {
            const se = B[G],
              Ue = N[se],
              Le = T[se];
            (Le !== Ue || se === "value") && i(p, se, Ue, Le, M, L)
          }
        }
        C & 1 && w.children !== y.children && u(p, y.children)
      } else !d && A == null && ne(p, N, T, L, M);
      ((P = T.onVnodeUpdated) || j) && Ze(() => {
        P && Vt(P, L, y, w), j && Yn(y, w, L, "updated")
      }, F)
    }, K = (w, y, L, F, M, $, d) => {
      for (let p = 0; p < y.length; p++) {
        const C = w[p],
          A = y[p],
          j = C.el && (C.type === Me || !as(C, A) || C.shapeFlag & 198) ? f(C.el) : L;
        b(C, A, j, null, F, M, $, d, !0)
      }
    }, ne = (w, y, L, F, M) => {
      if (y !== L) {
        if (y !== J)
          for (const $ in y) !Kr($) && !($ in L) && i(w, $, y[$], null, M, F);
        for (const $ in L) {
          if (Kr($)) continue;
          const d = L[$],
            p = y[$];
          d !== p && $ !== "value" && i(w, $, p, d, M, F)
        }
        "value" in L && i(w, "value", y.value, L.value, M)
      }
    }, H = (w, y, L, F, M, $, d, p, C) => {
      const A = y.el = w ? w.el : a(""),
        j = y.anchor = w ? w.anchor : a("");
      let {
        patchFlag: N,
        dynamicChildren: T,
        slotScopeIds: P
      } = y;
      P && (p = p ? p.concat(P) : P), w == null ? (r(A, L, F), r(j, L, F), V(y.children || [], L, j, M, $, d, p, C)) : N > 0 && N & 64 && T && w.dynamicChildren ? (K(w.dynamicChildren, T, L, M, $, d, p), (y.key != null || M && y === M.subTree) && so(w, y, !0)) : ce(w, y, L, j, M, $, d, p, C)
    }, be = (w, y, L, F, M, $, d, p, C) => {
      y.slotScopeIds = p, w == null ? y.shapeFlag & 512 ? M.ctx.activate(y, L, F, d, C) : Ke(y, L, F, M, $, d, C) : gt(w, y, C)
    }, Ke = (w, y, L, F, M, $, d) => {
      const p = w.component = Sp(w, F, M);
      if (wl(w) && (p.ctx.renderer = dn), Op(p, !1, d), p.asyncDep) {
        if (M && M.registerDep(p, Ee, d), !w.el) {
          const C = p.subTree = he(Ut);
          g(null, C, y, L)
        }
      } else Ee(p, w, y, L, M, $, d)
    }, gt = (w, y, L) => {
      const F = y.component = w.component;
      if (vp(w, y, L))
        if (F.asyncDep && !F.asyncResolved) {
          pe(F, y, L);
          return
        } else F.next = y, F.update();
      else y.el = w.el, F.vnode = y
    }, Ee = (w, y, L, F, M, $, d) => {
      const p = () => {
        if (w.isMounted) {
          let {
            next: N,
            bu: T,
            u: P,
            parent: B,
            vnode: G
          } = w;
          {
            const Nt = Vl(w);
            if (Nt) {
              N && (N.el = G.el, pe(w, N, d)), Nt.asyncDep.then(() => {
                w.isUnmounted || p()
              });
              return
            }
          }
          let se = N,
            Ue;
          Xn(w, !1), N ? (N.el = G.el, pe(w, N, d)) : N = G, T && Li(T), (Ue = N.props && N.props.onVnodeBeforeUpdate) && Vt(Ue, B, N, G), Xn(w, !0);
          const Le = Ql(w),
            Tt = w.subTree;
          w.subTree = Le, b(Tt, Le, f(Tt.el), Wn(Tt), w, M, $), N.el = Le.el, se === null && yp(w, Le.el), P && Ze(P, M), (Ue = N.props && N.props.onVnodeUpdated) && Ze(() => Vt(Ue, B, N, G), M)
        } else {
          let N;
          const {
            el: T,
            props: P
          } = y, {
            bm: B,
            m: G,
            parent: se,
            root: Ue,
            type: Le
          } = w, Tt = mr(y);
          Xn(w, !1), B && Li(B), !Tt && (N = P && P.onVnodeBeforeMount) && Vt(N, se, y), Xn(w, !0);
          {
            Ue.ce && Ue.ce._injectChildStyle(Le);
            const Nt = w.subTree = Ql(w);
            b(null, Nt, L, F, w, M, $), y.el = Nt.el
          }
          if (G && Ze(G, M), !Tt && (N = P && P.onVnodeMounted)) {
            const Nt = y;
            Ze(() => Vt(N, se, Nt), M)
          }(y.shapeFlag & 256 || se && mr(se.vnode) && se.vnode.shapeFlag & 256) && w.a && Ze(w.a, M), w.isMounted = !0, y = L = F = null
        }
      };
      w.scope.on();
      const C = w.effect = new Da(p);
      w.scope.off();
      const A = w.update = C.run.bind(C),
        j = w.job = C.runIfDirty.bind(C);
      j.i = w, j.id = w.uid, C.scheduler = () => Qi(j), Xn(w, !0), A()
    }, pe = (w, y, L) => {
      y.component = w;
      const F = w.vnode.props;
      w.vnode = y, w.next = null, rp(w, y.props, F, L), ap(w, y.children, L), Dt(), ol(w), Mt()
    }, ce = (w, y, L, F, M, $, d, p, C = !1) => {
      const A = w && w.children,
        j = w ? w.shapeFlag : 0,
        N = y.children,
        {
          patchFlag: T,
          shapeFlag: P
        } = y;
      if (T > 0) {
        if (T & 128) {
          Et(A, N, L, F, M, $, d, p, C);
          return
        } else if (T & 256) {
          Se(A, N, L, F, M, $, d, p, C);
          return
        }
      }
      P & 8 ? (j & 16 && fn(A, M, $), N !== A && u(L, N)) : j & 16 ? P & 16 ? Et(A, N, L, F, M, $, d, p, C) : fn(A, M, $, !0) : (j & 8 && u(L, ""), P & 16 && V(N, L, F, M, $, d, p, C))
    }, Se = (w, y, L, F, M, $, d, p, C) => {
      w = w || Ct, y = y || Ct;
      const A = w.length,
        j = y.length,
        N = Math.min(A, j);
      let T;
      for (T = 0; T < N; T++) {
        const P = y[T] = C ? _n(y[T]) : jt(y[T]);
        b(w[T], P, L, null, M, $, d, p, C)
      }
      A > j ? fn(w, M, $, !0, !1, N) : V(y, L, F, M, $, d, p, C, N)
    }, Et = (w, y, L, F, M, $, d, p, C) => {
      let A = 0;
      const j = y.length;
      let N = w.length - 1,
        T = j - 1;
      for (; A <= N && A <= T;) {
        const P = w[A],
          B = y[A] = C ? _n(y[A]) : jt(y[A]);
        if (as(P, B)) b(P, B, L, null, M, $, d, p, C);
        else break;
        A++
      }
      for (; A <= N && A <= T;) {
        const P = w[N],
          B = y[T] = C ? _n(y[T]) : jt(y[T]);
        if (as(P, B)) b(P, B, L, null, M, $, d, p, C);
        else break;
        N--, T--
      }
      if (A > N) {
        if (A <= T) {
          const P = T + 1,
            B = P < j ? y[P].el : F;
          for (; A <= T;) b(null, y[A] = C ? _n(y[A]) : jt(y[A]), L, B, M, $, d, p, C), A++
        }
      } else if (A > T)
        for (; A <= N;) ft(w[A], M, $, !0), A++;
      else {
        const P = A,
          B = A,
          G = new Map;
        for (A = B; A <= T; A++) {
          const mt = y[A] = C ? _n(y[A]) : jt(y[A]);
          mt.key != null && G.set(mt.key, A)
        }
        let se, Ue = 0;
        const Le = T - B + 1;
        let Tt = !1,
          Nt = 0;
        const Is = new Array(Le);
        for (A = 0; A < Le; A++) Is[A] = 0;
        for (A = P; A <= N; A++) {
          const mt = w[A];
          if (Ue >= Le) {
            ft(mt, M, $, !0);
            continue
          }
          let Yt;
          if (mt.key != null) Yt = G.get(mt.key);
          else
            for (se = B; se <= T; se++)
              if (Is[se - B] === 0 && as(mt, y[se])) {
                Yt = se;
                break
              } Yt === void 0 ? ft(mt, M, $, !0) : (Is[Yt - B] = A + 1, Yt >= Nt ? Nt = Yt : Tt = !0, b(mt, y[Yt], L, null, M, $, d, p, C), Ue++)
        }
        const Rf = Tt ? fp(Is) : Ct;
        for (se = Rf.length - 1, A = Le - 1; A >= 0; A--) {
          const mt = B + A,
            Yt = y[mt],
            Nf = mt + 1 < j ? y[mt + 1].el : F;
          Is[A] === 0 ? b(null, Yt, L, Nf, M, $, d, p, C) : Tt && (se < 0 || A !== Rf[se] ? Ie(Yt, L, Nf, 2) : se--)
        }
      }
    }, Ie = (w, y, L, F, M = null) => {
      const {
        el: $,
        type: d,
        transition: p,
        children: C,
        shapeFlag: A
      } = w;
      if (A & 6) {
        Ie(w.component.subTree, y, L, F);
        return
      }
      if (A & 128) {
        w.suspense.move(y, L, F);
        return
      }
      if (A & 64) {
        d.move(w, y, L, dn);
        return
      }
      if (d === Me) {
        r($, y, L);
        for (let N = 0; N < C.length; N++) Ie(C[N], y, L, F);
        r(w.anchor, y, L);
        return
      }
      if (d === oo) {
        S(w, y, L);
        return
      }
      if (F !== 2 && A & 1 && p)
        if (F === 0) p.beforeEnter($), r($, y, L), Ze(() => p.enter($), M);
        else {
          const {
            leave: N,
            delayLeave: T,
            afterLeave: P
          } = p, B = () => {
            w.ctx.isUnmounted ? s($) : r($, y, L)
          }, G = () => {
            N($, () => {
              B(), P && P()
            })
          };
          T ? T($, B, G) : G()
        }
      else r($, y, L)
    }, ft = (w, y, L, F = !1, M = !1) => {
      const {
        type: $,
        props: d,
        ref: p,
        children: C,
        dynamicChildren: A,
        shapeFlag: j,
        patchFlag: N,
        dirs: T,
        cacheIndex: P
      } = w;
      if (N === -2 && (M = !1), p != null && (Dt(), Zs(p, null, L, w, !0), Mt()), P != null && (y.renderCache[P] = void 0), j & 256) {
        y.ctx.deactivate(w);
        return
      }
      const B = j & 1 && T,
        G = !mr(w);
      let se;
      if (G && (se = d && d.onVnodeBeforeUnmount) && Vt(se, y, w), j & 6) Ci(w.component, L, F);
      else {
        if (j & 128) {
          w.suspense.unmount(L, F);
          return
        }
        B && Yn(w, null, y, "beforeUnmount"), j & 64 ? w.type.remove(w, y, L, dn, F) : A && !A.hasOnce && ($ !== Me || N > 0 && N & 64) ? fn(A, y, L, !1, !0) : ($ === Me && N & 384 || !M && j & 16) && fn(C, y, L), F && Hr(w)
      }(G && (se = d && d.onVnodeUnmounted) || B) && Ze(() => {
        se && Vt(se, y, w), B && Yn(w, null, y, "unmounted")
      }, L)
    }, Hr = w => {
      const {
        type: y,
        el: L,
        anchor: F,
        transition: M
      } = w;
      if (y === Me) {
        As(L, F);
        return
      }
      if (y === oo) {
        v(w);
        return
      }
      const $ = () => {
        s(L), M && !M.persisted && M.afterLeave && M.afterLeave()
      };
      if (w.shapeFlag & 1 && M && !M.persisted) {
        const {
          leave: d,
          delayLeave: p
        } = M, C = () => d(L, $);
        p ? p(w.el, $, C) : C()
      } else $()
    }, As = (w, y) => {
      let L;
      for (; w !== y;) L = h(w), s(w), w = L;
      s(y)
    }, Ci = (w, y, L) => {
      const {
        bum: F,
        scope: M,
        job: $,
        subTree: d,
        um: p,
        m: C,
        a: A,
        parent: j,
        slots: {
          __: N
        }
      } = w;
      Wl(C), Wl(A), F && Li(F), j && Y(N) && N.forEach(T => {
        j.renderCache[T] = void 0
      }), M.stop(), $ && ($.flags |= 8, ft(d, w, y, L)), p && Ze(p, y), Ze(() => {
        w.isUnmounted = !0
      }, y), y && y.pendingBranch && !y.isUnmounted && w.asyncDep && !w.asyncResolved && w.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve())
    }, fn = (w, y, L, F = !1, M = !1, $ = 0) => {
      for (let d = $; d < w.length; d++) ft(w[d], y, L, F, M)
    }, Wn = w => {
      if (w.shapeFlag & 6) return Wn(w.component.subTree);
      if (w.shapeFlag & 128) return w.suspense.next();
      const y = h(w.anchor || w.el),
        L = y && y[ul];
      return L ? h(L) : y
    };
    let Hn = !1;
    const Br = (w, y, L) => {
        w == null ? y._vnode && ft(y._vnode, null, null, !0) : b(y._vnode || null, w, y, null, null, null, L), y._vnode = w, Hn || (Hn = !0, ol(), al(), Hn = !1)
      },
      dn = {
        p: b,
        um: ft,
        m: Ie,
        r: Hr,
        mt: Ke,
        mc: V,
        pc: ce,
        pbc: K,
        n: Wn,
        o: e
      };
    return {
      render: Br,
      hydrate: void 0,
      createApp: ep(Br)
    }
  }

  function ro({
    type: e,
    props: t
  }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
  }

  function Xn({
    effect: e,
    job: t
  }, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5)
  }

  function up(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
  }

  function so(e, t, n = !1) {
    const r = e.children,
      s = t.children;
    if (Y(r) && Y(s))
      for (let i = 0; i < r.length; i++) {
        const o = r[i];
        let a = s[i];
        a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[i] = _n(s[i]), a.el = o.el), !n && a.patchFlag !== -2 && so(o, a)), a.type === ss && (a.el = o.el), a.type === Ut && !a.el && (a.el = o.el)
      }
  }

  function fp(e) {
    const t = e.slice(),
      n = [0];
    let r, s, i, o, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
      const c = e[r];
      if (c !== 0) {
        if (s = n[n.length - 1], e[s] < c) {
          t[r] = s, n.push(r);
          continue
        }
        for (i = 0, o = n.length - 1; i < o;) a = i + o >> 1, e[n[a]] < c ? i = a + 1 : o = a;
        c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r)
      }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = t[o];
    return n
  }

  function Vl(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Vl(t)
  }

  function Wl(e) {
    if (e)
      for (let t = 0; t < e.length; t++) e[t].flags |= 8
  }
  const dp = Symbol.for("v-scx"),
    pp = () => yn(dp);

  function Hl(e, t) {
    return io(e, null, t)
  }

  function Ce(e, t, n) {
    return io(e, t, n)
  }

  function io(e, t, n = J) {
    const {
      immediate: r,
      deep: s,
      flush: i,
      once: o
    } = n, a = Qe({}, n), l = t && r || !t && i !== "post";
    let c;
    if (us) {
      if (i === "sync") {
        const m = pp();
        c = m.__watcherHandles || (m.__watcherHandles = [])
      } else if (!l) {
        const m = () => {};
        return m.stop = wt, m.resume = wt, m.pause = wt, m
      }
    }
    const u = Fe;
    a.call = (m, O, b) => Ft(m, u, O, b);
    let f = !1;
    i === "post" ? a.scheduler = m => {
      Ze(m, u && u.suspense)
    } : i !== "sync" && (f = !0, a.scheduler = (m, O) => {
      O ? m() : Qi(m)
    }), a.augmentJob = m => {
      t && (m.flags |= 4), f && (m.flags |= 2, u && (m.id = u.uid, m.i = u))
    };
    const h = Td(e, t, a);
    return us && (c ? c.push(h) : l && h()), h
  }

  function hp(e, t, n) {
    const r = this.proxy,
      s = _e(e) ? e.includes(".") ? Bl(r, e) : () => r[e] : e.bind(r, r);
    let i;
    z(t) ? i = t : (i = t.handler, n = t);
    const o = cs(this),
      a = io(s, i.bind(r), n);
    return o(), a
  }

  function Bl(e, t) {
    const n = t.split(".");
    return () => {
      let r = e;
      for (let s = 0; s < n.length && r; s++) r = r[n[s]];
      return r
    }
  }
  const gp = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ot(t)}Modifiers`] || e[`${Kn(t)}Modifiers`];

  function mp(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || J;
    let s = n;
    const i = t.startsWith("update:"),
      o = i && gp(r, t.slice(7));
    o && (o.trim && (s = n.map(u => _e(u) ? u.trim() : u)), o.number && (s = n.map(Wf)));
    let a, l = r[a = Ds(t)] || r[a = Ds(ot(t))];
    !l && i && (l = r[a = Ds(Kn(t))]), l && Ft(l, e, 6, s);
    const c = r[a + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[a]) return;
      e.emitted[a] = !0, Ft(c, e, 6, s)
    }
  }

  function Kl(e, t, n = !1) {
    const r = t.emitsCache,
      s = r.get(e);
    if (s !== void 0) return s;
    const i = e.emits;
    let o = {},
      a = !1;
    if (!z(e)) {
      const l = c => {
        const u = Kl(c, t, !0);
        u && (a = !0, Qe(o, u))
      };
      !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l)
    }
    return !i && !a ? (ve(e) && r.set(e, null), null) : (Y(i) ? i.forEach(l => o[l] = null) : Qe(o, i), ve(e) && r.set(e, o), o)
  }

  function ni(e, t) {
    return !e || !Ls(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Kn(t)) || fe(e, t))
  }

  function Ev() {}

  function Ql(e) {
    const {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: s,
      propsOptions: [i],
      slots: o,
      attrs: a,
      emit: l,
      render: c,
      renderCache: u,
      props: f,
      data: h,
      setupState: m,
      ctx: O,
      inheritAttrs: b
    } = e, E = zs(e);
    let g, x;
    try {
      if (n.shapeFlag & 4) {
        const v = s || r,
          I = v;
        g = jt(c.call(I, v, u, f, m, h, O)), x = a
      } else {
        const v = t;
        g = jt(v.length > 1 ? v(f, {
          attrs: a,
          slots: o,
          emit: l
        }) : v(f, null)), x = t.props ? a : wp(a)
      }
    } catch (v) {
      is.length = 0, Gs(v, e, 1), g = he(Ut)
    }
    let S = g;
    if (x && b !== !1) {
      const v = Object.keys(x),
        {
          shapeFlag: I
        } = S;
      v.length && I & 7 && (i && v.some(Ai) && (x = bp(x, i)), S = Jn(S, x, !1, !0))
    }
    return n.dirs && (S = Jn(S, null, !1, !0), S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs), n.transition && qi(S, n.transition), g = S, zs(E), g
  }
  const wp = e => {
      let t;
      for (const n in e)(n === "class" || n === "style" || Ls(n)) && ((t || (t = {}))[n] = e[n]);
      return t
    },
    bp = (e, t) => {
      const n = {};
      for (const r in e)(!Ai(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
      return n
    };

  function vp(e, t, n) {
    const {
      props: r,
      children: s,
      component: i
    } = e, {
      props: o,
      children: a,
      patchFlag: l
    } = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
      if (l & 1024) return !0;
      if (l & 16) return r ? Gl(r, o, c) : !!o;
      if (l & 8) {
        const u = t.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          const h = u[f];
          if (o[h] !== r[h] && !ni(c, h)) return !0
        }
      }
    } else return (s || a) && (!a || !a.$stable) ? !0 : r === o ? !1 : r ? o ? Gl(r, o, c) : !0 : !!o;
    return !1
  }

  function Gl(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      if (t[i] !== e[i] && !ni(n, i)) return !0
    }
    return !1
  }

  function yp({
    vnode: e,
    parent: t
  }, n) {
    for (; t;) {
      const r = t.subTree;
      if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)(e = t.vnode).el = n, t = t.parent;
      else break
    }
  }
  const ql = e => e.__isSuspense;

  function _p(e, t) {
    t && t.pendingBranch ? Y(e) ? t.effects.push(...e) : t.effects.push(e) : Ld(e)
  }
  const Me = Symbol.for("v-fgt"),
    ss = Symbol.for("v-txt"),
    Ut = Symbol.for("v-cmt"),
    oo = Symbol.for("v-stc"),
    is = [];
  let pt = null;

  function Q(e = !1) {
    is.push(pt = e ? null : [])
  }

  function xp() {
    is.pop(), pt = is[is.length - 1] || null
  }
  let os = 1;

  function Yl(e, t = !1) {
    os += e, e < 0 && pt && t && (pt.hasOnce = !0)
  }

  function zl(e) {
    return e.dynamicChildren = os > 0 ? pt || Ct : null, xp(), os > 0 && pt && pt.push(e), e
  }

  function He(e, t, n, r, s, i) {
    return zl(Ne(e, t, n, r, s, i, !0))
  }

  function oe(e, t, n, r, s) {
    return zl(he(e, t, n, r, s, !0))
  }

  function wr(e) {
    return e ? e.__v_isVNode === !0 : !1
  }

  function as(e, t) {
    return e.type === t.type && e.key === t.key
  }
  const Xl = ({
      key: e
    }) => e ?? null,
    ri = ({
      ref: e,
      ref_key: t,
      ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || Oe(e) || z(e) ? {
      i: Ve,
      r: e,
      k: t,
      f: !!n
    } : e : null);

  function Ne(e, t = null, n = null, r = 0, s = null, i = e === Me ? 0 : 1, o = !1, a = !1) {
    const l = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && Xl(t),
      ref: t && ri(t),
      scopeId: cl,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: i,
      patchFlag: r,
      dynamicProps: s,
      dynamicChildren: null,
      appContext: null,
      ctx: Ve
    };
    return a ? (ao(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= _e(n) ? 8 : 16), os > 0 && !o && pt && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && pt.push(l), l
  }
  const he = Ep;

  function Ep(e, t = null, n = null, r = 0, s = null, i = !1) {
    if ((!e || e === _l) && (e = Ut), wr(e)) {
      const a = Jn(e, t, !0);
      return n && ao(a, n), os > 0 && !i && pt && (a.shapeFlag & 6 ? pt[pt.indexOf(e)] = a : pt.push(a)), a.patchFlag = -2, a
    }
    if (Rp(e) && (e = e.__vccOpts), t) {
      t = si(t);
      let {
        class: a,
        style: l
      } = t;
      a && !_e(a) && (t.class = Qn(a)), ve(l) && (Bi(l) && !Y(l) && (l = Qe({}, l)), t.style = Qr(l))
    }
    const o = _e(e) ? 1 : ql(e) ? 128 : kd(e) ? 64 : ve(e) ? 4 : z(e) ? 2 : 0;
    return Ne(e, t, n, r, s, o, i, !0)
  }

  function si(e) {
    return e ? Bi(e) || Nl(e) ? Qe({}, e) : e : null
  }

  function Jn(e, t, n = !1, r = !1) {
    const {
      props: s,
      ref: i,
      patchFlag: o,
      children: a,
      transition: l
    } = e, c = t ? ht(s || {}, t) : s, u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: c,
      key: c && Xl(c),
      ref: t && t.ref ? n && i ? Y(i) ? i.concat(ri(t)) : [i, ri(t)] : ri(t) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: a,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Me ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: l,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Jn(e.ssContent),
      ssFallback: e.ssFallback && Jn(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce
    };
    return l && r && qi(u, l.clone(u)), u
  }

  function ls(e = " ", t = 0) {
    return he(ss, null, e, t)
  }

  function et(e = "", t = !1) {
    return t ? (Q(), oe(Ut, null, e)) : he(Ut, null, e)
  }

  function jt(e) {
    return e == null || typeof e == "boolean" ? he(Ut) : Y(e) ? he(Me, null, e.slice()) : wr(e) ? _n(e) : he(ss, null, String(e))
  }

  function _n(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Jn(e)
  }

  function ao(e, t) {
    let n = 0;
    const {
      shapeFlag: r
    } = e;
    if (t == null) t = null;
    else if (Y(t)) n = 16;
    else if (typeof t == "object")
      if (r & 65) {
        const s = t.default;
        s && (s._c && (s._d = !1), ao(e, s()), s._c && (s._d = !0));
        return
      } else {
        n = 32;
        const s = t._;
        !s && !Nl(t) ? t._ctx = Ve : s === 3 && Ve && (Ve.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
      }
    else z(t) ? (t = {
      default: t,
      _ctx: Ve
    }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ls(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
  }

  function ht(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const s in r)
        if (s === "class") t.class !== r.class && (t.class = Qn([t.class, r.class]));
        else if (s === "style") t.style = Qr([t.style, r.style]);
      else if (Ls(s)) {
        const i = t[s],
          o = r[s];
        o && i !== o && !(Y(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o)
      } else s !== "" && (t[s] = r[s])
    }
    return t
  }

  function Vt(e, t, n, r = null) {
    Ft(e, t, 7, [n, r])
  }
  const Tp = Ll();
  let Cp = 0;

  function Sp(e, t, n) {
    const r = e.type,
      s = (t ? t.appContext : e.appContext) || Tp,
      i = {
        uid: Cp++,
        vnode: e,
        type: r,
        parent: t,
        appContext: s,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new La(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(s.provides),
        ids: t ? t.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Ml(r, s),
        emitsOptions: Kl(r, s),
        emit: null,
        emitted: null,
        propsDefaults: J,
        inheritAttrs: r.inheritAttrs,
        ctx: J,
        data: J,
        props: J,
        attrs: J,
        slots: J,
        refs: J,
        setupState: J,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
    return i.ctx = {
      _: i
    }, i.root = t ? t.root : i, i.emit = mp.bind(null, i), e.ce && e.ce(i), i
  }
  let Fe = null;
  const xn = () => Fe || Ve;
  let ii, lo;
  {
    const e = Ms(),
      t = (n, r) => {
        let s;
        return (s = e[n]) || (s = e[n] = []), s.push(r), i => {
          s.length > 1 ? s.forEach(o => o(i)) : s[0](i)
        }
      };
    ii = t("__VUE_INSTANCE_SETTERS__", n => Fe = n), lo = t("__VUE_SSR_SETTERS__", n => us = n)
  }
  const cs = e => {
      const t = Fe;
      return ii(e), e.scope.on(), () => {
        e.scope.off(), ii(t)
      }
    },
    Jl = () => {
      Fe && Fe.scope.off(), ii(null)
    };

  function Zl(e) {
    return e.vnode.shapeFlag & 4
  }
  let us = !1;

  function Op(e, t = !1, n = !1) {
    t && lo(t);
    const {
      props: r,
      children: s
    } = e.vnode, i = Zl(e);
    np(e, r, i, t), op(e, s, n || t);
    const o = i ? Ap(e, t) : void 0;
    return t && lo(!1), o
  }

  function Ap(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, Gd);
    const {
      setup: r
    } = n;
    if (r) {
      Dt();
      const s = e.setupContext = r.length > 1 ? Pp(e) : null,
        i = cs(e),
        o = pr(r, e, 0, [e.props, s]),
        a = Ea(o);
      if (Mt(), i(), (a || e.sp) && !mr(e) && ml(e), a) {
        if (o.then(Jl, Jl), t) return o.then(l => {
          ec(e, l)
        }).catch(l => {
          Gs(l, e, 0)
        });
        e.asyncDep = o
      } else ec(e, o)
    } else tc(e)
  }

  function ec(e, t, n) {
    z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ve(t) && (e.setupState = tl(t)), tc(e)
  }

  function tc(e, t, n) {
    const r = e.type;
    e.render || (e.render = r.render || wt);
    {
      const s = cs(e);
      Dt();
      try {
        qd(e)
      } finally {
        Mt(), s()
      }
    }
  }
  const Ip = {
    get(e, t) {
      return qe(e, "get", ""), e[t]
    }
  };

  function Pp(e) {
    const t = n => {
      e.exposed = n || {}
    };
    return {
      attrs: new Proxy(e.attrs, Ip),
      slots: e.slots,
      emit: e.emit,
      expose: t
    }
  }

  function co(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(tl(hd(e.exposed)), {
      get(t, n) {
        if (n in t) return t[n];
        if (n in ns) return ns[n](e)
      },
      has(t, n) {
        return n in t || n in ns
      }
    })) : e.proxy
  }
  const Lp = /(?:^|[-_])(\w)/g,
    kp = e => e.replace(Lp, t => t.toUpperCase()).replace(/[-_]/g, "");

  function nc(e, t = !0) {
    return z(e) ? e.displayName || e.name : e.name || t && e.__name
  }

  function rc(e, t, n = !1) {
    let r = nc(t);
    if (!r && t.__file) {
      const s = t.__file.match(/([^/\\]+)\.\w+$/);
      s && (r = s[1])
    }
    if (!r && e && e.parent) {
      const s = i => {
        for (const o in i)
          if (i[o] === t) return o
      };
      r = s(e.components || e.parent.type.components) || s(e.appContext.components)
    }
    return r ? kp(r) : n ? "App" : "Anonymous"
  }

  function Rp(e) {
    return z(e) && "__vccOpts" in e
  }
  const ee = (e, t) => xd(e, t, us);

  function br(e, t, n) {
    const r = arguments.length;
    return r === 2 ? ve(t) && !Y(t) ? wr(t) ? he(e, null, [t]) : he(e, t) : he(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && wr(n) && (n = [n]), he(e, t, n))
  }
  const Np = "3.5.16";
  /**
   * @vue/runtime-dom v3.5.16
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/
  let uo;
  const sc = typeof window < "u" && window.trustedTypes;
  if (sc) try {
    uo = sc.createPolicy("vue", {
      createHTML: e => e
    })
  } catch {}
  const ic = uo ? e => uo.createHTML(e) : e => e,
    Dp = "http://www.w3.org/2000/svg",
    Mp = "http://www.w3.org/1998/Math/MathML",
    tn = typeof document < "u" ? document : null,
    oc = tn && tn.createElement("template"),
    Fp = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null)
      },
      remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
      },
      createElement: (e, t, n, r) => {
        const s = t === "svg" ? tn.createElementNS(Dp, e) : t === "mathml" ? tn.createElementNS(Mp, e) : n ? tn.createElement(e, {
          is: n
        }) : tn.createElement(e);
        return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
      },
      createText: e => tn.createTextNode(e),
      createComment: e => tn.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t
      },
      setElementText: (e, t) => {
        e.textContent = t
      },
      parentNode: e => e.parentNode,
      nextSibling: e => e.nextSibling,
      querySelector: e => tn.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "")
      },
      insertStaticContent(e, t, n, r, s, i) {
        const o = n ? n.previousSibling : t.lastChild;
        if (s && (s === i || s.nextSibling))
          for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)););
        else {
          oc.innerHTML = ic(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
          const a = oc.content;
          if (r === "svg" || r === "mathml") {
            const l = a.firstChild;
            for (; l.firstChild;) a.appendChild(l.firstChild);
            a.removeChild(l)
          }
          t.insertBefore(a, n)
        }
        return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
      }
    },
    $p = Symbol("_vtc");

  function Up(e, t, n) {
    const r = e[$p];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
  }
  const ac = Symbol("_vod"),
    jp = Symbol("_vsh"),
    Vp = Symbol(""),
    Wp = /(^|;)\s*display\s*:/;

  function Hp(e, t, n) {
    const r = e.style,
      s = _e(n);
    let i = !1;
    if (n && !s) {
      if (t)
        if (_e(t))
          for (const o of t.split(";")) {
            const a = o.slice(0, o.indexOf(":")).trim();
            n[a] == null && oi(r, a, "")
          } else
            for (const o in t) n[o] == null && oi(r, o, "");
      for (const o in n) o === "display" && (i = !0), oi(r, o, n[o])
    } else if (s) {
      if (t !== n) {
        const o = r[Vp];
        o && (n += ";" + o), r.cssText = n, i = Wp.test(n)
      }
    } else t && e.removeAttribute("style");
    ac in e && (e[ac] = i ? r.display : "", e[jp] && (r.display = "none"))
  }
  const lc = /\s*!important$/;

  function oi(e, t, n) {
    if (Y(n)) n.forEach(r => oi(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
      const r = Bp(e, t);
      lc.test(n) ? e.setProperty(Kn(r), n.replace(lc, ""), "important") : e[r] = n
    }
  }
  const cc = ["Webkit", "Moz", "ms"],
    fo = {};

  function Bp(e, t) {
    const n = fo[t];
    if (n) return n;
    let r = ot(t);
    if (r !== "filter" && r in e) return fo[t] = r;
    r = Ns(r);
    for (let s = 0; s < cc.length; s++) {
      const i = cc[s] + r;
      if (i in e) return fo[t] = i
    }
    return t
  }
  const uc = "http://www.w3.org/1999/xlink";

  function fc(e, t, n, r, s, i = Gf(t)) {
    r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(uc, t.slice(6, t.length)) : e.setAttributeNS(uc, t, n) : n == null || i && !Aa(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : zt(n) ? String(n) : n)
  }

  function dc(e, t, n, r, s) {
    if (t === "innerHTML" || t === "textContent") {
      n != null && (e[t] = t === "innerHTML" ? ic(n) : n);
      return
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
      const a = i === "OPTION" ? e.getAttribute("value") || "" : e.value,
        l = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
      (a !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
      return
    }
    let o = !1;
    if (n === "" || n == null) {
      const a = typeof e[t];
      a === "boolean" ? n = Aa(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0)
    }
    try {
      e[t] = n
    } catch {}
    o && e.removeAttribute(s || t)
  }

  function Kp(e, t, n, r) {
    e.addEventListener(t, n, r)
  }

  function Qp(e, t, n, r) {
    e.removeEventListener(t, n, r)
  }
  const pc = Symbol("_vei");

  function Gp(e, t, n, r, s = null) {
    const i = e[pc] || (e[pc] = {}),
      o = i[t];
    if (r && o) o.value = r;
    else {
      const [a, l] = qp(t);
      if (r) {
        const c = i[t] = Xp(r, s);
        Kp(e, a, c, l)
      } else o && (Qp(e, a, o, l), i[t] = void 0)
    }
  }
  const hc = /(?:Once|Passive|Capture)$/;

  function qp(e) {
    let t;
    if (hc.test(e)) {
      t = {};
      let r;
      for (; r = e.match(hc);) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Kn(e.slice(2)), t]
  }
  let po = 0;
  const Yp = Promise.resolve(),
    zp = () => po || (Yp.then(() => po = 0), po = Date.now());

  function Xp(e, t) {
    const n = r => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      Ft(Jp(r, n.value), t, 5, [r])
    };
    return n.value = e, n.attached = zp(), n
  }

  function Jp(e, t) {
    if (Y(t)) {
      const n = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        n.call(e), e._stopped = !0
      }, t.map(r => s => !s._stopped && r && r(s))
    } else return t
  }
  const gc = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    Zp = (e, t, n, r, s, i) => {
      const o = s === "svg";
      t === "class" ? Up(e, r, o) : t === "style" ? Hp(e, n, r) : Ls(t) ? Ai(t) || Gp(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : eh(e, t, r, o)) ? (dc(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fc(e, t, r, o, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !_e(r)) ? dc(e, ot(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), fc(e, t, r, o))
    };

  function eh(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && gc(t) && z(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
      const s = e.tagName;
      if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1
    }
    return gc(t) && _e(n) ? !1 : t in e
  }
  const th = ["ctrl", "shift", "alt", "meta"],
    nh = {
      stop: e => e.stopPropagation(),
      prevent: e => e.preventDefault(),
      self: e => e.target !== e.currentTarget,
      ctrl: e => !e.ctrlKey,
      shift: e => !e.shiftKey,
      alt: e => !e.altKey,
      meta: e => !e.metaKey,
      left: e => "button" in e && e.button !== 0,
      middle: e => "button" in e && e.button !== 1,
      right: e => "button" in e && e.button !== 2,
      exact: (e, t) => th.some(n => e[`${n}Key`] && !t.includes(n))
    },
    rh = (e, t) => {
      const n = e._withMods || (e._withMods = {}),
        r = t.join(".");
      return n[r] || (n[r] = (s, ...i) => {
        for (let o = 0; o < t.length; o++) {
          const a = nh[t[o]];
          if (a && a(s, t)) return
        }
        return e(s, ...i)
      })
    },
    sh = Qe({
      patchProp: Zp
    }, Fp);
  let mc;

  function ih() {
    return mc || (mc = lp(sh))
  }
  const oh = (...e) => {
    const t = ih().createApp(...e),
      {
        mount: n
      } = t;
    return t.mount = r => {
      const s = lh(r);
      if (!s) return;
      const i = t._component;
      !z(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
      const o = n(s, !1, ah(s));
      return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o
    }, t
  };

  function ah(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
  }

  function lh(e) {
    return _e(e) ? document.querySelector(e) : e
  }
  var fs = class {
      constructor() {
        this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
      }
      subscribe(e) {
        return this.listeners.add(e), this.onSubscribe(), () => {
          this.listeners.delete(e), this.onUnsubscribe()
        }
      }
      hasListeners() {
        return this.listeners.size > 0
      }
      onSubscribe() {}
      onUnsubscribe() {}
    },
    Zn = typeof window > "u" || "Deno" in globalThis;

  function vt() {}

  function ch(e, t) {
    return typeof e == "function" ? e(t) : e
  }

  function ho(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
  }

  function wc(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
  }

  function En(e, t) {
    return typeof e == "function" ? e(t) : e
  }

  function Ot(e, t) {
    return typeof e == "function" ? e(t) : e
  }

  function bc(e, t) {
    const {
      type: n = "all",
      exact: r,
      fetchStatus: s,
      predicate: i,
      queryKey: o,
      stale: a
    } = e;
    if (o) {
      if (r) {
        if (t.queryHash !== go(o, t.options)) return !1
      } else if (!ps(t.queryKey, o)) return !1
    }
    if (n !== "all") {
      const l = t.isActive();
      if (n === "active" && !l || n === "inactive" && l) return !1
    }
    return !(typeof a == "boolean" && t.isStale() !== a || s && s !== t.state.fetchStatus || i && !i(t))
  }

  function vc(e, t) {
    const {
      exact: n,
      status: r,
      predicate: s,
      mutationKey: i
    } = e;
    if (i) {
      if (!t.options.mutationKey) return !1;
      if (n) {
        if (ds(t.options.mutationKey) !== ds(i)) return !1
      } else if (!ps(t.options.mutationKey, i)) return !1
    }
    return !(r && t.state.status !== r || s && !s(t))
  }

  function go(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || ds)(e)
  }

  function ds(e) {
    return JSON.stringify(e, (t, n) => wo(n) ? Object.keys(n).sort().reduce((r, s) => (r[s] = n[s], r), {}) : n)
  }

  function ps(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => ps(e[n], t[n])) : !1
  }

  function yc(e, t) {
    if (e === t) return e;
    const n = _c(e) && _c(t);
    if (n || wo(e) && wo(t)) {
      const r = n ? e : Object.keys(e),
        s = r.length,
        i = n ? t : Object.keys(t),
        o = i.length,
        a = n ? [] : {},
        l = new Set(r);
      let c = 0;
      for (let u = 0; u < o; u++) {
        const f = n ? u : i[u];
        (!n && l.has(f) || n) && e[f] === void 0 && t[f] === void 0 ? (a[f] = void 0, c++) : (a[f] = yc(e[f], t[f]), a[f] === e[f] && e[f] !== void 0 && c++)
      }
      return s === o && c === s ? e : a
    }
    return t
  }

  function mo(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e)
      if (e[n] !== t[n]) return !1;
    return !0
  }

  function _c(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
  }

  function wo(e) {
    if (!xc(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const n = t.prototype;
    return !(!xc(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
  }

  function xc(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
  }

  function uh(e) {
    return new Promise(t => {
      setTimeout(t, e)
    })
  }

  function bo(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? yc(e, t) : t
  }

  function vo(e) {
    return e
  }

  function fh(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
  }

  function dh(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
  }
  var yo = Symbol();

  function Ec(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === yo ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
  }

  function Tc(e, t) {
    return typeof e == "function" ? e(...t) : !!e
  }
  var ph = (Ef = class extends fs {
      constructor() {
        super();
        q(this, nr);
        q(this, Nn);
        q(this, Pr);
        W(this, Pr, t => {
          if (!Zn && window.addEventListener) {
            const n = () => t();
            return window.addEventListener("visibilitychange", n, !1), () => {
              window.removeEventListener("visibilitychange", n)
            }
          }
        })
      }
      onSubscribe() {
        _(this, Nn) || this.setEventListener(_(this, Pr))
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = _(this, Nn)) == null || t.call(this), W(this, Nn, void 0))
      }
      setEventListener(t) {
        var n;
        W(this, Pr, t), (n = _(this, Nn)) == null || n.call(this), W(this, Nn, t(r => {
          typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
        }))
      }
      setFocused(t) {
        _(this, nr) !== t && (W(this, nr, t), this.onFocus())
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach(n => {
          n(t)
        })
      }
      isFocused() {
        var t;
        return typeof _(this, nr) == "boolean" ? _(this, nr) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
      }
    }, nr = new WeakMap, Nn = new WeakMap, Pr = new WeakMap, Ef),
    _o = new ph,
    hh = (Tf = class extends fs {
      constructor() {
        super();
        q(this, Lr, !0);
        q(this, Dn);
        q(this, kr);
        W(this, kr, t => {
          if (!Zn && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
              window.removeEventListener("online", n), window.removeEventListener("offline", r)
            }
          }
        })
      }
      onSubscribe() {
        _(this, Dn) || this.setEventListener(_(this, kr))
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() || ((t = _(this, Dn)) == null || t.call(this), W(this, Dn, void 0))
      }
      setEventListener(t) {
        var n;
        W(this, kr, t), (n = _(this, Dn)) == null || n.call(this), W(this, Dn, t(this.setOnline.bind(this)))
      }
      setOnline(t) {
        _(this, Lr) !== t && (W(this, Lr, t), this.listeners.forEach(r => {
          r(t)
        }))
      }
      isOnline() {
        return _(this, Lr)
      }
    }, Lr = new WeakMap, Dn = new WeakMap, kr = new WeakMap, Tf),
    ai = new hh;

  function xo() {
    let e, t;
    const n = new Promise((s, i) => {
      e = s, t = i
    });
    n.status = "pending", n.catch(() => {});

    function r(s) {
      Object.assign(n, s), delete n.resolve, delete n.reject
    }
    return n.resolve = s => {
      r({
        status: "fulfilled",
        value: s
      }), e(s)
    }, n.reject = s => {
      r({
        status: "rejected",
        reason: s
      }), t(s)
    }, n
  }

  function gh(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
  }

  function Cc(e) {
    return (e ?? "online") === "online" ? ai.isOnline() : !0
  }
  var Sc = class extends Error {
    constructor(e) {
      super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent
    }
  };

  function Eo(e) {
    return e instanceof Sc
  }

  function Oc(e) {
    let t = !1,
      n = 0,
      r = !1,
      s;
    const i = xo(),
      o = b => {
        var E;
        r || (h(new Sc(b)), (E = e.abort) == null || E.call(e))
      },
      a = () => {
        t = !0
      },
      l = () => {
        t = !1
      },
      c = () => _o.isFocused() && (e.networkMode === "always" || ai.isOnline()) && e.canRun(),
      u = () => Cc(e.networkMode) && e.canRun(),
      f = b => {
        var E;
        r || (r = !0, (E = e.onSuccess) == null || E.call(e, b), s == null || s(), i.resolve(b))
      },
      h = b => {
        var E;
        r || (r = !0, (E = e.onError) == null || E.call(e, b), s == null || s(), i.reject(b))
      },
      m = () => new Promise(b => {
        var E;
        s = g => {
          (r || c()) && b(g)
        }, (E = e.onPause) == null || E.call(e)
      }).then(() => {
        var b;
        s = void 0, r || (b = e.onContinue) == null || b.call(e)
      }),
      O = () => {
        if (r) return;
        let b;
        const E = n === 0 ? e.initialPromise : void 0;
        try {
          b = E ?? e.fn()
        } catch (g) {
          b = Promise.reject(g)
        }
        Promise.resolve(b).then(f).catch(g => {
          var R;
          if (r) return;
          const x = e.retry ?? (Zn ? 0 : 3),
            S = e.retryDelay ?? gh,
            v = typeof S == "function" ? S(n, g) : S,
            I = x === !0 || typeof x == "number" && n < x || typeof x == "function" && x(n, g);
          if (t || !I) {
            h(g);
            return
          }
          n++, (R = e.onFail) == null || R.call(e, n, g), uh(v).then(() => c() ? void 0 : m()).then(() => {
            t ? h(g) : O()
          })
        })
      };
    return {
      promise: i,
      cancel: o,
      continue: () => (s == null || s(), i),
      cancelRetry: a,
      continueRetry: l,
      canStart: u,
      start: () => (u() ? O() : m().then(O), i)
    }
  }
  var mh = e => setTimeout(e, 0);

  function wh() {
    let e = [],
      t = 0,
      n = a => {
        a()
      },
      r = a => {
        a()
      },
      s = mh;
    const i = a => {
        t ? e.push(a) : s(() => {
          n(a)
        })
      },
      o = () => {
        const a = e;
        e = [], a.length && s(() => {
          r(() => {
            a.forEach(l => {
              n(l)
            })
          })
        })
      };
    return {
      batch: a => {
        let l;
        t++;
        try {
          l = a()
        } finally {
          t--, t || o()
        }
        return l
      },
      batchCalls: a => (...l) => {
        i(() => {
          a(...l)
        })
      },
      schedule: i,
      setNotifyFunction: a => {
        n = a
      },
      setBatchNotifyFunction: a => {
        r = a
      },
      setScheduler: a => {
        s = a
      }
    }
  }
  var Ye = wh(),
    Ac = (Cf = class {
      constructor() {
        q(this, rr)
      }
      destroy() {
        this.clearGcTimeout()
      }
      scheduleGc() {
        this.clearGcTimeout(), ho(this.gcTime) && W(this, rr, setTimeout(() => {
          this.optionalRemove()
        }, this.gcTime))
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (Zn ? 1 / 0 : 5 * 60 * 1e3))
      }
      clearGcTimeout() {
        _(this, rr) && (clearTimeout(_(this, rr)), W(this, rr, void 0))
      }
    }, rr = new WeakMap, Cf),
    bh = (Sf = class extends Ac {
      constructor(t) {
        super();
        q(this, kt);
        q(this, Rr);
        q(this, Nr);
        q(this, xt);
        q(this, sr);
        q(this, ze);
        q(this, Ts);
        q(this, ir);
        W(this, ir, !1), W(this, Ts, t.defaultOptions), this.setOptions(t.options), this.observers = [], W(this, sr, t.client), W(this, xt, _(this, sr).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, W(this, Rr, vh(this.options)), this.state = t.state ?? _(this, Rr), this.scheduleGc()
      }
      get meta() {
        return this.options.meta
      }
      get promise() {
        var t;
        return (t = _(this, ze)) == null ? void 0 : t.promise
      }
      setOptions(t) {
        this.options = {
          ..._(this, Ts),
          ...t
        }, this.updateGcTime(this.options.gcTime)
      }
      optionalRemove() {
        !this.observers.length && this.state.fetchStatus === "idle" && _(this, xt).remove(this)
      }
      setData(t, n) {
        const r = bo(this.state.data, t, this.options);
        return le(this, kt, pn).call(this, {
          data: r,
          type: "success",
          dataUpdatedAt: n == null ? void 0 : n.updatedAt,
          manual: n == null ? void 0 : n.manual
        }), r
      }
      setState(t, n) {
        le(this, kt, pn).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n
        })
      }
      cancel(t) {
        var r, s;
        const n = (r = _(this, ze)) == null ? void 0 : r.promise;
        return (s = _(this, ze)) == null || s.cancel(t), n ? n.then(vt).catch(vt) : Promise.resolve()
      }
      destroy() {
        super.destroy(), this.cancel({
          silent: !0
        })
      }
      reset() {
        this.destroy(), this.setState(_(this, Rr))
      }
      isActive() {
        return this.observers.some(t => Ot(t.options.enabled, this) !== !1)
      }
      isDisabled() {
        return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === yo || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
      }
      isStatic() {
        return this.getObserversCount() > 0 ? this.observers.some(t => En(t.options.staleTime, this) === "static") : !1
      }
      isStale() {
        return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
      }
      isStaleByTime(t = 0) {
        return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !wc(this.state.dataUpdatedAt, t)
      }
      onFocus() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
        t == null || t.refetch({
          cancelRefetch: !1
        }), (n = _(this, ze)) == null || n.continue()
      }
      onOnline() {
        var n;
        const t = this.observers.find(r => r.shouldFetchOnReconnect());
        t == null || t.refetch({
          cancelRefetch: !1
        }), (n = _(this, ze)) == null || n.continue()
      }
      addObserver(t) {
        this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), _(this, xt).notify({
          type: "observerAdded",
          query: this,
          observer: t
        }))
      }
      removeObserver(t) {
        this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t), this.observers.length || (_(this, ze) && (_(this, ir) ? _(this, ze).cancel({
          revert: !0
        }) : _(this, ze).cancelRetry()), this.scheduleGc()), _(this, xt).notify({
          type: "observerRemoved",
          query: this,
          observer: t
        }))
      }
      getObserversCount() {
        return this.observers.length
      }
      invalidate() {
        this.state.isInvalidated || le(this, kt, pn).call(this, {
          type: "invalidate"
        })
      }
      fetch(t, n) {
        var c, u, f;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.data !== void 0 && (n != null && n.cancelRefetch)) this.cancel({
            silent: !0
          });
          else if (_(this, ze)) return _(this, ze).continueRetry(), _(this, ze).promise
        }
        if (t && this.setOptions(t), !this.options.queryFn) {
          const h = this.observers.find(m => m.options.queryFn);
          h && this.setOptions(h.options)
        }
        const r = new AbortController,
          s = h => {
            Object.defineProperty(h, "signal", {
              enumerable: !0,
              get: () => (W(this, ir, !0), r.signal)
            })
          },
          i = () => {
            const h = Ec(this.options, n),
              O = (() => {
                const b = {
                  client: _(this, sr),
                  queryKey: this.queryKey,
                  meta: this.meta
                };
                return s(b), b
              })();
            return W(this, ir, !1), this.options.persister ? this.options.persister(h, O, this) : h(O)
          },
          a = (() => {
            const h = {
              fetchOptions: n,
              options: this.options,
              queryKey: this.queryKey,
              client: _(this, sr),
              state: this.state,
              fetchFn: i
            };
            return s(h), h
          })();
        (c = this.options.behavior) == null || c.onFetch(a, this), W(this, Nr, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((u = a.fetchOptions) == null ? void 0 : u.meta)) && le(this, kt, pn).call(this, {
          type: "fetch",
          meta: (f = a.fetchOptions) == null ? void 0 : f.meta
        });
        const l = h => {
          var m, O, b, E;
          Eo(h) && h.silent || le(this, kt, pn).call(this, {
            type: "error",
            error: h
          }), Eo(h) || ((O = (m = _(this, xt).config).onError) == null || O.call(m, h, this), (E = (b = _(this, xt).config).onSettled) == null || E.call(b, this.state.data, h, this)), this.scheduleGc()
        };
        return W(this, ze, Oc({
          initialPromise: n == null ? void 0 : n.initialPromise,
          fn: a.fetchFn,
          abort: r.abort.bind(r),
          onSuccess: h => {
            var m, O, b, E;
            if (h === void 0) {
              l(new Error(`${this.queryHash} data is undefined`));
              return
            }
            try {
              this.setData(h)
            } catch (g) {
              l(g);
              return
            }(O = (m = _(this, xt).config).onSuccess) == null || O.call(m, h, this), (E = (b = _(this, xt).config).onSettled) == null || E.call(b, h, this.state.error, this), this.scheduleGc()
          },
          onError: l,
          onFail: (h, m) => {
            le(this, kt, pn).call(this, {
              type: "failed",
              failureCount: h,
              error: m
            })
          },
          onPause: () => {
            le(this, kt, pn).call(this, {
              type: "pause"
            })
          },
          onContinue: () => {
            le(this, kt, pn).call(this, {
              type: "continue"
            })
          },
          retry: a.options.retry,
          retryDelay: a.options.retryDelay,
          networkMode: a.options.networkMode,
          canRun: () => !0
        })), _(this, ze).start()
      }
    }, Rr = new WeakMap, Nr = new WeakMap, xt = new WeakMap, sr = new WeakMap, ze = new WeakMap, Ts = new WeakMap, ir = new WeakMap, kt = new WeakSet, pn = function(t) {
      const n = r => {
        switch (t.type) {
          case "failed":
            return {
              ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error
            };
          case "pause":
            return {
              ...r, fetchStatus: "paused"
            };
          case "continue":
            return {
              ...r, fetchStatus: "fetching"
            };
          case "fetch":
            return {
              ...r, ...Ic(r.data, this.options), fetchMeta: t.meta ?? null
            };
          case "success":
            return {
              ...r, data: t.data, dataUpdateCount: r.dataUpdateCount + 1, dataUpdatedAt: t.dataUpdatedAt ?? Date.now(), error: null, isInvalidated: !1, status: "success", ...!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null
              }
            };
          case "error":
            const s = t.error;
            return Eo(s) && s.revert && _(this, Nr) ? {
              ..._(this, Nr),
              fetchStatus: "idle"
            } : {
              ...r,
              error: s,
              errorUpdateCount: r.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: r.fetchFailureCount + 1,
              fetchFailureReason: s,
              fetchStatus: "idle",
              status: "error"
            };
          case "invalidate":
            return {
              ...r, isInvalidated: !0
            };
          case "setState":
            return {
              ...r, ...t.state
            }
        }
      };
      this.state = n(this.state), Ye.batch(() => {
        this.observers.forEach(r => {
          r.onQueryUpdate()
        }), _(this, xt).notify({
          query: this,
          type: "updated",
          action: t
        })
      })
    }, Sf);

  function Ic(e, t) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: Cc(t.networkMode) ? "fetching" : "paused",
      ...e === void 0 && {
        error: null,
        status: "pending"
      }
    }
  }

  function vh(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
      n = t !== void 0,
      r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
      data: t,
      dataUpdateCount: 0,
      dataUpdatedAt: n ? r ?? Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: !1,
      status: n ? "success" : "pending",
      fetchStatus: "idle"
    }
  }
  var Pc = (Of = class extends fs {
      constructor(n = {}) {
        super();
        q(this, Qt);
        this.config = n, W(this, Qt, new Map)
      }
      build(n, r, s) {
        const i = r.queryKey,
          o = r.queryHash ?? go(i, r);
        let a = this.get(o);
        return a || (a = new bh({
          client: n,
          queryKey: i,
          queryHash: o,
          options: n.defaultQueryOptions(r),
          state: s,
          defaultOptions: n.getQueryDefaults(i)
        }), this.add(a)), a
      }
      add(n) {
        _(this, Qt).has(n.queryHash) || (_(this, Qt).set(n.queryHash, n), this.notify({
          type: "added",
          query: n
        }))
      }
      remove(n) {
        const r = _(this, Qt).get(n.queryHash);
        r && (n.destroy(), r === n && _(this, Qt).delete(n.queryHash), this.notify({
          type: "removed",
          query: n
        }))
      }
      clear() {
        Ye.batch(() => {
          this.getAll().forEach(n => {
            this.remove(n)
          })
        })
      }
      get(n) {
        return _(this, Qt).get(n)
      }
      getAll() {
        return [..._(this, Qt).values()]
      }
      find(n) {
        const r = {
          exact: !0,
          ...n
        };
        return this.getAll().find(s => bc(r, s))
      }
      findAll(n = {}) {
        const r = this.getAll();
        return Object.keys(n).length > 0 ? r.filter(s => bc(n, s)) : r
      }
      notify(n) {
        Ye.batch(() => {
          this.listeners.forEach(r => {
            r(n)
          })
        })
      }
      onFocus() {
        Ye.batch(() => {
          this.getAll().forEach(n => {
            n.onFocus()
          })
        })
      }
      onOnline() {
        Ye.batch(() => {
          this.getAll().forEach(n => {
            n.onOnline()
          })
        })
      }
    }, Qt = new WeakMap, Of),
    yh = (Af = class extends Ac {
      constructor(t) {
        super();
        q(this, qt);
        q(this, Gt);
        q(this, st);
        q(this, or);
        this.mutationId = t.mutationId, W(this, st, t.mutationCache), W(this, Gt, []), this.state = t.state || _h(), this.setOptions(t.options), this.scheduleGc()
      }
      setOptions(t) {
        this.options = t, this.updateGcTime(this.options.gcTime)
      }
      get meta() {
        return this.options.meta
      }
      addObserver(t) {
        _(this, Gt).includes(t) || (_(this, Gt).push(t), this.clearGcTimeout(), _(this, st).notify({
          type: "observerAdded",
          mutation: this,
          observer: t
        }))
      }
      removeObserver(t) {
        W(this, Gt, _(this, Gt).filter(n => n !== t)), this.scheduleGc(), _(this, st).notify({
          type: "observerRemoved",
          mutation: this,
          observer: t
        })
      }
      optionalRemove() {
        _(this, Gt).length || (this.state.status === "pending" ? this.scheduleGc() : _(this, st).remove(this))
      }
      continue () {
        var t;
        return ((t = _(this, or)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
      }
      async execute(t) {
        var i, o, a, l, c, u, f, h, m, O, b, E, g, x, S, v, I, R, k, V;
        const n = () => {
          le(this, qt, Bn).call(this, {
            type: "continue"
          })
        };
        W(this, or, Oc({
          fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
          onFail: (U, K) => {
            le(this, qt, Bn).call(this, {
              type: "failed",
              failureCount: U,
              error: K
            })
          },
          onPause: () => {
            le(this, qt, Bn).call(this, {
              type: "pause"
            })
          },
          onContinue: n,
          retry: this.options.retry ?? 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode,
          canRun: () => _(this, st).canRun(this)
        }));
        const r = this.state.status === "pending",
          s = !_(this, or).canStart();
        try {
          if (r) n();
          else {
            le(this, qt, Bn).call(this, {
              type: "pending",
              variables: t,
              isPaused: s
            }), await ((o = (i = _(this, st).config).onMutate) == null ? void 0 : o.call(i, t, this));
            const K = await ((l = (a = this.options).onMutate) == null ? void 0 : l.call(a, t));
            K !== this.state.context && le(this, qt, Bn).call(this, {
              type: "pending",
              context: K,
              variables: t,
              isPaused: s
            })
          }
          const U = await _(this, or).start();
          return await ((u = (c = _(this, st).config).onSuccess) == null ? void 0 : u.call(c, U, t, this.state.context, this)), await ((h = (f = this.options).onSuccess) == null ? void 0 : h.call(f, U, t, this.state.context)), await ((O = (m = _(this, st).config).onSettled) == null ? void 0 : O.call(m, U, null, this.state.variables, this.state.context, this)), await ((E = (b = this.options).onSettled) == null ? void 0 : E.call(b, U, null, t, this.state.context)), le(this, qt, Bn).call(this, {
            type: "success",
            data: U
          }), U
        } catch (U) {
          try {
            throw await ((x = (g = _(this, st).config).onError) == null ? void 0 : x.call(g, U, t, this.state.context, this)), await ((v = (S = this.options).onError) == null ? void 0 : v.call(S, U, t, this.state.context)), await ((R = (I = _(this, st).config).onSettled) == null ? void 0 : R.call(I, void 0, U, this.state.variables, this.state.context, this)), await ((V = (k = this.options).onSettled) == null ? void 0 : V.call(k, void 0, U, t, this.state.context)), U
          } finally {
            le(this, qt, Bn).call(this, {
              type: "error",
              error: U
            })
          }
        } finally {
          _(this, st).runNext(this)
        }
      }
    }, Gt = new WeakMap, st = new WeakMap, or = new WeakMap, qt = new WeakSet, Bn = function(t) {
      const n = r => {
        switch (t.type) {
          case "failed":
            return {
              ...r, failureCount: t.failureCount, failureReason: t.error
            };
          case "pause":
            return {
              ...r, isPaused: !0
            };
          case "continue":
            return {
              ...r, isPaused: !1
            };
          case "pending":
            return {
              ...r, context: t.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: t.isPaused, status: "pending", variables: t.variables, submittedAt: Date.now()
            };
          case "success":
            return {
              ...r, data: t.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
            };
          case "error":
            return {
              ...r, data: void 0, error: t.error, failureCount: r.failureCount + 1, failureReason: t.error, isPaused: !1, status: "error"
            }
        }
      };
      this.state = n(this.state), Ye.batch(() => {
        _(this, Gt).forEach(r => {
          r.onMutationUpdate(t)
        }), _(this, st).notify({
          mutation: this,
          type: "updated",
          action: t
        })
      })
    }, Af);

  function _h() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: !1,
      status: "idle",
      variables: void 0,
      submittedAt: 0
    }
  }
  var Lc = (If = class extends fs {
    constructor(n = {}) {
      super();
      q(this, un);
      q(this, Rt);
      q(this, Cs);
      this.config = n, W(this, un, new Set), W(this, Rt, new Map), W(this, Cs, 0)
    }
    build(n, r, s) {
      const i = new yh({
        mutationCache: this,
        mutationId: ++Oi(this, Cs)._,
        options: n.defaultMutationOptions(r),
        state: s
      });
      return this.add(i), i
    }
    add(n) {
      _(this, un).add(n);
      const r = li(n);
      if (typeof r == "string") {
        const s = _(this, Rt).get(r);
        s ? s.push(n) : _(this, Rt).set(r, [n])
      }
      this.notify({
        type: "added",
        mutation: n
      })
    }
    remove(n) {
      if (_(this, un).delete(n)) {
        const r = li(n);
        if (typeof r == "string") {
          const s = _(this, Rt).get(r);
          if (s)
            if (s.length > 1) {
              const i = s.indexOf(n);
              i !== -1 && s.splice(i, 1)
            } else s[0] === n && _(this, Rt).delete(r)
        }
      }
      this.notify({
        type: "removed",
        mutation: n
      })
    }
    canRun(n) {
      const r = li(n);
      if (typeof r == "string") {
        const s = _(this, Rt).get(r),
          i = s == null ? void 0 : s.find(o => o.state.status === "pending");
        return !i || i === n
      } else return !0
    }
    runNext(n) {
      var s;
      const r = li(n);
      if (typeof r == "string") {
        const i = (s = _(this, Rt).get(r)) == null ? void 0 : s.find(o => o !== n && o.state.isPaused);
        return (i == null ? void 0 : i.continue()) ?? Promise.resolve()
      } else return Promise.resolve()
    }
    clear() {
      Ye.batch(() => {
        _(this, un).forEach(n => {
          this.notify({
            type: "removed",
            mutation: n
          })
        }), _(this, un).clear(), _(this, Rt).clear()
      })
    }
    getAll() {
      return Array.from(_(this, un))
    }
    find(n) {
      const r = {
        exact: !0,
        ...n
      };
      return this.getAll().find(s => vc(r, s))
    }
    findAll(n = {}) {
      return this.getAll().filter(r => vc(n, r))
    }
    notify(n) {
      Ye.batch(() => {
        this.listeners.forEach(r => {
          r(n)
        })
      })
    }
    resumePausedMutations() {
      const n = this.getAll().filter(r => r.state.isPaused);
      return Ye.batch(() => Promise.all(n.map(r => r.continue().catch(vt))))
    }
  }, un = new WeakMap, Rt = new WeakMap, Cs = new WeakMap, If);

  function li(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
  }

  function kc(e) {
    return {
      onFetch: (t, n) => {
        var u, f, h, m, O;
        const r = t.options,
          s = (h = (f = (u = t.fetchOptions) == null ? void 0 : u.meta) == null ? void 0 : f.fetchMore) == null ? void 0 : h.direction,
          i = ((m = t.state.data) == null ? void 0 : m.pages) || [],
          o = ((O = t.state.data) == null ? void 0 : O.pageParams) || [];
        let a = {
            pages: [],
            pageParams: []
          },
          l = 0;
        const c = async () => {
          let b = !1;
          const E = S => {
              Object.defineProperty(S, "signal", {
                enumerable: !0,
                get: () => (t.signal.aborted ? b = !0 : t.signal.addEventListener("abort", () => {
                  b = !0
                }), t.signal)
              })
            },
            g = Ec(t.options, t.fetchOptions),
            x = async (S, v, I) => {
              if (b) return Promise.reject();
              if (v == null && S.pages.length) return Promise.resolve(S);
              const k = (() => {
                  const ne = {
                    client: t.client,
                    queryKey: t.queryKey,
                    pageParam: v,
                    direction: I ? "backward" : "forward",
                    meta: t.options.meta
                  };
                  return E(ne), ne
                })(),
                V = await g(k),
                {
                  maxPages: U
                } = t.options,
                K = I ? dh : fh;
              return {
                pages: K(S.pages, V, U),
                pageParams: K(S.pageParams, v, U)
              }
            };
          if (s && i.length) {
            const S = s === "backward",
              v = S ? xh : Rc,
              I = {
                pages: i,
                pageParams: o
              },
              R = v(r, I);
            a = await x(I, R, S)
          } else {
            const S = e ?? i.length;
            do {
              const v = l === 0 ? o[0] ?? r.initialPageParam : Rc(r, a);
              if (l > 0 && v == null) break;
              a = await x(a, v), l++
            } while (l < S)
          }
          return a
        };
        t.options.persister ? t.fetchFn = () => {
          var b, E;
          return (E = (b = t.options).persister) == null ? void 0 : E.call(b, c, {
            client: t.client,
            queryKey: t.queryKey,
            meta: t.options.meta,
            signal: t.signal
          }, n)
        } : t.fetchFn = c
      }
    }
  }

  function Rc(e, {
    pages: t,
    pageParams: n
  }) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
  }

  function xh(e, {
    pages: t,
    pageParams: n
  }) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
  }
  var Eh = (Pf = class {
      constructor(t = {}) {
        q(this, Ae);
        q(this, Mn);
        q(this, Fn);
        q(this, Dr);
        q(this, Mr);
        q(this, $n);
        q(this, Fr);
        q(this, $r);
        W(this, Ae, t.queryCache || new Pc), W(this, Mn, t.mutationCache || new Lc), W(this, Fn, t.defaultOptions || {}), W(this, Dr, new Map), W(this, Mr, new Map), W(this, $n, 0)
      }
      mount() {
        Oi(this, $n)._++, _(this, $n) === 1 && (W(this, Fr, _o.subscribe(async t => {
          t && (await this.resumePausedMutations(), _(this, Ae).onFocus())
        })), W(this, $r, ai.subscribe(async t => {
          t && (await this.resumePausedMutations(), _(this, Ae).onOnline())
        })))
      }
      unmount() {
        var t, n;
        Oi(this, $n)._--, _(this, $n) === 0 && ((t = _(this, Fr)) == null || t.call(this), W(this, Fr, void 0), (n = _(this, $r)) == null || n.call(this), W(this, $r, void 0))
      }
      isFetching(t) {
        return _(this, Ae).findAll({
          ...t,
          fetchStatus: "fetching"
        }).length
      }
      isMutating(t) {
        return _(this, Mn).findAll({
          ...t,
          status: "pending"
        }).length
      }
      getQueryData(t) {
        var r;
        const n = this.defaultQueryOptions({
          queryKey: t
        });
        return (r = _(this, Ae).get(n.queryHash)) == null ? void 0 : r.state.data
      }
      ensureQueryData(t) {
        const n = this.defaultQueryOptions(t),
          r = _(this, Ae).build(this, n),
          s = r.state.data;
        return s === void 0 ? this.fetchQuery(t) : (t.revalidateIfStale && r.isStaleByTime(En(n.staleTime, r)) && this.prefetchQuery(n), Promise.resolve(s))
      }
      getQueriesData(t) {
        return _(this, Ae).findAll(t).map(({
          queryKey: n,
          state: r
        }) => {
          const s = r.data;
          return [n, s]
        })
      }
      setQueryData(t, n, r) {
        const s = this.defaultQueryOptions({
            queryKey: t
          }),
          i = _(this, Ae).get(s.queryHash),
          o = i == null ? void 0 : i.state.data,
          a = ch(n, o);
        if (a !== void 0) return _(this, Ae).build(this, s).setData(a, {
          ...r,
          manual: !0
        })
      }
      setQueriesData(t, n, r) {
        return Ye.batch(() => _(this, Ae).findAll(t).map(({
          queryKey: s
        }) => [s, this.setQueryData(s, n, r)]))
      }
      getQueryState(t) {
        var r;
        const n = this.defaultQueryOptions({
          queryKey: t
        });
        return (r = _(this, Ae).get(n.queryHash)) == null ? void 0 : r.state
      }
      removeQueries(t) {
        const n = _(this, Ae);
        Ye.batch(() => {
          n.findAll(t).forEach(r => {
            n.remove(r)
          })
        })
      }
      resetQueries(t, n) {
        const r = _(this, Ae);
        return Ye.batch(() => (r.findAll(t).forEach(s => {
          s.reset()
        }), this.refetchQueries({
          type: "active",
          ...t
        }, n)))
      }
      cancelQueries(t, n = {}) {
        const r = {
            revert: !0,
            ...n
          },
          s = Ye.batch(() => _(this, Ae).findAll(t).map(i => i.cancel(r)));
        return Promise.all(s).then(vt).catch(vt)
      }
      invalidateQueries(t, n = {}) {
        return Ye.batch(() => (_(this, Ae).findAll(t).forEach(r => {
          r.invalidate()
        }), (t == null ? void 0 : t.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
          ...t,
          type: (t == null ? void 0 : t.refetchType) ?? (t == null ? void 0 : t.type) ?? "active"
        }, n)))
      }
      refetchQueries(t, n = {}) {
        const r = {
            ...n,
            cancelRefetch: n.cancelRefetch ?? !0
          },
          s = Ye.batch(() => _(this, Ae).findAll(t).filter(i => !i.isDisabled() && !i.isStatic()).map(i => {
            let o = i.fetch(void 0, r);
            return r.throwOnError || (o = o.catch(vt)), i.state.fetchStatus === "paused" ? Promise.resolve() : o
          }));
        return Promise.all(s).then(vt)
      }
      fetchQuery(t) {
        const n = this.defaultQueryOptions(t);
        n.retry === void 0 && (n.retry = !1);
        const r = _(this, Ae).build(this, n);
        return r.isStaleByTime(En(n.staleTime, r)) ? r.fetch(n) : Promise.resolve(r.state.data)
      }
      prefetchQuery(t) {
        return this.fetchQuery(t).then(vt).catch(vt)
      }
      fetchInfiniteQuery(t) {
        return t.behavior = kc(t.pages), this.fetchQuery(t)
      }
      prefetchInfiniteQuery(t) {
        return this.fetchInfiniteQuery(t).then(vt).catch(vt)
      }
      ensureInfiniteQueryData(t) {
        return t.behavior = kc(t.pages), this.ensureQueryData(t)
      }
      resumePausedMutations() {
        return ai.isOnline() ? _(this, Mn).resumePausedMutations() : Promise.resolve()
      }
      getQueryCache() {
        return _(this, Ae)
      }
      getMutationCache() {
        return _(this, Mn)
      }
      getDefaultOptions() {
        return _(this, Fn)
      }
      setDefaultOptions(t) {
        W(this, Fn, t)
      }
      setQueryDefaults(t, n) {
        _(this, Dr).set(ds(t), {
          queryKey: t,
          defaultOptions: n
        })
      }
      getQueryDefaults(t) {
        const n = [..._(this, Dr).values()],
          r = {};
        return n.forEach(s => {
          ps(t, s.queryKey) && Object.assign(r, s.defaultOptions)
        }), r
      }
      setMutationDefaults(t, n) {
        _(this, Mr).set(ds(t), {
          mutationKey: t,
          defaultOptions: n
        })
      }
      getMutationDefaults(t) {
        const n = [..._(this, Mr).values()],
          r = {};
        return n.forEach(s => {
          ps(t, s.mutationKey) && Object.assign(r, s.defaultOptions)
        }), r
      }
      defaultQueryOptions(t) {
        if (t._defaulted) return t;
        const n = {
          ..._(this, Fn).queries,
          ...this.getQueryDefaults(t.queryKey),
          ...t,
          _defaulted: !0
        };
        return n.queryHash || (n.queryHash = go(n.queryKey, n)), n.refetchOnReconnect === void 0 && (n.refetchOnReconnect = n.networkMode !== "always"), n.throwOnError === void 0 && (n.throwOnError = !!n.suspense), !n.networkMode && n.persister && (n.networkMode = "offlineFirst"), n.queryFn === yo && (n.enabled = !1), n
      }
      defaultMutationOptions(t) {
        return t != null && t._defaulted ? t : {
          ..._(this, Fn).mutations,
          ...(t == null ? void 0 : t.mutationKey) && this.getMutationDefaults(t.mutationKey),
          ...t,
          _defaulted: !0
        }
      }
      clear() {
        _(this, Ae).clear(), _(this, Mn).clear()
      }
    }, Ae = new WeakMap, Mn = new WeakMap, Fn = new WeakMap, Dr = new WeakMap, Mr = new WeakMap, $n = new WeakMap, Fr = new WeakMap, $r = new WeakMap, Pf),
    Th = (Lf = class extends fs {
      constructor(t, n) {
        super();
        q(this, de);
        q(this, ut);
        q(this, ae);
        q(this, Ss);
        q(this, it);
        q(this, ar);
        q(this, Ur);
        q(this, Un);
        q(this, jn);
        q(this, Os);
        q(this, jr);
        q(this, Vr);
        q(this, lr);
        q(this, cr);
        q(this, Vn);
        q(this, Wr, new Set);
        this.options = n, W(this, ut, t), W(this, jn, null), W(this, Un, xo()), this.options.experimental_prefetchInRender || _(this, Un).reject(new Error("experimental_prefetchInRender feature flag is not enabled")), this.bindMethods(), this.setOptions(n)
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this)
      }
      onSubscribe() {
        this.listeners.size === 1 && (_(this, ae).addObserver(this), Nc(_(this, ae), this.options) ? le(this, de, Ps).call(this) : this.updateResult(), le(this, de, ba).call(this))
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy()
      }
      shouldFetchOnReconnect() {
        return To(_(this, ae), this.options, this.options.refetchOnReconnect)
      }
      shouldFetchOnWindowFocus() {
        return To(_(this, ae), this.options, this.options.refetchOnWindowFocus)
      }
      destroy() {
        this.listeners = new Set, le(this, de, va).call(this), le(this, de, ya).call(this), _(this, ae).removeObserver(this)
      }
      setOptions(t) {
        const n = this.options,
          r = _(this, ae);
        if (this.options = _(this, ut).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Ot(this.options.enabled, _(this, ae)) != "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        le(this, de, _a).call(this), _(this, ae).setOptions(this.options), n._defaulted && !mo(this.options, n) && _(this, ut).getQueryCache().notify({
          type: "observerOptionsUpdated",
          query: _(this, ae),
          observer: this
        });
        const s = this.hasListeners();
        s && Dc(_(this, ae), r, this.options, n) && le(this, de, Ps).call(this), this.updateResult(), s && (_(this, ae) !== r || Ot(this.options.enabled, _(this, ae)) !== Ot(n.enabled, _(this, ae)) || En(this.options.staleTime, _(this, ae)) !== En(n.staleTime, _(this, ae))) && le(this, de, ga).call(this);
        const i = le(this, de, ma).call(this);
        s && (_(this, ae) !== r || Ot(this.options.enabled, _(this, ae)) !== Ot(n.enabled, _(this, ae)) || i !== _(this, Vn)) && le(this, de, wa).call(this, i)
      }
      getOptimisticResult(t) {
        const n = _(this, ut).getQueryCache().build(_(this, ut), t),
          r = this.createResult(n, t);
        return Sh(this, r) && (W(this, it, r), W(this, Ur, this.options), W(this, ar, _(this, ae).state)), r
      }
      getCurrentResult() {
        return _(this, it)
      }
      trackResult(t, n) {
        return new Proxy(t, {
          get: (r, s) => (this.trackProp(s), n == null || n(s), Reflect.get(r, s))
        })
      }
      trackProp(t) {
        _(this, Wr).add(t)
      }
      getCurrentQuery() {
        return _(this, ae)
      }
      refetch({
        ...t
      } = {}) {
        return this.fetch({
          ...t
        })
      }
      fetchOptimistic(t) {
        const n = _(this, ut).defaultQueryOptions(t),
          r = _(this, ut).getQueryCache().build(_(this, ut), n);
        return r.fetch().then(() => this.createResult(r, n))
      }
      fetch(t) {
        return le(this, de, Ps).call(this, {
          ...t,
          cancelRefetch: t.cancelRefetch ?? !0
        }).then(() => (this.updateResult(), _(this, it)))
      }
      createResult(t, n) {
        var U;
        const r = _(this, ae),
          s = this.options,
          i = _(this, it),
          o = _(this, ar),
          a = _(this, Ur),
          c = t !== r ? t.state : _(this, Ss),
          {
            state: u
          } = t;
        let f = {
            ...u
          },
          h = !1,
          m;
        if (n._optimisticResults) {
          const K = this.hasListeners(),
            ne = !K && Nc(t, n),
            H = K && Dc(t, r, n, s);
          (ne || H) && (f = {
            ...f,
            ...Ic(u.data, t.options)
          }), n._optimisticResults === "isRestoring" && (f.fetchStatus = "idle")
        }
        let {
          error: O,
          errorUpdatedAt: b,
          status: E
        } = f;
        m = f.data;
        let g = !1;
        if (n.placeholderData !== void 0 && m === void 0 && E === "pending") {
          let K;
          i != null && i.isPlaceholderData && n.placeholderData === (a == null ? void 0 : a.placeholderData) ? (K = i.data, g = !0) : K = typeof n.placeholderData == "function" ? n.placeholderData((U = _(this, Vr)) == null ? void 0 : U.state.data, _(this, Vr)) : n.placeholderData, K !== void 0 && (E = "success", m = bo(i == null ? void 0 : i.data, K, n), h = !0)
        }
        if (n.select && m !== void 0 && !g)
          if (i && m === (o == null ? void 0 : o.data) && n.select === _(this, Os)) m = _(this, jr);
          else try {
            W(this, Os, n.select), m = n.select(m), m = bo(i == null ? void 0 : i.data, m, n), W(this, jr, m), W(this, jn, null)
          } catch (K) {
            W(this, jn, K)
          }
        _(this, jn) && (O = _(this, jn), m = _(this, jr), b = Date.now(), E = "error");
        const x = f.fetchStatus === "fetching",
          S = E === "pending",
          v = E === "error",
          I = S && x,
          R = m !== void 0,
          V = {
            status: E,
            fetchStatus: f.fetchStatus,
            isPending: S,
            isSuccess: E === "success",
            isError: v,
            isInitialLoading: I,
            isLoading: I,
            data: m,
            dataUpdatedAt: f.dataUpdatedAt,
            error: O,
            errorUpdatedAt: b,
            failureCount: f.fetchFailureCount,
            failureReason: f.fetchFailureReason,
            errorUpdateCount: f.errorUpdateCount,
            isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
            isFetchedAfterMount: f.dataUpdateCount > c.dataUpdateCount || f.errorUpdateCount > c.errorUpdateCount,
            isFetching: x,
            isRefetching: x && !S,
            isLoadingError: v && !R,
            isPaused: f.fetchStatus === "paused",
            isPlaceholderData: h,
            isRefetchError: v && R,
            isStale: Co(t, n),
            refetch: this.refetch,
            promise: _(this, Un)
          };
        if (this.options.experimental_prefetchInRender) {
          const K = be => {
              V.status === "error" ? be.reject(V.error) : V.data !== void 0 && be.resolve(V.data)
            },
            ne = () => {
              const be = W(this, Un, V.promise = xo());
              K(be)
            },
            H = _(this, Un);
          switch (H.status) {
            case "pending":
              t.queryHash === r.queryHash && K(H);
              break;
            case "fulfilled":
              (V.status === "error" || V.data !== H.value) && ne();
              break;
            case "rejected":
              (V.status !== "error" || V.error !== H.reason) && ne();
              break
          }
        }
        return V
      }
      updateResult() {
        const t = _(this, it),
          n = this.createResult(_(this, ae), this.options);
        if (W(this, ar, _(this, ae).state), W(this, Ur, this.options), _(this, ar).data !== void 0 && W(this, Vr, _(this, ae)), mo(n, t)) return;
        W(this, it, n);
        const r = () => {
          if (!t) return !0;
          const {
            notifyOnChangeProps: s
          } = this.options, i = typeof s == "function" ? s() : s;
          if (i === "all" || !i && !_(this, Wr).size) return !0;
          const o = new Set(i ?? _(this, Wr));
          return this.options.throwOnError && o.add("error"), Object.keys(_(this, it)).some(a => {
            const l = a;
            return _(this, it)[l] !== t[l] && o.has(l)
          })
        };
        le(this, de, Mf).call(this, {
          listeners: r()
        })
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && le(this, de, ba).call(this)
      }
    }, ut = new WeakMap, ae = new WeakMap, Ss = new WeakMap, it = new WeakMap, ar = new WeakMap, Ur = new WeakMap, Un = new WeakMap, jn = new WeakMap, Os = new WeakMap, jr = new WeakMap, Vr = new WeakMap, lr = new WeakMap, cr = new WeakMap, Vn = new WeakMap, Wr = new WeakMap, de = new WeakSet, Ps = function(t) {
      le(this, de, _a).call(this);
      let n = _(this, ae).fetch(this.options, t);
      return t != null && t.throwOnError || (n = n.catch(vt)), n
    }, ga = function() {
      le(this, de, va).call(this);
      const t = En(this.options.staleTime, _(this, ae));
      if (Zn || _(this, it).isStale || !ho(t)) return;
      const r = wc(_(this, it).dataUpdatedAt, t) + 1;
      W(this, lr, setTimeout(() => {
        _(this, it).isStale || this.updateResult()
      }, r))
    }, ma = function() {
      return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(_(this, ae)) : this.options.refetchInterval) ?? !1
    }, wa = function(t) {
      le(this, de, ya).call(this), W(this, Vn, t), !(Zn || Ot(this.options.enabled, _(this, ae)) === !1 || !ho(_(this, Vn)) || _(this, Vn) === 0) && W(this, cr, setInterval(() => {
        (this.options.refetchIntervalInBackground || _o.isFocused()) && le(this, de, Ps).call(this)
      }, _(this, Vn)))
    }, ba = function() {
      le(this, de, ga).call(this), le(this, de, wa).call(this, le(this, de, ma).call(this))
    }, va = function() {
      _(this, lr) && (clearTimeout(_(this, lr)), W(this, lr, void 0))
    }, ya = function() {
      _(this, cr) && (clearInterval(_(this, cr)), W(this, cr, void 0))
    }, _a = function() {
      const t = _(this, ut).getQueryCache().build(_(this, ut), this.options);
      if (t === _(this, ae)) return;
      const n = _(this, ae);
      W(this, ae, t), W(this, Ss, t.state), this.hasListeners() && (n == null || n.removeObserver(this), t.addObserver(this))
    }, Mf = function(t) {
      Ye.batch(() => {
        t.listeners && this.listeners.forEach(n => {
          n(_(this, it))
        }), _(this, ut).getQueryCache().notify({
          query: _(this, ae),
          type: "observerResultsUpdated"
        })
      })
    }, Lf);

  function Ch(e, t) {
    return Ot(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1)
  }

  function Nc(e, t) {
    return Ch(e, t) || e.state.data !== void 0 && To(e, t, t.refetchOnMount)
  }

  function To(e, t, n) {
    if (Ot(t.enabled, e) !== !1 && En(t.staleTime, e) !== "static") {
      const r = typeof n == "function" ? n(e) : n;
      return r === "always" || r !== !1 && Co(e, t)
    }
    return !1
  }

  function Dc(e, t, n, r) {
    return (e !== t || Ot(r.enabled, e) === !1) && (!n.suspense || e.state.status !== "error") && Co(e, n)
  }

  function Co(e, t) {
    return Ot(t.enabled, e) !== !1 && e.isStaleByTime(En(t.staleTime, e))
  }

  function Sh(e, t) {
    return !mo(e.getCurrentResult(), t)
  }
  var Oh = "VUE_QUERY_CLIENT";

  function Mc(e) {
    const t = e ? `:${e}` : "";
    return `${Oh}${t}`
  }

  function Fc(e, t) {
    Object.keys(e).forEach(n => {
      e[n] = t[n]
    })
  }

  function So(e, t, n = "", r = 0) {
    if (t) {
      const s = t(e, n, r);
      if (s === void 0 && Oe(e) || s !== void 0) return s
    }
    if (Array.isArray(e)) return e.map((s, i) => So(s, t, String(i), r + 1));
    if (typeof e == "object" && Ih(e)) {
      const s = Object.entries(e).map(([i, o]) => [i, So(o, t, i, r + 1)]);
      return Object.fromEntries(s)
    }
    return e
  }

  function Ah(e, t) {
    return So(e, t)
  }

  function te(e, t = !1) {
    return Ah(e, (n, r, s) => {
      if (s === 1 && r === "queryKey") return te(n, !0);
      if (t && Ph(n)) return te(n(), t);
      if (Oe(n)) return te(D(n), t)
    })
  }

  function Ih(e) {
    if (Object.prototype.toString.call(e) !== "[object Object]") return !1;
    const t = Object.getPrototypeOf(e);
    return t === null || t === Object.prototype
  }

  function Ph(e) {
    return typeof e == "function"
  }

  function Lh(e = "") {
    if (!tp()) throw new Error("vue-query hooks can only be used inside setup() function or functions that support injection context.");
    const t = Mc(e),
      n = yn(t);
    if (!n) throw new Error("No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library.");
    return n
  }
  var kh = class extends Pc {
      find(e) {
        return super.find(te(e))
      }
      findAll(e = {}) {
        return super.findAll(te(e))
      }
    },
    Rh = class extends Lc {
      find(e) {
        return super.find(te(e))
      }
      findAll(e = {}) {
        return super.findAll(te(e))
      }
    },
    $c = class extends Eh {
      constructor(e = {}) {
        const t = {
          defaultOptions: e.defaultOptions,
          queryCache: e.queryCache || new kh,
          mutationCache: e.mutationCache || new Rh
        };
        super(t), this.isRestoring = re(!1)
      }
      isFetching(e = {}) {
        return super.isFetching(te(e))
      }
      isMutating(e = {}) {
        return super.isMutating(te(e))
      }
      getQueryData(e) {
        return super.getQueryData(te(e))
      }
      ensureQueryData(e) {
        return super.ensureQueryData(te(e))
      }
      getQueriesData(e) {
        return super.getQueriesData(te(e))
      }
      setQueryData(e, t, n = {}) {
        return super.setQueryData(te(e), t, te(n))
      }
      setQueriesData(e, t, n = {}) {
        return super.setQueriesData(te(e), t, te(n))
      }
      getQueryState(e) {
        return super.getQueryState(te(e))
      }
      removeQueries(e = {}) {
        return super.removeQueries(te(e))
      }
      resetQueries(e = {}, t = {}) {
        return super.resetQueries(te(e), te(t))
      }
      cancelQueries(e = {}, t = {}) {
        return super.cancelQueries(te(e), te(t))
      }
      invalidateQueries(e = {}, t = {}) {
        const n = te(e),
          r = te(t);
        if (super.invalidateQueries({
            ...n,
            refetchType: "none"
          }, r), n.refetchType === "none") return Promise.resolve();
        const s = {
          ...n,
          type: n.refetchType ?? n.type ?? "active"
        };
        return Ys().then(() => super.refetchQueries(s, r))
      }
      refetchQueries(e = {}, t = {}) {
        return super.refetchQueries(te(e), te(t))
      }
      fetchQuery(e) {
        return super.fetchQuery(te(e))
      }
      prefetchQuery(e) {
        return super.prefetchQuery(te(e))
      }
      fetchInfiniteQuery(e) {
        return super.fetchInfiniteQuery(te(e))
      }
      prefetchInfiniteQuery(e) {
        return super.prefetchInfiniteQuery(te(e))
      }
      setDefaultOptions(e) {
        super.setDefaultOptions(te(e))
      }
      setQueryDefaults(e, t) {
        super.setQueryDefaults(te(e), te(t))
      }
      getQueryDefaults(e) {
        return super.getQueryDefaults(te(e))
      }
      setMutationDefaults(e, t) {
        super.setMutationDefaults(te(e), te(t))
      }
      getMutationDefaults(e) {
        return super.getMutationDefaults(te(e))
      }
    },
    Nh = {
      install: (e, t = {}) => {
        const n = Mc(t.queryClientKey);
        let r;
        if ("queryClient" in t && t.queryClient) r = t.queryClient;
        else {
          const o = "queryClientConfig" in t ? t.queryClientConfig : void 0;
          r = new $c(o)
        }
        Zn || r.mount();
        let s = () => {};
        if (t.clientPersister) {
          r.isRestoring && (r.isRestoring.value = !0);
          const [o, a] = t.clientPersister(r);
          s = o, a.then(() => {
            var l;
            r.isRestoring && (r.isRestoring.value = !1), (l = t.clientPersisterOnSuccess) == null || l.call(t, r)
          })
        }
        const i = () => {
          r.unmount(), s()
        };
        if (e.onUnmount) e.onUnmount(i);
        else {
          const o = e.unmount;
          e.unmount = function() {
            i(), o()
          }
        }
        e.provide(n, r)
      }
    };

  function Dh(e, t, n) {
    const r = Lh(),
      s = ee(() => {
        var b;
        const m = te(t);
        typeof m.enabled == "function" && (m.enabled = m.enabled());
        const O = r.defaultQueryOptions(m);
        return O._optimisticResults = (b = r.isRestoring) != null && b.value ? "isRestoring" : "optimistic", O
      }),
      i = new e(r, s.value),
      o = s.value.shallow ? Za(i.getCurrentResult()) : Zt(i.getCurrentResult());
    let a = () => {};
    r.isRestoring && Ce(r.isRestoring, m => {
      m || (a(), a = i.subscribe(O => {
        Fc(o, O)
      }))
    }, {
      immediate: !0
    });
    const l = () => {
      i.setOptions(s.value), Fc(o, i.getCurrentResult())
    };
    Ce(s, l), Na(() => {
      a()
    });
    const c = (...m) => (l(), o.refetch(...m)),
      u = () => new Promise((m, O) => {
        let b = () => {};
        const E = () => {
          if (s.value.enabled !== !1) {
            i.setOptions(s.value);
            const g = i.getOptimisticResult(s.value);
            g.isStale ? (b(), i.fetchOptimistic(s.value).then(m, x => {
              Tc(s.value.throwOnError, [x, i.getCurrentQuery()]) ? O(x) : m(i.getCurrentResult())
            })) : (b(), m(g))
          }
        };
        E(), b = Ce(s, E)
      });
    Ce(() => o.error, m => {
      if (o.isError && !o.isFetching && Tc(s.value.throwOnError, [m, i.getCurrentQuery()])) throw m
    });
    const f = s.value.shallow ? pd(o) : Jr(o),
      h = Bs(f);
    for (const m in o) typeof o[m] == "function" && (h[m] = o[m]);
    return h.suspense = u, h.refetch = c, h
  }

  function Oo(e, t) {
    return Dh(Th, e)
  }
  const vr = new $c;
  /*!
   * shared v10.0.7
   * (c) 2025 kazuya kawaguchi
   * Released under the MIT License.
   */
  const ci = typeof window < "u",
    Tn = (e, t = !1) => t ? Symbol.for(e) : Symbol(e),
    hs = e => typeof e == "number" && isFinite(e),
    Uc = e => Wc(e) === "[object RegExp]",
    Mh = e => At(e) && Object.keys(e).length === 0,
    Wt = Object.assign,
    Fh = Object.create,
    at = (e = null) => Fh(e);
  let jc;
  const Vc = () => jc || (jc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : at()),
    $h = Object.prototype.hasOwnProperty;

  function ui(e, t) {
    return $h.call(e, t)
  }
  const nn = Array.isArray,
    fi = e => typeof e == "function",
    ke = e => typeof e == "string",
    rn = e => typeof e == "boolean",
    lt = e => e !== null && typeof e == "object",
    Uh = Object.prototype.toString,
    Wc = e => Uh.call(e),
    At = e => Wc(e) === "[object Object]",
    di = e => !lt(e) || nn(e);

  function pi(e, t) {
    if (di(e) || di(t)) throw new Error("Invalid value");
    const n = [{
      src: e,
      des: t
    }];
    for (; n.length;) {
      const {
        src: r,
        des: s
      } = n.pop();
      Object.keys(r).forEach(i => {
        i !== "__proto__" && (lt(r[i]) && !lt(s[i]) && (s[i] = Array.isArray(r[i]) ? [] : at()), di(s[i]) || di(r[i]) ? s[i] = r[i] : n.push({
          src: r[i],
          des: s[i]
        }))
      })
    }
  }
  /*!
   * shared v10.0.7
   * (c) 2025 kazuya kawaguchi
   * Released under the MIT License.
   */
  const jh = (e, t, n) => Vh({
      l: e,
      k: t,
      s: n
    }),
    Vh = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"),
    tt = e => typeof e == "number" && isFinite(e),
    Wh = e => Io(e) === "[object Date]",
    Hc = e => Io(e) === "[object RegExp]",
    Ao = e => xe(e) && Object.keys(e).length === 0,
    Cn = Object.assign,
    Hh = Object.create,
    nt = (e = null) => Hh(e);
  let Bc;
  const Bh = () => Bc || (Bc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : nt());

  function Kc(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
  }
  const Kh = Object.prototype.hasOwnProperty;

  function er(e, t) {
    return Kh.call(e, t)
  }
  const Ht = Array.isArray,
    De = e => typeof e == "function",
    X = e => typeof e == "string",
    ct = e => typeof e == "boolean",
    Be = e => e !== null && typeof e == "object",
    Qh = e => Be(e) && De(e.then) && De(e.catch),
    Qc = Object.prototype.toString,
    Io = e => Qc.call(e),
    xe = e => Io(e) === "[object Object]",
    Gh = e => e == null ? "" : Ht(e) || xe(e) && e.toString === Qc ? JSON.stringify(e, null, 2) : String(e);

  function Po(e, t = "") {
    return e.reduce((n, r, s) => s === 0 ? n + r : n + t + r, "")
  }

  function qh(e, t) {
    typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack))
  }
  /*!
   * message-compiler v10.0.7
   * (c) 2025 kazuya kawaguchi
   * Released under the MIT License.
   */
  function Yh(e, t, n) {
    return {
      line: e,
      column: t,
      offset: n
    }
  }

  function Lo(e, t, n) {
    return {
      start: e,
      end: t
    }
  }
  const ge = {
      EXPECTED_TOKEN: 1,
      INVALID_TOKEN_IN_PLACEHOLDER: 2,
      UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
      UNKNOWN_ESCAPE_SEQUENCE: 4,
      INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
      UNBALANCED_CLOSING_BRACE: 6,
      UNTERMINATED_CLOSING_BRACE: 7,
      EMPTY_PLACEHOLDER: 8,
      NOT_ALLOW_NEST_PLACEHOLDER: 9,
      INVALID_LINKED_FORMAT: 10,
      MUST_HAVE_MESSAGES_IN_PLURAL: 11,
      UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
      UNEXPECTED_EMPTY_LINKED_KEY: 13,
      UNEXPECTED_LEXICAL_ANALYSIS: 14
    },
    zh = 17;

  function hi(e, t, n = {}) {
    const {
      domain: r,
      messages: s,
      args: i
    } = n, o = e, a = new SyntaxError(String(o));
    return a.code = e, t && (a.location = t), a.domain = r, a
  }

  function Xh(e) {
    throw e
  }
  const sn = " ",
    Jh = "\r",
    rt = `
`,
    Zh = "\u2028",
    eg = "\u2029";

  function tg(e) {
    const t = e;
    let n = 0,
      r = 1,
      s = 1,
      i = 0;
    const o = k => t[k] === Jh && t[k + 1] === rt,
      a = k => t[k] === rt,
      l = k => t[k] === eg,
      c = k => t[k] === Zh,
      u = k => o(k) || a(k) || l(k) || c(k),
      f = () => n,
      h = () => r,
      m = () => s,
      O = () => i,
      b = k => o(k) || l(k) || c(k) ? rt : t[k],
      E = () => b(n),
      g = () => b(n + i);

    function x() {
      return i = 0, u(n) && (r++, s = 0), o(n) && n++, n++, s++, t[n]
    }

    function S() {
      return o(n + i) && i++, i++, t[n + i]
    }

    function v() {
      n = 0, r = 1, s = 1, i = 0
    }

    function I(k = 0) {
      i = k
    }

    function R() {
      const k = n + i;
      for (; k !== n;) x();
      i = 0
    }
    return {
      index: f,
      line: h,
      column: m,
      peekOffset: O,
      charAt: b,
      currentChar: E,
      currentPeek: g,
      next: x,
      peek: S,
      reset: v,
      resetPeek: I,
      skipToPeek: R
    }
  }
  const Sn = void 0,
    ng = ".",
    Gc = "'",
    rg = "tokenizer";

  function sg(e, t = {}) {
    const n = t.location !== !1,
      r = tg(e),
      s = () => r.index(),
      i = () => Yh(r.line(), r.column(), r.index()),
      o = i(),
      a = s(),
      l = {
        currentType: 13,
        offset: a,
        startLoc: o,
        endLoc: o,
        lastType: 13,
        lastOffset: a,
        lastStartLoc: o,
        lastEndLoc: o,
        braceNest: 0,
        inLinked: !1,
        text: ""
      },
      c = () => l,
      {
        onError: u
      } = t;

    function f(d, p, C, ...A) {
      const j = c();
      if (p.column += C, p.offset += C, u) {
        const N = n ? Lo(j.startLoc, p) : null,
          T = hi(d, N, {
            domain: rg,
            args: A
          });
        u(T)
      }
    }

    function h(d, p, C) {
      d.endLoc = i(), d.currentType = p;
      const A = {
        type: p
      };
      return n && (A.loc = Lo(d.startLoc, d.endLoc)), C != null && (A.value = C), A
    }
    const m = d => h(d, 13);

    function O(d, p) {
      return d.currentChar() === p ? (d.next(), p) : (f(ge.EXPECTED_TOKEN, i(), 0, p), "")
    }

    function b(d) {
      let p = "";
      for (; d.currentPeek() === sn || d.currentPeek() === rt;) p += d.currentPeek(), d.peek();
      return p
    }

    function E(d) {
      const p = b(d);
      return d.skipToPeek(), p
    }

    function g(d) {
      if (d === Sn) return !1;
      const p = d.charCodeAt(0);
      return p >= 97 && p <= 122 || p >= 65 && p <= 90 || p === 95
    }

    function x(d) {
      if (d === Sn) return !1;
      const p = d.charCodeAt(0);
      return p >= 48 && p <= 57
    }

    function S(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 2) return !1;
      b(d);
      const A = g(d.currentPeek());
      return d.resetPeek(), A
    }

    function v(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 2) return !1;
      b(d);
      const A = d.currentPeek() === "-" ? d.peek() : d.currentPeek(),
        j = x(A);
      return d.resetPeek(), j
    }

    function I(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 2) return !1;
      b(d);
      const A = d.currentPeek() === Gc;
      return d.resetPeek(), A
    }

    function R(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 7) return !1;
      b(d);
      const A = d.currentPeek() === ".";
      return d.resetPeek(), A
    }

    function k(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 8) return !1;
      b(d);
      const A = g(d.currentPeek());
      return d.resetPeek(), A
    }

    function V(d, p) {
      const {
        currentType: C
      } = p;
      if (!(C === 7 || C === 11)) return !1;
      b(d);
      const A = d.currentPeek() === ":";
      return d.resetPeek(), A
    }

    function U(d, p) {
      const {
        currentType: C
      } = p;
      if (C !== 9) return !1;
      const A = () => {
          const N = d.currentPeek();
          return N === "{" ? g(d.peek()) : N === "@" || N === "|" || N === ":" || N === "." || N === sn || !N ? !1 : N === rt ? (d.peek(), A()) : ne(d, !1)
        },
        j = A();
      return d.resetPeek(), j
    }

    function K(d) {
      b(d);
      const p = d.currentPeek() === "|";
      return d.resetPeek(), p
    }

    function ne(d, p = !0) {
      const C = (j = !1, N = "") => {
          const T = d.currentPeek();
          return T === "{" || T === "@" || !T ? j : T === "|" ? !(N === sn || N === rt) : T === sn ? (d.peek(), C(!0, sn)) : T === rt ? (d.peek(), C(!0, rt)) : !0
        },
        A = C();
      return p && d.resetPeek(), A
    }

    function H(d, p) {
      const C = d.currentChar();
      return C === Sn ? Sn : p(C) ? (d.next(), C) : null
    }

    function be(d) {
      const p = d.charCodeAt(0);
      return p >= 97 && p <= 122 || p >= 65 && p <= 90 || p >= 48 && p <= 57 || p === 95 || p === 36
    }

    function Ke(d) {
      return H(d, be)
    }

    function gt(d) {
      const p = d.charCodeAt(0);
      return p >= 97 && p <= 122 || p >= 65 && p <= 90 || p >= 48 && p <= 57 || p === 95 || p === 36 || p === 45
    }

    function Ee(d) {
      return H(d, gt)
    }

    function pe(d) {
      const p = d.charCodeAt(0);
      return p >= 48 && p <= 57
    }

    function ce(d) {
      return H(d, pe)
    }

    function Se(d) {
      const p = d.charCodeAt(0);
      return p >= 48 && p <= 57 || p >= 65 && p <= 70 || p >= 97 && p <= 102
    }

    function Et(d) {
      return H(d, Se)
    }

    function Ie(d) {
      let p = "",
        C = "";
      for (; p = ce(d);) C += p;
      return C
    }

    function ft(d) {
      let p = "";
      for (;;) {
        const C = d.currentChar();
        if (C === "{" || C === "}" || C === "@" || C === "|" || !C) break;
        if (C === sn || C === rt)
          if (ne(d)) p += C, d.next();
          else {
            if (K(d)) break;
            p += C, d.next()
          }
        else p += C, d.next()
      }
      return p
    }

    function Hr(d) {
      E(d);
      let p = "",
        C = "";
      for (; p = Ee(d);) C += p;
      return d.currentChar() === Sn && f(ge.UNTERMINATED_CLOSING_BRACE, i(), 0), C
    }

    function As(d) {
      E(d);
      let p = "";
      return d.currentChar() === "-" ? (d.next(), p += `-${Ie(d)}`) : p += Ie(d), d.currentChar() === Sn && f(ge.UNTERMINATED_CLOSING_BRACE, i(), 0), p
    }

    function Ci(d) {
      return d !== Gc && d !== rt
    }

    function fn(d) {
      E(d), O(d, "'");
      let p = "",
        C = "";
      for (; p = H(d, Ci);) p === "\\" ? C += Wn(d) : C += p;
      const A = d.currentChar();
      return A === rt || A === Sn ? (f(ge.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), A === rt && (d.next(), O(d, "'")), C) : (O(d, "'"), C)
    }

    function Wn(d) {
      const p = d.currentChar();
      switch (p) {
        case "\\":
        case "'":
          return d.next(), `\\${p}`;
        case "u":
          return Hn(d, p, 4);
        case "U":
          return Hn(d, p, 6);
        default:
          return f(ge.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, p), ""
      }
    }

    function Hn(d, p, C) {
      O(d, p);
      let A = "";
      for (let j = 0; j < C; j++) {
        const N = Et(d);
        if (!N) {
          f(ge.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${p}${A}${d.currentChar()}`);
          break
        }
        A += N
      }
      return `\\${p}${A}`
    }

    function Br(d) {
      return d !== "{" && d !== "}" && d !== sn && d !== rt
    }

    function dn(d) {
      E(d);
      let p = "",
        C = "";
      for (; p = H(d, Br);) C += p;
      return C
    }

    function Si(d) {
      let p = "",
        C = "";
      for (; p = Ke(d);) C += p;
      return C
    }

    function w(d) {
      const p = C => {
        const A = d.currentChar();
        return A === "{" || A === "@" || A === "|" || A === "(" || A === ")" || !A || A === sn ? C : (C += A, d.next(), p(C))
      };
      return p("")
    }

    function y(d) {
      E(d);
      const p = O(d, "|");
      return E(d), p
    }

    function L(d, p) {
      let C = null;
      switch (d.currentChar()) {
        case "{":
          return p.braceNest >= 1 && f(ge.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), d.next(), C = h(p, 2, "{"), E(d), p.braceNest++, C;
        case "}":
          return p.braceNest > 0 && p.currentType === 2 && f(ge.EMPTY_PLACEHOLDER, i(), 0), d.next(), C = h(p, 3, "}"), p.braceNest--, p.braceNest > 0 && E(d), p.inLinked && p.braceNest === 0 && (p.inLinked = !1), C;
        case "@":
          return p.braceNest > 0 && f(ge.UNTERMINATED_CLOSING_BRACE, i(), 0), C = F(d, p) || m(p), p.braceNest = 0, C;
        default: {
          let j = !0,
            N = !0,
            T = !0;
          if (K(d)) return p.braceNest > 0 && f(ge.UNTERMINATED_CLOSING_BRACE, i(), 0), C = h(p, 1, y(d)), p.braceNest = 0, p.inLinked = !1, C;
          if (p.braceNest > 0 && (p.currentType === 4 || p.currentType === 5 || p.currentType === 6)) return f(ge.UNTERMINATED_CLOSING_BRACE, i(), 0), p.braceNest = 0, M(d, p);
          if (j = S(d, p)) return C = h(p, 4, Hr(d)), E(d), C;
          if (N = v(d, p)) return C = h(p, 5, As(d)), E(d), C;
          if (T = I(d, p)) return C = h(p, 6, fn(d)), E(d), C;
          if (!j && !N && !T) return C = h(p, 12, dn(d)), f(ge.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, C.value), E(d), C;
          break
        }
      }
      return C
    }

    function F(d, p) {
      const {
        currentType: C
      } = p;
      let A = null;
      const j = d.currentChar();
      switch ((C === 7 || C === 8 || C === 11 || C === 9) && (j === rt || j === sn) && f(ge.INVALID_LINKED_FORMAT, i(), 0), j) {
        case "@":
          return d.next(), A = h(p, 7, "@"), p.inLinked = !0, A;
        case ".":
          return E(d), d.next(), h(p, 8, ".");
        case ":":
          return E(d), d.next(), h(p, 9, ":");
        default:
          return K(d) ? (A = h(p, 1, y(d)), p.braceNest = 0, p.inLinked = !1, A) : R(d, p) || V(d, p) ? (E(d), F(d, p)) : k(d, p) ? (E(d), h(p, 11, Si(d))) : U(d, p) ? (E(d), j === "{" ? L(d, p) || A : h(p, 10, w(d))) : (C === 7 && f(ge.INVALID_LINKED_FORMAT, i(), 0), p.braceNest = 0, p.inLinked = !1, M(d, p))
      }
    }

    function M(d, p) {
      let C = {
        type: 13
      };
      if (p.braceNest > 0) return L(d, p) || m(p);
      if (p.inLinked) return F(d, p) || m(p);
      switch (d.currentChar()) {
        case "{":
          return L(d, p) || m(p);
        case "}":
          return f(ge.UNBALANCED_CLOSING_BRACE, i(), 0), d.next(), h(p, 3, "}");
        case "@":
          return F(d, p) || m(p);
        default: {
          if (K(d)) return C = h(p, 1, y(d)), p.braceNest = 0, p.inLinked = !1, C;
          if (ne(d)) return h(p, 0, ft(d));
          break
        }
      }
      return C
    }

    function $() {
      const {
        currentType: d,
        offset: p,
        startLoc: C,
        endLoc: A
      } = l;
      return l.lastType = d, l.lastOffset = p, l.lastStartLoc = C, l.lastEndLoc = A, l.offset = s(), l.startLoc = i(), r.currentChar() === Sn ? h(l, 13) : M(r, l)
    }
    return {
      nextToken: $,
      currentOffset: s,
      currentPosition: i,
      context: c
    }
  }
  const ig = "parser",
    og = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;

  function ag(e, t, n) {
    switch (e) {
      case "\\\\":
        return "\\";
      case "\\'":
        return "'";
      default: {
        const r = parseInt(t || n, 16);
        return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�"
      }
    }
  }

  function lg(e = {}) {
    const t = e.location !== !1,
      {
        onError: n
      } = e;

    function r(g, x, S, v, ...I) {
      const R = g.currentPosition();
      if (R.offset += v, R.column += v, n) {
        const k = t ? Lo(S, R) : null,
          V = hi(x, k, {
            domain: ig,
            args: I
          });
        n(V)
      }
    }

    function s(g, x, S) {
      const v = {
        type: g
      };
      return t && (v.start = x, v.end = x, v.loc = {
        start: S,
        end: S
      }), v
    }

    function i(g, x, S, v) {
      t && (g.end = x, g.loc && (g.loc.end = S))
    }

    function o(g, x) {
      const S = g.context(),
        v = s(3, S.offset, S.startLoc);
      return v.value = x, i(v, g.currentOffset(), g.currentPosition()), v
    }

    function a(g, x) {
      const S = g.context(),
        {
          lastOffset: v,
          lastStartLoc: I
        } = S,
        R = s(5, v, I);
      return R.index = parseInt(x, 10), g.nextToken(), i(R, g.currentOffset(), g.currentPosition()), R
    }

    function l(g, x) {
      const S = g.context(),
        {
          lastOffset: v,
          lastStartLoc: I
        } = S,
        R = s(4, v, I);
      return R.key = x, g.nextToken(), i(R, g.currentOffset(), g.currentPosition()), R
    }

    function c(g, x) {
      const S = g.context(),
        {
          lastOffset: v,
          lastStartLoc: I
        } = S,
        R = s(9, v, I);
      return R.value = x.replace(og, ag), g.nextToken(), i(R, g.currentOffset(), g.currentPosition()), R
    }

    function u(g) {
      const x = g.nextToken(),
        S = g.context(),
        {
          lastOffset: v,
          lastStartLoc: I
        } = S,
        R = s(8, v, I);
      return x.type !== 11 ? (r(g, ge.UNEXPECTED_EMPTY_LINKED_MODIFIER, S.lastStartLoc, 0), R.value = "", i(R, v, I), {
        nextConsumeToken: x,
        node: R
      }) : (x.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, Bt(x)), R.value = x.value || "", i(R, g.currentOffset(), g.currentPosition()), {
        node: R
      })
    }

    function f(g, x) {
      const S = g.context(),
        v = s(7, S.offset, S.startLoc);
      return v.value = x, i(v, g.currentOffset(), g.currentPosition()), v
    }

    function h(g) {
      const x = g.context(),
        S = s(6, x.offset, x.startLoc);
      let v = g.nextToken();
      if (v.type === 8) {
        const I = u(g);
        S.modifier = I.node, v = I.nextConsumeToken || g.nextToken()
      }
      switch (v.type !== 9 && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(v)), v = g.nextToken(), v.type === 2 && (v = g.nextToken()), v.type) {
        case 10:
          v.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(v)), S.key = f(g, v.value || "");
          break;
        case 4:
          v.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(v)), S.key = l(g, v.value || "");
          break;
        case 5:
          v.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(v)), S.key = a(g, v.value || "");
          break;
        case 6:
          v.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(v)), S.key = c(g, v.value || "");
          break;
        default: {
          r(g, ge.UNEXPECTED_EMPTY_LINKED_KEY, x.lastStartLoc, 0);
          const I = g.context(),
            R = s(7, I.offset, I.startLoc);
          return R.value = "", i(R, I.offset, I.startLoc), S.key = R, i(S, I.offset, I.startLoc), {
            nextConsumeToken: v,
            node: S
          }
        }
      }
      return i(S, g.currentOffset(), g.currentPosition()), {
        node: S
      }
    }

    function m(g) {
      const x = g.context(),
        S = x.currentType === 1 ? g.currentOffset() : x.offset,
        v = x.currentType === 1 ? x.endLoc : x.startLoc,
        I = s(2, S, v);
      I.items = [];
      let R = null;
      do {
        const U = R || g.nextToken();
        switch (R = null, U.type) {
          case 0:
            U.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(U)), I.items.push(o(g, U.value || ""));
            break;
          case 5:
            U.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(U)), I.items.push(a(g, U.value || ""));
            break;
          case 4:
            U.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(U)), I.items.push(l(g, U.value || ""));
            break;
          case 6:
            U.value == null && r(g, ge.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Bt(U)), I.items.push(c(g, U.value || ""));
            break;
          case 7: {
            const K = h(g);
            I.items.push(K.node), R = K.nextConsumeToken || null;
            break
          }
        }
      } while (x.currentType !== 13 && x.currentType !== 1);
      const k = x.currentType === 1 ? x.lastOffset : g.currentOffset(),
        V = x.currentType === 1 ? x.lastEndLoc : g.currentPosition();
      return i(I, k, V), I
    }

    function O(g, x, S, v) {
      const I = g.context();
      let R = v.items.length === 0;
      const k = s(1, x, S);
      k.cases = [], k.cases.push(v);
      do {
        const V = m(g);
        R || (R = V.items.length === 0), k.cases.push(V)
      } while (I.currentType !== 13);
      return R && r(g, ge.MUST_HAVE_MESSAGES_IN_PLURAL, S, 0), i(k, g.currentOffset(), g.currentPosition()), k
    }

    function b(g) {
      const x = g.context(),
        {
          offset: S,
          startLoc: v
        } = x,
        I = m(g);
      return x.currentType === 13 ? I : O(g, S, v, I)
    }

    function E(g) {
      const x = sg(g, Cn({}, e)),
        S = x.context(),
        v = s(0, S.offset, S.startLoc);
      return t && v.loc && (v.loc.source = g), v.body = b(x), e.onCacheKey && (v.cacheKey = e.onCacheKey(g)), S.currentType !== 13 && r(x, ge.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, g[S.offset] || ""), i(v, x.currentOffset(), x.currentPosition()), v
    }
    return {
      parse: E
    }
  }

  function Bt(e) {
    if (e.type === 13) return "EOF";
    const t = (e.value || "").replace(/\r?\n/gu, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "…" : t
  }

  function cg(e, t = {}) {
    const n = {
      ast: e,
      helpers: new Set
    };
    return {
      context: () => n,
      helper: i => (n.helpers.add(i), i)
    }
  }

  function qc(e, t) {
    for (let n = 0; n < e.length; n++) ko(e[n], t)
  }

  function ko(e, t) {
    switch (e.type) {
      case 1:
        qc(e.cases, t), t.helper("plural");
        break;
      case 2:
        qc(e.items, t);
        break;
      case 6: {
        ko(e.key, t), t.helper("linked"), t.helper("type");
        break
      }
      case 5:
        t.helper("interpolate"), t.helper("list");
        break;
      case 4:
        t.helper("interpolate"), t.helper("named");
        break
    }
  }

  function ug(e, t = {}) {
    const n = cg(e);
    n.helper("normalize"), e.body && ko(e.body, n);
    const r = n.context();
    e.helpers = Array.from(r.helpers)
  }

  function fg(e) {
    const t = e.body;
    return t.type === 2 ? Yc(t) : t.cases.forEach(n => Yc(n)), e
  }

  function Yc(e) {
    if (e.items.length === 1) {
      const t = e.items[0];
      (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value)
    } else {
      const t = [];
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        if (!(r.type === 3 || r.type === 9) || r.value == null) break;
        t.push(r.value)
      }
      if (t.length === e.items.length) {
        e.static = Po(t);
        for (let n = 0; n < e.items.length; n++) {
          const r = e.items[n];
          (r.type === 3 || r.type === 9) && delete r.value
        }
      }
    }
  }

  function yr(e) {
    switch (e.t = e.type, e.type) {
      case 0: {
        const t = e;
        yr(t.body), t.b = t.body, delete t.body;
        break
      }
      case 1: {
        const t = e,
          n = t.cases;
        for (let r = 0; r < n.length; r++) yr(n[r]);
        t.c = n, delete t.cases;
        break
      }
      case 2: {
        const t = e,
          n = t.items;
        for (let r = 0; r < n.length; r++) yr(n[r]);
        t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
        break
      }
      case 3:
      case 9:
      case 8:
      case 7: {
        const t = e;
        t.value && (t.v = t.value, delete t.value);
        break
      }
      case 6: {
        const t = e;
        yr(t.key), t.k = t.key, delete t.key, t.modifier && (yr(t.modifier), t.m = t.modifier, delete t.modifier);
        break
      }
      case 5: {
        const t = e;
        t.i = t.index, delete t.index;
        break
      }
      case 4: {
        const t = e;
        t.k = t.key, delete t.key;
        break
      }
    }
    delete e.type
  }

  function dg(e, t) {
    const {
      filename: n,
      breakLineCode: r,
      needIndent: s
    } = t, i = t.location !== !1, o = {
      filename: n,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: r,
      needIndent: s,
      indentLevel: 0
    };
    i && e.loc && (o.source = e.loc.source);
    const a = () => o;

    function l(b, E) {
      o.code += b
    }

    function c(b, E = !0) {
      const g = E ? r : "";
      l(s ? g + "  ".repeat(b) : g)
    }

    function u(b = !0) {
      const E = ++o.indentLevel;
      b && c(E)
    }

    function f(b = !0) {
      const E = --o.indentLevel;
      b && c(E)
    }

    function h() {
      c(o.indentLevel)
    }
    return {
      context: a,
      push: l,
      indent: u,
      deindent: f,
      newline: h,
      helper: b => `_${b}`,
      needIndent: () => o.needIndent
    }
  }

  function pg(e, t) {
    const {
      helper: n
    } = e;
    e.push(`${n("linked")}(`), _r(e, t.key), t.modifier ? (e.push(", "), _r(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")")
  }

  function hg(e, t) {
    const {
      helper: n,
      needIndent: r
    } = e;
    e.push(`${n("normalize")}([`), e.indent(r());
    const s = t.items.length;
    for (let i = 0; i < s && (_r(e, t.items[i]), i !== s - 1); i++) e.push(", ");
    e.deindent(r()), e.push("])")
  }

  function gg(e, t) {
    const {
      helper: n,
      needIndent: r
    } = e;
    if (t.cases.length > 1) {
      e.push(`${n("plural")}([`), e.indent(r());
      const s = t.cases.length;
      for (let i = 0; i < s && (_r(e, t.cases[i]), i !== s - 1); i++) e.push(", ");
      e.deindent(r()), e.push("])")
    }
  }

  function mg(e, t) {
    t.body ? _r(e, t.body) : e.push("null")
  }

  function _r(e, t) {
    const {
      helper: n
    } = e;
    switch (t.type) {
      case 0:
        mg(e, t);
        break;
      case 1:
        gg(e, t);
        break;
      case 2:
        hg(e, t);
        break;
      case 6:
        pg(e, t);
        break;
      case 8:
        e.push(JSON.stringify(t.value), t);
        break;
      case 7:
        e.push(JSON.stringify(t.value), t);
        break;
      case 5:
        e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
        break;
      case 4:
        e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t);
        break;
      case 9:
        e.push(JSON.stringify(t.value), t);
        break;
      case 3:
        e.push(JSON.stringify(t.value), t);
        break
    }
  }
  const wg = (e, t = {}) => {
    const n = X(t.mode) ? t.mode : "normal",
      r = X(t.filename) ? t.filename : "message.intl";
    t.sourceMap;
    const s = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`,
      i = t.needIndent ? t.needIndent : n !== "arrow",
      o = e.helpers || [],
      a = dg(e, {
        filename: r,
        breakLineCode: s,
        needIndent: i
      });
    a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), o.length > 0 && (a.push(`const { ${Po(o.map(u=>`${u}: _${u}`),", ")} } = ctx`), a.newline()), a.push("return "), _r(a, e), a.deindent(i), a.push("}"), delete e.helpers;
    const {
      code: l,
      map: c
    } = a.context();
    return {
      ast: e,
      code: l,
      map: c ? c.toJSON() : void 0
    }
  };

  function bg(e, t = {}) {
    const n = Cn({}, t),
      r = !!n.jit,
      s = !!n.minify,
      i = n.optimize == null ? !0 : n.optimize,
      a = lg(n).parse(e);
    return r ? (i && fg(a), s && yr(a), {
      ast: a,
      code: ""
    }) : (ug(a, n), wg(a, n))
  }
  /*!
   * core-base v10.0.7
   * (c) 2025 kazuya kawaguchi
   * Released under the MIT License.
   */
  function vg() {
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Bh().__INTLIFY_PROD_DEVTOOLS__ = !1)
  }

  function Kt(e) {
    return Be(e) && Ro(e) === 0 && (er(e, "b") || er(e, "body"))
  }
  const zc = ["b", "body"];

  function yg(e) {
    return On(e, zc)
  }
  const Xc = ["c", "cases"];

  function _g(e) {
    return On(e, Xc, [])
  }
  const Jc = ["s", "static"];

  function xg(e) {
    return On(e, Jc)
  }
  const Zc = ["i", "items"];

  function Eg(e) {
    return On(e, Zc, [])
  }
  const eu = ["t", "type"];

  function Ro(e) {
    return On(e, eu)
  }
  const tu = ["v", "value"];

  function gi(e, t) {
    const n = On(e, tu);
    if (n != null) return n;
    throw gs(t)
  }
  const nu = ["m", "modifier"];

  function Tg(e) {
    return On(e, nu)
  }
  const ru = ["k", "key"];

  function Cg(e) {
    const t = On(e, ru);
    if (t) return t;
    throw gs(6)
  }

  function On(e, t, n) {
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      if (er(e, s) && e[s] != null) return e[s]
    }
    return n
  }
  const su = [...zc, ...Xc, ...Jc, ...Zc, ...ru, ...nu, ...tu, ...eu];

  function gs(e) {
    return new Error(`unhandled node type: ${e}`)
  }

  function No(e) {
    return n => Sg(n, e)
  }

  function Sg(e, t) {
    const n = yg(t);
    if (n == null) throw gs(0);
    if (Ro(n) === 1) {
      const i = _g(n);
      return e.plural(i.reduce((o, a) => [...o, iu(e, a)], []))
    } else return iu(e, n)
  }

  function iu(e, t) {
    const n = xg(t);
    if (n != null) return e.type === "text" ? n : e.normalize([n]);
    {
      const r = Eg(t).reduce((s, i) => [...s, Do(e, i)], []);
      return e.normalize(r)
    }
  }

  function Do(e, t) {
    const n = Ro(t);
    switch (n) {
      case 3:
        return gi(t, n);
      case 9:
        return gi(t, n);
      case 4: {
        const r = t;
        if (er(r, "k") && r.k) return e.interpolate(e.named(r.k));
        if (er(r, "key") && r.key) return e.interpolate(e.named(r.key));
        throw gs(n)
      }
      case 5: {
        const r = t;
        if (er(r, "i") && tt(r.i)) return e.interpolate(e.list(r.i));
        if (er(r, "index") && tt(r.index)) return e.interpolate(e.list(r.index));
        throw gs(n)
      }
      case 6: {
        const r = t,
          s = Tg(r),
          i = Cg(r);
        return e.linked(Do(e, i), s ? Do(e, s) : void 0, e.type)
      }
      case 7:
        return gi(t, n);
      case 8:
        return gi(t, n);
      default:
        throw new Error(`unhandled node on format message part: ${n}`)
    }
  }
  const Og = e => e;
  let mi = nt();

  function Ag(e, t = {}) {
    let n = !1;
    const r = t.onError || Xh;
    return t.onError = s => {
      n = !0, r(s)
    }, {
      ...bg(e, t),
      detectError: n
    }
  }

  function Ig(e, t) {
    if (X(e)) {
      ct(t.warnHtmlMessage) && t.warnHtmlMessage;
      const r = (t.onCacheKey || Og)(e),
        s = mi[r];
      if (s) return s;
      const {
        ast: i,
        detectError: o
      } = Ag(e, {
        ...t,
        location: !1,
        jit: !0
      }), a = No(i);
      return o ? a : mi[r] = a
    } else {
      const n = e.cacheKey;
      if (n) {
        const r = mi[n];
        return r || (mi[n] = No(e))
      } else return No(e)
    }
  }
  let ms = null;

  function Pg(e) {
    ms = e
  }

  function Lg(e, t, n) {
    ms && ms.emit("i18n:init", {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n
    })
  }
  const kg = Rg("function:translate");

  function Rg(e) {
    return t => ms && ms.emit(e, t)
  }
  const on = {
      INVALID_ARGUMENT: zh,
      INVALID_DATE_ARGUMENT: 18,
      INVALID_ISO_DATE_ARGUMENT: 19,
      NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
      NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
      NOT_SUPPORT_LOCALE_TYPE: 23
    },
    Ng = 24;

  function an(e) {
    return hi(e, null, void 0)
  }

  function Mo(e, t) {
    return t.locale != null ? ou(t.locale) : ou(e.locale)
  }
  let Fo;

  function ou(e) {
    if (X(e)) return e;
    if (De(e)) {
      if (e.resolvedOnce && Fo != null) return Fo;
      if (e.constructor.name === "Function") {
        const t = e();
        if (Qh(t)) throw an(on.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        return Fo = t
      } else throw an(on.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)
    } else throw an(on.NOT_SUPPORT_LOCALE_TYPE)
  }

  function Dg(e, t, n) {
    return [...new Set([n, ...Ht(t) ? t : Be(t) ? Object.keys(t) : X(t) ? [t] : [n]])]
  }

  function au(e, t, n) {
    const r = X(n) ? n : bi,
      s = e;
    s.__localeChainCache || (s.__localeChainCache = new Map);
    let i = s.__localeChainCache.get(r);
    if (!i) {
      i = [];
      let o = [n];
      for (; Ht(o);) o = lu(i, o, t);
      const a = Ht(t) || !xe(t) ? t : t.default ? t.default : null;
      o = X(a) ? [a] : a, Ht(o) && lu(i, o, !1), s.__localeChainCache.set(r, i)
    }
    return i
  }

  function lu(e, t, n) {
    let r = !0;
    for (let s = 0; s < t.length && ct(r); s++) {
      const i = t[s];
      X(i) && (r = Mg(e, t[s], n))
    }
    return r
  }

  function Mg(e, t, n) {
    let r;
    const s = t.split("-");
    do {
      const i = s.join("-");
      r = Fg(e, i, n), s.splice(-1, 1)
    } while (s.length && r === !0);
    return r
  }

  function Fg(e, t, n) {
    let r = !1;
    if (!e.includes(t) && (r = !0, t)) {
      r = t[t.length - 1] !== "!";
      const s = t.replace(/!/g, "");
      e.push(s), (Ht(n) || xe(n)) && n[s] && (r = n[s])
    }
    return r
  }
  const An = [];
  An[0] = {
    w: [0],
    i: [3, 0],
    "[": [4],
    o: [7]
  }, An[1] = {
    w: [1],
    ".": [2],
    "[": [4],
    o: [7]
  }, An[2] = {
    w: [2],
    i: [3, 0],
    0: [3, 0]
  }, An[3] = {
    i: [3, 0],
    0: [3, 0],
    w: [1, 1],
    ".": [2, 1],
    "[": [4, 1],
    o: [7, 1]
  }, An[4] = {
    "'": [5, 0],
    '"': [6, 0],
    "[": [4, 2],
    "]": [1, 3],
    o: 8,
    l: [4, 0]
  }, An[5] = {
    "'": [4, 0],
    o: 8,
    l: [5, 0]
  }, An[6] = {
    '"': [4, 0],
    o: 8,
    l: [6, 0]
  };
  const $g = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;

  function Ug(e) {
    return $g.test(e)
  }

  function jg(e) {
    const t = e.charCodeAt(0),
      n = e.charCodeAt(e.length - 1);
    return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e
  }

  function Vg(e) {
    if (e == null) return "o";
    switch (e.charCodeAt(0)) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return e;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w"
    }
    return "i"
  }

  function Wg(e) {
    const t = e.trim();
    return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Ug(t) ? jg(t) : "*" + t
  }

  function Hg(e) {
    const t = [];
    let n = -1,
      r = 0,
      s = 0,
      i, o, a, l, c, u, f;
    const h = [];
    h[0] = () => {
      o === void 0 ? o = a : o += a
    }, h[1] = () => {
      o !== void 0 && (t.push(o), o = void 0)
    }, h[2] = () => {
      h[0](), s++
    }, h[3] = () => {
      if (s > 0) s--, r = 4, h[0]();
      else {
        if (s = 0, o === void 0 || (o = Wg(o), o === !1)) return !1;
        h[1]()
      }
    };

    function m() {
      const O = e[n + 1];
      if (r === 5 && O === "'" || r === 6 && O === '"') return n++, a = "\\" + O, h[0](), !0
    }
    for (; r !== null;)
      if (n++, i = e[n], !(i === "\\" && m())) {
        if (l = Vg(i), f = An[r], c = f[l] || f.l || 8, c === 8 || (r = c[0], c[1] !== void 0 && (u = h[c[1]], u && (a = i, u() === !1)))) return;
        if (r === 7) return t
      }
  }
  const cu = new Map;

  function Bg(e, t) {
    return Be(e) ? e[t] : null
  }

  function Kg(e, t) {
    if (!Be(e)) return null;
    let n = cu.get(t);
    if (n || (n = Hg(t), n && cu.set(t, n)), !n) return null;
    const r = n.length;
    let s = e,
      i = 0;
    for (; i < r;) {
      const o = n[i];
      if (su.includes(o) && Kt(s)) return null;
      const a = s[o];
      if (a === void 0 || De(s)) return null;
      s = a, i++
    }
    return s
  }
  const Qg = "10.0.7",
    wi = -1,
    bi = "en-US",
    uu = "",
    fu = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;

  function Gg() {
    return {
      upper: (e, t) => t === "text" && X(e) ? e.toUpperCase() : t === "vnode" && Be(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
      lower: (e, t) => t === "text" && X(e) ? e.toLowerCase() : t === "vnode" && Be(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
      capitalize: (e, t) => t === "text" && X(e) ? fu(e) : t === "vnode" && Be(e) && "__v_isVNode" in e ? fu(e.children) : e
    }
  }
  let du;

  function qg(e) {
    du = e
  }
  let pu;

  function Yg(e) {
    pu = e
  }
  let hu;

  function zg(e) {
    hu = e
  }
  let gu = null;
  const Xg = e => {
      gu = e
    },
    Jg = () => gu;
  let mu = null;
  const wu = e => {
      mu = e
    },
    Zg = () => mu;
  let bu = 0;

  function em(e = {}) {
    const t = De(e.onWarn) ? e.onWarn : qh,
      n = X(e.version) ? e.version : Qg,
      r = X(e.locale) || De(e.locale) ? e.locale : bi,
      s = De(r) ? bi : r,
      i = Ht(e.fallbackLocale) || xe(e.fallbackLocale) || X(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : s,
      o = xe(e.messages) ? e.messages : $o(s),
      a = xe(e.datetimeFormats) ? e.datetimeFormats : $o(s),
      l = xe(e.numberFormats) ? e.numberFormats : $o(s),
      c = Cn(nt(), e.modifiers, Gg()),
      u = e.pluralRules || nt(),
      f = De(e.missing) ? e.missing : null,
      h = ct(e.missingWarn) || Hc(e.missingWarn) ? e.missingWarn : !0,
      m = ct(e.fallbackWarn) || Hc(e.fallbackWarn) ? e.fallbackWarn : !0,
      O = !!e.fallbackFormat,
      b = !!e.unresolving,
      E = De(e.postTranslation) ? e.postTranslation : null,
      g = xe(e.processor) ? e.processor : null,
      x = ct(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
      S = !!e.escapeParameter,
      v = De(e.messageCompiler) ? e.messageCompiler : du,
      I = De(e.messageResolver) ? e.messageResolver : pu || Bg,
      R = De(e.localeFallbacker) ? e.localeFallbacker : hu || Dg,
      k = Be(e.fallbackContext) ? e.fallbackContext : void 0,
      V = e,
      U = Be(V.__datetimeFormatters) ? V.__datetimeFormatters : new Map,
      K = Be(V.__numberFormatters) ? V.__numberFormatters : new Map,
      ne = Be(V.__meta) ? V.__meta : {};
    bu++;
    const H = {
      version: n,
      cid: bu,
      locale: r,
      fallbackLocale: i,
      messages: o,
      modifiers: c,
      pluralRules: u,
      missing: f,
      missingWarn: h,
      fallbackWarn: m,
      fallbackFormat: O,
      unresolving: b,
      postTranslation: E,
      processor: g,
      warnHtmlMessage: x,
      escapeParameter: S,
      messageCompiler: v,
      messageResolver: I,
      localeFallbacker: R,
      fallbackContext: k,
      onWarn: t,
      __meta: ne
    };
    return H.datetimeFormats = a, H.numberFormats = l, H.__datetimeFormatters = U, H.__numberFormatters = K, __INTLIFY_PROD_DEVTOOLS__ && Lg(H, n, ne), H
  }
  const $o = e => ({
    [e]: nt()
  });

  function Uo(e, t, n, r, s) {
    const {
      missing: i,
      onWarn: o
    } = e;
    if (i !== null) {
      const a = i(e, n, t, s);
      return X(a) ? a : t
    } else return t
  }

  function ws(e, t, n) {
    const r = e;
    r.__localeChainCache = new Map, e.localeFallbacker(e, n, t)
  }

  function tm(e, t) {
    return e === t ? !1 : e.split("-")[0] === t.split("-")[0]
  }

  function nm(e, t) {
    const n = t.indexOf(e);
    if (n === -1) return !1;
    for (let r = n + 1; r < t.length; r++)
      if (tm(e, t[r])) return !0;
    return !1
  }

  function vu(e, ...t) {
    const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: i,
      localeFallbacker: o
    } = e, {
      __datetimeFormatters: a
    } = e, [l, c, u, f] = jo(...t), h = ct(u.missingWarn) ? u.missingWarn : e.missingWarn;
    ct(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const m = !!u.part,
      O = Mo(e, u),
      b = o(e, s, O);
    if (!X(l) || l === "") return new Intl.DateTimeFormat(O, f).format(c);
    let E = {},
      g, x = null;
    const S = "datetime format";
    for (let R = 0; R < b.length && (g = b[R], E = n[g] || {}, x = E[l], !xe(x)); R++) Uo(e, l, g, h, S);
    if (!xe(x) || !X(g)) return r ? wi : l;
    let v = `${g}__${l}`;
    Ao(f) || (v = `${v}__${JSON.stringify(f)}`);
    let I = a.get(v);
    return I || (I = new Intl.DateTimeFormat(g, Cn({}, x, f)), a.set(v, I)), m ? I.formatToParts(c) : I.format(c)
  }
  const yu = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];

  function jo(...e) {
    const [t, n, r, s] = e, i = nt();
    let o = nt(),
      a;
    if (X(t)) {
      const l = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
      if (!l) throw an(on.INVALID_ISO_DATE_ARGUMENT);
      const c = l[3] ? l[3].trim().startsWith("T") ? `${l[1].trim()}${l[3].trim()}` : `${l[1].trim()}T${l[3].trim()}` : l[1].trim();
      a = new Date(c);
      try {
        a.toISOString()
      } catch {
        throw an(on.INVALID_ISO_DATE_ARGUMENT)
      }
    } else if (Wh(t)) {
      if (isNaN(t.getTime())) throw an(on.INVALID_DATE_ARGUMENT);
      a = t
    } else if (tt(t)) a = t;
    else throw an(on.INVALID_ARGUMENT);
    return X(n) ? i.key = n : xe(n) && Object.keys(n).forEach(l => {
      yu.includes(l) ? o[l] = n[l] : i[l] = n[l]
    }), X(r) ? i.locale = r : xe(r) && (o = r), xe(s) && (o = s), [i.key || "", a, i, o]
  }

  function _u(e, t, n) {
    const r = e;
    for (const s in n) {
      const i = `${t}__${s}`;
      r.__datetimeFormatters.has(i) && r.__datetimeFormatters.delete(i)
    }
  }

  function xu(e, ...t) {
    const {
      numberFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: i,
      localeFallbacker: o
    } = e, {
      __numberFormatters: a
    } = e, [l, c, u, f] = Vo(...t), h = ct(u.missingWarn) ? u.missingWarn : e.missingWarn;
    ct(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const m = !!u.part,
      O = Mo(e, u),
      b = o(e, s, O);
    if (!X(l) || l === "") return new Intl.NumberFormat(O, f).format(c);
    let E = {},
      g, x = null;
    const S = "number format";
    for (let R = 0; R < b.length && (g = b[R], E = n[g] || {}, x = E[l], !xe(x)); R++) Uo(e, l, g, h, S);
    if (!xe(x) || !X(g)) return r ? wi : l;
    let v = `${g}__${l}`;
    Ao(f) || (v = `${v}__${JSON.stringify(f)}`);
    let I = a.get(v);
    return I || (I = new Intl.NumberFormat(g, Cn({}, x, f)), a.set(v, I)), m ? I.formatToParts(c) : I.format(c)
  }
  const Eu = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];

  function Vo(...e) {
    const [t, n, r, s] = e, i = nt();
    let o = nt();
    if (!tt(t)) throw an(on.INVALID_ARGUMENT);
    const a = t;
    return X(n) ? i.key = n : xe(n) && Object.keys(n).forEach(l => {
      Eu.includes(l) ? o[l] = n[l] : i[l] = n[l]
    }), X(r) ? i.locale = r : xe(r) && (o = r), xe(s) && (o = s), [i.key || "", a, i, o]
  }

  function Tu(e, t, n) {
    const r = e;
    for (const s in n) {
      const i = `${t}__${s}`;
      r.__numberFormatters.has(i) && r.__numberFormatters.delete(i)
    }
  }
  const rm = e => e,
    sm = e => "",
    im = "text",
    om = e => e.length === 0 ? "" : Po(e),
    am = Gh;

  function Cu(e, t) {
    return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
  }

  function lm(e) {
    const t = tt(e.pluralIndex) ? e.pluralIndex : -1;
    return e.named && (tt(e.named.count) || tt(e.named.n)) ? tt(e.named.count) ? e.named.count : tt(e.named.n) ? e.named.n : t : t
  }

  function cm(e, t) {
    t.count || (t.count = e), t.n || (t.n = e)
  }

  function um(e = {}) {
    const t = e.locale,
      n = lm(e),
      r = Be(e.pluralRules) && X(t) && De(e.pluralRules[t]) ? e.pluralRules[t] : Cu,
      s = Be(e.pluralRules) && X(t) && De(e.pluralRules[t]) ? Cu : void 0,
      i = g => g[r(n, g.length, s)],
      o = e.list || [],
      a = g => o[g],
      l = e.named || nt();
    tt(e.pluralIndex) && cm(n, l);
    const c = g => l[g];

    function u(g, x) {
      const S = De(e.messages) ? e.messages(g, !!x) : Be(e.messages) ? e.messages[g] : !1;
      return S || (e.parent ? e.parent.message(g) : sm)
    }
    const f = g => e.modifiers ? e.modifiers[g] : rm,
      h = xe(e.processor) && De(e.processor.normalize) ? e.processor.normalize : om,
      m = xe(e.processor) && De(e.processor.interpolate) ? e.processor.interpolate : am,
      O = xe(e.processor) && X(e.processor.type) ? e.processor.type : im,
      E = {
        list: a,
        named: c,
        plural: i,
        linked: (g, ...x) => {
          const [S, v] = x;
          let I = "text",
            R = "";
          x.length === 1 ? Be(S) ? (R = S.modifier || R, I = S.type || I) : X(S) && (R = S || R) : x.length === 2 && (X(S) && (R = S || R), X(v) && (I = v || I));
          const k = u(g, !0)(E),
            V = I === "vnode" && Ht(k) && R ? k[0] : k;
          return R ? f(R)(V, I) : V
        },
        message: u,
        type: O,
        interpolate: m,
        normalize: h,
        values: Cn(nt(), o, l)
      };
    return E
  }
  const Su = () => "",
    yt = e => De(e);

  function Ou(e, ...t) {
    const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: s,
      messageCompiler: i,
      fallbackLocale: o,
      messages: a
    } = e, [l, c] = Wo(...t), u = ct(c.missingWarn) ? c.missingWarn : e.missingWarn, f = ct(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn, h = ct(c.escapeParameter) ? c.escapeParameter : e.escapeParameter, m = !!c.resolvedMessage, O = X(c.default) || ct(c.default) ? ct(c.default) ? i ? l : () => l : c.default : n ? i ? l : () => l : null, b = n || O != null && (X(O) || De(O)), E = Mo(e, c);
    h && fm(c);
    let [g, x, S] = m ? [l, E, a[E] || nt()] : Au(e, l, E, o, f, u), v = g, I = l;
    if (!m && !(X(v) || Kt(v) || yt(v)) && b && (v = O, I = v), !m && (!(X(v) || Kt(v) || yt(v)) || !X(x))) return s ? wi : l;
    let R = !1;
    const k = () => {
        R = !0
      },
      V = yt(v) ? v : Iu(e, l, x, v, I, k);
    if (R) return v;
    const U = hm(e, x, S, c),
      K = um(U),
      ne = dm(e, V, K),
      H = r ? r(ne, l) : ne;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      const be = {
        timestamp: Date.now(),
        key: X(l) ? l : yt(v) ? v.key : "",
        locale: x || (yt(v) ? v.locale : ""),
        format: X(v) ? v : yt(v) ? v.source : "",
        message: H
      };
      be.meta = Cn({}, e.__meta, Jg() || {}), kg(be)
    }
    return H
  }

  function fm(e) {
    Ht(e.list) ? e.list = e.list.map(t => X(t) ? Kc(t) : t) : Be(e.named) && Object.keys(e.named).forEach(t => {
      X(e.named[t]) && (e.named[t] = Kc(e.named[t]))
    })
  }

  function Au(e, t, n, r, s, i) {
    const {
      messages: o,
      onWarn: a,
      messageResolver: l,
      localeFallbacker: c
    } = e, u = c(e, r, n);
    let f = nt(),
      h, m = null;
    const O = "translate";
    for (let b = 0; b < u.length && (h = u[b], f = o[h] || nt(), (m = l(f, t)) === null && (m = f[t]), !(X(m) || Kt(m) || yt(m))); b++)
      if (!nm(h, u)) {
        const E = Uo(e, t, h, i, O);
        E !== t && (m = E)
      } return [m, h, f]
  }

  function Iu(e, t, n, r, s, i) {
    const {
      messageCompiler: o,
      warnHtmlMessage: a
    } = e;
    if (yt(r)) {
      const c = r;
      return c.locale = c.locale || n, c.key = c.key || t, c
    }
    if (o == null) {
      const c = () => r;
      return c.locale = n, c.key = t, c
    }
    const l = o(r, pm(e, n, s, r, a, i));
    return l.locale = n, l.key = t, l.source = r, l
  }

  function dm(e, t, n) {
    return t(n)
  }

  function Wo(...e) {
    const [t, n, r] = e, s = nt();
    if (!X(t) && !tt(t) && !yt(t) && !Kt(t)) throw an(on.INVALID_ARGUMENT);
    const i = tt(t) ? String(t) : (yt(t), t);
    return tt(n) ? s.plural = n : X(n) ? s.default = n : xe(n) && !Ao(n) ? s.named = n : Ht(n) && (s.list = n), tt(r) ? s.plural = r : X(r) ? s.default = r : xe(r) && Cn(s, r), [i, s]
  }

  function pm(e, t, n, r, s, i) {
    return {
      locale: t,
      key: n,
      warnHtmlMessage: s,
      onError: o => {
        throw i && i(o), o
      },
      onCacheKey: o => jh(t, n, o)
    }
  }

  function hm(e, t, n, r) {
    const {
      modifiers: s,
      pluralRules: i,
      messageResolver: o,
      fallbackLocale: a,
      fallbackWarn: l,
      missingWarn: c,
      fallbackContext: u
    } = e, h = {
      locale: t,
      modifiers: s,
      pluralRules: i,
      messages: (m, O) => {
        let b = o(n, m);
        if (b == null && (u || O)) {
          const [, , E] = Au(u || e, m, t, a, l, c);
          b = o(E, m)
        }
        if (X(b) || Kt(b)) {
          let E = !1;
          const x = Iu(e, m, t, b, m, () => {
            E = !0
          });
          return E ? Su : x
        } else return yt(b) ? b : Su
      }
    };
    return e.processor && (h.processor = e.processor), r.list && (h.list = r.list), r.named && (h.named = r.named), tt(r.plural) && (h.pluralIndex = r.plural), h
  }
  vg();
  /*!
   * vue-i18n v10.0.7
   * (c) 2025 kazuya kawaguchi
   * Released under the MIT License.
   */
  const gm = "10.0.7";

  function mm() {
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Vc().__INTLIFY_PROD_DEVTOOLS__ = !1)
  }
  const _t = {
    UNEXPECTED_RETURN_TYPE: Ng,
    INVALID_ARGUMENT: 25,
    MUST_BE_CALL_SETUP_TOP: 26,
    NOT_INSTALLED: 27,
    REQUIRED_VALUE: 28,
    INVALID_VALUE: 29,
    NOT_INSTALLED_WITH_PROVIDE: 31,
    UNEXPECTED_ERROR: 32
  };

  function It(e, ...t) {
    return hi(e, null, void 0)
  }
  const Ho = Tn("__translateVNode"),
    Bo = Tn("__datetimeParts"),
    Ko = Tn("__numberParts"),
    wm = Tn("__setPluralRules"),
    bm = Tn("__injectWithOption"),
    Qo = Tn("__dispose");

  function bs(e) {
    if (!lt(e) || Kt(e)) return e;
    for (const t in e)
      if (ui(e, t))
        if (!t.includes(".")) lt(e[t]) && bs(e[t]);
        else {
          const n = t.split("."),
            r = n.length - 1;
          let s = e,
            i = !1;
          for (let o = 0; o < r; o++) {
            if (n[o] === "__proto__") throw new Error(`unsafe key: ${n[o]}`);
            if (n[o] in s || (s[n[o]] = at()), !lt(s[n[o]])) {
              i = !0;
              break
            }
            s = s[n[o]]
          }
          if (i || (Kt(s) ? su.includes(n[r]) || delete e[t] : (s[n[r]] = e[t], delete e[t])), !Kt(s)) {
            const o = s[n[r]];
            lt(o) && bs(o)
          }
        } return e
  }

  function Pu(e, t) {
    const {
      messages: n,
      __i18n: r,
      messageResolver: s,
      flatJson: i
    } = t, o = At(n) ? n : nn(r) ? at() : {
      [e]: at()
    };
    if (nn(r) && r.forEach(a => {
        if ("locale" in a && "resource" in a) {
          const {
            locale: l,
            resource: c
          } = a;
          l ? (o[l] = o[l] || at(), pi(c, o[l])) : pi(c, o)
        } else ke(a) && pi(JSON.parse(a), o)
      }), s == null && i)
      for (const a in o) ui(o, a) && bs(o[a]);
    return o
  }

  function Lu(e) {
    return e.type
  }

  function vm(e, t, n) {
    let r = lt(t.messages) ? t.messages : at();
    "__i18nGlobal" in n && (r = Pu(e.locale.value, {
      messages: r,
      __i18n: n.__i18nGlobal
    }));
    const s = Object.keys(r);
    s.length && s.forEach(i => {
      e.mergeLocaleMessage(i, r[i])
    });
    {
      if (lt(t.datetimeFormats)) {
        const i = Object.keys(t.datetimeFormats);
        i.length && i.forEach(o => {
          e.mergeDateTimeFormat(o, t.datetimeFormats[o])
        })
      }
      if (lt(t.numberFormats)) {
        const i = Object.keys(t.numberFormats);
        i.length && i.forEach(o => {
          e.mergeNumberFormat(o, t.numberFormats[o])
        })
      }
    }
  }

  function ku(e) {
    return he(ss, null, e, 0)
  }
  const Ru = "__INTLIFY_META__",
    Nu = () => [],
    ym = () => !1;
  let Du = 0;

  function Mu(e) {
    return (t, n, r, s) => e(n, r, xn() || void 0, s)
  }
  const _m = () => {
    const e = xn();
    let t = null;
    return e && (t = Lu(e)[Ru]) ? {
      [Ru]: t
    } : null
  };

  function Fu(e = {}) {
    const {
      __root: t,
      __injectWithOption: n
    } = e, r = t === void 0, s = e.flatJson, i = ci ? re : gd;
    let o = rn(e.inheritLocale) ? e.inheritLocale : !0;
    const a = i(t && o ? t.locale.value : ke(e.locale) ? e.locale : bi),
      l = i(t && o ? t.fallbackLocale.value : ke(e.fallbackLocale) || nn(e.fallbackLocale) || At(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value),
      c = i(Pu(a.value, e)),
      u = i(At(e.datetimeFormats) ? e.datetimeFormats : {
        [a.value]: {}
      }),
      f = i(At(e.numberFormats) ? e.numberFormats : {
        [a.value]: {}
      });
    let h = t ? t.missingWarn : rn(e.missingWarn) || Uc(e.missingWarn) ? e.missingWarn : !0,
      m = t ? t.fallbackWarn : rn(e.fallbackWarn) || Uc(e.fallbackWarn) ? e.fallbackWarn : !0,
      O = t ? t.fallbackRoot : rn(e.fallbackRoot) ? e.fallbackRoot : !0,
      b = !!e.fallbackFormat,
      E = fi(e.missing) ? e.missing : null,
      g = fi(e.missing) ? Mu(e.missing) : null,
      x = fi(e.postTranslation) ? e.postTranslation : null,
      S = t ? t.warnHtmlMessage : rn(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
      v = !!e.escapeParameter;
    const I = t ? t.modifiers : At(e.modifiers) ? e.modifiers : {};
    let R = e.pluralRules || t && t.pluralRules,
      k;
    k = (() => {
      r && wu(null);
      const T = {
        version: gm,
        locale: a.value,
        fallbackLocale: l.value,
        messages: c.value,
        modifiers: I,
        pluralRules: R,
        missing: g === null ? void 0 : g,
        missingWarn: h,
        fallbackWarn: m,
        fallbackFormat: b,
        unresolving: !0,
        postTranslation: x === null ? void 0 : x,
        warnHtmlMessage: S,
        escapeParameter: v,
        messageResolver: e.messageResolver,
        messageCompiler: e.messageCompiler,
        __meta: {
          framework: "vue"
        }
      };
      T.datetimeFormats = u.value, T.numberFormats = f.value, T.__datetimeFormatters = At(k) ? k.__datetimeFormatters : void 0, T.__numberFormatters = At(k) ? k.__numberFormatters : void 0;
      const P = em(T);
      return r && wu(P), P
    })(), ws(k, a.value, l.value);

    function U() {
      return [a.value, l.value, c.value, u.value, f.value]
    }
    const K = ee({
        get: () => a.value,
        set: T => {
          a.value = T, k.locale = a.value
        }
      }),
      ne = ee({
        get: () => l.value,
        set: T => {
          l.value = T, k.fallbackLocale = l.value, ws(k, a.value, T)
        }
      }),
      H = ee(() => c.value),
      be = ee(() => u.value),
      Ke = ee(() => f.value);

    function gt() {
      return fi(x) ? x : null
    }

    function Ee(T) {
      x = T, k.postTranslation = T
    }

    function pe() {
      return E
    }

    function ce(T) {
      T !== null && (g = Mu(T)), E = T, k.missing = g
    }
    const Se = (T, P, B, G, se, Ue) => {
      U();
      let Le;
      try {
        __INTLIFY_PROD_DEVTOOLS__,
        r || (k.fallbackContext = t ? Zg() : void 0),
        Le = T(k)
      }
      finally {
        __INTLIFY_PROD_DEVTOOLS__,
        r || (k.fallbackContext = void 0)
      }
      if (B !== "translate exists" && hs(Le) && Le === wi || B === "translate exists" && !Le) {
        const [Tt, Nt] = P();
        return t && O ? G(t) : se(Tt)
      } else {
        if (Ue(Le)) return Le;
        throw It(_t.UNEXPECTED_RETURN_TYPE)
      }
    };

    function Et(...T) {
      return Se(P => Reflect.apply(Ou, null, [P, ...T]), () => Wo(...T), "translate", P => Reflect.apply(P.t, P, [...T]), P => P, P => ke(P))
    }

    function Ie(...T) {
      const [P, B, G] = T;
      if (G && !lt(G)) throw It(_t.INVALID_ARGUMENT);
      return Et(P, B, Wt({
        resolvedMessage: !0
      }, G || {}))
    }

    function ft(...T) {
      return Se(P => Reflect.apply(vu, null, [P, ...T]), () => jo(...T), "datetime format", P => Reflect.apply(P.d, P, [...T]), () => uu, P => ke(P))
    }

    function Hr(...T) {
      return Se(P => Reflect.apply(xu, null, [P, ...T]), () => Vo(...T), "number format", P => Reflect.apply(P.n, P, [...T]), () => uu, P => ke(P))
    }

    function As(T) {
      return T.map(P => ke(P) || hs(P) || rn(P) ? ku(String(P)) : P)
    }
    const fn = {
      normalize: As,
      interpolate: T => T,
      type: "vnode"
    };

    function Wn(...T) {
      return Se(P => {
        let B;
        const G = P;
        try {
          G.processor = fn, B = Reflect.apply(Ou, null, [G, ...T])
        } finally {
          G.processor = null
        }
        return B
      }, () => Wo(...T), "translate", P => P[Ho](...T), P => [ku(P)], P => nn(P))
    }

    function Hn(...T) {
      return Se(P => Reflect.apply(xu, null, [P, ...T]), () => Vo(...T), "number format", P => P[Ko](...T), Nu, P => ke(P) || nn(P))
    }

    function Br(...T) {
      return Se(P => Reflect.apply(vu, null, [P, ...T]), () => jo(...T), "datetime format", P => P[Bo](...T), Nu, P => ke(P) || nn(P))
    }

    function dn(T) {
      R = T, k.pluralRules = R
    }

    function Si(T, P) {
      return Se(() => {
        if (!T) return !1;
        const B = ke(P) ? P : a.value,
          G = L(B),
          se = k.messageResolver(G, T);
        return Kt(se) || yt(se) || ke(se)
      }, () => [T], "translate exists", B => Reflect.apply(B.te, B, [T, P]), ym, B => rn(B))
    }

    function w(T) {
      let P = null;
      const B = au(k, l.value, a.value);
      for (let G = 0; G < B.length; G++) {
        const se = c.value[B[G]] || {},
          Ue = k.messageResolver(se, T);
        if (Ue != null) {
          P = Ue;
          break
        }
      }
      return P
    }

    function y(T) {
      const P = w(T);
      return P ?? (t ? t.tm(T) || {} : {})
    }

    function L(T) {
      return c.value[T] || {}
    }

    function F(T, P) {
      if (s) {
        const B = {
          [T]: P
        };
        for (const G in B) ui(B, G) && bs(B[G]);
        P = B[T]
      }
      c.value[T] = P, k.messages = c.value
    }

    function M(T, P) {
      c.value[T] = c.value[T] || {};
      const B = {
        [T]: P
      };
      if (s)
        for (const G in B) ui(B, G) && bs(B[G]);
      P = B[T], pi(P, c.value[T]), k.messages = c.value
    }

    function $(T) {
      return u.value[T] || {}
    }

    function d(T, P) {
      u.value[T] = P, k.datetimeFormats = u.value, _u(k, T, P)
    }

    function p(T, P) {
      u.value[T] = Wt(u.value[T] || {}, P), k.datetimeFormats = u.value, _u(k, T, P)
    }

    function C(T) {
      return f.value[T] || {}
    }

    function A(T, P) {
      f.value[T] = P, k.numberFormats = f.value, Tu(k, T, P)
    }

    function j(T, P) {
      f.value[T] = Wt(f.value[T] || {}, P), k.numberFormats = f.value, Tu(k, T, P)
    }
    Du++, t && ci && (Ce(t.locale, T => {
      o && (a.value = T, k.locale = T, ws(k, a.value, l.value))
    }), Ce(t.fallbackLocale, T => {
      o && (l.value = T, k.fallbackLocale = T, ws(k, a.value, l.value))
    }));
    const N = {
      id: Du,
      locale: K,
      fallbackLocale: ne,
      get inheritLocale() {
        return o
      },
      set inheritLocale(T) {
        o = T, T && t && (a.value = t.locale.value, l.value = t.fallbackLocale.value, ws(k, a.value, l.value))
      },
      get availableLocales() {
        return Object.keys(c.value).sort()
      },
      messages: H,
      get modifiers() {
        return I
      },
      get pluralRules() {
        return R || {}
      },
      get isGlobal() {
        return r
      },
      get missingWarn() {
        return h
      },
      set missingWarn(T) {
        h = T, k.missingWarn = h
      },
      get fallbackWarn() {
        return m
      },
      set fallbackWarn(T) {
        m = T, k.fallbackWarn = m
      },
      get fallbackRoot() {
        return O
      },
      set fallbackRoot(T) {
        O = T
      },
      get fallbackFormat() {
        return b
      },
      set fallbackFormat(T) {
        b = T, k.fallbackFormat = b
      },
      get warnHtmlMessage() {
        return S
      },
      set warnHtmlMessage(T) {
        S = T, k.warnHtmlMessage = T
      },
      get escapeParameter() {
        return v
      },
      set escapeParameter(T) {
        v = T, k.escapeParameter = T
      },
      t: Et,
      getLocaleMessage: L,
      setLocaleMessage: F,
      mergeLocaleMessage: M,
      getPostTranslationHandler: gt,
      setPostTranslationHandler: Ee,
      getMissingHandler: pe,
      setMissingHandler: ce,
      [wm]: dn
    };
    return N.datetimeFormats = be, N.numberFormats = Ke, N.rt = Ie, N.te = Si, N.tm = y, N.d = ft, N.n = Hr, N.getDateTimeFormat = $, N.setDateTimeFormat = d, N.mergeDateTimeFormat = p, N.getNumberFormat = C, N.setNumberFormat = A, N.mergeNumberFormat = j, N[bm] = n, N[Ho] = Wn, N[Bo] = Br, N[Ko] = Hn, N
  }
  const Go = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: e => e === "parent" || e === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };

  function xm({
    slots: e
  }, t) {
    return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, s) => [...r, ...s.type === Me ? s.children : [s]], []) : t.reduce((n, r) => {
      const s = e[r];
      return s && (n[r] = s()), n
    }, at())
  }

  function $u() {
    return Me
  }
  const Uu = ie({
    name: "i18n-t",
    props: Wt({
      keypath: {
        type: String,
        required: !0
      },
      plural: {
        type: [Number, String],
        validator: e => hs(e) || !isNaN(e)
      }
    }, Go),
    setup(e, t) {
      const {
        slots: n,
        attrs: r
      } = t, s = e.i18n || xr({
        useScope: e.scope,
        __useComponent: !0
      });
      return () => {
        const i = Object.keys(n).filter(f => f !== "_"),
          o = at();
        e.locale && (o.locale = e.locale), e.plural !== void 0 && (o.plural = ke(e.plural) ? +e.plural : e.plural);
        const a = xm(t, i),
          l = s[Ho](e.keypath, a, o),
          c = Wt(at(), r),
          u = ke(e.tag) || lt(e.tag) ? e.tag : $u();
        return br(u, c, l)
      }
    }
  });

  function Em(e) {
    return nn(e) && !ke(e[0])
  }

  function ju(e, t, n, r) {
    const {
      slots: s,
      attrs: i
    } = t;
    return () => {
      const o = {
        part: !0
      };
      let a = at();
      e.locale && (o.locale = e.locale), ke(e.format) ? o.key = e.format : lt(e.format) && (ke(e.format.key) && (o.key = e.format.key), a = Object.keys(e.format).reduce((h, m) => n.includes(m) ? Wt(at(), h, {
        [m]: e.format[m]
      }) : h, at()));
      const l = r(e.value, o, a);
      let c = [o.key];
      nn(l) ? c = l.map((h, m) => {
        const O = s[h.type],
          b = O ? O({
            [h.type]: h.value,
            index: m,
            parts: l
          }) : [h.value];
        return Em(b) && (b[0].key = `${h.type}-${m}`), b
      }) : ke(l) && (c = [l]);
      const u = Wt(at(), i),
        f = ke(e.tag) || lt(e.tag) ? e.tag : $u();
      return br(f, u, c)
    }
  }
  const Vu = ie({
      name: "i18n-n",
      props: Wt({
        value: {
          type: Number,
          required: !0
        },
        format: {
          type: [String, Object]
        }
      }, Go),
      setup(e, t) {
        const n = e.i18n || xr({
          useScope: e.scope,
          __useComponent: !0
        });
        return ju(e, t, Eu, (...r) => n[Ko](...r))
      }
    }),
    Wu = ie({
      name: "i18n-d",
      props: Wt({
        value: {
          type: [Number, Date],
          required: !0
        },
        format: {
          type: [String, Object]
        }
      }, Go),
      setup(e, t) {
        const n = e.i18n || xr({
          useScope: e.scope,
          __useComponent: !0
        });
        return ju(e, t, yu, (...r) => n[Bo](...r))
      }
    });

  function Tm(e, t) {
    const n = e;
    if (e.mode === "composition") return n.__getInstance(t) || e.global;
    {
      const r = n.__getInstance(t);
      return r != null ? r.__composer : e.global.__composer
    }
  }

  function Cm(e) {
    const t = o => {
      const {
        instance: a,
        value: l
      } = o;
      if (!a || !a.$) throw It(_t.UNEXPECTED_ERROR);
      const c = Tm(e, a.$),
        u = Hu(l);
      return [Reflect.apply(c.t, c, [...Bu(u)]), c]
    };
    return {
      created: (o, a) => {
        const [l, c] = t(a);
        ci && e.global === c && (o.__i18nWatcher = Ce(c.locale, () => {
          a.instance && a.instance.$forceUpdate()
        })), o.__composer = c, o.textContent = l
      },
      unmounted: o => {
        ci && o.__i18nWatcher && (o.__i18nWatcher(), o.__i18nWatcher = void 0, delete o.__i18nWatcher), o.__composer && (o.__composer = void 0, delete o.__composer)
      },
      beforeUpdate: (o, {
        value: a
      }) => {
        if (o.__composer) {
          const l = o.__composer,
            c = Hu(a);
          o.textContent = Reflect.apply(l.t, l, [...Bu(c)])
        }
      },
      getSSRProps: o => {
        const [a] = t(o);
        return {
          textContent: a
        }
      }
    }
  }

  function Hu(e) {
    if (ke(e)) return {
      path: e
    };
    if (At(e)) {
      if (!("path" in e)) throw It(_t.REQUIRED_VALUE, "path");
      return e
    } else throw It(_t.INVALID_VALUE)
  }

  function Bu(e) {
    const {
      path: t,
      locale: n,
      args: r,
      choice: s,
      plural: i
    } = e, o = {}, a = r || {};
    return ke(n) && (o.locale = n), hs(s) && (o.plural = s), hs(i) && (o.plural = i), [t, a, o]
  }

  function Sm(e, t, ...n) {
    const r = At(n[0]) ? n[0] : {};
    (rn(r.globalInstall) ? r.globalInstall : !0) && ([Uu.name, "I18nT"].forEach(i => e.component(i, Uu)), [Vu.name, "I18nN"].forEach(i => e.component(i, Vu)), [Wu.name, "I18nD"].forEach(i => e.component(i, Wu))), e.directive("t", Cm(t))
  }
  const Om = Tn("global-vue-i18n");

  function Am(e = {}, t) {
    const n = rn(e.globalInjection) ? e.globalInjection : !0,
      r = new Map,
      [s, i] = Im(e),
      o = Tn("");

    function a(f) {
      return r.get(f) || null
    }

    function l(f, h) {
      r.set(f, h)
    }

    function c(f) {
      r.delete(f)
    }
    const u = {
      get mode() {
        return "composition"
      },
      async install(f, ...h) {
        if (f.__VUE_I18N_SYMBOL__ = o, f.provide(f.__VUE_I18N_SYMBOL__, u), At(h[0])) {
          const b = h[0];
          u.__composerExtend = b.__composerExtend, u.__vueI18nExtend = b.__vueI18nExtend
        }
        let m = null;
        n && (m = Fm(f, u.global)), Sm(f, u, ...h);
        const O = f.unmount;
        f.unmount = () => {
          m && m(), u.dispose(), O()
        }
      },
      get global() {
        return i
      },
      dispose() {
        s.stop()
      },
      __instances: r,
      __getInstance: a,
      __setInstance: l,
      __deleteInstance: c
    };
    return u
  }

  function xr(e = {}) {
    const t = xn();
    if (t == null) throw It(_t.MUST_BE_CALL_SETUP_TOP);
    if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw It(_t.NOT_INSTALLED);
    const n = Pm(t),
      r = km(n),
      s = Lu(t),
      i = Lm(e, s);
    if (i === "global") return vm(r, e, s), r;
    if (i === "parent") {
      let l = Rm(n, t, e.__useComponent);
      return l == null && (l = r), l
    }
    const o = n;
    let a = o.__getInstance(t);
    if (a == null) {
      const l = Wt({}, e);
      "__i18n" in s && (l.__i18n = s.__i18n), r && (l.__root = r), a = Fu(l), o.__composerExtend && (a[Qo] = o.__composerExtend(a)), Dm(o, t, a), o.__setInstance(t, a)
    }
    return a
  }

  function Im(e, t, n) {
    const r = ka(),
      s = r.run(() => Fu(e));
    if (s == null) throw It(_t.UNEXPECTED_ERROR);
    return [r, s]
  }

  function Pm(e) {
    const t = yn(e.isCE ? Om : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t) throw It(e.isCE ? _t.NOT_INSTALLED_WITH_PROVIDE : _t.UNEXPECTED_ERROR);
    return t
  }

  function Lm(e, t) {
    return Mh(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local"
  }

  function km(e) {
    return e.mode === "composition" ? e.global : e.global.__composer
  }

  function Rm(e, t, n = !1) {
    let r = null;
    const s = t.root;
    let i = Nm(t, n);
    for (; i != null;) {
      const o = e;
      if (e.mode === "composition" && (r = o.__getInstance(i)), r != null || s === i) break;
      i = i.parent
    }
    return r
  }

  function Nm(e, t = !1) {
    return e == null ? null : t && e.vnode.ctx || e.parent
  }

  function Dm(e, t, n) {
    bn(() => {}, t), vn(() => {
      const r = n;
      e.__deleteInstance(t);
      const s = r[Qo];
      s && (s(), delete r[Qo])
    }, t)
  }
  const Mm = ["locale", "fallbackLocale", "availableLocales"],
    Ku = ["t", "rt", "d", "n", "tm", "te"];

  function Fm(e, t) {
    const n = Object.create(null);
    return Mm.forEach(s => {
      const i = Object.getOwnPropertyDescriptor(t, s);
      if (!i) throw It(_t.UNEXPECTED_ERROR);
      const o = Oe(i.value) ? {
        get() {
          return i.value.value
        },
        set(a) {
          i.value.value = a
        }
      } : {
        get() {
          return i.get && i.get()
        }
      };
      Object.defineProperty(n, s, o)
    }), e.config.globalProperties.$i18n = n, Ku.forEach(s => {
      const i = Object.getOwnPropertyDescriptor(t, s);
      if (!i || !i.value) throw It(_t.UNEXPECTED_ERROR);
      Object.defineProperty(e.config.globalProperties, `$${s}`, i)
    }), () => {
      delete e.config.globalProperties.$i18n, Ku.forEach(s => {
        delete e.config.globalProperties[`$${s}`]
      })
    }
  }
  if (mm(), qg(Ig), Yg(Kg), zg(au), __INTLIFY_PROD_DEVTOOLS__) {
    const e = Vc();
    e.__INTLIFY__ = !0, Pg(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
  }
  const $m = {
      errorMessages: {
        101: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Paste a valid code"
          }
        },
        100: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "You are taking part in another challenge"
          }
        },
        loading: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Failed loading data"
          }
        },
        default: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Something went wrong. Please try again later"
          }
        }
      },
      limitPopup: {
        title: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Spins limit reached"
          }
        },
        message: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Further spins won't count in the challenge"
          }
        },
        button: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Got it"
          }
        }
      },
      joinPopup: {
        title: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Got an invite code? Enter it here to join the challenge!"
          }
        },
        button: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Join Challenge"
          }
        }
      },
      finishPopup: {
        button: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Finish Challenge"
          }
        },
        calculatingResult_open: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Calculating the challenge's result"
          }
        },
        calculatingResult_close: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Calculating result"
          }
        }
      },
      rules: {
        title: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Challenge rules"
          }
        },
        button_view: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "View rules"
          }
        },
        button_hide: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Hide rules"
          }
        }
      },
      popupTable: {
        title_leaderboard: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Leaderboard"
          }
        },
        title_player: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "My result"
          }
        },
        column_rank: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "#"
          }
        },
        column_id: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Player id"
          }
        },
        column_result: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Multiplier"
          }
        },
        column_result_bets: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Bets sum"
          }
        },
        column_result_mult: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Multiplier sum"
          }
        },
        loadingText: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Loading data"
          }
        },
        button: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "View full leaderboard"
          }
        }
      },
      timer: {
        finish_open: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "The challenge finished"
          }
        },
        finish_close: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Finished"
          }
        },
        start: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Starts in"
          }
        },
        end: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Ends in"
          }
        },
        checking_status: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Checking status"
          }
        }
      },
      toast: {
        buyBonus: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "The features you have purchased will not be accounted for in the challenge results"
          }
        },
        copyPlayerCode: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Code is copied"
          }
        }
      },
      limits: {
        spins_one: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "spin"
          }
        },
        spins_other: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "spins"
          }
        },
        spinsLeft: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Spins left"
          }
        },
        spinsLimitReachedMessage: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Limit reached: further spins won't count"
          }
        }
      },
      playerCode: {
        title: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Note"
          }
        },
        message: {
          t: 0,
          b: {
            t: 2,
            i: [{
              t: 3
            }],
            s: "Each participant is assigned a unique player ID. It may be useful if any questions arise during the challenge or for verifying your identity as a player."
          }
        }
      }
    },
    qo = Am({
      locale: "en",
      fallbackLocale: "en",
      messages: {}
    }),
    Um = async (e, t) => {
      try {
        return await (await fetch(`${t}l10n/${e}/common.json`)).json()
      } catch {
        return $m
      }
    }, jm = async (e, t) => {
      const n = await Um(e, t);
      qo.global.setLocaleMessage(e, n), qo.global.locale.value = e
    };

  function Qu(e) {
    var t, n, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
      if (Array.isArray(e)) {
        var s = e.length;
        for (t = 0; t < s; t++) e[t] && (n = Qu(e[t])) && (r && (r += " "), r += n)
      } else
        for (n in e) e[n] && (r && (r += " "), r += n);
    return r
  }

  function Gu() {
    for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++)(e = arguments[n]) && (t = Qu(e)) && (r && (r += " "), r += t);
    return r
  }
  const Yo = "-",
    Vm = e => {
      const t = Hm(e),
        {
          conflictingClassGroups: n,
          conflictingClassGroupModifiers: r
        } = e;
      return {
        getClassGroupId: o => {
          const a = o.split(Yo);
          return a[0] === "" && a.length !== 1 && a.shift(), qu(a, t) || Wm(o)
        },
        getConflictingClassGroupIds: (o, a) => {
          const l = n[o] || [];
          return a && r[o] ? [...l, ...r[o]] : l
        }
      }
    },
    qu = (e, t) => {
      var o;
      if (e.length === 0) return t.classGroupId;
      const n = e[0],
        r = t.nextPart.get(n),
        s = r ? qu(e.slice(1), r) : void 0;
      if (s) return s;
      if (t.validators.length === 0) return;
      const i = e.join(Yo);
      return (o = t.validators.find(({
        validator: a
      }) => a(i))) == null ? void 0 : o.classGroupId
    },
    Yu = /^\[(.+)\]$/,
    Wm = e => {
      if (Yu.test(e)) {
        const t = Yu.exec(e)[1],
          n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
        if (n) return "arbitrary.." + n
      }
    },
    Hm = e => {
      const {
        theme: t,
        prefix: n
      } = e, r = {
        nextPart: new Map,
        validators: []
      };
      return Km(Object.entries(e.classGroups), n).forEach(([i, o]) => {
        zo(o, r, i, t)
      }), r
    },
    zo = (e, t, n, r) => {
      e.forEach(s => {
        if (typeof s == "string") {
          const i = s === "" ? t : zu(t, s);
          i.classGroupId = n;
          return
        }
        if (typeof s == "function") {
          if (Bm(s)) {
            zo(s(r), t, n, r);
            return
          }
          t.validators.push({
            validator: s,
            classGroupId: n
          });
          return
        }
        Object.entries(s).forEach(([i, o]) => {
          zo(o, zu(t, i), n, r)
        })
      })
    },
    zu = (e, t) => {
      let n = e;
      return t.split(Yo).forEach(r => {
        n.nextPart.has(r) || n.nextPart.set(r, {
          nextPart: new Map,
          validators: []
        }), n = n.nextPart.get(r)
      }), n
    },
    Bm = e => e.isThemeGetter,
    Km = (e, t) => t ? e.map(([n, r]) => {
      const s = r.map(i => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([o, a]) => [t + o, a])) : i);
      return [n, s]
    }) : e,
    Qm = e => {
      if (e < 1) return {
        get: () => {},
        set: () => {}
      };
      let t = 0,
        n = new Map,
        r = new Map;
      const s = (i, o) => {
        n.set(i, o), t++, t > e && (t = 0, r = n, n = new Map)
      };
      return {
        get(i) {
          let o = n.get(i);
          if (o !== void 0) return o;
          if ((o = r.get(i)) !== void 0) return s(i, o), o
        },
        set(i, o) {
          n.has(i) ? n.set(i, o) : s(i, o)
        }
      }
    },
    Xu = "!",
    Gm = e => {
      const {
        separator: t,
        experimentalParseClassName: n
      } = e, r = t.length === 1, s = t[0], i = t.length, o = a => {
        const l = [];
        let c = 0,
          u = 0,
          f;
        for (let E = 0; E < a.length; E++) {
          let g = a[E];
          if (c === 0) {
            if (g === s && (r || a.slice(E, E + i) === t)) {
              l.push(a.slice(u, E)), u = E + i;
              continue
            }
            if (g === "/") {
              f = E;
              continue
            }
          }
          g === "[" ? c++ : g === "]" && c--
        }
        const h = l.length === 0 ? a : a.substring(u),
          m = h.startsWith(Xu),
          O = m ? h.substring(1) : h,
          b = f && f > u ? f - u : void 0;
        return {
          modifiers: l,
          hasImportantModifier: m,
          baseClassName: O,
          maybePostfixModifierPosition: b
        }
      };
      return n ? a => n({
        className: a,
        parseClassName: o
      }) : o
    },
    qm = e => {
      if (e.length <= 1) return e;
      const t = [];
      let n = [];
      return e.forEach(r => {
        r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r)
      }), t.push(...n.sort()), t
    },
    Ym = e => ({
      cache: Qm(e.cacheSize),
      parseClassName: Gm(e),
      ...Vm(e)
    }),
    zm = /\s+/,
    Xm = (e, t) => {
      const {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: s
      } = t, i = [], o = e.trim().split(zm);
      let a = "";
      for (let l = o.length - 1; l >= 0; l -= 1) {
        const c = o[l],
          {
            modifiers: u,
            hasImportantModifier: f,
            baseClassName: h,
            maybePostfixModifierPosition: m
          } = n(c);
        let O = !!m,
          b = r(O ? h.substring(0, m) : h);
        if (!b) {
          if (!O) {
            a = c + (a.length > 0 ? " " + a : a);
            continue
          }
          if (b = r(h), !b) {
            a = c + (a.length > 0 ? " " + a : a);
            continue
          }
          O = !1
        }
        const E = qm(u).join(":"),
          g = f ? E + Xu : E,
          x = g + b;
        if (i.includes(x)) continue;
        i.push(x);
        const S = s(b, O);
        for (let v = 0; v < S.length; ++v) {
          const I = S[v];
          i.push(g + I)
        }
        a = c + (a.length > 0 ? " " + a : a)
      }
      return a
    };

  function Jm() {
    let e = 0,
      t, n, r = "";
    for (; e < arguments.length;)(t = arguments[e++]) && (n = Ju(t)) && (r && (r += " "), r += n);
    return r
  }
  const Ju = e => {
    if (typeof e == "string") return e;
    let t, n = "";
    for (let r = 0; r < e.length; r++) e[r] && (t = Ju(e[r])) && (n && (n += " "), n += t);
    return n
  };

  function Zm(e, ...t) {
    let n, r, s, i = o;

    function o(l) {
      const c = t.reduce((u, f) => f(u), e());
      return n = Ym(c), r = n.cache.get, s = n.cache.set, i = a, a(l)
    }

    function a(l) {
      const c = r(l);
      if (c) return c;
      const u = Xm(l, n);
      return s(l, u), u
    }
    return function() {
      return i(Jm.apply(null, arguments))
    }
  }
  const ye = e => {
      const t = n => n[e] || [];
      return t.isThemeGetter = !0, t
    },
    Zu = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    ew = /^\d+\/\d+$/,
    tw = new Set(["px", "full", "screen"]),
    nw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    rw = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    sw = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    iw = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    ow = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    ln = e => Er(e) || tw.has(e) || ew.test(e),
    In = e => Tr(e, "length", hw),
    Er = e => !!e && !Number.isNaN(Number(e)),
    Xo = e => Tr(e, "number", Er),
    vs = e => !!e && Number.isInteger(Number(e)),
    aw = e => e.endsWith("%") && Er(e.slice(0, -1)),
    Z = e => Zu.test(e),
    Pn = e => nw.test(e),
    lw = new Set(["length", "size", "percentage"]),
    cw = e => Tr(e, lw, ef),
    uw = e => Tr(e, "position", ef),
    fw = new Set(["image", "url"]),
    dw = e => Tr(e, fw, mw),
    pw = e => Tr(e, "", gw),
    ys = () => !0,
    Tr = (e, t, n) => {
      const r = Zu.exec(e);
      return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1
    },
    hw = e => rw.test(e) && !sw.test(e),
    ef = () => !1,
    gw = e => iw.test(e),
    mw = e => ow.test(e),
    ww = Zm(() => {
      const e = ye("colors"),
        t = ye("spacing"),
        n = ye("blur"),
        r = ye("brightness"),
        s = ye("borderColor"),
        i = ye("borderRadius"),
        o = ye("borderSpacing"),
        a = ye("borderWidth"),
        l = ye("contrast"),
        c = ye("grayscale"),
        u = ye("hueRotate"),
        f = ye("invert"),
        h = ye("gap"),
        m = ye("gradientColorStops"),
        O = ye("gradientColorStopPositions"),
        b = ye("inset"),
        E = ye("margin"),
        g = ye("opacity"),
        x = ye("padding"),
        S = ye("saturate"),
        v = ye("scale"),
        I = ye("sepia"),
        R = ye("skew"),
        k = ye("space"),
        V = ye("translate"),
        U = () => ["auto", "contain", "none"],
        K = () => ["auto", "hidden", "clip", "visible", "scroll"],
        ne = () => ["auto", Z, t],
        H = () => [Z, t],
        be = () => ["", ln, In],
        Ke = () => ["auto", Er, Z],
        gt = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
        Ee = () => ["solid", "dashed", "dotted", "double", "none"],
        pe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
        ce = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
        Se = () => ["", "0", Z],
        Et = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
        Ie = () => [Er, Z];
      return {
        cacheSize: 500,
        separator: ":",
        theme: {
          colors: [ys],
          spacing: [ln, In],
          blur: ["none", "", Pn, Z],
          brightness: Ie(),
          borderColor: [e],
          borderRadius: ["none", "", "full", Pn, Z],
          borderSpacing: H(),
          borderWidth: be(),
          contrast: Ie(),
          grayscale: Se(),
          hueRotate: Ie(),
          invert: Se(),
          gap: H(),
          gradientColorStops: [e],
          gradientColorStopPositions: [aw, In],
          inset: ne(),
          margin: ne(),
          opacity: Ie(),
          padding: H(),
          saturate: Ie(),
          scale: Ie(),
          sepia: Se(),
          skew: Ie(),
          space: H(),
          translate: H()
        },
        classGroups: {
          aspect: [{
            aspect: ["auto", "square", "video", Z]
          }],
          container: ["container"],
          columns: [{
            columns: [Pn]
          }],
          "break-after": [{
            "break-after": Et()
          }],
          "break-before": [{
            "break-before": Et()
          }],
          "break-inside": [{
            "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
          }],
          "box-decoration": [{
            "box-decoration": ["slice", "clone"]
          }],
          box: [{
            box: ["border", "content"]
          }],
          display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
          float: [{
            float: ["right", "left", "none", "start", "end"]
          }],
          clear: [{
            clear: ["left", "right", "both", "none", "start", "end"]
          }],
          isolation: ["isolate", "isolation-auto"],
          "object-fit": [{
            object: ["contain", "cover", "fill", "none", "scale-down"]
          }],
          "object-position": [{
            object: [...gt(), Z]
          }],
          overflow: [{
            overflow: K()
          }],
          "overflow-x": [{
            "overflow-x": K()
          }],
          "overflow-y": [{
            "overflow-y": K()
          }],
          overscroll: [{
            overscroll: U()
          }],
          "overscroll-x": [{
            "overscroll-x": U()
          }],
          "overscroll-y": [{
            "overscroll-y": U()
          }],
          position: ["static", "fixed", "absolute", "relative", "sticky"],
          inset: [{
            inset: [b]
          }],
          "inset-x": [{
            "inset-x": [b]
          }],
          "inset-y": [{
            "inset-y": [b]
          }],
          start: [{
            start: [b]
          }],
          end: [{
            end: [b]
          }],
          top: [{
            top: [b]
          }],
          right: [{
            right: [b]
          }],
          bottom: [{
            bottom: [b]
          }],
          left: [{
            left: [b]
          }],
          visibility: ["visible", "invisible", "collapse"],
          z: [{
            z: ["auto", vs, Z]
          }],
          basis: [{
            basis: ne()
          }],
          "flex-direction": [{
            flex: ["row", "row-reverse", "col", "col-reverse"]
          }],
          "flex-wrap": [{
            flex: ["wrap", "wrap-reverse", "nowrap"]
          }],
          flex: [{
            flex: ["1", "auto", "initial", "none", Z]
          }],
          grow: [{
            grow: Se()
          }],
          shrink: [{
            shrink: Se()
          }],
          order: [{
            order: ["first", "last", "none", vs, Z]
          }],
          "grid-cols": [{
            "grid-cols": [ys]
          }],
          "col-start-end": [{
            col: ["auto", {
              span: ["full", vs, Z]
            }, Z]
          }],
          "col-start": [{
            "col-start": Ke()
          }],
          "col-end": [{
            "col-end": Ke()
          }],
          "grid-rows": [{
            "grid-rows": [ys]
          }],
          "row-start-end": [{
            row: ["auto", {
              span: [vs, Z]
            }, Z]
          }],
          "row-start": [{
            "row-start": Ke()
          }],
          "row-end": [{
            "row-end": Ke()
          }],
          "grid-flow": [{
            "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
          }],
          "auto-cols": [{
            "auto-cols": ["auto", "min", "max", "fr", Z]
          }],
          "auto-rows": [{
            "auto-rows": ["auto", "min", "max", "fr", Z]
          }],
          gap: [{
            gap: [h]
          }],
          "gap-x": [{
            "gap-x": [h]
          }],
          "gap-y": [{
            "gap-y": [h]
          }],
          "justify-content": [{
            justify: ["normal", ...ce()]
          }],
          "justify-items": [{
            "justify-items": ["start", "end", "center", "stretch"]
          }],
          "justify-self": [{
            "justify-self": ["auto", "start", "end", "center", "stretch"]
          }],
          "align-content": [{
            content: ["normal", ...ce(), "baseline"]
          }],
          "align-items": [{
            items: ["start", "end", "center", "baseline", "stretch"]
          }],
          "align-self": [{
            self: ["auto", "start", "end", "center", "stretch", "baseline"]
          }],
          "place-content": [{
            "place-content": [...ce(), "baseline"]
          }],
          "place-items": [{
            "place-items": ["start", "end", "center", "baseline", "stretch"]
          }],
          "place-self": [{
            "place-self": ["auto", "start", "end", "center", "stretch"]
          }],
          p: [{
            p: [x]
          }],
          px: [{
            px: [x]
          }],
          py: [{
            py: [x]
          }],
          ps: [{
            ps: [x]
          }],
          pe: [{
            pe: [x]
          }],
          pt: [{
            pt: [x]
          }],
          pr: [{
            pr: [x]
          }],
          pb: [{
            pb: [x]
          }],
          pl: [{
            pl: [x]
          }],
          m: [{
            m: [E]
          }],
          mx: [{
            mx: [E]
          }],
          my: [{
            my: [E]
          }],
          ms: [{
            ms: [E]
          }],
          me: [{
            me: [E]
          }],
          mt: [{
            mt: [E]
          }],
          mr: [{
            mr: [E]
          }],
          mb: [{
            mb: [E]
          }],
          ml: [{
            ml: [E]
          }],
          "space-x": [{
            "space-x": [k]
          }],
          "space-x-reverse": ["space-x-reverse"],
          "space-y": [{
            "space-y": [k]
          }],
          "space-y-reverse": ["space-y-reverse"],
          w: [{
            w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Z, t]
          }],
          "min-w": [{
            "min-w": [Z, t, "min", "max", "fit"]
          }],
          "max-w": [{
            "max-w": [Z, t, "none", "full", "min", "max", "fit", "prose", {
              screen: [Pn]
            }, Pn]
          }],
          h: [{
            h: [Z, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          "min-h": [{
            "min-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          "max-h": [{
            "max-h": [Z, t, "min", "max", "fit", "svh", "lvh", "dvh"]
          }],
          size: [{
            size: [Z, t, "auto", "min", "max", "fit"]
          }],
          "font-size": [{
            text: ["base", Pn, In]
          }],
          "font-smoothing": ["antialiased", "subpixel-antialiased"],
          "font-style": ["italic", "not-italic"],
          "font-weight": [{
            font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Xo]
          }],
          "font-family": [{
            font: [ys]
          }],
          "fvn-normal": ["normal-nums"],
          "fvn-ordinal": ["ordinal"],
          "fvn-slashed-zero": ["slashed-zero"],
          "fvn-figure": ["lining-nums", "oldstyle-nums"],
          "fvn-spacing": ["proportional-nums", "tabular-nums"],
          "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
          tracking: [{
            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Z]
          }],
          "line-clamp": [{
            "line-clamp": ["none", Er, Xo]
          }],
          leading: [{
            leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ln, Z]
          }],
          "list-image": [{
            "list-image": ["none", Z]
          }],
          "list-style-type": [{
            list: ["none", "disc", "decimal", Z]
          }],
          "list-style-position": [{
            list: ["inside", "outside"]
          }],
          "placeholder-color": [{
            placeholder: [e]
          }],
          "placeholder-opacity": [{
            "placeholder-opacity": [g]
          }],
          "text-alignment": [{
            text: ["left", "center", "right", "justify", "start", "end"]
          }],
          "text-color": [{
            text: [e]
          }],
          "text-opacity": [{
            "text-opacity": [g]
          }],
          "text-decoration": ["underline", "overline", "line-through", "no-underline"],
          "text-decoration-style": [{
            decoration: [...Ee(), "wavy"]
          }],
          "text-decoration-thickness": [{
            decoration: ["auto", "from-font", ln, In]
          }],
          "underline-offset": [{
            "underline-offset": ["auto", ln, Z]
          }],
          "text-decoration-color": [{
            decoration: [e]
          }],
          "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
          "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
          "text-wrap": [{
            text: ["wrap", "nowrap", "balance", "pretty"]
          }],
          indent: [{
            indent: H()
          }],
          "vertical-align": [{
            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Z]
          }],
          whitespace: [{
            whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
          }],
          break: [{
            break: ["normal", "words", "all", "keep"]
          }],
          hyphens: [{
            hyphens: ["none", "manual", "auto"]
          }],
          content: [{
            content: ["none", Z]
          }],
          "bg-attachment": [{
            bg: ["fixed", "local", "scroll"]
          }],
          "bg-clip": [{
            "bg-clip": ["border", "padding", "content", "text"]
          }],
          "bg-opacity": [{
            "bg-opacity": [g]
          }],
          "bg-origin": [{
            "bg-origin": ["border", "padding", "content"]
          }],
          "bg-position": [{
            bg: [...gt(), uw]
          }],
          "bg-repeat": [{
            bg: ["no-repeat", {
              repeat: ["", "x", "y", "round", "space"]
            }]
          }],
          "bg-size": [{
            bg: ["auto", "cover", "contain", cw]
          }],
          "bg-image": [{
            bg: ["none", {
              "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, dw]
          }],
          "bg-color": [{
            bg: [e]
          }],
          "gradient-from-pos": [{
            from: [O]
          }],
          "gradient-via-pos": [{
            via: [O]
          }],
          "gradient-to-pos": [{
            to: [O]
          }],
          "gradient-from": [{
            from: [m]
          }],
          "gradient-via": [{
            via: [m]
          }],
          "gradient-to": [{
            to: [m]
          }],
          rounded: [{
            rounded: [i]
          }],
          "rounded-s": [{
            "rounded-s": [i]
          }],
          "rounded-e": [{
            "rounded-e": [i]
          }],
          "rounded-t": [{
            "rounded-t": [i]
          }],
          "rounded-r": [{
            "rounded-r": [i]
          }],
          "rounded-b": [{
            "rounded-b": [i]
          }],
          "rounded-l": [{
            "rounded-l": [i]
          }],
          "rounded-ss": [{
            "rounded-ss": [i]
          }],
          "rounded-se": [{
            "rounded-se": [i]
          }],
          "rounded-ee": [{
            "rounded-ee": [i]
          }],
          "rounded-es": [{
            "rounded-es": [i]
          }],
          "rounded-tl": [{
            "rounded-tl": [i]
          }],
          "rounded-tr": [{
            "rounded-tr": [i]
          }],
          "rounded-br": [{
            "rounded-br": [i]
          }],
          "rounded-bl": [{
            "rounded-bl": [i]
          }],
          "border-w": [{
            border: [a]
          }],
          "border-w-x": [{
            "border-x": [a]
          }],
          "border-w-y": [{
            "border-y": [a]
          }],
          "border-w-s": [{
            "border-s": [a]
          }],
          "border-w-e": [{
            "border-e": [a]
          }],
          "border-w-t": [{
            "border-t": [a]
          }],
          "border-w-r": [{
            "border-r": [a]
          }],
          "border-w-b": [{
            "border-b": [a]
          }],
          "border-w-l": [{
            "border-l": [a]
          }],
          "border-opacity": [{
            "border-opacity": [g]
          }],
          "border-style": [{
            border: [...Ee(), "hidden"]
          }],
          "divide-x": [{
            "divide-x": [a]
          }],
          "divide-x-reverse": ["divide-x-reverse"],
          "divide-y": [{
            "divide-y": [a]
          }],
          "divide-y-reverse": ["divide-y-reverse"],
          "divide-opacity": [{
            "divide-opacity": [g]
          }],
          "divide-style": [{
            divide: Ee()
          }],
          "border-color": [{
            border: [s]
          }],
          "border-color-x": [{
            "border-x": [s]
          }],
          "border-color-y": [{
            "border-y": [s]
          }],
          "border-color-s": [{
            "border-s": [s]
          }],
          "border-color-e": [{
            "border-e": [s]
          }],
          "border-color-t": [{
            "border-t": [s]
          }],
          "border-color-r": [{
            "border-r": [s]
          }],
          "border-color-b": [{
            "border-b": [s]
          }],
          "border-color-l": [{
            "border-l": [s]
          }],
          "divide-color": [{
            divide: [s]
          }],
          "outline-style": [{
            outline: ["", ...Ee()]
          }],
          "outline-offset": [{
            "outline-offset": [ln, Z]
          }],
          "outline-w": [{
            outline: [ln, In]
          }],
          "outline-color": [{
            outline: [e]
          }],
          "ring-w": [{
            ring: be()
          }],
          "ring-w-inset": ["ring-inset"],
          "ring-color": [{
            ring: [e]
          }],
          "ring-opacity": [{
            "ring-opacity": [g]
          }],
          "ring-offset-w": [{
            "ring-offset": [ln, In]
          }],
          "ring-offset-color": [{
            "ring-offset": [e]
          }],
          shadow: [{
            shadow: ["", "inner", "none", Pn, pw]
          }],
          "shadow-color": [{
            shadow: [ys]
          }],
          opacity: [{
            opacity: [g]
          }],
          "mix-blend": [{
            "mix-blend": [...pe(), "plus-lighter", "plus-darker"]
          }],
          "bg-blend": [{
            "bg-blend": pe()
          }],
          filter: [{
            filter: ["", "none"]
          }],
          blur: [{
            blur: [n]
          }],
          brightness: [{
            brightness: [r]
          }],
          contrast: [{
            contrast: [l]
          }],
          "drop-shadow": [{
            "drop-shadow": ["", "none", Pn, Z]
          }],
          grayscale: [{
            grayscale: [c]
          }],
          "hue-rotate": [{
            "hue-rotate": [u]
          }],
          invert: [{
            invert: [f]
          }],
          saturate: [{
            saturate: [S]
          }],
          sepia: [{
            sepia: [I]
          }],
          "backdrop-filter": [{
            "backdrop-filter": ["", "none"]
          }],
          "backdrop-blur": [{
            "backdrop-blur": [n]
          }],
          "backdrop-brightness": [{
            "backdrop-brightness": [r]
          }],
          "backdrop-contrast": [{
            "backdrop-contrast": [l]
          }],
          "backdrop-grayscale": [{
            "backdrop-grayscale": [c]
          }],
          "backdrop-hue-rotate": [{
            "backdrop-hue-rotate": [u]
          }],
          "backdrop-invert": [{
            "backdrop-invert": [f]
          }],
          "backdrop-opacity": [{
            "backdrop-opacity": [g]
          }],
          "backdrop-saturate": [{
            "backdrop-saturate": [S]
          }],
          "backdrop-sepia": [{
            "backdrop-sepia": [I]
          }],
          "border-collapse": [{
            border: ["collapse", "separate"]
          }],
          "border-spacing": [{
            "border-spacing": [o]
          }],
          "border-spacing-x": [{
            "border-spacing-x": [o]
          }],
          "border-spacing-y": [{
            "border-spacing-y": [o]
          }],
          "table-layout": [{
            table: ["auto", "fixed"]
          }],
          caption: [{
            caption: ["top", "bottom"]
          }],
          transition: [{
            transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Z]
          }],
          duration: [{
            duration: Ie()
          }],
          ease: [{
            ease: ["linear", "in", "out", "in-out", Z]
          }],
          delay: [{
            delay: Ie()
          }],
          animate: [{
            animate: ["none", "spin", "ping", "pulse", "bounce", Z]
          }],
          transform: [{
            transform: ["", "gpu", "none"]
          }],
          scale: [{
            scale: [v]
          }],
          "scale-x": [{
            "scale-x": [v]
          }],
          "scale-y": [{
            "scale-y": [v]
          }],
          rotate: [{
            rotate: [vs, Z]
          }],
          "translate-x": [{
            "translate-x": [V]
          }],
          "translate-y": [{
            "translate-y": [V]
          }],
          "skew-x": [{
            "skew-x": [R]
          }],
          "skew-y": [{
            "skew-y": [R]
          }],
          "transform-origin": [{
            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Z]
          }],
          accent: [{
            accent: ["auto", e]
          }],
          appearance: [{
            appearance: ["none", "auto"]
          }],
          cursor: [{
            cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Z]
          }],
          "caret-color": [{
            caret: [e]
          }],
          "pointer-events": [{
            "pointer-events": ["none", "auto"]
          }],
          resize: [{
            resize: ["none", "y", "x", ""]
          }],
          "scroll-behavior": [{
            scroll: ["auto", "smooth"]
          }],
          "scroll-m": [{
            "scroll-m": H()
          }],
          "scroll-mx": [{
            "scroll-mx": H()
          }],
          "scroll-my": [{
            "scroll-my": H()
          }],
          "scroll-ms": [{
            "scroll-ms": H()
          }],
          "scroll-me": [{
            "scroll-me": H()
          }],
          "scroll-mt": [{
            "scroll-mt": H()
          }],
          "scroll-mr": [{
            "scroll-mr": H()
          }],
          "scroll-mb": [{
            "scroll-mb": H()
          }],
          "scroll-ml": [{
            "scroll-ml": H()
          }],
          "scroll-p": [{
            "scroll-p": H()
          }],
          "scroll-px": [{
            "scroll-px": H()
          }],
          "scroll-py": [{
            "scroll-py": H()
          }],
          "scroll-ps": [{
            "scroll-ps": H()
          }],
          "scroll-pe": [{
            "scroll-pe": H()
          }],
          "scroll-pt": [{
            "scroll-pt": H()
          }],
          "scroll-pr": [{
            "scroll-pr": H()
          }],
          "scroll-pb": [{
            "scroll-pb": H()
          }],
          "scroll-pl": [{
            "scroll-pl": H()
          }],
          "snap-align": [{
            snap: ["start", "end", "center", "align-none"]
          }],
          "snap-stop": [{
            snap: ["normal", "always"]
          }],
          "snap-type": [{
            snap: ["none", "x", "y", "both"]
          }],
          "snap-strictness": [{
            snap: ["mandatory", "proximity"]
          }],
          touch: [{
            touch: ["auto", "none", "manipulation"]
          }],
          "touch-x": [{
            "touch-pan": ["x", "left", "right"]
          }],
          "touch-y": [{
            "touch-pan": ["y", "up", "down"]
          }],
          "touch-pz": ["touch-pinch-zoom"],
          select: [{
            select: ["none", "text", "all", "auto"]
          }],
          "will-change": [{
            "will-change": ["auto", "scroll", "contents", "transform", Z]
          }],
          fill: [{
            fill: [e, "none"]
          }],
          "stroke-w": [{
            stroke: [ln, In, Xo]
          }],
          stroke: [{
            stroke: [e, "none"]
          }],
          sr: ["sr-only", "not-sr-only"],
          "forced-color-adjust": [{
            "forced-color-adjust": ["auto", "none"]
          }]
        },
        conflictingClassGroups: {
          overflow: ["overflow-x", "overflow-y"],
          overscroll: ["overscroll-x", "overscroll-y"],
          inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
          "inset-x": ["right", "left"],
          "inset-y": ["top", "bottom"],
          flex: ["basis", "grow", "shrink"],
          gap: ["gap-x", "gap-y"],
          p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
          px: ["pr", "pl"],
          py: ["pt", "pb"],
          m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
          mx: ["mr", "ml"],
          my: ["mt", "mb"],
          size: ["w", "h"],
          "font-size": ["leading"],
          "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
          "fvn-ordinal": ["fvn-normal"],
          "fvn-slashed-zero": ["fvn-normal"],
          "fvn-figure": ["fvn-normal"],
          "fvn-spacing": ["fvn-normal"],
          "fvn-fraction": ["fvn-normal"],
          "line-clamp": ["display", "overflow"],
          rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
          "rounded-s": ["rounded-ss", "rounded-es"],
          "rounded-e": ["rounded-se", "rounded-ee"],
          "rounded-t": ["rounded-tl", "rounded-tr"],
          "rounded-r": ["rounded-tr", "rounded-br"],
          "rounded-b": ["rounded-br", "rounded-bl"],
          "rounded-l": ["rounded-tl", "rounded-bl"],
          "border-spacing": ["border-spacing-x", "border-spacing-y"],
          "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
          "border-w-x": ["border-w-r", "border-w-l"],
          "border-w-y": ["border-w-t", "border-w-b"],
          "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
          "border-color-x": ["border-color-r", "border-color-l"],
          "border-color-y": ["border-color-t", "border-color-b"],
          "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
          "scroll-mx": ["scroll-mr", "scroll-ml"],
          "scroll-my": ["scroll-mt", "scroll-mb"],
          "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
          "scroll-px": ["scroll-pr", "scroll-pl"],
          "scroll-py": ["scroll-pt", "scroll-pb"],
          touch: ["touch-x", "touch-y", "touch-pz"],
          "touch-x": ["touch"],
          "touch-y": ["touch"],
          "touch-pz": ["touch"]
        },
        conflictingClassGroupModifiers: {
          "font-size": ["leading"]
        }
      }
    }),
    _s = (...e) => ww(Gu(e));
  var tf = (e => (e.Allowed = "allowed", e.DeniedBuy = "denied_buy", e.OnlyFeature = "only_feature", e))(tf || {}),
    Re = (e => (e.Ongoing = "ongoing", e.Planned = "planned", e.Sync = "result_calculating", e.Finished = "finished", e.Cancelled = "cancelled", e))(Re || {});
  const Cr = Zt({
      locale: "",
      identifier: ""
    }),
    Ln = Zt({
      lobby_enabled: !1,
      lobby_fe_script_url: "",
      drops_enabled: !1,
      drops_token: "",
      drops_api_url: "",
      drops_fe_script_url: "",
      profile_enabled: !1,
      profile_api_url: "",
      profile_token: "",
      gamelist_enabled: !1,
      gamelist_api_url: "",
      gamelist_token: "",
      challenges_enabled: !1,
      challenges_api_url: "",
      challenges_token: "",
      challenges_fe_script_url: ""
    }),
    $e = Zt({
      isLoaded: !1,
      isEnabled: !0,
      isOverlapped: !1,
      isMobile: !1,
      isPortrait: !1,
      isLeftHandedUI: !1
    }),
    Jo = re(!1),
    Zo = re(!1),
    Pt = Zt({}),
    ea = re(null),
    bw = e => {
      $e.isLoaded = e
    },
    vw = () => {
      $e.isEnabled && ($e.isEnabled = !1)
    },
    yw = () => {
      $e.isEnabled || ($e.isEnabled = !0)
    },
    nf = e => {
      $e.isOverlapped !== e && ($e.isOverlapped = e);
      const t = document.getElementById("plate-widget");
      t && (t.style.zIndex = e ? "-1" : "2")
    },
    _w = e => {
      $e.isMobile = e
    },
    xw = e => {
      $e.isPortrait = e
    },
    rf = e => {
      $e.isLeftHandedUI = e
    },
    Ew = e => {
      Object.assign(Cr, e)
    },
    Tw = e => {
      Object.assign(Ln, e)
    },
    sf = e => {
      Jo.value = e
    },
    Cw = e => {
      Zo.value = e
    },
    Sw = e => {
      Object.assign(Pt, e)
    },
    ta = (e, t) => {
      Pt[e] = t
    },
    na = e => {
      ea.value = e
    },
    Sr = {
      START_LOADING: "start_loading",
      BUTTON_CLICK: "button-click",
      FINISH_ROUND_ANIMATIONS: "finish_round_animations",
      INITIAL_SETTINGS: "initial-settings",
      SETTINGS_CHANGE: "settings-change",
      GAME_UI_OVERLAP: "game_ui_overlap"
    },
    Or = {
      OPEN_LOBBY: "open_lobby",
      JOIN_CHALLENGE: "join_challenge",
      INIT_EXT_WIDGETS: "init_ext_widgets",
      DISABLE_EXT_WIDGETS: "disable_ext_widgets",
      ENABLE_EXT_WIDGETS: "enable_ext_widgets",
      GAME_UI_OVERLAP: "game_ui_overlap"
    },
    tr = window.__OPTIONS__,
    Ow = !!((kf = tr == null ? void 0 : tr.lobby_v2_options) != null && kf.challenges_fe_script_url),
    Aw = () => {
      Ow && (Ew({
        locale: tr.locale,
        identifier: tr.identifier
      }), tr.lobby_v2_options && Tw(tr.lobby_v2_options), jm(Cr.locale, Ln.challenges_fe_script_url), bw(!0))
    },
    Iw = () => Ln == null ? void 0 : Ln.challenges_api_url,
    Pw = "api/v1/lobby/",
    ra = () => {
      const e = Ln == null ? void 0 : Ln.challenges_token;
      return e ? {
        headers: {
          Authorization: `Bearer ${e}`
        }
      } : {}
    },
    sa = e => `${Iw()}${Pw}${e}`,
    Lw = async () => {
      const t = sa("challenges");
      return await fetch(t, ra()).then(n => n.json().then(r => r.data))
    }, kw = async e => {
      const t = `challenges/${e}/leaderboard/preview`,
        n = sa(t);
      return await fetch(n, ra()).then(r => r.json())
    }, Rw = async e => {
      const t = `challenges/${e}`,
        n = sa(t);
      return await fetch(n, ra()).then(r => r.json())
    }, Nw = $w(() => {
      vr.invalidateQueries({
        queryKey: ["challengeLeaderboardPreview"]
      })
    }, 5e3), Dw = () => {
      const e = ee(() => Pt.id || null),
        t = ee(() => Pt.spin_limit || 0);
      return Oo({
        queryKey: ["challengeLeaderboardPreview", e],
        queryFn: () => kw(e.value),
        select: n => {
          if (t.value > 0) {
            const r = t.value - n.spin_count;
            na(r)
          }
          return n
        },
        enabled: !!e.value,
        refetchInterval: 60 * 1e3,
        placeholderData: vo,
        staleTime: 60 * 1e3
      })
    }, Mw = () => {
      const e = (n, r, s) => {
          var i;
          switch (n) {
            case Sr.START_LOADING:
              const o = s == null ? void 0 : s.game;
              _w(!!((i = o == null ? void 0 : o.isMobile) != null && i.any)), xw(window.innerHeight > window.innerWidth);
              break;
            case Sr.INITIAL_SETTINGS:
              rf(!!(s != null && s.isLeftHandedUI));
              break;
            case Sr.SETTINGS_CHANGE:
              r === "isLeftHandedUI" && rf(!!s);
              break;
            case Sr.FINISH_ROUND_ANIMATIONS:
              Nw();
              break;
            case Sr.BUTTON_CLICK:
              r.includes("bonus") && sf(!0);
              break;
            case Sr.GAME_UI_OVERLAP:
              nf(s);
              break
          }
        },
        t = n => {
          const r = n.data;
          switch (r.name) {
            case Or.JOIN_CHALLENGE:
              vr.invalidateQueries({
                queryKey: ["challenges"]
              });
              break;
            case Or.GAME_UI_OVERLAP:
              nf(r == null ? void 0 : r.isOverlapped);
              break;
            case Or.INIT_EXT_WIDGETS:
              Aw();
              break;
            case Or.DISABLE_EXT_WIDGETS:
              vw();
              break;
            case Or.ENABLE_EXT_WIDGETS:
              yw();
              break
          }
        };
      window.trackGameEventListeners || (window.trackGameEventListeners = []), window.trackGameEventListeners.push(e), window.addEventListener("message", t)
    };

  function Fw(e, t) {
    let n = null;
    return (...r) => {
      n !== null && clearTimeout(n), n = setTimeout(() => {
        e(...r)
      }, t)
    }
  }

  function $w(e, t) {
    let n = 0,
      r = null;
    return (...s) => {
      const i = Date.now();
      i - n >= t ? (n = i, e(...s)) : (r !== null && clearTimeout(r), r = setTimeout(() => {
        n = Date.now(), r = null, e(...s)
      }, t - (i - n)))
    }
  }
  const Uw = 1,
    jw = 3e3,
    cn = {
      ADD_TOAST: "ADD_TOAST",
      UPDATE_TOAST: "UPDATE_TOAST",
      DISMISS_TOAST: "DISMISS_TOAST",
      REMOVE_TOAST: "REMOVE_TOAST"
    };
  let ia = 0;
  const Vw = () => (ia = (ia + 1) % Number.MAX_VALUE, ia.toString()),
    oa = new Map,
    of = e => {
      if (oa.has(e)) return;
      const t = setTimeout(() => {
        oa.delete(e), xs({
          type: cn.REMOVE_TOAST,
          toastId: e
        })
      }, jw);
      oa.set(e, t)
    },
    Lt = re({
      toasts: []
    }),
    xs = e => {
      switch (e.type) {
        case cn.ADD_TOAST:
          Lt.value.toasts = [e.toast, ...Lt.value.toasts].slice(0, Uw);
          break;
        case cn.UPDATE_TOAST:
          Lt.value.toasts = Lt.value.toasts.map(t => t.id === e.toast.id ? {
            ...t,
            ...e.toast
          } : t);
          break;
        case cn.DISMISS_TOAST: {
          const {
            toastId: t
          } = e;
          t ? of(t) : Lt.value.toasts.forEach(n => {
            of(n.id)
          }), Lt.value.toasts = Lt.value.toasts.map(n => n.id === t || t === void 0 ? {
            ...n,
            open: !1
          } : n);
          break
        }
        case cn.REMOVE_TOAST:
          e.toastId === void 0 ? Lt.value.toasts = [] : Lt.value.toasts = Lt.value.toasts.filter(t => t.id !== e.toastId);
          break
      }
    },
    af = () => ({
      toasts: ee(() => Lt.value.toasts),
      toast: Ww,
      dismiss: e => xs({
        type: cn.DISMISS_TOAST,
        toastId: e
      })
    }),
    Ww = e => {
      const t = Vw(),
        n = s => xs({
          type: cn.UPDATE_TOAST,
          toast: {
            ...s,
            id: t
          }
        }),
        r = () => xs({
          type: cn.DISMISS_TOAST,
          toastId: t
        });
      return xs({
        type: cn.ADD_TOAST,
        toast: {
          ...e,
          id: t,
          open: !0,
          onOpenChange: s => {
            s || r()
          }
        }
      }), {
        id: t,
        dismiss: r,
        update: n
      }
    };

  function lf(e, t) {
    const n = typeof e == "string" && !t ? `${e}Context` : t,
      r = Symbol(n);
    return [s => {
      const i = yn(r, s);
      if (i || i === null) return i;
      throw new Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e)?`one of the following components: ${e.join(", ")}`:`\`${e}\``}`)
    }, s => (Zi(r, s), s)]
  }

  function aa(e) {
    return Ra() ? (Na(e), !0) : !1
  }

  function Hw(e) {
    let t = !1,
      n;
    const r = ka(!0);
    return (...s) => (t || (n = r.run(() => e(...s)), t = !0), n)
  }

  function vi(e) {
    return typeof e == "function" ? e() : D(e)
  }
  const yi = typeof window < "u" && typeof document < "u";
  typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
  const Bw = e => typeof e < "u",
    Kw = Object.prototype.toString,
    Qw = e => Kw.call(e) === "[object Object]",
    cf = () => {};

  function Gw(e, t, n = {}) {
    const {
      immediate: r = !0
    } = n, s = re(!1);
    let i = null;

    function o() {
      i && (clearTimeout(i), i = null)
    }

    function a() {
      s.value = !1, o()
    }

    function l(...c) {
      o(), s.value = !0, i = setTimeout(() => {
        s.value = !1, i = null, e(...c)
      }, vi(t))
    }
    return r && (s.value = !0, yi && l()), aa(a), {
      isPending: Jr(s),
      start: l,
      stop: a
    }
  }

  function qw(e = 1e3, t = {}) {
    const {
      controls: n = !1,
      callback: r
    } = t, s = Gw(r ?? cf, e, t), i = ee(() => !s.isPending.value);
    return n ? {
      ready: i,
      ...s
    } : i
  }

  function Ar(e) {
    var t;
    const n = vi(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
  }
  const _i = yi ? window : void 0;

  function Yw(...e) {
    let t, n, r, s;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, s] = e, t = _i) : [t, n, r, s] = e, !t) return cf;
    Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
    const i = [],
      o = () => {
        i.forEach(u => u()), i.length = 0
      },
      a = (u, f, h, m) => (u.addEventListener(f, h, m), () => u.removeEventListener(f, h, m)),
      l = Ce(() => [Ar(t), vi(s)], ([u, f]) => {
        if (o(), !u) return;
        const h = Qw(f) ? {
          ...f
        } : f;
        i.push(...n.flatMap(m => r.map(O => a(u, m, O, h))))
      }, {
        immediate: !0,
        flush: "post"
      }),
      c = () => {
        l(), o()
      };
    return aa(c), c
  }

  function zw(e) {
    return typeof e == "function" ? e : typeof e == "string" ? t => t.key === e : Array.isArray(e) ? t => e.includes(t.key) : () => !0
  }

  function uf(...e) {
    let t, n, r = {};
    e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
    const {
      target: s = _i,
      eventName: i = "keydown",
      passive: o = !1,
      dedupe: a = !1
    } = r, l = zw(t);
    return Yw(s, i, c => {
      c.repeat && vi(a) || l(c) && n(c)
    }, o)
  }

  function ff(e, t = {}) {
    const {
      immediate: n = !0,
      fpsLimit: r = void 0,
      window: s = _i
    } = t, i = re(!1), o = r ? 1e3 / r : null;
    let a = 0,
      l = null;

    function c(h) {
      if (!i.value || !s) return;
      a || (a = h);
      const m = h - a;
      if (o && m < o) {
        l = s.requestAnimationFrame(c);
        return
      }
      a = h, e({
        delta: m,
        timestamp: h
      }), l = s.requestAnimationFrame(c)
    }

    function u() {
      !i.value && s && (i.value = !0, a = 0, l = s.requestAnimationFrame(c))
    }

    function f() {
      i.value = !1, l != null && s && (s.cancelAnimationFrame(l), l = null)
    }
    return n && u(), aa(f), {
      isActive: Jr(i),
      pause: f,
      resume: u
    }
  }

  function Xw(e) {
    return JSON.parse(JSON.stringify(e))
  }

  function Jw(e, t, n, r = {}) {
    var s, i, o;
    const {
      clone: a = !1,
      passive: l = !1,
      eventName: c,
      deep: u = !1,
      defaultValue: f,
      shouldEmit: h
    } = r, m = xn(), O = n || (m == null ? void 0 : m.emit) || ((s = m == null ? void 0 : m.$emit) == null ? void 0 : s.bind(m)) || ((o = (i = m == null ? void 0 : m.proxy) == null ? void 0 : i.$emit) == null ? void 0 : o.bind(m == null ? void 0 : m.proxy));
    let b = c;
    b = b || `update:${t.toString()}`;
    const E = S => a ? typeof a == "function" ? a(S) : Xw(S) : S,
      g = () => Bw(e[t]) ? E(e[t]) : f,
      x = S => {
        h ? h(S) && O(b, S) : O(b, S)
      };
    if (l) {
      const S = g(),
        v = re(S);
      let I = !1;
      return Ce(() => e[t], R => {
        I || (I = !0, v.value = E(R), Ys(() => I = !1))
      }), Ce(v, R => {
        !I && (R !== e[t] || u) && x(R)
      }, {
        deep: u
      }), v
    } else return ee({
      get() {
        return g()
      },
      set(S) {
        x(S)
      }
    })
  }

  function la(e) {
    return e ? e.flatMap(t => t.type === Me ? la(t.children) : [t]) : []
  }

  function Ir() {
    let e = document.activeElement;
    if (e == null) return null;
    for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null;) e = e.shadowRoot.activeElement;
    return e
  }
  const Zw = "data-radix-vue-collection-item";

  function eb(e, t = Zw) {
    const n = Symbol();
    return {
      createCollection: r => {
        const s = re([]);

        function i() {
          const o = Ar(r);
          return o ? s.value = Array.from(o.querySelectorAll(`[${t}]:not([data-disabled])`)) : s.value = []
        }
        return vl(() => {
          s.value = []
        }), bn(i), yl(i), Ce(() => r == null ? void 0 : r.value, i, {
          immediate: !0
        }), Zi(n, s), s
      },
      injectCollection: () => yn(n, re([]))
    }
  }

  function tb(e) {
    const t = xn(),
      n = t == null ? void 0 : t.type.emits,
      r = {};
    return n != null && n.length || console.warn(`No emitted event found. Please check component: ${t==null?void 0:t.type.__name}`), n == null || n.forEach(s => {
      r[Ds(ot(s))] = (...i) => e(s, ...i)
    }), r
  }

  function nb(e) {
    const t = xn(),
      n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((s, i) => {
        const o = (t == null ? void 0 : t.type.props[i]).default;
        return o !== void 0 && (s[i] = o), s
      }, {}),
      r = yd(e);
    return ee(() => {
      const s = {},
        i = (t == null ? void 0 : t.vnode.props) ?? {};
      return Object.keys(i).forEach(o => {
        s[ot(o)] = i[o]
      }), Object.keys({
        ...n,
        ...s
      }).reduce((o, a) => (r.value[a] !== void 0 && (o[a] = r.value[a]), o), {})
    })
  }

  function rb(e, t) {
    const n = nb(e),
      r = t ? tb(t) : {};
    return ee(() => ({
      ...n.value,
      ...r
    }))
  }

  function kn() {
    const e = xn(),
      t = re(),
      n = ee(() => {
        var o, a;
        return ["#text", "#comment"].includes((o = t.value) == null ? void 0 : o.$el.nodeName) ? (a = t.value) == null ? void 0 : a.$el.nextElementSibling : Ar(t)
      }),
      r = Object.assign({}, e.exposed),
      s = {};
    for (const o in e.props) Object.defineProperty(s, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o]
    });
    if (Object.keys(r).length > 0)
      for (const o in r) Object.defineProperty(s, o, {
        enumerable: !0,
        configurable: !0,
        get: () => r[o]
      });
    Object.defineProperty(s, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => e.vnode.el
    }), e.exposed = s;

    function i(o) {
      t.value = o, o && (Object.defineProperty(s, "$el", {
        enumerable: !0,
        configurable: !0,
        get: () => o instanceof Element ? o : o.$el
      }), e.exposed = s)
    }
    return {
      forwardRef: i,
      currentRef: t,
      currentElement: n
    }
  }

  function sb(e, t) {
    const n = re(e);

    function r(s) {
      return t[n.value][s] ?? n.value
    }
    return {
      state: n,
      dispatch: s => {
        n.value = r(s)
      }
    }
  }
  const ib = ie({
      name: "PrimitiveSlot",
      inheritAttrs: !1,
      setup(e, {
        attrs: t,
        slots: n
      }) {
        return () => {
          var r, s;
          if (!n.default) return null;
          const i = la(n.default()),
            o = i.findIndex(u => u.type !== Ut);
          if (o === -1) return i;
          const a = i[o];
          (r = a.props) == null || delete r.ref;
          const l = a.props ? ht(t, a.props) : t;
          t.class && (s = a.props) != null && s.class && delete a.props.class;
          const c = Jn(a, l);
          for (const u in l) u.startsWith("on") && (c.props || (c.props = {}), c.props[u] = l[u]);
          return i.length === 1 ? c : (i[o] = c, i)
        }
      }
    }),
    Rn = ie({
      name: "Primitive",
      inheritAttrs: !1,
      props: {
        asChild: {
          type: Boolean,
          default: !1
        },
        as: {
          type: [String, Object],
          default: "div"
        }
      },
      setup(e, {
        attrs: t,
        slots: n
      }) {
        const r = e.asChild ? "template" : e.as;
        return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => br(r, t) : r !== "template" ? () => br(e.as, t, {
          default: n.default
        }) : () => br(ib, t, {
          default: n.default
        })
      }
    });

  function ob(e, t) {
    var n;
    const r = re({}),
      s = re("none"),
      i = re(e),
      o = e.value ? "mounted" : "unmounted";
    let a;
    const l = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? _i,
      {
        state: c,
        dispatch: u
      } = sb(o, {
        mounted: {
          UNMOUNT: "unmounted",
          ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
          MOUNT: "mounted",
          ANIMATION_END: "unmounted"
        },
        unmounted: {
          MOUNT: "mounted"
        }
      }),
      f = E => {
        var g;
        if (yi) {
          const x = new CustomEvent(E, {
            bubbles: !1,
            cancelable: !1
          });
          (g = t.value) == null || g.dispatchEvent(x)
        }
      };
    Ce(e, async (E, g) => {
      var x;
      const S = g !== E;
      if (await Ys(), S) {
        const v = s.value,
          I = xi(t.value);
        E ? (u("MOUNT"), f("enter"), I === "none" && f("after-enter")) : I === "none" || ((x = r.value) == null ? void 0 : x.display) === "none" ? (u("UNMOUNT"), f("leave"), f("after-leave")) : g && v !== I ? (u("ANIMATION_OUT"), f("leave")) : (u("UNMOUNT"), f("after-leave"))
      }
    }, {
      immediate: !0
    });
    const h = E => {
        const g = xi(t.value),
          x = g.includes(E.animationName),
          S = c.value === "mounted" ? "enter" : "leave";
        if (E.target === t.value && x && (f(`after-${S}`), u("ANIMATION_END"), !i.value)) {
          const v = t.value.style.animationFillMode;
          t.value.style.animationFillMode = "forwards", a = l == null ? void 0 : l.setTimeout(() => {
            var I;
            ((I = t.value) == null ? void 0 : I.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = v)
          })
        }
        E.target === t.value && g === "none" && u("ANIMATION_END")
      },
      m = E => {
        E.target === t.value && (s.value = xi(t.value))
      },
      O = Ce(t, (E, g) => {
        E ? (r.value = getComputedStyle(E), E.addEventListener("animationstart", m), E.addEventListener("animationcancel", h), E.addEventListener("animationend", h)) : (u("ANIMATION_END"), a !== void 0 && (l == null || l.clearTimeout(a)), g == null || g.removeEventListener("animationstart", m), g == null || g.removeEventListener("animationcancel", h), g == null || g.removeEventListener("animationend", h))
      }, {
        immediate: !0
      }),
      b = Ce(c, () => {
        const E = xi(t.value);
        s.value = c.value === "mounted" ? E : "none"
      });
    return vn(() => {
      O(), b()
    }), {
      isPresent: ee(() => ["mounted", "unmountSuspended"].includes(c.value))
    }
  }

  function xi(e) {
    return e && getComputedStyle(e).animationName || "none"
  }
  const ab = ie({
      name: "Presence",
      props: {
        present: {
          type: Boolean,
          required: !0
        },
        forceMount: {
          type: Boolean
        }
      },
      slots: {},
      setup(e, {
        slots: t,
        expose: n
      }) {
        var r;
        const {
          present: s,
          forceMount: i
        } = Bs(e), o = re(), {
          isPresent: a
        } = ob(s, o);
        n({
          present: a
        });
        let l = t.default({
          present: a
        });
        l = la(l || []);
        const c = xn();
        if (l && (l == null ? void 0 : l.length) > 1) {
          const u = (r = c == null ? void 0 : c.parent) != null && r.type.name ? `<${c.parent.type.name} />` : "component";
          throw new Error([`Detected an invalid children for \`${u}\` for  \`Presence\` component.`, "", "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.", "You can apply a few solutions:", ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map(f => `  - ${f}`).join(`
`)].join(`
`))
        }
        return () => i.value || s.value || a.value ? br(t.default({
          present: a
        })[0], {
          ref: u => {
            const f = Ar(u);
            return typeof(f == null ? void 0 : f.hasAttribute) > "u" || (f != null && f.hasAttribute("data-radix-popper-content-wrapper") ? o.value = f.firstElementChild : o.value = f), f
          }
        }) : null
      }
    }),
    df = Zt({
      layersRoot: new Set,
      layersWithOutsidePointerEventsDisabled: new Set,
      branches: new Set
    }),
    lb = ie({
      __name: "DismissableLayerBranch",
      props: {
        asChild: {
          type: Boolean
        },
        as: {}
      },
      setup(e) {
        const t = e,
          {
            forwardRef: n,
            currentElement: r
          } = kn();
        return bn(() => {
          df.branches.add(r.value)
        }), vn(() => {
          df.branches.delete(r.value)
        }), (s, i) => (Q(), oe(D(Rn), ht({
          ref: D(n)
        }, t), {
          default: me(() => [We(s.$slots, "default")]),
          _: 3
        }, 16))
      }
    });

  function ca(e, {
    select: t = !1
  } = {}) {
    const n = Ir();
    for (const r of e)
      if (fb(r, {
          select: t
        }), Ir() !== n) return !0
  }

  function cb(e) {
    const t = [],
      n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
        acceptNode: r => {
          const s = r.tagName === "INPUT" && r.type === "hidden";
          return r.disabled || r.hidden || s ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        }
      });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
  }

  function ub(e) {
    return e instanceof HTMLInputElement && "select" in e
  }

  function fb(e, {
    select: t = !1
  } = {}) {
    if (e && e.focus) {
      const n = Ir();
      e.focus({
        preventScroll: !0
      }), e !== n && ub(e) && t && e.select()
    }
  }
  Hw(() => re([]));
  const pf = ie({
    __name: "VisuallyHidden",
    props: {
      asChild: {
        type: Boolean
      },
      as: {
        default: "span"
      }
    },
    setup(e) {
      return kn(), (t, n) => (Q(), oe(D(Rn), {
        as: t.as,
        "as-child": t.asChild,
        style: {
          position: "absolute",
          border: 0,
          width: "1px",
          display: "inline-block",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal"
        }
      }, {
        default: me(() => [We(t.$slots, "default")]),
        _: 3
      }, 8, ["as", "as-child"]))
    }
  });

  function db() {
    if (typeof matchMedia == "function") return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine"
  }
  db();
  const [Ei, pb] = lf("ToastProvider"), hb = ie({
    inheritAttrs: !1,
    __name: "ToastProvider",
    props: {
      label: {
        default: "Notification"
      },
      duration: {
        default: 5e3
      },
      swipeDirection: {
        default: "right"
      },
      swipeThreshold: {
        default: 50
      }
    },
    setup(e) {
      const t = e,
        {
          label: n,
          duration: r,
          swipeDirection: s,
          swipeThreshold: i
        } = Bs(t),
        o = re(),
        a = re(0),
        l = re(!1),
        c = re(!1);
      if (t.label && typeof t.label == "string" && !t.label.trim()) {
        const u = "Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.";
        throw new Error(u)
      }
      return pb({
        label: n,
        duration: r,
        swipeDirection: s,
        swipeThreshold: i,
        toastCount: a,
        viewport: o,
        onViewportChange(u) {
          o.value = u
        },
        onToastAdd() {
          a.value++
        },
        onToastRemove() {
          a.value--
        },
        isFocusedToastEscapeKeyDownRef: l,
        isClosePausedRef: c
      }), (u, f) => We(u.$slots, "default")
    }
  }), gb = "toast.swipeStart", mb = "toast.swipeMove", wb = "toast.swipeCancel", bb = "toast.swipeEnd", ua = "toast.viewportPause", fa = "toast.viewportResume";

  function Ti(e, t, n) {
    const r = n.originalEvent.currentTarget,
      s = new CustomEvent(e, {
        bubbles: !1,
        cancelable: !0,
        detail: n
      });
    t && r.addEventListener(e, t, {
      once: !0
    }), r.dispatchEvent(s)
  }

  function hf(e, t, n = 0) {
    const r = Math.abs(e.x),
      s = Math.abs(e.y),
      i = r > s;
    return t === "left" || t === "right" ? i && r > n : !i && s > n
  }

  function vb(e) {
    return e.nodeType === e.ELEMENT_NODE
  }

  function gf(e) {
    const t = [];
    return Array.from(e.childNodes).forEach(n => {
      if (n.nodeType === n.TEXT_NODE && n.textContent && t.push(n.textContent), vb(n)) {
        const r = n.ariaHidden || n.hidden || n.style.display === "none",
          s = n.dataset.radixToastAnnounceExclude === "";
        if (!r)
          if (s) {
            const i = n.dataset.radixToastAnnounceAlt;
            i && t.push(i)
          } else t.push(...gf(n))
      }
    }), t
  }
  const yb = ie({
      __name: "ToastAnnounce",
      setup(e) {
        const t = Ei(),
          n = qw(1e3),
          r = re(!1);
        return ff(() => {
          r.value = !0
        }), (s, i) => D(n) || r.value ? (Q(), oe(D(pf), {
          key: 0
        }, {
          default: me(() => [ls(dt(D(t).label.value) + " ", 1), We(s.$slots, "default")]),
          _: 3
        })) : et("", !0)
      }
    }),
    [_b, xb] = lf("ToastRoot"),
    Eb = ie({
      inheritAttrs: !1,
      __name: "ToastRootImpl",
      props: {
        type: {},
        open: {
          type: Boolean,
          default: !1
        },
        duration: {},
        asChild: {
          type: Boolean
        },
        as: {
          default: "li"
        }
      },
      emits: ["close", "escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd"],
      setup(e, {
        emit: t
      }) {
        const n = e,
          r = t,
          {
            forwardRef: s,
            currentElement: i
          } = kn(),
          o = Ei(),
          a = re(null),
          l = re(null),
          c = ee(() => typeof n.duration == "number" ? n.duration : o.duration.value),
          u = re(0),
          f = re(c.value),
          h = re(0),
          m = re(c.value),
          O = ff(() => {
            const x = new Date().getTime() - u.value;
            m.value = Math.max(f.value - x, 0)
          }, {
            fpsLimit: 60
          });

        function b(x) {
          x <= 0 || x === Number.POSITIVE_INFINITY || yi && (window.clearTimeout(h.value), u.value = new Date().getTime(), h.value = window.setTimeout(E, x))
        }

        function E() {
          var x, S;
          (x = i.value) != null && x.contains(Ir()) && ((S = o.viewport.value) == null || S.focus()), o.isClosePausedRef.value = !1, r("close")
        }
        const g = ee(() => i.value ? gf(i.value) : null);
        if (n.type && !["foreground", "background"].includes(n.type)) {
          const x = "Invalid prop `type` supplied to `Toast`. Expected `foreground | background`.";
          throw new Error(x)
        }
        return Hl(x => {
          const S = o.viewport.value;
          if (S) {
            const v = () => {
                b(f.value), O.resume(), r("resume")
              },
              I = () => {
                const R = new Date().getTime() - u.value;
                f.value = f.value - R, window.clearTimeout(h.value), O.pause(), r("pause")
              };
            return S.addEventListener(ua, I), S.addEventListener(fa, v), () => {
              S.removeEventListener(ua, I), S.removeEventListener(fa, v)
            }
          }
        }), Ce(() => [n.open, c.value], () => {
          f.value = c.value, n.open && !o.isClosePausedRef.value && b(c.value)
        }, {
          immediate: !0
        }), uf("Escape", x => {
          r("escapeKeyDown", x), x.defaultPrevented || (o.isFocusedToastEscapeKeyDownRef.value = !0, E())
        }), bn(() => {
          o.onToastAdd()
        }), vn(() => {
          o.onToastRemove()
        }), xb({
          onClose: E
        }), (x, S) => (Q(), He(Me, null, [g.value ? (Q(), oe(yb, {
          key: 0,
          role: "alert",
          "aria-live": x.type === "foreground" ? "assertive" : "polite",
          "aria-atomic": "true"
        }, {
          default: me(() => [ls(dt(g.value), 1)]),
          _: 1
        }, 8, ["aria-live"])) : et("", !0), D(o).viewport.value ? (Q(), oe(Nd, {
          key: 1,
          to: D(o).viewport.value
        }, [he(D(Rn), ht({
          ref: D(s),
          role: "alert",
          "aria-live": "off",
          "aria-atomic": "true",
          tabindex: "0",
          "data-radix-vue-collection-item": ""
        }, x.$attrs, {
          as: x.as,
          "as-child": x.asChild,
          "data-state": x.open ? "open" : "closed",
          "data-swipe-direction": D(o).swipeDirection.value,
          style: {
            userSelect: "none",
            touchAction: "none"
          },
          onPointerdown: S[0] || (S[0] = rh(v => {
            a.value = {
              x: v.clientX,
              y: v.clientY
            }
          }, ["left"])),
          onPointermove: S[1] || (S[1] = v => {
            if (!a.value) return;
            const I = v.clientX - a.value.x,
              R = v.clientY - a.value.y,
              k = !!l.value,
              V = ["left", "right"].includes(D(o).swipeDirection.value),
              U = ["left", "up"].includes(D(o).swipeDirection.value) ? Math.min : Math.max,
              K = V ? U(0, I) : 0,
              ne = V ? 0 : U(0, R),
              H = v.pointerType === "touch" ? 10 : 2,
              be = {
                x: K,
                y: ne
              },
              Ke = {
                originalEvent: v,
                delta: be
              };
            k ? (l.value = be, D(Ti)(D(mb), gt => r("swipeMove", gt), Ke)) : D(hf)(be, D(o).swipeDirection.value, H) ? (l.value = be, D(Ti)(D(gb), gt => r("swipeStart", gt), Ke), v.target.setPointerCapture(v.pointerId)) : (Math.abs(I) > H || Math.abs(R) > H) && (a.value = null)
          }),
          onPointerup: S[2] || (S[2] = v => {
            const I = l.value,
              R = v.target;
            if (R.hasPointerCapture(v.pointerId) && R.releasePointerCapture(v.pointerId), l.value = null, a.value = null, I) {
              const k = v.currentTarget,
                V = {
                  originalEvent: v,
                  delta: I
                };
              D(hf)(I, D(o).swipeDirection.value, D(o).swipeThreshold.value) ? D(Ti)(D(bb), U => r("swipeEnd", U), V) : D(Ti)(D(wb), U => r("swipeCancel", U), V), k == null || k.addEventListener("click", U => U.preventDefault(), {
                once: !0
              })
            }
          })
        }), {
          default: me(() => [We(x.$slots, "default", {
            remaining: m.value,
            duration: c.value
          })]),
          _: 3
        }, 16, ["as", "as-child", "data-state", "data-swipe-direction"])], 8, ["to"])) : et("", !0)], 64))
      }
    }),
    Tb = ie({
      __name: "ToastRoot",
      props: {
        defaultOpen: {
          type: Boolean,
          default: !0
        },
        forceMount: {
          type: Boolean
        },
        type: {
          default: "foreground"
        },
        open: {
          type: Boolean,
          default: void 0
        },
        duration: {},
        asChild: {
          type: Boolean
        },
        as: {
          default: "li"
        }
      },
      emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
      setup(e, {
        emit: t
      }) {
        const n = e,
          r = t,
          {
            forwardRef: s
          } = kn(),
          i = Jw(n, "open", r, {
            defaultValue: n.defaultOpen,
            passive: n.open === void 0
          });
        return (o, a) => (Q(), oe(D(ab), {
          present: o.forceMount || D(i)
        }, {
          default: me(() => [he(Eb, ht({
            ref: D(s),
            open: D(i),
            type: o.type,
            as: o.as,
            "as-child": o.asChild,
            duration: o.duration
          }, o.$attrs, {
            onClose: a[0] || (a[0] = l => i.value = !1),
            onPause: a[1] || (a[1] = l => r("pause")),
            onResume: a[2] || (a[2] = l => r("resume")),
            onEscapeKeyDown: a[3] || (a[3] = l => r("escapeKeyDown", l)),
            onSwipeStart: a[4] || (a[4] = l => {
              r("swipeStart", l), l.currentTarget.setAttribute("data-swipe", "start")
            }),
            onSwipeMove: a[5] || (a[5] = l => {
              const {
                x: c,
                y: u
              } = l.detail.delta, f = l.currentTarget;
              f.setAttribute("data-swipe", "move"), f.style.setProperty("--radix-toast-swipe-move-x", `${c}px`), f.style.setProperty("--radix-toast-swipe-move-y", `${u}px`)
            }),
            onSwipeCancel: a[6] || (a[6] = l => {
              const c = l.currentTarget;
              c.setAttribute("data-swipe", "cancel"), c.style.removeProperty("--radix-toast-swipe-move-x"), c.style.removeProperty("--radix-toast-swipe-move-y"), c.style.removeProperty("--radix-toast-swipe-end-x"), c.style.removeProperty("--radix-toast-swipe-end-y")
            }),
            onSwipeEnd: a[7] || (a[7] = l => {
              const {
                x: c,
                y: u
              } = l.detail.delta, f = l.currentTarget;
              f.setAttribute("data-swipe", "end"), f.style.removeProperty("--radix-toast-swipe-move-x"), f.style.removeProperty("--radix-toast-swipe-move-y"), f.style.setProperty("--radix-toast-swipe-end-x", `${c}px`), f.style.setProperty("--radix-toast-swipe-end-y", `${u}px`), i.value = !1
            })
          }), {
            default: me(({
              remaining: l,
              duration: c
            }) => [We(o.$slots, "default", {
              remaining: l,
              duration: c,
              open: D(i)
            })]),
            _: 3
          }, 16, ["open", "type", "as", "as-child", "duration"])]),
          _: 3
        }, 8, ["present"]))
      }
    }),
    Cb = ie({
      __name: "ToastAnnounceExclude",
      props: {
        altText: {},
        asChild: {
          type: Boolean
        },
        as: {}
      },
      setup(e) {
        return (t, n) => (Q(), oe(D(Rn), {
          as: t.as,
          "as-child": t.asChild,
          "data-radix-toast-announce-exclude": "",
          "data-radix-toast-announce-alt": t.altText || void 0
        }, {
          default: me(() => [We(t.$slots, "default")]),
          _: 3
        }, 8, ["as", "as-child", "data-radix-toast-announce-alt"]))
      }
    }),
    Sb = ie({
      __name: "ToastClose",
      props: {
        asChild: {
          type: Boolean
        },
        as: {
          default: "button"
        }
      },
      setup(e) {
        const t = e,
          n = _b(),
          {
            forwardRef: r
          } = kn();
        return (s, i) => (Q(), oe(Cb, {
          "as-child": ""
        }, {
          default: me(() => [he(D(Rn), ht(t, {
            ref: D(r),
            type: s.as === "button" ? "button" : void 0,
            onClick: i[0] || (i[0] = o => D(n).onClose())
          }), {
            default: me(() => [We(s.$slots, "default")]),
            _: 3
          }, 16, ["type"])]),
          _: 3
        }))
      }
    }),
    mf = ie({
      __name: "FocusProxy",
      emits: ["focusFromOutsideViewport"],
      setup(e, {
        emit: t
      }) {
        const n = t,
          r = Ei();
        return (s, i) => (Q(), oe(D(pf), {
          "aria-hidden": "true",
          tabindex: "0",
          style: {
            position: "fixed"
          },
          onFocus: i[0] || (i[0] = o => {
            var a;
            const l = o.relatedTarget;
            !((a = D(r).viewport.value) != null && a.contains(l)) && n("focusFromOutsideViewport")
          })
        }, {
          default: me(() => [We(s.$slots, "default")]),
          _: 3
        }))
      }
    }),
    Ob = ie({
      inheritAttrs: !1,
      __name: "ToastViewport",
      props: {
        hotkey: {
          default: () => ["F8"]
        },
        label: {
          type: [String, Function],
          default: "Notifications ({hotkey})"
        },
        asChild: {
          type: Boolean
        },
        as: {
          default: "ol"
        }
      },
      setup(e) {
        const t = e,
          {
            hotkey: n,
            label: r
          } = Bs(t),
          {
            forwardRef: s,
            currentElement: i
          } = kn(),
          {
            createCollection: o
          } = eb(),
          a = o(i),
          l = Ei(),
          c = ee(() => l.toastCount.value > 0),
          u = re(),
          f = re(),
          h = ee(() => n.value.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
        uf(n.value, () => {
          i.value.focus()
        }), bn(() => {
          l.onViewportChange(i.value)
        }), Hl(O => {
          const b = i.value;
          if (c.value && b) {
            const E = () => {
                if (!l.isClosePausedRef.value) {
                  const I = new CustomEvent(ua);
                  b.dispatchEvent(I), l.isClosePausedRef.value = !0
                }
              },
              g = () => {
                if (l.isClosePausedRef.value) {
                  const I = new CustomEvent(fa);
                  b.dispatchEvent(I), l.isClosePausedRef.value = !1
                }
              },
              x = I => {
                !b.contains(I.relatedTarget) && g()
              },
              S = () => {
                b.contains(Ir()) || g()
              },
              v = I => {
                var R, k, V;
                const U = I.altKey || I.ctrlKey || I.metaKey;
                if (I.key === "Tab" && !U) {
                  const K = Ir(),
                    ne = I.shiftKey;
                  if (I.target === b && ne) {
                    (R = u.value) == null || R.focus();
                    return
                  }
                  const H = m({
                      tabbingDirection: ne ? "backwards" : "forwards"
                    }),
                    be = H.findIndex(Ke => Ke === K);
                  ca(H.slice(be + 1)) ? I.preventDefault() : ne ? (k = u.value) == null || k.focus() : (V = f.value) == null || V.focus()
                }
              };
            b.addEventListener("focusin", E), b.addEventListener("focusout", x), b.addEventListener("pointermove", E), b.addEventListener("pointerleave", S), b.addEventListener("keydown", v), window.addEventListener("blur", E), window.addEventListener("focus", g), O(() => {
              b.removeEventListener("focusin", E), b.removeEventListener("focusout", x), b.removeEventListener("pointermove", E), b.removeEventListener("pointerleave", S), b.removeEventListener("keydown", v), window.removeEventListener("blur", E), window.removeEventListener("focus", g)
            })
          }
        });

        function m({
          tabbingDirection: O
        }) {
          const b = a.value.map(E => {
            const g = [E, ...cb(E)];
            return O === "forwards" ? g : g.reverse()
          });
          return (O === "forwards" ? b.reverse() : b).flat()
        }
        return (O, b) => (Q(), oe(D(lb), {
          role: "region",
          "aria-label": typeof D(r) == "string" ? D(r).replace("{hotkey}", h.value) : D(r)(h.value),
          tabindex: "-1",
          style: Qr({
            pointerEvents: c.value ? void 0 : "none"
          })
        }, {
          default: me(() => [c.value ? (Q(), oe(mf, {
            key: 0,
            ref: E => {
              u.value = D(Ar)(E)
            },
            onFocusFromOutsideViewport: b[0] || (b[0] = () => {
              const E = m({
                tabbingDirection: "forwards"
              });
              D(ca)(E)
            })
          }, null, 512)) : et("", !0), he(D(Rn), ht({
            ref: D(s),
            tabindex: "-1",
            as: O.as,
            "as-child": O.asChild
          }, O.$attrs), {
            default: me(() => [We(O.$slots, "default")]),
            _: 3
          }, 16, ["as", "as-child"]), c.value ? (Q(), oe(mf, {
            key: 1,
            ref: E => {
              f.value = D(Ar)(E)
            },
            onFocusFromOutsideViewport: b[1] || (b[1] = () => {
              const E = m({
                tabbingDirection: "backwards"
              });
              D(ca)(E)
            })
          }, null, 512)) : et("", !0)]),
          _: 3
        }, 8, ["aria-label", "style"]))
      }
    }),
    Ab = ie({
      __name: "ToastTitle",
      props: {
        asChild: {
          type: Boolean
        },
        as: {}
      },
      setup(e) {
        const t = e;
        return kn(), (n, r) => (Q(), oe(D(Rn), ki(si(t)), {
          default: me(() => [We(n.$slots, "default")]),
          _: 3
        }, 16))
      }
    }),
    Ib = ie({
      __name: "ToastDescription",
      props: {
        asChild: {
          type: Boolean
        },
        as: {}
      },
      setup(e) {
        const t = e;
        return kn(), (n, r) => (Q(), oe(D(Rn), ki(si(t)), {
          default: me(() => [We(n.$slots, "default")]),
          _: 3
        }, 16))
      }
    }),
    Pb = ie({
      __name: "Toast",
      props: {
        class: {},
        variant: {},
        onOpenChange: {
          type: Function
        },
        defaultOpen: {
          type: Boolean
        },
        forceMount: {
          type: Boolean
        },
        type: {},
        open: {
          type: Boolean
        },
        duration: {},
        asChild: {
          type: Boolean
        },
        as: {
          type: [String, Object, Function]
        }
      },
      emits: ["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"],
      setup(e, {
        emit: t
      }) {
        const n = e,
          r = t,
          s = ee(() => {
            const {
              class: o,
              ...a
            } = n;
            return a
          }),
          i = rb(s, r);
        return (o, a) => (Q(), oe(D(Tb), ht(D(i), {
          class: D(_s)(D(Vb)({
            variant: o.variant
          }), n.class),
          "onUpdate:open": o.onOpenChange
        }), {
          default: me(() => [We(o.$slots, "default")]),
          _: 3
        }, 16, ["class", "onUpdate:open"]))
      }
    }),
    Lb = ie({
      __name: "ToastViewport",
      props: {
        hotkey: {},
        label: {
          type: [String, Function]
        },
        asChild: {
          type: Boolean
        },
        as: {
          type: [String, Object, Function]
        },
        class: {}
      },
      setup(e) {
        const t = e,
          n = ee(() => {
            const {
              class: r,
              ...s
            } = t;
            return s
          });
        return (r, s) => (Q(), oe(D(Ob), ht(n.value, {
          class: D(_s)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", t.class)
        }), null, 16, ["class"]))
      }
    }),
    wf = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, s] of t) n[r] = s;
      return n
    },
    kb = {},
    Rb = {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    };

  function Nb(e, t) {
    return Q(), He("svg", Rb, t[0] || (t[0] = [Ne("path", {
      d: "M15.1719 2.42188L9.54688 8.04688L15.125 13.625C15.5938 14.0469 15.5938 14.75 15.125 15.1719C14.7031 15.6406 14 15.6406 13.5781 15.1719L7.95312 9.59375L2.375 15.1719C1.95312 15.6406 1.25 15.6406 0.828125 15.1719C0.359375 14.75 0.359375 14.0469 0.828125 13.5781L6.40625 8L0.828125 2.42188C0.359375 2 0.359375 1.29688 0.828125 0.828125C1.25 0.40625 1.95312 0.40625 2.42188 0.828125L8 6.45312L13.5781 0.875C14 0.40625 14.7031 0.40625 15.1719 0.875C15.5938 1.29688 15.5938 2 15.1719 2.42188Z",
      fill: "currentColor"
    }, null, -1)]))
  }
  const Db = wf(kb, [
      ["render", Nb]
    ]),
    Mb = ["stroke"],
    Fb = ie({
      __name: "IconLoading",
      props: {
        isSecondary: {
          type: Boolean
        }
      },
      setup(e) {
        return (t, n) => (Q(), He("svg", {
          width: "48",
          height: "48",
          viewBox: "0 0 48 48",
          xmlns: "http://www.w3.org/2000/svg",
          stroke: t.isSecondary ? "#000" : "#fff"
        }, n[0] || (n[0] = [Ne("g", {
          fill: "none",
          "fill-rule": "evenodd",
          "stroke-width": "4"
        }, [Ne("circle", {
          cx: "24",
          cy: "24",
          r: "22",
          "stroke-opacity": "0.1"
        }), Ne("path", {
          d: "M24 2 A 22 22 0 0 1 46 24",
          "stroke-linecap": "round"
        }, [Ne("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          from: "0 24 24",
          to: "360 24 24",
          dur: "1s",
          repeatCount: "indefinite"
        })])], -1)]), 8, Mb))
      }
    }),
    $b = ie({
      __name: "ToastClose",
      props: {
        asChild: {
          type: Boolean
        },
        as: {
          type: [String, Object, Function]
        },
        class: {}
      },
      setup(e) {
        const t = e,
          n = ee(() => {
            const {
              class: r,
              ...s
            } = t;
            return s
          });
        return (r, s) => (Q(), oe(D(Sb), ht(n.value, {
          class: D(_s)("absolute right-2 top-2.5 rounded-md p-1 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100", t.class)
        }), {
          default: me(() => [he(D(Db), {
            class: "h-3 w-3 text-white"
          })]),
          _: 1
        }, 16, ["class"]))
      }
    }),
    Ub = ie({
      __name: "ToastTitle",
      props: {
        asChild: {
          type: Boolean
        },
        as: {
          type: [String, Object, Function]
        },
        class: {}
      },
      setup(e) {
        const t = e,
          n = ee(() => {
            const {
              class: r,
              ...s
            } = t;
            return s
          });
        return (r, s) => (Q(), oe(D(Ab), ht(n.value, {
          class: D(_s)("text-13 font-bold text-yellow", t.class)
        }), {
          default: me(() => [We(r.$slots, "default")]),
          _: 3
        }, 16, ["class"]))
      }
    }),
    bf = ie({
      __name: "ToastDescription",
      props: {
        asChild: {
          type: Boolean
        },
        as: {
          type: [String, Object, Function]
        },
        class: {}
      },
      setup(e) {
        const t = e,
          n = ee(() => {
            const {
              class: r,
              ...s
            } = t;
            return s
          });
        return (r, s) => (Q(), oe(D(Ib), ht(n.value, {
          class: D(_s)("text-12 text-yellow", t.class)
        }), {
          default: me(() => [We(r.$slots, "default")]),
          _: 3
        }, 16, ["class"]))
      }
    }),
    jb = ie({
      __name: "ToastProvider",
      props: {
        label: {},
        duration: {},
        swipeDirection: {},
        swipeThreshold: {}
      },
      setup(e) {
        const t = e;
        return (n, r) => (Q(), oe(D(hb), ki(si(t)), {
          default: me(() => [We(n.$slots, "default")]),
          _: 3
        }, 16))
      }
    }),
    vf = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e,
    yf = Gu,
    Vb = ((e, t) => n => {
      var r;
      if ((t == null ? void 0 : t.variants) == null) return yf(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
      const {
        variants: s,
        defaultVariants: i
      } = t, o = Object.keys(s).map(c => {
        const u = n == null ? void 0 : n[c],
          f = i == null ? void 0 : i[c];
        if (u === null) return null;
        const h = vf(u) || vf(f);
        return s[c][h]
      }), a = n && Object.entries(n).reduce((c, u) => {
        let [f, h] = u;
        return h === void 0 || (c[f] = h), c
      }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, u) => {
        let {
          class: f,
          className: h,
          ...m
        } = u;
        return Object.entries(m).every(O => {
          let [b, E] = O;
          return Array.isArray(E) ? E.includes({
            ...i,
            ...a
          } [b]) : {
            ...i,
            ...a
          } [b] === E
        }) ? [...c, f, h] : c
      }, []);
      return yf(e, o, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className)
    })("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=closed]:sm:slide-out-to-bottom-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
      variants: {
        variant: {
          default: ""
        }
      },
      defaultVariants: {
        variant: "default"
      }
    }),
    Wb = () => {
      const e = () => {
          const i = window.innerWidth / 360,
            o = i * 205 + "px";
          document.documentElement.style.setProperty("--viewport-scale-x", `${i}`), document.documentElement.style.setProperty("--mobile-bottom", `${o}`)
        },
        t = Fw(e, 300);
      bn(() => {
        e(), window.addEventListener("resize", t)
      }), vn(() => {
        window.removeEventListener("resize", t)
      })
    },
    _f = () => {
      const e = ee(() => Pt.id || null);
      return Oo({
        queryKey: ["challengeDetails", e],
        queryFn: () => Rw(e.value),
        select: t => (t.status === Re.Planned || t.status === Re.Ongoing ? (Sw(t), na(t.spin_limit)) : (ta("id", null), na(null)), t),
        enabled: !!e.value,
        refetchInterval: 60 * 1e3,
        placeholderData: vo,
        staleTime: 60 * 1e3
      })
    },
    Hb = () => {
      const {
        t: e
      } = xr(), {
        toast: t
      } = af(), {
        data: n
      } = _f(), r = ee(() => ea.value), s = ee(() => Pt.spin_limit ? Pt.spin_limit > 0 : !1), i = () => {
        n.value && n.value.status === Re.Ongoing && n.value.player_active && (!s.value || r.value && r.value > 0) && n.value.feature_condition === tf.DeniedBuy ? t({
          description: e("toast.buyBonus")
        }) : sf(!1)
      }, o = () => {
        n.value && n.value.player_active ? t({
          title: e("limitPopup.title"),
          description: e("limitPopup.message")
        }) : Cw(!1)
      };
      Ce(() => Jo.value, () => {
        Jo.value && i()
      }, {
        immediate: !0
      }), Ce(() => [Zo.value, s.value, r.value], () => {
        !Zo.value && s.value && r.value === 0 && o()
      }, {
        immediate: !0
      })
    },
    Bb = {
      class: "grid gap-1"
    },
    Kb = ie({
      __name: "Toaster",
      setup(e) {
        const {
          toasts: t
        } = af();
        return Hb(), (n, r) => (Q(), oe(D(jb), null, {
          default: me(() => [(Q(!0), He(Me, null, Qd(D(t), s => (Q(), oe(D(Pb), ht({
            key: s.id
          }, {
            ref_for: !0
          }, s, {
            class: "rounded-2xl border-none bg-theme-gray-dark"
          }), {
            default: me(() => [Ne("div", Bb, [s.title ? (Q(), oe(D(Ub), {
              key: 0
            }, {
              default: me(() => [ls(dt(s.title), 1)]),
              _: 2
            }, 1024)) : et("", !0), s.description ? (Q(), He(Me, {
              key: 1
            }, [wr(s.description) ? (Q(), oe(D(bf), {
              key: 0
            }, {
              default: me(() => [(Q(), oe(xl(s.description)))]),
              _: 2
            }, 1024)) : (Q(), oe(D(bf), {
              key: 1
            }, {
              default: me(() => [ls(dt(s.description), 1)]),
              _: 2
            }, 1024))], 64)) : et("", !0), he(D($b))]), (Q(), oe(xl(s.action)))]),
            _: 2
          }, 1040))), 128)), he(D(Lb))]),
          _: 1
        }))
      }
    }),
    Qb = {
      key: 0,
      class: "flex h-[18px] flex-row items-center justify-center gap-2"
    },
    Gb = {
      class: "text-10 uppercase text-white"
    },
    qb = {
      key: 0,
      class: "flex items-baseline gap-0.5"
    },
    Yb = ie({
      __name: "Timer",
      props: {
        id: {},
        status: {},
        start_at: {},
        finish_at: {},
        visible: {
          type: Boolean
        }
      },
      setup(e) {
        const {
          t
        } = xr(), n = e;
        let r = !1;
        const s = () => {
            r || (r = !0, setTimeout(() => {
              r = !1, vr.invalidateQueries({
                queryKey: ["challenges"]
              }), vr.invalidateQueries({
                queryKey: ["challengeDetails"]
              }), vr.invalidateQueries({
                queryKey: ["challengeLeaderboardPreview"]
              })
            }, 5e3))
          },
          i = ee(() => {
            switch (n.status) {
              case Re.Ongoing:
                return t("timer.end");
              case Re.Planned:
                return t("timer.start");
              default:
                return t("timer.finish_close")
            }
          }),
          o = re({
            hours: 0,
            minutes: 0,
            seconds: 0
          }),
          a = () => {
            const h = new Date(n.status === Re.Ongoing ? n.finish_at : n.start_at),
              m = new Date,
              O = h.getTime() - m.getTime(),
              b = Math.floor(O / (1e3 * 60 * 60)),
              E = Math.floor(O % (1e3 * 60 * 60) / (1e3 * 60)),
              g = Math.floor(O % (1e3 * 60) / 1e3);
            return {
              hours: b,
              minutes: E,
              seconds: g
            }
          },
          l = () => {
            if (n.status === Re.Sync || n.status === Re.Finished || n.status === Re.Cancelled) return !1;
            const h = new Date().getTime(),
              m = n.status === Re.Ongoing ? n.finish_at : n.start_at;
            return h > new Date(m).getTime()
          };
        let c = re(!1);
        const u = () => {
          const h = a();
          if ((n.status === Re.Ongoing || n.status === Re.Planned) && l()) {
            s(), c.value = !0;
            return
          }
          c.value = !1, !(h.seconds < 0) && (o.value = h)
        };
        let f = null;
        return bn(() => {
          f = setInterval(u, 1e3)
        }), vn(() => {
          f && clearInterval(f)
        }), Ce(() => [n.start_at, n.finish_at], () => {
          u(), f && clearInterval(f), f = setInterval(u, 1e3)
        }, {
          immediate: !0
        }), (h, m) => D(c) ? (Q(), He("div", Qb, [he(D(Fb), {
          width: "12",
          height: "12"
        }), Ne("div", Gb, dt(D(t)("timer.checking_status")), 1)])) : (Q(), He("div", {
          key: 1,
          class: Qn({
            "flex items-center justify-center gap-1 text-12 text-white": !0,
            "opacity-0": !h.visible,
            "opacity-100": h.visible
          })
        }, [Ne("span", null, dt(i.value), 1), h.status === D(Re).Planned || h.status === D(Re).Ongoing ? (Q(), He("p", qb, [Ne("span", null, dt(o.value.hours.toString().padStart(2, "0")), 1), m[0] || (m[0] = Ne("span", null, ":", -1)), Ne("span", null, dt(o.value.minutes.toString().padStart(2, "0")), 1), m[1] || (m[1] = Ne("span", null, ":", -1)), Ne("span", null, dt(o.value.seconds.toString().padStart(2, "0")), 1)])) : et("", !0)], 2))
      }
    }),
    zb = {
      class: "relative flex h-full w-max flex-col items-stretch justify-center p-2 pr-4 belowSMDAndPortrait:pt-2"
    },
    Xb = ie({
      __name: "ActivePopup",
      props: {
        onClick: {
          type: Function
        }
      },
      setup(e) {
        const {
          data: t
        } = _f(), {
          data: n,
          error: r,
          isLoading: s
        } = Dw(), i = ee(() => Pt.spin_limit ? Pt.spin_limit > 0 : !1), o = re(!0), a = re(null), l = ee(() => {
          var c, u, f, h, m, O, b, E, g, x, S, v;
          return (c = n.value) != null && c.hasOwnProperty("max_multiplier") ? (u = n.value) != null && u.max_multiplier ? `×${(f=n.value)==null?void 0:f.max_multiplier}` : "x0" : (h = n.value) != null && h.hasOwnProperty("bets_sum") ? (m = n.value) != null && m.bets_sum ? `${(O=n.value)==null?void 0:O.bets_sum}` : "0" : (b = n.value) != null && b.hasOwnProperty("top_multiplier_sum") ? (E = n.value) != null && E.top_multiplier_sum ? `×${(g=n.value)==null?void 0:g.top_multiplier_sum}` : "x0" : (x = n.value) != null && x.hasOwnProperty("multipliers_sum") ? (S = n.value) != null && S.multipliers_sum ? `×${(v=n.value)==null?void 0:v.multipliers_sum}` : "x0" : "-"
        });
        return Ce(() => [i.value, t.value], () => {
          i.value && t.value && t.value.status === Re.Ongoing && (a.value = setInterval(() => o.value = !o.value, 5e3)), t.value && (t.value.status === Re.Sync || t.value.status === Re.Finished || t.value.status === Re.Cancelled) && ta("id", null)
        }, {
          immediate: !0
        }), (c, u) => D(t) && D(n) ? (Q(), oe(D(xf), {
          key: 0,
          onClick: c.onClick,
          active: !0
        }, {
          default: me(() => [he(D(nv)), he(D(cv)), Ne("div", zb, [D(t).status === D(Re).Ongoing && D(n).code ? (Q(), oe(D(wv), {
            key: 0,
            rank: D(n).rank,
            result: l.value
          }, null, 8, ["rank", "result"])) : et("", !0), he(D(Yb), {
            visible: o.value,
            id: D(t).id,
            status: D(t).status,
            start_at: D(t).start_at,
            finish_at: D(t).finish_at
          }, null, 8, ["visible", "id", "status", "start_at", "finish_at"]), he(D(Jb), {
            visible: !o.value,
            error: D(r),
            isLoading: D(s)
          }, null, 8, ["visible", "error", "isLoading"])])]),
          _: 1
        }, 8, ["onClick"])) : et("", !0)
      }
    }),
    Jb = ie({
      __name: "ChallengeLimit",
      props: {
        visible: {
          type: Boolean
        },
        error: {},
        isLoading: {
          type: Boolean
        }
      },
      setup(e) {
        const {
          t
        } = xr(), n = e, r = ee(() => ea.value), s = ee(() => n.isLoading || n.error || r.value === null ? "..." : $e.isMobile ? `${r.value} ${t("limits.spinsLeft",{count:r.value})}` : `${t("limits.spinsLeft")}: ${r.value}`);
        return (i, o) => (Q(), He("div", {
          class: Qn({
            "absolute bottom-2 left-1/2 flex w-full translate-x-[-50%] justify-center pr-2 text-12 font-bold uppercase text-white-40": !0,
            "opacity-0": !i.visible,
            "opacity-100": i.visible
          })
        }, dt(s.value), 3))
      }
    }),
    Zb = {},
    ev = {
      class: "pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden before:pointer-events-none before:absolute before:left-[-75%] before:top-[-50%] before:h-[200vh] before:w-52 before:skew-x-[-45deg] before:animate-shine before:bg-gradient-to-r before:from-[#53697600] before:via-[#8499a61a] before:to-[#53697600] before:content-['']"
    };

  function tv(e, t) {
    return Q(), He("div", ev)
  }
  const nv = wf(Zb, [
      ["render", tv]
    ]),
    rv = "" + new URL("assets/plate_widget_challenge.DgnpBEAn.png", document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" && document.currentScript.src || document.baseURI).href,
    sv = ["src"],
    iv = ie({
      __name: "JoinPopup",
      props: {
        onClick: {
          type: Function
        }
      },
      setup(e) {
        return (t, n) => (Q(), oe(D(xf), {
          onClick: t.onClick,
          onPointerup: t.onClick,
          active: !1
        }, {
          default: me(() => [Ne("img", {
            src: D(rv),
            alt: "plate challenge",
            class: "box-content h-1/2 object-contain p-2.5"
          }, null, 8, sv)]),
          _: 1
        }, 8, ["onClick", "onPointerup"]))
      }
    }),
    ov = "" + new URL("assets/logo.CqIa-gSp.png", document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" && document.currentScript.src || document.baseURI).href,
    av = {
      class: "absolute -top-1.5 left-1/2 z-[1] w-max -translate-x-1/2"
    },
    lv = ["src"],
    cv = ie({
      __name: "PanelLogo",
      setup(e) {
        return (t, n) => (Q(), He("div", av, [Ne("img", {
          src: D(ov),
          alt: "plate widget logo",
          class: "h-3"
        }, null, 8, lv)]))
      }
    }),
    uv = "" + new URL("assets/logo_mobile.DwsT6cBW.png", document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" && document.currentScript.src || document.baseURI).href,
    fv = "" + new URL("assets/logo_dot.CUtgNwOJ.png", document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" && document.currentScript.src || document.baseURI).href;
  let da = "default";
  const dv = () => {
      const e = document.getElementById("plate-widget");
      e && (da = "default", e.classList.remove("dark"), da === "dark" && e.classList.add("dark"))
    },
    pv = {
      class: "h-4.5 flex items-center justify-around text-13 font-semibold text-yellow belowSMDAndPortrait:text-10 belowMDAndLandscape:text-10"
    },
    hv = {
      key: 0,
      class: "flex h-3 w-auto items-center justify-between",
      src: uv,
      alt: "Logo mobile"
    },
    gv = {
      key: 1,
      class: "mt-[2%] flex h-[5px] w-auto justify-start",
      src: fv,
      alt: "Logo dot"
    },
    mv = {
      key: 2
    },
    wv = ie({
      __name: "PlayerResult",
      props: {
        rank: {},
        result: {}
      },
      setup(e) {
        const t = ee(() => da === "dark" ? !1 : $e.isMobile);
        return (n, r) => (Q(), He("div", pv, [t.value ? (Q(), He("img", hv)) : et("", !0), t.value ? (Q(), He("img", gv)) : et("", !0), Ne("p", null, "#" + dt(n.rank || "..."), 1), D($e).isMobile ? et("", !0) : (Q(), He("p", mv, dt(n.result || "..."), 1))]))
      }
    }),
    xf = ie({
      __name: "PopupContainer",
      props: {
        active: {
          type: Boolean
        },
        onClick: {
          type: Function
        }
      },
      setup(e) {
        const t = ee(() => $e.isMobile && ($e.isPortrait || !$e.isLeftHandedUI));
        return (n, r) => (Q(), He("div", {
          class: Qn({
            "fixed top-[80%] z-[1] flex h-14 cursor-pointer items-center justify-center bg-gradient-to-b transition-all duration-300 belowSMDAndPortrait:bottom-[var(--mobile-bottom)] belowSMDAndPortrait:top-auto belowSMDAndPortrait:scale-[calc(var(--viewport-scale-x)_*_0.6)] belowMDAndLandscape:bottom-11 belowMDAndLandscape:top-auto belowMDAndLandscape:scale-75": !0,
            "w-32 bg-theme-primary pr-2.5 hover:from-button-challenge-hover-from hover:to-button-challenge-hover-to": !n.active,
            "w-fit min-w-40 bg-theme-secondary": n.active,
            "pointer-events-none opacity-60 grayscale": !D($e).isEnabled,
            "-right-2.5 origin-bottom-right rounded-l-xl hover:right-0": !t.value,
            "-left-2.5 origin-bottom-left rounded-r-xl pl-3 hover:left-0": t.value
          }),
          onClick: r[0] || (r[0] = (...s) => n.onClick && n.onClick(...s)),
          onPointerup: r[1] || (r[1] = (...s) => n.onClick && n.onClick(...s))
        }, [We(n.$slots, "default")], 34))
      }
    }),
    bv = () => {
      const e = ee(() => Pt.id || null);
      return Oo({
        queryKey: ["challenges"],
        queryFn: () => Lw(),
        enabled: !e.value,
        refetchInterval: 60 * 1e3,
        placeholderData: vo,
        staleTime: 60 * 1e3
      })
    },
    vv = ie({
      __name: "ChallengePopup",
      setup(e) {
        const {
          data: t
        } = bv(), n = re(!1), r = ee(() => Pt.id || null), s = (i = null) => {
          window.postMessage({
            name: Or.OPEN_LOBBY,
            eventType: "challenge",
            id: i
          }, "*")
        };
        return Wb(), Ce(() => [t.value, r.value], () => {
          if (t.value && !r.value) {
            n.value = !!t.value.active.length || !!t.value.planned.length || !!t.value.finished.length;
            const o = t.value.active.find(a => a.player_active && a.game_identifiers.includes(Cr.identifier)) || t.value.planned.find(a => a.player_active && a.game_identifiers.includes(Cr == null ? void 0 : Cr.identifier)) || t.value.active.find(a => a.player_active) || t.value.planned.find(a => a.player_active);
            o && ta("id", o.id)
          }
        }, {
          immediate: !0
        }), (i, o) => r.value ? (Q(), oe(D(Xb), {
          key: 0,
          onClick: o[0] || (o[0] = a => s(r.value))
        })) : n.value ? (Q(), oe(D(iv), {
          key: 1,
          onClick: o[1] || (o[1] = a => s(r.value))
        })) : et("", !0)
      }
    }),
    yv = {
      key: 0
    },
    pa = oh(ie({
      __name: "App",
      setup(e) {
        const t = ee(() => $e.isLoaded);
        return (n, r) => t.value ? (Q(), He("div", yv, [he(D(vv)), he(Kb)])) : et("", !0)
      }
    }));
  pa.use(Nh, {
    queryClient: vr
  }), pa.use(qo);
  let Es = document.getElementById("plate-widget");
  Es || (Es = document.createElement("div"), Es.id = "plate-widget", document.body.appendChild(Es)), dv(), pa.mount(Es), Mw(), console.log("%cGrowth Challenges > App Version: ch-2.0.13", "border: 1px solid #21E221; padding: 4px 8px; font-weight: 600"), console.log("%cGrowth Challenges > Git Branch/Git Commit: HEAD 84ca17f v2.0.13", "border: 1px solid #21E221; padding: 4px 8px; font-weight: 600"), console.log("%cGrowth Challenges > Build mode: production", "border: 1px solid #21E221; padding: 4px 8px; font-weight: 600")
})();
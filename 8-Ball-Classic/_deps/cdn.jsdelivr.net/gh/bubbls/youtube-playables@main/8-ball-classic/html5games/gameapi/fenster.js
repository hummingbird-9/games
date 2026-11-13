if (typeof window !== "undefined" && typeof fenster === "undefined" && typeof window.fenster === "undefined") {

	!(function(a, b) {
		const fenster = (
		    function() {

		    	const VERSION = "1.0.1";
		    	const CANVAS_ID = null;
		        let isDebug = false;

		        try{
		        	const searchParams = new URL(window.location.href).searchParams;
		        	isDebug = ["1", "true"].includes(searchParams.get("debug"));
		        } catch(e) {
		        }

		        isDebug && console.log("fenster...");

		        let offsets = {
		        	top: 0,
		        	right: 0,
		        	bottom: 0,
		        	left: 0
		        };

		        let innerWidth = window.innerWidth;
		        let innerHeight = window.innerHeight;

		        let interval = null;
		        let fnResize = null;

		        function subscribeToOffsetUpdates(_fnResize) {
		            fnResize = _fnResize;
		        };

		        function init() {
		            isDebug && console.log("init 'fenster'...");
		            update();
		        };

		        function update() {

		            isDebug && console.log(
		                "[offsets] top: %s, right: %s, bottom: %s, left: %s",
						offsets.top,
						offsets.right,
						offsets.bottom,
						offsets.left
		            );

		            innerWidth = window.innerWidth - offsets.left - offsets.right;
		            innerHeight = window.innerHeight - offsets.top - offsets.bottom;

		            isDebug && console.log("[offsets] innerWidth: %s, innerHeight: %s",
		                innerWidth,
		                innerHeight
		            );

		            if(typeof fnResize === "function") {
		                fnResize();
		            }

		            setTimeout(() => {
		            	let canvas = getCanvas();
		            	if(canvas) {
		            		canvas.style.marginLeft = offsets.left + "px";
		            		canvas.style.marginTop = offsets.top + "px";
		            	}
		            }, 50);
		        };

		        function set(top = 0, right = 0, bottom = 0, left = 0) {
		        	if(typeof top === "object") {
		        	    offsets.top = parseInt(top.top) || 0;
		        	    offsets.right = parseInt(top.right) || 0;
		        	    offsets.bottom = parseInt(top.bottom) || 0;
		        	    offsets.left = parseInt(top.left) || 0;
		        	    autoUpdate = !!top.autoUpdate;
		        	} else {
		        	    offsets.top = parseInt(top);
		        	    offsets.right = parseInt(right);
		        	    offsets.bottom = parseInt(bottom);
		        	    offsets.left = parseInt(left);
		        	}
		        	update();
		        };

		        function getCanvas() {
		        	return CANVAS_ID ? document.getElementById(CANVAS_ID) : document.getElementsByTagName("canvas")[0];
		        };

		        function get() {
		        	return offsets;
		        };

		        addEventListener("resize", (event) => {
		            update();
		        });

		        init();

		        return {
		            get innerHeight() {
		                return innerHeight;
		            },
		            get innerWidth() {
		                return innerWidth;
		            },
		            update: update,
		            subscribeToOffsetUpdates: subscribeToOffsetUpdates,
		            set: set,
		            get: get
		        };
		    }
		)();

		b[a] = fenster;
	})("fenster", window);
}
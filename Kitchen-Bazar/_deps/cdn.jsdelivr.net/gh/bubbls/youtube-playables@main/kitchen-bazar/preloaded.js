var images_data;
var images_array = [];

var images_data_loading;
var images_array_loading = [];

function parse_images(item) {
    images_array[item.name.replace(/\\/g,'/')] = item.data;
}

function parse_images_loading(item) {
    images_array_loading[item.name] = item.data;
}

var freload_images_state = 0;
var freload_spriter_images_state = 0;

var xhttp = new XMLHttpRequest();
xhttp.onload = function() {
	if (this.readyState === 4) 
	{
		
		if (this.status === 200) {
			try
			{
				images_data = JSON.parse(this.response);
				images_data.forEach(parse_images);
				update_preload_state();
				// xhttp2.open("GET", "images2.json", true);
				// xhttp2.send();
					
				
			}catch(e)
			{
				
			}
		} else {
			
		}
    }
	
};


var xhttp2 = new XMLHttpRequest();
xhttp2.onload = function() {
	if (this.readyState === 4) 
	{
		
		if (this.status === 200) {
			try
			{
				images_data = JSON.parse(this.response);
				images_data.forEach(parse_images);
				update_preload_state();
				xhttp3.open("GET", "images3.json", true);
				xhttp3.send();
					
				xhttp4.open("GET", "images4.json", true);
				xhttp4.send();
			}catch(e)
			{
				
			}
		} else {
			
		}
    }
	
};



var xhttp3 = new XMLHttpRequest();
xhttp3.onload = function() {
	if (this.readyState === 4) 
	{
		
		if (this.status === 200) {
			try
			{
				images_data = JSON.parse(this.response);
				images_data.forEach(parse_images);
				update_preload_state();
				// xhttp4.open("GET", "images4.json", true);
				// xhttp4.send();
			}catch(e)
			{
				
			}
		} else {
			
		}
    }
	
};



var xhttp4 = new XMLHttpRequest();
xhttp4.onload = function() {
	if (this.readyState === 4) 
	{
		
		if (this.status === 200) {
			try
			{
				images_data = JSON.parse(this.response);
				images_data.forEach(parse_images);
				update_preload_state();
			}catch(e)
			{
			}
		} else {
			
		}
    }
	
	
};

update_preload_state = function () 
{
	n_preload++;
	if (n_preload >= MAX_PRELOAD)
	{
		freload_images_state = 1;
		window.dispatchEvent(new Event('preLoadedData'));
		downImgSpriter(0, null);
	}
}

var xhttp_spriter = new XMLHttpRequest();
var spriter_callback = null;
xhttp_spriter.onload = function() {
	if (this.readyState === 4) 
	{
		
		if (this.status === 200) {
			try
			{
				images_data = JSON.parse(this.response);
				images_data.forEach(parse_images);
				if (spriter_callback) {
					spriter_callback()
				}				
			}catch(e)
			{
			}
		} else {
			
		}
    }
};

downImgSpriter = function (param, callback) {
	console.log('downImgSpriter state: ' + freload_spriter_images_state + '. param: ' + param)
	spriter_callback = callback
	freload_spriter_images_state++
	if (freload_spriter_images_state == 1) { // 1st load to Action Phase		
		xhttp_spriter.open("GET", "images_spriter1.json", true);
		xhttp_spriter.send();
	}
	else if (freload_spriter_images_state == 2){
		xhttp_spriter.open("GET", "images_spriter2.json", true);
		xhttp_spriter.send();
	}
}

Image = (function(org) {
    return function() {
        var result = new org;
        Object.defineProperty(result, 'src', {
            set: function(srcAttr) {
                result.setAttribute('_src', srcAttr);
                // console.log(srcAttr);
                if (images_array[srcAttr] != null) {
                    result.setAttribute('src', 'data:image/png;base64,' + images_array[srcAttr]);
                } else if (images_array_loading[srcAttr] != null){
					//console.log("000000000000 loading pack");
					result.setAttribute('src', 'data:image/png;base64,' + images_array_loading[srcAttr]);
				}else {
                    result.setAttribute('src', srcAttr);
                }
            },
            get: function() {
                return result.getAttribute('_src');
            }
        });
        return result;
    };
}(Image));


xhttp.open("GET", "images1.json", true);
xhttp.send();



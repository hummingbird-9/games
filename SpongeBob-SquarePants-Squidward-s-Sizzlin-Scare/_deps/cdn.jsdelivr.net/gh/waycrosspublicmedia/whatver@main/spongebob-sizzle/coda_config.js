try{
	var qs = btg.String.queryStringToObject(location.href);

	if(typeof qs != "undefined") btg.config.Omniture.visitorID = qs.vid;
	
	btg.Controller.init();

	var tmp=location.pathname.split("/");
	
	var gamename = (tmp.length>1)?tmp[tmp.length-1].substring(0,tmp[tmp.length-1].indexOf(".")):tmp;

	gamename = (location.pathname.indexOf('nickjr.app/activities')>0)? location.pathname.substring(location.pathname.indexOf('/ios-activity')+1,location.pathname.indexOf('/index.html')):gamename;

	var getQSValue = function(key) {
		var regex, qs;

		key   = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
		qs    = regex.exec(window.location.href);

		return qs ? qs[1] : "us";
	}

	var executePageCall = function (){
				
		var region = getQSValue('region');
		region = (region.indexOf('_')>-1) ? region.substring(region.indexOf('_')+1): region; 
		var oAccount,oRegion,channel,prop1,showId; 
		var pageObj = {};

		oAccount = "nickvia";
		channel = "Games";

		//check region to override account
		if(typeof qs.apiKey!="undefined"&&qs.apiKey.length>0){

			if (typeof qs.site!='undefined') {

				if (qs.site=='nickjriosapp') {

					if (region.toLowerCase() == 'us')
						oAccount = 'vianickjriosapp';
					else
						oAccount = "vianickjriosintlapp";
				};
			}else{
				if (region.toLowerCase() == 'us')
					oAccount = 'vianickiosapp';
				else
					oAccount = "vianickiosintlapp";
			}

		}else if(btg.config.Omniture.visitorID){
			if(region.toLowerCase() != 'us')
				oAccount = 'vianickiosintlapp';
		}else if(typeof ESI != "undefined"){
			if(ESI.isMobile=="true"){
				oAccount +=",vianickelodeonmobi";
				prop1 = "m.nick.com";
			}else if(ESI.isTablet=="true"||ESI.isKindleFire=="true"){
				prop1 = "t.nick.com";
			}else if(qs.view){
				//was supposed to be for android game webview but coda throws error and will not work
			}else
			{
				prop1 = "Nick.com Proper";
			}
		}

		if(location.hostname.indexOf("addictinggames")>-1){
			oAccount="viaaddictinggames";
			channel="m.addictinggames.com";
			gamename=(tmp.length>2)?tmp[tmp.length-2]:tmp;
			gamename="game:"+gamename;

			pageObj = {
				pageName:gamename,
				hier1:gamename,
				channel:channel,
				eVar13:  gamename,
				eVar23: location.pathname,
				events: "event1,event31,event18,event16"
			};
		}else if(qs.site&&qs.site=="ag"){
			oAccount="viaaddictinggames";
			channel="m.addictinggames.com";
			gamename="game:"+gamename;

			pageObj = {
				pageName:gamename,
				hier1:gamename,
				channel:channel,
				eVar13:  gamename,
				eVar23: location.pathname,
				events: "event1,event31,event18,event16"
			};
		}else{
			showId = (typeof fccRelatedShow!="undefined") ? fccRelatedShow : "";

			var pname = location.pathname;

			if (qs.site=='nickjriosapp')pname = (location.pathname.indexOf('nickjr.app/activities')>0)? location.pathname.substring(location.pathname.indexOf('/ios-activity')):pname;

			pageObj = {
				pageName:pname,
				hier1:pname,
				hier2:pname,
				channel: channel,
				eVar17: "game",
				eVar24: region, 
				prop17: "game",
				prop24: region,
				prop4:  gamename,
				eVar16: pname,
				prop11: showId,
				eVar11: showId,
				events: "event14,event16",
				prop1: prop1,
				eVar1: prop1
			};
		}	
		//if there is an account override
		if(typeof oAccount != "undefined"){
			pageObj.account = oAccount;
		}
		
		//make pagecall
		btg.Controller.sendPageCall(pageObj);
	}
	executePageCall();
}catch(e){}	
	
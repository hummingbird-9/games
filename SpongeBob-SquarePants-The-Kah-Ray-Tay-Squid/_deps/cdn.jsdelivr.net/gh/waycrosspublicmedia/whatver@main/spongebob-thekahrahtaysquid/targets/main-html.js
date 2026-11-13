(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: Hash
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: IntHash
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(js.Boot.isClass(f) || js.Boot.isEnum(f));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !js.Boot.isClass(cl)) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !js.Boot.isEnum(e)) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js.Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(js.Boot.isClass(v) || js.Boot.isEnum(v)) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumConstructor = function(e) {
	return e[0];
}
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.add("<");
			s.add(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.add(" ");
				s.add(k);
				s.add("=\"");
				s.add(this._attributes.get(k));
				s.add("\"");
			}
			if(this._children.length == 0) {
				s.add("/>");
				return s.toString();
			}
			s.add(">");
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.add(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.add("</");
			s.add(this._nodeName);
			s.add(">");
		}
		return s.toString();
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
var com = {}
com.nick = {}
com.nick.spongebob = {}
com.nick.spongebob.chopping_block = {}
com.nick.spongebob.chopping_block.DocumentApp = function() { }
$hxClasses["com.nick.spongebob.chopping_block.DocumentApp"] = com.nick.spongebob.chopping_block.DocumentApp;
com.nick.spongebob.chopping_block.DocumentApp.__name__ = ["com","nick","spongebob","chopping_block","DocumentApp"];
com.nick.spongebob.chopping_block.DocumentApp.main = function() {
	flambe.System.init();
	com.nick.spongebob.chopping_block.DocumentApp._fillEntity = new flambe.Entity();
	com.nick.spongebob.chopping_block.DocumentApp._fillSprite = new flambe.display.FillSprite(0,960,560);
	com.nick.spongebob.chopping_block.DocumentApp._fillEntity.add(com.nick.spongebob.chopping_block.DocumentApp._fillSprite);
	flambe.System.root.addChild(com.nick.spongebob.chopping_block.DocumentApp._fillEntity);
	var doc = js.Lib["eval"]("document");
	if(doc.getElementById("embedtarget") != null && doc.getElementById("embedtarget").getAttribute("base") != null) com.workinman.utils.WorkinCloud.instance.getAssets()._setBaseUrl(com.nick.spongebob.chopping_block.DocumentApp.trimUrl(doc.getElementById("embedtarget").getAttribute("base"))); else com.workinman.utils.WorkinCloud.instance.log("[DocumentApp](base) : No base detected.");
	com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED,com.nick.spongebob.chopping_block.DocumentApp._onBootstrapLoad);
	com.workinman.utils.WorkinCloud.instance.getAssets().addPackDef("bootstrap");
	com.workinman.utils.WorkinCloud.instance.getAssets().loadPack("bootstrap");
}
com.nick.spongebob.chopping_block.DocumentApp._onBootstrapLoad = function(pEvent) {
	com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED,com.nick.spongebob.chopping_block.DocumentApp._onBootstrapLoad);
	com.nick.spongebob.chopping_block.DocumentApp._initServices();
	haxe.Timer.delay(com.nick.spongebob.chopping_block.DocumentApp._initMain,800);
}
com.nick.spongebob.chopping_block.DocumentApp._initMain = function() {
	com.nick.spongebob.chopping_block.DocumentApp._main = new com.nick.spongebob.chopping_block.Main();
}
com.nick.spongebob.chopping_block.DocumentApp._initServices = function() {
	var tFast = com.workinman.utils.WorkinCloud.instance.getAssets().getXML(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CONFIG_XML_PATH);
	var $it0 = tFast.node.resolve("services").nodes.resolve("service").iterator();
	while( $it0.hasNext() ) {
		var serviceNode = $it0.next();
		switch(serviceNode.att.resolve("type").toString()) {
		case "analytics":
			if(serviceNode.att.resolve("enabled").toString() == "true") {
				com.workinman.utils.WorkinCloud.instance.log("[DocumentApp](_initServices) initAnalytics");
				com.workinman.services.ServiceAnalytics.init(serviceNode.att.resolve("id").toString());
			}
			break;
		}
	}
}
com.nick.spongebob.chopping_block.DocumentApp.trimUrl = function(url) {
	if(url == "") return "";
	if(url.indexOf("http") < 0) {
		if(url.charAt(0) == "/") url = HxOverrides.substr(url,1,url.length - 1);
		return url;
	}
	var tStartIndex = url.indexOf("http://");
	if(tStartIndex < 0) {
		tStartIndex = url.indexOf("https://");
		if(tStartIndex < 0) tStartIndex = 0; else tStartIndex += 8;
	} else tStartIndex += 7;
	var tEndIndex = url.indexOf("/",tStartIndex);
	var result = HxOverrides.substr(url,tEndIndex,url.length - tEndIndex);
	if(result.indexOf("assets") < 0) result = result + "assets/";
	return result;
}
com.nick.spongebob.chopping_block.Main = function() {
	com.workinman.utils.WorkinCloud.instance.log("[Main] Constructed");
	this._flagFirstInput = true;
	this._timeline = flambe.System.root;
	flambe.System.uncaughtError.connect($bind(this,this.errorHandler));
	com.workinman.utils.WorkinCloud.instance.getInput().prime();
	this._layerWorld = new flambe.Entity();
	this._layerUI = new flambe.Entity();
	this._scaleSprite = new flambe.display.Sprite();
	this._timeline.add(this._scaleSprite);
	this._timeline.addChild(this._layerWorld);
	this._timeline.addChild(this._layerUI);
	this._isWorldActive = false;
	this._isUIActive = false;
	this._isListeningForLoading = false;
	this._flagWebAudioUnlocked = false;
	this._flagNewGame = true;
	this._document = { canvasScale : 1};
	this._document = js.Lib["eval"]("document");
	com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MOUSE_PRESSED,false);
	com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MAX_COMBO,false);
	this._flowstack = new Array();
	this._beginEngine();
	this._addEventListeners();
};
$hxClasses["com.nick.spongebob.chopping_block.Main"] = com.nick.spongebob.chopping_block.Main;
com.nick.spongebob.chopping_block.Main.__name__ = ["com","nick","spongebob","chopping_block","Main"];
com.nick.spongebob.chopping_block.Main.prototype = {
	_worldDestroy: function() {
		if(!this._isWorldActive) return;
		console.log("[Main](_destroyWorld)");
		this._isWorldActive = false;
		this._world.dispose();
		this._world = null;
	}
	,_generateWorld: function() {
		if(this._isWorldActive) this._worldDestroy();
		console.log("[Main](_generateWorld)");
		this._isWorldActive = true;
		this._world = new com.nick.spongebob.chopping_block.world.World(this._layerWorld,this._flagNewGame);
	}
	,_handleWebAudioUnlock: function() {
		if(this._flagWebAudioUnlocked) return;
		this._flagWebAudioUnlocked = true;
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("audio/silent");
	}
	,_onEventInput: function(pEvent) {
		if(this._document && this._document.canvasScale) {
			pEvent.x /= this._document.canvasScale;
			pEvent.y /= this._document.canvasScale;
		}
		this._handleWebAudioUnlock();
		if(this._ui.handleInput(pEvent) && this._isWorldActive) this._world.handleInput(pEvent);
	}
	,_generateUI: function() {
		this._isUIActive = true;
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_LOADING,com.nick.spongebob.chopping_block.ui.screens.ScreenLoading,"ui/localization_loading.jpg");
		if(com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID) != "en") this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_SPLASH,com.nick.spongebob.chopping_block.ui.screens.ScreenSplash,"ui/sb_squid_defense_splash_03_local.jpg"); else this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_SPLASH,com.nick.spongebob.chopping_block.ui.screens.ScreenSplash,"ui/sb_squid_defense_splash_02.jpg");
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD,com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD,"ui/AssetScreenGameplayHud.png");
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU,com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu,"ui/pause_menu.png");
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_HELP,com.nick.spongebob.chopping_block.ui.screens.ScreenHelp,"ui/howtoplay_screen.jpg");
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM,com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm,"ui/quit_prompt.png");
		this._ui.addScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_END_GAME,com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame,"ui/gameover_screen.jpg");
	}
	,_enableInput: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.events.WMEventInput.EVENT_INPUT,$bind(this,this._onEventInput));
	}
	,_addEventListeners: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.events.WMEventUpdate.EVENT_UPDATE,$bind(this,this._onEventUpdate));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_MUTE_TOGGLE,$bind(this,this._onMuteToggle));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.events.WMEventFlow.EVENT_FLOW,$bind(this,this._onFlowEvent));
	}
	,_runFlowStack: function() {
		if(this._flowstack.length == 0) return;
		while(this._flowstack.length > 0) {
			this._executeFlowStack(this._flowstack[0]);
			this._flowstack.shift();
		}
	}
	,_addFlowEvent: function(pId) {
		this._flowstack.push(pId);
	}
	,_onFlowEvent: function(pEvent) {
		this._addFlowEvent(pEvent.flowId);
	}
	,_onMuteToggle: function(pEvent) {
		com.workinman.utils.WorkinCloud.instance.setValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED,!com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED));
		com.workinman.utils.WorkinCloud.instance._getSound().setMute(com.workinman.utils.WorkinCloud.instance.getValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED));
	}
	,_onEventUpdate: function(pEvent) {
		if(this._document.canvasScale && this._document.canvasScale != this._scaleSprite.scaleX.get__()) this._scaleSprite.scaleX.set__(this._scaleSprite.scaleY.set__(this._document.canvasScale));
		if(this._isUIActive) this._ui.update(pEvent.getDt());
		if(this._isWorldActive) {
			this._world.update(pEvent.getDt());
			this._world.render();
		}
		com.workinman.utils.WorkinCloud.instance._getSound().update(pEvent.getDt());
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_LOSE)) this._onFlowEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE)); else if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_WIN)) this._onFlowEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_WIN)); else if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_LOSE)) this._onFlowEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE)); else if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_WIN)) this._onFlowEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN));
		this._runFlowStack();
	}
	,_resetFlagsResults: function() {
		com.workinman.utils.WorkinCloud.instance.resetValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_LOSE);
		com.workinman.utils.WorkinCloud.instance.resetValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_WIN);
		com.workinman.utils.WorkinCloud.instance.resetValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_LOSE);
		com.workinman.utils.WorkinCloud.instance.resetValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_WIN);
	}
	,_unpauseGameplay: function() {
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED,false);
	}
	,_pauseGameplay: function() {
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED,true);
	}
	,_onGameNew: function() {
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE,0);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH,3);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,0);
		com.workinman.utils.WorkinCloud.instance.setInteger(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL,1);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,5);
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE,false);
		this._resetFlagsResults();
	}
	,_gotoEndGame: function(pWin,pFromSummary) {
		if(pFromSummary == null) pFromSummary = false;
		this._flagWonPreviousGame = pWin;
		if(!pFromSummary) {
			this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_END_GAME);
			com.workinman.services.ServiceAnalytics.sendMilestone("custom7");
		} else {
			this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD);
			this._unpauseGameplay();
			this._onGameNew();
			this._gotoAndPlayGame();
		}
	}
	,_gotoSplash: function() {
		this._enableInput();
		this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_SPLASH,false);
		com.workinman.services.ServiceAnalytics.sendMilestone("custom2");
	}
	,_gotoAndPlayGame: function() {
		if(!this._loadChunks(["gameplay"],$bind(this,this._eventLoadCompleteGameplay),800)) return;
		this._generateWorld();
		this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD,false);
		com.workinman.services.ServiceAnalytics.sendMilestone("custom6");
	}
	,_executeFlowStack: function(pId) {
		switch(pId) {
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_SPLASH_PLAY:
			this._gotoAndPlayGame();
			com.workinman.utils.WorkinCloud.instance._getSound().playMusic("karate_squid_music");
			this._flagNewGame = false;
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU:
			this._pauseGameplay();
			this._ui.openScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU,false);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE:
			this._unpauseGameplay();
			this._ui.closeScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP:
			this._ui.openScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_HELP,false);
			com.workinman.services.ServiceAnalytics.sendMilestone("custom3");
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_HELP_CLOSE:
			this._ui.closeScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_HELP);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT:
			this._ui.openScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM,false);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES:
			this._resetFlagsResults();
			this._gotoEndGame(false);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO:
			this._ui.closeScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE:
			this._pauseGameplay();
			this._resetFlagsResults();
			this._gotoEndGame(false);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN:
			this._gotoEndGame(this._flagWonPreviousGame,true);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_SPLASH_PRINTABLE:
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_LEVEL:
			this._gotoAndPlayGame();
			this._flagNewGame = false;
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION:
			this._ui.closeScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD);
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION_DONE:
			this._ui.openScreen(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD);
			break;
		default:
		}
	}
	,errorHandler: function(e) {
		com.workinman.utils.WorkinCloud.instance.log("Error:" + e);
	}
	,_registerInput: function() {
		com.workinman.utils.WorkinCloud.instance.getInput().registerInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_SPACE,[flambe.input.Key.Space]);
		com.workinman.utils.WorkinCloud.instance.getInput().registerInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_LEFT,[flambe.input.Key.Left,flambe.input.Key.A]);
		com.workinman.utils.WorkinCloud.instance.getInput().registerInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_RIGHT,[flambe.input.Key.Right,flambe.input.Key.D]);
		com.workinman.utils.WorkinCloud.instance.getInput().registerInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_UP,[flambe.input.Key.Up,flambe.input.Key.W]);
		com.workinman.utils.WorkinCloud.instance.getInput().registerInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_DOWN,[flambe.input.Key.Down,flambe.input.Key.S]);
	}
	,_eventLoadCompleteInitial: function(pEvent) {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED,this._loadCallbackMethod);
		haxe.Timer.delay($bind(this,this._gotoSplash),800);
	}
	,_eventLoadCompleteGameplay: function(pEvent) {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED,this._loadCallbackMethod);
		haxe.Timer.delay($bind(this,this._gotoAndPlayGame),800);
	}
	,_loadChunksDelayCallback: function() {
		this._loadChunks(this._loadChunksCurrent,this._loadCallbackMethod,0);
	}
	,_loadChunks: function(inChunks,inCallbackMethod,inDelay) {
		if(inDelay == null) inDelay = 0;
		var i = 0;
		var tAllLoaded = true;
		while(i < inChunks.length) {
			if(!com.workinman.utils.WorkinCloud.instance.getAssets().isChunkLoaded(inChunks[i])) tAllLoaded = false;
			i++;
		}
		if(tAllLoaded) return true;
		this._loadChunksCurrent = inChunks;
		this._loadCallbackMethod = inCallbackMethod;
		if(inDelay > 0) {
			haxe.Timer.delay($bind(this,this._loadChunksDelayCallback),inDelay);
			this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_LOADING,false);
			return false;
		}
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED,this._loadCallbackMethod);
		i = 0;
		while(i < inChunks.length) {
			if(!com.workinman.utils.WorkinCloud.instance.getAssets().isChunkLoaded(inChunks[i])) com.workinman.utils.WorkinCloud.instance.getAssets().loadChunk(inChunks[i]);
			i++;
		}
		this._ui.changeScreenTo(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_LOADING,false);
		return false;
	}
	,_beginInitialLoad: function() {
		this._loadChunks(["initial"],$bind(this,this._eventLoadCompleteInitial),800);
		com.workinman.utils.WorkinCloud.instance.getAssets().loadFolder("fonts_" + com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID));
	}
	,_parseConfigXML: function() {
		com.workinman.utils.WorkinCloud.instance.log("[Main](_parseConfigXML) Parse Config XML: " + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CONFIG_XML_PATH);
		var tFast = com.workinman.utils.WorkinCloud.instance.getAssets().getXML(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CONFIG_XML_PATH);
		var $it0 = tFast.node.resolve("packs").nodes.resolve("pack").iterator();
		while( $it0.hasNext() ) {
			var packNode = $it0.next();
			var tFlump = new Array();
			var $it1 = packNode.nodes.resolve("flump").iterator();
			while( $it1.hasNext() ) {
				var flumpNode = $it1.next();
				tFlump.push(flumpNode.att.resolve("id").toString());
			}
			var tTiles = new Array();
			var $it2 = packNode.nodes.resolve("tiles").iterator();
			while( $it2.hasNext() ) {
				var tileNode = $it2.next();
				tTiles.push(tileNode.att.resolve("id").toString());
			}
			com.workinman.utils.WorkinCloud.instance.getAssets().addPackDef(packNode.att.resolve("id").toString(),tFlump,tTiles);
			tFlump = null;
			tTiles = null;
		}
		var $it3 = tFast.node.resolve("chunks").nodes.resolve("chunk").iterator();
		while( $it3.hasNext() ) {
			var iChunk = $it3.next();
			com.workinman.utils.WorkinCloud.instance.getAssets().addChunk(iChunk.att.resolve("id").toString(),iChunk);
		}
		com.workinman.utils.WorkinCloud.instance.setString(com.workinman.data.ConstantsCloud.STRING_REGION_ID,Std.string(tFast.node.resolve("localization").node.resolve("region").getInnerData()));
		com.workinman.utils.WorkinCloud.instance.log("[Main] Localization : Set Region: " + com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID));
	}
	,_beginEngine: function() {
		com.workinman.utils.WorkinCloud.instance.log("[Main](_beginEngine)");
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_CANVAS_SCALE,1);
		com.workinman.utils.WorkinCloud.instance.setDefault(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED,0);
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED,false);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH,3);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE,0);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,0);
		com.workinman.utils.WorkinCloud.instance.setInteger(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL,1);
		com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,5);
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE,false);
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_COMPLETE,false);
		com.workinman.utils.WorkinCloud.instance._getSound().setMute(false);
		this._ui = new com.nick.spongebob.chopping_block.ui.ScreenManager(this._layerUI);
		this._timeline.add(new com.workinman.components.Updater());
		this._parseConfigXML();
		this._registerInput();
		this._generateUI();
		this._beginInitialLoad();
	}
	,__class__: com.nick.spongebob.chopping_block.Main
}
com.nick.spongebob.chopping_block.data = {}
com.nick.spongebob.chopping_block.data.constants = {}
com.nick.spongebob.chopping_block.data.constants.ConstantsApp = function() { }
$hxClasses["com.nick.spongebob.chopping_block.data.constants.ConstantsApp"] = com.nick.spongebob.chopping_block.data.constants.ConstantsApp;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.__name__ = ["com","nick","spongebob","chopping_block","data","constants","ConstantsApp"];
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen = function() { }
$hxClasses["com.nick.spongebob.chopping_block.data.constants.ConstantsScreen"] = com.nick.spongebob.chopping_block.data.constants.ConstantsScreen;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.__name__ = ["com","nick","spongebob","chopping_block","data","constants","ConstantsScreen"];
com.workinman = {}
com.workinman.utils = {}
com.workinman.utils.WMEventDispatcher = function() {
	this._signals = new Hash();
};
$hxClasses["com.workinman.utils.WMEventDispatcher"] = com.workinman.utils.WMEventDispatcher;
com.workinman.utils.WMEventDispatcher.__name__ = ["com","workinman","utils","WMEventDispatcher"];
com.workinman.utils.WMEventDispatcher.prototype = {
	dispose: function() {
		var $it0 = this._signals.iterator();
		while( $it0.hasNext() ) {
			var s = $it0.next();
			s.dispose();
		}
		this._signals = null;
	}
	,dispatchEvent: function(pEvent) {
		if(!this._signals.exists(pEvent.getEventId())) return;
		this._signals.get(pEvent.getEventId()).dispatchEvent(pEvent);
	}
	,removeEventListener: function(pEventId,pListener) {
		if(!this._signals.exists(pEventId)) {
			console.log("[WMEventDispatcher](removeEventListener) " + pEventId + " doesn't exist!");
			return;
		}
		this._signals.get(pEventId).removeEventListener(pListener);
		if(this._signals.get(pEventId).isEmtpy()) {
			this._signals.get(pEventId).dispose();
			this._signals.remove(pEventId);
		}
	}
	,addEventListener: function(pEventId,pListener) {
		if(!this._signals.exists(pEventId)) this._signals.set(pEventId,new com.workinman.utils._WMEventDispatcher.WMEventTracker());
		this._signals.get(pEventId).addEventListener(pListener);
	}
	,__class__: com.workinman.utils.WMEventDispatcher
}
com.nick.spongebob.chopping_block.ui = {}
com.nick.spongebob.chopping_block.ui.ScreenManager = function(pContainer) {
	com.workinman.utils.WMEventDispatcher.call(this);
	this._container = pContainer;
	this._layerScreen = new flambe.Entity();
	this._layerTransition = new flambe.Entity();
	this._container.addChild(this._layerScreen);
	this._container.addChild(this._layerTransition);
	this._isPaused = false;
	this._screens = new Array();
	this._screensOpen = new Array();
	this._screensQueue = new Array();
	this._transitionType = -1;
	this._flagHasTransition = false;
	this._flagCloseScreenAfterTransition = false;
	this._flagOpenScreenAfterTransition = false;
	this._flagHasScreenshot = false;
	this._flagCloseAllScreensWhenBottomCloses = false;
};
$hxClasses["com.nick.spongebob.chopping_block.ui.ScreenManager"] = com.nick.spongebob.chopping_block.ui.ScreenManager;
com.nick.spongebob.chopping_block.ui.ScreenManager.__name__ = ["com","nick","spongebob","chopping_block","ui","ScreenManager"];
com.nick.spongebob.chopping_block.ui.ScreenManager.__super__ = com.workinman.utils.WMEventDispatcher;
com.nick.spongebob.chopping_block.ui.ScreenManager.prototype = $extend(com.workinman.utils.WMEventDispatcher.prototype,{
	_transitionPlay: function() {
		this._transition.show();
		this._transition.start();
	}
	,_removeTransition: function() {
		if(!this._flagHasTransition) return;
		this._layerTransition.removeChild(this._transition._getEntity());
		this._transition._getDispatcher().removeEventListener(com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT,$bind(this,this._onEventTransitionOutput));
		this._transition.dispose();
		this._transition = null;
		this._flagHasTransition = false;
	}
	,_addTransition: function(pAssetId,pKillExistingTransition) {
		if(pKillExistingTransition == null) pKillExistingTransition = true;
		if(this._flagHasTransition) {
			if(!pKillExistingTransition) return;
			this._removeTransition();
		}
		this._transition = new com.nick.spongebob.chopping_block.ui.transitions.TransitionBase(pAssetId);
		this._transition.hide();
		this._transition._getDispatcher().addEventListener(com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT,$bind(this,this._onEventTransitionOutput));
		this._layerTransition.addChild(this._transition._getEntity());
		this._flagHasTransition = true;
	}
	,_updateTransition: function(dt) {
		switch(this._transitionType) {
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCROLL:
			var _g = this._transitionScreenHeadedOut._getDisplay().x;
			_g.set__(_g.get__() - 2000 * dt);
			var _g = this._transitionScreenHeadedIn._getDisplay().x;
			_g.set__(_g.get__() - 2000 * dt);
			if(this._transitionScreenHeadedIn._getDisplay().x.get__() <= 0) {
				this._transitionScreenHeadedIn._getDisplay().x.set__(0);
				this._flagHasTransition = false;
				this._onQueueConditionMet(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE);
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_FADE:
			this._transition.update(dt);
			if(this._transition.flagDispose) this._removeTransition();
			break;
		}
	}
	,_removeScreenDisplay: function(pDisplay) {
		this._layerScreen.removeChild(pDisplay);
	}
	,_addScreenDisplay: function(pDisplay) {
		this._layerScreen.addChild(pDisplay);
	}
	,_dispatchEventChange: function(pChangeId,pScreenId) {
		this.dispatchEvent(new com.workinman.events.WMEventInterfaceChange(pChangeId,pScreenId));
	}
	,_onQueueConditionMet: function(pCondition,pConditionString) {
		if(pConditionString == null) pConditionString = "";
		var i = 0;
		while(i < this._screensQueue.length) {
			if(this._screensQueue[i].validateCondition(pCondition,pConditionString)) {
				this._generateScreen(this._screensQueue[i].screenData);
				this._screensQueue.splice(i,1);
			}
			i++;
		}
	}
	,dispose: function() {
		var i = 0;
		while(i < this._screensOpen.length) {
			this._disposeScreen(this._screensOpen[i].id);
			i++;
		}
		this._screensQueue = null;
		this._screens = null;
		this._removeTransition();
		this._container.removeChild(this._layerScreen);
		this._container.removeChild(this._layerTransition);
		this._layerScreen = null;
		this._layerTransition = null;
		com.workinman.utils.WMEventDispatcher.prototype.dispose.call(this);
	}
	,_getScreenData: function(pId) {
		var i = this._screens.length - 1;
		while(i >= 0) {
			if(this._screens[i].id == pId) return this._screens[i];
			i--;
		}
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_getScreenData) ERROR: Screen >" + pId + "< idoes not exist. getScreenData() returning NULL.");
		return null;
	}
	,_hasScreenData: function(pId) {
		var i = this._screens.length - 1;
		while(i >= 0) {
			if(this._screens[i].id == pId) return true;
			i--;
		}
		return false;
	}
	,_removeScreenshot: function() {
		if(!this._flagHasScreenshot) return;
		this._layerScreen.removeChild(this._screenshot._getEntity());
		this._screenshot.dispose();
		this._screenshot = null;
		this._flagHasScreenshot = false;
	}
	,_addScreenshot: function() {
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_addScreenshot) ERROR: Screenshots not supported in HTML5 yet.");
		return;
		if(this._flagHasScreenshot) {
			if(this._screensOpen.length == 1) {
				com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_addScreenshot) Keep existing screenshot.");
				return;
			}
			this._removeScreenshot();
		}
		this._layerScreen.addChild(this._screenshot._getEntity());
		this._flagHasScreenshot = true;
	}
	,_onEventTransitionOutput: function(event) {
		if(event.flowId == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_OPENED) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager] Transition Midway...");
			if(this._flagCloseScreenAfterTransition) {
				this.closeScreen(this._screenIdToCloseAfterTransition,false);
				this._flagCloseScreenAfterTransition = false;
			}
			if(this._flagOpenScreenAfterTransition) {
				this.openScreen(this._screenIdToOpenDuringTransition,false);
				this._flagOpenScreenAfterTransition = false;
			}
			this._removeScreenshot();
			this._onQueueConditionMet(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY);
		} else if(event.flowId == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_CLOSED) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager] Transition Complete.");
			this._removeScreenshot();
			this._onQueueConditionMet(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE);
		}
	}
	,_onEventScreenOutput: function(event) {
		if(event.flowId == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_OPENED) this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE,event.screenId); else if(event.flowId == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_CLOSED) {
			this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_CLOSE_COMPLETE,event.screenId);
			this._onQueueConditionMet(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_CLOSED_SPECIFIC,event.screenId);
			if(this._flagHasTransition && this._transitionType == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_STAGED) this._transitionPlay();
		}
	}
	,_disposeScreen: function(pId,pIndex) {
		if(pIndex == null) pIndex = -1;
		var i = 0;
		while(i < this._screensOpen.length) {
			if(this._screensOpen[i].id == pId) {
				this._screensOpen[i]._getDispatcher().removeEventListener(com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT,$bind(this,this._onEventScreenOutput));
				this._screensOpen[i].dispose();
				this._removeScreenDisplay(this._screensOpen[i]._getEntity());
				this._screensOpen[i].disposeDisplay();
				this._screensOpen.splice(i,1);
				return;
			}
			i++;
		}
	}
	,_generateScreen: function(pData) {
		if(this.isScreenOpen(pData.id)) {
			this.getScreen(pData.id).reset();
			this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_BEGIN,pData.id);
			return;
		}
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_generateScreen) " + "com.nick.spongebob.chopping_block.ui.screens." + Std.string(pData.screenClass) + " ~~ " + Std.string(Type.resolveClass("com.nick.spongebob.chopping_block.ui.screens." + Std.string(pData.screenClass))));
		var tNewScreen = Type.createInstance(pData.screenClass,[pData.id,pData.assetClassName,pData.data]);
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_generateScreen) success");
		if(tNewScreen == null) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_generateScreen) ERROR: Screen Class for >" + pData.id + "< not found.");
			return;
		}
		this._screensOpen.push(tNewScreen);
		this._addScreenDisplay(tNewScreen._getEntity());
		if(this._flagHasTransition) {
			this._transitionScreenHeadedIn = tNewScreen;
			switch(this._transitionType) {
			case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCROLL:
				tNewScreen._getDisplay().x.set__(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH);
				break;
			}
		}
		console.log(tNewScreen);
		console.log(tNewScreen._getDispatcher());
		tNewScreen._getDispatcher().addEventListener(com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT,$bind(this,this._onEventScreenOutput));
		tNewScreen.open(true);
		this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_BEGIN,pData.id);
	}
	,_addScreenToQueue: function(pData,pOpenCondition,pConditionString) {
		if(pConditionString == null) pConditionString = "";
		if(this.hasQueuedScreen(pData.id)) return;
		this._screensQueue.push(new com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData(pData,pOpenCondition,pConditionString));
	}
	,removeAllQueuedScreens: function() {
		var i = this._screensQueue.length - 1;
		while(i >= 0) {
			this._screensQueue.splice(i,1);
			i--;
		}
	}
	,removeQueuedScreen: function(pId) {
		var i = this._screensQueue.length - 1;
		while(i >= 0) {
			if(this._screensQueue[i].screenData.id == pId) {
				this._screensQueue.splice(i,1);
				return;
			}
			i--;
		}
	}
	,hasQueuedScreen: function(pId) {
		var i = this._screensQueue.length - 1;
		while(i >= 0) {
			if(this._screensQueue[i].screenData.id == pId) return true;
			i--;
		}
		return false;
	}
	,isScreenOpen: function(pId) {
		var i = this._screensOpen.length - 1;
		while(i >= 0) {
			if(this._screensOpen[i].id == pId) return true;
			i--;
		}
		return false;
	}
	,getScreen: function(pId) {
		if(pId == null) pId = "";
		if(this._screensOpen.length == 0) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: no screens are open. Unable to getScreen()");
			return null;
		}
		if(pId == "") return this._screensOpen[this._screensOpen.length - 1];
		var i = this._screensOpen.length - 1;
		while(i >= 0) {
			if(this._screensOpen[i].id == pId) return this._screensOpen[i];
			i--;
		}
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](getScreen) ERROR: Screen >" + pId + "< is not open or does not exist. getScreen() returning NULL.");
		return null;
	}
	,update: function(dt) {
		if(this._isPaused) return;
		if(dt > .15) dt = .15;
		if(this._flagHasTransition) this._updateTransition(dt);
		this._loop = this._screensOpen.length - 1;
		while(this._loop >= 0) {
			this._screensOpen[this._loop].update(dt);
			if(this._screensOpen[this._loop].flagDispose) {
				this._disposeScreen(this._screensOpen[this._loop].id);
				if(this._screensOpen.length == 0) this._onQueueConditionMet(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_CLOSED_ALL);
			}
			this._loop--;
		}
	}
	,changeScreenTo: function(pId,pPlayOutroAnimations,pTransitionType,pTransitionAssetId) {
		if(pTransitionAssetId == null) pTransitionAssetId = "";
		if(pTransitionType == null) pTransitionType = -1;
		if(pPlayOutroAnimations == null) pPlayOutroAnimations = false;
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](changeTo) " + pId);
		this.removeAllQueuedScreens();
		var i;
		if(this.isScreenOpen(pId)) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](changeTo) Screen is already open.");
			i = this._screensOpen.length - 1;
			while(i >= 0) {
				if(this._screensOpen[i].id != pId) this.closeScreen(this._screensOpen[i].id,false,i);
				i--;
			}
			this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_BEGIN,pId);
			this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE,pId);
			return;
		}
		this._flagCloseScreenAfterTransition = false;
		this._flagOpenScreenAfterTransition = false;
		if(this._screensOpen.length > 0) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](changeFrom) " + this._screensOpen[0].id);
			var tOpenCondition = com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_CLOSED_ALL;
			if(pTransitionType > -1) {
				this._transitionType = pTransitionType;
				switch(this._transitionType) {
				case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCREENSHOT:
					this._flagOpenScreenAfterTransition = true;
					pPlayOutroAnimations = false;
					this._addScreenshot();
					this._transitionPlay();
					break;
				case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCROLL:
					this._flagHasTransition = true;
					this._flagOpenScreenAfterTransition = false;
					this._flagCloseScreenAfterTransition = true;
					pPlayOutroAnimations = false;
					this._transitionScreenHeadedOut = this._screensOpen[0];
					tOpenCondition = com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_IMMEDIATE;
					break;
				case com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_FADE:
					this._addTransition(pTransitionAssetId,this._flagHasTransition?this._transition._getIsOutro()?true:false:false);
					this._flagCloseScreenAfterTransition = true;
					pPlayOutroAnimations = false;
					this._transitionPlay();
					tOpenCondition = com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY;
					break;
				}
			}
			if(this._screensOpen.length > 0) {
				if(this._flagCloseScreenAfterTransition) this._screenIdToCloseAfterTransition = this._screensOpen[0].id; else this.closeScreen(this._screensOpen[0].id,pPlayOutroAnimations,0);
				if(this._screensOpen.length > 1) {
					i = 1;
					while(i < this._screensOpen.length) {
						this.closeScreen(this._screensOpen[i].id,false,this._screensOpen.length);
						i++;
					}
				}
			}
			if(this._flagOpenScreenAfterTransition) {
				com.workinman.utils.WorkinCloud.instance.log("[ScreenManager] Store Screen to open at transition midway: " + pId);
				this._screenIdToOpenDuringTransition = pId;
			} else this.openScreen(pId,true,tOpenCondition);
		} else this.openScreen(pId,false);
	}
	,_moveScreenToTop: function(pId) {
		var tScreen = this.getScreen(pId);
		if(tScreen == null) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](_moveScreenToTop) ERROR: Screen >" + pId + "< is not open or does not exist. Cancelling move.");
			return;
		}
		if(tScreen.isClosing()) tScreen.open(false);
		var i = this._screensOpen.length - 1;
		while(i >= 0) {
			if(this._screensOpen[i].id == pId) break;
			i--;
		}
		this._screensOpen.splice(i,1);
		tScreen.reset();
		this._removeScreenDisplay(tScreen._getEntity());
		this._addScreenDisplay(tScreen._getEntity());
		this._screensOpen.push(tScreen);
	}
	,openScreen: function(pId,pWaitForClosingScreens,pOpenCondition,pConditionString) {
		if(pConditionString == null) pConditionString = "";
		if(pOpenCondition == null) pOpenCondition = 0;
		if(pWaitForClosingScreens == null) pWaitForClosingScreens = true;
		com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](openScreen) " + pId);
		if(!this._hasScreenData(pId)) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenManager](closeScreen) ERROR: Screen >" + pId + "< does not exist. Cancelling open().");
			return;
		}
		if(this.isScreenOpen(pId)) {
			this._moveScreenToTop(pId);
			return;
		}
		if(pOpenCondition != com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_IMMEDIATE && pWaitForClosingScreens) {
			if(this._screensOpen.length > 0) {
				this._addScreenToQueue(this._getScreenData(pId),pOpenCondition,pConditionString);
				return;
			} else if(pOpenCondition == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE || pOpenCondition == com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY) {
				if(this._flagHasTransition) {
					this._addScreenToQueue(this._getScreenData(pId),pOpenCondition,pConditionString);
					return;
				}
			}
		}
		this._generateScreen(this._getScreenData(pId));
	}
	,closeScreen: function(pId,pPlayOutro,pIndex) {
		if(pIndex == null) pIndex = -1;
		if(pPlayOutro == null) pPlayOutro = true;
		if(pId == null) pId = "";
		if(this._screensOpen.length == 0) {
			this.removeQueuedScreen(pId);
			return;
		}
		var tScreen;
		if(pId == "") tScreen = this._screensOpen[this._screensOpen.length - 1]; else if(pIndex >= 0 && pIndex < this._screensOpen.length) tScreen = this._screensOpen[pIndex]; else {
			tScreen = this.getScreen(pId);
			if(tScreen == null) {
				this.removeQueuedScreen(pId);
				return;
			}
		}
		tScreen.close(pPlayOutro);
		this._dispatchEventChange(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_CLOSE_BEGIN,pId);
	}
	,handleInput: function(pEvent) {
		var tValid = true;
		var i = this._screensOpen.length - 1;
		while(i >= 0) {
			if(!this._screensOpen[i].handleInput(pEvent)) tValid = false;
			i--;
		}
		return tValid;
	}
	,addScreen: function(pId,pScreenClass,pAssetId,pLayer,pData) {
		if(pLayer == null) pLayer = 0;
		if(pAssetId == null) pAssetId = "";
		this._screens.push(new com.nick.spongebob.chopping_block.ui.screens.data.ScreenData(pId,pScreenClass,pAssetId,pLayer,pData));
	}
	,__class__: com.nick.spongebob.chopping_block.ui.ScreenManager
});
com.nick.spongebob.chopping_block.ui.UserInterfaceElement = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	this.sorted = false;
	this._dispatcher = new com.workinman.utils.WMEventDispatcher();
	this._entity = new flambe.Entity();
	this._tweens = new Array();
	this._position = new com.workinman.math.WorkinPoint(pX,pY);
	this._layer = pLayer;
	this._flagChangePosition = false;
	if(this._flagBitmapAdded == true) {
		this._assetBase = pAsset;
		this._flagHasAssetBase = this._assetBase == "";
	} else {
		this._flagBitmapAdded = false;
		this._bitmapAssetCurrent = "";
		this._assetBase = pAsset;
		if(this._assetBase == "") this._flagHasAssetBase = false; else {
			this._flagHasAssetBase = true;
			this._addBitmap(this._assetBase);
		}
	}
	if(this._display != null && pRegistration != null) this._display.setAnchor(pRegistration.x,pRegistration.y);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.UserInterfaceElement"] = com.nick.spongebob.chopping_block.ui.UserInterfaceElement;
com.nick.spongebob.chopping_block.ui.UserInterfaceElement.__name__ = ["com","nick","spongebob","chopping_block","ui","UserInterfaceElement"];
com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype = {
	_doMotionPoint: function(pTween,pDt) {
		var tRes = pTween._getPos().copy();
		if(tRes.x % 1 == 0) tRes.x += .001;
		if(tRes.y % 1 == 0) tRes.y += .001;
		return tRes;
	}
	,_doMotionFloat: function(pTween,pDt) {
		var tRes = pTween._getPos().x;
		if(tRes % 1 == 0) tRes += .001;
		return tRes;
	}
	,disposeDisplay: function() {
		this._display = null;
	}
	,dispose: function() {
		com.workinman.utils.WorkinCloud.instance.log("[UserInterfaceElement] dispose begun");
		this._entity.dispose();
		this._disposeBitmapContainer();
		this._dispatcher.dispose();
		var i = 0;
		var d = 0;
		while(i < this._tweens.length) {
			d = 0;
			while(d < this._tweens[i].length) {
				this._tweens[i][d].dispose();
				d++;
			}
			this._tweens[i] = null;
			i++;
		}
		this._tweens = null;
		this._position = null;
	}
	,_disposeBitmapContainer: function() {
		if(this._flagBitmapAdded == false) return;
		this._flagBitmapAdded = false;
		this._display.dispose();
	}
	,_addBitmap: function(pAsset) {
		if(this._flagBitmapAdded) {
			if(this._bitmapAssetCurrent == pAsset) return;
			this._disposeBitmapContainer();
		}
		this._bitmapAssetCurrent = pAsset;
		if(this._bitmapAssetCurrent == "") return;
		this._flagBitmapAdded = true;
		this._display = new flambe.display.ImageSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getTexture(this._bitmapAssetCurrent));
		this._entity.add(this._display);
		this.renderPosition();
	}
	,_initializeTween: function(pTween) {
		switch(pTween._getType()) {
		case "tx":
			pTween.setStartFast(this._position.x,this._position.x);
			break;
		case "ty":
			pTween.setStartFast(this._position.y,this._position.y);
			break;
		case "rtx":
			pTween.setStartFast(this._position.x,this._position.x);
			break;
		case "rty":
			pTween.setStartFast(this._position.y,this._position.y);
			break;
		case "":
			pTween.setStart(this._position);
			break;
		case "t":
			pTween.setStart(this._position);
			break;
		case "sx":
			pTween.setStartFast(this._display.scaleY.get__(),this._display.scaleY.get__());
			break;
		case "sy":
			pTween.setStartFast(this._display.scaleY.get__(),this._display.scaleY.get__());
			break;
		case "s":
			pTween.setStartFast(this._display.scaleX.get__(),this._display.scaleY.get__());
			break;
		case "a":
			pTween.setStartFast(this._display.alpha.get__(),this._display.alpha.get__());
			break;
		case "r":
			pTween.setStartFast(this._display.rotation.get__(),this._display.rotation.get__());
			break;
		}
	}
	,_applyTween: function(dt,pTween) {
		this._flagChangePosition = true;
		switch(pTween._getType()) {
		case "tx":
			if(pTween.isReady()) {
				var tRes = this._doMotionFloat(pTween,dt);
				if(tRes % 1 != 0) this._position.x = tRes;
			} else this._initializeTween(pTween);
			break;
		case "ty":
			if(pTween.isReady()) this._position.y = this._doMotionFloat(pTween,dt); else this._initializeTween(pTween);
			break;
		case "rtx":
			if(pTween.isReady()) {
				var tRes = this._doMotionFloat(pTween,dt);
				if(tRes % 1 != 0) this._position.x = tRes;
			} else this._initializeTween(pTween);
			break;
		case "rty":
			if(pTween.isReady()) this._position.y = this._doMotionFloat(pTween,dt); else this._initializeTween(pTween);
			break;
		case "":
			if(pTween.isReady()) this._position.toPoint(this._doMotionPoint(pTween,dt)); else this._initializeTween(pTween);
			break;
		case "t":
			if(pTween.isReady()) this._position.toPoint(this._doMotionPoint(pTween,dt)); else this._initializeTween(pTween);
			break;
		case "sx":
			if(pTween.isReady()) this._display.scaleX.set__(this._doMotionFloat(pTween,dt)); else this._initializeTween(pTween);
			break;
		case "sy":
			if(pTween.isReady()) this._display.scaleY.set__(this._doMotionFloat(pTween,dt)); else this._initializeTween(pTween);
			break;
		case "s":
			if(pTween.isReady()) {
				var tPoint = this._doMotionPoint(pTween,dt);
				this._display.scaleX.set__(tPoint.x);
				this._display.scaleY.set__(tPoint.y);
			} else this._initializeTween(pTween);
			break;
		case "a":
			if(pTween.isReady()) this._display.alpha.set__(this._doMotionFloat(pTween,dt)); else this._initializeTween(pTween);
			break;
		case "r":
			if(pTween.isReady()) this._display.rotation.set__(this._doMotionFloat(pTween,dt)); else this._initializeTween(pTween);
			break;
		}
	}
	,_updatePositionFromTween: function(dt) {
		var i = this._tweens[0].length;
		while(i >= 0) {
			this._tweens[0][i].update(dt);
			this._applyTween(dt,this._tweens[0][i]);
			if(this._tweens[0][i].complete) {
				this._tweens[0].splice(i,1);
				this._onTweenStageComplete();
			}
			i--;
		}
		if(this._tweens[0].length == 0) {
			this._tweens.shift();
			if(this._tweens.length == 0) this._onTweenAllComplete();
		}
	}
	,_onTweenAllComplete: function() {
	}
	,_onTweenStageComplete: function() {
	}
	,update: function(dt) {
		if(this._tweens.length > 0) this._updatePositionFromTween(dt);
		if(this._flagChangePosition) this.renderPosition();
	}
	,renderPosition: function() {
		if(!this._flagBitmapAdded) return;
		this._display.x.set__(this._position.x);
		this._display.y.set__(this._position.y);
		this._flagChangePosition = false;
	}
	,_getDisplay: function() {
		return this._display;
	}
	,_setLayer: function(pLayer) {
		if(pLayer == this._layer) return this._layer;
		this.sorted = false;
		return this._layer = pLayer;
	}
	,_getLayer: function() {
		return this._layer;
	}
	,_getTweensComplete: function() {
		return this._tweens.length == 0;
	}
	,_getDispatcher: function() {
		return this._dispatcher;
	}
	,_getEntity: function() {
		return this._entity;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.UserInterfaceElement
}
com.nick.spongebob.chopping_block.ui.buttons = {}
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase = function(pX,pY,pLayer,pUpAsset,pOverAsset,pDownAsset,pRegistration,pScale,pDisabledAsset) {
	if(pDisabledAsset == null) pDisabledAsset = "";
	if(pScale == null) pScale = 1;
	if(pDownAsset == null) pDownAsset = "";
	if(pOverAsset == null) pOverAsset = "";
	if(pUpAsset == null) pUpAsset = "";
	if(pLayer == null) pLayer = 0;
	com.nick.spongebob.chopping_block.ui.UserInterfaceElement.call(this,pX,pY,pLayer,"",pRegistration);
	if(pUpAsset == "") this._assetUp = this._getDefaultAssetUp(); else this._assetUp = pUpAsset;
	if(pOverAsset == "") this._assetOver = this._getDefaultAssetOver(); else this._assetOver = pOverAsset;
	if(pDownAsset == "") this._assetDown = this._getDefaultAssetDown(); else this._assetDown = pDownAsset;
	if(pDisabledAsset == "") this._assetDisabled = this._getDefaultAssetDisabled(); else this._assetDisabled = pDisabledAsset;
	this._bitmapAssetCurrent = "";
	this._flagEventListenersAdded = false;
	this._flagBitmapAdded = false;
	this._flagDown = false;
	this._flagDragged = false;
	this.enable();
	this._addEventListeners();
};
$hxClasses["com.nick.spongebob.chopping_block.ui.buttons.ButtonBase"] = com.nick.spongebob.chopping_block.ui.buttons.ButtonBase;
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.__name__ = ["com","nick","spongebob","chopping_block","ui","buttons","ButtonBase"];
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.__super__ = com.nick.spongebob.chopping_block.ui.UserInterfaceElement;
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.prototype = $extend(com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype,{
	_removeEventListeners: function() {
		if(!this._flagEventListenersAdded) return;
		this._flagEventListenersAdded = false;
		this._downConnection.dispose();
		this._downConnection = null;
		if(this._flagDown) {
			this._upConnection.dispose();
			this._upConnection = null;
		}
	}
	,_addEventListeners: function() {
		if(this._flagEventListenersAdded) return;
		this._flagEventListenersAdded = true;
		this._downConnection = this._display.get_pointerDown().connect($bind(this,this._onDownEvent));
	}
	,renderPosition: function() {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.renderPosition.call(this);
	}
	,_renderDisabled: function() {
	}
	,_renderReturnUp: function() {
	}
	,_renderDown: function() {
	}
	,_renderUp: function() {
		this._addBitmap(this._assetUp);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.update.call(this,dt);
		if(this._flagDown && com.workinman.utils.WorkinCloud.instance.getInput().getInput(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK) == false) {
			this._upConnection.dispose();
			this._renderReturnUp();
		}
	}
	,_onCancelDrag: function() {
		this._flagDragged = false;
		this._dispatch(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CANCEL_DRAG);
	}
	,_onUp: function(pX,pY) {
		if(this._flagDown) {
			console.log("UP!");
			this._upConnection.dispose();
			this._upConnection = null;
			this._flagDown = false;
			this._renderReturnUp();
			this._click();
			if(this._flagDragged) this._onCancelDrag();
			this._dispatch(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.UP);
		}
	}
	,_onDown: function(pX,pY) {
		if(!this._flagBitmapAdded) return;
		this._flagDown = true;
		this._renderDown();
		this._upConnection = this._display.get_pointerUp().connect($bind(this,this._onUpEvent));
		this._dispatch(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.DOWN);
	}
	,_click: function() {
		this._dispatch(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK);
		if(this._getClickFlow() != "") com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(this._getClickFlow()));
		if(this._getClickEvent() != "") com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(this._getClickEvent()));
	}
	,_dispatch: function(pID) {
		if(!this._GET_DO_DISPATCH()) return;
		this._dispatcher.dispatchEvent(new com.workinman.events.WMEvent(pID));
	}
	,_onUpEvent: function(pEvent) {
		this._onUp(pEvent.viewX,pEvent.viewY);
	}
	,_onDownEvent: function(pEvent) {
		this._onDown(pEvent.viewX,pEvent.viewY);
	}
	,_getClickFlow: function() {
		return "";
	}
	,_getClickEvent: function() {
		return "";
	}
	,_GET_DISABLE_FRAME: function() {
		return 1;
	}
	,_GET_CUSTOM_HIT_BOX: function() {
		return new flambe.math.Point(0,0);
	}
	,_GET_DO_DISPATCH: function() {
		return true;
	}
	,_getDefaultAssetDisabled: function() {
		return "";
	}
	,_getDefaultAssetDown: function() {
		return "";
	}
	,_getDefaultAssetOver: function() {
		return "";
	}
	,_getDefaultAssetUp: function() {
		return "";
	}
	,dispose: function() {
		this.disable();
		this._removeEventListeners();
	}
	,disable: function() {
		this._flagEnabled = false;
		this._renderDisabled();
	}
	,enable: function() {
		this._flagEnabled = true;
		this._renderUp();
	}
	,_getFlagBehaveAsElement: function() {
		return false;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.buttons.ButtonBase
});
com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle = function() { }
$hxClasses["com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle"] = com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle;
com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle.__name__ = ["com","nick","spongebob","chopping_block","ui","buttons","ButtonSoundToggle"];
com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle.__super__ = com.nick.spongebob.chopping_block.ui.buttons.ButtonBase;
com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle.prototype = $extend(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.prototype,{
	_getClickEvent: function() {
		var currentAssets = com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED)?this._onAssets:this._offAssets;
		this._assetUp = currentAssets[0];
		this._assetOver = currentAssets[1];
		this._assetDown = currentAssets[currentAssets.length == 3?2:1];
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_MUTE_TOGGLE;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.buttons.ButtonSoundToggle
});
com.nick.spongebob.chopping_block.ui.displays = {}
com.nick.spongebob.chopping_block.ui.displays.Display = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.UserInterfaceElement.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._addEventListeners();
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.Display"] = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.Display.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","Display"];
com.nick.spongebob.chopping_block.ui.displays.Display.__super__ = com.nick.spongebob.chopping_block.ui.UserInterfaceElement;
com.nick.spongebob.chopping_block.ui.displays.Display.prototype = $extend(com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.dispose.call(this);
		this._removeEventListeners();
	}
	,_updateValue: function() {
		return "";
	}
	,_refresh: function() {
	}
	,_onUpdateDisplay: function(inEvent) {
		if(inEvent._getData().valueID == this._updateValue()) this._refresh();
	}
	,_removeEventListeners: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UPDATE_DISPLAY,$bind(this,this._onUpdateDisplay));
	}
	,_addEventListeners: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UPDATE_DISPLAY,$bind(this,this._onUpdateDisplay));
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.Display
});
com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	this._i = 25;
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._container = new flambe.Entity();
	this._displayI = 0;
	this._maskingBar = new flambe.display.ImageSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getTexture("ui/hud_meterfill.png"));
	this._maskingBar.x.set__(719);
	this._maskingBar.y.set__(33);
	this._maskingBar.scaleX.set__(0);
	this._container.addChild(new flambe.Entity().add(this._maskingBar));
	this._entity.addChild(this._container);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter"] = com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter;
com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayComboMeter"];
com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	removeLine: function(pflagReset) {
		if(pflagReset == null) pflagReset = false;
		if(this._displayI == 0) this._maskingBar.scaleX.set__(0); else this._maskingBar.scaleX.set__(-this._displayI);
	}
	,addLine: function() {
		this._maskingBar.scaleX.set__(this._displayI);
	}
	,_updateValue: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.displays.Display.prototype.update.call(this,dt);
		this._i = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
		this._displayI += (this._i - this._displayI) * (dt * 10);
		if(this._displayI < 0 && this._displayI >= -1) {
			if(this._maskingBar.scaleX.get__() > -1) this.addLine();
		} else if(this._displayI > 0 && this._displayI <= 1) {
			if(this._maskingBar.scaleX.get__() < 0) this.removeLine();
		}
	}
	,_refresh: function() {
		this._i = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter
});
com.nick.spongebob.chopping_block.ui.displays.DisplayHealth = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayHealth"] = com.nick.spongebob.chopping_block.ui.displays.DisplayHealth;
com.nick.spongebob.chopping_block.ui.displays.DisplayHealth.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayHealth"];
com.nick.spongebob.chopping_block.ui.displays.DisplayHealth.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayHealth.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	_updateValue: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.displays.Display.prototype.update.call(this,dt);
		var health = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
		this._addBitmap("ui/hud_health" + health + ".png");
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayHealth
});
com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._display.alpha.set__(0);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter"] = com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter;
com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayItemMeter"];
com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	update: function(dt) {
		com.nick.spongebob.chopping_block.ui.displays.Display.prototype.update.call(this,dt);
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING)) this._display.alpha.set__(1); else this._display.alpha.set__(0);
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter
});
com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed = function(pX,pY,pLayer,pAsset,pRegistration,endGame) {
	if(endGame == null) endGame = false;
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"");
	this._text.scaleX.set__(.5);
	this._text.scaleY.set__(.5);
	this._display = this._text;
	this._text.x.set__(pX);
	this._text.y.set__(pY);
	this._entity.add(this._display);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed"] = com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed;
com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayItemsDestroyed"];
com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	_updateValue: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.displays.Display.prototype.update.call(this,dt);
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING)) {
			var score = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
			if(score < 0) this._text.set_text("" + 0); else this._text.set_text("" + score);
		} else this._text.set_text("");
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed
});
com.nick.spongebob.chopping_block.ui.displays.DisplayMeter = function(pX,pY,pLayer,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayMeter"] = com.nick.spongebob.chopping_block.ui.displays.DisplayMeter;
com.nick.spongebob.chopping_block.ui.displays.DisplayMeter.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayMeter"];
com.nick.spongebob.chopping_block.ui.displays.DisplayMeter.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayMeter.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	_updateValue: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE;
	}
	,_refresh: function() {
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayMeter
});
com.nick.spongebob.chopping_block.ui.displays.DisplayScore = function(pX,pY,pLayer,pAsset,pRegistration,endGame) {
	if(endGame == null) endGame = false;
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"" + com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue()));
	this._text.scaleX.set__(.5);
	this._text.scaleY.set__(.5);
	this._display = this._text;
	this._text.x.set__(pX);
	this._text.y.set__(pY);
	this._entity.add(this._display);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayScore"] = com.nick.spongebob.chopping_block.ui.displays.DisplayScore;
com.nick.spongebob.chopping_block.ui.displays.DisplayScore.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayScore"];
com.nick.spongebob.chopping_block.ui.displays.DisplayScore.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayScore.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	_updateValue: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE;
	}
	,update: function(dt) {
		var score = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
		this._text.set_text("" + score);
	}
	,_refresh: function() {
		var score = com.workinman.utils.WorkinCloud.instance.getFloat(this._updateValue());
		this._text.set_text("" + score);
	}
	,__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayScore
});
com.nick.spongebob.chopping_block.ui.displays.DisplayText = function(pX,pY,pLayer,pAsset,pRegistration,endGame) {
	if(endGame == null) endGame = false;
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.ui.displays.Display.call(this,pX,pY,pLayer,pAsset,pRegistration);
	this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"Loading...");
	this._display = this._text;
	this._text.x.set__(pX);
	this._text.y.set__(pY);
	this._entity.add(this._display);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.displays.DisplayText"] = com.nick.spongebob.chopping_block.ui.displays.DisplayText;
com.nick.spongebob.chopping_block.ui.displays.DisplayText.__name__ = ["com","nick","spongebob","chopping_block","ui","displays","DisplayText"];
com.nick.spongebob.chopping_block.ui.displays.DisplayText.__super__ = com.nick.spongebob.chopping_block.ui.displays.Display;
com.nick.spongebob.chopping_block.ui.displays.DisplayText.prototype = $extend(com.nick.spongebob.chopping_block.ui.displays.Display.prototype,{
	__class__: com.nick.spongebob.chopping_block.ui.displays.DisplayText
});
com.nick.spongebob.chopping_block.ui.screens = {}
com.nick.spongebob.chopping_block.ui.screens.ScreenBase = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	this._STATE_OPENED = "opened";
	this._STATE_OUT = "out";
	this._STATE_IN = "in";
	if(pAssetId == "") pAssetId = this._getAssetId();
	this.id = pId;
	com.nick.spongebob.chopping_block.ui.UserInterfaceElement.call(this,0,0,pLayer,pAssetId);
	this._addEventListeners();
	this._buttons = new Array();
	this._buildButtons();
	this.flagDispose = false;
	this._flagStateCompleteTemp = false;
	this._flagStateAnimationComplete = false;
	this._states = new Array();
	this._generateStates();
	this._stateIndex = this._states.length + 2;
	this._setFirstState();
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenBase"] = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenBase.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenBase"];
com.nick.spongebob.chopping_block.ui.screens.ScreenBase.__super__ = com.nick.spongebob.chopping_block.ui.UserInterfaceElement;
com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype = $extend(com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype,{
	_onStateComplete: function() {
		this._flagStateCompleteTemp = false;
		if(this._states[this._stateIndex].outFunc != "") com.workinman.utils.WorkinCloud.instance.log("[ScreenBase](_onStateComplete) Out Func not supported in HTML5 yet");
		switch(this._states[this._stateIndex].actionOnComplete) {
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_STOP:
			break;
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_OPENED:
			this._setOpenedState();
			this._dispatcher.dispatchEvent(new com.workinman.events.WMEventScreenOut(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_OPENED,this.id));
			break;
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_CLOSED:
			this.setFlagDispose();
			this._dispatcher.dispatchEvent(new com.workinman.events.WMEventScreenOut(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_CLOSED,this.id));
			break;
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_NEW_STATE:
			this._setState(this._states[this._stateIndex].actionData);
			break;
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_EVENT:
			this._dispatcher.dispatchEvent(new com.workinman.events.WMEvent(this._states[this._stateIndex].actionData));
			break;
		case com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_FLOW:
			this._doFlowEvent(this._states[this._stateIndex].actionData);
			break;
		default:
		}
	}
	,_findStateIndex: function(pId) {
		var i = this._states.length - 1;
		while(i >= 0) {
			if(this._states[i].id == pId) return i;
			i--;
		}
		return -1;
	}
	,getState: function() {
		return this._states[this._stateIndex].id;
	}
	,_setState: function(pStateId,pForceReset) {
		if(pForceReset == null) pForceReset = false;
		var tStateIndex = this._findStateIndex(pStateId);
		if(tStateIndex < 0) {
			com.workinman.utils.WorkinCloud.instance.log("[ScreenBase](_setState) ERROR : State >" + pStateId + "< not found.");
			com.workinman.utils.WorkinCloud.instance.log("[ScreenBase](_setState) cancelling setState().");
			return;
		}
		if(!pForceReset && tStateIndex == this._stateIndex) return;
		this._flagStateCompleteTemp = false;
		this._flagStateAnimationComplete = false;
		this._stateIndex = tStateIndex;
	}
	,_addState: function(pId,pAnim,pActionOnComplete,pActionData,pInFunc,pOutFunc) {
		if(pOutFunc == null) pOutFunc = "";
		if(pInFunc == null) pInFunc = "";
		if(pActionData == null) pActionData = "";
		if(pActionOnComplete == null) pActionOnComplete = 0;
		this._states.push(new com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData(pId,pAnim,pActionOnComplete,pActionData,pInFunc,pOutFunc));
	}
	,isClosing: function() {
		return this.getState() == this._STATE_OUT;
	}
	,close: function(pPlayOutro) {
		if(pPlayOutro == null) pPlayOutro = true;
		this.setFlagDispose();
		this._dispatcher.dispatchEvent(new com.workinman.events.WMEventScreenOut(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_CLOSED,this.id));
		return;
	}
	,open: function(pPlayIntro) {
		if(pPlayIntro == null) pPlayIntro = true;
		this._setOpenedState();
		this._dispatcher.dispatchEvent(new com.workinman.events.WMEventScreenOut(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_OPENED,this.id));
		return;
	}
	,dispose: function() {
		var _g = 0, _g1 = this._buttons;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.dispose();
		}
		this._buttons = null;
		this._removeEventListeners();
		this._states = null;
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.dispose.call(this);
	}
	,reset: function() {
		this._setFirstState();
	}
	,handleInput: function(pEvent) {
		var tValid = true;
		switch(pEvent.input) {
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK:
			switch(pEvent.phase) {
			case 1:
				if(!this._onInputDown(pEvent.x,pEvent.y)) tValid = false;
				break;
			case 2:
				if(!this._onInputMove(pEvent.x,pEvent.y)) tValid = false;
				break;
			case 0:
				if(!this._onInputUp(pEvent.x,pEvent.y)) tValid = false;
				break;
			}
			break;
		default:
			if(!this._onInput(pEvent)) tValid = false;
		}
		return tValid;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.update.call(this,dt);
		var _g = 0, _g1 = this._buttons;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			b.renderPosition();
		}
		if(this._flagStateCompleteTemp) this._onStateComplete();
	}
	,_doFlowEvent: function(pId) {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(pId));
	}
	,_addButton: function(pButton) {
		this._buttons.push(pButton);
		this._entity.addChild(pButton._getEntity());
		return pButton;
	}
	,_buildButtons: function() {
	}
	,_removeEventListeners: function() {
	}
	,_addEventListeners: function() {
	}
	,_onInput: function(pEvent) {
		return true;
	}
	,_onInputMove: function(inX,inY) {
		return true;
	}
	,_onInputUp: function(inX,inY) {
		return true;
	}
	,_onInputDown: function(inX,inY) {
		return true;
	}
	,_generateStates: function() {
		this._addState(this._STATE_IN,"in",com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_OPENED);
		this._addState(this._STATE_OUT,"out",com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_CLOSED);
		this._addState(this._STATE_OPENED,"open");
	}
	,_setOpenedState: function() {
		this._setState(this._STATE_OPENED);
	}
	,_setFirstState: function() {
		this._setState(this._STATE_IN);
	}
	,setFlagDispose: function() {
		this.flagDispose = true;
	}
	,_getAssetId: function() {
		return "MovieClip";
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenBase
});
com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,pLayer,pData);
	this._localText = new com.workinman.display.TextLocalized(200,40,"game_over_title","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(100,200,"game_over_line1","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._buttonPlayAgain = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(30,425,0,"ui/gameover_button.png","ui/gameover_button.png","ui/gameover_button.png",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonPlayAgain._getEntity());
	this._buttonPlayAgain._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onPlayAgainClick));
	var tDisplay = new com.nick.spongebob.chopping_block.ui.displays.DisplayScore(150,280,0,null,null,true);
	tDisplay._getDisplay().scaleX.set__(tDisplay._getDisplay().scaleY.set__(1));
	tDisplay._getDisplay().setScale(0.75);
	this._addButton(tDisplay);
	tDisplay = null;
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(70,266,0,"ui/gameover_scoreoverlay.png"))._getDisplay().alpha.set__(0.25);
	this._localText = new com.workinman.display.TextLocalized(90,465,"game_over_play_button","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(30,425,0,"gameover_playoverlay"))._getDisplay().alpha.set__(0.5);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame"] = com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame;
com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenEndGame"];
com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	_onPlayAgainClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN);
	}
	,_onInputDown: function(inX,inY) {
		if(inX < 331 && inX > 53 && inY < 514 && inY > 450) {
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN));
			return true;
		} else return false;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenEndGame
});
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	this._flagAddedText = false;
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,pLayer,pData);
	this._addButton(new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(9,10,0,"ui/pause_button.png","ui/hud_button_pause_over.png","ui/hud_button_pause_over.png",new com.workinman.math.WorkinPoint(1,0)))._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onPauseClick));
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(410,17,0,"ui/hud_backing.png"));
	this._displayHealth = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayHealth(410,17,0,"ui/hud_health3.png")) , com.nick.spongebob.chopping_block.ui.displays.DisplayHealth);
	this._comboMeter = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter(410,17,0,"")) , com.nick.spongebob.chopping_block.ui.displays.DisplayComboMeter);
	this._displayScore = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayScore(800,40,0)) , com.nick.spongebob.chopping_block.ui.displays.DisplayScore);
	this._displayItemContainer = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter(166,23,0,"ui/hud_itemstoadvance.png")) , com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter);
	this._displayItems = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed(340,72,0)) , com.nick.spongebob.chopping_block.ui.displays.DisplayItemsDestroyed);
	this._localText = new com.workinman.display.TextLocalized(200,50,"items_needed_1","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._localText2 = new com.workinman.display.TextLocalized(200,75,"items_needed_2","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(410,17,0,"ui/hud_metergradientoverlay.png"));
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(410,17,0,"ui/hud_meteroverlay.png"));
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(410,17,0,"ui/hud_scoreoverlay.png"));
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(410,17,0,"ui/hud_healthoverlay.png"));
	this._localText2 = new com.workinman.display.TextLocalized(472,41,"rage_text","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText2._getEntity());
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(405,17,0,"ui/hud_meterborder.png"));
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD"] = com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD;
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenGameplayHUD"];
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	_onPauseClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.update.call(this,dt);
		this._comboMeter.update(dt);
		this._displayScore.update(dt);
		this._displayItems.update(dt);
		this._displayItemContainer.update(dt);
		this._displayHealth.update(dt);
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING) && this._flagAddedText == false) {
			this._localText = new com.workinman.display.TextLocalized(200,50,"items_needed_1","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
			this._entity.addChild(this._localText._getEntity());
			this._localText2 = new com.workinman.display.TextLocalized(200,75,"items_needed_2","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
			this._entity.addChild(this._localText2._getEntity());
			this._displayItemContainerOverlay = js.Boot.__cast(this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter(158,22,0,"ui/hud_itemstoadvance_overlay.png")) , com.nick.spongebob.chopping_block.ui.displays.DisplayItemMeter);
			this._displayItemContainerOverlay.update(dt);
			this._flagAddedText = true;
		} else if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING) == false && this._flagAddedText == true) {
			this._entity.removeChild(this._localText._getEntity());
			this._entity.removeChild(this._localText2._getEntity());
			this._entity.removeChild(this._displayItemContainerOverlay._getEntity());
			this._flagAddedText = false;
		}
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayHUD
});
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,pLayer,pData);
	this._soundIsMuted = com.workinman.utils.WorkinCloud.instance._getSound().getMute();
	this._getDisplay().x.set__(70);
	this._getDisplay().y.set__(560);
	this._tween = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(70,560),new com.workinman.math.WorkinPoint(70,15),.4,0,"out");
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 430,30,"menu_title","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._buttonBack = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(60,140,0,"ui/pausemenu_backtogame.png","ui/pausemenu_backtogame","ui/pausemenu_backtogame",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonBack._getEntity());
	this._buttonBack._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onBackClick));
	this._buttonHelp = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(285,130,0,"ui/pausemenu_howtoplay.png","ui/pausemenu_howtoplay.png","ui/pausemenu_howtoplay.png",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonHelp._getEntity());
	this._buttonHelp._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onHelpClick));
	this._buttonSoundOn = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(50,310,0,"ui/pausemenu_soundon.png","ui/pausemenu_soundon.png","ui/pausemenu_soundon.png",new com.workinman.math.WorkinPoint(1,0));
	this._buttonSoundOn._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onSoundMute));
	this._buttonSoundOff = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(50,310,0,"ui/pausemenu_soundoff.png","ui/pausemenu_soundoff.png","ui/pausemenu_soundoff.png",new com.workinman.math.WorkinPoint(1,0));
	this._buttonSoundOff._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onSoundMute));
	if(!this._soundIsMuted) this._entity.addChild(this._buttonSoundOn._getEntity()); else this._entity.addChild(this._buttonSoundOff._getEntity());
	this._buttonQuit = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(270,303,0,"ui/pausemenu_quit.png","ui/pausemenu_quit.png","ui/pausemenu_quit",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonQuit._getEntity());
	this._buttonQuit._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onQuitClick));
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu"] = com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu;
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenGameplayMenu"];
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.dispose.call(this);
		if(this._tween != null) {
			this._tween.dispose();
			this._tween = null;
		}
	}
	,_onQuitClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT);
	}
	,_onHelpClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP);
	}
	,_onBackClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE);
	}
	,_onSoundMute: function(event) {
		if(this._soundIsMuted == false) {
			this._soundIsMuted = true;
			com.workinman.utils.WorkinCloud.instance._getSound().setMute(this._soundIsMuted);
			this._entity.removeChild(this._buttonSoundOn._getEntity());
			this._entity.addChild(this._buttonSoundOff._getEntity());
		} else {
			this._soundIsMuted = false;
			com.workinman.utils.WorkinCloud.instance._getSound().setMute(this._soundIsMuted);
			this._entity.removeChild(this._buttonSoundOff._getEntity());
			this._entity.addChild(this._buttonSoundOn._getEntity());
		}
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.update.call(this,dt);
		if(!this._tween.complete) {
			this._tween.update(dt);
			this._getDisplay().x.set__(this._tween._getPos().x);
			this._getDisplay().y.set__(this._tween._getPos().y);
		}
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenGameplayMenu
});
com.nick.spongebob.chopping_block.ui.screens.ScreenHelp = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,pLayer,pData);
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 230,40,"help_title","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 370,140,"help_text_line1","",{ origin : new com.workinman.math.WorkinPoint(.5,.5)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 370,175,"help_text_line2","",{ origin : new com.workinman.math.WorkinPoint(.5,.5)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 390,257,"help_text_line3","",{ origin : new com.workinman.math.WorkinPoint(.5,.5)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 390,293,"help_text_line4","",{ origin : new com.workinman.math.WorkinPoint(.5,.5)});
	this._entity.addChild(this._localText._getEntity());
	this._buttonClose = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(599,412,0,"ui/howtoplay_playbutton.png","ui/ui/howtoplay_playbutton.png","ui/ui/howtoplay_playbutton.png",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonClose._getEntity());
	this._buttonClose._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onCloseClick));
	this._localText = new com.workinman.display.TextLocalized(770,469,"help_text_line5","",{ origin : new com.workinman.math.WorkinPoint(.5,.5)});
	this._entity.addChild(this._localText._getEntity());
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(599,412,0,"helpscreen_play_overlay"))._getDisplay().alpha.set__(0.25);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenHelp"] = com.nick.spongebob.chopping_block.ui.screens.ScreenHelp;
com.nick.spongebob.chopping_block.ui.screens.ScreenHelp.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenHelp"];
com.nick.spongebob.chopping_block.ui.screens.ScreenHelp.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenHelp.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	_onCloseClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_HELP_CLOSE);
	}
	,_onInputDown: function(inX,inY) {
		if(inX < 910 && inX > 707 && inY > 422 && inY < 511) {
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_HELP_CLOSE));
			return true;
		} else return false;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenHelp
});
com.nick.spongebob.chopping_block.ui.screens.ScreenLoading = function(pId,pAssetId,pData) {
	if(pAssetId == null) pAssetId = "";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,null,pData);
	this._timerSpin = .25;
	this._loadSpinner = new com.nick.spongebob.chopping_block.world.elements.Element({ x : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + 175, origin : new com.workinman.math.WorkinPoint(0.5,0.5), asset : "loading_spinner"});
	this._entity.addChild(this._loadSpinner._getEntity());
	if(com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID) == "en") this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayText(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 100,40,0));
	this._loadSpinner.setOrigin(new com.workinman.math.WorkinPoint(76,75.5));
	this._camera = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y),new com.workinman.math.WorkinPoint(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y));
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenLoading"] = com.nick.spongebob.chopping_block.ui.screens.ScreenLoading;
com.nick.spongebob.chopping_block.ui.screens.ScreenLoading.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenLoading"];
com.nick.spongebob.chopping_block.ui.screens.ScreenLoading.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenLoading.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.dispose.call(this);
		this._loadSpinner = null;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.update.call(this,dt);
		this._timerSpin -= dt;
		if(this._timerSpin <= 0) {
			this._timerSpin = .1;
			var _g = this._loadSpinner._getDisplay().rotation;
			_g.set__(_g.get__() + 45);
		}
		this._loadSpinner.update(dt);
		this._loadSpinner.renderPosition(this._camera);
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenLoading
});
com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm = function(pId,pAssetId,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetId == null) pAssetId = "";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,pLayer,pData);
	this._getDisplay().x.set__(960);
	this._getDisplay().y.set__(312);
	this._tween = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(960,312),new com.workinman.math.WorkinPoint(510,312),.4,0,"out");
	this._localText = new com.workinman.display.TextLocalized(200,30,"quit_confirm_title","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(150,60,"quit_confirm_title2","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(200,90,"quit_confirm_title3","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._buttonYes = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(65,120,0,"ui/quit_yes_button.png","ui/quit_yes_button.png","ui/quit_yes_button.png",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonYes._getEntity());
	this._buttonYes._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onYesClick));
	this._buttonNo = new com.nick.spongebob.chopping_block.ui.buttons.ButtonBase(230,120,0,"ui/quit_no_button.png","ui/quit_no_button.png","ui/quit_no_button.png",new com.workinman.math.WorkinPoint(1,0));
	this._entity.addChild(this._buttonNo._getEntity());
	this._buttonNo._getDispatcher().addEventListener(com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK,$bind(this,this._onNoClick));
	this._localText = new com.workinman.display.TextLocalized(125,150,"quit_confirm_yes","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._localText = new com.workinman.display.TextLocalized(282,155,"quit_confirm_no","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(65,120,0,"quit_yes_overlay"))._getDisplay().alpha.set__(0.3);
	this._addButton(new com.nick.spongebob.chopping_block.ui.displays.DisplayMeter(230,120,0,"quit_no_overlay"))._getDisplay().alpha.set__(0.3);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm"] = com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm;
com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenQuitConfirm"];
com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	_onNoClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO);
	}
	,_onYesClick: function(event) {
		this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES);
	}
	,dispose: function() {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.dispose.call(this);
		if(this._tween != null) {
			this._tween.dispose();
			this._tween = null;
		}
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.update.call(this,dt);
		if(!this._tween.complete) {
			this._tween.update(dt);
			this._getDisplay().x.set__(this._tween._getPos().x);
			this._getDisplay().y.set__(this._tween._getPos().y);
		}
	}
	,_onInputDown: function(inX,inY) {
		if(inX < 863 && inX > 764 && inY > 456 && inY < 509) {
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO));
			return false;
		} else if(inX > 604 && inX < 724 && inY > 445 && inY < 505) {
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES));
			return false;
		} else return true;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenQuitConfirm
});
com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot = function() { }
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot"] = com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot;
com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenScreenshot"];
com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype.dispose.call(this);
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenScreenshot
});
com.nick.spongebob.chopping_block.ui.screens.ScreenSplash = function(pId,pAssetId,pData) {
	if(pAssetId == null) pAssetId = "";
	if(com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID) != "en") pAssetId = "ui/sb_squid_defense_splash_03_local.jpg";
	com.nick.spongebob.chopping_block.ui.screens.ScreenBase.call(this,pId,pAssetId,0,pData);
	this._soundIsMuted = com.workinman.utils.WorkinCloud.instance._getSound().getMute();
	if(com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID) != "en") {
		this._localText = new com.workinman.display.TextLocalized(500,130,"splash_title","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._localText._getDisplay().rotation.set__(-10);
		this._entity.addChild(this._localText._getEntity());
		this._localText = new com.workinman.display.TextLocalized(320,240,"splash_title2","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._localText._getDisplay().rotation.set__(-10);
		this._entity.addChild(this._localText._getEntity());
		this._localText = new com.workinman.display.TextLocalized(450,300,"splash_title3","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._localText._getDisplay().rotation.set__(-10);
		this._entity.addChild(this._localText._getEntity());
	}
	this._localText = new com.workinman.display.TextLocalized(400,500,"tap_anywhere","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
	this._entity.addChild(this._localText._getEntity());
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.ScreenSplash"] = com.nick.spongebob.chopping_block.ui.screens.ScreenSplash;
com.nick.spongebob.chopping_block.ui.screens.ScreenSplash.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","ScreenSplash"];
com.nick.spongebob.chopping_block.ui.screens.ScreenSplash.__super__ = com.nick.spongebob.chopping_block.ui.screens.ScreenBase;
com.nick.spongebob.chopping_block.ui.screens.ScreenSplash.prototype = $extend(com.nick.spongebob.chopping_block.ui.screens.ScreenBase.prototype,{
	_onInputDown: function(inX,inY) {
		if(inX > 25 && inX < 120 && inY > 470 && inY < 550) return false; else {
			com.workinman.utils.WorkinCloud.instance.log("[Splash] State: " + this.getState());
			if(this.getState() != this._STATE_OPENED) return false;
			this._doFlowEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_SPLASH_PLAY);
			return true;
		}
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.ScreenSplash
});
com.nick.spongebob.chopping_block.ui.screens.data = {}
com.nick.spongebob.chopping_block.ui.screens.data.ScreenData = function(pId,pScreenClass,pAssetClassName,pLayer,pData) {
	if(pLayer == null) pLayer = 0;
	if(pAssetClassName == null) pAssetClassName = "";
	this.id = pId;
	this.screenClass = pScreenClass;
	this.assetClassName = pAssetClassName;
	this.layer = pLayer;
	if(pData == null) this.data = new Hash(); else this.data = pData;
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.data.ScreenData"] = com.nick.spongebob.chopping_block.ui.screens.data.ScreenData;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenData.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","data","ScreenData"];
com.nick.spongebob.chopping_block.ui.screens.data.ScreenData.prototype = {
	__class__: com.nick.spongebob.chopping_block.ui.screens.data.ScreenData
}
com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData = function(pScreenData,pOpenCondition,pOpenTestString) {
	if(pOpenTestString == null) pOpenTestString = "";
	this.screenData = pScreenData;
	this.openCondition = pOpenCondition;
	this.openTestString = pOpenTestString;
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData"] = com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","data","ScreenQueueData"];
com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData.prototype = {
	validateCondition: function(pCondition,pConditionString) {
		if(pConditionString == null) pConditionString = "";
		if(this.openCondition == pCondition) return this.openTestString == "" || this.openTestString == pConditionString;
		return false;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.screens.data.ScreenQueueData
}
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData = function(pId,pAnim,pActionOnComplete,pactionData,pInFunc,pOutFunc) {
	this.id = pId;
	this.animation = pAnim;
	this.actionOnComplete = pActionOnComplete;
	this.actionData = pactionData;
	this.inFunc = pInFunc;
	this.outFunc = pOutFunc;
};
$hxClasses["com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData"] = com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.__name__ = ["com","nick","spongebob","chopping_block","ui","screens","data","ScreenStateData"];
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.prototype = {
	__class__: com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData
}
com.nick.spongebob.chopping_block.ui.transitions = {}
com.nick.spongebob.chopping_block.ui.transitions.TransitionBase = function(pAssetId,pHiddenAtStart,pOutOnly,pTransitionId) {
	if(pTransitionId == null) pTransitionId = "";
	if(pOutOnly == null) pOutOnly = false;
	if(pHiddenAtStart == null) pHiddenAtStart = true;
	this._STATE_OUT = 3;
	this._STATE_IDLE = 2;
	this._STATE_IN = 1;
	this._STATE_HIDDEN = 0;
	this._transitionId = pTransitionId;
	this._flagOutOnly = pOutOnly;
	this.flagDispose = false;
	com.nick.spongebob.chopping_block.ui.UserInterfaceElement.call(this,0,0,1000,pAssetId);
	if(pHiddenAtStart) this._setState(this._STATE_HIDDEN); else if(this._flagOutOnly) this._setState(this._STATE_OUT); else this._setState(this._STATE_IN);
};
$hxClasses["com.nick.spongebob.chopping_block.ui.transitions.TransitionBase"] = com.nick.spongebob.chopping_block.ui.transitions.TransitionBase;
com.nick.spongebob.chopping_block.ui.transitions.TransitionBase.__name__ = ["com","nick","spongebob","chopping_block","ui","transitions","TransitionBase"];
com.nick.spongebob.chopping_block.ui.transitions.TransitionBase.__super__ = com.nick.spongebob.chopping_block.ui.UserInterfaceElement;
com.nick.spongebob.chopping_block.ui.transitions.TransitionBase.prototype = $extend(com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.dispose.call(this);
		this._mc = null;
	}
	,_setState: function(pState) {
		this._state = pState;
		switch(this._state) {
		case this._STATE_HIDDEN:
			this.hide();
			break;
		case this._STATE_IN:
			break;
		case this._STATE_IDLE:
			break;
		case this._STATE_OUT:
			break;
		}
	}
	,show: function() {
		this._mc.set_visible(true);
	}
	,hide: function() {
		this._mc.set_visible(false);
	}
	,start: function() {
		this.show();
		this._setState(this._STATE_IN);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.ui.UserInterfaceElement.prototype.update.call(this,dt);
	}
	,_getIsOutro: function() {
		return this._state == this._STATE_OUT;
	}
	,__class__: com.nick.spongebob.chopping_block.ui.transitions.TransitionBase
});
com.nick.spongebob.chopping_block.world = {}
com.nick.spongebob.chopping_block.world.World = function(inTimeline,inFlagNewGame) {
	this._timerEaster = 0;
	this._timerDecreaseGoldMode = 15;
	this._timerDecreaseMeter = 10;
	this._timerPowerUp = 10;
	this._stages = 0;
	this._points = 1;
	this._flagGoldOn = false;
	this._flagOn = false;
	this._flagGoldMode = false;
	this._flagLose = true;
	this._flagStartPowerUpTimer = false;
	this._flagItemsDestroyed = false;
	this._flagPressedDown = false;
	com.workinman.utils.WorkinCloud.instance.log("World Created!");
	this._timeline = inTimeline;
	this._flagNewGame = inFlagNewGame;
	this._generate();
};
$hxClasses["com.nick.spongebob.chopping_block.world.World"] = com.nick.spongebob.chopping_block.world.World;
com.nick.spongebob.chopping_block.world.World.__name__ = ["com","nick","spongebob","chopping_block","world","World"];
com.nick.spongebob.chopping_block.world.World.prototype = {
	handleInput: function(pEvent) {
		switch(pEvent.input) {
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK:
			if(pEvent.phase == 1) {
				this._prevX = pEvent.x;
				this._prevY = pEvent.y;
			} else if(pEvent.phase == 0) {
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_SPACE:
			if(pEvent.phase == 1) {
			} else {
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_DOWN:
			if(pEvent.phase == 0) {
			} else {
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_UP:
			if(pEvent.phase == 0) {
			} else {
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_RIGHT:
			if(pEvent.phase == 0) {
			} else {
			}
			break;
		case com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_LEFT:
			if(pEvent.phase == 0) {
			} else {
			}
			break;
		}
	}
	,_unpause: function() {
		com.workinman.utils.WorkinCloud.instance.setValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED,false);
	}
	,_pause: function() {
		com.workinman.utils.WorkinCloud.instance.setValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED,true);
	}
	,_onUnpause: function(pEvent) {
		this._unpause();
		if(this._flagHasMusic) this._doPlaySound(this._music);
	}
	,_onPause: function(pEvent) {
		this._pause();
	}
	,_doDisposeMusic: function() {
		if(!this._flagHasMusic) return;
		this._music.dispose();
		this._music = null;
		this._flagHasMusic = false;
	}
	,_doDisposeSound: function(pSoundDef) {
	}
	,_doPlaySound: function(p) {
	}
	,_onEventSpeedBoost: function(pEvent) {
		var tBoostEffect = new com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic({ assetAnimate : "elements/AssetEffectSpeedBoost.png", x : 0, y : 0, screenlock : true, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, type : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_EFFECT, columns : 4, rows : 5});
		this._addElement(tBoostEffect);
	}
	,_onEventScreenShake: function(pEvent) {
		this._timerScreenShake = 0.4;
		if(this._flagIsMaxCombo) this._screenShakeMagnitude = 3; else if(this._flagGoldMode) this._screenShakeMagnitude = 3; else this._screenShakeMagnitude = 3;
	}
	,_onEventSlowMotion: function(pEvent) {
		if(this._timerFreezeFrame > 0) return;
		this._timerSlowMotion = pEvent._getData();
	}
	,_onEventFreezeFrame: function(pEvent) {
		this._timerFreezeFrame = pEvent._getData();
		this._timerSlowMotion = 0;
	}
	,_removeEventListeners: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_PAUSE,$bind(this,this._onPause));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UNPAUSE,$bind(this,this._onUnpause));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_FREEZE_FRAME,$bind(this,this._onEventFreezeFrame));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SLOW_MOTION,$bind(this,this._onEventSlowMotion));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE,$bind(this,this._onEventScreenShake));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SPEED_BOOST,$bind(this,this._onEventSpeedBoost));
	}
	,_addEventListeners: function() {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_PAUSE,$bind(this,this._onPause));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UNPAUSE,$bind(this,this._onUnpause));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_FREEZE_FRAME,$bind(this,this._onEventFreezeFrame));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SLOW_MOTION,$bind(this,this._onEventSlowMotion));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE,$bind(this,this._onEventScreenShake));
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SPEED_BOOST,$bind(this,this._onEventSpeedBoost));
	}
	,render: function() {
		var tI = 0;
		while(tI < this._elements.length) {
			this._elements[tI].renderPosition(this._camera);
			tI++;
		}
		this._elementManager.renderElements();
	}
	,getCameraPlayerOffsetY: function() {
		return 250;
	}
	,_nextLevel: function() {
		if(this._currentLevel < 3) com.workinman.utils.WorkinCloud.instance.modifyIntegerValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL,1); else com.workinman.utils.WorkinCloud.instance.setInteger(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL,1);
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_LEVEL));
	}
	,_resetGoldTimer: function() {
		this._timerDecreaseGoldMode = 15;
	}
	,_resetDecreaseMeter: function() {
		this._timerDecreaseMeter = 10;
	}
	,_startPowerUpTimer: function(dt) {
		if(this._flagStartPowerUpTimer) {
			this._timerPowerUp -= dt;
			if(this._timerPowerUp < 0) {
				console.log("[World] power up timer is finished");
				this._timerPowerUp = 10;
				this._flagStartPowerUpTimer = false;
				this._squidward.setState(0);
			}
		}
	}
	,_startComboTimer: function() {
		this._timerCombo = 10;
	}
	,_randomPosition: function() {
		var randomFloat = com.workinman.utils.WorkinUtils.getRandom(1,2);
		if(randomFloat == 1) return this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X; else return this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X;
	}
	,_obstacleHit: function(pObs) {
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/hit");
		if(this._timerCombo > 0 && pObs.isKillable()) {
			if(this._flagIsMaxCombo) this._squidward.setState(3); else this._increaseComboMeter();
			this._addScore(pObs.getPoints());
			this._spawnParticles(pObs.pos.x + 100,pObs.pos.y,pObs);
			this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
			this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
			if(pObs.getScale() == 1.0) {
				this._counterNumberHits++;
				this._spawnPlayerComboBurst(6);
				this._startComboTimer();
			} else this._spawnPlayerComboBurst(3,pObs.pos.x + com.workinman.utils.WorkinUtils.getRandom(-100,100),pObs.pos.y - com.workinman.utils.WorkinUtils.getRandom(100,150));
			if(pObs.getImageType() == 1 || pObs.getImageType() == 5) com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/rock_break"); else com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/wood_smash");
		} else if(!pObs.isKillable()) {
			if(this._flagIsMaxCombo) {
				this._squidward.setState(3);
				this._addScore(pObs.getPoints());
				this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
				this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
			} else {
				this._decreaseComboMeter(1);
				this._squidward.takeLife();
				this._squidwardArm.takeLife();
				this._flagComboStarted = false;
				this._spawnPlayerComboBurst(4,pObs.pos.x - com.workinman.utils.WorkinUtils.getRandom(100,150),pObs.pos.y - com.workinman.utils.WorkinUtils.getRandom(100,150));
				this._addElement(new com.nick.spongebob.chopping_block.world.elements.RedFlash({ camera : this._camera, transition : 1}));
			}
		} else if(pObs.isKillable()) {
			if(this._flagIsMaxCombo) this._squidward.setState(3); else this._increaseComboMeter();
			this._addScore(pObs.getPoints());
			this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
			this._spawnPlayerComboBurst(5,this._camera._getPos().x + 255,this._camera._getPos().y - 55);
			this._spawnParticles(pObs.pos.x + 100,pObs.pos.y,pObs);
			if(pObs.getScale() == 1.0) {
				this._counterNumberHits = 0;
				this._counterNumberHits++;
				this._startComboTimer();
			} else this._spawnPlayerComboBurst(3,pObs.pos.x + com.workinman.utils.WorkinUtils.getRandom(-100,100),pObs.pos.y - com.workinman.utils.WorkinUtils.getRandom(100,150));
			if(pObs.getImageType() == 1 || pObs.getImageType() == 5) com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/rock_break"); else com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/wood_smash");
		}
		if((this._state == com.nick.spongebob.chopping_block.world.World._STATE_DASHING || this._state == com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_CHOP || this._flagIsMaxCombo) && pObs.isKillable()) pObs.setHealth(1); else if(this._flagIsMaxCombo) pObs.setHealth(1); else if(this._flagGoldMode) pObs.setHealth(2);
		if(pObs.getDamageState() < pObs.getHealth()) this._spawnObstacle(pObs.pos.x,pObs.isKillable(),pObs.getDamageState() + 1,true,pObs,pObs.getScale()); else {
			if(pObs.isKillable() && this._state == com.nick.spongebob.chopping_block.world.World._STATE_PLAYING) {
				com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,-1);
				this._spawnObstacle(this._randomPosition(),true,1,false,null,1.0);
				this._spawnPlayerComboBurst(3,pObs.pos.x + com.workinman.utils.WorkinUtils.getRandom(-100,100),pObs.pos.y - com.workinman.utils.WorkinUtils.getRandom(100,150));
			}
			if(pObs.isKillable()) this._spawnDust(pObs.pos.x,pObs.pos.y); else this._spawnDust(pObs.pos.x,pObs.pos.y + 50);
			if(this._flagGoldMode && this._flagIsMaxCombo) {
				this._spawnDust(pObs.pos.x - 100,pObs.pos.y);
				this._spawnDust(pObs.pos.x + 100,pObs.pos.y);
				this._spawnDust(pObs.pos.x,pObs.pos.y - 50);
				this._spawnDust(pObs.pos.x + 50,pObs.pos.y - 100);
				this._spawnDust(pObs.pos.x,pObs.pos.y + 100);
			} else if(this._flagGoldMode || this._flagIsMaxCombo) {
				this._spawnDust(pObs.pos.x - 100,pObs.pos.y - 25);
				this._spawnDust(pObs.pos.x + 100,pObs.pos.y - 10);
				this._spawnDust(pObs.pos.x,pObs.pos.y - 50);
			}
			this._flagItemsDestroyed = true;
		}
		pObs.damageObstacle();
	}
	,_spongeBobHit: function(pObs) {
		pObs.setState(3);
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/hit");
		if(pObs.isKillable()) {
			this._increaseComboMeter();
			this._addScore(5);
			this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
			this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
		} else if(this._flagIsMaxCombo) {
			this._addScore(5);
			this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
			this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
			this._squidward.setState(3);
		} else {
			this._decreaseComboMeter(1);
			this._squidward.takeLife();
			this._squidwardArm.takeLife();
			this._flagComboStarted = false;
			this._spawnPlayerComboBurst(4,pObs.pos.x - com.workinman.utils.WorkinUtils.getRandom(100,150),pObs.pos.y - com.workinman.utils.WorkinUtils.getRandom(100,150));
			this._addElement(new com.nick.spongebob.chopping_block.world.elements.RedFlash({ camera : this._camera, transition : 1}));
		}
	}
	,_jellyFishHit: function(pObs) {
		pObs.setState(3);
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/hit");
		if(this._flagIsMaxCombo) {
		} else this._increaseComboMeter();
		this._addScore(2);
		this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
		this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
	}
	,_decreaseComboMeter: function(pAmount) {
		if(pAmount == null) pAmount = 0.001;
		this._flagIsMaxCombo = false;
		var combo = com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO);
		if(combo + pAmount > 0) {
			pAmount = -combo;
			com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,0);
		} else com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,pAmount);
	}
	,_increaseComboMeter: function(pAmount) {
		if(pAmount == null) pAmount = -0.15;
		var combo = com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO);
		if(this._flagGoldMode && pAmount == -0.15) pAmount = -0.3;
		if(combo + pAmount < -0.9) {
			var difference = -1 - combo;
			com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,difference);
			this._flagIsMaxCombo = true;
			if(this._squidward.didLose()) {
			} else if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_DASHING || this._state == com.nick.spongebob.chopping_block.world.World._STATE_PLAYING) {
				this._squidward.setState(3);
				this._squidwardArm.setState(3);
			} else {
			}
		} else {
			if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_DASHING) pAmount = -0.15; else pAmount = -0.1;
			com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO,pAmount);
		}
	}
	,_getTrickValue: function(pObjectPoints) {
		if(this._flagIsMaxCombo && this._flagGoldMode == false) this._points = pObjectPoints * 2; else if(this._flagGoldMode && this._flagIsMaxCombo == false) this._points = pObjectPoints * 2; else if(this._flagGoldMode && this._flagIsMaxCombo) this._points = pObjectPoints * 3; else this._points = pObjectPoints;
		if(this._flagStartPowerUpTimer) this._points *= 2;
		return this._points;
	}
	,_addScore: function(pObjectPoints) {
		com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE,this._getTrickValue(pObjectPoints));
	}
	,_upgradeCollected: function(pObs) {
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/upgrade_collect");
		if(pObs.getDamageState() == 1) switch(pObs.powerUp()) {
		case 1:
			this._flagStartPowerUpTimer = true;
			this._spawnSandy(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,1);
			if(this._flagIsMaxCombo) {
			} else this._squidward.setState(2);
			break;
		case 2:
			this._squidward.giveLife();
			this._spawnSandy(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,2);
			break;
		case 3:
			this._spawnSandy(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,3);
			if(this._flagIsMaxCombo) {
				this._resetDecreaseMeter();
				this._squidward.setState(3);
			} else this._increaseComboMeter(-1);
			break;
		}
		this._addScore(10);
		this._spawnPlayerComboBurst(2,this._camera._getPos().x + 200,this._camera._getPos().y - 100);
		this._spawnPlayerComboBurst(5,this._camera._getPos().x + 260,this._camera._getPos().y - 55);
		if(pObs.getDamageState() < pObs.getHealth() && this._flagIsMaxCombo == false) this._spawnUpgrade(pObs.pos.x,pObs.pos.y,true,pObs.getDamageState() + 1,pObs.getImageType()); else this._spawnDust(pObs.pos.x,pObs.pos.y + 10);
		if(this._flagGoldMode && this._flagIsMaxCombo) {
			this._spawnDust(pObs.pos.x - 100,pObs.pos.y);
			this._spawnDust(pObs.pos.x + 100,pObs.pos.y);
			this._spawnDust(pObs.pos.x,pObs.pos.y - 50);
			this._spawnDust(pObs.pos.x + 50,pObs.pos.y - 100);
			this._spawnDust(pObs.pos.x,pObs.pos.y + 100);
		} else if(this._flagGoldMode || this._flagIsMaxCombo) {
			this._spawnDust(pObs.pos.x - 100,pObs.pos.y - 25);
			this._spawnDust(pObs.pos.x + 100,pObs.pos.y - 10);
			this._spawnDust(pObs.pos.x,pObs.pos.y - 50);
		}
		pObs.doDelete = true;
	}
	,_removeElementAtIndex: function(pIndex) {
		this._elements[pIndex].dispose();
		this._viewport.removeChild(this._elements[pIndex]);
		this._elements[pIndex].disposeDisplay();
		this._elements.splice(pIndex,1);
	}
	,_addElement: function(pElement) {
		this._elements.push(pElement);
		pElement.renderPosition(this._camera);
		this._viewport.addChild(pElement);
	}
	,_handleInput: function(dt) {
		if(flambe.System.get_pointer().isDown()) {
			if(this._prevX < 90 && this._prevY < 90) return;
			if(this._flagPressedDown) this._flagUserIsSwiping = com.workinman.events.WMGestures.instance._didUserSwipe(this._prevX,this._prevY); else {
				this._flagPressedDown = true;
				com.workinman.events.WMGestures.instance._startingPoints(this._prevX,this._prevY);
			}
			if(this._timerChop < 0 && this._flagPressedDown && (this._prevX > 90 && this._prevY > 90) && this._squidward.didLose() == false) {
				this._timerChop = 0.4;
				this._boxCollider.setChopping(true);
				if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_DASHING) {
					if(this._boxCollider.isChopping()) {
						this._squidward.setChopDestination(this._prevX,this._prevY,false);
						this._squidward.karateChop();
						this._squidwardArm.karateChop(this._prevX,false);
						this._squidward.setRight();
						this._squidwardArm.setRight();
					}
				} else {
					if(this._prevX > com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) this._boxCollider.setDirection(true); else this._boxCollider.setDirection(false);
					if(this._boxCollider.isChopping()) {
						this._squidward.setChopDestination(this._prevX,this._prevY);
						this._squidward.karateChop();
						this._squidwardArm.karateChop(this._prevX);
					}
				}
			} else if(this._flagUserIsSwiping && this._timerChop > 0) {
			}
		} else {
			this._flagPressedDown = false;
			this._flagUserIsSwiping = false;
		}
	}
	,_easterEggCheat: function(dt) {
		if(flambe.System.get_pointer().isDown()) {
			if(this._prevX > 480 && this._prevX < 630 && this._prevY > 45 && this._prevY < 70) {
				this._timerEaster += dt;
				if(this._timerEaster > 0.5 && this._flagGoldMode == false && this._squidward.didLose() == false) {
					this._timerEaster = 0;
					console.log("[World] held down long enough switching to gold mode!!");
					com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE,true);
					this._flagGoldMode = true;
					this._timerEaster = 0;
					this._squidward.setState(0);
				}
			}
		}
	}
	,_setSpeed: function() {
		if(this._speed_dashing < 900) this._speed_dashing += 50;
		return this._speed_dashing;
	}
	,_updateCooldowns: function(dt) {
		if(this._flagGoldMode) {
			this._timerDecreaseGoldMode -= dt;
			if(this._flagGoldOn == false) {
				this._goldOverlay = new com.nick.spongebob.chopping_block.world.elements.RageOverLay({ layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, camera : this._camera, mode : 1});
				this._addElement(this._goldOverlay);
				this._flagGoldOn = true;
			}
			if(this._timerDecreaseGoldMode < 0) {
				if(this._flagGoldOn) {
					this._goldOverlay.doDelete = true;
					this._flagGoldOn = false;
				}
				com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE,false);
				this._resetGoldTimer();
				this._squidward.setState(0);
				this._flagGoldMode = false;
			}
		}
		if(this._flagIsMaxCombo) {
			this._timerDecreaseMeter -= dt;
			if(this._flagOn == false) {
				this._rageOverLay = new com.nick.spongebob.chopping_block.world.elements.RageOverLay({ layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, camera : this._camera});
				this._addElement(this._rageOverLay);
				this._flagOn = true;
			}
			if(this._timerDecreaseMeter < 0) {
				if(this._flagOn) {
					this._rageOverLay.doDelete = true;
					this._flagOn = false;
				}
				this._decreaseComboMeter(1);
				this._squidward.setState(0);
				this._squidwardArm.setState(0);
				this._resetDecreaseMeter();
			}
		} else this._decreaseComboMeter();
		if(this._timerCombo > -1) this._timerCombo -= dt;
		if(this._timerChop > -1) this._timerChop -= dt;
		if(this._flagStartPowerUpTimer) this._startPowerUpTimer(dt);
		if(this._squidward.getAnimationComplete() && this._squidwardArm.getAnimationComplete()) this._flagAnimationComplete = true; else this._flagAnimationComplete = false;
	}
	,_doElementPlayerCollision: function(pElement,dt) {
		var _boxBounds = flambe.display.Sprite.getBounds(this._boxCollider._getEntity());
		var _ObsBounds = flambe.display.Sprite.getBounds(pElement._getEntity());
		if(pElement.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE) {
			var pObs = js.Boot.__cast(pElement , com.nick.spongebob.chopping_block.world.elements.Obstacle);
			if(_boxBounds.contains(_ObsBounds.x,_ObsBounds.y) && pObs.isOffCoolDown() && pObs.isKillable()) {
				if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_PLAYING) com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
				this._obstacleHit(pObs);
			} else if(_boxBounds.contains(_ObsBounds.x + 10,_ObsBounds.y) && pObs.isOffCoolDown() && pObs.isKillable() == false) {
				if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_PLAYING) com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
				this._obstacleHit(pObs);
			}
		} else if(pElement.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_UPGRADE) {
			if(_boxBounds.contains(_ObsBounds.x,_ObsBounds.y) && pElement.isOffCoolDown()) {
				if(this._state == com.nick.spongebob.chopping_block.world.World._STATE_PLAYING) com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
				this._upgradeCollected(js.Boot.__cast(pElement , com.nick.spongebob.chopping_block.world.elements.Upgrade));
			}
		} else if(pElement.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) {
			var sponge = js.Boot.__cast(pElement , com.nick.spongebob.chopping_block.world.elements.SpongeBob);
			_ObsBounds = sponge.getCustomBounds();
			if(sponge.canHit() && _boxBounds.contains(_ObsBounds.x,_ObsBounds.y) && sponge.gotHit() == false) this._spongeBobHit(sponge);
		} else if(pElement.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_JELLYFISH) {
			var jelly = js.Boot.__cast(pElement , com.nick.spongebob.chopping_block.world.elements.Jellyfish);
			_ObsBounds = flambe.display.Sprite.getBounds(jelly._getEntity());
			if(_boxBounds.contains(_ObsBounds.x,_ObsBounds.y) && jelly.gotHit() == false) this._jellyFishHit(jelly);
		}
	}
	,_doElementElementCollision: function(pArray,pObstacle,dt) {
		var _j = 0;
		while(_j < pArray.length) {
			if(pArray[_j].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE && pArray[_j] != pObstacle) {
				var _ObsBounds2 = js.Boot.__cast(pArray[_j] , com.nick.spongebob.chopping_block.world.elements.Obstacle);
				if(!_ObsBounds2.isKillable() && _ObsBounds2.getImageType() == 1) {
				} else if(_ObsBounds2.isKillable() && _ObsBounds2.getImageType() == 6) {
				} else if(pObstacle.testCollision(_ObsBounds2.pos.x,_ObsBounds2.pos.y) && pObstacle.pos.x != _ObsBounds2.pos.x) {
					if(pObstacle.pos.x < _ObsBounds2.pos.x) {
						pObstacle.pos.x -= 100 * dt;
						_ObsBounds2.pos.x += 100 * dt;
					} else if(pObstacle.pos.x > _ObsBounds2.pos.x) {
						pObstacle.pos.x += 100 * dt;
						_ObsBounds2.pos.x -= 100 * dt;
					}
				}
			}
			_j++;
		}
	}
	,_countdown: function(dt,timer) {
		switch(this._currentLevel) {
		case com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL:
			if(timer > 8 && timer < 9 && this._tempFlag1) this._tempFlag1 = false;
			break;
		case com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL:
			if(timer > 10 && timer < 11 && this._tempFlag1) this._tempFlag1 = false;
			break;
		case com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL:
			if(timer > 13 && timer < 14 && this._tempFlag1) this._tempFlag1 = false;
			break;
		default:
		}
		if(timer > 2 && timer < 3 && this._tempFlag2) {
			com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
			this._spawnUserIndicators(this._camera._getPos().x - 90,this._camera._getPos().y - 130,3,0.75);
			this._tempFlag2 = false;
		} else if(timer > 1 && timer < 2 && this._tempFlag3) {
			com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
			this._spawnUserIndicators(this._camera._getPos().x - 90,this._camera._getPos().y - 130,4,0.75);
			this._tempFlag3 = false;
		} else if(timer > 0 && timer < 1 && this._tempFlag4) {
			com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
			this._spawnUserIndicators(this._camera._getPos().x - 90,this._camera._getPos().y - 130,5,0.75);
			this._tempFlag4 = false;
		}
	}
	,update: function(dt) {
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED)) return;
		if(dt > .15) dt = .15;
		if(this._timerFreezeFrame > 0) {
			this._timerFreezeFrame -= dt;
			if(this._timerFreezeFrame > 0) dt = 0;
		}
		if(this._timerSlowMotion > 0) {
			this._timerSlowMotion -= dt;
			if(this._timerSlowMotion > 0) dt /= 3;
		}
		this._elementManager.updateElements(dt);
		var _i = 0;
		while(_i < this._elements.length) {
			if(this._elements[_i].getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER && this._elements[_i].getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_i].update(dt);
			this._doElementPlayerCollision(this._elements[_i],dt);
			if(this._elements[_i].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE) {
				var _ObsBounds1 = js.Boot.__cast(this._elements[_i] , com.nick.spongebob.chopping_block.world.elements.Obstacle);
				if(!_ObsBounds1.isKillable() && _ObsBounds1.getImageType() == 1) {
				} else if(_ObsBounds1.isKillable() && _ObsBounds1.getImageType() == 6) {
				} else this._doElementElementCollision(this._elements,_ObsBounds1,dt);
			}
			if(this._elements[_i].doDelete) this._removeElementAtIndex(_i); else if(this._elements[_i].sorted == false) this._elements[_i].sorted = true;
			_i++;
		}
		if(this._timerScreenShake > 0) {
			this._timerScreenShake -= dt;
			this._camera._getPos().x += com.workinman.utils.WorkinUtils.getRandom(-this._screenShakeMagnitude,this._screenShakeMagnitude,false);
			this._camera._getPos().y += com.workinman.utils.WorkinUtils.getRandom(-this._screenShakeMagnitude,this._screenShakeMagnitude,false);
		}
		if(this._squidward.didLose() && this._flagLose) {
			this._setState(com.nick.spongebob.chopping_block.world.World._STATE_GAME_OVER);
			this._flagLose = false;
		}
		this._updateCooldowns(dt);
		this._easterEggCheat(dt);
		this._camera._getPos().y = this._squidward.pos.y + this.getCameraPlayerOffsetY();
		switch(this._state) {
		case com.nick.spongebob.chopping_block.world.World._STATE_START_UP:
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			if(this._timerCountdown > 3 && this._timerCountdown < 4 && this._tempFlag1) {
				com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
				this._spawnUserIndicators(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y,3);
				this._tempFlag1 = false;
			} else if(this._timerCountdown > 2 && this._timerCountdown < 3 && this._tempFlag2) {
				com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
				this._spawnUserIndicators(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y,4);
				this._tempFlag2 = false;
			} else if(this._timerCountdown > 1 && this._timerCountdown < 2 && this._tempFlag3) {
				com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/countdown");
				this._spawnUserIndicators(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y,5);
				this._tempFlag3 = false;
			} else if(this._timerCountdown > 0 && this._timerCountdown < 1 && this._tempFlag4) {
				com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/go");
				this._spawnUserIndicators(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 250,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y,6);
				this._tempFlag4 = false;
			}
			this._timerCountdown -= dt;
			if(this._timerCountdown < 0) {
				if(this._flagNewGame) this._setState(com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION); else this._setState(com.nick.spongebob.chopping_block.world.World._STATE_DASHING);
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION:
			this._camera._getPos().x += com.nick.spongebob.chopping_block.world.World._TRANSITION_SPEED * dt;
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			this._timerDash -= dt;
			if(this._timerDash < 0) {
				if(this._currentState == "tutorial chop") this._setState(com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_CHOP); else if(this._currentState == "tutorial avoid") this._setState(com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_AVOID); else this._setState(com.nick.spongebob.chopping_block.world.World._STATE_NEXT_LEVEL);
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_DASHING:
			com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SPEED,this._speed_dashing);
			this._camera._getPos().x += this._speed_dashing * dt;
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			this._handleInput(dt);
			if(this._timerDash > 2.5) {
				this._counterPhaseDistance -= 10;
				if(this._counterPhaseDistance < 0) this._runSpawnPhase(this._spawnPhaseNext);
			}
			this._timerDash -= dt;
			if(this._timerDash < 0) this._setState(com.nick.spongebob.chopping_block.world.World._STATE_WAITING);
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_CHOP:
			this._handleInput(dt);
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			if(this._flagPressedDown) this._userIndicators.removeIndicator();
			if(this._flagItemsDestroyed) this._setState(com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION);
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_AVOID:
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			this._timerPlaying -= dt;
			this._handleInput(dt);
			if(this._flagPressedDown) this._userIndicators.removeIndicator();
			if(this._timerPlaying < 0) {
				this._runSpawnPhase(com.nick.spongebob.chopping_block.world.World._SPAWN_PHASE_OBSTACLES);
				this._setState(com.nick.spongebob.chopping_block.world.World._STATE_DASHING);
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_WAITING:
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			this._timerPlaying -= dt;
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			if(this._timerPlaying < 0) this._setState(com.nick.spongebob.chopping_block.world.World._STATE_PLAYING);
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_PLAYING:
			com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SPEED,0);
			this._timerPlaying -= dt;
			this._handleInput(dt);
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			this._countdown(dt,this._timerPlaying);
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			if(this._timerPlaying < 0) {
				if(com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED) > 0 && this._squidward.didLose() == false) {
					this._squidward.loseGame();
					this._setState(com.nick.spongebob.chopping_block.world.World._STATE_GAME_OVER);
				} else if(this._stages < 0) this._setState(com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION); else this._setState(com.nick.spongebob.chopping_block.world.World._STATE_DASHING);
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_NEXT_LEVEL:
			this._timerDash -= dt;
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			this._boxCollider.update(dt);
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			if(this._timerDash > 0 && this._timerDash < 1 && this._tempFlag1 == false) {
				this._transition(2);
				this._tempFlag1 = true;
			}
			if(this._timerDash < 0) this._nextLevel();
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_GAME_OVER:
			this._timerPlaying -= dt;
			this._squidward.update(dt);
			this._squidwardArm.update(dt);
			var _t = 0;
			while(_t < this._elements.length) {
				if(this._elements[_t].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB) this._elements[_t].update(dt);
				_t++;
			}
			if(this._timerPlaying < 0 && this._tempFlag1 == false) {
				this._transition(3);
				this._tempFlag1 = true;
			}
			break;
		}
	}
	,dispose: function() {
		while(this._elements.length > 0) this._removeElementAtIndex(this._elements.length - 1);
		this._elements = null;
		while(this._sound.length > 0) {
			this._doDisposeSound(this._sound[0]);
			this._sound.shift();
		}
		this._poolManager.dispose();
		this._poolManager = null;
		this._doDisposeMusic();
		this._sound = null;
		this._music = null;
		this._camera = null;
		this._timeline = null;
		this._removeEventListeners();
	}
	,_runSpawnPhase: function(pPhase,pNextPhase) {
		if(pNextPhase == null) pNextPhase = 0;
		this._spawnPhase = pPhase;
		this._spawnPhaseNext = pNextPhase;
		switch(this._spawnPhase) {
		case com.nick.spongebob.chopping_block.world.World._SPAWN_PHASE_OBSTACLES:
			this._counterPhaseDistance = this._spawnObstacleCourse();
			if(this._spawnPhaseNext == 0) this._spawnPhaseNext = com.nick.spongebob.chopping_block.world.World._SPAWN_PHASE_OBSTACLES;
			break;
		}
	}
	,_calculatePickupY: function() {
		return 800;
	}
	,_calculateObstacleSpacing: function() {
		return com.workinman.utils.WorkinUtils.getRandom(325,335);
	}
	,_spawnObstacleCourse: function() {
		var txOrigin = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + this._camera._getPos().x;
		var txOffset = 0;
		var tSpacing = this._calculateObstacleSpacing();
		var tPattern = new Array();
		var tPatterns = new Array();
		var score = com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE);
		if(this._speed_dashing <= 700) {
			tPatterns.push(["_","_","X","_"]);
			tPatterns.push(["x","_","X","_"]);
			tPatterns.push(["_","X","X","X"]);
			tPatterns.push(["_","X","X","_"]);
		} else if(this._speed_dashing <= 800) {
			tPatterns.push(["x","X","_","*"]);
			tPatterns.push(["_","X","x","X"]);
			tPatterns.push(["X","Y","_","_"]);
			tPatterns.push(["X","_","X","x"]);
		} else {
			tPatterns.push(["X","X","x","*"]);
			tPatterns.push(["x","X","X","X"]);
			tPatterns.push(["x","x","X","X"]);
			tPatterns.push(["X","X","Y","X"]);
			tPatterns.push(["X","Y","X","x"]);
			tPatterns.push(["x","X","x","x"]);
		}
		var tRand = Math.floor(Math.random() * tPatterns.length);
		if(tRand >= tPatterns.length) tRand = 0;
		var i = 0;
		while(i < tPatterns[tRand].length) {
			tPattern.push(tPatterns[tRand][i]);
			i++;
		}
		if(this._counterNumberHits > 50) {
			var tRand2 = Math.floor(Math.random() * tPatterns.length);
			if(tRand2 >= tPatterns.length) tRand2 = 0;
			i = 0;
			while(i < tPatterns[tRand2].length) {
				tPattern.push(tPatterns[tRand2][i]);
				i++;
			}
		}
		var i1 = 0;
		while(i1 < tPattern.length) {
			switch(tPattern[i1]) {
			case "X":
				this._spawnObstacle(txOrigin + txOffset,true,Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,1)),false);
				txOffset += tSpacing;
				break;
			case "x":
				this._spawnObstacle(txOrigin + txOffset,false,1,false);
				txOffset += tSpacing;
				break;
			case "Y":
				this._spawnSpongeBob(txOrigin + txOffset,Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,10)));
				txOffset += tSpacing;
				break;
			case "_":
				txOffset += tSpacing;
				break;
			case "*":
				this._spawnUpgrade(txOrigin + txOffset,this._calculatePickupY());
				txOffset += tSpacing;
				break;
			}
			i1++;
		}
		return txOffset;
	}
	,_getParticleAsset: function(tObs) {
		var _randomImageGenerator = 0;
		switch(tObs.getImageType()) {
		case 1:
			_randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,5));
			switch(_randomImageGenerator) {
			case 1:
				return "statue_particle1";
			case 2:
				return "statue_particle2";
			case 3:
				return "statue_particle3";
			case 4:
				return "statue_particle4";
			case 5:
				return "statue_particle5";
			default:
				return "";
			}
			break;
		case 2:
			_randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3));
			switch(_randomImageGenerator) {
			case 1:
				return "log_particle1";
			case 2:
				return "log_particle2";
			case 3:
				return "log_particle3";
			default:
				return "";
			}
			break;
		case 3:
			_randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,6));
			switch(_randomImageGenerator) {
			case 1:
				return "pineapple_particle1";
			case 2:
				return "pineapple_particle2";
			case 3:
				return "pineapple_particle3";
			case 4:
				return "pineapple_particle4";
			case 5:
				return "pineapple_particle5";
			case 6:
				return "pineapple_particle6";
			default:
				return "";
			}
			break;
		case 4:
			_randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3));
			switch(_randomImageGenerator) {
			case 1:
				return "board_particle1";
			case 2:
				return "board_particle2";
			case 3:
				return "board_particle3";
			default:
				return "";
			}
			break;
		case 5:
			_randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,5));
			switch(_randomImageGenerator) {
			case 1:
				return "block_particle1";
			case 2:
				return "block_particle2";
			case 3:
				return "block_particle3";
			case 4:
				return "block_particle4";
			case 5:
				return "block_particle5";
			default:
				return "";
			}
			break;
		default:
			return "";
		}
	}
	,_spawnParticles: function(pX,pY,pElement) {
		var i = 0;
		while(i < 15) {
			var tObs;
			if(pElement.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE) {
				var tempObs = js.Boot.__cast(pElement , com.nick.spongebob.chopping_block.world.elements.Obstacle);
				var offsetX = tempObs.pos.x - this._camera._getPos().x;
				var offsetY = tempObs.pos.y - this._camera._getPos().y;
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_X,offsetX);
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_Y,offsetY);
				tObs = this._poolManager.createElement("PARTICLES",{ asset : this._getParticleAsset(tempObs), x : pX, y : pY, layer : "test", bounceCount : true, comboState : com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MAX_COMBO), newVelocity : true});
			} else tObs = this._poolManager.createElement("PARTICLES",{ asset : "statue_particle1", x : pX, y : pY, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PARTICLES});
			com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PARTICLES_BOUNCE,true);
			this._particles.push(this._elementManager.addElement(tObs));
			i++;
		}
	}
	,_spawnObstacle: function(pX,pKill,pState,pDamagedItem,pObject,pScale) {
		if(pScale == null) pScale = 0.85;
		var tObs;
		if(pObject == null) pObject = new com.nick.spongebob.chopping_block.world.elements.Obstacle({ imageType : 1});
		if(pDamagedItem) {
			if(pKill) {
				if(pObject.getImageType() == 6) tObs = new com.nick.spongebob.chopping_block.world.elements.Obstacle({ x : pX, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - com.workinman.utils.WorkinUtils.getRandom(130,135), layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN, damageState : pState, flagFirstTime : false, imageType : pObject.getImageType(), camera : this._camera, scale : pScale}); else tObs = new com.nick.spongebob.chopping_block.world.elements.Obstacle({ x : pX, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - com.workinman.utils.WorkinUtils.getRandom(130,135), layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES, damageState : pState, flagFirstTime : false, imageType : pObject.getImageType(), camera : this._camera, scale : pScale, player : this._squidward});
			} else {
				tObs = new com.nick.spongebob.chopping_block.world.elements.ObstacleKiller({ x : pX, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE + 32, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN, damageState : pState, flagFirstTime : false, imageType : pObject.getImageType(), camera : this._camera, scale : pScale});
				tObs.addEffect("shimmer",10,0,100,2,1);
			}
			tObs.doBounce();
		} else if(pKill) tObs = new com.nick.spongebob.chopping_block.world.elements.Obstacle({ x : pX, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - com.workinman.utils.WorkinUtils.getRandom(130,135), layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES, damageState : pState, imageType : pObject.getImageType(), flagFirstTime : true, camera : this._camera, scale : pScale, player : this._squidward}); else tObs = new com.nick.spongebob.chopping_block.world.elements.ObstacleKiller({ x : pX, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 32, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN, damageState : pState, flagFirstTime : true, imageType : pObject.getImageType(), camera : this._camera, scale : pScale});
		this._addElement(tObs);
	}
	,_spawnUpgrade: function(pX,pY,pDamagedItem,pState,pImageType) {
		if(pImageType == null) pImageType = 1;
		if(pState == null) pState = 1;
		if(pDamagedItem == null) pDamagedItem = false;
		var tObs;
		if(pDamagedItem) {
			tObs = new com.nick.spongebob.chopping_block.world.elements.Upgrade({ x : pX, y : pY, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN, damageState : pState, flagFirstTime : false, imageType : pImageType});
			tObs.doBounce();
		} else tObs = new com.nick.spongebob.chopping_block.world.elements.Upgrade({ x : pX, y : pY, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN, flagFirstTime : true, imageType : pImageType, damageState : pState});
		this._addElement(tObs);
	}
	,_spawnBackgroundTile: function(pAssets,pY,pWidth,pScrollRatioX,pScrollRatioY,isForeground,isSecondTile) {
		if(isSecondTile == null) isSecondTile = false;
		var tBg;
		if(isForeground) tBg = new com.nick.spongebob.chopping_block.world.elements.BackgroundTile({ assets : pAssets, x : -10, y : 0, offset : pY, tilewidth : pWidth, scrollratiox : pScrollRatioX, scrollratioy : pScrollRatioY, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PLAYER, secondTile : isSecondTile}); else tBg = new com.nick.spongebob.chopping_block.world.elements.BackgroundTile({ assets : pAssets, x : 0, y : 0, offset : pY, tilewidth : pWidth, scrollratiox : pScrollRatioX, scrollratioy : pScrollRatioY, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_BG, secondTile : isSecondTile});
		this._addElement(tBg);
	}
	,_spawnSandy: function(pX,pImageType) {
		var sandy = new com.nick.spongebob.chopping_block.world.elements.Sandy({ x : pX, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_BG, imageType : pImageType});
		this._addElement(sandy);
	}
	,_spawnSpongeBob: function(pX,pType) {
		if(pType == 1) {
			var spongeBob = new com.nick.spongebob.chopping_block.world.elements.SpongeBob({ x : pX, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, imageType : pType, camera : this._camera});
			this._addElement(spongeBob);
		} else {
			var jellyfish = new com.nick.spongebob.chopping_block.world.elements.Jellyfish({ x : pX, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, imageType : pType, camera : this._camera, player : this._squidward});
			this._addElement(jellyfish);
		}
	}
	,_spawnUserIndicators: function(pX,pY,pType,pScale) {
		if(pScale == null) pScale = 1.0;
		this._userIndicators = new com.nick.spongebob.chopping_block.world.elements.UserIndicators({ x : pX, y : pY, imageType : pType, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, scale : pScale});
		this._userIndicators.addEffect("shakex",0.5,0,0.3,2,1);
		this._addElement(this._userIndicators);
	}
	,_spawnPlayerComboBurst: function(pType,pX,pY) {
		if(pY == null) pY = 0;
		if(pX == null) pX = 0;
		var tObs = new com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst({ x : pX, y : pY, imageType : pType, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, camera : this._camera, points : this._points, comboChain : this._counterNumberHits, currentState : this._state});
		this._addElement(tObs);
	}
	,_spawnDust: function(pX,pY) {
		var tObs = new com.nick.spongebob.chopping_block.world.elements.Dust({ x : pX, y : pY});
		this._addElement(tObs);
	}
	,_setPlayingStateFlag: function(pFlag) {
		com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING,pFlag);
		if(pFlag) {
			if(this._flagGameComplete) switch(this._currentLevel) {
			case com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(6,8));
				break;
			case com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(7,10));
				break;
			case com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(9,14));
				break;
			default:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(3,6));
			} else switch(this._currentLevel) {
			case com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(3,6));
				break;
			case com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(5,8));
				break;
			case com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(6,9));
				break;
			default:
				com.workinman.utils.WorkinCloud.instance.setFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED,com.workinman.utils.WorkinUtils.getRandom(3,6));
			}
		}
	}
	,_setState: function(pState) {
		if(this._state == pState) return;
		this._state = pState;
		switch(this._state) {
		case com.nick.spongebob.chopping_block.world.World._STATE_START_UP:
			this._tempFlag1 = true;
			this._tempFlag2 = true;
			this._tempFlag3 = true;
			this._tempFlag4 = true;
			this._squidward.doStand();
			if(this._flagNewGame) this._currentState = "tutorial chop"; else this._currentState = "playing";
			this._timerCountdown = com.nick.spongebob.chopping_block.world.World._DURATION_COUNTDOWN;
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION:
			this._flagItemsDestroyed = false;
			this._flagPressedDown = false;
			this._timerPlaying = 0;
			this._timerDash = com.nick.spongebob.chopping_block.world.World._DURATION_TRANSITION;
			this._squidward.setRight();
			this._boxCollider.setDirection(true);
			this._squidward.doDash();
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_CHOP:
			this._timerDash = 0;
			this._squidward.doStand();
			this._flagPressedDown = false;
			this._currentState = "tutorial avoid";
			this._spawnObstacle(1480,true,1,false,new com.nick.spongebob.chopping_block.world.elements.Obstacle({ imageType : 1}));
			this._spawnUserIndicators(1440,500,1);
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_AVOID:
			this._timerPlaying = 2;
			this._timerDash = 0;
			this._squidward.doStand();
			this._flagPressedDown = false;
			this._currentState = "playing";
			this._spawnObstacle(2200,false,1,false,new com.nick.spongebob.chopping_block.world.elements.Obstacle({ imageType : 1}));
			this._spawnUserIndicators(2200,800,2);
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_PLAYING:
			this._tempFlag1 = true;
			this._tempFlag2 = true;
			this._tempFlag3 = true;
			this._tempFlag4 = true;
			this._setPlayingStateFlag(true);
			switch(this._currentLevel) {
			case com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL:
				this._timerPlaying = com.nick.spongebob.chopping_block.world.World._DURATION_PLAYING;
				break;
			case com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL:
				this._timerPlaying = 12;
				break;
			case com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL:
				this._timerPlaying = 15;
				break;
			default:
				this._timerPlaying = com.nick.spongebob.chopping_block.world.World._DURATION_PLAYING;
			}
			this._timerDash = 0;
			this._flagPressedDown = false;
			this._flagItemsDestroyed = false;
			this._squidward.doStand();
			this._stages--;
			com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/go");
			this._spawnUserIndicators(this._camera._getPos().x - 225,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y - 40,7);
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_DASHING:
			this._setPlayingStateFlag(false);
			this._flagItemsDestroyed = false;
			this._flagPressedDown = false;
			this._speed_dashing = this._setSpeed();
			this._timerPlaying = 0;
			this._timerDash = com.nick.spongebob.chopping_block.world.World._DURATION_DASH;
			this._squidward.setRight();
			this._boxCollider.setDirection(true);
			this._squidward.doDash();
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_WAITING:
			this._timerDash = 0;
			this._flagPressedDown = false;
			this._flagItemsDestroyed = false;
			this._squidward.doStand();
			this._spawnObstacle(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,true,1,false,null,1.0);
			this._spawnObstacle(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + 350,true,1,false,null,1.0);
			this._spawnObstacle(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + 600,true,1,false,null,1.0);
			return;
		case com.nick.spongebob.chopping_block.world.World._STATE_NEXT_LEVEL:
			this._setPlayingStateFlag(false);
			this._flagItemsDestroyed = false;
			this._flagPressedDown = false;
			this._timerPlaying = 0;
			this._timerDash = 2;
			this._squidward.setRight();
			this._boxCollider.setDirection(true);
			this._squidward.doDashAway();
			break;
		case com.nick.spongebob.chopping_block.world.World._STATE_GAME_OVER:
			com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_COMPLETE,false);
			this._setPlayingStateFlag(false);
			this._squidward.setState(7);
			this._timerPlaying = 1.5;
			break;
		}
	}
	,_transition: function(pType) {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION));
		var _trans = new com.nick.spongebob.chopping_block.world.elements.Transition({ layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT - 120, camera : this._camera, imageType : pType});
		this._addElement(_trans);
	}
	,_generate: function() {
		this._viewport = new com.workinman.display.Viewport(this._timeline);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_BG);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PLAYER);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PARTICLES);
		this._elementManager = new com.workinman.display.ElementManager(this._timeline,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y);
		this._elementManager.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN);
		this._viewport.addLayer(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP);
		this._randomFloat = com.workinman.utils.WorkinUtils.getRandom(300,600);
		this._counterNumberHits = 0;
		this._timerChop = -1;
		this._screenShakeMagnitude = 3;
		this._elements = new Array();
		this._particles = new Array();
		this._sound = new Array();
		this._music = null;
		this._addEventListeners();
		this._camera = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y),new com.workinman.math.WorkinPoint(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y));
		this._transition(1);
		this._squidward = new com.nick.spongebob.chopping_block.world.elements.Squidward({ x : 0, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 500, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PLAYER, movie : "_squidward_chop", camera : this._camera});
		this._addElement(this._squidward);
		this._boxCollider = new com.nick.spongebob.chopping_block.world.elements.BoxCollider({ x : 425, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 500, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PLAYER, player : this._squidward});
		this._addElement(this._boxCollider);
		this._currentLevel = com.workinman.utils.WorkinCloud.instance.getInteger(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL);
		this._flagGameComplete = com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_COMPLETE);
		switch(this._currentLevel) {
		case com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL:
			this._spawnBackgroundTile("elements/krusty_krab/sb_squid_bg_kk_scene_02.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 535,1024,.4,.2,false);
			this._spawnBackgroundTile("elements/krusty_krab/sb_squid_bg_kk_scene_01.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 535,2048,.4,.2,false,true);
			if(this._flagGameComplete) {
				this._stages = 3;
				if(this._flagNewGame) this._speed_dashing = 750; else this._speed_dashing = 750;
			} else {
				this._stages = com.workinman.utils.WorkinUtils.getRandom(2,2);
				if(this._flagNewGame) this._speed_dashing = 650; else this._speed_dashing = 650;
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL:
			this._spawnBackgroundTile("elements/treedome_bg/sb_squid_bg_treedome_01_scene_2_b.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 535,1024,.4,.2,false);
			this._spawnBackgroundTile("elements/treedome_bg/sb_squid_bg_treedome_scene_1_b.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 535,2048,.4,.2,false,true);
			if(this._flagGameComplete) {
				this._stages = 4;
				this._speed_dashing = 750;
			} else {
				this._stages = com.workinman.utils.WorkinUtils.getRandom(3,3);
				this._speed_dashing = 700;
			}
			break;
		case com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL:
			this._spawnBackgroundTile("elements/alleyway/sb_squid_bg_alley_scene_02.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 625,1024,.4,.2,false);
			this._spawnBackgroundTile("elements/alleyway/sb_squid_bg_alley_scene_01.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 625,2048,.4,.2,false,true);
			if(this._flagGameComplete) {
				this._stages = 5;
				this._speed_dashing = 750;
			} else {
				this._stages = com.workinman.utils.WorkinUtils.getRandom(4,4);
				this._speed_dashing = 700;
			}
			com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_COMPLETE,true);
			break;
		default:
			this._spawnBackgroundTile("elements/alleyway/sb_squid_bg_alley_scene_02.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 625,1024,.4,.2,false);
			this._spawnBackgroundTile("elements/alleyway/sb_squid_bg_alley_scene_01.jpg",com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 625,2048,.4,.2,false);
			this._stages = com.workinman.utils.WorkinUtils.getRandom(2,2);
			this._speed_dashing = 500;
		}
		this._poolManager = new com.workinman.display.PoolManager();
		this._poolManager.addPool("PARTICLES",com.nick.spongebob.chopping_block.world.elements.Particles,15);
		this._spawnBackgroundTile("elements/table/sb_squid_karate_table.png",900,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH,1,1,true);
		this._squidwardArm = new com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm({ x : 0, y : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE - 500, layer : com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP, player : this._squidward, movie : "_arm_chop"});
		this._addElement(this._squidwardArm);
		this._timerProgress = -1;
		this._timerDash = 0;
		this._timerPlaying = com.nick.spongebob.chopping_block.world.World._DURATION_PLAYING;
		this._state = -1;
		this._setState(com.nick.spongebob.chopping_block.world.World._STATE_START_UP);
		if(!this._flagNewGame) this._runSpawnPhase(com.nick.spongebob.chopping_block.world.World._SPAWN_PHASE_OBSTACLES);
	}
	,__class__: com.nick.spongebob.chopping_block.world.World
}
com.workinman.display = {}
com.workinman.display.IPoolable = function() { }
$hxClasses["com.workinman.display.IPoolable"] = com.workinman.display.IPoolable;
com.workinman.display.IPoolable.__name__ = ["com","workinman","display","IPoolable"];
com.workinman.display.IPoolable.prototype = {
	__class__: com.workinman.display.IPoolable
}
com.workinman.display.Poolable = function(inData) {
	this._flagPooled = true;
	this._flagActive = false;
};
$hxClasses["com.workinman.display.Poolable"] = com.workinman.display.Poolable;
com.workinman.display.Poolable.__name__ = ["com","workinman","display","Poolable"];
com.workinman.display.Poolable.__interfaces__ = [com.workinman.display.IPoolable];
com.workinman.display.Poolable.prototype = {
	_setIsActive: function(inActive) {
		this._flagActive = inActive;
		return this._flagActive;
	}
	,_getIsActive: function() {
		return this._flagActive;
	}
	,_setIsPooled: function(inPooled) {
		this._flagPooled = inPooled;
		return this._flagPooled;
	}
	,_getIsPooled: function() {
		return this._flagPooled;
	}
	,dispose: function() {
		this.release();
	}
	,release: function() {
		this._flagActive = false;
	}
	,renew: function(inData) {
		this._flagActive = true;
	}
	,__class__: com.workinman.display.Poolable
}
com.nick.spongebob.chopping_block.world.elements = {}
com.nick.spongebob.chopping_block.world.elements.Element = function(inData) {
	this._flagItemCooldown = false;
	this._timerItemCoolDown = 0.5;
	this._flagShouldTakeLife = true;
	com.workinman.display.Poolable.call(this,inData);
	if(inData.overrideRenderPosition == true) this._flagOverrideRenderPosition = inData.overrideRenderPosition; else this._flagOverrideRenderPosition = false;
	if(inData.group) this.group = inData.group; else this.group = "";
	this.carriable = true;
	this._entity = new flambe.Entity();
	this._effects = new Array();
	this._textureEntity = new flambe.Entity();
	this._entity.addChild(this._textureEntity);
	this._texture = new flambe.display.Sprite();
	this._textureEntity.add(this._texture);
	this.pos = new com.workinman.math.WorkinPoint();
	this._velocity = new com.workinman.math.WorkinPoint();
	this._renderOffset = new com.workinman.math.WorkinPoint();
	this._scaleOffset = new com.workinman.math.WorkinPoint();
	this._renderOrigin = new com.workinman.math.WorkinPoint();
	this._render = new com.workinman.display.Renderable();
	this._uniqueId = com.workinman.data.ConstantsCloud.getUniqueId();
	if(inData.asset) {
		this.assetId = inData.asset;
		this._display = new flambe.display.ImageSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getTexture(this.assetId));
		this._entity.add(this._display);
	} else {
		this.assetId = "";
		this._display = new flambe.display.Sprite();
		this._entity.add(this._display);
	}
	this._toggleAlphaTimer = 0;
	this._toggleAlphaTimerReset = 0;
	this._toggleAlphaCount = 0;
	this.layer = this._defaultLayer();
	if(inData.layer) this.layer = inData.layer;
	var tOrigin = new com.workinman.math.WorkinPoint();
	if(inData.ox) tOrigin.x = inData.ox;
	if(inData.oy) tOrigin.y = inData.oy;
	this.setOrigin(tOrigin);
	this.pos.x = 0;
	this.pos.y = 0;
	if(inData.x) this.pos.x = inData.x;
	if(inData.y) this.pos.y = inData.y;
	this.registrationPos = new com.workinman.math.WorkinPoint(this.pos.x + this.registrationXOffset(),this.pos.y + this.registrationYOffset());
	if(inData.rot) this._display.rotation.set__(inData.rot);
	this._type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE;
	if(inData.type) this._type = inData.type;
	if(inData.imageType) this._imageType = inData.imageType;
	if(inData.damageState) this._damageState = inData.damageState;
	this._flagScaleOffsetChanged = false;
	this._sin = Std.random(100) / 100;
	this._shimmerRandomize();
	this._addEventListeners();
	this.doDelete = false;
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Element"] = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Element.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Element"];
com.nick.spongebob.chopping_block.world.elements.Element.__super__ = com.workinman.display.Poolable;
com.nick.spongebob.chopping_block.world.elements.Element.prototype = $extend(com.workinman.display.Poolable.prototype,{
	getDamageState: function() {
		return this._damageState;
	}
	,setHealth: function(pHealth) {
		this._health = pHealth;
	}
	,getHealth: function() {
		return this._health;
	}
	,isOffCoolDown: function() {
		return this._flagItemCooldown;
	}
	,disposeDisplay: function() {
		this._display = null;
	}
	,dispose: function() {
		this._removeEventListeners();
		this._entity.dispose();
	}
	,_removeEventListeners: function() {
	}
	,_addEventListeners: function() {
	}
	,setOrigin: function(pOrigin) {
		if(this._display == null) return;
		this._display.setAnchor(pOrigin.x,pOrigin.y);
	}
	,addEffect: function(pType,pDur,pDelay,pMagnitude,pLoops,pOrigin) {
		if(pOrigin == null) pOrigin = -1;
		if(pLoops == null) pLoops = 1;
		if(pMagnitude == null) pMagnitude = 1;
		if(pDelay == null) pDelay = 0;
		this._effects.push(new com.workinman.defs.EffectDef(pType,pDur,pDelay,pMagnitude,pLoops,pOrigin));
		switch(pType) {
		case "sin":
			if(pOrigin != -1) this._sin = pOrigin;
			break;
		case "run":
			if(pOrigin != -1) this._sin = pOrigin;
			break;
		case "shakey":
			if(pOrigin != -1) this._sin = pOrigin;
			break;
		case "shakex":
			if(pOrigin != -1) this._sin = pOrigin;
			break;
		case "pulse":
			if(pOrigin != -1) this._sin = pOrigin;
			break;
		}
	}
	,_onCompleteEffect: function(pType) {
		switch(pType) {
		case "shake":
			break;
		case "shimmer":
			this._display.alpha.set__(1);
			break;
		case "snow":
			break;
		}
	}
	,_shimmerRandomize: function() {
		this._shimmerAlphaTarget = Math.round(30 + Std.random(70)) / 100;
		this._shimmerRate = .4 + Std.random(4) / 6;
	}
	,_onApplyEffect: function(pType,dt,pEffectDef) {
		var tMagnitude = pEffectDef.magnitude;
		switch(pType) {
		case "pulse":
			this._flagScaleOffsetChanged = true;
			this._sin += 50 * dt * tMagnitude;
			this._scaleOffset.to(1 + Math.sin(this._sin) * .03,1 + Math.sin(this._sin) * .03);
			break;
		case "shakex":
			this._sin += 50 * dt;
			this._renderOffset.to(tMagnitude * 12 * Math.sin(this._sin),0);
			break;
		case "shakey":
			this._sin += 50 * dt;
			this._renderOffset.to(0,tMagnitude * 12 * Math.sin(this._sin));
			break;
		case "run":
			this._sin += 15 * dt * tMagnitude;
			this._renderOffset.to(0,5 * Math.sin(this._sin));
			break;
		case "shake":
			this._renderOffset.to(tMagnitude * Std.random(4) * (Std.random(2) <= 1?-1:1),tMagnitude * Std.random(4) * (Std.random(2) <= 1?-1:1));
			break;
		case "togglealpha":
			this._toggleAlphaTimer = this._toggleAlphaTimerReset = pEffectDef._getDurDefault() / pEffectDef.loops;
			this._toggleAlphaCount = pEffectDef.loops == 0?1:pEffectDef.loops;
			break;
		case "shimmer":
			if(this._display.alpha.get__() > this._shimmerAlphaTarget) {
				var _g = this._display.alpha;
				_g.set__(_g.get__() - this._shimmerRate * dt);
				if(this._display.alpha.get__() <= this._shimmerAlphaTarget) {
					this._display.alpha.set__(this._shimmerAlphaTarget);
					this._shimmerRandomize();
				}
			} else if(this._display.alpha.get__() < this._shimmerAlphaTarget) {
				var _g = this._display.alpha;
				_g.set__(_g.get__() + this._shimmerRate * dt);
				if(this._display.alpha.get__() >= this._shimmerAlphaTarget) {
					this._display.alpha.set__(this._shimmerAlphaTarget);
					this._shimmerRandomize();
				}
			} else this._shimmerRandomize();
			break;
		case "snow":
			break;
		case "sin":
			this._sin += 2.6 * dt;
			this._renderOffset.to(tMagnitude * 50 * Math.sin(this._sin),this._renderOffset.y);
			break;
		}
	}
	,renderPosition: function(pCamera) {
		if(this._flagOverrideRenderPosition) {
			this._display.x.set__(this.pos.x);
			this._display.y.set__(this.pos.y);
			return;
		}
		this._display.x.set__(this.pos.x - pCamera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + this._renderOffset.x);
		this._display.y.set__(this.pos.y - pCamera._getPos().y + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + this._renderOffset.y);
		if(this._despawnOffScreen()) {
			if(this._display.x.get__() < 0 - this._display.getNaturalWidth() && this.getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER && this.getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SANDY && this.getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_TRANSITION && this.getType() != com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PARTICLE) this.doDelete = true;
		}
		if(this._display.x.get__() < 0 - this._display.getNaturalWidth() - 300 && (this.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SANDY || this.getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_TRANSITION)) this.doDelete = true;
	}
	,updatePositionFromVelocity: function(dt) {
		this.pos.x += this._velocity.x * dt;
		this.pos.y += this._velocity.y * dt;
		this.registrationPos = new com.workinman.math.WorkinPoint(this.pos.x + this.registrationXOffset(),this.pos.y + this.registrationYOffset());
	}
	,update: function(dt) {
		var tI = 0;
		while(tI < this._effects.length) {
			this._effects[tI].update(dt);
			if(this._effects[tI].isActive()) this._onApplyEffect(this._effects[tI].type,dt,this._effects[tI]); else if(this._effects[tI]._getWasActive()) this._onCompleteEffect(this._effects[tI].type);
			tI++;
		}
		if(this._toggleAlphaCount > 0) {
			this._toggleAlphaTimer -= dt;
			if(this._toggleAlphaTimer < 0) {
				this._display.alpha.set__(this._display.alpha.get__() == 0?1:0);
				this._toggleAlphaCount--;
				if(this._toggleAlphaCount > 0) this._toggleAlphaTimer = this._toggleAlphaTimerReset;
			}
		}
		if(this._timerItemCoolDown < 0) this._flagItemCooldown = true;
		this._timerItemCoolDown -= dt;
	}
	,swapTexture: function(inSprite) {
		this._textureEntity.remove(this._texture);
		this._texture.dispose();
		this._texture = inSprite;
		this._textureEntity.add(this._texture);
	}
	,setTexture: function(inAsset) {
		if(inAsset == "") return;
		if(com.workinman.utils.WorkinCloud.instance.getAssets().hasAsset(inAsset) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[Element](setTexture) No asset named " + inAsset + " exists!");
			return;
		}
		this.swapTexture(new flambe.display.ImageSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getTexture(inAsset)));
	}
	,renew: function(inData) {
		if(inData.asset) {
			inData.asset;
			this.setTexture(inData.asset);
		}
		this.doDelete = false;
		if(inData.x) this.pos.x = inData.x;
		if(inData.y) this.pos.y = inData.y;
		if(inData.rot) this._display.rotation.set__(inData.rot);
		if(inData.scale) this._display.scaleX.set__(this._display.scaleY.set__(inData.scale));
		if(inData.origin) this.setOrigin(inData.origin); else this.setOrigin(new com.workinman.math.WorkinPoint(0,0));
	}
	,_getRenderable: function() {
		return this._render;
	}
	,_getUniqueId: function() {
		return this._uniqueId;
	}
	,registrationYOffset: function() {
		return 0;
	}
	,registrationXOffset: function() {
		return 0;
	}
	,_despawnOffScreen: function() {
		return true;
	}
	,getType: function() {
		return this._type;
	}
	,_getDisplay: function() {
		return this._display;
	}
	,_getEntity: function() {
		return this._entity;
	}
	,_defaultLayer: function() {
		return com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Element
});
com.nick.spongebob.chopping_block.world.elements.Image = function(inData) {
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._tweens = new Array();
	if(inData.pId) this.id = inData.pId;
	this._display.scaleX.set__(1);
	this._display.scaleY.set__(1);
	if(inData.pScale) {
		this._display.scaleX.set__(inData.pScale.x);
		this._display.scaleY.set__(inData.pScale.y);
	}
	this._display.rotation.set__(0);
	if(inData.pRot) this._display.rotation.set__(inData.pRot);
	this._display.alpha.set__(1);
	if(inData.pAlpha) this._display.alpha.set__(inData.pAlpha);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Image"] = com.nick.spongebob.chopping_block.world.elements.Image;
com.nick.spongebob.chopping_block.world.elements.Image.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Image"];
com.nick.spongebob.chopping_block.world.elements.Image.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Image.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	isAllTweensComplete: function() {
		return this._tweens.length == 0;
	}
	,_doMotionPoint: function(pTween,pDt) {
		var tRes = pTween._getPos().copy();
		if(tRes.x % 1 == 0) tRes.x += .001;
		if(tRes.y % 1 == 0) tRes.y += .001;
		return tRes;
	}
	,_doMotionFloat: function(pNum,pDt) {
		if(pNum % 1 == 0) pNum += .001;
		return pNum;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		var tTween;
		var tRate;
		var tDif;
		var tPoint = new com.workinman.math.WorkinPoint();
		var tIndex = this._tweens.length - 1;
		while(tIndex > -1) {
			tTween = this._tweens[tIndex];
			tTween.update(dt);
			switch(tTween._getType()) {
			case "tx":
				if(tTween.isReady()) this.pos.x = this._doMotionFloat(tTween._getPos().x,dt); else tTween.setStartFast(this.pos.x,this.pos.x);
				break;
			case "ty":
				if(tTween.isReady()) this.pos.y = this._doMotionFloat(tTween._getPos().y,dt); else tTween.setStartFast(this.pos.y,this.pos.y);
				break;
			case "rtx":
				if(tTween.isReady()) {
					var tRes = this._doMotionFloat(tTween._getPos().x,dt);
					if(tRes % 1 != 0) this.pos.x = tRes;
				} else tTween.setStartFast(this.pos.x,this.pos.x);
				break;
			case "rty":
				if(tTween.isReady()) this.pos.y = this._doMotionFloat(tTween._getPos().y,dt); else tTween.setStartFast(this.pos.y,this.pos.y);
				break;
			case "t":
				if(tTween.isReady()) this.pos.toPoint(this._doMotionPoint(tTween,dt)); else tTween.setStart(this.pos);
				break;
			case "sx":
				if(tTween.isReady()) this._display.scaleX.set__(this._doMotionFloat(tTween._getPos().x,dt)); else tTween.setStartFast(this._display.scaleY.get__(),this._display.scaleY.get__());
				break;
			case "sy":
				if(tTween.isReady()) this._display.scaleY.set__(this._doMotionFloat(tTween._getPos().y,dt)); else tTween.setStartFast(this._display.scaleY.get__(),this._display.scaleY.get__());
				break;
			case "s":
				if(tTween.isReady()) {
					var tPoint1 = this._doMotionPoint(tTween,dt);
					this._display.scaleX.set__(tPoint1.x);
					this._display.scaleY.set__(tPoint1.y);
				} else tTween.setStartFast(this._display.scaleX.get__(),this._display.scaleY.get__());
				break;
			case "a":
				if(tTween.isReady()) this._display.alpha.set__(this._doMotionFloat(tTween._getPos().x,dt)); else tTween.setStartFast(this._display.alpha.get__(),this._display.alpha.get__());
				break;
			case "r":
				if(tTween.isReady()) this._display.rotation.set__(this._doMotionFloat(tTween._getPos().x,dt)); else tTween.setStartFast(this._display.rotation.get__(),this._display.rotation.get__());
				break;
			}
			if(this._tweens[tIndex].complete) this._tweens.splice(tIndex,1);
			tIndex--;
		}
	}
	,queueTween: function(pTween) {
		this._tweens.push(pTween);
	}
	,dispose: function() {
		this._tweens = null;
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.dispose.call(this);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Image
});
com.nick.spongebob.chopping_block.world.elements.AnimatedElement = function(inData) {
	this._currentAnimation = "";
	this._currentFrame = 0;
	com.nick.spongebob.chopping_block.world.elements.Image.call(this,inData);
	this._animations = new Hash();
	this._lastFrame = -1;
	if(inData.library) {
		this._display.dispose();
		var tSymbol = com.workinman.utils.WorkinCloud.instance.getAssets().getLibrary(inData.library).getSymbol(inData.movie);
		this._duration = tSymbol.duration;
		this._frames = tSymbol.frames;
		this._movie = tSymbol.createSprite();
		this._movie.set_paused(true);
		this.tileWidth = this._movie.getNaturalWidth();
		this.tileHeight = this._movie.getNaturalHeight();
		this._display = this._movie;
		this._entity.add(this._movie);
		tSymbol = null;
	}
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.AnimatedElement"] = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.AnimatedElement.__name__ = ["com","nick","spongebob","chopping_block","world","elements","AnimatedElement"];
com.nick.spongebob.chopping_block.world.elements.AnimatedElement.__super__ = com.nick.spongebob.chopping_block.world.elements.Image;
com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Image.prototype,{
	dispose: function() {
		this._movie = null;
		this._animations = null;
		com.nick.spongebob.chopping_block.world.elements.Image.prototype.dispose.call(this);
	}
	,_onAnimationComplete: function(animationName) {
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Image.prototype.update.call(this,dt);
		if(this._currentAnimation != "" && (this._currentLoop > 0 || this._flagLoop)) {
			this._currentFrame += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FRAMES_PER_SECOND * dt;
			if(this._currentFrame > this._currentFrameList[1]) {
				this._currentLoop--;
				if(this._currentLoop < 1 && this._flagLoop == false) this._onAnimationComplete(this._currentAnimation); else this._currentFrame = this._currentFrameList[0];
			}
			if(this._movie != null && Std["int"](this._currentFrame) != this._lastFrame) this._movie.set_position(Math.floor(this._currentFrame) / this._frames * this._duration);
			this._lastFrame = Std["int"](this._currentFrame);
		}
	}
	,playAnimation: function(name,numLoops) {
		if(numLoops == null) numLoops = 0;
		if(this._animations == null) return;
		if(this._animations.exists(name)) {
			this._currentFrameList = null;
			this._currentFrameList = this._animations.get(name).slice();
			this._currentFrame = this._currentFrameList[0];
			this._currentAnimation = name;
			this._currentLoop = numLoops;
			this._flagLoop = numLoops == 0;
		} else com.workinman.utils.WorkinCloud.instance.log("Animation not found: " + name + " " + Std.string(this._animations));
	}
	,addAnimation: function(name,startFrame,endFrame) {
		this._animations.set(name,[startFrame,endFrame]);
	}
	,currentAnimation: function() {
		return this._currentAnimation;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.AnimatedElement
});
com.nick.spongebob.chopping_block.world.elements.Background = function() { }
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Background"] = com.nick.spongebob.chopping_block.world.elements.Background;
com.nick.spongebob.chopping_block.world.elements.Background.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Background"];
com.nick.spongebob.chopping_block.world.elements.Background.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Background.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	renderPosition: function(pCamera) {
		this._display.x.set__(this._display.y.set__(0));
		this._display.setScale(0.5);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Background
});
com.nick.spongebob.chopping_block.world.elements.BackgroundTile = function(inData) {
	this._flagSecondTile = inData.secondTile;
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_BACKGROUND;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._display.dispose();
	this._lastCameraPos = new com.workinman.math.WorkinPoint(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X,0);
	this._tilePos = new Array();
	this._tiles = new Array();
	this._tileAsset = inData.assets;
	this._tileWidth = inData.tilewidth;
	this._scrollRatioX = inData.scrollratiox;
	this._scrollRatioY = inData.scrollratioy;
	this._offsetY = inData.offset;
	this._spawnTiles();
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.BackgroundTile"] = com.nick.spongebob.chopping_block.world.elements.BackgroundTile;
com.nick.spongebob.chopping_block.world.elements.BackgroundTile.__name__ = ["com","nick","spongebob","chopping_block","world","elements","BackgroundTile"];
com.nick.spongebob.chopping_block.world.elements.BackgroundTile.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.BackgroundTile.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	dispose: function() {
		var _g = 0, _g1 = this._tiles;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.dispose();
		}
		this._tiles = null;
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.dispose.call(this);
	}
	,renderPosition: function(pCamera) {
		var tDelta = this._lastCameraPos.x - pCamera._getPos().x;
		var tI = this._tilePos.length;
		while(tI > 0) {
			tI--;
			this._tilePos[tI].x += tDelta * this._scrollRatioX;
			this._tilePos[tI].y = this._scrollRatioY == 0?0:this._offsetY - pCamera._getPos().y + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y;
			if(this._tilePos[tI].x + this._tileWidth < 0) {
				this._tilePos[tI].x = this._tilePos[this._tilePos.length - 1].x + this._tileWidth;
				var tT = this._tilePos[tI];
				this._tilePos.splice(tI,1);
				this._tilePos.push(tT);
				tT = null;
			}
		}
		tI = 0;
		while(tI < this._tiles.length) {
			this._tiles[tI].x.set__(this._tilePos[tI].x);
			this._tiles[tI].y.set__(this._tilePos[tI].y);
			tI++;
		}
		this._lastCameraPos.x = pCamera._getPos().x;
	}
	,_spawnTile: function(pX) {
		var tEnt = new flambe.Entity();
		this._getEntity().addChild(tEnt);
		var tSprite = new flambe.display.ImageSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getTexture(this._tileAsset));
		if(this._flagSecondTile) tSprite.x.set__(pX + 1); else tSprite.x.set__(pX);
		tSprite.y.set__(this._offsetY);
		this._tiles.push(tSprite);
		tEnt.add(tSprite);
		this._tilePos.push(new com.workinman.math.WorkinPoint(tSprite.x.get__(),tSprite.y.get__()));
		tSprite = null;
		return this._tileWidth;
	}
	,_spawnTiles: function() {
		this._totalWidth = -com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH;
		while(this._totalWidth < com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH * 3) this._totalWidth += this._spawnTile(this._totalWidth);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.BackgroundTile
});
com.nick.spongebob.chopping_block.world.elements.BitmapPanel = function() { }
$hxClasses["com.nick.spongebob.chopping_block.world.elements.BitmapPanel"] = com.nick.spongebob.chopping_block.world.elements.BitmapPanel;
com.nick.spongebob.chopping_block.world.elements.BitmapPanel.__name__ = ["com","nick","spongebob","chopping_block","world","elements","BitmapPanel"];
com.nick.spongebob.chopping_block.world.elements.BitmapPanel.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.BitmapPanel.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	dispose: function() {
		this._flagShown = false;
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.dispose.call(this);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.BitmapPanel
});
com.nick.spongebob.chopping_block.world.elements.BoxCollider = function(inData) {
	this._flagFacingRight = true;
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER;
	inData.asset = "elements/props/block1.png";
	this._player = inData.player;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._renderOffset.to(-450,0);
	this._display.alpha.set__(0);
	this.pos.y = 450;
	this._flagChop = false;
	this._timerChop = 0.4;
	this._prevPos = this.pos.copy();
	this._motionDistanceThisUpdate = new com.workinman.math.WorkinPoint();
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.BoxCollider"] = com.nick.spongebob.chopping_block.world.elements.BoxCollider;
com.nick.spongebob.chopping_block.world.elements.BoxCollider.__name__ = ["com","nick","spongebob","chopping_block","world","elements","BoxCollider"];
com.nick.spongebob.chopping_block.world.elements.BoxCollider.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.BoxCollider.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	isChopping: function() {
		return this._flagChop;
	}
	,setChopping: function(pFlag) {
		this._flagChop = pFlag;
	}
	,update: function(dt) {
		this._prevPos.toPoint(this.registrationPos);
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		if(this._flagFacingRight) this.pos.x = this._player.pos.x + 340; else this.pos.x = this._player.pos.x - 800;
		if(this._flagChop) {
			if(this._timerChop > 0) this.pos.y += 1250 * dt; else {
				this.pos.y = 450;
				this._timerChop = 0.4;
				this._flagChop = false;
			}
			this._timerChop -= dt;
		}
		this._motionDistanceThisUpdate = com.workinman.math.WorkinMath.diffBetweenPoints(this._prevPos,this.registrationPos);
	}
	,setDirection: function(pFlag) {
		this._flagFacingRight = pFlag;
		if(this._flagFacingRight) this._renderOffset.to(-450,0); else this._renderOffset.to(450,0);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.BoxCollider
});
com.nick.spongebob.chopping_block.world.elements.Dust = function(inData) {
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PARTICLE;
	inData.library = "squidward_animation";
	inData.movie = "_dust";
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	this._renderOffset.to(-525,-520);
	this.addAnimation("dust",4,13);
	this._timerLife = 0.25;
	this.playAnimation("dust",1);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Dust"] = com.nick.spongebob.chopping_block.world.elements.Dust;
com.nick.spongebob.chopping_block.world.elements.Dust.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Dust"];
com.nick.spongebob.chopping_block.world.elements.Dust.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.Dust.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	dispose: function() {
		console.log("DUST DISPOSE!");
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.dispose.call(this);
	}
	,_onAnimationComplete: function(animationName) {
		this.doDelete = true;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		if(this._timerLife < 0) this.doDelete = true;
		this._timerLife -= dt;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Dust
});
com.nick.spongebob.chopping_block.world.elements.Jellyfish = function(inData) {
	this._gotHit = false;
	this._sin_bob_offset = 180;
	this._sin_bob_rate = 10;
	this._imageType = inData.imageType;
	inData.library = "squidward_animation";
	this._camera = inData.camera;
	this._squidward = inData.player;
	inData.movie = "_jellyfish";
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_JELLYFISH;
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	this.addAnimation("idle",21,40);
	this.addAnimation("zap",1,20);
	this.addAnimation("squished",41,60);
	this._sinDisplay = Math.random() * Math.PI;
	this.setState(1);
	this._isKillable = true;
	this.pos.y = 740;
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Jellyfish"] = com.nick.spongebob.chopping_block.world.elements.Jellyfish;
com.nick.spongebob.chopping_block.world.elements.Jellyfish.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Jellyfish"];
com.nick.spongebob.chopping_block.world.elements.Jellyfish.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.Jellyfish.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	gotHit: function() {
		return this._gotHit;
	}
	,_onAnimationComplete: function(animationName) {
		if(animationName == "idle") this.setState(2); else if(animationName == "zap") this.setState(1);
	}
	,setState: function(pState) {
		this._state = pState;
		switch(this._state) {
		case 1:
			this.playAnimation("idle",1);
			this._isKillable = true;
			break;
		case 2:
			this.playAnimation("zap",1);
			this._isKillable = false;
			break;
		case 3:
			this.playAnimation("squished");
			this._gotHit = true;
			break;
		}
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		this._sinDisplay += this._sin_bob_rate * dt;
		this.pos.y += Math.sin(this._sinDisplay) * this._sin_bob_offset * dt;
		this.pos.x -= 70 * dt;
		if(this.pos.x < this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X && this._state != 3) this.doDelete = true;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Jellyfish
});
com.nick.spongebob.chopping_block.world.elements.Obstacle = function(inData) {
	this._flagBounce = false;
	this._sin_bob_offset = 180;
	this._sin_bob_rate = 10;
	this._flagFirstTime = inData.flagFirstTime;
	this._damageState = inData.damageState;
	this._imageType = inData.imageType;
	this._squidward = inData.player;
	this._chooseType();
	this._randomVelocity();
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE;
	inData.asset = this._assetId();
	this._scale = inData.scale;
	this._camera = inData.camera;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._flagShouldTakeLife = false;
	this._posOnCamera = new com.workinman.math.WorkinPoint(0,0);
	this._display.setScale(this._scale);
	this._sinDisplay = Math.random() * Math.PI;
	if(this._scale == 1.0) {
		this.doSpawnBounce();
		switch(this._typeObject) {
		case 1:
			this._health = 3;
			break;
		case 2:
			this._health = 3;
			break;
		case 3:
			this._health = 3;
			break;
		case 4:
			this._health = 3;
			break;
		case 5:
			this._health = 3;
			break;
		default:
			this._health = 2;
		}
	} else this._health = 3;
	this.pos.y -= this.registrationYOffset() - com.workinman.utils.WorkinUtils.getRandom(155,155);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Obstacle"] = com.nick.spongebob.chopping_block.world.elements.Obstacle;
com.nick.spongebob.chopping_block.world.elements.Obstacle.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Obstacle"];
com.nick.spongebob.chopping_block.world.elements.Obstacle.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Obstacle.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		this._sinDisplay += this._sin_bob_rate * dt;
		if(this._flagBounce && this._typeObject != 6) {
			this.pos.x += this._velocity.x * dt;
			this.pos.y += this._velocity.y * dt;
			this._velocity.y += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY * dt;
			switch(this._typeObject) {
			case 1:
				if(this.pos.y > 800 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
					com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
					com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/stone_thud");
					if(this._bounceCount > 5) {
						this._flagBounce = false;
						this.pos.y = 800;
					}
				}
				break;
			case 2:
				if(this.pos.y > 800 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
					com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
					com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/stone_thud");
					if(this._bounceCount > 5) {
						this._flagBounce = false;
						this.pos.y = 800;
					}
				}
				break;
			default:
				if(this.pos.y > 900 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
					com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE));
					com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/stone_thud");
					if(this._bounceCount > 5) {
						this._flagBounce = false;
						this.pos.y = 900;
					}
				}
			}
			if(this.pos.x < this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) {
				if(this._scale == 1.0) this._velocity.x = 200; else this._velocity.x = 100;
			} else if(this.pos.x > this._camera._getPos().x + (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - this.collisionWidthHalf() * 2)) {
				if(this._scale == 1.0) this._velocity.x = -200; else this._velocity.x = -100;
			}
		} else if(this.pos.x < this._camera._getPos().x - (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + this.collisionWidthHalf() * 2) && this.isKillable() && this._scale != 1.0) this.doDelete = true;
	}
	,doSpawnBounce: function() {
		this._flagBounce = true;
		this._bounceCount = -6;
		this._velocity = new com.workinman.math.WorkinPoint(-700,400);
	}
	,doBounce: function() {
		this._flagBounce = true;
		this._bounceCount = 0;
		this._randomVelocity();
	}
	,collisionHeightHalf: function() {
		if(this._scale == 1.0) switch(this._typeObject) {
		case 1:
			return 145;
		case 2:
			return 122;
		case 3:
			return 75;
		case 4:
			return 75;
		case 5:
			return 81;
		default:
			return 0;
		} else switch(this._typeObject) {
		case 1:
			return 123;
		case 2:
			return 104;
		case 3:
			return 64;
		case 4:
			return 68;
		case 5:
			return 68;
		default:
			return 0;
		}
	}
	,collisionWidthHalf: function() {
		if(this._scale == 1.0) switch(this._typeObject) {
		case 1:
			return 109;
		case 2:
			return 150;
		case 3:
			return 126;
		case 4:
			return 139;
		case 5:
			return 132;
		default:
			return 0;
		} else switch(this._typeObject) {
		case 1:
			return 92;
		case 2:
			return 128;
		case 3:
			return 107;
		case 4:
			return 118;
		case 5:
			return 112;
		default:
			return 0;
		}
	}
	,testCollision: function(pX,pY) {
		if(pY < this.pos.y && pY > this.pos.y - this.collisionHeightHalf()) return pX > this.pos.x - this.collisionWidthHalf() && pX < this.pos.x + this.collisionWidthHalf(); else return false;
	}
	,damageObstacle: function() {
		this.doDelete = true;
	}
	,isKillable: function() {
		return true;
	}
	,getImageType: function() {
		return this._typeObject;
	}
	,_randomVelocity: function() {
		this._randomX = com.workinman.utils.WorkinUtils.getRandom(-400,400);
		this._randomY = com.workinman.utils.WorkinUtils.getRandom(300,450);
		this._velocity = new com.workinman.math.WorkinPoint(this._randomX,this._randomY);
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 1:
			switch(this._damageState) {
			case 1:
				return "elements/props/statue1.png";
			case 2:
				return "elements/props/statue2.png";
			case 3:
				return "elements/props/statue3.png";
			default:
				return "elements/props/statue1.png";
			}
			break;
		case 4:
			switch(this._damageState) {
			case 1:
				return "elements/props/board1.png";
			case 2:
				return "elements/props/board2.png";
			case 3:
				return "elements/props/board3.png";
			default:
				return "elements/props/board1.png";
			}
			break;
		case 2:
			switch(this._damageState) {
			case 1:
				return "elements/props/log1.png";
			case 2:
				return "elements/props/log2.png";
			case 3:
				return "elements/props/log3.png";
			default:
				return "elements/props/log1.png";
			}
			break;
		case 3:
			switch(this._damageState) {
			case 1:
				return "elements/props/pineapple1.png";
			case 2:
				return "elements/props/pineapple2.png";
			case 3:
				return "elements/props/pineapple3.png";
			default:
				return "elements/props/pineapple1.png";
			}
			break;
		case 5:
			switch(this._damageState) {
			case 1:
				return "elements/props/block1.png";
			case 2:
				return "elements/props/block2.png";
			case 3:
				return "elements/props/block3.png";
			default:
				return "elements/props/block1.png";
			}
			break;
		default:
			return "";
		}
	}
	,getScale: function() {
		return this._scale;
	}
	,getPoints: function() {
		if(this._scale == 1.0) switch(this._damageState) {
		case 1:
			this._pointValue = 2;
			break;
		case 2:
			this._pointValue = 4;
			break;
		case 3:
			this._pointValue = 6;
			break;
		default:
			this._pointValue = 2;
		} else switch(this._damageState) {
		case 1:
			this._pointValue = 1;
			break;
		case 2:
			this._pointValue = 2;
			break;
		case 3:
			this._pointValue = 3;
			break;
		default:
			this._pointValue = 1;
		}
		return this._pointValue;
	}
	,_chooseType: function() {
		if(this._flagFirstTime && this._imageType != 3) this._typeObject = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,5)); else this._typeObject = this._imageType;
	}
	,registrationYOffset: function() {
		return this._display.getNaturalHeight();
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Obstacle
});
com.nick.spongebob.chopping_block.world.elements.ObstacleKiller = function(inData) {
	this._isKillable = false;
	this._chooseType();
	com.nick.spongebob.chopping_block.world.elements.Obstacle.call(this,inData);
	this._display.setScale(0.85);
	switch(this._typeObject) {
	case 3:
		this.pos.y = 765;
		this._velocity.x = -100;
		this._health = 2;
		break;
	case 1:
		this.pos.y = com.workinman.utils.WorkinUtils.getRandom(800,800);
		this.layer = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES;
		this._health = 2;
		break;
	case 2:
		this.pos.y = com.workinman.utils.WorkinUtils.getRandom(860,865);
		this.layer = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES;
		this._health = 3;
		break;
	default:
		this.pos.y = com.workinman.utils.WorkinUtils.getRandom(860,900);
		this._health = 2;
	}
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.ObstacleKiller"] = com.nick.spongebob.chopping_block.world.elements.ObstacleKiller;
com.nick.spongebob.chopping_block.world.elements.ObstacleKiller.__name__ = ["com","nick","spongebob","chopping_block","world","elements","ObstacleKiller"];
com.nick.spongebob.chopping_block.world.elements.ObstacleKiller.__super__ = com.nick.spongebob.chopping_block.world.elements.Obstacle;
com.nick.spongebob.chopping_block.world.elements.ObstacleKiller.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Obstacle.prototype,{
	doBounce: function() {
		this._flagClarinetBounce = true;
		this._bounceCount = 0;
		this._randomVelocity();
	}
	,collisionHeightHalf: function() {
		switch(this._typeObject) {
		case 3:
			return 0;
		case 1:
			return 102;
		case 2:
			return 36;
		default:
			return 0;
		}
	}
	,collisionWidthHalf: function() {
		switch(this._typeObject) {
		case 3:
			return 0;
		case 1:
			return 146;
		case 2:
			return 101;
		default:
			return 0;
		}
	}
	,renderPosition: function(pCamera) {
		com.nick.spongebob.chopping_block.world.elements.Obstacle.prototype.renderPosition.call(this,pCamera);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Obstacle.prototype.update.call(this,dt);
		switch(this._typeObject) {
		case 3:
			switch(this._damageState) {
			case 1:
				this.pos.y += Math.sin(this._sinDisplay) * this._sin_bob_offset * dt;
				this.pos.x -= 100 * dt;
				break;
			case 2:
				this.pos.y += Math.sin(this._sinDisplay) * Math.cos(this._sinDisplay) * (this._sin_bob_offset + 100) * dt;
				this.pos.x -= 100 * dt;
				break;
			}
			break;
		case 1:
			if(this._flagClarinetBounce) {
				this.pos.x += this._velocity.x * dt;
				this.pos.y += this._velocity.y * dt;
				this._velocity.y += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY * dt;
				if(this.pos.y > 850 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
					if(this._bounceCount > 3) {
						this._flagClarinetBounce = false;
						this.pos.y = 850;
					}
				}
				if(this.pos.x < this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) this._velocity.x = 100; else if(this.pos.x > this._camera._getPos().x + (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - this.collisionWidthHalf())) this._velocity.x = -100;
			}
			break;
		case 2:
			if(this._flagClarinetBounce) {
				this.pos.x += this._velocity.x * dt;
				this.pos.y += this._velocity.y * dt;
				this._velocity.y += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY * dt;
				if(this.pos.y > 850 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
					if(this._bounceCount > 3) {
						this._flagClarinetBounce = false;
						this.pos.y = 850;
					}
				}
				if(this.pos.x < this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) this._velocity.x = 100; else if(this.pos.x > this._camera._getPos().x + (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - this.collisionWidthHalf())) this._velocity.x = -100;
			}
			break;
		default:
		}
	}
	,isKillable: function() {
		switch(this._typeObject) {
		case 3:
			this._isKillable = true;
			break;
		case 1:
			this._isKillable = false;
			break;
		case 2:
			this._isKillable = false;
			break;
		default:
			this._isKillable = false;
		}
		return this._isKillable;
	}
	,setHealth: function(pHealth) {
		this._health = pHealth;
	}
	,getHealth: function() {
		return this._health;
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 1:
			switch(this._damageState) {
			case 1:
				return "elements/props/clam_open.png";
			case 2:
				return "elements/props/clam_closed2.png";
			default:
				return "";
			}
			break;
		case 2:
			switch(this._damageState) {
			case 1:
				return "elements/props/clam_open.png";
			case 2:
				return "elements/props/clam_closed2.png";
			case 3:
				return "elements/props/clam_closed2.png";
			default:
				return "";
			}
			break;
		default:
			return "";
		}
	}
	,_chooseType: function() {
		if(this._imageType == 2) this._imageType = 1;
		this._typeObject = this._imageType;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.ObstacleKiller
});
com.nick.spongebob.chopping_block.world.elements.Particles = function(inData) {
	this._typeObject = inData.imageType;
	this._comboState = inData.comboState;
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE_PARTICLE;
	inData.asset = this._assetId();
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._randomVelocity();
	this._bounceCount = 0;
	this._display.setScale(this._randomSize);
	this._display.rotation.set__(this._randomAngle);
	this._timerLife = 2.5;
	console.log("[Particles] created! spawned at x:" + this.pos.x + " y: " + this.pos.y + "assetID: " + this._assetId());
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Particles"] = com.nick.spongebob.chopping_block.world.elements.Particles;
com.nick.spongebob.chopping_block.world.elements.Particles.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Particles"];
com.nick.spongebob.chopping_block.world.elements.Particles.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Particles.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		if(this._timerLife < 0) {
		}
		if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PARTICLES_BOUNCE)) {
			this.pos.x += this._velocity.x * dt;
			this.pos.y += this._velocity.y * dt;
			this._velocity.y += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY * dt;
			if(com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SPEED) > 0) {
				if(this.pos.y > 500 && this._velocity.y > 0) this._velocity.y *= -.8;
				this._render.alpha -= dt;
				if(this._render.alpha == 0) {
					this._render.alpha = 0;
					com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PARTICLES_BOUNCE,false);
				}
			} else {
				if(this.pos.y > 500 && this._velocity.y > 0) {
					this._velocity.y *= -.8;
					this._bounceCount++;
				}
				this._render.alpha -= dt / 2;
				if(this._render.alpha < 0) {
					this._render.alpha = 0;
					com.workinman.utils.WorkinCloud.instance.setBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PARTICLES_BOUNCE,false);
				}
			}
		}
		this._timerLife -= dt;
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 1:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,5));
			switch(this._randomImageGenerator) {
			case 1:
				return "elements/particles/statue_particle1.png";
			case 2:
				return "elements/particles/statue_particle2.png";
			case 3:
				return "elements/particles/statue_particle3.png";
			case 4:
				return "elements/particles/statue_particle4.png";
			case 5:
				return "elements/particles/statue_particle5.png";
			default:
				return "";
			}
			break;
		case 2:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3));
			switch(this._randomImageGenerator) {
			case 1:
				return "elements/particles/log_particle1.png";
			case 2:
				return "elements/particles/log_particle2.png";
			case 3:
				return "elements/particles/log_particle3.png";
			default:
				return "";
			}
			break;
		case 3:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,6));
			switch(this._randomImageGenerator) {
			case 1:
				return "elements/particles/pineapple_particle1.png";
			case 2:
				return "elements/particles/pineapple_particle2.png";
			case 3:
				return "elements/particles/pineapple_particle3.png";
			case 4:
				return "elements/particles/pineapple_particle4.png";
			case 5:
				return "elements/particles/pineapple_particle5.png";
			case 6:
				return "elements/particles/pineapple_particle6.png";
			default:
				return "";
			}
			break;
		case 4:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3));
			switch(this._randomImageGenerator) {
			case 1:
				return "elements/particles/board_particle1.png";
			case 2:
				return "elements/particles/board_particle2.png";
			case 3:
				return "elements/particles/board_particle3.png";
			default:
				return "";
			}
			break;
		case 5:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,5));
			switch(this._randomImageGenerator) {
			case 1:
				return "elements/particles/block_particle1.png";
			case 2:
				return "elements/particles/block_particle2.png";
			case 3:
				return "elements/particles/block_particle3.png";
			case 4:
				return "elements/particles/block_particle4.png";
			case 5:
				return "elements/particles/block_particle5.png";
			default:
				return "";
			}
			break;
		default:
			return "";
		}
	}
	,_randomVelocity: function() {
		if(this._comboState) {
			this._randomX = com.workinman.utils.WorkinUtils.getRandom(-450,400);
			this._randomY = com.workinman.utils.WorkinUtils.getRandom(-900,900);
		} else {
			this._randomX = com.workinman.utils.WorkinUtils.getRandom(-350,300);
			this._randomY = com.workinman.utils.WorkinUtils.getRandom(-600,600);
		}
		this._randomSize = com.workinman.utils.WorkinUtils.getRandom(0.8,1.5,false);
		this._randomAngle = com.workinman.utils.WorkinUtils.getRandom(0,180);
		this._velocity = new com.workinman.math.WorkinPoint(this._randomX,this._randomY);
	}
	,applyRenderable: function() {
		this._display.x.set__(this._render.x);
		this._display.y.set__(this._render.y);
		this._display.scaleX.set__(this._render.scaleX);
		this._display.scaleY.set__(this._render.scaleY);
		this._display.rotation.set__(this._render.rotation);
		this._display.alpha.set__(this._render.alpha);
		this._display.set_visible(this._render.visible);
	}
	,renderPosition: function(pCamera) {
		if(pCamera == null) {
			this._render.x = this.pos.x + this._renderOffset.x;
			this._render.y = this.pos.y + this._renderOffset.y;
		} else {
			this._render.x = this.pos.x;
			this._render.y = this.pos.y;
		}
		this.applyRenderable();
	}
	,renew: function(inData) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.renew.call(this,inData);
		if(inData.bounceCount) {
			this.pos.x = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_X);
			this.pos.y = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y + com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_Y);
			this._render.alpha = 1;
			this._bounceCount = 0;
		}
		if(inData.newVelocity) {
			this._display.setScale(this._randomSize);
			this._display.rotation.set__(this._randomAngle);
			this._randomVelocity();
		}
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Particles
});
com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst = function(inData) {
	this._typeObject = inData.imageType;
	this._camera = inData.camera;
	this._points = inData.points;
	this._numHits = inData.comboChain;
	this._chooseType();
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_INDICATOR;
	inData.asset = this._assetId();
	this._state = inData.currentState;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	switch(this._typeObject) {
	case 1:
		this.pos.x = this._camera._getPos().x - 300;
		this.pos.y = this._camera._getPos().y;
		this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"Destroy " + com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED) + " Items to Pass!");
		this._text.x.set__(this.pos.x);
		this._text.y.set__(this.pos.y);
		this._display = this._text;
		break;
	case 4:
		this.pos.x = this._camera._getPos().x - com.workinman.utils.WorkinUtils.getRandom(-100,100);
		this.pos.y = this._camera._getPos().y - com.workinman.utils.WorkinUtils.getRandom(-100,100);
		this._localText = new com.workinman.display.TextLocalized(45,60,"bad_text_" + this._randomImageGenerator,"",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._entity.addChild(this._localText._getEntity());
		break;
	case 6:
		switch(this._state) {
		case 1:
			this.pos.x = this._camera._getPos().x - 450;
			this.pos.y = this._camera._getPos().y + 200;
			break;
		case 2:
			this.pos.x = this._camera._getPos().x - 150;
			this.pos.y = this._camera._getPos().y + 200;
			this._localText = new com.workinman.display.TextLocalized(this.pos.x,this.pos.y,"combo_text","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
			this._entity.addChild(this._localText._getEntity());
			break;
		default:
			this.pos.x = this._camera._getPos().x - 450;
			this.pos.y = this._camera._getPos().y + 200;
			this._localText = new com.workinman.display.TextLocalized(this.pos.x,this.pos.y,"combo_text","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
			this._entity.addChild(this._localText._getEntity());
		}
		break;
	case 5:
		switch(this._state) {
		case 1:
			this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"+" + this._points);
			this._text.x.set__(this.pos.x);
			this._text.y.set__(this.pos.y);
			break;
		case 2:
			this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"+" + this._points);
			this._text.x.set__(this.pos.x);
			this._text.y.set__(this.pos.y);
			break;
		default:
			this._text = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont("fonts/testFont"),"+" + this._points);
			this._text.x.set__(this.pos.x);
			this._text.y.set__(this.pos.y);
		}
		this._display = this._text;
		break;
	case 3:
		if(this.pos.x < this._camera._getPos().x - (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 150)) this.pos.x = this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X + 200; else if(this.pos.x > this._camera._getPos().x + (com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 150)) this.pos.x = this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 200;
		this._localText = new com.workinman.display.TextLocalized(30,60,"good_text_" + this._randomImageGenerator,"",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._entity.addChild(this._localText._getEntity());
		break;
	}
	this._entity.add(this._display);
	this._display.alpha.set__(0);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst"] = com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst;
com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst.__name__ = ["com","nick","spongebob","chopping_block","world","elements","PlayerComboBurst"];
com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		var _g = this._display.alpha;
		_g.set__(_g.get__() + 2 * dt);
		if(this._display.alpha.get__() > 2) this.removeIndicator();
		switch(this._typeObject) {
		case 1:
			break;
		case 6:
			this.pos.y -= this._randomNumber * dt;
			break;
		case 2:
			this.pos.y -= 25 * dt;
			this.pos.x += 50 * dt;
			break;
		case 5:
			this.pos.y -= 25 * dt;
			this.pos.x += 50 * dt;
			break;
		default:
			this.pos.x += this._randomNumber * dt;
			this.pos.y -= this._randomNumber * dt;
		}
	}
	,removeIndicator: function() {
		this.doDelete = true;
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 2:
			return "ui/points_exclamation.png";
		case 3:
			return "good.png";
		case 4:
			return "bad.png";
		case 5:
			return "ui/points_exclamation.png";
		default:
			return "";
		}
	}
	,_chooseType: function() {
		switch(this._typeObject) {
		case 3:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3));
			break;
		case 4:
			this._randomImageGenerator = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,2));
			break;
		default:
			this._randomImageGenerator = 0;
		}
		this._randomNumber = com.workinman.utils.WorkinUtils.getRandom(25,50);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.PlayerComboBurst
});
com.nick.spongebob.chopping_block.world.elements.RageOverLay = function(inData) {
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_INDICATOR;
	if(inData.mode == 1) inData.asset = "ui/screen_overlay_gold.png"; else inData.asset = "ui/screen_overlay.png";
	this._camera = inData.camera;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this.pos.x = this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X;
	this.pos.y = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT - 90;
	this._display.alpha.set__(0);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.RageOverLay"] = com.nick.spongebob.chopping_block.world.elements.RageOverLay;
com.nick.spongebob.chopping_block.world.elements.RageOverLay.__name__ = ["com","nick","spongebob","chopping_block","world","elements","RageOverLay"];
com.nick.spongebob.chopping_block.world.elements.RageOverLay.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.RageOverLay.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	dispose: function() {
		console.log("ComboMeter DISPOSE!");
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.dispose.call(this);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		this.pos.x = this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 10;
		if(this._display.alpha.get__() < 1) {
			var _g = this._display.alpha;
			_g.set__(_g.get__() + 2 * dt);
		}
	}
	,renderPosition: function(pCamera) {
		this._display.x.set__(0);
		this._display.y.set__(0);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.RageOverLay
});
com.nick.spongebob.chopping_block.world.elements.RedFlash = function(inData) {
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_INDICATOR;
	this._camera = inData.camera;
	this._transitionType = inData.transition;
	com.nick.spongebob.chopping_block.world.elements.Image.call(this,inData);
	console.log("[Red Flash] created " + this._transitionType);
	this.pos.x = this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH / 2 - 50;
	this.pos.y = this._camera._getPos().y - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT / 2;
	switch(this._transitionType) {
	case 1:
		this._display = new flambe.display.FillSprite(16711680,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH + 400,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT + 200);
		this._entity.add(this._getDisplay());
		this._getDisplay().alpha.set__(0);
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(0.7,0),0.1,0,"","a"));
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0.7,0),new com.workinman.math.WorkinPoint(0.1,0),0.2,0.1,"","a"));
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0.1,0),new com.workinman.math.WorkinPoint(0.5,0),0.1,0.3,"","a"));
		break;
	case 2:
		this._display = new flambe.display.FillSprite(16777215,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH + 200,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT + 200);
		this._entity.add(this._getDisplay());
		this._getDisplay().alpha.set__(0);
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(1.0,0),1.75,0,"","a"));
		break;
	case 3:
		this._display = new flambe.display.FillSprite(16711680,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH + 200,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT + 200);
		this._entity.add(this._getDisplay());
		this._getDisplay().alpha.set__(0.0);
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(0.3,0),0.1,0,"","a"));
		break;
	case 4:
		this._display = new flambe.display.FillSprite(16777215,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH + 200,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT + 200);
		this._entity.add(this._getDisplay());
		this._getDisplay().alpha.set__(1.0);
		this.queueTween(new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(1.0,0),new com.workinman.math.WorkinPoint(0.0,0),1.5,0,"","a"));
		break;
	}
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.RedFlash"] = com.nick.spongebob.chopping_block.world.elements.RedFlash;
com.nick.spongebob.chopping_block.world.elements.RedFlash.__name__ = ["com","nick","spongebob","chopping_block","world","elements","RedFlash"];
com.nick.spongebob.chopping_block.world.elements.RedFlash.__super__ = com.nick.spongebob.chopping_block.world.elements.Image;
com.nick.spongebob.chopping_block.world.elements.RedFlash.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Image.prototype,{
	update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Image.prototype.update.call(this,dt);
		if(this._transitionType == 3 || this._transitionType == 4) {
			this.pos.x = this._camera._getPos().x - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH / 2 - 50;
			this.pos.y = this._camera._getPos().y - com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT / 2;
		}
		if(this.isAllTweensComplete() && this._transitionType != 3) this.doDelete = true;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.RedFlash
});
com.nick.spongebob.chopping_block.world.elements.Sandy = function(inData) {
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SANDY;
	inData.library = "squidward_animation";
	inData.movie = "_sandy";
	this._imageType = inData.imageType;
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	this.addAnimation("invincible",1,80);
	this.addAnimation("extra life",81,160);
	this.addAnimation("double score",161,240);
	this.pos.y = 900;
	this._tween = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(0,0),0,0,com.workinman.math.WorkinMotion.EASE_OUT);
	this._display.setScale(0.75);
	switch(this._imageType) {
	case 1:
		this.playAnimation("double score");
		break;
	case 2:
		this.playAnimation("extra life");
		break;
	case 3:
		this.playAnimation("invincible");
		break;
	}
	this.doDash();
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Sandy"] = com.nick.spongebob.chopping_block.world.elements.Sandy;
com.nick.spongebob.chopping_block.world.elements.Sandy.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Sandy"];
com.nick.spongebob.chopping_block.world.elements.Sandy.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.Sandy.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	doDash: function() {
		console.log("DoDash: " + Std.string(this.pos));
		this._tween.setStart(this.pos);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(this.pos.x + 100,520),1);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		if(!this._tween.complete) {
			this._tween.update(dt);
			console.log(this._tween._getPos());
			this.pos.x = this._tween._getPos().x;
			this.pos.y = this._tween._getPos().y;
		} else this.pos.x -= 200 * dt;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Sandy
});
com.nick.spongebob.chopping_block.world.elements.SpongeBob = function(inData) {
	this._gotHit = false;
	this._flagUnkill = true;
	this._flagKill = true;
	this._timerUnkillable = 1;
	this._timerKillable = 1.5;
	this._sin_bob_rate = 10;
	this._imageType = inData.imageType;
	inData.library = "squidward_animation";
	this._camera = inData.camera;
	this._tween = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(0,0),0,0,com.workinman.math.WorkinMotion.EASE_OUT);
	this._boundsCustom = new flambe.math.Rectangle(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - 50,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y,250,400);
	inData.movie = "_spongebob";
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB;
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	switch(this._imageType) {
	case 1:
		this.addAnimation("idle",1,80);
		this.addAnimation("split",81,100);
		this._display.scaleX.set__(-1);
		this._sinDisplay = Math.random() * Math.PI;
		this.pos.y = 925;
		this._isKillable = false;
		this.setState(4);
		break;
	case 2:
		this.addAnimation("idle",21,40);
		this.addAnimation("zap",1,20);
		this.addAnimation("squished",41,60);
		this._sinDisplay = Math.random() * Math.PI;
		this.setState(1);
		this._isKillable = true;
		break;
	default:
		this.addAnimation("idle",21,40);
		this.addAnimation("zap",1,20);
		this.addAnimation("squished",41,60);
		this._sinDisplay = Math.random() * Math.PI;
		this.setState(1);
		this._isKillable = true;
	}
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.SpongeBob"] = com.nick.spongebob.chopping_block.world.elements.SpongeBob;
com.nick.spongebob.chopping_block.world.elements.SpongeBob.__name__ = ["com","nick","spongebob","chopping_block","world","elements","SpongeBob"];
com.nick.spongebob.chopping_block.world.elements.SpongeBob.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.SpongeBob.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	isKillable: function() {
		return this._isKillable;
	}
	,canHit: function() {
		switch(this._imageType) {
		case 1:
			return this._state == 1;
		case 2:
			return true;
		default:
			return true;
		}
		return true;
	}
	,gotHit: function() {
		return this._gotHit;
	}
	,doLeave: function() {
		this._tween.setStart(this.pos);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(0,1200),1);
	}
	,doEnter: function() {
		this._tween.setStart(this.pos);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(0,700),1);
	}
	,setState: function(pState) {
		this._state = pState;
		switch(this._imageType) {
		case 1:
			switch(this._state) {
			case 4:
				this.doEnter();
				this._isKillable = true;
				this.playAnimation("idle");
				break;
			case 5:
				this.doLeave();
				this._isKillable = true;
				this.playAnimation("idle");
				break;
			case 1:
				this.playAnimation("idle");
				this._isKillable = false;
				break;
			case 3:
				this.playAnimation("split",1);
				this._gotHit = true;
				break;
			}
			break;
		case 2:
			switch(this._state) {
			case 1:
				this.playAnimation("idle");
				this._isKillable = true;
				break;
			case 2:
				this.playAnimation("zap");
				this._isKillable = false;
				break;
			case 3:
				this.playAnimation("squished");
				this._gotHit = true;
				break;
			}
			break;
		default:
			switch(this._state) {
			case 1:
				this.playAnimation("idle");
				this._isKillable = true;
				break;
			case 2:
				this.playAnimation("zap");
				this._isKillable = false;
				break;
			case 3:
				this.playAnimation("squished");
				this._gotHit = true;
				break;
			}
		}
	}
	,_resetTimers: function() {
		this._flagKill = true;
		this._flagUnkill = true;
		this._timerKillable = 1.5;
		this._timerUnkillable = 1;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		if(this._tween == null) return;
		if(!this._tween.complete) {
			this._tween.update(dt);
			this.pos.y = this._tween._getPos().y;
		}
		switch(this._imageType) {
		case 1:
			if(this._state == 4 && this._tween.complete) this.setState(1); else if(this._state == 5 && this._tween.complete) this.doDelete = true;
			if(this._gotHit) {
				if(this._flagKill) {
					this.setState(3);
					this._flagKill = false;
				}
			} else {
				if(this._state == 1) {
					this._timerKillable -= dt;
					if(this._timerKillable < 0) this.setState(5);
				}
				this._sinDisplay += this._sin_bob_rate * dt;
				this.pos.x = this._camera._getPos().x + 125;
			}
			break;
		case 2:
			this.pos.x -= 100 * dt;
			this._timerKillable -= dt;
			if(this._timerKillable < 0) {
				if(this._flagKill) {
					this._flagKill = false;
					this.setState(2);
				}
				this._timerUnkillable -= dt;
				if(this._timerUnkillable < 0) {
					if(this._flagUnkill) {
						this._flagUnkill = false;
						this.setState(1);
					}
					this._resetTimers();
				}
			}
			break;
		default:
			this._sinDisplay += this._sin_bob_rate * dt;
			this.pos.x -= 100 * dt;
			this._timerKillable -= dt;
			if(this._timerKillable < 0) {
				if(this._flagKill) {
					this._flagKill = false;
					this.setState(2);
				}
				this._timerUnkillable -= dt;
				if(this._timerUnkillable < 0) {
					if(this._flagUnkill) {
						this._flagUnkill = false;
						this.setState(1);
					}
					this._resetTimers();
				}
			}
		}
	}
	,getCustomBounds: function() {
		return this._boundsCustom;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.SpongeBob
});
com.nick.spongebob.chopping_block.world.elements.Squidward = function(inData) {
	this._chopOffset = -650;
	this._flagStopInput = false;
	this._flagAnimationComplete = true;
	this._flagDidLose = false;
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER;
	inData.library = "squidward_animation";
	inData.movie = "_squidward";
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	this._renderOffset.to(-450,0);
	this._tween = new com.workinman.math.WorkinMotion(new com.workinman.math.WorkinPoint(0,0),new com.workinman.math.WorkinPoint(0,0),0,0,com.workinman.math.WorkinMotion.EASE_IN_OUT);
	this._camera = inData.camera;
	this.addAnimation("chop",1,5);
	this.addAnimation("idle",8,48);
	this.addAnimation("hurt",49,89);
	this.addAnimation("angry",90,130);
	this.addAnimation("happy",131,171);
	this.addAnimation("nervous",172,212);
	this.addAnimation("game over",213,234);
	this.addAnimation("gold chop",236,240);
	this.addAnimation("gold idle",243,283);
	this.addAnimation("gold hurt",284,324);
	this.addAnimation("gold angry",325,365);
	this.addAnimation("gold happy",366,406);
	this.addAnimation("gold nervous",407,447);
	this.addAnimation("gold game over",448,470);
	this._display.scaleX.set__(1);
	this._sinDisplay = Math.random() * Math.PI;
	this._velocity.x = 0;
	this._posOnCamera = new com.workinman.math.WorkinPoint(0,0);
	this._prevPos = this.pos.copy();
	this._motionDistanceThisUpdate = new com.workinman.math.WorkinPoint();
	this.setState(0);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Squidward"] = com.nick.spongebob.chopping_block.world.elements.Squidward;
com.nick.spongebob.chopping_block.world.elements.Squidward.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Squidward"];
com.nick.spongebob.chopping_block.world.elements.Squidward.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.Squidward.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	dispose: function() {
		console.log("PLAYER DISPOSE!");
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.dispose.call(this);
	}
	,didLose: function() {
		return this._flagDidLose;
	}
	,_onAnimationComplete: function(animationName) {
		if(this._state == 1 && this._previousState == 3 || this._state == 4 && this._previousState == 3 || this._state == 6 && this._previousState == 3) this.setState(this._previousState); else if(this._state == 3) this.setState(this._state); else if(this._state == 7) this._flagDidLose = true; else this.setState(0);
		this._flagAnimationComplete = true;
	}
	,setState: function(pState) {
		this._state = pState;
		switch(this._state) {
		case 2:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold happy"); else this.playAnimation("happy");
			break;
		case 0:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold idle"); else this.playAnimation("idle");
			break;
		case 1:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold chop",1); else this.playAnimation("chop",1);
			break;
		case 3:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold angry"); else this.playAnimation("angry");
			break;
		case 4:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold hurt",1); else this.playAnimation("hurt",1);
			break;
		case 6:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold happy",1); else this.playAnimation("happy",1);
			break;
		case 5:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold nervous"); else this.playAnimation("nervous");
			break;
		case 7:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold game over",1); else this.playAnimation("game over",1);
			break;
		}
	}
	,giveLife: function() {
		var lives = com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH);
		this._previousState = this._state;
		this.setState(6);
		if(lives < 3) com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH,1); else console.log("[Squidward] Already At Max Lives");
	}
	,loseGame: function() {
		com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/injured");
		this.setState(7);
		this._flagDidLose = true;
	}
	,takeLife: function(pLives,pPlaySound) {
		if(pPlaySound == null) pPlaySound = true;
		if(pLives == null) pLives = 1;
		var lives = com.workinman.utils.WorkinCloud.instance.getFloat(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH);
		if(this._state != 2 || this._state != 4 || this._state != 3) {
			this._previousState = this._state;
			if(this._state == 7) {
			} else this.setState(4);
			if(lives > 0) {
				if(lives - pLives < 0) {
					if(pPlaySound) com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/injured");
					this._flagStopInput = true;
					this._flagDidLose = true;
				} else {
					if(pPlaySound) com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/injured");
					com.workinman.utils.WorkinCloud.instance.modifyValue(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH,-1);
				}
			} else {
				if(pPlaySound) com.workinman.utils.WorkinCloud.instance._getSound().playSound("sounds/injured");
				this._flagStopInput = true;
				this._flagDidLose = true;
			}
		}
	}
	,karateChop: function() {
		this._flagAnimationComplete = false;
		this._previousState = this._state;
		this.setState(1);
	}
	,renderPosition: function(pCamera) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.renderPosition.call(this,pCamera);
	}
	,doStand: function() {
		this.setState(this._state);
		this._tween.setStart(this._posOnCamera);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(-100,0),.5);
	}
	,doDashAway: function() {
		this.setState(this._state);
		this._tween.setStart(this._posOnCamera);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(this._camera._getPos().x + com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH,0),3);
	}
	,doDash: function() {
		this.setState(this._state);
		this._tween.setStart(this._posOnCamera);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(-150,0),.5);
	}
	,setChopDestination: function(pX,pY,pModifyFacing) {
		if(pModifyFacing == null) pModifyFacing = true;
		var pTargetX;
		if(pModifyFacing) {
			if(pX > com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) {
				console.log("[Squidward] pX greater than 420");
				this.setRight();
			} else this.setLeft();
			pTargetX = pX + this._chopOffset;
		} else {
			pTargetX = pX + this._chopOffset;
			if(pTargetX < -250) pTargetX = -250;
		}
		this._tween.setStart(this._posOnCamera);
		this._tween.setDestAndRate(new com.workinman.math.WorkinPoint(pTargetX,0),.2);
	}
	,setRight: function() {
		this._renderOffset.to(-450,0);
		this._display.scaleX.set__(1);
		this._chopOffset = -650;
	}
	,setLeft: function() {
		this._renderOffset.to(450,0);
		this._display.scaleX.set__(-1);
		this._chopOffset = -300;
	}
	,update: function(dt) {
		this._prevPos.toPoint(this.registrationPos);
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		this.updatePositionFromVelocity(dt);
		this.pos.x = this._camera._getPos().x + this._posOnCamera.x;
		if(!this._tween.complete) {
			this._tween.update(dt);
			this._posOnCamera.x = this._tween._getPos().x;
			this._posOnCamera.y = this._tween._getPos().y;
		}
		this._motionDistanceThisUpdate = com.workinman.math.WorkinMath.diffBetweenPoints(this._prevPos,this.registrationPos);
	}
	,getAnimationComplete: function() {
		return this._flagAnimationComplete;
	}
	,registrationYOffset: function() {
		return 500;
	}
	,registrationXOffset: function() {
		return this._display.getNaturalWidth() / 2;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Squidward
});
com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm = function(inData) {
	this._flagAnimationComplete = true;
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER;
	inData.library = "squidward_animation";
	inData.movie = "_arm_chop";
	this._player = inData.player;
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	this._renderOffset.to(-450,0);
	this.addAnimation("chop",1,5);
	this.addAnimation("idle",1,1);
	this.addAnimation("gold chop",8,12);
	this._display.scaleX.set__(1);
	this._sinDisplay = Math.random() * Math.PI;
	this._prevPos = this.pos.copy();
	this._motionDistanceThisUpdate = new com.workinman.math.WorkinPoint();
	console.log("[Squidward] registration X: " + this.registrationXOffset());
	console.log("[Squidward] registration Y: " + this.registrationYOffset());
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm"] = com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm;
com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm.__name__ = ["com","nick","spongebob","chopping_block","world","elements","SquidwardLeftArm"];
com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	dispose: function() {
		console.log("ARM DISPOSE!");
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.dispose.call(this);
	}
	,_onAnimationComplete: function(animationName) {
		this.setState(0);
		this._flagAnimationComplete = true;
	}
	,setState: function(pState) {
		this._state = pState;
		switch(this._state) {
		case 2:
			this.playAnimation("happy");
			break;
		case 0:
			this.playAnimation("idle");
			break;
		case 1:
			if(com.workinman.utils.WorkinCloud.instance.getBool(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE)) this.playAnimation("gold chop",1); else this.playAnimation("chop",1);
			break;
		case 3:
			this.playAnimation("angry");
			break;
		case 4:
			this.playAnimation("hurt");
			break;
		case 6:
			this.playAnimation("happy");
			break;
		case 5:
			this.playAnimation("nervous");
			break;
		}
	}
	,takeLife: function() {
		this.setState(4);
	}
	,karateChop: function(pX,pModifyFacing) {
		if(pModifyFacing == null) pModifyFacing = true;
		if(pModifyFacing) {
			if(pX > com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X) this.setRight(); else this.setLeft();
		}
		this._previousState = this._state;
		this.setState(1);
	}
	,setRight: function() {
		this._renderOffset.to(-450,0);
		this._display.scaleX.set__(1);
	}
	,setLeft: function() {
		this._renderOffset.to(450,0);
		this._display.scaleX.set__(-1);
	}
	,renderPosition: function(pCamera) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.renderPosition.call(this,pCamera);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		this.pos.x = this._player.pos.x;
		this.pos.y = this._player.pos.y;
	}
	,getAnimationComplete: function() {
		return this._flagAnimationComplete;
	}
	,registrationYOffset: function() {
		return 500;
	}
	,registrationXOffset: function() {
		return 0;
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.SquidwardLeftArm
});
com.nick.spongebob.chopping_block.world.elements.Transition = function(inData) {
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_TRANSITION;
	inData.library = "transition_animation";
	inData.movie = "transition";
	this._camera = inData.camera;
	this._imageType = inData.imageType;
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	switch(this._imageType) {
	case 1:
		this.addAnimation("begin transition",15,30);
		this.playAnimation("begin transition",1);
		break;
	case 2:
		this.pos.x = this._camera._getPos().x - 500;
		this.addAnimation("full transition",1,15);
		this.playAnimation("full transition",1);
		break;
	case 3:
		this.pos.x = this._camera._getPos().x - 500;
		this.addAnimation("full transition",1,15);
		this.playAnimation("full transition",1);
		break;
	}
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Transition"] = com.nick.spongebob.chopping_block.world.elements.Transition;
com.nick.spongebob.chopping_block.world.elements.Transition.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Transition"];
com.nick.spongebob.chopping_block.world.elements.Transition.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.Transition.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	_onAnimationComplete: function(animationName) {
		switch(this._imageType) {
		case 1:
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION_DONE));
			this.doDelete = true;
			break;
		case 2:
			break;
		case 3:
			com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventFlow(com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE));
			break;
		}
	}
	,renderPosition: function(pCamera) {
		this._display.x.set__(0);
		this._display.y.set__(0);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Transition
});
com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst = function() { }
$hxClasses["com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst"] = com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst;
com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst.__name__ = ["com","nick","spongebob","chopping_block","world","elements","TrickScoreBurst"];
com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	_onAnimationComplete: function(animationName) {
		if(this._flagOut) this.doDelete = true;
	}
	,close: function() {
		if(this._timerLifespan > 0) {
			this._flagCloseAfterTimer = true;
			return;
		}
		this._flagOut = true;
		this.playAnimation("out",1);
	}
	,update: function(dt) {
		if(this.currentAnimation() == "out") {
		}
		if(this._timerLifespan > 0) {
			this._timerLifespan -= dt;
			if(this._timerLifespan < 0) {
				if(this._flagCloseAfterTimer) this.close();
			}
		}
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		this._entity.add(this._display);
		this.updatePositionFromVelocity(dt);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.TrickScoreBurst
});
com.nick.spongebob.chopping_block.world.elements.Upgrade = function(inData) {
	this._imageType = inData.imageType;
	this._flagFirstTime = inData.flagFirstTime;
	this._damageState = inData.damageState;
	this._chooseType();
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_UPGRADE;
	inData.asset = this._assetId();
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	this._display.setScale(0.85);
	this.pos.y = com.workinman.utils.WorkinUtils.getRandom(800,800);
	this._health = 2;
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.Upgrade"] = com.nick.spongebob.chopping_block.world.elements.Upgrade;
com.nick.spongebob.chopping_block.world.elements.Upgrade.__name__ = ["com","nick","spongebob","chopping_block","world","elements","Upgrade"];
com.nick.spongebob.chopping_block.world.elements.Upgrade.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.Upgrade.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	doBounce: function() {
		this._flagBounce = true;
		this._bounceCount = 0;
		this._randomVelocity();
	}
	,getImageType: function() {
		return this._typeObject;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		if(this._flagBounce) {
			this.pos.x += this._velocity.x * dt;
			this.pos.y += this._velocity.y * dt;
			this._velocity.y += com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY * dt;
			if(this.pos.y > 800 && this._velocity.y > 0) {
				this._velocity.y *= -.8;
				this._bounceCount++;
				if(this._bounceCount > 3) {
					this._flagBounce = false;
					this.pos.y = 800;
				}
			}
		}
	}
	,powerUp: function() {
		switch(this._typeObject) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		default:
			return 1;
		}
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 1:
			switch(this._damageState) {
			case 1:
				return "elements/props/double.png";
			case 2:
				return "elements/props/clam_closed.png";
			default:
				return "";
			}
			break;
		case 2:
			switch(this._damageState) {
			case 1:
				return "elements/props/life.png";
			case 2:
				return "elements/props/clam_closed.png";
			default:
				return "";
			}
			break;
		case 3:
			switch(this._damageState) {
			case 1:
				return "elements/props/invincible.png";
			case 2:
				return "elements/props/clam_closed.png";
			default:
				return "";
			}
			break;
		default:
			switch(this._damageState) {
			case 1:
				return "elements/props/jelly1.png";
			case 2:
				return "elements/props/clam_closed.png";
			default:
				return "";
			}
		}
	}
	,_chooseType: function() {
		if(this._flagFirstTime) this._typeObject = Std["int"](com.workinman.utils.WorkinUtils.getRandom(1,3)); else this._typeObject = this._imageType;
	}
	,_randomVelocity: function() {
		this._randomX = com.workinman.utils.WorkinUtils.getRandom(400,400);
		this._randomY = com.workinman.utils.WorkinUtils.getRandom(300,450);
		this._velocity = new com.workinman.math.WorkinPoint(this._randomX,this._randomY);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.Upgrade
});
com.nick.spongebob.chopping_block.world.elements.UserIndicators = function(inData) {
	this._sin_bob_offset = 180;
	this._sin_bob_rate = 10;
	this._typeObject = inData.imageType;
	inData.asset = this._assetId();
	inData.type = com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_INDICATOR;
	this._flagFirstAppearance = true;
	this._scale = inData.scale;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	switch(this._typeObject) {
	case 1:
		this._display.alpha.set__(1.0);
		break;
	case 2:
		this._display.alpha.set__(1.0);
		break;
	case 6:
		this._display.alpha.set__(0);
		this._localText = new com.workinman.display.TextLocalized(110,130,"in_game_go","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._entity.addChild(this._localText._getEntity());
		break;
	case 7:
		this._display.alpha.set__(0);
		this._localText = new com.workinman.display.TextLocalized(125,120,"in_game_chopping_frenzy1","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._entity.addChild(this._localText._getEntity());
		this._localText = new com.workinman.display.TextLocalized(130,180,"in_game_chopping_frenzy2","",{ origin : new com.workinman.math.WorkinPoint(0,0)});
		this._entity.addChild(this._localText._getEntity());
		break;
	default:
		this._display.alpha.set__(0);
	}
	this._sinDisplay = Math.random() * Math.PI;
	this._display.setScale(this._scale);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.UserIndicators"] = com.nick.spongebob.chopping_block.world.elements.UserIndicators;
com.nick.spongebob.chopping_block.world.elements.UserIndicators.__name__ = ["com","nick","spongebob","chopping_block","world","elements","UserIndicators"];
com.nick.spongebob.chopping_block.world.elements.UserIndicators.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.nick.spongebob.chopping_block.world.elements.UserIndicators.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	removeIndicator: function() {
		this.doDelete = true;
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.update.call(this,dt);
		if(this._flagFirstAppearance) switch(this._typeObject) {
		case 1:
			this._sinDisplay += this._sin_bob_rate * dt;
			this.pos.y += Math.sin(this._sinDisplay) * this._sin_bob_offset * dt;
			break;
		case 2:
			break;
		case 7:
			var _g = this._display.alpha;
			_g.set__(_g.get__() + 1.5 * dt);
			break;
		default:
			var _g = this._display.alpha;
			_g.set__(_g.get__() + 2 * dt);
		} else {
		}
		if(this._display.alpha.get__() >= 1.5) this.removeIndicator();
	}
	,_assetId: function() {
		switch(this._typeObject) {
		case 1:
			return "ui/swipe_arrow.png";
		case 2:
			return "ui/bad_x.png";
		case 3:
			if(this._scale == 1.0) return "ui/3.png"; else return "ui/3.png";
			break;
		case 4:
			if(this._scale == 1.0) return "ui/2_red.png"; else return "ui/2_red.png";
			break;
		case 5:
			if(this._scale == 1.0) return "ui/1.png"; else return "ui/1.png";
			break;
		case 6:
			return "ui/frenzy.png";
		case 7:
			return "ui/frenzy.png";
		default:
			return "";
		}
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.UserIndicators
});
com.nick.spongebob.chopping_block.world.elements.effects = {}
com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic = function(inData) {
	this._lifespanMax = 0;
	if(inData.lifespan) this._lifespanMax = inData.lifespan;
	this._flagScreenlock = false;
	if(inData.screenlock) this._flagScreenlock = inData.screenlock;
	this._lifespanRemaining = this._lifespanMax;
	this._flagLifespan = this._lifespanMax > 0;
	this._gravity = 0;
	if(inData.gravity) this._gravity = inData.gravity;
	this._velocity = new com.workinman.math.WorkinPoint(0,0);
	if(inData.velocity) this._velocity = inData.velocity.copy();
	if(!inData.noAnimation) {
		if(!inData.rows) inData.rows = 4;
		if(!inData.columns) inData.columns = 5;
	}
	com.nick.spongebob.chopping_block.world.elements.AnimatedElement.call(this,inData);
	if(!inData.noAnimation) {
		this.addAnimation("in",0,5);
		this.addAnimation("idle",7,12);
		this.addAnimation("out",13,17);
	}
	this._setState(0);
};
$hxClasses["com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic"] = com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic;
com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic.__name__ = ["com","nick","spongebob","chopping_block","world","elements","effects","EffectBasic"];
com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic.__super__ = com.nick.spongebob.chopping_block.world.elements.AnimatedElement;
com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype,{
	_doOut: function() {
		this.playAnimation("out",1);
	}
	,_doIdle: function() {
		if(this._flagLifespan) this.playAnimation("idle"); else this.playAnimation("idle",1);
	}
	,_doIn: function() {
		this.playAnimation("in",1);
	}
	,_setState: function(pNewState) {
		this._state = pNewState;
		switch(this._state) {
		case 0:
			this._doIn();
			break;
		case 1:
			this._doIdle();
			break;
		case 2:
			this._doOut();
			break;
		}
	}
	,_onAnimationComplete: function(animationName) {
		if(this._state == 0) this._setState(1); else if(this._state == 1) {
			if(!this._flagLifespan) this._setState(2);
		} else if(this._state == 2) this.doDelete = true;
	}
	,_doLifespanDecrement: function(dt) {
		if(this._state == 2) return;
		if(this._flagLifespan) {
			this._lifespanRemaining -= dt;
			if(this._lifespanRemaining <= 0) this._setState(2);
		}
	}
	,_doMotion: function(dt) {
		this._velocity.y += this._gravity * dt;
		this.updatePositionFromVelocity(dt);
	}
	,renderPosition: function(pCamera) {
		if(this._flagScreenlock) {
			this._display.x.set__(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X - this.tileWidth / 2);
			this._display.y.set__(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y - this.tileHeight / 2);
			return;
		}
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.renderPosition.call(this,pCamera);
	}
	,update: function(dt) {
		com.nick.spongebob.chopping_block.world.elements.AnimatedElement.prototype.update.call(this,dt);
		this._doMotion(dt);
		this._doLifespanDecrement(dt);
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic
});
com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText = function() { }
$hxClasses["com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText"] = com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText;
com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText.__name__ = ["com","nick","spongebob","chopping_block","world","elements","effects","EffectFloatingScoreText"];
com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText.__super__ = com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic;
com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.effects.EffectBasic.prototype,{
	update: function(dt) {
		this._doMotion(dt);
		if(this._state == 0) {
			this._stateProgress += dt * 3;
			if(this._stateProgress >= 1) this._setState(1); else this._display.scaleX.set__(this._display.scaleY.set__(1 + (1 - this._stateProgress) * 1));
		} else if(this._state == 1) this._doLifespanDecrement(dt); else if(this._state == 2) {
			this._stateProgress += dt * 3;
			if(this._stateProgress >= 1) this.doDelete = true; else this._display.alpha.set__(1 - this._stateProgress / 1);
		}
	}
	,_setState: function(pState) {
		this._state = pState;
		this._stateProgress = 0;
		switch(this._state) {
		case 1:
			break;
		}
	}
	,__class__: com.nick.spongebob.chopping_block.world.elements.effects.EffectFloatingScoreText
});
var flambe = {}
flambe.util = {}
flambe.util.Disposable = function() { }
$hxClasses["flambe.util.Disposable"] = flambe.util.Disposable;
flambe.util.Disposable.__name__ = ["flambe","util","Disposable"];
flambe.util.Disposable.prototype = {
	__class__: flambe.util.Disposable
}
flambe.Component = function() { }
$hxClasses["flambe.Component"] = flambe.Component;
flambe.Component.__name__ = ["flambe","Component"];
flambe.Component.__interfaces__ = [flambe.util.Disposable];
flambe.Component.prototype = {
	_internal_setNext: function(next) {
		this.next = next;
	}
	,_internal_init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,get_name: function() {
		return null;
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,__class__: flambe.Component
}
com.workinman.components = {}
com.workinman.components.Updater = function() {
	this._paused = false;
};
$hxClasses["com.workinman.components.Updater"] = com.workinman.components.Updater;
com.workinman.components.Updater.__name__ = ["com","workinman","components","Updater"];
com.workinman.components.Updater.__super__ = flambe.Component;
com.workinman.components.Updater.prototype = $extend(flambe.Component.prototype,{
	setPaused: function(pPaused) {
		this._paused = pPaused;
		return this._paused;
	}
	,getPaused: function() {
		return this._paused;
	}
	,onUpdate: function(dt) {
		if(this._paused) return;
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventUpdate(dt));
	}
	,get_name: function() {
		return "Updater_3";
	}
	,__class__: com.workinman.components.Updater
});
com.workinman.data = {}
com.workinman.data.ConstantsCloud = function() { }
$hxClasses["com.workinman.data.ConstantsCloud"] = com.workinman.data.ConstantsCloud;
com.workinman.data.ConstantsCloud.__name__ = ["com","workinman","data","ConstantsCloud"];
com.workinman.data.ConstantsCloud.getUniqueId = function() {
	return Std.string(com.workinman.data.ConstantsCloud._uniqueId++);
}
com.workinman.defs = {}
com.workinman.defs.EffectDef = function(pType,pDur,pDelay,pMagnitude,pLoops,pOrigin) {
	if(pOrigin == null) pOrigin = -1;
	if(pLoops == null) pLoops = 1;
	this.type = pType;
	this.dur = this._durDefault = pDur;
	this.delay = this._delayDefault = pDelay;
	this.magnitude = pMagnitude;
	this.origin = pOrigin;
	this.loops = pLoops;
	this._flagWasActive = false;
};
$hxClasses["com.workinman.defs.EffectDef"] = com.workinman.defs.EffectDef;
com.workinman.defs.EffectDef.__name__ = ["com","workinman","defs","EffectDef"];
com.workinman.defs.EffectDef.prototype = {
	isActive: function() {
		return this.delay <= 0 && this.dur > 0;
	}
	,_getWasActive: function() {
		return this._flagWasActive;
	}
	,_getDurDefault: function() {
		return this._durDefault;
	}
	,update: function(dt) {
		this._flagWasActive = this.isActive();
		if(this.dur < 0) return;
		if(this.delay > 0) {
			this.delay -= dt;
			return;
		}
		this.dur -= dt;
	}
	,__class__: com.workinman.defs.EffectDef
}
com.workinman.defs.SoundDef = function() { }
$hxClasses["com.workinman.defs.SoundDef"] = com.workinman.defs.SoundDef;
com.workinman.defs.SoundDef.__name__ = ["com","workinman","defs","SoundDef"];
com.workinman.defs.SoundDef.prototype = {
	dispose: function() {
	}
	,__class__: com.workinman.defs.SoundDef
}
com.workinman.display.Display = function(pX,pY,pAsset,pRegistration) {
	if(pAsset == null) pAsset = "";
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,{ x : pX, y : pY, asset : pAsset, origin : pRegistration});
	this._addEventListeners();
};
$hxClasses["com.workinman.display.Display"] = com.workinman.display.Display;
com.workinman.display.Display.__name__ = ["com","workinman","display","Display"];
com.workinman.display.Display.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.workinman.display.Display.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	dispose: function() {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype.dispose.call(this);
		this._removeEventListeners();
	}
	,_updateValue: function() {
		return "";
	}
	,_refresh: function() {
	}
	,_onUpdateDisplay: function(inEvent) {
		if(inEvent._getData().valueID == this._updateValue()) this._refresh();
	}
	,_removeEventListeners: function() {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype._removeEventListeners.call(this);
		com.workinman.utils.WorkinCloud.instance.getDispatcher().removeEventListener(com.workinman.display.Display.EVENT_UPDATE_DISPLAY,$bind(this,this._onUpdateDisplay));
	}
	,_addEventListeners: function() {
		com.nick.spongebob.chopping_block.world.elements.Element.prototype._addEventListeners.call(this);
		com.workinman.utils.WorkinCloud.instance.getDispatcher().addEventListener(com.workinman.display.Display.EVENT_UPDATE_DISPLAY,$bind(this,this._onUpdateDisplay));
	}
	,__class__: com.workinman.display.Display
});
com.workinman.display.ElementManager = function(pTimeline,pCameraX,pCameraY) {
	this._timeline = pTimeline;
	this._layers = new Hash();
	this._elements = new Array();
	this._camera = new com.workinman.math.WorkinMotion(null,null,pCameraX,pCameraY);
	this._zSortLayers = new Hash();
};
$hxClasses["com.workinman.display.ElementManager"] = com.workinman.display.ElementManager;
com.workinman.display.ElementManager.__name__ = ["com","workinman","display","ElementManager"];
com.workinman.display.ElementManager.prototype = {
	renderElements: function() {
		var _g = 0, _g1 = this._elements;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			e.renderPosition(this._camera);
		}
	}
	,updateElements: function(dt) {
		this._i = this._elements.length;
		while(this._i > 0) {
			this._i--;
			if(this._elements[this._i].getType() == com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE_PARTICLE) {
			}
			this._elements[this._i].update(dt);
			if(this._elements[this._i].doDelete) this.removeElementAtIndex(this._i);
		}
	}
	,removeElementAtIndex: function(pIndex) {
		this._elements[pIndex]._getEntity().parent.removeChild(this._elements[pIndex]._getEntity());
		this._elements[pIndex].doDelete = true;
		this._elements[pIndex].dispose();
		this._elements.splice(pIndex,1);
	}
	,addElement: function(pElement) {
		if(this._layers.exists(pElement.layer) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[ElementManager](addElement) Trying to add element to non-existant layer '" + pElement.layer + "'!");
			return pElement;
		}
		this._i = 0;
		while(this._i < this._elements.length) {
			if(this._elements[this._i]._getUniqueId() == pElement._getUniqueId()) {
				this._layers.get(pElement.layer).addChild(pElement._getEntity());
				return pElement;
			}
			this._i++;
		}
		console.log("[ElementManager] adding element at: " + pElement.pos.x);
		this._elements.push(pElement);
		this._layers.get(pElement.layer).addChild(pElement._getEntity());
		if(this._zSortLayers.exists(pElement.layer)) this._zSortLayers.get(pElement.layer).push(pElement);
		return pElement;
	}
	,addLayer: function(pLayerName,pZSortLayer) {
		if(pZSortLayer == null) pZSortLayer = false;
		if(this._layers.exists(pLayerName)) {
			this._timeline.removeChild(this._layers.get(pLayerName));
			this._timeline.addChild(this._layers.get(pLayerName));
			return;
		}
		var tLayer = new flambe.Entity();
		this._timeline.addChild(tLayer);
		this._layers.set(pLayerName,tLayer);
		tLayer = null;
		if(pZSortLayer) {
			var tElements = new Array();
			this._zSortLayers.set(pLayerName,tElements);
		}
	}
	,_getElements: function() {
		return this._elements;
	}
	,_getCamera: function() {
		return this._camera;
	}
	,__class__: com.workinman.display.ElementManager
}
com.workinman.display.PoolManager = function() {
	this._pools = new Hash();
};
$hxClasses["com.workinman.display.PoolManager"] = com.workinman.display.PoolManager;
com.workinman.display.PoolManager.__name__ = ["com","workinman","display","PoolManager"];
com.workinman.display.PoolManager.prototype = {
	createElement: function(inPoolName,inObject) {
		if(this._pools.exists(inPoolName) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[PoolManager](createElement) Can't create element from pool '" + inPoolName + "' it doesn't exist!");
			return null;
		}
		var tElement = this._pools.get(inPoolName).getElement();
		tElement.renew(inObject);
		return tElement;
	}
	,addPool: function(inPoolName,inClass,inCount) {
		if(inCount == null) inCount = 20;
		if(this._pools.exists(inPoolName)) {
			this._pools.get(inPoolName).changeCount(inCount);
			return;
		}
		var tPool = new com.workinman.display.PoolData(inClass,inCount);
		this._pools.set(inPoolName,tPool);
		tPool = null;
	}
	,dispose: function() {
		var $it0 = this._pools.iterator();
		while( $it0.hasNext() ) {
			var pool = $it0.next();
			pool.dispose();
		}
		this._pools = null;
	}
	,__class__: com.workinman.display.PoolManager
}
com.workinman.display.PoolData = function(inClass,inCount) {
	this._elements = new Array();
	this._class = inClass;
	this.changeCount(inCount);
};
$hxClasses["com.workinman.display.PoolData"] = com.workinman.display.PoolData;
com.workinman.display.PoolData.__name__ = ["com","workinman","display","PoolData"];
com.workinman.display.PoolData.prototype = {
	dispose: function() {
		var i = 0;
		while(i < this._elements.length) {
			this._elements[i]._setIsPooled(false);
			this._elements[i].dispose();
			i++;
		}
		this._elements = null;
		this._class = null;
	}
	,changeCount: function(pCount) {
		if(pCount == this._elements.length) return;
		if(this._elements.length < pCount) {
			var i = pCount - this._elements.length;
			while(i-- > 0) this._elements.push(Type.createInstance(this._class,[{ pooled : true}]));
		} else {
		}
	}
	,getElement: function(inCreateNew) {
		if(inCreateNew == null) inCreateNew = false;
		var i = 0;
		var tElement;
		while(i < this._elements.length) {
			if(!this._elements[i]._getIsActive()) {
				tElement = this._elements[i];
				this._elements.splice(i,1);
				this._elements.push(tElement);
				return tElement;
			}
			i++;
		}
		if(inCreateNew) {
			this.changeCount(this._elements.length + 1);
			return this._elements[this._elements.length - 1];
		} else {
			tElement = this._elements[0];
			this._elements.splice(0,1);
			tElement.release();
			this._elements.push(tElement);
			return tElement;
		}
	}
	,__class__: com.workinman.display.PoolData
}
com.workinman.display.Renderable = function(pWidth,pHeight) {
	if(pHeight == null) pHeight = 1;
	if(pWidth == null) pWidth = 1;
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.width = pWidth;
	this.height = pHeight;
	this.alpha = 1;
	this.visible = true;
};
$hxClasses["com.workinman.display.Renderable"] = com.workinman.display.Renderable;
com.workinman.display.Renderable.__name__ = ["com","workinman","display","Renderable"];
com.workinman.display.Renderable.prototype = {
	__class__: com.workinman.display.Renderable
}
com.workinman.display.TextBase = function(inX,inY,inText,inFont,inData) {
	if(inFont == null) inFont = "";
	if(inData == null) inData = { };
	inData.x = inX;
	inData.y = inY;
	com.nick.spongebob.chopping_block.world.elements.Element.call(this,inData);
	if(inFont == "") inFont = com.workinman.data.ConstantsCloud.FONT_DEFAULT;
	com.workinman.utils.WorkinCloud.instance.log("[TextBase](construct) : " + inFont);
	this._textString = inText;
	this._fontName = inFont;
	this._textDisplay = new flambe.display.TextSprite(com.workinman.utils.WorkinCloud.instance.getAssets().getFont(this._fontName),"");
};
$hxClasses["com.workinman.display.TextBase"] = com.workinman.display.TextBase;
com.workinman.display.TextBase.__name__ = ["com","workinman","display","TextBase"];
com.workinman.display.TextBase.__super__ = com.nick.spongebob.chopping_block.world.elements.Element;
com.workinman.display.TextBase.prototype = $extend(com.nick.spongebob.chopping_block.world.elements.Element.prototype,{
	_renderTextToDisplay: function() {
		this._textDisplay.set_text(this._textString);
	}
	,_renderFontToDisplay: function() {
		this._textDisplay.set_font(com.workinman.utils.WorkinCloud.instance.getAssets().getFont(this._fontName));
	}
	,_setText: function(inText) {
		this._textString = inText;
		this._renderTextToDisplay();
		return this._textString;
	}
	,_getText: function() {
		return this._textString;
	}
	,_setFont: function(inFont) {
		if(inFont == "") return "";
		this._fontName = inFont;
		this._renderFontToDisplay();
		return this._fontName;
	}
	,_getFont: function() {
		return this._fontName;
	}
	,__class__: com.workinman.display.TextBase
});
com.workinman.display.TextLocalized = function(inX,inY,inText,inFont,inData) {
	if(inFont == null) inFont = "";
	com.workinman.display.TextBase.call(this,inX,inY,inText,inFont,inData);
	this._renderTextToDisplay();
};
$hxClasses["com.workinman.display.TextLocalized"] = com.workinman.display.TextLocalized;
com.workinman.display.TextLocalized.__name__ = ["com","workinman","display","TextLocalized"];
com.workinman.display.TextLocalized.__super__ = com.workinman.display.TextBase;
com.workinman.display.TextLocalized.prototype = $extend(com.workinman.display.TextBase.prototype,{
	renderPosition: function(pCamera) {
		this._display.x.set__(this.pos.x);
		this._display.y.set__(this.pos.y);
	}
	,_renderTextToDisplay: function() {
		var tData = com.workinman.utils.WorkinCloud.instance._getLocalize().getData(this._textString);
		console.log("[TextLocalized] x: " + this.pos.x + " y: " + this.pos.y);
		console.log("[TextLocalized] scale: " + tData._getScale());
		if(tData._getFontName() != this._fontName) this._setFont(tData._getFontName());
		this._textDisplay.scaleX.set__(tData._getScale());
		this._textDisplay.scaleY.set__(tData._getScale());
		this._textDisplay.set_text(tData._getString());
		tData = null;
		this._display = this._textDisplay;
		this._display.x.set__(this.pos.x);
		this._display.y.set__(this.pos.y);
		this._entity.add(this._display);
	}
	,__class__: com.workinman.display.TextLocalized
});
com.workinman.display.Viewport = function(pTimeline) {
	this._timeline = pTimeline;
	this._layers = new Hash();
};
$hxClasses["com.workinman.display.Viewport"] = com.workinman.display.Viewport;
com.workinman.display.Viewport.__name__ = ["com","workinman","display","Viewport"];
com.workinman.display.Viewport.prototype = {
	removeChild: function(pElement) {
		if(pElement == null || !this._layers.exists(pElement.layer)) {
			console.log("[Viewport](removeChild) Failed to remove element to layer " + pElement.layer);
			return;
		}
		this._layers.get(pElement.layer).removeChild(pElement._getEntity());
	}
	,addChild: function(pElement) {
		if(pElement == null || !this._layers.exists(pElement.layer)) {
			console.log("[Viewport](addChild) Failed to add element to layer " + pElement.layer);
			return;
		}
		this._layers.get(pElement.layer).addChild(pElement._getEntity());
	}
	,addLayer: function(pId) {
		var tEntity = new flambe.Entity();
		this._timeline.addChild(tEntity);
		this._layers.set(pId,tEntity);
	}
	,__class__: com.workinman.display.Viewport
}
com.workinman.events = {}
com.workinman.events.WMEvent = function(pId) {
	this._eventId = pId;
};
$hxClasses["com.workinman.events.WMEvent"] = com.workinman.events.WMEvent;
com.workinman.events.WMEvent.__name__ = ["com","workinman","events","WMEvent"];
com.workinman.events.WMEvent.prototype = {
	getEventId: function() {
		return this._eventId;
	}
	,__class__: com.workinman.events.WMEvent
}
com.workinman.events.WMEventData = function(pEventId,pData) {
	com.workinman.events.WMEvent.call(this,pEventId);
	this._data = pData;
};
$hxClasses["com.workinman.events.WMEventData"] = com.workinman.events.WMEventData;
com.workinman.events.WMEventData.__name__ = ["com","workinman","events","WMEventData"];
com.workinman.events.WMEventData.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventData.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	_getData: function() {
		return this._data;
	}
	,__class__: com.workinman.events.WMEventData
});
com.workinman.events.WMEventDispatcher = function() {
	this._signals = new Hash();
};
$hxClasses["com.workinman.events.WMEventDispatcher"] = com.workinman.events.WMEventDispatcher;
com.workinman.events.WMEventDispatcher.__name__ = ["com","workinman","events","WMEventDispatcher"];
com.workinman.events.WMEventDispatcher.prototype = {
	dispose: function() {
		var $it0 = this._signals.iterator();
		while( $it0.hasNext() ) {
			var s = $it0.next();
			s.dispose();
		}
		this._signals = null;
	}
	,dispatchEvent: function(pEvent) {
		if(!this._signals.exists(pEvent.getEventId())) return;
		this._signals.get(pEvent.getEventId()).dispatchEvent(pEvent);
	}
	,removeEventListener: function(pEventId,pListener) {
		if(!this._signals.exists(pEventId)) {
			console.log("[WMEventDispatcher](removeEventListener) " + pEventId + " doesn't exist!");
			return;
		}
		this._signals.get(pEventId).removeEventListener(pListener);
		if(this._signals.get(pEventId).isEmtpy()) {
			this._signals.get(pEventId).dispose();
			this._signals.remove(pEventId);
		}
	}
	,addEventListener: function(pEventId,pListener) {
		if(!this._signals.exists(pEventId)) this._signals.set(pEventId,new com.workinman.events._WMEventDispatcher.WMEventTracker());
		this._signals.get(pEventId).addEventListener(pListener);
	}
	,__class__: com.workinman.events.WMEventDispatcher
}
com.workinman.events._WMEventDispatcher = {}
com.workinman.events._WMEventDispatcher.WMEventTracker = function() {
	this._signalConnection = new Array();
	this._signal = new flambe.util.Signal1();
};
$hxClasses["com.workinman.events._WMEventDispatcher.WMEventTracker"] = com.workinman.events._WMEventDispatcher.WMEventTracker;
com.workinman.events._WMEventDispatcher.WMEventTracker.__name__ = ["com","workinman","events","_WMEventDispatcher","WMEventTracker"];
com.workinman.events._WMEventDispatcher.WMEventTracker.prototype = {
	dispose: function() {
		this._signal = null;
		var _g = 0, _g1 = this._signalConnection;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.dispose();
		}
		this._signalConnection = null;
	}
	,isEmtpy: function() {
		return !this._signal.hasListeners();
	}
	,dispatchEvent: function(pEvent) {
		this._signal.emit(pEvent);
	}
	,removeEventListener: function(pListener) {
		var tI = this._signalConnection.length;
		while(tI > 0) {
			tI--;
			if(Reflect.compareMethods(this._signalConnection[tI]._getListener(),pListener)) {
				this._signalConnection[tI].dispose();
				this._signalConnection.splice(tI,1);
			}
		}
	}
	,addEventListener: function(pListener) {
		this._signalConnection.push(new com.workinman.events._WMEventDispatcher.SignalTracker(pListener,this._signal.connect(pListener)));
	}
	,__class__: com.workinman.events._WMEventDispatcher.WMEventTracker
}
com.workinman.events._WMEventDispatcher.SignalTracker = function(pFunction,pConnection) {
	this._function = pFunction;
	this._connection = pConnection;
};
$hxClasses["com.workinman.events._WMEventDispatcher.SignalTracker"] = com.workinman.events._WMEventDispatcher.SignalTracker;
com.workinman.events._WMEventDispatcher.SignalTracker.__name__ = ["com","workinman","events","_WMEventDispatcher","SignalTracker"];
com.workinman.events._WMEventDispatcher.SignalTracker.prototype = {
	_getListener: function() {
		return this._function;
	}
	,dispose: function() {
		this._function = null;
		this._connection.dispose();
		this._connection = null;
	}
	,__class__: com.workinman.events._WMEventDispatcher.SignalTracker
}
com.workinman.events.WMEventFlow = function(pEventId,pTargetScreen) {
	if(pTargetScreen == null) pTargetScreen = false;
	this.flowId = pEventId;
	this.targetScreen = pTargetScreen;
	com.workinman.events.WMEvent.call(this,com.workinman.events.WMEventFlow.EVENT_FLOW);
};
$hxClasses["com.workinman.events.WMEventFlow"] = com.workinman.events.WMEventFlow;
com.workinman.events.WMEventFlow.__name__ = ["com","workinman","events","WMEventFlow"];
com.workinman.events.WMEventFlow.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventFlow.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	__class__: com.workinman.events.WMEventFlow
});
com.workinman.events.WMEventInput = function(pPhase,pInput,pX,pY) {
	com.workinman.events.WMEvent.call(this,com.workinman.events.WMEventInput.EVENT_INPUT);
	this.phase = pPhase;
	this.input = pInput;
	this.x = pX;
	this.y = pY;
};
$hxClasses["com.workinman.events.WMEventInput"] = com.workinman.events.WMEventInput;
com.workinman.events.WMEventInput.__name__ = ["com","workinman","events","WMEventInput"];
com.workinman.events.WMEventInput.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventInput.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	__class__: com.workinman.events.WMEventInput
});
com.workinman.events.WMEventInterfaceChange = function(pEventId,pScreenId,pCustomData) {
	if(pScreenId == null) pScreenId = "";
	this.flowId = pEventId;
	this.screenId = pScreenId;
	if(pCustomData == null) pCustomData = new Hash();
	this.customData = pCustomData;
	com.workinman.events.WMEvent.call(this,com.workinman.events.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT);
};
$hxClasses["com.workinman.events.WMEventInterfaceChange"] = com.workinman.events.WMEventInterfaceChange;
com.workinman.events.WMEventInterfaceChange.__name__ = ["com","workinman","events","WMEventInterfaceChange"];
com.workinman.events.WMEventInterfaceChange.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventInterfaceChange.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	__class__: com.workinman.events.WMEventInterfaceChange
});
com.workinman.events.WMEventScreenOut = function(pEventId,pScreenId) {
	this.flowId = pEventId;
	this.screenId = pScreenId;
	com.workinman.events.WMEvent.call(this,com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT);
};
$hxClasses["com.workinman.events.WMEventScreenOut"] = com.workinman.events.WMEventScreenOut;
com.workinman.events.WMEventScreenOut.__name__ = ["com","workinman","events","WMEventScreenOut"];
com.workinman.events.WMEventScreenOut.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventScreenOut.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	__class__: com.workinman.events.WMEventScreenOut
});
com.workinman.events.WMEventUpdate = function(pDt) {
	com.workinman.events.WMEvent.call(this,com.workinman.events.WMEventUpdate.EVENT_UPDATE);
	this._dt = pDt;
};
$hxClasses["com.workinman.events.WMEventUpdate"] = com.workinman.events.WMEventUpdate;
com.workinman.events.WMEventUpdate.__name__ = ["com","workinman","events","WMEventUpdate"];
com.workinman.events.WMEventUpdate.__super__ = com.workinman.events.WMEvent;
com.workinman.events.WMEventUpdate.prototype = $extend(com.workinman.events.WMEvent.prototype,{
	getDt: function() {
		return this._dt;
	}
	,__class__: com.workinman.events.WMEventUpdate
});
com.workinman.events.WMGestures = function() {
};
$hxClasses["com.workinman.events.WMGestures"] = com.workinman.events.WMGestures;
com.workinman.events.WMGestures.__name__ = ["com","workinman","events","WMGestures"];
com.workinman.events.WMGestures.prototype = {
	_distanceFormula: function(pX1,pX2,pY1,pY2) {
		return Math.sqrt((pX1 - pX2) * (pX1 - pX2) + (pY1 - pY2) * (pY1 - pY2));
	}
	,_didUserSwipe: function(pX,pY) {
		this._currX = pX;
		this._currY = pY;
		if(this._distanceFormula(this._currX,this._prevX,this._currY,this._prevY) > 125 && this._distanceFormula(this._currX,this._prevX,this._currY,this._prevY) < 175) return true; else return false;
	}
	,_startingPoints: function(pX,pY) {
		this._prevX = pX;
		this._prevY = pY;
	}
	,__class__: com.workinman.events.WMGestures
}
com.workinman.math = {}
com.workinman.math.WorkinCamera = function() { }
$hxClasses["com.workinman.math.WorkinCamera"] = com.workinman.math.WorkinCamera;
com.workinman.math.WorkinCamera.__name__ = ["com","workinman","math","WorkinCamera"];
com.workinman.math.WorkinCamera.prototype = {
	_getScreenCenterY: function() {
		return this._screenCenterY;
	}
	,_getScreenCenterX: function() {
		return this._screenCenterX;
	}
	,_getPos: function() {
		return this._pos;
	}
	,__class__: com.workinman.math.WorkinCamera
}
com.workinman.math.WorkinMath = function() { }
$hxClasses["com.workinman.math.WorkinMath"] = com.workinman.math.WorkinMath;
com.workinman.math.WorkinMath.__name__ = ["com","workinman","math","WorkinMath"];
com.workinman.math.WorkinMath.diffBetweenPoints = function(p0,p1) {
	return new com.workinman.math.WorkinPoint(p1.x - p0.x,p1.y - p0.y);
}
com.workinman.math.WorkinMotion = function(pPos,pDest,pRate,pDelay,pEase,pType) {
	if(pType == null) pType = "";
	if(pEase == null) pEase = "";
	if(pDelay == null) pDelay = 0;
	if(pRate == null) pRate = 0;
	if(pPos == null) pPos = new com.workinman.math.WorkinPoint();
	this._vel = new com.workinman.math.WorkinPoint();
	this._pos = pPos.copy();
	this._progress = 0;
	this._dest = null;
	this._rate = pRate;
	this._delay = pDelay;
	this._type = "";
	if(pEase == "") this._ease = com.workinman.math.WorkinMotion.EASE_IN_OUT; else this._ease = pEase;
	if(pType != "") this._type = pType;
	this.complete = false;
	if(pDest != null) {
		this._dest = pDest.copy();
		this._makeVel();
		this._calculateTween();
	}
};
$hxClasses["com.workinman.math.WorkinMotion"] = com.workinman.math.WorkinMotion;
com.workinman.math.WorkinMotion.__name__ = ["com","workinman","math","WorkinMotion"];
com.workinman.math.WorkinMotion.prototype = {
	dispose: function() {
		this._vel = null;
		this._pos = null;
		this._dest = null;
		this._vectorTween = null;
		this._start = null;
		this.complete = true;
	}
	,_updatePosFromVel: function(dt) {
		this._pos.x += this._vel.x * dt;
		this._pos.y += this._vel.y * dt;
	}
	,_formulaEase: function(t,b,c,d) {
		switch(this._ease) {
		case com.workinman.math.WorkinMotion.EASE_IN_OUT:
			if((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * (--t * (t - 2) - 1) + b;
		case com.workinman.math.WorkinMotion.EASE_IN:
			return c * (t /= d) * t + b;
		case com.workinman.math.WorkinMotion.EASE_IN_FAST:
			return c * (t /= d) * t + b;
		case com.workinman.math.WorkinMotion.EASE_OUT:
			return -c * (t /= d) * (t - 2) + b;
		case com.workinman.math.WorkinMotion.EASE_OUT_FAST:
			return t == d?b + c:c * (-Math.pow(2,-10 * t / d) + 1) + b;
		case com.workinman.math.WorkinMotion.EASE_LINEAR:
			return c * t / d + b;
		case com.workinman.math.WorkinMotion.EASE_BOUNCE_IN:
			if((t /= d) < 1 / 2.75) return c * (7.5625 * t * t) + b; else if(t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b; else if(t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b; else return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
			break;
		}
		return c * t / d + b;
	}
	,update: function(dt) {
		if(this._delay > 0) {
			this._delay -= dt;
			return;
		}
		if(this._dest != null) {
			if(this._rate == 0) this._pos.toPoint(this._dest); else if(this._progress >= this._rate) this._pos.toPoint(this._dest); else {
				this._progress += dt;
				if(this._progress > this._rate) this._progress = this._rate;
				this._pos.x = this._formulaEase(this._progress,this._start.x,this._vectorTween.x,this._rate);
				this._pos.y = this._formulaEase(this._progress,this._start.y,this._vectorTween.y,this._rate);
			}
			if(this._progress >= this._rate) this.complete = true;
		} else this._updatePosFromVel(dt);
	}
	,isReady: function() {
		return this._delay <= 0;
	}
	,_makeVel: function() {
		this._vel.to(this._rate,0);
		this._vel.rotateTo(this._pos.getAngleBetween(this._dest));
	}
	,setDestAndRate: function(pDest,pRate) {
		this._setRate(pRate);
		this._setDest(pDest);
	}
	,setStartFast: function(pX,pY) {
		this._getPos().x = pX;
		this._getPos().y = pY;
		this._calculateTween();
	}
	,setStart: function(pStart) {
		this._setPos(pStart.copy());
		this._calculateTween();
	}
	,_setType: function(pType) {
		this._type = pType;
		return this._type;
	}
	,_getType: function() {
		return this._type;
	}
	,_setRate: function(pNewRate) {
		if(pNewRate == 0 && this._dest != null) {
			this._pos.toPoint(this._dest);
			this.complete = true;
		}
		this._rate = pNewRate;
		return this._rate;
	}
	,_getRate: function() {
		return this._rate;
	}
	,_setVel: function(pNewVel) {
		this._dest = null;
		this.complete = true;
		this._vel.toPoint(pNewVel);
		return this._vel;
	}
	,_getVel: function() {
		return this._vel;
	}
	,_setDest: function(pNewDest) {
		if(pNewDest == null) {
			this._dest = null;
			this._vel.to(0,0);
			this.complete = true;
			return null;
		}
		this._dest.toPoint(pNewDest);
		this.complete = false;
		if(this._rate >= 1) this._makeVel(); else if(this._rate == 0) this._pos.toPoint(this._dest);
		this._calculateTween();
		return this._dest;
	}
	,_getDest: function() {
		return this._dest;
	}
	,_setEase: function(pEase) {
		this._ease = pEase;
		return this._ease;
	}
	,_getEase: function() {
		return this._ease;
	}
	,_setPos: function(pNewPos) {
		this._pos.toPoint(pNewPos);
		if(this._rate >= 1) this._makeVel();
		this._calculateTween();
		return this._pos;
	}
	,_getPos: function() {
		return this._pos;
	}
	,_getRatio: function() {
		return this._progress / this._rate;
	}
	,_calculateTween: function() {
		this._progress = 0;
		this._start = this._pos.copy();
		this._vectorTween = new com.workinman.math.WorkinPoint(this._dest.x - this._start.x,this._dest.y - this._start.y);
	}
	,__class__: com.workinman.math.WorkinMotion
}
com.workinman.math.WorkinPoint = function(pX,pY,pZ) {
	if(pZ == null) pZ = 0;
	if(pY == null) pY = 0;
	if(pX == null) pX = 0;
	this.x = Math.round(pX * 1000) / 1000;
	this.y = Math.round(pY * 1000) / 1000;
	this.z = Math.round(pZ * 1000) / 1000;
	this.calculateLength();
};
$hxClasses["com.workinman.math.WorkinPoint"] = com.workinman.math.WorkinPoint;
com.workinman.math.WorkinPoint.__name__ = ["com","workinman","math","WorkinPoint"];
com.workinman.math.WorkinPoint.prototype = {
	_getNormalizedMagnitude: function() {
		var tNormalizedVector = this.normalizeCopy();
		return Math.sqrt(tNormalizedVector.x * tNormalizedVector.x + tNormalizedVector.y * tNormalizedVector.y);
	}
	,getAngleBetween: function(pPoint) {
		if(pPoint._getLength() == 0 || this._getLength() == 0) return 0;
		return 180 / Math.PI * Math.acos((pPoint.x * this.x + pPoint.y * this.y) / (pPoint._getLength() * this._getLength()));
	}
	,rotateTo: function(pAngle) {
		this.rotate(pAngle - this._getAngle());
	}
	,rotate: function(pAngle) {
		pAngle = pAngle * (Math.PI / 180);
		var tX = this.x * Math.cos(pAngle) - this.y * Math.sin(pAngle);
		var tY = this.y * Math.cos(pAngle) + this.x * Math.sin(pAngle);
		this.x = tX;
		this.y = tY;
	}
	,calculateLength: function() {
		this._length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,normalizeCopy: function() {
		if(this._length == 0) return new com.workinman.math.WorkinPoint(0,0,0);
		return new com.workinman.math.WorkinPoint(this.x / this._length,this.y / this._length,this.z / this._length);
	}
	,_setLength: function(pLen) {
		if(this._length == 0 || pLen <= 0) {
			this.to(0,0);
			return this._length;
		}
		this.multiply(pLen / this._length);
		return this._length;
	}
	,_getLength: function() {
		return this._length;
	}
	,copy: function() {
		return new com.workinman.math.WorkinPoint(this.x,this.y,this.z);
	}
	,multiply: function(pScalar) {
		this.x *= pScalar;
		this.y *= pScalar;
		this.z *= pScalar;
		this.clean();
		this.calculateLength();
	}
	,toPoint: function(pPoint) {
		this.x = pPoint.x;
		this.y = pPoint.y;
		this.z = pPoint.z;
		this.calculateLength();
	}
	,to: function(pX,pY,pZ) {
		if(pZ == null) pZ = 0;
		this.x = pX;
		this.y = pY;
		this.z = pZ;
		this.calculateLength();
	}
	,clean: function() {
		this.x = Math.round(this.x * 1000) / 1000;
		this.y = Math.round(this.y * 1000) / 1000;
		this.z = Math.round(this.z * 1000) / 1000;
	}
	,_getAngle: function() {
		return Math.atan2(this.y,this.x) * 180 / Math.PI;
	}
	,__class__: com.workinman.math.WorkinPoint
}
com.workinman.net = {}
com.workinman.net.WMSharedObject = function(pSO) {
	com.workinman.events.WMEventDispatcher.call(this);
	this._data = { };
	this.sharedKey = "";
};
$hxClasses["com.workinman.net.WMSharedObject"] = com.workinman.net.WMSharedObject;
com.workinman.net.WMSharedObject.__name__ = ["com","workinman","net","WMSharedObject"];
com.workinman.net.WMSharedObject.getLocalStorage = function() {
	return js.Lib.window.localStorage;
}
com.workinman.net.WMSharedObject.getLocal = function(name,localPath) {
	var url = js.Lib.window.location.href;
	if(localPath == null) localPath = url;
	var so = new com.workinman.net.WMSharedObject();
	so.sharedKey = localPath + ":" + name;
	var rawData = com.workinman.net.WMSharedObject.getLocalStorage().getItem(so.sharedKey);
	so._setData(rawData == "" || rawData == null?{ }:haxe.Unserializer.run(rawData));
	return so;
}
com.workinman.net.WMSharedObject.__super__ = com.workinman.events.WMEventDispatcher;
com.workinman.net.WMSharedObject.prototype = $extend(com.workinman.events.WMEventDispatcher.prototype,{
	flush: function() {
		var data = haxe.Serializer.run(this._getData());
		com.workinman.net.WMSharedObject.getLocalStorage().setItem(this.sharedKey,data);
		return com.workinman.net.SharedObjectFlushedStatus.FLUSHED;
	}
	,_setData: function(pData) {
		this._data = pData;
		return this._data;
	}
	,_getData: function() {
		return this._data;
	}
	,dispose: function() {
		this._data = null;
		com.workinman.events.WMEventDispatcher.prototype.dispose.call(this);
	}
	,__class__: com.workinman.net.WMSharedObject
});
com.workinman.net.SharedObjectFlushedStatus = function() { }
$hxClasses["com.workinman.net.SharedObjectFlushedStatus"] = com.workinman.net.SharedObjectFlushedStatus;
com.workinman.net.SharedObjectFlushedStatus.__name__ = ["com","workinman","net","SharedObjectFlushedStatus"];
com.workinman.services = {}
com.workinman.services.ServiceAnalytics = function() {
	var tFuncToInclude = [com.workinman.services.ServiceAnalytics.onAnalyticsLoad];
};
$hxClasses["com.workinman.services.ServiceAnalytics"] = com.workinman.services.ServiceAnalytics;
com.workinman.services.ServiceAnalytics.__name__ = ["com","workinman","services","ServiceAnalytics"];
com.workinman.services.ServiceAnalytics.onAnalyticsLoad = function() {
	if(com.workinman.services.ServiceAnalytics._flagLoaded) return;
	com.workinman.utils.WorkinCloud.instance.log("[ServiceAnalytics](onAnalyticsLoad) Load complete");
	com.workinman.services.ServiceAnalytics._flagLoaded = true;
	haxe.Timer.delay(com.workinman.services.ServiceAnalytics._runQueuedCommands,1000);
}
com.workinman.services.ServiceAnalytics.init = function(inAppId,inSharedObjectId) {
	if(inSharedObjectId == null) inSharedObjectId = "";
	com.workinman.services.ServiceAnalytics._flagInitted = true;
	com.workinman.services.ServiceAnalytics._queuedCommands = new Array();
	if(inAppId.toLowerCase() == "x") com.workinman.services.ServiceAnalytics.OPTION_ENABLE_TRACKING = false;
	if(!com.workinman.services.ServiceAnalytics.OPTION_ENABLE_TRACKING) return;
	if(inSharedObjectId == "") inSharedObjectId = com.workinman.services.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID;
	com.workinman.services.ServiceAnalytics._flagStarted = false;
	com.workinman.utils.WorkinCloud.instance.log("[ServiceAnalytics](initAnalytics)");
	com.workinman.services.ServiceAnalytics._appId = inAppId;
	com.workinman.services.ServiceAnalytics._sharedObjectId = inSharedObjectId;
	com.workinman.services.ServiceAnalytics._sharedObjectData = com.workinman.utils.WorkinCloud.instance.sharedObjectGetData(com.workinman.services.ServiceAnalytics._sharedObjectId);
	com.workinman.services.ServiceAnalytics._generateSessionID();
	if(com.workinman.services.ServiceAnalytics._sharedObjectData.userID == null || Std.string(com.workinman.services.ServiceAnalytics._sharedObjectData.userID).length < 14) {
		com.workinman.services.ServiceAnalytics._generateOfflineIDs();
		com.workinman.services.ServiceAnalytics._sharedObjectData.userID = com.workinman.services.ServiceAnalytics._offlineUserId;
		com.workinman.services.ServiceAnalytics._sharedObjectData.trackingID = com.workinman.services.ServiceAnalytics._offlineTrackingId;
		com.workinman.utils.WorkinCloud.instance.sharedObjectSetData(com.workinman.services.ServiceAnalytics._sharedObjectId,com.workinman.services.ServiceAnalytics._sharedObjectData);
	} else {
		com.workinman.services.ServiceAnalytics._offlineUserId = com.workinman.services.ServiceAnalytics._sharedObjectData.userID;
		com.workinman.services.ServiceAnalytics._offlineTrackingId = com.workinman.services.ServiceAnalytics._sharedObjectData.trackingID;
	}
	js.Lib["eval"]("\t\t\t\t\n\t\t\t\twindow._pnConfig = new Array();\n\t\t\t\twindow._pnConfig['userId'] = '" + com.workinman.services.ServiceAnalytics._offlineUserId + "';\n\t\t\t\t\n\t\t\t\tvar _pnAPIURL = document.location.protocol + '//js.a.playnomics.net/v1/api?a=" + com.workinman.services.ServiceAnalytics._appId + "';\n\t\t\t\tvar _pnAPI = document.createElement('script');\t\t\t\t\n\t\t\t\t_pnAPI.type = 'text/javascript'; \n\t\t\t\t_pnAPI.async = false; \n\t\t\t\t_pnAPI.src = _pnAPIURL;\n\t\t\t\twindow.pnCallbackReference = _pnAPI;\t\t\t\t\n\t\t\t");
	js.Lib["eval"]("window.pnCallbackReference").addEventListener("load",com.workinman.services.ServiceAnalytics.onAnalyticsLoad,false);
	js.Lib["eval"]("document.body.appendChild(window.pnCallbackReference);");
	com.workinman.services.ServiceAnalytics.sendUserInfo();
	com.workinman.services.ServiceAnalytics.sendMilestone("custom1");
}
com.workinman.services.ServiceAnalytics._runQueuedCommands = function() {
	while(com.workinman.services.ServiceAnalytics._queuedCommands.length > 0) {
		com.workinman.services.ServiceAnalytics.sendPlaynomicsEvent(com.workinman.services.ServiceAnalytics._queuedCommands[0].method,com.workinman.services.ServiceAnalytics._queuedCommands[0].params);
		com.workinman.services.ServiceAnalytics._queuedCommands.shift();
	}
}
com.workinman.services.ServiceAnalytics.sendUserInfo = function() {
	var tSource;
	tSource = "html5";
	com.workinman.services.ServiceAnalytics.sendPlaynomicsEvent("pnUserInfo",["update",null,null,"","",tSource]);
}
com.workinman.services.ServiceAnalytics.sendMilestone = function(inMilestoneName) {
	com.workinman.services.ServiceAnalytics.sendPlaynomicsEvent("pnMilestone",[Std.string(Math.floor(6012 + Math.random() * 999999999)),inMilestoneName]);
}
com.workinman.services.ServiceAnalytics.sendPlaynomicsEvent = function(inMethod,inParams) {
	if(!com.workinman.services.ServiceAnalytics.OPTION_ENABLE_TRACKING) return;
	if(!com.workinman.services.ServiceAnalytics._flagInitted) return;
	if(!com.workinman.services.ServiceAnalytics._flagLoaded) {
		com.workinman.services.ServiceAnalytics._queuedCommands.push({ method : inMethod, params : inParams});
		return;
	}
	com.workinman.utils.WorkinCloud.instance.log("[ServiceAnalytics](sendPlaynomicsEvent) " + inMethod);
	var i;
	var tString = "";
	i = 0;
	while(i < inParams.length) {
		tString += "'" + inParams[i] + "'";
		i++;
		if(i < inParams.length) tString += ",";
	}
	js.Lib["eval"](inMethod + "(" + tString + ")");
}
com.workinman.services.ServiceAnalytics._generateSessionID = function() {
	var tString = "";
	var tCount = 11;
	while(tCount > -1) {
		tString += Math.floor(Math.random() * 10);
		tCount--;
	}
	com.workinman.services.ServiceAnalytics._sessionId = tString;
}
com.workinman.services.ServiceAnalytics._generateOfflineIDs = function() {
	com.workinman.services.ServiceAnalytics._offlineUserId = "";
	com.workinman.services.ServiceAnalytics._offlineTrackingId = "";
	var tCount = 15;
	while(tCount > -1) {
		if(Math.random() < .66) com.workinman.services.ServiceAnalytics._offlineUserId += Std.string(Math.floor(Math.random() * 10)); else switch(Math.floor(Math.random() * 10)) {
		case 0:
			com.workinman.services.ServiceAnalytics._offlineUserId += "a";
			break;
		case 1:
			com.workinman.services.ServiceAnalytics._offlineUserId += "b";
			break;
		case 2:
			com.workinman.services.ServiceAnalytics._offlineUserId += "c";
			break;
		case 3:
			com.workinman.services.ServiceAnalytics._offlineUserId += "d";
			break;
		case 4:
			com.workinman.services.ServiceAnalytics._offlineUserId += "e";
			break;
		case 5:
			com.workinman.services.ServiceAnalytics._offlineUserId += "f";
			break;
		case 6:
			com.workinman.services.ServiceAnalytics._offlineUserId += "g";
			break;
		case 7:
			com.workinman.services.ServiceAnalytics._offlineUserId += "h";
			break;
		case 8:
			com.workinman.services.ServiceAnalytics._offlineUserId += "i";
			break;
		case 9:
			com.workinman.services.ServiceAnalytics._offlineUserId += "j";
			break;
		default:
			com.workinman.services.ServiceAnalytics._offlineUserId += "z";
		}
		tCount--;
	}
	com.workinman.services.ServiceAnalytics._offlineTrackingId = "";
	tCount = 15;
	while(tCount > -1) {
		com.workinman.services.ServiceAnalytics._offlineTrackingId += Math.floor(Math.random() * 10);
		tCount--;
	}
}
com.workinman.services.ServiceAnalytics.prototype = {
	__class__: com.workinman.services.ServiceAnalytics
}
com.workinman.utils.AssetManager = function() {
	this._LOADING_CHANCES = 3;
	this._baseUrl = "";
	this._assets = new Hash();
	this._defs = new Hash();
	this._flump = new Hash();
	this._packs = new Hash();
	this._chunks = new Hash();
	this._loadingChances = 0;
	this._packsLoaded = this._packsMax = 0;
};
$hxClasses["com.workinman.utils.AssetManager"] = com.workinman.utils.AssetManager;
com.workinman.utils.AssetManager.__name__ = ["com","workinman","utils","AssetManager"];
com.workinman.utils.AssetManager.prototype = {
	getFont: function(pId) {
		if(this._assets.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](getFont) no asset named " + pId + " exists! Returning null.");
			return null;
		}
		return new flambe.display.Font(this._assets.get(pId)._getPack(),pId);
	}
	,getLibrary: function(pId) {
		if(this._flump.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](getLibrary) no library named " + pId + " exists! Is it defined in config.xml?");
			return null;
		}
		return this._flump.get(pId);
	}
	,getSound: function(pId) {
		if(this._assets.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[AssetManager](getSound) no asset named " + pId + " exists! Returning null.");
			return null;
		}
		if(this._assets.get(pId)._getConstructed()) return this._assets.get(pId)._getData();
		return this._assets.get(pId)._getPack().getSound(this._assets.get(pId)._getPath(),true);
	}
	,getXML: function(pId) {
		if(this._assets.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](getXML) no asset named " + pId + " exists! Returning null.");
			return null;
		}
		var tXML = Xml.parse(this.getFile(pId));
		return new haxe.xml.Fast(tXML.firstElement());
	}
	,getFile: function(pId) {
		if(this._assets.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](getFile) no asset named " + pId + " exists! Returning empty string.");
			return "";
		}
		if(this._assets.get(pId)._getConstructed()) return this._assets.get(pId)._getData();
		return this._assets.get(pId)._getPack().getFile(this._assets.get(pId)._getPath(),true);
	}
	,getTexture: function(pId) {
		var tId = pId.split(".")[0];
		if(this._assets.exists(tId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](getTexture) no asset named " + tId + " exists! Returning null.");
			return null;
		}
		if(this._assets.get(tId)._getConstructed() == true) return this._assets.get(tId)._getData();
		return this._assets.get(tId)._getPack().getTexture(this._assets.get(tId)._getPath(),true);
	}
	,hasAsset: function(pId) {
		return this._assets.exists(pId);
	}
	,_parseSpritesheet: function(pId) {
		var tXml = this.getXML(pId + ".xml");
		var tImage = this.getTexture(pId);
		var tName = "";
		var tRect = new flambe.math.Rectangle(0,0,0,0);
		var tTexture;
		var $it0 = tXml.nodes.resolve("SubTexture").iterator();
		while( $it0.hasNext() ) {
			var subNode = $it0.next();
			tName = subNode.att.resolve("name").toString();
			tRect.x = Std.parseFloat(subNode.att.resolve("x").toString());
			tRect.y = Std.parseFloat(subNode.att.resolve("y").toString());
			tRect.width = Std.parseFloat(subNode.att.resolve("width").toString());
			tRect.height = Std.parseFloat(subNode.att.resolve("height").toString());
			tTexture = flambe.System.createTexture(Std["int"](tRect.width),Std["int"](tRect.height));
			tTexture.get_graphics().drawSubImage(tImage,0,0,Std["int"](tRect.x),Std["int"](tRect.y),Std["int"](tRect.width),Std["int"](tRect.height));
			this.addConstructedAsset(tName,tTexture);
			tTexture = null;
		}
		tImage = null;
		tXml = null;
		tRect = null;
	}
	,_onAllLoadComplete: function() {
		com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](_onAllLoadComplete) all packs loaded!");
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEvent(com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED));
	}
	,addConstructedAsset: function(pId,pData) {
		var tPack = new com.workinman.utils._AssetManager.AssetDef(pId,this._assets,pData);
		tPack = null;
	}
	,addPack: function(pPack) {
		var $it0 = pPack.get_manifest().iterator();
		while( $it0.hasNext() ) {
			var a = $it0.next();
			var tPack = new com.workinman.utils._AssetManager.AssetDef(a.name,this._assets,pPack);
			tPack = null;
		}
	}
	,isPackLoaded: function(pId) {
		return this._packs.exists(pId);
	}
	,loadPack: function(pId,pBasePath,pNew) {
		if(pNew == null) pNew = true;
		if(pBasePath == null) pBasePath = "";
		var _g = this;
		if(this._defs.exists(pId) == false) com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](loadPack) Can't load pack " + pId + " , define the pack in config.xml.");
		com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](loadPack) " + pId);
		if(pNew) {
			this._loadingChances = this._LOADING_CHANCES;
			this._packsMax++;
		}
		var tManifest = flambe.asset.Manifest.build(pId);
		if(this._baseUrl != "") tManifest.set_relativeBasePath(this._baseUrl);
		var loader = flambe.System.loadAssetPack(tManifest);
		loader.error.connect(function(string) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading failed with error: " + string);
			_g._loadingChances--;
			if(_g._loadingChances >= 0) haxe.Timer.delay(function() {
				com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Retrying. With " + _g._loadingChances + " more chances.");
				_g.loadPack(pId,pBasePath,false);
			},500); else com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](_onLoadingError) Loading attempts timed out.");
		});
		loader.get(function(pack) {
			_g.addPack(pack);
			_g._packsLoaded++;
			var _g1 = 0, _g2 = _g._defs.get(pId)._getFlump();
			while(_g1 < _g2.length) {
				var f = _g2[_g1];
				++_g1;
				_g._flump.set(f,new flambe.swf.Library(pack,f));
			}
			var _g1 = 0, _g2 = _g._defs.get(pId)._getTiles();
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				_g._parseSpritesheet(t);
			}
			_g._packs.set(pId,pack);
			if(_g._packsLoaded >= _g._packsMax) _g._onAllLoadComplete();
		});
	}
	,addPackDef: function(pId,pFlump,pTiles) {
		if(pFlump == null) pFlump = new Array();
		if(pTiles == null) pTiles = new Array();
		this._defs.set(pId,new com.workinman.utils._AssetManager.PackDef(pId,pFlump,pTiles));
		pFlump = null;
		pTiles = null;
	}
	,_parseChunk: function(pId,pFast) {
		var tChunks = new Array();
		var tPacks = new Array();
		var $it0 = pFast.nodes.resolve("chunk").iterator();
		while( $it0.hasNext() ) {
			var n = $it0.next();
			tChunks.push(n.getInnerData().toString());
		}
		var $it1 = pFast.nodes.resolve("pack").iterator();
		while( $it1.hasNext() ) {
			var n = $it1.next();
			tPacks.push(n.getInnerData().toString());
		}
		var tChunk = new com.workinman.utils._AssetManager.ChunkDef(pId,tPacks,tChunks);
		tChunks = null;
		tPacks = null;
		return tChunk;
	}
	,loadFolder: function(pUrl) {
		com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](loadFolder) " + pUrl);
		if(this.isPackLoaded(pUrl)) return;
		this.addPackDef(pUrl);
		this.loadPack(pUrl);
	}
	,loadChunk: function(pId) {
		if(this._chunks.exists(pId) == false) com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](loadChunk) No chunk named " + pId + " defined.");
		var _g = 0, _g1 = this._chunks.get(pId)._getChunks();
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			this.loadChunk(s);
		}
		var _g = 0, _g1 = this._chunks.get(pId)._getPacks();
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(this.isPackLoaded(s) == false) this.loadPack(s);
		}
	}
	,isChunkLoaded: function(pId) {
		if(this._chunks.exists(pId) == false) {
			com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](isChunkLoaded) No chunk named " + pId + " defined.");
			return false;
		}
		var _g = 0, _g1 = this._chunks.get(pId)._getPacks();
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(this.isPackLoaded(s) == false) return false;
		}
		return true;
	}
	,addChunk: function(pId,pFast) {
		var tChunk = this._parseChunk(pId,pFast);
		this._chunks.set(pId,tChunk);
		tChunk = null;
	}
	,_setBaseUrl: function(pBaseUrl) {
		this._baseUrl = pBaseUrl;
		com.workinman.utils.WorkinCloud.instance.log("[WMAssetManager](setBaseUrl) Base Url set to '" + pBaseUrl + "'");
		return this._baseUrl;
	}
	,_getBaseUrl: function() {
		return this._baseUrl;
	}
	,__class__: com.workinman.utils.AssetManager
}
com.workinman.utils._AssetManager = {}
com.workinman.utils._AssetManager.AssetDef = function(pPath,pHash,pData) {
	this._path = pPath;
	var tSplit = pPath.split("/");
	this._id = tSplit[tSplit.length - 1].split(".")[0];
	var tSplitTrim = pPath.split(".");
	if(tSplitTrim[1] == "png" || tSplitTrim[1] == "jpg") this._trimmedID = tSplitTrim[0]; else this._trimmedID = this._path;
	this._constructed = false;
	this._pack = null;
	this._data = null;
	tSplit = null;
	if(Std["is"](pData,flambe.asset.AssetPack)) this._pack = pData; else {
		this._constructed = true;
		this._data = pData;
	}
	this._hash = pHash;
	this._hash.set(this._path,this);
	this._hash.set(this._id,this);
	this._hash.set(this._trimmedID,this);
};
$hxClasses["com.workinman.utils._AssetManager.AssetDef"] = com.workinman.utils._AssetManager.AssetDef;
com.workinman.utils._AssetManager.AssetDef.__name__ = ["com","workinman","utils","_AssetManager","AssetDef"];
com.workinman.utils._AssetManager.AssetDef.prototype = {
	_getPack: function() {
		return this._pack;
	}
	,_getPath: function() {
		return this._path;
	}
	,_getData: function() {
		return this._data;
	}
	,_getConstructed: function() {
		return this._constructed;
	}
	,__class__: com.workinman.utils._AssetManager.AssetDef
}
com.workinman.utils._AssetManager.PackDef = function(pId,pFlump,pTiles) {
	this._id = pId;
	this._flump = pFlump;
	this._tiles = pTiles;
};
$hxClasses["com.workinman.utils._AssetManager.PackDef"] = com.workinman.utils._AssetManager.PackDef;
com.workinman.utils._AssetManager.PackDef.__name__ = ["com","workinman","utils","_AssetManager","PackDef"];
com.workinman.utils._AssetManager.PackDef.prototype = {
	_getTiles: function() {
		return this._tiles;
	}
	,_getFlump: function() {
		return this._flump;
	}
	,__class__: com.workinman.utils._AssetManager.PackDef
}
com.workinman.utils._AssetManager.ChunkDef = function(pId,pPacks,pChunks) {
	this._id = pId;
	this._packs = pPacks;
	this._chunks = pChunks;
};
$hxClasses["com.workinman.utils._AssetManager.ChunkDef"] = com.workinman.utils._AssetManager.ChunkDef;
com.workinman.utils._AssetManager.ChunkDef.__name__ = ["com","workinman","utils","_AssetManager","ChunkDef"];
com.workinman.utils._AssetManager.ChunkDef.prototype = {
	_getChunks: function() {
		return this._chunks;
	}
	,_getPacks: function() {
		return this._packs;
	}
	,__class__: com.workinman.utils._AssetManager.ChunkDef
}
com.workinman.utils._WMEventDispatcher = {}
com.workinman.utils._WMEventDispatcher.WMEventTracker = function() {
	this._signalConnection = new Array();
	this._signal = new flambe.util.Signal1();
};
$hxClasses["com.workinman.utils._WMEventDispatcher.WMEventTracker"] = com.workinman.utils._WMEventDispatcher.WMEventTracker;
com.workinman.utils._WMEventDispatcher.WMEventTracker.__name__ = ["com","workinman","utils","_WMEventDispatcher","WMEventTracker"];
com.workinman.utils._WMEventDispatcher.WMEventTracker.prototype = {
	dispose: function() {
		this._signal = null;
		var _g = 0, _g1 = this._signalConnection;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.dispose();
		}
		this._signalConnection = null;
	}
	,isEmtpy: function() {
		return !this._signal.hasListeners();
	}
	,dispatchEvent: function(pEvent) {
		this._signal.emit(pEvent);
	}
	,removeEventListener: function(pListener) {
		var tI = this._signalConnection.length;
		while(tI > 0) {
			tI--;
			if(Reflect.compareMethods(this._signalConnection[tI]._getListener(),pListener)) {
				this._signalConnection[tI].dispose();
				this._signalConnection.splice(tI,1);
			}
		}
	}
	,addEventListener: function(pListener) {
		this._signalConnection.push(new com.workinman.utils._WMEventDispatcher.SignalTracker(pListener,this._signal.connect(pListener)));
	}
	,__class__: com.workinman.utils._WMEventDispatcher.WMEventTracker
}
com.workinman.utils._WMEventDispatcher.SignalTracker = function(pFunction,pConnection) {
	this._function = pFunction;
	this._connection = pConnection;
};
$hxClasses["com.workinman.utils._WMEventDispatcher.SignalTracker"] = com.workinman.utils._WMEventDispatcher.SignalTracker;
com.workinman.utils._WMEventDispatcher.SignalTracker.__name__ = ["com","workinman","utils","_WMEventDispatcher","SignalTracker"];
com.workinman.utils._WMEventDispatcher.SignalTracker.prototype = {
	_getListener: function() {
		return this._function;
	}
	,dispose: function() {
		this._function = null;
		this._connection.dispose();
		this._connection = null;
	}
	,__class__: com.workinman.utils._WMEventDispatcher.SignalTracker
}
com.workinman.utils.WMInput = function() {
	com.workinman.utils.WMInput._keycodes = new Hash();
	com.workinman.utils.WMInput._keydown = new Hash();
	com.workinman.utils.WMInput._keydown.set(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,false);
};
$hxClasses["com.workinman.utils.WMInput"] = com.workinman.utils.WMInput;
com.workinman.utils.WMInput.__name__ = ["com","workinman","utils","WMInput"];
com.workinman.utils.WMInput.prototype = {
	_onPointerUp: function(pEvent) {
		com.workinman.utils.WMInput._keydown.set(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,false);
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventInput(0,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,pEvent.viewX,pEvent.viewY));
	}
	,_onPointerMove: function(pEvent) {
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventInput(2,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,pEvent.viewX,pEvent.viewY));
	}
	,_onPointerDown: function(pEvent) {
		com.workinman.utils.WMInput._keydown.set(com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,true);
		com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventInput(1,com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK,pEvent.viewX,pEvent.viewY));
	}
	,_onKeyUp: function(pEvent) {
		var tArray;
		var $it0 = com.workinman.utils.WMInput._keycodes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			tArray = com.workinman.utils.WMInput._keycodes.get(k);
			var _g = 0;
			while(_g < tArray.length) {
				var i = tArray[_g];
				++_g;
				if(i == pEvent.key) {
					com.workinman.utils.WMInput._keydown.set(k,false);
					com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventInput(0,k,0,0));
				}
			}
		}
	}
	,_onKeyDown: function(pEvent) {
		var tArray;
		var $it0 = com.workinman.utils.WMInput._keycodes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			tArray = com.workinman.utils.WMInput._keycodes.get(k);
			var _g = 0;
			while(_g < tArray.length) {
				var i = tArray[_g];
				++_g;
				if(i == pEvent.key) {
					com.workinman.utils.WMInput._keydown.set(k,true);
					com.workinman.utils.WorkinCloud.instance.getDispatcher().dispatchEvent(new com.workinman.events.WMEventInput(1,k,0,0));
				}
			}
		}
	}
	,getInput: function(pID) {
		return com.workinman.utils.WMInput._keydown.get(pID);
	}
	,registerInput: function(pID,pArray) {
		com.workinman.utils.WMInput._keycodes.set(pID,pArray);
		com.workinman.utils.WMInput._keydown.set(pID,false);
	}
	,prime: function() {
		flambe.System.get_keyboard().down.connect($bind(this,this._onKeyDown));
		flambe.System.get_keyboard().up.connect($bind(this,this._onKeyUp));
		flambe.System.get_pointer().down.connect($bind(this,this._onPointerDown));
		flambe.System.get_pointer().move.connect($bind(this,this._onPointerMove));
		flambe.System.get_pointer().up.connect($bind(this,this._onPointerUp));
	}
	,__class__: com.workinman.utils.WMInput
}
com.workinman.utils.WMLocalize = function() {
};
$hxClasses["com.workinman.utils.WMLocalize"] = com.workinman.utils.WMLocalize;
com.workinman.utils.WMLocalize.__name__ = ["com","workinman","utils","WMLocalize"];
com.workinman.utils.WMLocalize.prototype = {
	getData: function(inId,inXML) {
		if(inXML == null) inXML = "";
		if(inXML == "") inXML = com.workinman.data.ConstantsCloud.LOCALIZATION_XML_PATH + "translation_" + com.workinman.utils.WorkinCloud.instance.getString(com.workinman.data.ConstantsCloud.STRING_REGION_ID) + ".xml";
		var tFast = com.workinman.utils.WorkinCloud.instance.getAssets().getXML(inXML);
		var $it0 = tFast.nodes.resolve("string").iterator();
		while( $it0.hasNext() ) {
			var stringNode = $it0.next();
			if(stringNode.att.resolve("id") == inId) return new com.workinman.utils.WMLocalizedData(stringNode.att.resolve("id"),stringNode.getInnerData(),stringNode.att.resolve("fontName"),Std.parseFloat(stringNode.att.resolve("fontScale")),Std.parseFloat(stringNode.att.resolve("offsetX")),Std.parseFloat(stringNode.att.resolve("offsetX")));
		}
		com.workinman.utils.WorkinCloud.instance.log("[WMLocalize] ERROR: No localization data for : " + inId);
		return new com.workinman.utils.WMLocalizedData(inId,"","",1,0,0);
	}
	,__class__: com.workinman.utils.WMLocalize
}
com.workinman.utils.WMLocalizedData = function(inId,inString,inFont,inScale,inOffsetX,inOffsetY) {
	this._id = inId;
	this._string = inString;
	this._fontName = inFont;
	this._scale = inScale;
	this._offsetX = inOffsetX;
	this._offsetY = inOffsetY;
};
$hxClasses["com.workinman.utils.WMLocalizedData"] = com.workinman.utils.WMLocalizedData;
com.workinman.utils.WMLocalizedData.__name__ = ["com","workinman","utils","WMLocalizedData"];
com.workinman.utils.WMLocalizedData.prototype = {
	_getOffsetY: function() {
		return this._offsetY;
	}
	,_getOffsetX: function() {
		return this._offsetX;
	}
	,_getScale: function() {
		return this._scale;
	}
	,_getFontName: function() {
		return this._fontName;
	}
	,_getString: function() {
		return this._string;
	}
	,_getId: function() {
		return this._id;
	}
	,__class__: com.workinman.utils.WMLocalizedData
}
com.workinman.utils.WMSound = function() {
	this._music = "";
	this._musicGain = 1;
	this._musicPlaying = null;
	this._isMuted = false;
	this._mixer = new flambe.sound.Mixer();
	this._sounds = new Array();
};
$hxClasses["com.workinman.utils.WMSound"] = com.workinman.utils.WMSound;
com.workinman.utils.WMSound.__name__ = ["com","workinman","utils","WMSound"];
com.workinman.utils.WMSound.prototype = {
	update: function(dt) {
		var tI = this._sounds.length;
		while(tI > 0) {
			tI--;
			if(this._sounds[tI]._getPlayback() == null || this._sounds[tI]._getPlayback().get_ended()) {
				this._sounds[tI].dispose();
				this._sounds.splice(tI,1);
			}
		}
	}
	,playMusic: function(pId,pGain) {
		if(pGain == null) pGain = 1;
		this._music = pId;
		this._musicGain = pGain;
		if(this._isMuted || pId == "") return;
		if(this._musicPlaying != null) this._musicPlaying.dispose();
		var tSound = new com.workinman.utils._WMSound.SoundDef(pId,this._mixer.newSound(com.workinman.utils.WorkinCloud.instance.getAssets().getSound(this._music),1),true);
		this._musicPlaying = tSound;
		tSound.playSound(pGain);
	}
	,playSound: function(pId,pGain) {
		if(pGain == null) pGain = 1;
		if(this._isMuted) return;
		var tSound = new com.workinman.utils._WMSound.SoundDef(pId,this._mixer.newSound(com.workinman.utils.WorkinCloud.instance.getAssets().getSound(pId)),false);
		this._sounds.push(tSound);
		tSound.playSound(pGain);
	}
	,setMute: function(pMute) {
		if(pMute && this._isMuted == false) {
			this._isMuted = true;
			this._mixer.stopAll();
			while(this._sounds.length > 0) this._sounds.splice(0,1);
			this._musicPlaying = null;
		} else if(pMute == false && this._isMuted) {
			this._isMuted = false;
			this.playMusic(this._music,this._musicGain);
		}
	}
	,getMute: function() {
		return this._isMuted;
	}
	,__class__: com.workinman.utils.WMSound
}
com.workinman.utils._WMSound = {}
com.workinman.utils._WMSound.SoundDef = function(pId,pSound,pIsMusic) {
	if(pIsMusic == null) pIsMusic = false;
	this.id = pId;
	this.isMusic = pIsMusic;
	this._flagHasSound = false;
	this._flagPlayed = false;
	this._sound = pSound;
};
$hxClasses["com.workinman.utils._WMSound.SoundDef"] = com.workinman.utils._WMSound.SoundDef;
com.workinman.utils._WMSound.SoundDef.__name__ = ["com","workinman","utils","_WMSound","SoundDef"];
com.workinman.utils._WMSound.SoundDef.prototype = {
	playSound: function(pGain) {
		if(pGain == null) pGain = 1;
		if(this.isMusic) this._playback = this._sound.loop(pGain); else this._playback = this._sound.play(pGain);
	}
	,_setPlayback: function(pPlayback) {
		this._playback = pPlayback;
		return this._playback;
	}
	,_getPlayback: function() {
		return this._playback;
	}
	,dispose: function() {
		this._playback.dispose();
		this._playback = null;
	}
	,__class__: com.workinman.utils._WMSound.SoundDef
}
flambe.sound = {}
flambe.sound.Mixer = function() {
	this._sounds = [];
};
$hxClasses["flambe.sound.Mixer"] = flambe.sound.Mixer;
flambe.sound.Mixer.__name__ = ["flambe","sound","Mixer"];
flambe.sound.Mixer.__super__ = flambe.Component;
flambe.sound.Mixer.prototype = $extend(flambe.Component.prototype,{
	onRemoved: function() {
		this.stopAll();
		this._sounds = [];
	}
	,stopAll: function() {
		var _g = 0, _g1 = this._sounds;
		while(_g < _g1.length) {
			var sound = _g1[_g];
			++_g;
			sound.dispose();
		}
	}
	,newSound: function(source,channels) {
		if(channels == null) channels = 2147483647;
		var sound = new flambe.sound._Mixer.MixerSound(source,channels);
		this._sounds.push(sound);
		return sound;
	}
	,get_name: function() {
		return "Mixer_2";
	}
	,__class__: flambe.sound.Mixer
});
com.workinman.utils.WorkinCloud = function() {
	this._values = new Hash();
	this._defaults = new Hash();
	this._dispatcher = new com.workinman.events.WMEventDispatcher();
	this._input = new com.workinman.utils.WMInput();
	this._assets = new com.workinman.utils.AssetManager();
	this._sound = new com.workinman.utils.WMSound();
	this._localize = new com.workinman.utils.WMLocalize();
	this.setString(com.workinman.data.ConstantsCloud.STRING_REGION_ID,"en");
};
$hxClasses["com.workinman.utils.WorkinCloud"] = com.workinman.utils.WorkinCloud;
com.workinman.utils.WorkinCloud.__name__ = ["com","workinman","utils","WorkinCloud"];
com.workinman.utils.WorkinCloud.prototype = {
	_updateDisplays: function(inValueID) {
		this._dispatcher.dispatchEvent(new com.workinman.events.WMEventData(com.workinman.display.Display.EVENT_UPDATE_DISPLAY,{ valueID : inValueID}));
	}
	,sharedObjectSetData: function(pId,pData) {
		var tShared = com.workinman.net.WMSharedObject.getLocal(pId);
		tShared._setData(pData);
		tShared.flush();
		tShared.dispose();
		tShared = null;
	}
	,sharedObjectGetData: function(pId) {
		var tShared = com.workinman.net.WMSharedObject.getLocal(pId);
		var tData = tShared._getData();
		tShared.dispose();
		tShared = null;
		return tData;
	}
	,resetValue: function(inValueID) {
		this._values.set(inValueID,this._defaults.get(inValueID));
		this._updateDisplays(inValueID);
	}
	,modifyValue: function(inValueID,inValue) {
		if(inValue == null) inValue = 1;
		this._values.set(inValueID,this.getFloat(inValueID) + inValue);
		this._updateDisplays(inValueID);
		return this.getFloat(inValueID);
	}
	,setValue: function(inValueID,inValue) {
		this._values.set(inValueID,inValue);
		if(this._defaults.exists(inValueID) == false) this.setDefault(inValueID,inValue);
		this._updateDisplays(inValueID);
	}
	,getValue: function(inValueID) {
		return this._values.get(inValueID);
	}
	,setDefault: function(inValueID,inValue) {
		this._defaults.set(inValueID,inValue);
		this.resetValue(inValueID);
	}
	,getString: function(inValueID) {
		return this._values.get(inValueID);
	}
	,setString: function(inValueID,inValue) {
		this.setValue(inValueID,inValue);
	}
	,getInteger: function(inValueID) {
		return this._values.get(inValueID);
	}
	,modifyIntegerValue: function(pValueId,pValueMod) {
		return Math.floor(this.modifyValue(pValueId,pValueMod));
	}
	,setInteger: function(inValueID,inValue) {
		this.setValue(inValueID,inValue);
	}
	,getFloat: function(inValueID) {
		return this._values.get(inValueID);
	}
	,setFloat: function(inValueID,inValue) {
		this.setValue(inValueID,inValue);
	}
	,getBool: function(inValueID) {
		return this._values.get(inValueID);
	}
	,setBool: function(inValueID,inValue) {
		this.setValue(inValueID,inValue);
	}
	,_getLocalize: function() {
		return this._localize;
	}
	,_getSound: function() {
		return this._sound;
	}
	,getAssets: function() {
		return this._assets;
	}
	,getInput: function() {
		return this._input;
	}
	,getDispatcher: function() {
		return this._dispatcher;
	}
	,log: function(pString) {
		console.log(pString);
	}
	,__class__: com.workinman.utils.WorkinCloud
}
com.workinman.utils.WorkinUtils = function() { }
$hxClasses["com.workinman.utils.WorkinUtils"] = com.workinman.utils.WorkinUtils;
com.workinman.utils.WorkinUtils.__name__ = ["com","workinman","utils","WorkinUtils"];
com.workinman.utils.WorkinUtils.getRandom = function(pMin,pMax,pWholeNumbersOnly) {
	if(pWholeNumbersOnly == null) pWholeNumbersOnly = true;
	var tRand = Math.random();
	if(tRand == 1) tRand = .99;
	if(pWholeNumbersOnly) return pMin + Math.floor(tRand * (pMax + 1 - pMin)); else return pMin + tRand * (pMax - pMin);
}
flambe.Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe.Entity;
flambe.Entity.__name__ = ["flambe","Entity"];
flambe.Entity.__interfaces__ = [flambe.util.Disposable];
flambe.Entity.prototype = {
	toStringImpl: function(indent) {
		var output = "";
		var p = this.firstComponent;
		while(p != null) {
			output += p.get_name();
			if(p.next != null) output += ", ";
			p = p.next;
		}
		output += "\n";
		var u2514 = String.fromCharCode(9492);
		var u241c = String.fromCharCode(9500);
		var u2500 = String.fromCharCode(9472);
		var u2502 = String.fromCharCode(9474);
		var p1 = this.firstChild;
		while(p1 != null) {
			var last = p1.next == null;
			output += indent + (last?u2514:u241c) + u2500 + u2500 + " ";
			output += p1.toStringImpl(indent + (last?" ":u2502) + "   ");
			p1 = p1.next;
		}
		return output;
	}
	,toString: function() {
		return this.toStringImpl("");
	}
	,dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
		this.onDispose();
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,onDispose: function() {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,removeChild: function(entity) {
		var prev = null, p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				p.onRemoved();
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null, p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		entity.onAdded();
		return this;
	}
	,getComponent: function(name) {
		return this._compMap[name];
	}
	,remove: function(component) {
		var prev = null, p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev._internal_init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p._internal_init(null,null);
				return;
			}
			prev = p;
			p = next;
		}
	}
	,add: function(component) {
		var name = component.get_name();
		var prev = this.getComponent(name);
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null, p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail._internal_setNext(component); else this.firstComponent = component;
		component._internal_init(this,null);
		component.onAdded();
		return this;
	}
	,__class__: flambe.Entity
}
flambe.util.PackageLog = function() { }
$hxClasses["flambe.util.PackageLog"] = flambe.util.PackageLog;
flambe.util.PackageLog.__name__ = ["flambe","util","PackageLog"];
flambe.platform = {}
flambe.platform.Platform = function() { }
$hxClasses["flambe.platform.Platform"] = flambe.platform.Platform;
flambe.platform.Platform.__name__ = ["flambe","platform","Platform"];
flambe.platform.Platform.prototype = {
	__class__: flambe.platform.Platform
}
flambe.platform.html = {}
flambe.platform.html.HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe.platform.html.HtmlPlatform;
flambe.platform.html.HtmlPlatform.__name__ = ["flambe","platform","html","HtmlPlatform"];
flambe.platform.html.HtmlPlatform.__interfaces__ = [flambe.platform.Platform];
flambe.platform.html.HtmlPlatform.prototype = {
	getY: function(event,bounds) {
		return this._stage.scaleFactor * (event.clientY - bounds.top);
	}
	,getX: function(event,bounds) {
		return this._stage.scaleFactor * (event.clientX - bounds.left);
	}
	,getTempGraphics: function() {
		return this._tempGraphics;
	}
	,getTempCanvas: function() {
		return this._tempCanvas;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getExternal: function() {
		if(this._external == null) this._external = new flambe.platform.html.HtmlExternal();
		return this._external;
	}
	,getWeb: function() {
		if(this._web == null) this._web = new flambe.platform.html.HtmlWeb(this._container);
		return this._web;
	}
	,getKeyboard: function() {
		return this._keyboard;
	}
	,getTouch: function() {
		return this._touch;
	}
	,getMouse: function() {
		return this._mouse;
	}
	,getPointer: function() {
		return this._pointer;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getTime: function() {
		return flambe.platform.html.HtmlUtil.now() / 1000;
	}
	,createLogHandler: function(tag) {
		if(flambe.platform.html.HtmlLogHandler.isSupported()) return new flambe.platform.html.HtmlLogHandler(tag);
		return null;
	}
	,getLocale: function() {
		return js.Lib.window.navigator.language;
	}
	,getStorage: function() {
		if(this._storage == null) {
			var localStorage = null;
			try {
				localStorage = js.Lib.window.localStorage;
			} catch( error ) {
			}
			if(localStorage != null) this._storage = new flambe.platform.html.HtmlStorage(localStorage); else {
				flambe.Log.warn("localStorage is unavailable, falling back to unpersisted storage");
				this._storage = new flambe.platform.DummyStorage();
			}
		}
		return this._storage;
	}
	,getStage: function() {
		return this._stage;
	}
	,loadAssetPack: function(manifest) {
		return new flambe.platform.html.HtmlAssetPackLoader(this,manifest).promise;
	}
	,init: function() {
		var _g = this;
		flambe.Log.info("Initializing HTML platform");
		var canvas = null;
		try {
			canvas = js.Lib.window.flambe.canvas;
		} catch( error ) {
		}
		flambe.util.Assert.that(canvas != null,"Could not find a Flambe canvas! Are you embedding with flambe.js?");
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe.platform.html.HtmlStage(canvas);
		this._pointer = new flambe.platform.BasicPointer();
		this._mouse = new flambe.platform.html.HtmlMouse(this._pointer,canvas);
		this._keyboard = new flambe.platform.BasicKeyboard();
		var source = canvas;
		this._tempCanvas = flambe.platform.html.HtmlUtil.createCanvas(source);
		this._tempGraphics = new flambe.platform.html.CanvasGraphics(this._tempCanvas);
		this._renderer = new flambe.platform.html.CanvasRenderer(canvas);
		flambe.System.hasGPU.set__(true);
		this.mainLoop = new flambe.platform.MainLoop();
		this._container = canvas.parentNode;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			switch(event.type) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					event.target.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity = event.type == "mousewheel"?event.wheelDelta / 40:-event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		window.addEventListener("mousedown",onMouse,false);
		window.addEventListener("mousemove",onMouse,false);
		window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		if('ontouchstart' in window) {
			var basicTouch = new flambe.platform.BasicTouch(this._pointer);
			this._touch = basicTouch;
			var onTouch = function(event) {
				var changedTouches = event.changedTouches;
				var bounds = event.target.getBoundingClientRect();
				lastTouchTime = event.timeStamp;
				switch(event.type) {
				case "touchstart":
					event.preventDefault();
					if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe.platform.html.HtmlUtil.hideMobileBrowser();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						basicTouch.submitDown(Std["int"](touch.identifier),x,y);
					}
					break;
				case "touchmove":
					event.preventDefault();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						basicTouch.submitMove(Std["int"](touch.identifier),x,y);
					}
					break;
				case "touchend":case "touchcancel":
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						basicTouch.submitUp(Std["int"](touch.identifier),x,y);
					}
					break;
				}
			};
			canvas.addEventListener("touchstart",onTouch,false);
			canvas.addEventListener("touchmove",onTouch,false);
			canvas.addEventListener("touchend",onTouch,false);
			canvas.addEventListener("touchcancel",onTouch,false);
		} else this._touch = new flambe.platform.DummyTouch();
		var onKey = function(event) {
			switch(event.type) {
			case "keydown":
				if(event.ctrlKey && event.keyCode == 73) {
					event.preventDefault();
					_g._renderer.inspectNextFrame();
					return;
				}
				if(_g._keyboard.submitDown(event.keyCode)) event.preventDefault();
				break;
			case "keyup":
				_g._keyboard.submitUp(event.keyCode);
				break;
			}
		};
		canvas.addEventListener("keydown",onKey,false);
		canvas.addEventListener("keyup",onKey,false);
		var oldErrorHandler = js.Lib.window.onerror;
		js.Lib.window.onerror = function(message,url,line) {
			flambe.System.uncaughtError.emit(message);
			return oldErrorHandler != null?oldErrorHandler(message,url,line):false;
		};
		var hiddenApi = flambe.platform.html.HtmlUtil.loadExtension("hidden",js.Lib.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function() {
				flambe.System.hidden.set__(Reflect.field(js.Lib.document,hiddenApi.field));
			};
			onVisibilityChanged();
			js.Lib.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
			flambe.System.hidden.get_changed().connect(function(hidden,_) {
				if(!hidden) _g._skipFrame = true;
			});
		}
		this._lastUpdate = flambe.platform.html.HtmlUtil.now();
		this._skipFrame = false;
		var requestAnimationFrame = flambe.platform.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js.Lib.window.performance;
			var hasPerfNow = performance != null && flambe.platform.html.HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else flambe.Log.warn("No monotonic timer support, falling back to the system date");
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else {
			flambe.Log.warn("No requestAnimationFrame support, falling back to setInterval");
			js.Lib.window.setInterval(function() {
				_g.update(flambe.platform.html.HtmlUtil.now());
			},1000 / 60);
		}
	}
	,__class__: flambe.platform.html.HtmlPlatform
}
flambe.util.Value = function(value,listener) {
	this._value = value;
	if(listener != null) this._changed = new flambe.util.Signal2(listener);
};
$hxClasses["flambe.util.Value"] = flambe.util.Value;
flambe.util.Value.__name__ = ["flambe","util","Value"];
flambe.util.Value.prototype = {
	toString: function() {
		return this._value;
	}
	,get_changed: function() {
		if(this._changed == null) this._changed = new flambe.util.Signal2();
		return this._changed;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,get__: function() {
		return this._value;
	}
	,__class__: flambe.util.Value
}
flambe.util.SignalConnection = function(signal,listener) {
	this._internal_next = null;
	this._signal = signal;
	this._internal_listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe.util.SignalConnection;
flambe.util.SignalConnection.__name__ = ["flambe","util","SignalConnection"];
flambe.util.SignalConnection.__interfaces__ = [flambe.util.Disposable];
flambe.util.SignalConnection.prototype = {
	dispose: function() {
		if(this._signal != null) {
			this._signal._internal_disconnect(this);
			this._signal = null;
		}
	}
	,once: function() {
		this.stayInList = false;
		return this;
	}
	,__class__: flambe.util.SignalConnection
}
flambe.util.SignalBase = function(listener) {
	this._head = listener != null?new flambe.util.SignalConnection(this,listener):null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe.util.SignalBase;
flambe.util.SignalBase.__name__ = ["flambe","util","SignalBase"];
flambe.util.SignalBase.prototype = {
	dispatching: function() {
		return this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL;
	}
	,listRemove: function(conn) {
		var prev = null, p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._internal_next;
				if(prev == null) this._head = next; else prev._internal_next = next;
				return;
			}
			prev = p;
			p = p._internal_next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._internal_next = this._head;
			this._head = conn;
		} else {
			var tail = null, p = this._head;
			while(p != null) {
				tail = p;
				p = p._internal_next;
			}
			if(tail != null) tail._internal_next = conn; else this._head = conn;
		}
	}
	,didEmit: function(head) {
		this._head = head;
		while(this._deferredTasks != null) {
			this._deferredTasks.fn();
			this._deferredTasks = this._deferredTasks.next;
		}
	}
	,willEmit: function() {
		flambe.util.Assert.that(!this.dispatching(),"Cannot emit while already emitting!");
		var snapshot = this._head;
		this._head = flambe.util.SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,defer: function(fn) {
		var tail = null, p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe.util._SignalBase.Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,emit2: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._internal_listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._internal_next;
		}
		this.didEmit(head);
	}
	,emit1: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._internal_listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._internal_next;
		}
		this.didEmit(head);
	}
	,emit0: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._internal_listener();
			if(!p.stayInList) p.dispose();
			p = p._internal_next;
		}
		this.didEmit(head);
	}
	,_internal_disconnect: function(conn) {
		var _g = this;
		if(this.dispatching()) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe.util.SignalConnection(this,listener);
		if(this.dispatching()) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,hasListeners: function() {
		return this._head != null;
	}
	,__class__: flambe.util.SignalBase
}
flambe.util.Signal2 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe.util.Signal2;
flambe.util.Signal2.__name__ = ["flambe","util","Signal2"];
flambe.util.Signal2.__super__ = flambe.util.SignalBase;
flambe.util.Signal2.prototype = $extend(flambe.util.SignalBase.prototype,{
	emit: function(arg1,arg2) {
		this.emit2(arg1,arg2);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal2
});
flambe.util.Signal1 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe.util.Signal1;
flambe.util.Signal1.__name__ = ["flambe","util","Signal1"];
flambe.util.Signal1.__super__ = flambe.util.SignalBase;
flambe.util.Signal1.prototype = $extend(flambe.util.SignalBase.prototype,{
	emit: function(arg1) {
		this.emit1(arg1);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal1
});
flambe.System = function() { }
$hxClasses["flambe.System"] = flambe.System;
flambe.System.__name__ = ["flambe","System"];
flambe.System.init = function() {
	if(!flambe.System._calledInit) {
		flambe.System._platform.init();
		flambe.System._calledInit = true;
	}
}
flambe.System.loadAssetPack = function(manifest) {
	flambe.System.assertCalledInit();
	return flambe.System._platform.loadAssetPack(manifest);
}
flambe.System.createTexture = function(width,height) {
	flambe.System.assertCalledInit();
	var texture = flambe.System._platform.getRenderer().createEmptyTexture(width,height);
	if(texture == null) flambe.Log.warn("Failed to create texture. Is the GPU context unavailable?");
	return texture;
}
flambe.System.createLogger = function(tag) {
	return new flambe.util.Logger(flambe.System._platform.createLogHandler(tag));
}
flambe.System.get_stage = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getStage();
}
flambe.System.get_pointer = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getPointer();
}
flambe.System.get_keyboard = function() {
	flambe.System.assertCalledInit();
	return flambe.System._platform.getKeyboard();
}
flambe.System.assertCalledInit = function() {
	flambe.util.Assert.that(flambe.System._calledInit,"You must call System.init() first");
}
flambe.util.Logger = function(handler) {
	this._handler = handler;
};
$hxClasses["flambe.util.Logger"] = flambe.util.Logger;
flambe.util.Logger.__name__ = ["flambe","util","Logger"];
flambe.util.Logger.prototype = {
	log: function(level,text,args) {
		if(this._handler == null) return;
		if(text == null) text = "";
		if(args != null) text = flambe.util.Strings.withFields(text,args);
		this._handler.log(level,text);
	}
	,warn: function(text,args) {
		this.log(flambe.util.LogLevel.Warn,text,args);
	}
	,info: function(text,args) {
		this.log(flambe.util.LogLevel.Info,text,args);
	}
	,__class__: flambe.util.Logger
}
flambe.Log = function() { }
$hxClasses["flambe.Log"] = flambe.Log;
flambe.Log.__name__ = ["flambe","Log"];
flambe.Log.info = function(text,args) {
	flambe.Log.logger.info(text,args);
}
flambe.Log.warn = function(text,args) {
	flambe.Log.logger.warn(text,args);
}
flambe.Log.__super__ = flambe.util.PackageLog;
flambe.Log.prototype = $extend(flambe.util.PackageLog.prototype,{
	__class__: flambe.Log
});
flambe.SpeedAdjuster = function(scale) {
	if(scale == null) scale = 1;
	this._internal_realDt = 0;
	this.scale = new flambe.animation.AnimatedFloat(scale);
};
$hxClasses["flambe.SpeedAdjuster"] = flambe.SpeedAdjuster;
flambe.SpeedAdjuster.__name__ = ["flambe","SpeedAdjuster"];
flambe.SpeedAdjuster.getFrom = function(entity) {
	return entity.getComponent("SpeedAdjuster_5");
}
flambe.SpeedAdjuster.__super__ = flambe.Component;
flambe.SpeedAdjuster.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this._internal_realDt > 0) {
			dt = this._internal_realDt;
			this._internal_realDt = 0;
		}
		this.scale.update(dt);
	}
	,get_name: function() {
		return "SpeedAdjuster_5";
	}
	,__class__: flambe.SpeedAdjuster
});
flambe.animation = {}
flambe.animation.AnimatedFloat = function(value,listener) {
	flambe.util.Value.call(this,value,listener);
	this.behaviorComplete = new flambe.util.Signal0();
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe.animation.AnimatedFloat;
flambe.animation.AnimatedFloat.__name__ = ["flambe","animation","AnimatedFloat"];
flambe.animation.AnimatedFloat.__super__ = flambe.util.Value;
flambe.animation.AnimatedFloat.prototype = $extend(flambe.util.Value.prototype,{
	set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe.util.Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) {
				this._behavior = null;
				this.behaviorComplete.emit();
			}
		}
	}
	,set__: function(value) {
		this._behavior = null;
		return flambe.util.Value.prototype.set__.call(this,value);
	}
	,__class__: flambe.animation.AnimatedFloat
});
flambe.animation.Behavior = function() { }
$hxClasses["flambe.animation.Behavior"] = flambe.animation.Behavior;
flambe.animation.Behavior.__name__ = ["flambe","animation","Behavior"];
flambe.animation.Behavior.prototype = {
	__class__: flambe.animation.Behavior
}
flambe.animation.Binding = function() { }
$hxClasses["flambe.animation.Binding"] = flambe.animation.Binding;
flambe.animation.Binding.__name__ = ["flambe","animation","Binding"];
flambe.animation.Binding.__interfaces__ = [flambe.animation.Behavior];
flambe.animation.Binding.prototype = {
	isComplete: function() {
		return false;
	}
	,update: function(dt) {
		var value = this._target.get__();
		if(this._fn != null) return this._fn(value); else return value;
	}
	,__class__: flambe.animation.Binding
}
flambe.asset = {}
flambe.asset.AssetType = $hxClasses["flambe.asset.AssetType"] = { __ename__ : ["flambe","asset","AssetType"], __constructs__ : ["Image","Audio","Data"] }
flambe.asset.AssetType.Image = ["Image",0];
flambe.asset.AssetType.Image.toString = $estr;
flambe.asset.AssetType.Image.__enum__ = flambe.asset.AssetType;
flambe.asset.AssetType.Audio = ["Audio",1];
flambe.asset.AssetType.Audio.toString = $estr;
flambe.asset.AssetType.Audio.__enum__ = flambe.asset.AssetType;
flambe.asset.AssetType.Data = ["Data",2];
flambe.asset.AssetType.Data.toString = $estr;
flambe.asset.AssetType.Data.__enum__ = flambe.asset.AssetType;
flambe.asset.AssetEntry = function(name,url,type,bytes) {
	this.name = name;
	this.url = url;
	this.type = type;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe.asset.AssetEntry;
flambe.asset.AssetEntry.__name__ = ["flambe","asset","AssetEntry"];
flambe.asset.AssetEntry.prototype = {
	getUrlExtension: function() {
		return flambe.util.Strings.getFileExtension(this.url.split("?")[0]).toLowerCase();
	}
	,__class__: flambe.asset.AssetEntry
}
flambe.asset.AssetPack = function() { }
$hxClasses["flambe.asset.AssetPack"] = flambe.asset.AssetPack;
flambe.asset.AssetPack.__name__ = ["flambe","asset","AssetPack"];
flambe.asset.AssetPack.prototype = {
	__class__: flambe.asset.AssetPack
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (js.Boot.isClass(o) || js.Boot.isEnum(o))) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
flambe.util.Strings = function() { }
$hxClasses["flambe.util.Strings"] = flambe.util.Strings;
flambe.util.Strings.__name__ = ["flambe","util","Strings"];
flambe.util.Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,dot + 1,null):null;
}
flambe.util.Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,0,dot):fileName;
}
flambe.util.Strings.joinPath = function(base,relative) {
	if(StringTools.fastCodeAt(base,base.length - 1) != 47) base += "/";
	return base + relative;
}
flambe.util.Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		message += message.length > 0?" [":"[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(Std["is"](value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib["eval"] = function(code) {
	return eval(code);
}
flambe.asset.Manifest = function() {
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe.asset.Manifest;
flambe.asset.Manifest.__name__ = ["flambe","asset","Manifest"];
flambe.asset.Manifest.build = function(packName,required) {
	if(required == null) required = true;
	var manifest = flambe.asset.Manifest._buildManifest.get(packName);
	if(manifest == null) {
		if(required) throw flambe.util.Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	return manifest.clone();
}
flambe.asset.Manifest.inferType = function(url) {
	var extension = flambe.util.Strings.getFileExtension(url.split("?")[0]);
	if(extension != null) switch(extension.toLowerCase()) {
	case "png":case "jpg":case "gif":
		return flambe.asset.AssetType.Image;
	case "ogg":case "m4a":case "mp3":case "wav":
		return flambe.asset.AssetType.Audio;
	}
	return flambe.asset.AssetType.Data;
}
flambe.asset.Manifest.createBuildManifests = function() {
	var macroData = new Hash();
	macroData.set("initial_load",[{ name : "ui/sb_squid_defense_splash_03_local.jpg", md5 : "1a4bbabd0640c1f279f7e993470c19ec", bytes : 147552},{ name : "ui/sb_squid_defense_splash_02.jpg", md5 : "ee05dc452013710421441295700f2e88", bytes : 181693},{ name : "ui/pausemenu_soundon_splash.png", md5 : "627239706a803fc0bb71361baaf24618", bytes : 15490},{ name : "ui/pausemenu_soundoff_splash.png", md5 : "a4b5cf48726923dbc884499bf563aa70", bytes : 13486},{ name : "audio/karate_squid_music.ogg", md5 : "aea96504c474e237ba5889d5f6c9d1f9", bytes : 610175},{ name : "audio/karate_squid_music.mp3", md5 : "07478e1069ddb16216d01eb246c57d56", bytes : 549804}]);
	macroData.set("gameplay_universal",[{ name : "ui/swipe_arrow.png", md5 : "bfb697f3dea4c4274cadf87451c63b73", bytes : 53262},{ name : "ui/screen_overlay_gold.png", md5 : "cd55aec3f13f6fdf482641121484d866", bytes : 125874},{ name : "ui/screen_overlay.png", md5 : "83d1bd5565b224e9a5dcb8627cebec35", bytes : 177284},{ name : "ui/score_container.png", md5 : "58f93892f49414963d27f55363874174", bytes : 22197},{ name : "ui/quit_yes_overlay.png", md5 : "962fefddab035704aa714465cb7f1ad3", bytes : 6052},{ name : "ui/quit_yes_button.png", md5 : "e1ae3bd5a0d8b90f6d3c3d386ecae5ba", bytes : 8449},{ name : "ui/quit_prompt.png", md5 : "2535f26c7624d094f1d6b4d1499c9f4b", bytes : 99260},{ name : "ui/quit_no_overlay.png", md5 : "ead0fd112af50ac91925c538ae4b499c", bytes : 5164},{ name : "ui/quit_no_button.png", md5 : "6f62b9c9cc4928b2f65048c7554bfdef", bytes : 6613},{ name : "ui/points_exclamation2.png", md5 : "0bbd4377623939272803fe3d04c83dbc", bytes : 24789},{ name : "ui/points_exclamation.png", md5 : "5593eb1f145ef3c4f77b5532947344f2", bytes : 18258},{ name : "ui/pause_menu.png", md5 : "38d10debc74f526f9d29a7995dfdf264", bytes : 228552},{ name : "ui/pause_button.png", md5 : "5628649b9c2e82ed7345b11c555c7020", bytes : 9130},{ name : "ui/pausemenu_soundon.png", md5 : "1251b8d982c0d415a960ed0f1c3924d9", bytes : 28637},{ name : "ui/pausemenu_soundoff.png", md5 : "169c4e31f3db77398b7b6f4b8d790ca8", bytes : 24034},{ name : "ui/pausemenu_quit.png", md5 : "569d97645952d7bdd27b51497593ca32", bytes : 31646},{ name : "ui/pausemenu_howtoplay.png", md5 : "a1aa6f437ca079fb66f86e737f67798a", bytes : 30230},{ name : "ui/pausemenu_backtogame.png", md5 : "70306a2a042b07f22f5294e57e8a08fc", bytes : 28089},{ name : "ui/hud_scoreoverlay.png", md5 : "c76c3cfc665a407ca695cb58b773bc4a", bytes : 8779},{ name : "ui/hud_ragetxt.png", md5 : "f4f642bf88d597971b78c3bb7dae2852", bytes : 10556},{ name : "ui/hud_meteroverlay.png", md5 : "a5ed43e05817ab0a639cca8688e9ca6f", bytes : 4088},{ name : "ui/hud_metergradientoverlay.png", md5 : "df17db95cfddf0082f35eb3e3b5348f0", bytes : 4425},{ name : "ui/hud_meterfill.png", md5 : "2eada5f38d2f674a1af7c289b8df3ba1", bytes : 5137},{ name : "ui/hud_meterborder.png", md5 : "016958179b554d4bf999a2c5e8196b0e", bytes : 6241},{ name : "ui/hud_itemstoadvance_overlay.png", md5 : "6f24ab3d4302c1688ed0c87a7bb7edc5", bytes : 9381},{ name : "ui/hud_itemstoadvance.png", md5 : "21f344d2d5c7b6d5084d80d56988612c", bytes : 22931},{ name : "ui/hud_healthoverlay.png", md5 : "f4e3a388fadc90e10b5a68317d5afe4c", bytes : 7891},{ name : "ui/hud_health3.png", md5 : "77c8ca2b188765bbe83d845160ccbc6e", bytes : 12987},{ name : "ui/hud_health2.png", md5 : "e0fa062b1da58453c3dce89d3c29f0fa", bytes : 10045},{ name : "ui/hud_health1.png", md5 : "49cb86f0370dfdc55473d6a88a880ea0", bytes : 7007},{ name : "ui/hud_health0.png", md5 : "5edaac8777dbda46b51d31ffae872ca1", bytes : 3071},{ name : "ui/hud_backing.png", md5 : "9b9d97104aa68e6cde309bc06ba32b47", bytes : 49015},{ name : "ui/howtoplay_screen.jpg", md5 : "a1b9a8a65e9ad9229e325ff76f867bef", bytes : 138874},{ name : "ui/howtoplay_playbutton.png", md5 : "c45ad5aec7e8435c914fbac5b23fab61", bytes : 17860},{ name : "ui/helpscreen_play_overlay.png", md5 : "fe93ec4682dd475a5511ce50a9c7348a", bytes : 4241},{ name : "ui/good.png", md5 : "4f2e24fb39a4be7b77b617535c28b9a9", bytes : 41006},{ name : "ui/gameover_screen.jpg", md5 : "0f97d0c77f5c9c7bde6bb321375eea1c", bytes : 152866},{ name : "ui/gameover_scoreoverlay.png", md5 : "9b8c3ee4d584042f279b7bd659439b6a", bytes : 23684},{ name : "ui/gameover_playoverlay.png", md5 : "db82346fa1926cc52c3b9118b15e2c4d", bytes : 4522},{ name : "ui/gameover_button.png", md5 : "29c81c7f209ba9e735f8ae89d9b4cc9f", bytes : 14192},{ name : "ui/frenzy.png", md5 : "0441f65c9f642d40a81f805af079196e", bytes : 116669},{ name : "ui/bad_x.png", md5 : "36d2fb9301e6afc5533c3bf8d7cde116", bytes : 41308},{ name : "ui/bad.png", md5 : "b6445ef67512c69d7bfb2a5ddc9d85da", bytes : 36341},{ name : "ui/AssetScreenGameplayHud.png", md5 : "51db7beaa9b2515d9f47b80406f1c10b", bytes : 4047},{ name : "ui/3.png", md5 : "02ec6beb057def2c901f11087f0b3c79", bytes : 62012},{ name : "ui/2_red.png", md5 : "b20d3f9a4d46cb9ba69e9e1e439caa46", bytes : 40861},{ name : "ui/1.png", md5 : "f5788cbe5f0efedfec3e5b98dcdf0d5a", bytes : 39219},{ name : "transition_animation/library.json", md5 : "02a0ef6b65595c5fb22ea59033b65fb2", bytes : 1056},{ name : "transition_animation/atlas1.png", md5 : "44f20c93c49b7f74e8f7c63b17db3b86", bytes : 527073},{ name : "transition_animation/atlas0.png", md5 : "9422d0232e60d410e3c7e4aea633e827", bytes : 523385},{ name : "squidward_animation/library.json", md5 : "e7a5826dbe63bc310800a1c112f79b2b", bytes : 163996},{ name : "squidward_animation/atlas6.png", md5 : "383237225181173e64ad8af33f9ca7d8", bytes : 8100},{ name : "squidward_animation/atlas5.png", md5 : "adf61fd4e38de422a0361b7d3e8d33ea", bytes : 5587},{ name : "squidward_animation/atlas4.png", md5 : "9830502ebc628871d89eb17fd73a7682", bytes : 173865},{ name : "squidward_animation/atlas3.png", md5 : "72653254a368e75c6ee75d9bbb735b0b", bytes : 220112},{ name : "squidward_animation/atlas2.png", md5 : "1f7b3631392585f3e035fe3199302ded", bytes : 218985},{ name : "squidward_animation/atlas1.png", md5 : "4c68369f89a99061a692f85987a7db77", bytes : 307950},{ name : "squidward_animation/atlas0.png", md5 : "c088fb7475deb1580e56b202053d7397", bytes : 199407},{ name : "sounds/wood_smash.ogg", md5 : "2e09600dd2176af3f522653154b8569e", bytes : 72963},{ name : "sounds/wood_smash.mp3", md5 : "ad4922027e64a1b373f1ef2bd2c92de8", bytes : 53168},{ name : "sounds/upgrade_collect.ogg", md5 : "82fe5ba7a684d5bf9ecb3e754d17c071", bytes : 37701},{ name : "sounds/upgrade_collect.mp3", md5 : "b8ac98967352d5d11fbb0331fd0e26d6", bytes : 41794},{ name : "sounds/stone_thud.ogg", md5 : "68b18fe9085da7961639871560472e3b", bytes : 15094},{ name : "sounds/stone_thud.mp3", md5 : "7d3b46b4479a83f62e7cf6ba86dbf709", bytes : 18469},{ name : "sounds/rock_break.ogg", md5 : "30e1d98f6b338fd30f6aab2e7efc0eeb", bytes : 42167},{ name : "sounds/rock_break.mp3", md5 : "3eb2667eb12cead2e7e3a2996648770e", bytes : 36188},{ name : "sounds/injured.ogg", md5 : "17c46ae6a0b6bf4bb752b772afbec5f5", bytes : 16563},{ name : "sounds/injured.mp3", md5 : "ec5d03ac8ab3296d68a437bc18491c8b", bytes : 77496},{ name : "sounds/hit.ogg", md5 : "9b6d4ce446d6e4e46f99e5588d117b87", bytes : 7763},{ name : "sounds/hit.mp3", md5 : "fe97347140a094feb4192909a4b87e0b", bytes : 8015},{ name : "sounds/go.ogg", md5 : "34fa027b84b0f868347941a49ff9e59a", bytes : 15080},{ name : "sounds/go.mp3", md5 : "0e9ed75d66bfe688dc95de20678cc24d", bytes : 22201},{ name : "sounds/countdown.ogg", md5 : "eec0e095ca40513a944083f9b45c894c", bytes : 14188},{ name : "sounds/countdown.mp3", md5 : "3ce61310f7a957ae27fcf67df13e9f80", bytes : 10527},{ name : "elements/treedome_bg/sb_squid_bg_treedome_scene_1_b.jpg", md5 : "95bb49b4346692e3d78d06a69a466eb4", bytes : 102191},{ name : "elements/treedome_bg/sb_squid_bg_treedome_01_scene_2_b.jpg", md5 : "250bfb0b98b725dfd2986e8b01d05b79", bytes : 77923},{ name : "elements/table/sb_squid_karate_table.png", md5 : "5628c225c52702d1fb372ecad58f4b5f", bytes : 670163},{ name : "elements/props/statue3.png", md5 : "90453eaf011143cd624a6f755de21777", bytes : 36861},{ name : "elements/props/statue2.png", md5 : "595c52860ede39ccdd077b0073fcca81", bytes : 61866},{ name : "elements/props/statue1.png", md5 : "9ff41a9adfa7cb03c07211a481417807", bytes : 49983},{ name : "elements/props/pineapple3.png", md5 : "bd307ae4fbfcaa1bd8e229f0702b37a0", bytes : 56165},{ name : "elements/props/pineapple2.png", md5 : "832a69613f72b8d8dc1e20caf48277ac", bytes : 48778},{ name : "elements/props/pineapple1.png", md5 : "c5f006624199351270ec06bc091dd045", bytes : 41709},{ name : "elements/props/log3.png", md5 : "740ed4aeaebb7a1f4586d3ff3b74ae02", bytes : 68339},{ name : "elements/props/log2.png", md5 : "247e5010fa68baa6f87fcc5e3b79ff14", bytes : 62563},{ name : "elements/props/log1.png", md5 : "fb70c23182dba0126e0fb5af5389a35b", bytes : 42359},{ name : "elements/props/life.png", md5 : "cc55df96dd8177dff54df54826048aaf", bytes : 44162},{ name : "elements/props/invincible.png", md5 : "d8aeb7937849c1be09fef6842bd42659", bytes : 49101},{ name : "elements/props/double.png", md5 : "97a6555f1e2fda2d0c07e122af0eab44", bytes : 53094},{ name : "elements/props/clam_open.png", md5 : "77231077a12b6beef40af8c10776941b", bytes : 41274},{ name : "elements/props/clam_closed2.png", md5 : "5ae44207a6ec7891f848f50ef58f6a21", bytes : 25504},{ name : "elements/props/clam_closed.png", md5 : "656d0306be23018068e04267134d6510", bytes : 21137},{ name : "elements/props/board3.png", md5 : "8dfce1aed84c6d325aca66661cbb0681", bytes : 61700},{ name : "elements/props/board2.png", md5 : "643f6e6492c631b874a7fafda4195b2a", bytes : 41500},{ name : "elements/props/board1.png", md5 : "c237b8ac117babf92794cad890983b33", bytes : 38998},{ name : "elements/props/block3.png", md5 : "51399f8baf42970d6b2cbb7a30059524", bytes : 35825},{ name : "elements/props/block2.png", md5 : "ee683cc03ae948071295618ea9643dd4", bytes : 51484},{ name : "elements/props/block1.png", md5 : "29ccc0e86f11923d3178aa0c893ef7c7", bytes : 31595},{ name : "elements/particles/statue_particle5.png", md5 : "b4e146b69bae4434b932a7412baf86d2", bytes : 3579},{ name : "elements/particles/statue_particle4.png", md5 : "d039141c060a47bc02c5a10764a45e62", bytes : 3319},{ name : "elements/particles/statue_particle3.png", md5 : "ab9b780fc97e7696798a9b635a1d7510", bytes : 4468},{ name : "elements/particles/statue_particle2.png", md5 : "30ac61dd1b086f8f70d7f3146d802b4a", bytes : 4737},{ name : "elements/particles/statue_particle1.png", md5 : "31c5608a091ae8f2193a6994782e7803", bytes : 6353},{ name : "elements/particles/pineapple_particle6.png", md5 : "82f36d9aff80370460d7de5a6210350b", bytes : 2112},{ name : "elements/particles/pineapple_particle5.png", md5 : "dddaa403f98ccabc69af33973f259e38", bytes : 2234},{ name : "elements/particles/pineapple_particle4.png", md5 : "41feb492698a470ddd86cd28dcb2b959", bytes : 2399},{ name : "elements/particles/pineapple_particle3.png", md5 : "d28f3012d9b19532514120b40379defb", bytes : 2302},{ name : "elements/particles/pineapple_particle2.png", md5 : "bf8cd86d5e08e756fcf6df2321d4d90d", bytes : 2522},{ name : "elements/particles/pineapple_particle1.png", md5 : "bd7dd0d1f95e78f5a9876d00806942f1", bytes : 2797},{ name : "elements/particles/log_particle3.png", md5 : "08dc2d20a3328a248ee610ed68f143b3", bytes : 3304},{ name : "elements/particles/log_particle2.png", md5 : "6785a26b39a0cb43b8fd36906cfd33d7", bytes : 4151},{ name : "elements/particles/log_particle1.png", md5 : "c72e2ca9f35eb58becc48788b6542b76", bytes : 5401},{ name : "elements/particles/board_particle3.png", md5 : "8ac4d1af03f15b134375cc4b516d255e", bytes : 2912},{ name : "elements/particles/board_particle2.png", md5 : "f97728a06d1c07792b05efd426c3484d", bytes : 3364},{ name : "elements/particles/board_particle1.png", md5 : "5fb64af05eab9c884ab9e141ddb3d81f", bytes : 5222},{ name : "elements/particles/block_particle5.png", md5 : "790397f56ff41c8ba902035df316e251", bytes : 2950},{ name : "elements/particles/block_particle4.png", md5 : "69ebd2db1fd7ac551557f4cbea2a0622", bytes : 4744},{ name : "elements/particles/block_particle3.png", md5 : "d63772ff5169b675c41dd258193af839", bytes : 3740},{ name : "elements/particles/block_particle2.png", md5 : "66ccf1973e584723035eaf39362cb338", bytes : 7214},{ name : "elements/particles/block_particle1.png", md5 : "c48c7187a3fcb7fcb4368704ca014394", bytes : 6633},{ name : "elements/krusty_krab/sb_squid_bg_kk_scene_02.jpg", md5 : "bcb2f0daf4adafb884446b0f7813657c", bytes : 109804},{ name : "elements/krusty_krab/sb_squid_bg_kk_scene_01.jpg", md5 : "dd2558be25ca15bd94821ffced6bc408", bytes : 110028},{ name : "elements/alleyway/sb_squid_bg_alley_scene_02.jpg", md5 : "8bda24c82e401d1c9a4d0cd26531ad38", bytes : 93115},{ name : "elements/alleyway/sb_squid_bg_alley_scene_01.jpg", md5 : "e76a36d0582467487f697b023e6ece48", bytes : 94704}]);
	macroData.set("fonts_la",[{ name : "Basic2.png", md5 : "d0961b0d6abf61a9b0bae4021ce1920e", bytes : 475822},{ name : "Basic2.fnt", md5 : "1c54e730f26f2e195836c4328ed0738a", bytes : 31354},{ name : "Basic.png", md5 : "09dd1fdfd5e52f362b600eaec1d981e0", bytes : 283781},{ name : "Basic.fnt", md5 : "dc91d3afd3cec116e0c9d104c7ab7b33", bytes : 31422}]);
	macroData.set("fonts_kr",[{ name : "Basic2.png", md5 : "d0961b0d6abf61a9b0bae4021ce1920e", bytes : 475822},{ name : "Basic2.fnt", md5 : "1c54e730f26f2e195836c4328ed0738a", bytes : 31354},{ name : "Basic.png", md5 : "09dd1fdfd5e52f362b600eaec1d981e0", bytes : 283781},{ name : "Basic.fnt", md5 : "dc91d3afd3cec116e0c9d104c7ab7b33", bytes : 31422}]);
	macroData.set("fonts_jp",[{ name : "Basic2.png", md5 : "d0961b0d6abf61a9b0bae4021ce1920e", bytes : 475822},{ name : "Basic2.fnt", md5 : "1c54e730f26f2e195836c4328ed0738a", bytes : 31354},{ name : "Basic.png", md5 : "09dd1fdfd5e52f362b600eaec1d981e0", bytes : 283781},{ name : "Basic.fnt", md5 : "dc91d3afd3cec116e0c9d104c7ab7b33", bytes : 31422}]);
	macroData.set("fonts_en",[{ name : "Basic2.png", md5 : "5ba02d6818f13d5185f27f758be28b39", bytes : 279030},{ name : "Basic2.fnt", md5 : "b8238bd2f7f8bedcf5de202bd7be5e95", bytes : 12015},{ name : "Basic.png", md5 : "ae53255ce220d6a9233a9758d5aa5be8", bytes : 185627},{ name : "Basic.fnt", md5 : "eb8829d28434886e957c017ea98cea4f", bytes : 12014}]);
	macroData.set("fonts_cn",[{ name : "Basic2.png", md5 : "d0961b0d6abf61a9b0bae4021ce1920e", bytes : 475822},{ name : "Basic2.fnt", md5 : "1c54e730f26f2e195836c4328ed0738a", bytes : 31354},{ name : "Basic.png", md5 : "09dd1fdfd5e52f362b600eaec1d981e0", bytes : 283781},{ name : "Basic.fnt", md5 : "dc91d3afd3cec116e0c9d104c7ab7b33", bytes : 31422}]);
	macroData.set("bootstrap",[{ name : "ui/localization_loading.jpg", md5 : "36a0f0ef491c66f44cc8ba06fee17a40", bytes : 240241},{ name : "ui/loading_spinner.png", md5 : "6e5740d1b434e645758e95a846711ce7", bytes : 14963},{ name : "ui/loading_screen.jpg", md5 : "4a7d1ffb2608f45db6bcb9b06ee6cf91", bytes : 153474},{ name : "fonts/testFont.png", md5 : "ae53255ce220d6a9233a9758d5aa5be8", bytes : 185627},{ name : "fonts/testFont.fnt", md5 : "2caa75edb4a9808a2aa21c8d1ed0b50d", bytes : 12017},{ name : "config/translation_la.xml", md5 : "cc8be21fa9386ca36310c11acf545c43", bytes : 9911},{ name : "config/translation_kr.xml", md5 : "cc8be21fa9386ca36310c11acf545c43", bytes : 9911},{ name : "config/translation_jp.xml", md5 : "cc8be21fa9386ca36310c11acf545c43", bytes : 9911},{ name : "config/translation_en.xml", md5 : "cc8be21fa9386ca36310c11acf545c43", bytes : 9911},{ name : "config/translation_cn.xml", md5 : "cc8be21fa9386ca36310c11acf545c43", bytes : 9911},{ name : "config/config.xml", md5 : "65efe668059597981a9978b460d96a8b", bytes : 651},{ name : "audio/silent.ogg", md5 : "3526550092a0e091f382852de5ef2315", bytes : 5514},{ name : "audio/silent.mp3", md5 : "ba9e6829ba32e427142251a85cbd4fbb", bytes : 2114}]);
	var manifests = new Hash();
	var $it0 = macroData.keys();
	while( $it0.hasNext() ) {
		var packName = $it0.next();
		var manifest = new flambe.asset.Manifest();
		manifest.set_relativeBasePath("assets");
		var _g = 0, _g1 = macroData.get(packName);
		while(_g < _g1.length) {
			var asset = _g1[_g];
			++_g;
			var name = asset.name;
			var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
			var type = flambe.asset.Manifest.inferType(name);
			if(type == flambe.asset.AssetType.Image || type == flambe.asset.AssetType.Audio) name = flambe.util.Strings.removeFileExtension(name);
			manifest.add(name,path,asset.bytes,type);
		}
		manifests.set(packName,manifest);
	}
	return manifests;
}
flambe.asset.Manifest.prototype = {
	set_externalBasePath: function(basePath) {
		this._externalBasePath = basePath;
		if(basePath != null) flambe.util.Assert.that(StringTools.startsWith(basePath,"http://") || StringTools.startsWith(basePath,"https://"),"externalBasePath must be on an external domain, starting with http(s)://");
		return basePath;
	}
	,get_externalBasePath: function() {
		return this._externalBasePath;
	}
	,set_relativeBasePath: function(basePath) {
		this._relativeBasePath = basePath;
		if(basePath != null) flambe.util.Assert.that(!StringTools.startsWith(basePath,"http://") && !StringTools.startsWith(basePath,"https://"),"relativeBasePath must be a relative path on the same domain, NOT starting with http(s)://");
		return basePath;
	}
	,get_relativeBasePath: function() {
		return this._relativeBasePath;
	}
	,getFullURL: function(entry) {
		var restricted = this.get_externalBasePath() != null && flambe.asset.Manifest._supportsCrossOrigin?this.get_externalBasePath():this.get_relativeBasePath();
		var unrestricted = this.get_externalBasePath() != null?this.get_externalBasePath():this.get_relativeBasePath();
		var base = unrestricted;
		if(entry.type == flambe.asset.AssetType.Data) base = restricted;
		return base != null?flambe.util.Strings.joinPath(base,entry.url):entry.url;
	}
	,clone: function() {
		var copy = new flambe.asset.Manifest();
		copy.set_relativeBasePath(this.get_relativeBasePath());
		copy.set_externalBasePath(this.get_externalBasePath());
		copy._entries = this._entries.slice();
		return copy;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,add: function(name,url,bytes,type) {
		if(bytes == null) bytes = 0;
		if(type == null) type = flambe.asset.Manifest.inferType(url);
		var entry = new flambe.asset.AssetEntry(name,url,type,bytes);
		this._entries.push(entry);
		return entry;
	}
	,__class__: flambe.asset.Manifest
}
flambe.display = {}
flambe.display.BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : ["flambe","display","BlendMode"], __constructs__ : ["Normal","Add","CopyExperimental"] }
flambe.display.BlendMode.Normal = ["Normal",0];
flambe.display.BlendMode.Normal.toString = $estr;
flambe.display.BlendMode.Normal.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Add = ["Add",1];
flambe.display.BlendMode.Add.toString = $estr;
flambe.display.BlendMode.Add.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.CopyExperimental = ["CopyExperimental",2];
flambe.display.BlendMode.CopyExperimental.toString = $estr;
flambe.display.BlendMode.CopyExperimental.__enum__ = flambe.display.BlendMode;
flambe.math = {}
flambe.math.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe.math.Point;
flambe.math.Point.__name__ = ["flambe","math","Point"];
flambe.math.Point.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,__class__: flambe.math.Point
}
flambe.display.Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 1 << 0 | 1 << 1 | 1 << 3;
	this._localMatrix = new flambe.math.Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = flambe.util.BitSets.add(_g._flags,1 << 2 | 1 << 3);
	};
	this.x = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe.animation.AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe.display.Sprite;
flambe.display.Sprite.__name__ = ["flambe","display","Sprite"];
flambe.display.Sprite.getFrom = function(entity) {
	return entity.getComponent("Sprite_1");
}
flambe.display.Sprite.hitTest = function(entity,x,y) {
	var sprite = flambe.display.Sprite.getFrom(entity);
	if(sprite != null) {
		if(!flambe.util.BitSets.containsAll(sprite._flags,1 << 0 | 1 << 1)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe.display.Sprite._scratchPoint)) {
			x = flambe.display.Sprite._scratchPoint.x;
			y = flambe.display.Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe.display.Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	return sprite != null && sprite.containsLocal(x,y)?sprite:null;
}
flambe.display.Sprite.getBounds = function(entity,result) {
	if(result == null) result = new flambe.math.Rectangle();
	result.set(1.79769313486231e+308,1.79769313486231e+308,-1.79769313486231e+308,-1.79769313486231e+308);
	flambe.display.Sprite.getBoundsImpl(entity,null,result);
	result.width -= result.x;
	result.height -= result.y;
	return result;
}
flambe.display.Sprite.render = function(entity,g) {
	var sprite = flambe.display.Sprite.getFrom(entity);
	if(sprite != null) {
		var alpha = sprite.alpha.get__();
		if(!sprite.get_visible() || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,matrix.m02,matrix.m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = flambe.scene.Director.getFrom(entity);
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe.display.Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
}
flambe.display.Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe.display.Sprite.hitTestBackwards(entity.next,x,y);
		return result != null?result:flambe.display.Sprite.hitTest(entity,x,y);
	}
	return null;
}
flambe.display.Sprite.getBoundsImpl = function(entity,matrix,result) {
	var sprite = flambe.display.Sprite.getFrom(entity);
	if(sprite != null) {
		matrix = matrix != null?flambe.math.Matrix.multiply(matrix,sprite.getLocalMatrix()):sprite.getLocalMatrix();
		var x1 = 0.0, y1 = 0.0;
		var x2 = sprite.getNaturalWidth(), y2 = sprite.getNaturalHeight();
		if(x2 > x1 && y2 > y1) {
			flambe.display.Sprite.extendRect(matrix,x1,y1,result);
			flambe.display.Sprite.extendRect(matrix,x2,y1,result);
			flambe.display.Sprite.extendRect(matrix,x2,y2,result);
			flambe.display.Sprite.extendRect(matrix,x1,y2,result);
		}
	}
	var director = flambe.scene.Director.getFrom(entity);
	if(director != null) {
		var scenes = director.occludedScenes;
		var ii = 0, ll = scenes.length;
		while(ii < ll) {
			flambe.display.Sprite.getBoundsImpl(scenes[ii],matrix,result);
			++ii;
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.getBoundsImpl(p,matrix,result);
		p = next;
	}
}
flambe.display.Sprite.extendRect = function(matrix,x,y,rect) {
	var p = matrix.transform(x,y,flambe.display.Sprite._scratchPoint);
	x = p.x;
	y = p.y;
	if(x < rect.x) rect.x = x;
	if(y < rect.y) rect.y = y;
	if(x > rect.width) rect.width = x;
	if(y > rect.height) rect.height = y;
}
flambe.display.Sprite.__super__ = flambe.Component;
flambe.display.Sprite.prototype = $extend(flambe.Component.prototype,{
	set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe.util.BitSets.set(this._flags,1 << 1,pointerEnabled);
		return pointerEnabled;
	}
	,set_visible: function(visible) {
		this._flags = flambe.util.BitSets.set(this._flags,1 << 0,visible);
		return visible;
	}
	,get_visible: function() {
		return flambe.util.BitSets.contains(this._flags,1 << 0);
	}
	,get_pointerUp: function() {
		if(this._internal_pointerUp == null) this._internal_pointerUp = new flambe.util.Signal1();
		return this._internal_pointerUp;
	}
	,get_pointerMove: function() {
		if(this._internal_pointerMove == null) this._internal_pointerMove = new flambe.util.Signal1();
		return this._internal_pointerMove;
	}
	,get_pointerDown: function() {
		if(this._internal_pointerDown == null) this._internal_pointerDown = new flambe.util.Signal1();
		return this._internal_pointerDown;
	}
	,draw: function(g) {
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,setScale: function(scale) {
		this.scaleX.set__(scale);
		this.scaleY.set__(scale);
		return this;
	}
	,setAnchor: function(x,y) {
		this.anchorX.set__(x);
		this.anchorY.set__(y);
		return this;
	}
	,getLocalMatrix: function() {
		if(flambe.util.BitSets.contains(this._flags,1 << 2)) {
			this._flags = flambe.util.BitSets.remove(this._flags,1 << 2);
			this._localMatrix.compose(this.x.get__(),this.y.get__(),this.scaleX.get__(),this.scaleY.get__(),flambe.math.FMath.toRadians(this.rotation.get__()));
			this._localMatrix.translate(-this.anchorX.get__(),-this.anchorY.get__());
		}
		return this._localMatrix;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,get_name: function() {
		return "Sprite_1";
	}
	,__class__: flambe.display.Sprite
});
flambe.display.FillSprite = function(color,width,height) {
	flambe.display.Sprite.call(this);
	this.color = color;
	this.width = new flambe.animation.AnimatedFloat(width);
	this.height = new flambe.animation.AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe.display.FillSprite;
flambe.display.FillSprite.__name__ = ["flambe","display","FillSprite"];
flambe.display.FillSprite.__super__ = flambe.display.Sprite;
flambe.display.FillSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,getNaturalHeight: function() {
		return this.height.get__();
	}
	,getNaturalWidth: function() {
		return this.width.get__();
	}
	,draw: function(g) {
		g.fillRect(this.color,0,0,this.width.get__(),this.height.get__());
	}
	,__class__: flambe.display.FillSprite
});
flambe.display.Font = function(pack,name) {
	this.name = name;
	this._glyphs = new IntHash();
	var parser = new flambe.display._Font.ConfigParser(pack.getFile(name + ".fnt"));
	var pages = new IntHash();
	var idx = name.lastIndexOf("/");
	var basePath = idx >= 0?HxOverrides.substr(name,0,idx + 1):"";
	var $it0 = parser.keywords();
	while( $it0.hasNext() ) {
		var keyword = $it0.next();
		switch(keyword) {
		case "info":
			var $it1 = parser.pairs();
			while( $it1.hasNext() ) {
				var pair = $it1.next();
				switch(pair.key) {
				case "size":
					this.size = pair.getInt();
					break;
				}
			}
			break;
		case "page":
			var pageId = 0;
			var file = null;
			var $it2 = parser.pairs();
			while( $it2.hasNext() ) {
				var pair = $it2.next();
				switch(pair.key) {
				case "id":
					pageId = pair.getInt();
					break;
				case "file":
					file = pair.getString();
					break;
				}
			}
			pages.set(pageId,pack.getTexture(basePath + flambe.util.Strings.removeFileExtension(file)));
			break;
		case "char":
			var glyph = null;
			var $it3 = parser.pairs();
			while( $it3.hasNext() ) {
				var pair = $it3.next();
				switch(pair.key) {
				case "id":
					glyph = new flambe.display.Glyph(pair.getInt());
					break;
				case "x":
					glyph.x = pair.getInt();
					break;
				case "y":
					glyph.y = pair.getInt();
					break;
				case "width":
					glyph.width = pair.getInt();
					break;
				case "height":
					glyph.height = pair.getInt();
					break;
				case "page":
					glyph.page = pages.get(pair.getInt());
					break;
				case "xoffset":
					glyph.xOffset = pair.getInt();
					break;
				case "yoffset":
					glyph.yOffset = pair.getInt();
					break;
				case "xadvance":
					glyph.xAdvance = pair.getInt();
					break;
				}
			}
			this._glyphs.set(glyph.charCode,glyph);
			break;
		case "kerning":
			var first = null;
			var second = -1;
			var $it4 = parser.pairs();
			while( $it4.hasNext() ) {
				var pair = $it4.next();
				switch(pair.key) {
				case "first":
					first = this._glyphs.get(pair.getInt());
					break;
				case "second":
					second = pair.getInt();
					break;
				case "amount":
					first._internal_setKerning(second,pair.getInt());
					break;
				}
			}
			break;
		}
	}
};
$hxClasses["flambe.display.Font"] = flambe.display.Font;
flambe.display.Font.__name__ = ["flambe","display","Font"];
flambe.display.Font.prototype = {
	getGlyphs: function(text) {
		var list = [];
		var _g1 = 0, _g = text.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var charCode = StringTools.fastCodeAt(text,ii);
			var glyph = this._glyphs.get(charCode);
			if(glyph != null) list.push(glyph); else flambe.Log.warn("Requested a missing character from font",["font",this.name,"charCode",charCode]);
		}
		return list;
	}
	,__class__: flambe.display.Font
}
flambe.display.Glyph = function(charCode) {
	this.charCode = charCode;
};
$hxClasses["flambe.display.Glyph"] = flambe.display.Glyph;
flambe.display.Glyph.__name__ = ["flambe","display","Glyph"];
flambe.display.Glyph.prototype = {
	_internal_setKerning: function(nextCharCode,amount) {
		if(this._kernings == null) this._kernings = new IntHash();
		this._kernings.set(nextCharCode,amount);
	}
	,getKerning: function(nextCharCode) {
		return this._kernings != null?Std["int"](this._kernings.get(nextCharCode)):0;
	}
	,draw: function(g,destX,destY) {
		if(this.width > 0) g.drawSubImage(this.page,destX + this.xOffset,destY + this.yOffset,this.x,this.y,this.width,this.height);
	}
	,__class__: flambe.display.Glyph
}
flambe.display._Font = {}
flambe.display._Font.ConfigParser = function(config) {
	this._configText = config;
	this._keywordPattern = new EReg("([a-z]+)(.*)","");
	this._pairPattern = new EReg("([a-z]+)=(\"[^\"]*\"|[^\\s]+)","");
};
$hxClasses["flambe.display._Font.ConfigParser"] = flambe.display._Font.ConfigParser;
flambe.display._Font.ConfigParser.__name__ = ["flambe","display","_Font","ConfigParser"];
flambe.display._Font.ConfigParser.advance = function(text,expr) {
	var m = expr.matchedPos();
	return HxOverrides.substr(text,m.pos + m.len,text.length);
}
flambe.display._Font.ConfigParser.prototype = {
	pairs: function() {
		var _g = this;
		var text = this._pairText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._pairPattern);
			return new flambe.display._Font.ConfigPair(_g._pairPattern.matched(1),_g._pairPattern.matched(2));
		}, hasNext : function() {
			return _g._pairPattern.match(text);
		}};
	}
	,keywords: function() {
		var _g = this;
		var text = this._configText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._keywordPattern);
			_g._pairText = _g._keywordPattern.matched(2);
			return _g._keywordPattern.matched(1);
		}, hasNext : function() {
			return _g._keywordPattern.match(text);
		}};
	}
	,__class__: flambe.display._Font.ConfigParser
}
flambe.display._Font.ConfigPair = function(key,value) {
	this.key = key;
	this._value = value;
};
$hxClasses["flambe.display._Font.ConfigPair"] = flambe.display._Font.ConfigPair;
flambe.display._Font.ConfigPair.__name__ = ["flambe","display","_Font","ConfigPair"];
flambe.display._Font.ConfigPair.prototype = {
	getString: function() {
		if(StringTools.fastCodeAt(this._value,0) != 34) return null;
		return HxOverrides.substr(this._value,1,this._value.length - 2);
	}
	,getInt: function() {
		return Std.parseInt(this._value);
	}
	,__class__: flambe.display._Font.ConfigPair
}
flambe.display.Graphics = function() { }
$hxClasses["flambe.display.Graphics"] = flambe.display.Graphics;
flambe.display.Graphics.__name__ = ["flambe","display","Graphics"];
flambe.display.Graphics.prototype = {
	__class__: flambe.display.Graphics
}
flambe.display.ImageSprite = function(texture) {
	flambe.display.Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe.display.ImageSprite;
flambe.display.ImageSprite.__name__ = ["flambe","display","ImageSprite"];
flambe.display.ImageSprite.__super__ = flambe.display.Sprite;
flambe.display.ImageSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.texture.get_height();
	}
	,getNaturalWidth: function() {
		return this.texture.get_width();
	}
	,draw: function(g) {
		g.drawImage(this.texture,0,0);
	}
	,__class__: flambe.display.ImageSprite
});
flambe.display.MaskSprite = function(shape,image) {
	flambe.display.Sprite.call(this);
	this.image = image;
	this.shape = shape;
	this.flagRefreshMask = true;
};
$hxClasses["flambe.display.MaskSprite"] = flambe.display.MaskSprite;
flambe.display.MaskSprite.__name__ = ["flambe","display","MaskSprite"];
flambe.display.MaskSprite.__super__ = flambe.display.Sprite;
flambe.display.MaskSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.image.onUpdate(dt);
		this.shape.onUpdate(dt);
	}
	,draw: function(g) {
		g.mask(this.shape,this.image);
	}
	,__class__: flambe.display.MaskSprite
});
flambe.display.Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : ["flambe","display","Orientation"], __constructs__ : ["Portrait","Landscape"] }
flambe.display.Orientation.Portrait = ["Portrait",0];
flambe.display.Orientation.Portrait.toString = $estr;
flambe.display.Orientation.Portrait.__enum__ = flambe.display.Orientation;
flambe.display.Orientation.Landscape = ["Landscape",1];
flambe.display.Orientation.Landscape.toString = $estr;
flambe.display.Orientation.Landscape.__enum__ = flambe.display.Orientation;
flambe.display.SHAPE_METHODS = $hxClasses["flambe.display.SHAPE_METHODS"] = { __ename__ : ["flambe","display","SHAPE_METHODS"], __constructs__ : ["MoveTo","LineTo","BeginPath","ClosePath","BeginStroke","EndStroke","BeginFill","EndFill","QuadCurve","BezCurve","Save","Restore","DrawRect","Arc"] }
flambe.display.SHAPE_METHODS.MoveTo = ["MoveTo",0];
flambe.display.SHAPE_METHODS.MoveTo.toString = $estr;
flambe.display.SHAPE_METHODS.MoveTo.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.LineTo = ["LineTo",1];
flambe.display.SHAPE_METHODS.LineTo.toString = $estr;
flambe.display.SHAPE_METHODS.LineTo.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.BeginPath = ["BeginPath",2];
flambe.display.SHAPE_METHODS.BeginPath.toString = $estr;
flambe.display.SHAPE_METHODS.BeginPath.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.ClosePath = ["ClosePath",3];
flambe.display.SHAPE_METHODS.ClosePath.toString = $estr;
flambe.display.SHAPE_METHODS.ClosePath.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.BeginStroke = ["BeginStroke",4];
flambe.display.SHAPE_METHODS.BeginStroke.toString = $estr;
flambe.display.SHAPE_METHODS.BeginStroke.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.EndStroke = ["EndStroke",5];
flambe.display.SHAPE_METHODS.EndStroke.toString = $estr;
flambe.display.SHAPE_METHODS.EndStroke.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.BeginFill = ["BeginFill",6];
flambe.display.SHAPE_METHODS.BeginFill.toString = $estr;
flambe.display.SHAPE_METHODS.BeginFill.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.EndFill = ["EndFill",7];
flambe.display.SHAPE_METHODS.EndFill.toString = $estr;
flambe.display.SHAPE_METHODS.EndFill.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.QuadCurve = ["QuadCurve",8];
flambe.display.SHAPE_METHODS.QuadCurve.toString = $estr;
flambe.display.SHAPE_METHODS.QuadCurve.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.BezCurve = ["BezCurve",9];
flambe.display.SHAPE_METHODS.BezCurve.toString = $estr;
flambe.display.SHAPE_METHODS.BezCurve.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.Save = ["Save",10];
flambe.display.SHAPE_METHODS.Save.toString = $estr;
flambe.display.SHAPE_METHODS.Save.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.Restore = ["Restore",11];
flambe.display.SHAPE_METHODS.Restore.toString = $estr;
flambe.display.SHAPE_METHODS.Restore.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.DrawRect = ["DrawRect",12];
flambe.display.SHAPE_METHODS.DrawRect.toString = $estr;
flambe.display.SHAPE_METHODS.DrawRect.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.SHAPE_METHODS.Arc = ["Arc",13];
flambe.display.SHAPE_METHODS.Arc.toString = $estr;
flambe.display.SHAPE_METHODS.Arc.__enum__ = flambe.display.SHAPE_METHODS;
flambe.display.ShapeSprite = function() {
	this.isPath = false;
	this.isLine = false;
	this.isShape = false;
	this.color = 0;
	flambe.display.Sprite.call(this);
	this.points = new Array();
};
$hxClasses["flambe.display.ShapeSprite"] = flambe.display.ShapeSprite;
flambe.display.ShapeSprite.__name__ = ["flambe","display","ShapeSprite"];
flambe.display.ShapeSprite.__super__ = flambe.display.Sprite;
flambe.display.ShapeSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	draw: function(g) {
		if(this.isShape) g.beginFill(this.color);
		if(this.isLine) g.beginStroke(this.color,1);
		var i = 0;
		while(i < this.points.length) {
			var type = this.points[i][0];
			switch( (type)[1] ) {
			case 0:
				g.moveTo(this.points[i][1],this.points[i][2]);
				break;
			case 1:
				g.lineTo(this.points[i][1],this.points[i][2]);
				break;
			case 2:
				g.beginPath();
				break;
			case 3:
				g.closePath();
				break;
			case 4:
				g.beginStroke(this.points[i][1],this.points[i][2]);
				break;
			case 5:
				g.endStroke();
				break;
			case 6:
				g.beginFill(this.points[i][1]);
				break;
			case 7:
				g.endFill();
				break;
			case 8:
				g.quadraticCurveTo(this.points[i][1],this.points[i][2],this.points[i][3],this.points[i][4]);
				break;
			case 9:
				g.bezierCurveTo(this.points[i][1],this.points[i][2],this.points[i][3],this.points[i][4],this.points[i][5],this.points[i][6]);
				break;
			case 10:
				g.save();
				break;
			case 11:
				g.restore();
				break;
			case 12:
				g.fillRect(this.color,this.points[i][1],this.points[i][2],this.points[i][3],this.points[i][4]);
				break;
			case 13:
				g.arc(this.points[i][1],this.points[i][2],this.points[i][3],this.points[i][4],this.points[i][5]);
				break;
			}
			i++;
		}
		if(this.isShape) g.endFill();
		if(this.isLine) g.endStroke();
		if(!this.isPath && (this.isShape || this.isLine)) g.drawShapeSprite();
		if(this.graphics == null) this.graphics = g;
	}
	,__class__: flambe.display.ShapeSprite
});
flambe.display.Stage = function() { }
$hxClasses["flambe.display.Stage"] = flambe.display.Stage;
flambe.display.Stage.__name__ = ["flambe","display","Stage"];
flambe.display.Stage.prototype = {
	__class__: flambe.display.Stage
}
flambe.display.TextSprite = function(font,text) {
	if(text == null) text = "";
	this._height = 0;
	this._width = 0;
	this._text = null;
	this._font = null;
	this._offsets = null;
	this._glyphs = null;
	flambe.display.Sprite.call(this);
	this._font = font;
	this._text = text;
	this._flags = flambe.util.BitSets.add(this._flags,1 << 5);
};
$hxClasses["flambe.display.TextSprite"] = flambe.display.TextSprite;
flambe.display.TextSprite.__name__ = ["flambe","display","TextSprite"];
flambe.display.TextSprite.__super__ = flambe.display.Sprite;
flambe.display.TextSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	updateGlyphs: function() {
		if(flambe.util.BitSets.contains(this._flags,1 << 5)) {
			this._flags = flambe.util.BitSets.remove(this._flags,1 << 5);
			this._glyphs = this.get_font().getGlyphs(this.get_text());
			this._offsets = [0];
			this._width = 0;
			this._height = 0;
			var ii = 0;
			var ll = this._glyphs.length;
			while(ii < ll) {
				var glyph = this._glyphs[ii];
				++ii;
				if(ii == ll) this._width += glyph.width; else {
					var nextGlyph = this._glyphs[ii];
					this._width += glyph.xAdvance + glyph.getKerning(nextGlyph.charCode);
					this._offsets.push(this._width);
				}
				this._height = flambe.math.FMath.max(this._height,glyph.height + glyph.yOffset);
			}
		}
	}
	,set_font: function(font) {
		this._font = font;
		this._flags = flambe.util.BitSets.add(this._flags,1 << 5);
		return font;
	}
	,get_font: function() {
		return this._font;
	}
	,set_text: function(text) {
		this._text = text;
		this._flags = flambe.util.BitSets.add(this._flags,1 << 5);
		return text;
	}
	,get_text: function() {
		return this._text;
	}
	,getNaturalHeight: function() {
		this.updateGlyphs();
		return this._height;
	}
	,getNaturalWidth: function() {
		this.updateGlyphs();
		return this._width;
	}
	,draw: function(g) {
		this.updateGlyphs();
		var ii = 0;
		var ll = this._glyphs.length;
		while(ii < ll) {
			var glyph = this._glyphs[ii];
			var offset = this._offsets[ii];
			glyph.draw(g,offset,0);
			++ii;
		}
	}
	,__class__: flambe.display.TextSprite
});
flambe.display.Texture = function() { }
$hxClasses["flambe.display.Texture"] = flambe.display.Texture;
flambe.display.Texture.__name__ = ["flambe","display","Texture"];
flambe.display.Texture.prototype = {
	__class__: flambe.display.Texture
}
flambe.external = {}
flambe.external.External = function() { }
$hxClasses["flambe.external.External"] = flambe.external.External;
flambe.external.External.__name__ = ["flambe","external","External"];
flambe.external.External.prototype = {
	__class__: flambe.external.External
}
flambe.input = {}
flambe.input.Key = $hxClasses["flambe.input.Key"] = { __ename__ : ["flambe","input","Key"], __constructs__ : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Number0","Number1","Number2","Number3","Number4","Number5","Number6","Number7","Number8","Number9","Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","NumpadAdd","NumpadDecimal","NumpadDivide","NumpadEnter","NumpadMultiply","NumpadSubtract","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","Left","Up","Right","Down","Alt","Backquote","Backslash","Backspace","CapsLock","Comma","Command","Control","Delete","End","Enter","Equals","Escape","Home","Insert","LeftBracket","Minus","PageDown","PageUp","Period","Quote","RightBracket","Semicolon","Shift","Slash","Space","Tab","Menu","Search","Unknown"] }
flambe.input.Key.A = ["A",0];
flambe.input.Key.A.toString = $estr;
flambe.input.Key.A.__enum__ = flambe.input.Key;
flambe.input.Key.B = ["B",1];
flambe.input.Key.B.toString = $estr;
flambe.input.Key.B.__enum__ = flambe.input.Key;
flambe.input.Key.C = ["C",2];
flambe.input.Key.C.toString = $estr;
flambe.input.Key.C.__enum__ = flambe.input.Key;
flambe.input.Key.D = ["D",3];
flambe.input.Key.D.toString = $estr;
flambe.input.Key.D.__enum__ = flambe.input.Key;
flambe.input.Key.E = ["E",4];
flambe.input.Key.E.toString = $estr;
flambe.input.Key.E.__enum__ = flambe.input.Key;
flambe.input.Key.F = ["F",5];
flambe.input.Key.F.toString = $estr;
flambe.input.Key.F.__enum__ = flambe.input.Key;
flambe.input.Key.G = ["G",6];
flambe.input.Key.G.toString = $estr;
flambe.input.Key.G.__enum__ = flambe.input.Key;
flambe.input.Key.H = ["H",7];
flambe.input.Key.H.toString = $estr;
flambe.input.Key.H.__enum__ = flambe.input.Key;
flambe.input.Key.I = ["I",8];
flambe.input.Key.I.toString = $estr;
flambe.input.Key.I.__enum__ = flambe.input.Key;
flambe.input.Key.J = ["J",9];
flambe.input.Key.J.toString = $estr;
flambe.input.Key.J.__enum__ = flambe.input.Key;
flambe.input.Key.K = ["K",10];
flambe.input.Key.K.toString = $estr;
flambe.input.Key.K.__enum__ = flambe.input.Key;
flambe.input.Key.L = ["L",11];
flambe.input.Key.L.toString = $estr;
flambe.input.Key.L.__enum__ = flambe.input.Key;
flambe.input.Key.M = ["M",12];
flambe.input.Key.M.toString = $estr;
flambe.input.Key.M.__enum__ = flambe.input.Key;
flambe.input.Key.N = ["N",13];
flambe.input.Key.N.toString = $estr;
flambe.input.Key.N.__enum__ = flambe.input.Key;
flambe.input.Key.O = ["O",14];
flambe.input.Key.O.toString = $estr;
flambe.input.Key.O.__enum__ = flambe.input.Key;
flambe.input.Key.P = ["P",15];
flambe.input.Key.P.toString = $estr;
flambe.input.Key.P.__enum__ = flambe.input.Key;
flambe.input.Key.Q = ["Q",16];
flambe.input.Key.Q.toString = $estr;
flambe.input.Key.Q.__enum__ = flambe.input.Key;
flambe.input.Key.R = ["R",17];
flambe.input.Key.R.toString = $estr;
flambe.input.Key.R.__enum__ = flambe.input.Key;
flambe.input.Key.S = ["S",18];
flambe.input.Key.S.toString = $estr;
flambe.input.Key.S.__enum__ = flambe.input.Key;
flambe.input.Key.T = ["T",19];
flambe.input.Key.T.toString = $estr;
flambe.input.Key.T.__enum__ = flambe.input.Key;
flambe.input.Key.U = ["U",20];
flambe.input.Key.U.toString = $estr;
flambe.input.Key.U.__enum__ = flambe.input.Key;
flambe.input.Key.V = ["V",21];
flambe.input.Key.V.toString = $estr;
flambe.input.Key.V.__enum__ = flambe.input.Key;
flambe.input.Key.W = ["W",22];
flambe.input.Key.W.toString = $estr;
flambe.input.Key.W.__enum__ = flambe.input.Key;
flambe.input.Key.X = ["X",23];
flambe.input.Key.X.toString = $estr;
flambe.input.Key.X.__enum__ = flambe.input.Key;
flambe.input.Key.Y = ["Y",24];
flambe.input.Key.Y.toString = $estr;
flambe.input.Key.Y.__enum__ = flambe.input.Key;
flambe.input.Key.Z = ["Z",25];
flambe.input.Key.Z.toString = $estr;
flambe.input.Key.Z.__enum__ = flambe.input.Key;
flambe.input.Key.Number0 = ["Number0",26];
flambe.input.Key.Number0.toString = $estr;
flambe.input.Key.Number0.__enum__ = flambe.input.Key;
flambe.input.Key.Number1 = ["Number1",27];
flambe.input.Key.Number1.toString = $estr;
flambe.input.Key.Number1.__enum__ = flambe.input.Key;
flambe.input.Key.Number2 = ["Number2",28];
flambe.input.Key.Number2.toString = $estr;
flambe.input.Key.Number2.__enum__ = flambe.input.Key;
flambe.input.Key.Number3 = ["Number3",29];
flambe.input.Key.Number3.toString = $estr;
flambe.input.Key.Number3.__enum__ = flambe.input.Key;
flambe.input.Key.Number4 = ["Number4",30];
flambe.input.Key.Number4.toString = $estr;
flambe.input.Key.Number4.__enum__ = flambe.input.Key;
flambe.input.Key.Number5 = ["Number5",31];
flambe.input.Key.Number5.toString = $estr;
flambe.input.Key.Number5.__enum__ = flambe.input.Key;
flambe.input.Key.Number6 = ["Number6",32];
flambe.input.Key.Number6.toString = $estr;
flambe.input.Key.Number6.__enum__ = flambe.input.Key;
flambe.input.Key.Number7 = ["Number7",33];
flambe.input.Key.Number7.toString = $estr;
flambe.input.Key.Number7.__enum__ = flambe.input.Key;
flambe.input.Key.Number8 = ["Number8",34];
flambe.input.Key.Number8.toString = $estr;
flambe.input.Key.Number8.__enum__ = flambe.input.Key;
flambe.input.Key.Number9 = ["Number9",35];
flambe.input.Key.Number9.toString = $estr;
flambe.input.Key.Number9.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad0 = ["Numpad0",36];
flambe.input.Key.Numpad0.toString = $estr;
flambe.input.Key.Numpad0.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad1 = ["Numpad1",37];
flambe.input.Key.Numpad1.toString = $estr;
flambe.input.Key.Numpad1.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad2 = ["Numpad2",38];
flambe.input.Key.Numpad2.toString = $estr;
flambe.input.Key.Numpad2.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad3 = ["Numpad3",39];
flambe.input.Key.Numpad3.toString = $estr;
flambe.input.Key.Numpad3.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad4 = ["Numpad4",40];
flambe.input.Key.Numpad4.toString = $estr;
flambe.input.Key.Numpad4.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad5 = ["Numpad5",41];
flambe.input.Key.Numpad5.toString = $estr;
flambe.input.Key.Numpad5.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad6 = ["Numpad6",42];
flambe.input.Key.Numpad6.toString = $estr;
flambe.input.Key.Numpad6.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad7 = ["Numpad7",43];
flambe.input.Key.Numpad7.toString = $estr;
flambe.input.Key.Numpad7.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad8 = ["Numpad8",44];
flambe.input.Key.Numpad8.toString = $estr;
flambe.input.Key.Numpad8.__enum__ = flambe.input.Key;
flambe.input.Key.Numpad9 = ["Numpad9",45];
flambe.input.Key.Numpad9.toString = $estr;
flambe.input.Key.Numpad9.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadAdd = ["NumpadAdd",46];
flambe.input.Key.NumpadAdd.toString = $estr;
flambe.input.Key.NumpadAdd.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDecimal = ["NumpadDecimal",47];
flambe.input.Key.NumpadDecimal.toString = $estr;
flambe.input.Key.NumpadDecimal.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadDivide = ["NumpadDivide",48];
flambe.input.Key.NumpadDivide.toString = $estr;
flambe.input.Key.NumpadDivide.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadEnter = ["NumpadEnter",49];
flambe.input.Key.NumpadEnter.toString = $estr;
flambe.input.Key.NumpadEnter.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadMultiply = ["NumpadMultiply",50];
flambe.input.Key.NumpadMultiply.toString = $estr;
flambe.input.Key.NumpadMultiply.__enum__ = flambe.input.Key;
flambe.input.Key.NumpadSubtract = ["NumpadSubtract",51];
flambe.input.Key.NumpadSubtract.toString = $estr;
flambe.input.Key.NumpadSubtract.__enum__ = flambe.input.Key;
flambe.input.Key.F1 = ["F1",52];
flambe.input.Key.F1.toString = $estr;
flambe.input.Key.F1.__enum__ = flambe.input.Key;
flambe.input.Key.F2 = ["F2",53];
flambe.input.Key.F2.toString = $estr;
flambe.input.Key.F2.__enum__ = flambe.input.Key;
flambe.input.Key.F3 = ["F3",54];
flambe.input.Key.F3.toString = $estr;
flambe.input.Key.F3.__enum__ = flambe.input.Key;
flambe.input.Key.F4 = ["F4",55];
flambe.input.Key.F4.toString = $estr;
flambe.input.Key.F4.__enum__ = flambe.input.Key;
flambe.input.Key.F5 = ["F5",56];
flambe.input.Key.F5.toString = $estr;
flambe.input.Key.F5.__enum__ = flambe.input.Key;
flambe.input.Key.F6 = ["F6",57];
flambe.input.Key.F6.toString = $estr;
flambe.input.Key.F6.__enum__ = flambe.input.Key;
flambe.input.Key.F7 = ["F7",58];
flambe.input.Key.F7.toString = $estr;
flambe.input.Key.F7.__enum__ = flambe.input.Key;
flambe.input.Key.F8 = ["F8",59];
flambe.input.Key.F8.toString = $estr;
flambe.input.Key.F8.__enum__ = flambe.input.Key;
flambe.input.Key.F9 = ["F9",60];
flambe.input.Key.F9.toString = $estr;
flambe.input.Key.F9.__enum__ = flambe.input.Key;
flambe.input.Key.F10 = ["F10",61];
flambe.input.Key.F10.toString = $estr;
flambe.input.Key.F10.__enum__ = flambe.input.Key;
flambe.input.Key.F11 = ["F11",62];
flambe.input.Key.F11.toString = $estr;
flambe.input.Key.F11.__enum__ = flambe.input.Key;
flambe.input.Key.F12 = ["F12",63];
flambe.input.Key.F12.toString = $estr;
flambe.input.Key.F12.__enum__ = flambe.input.Key;
flambe.input.Key.F13 = ["F13",64];
flambe.input.Key.F13.toString = $estr;
flambe.input.Key.F13.__enum__ = flambe.input.Key;
flambe.input.Key.F14 = ["F14",65];
flambe.input.Key.F14.toString = $estr;
flambe.input.Key.F14.__enum__ = flambe.input.Key;
flambe.input.Key.F15 = ["F15",66];
flambe.input.Key.F15.toString = $estr;
flambe.input.Key.F15.__enum__ = flambe.input.Key;
flambe.input.Key.Left = ["Left",67];
flambe.input.Key.Left.toString = $estr;
flambe.input.Key.Left.__enum__ = flambe.input.Key;
flambe.input.Key.Up = ["Up",68];
flambe.input.Key.Up.toString = $estr;
flambe.input.Key.Up.__enum__ = flambe.input.Key;
flambe.input.Key.Right = ["Right",69];
flambe.input.Key.Right.toString = $estr;
flambe.input.Key.Right.__enum__ = flambe.input.Key;
flambe.input.Key.Down = ["Down",70];
flambe.input.Key.Down.toString = $estr;
flambe.input.Key.Down.__enum__ = flambe.input.Key;
flambe.input.Key.Alt = ["Alt",71];
flambe.input.Key.Alt.toString = $estr;
flambe.input.Key.Alt.__enum__ = flambe.input.Key;
flambe.input.Key.Backquote = ["Backquote",72];
flambe.input.Key.Backquote.toString = $estr;
flambe.input.Key.Backquote.__enum__ = flambe.input.Key;
flambe.input.Key.Backslash = ["Backslash",73];
flambe.input.Key.Backslash.toString = $estr;
flambe.input.Key.Backslash.__enum__ = flambe.input.Key;
flambe.input.Key.Backspace = ["Backspace",74];
flambe.input.Key.Backspace.toString = $estr;
flambe.input.Key.Backspace.__enum__ = flambe.input.Key;
flambe.input.Key.CapsLock = ["CapsLock",75];
flambe.input.Key.CapsLock.toString = $estr;
flambe.input.Key.CapsLock.__enum__ = flambe.input.Key;
flambe.input.Key.Comma = ["Comma",76];
flambe.input.Key.Comma.toString = $estr;
flambe.input.Key.Comma.__enum__ = flambe.input.Key;
flambe.input.Key.Command = ["Command",77];
flambe.input.Key.Command.toString = $estr;
flambe.input.Key.Command.__enum__ = flambe.input.Key;
flambe.input.Key.Control = ["Control",78];
flambe.input.Key.Control.toString = $estr;
flambe.input.Key.Control.__enum__ = flambe.input.Key;
flambe.input.Key.Delete = ["Delete",79];
flambe.input.Key.Delete.toString = $estr;
flambe.input.Key.Delete.__enum__ = flambe.input.Key;
flambe.input.Key.End = ["End",80];
flambe.input.Key.End.toString = $estr;
flambe.input.Key.End.__enum__ = flambe.input.Key;
flambe.input.Key.Enter = ["Enter",81];
flambe.input.Key.Enter.toString = $estr;
flambe.input.Key.Enter.__enum__ = flambe.input.Key;
flambe.input.Key.Equals = ["Equals",82];
flambe.input.Key.Equals.toString = $estr;
flambe.input.Key.Equals.__enum__ = flambe.input.Key;
flambe.input.Key.Escape = ["Escape",83];
flambe.input.Key.Escape.toString = $estr;
flambe.input.Key.Escape.__enum__ = flambe.input.Key;
flambe.input.Key.Home = ["Home",84];
flambe.input.Key.Home.toString = $estr;
flambe.input.Key.Home.__enum__ = flambe.input.Key;
flambe.input.Key.Insert = ["Insert",85];
flambe.input.Key.Insert.toString = $estr;
flambe.input.Key.Insert.__enum__ = flambe.input.Key;
flambe.input.Key.LeftBracket = ["LeftBracket",86];
flambe.input.Key.LeftBracket.toString = $estr;
flambe.input.Key.LeftBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Minus = ["Minus",87];
flambe.input.Key.Minus.toString = $estr;
flambe.input.Key.Minus.__enum__ = flambe.input.Key;
flambe.input.Key.PageDown = ["PageDown",88];
flambe.input.Key.PageDown.toString = $estr;
flambe.input.Key.PageDown.__enum__ = flambe.input.Key;
flambe.input.Key.PageUp = ["PageUp",89];
flambe.input.Key.PageUp.toString = $estr;
flambe.input.Key.PageUp.__enum__ = flambe.input.Key;
flambe.input.Key.Period = ["Period",90];
flambe.input.Key.Period.toString = $estr;
flambe.input.Key.Period.__enum__ = flambe.input.Key;
flambe.input.Key.Quote = ["Quote",91];
flambe.input.Key.Quote.toString = $estr;
flambe.input.Key.Quote.__enum__ = flambe.input.Key;
flambe.input.Key.RightBracket = ["RightBracket",92];
flambe.input.Key.RightBracket.toString = $estr;
flambe.input.Key.RightBracket.__enum__ = flambe.input.Key;
flambe.input.Key.Semicolon = ["Semicolon",93];
flambe.input.Key.Semicolon.toString = $estr;
flambe.input.Key.Semicolon.__enum__ = flambe.input.Key;
flambe.input.Key.Shift = ["Shift",94];
flambe.input.Key.Shift.toString = $estr;
flambe.input.Key.Shift.__enum__ = flambe.input.Key;
flambe.input.Key.Slash = ["Slash",95];
flambe.input.Key.Slash.toString = $estr;
flambe.input.Key.Slash.__enum__ = flambe.input.Key;
flambe.input.Key.Space = ["Space",96];
flambe.input.Key.Space.toString = $estr;
flambe.input.Key.Space.__enum__ = flambe.input.Key;
flambe.input.Key.Tab = ["Tab",97];
flambe.input.Key.Tab.toString = $estr;
flambe.input.Key.Tab.__enum__ = flambe.input.Key;
flambe.input.Key.Menu = ["Menu",98];
flambe.input.Key.Menu.toString = $estr;
flambe.input.Key.Menu.__enum__ = flambe.input.Key;
flambe.input.Key.Search = ["Search",99];
flambe.input.Key.Search.toString = $estr;
flambe.input.Key.Search.__enum__ = flambe.input.Key;
flambe.input.Key.Unknown = function(keyCode) { var $x = ["Unknown",100,keyCode]; $x.__enum__ = flambe.input.Key; $x.toString = $estr; return $x; }
flambe.input.Keyboard = function() { }
$hxClasses["flambe.input.Keyboard"] = flambe.input.Keyboard;
flambe.input.Keyboard.__name__ = ["flambe","input","Keyboard"];
flambe.input.Keyboard.prototype = {
	__class__: flambe.input.Keyboard
}
flambe.input.KeyboardEvent = function() {
	this._internal_init(0,null);
};
$hxClasses["flambe.input.KeyboardEvent"] = flambe.input.KeyboardEvent;
flambe.input.KeyboardEvent.__name__ = ["flambe","input","KeyboardEvent"];
flambe.input.KeyboardEvent.prototype = {
	_internal_init: function(id,key) {
		this.id = id;
		this.key = key;
	}
	,__class__: flambe.input.KeyboardEvent
}
flambe.input.Mouse = function() { }
$hxClasses["flambe.input.Mouse"] = flambe.input.Mouse;
flambe.input.Mouse.__name__ = ["flambe","input","Mouse"];
flambe.input.Mouse.prototype = {
	__class__: flambe.input.Mouse
}
flambe.input.MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : ["flambe","input","MouseButton"], __constructs__ : ["Left","Middle","Right","Unknown"] }
flambe.input.MouseButton.Left = ["Left",0];
flambe.input.MouseButton.Left.toString = $estr;
flambe.input.MouseButton.Left.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Middle = ["Middle",1];
flambe.input.MouseButton.Middle.toString = $estr;
flambe.input.MouseButton.Middle.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Right = ["Right",2];
flambe.input.MouseButton.Right.toString = $estr;
flambe.input.MouseButton.Right.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe.input.MouseButton; $x.toString = $estr; return $x; }
flambe.input.MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : ["flambe","input","MouseCursor"], __constructs__ : ["Default","Button","None"] }
flambe.input.MouseCursor.Default = ["Default",0];
flambe.input.MouseCursor.Default.toString = $estr;
flambe.input.MouseCursor.Default.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.Button = ["Button",1];
flambe.input.MouseCursor.Button.toString = $estr;
flambe.input.MouseCursor.Button.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.None = ["None",2];
flambe.input.MouseCursor.None.toString = $estr;
flambe.input.MouseCursor.None.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseEvent = function() {
	this._internal_init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe.input.MouseEvent;
flambe.input.MouseEvent.__name__ = ["flambe","input","MouseEvent"];
flambe.input.MouseEvent.prototype = {
	_internal_init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe.input.MouseEvent
}
flambe.input.Pointer = function() { }
$hxClasses["flambe.input.Pointer"] = flambe.input.Pointer;
flambe.input.Pointer.__name__ = ["flambe","input","Pointer"];
flambe.input.Pointer.prototype = {
	__class__: flambe.input.Pointer
}
flambe.input.EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : ["flambe","input","EventSource"], __constructs__ : ["Mouse","Touch"] }
flambe.input.EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.PointerEvent = function() {
	this._internal_init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe.input.PointerEvent;
flambe.input.PointerEvent.__name__ = ["flambe","input","PointerEvent"];
flambe.input.PointerEvent.prototype = {
	_internal_init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._internal_stopped = false;
	}
	,__class__: flambe.input.PointerEvent
}
flambe.input.Touch = function() { }
$hxClasses["flambe.input.Touch"] = flambe.input.Touch;
flambe.input.Touch.__name__ = ["flambe","input","Touch"];
flambe.input.Touch.prototype = {
	__class__: flambe.input.Touch
}
flambe.input.TouchPoint = function(id) {
	this.id = id;
	this._internal_source = flambe.input.EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe.input.TouchPoint;
flambe.input.TouchPoint.__name__ = ["flambe","input","TouchPoint"];
flambe.input.TouchPoint.prototype = {
	_internal_init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe.input.TouchPoint
}
flambe.math.FMath = function() { }
$hxClasses["flambe.math.FMath"] = flambe.math.FMath;
flambe.math.FMath.__name__ = ["flambe","math","FMath"];
flambe.math.FMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
}
flambe.math.FMath.max = function(a,b) {
	return a > b?a:b;
}
flambe.math.FMath.clamp = function(value,min,max) {
	return value < min?min:value > max?max:value;
}
flambe.math.Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe.math.Matrix;
flambe.math.Matrix.__name__ = ["flambe","math","Matrix"];
flambe.math.Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe.math.Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
}
flambe.math.Matrix.prototype = {
	toString: function() {
		return this.m00 + " " + this.m01 + " " + this.m02 + " \\ " + this.m10 + " " + this.m11 + " " + this.m12;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,transform: function(x,y,result) {
		if(result == null) result = new flambe.math.Point();
		result.x = x * this.m00 + y * this.m01 + this.m02;
		result.y = x * this.m10 + y * this.m11 + this.m12;
		return result;
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,__class__: flambe.math.Matrix
}
flambe.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe.math.Rectangle;
flambe.math.Rectangle.__name__ = ["flambe","math","Rectangle"];
flambe.math.Rectangle.prototype = {
	toString: function() {
		return "(" + this.x + "," + this.y + " " + this.width + "x" + this.height + ")";
	}
	,contains: function(x,y) {
		x -= this.x;
		y -= this.y;
		return x >= 0 && y >= 0 && x <= this.width && y <= this.height;
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: flambe.math.Rectangle
}
flambe.platform.BasicAssetPackLoader = function(platform,manifest) {
	this._platform = platform;
	this.promise = new flambe.util.Promise();
	this._bytesLoaded = new Hash();
	this._pack = new flambe.platform._BasicAssetPackLoader.BasicAssetPack(manifest);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var bytesTotal = 0;
		var groups = new Hash();
		var _g = 0;
		while(_g < entries.length) {
			var entry = entries[_g];
			++_g;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = groups.iterator();
		while( $it0.hasNext() ) {
			var group = $it0.next();
			var bestEntry = group.length > 1?this.pickBestEntry(group):group[0];
			var placeholder = this.createPlaceholder(bestEntry);
			if(placeholder != null) {
				flambe.Log.warn("Using an asset placeholder",["name",bestEntry.name,"type",bestEntry.type]);
				this.handleLoad(bestEntry,placeholder);
			} else {
				bytesTotal += bestEntry.bytes;
				var url = manifest.getFullURL(bestEntry);
				try {
					this.loadEntry(url,bestEntry);
				} catch( error ) {
					this.handleError(bestEntry,"Unexpected error: " + Std.string(error));
				}
			}
		}
		this.promise.set_total(bytesTotal);
	}
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe.platform.BasicAssetPackLoader;
flambe.platform.BasicAssetPackLoader.__name__ = ["flambe","platform","BasicAssetPackLoader"];
flambe.platform.BasicAssetPackLoader.prototype = {
	handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,handleError: function(entry,message) {
		flambe.Log.warn("Error loading asset pack",["error",message,"url",entry.url]);
		this.promise.error.emit(flambe.util.Strings.withFields(message,["url",entry.url]));
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = this._bytesLoaded.iterator();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleLoad: function(entry,asset) {
		this.handleProgress(entry,entry.bytes);
		var name = entry.name;
		switch( (entry.type)[1] ) {
		case 0:
			this._pack.textures.set(name,asset);
			break;
		case 1:
			this._pack.sounds.set(name,asset);
			break;
		case 2:
			this._pack.files.set(name,asset);
			break;
		}
		this._assetsRemaining -= 1;
		if(this._assetsRemaining <= 0) this.handleSuccess();
	}
	,getAudioFormats: function() {
		return [];
	}
	,loadEntry: function(url,entry) {
	}
	,createPlaceholder: function(entry) {
		switch( (entry.type)[1] ) {
		case 1:
			if(!Lambda.has(this.getAudioFormats(),entry.getUrlExtension())) return flambe.platform.DummySound.getInstance();
			break;
		default:
		}
		return null;
	}
	,pickBestEntry: function(entries) {
		switch( (entries[0].type)[1] ) {
		case 1:
			var extensions = this.getAudioFormats();
			var _g = 0;
			while(_g < extensions.length) {
				var extension = extensions[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.getUrlExtension() == extension) return entry;
				}
			}
			break;
		default:
		}
		return entries[0];
	}
	,__class__: flambe.platform.BasicAssetPackLoader
}
flambe.platform._BasicAssetPackLoader = {}
flambe.platform._BasicAssetPackLoader.BasicAssetPack = function(manifest) {
	this._manifest = manifest;
	this.textures = new Hash();
	this.sounds = new Hash();
	this.files = new Hash();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe.platform._BasicAssetPackLoader.BasicAssetPack;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe","platform","_BasicAssetPackLoader","BasicAssetPack"];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [flambe.asset.AssetPack];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension = function(path) {
	var ext = flambe.util.Strings.getFileExtension(path);
	if(ext != null && ext.length == 3) flambe.Log.warn("Requested asset \"" + path + "\" should not have a file extension," + " did you mean \"" + flambe.util.Strings.removeFileExtension(path) + "\"?");
}
flambe.platform._BasicAssetPackLoader.BasicAssetPack.prototype = {
	get_manifest: function() {
		return this._manifest;
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		var file = this.files.get(name);
		if(file == null && required) throw flambe.util.Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension(name);
		var sound = this.sounds.get(name);
		if(sound == null && required) throw flambe.util.Strings.withFields("Missing sound",["name",name]);
		return sound;
	}
	,getTexture: function(name,required) {
		if(required == null) required = true;
		flambe.platform._BasicAssetPackLoader.BasicAssetPack.warnOnExtension(name);
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe.util.Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,__class__: flambe.platform._BasicAssetPackLoader.BasicAssetPack
}
flambe.platform.BasicKeyboard = function() {
	this.down = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.backButton = new flambe.util.Signal0();
	this._keyStates = new IntHash();
};
$hxClasses["flambe.platform.BasicKeyboard"] = flambe.platform.BasicKeyboard;
flambe.platform.BasicKeyboard.__name__ = ["flambe","platform","BasicKeyboard"];
flambe.platform.BasicKeyboard.__interfaces__ = [flambe.input.Keyboard];
flambe.platform.BasicKeyboard.prototype = {
	submitUp: function(keyCode) {
		if(this.isCodeDown(keyCode)) {
			this._keyStates.remove(keyCode);
			flambe.platform.BasicKeyboard._sharedEvent._internal_init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.up.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
	}
	,submitDown: function(keyCode) {
		if(keyCode == 16777238) {
			if(this.backButton.hasListeners()) {
				this.backButton.emit();
				return true;
			}
			return false;
		}
		if(!this.isCodeDown(keyCode)) {
			this._keyStates.set(keyCode,true);
			flambe.platform.BasicKeyboard._sharedEvent._internal_init(flambe.platform.BasicKeyboard._sharedEvent.id + 1,flambe.platform.KeyCodes.toKey(keyCode));
			this.down.emit(flambe.platform.BasicKeyboard._sharedEvent);
		}
		return true;
	}
	,isCodeDown: function(keyCode) {
		return this._keyStates.exists(keyCode);
	}
	,isDown: function(key) {
		return this.isCodeDown(flambe.platform.KeyCodes.toKeyCode(key));
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.BasicKeyboard
}
flambe.platform.BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe.input.EventSource.Mouse(flambe.platform.BasicMouse._sharedEvent);
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.scroll = new flambe.util.Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe.input.MouseCursor.Default;
	this._buttonStates = new IntHash();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe.platform.BasicMouse;
flambe.platform.BasicMouse.__name__ = ["flambe","platform","BasicMouse"];
flambe.platform.BasicMouse.__interfaces__ = [flambe.input.Mouse];
flambe.platform.BasicMouse.prototype = {
	prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicMouse._sharedEvent._internal_init(flambe.platform.BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,isCodeDown: function(buttonCode) {
		return this._buttonStates.exists(buttonCode);
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!this.scroll.hasListeners()) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this.isCodeDown(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe.platform.BasicMouse._sharedEvent);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this.isCodeDown(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,isDown: function(button) {
		return this.isCodeDown(flambe.platform.MouseCodes.toButtonCode(button));
	}
	,set_cursor: function(cursor) {
		return this._cursor = cursor;
	}
	,get_cursor: function() {
		return this._cursor;
	}
	,get_y: function() {
		return this._y;
	}
	,get_x: function() {
		return this._x;
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.BasicMouse
}
flambe.platform.BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe.platform.BasicPointer;
flambe.platform.BasicPointer.__name__ = ["flambe","platform","BasicPointer"];
flambe.platform.BasicPointer.__interfaces__ = [flambe.input.Pointer];
flambe.platform.BasicPointer.prototype = {
	prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicPointer._sharedEvent._internal_init(flambe.platform.BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this._isDown = false;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = flambe.display.Sprite.getFrom(entity);
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._internal_pointerUp;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._internal_stopped) return;
			}
		}
		this.up.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = flambe.display.Sprite.getFrom(entity);
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._internal_pointerMove;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._internal_stopped) return;
			}
		}
		this.move.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this._isDown = true;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = flambe.display.Sprite.getFrom(entity);
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._internal_pointerDown;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._internal_stopped) return;
			}
		}
		this.down.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,isDown: function() {
		return this._isDown;
	}
	,get_y: function() {
		return this._y;
	}
	,get_x: function() {
		return this._x;
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.BasicPointer
}
flambe.platform.BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new IntHash();
	this._points = [];
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe.platform.BasicTouch;
flambe.platform.BasicTouch.__name__ = ["flambe","platform","BasicTouch"];
flambe.platform.BasicTouch.__interfaces__ = [flambe.input.Touch];
flambe.platform.BasicTouch.prototype = {
	submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point._internal_init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._internal_source);
			}
			this.up.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point._internal_init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._internal_source);
			this.move.emit(point);
		}
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe.input.TouchPoint(id);
			point._internal_init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._internal_source);
			}
			this.down.emit(point);
		}
	}
	,get_points: function() {
		return this._points.slice();
	}
	,get_maxPoints: function() {
		return this._maxPoints;
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.BasicTouch
}
flambe.sound.Sound = function() { }
$hxClasses["flambe.sound.Sound"] = flambe.sound.Sound;
flambe.sound.Sound.__name__ = ["flambe","sound","Sound"];
flambe.sound.Sound.prototype = {
	__class__: flambe.sound.Sound
}
flambe.platform.DummySound = function() {
	this._playback = new flambe.platform.DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe.platform.DummySound;
flambe.platform.DummySound.__name__ = ["flambe","platform","DummySound"];
flambe.platform.DummySound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.DummySound.getInstance = function() {
	if(flambe.platform.DummySound._instance == null) flambe.platform.DummySound._instance = new flambe.platform.DummySound();
	return flambe.platform.DummySound._instance;
}
flambe.platform.DummySound.prototype = {
	get_duration: function() {
		return 0;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,__class__: flambe.platform.DummySound
}
flambe.sound.Playback = function() { }
$hxClasses["flambe.sound.Playback"] = flambe.sound.Playback;
flambe.sound.Playback.__name__ = ["flambe","sound","Playback"];
flambe.sound.Playback.__interfaces__ = [flambe.util.Disposable];
flambe.sound.Playback.prototype = {
	__class__: flambe.sound.Playback
}
flambe.platform.DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe.animation.AnimatedFloat(0);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe.platform.DummyPlayback;
flambe.platform.DummyPlayback.__name__ = ["flambe","platform","DummyPlayback"];
flambe.platform.DummyPlayback.__interfaces__ = [flambe.sound.Playback];
flambe.platform.DummyPlayback.prototype = {
	dispose: function() {
	}
	,get_position: function() {
		return 0;
	}
	,get_ended: function() {
		return true;
	}
	,set_paused: function(paused) {
		return true;
	}
	,get_paused: function() {
		return true;
	}
	,get_sound: function() {
		return this._sound;
	}
	,__class__: flambe.platform.DummyPlayback
}
flambe.storage = {}
flambe.storage.Storage = function() { }
$hxClasses["flambe.storage.Storage"] = flambe.storage.Storage;
flambe.storage.Storage.__name__ = ["flambe","storage","Storage"];
flambe.storage.Storage.prototype = {
	__class__: flambe.storage.Storage
}
flambe.platform.DummyStorage = function() {
	this.clear();
};
$hxClasses["flambe.platform.DummyStorage"] = flambe.platform.DummyStorage;
flambe.platform.DummyStorage.__name__ = ["flambe","platform","DummyStorage"];
flambe.platform.DummyStorage.__interfaces__ = [flambe.storage.Storage];
flambe.platform.DummyStorage.prototype = {
	clear: function() {
		this._hash = new Hash();
	}
	,remove: function(key) {
		this._hash.remove(key);
	}
	,get: function(key,defaultValue) {
		return this._hash.exists(key)?this._hash.get(key):defaultValue;
	}
	,set: function(key,value) {
		this._hash.set(key,value);
		return true;
	}
	,get_supported: function() {
		return false;
	}
	,__class__: flambe.platform.DummyStorage
}
flambe.platform.DummyTouch = function() {
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe.platform.DummyTouch;
flambe.platform.DummyTouch.__name__ = ["flambe","platform","DummyTouch"];
flambe.platform.DummyTouch.__interfaces__ = [flambe.input.Touch];
flambe.platform.DummyTouch.prototype = {
	get_points: function() {
		return [];
	}
	,get_maxPoints: function() {
		return 0;
	}
	,get_supported: function() {
		return false;
	}
	,__class__: flambe.platform.DummyTouch
}
flambe.platform.EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe.platform.EventGroup;
flambe.platform.EventGroup.__name__ = ["flambe","platform","EventGroup"];
flambe.platform.EventGroup.__interfaces__ = [flambe.util.Disposable];
flambe.platform.EventGroup.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe.platform._EventGroup.Entry(dispatcher,type,listener));
	}
	,__class__: flambe.platform.EventGroup
}
flambe.platform._EventGroup = {}
flambe.platform._EventGroup.Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe.platform._EventGroup.Entry;
flambe.platform._EventGroup.Entry.__name__ = ["flambe","platform","_EventGroup","Entry"];
flambe.platform._EventGroup.Entry.prototype = {
	__class__: flambe.platform._EventGroup.Entry
}
flambe.platform.KeyCodes = function() { }
$hxClasses["flambe.platform.KeyCodes"] = flambe.platform.KeyCodes;
flambe.platform.KeyCodes.__name__ = ["flambe","platform","KeyCodes"];
flambe.platform.KeyCodes.toKey = function(keyCode) {
	switch(keyCode) {
	case 65:
		return flambe.input.Key.A;
	case 66:
		return flambe.input.Key.B;
	case 67:
		return flambe.input.Key.C;
	case 68:
		return flambe.input.Key.D;
	case 69:
		return flambe.input.Key.E;
	case 70:
		return flambe.input.Key.F;
	case 71:
		return flambe.input.Key.G;
	case 72:
		return flambe.input.Key.H;
	case 73:
		return flambe.input.Key.I;
	case 74:
		return flambe.input.Key.J;
	case 75:
		return flambe.input.Key.K;
	case 76:
		return flambe.input.Key.L;
	case 77:
		return flambe.input.Key.M;
	case 78:
		return flambe.input.Key.N;
	case 79:
		return flambe.input.Key.O;
	case 80:
		return flambe.input.Key.P;
	case 81:
		return flambe.input.Key.Q;
	case 82:
		return flambe.input.Key.R;
	case 83:
		return flambe.input.Key.S;
	case 84:
		return flambe.input.Key.T;
	case 85:
		return flambe.input.Key.U;
	case 86:
		return flambe.input.Key.V;
	case 87:
		return flambe.input.Key.W;
	case 88:
		return flambe.input.Key.X;
	case 89:
		return flambe.input.Key.Y;
	case 90:
		return flambe.input.Key.Z;
	case 48:
		return flambe.input.Key.Number0;
	case 49:
		return flambe.input.Key.Number1;
	case 50:
		return flambe.input.Key.Number2;
	case 51:
		return flambe.input.Key.Number3;
	case 52:
		return flambe.input.Key.Number4;
	case 53:
		return flambe.input.Key.Number5;
	case 54:
		return flambe.input.Key.Number6;
	case 55:
		return flambe.input.Key.Number7;
	case 56:
		return flambe.input.Key.Number8;
	case 57:
		return flambe.input.Key.Number9;
	case 96:
		return flambe.input.Key.Numpad0;
	case 97:
		return flambe.input.Key.Numpad1;
	case 98:
		return flambe.input.Key.Numpad2;
	case 99:
		return flambe.input.Key.Numpad3;
	case 100:
		return flambe.input.Key.Numpad4;
	case 101:
		return flambe.input.Key.Numpad5;
	case 102:
		return flambe.input.Key.Numpad6;
	case 103:
		return flambe.input.Key.Numpad7;
	case 104:
		return flambe.input.Key.Numpad8;
	case 105:
		return flambe.input.Key.Numpad9;
	case 107:
		return flambe.input.Key.NumpadAdd;
	case 110:
		return flambe.input.Key.NumpadDecimal;
	case 111:
		return flambe.input.Key.NumpadDivide;
	case 108:
		return flambe.input.Key.NumpadEnter;
	case 106:
		return flambe.input.Key.NumpadMultiply;
	case 109:
		return flambe.input.Key.NumpadSubtract;
	case 112:
		return flambe.input.Key.F1;
	case 113:
		return flambe.input.Key.F2;
	case 114:
		return flambe.input.Key.F3;
	case 115:
		return flambe.input.Key.F4;
	case 116:
		return flambe.input.Key.F5;
	case 117:
		return flambe.input.Key.F6;
	case 118:
		return flambe.input.Key.F7;
	case 119:
		return flambe.input.Key.F8;
	case 120:
		return flambe.input.Key.F9;
	case 121:
		return flambe.input.Key.F10;
	case 122:
		return flambe.input.Key.F11;
	case 123:
		return flambe.input.Key.F12;
	case 37:
		return flambe.input.Key.Left;
	case 38:
		return flambe.input.Key.Up;
	case 39:
		return flambe.input.Key.Right;
	case 40:
		return flambe.input.Key.Down;
	case 18:
		return flambe.input.Key.Alt;
	case 192:
		return flambe.input.Key.Backquote;
	case 220:
		return flambe.input.Key.Backslash;
	case 8:
		return flambe.input.Key.Backspace;
	case 20:
		return flambe.input.Key.CapsLock;
	case 188:
		return flambe.input.Key.Comma;
	case 15:
		return flambe.input.Key.Command;
	case 17:
		return flambe.input.Key.Control;
	case 46:
		return flambe.input.Key.Delete;
	case 35:
		return flambe.input.Key.End;
	case 13:
		return flambe.input.Key.Enter;
	case 187:
		return flambe.input.Key.Equals;
	case 27:
		return flambe.input.Key.Escape;
	case 36:
		return flambe.input.Key.Home;
	case 45:
		return flambe.input.Key.Insert;
	case 219:
		return flambe.input.Key.LeftBracket;
	case 189:
		return flambe.input.Key.Minus;
	case 34:
		return flambe.input.Key.PageDown;
	case 33:
		return flambe.input.Key.PageUp;
	case 190:
		return flambe.input.Key.Period;
	case 222:
		return flambe.input.Key.Quote;
	case 221:
		return flambe.input.Key.RightBracket;
	case 186:
		return flambe.input.Key.Semicolon;
	case 16:
		return flambe.input.Key.Shift;
	case 191:
		return flambe.input.Key.Slash;
	case 32:
		return flambe.input.Key.Space;
	case 9:
		return flambe.input.Key.Tab;
	case 16777234:
		return flambe.input.Key.Menu;
	case 16777247:
		return flambe.input.Key.Search;
	}
	return flambe.input.Key.Unknown(keyCode);
}
flambe.platform.KeyCodes.toKeyCode = function(key) {
	var $e = (key);
	switch( $e[1] ) {
	case 0:
		return 65;
	case 1:
		return 66;
	case 2:
		return 67;
	case 3:
		return 68;
	case 4:
		return 69;
	case 5:
		return 70;
	case 6:
		return 71;
	case 7:
		return 72;
	case 8:
		return 73;
	case 9:
		return 74;
	case 10:
		return 75;
	case 11:
		return 76;
	case 12:
		return 77;
	case 13:
		return 78;
	case 14:
		return 79;
	case 15:
		return 80;
	case 16:
		return 81;
	case 17:
		return 82;
	case 18:
		return 83;
	case 19:
		return 84;
	case 20:
		return 85;
	case 21:
		return 86;
	case 22:
		return 87;
	case 23:
		return 88;
	case 24:
		return 89;
	case 25:
		return 90;
	case 26:
		return 48;
	case 27:
		return 49;
	case 28:
		return 50;
	case 29:
		return 51;
	case 30:
		return 52;
	case 31:
		return 53;
	case 32:
		return 54;
	case 33:
		return 55;
	case 34:
		return 56;
	case 35:
		return 57;
	case 36:
		return 96;
	case 37:
		return 97;
	case 38:
		return 98;
	case 39:
		return 99;
	case 40:
		return 100;
	case 41:
		return 101;
	case 42:
		return 102;
	case 43:
		return 103;
	case 44:
		return 104;
	case 45:
		return 105;
	case 46:
		return 107;
	case 47:
		return 110;
	case 48:
		return 111;
	case 49:
		return 108;
	case 50:
		return 106;
	case 51:
		return 109;
	case 52:
		return 112;
	case 53:
		return 113;
	case 54:
		return 114;
	case 55:
		return 115;
	case 56:
		return 116;
	case 57:
		return 117;
	case 58:
		return 118;
	case 59:
		return 119;
	case 60:
		return 120;
	case 61:
		return 121;
	case 62:
		return 122;
	case 63:
		return 123;
	case 64:
		return 124;
	case 65:
		return 125;
	case 66:
		return 126;
	case 67:
		return 37;
	case 68:
		return 38;
	case 69:
		return 39;
	case 70:
		return 40;
	case 71:
		return 18;
	case 72:
		return 192;
	case 73:
		return 220;
	case 74:
		return 8;
	case 75:
		return 20;
	case 76:
		return 188;
	case 77:
		return 15;
	case 78:
		return 17;
	case 79:
		return 46;
	case 80:
		return 35;
	case 81:
		return 13;
	case 82:
		return 187;
	case 83:
		return 27;
	case 84:
		return 36;
	case 85:
		return 45;
	case 86:
		return 219;
	case 87:
		return 189;
	case 88:
		return 34;
	case 89:
		return 33;
	case 90:
		return 190;
	case 91:
		return 222;
	case 92:
		return 221;
	case 93:
		return 186;
	case 94:
		return 16;
	case 95:
		return 191;
	case 96:
		return 32;
	case 97:
		return 9;
	case 98:
		return 16777234;
	case 99:
		return 16777247;
	case 100:
		var keyCode = $e[2];
		return keyCode;
	}
}
flambe.platform.MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe.platform.MainLoop;
flambe.platform.MainLoop.__name__ = ["flambe","platform","MainLoop"];
flambe.platform.MainLoop.updateEntity = function(entity,dt) {
	var speed = flambe.SpeedAdjuster.getFrom(entity);
	if(speed != null) {
		speed._internal_realDt = dt;
		dt *= speed.scale.get__();
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next = p1.next;
		flambe.platform.MainLoop.updateEntity(p1,dt);
		p1 = next;
	}
}
flambe.platform.MainLoop.prototype = {
	addTickable: function(t) {
		this._tickables.push(t);
	}
	,render: function(renderer) {
		var graphics = renderer.willRender();
		if(graphics != null) {
			flambe.display.Sprite.render(flambe.System.root,graphics);
			renderer.didRender();
		}
	}
	,update: function(dt) {
		if(dt <= 0) {
			flambe.Log.warn("Zero or negative time elapsed since the last frame!",["dt",dt]);
			return;
		}
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe.platform.MainLoop.updateEntity(flambe.System.root,dt);
	}
	,__class__: flambe.platform.MainLoop
}
flambe.platform.ManifestBuilder = function() { }
$hxClasses["flambe.platform.ManifestBuilder"] = flambe.platform.ManifestBuilder;
flambe.platform.ManifestBuilder.__name__ = ["flambe","platform","ManifestBuilder"];
flambe.platform.MouseCodes = function() { }
$hxClasses["flambe.platform.MouseCodes"] = flambe.platform.MouseCodes;
flambe.platform.MouseCodes.__name__ = ["flambe","platform","MouseCodes"];
flambe.platform.MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe.input.MouseButton.Left;
	case 1:
		return flambe.input.MouseButton.Middle;
	case 2:
		return flambe.input.MouseButton.Right;
	}
	return flambe.input.MouseButton.Unknown(buttonCode);
}
flambe.platform.MouseCodes.toButtonCode = function(button) {
	var $e = (button);
	switch( $e[1] ) {
	case 0:
		return 0;
	case 1:
		return 1;
	case 2:
		return 2;
	case 3:
		var buttonCode = $e[2];
		return buttonCode;
	}
}
flambe.platform.Renderer = function() { }
$hxClasses["flambe.platform.Renderer"] = flambe.platform.Renderer;
flambe.platform.Renderer.__name__ = ["flambe","platform","Renderer"];
flambe.platform.Renderer.prototype = {
	__class__: flambe.platform.Renderer
}
flambe.platform.Tickable = function() { }
$hxClasses["flambe.platform.Tickable"] = flambe.platform.Tickable;
flambe.platform.Tickable.__name__ = ["flambe","platform","Tickable"];
flambe.platform.Tickable.prototype = {
	__class__: flambe.platform.Tickable
}
flambe.platform.html.CanvasGraphics = function(canvas) {
	this._drawToTemp = false;
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d");
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe.platform.html.CanvasGraphics;
flambe.platform.html.CanvasGraphics.__name__ = ["flambe","platform","html","CanvasGraphics"];
flambe.platform.html.CanvasGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.html.CanvasGraphics.prototype = {
	erase: function() {
		this._canvasCtx.clearRect(0,0,this._canvasCtx.canvas.width,this._canvasCtx.canvas.height);
	}
	,clip2: function(shape,image) {
		this._tempGraphics.erase();
		this._tempGraphics.save();
		var matrix = image.getLocalMatrix();
		this._tempGraphics.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,matrix.m02,matrix.m12);
		this._tempGraphics.setAlpha(image.alpha.get__());
		if(Std["is"](image,flambe.display.MaskSprite)) {
			var mask = js.Boot.__cast(image , flambe.display.MaskSprite);
			if(Std["is"](mask.shape,flambe.display.FillSprite)) this.tint(mask.shape,mask.image,false);
		} else image.draw(this._tempGraphics);
		this._tempGraphics.restore();
		this._tempGraphics.save();
		this._tempGraphics.setGlobalComposite("destination-in");
		matrix = shape.getLocalMatrix();
		this._tempGraphics.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,matrix.m02,matrix.m12);
		this._tempGraphics.setAlpha(shape.alpha.get__());
		shape.draw(this._tempGraphics);
		this._tempGraphics.setGlobalComposite("source-over");
		this.setGlobalComposite("source-over");
		this._canvasCtx.drawImage(this._tempCanvas,0,0);
		this._tempGraphics.restore();
		matrix = null;
	}
	,clip: function(shape,image) {
		this.save();
		var matrix = shape.getLocalMatrix();
		this.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,matrix.m02,matrix.m12);
		shape.draw(this);
		this.restore();
		this.save();
		this._canvasCtx.clip();
		matrix = image.getLocalMatrix();
		this.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,matrix.m02,matrix.m12);
		image.draw(this);
		this.restore();
		matrix = null;
	}
	,tint: function(shape,image,addToScreen) {
		if(addToScreen == null) addToScreen = true;
		if(addToScreen) this._tempGraphics.erase();
		this._tempGraphics.setAlpha(shape.alpha.get__());
		shape.draw(this._tempGraphics);
		this._tempGraphics.setGlobalComposite("destination-atop");
		this._tempGraphics.setAlpha(image.alpha.get__());
		image.draw(this._tempGraphics);
		this._tempGraphics.setGlobalComposite("source-over");
		this.setGlobalComposite("source-over");
		if(addToScreen) this._canvasCtx.drawImage(this._tempCanvas,0,0);
	}
	,mask: function(shape,image) {
		if(Std["is"](shape,flambe.display.FillSprite)) this.tint(shape,image); else if(Std["is"](shape,flambe.display.ShapeSprite)) this.clip(shape,image); else this.clip2(shape,image);
	}
	,arc: function(x,y,radius,startAngle,endAngle) {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).arc(x,y,radius,startAngle,endAngle);
	}
	,isPointInPath: function(x,y) {
		return this._canvasCtx.isPointInPath(x,y);
	}
	,bezierCurveTo: function(controlX1,controlY1,controlX2,controlY2,endX,endY) {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).bezierCurveTo(controlX1,controlY1,controlX2,controlY2,endX,endY);
	}
	,quadraticCurveTo: function(controlX,controlY,endX,endY) {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).quadraticCurveTo(controlX,controlY,endX,endY);
	}
	,drawShapeSprite: function() {
		this._canvasCtx.drawImage(this._tempCanvas,0,0);
		this._tempGraphics.erase();
	}
	,endFill: function() {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).fill();
		this._drawToTemp = false;
	}
	,beginFill: function(color) {
		this._drawToTemp = true;
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).fillStyle = "#" + ("00000" + color.toString(16)).slice(-6);
	}
	,endStroke: function() {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).stroke();
		this._drawToTemp = false;
	}
	,beginStroke: function(color,width) {
		this._drawToTemp = true;
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).strokeStyle = "#" + ("00000" + color.toString(16)).slice(-6);
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).lineWidth = width;
	}
	,closePath: function() {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).closePath();
	}
	,beginPath: function() {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).beginPath();
	}
	,lineTo: function(x,y) {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).lineTo(x,y);
	}
	,moveTo: function(x,y) {
		(this._drawToTemp?this._tempGraphics._canvasCtx:this._canvasCtx).moveTo(x,y);
	}
	,toDataURL: function() {
		return this._canvasCtx.canvas.toDataURL("image/png");
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
		this._canvasCtx.clip();
	}
	,setGlobalComposite: function(gco) {
		this._canvasCtx.globalCompositeOperation = gco;
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch( (blendMode)[1] ) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "source-over";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,setAlpha: function(alpha) {
		this._canvasCtx.globalAlpha = alpha;
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		this._canvasCtx.fillStyle = "#" + ("00000" + color.toString(16)).slice(-6);
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,drawPattern: function(texture,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawPattern(texture,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		if(texture1.pattern == null) texture1.pattern = this._canvasCtx.createPattern(texture1.image,"repeat");
		this._canvasCtx.fillStyle = texture1.pattern;
		this._canvasCtx.fillRect(Std["int"](x),Std["int"](y),Std["int"](width),Std["int"](height));
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubImage(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,Std["int"](sourceX),Std["int"](sourceY),Std["int"](sourceW),Std["int"](sourceH),Std["int"](destX),Std["int"](destY),Std["int"](sourceW),Std["int"](sourceH));
	}
	,drawImage: function(texture,x,y) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawImage(texture,x,y);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,Std["int"](x),Std["int"](y));
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,Std["int"](m02),Std["int"](m12));
	}
	,rotate: function(rotation) {
		this._canvasCtx.rotate(flambe.math.FMath.toRadians(rotation));
	}
	,scale: function(x,y) {
		this._canvasCtx.scale(x,y);
	}
	,translate: function(x,y) {
		this._canvasCtx.translate(Std["int"](x),Std["int"](y));
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,clear: function() {
		this._canvasCtx.fillStyle = "#ffffff";
		this._canvasCtx.fillRect(0,0,this._canvasCtx.canvas.width,this._canvasCtx.canvas.height);
	}
	,getTemp: function() {
		this._tempCanvas = flambe.platform.html.HtmlPlatform.instance.getTempCanvas();
		this._tempGraphics = flambe.platform.html.HtmlPlatform.instance.getTempGraphics();
	}
	,__class__: flambe.platform.html.CanvasGraphics
}
flambe.platform.html.CanvasRenderer = function(canvas) {
	this._drawCtx = new flambe.platform.html.CanvasGraphics(canvas);
	this._drawCtx.clear();
	this._drawCtx.getTemp();
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe.platform.html.CanvasRenderer;
flambe.platform.html.CanvasRenderer.__name__ = ["flambe","platform","html","CanvasRenderer"];
flambe.platform.html.CanvasRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.CanvasRenderer.prototype = {
	inspectNextFrame: function() {
		this._inspector = new flambe.platform.html.InspectorGraphics(this._drawCtx);
	}
	,didRender: function() {
		if(this._inspector != null) {
			this._inspector.show();
			this._inspector = null;
		}
	}
	,willRender: function() {
		this._drawCtx.willRender();
		return this._inspector != null?this._inspector:this._drawCtx;
	}
	,createEmptyTexture: function(width,height) {
		var canvas = js.Lib.document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return new flambe.platform.html.CanvasTexture(canvas);
	}
	,createTexture: function(image) {
		return new flambe.platform.html.CanvasTexture(flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES?flambe.platform.html.HtmlUtil.createCanvas(image):image);
	}
	,__class__: flambe.platform.html.CanvasRenderer
}
flambe.platform.html.CanvasTexture = function(image) {
	this._graphics = null;
	this.image = image;
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe.platform.html.CanvasTexture;
flambe.platform.html.CanvasTexture.__name__ = ["flambe","platform","html","CanvasTexture"];
flambe.platform.html.CanvasTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.CanvasTexture.prototype = {
	getContext2d: function() {
		if(!Std["is"](this.image,HTMLCanvasElement)) this.image = flambe.platform.html.HtmlUtil.createCanvas(this.image);
		return this.image.getContext("2d");
	}
	,get_graphics: function() {
		if(this._graphics == null) {
			this.getContext2d();
			this._graphics = new flambe.platform.html._CanvasTexture.InternalGraphics(this);
		}
		return this._graphics;
	}
	,get_height: function() {
		return this.image.height;
	}
	,get_width: function() {
		return this.image.width;
	}
	,dirtyContents: function() {
		this.pattern = null;
	}
	,writePixels: function(pixels,x,y,sourceW,sourceH) {
		var ctx2d = this.getContext2d();
		var imageData = ctx2d.createImageData(sourceW,sourceH);
		var data = imageData.data;
		if(data.set != null) data.set(pixels.getData()); else {
			var size = 4 * sourceW * sourceH;
			var _g = 0;
			while(_g < size) {
				var ii = _g++;
				data[ii] = pixels.get(ii);
			}
		}
		ctx2d.putImageData(imageData,x,y);
		this.dirtyContents();
	}
	,readPixels: function(x,y,width,height) {
		return haxe.io.Bytes.ofData(this.getContext2d().getImageData(x,y,width,height).data);
	}
	,__class__: flambe.platform.html.CanvasTexture
}
flambe.platform.html._CanvasTexture = {}
flambe.platform.html._CanvasTexture.InternalGraphics = function(renderTarget) {
	flambe.platform.html.CanvasGraphics.call(this,renderTarget.image);
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html._CanvasTexture.InternalGraphics"] = flambe.platform.html._CanvasTexture.InternalGraphics;
flambe.platform.html._CanvasTexture.InternalGraphics.__name__ = ["flambe","platform","html","_CanvasTexture","InternalGraphics"];
flambe.platform.html._CanvasTexture.InternalGraphics.__super__ = flambe.platform.html.CanvasGraphics;
flambe.platform.html._CanvasTexture.InternalGraphics.prototype = $extend(flambe.platform.html.CanvasGraphics.prototype,{
	fillRect: function(color,x,y,width,height) {
		flambe.platform.html.CanvasGraphics.prototype.fillRect.call(this,color,x,y,width,height);
		this._renderTarget.dirtyContents();
	}
	,drawPattern: function(texture,x,y,width,height) {
		flambe.platform.html.CanvasGraphics.prototype.drawPattern.call(this,texture,x,y,width,height);
		this._renderTarget.dirtyContents();
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		flambe.platform.html.CanvasGraphics.prototype.drawSubImage.call(this,texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
		this._renderTarget.dirtyContents();
	}
	,drawImage: function(texture,x,y) {
		flambe.platform.html.CanvasGraphics.prototype.drawImage.call(this,texture,x,y);
		this._renderTarget.dirtyContents();
	}
	,__class__: flambe.platform.html._CanvasTexture.InternalGraphics
});
flambe.platform.html.HtmlAssetPackLoader = function(platform,manifest) {
	flambe.platform.BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe.platform.html.HtmlAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.__name__ = ["flambe","platform","html","HtmlAssetPackLoader"];
flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats = function() {
	var element = js.Lib.document.createElement("audio");
	if(element == null || element.canPlayType == null) return [];
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android)\\b","");
	if(!flambe.platform.html.WebAudioSound.get_supported() && blacklist.match(js.Lib.window.navigator.userAgent)) return [];
	var formats = [{ extension : "m4a", type : "audio/mp4; codecs=mp4a"},{ extension : "mp3", type : "audio/mpeg"},{ extension : "ogg", type : "audio/ogg; codecs=vorbis"},{ extension : "wav", type : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < formats.length) {
		var format = formats[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = element.canPlayType(format.type);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(format.extension);
	}
	return result;
}
flambe.platform.html.HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport) {
		flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = false;
		try {
			var xhr = new XMLHttpRequest();
			xhr.responseType = "blob";
		} catch( _ ) {
			return false;
		}
		flambe.platform.html.HtmlAssetPackLoader._URL = flambe.platform.html.HtmlUtil.loadExtension("URL").value;
	}
	return flambe.platform.html.HtmlAssetPackLoader._URL != null && flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL != null;
}
flambe.platform.html.HtmlAssetPackLoader.__super__ = flambe.platform.BasicAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.prototype = $extend(flambe.platform.BasicAssetPackLoader.prototype,{
	handleLoad: function(entry,asset) {
		this.handleProgress(entry,entry.bytes);
		flambe.platform.BasicAssetPackLoader.prototype.handleLoad.call(this,entry,asset);
	}
	,sendRequest: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = new XMLHttpRequest();
		var lastActivity = 0.0;
		var start = function() {
			lastActivity = flambe.platform.html.HtmlUtil.now();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			if(xhr.responseType == "") xhr.responseType = "arraybuffer";
			xhr.send();
		};
		var interval = 0;
		if(typeof(xhr.onprogress) != "undefined") {
			var attempts = 4;
			xhr.onprogress = function(event) {
				lastActivity = flambe.platform.html.HtmlUtil.now();
				_g.handleProgress(entry,event.loaded);
			};
			interval = js.Lib.window.setInterval(function() {
				if(xhr.readyState >= 1 && flambe.platform.html.HtmlUtil.now() - lastActivity > 5000) {
					xhr.abort();
					--attempts;
					if(attempts > 0) start(); else {
						js.Lib.window.clearInterval(interval);
						_g.handleError(entry,"Failed to load asset: timeout");
					}
				}
			},1000);
		}
		xhr.onload = function(_) {
			js.Lib.window.clearInterval(interval);
			var response = xhr.response;
			if(response == null) response = xhr.responseText; else if(responseType == "blob" && xhr.responseType == "arraybuffer") response = new Blob([xhr.response]);
			onLoad(response);
		};
		xhr.onerror = function(_) {
			js.Lib.window.clearInterval(interval);
			_g.handleError(entry,"Failed to load asset: error #" + Std.string(xhr.status));
		};
		start();
		return xhr;
	}
	,getAudioFormats: function() {
		if(flambe.platform.html.HtmlAssetPackLoader._audioFormats == null) flambe.platform.html.HtmlAssetPackLoader._audioFormats = flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats();
		return flambe.platform.html.HtmlAssetPackLoader._audioFormats;
	}
	,loadEntry: function(url,entry) {
		var _g = this;
		switch( (entry.type)[1] ) {
		case 0:
			var image = new Image();
			var events = new flambe.platform.EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(image.width > 1024 || image.height > 1024) flambe.Log.warn("Images larger than 1024px on a side will prevent GPU acceleration" + " on some platforms (iOS)",["url",url,"width",image.width,"height",image.height]);
				if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) flambe.platform.html.HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g._platform.getRenderer().createTexture(image);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_) {
				_g.handleError(entry,"Failed to load image");
			});
			if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) this.sendRequest(url,entry,"blob",function(blob) {
				image.src = flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 1:
			if(flambe.platform.html.WebAudioSound.get_supported()) this.sendRequest(url,entry,"arraybuffer",function(buffer) {
				flambe.platform.html.WebAudioSound.ctx.decodeAudioData(buffer,function(decoded) {
					_g.handleLoad(entry,new flambe.platform.html.WebAudioSound(decoded));
				},function() {
					flambe.Log.warn("Couldn't decode Web Audio, ignoring this asset",["url",url]);
					_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
				});
			}); else {
				var audio = js.Lib.document.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe.platform.html.HtmlAssetPackLoader._mediaRefCount;
				if(flambe.platform.html.HtmlAssetPackLoader._mediaElements == null) flambe.platform.html.HtmlAssetPackLoader._mediaElements = new IntHash();
				flambe.platform.html.HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events = new flambe.platform.EventGroup();
				events.addDisposingListener(audio,"canplaythrough",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					_g.handleLoad(entry,new flambe.platform.html.HtmlSound(audio));
				});
				events.addDisposingListener(audio,"error",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) {
						flambe.Log.warn("Couldn't decode HTML5 audio, ignoring this asset",["url",url,"code",code]);
						_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
					} else _g.handleError(entry,"Failed to load audio: " + Std.string(audio.error.code));
				});
				events.addListener(audio,"progress",function(_) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g.handleProgress(entry,Std["int"](progress * entry.bytes));
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 2:
			this.sendRequest(url,entry,"text",function(text) {
				_g.handleLoad(entry,text);
			});
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlAssetPackLoader
});
flambe.platform.html.HtmlExternal = function() {
};
$hxClasses["flambe.platform.html.HtmlExternal"] = flambe.platform.html.HtmlExternal;
flambe.platform.html.HtmlExternal.__name__ = ["flambe","platform","html","HtmlExternal"];
flambe.platform.html.HtmlExternal.__interfaces__ = [flambe.external.External];
flambe.platform.html.HtmlExternal.prototype = {
	bind: function(name,fn) {
		Reflect.setField(js.Lib.window,name,fn);
	}
	,call: function(name,params) {
		if(params == null) params = [];
		var method = Reflect.field(js.Lib.window,name);
		return Reflect.callMethod(null,method,params);
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.html.HtmlExternal
}
flambe.util.LogHandler = function() { }
$hxClasses["flambe.util.LogHandler"] = flambe.util.LogHandler;
flambe.util.LogHandler.__name__ = ["flambe","util","LogHandler"];
flambe.util.LogHandler.prototype = {
	__class__: flambe.util.LogHandler
}
flambe.platform.html.HtmlLogHandler = function(tag) {
	this._tagPrefix = tag + ": ";
};
$hxClasses["flambe.platform.html.HtmlLogHandler"] = flambe.platform.html.HtmlLogHandler;
flambe.platform.html.HtmlLogHandler.__name__ = ["flambe","platform","html","HtmlLogHandler"];
flambe.platform.html.HtmlLogHandler.__interfaces__ = [flambe.util.LogHandler];
flambe.platform.html.HtmlLogHandler.isSupported = function() {
	return typeof console == "object" && console.info != null;
}
flambe.platform.html.HtmlLogHandler.prototype = {
	log: function(level,message) {
		message = this._tagPrefix + message;
		switch( (level)[1] ) {
		case 0:
			console.info(message);
			break;
		case 1:
			console.warn(message);
			break;
		case 2:
			console.error(message);
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlLogHandler
}
flambe.platform.html.HtmlMouse = function(pointer,canvas) {
	flambe.platform.BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe.platform.html.HtmlMouse;
flambe.platform.html.HtmlMouse.__name__ = ["flambe","platform","html","HtmlMouse"];
flambe.platform.html.HtmlMouse.__super__ = flambe.platform.BasicMouse;
flambe.platform.html.HtmlMouse.prototype = $extend(flambe.platform.BasicMouse.prototype,{
	set_cursor: function(cursor) {
		var name;
		switch( (cursor)[1] ) {
		case 0:
			name = "";
			break;
		case 1:
			name = "pointer";
			break;
		case 2:
			name = "none";
			break;
		}
		this._canvas.style.cursor = name;
		return flambe.platform.BasicMouse.prototype.set_cursor.call(this,cursor);
	}
	,__class__: flambe.platform.html.HtmlMouse
});
flambe.platform.html.HtmlSound = function(audioElement) {
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe.platform.html.HtmlSound;
flambe.platform.html.HtmlSound.__name__ = ["flambe","platform","html","HtmlSound"];
flambe.platform.html.HtmlSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.HtmlSound.prototype = {
	get_duration: function() {
		return this.audioElement.duration;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.HtmlSound
}
flambe.platform.html._HtmlSound = {}
flambe.platform.html._HtmlSound.HtmlPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._tickableAdded = false;
	this.volume = new flambe.animation.AnimatedFloat(volume,function(v,_) {
		_g._clonedElement.volume = v;
	});
	this._clonedElement = js.Lib.document.createElement("audio");
	this._clonedElement.volume = volume;
	this._clonedElement.loop = loop;
	this._clonedElement.src = sound.audioElement.src;
	this.playAudio();
};
$hxClasses["flambe.platform.html._HtmlSound.HtmlPlayback"] = flambe.platform.html._HtmlSound.HtmlPlayback;
flambe.platform.html._HtmlSound.HtmlPlayback.__name__ = ["flambe","platform","html","_HtmlSound","HtmlPlayback"];
flambe.platform.html._HtmlSound.HtmlPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._HtmlSound.HtmlPlayback.prototype = {
	playAudio: function() {
		this._clonedElement.play();
		if(!this._tickableAdded) {
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
		}
	}
	,dispose: function() {
		this.set_paused(true);
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this.get_paused()) {
			this._tickableAdded = false;
			return true;
		}
		return false;
	}
	,get_position: function() {
		return this._clonedElement.currentTime;
	}
	,get_ended: function() {
		return this._clonedElement.ended;
	}
	,set_paused: function(paused) {
		if(this._clonedElement.paused != paused) {
			if(paused) this._clonedElement.pause(); else this.playAudio();
		}
		return paused;
	}
	,get_paused: function() {
		return this._clonedElement.paused;
	}
	,get_sound: function() {
		return this._sound;
	}
	,__class__: flambe.platform.html._HtmlSound.HtmlPlayback
}
flambe.platform.html.HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe.util.Signal0();
	this.scaleFactor = flambe.platform.html.HtmlStage.computeScaleFactor(canvas);
	if(this.scaleFactor != 1) {
		flambe.Log.info("Reversing device DPI scaling",["scaleFactor",this.scaleFactor]);
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		window.addEventListener("orientationchange",function() {
			flambe.platform.html.HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize();
	this.orientation = new flambe.util.Value(null);
	if(window.orientation != null) {
		window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange();
	}
	this.fullscreen = new flambe.util.Value(false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Lib.document,"fullscreenchange",function(_) {
		_g.updateFullscreen();
	},false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Lib.document,"fullscreenerror",function(_) {
		flambe.Log.warn("Error when requesting fullscreen");
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe.platform.html.HtmlStage;
flambe.platform.html.HtmlStage.__name__ = ["flambe","platform","html","HtmlStage"];
flambe.platform.html.HtmlStage.__interfaces__ = [flambe.display.Stage];
flambe.platform.html.HtmlStage.computeScaleFactor = function(canvas) {
	return 1;
	var devicePixelRatio = window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe.platform.html.HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = screen.width;
	var screenHeight = screen.height;
	if(scale * screenWidth > 1024 || scale * screenHeight > 1024) return 1;
	return scale;
}
flambe.platform.html.HtmlStage.prototype = {
	updateFullscreen: function() {
		var state = flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js.Lib.document).value;
		this.fullscreen.set__(state == true);
	}
	,onOrientationChange: function() {
		var value = flambe.platform.html.HtmlUtil.orientation(window.orientation);
		this.orientation.set__(value);
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js.Lib.document.documentElement.style;
		htmlStyle.height = js.Lib.window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js.Lib.window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe.platform.html.HtmlUtil.callLater(function() {
			flambe.platform.html.HtmlUtil.hideMobileBrowser();
			flambe.platform.html.HtmlUtil.callLater(function() {
				htmlStyle.height = js.Lib.window.innerHeight + "px";
				_g.onWindowResize();
			},100);
		});
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = scaledWidth;
		this._canvas.height = scaledHeight;
		this.resize.emit();
		return true;
	}
	,onWindowResize: function() {
		var container = this._canvas.parentNode;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,requestFullscreen: function(enable) {
		if(enable == null) enable = true;
		if(enable) {
			var documentElement = js.Lib.document.documentElement;
			var requestFullscreen = flambe.platform.html.HtmlUtil.loadFirstExtension(["requestFullscreen","requestFullScreen"],documentElement).value;
			if(requestFullscreen != null) Reflect.callMethod(documentElement,requestFullscreen,[]);
		} else {
			var cancelFullscreen = flambe.platform.html.HtmlUtil.loadFirstExtension(["cancelFullscreen","cancelFullScreen"],js.Lib.document).value;
			if(cancelFullscreen != null) Reflect.callMethod(js.Lib.document,cancelFullscreen,[]);
		}
	}
	,requestResize: function(width,height) {
		if(this.resizeCanvas(width,height)) {
			var container = this._canvas.parentNode;
			container.style.width = width + "px";
			container.style.height = height + "px";
		}
	}
	,unlockOrientation: function() {
	}
	,lockOrientation: function(orient) {
	}
	,get_fullscreenSupported: function() {
		return flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreenEnabled","fullScreenEnabled"],js.Lib.document).value == true;
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,__class__: flambe.platform.html.HtmlStage
}
flambe.platform.html.HtmlStorage = function(storage) {
	this._storage = storage;
};
$hxClasses["flambe.platform.html.HtmlStorage"] = flambe.platform.html.HtmlStorage;
flambe.platform.html.HtmlStorage.__name__ = ["flambe","platform","html","HtmlStorage"];
flambe.platform.html.HtmlStorage.__interfaces__ = [flambe.storage.Storage];
flambe.platform.html.HtmlStorage.prototype = {
	clear: function() {
		try {
			this._storage.clear();
		} catch( error ) {
			flambe.Log.warn("localStorage.clear failed",["message",error.message]);
		}
	}
	,remove: function(key) {
		try {
			this._storage.removeItem("flambe:" + key);
		} catch( error ) {
			flambe.Log.warn("localStorage.removeItem failed",["message",error.message]);
		}
	}
	,get: function(key,defaultValue) {
		var encoded = null;
		try {
			encoded = this._storage.getItem("flambe:" + key);
		} catch( error ) {
			flambe.Log.warn("localStorage.getItem failed",["message",error.message]);
		}
		if(encoded != null) try {
			return haxe.Unserializer.run(encoded);
		} catch( error ) {
			flambe.Log.warn("Storage unserialization failed",["message",error]);
		}
		return defaultValue;
	}
	,set: function(key,value) {
		var encoded;
		try {
			var serializer = new haxe.Serializer();
			serializer.useCache = true;
			serializer.useEnumIndex = false;
			serializer.serialize(value);
			encoded = serializer.toString();
		} catch( error ) {
			flambe.Log.warn("Storage serialization failed",["message",error]);
			return false;
		}
		try {
			this._storage.setItem("flambe:" + key,encoded);
		} catch( error ) {
			flambe.Log.warn("localStorage.setItem failed",["message",error.message]);
			return false;
		}
		return true;
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.html.HtmlStorage
}
flambe.platform.html.HtmlUtil = function() { }
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe.platform.html.HtmlUtil;
flambe.platform.html.HtmlUtil.__name__ = ["flambe","platform","html","HtmlUtil"];
flambe.platform.html.HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js.Lib.window.setTimeout(func,delay);
}
flambe.platform.html.HtmlUtil.hideMobileBrowser = function() {
	js.Lib.window.scrollTo(1,0);
}
flambe.platform.html.HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js.Lib.window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : null, field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe.platform.html.HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js.Lib.window;
	var value = flambe.platform.html.HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	Reflect.setField(obj,name,value);
	return true;
}
flambe.platform.html.HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
}
flambe.platform.html.HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
}
flambe.platform.html.HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe.display.Orientation.Landscape;
	default:
		return flambe.display.Orientation.Portrait;
	}
}
flambe.platform.html.HtmlUtil.now = function() {
	return Date.now();
}
flambe.platform.html.HtmlUtil.createCanvas = function(source) {
	var canvas = js.Lib.document.createElement("canvas");
	canvas.width = source.width;
	canvas.height = source.height;
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
}
flambe.web = {}
flambe.web.Web = function() { }
$hxClasses["flambe.web.Web"] = flambe.web.Web;
flambe.web.Web.__name__ = ["flambe","web","Web"];
flambe.web.Web.prototype = {
	__class__: flambe.web.Web
}
flambe.platform.html.HtmlWeb = function(container) {
	this._container = container;
};
$hxClasses["flambe.platform.html.HtmlWeb"] = flambe.platform.html.HtmlWeb;
flambe.platform.html.HtmlWeb.__name__ = ["flambe","platform","html","HtmlWeb"];
flambe.platform.html.HtmlWeb.__interfaces__ = [flambe.web.Web];
flambe.platform.html.HtmlWeb.prototype = {
	openBrowser: function(url) {
		js.Lib.window.open(url,"_blank");
	}
	,createView: function(x,y,width,height) {
		var iframe = js.Lib.document.createElement("iframe");
		iframe.style.position = "absolute";
		iframe.style.border = "0";
		iframe.scrolling = "no";
		this._container.appendChild(iframe);
		var view = new flambe.platform.html.HtmlWebView(iframe,x,y,width,height);
		flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(view);
		return view;
	}
	,get_supported: function() {
		return true;
	}
	,__class__: flambe.platform.html.HtmlWeb
}
flambe.web.WebView = function() { }
$hxClasses["flambe.web.WebView"] = flambe.web.WebView;
flambe.web.WebView.__name__ = ["flambe","web","WebView"];
flambe.web.WebView.__interfaces__ = [flambe.util.Disposable];
flambe.web.WebView.prototype = {
	__class__: flambe.web.WebView
}
flambe.platform.html.HtmlWebView = function(iframe,x,y,width,height) {
	var _g = this;
	this.iframe = iframe;
	var onBoundsChanged = function(_,_1) {
		_g.updateBounds();
	};
	this.x = new flambe.animation.AnimatedFloat(x,onBoundsChanged);
	this.y = new flambe.animation.AnimatedFloat(y,onBoundsChanged);
	this.width = new flambe.animation.AnimatedFloat(width,onBoundsChanged);
	this.height = new flambe.animation.AnimatedFloat(height,onBoundsChanged);
	this.updateBounds();
	this.url = new flambe.util.Value(null,function(url,_) {
		_g.loadUrl(url);
	});
	this.error = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.html.HtmlWebView"] = flambe.platform.html.HtmlWebView;
flambe.platform.html.HtmlWebView.__name__ = ["flambe","platform","html","HtmlWebView"];
flambe.platform.html.HtmlWebView.__interfaces__ = [flambe.platform.Tickable,flambe.web.WebView];
flambe.platform.html.HtmlWebView.prototype = {
	loadUrl: function(url) {
		if(this.iframe == null) return;
		this.iframe.src = url;
	}
	,updateBounds: function() {
		if(this.iframe == null) return;
		this.iframe.style.left = this.x.get__() + "px";
		this.iframe.style.top = this.y.get__() + "px";
		this.iframe.width = this.width.get__();
		this.iframe.height = this.height.get__();
	}
	,update: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.width.update(dt);
		this.height.update(dt);
		return this.iframe == null;
	}
	,dispose: function() {
		if(this.iframe == null) return;
		this.iframe.parentNode.removeChild(this.iframe);
		this.iframe = null;
	}
	,__class__: flambe.platform.html.HtmlWebView
}
flambe.platform.html.InspectorGraphics = function(graphics) {
	this._flushes = 0;
	this._htmlOutput = "";
	this._graphics = graphics;
};
$hxClasses["flambe.platform.html.InspectorGraphics"] = flambe.platform.html.InspectorGraphics;
flambe.platform.html.InspectorGraphics.__name__ = ["flambe","platform","html","InspectorGraphics"];
flambe.platform.html.InspectorGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.html.InspectorGraphics.prototype = {
	mask: function(shape,image) {
		this.logMethod("mask",null,[shape,image]);
		this._graphics.mask(shape,image);
	}
	,arc: function(x,y,radius,startAngle,endAngle) {
		this.logMethod("arc",null,[x,y,radius,startAngle,endAngle]);
		this._graphics.arc(x,y,radius,startAngle,endAngle);
	}
	,bezierCurveTo: function(controlX1,controlY1,controlX2,controlY2,endX,endY) {
		this.logMethod("bezierCurveTo",null,[controlX1,controlY1,controlX2,controlY2,endX,endY]);
		this._graphics.bezierCurveTo(controlX1,controlY1,controlX2,controlY2,endX,endY);
		this.snapshot();
	}
	,quadraticCurveTo: function(controlX,controlY,endX,endY) {
		this.logMethod("quadraticCurveTo",null,[controlX,controlY,endX,endY]);
		this._graphics.quadraticCurveTo(controlX,controlY,endX,endY);
		this.snapshot();
	}
	,isPointInPath: function(x,y) {
		this.logMethod("isPointInPath",null,[x,y]);
		return this._graphics.isPointInPath(x,y);
	}
	,drawShapeSprite: function() {
		this.logMethod("drawShapeSprite");
		this._graphics.drawShapeSprite();
	}
	,endFill: function() {
		this.logMethod("endFill");
		this._graphics.endFill();
	}
	,beginFill: function(color) {
		this.logMethod("beginFill",null,[color]);
		this._graphics.beginFill(color);
	}
	,endStroke: function() {
		this.logMethod("endStroke");
		this._graphics.endStroke();
	}
	,beginStroke: function(color,width) {
		this.logMethod("beginStroke",null,[color,width]);
		this._graphics.beginStroke(color,width);
	}
	,closePath: function() {
		this.logMethod("closePath");
		this._graphics.closePath();
	}
	,beginPath: function() {
		this.logMethod("beginPath");
		this._graphics.beginPath();
	}
	,lineTo: function(x,y) {
		this.logMethod("lineTo",null,[x,y]);
		this._graphics.lineTo(x,y);
		this.snapshot();
	}
	,moveTo: function(x,y) {
		this.logMethod("moveTo",null,[x,y]);
		this._graphics.moveTo(x,y);
		this.snapshot();
	}
	,snapshot: function() {
		var MAX_SIZE = 400;
		this._htmlOutput += "<img style='max-width:" + MAX_SIZE + "px; max-height:" + MAX_SIZE + "px;' src='" + this._graphics.toDataURL() + "'><br>";
	}
	,logMethod: function(method,texture,params) {
		var color = "inherit";
		if(texture != null) {
			if(this._lastTexture != texture) {
				this._lastTexture = texture;
				++this._flushes;
				color = "red";
			}
		}
		this._htmlOutput += "<b style='color:" + color + "'>" + method + "</b>";
		if(texture != null) {
			var texture1 = texture;
			this._htmlOutput += " <a href='" + Std.string(texture1.image.src) + "'>" + Std.string(texture1.image.src) + "</a>";
		}
		if(params != null) this._htmlOutput += " " + params.join(", ");
		this._htmlOutput += "<br>";
	}
	,show: function() {
		var document = js.Lib.window.open("","flambe-inspector").document;
		document.open();
		document.write("<title>Flambe Inspector</title>");
		document.write("<h3>GPU flushes: ~" + this._flushes + "</h3>");
		document.write("<p>Draw calls that cause a texture swap are in red.</p>");
		document.write(this._htmlOutput);
		document.close();
	}
	,applyScissor: function(x,y,width,height) {
		this.logMethod("applyScissor",null,[x,y,width,height]);
		this._graphics.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
		this.logMethod("setBlendMode",null,[Type.enumConstructor(blendMode)]);
		this._graphics.setBlendMode(blendMode);
	}
	,setAlpha: function(alpha) {
		this.logMethod("setAlpha",null,[alpha]);
		this._graphics.setAlpha(alpha);
	}
	,multiplyAlpha: function(factor) {
		this.logMethod("multiplyAlpha",null,[factor]);
		this._graphics.multiplyAlpha(factor);
	}
	,fillRect: function(color,x,y,width,height) {
		this.logMethod("fillRect",null,[color,x,y,width,height]);
		this._graphics.fillRect(color,x,y,width,height);
		this.snapshot();
	}
	,drawPattern: function(texture,x,y,width,height) {
		this.logMethod("drawPattern",texture,[x,y,width,height]);
		this._graphics.drawPattern(texture,x,y,width,height);
		this.snapshot();
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		this.logMethod("drawSubImage",texture,[destX,destY,sourceX,sourceY,sourceW,sourceH]);
		this._graphics.drawSubImage(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
		this.snapshot();
	}
	,drawImage: function(texture,x,y) {
		this.logMethod("drawImage",texture,[x,y]);
		this._graphics.drawImage(texture,x,y);
		this.snapshot();
	}
	,restore: function() {
		this.logMethod("restore");
		this._graphics.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this.logMethod("transform",null,[m00,m10,m01,m11,m02,m12]);
		this._graphics.transform(m00,m10,m01,m11,m02,m12);
	}
	,rotate: function(rotation) {
		this.logMethod("rotate",null,[rotation]);
		this._graphics.rotate(rotation);
	}
	,scale: function(x,y) {
		this.logMethod("scale",null,[x,y]);
		this._graphics.scale(x,y);
	}
	,translate: function(x,y) {
		this.logMethod("translate",null,[x,y]);
		this._graphics.translate(x,y);
	}
	,save: function() {
		this.logMethod("save");
		this._graphics.save();
	}
	,__class__: flambe.platform.html.InspectorGraphics
}
flambe.platform.html.WebAudioSound = function(buffer) {
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe.platform.html.WebAudioSound;
flambe.platform.html.WebAudioSound.__name__ = ["flambe","platform","html","WebAudioSound"];
flambe.platform.html.WebAudioSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.WebAudioSound.get_supported = function() {
	if(flambe.platform.html.WebAudioSound._detectSupport) {
		flambe.platform.html.WebAudioSound._detectSupport = false;
		var AudioContext = flambe.platform.html.HtmlUtil.loadExtension("AudioContext").value;
		flambe.platform.html.WebAudioSound.ctx = AudioContext != null?new AudioContext():null;
	}
	return flambe.platform.html.WebAudioSound.ctx != null;
}
flambe.platform.html.WebAudioSound.prototype = {
	get_duration: function() {
		return this.buffer.duration;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.WebAudioSound
}
flambe.platform.html._WebAudioSound = {}
flambe.platform.html._WebAudioSound.WebAudioPlayback = function(sound,volume,loop) {
	var _g = this;
	this._sound = sound;
	this._head = flambe.platform.html.WebAudioSound.ctx.destination;
	this._sourceNode = flambe.platform.html.WebAudioSound.ctx.createBufferSource();
	this._sourceNode.buffer = sound.buffer;
	this._sourceNode.loop = loop;
	this._sourceNode.noteOn(0);
	this.playAudio();
	this.volume = new flambe.animation.AnimatedFloat(volume,function(v,_) {
		_g.setVolume(v);
	});
	if(volume != 1) this.setVolume(volume);
};
$hxClasses["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = flambe.platform.html._WebAudioSound.WebAudioPlayback;
flambe.platform.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe","platform","html","_WebAudioSound","WebAudioPlayback"];
flambe.platform.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._WebAudioSound.WebAudioPlayback.prototype = {
	playAudio: function() {
		this._sourceNode.connect(this._head);
		this._startedAt = flambe.platform.html.WebAudioSound.ctx.currentTime;
		this._pausedAt = -1;
		if(!this._tickableAdded) {
			this._tickableAdded = true;
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
		}
	}
	,insertNode: function(head) {
		if(!this.get_paused()) {
			this._sourceNode.disconnect();
			this._sourceNode.connect(head);
		}
		head.connect(this._head);
		this._head = head;
	}
	,setVolume: function(volume) {
		if(this._gainNode == null) {
			this._gainNode = flambe.platform.html.WebAudioSound.ctx.createGainNode();
			this.insertNode(this._gainNode);
		}
		this._gainNode.gain.value = volume;
	}
	,dispose: function() {
		this.set_paused(true);
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this.get_paused()) {
			this._tickableAdded = false;
			return true;
		}
		return false;
	}
	,get_position: function() {
		if(this.get_ended()) return this._sound.get_duration(); else if(this.get_paused()) return this._pausedAt; else {
			var elapsed = flambe.platform.html.WebAudioSound.ctx.currentTime - this._startedAt;
			return elapsed % this._sound.get_duration();
		}
	}
	,get_ended: function() {
		return this._sourceNode.playbackState == 3;
	}
	,set_paused: function(paused) {
		if(paused != this.get_paused()) {
			if(paused) {
				this._sourceNode.disconnect();
				this._pausedAt = this.get_position();
			} else this.playAudio();
		}
		return paused;
	}
	,get_paused: function() {
		return this._pausedAt >= 0;
	}
	,get_sound: function() {
		return this._sound;
	}
	,__class__: flambe.platform.html._WebAudioSound.WebAudioPlayback
}
flambe.scene = {}
flambe.scene.Director = function() {
	this._height = -1;
	this._width = -1;
	this._transitor = null;
	this.scenes = [];
	this.occludedScenes = [];
	this._root = new flambe.Entity();
};
$hxClasses["flambe.scene.Director"] = flambe.scene.Director;
flambe.scene.Director.__name__ = ["flambe","scene","Director"];
flambe.scene.Director.getFrom = function(entity) {
	return entity.getComponent("Director_0");
}
flambe.scene.Director.__super__ = flambe.Component;
flambe.scene.Director.prototype = $extend(flambe.Component.prototype,{
	get_height: function() {
		return this._height < 0?flambe.System.get_stage().get_height():this._height;
	}
	,get_width: function() {
		return this._width < 0?flambe.System.get_stage().get_width():this._width;
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = flambe.scene.Scene.getFrom(scene);
			if(comp == null || comp.opaque) break;
		}
		this.occludedScenes = this.scenes.length > 0?this.scenes.slice(ii,this.scenes.length - 1):[];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,show: function(scene) {
		var events = flambe.scene.Scene.getFrom(scene);
		if(events != null) events.shown.emit();
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		return ll > 0?this.scenes[ll - 1]:null;
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0, _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,get_name: function() {
		return "Director_0";
	}
	,__class__: flambe.scene.Director
});
flambe.scene._Director = {}
flambe.scene._Director.Transitor = function() { }
$hxClasses["flambe.scene._Director.Transitor"] = flambe.scene._Director.Transitor;
flambe.scene._Director.Transitor.__name__ = ["flambe","scene","_Director","Transitor"];
flambe.scene._Director.Transitor.prototype = {
	complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,__class__: flambe.scene._Director.Transitor
}
flambe.scene.Scene = function(opaque) {
	if(opaque == null) opaque = true;
	this.opaque = opaque;
	this.shown = new flambe.util.Signal0();
	this.hidden = new flambe.util.Signal0();
};
$hxClasses["flambe.scene.Scene"] = flambe.scene.Scene;
flambe.scene.Scene.__name__ = ["flambe","scene","Scene"];
flambe.scene.Scene.getFrom = function(entity) {
	return entity.getComponent("Scene_4");
}
flambe.scene.Scene.__super__ = flambe.Component;
flambe.scene.Scene.prototype = $extend(flambe.Component.prototype,{
	get_name: function() {
		return "Scene_4";
	}
	,__class__: flambe.scene.Scene
});
flambe.scene.Transition = function() { }
$hxClasses["flambe.scene.Transition"] = flambe.scene.Transition;
flambe.scene.Transition.__name__ = ["flambe","scene","Transition"];
flambe.scene.Transition.prototype = {
	complete: function() {
	}
	,update: function(dt) {
		return true;
	}
	,__class__: flambe.scene.Transition
}
flambe.sound._Mixer = {}
flambe.sound._Mixer.MixerSound = function(source,channels) {
	this._source = source;
	this._channels = channels;
	this._playbacks = [];
};
$hxClasses["flambe.sound._Mixer.MixerSound"] = flambe.sound._Mixer.MixerSound;
flambe.sound._Mixer.MixerSound.__name__ = ["flambe","sound","_Mixer","MixerSound"];
flambe.sound._Mixer.MixerSound.__interfaces__ = [flambe.util.Disposable,flambe.sound.Sound];
flambe.sound._Mixer.MixerSound.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._playbacks;
		while(_g < _g1.length) {
			var playback = _g1[_g];
			++_g;
			playback.dispose();
		}
		this._playbacks = [];
	}
	,get_duration: function() {
		return this._source.get_duration();
	}
	,findOpenChannel: function() {
		var _g1 = 0, _g = this._channels;
		while(_g1 < _g) {
			var ii = _g1++;
			var playback = this._playbacks[ii];
			if(playback == null || playback.get_ended()) return ii;
		}
		return -1;
	}
	,playOrLoop: function(volume,loop) {
		var channel = this.findOpenChannel();
		if(channel < 0) return new flambe.platform.DummyPlayback(this);
		var playback = loop?this._source.loop(volume):this._source.play(volume);
		this._playbacks[channel] = playback;
		return playback;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this.playOrLoop(volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return this.playOrLoop(volume,false);
	}
	,__class__: flambe.sound._Mixer.MixerSound
}
flambe.swf = {}
flambe.swf.BitmapSprite = function(symbol) {
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.anchorX.set__(symbol.anchorX);
	this.anchorY.set__(symbol.anchorY);
};
$hxClasses["flambe.swf.BitmapSprite"] = flambe.swf.BitmapSprite;
flambe.swf.BitmapSprite.__name__ = ["flambe","swf","BitmapSprite"];
flambe.swf.BitmapSprite.__super__ = flambe.display.Sprite;
flambe.swf.BitmapSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.symbol.height;
	}
	,getNaturalWidth: function() {
		return this.symbol.width;
	}
	,draw: function(g) {
		g.drawSubImage(this.symbol.atlas,0,0,this.symbol.x,this.symbol.y,this.symbol.width,this.symbol.height);
	}
	,__class__: flambe.swf.BitmapSprite
});
flambe.swf.Symbol = function() { }
$hxClasses["flambe.swf.Symbol"] = flambe.swf.Symbol;
flambe.swf.Symbol.__name__ = ["flambe","swf","Symbol"];
flambe.swf.Symbol.prototype = {
	__class__: flambe.swf.Symbol
}
flambe.swf.BitmapSymbol = function(reader,atlas) {
	this._name = reader.symbol;
	this.atlas = atlas;
	var rect = reader.rect;
	this.x = rect[0];
	this.y = rect[1];
	this.width = rect[2];
	this.height = rect[3];
	var origin = reader.origin;
	if(origin != null) {
		this.anchorX = origin[0];
		this.anchorY = origin[1];
	} else {
		var offset = reader.offset;
		if(offset != null) {
			this.anchorX = -offset[0];
			this.anchorY = -offset[1];
		} else {
			this.anchorX = 0;
			this.anchorY = 0;
		}
	}
};
$hxClasses["flambe.swf.BitmapSymbol"] = flambe.swf.BitmapSymbol;
flambe.swf.BitmapSymbol.__name__ = ["flambe","swf","BitmapSymbol"];
flambe.swf.BitmapSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.BitmapSymbol.prototype = {
	get_name: function() {
		return this._name;
	}
	,createSprite: function() {
		return new flambe.swf.BitmapSprite(this);
	}
	,__class__: flambe.swf.BitmapSymbol
}
flambe.swf.Library = function(pack,baseDir) {
	this._symbols = new Hash();
	var reader = haxe.Json.parse(pack.getFile(baseDir + "/library.json"));
	this.frameRate = reader.frameRate;
	var movies = [];
	var _g = 0, _g1 = reader.movies;
	while(_g < _g1.length) {
		var movieObject = _g1[_g];
		++_g;
		var movie = new flambe.swf.MovieSymbol(this,movieObject);
		movies.push(movie);
		this._symbols.set(movie.get_name(),movie);
	}
	var atlases;
	if(reader.textureGroups != null) {
		var groups = reader.textureGroups;
		if(groups[0].scaleFactor != 1 || groups.length > 1) flambe.Log.warn("Flambe doesn't support Flump's Additional Scale Factors. " + "Use Base Scales and load from different asset packs instead.");
		atlases = groups[0].atlases;
	} else atlases = reader.atlases;
	var _g = 0;
	while(_g < atlases.length) {
		var atlasObject = atlases[_g];
		++_g;
		var atlas = pack.getTexture(baseDir + "/" + flambe.util.Strings.removeFileExtension(atlasObject.file));
		var _g1 = 0, _g2 = atlasObject.textures;
		while(_g1 < _g2.length) {
			var textureObject = _g2[_g1];
			++_g1;
			var bitmap = new flambe.swf.BitmapSymbol(textureObject,atlas);
			this._symbols.set(bitmap.get_name(),bitmap);
		}
	}
	var _g = 0;
	while(_g < movies.length) {
		var movie = movies[_g];
		++_g;
		var _g1 = 0, _g2 = movie.layers;
		while(_g1 < _g2.length) {
			var layer = _g2[_g1];
			++_g1;
			var _g3 = 0, _g4 = layer.keyframes;
			while(_g3 < _g4.length) {
				var kf = _g4[_g3];
				++_g3;
				var symbol = this._symbols.get(kf.symbolName);
				if(symbol != null) {
					if(layer.lastSymbol == null) layer.lastSymbol = symbol; else if(layer.lastSymbol != symbol) layer.multipleSymbols = true;
					kf.symbol = symbol;
				}
			}
		}
	}
};
$hxClasses["flambe.swf.Library"] = flambe.swf.Library;
flambe.swf.Library.__name__ = ["flambe","swf","Library"];
flambe.swf.Library.prototype = {
	getSymbol: function(symbolName) {
		return this._symbols.get(symbolName);
	}
	,__class__: flambe.swf.Library
}
flambe.swf.MovieSprite = function(symbol) {
	this._looped = null;
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.animFinishedPlaying = new flambe.util.Signal1();
	this.speed = new flambe.animation.AnimatedFloat(1);
	this.isPlaying = true;
	this._animators = [];
	var _g = 0, _g1 = symbol.layers;
	while(_g < _g1.length) {
		var animator = _g1[_g];
		++_g;
		this._animators.push(new flambe.swf._MovieSprite.LayerAnimator(animator));
	}
	this._frame = 0;
	this._position = 0;
	this["goto"](1);
};
$hxClasses["flambe.swf.MovieSprite"] = flambe.swf.MovieSprite;
flambe.swf.MovieSprite.__name__ = ["flambe","swf","MovieSprite"];
flambe.swf.MovieSprite.__super__ = flambe.display.Sprite;
flambe.swf.MovieSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	get_looped: function() {
		if(this._looped == null) this._looped = new flambe.util.Signal0();
		return this._looped;
	}
	,set_paused: function(paused) {
		this._flags = flambe.util.BitSets.set(this._flags,1 << 4,paused);
		return paused;
	}
	,get_paused: function() {
		return flambe.util.BitSets.contains(this._flags,1 << 4);
	}
	,set_position: function(position) {
		return this._position = flambe.math.FMath.clamp(position,0,this.symbol.duration);
	}
	,'goto': function(newFrame) {
		if(this._frame == newFrame) return;
		var wrapped = newFrame < this._frame;
		if(wrapped) {
			var _g = 0, _g1 = this._animators;
			while(_g < _g1.length) {
				var animator = _g1[_g];
				++_g;
				animator.changedKeyframe = true;
				animator.keyframeIdx = 0;
			}
		}
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			animator.composeFrame(newFrame);
		}
		this._frame = newFrame;
	}
	,onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		if(!this.isPlaying) return;
		this.speed.update(dt);
		var looped = false;
		if(!this.get_paused()) {
			this._position += this.speed.get__() * dt;
			if(this._position > this.symbol.duration) {
				this._position = this._position % this.symbol.duration;
				this.animFinishedPlaying.emit(this);
				looped = true;
			}
		}
		if(this.isPlaying) {
			var newFrame = this._position * this.symbol.frameRate;
			this["goto"](newFrame);
			if(looped && this._looped != null) this._looped.emit();
		}
	}
	,onRemoved: function() {
		flambe.display.Sprite.prototype.onRemoved.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.removeChild(animator.content);
		}
	}
	,onAdded: function() {
		flambe.display.Sprite.prototype.onAdded.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.addChild(animator.content);
		}
	}
	,__class__: flambe.swf.MovieSprite
});
flambe.swf._MovieSprite = {}
flambe.swf._MovieSprite.LayerAnimator = function(layer) {
	this._sprites = null;
	this.changedKeyframe = false;
	this.keyframeIdx = 0;
	this.layer = layer;
	this.content = new flambe.Entity();
	var sprite;
	if(layer.multipleSymbols) {
		this._sprites = [];
		var _g = 0, _g1 = layer.keyframes;
		while(_g < _g1.length) {
			var kf = _g1[_g];
			++_g;
			var sprite1 = kf.symbol.createSprite();
			this._sprites.push(sprite1);
		}
		sprite = this._sprites[0];
	} else if(layer.lastSymbol != null) sprite = layer.lastSymbol.createSprite(); else sprite = new flambe.display.Sprite();
	this.content.add(sprite);
};
$hxClasses["flambe.swf._MovieSprite.LayerAnimator"] = flambe.swf._MovieSprite.LayerAnimator;
flambe.swf._MovieSprite.LayerAnimator.__name__ = ["flambe","swf","_MovieSprite","LayerAnimator"];
flambe.swf._MovieSprite.LayerAnimator.prototype = {
	composeFrame: function(frame) {
		var keyframes = this.layer.keyframes;
		var finalFrame = keyframes.length - 1;
		while(this.keyframeIdx < finalFrame && keyframes[this.keyframeIdx + 1].index <= frame) {
			++this.keyframeIdx;
			this.changedKeyframe = true;
		}
		var sprite;
		if(this.changedKeyframe && this._sprites != null) {
			this.changedKeyframe = false;
			sprite = this._sprites[this.keyframeIdx];
			this.content.add(sprite);
		} else sprite = flambe.display.Sprite.getFrom(this.content);
		var kf = keyframes[this.keyframeIdx];
		var visible = kf.visible;
		sprite.set_visible(visible);
		if(!visible) return;
		var x = kf.x;
		var y = kf.y;
		var scaleX = kf.scaleX;
		var scaleY = kf.scaleY;
		var skewX = kf.skewX;
		var skewY = kf.skewY;
		var alpha = kf.alpha;
		if(this.keyframeIdx < finalFrame) {
			var interp = (frame - kf.index) / kf.duration;
			var ease = kf.ease;
			if(ease != 0) {
				var t;
				if(ease < 0) {
					var inv = 1 - interp;
					t = 1 - inv * inv;
					ease = -ease;
				} else t = interp * interp;
				interp = ease * t + (1 - ease) * interp;
			}
			var nextKf = keyframes[this.keyframeIdx + 1];
			x += (nextKf.x - x) * interp;
			y += (nextKf.y - y) * interp;
			scaleX += (nextKf.scaleX - scaleX) * interp;
			scaleY += (nextKf.scaleY - scaleY) * interp;
			skewX += (nextKf.skewX - skewX) * interp;
			skewY += (nextKf.skewY - skewY) * interp;
			alpha += (nextKf.alpha - alpha) * interp;
		}
		var matrix = sprite.getLocalMatrix();
		var sinX = Math.sin(skewX), cosX = Math.cos(skewX);
		var sinY = Math.sin(skewY), cosY = Math.cos(skewY);
		matrix.set(cosY * scaleX,sinY * scaleX,-sinX * scaleY,cosX * scaleY,x,y);
		var pivotX = kf.pivotX + sprite.anchorX.get__();
		var pivotY = kf.pivotY + sprite.anchorY.get__();
		matrix.translate(-pivotX,-pivotY);
		sprite.alpha.set__(alpha);
	}
	,__class__: flambe.swf._MovieSprite.LayerAnimator
}
flambe.swf.MovieSymbol = function(lib,reader) {
	this._name = reader.id;
	this.frameRate = lib.frameRate;
	this.frames = 0;
	this.layers = [];
	var _g = 0, _g1 = reader.layers;
	while(_g < _g1.length) {
		var layerObject = _g1[_g];
		++_g;
		var layer = new flambe.swf.MovieLayer(layerObject);
		this.frames = Math.max(layer.get_frames(),this.frames);
		this.layers.push(layer);
	}
	this.duration = this.frames / this.frameRate;
};
$hxClasses["flambe.swf.MovieSymbol"] = flambe.swf.MovieSymbol;
flambe.swf.MovieSymbol.__name__ = ["flambe","swf","MovieSymbol"];
flambe.swf.MovieSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.MovieSymbol.prototype = {
	createSprite: function() {
		return new flambe.swf.MovieSprite(this);
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: flambe.swf.MovieSymbol
}
flambe.swf.MovieLayer = function(reader) {
	this.name = reader.name;
	this.multipleSymbols = false;
	this.keyframes = [];
	var prevKf = null;
	var _g = 0, _g1 = reader.keyframes;
	while(_g < _g1.length) {
		var keyframeObject = _g1[_g];
		++_g;
		prevKf = new flambe.swf.MovieKeyframe(keyframeObject,prevKf);
		this.keyframes.push(prevKf);
	}
};
$hxClasses["flambe.swf.MovieLayer"] = flambe.swf.MovieLayer;
flambe.swf.MovieLayer.__name__ = ["flambe","swf","MovieLayer"];
flambe.swf.MovieLayer.prototype = {
	get_frames: function() {
		var lastKf = this.keyframes[this.keyframes.length - 1];
		return lastKf.index + Std["int"](lastKf.duration);
	}
	,__class__: flambe.swf.MovieLayer
}
flambe.swf.MovieKeyframe = function(reader,prevKf) {
	this.index = prevKf != null?prevKf.index + prevKf.duration:0;
	this.duration = reader.duration;
	this.label = reader.label;
	this.symbolName = reader.ref;
	this.x = 0;
	this.y = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.skewX = 0;
	this.skewY = 0;
	this.pivotX = 0;
	this.pivotY = 0;
	this.alpha = 1;
	this.visible = true;
	this.ease = 0;
	if(this.symbolName == null) return;
	var loc = reader.loc;
	if(loc != null) {
		this.x = loc[0];
		this.y = loc[1];
	}
	var scale = reader.scale;
	if(scale != null) {
		this.scaleX = scale[0];
		this.scaleY = scale[1];
	}
	var skew = reader.skew;
	if(skew != null) {
		this.skewX = skew[0];
		this.skewY = skew[1];
	}
	var pivot = reader.pivot;
	if(pivot != null) {
		this.pivotX = pivot[0];
		this.pivotY = pivot[1];
	}
	if(reader.alpha != null) this.alpha = reader.alpha;
	if(reader.visible != null) this.visible = reader.visible;
	if(reader.ease != null) this.ease = reader.ease;
};
$hxClasses["flambe.swf.MovieKeyframe"] = flambe.swf.MovieKeyframe;
flambe.swf.MovieKeyframe.__name__ = ["flambe","swf","MovieKeyframe"];
flambe.swf.MovieKeyframe.prototype = {
	__class__: flambe.swf.MovieKeyframe
}
flambe.util.Assert = function() { }
$hxClasses["flambe.util.Assert"] = flambe.util.Assert;
flambe.util.Assert.__name__ = ["flambe","util","Assert"];
flambe.util.Assert.that = function(condition,message,fields) {
	if(!condition) flambe.util.Assert.fail(message,fields);
}
flambe.util.Assert.fail = function(message,fields) {
	var error = "Assertion failed!";
	if(message != null) error += " " + message;
	if(fields != null) error = flambe.util.Strings.withFields(error,fields);
	throw error;
}
flambe.util.BitSets = function() { }
$hxClasses["flambe.util.BitSets"] = flambe.util.BitSets;
flambe.util.BitSets.__name__ = ["flambe","util","BitSets"];
flambe.util.BitSets.add = function(bits,mask) {
	return bits | mask;
}
flambe.util.BitSets.remove = function(bits,mask) {
	return bits & ~mask;
}
flambe.util.BitSets.contains = function(bits,mask) {
	return (bits & mask) != 0;
}
flambe.util.BitSets.containsAll = function(bits,mask) {
	return (bits & mask) == mask;
}
flambe.util.BitSets.set = function(bits,mask,enabled) {
	return enabled?flambe.util.BitSets.add(bits,mask):flambe.util.BitSets.remove(bits,mask);
}
flambe.util.LogLevel = $hxClasses["flambe.util.LogLevel"] = { __ename__ : ["flambe","util","LogLevel"], __constructs__ : ["Info","Warn","Error"] }
flambe.util.LogLevel.Info = ["Info",0];
flambe.util.LogLevel.Info.toString = $estr;
flambe.util.LogLevel.Info.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Warn = ["Warn",1];
flambe.util.LogLevel.Warn.toString = $estr;
flambe.util.LogLevel.Warn.__enum__ = flambe.util.LogLevel;
flambe.util.LogLevel.Error = ["Error",2];
flambe.util.LogLevel.Error.toString = $estr;
flambe.util.LogLevel.Error.__enum__ = flambe.util.LogLevel;
flambe.util.Promise = function() {
	this.success = new flambe.util.Signal1();
	this.error = new flambe.util.Signal1();
	this.progressChanged = new flambe.util.Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe.util.Promise;
flambe.util.Promise.__name__ = ["flambe","util","Promise"];
flambe.util.Promise.prototype = {
	set_total: function(total) {
		this._total = total;
		this.progressChanged.emit();
		return total;
	}
	,set_progress: function(progress) {
		this._progress = progress;
		this.progressChanged.emit();
		return progress;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,get_result: function() {
		if(!this.hasResult) throw "Promise result not yet available";
		return this._result;
	}
	,__class__: flambe.util.Promise
}
flambe.util.Signal0 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe.util.Signal0;
flambe.util.Signal0.__name__ = ["flambe","util","Signal0"];
flambe.util.Signal0.__super__ = flambe.util.SignalBase;
flambe.util.Signal0.prototype = $extend(flambe.util.SignalBase.prototype,{
	emit: function() {
		this.emit0();
	}
	,__class__: flambe.util.Signal0
});
flambe.util._SignalBase = {}
flambe.util._SignalBase.Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe.util._SignalBase.Task;
flambe.util._SignalBase.Task.__name__ = ["flambe","util","_SignalBase","Task"];
flambe.util._SignalBase.Task.prototype = {
	__class__: flambe.util._SignalBase.Task
}
var haxe = {}
haxe.Json = function() {
};
$hxClasses["haxe.Json"] = haxe.Json;
haxe.Json.__name__ = ["haxe","Json"];
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.nextChar();
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.nextChar();
				switch(c) {
				case 114:
					buf.addChar(13);
					break;
				case 110:
					buf.addChar(10);
					break;
				case 116:
					buf.addChar(9);
					break;
				case 98:
					buf.addChar(8);
					break;
				case 102:
					buf.addChar(12);
					break;
				case 47:case 92:case 34:
					buf.addChar(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.addChar(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(StringTools.isEOF(c)) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.toString();
	}
	,parseRec: function() {
		while(true) {
			var c = this.nextChar();
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						Reflect.setField(obj,field,this.parseRec());
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.nextChar();
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.nextChar() != 114 || this.nextChar() != 117 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.nextChar() != 97 || this.nextChar() != 108 || this.nextChar() != 115 || this.nextChar() != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.nextChar() != 117 || this.nextChar() != 108 || this.nextChar() != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				this.pos--;
				if(!this.reg_float.match(HxOverrides.substr(this.str,this.pos,null))) throw "Invalid float at position " + this.pos;
				var v = this.reg_float.matched(0);
				this.pos += v.length;
				var f = Std.parseFloat(v);
				var i = Std["int"](f);
				return i == f?i:f;
			default:
				this.invalidChar();
			}
		}
	}
	,nextChar: function() {
		return StringTools.fastCodeAt(this.str,this.pos++);
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + StringTools.fastCodeAt(this.str,this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.reg_float = new EReg("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?","");
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.add("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.add("z");
				return;
			}
			this.buf.add("i");
			this.buf.add(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.add("k"); else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p"); else {
				this.buf.add("d");
				this.buf.add(v);
			}
			break;
		case 3:
			this.buf.add(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.add("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.add("n"); else {
								this.buf.add("u");
								this.buf.add(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.add("n"); else {
						this.buf.add("u");
						this.buf.add(ucount);
					}
				}
				this.buf.add("h");
				break;
			case List:
				this.buf.add("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.add("h");
				break;
			case Date:
				var d = v;
				this.buf.add("v");
				this.buf.add(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.add("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.add("h");
				break;
			case IntHash:
				this.buf.add("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.add(":");
					this.buf.add(k);
					this.serialize(v1.get(k));
				}
				this.buf.add("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.get(i++);
					var b2 = v1.get(i++);
					var b3 = v1.get(i++);
					charsBuf.add(b64.charAt(b1 >> 2));
					charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.add(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.get(i++);
					var b2 = v1.get(i++);
					charsBuf.add(b64.charAt(b1 >> 2));
					charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.add(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.get(i++);
					charsBuf.add(b64.charAt(b1 >> 2));
					charsBuf.add(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.toString();
				this.buf.add("s");
				this.buf.add(chars.length);
				this.buf.add(":");
				this.buf.add(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.add("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.add("g");
				} else {
					this.buf.add("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.add("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.add(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.add(":");
				this.buf.add(v[1]);
			} else this.serializeString(v[0]);
			this.buf.add(":");
			var l = v.length;
			this.buf.add(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.add("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.add("R");
			this.buf.add(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.add("y");
		s = StringTools.urlEncode(s);
		this.buf.add(s.length);
		this.buf.add(":");
		this.buf.add(s);
	}
	,toString: function() {
		return this.buf.toString();
	}
	,__class__: haxe.Serializer
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[StringTools.fastCodeAt(haxe.Unserializer.BASE64,i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.get(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.get(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.get(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.get(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.get(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.get(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.get(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[StringTools.fastCodeAt(buf,i++)];
				var c2 = codes[StringTools.fastCodeAt(buf,i++)];
				bytes.set(bpos++,c1 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf,i++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf,i++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c1 = codes[StringTools.fastCodeAt(buf,i++)];
				var c2 = codes[StringTools.fastCodeAt(buf,i++)];
				bytes.set(bpos++,c1 << 2 | c2 >> 4);
				if(rest == 3) {
					var c3 = codes[StringTools.fastCodeAt(buf,i++)];
					bytes.set(bpos++,c2 << 4 | c3 >> 2);
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.get(this.pos) == 103) break;
			var k = this.unserialize();
			if(!Std["is"](k,String)) throw "Invalid object key";
			var v = this.unserialize();
			Reflect.setField(o,k,v);
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.get(this.pos);
			if(StringTools.isEOF(c)) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,get: function(p) {
		return StringTools.fastCodeAt(this.buf,p);
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,__class__: haxe.io.Bytes
}
haxe.xml = {}
haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
}
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
}
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__class__: haxe.xml._Fast.HasAttribAccess
}
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	resolve: function(name) {
		return this.__x.elementsNamed(name).hasNext();
	}
	,__class__: haxe.xml._Fast.HasNodeAccess
}
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__class__: haxe.xml._Fast.NodeListAccess
}
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	getElements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe.xml.Fast(x);
		}};
	}
	,getInnerHTML: function() {
		var s = new StringBuf();
		var $it0 = this.x.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			s.add(x.toString());
		}
		return s.toString();
	}
	,getInnerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.getName() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.getNodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.getNodeValue()) == "" && it.next() == null) return n.getNodeValue();
			}
			throw this.getName() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
		return v.getNodeValue();
	}
	,getName: function() {
		return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
	}
	,__class__: haxe.xml.Fast
}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = StringTools.fastCodeAt(str,p);
	while(!StringTools.isEOF(c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			}
			break;
		case 17:
			if(c == 93 && StringTools.fastCodeAt(str,p + 1) == 93 && StringTools.fastCodeAt(str,p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(StringTools.fastCodeAt(str,p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) == 68 || StringTools.fastCodeAt(str,p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(StringTools.fastCodeAt(str,p + 1) != 45 || StringTools.fastCodeAt(str,p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!haxe.xml.Parser.isValidChar(c)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!haxe.xml.Parser.isValidChar(c)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == StringTools.fastCodeAt(str,start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!haxe.xml.Parser.isValidChar(c)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.getNodeName()) throw "Expected </" + parent.getNodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && StringTools.fastCodeAt(str,p + 1) == 45 && StringTools.fastCodeAt(str,p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && StringTools.fastCodeAt(str,p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProlog(str1));
				state = 1;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
if(typeof(JSON) != "undefined") haxe.Json = JSON;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_PAUSE = "eventPause";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UNPAUSE = "eventUnpause";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_UPDATE_DISPLAY = "eventUpdateDisplay";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_MUTE_TOGGLE = "eventMuteToggle";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_FREEZE_FRAME = "EVENT_FREEZE_FRAME";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SCREEN_SHAKE = "EVENT_SCREEN_SHAKE";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SLOW_MOTION = "EVENT_SLOW_MOTION";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.EVENT_SPEED_BOOST = "EVENT_SPEED_BOOST";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PAUSED = "bool_paused";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MUTED = "bool_muted";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MOUSE_PRESSED = "boolMousePressed";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_LOSE = "bool_game_lose";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_WIN = "bool_game_win";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_LOSE = "bool_level_lose";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_LEVEL_WIN = "bool_level_win";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_MAX_COMBO = "bool_max_combo";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_STATE_PLAYING = "bool_state_playing";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GOLD_MODE = "bool_gold_mode";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_GAME_COMPLETE = "bool_game_complete";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.BOOL_PARTICLES_BOUNCE = "bool_particles_bounce";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_CANVAS_SCALE = "canvas_scale";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_HEALTH = "float_health";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_COMBO = "float_combo";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SCORE = "float_score";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_ITEMS_DESTROYED = "float_items_destroyed";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_X = "FLOAT_PARTICLE_RENDER_OFFSET_X";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_PARTICLE_RENDER_OFFSET_Y = "FLOAT_PARTICLE_RENDER_OFFSET_Y";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FLOAT_SPEED = "FLOAT_SPEED";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CURRENT_LEVEL = "current_level";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.CONFIG_XML_PATH = "config/config.xml";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE = "obstacle";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PLAYER = "player";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_BACKGROUND = "bg";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_EFFECT = "eff";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_UPGRADE = "upgrade";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_PARTICLE = "particle";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_INDICATOR = "indicator";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SPONGEBOB = "spongebob";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_SANDY = "sandy";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_JELLYFISH = "jellyfish";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_TRANSITION = "transition";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.TYPE_OBSTACLE_PARTICLE = "TYPE_OBSTACLE_PARTICLE";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_WIDTH = 960;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_HEIGHT = 560;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_X = 480;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.STAGE_CENTER_Y = 280;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.FRAMES_PER_SECOND = 30;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GROUND_Y_BASE = 1000;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.GRAVITY = 900;
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_CLICK = "click";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_UP = "up";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_DOWN = "down";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_LEFT = "left";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_RIGHT = "right";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.INPUT_SPACE = "space";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_BG = "bg";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN = "main";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PLAYER = "player";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_MAIN_TOP = "top";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_PARTICLES = "particles";
com.nick.spongebob.chopping_block.data.constants.ConstantsApp.LAYER_OBSTACLES = "obstacles";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_LOADING = "loadpanel";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_SPLASH = "splash";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_HELP = "help";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_HUD = "gameplayhud";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_GAMEPLAY_MENU = "gameplaymenu";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_QUIT_CONFIRM = "quitconfirm";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.SCREEN_END_GAME = "endgame";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_FADE = 0;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCROLL = 1;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_STAGED = 2;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.TRANSITION_SCREENSHOT = 3;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_BEGIN = 0;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_OPEN_COMPLETE = 1;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_CLOSE_BEGIN = 2;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CHANGE_CLOSE_COMPLETE = 3;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_OPENED = 0;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.OUTPUT_CLOSED = 1;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_CLOSED_ALL = 0;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_CLOSED_SPECIFIC = 1;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_MIDWAY = 2;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_TRANSITION_COMPLETE = 3;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.CONDITION_IMMEDIATE = 4;
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_SPLASH_PLAY = "FLOW_SPLASH_PLAY";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_SPLASH_PRINTABLE = "FLOW_SPLASH_PRINTABLE";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_HELP_CLOSE = "FLOW_HELP_CLOSE";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU = "FLOW_GAMEPLAY_MENU";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_CLOSE = "FLOW_GAMEPLAY_MENU_CLOSE";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_HELP = "FLOW_GAMEPLAY_MENU_HELP";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_MENU_QUIT = "FLOW_GAMEPLAY_MENU_QUIT";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_YES = "FLOW_GAMEPLAY_QUIT_YES";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_GAMEPLAY_QUIT_NO = "FLOW_GAMEPLAY_QUIT_NO";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_LEVEL = "FLOW_END_LEVEL";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_END_GAME_PLAY_AGAIN = "FLOW_END_GAME_PLAY_AGAIN";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_WIN = "FLOW_BRANCH_GAME_WIN";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_GAME_LOSE = "FLOW_BRANCH_GAME_LOSE";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_WIN = "FLOW_BRANCH_LEVEL_WIN";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_BRANCH_LEVEL_LOSE = "FLOW_BRANCH_LEVEL_LOSE";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION = "FLOW_TRANSITION";
com.nick.spongebob.chopping_block.data.constants.ConstantsScreen.FLOW_TRANSITION_DONE = "FLOW_TRANSITION_DONE";
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.UP = "workinBtnUp";
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.DOWN = "workinBtnDown";
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CLICK = "workinBtnClick";
com.nick.spongebob.chopping_block.ui.buttons.ButtonBase.CANCEL_DRAG = "workinBtnCancelDrag";
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_STOP = 0;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_OPENED = 1;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_EVENT = 2;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_NEW_STATE = 3;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_CLOSED = 4;
com.nick.spongebob.chopping_block.ui.screens.data.ScreenStateData.ACTION_FLOW = 5;
com.nick.spongebob.chopping_block.world.World._STATE_PLAYING = 1;
com.nick.spongebob.chopping_block.world.World._STATE_DASHING = 2;
com.nick.spongebob.chopping_block.world.World._STATE_START_UP = 3;
com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_CHOP = 4;
com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_AVOID = 5;
com.nick.spongebob.chopping_block.world.World._STATE_TUTORIAL_TRANSITION = 6;
com.nick.spongebob.chopping_block.world.World._STATE_WAITING = 7;
com.nick.spongebob.chopping_block.world.World._STATE_NEXT_LEVEL = 8;
com.nick.spongebob.chopping_block.world.World._STATE_GAME_OVER = 9;
com.nick.spongebob.chopping_block.world.World._SPAWN_PHASE_OBSTACLES = 1;
com.nick.spongebob.chopping_block.world.World._DURATION_TRANSITION = 1.4;
com.nick.spongebob.chopping_block.world.World._DURATION_DASH = 10;
com.nick.spongebob.chopping_block.world.World._DURATION_PLAYING = 10;
com.nick.spongebob.chopping_block.world.World._DURATION_COUNTDOWN = 4;
com.nick.spongebob.chopping_block.world.World._TRANSITION_SPEED = 600;
com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_X = 100;
com.nick.spongebob.chopping_block.world.World._CAMERA_OFFSET_Y = 300;
com.nick.spongebob.chopping_block.world.World._KRUSTY_KRAB_LEVEL = 1;
com.nick.spongebob.chopping_block.world.World._TREE_DOME_LEVEL = 2;
com.nick.spongebob.chopping_block.world.World._BACK_ALLEY_LEVEL = 3;
com.workinman.data.ConstantsCloud.FONT_DEFAULT = "Basic";
com.workinman.data.ConstantsCloud.STRING_REGION_ID = "cloudregionid";
com.workinman.data.ConstantsCloud.LOCALIZATION_XML_PATH = "config/";
com.workinman.data.ConstantsCloud.EVENT_FILES_LOADED = "EVENT_WORKINCLOUD_FILES_LOADED";
com.workinman.data.ConstantsCloud._uniqueId = 0;
com.workinman.display.Display.EVENT_UPDATE_DISPLAY = "event_update_display";
com.workinman.events.WMEventFlow.EVENT_FLOW = "Nflow";
com.workinman.events.WMEventInput.EVENT_INPUT = "eventinput";
com.workinman.events.WMEventInterfaceChange.EVENT_INTERFACE_OUTPUT = "Neio";
com.workinman.events.WMEventScreenOut.EVENT_SCREEN_OUTPUT = "Neso";
com.workinman.events.WMEventUpdate.EVENT_UPDATE = "eventupdate";
com.workinman.events.WMGestures.instance = new com.workinman.events.WMGestures();
com.workinman.math.WorkinMotion.EASE_IN_OUT = "ease";
com.workinman.math.WorkinMotion.EASE_IN = "in";
com.workinman.math.WorkinMotion.EASE_OUT = "out";
com.workinman.math.WorkinMotion.EASE_IN_FAST = "infast";
com.workinman.math.WorkinMotion.EASE_OUT_FAST = "outfast";
com.workinman.math.WorkinMotion.EASE_LINEAR = "linear";
com.workinman.math.WorkinMotion.EASE_BOUNCE_IN = "bouncein";
com.workinman.services.ServiceAnalytics._offlineUserId = "";
com.workinman.services.ServiceAnalytics._offlineTrackingId = "";
com.workinman.services.ServiceAnalytics._appId = "";
com.workinman.services.ServiceAnalytics._sessionId = "";
com.workinman.services.ServiceAnalytics._flagInitted = false;
com.workinman.services.ServiceAnalytics._flagStarted = false;
com.workinman.services.ServiceAnalytics._flagLoaded = false;
com.workinman.services.ServiceAnalytics._DEFAULT_SHARED_OBJECT_ID = "nkcimocuresid";
com.workinman.services.ServiceAnalytics.OPTION_ENABLE_TRACKING = true;
com.workinman.utils.WorkinCloud.instance = new com.workinman.utils.WorkinCloud();
flambe.platform.html.HtmlPlatform.instance = new flambe.platform.html.HtmlPlatform();
flambe.util.SignalBase.DISPATCHING_SENTINEL = new flambe.util.SignalConnection(null,null);
flambe.System.root = new flambe.Entity();
flambe.System.uncaughtError = new flambe.util.Signal1();
flambe.System.hidden = new flambe.util.Value(false);
flambe.System.hasGPU = new flambe.util.Value(false);
flambe.System._platform = flambe.platform.html.HtmlPlatform.instance;
flambe.System._calledInit = false;
flambe.Log.logger = flambe.System.createLogger("flambe");
flambe.asset.Manifest._buildManifest = flambe.asset.Manifest.createBuildManifests();
flambe.asset.Manifest._supportsCrossOrigin = (function() {
	var blacklist = new EReg("\\b(Android)\\b","");
	if(blacklist.match(js.Lib.window.navigator.userAgent)) return false;
	var xhr = new XMLHttpRequest();
	return xhr.withCredentials != null;
})();
flambe.display.Sprite._scratchPoint = new flambe.math.Point();
flambe.platform.BasicKeyboard._sharedEvent = new flambe.input.KeyboardEvent();
flambe.platform.BasicMouse._sharedEvent = new flambe.input.MouseEvent();
flambe.platform.BasicPointer._sharedEvent = new flambe.input.PointerEvent();
flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js.Lib.window.navigator.userAgent);
})();
flambe.platform.html.HtmlAssetPackLoader._mediaRefCount = 0;
flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = true;
flambe.platform.html.HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js.Lib.window.top == js.Lib.window && new EReg("Mobile(/.*)? Safari","").match(js.Lib.window.navigator.userAgent);
flambe.platform.html.WebAudioSound._detectSupport = true;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
com.nick.spongebob.chopping_block.DocumentApp.main();
})();

//@ sourceMappingURL=main-html.js.map
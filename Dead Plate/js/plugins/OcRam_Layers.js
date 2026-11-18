//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Core.js        (will be embedded in all of my plugins)
//=============================================================================
/* DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!     *
 * Copyright(c) 2020, Marko Paakkunainen // mmp_81 (at) hotmail.com         */
"use strict"; var ShaderTilemap = ShaderTilemap || false; var Imported = Imported || {}; var Yanfly = Yanfly || {}; // In case there's no Yanfly plugins in use
if (!Imported.OcRam_Core) { // OcRam_Core has only the functionality which are used widely in all OcRam plugins...
    Game_Interpreter.prototype.event = function () { /* Get Game_Event in event editor like: this.event(); */ return ($gameMap) ? $gameMap.event(this._eventId) : null; };
    Game_Map.prototype.getEventsByName = function (event_name) { /* Get Game_Map events by name */ return this._events.filter(function (ev) { return ev.event().name == event_name; }); };
    Game_Event.prototype.getComments = function () { /* Returns all comments + commandIndex from Game_Event as Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; var i = 0; this.list().forEach(function (p) { if (p.code == 108) { p.commandIndex = i; comments.push(p); } i++; }); return comments; };
    Game_Event.prototype.getStringComments = function () { /* Returns all comments from Game_Event as String Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; this.list().filter(function (c) { return c.code == 108; }).forEach(function (p) { p.parameters.forEach(function (s) { comments.push(s); }); }); return comments; };
    ImageManager.loadOcRamBitmap = function (filename, hue) {  /* Load bitmap from ./img/ocram folder */ return this.loadBitmap('img/ocram/', filename, hue, false); };
    Imported.OcRam_Core = true; var OcRam_Core = OcRam_Core || function () { /* OcRam core class */ this.initialize.apply(this, arguments); };
    OcRam_Core.prototype.initialize = function () { /* Initialize OcRam core */ this.name = "OcRam_Core"; this.version = "1.05"; this.twh = [48, 48]; this.twh50 = [24, 24]; this.radian = Math.PI / 180; this._isIndoors = false; this._screenTWidth = Graphics.width / 48; this._screenTHeight = Graphics.height / 48; this.plugins = []; this._menuCalled = false; this.Scene_Map_callMenu = Scene_Map.prototype.callMenu; this.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded; };
    OcRam_Core.prototype.debug = function () { /* Debug core? console.log("OcRam_Core", arguments); */ };
    OcRam_Core.prototype.getBoolean = function (s) { /* Get 'safe' boolean */ if (!s) return false; s = s.toString().toLowerCase(); return (s == "true" && s != "0") ? true : false; };
    OcRam_Core.prototype.getArray = function (a, b) { /* Get plugin param array */ return a ? eval(a) : b || []; };
    OcRam_Core.prototype.getFloat = function (n) { /* Get float */ return isNaN(n - parseFloat(n)) ? 0 : parseFloat(n); };
    OcRam_Core.prototype.regulateRGBG = function (obj) { /* Regulate RGBG value (used in tints) */ obj.Red = parseInt(obj.Red).clamp(-255, 255); obj.Green = parseInt(obj.Green).clamp(-255, 255); obj.Blue = parseInt(obj.Blue).clamp(-255, 255); obj.Gray = parseInt(obj.Gray).clamp(-255, 255); return obj; };
    OcRam_Core.prototype.regulateHexRGBA = function (p) { /* Regulate HEX RGBA value */ if (p.substr(0, 1) !== "#") p = "#" + p; if (p.length == 7) p = p + "ff"; return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p)[0] || "#ffffffff"; }
    OcRam_Core.prototype.getJSON = function (s) { /* Get 'safe' JSON */ try { return JSON.parse(s); } catch (ex) { return null; } };
    OcRam_Core.prototype.getJSONArray = function (a) { /* Get 'safe' JSON Array */ var tmp = []; if (a) { OcRam.getArray(a, []).forEach(function (s) { tmp.push(OcRam.getJSON(s)); }); } return tmp; };
    OcRam_Core.prototype.followers = function () { /* Only a shortcut to $gamePlayer._followers.visibleFollowers(); */ return $gamePlayer ? $gamePlayer._followers.visibleFollowers() : []; };
    OcRam_Core.prototype.setIndoorsFlag = function () { /* Set indoors flag - Each plugin will call this when needed */ if (DataManager.isEventTest()) return; if ($dataMap.meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in MAP note field!", $dataMap.meta); this._isIndoors = true; } else { if ($dataTilesets[$dataMap.tilesetId].meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in TILESET note field!", $dataTilesets[$dataMap.tilesetId].meta); this._isIndoors = true; } else { this.debug("Indoors meta tag was NOT found!", undefined); this._isIndoors = false; } } };
    OcRam_Core.prototype.isIndoors = function () { /* Get indoors flag */ return this._isIndoors; };
    OcRam_Core.prototype.runCE = function (pCE_Id) { /* Run common event */ if ($gameTemp.isCommonEventReserved()) { var tmpId = pCE_Id; var tc = this; setTimeout(function () { tc.runCE(tmpId); }, 17); } else { $gameTemp.reserveCommonEvent(pCE_Id); } };
    OcRam_Core.prototype.extendMethod = function (c, b, cb) { /* Extend/override any method */ c[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.extendProto = function (c, b, cb) { /* Extend/override any proto */ c.prototype[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.addPlugin = function (name, version) { /* Initialize new OcRam plugin */ this[name] = {}; var new_plugin = this[name]; Imported["OcRam_" + name] = true; this.plugins.push(name); this[name]._menuCalled = false; new_plugin.name = name; new_plugin.version = version; new_plugin.parameters = PluginManager.parameters("OcRam_" + new_plugin.name); if (this.getBoolean(new_plugin.parameters["Debug mode"])) { new_plugin.debug = function () { var args = [].slice.call(arguments); args.unshift("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", ":"); console.log.apply(console, args); }; console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Debug mode:", "Enabled"); console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Parameters:", new_plugin.parameters); } else { new_plugin.debug = function () { }; } var oc = this; new_plugin.extend = function (c, b, cb) { var cb_name = c.name + "_" + b; if (c[b]) { this[cb_name] = c[b]; oc.extendMethod(c, b, cb); } else { this[cb_name] = c.prototype[b]; oc.extendProto(c, b, cb); } }; }; var OcRam = new OcRam_Core(); // Create new OcRam_Core! (Below aliases)
    Scene_Map.prototype.callMenu = function () { /* Menu called? */ OcRam.Scene_Map_callMenu.call(this); OcRam.debug("Menu called:", true); OcRam._menuCalled = true; OcRam.plugins.forEach(function (p) { OcRam[p]._menuCalled = true; }); };
    Scene_Map.prototype.onMapLoaded = function () { /* Set and get tile dimensions and indoors flag */ OcRam.Scene_Map_onMapLoaded.call(this); if (!OcRam._menuCalled) { OcRam.twh = [$gameMap.tileWidth(), $gameMap.tileHeight()]; OcRam.twh50 = [OcRam.twh[0] * 0.5, OcRam.twh[1] * 0.5]; OcRam._screenTWidth = Graphics.width / OcRam.twh[0]; OcRam._screenTHeight = Graphics.height / OcRam.twh[1]; OcRam.debug("Tile w/h:", OcRam.twh); OcRam.setIndoorsFlag(); OcRam.menuCalled = false; } };
    CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2) { /* Draw line to canvas context */ this.beginPath(); this.moveTo(x1, y1); this.lineTo(x2, y2); this.stroke(); };
    Game_Map.prototype.adjustX_OC = function (x) { /* Optimized core adjustX */ if (this.isLoopHorizontal()) { if (x < this._displayX - (this.width() - this.screenTileX()) * 0.5) { return x - this._displayX + $dataMap.width; } else { return x - this._displayX; } } else { return x - this._displayX; } };
    Game_Map.prototype.adjustY_OC = function (y) { /* Optimized core adjustY */ if (this.isLoopVertical()) { if (y < this._displayY - (this.height() - this.screenTileY()) * 0.5) { return y - this._displayY + $dataMap.height; } else { return y - this._displayY; } } else { return y - this._displayY; } };
    Game_CharacterBase.prototype.screenX_OC = function () { /* Optimized core screenX */ return Math.round($gameMap.adjustX_OC(this._realX) * OcRam.twh[0] + OcRam.twh50[0]); };
    Game_CharacterBase.prototype.screenY_OC = function () { /* Optimized core screenY */ return Math.round($gameMap.adjustY_OC(this._realY) * OcRam.twh[1] + OcRam.twh50[0] - this.shiftY() - this.jumpHeight()); };
} if (parseFloat(OcRam.version) < 1.05) alert("OcRam core v1.05 is required!");

//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Layers.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); OcRam.addPlugin("Layers", "2.05");

/*:
 * @plugindesc v2.05 Display up to 3 layers which can be inherited to battle screen. You may also use sprites/pics bound to map. PLUGIN NAME MUST BE OcRam_Layers.js
 * @author OcRam
 *
 * @param Layer image directory
 * @desc From where to load layer images?
 * Default: img/pictures/
 * @type text
 * @default img/pictures/
 *
 * @param Sprite image directory
 * @desc From where to load sprite images?
 * Default: img/pictures/
 * @type text
 * @default img/pictures/
 *
 * @param Default values
 * @desc Use these values for layers if parameter is ommited.
 * 
 * @param Default sprite align
 * @parent Default values
 * @type select
 * @option Bottom-Down
 * @value 1
 * @option Bottom-Center
 * @value 2
 * @option Bottom-Right
 * @value 3
 * @option Middle-Left
 * @value 4
 * @option Middle-Center
 * @value 5
 * @option Middle-Right
 * @value 6
 * @option Top-Left
 * @value 7
 * @option Top-Center
 * @value 8
 * @option Top-Right
 * @value 9
 * @desc Default sprite align if parameter is ommited.
 * @default 5
 *  
 * @param Default scroll-x
 * @parent Default values
 * @desc Shift layer x-anchor in pixels (per frame)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @default 0.000
 *
 * @param Default scroll-y
 * @parent Default values
 * @desc Shift layer y-anchor in pixels (per frame)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @default 0.000
 * 
 * @param Default opacity
 * @parent Default values
 * @desc Default opacity for new layers?
 * Default: 1 (min:0, max:1)
 * @type number
 * @max 1.00
 * @min 0.00
 * @decimals 2
 * @default 1.00
 * 
 * @param Default fixed to map
 * @parent Default values
 * @desc Fixed to map = true, Fixed to screen = false
 * Fixed to screen will move layer WITH player.
 * @type boolean
 * @default true
 *
 * @param Default loop-x
 * @parent Default values
 * @desc Shift layer x-anchor in pixels (when player moves horizontally)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @default 0.000
 *
 * @param Default loop-y
 * @parent Default values
 * @desc Shift layer y-anchor in pixels (when player moves vertically)?
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @default 0.000
 * 
 * @param Default fade time
 * @parent Default values
 * @desc Adjusts layer default fade out and fade in time per frame.
 * Default: 0.5 (min:0.01, max:256.00 (instant))
 * @type number
 * @max 255
 * @min 0.01
 * @decimals 2
 * @default 0.5
 * 
 * @param Layer zIndexes
 * @desc Where each layer should be positioned?
 *
 * @param Layer 0 zIndex
 * @parent Layer zIndexes
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @desc What is the z-index of this layer?
 * @default 3
 * 
 * @param Layer 1 zIndex
 * @parent Layer zIndexes
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @desc What is the z-index of this layer?
 * @default 3
 * 
 * @param Layer 2 zIndex
 * @parent Layer zIndexes
 * @type select
 * @option Behind parallax
 * @value 0
 * @option Behind tileset
 * @value 1
 * @option Behind characters
 * @value 2
 * @option Above characters
 * @value 3
 * @option Behind weather
 * @value 4
 * @option Above all
 * @value 5
 * @desc What is the z-index of this layer?
 * @default 3
 *
 * @param Battle layers
 * @desc Show layer in battle scene?
 * 
 * @param Layer 0
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 0 to battle scene.
 * @default true
 *
 * @param Layer 1
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 1 to battle scene.
 * @default true
 *
 * @param Layer 2
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 2 to battle scene.
 * @default true
 *
 * @param Template layers
 * @type struct<Layers>[]
 * @desc Templates makes layer plugin command easier to use.
 * Example: *Plugin command* layer my_template
 * @default []
 * 
 * @param Use only parallax mapping
 * @type boolean
 * @desc If this parameter is on/true normal tilemapping will be
 * disabled! This will give nice speed-up in parallax mapping!
 * @default false
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                                      (Embedded OcRam_Core v1.5)
 * ============================================================================
 * Display layers like 'shadow', 'fog' and 'sunray' with plugin commands.
 * Layers can be inherited to battle screen. You may use sprites for stuff like 
 * 'bomb' holes, (special)buildings (to save tileset slots) and other GFX.
 * 
 * Sprites will be deleted on map transfer / load. Use switch for example to
 * keep state which sprites must be drawn again in map autorun event.
 *
 * This plugin can be used also in parallax mapping.
 * 
 * It is recommended to do "Ground" parallax "normal way" in editor 
 * (set map parallax with !prefix). This will give you 1 extra layer and 
 * possibility to preview of ground layer in RMMV editor. Just remember that
 * minimum layer size is same as your screen size.
 *
 * z-Index table for all LAYERS:
 *    0 = Behind parallax
 *    1 = Behind tileset
 *    2 = Behind characters
 *    3 = Above characters
 *    4 = Behind weather
 *    5 = Above all
 * 
 * Following z-Indexes are possible with SPRITES
 *    0 = Below characters
 *    1 = Same as characters (z based on y)
 *        (use any region restriction plugin(s)/events to do collision map)
 *    2 = Above characters
 * 
 * ----------------------------------------------------------------------------
 * Usage - Plugin commands
 * ============================================================================
 * 
 * NOTE: No spaces allowed in any parameter!
 *  
 * To use layer templates (DO NOT USE NUMERIC NAMES: example: 0 or 1234):
 * ALSO SPACES ARE FORBIDDEN IN TEMPLATE NAMES (Example: My template)!
 * Plugin command: layer my_template_name
 * 
 * Plugin command: 
 * layer indx imgName scrollX scrollY opacity fixToMap fade loop anim offset
 *
 * layer        This is the plugin command (parameters below) 
 * -----------------------------------------------------------------------------
 * indx         Layer index valid values 0, 1 or 2
 * imgName      Image name without extension and spaces
 * scrollX      Horizontal scroll value in pixels per frame
 * scrollY      Vertical scroll value in pixels per frame
 * opacity      Opacity of this layer (0 - 1, example: 0.5 = 50% transparent)
 * fixToMap     true = Fixed to map (loop is ignored), false = Fixed to screen
 * fade         Fading time for this layer (gain/lose opacity PER FRAME)
 * loop         How to loop img (when player moves >> shift layer by n pixels)
 *              loop:x,y        x and y numbers given in pixels 0 = won't shift
 * anim         How to animate this layer? Param usage = anim:frames,rate
 *      frames: How many animation frames this layer has (Maximum 99 frames)? 
 *              Pictures must be named as: xxx00.png, xxx01.png, xxx02.png ...
 *        rate: How often picture is changed in milliseconds?
 * offset       Horizontal and vertical offset for image (bitmap orginX/Y)
 *              Value given like offset:x,y - Example offset:10,55
 *
 * EXAMPLES BELOW:
 *
 * fixed to map, scrolling 'shadows' layer:
 *      layer 0 shadows 0.3 -0.2 0.8 true 2
 *
 * scrolling, fixed to screen, looping, above chars and animated 'fog':
 *      layer 1 fog 0.3 -0.2 1 false 3 loop:1,1 anim:2,500 offset:0,0
 *
 * fixed to screen, not scrolling nor looping foreground with 'sunrays':
 *      layer 2 sunrays 0 0 false 2 loop:0,0 * offset:0,0
 *
 * You may also ommit parameters to use default values like this:
 *      layer 1 fog -2 1
 * 
 * Or if you want ommit parameter from between use asterisk (*):
 *      layer 2 sunrays 0 0 * false * loop:0,0
 *      
 *
 * To modify any EXISTING layer params: set_layer [z] [p1]:[v1] [p2]:[v2]
 * NOTE: Refer to parameter table above to see paramer names!
 * NOTE2: NO SPACES AROUND EQUAL MARKS! (loop = 1,4 >> this will be UNDEFINED!)
 *      set_layer 1 scrlx=6 loop=1,4 anim=3,1000
 * 
 * DYNAMIC image names (map/tileset ids will be always 3 digits)!
 *      [mapId]      will be replaced with current mapId (3 digits)
 *      [var:x]      will be replaced with variable 'x' value
 *      [tilesetId]  will be replaced with current tileset id (3 digits)
 * 
 * Dynamic name examples:
 *      layer 2 map[mapId] 0 0 * true * loop:0,0
 *      layer 2 [var:2] 0 0 * true * loop:0,0
 *      layer 2 sunray[tilesetId] 0 0 * true * loop:0,0
 *
 * CLEAR layers with: clear_layer [layer index] [fade]
 *      clear_layer 0 256
 *      
 * SET layer z-index with: set_layer_z [layer index] [z-index]
 * NOTE: Layer z-index will persist over save/load and transfers!
 * (Refer to z-index table in introduction section)
 *      set_layer_z 0 0
 *      
 * NOTE: Sprite ID can't be zero (0) it will be changed to 1
 * To add sprites bound to map (img_name w/o extension/spaces):
 *      sprite [id] [img_name] [x] [y] [z] [opacity] [align] [anim:frames,rate]
 *      sprite 1 huge_tree 11 15 2 1 2 anim:3,250
 *      
 * CLEAR ALL sprites with desired id: clear_sprites [sprite id]
 *      clear_sprites 1
 *      
 * CLEAR ALL sprites with: clear_sprites
 * 
 * ----------------------------------------------------------------------------
 * PICTURE COMMANDS (CAN BE USED TO REPLACE SOME TOP SCREEN LAYERS):
 * TIP: These commands can utilized in OcRam_Weather_EX -plugin also!
 * ============================================================================
 * 
 *      picture show picId name origin x y scaleX scaleY opacity blendMode fade
 *          Example: picture show 32 sunrays 0 0 0 100 100 255 0 120
 *      
 *      picture erase picId fade
 *          Example: picture erase 32 120
 *      
 *      picture tint picId tone fade
 *          Example (grayscale image): picture tint 32 [0,0,0,255] 120
 *      
 *      picture rotate picId speed
 *          Example: picture rotate 32 2
 *      
 *      picture move picId name origin x y scaleX scaleY opacity blendMode fade
 *      NOTE: picture move command will use fader to it's target values!
 *      And you may even create animations with it!
 *          Example: picture show 32 sunrays 0 0 0 100 100 255 0 120
 *      
 *      scale   Numeric value between 0 and 100
 *      
 *      opacity Numeric value between 0 and 255
 *      
 *      tone    Array RGBG [-255 to 255, -255 to 255, -255 to 255, 0 to 255]
 *      
 *      origin 
 *          0 = Upper Left
 *          1 = Center
 *          
 *      blendMode
 *          0 = Normal
 *          1 = Additive
 *          2 = Multiply
 *          3 = Screen
 * 
 * ----------------------------------------------------------------------------
 * Usage - JavaScript
 * ============================================================================
 * 
 * Script (for Layers):
 *      
 *      // Set desired layers z-index in mid-game!
 *      // Refer to z-index table in introduction section
 *      // NOTE: Layer z-index will persist over save/load and transfers!
 *      OcRam.Layers.setZIndex(layerIndex, zIndex);
 *      
 *      // Initialize desired layer
 *      $gameScreen.setLayer_OC(1, 'fog', 2, -2, 1, false, 1, 
 *                              'loop:0,0', 'anim:0,0', 'offset:0,0');
 *                              
 *      // Change 1 or more parameters from INITIALIZED layer
 *      $gameScreen.setLayerParameters_OC(1, ['scrlx=6', 'loop=1,4',
 *                                        'anim=3,1000']);
 *                              
 * For backward compatibility (same as above): 
 *      $gameMap.setLayer_OC(1, 'fog', 2, -2, 0.9, false, 1, 
 *                           'loop:0,0', 'anim:0,0', 'offset:0,0');
 *
 * Script (for Sprites / Pictures)
 *      $gameMap.addSprite_OC(1, 'big_hole', x, y, 0, 1, 5, 'anim:0,0');
 *
 * Align uses 'keypad' align: 1=bottom-left, 5=middle, 8=top-center etc...
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your game by ANY MEANS (inc. ads, crypto-mining,
 * micro-transactions etc..) it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard license requires credits.
 * If you want to buy several licenses: Every license purhased will give you
 * discount of 2 EUR for the next license purchase until minimum price of
 * 2 EUR / license. License discounts can be used to any of my plugins!
 * ALL of my plugins for 1 project = 40 EUR (standard licenses)
 *
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-layers.107999
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2020, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2019/11/20 v2.00 - Initial release
 * 
 * 2020/03/14 v2.01 - OcRam core v1.04 (requirement for all of my plugins)
 *                    Sprite alignment bugs fixed
 *                    Added compatibility with OcRam_Passages (v4.06)!
 *                    
 * 2020/05/25 v2.02 - Dynamic layer zIndex (JS call / Plugin command)!
 *                    (Credits to Akone, Tw1tchy3y3 & yeahchris)
 *                    
 *                    "Same as character" z-index will sort sprites by y-axis!
 *                    
 *                    New parameters to layer commands "Offset X/Y"
 *                    (Credits to deadyfinger)
 *                    
 *                    Fixed some layer and sprite related bugs when loading 
 *                    a saved game. NOTE: All old save files will still have
 *                    invalid data. New save files will be validated.
 *                    
 *                    Fixed bug in layer looping when map "Scroll Type" was 
 *                    set to "Loop Horizontally" (Credits to yeahchris)
 *
 *                    New PICTURE plugin commands (you may add sunrays etc.
 *                    on screen with plugin commands!) CAN FREE UP ALL STATIC 
 *                    BOUND TO SCREEN LAYERS FOR BETTER USE!
 *                    TIP: Also OcRam_Weather_EX can utilize pictures with 
 *                    these new picture plugin commands!
 *                    
 * 2020/05/27 v2.03 - Fixed more bugs in layer looping. Example loop:0,0 
 *                    won't loop anymore (Credits to yeahchris)
 *
 *                    If clear_layer fade time is omitted, fade will default 
 *                    to 255 (instant clear) (Credits to spitzfire1985)
 *                    
 * 2020/06/12 v2.04 - Fixed bug where "Test event" crashed game - Requires
 *                    OcRam_Core v1.5 (Credits to jjraymonds)
 *                    
 *                    Fixed bug: Will now properly clear all layers on
 *                    "Return to title" command and "Game over"
 *                    
 * 2020/06/16 v2.05 - set_layer opacity parameter now works correctly (float)
 *                    (Credits to: PresaDePrata)
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     If using parallax mapping only, following overrides are done:
 *          ShaderTilemap.prototype._paintAllTiles
 *          Tileset.prototype._paintAllTiles
 *          Spriteset_Map.prototype.createTilemap
 */
/*~struct~Layers:
 * 
 * @param TemplateName
 * @desc Use this name in plugin command: layer my_template
 * Only alpha characters are allowed (a-Z) + under score (_)
 * @default my_template
 *
 * @param LayerIndex
 * @type select
 * @option Layer 0
 * @value 0
 * @option Layer 1
 * @value 1
 * @option Layer 2
 * @value 2
 * @desc Layer index (0, 1 or 2)
 * @default 0
 * 
 * @param Image
 * @desc The name of the image set as layer background.
 * @default my_image
 *
 * @param ScrollX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @desc Scroll layer horizontally n pixels per frame.
 * @default 0.000
 * 
 * @param ScrollY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @desc Scroll layer vertically n pixels per frame.
 * @default 0.000
 * 
 * @param Opacity
 * @type number
 * @max 1.00
 * @min 0.00
 * @decimals 2
 * @desc Opacity for this template.
 * @default 1.00
 * 
 * @param FixedToMap
 * @type boolean
 * @desc true = fixed to map // false = fixed to screen.
 * @default false
 * 
 * @param LoopX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @desc Scroll layer horizontally n pixels, but only when player moves horizontally.
 * @default 0.000
 *
 * @param LoopY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @desc Scroll layer vertically n pixels, but only when player moves vertically.
 * @default 0.000
 * 
 * @param AnimFrames
 * @type number
 * @max 99
 * @min 0
 * @desc How many animation frames this layer has? (see help for naming image files)
 * @default 0
 * 
 * @param AnimRate
 * @type number
 * @max 99999
 * @min 0
 * @desc How many ms there is between animation frames?
 * @default 0
 * 
 * @param OffsetX
 * @type number
 * @max 99999
 * @min -99999
 * @desc Layer horizontal offset.
 *
 * @param OffsetY
 * @type number
 * @max 99999
 * @min -99999
 * @desc Layer vertical offset.
 *
 */
var _prevDiffX = 0; var _prevDiffY = 0;

function OcRam_Layer() {
    this.initialize.apply(this, arguments);
}

OcRam_Layer.prototype.initialize = function () {
    this._imgName = ""; this._newName = "";
    this._x = 0; this._y = 0; this._z = 0;
    this._loopX = 0; this._loopY = 0;
    this._scrollX = 0; this._scrollY = 0;
    this._fixedToMap = false; this._fadeTime = 0.5;
    this._opacity = 0; this._targetOpacity = 0;
    this._animFrames = 0; this._animRate = 0;
    this._fadeIn = false; this._fadeOut = false;
    this._sprite = new TilingSprite();
    this.getLoopPosX = function (difference) { return; };
    this.getLoopPosY = function (difference) { return; };
};

// layer z img_name scrlx scrly opacity fix_to_map fade loop
OcRam_Layer.prototype.applyParams = function (indx, pic_name, sx, sy, o, f2m, fade, lx, ly, anim, rate, offset) {

    this._newName = pic_name;
    this._z = indx;
    this._fadeTime = fade;

    if (!offset) offset = "0,0";
    var off_set = eval("[" + offset + "]");

    this._offsetXY = off_set;
    this._newLoopX = lx / OcRam.twh[0];
    this._newLoopY = ly / OcRam.twh[1];
    this._newScrollX = sx / OcRam.twh[0];
    this._newScrollY = sy / OcRam.twh[1];
    this._newFixedToMap = f2m;
    this._newAnimFrames = anim;
    this._newAnimRate = rate;

    this._targetOpacity = 0;
    this._fadeBackOpacity = o * 255;
    this._fadeIn = false; this._fadeOut = true;

    if (pic_name != "") {
        if (this._imgName == "") { // First time when this layer is set
            this._targetOpacity = this._fadeBackOpacity;
            this.applyNewLayer();
        }
    }

};

OcRam_Layer.prototype.propablyParallax = function () {
    if (!this._sprite.bitmap) return false;
    return this._fixedToMap && !this._scrollX && !this._scrollY &&
        !this._loopX && !this._loopY &&
        this._sprite.bitmap.width >= Graphics.width &&
        this._sprite.bitmap.height >= Graphics.height;
};

OcRam_Layer.prototype.updateFixToMap = function () {
    var tc = this;
    if (this._fixedToMap) { // Fixed to map
        if (tc._loopX) {
            this.getLoopPosX = function (difference) {
                if (!difference) return 0;
                return (difference * 2) - ((difference < 0) ? -tc._loopX : tc._loopX);
            };
        } else {
            this.getLoopPosX = function (difference) { return difference * 2; };
        }
        if (tc._loopY) {
            this.getLoopPosY = function (difference) {
                if (!difference) return 0;
                return (difference * 2) - ((difference < 0) ? -tc._loopY : tc._loopY);
            };
        } else {
            this.getLoopPosY = function (difference) { return difference * 2; };
        }
    } else { // Fixed to screen
        if (tc._loopX != 0) {
            this.getLoopPosX = function (difference) {
                if (!difference) return 0; return ((difference < 0) ? tc._loopX : -tc._loopX);
            };
        } else {
            this.getLoopPosX = function (difference) { return 0; };
        } if (tc._loopY != 0) {
            this.getLoopPosY = function (difference) {
                if (!difference) return 0; return ((difference < 0) ? tc._loopY : -tc._loopY);
            };
        } else {
            this.getLoopPosY = function (difference) { return 0; };
        }
    }
};

OcRam_Layer.prototype.initAnim = function () {

    // Use these to optimize very critical scroll operation (we eliminate 3 if clauses this way!!!)

    var tc = this; // Refers to this on below scopes...

    if (this._newAnimRate < 6) this._newAnimRate = 6; // Capped to ~160fps
    if (this._animate) clearInterval(this._animate); // Clear any previous animation intervals!

    if (this._animFrames > 0) { // NEW ANIMATED LAYER
        this._currentFrame = 0; this._animBitmaps = [];
        for (var i = 1; i < this._newAnimFrames + 1; i++) {
            this._animBitmaps.push(ImageManager.loadOC_Layer(this._imgName + i.toString().padZero(2)));
        } this._sprite.bitmap = this._animBitmaps[0]; // Load already first image
        this._animate = setInterval(function () {
            tc._currentFrame = (tc._currentFrame + 1) % tc._animFrames;
            tc._sprite.bitmap = tc._animBitmaps[tc._currentFrame];
        }, this._animRate);
    } else { // NOT ANIMATED LAYER
        this._animate = null;
        this._sprite.bitmap = ImageManager.loadOC_Layer(this._imgName);
    }

};

OcRam_Layer.prototype.applyNewLayer = function () {

    this._imgName = this._newName; this._fixedToMap = this._newFixedToMap;
    this._loopX = this._newLoopX; this._loopY = this._newLoopY;
    this._scrollX = this._newScrollX; this._scrollY = this._newScrollY;
    this._animFrames = this._newAnimFrames || 0; this._animRate = this._newAnimRate || 6;

    this.updateFixToMap(); this.initAnim();

    this._opacity = (this._fadeTime > 254) ? this._targetOpacity : 0;
    this._sprite.opacity = this._opacity;
    this._sprite.move(0, 0, Graphics.width, Graphics.height);
    this._sprite.origin.x = 0; this._sprite.origin.y = 0;

    if ($gameMap && this._fixedToMap) {
        this._x = $gameMap._displayX * 2 + (this._offsetXY[0] / OcRam.twh[0]);
        this._y = $gameMap._displayY * 2 + (this._offsetXY[1] / OcRam.twh[1]);
    } else {
        this._x = (this._offsetXY[0] / OcRam.twh[0]); this._y = (this._offsetXY[1] / OcRam.twh[1]);
    } this._fadeIn = true; this._fadeOut = false;

};

OcRam_Layer.prototype.battleUpdate = function () {
    if (this._sprite.bitmap && this.visible) {
        if (this._scrollX) this._sprite.origin.x += this._scrollX * OcRam.twh50[0];
        if (this._scrollY) this._sprite.origin.y += this._scrollY * OcRam.twh50[1];
    }
};

OcRam_Layer.prototype.mapUpdate = function () {

    if (this._sprite.bitmap) {

        if (this._scrollX) this._x += this._scrollX;
        if (this._scrollY) this._y += this._scrollY;

        if (this._fadeOut) {
            this._opacity -= this._fadeTime; this._sprite.opacity = this._opacity;
            if (this._opacity <= this._targetOpacity) {
                this._opacity = this._targetOpacity;
                this._sprite.opacity = this._opacity;
                OcRam.Layers.debug("changing layer(" + this._z + ") bitmap to " + this._newName, "(was " + this._imgName + ")");
                this._imgName = this._newName;
                if (this._targetOpacity == 0) {
                    if (this._newName != "" && this._fadeBackOpacity) { // Ready to apply new graphics
                        this._targetOpacity = this._fadeBackOpacity;
                        this.applyNewLayer(); OcRam.Layers.debug("Applied new layer", this);
                    } else { // New name was empty
                        this._sprite.bitmap = null;
                    }
                } this._fadeOut = false;
            }
        } else if (this._fadeIn) {
            if (this._targetOpacity <= this._opacity) {
                OcRam.Layers.debug("_targetOpacity reached (" + this._targetOpacity + ")! Change complete!", "For layer(" + this._z + ") bitmap = " + this._newName);
                this._fadeIn = false;
            } else {
                this._opacity += this._fadeTime; this._sprite.opacity = this._opacity;
            }
        }

        this._sprite.origin.x = this._x * OcRam.twh50[0];
        this._sprite.origin.y = this._y * OcRam.twh50[1];

    }

};

function OcRam_Sprite() {
    this.initialize.apply(this, arguments);
}

OcRam_Sprite.prototype = Object.create(Sprite_Character.prototype);
OcRam_Sprite.prototype.constructor = OcRam_Sprite;

OcRam_Sprite.prototype.initialize = function (img_name, px, py, pz, pbm, anim) {

    Sprite_Character.prototype.initialize.call(this);

    if (anim) img_name = img_name.substr(0, img_name.length - 2);

    var tmp = ((anim + ":").split(":")[1] + ",").split(",");

    this._animFrames = isNaN(tmp[0]) ? 0 : Number(tmp[0]) || 0;
    this._animRate = isNaN(tmp[1]) ? 0 : Number(tmp[1]) || 6;
    if (this._animRate < 6) this._animRate = 6; // Capped to ~160fps
    if (this._animate) clearInterval(this._animate); // Clear any previous animation intervals!

    if (this._animFrames > 0) { // NEW ANIMATED LAYER
        this._currentFrame = 0; this._animBitmaps = []; this._animBitmaps.push(pbm);
        for (var i = 2; i < this._animFrames + 1; i++) {
            this._animBitmaps.push(ImageManager.loadOC_Sprite(img_name + i.toString().padZero(2)));
        } this.bitmap = this._animBitmaps[0]; // Load already first image
        var tc = this; // This layer will be used in below interval scope...
        this._animate = setInterval(function () {
            tc._currentFrame = (tc._currentFrame + 1) % tc._animFrames;
            tc.bitmap = tc._animBitmaps[tc._currentFrame];
        }, this._animRate);
    } else { // NOT ANIMATED LAYER
        this._animate = null;
        this.bitmap = pbm;
    }

    this._character = {}; // Let's create fake character ;p

    this.y = py; this.x = px; this.z = pz;

    this._character.screenX = function () {
        return Math.round($gameMap.adjustX_OC(px) * OcRam.twh[0] + OcRam.twh50[0]);
    }; this._character.screenY = function () {
        return Math.round($gameMap.adjustY_OC(py) * OcRam.twh[1] + OcRam.twh[1]);
    }; this._character.screenZ = function () {
        return pz;
    }; this._character.isTransparent = function () { return false; };

};

OcRam_Sprite.prototype.update = function () {
    this.updatePosition();
};

// Already loaded and managed by this plugin do not mess things up...
OcRam_Sprite.prototype.updateBitmap = function () { };

(function () {

    // ----------------------------------------------------------------------------
    // Plugin parameters and other variables
    // ============================================================================

    var OcRam_Utils = {}; var _this = this;

    var _layerImgDir = String(this.parameters['Layer image directory'] || 'img/pictures/');
    var _spriteImgDir = String(this.parameters['Sprite image directory'] || 'img/pictures/');
    var _defaultFadeTime = parseFloat(this.parameters['Default fade time']);
    var _defaultOpacity = parseFloat(this.parameters['Default opacity']);
    var _defaultLoopX = parseInt(this.parameters['Default loop-x'] || 0);
    var _defaultLoopY = parseInt(this.parameters['Default loop-y'] || 0);
    var _defaultScrollX = parseInt(this.parameters['Default scroll-x'] || 0);
    var _defaultScrollY = parseInt(this.parameters['Default scroll-y'] || 0);
    var _defaultFixedToMap = OcRam.getBoolean(this.parameters['Default fixed to map']);
    var _layer0z = parseInt(this.parameters['Layer 0 zIndex'] || 3);
    var _layer1z = parseInt(this.parameters['Layer 1 zIndex'] || 3);
    var _layer2z = parseInt(this.parameters['Layer 2 zIndex'] || 3);
    var _battleLayer0 = OcRam.getBoolean(this.parameters['Layer 0']);
    var _battleLayer1 = OcRam.getBoolean(this.parameters['Layer 1']);
    var _battleLayer2 = OcRam.getBoolean(this.parameters['Layer 2']);
    var _useOnlyParallaxMapping = OcRam.getBoolean(this.parameters['Use only parallax mapping']);
    var _layerTemplates = parse(this.parameters['Template layers']) || null;

    var _gameSysLoading = false; var oc_sprites = []; // Sprites container...
    var _allLayers = [new OcRam_Layer(), new OcRam_Layer(), new OcRam_Layer()]; // Layer array

    // Parallax or not to parallax. Orginal core functions saved here...
    var _Orginal_ShaderTilemap_paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
    var _Orginal_Tilemap_paintAllTiles = Tilemap.prototype._paintAllTiles;
    var _Orginal_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    this.extend(Game_Interpreter, "pluginCommand", function (command, args) {
        
        switch (command) {
            case "set_layer_z": _this.debug(command, args);
                _this.setZIndex(Number(args[0]), Number(args[1])); break;
            case "set_layer": _this.debug(command, args);
                setLayerParameters(args[0], args.splice(1, args.length - 1)); break;
            case "clear_layer": _this.debug(command, args);
                if (Number(args[1]) == 0) {
                    setLayer(Number(args[0]), '', 0, 0, 0, false, 255);
                } else {
                    setLayer(Number(args[0]), '', 0, 0, 0, false, Number(args[1]));
                } break;
            case "layer": case "oc_layer": // indx, img_name, sx, sy, o, f2m, fade, loop, anim
                _this.debug(command, args);
                setLayer(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]); break;
            case "sprite": case "oc_sprite": // id [img_name] [x] [y] [Z-order] [opacity] [align] [anim]
                _this.debug(command, args);
                addSprite(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]); break;
            case "clear_sprites": _this.debug(command, args);
                if (args[0]) {
                    clearSprites(args[0]);
                } else {
                    clearSprites();
                } break;
            case "picture": _this.debug(command, args);
                switch ((args[0]).toLowerCase()) {
                    case "show": // Show picture
                        $gameScreen.pictureFadeIn(Number(args[1]), args[2], Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]), Number(args[10])); break;
                    case "erase": // Erase picture
                        $gameScreen.pictureFadeOut(Number(args[1]), Number(args[2])); break;
                    case "tint": // Tint picture
                        $gameScreen.tintPicture(Number(args[1]), eval(args[2]), Number(args[3])); break;
                    case "rotate": // Rotate picture
                        $gameScreen.rotatePicture(Number(args[1]), Number(args[2])); break;
                    case "move": // Move picture
                        $gameScreen.pictureFadeIn(Number(args[1]), Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]), Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9])); break;
                    default: break;
                } break;
            default:
                _this["Game_Interpreter_pluginCommand"].apply(this, arguments);
        }
    });

    Game_Screen.prototype.pictureFadeIn = function (pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode, fade) {
        var realPictureId = this.realPictureId(pictureId);
        if (realPictureId) {
            var pic = this._pictures[realPictureId];
            if (pic && pic._OC_Interval) {
                _this.debug("ERASED - Picture:", pic);
                clearInterval(pic._OC_Interval);
            }
        } this.showPicture(pictureId, name, origin, x, y, scaleX, scaleY, 0, blendMode);
        this.movePicture(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, fade);
    };

    Game_Screen.prototype.pictureFadeOut = function (pictureId, fade) {
        
        var realPictureId = this.realPictureId(pictureId);
        var pic = this._pictures[realPictureId];

        if (pic) {
            this.movePicture(pictureId, pic._origin, pic._x, pic._y, pic._scaleX, pic._scaleY, 0, pic._blendMode, fade);
            if (pic._OC_Interval) clearInterval(pic._OC_Interval);
            pic._OC_Interval = setInterval(function () {
                if (this._opacity < 1) {
                    _this.debug("ERASED - Picture:", this);
                    clearInterval(this._OC_Interval);
                    $gameScreen.erasePicture(pictureId);
                }
            }.bind(pic), 100);
        }

    };

    this.setZIndex = function (layer, z) {

        if (SceneManager._scene && SceneManager._scene._spriteset) {

            var tc = SceneManager._scene._spriteset;

            switch (layer) {
                case 0: _layer0z = z; break;
                case 1: _layer1z = z; break;
                case 2: _layer2z = z; break;
            }

            tc._baseSprite.removeChild(_allLayers[0]._sprite);
            tc._baseSprite.removeChild(_allLayers[1]._sprite);
            tc._baseSprite.removeChild(_allLayers[2]._sprite);
            tc.createLayers_OC();

        }
        
    };

    // sprite img x y z o a
    Game_Map.prototype.addSprite_OC = function (id, pic_name, x, y, z, o, a, anim) {
        addSprite(id, pic_name, x, y, z, o, a, anim);
    }; Game_Map.prototype.getSprites_OC = function () {
        return oc_sprites;
    };

    // layer indx img_name scrlx scrly opacity fixed_to_map fade loop anim
    Game_Map.prototype.setLayer_OC = function (indx, img_name, sx, sy, o, f2m, fade, loop_xy, anim, offset) {
        setLayer(indx, img_name, sx, sy, o, f2m, fade, loop_xy, anim, offset);
    }; Game_Screen.prototype.setLayer_OC = function (indx, img_name, sx, sy, o, f2m, fade, loop_xy, anim, offset) {
        setLayer(indx, img_name, sx, sy, o, f2m, fade, loop_xy, anim, offset);
    }; Game_Screen.prototype.setLayerParameters_OC = function (indx, args) {
        setLayerParameters(indx, args);
    };

    this.extend(Game_Player, "clearTransferInfo", function () {
        _this["Game_Player_clearTransferInfo"].apply(this, arguments); clearSprites();
    });

    // Image loaders for layers and sprites
    ImageManager.loadOC_Sprite = function (filename) {
        return this.loadBitmap(_spriteImgDir, filename, 0, true);
    };

    ImageManager.loadOC_Layer = function (filename) {
        return this.loadBitmap(_layerImgDir, filename, 0, true);
    };

    // Reset fixed to map layer position(s) based on display position...
    this.extend(Game_Map, "setDisplayPos", function (x, y) {
        _this["Game_Map_setDisplayPos"].apply(this, arguments);
        for (var i = 0; i < 3; i++) {
            if (_allLayers[i]._fixedToMap) {
                _allLayers[i]._x = $gameMap._displayX * 2;
                _allLayers[i]._y = $gameMap._displayY * 2;
            }
        }
    });

    // To scroll layers and sprites
    this.extend(Game_Map, "scrollLeft", function (distance) {
        var lastX = this._displayX; _this["Game_Map_scrollLeft"].apply(this, arguments);
        this.scrollX_OC(distance, lastX - this._displayX);
    });
    this.extend(Game_Map, "scrollRight", function (distance) {
        var lastX = this._displayX; _this["Game_Map_scrollRight"].apply(this, arguments);
        this.scrollX_OC(distance, lastX - this._displayX);
    });
    this.extend(Game_Map, "scrollDown", function (distance) {
        var lastY = this._displayY; _this["Game_Map_scrollDown"].apply(this, arguments);
        this.scrollY_OC(distance, lastY - this._displayY);
    });
    this.extend(Game_Map, "scrollUp", function (distance) {
        var lastY = this._displayY; _this["Game_Map_scrollUp"].apply(this, arguments);
        this.scrollY_OC(distance, lastY - this._displayY);
    });

    Game_Map.prototype.scrollY_OC = function (distance, difference) {
        if (this.isLoopVertical()) {
            if (difference > 8) difference = _prevDiffY;
            if (difference < -8) difference = _prevDiffY;
            _prevDiffY = difference;
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._y -= _allLayers[i].getLoopPosY(difference);
            }
        } else if (this.height() >= this.screenTileY()) {
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._y -= _allLayers[i].getLoopPosY(difference);
            }
        }
    };

    Game_Map.prototype.scrollX_OC = function (distance, difference) {
        if (this.isLoopHorizontal()) {
            if (difference > 8) difference = _prevDiffX;
            if (difference < -8) difference = _prevDiffX;
            _prevDiffX = difference;
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._x -= _allLayers[i].getLoopPosX(difference);
            }
        } else if (this.width() >= this.screenTileX()) {
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._x -= _allLayers[i].getLoopPosX(difference);
            }
        }
    };

    // Save layer and sprite data
    this.extend(Game_System, "onBeforeSave", function () {
        this.saveLayerData(); _this["Game_System_onBeforeSave"].apply(this, arguments);
    }); Game_System.prototype.saveLayerData = function () {
        this._OC_Sprites = []; this._OC_Layers = []; var obj = null; var tc = this;
        this._OC_LayerZ = [_layer0z, _layer1z, _layer2z];
        oc_sprites.forEach(function (sprite) { // id, pic_name, x, y, z, o, a, anim
            obj = {}; obj._orgName = sprite._orgName; obj._orgId = sprite._orgId;
            obj._orgX = sprite._orgX; obj._orgY = sprite._orgY; obj._orgZ = sprite._orgZ;
            obj._orgOpacity = sprite._orgOpacity; obj._orgAlign = sprite._orgAlign;
            obj._orgAnim = sprite._orgAnim; tc._OC_Sprites.push(obj);
        }); _allLayers.forEach(function (layer) { // indx, img_name, sx, sy, o, f2m, fade, loop, anim
            obj = {}; obj._imgName = layer._imgName; obj._z = layer._z;
            obj._scrollX = -layer._scrollX * OcRam.twh[0];
            obj._scrollY = -layer._scrollY * OcRam.twh[1];
            obj._opacity = layer._opacity / 255;
            obj._fixedToMap = layer._fixedToMap;
            obj._loopX = -layer._loopX * OcRam.twh[0];
            obj._loopY = -layer._loopY * OcRam.twh[1];
            obj._fadeTime = layer._fadeTime;
            obj._animFrames = layer._animFrames;
            obj._animRate = layer._animRate;
            obj._offsetXY = layer._offsetXY;
            tc._OC_Layers.push(obj);
        });
    };

    // Load layer and sprite data
    this.extend(Game_System, "onAfterLoad", function () {
        if (this._OC_LayerZ) {
            _layer0z = this._OC_LayerZ[0];
            _layer1z = this._OC_LayerZ[1];
            _layer2z = this._OC_LayerZ[2];
        } _this["Game_System_onAfterLoad"].apply(this, arguments); _gameSysLoading = true;
    }); Game_System.prototype.loadLayerData = function () {
        if (this._OC_Layers) {
            this._OC_Layers.forEach(function (l) { // indx, img_name, sx, sy, o, f2m, fade, loop, anim
                if (!l._offsetXY) l._offsetXY = [0, 0];
                var l_old_name = l._imgName; l._newName = ""; l._imgName = "";
                setLayer(l._z, l_old_name, l._scrollX, l._scrollY, l._opacity, l._fixedToMap, 255, "loop:" + l._loopX + "," + l._loopY, "anim:" + l._animFrames + "," + l._animRate, "offset:" + l._offsetXY[0] + "," + l._offsetXY[1]);
            });
        } if (this._OC_Sprites) {
            this._OC_Sprites.forEach(function (s) { // pic_name, x, y, z, o, a
                addSprite(s._orgId, s._orgName, s._orgX, s._orgY, s._orgZ * 0.5 - 1, s._orgOpacity, s._orgAlign, s._orgAnim);
            });
        }
    }; // load data if game system was loading
    this.extend(Scene_Map, "start", function () {
        reloadSprites(); _this["Scene_Map_start"].apply(this, arguments);
        if (_gameSysLoading) {
            $gameSystem.loadLayerData();
            reloadSprites(); _gameSysLoading = false;
        }
    });

    // Clear Layers when exited to title screen!
    this.extend(Scene_GameEnd, "commandToTitle", function () {
        _allLayers = [new OcRam_Layer(), new OcRam_Layer(), new OcRam_Layer()];
        _this["Scene_GameEnd_commandToTitle"].apply(this, arguments);
    }); this.extend(Game_Interpreter, "command354", function () {
        _allLayers = [new OcRam_Layer(), new OcRam_Layer(), new OcRam_Layer()];
        _this["Game_Interpreter_command354"].apply(this, arguments); return true;
    }); this.extend(Scene_Gameover, "gotoTitle", function () {
        _allLayers = [new OcRam_Layer(), new OcRam_Layer(), new OcRam_Layer()];
        _this["Scene_Gameover_gotoTitle"].apply(this, arguments);
    });

    // Create layers
    this.extend(Spriteset_Map, "createLowerLayer", function () {
        _this["Spriteset_Map_createLowerLayer"].apply(this, arguments); this.createLayers_OC();
        if (DataManager.isEventTest()) return;
        if (!_useOnlyParallaxMapping) {
            if ($dataTilesets[$dataMap.tilesetId].meta["parallax"] !== undefined) {
                useParallaxMapping();
            } else {
                useTileMapping();
            }
        }
    });

    Spriteset_Map.prototype.createLayers_OC = function () {

        var z_index = 0; var parallax_index = 0;

        this._baseSprite.removeChild(this._weather);
        this._baseSprite.addChild(this._weather);

        var weather_index = this._baseSprite.children.indexOf(this._weather);

        for (var i = 2; i > -1; i--) {
            switch (i) {
                case 0: z_index = _layer0z; break;
                case 1: z_index = _layer1z; break;
                case 2: z_index = _layer2z; break;
            } switch (z_index) {
                case 0: // Below parallax
                    this._baseSprite.addChildAt(_allLayers[i]._sprite, 1); break;
                case 1: // Below tileset
                    parallax_index = this._baseSprite.children.indexOf(this._parallax);
                    this._baseSprite.addChildAt(_allLayers[i]._sprite, parallax_index + 1); break;
                case 2: // Below characters
                    _allLayers[i]._sprite.z = 1; _allLayers[i]._sprite.spriteId = 0;
                    this._tilemap.addChildAt(_allLayers[i]._sprite, 0); break;
                case 3: // Above charactesr
                    _allLayers[i]._sprite.z = 6 + i; _allLayers[i]._sprite.spriteId = 9990 + i;
                    this._tilemap.addChildAt(_allLayers[i]._sprite, 0); break;
                case 4: // Below weather
                    this._baseSprite.addChildAt(_allLayers[i]._sprite, weather_index); break;
                case 5: // Most top
                    this._baseSprite.addChild(_allLayers[i]._sprite); break;
            }
        }

    };

    // Update layers
    this.extend(Spriteset_Map, "update", function () {
        _this["Spriteset_Map_update"].apply(this, arguments);
        _allLayers[0].mapUpdate(); _allLayers[1].mapUpdate(); _allLayers[2].mapUpdate();
    });

    // BATTLE Sprites
    this.extend(Spriteset_Battle, "createLowerLayer", function () {
        _this["Spriteset_Battle_createLowerLayer"].apply(this, arguments); this.createLayers_OC();
    });

    // This is done just once per game and after that UPDATE method is faster (no extra if clauses)
    if (_battleLayer0 && _battleLayer1 && _battleLayer2) { this.debug("All layers are", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[0].battleUpdate(); _allLayers[1].battleUpdate(); _allLayers[2].battleUpdate(); });
    } else if (_battleLayer0 && _battleLayer1) { this.debug("Layers 0 and 1 are", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[0].battleUpdate(); _allLayers[1].battleUpdate(); });
    } else if (_battleLayer0 && _battleLayer2) { this.debug("Layers 0 and 2 are", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[0].battleUpdate(); _allLayers[2].battleUpdate(); });
    } else if (_battleLayer1 && _battleLayer2) { this.debug("Layers 1 and 2 are", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[1].battleUpdate(); _allLayers[2].battleUpdate(); });
    } else if (_battleLayer0) { this.debug("Layer 0 is", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[0].battleUpdate(); });
    } else if (_battleLayer1) { this.debug("Layer 1 is", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[1].battleUpdate(); });
    } else if (_battleLayer2) { this.debug("Layer 2 is", "inherited to battle scene.");
        this.extend(Spriteset_Battle, "update", function () { _this["Spriteset_Battle_update"].apply(this, arguments); _allLayers[2].battleUpdate(); });
    } else { this.debug("No layers:", "are inherited to battle scene."); }
    
    Spriteset_Battle.prototype.createLayers_OC = function () {
        _allLayers[0].visible = !_allLayers[0].propablyParallax();
        _allLayers[1].visible = !_allLayers[1].propablyParallax();
        _allLayers[2].visible = !_allLayers[2].propablyParallax();
        if (_battleLayer0 && _allLayers[0].visible) this._baseSprite.addChild(_allLayers[0]._sprite);
        if (_battleLayer1 && _allLayers[1].visible) this._baseSprite.addChild(_allLayers[1]._sprite);
        if (_battleLayer2 && _allLayers[2].visible) this._baseSprite.addChild(_allLayers[2]._sprite);
    };

    if (_useOnlyParallaxMapping) {
        _this.parallaxOptimization = function () { return true; };
        useParallaxMapping();
    } else {
        _this.parallaxOptimization = function () { return false; };
        useTileMapping();
    }

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    function useParallaxMapping() {
        
        _this.debug("USE ONLY PARALLAX MAPPING", "!!!");
        _this._usingParallax = true;
        ShaderTilemap.prototype._paintAllTiles = function (startX, startY) { };
        Tilemap.prototype._paintAllTiles = function (startX, startY) { };

        Spriteset_Map.prototype.createTilemap = function () {
            if (Graphics.isWebGL()) {
                this._tilemap = new ShaderTilemap();
            } else {
                this._tilemap = new Tilemap();
            }
            this._tilemap.tileWidth = $gameMap.tileWidth();
            this._tilemap.tileHeight = $gameMap.tileHeight();
            this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
            this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
            this._tilemap.verticalWrap = $gameMap.isLoopVertical();
            // this.loadTileset(); // Do not even load tileset
            this._baseSprite.addChild(this._tilemap);
        };

    }

    function useTileMapping() {
        _this.debug("Using normal way to draw tilemaps.", "(no parallax mapping optimization)");
        _this._usingParallax = false;
        Spriteset_Map.prototype.createTilemap = function () {
            _Orginal_Spriteset_Map_createTilemap.call(this);
        };
        ShaderTilemap.prototype._paintAllTiles = function (startX, startY) {
            _Orginal_ShaderTilemap_paintAllTiles.call(this, startX, startY);
        };
        Tilemap.prototype._paintAllTiles = function (startX, startY) {
            _Orginal_Tilemap_paintAllTiles.call(this, startX, startY);
        };
    }

    function getTemplateByName(name) {
        var found_obj = null;
        _layerTemplates.forEach(function (template) {
            var template_object = JSON.parse(template);
            if (template_object.TemplateName == name) {
                found_obj = template_object; return;
            }
        }); return found_obj;
    }

    function setLayer(indx, img_name, sx, sy, o, f2m, fade, loop_xy, anim, offset) {

        if (offset) offset = offset.replace("offset:", "");

        _this.debug("setLayer", "(" + indx + ", " + img_name + ", sx:" + sx + ", sy:" + sy + ", o:" + o + ", f2m:" + f2m + ", fade:" + fade + ", loop=" + loop_xy + ", anim=" + anim + ", offset=" + offset + ")");

        if (isNaN(indx)) {
            var template_name = indx.toString();
            var template_object = getTemplateByName(template_name);
            indx = template_object.LayerIndex;
            img_name = template_object.Image;
            sx = template_object.ScrollX;
            sy = template_object.ScrollY;
            o = template_object.Opacity;
            f2m = template_object.FixedToMap;
            fade = template_object.Fade;
            loop_xy = "loop:" + template_object.LoopX + "," + template_object.LoopY;
            anim = "anim:" + template_object.AnimFrames + "," + template_object.AnimRate;
            offset = "" + template_object.OffsetX + "," + template_object.OffsetY + "";
            _this.debug("SET TEMPLATE:", template_object);
        }

        var this_layer = _allLayers[indx];
        if (this_layer == null || this_layer === undefined) {
            _this.debug("Invalid layer indx", "(indx = " + indx + ")"); return;
        }

        // Index
        indx = Number(indx); img_name = img_name || '';

        // DYNAMIC NAMES HERE
        if ($gameMap) {
            img_name = img_name.replace("\[mapId\]", $gameMap._mapId.toString().padZero(3));
            img_name = img_name.replace("\[mapid\]", $gameMap._mapId.toString().padZero(3));
            if (!DataManager.isEventTest()) {
                img_name = img_name.replace("\[tilesetId\]", $gameMap._tilesetId.toString().padZero(3));
                img_name = img_name.replace("\[tilesetid\]", $gameMap._tilesetId.toString().padZero(3));
            } else {
                img_name = img_name.replace("\[tilesetId\]", "0".padZero(3));
                img_name = img_name.replace("\[tilesetid\]", "0".padZero(3));
            }
        } var varid = img_name.match(/\[var\:(.*?)\]/);
        if (varid) {
            if (varid.length > 0) {
                varid = parseInt(varid[1]);
                img_name = img_name.replace(/\[var\:(.*?)\]/, $gameVariables.value(varid));
            }
        }

        // Scroll
        if (!sx || sx == "*") sx = _defaultScrollX; if (!sy || sy == "*") sy = _defaultScrollY;
        sx = -parseFloat(sx); sy = -parseFloat(sy); // Negate to have faster + operand on update per FRAME

        // Opacity
        if (o === undefined) {
            o = _defaultOpacity;
        } else {
            o = (isNaN(o)) ? _defaultOpacity : parseFloat(o);
        } // Fixed to map
        if (f2m === undefined) {
            f2m = _defaultFixedToMap;
        } else {
            f2m = (("" + f2m) == "*") ? _defaultFixedToMap : OcRam.getBoolean(f2m);
        } // Fade
        if (!fade) {
            fade = _defaultFadeTime;
        } else {
            fade = (("" + fade) == "*") ? _defaultFadeTime : parseFloat(fade);
        } // Loop params
        var lx = _defaultLoopX; var ly = _defaultLoopY;
        if (loop_xy) {
            var tmp = ((loop_xy + ":").split(":")[1] + ",").split(",");
            // These are for backward compatibility
            if (tmp[0] == "x") tmp[0] = 1;
            if (tmp[0] == "y") tmp[1] = 1;
            if (tmp[1] == "y") tmp[1] = 1;
            lx = parseFloat(tmp[0]); lx = isNaN(lx) ? 0 : lx;
            ly = parseFloat(tmp[1]); ly = isNaN(ly) ? 0 : ly;
        }

        if (!offset) offset = "0,0";
        //offset = "[" + offset + "]";

        // Animation params
        tmp = ((anim + ":").split(":")[1] + ",").split(",");
        var ac = isNaN(tmp[0]) ? 0 : Number(tmp[0]); var ar = isNaN(tmp[1]) ? 0 : Number(tmp[1]);

        if (fade > 255) fade = 255;

        _this.debug("REGULATED VALUES: setLayer", "(" + indx + ", " + img_name + ", sx:" + sx + ", sy:" + sy + ", o:" + o + ", f2m:" + f2m + ", fade:" + fade + ", lx:" + lx + ", ly:" + ly + ", ac:" + ac + ", ar:" + ar + ", offset:" + offset + ")");

        this_layer.applyParams(indx, img_name, sx, sy, o, f2m, fade, lx, ly, ac, ar, offset); // Apply values

    }

    function setLayerParameters(indx, args) {

         // Check for required parameters...
        if (!indx || !args) return;
        if (!Array.isArray(args)) return;

        indx = parseInt(indx); var layer = _allLayers[indx];

        if (layer) {
            if (layer._sprite.bitmap) { // Layer is valid!

                _this.debug("Change layer parameters for layer index: " + indx, args);
                var par = ""; var val = "";

                args.forEach(function (p) {
                    par = (p + "=").split("=")[0];
                    val = p.replace(par + "\=", "");
                    par = par.toLowerCase();
                    switch (par) {
                        case "imgname": // Reset animation also!
                            layer._imgName = val;
                            if (layer._animate) clearInterval(layer._animate);
                            layer._sprite.bitmap = ImageManager.loadOC_Layer(layer._imgName);
                            break;
                        case "scrollx": layer._scrollX = parseFloat(val) / OcRam.twh[0]; break;
                        case "scrolly": layer._scrollY = parseFloat(val) / OcRam.twh[1]; break;
                        case "opacity":
                            val = val * 255;
                            if (val > layer._opacity) {
                                layer._fadeIn = true; layer._fadeOut = false;
                            } else {
                                layer._fadeIn = false; layer._fadeOut = true;
                            } layer._targetOpacity = parseFloat(val);
                            break;
                        case "fixtomap": layer._fixedToMap = OcRam.getBoolean(val); layer.updateFixToMap(); break;
                        case "fade": layer._fadeTime = parseFloat(val); break;
                        case "loopx": layer._loopX = parseFloat(val) / OcRam.twh[0]; break;
                        case "loopy": layer._loopY = parseFloat(val) / OcRam.twh[1]; break;
                        case "anim":
                            var tmp = (val + ",").split(",");
                            layer._animFrames = isNaN(tmp[0]) ? 0 : Number(tmp[0]);
                            layer._animRate = isNaN(tmp[1]) ? 0 : Number(tmp[1]);
                            layer.initAnim(); break;
                    }
                });
            } else { _this.debug("Layer is not set for index:", indx); }
        } else { _this.debug("Layer is MISSING?!? for index:", indx); }

    }

    function reloadSprites() {
        for (var i = 0; i < oc_sprites.length; i++) {
            //SceneManager._scene._spriteset._characterSprites.push(oc_sprites[i]);
            SceneManager._scene._spriteset._tilemap.addChild(oc_sprites[i]);
        }
    }

    function clearSprites(id) {

        if (id) {
            if (SceneManager._scene._spriteset) {
                for (var i = 0; i < oc_sprites.length; i++) {
                    if (oc_sprites[i]._orgId == id) {
                        SceneManager._scene._spriteset._tilemap.removeChild(oc_sprites[i]);
                    }
                } //SceneManager._scene._spriteset._characterSprites.filter(function (s) { return !s._orgId; });
            } oc_sprites = oc_sprites.filter(function (s) {
                if (s._orgId != id) return true;
                if (s._animate) clearInterval(s._animate); // Clear any previous animation intervals!
                return false;
            });
        } else {
            if (SceneManager._scene._spriteset) {
                for (var i = 0; i < oc_sprites.length; i++) {
                    SceneManager._scene._spriteset._tilemap.removeChild(oc_sprites[i]);
                } //SceneManager._scene._spriteset._characterSprites.filter(function (s) { return !s._orgId; });
            } oc_sprites = oc_sprites.filter(function (s) {
                if (s._animate) clearInterval(s._animate); // Clear any previous animation intervals!
                return false;
            });
        }

    }

    function addSprite(id, pic_name, x, y, z, o, a, anim) {

        if (anim) pic_name = pic_name + "01";

        _this.debug("addSprite", [pic_name, x, y, z, o, a, anim]);
        z = parseInt(z) * 2 + 1; x = Number(x); y = Number(y);

        var tmp_x = x; var tmp_y = y; 
        var bmap = ImageManager.loadOC_Sprite(pic_name);

        bmap.addLoadListener(function () { // Wait for bitmap to load to get dimensions from it...

            var iw = bmap.width / OcRam.twh[0]; var ih = bmap.height / OcRam.twh[1];

            switch (parseInt(a)) {
                case 1: tmp_x += iw * 0.5 - 1; break; // bottom-left
                case 3: tmp_x -= iw * 0.5; break; // bottom-right
                case 4: tmp_x += iw * 0.5 - 1; tmp_y += ih * 0.5 - 0.5; break; // middle-left
                case 5: tmp_y += ih * 0.5 - 0.5; break; // middle-middle
                case 6: tmp_x -= iw * 0.5; tmp_y += ih * 0.5 - 0.5; break; // middle-right
                case 7: tmp_x += iw * 0.5 - 1; tmp_y += ih - 1; break; // top-left
                case 8: tmp_y += ih - 1; break; // top-center
                case 9: tmp_x -= iw * 0.5; tmp_y += ih - 1; break; // top-right
                default: break; // default to bottom-middle
            }

            var sprite = new OcRam_Sprite(pic_name, tmp_x, tmp_y, z, bmap, anim); sprite._orgId = id || 1;
            sprite._orgName = pic_name; sprite._orgX = x; sprite._orgY = y;
            sprite._orgZ = z; sprite._orgOpacity; sprite._orgAlign = a;
            sprite._orgAnim = anim; oc_sprites.push(sprite);
            //SceneManager._scene._spriteset._characterSprites.push(sprite);
            SceneManager._scene._spriteset._tilemap.addChild(sprite);

            _this.debug("ADDED SPRITE", sprite);

        });

    }

    function parse(string) {
        try {
            return JSON.parse(string);
        } catch (ex) {
            return null;
        }
    }

}.bind(OcRam.Layers)());
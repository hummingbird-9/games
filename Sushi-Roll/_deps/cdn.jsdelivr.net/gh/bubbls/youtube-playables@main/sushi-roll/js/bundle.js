webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(26);
var hide = __webpack_require__(15);
var redefine = __webpack_require__(16);
var ctx = __webpack_require__(23);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(68)('wks');
var uid = __webpack_require__(41);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(111);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// extended script from phaser sprites, it sets some values automatically to the right settings
var Sprite = function (_Phaser$Image) {
  _inherits(Sprite, _Phaser$Image);

  function Sprite(_ref) {
    var asset = _ref.asset,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        frame = _ref.frame,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0 : _ref$anchorY,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? false : _ref$inputEnabled,
        _ref$scaleX = _ref.scaleX,
        scaleX = _ref$scaleX === undefined ? 1 : _ref$scaleX,
        _ref$scaleY = _ref.scaleY,
        scaleY = _ref$scaleY === undefined ? 1 : _ref$scaleY,
        _ref$angle = _ref.angle,
        angle = _ref$angle === undefined ? 0 : _ref$angle;

    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, game, x, y, asset, frame));

    _this.game = game;
    _this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.smoothed = true;
    _this.scale.setTo(scaleX, scaleY);
    _this.angle = angle;
    _this.asset = asset;
    _this.frame = frame;
    return _this;
  }

  _createClass(Sprite, [{
    key: 'center',
    value: function center() {
      this.x += this.width / 2;
      this.y += this.height / 2;
    }
  }, {
    key: 'changeTexture',
    value: function changeTexture(frame) {
      var asset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.asset;

      this.loadTexture(asset, frame);
    }
  }]);

  return Sprite;
}(_phaser2.default.Image);

exports.default = Sprite;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Extended class from phaser text, it sets some values automatically to the right settings
var Text = function (_Phaser$Text) {
  _inherits(Text, _Phaser$Text);

  function Text(_ref) {
    var _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0 : _ref$anchorY,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === undefined ? 20 : _ref$fontSize,
        _ref$fontName = _ref.fontName,
        fontName = _ref$fontName === undefined ? 'bungee regular' : _ref$fontName,
        _ref$fontWeight = _ref.fontWeight,
        fontWeight = _ref$fontWeight === undefined ? 'normal' : _ref$fontWeight,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#323232' : _ref$color,
        _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        _ref$align = _ref.align,
        align = _ref$align === undefined ? 'center' : _ref$align,
        _ref$boundsAlignH = _ref.boundsAlignH,
        boundsAlignH = _ref$boundsAlignH === undefined ? 'center' : _ref$boundsAlignH,
        _ref$boundsAlignV = _ref.boundsAlignV,
        boundsAlignV = _ref$boundsAlignV === undefined ? 'middle' : _ref$boundsAlignV,
        _ref$stroke = _ref.stroke,
        stroke = _ref$stroke === undefined ? '#000000' : _ref$stroke,
        _ref$strokeThickness = _ref.strokeThickness,
        strokeThickness = _ref$strokeThickness === undefined ? 0 : _ref$strokeThickness,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? false : _ref$inputEnabled,
        _ref$wordWrap = _ref.wordWrap,
        wordWrap = _ref$wordWrap === undefined ? false : _ref$wordWrap,
        wordWrapWidth = _ref.wordWrapWidth,
        maxWidth = _ref.maxWidth;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, game, x, y, text));

    _this.maxWidth = maxWidth;
    _this.fontSize = fontSize;
    _this.text = text;
    _this.game = game;
    _this.visible = visible;
    _this.setStyle({
      font: fontWeight + ' ' + fontSize + 'pt ' + fontName,
      fill: color,
      align: align,
      boundsAlignH: boundsAlignH,
      boundsAlignV: boundsAlignV,
      stroke: stroke,
      strokeThickness: strokeThickness,
      wordWrap: wordWrap,
      wordWrapWidth: wordWrapWidth
    });
    _this.resolution = 2;
    _this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.autoFit();
    return _this;
  }

  // Move position


  _createClass(Text, [{
    key: 'translateText',
    value: function translateText(offsetX, offsetY) {
      this.translateTextX(offsetX);
      this.translateTextY(offsetY);
    }

    // Move position in the x-axis

  }, {
    key: 'translateTextX',
    value: function translateTextX(offsetX) {
      this.x += offsetX;
    }

    // Move position in the y-axis

  }, {
    key: 'translateTextY',
    value: function translateTextY(offsetY) {
      this.y += offsetY;
    }
  }, {
    key: 'centerText',
    value: function centerText() {
      this.x += this.width / 2;
      this.y += this.height / 2;
    }
  }, {
    key: 'autoFit',
    value: function autoFit() {
      if (!this.maxWidth) return;

      while (this.getBounds().width > this.maxWidth && parseInt(this.fontSize, 10) > 2) {
        this.fontSize = parseInt(this.fontSize, 10) - 1;
      }
    }
  }]);

  return Text;
}(_phaser2.default.Text);

exports.default = Text;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(40);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(15);
var has = __webpack_require__(14);
var SRC = __webpack_require__(41)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(26).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(4);
var defined = __webpack_require__(28);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var writeToStorage = Symbol('writeToStorage');

var StorageManager = function (_Singleton) {
  _inherits(StorageManager, _Singleton);

  function StorageManager() {
    _classCallCheck(this, StorageManager);

    var _this = _possibleConstructorReturn(this, (StorageManager.__proto__ || Object.getPrototypeOf(StorageManager)).call(this));

    _this._basicInfo = game.cache.getJSON('info');

    _this._data = {};
    return _this;
  }

  /**
   * Get the value with the corresponding key.
   *
   * @param {string} key - Key of the value.
   * @returns {*} Value.
   */


  _createClass(StorageManager, [{
    key: 'get',
    value: function get(key) {
      return this._data[key];
    }

    /**
     * Save the value in the storage.
     *
     * @param {string} key - Key of the value.
     * @param {*} value - Can be any JSON valid value.
     * @param {boolean} [compare=false] - If true, it will compare with the old value.
     * If the new value is higher, it will save. Otherwise it will ignore.
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      var compare = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var storage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'localStorage';

      if (compare) {
        var currentValue = this.get(key);
        switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
          case 'number':
            if (value <= currentValue) {
              return;
            }
          default:
            break;
        }
      }

      this[writeToStorage](key, value, storage);
    }

    /**
     * Set the value to the basic value.
     *
     * @param {string} key - Key of the value.
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */

  }, {
    key: 'remove',
    value: function remove(key, storage) {
      this._data[key] = this._basicInfo[key];

      switch (storage.toUpperCase()) {
        case 'LOCALSTORAGE':
          _famobiApi2.default.instance.removeLocalStorageItem(key);
          break;
        case 'SESSIONSTORAGE':
          _famobiApi2.default.instance.removeSessionStorageItem(key);
        default:
          console.warn('Storage is not recognized.', 'Key is ' + key);
          break;
      }
    }

    /**
     * Delete the whole save data. Use the default data file.
     *
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */

  }, {
    key: 'delete',
    value: function _delete(storage) {
      this._data = this._basicInfo;

      switch (storage.toUpperCase()) {
        case 'LOCALSTORAGE':
          _famobiApi2.default.instance.clearLocalStorage();
          break;
        case 'SESSIONSTORAGE':
          _famobiApi2.default.instance.clearSessionStorage();
        default:
          console.warn('Storage is not recognized.');
          break;
      }
    }

    /**
     * Write the data to the save file.
     *
     * @private
     * @param {string} key - Key of the value.
     * @param {*} value - Can be any JSON valid value.
     * @param {'localstorage'|'sessionstorage} [storage='localStorage] - Use the correct storage.
     */

  }, {
    key: writeToStorage,
    value: function value(key, _value, storage) {
      this._data[key] = _value;

      switch (storage.toUpperCase()) {
        case 'LOCALSTORAGE':
          _famobiApi2.default.instance.setLocalStorageItem(key, JSON.stringify(_value));
          break;
        case 'SESSIONSTORAGE':
          _famobiApi2.default.instance.setSessionStorageItem(key, JSON.stringify(_value));
          break;
        default:
          console.warn('Storage is not recognized.', 'Key is ' + key);
          break;
      }
    }

    /**
     * Load the save file.
     */

  }, {
    key: 'loadSaveData',
    value: function loadSaveData() {
      var keys = Object.keys(this._basicInfo);

      for (var i = 0; i < keys.length; i += 1) {
        var key = keys[i];

        var value = _famobiApi2.default.instance.getLocalStorageItem(key);

        try {
          this._data[key] = JSON.parse(value);
        } catch (error) {
          this._data[key] = value;
        }

        if (this._data[key] === undefined || this._data[key] === null) {
          this._data[key] = this._basicInfo[key];

          this.set(key, this._data[key]);
        }
      }

      if (false) {
        console.table(this._data);
      }
    }
  }]);

  return StorageManager;
}(_Singleton3.default);

exports.default = StorageManager;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Simple 9 sliced frame
 * @description makes a frame with rounded corners provided by the spritesheet given.
 * note when loading the spriteSheet set the tile width and height to the largest corner
 * rotation is not yet correctly pivoted.
 *
 * Added logic to add a dropshadow to the frame, the color and distance for this shadow can be set.
 * Added logic to set the anchor point of the frame.
 * */

var Frame = function (_Phaser$Group) {
  _inherits(Frame, _Phaser$Group);

  function Frame(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        _ref$cornerRadius = _ref.cornerRadius,
        cornerRadius = _ref$cornerRadius === undefined ? 1 : _ref$cornerRadius,
        _ref$alpha = _ref.alpha,
        alpha = _ref$alpha === undefined ? 1 : _ref$alpha,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 0xFFFFFF : _ref$color,
        _ref$key = _ref.key,
        key = _ref$key === undefined ? 'bgFrame' : _ref$key,
        _ref$useDropShadow = _ref.useDropShadow,
        useDropShadow = _ref$useDropShadow === undefined ? false : _ref$useDropShadow,
        _ref$dropShadowColor = _ref.dropShadowColor,
        dropShadowColor = _ref$dropShadowColor === undefined ? 0x000000 : _ref$dropShadowColor,
        _ref$dropShadowDistan = _ref.dropShadowDistance,
        dropShadowDistance = _ref$dropShadowDistan === undefined ? 10 : _ref$dropShadowDistan,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0.5 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0.5 : _ref$anchorY;

    _classCallCheck(this, Frame);

    var _this = _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this, game));

    _this.frameSize = game.cache.getImage(key, true).frameHeight;

    _this.x = x;
    _this.y = y;
    _this.totalWidth = width;
    _this.totalHeight = height;

    _this.useDropShadow = useDropShadow;
    _this.dropShadowColor = dropShadowColor;
    _this.dropShadowDistance = dropShadowDistance;

    var sizeX = 1;
    var sizeY = 1;

    if (width >= _this.frameSize * 2) {
      _this.frameWidth = width / _this.frameSize - 2 * cornerRadius;
    } else {
      _this.frameWidth = 2 - 2 * cornerRadius;
      sizeX = width / (_this.frameSize * 2);
    }
    if (height >= _this.frameSize * 2) {
      _this.frameHeight = height / _this.frameSize - 2 * cornerRadius;
    } else {
      _this.frameHeight = 2 - 2 * cornerRadius;
      sizeY = height / (_this.frameSize * 2);
    }
    _this.scale.setTo(sizeX, sizeY);

    _this.cornerRadius = cornerRadius;
    _this.alpha = alpha;
    _this.color = color;
    _this.key = key;

    if (useDropShadow) {
      _this.shadowGroup = new _phaser2.default.Group(game);
      _this.add(_this.shadowGroup);
    }
    _this.frameGroup = new _phaser2.default.Group(game);
    _this.add(_this.frameGroup);
    _this.setAnchor(anchorX, anchorY);

    _this.createFrame();
    _this.frameGroup.setAll('tint', _this.color);
    if (useDropShadow) {
      _this.shadowGroup.setAll('tint', dropShadowColor);
    }
    return _this;
  }

  _createClass(Frame, [{
    key: 'createFrame',
    value: function createFrame() {
      this.center = new _Sprite2.default({
        asset: this.key,
        anchorX: 0.5,
        anchorY: 0.5,
        x: 0,
        y: 0,
        scaleX: this.frameWidth,
        scaleY: this.frameHeight,
        frame: 4
      });
      this.sideTop = new _Sprite2.default({
        asset: this.key,
        scaleX: this.frameWidth,
        scaleY: this.cornerRadius,
        frame: 1
      });
      this.sideBottom = new _Sprite2.default({
        asset: this.key,
        scaleX: this.frameWidth,
        scaleY: this.cornerRadius,
        frame: 7
      });
      this.sideLeft = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.frameHeight,
        frame: 3
      });
      this.sideRight = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.frameHeight,
        frame: 5
      });

      this.cornerTopLeft = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 0
      });
      this.cornerTopRight = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 2
      });
      this.cornerBottomLeft = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 6
      });
      this.cornerBottomRight = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 8
      });

      this.sideTop.alignTo(this.center, _phaser2.default.TOP_CENTER);
      this.sideBottom.alignTo(this.center, _phaser2.default.BOTTOM_CENTER);
      this.sideLeft.alignTo(this.center, _phaser2.default.LEFT_CENTER);
      this.sideRight.alignTo(this.center, _phaser2.default.RIGHT_CENTER);

      this.cornerTopLeft.alignTo(this.sideTop, _phaser2.default.LEFT_CENTER);
      this.cornerTopRight.alignTo(this.sideTop, _phaser2.default.RIGHT_CENTER);
      this.cornerBottomLeft.alignTo(this.sideBottom, _phaser2.default.LEFT_CENTER);
      this.cornerBottomRight.alignTo(this.sideBottom, _phaser2.default.RIGHT_CENTER);

      var amount = 1;

      // Made it seamless
      this.sideTop.y += amount;
      this.sideBottom.y -= amount;
      this.sideLeft.x += amount;
      this.sideRight.x -= amount;

      this.cornerBottomLeft.y -= amount;
      this.cornerBottomLeft.x += amount;
      this.cornerBottomRight.y -= amount;
      this.cornerBottomRight.x -= amount;
      this.cornerTopLeft.y += amount;
      this.cornerTopLeft.x += amount;
      this.cornerTopRight.y += amount;
      this.cornerTopRight.x -= amount;

      if (this.useDropShadow) {
        this.addDropShadow();
      }

      this.frameGroup.addMultiple([this.center, this.sideTop, this.sideBottom, this.sideLeft, this.sideRight, this.cornerTopRight, this.cornerTopLeft, this.cornerBottomLeft, this.cornerBottomRight]);
    }
  }, {
    key: 'addDropShadow',
    value: function addDropShadow() {
      this.dropShadowBottomLeft = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 6,
        x: this.cornerBottomLeft.x,
        y: this.cornerBottomLeft.y + this.dropShadowDistance
      });
      this.dropShadowBottomCenter = new _Sprite2.default({
        asset: this.key,
        scaleX: this.frameWidth,
        scaleY: this.cornerRadius,
        frame: 7,
        x: this.sideBottom.x,
        y: this.sideBottom.y + this.dropShadowDistance
      });
      this.dropShadowBottomRight = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.cornerRadius,
        frame: 8,
        x: this.cornerBottomRight.x,
        y: this.cornerBottomRight.y + this.dropShadowDistance
      });
      this.dropShadowLeft = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.frameHeight + this.dropShadowDistance / this.frameSize,
        frame: 3,
        x: this.sideLeft.x,
        y: this.sideLeft.y
      });
      this.dropShadowRight = new _Sprite2.default({
        asset: this.key,
        scaleX: this.cornerRadius,
        scaleY: this.frameHeight + this.dropShadowDistance / this.frameSize,
        frame: 5,
        x: this.sideRight.x,
        y: this.sideRight.y
      });
      this.dropShadowCenter = new _Sprite2.default({
        asset: this.key,
        anchorX: 0.5,
        anchorY: 0.5,
        x: 0,
        y: 0 + this.dropShadowDistance,
        scaleX: this.frameWidth,
        scaleY: this.frameHeight,
        frame: 4
      });

      this.shadowGroup.addMultiple([this.dropShadowLeft, this.dropShadowBottomLeft, this.dropShadowBottomCenter, this.dropShadowBottomRight, this.dropShadowRight, this.dropShadowCenter]);
    }
  }, {
    key: 'setAnchor',
    value: function setAnchor(x, y) {
      this.frameGroup.position.x = (0.5 - x) * this.totalWidth;
      this.frameGroup.position.y = (0.5 - y) * this.totalHeight;
      if (this.useDropShadow) {
        this.shadowGroup.x = (0.5 - x) * this.totalWidth;
        this.shadowGroup.y = (0.5 - y) * this.totalHeight;
      }
    }
  }, {
    key: 'enableShadow',
    value: function enableShadow(value) {
      this.shadowGroup.children.forEach(function (child) {
        child.visible = value;
      });
    }
  }, {
    key: 'setTint',
    value: function setTint(color) {
      this.frameGroup.setAll('tint', color);
    }
  }]);

  return Frame;
}(_phaser2.default.Group);

exports.default = Frame;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(62);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(63);
var createDesc = __webpack_require__(40);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(111);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(4);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(26);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(23);
var IObject = __webpack_require__(62);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var asc = __webpack_require__(103);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _GameOverScreen = __webpack_require__(368);

var _GameOverScreen2 = _interopRequireDefault(_GameOverScreen);

var _PauseScreen = __webpack_require__(369);

var _PauseScreen2 = _interopRequireDefault(_PauseScreen);

var _NoAdScreen = __webpack_require__(370);

var _NoAdScreen2 = _interopRequireDefault(_NoAdScreen);

var _ShopScreen = __webpack_require__(371);

var _ShopScreen2 = _interopRequireDefault(_ShopScreen);

var _AchievementsScreen = __webpack_require__(375);

var _AchievementsScreen2 = _interopRequireDefault(_AchievementsScreen);

var _LeaderboardScreen = __webpack_require__(376);

var _LeaderboardScreen2 = _interopRequireDefault(_LeaderboardScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Screen manager class

This class makes sure that only one screen is opened at a time. Add screens made
with the screen class to the buildscreens method.
 */
var ScreenManager = function (_Singleton) {
  _inherits(ScreenManager, _Singleton);

  function ScreenManager(game) {
    _classCallCheck(this, ScreenManager);

    var _this = _possibleConstructorReturn(this, (ScreenManager.__proto__ || Object.getPrototypeOf(ScreenManager)).call(this, game));

    _this.screenList = [];
    _this.activeScreen = null;
    _this.previousScreen = null;
    return _this;
  }

  _createClass(ScreenManager, [{
    key: 'buildScreens',
    value: function buildScreens() {
      this.shopScreen = new _ShopScreen2.default({});
      this.screenList.push(this.shopScreen);
      this.shopScreen.visible = false;

      this.achievementsScreen = new _AchievementsScreen2.default();
      this.screenList.push(this.achievementsScreen);
      this.achievementsScreen.visible = false;

      this.leaderboardScreen = new _LeaderboardScreen2.default({});
      this.screenList.push(this.leaderboardScreen);
      this.leaderboardScreen.visible = false;

      this.gameOverScreen = new _GameOverScreen2.default({});
      this.screenList.push(this.gameOverScreen);
      this.gameOverScreen.visible = false;

      this.pauseScreen = new _PauseScreen2.default({});
      this.screenList.push(this.pauseScreen);
      this.pauseScreen.visible = false;

      this.noAdScreen = new _NoAdScreen2.default({});
      this.screenList.push(this.noAdScreen);
      this.noAdScreen.visible = false;

      game.world.removeChild(this.shopScreen);
      game.world.removeChild(this.gameOverScreen);
      game.world.removeChild(this.pauseScreen);
      game.world.removeChild(this.noAdScreen);
    }
  }, {
    key: 'openScreen',
    value: function openScreen(screen) {
      if (this.activeScreen == null) {
        this.activeScreen = screen;
      } else {
        this.previousScreen = this.activeScreen;
      }
      game.ui.isScreenOpen = true;
      for (var i = 0; i < this.screenList.length; i += 1) {
        if (this.screenList[i].name === screen) {
          this.screenList[i].visible = true;
          game.world.addChild(this.screenList[i]);

          this.activeScreen = this.screenList[i];
          this.screenList[i].openScreenAnimation();
          game.ui.hideUI();
        } else {
          this.screenList[i].visible = false;
        }
      }
    }
  }, {
    key: 'openPreviousScreen',
    value: function openPreviousScreen() {
      this.openScreen(this.previousScreen.name);
    }
  }, {
    key: 'closeScreen',
    value: function closeScreen() {
      // game.ui.xpBar.close();
      if (this.activeScreen) {
        this.activeScreen.visible = false;
        game.world.removeChild(this.activeScreen);
      } else {
        console.warn('no active screen');
      }

      this.activeScreen = null;
      game.ui.isScreenOpen = false;

      game.ui.showUI();
    }
  }]);

  return ScreenManager;
}(_Singleton3.default);

exports.default = ScreenManager;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(42);
  var global = __webpack_require__(3);
  var fails = __webpack_require__(4);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(78);
  var $buffer = __webpack_require__(109);
  var ctx = __webpack_require__(23);
  var anInstance = __webpack_require__(48);
  var propertyDesc = __webpack_require__(40);
  var hide = __webpack_require__(15);
  var redefineAll = __webpack_require__(50);
  var toInteger = __webpack_require__(29);
  var toLength = __webpack_require__(9);
  var toIndex = __webpack_require__(137);
  var toAbsoluteIndex = __webpack_require__(44);
  var toPrimitive = __webpack_require__(27);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(64);
  var isObject = __webpack_require__(5);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(100);
  var create = __webpack_require__(45);
  var getPrototypeOf = __webpack_require__(22);
  var gOPN = __webpack_require__(46).f;
  var getIterFn = __webpack_require__(102);
  var uid = __webpack_require__(41);
  var wks = __webpack_require__(6);
  var createArrayMethod = __webpack_require__(31);
  var createArrayIncludes = __webpack_require__(69);
  var speciesConstructor = __webpack_require__(76);
  var ArrayIterators = __webpack_require__(105);
  var Iterators = __webpack_require__(57);
  var $iterDetect = __webpack_require__(73);
  var setSpecies = __webpack_require__(47);
  var arrayFill = __webpack_require__(104);
  var arrayCopyWithin = __webpack_require__(127);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(21);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(132);
var $export = __webpack_require__(0);
var shared = __webpack_require__(68)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(135))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Frame2 = __webpack_require__(19);

var _Frame3 = _interopRequireDefault(_Frame2);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Frame button class

creates a button with a 9-sliced image as background. A drop shadow can also be set
on this background. Icons and text can be put onto the background and they will automatically
position them to fit them on the button.
*/

var FrameButton = function (_Frame) {
  _inherits(FrameButton, _Frame);

  function FrameButton(_ref) {
    var _ref$key = _ref.key,
        key = _ref$key === undefined ? 'bgFrame' : _ref$key,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        _ref$textX = _ref.textX,
        textX = _ref$textX === undefined ? 0 : _ref$textX,
        _ref$textY = _ref.textY,
        textY = _ref$textY === undefined ? 0 : _ref$textY,
        _ref$cornerRadius = _ref.cornerRadius,
        cornerRadius = _ref$cornerRadius === undefined ? 0.3 : _ref$cornerRadius,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === undefined ? 30 : _ref$fontSize,
        _ref$iconImage = _ref.iconImage,
        iconImage = _ref$iconImage === undefined ? '' : _ref$iconImage,
        _ref$iconSize = _ref.iconSize,
        iconSize = _ref$iconSize === undefined ? 1 : _ref$iconSize,
        _ref$useDropShadow = _ref.useDropShadow,
        useDropShadow = _ref$useDropShadow === undefined ? true : _ref$useDropShadow,
        _ref$dropShadowColor = _ref.dropShadowColor,
        dropShadowColor = _ref$dropShadowColor === undefined ? 0xcf1d0c : _ref$dropShadowColor,
        _ref$sfx = _ref.sfx,
        sfx = _ref$sfx === undefined ? 'button' : _ref$sfx,
        x = _ref.x,
        y = _ref.y,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 300 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 100 : _ref$height,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === undefined ? false : _ref$disabled,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 0xff4800 : _ref$color,
        _ref$colorDisable = _ref.colorDisable,
        colorDisable = _ref$colorDisable === undefined ? color : _ref$colorDisable,
        _ref$colorDown = _ref.colorDown,
        colorDown = _ref$colorDown === undefined ? dropShadowColor : _ref$colorDown,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? true : _ref$inputEnabled,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0.5 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0.5 : _ref$anchorY,
        _ref$dropShadowColorD = _ref.dropShadowColorDisable,
        dropShadowColorDisable = _ref$dropShadowColorD === undefined ? colorDisable : _ref$dropShadowColorD,
        _ref$textColor = _ref.textColor,
        textColor = _ref$textColor === undefined ? '#FFFFFF' : _ref$textColor,
        iconAnchorX = _ref.iconAnchorX,
        iconAnchorY = _ref.iconAnchorY,
        dropShadowDistance = _ref.dropShadowDistance;

    _classCallCheck(this, FrameButton);

    var _this = _possibleConstructorReturn(this, (FrameButton.__proto__ || Object.getPrototypeOf(FrameButton)).call(this, {
      x: x, y: y, key: key, width: width, height: height, cornerRadius: cornerRadius, color: color, useDropShadow: useDropShadow, dropShadowColor: dropShadowColor, anchorX: anchorX, anchorY: anchorY, dropShadowDistance: dropShadowDistance
    }));

    _this.width = width;
    _this.buildText(text, fontSize, textColor, textX, textY);
    if (iconImage !== '') {
      _this.buildIcon(iconImage, iconSize, iconAnchorX, iconAnchorY);
    }

    _this.colorList = { default: color, down: colorDown, disable: colorDisable };
    _this.dropShadowColorList = { default: dropShadowColor, down: dropShadowColor, disable: dropShadowColorDisable };
    _this.state = { default: 1, down: 2, disable: 3 };
    Object.freeze(_this.state);

    _this.currentState = _this.state.default;

    if (disabled) {
      _this.doDisable();
    }

    if (sfx !== 'button') {
      // this.sfx = game.soundManager.getSound(sfx);
    }
    _this.sfx = game.soundManager.getSound(sfx);

    _this.autoCull = false;
    // this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.inputEnableChildren = inputEnabled;
    _this.smoothed = true;

    for (var i = 0; i < _this.frameGroup.children.length; i += 1) {
      _this.frameGroup.children[i].inputEnabled = true;
      _this.frameGroup.children[i].events.onInputUp.add(function () {
        _this.changeState('default');
        if (_this.sfx) {
          _this.sfx.play();
        }
        _this.checkIfClickAble();
      });

      _this.frameGroup.children[i].events.onInputDown.add(function () {
        _this.changeState('down');
        // this.sfx.play();
      });
    }
    _this.setAnchor(anchorX, anchorY);
    return _this;
  }

  _createClass(FrameButton, [{
    key: 'doDisable',
    value: function doDisable() {
      this.changeState('disable');
    }
  }, {
    key: 'doEnable',
    value: function doEnable() {
      this.currentState = this.state.default;
      this.frameGroup.setAll('tint', this.colorList.default);
      this.shadowGroup.setAll('tint', this.dropShadowColorList.default);
    }
  }, {
    key: 'changeState',
    value: function changeState(state) {
      if (this.currentState === this.state.disable) {
        return;
      }

      switch (state) {
        case 'default':
          this.currentState = this.state.default;
          this.frameGroup.setAll('tint', this.colorList.default);
          this.shadowGroup.setAll('tint', this.dropShadowColorList.default);
          break;
        case 'down':
          this.currentState = this.state.down;
          this.frameGroup.setAll('tint', this.colorList.down);
          this.shadowGroup.setAll('tint', this.dropShadowColorList.down);
          break;
        case 'disable':
          this.currentState = this.state.disable;
          this.frameGroup.setAll('tint', this.colorList.disable);
          this.shadowGroup.setAll('tint', this.dropShadowColorList.disable);
          break;
        default:
          this.currentState = this.state.default;
          this.frameGroup.setAll('tint', this.colorList.default);
          this.shadowGroup.setAll('tint', this.dropShadowColorList.default);
          break;
      }
    }

    // Empty shell. Override this methode

  }, {
    key: 'doOnClick',
    value: function doOnClick() {}
    // console.warn('doOnClick is empty!');


    // Empty shell. Override this methode

  }, {
    key: 'doOnClickDisabled',
    value: function doOnClickDisabled() {
      console.info('doOnClickDisabled is empty!');
    }
  }, {
    key: 'checkIfClickAble',
    value: function checkIfClickAble() {
      if (this.currentState !== this.state.disable) {
        this.doOnClick();
        return;
      }

      this.doOnClickDisabled();
    }
  }, {
    key: 'buildText',
    value: function buildText(text, fontSize, textColor, textX, textY) {
      this.buttonText = new _Text2.default({
        text: text,
        x: textX,
        y: textY,
        color: textColor,
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: fontSize,
        wordWrap: true,
        wordWrapWidth: this.width
      });
      this.buttonText.lineSpacing = -5;
      this.add(this.buttonText);
    }
  }, {
    key: 'buildIcon',
    value: function buildIcon(frame, size) {
      var anchorX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
      var anchorY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;

      this.iconImage = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: frame,
        x: 0,
        y: 0,
        anchorX: anchorX,
        anchorY: anchorY
      });
      this.iconImage.scale.setTo(size, size);
      this.add(this.iconImage);
      this.buttonText.wordWrapWidth -= this.iconImage.width;
    }
  }, {
    key: 'setAnchor',
    value: function setAnchor(x, y) {
      _get(FrameButton.prototype.__proto__ || Object.getPrototypeOf(FrameButton.prototype), 'setAnchor', this).call(this, x, y);
      if (this.iconImage) {
        this.iconImage.x = (0.5 - x) * this.totalWidth - (this.buttonText.width / 4 + (this.buttonText.text === '' ? 0 : 10));
        this.iconImage.y = (0.5 - y) * this.totalHeight;
      }
      if (this.buttonText) {
        // this.buttonText.x = (0.5 - x) * this.totalWidth;
        // this.buttonText.y = (0.5 - y) * this.totalHeight;
        // if (this.iconImage) {
        //   this.buttonText.x = (0.5 - x) * this.totalWidth + this.iconImage.width / 2;
        // }
      }
    }
  }]);

  return FrameButton;
}(_Frame3.default);

exports.default = FrameButton;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(41)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(4)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(15)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var singleton = Symbol('singleton');

/**
 * This is the super class singleton. Inherit this class if you want to create a singleton
 * You can either use [SUBCLASS_NAME].instance or new [SUBCLASS_NAME], but [SUBCLASS_NAME].instance
 * is preferred, because no new instance is created.
 */

var Singleton = function () {
  _createClass(Singleton, null, [{
    key: 'instance',
    get: function get() {
      if (!this[singleton]) {
        this[singleton] = new this();
      }

      return this[singleton];
    }
  }]);

  function Singleton() {
    _classCallCheck(this, Singleton);

    var Class = this.constructor;

    if (!Class[singleton]) {
      Class[singleton] = this;
    }

    return Class[singleton];
  }

  return Singleton;
}();

exports.default = Singleton;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FamobiAPI = function (_Singleton) {
  _inherits(FamobiAPI, _Singleton);

  function FamobiAPI() {
    _classCallCheck(this, FamobiAPI);

    var _this = _possibleConstructorReturn(this, (FamobiAPI.__proto__ || Object.getPrototypeOf(FamobiAPI)).call(this));

    _this.init();
    return _this;
  }

  _createClass(FamobiAPI, [{
    key: 'init',
    value: function init() {
      window.famobi = window.famobi || {};
    }
  }, {
    key: 'hasFeature',
    value: function hasFeature(feature) {
      console.log(feature);
      if (!window.famobi || !window.famobi.hasFeature) {
        return true;
      }
      return window.famobi.hasFeature(feature);
    }

    /**
     * Returns a relative path to the final branding button. For an absolute path use the parameter "true".
     * The size of the image ALWAYS has to be 600 x 253px. Therefore, you have to scale it using your engine/ framework only.
     * Please note: In some cases, the button is transparent or invisible; don't combine it with any GUI elements!
     *
     * @returns {string} Path of the image.
     */

  }, {
    key: 'getMoreGamesButtonImage',
    value: function getMoreGamesButtonImage() {
      if (!window.famobi || !window.famobi.getMoreGamesButtonImage) {
        return '';
      }
      return window.famobi.getMoreGamesButtonImage();
    }

    /**
     * Opens the branding placeholder URL.
     *
     * Important: It does NOT return a URL, so don't use it with window.open or location.href!
     */

  }, {
    key: 'moreGamesLink',
    value: function moreGamesLink() {
      if (!window.famobi || !window.famobi.moreGamesLink) {
        return;
      }
      window.famobi.moreGamesLink();
    }

    /**
     * Important: The game MUST NOT contain rewarded ad features!
     *
     * Regardless of the use of Famobi Analytics trackEvent calls, make sure to use this call
     * at typical breaks (e.g.: Pause, Retry, Continue, Menu...)
     * Important: Ads will only be shown in a given interval controlled by our API (usually every 60 to 90 seconds).
     *
     * @param {Function} callback - Callback called after watching an ad.
     * @param {*} context - Context of the callback.
     */

  }, {
    key: 'showAd',
    value: function showAd(callback, context) {
      if (!window.famobi || !window.famobi.showAd) {
        callback.call(context);
        return;
      }
      window.famobi.showAd(callback.bind(context));
    }
  }, {
    key: 'hasRewardedAd',
    value: function hasRewardedAd() {
      return window.GameInterface.isRewardedAdAvailable("button:result:revive");
    }
  }, {
    key: 'showRewardedAd',
    value: function showRewardedAd(callback, context) {
      if (!window.famobi || !window.famobi.showRewardedAd) {
        callback.call(context, { rewardGranted: true });
        return;
      }
      window.famobi.rewardedAd(callback.bind(context));
    }

    /**
     * Function that pauses/mutes the game
     *
     * @param {Function} onPauseFunction - Function that is executed before an ad.
     */

  }, {
    key: 'setOnPauseRequested',
    value: function setOnPauseRequested(onPauseFunction) {
      if (!window.famobi || !window.famobi_onPauseRequested) {
        return;
      }
      window.famobi_onPauseRequested = onPauseFunction;
    }

    /**
     * Function that unpauses/unmutes the game
     *
     * @param {Function} onResumeFunction - Function that is executed after an ad.
     */

  }, {
    key: 'setOnResumeRequested',
    value: function setOnResumeRequested(onResumeFunction) {
      if (!window.famobi || !window.famobi_onResumeRequested) {
        return;
      }
      window.famobi_onResumeRequested = onResumeFunction;
    }

    // endregion

    // region ------------------ LOCALISATION ------------------
    /**
     * Returns a corresponding value string associated with the famobi.json.
     * If there's no key either in the current language or in the "default" section, null is returned.
     *
     * @param {string} key - Unique key of the text.
     * @returns {string|null} Value of the key.
     */

  }, {
    key: 'get',
    value: function get(key) {
      if (!window.famobi || !window.famobi.__) {
        return key;
      }
      return window.famobi.__(key) || key;
    }

    /**
     * Returns the current language code (two letters, lower-case).
     * Important: This function should be used as an exception only.
     * In 99% of the cases window.famobi.__(key) is sufficient.
     * The trick is just to limit your game to one language and use its texts as translation keys.
     *
     * @returns {string} Current language code (two letters, lower-case).
     */

  }, {
    key: 'getCurrentLanguage',
    value: function getCurrentLanguage() {
      if (!window.famobi || !window.famobi.getCurrentLanguage) {
        return '';
      }
      return window.famobi.getCurrentLanguage();
    }

    /**
     * Set local storage item.
     *
     * @param {string} key - Key of the value.
     * @param {*} value - Value that needs to be saved.
     */

  }, {
    key: 'setLocalStorageItem',
    value: function setLocalStorageItem(key, value) {
      window.GameInterface.storage.setItem(key, value);
    }

    /**
     * Get local storage item.
     *
     * @param {string} key - Key of the value.
     */

  }, {
    key: 'getLocalStorageItem',
    value: function getLocalStorageItem(key) {
      return window.GameInterface.storage.getItem(key);
    }

    /**
     * Remove the locale storage item.
     *
     * @param {string} key - Key of the value.
     */

  }, {
    key: 'removeLocalStorageItem',
    value: function removeLocalStorageItem(key) {
      if (!window.famobi || !window.famobi.localStorage) {
        return;
      }
      window.famobi.localStorage.removeItem(key);
    }

    /**
     * Remove the whole locale storage.
     */

  }, {
    key: 'clearLocalStorage',
    value: function clearLocalStorage() {
      if (!window.famobi || !window.famobi.localStorage) {
        return;
      }
      window.famobi.localStorage.clear();
    }

    /**
     * Set session storage item.
     *
     * @param {string} key - Key of the value.
     * @param {*} value - Value that needs to be saved.
     */

  }, {
    key: 'setSessionStorageItem',
    value: function setSessionStorageItem(key, value) {
      if (!window.famobi || !window.famobi.sessionStorage) {
        return;
      }
      window.famobi.sessionStorage.setItem(key, value);
    }

    /**
     * Get session storage item.
     *
     * @param {string} key - Key of the value.
     */

  }, {
    key: 'getSessionStorageItem',
    value: function getSessionStorageItem(key) {
      if (!window.famobi || !window.famobi.sessionStorage) {
        return;
      }
      window.famobi.sessionStorage.getItem(key);
    }

    /**
     * Remove the session storage item.
     *
     * @param {string} key - Key of the value.
     */

  }, {
    key: 'removeSessionStorageItemn',
    value: function removeSessionStorageItemn(key) {
      if (!window.famobi || !window.famobi.sessionStorage) {
        return;
      }
      window.famobi.sessionStorage.removeItem(key);
    }

    /**
     * Remove the whole session storage.
     */

  }, {
    key: 'clearSessionStorage',
    value: function clearSessionStorage() {
      if (!window.famobi || !window.famobi.sessionStorage) {
        return;
      }
      window.famobi.sessionStorage.clear();
    }

    /**
     * Get the current orientation.
     *
     * @returns {"landscape"|"portrait"|""} Orientation of the device.
     */

  }, {
    key: 'getOrientation',
    value: function getOrientation() {
      if (!window.famobi || !window.famobi.getOrientation) {
        return '';
      }
      return window.famobi.getOrientation();
    }

    /**
     * Set the callback when orientation is changed.
     *
     * @param {Function} callback - Callback called when the orientation is changed.
     * @param {*} context - Context of the callback.
     */

  }, {
    key: 'setOnOrientationChange',
    value: function setOnOrientationChange(callback, context) {
      if (!window.famobi || !window.famobi.onOrientationChange) {
        return;
      }
      window.famobi.onOrientationChange(callback.bind(context));
    }
  }, {
    key: 'trackStats',
    value: function trackStats(key, value) {
      if (!window.famobi || !window.famobi_analytics) {
        return;
      }
      window.famobi_analytics.trackStats(key, value);
    }
  }, {
    key: 'onRequest',
    value: function onRequest(name, callback) {
      if (!window.famobi || window.famobi.onRequest) {
        window.famobi.onRequest(name, callback);
      }
    }
  }]);

  return FamobiAPI;
}(_Singleton3.default);

exports.default = FamobiAPI;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(113);
var enumBugKeys = __webpack_require__(87);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(2);
var dPs = __webpack_require__(114);
var enumBugKeys = __webpack_require__(87);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(84)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(88).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(113);
var hiddenKeys = __webpack_require__(87).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var call = __webpack_require__(125);
var isArrayIter = __webpack_require__(100);
var anObject = __webpack_require__(2);
var toLength = __webpack_require__(9);
var getIterFn = __webpack_require__(102);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  BASE_GAME_HEIGHT: 1280,
  MAX_GAME_WIDTH: 3600,
  MIN_GAME_WIDTH: 500,
  MAX_ZOOM_IN: 0.6,
  GAME_WIDTH_START_ZOOM: 720
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Coin interactable gives the player coins
var Inventory = function (_Singleton) {
  _inherits(Inventory, _Singleton);

  function Inventory() {
    _classCallCheck(this, Inventory);

    var _this = _possibleConstructorReturn(this, (Inventory.__proto__ || Object.getPrototypeOf(Inventory)).call(this));

    _this.coins = _storageManager2.default.instance.get('coinTotal');
    _this.experience = _storageManager2.default.instance.get('experience');
    return _this;
  }

  _createClass(Inventory, [{
    key: 'addToType',
    value: function addToType(type) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!type || typeof this[type] === 'undefined') return console.warn('Type ' + type + ' is not valid');
      if (isNaN(amount)) {
        console.warn('Amount ' + amount + ' is not a number');
        return;
      }

      this[type] += amount;
      this.incrementStats(type);
      this.sendEvent(type);
    }
  }, {
    key: 'incrementStats',
    value: function incrementStats(type) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      switch (type) {
        case 'coins':
          _storageManager2.default.instance.set('coinTotal', this[type]);
          break;
        case 'experience':
          _storageManager2.default.instance.set('experience', this[type]);
          break;
      }
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(type) {
      switch (type) {
        case 'coins':
          game.updateCoins.dispatch(this.coins);
          break;
      }
    }
  }, {
    key: 'payCoins',
    value: function payCoins() {
      var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (isNaN(price)) {
        console.warn('Price ' + price + ' is not a number');
        return;
      }
      if (this.coins < price) {
        console.info('Not enough money');
        return;
      }
      this.coins -= price;
      var data = { coinTotal: this.coins };
      _storageManager2.default.instance.set('coinTotal', this.coins);
      game.updateCoins.dispatch(this.coins);
    }
  }, {
    key: 'isBuyableCoins',
    value: function isBuyableCoins(price) {
      return this.coins >= price;
    }
  }]);

  return Inventory;
}(_Singleton3.default);

exports.default = Inventory;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AchievementSystem = function (_Singleton) {
  _inherits(AchievementSystem, _Singleton);

  function AchievementSystem() {
    _classCallCheck(this, AchievementSystem);

    var _this = _possibleConstructorReturn(this, (AchievementSystem.__proto__ || Object.getPrototypeOf(AchievementSystem)).call(this));

    _this.achievementList = game.cache.getJSON('achievements');

    _this.saveData = _storageManager2.default.instance.get('achievements');

    var keys = Object.keys(_this.saveData);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      _famobiApi2.default.instance.trackStats(key, _this.saveData[key].progress);
    }
    return _this;
  }

  // returns achievement object from achievements.json


  _createClass(AchievementSystem, [{
    key: 'getAchievement',
    value: function getAchievement(type) {
      return this.achievementList[type];
    }

    // returns achievement save data object from famobi or fresh data

  }, {
    key: 'getAchievementData',
    value: function getAchievementData(type) {
      return this.saveData[type];
    }

    // Increase achievement progress, also works with non-cumulative achievements

  }, {
    key: 'incrementAchievementData',
    value: function incrementAchievementData(type, value) {
      var achievement = this.getAchievement(type);
      if (!achievement) return;
      var achievementData = this.getAchievementData(type);
      if (!achievementData) return;

      if (achievementData.step >= achievement.values.length) return;

      // different edge cases for each achievement type
      if (achievement.cumulative) {
        if (achievement.combo > 1) {
          // add 1 to score if goal is met
          if (value >= achievement.values[achievementData.step]) {
            this.setAchievementData(achievement, achievementData, achievementData.progress + 1);
          } else {
            this.resetProgress(achievementData);
          }
        } else {
          // directly add score
          this.setAchievementData(achievement, achievementData, achievementData.progress + value);
        }
      } else if (value > achievementData.progress) {
        // set new highest attempt
        this.setAchievementData(achievement, achievementData, value);
      }
    }

    // Hard set the achievement progress and check step increase

  }, {
    key: 'setAchievementData',
    value: function setAchievementData(achievement, achievementData, value) {
      achievementData.progress = value;
      // console.log(`Achievement ${achievement.type} progress: ${achievementData.progress}`)
      this.checkAchievementStep(achievement, achievementData);
      _storageManager2.default.instance.set('achievements', this.saveData);
      _famobiApi2.default.instance.trackStats(achievement.type, value);
    }

    // check progress and increase step

  }, {
    key: 'checkAchievementStep',
    value: function checkAchievementStep(achievement, achievementData) {
      var goal = achievement.combo > 1 ? achievement.combo : achievement.values[achievementData.step];
      while (achievementData.progress >= goal) {
        // console.log(`Achievement ${achievement.type} achieved`)
        achievementData.step += 1;
        goal = achievement.combo > 1 ? achievement.combo : achievement.values[achievementData.step];
        if (achievement.combo > 1) this.resetProgress(achievementData);
        game.achievementAttained.dispatch(achievement, achievementData);
        if (achievementData.step >= achievement.values.length) return;
      }
    }
  }, {
    key: 'resetProgress',
    value: function resetProgress(achievementData) {
      achievementData.progress = 0;
    }
  }, {
    key: 'getAchievementText',
    value: function getAchievementText(achievement, step) {
      return _LocalisationManager2.default.get(achievement.text, achievement.values[step]);
    }
  }, {
    key: 'getMedal',
    value: function getMedal(achievement, step) {
      var medalInfo = { medalFrame: '', iconFrame: '', iconColor: 0xffffff };
      switch (step) {
        case 0:
          medalInfo.medalFrame = 'ui_medal_empty.png';
          medalInfo.iconColor = 0x667096;
          break;
        case 1:
          medalInfo.medalFrame = 'ui_medal_bronze.png';
          medalInfo.iconColor = 0x824b00;
          break;
        case 2:
          medalInfo.medalFrame = 'ui_medal_silver.png';
          medalInfo.iconColor = 0x89adaf;
          break;
        case 3:
          medalInfo.medalFrame = 'ui_medal_gold.png';
          medalInfo.iconColor = 0x9e6c00;
          break;
      }
      medalInfo.iconFrame = 'ui_achievement_' + achievement.type + '.png';
      return medalInfo;
    }
  }]);

  return AchievementSystem;
}(_Singleton3.default);

exports.default = AchievementSystem;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalisationManager = function (_Singleton) {
  _inherits(LocalisationManager, _Singleton);

  function LocalisationManager() {
    _classCallCheck(this, LocalisationManager);

    return _possibleConstructorReturn(this, (LocalisationManager.__proto__ || Object.getPrototypeOf(LocalisationManager)).apply(this, arguments));
  }

  _createClass(LocalisationManager, null, [{
    key: 'get',
    value: function get(key, variables) {
      var string = _famobiApi2.default.instance.get(key);

      if (!string) {
        console.log('No string is found with the key', key);
        string = key;
      }

      if (variables) {
        if (Array.isArray(variables)) {
          var _string;

          string = (_string = string).format.apply(_string, _toConsumableArray(variables));
        } else {
          string = string.format(variables);
        }
      }

      return string;
    }
  }]);

  return LocalisationManager;
}(_Singleton3.default);

exports.default = LocalisationManager;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var fails = __webpack_require__(4);
var spaces = __webpack_require__(90);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = exports.shuffleArray = exports.imageKeyToBase64 = exports.getCanvas = exports.distance = exports.difference = exports.getTile = exports.isometricToCartesian = exports.cartesianToIsometric = exports.centerGameObjects = undefined;

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

// asks for a Phaser.Point with cartesian grid data and converts it into an isometric point
var cartesianToIsometric = exports.cartesianToIsometric = function cartesianToIsometric(x, y) {
  return { x: x - y, y: (x + y) / 2 };
};

// asks for a Phaser.Point with isometric grid data and converts it into an cartesian point
var isometricToCartesian = exports.isometricToCartesian = function isometricToCartesian(isometricPoint) {
  var cartesianPoint = new _phaser2.default.Point();
  cartesianPoint.x = (2 * isometricPoint.y + isometricPoint.x) / 2;
  cartesianPoint.y = (2 * isometricPoint.y - isometricPoint.x) / 2;
  return cartesianPoint;
};

var getTile = exports.getTile = function getTile(name, tileList) {
  for (var i = 0; i < tileList.length; i += 1) {
    if (tileList[i] && tileList[i].typeName === name) {
      return tileList[i];
    }
  }
  return console.error('error 404', name, 'not found in', tileList);
};

var difference = exports.difference = function difference(pNumber1, pNumber2) {
  return Math.abs(pNumber1 - pNumber2);
};

var distance = exports.distance = function distance(x1, y1, x2, y2) {
  var deltaX = difference(x1, x2);
  var deltaY = difference(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return dist;
};

var getCanvas = exports.getCanvas = function getCanvas(width, height) {
  if (game.messagecanvas) {
    // Using existing currently canvas for drawing.
    var ctx = game.messagecanvas.getContext('2d');

    game.messagecanvas.width = width;
    game.messagecanvas.height = height;
    ctx.clearRect(0, 0, game.messagecanvas.width, game.messagecanvas.height);

    return game.messagecanvas;
  }

  game.messagecanvas = document.createElement('canvas');
  game.messagecanvas.width = width;
  game.messagecanvas.height = height;

  return game.messagecanvas;
};

var imageKeyToBase64 = exports.imageKeyToBase64 = function imageKeyToBase64(imageKey) {
  var image = game.cache.getImage(imageKey);
  var canvas = getCanvas(image.width, image.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  var img3 = canvas.toDataURL('image/jpeg');
  return img3;
};

var shuffleArray = exports.shuffleArray = function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
};

var clamp = exports.clamp = function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Overlay = __webpack_require__(66);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

var _viewportManager = __webpack_require__(65);

var _viewportManager2 = _interopRequireDefault(_viewportManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Screen class

This class makes a screen that uses a frame with the correct color as a background, and adds
a back button to the screen. Use a name so the screen can be opened via the screen manager.
onScreenOpen, onOpenAnimationDone and onCloseAnimationDone can be overwritten respectively.
The callback after the animations are done can also be set.
 */
var Screen = function (_Phaser$Group) {
  _inherits(Screen, _Phaser$Group);

  function Screen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '' : _ref$name,
        _ref$backgroundImage = _ref.backgroundImage,
        backgroundImage = _ref$backgroundImage === undefined ? 'bgFrame' : _ref$backgroundImage,
        _ref$backgroundColor = _ref.backgroundColor,
        backgroundColor = _ref$backgroundColor === undefined ? 0xFEFEFE : _ref$backgroundColor,
        _ref$dropShadowColor = _ref.dropShadowColor,
        dropShadowColor = _ref$dropShadowColor === undefined ? 0x32374a : _ref$dropShadowColor,
        _ref$closeButtonImage = _ref.closeButtonImage,
        closeButtonImage = _ref$closeButtonImage === undefined ? 'ui_back_icon.png' : _ref$closeButtonImage,
        _ref$titleText = _ref.titleText,
        titleText = _ref$titleText === undefined ? '' : _ref$titleText,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 820 : _ref$screenHeight,
        _ref$titleIcon = _ref.titleIcon,
        titleIcon = _ref$titleIcon === undefined ? '' : _ref$titleIcon;

    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this, game));

    _this.screenHeight = screenHeight;
    _this.fixedToCamera = true;
    _this.contentGroup = new _phaser2.default.Group(game);
    _this.contentGroup.x = game.width / 2;
    _this.add(_this.contentGroup);

    if (name === '') {
      console.warn('The screen class needs a name for the screen manager to work.');
    }

    var title = titleText === '' ? name.toUpperCase() : titleText;
    _this.name = name;
    _this.overlay = new _Overlay2.default({
      alpha: 0.5,
      x: -_orientation2.default.MAX_GAME_WIDTH / 2,
      height: _orientation2.default.BASE_GAME_HEIGHT * 2
    });

    _this.contentGroup.add(_this.overlay);

    _this.buildBackground(backgroundImage, backgroundColor, dropShadowColor, screenHeight);
    _this.buildCloseButton(closeButtonImage);
    _this.buildTitleText(title, titleIcon);
    _this.visible = false;

    game.onResizeChange.add(_this.resize, _this);

    _this.resize();
    return _this;
  }

  _createClass(Screen, [{
    key: 'buildBackground',
    value: function buildBackground(backgroundImage, backgroundColor, dropShadowColor, screenHeight) {
      var width = 600;
      this.backgroundImage = new _Frame2.default({
        x: 0,
        y: 700,
        width: width,
        height: screenHeight,
        key: 'bgFrame',
        cornerRadius: 0.4,
        dropShadowColor: dropShadowColor,
        color: backgroundColor,
        useDropShadow: true
      });
      this.contentGroup.add(this.backgroundImage);

      this.inputOverlay = new _Overlay2.default({
        height: screenHeight,
        width: width,
        alpha: 0,
        x: -width / 2,
        y: game.height / 2 + 50 - screenHeight / 2
      });
      this.inputOverlay.anchor.set(0.5, 0.5);
      this.contentGroup.add(this.inputOverlay);

      this.titleBackgroundImage = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_title_banner.png',
        x: 0,
        y: this.backgroundImage.y - this.backgroundImage.height / 2,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.titleBackgroundImage.setScaleMinMax(0.56, 0.56);
      this.contentGroup.add(this.titleBackgroundImage);
    }
  }, {
    key: 'buildCloseButton',
    value: function buildCloseButton(closeButtonImage) {
      var _this2 = this;

      this.closeButton = new _FrameButton2.default({
        iconImage: closeButtonImage,
        x: 60,
        y: game.height - 70,
        inputEnabled: true,
        width: 80,
        height: 80,
        cornerRadius: 1,
        iconSize: 0.6
      });
      this.add(this.closeButton);

      this.closeButton.doOnClick = function () {
        _this2.closeScreenAnimation();
      };

      this.overlay.events.onInputUp.add(function () {
        _this2.closeScreenAnimation();
      });
    }
  }, {
    key: 'buildTitleText',
    value: function buildTitleText(text, icon) {
      this.titleText = new _Text2.default({
        text: '',
        x: 0,
        y: this.backgroundImage.y - this.backgroundImage.height / 2 - 26,
        color: '#ff4800',
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 40,
        maxWidth: 1100
      });
      this.contentGroup.add(this.titleText);

      this.titleIcon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: icon,
        x: 0,
        y: this.backgroundImage.y - this.backgroundImage.height / 2 - 26,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.85,
        scaleY: 0.85
      });
      // this.titleIcon.tint = 0xff4800;
      this.contentGroup.add(this.titleIcon);
    }
  }, {
    key: 'openScreenAnimation',
    value: function openScreenAnimation() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        _this3.onOpenAnimationDone();
      };
      var context = arguments[1];

      this.onScreenOpen();
      this.contentGroup.y = -0;
      var tOpen = this.game.add.tween(this.contentGroup).from({ y: -800 }, 200, _phaser2.default.Easing.Bounce.Out, false);
      tOpen.onComplete.add(function () {
        callback.call(context);
      });
      tOpen.start();
    }
  }, {
    key: 'closeScreenAnimation',
    value: function closeScreenAnimation() {
      var _this4 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        _this4.onCloseAnimationDone();
      };
      var context = arguments[1];

      var tClose = this.game.add.tween(this.contentGroup).to({ y: -1200 }, 100, _phaser2.default.Easing.Default, false);
      tClose.onComplete.add(function () {
        callback.call(context);
      });
      tClose.start();
    }
  }, {
    key: 'onCloseAnimationDone',
    value: function onCloseAnimationDone() {
      _ScreenManager2.default.instance.closeScreen();
    }
  }, {
    key: 'onOpenAnimationDone',
    value: function onOpenAnimationDone() {
      // This method can be overwritten for  things that need to be
      // activated when the screen is opened
    }
  }, {
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      // This method can be overwritten for things that need to happen
      // before the animation starts.
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.contentGroup.x = game.width / 2;

      if (this.closeButton) {
        this.closeButton.y = game.height - 70;
      }
      // this.backgroundImage.y = game.world.height / 2 + 50;
      this.contentGroup.scale.setTo(_viewportManager2.default.instance.zoomIn);
    }
  }]);

  return Screen;
}(_phaser2.default.Group);

exports.default = Screen;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Coin display class
creates a standard container with the amount of coins that the player has in it.
The amount updates automatically. This class should be used on multiple screens
 */
var CoinDisplay = function (_Phaser$Group) {
  _inherits(CoinDisplay, _Phaser$Group);

  function CoinDisplay(x, y) {
    _classCallCheck(this, CoinDisplay);

    var _this = _possibleConstructorReturn(this, (CoinDisplay.__proto__ || Object.getPrototypeOf(CoinDisplay)).call(this, game));

    _this.x = x;
    _this.y = y;

    game.updateCoins.add(function () {
      _this.updateCoinAmount();
    });

    game.onResizeChange.add(function () {
      _this.resize();
    });

    _this.buildCurrencyDisplay();
    _this.resize();
    return _this;
  }

  _createClass(CoinDisplay, [{
    key: 'buildCurrencyDisplay',
    value: function buildCurrencyDisplay() {
      this.currencyFrame = new _Frame2.default({
        x: 0,
        y: 0,
        width: 155,
        height: 70,
        cornerRadius: 0.5,
        color: 0x32374a
      });
      this.add(this.currencyFrame);

      this.currencyValue = new _phaser.BitmapText(game, -25, 0, 'font', String(_Inventory2.default.instance.coins), 35);
      this.currencyValue.anchor.set(0, 0.5);

      this.add(this.currencyValue);

      this.currencyIcon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_coin.png',
        anchorX: 0.5,
        anchorY: 0.5,
        x: this.currencyFrame.x - this.currencyFrame.width / 2 + 25,
        y: 2
      });
      this.currencyIcon.scale.set(0.55);
      this.add(this.currencyIcon);
    }
  }, {
    key: 'updateCoinAmount',
    value: function updateCoinAmount() {
      this.currencyValue.text = String(_Inventory2.default.instance.coins);
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = game.width - 100;

      var scale = game.width / 900;

      if (scale < 1) {
        this.scale.setTo(scale);
      } else {
        this.scale.setTo(1);
      }
    }
  }]);

  return CoinDisplay;
}(_phaser2.default.Group);

exports.default = CoinDisplay;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

var _utils = __webpack_require__(59);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewportManager = function (_Singleton) {
  _inherits(ViewportManager, _Singleton);

  function ViewportManager() {
    _classCallCheck(this, ViewportManager);

    return _possibleConstructorReturn(this, (ViewportManager.__proto__ || Object.getPrototypeOf(ViewportManager)).apply(this, arguments));
  }

  _createClass(ViewportManager, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      _famobiApi2.default.instance.setOnOrientationChange(function () {
        _this2.onSizeChange();
      });

      game.scale.setResizeCallback(this.onResize, this);

      game.onResizeChange = new Phaser.Signal();
    }
  }, {
    key: "onSizeChange",
    value: function onSizeChange() {
      this.resizeGame();
      game.state.resize(this.gameWidth, this.gameHeight);
    }
  }, {
    key: "resizeGame",
    value: function resizeGame() {
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;

      this.gameHeight = _orientation2.default.BASE_GAME_HEIGHT;
      var scale = innerWidth / innerHeight;
      this.prevWindowWidth = innerWidth;
      this.prevWindowHeight = innerHeight;
      this.gameWidth = (0, _utils.clamp)(this.gameHeight * scale, _orientation2.default.MIN_GAME_WIDTH, _orientation2.default.MAX_GAME_WIDTH);

      this.zoomIn = 1;

      if (this.gameWidth > _orientation2.default.GAME_WIDTH_START_ZOOM) {
        this.zoomIn = 1 - (this.gameWidth - _orientation2.default.GAME_WIDTH_START_ZOOM) / (_orientation2.default.MAX_GAME_WIDTH - _orientation2.default.GAME_WIDTH_START_ZOOM) * _orientation2.default.MAX_ZOOM_IN;
      }

      game.scale.setGameSize(this.gameWidth * this.zoomIn, this.gameHeight * this.zoomIn);

      game.onResizeChange.dispatch();

      if (game.player) {
        game.camera.reset();
        game.camera.bounds.setTo(-game.world.centerX, undefined, game.world.width);

        game.camera.follow(game.player.cameraFocusPoint, Phaser.Camera.FOLLOW_LOCKON, 1, 1);
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var innerWidth = window.innerWidth;
      var innerHeight = window.innerHeight;
      this.prevWindowWidth === innerWidth && this.prevWindowHeight === innerHeight || this.onSizeChange();
      var canvas = game.canvas;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    }
  }]);

  return ViewportManager;
}(_Singleton3.default);

exports.default = ViewportManager;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Places an overlay over the game screen, alpha and color can be set
var Overlay = function (_Phaser$Graphics) {
  _inherits(Overlay, _Phaser$Graphics);

  function Overlay(_ref) {
    var lineStyle = _ref.lineStyle,
        color = _ref.color,
        alpha = _ref.alpha,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? _orientation2.default.MAX_GAME_WIDTH : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? game.height : _ref$height,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? true : _ref$inputEnabled,
        _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible;

    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, game));

    _this.x = x;
    _this.y = y;

    _this.lineStyle(lineStyle);
    _this.beginFill(color);
    _this.drawRect(0, 0, width, height);
    _this.endFill();

    _this.alpha = alpha;
    _this.inputEnabled = inputEnabled;
    _this.visible = visible;
    return _this;
  }

  return Overlay;
}(_phaser2.default.Graphics);

exports.default = Overlay;

/***/ }),
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(44);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(5);
var cof = __webpack_require__(24);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(2);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(15);
var redefine = __webpack_require__(16);
var fails = __webpack_require__(4);
var defined = __webpack_require__(28);
var wks = __webpack_require__(6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var redefineAll = __webpack_require__(50);
var meta = __webpack_require__(36);
var forOf = __webpack_require__(49);
var anInstance = __webpack_require__(48);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var $iterDetect = __webpack_require__(73);
var setToStringTag = __webpack_require__(55);
var inheritIfRequired = __webpack_require__(91);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(15);
var uid = __webpack_require__(41);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(42) || !__webpack_require__(4)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(3)[K];
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var ctx = __webpack_require__(23);
var forOf = __webpack_require__(49);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fetch = __webpack_require__(364);

var _fetch2 = _interopRequireDefault(_fetch);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Backend = function (_Fetch) {
  _inherits(Backend, _Fetch);

  function Backend() {
    _classCallCheck(this, Backend);

    var _this = _possibleConstructorReturn(this, (Backend.__proto__ || Object.getPrototypeOf(Backend)).call(this));

    _this._isSupported = false; //! window.famobi.hasFeature('standalone');

    _this.url = 'https://qxt37ledq5.execute-api.eu-west-1.amazonaws.com/prod/';
    return _this;
  }

  _createClass(Backend, [{
    key: 'log',
    value: function log(body) {
      this.httpRequest('log', 'POST', body);
    }
  }, {
    key: 'httpRequest',
    value: function httpRequest(path, method) {
      var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _this2 = this;

      var callback = arguments[3];
      var context = arguments[4];

      if (!this.isSupported()) {
        this.doCallback(callback, context);
        return;
      }

      var xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
          if (xmlHttp.status === 200) {
            var json = JSON.parse(xmlHttp.responseText);
            _this2.doCallback(callback, context, json);
          } else {
            console.info('Call is: ' + xmlHttp.status);
            _this2.doCallback(callback, context, xmlHttp.status);
          }
        }
      };

      xmlHttp.open(method, this.url + path, true);
      xmlHttp.send(JSON.stringify(body));
    }
  }, {
    key: 'doCallback',
    value: function doCallback(callback, context) {
      if (typeof callback === 'function') {
        for (var _len = arguments.length, parameters = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          parameters[_key - 2] = arguments[_key];
        }

        callback.call.apply(callback, [context].concat(parameters));
      }
    }
  }, {
    key: 'createEntry',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.post('entry').catch(function (e) {
                  console.log(e);
                });

              case 2:
                info = _context.sent;
                return _context.abrupt('return', info);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createEntry() {
        return _ref.apply(this, arguments);
      }

      return createEntry;
    }()
  }, {
    key: 'fetchEntry',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var body, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                body = {
                  id: _storageManager2.default.instance.get('leaderboardId')
                };
                _context2.next = 3;
                return this.get('entry', body).catch(function (e) {
                  console.log(e);
                });

              case 3:
                info = _context2.sent;
                return _context2.abrupt('return', info);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchEntry() {
        return _ref2.apply(this, arguments);
      }

      return fetchEntry;
    }()
  }, {
    key: 'fetchLeaderboard',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.get('leaderboard');

              case 2:
                info = _context3.sent;
                return _context3.abrupt('return', info);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchLeaderboard() {
        return _ref3.apply(this, arguments);
      }

      return fetchLeaderboard;
    }()
  }, {
    key: 'setScore',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var body, info;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                body = {
                  id: _storageManager2.default.instance.get('leaderboardId'),
                  score: _storageManager2.default.instance.get('highscore'),
                  name: game.leaderboard.playerName.value
                };
                _context4.next = 3;
                return this.post('score', body);

              case 3:
                info = _context4.sent;
                return _context4.abrupt('return', info);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setScore() {
        return _ref4.apply(this, arguments);
      }

      return setScore;
    }()
  }]);

  return Backend;
}(_fetch2.default);

exports.default = Backend;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsButton = function (_Group) {
  _inherits(SettingsButton, _Group);

  function SettingsButton() {
    _classCallCheck(this, SettingsButton);

    var _this = _possibleConstructorReturn(this, (SettingsButton.__proto__ || Object.getPrototypeOf(SettingsButton)).call(this, game));

    _this.createSettings();
    return _this;
  }

  _createClass(SettingsButton, [{
    key: "createSettings",
    value: function createSettings() {
      var _this2 = this;

      this.settingsGroup = new Phaser.Group(game);
      this.settingsGroup.pivot.y = -100;
      this.settingsGroup.x = 100;
      this.settingsGroup.y = 45;
      this.closeSettings();
      this.add(this.settingsGroup);
      this.settingsBackground = new _Frame2.default({
        iconImage: 'ui_settings_icon.png',
        x: 0,
        y: 0,
        width: 70,
        height: 270,
        cornerRadius: 1,
        iconSize: 0.6,
        color: 0xFEFEFE,
        useDropShadow: true,
        inputEnabled: true,
        dropShadowColor: 0xAAA9AE
      });
      this.settingsGroup.add(this.settingsBackground);

      this.createMusicButton();
      this.createSoundButton();

      this.settingsButton = new _FrameButton2.default({
        iconImage: 'ui_settings_icon.png',
        x: 100,
        y: 45,
        width: 70,
        height: 70,
        cornerRadius: 1,
        iconSize: 0.6,
        color: 0xff4800,
        dropShadowColor: 0xcf1d0c
      });
      this.settingsButton.visible = window.GameInterface.hasFeature("audio");
      this.settingsButton.doOnClick = function () {
        _this2.toggleSettings();
      };
      this.add(this.settingsButton);
    }
  }, {
    key: "createSoundButton",
    value: function createSoundButton() {
      var _this3 = this;

      this.soundButton = new _FrameButton2.default({
        iconImage: 'ui_sound_on_icon.png',
        width: 70,
        height: 70,
        cornerRadius: 1,
        iconSize: 0.6,
        x: 0,
        y: -5,
        color: 0x32374a,
        dropShadowColor: 0x1c1e29
      });
      this.soundButton.doOnClick = function () {
        var sound = game.soundManager.toggleSound();

        _this3.setSoundButton(sound);
      };
      this.settingsGroup.add(this.soundButton);
    }
  }, {
    key: "createMusicButton",
    value: function createMusicButton() {
      var _this4 = this;

      this.musicButton = new _FrameButton2.default({
        iconImage: 'ui_music_on_icon.png',
        width: 70,
        height: 70,
        cornerRadius: 1,
        iconSize: 0.6,
        x: 0,
        y: 80,
        iconAnchorX: 0.55,
        color: 0x32374a,
        dropShadowColor: 0x1c1e29
      });

      this.musicButton.doOnClick = function () {
        var music = game.soundManager.toggleMusic();

        _this4.setMusicButton(music);
      };
      this.settingsGroup.add(this.musicButton);
    }
  }, {
    key: "toggleSettings",
    value: function toggleSettings() {
      if (this.isSettingsOpen) {
        var tClose = this.game.add.tween(this.settingsGroup.scale).to({ y: 0 }, 100, Phaser.Easing.Default, false);
        tClose.start();
        this.isSettingsOpen = false;
      } else {
        this.setMusicButton();
        this.setSoundButton();
        var tOpen = this.game.add.tween(this.settingsGroup.scale).to({ y: 1 }, 200, Phaser.Easing.Bounce.Out, false);
        tOpen.start();
        this.isSettingsOpen = true;
      }
    }
  }, {
    key: "closeSettings",
    value: function closeSettings() {
      this.isSettingsOpen = false;
      this.settingsGroup.scale.y = 0;
    }
  }, {
    key: "setSoundButton",
    value: function setSoundButton() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game.soundManager.sound;

      this.soundButton.iconImage.frameName = "ui_sound_" + (value ? 'on' : 'off') + "_icon.png";
    }
  }, {
    key: "setMusicButton",
    value: function setMusicButton() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game.soundManager.music;

      this.musicButton.iconImage.frameName = "ui_music_" + (value ? 'on' : 'off') + "_icon.png";
    }
  }]);

  return SettingsButton;
}(_phaser.Group);

exports.default = SettingsButton;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(26);
var LIBRARY = __webpack_require__(42);
var wksExt = __webpack_require__(112);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(68)('keys');
var uid = __webpack_require__(41);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(2);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(21).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var setPrototypeOf = __webpack_require__(89).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(28);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(42);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var hide = __webpack_require__(15);
var has = __webpack_require__(14);
var Iterators = __webpack_require__(57);
var $iterCreate = __webpack_require__(97);
var setToStringTag = __webpack_require__(55);
var getPrototypeOf = __webpack_require__(22);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(45);
var descriptor = __webpack_require__(40);
var setToStringTag = __webpack_require__(55);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(72);
var defined = __webpack_require__(28);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(57);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(40);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(64);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(57);
module.exports = __webpack_require__(26).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(248);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(37);
var step = __webpack_require__(128);
var Iterators = __webpack_require__(57);
var toIObject = __webpack_require__(20);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(96)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var invoke = __webpack_require__(118);
var html = __webpack_require__(88);
var cel = __webpack_require__(84);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(106).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(42);
var $typed = __webpack_require__(78);
var hide = __webpack_require__(15);
var redefineAll = __webpack_require__(50);
var fails = __webpack_require__(4);
var anInstance = __webpack_require__(48);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
var toIndex = __webpack_require__(137);
var gOPN = __webpack_require__(46).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(104);
var setToStringTag = __webpack_require__(55);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(84)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(20);
var arrayIndexOf = __webpack_require__(69)(false);
var IE_PROTO = __webpack_require__(86)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(2);
var getKeys = __webpack_require__(43);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(20);
var gOPN = __webpack_require__(46).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(43);
var gOPS = __webpack_require__(70);
var pIE = __webpack_require__(63);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(62);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(12);
var isObject = __webpack_require__(5);
var invoke = __webpack_require__(118);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(3).parseInt;
var $trim = __webpack_require__(56).trim;
var ws = __webpack_require__(90);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(3).parseFloat;
var $trim = __webpack_require__(56).trim;

module.exports = 1 / $parseFloat(__webpack_require__(90) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(24);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(5);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 123 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(93);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(62);
var toLength = __webpack_require__(9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(74)
});


/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(108);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(133);
var validate = __webpack_require__(58);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(77)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(45);
var redefineAll = __webpack_require__(50);
var ctx = __webpack_require__(23);
var anInstance = __webpack_require__(48);
var forOf = __webpack_require__(49);
var $iterDefine = __webpack_require__(96);
var step = __webpack_require__(128);
var setSpecies = __webpack_require__(47);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(36).fastKey;
var validate = __webpack_require__(58);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(133);
var validate = __webpack_require__(58);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(77)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(31)(0);
var redefine = __webpack_require__(16);
var meta = __webpack_require__(36);
var assign = __webpack_require__(116);
var weak = __webpack_require__(136);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var validate = __webpack_require__(58);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(77)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(50);
var getWeak = __webpack_require__(36).getWeak;
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var anInstance = __webpack_require__(48);
var forOf = __webpack_require__(49);
var createArrayMethod = __webpack_require__(31);
var $has = __webpack_require__(14);
var validate = __webpack_require__(58);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(46);
var gOPS = __webpack_require__(70);
var anObject = __webpack_require__(2);
var Reflect = __webpack_require__(3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(71);
var isObject = __webpack_require__(5);
var toLength = __webpack_require__(9);
var ctx = __webpack_require__(23);
var IS_CONCAT_SPREADABLE = __webpack_require__(6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9);
var repeat = __webpack_require__(92);
var defined = __webpack_require__(28);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(43);
var toIObject = __webpack_require__(20);
var isEnum = __webpack_require__(63).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(64);
var from = __webpack_require__(143);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(49);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Extended class from phaser text, it sets some values automatically to the right settings
var Text = function (_Phaser$Text) {
  _inherits(Text, _Phaser$Text);

  function Text(_ref) {
    var _ref$text = _ref.text,
        text = _ref$text === undefined ? '' : _ref$text,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0 : _ref$anchorY,
        _ref$fontSize = _ref.fontSize,
        fontSize = _ref$fontSize === undefined ? 20 : _ref$fontSize,
        _ref$fontName = _ref.fontName,
        fontName = _ref$fontName === undefined ? 'bungee regular' : _ref$fontName,
        _ref$fontWeight = _ref.fontWeight,
        fontWeight = _ref$fontWeight === undefined ? 'normal' : _ref$fontWeight,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#323232' : _ref$color,
        _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        _ref$align = _ref.align,
        align = _ref$align === undefined ? 'center' : _ref$align,
        _ref$boundsAlignH = _ref.boundsAlignH,
        boundsAlignH = _ref$boundsAlignH === undefined ? 'center' : _ref$boundsAlignH,
        _ref$boundsAlignV = _ref.boundsAlignV,
        boundsAlignV = _ref$boundsAlignV === undefined ? 'middle' : _ref$boundsAlignV,
        _ref$stroke = _ref.stroke,
        stroke = _ref$stroke === undefined ? '#000000' : _ref$stroke,
        _ref$strokeThickness = _ref.strokeThickness,
        strokeThickness = _ref$strokeThickness === undefined ? 0 : _ref$strokeThickness,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? false : _ref$inputEnabled,
        _ref$wordWrap = _ref.wordWrap,
        wordWrap = _ref$wordWrap === undefined ? false : _ref$wordWrap,
        wordWrapWidth = _ref.wordWrapWidth,
        maxWidth = _ref.maxWidth;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, game, x, y, text));

    _this.maxWidth = maxWidth;
    _this.fontSize = fontSize;
    _this.text = text;
    _this.game = game;
    _this.visible = visible;
    _this.setStyle({
      font: fontWeight + ' ' + fontSize + 'pt ' + fontName,
      fill: color,
      align: align,
      boundsAlignH: boundsAlignH,
      boundsAlignV: boundsAlignV,
      stroke: stroke,
      strokeThickness: strokeThickness,
      wordWrap: wordWrap,
      wordWrapWidth: wordWrapWidth
    });
    _this.resolution = 2;
    _this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.autoFit();
    return _this;
  }

  // Move position


  _createClass(Text, [{
    key: 'translateText',
    value: function translateText(offsetX, offsetY) {
      this.translateTextX(offsetX);
      this.translateTextY(offsetY);
    }

    // Move position in the x-axis

  }, {
    key: 'translateTextX',
    value: function translateTextX(offsetX) {
      this.x += offsetX;
    }

    // Move position in the y-axis

  }, {
    key: 'translateTextY',
    value: function translateTextY(offsetY) {
      this.y += offsetY;
    }
  }, {
    key: 'centerText',
    value: function centerText() {
      this.x += this.width / 2;
      this.y += this.height / 2;
    }
  }, {
    key: 'autoFit',
    value: function autoFit() {
      if (!this.maxWidth) return;

      while (this.getBounds().width > this.maxWidth && parseInt(this.fontSize, 10) > 2) {
        this.fontSize = parseInt(this.fontSize, 10) - 1;
      }
    }
  }]);

  return Text;
}(_phaser2.default.Text);

exports.default = Text;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// extended script from phaser sprites, it sets some values automatically to the right settings
var Sprite = function (_Phaser$Image) {
  _inherits(Sprite, _Phaser$Image);

  function Sprite(_ref) {
    var asset = _ref.asset,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        frame = _ref.frame,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0 : _ref$anchorY,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? false : _ref$inputEnabled,
        _ref$scaleX = _ref.scaleX,
        scaleX = _ref$scaleX === undefined ? 1 : _ref$scaleX,
        _ref$scaleY = _ref.scaleY,
        scaleY = _ref$scaleY === undefined ? 1 : _ref$scaleY,
        _ref$angle = _ref.angle,
        angle = _ref$angle === undefined ? 0 : _ref$angle;

    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, game, x, y, asset, frame));

    _this.game = game;
    _this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.smoothed = true;
    _this.scale.setTo(scaleX, scaleY);
    _this.angle = angle;
    _this.asset = asset;
    _this.frame = frame;
    return _this;
  }

  _createClass(Sprite, [{
    key: 'center',
    value: function center() {
      this.x += this.width / 2;
      this.y += this.height / 2;
    }
  }, {
    key: 'changeTexture',
    value: function changeTexture(frame) {
      var asset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.asset;

      this.loadTexture(asset, frame);
    }
  }]);

  return Sprite;
}(_phaser2.default.Image);

exports.default = Sprite;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 Button Class

 A clickable sprite which changes texture when on click.
 It has a three states: default, down and disable.
 IMPORTANT: Override the method doOnClick!
 Override the method doOnClickDisabled if you make use of the disable state.
*/

var Button = function (_Phaser$Sprite) {
  _inherits(Button, _Phaser$Sprite);

  function Button(_ref) {
    var key = _ref.key,
        _ref$keyDown = _ref.keyDown,
        keyDown = _ref$keyDown === undefined ? key : _ref$keyDown,
        _ref$keyDisable = _ref.keyDisable,
        keyDisable = _ref$keyDisable === undefined ? key : _ref$keyDisable,
        _ref$sfx = _ref.sfx,
        sfx = _ref$sfx === undefined ? 'buttonBasic1' : _ref$sfx,
        x = _ref.x,
        y = _ref.y,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === undefined ? false : _ref$disabled,
        frame = _ref.frame,
        _ref$frameDisable = _ref.frameDisable,
        frameDisable = _ref$frameDisable === undefined ? frame : _ref$frameDisable,
        _ref$frameDown = _ref.frameDown,
        frameDown = _ref$frameDown === undefined ? frame : _ref$frameDown,
        _ref$anchorX = _ref.anchorX,
        anchorX = _ref$anchorX === undefined ? 0 : _ref$anchorX,
        _ref$anchorY = _ref.anchorY,
        anchorY = _ref$anchorY === undefined ? 0 : _ref$anchorY,
        _ref$inputEnabled = _ref.inputEnabled,
        inputEnabled = _ref$inputEnabled === undefined ? true : _ref$inputEnabled,
        _ref$disableSwipeClic = _ref.disableSwipeClick,
        disableSwipeClick = _ref$disableSwipeClic === undefined ? false : _ref$disableSwipeClic;

    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, game, x, y, key, frame));

    _this.textureList = { default: frame, down: frameDown, disable: frameDisable };
    _this.state = { default: 1, down: 2, disable: 3 };
    Object.freeze(_this.state);

    _this.currentState = _this.state.default;

    if (disabled) {
      _this.doDisable();
    }

    // this.sfx = game.soundManager.getSound(sfx);
    _this.sfx = _this.game.soundManager.getSound('button');

    _this.autoCull = false;
    _this.anchor.setTo(anchorX, anchorY);
    _this.inputEnabled = inputEnabled;
    _this.smoothed = true;
    _this.disableSwipeClick = disableSwipeClick;

    _this.events.onInputUp.add(function () {
      _this.changeState('default');

      // this.sfx.play();

      _this.checkIfClickAble();
    });

    _this.events.onInputDown.add(function () {
      _this.changeState('down');
      _this.startPos = new _phaser2.default.Point(game.input.worldX, game.input.worldY);
      // this.sfx.play();
    });
    return _this;
  }

  _createClass(Button, [{
    key: 'doDisable',
    value: function doDisable() {
      this.changeState('disable');
    }
  }, {
    key: 'doEnable',
    value: function doEnable() {
      this.currentState = this.state.default;
      this.changeTexture(this.textureList.default);
    }
  }, {
    key: 'changeState',
    value: function changeState(state) {
      if (this.currentState === this.state.disable) {
        return;
      }

      switch (state) {
        case 'default':
          this.currentState = this.state.default;
          this.changeTexture(this.textureList.default);
          break;
        case 'down':
          this.currentState = this.state.down;
          this.changeTexture(this.textureList.down);
          break;
        case 'disable':
          this.currentState = this.state.disable;
          this.changeTexture(this.textureList.disable);
          break;
        default:
          this.currentState = this.state.default;
          this.changeTexture(this.textureList.default);
          break;
      }
    }
  }, {
    key: 'changeTexture',
    value: function changeTexture() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.textureList.default;

      // this.loadTexture(key);
      if (key === undefined) {
        return;
      }
      this.frameName = key;
    }

    // Empty shell. Override this methode

  }, {
    key: 'doOnClick',
    value: function doOnClick() {}
    // console.warn('doOnClick is empty!');


    // Empty shell. Override this methode

  }, {
    key: 'doOnClickDisabled',
    value: function doOnClickDisabled() {
      console.warn('doOnClickDisabled is empty!');
    }
  }, {
    key: 'checkIfClickAble',
    value: function checkIfClickAble() {
      if (this.disableSwipeClick) {
        if ((0, _utils.distance)(this.startPos.x, this.startPos.y, this.game.input.worldX, this.game.input.worldY) > 20) {
          return;
        }
      }
      if (this.currentState !== this.state.disable) {
        this.doOnClick();
        return;
      }

      this.doOnClickDisabled();
    }

    /**
     * Used to reassign frame images. Can be used when a button needs different images runtime
     *
     * @param frame default frame image
     * @param frameDown image when button is hold
     * @param frameDisabled image when a button is disabled
     */

  }, {
    key: 'reassignFrameImages',
    value: function reassignFrameImages(frame) {
      var frameDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : frame;
      var frameDisabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : frame;

      this.textureList = { default: frame, down: frameDown, disable: frameDisabled };
    }
  }]);

  return Button;
}(_phaser2.default.Sprite);

exports.default = Button;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Button = __webpack_require__(147);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShopItem = function (_Phaser$Group) {
  _inherits(ShopItem, _Phaser$Group);

  function ShopItem(x, y, skin, list, unlocked) {
    _classCallCheck(this, ShopItem);

    var _this = _possibleConstructorReturn(this, (ShopItem.__proto__ || Object.getPrototypeOf(ShopItem)).call(this, game));

    _this.x = x;
    _this.y = y;
    _this.list = list;
    _this.id = skin.id;
    _this.skinName = skin.name;
    _this.displayName = _this.getDisplayName(_this.skinName);
    _this.skinFrames = skin.frames;
    _this.imageScale = _this.skinName.includes('maki') ? 0.75 : 1.2;
    _this.unlocked = unlocked;
    _this.buildImage();
    _this.toggleSkinLocked();
    return _this;
  }

  _createClass(ShopItem, [{
    key: 'getDisplayName',
    value: function getDisplayName(string) {
      if (string === 'questionmark') return 'random';
      var displayname = string.replace(/_/g, ' ');
      return displayname;
    }
  }, {
    key: 'buildImage',
    value: function buildImage() {
      var _this2 = this;

      this.frameImage = new _Button2.default({
        key: 'uiAtlas',
        frame: 'unlocked_skin.png',
        frameDisable: 'locked_skin.png',
        anchorX: 0.5,
        anchorY: 0.5,
        inputEnabled: true,
        disableSwipeClick: true
      });
      this.frameImage.scale.setTo(0.75, 0.75);
      this.add(this.frameImage);

      this.frameImage.doOnClick = function () {
        _this2.list.selectSkin(_this2.id);
      };

      this.sushi = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'ui_' + this.skinName + '.png',
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.sushi.scale.setTo(this.imageScale, this.imageScale);
      this.add(this.sushi);

      this.lock = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'locked_skin.png',
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.lock.scale.set(1.4);
      this.add(this.lock);

      // this.ballName = new Text({
      //   text: this.displayName,
      //   x: this.sushi.x,
      //   y: this.sushi.y + 45,
      //   anchorX: 0.5,
      //   wordWrap: true,
      //   wordWrapWidth: 220,
      //   fontSize: 16,
      //   color: '32374a',
      // });
      // this.ballName.lineSpacing = -10;
      // this.add(this.ballName);
    }
  }, {
    key: 'toggleSkinSelect',
    value: function toggleSkinSelect(isSelected) {
      if (isSelected) {
        this.frameImage.frameName = 'selected_skin.png';
      } else {
        this.frameImage.frameName = 'unlocked_skin.png';
      }
    }
  }, {
    key: 'toggleSkinLocked',
    value: function toggleSkinLocked() {
      this.toggleSkin(this.unlocked);
    }
  }, {
    key: 'toggleSkin',
    value: function toggleSkin(boolean) {
      if (boolean === true) {
        this.sushi.visible = true;
        this.sushi.tint = 0xffffff;
        this.sushi.scale.set(this.imageScale, this.imageScale);
        this.lock.visible = false;
        // this.sushi.y = -20;
        // this.ballName.visible = true;
        this.frameImage.doEnable();
      } else if (boolean === false) {
        this.sushi.visible = true;
        this.sushi.tint = 0x4a4a4a;
        this.sushi.scale.set(this.imageScale * 0.8, this.imageScale * 0.8);
        this.lock.visible = true;
        this.frameImage.doDisable();
        // this.ballName.visible = false;
      } else console.error('Cannot toggle skin, missing boolean');
    }
  }]);

  return ShopItem;
}(_phaser2.default.Group);

exports.default = ShopItem;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector4 = function () {
  function Vector4(x, y, z, w) {
    _classCallCheck(this, Vector4);

    /**
     * The x component of this Vector.
     *
     * @name Phaser.Math.Vector4#x
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.x = 0;

    /**
     * The y component of this Vector.
     *
     * @name Phaser.Math.Vector4#y
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.y = 0;

    /**
     * The z component of this Vector.
     *
     * @name Phaser.Math.Vector4#z
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.z = 0;

    /**
     * The w component of this Vector.
     *
     * @name Phaser.Math.Vector4#w
     * @type {number}
     * @default 0
     * @since 3.0.0
     */
    this.w = 0;

    if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      this.w = x.w || 0;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w || 0;
    }
  }

  /**
   * Make a clone of this Vector4.
   *
   * @method Phaser.Math.Vector4#clone
   * @since 3.0.0
   *
   * @return {Phaser.Math.Vector4} A clone of this Vector4.
   */


  _createClass(Vector4, [{
    key: 'clone',
    value: function clone() {
      return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * Copy the components of a given Vector into this Vector.
     *
     * @method Phaser.Math.Vector4#copy
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector4} src - The Vector to copy the components from.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'copy',
    value: function copy(src) {
      this.x = src.x;
      this.y = src.y;
      this.z = src.z || 0;
      this.w = src.w || 0;

      return this;
    }

    /**
     * Check whether this Vector is equal to a given Vector.
     *
     * Performs a strict quality check against each Vector's components.
     *
     * @method Phaser.Math.Vector4#equals
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector4} v - The vector to check equality with.
     *
     * @return {boolean} A boolean indicating whether the two Vectors are equal or not.
     */

  }, {
    key: 'equals',
    value: function equals(v) {
      return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
    }

    /**
     * Set the `x`, `y`, `z` and `w` components of the this Vector to the given `x`, `y`, `z` and `w` values.
     *
     * @method Phaser.Math.Vector4#set
     * @since 3.0.0
     *
     * @param {(number|object)} x - The x value to set for this Vector, or an object containing x, y, z and w components.
     * @param {number} y - The y value to set for this Vector.
     * @param {number} z - The z value to set for this Vector.
     * @param {number} w - The z value to set for this Vector.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'set',
    value: function set(x, y, z, w) {
      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
        this.x = x.x || 0;
        this.y = x.y || 0;
        this.z = x.z || 0;
        this.w = x.w || 0;
      } else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
      }

      return this;
    }

    /**
     * Add a given Vector to this Vector. Addition is component-wise.
     *
     * @method Phaser.Math.Vector4#add
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to add to this Vector.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'add',
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z || 0;
      this.w += v.w || 0;

      return this;
    }

    /**
     * Subtract the given Vector from this Vector. Subtraction is component-wise.
     *
     * @method Phaser.Math.Vector4#subtract
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to subtract from this Vector.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'subtract',
    value: function subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z || 0;
      this.w -= v.w || 0;

      return this;
    }

    /**
     * Scale this Vector by the given value.
     *
     * @method Phaser.Math.Vector4#scale
     * @since 3.0.0
     *
     * @param {number} scale - The value to scale this Vector by.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'scale',
    value: function scale(_scale) {
      this.x *= _scale;
      this.y *= _scale;
      this.z *= _scale;
      this.w *= _scale;

      return this;
    }

    /**
     * Calculate the length (or magnitude) of this Vector.
     *
     * @method Phaser.Math.Vector4#length
     * @since 3.0.0
     *
     * @return {number} The length of this Vector.
     */

  }, {
    key: 'length',
    value: function length() {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;

      return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Calculate the length of this Vector squared.
     *
     * @method Phaser.Math.Vector4#lengthSq
     * @since 3.0.0
     *
     * @return {number} The length of this Vector, squared.
     */

  }, {
    key: 'lengthSq',
    value: function lengthSq() {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;

      return x * x + y * y + z * z + w * w;
    }

    /**
     * Normalize this Vector.
     *
     * Makes the vector a unit length vector (magnitude of 1) in the same direction.
     *
     * @method Phaser.Math.Vector4#normalize
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'normalize',
    value: function normalize() {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;
      var len = x * x + y * y + z * z + w * w;

      if (len > 0) {
        len = 1 / Math.sqrt(len);

        this.x = x * len;
        this.y = y * len;
        this.z = z * len;
        this.w = w * len;
      }

      return this;
    }

    /**
     * Calculate the dot product of this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector4#dot
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector4} v - The Vector4 to dot product with this Vector4.
     *
     * @return {number} The dot product of this Vector and the given Vector.
     */

  }, {
    key: 'dot',
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    /**
     * Linearly interpolate between this Vector and the given Vector.
     *
     * Interpolates this Vector towards the given Vector.
     *
     * @method Phaser.Math.Vector4#lerp
     * @since 3.0.0
     *
     * @param {Phaser.Math.Vector4} v - The Vector4 to interpolate towards.
     * @param {number} [t=0] - The interpolation percentage, between 0 and 1.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'lerp',
    value: function lerp(v, t) {
      if (t === undefined) {
        t = 0;
      }

      var ax = this.x;
      var ay = this.y;
      var az = this.z;
      var aw = this.w;

      this.x = ax + t * (v.x - ax);
      this.y = ay + t * (v.y - ay);
      this.z = az + t * (v.z - az);
      this.w = aw + t * (v.w - aw);

      return this;
    }

    /**
     * Perform a component-wise multiplication between this Vector and the given Vector.
     *
     * Multiplies this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector4#multiply
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to multiply this Vector by.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'multiply',
    value: function multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z || 1;
      this.w *= v.w || 1;

      return this;
    }

    /**
     * Perform a component-wise division between this Vector and the given Vector.
     *
     * Divides this Vector by the given Vector.
     *
     * @method Phaser.Math.Vector4#divide
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to divide this Vector by.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'divide',
    value: function divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z || 1;
      this.w /= v.w || 1;

      return this;
    }

    /**
     * Calculate the distance between this Vector and the given Vector.
     *
     * @method Phaser.Math.Vector4#distance
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector.
     */

  }, {
    key: 'distance',
    value: function distance(v) {
      var dx = v.x - this.x;
      var dy = v.y - this.y;
      var dz = v.z - this.z || 0;
      var dw = v.w - this.w || 0;

      return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
    }

    /**
     * Calculate the distance between this Vector and the given Vector, squared.
     *
     * @method Phaser.Math.Vector4#distanceSq
     * @since 3.0.0
     *
     * @param {(Phaser.Math.Vector2|Phaser.Math.Vector3|Phaser.Math.Vector4)} v - The Vector to calculate the distance to.
     *
     * @return {number} The distance from this Vector to the given Vector, squared.
     */

  }, {
    key: 'distanceSq',
    value: function distanceSq(v) {
      var dx = v.x - this.x;
      var dy = v.y - this.y;
      var dz = v.z - this.z || 0;
      var dw = v.w - this.w || 0;

      return dx * dx + dy * dy + dz * dz + dw * dw;
    }

    /**
     * Negate the `x`, `y`, `z` and `w` components of this Vector.
     *
     * @method Phaser.Math.Vector4#negate
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'negate',
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      this.w = -this.w;

      return this;
    }

    /**
     * Transform this Vector with the given Matrix.
     *
     * @method Phaser.Math.Vector4#transformMat4
     * @since 3.0.0
     *
     * @param {Phaser.Math.Matrix4} mat - The Matrix4 to transform this Vector4 with.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'transformMat4',
    value: function transformMat4(mat) {
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var w = this.w;
      var m = mat.val;

      this.x = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
      this.y = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
      this.z = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
      this.w = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

      return this;
    }

    /**
     * Transform this Vector with the given Quaternion.
     *
     * @method Phaser.Math.Vector4#transformQuat
     * @since 3.0.0
     *
     * @param {Phaser.Math.Quaternion} q - The Quaternion to transform this Vector with.
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'transformQuat',
    value: function transformQuat(q) {
      // TODO: is this really the same as Vector3?
      // Also, what about this: http://molecularmusings.wordpress.com/2013/05/24/a-faster-quaternion-vector-multiplication/
      // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
      var x = this.x;
      var y = this.y;
      var z = this.z;
      var qx = q.x;
      var qy = q.y;
      var qz = q.z;
      var qw = q.w;

      // calculate quat * vec
      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z;

      // calculate result * inverse quat
      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

      return this;
    }

    /**
     * Make this Vector the zero vector (0, 0, 0, 0).
     *
     * @method Phaser.Math.Vector4#reset
     * @since 3.0.0
     *
     * @return {Phaser.Math.Vector4} This Vector4.
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 0;

      return this;
    }
  }]);

  return Vector4;
}();

exports.default = Vector4;
;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This class creates a pool of objects of choice
// that can then be called from and returned to this pool
// To use this class create an instantiation of this class
// with the chosen object class as a parameter and the amount
// of objects you need in the game at the same time.
// Instead of creating a new object use getObject, instead of
//  destroy use returnObject

var ObjectPool = function (_Phaser$Group) {
  _inherits(ObjectPool, _Phaser$Group);

  function ObjectPool(game, Object, amount) {
    _classCallCheck(this, ObjectPool);

    var _this = _possibleConstructorReturn(this, (ObjectPool.__proto__ || Object.getPrototypeOf(ObjectPool)).call(this, game));

    _this.objectList = [];
    _this.fillList(Object, amount);

    _this.Object = Object;
    return _this;
  }

  _createClass(ObjectPool, [{
    key: 'fillList',
    value: function fillList(Object, amount) {
      for (var i = 0; i < amount; i += 1) {
        this.objectList[i] = new Object(this.game);
        this.objectList[i].exists = false;
        if (this.objectList[i].name === 'tile') {
          this.objectList[i].name = 'Tile';
          game.TileObjectpoolCounter += 1;
          game.TilesInPool += 1;
        }
        this.objectList[i].alive = false;
        this.objectList[i].visible = false;
        this.objectList[i].isInPool = true;
      }
    }
  }, {
    key: 'getObject',
    value: function getObject(x, y) {
      if (this.objectList.length === 0) {
        this.addObject(this.Object);
      }
      var returningObject = this.objectList[0];
      this.objectList.splice(0, 1);
      returningObject.exists = true;
      returningObject.alive = false;
      returningObject.visible = true;
      returningObject.isInPool = false;
      returningObject.x = x;
      returningObject.y = y;
      if (returningObject.name === 'Tile') {
        // console.log(returningObject.name, 'heck yes');
        game.TilesOutPool += 1;
        game.TilesInPool -= 1;
      }
      return returningObject;
    }
  }, {
    key: 'addObject',
    value: function addObject(Object) {
      this.objectList.push(new Object(this.game));
      console.info('Not enough objects in pool of type ' + Object.name.toString());
    }
  }, {
    key: 'returnObject',
    value: function returnObject(object) {
      if (!object || object.isInPool) return;

      this.objectList.push(object);
      object.exists = false;
      object.alive = false;
      object.visible = false;
      object.isInPool = true;
      if (object.name === 'Tile') {
        game.TilesInPool += 1;
        game.TilesOutPool -= 1;
      }

      // object.x = 0;
      // object.y = 0;
    }
  }]);

  return ObjectPool;
}(_phaser2.default.Group);

exports.default = ObjectPool;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AchievementNotifications = function (_Group) {
  _inherits(AchievementNotifications, _Group);

  function AchievementNotifications() {
    _classCallCheck(this, AchievementNotifications);

    var _this = _possibleConstructorReturn(this, (AchievementNotifications.__proto__ || Object.getPrototypeOf(AchievementNotifications)).call(this, game));

    _this.x = game.width / 2;

    _this.yInScreen = 60;
    _this.yOutScreen = -100;
    _this.y = _this.yOutScreen;

    _this.isRunning = false;
    _this.animationqueue = [];
    game.achievementAttained.add(function (achievement, achievementData) {
      _this.animationqueue.push({ achievement: achievement, achievementData: achievementData });
      _this.tryAnimation();
    });

    _this.createAchievementCard();
    _this.createTweens();

    game.onResizeChange.add(_this.resize, _this);
    return _this;
  }

  _createClass(AchievementNotifications, [{
    key: 'createTweens',
    value: function createTweens() {
      var _this2 = this;

      this.tMoveIn = game.add.tween(this).to({ y: this.yInScreen }, 200, _phaser2.default.Easing.Sinusoidal.Out, false);
      this.tMoveOut = game.add.tween(this).to({ y: this.yOutScreen }, 200, _phaser2.default.Easing.Sinusoidal.In, false, 1200);
      this.tCheckOff = game.add.tween(this.check.scale).to({ y: 0.6, x: 0.6 }, 200, _phaser2.default.Easing.Sinusoidal.In, false, 400);
      this.tMoveIn.chain(this.tCheckOff);
      this.tCheckOff.chain(this.tMoveOut);
      this.tMoveOut.onComplete.add(function () {
        _this2.nextAnimation();
      });
    }
  }, {
    key: 'createAchievementCard',
    value: function createAchievementCard() {
      this.background = new _Frame2.default({
        x: 0,
        y: 0,
        width: 400,
        height: 80,
        key: 'bgFrame',
        cornerRadius: 0.4,
        dropShadowColor: 0x32374a,
        color: 0xFEFEFE,
        useDropShadow: true
      });
      this.add(this.background);
      this.background.fixedToCamera = true;

      this.achievementText = new _Text2.default({
        text: 'This is a test sentence',
        x: -120,
        y: 0,
        color: '#32374a',
        fontSize: 17,
        anchorY: 0.5,
        align: 'left',
        wordWrap: true,
        wordWrapWidth: 260
      });
      this.add(this.achievementText);
      this.achievementText.fixedToCamera = true;

      this.medal = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_medal_gold.png',
        x: -160,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.3,
        scaleY: 0.3
      });
      this.add(this.medal);
      this.medal.fixedToCamera = true;

      this.icon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_achievement_skins.png',
        x: -160,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.3,
        scaleY: 0.3
      });
      this.add(this.icon);
      this.icon.fixedToCamera = true;

      this.check = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_complete_icon.png',
        x: 160,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.add(this.check);
      this.check.fixedToCamera = true;
    }
  }, {
    key: 'tryAnimation',
    value: function tryAnimation() {
      if (!this.isRunning) {
        this.startAnimation();
      }
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation() {
      this.isRunning = true;
      var achievementInfo = this.animationqueue.shift();
      this.achievementText.text = _AchievementSystem2.default.instance.getAchievementText(achievementInfo.achievement, achievementInfo.achievementData.step - 1);
      var medalInfo = _AchievementSystem2.default.instance.getMedal(achievementInfo.achievement, achievementInfo.achievementData.step);
      this.medal.frameName = medalInfo.medalFrame;
      this.icon.frameName = medalInfo.iconFrame;
      this.icon.tint = medalInfo.iconColor;
      this.check.scale.set(0, 0);

      game.world.bringToTop(this);
      this.tMoveIn.start();
    }
  }, {
    key: 'nextAnimation',
    value: function nextAnimation() {
      if (this.animationqueue.length > 0) {
        this.startAnimation();
      } else {
        this.isRunning = false;
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = game.width / 2;
    }
  }]);

  return AchievementNotifications;
}(_phaser.Group);

exports.default = AchievementNotifications;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Controlls the color of the background and the images that spawn/move on it
var BackgroundObject = function (_Phaser$Image) {
  _inherits(BackgroundObject, _Phaser$Image);

  function BackgroundObject(game, x, y, key, frame) {
    _classCallCheck(this, BackgroundObject);

    var _this = _possibleConstructorReturn(this, (BackgroundObject.__proto__ || Object.getPrototypeOf(BackgroundObject)).call(this, game, x, y, 'backgroundObjectAtlas', frame));

    _this.x = x;
    _this.y = y;
    _this.anchor.x = 0.5;
    _this.anchor.y = 0.1;
    _this.visible = true;
    _this.tileData = _this.game.cache.getJSON('tileData');
    _this.name = 'backgroundObject';
    return _this;
  }

  _createClass(BackgroundObject, [{
    key: 'changeTexture',
    value: function changeTexture(frame) {
      switch (frame) {
        default:
          console.error('could not find frame of background Object', frame);
          this.changeTexture(8);
          break;
        case 8:
          this.maxObjects = 4;
          this.randomNumber = Math.floor(Math.random() * this.maxObjects + 1);
          this.frameName = 'bg_1x1_' + this.randomNumber + '.png';
          break;
        case 9:
          this.maxObjects = 3;
          this.randomNumber = Math.floor(Math.random() * this.maxObjects + 1);
          this.frameName = 'bg_2x2_' + this.randomNumber + '.png';
          break;
        case 10:
          this.maxObjects = 8;
          this.randomNumber = Math.floor(Math.random() * this.maxObjects + 1);
          this.frameName = 'bg_3x3_' + this.randomNumber + '.png';
          break;
        case 11:
          this.maxObjects = 3;
          this.randomNumber = Math.floor(Math.random() * this.maxObjects + 1);
          this.frameName = 'bg_1x2_' + this.randomNumber + '.png';
          this.scale.x = -1;

          break;
        case 12:
          this.maxObjects = 3;
          this.randomNumber = Math.floor(Math.random() * this.maxObjects + 1);
          this.frameName = 'bg_1x2_' + this.randomNumber + '.png';
          this.scale.x = 1;

          break;
      }
    }
  }]);

  return BackgroundObject;
}(_phaser2.default.Image);

exports.default = BackgroundObject;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Interactable2 = __webpack_require__(154);

var _Interactable3 = _interopRequireDefault(_Interactable2);

var _utils = __webpack_require__(59);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tweenDurationMultiplier = 0.5;

var Teleporter = function (_Interactable) {
  _inherits(Teleporter, _Interactable);

  function Teleporter(game, x, y, array, type) {
    var number = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

    _classCallCheck(this, Teleporter);

    var _this = _possibleConstructorReturn(this, (Teleporter.__proto__ || Object.getPrototypeOf(Teleporter)).call(this, game, x, y, '', array));

    _this.teleporterType = type;
    _this.teleporterNumber = number;
    _this.collisionRadius = 1;
    // this.createAnimation();
    _this.createFire();
    return _this;
  }

  _createClass(Teleporter, [{
    key: 'createFire',
    value: function createFire() {
      var _this2 = this;

      this.fire = new _Sprite2.default({
        asset: 'tileAtlas',
        frame: 'fire/fire0000.png',
        anchorX: 0.5,
        anchorY: 0.8,
        scaleY: 1.5,
        scaleX: 1.5
      });
      this.fire.visible = false;
      this.add(this.fire);
      var anim = this.fire.animations.add('ignite', _phaser2.default.Animation.generateFrameNames('fire/fire', 0, 9, '.png', 4), 40, false);
      anim.onComplete.add(function () {
        _this2.fire.visible = false;
      });
    }

    // empty method because it has now shadow

  }, {
    key: 'createShadow',
    value: function createShadow() {}
  }, {
    key: 'createAnimation',
    value: function createAnimation() {
      // if (type === 0) {
      //   this.sprite.animations.add('in');
      //
      //   this.sprite.animations.play('in', 12, true);
      //   this.sprite.tint = 0x02BAFF;
      // } else if (type === 1) {
      //   this.sprite.animations.add('in');
      //
      //   this.sprite.animations.play('in', 12, true).reverse();
      //   this.sprite.tint = 0xFF3333;
      // }

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.teleporterType;
    }
  }, {
    key: 'onCollision',
    value: function onCollision() {
      if (this.teleporterType === 0) {
        this.teleport(this.game.player, (0, _utils.getTile)('teleporterOut' + this.teleporterNumber, this.game.chunkList[1].tileList));
        this.fire.animations.play('ignite');
        this.fire.visible = true;
        game.player.canAnimTp = true;
      } else {
        if (game.player.canAnimTp) {
          this.fire.animations.play('ignite');
          this.fire.visible = true;
          game.player.canAnimTp = false;
        }
      }
    }
  }, {
    key: 'teleport',
    value: function teleport(player, tile) {
      game.player.isTeleporting = true;
      game.soundManager.playSound('teleport');
      this.teleporterOutPosition = new _phaser2.default.Point(tile.position.x, tile.position.y);

      player.sushi.tint = 0xff0000;
      var tweenDuration = (0, _utils.distance)(player.x, player.y, this.teleporterOutPosition.x, this.teleporterOutPosition.y) * tweenDurationMultiplier;

      if (player.goingRight) player.playerGroup.scale.setTo(-player.startScale / 2, player.startScale / 2);else player.playerGroup.scale.setTo(player.startScale / 2, player.startScale / 2);

      this.teleportTween = this.game.add.tween(player).to(this.teleporterOutPosition, tweenDuration, _phaser2.default.Easing.Linear.None, true, 0, 0, false);
      this.teleportTween.onComplete.add(function () {
        player.sushi.tint = 0xffffff;
        game.player.isTeleporting = false;
        if (player.goingRight) player.playerGroup.scale.setTo(-player.startScale, player.startScale);else player.playerGroup.scale.setTo(player.startScale, player.startScale);
        _AchievementSystem2.default.instance.incrementAchievementData('teleporters', 1);
      });

      // player.position = this.teleporterOutPosition;
      player.chunkList[player.currentChunk].tileList[player.currentTile].doFall();
      player.currentTile = undefined;
      player.showRandomFeedbackText();
    }
  }, {
    key: 'setOffset',
    value: function setOffset() {
      this.yOffset = 0;
    }
  }, {
    key: 'removeObject',
    value: function removeObject() {
      game.teleporterObjectPool.returnObject(this);
    }
  }]);

  return Teleporter;
}(_Interactable3.default);

exports.default = Teleporter;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Parent class of all interactables
var Interactable = function (_Phaser$Group) {
  _inherits(Interactable, _Phaser$Group);

  function Interactable(game, x, y, asset) {
    _classCallCheck(this, Interactable);

    var _this = _possibleConstructorReturn(this, (Interactable.__proto__ || Object.getPrototypeOf(Interactable)).call(this, game));

    _this.createSprite(asset);
    _this.collisionRadius = 0.85;
    _this.x = x;
    _this.y = y;
    _this.setOffset();
    _this.sprite.y = _this.yOffset;

    _this.createAnimation();
    return _this;
  }

  _createClass(Interactable, [{
    key: 'createAnimation',
    value: function createAnimation() {
      this.bobbleTween = this.game.add.tween(this.sprite).to({ y: this.yOffset - 30 }, 1000, _phaser2.default.Easing.Default, false).to({ y: this.yOffset }, 1000, _phaser2.default.Easing.Default, false).loop(true);
      this.bobbleTween.start();
      this.sprite.animations.add('spin');
      this.sprite.animations.play('spin', 12, true);
    }
  }, {
    key: 'createSprite',
    value: function createSprite(asset) {
      this.sprite = new _Sprite2.default({
        asset: asset,
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.add(this.sprite);
    }
  }, {
    key: 'onCollision',
    value: function onCollision(index) {
      game.chunkList[game.player.currentChunk].interactableList.splice(index, 1);
    }
  }, {
    key: 'setOffset',
    value: function setOffset() {
      this.yOffset = 0;
    }
  }]);

  return Interactable;
}(_phaser2.default.Group);

exports.default = Interactable;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
module.exports = __webpack_require__(358);


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(157);

__webpack_require__(354);

__webpack_require__(355);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(158);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(105);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(129);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(132);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
module.exports = __webpack_require__(26);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var META = __webpack_require__(36).KEY;
var $fails = __webpack_require__(4);
var shared = __webpack_require__(68);
var setToStringTag = __webpack_require__(55);
var uid = __webpack_require__(41);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(112);
var wksDefine = __webpack_require__(85);
var enumKeys = __webpack_require__(159);
var isArray = __webpack_require__(71);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var toIObject = __webpack_require__(20);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(40);
var _create = __webpack_require__(45);
var gOPNExt = __webpack_require__(115);
var $GOPD = __webpack_require__(21);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(43);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(46).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(63).f = $propertyIsEnumerable;
  __webpack_require__(70).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(42)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(43);
var gOPS = __webpack_require__(70);
var pIE = __webpack_require__(63);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(45) });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(114) });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(20);
var $getOwnPropertyDescriptor = __webpack_require__(21).f;

__webpack_require__(30)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(22);

__webpack_require__(30)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(43);

__webpack_require__(30)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(30)('getOwnPropertyNames', function () {
  return __webpack_require__(115).f;
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(30)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(30)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(30)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(5);

__webpack_require__(30)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(5);

__webpack_require__(30)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(5);

__webpack_require__(30)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(116) });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(175) });


/***/ }),
/* 175 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(89).set });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(64);
var test = {};
test[__webpack_require__(6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(16)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(117) });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(5);
var getPrototypeOf = __webpack_require__(22);
var HAS_INSTANCE = __webpack_require__(6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(119);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(120);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var has = __webpack_require__(14);
var cof = __webpack_require__(24);
var inheritIfRequired = __webpack_require__(91);
var toPrimitive = __webpack_require__(27);
var fails = __webpack_require__(4);
var gOPN = __webpack_require__(46).f;
var gOPD = __webpack_require__(21).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(56).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(45)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(16)(global, NUMBER, $Number);
}


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(29);
var aNumberValue = __webpack_require__(121);
var repeat = __webpack_require__(92);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(4)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(4);
var aNumberValue = __webpack_require__(121);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(122) });


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(122);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(120);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(119);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(123);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(93);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(94);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(124) });


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(123) });


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(93) });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(94);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(94);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(44);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(20);
var toLength = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(56)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(95)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(96)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(95)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(98);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(99)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(98);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(99)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(92)
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(98);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(99)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(17)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(17)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(17)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(17)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(17)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(17)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(17)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(17)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(17)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(17)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(17)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(17)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(17)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);

$export($export.P + $export.F * __webpack_require__(4)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(237);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(4);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(16)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(15)(proto, TO_PRIMITIVE, __webpack_require__(240));


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(27);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(71) });


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(125);
var isArrayIter = __webpack_require__(100);
var toLength = __webpack_require__(9);
var createProperty = __webpack_require__(101);
var getIterFn = __webpack_require__(102);

$export($export.S + $export.F * !__webpack_require__(73)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(101);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(4)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(20);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(62) != Object || !__webpack_require__(25)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(88);
var cof = __webpack_require__(24);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(4)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(4);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(25)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(31)(0);
var STRICT = __webpack_require__(25)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(71);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(31)(1);

$export($export.P + $export.F * !__webpack_require__(25)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(31)(2);

$export($export.P + $export.F * !__webpack_require__(25)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(31)(3);

$export($export.P + $export.F * !__webpack_require__(25)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(31)(4);

$export($export.P + $export.F * !__webpack_require__(25)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(126);

$export($export.P + $export.F * !__webpack_require__(25)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(126);

$export($export.P + $export.F * !__webpack_require__(25)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(69)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(20);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(127) });

__webpack_require__(37)('copyWithin');


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(104) });

__webpack_require__(37)('fill');


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(31)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(31)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47)('Array');


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var inheritIfRequired = __webpack_require__(91);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(46).f;
var isRegExp = __webpack_require__(72);
var $flags = __webpack_require__(74);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(4)(function () {
  re2[__webpack_require__(6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(16)(global, 'RegExp', $RegExp);
}

__webpack_require__(47)('RegExp');


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(129);
var anObject = __webpack_require__(2);
var $flags = __webpack_require__(74);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(16)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(4)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(75)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(75)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(75)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(75)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(72);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(42);
var global = __webpack_require__(3);
var ctx = __webpack_require__(23);
var classof = __webpack_require__(64);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(5);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(48);
var forOf = __webpack_require__(49);
var speciesConstructor = __webpack_require__(76);
var task = __webpack_require__(106).set;
var microtask = __webpack_require__(107)();
var newPromiseCapabilityModule = __webpack_require__(108);
var perform = __webpack_require__(130);
var promiseResolve = __webpack_require__(131);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(50)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(55)($Promise, PROMISE);
__webpack_require__(47)(PROMISE);
Wrapper = __webpack_require__(26)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(136);
var validate = __webpack_require__(58);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(77)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(78);
var buffer = __webpack_require__(109);
var anObject = __webpack_require__(2);
var toAbsoluteIndex = __webpack_require__(44);
var toLength = __webpack_require__(9);
var isObject = __webpack_require__(5);
var ArrayBuffer = __webpack_require__(3).ArrayBuffer;
var speciesConstructor = __webpack_require__(76);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(4)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(47)(ARRAY_BUFFER);


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(78).ABV, {
  DataView: __webpack_require__(109).DataView
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(2);
var rApply = (__webpack_require__(3).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(4)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(45);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);
var fails = __webpack_require__(4);
var bind = __webpack_require__(117);
var rConstruct = (__webpack_require__(3).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(4)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(21).f;
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(97)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(22);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(5);
var anObject = __webpack_require__(2);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(21);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(22);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(138) });


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(22);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(40);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(5);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(89);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(69)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(37)('includes');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(139);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var aFunction = __webpack_require__(12);
var arraySpeciesCreate = __webpack_require__(103);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(37)('flatMap');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(139);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var toInteger = __webpack_require__(29);
var arraySpeciesCreate = __webpack_require__(103);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(37)('flatten');


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(95)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(140);
var userAgent = __webpack_require__(110);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(140);
var userAgent = __webpack_require__(110);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(56)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(56)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var toLength = __webpack_require__(9);
var isRegExp = __webpack_require__(72);
var getFlags = __webpack_require__(74);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(97)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85)('asyncIterator');


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85)('observable');


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(138);
var toIObject = __webpack_require__(20);
var gOPD = __webpack_require__(21);
var createProperty = __webpack_require__(101);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(141)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(141)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(79), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(79), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(22);
var getOwnPropertyDescriptor = __webpack_require__(21).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(79), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(22);
var getOwnPropertyDescriptor = __webpack_require__(21).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(79), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(142)('Map') });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(142)('Set') });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(80)('Map');


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(80)('Set');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(80)('WeakMap');


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(80)('WeakSet');


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(81)('Map');


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(81)('Set');


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(81)('WeakMap');


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(81)('WeakSet');


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(3) });


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(3) });


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(24);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(144);
var fround = __webpack_require__(124);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(144) });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(26);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(76);
var promiseResolve = __webpack_require__(131);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(108);
var perform = __webpack_require__(130);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(22);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(134);
var from = __webpack_require__(143);
var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(22);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var getPrototypeOf = __webpack_require__(22);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(34);
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(12);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(107)();
var process = __webpack_require__(3).process;
var isNode = __webpack_require__(24)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(3);
var core = __webpack_require__(26);
var microtask = __webpack_require__(107)();
var OBSERVABLE = __webpack_require__(6)('observable');
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(2);
var anInstance = __webpack_require__(48);
var redefineAll = __webpack_require__(50);
var hide = __webpack_require__(15);
var forOf = __webpack_require__(49);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(47)('Observable');


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(110);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(106);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(105);
var getKeys = __webpack_require__(43);
var redefine = __webpack_require__(16);
var global = __webpack_require__(3);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(57);
var wks = __webpack_require__(6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(356);
module.exports = __webpack_require__(26).RegExp.escape;


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(357)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 357 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(361);

var _Boot2 = _interopRequireDefault(_Boot);

var _Game = __webpack_require__(365);

var _Game2 = _interopRequireDefault(_Game);

var _Splash = __webpack_require__(393);

var _Splash2 = _interopRequireDefault(_Splash);

var _config = __webpack_require__(394);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Boot the game states
var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default));

    _this.state.add('Boot', _Boot2.default, false);
    _this.state.add('Game', _Game2.default, false);
    _this.state.add('Splash', _Splash2.default, false);

    _this.state.start('Splash');
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

window.createGame = function () {
  window.game = new Game();
};

var conditions = [':3000'];

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };
}

if (window.cordova) {
  var app = {
    initialize: function initialize() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    // deviceready Event Handler
    //
    onDeviceReady: function onDeviceReady() {
      this.receivedEvent('deviceready');

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Splash');
    },
    receivedEvent: function receivedEvent(id) {
      console.log('Received Event: ' + id);
    }
  };

  app.initialize();
}

/***/ }),
/* 359 */,
/* 360 */,
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _SoundManager = __webpack_require__(362);

var _SoundManager2 = _interopRequireDefault(_SoundManager);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _text = __webpack_require__(145);

var _text2 = _interopRequireDefault(_text);

var _sprite = __webpack_require__(146);

var _sprite2 = _interopRequireDefault(_sprite);

var _phaserInput = __webpack_require__(363);

var _phaserInput2 = _interopRequireDefault(_phaserInput);

var _backend = __webpack_require__(82);

var _backend2 = _interopRequireDefault(_backend);

var _viewportManager = __webpack_require__(65);

var _viewportManager2 = _interopRequireDefault(_viewportManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Loading state for the game, put your images in this class
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.stage.backgroundColor = '#ffc2af';
      // game.forceSingleUpdate = true;
      game.time.advancedTiming = true;
      game.time.desiredFps = 60;

      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;

      game.add.plugin(_phaserInput2.default.Plugin);

      window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = 'script error';
        if (string.indexOf(substring) > -1) {
          console.info('Script Error: See Console for Detail');
        } else {
          var message = ['Message: ' + msg, 'URL: ' + url, 'Line: ' + lineNo, 'Column: ' + columnNo, 'Error object: ' + JSON.stringify(error)];

          if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' && error.stack) {
            message.push('Stack: ' + JSON.stringify(error.stack));
          }
          message = message.join(' - ');
        }
        return false;
      };

      function proxy(context, method, message) {
        return function (error, eventName) {
          if (message === 'Warning:') {
            method.apply(context, [message].concat(Array.prototype.slice.apply(arguments)));
          } else {
            method.apply(context, [message].concat(Array.prototype.slice.apply(arguments)));
          }
        };
      }

      // let's do the actual proxying over originals
      //     console.log = proxy(console, console.log, 'Log:')
      console.error = proxy(console, console.error, 'Error:');
      console.warn = proxy(console, console.warn, 'Warning:');
      // console.warn = proxy(console, console.warn, 'Warning:');

      this.createLoadingBar();
    }
  }, {
    key: 'createLoadingBar',
    value: function createLoadingBar() {
      // Variables
      this.barWidth = 300;
      this.height = 50;
      this.backgroundWidth = 330;
      this.backgroundHeight = 80;

      // Background
      this.barBackground = new _phaser2.default.Graphics(game);

      this.barBackground.beginFill(0x9c9c9c);
      this.barBackground.drawRect(0, 0, this.backgroundWidth, this.backgroundHeight);
      this.barBackground.endFill();

      this.barBackground.x = game.width / 2 - this.backgroundWidth / 2;
      this.barBackground.y = game.height * (3 / 4) - this.backgroundHeight / 2;

      game.add.existing(this.barBackground);

      // Background
      this.bar = new _phaser2.default.Graphics(game);

      this.bar.beginFill(0x00ff00);
      this.bar.drawRect(0, 0, 1, this.height);
      this.bar.endFill();

      this.bar.x = game.width / 2 - this.barWidth / 2;
      this.bar.y = game.height * (3 / 4) - this.height / 2;

      game.add.existing(this.bar);

      // Percentage
      this.percentage = new _text2.default({
        x: game.width / 2,
        y: game.height * 3 / 4 - 80,
        anchorX: 0.5,
        anchorY: 0.5,
        text: '0%',
        color: '#000000'
      });

      game.add.existing(this.percentage);

      // Logo
      this.logo = new _sprite2.default({
        asset: 'logo',
        x: game.width / 2,
        y: game.height / 4 + 50,
        anchorX: 0.5,
        anchorY: 0.5
      });

      this.logo.scale.setTo(_viewportManager2.default.instance.zoomIn);

      game.add.existing(this.logo);
    }
  }, {
    key: 'setLoadingProgress',
    value: function setLoadingProgress(progress) {
      this.bar.width = progress / 100 * this.barWidth;
      this.percentage.text = progress + '%';
    }
  }, {
    key: 'preload',
    value: function preload() {
      var _this2 = this;

      this.loadImages();
      this.loadJson();
      this.soundList = [];
      this.game.soundManager = new _SoundManager2.default(game);
      this.loadSfx();
      this.load.onLoadComplete.addOnce(function () {
        _this2.loadComplete();
      }, this);

      this.load.onFileComplete.add(function (progress) {
        _this2.setLoadingProgress(progress);
      });
    }
  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }, {
    key: 'loadJson',
    value: function loadJson() {
      this.game.load.json('info', 'assets/values/info.json');
      this.game.load.json('skinList', 'assets/values/skins.json');
      this.game.load.json('achievements', 'assets/values/achievements.json');
      this.game.load.json('playerProgressionInfo', 'assets/values/playerProgressionInfo.json');
      //
      // load your tilemaps
      //
      this.game.load.json('tileData', 'assets/values/tile_data.json');
      this.game.load.json('chunkDifficultyChances.json', 'assets/values/chunkDifficultyChances.json');

      this.game.load.json('chunk_spawn', 'assets/values/chunk_spawn.json');
      this.game.load.json('chunk_ftu', 'assets/values/chunk_ftu.json');
      game.availableChunks = [];
      var chunkList = game.cache.getJSON('chunk_list').children;
      for (var key in chunkList) {
        // console.log(chunkList[key].path);
        this.game.load.json(chunkList[key].name, chunkList[key].path);
        game.availableChunks.push(chunkList[key].name);
      }
    }
  }, {
    key: 'loadImages',
    value: function loadImages() {
      // Atlas load example --------------------------------------------------------------------
      //
      // this.load.atlasJSONHash('textureAtlas', './assets/atlases/texture_atlas.png', './assets/atlases/texture_atlas.json');
      //
      // Please add your texturepacker file and all the images you used to a new folder in /atlas_data
      // ---------------------------------------------------------------------------------------

      /*
      1. Tilesets
      2. ui
      3. backgrounds
      4. Background objects
      5. Player skins
      6. interactables
         */

      //
      // load your tilesets
      //

      this.load.atlasJSONHash('tileAtlas', './assets/atlases/tiles/tile_atlas.png', './assets/atlases/tiles/tile_atlas.json');
      this.load.atlasJSONHash('backgroundObjectAtlas', './assets/atlases/backgroundObject/backgroundObject_atlas.png', './assets/atlases/backgroundObject/backgroundObject_atlas.json');
      this.load.atlasJSONHash('uiAtlas', './assets/atlases/ui/ui_atlas.png', './assets/atlases/ui/ui_atlas.json');

      //
      // load your ui
      //
      this.load.spritesheet('frame', 'assets/images/ui/frame.png', 30, 30);
      this.load.spritesheet('bgFrame', 'assets/images/ui/bg-framed.png', 40, 40);
      this.load.spritesheet('gameOverFrame', 'assets/images/ui/ui_box_9slice.png', 40, 40);
      this.load.spritesheet('gameOverEdgeFrame', 'assets/images/ui/ui_box_edges.png', 40, 40);

      // this.load.image('chat_bot_challenge', 'assets/images/chat_bot/fb_message_challenge.png');

      //
      // load your backgrounds
      //

      //
      // load your Background objects
      //
      this.load.bitmapFont('font', './assets/fonts/font.png', './assets/fonts/font.fnt');

      //
      // load your Player skins
      //
      this.load.atlasJSONHash('playerAtlas', './assets/atlases/player/player_atlas.png', './assets/atlases/player/player_atlas.json');

      //
      // load your interactables
      //
      this.load.spritesheet('coin', './assets/images/coin_spritesheet.png', 1113 / 7, 166);
    }
  }, {
    key: 'loadSfx',
    value: function loadSfx() {
      var sfxList = [];
      sfxList.push({ name: 'intro', dir: './assets/sounds/introtitle', loop: false });
      sfxList.push({ name: 'button', dir: './assets/sounds/button', loop: false });
      sfxList.push({ name: 'kick', dir: './assets/sounds/kicktheball', loop: false });
      sfxList.push({ name: 'cheer', dir: './assets/sounds/sfx_fireworks', loop: false });

      sfxList.push({ name: 'gameplay', dir: './assets/sounds/gameplay', loop: true });
      sfxList.push({ name: 'mainTheme', dir: './assets/sounds/main_theme', loop: true });
      sfxList.push({ name: 'gameOver', dir: './assets/sounds/game_over', loop: false });

      sfxList.push({ name: 'coin', dir: './assets/sounds/coin', loop: false });
      sfxList.push({ name: 'skinUnlock', dir: './assets/sounds/skin_unlock', loop: false });
      sfxList.push({ name: 'teleport', dir: './assets/sounds/teleport', loop: false });
      this.loadSounds(sfxList);
    }
  }, {
    key: 'loadComplete',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var i, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (i = 0; i < this.soundList.length; i += 1) {
                  this.game.soundManager.addSound(this.soundList[i].name, this.soundList[i].loop);
                }

                _storageManager2.default.instance.loadSaveData();

                if (!(_backend2.default.instance.isSupported() && (_storageManager2.default.instance.get('leaderboardId') === 0 || typeof _storageManager2.default.instance.get('leaderboardId') !== 'number'))) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return _backend2.default.instance.createEntry();

              case 5:
                result = _context.sent;


                if (!result) {
                  _backend2.default.instance._isSupported = false;
                }

                if (result) {
                  _storageManager2.default.instance.set('leaderboardId', result.id);
                }

              case 8:

                game.soundManager.setMusic(_storageManager2.default.instance.get('music'), false);
                game.soundManager.setSound(_storageManager2.default.instance.get('sound'), false);
                setTimeout(function () {
                  _this3.startGame();
                }, 1000);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadComplete() {
        return _ref.apply(this, arguments);
      }

      return loadComplete;
    }()
  }, {
    key: 'startGame',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        var keys;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                game.highscore = 0;
                // TODO Get player highscore
                keys = this.soundList.map(function (sound) {
                  return sound.name;
                });

                game.cache.getBitmapFont('font').font.lineHeight = 180;
                game.sound.setDecodedCallback(keys, function () {
                  _this4.state.start('Game');
                }, this);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function startGame() {
        return _ref2.apply(this, arguments);
      }

      return startGame;
    }()
  }, {
    key: 'loadSounds',
    value: function loadSounds(array) {
      this.soundList = array;
      for (var i = 0; i < array.length; i += 1) {
        this.load.audio(array[i].name, [array[i].dir + '.ogg', array[i].dir + '.m4a']);
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.logo.x = game.world.width / 2;
      this.logo.y = game.world.height / 4 + 50;

      this.logo.scale.setTo(_viewportManager2.default.instance.zoomIn);

      this.percentage.x = game.width / 2;
      this.percentage.y = game.height * 3 / 4 - 80;

      this.barBackground.x = game.width / 2 - this.backgroundWidth / 2;
      this.barBackground.y = game.height * (3 / 4) - this.backgroundHeight / 2;

      this.bar.x = game.width / 2 - this.barWidth / 2;
      this.bar.y = game.height * (3 / 4) - this.height / 2;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Manages Sound, methods in this class can be used to play sounds
var SoundManager = function () {
  function SoundManager(game) {
    _classCallCheck(this, SoundManager);

    this.game = game;

    this.sound = null;
    this.music = null;

    this.soundList = [];
    this.musicList = [];
  }

  _createClass(SoundManager, [{
    key: 'mute',
    value: function mute() {
      this.game.sound.mute = true;
    }
  }, {
    key: 'unmute',
    value: function unmute() {
      this.game.sound.mute = false;
    }
  }, {
    key: 'addSound',
    value: function addSound(key) {
      var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var allowMultiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var sound = new _phaser2.default.Sound(this.game, key, 1, loop);
      sound.allowMultiple = allowMultiple;
      if (loop) {
        this.musicList.push(sound);
      } else {
        this.soundList.push(sound);
      }
    }
  }, {
    key: 'getSound',
    value: function getSound(key) {
      return this.soundList.find(function (x) {
        return x.key === key;
      });
    }
  }, {
    key: 'getMusic',
    value: function getMusic(key) {
      return this.musicList.find(function (x) {
        return x.key === key;
      });
    }
  }, {
    key: 'getSoundRandom',
    value: function getSoundRandom(baseKey) {
      var sounds = [];
      sounds = this.soundList.filter(function (x) {
        return x.key.indexOf(baseKey) !== -1;
      });
      return sounds[Math.floor(Math.random() * sounds.length)];
    }
  }, {
    key: 'stopSound',
    value: function stopSound(key) {
      this.getSound(key).stop();
    }
  }, {
    key: 'playSound',
    value: function playSound(key) {
      var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.getSound(key).play();
      if (loop === true) {
        this.getSound(key).loop = true;
      }
      return true;
    }
  }, {
    key: 'playMusic',
    value: function playMusic(key) {
      if (this.currentMusic) {
        this.currentMusic.stop();
      }
      var music = this.getMusic(key);
      music.play();

      this.currentMusic = music;
    }
  }, {
    key: 'playSoundRandom',
    value: function playSoundRandom(baseKey) {
      var sounds = [];
      sounds = this.soundList.filter(function (x) {
        return x.key.indexOf(baseKey) !== -1;
      });
      sounds[Math.floor(Math.random() * sounds.length)].play();
    }
  }, {
    key: 'setMusic',
    value: function setMusic(value) {
      this.music = value;

      for (var i = 0; i < this.musicList.length; i += 1) {
        this.musicList[i].volume = this.music ? 1 : 0;
      }
    }
  }, {
    key: 'toggleMusic',
    value: function toggleMusic() {
      this.music = !this.music;

      for (var i = 0; i < this.musicList.length; i += 1) {
        this.musicList[i].volume = this.music ? 1 : 0;
      }

      _storageManager2.default.instance.set('music', this.music);

      return this.music;
    }
  }, {
    key: 'setSound',
    value: function setSound(value) {
      this.sound = value;

      for (var i = 0; i < this.soundList.length; i += 1) {
        this.soundList[i].volume = this.sound ? 1 : 0;
      }
    }
  }, {
    key: 'toggleSound',
    value: function toggleSound() {
      this.sound = !this.sound;

      for (var i = 0; i < this.soundList.length; i += 1) {
        this.soundList[i].volume = this.sound ? 1 : 0;
      }

      _storageManager2.default.instance.set('sound', this.sound);
    }
  }]);

  return SoundManager;
}();

exports.default = SoundManager;

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}(); /*!
      * phaser-input - version 2.0.5
      * Adds input boxes to Phaser like CanvasInput, but also works for WebGL and Mobile, made for Phaser only.
      *
      * Azerion
      * Build at 18-03-2019
      * Released under MIT License
      */

var PhaserInput;
(function (PhaserInput) {
  var InputType = void 0;
  (function (InputType) {
    InputType[InputType.text = 0] = 'text';
    InputType[InputType.password = 1] = 'password';
    InputType[InputType.number = 2] = 'number';
  })(InputType = PhaserInput.InputType || (PhaserInput.InputType = {}));
  var InputElement = function () {
    function InputElement(game, id, type, value, focusIn, focusOut) {
      if (type === void 0) {
        type = InputType.text;
      }
      if (value === void 0) {
        value = '';
      }
      var _this = this;
      this.id = id;
      this.type = type;
      this.game = game;
      this.focusIn = focusIn;
      this.focusOut = focusOut;
      var canvasTopX = this.game.canvas.getBoundingClientRect().top + document.body.scrollTop;
      this.element = document.createElement('input');
      this.element.id = id;
      this.element.style.position = 'absolute';
      this.element.style.top = canvasTopX + 'px';
      this.element.style.left = (-40).toString() + 'px';
      this.element.style.width = 10 .toString() + 'px';
      this.element.style.height = 10 .toString() + 'px';
      this.element.style.border = '0px';
      this.element.value = this.value;
      this.element.type = InputType[type];
      this.element.addEventListener('focusin', function (event) {
        console.log(event);
        event.stopPropagation();
        if (_this.focusIn instanceof _phaser2.default.Signal) {
          _this.focusIn.dispatch();
        }
      });
      this.element.addEventListener('focusout', function (event) {
        event.stopPropagation();
        console.log(event);

        if (_this.focusOut instanceof _phaser2.default.Signal) {
          _this.focusOut.dispatch();
        }
      });
      document.body.appendChild(this.element);
    }
    InputElement.prototype.addKeyUpListener = function (callback) {
      this.keyUpCallback = callback;
      document.addEventListener('keyup', this.keyUpCallback);
      this.element.addEventListener('input', this.keyUpCallback);
    };
    InputElement.prototype.blockKeyDownEvents = function () {
      document.addEventListener('keydown', this.preventKeyPropagation);
    };
    InputElement.prototype.preventKeyPropagation = function (evt) {
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    };
    InputElement.prototype.unblockKeyDownEvents = function () {
      document.removeEventListener('keydown', this.preventKeyPropagation);
    };
    InputElement.prototype.removeEventListener = function () {
      document.removeEventListener('keyup', this.keyUpCallback);
      this.element.removeEventListener('input', this.keyUpCallback);
    };
    InputElement.prototype.destroy = function () {
      document.body.removeChild(this.element);
    };
    InputElement.prototype.setMax = function (max, min) {
      if (max === undefined) {
        return;
      }
      if (this.type === InputType.text || this.type === InputType.password) {
        this.element.maxLength = parseInt(max, 10);
      } else if (this.type === InputType.number) {
        this.element.max = max;
        if (min === undefined) {
          return;
        }
        this.element.min = min;
      }
    };
    Object.defineProperty(InputElement.prototype, 'value', {
      get: function get() {
        return this.element.value;
      },
      set: function set(value) {
        this.element.value = value;
      },

      enumerable: true,
      configurable: true
    });
    InputElement.prototype.focus = function () {
      var _this = this;
      this.element.focus();
      if (!this.game.device.desktop && this.game.device.chrome) {
        var originalWidth_1 = window.innerWidth;var originalHeight_1 = window.innerHeight;
        var kbAppeared_1 = false;
        var interval_1 = setInterval(function () {
          if (originalWidth_1 > window.innerWidth || originalHeight_1 > window.innerHeight) {
            kbAppeared_1 = true;
          }
          if (kbAppeared_1 && originalWidth_1 === window.innerWidth && originalHeight_1 === window.innerHeight) {
            if (_this.focusOut instanceof _phaser2.default.Signal) {
              _this.focusOut.dispatch();
            }
            clearInterval(interval_1);
          }
        }, 50);
      }
    };
    InputElement.prototype.blur = function () {
      this.element.blur();
    };
    Object.defineProperty(InputElement.prototype, 'hasSelection', {
      get: function get() {
        if (this.type === InputType.number) {
          return false;
        }
        return this.element.selectionStart !== this.element.selectionEnd;
      },

      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InputElement.prototype, 'caretStart', {
      get: function get() {
        return this.element.selectionEnd;
      },

      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InputElement.prototype, 'caretEnd', {
      get: function get() {
        return this.element.selectionStart;
      },

      enumerable: true,
      configurable: true
    });
    InputElement.prototype.getCaretPosition = function () {
      if (this.type === InputType.number) {
        return -1;
      }
      return this.element.selectionStart;
    };
    InputElement.prototype.setCaretPosition = function (pos) {
      if (this.type === InputType.number) {
        return;
      }
      this.element.setSelectionRange(pos, pos);
    };
    return InputElement;
  }();
  PhaserInput.InputElement = InputElement;
})(PhaserInput || (PhaserInput = {}));
var PhaserInput;
(function (PhaserInput) {
  var ForceCase = void 0;
  (function (ForceCase) {
    ForceCase[ForceCase.none = 0] = 'none';
    ForceCase[ForceCase.lower = 1] = 'lower';
    ForceCase[ForceCase.upper = 2] = 'upper';
  })(ForceCase = PhaserInput.ForceCase || (PhaserInput.ForceCase = {}));
  var InputField = function (_super) {
    __extends(InputField, _super);
    function InputField(game, x, y, inputOptions) {
      if (inputOptions === void 0) {
        inputOptions = {};
      }
      var _this = _super.call(this, game, x, y) || this;
      _this.focusOutOnEnter = true;
      _this.placeHolder = null;
      _this.box = null;
      _this.focus = false;
      _this.value = '';
      _this.windowScale = 1;
      _this.blockInput = true;
      _this.focusIn = new _phaser2.default.Signal();
      _this.focusOut = new _phaser2.default.Signal();
      _this.blink = true;
      _this.cnt = 0;
      _this.inputOptions = inputOptions;
      _this.inputOptions.width = typeof inputOptions.width === 'number' ? inputOptions.width : 150;
      _this.inputOptions.padding = typeof inputOptions.padding === 'number' ? inputOptions.padding : 0;
      _this.inputOptions.textAlign = inputOptions.textAlign || 'left';
      _this.inputOptions.type = inputOptions.type || PhaserInput.InputType.text;
      _this.inputOptions.forceCase = inputOptions.forceCase ? inputOptions.forceCase : ForceCase.none;
      _this.inputOptions.borderRadius = typeof inputOptions.borderRadius === 'number' ? inputOptions.borderRadius : 0;
      _this.inputOptions.height = typeof inputOptions.height === 'number' ? inputOptions.height : 14;
      _this.inputOptions.fillAlpha = inputOptions.fillAlpha === undefined ? 1 : inputOptions.fillAlpha;
      _this.inputOptions.selectionColor = inputOptions.selectionColor || 'rgba(179, 212, 253, 0.8)';
      _this.inputOptions.zoom = !game.device.desktop ? inputOptions.zoom || false : false;
      _this.box = new PhaserInput.InputBox(_this.game, inputOptions);
      _this.setTexture(_this.box.generateTexture());
      _this.textMask = new PhaserInput.TextMask(_this.game, inputOptions);
      _this.addChild(_this.textMask);
      _this.domElement = new PhaserInput.InputElement(_this.game, 'phaser-input-' + (Math.random() * 10000 | 0).toString(), _this.inputOptions.type, _this.value, _this.focusIn, _this.focusOut);
      _this.domElement.setMax(_this.inputOptions.max, _this.inputOptions.min);
      _this.selection = new PhaserInput.SelectionHighlight(_this.game, _this.inputOptions);
      _this.selection.mask = _this.textMask;
      _this.addChild(_this.selection);
      if (inputOptions.placeHolder && inputOptions.placeHolder.length > 0) {
        _this.placeHolder = new _phaser2.default.Text(game, _this.inputOptions.padding, _this.inputOptions.padding, inputOptions.placeHolder, {
          font: inputOptions.font || '14px Arial',
          fontWeight: inputOptions.fontWeight || 'normal',
          fill: inputOptions.placeHolderColor || '#bfbebd'
        });
        _this.placeHolder.mask = _this.textMask;
        _this.addChild(_this.placeHolder);
      }
      _this.cursor = new _phaser2.default.Text(game, _this.inputOptions.padding, _this.inputOptions.padding - 2, '|', {
        font: inputOptions.font || '14px Arial',
        fontWeight: inputOptions.fontWeight || 'normal',
        fill: inputOptions.cursorColor || '#000000'
      });
      _this.cursor.visible = false;
      _this.addChild(_this.cursor);
      _this.text = new _phaser2.default.Text(game, _this.inputOptions.padding, _this.inputOptions.padding, '', {
        font: inputOptions.font || '14px Arial',
        fontWeight: inputOptions.fontWeight || 'normal',
        fill: inputOptions.fill || '#000000'
      });
      _this.text.mask = _this.textMask;
      _this.addChild(_this.text);
      _this.offscreenText = new _phaser2.default.Text(game, _this.inputOptions.padding, _this.inputOptions.padding, '', {
        font: inputOptions.font || '14px Arial',
        fontWeight: inputOptions.fontWeight || 'normal',
        fill: inputOptions.fill || '#000000'
      });
      _this.updateTextAlignment();
      _this.inputEnabled = true;
      _this.input.useHandCursor = true;
      _this.game.input.onDown.add(_this.checkDown, _this);
      _this.focusOut.add(function () {
        if (PhaserInput.KeyboardOpen) {
          _this.endFocus();
          if (_this.inputOptions.zoom) {
            _this.zoomOut();
          }
        }
      });
      return _this;
    }
    Object.defineProperty(InputField.prototype, 'width', {
      get: function get() {
        return this.inputOptions.width;
      },
      set: function set(width) {
        this.inputOptions.width = width;
        this.box.resize(width);
        this.textMask.resize(width);
        this.updateTextAlignment();
      },

      enumerable: true,
      configurable: true
    });
    InputField.prototype.updateTextAlignment = function () {
      switch (this.inputOptions.textAlign) {
        case 'left':
          this.text.anchor.set(0, 0);
          this.text.x = this.inputOptions.padding;
          if (this.placeHolder !== null) {
            this.placeHolder.anchor.set(0, 0);
          }
          this.cursor.x = this.inputOptions.padding + this.getCaretPosition();
          break;
        case 'center':
          this.text.anchor.set(0.5, 0);
          this.text.x = this.inputOptions.padding + this.inputOptions.width / 2;
          if (this.placeHolder !== null) {
            this.placeHolder.anchor.set(0.5, 0);
            this.placeHolder.x = this.inputOptions.padding + this.inputOptions.width / 2;
          }
          this.cursor.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2 + this.getCaretPosition();
          break;
        case 'right':
          this.text.anchor.set(1, 0);
          this.text.x = this.inputOptions.padding + this.inputOptions.width;
          if (this.placeHolder !== null) {
            this.placeHolder.anchor.set(1, 0);
            this.placeHolder.x = this.inputOptions.padding + this.inputOptions.width;
          }
          this.cursor.x = this.inputOptions.padding + this.inputOptions.width;
          break;
      }
    };
    InputField.prototype.checkDown = function (e) {
      if (!this.value) {
        this.resetText();
      }
      if (this.input.checkPointerOver(e)) {
        if (this.focus) {
          this.setCaretOnclick(e);
          return;
        }
        if (this.inputOptions.zoom && !PhaserInput.Zoomed) {
          this.zoomIn();
        }
        this.startFocus();
      } else if (this.focus === true) {
        this.endFocus();
        if (this.inputOptions.zoom) {
          this.zoomOut();
        }
      }
    };
    InputField.prototype.update = function () {
      this.text.update();
      if (this.placeHolder) {
        this.placeHolder.update();
      }
      if (!this.focus) {
        return;
      }
      if (this.cnt !== 30) {
        return this.cnt++;
      }
      this.cursor.visible = this.blink;
      this.blink = !this.blink;
      this.cnt = 0;
    };
    InputField.prototype.endFocus = function () {
      var _this = this;
      if (!this.focus) {
        return;
      }
      this.domElement.removeEventListener();
      if (this.blockInput === true) {
        this.domElement.unblockKeyDownEvents();
      }
      this.focus = false;
      if (this.value.length === 0 && this.placeHolder !== null) {
        this.placeHolder.visible = true;
      }
      this.cursor.visible = false;
      if (this.game.device.desktop) {
        setTimeout(function () {
          _this.domElement.blur();
        }, 0);
      } else {
        this.domElement.blur();
      }
      if (!this.game.device.desktop) {
        PhaserInput.KeyboardOpen = false;
        PhaserInput.onKeyboardClose.dispatch();
      }
    };
    InputField.prototype.startFocus = function () {
      var _this = this;
      this.focus = true;
      if (this.placeHolder !== null) {
        this.placeHolder.visible = false;
      }
      if (this.game.device.desktop) {
        setTimeout(function () {
          _this.keyUpProcessor();
        }, 0);
      } else {
        this.keyUpProcessor();
      }
      if (!this.game.device.desktop) {
        PhaserInput.KeyboardOpen = true;
        PhaserInput.onKeyboardOpen.dispatch();
      }
    };
    InputField.prototype.keyUpProcessor = function () {
      this.domElement.addKeyUpListener(this.keyListener.bind(this));
      this.domElement.focus();
      if (this.blockInput === true) {
        this.domElement.blockKeyDownEvents();
      }
    };
    InputField.prototype.updateText = function () {
      var text = '';
      if (this.inputOptions.type === PhaserInput.InputType.password) {
        for (var i = 0; i < this.value.length; i++) {
          text += '*';
        }
      } else if (this.inputOptions.type === PhaserInput.InputType.number) {
        var val = parseInt(this.value);
        if (val < parseInt(this.inputOptions.min)) {
          text = this.value = this.domElement.value = this.inputOptions.min;
        } else if (val > parseInt(this.inputOptions.max)) {
          text = this.value = this.domElement.value = this.inputOptions.max;
        } else {
          text = this.value;
        }
      } else {
        text = this.value;
      }
      this.text.setText(text);
      if (this.text.width > this.inputOptions.width) {
        this.text.anchor.x = 1;
        this.text.x = this.inputOptions.padding + this.inputOptions.width;
      } else {
        switch (this.inputOptions.textAlign) {
          case 'left':
            this.text.anchor.set(0, 0);
            this.text.x = this.inputOptions.padding;
            break;
          case 'center':
            this.text.anchor.set(0.5, 0);
            this.text.x = this.inputOptions.padding + this.inputOptions.width / 2;
            break;
          case 'right':
            this.text.anchor.set(1, 0);
            this.text.x = this.inputOptions.padding + this.inputOptions.width;
            break;
        }
      }
    };
    InputField.prototype.updateCursor = function () {
      if (this.text.width > this.inputOptions.width || this.inputOptions.textAlign === 'right') {
        this.cursor.x = this.inputOptions.padding + this.inputOptions.width;
      } else {
        switch (this.inputOptions.textAlign) {
          case 'left':
            this.cursor.x = this.inputOptions.padding + this.getCaretPosition();
            break;
          case 'center':
            this.cursor.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2 + this.getCaretPosition();
            break;
        }
      }
    };
    InputField.prototype.getCaretPosition = function () {
      var caretPosition = this.domElement.getCaretPosition();
      if (caretPosition === -1) {
        return this.text.width;
      }
      var text = this.value;
      if (this.inputOptions.type === PhaserInput.InputType.password) {
        text = '';
        for (var i = 0; i < this.value.length; i++) {
          text += '*';
        }
      }
      this.offscreenText.setText(text.slice(0, caretPosition));
      return this.offscreenText.width;
    };
    InputField.prototype.setCaretOnclick = function (e) {
      var localX = this.text.toLocal(new PIXI.Point(e.x, e.y), this.game.world).x;
      if (this.inputOptions.textAlign && this.inputOptions.textAlign === 'center') {
        localX += this.text.width / 2;
      }
      var characterWidth = this.text.width / this.value.length;
      var index = 0;
      for (var i = 0; i < this.value.length; i++) {
        if (localX >= i * characterWidth && localX <= (i + 1) * characterWidth) {
          index = i;
          break;
        }
      }
      if (localX > (this.value.length - 1) * characterWidth) {
        index = this.value.length;
      }
      this.startFocus();
      this.domElement.setCaretPosition(index);
      this.updateCursor();
    };
    InputField.prototype.updateSelection = function () {
      if (this.domElement.hasSelection) {
        var text = this.value;
        if (this.inputOptions.type === PhaserInput.InputType.password) {
          text = '';
          for (var i = 0; i < this.value.length; i++) {
            text += '*';
          }
        }
        text = text.substring(this.domElement.caretStart, this.domElement.caretEnd);
        this.offscreenText.setText(text);
        this.selection.updateSelection(this.offscreenText.getBounds());
        switch (this.inputOptions.textAlign) {
          case 'left':
            this.selection.x = this.inputOptions.padding;
            break;
          case 'center':
            this.selection.x = this.inputOptions.padding + this.inputOptions.width / 2 - this.text.width / 2;
            break;
        }
      } else {
        this.selection.clear();
      }
    };
    InputField.prototype.zoomIn = function () {
      if (PhaserInput.Zoomed) {
        return;
      }
      var bounds = this.getBounds();
      if (window.innerHeight > window.innerWidth) {
        this.windowScale = this.game.width / (bounds.width * 1.5);
      } else {
        this.windowScale = this.game.width / 2 / (bounds.width * 1.5);
      }
      var offsetX = (this.game.width - bounds.width * 1.5) / 2 / this.windowScale;
      this.game.world.scale.set(this.game.world.scale.x * this.windowScale, this.game.world.scale.y * this.windowScale);
      this.game.world.pivot.set(bounds.x - offsetX, bounds.y - this.inputOptions.padding * 2);
      PhaserInput.Zoomed = true;
    };
    InputField.prototype.zoomOut = function () {
      if (!PhaserInput.Zoomed) {
        return;
      }
      this.game.world.scale.set(this.game.world.scale.x / this.windowScale, this.game.world.scale.y / this.windowScale);
      this.game.world.pivot.set(0, 0);
      PhaserInput.Zoomed = false;
    };
    InputField.prototype.keyListener = function (evt) {
      this.value = this.getFormattedText(this.domElement.value);
      if (evt.keyCode === 13) {
        if (this.focusOutOnEnter) {
          this.endFocus();
        }
        return;
      }
      this.updateText();
      this.updateCursor();
      this.updateSelection();
      evt.preventDefault();
    };
    InputField.prototype.destroy = function (destroyChildren) {
      this.game.input.onDown.remove(this.checkDown, this);
      this.focusIn.removeAll();
      this.focusOut.removeAll();
      this.domElement.destroy();
      _super.prototype.destroy.call(this, destroyChildren);
    };
    InputField.prototype.resetText = function () {
      this.setText();
    };
    InputField.prototype.setText = function (text) {
      if (text === void 0) {
        text = '';
      }
      if (this.placeHolder !== null) {
        if (text.length > 0) {
          this.placeHolder.visible = false;
        } else {
          this.placeHolder.visible = true;
        }
      }
      this.value = this.getFormattedText(text);
      this.domElement.value = this.value;
      this.updateText();
      this.updateCursor();
      this.endFocus();
    };
    InputField.prototype.getFormattedText = function (text) {
      switch (this.inputOptions.forceCase) {
        default:
        case ForceCase.none:
          return text;
        case ForceCase.lower:
          return text.toLowerCase();
        case ForceCase.upper:
          return text.toUpperCase();
      }
    };
    return InputField;
  }(_phaser2.default.Sprite);
  PhaserInput.InputField = InputField;
})(PhaserInput || (PhaserInput = {}));
var PhaserInput;
(function (PhaserInput) {
  var InputBox = function (_super) {
    __extends(InputBox, _super);
    function InputBox(game, inputOptions) {
      var _this = _super.call(this, game, 0, 0) || this;
      _this.bgColor = inputOptions.backgroundColor ? parseInt(inputOptions.backgroundColor.slice(1), 16) : 0xffffff;
      _this.borderRadius = inputOptions.borderRadius = typeof inputOptions.borderRadius === 'number' ? inputOptions.borderRadius : 0;
      _this.borderWidth = inputOptions.borderWidth = typeof inputOptions.borderWidth === 'number' ? inputOptions.borderWidth : 1;
      _this.borderColor = inputOptions.borderColor ? parseInt(inputOptions.borderColor.slice(1), 16) : 0x959595;
      _this.boxAlpha = inputOptions.fillAlpha;
      _this.padding = inputOptions.padding;
      var height = inputOptions.height;
      var width = inputOptions.width;
      var height;
      if (inputOptions.font) {
        height = Math.max(parseInt(inputOptions.font.substr(0, inputOptions.font.indexOf('px')), 10), height);
      }
      _this.boxHeight = _this.padding * 2 + height;
      var width = inputOptions.width;
      _this.boxWidth = _this.padding * 2 + width;
      _this.drawBox();
      return _this;
    }
    InputBox.prototype.resize = function (newWidth) {
      this.boxWidth = this.padding * 2 + newWidth;
      this.drawBox();
    };
    InputBox.prototype.drawBox = function () {
      this.clear().beginFill(this.bgColor, this.boxAlpha).lineStyle(this.borderWidth, this.borderColor, this.boxAlpha);
      if (this.borderRadius > 0) {
        this.drawRoundedRect(0, 0, this.boxWidth, this.boxHeight, this.borderRadius);
      } else {
        this.drawRect(0, 0, this.boxWidth, this.boxHeight);
      }
    };
    return InputBox;
  }(_phaser2.default.Graphics);
  PhaserInput.InputBox = InputBox;
})(PhaserInput || (PhaserInput = {}));
var PhaserInput;
(function (PhaserInput) {
  var SelectionHighlight = function (_super) {
    __extends(SelectionHighlight, _super);
    function SelectionHighlight(game, inputOptions) {
      var _this = _super.call(this, game, inputOptions.padding, inputOptions.padding) || this;
      _this.inputOptions = inputOptions;
      return _this;
    }
    SelectionHighlight.prototype.updateSelection = function (rect) {
      var color = _phaser2.default.Color.webToColor(this.inputOptions.selectionColor);
      this.clear();
      this.beginFill(SelectionHighlight.rgb2hex(color), color.a);
      this.drawRect(rect.x, rect.y, rect.width, rect.height - this.inputOptions.padding);
    };
    SelectionHighlight.rgb2hex = function (color) {
      return parseInt(('0' + color.r.toString(16)).slice(-2) + ('0' + color.g.toString(16)).slice(-2) + ('0' + color.b.toString(16)).slice(-2), 16);
    };
    return SelectionHighlight;
  }(_phaser2.default.Graphics);
  PhaserInput.SelectionHighlight = SelectionHighlight;
})(PhaserInput || (PhaserInput = {}));
var PhaserInput;
(function (PhaserInput) {
  var TextMask = function (_super) {
    __extends(TextMask, _super);
    function TextMask(game, inputOptions) {
      var _this = _super.call(this, game, inputOptions.padding, inputOptions.padding) || this;
      var height = inputOptions.height;
      if (inputOptions.font) {
        height = Math.max(parseInt(inputOptions.font.substr(0, inputOptions.font.indexOf('px')), 10), height);
      }
      _this.maskWidth = inputOptions.width;
      _this.maskHeight = height * 1.3;
      _this.drawMask();
      return _this;
    }
    TextMask.prototype.resize = function (newWidth) {
      this.maskWidth = newWidth;
      this.drawMask();
    };
    TextMask.prototype.drawMask = function () {
      this.clear().beginFill(0x000000).drawRect(0, 0, this.maskWidth, this.maskHeight).endFill();
    };
    return TextMask;
  }(_phaser2.default.Graphics);
  PhaserInput.TextMask = TextMask;
})(PhaserInput || (PhaserInput = {}));
var PhaserInput;
(function (PhaserInput) {
  PhaserInput.Zoomed = false;
  PhaserInput.KeyboardOpen = false;
  PhaserInput.onKeyboardOpen = new _phaser2.default.Signal();
  PhaserInput.onKeyboardClose = new _phaser2.default.Signal();
  var Plugin = function (_super) {
    __extends(Plugin, _super);
    function Plugin(game, parent) {
      var _this = _super.call(this, game, parent) || this;
      _this.addInputFieldFactory();
      return _this;
    }
    Plugin.prototype.addInputFieldFactory = function () {
      _phaser2.default.GameObjectFactory.prototype.inputField = function (x, y, inputOptions, group) {
        if (group === undefined) {
          group = this.world;
        }
        var nineSliceObject = new PhaserInput.InputField(this.game, x, y, inputOptions);
        return group.add(nineSliceObject);
      };
      _phaser2.default.GameObjectCreator.prototype.inputField = function (x, y, inputOptions) {
        return new PhaserInput.InputField(this.game, x, y, inputOptions);
      };
    };
    return Plugin;
  }(_phaser2.default.Plugin);
  Plugin.Zoomed = false;
  Plugin.KeyboardOpen = false;
  Plugin.onKeyboardOpen = new _phaser2.default.Signal();
  Plugin.onKeyboardClose = new _phaser2.default.Signal();
  PhaserInput.Plugin = Plugin;
})(PhaserInput || (PhaserInput = {}));
// # sourceMappingURL=phaser-input.js.map
module.exports = PhaserInput;

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Singleton2 = __webpack_require__(38);

var _Singleton3 = _interopRequireDefault(_Singleton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fetch = function (_Singleton) {
  _inherits(Fetch, _Singleton);

  function Fetch(url) {
    _classCallCheck(this, Fetch);

    var _this = _possibleConstructorReturn(this, (Fetch.__proto__ || Object.getPrototypeOf(Fetch)).call(this));

    _this._isSupported = true;

    _this.url = url;
    return _this;
  }

  _createClass(Fetch, [{
    key: 'post',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path, body) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.isSupported()) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:
                _context.next = 4;
                return fetch(this.url + path, {
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Request-Headers': '*',
                    'Access-Control-Request-Method': '*'
                  }
                });

              case 4:
                result = _context.sent;
                return _context.abrupt('return', result.json());

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function post(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path, parameters) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.isSupported()) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                _context2.next = 4;
                return fetch(this.url + path + this.query(parameters), {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Request-Headers': '*',
                    'Access-Control-Request-Method': '*'
                  }
                });

              case 4:
                result = _context2.sent;
                return _context2.abrupt('return', result.json());

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'query',
    value: function query(parameters) {
      if (!parameters || (typeof parameters === 'undefined' ? 'undefined' : _typeof(parameters)) !== 'object') {
        return '';
      }

      var query = Object.keys(parameters).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters[k]);
      }).join('&');
      return '?' + query;
    }
  }, {
    key: 'isSupported',
    value: function isSupported() {
      return this._isSupported;
    }
  }]);

  return Fetch;
}(_Singleton3.default);

exports.default = Fetch;

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Player = __webpack_require__(366);

var _Player2 = _interopRequireDefault(_Player);

var _UIManager = __webpack_require__(380);

var _UIManager2 = _interopRequireDefault(_UIManager);

var _BackgroundManager = __webpack_require__(386);

var _BackgroundManager2 = _interopRequireDefault(_BackgroundManager);

var _BackgroundObject = __webpack_require__(152);

var _BackgroundObject2 = _interopRequireDefault(_BackgroundObject);

var _Signals = __webpack_require__(387);

var _Signals2 = _interopRequireDefault(_Signals);

var _LevelGenerator = __webpack_require__(388);

var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);

var _ObjectPool = __webpack_require__(150);

var _ObjectPool2 = _interopRequireDefault(_ObjectPool);

var _Coin = __webpack_require__(390);

var _Coin2 = _interopRequireDefault(_Coin);

var _Teleporter = __webpack_require__(153);

var _Teleporter2 = _interopRequireDefault(_Teleporter);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _Tile = __webpack_require__(391);

var _Tile2 = _interopRequireDefault(_Tile);

var _RevivePlatform = __webpack_require__(392);

var _RevivePlatform2 = _interopRequireDefault(_RevivePlatform);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _AchievementNotifications = __webpack_require__(151);

var _AchievementNotifications2 = _interopRequireDefault(_AchievementNotifications);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


// Game state, all game elements are added here
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      game.clearBeforeRender = false;
      game.debugLine = [];

      this.minScale = _orientation2.default.MIN_GAME_WIDTH / _orientation2.default.BASE_GAME_HEIGHT;
      this.maxScale = _orientation2.default.MAX_GAME_WIDTH / _orientation2.default.BASE_GAME_HEIGHT;

      this.prevWindowWidth = 0;
      this.prevWindowHeight = 0;
    }
  }, {
    key: 'preload',
    value: function preload() {
      _Signals2.default.addSignals();
    }
  }, {
    key: 'checkIntegrity',
    value: function checkIntegrity(originialData, valueToCheck, comparisonData) {
      var oData = originialData;
      var cData = comparisonData;
      var value = oData[valueToCheck];
      // console.log('originialData', oData);
      // console.log('valueToCheck', value);
      // console.log('comparisonData', cData);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      window.GameInterface.onMuteStateChange(isMuted => {
        isMuted ? game.soundManager.mute() : game.soundManager.unmute();
      });

      window.GameInterface.onPauseStateChange(isPaused => {
        GameInterface.helpers.showPauseOverlay(isPaused);
        game.paused = isPaused;
        if(GameInterface.isMuted()) {
          game.soundManager.mute()
        }
      });

      if(GameInterface.isMuted()) {
        game.soundManager.mute()
      } else {
        game.soundManager.unmute();
      }

      this.checkIntegrity(this.game.cache.getJSON('info'), 'skins', this.game.cache.getJSON('skinList'));
      game.TileObjectpoolCounter = 0;
      game.TilesInPool = 0;
      game.TilesOutPool = 0;
      // game.renderer.setTexturePriority(['tileAtlas', 'playerAtlas', 'backgroundObjectAtlas', 'uiAtlas', 'coin', 'teleporter', 'frame', 'bgFrame', 'friendInvite']);

      game.backgroundManager = new _BackgroundManager2.default(this.game);
      game.stage.disableVisibilityChange = true;

      game.tiles = new _phaser2.default.Group(this.game);
      // game.interactables = new Phaser.Group(this.game);

      game.tileObjectPool = new _ObjectPool2.default(this.game, _Tile2.default, 195);
      game.backgroundObjectPool = new _ObjectPool2.default(this.game, _BackgroundObject2.default, 30);
      game.coinObjectPool = new _ObjectPool2.default(this.game, _Coin2.default, 60);
      game.teleporterObjectPool = new _ObjectPool2.default(this.game, _Teleporter2.default, 20);

      game.chunkList = [];

      game.levelGenerator = new _LevelGenerator2.default(this.game, this.game.chunkList);

      game.revivePlatform = new _RevivePlatform2.default();
      game.add.existing(game.revivePlatform);

      game.player = new _Player2.default(this.game, this.game.chunkList);
      _ScreenManager2.default.instance.buildScreens();
      game.ui = new _UIManager2.default(this.game);

      game.achievementNotifications = new _AchievementNotifications2.default();
      this.add.existing(game.achievementNotifications);

      game.onBlur.add(function () {
        return;
        if (game.player.hasStarted && !game.player.isDead) _ScreenManager2.default.instance.openScreen('pause');
      });

      this.shortcutBool = false;

      game.goToMain.add(function () {
        game.soundManager.playMusic('mainTheme');
        if (_storageManager2.default.instance.get('addedShortcut') === false && _this2.shortcutBool === false) {
          _this2.shortcutBool = true;
          _ScreenManager2.default.instance.openScreen('addToHome');
        }
      });

      if (game.sound.usingWebAudio && (game.sound.context.state === 'suspended' || game.sound.context.state === 'interrupted')) {
        var overlay = new _phaser2.default.Graphics(game, -game.world.centerX, -1000);

        overlay.beginFill(0xff0000);
        overlay.drawRect(0, 0, game.width, game.height * 2);
        overlay.endFill();

        game.add.existing(overlay);

        overlay.inputEnabled = true;
        overlay.alpha = 0;
        overlay.events.onInputUp.add(function () {
          game.soundManager.playMusic('mainTheme');
          overlay.destroy();
        }, this);
      } else {
        game.soundManager.playMusic('mainTheme');
      }

      // set camera position
      game.camera.bounds.setTo(-game.world.centerX, undefined, game.world.width);
      game.camera.follow(game.player.cameraFocusPoint, _phaser2.default.Camera.FOLLOW_LOCKON, 1, 1);

      // this.vconsole = new vConsole();

      if (false) {
        var mKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.M);
        var rKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.R);
        var spaceKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.SPACEBAR);

        mKey.onDown.add(function () {
          _Inventory2.default.instance.addToType('coins', 200);
          _ScreenManager2.default.instance.shopScreen.checkButtons();
        });
        spaceKey.onDown.add(function () {
          _this2.getpoolStatus();
          // console.log(game);
          // for (let i = 0; i < game.tiles.length; i++) {
          //   console.log("tile group ",game.tiles.children[i].name);
          // }
          // for (let i = 0; i < game.tileObjectPool.objectList.length; i++) {
          //   console.log("objecpool", game.tileObjectPool.objectList[i].name);
          // }
          // console.log('tile group length: ', game.tiles.length, game.tiles);
          // console.log('tile objectpool length: ', game.tileObjectPool.objectList.length, game.tileObjectPool);
        });
        rKey.onDown.add(function () {
          _storageManager2.default.instance.set('skins', game.cache.getJSON('skinList'));
        });
      }
    }

    /*
    getpoolStatus.
    In this method I want to get some information about the TileObjectPool.
    I want to know when the game starts how many tiles are created, how many are in the objectpool and how many outside.
    Then when another chunk is loaded in I want to know the difference.
    for this I need to have a variable that counts all created tiles.
    I need a variable for all the tiles currently in the objectpool and one out of the pool.
    I need to calculate how many tiles are added and removed after each check.
    I also need to count how many tiles the sushi has crossed to check if the onanimation complete returns te tiles
    to the objectpool correctly.
     */

  }, {
    key: 'getpoolStatus',
    value: function getpoolStatus() {
      console.info('  - Tile object pool status -   ');
      console.log('Total tiles created in object pool:', game.TileObjectpoolCounter);
      console.log('Total tiles  in object pool:', game.TilesInPool, 'vs', 'TileObjectpool Length', game.tileObjectPool.objectList.length);
      console.log('Total tiles out object pool:', game.TilesOutPool, 'vs', 'TileGroup Length', game.tiles.children.length);
      console.log('Calculation check: TotalTiles - (tilesInPool + TilesOutPool)', game.TileObjectpoolCounter - (game.TilesInPool + game.TilesOutPool));
      console.info(' - end of log - ');
    }
  }, {
    key: 'render',
    value: function render() {
      return;
      if (false) {
        game.debug.text('Version Number 34', 100, 10, '#0a0145');
        game.debug.text(game.time.now, 10, 10, '000');
        game.debug.text(game.time.fps, 10, 30, '000');

        var y = 70;

        for (var i = 0; i < game.debugLine.length; i += 1) {
          this.game.debug.text(game.debugLine[i], 10, 70 + 20 * i, '#FF0000');
        }
        this.game.debug.text('This is dev mode');

        this.game.debug.pointer(this.game.input.activePointer);
        // this.game.debug.pointer(this.game.input.pointer1)
        // this.game.debug.pointer(this.game.input.mousePointer)
      }
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _utils = __webpack_require__(59);

var _TimerText = __webpack_require__(367);

var _TimerText2 = _interopRequireDefault(_TimerText);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The player and its movements
var Player = function (_Phaser$Group) {
  _inherits(Player, _Phaser$Group);

  function Player(game, chunkList) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game));

    _this.currentChunk = 0;
    _this.chunkList = chunkList;

    _this.skinList = game.cache.getJSON('skinList');

    _this.speed = 5;
    _this.speed100 = 4;
    _this.speed200 = 4.5;
    _this.speed300 = 5;
    _this.startSpeed = _this.speed100;
    _this.maxSpeed = 8;
    _this.acceleration = 0.05;
    _this.hasCollision = false;

    _this.velocity = new _phaser.Phaser.Point(0, 0);
    _this.startScale = 1.2;

    _this.goingRight = true;
    _this.isDead = false;
    _this.hasStarted = false;
    _this.reviving = false;
    _this.isTutorial = false;
    _this.isTeleporting = false;
    _this.canAnimTp = true;
    _this.canRewardStreakAchievement = true;

    _this.score = 0;
    _this.reviveCounter = 0;
    _this.currentGameCoins = 0;

    _this.cameraFocusPoint = new _phaser.Phaser.Group(game);
    _this.cameraFocusPoint.y -= 180;

    _this.add(_this.cameraFocusPoint);

    _this.createSprite();
    _this.buildTimer();
    _this.createFloatingText();

    _this.jump = game.add.tween(_this.sushiGroup).to({ y: [0, -12, 0] }, 120, _phaser.Phaser.Easing.Quadratic.Out, false);

    game.switchDirection.add(function () {
      _this.switchDirection();
    });

    game.addScore.add(function (amount) {
      _this.addScore(amount);
    });
    game.revivePlayer.add(function () {
      _this.revive();
    });
    game.goToMain.add(function () {
      _this.restart();
    });
    game.goToGame.add(function () {
      game.time.events.add(50, function () {
        _this.hasStarted = true;
        if (!_this.isDead) {
          _this.sushi.animations.play('roll', 12, true);
          _this.face.animations.play('roll', 12, true);
        }
        _this.switchDirection();
      });
    });
    _this.spawn();
    return _this;
  }

  _createClass(Player, [{
    key: 'createSprite',
    value: function createSprite() {
      this.playerGroup = new _phaser.Phaser.Group(game);
      this.shadow = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'shadow_ball.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.75,
        scaleY: 1.25
      });
      this.playerGroup.add(this.shadow);

      this.sushiGroup = new _phaser.Phaser.Group(game);

      this.add(this.playerGroup);
      this.playerGroup.add(this.sushiGroup);

      this.sushi = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'tuna_maki/tuna_maki_1.png',
        x: 0,
        y: -5,
        anchorX: 0.5,
        anchorY: 0.7
      });

      this.face = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'angry_face/angry_face_1.png',
        x: 1,
        y: -6,
        anchorX: 0.5,
        anchorY: 0.7
      });

      this.playerGroup.scale.setTo(-this.startScale, this.startScale);
      this.sushiGroup.add(this.sushi);
      this.sushiGroup.add(this.face);
      if (_storageManager2.default.instance.get('selectedSkin')) {
        game.pickRandomSkin.dispatch();
      } else {
        this.switchSkin(_storageManager2.default.instance.get('selectedSkin'));
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.timer) {
        this.timer.update();
      }
      if (this.hasStarted && !this.isDead && !this.isTutorial && !this.isTeleporting) {
        this.move();
      }
    }
  }, {
    key: 'move',
    value: function move() {
      this.checkCollision();

      var deltaTime = Math.min(game.time.elapsed, 60) / (1000 / game.time.desiredFps);
      this.position.add(this.velocity.x * deltaTime, this.velocity.y * deltaTime);
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision() {
      this.hasCollision = false;

      if (this.currentTile === undefined) {
        this.findCurrentTile();
      }

      var tileList = this.chunkList[this.currentChunk].tileList;


      if (this.collidesWithTile(tileList[this.currentTile])) {
        if (this.reviving) {
          this.reviving = false;
          game.revivePlatform.returnPlatform(true);
        }
        // Same tile as the player was already on
        this.onCollision(tileList[this.currentTile]);
        if (this.chunkList[this.currentChunk].tileList[this.currentTile].containsInteractable) {
          this.checkInteractableCollision();
        }
        return;
      }

      if (this.collidesWithTile(tileList[this.currentTile + 1])) {
        // Tile on the left of the player
        this.chunkList[this.currentChunk].tileList[this.currentTile].doFall();
        this.onCollision(tileList[this.currentTile + 1]);
        this.onNewTile();
        return;
      }

      var chunkLength = Math.sqrt(tileList.length);

      if (this.collidesWithTile(tileList[this.currentTile + chunkLength])) {
        // Tile on the right of the player
        this.chunkList[this.currentChunk].tileList[this.currentTile].doFall();
        this.onCollision(tileList[this.currentTile + chunkLength]);
        this.onNewTile();
        return;
      }

      if (this.collidesWithTile(this.chunkList[this.currentChunk + 1].tileList[0])) {
        // speedup the player
        if (this.speed < this.maxSpeed) {
          if (this.score < 100) {
            this.speed = this.speed100;
          } else if (this.score >= 100 && this.score < 200) {
            this.speed = this.speed200;
          } else if (this.score >= 200 && this.score < 300) {
            this.speed = this.speed300;
          } else this.speed += this.acceleration;
        }
        // First tile of next chunkData
        this.chunkList[this.currentChunk].tileList[this.currentTile].doFall();
        this.currentChunk += 1;
        this.onCollision(this.chunkList[this.currentChunk].tileList[0]);
        this.onNewTile();
        if (this.currentChunk > 1) {
          game.levelGenerator.deleteChunk(0, true);
          this.currentChunk -= 1;
        }
        return;
      }

      if (this.hasCollision === false && !this.reviving) {
        this.die();
      }
    }
  }, {
    key: 'onNewTile',
    value: function onNewTile() {
      this.score += 1;
      window.GameInterface.sendScore(this.score);
      game.setScore.dispatch(this.score);
      if (this.score % 10 === 0) {
        // each 10 to reduce calls
        _AchievementSystem2.default.instance.incrementAchievementData('highscore', this.score);
        // progress other than 2 are handled in game over screen
        if (_AchievementSystem2.default.instance.saveData.streak.progress === 2 && this.canRewardStreakAchievement) {
          _AchievementSystem2.default.instance.incrementAchievementData('streak', this.score);
          this.canRewardStreakAchievement = false;
        }
      }
    }
  }, {
    key: 'onCollision',
    value: function onCollision(tile) {
      this.hasCollision = true;
      if (this.currentTile !== this.chunkList[this.currentChunk].tileList.indexOf(tile)) {
        this.currentTile = this.chunkList[this.currentChunk].tileList.indexOf(tile);
        if (this.chunkList[this.currentChunk].tileList[this.currentTile].typeID !== 7) {
          this.reviveTile = this.currentTile;
        }
      }
    }
  }, {
    key: 'findCurrentTile',
    value: function findCurrentTile() {
      for (var i = 0; i < this.chunkList[this.currentChunk].tileList.length; i += 1) {
        if (this.collidesWithTile(this.chunkList[this.currentChunk].tileList[i])) {
          this.currentTile = i;
          if (this.chunkList[this.currentChunk].tileList[this.currentTile].typeID !== 7) {
            this.reviveTile = this.currentTile;
          }
          this.onCollision(this.chunkList[this.currentChunk].tileList[i]);
          return;
        }
      }
    }
  }, {
    key: 'switchDirection',
    value: function switchDirection() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.reviving || this.isTeleporting) return;

      if (!this.isDead && this.hasStarted || force) {
        if (this.isTutorial) {
          this.stopTutorial();
        }
        // this.showRandomFeedbackText();
        game.soundManager.playSound('kick');

        var tile = this.chunkList[this.currentChunk].tileList[this.currentTile];
        this.checkCloseToEdge(this.d, this.position.x, this.position.y, tile.position.x, tile.position.y);
        this.checkPerfect(this.d);
        this.goingRight = !this.goingRight;
        if (this.goingRight) {
          this.jump.start();
          this.face.visible = true;
          this.playerGroup.scale.x = -this.startScale;
          this.velocity = (0, _utils.cartesianToIsometric)(0, -this.speed);
        } else {
          this.jump.start();
          this.face.visible = true;
          this.playerGroup.scale.x = this.startScale;
          this.velocity = (0, _utils.cartesianToIsometric)(-this.speed, 0);
        }
      }
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      var tile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _utils.getTile)('spawnTile', this.chunkList[this.currentChunk].tileList);

      this.spawnPosition = new _phaser.Phaser.Point(tile.x, tile.y);
      this.position = this.spawnPosition;
      this.findCurrentTile();
    }
  }, {
    key: 'collidesWithTile',
    value: function collidesWithTile(tile) {
      if (!tile) {
        return false;
      }
      // TODO calculate the collision with the playérs width and height when we are making the sushi shrinking mechanic
      this.dA = _phaser.Phaser.Math.difference(this.position.x, tile.position.x);
      this.dB = _phaser.Phaser.Math.difference(this.position.y, tile.position.y);
      this.d = (this.dA + 2 * this.dB) / game.levelGenerator.chunkGenerator.tileHeight;
      if (this.d <= 1) {
        return true;
      }
      return false;
    }

    // d = distance coefficient calculated in collidesWithTile

  }, {
    key: 'checkCloseToEdge',
    value: function checkCloseToEdge(d, pX, pY, tX, tY) {
      if (d < 0.75) return;
      if (this.goingRight) {
        if (this.chunkList[this.currentChunk].tileList[this.currentTile + Math.sqrt(this.chunkList[this.currentChunk].tileList.length)] === '') {
          if (pX > tX && pY < tY) {
            this.showCloseFeedbackText();
          }
        }
      } else if (this.chunkList[this.currentChunk].tileList[this.currentTile + 1] === '') {
        if (pX < tX && pY < tY) {
          this.showCloseFeedbackText();
        }
      }
    }
  }, {
    key: 'checkPerfect',
    value: function checkPerfect(d) {
      if (d < 0.2 && d !== 0) {
        this.showRandomFeedbackText(1);
      }
    }
  }, {
    key: 'collidesWithInteractable',
    value: function collidesWithInteractable(interactable) {
      var dA = _phaser.Phaser.Math.difference(this.position.x, interactable.x);
      var dB = _phaser.Phaser.Math.difference(this.position.y, interactable.y);
      if ((dA + 2 * dB) / (game.levelGenerator.chunkGenerator.tileHeight * interactable.collisionRadius) <= 1) {
        return true;
      }
      return false;
    }
  }, {
    key: 'checkInteractableCollision',
    value: function checkInteractableCollision() {
      // Collision with interactables
      for (var i = this.chunkList[this.currentChunk].interactableList.length - 1; i >= 0; i -= 1) {
        if (this.collidesWithInteractable(this.chunkList[this.currentChunk].interactableList[i])) {
          this.chunkList[this.currentChunk].interactableList[i].onCollision(i);
        }
      }
    }
  }, {
    key: 'die',
    value: function die() {
      if (this.chunkList[this.currentChunk].difficulty === 'spawn') {
        this.startTutorial();
        return;
      }
      if (!this.isDead) {
        game.soundManager.playSound('gameOver');

        this.sushi.animations.stop('roll', true);
        this.face.animations.stop('roll', true);

        game.ui.hideUI();
        game.camera.shake(0.01, 100);
        this.isDead = true;
        this.shrinkTween = game.add.tween(this.playerGroup.scale).to({ x: 0, y: 0 }, 400, _phaser.Phaser.Easing.Default, false);
        this.shrinkTween.start();
        this.fallTween = game.add.tween(this.playerGroup).to({ y: 50 }, 400, _phaser.Phaser.Easing.Default, false);
        this.fallTween.start();
        this.fallTween.onComplete.add(function () {
          game.ui.showUI();
          game.goToRevive.dispatch();
        });
      }
    }
  }, {
    key: 'startTutorial',
    value: function startTutorial() {
      this.isTutorial = true;
      this.spawn(this.chunkList[this.currentChunk].tileList[this.currentTile]);
      this.sushi.animations.stop('roll', true);
      this.face.animations.stop('roll', true);
      game.ui.gameGroup.tutorialText.visible = true;
    }
  }, {
    key: 'stopTutorial',
    value: function stopTutorial() {
      var doAnim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.isTutorial = false;
      if (doAnim) {
        this.sushi.animations.play('roll', true);
        this.face.animations.play('roll', true);
      }
      game.ui.gameGroup.tutorialText.visible = false;
    }
  }, {
    key: 'revive',
    value: function revive() {
      this.reviveCounter += 1;
      var tileList = this.chunkList[this.currentChunk].tileList;

      this.playerGroup.scale.set(this.startScale, this.startScale);
      this.playerGroup.y = 0;

      // game.levelGenerator.chunkGenerator.buildRevivePlatform(this.currentTile);

      // Failsafe to check which side the player fell off
      if (this.x > this.chunkList[this.currentChunk].tileList[this.currentTile].x && this.goingRight || this.x < this.chunkList[this.currentChunk].tileList[this.currentTile].x && !this.goingRight) {
        this.switchDirection(true);
      }

      var lastTile = this.chunkList[this.currentChunk].tileList[this.reviveTile];
      lastTile.reset();
      var goLeft = this.x < 0;
      var x = goLeft ? game.levelGenerator.chunkGenerator.tileWidth * 3 : 0;
      var y = goLeft ? 0 : game.levelGenerator.chunkGenerator.tileWidth * 3;
      if (goLeft === this.goingRight) this.switchDirection(true);

      var addPos = (0, _utils.cartesianToIsometric)(x, y);
      this.position = new _phaser.Phaser.Point(lastTile.x + addPos.x, lastTile.y + addPos.y);
      game.revivePlatform.placePlatform(this.position.x, this.position.y, goLeft);
      this.reviving = true;
      this.currentTile = this.reviveTile;
      // this.spawn(this.chunkList[this.currentChunk].tileList[this.currentTile]);
      game.goToGame.dispatch();
      this.startAfterTimer();
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.stopTutorial(false);
      game.revivePlatform.returnPlatform();
      this.reviveCounter = 0;
      this.score = 0;
      this.speed = this.startSpeed;
      this.currentGameCoins = 0;
      this.face.visible = true;
      this.playerGroup.scale.set(-this.startScale, this.startScale);
      this.goingRight = true;
      this.playerGroup.y = 0;
      game.levelGenerator.createNewLevel();
      this.currentChunk = 0;
      this.spawn();
      this.hasStarted = false;
      this.isDead = false;
      this.isTutorial = false;
      this.isTeleporting = false;
      this.canRewardStreakAchievement = true;
      if (_ScreenManager2.default.instance.shopScreen.list.selectedItem.id === 0) {
        game.pickRandomSkin.dispatch();
      }
    }
  }, {
    key: 'addSpeed',
    value: function addSpeed() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.speed.add(amount);
    }
  }, {
    key: 'buildTimer',
    value: function buildTimer() {
      this.timer = new _TimerText2.default({
        startValue: 3,
        x: 0,
        y: -100,
        anchorX: 0.5,
        anchorY: 0.5,
        color: '#FFFFFF',
        fontSize: 50
      });

      this.add(this.timer);
      this.timer.visible = false;
    }
  }, {
    key: 'startAfterTimer',
    value: function startAfterTimer() {
      var _this2 = this;

      game.ui.hideUI();

      this.timer.visible = true;
      this.timer.start(function () {
        game.ui.showUI();
        _this2.isDead = false;
        _this2.hasStarted = true;
        _this2.sushi.animations.play('roll', 12, true);
        _this2.face.animations.play('roll', 12, true);

        _this2.timer.visible = false;
      }, this);
    }
  }, {
    key: 'switchSkin',
    value: function switchSkin(id) {
      var frames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

      var skin = this.skinList.find(function (skin) {
        return skin.id === id;
      });
      if (skin.name === 'random') return;

      if (!skin) {
        console.log('No Skin found');
        return;
      }

      var skinName = skin.name;
      var faceName = skin.face;

      this.sushi.frameName = skinName + '/' + skinName + '_1.png';
      this.face.frameName = faceName + '/' + faceName + '_1.png';

      this.sushi.animations.add('roll', _phaser.Phaser.Animation.generateFrameNames(skinName + '/' + skinName + '_', 1, frames, '.png'), 12, true);
      this.face.animations.add('roll', _phaser.Phaser.Animation.generateFrameNames(faceName + '/' + faceName + '_', 1, frames, '.png'), 12, true);
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.hasStarted = false;
      this.sushi.animations.stop('roll', true);
      this.face.animations.stop('roll', true);
    }
  }, {
    key: 'createFloatingText',
    value: function createFloatingText() {
      this.floatingText = new _phaser.BitmapText(game, this.x, this.y, 'font', _LocalisationManager2.default.get('Nice!'), 30);
      this.floatingText.anchor.setTo(0.5);
      this.floatingText.visible = false;
      this.tAlphaText = this.game.add.tween(this.floatingText).to({ alpha: 0 }, 800, _phaser.Phaser.Easing.Default, false);
      game.add.existing(this.floatingText);

      this.feedbackLimit = 5;
      this.feedbackCounter = 0;
      this.feedbackRandom = [_LocalisationManager2.default.get('Nice!'), _LocalisationManager2.default.get('Amazing!'), _LocalisationManager2.default.get('Great!'), _LocalisationManager2.default.get('Spicy!'), _LocalisationManager2.default.get('Fancy!'), _LocalisationManager2.default.get('Perfect!'), _LocalisationManager2.default.get('Wow!')];
      this.feedbackClose = [_LocalisationManager2.default.get('Close one!'), _LocalisationManager2.default.get('Edgy!'), _LocalisationManager2.default.get('Yikes!')];
    }
  }, {
    key: 'showRandomFeedbackText',
    value: function showRandomFeedbackText() {
      var _this3 = this;

      var chance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;

      if (this.tAlphaText.isRunning) return;
      var checkRandom = Math.random() < chance;
      if (!checkRandom) return;
      this.floatingText.text = this.feedbackRandom[Math.floor(Math.random() * this.feedbackRandom.length)];

      // reset position
      var offset = 80;
      this.floatingText.x = this.position.x;
      this.floatingText.y = this.position.y - offset;
      this.tMoveText = this.game.add.tween(this.floatingText).to({ y: this.position.y - 150 - offset }, 800, _phaser.Phaser.Easing.Default, true);
      this.tMoveText.onComplete.add(function () {
        _this3.floatingText.visible = false;
      });

      // reset alpha
      this.floatingText.alpha = 1;

      this.floatingText.visible = true;
      this.tAlphaText.start();
      this.tMoveText.start();
    }
  }, {
    key: 'showCloseFeedbackText',
    value: function showCloseFeedbackText() {
      var _this4 = this;

      if (this.tAlphaText.isRunning) return;
      this.floatingText.text = this.feedbackClose[Math.floor(Math.random() * this.feedbackClose.length)];

      // reset position
      var offset = 80;
      this.floatingText.x = this.position.x;
      this.floatingText.y = this.position.y - offset;
      this.tMoveText = this.game.add.tween(this.floatingText).to({ y: this.position.y - 150 - offset }, 800, _phaser.Phaser.Easing.Default, true);
      this.tMoveText.onComplete.add(function () {
        _this4.floatingText.visible = false;
      });

      // reset alpha
      this.floatingText.alpha = 1;

      this.floatingText.visible = true;
      this.tAlphaText.start();
      this.tMoveText.start();
    }
  }]);

  return Player;
}(_phaser.Phaser.Group);

exports.default = Player;

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Timer class

Creates a timer text on the screen, overwrite the onComplete method as callback after
the timer is done.
 */
var TimerText = function (_BitmapText) {
  _inherits(TimerText, _BitmapText);

  function TimerText(_ref) {
    var startValue = _ref.startValue,
        x = _ref.x,
        y = _ref.y,
        fontSize = _ref.fontSize,
        anchorX = _ref.anchorX,
        anchorY = _ref.anchorY,
        color = _ref.color;

    _classCallCheck(this, TimerText);

    var _this = _possibleConstructorReturn(this, (TimerText.__proto__ || Object.getPrototypeOf(TimerText)).call(this, game, x, y, 'font', startValue, fontSize));

    _this.callback = null;
    _this.callbackContext = null;
    _this.running = false;

    _this.anchor.setTo(anchorX, anchorY);
    _this.startValue = startValue;

    _this.timer = _this.startValue;
    // this.timer = game.time.create(false);
    return _this;
  }

  _createClass(TimerText, [{
    key: 'onComplete',
    value: function onComplete() {
      // Add your logic to this method
    }
  }, {
    key: 'start',
    value: function start(callback, context) {
      this.callback = callback;
      this.callbackContext = context;

      this.running = true;

      this.timer = this.startValue * 1000;
    }
  }, {
    key: 'stop',
    value: function stop(callback, context) {
      callback.call(context);
      this.running = false;
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.running) {
        return;
      }

      this.timer -= game.time.elapsed;

      this.text = Math.ceil(this.timer / 1000);

      if (this.timer <= 0) {
        this.stop(this.callback, this.callbackContext);
      }
    }
  }]);

  return TimerText;
}(_phaser.BitmapText);

exports.default = TimerText;

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _backend = __webpack_require__(82);

var _backend2 = _interopRequireDefault(_backend);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _Button = __webpack_require__(147);

var _Button2 = _interopRequireDefault(_Button);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a game over screen, used when the player dies
 */
var GameOverScreen = function (_Screen) {
  _inherits(GameOverScreen, _Screen);

  function GameOverScreen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'gameOver' : _ref$name,
        _ref$titleText = _ref.titleText,
        titleText = _ref$titleText === undefined ? 'Game Over!' : _ref$titleText,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 660 : _ref$screenHeight;

    _classCallCheck(this, GameOverScreen);

    var _this = _possibleConstructorReturn(this, (GameOverScreen.__proto__ || Object.getPrototypeOf(GameOverScreen)).call(this, {
      name: name, titleText: titleText, screenHeight: screenHeight, titleIcon: 'ui_icon_game_over.png'
    }));

    _this.screenHeight = screenHeight;
    _this.bestSessionScore = 0;
    _this.fetchEntry();
    _this.buildButtons();
    _this.buildFTUButtons();
    _this.buildContainer();
    _this.buildTimer();
    _this.buildBackdrop();
    _this.setReviveValues();
    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 50);
    _this.add(_this.coinDisplay);
    return _this;
  }

  _createClass(GameOverScreen, [{
    key: 'setReviveValues',
    value: function setReviveValues() {
      this.timerValue = 4;
      this.reviveCost = 100;
    }
  }, {
    key: 'buildBackdrop',
    value: function buildBackdrop() {
      this.backdropGroup = new _phaser2.default.Group(this.game);
      this.backdropGroup.position.set(0, 640 - this.screenHeight / 2 - 80);

      this.catImage = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_cat_result.png',
        anchorY: 0.5,
        anchorX: 0.5,
        scaleX: 0.5,
        scaleY: 0.5
      });
      this.shineImage1 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.4,
        scaleY: 0.4
      });
      this.shineImage2 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        angle: 90
      });
      this.shineImage3 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        angle: 180

      });
      this.shineImage4 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.4,
        scaleY: 0.4,
        angle: 270

      });

      this.shineImage5 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        angle: 22.5
      });
      this.shineImage6 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        angle: 90 + 22.5
      });
      this.shineImage7 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        angle: 180 + 22.5

      });
      this.shineImage8 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_result_shine.png',
        anchorY: 1,
        anchorX: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        angle: 270 + 22.5

      });

      this.sushiImage1 = new _Sprite2.default({
        asset: 'uiAtlas',
        x: -170,
        y: -40,
        frame: 'ui_sushi_pink.png',
        anchorY: 0.5,
        anchorX: 0.5,
        scaleY: 0.5,
        scaleX: 0.5,
        angle: 170
      });
      this.sushiImage2 = new _Sprite2.default({
        asset: 'uiAtlas',
        x: 160,
        y: -20,
        frame: 'ui_sushi_yellow.png',
        anchorY: 0.5,
        anchorX: 0.5,
        scaleY: 0.4,
        scaleX: 0.4,
        angle: 130
      });
      this.sushiImage3 = new _Sprite2.default({
        asset: 'uiAtlas',
        x: 150,
        y: -80,
        frame: 'ui_sushi_green.png',
        anchorY: 0.5,
        anchorX: 0.5,
        scaleY: 0.35,
        scaleX: 0.35,
        angle: 10
      });

      this.backdropGroup.addMultiple([this.shineImage1, this.shineImage2, this.shineImage3, this.shineImage4, this.shineImage5, this.shineImage6, this.shineImage7, this.shineImage8, this.sushiImage1, this.sushiImage2, this.sushiImage3, this.catImage]);

      this.contentGroup.add(this.backdropGroup);
      this.contentGroup.sendToBack(this.backdropGroup);
      this.contentGroup.moveUp(this.backdropGroup);
    }
  }, {
    key: 'buildContainer',
    value: function buildContainer() {
      this.container = new _Frame2.default({
        key: 'gameOverEdgeFrame',
        x: 0,
        y: 620 + 57,
        width: 480,
        height: this.screenHeight - 100,
        useDropShadow: false
      });
      this.contentGroup.add(this.container);

      this.scoreContainer = new _Frame2.default({
        key: 'gameOverFrame',
        x: 0,
        y: 620 - 100,
        width: 340,
        height: 220,
        useDropShadow: false
      });
      this.contentGroup.add(this.scoreContainer);

      var padding = 20;
      this.scoreContainerTexture = new _phaser2.default.TileSprite(this.game, this.scoreContainer.x - this.scoreContainer.width / 2 + padding / 2, this.scoreContainer.y - this.scoreContainer.height / 2 + padding / 2, 340 - padding, 220 - padding, 'uiAtlas', 'ui_pattern_small_red.png');
      this.scoreContainerTexture.alpha = 0.4;
      this.contentGroup.add(this.scoreContainerTexture);

      this.scoreText = new _Text2.default({
        text: '',
        x: 0,
        y: 620 - 80,
        color: '#32374a',
        fontSize: 100,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.contentGroup.add(this.scoreText);

      this.scoreDescriptionText = new _Text2.default({
        text: _LocalisationManager2.default.get('score'),
        x: 0,
        y: 620 - 160,
        color: '#32374a',
        fontSize: 30,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.contentGroup.add(this.scoreDescriptionText);
    }
  }, {
    key: 'buildButtons',
    value: function buildButtons() {
      var _this2 = this;

      this.backToMainButton = new _FrameButton2.default({
        // text: 'Back to main!',
        iconImage: 'ui_icon_home.png',
        iconSize: 0.8,
        x: 0,
        y: 620 + 250,
        width: 400,
        height: 200
      });
      this.contentGroup.add(this.backToMainButton);
      this.backToMainButton.doOnClick = function () {
        _this2.closeScreenAnimation(function () {
          game.goToMain.dispatch();
          _this2.onCloseAnimationDone();
        });
      };

      this.reviveGroup = new _phaser2.default.Group(game);
      this.contentGroup.add(this.reviveGroup);
      this.reviveGroup.x = 0;
      this.reviveGroup.y = 790;

      this.reviveButton = new _FrameButton2.default({
        iconImage: 'ui_ad_icon.png',
        x: 0,
        y: -60,
        colorDisable: 0xa2a2a2,
        fontSize: 34,
        textColor: '#FeFeFe',
        width: 400,
        height: 170,
        iconAnchorX: 0.5,
        iconAnchorY: 0.75,
        iconSize: 0.7,
        dropShadowColorDisable: 0x3f3f3f
      });
      this.reviveGroup.add(this.reviveButton);
      this.reviveButton.doOnClick = function () {
        _this2.clickedReviveButton();
      };

      this.reviveCostText = new _Text2.default({
        text: '100',
        x: -85,
        y: -60,
        anchorX: 0.5
      });
      this.reviveCostText.visible = false;
      this.reviveGroup.add(this.reviveCostText);

      this.reviveIcon2 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_icon_retry.png',
        x: 60,
        y: -45,
        anchorX: 0.5,
        anchorY: 0.75,
        scaleX: 0.8,
        scaleY: 0.8
      });
      this.reviveGroup.add(this.reviveIcon2);

      this.reviveSkip = new _Button2.default({
        key: 'uiAtlas',
        frame: 'ui_icon_home.png',
        anchorX: 0.5,
        y: 60
      });
      this.reviveSkip.tint = 0x616161;
      this.reviveSkip.scale.set(0.4, 0.4);
      this.reviveSkip.doOnClick = function () {
        _this2.closeScreenAnimation(function () {
          game.goToMain.dispatch();
          _this2.onCloseAnimationDone();
        });
      };
      this.reviveGroup.add(this.reviveSkip);

      this.unlockSkinButton = new _FrameButton2.default({
        iconImage: 'ui_icon_sushi.png',
        iconSize: 0.8,
        x: _backend2.default.instance.isSupported() ? -100 : 0,
        y: 620 + 70,
        width: 180,
        color: 0xffdd00,
        dropShadowColor: 0xe8be00,
        colorDisable: 0xa2a2a2,
        dropShadowColorDisable: 0x3f3f3f
      });
      this.contentGroup.add(this.unlockSkinButton);

      this.unlockSkinButton.doOnClick = function () {
        game.goToMain.dispatch();
        _ScreenManager2.default.instance.openScreen('shop');
      };

      this.tUnlockSkin = game.add.tween(this.unlockSkinButton).to({ angle: -3 }, 150, _phaser2.default.Easing.Sinusoidal.Out, false).to({ angle: 3 }, 300, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ angle: 0 }, 150, _phaser2.default.Easing.Sinusoidal.In, false).loop(true);

      this.tUnlockSkin.start();

      this.submitHighscoreButton = new _FrameButton2.default({
        iconImage: 'ui_icon_achievements.png',
        iconSize: 0.8,
        x: 100,
        y: 620 + 70,
        width: 180,
        colorDisable: 0x404040,
        dropShadowColorDisable: 0
      });
      this.contentGroup.add(this.submitHighscoreButton);

      this.submitHighscoreButton.doOnClick = function () {
        game.goToMain.dispatch();
        _ScreenManager2.default.instance.openScreen('leaderboard');
      };

      this.submitHighscoreButton.visible = _backend2.default.instance.isSupported();
    }
  }, {
    key: 'buildFTUButtons',
    value: function buildFTUButtons() {
      var _this3 = this;

      this.backToMainButtonFTU = new _FrameButton2.default({
        // text: 'Back to main!',
        iconImage: 'ui_icon_home.png',
        iconSize: 0.8,
        x: 0,
        y: 620 + 290,
        width: 400,
        height: 160
      });
      this.contentGroup.add(this.backToMainButtonFTU);
      this.backToMainButtonFTU.doOnClick = function () {
        _this3.closeScreenAnimation(function () {
          game.goToMain.dispatch();
          _this3.onCloseAnimationDone();
        });
      };
    }
  }, {
    key: 'clickedReviveButton',
    value: function clickedReviveButton() {
      var adAvailable = _famobiApi2.default.instance.hasRewardedAd();
      if (game.player.reviveCounter < 1 && adAvailable) {
        _famobiApi2.default.instance.showRewardedAd(this.revivePlayer, this);
      } else if (_Inventory2.default.instance.coins >= this.reviveCost) {
        _Inventory2.default.instance.payCoins(this.reviveCost);
        this.revivePlayer({ rewardGranted: true });
        this.reviveCost *= 2;
      } else {
        // no enough money
      }
    }
  }, {
    key: 'revivePlayer',
    value: function revivePlayer() {
      var _this4 = this;

      var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { rewardGranted: false };

      if (result.rewardGranted) {
        this.closeScreenAnimation(function () {
          _this4.onCloseAnimationDone();
          _this4.game.revivePlayer.dispatch();
          _this4.tDecrease.stop();
          _this4.disableFTU();
        }, this);
      }
    }
  }, {
    key: 'changeReviveButtonToCoin',
    value: function changeReviveButtonToCoin() {
      this.reviveButton.iconImage.changeTexture('ui_coin.png');
      this.reviveButton.iconImage.y = -25;
      this.reviveButton.iconImage.x = -85;
      this.reviveCostText.visible = true;

      if (_Inventory2.default.instance.coins < this.reviveCost) {
        this.reviveButton.doDisable();
      } else {
        this.reviveButton.doEnable();
      }
    }
  }, {
    key: 'changeReviveButtonToAd',
    value: function changeReviveButtonToAd() {
      this.reviveButton.iconImage.changeTexture('ui_ad_icon.png');
      this.reviveButton.iconImage.y = 0;
      this.reviveButton.iconImage.x = -67.75;
      this.reviveCostText.visible = false;
      this.reviveButton.doEnable();
    }
  }, {
    key: 'checkSkinAvailable',
    value: function checkSkinAvailable() {
      if (_Inventory2.default.instance.coins > _ScreenManager2.default.instance.shopScreen.skinPrice && _ScreenManager2.default.instance.shopScreen.list.getAvailableSkins().length > 0) {
        this.tUnlockSkin.resume();
        this.unlockSkinButton.doEnable();
      } else {
        this.tUnlockSkin.pause();
        this.unlockSkinButton.doDisable();
        this.unlockSkinButton.angle = 0;
      }
    }
  }, {
    key: 'buildCloseButton',
    value: function buildCloseButton() {
      // This screen does not have a close button
    }
  }, {
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      if (this.tDecrease) this.tDecrease.stop();

      this.updateReviveValues();
      this.checkFTU();

      this.scoreText.text = game.player.score;
      this.onScore(game.player.score);
      game.totalScore.dispatch(game.player.score);
      this.checkHighScore();

      // if progress is 2, this achievement is handled in-game
      if (_AchievementSystem2.default.instance.saveData.streak.progress !== 2) {
        _AchievementSystem2.default.instance.incrementAchievementData('streak', game.player.score);
      }
      if (game.player.reviveCounter < 1) {
        _AchievementSystem2.default.instance.incrementAchievementData('games', 1);
      }
    }
  }, {
    key: 'updateReviveValues',
    value: function updateReviveValues() {
      this.timerBar.scale.x = 1;
      this.reviveGroup.scale.setTo(1, 1);
      this.backToMainButton.scale.setTo(0, 0);
      var adAvailable = _famobiApi2.default.instance.hasRewardedAd();

      // reset revive cost
      if (game.player.reviveCounter < 1) {
        this.reviveCost = 100;
      }

      if (game.player.reviveCounter < 1 && adAvailable) {
        this.changeReviveButtonToAd();
      } else {
        this.changeReviveButtonToCoin();
      }

      this.reviveCostText.text = this.reviveCost;

      if (game.player.reviveCounter > 2) {
        this.backToMainButton.scale.set(1, 1);
        this.reviveGroup.scale.set(0, 0);
      }
    }
  }, {
    key: 'onScore',
    value: function onScore(score) {
      if (score > this.bestSessionScore) {
        this.bestSessionScore = score;
        return true;
      }
      return false;
    }
  }, {
    key: 'onOpenAnimationDone',
    value: function onOpenAnimationDone() {
      var _this5 = this;

      if (game.player.reviveCounter > 2) {
        return;
      }
      this.tDecrease = this.game.add.tween(this.timerBar.scale).to({ x: 0 }, this.timerValue * 1000, _phaser2.default.Easing.Default, false);
      this.tDecrease.onComplete.add(function () {
        _this5.reviveButton.disabled = true;
      });
      this.tDecrease.onComplete.add(function () {
        _this5.doSwitchButtons();
        _Inventory2.default.instance.addToType('experience', game.player.score);
        game.ui.xpBar.onAddXP();
      });
      this.tDecrease.start();
    }
  }, {
    key: 'doSwitchButtons',
    value: function doSwitchButtons() {
      if (!this.useFTU) {
        var tShrinkRevive = this.game.add.tween(this.reviveGroup.scale).to({ x: 0, y: 0 }, 200, _phaser2.default.Easing.Sinusoidal.InOut, false);
        var tGrowMain = this.game.add.tween(this.backToMainButton.scale).to({ x: 1, y: 1 }, 200, _phaser2.default.Easing.Sinusoidal.InOut, false);
        tShrinkRevive.onComplete.add(function () {
          tGrowMain.start();
        });
        tShrinkRevive.start();
      } else {
        this.reviveButton.doDisable();
      }
    }
  }, {
    key: 'buildTimer',
    value: function buildTimer() {
      this.timerEdge = new _Sprite2.default({
        x: 0,
        y: 8,
        asset: 'uiAtlas',
        frame: 'ui_bar_continue_base_red.png',
        anchorX: 0.5,
        anchorY: 0.5
      });

      this.timerBackground = new _Sprite2.default({
        x: 0,
        y: 0,
        asset: 'uiAtlas',
        frame: 'ui_bar_continue_base.png',
        anchorX: 0.5,
        anchorY: 0.5
      });

      this.timerBar = new _Sprite2.default({
        x: this.timerBackground.x,
        y: this.timerBackground.y,
        anchorX: 0.5,
        anchorY: 0.5,
        asset: 'uiAtlas',
        frame: 'ui_bar_continue_load_pattern.png'
      });
      this.reviveGroup.add(this.timerBackground);
      this.reviveGroup.add(this.timerBar);
      this.reviveGroup.add(this.timerEdge);
    }
  }, {
    key: 'checkHighScore',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var entry;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.fetchEntry();

              case 2:
                entry = _context.sent;

                this.checkSkinAvailable();
                // if (StorageManager.instance.get('highscore') > entry.score) {
                //   this.submitHighscoreButton.visible = true;
                //   this.unlockSkinButton.visible = false;
                // } else {
                //   this.submitHighscoreButton.visible = false;
                //   this.unlockSkinButton.visible = true;
                //   this.checkSkinAvailable();
                // }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkHighScore() {
        return _ref2.apply(this, arguments);
      }

      return checkHighScore;
    }()
  }, {
    key: 'fetchEntry',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _backend2.default.instance.fetchEntry();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchEntry() {
        return _ref3.apply(this, arguments);
      }

      return fetchEntry;
    }()
  }, {
    key: 'checkFTU',
    value: function checkFTU() {
      this.useFTU = game.player.score < 10 && _storageManager2.default.instance.get('highscore') === 0 || _storageManager2.default.instance.get('highscore') < 10;

      if (this.useFTU) {
        this.enableFTU();
      } else {
        this.disableFTU();
      }
    }
  }, {
    key: 'enableFTU',
    value: function enableFTU() {
      this.submitHighscoreButton.visible = false;
      this.unlockSkinButton.visible = false;

      this.backToMainButtonFTU.visible = true;
      this.reviveGroup.y = 790;
    }
  }, {
    key: 'disableFTU',
    value: function disableFTU() {
      this.submitHighscoreButton.visible = _backend2.default.instance.isSupported();
      this.unlockSkinButton.visible = true;
      if (!_backend2.default.instance.isSupported()) {
        this.unlockSkinButton.x = 0;
      }
      this.backToMainButtonFTU.visible = false;
      this.reviveGroup.y = 910;
    }
  }]);

  return GameOverScreen;
}(_Screen3.default);

exports.default = GameOverScreen;

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _SettingsButton = __webpack_require__(83);

var _SettingsButton2 = _interopRequireDefault(_SettingsButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a pause screen, this screen is accessable through the pause button in the game.
 */
var PauseScreen = function (_Screen) {
  _inherits(PauseScreen, _Screen);

  function PauseScreen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'pause' : _ref$name,
        _ref$titleText = _ref.titleText,
        titleText = _ref$titleText === undefined ? 'Paused!' : _ref$titleText,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 410 : _ref$screenHeight;

    _classCallCheck(this, PauseScreen);

    // TODO get from settings

    // this.buildSoundButtons();
    var _this = _possibleConstructorReturn(this, (PauseScreen.__proto__ || Object.getPrototypeOf(PauseScreen)).call(this, {
      name: name, titleText: titleText, screenHeight: screenHeight, titleIcon: 'ui_pause_icon.png'
    }));

    _this.buildButtons();

    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 45);
    _this.add(_this.coinDisplay);

    _this.settings = new _SettingsButton2.default();
    _this.add(_this.settings);
    return _this;
  }

  _createClass(PauseScreen, [{
    key: 'buildButtons',
    value: function buildButtons() {
      var _this2 = this;

      this.quitButton = new _FrameButton2.default({
        iconImage: 'ui_icon_home.png',
        iconSize: 0.7,
        x: 0,
        y: 640 + 120,
        width: 380,
        height: 90
      });
      this.contentGroup.add(this.quitButton);
      this.quitButton.doOnClick = function () {
        _this2.closeScreenAnimation(function () {
          game.goToMain.dispatch();
          _this2.onCloseAnimationDone();
        });
      };

      this.resumeButton = new _FrameButton2.default({
        iconImage: 'ui_icon_play.png',
        iconSize: 0.7,
        x: 0,
        y: 640 - 10,
        width: 380,
        height: 90
      });
      this.contentGroup.add(this.resumeButton);
      this.resumeButton.doOnClick = function () {
        _this2.closeScreenAnimation(function () {
          _this2.onCloseAnimationDone();
          game.player.startAfterTimer();
          game.ui.xpBar.close();
        });
      };
    }
  }, {
    key: 'buildSoundButtons',
    value: function buildSoundButtons() {
      var _this3 = this;

      this.soundButton = new _FrameButton2.default({
        iconImage: 'ui_sound_on_icon.png',
        width: 100,
        height: 100,
        cornerRadius: 1.2,
        iconSize: 0.4,
        x: 100,
        y: 640 - 80
      });
      this.soundButton.doOnClick = function () {
        var sound = game.soundManager.toggleSound();

        _this3.setSoundButton(sound);
      };
      this.contentGroup.add(this.soundButton);

      this.musicButton = new _FrameButton2.default({
        iconImage: 'ui_music_on_icon.png',
        width: 100,
        height: 100,
        cornerRadius: 1.2,
        iconSize: 0.4,
        x: -100,
        y: 640 - 80
      });
      this.musicButton.doOnClick = function () {
        var music = game.soundManager.toggleMusic();

        _this3.setMusicButton(music);
      };
      this.contentGroup.add(this.musicButton);
    }
  }, {
    key: 'buildCloseButton',
    value: function buildCloseButton() {
      // This screen doesn't contain a back button
    }
  }, {
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      game.player.pause();

      game.ui.xpBar.open();

      // this.setSoundButton();
      // this.setMusicButton();
    }
  }, {
    key: 'setSoundButton',
    value: function setSoundButton() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game.soundManager.sound;

      this.soundButton.iconImage.frameName = 'ui_sound_' + (value ? 'on' : 'off') + '_icon.png';
    }
  }, {
    key: 'setMusicButton',
    value: function setMusicButton() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game.soundManager.music;

      this.musicButton.iconImage.frameName = 'ui_music_' + (value ? 'on' : 'off') + '_icon.png';
    }
  }, {
    key: 'onCloseAnimationDone',
    value: function onCloseAnimationDone() {
      _get(PauseScreen.prototype.__proto__ || Object.getPrototypeOf(PauseScreen.prototype), 'onCloseAnimationDone', this).call(this);
      this.settings.closeSettings();
    }
  }]);

  return PauseScreen;
}(_Screen3.default);

exports.default = PauseScreen;

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a pause screen, this screen is accessable through the pause button in the game.
 */
var NoAdScreen = function (_Screen) {
  _inherits(NoAdScreen, _Screen);

  function NoAdScreen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'noAd' : _ref$name,
        _ref$titleText = _ref.titleText,
        titleText = _ref$titleText === undefined ? 'No ads available' : _ref$titleText,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 430 : _ref$screenHeight;

    _classCallCheck(this, NoAdScreen);

    var _this = _possibleConstructorReturn(this, (NoAdScreen.__proto__ || Object.getPrototypeOf(NoAdScreen)).call(this, {
      name: name, titleText: titleText, screenHeight: screenHeight
    }));

    _this.buildButtons();
    return _this;
  }

  _createClass(NoAdScreen, [{
    key: 'buildButtons',
    value: function buildButtons() {
      var _this2 = this;

      this.quitButton = new _FrameButton2.default({
        text: 'Back to main',
        x: game.world.width / 2,
        y: this.backgroundImage.bottom - 100,
        width: 400,
        height: 80
      });

      this.descriptionText = new _Text2.default({
        text: 'Unfortunately there are no ads to watch right now. \n\n Try again soon!',
        x: game.world.width / 2,
        y: this.titleBackgroundImage.y + 200,
        color: '#000',
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 24
      });

      this.descriptionText.wordWrap = true;
      this.descriptionText.wordWrapWidth = 500;

      this.contentGroup.add(this.descriptionText);
      this.contentGroup.add(this.quitButton);
      this.quitButton.doOnClick = function () {
        _this2.closeScreenAnimation(function () {
          _ScreenManager2.default.instance.openPreviousScreen();
          // this.onCloseAnimationDone();
        });
      };
    }
  }, {
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      game.player.hasStarted = false;
      game.player.sushi.animations.stop('roll', true);
    }
  }]);

  return NoAdScreen;
}(_Screen3.default);

exports.default = NoAdScreen;

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _ShopList = __webpack_require__(372);

var _ShopList2 = _interopRequireDefault(_ShopList);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _UnlockSkinOverlay = __webpack_require__(374);

var _UnlockSkinOverlay2 = _interopRequireDefault(_UnlockSkinOverlay);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _SettingsButton = __webpack_require__(83);

var _SettingsButton2 = _interopRequireDefault(_SettingsButton);

var _Overlay = __webpack_require__(66);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a shop screen
 */
var ShopScreen = function (_Screen) {
  _inherits(ShopScreen, _Screen);

  function ShopScreen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'shop' : _ref$name,
        _ref$titleText = _ref.titleText,
        titleText = _ref$titleText === undefined ? 'Sushi Shop' : _ref$titleText,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 640 : _ref$screenHeight,
        _ref$titleIcon = _ref.titleIcon,
        titleIcon = _ref$titleIcon === undefined ? 'ui_icon_sushi.png' : _ref$titleIcon;

    _classCallCheck(this, ShopScreen);

    var _this = _possibleConstructorReturn(this, (ShopScreen.__proto__ || Object.getPrototypeOf(ShopScreen)).call(this, { name: name, titleText: titleText, screenHeight: screenHeight, titleIcon: titleIcon }));

    var screenOffset = 0;

    _this.skinPrice = 150;
    _this.list = new _ShopList2.default(_this);
    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 45);
    _this.unlockOverlay = new _UnlockSkinOverlay2.default(_this);

    _this.backgroundImage.y -= screenOffset;
    _this.titleBackgroundImage.y -= screenOffset;
    _this.titleText.y -= screenOffset;

    _this.contentGroup.add(_this.list);
    _this.add(_this.coinDisplay);
    _this.add(_this.unlockOverlay);

    _this.settings = new _SettingsButton2.default();
    _this.add(_this.settings);

    // this.buildBuyContainer();
    _this.buildBackdrop();
    _this.buildMaskOverlay();
    _this.buildBuyButton();
    return _this;
  }

  _createClass(ShopScreen, [{
    key: 'buildBackdrop',
    value: function buildBackdrop() {
      this.backdropGroup = new _phaser2.default.Group(this.game);
      this.catImage = new _Sprite2.default({
        asset: 'uiAtlas',
        x: 0,
        y: 640 - 410,
        frame: 'ui_cat_shop.png',
        anchorY: 0.5,
        anchorX: 0.7,
        scaleX: 0.5,
        scaleY: 0.5
      });
      this.backdropGroup.add(this.catImage);

      this.contentGroup.add(this.backdropGroup);
      this.contentGroup.sendToBack(this.backdropGroup);
      this.contentGroup.moveUp(this.backdropGroup);
    }
  }, {
    key: 'buildBuyContainer',
    value: function buildBuyContainer() {
      this.buyText = new _Text2.default({
        text: 'Unlock a new skin',
        x: 0,
        y: 640 + 290,
        anchorX: 0.5,
        anchorY: 0.5,
        color: '#32374a',
        fontSize: 24
      });
      this.contentGroup.add(this.buyText);
    }
  }, {
    key: 'buildBuyButton',
    value: function buildBuyButton() {
      var _this2 = this;

      this.buyCoinsButton = new _FrameButton2.default({
        text: this.skinPrice,
        iconImage: 'ui_coin.png',
        iconSize: 0.7,
        colorDisable: 0xa2a2a2,
        dropShadowColorDisable: 0x3f3f3f,
        x: 0,
        y: 640 + 350,
        textX: 20,
        height: 80,
        width: 270,
        fontSize: 45,
        iconAnchorX: 1.3,
        iconAnchorY: 0.45
      });
      this.contentGroup.add(this.buyCoinsButton);
      this.buyCoinsButton.doDisable();

      this.tUnlockSkin = game.add.tween(this.buyCoinsButton).to({ angle: -3 }, 150, _phaser2.default.Easing.Sinusoidal.Out, false).to({ angle: 3 }, 300, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ angle: 0 }, 150, _phaser2.default.Easing.Sinusoidal.In, false).loop(true);

      this.buyCoinsButton.doOnClick = function () {
        if (_Inventory2.default.instance.isBuyableCoins(_this2.skinPrice)) {
          _Inventory2.default.instance.payCoins(_this2.skinPrice);

          _this2.list.unlockRandomSkin();
          _this2.checkButtons();
        }
      };
    }
  }, {
    key: 'checkButtons',
    value: function checkButtons() {
      if (_ScreenManager2.default.instance.shopScreen.list.getAvailableSkins().length > 0) {
        if (_Inventory2.default.instance.isBuyableCoins(this.skinPrice)) {
          this.buyCoinsButton.doEnable();
          this.tUnlockSkin.start();
        } else {
          this.buyCoinsButton.doDisable();
          this.tUnlockSkin.stop();
          this.buyCoinsButton.angle = 0;
        }
      } else {
        this.buyCoinsButton.doDisable();
        this.tUnlockSkin.stop();
        this.buyCoinsButton.angle = 0;
      }
    }
  }, {
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      this.checkButtons();
      this.list.reorderList();
      game.world.bringToTop(game.ui.xpBar);
    }
  }, {
    key: 'saveSkin',
    value: function saveSkin(skin) {
      var data = _storageManager2.default.instance.get('skins');
      data.push(skin.id);
      _storageManager2.default.instance.set('skins', data);
      this.unlockFrame(skin.id);
    }
  }, {
    key: 'unlockFrame',
    value: function unlockFrame(id) {
      this.list.children[id].toggleSkinLocked();
    }
  }, {
    key: 'onCloseAnimationDone',
    value: function onCloseAnimationDone() {
      _get(ShopScreen.prototype.__proto__ || Object.getPrototypeOf(ShopScreen.prototype), 'onCloseAnimationDone', this).call(this);
      this.settings.closeSettings();
    }
  }, {
    key: 'buildMaskOverlay',
    value: function buildMaskOverlay() {
      var _this3 = this;

      this.overlayTop = new _Overlay2.default({
        alpha: 0,
        x: -this.list.width / 2,
        height: _orientation2.default.BASE_GAME_HEIGHT / 2 - this.screenHeight / 2,
        width: this.list.width
      });
      this.contentGroup.add(this.overlayTop);
      this.overlayTop.events.onInputUp.add(function () {
        _this3.closeScreenAnimation();
      });

      this.overlayBottom = new _Overlay2.default({
        alpha: 0,
        x: -this.list.width / 2,
        y: this.screenHeight + (_orientation2.default.BASE_GAME_HEIGHT / 2 - this.screenHeight / 2) + 50,
        height: _orientation2.default.BASE_GAME_HEIGHT / 2 - this.screenHeight / 2,
        width: this.list.width
      });
      this.contentGroup.add(this.overlayBottom);
      this.overlayBottom.events.onInputUp.add(function () {
        _this3.closeScreenAnimation();
      });
    }
  }]);

  return ShopScreen;
}(_Screen3.default);

exports.default = ShopScreen;

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _ShopItem = __webpack_require__(148);

var _ShopItem2 = _interopRequireDefault(_ShopItem);

var _SwipeScroller = __webpack_require__(373);

var _SwipeScroller2 = _interopRequireDefault(_SwipeScroller);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _viewportManager = __webpack_require__(65);

var _viewportManager2 = _interopRequireDefault(_viewportManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkinList = function (_Phaser$Group) {
  _inherits(SkinList, _Phaser$Group);

  function SkinList(screen) {
    _classCallCheck(this, SkinList);

    var _this = _possibleConstructorReturn(this, (SkinList.__proto__ || Object.getPrototypeOf(SkinList)).call(this, game));

    _this.skinList = game.cache.getJSON('skinList');
    _this.selectedSkin = _storageManager2.default.instance.get('selectedSkin');
    _this.y = 510;
    _this.screen = screen;
    _this.buildMask();
    _this.buildItems();
    game.pickRandomSkin.add(function () {
      _this.selectRandomUnlockedSkin();
    });
    _this.selectSkin(_this.selectedSkin, false);

    game.onResizeChange.add(_this.resize, _this);

    _this.resize();
    return _this;
  }

  _createClass(SkinList, [{
    key: 'buildMask',
    value: function buildMask() {
      this.listMask = game.add.graphics(0, 0);
      this.listMask.beginFill(0x000000, 0);
      this.listMask.drawRect(-this.screen.backgroundImage.width / 2, -475, 600, 520);
    }
  }, {
    key: 'buildItems',
    value: function buildItems() {
      var xOffset = 240;
      var yOffset = 220;
      var startX = -(xOffset / 2);
      this.items = [];
      for (var i = 0; i < this.skinList.length; i += 1) {
        var item = new _ShopItem2.default(startX + i % 2 * xOffset, Math.floor(i / 2) * yOffset, this.skinList[i], this, _storageManager2.default.instance.get('skins').includes(i));
        this.add(item);
        this.items.push(item);
      }

      this.mask = this.listMask;

      this.buildScroller();
    }
  }, {
    key: 'reorderList',
    value: function reorderList() {
      var skinData = _storageManager2.default.instance.get('skins');

      var randomSkin = this.items.find(function (item) {
        return item.id === 0;
      });
      var unlockedSkins = this.items.filter(function (element) {
        return skinData.includes(element.id) && element.id !== 0;
      });
      var lockedSkins = this.items.filter(function (element) {
        return !skinData.includes(element.id);
      });

      var newList = [randomSkin].concat(_toConsumableArray(unlockedSkins), _toConsumableArray(lockedSkins));

      var xOffset = 240;
      var yOffset = 220;
      var startX = -(xOffset / 2);
      for (var i = 0; i < newList.length; i += 1) {
        newList[i].position.set(startX + i % 2 * xOffset, Math.floor(i / 2) * yOffset);
      }
    }
  }, {
    key: 'buildScroller',
    value: function buildScroller() {
      if (!this.swipeScroller) {
        this.swipeScroller = new _SwipeScroller2.default({
          scrollable: this,
          minimumItemsToDrag: 4,
          screenSize: this.listMask.height + 420,
          scrollHorizontal: false
        });
        this.add(this.swipeScroller);
      } else {
        this.swipeScroller.updateList(this);
      }
    }
  }, {
    key: 'selectSkin',
    value: function selectSkin(id) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      for (var i = 0; i < this.items.length; i += 1) {
        if (this.items[i].id === id) {
          if (this.selectedItem) {
            this.selectedItem.toggleSkinSelect(false);
          }
          this.items[i].toggleSkinSelect(true);
          this.selectedItem = this.items[i];
          if (id === 0) {
            this.selectRandomUnlockedSkin();
            if (update) {
              _storageManager2.default.instance.set('selectedSkin', id);
            }

            return;
          }
          game.player.switchSkin(this.selectedItem.id, this.selectedItem.skinFrames);
          if (update) {
            _storageManager2.default.instance.set('selectedSkin', id);
          }
        }
      }

      // Select random skin if nothing is selected.
      if (!this.selectedItem) {
        this.selectedItem = this.items[0];
        this.selectedItem.toggleSkinSelect(true);
        this.selectRandomUnlockedSkin();
        _storageManager2.default.instance.set('selectedSkin', id);
      }
    }
  }, {
    key: 'selectRandomUnlockedSkin',
    value: function selectRandomUnlockedSkin() {
      var filteredList = _storageManager2.default.instance.get('skins');
      var rnd = game.rnd.integerInRange(1, filteredList.length - 1);

      game.player.switchSkin(filteredList[rnd]);
      //
      // const data = { selectedSkin: 0 };
      // DataManager.instance.updateSpecificData(data);
    }
  }, {
    key: 'unlockRandomLockedSkin',
    value: function unlockRandomLockedSkin() {
      var filteredList = _storageManager2.default.instance.get('skins');
      var skinList = game.cache.getJSON('skinList');

      this.availableSkins = this.items.filter(function (element) {
        return !skinData.includes(element.id);
      });

      var rnd = game.rnd.integerInRange(0, this.availableSkins.length - 1);

      var skin = this.availableSkins[rnd];

      this.screen.unlockOverlay.startAnimation(skin, false);
      this.screen.saveSkin(skin);
    }
  }, {
    key: 'unlockRandomSkin',
    value: function unlockRandomSkin() {
      var skinData = _storageManager2.default.instance.get('skins');
      var skinList = game.cache.getJSON('skinList');

      this.availableSkins = this.items.filter(function (element) {
        return element.id !== 0 && element.id !== 1;
      });

      var rnd = game.rnd.integerInRange(0, this.availableSkins.length - 1);
      var skin = this.availableSkins[rnd];
      var isDuplicate = skinData.includes(skin.id);

      this.screen.unlockOverlay.startAnimation(skin, isDuplicate);
      this.screen.saveSkin(skin);
    }
  }, {
    key: 'getAvailableSkins',
    value: function getAvailableSkins() {
      var skinData = _storageManager2.default.instance.get('skins');
      this.availableSkins = this.items.filter(function (element) {
        return !skinData.includes(element.id);
      });
      return this.availableSkins;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.listMask.y = -220 * (1 - _viewportManager2.default.instance.zoomIn);
      this.listMask.scale.setTo(1, _viewportManager2.default.instance.zoomIn);
    }
  }]);

  return SkinList;
}(_phaser2.default.Group);

exports.default = SkinList;

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _ShopItem = __webpack_require__(148);

var _ShopItem2 = _interopRequireDefault(_ShopItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Swipe scroller class
Lets the user swipe through a list of items. Add the items to a group and give the group to the
scrollable parameter. Make sure the update function of this class is called and that
the scrolling items (the children of the scrollable) are extended from Sprite
(or button, which extends sprite)
 */

var SwipeScroller = function (_Phaser$Group) {
  _inherits(SwipeScroller, _Phaser$Group);

  function SwipeScroller(_ref) {
    var scrollable = _ref.scrollable,
        _ref$minimumItemsToDr = _ref.minimumItemsToDrag,
        minimumItemsToDrag = _ref$minimumItemsToDr === undefined ? 3 : _ref$minimumItemsToDr,
        _ref$decelerationSpee = _ref.decelerationSpeed,
        decelerationSpeed = _ref$decelerationSpee === undefined ? 15 : _ref$decelerationSpee,
        _ref$scrollHorizontal = _ref.scrollHorizontal,
        scrollHorizontal = _ref$scrollHorizontal === undefined ? true : _ref$scrollHorizontal,
        _ref$screenSize = _ref.screenSize,
        screenSize = _ref$screenSize === undefined ? 300 : _ref$screenSize;

    _classCallCheck(this, SwipeScroller);

    var _this = _possibleConstructorReturn(this, (SwipeScroller.__proto__ || Object.getPrototypeOf(SwipeScroller)).call(this, game));

    _this.scrollable = scrollable;
    _this.minimumItemsToDrag = minimumItemsToDrag;
    _this.decelerationSpeed = decelerationSpeed;
    _this.scrollHorizontal = scrollHorizontal;
    _this.dragging = false;
    _this.screenSize = screenSize;

    _this.speed = 0;

    _this.minPos = _this.scrollHorizontal ? _this.scrollable.x : _this.scrollable.y;

    var _loop = function _loop(i) {
      if (!(_this.scrollable.children[i] instanceof _ShopItem2.default)) {
        return {
          v: _possibleConstructorReturn(_this)
        };
      }

      _this.scrollable.children[i].onChildInputDown.add(function () {
        _this.startDrag(_this.scrollable.children[i]);
      });
      _this.scrollable.children[i].onChildInputUp.add(function () {
        _this.endDrag();
      });
    };

    for (var i = 0; i < _this.scrollable.length; i += 1) {
      var _ret = _loop(i);

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return _this;
  }

  _createClass(SwipeScroller, [{
    key: 'startDrag',
    value: function startDrag(draggedItem) {
      if (this.scrollable.length < this.minimumItemsToDrag) {
        return;
      }
      this.dragging = true;
      if (this.scrollHorizontal) {
        this.dragStart = this.scrollable.x;
        this.startPos = this.game.input.worldX;
      } else {
        this.dragStart = this.scrollable.y;
        this.startPos = this.game.input.worldY;
      }

      this.speed = 0;
      this.time = 0;
    }
  }, {
    key: 'endDrag',
    value: function endDrag() {
      if (this.scrollable.length < this.minimumItemsToDrag) {
        return;
      }
      if (this.scrollHorizontal) {
        this.dragEnd = this.scrollable.x;
      } else {
        this.dragEnd = this.scrollable.y;
      }

      this.distance = this.dragStart - this.dragEnd;
      if (this.time !== 0) {
        this.speed = this.distance / this.time;
      }
      this.dragging = false;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.scrollable.length < this.minimumItemsToDrag) {
        return;
      }
      this.time += 1;
      if (this.scrollHorizontal) {
        if (this.dragging) {
          var delta = this.startPos - this.game.input.worldX;

          this.scrollable.x = this.dragStart - delta;
        } else {
          this.scrollable.x -= this.speed;
        }
      } else if (this.dragging) {
        var _delta = this.startPos - this.game.input.worldY;

        this.scrollable.y = this.dragStart - _delta;
      } else {
        this.scrollable.y -= this.speed;
      }

      if (this.speed !== 0) {
        this.decelerate();
      }
    }
  }, {
    key: 'decelerate',
    value: function decelerate() {
      if (this.scrollable.length < this.minimumItemsToDrag) {
        return;
      }
      if (this.speed > this.decelerationSpeed) {
        this.speed -= this.decelerationSpeed;
      } else if (this.speed < -this.decelerationSpeed) {
        this.speed += this.decelerationSpeed;
      } else {
        this.speed = 0;
        this.checkBoundaries();
      }
    }
  }, {
    key: 'checkBoundaries',
    value: function checkBoundaries() {
      if (this.scrollHorizontal) {
        if (this.scrollable.x > this.minPos) {
          if (!this.tweening && !this.dragging) {
            this.tweenBack(this.minPos);
          }
        } else if (this.scrollable.x < this.minPos - this.scrollable.width + this.screenSize) {
          if (!this.tweening && !this.dragging) {
            this.tweenBack(this.minPos - this.scrollable.width + this.screenSize);
          }
        }
      } else if (this.scrollable.y > this.minPos) {
        if (!this.tweening && !this.dragging) {
          this.tweenBack(this.minPos);
        }
      } else if (this.scrollable.y < -(this.scrollable.height - this.screenSize)) {
        if (!this.tweening && !this.dragging) {
          this.tweenBack(-(this.scrollable.height - this.screenSize));
        }
      }
    }
  }, {
    key: 'tweenBack',
    value: function tweenBack(boundaryPos) {
      var _this2 = this;

      this.tweening = true;
      if (this.scrollHorizontal) {
        this.resetTween = this.game.add.tween(this.scrollable).to({ x: boundaryPos }, 150, _phaser2.default.Easing.Cubic.Out, false);
      } else {
        this.resetTween = this.game.add.tween(this.scrollable).to({ y: boundaryPos }, 150, _phaser2.default.Easing.Cubic.Out, false);
      }
      this.resetTween.onComplete.add(function () {
        _this2.tweening = false;
      });
      this.resetTween.start();
    }
  }, {
    key: 'updateList',
    value: function updateList(list) {
      var _this3 = this;

      this.scrollable = list;

      var _loop2 = function _loop2(i) {
        _this3.scrollable.children[i].onChildInputDown.add(function () {
          _this3.startDrag(_this3.scrollable.children[i]);
        });
        _this3.scrollable.children[i].onChildInputUp.add(function () {
          _this3.endDrag();
        });
      };

      for (var i = 0; i < this.scrollable.length; i += 1) {
        _loop2(i);
      }
    }
  }]);

  return SwipeScroller;
}(_phaser2.default.Group);

exports.default = SwipeScroller;

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Overlay = __webpack_require__(66);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnlockSkinOverlay = function (_Phaser$Group) {
  _inherits(UnlockSkinOverlay, _Phaser$Group);

  function UnlockSkinOverlay(screen) {
    _classCallCheck(this, UnlockSkinOverlay);

    var _this = _possibleConstructorReturn(this, (UnlockSkinOverlay.__proto__ || Object.getPrototypeOf(UnlockSkinOverlay)).call(this, game));

    _this.visible = false;
    _this.animationDone = false;
    _this.screen = screen;

    _this.skinGroup = new _phaser2.default.Group(game);

    _this.buildOverlay();
    _this.add(_this.skinGroup);
    _this.skinGroup.x = game.world.width / 2;
    _this.skinGroup.y = game.world.height / 2;

    _this.buildEgg();
    _this.buildDuplicate();

    game.onResizeChange.add(_this.resize, _this);
    return _this;
  }

  _createClass(UnlockSkinOverlay, [{
    key: 'startAnimation',
    value: function startAnimation(skin, isDuplicate) {
      var _this2 = this;

      this.resetAnimation();
      this.animationDone = false;
      this.visible = true;
      game.world.bringToTop(this);
      this.unlockedSkin.frameName = 'ui_' + skin.skinName + '.png';

      var tEggGrow = game.add.tween(this.lockedSkin.scale).from({ x: 0, y: 0 }, 500, _phaser2.default.Easing.Sinusoidal.InOut, false);

      var shakeDistance = 10;
      var xPos = 0;
      var tEggShake = game.add.tween(this.lockedSkin).to({ x: xPos + shakeDistance, angle: shakeDistance }, 50, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ x: xPos - shakeDistance, angle: -shakeDistance }, 50, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ x: xPos + shakeDistance, angle: shakeDistance }, 50, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ x: xPos, angle: 0 }, 50, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ x: xPos, angle: 0 }, 1000, _phaser2.default.Easing.Sinusoidal.InOut, false).loop(true);

      this.tFlashGrow = game.add.tween(this.flash.scale).to({ x: 8, y: 8 }, 100, _phaser2.default.Easing.Sinusoidal.InOut, false);
      var tFlashGrow2 = game.add.tween(this.flash2.scale).to({ x: 10, y: 0.5 }, 50, _phaser2.default.Easing.Sinusoidal.InOut, false);
      var tFlashShrink = game.add.tween(this.flash).to({ alpha: 0 }, 1000, _phaser2.default.Easing.Sinusoidal.InOut, false, 100);
      var tFlashShrink2 = game.add.tween(this.flash2).to({ alpha: 0 }, 600, _phaser2.default.Easing.Sinusoidal.InOut, false);

      var tBallGrow = game.add.tween(this.unlockedSkin.scale).to({ x: 2.5, y: 2.5 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false);
      tBallGrow.onComplete.add(function () {
        _this2.animationDone = true;
      });
      var tShineGrow = game.add.tween(this.ballShine.scale).to({ x: 1.7, y: 1.7 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false, 1500);
      var tShineRotate = game.add.tween(this.ballShine).to({ angle: 359 }, 10000, _phaser2.default.Easing.Default, false).loop(true);
      var tTextGrow = game.add.tween(this.title.scale).to({ x: 1, y: 1 }, 1000, _phaser2.default.Easing.Default, false);
      var tDuplicateGrow = game.add.tween(this.duplicateGroup.scale).to({ x: 1, y: 1 }, 1000, _phaser2.default.Easing.Default, false);

      this.tFlashGrow.onComplete.add(function () {
        tFlashGrow2.start();
        _this2.lockedSkin.visible = false;
        skin.toggleSkinLocked(true);
        skin.toggleSkin(true);
        _ScreenManager2.default.instance.shopScreen.list.reorderList();
        _this2.screen.checkButtons();
        tShineGrow.start();
        tShineRotate.start();
        tTextGrow.start();
        if (isDuplicate) {
          tDuplicateGrow.start();
          _Inventory2.default.instance.addToType('coins', 10);
          _this2.screen.checkButtons();
        } else {
          _AchievementSystem2.default.instance.incrementAchievementData('skins', 1);
        }
        game.soundManager.playSound('skinUnlock');
      });

      tEggGrow.chain(tEggShake);
      // tEggShake.chain(tFlashGrow);
      this.tFlashGrow.chain(tFlashShrink);
      tFlashGrow2.chain(tFlashShrink2, tBallGrow);
      // tFlashGrow2.chain(tBallGrow);

      tEggGrow.start();
    }
  }, {
    key: 'buildOverlay',
    value: function buildOverlay() {
      var _this3 = this;

      this.overlay = new _Overlay2.default({
        color: '#000000',
        alpha: 0.7
      });
      this.add(this.overlay);
      this.overlay.events.onInputDown.add(function () {
        if (_this3.animationDone) {
          _this3.visible = false;
        } else if (!_this3.hasStarted) {
          _this3.tFlashGrow.start();
          _this3.hasStarted = true;
        }
      });
    }
  }, {
    key: 'buildEgg',
    value: function buildEgg() {
      this.lockedSkin = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'locked_skin.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 2,
        scaleY: 2
      });
      this.skinGroup.add(this.lockedSkin);

      this.flash = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_shop_ball_shine.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0,
        scaleY: 0
      });
      this.skinGroup.add(this.flash);

      this.flash2 = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_shop_ball_shine.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0,
        scaleY: 0
      });
      this.skinGroup.add(this.flash2);
      this.flash2.angle = 90;

      this.ballShine = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'basic_shine.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0,
        scaleY: 0
      });
      this.skinGroup.add(this.ballShine);

      this.unlockedSkin = new _Sprite2.default({
        asset: 'playerAtlas',
        frame: 'california_maki/california_maki_1.png',
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0,
        scaleY: 0
      });
      this.skinGroup.add(this.unlockedSkin);

      this.title = new _Text2.default({
        text: 'New skin unlocked!',
        x: 0,
        y: -game.world.height / 4,
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 40,
        color: '#FFFFFF'
      });
      this.title.scale.setTo(0, 0);
      this.skinGroup.add(this.title);
    }
  }, {
    key: 'buildDuplicate',
    value: function buildDuplicate() {
      this.scaleGroup = new _phaser2.default.Group(game);
      this.duplicateGroup = new _phaser2.default.Group(game);
      this.scaleGroup.position.set(game.world.width / 2, game.world.height / 1.3);
      this.scaleGroup.add(this.duplicateGroup);
      this.add(this.scaleGroup);

      this.duplicateText = new _Text2.default({
        text: 'Duplicate!',
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 40,
        color: '#FFFFFF'
      });
      this.duplicateGroup.add(this.duplicateText);

      this.currencyIcon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_coin.png',
        anchorX: 0.5,
        anchorY: 0.5,
        x: 60,
        y: 80
      });
      this.currencyIcon.scale.set(0.8);
      this.duplicateGroup.add(this.currencyIcon);

      this.duplicateCoinText = new _Text2.default({
        text: '+10',
        anchorX: 0.5,
        anchorY: 0.5,
        fontSize: 40,
        x: -40,
        y: 80,
        color: '#FFFFFF'
      });
      this.duplicateGroup.add(this.duplicateCoinText);
    }
  }, {
    key: 'resetAnimation',
    value: function resetAnimation() {
      this.hasStarted = false;
      this.lockedSkin.scale.setTo(2, 2);
      this.lockedSkin.visible = true;
      this.flash.alpha = 1;
      this.flash.scale.setTo(0);
      this.flash2.scale.setTo(0, 0);
      this.flash2.alpha = 1;
      this.unlockedSkin.scale.setTo(0, 0);
      this.ballShine.scale.setTo(0, 0);
      this.title.scale.setTo(0, 0);
      this.duplicateGroup.scale.setTo(0, 0);
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.overlay.width = game.world.width;
      this.overlay.height = game.world.height;

      this.scaleGroup.x = game.world.width / 2;
      this.scaleGroup.y = game.world.height / 1.3;

      this.skinGroup.x = game.world.width / 2;
      this.skinGroup.y = game.world.height / 2;
    }
  }]);

  return UnlockSkinOverlay;
}(_phaser2.default.Group);

exports.default = UnlockSkinOverlay;

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(1);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _SettingsButton = __webpack_require__(83);

var _SettingsButton2 = _interopRequireDefault(_SettingsButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AchievementsScreen = function (_Screen) {
  _inherits(AchievementsScreen, _Screen);

  function AchievementsScreen() {
    _classCallCheck(this, AchievementsScreen);

    var _this = _possibleConstructorReturn(this, (AchievementsScreen.__proto__ || Object.getPrototypeOf(AchievementsScreen)).call(this, { name: 'achievements', titleText: 'Achievements', screenHeight: 1000, titleIcon: 'ui_leaderboard_icon.png' }));

    _this.contentGroup.y = 100;
    _this.achievementList = game.cache.getJSON('achievements');
    _this.cards = [];
    _this.medals = [];

    _this.createMedalView(410);
    _this.createAchievementList(630);

    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 45);
    _this.add(_this.coinDisplay);

    _this.settings = new _SettingsButton2.default();
    _this.add(_this.settings);
    return _this;
  }

  _createClass(AchievementsScreen, [{
    key: 'onScreenOpen',
    value: function onScreenOpen() {
      _get(AchievementsScreen.prototype.__proto__ || Object.getPrototypeOf(AchievementsScreen.prototype), 'onScreenOpen', this).call(this);
      this.setAchievementData();
      game.world.bringToTop(game.ui.xpBar);
    }
  }, {
    key: 'setAchievementData',
    value: function setAchievementData() {
      for (var i = 0; i < this.medals.length; i += 1) {
        var data = _AchievementSystem2.default.instance.getAchievementData(this.medals[i].achievement.type);
        var medalInfo = _AchievementSystem2.default.instance.getMedal(this.medals[i].achievement, data.step);
        this.medals[i].medal.frameName = medalInfo.medalFrame;
        this.medals[i].icon.frameName = medalInfo.iconFrame;
        this.medals[i].icon.tint = medalInfo.iconColor;
        this.medals[i].medal.scale.set(data.step === 0 ? 0.5 : 0.6);
      }

      for (var _i = 0; _i < this.cards.length; _i += 1) {
        var _data = _AchievementSystem2.default.instance.getAchievementData(this.cards[_i].achievement.type);
        var step = _data.step >= this.cards[_i].achievement.values.length ? this.cards[_i].achievement.values.length - 1 : _data.step;
        this.cards[_i].text.text = _AchievementSystem2.default.instance.getAchievementText(this.cards[_i].achievement, step);
        if (this.cards[_i].achievement.cumulative) {
          var goal = this.cards[_i].achievement.combo > 1 ? this.cards[_i].achievement.combo : this.cards[_i].achievement.values[step];
          this.cards[_i].progressBar.width = _data.progress / goal * this.cards[_i].progressBackground.width;
          this.cards[_i].progressText.text = _data.progress + '/' + goal;
        }
        this.cards[_i].text.style.fill = _data.step >= 3 ? '#ffffff' : '#32374a';
        this.cards[_i].background.frameName = _data.step >= 3 ? 'ui_achievement_finished.png' : 'ui_achievement_ongoing.png';
      }
    }
  }, {
    key: 'createMedalView',
    value: function createMedalView(y) {
      this.medalBackground = new _Frame2.default({
        key: 'gameOverFrame',
        x: 0,
        y: y,
        width: 500,
        height: 330,
        anchorX: 0.5,
        anchorY: 0.5
      });
      this.contentGroup.add(this.medalBackground);

      var xOffset = 160;
      var yOffset = 140;

      for (var i = 0; i < Object.keys(this.achievementList).length; i += 1) {
        this.createMedal(-xOffset + i % 3 * xOffset, y - yOffset / 2 + Math.floor(i / 3) * yOffset, this.achievementList[Object.keys(this.achievementList)[i]]);
      }
    }
  }, {
    key: 'createMedal',
    value: function createMedal(x, y, achievement) {
      var medal = new _phaser.Group(game);
      medal.y = y;
      medal.x = x;
      this.contentGroup.add(medal);
      this.medals.push(medal);
      medal.achievement = achievement;

      var medalInfo = _AchievementSystem2.default.instance.getMedal(achievement, 3);

      var medalImage = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: medalInfo.medalFrame,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.6,
        scaleY: 0.6
      });
      medal.add(medalImage);
      medal.medal = medalImage;

      var icon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: medalInfo.iconFrame,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.6,
        scaleY: 0.6
      });
      icon.tint = medalInfo.iconColor;
      medal.add(icon);
      medal.icon = icon;
    }
  }, {
    key: 'createAchievementList',
    value: function createAchievementList(startY) {
      var offset = 100;
      for (var i = 0; i < Object.keys(this.achievementList).length; i += 1) {
        this.createAchievementCard(startY + i * offset, this.achievementList[Object.keys(this.achievementList)[i]]);
      }
    }
  }, {
    key: 'createAchievementCard',
    value: function createAchievementCard(y, achievement) {
      var card = new _phaser.Group(game);
      card.y = y;
      card.x = 0;
      this.contentGroup.add(card);
      this.cards.push(card);

      card.achievement = achievement;

      var background = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_achievement_ongoing.png',
        scaleX: 0.6,
        scaleY: 0.6,
        anchorX: 0.5,
        anchorY: 0.5
      });
      card.add(background);
      card.background = background;

      var icon = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_achievement_' + achievement.type + '.png',
        x: -232,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.5,
        scaleY: 0.5
      });
      // icon.tint = medalInfo.iconColor;
      card.add(icon);

      var text = new _Text2.default({
        text: _AchievementSystem2.default.instance.getAchievementText(achievement, 1),
        x: -180,
        y: -32,
        color: '#32374a',
        fontSize: 18,
        boundsAlignV: 'top',
        align: 'left',
        wordWrap: true,
        wordWrapWidth: 450
      });
      card.text = text;
      card.add(text);

      if (achievement.cumulative) {

        var barY = 18;
        var barX = -180;
        var progressBackground = new _Sprite2.default({
          x: barX,
          y: barY,
          asset: 'uiAtlas',
          frame: 'ui_bar_continue_base.png',
          anchorX: 0,
          anchorY: 0.5
        });
        // progressBackground.tint = 0xa2a2a2;
        card.add(progressBackground);
        card.progressBackground = progressBackground;

        var progressBar = new _Sprite2.default({
          x: barX,
          y: barY,
          anchorX: 0,
          anchorY: 0.5,
          asset: 'uiAtlas',
          frame: 'ui_achievement_progress.png'
        });
        card.add(progressBar);
        card.progressBar = progressBar;

        var progressEdge = new _Sprite2.default({
          x: barX,
          y: barY + 5,
          asset: 'uiAtlas',
          frame: 'ui_bar_continue_base_red.png',
          anchorX: 0,
          anchorY: 0.5
        });
        card.add(progressEdge);

        var progressText = new _Text2.default({
          text: '0/0',
          x: 267,
          y: barY + 2,
          color: '#a2a2a2',
          fontSize: 18,
          anchorX: 1,
          anchorY: 0.5,
          align: 'right',
          maxWidth: 100
        });
        card.progressText = progressText;
        card.add(progressText);
      }
    }
  }, {
    key: 'onCloseAnimationDone',
    value: function onCloseAnimationDone() {
      _get(AchievementsScreen.prototype.__proto__ || Object.getPrototypeOf(AchievementsScreen.prototype), 'onCloseAnimationDone', this).call(this);
      this.settings.closeSettings();
    }
  }]);

  return AchievementsScreen;
}(_Screen3.default);

exports.default = AchievementsScreen;

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _Screen2 = __webpack_require__(60);

var _Screen3 = _interopRequireDefault(_Screen2);

var _LeaderboardList = __webpack_require__(377);

var _LeaderboardList2 = _interopRequireDefault(_LeaderboardList);

var _backend = __webpack_require__(82);

var _backend2 = _interopRequireDefault(_backend);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a leaderboard screen
 */
var LeaderboardScreen = function (_Screen) {
  _inherits(LeaderboardScreen, _Screen);

  function LeaderboardScreen(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? 'leaderboard' : _ref$name,
        _ref$screenHeight = _ref.screenHeight,
        screenHeight = _ref$screenHeight === undefined ? 800 : _ref$screenHeight;

    _classCallCheck(this, LeaderboardScreen);

    var _this = _possibleConstructorReturn(this, (LeaderboardScreen.__proto__ || Object.getPrototypeOf(LeaderboardScreen)).call(this, { name: name, screenHeight: screenHeight, titleIcon: 'ui_icon_achievements.png' }));

    game.leaderboard = _this;
    _this.regex = /^[a-zA-Z0-9 ]*$/;

    _this.leaderboardList = new _LeaderboardList2.default(_this, 'globalLeaderboard', 20);

    _this.contentGroup.add(_this.leaderboardList);

    _this.buildSubmitScore();
    return _this;
  }

  _createClass(LeaderboardScreen, [{
    key: 'onScreenOpen',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.highScore.text = String(_storageManager2.default.instance.get('highscore'));
                _context.next = 3;
                return this.refreshLeaderboard();

              case 3:
                _context.next = 5;
                return this.fetchEntry();

              case 5:

                this.setSubmitButtonState();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onScreenOpen() {
        return _ref2.apply(this, arguments);
      }

      return onScreenOpen;
    }()
  }, {
    key: 'buildSubmitScore',
    value: function buildSubmitScore() {
      var _this2 = this;

      this.playerName = game.add.inputField(-130, 640 + 360, {
        font: '28px Bungee regular',
        fill: '#212121',
        // fontWeight: 'bold',
        width: 200,
        padding: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: _LocalisationManager2.default.get('Player Placeholder'),
        textAlign: 'center'
      });

      this.contentGroup.add(this.playerName);

      this.playerName.domElement.element.addEventListener('keyup', function () {
        _this2.setSubmitButtonState();
      });

      this.submitButton = new _FrameButton2.default({
        x: 210,
        y: 640 + 390,
        // text: 'submit!',
        iconImage: 'ui_icon_upload_score.png',
        iconSize: 0.6,
        width: 150,
        height: 80,
        fontSize: 20,
        colorDisable: 0xC1C1C1,
        dropShadowColorDisable: 0x989898
      });
      this.contentGroup.add(this.submitButton);
      this.submitButton.doOnClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.setSubmitButtonState(false);
                _context2.next = 3;
                return _this2.setScore();

              case 3:
                result = _context2.sent;

                if (result.success) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return');

              case 6:
                _context2.next = 8;
                return _this2.showLeaderboard();

              case 8:
                _context2.next = 10;
                return _this2.fetchEntry();

              case 10:
                _this2.setSubmitButtonState();

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      this.highScoreText = new _phaser.BitmapText(game, -285, 640 + 360, 'font', _LocalisationManager2.default.get('Highscore:'), 20);
      this.contentGroup.add(this.highScoreText);

      this.highScore = new _phaser.BitmapText(game, -270, 640 + 380, 'font', String(_storageManager2.default.instance.get('highscore')), 40);

      this.contentGroup.add(this.highScore);
    }
  }, {
    key: 'setScore',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _backend2.default.instance.setScore();

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setScore() {
        return _ref4.apply(this, arguments);
      }

      return setScore;
    }()
  }, {
    key: 'showLeaderboard',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var entries;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _backend2.default.instance.fetchLeaderboard();

              case 2:
                entries = _context4.sent;

                if (Array.isArray(entries)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return');

              case 5:

                this.leaderboardList.buildItems(entries);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showLeaderboard() {
        return _ref5.apply(this, arguments);
      }

      return showLeaderboard;
    }()
  }, {
    key: 'refreshLeaderboard',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.leaderboardList.removeItems();
                _context5.next = 3;
                return this.showLeaderboard();

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function refreshLeaderboard() {
        return _ref6.apply(this, arguments);
      }

      return refreshLeaderboard;
    }()
  }, {
    key: 'setSubmitButtonState',
    value: function setSubmitButtonState(visible) {
      if (typeof visible === 'boolean') {
        if (visible) {
          this.submitButton.doEnable();
        } else {
          this.submitButton.doDisable();
        }

        return;
      }

      if (this.isNameValid() && this.isScoreHigher()) {
        this.submitButton.doEnable();
      } else {
        this.submitButton.doDisable();
      }
    }
  }, {
    key: 'fetchEntry',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _backend2.default.instance.fetchEntry(_storageManager2.default.instance.get('leaderboardId'));

              case 2:
                this.entry = _context6.sent;


                if (this.entry && typeof this.entry.name === 'string') {
                  this.playerName.setText(this.entry.name);
                }

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchEntry() {
        return _ref7.apply(this, arguments);
      }

      return fetchEntry;
    }()
  }, {
    key: 'isNameValid',
    value: function isNameValid() {
      if (this.playerName.value.replace(/\s/g, '').length) {
        if (this.playerName.value.length > 0 && this.playerName.value.length < 13) {
          if (this.regex.test(this.playerName.value)) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: 'isScoreHigher',
    value: function isScoreHigher() {
      if (!this.entry) {
        return true;
      }
      return _storageManager2.default.instance.get('highscore') > this.entry.score;
    }
  }]);

  return LeaderboardScreen;
}(_Screen3.default);

exports.default = LeaderboardScreen;

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _LeaderboardItem = __webpack_require__(378);

var _LeaderboardItem2 = _interopRequireDefault(_LeaderboardItem);

var _scrollView = __webpack_require__(379);

var _scrollView2 = _interopRequireDefault(_scrollView);

var _vector = __webpack_require__(149);

var _vector2 = _interopRequireDefault(_vector);

var _ObjectPool = __webpack_require__(150);

var _ObjectPool2 = _interopRequireDefault(_ObjectPool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a scrollable list for the leaderboard entries, name requires to be the same as the name
set up on the facebook portal, maxEntries is the longest that the list can get. reloadList can
be called to create a new list from scratch
 */
var LeaderboardList = function (_Phaser$Group) {
  _inherits(LeaderboardList, _Phaser$Group);

  function LeaderboardList(screen, name, maxEntries) {
    _classCallCheck(this, LeaderboardList);

    var _this = _possibleConstructorReturn(this, (LeaderboardList.__proto__ || Object.getPrototypeOf(LeaderboardList)).call(this, game));

    _this.name = name;
    _this.screen = screen;
    _this.itemOffset = 90;
    _this.hasUpdated = false;
    _this.maxEntries = maxEntries;
    _this.scrollingGroup = new _phaser2.default.Group(game);
    _this.scrollingGroup.x = game.width / 2;
    _this.scrollingGroup.y = 0;

    _this.items = [];
    _this.objectPool = new _ObjectPool2.default(game, _LeaderboardItem2.default, 20);
    _this.add(_this.scrollingGroup);
    _this.buildMask();
    _this.buildScroller();
    return _this;
  }

  _createClass(LeaderboardList, [{
    key: 'buildItems',
    value: function buildItems(entries) {
      for (var i = 0; i < entries.length; i += 1) {
        var item = this.objectPool.getObject();
        item.visible = true;
        item.setInfo(entries[i], 0, i * this.itemOffset);
        this.scrollingGroup.add(item);
        this.items.push(item);
      }
      if (this.scrollView) {
        this.scrollView.onGroupChange(true);
      }
    }
  }, {
    key: 'buildMask',
    value: function buildMask() {
      this.listMask = game.add.graphics(0, 0);
      this.listMask.beginFill(0xff0000, 0.5);
      this.listMask.drawRect(-300, -35, 600, 600);
      this.listMask.anchor.setTo(0.5, 0);
      this.listMask.endFill();
    }
  }, {
    key: 'buildScroller',
    value: function buildScroller() {
      this.scrollView = new _scrollView2.default({
        viewport: this.listMask,
        content: this.scrollingGroup,
        horizontal: false,
        scrollMode: 'Bounce',
        bounce: 0.5,
        position: new _phaser2.default.Point(0, 400),
        padding: new _vector2.default(0, 20, 0, 0)
      });
      this.add(this.scrollView);
    }
  }, {
    key: 'removeItems',
    value: function removeItems() {
      for (var i = this.items.length - 1; i >= 0; i -= 1) {
        this.scrollingGroup.remove(this.items[i]);
        this.objectPool.returnObject(this.items[i]);
        this.items.pop();
      }
    }
  }]);

  return LeaderboardList;
}(_phaser2.default.Group);

exports.default = LeaderboardList;

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Creates a leaderboard entry, the entry parameter needs to be of the type
that facebook returns with getEntriesAsync, photo is added later by the list class
 */
var LeaderboardItem = function (_Phaser$Group) {
  _inherits(LeaderboardItem, _Phaser$Group);

  function LeaderboardItem() {
    _classCallCheck(this, LeaderboardItem);

    var _this = _possibleConstructorReturn(this, (LeaderboardItem.__proto__ || Object.getPrototypeOf(LeaderboardItem)).call(this, game));

    _this.buildItem();
    _this.inputEnableChildren = true;
    return _this;
  }

  _createClass(LeaderboardItem, [{
    key: 'buildItem',
    value: function buildItem() {
      this.background = new _Frame2.default({
        x: 0,
        y: 0,
        width: 500,
        height: 70,
        color: 0xe5e5e5,
        anchorX: 0.5,
        anchorY: 0.5,
        cornerRadius: 0.5
      });
      this.add(this.background);
      this.rank = new _Text2.default({
        text: '',
        x: -190,
        y: 0,
        fontSize: 23,
        anchorX: 0,
        anchorY: 0.5
      });
      this.background.addChild(this.rank);
      this.name = new _Text2.default({
        text: '',
        x: -100,
        y: 0,
        fontSize: 23,
        anchorX: 0,
        anchorY: 0.5
      });
      this.background.add(this.name);
      this.score = new _Text2.default({
        text: '',
        x: 230,
        y: 0,
        fontSize: 23,
        anchorX: 1,
        anchorY: 0.5
      });
      this.background.add(this.score);
    }
  }, {
    key: 'setInfo',
    value: function setInfo(entry, x, y) {
      this.x = x;
      this.y = y;
      this.rank.text = '#' + entry.rank;
      this.name.text = entry.name || '';
      this.score.text = entry.score;
    }
  }]);

  return LeaderboardItem;
}(_phaser2.default.Group);

exports.default = LeaderboardItem;

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _vector = __webpack_require__(149);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// region ...Private methods declaration
var setScrollviewSettings = Symbol('setScrollviewSettings');
var onInputMove = Symbol('onInputMove');
var onInputDown = Symbol('onInputDown');
var onInputUp = Symbol('onInputUp');
var calculateNewBounds = Symbol('calculateNewBounds');
var checkIfVerticalOOB = Symbol('checkIfVerticalOOB');
var checkIfHorizontalOOB = Symbol('checkIfHorizontalOOB');
var bounceTween = Symbol('bounceTween');
var clamp = Symbol('clamp');
// endregion

/**
 * A scroll view where you can add a group and a mask.
 * With a few settings, the behaviour of the scroll view can be adjusted.
 * An example where this class can be used for is a leader board.
 *
 * @author Weikang Hu
 * @version 1.0
 * @since 2019-02-15
 */

var ScrollView = function (_Group) {
  _inherits(ScrollView, _Group);

  /**
   * Settings of the scroll view is defined at initialize.
   *
   * @param viewport Display/Graphics Object
   * @param position Phaser.Point Position of the scroll view
   * @param content Phaser.Group
   * @param scrollMode string
   * @param bounce number A value between 1 and 0;
   * @param friction number A value between 1 and 0
   * @param horizontal boolean Enable horizontal scroll
   * @param vertical boolean Enable vertical scroll
   * @param horizontalScrollbar Phaser.Group
   * @param verticalScrollbar Phaser.Group
   * @param padding vector4 Padding of the scroll view
   */
  function ScrollView(_ref) {
    var viewport = _ref.viewport,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? new _phaser.Point(0, 0) : _ref$position,
        content = _ref.content,
        _ref$scrollMode = _ref.scrollMode,
        scrollMode = _ref$scrollMode === undefined ? 'CLAMP' : _ref$scrollMode,
        _ref$bounce = _ref.bounce,
        bounce = _ref$bounce === undefined ? 0 : _ref$bounce,
        _ref$friction = _ref.friction,
        friction = _ref$friction === undefined ? 0 : _ref$friction,
        _ref$horizontal = _ref.horizontal,
        horizontal = _ref$horizontal === undefined ? true : _ref$horizontal,
        _ref$vertical = _ref.vertical,
        vertical = _ref$vertical === undefined ? true : _ref$vertical,
        _ref$horizontalScroll = _ref.horizontalScrollbar,
        horizontalScrollbar = _ref$horizontalScroll === undefined ? null : _ref$horizontalScroll,
        _ref$verticalScrollba = _ref.verticalScrollbar,
        verticalScrollbar = _ref$verticalScrollba === undefined ? null : _ref$verticalScrollba,
        _ref$padding = _ref.padding,
        padding = _ref$padding === undefined ? new _vector2.default(0, 0, 0, 0) : _ref$padding;

    _classCallCheck(this, ScrollView);

    var _this = _possibleConstructorReturn(this, (ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call(this, game));

    _this.x = position.x;
    _this.y = position.y;

    _this.viewport = viewport;
    _this.content = content;

    _this.scrollModeEnum = {
      CLAMP: 0,
      BOUNCE: 1,
      INFINITY: 2
    };
    Object.freeze(_this.scrollModeEnum);

    _this.horizontalLimits = {
      min: 0,
      max: 0
    };

    _this.verticalLimits = {
      min: 0,
      max: 0
    };

    _this.selectedScrollMode = _this.scrollModeEnum[scrollMode.toUpperCase()] || _this.scrollModeEnum.CLAMP;

    _this.bounce = bounce;
    _this.friction = friction;
    _this.horizontal = horizontal;
    _this.vertical = vertical;
    _this.horizontalScrollbar = horizontalScrollbar;
    _this.verticalScrollbar = verticalScrollbar;
    _this.padding = padding;

    _this.pointerPosition = new _phaser.Point(0, 0);
    _this[setScrollviewSettings]();
    return _this;
  }

  /**
   * Set the scroll view settings.
   */


  _createClass(ScrollView, [{
    key: setScrollviewSettings,
    value: function value() {
      // Add the viewport and content to this group.
      this.add(this.viewport);
      this.add(this.content);

      // Save viewport width and height
      this.viewportWidth = this.viewport.width;
      this.viewportHeight = this.viewport.height;

      // Set the y position of the content
      this.content.x = 0;
      this.content.y = this.padding.y;

      // Set content mask
      this.content.mask = this.viewport;
      this.content.mask.dirty = true;

      // Give reference of the scroll view to the content
      this.content.scrollview = this;

      // Set input for the viewport
      this.viewport.inputEnabled = true;
      this.viewport.events.onInputDown.add(this[onInputDown], this);
      this.viewport.events.onInputUp.add(this[onInputUp], this);
      game.input.addMoveCallback(this[onInputMove], this);

      // Calculate bounds
      this[calculateNewBounds]();
    }

    /* --------------------------
       * INPUT
       -------------------------- */
    // region

    /**
     * Callback when the scroll view is moved.
     *
     * @param pointer Phaser.Pointer Pointer object of the input
     * @param x number X coordinate of the pointer
     * @param y number Y coordinate of the pointer
     */

  }, {
    key: onInputMove,
    value: function value(pointer, x, y) {
      if (!this.clicked) return;

      if (this.horizontal) {
        this.content.x += x - this.pointerPosition.x;
      }

      if (this.vertical) {
        this.content.y += y - this.pointerPosition.y;
      }

      this.pointerPosition.setTo(x, y);

      this.moveContent();
    }

    /**
     * Callback when the input is pressed.
     *
     * @param object * The object which is selected
     * @param event Phaser.Pointer Pointer object of the input
     */

  }, {
    key: onInputDown,
    value: function value(object, event) {
      this.clicked = true;

      this.pointerPosition.setTo(event.x, event.y);

      if (this.bounceTween) {
        this.bounceTween.stop();
      }
    }

    /**
     * Callback when the input is released.
     */

  }, {
    key: onInputUp,
    value: function value() {
      this.clicked = false;

      this.moveContent();
    }
    // endregion

    /**
     * Calculate the four bounds of the scroll view.
     */

  }, {
    key: calculateNewBounds,
    value: function value() {
      this.horizontalLimits.min = 0;
      this.horizontalLimits.max = Math.min(this.viewportWidth - this.content.width - this.padding.z, 0);

      this.verticalLimits.min = this.padding.y;
      this.verticalLimits.max = Math.max(this.content.height - this.viewportHeight + this.padding.y + this.padding.w, this.padding.y);
    }

    /**
     * Return the vertical limit if the limit is reached, else returns null.
     *
     * @returns number || null
     */

  }, {
    key: checkIfVerticalOOB,
    value: function value() {
      if (this.content.y > this.verticalLimits.min) {
        return this.verticalLimits.min;
      }if (this.content.y < -this.verticalLimits.max) {
        return -this.verticalLimits.max;
      }

      return null;
    }

    /**
     * Return the horizontal limit if the limit is reached, else returns null.
     *
     * @returns number || null
     */

  }, {
    key: checkIfHorizontalOOB,
    value: function value() {
      if (this.content.x > this.horizontalLimits.min) {
        return this.horizontalLimits.min;
      }if (this.content.x < this.horizontalLimits.max) {
        return this.horizontalLimits.max;
      }

      return null;
    }

    /**
     * Apply scroll mode if the limit is reached.
     */

  }, {
    key: 'moveContent',
    value: function moveContent() {
      var limitX = this[checkIfHorizontalOOB]();
      var limitY = this[checkIfVerticalOOB]();

      if (typeof limitX !== 'number' && typeof limitY !== 'number') {
        return;
      }

      switch (this.selectedScrollMode) {
        case this.scrollModeEnum.CLAMP:
          this[clamp](limitX, limitY);
          break;
        case this.scrollModeEnum.BOUNCE:
          if (this.clicked) break;

          this[bounceTween](limitX, limitY);
          break;
        case this.scrollModeEnum.INFINITY:
          break;
        default:
          console.warn(this.selectedScrollMode, 'is not a valid param!');
          break;
      }
    }

    /**
     * Apply bounce tween if the limit is reached.
     *
     * @param limitX number Horizontal limit.
     * @param limitY number Vertical limit.
     */

  }, {
    key: bounceTween,
    value: function value(limitX, limitY) {
      var newPosition = {};

      newPosition.x = typeof limitX === 'number' && this.horizontal ? limitX : this.content.x;
      newPosition.y = typeof limitY === 'number' && this.vertical ? limitY : this.content.y;

      this.bounceTween = game.make.tween(this.content).to(newPosition, 1000 * this.bounce || 1, _phaser.Phaser.Easing.Quadratic.Out, true);
    }
  }, {
    key: clamp,
    value: function value(limitX, limitY) {
      if (typeof limitX === 'number') {
        this.content.x = limitX;
      }

      if (typeof limitY === 'number') {
        this.content.y = limitY;
      }
    }
  }, {
    key: 'updateScrollbar',
    value: function updateScrollbar() {}
    // TODO change scroll bar


    /* --------------------------
       * PUBLIC METHODS
       -------------------------- */
    // region

    /**
     * Call this method when size of the content has been updated.
     * It will recalculate the boundaries.
     */

  }, {
    key: 'onGroupChange',
    value: function onGroupChange() {
      var resetPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (resetPosition) {
        this.content.x = 0;
        this.content.y = 0;
      }

      // this.viewportWidth = this.viewport.width;
      // this.viewportHeight = this.viewport.height;

      this[calculateNewBounds]();
      this.moveContent();
    }
    // endregion

  }, {
    key: 'startDrag',
    value: function startDrag(event) {
      this[onInputDown](null, event);
    }
  }, {
    key: 'stopDrag',
    value: function stopDrag() {
      this[onInputUp]();
    }
  }]);

  return ScrollView;
}(_phaser.Group);

exports.default = ScrollView;

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _MainUI = __webpack_require__(381);

var _MainUI2 = _interopRequireDefault(_MainUI);

var _GameUI = __webpack_require__(383);

var _GameUI2 = _interopRequireDefault(_GameUI);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _playerLevelBar = __webpack_require__(385);

var _playerLevelBar2 = _interopRequireDefault(_playerLevelBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This class creates UI for the whole game and has signals to switch between the states
var UIManager = function (_Phaser$Group) {
  _inherits(UIManager, _Phaser$Group);

  function UIManager(game) {
    _classCallCheck(this, UIManager);

    var _this = _possibleConstructorReturn(this, (UIManager.__proto__ || Object.getPrototypeOf(UIManager)).call(this, game));

    _this.fixedToCamera = true;

    _this.uiStates = [];
    _this.createXPBar();
    _this.createSimpleMainMenuUI();
    _this.createMainMenuUI();
    _this.createGameUI();
    _this.switchUI(_this.simpleMainGroup);

    // this.game.screenManager = new ScreenManager(game);
    _this.isScreenOpen = false;

    _this.game.goToGame.add(function () {
      _this.switchUI(_this.gameGroup);
    });
    _this.game.goToMain.add(function () {
      _this.switchUI(_this.mainGroup);
      _this.xpBar.visible = true;
    });
    _this.game.goToRevive.add(function () {
      _ScreenManager2.default.instance.openScreen('gameOver');
    });
    _this.game.setScore.add(function (score) {
      _this.gameGroup.setScoreText(score);
    });
    return _this;
  }

  _createClass(UIManager, [{
    key: 'createSimpleMainMenuUI',
    value: function createSimpleMainMenuUI() {
      // creates a group of UI elements for the main menu
      this.simpleMainGroup = new _MainUI2.default(this.game);
      this.simpleMainGroup.score.visible = false;
      this.simpleMainGroup.achievementButton.visible = false;
      this.simpleMainGroup.leaderboardButton.visible = false;
      this.simpleMainGroup.coinDisplay.visible = false;
      this.xpBar.visible = false;
      this.simpleMainGroup.shopButton.visible = false;

      this.uiStates.push(this.simpleMainGroup);
      this.add(this.simpleMainGroup);
    }
  }, {
    key: 'createMainMenuUI',
    value: function createMainMenuUI() {
      // creates a group of UI elements for the main menu
      this.mainGroup = new _MainUI2.default(this.game);
      this.uiStates.push(this.mainGroup);
      this.add(this.mainGroup);
    }
  }, {
    key: 'createGameUI',
    value: function createGameUI() {
      // creates a group of UI elements for in game
      this.gameGroup = new _GameUI2.default(this.game);
      this.uiStates.push(this.gameGroup);
      this.add(this.gameGroup);
    }
  }, {
    key: 'createXPBar',
    value: function createXPBar() {
      this.xpBar = new _playerLevelBar2.default();
    }
  }, {
    key: 'switchUI',
    value: function switchUI(group) {
      for (var i = 0; i < this.uiStates.length; i += 1) {
        if (this.uiStates[i] === group) {
          this.currenState = this.uiStates[i];
          this.uiStates[i].visible = true;
        } else {
          this.uiStates[i].visible = false;
        }
      }
    }
  }, {
    key: 'hideUI',
    value: function hideUI() {
      this.currenState.visible = false;
    }
  }, {
    key: 'showUI',
    value: function showUI() {
      this.currenState.visible = true;
    }
  }]);

  return UIManager;
}(_phaser2.default.Group);

exports.default = UIManager;

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Overlay = __webpack_require__(66);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _MainUIScore = __webpack_require__(382);

var _MainUIScore2 = _interopRequireDefault(_MainUIScore);

var _SettingsButton = __webpack_require__(83);

var _SettingsButton2 = _interopRequireDefault(_SettingsButton);

var _viewportManager = __webpack_require__(65);

var _viewportManager2 = _interopRequireDefault(_viewportManager);

var _backend = __webpack_require__(82);

var _backend2 = _interopRequireDefault(_backend);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameUI = function (_Phaser$Group) {
  _inherits(GameUI, _Phaser$Group);

  function GameUI(game) {
    _classCallCheck(this, GameUI);

    var _this = _possibleConstructorReturn(this, (GameUI.__proto__ || Object.getPrototypeOf(GameUI)).call(this, game));

    _this.game = game;

    // todo put this in settings
    _this.soundMuted = false;
    _this.musicMuted = false;
    _this.offset = 80;
    _this.isSettingsOpen = false;

    _this.startGameOverlay = new _Overlay2.default({
      alpha: 0
    });
    _this.add(_this.startGameOverlay);
    _this.startGameOverlay.events.onInputUp.add(function () {
      if (!_this.game.ui.isScreenOpen) {
        _this.settings.closeSettings();
        game.soundManager.playMusic('gameplay');
        game.soundManager.playSound('intro');
        _this.game.goToGame.dispatch();
        game.ui.xpBar.close();
      }
    });

    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 45);
    game.onResizeChange.add(_this.resize, _this);

    _this.add(_this.coinDisplay);
    _this.createScore();
    _this.createShopButton();
    _this.createLeaderboardButton();
    _this.createAchievementsButton();
    _this.createLogo();
    _this.createStartText();

    _this.settings = new _SettingsButton2.default();
    _this.add(_this.settings);

    _this.resize();

    GameInterface.gameReady();
    return _this;
  }

  _createClass(GameUI, [{
    key: 'createStartText',
    value: function createStartText() {
      this.startText = new _phaser.BitmapText(game, game.world.width / 2, game.world.height / 2 + 250, 'font', _LocalisationManager2.default.get('Tap to start'), 42);
      this.startText.anchor.setTo(0.5);

      this.add(this.startText);
      // this.startImage = new Sprite({
      //   asset: 'uiAtlas',
      //   frame: 'ui_cat_home.png',
      //   x: this.startText.x,
      //   y: this.startText.y - 170,
      //   anchorX: 0.40,
      //   anchorY: 0.5,
      // })
      // this.add(this.startImage);
      var textBobble = this.game.add.tween(this.startText.scale).to({ y: 0.8, x: 0.8 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ y: 1, x: 1 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false).loop(true);
      textBobble.start();

      // const imageBobble = this.game.add.tween(this.startImage.scale)
      //   .to({ y: 0.8, x: 0.8 }, 800, Phaser.Easing.Sinusoidal.InOut, false)
      //   .to({ y: 1, x: 1 }, 800, Phaser.Easing.Sinusoidal.InOut, false)
      //   .loop(true);
      // imageBobble.start();
    }
  }, {
    key: 'createShopButton',
    value: function createShopButton() {
      this.shopButton = new _FrameButton2.default({
        iconImage: 'ui_icon_sushi.png',
        x: this.offset,
        y: game.world.height - 200,
        width: 80,
        height: 80,
        cornerRadius: 1,
        iconSize: 0.6
      });
      this.shopButton.doOnClick = function () {
        _ScreenManager2.default.instance.openScreen('shop');
      };
      this.add(this.shopButton);
    }
  }, {
    key: 'createLeaderboardButton',
    value: function createLeaderboardButton() {
      this.leaderboardButton = new _FrameButton2.default({
        iconImage: 'ui_icon_achievements.png',
        x: this.offset,
        y: game.world.height - 310,
        width: 80,
        height: 80,
        cornerRadius: 1,
        iconSize: 0.6
      });
      this.leaderboardButton.doOnClick = function () {
        _ScreenManager2.default.instance.openScreen('leaderboard');
      };
      this.add(this.leaderboardButton);

      this.leaderboardButton.visible = _backend2.default.instance.isSupported();
    }
  }, {
    key: 'createAchievementsButton',
    value: function createAchievementsButton() {
      this.achievementButton = new _FrameButton2.default({
        iconImage: 'ui_leaderboard_icon.png',
        x: this.offset,
        y: game.world.height - 90,
        width: 80,
        height: 80,
        cornerRadius: 1,
        iconSize: 0.6
      });
      this.achievementButton.doOnClick = function () {
        _ScreenManager2.default.instance.openScreen('achievements');
      };
      this.add(this.achievementButton);
    }
  }, {
    key: 'createLogo',
    value: function createLogo() {
      this.logo = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'logo.png',
        x: game.width / 2,
        y: game.height / 4 + 50,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 0.9,
        scaleY: 0.9
      });

      this.add(this.logo);

      this.famobiLogo = new _Sprite2.default({
        asset: 'uiAtlas',
        frame: 'famobi-logo.png',
        x: game.width - 25,
        y: game.height - 25,
        anchorX: 1,
        anchorY: 1,
        scaleX: 0.25,
        scaleY: 0.25
      });

      this.famobiLogo.visible = true; // FamobiAPI.instance.hasFeature('copyright');
      this.famobiLogo.alpha = 0.5;
      this.add(this.famobiLogo);
    }
  }, {
    key: 'createScore',
    value: function createScore() {
      this.score = new _MainUIScore2.default(game.width / 2, game.height - 80);
      this.add(this.score);
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.logo.x = game.width / 2;
      this.logo.y = game.height / 4 + 50;
      this.startText.x = game.width / 2;
      this.startText.y = game.world.height / 2 + 250 * _viewportManager2.default.instance.zoomIn;

      this.logo.scale.setTo(_viewportManager2.default.instance.zoomIn);

      this.leaderboardButton.y = game.world.height - 310;
      this.shopButton.y = game.world.height - 200;
      this.achievementButton.y = game.world.height - 90;

      this.famobiLogo.x = game.width - 25;
      this.famobiLogo.y = game.height - 25;
    }
  }]);

  return GameUI;
}(_phaser2.default.Group);

exports.default = GameUI;

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _sprite = __webpack_require__(146);

var _sprite2 = _interopRequireDefault(_sprite);

var _text = __webpack_require__(145);

var _text2 = _interopRequireDefault(_text);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainUIScore = function (_Group) {
  _inherits(MainUIScore, _Group);

  function MainUIScore(x, y) {
    _classCallCheck(this, MainUIScore);

    var _this = _possibleConstructorReturn(this, (MainUIScore.__proto__ || Object.getPrototypeOf(MainUIScore)).call(this, game));

    _this.x = x;
    _this.y = y;

    _this.startScale = 0.45;
    _this.scale.setTo(_this.startScale);
    _this.score = 0;

    _this.createBanner();
    _this.createText();

    _this.getScore();

    game.totalScore.add(_this.setScore, _this);
    game.onResizeChange.add(_this.resize, _this);
    _this.resize();
    return _this;
  }

  _createClass(MainUIScore, [{
    key: 'createBanner',
    value: function createBanner() {
      var banner = new _sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_title_banner.png',
        anchorX: 0.5,
        anchorY: 0.5
      });

      this.add(banner);

      this.icon = new _sprite2.default({
        asset: 'uiAtlas',
        frame: 'ui_icon_achievements.png',
        x: -140,
        y: -50,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 1.5,
        scaleY: 1.5
      });
      this.add(this.icon);
    }
  }, {
    key: 'createText',
    value: function createText() {
      this.text = new _text2.default({
        anchorX: 0,
        anchorY: 0.5,
        y: -50,
        fontSize: 60,
        color: '#ffffff'
      });

      this.add(this.text);
    }
  }, {
    key: 'getScore',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.score = _storageManager2.default.instance.get('highscore');
                this.setScore(this.score);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getScore() {
        return _ref.apply(this, arguments);
      }

      return getScore;
    }()
  }, {
    key: 'setScore',
    value: function setScore(value) {
      _storageManager2.default.instance.set('highscore', value, true);

      if (value < this.score) {
        return;
      }

      window.GameInterface.sendScore(value);

      this.score = value;
      game.highscore = value;

      this.text.text = value;

      this.text.autoFit();
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = game.width / 2;
      this.y = game.world.height - 80;

      var scale = game.width / 900;

      if (scale < 1) {
        this.scale.setTo(scale * this.startScale);
      } else {
        this.scale.setTo(this.startScale);
      }
    }
  }]);

  return MainUIScore;
}(_phaser.Group);

exports.default = MainUIScore;

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Overlay = __webpack_require__(66);

var _Overlay2 = _interopRequireDefault(_Overlay);

var _FrameButton = __webpack_require__(35);

var _FrameButton2 = _interopRequireDefault(_FrameButton);

var _ScreenManager = __webpack_require__(32);

var _ScreenManager2 = _interopRequireDefault(_ScreenManager);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _CoinDisplay = __webpack_require__(61);

var _CoinDisplay2 = _interopRequireDefault(_CoinDisplay);

var _score = __webpack_require__(384);

var _score2 = _interopRequireDefault(_score);

var _AchievementNotifications = __webpack_require__(151);

var _AchievementNotifications2 = _interopRequireDefault(_AchievementNotifications);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameUI = function (_Phaser$Group) {
  _inherits(GameUI, _Phaser$Group);

  function GameUI(game) {
    _classCallCheck(this, GameUI);

    var _this = _possibleConstructorReturn(this, (GameUI.__proto__ || Object.getPrototypeOf(GameUI)).call(this, game));

    _this.clickGameOverlay = new _Overlay2.default({
      alpha: 0
    });
    _this.add(_this.clickGameOverlay);
    _this.clickGameOverlay.events.onInputDown.add(function () {
      game.switchDirection.dispatch();
    });

    _this.score = new _score2.default(game.width / 2, 180, 'font', 128);
    _this.add(_this.score);

    game.onResizeChange.add(_this.resize, _this);
    // this.score = new Text({
    //   text: '10000',
    //   x: this.game.width / 2,
    //   y: 30,
    //   fontSize: 45,
    //   color: '#FFFFFF',
    //   stroke: '#000000',
    //   strokeThickness: 3,
    // });
    // this.score.anchor.setTo(0.5, 0);
    // this.add(this.score);

    // this.scoreDescription = new Text({
    //   text: 'Score:',
    //   x: this.game.width / 2,
    //   y: 0,
    //   fontSize: 25,
    //   color: '#FFFFFF',
    //   stroke: '#000000',
    //   strokeThickness: 3,
    // });
    // this.scoreDescription.anchor.setTo(0.5, 0);
    // this.add(this.scoreDescription);

    _this.pauseButton = new _FrameButton2.default({
      iconImage: 'ui_pause_icon.png',
      x: 80,
      y: 18,
      inputEnabled: true,
      width: 70,
      height: 70,
      cornerRadius: 1,
      iconSize: 0.6,
      anchorX: 0,
      anchorY: 0
    });
    _this.pauseButton.doOnClick = function () {
      _ScreenManager2.default.instance.openScreen('pause');
    };
    _this.add(_this.pauseButton);

    _this.coinDisplay = new _CoinDisplay2.default(game.width - 80, 45);
    _this.add(_this.coinDisplay);

    _this.tutorialText = new _phaser.BitmapText(game, game.world.width / 2, game.world.height / 2 + 300, 'font', _LocalisationManager2.default.get('Tap to turn'), 42);
    _this.tutorialText.anchor.setTo(0.5);
    _this.tutorialText.visible = false;

    _this.add(_this.tutorialText);
    var textBobble = _this.game.add.tween(_this.tutorialText.scale).to({ y: 0.8, x: 0.8 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false).to({ y: 1, x: 1 }, 800, _phaser2.default.Easing.Sinusoidal.InOut, false).loop(true);
    textBobble.start();
    return _this;
  }

  _createClass(GameUI, [{
    key: 'setScoreText',
    value: function setScoreText(score) {
      // this.score.text = score;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.score.x = game.width / 2;
      this.tutorialText.x = game.world.width / 2;
    }
  }]);

  return GameUI;
}(_phaser2.default.Group);

exports.default = GameUI;

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Score = function (_BitmapText) {
  _inherits(Score, _BitmapText);

  function Score(x, y, font, size) {
    _classCallCheck(this, Score);

    var _this = _possibleConstructorReturn(this, (Score.__proto__ || Object.getPrototypeOf(Score)).call(this, game, x, y, font, '0', size));

    _this.anchor.setTo(0.5, 0.5);
    game.setScore.add(_this.setText, _this);
    return _this;
  }

  _createClass(Score, [{
    key: 'setText',
    value: function setText(text) {
      this.text = text;
    }
  }]);

  return Score;
}(_phaser.BitmapText);

exports.default = Score;

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite = __webpack_require__(10);

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _Text = __webpack_require__(13);

var _Text2 = _interopRequireDefault(_Text);

var _Frame = __webpack_require__(19);

var _Frame2 = _interopRequireDefault(_Frame);

var _famobiApi = __webpack_require__(39);

var _famobiApi2 = _interopRequireDefault(_famobiApi);

var _LocalisationManager = __webpack_require__(54);

var _LocalisationManager2 = _interopRequireDefault(_LocalisationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayerLevelBar = function (_Phaser$Group) {
  _inherits(PlayerLevelBar, _Phaser$Group);

  function PlayerLevelBar() {
    _classCallCheck(this, PlayerLevelBar);

    var _this = _possibleConstructorReturn(this, (PlayerLevelBar.__proto__ || Object.getPrototypeOf(PlayerLevelBar)).call(this, game));

    _this.contentGroup = new _phaser2.default.Group(game);
    _this.contentGroup.fixedToCamera = true;
    _this.add(_this.contentGroup);
    _this.levelInfo = game.cache.getJSON('playerProgressionInfo');
    _this.currentXP = _Inventory2.default.instance.experience;
    _this.createSprites();
    _this.createText();
    _this.setStandardValues();
    _this.createStandardAnimations();
    _this.setCurrentLevelValues();

    game.onResizeChange.add(_this.resize, _this);

    if (false) {
      var fKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.F);
      var oKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.O);
      var cKey = game.input.keyboard.addKey(_phaser2.default.KeyCode.C);
      fKey.onDown.add(function () {
        _this.onAddXP();
      });
      oKey.onDown.add(function () {
        _this.open();
      });
      cKey.onDown.add(function () {
        _this.close();
      });
    }

    _this.startWidth = _this.width;
    _this.startHeight = _this.height;

    _this.resize();
    return _this;
  }

  _createClass(PlayerLevelBar, [{
    key: 'createSprites',
    value: function createSprites() {
      this.levelBar = new _phaser2.default.Group(game);
      this.contentGroup.add(this.levelBar);

      this.levelBG = new _Frame2.default({
        x: -175,
        y: -5,
        width: 70,
        height: 70,
        key: 'bgFrame',
        cornerRadius: 0.4,
        color: 0x32374a
      });
      this.levelBar.add(this.levelBG);

      this.barBackground = new _Frame2.default({
        x: -165,
        y: 11,
        width: 370,
        height: 35,
        key: 'bgFrame',
        cornerRadius: 0.7,
        color: 0x32374a,
        anchorX: 0
      });
      this.levelBar.add(this.barBackground);

      this.levelBubble = new _Sprite2.default({
        x: -175,
        y: -5,
        scaleX: 0.3,
        scaleY: 0.3,
        anchorX: 0.5,
        anchorY: 0.5,
        asset: 'uiAtlas',
        frame: 'ui_ad_circle.png'
      });
      this.levelBar.add(this.levelBubble);

      this.timerBackground = new _Sprite2.default({
        x: -140,
        asset: 'uiAtlas',
        frame: 'ui_bar_continue_base.png'
      });

      this.levelBar.add(this.timerBackground);

      this.xpBar = new _Sprite2.default({
        x: this.timerBackground.x,
        scaleX: 0.5,
        asset: 'uiAtlas',
        frame: 'ui_achievement_progress.png'
      });
      this.levelBar.addChild(this.xpBar);
    }
  }, {
    key: 'createText',
    value: function createText() {
      this.playerTitle = new _Text2.default({
        text: _LocalisationManager2.default.get(this.levelInfo[0].levelTitle),
        x: -135,
        y: -38,
        color: 'White',
        stroke: 'Black',
        strokeThickness: 5
      });

      this.playerLevel = new _Text2.default({
        text: '101',
        x: -175,
        y: -6,
        fontSize: 25,
        color: 'White',
        stroke: 'Black',
        strokeThickness: 5,
        anchorX: 0.5,
        anchorY: 0.5,
        align: 'Center'
      });
      this.levelBar.add(this.playerLevel);
      this.levelBar.add(this.playerTitle);

      this.xpText = new _Text2.default({
        text: '...',
        x: 35,
        y: 12,
        fontSize: 16,
        color: 'White',
        stroke: 'Black',
        strokeThickness: 5,
        anchorX: 0.5,
        anchorY: 0.5,
        align: 'Center'
      });
      this.levelBar.add(this.xpText);
    }
  }, {
    key: 'setStandardValues',
    value: function setStandardValues() {
      this.standardX = game.width / 2 - 10;
      this.standardY = 50;
      this.upY = -100;

      this.standardTextY = -38;
      this.upTextY = -200;

      this.moveDownSpeed = 500;

      this.y = this.standardY;
      this.x = this.standardX;
      this.visible = true;

      this.fillSpeedLast = 1000;
      this.fillSpeedLevelUp = 600;
      this.fillSpeedMax = 2000;
    }
  }, {
    key: 'createStandardAnimations',
    value: function createStandardAnimations() {
      var _this2 = this;

      this.moveDownTween = game.add.tween(this).to({ y: this.standardY }, this.moveDownSpeed, _phaser2.default.Easing.Exponential.Out);
      this.moveUpTween = game.add.tween(this).to({ y: this.upY }, this.moveDownSpeed, _phaser2.default.Easing.Exponential.Out);
      this.moveUpTween.onComplete.add(function () {
        _this2.visible = false;
      });
      this.fillTween = this.game.add.tween(this.xpBar.scale).to({ x: 0 }, 1000);

      this.moveDownTextTween = game.add.tween(this.playerTitle).to({ y: this.standardTextY }, this.moveDownSpeed / 3, _phaser2.default.Easing.Exponential.Out);
      this.moveUpTextTween = game.add.tween(this.playerTitle).to({ y: this.upTextY }, this.moveDownSpeed / 3, _phaser2.default.Easing.Exponential.Out);
    }

    /**
     * Used at creation of this object.
     */

  }, {
    key: 'setCurrentLevelValues',
    value: function setCurrentLevelValues() {
      this.currentLevel = this.getLevelInfo(this.currentXP);
      this.nextLevel = this.getNextLevel();
      this.playerTitle.text = _LocalisationManager2.default.get(this.currentLevel.levelTitle);
      this.playerLevel.text = this.currentLevel.levelKey;
      this.xpBar.scale.x = this.ratioToNextLevel();
      this.xpText.text = this.getXPValue();
    }

    /**
     * Used when the bar is filled and the new level should be shown
     */

  }, {
    key: 'setNextLevelInformation',
    value: function setNextLevelInformation() {
      this.currentLevel = JSON.parse(JSON.stringify(this.nextLevel));
      this.playerLevel.text = this.currentLevel.levelKey;
      this.nextLevel = this.getNextLevel();
      var updateTextAnim = this.updateTextAnimation();
      updateTextAnim.start();
    }

    /**
     * Used when the game is over and new experience is gained
     */

  }, {
    key: 'onAddXP',
    value: function onAddXP() {
      var _this3 = this;

      this.open();
      this.currentXP = _Inventory2.default.instance.experience;
      var finalLevel = this.getLevelInfo(this.currentXP);
      _famobiApi2.default.instance.trackStats('level', finalLevel.levelKey);
      this.levelsGained = finalLevel.levelKey - this.currentLevel.levelKey;
      this.moveDownTween.onComplete.addOnce(function () {
        _this3.fillBar();
      });
    }
  }, {
    key: 'fillBar',
    value: function fillBar() {
      var ratio = this.ratioToNextLevel();
      this.fill(ratio);
    }
  }, {
    key: 'getNextLevel',
    value: function getNextLevel() {
      if (typeof this.levelInfo[this.currentLevel.levelKey] !== 'undefined') {
        return this.levelInfo[this.currentLevel.levelKey];
      }
      this.maxLevel = true;
      return this.currentLevel;
    }
  }, {
    key: 'open',
    value: function open() {
      game.world.addChild(this);
      this.visible = true;
      this.y = this.upY;
      this.moveDownTween.start();
    }
  }, {
    key: 'close',
    value: function close() {
      this.moveUpTween.start();
    }
  }, {
    key: 'fill',
    value: function fill(ratio) {
      var _this4 = this;

      var fillSpeed = 1000;
      if (ratio >= 1) {
        this.fillTween.onComplete.addOnce(function () {
          _this4.levelUp();
        });
        var totalFillSpeed = this.fillSpeedLevelUp * this.levelsGained;
        fillSpeed = totalFillSpeed > this.fillSpeedMax ? this.fillSpeedMax / this.levelsGained : totalFillSpeed / this.levelsGained;
      } else {
        this.fillTween.onComplete.addOnce(function () {
          _this4.onFillComplete();
        });
        fillSpeed = this.fillSpeedLast;
      }
      var fillAnim = this.fillAnimation(ratio, fillSpeed);
      fillAnim.start();
    }
  }, {
    key: 'fillAnimation',
    value: function fillAnimation(scale, speed) {
      var _this5 = this;

      this.fillTween.isPaused = this.fillTween.isRunning = false;
      this.fillTween.timeline.length = 0; // removes the old targets

      this.fillTween.to({ x: scale }, speed);
      this.fillTween.onComplete.add(function () {
        _this5.xpText.text = _this5.getXPValue();
      });
      return this.fillTween;
    }
  }, {
    key: 'updateTextAnimation',
    value: function updateTextAnimation() {
      var _this6 = this;

      this.moveUpTextTween.isPaused = this.moveUpTextTween.isRunning = false;
      this.moveUpTextTween.timeline.length = 0; // removes the old targets
      this.moveDownTextTween.isPaused = this.moveDownTextTween.isRunning = false;
      this.moveDownTextTween.timeline.length = 0; // removes the old targets

      var fillSpeed = this.fillTween.timeline[0].duration;

      this.moveUpTextTween.to({ y: this.upTextY }, fillSpeed / 4, _phaser2.default.Easing.Exponential.Out);
      this.moveDownTextTween.to({ y: this.standardTextY }, fillSpeed / 4, _phaser2.default.Easing.Exponential.Out);

      this.moveUpTextTween.onComplete.addOnce(function () {
        _this6.playerTitle.text = _LocalisationManager2.default.get(_this6.currentLevel.levelTitle);
        _this6.moveDownTextTween.start();
      });
      return this.moveUpTextTween;
    }
  }, {
    key: 'moveDownText',
    value: function moveDownText() {}
  }, {
    key: 'moveUpText',
    value: function moveUpText() {}
  }, {
    key: 'levelUp',
    value: function levelUp() {
      this.setNextLevelInformation();
      this.xpBar.scale.x = 0;
      this.fillBar();
    }
  }, {
    key: 'onFillComplete',
    value: function onFillComplete() {
      // console.log('Filled complete!')
    }
  }, {
    key: 'getLevelInfo',
    value: function getLevelInfo(xpAmount) {
      this.higherIndex = this.levelInfo.findIndex(function (e) {
        return e.xpCumulative > xpAmount;
      });
      var correctIndex = this.higherIndex >= 0 ? this.higherIndex - 1 : this.levelInfo.length - 1;
      return this.levelInfo[correctIndex];
    }
  }, {
    key: 'ratioToNextLevel',
    value: function ratioToNextLevel() {
      return Math.min(this.currentXP / this.nextLevel.xpCumulative, 1);
    }
  }, {
    key: 'getXPValue',
    value: function getXPValue() {
      var sub = this.levelInfo[this.currentLevel.levelKey - 1].xpCumulative;
      return this.currentXP - sub + ' / ' + this.nextLevel.xpPerLevel;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = game.width / 2 - 10;

      var scale = game.width / 900;

      if (scale < 1) {
        this.contentGroup.scale.setTo(scale);
      } else {
        this.contentGroup.scale.setTo(1);
      }
      //
      // const idealWidth = game.width / 1.6;
      // const resizeValue = idealWidth / this.startWidth;
      // console.log(resizeValue);
      // this.width = this.startWidth * resizeValue;
      // this.height = this.startHeight * resizeValue;
    }
  }]);

  return PlayerLevelBar;
}(_phaser2.default.Group);

exports.default = PlayerLevelBar;

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _BackgroundObject = __webpack_require__(152);

var _BackgroundObject2 = _interopRequireDefault(_BackgroundObject);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Controls the color of the background and the images that spawn/move on it
// Use changetheme to set the theme of the background, in case the switch needs to happen
// instantly, use hardSwitch
var BackgroundManager = function (_Phaser$Group) {
  _inherits(BackgroundManager, _Phaser$Group);

  function BackgroundManager(game) {
    _classCallCheck(this, BackgroundManager);

    var _this = _possibleConstructorReturn(this, (BackgroundManager.__proto__ || Object.getPrototypeOf(BackgroundManager)).call(this, game));

    _this.fixedToCamera = true;
    _this.objectAmount = 3;
    _this.objects = [];
    _this.backgrounds = [];
    _this.colors = [{ color1: '#ff887c', color2: '#ffc2af' }, { color1: '#FFE66B', color2: '#FFEBBD' }, { color1: '#FF4A4A', color2: '#FF9986' }, { color1: '#C68ED1', color2: '#F6E2FA' }, { color1: '#36afff', color2: '#a6fff8' }, { color1: '#8fffaf', color2: '#d7fff5' }, { color1: '#ffa84a', color2: '#ffd486' }, { color1: '#7d7d7d', color2: '#e1e5e9' }];

    for (var i = 0; i < _this.colors.length; i += 1) {
      var background = _this.createGradient(_this.colors[i].color1, _this.colors[i].color2);
      background.visible = false;
      _this.backgrounds.push(background);
    }
    _this.switchTheme(0);
    _this.game.goToGame.add(function () {});
    return _this;
  }

  _createClass(BackgroundManager, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'createGradient',
    value: function createGradient(color1, color2) {
      var x = 0;
      var y = -50;
      var height = 1280 + 100;
      var myBitmap = game.add.bitmapData(game.world.width, height);
      var grd = myBitmap.context.createLinearGradient(0, 0, 0, height);
      grd.addColorStop(0, color2);
      grd.addColorStop(1, color1);
      myBitmap.context.fillStyle = grd;
      myBitmap.context.fillRect(0, 0, game.width, height);
      var background = game.add.sprite(x, y, myBitmap);
      background.width = _orientation2.default.MAX_GAME_WIDTH;
      this.add(background);
      return background;
    }
  }, {
    key: 'switchTheme',
    value: function switchTheme(theme) {
      var hardSwitch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var oldBackground = this.background;
      var newBackground = this.backgrounds[theme];

      if (hardSwitch) {
        if (this.tAlpha && this.tAlpha.isRunning) {
          this.tAlpha.stop();
        }
      }

      if (oldBackground === newBackground) {
        return;
      }

      newBackground.alpha = 1;
      newBackground.visible = true;

      if (oldBackground) {
        if (!hardSwitch) {
          oldBackground.bringToTop();
          this.tAlpha = this.game.add.tween(oldBackground).to({ alpha: 0 }, 10000, _phaser2.default.Easing.Default, false);
          this.tAlpha.onComplete.add(function () {
            oldBackground.visible = false;
          });
          this.tAlpha.start();
        } else {
          oldBackground.visible = false;
        }
      }

      this.background = newBackground;
    }
  }]);

  return BackgroundManager;
}(_phaser2.default.Group);

exports.default = BackgroundManager;

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Store all the signals in this class so the Game.js class doesn't get overflooded
var Signals = function () {
  function Signals() {
    _classCallCheck(this, Signals);
  }

  _createClass(Signals, null, [{
    key: 'addSignals',
    value: function addSignals() {
      // Player
      game.switchDirection = new _phaser2.default.Signal();
      game.addScore = new _phaser2.default.Signal();
      game.updateCoins = new _phaser2.default.Signal();
      game.revivePlayer = new _phaser2.default.Signal();
      game.pickRandomSkin = new _phaser2.default.Signal();
      game.totalScore = new _phaser2.default.Signal();
      // States
      game.goToGame = new _phaser2.default.Signal();
      game.goToMain = new _phaser2.default.Signal();
      game.goToRevive = new _phaser2.default.Signal();

      // UI
      game.setScore = new _phaser2.default.Signal();

      // Achievements
      game.achievementAttained = new _phaser2.default.Signal();
    }
  }]);

  return Signals;
}();

exports.default = Signals;

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _ChunkGenerator = __webpack_require__(389);

var _ChunkGenerator2 = _interopRequireDefault(_ChunkGenerator);

var _storageManager = __webpack_require__(18);

var _storageManager2 = _interopRequireDefault(_storageManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Level generation
 * @description This class handles level and chunkData generation
 * by default it generates the starting platform and a random chunkData and places it in the chunkList
 *
 * @author Aaron Ligthart <aaron@cloudgames.com>
 * @version 2.0 08/23/18
 * */

var LevelGenerator = function (_Phaser$Group) {
  _inherits(LevelGenerator, _Phaser$Group);

  function LevelGenerator(game, tileList) {
    _classCallCheck(this, LevelGenerator);

    var _this = _possibleConstructorReturn(this, (LevelGenerator.__proto__ || Object.getPrototypeOf(LevelGenerator)).call(this, game));

    _this.game = game;
    _this.game.levelGenerator = _this;
    _this.chunkList = tileList;
    _this.basicChunkList = [];
    _this.easyChunkList = [];
    _this.mediumChunkList = [];
    _this.hardChunkList = [];
    _this.difficultyChances = game.cache.getJSON('chunkDifficultyChances.json');

    // The current theme's of the game.
    // add a string to the list below, and specify the tiles in Tile.js
    _this.themeList = ['pink', 'yellow', 'red', 'purple', 'blue', 'green', 'orange', 'gray'];
    _this.themeLength = 4;
    _this.resetTheme();

    _this.chunkGenerator = new _ChunkGenerator2.default(_this.game, _this.chunkList);

    _this.fillChunkLists();
    _this.createNewLevel();
    return _this;
  }

  _createClass(LevelGenerator, [{
    key: 'buildChunk',
    value: function buildChunk() {
      var chunk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNextChunk();
      var instant = arguments[1];

      this.setTheme(this.chunkCounter);
      var offset = this.getChunkDimensions(chunk.name);
      this.chunkList.push(this.chunkGenerator.drawChunk(chunk.name, offset, instant));
      this.chunkList[this.chunkList.length - 1].name = chunk.name;
      this.chunkList[this.chunkList.length - 1].difficulty = chunk.difficulty;
      this.chunkCounter += 1;
    }
  }, {
    key: 'getNextChunk',
    value: function getNextChunk() {
      var difficultyIncrease = 6;
      var currentDifficulty = Math.floor(this.chunkCounter / difficultyIncrease);
      if (currentDifficulty > this.difficultyChances.length - 1) currentDifficulty = this.difficultyChances.length - 1;
      var basicChance = this.difficultyChances[currentDifficulty].basic;
      var easyChance = this.difficultyChances[currentDifficulty].easy;
      var mediumChance = this.difficultyChances[currentDifficulty].medium;

      var rnd = game.rnd.between(0, 100);
      if (rnd <= basicChance) {
        return { name: game.rnd.pick(this.basicChunkList), difficulty: 'basic' };
      }if (rnd <= basicChance + easyChance) {
        return { name: game.rnd.pick(this.easyChunkList), difficulty: 'easy' };
      }if (rnd <= basicChance + easyChance + mediumChance) {
        return { name: game.rnd.pick(this.mediumChunkList), difficulty: 'medium' };
      }
      return { name: game.rnd.pick(this.hardChunkList), difficulty: 'hard' };
    }

    // gets the height of a chunkData and applies that to the totalOffset for chunkData placement

  }, {
    key: 'getChunkDimensions',
    value: function getChunkDimensions(chunk) {
      var chunkData = this.game.cache.getJSON(chunk);
      var offset = -(chunkData.height - 1) * chunkData.tileheight;
      this.totalOffset += offset;
      return this.totalOffset;
    }
  }, {
    key: 'deleteChunk',
    value: function deleteChunk() {
      var chunk = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var buildNewChunk = arguments[1];

      for (var i = 0; i < this.chunkList[chunk].tileList.length; i += 1) {
        if (this.chunkList[chunk].tileList[i] !== '') {
          if (this.chunkList[chunk].tileList[i].name === 'backgroundObject') {
            game.backgroundObjectPool.returnObject(this.chunkList[chunk].tileList[i]);
          } else {
            this.chunkList[chunk].tileList[i].reset();
            game.tileObjectPool.returnObject(this.chunkList[chunk].tileList[i]);
          }
        }
      }
      for (var _i = 0; _i < this.chunkList[chunk].interactableList.length; _i += 1) {
        this.chunkList[chunk].interactableList[_i].removeObject();
      }
      this.chunkList.splice(chunk, 1);
      if (buildNewChunk) {
        game.time.events.add(1, this.buildChunk, this);
      }
    }
  }, {
    key: 'createNewLevel',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i, highscore;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.resetTheme();
                this.totalOffset = 0;
                for (i = this.chunkList.length - 1; i >= 0; i -= 1) {
                  this.deleteChunk(i, false, true);
                }

                highscore = _storageManager2.default.instance.get('highscore');

                this.buildChunk({ name: 'chunk_spawn', difficulty: 'spawn' }, true);
                if (!highscore || highscore < 50) {
                  this.buildChunk({ name: 'chunk_ftu', difficulty: 'ftu' }, true);
                } else {
                  this.buildChunk(undefined, true);
                }
                this.buildChunk(undefined, true);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createNewLevel() {
        return _ref.apply(this, arguments);
      }

      return createNewLevel;
    }()
  }, {
    key: 'setTheme',
    value: function setTheme(counter) {
      if (counter % this.themeLength === 0 && counter !== 0) {
        this.currentThemeID += 1;
        if (this.currentThemeID > this.themeList.length - 1) {
          this.currentThemeID = 0;
        }
        this.currentTheme = this.themeList[this.currentThemeID];
        game.backgroundManager.switchTheme(this.currentThemeID);
      }
    }
  }, {
    key: 'resetTheme',
    value: function resetTheme() {
      this.currentThemeID = 0;
      this.chunkCounter = 0;
      this.currentTheme = this.themeList[this.currentThemeID];
      game.backgroundManager.switchTheme(this.currentThemeID, true);
    }
  }, {
    key: 'fillChunkLists',
    value: function fillChunkLists() {
      for (var i = 0; i < game.availableChunks.length; i += 1) {
        var chunkData = this.game.cache.getJSON(game.availableChunks[i]);
        switch (chunkData.properties[0].value) {
          case 0:
            this.basicChunkList.push(game.availableChunks[i]);
            break;
          case 1:
            this.easyChunkList.push(game.availableChunks[i]);
            break;
          case 2:
            this.mediumChunkList.push(game.availableChunks[i]);
            break;
          case 3:
            this.hardChunkList.push(game.availableChunks[i]);
            break;
          default:
            break;
        }
      }
    }
  }]);

  return LevelGenerator;
}(_phaser2.default.Group);

exports.default = LevelGenerator;

/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(59);

var _Teleporter = __webpack_require__(153);

var _Teleporter2 = _interopRequireDefault(_Teleporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * TILED isometric tilemap generator
 * @description since phaser2 doesn't support isometric tile orientation this class has been made to
 * read ortogonal map data and draw the tileList in an isometric way
 * you can generate a chunkData by using drawChunk and providing it with the Tiled Json data
 *
 * @author Aaron Ligthart <aaron@cloudgames.com>
 * @version 2.0 08/23/18
 * */

var ChunkGenerator = function (_Phaser$Group) {
  _inherits(ChunkGenerator, _Phaser$Group);

  function ChunkGenerator(game, chunkList, interactables) {
    _classCallCheck(this, ChunkGenerator);

    var _this = _possibleConstructorReturn(this, (ChunkGenerator.__proto__ || Object.getPrototypeOf(ChunkGenerator)).call(this, game));

    _this.chunkList = chunkList;
    _this.tileWidth = 64;
    _this.tileHeight = 64;
    _this.tileData = _this.game.cache.getJSON('tileData');
    return _this;
  }

  _createClass(ChunkGenerator, [{
    key: 'drawChunk',
    value: function drawChunk(chunkName, offset, instant) {
      var jsontilemap = game.cache.getJSON(chunkName);
      var chunk = {};
      chunk.tileList = [];
      chunk.interactableList = [];
      var chunkData = jsontilemap;
      chunk.chunkName = chunkName.replace('.json', '');
      chunkData.collisionLayer = this.getLayer(chunkData, 'collisionLayer');
      this.drawLayer(chunk, chunkData.collisionLayer, offset, instant);

      return chunk;
    }
  }, {
    key: 'getLayer',
    value: function getLayer(chunkData, layerName) {
      for (var i = 0; i < chunkData.layers.length; i += 1) {
        if (chunkData.layers[i].name === layerName) {
          return chunkData.layers[i];
        }
      }
      return console.error('error 404: layer: ', layerName, 'does not exist in chunkData: ', chunkData);
    }
  }, {
    key: 'drawLayer',
    value: function drawLayer(chunk, layerData, offset) {
      var _this2 = this;

      var instant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      this.gridWidth = layerData.width;
      this.gridheight = layerData.height;
      var tileID = layerData.data.length - 1;

      if (!instant) {
        var number = 0;

        var _loop = function _loop(row) {
          number += 1;
          game.time.events.add(50 * number, function () {
            for (var column = layerData.data.length; column > layerData.data.length - _this2.gridheight; column -= 1) {
              var x = (layerData.data.length - _this2.gridWidth - column) * -_this2.tileWidth + offset;
              var y = (layerData.data.length - _this2.gridWidth - row) * -_this2.tileHeight + offset;
              var tileType = layerData.data[tileID];

              tileID -= 1;
              var tileFrame = _this2.alternateTileFrame(row, column);
              if (tileType >= 8 && tileType <= 12) {
                var backgroundObject = _this2.drawBackgroundObject(tileType, x, y);
                backgroundObject.changeTexture(tileType);
                chunk.tileList.push(backgroundObject);
              } else {
                var tile = _this2.drawTile(tileType, x, y);

                if (tile) {
                  if (tile.containsInteractable) {
                    var interactable = _this2.addInteractable(tile);
                    chunk.interactableList.push(interactable);
                  }
                  tile.changeTexture(tileFrame);
                  chunk.tileList.push(tile);
                } else {
                  chunk.tileList.push('');
                }
              }
            }
          }, _this2);
        };

        for (var row = layerData.data.length; row > layerData.data.length - this.gridWidth; row -= 1) {
          _loop(row);
        }
      } else {
        for (var row = layerData.data.length; row > layerData.data.length - this.gridWidth; row -= 1) {
          for (var column = layerData.data.length; column > layerData.data.length - this.gridheight; column -= 1) {
            var x = (layerData.data.length - this.gridWidth - column) * -this.tileWidth + offset;
            var y = (layerData.data.length - this.gridWidth - row) * -this.tileHeight + offset;
            var tileType = layerData.data[tileID];
            tileID -= 1;
            var tileFrame = this.alternateTileFrame(row, column);
            if (tileType >= 8 && tileType < 13) {
              var backgroundObject = this.drawBackgroundObject(tileType, x, y);
              backgroundObject.changeTexture(tileType);
              chunk.tileList.push(backgroundObject);
            } else {
              var tile = this.drawTile(tileType, x, y);

              if (tile) {
                if (tile.containsInteractable) {
                  var interactable = this.addInteractable(tile);
                  chunk.interactableList.push(interactable);
                }
                tile.changeTexture(tileFrame);
                chunk.tileList.push(tile);
              } else {
                chunk.tileList.push('');
              }
            }
          }
        }
      }
    }
  }, {
    key: 'drawTile',
    value: function drawTile(type, x, y) {
      var typeID = type;
      // If the data in the array is below a one, don't draw the tile.
      if (typeID <= 0 || typeID > this.tileData.length) {
        return;
      }
      var isoPosition = (0, _utils.cartesianToIsometric)(x, y);

      var tile = this.game.tileObjectPool.getObject(isoPosition.x, isoPosition.y);

      this.game.tiles.add(tile);
      this.game.tiles.sendToBack(tile);

      tile.typeID = typeID;

      tile.typeName = this.tileData[typeID].type;
      if (this.tileData[typeID].teleportNumber) {
        tile.teleportNumber = this.tileData[typeID].teleportNumber;
        tile.typeName = this.tileData[typeID].type + '_' + tile.teleportNumber;
      }
      tile.containsInteractable = this.tileData[typeID].containsInteractable;
      return tile;
    }
  }, {
    key: 'drawBackgroundObject',
    value: function drawBackgroundObject(type, x, y) {
      var typeID = type;
      var isoPosition = (0, _utils.cartesianToIsometric)(x, y);

      var backgroundObject = this.game.backgroundObjectPool.getObject(isoPosition.x, isoPosition.y);
      this.game.tiles.add(backgroundObject);
      this.game.tiles.sendToBack(backgroundObject);

      backgroundObject.typeID = typeID;
      backgroundObject.typeName = this.tileData[typeID].type;
      backgroundObject.containsInteractable = this.tileData[typeID].containsInteractable;
      return backgroundObject;
    }
  }, {
    key: 'addInteractable',
    value: function addInteractable(tile) {
      this.tileName = tile.typeName.split('_');
      switch (this.tileName[0]) {
        case 'teleporterIn':
          var teleporterIn = this.game.teleporterObjectPool.getObject(tile.x, tile.y);
          teleporterIn.teleporterType = 0;
          teleporterIn.teleporterNumber = '_' + this.tileName[1];
          teleporterIn.createAnimation();
          return teleporterIn;
        case 'teleporterOut':
          var teleporterOut = this.game.teleporterObjectPool.getObject(tile.x, tile.y);
          teleporterOut.teleporterType = 1;
          teleporterOut.teleporterNumber = '_' + this.tileName[1];
          teleporterOut.createAnimation();
          return teleporterOut;
        case 'coin':
          return this.game.coinObjectPool.getObject(tile.x, tile.y);
        default:
          console.warn("Case not found put up coin instead");
          return this.game.coinObjectPool.getObject(tile.x, tile.y);
      }
    }
  }, {
    key: 'alternateTileFrame',
    value: function alternateTileFrame(row, column) {
      return (row % 2 + column % 2) % 2 + 1;
    }
  }]);

  return ChunkGenerator;
}(_phaser2.default.Group);

exports.default = ChunkGenerator;

/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(1);

var _Interactable2 = __webpack_require__(154);

var _Interactable3 = _interopRequireDefault(_Interactable2);

var _Inventory = __webpack_require__(52);

var _Inventory2 = _interopRequireDefault(_Inventory);

var _AchievementSystem = __webpack_require__(53);

var _AchievementSystem2 = _interopRequireDefault(_AchievementSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Coin interactable gives the player coins
var Coin = function (_Interactable) {
  _inherits(Coin, _Interactable);

  function Coin(game, x, y) {
    _classCallCheck(this, Coin);

    var _this = _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, game, x, y, 'coin'));

    _this.collisionRadius = 1;
    _this.scale.set(0.3, 0.3);
    _this.name = 'coin';
    _this.createFloatingText('+1', '#ffb30d', '#dc9316');
    return _this;
  }

  _createClass(Coin, [{
    key: 'onCollision',
    value: function onCollision(index) {
      this.game.soundManager.playSound('coin');
      _get(Coin.prototype.__proto__ || Object.getPrototypeOf(Coin.prototype), 'onCollision', this).call(this, index);
      _Inventory2.default.instance.addToType('coins', 1);
      this.start();
      this.removeObject();
      game.player.currentGameCoins += 1;
      _AchievementSystem2.default.instance.incrementAchievementData('coins', game.player.currentGameCoins);
    }
  }, {
    key: 'removeObject',
    value: function removeObject() {
      game.coinObjectPool.returnObject(this);
    }
  }, {
    key: 'setOffset',
    value: function setOffset() {
      this.yOffset = -80;
    }
  }, {
    key: 'createShadow',
    value: function createShadow() {
      // No shadow
    }
  }, {
    key: 'createAnimation',
    value: function createAnimation() {
      this.sprite.animations.add('spin');
      this.sprite.animations.play('spin', 12, true);
    }
  }, {
    key: 'createFloatingText',
    value: function createFloatingText(text, color, stroke) {
      var duration = 1000;

      this.floatingText = new _phaser.BitmapText(game, this.x, this.y, 'font', text, 30);
      this.floatingText.anchor.setTo(0.5);
      this.floatingText.visible = false;
      this.alphaTween = this.game.add.tween(this.floatingText).to({ alpha: 0 }, duration, Phaser.Easing.Default, false);

      game.add.existing(this.floatingText);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.floatingText.visible = true;
      this.alpha = 1;
      this.floatingText.x = this.x;
      this.floatingText.y = this.y;

      this.alphaTween.start();

      var duration = 1000;

      this.moveTween = this.game.add.tween(this.floatingText).to({ y: "-150" }, duration, Phaser.Easing.Default, true);
      this.moveTween.onComplete.add(function () {
        _this2.floatingText.visible = false;
      });

      game.world.bringToTop(this.floatingText);
    }
  }]);

  return Coin;
}(_Interactable3.default);

exports.default = Coin;

/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tile = function (_Phaser$Image) {
  _inherits(Tile, _Phaser$Image);

  function Tile(game, x, y, key, frame) {
    _classCallCheck(this, Tile);

    var _this = _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, game, x, y, 'tileAtlas', frame));

    _this.x = x;
    _this.y = y;
    _this.anchor.x = 0.646;
    _this.anchor.y = 0.209;
    _this.visible = true;
    _this.containsInteractable = false;
    _this.tileData = _this.game.cache.getJSON('tileData');
    _this.falling = false;
    _this.name = 'tile';
    return _this;
  }

  _createClass(Tile, [{
    key: 'changeTexture',
    value: function changeTexture(frame) {
      var theme = this.game.levelGenerator.currentTheme;
      if (frame === undefined) {
        frame = 1;
      }
      var tileType = this.tileData[this.typeID].tileBase;
      if (tileType === 'teleport') {
        this.frameName = 't_teleport.png';
      } else {
        this.frameName = 't_' + theme + '_' + (tileType + (tileType === 'basic' ? '_' + ((frame < 10 ? '0' : '') + frame) : '')) + '.png';
      }
    }
  }, {
    key: 'doFall',
    value: function doFall() {
      this.fallTween = this.game.add.tween(this.scale).to({
        y: 0, x: 0
      }, 400, 'Linear', false, 0, 0, false);

      this.fallTween.start();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.scale.setTo(1, 1);
    }
  }]);

  return Tile;
}(_phaser2.default.Image);

exports.default = Tile;

/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _Sprite2 = __webpack_require__(10);

var _Sprite3 = _interopRequireDefault(_Sprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RevivePlatform = function (_Sprite) {
  _inherits(RevivePlatform, _Sprite);

  function RevivePlatform() {
    _classCallCheck(this, RevivePlatform);

    var _this = _possibleConstructorReturn(this, (RevivePlatform.__proto__ || Object.getPrototypeOf(RevivePlatform)).call(this, {
      asset: 'tileAtlas',
      frame: 'revive_runup.png',
      anchorX: 0.75,
      anchorY: 0.75
    }));

    _this.visible = false;

    _this.tShrink = game.add.tween(_this.scale).to({ y: 0, x: 0 }, 400, _phaser2.default.Easing.Cubic.Out, false);
    return _this;
  }

  _createClass(RevivePlatform, [{
    key: 'placePlatform',
    value: function placePlatform(x, y, goLeft) {
      this.visible = true;
      this.scale.set(1, 1);
      this.x = x;
      this.y = y;

      this.scale.x = goLeft ? 1 : -1;
    }
  }, {
    key: 'returnPlatform',
    value: function returnPlatform() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (animate) {
        this.tShrink.start();
      } else {
        this.visible = false;
      }
    }
  }]);

  return RevivePlatform;
}(_Sprite3.default);

exports.default = RevivePlatform;

/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

var _orientation = __webpack_require__(51);

var _orientation2 = _interopRequireDefault(_orientation);

var _utils = __webpack_require__(59);

var _viewportManager = __webpack_require__(65);

var _viewportManager2 = _interopRequireDefault(_viewportManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Loading state for the game, put your images in this class
var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "init",
    value: function init() {
      this.stage.backgroundColor = '#ffc2af';

      _viewportManager2.default.instance.initialize();
    }
  }, {
    key: "preload",
    value: function preload() {
      this.loadJson();
      this.load.onLoadComplete.addOnce(this.loadComplete, this);

      _viewportManager2.default.instance.resizeGame();
    }
  }, {
    key: "loadJson",
    value: function loadJson() {
      this.game.load.json('chunk_list', 'assets/values/chunk_list.json');
      this.game.load.image('logo', 'assets/images/logo.png');
    }
  }, {
    key: "loadComplete",
    value: function loadComplete() {
      var _this2 = this;

      setTimeout(function () {
        _this2.startGame();
      }, 100);
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.state.start('Boot');
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(1);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set the settings for the game
exports.default = {
  width: 500,
  height: 1280,
  parent: 'gameWrapper',
  scaleMode: _phaser2.default.ScaleManager.SHOW_ALL,
  renderer: _phaser2.default.CANVAS,
  fullScreenScaleMode: _phaser2.default.ScaleManager.SHOW_ALL,
  multiTexture: true,
  transparent: false,
  antialias: false,
  enableDebug: false,
  preserveDrawingBuffer: true
};

/***/ })
],[155]);
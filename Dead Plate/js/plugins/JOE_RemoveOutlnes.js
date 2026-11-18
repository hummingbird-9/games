//=============================================================================
// Joseph Develops Plugins - Remove Outlines
// YEP_X_CriticalControl.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.00 
 * @author Joseph 'Develops' Abraham
 *
 * 
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin remove outlines from your RPG Maker MV game. It's not perfect
 * many prefer the look to the vanilla font look. Try it and see.
 *
 * @plugindesc Removes Outlines from RPG Maker MV. 
 * Contact me on Twitter: @JosephDevelops
 */


//BATTLE HUD STUFF

(function() {



Window_BattleActor.prototype.lineHeight = function() {
    return 45;
};



Window_BattleActor.prototype.drawAllItems = function() {
    return 'void';
};


//WINDOW BASE FONT OUTLINES

'use strict';

var _Window_Base_ResetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_ResetFontSettings.call( this );
    this.contents.outlineWidth = 0;





    //this.contents.fontSize -= 6;

};




})();
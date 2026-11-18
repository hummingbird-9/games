//============================================================================
// Eli_MoveChoices.js
//============================================================================

/*:
@plugindesc ♦5.0.0♦ Change the position of the Choice Window.
@author Hakuen Studio

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

The plugin offers the following:
● Show/Move the window to any position using easing animations!
● Put a delay on frames to allow confirmation of a choice as soon as the 
window opens.

============================================================================
How to use
============================================================================

♦ Use the plugin commands before the show choice command ♦

ChoiceInitialPos Off-ScreenX Off-ScreenY EaseName EaseType Duration
ChoiceTargetPos AlignX AlignY OffsetX OffsetY

● OffScreenX/Y and AlignX/Y - Replace them with one of the following:
● X - None | left | center | right
● Y - None | bottom | center | top
(NOT case sensitive)

● EaseName - Replace with one of the following:
(NOT case sensitive)
• Linear
• Quad
• Cubic
• Quart
• Quint
• Sine
• Expo
• Circ
• Back
• Bounce

● EaseType - Replace with one of the following:
(NOT case sensitive)
• In
• Out
• InOut
• OutIn

● Duration - A number. (frames) If not set, it will be automatically 1.
● OffsetX & OffsetY - Replace with a number. If they are not set, they will be automatically 0.

♦ Explanation ♦

● Choice Initial Pos

• Duration(Frames) → How long in frames the window will take to move 
from one position to another. It must be greater than 0 for the 
easing work.

• Easing → Changes the way the choice window moves from one position to 
another. See more details here: https://easings.net/

• Off-Screen X/Y → Places the window in an off-screen position. 
This will determine from where the window will start to move to the 
final position.

● Choice Target Pos

• Align X/Y → Assigns a value to the X/Y coordinate according to the 
selected alignment.

• Offset X/Y → Adds an extra value to the ones assigned with Align X/Y.

Example:

◆Plugin Command：ChoiceInitialPos Left None Bounce Out 30
◆Plugin Command：ChoiceTargetPos Center Center 0 0

============================================================================
Update Log
============================================================================

https://tinyurl.com/moveChoicesLog

============================================================================

@param okDelay
@text Confirm Delay (Frames)
@type text
@desc A delay, in frames, before the player can hit OK when the choice is open. Leave 0 for no delay.
@default 15

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MoveChoices = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const findEasing = (name, type) => {

    const easeName = {
        linear: "linear",
        quad: "Quad",
        cubic: "Cubic",
        quart: "Quart",
        quint: "Quint",
        sine: "Sine",
        expo: "Expo",
        circ: "Circ",
        back: "Back",
        bounce: "Bounce",
    }
    
    const easeType = {
        in: "easeIn",
        out: "easeOut",
        inout: "InOut",
        outin: "OutIn",
    }
    if(name === "linear"){
        return "linear"
    }else{
        return easeType[type]+easeName[name]
    }

}

Eli.MoveChoices = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-move-choices-rpg-maker-mv",
    parameters: {okDelay: 0},
    alias: {},
    isOkEnabled: false,
    position: {
        alignX: "right",
        alignY: "center",
        duration: 0,
        easing: "linear",
        inMessage: false,
        offsetX: 0,
        offsetY: 0,
        outsideX: "none",
        outsideY: "none",
    },
    choiceAnimation: anime({autoplay: false}),

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
        this.parameters.okDelay = Eli.Date.framesToMiliSeconds(this.parameters.okDelay)
    },

    initPluginCommands(){
        const commands = ['setupMovement']
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    resetPositionSettings(){
        const position = {
            alignX: "right",
            alignY: "center",
            duration: 0,
            easing: "linear",
            inMessage: false,
            offsetX: 0,
            offsetY: 0,
            outsideX: "none",
            outsideY: "none",
        }
        this.setPositionSettings(position)
    },

    resetAllSettings(){
        this.resetPositionSettings()
        this.isOkEnabled = false,
        this.choiceAnimation = anime({autoplay: false})
    },

    setPositionSettings(settings){
        const position = this.position

        position.alignX = settings.alignX
        position.alignY = settings.alignY
        position.duration = settings.duration
        position.easing = settings.easing
        position.offsetX = settings.offsetX
        position.offsetY = settings.offsetY
        position.outsideX = settings.outsideX
        position.outsideY = settings.outsideY
    },

    getPositionSettings(){
        return this.position
    },

    getMessageWindow(){
        return SceneManager._scene._messageWindow
    },

    /* ----------------------------- PLUGIN COMMAND ----------------------------- */

    executePluginCommandMV(command, mvArgs){
        const cmdList = {
            CHOICEINITIALPOS: "cmdMV_setInitial",
            CHOICETARGETPOS: "cmdMV_setTarget",
        }
        const cmd = cmdList[command.toUpperCase()]
        if(this[cmd]){
            this[cmd](mvArgs)
        }
    },

    cmdMV_setInitial(mvArgs){
        const easeName = mvArgs[2].toLowerCase() || "linear"
        const easeType = mvArgs[3].toLowerCase() || "in"
        const easing = findEasing(easeName, easeType)

        this.position.outsideX = mvArgs[0].toLowerCase() || "none"
        this.position.outsideY = mvArgs[1].toLowerCase() || "none"
        this.position.easing = easing
        if(easing === "linear"){
            this.position.duration = Number(Eli.Date.framesToMiliSeconds(mvArgs[3] || 1))
        }else{
            this.position.duration = Number(Eli.Date.framesToMiliSeconds(mvArgs[4] || 1))
        }
        
    },

    cmdMV_setTarget(mvArgs){
        this.position.alignX = mvArgs[0].toLowerCase()
        this.position.alignY = mvArgs[1].toLowerCase()
        this.position.offsetX = Number(mvArgs[2] || 0) 
        this.position.offsetY = Number(mvArgs[3] || 0) 
    },

}

const Plugin = Eli.MoveChoices
const Alias = Eli.MoveChoices.alias

Plugin.initialize()

/* ----------------------------- PLUGIN COMMANDS ---------------------------- */
{

Alias.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args){
    Alias.Game_Interpreter_pluginCommand.call(this, command, args)
    Plugin.executePluginCommandMV(command, args)
}

}

/* ------------------------------ WINDOW CHOICE ----------------------------- */
{

Alias.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement
Window_ChoiceList.prototype.updatePlacement = function() {
    this._messageWindow = Plugin.getMessageWindow()
    Alias.Window_ChoiceList_updatePlacement.call(this)
    this.setupPosition()
}

// Fixing this behavior. Because the Choice Window was calculating the max lines without considerate if the message window is open or not.
Alias.Window_ChoiceList_maxLines = Window_ChoiceList.prototype.maxLines
Window_ChoiceList.prototype.maxLines = function() {
    this._messageWindow = Plugin.getMessageWindow()
    if(Plugin.getMessageWindow().isOpen()){
        return Alias.Window_ChoiceList_maxLines.call(this)
    }else{
        return $gameMessage.choices().length
    }
}

Alias.Window_ChoiceList_start = Window_ChoiceList.prototype.start
Window_ChoiceList.prototype.start = function() {
    Alias.Window_ChoiceList_start.call(this)
    this.startAnimation()
    this.processConfirmationDelay()
}

Alias.Window_ChoiceList_isOkEnabled = Window_ChoiceList.prototype.isOkEnabled
Window_ChoiceList.prototype.isOkEnabled = function() {
    return  Alias.Window_ChoiceList_isOkEnabled.call(this) && 
            Plugin.isOkEnabled &&
            Plugin.choiceAnimation.completed
}

Alias.Window_ChoiceList_close = Window_ChoiceList.prototype.close
Window_ChoiceList.prototype.close = function() {
    Alias.Window_ChoiceList_close.call(this)
    Plugin.resetAllSettings()
}

Window_ChoiceList.prototype.processConfirmationDelay = function() {
    const onTimeOut = () => Plugin.isOkEnabled = true
    setTimeout(onTimeOut, Plugin.param().okDelay)
}

Window_ChoiceList.prototype.setupPosition = function() {
    const {
        alignX, offsetX, alignY, offsetY, 
        duration, easing, outsideX, outsideY
    } = Plugin.getPositionSettings()
    const target = this.createTargetPositions(alignX, offsetX, alignY, offsetY)
    
    this.x = target.x
    this.y = target.y

    if(this.haveEasingAnimation()){
        this.setInitialPositions(outsideX, outsideY)
    }

    Plugin.choiceAnimation = anime({
        targets: this,
        x: target.x,
        y: target.y,
        round: 1,
        easing: easing,
        duration: duration,
        autoplay: false,
    })
}

Window_ChoiceList.prototype.calculateInMessagePosition = function(align, offset, size, coordinate = "x"){
    const msgWin = Plugin.getMessageWindow()
    const screenSize = { x: msgWin.width, y: msgWin.height }
    const startPoint = { x: msgWin.x, y: msgWin.y }
    const mainSize = screenSize[coordinate] - size
    const mainPoint = startPoint[coordinate]

    switch(align){
        case "center":
            return mainPoint + (mainSize / 2) + offset
        case "right":
        case "bottom":  
            return mainPoint + (mainSize + offset)
        case "left":
        case "top":
            return mainPoint + offset
    }

    return mainPoint + offset
}

Window_ChoiceList.prototype.createTargetPositions = function(alignX, offsetX, alignY, offsetY){
    let x = Eli.Utils.calculateScreenPosition(alignX, offsetX, this.width, "x")
    let y = Eli.Utils.calculateScreenPosition(alignY, offsetY, this.height, "y")
    x -= alignX === "right" ? this._margin : 0
    y -= alignY === "bottom" ? this._margin : 0

    if($gameMessage.hasText()){
        const [newX, newY] = this.avoidOverlappingWithMessageWindow(x, y)
        x = newX
        y = newY
    }
    
    return {x, y}
}

Window_ChoiceList.prototype.avoidOverlappingWithMessageWindow = function(x, y){
    const msgWin = Plugin.getMessageWindow()
    const choiceRect = new Rectangle(x, y, this.width, this.height)
    const msgRect = msgWin.getBounds()
    const tempWin = new Window_Base(choiceRect)
    const collision = Eli.Utils.bump.rectangleCollision(tempWin, msgWin)

    if(collision === "top"){
        y = msgRect.bottom + Eli.Utils.windowMargin
        if(y >= Graphics.height){
            y = msgRect.top - (this.height + this._margin * 2)
        }

    }else if(collision === "bottom"){
        y = msgRect.top - (this.height + this._margin * 2)
        if(y <= 0){
            y = msgRect.bottom + this._margin * 2
        }
    }

    return [x, y]
} 

Window_ChoiceList.prototype.haveEasingAnimation = function(){
    return Plugin.getPositionSettings().duration > 0
} 

Window_ChoiceList.prototype.setInitialPositions = function(outsideX, outsideY){
    const [initialX, initialY] = this.findInitialCoordinates(outsideX, outsideY)
    this.x = initialX
    this.y = initialY
} 

Window_ChoiceList.prototype.findInitialCoordinates = function(outsideX, outsideY) {
    const x = {
        left: -this.width,
        right: Graphics.width + this.width,
        none: this.x,
    }[outsideX]
    const y = {
        top: -this.height,
        bottom: Graphics.height + this.height,
        none: this.y,
    }[outsideY]
    
    return [x, y]
}

Window_ChoiceList.prototype.startAnimation = function() {
    Plugin.choiceAnimation.play()
}

}

}
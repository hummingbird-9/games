//==========================================================================
// Eli_SelfVariables.js
//==========================================================================

/*:

@plugindesc ♦5.0.1♦ Self Variables fully integrated with events!
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
==============================================================================
Requirements
==============================================================================

Need Eli Book.
Order After Eli Book.

==============================================================================
Features
==============================================================================

● Add self variables to events.
● These self variables are persistent across the map.
● Can use plugin command to change the self variable of other events/maps.
● Integration with the default event commands!
● Work on the conditions tab of an event page.

==============================================================================
How to use
==============================================================================

After installing the plugin, the only thing you need to do is name a game 
variable like this:
SV: your variable name here.

It must start with "SV:" (It is case sensitive, so set the SV upper case).

Now, you have three ways to manipulate the self variable values:

♦ Default event command ♦

Self Variables are stored just like Self Switches. This means, that they 
mix Map Id, Event Id, and Variable Id to build a key that will hold the 
value of the self variable.
MapId, EventId, VarId = value

So, if Event Id 14 of Map Id 5 has a Self Variable Id 27 with a 
value of 304, the game will save this like that:
5, 14, 27 = 304

So, with that in mind, if the variable has the "SV:" tag on their name, 
any event command that let you use a variable, will operate the self 
variable instead of the default game variable
(Control Variable, Conditional Branch, etc.).

To do that, they will need a Variable Id, Map Id, and Event Id to access 
a Self Variable value.
The Var Id will get from the event command itself, by the user.
The Map Id and Event Id will be automatically got by the plugin and 
combined to find the value of a self variable.

But if in case you want to check the value of a self variable of 
another event? Or even in another map?

Then you must set a variable id into the Target Variables located on the 
plugin parameter.
These Target Variables will let you change the Event Id and Map Id that 
was being set automatically when you use the event commands.

You just need to change their values to something above 0 and they will 
set a Target Map Id and Event Id. 
Set their value to 0 if you want to restore the normal behavior.
* They also must be set as Self Variables.

They will work on any event command that uses variables!

♦ Script Calls ♦

• Getting self variable values:

Current event -> this.selfVariableValue(varId) OR 
this.getSv(varId)

Other events/map -> $gameVariables.selfValue([mapId, eventId, varId])

• Changing self variable values:

Current event -> this.setSelfVariableValue(varId, value) OR 
this.setSv(varId, value)

Other events/maps -> $gameVariables.setSelfValue([mapId, eventId, varId], value)

♦ Plugin Command(MZ only) ♦

You can change the self variables value using the plugin command.

NOTE¹: If you want to show the value of a self variable in a text like 
\v[id], you will need the Eli Escape Codes, where you set up a escape code 
of your choice to get their values. By default is sv[id].

============================================================================
Update Log
============================================================================

https://tinyurl.com/selfVariables

============================================================================

@param eventIdVar
@text Target Event Id Variable
@type variable
@desc See the help file, on section: ♦ Default event command ♦
@default 0

@param mapIdVar
@text Target Map Id Variable
@type variable
@desc See the help file, on section: ♦ Default event command ♦
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SelfVariables = true

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */
{
const pluginName = "Eli Self Variables"
const requiredVersion = 5.30
const messageVersion = "5.3.0"

if(!Eli.Book){

    const msg = `${pluginName}:\nYou are missing the core plugin: Eli Book.\nPlease, click ok to download it now.`
    if(window.confirm(msg)){
        nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
    }

}else if(Eli.Book.version < requiredVersion){

    const msg = `${pluginName}:\nYou need Eli Book version ${messageVersion} or higher.\nPlease, click ok to download it now.`
    if(window.confirm(msg)){
        nw.Shell.openExternal("https://hakuenstudio.itch.io/eli-book-rpg-maker-mv-mz")
    }
}

}

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.SelfVariables = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-self-variables-for-rpg-maker-mz",
    alias: {},
    parameters: {eventIdVar: 0, mapIdVar: 0},
    
    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters("Eli_SelfVariables")
        this.parameters.mapIdVar = Number(parameters.maIdVar)
        this.parameters.eventIdVar = Number(parameters.eventIdVar)
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

    set(args){
        const mapId = Number(args.mapId) || $gameMap.mapId()
        const eventId = Number(args.eventId) || Eli.PluginManager.currentEventId
        const varId = Number(args.sVar)
        const key = [mapId, eventId, varId]
        const newValue = Number((Eli.Utils.processEscapeVarOrFormula(args.value)))
        const currentValue = $gameVariables.selfValue(key)
        const value = this.calculateValue(args.operationType, currentValue, newValue)
        
        $gameVariables.setSelfValue(key, value)
    },
    
    calculateValue(operationType, currentValue, newValue){
        switch(operationType){
            case "Set": return newValue
            case "Add": return currentValue + newValue
            case "Sub": return currentValue - newValue
            case "Mul": return currentValue * newValue
            case "Div": return currentValue / newValue
            case "Mod": return currentValue % newValue
        }
    },

    operateVariableArguments(mapId, eventId, varId){
        if($gameVariables.isSelf(varId)){
            const key = [mapId, eventId, varId]
            return $gameVariables.selfValue(key)
        }else{
            return $gameVariables.value(varId)
        }
    },

    isTargetEventVariable(id){
        return id === this.param().eventIdVar
    },

}

const Alias = Eli.SelfVariables.alias
const Plugin = Eli.SelfVariables

Plugin.initialize()

/* -------------------------------- VARIABLES ------------------------------- */
{

Alias.Game_Variables_clear = Game_Variables.prototype.clear
Game_Variables.prototype.clear = function() {
    Alias.Game_Variables_clear.call(this)
    this.clearSelfData()
}

Game_Variables.prototype.clearSelfData = function() {
    this._selfData = {}
}

Game_Variables.prototype.isSelf = function(variableId){
    const systemVars = $dataSystem.variables
    return !!(systemVars[variableId] && systemVars[variableId].includes("SV:"))
}

Game_Variables.prototype.selfValue = function(key){
    key[0] = key[0] || $gameMap.mapId()
    return this._selfData[key] || 0
}

Game_Variables.prototype.setSelfValue = function(key, value) {
    if(value){
        this._selfData[key] = Math.floor(value) || value
    }else{
        delete this._selfData[key]
    }

    this.onChange()
}

}

/* ------------------------------- GAME EVENT ------------------------------- */
{

Alias.Game_Event_meetsConditions = Game_Event.prototype.meetsConditions
Game_Event.prototype.meetsConditions = function(page) {
    const alias = Alias.Game_Event_meetsConditions.call(this, page)

    if(this.meetsSelfVariableConditions(page)){
        return true
    }

    return alias
}

Game_Event.prototype.meetsSelfVariableConditions = function(page){
    const c = page.conditions

    if (c.variableValid && $gameVariables.isSelf(c.variableId)) {        
        const key = [this._mapId, this._eventId, c.variableId]

        if ($gameVariables.selfValue(key) >= c.variableValue) {
            return true
        }
    }

    return false
}

}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

// Conditional Branch
Alias.Game_Interpreter_command111 = Game_Interpreter.prototype.command111
Game_Interpreter.prototype.command111 = function() {
    if(this.isConditionalSelfVariable(this._params)){
        return this.command111_SelfVariable(this._params)
    }else{
        return Alias.Game_Interpreter_command111.call(this)
    }
}

Game_Interpreter.prototype.command111_SelfVariable = function(params) {
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    const key1 = [mapId, eventId, params[1]]
    const key2 = [mapId, eventId, params[3]]
    const value1 = $gameVariables.selfValue(key1)
    const value2 = params[2] === 0 ? params[3] : $gameVariables.selfValue(key2)
    let result = false

    switch (params[4]) {
        case 0: // Equal to
            result = value1 === value2
            break
        case 1: // Greater than or Equal to
            result = value1 >= value2
            break
        case 2: // Less than or Equal to
            result = value1 <= value2
            break
        case 3: // Greater than
            result = value1 > value2
            break
        case 4: // Less than
            result = value1 < value2
            break
        case 5: // Not Equal to
            result = value1 !== value2
            break
    }
    this._branch[this._indent] = result
    if (this._branch[this._indent] === false) {
        this.skipBranch()
    }
    return true
}

// Control variable
Alias.Game_Interpreter_command122 = Game_Interpreter.prototype.command122
Game_Interpreter.prototype.command122 = function() {
    if($gameVariables.isSelf(this._params[0])){
        return this.command122_SelfVariable(this._params)
    }else{
        return Alias.Game_Interpreter_command122.call(this)
    }
}

Game_Interpreter.prototype.command122_SelfVariable = function(params){
    const [startId, endId, operationType, operand] = params
    const targetMapId = this.getTargetMapIdSelfVariable()
    const targetEventId = this.getTargetEventIdSelfVariable()
    let value = 0
    let randomMax = 1

    switch (operand) {
        case 0: // Constant
            value = params[4]
            break
        case 1: // Variable
            if($gameVariables.isSelf(params[4])){
                const key = [targetMapId, targetEventId, params[4]]
                value = $gameVariables.selfValue(key)
            }else{
                value = $gameVariables.value(params[4])
            }
            break
        case 2: // Random
            value = params[4]
            randomMax = params[5] - params[4] + 1
            randomMax = Math.max(randomMax, 1)
            break
        case 3: // Game Data
            value = this.gameDataOperand(params[4], params[5], params[6])
            break
        case 4: // Script
            value = eval(params[4])
            break
    }

    for(let i = startId; i <= endId; i++){
        if(typeof value === "number"){
            const realValue = value + Math.randomInt(randomMax)
            this.operateSelfVariable(i, operationType, realValue, targetMapId, targetEventId)
        }else{
            this.operateSelfVariable(i, operationType, value, targetMapId, targetEventId)
        }
    }

    return true
}

// Transfer Player
Alias.Game_Interpreter_command201 = Game_Interpreter.prototype.command201
Game_Interpreter.prototype.command201 = function() {
    if(this.command201_hasVariableDesignated(this._params)){
        this._params = this.command201_SelfVariables(this._params)
    }
    return Alias.Game_Interpreter_command201.call(this)
}

Game_Interpreter.prototype.command201_hasVariableDesignated = function(params) {
    return params[0] !== 0
}

Game_Interpreter.prototype.command201_SelfVariables = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[0] = 0
    params[1] = Plugin.operateVariableArguments(mapId, eventId, params[1])
    params[2] = Plugin.operateVariableArguments(mapId, eventId, params[2])
    params[3] = Plugin.operateVariableArguments(mapId, eventId, params[3])

    return params
}

// Vehicle Location
Alias.Game_Interpreter_command202 = Game_Interpreter.prototype.command202
Game_Interpreter.prototype.command202 = function() {
    if(this.command202_hasVariableDesignated(this._params)){
        this._params = this.command202_SelfVariables(this._params)
    }
    return Alias.Game_Interpreter_command202.call(this)
}

Game_Interpreter.prototype.command202_hasVariableDesignated = function(params) {
    return params[1] !== 0
}

Game_Interpreter.prototype.command202_SelfVariables = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[1] = 0
    params[2] = Plugin.operateVariableArguments(mapId, eventId, params[2])
    params[3] = Plugin.operateVariableArguments(mapId, eventId, params[3])
    params[4] = Plugin.operateVariableArguments(mapId, eventId, params[4])

    return params
}

// Set Event Location
Alias.Game_Interpreter_command203 = Game_Interpreter.prototype.command203
Game_Interpreter.prototype.command203 = function() {
    if(this.command203_hasVariableDesignated(this._params)){
        this._params = this.command203_SelfVariable(this._params)
    }

    return Alias.Game_Interpreter_command203.call(this)
}

Game_Interpreter.prototype.command203_hasVariableDesignated = function(params){
    return params[1] === 1
}

Game_Interpreter.prototype.command203_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[1] = 0
    params[2] = Plugin.operateVariableArguments(mapId, eventId, params[2])
    params[3] = Plugin.operateVariableArguments(mapId, eventId, params[3])

    return params
}

// Get Location Info
Alias.Game_Interpreter_command285 = Game_Interpreter.prototype.command285
Game_Interpreter.prototype.command285 = function() {
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    
    if(this.command285_hasVariableDesignated(this._params)){
        this._params = this.command285_operateVariableParams(this._params, mapId, eventId)
    }

    const command = Alias.Game_Interpreter_command285.call(this)

    if($gameVariables.isSelf(this._params[0])){
        this.command285_setSelfVariable(this._params, mapId, eventId)
    }

    return command
}

Game_Interpreter.prototype.command285_hasVariableDesignated = function(params){
    return params[2] === 1
}

Game_Interpreter.prototype.command285_operateVariableParams = function(params, mapId, eventId){
    params[2] = 0
    params[3] = Plugin.operateVariableArguments(mapId, eventId, params[3])
    params[4] = Plugin.operateVariableArguments(mapId, eventId, params[4])

    return params
}

Game_Interpreter.prototype.command285_setSelfVariable = function(params, mapId, eventId){
    const key = [mapId, eventId, params[0]]
    const value = $gameVariables.value(params[0])

    $gameVariables.setSelfValue(key, value)
}

// Battle Processing
Alias.Game_Interpreter_command301 = Game_Interpreter.prototype.command301
Game_Interpreter.prototype.command301 = function() {
    if(this.command301_hasVariableDesignated(this._params)){
        this._params = this.command301_SelfVariable(this._params)
    }
    return Alias.Game_Interpreter_command301.call(this)
}

Game_Interpreter.prototype.command301_hasVariableDesignated = function(params){
    return params[0] === 1
}

Game_Interpreter.prototype.command301_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    params[0] = 0
    params[1] = Plugin.operateVariableArguments(mapId, eventId, params[1])

    return params
}

// Show Picture
Alias.Game_Interpreter_command231 = Game_Interpreter.prototype.command231
Game_Interpreter.prototype.command231 = function() {
    if(this.picturePoint_hasVariableDesignated(this._params)){
        this._params = this.picturePoint_SelfVariable(this._params)
    }
    return Alias.Game_Interpreter_command231.call(this)
}

// Move Picture
Alias.Game_Interpreter_command232 = Game_Interpreter.prototype.command232
Game_Interpreter.prototype.command232 = function() {
    if(this.picturePoint_hasVariableDesignated(this._params)){
        this._params = this.picturePoint_SelfVariable(this._params)
    }
    return Alias.Game_Interpreter_command232.call(this)
}

Game_Interpreter.prototype.picturePoint_hasVariableDesignated = function(params){
    return params[3] !== 0
}

Game_Interpreter.prototype.picturePoint_SelfVariable = function(params){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()

    params[3] = 0
    params[4] = Plugin.operateVariableArguments(mapId, eventId, params[4])
    params[5] = Plugin.operateVariableArguments(mapId, eventId, params[5])

    return params
}

// To work with: Party Commands, and actor commands
Alias.Game_Interpreter_operateValue = Game_Interpreter.prototype.operateValue
Game_Interpreter.prototype.operateValue = function(operation, operandType, operand) {
    if(this.isSelfVariableOperandType(operandType, operand)){
        const [newType, newOperand] = this.changeOperandsForSelfVariable(operandType, operand)
        operandType = newType
        operand = newOperand
    }

    return Alias.Game_Interpreter_operateValue.call(this, operation, operandType, operand)
}

Game_Interpreter.prototype.getTargetMapIdSelfVariable = function(){
    const key = [this._mapId, this._eventId, Plugin.param().mapIdVar]
    return $gameVariables.selfValue(key) || this._mapId
}

Game_Interpreter.prototype.getTargetEventIdSelfVariable = function(){
    const key = [this._mapId, this._eventId, Plugin.param().eventIdVar]
    return $gameVariables.selfValue(key) || this._eventId
    
}

Game_Interpreter.prototype.isConditionalSelfVariable = function(params) {
    return params[0] === 1 && $gameVariables.isSelf(params[1])
}

Game_Interpreter.prototype.operateSelfVariable = function(variableId, operationType, value, targetMapId, targetEventId) {
    if(Plugin.isTargetEventVariable(variableId)){
        targetEventId = this._eventId
    }
    const key = [targetMapId, targetEventId, variableId]
    try {
        const oldValue = $gameVariables.selfValue(key)
        switch (operationType) {
            case 0: // Set
                $gameVariables.setSelfValue(key, value)
                break
            case 1: // Add
                $gameVariables.setSelfValue(key, oldValue + value)
                break
            case 2: // Sub
                $gameVariables.setSelfValue(key, oldValue - value)
                break
            case 3: // Mul
                $gameVariables.setSelfValue(key, oldValue * value)
                break
            case 4: // Div
                $gameVariables.setSelfValue(key, oldValue / value)
                break
            case 5: // Mod
                $gameVariables.setSelfValue(key, oldValue % value)
                break
        }
    } catch (e) {
        $gameVariables.setSelfValue(key, 0)
    }
}

Game_Interpreter.prototype.isSelfVariableOperandType = function(operandType, operand) {
    return operandType !== 0 && $gameVariables.isSelf(operand)
}

Game_Interpreter.prototype.changeOperandsForSelfVariable = function(operandType, operand){
    const mapId = this.getTargetMapIdSelfVariable()
    const eventId = this.getTargetEventIdSelfVariable()
    const key = [mapId, eventId, operand]

    operandType = 0
    operand = $gameVariables.selfValue(key)

    return [operandType, operand]
}

Game_Interpreter.prototype.getSv = function(variableId) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        return $gameVariables.selfValue(key)
    }else{
        return 0
    }
}

Game_Interpreter.prototype.setSv = function(variableId, value) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        $gameVariables.setSelfValue(key, value)
    }
}

Game_Interpreter.prototype.selfVariableValue = function(variableId) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        return $gameVariables.selfValue(key)
    }else{
        return 0
    }
}

Game_Interpreter.prototype.setSelfVariableValue = function(variableId, value) {
    if($gameVariables.isSelf(variableId)){
        const key = [this._mapId, this._eventId, variableId]
        $gameVariables.setSelfValue(key, value)
    }
}

}

/* --------------------------- WINDOW NUMBER INPUT -------------------------- */
{

Alias.Window_NumberInput_processOk = Window_NumberInput.prototype.processOk
Window_NumberInput.prototype.processOk = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable()
    }
    Alias.Window_NumberInput_processOk.call(this)
}

Window_NumberInput.prototype.isWithSelfVariable = function() {
    return $gameVariables.isSelf($gameMessage.numInputVariableId())
}

Window_NumberInput.prototype.changeSelfVariable = function() {
    const inputValue = this._number
    const key = this.getSelfVariableKey()

    $gameVariables.setSelfValue(key, inputValue)
    this._number = 0
}

Window_NumberInput.prototype.getSelfVariableKey = function() {
    const interpreter = $gameMap._interpreter
    const varId = $gameMessage.numInputVariableId()
    const mapId = interpreter.getTargetMapIdSelfVariable()
    const eventId = interpreter.getTargetEventIdSelfVariable()
    const key = [mapId, eventId, varId]

    if(Plugin.isTargetEventVariable(varId)){
        key[1] = interpreter._eventId
    }

    return key
}

}

/* ---------------------------- WINDOW EVENT ITEM --------------------------- */
{

Alias.Window_EventItem_onOk = Window_EventItem.prototype.onOk
Window_EventItem.prototype.onOk = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable()
    }
    Alias.Window_EventItem_onOk.call(this)
}

Alias.Window_EventItem_onCancel = Window_EventItem.prototype.onCancel
Window_EventItem.prototype.onCancel = function() {
    if(this.isWithSelfVariable()){
        this.changeSelfVariable(0)
    }
    Alias.Window_EventItem_onCancel.call(this)
}

Window_EventItem.prototype.isWithSelfVariable = function() {
    return $gameVariables.isSelf($gameMessage.itemChoiceVariableId())
}

Window_EventItem.prototype.changeSelfVariable = function(value) {
    const item = this.item();
    const itemId = item ? item.id : 0;
    const key = this.getSelfVariableKey()

    $gameVariables.setSelfValue(key, value || itemId)
}

Window_EventItem.prototype.getSelfVariableKey = function() {
    const interpreter = $gameMap._interpreter
    const varId = $gameMessage.itemChoiceVariableId()
    const mapId = interpreter.getTargetMapIdSelfVariable()
    const eventId = interpreter.getTargetEventIdSelfVariable()
    const key = [mapId, eventId, varId]

    return key
}

}



} // END
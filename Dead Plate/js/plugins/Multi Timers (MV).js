//=============================================================================
// Multi Timers
// by Shaz
// Last Updated: 2016.11.29
//=============================================================================

/*:
 * @plugindesc Allows more than one timer running at once, with custom commands
 * @author Shaz
 *
 * @help
 * This plugin allows you to set multiple timers at once, along with a command
 * to be executed after the timer expires.  There is no timer display.
 *
 * Plugin Commands:
 *
 * AddTimer key seconds command - sets a timer with key
 * DeleteTimer key - deletes timer with key
 * HasTimer key switchId - turns switch on if a timer with that key is active
 * TimeLeft key varId - sets a variable to the number of seconds remaining
 *
 * key = any numbers/text (no spaces) to identify unique timers
 * seconds = seconds to run
 * command = command to run on expiry (may be any command, and include spaces)
 * switchId = id of switch to set on in HasTimer call if timer exists
 * varId = id of variable to set to seconds remaining on timer
 *
 * The following codes can be used and substituted as follows:
 * <thismap> - id of current map
 * <thisevent> - id of current event
 * \setSS - set self switch
 * \setS - set switch
 * \setV - set variable
 * \ss - self switch value
 * \s - switch value
 * \v - variable value
 *
 * Examples:
 * addTimer opendoor 300 \sets(10, true)
 *    sets a timer for 5 minutes (300 seconds) to turn on switch 10, which
 *    controls the opening of a door
 * addTimer eggsHatched 600 \setv(8, \v(8) + 1)
 *    sets a timer for 10 minutes (600 seconds) to increment variable 8 by 1,
 *    which controls how many eggs have hatched
 * addTimer <thismap>.<thisevent>.A 180 \setss([<thismap>, <thisevent>, 'A'], true)
 *    sets a timer for 3 minutes to turn the current event's self switch A on
 *    the name/key of the timer, if the event is EV008 on map 3, will be 3.8.A
 * deleteTimer opendoor
 *    cancels the timer previously called opendoor (case insensitive)
 * hasTimer <thismap>.<thisevent>.A 15
 *    if run on EV008 on map 3, turns switch 15 on if there is a timer for 3.8.A
 * timeLeft eggsHatched 5
 *    sets variable 5 to the number of seconds remaining before an egg hatches
 *
 *
 * Revisions
 * 2016.11.29  Fixed issue where default timer won't work properly
 */

(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    switch(command.toUpperCase()) {
      case 'ADDTIMER':
        args = this.subst(args);
        key = args.shift();
        seconds = parseInt(args.shift());
        command = args.join(' ');
        $gameTimer.addTimer(key, seconds, command);
        break;
      case 'DELETETIMER':
        args = this.subst(args);
        key = args.shift();
        $gameTimer.deleteTimer(key);
        break;
      case 'HASTIMER':
        args = this.subst(args);
        key = args.shift();
        switchId = parseInt(args.shift());
        $gameSwitches.setValue(switchId, $gameTimer.hasTimer(key));
        break;
      case 'TIMELEFT':
        args = this.subst(args);
        key = args.shift();
        varId = parseInt(args.shift());
        timeLeft = $gameTimer.hasTimer(key);
        $gameVariables.setValue(varId, timeLeft ? timeLeft : 0);
        break;
      default:
        _Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };

  Game_Interpreter.prototype.subst = function(args) {
    args = args.join(' ');
    args = args.replace(/<thismap>/gi, this._mapId.toString());
    args = args.replace(/<thisevent>/gi, this._eventId.toString());
    args = args.replace(/\\setSS/gi, '$gameSelfSwitches.setValue');
    args = args.replace(/\\setV/gi, '$gameVariables.setValue');
    args = args.replace(/\\setS/gi, '$gameSwitches.setValue');
    args = args.replace(/\\SS/gi, '$gameSelfSwitches.value');
    args = args.replace(/\\V/gi, '$gameVariables.value');
    args = args.replace(/\\S/gi, '$gameSwitches.value');
    return args.split(' ');
  };

  var _Game_Timer_initialize = Game_Timer.prototype.initialize;
  Game_Timer.prototype.initialize = function() {
    _Game_Timer_initialize.call(this);
    this.initTimer();
  };

  Game_Timer.prototype.initTimer = function() {
    if (!this._timers) {
      this._timers = {};
    }
  };

  var _Game_Timer_update = Game_Timer.prototype.update;
  Game_Timer.prototype.update = function(sceneActive) {
    _Game_Timer_update.call(this, sceneActive);
    if (sceneActive && this._timers) {
      keys = Object.keys(this._timers);
      keys.forEach(function(timer) {
        this._timers[timer][0]--;
        if (this._timers[timer][0] === 0) {
          eval(this._timers[timer][1]);
          this.deleteTimer(timer);
        }
      }.bind(this));
    }
  };

  Game_Timer.prototype.addTimer = function(key, seconds, command) {
    this.initTimer();
    this._timers[key.toUpperCase()] = [seconds * 60, command];
  };

  Game_Timer.prototype.deleteTimer = function(key) {
    key = key.toUpperCase();
    if (this._timers && this._timers[key]) {
      delete this._timers[key.toUpperCase()];
    }
  };

  Game_Timer.prototype.hasTimer = function(key) {
    key = key.toUpperCase();
    if (this._timers && this._timers[key]) {
      return Math.floor(this._timers[key][0] / 60);
    } else {
      return null;
    }
  };
})();
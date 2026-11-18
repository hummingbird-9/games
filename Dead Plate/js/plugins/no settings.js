Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('gameEnd',()=>{
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.exit();
    });
    this.addWindow(this._commandWindow);
};

Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    // this.addCommand(TextManager.options,   'options');
    this.addCommand(TextManager.gameEnd, 'gameEnd');
};

Window_MenuCommand.prototype.addOptionsCommand = function() {
};
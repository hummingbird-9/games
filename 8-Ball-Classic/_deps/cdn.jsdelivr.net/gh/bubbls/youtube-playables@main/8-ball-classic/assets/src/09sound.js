
var Sound = new function(){

	this.on = true;

	this.master = this.on;
	this.slave = this.on;

	this.setMasterMute = (muted = false) => {
		this.master = !muted;
		this.updateMute();
	}
	
	this.setMute = (muted = false) => {
		this.slave = !muted;
		this.updateMute();
	}

	this.updateMute = () => {
		this.on = this.master && this.slave;
	}
}


Sound.Play = function(type, volume){
	if (typeof(volume)==='undefined') {
		volume = 1;
	}

	if (Sound.on) {			
		var sound = new Phaser.Sound(game, type, volume);
		sound.play();
		//console.log("playing sound: " + type);				
	}
}

Sound.createNewAudioContext = function() {
	console.log('create new audio context');
	game.sound.context = new AudioContext();
	game.sound.masterGain.disconnect();

	game.sound.masterGain = game.sound.context.createGain();
	game.sound.masterGain.connect(game.sound.context.destination);
}

Sound.checkAudioContext = function() {
	if (this.isSuspended()) {
		console.log('is suspended');
		this.startCheckingSuspended();
	}

	const oldCurrentTime = game.sound.context.currentTime;

	setTimeout(() => {
		const newCurrentTime = game.sound.context.currentTime;

		if (oldCurrentTime === newCurrentTime) {
			this.createNewAudioContext();
		}
	}, 1000);
}

Sound.startCheckingSuspended = function() {
	clearInterval(this.intervalId);

	this.intervalId = setInterval(() => {
		if (this.isSuspended()) {
			game.sound.context.resume();
		} else {
			clearInterval(this.intervalId);
		}
	}, 1000);
}

Sound.isSuspended = function() {
	return game.sound.usingWebAudio && game.sound.context.state === 'suspended';
}

setInterval(Sound.checkAudioContext.bind(Sound), 1000);

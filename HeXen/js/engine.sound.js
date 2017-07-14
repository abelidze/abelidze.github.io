/*
 * Sound control module
 */

function Audio () {
	this.path = "";
	this.name = -1;
	this.audioElm = $('#audio1');
	this.audioElm.src = this.path;
}

Audio.prototype.SetSound = function (name) {
	this.name = name;
	this.path = SoundNames[this.name];
	this.audioElm.src = this.path;
};

Audio.prototype.PlayAudio = function () {
	this.audioElm.play();
};

Audio.prototype.PauseAudio = function () {
	this.audioElm.pause();
};

Audio.prototype.GetSound = function () {
	return this.name;
};


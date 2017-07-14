/*
 * Sound control module
 */

function Sound () {
	this.path = "";
	this.name = -1;
	this.audioElm = document.getElementById('audio1');
	this.audioElm.src = this.path;
}

Sound.prototype.SetSound = function (name) {
	this.name = name;
	this.path = SoundNames[this.name];
	this.audioElm.src = this.path;
};

Sound.prototype.PlayAudio = function (name) {
	if (this.name ===  name)
		return;
	this.audioElm.play();
};

Sound.prototype.PauseAudio = function () {
	this.audioElm.pause();
};

Sound.prototype.GetSound = function () {
	return this.name;
};


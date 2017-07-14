/*
	HeXen [2D roguelike game] Main file
*/
var audio = new Audio();
var gameManager = new GameManager();
window.onload = function() {
	audio.SetSound(SoundIndex.HORIZON);
	audio.PlayAudio();
};
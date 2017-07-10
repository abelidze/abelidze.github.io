/*
	Game Manager
*/

function GameManager(width, height) {
	this.freeze = false;
	this.gameState = GameState.PAUSE;
	this.result = GameResult.NONE;
	this.objects = [];
	$this = this;
	$(document).ready(function(){$this.Init(width, height)});
}
GameManager.prototype.Init = dummyFunc;
GameManager.prototype.StartGame = dummyFunc;
GameManager.prototype.StopGame = dummyFunc;
GameManager.prototype.Restart = dummyFunc;
GameManager.prototype.Pause = dummyFunc;
GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
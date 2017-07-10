/*
	Game Manager
*/

function GameManager() {
	this.freeze = true;
	this.render = null;
	this.mouse = null;
	this.gameState = GameState.PAUSE;
	this.result = GameResult.NONE;
	this.grid = new Grid(this, 240, 240, 12, 36);
	this.objects = [];
	$this = this;
	$(document).ready(function(){$this.Init()});
}

GameManager.prototype.Init = function() {
	this.render = new Render();
	this.mouse = new Mouse(this);
	this.StartGame();
}

GameManager.prototype.StartGame = function() {
	this.freeze = false;
	this.grid.Draw();
	// requestAnimationFrame(this.RenderEvent);
}

GameManager.prototype.StopGame = function() {
	this.freeze = true;
}

GameManager.prototype.Update = function() {


}

GameManager.prototype.Pause = function() {
	this.freeze = true;
}

GameManager.prototype.RenderEvent = function() {
	let delta = this.render.deltaTime();


	requestAnimationFrame(this.RenderEvent);
}

GameManager.prototype.Restart = dummyFunc;
GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
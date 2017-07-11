/*
	Game Manager
*/

function GameManager() {
	/* BAD CODER */
	GameObject.prototype.gm = this;
	// Clickable.prototype.gm = this;

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
	this.CreateObject(Player, this.grid.map[0][0]);
	// requestAnimationFrame(this.RenderEvent);
}

GameManager.prototype.CreateObject = function(object, cell) {
	cell.AddObject(function() { return new object(null, cell) });
}

GameManager.prototype.StopGame = function() {
	this.freeze = true;
}

GameManager.prototype.Restart = function() {
	this.StopGame();
	this.grid.Clear();
	this.StartGame();
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

GameManager.prototype.CreateObject = function(createFunc) {
	let obj = createFunc();
	this.objects.push(obj);
	obj.cell.AddObject(obj);
	console.log(obj);
}

GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
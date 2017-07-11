/*
	Game Manager
*/

function GameManager() {
	/* BAD CODER */
	GameObject.prototype.gm = this;
	Drawable.prototype.gm = this;
	Clickable.prototype.gm = this;

	this.freeze = true;
	this.render = null;
	this.mouse = null;
	this.gameState = GameState.PAUSE;
	this.result = GameResult.NONE;
	this.grid = new Grid(this, 240, 240, 12, 36);
	this.objects = [];
	this.GUIElements = [];
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
	this.grid.LoadLevel(GameLevels[0]);
	this.grid.Draw();
	requestAnimationFrame(this.RenderEvent.bind(this));
}

GameManager.prototype.CreateObject = function(object, cell, args) {
	let obj = cell.AddObject(function() { return new object(cell, ...args) });
	if(obj !== undefined)
		this.objects.push(obj);
}

GameManager.prototype.StopGame = function() {
	this.freeze = true;
}

GameManager.prototype.Restart = function() {
	this.StopGame();
	this.grid.Clear();
	this.StartGame();
}

GameManager.prototype.Pause = function() {
	this.freeze = true;
}

GameManager.prototype.Update = function() {

}

GameManager.prototype.RenderEvent = function() {
	let delta = this.render.deltaTime();

	this.render.Clear();

	for(let i = 0; i < this.objects.length; ++i) {
		this.objects[i].Draw();
	}

	requestAnimationFrame(this.RenderEvent.bind(this));
}

GameManager.prototype.MouseEvent = function (event){
	if (this.grid.bounds.isInArea(this.mouse.posX, this.mouse.posY))
		this.grid.Select(this.mouse.posX, this.mouse.posY);
	else
		this.SelectGUI(event);
}

GameManager.prototype.SelectGUI = function (event) {
	//ototot
}

GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
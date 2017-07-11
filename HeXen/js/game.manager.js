/*
	Game Manager
*/

function GameManager() {
	/* BAD CODER */
	GameObject.prototype.gm = this;
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
	this.grid.Draw();
	this.grid.map[0][0].CreateObject(function() { return new Player(null, that.grid.map[0][0]) });
	// requestAnimationFrame(this.RenderEvent);
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

GameManager.prototype.SelectGUI = function (event) {
    //ototot
}
GameManager.prototype.MouseEvent = function (event){
    if (this.grid.bounds.isInArea(this.mouse.posX, this.mouse.posY))
        this.grid.Select(this.mouse.posX, this.mouse.posY);
    else
        this.SelectGUI(event);
}

GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
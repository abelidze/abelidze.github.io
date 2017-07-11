/*
	Game Manager
*/

function GameManager() {
	/* BAD CODER */
	GameObject.prototype.gm = this;
	Drawable.prototype.gm = this;
	Clickable.prototype.gm = this;
	EventSystem.prototype.gm = this;

	this.freeze = true;
	this.render = null;
	this.mouse = null;
	this.gameState = GameState.PAUSE;
	this.result = GameResult.NONE;
	this.grid = new Grid(this, 240, 240, 12, 36);
	this.objects = [];
	this.players = [];
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
	this.gameState = GameState.TURN;
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

GameManager.prototype.MouseEvent = function (event) {
	if(this.grid.bounds.isInArea(this.mouse.posX, this.mouse.posY))
		this.grid.Select(this.mouse.posX, this.mouse.posY);
	else
		this.SelectGUI(event);
}

GameManager.prototype.SelectGUI = function (event) {
	//ototot
}

GameManager.prototype.AddPlayer = function(player) {
	this.players.push(player);
}

GameManager.prototype.GridClicked = function(pos) {
	let player, cell = this.grid.map[pos.y][pos.x];
	let x = 0, y = 0;
	switch(this.gameState) {
		case GameState.TURN:
			for(let i = 0; i < this.players.length; ++i) {
				player = this.grid.PixelToHex(this.players[i].cell.center.x, this.players[i].cell.center.y);
				x = player.x - pos.x;
				y = player.y - pos.y;
				if(Math.abs(x) <= 1 && Math.abs(y) <= 1 && x != y) {
					this.players[i].MoveTo(cell);
				}
			}
		break;
	}
}

GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.SetMode = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
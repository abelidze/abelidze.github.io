/*
	Game Manager
*/

function GameManager() {
	/* BAD CODER */
	BaseModel.prototype.gm = this;

	this.render = null;
	this.mouse = null;
	this.event = null;
	this.animator = null;
	this.grid = null;
	this.gui = null;
	this.scoreManager = null;

	this.freeze = true;
	this.gameState = GameState.PAUSE;
	this.result = GameResult.NONE;
	this.currentLevel = 0;

	this.objects = [];
	this.players = [];

	that = this;
	$(document).ready(function () {
		that.Init()
	});
}

GameManager.prototype.Init = function () {
	this.event = new EventSystem();
	this.render = new Render(2);
	this.grid = new Grid(64, 64, 24, 48);
	this.mouse = new Mouse(this);
	this.animator = new Animator();
	this.gui = new GameGUI();
	this.scoreManager = new ScoreManager(this.gui, ScoreBarRadius);
	//this.StartGame();
};

GameManager.prototype.ToggleMenu = function () {
	if (this.gameState === GameState.MENU) {
		$('.menu_bg').css('display', 'none');
		$('#game_pic').css('display', 'inline');
		$('canvas').css('display', 'inline');
        this.StartGame();
    } else {
		this.StopGame();
        this.SetMode(GameState.MENU);
	}
}

GameManager.prototype.StartGame = function () {
	this.freeze = false;
	this.NextLevel();
	this.event.CallBackEvent('gamestarted');
	this.grid.Draw(); //!!!!!
	
	requestAnimationFrame(this.RenderEvent.bind(this));
};

GameManager.prototype.StopGame = function () {
	this.freeze = true;
};

GameManager.prototype.Restart = function () {
	this.StopGame();
	this.grid.Clear();
	this.StartGame();
};

GameManager.prototype.Pause = function () {
	this.freeze = true;
};

GameManager.prototype.ChangeScore = function (score) {
	this.scoreManager.UpdateScore(score);
};

GameManager.prototype.NextLevel = function () {
	this.grid.LoadLevel(GameLevels[this.currentLevel]);
	this.scoreManager.Reset();
	this.SetMode(GameState.TURN);
	this.currentLevel++;
};

GameManager.prototype.CreateObject = function (object, cell, args) {
	let obj = cell.AddObject(function () {
		return new object(cell, args);
	});
	if (obj !== undefined)
		this.objects.push(obj);
};

GameManager.prototype.ClearObjects = function () {
	this.objects = [];
	this.players = [];
};

GameManager.prototype.RenderEvent = function () {
	let delta = this.render.deltaTime();

	this.animator.ProcessMotions(delta);

	this.render.Clear();
	// this.grid.Draw();
	for (let i = 0; i < this.objects.length; ++i) {
		this.objects[i].Draw();
	}

	this.gui.DrawGUI();

	requestAnimationFrame(this.RenderEvent.bind(this));
};

GameManager.prototype.ResizeEvent = function () {
	this.render.ResizeCanvas();
	this.grid.Draw();
}

GameManager.prototype.MouseEvent = function (event) {
	if (this.grid.bounds.isInArea(this.mouse.posX, this.mouse.posY))
		this.grid.Select(this.mouse.posX, this.mouse.posY);
	else
		this.SelectGUI(event);
};

GameManager.prototype.SelectGUI = function (event) {
	//otototototototototototototo
};

GameManager.prototype.AddPlayer = function (player) {
	this.players.push(player);
};


GameManager.prototype.GridClicked = function (pos) {
	let player, cell = this.grid.map[pos.y][pos.x];
	switch(this.gameState) {
		case GameState.TURN:
			for(let i = 0; i < this.players.length; ++i) {
				//this.grid.PixelToHex(this.players[i].cell.center.x, this.players[i].cell.center.y);
				player = this.players[i].cell.gridPosition;

				if(cell.isNearbyXY(player, pos)) {
					this.players[i].MoveTo(cell);
					break;
				}
			}
		break;
	}
};

GameManager.prototype.SetMode = function (mode) {
	this.gameState = mode;
}

GameManager.prototype.GameOver = dummyFunc;
GameManager.prototype.ShowGameResult = dummyFunc;
GameManager.prototype.CheckObjects = dummyFunc;
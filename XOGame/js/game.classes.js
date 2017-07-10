function Cell(field, row, width) {
	this.field = field;
	this.width = width;
	this.state = CellState.EMPTY;
	this.id = getRandomInt(10000000, 99999999);
	this.cell = $('<td>').attr('id', this.id).addClass('cell').click(this.Use.bind(this));
	this.cell.append($('<img>').addClass('cross').attr('src', 'img/cross.svg'));
	this.cell.append($('<img>').addClass('circle').attr('src', 'img/circle.svg'));
	this.cell.appendTo(row);
}
Cell.prototype.Draw;
Cell.prototype.Clear;
Cell.prototype.Use;

function Field(gmanager, table, width, height) {
	this.gm = gmanager;
	this.width = width;
	this.height = height;
	this._map = [];
	for(let i = 0; i < height; ++i) {
		let row = $('<tr></tr>').appendTo(table);
		this._map[i] = [];
		for(let j = 0; j < width; ++j) {
			this._map[i][j] = new Cell(this, row, 1/width*100);
		}
	}
}
Field.prototype.Clear;
Field.prototype.Draw;

function Player(gmanager, marker, mode) {
	this._gm = gmanager;
	this.marker = marker;
	this.AI = mode;
}
Player.prototype.DoTurn;
Player.prototype.EASYTurn;
Player.prototype.NORMALTurn;
Player.prototype.HARDTurn;

function Turn(gmanager) {
	this.gm = gmanager;
	this._player = gmanager.players[gmanager.turn];
	this.turnMark = this._player.marker;
}
Turn.prototype.Make;
Turn.prototype.isPlayer;

function GameManager(width, height, inrow) {
	this.turn = -1;
	this.field = null;
	this.freeze = false;
	this.result = GameResult.NONE;
	this.MAXINROW = inrow;
	this.players = [];
	$this = this;
	$(document).ready(function(){$this.Init(width, height)});
}
GameManager.prototype.Init;
GameManager.prototype.StartGame;
GameManager.prototype.Restart;
GameManager.prototype.Pause;
GameManager.prototype.GameOver;
GameManager.prototype.StopGame;
GameManager.prototype.ShowGameResult;
GameManager.prototype.GetCurrentTurn;
GameManager.prototype.CheckWinner;
GameManager.prototype.AddPlayer;
GameManager.prototype.SetMode;
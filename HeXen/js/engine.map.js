/*
	Map Module
*/

function Cell(grid, row) {
	this.grid = grid;
	this.state = CellState.EMPTY;
	this.id = getRandomInt(10000000, 99999999);
	// this.cell = $('<td>').attr('id', this.id).addClass('cell').click(this.Use.bind(this));
	// this.cell.append($('<img>').addClass('cross').attr('src', 'img/cross.svg'));
	// this.cell.append($('<img>').addClass('circle').attr('src', 'img/circle.svg'));
	// this.cell.appendTo(row);
}
Cell.prototype.Draw;
Cell.prototype.Clear;
Cell.prototype.Use;

function Grid(gmanager, width, height) {
	this.gm = gmanager;
	this.width = width;
	this.height = height;
	this.map = [];
	// for(let i = 0; i < height; ++i) {
	// 	let row = $('<tr></tr>').appendTo(table);
	// 	this.map[i] = [];
	// 	for(let j = 0; j < width; ++j) {
	// 		this.map[i][j] = new Cell(this, row);
	// 	}
	// }
}
Grid.prototype.Clear;
Grid.prototype.Draw;
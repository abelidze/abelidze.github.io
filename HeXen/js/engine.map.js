/*
	Map Module
*/

function Trigger() {
	// Trigger
}

function Cell(grid, center) {
	this.grid = grid;
	this.center = center;
	this.state = CellState.EMPTY;
	this.style = {edge: 'black', fill: 'red', width: 3};
	this.id = getRandomInt(10000000, 99999999);
}

Cell.prototype.Draw = function(render) {
	this.grid.gm.render.DrawHex(this.center, this.grid.radius, this.style, true);
}

Cell.prototype.Clear = function() {

}

Cell.prototype.Use = dummyFunc;

function Grid(gmanager, offset_X, offset_Y, size, radius) {
	this.gm = gmanager;
	this.size = size;
	this.map = [];

	this.radius = radius;
	this.offset_x = offset_X;
	this.offset_y = offset_Y;

	this.shift_x = radius * Math.cos(Math.PI/180*30);
	this.shift_y = radius * Math.sin(Math.PI/180*30);

	let x = 0, y = 0;
	for(let i = 0; i < size; ++i) {
		this.map[i] = [];
		for(let j = 0; j < size; ++j) {
			x = offset_X + this.shift_x * j * 2 + i * this.shift_x;
			y = offset_Y + this.shift_y * i * 3
			this.map[i][j] = new Cell(this, new Point(x, y));
		}
	}
}

// const drawMap = function(edge) {
// 	var r = 30;
// 	var shift_x = r*Math.cos(Math.PI/180*30);
// 	var shift_y = r*Math.sin(Math.PI/180*30);

//     for(let j = 100; j < 100 + 9 * shift_y; j += 3 * shift_y) {
//         for(let i = 100; i < 100 + 8 * shift_x; i += 2 * shift_x) {
//             drawHex(context, {
//                 x: i + shift_x *(j - 100)/3/shift_y + i / 25,
//                 y: j + j / 25
//             }, r, {style: '#2D936C', fill: '#E8E9EB'});
//         }
//     }
// }

Grid.prototype.Draw = function() {
	for(let i = 0; i < this.size; ++i)
		for(let j = 0; j < this.size; ++j)
			this.map[i][j].Draw();
}

Grid.prototype.Select = function(x, y) {
	y -= this.offset_y - this.radius;
	let sy = Math.floor(y / this.shift_y / 3);
	x -= this.offset_x + this.shift_x * sy - this.shift_x;
	let sx = Math.floor(x / this.shift_x / 2);

	if(sx < 0 || sy < 0 || sx >= this.size || sy >= this.size) return;

	this.map[sy][sx].style = {edge: 'black', fill: 'white', width: 1};
	this.map[sy][sx].Draw();
}

Grid.prototype.Clear = dummyFunc;
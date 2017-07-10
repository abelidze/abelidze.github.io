/*
	Map Module
*/

function Trigger() {
	// Trigger
}

function Cell(grid, center, radius) {
	this.grid = grid;
	this.radius = radius;
	this.center = center;
	this.state = CellState.EMPTY;
	this.style = {edge: 'black', fill: 'red', width: 4};
	this.id = getRandomInt(10000000, 99999999);
}

Cell.prototype.Draw = function(render) {
	this.grid.gm.render.DrawHex(this.center, this.radius, this.style);
}

Cell.prototype.Clear = function() {

}

Cell.prototype.Use = dummyFunc;

function Grid(gmanager, offset_X, offset_Y, size, radius) {
	this.gm = gmanager;
	this.size = size;
	this.map = [];

	let x = 0, shift_x = radius * Math.cos(Math.PI/180*30);
	let y = 0, shift_y = radius * Math.sin(Math.PI/180*30);
	for(let i = 0; i < size; ++i) {
		this.map[i] = [];
		for(let j = 0; j < size; ++j) {
			x = offset_X + shift_x * j * 2 + i * shift_x;
			y = offset_Y + shift_y * i * 3;
			this.map[i][j] = new Cell(this, new Point(x, y), radius);
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
		for(let j = 0; j < this.size; ++j) {
			this.map[i][j].Draw();
		}
}

Grid.prototype.Clear = dummyFunc;
/*
	Map Module
*/

/* CELLS */
function Cell(grid, center) {
	this.grid = grid;
	this.center = center;
	this.state = CellState.EMPTY;
	this.object = null;
	this.style = {edge: 'black', fill: 'red', width: 3};
	this.id = getRandomInt(10000000, 99999999);
}

Cell.prototype.Draw = function(render) {
	this.grid.gm.render.DrawHex(this.center, this.grid.radius, this.style, true);
};

Cell.prototype.Clear = function() {
	delete this.object;
	this.object = null;
	this.state = CellState.EMPTY;
	// this.style
};

Cell.prototype.Interact = function(cell, callback) {
	switch(this.state) {
		case CellState.INVISIBLE:
			callback(InteractResult.NOTHING);
		break;

		case CellState.EMPTY:
			callback(InteractResult.MOVED);
		break;

		default:
			this.object.Collide(cell.object, callback);
	}
};

Cell.prototype.AddObject = function(objectFunc) {
	if(this.state !== CellState.EMPTY) return undefined;

	this.object = objectFunc();
	this.state = CellState.OBJECT;

	return this.object;
};

Cell.prototype.GetNearby = function() {
	let pos, nearby = [];
	for(let i = 0; i < HexDirections.length; ++i) {
		pos = this.grid.PixelToHex(this.center);
		pos.x += HexDirections[i][0], pos.y += HexDirections[i][0];
		if(pos.x < 0 || pos.y < 0 || pos.x >= this.size || pos.y >= this.size) continue;

		nearby.push(this.grid.map[pos.y][pos.x]);
	}
	return nearby;
};


/* GRID */
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
			y = offset_Y + this.shift_y * i * 3;
			this.map[i][j] = new Cell(this, new Point(x, y));
		}
	}

	this.bounds = new Rect(offset_X - this.shift_x, offset_Y - this.shift_y, x + this.shift_x, y + 3*this.shift_y);
}

Grid.prototype.Draw = function() {
	for(let i = 0; i < this.size; ++i)
		for(let j = 0; j < this.size; ++j)
			this.map[i][j].Draw();
};

Grid.prototype.Clear = function() {
	this.gm.render.Clear();
	this.gm.render.ClearBack();
	for(let i = 0; i < this.size; ++i)
		for(let j = 0; j < this.size; ++j)
			this.map[i][j].Clear();
	this.Draw();
};

Grid.prototype.PixelToHex = function(x, y) {
	y -= this.offset_y - this.radius;
	let sy = Math.floor(y / this.shift_y / 3);
	x -= this.offset_x + this.shift_x * sy - this.shift_x;
	let sx = Math.floor(x / this.shift_x / 2);

	if(sx < 0 || sy < 0 || sx >= this.size || sy >= this.size) return undefined;
	return new Point(sx, sy);
};

Grid.prototype.Select = function(x, y) {
	let pos = this.PixelToHex(x, y);
	if(pos === undefined) return;

	this.map[pos.y][pos.x].style = {edge: 'black', fill: '#1F282D', width: 1};
	this.map[pos.y][pos.x].Draw();
};

Grid.prototype.LoadMap = function(level) {
	for (let i = 0; i < level.map.length; ++i){
		if (level.map[i][0] === -1)
			continue;
		let cell = this.map[level.map[i][1]][level.map[i][2]];
		this.gm.CreateObject(LevelObjFunc[level.map[i][0]], cell, level.map[i][3]);
	}
};
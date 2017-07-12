/*
	Map Module
*/

/* CELLS */
function Cell(grid, center) {
	this.grid = grid;
	this.center = center;
	this.state = CellState.EMPTY;
	this.object = null;
	this.style = {edge: 'white', fill: 'black', width: 3};
	this.id = getRandomInt(10000000, 99999999);
	this.triggers = [];
}

Cell.prototype.Draw = function(render) {
	if(this.state == CellState.INVISIBLE)
		return;
	this.grid.gm.render.DrawHex(this.center, this.grid.radius, this.style, true);
};

Cell.prototype.SetStyle = function(style) {
	this.style = style;
	this.Draw();
}

Cell.prototype.ActivateTriggers = function(object) {
	for (let i = 0; i < this.triggers.length; ++i)
		this.triggers[i].Activate(object);
}

Cell.prototype.Clear = function () {
	delete this.object;
	this.object = null;
	this.state = CellState.EMPTY;
	// this.style
};

Cell.prototype.Interact = function (cell, callback) {
	switch (this.state) {
		case CellState.INVISIBLE:
			callback(InteractResult.NOTHING);
		break;

		case CellState.EMPTY:
			this.ActivateTriggers(cell.object);
			callback(InteractResult.MOVED);
		break;

		default:
			this.ActivateTriggers(cell.object);
			this.object.Collide(cell.object, callback);
	}
};

Cell.prototype.MoveObject = function (object) {
	if (this.state !== CellState.EMPTY) return undefined;

	this.object = object;
	this.state = CellState.OBJECT;

	return this.object;
};

Cell.prototype.AddObject = function (objectFunc) {
	if (this.state !== CellState.EMPTY) return undefined;

	this.object = objectFunc();
	this.state = CellState.OBJECT;

	return this.object;
};

Cell.prototype.GetNearby = function () {
	let pos, nearby = [];
	for (let i = 0; i < HexDirections.length; ++i) {
		pos = this.grid.PixelToHex(this.center);
		pos.x += HexDirections[i][0], pos.y += HexDirections[i][0];
		if (pos.x < 0 || pos.y < 0 || pos.x >= this.size || pos.y >= this.size) continue;

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

	this.shift_x = radius * Math.cos(Math.PI / 180 * 30);
	this.shift_y = radius * Math.sin(Math.PI / 180 * 30);

	let x = 0, y = 0;
	for (let i = 0; i < size; ++i) {
		this.map[i] = [];
		for (let j = 0; j < size; ++j) {
			x = offset_X + this.shift_x * j * 2 + i * this.shift_x;
			y = offset_Y + this.shift_y * i * 3;
			this.map[i][j] = new Cell(this, new Point(x, y));
		}
	}

	this.bounds = new Rect(offset_X - this.shift_x, offset_Y - radius, x + this.shift_x, y + radius);
}

Grid.prototype.LoadLevel = function(level) {
	for(let i = 0; i < level.map.length; ++i) {
		// this.size = level.size;
		if(level.map[i][0] === LevelObjects.INVISIBLE) {
			this.map[level.map[i][1]][level.map[i][2]].state = CellState.INVISIBLE;
			continue;
		}
		let cell = this.map[level.map[i][1]][level.map[i][2]];
		this.gm.CreateObject(LevelObjFunc[level.map[i][0]], cell, level.map[i][3]);
	}
};

Grid.prototype.Draw = function() {
	for(let i = 0; i < this.size; ++i)
		for(let j = 0; j < this.size; ++j)
			this.map[i][j].Draw();
};

Grid.prototype.Clear = function () {
	this.gm.render.Clear();
	this.gm.render.ClearBack();
	for (let i = 0; i < this.size; ++i)
		for (let j = 0; j < this.size; ++j)
			this.map[i][j].Clear();
	this.gm.ClearObjects();
	this.Draw();
};

Grid.prototype.PixelToHex = function (x, y) {
	y -= this.offset_y - this.radius;
	let sy = Math.floor(y / this.shift_y / 3);
	x -= this.offset_x + this.shift_x * sy - this.shift_x;
	let sx = Math.floor(x / this.shift_x / 2);

	/*if (inside_triangle(x, y, this.offset_x - this.shift_x, this.offset_y - this.shift_y, 0, 0, this.offset_x, 0) &&
		(sy > 0)) {
		sy--;
	} else if (inside_triangle(x, y, this.offset_x, 0, this.offset_x + this.shift_x, 0, this.offset_x + this.shift_x, this.offset_y - this.shift_y) && (sy > 0) && (sx < this.size)) {
		sy--;
		sx++;
	}*/

	// x = (x + this.shift_x * sy) * (this.radius + this.shift_y);
	// y = (y - this.radius + this.shift_y) * this.shift_x;
	// if ((x - y) < 0)
	// 	return new Point(sx, sy - 1);
	// if ((x + y) > 0)
	// 	return new Point(sx + 1, sy - 1);
	
	if (sx < 0 || sy < 0 || sx >= this.size || sy >= this.size) return undefined;
	return new Point(sx, sy);
};

Grid.prototype.Select = function (x, y) {
	let pos = this.PixelToHex(x, y);
	if (pos === undefined) return;

	if (this.gm.gameState != GameState.ANIMATING)
		this.gm.GridClicked(pos);
	// this.map[pos.y][pos.x].style = {edge: 'black', fill: '#1F282D', width: 1};
	// this.map[pos.y][pos.x].Draw();
};
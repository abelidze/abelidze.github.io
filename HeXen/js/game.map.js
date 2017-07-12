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

Cell.prototype.AddTrigger = function (trig) {
	this.triggers.push(trig);
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
			this.object.ActivateTriggers();
			cell.object.ActivateTriggers(cell.object);
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

Cell.prototype.isNearbyXY = function (pos1, pos2) {
	let x = pos1.x - pos2.x;
	let y = pos1.y - pos2.y;

	return (Math.abs(x) <= 1 && Math.abs(y) <= 1 && x !== y);
};

Cell.prototype.isNearby = function (cell) {
	let pos1 = this.grid.PixelToHex(this.center.x, this.center.y);
	let pos2 = this.grid.PixelToHex(cell.center.x, cell.center.y);

	return this.isNearby(pos1, pos2);
};

/* GRID */
function Grid(gmanager, offset_X, offset_Y, size, radius) {
	this.gm = gmanager;

	this.radius = radius;
	this.offset_x = offset_X;
	this.offset_y = offset_Y;

	this.shift_x = radius * Math.cos(Math.PI / 180 * 30);
	this.shift_y = radius * Math.sin(Math.PI / 180 * 30);

	this.size = 0;
	this.map = [];
	this.GenerateGrid(size);
}

Grid.prototype.GenerateGrid = function(size) {
	if(this.size == size) return;
	let hide = (this.size > size);
	if(!hide) {
		let foo = this.size;
		this.size = size;
		size = foo;
	}

	let x = 0, y = 0;
	for(let i = 0; i < this.size; ++i) {
		if(i < size) {
			for(let j = size; j < this.size; ++j) {
				if(hide) {
					this.map[i][j].state = CellState.INVISIBLE;
				} else {
					x = this.offset_x + this.shift_x * j * 2 + i * this.shift_x;
					y = this.offset_y + this.shift_y * i * 3;
					this.map[i][j] = new Cell(this, new Point(x, y));
				}
			} 
		} else {
			if(!hide)
				this.map[i] = [];
			for(let j = 0; j < this.size; ++j) {
				if(hide) {
					this.map[i][j].state = CellState.INVISIBLE;
				} else {
					x = this.offset_x + this.shift_x * j * 2 + i * this.shift_x;
					y = this.offset_y + this.shift_y * i * 3;
					this.map[i][j] = new Cell(this, new Point(x, y));
				}
			}
		}
	}
	if(!hide)
		this.bounds = new Rect(this.offset_x - this.shift_x, this.offset_y - this.radius, x + this.shift_x, y + this.radius);
}

Grid.prototype.LoadLevel = function(level) {
	this.Clear();
	this.GenerateGrid(level.size);

	for(let i = 0; i < level.map.length; ++i) {
		if(level.map[i][0] === LevelObjects.INVISIBLE) {
			this.map[level.map[i][1]][level.map[i][2]].state = CellState.INVISIBLE;
			continue;
		}
		let cell = this.map[level.map[i][1]][level.map[i][2]];
		this.gm.CreateObject(LevelObjFunc[level.map[i][0]], cell, level.map[i][3]);
	}

	if(level.triggers === undefined)
		return;

	for(let i = 0; i < level.triggers.length; ++i){
		console.log(level.triggers[i]);
		let cell = this.map[level.triggers[i][1]][level.triggers[i][2]];
		let trig = new Trigger(cell, level.triggers[i][0][0], level.triggers[i][0][1], level.triggers[i][0][2]);
		cell.AddTrigger(trig);
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
};

Grid.prototype.PixelToHex = function (x, y) {
	point = new Point(x, y);

	y -= this.offset_y - this.radius;
	let sy = Math.floor(y / this.shift_y / 3);
	x -= this.offset_x + this.shift_x * sy - this.shift_x;
	let sx = Math.floor(x / this.shift_x / 2);

	if(sx < 0 || sy < 0 || sx >= this.size || sy >= this.size) return undefined;

	let c = this.map[sy][sx].center;
	let x1 = c.x - this.shift_x;
	let x2 = c.x + this.shift_x;
	let y1 = c.y - this.shift_y;
	let y2 = c.y - this.radius;

	if(point.isInTriangle(new Point(c.x, y2), new Point(x1, y1), new Point(x1, y2))) {
		sy--;
		if(sy < 0) return undefined;
	}
	else if(point.isInTriangle(new Point(c.x, y2), new Point(x2, y1), new Point(x2, y2))) {
		sy--;
		sx++;
		if(sy < 0 || sx >= this.size) return undefined;
	}
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

/* Path Class */
function Path(points) {
	this.points = points;
	this.current = 0;
}

Path.prototype.NextTurn = function () {
	return this.points[(++this.current) % this.points.length];
};

Path.prototype.PrevTurn = function () {
	return this.points[(this.current - 1 + this.points.length) % this.points.length];
};

Path.prototype.PushTurn = function (point) {
	this.points.push(point);
};

Path.prototype.IsCorrect = function() {

}